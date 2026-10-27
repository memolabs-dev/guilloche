<?php

declare(strict_types=1);

namespace Guilloche\Signature;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\UX\TwigComponent\Event\PreMountEvent;

/**
 * One-time Symfony integration for copied UX Toolkit recipes.
 *
 * PreMountEvent is used intentionally: for anonymous Twig Components the
 * props are present in the mounting data, before Twig's {% props %} tag
 * consumes them. PreRenderEvent is too late for this binding.
 */
class AutoGeometrySubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [PreMountEvent::class => 'onPreMount'];
    }

    public function onPreMount(PreMountEvent $event): void
    {
        $name = $event->getMetadata()?->getName();
        $data = $event->getData();

        if ($name === 'ui:Rosette' || $name === 'Rosette') {
            error_log('Guilloche SSR before '.json_encode(['keys' => array_keys($data), 'seed' => $data['seed'] ?? null]));
            if (($data['paths'] ?? null) !== null || !isset($data['seed'])) {
                return; // explicit SVG takes priority
            }
            $data['paths'] = RosetteGeometry::paths((string) $data['seed']);
            $event->setData($data);
            error_log('Guilloche SSR after '.json_encode(['keys' => array_keys($event->getData()), 'pathlen' => strlen($data['paths']['main'])]));

            return;
        }

        if ($name === 'ui:Seal' || $name === 'Seal') {
            if (($data['path'] ?? null) !== null || !isset($data['by'])) {
                return;
            }
            $data['path'] = RosetteGeometry::sealPath((string) $data['by']);
            $event->setData($data);
        }
    }
}
