# Spinner — kit Guilloche

Indicateur de chargement autonome.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | `null` | Nom accessible ; sans label, le spinner est decoratif |
| `size` | `md` | `sm`, `md`, `lg` |

## Accessibilite

Avec `label`, le spinner porte `role="status"` et `aria-label`. Sans label, il est `aria-hidden="true"` : ne jamais laisser un chargement muet, l'annonce doit exister ailleurs.
