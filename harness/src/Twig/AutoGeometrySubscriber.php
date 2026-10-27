<?php

declare(strict_types=1);

namespace App\Twig;

// The harness exercises the actual Composer-library integration rather than
// repeating the algorithm. A consuming app gets this class from Composer.
require_once dirname(__DIR__, 3) . '/src/Signature/RosetteGeometry.php';
require_once dirname(__DIR__, 3) . '/src/Signature/AutoGeometrySubscriber.php';

final class AutoGeometrySubscriber extends \Guilloche\Signature\AutoGeometrySubscriber
{
}
