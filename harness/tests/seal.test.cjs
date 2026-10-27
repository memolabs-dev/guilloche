'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../..');
const source = readFileSync(path.join(root, 'kits/guilloche/seal/assets/controllers/seal_controller.js'), 'utf8')
    .replace("import { Controller } from '@hotwired/stimulus';", '')
    .replace('export default class extends Controller', 'globalThis.SealController = class extends Controller');
const scope = { Controller: class {} };
vm.runInNewContext(source, scope, { timeout: 2000 });
const Seal = scope.SealController;

function elements() {
    const pathNode = { d: '', setAttribute(key, value) { if (key === 'd') this.d = value; } };
    const names = new Set(['ui-seal', 'ui-seal--validated']);
    const wrapper = {
        classList: { contains: (s) => names.has(s), add: (s) => names.add(s), remove: (s) => names.delete(s) },
        addEventListener: () => {},
    };
    const element = {
        querySelector: (selector) => selector === '.ui-seal__trace' ? pathNode : null,
        closest: () => wrapper,
    };
    return { pathNode, wrapper, element, names };
}

test('same signer yields same seal and distinct signers are distinguishable', () => {
    const paths = new Set();
    for (let i = 0; i < 48; i++) {
        const seal = new Seal();
        const { pathNode, element } = elements();
        seal.element = element;
        seal.seedValue = 'signer-' + i;
        seal.freshValue = false;
        seal.connect();
        assert.equal(pathNode.d, seal.highlight(seal.parameters(seal.seedValue)));
        assert.equal(pathNode.d, seal.highlight(seal.parameters(seal.seedValue)));
        assert.equal((pathNode.d.match(/(?:^|\s)M/g) || []).length, seal.parameters(seal.seedValue).copies);
        paths.add(pathNode.d);
    }
    assert.equal(paths.size, 48);
});

test('kit and harness controller remain synchronized', () => {
    assert.equal(
        readFileSync(path.join(root, 'kits/guilloche/seal/assets/controllers/seal_controller.js'), 'utf8'),
        readFileSync(path.join(root, 'harness/assets/controllers/seal_controller.js'), 'utf8'),
    );
});

test('reduced motion and session replay cannot retrigger a fresh seal', () => {
    const seal = new Seal();
    const { element, names } = elements();
    seal.element = element;
    seal.seedValue = 'test';
    seal.atValue = '2026-10-27';
    seal.freshValue = true;
    const originalWindow = scope.window;
    let reduced = true;
    const stored = new Map();
    scope.window = {
        matchMedia: () => ({ matches: reduced }),
        sessionStorage: {
            getItem: (key) => stored.get(key),
            setItem: (key, value) => stored.set(key, value),
        },
    };
    try {
        seal.animateFresh();
        assert.equal(names.has('is-fresh'), false);
        reduced = false;
        seal.animateFresh();
        assert.equal(names.has('is-fresh'), true);
        names.delete('is-fresh');
        seal.animateFresh();
        assert.equal(names.has('is-fresh'), false);
    } finally {
        scope.window = originalWindow;
    }
});

test('server-provided seal shape is never overwritten during controller connect', () => {
    const seal = new Seal();
    const { element, pathNode } = elements();
    pathNode.d = 'M14.00 17.00 L60.00 70.00';
    seal.element = element;
    seal.ssrValue = true;
    seal.seedValue = 'signer-A';
    seal.freshValue = false;
    seal.connect();
    assert.equal(pathNode.d, 'M14.00 17.00 L60.00 70.00');
});
