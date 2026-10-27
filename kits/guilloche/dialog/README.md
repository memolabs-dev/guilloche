# Dialog — kit Guilloche

Boite modale native (`<dialog>`).

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant du dialogue |
| `title` | requis | Titre |
| `trigger` | `null` | Libelle du bouton d'ouverture rendu avec le dialogue |
| `description` | `null` | Texte secondaire sous le titre |
| `closeLabel` | `Fermer` | Nom accessible du bouton de fermeture |

## Controleur

`assets/controllers/dialog_controller.js`, identifiant `ui--dialog`. Il appelle `showModal()` et `close()`. Echap, le focus piege et le retour du focus sont natifs au navigateur.

## Accessibilite

- Le dialogue natif capture le focus et le rend a l'element declencheur a la fermeture.
- Le bouton de fermeture porte `aria-label` avec la prop `closeLabel` (defaut « Fermer »), surchargeable par l'application.
- Le titre est un `h2` ; adapter le niveau si la page en contient deja.

## Exemple

```twig
<twig:ui:Dialog id="confirm" title="Confirmer l'envoi" trigger="Envoyer">
  <p>Cette action est definitive.</p>
</twig:ui:Dialog>
```
