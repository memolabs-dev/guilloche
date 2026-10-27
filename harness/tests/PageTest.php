<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/** Test de contrat : le harnais rend chaque recette du kit Guilloche. */
final class PageTest extends WebTestCase
{
    public function testHarnessRendersEveryRecipe(): void
    {
        $client = self::createClient();
        $client->request('GET', '/');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Guilloche - harnais de contrat');

        $this->assertSelectorExists('button.ui-button, a.ui-button');
        $this->assertSelectorTextContains('.ui-button__label', 'Action principale');

        $this->assertSelectorExists('svg.ui-icon');
        $this->assertSelectorExists('.ui-badge--success');
        $this->assertSelectorExists('.ui-card__title');
        $this->assertSelectorExists('.ui-separator--labelled');
        $this->assertSelectorExists('.ui-skeleton[aria-hidden="true"]');
        $this->assertSelectorExists('kbd.ui-kbd');
        $this->assertSelectorExists('.ui-alert--success[role="status"]');
        $this->assertSelectorExists('.ui-alert--error[role="alert"]');
        $this->assertSelectorExists('.ui-avatar[role="img"]');
        $this->assertSelectorExists('.ui-progress__track[role="progressbar"]');

        $this->assertSelectorExists('input.ui-input[aria-describedby="demo-input-help"]');
        $this->assertSelectorExists('textarea.ui-textarea');
        $this->assertSelectorExists('select.ui-select');
        $this->assertSelectorExists('input.ui-check__input[type="checkbox"]');
        $this->assertSelectorExists('input.ui-switch__input[role="switch"]');

        $this->assertSelectorExists('nav.ui-breadcrumb[aria-label]');
        $this->assertSelectorExists('.ui-breadcrumb__current[aria-current="page"]');
        $this->assertSelectorExists('nav.ui-pagination .ui-pagination__page.is-current');
        $this->assertSelectorExists('button.ui-toggle[aria-pressed="true"]');
        $this->assertSelectorExists('details.ui-accordion[open] > summary.ui-accordion__summary');
        $this->assertSelectorExists('.ui-tabs__tab.is-current[aria-current="page"]');
        $this->assertSelectorExists('dialog.ui-dialog#demo-dialog');
        $this->assertSelectorExists('dialog.ui-sheet.ui-sheet--right#demo-sheet');
        $this->assertSelectorExists('.ui-tooltip__bubble[role="tooltip"]');

        $this->assertSelectorExists('table.ui-table > caption.ui-table__caption');
        $this->assertSelectorExists('.ui-description-list__row dt');
        $this->assertSelectorExists('.ui-stat__value');
        $this->assertSelectorExists('.ui-empty-state__title');
        $this->assertSelectorExists('fieldset.ui-radio-group > legend');
        $this->assertSelectorExists('input.ui-slider__input[type="range"]');
        $this->assertSelectorExists('ol.ui-timeline > li.ui-timeline__item');
        $this->assertSelectorExists('.ui-toast[role="status"]');
        $this->assertSelectorExists('details.ui-dropdown > summary.ui-dropdown__trigger');
        $this->assertSelectorExists('details.ui-popover > .ui-popover__panel');
    }
}
