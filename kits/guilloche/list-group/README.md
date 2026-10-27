# ListGroup — kit Guilloche

Liste d'elements avec valeur secondaire optionnelle.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Elements `{ label, href, meta }` |

## Exemple

```twig
<twig:ui:ListGroup :items="[
  { label: 'Synthese', href: '#', meta: '26 oct.' },
  { label: 'Lettre de mission', meta: '24 oct.' }
]" />
```
