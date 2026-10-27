# Menubar — kit Guilloche

Barre de menus horizontale, avec sous-menus natifs.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Entrees `{ label, href }` ou `{ label, items: [...] }` |
| `label` | requis | Nom accessible de la barre |

## Accessibilite

`role="menubar"`, `role="menu"` et `role="menuitem"`. Les sous-menus reposent sur `details`, donc le clavier et Echap fonctionnent sans JavaScript.
