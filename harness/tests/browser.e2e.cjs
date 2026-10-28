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


test('ConfirmDialog trigger remains centered and fully visible at both viewports', { timeout: 45_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        for (const width of [390, 1440]) {
            const page = await browser.newPage({ viewport: { width, height: 900 } });
            await page.goto(BASE + '/components/dialog', { waitUntil: 'networkidle' });
            const scene = page.locator('.ds__example-render').nth(1);
            const trigger = scene.locator('.ui-confirm-dialog__trigger');
            const [sceneBox, buttonBox] = await Promise.all([scene.boundingBox(), trigger.boundingBox()]);
            assert.ok(sceneBox && buttonBox, 'The confirmation trigger must render');
            assert.ok(buttonBox.x >= sceneBox.x && buttonBox.x + buttonBox.width <= sceneBox.x + sceneBox.width,
                'The destructive button must stay inside its example scene');
            const sceneCenter = sceneBox.x + sceneBox.width / 2;
            const buttonCenter = buttonBox.x + buttonBox.width / 2;
            assert.ok(Math.abs(sceneCenter - buttonCenter) <= 15,
                'The confirmation trigger must be centered at ' + width + 'px');
            await page.close();
        }
    } finally {
        await browser.close();
    }
});


test('real browser serializes Input, Select and Textarea without explicit name', { timeout: 45_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();
        await page.goto(BASE + '/components/input', { waitUntil: 'networkidle' });
        await page.locator('#contract-title').fill('Mission Alpha');
        await page.locator('#contract-status').selectOption('done');
        await page.locator('#contract-note').fill('Validation réelle');
        const entries = await page.locator('form[data-form-contract]').evaluate(
            (form) => Object.fromEntries(new FormData(form).entries()),
        );
        assert.deepEqual(entries, {
            'contract-title': 'Mission Alpha',
            'contract-status': 'done',
            'contract-note': 'Validation réelle',
        });
    } finally {
        await browser.close();
    }
});

test('real Stimulus controllers open dialogs, confirm actions and operate listboxes', { timeout: 90_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 900, height: 800 } });
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));

        await page.goto(BASE + '/components/dialog', { waitUntil: 'networkidle' });
        await page.locator('.ui-dialog__trigger').first().click();
        assert.equal(await page.locator('dialog.ui-dialog').first().evaluate((dialog) => dialog.open), true,
            'Stimulus must actually open native dialog');
        await page.locator('.ui-dialog__close').first().click();
        assert.equal(await page.locator('dialog.ui-dialog').first().evaluate((dialog) => dialog.open), false);

        await page.evaluate(() => {
            window.__guillocheConfirmCount = 0;
            document.addEventListener('ui:confirm', () => window.__guillocheConfirmCount++);
        });
        await page.locator('.ui-confirm-dialog__trigger').first().click();
        assert.equal(await page.locator('dialog.ui-confirm-dialog').first().evaluate((dialog) => dialog.open), true);
        await page.locator('.ui-confirm-dialog__confirm').first().click();
        assert.equal(await page.evaluate(() => window.__guillocheConfirmCount), 1,
            'Confirmation must dispatch application action event exactly once');

        await page.goto(BASE + '/components/combobox', { waitUntil: 'networkidle' });
        const input = page.locator('.ui-combobox__input').first();
        await input.fill('Audit');
        assert.equal(await input.getAttribute('aria-expanded'), 'true');
        await page.locator('.ui-combobox__option:visible').first().click();
        assert.equal(await page.locator('.ui-combobox input[type=hidden]').first().inputValue(), '2');
        assert.equal(await input.getAttribute('aria-expanded'), 'false');

        await page.goto(BASE + '/components/command', { waitUntil: 'networkidle' });
        await page.locator('.ui-command__trigger').first().click();
        assert.equal(await page.locator('dialog.ui-command__dialog').first().evaluate((dialog) => dialog.open), true);
        await page.locator('.ui-command__input').first().fill('documents');
        assert.equal(await page.locator('.ui-command__item:visible').count(), 1);
        await page.keyboard.press('Escape');
        // Native <dialog> dispatches cancel/close in a subsequent browser task.
        await page.waitForFunction(() => !document.querySelector('dialog.ui-command__dialog')?.open, { timeout: 3000 });
        assert.equal(await page.locator('dialog.ui-command__dialog').first().evaluate((dialog) => dialog.open), false);

        assert.deepEqual(errors, [], 'No JavaScript exception during real component interactions');
    } finally {
        await browser.close();
    }
});
