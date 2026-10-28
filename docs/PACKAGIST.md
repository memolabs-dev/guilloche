# Publication de Guilloche sur Packagist

Le paquet Composer est `memolabs-dev/guilloche` et les versions viennent des **tags GitHub**, pas d'un champ `version` dans `composer.json`.

## État de publication

- Une release GitHub et son tag ne suffisent **pas** à créer un paquet Packagist.
- La page Packagist doit d'abord être enregistrée par le compte propriétaire du dépôt (ou un compte habilité).
- Tant que ce n'est pas fait, utiliser le dépôt VCS Composer, ce qui est déjà prouvé dans le consommateur Guilloche Workspace.

## Vérifications obligatoires avant chaque version

1. `main` propre, CI de contrat et Chromium verte.
2. `composer validate --strict --no-check-publish`.
3. `bash bin/test-installer` : simulation, deux recettes réelles, styles et polices, refus d'écraser un fichier existant.
4. `kits/guilloche/manifest.json` aligné sur le tag `vX.Y.Z`.
5. Changelog et documentation d'installation cohérents.
6. Tag annoté et GitHub Release pointant sur un commit validé. Jamais sur une PR non testée.

## Enregistrement Packagist (action propriétaire)

1. Ouvrir <https://packagist.org/packages/submit> et s'authentifier avec le compte propriétaire.
2. Soumettre le dépôt `https://github.com/memolabs-dev/guilloche`.
3. Autoriser/configurer la mise à jour du dépôt si Packagist le propose.
4. Vérifier que le tag stable de la release apparaît effectivement dans <https://packagist.org/packages/memolabs-dev/guilloche>.
5. Vérifier l'installation depuis un projet Symfony vierge :
   `composer require 'memolabs-dev/guilloche:^2.0'` et ensuite `php vendor/memolabs-dev/guilloche/bin/guilloche-install button --project=.`.

La commande `php bin/console ux:install button --kit=guilloche` **ne fonctionne pas automatiquement** : Symfony UX Toolkit référence ses kits intégrés, et Composer ne les étend pas. Guilloche fournit `bin/guilloche-install` pour copier les recettes externes.

## Installation par dépôt VCS avant Packagist

Dans le `composer.json` de l'application consommatrice :

```json
{
    "repositories": [
        { "type": "vcs", "url": "https://github.com/memolabs-dev/guilloche" }
    ]
}
```

Ensuite `composer require 'memolabs-dev/guilloche:^2.0'` si `v2.0.0` existe, puis utiliser le même installateur. Le consommateur peut aussi figer un commit avec un alias `dev-main#<sha>` en attendant la version stable.

### Ne pas promettre une publication non vérifiée

La preuve de publication est la disponibilité de la page du paquet et sa résolution par Composer, **pas** seulement la présence du tag GitHub. Ne jamais partager une commande de Packagist comme « opérationnelle » avant l'avoir validée sur une installation vierge.
