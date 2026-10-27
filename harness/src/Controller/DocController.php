<?php

namespace App\Controller;

use App\Doc\RecipeCatalog;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
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

    #[Route('/components/{recipe}', name: 'app_recipe')]
    public function recipe(string $recipe, RecipeCatalog $catalog): Response
    {
        $item = $catalog->find($recipe) ?? throw $this->createNotFoundException(sprintf('Composant "%s" introuvable.', $recipe));

        return $this->render('doc/recipe.html.twig', [
            'item' => $item,
            'families' => $catalog->families(),
        ]);
    }
}
