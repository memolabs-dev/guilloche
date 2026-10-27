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
    }
}
