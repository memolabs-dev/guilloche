# Theme — kit Guilloche

Fondation du kit : tokens, reset et typographie. Tous les composants lisent les variables CSS `--ui-*` definies ici, sans valeur en dur.

## Installation

La recette ne copie aucun fichier dans l'application : les styles restent dans le kit. Deux usages possibles.

1. Projet avec Sass : importer les partials du kit dans son propre point d'entree.

```scss
@use 'vendor/guilloche/kits/guilloche/theme/assets/styles/ui/tokens';
@use 'vendor/guilloche/kits/guilloche/theme/assets/styles/ui/reset';
@use 'vendor/guilloche/kits/guilloche/theme/assets/styles/ui/typography';
```

2. Projet sans Sass : importer `dist/guilloche.css`, precompile.

## Enveloppe

Les composants supposent une enveloppe `.ui-scope` sur le conteneur racine de l'application :

```twig
<div class="ui-scope">
  {{ block('body') }}
</div>
```

Cette enveloppe porte le fond, la couleur de texte, la police, le reset minimal et le focus visible. Elle evite de modifiér le `body` de l'application.

## Themes

Le theme clair est le défaut. Le sombre s'applique de deux facons :

- `data-ui-theme="dark"` sur `<html>` ou sur l'enveloppe, pour un choix explicite de l'utilisateur ;
- `prefers-color-scheme: dark`, quand l'application ne force pas de theme.

`data-ui-theme="light"` sur `<html>` désactivé la detection système.

## Tokens

| Famille | Variables |
|---|---|
| Surfaces | `--ui-background`, `--ui-card`, `--ui-muted`, `--ui-input` |
| Textes | `--ui-foreground`, `--ui-muted-foreground`, `--ui-card-foreground` |
| Actions | `--ui-primary`, `--ui-secondary`, `--ui-danger` (et leurs `-foreground`) |
| Etats | `--ui-success`, `--ui-warning`, `--ui-info` (et leurs `-foreground`) |
| Bordures | `--ui-border`, `--ui-ring` |
| Rayons | `--ui-radius-sm`, `--ui-radius-md`, `--ui-radius-lg`, `--ui-radius-pill` |
| Espacements | `--ui-space-1` a `--ui-space-6` |
| Textes | `--ui-text-xs` a `--ui-text-xl` |
| Mouvement | `--ui-duration-fast`, `--ui-duration`, `--ui-ease` |
| Décision humaine | `--ui-attention`, `--ui-attention-soft`, `--ui-attention-line` |

Les tokens cuivrés `attention` signalent **uniquement** une décision attendue de la personne (ex. un sceau `Seal` en état `pending`). Ils ne servent jamais aux boutons, liens, champs, graphiques ni alertes génériques. Les quatre thèmes sont vérifiés par `bin/contrast` pour un ratio minimal de 4,5:1 sur les surfaces pertinentes.

## Accessibilite

- Le focus visible est defini une seule fois dans l'enveloppe, jamais désactivé par un composant.
- `prefers-reduced-motion` coupe les animations et transitions.
- Les couleurs ne sont jamais le seul porteur d'information : chaque composant associe un texte ou une icone.
