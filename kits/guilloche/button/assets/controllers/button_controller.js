import { Controller } from '@hotwired/stimulus';

// ui--button : hover/état actif du bouton Guilloche. Aucun comportement critique hors JS.
export default class extends Controller {
    static targets = ['label'];

    connect() {
        this.element.classList.add('ui-button--enhanced');
    }

    disconnect() {
        this.element.classList.remove('ui-button--enhanced');
    }
}
