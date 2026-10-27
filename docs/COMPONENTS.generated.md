# Catalogue genere

Fichier genere par `bin/docs` depuis les manifests et les templates du kit.
Ne pas editer a la main : la CI verifie qu'il correspond aux sources.

## Fondation

| Recette | Version | Props | Description |
|---|---|---|---|
| `theme` | 1.1.0 | aucune | Fondation du kit : tokens, reset et typographie. Tous les composants lisent les variables CSS `--ui-*` definies ici, sans valeur en dur |

## Mise en page

| Recette | Version | Props | Description |
|---|---|---|---|
| `container` | 2.0.0 | `size` | Largeur de lecture et padding lateral |
| `grid` | 2.0.0 | `columns`, `min`, `gap` | Grille de contenu, fixe ou auto-ajustee |
| `stack` | 2.0.0 | `direction`, `gap`, `align`, `justify` | Pile d'éléments avec un espacement constant |

## Signature

| Recette | Version | Props | Description |
|---|---|---|---|
| `rosette` | 2.0.0 | `seed`, `size`, `progress`, `loading`, `label` | Empreinte guillochée d'un objet : une même graine donne toujours le même dessin |

## Primitives

| Recette | Version | Props | Description |
|---|---|---|---|
| `alert` | 1.1.0 | `type`, `title`, `message` | Message d'etat, avec titre et texte optionnels |
| `aspect-ratio` | 1.7.0 | `ratio` | Conteneur qui conserve un rapport largeur/hauteur |
| `avatar` | 1.1.0 | `initials`, `src`, `label`, `size` | Image ou initiales pour représenter une personne ou une organisation |
| `badge` | 1.1.0 | `tone`, `variant` | Étiquette courte pour un état, un compteur ou une catégorie |
| `button` | 1.0.0 | `variant`, `intent`, `appearance`, `size`, `type`, `href`, `disabled`, `loading` | Composant bouton natif Symfony, installé par le Symfony UX Toolkit. Aucun libellé en dur : le texte est passé par le slot |
| `button-group` | 1.7.0 | `label` | Boutons contigus, avec des coins arrondis aux extremites seulement |
| `card` | 1.1.0 | `title`, `description`, `footer` | Surface de contenu avec en-tete et pied optionnels |
| `empty-state` | 1.3.0 | `title`, `message` | Etat vide, avec une action de sortie dans le slot |
| `icon` | 1.1.0 | `name`, `size` | Jeu d'icônes au trait, décoratif par défaut. Aucun libellé en dur |
| `kbd` | 1.1.0 | aucune | Touche ou raccourci clavier |
| `marker` | 1.7.0 | aucune | Passage surligne dans un texte |
| `progress` | 1.1.0 | `value`, `max`, `label`, `showValue` | Barre d'avancement bornee |
| `separator` | 1.1.0 | `orientation`, `label` | Trait de separation horizontal ou vertical, avec libellé optionnel |
| `skeleton` | 1.1.0 | `rows` | Forme du contenu attendu pendant un chargement. Purement decorative |
| `spinner` | 1.7.0 | `label`, `size` | Indicateur de chargement autonome |

## Formulaires

| Recette | Version | Props | Description |
|---|---|---|---|
| `calendar` | 1.9.0 | `label`, `month`, `days`, `previousLabel`, `nextLabel`, `previous`, `next`, `weekdays`, `'M'`, `'M'`, `'J'`, `'V'`, `'S'`, `'D']` | Grille de jours. Les jours sont calcules par le serveur et passes au composant |
| `checkbox` | 1.1.0 | `id`, `name`, `label`, `checked`, `disabled`, `describedBy` | Case a cocher native, habillee sans perdre la sémantique |
| `date-picker` | 1.5.0 | `id`, `name`, `label`, `value`, `min`, `max`, `help` | Sélection de date, avec le calendrier natif du navigateur |
| `field` | 1.1.0 | `id`, `label`, `help`, `error`, `required` | Enveloppe de champ : label, aide, erreur. Le contrôle natif passe dans le slot |
| `floating-label` | 2.0.0 | `id`, `name`, `label`, `type`, `value`, `required`, `describedBy`, `invalid`, `disabled` | Champ avec libellé flottant, sans JavaScript |
| `input` | 1.1.0 | `id`, `type`, `name`, `placeholder`, `value`, `describedBy`, `invalid`, `disabled`, `required` | Champ de saisie natif |
| `input-group` | 1.7.0 | `id`, `name`, `type`, `prefix`, `suffix`, `placeholder`, `value`, `describedBy`, `invalid`, `disabled`, `required` | Champ avec prefixe ou suffixe, sans perdre l'input natif |
| `input-otp` | 1.9.0 | `id`, `name`, `length`, `label` | Code a usage unique, une case par caractere |
| `radio-group` | 1.3.0 | `id`, `name`, `label`, `options`, `value`, `disabled` | Choix unique parmi plusieurs options |
| `select` | 1.1.0 | `id`, `name`, `options`, `value`, `placeholder`, `describedBy`, `invalid`, `disabled`, `required` | Liste deroulante native |
| `slider` | 1.3.0 | `id`, `name`, `min`, `max`, `step`, `value`, `label` | Valeur sur un intervalle, avec `input type="range"` natif |
| `switch` | 1.1.0 | `id`, `name`, `label`, `checked`, `disabled`, `describedBy` | Interrupteur binaire, pour un reglage qui s'applique immediatement |
| `textarea` | 1.1.0 | `id`, `name`, `rows`, `placeholder`, `value`, `describedBy`, `invalid`, `disabled`, `required` | Zone de saisie multiligne. Meme contrat que `Ui:Input` |

## Navigation et surfaces

| Recette | Version | Props | Description |
|---|---|---|---|
| `accordion` | 1.2.0 | `summary`, `open` | Section repliable. Repose sur `details` et `summary` natifs : ouverture, clavier et annonce fonctionnent sans JavaScript |
| `breadcrumb` | 1.2.0 | `items`, `label` | Fil d'Ariane |
| `collapsible` | 1.7.0 | `summary`, `open` | Section repliable neutre, sans bordure ni titre de section |
| `context-menu` | 1.8.0 | `items`, `label` | Menu au clic droit |
| `dialog` | 1.2.0 | `id`, `title`, `trigger`, `description`, `closeLabel` | Boite modale native (`<dialog>`) |
| `direction` | 1.8.0 | `dir` | Conteneur avec sens d'ecriture explicite |
| `dropdown-menu` | 1.3.0 | `label`, `items` | Menu d'actions ou de liens. Repose sur `details` et `summary` : ouverture, clavier et fermeture fonctionnent sans JavaScript |
| `hover-card` | 1.8.0 | `label`, `id` | Carte d'aperçu au survol et au focus |
| `menubar` | 1.8.0 | `items`, `label` | Barre de menus horizontale, avec sous-menus natifs |
| `navbar` | 1.8.0 | `brand`, `brandHref`, `label`, `toggleLabel` | Barre de navigation avec marque, liens et bascule mobile |
| `navigation-menu` | 1.8.0 | `items`, `label` | Navigation avec sous-menus, a base de `details` et `summary` |
| `pagination` | 1.2.0 | `items`, `previous`, `next`, `label` | Navigation entre pages |
| `popover` | 1.3.0 | `label` | Panneau flottant ancre. Repose sur `details` et `summary` : ouverture au clavier et fermeture natives, sans JavaScript |
| `resizable` | 1.8.0 | `label` | Panneau redimensionnable avec une poignee |
| `scroll-area` | 1.8.0 | `maxHeight`, `label` | Zone defilante bornee, pour les listes longues dans une carte |
| `scrollspy` | 2.0.0 | `items`, `label` | Sommaire qui suit la section visible |
| `sheet` | 1.2.0 | `id`, `title`, `trigger`, `description`, `side`, `closeLabel` | Panneau lateral modal, ancre a droite ou a gauche |
| `tabs` | 1.2.0 | `items`, `label` | Onglets de navigation. Chaque onglet est un lien : l'etat vient de l'URL, sans JavaScript, et le retour arriere du navigateur fonctionne |
| `toggle` | 1.2.0 | `pressed`, `label` | Bouton a deux états, rendu avec `aria-pressed` |
| `toggle-group` | 1.7.0 | `label` | Groupe de bascules dans un rail commun. Chaque bascule conserve son `aria-pressed` |
| `tooltip` | 1.2.0 | `text`, `id` | Aide courte, au survol et au focus clavier |

## Donnees

| Recette | Version | Props | Description |
|---|---|---|---|
| `code-block` | 1.7.0 | `code`, `label`, `language` | Bloc de code avec en-tete optionnel |
| `description-list` | 1.3.0 | `items` | Paires libellé et valeur |
| `list-group` | 1.7.0 | `items` | Liste d'éléments avec valeur secondaire optionnelle |
| `stat` | 1.3.0 | `label`, `value`, `hint`, `trend` | Indicateur chiffre |
| `table` | 1.3.0 | `caption` | Cadre de tableau. L'application fournit `thead`, `tbody` et `tr` |
| `timeline` | 1.3.0 | `items` | Suite d'evenements dates, dans une liste ordonnee |
| `toast` | 1.3.0 | `id`, `title`, `message`, `type`, `autohide`, `closeLabel` | Notification transitoire |

## Patterns d'ecran

| Recette | Version | Props | Description |
|---|---|---|---|
| `confirm-dialog` | 1.4.0 | `id`, `title`, `message`, `trigger`, `confirmLabel`, `cancelLabel` | Confirmation d'une action, dans un dialogue natif |
| `data-region` | 1.4.0 | `state`, `loadingMessage`, `errorMessage`, `emptyMessage` | Region de resultats avec états explicites : `idle`, `loading`, `error`, `empty` |
| `detail-layout` | 1.4.0 | `label` | Liste et detail cote a cote sur grand écran, empiles sur mobile |
| `filter-bar` | 1.4.0 | `action`, `method`, `submitLabel`, `label` | Barre de filtres sous forme de formulaire GET : elle fonctionne sans JavaScript et l'URL porte l'etat |
| `form-section` | 1.4.0 | `title`, `description` | Section de formulaire avec titre et description |
| `page-header` | 1.4.0 | `title`, `description`, `headingLevel` | En-tete de page avec titre, description et actions |
| `sidebar` | 1.4.0 | `label`, `items` | Navigation laterale, sans JavaScript |

## Composants avances

| Recette | Version | Props | Description |
|---|---|---|---|
| `carousel` | 1.5.0 | `label`, `previousLabel`, `nextLabel` | Galerie defilante, avec `scroll-snap` natif |
| `chart` | 1.5.0 | `type`, `values`, `labels`, `height`, `label` | Graphique SVG simple, rendu par le serveur, sans JavaScript |
| `combobox` | 1.5.0 | `id`, `name`, `label`, `options`, `placeholder` | Champ avec recherche dans une liste |
| `command` | 1.5.0 | `trigger`, `label`, `placeholder`, `items` | Palette de commandes dans un dialogue natif |
| `file-upload` | 1.5.0 | `id`, `name`, `label`, `hint`, `accept`, `multiple` | Depot de fichier, avec l'input natif comme source |
