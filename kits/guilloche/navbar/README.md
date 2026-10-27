# Navbar — kit Guilloche

Barre de navigation avec marque, liens et bascule mobile.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `brand` | `null` | Nom de la marque |
| `brandHref` | `null` | Lien de la marque |
| `label` | `Navigation` | Nom accessible du `nav` |
| `toggleLabel` | requis | Nom accessible du bouton mobile |

Les liens viennent du slot.

## Contrôleur

`assets/controllers/navbar_controller.js`, identifiant `ui--navbar`. Il bascule la navigation et suit `aria-expanded`. En dessous de 40rem, la navigation est masquee par défaut.
