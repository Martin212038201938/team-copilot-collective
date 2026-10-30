<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Include database configuration
require_once __DIR__ . '/db-config.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, E-Mail und Nachricht sind Pflichtfelder']);
    exit;
}

$name = htmlspecialchars($data['name']);
$firstName = !empty($data['firstName']) ? htmlspecialchars($data['firstName']) : '';
$lastName = !empty($data['lastName']) ? htmlspecialchars($data['lastName']) : '';
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$company = !empty($data['company']) ? htmlspecialchars($data['company']) : '';
$phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : '';
$message = htmlspecialchars($data['message']);
$trainingSource = !empty($data['trainingSource']) ? htmlspecialchars($data['trainingSource']) : null;
$customSubject = !empty($data['subject']) ? htmlspecialchars($data['subject']) : null;

// ============================================
// Klick-Attribution (Google Ads / Microsoft Advertising)
// Wird nur ausgewertet, wenn der Nutzer im Browser eingewilligt hat
// (consent === 'granted'). Alle Werte werden von HTML befreit, auf erlaubte
// Zeichen reduziert und in der Länge begrenzt. CR/LF sind nie erlaubt.
// ============================================
function attrClean($value, $maxLen, $disallowedPattern) {
    if (!is_string($value)) {
        return '';
    }
    $value = trim(strip_tags($value));
    $value = preg_replace($disallowedPattern, '', $value);
    if ($value === null) {
        return '';
    }
    return mb_substr($value, 0, $maxLen, 'UTF-8');
}

function buildAttributionLines($data) {
    if (!isset($data['consent']) || $data['consent'] !== 'granted') {
        return array();
    }

    $idPattern   = '/[^A-Za-z0-9_\-]/';
    $textPattern = '/[^\p{L}\p{N} _\-.+:\/%~,|()]/u';
    $pathPattern = '/[^A-Za-z0-9_\-.\/~%]/';
    $hostPattern = '/[^a-z0-9.\-]/';

    $channels = array('google', 'microsoft', 'organisch', 'empfehlung', 'direkt', 'outbound');
    $channel = (isset($data['channel']) && is_string($data['channel']) && in_array($data['channel'], $channels, true))
        ? $data['channel'] : '';

    // Pro Anfrage nur eine Klick-ID, Reihenfolge: gclid, gbraid, wbraid, msclkid
    $clickId = '';
    foreach (array('gclid', 'gbraid', 'wbraid', 'msclkid') as $key) {
        $value = attrClean($data[$key] ?? '', 200, $idPattern);
        if ($value !== '') {
            $clickId = $key . '=' . $value;
            break;
        }
    }

    $landing = attrClean($data['landing_page'] ?? '', 200, $pathPattern);
    if ($landing !== '' && $landing[0] !== '/') {
        $landing = '';
    }

    $fields = array(
        'Kanal'                   => $channel,
        'Klick-ID'                => $clickId,
        'Kampagne'                => attrClean($data['utm_campaign'] ?? '', 200, $textPattern),
        'Anzeigengruppe/Anzeige'  => attrClean($data['utm_content'] ?? '', 200, $textPattern),
        'Suchbegriff'             => attrClean($data['utm_term'] ?? '', 200, $textPattern),
        'Landingpage'             => $landing,
        'Referrer'                => attrClean(is_string($data['referrer'] ?? null) ? strtolower($data['referrer']) : '', 100, $hostPattern),
    );

    $lines = array();
    foreach ($fields as $label => $value) {
        if ($value !== '') {
            $lines[] = $label . ': ' . $value;
        }
    }
    return $lines;
}

$attributionLines = buildAttributionLines($data);

// Selbstauskunft „Wie haben Sie uns gefunden?“ (src/lib/foundVia.ts). Keine Einwilligung nötig,
// nur Werte aus der festen Liste werden übernommen. Steht immer vor den Attributionszeilen.
$foundViaOptions = array(
    'Google-Suche',
    'Bing-Suche',
    'ChatGPT, Copilot oder andere KI',
    'LinkedIn',
    'Empfehlung',
    'Veranstaltung oder Vortrag',
    'Wir kennen uns bereits',
    'Sonstiges',
);
$foundVia = (isset($data['foundVia']) && is_string($data['foundVia']) && in_array($data['foundVia'], $foundViaOptions, true))
    ? $data['foundVia'] : '';
if ($foundVia !== '') {
    array_unshift($attributionLines, 'Gefunden über: ' . $foundVia);
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Generate confirmation token
$confirmationToken = generateToken();

// DSGVO consent text (must match what's shown in the form)
$consentText = 'Nach dem Absenden erhalten Sie eine E-Mail, in der Sie bestätigen, dass wir Sie künftig per E-Mail kontaktieren dürfen. Ihre Einwilligung können Sie jederzeit widerrufen.';

// Save to database
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$saved = saveNewsletterSubscription($email, $name, 'contact', $confirmationToken, $ipAddress, $userAgent, $consentText);

// ============================================
// 1. Send notification email to Martin
// ============================================
$to = 'martin@yellow-boat.com';
// SEC-04: Subject ist ein Header -> CR/LF entfernen
$subject = mailHeaderSafe($customSubject ? $customSubject : 'Neue Kontaktanfrage von ' . $name);

// Erstelle Trainings-Quellen-Info für die interne E-Mail
$trainingSourceHtml = '';
$trainingSourceText = '';
if ($trainingSource) {
    $fullUrl = 'https://copilotenschule.de' . $trainingSource;
    $trainingSourceHtml = "
    <div style='background-color: #e8f4f8; padding: 12px; border-left: 4px solid #0066cc; margin-bottom: 16px;'>
        <p style='margin: 0;'><strong>📍 Anfrage von Trainings-Seite:</strong></p>
        <p style='margin: 4px 0 0 0;'><a href='{$fullUrl}' style='color: #0066cc;'>{$fullUrl}</a></p>
    </div>";
    $trainingSourceText = "Anfrage von Trainings-Seite: {$fullUrl}\n\n";
}

// Bestimme Name-Anzeige (Vorname/Nachname wenn verfügbar, sonst kombinierter Name)
$nameDisplay = ($firstName && $lastName)
    ? "<p><strong>Vorname:</strong> {$firstName}</p><p><strong>Nachname:</strong> {$lastName}</p>"
    : "<p><strong>Name:</strong> {$name}</p>";

$htmlBody = "
<html>
<head>
    <meta charset='UTF-8'>
</head>
<body>
    <h2>Neue Kontaktanfrage</h2>
    {$trainingSourceHtml}
    {$nameDisplay}
    <p><strong>E-Mail:</strong> {$email}</p>
    " . ($company ? "<p><strong>Unternehmen:</strong> {$company}</p>" : "") . "
    " . ($phone ? "<p><strong>Telefon:</strong> {$phone}</p>" : "") . "
    <p><strong>Nachricht:</strong></p>
    <p>" . nl2br($message) . "</p>
    <hr>
    <p style='color: #666; font-size: 12px;'>
        Newsletter-Status: " . ($saved ? "In Datenbank gespeichert (Bestätigung ausstehend)" : "Nicht gespeichert") . "
    </p>
</body>
</html>
";

// Bestimme Name-Anzeige für Text-Version
$nameTextDisplay = ($firstName && $lastName)
    ? "Vorname: {$firstName}\nNachname: {$lastName}"
    : "Name: {$name}";

$textBody = "
Neue Kontaktanfrage

{$trainingSourceText}{$nameTextDisplay}
E-Mail: {$email}
" . ($company ? "Unternehmen: {$company}\n" : "") . "
" . ($phone ? "Telefon: {$phone}\n" : "") . "
Nachricht:
{$message}
";

// Attribution ans Ende des Textkörpers (eine Zeile je Feld, leere Felder entfallen)
if (!empty($attributionLines)) {
    $textBody .= "\n" . implode("\n", $attributionLines) . "\n";
    $htmlBody = str_replace(
        "</body>",
        "<p>" . implode("<br>", array_map('htmlspecialchars', $attributionLines)) . "</p>\n</body>",
        $htmlBody
    );
}

$boundary = md5(time() . 'notification');
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
$headers[] = 'From: Copilotenschule Kontaktformular <y-b@alwaysdata.net>';
// SEC-04: Name/E-Mail sind Header-Werte -> CR/LF entfernen (verhindert Header-Injection)
$headers[] = 'Reply-To: ' . mailHeaderSafe($name) . ' <' . mailHeaderSafe($email) . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Originating-IP: ' . mailHeaderSafe($ipAddress);
$headers[] = 'X-Contact-Form: copilotenschule.de';

$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $textBody . "\r\n\r\n";
$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $htmlBody . "\r\n\r\n";
$body .= "--{$boundary}--";

$notificationSent = mail($to, $subject, $body, implode("\r\n", $headers));

// ============================================
// 2. Send confirmation email to customer
// ============================================
$confirmationUrl = SITE_URL . '/api/confirm-subscription.php?token=' . urlencode($confirmationToken);

$customerSubject = 'Bitte bestätigen Sie Ihre E-Mail-Adresse - Copilotenschule';

$customerHtmlBody = "
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .button { display: inline-block; padding: 12px 24px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        .footer { font-size: 12px; color: #666; padding: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Copilotenschule</h1>
        </div>
        <div class='content'>
            <h2>Vielen Dank für Ihre Anfrage!</h2>
            <p>Hallo {$name},</p>
            <p>wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.</p>
            <p><strong>Bitte bestätigen Sie Ihre E-Mail-Adresse,</strong> damit wir Sie kontaktieren dürfen und Sie künftig Newsletter und Updates von uns erhalten können.</p>
            <p style='text-align: center;'>
                <a href='{$confirmationUrl}' class='button' style='color: white !important; background-color: #0066cc; padding: 12px 24px; display: inline-block; text-decoration: none; border-radius: 4px;'>E-Mail-Adresse bestätigen</a>
            </p>
            <p style='font-size: 12px; color: #666;'>
                Falls der Button nicht funktioniert, kopieren Sie bitte diesen Link in Ihren Browser:<br>
                <a href='{$confirmationUrl}'>{$confirmationUrl}</a>
            </p>
            <hr>
            <p><strong>Datenschutz:</strong> Ihre Daten werden gemäß DSGVO verarbeitet. Sie können Ihre Einwilligung jederzeit widerrufen.</p>
        </div>
        <div class='footer'>
            <p>© " . date('Y') . " Copilotenschule | <a href='https://copilotenschule.de/impressum'>Impressum</a> | <a href='https://copilotenschule.de/datenschutz'>Datenschutz</a></p>
        </div>
    </div>
</body>
</html>
";

$customerTextBody = "
Copilotenschule - E-Mail-Bestätigung

Hallo {$name},

vielen Dank für Ihre Anfrage!

Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.

Bitte bestätigen Sie Ihre E-Mail-Adresse, damit wir Sie kontaktieren dürfen und Sie künftig Newsletter und Updates von uns erhalten können.

Bestätigungslink:
{$confirmationUrl}

Datenschutz: Ihre Daten werden gemäß DSGVO verarbeitet. Sie können Ihre Einwilligung jederzeit widerrufen.

© " . date('Y') . " Copilotenschule
";

$boundary2 = md5(time() . 'confirmation');
$customerHeaders = array();
$customerHeaders[] = 'MIME-Version: 1.0';
$customerHeaders[] = 'Content-Type: multipart/alternative; boundary="' . $boundary2 . '"';
$customerHeaders[] = 'From: Copilotenschule <info@copilotenschule.de>';
$customerHeaders[] = 'Reply-To: Copilotenschule <info@copilotenschule.de>';
$customerHeaders[] = 'X-Mailer: PHP/' . phpversion();

$customerBody = "--{$boundary2}\r\n";
$customerBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
$customerBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$customerBody .= $customerTextBody . "\r\n\r\n";
$customerBody .= "--{$boundary2}\r\n";
$customerBody .= "Content-Type: text/html; charset=UTF-8\r\n";
$customerBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$customerBody .= $customerHtmlBody . "\r\n\r\n";
$customerBody .= "--{$boundary2}--";

// Envelope-Absender auf die From-Domain setzen, damit SPF/DMARC "aligned" sind.
$confirmationSent = mail($email, $customerSubject, $customerBody, implode("\r\n", $customerHeaders), '-finfo@copilotenschule.de');

// Response
if ($notificationSent && $confirmationSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Anfrage gesendet und Bestätigungsmail verschickt'
    ]);
} else {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Anfrage gesendet',
        'warning' => !$confirmationSent ? 'Bestätigungsmail konnte nicht versendet werden' : null
    ]);
}
?>
