# Slider — kit Guilloche

Valeur sur un intervalle, avec `input type="range"` natif.

## Props

| Prop | Défaut | Rôle |
|------|--------|------|
| `id` | requis | Identifiant, relie le label |
| `name` | `null` | Nom du champ (defaut : `id`) |
| `min` | `0` | Borne basse |
| `max` | `100` | Borne haute |
| `step` | `1` | Pas |
| `value` | `50` | Valeur initiale |
| `label` | `null` | Libelle |

## Accessibilite

Le controle est natif : fleches du clavier, Home et End fonctionnent. Le libelle est relie par `for`.
