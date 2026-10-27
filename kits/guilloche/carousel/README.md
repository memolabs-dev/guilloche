# Carousel — kit Guilloche

Galerie defilante, avec `scroll-snap` natif.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | requis | Nom accessible du carrousel |
| `previousLabel` | requis | Nom accessible du bouton precedent |
| `nextLabel` | requis | Nom accessible du bouton suivant |

Le contenu vient du slot ; chaque enfant direct occupe une page.

## Controleur

`assets/controllers/carousel_controller.js`, identifiant `ui--carousel`. Les boutons font defiler d'une page. Le viewport est focusable et defilable au clavier sans JavaScript.
