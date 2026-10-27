import { Controller } from '@hotwired/stimulus';

// ui--navbar : bascule la navigation sur petit ecran. aria-expanded suit l'etat.
export default class extends Controller {
    static targets = ['nav', 'toggle'];

    toggle() {
        const open = this.toggleTarget.getAttribute('aria-expanded') !== 'true';
        this.toggleTarget.setAttribute('aria-expanded', String(open));
        this.navTarget.classList.toggle('is-open', open);
    }
}
