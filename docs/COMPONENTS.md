# Catalogue Guilloche — état de la version 2.x

Le catalogue **exhaustif** des 74 recettes, avec leurs versions et leurs props, est généré automatiquement à partir des manifests et des composants Twig : voir [COMPONENTS.generated.md](COMPONENTS.generated.md). Éviter de dupliquer cette liste manuellement.

## Principes de conception

- Recettes Twig copiables et indépendantes entre elles ; pas d'obligation de React, de Bootstrap ou de framework CSS.
- Fondation commune `theme` : tokens `--ui-*`, reset, typographie Geist et thèmes clair/sombre. Elle est nécessaire pour le rendu attendu.
- Les libellés affichés par l'application passent par les props ou les slots ; les attributs HTML supplémentaires sont transmis aux composants compatibles.
- Les recettes interactives utilisent des contrôleurs Stimulus distincts et facultatifs pour l'affichage serveur. L'application doit **installer et enregistrer ces contrôleurs**.
- `Rosette` et `Seal` peuvent être rendus sans JavaScript ; leur calcul automatique côté Symfony requiert l'enregistrement une fois de `AutoGeometrySubscriber`.

## Utiliser et tester les recettes

Installer la dépendance Composer depuis la [release GitHub](https://github.com/memolabs-dev/guilloche/releases/tag/v2.0.0) à l'aide d'un dépôt VCS, puis utiliser `bin/guilloche-install` pour copier la recette. Le [README principal](../README.md#installation-dans-une-application-symfony) présente la procédure et ses limites.

La documentation Symfony locale est disponible dans `harness/`. Chaque fiche possède un rendu ; les exemples détaillés ou ceux des aperçus sont consultables en Twig. Les sections d'accessibilité reprennent les indications réellement fournies par les README. Une absence de documentation spécifique ne vaut **pas** certification d'accessibilité.

## Critères de maturité

Une recette ne devrait être recommandée à un consommateur externe qu'après :

1. Rendue sans erreur en clair et en sombre, avec et sans JavaScript lorsque cela s'applique.
2. Vérification au clavier (focus, Escape, flèches) et nom accessible des éléments interactifs.
3. Exemple Twig copiable et testable, propriétés synchronisées avec le template.
4. Validation dans une véritable application Symfony, avec envoi du formulaire pour les champs.
5. Absence de conflit CSS ou de chargement incomplet des contrôleurs Stimulus.

Le périmètre historique « livré en 1.5.0 » a été retiré de ce fichier : les versions par recette font foi dans le catalogue généré et les manifests.
