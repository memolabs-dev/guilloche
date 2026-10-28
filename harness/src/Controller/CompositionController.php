<?php

namespace App\Controller;

use App\Doc\CompositionCatalog;
use App\Doc\RecipeCatalog;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CompositionController extends AbstractController
{
    #[Route('/patterns', name: 'app_patterns', methods: ['GET'])]
    public function index(CompositionCatalog $compositions, RecipeCatalog $recipes): Response
    {
        return $this->render('doc/pattern_index.html.twig', [
            'patterns' => $compositions->all(),
            'families' => $recipes->families(),
        ]);
    }

    #[Route('/patterns/{slug}', name: 'app_pattern', methods: ['GET'])]
    public function detail(string $slug, CompositionCatalog $compositions, RecipeCatalog $recipes): Response
    {
        $pattern = $compositions->find($slug);
        if (null === $pattern) {
            throw $this->createNotFoundException('Composition inconnue.');
        }

        return $this->render('doc/pattern_detail.html.twig', [
            'pattern' => $pattern,
            'families' => $recipes->families(),
        ]);
    }
}
