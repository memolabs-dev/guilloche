# Input — kit Guilloche

Champ de saisie natif.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant, relie le label |
| `type` | `text` | Type HTML natif |
| `name` | `null` | Nom du champ (défaut : `id`) |
| `value` | `null` | Valeur initiale |
| `placeholder` | `null` | Texte d'aide dans le champ |
| `describedBy` | `null` | `aria-describedby` |
| `invalid` | `false` | Pose `aria-invalid="true"` |
| `disabled` | `false` | Desactive le champ |
| `required` | `false` | Champ obligatoire |

## Exemple

```twig
<twig:ui:Field id="search" label="Rechercher">
  <twig:ui:Input id="search" type="search" placeholder="Nom ou catégorie" />
</twig:ui:Field>
```
