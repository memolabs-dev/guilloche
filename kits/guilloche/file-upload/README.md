# FileUpload — kit Guilloche

Depot de fichier, avec l'input natif comme source.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant, relie le label |
| `name` | `files` | Nom du champ |
| `label` | requis | Libelle de la zone |
| `hint` | `null` | Precision sous le libellé |
| `accept` | `null` | Types acceptes |
| `multiple` | `false` | Sélection multiple |

## Contrôleur

`assets/controllers/file_upload_controller.js`, identifiant `ui--file-upload`. Il affiche les noms des fichiers choisis dans une liste `aria-live="polite"`. Sans JavaScript, l'input natif et ses noms restent disponibles.
