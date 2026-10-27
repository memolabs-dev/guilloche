# DatePicker — kit Guilloche

Sélection de date, avec le calendrier natif du navigateur.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant, relie le label |
| `name` | `null` | Nom du champ (défaut : `id`) |
| `label` | requis | Libelle |
| `value` | `null` | Date initiale (`Y-m-d`) |
| `min` | `null` | Date minimale |
| `max` | `null` | Date maximale |
| `help` | `null` | Aide, reliee par `aria-describedby` |

## Accessibilite

Le contrôle est natif : clavier, lecteur d'écran et format local fonctionnent. Aucun JavaScript n'est necessaire.
