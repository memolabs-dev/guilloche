# Seal — kit Guilloche

Sépare ce qu'une IA a proposé de ce qu'une personne a validé.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `text` | requis | Mention fournie par l'application |
| `by` | requis | Qui signe ; la rosette en dérive |
| `at` | `null` | Date ISO, rendue en `<time datetime>` |
| `atLabel` | `null` | Texte lisible de la date |
| `label` | `null` | Nom accessible complet |
| `state` | `validated` | `validated` ou `pending` |
| `fresh` | `false` | L'animation se produit une fois par session pour ce signataire et cet événement (`at`) |
| `size` | `20` | Taille du sceau en pixels, typiquement 16 ou 20 |
| `path` | `null` | Chemin SVG du signataire calculé côté PHP, présent dès le HTML initial (JS facultatif) |

## Choix technique

Le Toolkit ne permet pas de livrer une classe PHP (schéma `schema-kit-recipe-v1.json`, `copy-files` limité à `%COMPONENTS_DIR%` et `%CONTROLLERS_DIR%`). La rosette du sceau est calculée par `ui--seal` par défaut. Pour un tracé personnalisé **dès le HTML initial, sans JavaScript**, le package Composer expose `Guilloche\Signature\RosetteGeometry::sealPath($by)`. Passer le résultat dans la prop `path` ; Stimulus le conserve sans le recalculer. L'algorithme est celui de `ui--rosette`, dupliqué pour que la recette reste autonome.

## Utilisation SSR

Dans le contrôleur Symfony (après installation du paquet Composer) :

```php
use Guilloche\Signature\RosetteGeometry;

return $this->render('dossier.html.twig', [
    'signataire' => $user->getId(),
    'sealPath' => RosetteGeometry::sealPath($user->getId()),
]);
```

Dans Twig :

```twig
<twig:ui:Seal text="Validé par vous" :by="signataire" :path="sealPath" />
```

Le harnais de documentation fournit aussi la fonction Twig d'exemple `guilloche_seal_path(by)`. Cette extension n'est pas installée automatiquement par le Symfony UX Toolkit : une application peut calculer le chemin dans son contrôleur et passer la prop directement.

## Accessibilité

- Le sceau est `role="img"` avec un `aria-label` complet.
- L'état est porté par le texte, pas seulement par le filet pointillé.
- `prefers-reduced-motion` supprime le tracé d'apparition.

## Validation du rendu

Le sceau est un indicateur visuel de validation **fourni par l'application**, pas une preuve cryptographique ou une signature électronique. Le serveur reste responsable de l'identité et des droits du valideur.

L'animation n'est ajoutée par Stimulus qu'au premier affichage d'un événement `fresh` : aucune animation sans JavaScript, ni en mode `prefers-reduced-motion`. L'identifiant d'événement est dérivé de `by` et `at` ; fournir une date distincte pour chaque validation.

## Mode Symfony automatique — by seule

Le même `Guilloche\Signature\AutoGeometrySubscriber` que pour la rosette complète le tracé de `Seal` automatiquement d'après la prop `by`. Après **une seule déclaration de service** dans `config/services.yaml`, `<twig:ui:Seal text="Validé" by="42" />` contient déjà les chemins du signataire côté serveur. Une prop `path` explicite conserve la priorité. Sans le service, le fallback de la recette continue de fonctionner.
