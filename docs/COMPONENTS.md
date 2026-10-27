# Catalogue du kit Guilloche

Etat des recettes livrees et des vagues suivantes. Une recette est autonome : elle ne depend d'aucune autre recette du kit (le Toolkit ne resout pas les dependances inter-recettes).

## Principes

- Les textes sont des props ou le slot. Aucun libelle en dur dans le kit.
- Les styles lisent uniquement les variables CSS `--ui-*` definies par la recette `theme`.
- Chaque composant forwarde ses attributs HTML : `aria-*`, `data-*` et classes supplementaires restent applicables.
- Une recette ne depend jamais d'une autre recette du kit : une icone necessaire est un SVG inline.
- Les composants supposent l'enveloppe `.ui-scope` (fond, texte, reset, focus).

## Livre en 1.1.0

| Recette | Role | Props principales |
|---|---|---|
| `theme` | Tokens, reset, typographie, themes clair et sombre | variables `--ui-*` |
| `button` | Action ou navigation | `intent`, `appearance`, `size`, `href`, `disabled`, `loading` |
| `icon` | Jeu d'icones au trait | `name`, `size` |
| `badge` | Etiquette courte | `tone`, `variant` |
| `card` | Surface de contenu | `title`, `description`, `footer` |
| `separator` | Trait horizontal ou vertical | `orientation`, `label` |
| `skeleton` | Forme du contenu attendu | `rows` |
| `kbd` | Touche ou raccourci | slot |
| `alert` | Message d'etat | `type`, `title`, `message` |
| `avatar` | Image ou initiales | `initials`, `src`, `label`, `size` |
| `progress` | Avancement borne | `value`, `max`, `label`, `showValue` |
| `field` | Enveloppe label, aide, erreur | `id`, `label`, `help`, `error`, `required` |
| `input` | Champ natif | `id`, `type`, `name`, `value`, `invalid`, `describedBy` |
| `textarea` | Zone multiligne | `id`, `name`, `rows`, `value`, `invalid` |
| `select` | Liste native | `id`, `options`, `value`, `placeholder`, `invalid` |
| `checkbox` | Case native habillee | `id`, `label`, `checked`, `disabled` |
| `switch` | Interrupteur binaire | `id`, `label`, `checked`, `disabled` |

## Vague 2 : navigation et surfaces

| Recette | Role |
|---|---|
| `tabs` | Onglets avec panneaux, navigation clavier |
| `breadcrumb` | Fil d'Ariane |
| `pagination` | Pagination de liste |
| `accordion` | Sections repliables |
| `dialog` | Boite modale native (`<dialog>`) |
| `sheet` | Panneau lateral |
| `dropdown-menu` | Menu d'actions |
| `popover` | Contenu flottant ancre |
| `tooltip` | Aide courte au survol et au focus |
| `toggle` / `toggle-group` | Bascule d'etat |

## Vague 3 : donnees

| Recette | Role |
|---|---|
| `table` | Tableau de donnees avec en-tetes et etats |
| `list` | Liste structuree |
| `description-list` | Paires libelle / valeur |
| `stat` | Indicateur chiffre |
| `timeline` | Suite d'evenements dates |
| `empty-state` | Etat vide avec action |
| `toast` | Notification transitoire |
| `radio-group` | Choix unique |
| `slider` | Valeur sur un intervalle |
| `date-picker` | Selection de date |
| `file-upload` | Depot de fichier |

## Vague 4 : patterns metier

| Recette | Role |
|---|---|
| `page-header` | En-tete de page avec actions |
| `filter-bar` | Filtres et recherche |
| `data-region` | Region de resultats avec chargement, erreur, vide |
| `form-section` | Section de formulaire |
| `confirm-dialog` | Confirmation d'une action destructive |
| `detail-layout` | Liste et detail cote a cote |
| `sidebar` | Navigation laterale |

## Vague 5 : distribution et qualite

- Documentation par composant generee depuis les props, plus un catalogue rendu.
- Tests de contrat automatises pour chaque recette (`bin/sync-harness` puis PHPUnit).
- Tests d'accessibilite automatises (roles, noms accessibles, focus).
- Versionnement semver et notes de version par recette.
- Publication du kit comme paquet Composer et copie vers le depot du Toolkit.

## Ajouter un composant

1. Creer `kits/guilloche/<nom>/` avec `manifest.json`, `README.md`, `templates/components/<Nom>.html.twig` et `assets/styles/ui/<nom>.scss`.
2. Ne dependre d'aucune autre recette ; les icones sont des SVG inline.
3. Ajouter le composant a `kits/guilloche/styles.scss` et a l'ordre de `bin/sync-harness`.
4. Rendre le composant dans `harness/templates/page/index.html.twig` et l'assertion correspondante dans `harness/tests/PageTest.php`.
5. Lancer `./bin/lint-recipes`, `./bin/sync-harness`, `./bin/build-css` et `vendor/bin/phpunit -c phpunit.dist.xml` dans `harness/`.
