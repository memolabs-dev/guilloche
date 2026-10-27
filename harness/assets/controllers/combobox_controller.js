import { Controller } from '@hotwired/stimulus';

// ui--combobox : ouvre la liste, filtre les options, gere les fleches, Entree
// et Echap, et reporte la valeur choisie dans le champ cache.
export default class extends Controller {
    static targets = ['input', 'list', 'value'];

    connect() {
        this.options = [...this.listTarget.querySelectorAll('[role="option"]')];
        this.active = -1;
    }

    filter() {
        const term = this.inputTarget.value.toLowerCase();
        let visible = 0;
        for (const option of this.options) {
            const match = option.dataset.label.toLowerCase().includes(term);
            option.hidden = !match;
            option.setAttribute('aria-selected', 'false');
            if (match) visible++;
        }
        this.active = -1;
        this.toggle(visible > 0);
    }

    navigate(event) {
        const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];
        if (!keys.includes(event.key)) return;
        const visible = this.options.filter((option) => !option.hidden);
        if (event.key === 'Escape') {
            this.toggle(false);
            return;
        }
        event.preventDefault();
        if (event.key === 'Enter') {
            if (visible[this.active]) this.select({ currentTarget: visible[this.active] });
            return;
        }
        if (this.listTarget.hidden) this.toggle(visible.length > 0);
        this.active = event.key === 'ArrowDown'
            ? Math.min(this.active + 1, visible.length - 1)
            : Math.max(this.active - 1, 0);
        for (const option of this.options) option.setAttribute('aria-selected', 'false');
        if (visible[this.active]) {
            visible[this.active].setAttribute('aria-selected', 'true');
            visible[this.active].scrollIntoView({ block: 'nearest' });
        }
    }

    select(event) {
        const option = event.currentTarget;
        this.valueTarget.value = option.dataset.value;
        this.inputTarget.value = option.dataset.label;
        this.toggle(false);
    }

    toggle(open) {
        this.listTarget.hidden = !open;
        this.inputTarget.setAttribute('aria-expanded', String(open));
    }
}
