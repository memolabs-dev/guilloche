# Icon — kit Guilloche

Jeu d'icônes au trait, décoratif par défaut. Aucun libellé en dur.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `name` | `info` | Clé du jeu : `grid`, `file`, `folder`, `search`, `close`, `menu`, `check`, `circlecheck`, `alert`, `info`, `help`, `arrow`, `back`, `chevron`, `down`, `plus`, `minus`, `user`, `clock`, `calendar`, `lock`, `trash`, `download`, `upload`, `external` |
| `size` | `20` | Largeur et hauteur en pixels |

## Accessibilité

- Décorative par défaut : `aria-hidden="true"` et `focusable="false"`.
- Pour une icône porteuse de sens, passer `aria-hidden="false"` et un `aria-label` explicite.
- Ne jamais faire d'une icône le seul moyen de comprendre une action.

## Exemple

```twig
<twig:ui:Icon name="search" />
<twig:ui:Icon name="alert" :size="16" aria-hidden="false" aria-label="Avertissement" />
```
