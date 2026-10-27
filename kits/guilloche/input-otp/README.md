# InputOtp — kit Guilloche

Code a usage unique, une case par caractere.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Prefixe des identifiants |
| `name` | `null` | Nom du champ (tableau de cases) |
| `length` | `6` | Nombre de cases |
| `label` | requis | Nom accessible du groupe et des cases |

## Contrôleur

`assets/controllers/input_otp_controller.js`, identifiant `ui--input-otp`. Avance apres un caractere, revient avec Retour arriere sur une case vide, repartit un code colle.

## Accessibilite

Chaque case est un input natif nomme (`aria-label` avec son rang). Le groupe porte `rôle="group"` et le nom du champ.
