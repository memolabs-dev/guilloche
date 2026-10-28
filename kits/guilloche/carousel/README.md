# Carousel — kit Guilloche

Galerie defilante, avec `scroll-snap` natif.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | requis | Nom accessible du carrousel |
| `previousLabel` | requis | Nom accessible du bouton precedent |
| `nextLabel` | requis | Nom accessible du bouton suivant |

Le contenu vient du slot ; chaque enfant direct occupe une page.

## Contrôleur

`assets/controllers/carousel_controller.js`, identifiant `ui--carousel`. Les boutons font defiler d'une page. Le viewport est focusable et defilable au clavier sans JavaScript.

## Exemple Twig

Exemple de démonstration utilisé par le harnais Symfony : adapter les identifiants, les valeurs et les liens fictifs au projet consommateur.

```twig
<twig:ui:Carousel label="Pieces jointes" previousLabel="Précédent" nextLabel="Suivant">
  <div style="padding:16px;border-radius:8px;background:var(--ui-muted)">Premiere piece</div>
  <div style="padding:16px;border-radius:8px;background:var(--ui-muted)">Deuxieme piece</div>
</twig:ui:Carousel>
```
