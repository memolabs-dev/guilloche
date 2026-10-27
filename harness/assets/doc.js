// Documentation : onglets Apercu / Code, bascule de theme, copie, sommaire.
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

let choice = localStorage.getItem(THEME_KEY) ?? 'system';
applyTheme(choice);

media.addEventListener('change', () => {
    if (choice === 'system') applyTheme('system');
});

document.querySelectorAll('[data-doc-theme]').forEach((button) => {
    button.addEventListener('click', () => {
        choice = choice === 'system' ? 'light' : choice === 'light' ? 'dark' : 'system';
        localStorage.setItem(THEME_KEY, choice);
        applyTheme(choice);
    });
});

document.querySelectorAll('.ds__example').forEach((example) => {
    const render = example.querySelector('.ds__example-render');
    const code = example.querySelector('.ds__example-code');
    if (!render || !code) return;

    const tabs = document.createElement('div');
    tabs.className = 'ds__example-tabs';
    tabs.setAttribute('role', 'tablist');

    const previewTab = document.createElement('button');
    previewTab.type = 'button';
    previewTab.className = 'ds__example-tab';
    previewTab.textContent = 'Aperçu';
    previewTab.setAttribute('role', 'tab');
    previewTab.setAttribute('aria-selected', 'true');

    const codeTab = document.createElement('button');
    codeTab.type = 'button';
    codeTab.className = 'ds__example-tab';
    codeTab.textContent = 'Code';
    codeTab.setAttribute('role', 'tab');
    codeTab.setAttribute('aria-selected', 'false');

    tabs.append(previewTab, codeTab);
    example.querySelector('.ds__example-head').after(tabs);

    render.classList.add('ds__example-pane');
    code.classList.add('ds__example-pane');
    code.hidden = true;

    const show = (pane) => {
        render.hidden = pane === 'code';
        code.hidden = pane !== 'code';
        previewTab.setAttribute('aria-selected', String(pane === 'preview'));
        codeTab.setAttribute('aria-selected', String(pane === 'code'));
    };
    previewTab.addEventListener('click', () => show('preview'));
    codeTab.addEventListener('click', () => show('code'));
});

document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
        const target = button.closest('.ds__example')?.querySelector('pre code');
        if (!target) return;
        await navigator.clipboard.writeText(target.textContent.trim());
        const label = button.textContent;
        button.textContent = 'Copié';
        setTimeout(() => { button.textContent = label; }, 1200);
    });
});

const navButton = document.querySelector('[data-doc-nav]');
const navPanel = document.querySelector('[data-doc-nav-panel]');
if (navButton && navPanel) {
    navButton.addEventListener('click', () => {
        const open = navButton.getAttribute('aria-expanded') !== 'true';
        navButton.setAttribute('aria-expanded', String(open));
        navPanel.classList.toggle('is-open', open);
    });
}

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
