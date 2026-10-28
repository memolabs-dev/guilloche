# Compositions métier Guilloche

Les recettes individuelles ne constituent pas à elles seules une application
utilisable. Trois modèles proposent des exemples Symfony/Twig réels,
indépendants du showroom historique.

| Route | Cas d'usage | Composants |
| --- | --- | --- |
| /patterns/mission-dashboard | Pilotage | Stat, Card, Table, Badge, Timeline, Button |
| /patterns/dossier-detail | Dossier | PageHeader, Card, DescriptionList, Timeline, Alert, Badge |
| /patterns/mission-form | Formulaire | FormSection, Field, Input, Select, Textarea, Button, Alert |

## Contrat de copie

- Le code Twig affiché est lu directement dans le fichier du modèle,
  sous harness/templates/doc/patterns, qui est aussi inclus pour produire
  le rendu SSR. Aucun extrait reconstitué.
- Le CSS affiché est lu directement dans harness/assets/styles/patterns.scss.
  Il relève de l'application et non du kit distribué : copier les styles,
  les adapter au projet et inclure les tokens Guilloche.
- Le modèle de formulaire utilise pattern-interactions.js pour une validation
  native locale. Le bouton reste désactivé sans JavaScript ; aucun POST n'est
  émis et aucune donnée n'est enregistrée. Brancher un contrôleur Symfony,
  ses validations serveur et un token CSRF avant toute soumission.
- Les noms, budgets et dates sont fictifs. Adapter les listes, les routes
  et les actions à l'application cible.
- Ces modèles ne constituent pas de nouvelles recettes du kit : le
  catalogue de 74 composants est inchangé.

## Qualité

- PHPUnit vérifie les routes, le rendu, les props, l'équivalence exacte
  entre code rendu et code affiché, et l'absence de soumission.
- Chromium capture les trois compositions en clair et sombre, sur écrans
  de 390 et 1440 pixels. Il vérifie le responsive et les erreurs JS.
- Le formulaire vérifie localement les contraintes natives et la copie Twig.
- Un scénario teste le rendu sans JavaScript.
