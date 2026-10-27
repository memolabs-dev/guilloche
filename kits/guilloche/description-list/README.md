# DescriptionList — kit Guilloche

Paires libelle et valeur.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Paires `{ term, description }` |

## Exemple

```twig
<twig:ui:DescriptionList :items="[
  { term: 'Numero', description: 'F-2026-010' },
  { term: 'Echeance', description: '30 novembre 2026' }
]" />
```
