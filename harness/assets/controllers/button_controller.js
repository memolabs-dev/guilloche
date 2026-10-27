import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        this.element.classList.add('ui-button--enhanced');
    }

    disconnect() {
        this.element.classList.remove('ui-button--enhanced');
    }
}
