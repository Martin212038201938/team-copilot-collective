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
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$company = !empty($data['company']) ? htmlspecialchars($data['company']) : '';
$phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : '';
$message = htmlspecialchars($data['message']);
$trainingSource = !empty($data['trainingSource']) ? htmlspecialchars($data['trainingSource']) : null;

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
$subject = 'Neue Kontaktanfrage von ' . $name;

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

$htmlBody = "
<html>
<head>
    <meta charset='UTF-8'>
</head>
<body>
    <h2>Neue Kontaktanfrage</h2>
    {$trainingSourceHtml}
    <p><strong>Name:</strong> {$name}</p>
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

$textBody = "
Neue Kontaktanfrage

{$trainingSourceText}Name: {$name}
E-Mail: {$email}
" . ($company ? "Unternehmen: {$company}\n" : "") . "
" . ($phone ? "Telefon: {$phone}\n" : "") . "
Nachricht:
{$message}
";

$boundary = md5(time() . 'notification');
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
$headers[] = 'From: Copilotenschule Kontaktformular <y-b@alwaysdata.net>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Originating-IP: ' . $ipAddress;
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

$confirmationSent = mail($email, $customerSubject, $customerBody, implode("\r\n", $customerHeaders));

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
