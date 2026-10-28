# Guilloche — revue visuelle P0 des fondamentaux

Statut : **première tranche du ticket #57**, non publiée en version stable.
Périmètre : la recette `theme` (tokens) et les recettes `button`, `input`, `textarea`, `select`, `card`, `badge`, `table`.

## Décisions

- **Sobriété** : la palette neutre demeure le défaut ; `data-ui-brand="guilloche"` conserve l'identité verte en option. Aucune dépendance Bootstrap ou Tailwind.
- **Géométrie** : tailles communes 34 / 40 / 44 px via `--ui-control-sm/md/lg`. La taille « md » fournit un confort amélioré sans modifier la signature des Twig Components.
- **Texte** : 14 px pour les contrôles de base et les textes secondaires, 15 px pour la taille de texte médiane, typographie Geist et chiffres tabulaires préservés.
- **Surfaces** : bordures et ombres plus douces, rayons harmonisés, meilleur rythme intérieur des cartes et des tableaux.
- **États** : hover visible, focus clavier avec ring existant, disabled, invalid et loading respectés. Reduced motion neutralise les transitions décoratives.
- **Compatibilité** : tous les noms CSS `ui-*` et toutes les props Twig existantes sont conservés. Les recettes restent copiables individuellement.

## Matrice de validation visuelle

Les captures Chromium de la CI comparent ces sept recettes sur les quatre variantes
`desktop-light`, `desktop-dark`, `mobile-light` et `mobile-dark`, avec les fichiers
`core-<recette>-<viewport>-<theme>.png`.

| Recette | À vérifier |
| --- | --- |
| Button | 34/40/44 px, six variantes, hover, focus-visible, loading, disabled |
| Input | 40 px, placeholder, invalid, disabled, focus, soumission native |
| Textarea | minimum 112 px, redimensionnement vertical, focus |
| Select | 40 px, flèche, valeurs et navigation clavier native |
| Card | 13 px de rayon, titres/description, footer, rythme intérieur |
| Badge | au moins 23 px, nuances `soft`, `solid`, `outline`, clair/sombre |
| Table | lignes au moins 46 px, lecture des colonnes, focus-within, débordement interne |

La CI valide également la synchronisation du harnais et l'égalité exacte de `dist/guilloche.css`
avec `bin/build-css`. Les captures **ne sont pas à elles seules une certification d'accessibilité** :
il faut vérifier les composants dans l'application consommatrice.

## Hors de portée de cette tranche

`Dialog`, `Tabs`, `Alert` et `DropdownMenu` restent à revoir, de même que
la signature `Rosette` (non incluse dans les douze composants fondamentaux du #57).

Ne pas taguer de release ni déployer `guilloche-workspace` tant que la validation
visuelle du consommateur n'a pas été réalisée. Cette documentation ne remplace pas
une revue humaine de lisibilité, de densité et d'interactions.
