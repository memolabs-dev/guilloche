# Toggle — kit Guilloche

Bouton a deux états, rendu avec `aria-pressed`.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `pressed` | `false` | Etat initial, rendu par le serveur |
| `label` | `null` | Nom accessible quand le slot ne suffit pas |

## Contrôleur

`assets/controllers/toggle_controller.js`, identifiant `ui--toggle`. Il bascule `aria-pressed` au clic. L'application doit l'enregistrer ; sans JavaScript, l'etat rendu par le serveur reste correct.

## Exemple

```twig
<twig:ui:Toggle :pressed="true">Favoris</twig:ui:Toggle>
```
