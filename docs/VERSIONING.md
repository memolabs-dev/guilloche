# Versionnement

Le kit suit semver. La version courante est déclarée dans `kits/guilloche/manifest.json` et par le tag Git annoté `vX.Y.Z`. Composer déduit la version des tags ; **ne pas définir de champ `version` dans composer.json**.

| Changement | Version |
|---|---|
| Rupture d'une prop, d'une classe `ui-*`, d'un token `--ui-*`, ou d'un nom de recette | majeure |
| Nouvelle recette, nouvelle prop optionnelle, nouveau token | mineure |
| Correction de rendu, d'accessibilite ou de documentation sans changer le contrat | correctif |

Chaque recette declare sa version d'apparition dans `version-added`. Une recette ne change de contrat qu'avec une note dans `CHANGELOG.md`.

## Compatibilite

- PHP 8.4 et plus.
- `symfony/ux-twig-component` 3.6 et plus.
- `@hotwired/stimulus` pour les recettes qui livrent un controleur.

## Deprecation

Une prop retiree reste acceptee pendant une version mineure, avec un commentaire dans le template et une entree dans `CHANGELOG.md`. Elle est retiree a la majeure suivante.
