'use strict';

const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '../..');
const source = readFileSync(path.join(root, 'kits/guilloche/rosette/assets/controllers/rosette_controller.js'), 'utf8');
const scope = { Controller: class {} };
vm.runInNewContext(
    source.replace("import { Controller } from '@hotwired/stimulus';", '')
        .replace('export default class extends Controller', 'globalThis.RosetteController = class extends Controller'),
    scope,
    { timeout: 2000 },
);
const rosette = new scope.RosetteController();
const seeds = Array.from({ length: 48 }, (_, i) => 'AR-2026-' + String(i + 1).padStart(3, '0'))
    .concat(['Étude clinique 𝄞', '漢字-42', '👩‍⚕️', 'à-côté', '0', '']);

test('server PHP paths equal Stimulus contours for 54 Unicode and ASCII seeds', () => {
    const response = execFileSync('php', ['bin/rosette-paths', ...seeds], {
        cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
    });
    const output = JSON.parse(response);
    const signatures = new Set();

    for (const seed of seeds) {
        const options = rosette.parameters(seed || 'guilloche');
        const expectedMain = rosette.trace(options);
        const expectedCounter = rosette.trace({
            ...options, petals: options.petals + 2,
            phase: options.phase + Math.PI / options.copies,
        });
        assert.equal(output[seed].main, expectedMain, 'server main path differs for ' + seed);
        assert.equal(output[seed].counter, expectedCounter, 'server counter path differs for ' + seed);
        assert.equal((output[seed].main.match(/(?:^|\s)M/g) || []).length, options.copies);
        signatures.add(output[seed].main);
    }

    assert.equal(signatures.size, seeds.length);
});

test('the recipe accepts explicit SSR paths without requiring a Twig function', () => {
    const kit = readFileSync(path.join(root, 'kits/guilloche/rosette/templates/components/Rosette.html.twig'), 'utf8');
    const demo = readFileSync(path.join(root, 'harness/templates/components/Rosette.html.twig'), 'utf8');
    assert.equal(kit, demo);
    assert.match(kit, /paths = null/);
    assert.match(kit, /paths\.main\|default/);
    assert.match(kit, /paths\.counter\|default/);
});
