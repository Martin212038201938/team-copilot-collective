<?php
/**
 * roi-company-profile.php — automatische Unternehmensrecherche für die Titelfolie.
 *
 * Wird vom Browser EINMAL aufgerufen, kurz bevor die PowerPoint gebaut wird.
 * Antwortet immer mit HTTP 200 und einem Objekt; findet sich nichts Brauchbares, sind die
 * Felder schlicht leer. Der Generator läuft dann unverändert weiter und zeigt KEINEN
 * Platzhalter – der Nutzer bemerkt nicht, dass etwas fehlt.
 *
 * Datensparsamkeit: An OpenAI gehen nur Unternehmensname, Domain und Website-Text.
 * Niemals die E-Mail-Adresse, niemals Finanzwerte, niemals die Berechnung.
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db-config.php';
require_once __DIR__ . '/roi-config.php';
require_once __DIR__ . '/roi-rate-limit.php';
require_once __DIR__ . '/roi-research-lib.php';
require_once __DIR__ . '/roi-research-ai.php';

const ROI_RESEARCH_CACHE_DAYS = 90;
const ROI_RESEARCH_GLOBAL_DAILY_CAP = 200;

$allowedIndustries = ['Industrie', 'Handel', 'Gesundheitswesen', 'Hotellerie', 'Öffentliche Verwaltung', 'Dienstleistung', 'Sonstige'];

/** Immer 200 – die Recherche ist eine Kür, kein Muss. */
function roiProfileRespond(array $data): void {
    echo json_encode(array_merge(
        ['found' => false, 'industry' => null, 'summary' => null, 'logoDataUrl' => null],
        $data
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    roiProfileRespond([]);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    roiProfileRespond([]);
}

$companyName = trim(substr((string) ($input['companyName'] ?? ''), 0, 80));
$email = (string) ($input['email'] ?? '');
$domain = roiDomainFromEmail($email);

// Ohne Firmendomain wird bewusst nicht geraten – falsche Logos wären schlimmer als keine.
if ($companyName === '' || $domain === null) {
    roiProfileRespond([]);
}

$db = getDbConnection();

// --- 1. Cache: pro Domain nur einmal recherchieren (auch Misserfolge) ----------
if ($db) {
    try {
        $stmt = $db->prepare("SELECT * FROM roi_company_research WHERE domain = ? AND expires_at > CURRENT_TIMESTAMP LIMIT 1");
        $stmt->execute([$domain]);
        if ($cached = $stmt->fetch()) {
            roiProfileRespond([
                'found' => (bool) $cached['found'],
                'industry' => $cached['industry'],
                'summary' => $cached['summary'],
                'logoDataUrl' => $cached['logo_data_url'],
                'cached' => true,
            ]);
        }
    } catch (PDOException $e) {
        error_log('roi-company-profile: Cache-Lesefehler: ' . $e->getMessage());
    }
}

// --- 2. Missbrauchs- und Kostenbremse ------------------------------------------
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!roiCheckRateLimit('research-ip-' . $ipAddress, 10, 3600)
    || !roiCheckRateLimit('research-global', ROI_RESEARCH_GLOBAL_DAILY_CAP, 86400)) {
    roiProfileRespond([]);
}

// --- 3. Kostenlose Stufe: Startseite einmal laden ------------------------------
$page = roiFetchHomepage($domain);
if ($page === null) {
    roiCacheResearch($db, $domain, $companyName, null, null, null, null, false, 'website', null, null);
    roiProfileRespond([]);
}

$meta = roiExtractMeta($page['html']);
$summary = null;
$industry = null;
$source = 'website';
$tokensIn = null;
$tokensOut = null;

// Meta-Description ist meistens schon eine brauchbare Ein-Satz-Beschreibung.
if (!empty($meta['description']) && mb_strlen($meta['description']) >= 40) {
    $summary = mb_substr(trim($meta['description']), 0, 180);
}

// --- 4. Optionale KI-Stufe: nur wenn die kostenlose Stufe zu dünn war ----------
if ($summary === null && roiResearchAiEnabled()) {
    $pageText = roiHtmlToPlainText($page['html']);
    $ai = roiResearchWithAi($companyName, $domain, $pageText, $allowedIndustries);
    if ($ai) {
        $summary = $ai['summary'];
        $industry = $ai['industry'];
        $source = 'website+ai';
        $tokensIn = $ai['tokensIn'];
        $tokensOut = $ai['tokensOut'];
    }
}

// --- 5. Logo (immer ohne KI) ---------------------------------------------------
$logo = roiFetchLogoDataUrl(roiExtractLogoCandidates($page['html'], $page['url']));

$found = ($summary !== null) || ($logo !== null);
roiCacheResearch(
    $db, $domain, $companyName, $industry, $summary,
    $logo['dataUrl'] ?? null, $logo['sourceUrl'] ?? null,
    $found, $source, $tokensIn, $tokensOut
);

roiProfileRespond([
    'found' => $found,
    'industry' => $industry,
    'summary' => $summary,
    'logoDataUrl' => $logo['dataUrl'] ?? null,
]);

/** Ergebnis (auch ein negatives) für ROI_RESEARCH_CACHE_DAYS Tage merken. */
function roiCacheResearch(
    ?PDO $db, string $domain, string $companyName, ?string $industry, ?string $summary,
    ?string $logoDataUrl, ?string $logoSourceUrl, bool $found, string $source,
    ?int $tokensIn, ?int $tokensOut
): void {
    if (!$db) return;
    try {
        $stmt = $db->prepare("
            INSERT INTO roi_company_research
                (domain, company_name, industry, summary, logo_data_url, logo_source_url,
                 found, source, ai_tokens_in, ai_tokens_out, fetched_at, expires_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP,
                    DATE_ADD(CURRENT_TIMESTAMP, INTERVAL " . ROI_RESEARCH_CACHE_DAYS . " DAY))
            ON DUPLICATE KEY UPDATE
                company_name = VALUES(company_name), industry = VALUES(industry),
                summary = VALUES(summary), logo_data_url = VALUES(logo_data_url),
                logo_source_url = VALUES(logo_source_url), found = VALUES(found),
                source = VALUES(source), ai_tokens_in = VALUES(ai_tokens_in),
                ai_tokens_out = VALUES(ai_tokens_out), fetched_at = CURRENT_TIMESTAMP,
                expires_at = VALUES(expires_at)
        ");
        $stmt->execute([
            $domain, $companyName, $industry, $summary, $logoDataUrl, $logoSourceUrl,
            $found ? 1 : 0, $source, $tokensIn, $tokensOut,
        ]);
    } catch (PDOException $e) {
        error_log('roi-company-profile: Cache-Schreibfehler: ' . $e->getMessage());
    }
}
