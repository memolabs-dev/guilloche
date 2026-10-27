# Button — kit Guilloche

Composant bouton natif Symfony, installé par le Symfony UX Toolkit. Aucun libellé en dur : le texte est passé par le slot. Le kit ne contient aucun texte en français ni aucune référence à une entreprise ou un prototype.

## Installation

```shell
php bin/console ux:install button --kit guilloche
```

La recette copie dans l'application :
- `templates/components/Button.html.twig` (composant anonyme Twig, préfixé `ui:`)
- `assets/controllers/button_controller.js` (contrôleur Stimulus, identifiant `ui--button`)

Les dépendances PHP suggérées (`symfony/ux-twig-component`) doivent être requises avec Composer.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `intent` | `primary` | `primary`, `secondary`, `outline`, `ghost`, `danger` |
| `appearance` | `solid` | `solid`, `soft`, `outline`, `ghost` |
| `size` | `md` | `sm`, `md`, `lg` |
| `href` | `null` | Quand présent, rend un lien `<a>` ; sinon un bouton `<button>` |
| `type` | `button` | Type du bouton quand pas de `href` |
| `disabled` | `false` | Désactive le bouton (jamais appliqué à un lien) |
| `loading` | `false` | Affiche un chargeur et occupe le bouton |

## Exemple

```twig
<twig:ui:Button intent="primary" size="lg">
  Valider la mission
</twig:ui:Button>

<twig:ui:Button href="{{ path('app_billing') }}" appearance="ghost">
  Ouvrir la facturation
</twig:ui:Button>
```

## Styles

Le fichier source `assets/styles/ui/button.scss` reste dans le kit. L'application l'importe dans son pipeline CSS (AssetMapper/SassBundle ou équivalent), ou importe le `dist/guilloche.css` précompilé quand elle ne dispose pas de SassBundle.

## Accessibilité

- Le composant forward tous les attributs HTML (`attributes.defaults`) : `aria-label`, `aria-labelledby`, etc. restent applicables.
- Un lien (`href`) n'accepte jamais d'état `disabled`.
- L'état de chargement est communiqué via `aria-busy="true"` et un spinner masqué aux technologies d'assistance (`aria-hidden`).

## Dépendance vers une recette d'un autre kit

**Non supporté.** Le résolveur de recettes du Toolkit (`PoolResolver`) résout `dependencies.recipe` uniquement dans le kit courant (`Kit::getRecipe()`). Une recette du kit `guilloche` ne peut pas déclarer de dépendance sur une recette d'un autre kit (par exemple `common/tooltip`, `common/clipboard`, `common/closeable`) : cela lève une `LogicException` au moment de l'installation.

Conséquence pour ce kit : `tooltip`, `clipboard` et `closeable` ne sont ni dupliqués ni référencés. Une application qui en a besoin installe le kit `common` séparément (`ux:install tooltip --kit common`), et chaque kit demeure souverain de ses fichiers, selon le modèle copy-paste du Toolkit.

## Propriété

Le kit est distribué sous licence MIT. Titulaire : Guillaume Flambard. Dépôt canonique : `memolabs-dev/guilloche`. La démo de référence reste `memolabs-dev/guilloche-workspace`.
