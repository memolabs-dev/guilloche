<?php

namespace App\Tests;

use App\Doc\CompositionCatalog;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class CompositionTest extends WebTestCase
{
    public function testGalleryExposesThreePatterns(): void
    {
        $crawler = self::createClient()->request('GET', '/patterns');
        $this->assertResponseIsSuccessful();
        self::assertCount(3, $crawler->filter('.gp-doc__gallery-card'));
        foreach (['mission-dashboard', 'dossier-detail', 'mission-form'] as $slug) {
            self::assertCount(1, $crawler->filter('a[href="/patterns/' . $slug . '"]'));
        }
        $this->assertSelectorTextContains('h1', 'Des composants');
    }

    public function testPatternsRenderRealTwigAndDisplayExactFiles(): void
    {
        $client = self::createClient();
        $catalog = self::getContainer()->get(CompositionCatalog::class);
        self::assertCount(3, $catalog->all());

        foreach (array_keys($catalog->all()) as $slug) {
            $pattern = $catalog->find($slug);
            self::assertNotNull($pattern);
            $crawler = $client->request('GET', '/patterns/' . $slug);
            $this->assertResponseIsSuccessful();
            self::assertCount(1, $crawler->filter('[data-gp-pattern-render] > section.gp'));
            self::assertGreaterThan(0, $crawler->filter('[data-gp-pattern-render] .ui-card, [data-gp-pattern-render] .ui-form-section')->count());
            self::assertSame($pattern['twig'], $crawler->filter('#gp-pattern-twig code')->text('', false));
            self::assertSame($pattern['css'], $crawler->filter('#gp-pattern-css code')->text('', false));
            self::assertCount(1, $crawler->filter('button[data-gp-copy="gp-pattern-twig"][disabled]'));
        }
    }

    public function testDashboardAndDetailHaveSemanticDataComponents(): void
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/patterns/mission-dashboard');
        $this->assertResponseIsSuccessful();
        self::assertCount(3, $crawler->filter('.gp__stats .ui-stat'));
        self::assertCount(4, $crawler->filter('.gp .ui-table tbody tr'));
        self::assertCount(1, $crawler->filter('.gp .ui-table caption'));
        self::assertCount(3, $crawler->filter('.gp .ui-timeline__item'));

        $crawler = $client->request('GET', '/patterns/dossier-detail');
        $this->assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('.gp .ui-page-header'));
        self::assertCount(1, $crawler->filter('.gp__detail-heading .ui-badge--success'));
        self::assertGreaterThan(3, $crawler->filter('.gp .ui-description-list__row')->count());
        self::assertCount(3, $crawler->filter('.gp .ui-timeline__item'));
        self::assertCount(1, $crawler->filter('.gp .ui-alert'));
    }

    public function testFormUsesNativeValidationWithoutServerSubmission(): void
    {
        $crawler = self::createClient()->request('GET', '/patterns/mission-form');
        $this->assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('form[data-gp-demo-form]:not([action])'));
        self::assertCount(1, $crawler->filter('#gp-title[required][aria-describedby="gp-title-help"]'));
        self::assertCount(1, $crawler->filter('#gp-client[required]'));
        self::assertCount(1, $crawler->filter('#gp-notes[aria-describedby="gp-notes-help"]'));
        self::assertCount(1, $crawler->filter('[data-gp-check][type="button"][disabled]'));
        self::assertCount(0, $crawler->filter('[data-gp-demo-form] [type="submit"]'));
        self::assertCount(1, $crawler->filter('script[src*="pattern-interactions"]'));
        self::assertStringContainsString('reportValidity', $crawler->filter('#gp-pattern-js code')->text());
    }

    public function testUnknownPatternIsNotExposed(): void
    {
        $client = self::createClient();
        $client->request('GET', '/patterns/unknown');
        $this->assertResponseStatusCodeSame(404);
        $client->request('GET', '/patterns/.env');
        $this->assertResponseStatusCodeSame(404);
    }
}
