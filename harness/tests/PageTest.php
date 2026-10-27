<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/** Test de contrat : le harnais rend la recette temoin du kit Guilloche. */
final class PageTest extends WebTestCase
{
    public function testHomeRendersButtonRecipe(): void
    {
        $client = self::createClient();
        $client->request('GET', '/');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Guilloche - recette temoin');
        $this->assertSelectorExists('button.ui-button, a.ui-button');
        $this->assertSelectorTextContains('.ui-button__label', 'Valider la mission');
    }
}
