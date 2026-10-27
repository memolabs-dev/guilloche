# Contribuer à Guilloche

Ce kit est distribué comme un kit du Symfony UX Toolkit et destiné à être contribué en amont (`symfony/ux-toolkit`, branche `3.x`, dossier `kits/`).

## Prérequis

- PHP 8.4+
- Composer
- Node.js + `sass` (pour compiler les SCSS)

## Ajouter une recette

1. Créer `kits/guilloche/<nom>/` avec `manifest.json` (schéma `schema-kit-recipe-v1.json`), le(s) fichier(s) à copier et un `README.md`.
2. Les destinations `copy-files` ne peuvent utiliser que `%COMPONENTS_DIR%` et `%CONTROLLERS_DIR%`.
3. Aucune dépendance vers une recette d'un autre kit n'est supportée (`dependencies.recipe` se résout dans le kit courant).
4. Faire tourner `bin/lint-recipes` puis `bin/build-css`.

## Vérification

- `bin/lint-recipes`
- `bin/build-css`
- Dans `harness/` : `php bin/console lint:twig templates`, `php bin/phpunit`

## Provenance

Aucune référence à un prototype interne, à un « Owner » ou à un entretien n'est acceptée dans le dépôt public. Les textes fournis par le kit sont des props ; la langue de la démo est gérée par la démo.
