# FloatingLabel — kit Guilloche

Champ avec libellé flottant, sans JavaScript.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant, relie le label |
| `name` | `null` | Nom du champ (défaut : `id`) |
| `label` | requis | Libelle |
| `type` | `text` | Type HTML |
| `value` | `null` | Valeur initiale |
| `required` | `false` | Champ obligatoire |
| `describedBy` | `null` | `aria-describedby` |
| `invalid` | `false` | `aria-invalid` |
| `disabled` | `false` | Desactive le champ |

## Fonctionnement

Le champ porte `placeholder=" "` : c'est cet espace qui permet a `:placeholder-shown` de savoir si le champ est vide. Le libellé remonte au focus et des qu'une valeur existe, sinon il reste centre.

## Accessibilite

Le `label` reste relie par `for`. Le libellé flottant est un effet visuel, pas un substitut : le nom accessible vient toujours du `label`.
