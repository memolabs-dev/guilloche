# RadioGroup — kit Guilloche

Choix unique parmi plusieurs options.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Prefixe des identifiants |
| `name` | requis | Nom du groupe |
| `label` | `null` | Legende du `fieldset` |
| `options` | `[]` | Options `{ value, label }` |
| `value` | `null` | Valeur selectionnee |
| `disabled` | `false` | Desactive tout le groupe |

## Accessibilite

`fieldset` et `legend` nomment le groupe. Chaque input est un radio natif : les fleches du clavier passent d'une option a l'autre.
