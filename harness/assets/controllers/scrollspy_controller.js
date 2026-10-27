import { Controller } from '@hotwired/stimulus';

// ui--scrollspy : met aria-current sur le lien de la section visible.
// IntersectionObserver evite tout calcul de position a chaque defilement.
export default class extends Controller {
    static targets = ['link'];

    connect() {
        this.sections = this.linkTargets
            .map((link) => document.getElementById(link.dataset.section))
            .filter(Boolean);
        if (!this.sections.length || !('IntersectionObserver' in window)) return;

        this.observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) this.activate(entry.target.id);
            }
        }, { rootMargin: '-40% 0px -50% 0px' });

        this.sections.forEach((section) => this.observer.observe(section));
    }

    disconnect() {
        this.observer?.disconnect();
    }

    activate(id) {
        for (const link of this.linkTargets) {
            if (link.dataset.section === id) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        }
    }
}
