# Checkbox — kit Guilloche

Case a cocher native, habillee sans perdre la sémantique.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant de l'input |
| `name` | `null` | Nom du champ (défaut : `id`) |
| `label` | requis | Libelle cliquable |
| `checked` | `false` | Etat initial |
| `disabled` | `false` | Desactive la case |
| `describedBy` | `null` | `aria-describedby` |

## Accessibilite

L'input natif reste focusable et annonce son etat. La case visuelle est `aria-hidden="true"`. Le focus est rendu sur la case par `:focus-visible + .ui-check__box`.
