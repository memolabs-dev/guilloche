<?php

declare(strict_types=1);

namespace Guilloche\Signature;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\UX\TwigComponent\Event\PreRenderEvent;

/**
 * Optional Symfony integration for copy-pasted UX Toolkit recipes.
 *
 * The PreRenderEvent exposes the *input* props that will be available in Twig,
 * unlike PreMountEvent changes that are not forwarded as input props when
 * mounting an anonymous component. This preserves manual overrides and avoids
 * modifying unrelated recipes or controllers.
 */
class AutoGeometrySubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [PreRenderEvent::class => 'onPreRender'];
    }

    public function onPreRender(PreRenderEvent $event): void
    {
        $name = strtolower($event->getMetadata()->getName());
        $variables = $event->getVariables();

        if ($name === 'ui:rosette' || $name === 'rosette') {
            if (($variables['paths'] ?? null) !== null || !isset($variables['seed'])) {
                return; // caller's own SVG geometry is authoritative
            }

            $variables['paths'] = RosetteGeometry::paths((string) $variables['seed']);
            $event->setVariables($variables);

            return;
        }

        if ($name === 'ui:seal' || $name === 'seal') {
            if (($variables['path'] ?? null) !== null || !isset($variables['by'])) {
                return;
            }

            $variables['path'] = RosetteGeometry::sealPath((string) $variables['by']);
            $event->setVariables($variables);
        }
    }
}
