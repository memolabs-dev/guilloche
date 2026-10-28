# Guilloche — revue visuelle P0 des fondamentaux

Statut : **douze recettes fondamentales traitées sur deux PR**, non publiées en version stable.
Périmètre : `theme` (tokens), `button`, `input`, `textarea`, `select`, `card`, `badge`, `table`, `dialog`, `tabs`, `alert`, `dropdown-menu`.

## Décisions

- **Sobriété** : la palette neutre demeure le défaut ; `data-ui-brand="guilloche"` conserve l'identité verte en option. Aucune dépendance Bootstrap ou Tailwind.
- **Géométrie** : tailles communes 34 / 40 / 44 px via `--ui-control-sm/md/lg`. La taille « md » fournit un confort amélioré sans modifier la signature des Twig Components.
- **Texte** : 14 px pour les contrôles de base et les textes secondaires, 15 px pour la taille de texte médiane, typographie Geist et chiffres tabulaires préservés.
- **Surfaces** : bordures et ombres plus douces, rayons harmonisés, meilleur rythme intérieur des cartes et des tableaux.
- **États** : hover visible, focus clavier avec ring existant, disabled, invalid et loading respectés. Reduced motion neutralise les transitions décoratives.
- **Compatibilité** : tous les noms CSS `ui-*` et toutes les props Twig existantes sont conservés. Les recettes restent copiables individuellement.

## Matrice de validation visuelle

Les captures Chromium de la CI comparent ces onze composants (plus les tokens de thème) sur les quatre variantes
`desktop-light`, `desktop-dark`, `mobile-light` et `mobile-dark`, avec les fichiers
`core-<recette>-<viewport>-<theme>.png` et `surface-<recette>-<viewport>-<theme>.png`.

| Recette | À vérifier |
| --- | --- |
| Button | 34/40/44 px, six variantes, hover, focus-visible, loading, disabled |
| Input | 40 px, placeholder, invalid, disabled, focus, soumission native |
| Textarea | minimum 112 px, redimensionnement vertical, focus |
| Select | 40 px, flèche, valeurs et navigation clavier native |
| Card | 13 px de rayon, titres/description, footer, rythme intérieur |
| Badge | au moins 23 px, nuances `soft`, `solid`, `outline`, clair/sombre |
| Table | lignes au moins 46 px, références non scindées, focus-within, débordement interne |
| Dialog | bouton 40 px, titre et description, fermeture clavier, scroll natif |
| Tabs | liens de navigation (pas de faux widget tablist), aria-current et scroll mobile |
| Alert | textes et icônes, rôle status/alert correct, contraste en clair/sombre |
| DropdownMenu | details/summary natifs, ouverture sans JS, menu et liens accessibles |

La CI valide également la synchronisation du harnais et l'égalité exacte de `dist/guilloche.css`
avec `bin/build-css`. Les captures **ne sont pas à elles seules une certification d'accessibilité** :
il faut vérifier les composants dans l'application consommatrice.

## Hors de portée du P0

La signature `Rosette` ne fait pas partie des douze recettes fondamentales de #57.
Le playground de props configurables appartient au ticket #58. Il reste à organiser
la revue visuelle finale dans le vrai consommateur avant de taguer une release.

Ne pas taguer de release ni déployer `guilloche-workspace` tant que la validation
visuelle du consommateur n'a pas été réalisée. Cette documentation ne remplace pas
une revue humaine de lisibilité, de densité et d'interactions.
