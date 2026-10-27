# HoverCard — kit Guilloche

Carte d'aperçu au survol et au focus.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | requis | Texte ancre |
| `id` | `null` | Identifiant de la carte (genere si absent) |

## Accessibilite

La carte est reliee par `aria-describedby` et s'affiche aussi avec `focus-within`, donc elle reste atteignable au clavier. Sur mobile, un clic n'ouvre pas la carte : ne rien y mettre d'indispensable.
