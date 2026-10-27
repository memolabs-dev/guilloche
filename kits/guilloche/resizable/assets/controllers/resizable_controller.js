import { Controller } from '@hotwired/stimulus';

// ui--resizable : ajuste la largeur du panneau au pointeur ou aux fleches.
// La poignee est un separateur accessible.
export default class extends Controller {
    static targets = ['panel', 'handle'];

    start(event) {
        event.preventDefault();
        const startX = event.clientX;
        const startWidth = this.panelTarget.getBoundingClientRect().width;
        this.move = (moveEvent) => {
            const width = Math.max(160, startWidth + (moveEvent.clientX - startX));
            this.panelTarget.style.width = `${width}px`;
        };
        this.stop = () => {
            window.removeEventListener('pointermove', this.move);
            window.removeEventListener('pointerup', this.stop);
        };
        window.addEventListener('pointermove', this.move);
        window.addEventListener('pointerup', this.stop);
    }

    step(event) {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const width = this.panelTarget.getBoundingClientRect().width;
        this.panelTarget.style.width = `${Math.max(160, width + (event.key === 'ArrowRight' ? 16 : -16))}px`;
    }

    disconnect() {
        if (this.stop) this.stop();
    }
}
