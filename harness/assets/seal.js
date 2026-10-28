(() => {
// Demonstration : meme algorithme que le controleur ui--seal du kit.
const hash = (text) => {
    let value = 2166136261;
    for (const character of text) {
        value ^= character.codePointAt(0);
        value = Math.imul(value, 16777619);
    }
    return value >>> 0;
};
const parameters = (seed) => {
    const h = hash(seed);
    return { petals: 3 + (h % 3) * 2, copies: 1 + ((h >>> 4) % 2), phase: ((h >>> 8) % 360) * (Math.PI / 180), skew: 0.8 + ((h >>> 13) % 40) / 100 };
};
const trace = ({ petals, copies, phase, skew }) => {
    const steps = 360;
    const points = [];
    for (let copy = 0; copy < copies; copy++) {
        const rotation = phase + (copy * 2 * Math.PI) / copies;
        for (let step = 0; step <= steps; step++) {
            const t = (step / steps) * 2 * Math.PI;
            const radius = 45 * Math.cos(petals * t);
            const x = radius * Math.cos(t + rotation) * skew;
            const y = radius * Math.sin(t + rotation);
            points.push(`${step === 0 ? 'M' : 'L'}${(50 + x).toFixed(2)} ${(50 + y).toFixed(2)}`);
        }
    }
    return points.join(' ');
};
document.querySelectorAll('[data-ui--seal-seed-value]').forEach((element) => {
    const path = element.querySelector('.ui-seal__trace');
    if (!path) return;
    const seed = element.getAttribute('data-ui--seal-seed-value') || 'guilloche';
    if (element.getAttribute('data-ui--seal-ssr-value') !== 'true') {
        path.setAttribute('d', trace(parameters(seed)));
    }
    const seal = element.closest('.ui-seal');
    if (!seal || !seal.classList.contains('ui-seal--validated') ||
        element.getAttribute('data-ui--seal-fresh-value') !== 'true' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const key = 'ui-seal-' + hash(seed + '|' + (element.getAttribute('data-ui--seal-at-value') || ''));
    try {
        if (window.sessionStorage.getItem(key)) return;
        window.sessionStorage.setItem(key, '1');
    } catch {
        // Le stockage peut être désactivé, sans empêcher le rendu.
    }
    seal.classList.add('is-fresh');
    seal.addEventListener('animationend', () => seal.classList.remove('is-fresh'), { once: true });
});
})();
