# DescriptionList — kit Guilloche

Paires libellé et valeur.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Paires `{ term, description, serial?, prefix? }` |
| `serial` | `false` | Traite les valeurs comme des identifiants en police mono ; un item peut remplacer ce choix par `serial: true/false` |

## Exemple

```twig
<twig:ui:DescriptionList :items="[
  { term: 'Numéro', description: 'F-2026-010' },
  { term: 'Échéance', description: '30 novembre 2026' }
]" />
```
