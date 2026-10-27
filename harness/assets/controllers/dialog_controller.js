import { Controller } from '@hotwired/stimulus';

// ui--dialog : ouvre et ferme la boite modale native. Echap et le bouton
// method="dialog" restent geres par le navigateur.
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
