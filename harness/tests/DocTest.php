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
        $this->assertSelectorExists('.ds__example-render .ui-button');
        $this->assertSelectorExists('.ds__example-code code, .ds__example-render');
        $this->assertSelectorExists('.ui-table tbody tr');
    }

    public function testRosetteHasAccessibleNameOnWrapperNotInnerSvg(): void
    {
        self::createClient()->request('GET', '/components/rosette');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ui-rosette[role="img"][aria-label="Terminé"] svg[aria-hidden="true"]');
        $this->assertSelectorExists('.ui-rosette[aria-hidden="true"] svg[aria-hidden="true"]');
    }

    public function testSerialTableStylesTheFirstColumnOnly(): void
    {
        self::createClient()->request('GET', '/components/table');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ui-table.ui-table--serial-first tbody tr:first-child td:first-child');
        $this->assertSelectorExists('.ui-table.ui-table--serial-first tbody tr:first-child td.ui-table__num');
    }

    public function testDescriptionListSerialValueKeepsPlainDateText(): void
    {
        self::createClient()->request('GET', '/components/description-list');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('.ui-description-list__value .ui-serial', 'N° F-2026-010');
        $this->assertSelectorNotExists('.ui-description-list__row:last-child code');
    }

    public function testUnknownRecipeIsNotFound(): void
    {
        self::createClient()->request('GET', '/components/inconnu');

        $this->assertResponseStatusCodeSame(404);
    }
}
