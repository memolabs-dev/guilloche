# Catalogue du kit Guilloche

Etat des recettes livrees et des vagues suivantes. Une recette est autonome : elle ne depend d'aucune autre recette du kit (le Toolkit ne resout pas les dependances inter-recettes).

## Principes

- Les textes sont des props ou le slot. Aucun libelle en dur dans le kit.
- Les styles lisent uniquement les variables CSS `--ui-*` definies par la recette `theme`.
- Chaque composant forwarde ses attributs HTML : `aria-*`, `data-*` et classes supplementaires restent applicables.
- Une recette ne depend jamais d'une autre recette du kit : une icone necessaire est un SVG inline.
- Les composants supposent l'enveloppe `.ui-scope` (fond, texte, reset, focus).

## Livre en 1.3.0

### Fondation et primitives

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
| `empty-state` | Etat vide avec action | `title`, `message` |

### Formulaires

| Recette | Role | Props principales |
|---|---|---|
| `field` | Enveloppe label, aide, erreur | `id`, `label`, `help`, `error`, `required` |
| `input` | Champ natif | `id`, `type`, `name`, `value`, `invalid`, `describedBy` |
| `textarea` | Zone multiligne | `id`, `name`, `rows`, `value`, `invalid` |
| `select` | Liste native | `id`, `options`, `value`, `placeholder`, `invalid` |
| `checkbox` | Case native habillee | `id`, `label`, `checked`, `disabled` |
| `switch` | Interrupteur binaire | `id`, `label`, `checked`, `disabled` |
| `radio-group` | Choix unique | `id`, `name`, `label`, `options`, `value` |
| `slider` | Valeur sur un intervalle | `id`, `min`, `max`, `step`, `value`, `label` |

### Navigation et surfaces

| Recette | Role | Props principales |
|---|---|---|
| `breadcrumb` | Fil d'Ariane | `items`, `label` |
| `pagination` | Navigation entre pages | `items`, `previous`, `next`, `label` |
| `tabs` | Onglets de navigation par URL | `items`, `label` |
| `toggle` | Bouton a deux etats (`aria-pressed`) | `pressed`, `label` |
| `accordion` | Section repliable native (`details`) | `summary`, `open` |
| `dropdown-menu` | Menu natif (`details`) | `label`, `items` |
| `dialog` | Boite modale native | `id`, `title`, `trigger`, `description` |
| `sheet` | Panneau lateral modal | `id`, `title`, `trigger`, `description`, `side` |
| `popover` | Panneau flottant natif | `label` |
| `tooltip` | Aide courte survol et focus | `text`, `id` |

### Donnees

| Recette | Role | Props principales |
|---|---|---|
| `table` | Tableau avec en-tetes et etats | `caption` |
| `description-list` | Paires libelle et valeur | `items` |
| `stat` | Indicateur chiffre | `label`, `value`, `hint`, `trend` |
| `timeline` | Suite d'evenements dates | `items` |
| `toast` | Notification transitoire | `id`, `title`, `message`, `type`, `autohide` |

Les recettes `toggle`, `dialog`, `sheet` et `toast` livrent un controleur Stimulus (`ui--toggle`, `ui--dialog`, `ui--sheet`, `ui--toast`) copie dans `%CONTROLLERS_DIR%`. Sans JavaScript, l'etat rendu par le serveur reste correct ; seules l'ouverture des dialogues, la bascule du toggle et la fermeture du toast en dependent.

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
| `date-picker` | Selection de date |
| `file-upload` | Depot de fichier |
| `combobox` | Champ avec recherche dans une liste |
| `command` | Palette de commandes |
| `carousel` | Galerie defilante |
| `chart` | Graphique simple en SVG |

## Vague 5 : distribution et qualite

- Documentation par composant generee depuis les props, plus un catalogue rendu.
- Tests de contrat automatises pour chaque recette (`bin/sync-harness` puis PHPUnit).
- Tests d'accessibilite automatises (roles, noms accessibles, focus).
- Versionnement semver et notes de version par recette.
- Publication du kit comme paquet Composer et copie vers le depot du Toolkit.

## Ajouter un composant

1. Creer `kits/guilloche/<nom>/` avec `manifest.json`, `README.md`, `templates/components/<Nom>.html.twig`, `assets/styles/ui/<nom>.scss` et, si besoin, `assets/controllers/`.
2. Ne dependre d'aucune autre recette ; les icones sont des SVG inline.
3. Ajouter le composant a `kits/guilloche/styles.scss` et a l'ordre de `bin/sync-harness`.
4. Rendre le composant dans `harness/templates/page/index.html.twig` et l'assertion correspondante dans `harness/tests/PageTest.php`.
5. Lancer `./bin/lint-recipes`, `./bin/sync-harness`, `./bin/build-css` et `vendor/bin/phpunit -c phpunit.dist.xml` dans `harness/`.
