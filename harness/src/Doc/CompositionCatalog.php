<?php

namespace App\Doc;

/**
 * Trois compositions statiques, sélectionnées par une liste blanche.
 * La source affichée dans la documentation est le fichier Twig effectivement rendu.
 * Ces compositions appartiennent à l'application de démonstration, pas au kit.
 */
final class CompositionCatalog
{
    private const ITEMS = [
        'mission-dashboard' => [
            'title' => 'Pilotage de missions',
            'eyebrow' => 'TABLEAU DE BORD',
            'summary' => 'Indicateurs, missions et activité récente dans une interface métier.',
            'pieces' => ['Stat', 'Card', 'Table', 'Badge', 'Timeline', 'Button'],
        ],
        'dossier-detail' => [
            'title' => 'Détail de dossier',
            'eyebrow' => 'FICHE MÉTIER',
            'summary' => 'Informations structurées, statut et historique d’un dossier.',
            'pieces' => ['PageHeader', 'Badge', 'Card', 'DescriptionList', 'Timeline', 'Alert'],
        ],
        'mission-form' => [
            'title' => 'Formulaire de mission',
            'eyebrow' => 'SAISIE & VALIDATION',
            'summary' => 'Champs guidés, sections, aide et validation native sans persistance.',
            'pieces' => ['FormSection', 'Field', 'Input', 'Select', 'Textarea', 'Button', 'Alert'],
        ],
    ];

    public function __construct(private readonly string $projectDir)
    {
    }

    /** @return array<string, array<string, mixed>> */
    public function all(): array
    {
        return self::ITEMS;
    }

    /** @return array<string, mixed>|null */
    public function find(string $slug): ?array
    {
        if (!isset(self::ITEMS[$slug])) {
            return null;
        }

        $sourcePath = $this->projectDir . '/templates/doc/patterns/' . $slug . '.html.twig';
        $cssPath = $this->projectDir . '/assets/styles/patterns.scss';
        if (!is_file($sourcePath) || !is_file($cssPath)) {
            throw new \LogicException('Composition documentée sans source.');
        }

        return self::ITEMS[$slug] + [
            'slug' => $slug,
            'twig' => (string) file_get_contents($sourcePath),
            'css' => (string) file_get_contents($cssPath),
            'js' => (string) file_get_contents($this->projectDir . '/assets/pattern-interactions.js'),
        ];
    }
}
