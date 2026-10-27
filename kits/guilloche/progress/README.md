# Progress — kit Guilloche

Barre d'avancement bornee.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `value` | `0` | Valeur courante |
| `max` | `100` | Valeur maximale |
| `label` | requis | Nom accessible de la progression |
| `showValue` | `false` | Affiche le pourcentage a droite |

## Accessibilite

`rôle="progressbar"` avec `aria-valuemin`, `aria-valuemax`, `aria-valuenow` et `aria-label`. Le pourcentage affiche est `aria-hidden` pour eviter une double annonce.
