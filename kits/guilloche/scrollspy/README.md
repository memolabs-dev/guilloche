# Scrollspy — kit Guilloche

Sommaire qui suit la section visible.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Sections `{ id, label }` |
| `label` | `Sections` | Nom accessible du `nav` |

## Controleur

`assets/controllers/scrollspy_controller.js`, identifiant `ui--scrollspy`. Il observe les sections par `id` avec `IntersectionObserver` et pose `aria-current="true"` sur le lien visible.

## Accessibilite

Le lien courant est signale par `aria-current`, pas seulement par la couleur. Sans JavaScript, les liens restent des ancres fonctionnelles.
