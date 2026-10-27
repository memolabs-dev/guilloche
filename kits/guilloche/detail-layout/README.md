# DetailLayout — kit Guilloche

Liste et detail cote a cote sur grand ecran, empiles sur mobile.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `label` | `null` | Nom accessible du conteneur |

Deux blocs : `list` et `detail`.

## Exemple

```twig
<twig:ui:DetailLayout label="Missions">
  {% block list %}<p>Liste</p>{% endblock %}
  {% block detail %}<p>Detail</p>{% endblock %}
</twig:ui:DetailLayout>
```
