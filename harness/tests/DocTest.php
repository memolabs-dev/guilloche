<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/** La documentation rend le catalogue et une fiche par composant. */
final class DocTest extends WebTestCase
{
    public function testAllRecipesHaveAnActualRenderedPreviewAndReusableCode(): void
    {
        $client = self::createClient();
        $catalog = self::getContainer()->get(\App\Doc\RecipeCatalog::class);
        $recipes = $catalog->all();

        self::assertCount(74, $recipes);
        foreach ($recipes as $recipe) {
            $name = $recipe['name'];
            $crawler = $client->request('GET', '/components/' . $name);
            $this->assertResponseIsSuccessful();
            self::assertGreaterThan(0, $crawler->filter($name === 'theme' ? '.ds__swatches' : '.ds__example-render')->count(),
                'Recette sans aperçu visible : ' . $name);
            $specimen = dirname(__DIR__) . '/templates/doc/specimens/' . $name . '.html.twig';
            if (!is_file($specimen)) {
                self::assertNotEmpty($recipe['code'], 'Recette sans exemple copiable : ' . $name);
                self::assertGreaterThan(0, $crawler->filter('.ds__example-code code')->count(),
                    'Fiche sans extrait Twig rendu : ' . $name);
            }
        }
    }

    public function testDocumentationShowsRealAccessibilityNotesRatherThanClaimingCertification(): void
    {
        $client = self::createClient();
        $client->request('GET', '/components/dialog');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ds__accessibility-notes li');
        $client->request('GET', '/components/card');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('#accessibilite', 'ne sont pas encore documentés');
    }

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

    public function testRosettesHaveTheirDeterministicPathsBeforeJavaScript(): void
    {
        self::createClient()->request('GET', '/components/rosette');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ui-rosette__main[d^="M"]');
        $this->assertSelectorNotExists('.ui-rosette__main[d="M50 6a44 44 0 1 1-.1 0z"]');
        $this->assertSelectorCount(58, '.ui-rosette__main');
        $this->assertSelectorExists('.ui-rosette__counter[d^="M"]');
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

    public function testSealSeparatesValidationFromPendingAndExposesDate(): void
    {
        self::createClient()->request('GET', '/components/seal');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ui-seal--validated[role="img"] svg[aria-hidden="true"]');
        $this->assertSelectorExists('.ui-seal--pending[role="img"][aria-label="En attente de votre validation"]');
        $this->assertSelectorExists('.ui-seal time[datetime="2026-10-12T10:30:00"]');
        $this->assertSelectorExists('[data-ui--seal-fresh-value="true"]');
    }

    public function testWatermarksAreOptInAndDecorative(): void
    {
        $client = self::createClient();
        $client->request('GET', '/components/page-header');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ui-page-header:not(.ui-page-header--watermark)');
        $this->assertSelectorExists('.ui-page-header--watermark > svg.ui-page-header__watermark[aria-hidden="true"][focusable="false"]');
        $this->assertSelectorExists('.ui-page-header--watermark svg path[d="M5 50 Q50 5 95 50 Q50 95 5 50 Z"]');
        $this->assertSelectorExists('.ui-page-header--watermark .ui-page-header__title');

        $client->request('GET', '/components/empty-state');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ui-empty-state:not(.ui-empty-state--watermark)');
        $this->assertSelectorExists('.ui-empty-state--watermark > svg.ui-empty-state__watermark[aria-hidden="true"][focusable="false"]');
        $this->assertSelectorExists('.ui-empty-state--watermark .ui-empty-state__title');
    }


    public function testPhpRenderedRosettesArePreservedAndProgressIsPresentInHtml(): void
    {
        $crawler = self::createClient()->request('GET', '/components/rosette');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorCount(58, '.ui-rosette[data-ui--rosette-ssr-value="true"] .ui-rosette__main');
        $progressStyles = $crawler->filter('.ui-rosette__main[style]')->each(
            static fn ($node): string => (string) $node->attr('style'),
        );
        self::assertContains('stroke-dasharray: 100; stroke-dashoffset: 75', $progressStyles);
        self::assertContains('stroke-dasharray: 100; stroke-dashoffset: 40', $progressStyles);
        $this->assertSelectorNotExists('.ui-rosette[data-ui--rosette-ssr-value="true"] .ui-rosette__main[d="M50 6a44 44 0 1 1-.1 0z"]');
    }

    public function testSealUsesSignerSpecificServerPathInInitialHtml(): void
    {
        self::createClient()->request('GET', '/components/seal');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ui-seal[role="img"] [data-ui--seal-ssr-value="true"] .ui-seal__trace[d^="M"]');
        $this->assertSelectorNotExists('.ui-seal [data-ui--seal-ssr-value="true"] .ui-seal__trace[d="M50 6a44 44 0 1 1-.1 0z"]');
        $this->assertSelectorExists('.ui-seal--pending [data-ui--seal-ssr-value="true"] svg[aria-hidden="true"]');
        $this->assertSelectorExists('.ui-seal time[datetime="2026-10-12T10:30:00"]');
    }

    public function testPreRenderSubscriberComputesDistinctStablePathsFromSeedOnly(): void
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/components/rosette');
        $this->assertResponseIsSuccessful();

        $shapes = $crawler->filter('.ds__planche .ui-rosette__main')->each(
            static fn ($node): string => (string) $node->attr('d')
        );
        self::assertCount(48, $shapes);
        self::assertCount(48, array_unique($shapes));
        self::assertTrue(strlen($shapes[0]) > 1000);
        $client->request('GET', '/components/seal');
        $this->assertResponseIsSuccessful();
        $again = $client->request('GET', '/components/rosette');
        $shapesAgain = $again->filter('.ds__planche .ui-rosette__main')->each(
            static fn ($node): string => (string) $node->attr('d')
        );
        self::assertSame($shapes, $shapesAgain, 'Path geometry must not depend on render instance or request');
    }

    public function testUnknownRecipeIsNotFound(): void
    {
        self::createClient()->request('GET', '/components/inconnu');

        $this->assertResponseStatusCodeSame(404);
    }
}
