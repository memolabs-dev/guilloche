import { Controller } from '@hotwired/stimulus';

// ui--carousel : fait defiler le viewport d'une page a la fois. Le defilement
// natif et scroll-snap restent la base ; les boutons ne sont qu'un raccourci.
export default class extends Controller {
    static targets = ['viewport'];

    previous() {
        this.scroll(-1);
    }

    next() {
        this.scroll(1);
    }

    scroll(direction) {
        const viewport = this.viewportTarget;
        viewport.scrollBy({ left: direction * viewport.clientWidth, behavior: 'smooth' });
    }
}
