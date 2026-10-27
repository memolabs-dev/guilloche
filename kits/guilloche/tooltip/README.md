# Tooltip — kit Guilloche

Aide courte, au survol et au focus clavier.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `text` | requis | Contenu de la bulle |
| `id` | `null` | Identifiant de la bulle (genere si absent) |

## Accessibilite

- La bulle est reliee par `aria-describedby` : elle est annoncee meme fermee.
- L'ancre recoit `tabindex="0"` pour que le clavier puisse l'atteindre.
- Ne jamais mettre une information indispensable uniquement dans une infobulle : elle disparait au toucher.

## Exemple

```twig
<twig:ui:Tooltip text="Raccourci Ctrl K">
  <twig:ui:Icon name="search" />
</twig:ui:Tooltip>
```
