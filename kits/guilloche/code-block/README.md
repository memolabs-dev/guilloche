# CodeBlock — kit Guilloche

Bloc de code avec en-tete optionnel.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `code` | requis | Texte du code, echappe par Twig |
| `label` | `null` | Titre de l'en-tete |
| `language` | `null` | Langage affiche |

`code` est une prop, pas du HTML : aucun contenu n'est interprete. Pour une coloration syntaxique, l'application applique son propre surligneur sur le `code` rendu.
