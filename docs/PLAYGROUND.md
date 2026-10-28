# Playground de props Guilloche

Le harnais Symfony (et non le kit distribué) propose une interaction
progressive, avec des composants réellement rendus côté serveur.

## Couverture actuelle

12 recettes : Button, Input, Badge, Card, Dialog, Table, Select, Textarea,
Checkbox, Switch, Alert et Progress.

Les schémas sont déclarés uniquement dans
harness/src/Doc/Playground.php. Une entrée précise les props affichées,
les valeurs autorisées, les limites des nombres et les valeurs par défaut.
Les aperçus réels sont dans harness/templates/doc/_playground_result.html.twig.

La source Twig copiée vient du même service PHP que la normalisation ;
ne jamais fabriquer une prop par simple substitution d'une chaîne cliente.

## Règles de sécurité et accessibilité

- Paramètres GET en liste blanche : les noms inconnus sont ignorés.
- select limité à des options explicitement supportées par la recette.
- number : entier décimal non signé, borné par min et max ;
  les valeurs hors bornes retrouvent le défaut.
- text : caractères de contrôle retirés, 70 caractères maximum,
  échappement HTML pour le snippet Twig.
- checkbox : attribut booléen Twig, pas de checked="false".
- Le formulaire GET fonctionne même si JavaScript est coupé.
- JavaScript remplace uniquement un fragment HTML rendu par Symfony,
  jamais du HTML de composants reconstruit sur le client.
- Thèmes clair/sombre, largeur mobile et captures Chromium font partie
  de la validation.
- L'aperçu ne persiste aucune donnée.

## Étendre une recette

1. Vérifier les props réelles dans le template du composant.
2. Déclarer dans SCHEMAS les props pertinentes et leurs contraintes.
3. Rendre la même configuration dans _playground_result.html.twig en
   passant les valeurs normalisées aux vrais Twig Components.
4. Ajouter un cas à snippet() avec le code Twig réellement installable.
5. Ajouter un test PHP de rendu, de snippet et d'entrée non valide.
6. Ajouter un test navigateur desktop et mobile, avec et sans JavaScript.

Ne pas prétendre que toutes les props d'une recette sont exposées :
l'atelier présente une sélection représentative, pas un éditeur de
template ou un interpréteur Twig libre.
