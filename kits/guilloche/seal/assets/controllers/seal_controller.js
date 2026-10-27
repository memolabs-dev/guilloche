import { Controller } from '@hotwired/stimulus';

// ui--seal : la rosette du sceau derive de la personne qui signe. Meme
// algorithme que ui--rosette, livre ici pour que la recette reste autonome.
export default class extends Controller {
    static values = { seed: String, fresh: Boolean, at: String };

    connect() {
        const trace = this.element.querySelector('.ui-seal__trace');
        if (!trace) return;
        trace.setAttribute('d', this.highlight(this.parameters(this.seedValue || 'guilloche')));
        this.animateFresh();
    }

    // Une validation fraîche s'imprime une seule fois par session et par événement.
    // La clé est hachée : aucune identité du signataire n'est conservée en clair.
    animateFresh() {
        if (!this.freshValue || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const seal = this.element.closest('.ui-seal');
        if (!seal || !seal.classList.contains('ui-seal--validated')) return;
        const key = 'ui-seal-' + this.hash(this.seedValue + '|' + this.atValue);
        try {
            if (window.sessionStorage.getItem(key)) return;
            window.sessionStorage.setItem(key, '1');
        } catch {
            // Stockage désactivé : le composant reste utilisable.
        }
        seal.classList.add('is-fresh');
        seal.addEventListener('animationend', () => seal.classList.remove('is-fresh'), { once: true });
    }

    hash(text) {
        let value = 2166136261;
        for (const character of text) {
            value ^= character.codePointAt(0);
            value = Math.imul(value, 16777619);
        }
        return value >>> 0;
    }

    parameters(seed) {
        const h = this.hash(seed);
        return {
            petals: 3 + (h % 3) * 2,
            copies: 1 + ((h >>> 4) % 2),
            phase: ((h >>> 8) % 360) * (Math.PI / 180),
            skew: 0.8 + ((h >>> 13) % 40) / 100,
        };
    }

    highlight({ petals, copies, phase, skew }) {
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
    }
}
