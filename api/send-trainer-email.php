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
if (empty($data['name']) || empty($data['email']) || empty($data['path']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, E-Mail, Interessensgebiet und Nachricht sind Pflichtfelder']);
    exit;
}

$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : '';
$path = htmlspecialchars($data['path']);
$linkedinUrl = !empty($data['linkedinUrl']) ? htmlspecialchars($data['linkedinUrl']) : '';
$websiteUrl = !empty($data['websiteUrl']) ? htmlspecialchars($data['websiteUrl']) : '';
$message = htmlspecialchars($data['message']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Path labels
$pathLabels = array(
    'praktiker' => 'KI-Praktiker ohne Trainer-Erfahrung',
    'trainer' => 'Erfahrener KI-Trainer (Freelance)',
    'festanstellung' => 'Festanstellung als KI-Trainer'
);
$pathLabel = isset($pathLabels[$path]) ? $pathLabels[$path] : $path;

// Generate confirmation token
$confirmationToken = generateToken();

// Save to database
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$saved = saveNewsletterSubscription($email, $name, 'trainer', $confirmationToken, $ipAddress, $userAgent);

// ============================================
// 1. Send notification email to Martin
// ============================================
$to = 'martin@yellow-boat.com';
$subject = 'Neue Trainer-Bewerbung von ' . $name . ' - ' . $pathLabel;

$htmlBody = "
<html>
<head>
    <meta charset='UTF-8'>
</head>
<body>
    <h2>Neue Trainer-Bewerbung</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>E-Mail:</strong> {$email}</p>
    " . ($phone ? "<p><strong>Telefon:</strong> {$phone}</p>" : "") . "
    <p><strong>Interessiert an:</strong> {$pathLabel}</p>
    " . ($linkedinUrl ? "<p><strong>LinkedIn:</strong> <a href='{$linkedinUrl}'>{$linkedinUrl}</a></p>" : "") . "
    " . ($websiteUrl ? "<p><strong>Webseite:</strong> <a href='{$websiteUrl}'>{$websiteUrl}</a></p>" : "") . "
    <p><strong>Nachricht/Motivation:</strong></p>
    <p>" . nl2br($message) . "</p>
    <hr>
    <p style='color: #666; font-size: 12px;'>
        Newsletter-Status: " . ($saved ? "In Datenbank gespeichert (Bestätigung ausstehend)" : "Nicht gespeichert") . "
    </p>
</body>
</html>
";

$textBody = "
Neue Trainer-Bewerbung

Name: {$name}
E-Mail: {$email}
" . ($phone ? "Telefon: {$phone}\n" : "") . "
Interessiert an: {$pathLabel}
" . ($linkedinUrl ? "LinkedIn: {$linkedinUrl}\n" : "") . "
" . ($websiteUrl ? "Webseite: {$websiteUrl}\n" : "") . "
Nachricht/Motivation:
{$message}
";

$boundary = md5(time() . 'notification');
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
$headers[] = 'From: Copilotenschule Trainer-Bewerbung <y-b@alwaysdata.net>';
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
// 2. Send confirmation email to applicant
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
            <h2>Vielen Dank für deine Bewerbung!</h2>
            <p>Hallo {$name},</p>
            <p>wir haben deine Bewerbung als Trainer erhalten und werden uns in Kürze bei dir melden.</p>
            <p><strong>Bitte bestätige deine E-Mail-Adresse,</strong> damit wir dich kontaktieren dürfen und du künftig Newsletter und Updates von uns erhalten kannst.</p>
            <p style='text-align: center;'>
                <a href='{$confirmationUrl}' class='button'>E-Mail-Adresse bestätigen</a>
            </p>
            <p style='font-size: 12px; color: #666;'>
                Falls der Button nicht funktioniert, kopiere bitte diesen Link in deinen Browser:<br>
                <a href='{$confirmationUrl}'>{$confirmationUrl}</a>
            </p>
            <hr>
            <p><strong>Datenschutz:</strong> Deine Daten werden gemäß DSGVO verarbeitet. Du kannst deine Einwilligung jederzeit widerrufen.</p>
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

vielen Dank für deine Bewerbung als Trainer!

Wir haben deine Bewerbung erhalten und werden uns in Kürze bei dir melden.

Bitte bestätige deine E-Mail-Adresse, damit wir dich kontaktieren dürfen und du künftig Newsletter und Updates von uns erhalten kannst.

Bestätigungslink:
{$confirmationUrl}

Datenschutz: Deine Daten werden gemäß DSGVO verarbeitet. Du kannst deine Einwilligung jederzeit widerrufen.

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
        'message' => 'Bewerbung gesendet und Bestätigungsmail verschickt'
    ]);
} else {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Bewerbung gesendet',
        'warning' => !$confirmationSent ? 'Bestätigungsmail konnte nicht versendet werden' : null
    ]);
}
?>
