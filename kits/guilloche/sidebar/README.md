# Sidebar — kit Guilloche

Navigation laterale, sans JavaScript.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | `Navigation` | Nom accessible de la region |
| `items` | `[]` | Liens `{ label, href, current }` |

## Accessibilite

Le lien courant porte `aria-current="page"`. La navigation est une liste de liens : elle reste utilisable sans JavaScript et au clavier.
