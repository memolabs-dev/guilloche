# Guilloche — Design system natif Symfony

Kit d'interface distribué comme un kit du Symfony UX Toolkit, destiné aux applications métier.

## Positionnement

Le shadcn de Symfony existe déjà, officiellement : `symfony/ux-toolkit` livre les kits `shadcn`, `bootstrap`, `flowbite-4` et `common` dans le modèle copy-paste du Toolkit. Cloner le kit `shadcn` n'apporterait aucune raison d'être choisi.

Ce qui reste libre est la **couche application métier** : des patterns d'écran installables, une intégration réelle aux formulaires Symfony, une identité graphique affirmée, des composants souverains sans framework CSS.

Guilloche se positionne donc comme un **design system natif Symfony pour les applications métier**, distribué en kit Toolkit — pas un clone de shadcn.

## Ce que contient ce dépôt

- `kits/guilloche/` — miroir du format `symfony/ux-toolkit 3.x/kits` : un kit `guilloche` avec ses recettes (ici `button` en v1).
- `harness/` — app Symfony minimale (AssetMapper + SassBundle) qui installe et rend les recettes ; c'est là que vivent les tests de contrat.
- `bin/lint-recipes` — validation des schémas de recette, placeholders, chemins, fusion de classes, absence de référence `App\`.
- `bin/build-css` — émet `dist/guilloche.css` depuis les partials SCSS.
- `dist/guilloche.css` — CSS précompilé pour les apps sans SassBundle.

## Décisions retenues

- Distribution : kit Toolkit d'abord, contribution en amont à `symfony/ux-toolkit` assumée (PR, revue Symfony, doc sur ux.symfony.com).
- Dépôt : `memolabs-dev/guilloche` pour le kit et l'identité ; `guilloche-workspace` reste la démo publique et le consommateur de référence.
- Périmètre v1 : complet (primitives, comportements natifs, JS lourd, patterns, formulaires). Pas de jalon intermédiaire.
- Textes : aucun libellé en dur ; les textes sont des props. La démo fournit le français.
- Nomenclature : variables CSS `--ui-*`, classes `ui-*`.
- Licence : MIT.
- Base CSS : tokens maison, aucun Bootstrap.
- Dépendances inter-kits de recettes : **non supportées** par le Toolkit (voir `kits/guilloche/button/README.md`).

## Installation de la recette bouton

```shell
php bin/console ux:install button --kit guilloche
```

## Provenance

Rien de la filiation « prototype Owner » ni d'entretien observé ne figure dans ce dépôt public. Les fixtures Atelier Rivage (démo) restent utilisées à des fins de démonstration.

## Licence

MIT — titulaire Guillaume Flambard.
