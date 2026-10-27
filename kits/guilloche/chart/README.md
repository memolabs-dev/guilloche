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

Le `svg` porte `role="img"` et un `aria-label`. Les libelles sont `aria-hidden` car redondants avec le nom accessible. Pour des donnees a lire precisement, fournir aussi un tableau equivalent.
