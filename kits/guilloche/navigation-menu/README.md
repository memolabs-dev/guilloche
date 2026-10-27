# NavigationMenu — kit Guilloche

Navigation avec sous-menus, a base de `details` et `summary`.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Entrees `{ label, href, current }` ou `{ label, items: [...] }` |
| `label` | `Navigation` | Nom accessible du `nav` |

## Accessibilite

Aucun JavaScript : les sous-menus s'ouvrent au clavier et a la souris, et se ferment avec Echap ou un second clic.
