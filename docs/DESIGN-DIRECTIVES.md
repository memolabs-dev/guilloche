# Directives design pour le kit Guilloche (refonte visuelle)

Destinataire : l'agent qui travaille sur `memolabs-dev/guilloche` (kit `kits/guilloche`, harness `harness/`, servi sur http://127.0.0.1:8088).
Rédigé le 27 octobre 2026 après revue du catalogue rendu.

## Le constat

La demande était un design system au niveau de shadcn/ui ou Bootstrap : neutre, dense, net, crédible pour une app métier. Le rendu actuel n'en est pas un. Il recopie l'identité de la démo `guilloche-workspace` (« titre fiduciaire ») au lieu de poser une base neutre :

1. **Bodoni Moda partout.** Titres de page, de section et même les titres de carte en 13 px (« Intents », « Tableau simple ») sont en Didone. Une Didone à petite taille en UI fait amateur. Aucun design system pro n'utilise une serif d'affichage dans ses composants.
2. **Tout baigne dans le vert sauge.** Fond `#edf1ea`, cartes `#fbfcf9`, muted `#e3e9e0`, bordures `#d3dbcf` : quatre surfaces presque identiques, teintées vert. Pas de hiérarchie, effet délavé.
3. **Couleurs d'action lourdes.** Primary vert foncé plein, danger rouge brique plein, alertes en aplats colorés (vert, ocre, rose) : trop de couleur pour trop peu d'information.
4. **Pas d'échelle de contrôles.** Le bouton n'a pas de hauteur fixe, seulement du padding (`sm`/`md`/`lg` donnent 28/36/44 px approximatifs et des proportions différentes). Le survol est un `filter: brightness(0.95)`. Le variant `outline` a une bordure couleur texte, trop dure.
5. **Coquille de doc « déco ».** Libellés de sidebar en mono capitales espacées, logo souligné avec un point, pastilles de version partout : ça fait carnet de designer, pas documentation produit.
6. **Bugs de finition visibles :**
   - textes sans accents ni apostrophes dans le harness : « a ete prise en compte », « Enregistre », « Echec », « Echeance », « Numero », « donnees », « Accompagnement d octobre » (`harness/templates/page/index.html.twig`, `harness/templates/doc/specimens/*`) ;
   - `aria-label="Close"` en dur dans `dialog`, `sheet`, `toast` (kit et harness) : viole la règle « aucun libellé en dur », et c'est de l'anglais dans une démo française ;
   - boutons sans nom accessible dans le catalogue (aperçus Button et ButtonGroup), et des boutons dont le nom accessible est littéralement `false` (une prop booléenne rendue comme texte).

## La référence à suivre

L'app CDKF (« Atelier d'étude », `proj path clinical-data-knowledge-foundation`, React + Base UI + Tailwind 4) est le niveau visé. Lire son `DESIGN.md` en entier avant de toucher aux tokens : chaque valeur y est relevée dans le code. Ce qui la rend propre :

- un seul sans-serif (Roboto Variable chez elle) pour tout, titres compris ;
- des neutres quasi gris (chroma 0,004 à 0,02 en oklch), pas une teinte de marque étalée sur les surfaces ;
- **une** couleur d'action (bleu marque), une couleur de sélection neutre, une couleur d'attention (orange), jamais mélangées ;
- profondeur par couches de surfaces (canvas, panel, surface, sunken) plutôt que par ombres ;
- contrôles à 32 px, rayons 4/7/9/12 px, grille de 4 px ;
- 6 tailles de texte UI (12 à 14 px) plus 4 tailles de titres, graisse 500 pour les titres ;
- en sombre : fond ardoise, texte gris clair, lignes à peine visibles, l'accent seul ressort.

Comparer aussi, sans les copier, shadcn/ui (thème `neutral`/`zinc`) et Bootstrap 5.3 pour l'échelle des contrôles et les états.

## Ce qu'il faut faire

### 1. Fondation neutre par défaut, identité en thème optionnel

- Le thème par défaut du kit devient neutre : surfaces gris chaud ou gris froid à très faible chroma, une couleur primaire sobre (bleu encre ou presque noir, comme shadcn), statuts désaturés.
- L'identité Guilloché (vert, cuivre, Bodoni) devient un thème nommé, activable par attribut (`[data-ui-brand='guilloche']` ou équivalent), utilisé par la démo `guilloche-workspace`. Le kit ne l'impose pas.
- Écrire les tokens en `oklch()`, avec la même liste de rôles en clair et en sombre.

Rôles minimum (noms `--ui-*` conservés) :

| Rôle | Usage |
|---|---|
| `background` | canvas de l'app |
| `surface` / `card` | cartes, popovers, inputs (blanc en clair) |
| `muted` | fonds secondaires, en-têtes de tableau, code |
| `border` | traits 1 px, contraste faible |
| `border-strong` | bordure des inputs et du variant outline |
| `foreground`, `muted-foreground`, `subtle-foreground` | trois niveaux de texte |
| `primary`, `primary-hover`, `primary-foreground` | action principale |
| `accent` | survol des lignes, items de menu, ghost |
| `ring` | focus visible |
| `danger`, `success`, `warning`, `info`, chacun avec `-soft` et `-foreground` | statuts |

Règle : les statuts s'affichent en **texte et icône colorés sur fond `-soft` très pâle** (ou bordure seule), jamais en aplat saturé, sauf le bouton destructif.

### 2. Typographie

- Une seule famille pour toute l'UI : Inter (déjà vendorée) ou Geist. Retirer Bodoni Moda du thème par défaut, la garder seulement dans le thème de marque.
- Échelle UI : 12, 13, 14 (corps), 16 px. Titres : 18, 20, 24, 30 px, graisse 600, interlettrage -0,01 à -0,02 em.
- Mono (Fira Code ou Geist Mono) seulement pour le code et les chiffres tabulaires (`font-variant-numeric: tabular-nums` sur les montants).
- Jamais de capitales espacées en mono pour la navigation.

### 3. Échelle des contrôles

- Hauteurs fixes : `sm` 32 px, `md` 36 px, `lg` 40 px ; même échelle pour Button, Input, Select, Combobox, Toggle. Padding horizontal 10/12/16 px. Icônes 16 px.
- Rayon contrôles 6 px, cartes 8 à 10 px, dialogues 12 px.
- Variants Button : `primary` (plein), `secondary` (fond `muted`, sans bordure), `outline` (fond surface, bordure `border-strong`), `ghost` (transparent, fond `accent` au survol), `link`, `danger` (plein rouge, réservé à la confirmation destructive).
- Survol et pressé par **tokens** (`primary-hover`, `accent`), plus de `filter: brightness`.
- Focus : anneau 2 px `ring` décalé de 2 px, sur `:focus-visible` seulement.
- Désactivé : opacité 0,5 et `pointer-events: none`.
- Transitions 120 à 150 ms sur couleur et bordure, rien d'autre.

### 4. Surfaces

- Carte : fond `surface`, bordure 1 px `border`, ombre nulle ou `0 1px 2px` très légère. Titre de carte 14 px graisse 600, en sans-serif.
- Tableau : en-tête fond `muted` texte 12 px `muted-foreground`, lignes séparées par `border`, survol `accent`, hauteur de ligne 40 px, nombres alignés à droite en tabular-nums.
- Alert : fond `-soft`, icône et titre en couleur de statut, corps en `foreground`.
- Badge : 20 px de haut, 12 px, graisse 500 ; variants `neutral`, `outline` et statuts en `-soft`.
- Popover, menu, dialogue : fond `surface`, bordure `border`, ombre moyenne, items de 32 px avec survol `accent`.

### 5. Le site de documentation (harness)

- Sidebar : groupes en 12 px graisse 500 `muted-foreground`, sans mono ni capitales ; items 32 px, élément actif en fond `accent` et texte `foreground`.
- Logo : le nom en sans-serif 600, sans soulignement ni point décoratif.
- Page composant : titre 30 px, description 16 px, puis pour chaque exemple un bloc aperçu (fond `background`, centré, padding généreux, motif pointillé discret optionnel) collé à son bloc code (fond `muted`, coloration syntaxique sobre), onglets « Aperçu / Code » comme ux.symfony.com et shadcn.
- Une seule pastille de version par page, pas une par carte.
- Thème sombre réel dans la doc, avec bascule.

### 6. Corriger les bugs de finition

- Rétablir accents et apostrophes dans tous les textes du harness (« a été prise en compte », « Enregistré », « Échec », « Échéance », « Numéro », « Données », « Accompagnement d'octobre »).
- Remplacer `aria-label="Close"` par une prop (`closeLabel`), obligatoire ou avec valeur par défaut fournie par l'app.
- Donner un nom accessible à chaque bouton d'aperçu ; corriger le rendu de prop booléenne qui produit le libellé `false`.

## Contrôles avant de dire « fini »

1. Captures du catalogue et de 5 fiches (Button, Input, Table, Dialog, Alert) en clair et en sombre, à 1440 px et 390 px, comparées côte à côte avec une capture de CDKF. Les joindre au compte rendu.
2. `python3`/test de contraste existant : texte ≥ 4,5:1, texte secondaire ≥ 4,5:1, bordures d'input ≥ 3:1, dans les deux thèmes.
3. Lint des recettes (`bin/lint-recipes`), tests du harness, `bin/build-css` régénère `dist/guilloche.css`.
4. Recherche : `grep -rn "Bodoni" kits/guilloche` ne doit plus rien renvoyer hors du thème de marque ; `grep -rn 'aria-label="Close"'` ne renvoie plus rien ; aucun bouton sans nom accessible dans l'arbre d'accessibilité du catalogue.
5. Pas de nouveau framework CSS : tokens maison, comme décidé dans le README.

Livrer en petites PR : (a) tokens et thème neutre + thème de marque, (b) échelle des contrôles et variants, (c) surfaces, (d) coquille de doc, (e) bugs de finition. Chaque PR avec ses captures avant/après.

---

## Passe 2 (27 octobre 2026, 21 h 45) : pourquoi ça fait encore daté

Après `94926a2` (fondation neutre) et `c897ff7` (échelle des contrôles), les couleurs sont bonnes mais le rendu reste « vieux » face à Base UI (base-ui.com), shadcn/ui (ui.shadcn.com, onglet Base UI) et Bootstrap 6 (`6.0.0-alpha.1`, getbootstrap.com/docs/6.0). Relevé dans le navigateur, mesures par `getComputedStyle` et onglet réseau.

### Bloquant 1 : aucune police ne se charge

Toutes les requêtes de police répondent **404** : `/fonts/inter/inter-latin-*.woff2`, `/fonts/fira-code/…`, `/fonts/bodoni-moda/…`. `document.fonts` donne `Inter 400 error`, `document.fonts.check('14px Inter')` vaut `false`. Tout le site s'affiche dans la police système de secours.

Cause : `kits/guilloche/theme/assets/styles/ui/_fonts.scss` écrit `url('../../fonts/…')`. Une fois compilé par SassBundle dans `app-*.css`, ce chemin relatif ne passe pas par AssetMapper et tombe sur `/fonts/`, qui n'existe pas. Les fichiers sont pourtant dans `harness/assets/fonts/`.

À faire : des URL que AssetMapper réécrit (chemin relatif au fichier source qu'il résout et versionne), puis vérifier dans l'onglet réseau que chaque woff2 répond 200 et que `document.fonts.check('14px Inter')` vaut `true`. Ajouter ce contrôle au test e2e : une police qui ne charge pas doit faire échouer la CI.

Et puisque les trois références utilisent **Geist** (Bootstrap 6 : `font-family: Geist, -apple-system, …`), passer le thème neutre sur Geist + Geist Mono (licence OFL, à vendorer). Inter reste acceptable, mais elle doit charger. Bodoni ne doit plus être demandée du tout hors du thème de marque : aujourd'hui elle est encore téléchargée par défaut.

### Bloquant 2 : le thème sombre ne s'applique jamais

`<html data-ui-theme="light">` est écrit en dur. Avec un système en sombre (`prefers-color-scheme: dark` vrai), la doc reste blanche. Les trois références suivent le système par défaut et offrent une bascule Clair / Sombre / Système dans la barre du haut. Faire pareil : pas d'attribut par défaut, le contrôleur de thème ne le pose que sur choix explicite, choix gardé en `localStorage`.

### Ce qui date la page de doc

| Aujourd'hui | Base UI, shadcn, Bootstrap 6 |
|---|---|
| Titre de page à 50 px | 30 à 36 px, graisse 600, interlettrage -0,02 em |
| Trait `hr` sous chaque titre de section | Aucun trait : l'espacement sépare |
| Carte d'exemple avec un en-tête « Intents » + bouton « COPIER » en mono capitales | Un seul bloc : une **scène d'aperçu** large (220 à 300 px de haut, composant centré, rien d'autre), collée à son bloc code |
| Code gris sans coloration, sans numéros | Coloration syntaxique, numéros de ligne (shadcn), onglets de fichiers (`index.html.twig`, `button.scss`), icône copier en haut à droite |
| Catalogue : carte blanche + puits gris imbriqué + numéro de version mono + description | Liste ou grille plate ; pas de boîte dans une boîte ; pas de version par composant |
| Sidebar : logo souligné avec un point, « design system · 1.10.0 » en mono, bouton « Contraste », libellés de groupes en mono capitales | Logo simple, groupes en 13 px casse normale gris, items 14 px, actif en pastille `accent` |
| Pas de barre du haut | Barre fixe : logo, liens Docs / Composants, recherche `⌘K`, GitHub, version, bascule de thème |
| Pas de sommaire | Sommaire « Sur cette page » à droite au-delà de 1280 px (Bootstrap 6) |
| Rien en tête de fiche | Rangée d'actions sous la description : « Voir la source », « Copier la page en Markdown » (Base UI, shadcn) |

### Ce qui date encore les composants

- **Bouton** : la graisse calculée est 400 (le SCSS dit 500 mais quelque chose l'écrase ; à trouver). Passer à 500. `danger` est encore un rouge brique plein (`#a02f29`) : le passer en rouge net (`oklch(0.577 0.245 27)` côté shadcn) et prévoir un variant `danger` discret (texte rouge sur fond `-soft`) pour les usages courants.
- **Badge** : « En retard » en rouge plein. Tous les badges de statut en fond `-soft` + texte coloré ; plein seulement pour un compteur.
- **Rayons** : shadcn v4 et Bootstrap 6 sont à 8 px sur les contrôles et 12 à 14 px sur les cartes et la scène d'aperçu. 6 px fait plus ancien.
- **DatePicker** : l'input natif `jj/mm/aaaa` avec l'icône du navigateur jure à côté du reste. Habiller l'input (icône calendrier à nous, popover avec le composant Calendar) en gardant le natif comme repli sans JS.
- **Calendar** : une rangée de 5 jours n'est pas un calendrier. Grille 7 colonnes, en-têtes de jours, jours hors mois atténués, aujourd'hui marqué, sélection en `primary`.
- **Accents** : toujours absents (« controleurs », « distribues », « apercu », « Etiquette », « representer », « Echeance », « Selection », « semantique », « categorie », « Accompagnement d octobre »). C'est le premier signe d'amateurisme pour un lecteur français.

### Ordre de travail

1. Polices (bloquant 1), avec le contrôle e2e.
2. Thème sombre par défaut système (bloquant 2).
3. Gabarit de fiche : barre du haut, scène d'aperçu + code coloré à onglets, sommaire, titres.
4. Sidebar et page catalogue.
5. Bouton, badge, rayons, DatePicker, Calendar.
6. Accents partout.

Preuve attendue à chaque étape : captures 1440 px et 390 px, en clair et en sombre, **à côté de la même page sur ui.shadcn.com** (Button, Badge, Calendar, Date Picker). Si on ne peut pas dire laquelle des deux est la nôtre sans lire le nom, c'est bon.
