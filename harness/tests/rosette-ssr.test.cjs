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

/**
 * Les fonctions trigonométriques PHP/JavaScript peuvent arrondir un point
 * exactement entre deux centièmes dans des directions différentes. Tolérance
 * de 0.01 unité dans un SVG de 100 unités : moins de 0.0064 px à 64 px.
 * On contrôle chaque coordonnée, l'ordre et tous les sous-chemins.
 */
function compareGeometry(actual, expected, seed, type) {
    const parse = (d) => (d.match(/[ML]-?\d+\.\d{2} -?\d+\.\d{2}/g) || []).map((segment) => {
        const [x, y] = segment.slice(1).split(' ').map(Number);
        return [segment[0], x, y];
    });
    const a = parse(actual);
    const b = parse(expected);
    assert.equal(a.length, b.length, seed + ' number of points ' + type);
    for (let i = 0; i < a.length; i++) {
        assert.equal(a[i][0], b[i][0], seed + ' SVG contour command ' + type);
        assert.ok(Math.abs(a[i][1] - b[i][1]) < 0.01001,
            seed + ' X ' + type + ' step ' + i);
        assert.ok(Math.abs(a[i][2] - b[i][2]) < 0.01001,
            seed + ' Y ' + type + ' step ' + i);
    }
}

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
        compareGeometry(output[seed].main, expectedMain, seed, 'main');
        compareGeometry(output[seed].counter, expectedCounter, seed, 'counter');
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
