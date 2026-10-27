import { Controller } from '@hotwired/stimulus';

// ui--file-upload : affiche les noms des fichiers choisis. La selection et
// l'envoi restent ceux de l'input natif.
export default class extends Controller {
    static targets = ['input', 'list'];

    list() {
        this.listTarget.replaceChildren(
            ...[...this.inputTarget.files].map((file) => {
                const item = document.createElement('li');
                item.className = 'ui-file-upload__item';
                item.textContent = file.name;
                return item;
            }),
        );
    }
}
