# Alert — kit Guilloche

Message d’état, avec titre et texte optionnels.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `type` | `info` | `info`, `success`, `warning`, `error` |
| `title` | `null` | Titre court |
| `message` | `null` | Texte du message |

Le slot permet d'ajouter du contenu complementaire (lien, bouton).

## Accessibilite

- `type="error"` rend `rôle="alert"`, annonce immediate.
- Les autres types rendent `rôle="status"`, annonce polie.
- L'icone est decorative ; le texte du message porte le sens.

## Exemple

```twig
<twig:ui:Alert type="success" title="Enregistré" message="La mission a été mise à jour." />
```
