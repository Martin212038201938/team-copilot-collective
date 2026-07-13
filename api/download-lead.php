<?php
/**
 * download-lead.php — Lead-Erfassung für Gated-Downloads ("Honeypots")
 *
 * Verhält sich bewusst GENAU WIE der Kontaktformular-Prozess (send-contact-email.php):
 *   1. Speichert E-Mail + Consent-Text + Quelle in die newsletter_subscriptions-Tabelle
 *      (DSGVO-Nachweis: consent_text, ip_address, user_agent, form_submitted_at).
 *   2. Sendet eine Benachrichtigung an Martin (mit Angabe, welcher Leitfaden angefragt wurde).
 *   3. Sendet dem Interessenten eine Double-Opt-In-/Danke-Mail inkl. Download-Link.
 *
 * Unterschied zum Kontaktformular:
 *   - Einziges Pflichtfeld ist die E-Mail (+ Consent-Checkbox). Kein Name/Nachricht nötig.
 *   - Der Zugriff auf das PDF wird NICHT hinter der E-Mail-Bestätigung gesperrt — das Frontend
 *     zeigt den Download sofort nach 'success'. Die Bestätigungsmail dient nur dem sauberen
 *     Double-Opt-In für die weitere Kontaktaufnahme.
 *   - Die Quelle (source) wird pro Leitfaden getaggt, damit Leads zuordenbar sind.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once __DIR__ . '/db-config.php';

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nur POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// JSON einlesen
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Pflichtfelder: E-Mail + Consent
if (empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'E-Mail ist ein Pflichtfeld']);
    exit;
}
if (empty($data['consent']) || $data['consent'] !== true) {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte bestätigen Sie die Einwilligung zur Kontaktaufnahme.']);
    exit;
}

$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

$name       = !empty($data['name']) ? htmlspecialchars($data['name']) : '';
$leadId     = !empty($data['leadId']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($data['leadId'])) : 'guide';
$leadTitle  = !empty($data['leadTitle']) ? htmlspecialchars($data['leadTitle']) : 'Leitfaden';
$sourcePath = !empty($data['sourcePath']) ? htmlspecialchars($data['sourcePath']) : ('/guidelines/' . $leadId);
$downloadUrl = SITE_URL . $sourcePath;

// Quelle pro Leitfaden getaggt → in newsletter_subscriptions.source
$source = 'guide-' . $leadId;

// DSGVO-Consent-Text (muss mit dem Text im Formular übereinstimmen)
$consentText = 'Ich willige ein, dass die Copilotenschule (Yellow Boat) mich per E-Mail zu diesem Thema '
    . 'sowie zu passenden Angeboten kontaktieren darf. Diese Einwilligung kann ich jederzeit '
    . 'formlos widerrufen. [Leitfaden: ' . $leadTitle . ']';

// In Datenbank speichern (identisch zum Kontaktformular)
$confirmationToken = generateToken();
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$saved = saveNewsletterSubscription($email, $name, $source, $confirmationToken, $ipAddress, $userAgent, $consentText);

// ============================================
// 1. Benachrichtigung an Martin
// ============================================
$to = 'martin@yellow-boat.com';
$subject = mailHeaderSafe('Neuer Leitfaden-Download: ' . $leadTitle);

$htmlBody = "
<html>
<head><meta charset='UTF-8'></head>
<body>
    <h2>Neue Leitfaden-Anfrage (Gated Download)</h2>
    <div style='background-color: #e8f4f8; padding: 12px; border-left: 4px solid #0066cc; margin-bottom: 16px;'>
        <p style='margin: 0;'><strong>📄 Leitfaden:</strong> {$leadTitle}</p>
        <p style='margin: 4px 0 0 0;'><strong>Seite:</strong> <a href='{$downloadUrl}' style='color: #0066cc;'>{$downloadUrl}</a></p>
        <p style='margin: 4px 0 0 0;'><strong>Quelle (source-Tag):</strong> {$source}</p>
    </div>
    <p><strong>E-Mail:</strong> {$email}</p>
    " . ($name ? "<p><strong>Name:</strong> {$name}</p>" : "") . "
    <hr>
    <p style='color: #666; font-size: 12px;'>
        Einwilligung erteilt: JA · DB-Status: " . ($saved ? "gespeichert (Bestätigung ausstehend)" : "NICHT gespeichert") . "<br>
        Consent-Text: " . htmlspecialchars($consentText) . "
    </p>
</body>
</html>
";

$textBody = "Neue Leitfaden-Anfrage (Gated Download)\n\n"
    . "Leitfaden: {$leadTitle}\n"
    . "Seite: {$downloadUrl}\n"
    . "Quelle (source-Tag): {$source}\n\n"
    . "E-Mail: {$email}\n"
    . ($name ? "Name: {$name}\n" : "")
    . "\nEinwilligung erteilt: JA · DB-Status: " . ($saved ? "gespeichert" : "NICHT gespeichert") . "\n"
    . "Consent-Text: {$consentText}\n";

$boundary = md5(time() . 'lead-notification');
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
$headers[] = 'From: Copilotenschule Leitfaden <y-b@alwaysdata.net>';
$headers[] = 'Reply-To: ' . mailHeaderSafe($email);
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Originating-IP: ' . mailHeaderSafe($ipAddress);

$body  = "--{$boundary}\r\n";
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
// 2. Danke-/Double-Opt-In-Mail an den Interessenten
// ============================================
$confirmationUrl = SITE_URL . '/api/confirm-subscription.php?token=' . urlencode($confirmationToken);
$customerSubject = 'Ihr Leitfaden von der Copilotenschule';
$greetingName = $name ? (' ' . $name) : '';

$customerHtmlBody = "
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .button { display: inline-block; padding: 12px 24px; background-color: #0066cc; color: white !important; text-decoration: none; border-radius: 4px; margin: 12px 0; }
        .footer { font-size: 12px; color: #666; padding: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'><h1>Copilotenschule</h1></div>
        <div class='content'>
            <h2>Ihr Leitfaden liegt bereit</h2>
            <p>Hallo{$greetingName},</p>
            <p>vielen Dank für Ihr Interesse an <strong>{$leadTitle}</strong>. Sie können den Leitfaden direkt hier öffnen:</p>
            <p style='text-align: center;'>
                <a href='{$downloadUrl}' class='button'>Leitfaden öffnen</a>
            </p>
            <p>Damit wir mit Ihnen zu diesem Thema in Kontakt bleiben dürfen, bestätigen Sie bitte einmal kurz Ihre E-Mail-Adresse:</p>
            <p style='text-align: center;'>
                <a href='{$confirmationUrl}' class='button'>E-Mail-Adresse bestätigen</a>
            </p>
            <p style='font-size: 12px; color: #666;'>
                Falls die Buttons nicht funktionieren, kopieren Sie bitte diesen Link in Ihren Browser:<br>
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

$customerTextBody = "Copilotenschule\n\n"
    . "Hallo{$greetingName},\n\n"
    . "vielen Dank für Ihr Interesse an {$leadTitle}.\n\n"
    . "Leitfaden öffnen: {$downloadUrl}\n\n"
    . "Damit wir mit Ihnen in Kontakt bleiben dürfen, bestätigen Sie bitte Ihre E-Mail-Adresse:\n"
    . "{$confirmationUrl}\n\n"
    . "Datenschutz: Ihre Daten werden gemäß DSGVO verarbeitet. Sie können Ihre Einwilligung jederzeit widerrufen.\n\n"
    . "© " . date('Y') . " Copilotenschule\n";

$boundary2 = md5(time() . 'lead-confirmation');
$customerHeaders = array();
$customerHeaders[] = 'MIME-Version: 1.0';
$customerHeaders[] = 'Content-Type: multipart/alternative; boundary="' . $boundary2 . '"';
$customerHeaders[] = 'From: Copilotenschule <info@copilotenschule.de>';
$customerHeaders[] = 'Reply-To: Copilotenschule <info@copilotenschule.de>';
$customerHeaders[] = 'X-Mailer: PHP/' . phpversion();

$customerBody  = "--{$boundary2}\r\n";
$customerBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
$customerBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$customerBody .= $customerTextBody . "\r\n\r\n";
$customerBody .= "--{$boundary2}\r\n";
$customerBody .= "Content-Type: text/html; charset=UTF-8\r\n";
$customerBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$customerBody .= $customerHtmlBody . "\r\n\r\n";
$customerBody .= "--{$boundary2}--";

$confirmationSent = mail($email, $customerSubject, $customerBody, implode("\r\n", $customerHeaders));

// ============================================
// Antwort — Frontend zeigt den Download bei success sofort
// ============================================
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Anfrage gespeichert',
    'download' => $downloadUrl,
    'saved' => (bool) $saved,
    'warning' => !$confirmationSent ? 'Bestätigungsmail konnte nicht versendet werden' : null,
]);
?>
