<?php

namespace App\Doc;

/** Lit les recettes du kit pour la documentation : manifest, README, props. */
final class RecipeCatalog
{
    public function __construct(private readonly string $kitDir)
    {
    }

    /** @return list<array{name:string, title:string, family:string, version:string, description:string, props:list<string>, code:?string, hasSpecimen:bool}> */
    public function all(): array
    {
        $recipes = [];
        foreach (glob($this->kitDir . '/*/manifest.json') ?: [] as $path) {
            $recipe = $this->read(dirname($path), $path);
            if (null !== $recipe) {
                $recipes[] = $recipe;
            }
        }
        usort($recipes, static fn (array $a, array $b): int => $a['name'] <=> $b['name']);

        return $recipes;
    }

    /** @return array{name:string, title:string, family:string, version:string, description:string, props:list<string>, code:?string, hasSpecimen:bool}|null */
    public function find(string $name): ?array
    {
        foreach ($this->all() as $recipe) {
            if ($recipe['name'] === $name) {
                return $recipe;
            }
        }

        return null;
    }

    /** @return array<string, list<array<string, mixed>>> */
    public function families(): array
    {
        $order = ['fondation', 'primitives', 'signature', 'formulaires', 'navigation', 'donnees', 'patterns', 'avances', 'layout'];
        $families = [];
        foreach ($this->all() as $recipe) {
            $families[$recipe['family']][] = $recipe;
        }
        foreach ($families as &$items) {
            usort($items, static fn (array $a, array $b): int => $a['title'] <=> $b['title']);
        }
        unset($items);

        $sorted = [];
        foreach ($order as $family) {
            if (isset($families[$family])) {
                $sorted[$family] = $families[$family];
                unset($families[$family]);
            }
        }

        return $sorted + $families;
    }

    /** @return array{name:string, title:string, family:string, version:string, description:string, props:list<string>, code:?string, hasSpecimen:bool}|null */
    private function read(string $dir, string $manifestPath): ?array
    {
        $data = json_decode((string) file_get_contents($manifestPath), true);
        if (!is_array($data)) {
            return null;
        }

        $template = glob($dir . '/templates/components/*.html.twig')[0] ?? null;
        $twig = $template ? (string) file_get_contents($template) : '';
        preg_match('/\{%\s*props\s+(.+?)%\}/s', $twig, $match);
        $props = [];
        foreach (explode(',', $match[1] ?? '') as $part) {
            $part = trim($part);
            if ('' !== $part) {
                $props[] = trim(preg_split('/\s*=/', $part)[0]);
            }
        }

        $readme = (string) @file_get_contents($dir . '/README.md');

        return [
            'name' => basename($dir),
            'title' => (string) ($data['name'] ?? basename($dir)),
            'family' => (string) ($data['family'] ?? 'primitives'),
            'version' => (string) ($data['version-added'] ?? ''),
            'description' => $this->firstSentence($readme),
            'props' => $props,
            'propsTable' => $this->propsTable($readme),
            'code' => $this->firstTwigBlock($readme) ?? $this->previewSnippet(basename($dir)),
            'accessibilityNotes' => $this->accessibilityNotes($readme),
            'scss' => $this->scss($dir),
        ];
    }

    /** @return list<array{name:string, default:string, role:string}> */
    private function propsTable(string $readme): array
    {
        $rows = [];
        foreach (explode("\n", $readme) as $line) {
            $line = trim($line);
            if (!str_starts_with($line, '|') || str_contains($line, '---')) {
                continue;
            }
            $cells = array_map('trim', explode('|', trim($line, '|')));
            if (count($cells) < 3 || 'Prop' === $cells[0]) {
                continue;
            }
            $rows[] = [
                'name' => trim($cells[0], '`'),
                'default' => trim($cells[1], '`'),
                'role' => $cells[2],
            ];
        }

        return $rows;
    }

    private function scss(string $dir): string
    {
        $files = glob($dir . '/assets/styles/ui/*.scss') ?: [];

        return $files ? (string) file_get_contents($files[0]) : '';
    }

    private function firstSentence(string $readme): string
    {
        foreach (explode("\n", $readme) as $line) {
            $line = trim($line);
            if ('' !== $line && !str_starts_with($line, '#') && !str_starts_with($line, '|')) {
                $sentence = rtrim(preg_split('/\.\s/', $line)[0] ?? $line, '.');
                if (mb_strlen($sentence) > 160) {
                    $sentence = mb_substr($sentence, 0, 157) . '...';
                }

                return $sentence;
            }
        }

        return '';
    }

    /** Code réutilisable de l'aperçu Twig réel si le README n'a pas d'exemple. */
    private function previewSnippet(string $recipe): ?string
    {
        $path = dirname($this->kitDir, 2) . '/harness/templates/doc/previews/' . $recipe . '.html.twig';

        return is_file($path) ? trim((string) file_get_contents($path)) : null;
    }

    /** @return list<string> Notes propres au composant ; pas de promesse générique d'accessibilité. */
    private function accessibilityNotes(string $readme): array
    {
        if (!preg_match('/^##\s+Accessibilit[ée]\s*$([\s\S]*?)(?=^##\s+|\z)/mu', $readme, $match)) {
            return [];
        }

        $notes = [];
        foreach (explode("\n", trim($match[1])) as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }
            $notes[] = trim(preg_replace('/^[*-]\s+/', '', $line));
        }

        return $notes;
    }

    private function firstTwigBlock(string $readme): ?string
    {
        if (preg_match('/```twig\n(.+?)```/s', $readme, $match)) {
            return trim($match[1]);
        }

        return null;
    }
}
