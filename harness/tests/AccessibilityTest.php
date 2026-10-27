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
}
