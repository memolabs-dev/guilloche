# Accordion — kit Guilloche

Section repliable. Repose sur `details` et `summary` natifs : ouverture, clavier et annonce fonctionnent sans JavaScript.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `summary` | requis | Titre de la section |
| `open` | `false` | Section ouverte au chargement |

## Exemple

```twig
<twig:ui:Accordion summary="Conditions de la mission">
  <p>Texte du contenu.</p>
</twig:ui:Accordion>
```
