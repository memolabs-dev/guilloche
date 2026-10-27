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

        $this->assertSelectorExists('header.ui-page-header .ui-page-header__title');
        $this->assertSelectorExists('form.ui-filter-bar[role="search"]');
        $this->assertSelectorExists('section.ui-form-section .ui-form-section__title');
        $this->assertSelectorExists('.ui-detail-layout__list');
        $this->assertSelectorExists('.ui-detail-layout__detail');
        $this->assertSelectorExists('aside.ui-sidebar .ui-sidebar__link.is-current[aria-current="page"]');
        $this->assertSelectorExists('dialog.ui-confirm-dialog#demo-confirm');
        $this->assertSelectorExists('.ui-data-region[data-state="loading"] .ui-data-region__loading');

        $this->assertSelectorExists('input.ui-date-picker__input[type="date"]');
        $this->assertSelectorExists('input.ui-file-upload__input[type="file"]');
        $this->assertSelectorExists('.ui-combobox__input[role="combobox"]');
        $this->assertSelectorExists('dialog.ui-command__dialog');
        $this->assertSelectorExists('.ui-carousel__viewport');
        $this->assertSelectorExists('svg.ui-chart__svg[role="img"]');

        $this->assertSelectorExists('.ui-button-group[role="group"]');
        $this->assertSelectorExists('.ui-toggle-group[role="group"]');
        $this->assertSelectorExists('.ui-spinner[role="status"][aria-label]');
        $this->assertSelectorExists('details.ui-collapsible[open]');
        $this->assertSelectorExists('ul.ui-list-group > li.ui-list-group__item');
        $this->assertSelectorExists('.ui-aspect-ratio[style*="--ui-aspect"]');
        $this->assertSelectorExists('.ui-input-group__input[aria-describedby="demo-group-help"]');
        $this->assertSelectorExists('.ui-code-block__pre > code');
        $this->assertSelectorExists('mark.ui-marker');

        $this->assertSelectorExists('header.ui-navbar nav[aria-label]');
        $this->assertSelectorExists('nav.ui-navigation-menu details.ui-navigation-menu__group');
        $this->assertSelectorExists('nav.ui-menubar [role="menubar"]');
        $this->assertSelectorExists('.ui-hover-card__panel[id]');
        $this->assertSelectorExists('.ui-scroll-area[role="region"][tabindex="0"]');
        $this->assertSelectorExists('.ui-direction[dir="rtl"]');
        $this->assertSelectorExists('ul.ui-context-menu__list[role="menu"]');
        $this->assertSelectorExists('.ui-resizable__handle[role="separator"]');

        $this->assertSelectorExists('.ui-calendar__grid .ui-calendar__day.is-selected[aria-current="date"]');
        $this->assertSelectorExists('.ui-input-otp__input[maxlength="1"]');

        $this->assertSelectorExists('.ui-container--md');
        $this->assertSelectorExists('.ui-grid[style*="--ui-grid-columns: 3"]');
        $this->assertSelectorExists('.ui-stack--horizontal.ui-stack--align-center');
        $this->assertSelectorExists('.ui-floating-label__input[placeholder=" "]');
        $this->assertSelectorExists('nav.ui-scrollspy a[data-section="section-a"]');
    }
}
