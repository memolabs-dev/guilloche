<?php
declare(strict_types=1);

namespace App\Twig;

use Guilloche\Signature\RosetteGeometry;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

// Dans le harnais, on exerce la classe du paquet directement sans l'installer.
// En production : installer le paquet Composer et déclarer une extension Twig.
require_once dirname(__DIR__, 3) . '/src/Signature/RosetteGeometry.php';

final class RosetteExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('guilloche_rosette_paths', [RosetteGeometry::class, 'paths']),
        ];
    }
}
