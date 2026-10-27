import { Controller } from '@hotwired/stimulus';

// ui--context-menu : ouvre le menu a la position du clic droit, ferme au clic
// ailleurs ou avec Echap. Le menu reste un simple ul[role=menu].
export default class extends Controller {
    static targets = ['list'];

    connect() {
        this.onOutside = (event) => {
            if (!this.element.contains(event.target)) this.close();
        };
        this.onKey = (event) => {
            if (event.key === 'Escape') this.close();
        };
        document.addEventListener('click', this.onOutside);
        document.addEventListener('keydown', this.onKey);
    }

    disconnect() {
        document.removeEventListener('click', this.onOutside);
        document.removeEventListener('keydown', this.onKey);
    }

    open(event) {
        event.preventDefault();
        const bounds = this.element.getBoundingClientRect();
        this.listTarget.hidden = false;
        this.listTarget.style.left = `${event.clientX - bounds.left}px`;
        this.listTarget.style.top = `${event.clientY - bounds.top}px`;
        const first = this.listTarget.querySelector('[role="menuitem"]');
        if (first) first.focus();
    }

    close() {
        this.listTarget.hidden = true;
    }
}
