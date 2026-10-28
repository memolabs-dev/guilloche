<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/** Invariants d'accessibilite verifies sur la page catalogue. */
final class AccessibilityTest extends WebTestCase
{
    public function testEveryComponentExposesAccessibleNames(): void
    {
        $crawler = self::createClient()->request('GET', '/');
        $this->assertResponseIsSuccessful();

        $document = $crawler->getNode(0)->ownerDocument;
        $xpath = new \DOMXPath($document);

        foreach ($xpath->query('//input[not(@type="hidden")] | //select | //textarea') as $node) {
            $id = $node->getAttribute('id');
            $hasLabel = '' !== $id && $xpath->query(sprintf('//label[@for="%s"]', $id))->length > 0;
            $hasAria = $node->hasAttribute('aria-label') || $node->hasAttribute('aria-labelledby');
            $wrapped = null !== $node->parentNode && 'label' === $node->parentNode->nodeName;
            $this->assertTrue($hasLabel || $hasAria || $wrapped, 'Champ sans nom accessible : ' . $node->getNodePath());
        }

        foreach ($xpath->query('//button') as $node) {
            $named = '' !== trim($node->textContent) || $node->hasAttribute('aria-label') || $node->hasAttribute('aria-labelledby');
            $this->assertTrue($named, 'Bouton sans nom accessible : ' . $node->getNodePath());
        }

        foreach ($xpath->query('//*[@role="progressbar"]') as $node) {
            $this->assertNotSame('', $node->getAttribute('aria-label'), 'progressbar sans aria-label');
            $this->assertTrue($node->hasAttribute('aria-valuenow'), 'progressbar sans aria-valuenow');
        }

        foreach ($xpath->query('//*[@role="switch"]') as $node) {
            $id = $node->getAttribute('id');
            $this->assertTrue('' !== $id && $xpath->query(sprintf('//label[@for="%s"]', $id))->length > 0, 'switch sans label');
        }

        foreach ($xpath->query('//svg') as $node) {
            $decorative = 'true' === $node->getAttribute('aria-hidden');
            $named = 'img' === $node->getAttribute('role') && '' !== $node->getAttribute('aria-label');
            $this->assertTrue($decorative || $named, 'SVG sans role ni aria-hidden : ' . $node->getNodePath());
        }

        foreach ($xpath->query('//nav') as $node) {
            $parent = $node->parentNode;
            $named = '' !== $node->getAttribute('aria-label')
                || $node->hasAttribute('aria-labelledby')
                || (null !== $parent && $parent->hasAttribute('aria-label'));
            $this->assertTrue($named, 'nav sans nom accessible : ' . $node->getNodePath());
        }

        foreach ($xpath->query('//dialog') as $node) {
            $named = '' !== $node->getAttribute('aria-label')
                || '' !== $node->getAttribute('id')
                || $xpath->query('.//h2', $node)->length > 0;
            $this->assertTrue($named, 'dialog sans nom accessible : ' . $node->getNodePath());
        }
    }

    public function testNativeDialogsHaveActualAriaLabelledbyTargets(): void
    {
        $client = self::createClient();
        foreach (['dialog', 'sheet', 'confirm-dialog'] as $recipe) {
            $crawler = $client->request('GET', '/components/' . $recipe);
            $this->assertResponseIsSuccessful();

            $dialogs = $crawler->filter('dialog[aria-labelledby]');
            self::assertGreaterThan(0, $dialogs->count(), 'Dialogue sans nom : ' . $recipe);
            foreach ($dialogs as $dialog) {
                $titleId = $dialog->getAttribute('aria-labelledby');
                self::assertNotSame('', $titleId);
                self::assertSame(1, (new \DOMXPath($dialog->ownerDocument))
                    ->query('//*[@id="' . $titleId . '"]')->length,
                    'Le titre doit réellement exister : ' . $titleId);
                $descriptionId = $dialog->getAttribute('aria-describedby');
                if ($descriptionId !== '') {
                    self::assertSame(1, (new \DOMXPath($dialog->ownerDocument))
                        ->query('//*[@id="' . $descriptionId . '"]')->length);
                }
            }
        }
    }

    public function testNavigationPatternsUseNativeLinksNotBrokenAriaWidgets(): void
    {
        $client = self::createClient();
        $selectors = [
            'tabs' => '.ui-tabs [role="tablist"], .ui-tabs [role="tab"]',
            'menubar' => '.ui-menubar [role="menubar"], .ui-menubar [role="menuitem"], .ui-menubar [role="menu"]',
            'dropdown-menu' => '.ui-dropdown [role="menu"], .ui-dropdown [role="menuitem"]',
        ];
        foreach ($selectors as $recipe => $badRoles) {
            $client->request('GET', '/components/' . $recipe);
            $this->assertResponseIsSuccessful();
            $this->assertSelectorNotExists($badRoles);
        }
        $client->request('GET', '/components/tabs');
        $this->assertSelectorExists('.ui-tabs__tab[aria-current="page"]');
        $client->request('GET', '/components/menubar');
        $this->assertSelectorExists('nav.ui-menubar[aria-label] details summary');
    }

}
