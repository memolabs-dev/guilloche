import { Controller } from '@hotwired/stimulus';

// ui--toggle : bascule aria-pressed au clic. L'etat initial vient du serveur.
export default class extends Controller {
    toggle() {
        const pressed = this.element.getAttribute('aria-pressed') === 'true';
        this.element.setAttribute('aria-pressed', pressed ? 'false' : 'true');
        this.element.classList.toggle('is-pressed', !pressed);
    }
}
