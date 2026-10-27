# Revue visuelle Guilloche — 28 octobre 2026

## Preuves et protocole

Les 28 captures du harnais Symfony ont été générées dans un navigateur **Chromium réel** pour Button, Input, Table, Dialog, Alert, Rosette et Seal, à 1440 × 900 et 390 × 844, en clair et en sombre. Artefact de référence : [GitHub Actions #40599919346](https://github.com/memolabs-dev/guilloche/actions/runs/40599919346). Les assertions automatiques vérifient la police Geist chargée, le thème, le débordement horizontal mobile, les ressources HTTP, les 48 tracés de rosettes **sans JavaScript** et les animations réduites. Un contrôle automatique ne remplace pas une comparaison humaine.

La revue humaine a effectivement examiné les échantillons `button-mobile-light.png`, `table-mobile-dark.png`, `rosette-desktop-light.png` et `seal-desktop-dark.png` extraits de cet artefact. Références consultées : [shadcn/ui Button](https://ui.shadcn.com/docs/components/base/button) et [ses exemples officiels](https://ui.shadcn.com/examples), ainsi que les directives du projet `docs/DESIGN-DIRECTIVES.md`. **Il ne s'agit pas d'un pixel-diff synchronisé contre le site shadcn**, et les 24 autres images ne sont pas déclarées revues manuellement.

## Observations étayées

| Dimension | Observation | Action |
|---|---|---|
| Couleurs et navigation | Fond neutre, typographie sans-serif et hiérarchie lisible sur les quatre échantillons | Conserver cette base distincte de l'identité de la démo |
| Mobile (390 px) | La barre de recherche, le thème et la navigation compacte tiennent dans la largeur ; le tableau reste dense mais sans débordement de page | Maintenir l'assertion Chromium anti-overflow |
| Exemples | Les petites rosettes et les sceaux occupent une grande scène d'aperçu de 240 px ; beaucoup de vide sans information | Ajouter le variant de documentation `ds__example-render--compact` (136 px, 112 px mobile) |
| Signature | La planche de 48 empreintes diffère par les courbes ; des formes restent proches visuellement à 32 px | Conserver le test d'unicité, prévoir une vraie revue côte à côte zoomée si la discrimination visuelle devient un critère produit |
| Code | Les snippets sont présents et défilables, mais la densité du texte mobile reste élevée | Maintenir des surfaces de code scrollables ; amélioration typographique à évaluer séparément |
| Couleur sombre | Seal et Table sur fond sombre : hiérarchie sans aplats saturés envahissants | Vérifier régulièrement contraste et lisibilité des micro-textes |

## Ce qui reste à valider avant une présentation commerciale

La CI prouve un rendu fonctionnel en Chromium, pas l'absence de tous les problèmes visuels. Il reste pertinent d'effectuer des tests exploratoires au clavier et lecteur d'écran, une comparaison visuelle complète sur toutes les captures à taille originale, et un parcours du **Guilloche Workspace** déployé (la réussite d'un workflow GitHub ne démontre pas à elle seule la mise à jour du domaine public).
