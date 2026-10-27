# FilterBar — kit Guilloche

Barre de filtres sous forme de formulaire GET : elle fonctionne sans JavaScript et l'URL porte l'etat.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `action` | `null` | URL du formulaire |
| `method` | `get` | Methode HTML |
| `submitLabel` | `null` | Libelle du bouton, masque si absent |
| `label` | `Filters` | Nom accessible du formulaire |

Les champs viennent du slot.

## Exemple

```twig
<twig:ui:FilterBar action="{{ path('app_missions') }}" submitLabel="Filtrer">
  <twig:ui:Field id="q" label="Recherche">
    <twig:ui:Input id="q" name="q" type="search" />
  </twig:ui:Field>
</twig:ui:FilterBar>
```
