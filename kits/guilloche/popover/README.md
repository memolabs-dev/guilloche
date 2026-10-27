# Popover — kit Guilloche

Panneau flottant ancre. Repose sur `details` et `summary` : ouverture au clavier et fermeture natives, sans JavaScript.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | requis | Libelle du declencheur |

Le contenu du panneau vient du slot.

## Exemple

```twig
<twig:ui:Popover label="Details">
  <p>Contenu du panneau.</p>
</twig:ui:Popover>
```
