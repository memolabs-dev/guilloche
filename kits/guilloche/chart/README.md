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

## Exemple Twig

Exemple de démonstration utilisé par le harnais Symfony : adapter les identifiants, les valeurs et les liens fictifs au projet consommateur.

```twig
<twig:ui:Chart label="Missions par mois" :values="[3, 5, 4, 7]" :labels="['Jan', 'Fev', 'Mar', 'Avr']" />
```
