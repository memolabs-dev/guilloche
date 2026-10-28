<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/** La documentation rend le catalogue et une fiche par composant. */
final class DocTest extends WebTestCase
{
    public function testFormControlsSubmitTheirIdsByDefault(): void
    {
        $client = self::createClient();

        $client->request('GET', '/components/input');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('input#x-mail[name="x-mail"]');
        $this->assertSelectorExists('input#x-text[name="x-text"]');

        $client->request('GET', '/components/select');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('select#x-select[name="x-select"]');

        $client->request('GET', '/components/textarea');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('textarea#s-textarea[name="s-textarea"]');
    }

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
        $this->assertSelectorTextContains('h1', "L'interface de vos outils métier");
        $this->assertSelectorTextContains('.ds__landing-release', 'v2.0.0');
        $this->assertSelectorExists('a[href="/showcase"]');
        $this->assertSelectorCount(3, '.studio__tabs [role="tab"]');
        $this->assertSelectorExists('.studio .ui-card');
        $this->assertSelectorExists('.studio .ui-table');
        $this->assertSelectorCount(3, '.ds__feature-preview .ds__rosette-strip .ui-rosette');
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

    public function testRosetteShowcasePreservesAllShapesAndLabelsEachReference(): void
    {
        $crawler = self::createClient()->request('GET', '/components/rosette');
        $this->assertResponseIsSuccessful();
        self::assertCount(48, $crawler->filter('.ds__planche figure.ds__rosette-reference'));
        self::assertCount(48, $crawler->filter('.ds__planche .ui-rosette'));
        self::assertCount(5, $crawler->filter('.ds__rosette-scale figure'));
        self::assertCount(4, $crawler->filter('.ds__rosette-state'));
        self::assertCount(58, $crawler->filter('.ui-rosette__main'));
        $this->assertSelectorTextContains('.ds__rosette-hero-text h4', 'Chaque dossier');
        $this->assertSelectorTextContains('.ds__rosette-reference:first-child figcaption', '001');
        $this->assertSelectorTextContains('.ds__rosette-reference:last-child figcaption', '048');
        $this->assertSelectorExists('.ds__rosette-hero-mark .ui-rosette[role="img"]');
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


    public function testPlaygroundUsesOnlyRealTwigPropsAndUpdatesServerRenderedOutput(): void
    {
        $client = self::createClient();
        $cases = [
            ['/components/button?p_variant=danger&p_size=lg&p_label=Archiver', '.ds__playground-preview .ui-button--danger.ui-button--lg', 'variant="danger"'],
            ['/components/input?p_type=email&p_required=1&p_placeholder=Courriel', '.ds__playground-preview input#mission-name[type="email"][required]', 'placeholder="Courriel"'],
            ['/components/badge?p_tone=warning&p_variant=outline&p_label=En%20attente', '.ds__playground-preview .ui-badge--warning.ui-badge--outline', 'En attente'],
            ['/components/card?p_title=Dossier%20Atlas&p_description=Relecture', '.ds__playground-preview .ui-card__title', 'title="Dossier Atlas"'],
            ['/components/dialog?p_title=Validation&p_trigger=Confirmer', '.ds__playground-preview dialog#demo-dialog[aria-labelledby="demo-dialog-title"]', 'trigger="Confirmer"'],
            ['/components/table?p_caption=Factures&p_serial=1', '.ds__playground-preview .ui-table--serial-first', 'caption="Factures"'],
        ];

        foreach ($cases as [$url, $selector, $snippet]) {
            $crawler = $client->request('GET', $url);
            $this->assertResponseIsSuccessful();
            self::assertCount(1, $crawler->filter($selector), $url);
            self::assertStringContainsString($snippet, $crawler->filter('[data-playground-code]')->text(), $url);
            self::assertCount(1, $crawler->filter('form[data-playground-form]'), $url);
        }
    }

    public function testPlaygroundFragmentIsServerRenderedWithoutRestOfDocument(): void
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/components/button?p_variant=outline&p_size=sm&fragment=1');
        $this->assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('[data-playground-result]'));
        self::assertCount(1, $crawler->filter('.ds__playground-preview .ui-button--outline.ui-button--sm'));
        self::assertCount(0, $crawler->filter('form[data-playground-form]'));
        self::assertStringNotContainsString('<html', (string) $client->getResponse()->getContent());
        self::assertStringContainsString('size="sm"', $crawler->filter('[data-playground-code]')->text());
    }

    public function testPlaygroundRejectsUnknownVariantsAndEscapesUntrustedText(): void
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/components/button?p_variant=injected&p_label=%3Cscript%3Ealert(1)%3C%2Fscript%3E');
        $this->assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('.ds__playground-preview .ui-button--primary'));
        self::assertCount(0, $crawler->filter('.ds__playground-preview script'));
        self::assertStringNotContainsString('<script>', $crawler->filter('[data-playground-code]')->text());

        $crawler = $client->request('GET', '/components/card?p_title%5B%5D=unexpected');
        $this->assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('.ds__playground-preview .ui-card__title'));
        self::assertStringContainsString('Suivi de mission', $crawler->filter('[data-playground-code]')->text());

        $client->request('GET', '/components/rosette?fragment=1');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorNotExists('[data-playground]');
    }

    public function testSecondWavePlaygroundsRenderActualComponentsAndMatchingTwig(): void
    {
        $client = self::createClient();
        $cases = [
            ['/components/select?p_value=done&p_required=1', 'select#mission-status[required] option[value="done"][selected]', 'value="done"'],
            ['/components/textarea?p_rows=6&p_value=Notes%20du%20dossier', 'textarea#mission-notes[rows="6"]', ':rows="6"'],
            ['/components/checkbox?p_checked=1&p_disabled=0', '.ds__playground-preview input#mission-notify[checked]', 'checked'],
            ['/components/switch?p_checked=0&p_disabled=1', '.ds__playground-preview input#mission-alerts[disabled]:not([checked])', 'disabled'],
            ['/components/alert?p_type=error&p_title=Attention', '.ds__playground-preview .ui-alert--error[role="alert"]', 'type="error"'],
            ['/components/progress?p_value=85&p_showValue=1', '.ds__playground-preview [role="progressbar"][aria-valuenow="85"]', ':value="85"'],
        ];

        foreach ($cases as [$path, $selector, $snippet]) {
            $crawler = $client->request('GET', $path);
            $this->assertResponseIsSuccessful();
            self::assertCount(1, $crawler->filter($selector), $path);
            self::assertStringContainsString($snippet, $crawler->filter('[data-playground-code]')->text(), $path);
        }
    }

    public function testNumericPlaygroundPropsAreBoundedAndCannotInjectTwig(): void
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/components/progress?p_value=99999');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ds__playground-preview [role="progressbar"][aria-valuenow="45"]');
        self::assertStringContainsString(':value="45"', $crawler->filter('[data-playground-code]')->text());

        $crawler = $client->request('GET', '/components/textarea?p_rows%5B%5D=8');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('textarea#mission-notes[rows="4"]');
        self::assertStringContainsString(':rows="4"', $crawler->filter('[data-playground-code]')->text());

        $crawler = $client->request('GET', '/components/alert?p_type=script&p_title=%3Cscript%3Ebad()%3C%2Fscript%3E');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ds__playground-preview .ui-alert--info');
        $this->assertSelectorNotExists('.ds__playground-preview script');
        self::assertStringNotContainsString('<script>', $crawler->filter('[data-playground-code]')->text());
    }

    public function testNavigationPlaygroundsUseActualNativeControlsAndMatchingTwig(): void
    {
        $client = self::createClient();
        $cases = [
            ['/components/accordion?p_summary=Modalit%C3%A9s&p_open=1', '.ds__playground-preview details.ui-accordion[open] summary', 'summary="Modalités"'],
            ['/components/slider?p_value=70&p_step=10', '.ds__playground-preview input.ui-slider__input[value="70"][step="10"]', ':step="10"'],
            ['/components/tabs?p_current=activity&p_label=Dossier', '.ds__playground-preview .ui-tabs__tab[aria-current="page"][href="?section=activity"]', 'label="Dossier"'],
            ['/components/dropdown-menu?p_preset=exports&p_label=Exporter', '.ds__playground-preview details.ui-dropdown .ui-dropdown__item[href="?format=csv"]', 'label="Exporter"'],
        ];

        foreach ($cases as [$path, $selector, $snippet]) {
            $crawler = $client->request('GET', $path);
            $this->assertResponseIsSuccessful();
            self::assertCount(1, $crawler->filter($selector), $path);
            self::assertStringContainsString($snippet, $crawler->filter('[data-playground-code]')->text(), $path);
        }
    }

    public function testNavigationPlaygroundsBoundParametersAndEscapeUserText(): void
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/components/slider?p_value=9999&p_step=0');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.ds__playground-preview input[type="range"][value="50"][step="1"]');
        self::assertStringContainsString(':value="50"', $crawler->filter('[data-playground-code]')->text());

        $crawler = $client->request('GET', '/components/accordion?p_summary=%3Cscript%3Ealert(1)%3C%2Fscript%3E&p_open=1');
        $this->assertResponseIsSuccessful();
        self::assertCount(0, $crawler->filter('.ds__playground-preview script'));
        self::assertStringNotContainsString('<script>', $crawler->filter('[data-playground-code]')->text());

        $crawler = $client->request('GET', '/components/dropdown-menu?p_preset=http%3A%2F%2Fevil.invalid%2F&p_label=Menu');
        $this->assertResponseIsSuccessful();
        self::assertCount(0, $crawler->filter('.ds__playground-preview .ui-dropdown__item[href^="http"]'));
        self::assertCount(1, $crawler->filter('.ds__playground-preview .ui-dropdown__item[href="?view=detail"]'));

        $crawler = $client->request('GET', '/components/tabs?p_current=doesnotexist');
        $this->assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('.ds__playground-preview a[aria-current="page"]'));
        self::assertCount(1, $crawler->filter('.ds__playground-preview a[href="?section=overview"][aria-current="page"]'));
    }

    public function testUnknownRecipeIsNotFound(): void
    {
        self::createClient()->request('GET', '/components/inconnu');

        $this->assertResponseStatusCodeSame(404);
    }
}
