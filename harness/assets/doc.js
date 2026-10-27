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
