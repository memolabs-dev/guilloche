# Command — kit Guilloche

Palette de commandes dans un dialogue natif.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `trigger` | requis | Libelle du bouton d'ouverture |
| `label` | requis | Nom accessible du dialogue et du champ |
| `placeholder` | `null` | Texte d'aide du champ |
| `items` | `[]` | Entrees `{ label, href }` |

## Contrôleur

`assets/controllers/command_controller.js`, identifiant `ui--command`. Filtre, fleches, Entree, puis navigation vers le `href` de l'entree.

## Accessibilite

Le dialogue natif capture le focus et rend le focus a l'ouverture. La liste porte `rôle="listbox"` et chaque entree `rôle="option"`.
