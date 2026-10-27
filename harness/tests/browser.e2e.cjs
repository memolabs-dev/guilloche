'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { mkdirSync } = require('node:fs');
const path = require('node:path');
const { chromium } = require('@playwright/test');

const BASE = process.env.GUILLOCHE_BASE_URL || 'http://127.0.0.1:8088';
const DIR = path.resolve(__dirname, '../var/evidence');
const PAGES = ['button', 'input', 'table', 'dialog', 'alert', 'rosette', 'seal'];

test('real Chromium renders design system in light/dark and desktop/mobile', { timeout: 180_000 }, async () => {
    mkdirSync(DIR, { recursive: true });
    const browser = await chromium.launch({ headless: true });
    try {
        const problems = [];
        for (const size of [
            { name: 'desktop', width: 1440, height: 900 },
            { name: 'mobile', width: 390, height: 844 },
        ]) {
            for (const theme of ['light', 'dark']) {
                const context = await browser.newContext({
                    viewport: { width: size.width, height: size.height },
                    colorScheme: theme,
                    reducedMotion: 'reduce',
                });
                const page = await context.newPage();
                await page.addInitScript((mode) => {
                    try { localStorage.setItem('guilloche-doc-theme', mode); } catch {}
                }, theme);
                const assetsWithErrors = [];
                page.on('response', (response) => {
                    if (response.status() >= 400 && /\/assets\//.test(response.url())) {
                        assetsWithErrors.push(response.status() + ' ' + response.url());
                    }
                });

                for (const recipe of PAGES) {
                    const response = await page.goto(BASE + '/components/' + recipe, { waitUntil: 'networkidle' });
                    assert.equal(response?.status(), 200, size.name + '/' + theme + '/' + recipe + ' must return HTTP 200');

                    const fonts = await page.evaluate(async () => {
                        await document.fonts.ready;
                        const declared = [...document.fonts].filter((font) => font.family === 'Geist');
                        return {
                            declared: declared.length,
                            loaded: declared.some((font) => font.status === 'loaded'),
                            used: getComputedStyle(document.body).fontFamily,
                            theme: document.documentElement.dataset.uiTheme,
                            scroll: document.documentElement.scrollWidth,
                            viewport: innerWidth,
                        };
                    });
                    assert.ok(fonts.declared > 0 && fonts.loaded, size.name + '/' + theme + '/' + recipe + ': Geist must load');
                    assert.match(fonts.used, /Geist/, recipe + ': expected sans-serif design system');
                    assert.equal(fonts.theme, theme, recipe + ': theme switch failed');
                    if (fonts.scroll > fonts.viewport + 2) {
                        problems.push(size.name + '/' + theme + '/' + recipe + ': horizontal overflow ' + fonts.scroll + ' > ' + fonts.viewport);
                    }
                    await page.screenshot({
                        path: path.join(DIR, recipe + '-' + size.name + '-' + theme + '.png'),
                        fullPage: true,
                        animations: 'disabled',
                    });
                }
                problems.push(...assetsWithErrors.map((error) => size.name + '/' + theme + ': ' + error));
                await context.close();
            }
        }
        assert.deepEqual(problems, [], 'Browser/network regressions detected');
    } finally {
        await browser.close();
    }
});

test('JavaScript-disabled Symfony output already contains unique rosette and human seal paths', { timeout: 90_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const context = await browser.newContext({
            javaScriptEnabled: false,
            colorScheme: 'dark',
            viewport: { width: 390, height: 844 },
        });
        const page = await context.newPage();
        const rosette = await page.goto(BASE + '/components/rosette');
        assert.equal(rosette?.status(), 200);
        const traces = await page.locator('.ds__planche .ui-rosette__main').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('d')));
        assert.equal(traces.length, 48);
        assert.equal(new Set(traces).size, 48, 'all 48 rosettes must differ without JS');
        assert.ok(traces.every((trace) => trace.length > 1000), 'initial HTML must contain full SVG contours');
        const progress = await page.locator('.ui-rosette__main[style]').evaluateAll((nodes) =>
            nodes.map((node) => node.getAttribute('style')));
        assert.ok(progress.some((style) => style.includes('stroke-dashoffset: 75')), '25% progress must be pre-rendered');

        const seal = await page.goto(BASE + '/components/seal');
        assert.equal(seal?.status(), 200);
        const signatures = await page.locator('.ui-seal__trace').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('d')));
        assert.ok(signatures.length >= 3 && signatures.every((trace) => trace.length > 1000),
            'all human seals need real server SVG without JS');
        assert.equal(await page.locator('.ui-seal[role="img"] svg[aria-hidden="true"]').count(), signatures.length);
        await context.close();
    } finally {
        await browser.close();
    }
});

test('reduced motion keeps long loading rosette still', { timeout: 45_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage({ reducedMotion: 'reduce' });
        await page.goto(BASE + '/components/rosette', { waitUntil: 'networkidle' });
        const name = await page.locator('.ui-rosette.is-loading .ui-rosette__main').evaluate(
            (node) => getComputedStyle(node).animationName,
        );
        assert.equal(name, 'none', 'prefers-reduced-motion must suppress loading animation');
    } finally {
        await browser.close();
    }
});
