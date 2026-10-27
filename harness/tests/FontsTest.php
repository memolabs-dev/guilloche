<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/** Chaque police declaree dans le CSS doit etre servie : sinon le site tombe
 *  dans la police systeme sans que rien ne le signale. */
final class FontsTest extends WebTestCase
{
    public function testEveryDeclaredFontLoads(): void
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/');
        $this->assertResponseIsSuccessful();

        $stylesheets = $crawler->filter('link[rel="stylesheet"]')->each(
            static fn ($node): string => (string) $node->attr('href'),
        );
        $this->assertNotEmpty($stylesheets, 'Aucune feuille de style sur la page.');

        $fonts = [];
        foreach ($stylesheets as $href) {
            $client->request('GET', $href);
            $this->assertResponseIsSuccessful(sprintf('Feuille de style %s', $href));

            preg_match_all('/url\((["\']?)([^)"\']+\.woff2)\1\)/', (string) $client->getResponse()->getContent(), $matches);
            foreach ($matches[2] as $url) {
                $fonts[] = str_starts_with($url, '/')
                    ? $url
                    : rtrim(dirname($href), '/') . '/' . $url;
            }
        }

        $this->assertNotEmpty($fonts, 'Aucune police declaree dans le CSS.');

        foreach (array_unique($fonts) as $font) {
            $client->request('GET', $font);
            $this->assertResponseIsSuccessful(sprintf('Police %s introuvable', $font));
        }
    }
}
