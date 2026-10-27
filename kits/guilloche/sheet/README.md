# Sheet — kit Guilloche

Panneau lateral modal, ancre a droite ou a gauche.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant du dialogue |
| `title` | requis | Titre |
| `trigger` | `null` | Libelle du bouton d'ouverture |
| `description` | `null` | Texte secondaire |
| `side` | `right` | `right`, `left` |

## Controleur

`assets/controllers/sheet_controller.js`, identifiant `ui--sheet`. Meme comportement que `Ui:Dialog`, avec un panneau ancre.
