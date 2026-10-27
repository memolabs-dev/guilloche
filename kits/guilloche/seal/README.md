# Seal — kit Guilloche

Sépare ce qu'une IA a proposé de ce qu'une personne a validé.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `text` | requis | Mention fournie par l'application |
| `by` | requis | Qui signe ; la rosette en dérive |
| `at` | `null` | Date ISO, rendue en `<time datetime>` |
| `atLabel` | `null` | Texte lisible de la date |
| `label` | `null` | Nom accessible complet |
| `state` | `validated` | `validated` ou `pending` |
| `fresh` | `false` | L'animation se produit une fois par session pour ce signataire et cet événement (`at`) |
| `size` | `20` | Taille du sceau en pixels, typiquement 16 ou 20 |

## Choix technique

Le Toolkit ne permet pas de livrer une classe PHP (schéma `schema-kit-recipe-v1.json`, `copy-files` limité à `%COMPONENTS_DIR%` et `%CONTROLLERS_DIR%`). La rosette du sceau est donc calculée par `ui--seal`, avec un tracé de repli rendu par le serveur. L'algorithme est celui de `ui--rosette`, dupliqué pour que la recette reste autonome.

## Accessibilité

- Le sceau est `role="img"` avec un `aria-label` complet.
- L'état est porté par le texte, pas seulement par le filet pointillé.
- `prefers-reduced-motion` supprime le tracé d'apparition.

## Validation du rendu

Le sceau est un indicateur visuel de validation **fourni par l'application**, pas une preuve cryptographique ou une signature électronique. Le serveur reste responsable de l'identité et des droits du valideur.

L'animation n'est ajoutée par Stimulus qu'au premier affichage d'un événement `fresh` : aucune animation sans JavaScript, ni en mode `prefers-reduced-motion`. L'identifiant d'événement est dérivé de `by` et `at` ; fournir une date distincte pour chaque validation.
