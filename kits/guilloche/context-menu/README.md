# ContextMenu — kit Guilloche

Menu au clic droit.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Entrees `{ label, href }` |
| `label` | `Menu contextuel` | Nom accessible du menu |

La zone de declenchement vient du slot.

## Controleur

`assets/controllers/context-menu_controller.js`, identifiant `ui--context-menu`. Positionne le menu au clic droit, ferme au clic ailleurs et avec Echap.

## Accessibilite

Le menu ne remplace pas une action accessible ailleurs : proposer aussi un bouton ou un lien pour la meme action.
