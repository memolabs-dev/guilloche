# DescriptionList — kit Guilloche

Paires libellé et valeur.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Paires `{ term, description }` |

## Exemple

```twig
<twig:ui:DescriptionList :items="[
  { term: 'Numéro', description: 'F-2026-010' },
  { term: 'Échéance', description: '30 novembre 2026' }
]" />
```
