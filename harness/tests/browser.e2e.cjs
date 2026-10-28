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
        await page.waitForFunction(() => !document.querySelector('dialog.ui-command__dialog')?.open, null, { timeout: 3000 });
        assert.equal(await page.locator('dialog.ui-command__dialog').first().evaluate((dialog) => dialog.open), false);

        assert.deepEqual(errors, [], 'No JavaScript exception during real component interactions');
    } finally {
        await browser.close();
    }
});


test('showroom and redesigned landing are responsive in both themes', { timeout: 150_000 }, async () => {
    mkdirSync(DIR, { recursive: true });
    const browser = await chromium.launch({ headless: true });
    try {
        for (const size of [
            { name: 'desktop', width: 1440, height: 900 },
            { name: 'mobile', width: 390, height: 844 },
        ]) {
            for (const theme of ['light', 'dark']) {
                const page = await browser.newPage({
                    viewport: { width: size.width, height: size.height },
                    reducedMotion: 'reduce',
                    colorScheme: theme,
                });
                await page.addInitScript((mode) => {
                    try { localStorage.setItem('guilloche-doc-theme', mode); } catch {}
                }, theme);
                for (const route of ['', '/showcase']) {
                    const response = await page.goto(BASE + route, { waitUntil: 'networkidle' });
                    assert.equal(response?.status(), 200);
                    const check = await page.evaluate(() => ({
                        scroll: document.documentElement.scrollWidth,
                        viewport: innerWidth,
                        heading: document.querySelector('h1')?.textContent,
                        tabCount: document.querySelectorAll('.studio [role="tab"]').length,
                    }));
                    assert.equal(check.tabCount, 3, 'the showroom must expose all three views');
                    assert.ok(check.heading, 'landing heading must be present');
                    assert.ok(check.scroll <= check.viewport + 2,
                        (route || '/') + ' ' + size.name + '/' + theme + ': horizontal overflow ' + check.scroll);
                    const name = route ? 'showroom' : 'landing';
                    await page.screenshot({ path: path.join(DIR, name + '-' + size.name + '-' + theme + '.png'),
                        fullPage: true, animations: 'disabled' });
                }
                await page.close();
            }
        }
    } finally {
        await browser.close();
    }
});

test('showroom keyboard tabs and form simulation work without sending data', { timeout: 75_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
        const errors = [];
        const requests = [];
        page.on('pageerror', (err) => errors.push(err.message));
        page.on('request', (req) => { if (req.method() !== 'GET') requests.push(req.url()); });
        await page.goto(BASE + '/showcase', { waitUntil: 'networkidle' });

        const overview = page.locator('#studio-tab-overview');
        const data = page.locator('#studio-tab-data');
        const form = page.locator('#studio-tab-form');
        assert.equal(await overview.getAttribute('aria-selected'), 'true');
        await overview.focus();
        await page.keyboard.press('ArrowRight');
        assert.equal(await data.getAttribute('aria-selected'), 'true');
        assert.equal(await page.locator('#studio-panel-overview').isVisible(), false);
        assert.equal(await page.locator('#studio-panel-data .ui-table').isVisible(), true);

        await form.click();
        await page.locator('#studio-name').fill('Contrat Atlas');
        await page.locator('#studio-client').fill('Atlas');
        await page.locator('#studio-budget').fill('4500');
        await page.locator('[data-studio-form] button[type=submit]').click();
        assert.match(await page.locator('[data-studio-feedback]').textContent(), /Aucune donnée enregistrée/);
        assert.deepEqual(requests, [], 'the studio is a local demo, not a fake backend');

        await page.locator('[data-studio-refresh]').click();
        assert.equal(await overview.getAttribute('aria-selected'), 'true');
        await form.click();
        assert.equal(await page.locator('#studio-name').inputValue(), '');
        assert.deepEqual(errors, [], 'the showroom must not throw JavaScript exceptions');
    } finally {
        await browser.close();
    }
});


test('P0 core recipes preserve control geometry and hover/invalid states in both themes', { timeout: 180_000 }, async () => {
    mkdirSync(DIR, { recursive: true });
    const browser = await chromium.launch({ headless: true });
    try {
        const cases = [
            { name: 'desktop', width: 1440, height: 900 },
            { name: 'mobile', width: 390, height: 844 },
        ];
        const core = ['button', 'input', 'textarea', 'select', 'badge', 'card', 'table'];
        for (const size of cases) {
            for (const theme of ['light', 'dark']) {
                const page = await browser.newPage({
                    viewport: { width: size.width, height: size.height },
                    colorScheme: theme,
                    reducedMotion: 'reduce',
                });
                await page.addInitScript((mode) => {
                    try { localStorage.setItem('guilloche-doc-theme', mode); } catch {}
                }, theme);
                for (const name of core) {
                    const response = await page.goto(BASE + '/components/' + name, { waitUntil: 'networkidle' });
                    assert.equal(response?.status(), 200);
                    const horizontal = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
                    assert.ok(horizontal[0] <= horizontal[1] + 2, 'overflow: ' + name + '/' + size.name + '/' + theme + ' ' + horizontal);
                    await page.screenshot({
                        path: path.join(DIR, 'core-' + name + '-' + size.name + '-' + theme + '.png'),
                        fullPage: true,
                        animations: 'disabled',
                    });
                    if (name === 'button') {
                        const heights = await page.locator('.ds__example-render .ui-button').evaluateAll((els) =>
                            Object.fromEntries(['sm', 'md', 'lg'].map((token) => {
                                const el = els.find((e) => e.classList.contains('ui-button--' + token));
                                return [token, el ? getComputedStyle(el).height : null];
                            })),
                        );
                        assert.deepEqual(heights, { sm: '34px', md: '40px', lg: '44px' });
                        const first = page.locator('.ds__example-render .ui-button--primary:not(:disabled)').first();
                        const before = await first.evaluate((el) => getComputedStyle(el).backgroundColor);
                        await first.hover();
                        const after = await first.evaluate((el) => getComputedStyle(el).backgroundColor);
                        assert.notEqual(after, before, 'primary hover must be distinguishable');
                        assert.equal(await page.locator('.ds__example-render .ui-button:disabled').count() > 0, true);
                    }
                    if (name === 'input') {
                        assert.equal(await page.locator('#x-text').evaluate((e) => getComputedStyle(e).height), '40px');
                        assert.equal(await page.locator('#x-invalid').getAttribute('aria-invalid'), 'true');
                    }
                    if (name === 'textarea') {
                        const h = await page.locator('.ds__example-render .ui-textarea').first()
                            .evaluate((e) => parseFloat(getComputedStyle(e).height));
                        assert.ok(h >= 112, 'textarea must be tall enough');
                    }
                    if (name === 'select') {
                        const h = await page.locator('.ds__example-render .ui-select').first()
                            .evaluate((e) => getComputedStyle(e).height);
                        assert.equal(h, '40px');
                    }
                    if (name === 'card') {
                        const radius = await page.locator('.ds__example-render .ui-card').first()
                            .evaluate((e) => parseFloat(getComputedStyle(e).borderTopLeftRadius));
                        assert.ok(radius >= 13, 'card radius should align with surface tokens');
                    }
                    if (name === 'badge') {
                        const h = await page.locator('.ds__example-render .ui-badge').first()
                            .evaluate((e) => parseFloat(getComputedStyle(e).height));
                        assert.ok(h >= 23, 'badges need a legible touch target within a row');
                    }
                    if (name === 'table') {
                        const h = await page.locator('.ds__example-render .ui-table tbody tr').first()
                            .evaluate((e) => parseFloat(getComputedStyle(e).height));
                        assert.ok(h >= 46, 'table rows must retain readable spacing');
                        const serialCellWrap = await page.locator('.ui-table--serial-first tbody td:first-child').first()
                            .evaluate((el) => getComputedStyle(el).whiteSpace);
                        assert.equal(serialCellWrap, 'nowrap', 'serial numbers should not split on narrow screens');
                    }
                }
                await page.close();
            }
        }
    } finally {
        await browser.close();
    }
});


test('P0 interactive surfaces render and work in Chromium across themes and viewports', { timeout: 180_000 }, async () => {
    mkdirSync(DIR, { recursive: true });
    const browser = await chromium.launch({ headless: true });
    try {
        for (const size of [
            { name: 'desktop', width: 1440, height: 900 },
            { name: 'mobile', width: 390, height: 844 },
        ]) {
            for (const theme of ['light', 'dark']) {
                const page = await browser.newPage({
                    viewport: { width: size.width, height: size.height },
                    colorScheme: theme,
                    reducedMotion: 'reduce',
                });
                await page.addInitScript((mode) => {
                    try { localStorage.setItem('guilloche-doc-theme', mode); } catch {}
                }, theme);
                const errors = [];
                page.on('pageerror', (error) => errors.push(error.message));
                for (const name of ['dialog', 'tabs', 'alert', 'dropdown-menu']) {
                    const response = await page.goto(BASE + '/components/' + name, { waitUntil: 'networkidle' });
                    assert.equal(response?.status(), 200, name + ' must render in Symfony');
                    const dims = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
                    assert.ok(dims[0] <= dims[1] + 2, name + ' overflows ' + size.name + '/' + theme);
                    await page.screenshot({
                        path: path.join(DIR, 'surface-' + name + '-' + size.name + '-' + theme + '.png'),
                        fullPage: true, animations: 'disabled',
                    });
                    if (name === 'dialog') {
                        const trigger = page.locator('.ui-dialog__trigger').first();
                        assert.equal(await trigger.evaluate((e) => getComputedStyle(e).height), '40px');
                        await trigger.click();
                        assert.equal(await page.locator('dialog.ui-dialog').first().evaluate((d) => d.open), true);
                        await page.screenshot({
                            path: path.join(DIR, 'surface-dialog-open-' + size.name + '-' + theme + '.png'),
                            animations: 'disabled',
                        });
                        await page.locator('.ui-dialog__close').first().click();
                        assert.equal(await page.locator('dialog.ui-dialog').first().evaluate((d) => d.open), false);
                    }
                    if (name === 'tabs') {
                        const current = page.locator('.ui-tabs__tab[aria-current="page"]');
                        assert.equal(await current.count(), 1, 'navigation tabs must have one current link');
                        assert.equal(await current.evaluate((e) => getComputedStyle(e).minHeight), '40px');
                    }
                    if (name === 'alert') {
                        assert.ok(await page.locator('.ui-alert[role="status"]').count() >= 3);
                        assert.ok(await page.locator('.ui-alert[role="alert"]').count() >= 1);
                        assert.equal(await page.locator('.ui-alert').first().evaluate((e) => getComputedStyle(e).borderTopWidth), '1px');
                        assert.ok(await page.locator('.ui-alert .ui-button--secondary').count() >= 1, 'alert example must use a supported button variant');
                    }
                    if (name === 'dropdown-menu') {
                        const dropdown = page.locator('.ui-dropdown').first();
                        const trigger = dropdown.locator('summary.ui-dropdown__trigger');
                        assert.equal(await trigger.evaluate((e) => getComputedStyle(e).minHeight), '40px');
                        await trigger.click();
                        assert.equal(await dropdown.evaluate((e) => e.open), true);
                        assert.ok(await dropdown.locator('.ui-dropdown__item').count() > 0);
                        const popup = await dropdown.locator('.ui-dropdown__menu').boundingBox();
                        const preview = await page.locator('.ds__example-render').first().boundingBox();
                        assert.ok(popup && preview && popup.y + popup.height <= preview.y + preview.height + 2,
                            'open dropdown should not cover the Twig code below its preview');
                        await page.screenshot({
                            path: path.join(DIR, 'surface-dropdown-open-' + size.name + '-' + theme + '.png'),
                            animations: 'disabled',
                        });
                        await trigger.click();
                        assert.equal(await dropdown.evaluate((e) => e.open), false);
                    }
                }
                assert.deepEqual(errors, [], size.name + '/' + theme + ' should not throw JS errors');
                await page.close();
            }
        }
    } finally { await browser.close(); }
});


test('real server-rendered playground updates six Twig recipes with no overflow', { timeout: 180_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        for (const vp of [
            { name: 'desktop', width: 1440, height: 900, theme: 'light' },
            { name: 'mobile', width: 390, height: 844, theme: 'dark' },
        ]) {
            const page = await browser.newPage({
                viewport: { width: vp.width, height: vp.height },
                colorScheme: vp.theme,
                reducedMotion: 'reduce',
            });
            const errors = [];
            page.on('pageerror', (err) => errors.push(err.message));
            await page.addInitScript((value) => localStorage.setItem('guilloche-doc-theme', value), vp.theme);

            for (const [recipe, select, option, expected, code] of [
                ['button', '#pg-variant', 'danger', '.ds__playground-preview .ui-button--danger', 'variant="danger"'],
                ['input', '#pg-type', 'email', '.ds__playground-preview input[type=email]', 'type="email"'],
                ['badge', '#pg-tone', 'warning', '.ds__playground-preview .ui-badge--warning', 'tone="warning"'],
            ]) {
                const response = await page.goto(BASE + '/components/' + recipe, { waitUntil: 'networkidle' });
                assert.equal(response?.status(), 200);
                await page.selectOption(select, option);
                await page.locator(expected).waitFor({ state: 'visible' });
                assert.ok((await page.locator('[data-playground-code]').textContent()).includes(code));
                assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= vp.width + 2);
            }
            for (const [recipe, textInput, updated, classSelector] of [
                ['card', '#pg-title', 'Nouvelle mission', '.ds__playground-preview .ui-card__title'],
                ['dialog', '#pg-title', 'Nouvelle mission', '.ds__playground-preview .ui-dialog__title'],
                ['table', '#pg-caption', 'Nouvelle mission', '.ds__playground-preview .ui-table__caption'],
            ]) {
                await page.goto(BASE + '/components/' + recipe, { waitUntil: 'networkidle' });
                await page.locator(textInput).fill(updated);
                await page.waitForFunction(([selector, value]) =>
                    document.querySelector(selector)?.textContent?.includes(value), [classSelector, updated]);
                assert.match(await page.locator('[data-playground-code]').textContent(), /Nouvelle mission/);
                assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= vp.width + 2);
            }
            await page.locator('[data-playground-viewport="mobile"]').click();
            assert.equal(await page.locator('[data-playground-preview]').getAttribute('class'),
                'ds__playground-preview is-compact');
            assert.deepEqual(errors, [], 'playground JavaScript errors: ' + vp.name);
            await page.screenshot({
                path: path.join(DIR, 'playground-' + vp.name + '-' + vp.theme + '.png'),
                fullPage: true, animations: 'disabled',
            });
            await page.close();
        }
    } finally { await browser.close(); }
});

test('playground stays useful without JavaScript and uses safe query parameters', { timeout: 75_000 }, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
        const page = await context.newPage();
        await page.goto(BASE + '/components/button');
        await page.selectOption('#pg-variant', 'outline');
        await page.locator('[data-playground-form] [type=submit]').click();
        assert.match(page.url(), /p_variant=outline/);
        assert.equal(await page.locator('.ds__playground-preview .ui-button--outline').count(), 1);
        assert.match(await page.locator('[data-playground-code]').textContent(), /variant="outline"/);
        await context.close();
    } finally { await browser.close(); }
});
