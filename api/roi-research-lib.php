<?php
/**
 * Bausteine der automatischen Unternehmensrecherche.
 *
 * Kostenlogik (bewusst in dieser Reihenfolge):
 *   1. Domain aus der Geschäfts-E-Mail ableiten  -> 0 Kosten, sehr treffsicher
 *   2. Startseite abrufen, Meta-Daten + Logo lesen -> 1 HTTP-Request, 0 Token
 *   3. NUR falls die Meta-Daten zu dünn sind und ROI_RESEARCH_AI_ENABLED aktiv ist:
 *      genau ein kleiner OpenAI-Aufruf auf dem bereits geladenen Text
 *      -> keine Websuche, kein Crawling, wenige hundert Token
 *   4. Ergebnis pro Domain cachen (auch Misserfolge)
 */

/** Freemail- und Provider-Domains, aus denen sich kein Unternehmen ableiten lässt. */
const ROI_GENERIC_EMAIL_DOMAINS = [
    'gmail.com', 'googlemail.com', 'gmx.de', 'gmx.net', 'gmx.at', 'gmx.ch', 'web.de',
    't-online.de', 'outlook.com', 'outlook.de', 'hotmail.com', 'hotmail.de', 'live.com',
    'live.de', 'yahoo.com', 'yahoo.de', 'icloud.com', 'me.com', 'aol.com', 'freenet.de',
    'posteo.de', 'mailbox.org', 'protonmail.com', 'proton.me', 'arcor.de', 'online.de',
];

/**
 * Leitet die Unternehmensdomain aus der E-Mail-Adresse ab.
 * Das spart einen kompletten Suchvorgang: Wer eine Geschäftsadresse angibt, verrät die
 * Domain bereits. Bei Freemail-Adressen wird bewusst NICHT geraten (zu fehleranfällig).
 */
function roiDomainFromEmail(string $email): ?string {
    $parts = explode('@', strtolower(trim($email)));
    if (count($parts) !== 2) return null;
    $domain = trim($parts[1]);
    if ($domain === '' || strpos($domain, '.') === false) return null;
    if (in_array($domain, ROI_GENERIC_EMAIL_DOMAINS, true)) return null;
    if (!preg_match('/^[a-z0-9.-]+\.[a-z]{2,}$/i', $domain)) return null;
    return $domain;
}

/** Startseite laden. Kurzer Timeout, harte Größenbegrenzung, keine Weiterverfolgung ins Endlose. */
function roiFetchHomepage(string $domain): ?array {
    foreach (["https://{$domain}/", "https://www.{$domain}/"] as $url) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; CopilotenschuleBusinessCase/1.0; +https://copilotenschule.de)',
            CURLOPT_ACCEPT_ENCODING => '',
        ]);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $finalUrl = (string) curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch);

        if ($body !== false && $status >= 200 && $status < 300 && strlen($body) > 200) {
            // Nur der Anfang wird gebraucht (Meta-Bereich) – begrenzt Speicher und spätere Token.
            return ['html' => substr($body, 0, 300000), 'url' => $finalUrl];
        }
    }
    return null;
}

/** Meta-Titel und -Beschreibung auslesen — reicht in den meisten Fällen völlig aus. */
function roiExtractMeta(string $html): array {
    $meta = ['title' => null, 'description' => null];

    if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m)) {
        $meta['title'] = trim(html_entity_decode(strip_tags($m[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }
    foreach ([
        '/<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']/is',
        '/<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\']/is',
    ] as $pattern) {
        if (preg_match($pattern, $html, $m)) {
            $meta['description'] = trim(html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
            break;
        }
    }
    return $meta;
}

/**
 * Logo-Kandidaten in absteigender Qualität.
 * Favicons werden bewusst NICHT verwendet: 16–32-Pixel-Icons sehen auf einer Titelfolie
 * schlecht aus. Lieber gar kein Logo — der Kunde merkt dann nicht, dass etwas fehlt.
 */
function roiExtractLogoCandidates(string $html, string $baseUrl): array {
    $candidates = [];

    // 1. schema.org Organization/logo aus JSON-LD – wenn vorhanden, meist das echte Logo.
    if (preg_match_all('/<script[^>]+application\/ld\+json[^>]*>(.*?)<\/script>/is', $html, $blocks)) {
        foreach ($blocks[1] as $json) {
            $data = json_decode(trim($json), true);
            if (!is_array($data)) continue;
            array_walk_recursive($data, function ($value, $key) use (&$candidates) {
                if ($key === 'logo' && is_string($value) && $value !== '') {
                    $candidates[] = $value;
                }
            });
        }
    }

    // 2. Apple-Touch-Icon (mindestens 120px, meist sauber freigestellt).
    if (preg_match('/<link[^>]+rel=["\'][^"\']*apple-touch-icon[^"\']*["\'][^>]+href=["\'](.*?)["\']/is', $html, $m)) {
        $candidates[] = $m[1];
    }

    // 3. og:image als letzte Möglichkeit (oft ein Key-Visual, nicht das Logo – daher zuletzt).
    if (preg_match('/<meta[^>]+property=["\']og:image["\'][^>]+content=["\'](.*?)["\']/is', $html, $m)) {
        $candidates[] = $m[1];
    }

    $resolved = [];
    foreach ($candidates as $candidate) {
        $abs = roiResolveUrl(trim(html_entity_decode($candidate, ENT_QUOTES | ENT_HTML5, 'UTF-8')), $baseUrl);
        if ($abs && !in_array($abs, $resolved, true)) {
            $resolved[] = $abs;
        }
    }
    return $resolved;
}

function roiResolveUrl(string $url, string $baseUrl): ?string {
    if ($url === '') return null;
    if (preg_match('#^https?://#i', $url)) return $url;

    $base = parse_url($baseUrl);
    if (!isset($base['scheme'], $base['host'])) return null;
    if (strpos($url, '//') === 0) return $base['scheme'] . ':' . $url;
    if (strpos($url, '/') === 0) return $base['scheme'] . '://' . $base['host'] . $url;
    return $base['scheme'] . '://' . $base['host'] . '/' . ltrim($url, '/');
}

/**
 * Lädt einen Logo-Kandidaten und gibt ihn als Data-URL zurück.
 * Strenge Prüfung: echtes Bild, PNG/JPEG/GIF (kein SVG – PowerPoint rendert es unzuverlässig),
 * mindestens 64 Pixel Kantenlänge, maximal 1 MB. Alles andere wird verworfen.
 */
function roiFetchLogoDataUrl(array $candidates): ?array {
    foreach ($candidates as $url) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_TIMEOUT => 12,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; CopilotenschuleBusinessCase/1.0; +https://copilotenschule.de)',
        ]);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        if ($body === false || $status < 200 || $status >= 300) continue;
        if (strlen($body) > 1024 * 1024) continue;

        $info = @getimagesizefromstring($body);
        if (!$info) continue;

        [$width, $height, $type] = [$info[0], $info[1], $info[2]];
        if ($width < 64 || $height < 64) continue;

        $mime = image_type_to_mime_type($type);
        if (!in_array($mime, ['image/png', 'image/jpeg', 'image/gif'], true)) continue;

        return [
            'dataUrl' => 'data:' . $mime . ';base64,' . base64_encode($body),
            'sourceUrl' => $url,
        ];
    }
    return null;
}

/**
 * Ergänzende Unterseiten laden. Lohnt sich erst mit dem größeren Zeitbudget: Impressum und
 * "Über uns" beschreiben das Geschäftsfeld meist deutlich präziser als die Startseite und
 * enthalten oft ein besseres Logo. Fehlschläge sind unkritisch und werden übersprungen.
 */
function roiFetchAdditionalPages(string $domain, string $baseUrl): array {
    $paths = ['/ueber-uns', '/unternehmen', '/about', '/impressum'];
    $pages = [];

    foreach ($paths as $path) {
        // Deckel: mehr als zwei Zusatzseiten bringen erfahrungsgemäß keinen Mehrwert.
        if (count($pages) >= 2) break;

        $url = rtrim($baseUrl, '/') . $path;
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 2,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; CopilotenschuleBusinessCase/1.0; +https://copilotenschule.de)',
            CURLOPT_ACCEPT_ENCODING => '',
        ]);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        if ($body !== false && $status >= 200 && $status < 300 && strlen($body) > 500) {
            $pages[] = substr($body, 0, 200000);
        }
    }
    return $pages;
}
