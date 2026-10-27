# Resizable — kit Guilloche

Panneau redimensionnable avec une poignee.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | `Resize` | Nom accessible de la poignee |

## Contrôleur

`assets/controllers/resizable_controller.js`, identifiant `ui--resizable`. Glissement au pointeur, ajustement de 16 px par fleche gauche et droite.

## Accessibilite

La poignee est un `rôle="separator"` focusable avec `aria-orientation`. La largeur minimale est bornee a 160 px.
