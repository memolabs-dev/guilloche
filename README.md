# Guilloche — Design system natif Symfony

Kit d'interface distribué comme un kit du Symfony UX Toolkit, destiné aux applications métier.

## Positionnement

Le shadcn de Symfony existe déjà, officiellement : `symfony/ux-toolkit` livre les kits `shadcn`, `bootstrap`, `flowbite-4` et `common` dans le modèle copy-paste du Toolkit. Cloner le kit `shadcn` n'apporterait aucune raison d'être choisi.

Ce qui reste libre est la **couche application métier** : des patterns d'écran installables, une intégration réelle aux formulaires Symfony, une identité graphique affirmée, des composants souverains sans framework CSS.

Guilloche se positionne donc comme un **design system natif Symfony pour les applications métier**, distribué en kit Toolkit — pas un clone de shadcn.

## Ce que contient ce dépôt

- `kits/guilloche/` — 74 recettes au format des manifests Symfony UX Toolkit (fondation, primitives et composants métier).
- `harness/` — app Symfony minimale (AssetMapper + SassBundle) qui installe et rend les recettes ; c'est là que vivent les tests de contrat.
- `bin/guilloche-install` — installation vérifiable, non destructive, des recettes dans une application Symfony tierce.
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

## Catalogue

Le kit livre 74 recettes (dont la fondation `theme`) : primitives, formulaires, navigation et surfaces, donnees, patterns d'ecran, composants avances, groupes, listes, media, navigation avancee, calendrier et code a usage unique.

Le catalogue detaille, les principes et les vagues suivantes sont dans [`docs/COMPONENTS.md`](docs/COMPONENTS.md).

## Installation dans une application Symfony

**Prérequis :** PHP 8.4+, Symfony UX TwigComponent 3.6+, une application avec `composer.json`, `templates/`, `assets/` et `public/`. Installer StimulusBundle pour les recettes interactives.

### 1. Ajouter la dépendance Composer

Lorsque la publication Packagist sera active :

```shell
composer require memolabs-dev/guilloche:^2.0
```

En attendant, déclarer le dépôt VCS dans le `composer.json` de l'application :

```json
{
    "repositories": [
        { "type": "vcs", "url": "https://github.com/memolabs-dev/guilloche" }
    ]
}
```

Puis installer la version stable depuis cette source VCS :

```shell
composer require 'memolabs-dev/guilloche:^2.0'
```

La résolution fonctionne après création du tag `v2.0.0`. Avant cela, utiliser une référence explicite `dev-main` (moins stable) dans un environnement de test.

### 2. Installer les recettes du kit

```shell
php vendor/memolabs-dev/guilloche/bin/guilloche-install --list
php vendor/memolabs-dev/guilloche/bin/guilloche-install theme --project=.
php vendor/memolabs-dev/guilloche/bin/guilloche-install button --project=. --dry-run
php vendor/memolabs-dev/guilloche/bin/guilloche-install button --project=.
php vendor/memolabs-dev/guilloche/bin/guilloche-install rosette --project=.
```

L'installateur fonctionne **sans toucher aux fichiers existants personnalisés** : il refuse toute modification conflictuelle avant de créer quoi que ce soit. Relancer la même installation est sans effet ; `--dry-run` affiche le plan sans écrire. Il copie les templates dans `templates/components/ui/`, les contrôleurs éventuels dans `assets/controllers/ui/`, ainsi que le CSS précompilé et les polices auto-hébergées dans `public/guilloche/`.

Dans le layout Twig, ajouter les deux feuilles de style (une seule fois) :

```twig
<link rel="stylesheet" href="{{ asset('guilloche/fonts.css') }}">
<link rel="stylesheet" href="{{ asset('guilloche/guilloche.css') }}">
```

Pour les recettes interactives, configurer le chargement des contrôleurs Stimulus sous `assets/controllers/ui/` selon le bundler utilisé. Les composants copiés s'emploient sous la forme `<twig:ui:Button>Valider</twig:ui:Button>`.

Pour `Rosette` et `Seal`, enregistrer une fois le calculateur Symfony dans `config/services.yaml` :

```yaml
services:
    Guilloche\Signature\AutoGeometrySubscriber:
        tags: ['kernel.event_subscriber']
```

Le serveur injecte alors le SVG déterministe à partir de `seed` ou `by` directement dans le HTML, sans JavaScript.

**Important :** `php bin/console ux:install ... --kit=guilloche` n'est **pas** une commande d'installation supportée automatiquement par la version officielle de Symfony UX Toolkit. Celle-ci reconnaît ses kits intégrés ; un paquet Composer tiers n'ajoute pas son kit à cette liste. Guilloche fournit donc son propre installateur compatible avec les manifests du kit, en attendant une éventuelle intégration upstream. Voir la [documentation officielle](https://symfony.com/bundles/ux-toolkit).

Sans Composer, l'outil peut aussi être exécuté directement depuis un clone de Guilloche, avec `php bin/guilloche-install button --project=/chemin/vers/app`.

La procédure de publication est dans [`docs/PACKAGIST.md`](docs/PACKAGIST.md).

## Provenance

Rien de la filiation « prototype Owner » ni d'entretien observé ne figure dans ce dépôt public. Les fixtures Atelier Rivage (démo) restent utilisées à des fins de démonstration.

## Licence

MIT — titulaire Guillaume Flambard.

## Git hooks locaux

Après un clone, `composer install` installe automatiquement le hook `.githooks/pre-commit`
(via `core.hooksPath`), sans écraser un chemin de hooks personnalisé. Commande manuelle :
`composer hooks`. Le hook vérifie l'index Git, bloque les fichiers de secrets et, lorsque
PHP est présent, exécute la vérification syntaxique PHP et les validations des recettes.
La CI reste la référence pour la compilation CSS, les tests Symfony, Chromium et Docker.
