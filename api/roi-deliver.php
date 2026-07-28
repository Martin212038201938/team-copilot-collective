<?php
/**
 * roi-deliver.php — Annahmestelle für den fertigen, clientseitig erzeugten Business-Case-PPTX.
 *
 * Ablauf (Konzept "echter Honeypot"):
 *   1. Browser berechnet den Business Case und baut die PPTX vollständig lokal mit PptxGenJS
 *      (unverändert wie spezifiziert — Zahlen, Folien, Diagramme entstehen NICHT hier).
 *   2. Erst NACHDEM die Datei fertig ist, lädt der Browser sie hierher hoch (multipart/form-data).
 *   3. Dieser Endpunkt prüft die Datei (echtes OOXML/ZIP, Größe), speichert sie PRIVAT außerhalb
 *      des Web-Docroots und legt eine roi_deliveries-Zeile an.
 *   4. Erst danach — nie vorher — wird die "Ihre PowerPoint ist fertig"-Mail verschickt.
 *
 * Es wird bewusst KEIN eigener Endpunkt für die vier Rechen-Eingaben verwendet: Die Berechnung
 * bleibt vollständig client-seitig und wird nicht dupliziert (siehe src/lib/roi/calculate.ts).
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once __DIR__ . '/db-config.php';
require_once __DIR__ . '/roi-config.php';
require_once __DIR__ . '/roi-db.php';
require_once __DIR__ . '/roi-mailer.php';
require_once __DIR__ . '/roi-rate-limit.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// --- Bot-/Missbrauchsschutz -------------------------------------------------

// Unsichtbares Honeypot-Feld: für Menschen leer, Bots füllen häufig alles aus.
if (!empty($_POST['website'])) {
    http_response_code(200); // Bot nicht wissen lassen, dass er erkannt wurde.
    echo json_encode(['success' => true]);
    exit;
}

// Mindestzeit zwischen Seitenaufruf und Absenden (Client sendet renderedAt in ms epoch).
$renderedAt = isset($_POST['renderedAt']) ? (int) $_POST['renderedAt'] : 0;
$elapsedMs = (microtime(true) * 1000) - $renderedAt;
if ($renderedAt <= 0 || $elapsedMs < 2500) {
    http_response_code(400);
    echo json_encode(['error' => 'Anfrage konnte nicht verarbeitet werden.']);
    exit;
}

// Nur pruefen (zaehlt nicht hoch) — gezaehlt wird erst nach erfolgreicher Lieferung.
if (!roiCheckRateLimit('ip-' . $ipAddress, 10, 3600)) {
    http_response_code(429);
    echo json_encode(['error' => 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.']);
    exit;
}

// --- Eingaben validieren -----------------------------------------------------

$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

if (empty($_POST['consent']) || $_POST['consent'] !== 'true') {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte bestätigen Sie die Einwilligung zur Kontaktaufnahme.']);
    exit;
}

if (!roiCheckRateLimit('email-' . strtolower($email), 10, 86400)) {
    http_response_code(429);
    echo json_encode(['error' => 'Zu viele Anfragen für diese E-Mail-Adresse.']);
    exit;
}

$companyName = !empty($_POST['companyName']) ? trim(substr($_POST['companyName'], 0, 80)) : null;
$users = isset($_POST['users']) ? (int) $_POST['users'] : 0;
if ($users < 1 || $users > 100000) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige Nutzerzahl']);
    exit;
}
$usersBucket = roiUsersBucket($users);

// --- Kontextangaben (kein Einfluss auf Berechnung oder Folienaufbau) -------------
// Alle Auswahlfelder gegen feste Wertelisten pruefen; Freitext hart begrenzen.
$contactName = isset($_POST['contactName']) ? trim(substr((string) $_POST['contactName'], 0, 80)) : '';
$contactRole = isset($_POST['contactRole']) ? trim(substr((string) $_POST['contactRole'], 0, 80)) : '';
if ($contactName === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte geben Sie Ihren Namen an.']);
    exit;
}

$m365Users = isset($_POST['m365Users']) ? (int) $_POST['m365Users'] : 0;
if ($m365Users < 0 || $m365Users > 1000000) {
    $m365Users = 0;
}

$allowedIndustries = ['Industrie', 'Handel', 'Gesundheitswesen', 'Hotellerie', 'Öffentliche Verwaltung', 'Dienstleistung', 'Sonstige'];
$allowedGoals = ['Produktivität steigern', 'Mitarbeitende entlasten', 'Qualität verbessern', 'Innovation fördern', 'KI sicher einführen', 'Agenten vorbereiten'];
$allowedStages = ['Erste Orientierung', 'Business Case erstellen', 'Pilot geplant', 'Pilot läuft', 'Rollout geplant', 'Copilot bereits im Einsatz'];

$industry = isset($_POST['industry']) && in_array($_POST['industry'], $allowedIndustries, true) ? $_POST['industry'] : null;
$adoptionStage = isset($_POST['adoptionStage']) && in_array($_POST['adoptionStage'], $allowedStages, true) ? $_POST['adoptionStage'] : null;

$goals = null;
if (!empty($_POST['goals'])) {
    $submitted = array_filter(explode('|', (string) $_POST['goals']));
    $valid = array_values(array_intersect($submitted, $allowedGoals));
    if ($valid) {
        $goals = substr(implode('|', $valid), 0, 255);
    }
}

if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Datei-Upload fehlgeschlagen']);
    exit;
}
if ($_FILES['file']['size'] <= 0 || $_FILES['file']['size'] > ROI_MAX_UPLOAD_BYTES) {
    http_response_code(413);
    echo json_encode(['error' => 'Datei ist zu groß']);
    exit;
}

// --- Echte OOXML/ZIP-Datei? ---------------------------------------------------

$tmpPath = $_FILES['file']['tmp_name'];
$handle = fopen($tmpPath, 'rb');
$signature = $handle ? fread($handle, 4) : '';
if ($handle) fclose($handle);
// ZIP-Signaturen: "PK\x03\x04" (normal) oder "PK\x05\x06" (leer, sollte hier nicht vorkommen)
if ($signature !== "PK\x03\x04") {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültiges Dateiformat']);
    exit;
}

$zip = new ZipArchive();
$isValidPptx = false;
if ($zip->open($tmpPath) === true) {
    $isValidPptx = $zip->locateName('[Content_Types].xml') !== false
        && $zip->locateName('ppt/presentation.xml') !== false;
    $zip->close();
}
if (!$isValidPptx) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige PowerPoint-Datei']);
    exit;
}

// --- Speichern -----------------------------------------------------------

if (!roiEnsureStorageDir()) {
    http_response_code(500);
    echo json_encode(['error' => 'Speicherfehler']);
    exit;
}

$token = generateToken();
$destination = rtrim(ROI_STORAGE_DIR, '/') . '/' . $token . '.pptx';

if (!move_uploaded_file($tmpPath, $destination)) {
    http_response_code(500);
    echo json_encode(['error' => 'Datei konnte nicht gespeichert werden']);
    exit;
}
@chmod($destination, 0600);

// --- DB-Zeile anlegen (erst jetzt existiert überhaupt eine fertige, geprüfte Datei) -----

$consentText = 'Ich willige ein, dass die Copilotenschule (Yellow Boat) mich per E-Mail zu meinem '
    . 'Copilot-Business-Case sowie zu passenden Angeboten kontaktieren darf. Diese Einwilligung '
    . 'kann ich jederzeit formlos widerrufen.';

$saved = roiCreateDelivery(
    $token,
    $email,
    $companyName,
    $usersBucket,
    $destination,
    (int) $_FILES['file']['size'],
    $ipAddress,
    $consentText,
    ROI_FILE_TTL_DAYS,
    [
        'contactName' => $contactName,
        'contactRole' => $contactRole !== '' ? $contactRole : null,
        'm365Users' => $m365Users > 0 ? $m365Users : null,
        'copilotLicenses' => $users,
        'industry' => $industry,
        'goals' => $goals,
        'adoptionStage' => $adoptionStage,
    ]
);

if (!$saved) {
    @unlink($destination);
    http_response_code(500);
    // Häufigste Ursache: Der Webspace hat keine gültigen DB-Zugangsdaten (weder
    // api/db-config-local.php noch DB_*-Umgebungsvariablen der Site). Dann liefert
    // getDbConnection() null und JEDER Schreibvorgang schlägt still fehl – auch für
    // Newsletter- und Kontaktformular-Leads. Siehe api/ROI-GENERATOR-SETUP.md.
    $dbReachable = getDbConnection() !== null;
    error_log('roi-deliver: Speichern fehlgeschlagen. DB erreichbar: ' . ($dbReachable ? 'ja' : 'NEIN'));
    echo json_encode([
        'error' => $dbReachable
            ? 'Anfrage konnte nicht gespeichert werden.'
            : 'Die Datenbank ist derzeit nicht erreichbar. Bitte versuchen Sie es später erneut.',
        'dbReachable' => $dbReachable,
    ]);
    exit;
}

// Gleiche Double-Opt-in-Tabelle/-Mechanik wie die übrigen Gated Downloads.
$confirmationToken = generateToken();
saveNewsletterSubscription($email, '', 'roi-generator', $confirmationToken, $ipAddress, $_SERVER['HTTP_USER_AGENT'] ?? null, $consentText);

$downloadUrl = SITE_URL . '/api/roi-download.php?token=' . urlencode($token);
$confirmationUrl = SITE_URL . '/api/confirm-subscription.php?token=' . urlencode($confirmationToken);

// Datei ist jetzt WIRKLICH da — erst jetzt darf die Mail raus.
$emailSent = roiSendReadyEmail($email, $downloadUrl, $confirmationUrl, $companyName);
roiSendLeadNotificationToMartin($email, $companyName, $usersBucket, [
    'contactName' => $contactName,
    'contactRole' => $contactRole,
    'm365Users' => $m365Users,
    'copilotLicenses' => $users,
    'industry' => $industry,
    'goals' => $goals,
    'adoptionStage' => $adoptionStage,
]);

// Erst jetzt aufs Kontingent anrechnen: nur tatsaechlich gelieferte Praesentationen zaehlen.
roiCountRateLimit('ip-' . $ipAddress, 10, 3600);
roiCountRateLimit('email-' . strtolower($email), 10, 86400);

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Ihre PowerPoint wurde gespeichert. Sie erhalten in Kürze eine E-Mail mit dem Download-Link.',
    'emailSent' => (bool) $emailSent,
]);
