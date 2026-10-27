# PageHeader — kit Guilloche

En-tete de page avec titre, description et actions.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `title` | requis | Titre de la page |
| `description` | `null` | Texte secondaire |
| `headingLevel` | `1` | Niveau de titre, pour eviter un second `h1` |

Les actions viennent du slot.

## Exemple

```twig
<twig:ui:PageHeader title="Missions" description="Suivi des dossiers en cours">
  <twig:ui:Button>Nouvelle mission</twig:ui:Button>
</twig:ui:PageHeader>
```
