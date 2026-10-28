# Changelog

## [2.0.0] - 2026-10-28

### Distribué
- 74 recettes Guilloche, fondation incluse ; composants Twig, contrôleurs Stimulus, styles SCSS et CSS compilé, polices auto-hébergées.
- Installer autonome `bin/guilloche-install` pour les kits externes : simulation, installation idempotente, détection préalable des conflits, refus des liens symboliques et copies de fichiers modifiés.
- Intégration Symfony serveur : `RosetteGeometry` et `AutoGeometrySubscriber` (SVG deterministe de Rosette et Seal dès le HTML).
- Composants métiers de signature (`Rosette`, `Seal`), numéros de série, filigranes sombres et tokens cuivre réservés aux décisions humaines.
- Harnais Symfony avec synchronisation vérifiée, tests fonctionnels, contraste, parité PHP/JavaScript et navigateur Chromium (28 captures, clair/sombre, mobile/desktop, sans JS).

### À noter
- Une dépendance Composer externe ne rend pas automatiquement le nom de kit disponible pour `ux:install --kit`. Utiliser `php vendor/memolabs-dev/guilloche/bin/guilloche-install` et suivre le README.
- Packagist n'est pas déclaré automatiquement lors d'une release GitHub. Il faut soumettre le dépôt depuis le compte propriétaire.


## [1.10.0] - 2026-10-27

### Ajoute
- Documentation du kit dans le harnais : catalogue par famille et fiche par composant.
- Fiche : apercu rendu, code extrait du README, tableau des props avec defaut et role, accessibilite.
- Soixante-dix specimens ecrits, un par composant.
- Layout de documentation : rail par famille, fil d Ariane, cartes d apercu.

### Corrige
- Cartes du catalogue : structure HTML valide (article, pas de lien imbrique).

## [1.9.0] - 2026-10-27

### Ajoute
- `calendar` : grille de jours calculee par le serveur, navigation de mois par liens.
- `input-otp` : code a usage unique, controleur `ui--input-otp` (avance, retour, collage).
- Harnais : 66 composants rendus, contrat et accessibilite a 147 assertions.

## [1.8.0] - 2026-10-27

### Ajoute
- Navigation : `navbar`, `navigation-menu`, `menubar`.
- Surfaces : `hover-card`, `scroll-area`, `direction`.
- Interactions : `context-menu` et `resizable`, avec controleurs Stimulus.
- Harnais : 64 composants rendus, contrat et accessibilite a 139 assertions.

## [1.7.0] - 2026-10-27

### Ajoute
- `button-group`, `toggle-group`, `spinner`, `collapsible`.
- `list-group`, `aspect-ratio`, `input-group`, `code-block`, `marker`.
- Harnais : 56 composants rendus, contrat et accessibilite a 126 assertions.

## [1.6.1] - 2026-10-27

### Ajoute
- `docs/PACKAGIST.md` : metadonnees, procedure de publication et tags.
- README : installation du paquet sans Packagist, par source VCS.
- `composer.json` : `keywords` et `support`.

## [1.6.0] - 2026-10-27

### Ajoute
- `composer.json` a la racine : paquet `memolabs-dev/guilloche` de type library, scripts `test` et `docs`.
- `bin/docs` : catalogue genere depuis les manifests et les templates, verifie par la CI.
- Champ `family` dans les manifests de recette et `version` dans le manifest du kit.
- `harness/tests/AccessibilityTest.php` : noms accessibles des champs et boutons, roles `progressbar` et `switch`, SVG nommes ou masques, `nav` et `dialog` nommes.
- `docs/VERSIONING.md` : politique semver et deprecation.

### Corrige
- `checkbox` : SVG interne marque `aria-hidden`.
- `sidebar` : `aria-label` porte par le `nav`.

## [1.5.0] - 2026-10-27

### Ajoute
- `date-picker` (input natif), `chart` (SVG rendu par le serveur), `carousel` (scroll-snap natif).
- `file-upload`, `combobox`, `command` avec controleurs Stimulus.
- Harnais : 47 composants rendus, test de contrat a 54 assertions.
- `docs/COMPONENTS.md` : composants avances et vague de distribution.

## [1.4.0] - 2026-10-27

### Ajoute
- Patterns d'ecran : `page-header`, `filter-bar`, `form-section`, `detail-layout`, `sidebar`, `confirm-dialog`, `data-region`.
- Controleur `ui--confirm-dialog` : emet `ui:confirm` avant de fermer.
- Harnais : 41 composants rendus, test de contrat a 48 assertions.
- `docs/COMPONENTS.md` : patterns d'ecran et composants restants.

## [1.3.0] - 2026-10-27

### Ajoute
- Donnees : `table`, `description-list`, `stat`, `empty-state`, `timeline`, `toast`.
- Formulaires : `radio-group`, `slider`.
- Navigation et surfaces : `dropdown-menu`, `popover`.
- Controleur `ui--toast` (fermeture et `autohide`).
- Harnais : 34 composants rendus, test de contrat a 40 assertions.
- `docs/COMPONENTS.md` : catalogue regroupe par famille et vagues suivantes.

## [1.2.0] - 2026-10-27

### Ajoute
- `breadcrumb`, `pagination`, `toggle`, `accordion` (details natif), `tabs` (onglets de navigation par URL), `dialog` et `sheet` (`<dialog>` natif), `tooltip`.
- Controleurs Stimulus `ui--toggle`, `ui--dialog`, `ui--sheet`, copies dans `%CONTROLLERS_DIR%`.
- Harnais : page catalogue des 24 composants, test de contrat a 30 assertions.
- `docs/COMPONENTS.md` : catalogue a jour et vagues suivantes.

## [1.1.0] - 2026-10-27

### Ajoute
- Recette `theme` : tokens `--ui-*`, reset minimal, typographie, themes clair et sombre.
- Composants `icon`, `badge`, `card`, `separator`, `skeleton`, `kbd`, `alert`, `avatar`, `progress`.
- Composants de formulaire `field`, `input`, `textarea`, `select`, `checkbox`, `switch`.
- Entree SCSS unique `kits/guilloche/styles.scss`, `bin/build-css` compile le kit complet.
- `bin/sync-harness` : copie templates, controleurs et styles dans le harnais et regenere son point d'entree Sass.
- Harnais : page catalogue rendant les 17 recettes, test de contrat a 21 assertions.
- `docs/COMPONENTS.md` : catalogue, principes et vagues suivantes.


## [1.0.0] - 2026-10-27

### Ajouté
- Kit `guilloche` pour le Symfony UX Toolkit (`kits/guilloche/manifest.json`).
- Recette `button` : composant Twig anonyme (`templates/components/Button.html.twig`), contrôleur Stimulus (`assets/controllers/button_controller.js`), source SCSS (`assets/styles/ui/button.scss`).
- App harnais minimale Symfony (AssetMapper + SassBundle) dans `harness/`.
- `bin/lint-recipes` et `bin/build-css`.
- `dist/guilloche.css` précompilé.
- Licence MIT (titulaire Guillaume Flambard), README, CHANGELOG, CONTRIBUTING.
