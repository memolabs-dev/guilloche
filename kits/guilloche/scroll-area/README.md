# ScrollArea — kit Guilloche

Zone defilante bornee, pour les listes longues dans une carte.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `maxHeight` | `16rem` | Hauteur maximale, valeur CSS |
| `label` | `null` | Nom accessible de la region |

## Accessibilite

La zone est `tabindex="0"` et `role="region"` : le clavier peut la parcourir. Elle ne remplace pas une pagination quand le contenu est long a charger.
