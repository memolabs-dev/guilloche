# Tabs — kit Guilloche

Onglets de navigation. Chaque onglet est un lien : l'etat vient de l'URL, sans JavaScript, et le retour arriere du navigateur fonctionne.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Onglets `{ label, href, current }` |
| `label` | `Tabs` | Nom accessible du `nav` |

## Exemple

```twig
<twig:ui:Tabs :items="[
  { label: 'En cours', href: '?status=open', current: true },
  { label: 'Terminees', href: '?status=done' }
]" />
```
