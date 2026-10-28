(() => {
// Demonstration : le harnais ne charge pas Stimulus. Meme algorithme que
// le controleur ui--rosette du kit, applique aux rosettes de la page.
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
    return {
        petals: 3 + (h % 3) * 2,
        copies: 1 + ((h >>> 4) % 2),
        phase: ((h >>> 8) % 360) * (Math.PI / 180),
        skew: 0.8 + ((h >>> 13) % 40) / 100,
    };
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

document.querySelectorAll('[data-ui--rosette-seed-value]').forEach((element) => {
    const main = element.querySelector('.ui-rosette__main');
    const counter = element.querySelector('.ui-rosette__counter');
    if (!main || !counter) return;
    const ssr = element.getAttribute('data-ui--rosette-ssr-value') === 'true';
    if (!ssr) {
        const p = parameters(element.getAttribute('data-ui--rosette-seed-value') || 'guilloche');
        main.setAttribute('d', trace(p));
        counter.setAttribute('d', trace({ ...p, petals: p.petals + 2, phase: p.phase + Math.PI / p.copies }));
    }
    const rawProgress = Number(element.getAttribute('data-ui--rosette-progress-value') ?? 100);
    const progress = Number.isFinite(rawProgress) ? Math.min(100, Math.max(0, rawProgress)) : 100;
    if (!ssr && progress < 100) {
        const length = main.getTotalLength();
        main.style.strokeDasharray = String(length);
        main.style.strokeDashoffset = String(length * (1 - progress / 100));
    }
});
})();
