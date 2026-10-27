# Rosette — kit Guilloche

Empreinte guillochée d'un objet : une même graine donne toujours le même dessin.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `seed` | requis | Texte qui détermine le dessin (référence, identifiant) |
| `size` | `32` | `16`, `20`, `24`, `32`, `40`, `64` |
| `progress` | `null` | 0 à 100 : le trait principal s'arrête à la valeur |
| `loading` | `false` | Le trait se trace en boucle (1,1 s) |
| `label` | `null` | Nom accessible ; sans label, la rosette est décorative |
| `paths` | `null` | `{ main, counter }` : chemins SVG calculés par PHP et rendus dans le HTML ; JS est alors facultatif |

## Choix technique et source

Le Toolkit ne permet pas à une recette de livrer une classe PHP : `copy-files` n'accepte que `%COMPONENTS_DIR%` et `%CONTROLLERS_DIR%` (schéma `schema-kit-recipe-v1.json`, branche 3.x du dépôt `symfony/ux-toolkit`). Le calcul vit donc dans un contrôleur Stimulus, `ui--rosette`, avec un tracé de repli rendu par le serveur.

Le contrôleur part de la graine, la hache en FNV-1a et en dérive cinq paramètres indépendants (lobes, profondeur, rotation, copies tissées, inclinaison). Aucun compteur statique : l'identifiant vient de la graine et de la taille, donc rien ne survit d'une requête à l'autre sous FrankenPHP.

## Accessibilité

- Sans `label`, la rosette est `aria-hidden` et ne porte aucun sens.
- Avec `label`, elle est `role="img"` et annoncée.
- `prefers-reduced-motion` arrête le tracé de chargement.

## Usages

Une recette ne peut pas en appeler une autre : les compositions ci-dessous
s'écrivent dans l'application, avec les deux recettes installées.

- Avatar d'un objet : la rosette seule, avec un label, ou à côté de `ui:Avatar`.
- Progression : `progress` remplace un anneau.
- Chargement long : `loading`, au-delà d'une seconde.
- État vide : rosette de 64 px au-dessus de `ui:EmptyState`.

```twig
<twig:ui:Rosette seed="AR-2026-042" :size="64" label="Mission AR-2026-042" />
<twig:ui:EmptyState title="Aucune mission" message="Créez une mission pour commencer." />
```
