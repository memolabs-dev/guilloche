# Changelog

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
