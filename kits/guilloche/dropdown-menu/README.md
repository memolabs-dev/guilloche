# DropdownMenu — kit Guilloche

Menu d'actions ou de liens. Repose sur `details` et `summary` : ouverture, clavier et fermeture fonctionnent sans JavaScript.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | requis | Libelle du declencheur |
| `items` | `[]` | Entrees `{ label, href }` |

## Exemple

```twig
<twig:ui:DropdownMenu label="Actions" :items="[
  { label: 'Ouvrir', href: path('app_show', { id: 1 }) },
  { label: 'Telecharger', href: '/export/1' }
]" />
```
