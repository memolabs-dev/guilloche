// Comportement facultatif pour la composition "Formulaire de mission".
// Aucune requête réseau ni persistance. Reprenez cet exemple avec votre
// véritable contrôleur Symfony, ses validations et un jeton CSRF.
document.querySelectorAll('[data-gp-demo-form]').forEach((form) => {
    const check = form.querySelector('[data-gp-check]');
    const status = form.querySelector('[data-gp-status]');
    if (!check || !status) return;
    check.disabled = false;

    check.addEventListener('click', () => {
        if (form.reportValidity()) {
            status.textContent = 'Champs valides. Aucun enregistrement effectué.';
        } else {
            status.textContent = 'Complétez les champs requis pour continuer.';
        }
    });
    form.addEventListener('input', () => {
        status.textContent = 'Données fictives · Aucun envoi au serveur';
    });
});
document.querySelectorAll('[data-gp-preview-viewport]').forEach((control) => {
    control.addEventListener('click', () => {
        const frame = control.closest('[data-gp-pattern-frame]');
        if (!frame) return;
        const compact = control.dataset.gpPreviewViewport === 'mobile';
        frame.querySelector('[data-gp-pattern-render]')?.classList.toggle('gp-doc__render--mobile', compact);
        frame.querySelectorAll('[data-gp-preview-viewport]').forEach((button) => {
            button.setAttribute('aria-pressed', String((button.dataset.gpPreviewViewport === 'mobile') === compact));
        });
    });
});
document.querySelectorAll('[data-gp-copy]').forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', async () => {
        const target = document.getElementById(button.dataset.gpCopy);
        if (!target) return;
        try {
            await navigator.clipboard.writeText(target.textContent || '');
            const status = button.parentElement?.querySelector('[data-gp-copy-status]');
            if (status) status.textContent = 'Copié';
        } catch {
            const status = button.parentElement?.querySelector('[data-gp-copy-status]');
            if (status) status.textContent = 'Sélectionnez le code pour le copier.';
        }
    });
});
