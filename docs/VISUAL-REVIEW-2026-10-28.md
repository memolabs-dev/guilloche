# Revue visuelle Guilloche — 28 octobre 2026

## Preuves et protocole

Les 28 captures du harnais Symfony ont été générées dans un navigateur **Chromium réel** pour Button, Input, Table, Dialog, Alert, Rosette et Seal, à 1440 × 900 et 390 × 844, en clair et en sombre. Artefact de référence : [GitHub Actions #40599919346](https://github.com/memolabs-dev/guilloche/actions/runs/40599919346). Les assertions automatiques vérifient la police Geist chargée, le thème, le débordement horizontal mobile, les ressources HTTP, les 48 tracés de rosettes **sans JavaScript** et les animations réduites. Un contrôle automatique ne remplace pas une comparaison humaine.

La revue humaine a maintenant examiné les **28 captures** de cet artefact, composant par composant, en clair/sombre et sur les deux tailles d'écran. Références consultées : [shadcn/ui Button](https://ui.shadcn.com/docs/components/base/button) et [ses exemples officiels](https://ui.shadcn.com/examples), ainsi que les directives du projet `docs/DESIGN-DIRECTIVES.md`. **Il ne s'agit pas d'un pixel-diff synchronisé contre le site shadcn**, et cette revue ne prétend pas être une comparaison pixel à pixel contre shadcn.

## Observations étayées

| Dimension | Observation | Action |
|---|---|---|
| Couleurs et navigation | Fond neutre, typographie sans-serif et hiérarchie lisible sur les captures examinées | Conserver cette base distincte de l'identité de la démo |
| Mobile (390 px) | La barre de recherche, le thème et la navigation compacte tiennent dans la largeur ; le tableau reste dense mais sans débordement de page | Maintenir l'assertion Chromium anti-overflow |
| Exemples | Les petites rosettes et les sceaux occupent une grande scène d'aperçu de 240 px ; beaucoup de vide sans information | Ajouter le variant de documentation `ds__example-render--compact` (136 px, 112 px mobile) |
| Signature | La planche de 48 empreintes diffère par les courbes ; des formes restent proches visuellement à 32 px | Conserver le test d'unicité, prévoir une vraie revue côte à côte zoomée si la discrimination visuelle devient un critère produit |
| Code | Les snippets sont présents et défilables, mais la densité du texte mobile reste élevée | Maintenir des surfaces de code scrollables ; amélioration typographique à évaluer séparément |
| Couleur sombre | Seal et Table sur fond sombre : hiérarchie sans aplats saturés envahissants | Vérifier régulièrement contraste et lisibilité des micro-textes |

## Ce qui reste à valider avant une présentation commerciale

La CI prouve un rendu fonctionnel en Chromium, pas l'absence de tous les problèmes visuels. Il reste pertinent d'effectuer des tests exploratoires au clavier et lecteur d'écran, une comparaison visuelle à taille réelle contre shadcn, et un parcours du **Guilloche Workspace** déployé (la réussite d'un workflow GitHub ne démontre pas à elle seule la mise à jour du domaine public).

## Réconciliation des changements parallèles

Une deuxième PR de compactage a été fusionnée en parallèle (#43) après la PR #42. La variante responsive de #42 reste la seule règle effective ; la déclaration redondante issue de #43 a été supprimée. Les extraits Twig de `Seal` ont été réalignés sur le vrai contrat `by` seul, désormais pris en charge automatiquement par `AutoGeometrySubscriber`.

## Défaut supplémentaire relevé dans Dialog

Les captures desktop clair/sombre montrent le bouton de déclenchement de ConfirmDialog près du bord droit de la scène (bien qu'il reste centré sur mobile). Le wrapper utilisait `display: contents`; il revient à `display: inline-flex` pour conserver un élément flex identifiable. La CI Chromium mesure désormais la position et la visibilité complètes du bouton à 390 et 1440 px. Aucun changement au comportement de confirmation.
