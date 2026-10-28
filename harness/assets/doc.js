// Documentation : barre du haut, recherche, onglets de code, copie, theme.
const root = document.documentElement;

const THEME_KEY = 'guilloche-doc-theme';
const media = matchMedia('(prefers-color-scheme: dark)');

const applyTheme = (choice) => {
    if (choice === 'system') {
        delete root.dataset.uiTheme;
    } else {
        root.dataset.uiTheme = choice;
    }
    document.querySelectorAll('[data-doc-theme]').forEach((button) => {
        button.dataset.themeState = choice;
        button.textContent = choice === 'system' ? 'Système' : choice === 'dark' ? 'Sombre' : 'Clair';
    });
};

let themeChoice = localStorage.getItem(THEME_KEY) ?? 'system';
applyTheme(themeChoice);

media.addEventListener('change', () => {
    if (themeChoice === 'system') applyTheme('system');
});

document.querySelectorAll('[data-doc-theme]').forEach((button) => {
    button.addEventListener('click', () => {
        themeChoice = themeChoice === 'system' ? 'light' : themeChoice === 'light' ? 'dark' : 'system';
        localStorage.setItem(THEME_KEY, themeChoice);
        applyTheme(themeChoice);
    });
});

// Recherche : filtre les composants, Entree ouvre le premier resultat.
const search = document.querySelector('[data-doc-search]');
const searchResults = document.querySelector('[data-doc-search-results]');
if (search && searchResults) {
    const items = [...searchResults.querySelectorAll('[data-search-item]')];
    const filter = () => {
        const term = search.value.trim().toLowerCase();
        let count = 0;
        for (const item of items) {
            const match = item.textContent.toLowerCase().includes(term);
            item.parentElement.hidden = !match;
            if (match) count++;
        }
        searchResults.hidden = count === 0 || term === '';
    };
    search.addEventListener('input', filter);
    search.addEventListener('focus', filter);
    search.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchResults.hidden = true;
            search.blur();
        }
        if (event.key === 'Enter') {
            const first = items.find((item) => !item.parentElement.hidden);
            if (first) window.location.assign(first.href);
        }
    });
    document.addEventListener('click', (event) => {
        if (!searchResults.contains(event.target) && event.target !== search) {
            searchResults.hidden = true;
        }
    });
    document.addEventListener('keydown', (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            search.focus();
        }
    });
}

// Coloration simple : balises, attributs, valeurs, expressions Twig.
const escape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const highlight = (code) => escape(code).replace(
    /(&lt;\/?[\w:.-]+)|([\w-]+)=|"([^"]*)"|(\{\{.*?\}\}|\{%.*?%\})/g,
    (match, tag, attr, value, expression) => {
        if (tag) return `<span class="tok-tag">${tag}</span>`;
        if (attr) return `<span class="tok-attr">${attr}</span>=`;
        if (value !== undefined) return `"<span class="tok-str">${value}</span>"`;
        if (expression) return `<span class="tok-expr">${expression}</span>`;
        return match;
    },
);

const withLineNumbers = (html) => html
    .split('\n')
    .map((line) => `<span class="ln"></span>${line}`)
    .join('\n');

const scssTemplate = document.querySelector('#doc-scss');
const scss = scssTemplate ? scssTemplate.content.textContent.trim() : '';

document.querySelectorAll('.ds__example').forEach((example) => {
    const render = example.querySelector('.ds__example-render');
    const codeBlock = example.querySelector('.ds__example-code');
    if (!render || !codeBlock) return;

    const head = example.querySelector('.ds__example-head');
    head?.querySelector('[data-copy]')?.remove();

    const twigCode = codeBlock.querySelector('code')?.textContent.trim() ?? '';

    const tabs = document.createElement('div');
    tabs.className = 'ds__code-tabs';

    const makeTab = (label, pane) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ds__code-tab';
        button.textContent = label;
        button.dataset.codeTab = pane;
        button.setAttribute('aria-selected', String(pane === 'twig'));
        tabs.append(button);
        return button;
    };
    const twigTab = makeTab('index.html.twig', 'twig');

    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'ds__code-copy';
    copy.setAttribute('aria-label', 'Copier le code');
    copy.textContent = 'Copier';
    tabs.append(copy);

    const preTwig = document.createElement('pre');
    preTwig.dataset.codePane = 'twig';
    preTwig.innerHTML = `<code>${withLineNumbers(highlight(twigCode))}</code>`;

    codeBlock.replaceChildren(tabs, preTwig);

    let preScss = null;
    let scssTab = null;
    if (scss) {
        scssTab = makeTab(`${example.closest('[data-doc]')?.dataset.doc ?? 'styles'}.scss`, 'scss');
        tabs.insertBefore(scssTab, copy);
        preScss = document.createElement('pre');
        preScss.dataset.codePane = 'scss';
        preScss.hidden = true;
        preScss.innerHTML = `<code>${withLineNumbers(highlight(scss))}</code>`;
        codeBlock.append(preScss);
    }

    const show = (pane) => {
        preTwig.hidden = pane !== 'twig';
        if (preScss) preScss.hidden = pane !== 'scss';
        for (const tab of tabs.querySelectorAll('[data-code-tab]')) {
            tab.setAttribute('aria-selected', String(tab.dataset.codeTab === pane));
        }
    };
    twigTab.addEventListener('click', () => show('twig'));
    scssTab?.addEventListener('click', () => show('scss'));

    copy.addEventListener('click', async () => {
        const active = preTwig.hidden ? preScss : preTwig;
        await navigator.clipboard.writeText(active.querySelector('code').textContent);
        copy.textContent = 'Copié';
        setTimeout(() => { copy.textContent = 'Copier'; }, 1200);
    });
});

// Copier la page en Markdown.
document.querySelector('[data-copy-page]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const title = document.querySelector('h1')?.textContent.trim() ?? '';
    const lead = document.querySelector('.ds__lead')?.textContent.trim() ?? '';
    const code = document.querySelector('.ds__example-code code')?.textContent.trim() ?? '';
    await navigator.clipboard.writeText(`# ${title}\n\n${lead}\n\n\`\`\`twig\n${code}\n\`\`\`\n`);
    button.textContent = 'Copié';
    setTimeout(() => { button.textContent = 'Copier la page en Markdown'; }, 1200);
});

const links = [...document.querySelectorAll('.ds__toc a')];
if (links.length) {
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            for (const link of links) {
                link.toggleAttribute('aria-current', link.hash === `#${entry.target.id}`);
            }
        }
    }, { rootMargin: '-20% 0px -70% 0px' });
    for (const link of links) {
        const section = document.querySelector(link.hash);
        if (section) observer.observe(section);
    }
}


// Showroom : onglets accessibles, données statiques SSR et formulaire simulé.
// Aucun appel réseau ni stockage des données d'exemple.
document.querySelectorAll('[data-studio]').forEach((studio) => {
    const tabs = [...studio.querySelectorAll('[data-studio-tab]')];
    const panels = [...studio.querySelectorAll('[data-studio-panel]')];
    const form = studio.querySelector('[data-studio-form]');
    const feedback = studio.querySelector('[data-studio-feedback]');
    const title = studio.querySelector('.studio__workspace-heading h2');
    const titles = { overview: "Vue d'ensemble", data: 'Suivi des missions', form: 'Nouvelle mission' };
    const select = (target, focus = false) => {
        for (const tab of tabs) {
            const active = tab.dataset.studioTab === target;
            tab.setAttribute('aria-selected', String(active));
            tab.tabIndex = active ? 0 : -1;
            if (active && focus) tab.focus();
        }
        for (const panel of panels) panel.hidden = panel.dataset.studioPanel !== target;
        if (title) title.textContent = titles[target] ?? titles.overview;
    };
    for (const [index, tab] of tabs.entries()) {
        tab.addEventListener('click', () => select(tab.dataset.studioTab));
        tab.addEventListener('keydown', (event) => {
            let next = index;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else return;
            event.preventDefault();
            select(tabs[next].dataset.studioTab, true);
        });
    }
    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity() || !feedback) return;
        feedback.hidden = false;
        feedback.textContent = 'Aperçu validé localement. Aucune donnée enregistrée ou envoyée.';
    });
    studio.querySelector('[data-studio-refresh]')?.addEventListener('click', () => {
        form?.reset();
        if (feedback) {
            feedback.hidden = true;
            feedback.textContent = '';
        }
        select('overview');
    });
});

// Indicateurs de recherche et repère de navigation cohérents.
const docSearch = document.querySelector('[data-doc-search]');
const docResults = document.querySelector('[data-doc-search-results]');
if (docSearch && docResults) {
    const syncExpanded = () => docSearch.setAttribute('aria-expanded', String(!docResults.hidden));
    new MutationObserver(syncExpanded).observe(docResults, { attributes: true, attributeFilter: ['hidden'] });
    syncExpanded();
}
for (const link of document.querySelectorAll('.ds__nav a')) {
    if (link.pathname === window.location.pathname && !link.hash) link.setAttribute('aria-current', 'page');
}


// Playground : GET natif sans JavaScript, amélioré par fetch de vrais fragments Twig.
// Ne génère jamais de HTML de composants ni de snippets à partir de données client.
document.querySelectorAll('[data-playground]').forEach((section) => {
    const form = section.querySelector('[data-playground-form]');
    const status = section.querySelector('[data-playground-status]');
    const submit = form.querySelector('[type="submit"]');
    const setStatus = (message) => { if (status) status.textContent = message; };
    let controller = null;
    let debounce = null;
    let mobile = false;
    submit.hidden = true;

    const syncViewport = () => {
        const preview = section.querySelector('[data-playground-preview]');
        preview?.classList.toggle('is-compact', mobile);
        section.querySelectorAll('[data-playground-viewport]').forEach((button) => {
            button.setAttribute('aria-pressed', String((button.dataset.playgroundViewport === 'mobile') === mobile));
        });
    };

    async function refresh() {
        controller?.abort();
        controller = new AbortController();
        const result = section.querySelector('[data-playground-result]');
        const url = new URL(form.action);
        url.search = new URLSearchParams(new FormData(form)).toString();
        const fragmentUrl = new URL(url);
        fragmentUrl.searchParams.set('fragment', '1');
        result?.setAttribute('aria-busy', 'true');
        setStatus('Mise à jour…');
        try {
            const response = await fetch(fragmentUrl, {
                headers: { 'Accept': 'text/html' },
                signal: controller.signal,
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const template = document.createElement('template');
            template.innerHTML = await response.text();
            const next = template.content.querySelector('[data-playground-result]');
            if (!next || !result) throw new Error('Aperçu absent');
            result.replaceWith(next);
            syncViewport();
            history.replaceState(null, '', url.pathname + url.search + '#playground');
            setStatus('Aperçu à jour');
        } catch (error) {
            if (error.name !== 'AbortError') {
                setStatus('Aperçu indisponible. Utilisez « Appliquer » pour recharger la page.');
                submit.hidden = false;
            }
        } finally {
            result?.removeAttribute('aria-busy');
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearTimeout(debounce);
        refresh();
    });
    form.addEventListener('change', () => {
        clearTimeout(debounce);
        refresh();
    });
    form.addEventListener('input', (event) => {
        if (event.target.matches('[type="text"],[type="number"],input:not([type])')) {
            clearTimeout(debounce);
            debounce = setTimeout(refresh, 250);
        }
    });
    section.addEventListener('click', async (event) => {
        const viewportButton = event.target.closest('[data-playground-viewport]');
        if (viewportButton) {
            mobile = viewportButton.dataset.playgroundViewport === 'mobile';
            syncViewport();
            return;
        }
        if (!event.target.closest('[data-playground-copy]')) return;
        const button = event.target.closest('[data-playground-copy]');
        const source = section.querySelector('[data-playground-code]')?.textContent ?? '';
        try {
            await navigator.clipboard.writeText(source);
            button.textContent = 'Copié';
            setStatus('Code Twig copié');
        } catch {
            setStatus('Copie refusée par le navigateur : sélectionnez le code ci-dessous.');
        }
    });
});
