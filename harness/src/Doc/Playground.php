<?php

namespace App\Doc;

/**
 * Playground de props whitelistées, réellement exposées par les recettes Twig.
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
        'select' => [
            'value' => ['label' => 'Valeur', 'type' => 'select', 'default' => 'ongoing', 'options' => ['draft', 'ongoing', 'done']],
            'placeholder' => ['label' => 'Placeholder', 'type' => 'text', 'default' => 'Choisir un statut'],
            'required' => ['label' => 'Obligatoire', 'type' => 'checkbox', 'default' => false],
            'disabled' => ['label' => 'Désactivé', 'type' => 'checkbox', 'default' => false],
        ],
        'textarea' => [
            'rows' => ['label' => 'Lignes', 'type' => 'number', 'default' => 4, 'min' => 2, 'max' => 8],
            'placeholder' => ['label' => 'Placeholder', 'type' => 'text', 'default' => 'Notes de mission'],
            'value' => ['label' => 'Contenu', 'type' => 'text', 'default' => ''],
            'disabled' => ['label' => 'Désactivé', 'type' => 'checkbox', 'default' => false],
        ],
        'checkbox' => [
            'label' => ['label' => 'Libellé', 'type' => 'text', 'default' => 'Recevoir les notifications'],
            'checked' => ['label' => 'Coché', 'type' => 'checkbox', 'default' => true],
            'disabled' => ['label' => 'Désactivé', 'type' => 'checkbox', 'default' => false],
        ],
        'switch' => [
            'label' => ['label' => 'Libellé', 'type' => 'text', 'default' => 'Activer les notifications'],
            'checked' => ['label' => 'Activé', 'type' => 'checkbox', 'default' => true],
            'disabled' => ['label' => 'Désactivé', 'type' => 'checkbox', 'default' => false],
        ],
        'alert' => [
            'type' => ['label' => 'Intention', 'type' => 'select', 'default' => 'info', 'options' => ['info', 'success', 'warning', 'error']],
            'title' => ['label' => 'Titre', 'type' => 'text', 'default' => 'Information'],
            'message' => ['label' => 'Message', 'type' => 'text', 'default' => 'Votre demande est en cours de traitement.'],
        ],
        'progress' => [
            'value' => ['label' => 'Progression', 'type' => 'number', 'default' => 45, 'min' => 0, 'max' => 100],
            'label' => ['label' => 'Libellé accessible', 'type' => 'text', 'default' => 'Avancement du dossier'],
            'showValue' => ['label' => 'Afficher le pourcentage', 'type' => 'checkbox', 'default' => true],
        ],
        'table' => [
            'caption' => ['label' => 'Titre du tableau', 'type' => 'text', 'default' => 'Missions récentes'],
            'serial' => ['label' => 'Références mono', 'type' => 'checkbox', 'default' => true],
        ],
    ];

    public function count(): int
    {
        return count(self::SCHEMAS);
    }

    public function supports(string $recipe): bool
    {
        return isset(self::SCHEMAS[$recipe]);
    }

    /** @return array<string, array{label:string,type:string,default:mixed,options?:list<string>,min?:int,max?:int}> */
    public function controls(string $recipe): array
    {
        return self::SCHEMAS[$recipe] ?? [];
    }

    /** @param array<string, mixed> $query
     *  @return array<string, string|bool|int>
     */
    public function normalize(string $recipe, array $query): array
    {
        $values = [];
        foreach ($this->controls($recipe) as $key => $control) {
            $value = $query['p_' . $key] ?? null;
            if ('checkbox' === $control['type']) {
                $values[$key] = null === $value ? $control['default'] : ('1' === $value);
            } elseif ('number' === $control['type']) {
                // L'URL n'est pas une source de confiance : entier décimal borné, ou valeur par défaut.
                $valid = is_string($value) && preg_match('/^[0-9]{1,3}$/D', $value);
                $number = $valid ? (int) $value : null;
                $values[$key] = null !== $number && $number >= $control['min'] && $number <= $control['max']
                    ? $number : $control['default'];
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

    /** @param array<string, string|bool|int> $v */
    public function snippet(string $recipe, array $v): string
    {
        $a = fn (string $key): string => htmlspecialchars((string) ($v[$key] ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        return match ($recipe) {
            'button' => '<twig:ui:Button variant="' . $a('variant') . '" size="' . $a('size') . '"' . ($v['loading'] ? ' loading' : '') . '>' . $a('label') . '</twig:ui:Button>',
            'input' => '<twig:ui:Input id="mission-name" type="' . $a('type') . '" placeholder="' . $a('placeholder') . '"' . ($v['required'] ? ' required' : '') . ($v['disabled'] ? ' disabled' : '') . ' />',
            'badge' => '<twig:ui:Badge tone="' . $a('tone') . '" variant="' . $a('variant') . '">' . $a('label') . '</twig:ui:Badge>',
            'card' => '<twig:ui:Card title="' . $a('title') . '" description="' . $a('description') . '" footer="' . $a('footer') . '">' . "\n  <p>Contenu de démonstration</p>\n" . '</twig:ui:Card>',
            'dialog' => '<twig:ui:Dialog id="demo-dialog" title="' . $a('title') . '" description="' . $a('description') . '" trigger="' . $a('trigger') . '">' . "\n  <p>Exemple de contenu de dialogue.</p>\n" . '</twig:ui:Dialog>',
            'table' => '<twig:ui:Table caption="' . $a('caption') . '"' . ($v['serial'] ? ' serial' : '') . '>' . "\n  <thead><tr><th scope=\"col\">Référence</th><th scope=\"col\">Statut</th></tr></thead>\n  <tbody><tr><td>F-2026-010</td><td>Validé</td></tr></tbody>\n" . '</twig:ui:Table>',
            'select' => '<twig:ui:Select id="mission-status" :options="[{ value: \'draft\', label: \'Brouillon\' }, { value: \'ongoing\', label: \'En cours\' }, { value: \'done\', label: \'Terminé\' }]" value="' . $a('value') . '" placeholder="' . $a('placeholder') . '"' . ($v['required'] ? ' required' : '') . ($v['disabled'] ? ' disabled' : '') . ' />',
            'textarea' => '<twig:ui:Textarea id="mission-notes" :rows="' . $v['rows'] . '" placeholder="' . $a('placeholder') . '" value="' . $a('value') . '"' . ($v['disabled'] ? ' disabled' : '') . ' />',
            'checkbox' => '<twig:ui:Checkbox id="mission-notify" label="' . $a('label') . '"' . ($v['checked'] ? ' checked' : '') . ($v['disabled'] ? ' disabled' : '') . ' />',
            'switch' => '<twig:ui:Switch id="mission-alerts" label="' . $a('label') . '"' . ($v['checked'] ? ' checked' : '') . ($v['disabled'] ? ' disabled' : '') . ' />',
            'alert' => '<twig:ui:Alert type="' . $a('type') . '" title="' . $a('title') . '" message="' . $a('message') . '" />',
            'progress' => '<twig:ui:Progress :value="' . $v['value'] . '" :max="100" label="' . $a('label') . '"' . ($v['showValue'] ? ' showValue' : '') . ' />',
            default => '',
        };
    }
}
