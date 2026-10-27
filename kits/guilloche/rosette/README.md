# Rosette — kit Guilloche

Empreinte guillochée d'un objet : une même graine donne toujours le même dessin.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `seed` | requis | Texte qui détermine le dessin (référence, identifiant) |
| `size` | `32` | `16`, `20`, `24`, `32`, `40`, `64` |
| `progress` | `null` | 0 à 100 : le trait principal s'arrête à la valeur |
| `loading` | `false` | Le trait se trace en boucle (1,1 s) |
| `label` | `null` | Nom accessible ; sans label, la rosette est décorative |
| `paths` | `null` | `{ main, counter }` : chemins SVG calculés par PHP et rendus dans le HTML ; JS est alors facultatif |

## Choix technique et source

Le Toolkit copie les fichiers Twig et Stimulus, mais ne fournit pas d'installation automatique de classes PHP dans les composants. La recette fonctionne **sans runtime additionnel** : Stimulus calcule le tracé et le HTML initial affiche une rosette générique. Pour avoir un **rendu SSR déterministe sans aucun JavaScript**, la bibliothèque Composer fournit `Guilloche\Signature\RosetteGeometry::paths($seed)` : l'application calcule les courbes dans son contrôleur Symfony et les transmet dans la prop `paths`. Un exemple de fonction Twig `guilloche_rosette_paths()` est installé dans le harnais de documentation. Le rendu HTML produit contient alors les vrais chemins SVG, même avec JS désactivé.

```php
use Guilloche\Signature\RosetteGeometry;

return $this->render('mission/show.html.twig', [
    'reference' => $reference,
    'rosettePaths' => RosetteGeometry::paths($reference),
]);
```

```twig
<twig:ui:Rosette :seed="reference" :paths="rosettePaths" label="Empreinte de la mission" />
```

Il faut installer `memolabs-dev/guilloche` comme dépendance Composer pour disposer du calculateur côté PHP. La recette Twig elle-même reste autonome : si `paths` est omis, elle conserve son repli client. Le calcul n'emploie aucun compteur statique et reste stable sous FrankenPHP.

Le contrôleur part de la graine, la hache en FNV-1a et en dérive cinq paramètres indépendants (lobes, profondeur, rotation, copies tissées, inclinaison). Aucun compteur statique : l'identifiant vient de la graine et de la taille, donc rien ne survit d'une requête à l'autre sous FrankenPHP.

## Accessibilité

- Sans `label`, la rosette est `aria-hidden` et ne porte aucun sens.
- Avec `label`, elle est `role="img"` et annoncée.
- `prefers-reduced-motion` arrête le tracé de chargement.

## Usages

Une recette ne peut pas en appeler une autre : les compositions ci-dessous
s'écrivent dans l'application, avec les deux recettes installées.

- Avatar d'un objet : la rosette seule, avec un label, ou à côté de `ui:Avatar`.
- Progression : `progress` remplace un anneau.
- Chargement long : `loading`, au-delà d'une seconde.
- État vide : rosette de 64 px au-dessus de `ui:EmptyState`.

```twig
<twig:ui:Rosette seed="AR-2026-042" :size="64" label="Mission AR-2026-042" />
<twig:ui:EmptyState title="Aucune mission" message="Créez une mission pour commencer." />
```
