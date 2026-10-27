# DataRegion — kit Guilloche

Region de resultats avec états explicites : `idle`, `loading`, `error`, `empty`.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `state` | `idle` | Etat courant, pose en `data-state` |
| `loadingMessage` | `null` | Message de chargement (`rôle="status"`) |
| `errorMessage` | `null` | Message d'erreur (`rôle="alert"`) |
| `emptyMessage` | `null` | Message d'etat vide |

Le contenu vient du slot ; il est attenue pendant le chargement et l'erreur plutot que supprimé, pour eviter les sauts de mise en page.

## Exemple

```twig
<twig:ui:DataRegion state="loading" loadingMessage="Chargement des missions...">
  <p>Resultats précédents conserves.</p>
</twig:ui:DataRegion>
```
