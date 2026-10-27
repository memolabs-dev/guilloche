// Documentation : bascule de theme, copie du code, sommaire actif.
const root = document.documentElement;

const stored = localStorage.getItem('guilloche-doc-theme');
if (stored) {
    root.dataset.uiTheme = stored;
}

document.querySelectorAll('[data-doc-theme]').forEach((button) => {
    button.addEventListener('click', () => {
        const next = root.dataset.uiTheme === 'dark' ? 'light' : 'dark';
        root.dataset.uiTheme = next;
        localStorage.setItem('guilloche-doc-theme', next);
    });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
        const target = button.closest('.ds__example')?.querySelector('pre code');
        if (!target) return;
        await navigator.clipboard.writeText(target.textContent.trim());
        const label = button.textContent;
        button.textContent = 'Copie';
        setTimeout(() => { button.textContent = label; }, 1200);
    });
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
