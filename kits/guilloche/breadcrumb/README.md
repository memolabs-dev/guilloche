# Breadcrumb — kit Guilloche

Fil d'Ariane.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Liste de `{ label, href }` ; le dernier sans `href` devient la page courante |
| `label` | `Breadcrumb` | Nom accessible du `nav` |

## Exemple

```twig
<twig:ui:Breadcrumb :items="[
  { label: 'Accueil', href: path('app_home') },
  { label: 'Missions', href: path('app_missions') },
  { label: 'Mission 42' }
]" />
```
