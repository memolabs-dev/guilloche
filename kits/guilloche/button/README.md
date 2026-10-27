# Button — kit Guilloche

Composant bouton natif Symfony, installé par le Symfony UX Toolkit. Aucun libellé en dur : le texte est passé par le slot.

## Installation

```shell
php bin/console ux:install button --kit guilloche
```

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `variant` | `primary` | `primary`, `secondary`, `outline`, `ghost`, `link`, `danger` |
| `size` | `md` | `sm` (32 px), `md` (36 px), `lg` (40 px) |
| `href` | `null` | Quand présent, rend un lien ; sinon un bouton |
| `type` | `button` | Type du bouton quand il n'y a pas de `href` |
| `disabled` | `false` | Désactive le bouton, jamais appliqué à un lien |
| `loading` | `false` | Affiche un chargeur et occupe le bouton |

Les props historiques `intent` et `appearance` restent acceptées et sont traduites vers un variant, pour ne pas casser une application déjà installée.

## Exemple

```twig
<twig:ui:Button>Enregistrer</twig:ui:Button>
<twig:ui:Button variant="outline">Annuler</twig:ui:Button>
<twig:ui:Button variant="danger">Supprimer</twig:ui:Button>
<twig:ui:Button variant="link" href="{{ path('app_billing') }}">Ouvrir</twig:ui:Button>
```

## Styles

- Hauteurs fixes 32, 36 et 40 px, padding horizontal 10, 12 et 16 px, rayon 6 px.
- Survol et pressé pilotés par les tokens (`primary-hover`, `accent`), jamais par un filtre.
- Focus : anneau de 2 px décalé de 2 px, sur `:focus-visible` seulement.
- Désactivé : opacité 0,5 et `pointer-events: none`.

## Accessibilité

- Le composant forwarde tous les attributs HTML : `aria-label`, `aria-labelledby`, etc.
- Un lien n'accepte jamais d'état `disabled`.
- L'état de chargement est communiqué par `aria-busy="true"` et un spinner masqué aux technologies d'assistance.

## Dépendance vers une recette d'un autre kit

**Non supporté.** Le résolveur de recettes du Toolkit (`PoolResolver`) résout `dependencies.recipe` uniquement dans le kit courant. Une recette ne peut pas déclarer de dépendance sur une recette d'un autre kit : cela lève une `LogicException` à l'installation.

Conséquence : `tooltip`, `clipboard` et `closeable` ne sont ni dupliqués ni référencés. Une application qui en a besoin installe le kit `common` séparément.

## Propriété

Licence MIT. Titulaire : Guillaume Flambard. Dépôt canonique : `memolabs-dev/guilloche`. La démo de référence reste `memolabs-dev/guilloche-workspace`.
