# Field — kit Guilloche

Enveloppe de champ : label, aide, erreur. Le controle natif passe dans le slot.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant du controle, relie le label |
| `label` | `null` | Libelle |
| `help` | `null` | Aide, rendue avec l'id `<id>-help` |
| `error` | `null` | Erreur, rendue avec l'id `<id>-error` |
| `required` | `false` | Marque le champ obligatoire |

## Exemple

```twig
<twig:ui:Field id="email" label="Adresse e-mail" help="Jamais partagee" required>
  <twig:ui:Input id="email" type="email" describedBy="email-help" required />
</twig:ui:Field>
```

Le controle doit pointer ses descriptions avec `aria-describedby="<id>-help <id>-error"` et `aria-invalid="true"` en cas d'erreur.
