# ConfirmDialog — kit Guilloche

Confirmation d'une action, dans un dialogue natif.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant du dialogue |
| `title` | requis | Titre |
| `message` | requis | Texte de la question |
| `trigger` | requis | Libelle du bouton d'ouverture |
| `confirmLabel` | requis | Libelle du bouton de confirmation |
| `cancelLabel` | requis | Libelle du bouton d'annulation |

## Controleur

`assets/controllers/confirm_dialog_controller.js`, identifiant `ui--confirm-dialog`. A la confirmation, il emet `ui:confirm` sur l'element racine puis ferme le dialogue.

```js
document.querySelector('.ui-confirm-dialog-root')
  .addEventListener('ui:confirm', () => form.requestSubmit());
```

Aucun libelle n'est impose : les quatre textes viennent des props.
