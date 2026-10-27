# Stack — kit Guilloche

Pile d'éléments avec un espacement constant.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `direction` | `vertical` | `vertical`, `horizontal` |
| `gap` | `3` | Numéro de token `--ui-space-*` (1 a 6) |
| `align` | `null` | `start`, `center`, `end`, `stretch` |
| `justify` | `null` | `start`, `center`, `end`, `between` |

## Exemple

```twig
<twig:ui:Stack direction="horizontal" :gap="2" align="center">
  <twig:ui:Icon name="calendar" />
  <span>30 octobre 2026</span>
</twig:ui:Stack>
```
