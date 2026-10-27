# Switch — kit Guilloche

Interrupteur binaire, pour un reglage qui s'applique immediatement.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant de l'input |
| `name` | `null` | Nom du champ (defaut : `id`) |
| `label` | requis | Libelle cliquable |
| `checked` | `false` | Etat initial |
| `disabled` | `false` | Desactive l'interrupteur |
| `describedBy` | `null` | `aria-describedby` |

## Accessibilite

L'input natif porte `role="switch"` : l'etat est annonce « active » ou « desactive », sans dependre de la position visuelle.
