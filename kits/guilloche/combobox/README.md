# Combobox — kit Guilloche

Champ avec recherche dans une liste.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant du champ |
| `name` | `null` | Nom du champ cache (défaut : `id`) |
| `label` | requis | Libelle |
| `options` | `[]` | Options `{ value, label }` ou chaines |
| `placeholder` | `null` | Texte d'aide |

## Contrôleur

`assets/controllers/combobox_controller.js`, identifiant `ui--combobox`. Fleches pour parcourir, Entree pour choisir, Echap pour fermer. La valeur envoyee est celle du champ cache.

## Accessibilite

`rôle="combobox"`, `aria-expanded` et `rôle="listbox"` sur la liste. Sans JavaScript, seule la saisie libre reste possible : prevoir une valeur par défaut cote serveur.
