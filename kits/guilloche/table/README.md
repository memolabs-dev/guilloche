# Table — kit Guilloche

Cadre de tableau. L'application fournit `thead`, `tbody` et `tr`.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `caption` | `null` | Titre accessible du tableau |
| `serial` | `false` | Applique la typographie de numéro de série à la première colonne de données uniquement |

## Classes

- `.ui-table__num` sur les cellules numeriques : alignement a droite et chiffres tabulaires.

## Exemple

```twig
<twig:ui:Table caption="Factures">
  <thead><tr><th>Numéro</th><th class="ui-table__num">Montant</th></tr></thead>
  <tbody><tr><td>F-2026-010</td><td class="ui-table__num">480,00 €</td></tr></tbody>
</twig:ui:Table>
```

## Accessibilite

Le `caption` est le titre du tableau pour les technologies d'assistance. Les en-tetes de colonnes doivent etre des `th` avec `scope="col"`.
