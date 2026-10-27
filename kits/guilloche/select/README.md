# Select — kit Guilloche

Liste deroulante native.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant, relie le label |
| `name` | `null` | Nom du champ (defaut : `id`) |
| `options` | `[]` | Liste de `{ value, label }` ou de chaines |
| `value` | `null` | Valeur selectionnee |
| `placeholder` | `null` | Option vide proposee en tete |
| `describedBy` | `null` | `aria-describedby` |
| `invalid` | `false` | Pose `aria-invalid="true"` |
| `disabled` | `false` | Desactive la liste |
| `required` | `false` | Selection obligatoire |

## Exemple

```twig
<twig:ui:Field id="status" label="Etat">
  <twig:ui:Select id="status" value="action" :options="[
    { value: 'action', label: 'A votre tour' },
    { value: 'done', label: 'Terminee' }
  ]" />
</twig:ui:Field>
```
