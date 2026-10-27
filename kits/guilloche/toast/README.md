# Toast — kit Guilloche

Notification transitoire.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant unique |
| `title` | requis | Titre |
| `message` | `null` | Texte |
| `type` | `info` | `info`, `success`, `warning`, `error` |
| `autohide` | `0` | Delai de fermeture en millisecondes, `0` pour rester affiche |

## Controleur

`assets/controllers/toast_controller.js`, identifiant `ui--toast`. Fermeture manuelle et `autohide`. Sans JavaScript, le toast reste visible et reste lisible.

## Accessibilite

`role="status"` et `aria-live="polite"` : le message est annonce sans interrompre la lecture en cours. Pour une erreur critique, preferer `Ui:Alert` avec `role="alert"`.
