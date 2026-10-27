# Textarea — kit Guilloche

Zone de saisie multiligne. Meme contrat que `Ui:Input`.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant, relie le label |
| `name` | `null` | Nom du champ (défaut : `id`) |
| `rows` | `4` | Hauteur initiale en lignes |
| `value` | `null` | Contenu initial |
| `placeholder` | `null` | Texte d'aide |
| `describedBy` | `null` | `aria-describedby` |
| `invalid` | `false` | Pose `aria-invalid="true"` |
| `disabled` | `false` | Desactive le champ |
| `required` | `false` | Champ obligatoire |

## Exemple

```twig
<twig:ui:Field id="note" label="Note interne">
  <twig:ui:Textarea id="note" rows="5" placeholder="Contexte de la mission" />
</twig:ui:Field>
```
