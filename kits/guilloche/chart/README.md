# Chart — kit Guilloche

Graphique SVG simple, rendu par le serveur, sans JavaScript.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `type` | `bar` | `bar`, `line` |
| `values` | `[]` | Nombres |
| `labels` | `[]` | Libelles sous le graphique |
| `height` | `160` | Hauteur du viewBox |
| `label` | requis | Nom accessible du graphique |

## Accessibilite

Le `svg` porte `rôle="img"` et un `aria-label`. Les libellés sont `aria-hidden` car redondants avec le nom accessible. Pour des données a lire precisement, fournir aussi un tableau equivalent.
