# Tabs — kit Guilloche

Onglets de navigation. Chaque onglet est un lien : l'etat vient de l'URL, sans JavaScript, et le retour arriere du navigateur fonctionne.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `items` | `[]` | Onglets `{ label, href, current }` |
| `label` | `Tabs` | Nom accessible du `nav` |

## Exemple

```twig
<twig:ui:Tabs :items="[
  { label: 'En cours', href: '?status=open', current: true },
  { label: 'Terminees', href: '?status=done' }
]" />
```

## Sémantique et clavier

Ces onglets changent **d'URL** : ce sont des liens de navigation natifs, et non un widget d'onglets ARIA. Utiliser Tab/Maj+Tab et Entrée comme pour des liens. L'élément actif est annoncé avec `aria-current="page"`. Pour des panneaux qui changent sans navigation, implémenter séparément les conventions de `tablist`, `tab`, `tabpanel` et les flèches du clavier.
