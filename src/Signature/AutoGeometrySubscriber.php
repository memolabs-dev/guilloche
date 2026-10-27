<?php

declare(strict_types=1);

namespace Guilloche\Signature;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\UX\TwigComponent\Event\PreRenderEvent;

/**
 * Optional Symfony integration: resolve deterministic SVG before Twig renders
 * copied UX Toolkit recipes, so <twig:ui:Rosette seed="…"/> is fully SSR.
 *
 * Register this class once as a service (kernel.event_subscriber); without it,
 * the original recipes remain standalone and their JS fallback still works.
 */
class AutoGeometrySubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [PreRenderEvent::class => 'onPreRender'];
    }

    public function onPreRender(PreRenderEvent $event): void
    {
        $name = $event->getTemplate();
        $variables = $event->getVariables();

        // Restrict to Guilloche's own two component templates. The exact
        // install location depends on the configured Toolkit subdirectory.
        if (preg_match('~^components/(?:ui/|Ui/)?Rosette\.html\.twig$~', $name)) {
            if (($variables['paths'] ?? null) !== null || !isset($variables['seed'])) {
                return; // explicit caller-provided paths win
            }
            $variables['paths'] = RosetteGeometry::paths((string) $variables['seed']);
            $event->setVariables($variables);

            return;
        }

        if (preg_match('~^components/(?:ui/|Ui/)?Seal\.html\.twig$~', $name)) {
            if (($variables['path'] ?? null) !== null || !isset($variables['by'])) {
                return;
            }
            $variables['path'] = RosetteGeometry::sealPath((string) $variables['by']);
            $event->setVariables($variables);
        }
    }
}
