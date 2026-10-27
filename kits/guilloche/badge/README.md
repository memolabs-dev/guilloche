# Badge — kit Guilloche

Etiquette courte pour un état, un compteur ou une catégorie.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `tone` | `neutral` | `neutral`, `primary`, `success`, `warning`, `danger`, `info` |
| `variant` | `soft` | `soft`, `solid`, `outline` |

## Exemple

```twig
<twig:ui:Badge tone="success">Validé</twig:ui:Badge>
<twig:ui:Badge tone="danger" variant="solid">En retard</twig:ui:Badge>
```

## Accessibilité

La teinte ne doit jamais être le seul porteur d'information : le texte du badge porte le sens.
