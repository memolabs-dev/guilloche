# EmptyState — kit Guilloche

Etat vide, avec une action de sortie dans le slot.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `title` | requis | Titre |
| `message` | `null` | Explication |

## Exemple

```twig
<twig:ui:EmptyState title="Aucune mission" message="Creez une mission pour commencer.">
  <twig:ui:Button>Creer une mission</twig:ui:Button>
</twig:ui:EmptyState>
```

Note : l'exemple ci-dessus suppose que `Button` est installe. Une recette ne créé pas cette dépendance ; le slot accepte n'importe quel bouton de l'application.

## Filigrane en contre-jour (optionnel)

| Prop | Défaut | Rôle |
|------|--------|------|
| `watermark` | `false` | Active le filigrane en sombre uniquement |
| `watermarkPath` | `null` | Tracé SVG `d` calculé côté serveur dans un `viewBox="0 0 100 100"`, ou rosette géométrique de repli |

```twig
<twig:ui:EmptyState
  title="Aucune mission"
  message="Créez une mission pour commencer."
  watermark
/>
```

Le filigrane n'est pas une icône d'action, il est masqué aux technologies d'assistance et n'est rendu que sur cette surface. Il reste à 4 % d'opacité derrière le contenu, n'apparaît jamais en thème clair, et ne dépend pas de JavaScript.
