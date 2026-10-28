# Menubar — kit Guilloche

Barre de menus horizontale, avec sous-menus natifs.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Entrees `{ label, href }` ou `{ label, items: [...] }` |
| `label` | requis | Nom accessible de la barre |

## Accessibilite

Ce composant est une **navigation structurée** (liens et `details/summary` natifs), pas un widget ARIA de type `menubar`. Le clavier suit l'ordre Tab/Maj+Tab et Entrée ; les flèches de `menubar` ne sont pas simulées. Utiliser un vrai composant menubar uniquement en implémentant intégralement le modèle clavier WAI-ARIA.
