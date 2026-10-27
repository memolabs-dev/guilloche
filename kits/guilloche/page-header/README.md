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

## Filigrane en contre-jour (optionnel)

| Prop | Défaut | Rôle |
|------|--------|------|
| `watermark` | `false` | Active le filigrane **uniquement en thème sombre** |
| `watermarkPath` | `null` | Tracé SVG `d` calculé côté serveur (coordonnées `viewBox="0 0 100 100"`) ; sans lui une rosette géométrique générique est affichée |

```twig
<twig:ui:PageHeader
  title="Mission AR-2026-042"
  description="Dossier"
  watermark
  :watermarkPath="paths.main"
/>
```

Le tracé est purement décoratif (`aria-hidden="true"`). Il ne doit y avoir **qu'un filigrane au maximum par écran**. L'application fournit la référence, puis calcule le chemin SVG côté serveur si elle souhaite distinguer les objets. Le filigrane générique fonctionne sans aucune dépendance à `Rosette` ni à JavaScript. Le CSS protège la lisibilité en plaçant les textes au-dessus et en limitant l'opacité à 4 %.
