import { Controller } from '@hotwired/stimulus';

// ui--input-otp : avance le focus apres un caractere, revient avec Retour
// arriere et repartit un code colle sur les cases.
export default class extends Controller {
    static targets = ['input'];

    next(event) {
        const index = this.inputTargets.indexOf(event.target);
        if (event.target.value && this.inputTargets[index + 1]) {
            this.inputTargets[index + 1].focus();
        }
    }

    back(event) {
        if (event.key !== 'Backspace' || event.target.value) return;
        const index = this.inputTargets.indexOf(event.target);
        if (this.inputTargets[index - 1]) {
            this.inputTargets[index - 1].focus();
        }
    }

    paste(event) {
        event.preventDefault();
        const digits = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, this.inputTargets.length);
        [...digits].forEach((digit, index) => {
            if (this.inputTargets[index]) this.inputTargets[index].value = digit;
        });
        const last = Math.min(digits.length, this.inputTargets.length - 1);
        if (this.inputTargets[last]) this.inputTargets[last].focus();
    }
}
