# Revue P0 : douze fondations Guilloche

La page /foundations présente les vrais composants Twig : Theme, Button,
Input, Textarea, Select, Card, Badge, Table, Dialog, Tabs, Alert et
DropdownMenu. Les styles de cette page sont hors du kit distribué.

## Évaluation avant corrections

Captures CI du run 40746723333 (artefact guilloche-proof), bureau
1440 px et mobile 390 px, clair et sombre.

- Surface et densité : neutres cohérents, champs de 40 px,
  boutons 34/40/44 px et cartes à rayon 13 px.
- Mobile : tables horizontalement défilables au toucher, mais conteneur
  non focusable : bloquant pour le clavier sans JavaScript.
- Documentation : preuves dispersées entre onze fiches, sans planche
  commune illustrant les états et tokens de thème.
- Surfaces interactives : contrôles natifs de dialogue et menus déjà
  couverts par des tests, plus une planche comparative commune.

## Correctifs

- Table : région de défilement focusable au clavier, nom accessible,
  focus-visible et défilement horizontal natif sans JavaScript.
- Planche /foundations : état normal, focus, validation, disabled,
  loading, hover, badge et alertes, navigation des tabs et menus.
- Chromium : 390/1440 pixels et clair/sombre, douze panneaux,
  absence de débordement global, navigation clavier, images avant/après.

## Conditions de release

Tests CI du kit, E2E, rendu sans JavaScript et consommateur Symfony
indépendant doivent rester verts ; comparer les captures CI antérieures
40746723333 et nouvelles avant publication d'un tag stable.
