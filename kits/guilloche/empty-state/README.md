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
