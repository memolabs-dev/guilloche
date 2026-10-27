<?php

declare(strict_types=1);

namespace Guilloche\Signature;

/**
 * Algorithme PHP équivalent au contrôleur Stimulus ui--rosette.
 *
 * Sans compteur statique ni état global : un même identifiant donne toujours
 * les mêmes chemins, y compris dans un worker FrankenPHP de longue durée.
 * Coordonnées dans un SVG viewBox="0 0 100 100".
 */
final class RosetteGeometry
{
    /** @return array{main: string, counter: string} */
    public static function paths(string $seed): array
    {
        $parameters = self::parameters($seed !== '' ? $seed : 'guilloche');

        return [
            'main' => self::trace($parameters),
            'counter' => self::trace([
                ...$parameters,
                'petals' => $parameters['petals'] + 2,
                'phase' => $parameters['phase'] + pi() / $parameters['copies'],
            ]),
        ];
    }

    /** @return array{petals: int, copies: int, phase: float, skew: float} */
    private static function parameters(string $seed): array
    {
        $hash = self::hash($seed);

        return [
            'petals' => 3 + ($hash % 3) * 2,
            'copies' => 1 + (($hash >> 4) % 2),
            'phase' => (($hash >> 8) % 360) * (pi() / 180),
            'skew' => 0.8 + (($hash >> 13) % 40) / 100,
        ];
    }

    /**
     * FNV-1a 32 bits identique à Math.imul sur les points de code Unicode
     * parcourus par for...of en JavaScript.
     */
    private static function hash(string $seed): int
    {
        $hash = 2166136261;
        $characters = preg_split('//u', $seed, -1, PREG_SPLIT_NO_EMPTY);
        if ($characters === false) {
            $characters = str_split($seed); // entrées malformées, déterministes
        }
        foreach ($characters as $character) {
            $bytes = array_values(unpack('C*', $character) ?: []);
            $first = $bytes[0];
            $codepoint = match (count($bytes)) {
                1 => $first,
                2 => (($first & 0x1f) << 6) | ($bytes[1] & 0x3f),
                3 => (($first & 0x0f) << 12) | (($bytes[1] & 0x3f) << 6) | ($bytes[2] & 0x3f),
                4 => (($first & 0x07) << 18) | (($bytes[1] & 0x3f) << 12) | (($bytes[2] & 0x3f) << 6) | ($bytes[3] & 0x3f),
                default => $first,
            };
            $hash = (($hash ^ $codepoint) * 16777619) & 0xffffffff;
        }

        return $hash;
    }

    /** @param array{petals:int,copies:int,phase:float,skew:float} $p */
    private static function trace(array $p): string
    {
        $points = [];
        $steps = 360;
        for ($copy = 0; $copy < $p['copies']; ++$copy) {
            $rotation = $p['phase'] + ($copy * 2 * pi()) / $p['copies'];
            for ($step = 0; $step <= $steps; ++$step) {
                $t = ($step / $steps) * 2 * pi();
                $radius = 45 * cos($p['petals'] * $t);
                $x = $radius * cos($t + $rotation) * $p['skew'];
                $y = $radius * sin($t + $rotation);
                $points[] = ($step === 0 ? 'M' : 'L')
                    . number_format(50 + $x, 2, '.', '')
                    . ' ' . number_format(50 + $y, 2, '.', '');
            }
        }

        return implode(' ', $points);
    }
}
