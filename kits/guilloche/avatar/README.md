# Avatar — kit Guilloche

Image ou initiales pour representer une personne ou une organisation.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `initials` | `null` | Initiales de repli |
| `src` | `null` | URL de l'image |
| `label` | `null` | Nom accessible (`aria-label`) |
| `size` | `md` | `sm`, `md`, `lg` |

## Accessibilite

- Le conteneur porte `role="img"` et un `aria-label` ; l'image interne a `alt=""` pour eviter une double annonce.
- Les initiales sont `aria-hidden="true"` : le nom accessible vient de `label`.
