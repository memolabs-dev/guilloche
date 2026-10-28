<?php

namespace App\Doc;

/**
 * Playground limité aux props réellement exposées par six recettes Twig.
 * Toute valeur provient d'une liste autorisée ou d'un texte borné, puis est
 * échappée pour la génération de snippets. Aucune évaluation de Twig utilisateur.
 */
final class Playground
{
    private const SCHEMAS = [
        'button' => [
            'variant' => ['label' => 'Variante', 'type' => 'select', 'default' => 'primary', 'options' => ['primary', 'secondary', 'outline', 'ghost', 'link', 'danger', 'danger-soft']],
            'size' => ['label' => 'Taille', 'type' => 'select', 'default' => 'md', 'options' => ['sm', 'md', 'lg']],
            'label' => ['label' => 'Libellé', 'type' => 'text', 'default' => 'Enregistrer'],
            'loading' => ['label' => 'Chargement', 'type' => 'checkbox', 'default' => false],
        ],
        'input' => [
            'type' => ['label' => 'Type', 'type' => 'select', 'default' => 'text', 'options' => ['text', 'email', 'search']],
            'placeholder' => ['label' => 'Placeholder', 'type' => 'text', 'default' => 'Nom de la mission'],
            'required' => ['label' => 'Obligatoire', 'type' => 'checkbox', 'default' => false],
            'disabled' => ['label' => 'Désactivé', 'type' => 'checkbox', 'default' => false],
        ],
        'badge' => [
            'tone' => ['label' => 'Statut', 'type' => 'select', 'default' => 'success', 'options' => ['neutral', 'primary', 'success', 'warning', 'danger', 'info']],
            'variant' => ['label' => 'Apparence', 'type' => 'select', 'default' => 'soft', 'options' => ['soft', 'solid', 'outline']],
            'label' => ['label' => 'Libellé', 'type' => 'text', 'default' => 'Validé'],
        ],
        'card' => [
            'title' => ['label' => 'Titre', 'type' => 'text', 'default' => 'Suivi de mission'],
            'description' => ['label' => 'Description', 'type' => 'text', 'default' => 'Résumé des travaux en cours'],
            'footer' => ['label' => 'Pied de carte', 'type' => 'text', 'default' => 'Mis à jour aujourd’hui'],
        ],
        'dialog' => [
            'title' => ['label' => 'Titre', 'type' => 'text', 'default' => 'Confirmer l’envoi'],
            'description' => ['label' => 'Description', 'type' => 'text', 'default' => 'La mission sera transmise.'],
            'trigger' => ['label' => 'Déclencheur', 'type' => 'text', 'default' => 'Ouvrir le dialogue'],
        ],
        'table' => [
            'caption' => ['label' => 'Titre du tableau', 'type' => 'text', 'default' => 'Missions récentes'],
            'serial' => ['label' => 'Références mono', 'type' => 'checkbox', 'default' => true],
        ],
    ];

    public function supports(string $recipe): bool
    {
        return isset(self::SCHEMAS[$recipe]);
    }

    /** @return array<string, array{label:string,type:string,default:mixed,options?:list<string>}> */
    public function controls(string $recipe): array
    {
        return self::SCHEMAS[$recipe] ?? [];
    }

    /** @param array<string, mixed> $query
     *  @return array<string, string|bool>
     */
    public function normalize(string $recipe, array $query): array
    {
        $values = [];
        foreach ($this->controls($recipe) as $key => $control) {
            $value = $query['p_' . $key] ?? null;
            if ('checkbox' === $control['type']) {
                $values[$key] = null === $value ? $control['default'] : ('1' === $value);
            } elseif (!is_string($value)) {
                $values[$key] = $control['default'];
            } elseif ('select' === $control['type']) {
                $values[$key] = in_array($value, $control['options'], true) ? $value : $control['default'];
            } else {
                $value = preg_replace('/[\x00-\x1F\x7F]/u', '', trim($value)) ?? '';
                $values[$key] = mb_substr($value, 0, 70);
            }
        }

        return $values;
    }

    /** @param array<string, string|bool> $v */
    public function snippet(string $recipe, array $v): string
    {
        $a = fn (string $key): string => htmlspecialchars((string) ($v[$key] ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        return match ($recipe) {
            'button' => '<twig:ui:Button variant="' . $a('variant') . '" size="' . $a('size') . '"' . ($v['loading'] ? ' loading' : '') . '>' . $a('label') . '</twig:ui:Button>',
            'input' => '<twig:ui:Input id="mission-name" type="' . $a('type') . '" placeholder="' . $a('placeholder') . '"' . ($v['required'] ? ' required' : '') . ($v['disabled'] ? ' disabled' : '') . ' />',
            'badge' => '<twig:ui:Badge tone="' . $a('tone') . '" variant="' . $a('variant') . '">' . $a('label') . '</twig:ui:Badge>',
            'card' => '<twig:ui:Card title="' . $a('title') . '" description="' . $a('description') . '" footer="' . $a('footer') . '">' . "\n  <p>Contenu de démonstration</p>\n" . '</twig:ui:Card>',
            'dialog' => '<twig:ui:Dialog id="demo-dialog" title="' . $a('title') . '" description="' . $a('description') . '" trigger="' . $a('trigger') . '">' . "\n  <p>Exemple de contenu de dialogue.</p>\n" . '</twig:ui:Dialog>',
            'table' => '<twig:ui:Table caption="' . $a('caption') . '"' . ($v['serial'] ? ' serial' : '') . '>' . "\n  <thead><tr><th scope="col">Référence</th><th scope="col">Statut</th></tr></thead>\n  <tbody><tr><td>F-2026-010</td><td>Validé</td></tr></tbody>\n" . '</twig:ui:Table>',
            default => '',
        };
    }
}
