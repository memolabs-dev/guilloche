import { Controller } from '@hotwired/stimulus';

// ui--sheet : ouvre et ferme le panneau lateral natif. Echap reste gere par
// le navigateur.
export default class extends Controller {
    static targets = ['dialog'];

    open() {
        if (!this.dialogTarget.open) {
            this.dialogTarget.showModal();
        }
    }

    close() {
        this.dialogTarget.close();
    }

    backdrop(event) {
        if (event.target === this.dialogTarget) {
            this.close();
        }
    }
}
