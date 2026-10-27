import { Controller } from '@hotwired/stimulus';

// ui--toast : retire le toast a la fermeture, et apres le delai autohide
// quand il est positif. Sans JavaScript, le toast reste affiche.
export default class extends Controller {
    static values = { autohide: Number };

    connect() {
        if (this.autohideValue > 0) {
            this.timeout = setTimeout(() => this.dismiss(), this.autohideValue);
        }
    }

    disconnect() {
        clearTimeout(this.timeout);
    }

    dismiss() {
        clearTimeout(this.timeout);
        this.element.remove();
    }
}
