# Card — kit Guilloche

Surface de contenu avec en-tete et pied optionnels.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `title` | `null` | Titre de la carte |
| `description` | `null` | Texte secondaire sous le titre |
| `footer` | `null` | Pied de carte |

Le corps du composant est le slot.

## Exemple

```twig
<twig:ui:Card title="Facture F-2026-010" description="Accompagnement d'octobre" footer="Échéance 30 novembre">
  <p>Montant : 480,00 €</p>
</twig:ui:Card>
```
