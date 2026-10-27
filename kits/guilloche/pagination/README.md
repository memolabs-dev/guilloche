# Pagination — kit Guilloche

Navigation entre pages.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Pages `{ label, href, current }` |
| `previous` | `null` | Lien precedent `{ label, href, disabled }` |
| `next` | `null` | Lien suivant `{ label, href, disabled }` |
| `label` | `Pagination` | Nom accessible du `nav` |

## Exemple

```twig
<twig:ui:Pagination
  :items="[{ label: '1', href: '?page=1' }, { label: '2', href: '?page=2', current: true }]"
  :previous="{ label: 'Precedent', href: '?page=1' }"
  :next="{ label: 'Suivant', href: '?page=3' }" />
```
