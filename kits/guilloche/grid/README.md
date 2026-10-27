# Grid — kit Guilloche

Grille de contenu, fixe ou auto-ajustee.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `columns` | `12` | Nombre de colonnes |
| `min` | `null` | Largeur minimale par colonne ; active `auto-fit` |
| `gap` | `4` | Numéro de token `--ui-space-*` (1 a 6) |

Sur petit écran, une grille fixe passe a 2 colonnes puis a 1.

## Exemple

```twig
<twig:ui:Grid :columns="3" :gap="4">
  <twig:ui:Card title="Un">...</twig:ui:Card>
  <twig:ui:Card title="Deux">...</twig:ui:Card>
</twig:ui:Grid>
```
