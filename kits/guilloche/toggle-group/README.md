# ToggleGroup — kit Guilloche

Groupe de bascules dans un rail commun. Chaque bascule conserve son `aria-pressed`.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | requis | Nom accessible du groupe |

## Exemple

```twig
<twig:ui:ToggleGroup label="Affichage">
  <twig:ui:Toggle :pressed="true">Liste</twig:ui:Toggle>
  <twig:ui:Toggle>Grille</twig:ui:Toggle>
</twig:ui:ToggleGroup>
```
