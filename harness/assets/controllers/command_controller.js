import { Controller } from '@hotwired/stimulus';

// ui--command : ouvre la palette, filtre les entrees, gere les fleches et
// Entree, et suit le lien de l'entree active.
export default class extends Controller {
    static targets = ['dialog', 'input'];

    open() {
        this.inputTarget.value = '';
        this.filter();
        if (!this.dialogTarget.open) this.dialogTarget.showModal();
        this.inputTarget.focus();
    }

    close() {
        if (this.dialogTarget.open) this.dialogTarget.close();
    }

    filter() {
        const term = this.inputTarget.value.toLowerCase();
        for (const item of this.items) {
            item.hidden = !item.textContent.toLowerCase().includes(term);
        }
        this.active = -1;
    }

    navigate(event) {
        if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
        event.preventDefault();
        const visible = this.items.filter((item) => !item.hidden);
        if (!visible.length) return;
        this.active = event.key === 'Enter'
            ? Math.max(this.active, 0)
            : event.key === 'ArrowDown'
                ? Math.min(this.active + 1, visible.length - 1)
                : Math.max(this.active - 1, 0);
        for (const item of this.items) item.setAttribute('aria-selected', 'false');
        visible[this.active].setAttribute('aria-selected', 'true');
        visible[this.active].scrollIntoView({ block: 'nearest' });
        this.activeElement = visible[this.active];
        if (event.key === 'Enter') this.run({ currentTarget: this.activeElement });
    }

    activate(event) {
        if (event.key === 'Enter') this.run(event);
    }

    run(event) {
        const href = event.currentTarget.dataset.href;
        this.dialogTarget.close();
        if (href) window.location.assign(href);
    }

    get items() {
        return [...this.dialogTarget.querySelectorAll('[role="option"]')];
    }
}
