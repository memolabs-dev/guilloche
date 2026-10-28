<?php

namespace App\Controller;

use App\Doc\RecipeCatalog;
use App\Doc\Playground;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

/** Documentation du kit : catalogue et fiche par composant. */
final class DocController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(RecipeCatalog $catalog): Response
    {
        return $this->render('doc/index.html.twig', [
            'families' => $catalog->families(),
            'total' => count($catalog->all()),
        ]);
    }

    #[Route('/showcase', name: 'app_showcase')]
    public function showcase(RecipeCatalog $catalog): Response
    {
        return $this->render('doc/showcase.html.twig', [
            'families' => $catalog->families(),
        ]);
    }

    #[Route('/components/{recipe}', name: 'app_recipe')]
    public function recipe(string $recipe, RecipeCatalog $catalog, Playground $playgroundService, Request $request): Response
    {
        $all = $catalog->all();
        $index = null;
        foreach ($all as $position => $entry) {
            if ($entry['name'] === $recipe) {
                $index = $position;
                break;
            }
        }

        if (null === $index) {
            throw $this->createNotFoundException(sprintf('Composant "%s" introuvable.', $recipe));
        }

        $playground = null;
        if ($playgroundService->supports($recipe)) {
            $values = $playgroundService->normalize($recipe, $request->query->all());
            $playground = [
                'controls' => $playgroundService->controls($recipe),
                'values' => $values,
                'source' => $playgroundService->snippet($recipe, $values),
            ];
        }

        if ('1' === $request->query->get('fragment') && null !== $playground) {
            return $this->render('doc/_playground_result.html.twig', [
                'item' => $all[$index],
                'playground' => $playground,
            ]);
        }

        $item = $all[$index];
        $item['hasExamples'] = is_file(sprintf('%s/templates/doc/specimens/%s.html.twig', $this->getParameter('kernel.project_dir'), $item['name']));
        $item['previous'] = $all[$index - 1] ?? null;
        $item['next'] = $all[$index + 1] ?? null;

        return $this->render('doc/recipe.html.twig', [
            'item' => $item,
            'playground' => $playground,
            'families' => $catalog->families(),
        ]);
    }
}
