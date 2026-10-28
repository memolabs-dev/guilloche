# Avatar — kit Guilloche

Image ou initiales pour représenter une personne ou une organisation.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `initials` | `null` | Initiales de repli |
| `src` | `null` | URL de l'image |
| `label` | `null` | Nom accessible (`aria-label`) |
| `size` | `md` | `sm`, `md`, `lg` |

## Accessibilite

- Le conteneur porte `rôle="img"` et un `aria-label` ; l'image interne a `alt=""` pour eviter une double annonce.
- Les initiales sont `aria-hidden="true"` : le nom accessible vient de `label`.

## Exemple Twig

Exemple de démonstration utilisé par le harnais Symfony : adapter les identifiants, les valeurs et les liens fictifs au projet consommateur.

```twig
<div class="ds__specimen">
  <twig:ui:Avatar initials="CM" label="Camille Martin" />
  <twig:ui:Avatar initials="AR" label="Atelier Rivage" size="lg" />
</div>
```
