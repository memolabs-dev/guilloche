<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/** La documentation rend le catalogue et une fiche par composant. */
final class DocTest extends WebTestCase
{
    public function testCatalogueListsRecipes(): void
    {
        self::createClient()->request('GET', '/');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Guilloche');
        $this->assertSelectorExists('article.ds__card');
        $this->assertSelectorExists('a[href="/components/button"]');
        $this->assertSelectorExists('a[href="/components/table"]');
    }

    public function testRecipePageShowsPreviewAndProps(): void
    {
        self::createClient()->request('GET', '/components/button');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Button');
        $this->assertSelectorExists('.ds__preview-render .ui-button');
        $this->assertSelectorExists('.ds__preview-code code');
        $this->assertSelectorExists('.ui-table tbody tr');
    }

    public function testUnknownRecipeIsNotFound(): void
    {
        self::createClient()->request('GET', '/components/inconnu');

        $this->assertResponseStatusCodeSame(404);
    }
}
