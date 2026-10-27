# Calendar — kit Guilloche

Grille de jours. Les jours sont calcules par le serveur et passes au composant.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | requis | Nom accessible du calendrier |
| `month` | requis | Libelle du mois affiche |
| `days` | `[]` | Jours `{ label, href, selected, disabled, empty }` |
| `previousLabel` | requis | Nom accessible du bouton precedent |
| `nextLabel` | requis | Nom accessible du bouton suivant |
| `previous` | `null` | Lien vers le mois precedent |
| `next` | `null` | Lien vers le mois suivant |

## Accessibilite

La navigation de mois est faite de liens : elle fonctionne sans JavaScript. Le jour selectionne porte `aria-current="date"`. Les cases vides sont `aria-hidden`.

## Exemple

```twig
<twig:ui:Calendar label="Novembre 2026" month="Novembre 2026"
  previousLabel="Octobre" nextLabel="Decembre"
  previous="?month=2026-10" next="?month=2026-12"
  :days="[{ label: '1', href: '?date=2026-11-01' }, { label: '2', href: '?date=2026-11-02', selected: true }]" />
```
