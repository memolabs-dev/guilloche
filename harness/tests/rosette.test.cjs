'use strict';

const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const assets = path.resolve(__dirname, '../assets');
const harnessSource = readFileSync(path.join(assets, 'rosette.js'), 'utf8');
const controllerPath = path.resolve(__dirname, '../../kits/guilloche/rosette/assets/controllers/rosette_controller.js');
const controllerSource = readFileSync(controllerPath, 'utf8');
const context = { Controller: class {} };

vm.runInNewContext(
    controllerSource
        .replace("import { Controller } from '@hotwired/stimulus';", '')
        .replace('export default class extends Controller', 'globalThis.RosetteController = class extends Controller'),
    context,
    { timeout: 2000 },
);
const controller = new context.RosetteController();

function render(seed, progress = '100') {
    const main = {
        attributes: {},
        style: {},
        setAttribute(name, value) { this.attributes[name] = value; },
        getTotalLength() { return 100; },
    };
    const counter = {
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
    };
    const element = {
        querySelector(selector) {
            return selector === '.ui-rosette__main' ? main : counter;
        },
        getAttribute(name) {
            return name.includes('seed-value') ? seed : progress;
        },
    };

    vm.runInNewContext(harnessSource, {
        document: { querySelectorAll: () => [element] },
    }, { timeout: 2000 });

    return { main, counter };
}

test('48 references have stable and distinct contours in the kit and documentation', () => {
    const traces = new Set();
    let woven = 0;

    for (let i = 1; i <= 48; i++) {
        const seed = `AR-2026-${String(i).padStart(3, '0')}`;
        const a = render(seed);
        const b = render(seed);
        const parameters = controller.parameters(seed);

        assert.equal(a.main.attributes.d, b.main.attributes.d);
        assert.equal(a.main.attributes.d, controller.trace(parameters));
        assert.equal(a.counter.attributes.d, controller.trace({
            ...parameters,
            petals: parameters.petals + 2,
            phase: parameters.phase + Math.PI / parameters.copies,
        }));
        assert.equal((a.main.attributes.d.match(/(?:^|\s)M/g) ?? []).length, parameters.copies);
        if (parameters.copies > 1) woven++;
        traces.add(a.main.attributes.d);
    }

    assert.equal(traces.size, 48);
    assert.ok(woven > 0, 'The sample must exercise multiple independent contours');
});

test('progress is clamped to 0–100 to avoid negative or overflowing dash offsets', () => {
    assert.equal(render('AR-2026-042', '-25').main.style.strokeDashoffset, '100');
    assert.equal(render('AR-2026-042', '40').main.style.strokeDashoffset, '60');
    assert.equal(render('AR-2026-042', '150').main.style.strokeDashoffset, undefined);
    assert.equal(render('AR-2026-042', 'invalid').main.style.strokeDashoffset, undefined);
});

test('harness and installed-kit Twig recipes remain byte-for-byte aligned', () => {
    const kitTemplate = path.resolve(__dirname, '../../kits/guilloche/rosette/templates/components/Rosette.html.twig');
    const harnessTemplate = path.resolve(__dirname, '../templates/components/Rosette.html.twig');
    assert.equal(readFileSync(harnessTemplate, 'utf8'), readFileSync(kitTemplate, 'utf8'));
});
