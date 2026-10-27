import { Controller } from '@hotwired/stimulus';

// ui--confirm-dialog : ouvre le dialogue, et a la confirmation emet ui:confirm
// sur l'element racine avant de fermer. L'application ecoute cet evenement.
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

    confirm() {
        this.element.dispatchEvent(new CustomEvent('ui:confirm', { bubbles: true }));
        this.close();
    }
}
