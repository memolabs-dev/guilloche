# Publication sur Packagist

Le paquet `memolabs-dev/guilloche` est declare dans `composer.json`. La publication demande le compte Packagist du proprietaire : elle ne peut pas etre faite par un agent.

## Metadonnees

| Champ | Valeur |
|---|---|
| Nom | `memolabs-dev/guilloche` |
| Type | `library` |
| Licence | MIT |
| Depot | `https://github.com/memolabs-dev/guilloche` |
| Branche par defaut | `main` |

## Procedure

1. Se connecter sur `packagist.org` avec le compte GitHub proprietaire du depot.
2. `Submit` puis saisir l'URL du depot : `https://github.com/memolabs-dev/guilloche`.
3. Packagist lit `composer.json` et cree le paquet. Il propose ensuite d'installer le webhook GitHub.
4. Accepter le webhook : chaque poussée sur `main` met alors a jour la version du paquet.
5. Verifier la page du paquet : description, licence, versions et nombre de telechargements.

## Verification apres publication

```shell
composer show memolabs-dev/guilloche
```

Puis, dans un projet consommateur :

```shell
composer require memolabs-dev/guilloche
php bin/console ux:install button --kit guilloche
```

## Sans publication

Un projet peut consommer le depot sans Packagist en declarant la source VCS :

```json
{
    "repositories": [
        { "type": "vcs", "url": "https://github.com/memolabs-dev/guilloche" }
    ]
}
```

Composer lit alors les tags du depot. Sans tag, il installe `dev-main`.

## Tags

La version du kit est declaree dans `kits/guilloche/manifest.json` et dans `composer.json`. Pour publier une version stable, creer un tag Git correspondant a la politique de `docs/VERSIONING.md` :

```shell
git tag -a v1.6.0 -m "v1.6.0"
git push origin v1.6.0
```

Packagist detecte le tag et publie la version.
