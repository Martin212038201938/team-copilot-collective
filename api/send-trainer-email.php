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

// Get FormData input (supports file uploads)
$data = $_POST;

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

// Validate and process CV file upload
$cvFile = null;
$cvFileName = '';
$cvFileContent = '';
$cvMimeType = '';

if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
    $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    $allowedExtensions = ['pdf', 'doc', 'docx'];
    $maxFileSize = 5 * 1024 * 1024; // 5MB

    $uploadedFile = $_FILES['cv'];
    $fileSize = $uploadedFile['size'];
    $fileTmpPath = $uploadedFile['tmp_name'];
    $fileName = $uploadedFile['name'];
    $fileType = $uploadedFile['type'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    // Validate file size
    if ($fileSize > $maxFileSize) {
        http_response_code(400);
        echo json_encode(['error' => 'CV-Datei ist zu groß. Maximale Größe: 5MB']);
        exit;
    }

    // Validate file extension
    if (!in_array($fileExtension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(['error' => 'Ungültiger Dateityp. Nur PDF, DOC und DOCX sind erlaubt.']);
        exit;
    }

    // Validate MIME type
    if (!in_array($fileType, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Ungültiger Dateityp. Nur PDF, DOC und DOCX sind erlaubt.']);
        exit;
    }

    // Read file content for email attachment
    $cvFileContent = file_get_contents($fileTmpPath);
    $cvFileName = basename($fileName);
    $cvMimeType = $fileType;
    $cvFile = [
        'content' => $cvFileContent,
        'name' => $cvFileName,
        'type' => $cvMimeType
    ];
}

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

// DSGVO consent text (must match what's shown in the form)
$consentText = 'Nach dem Absenden erhalten Sie eine E-Mail, in der Sie bestätigen, dass wir Sie künftig per E-Mail kontaktieren dürfen. Ihre Einwilligung können Sie jederzeit widerrufen.';

// Save to database
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$saved = saveNewsletterSubscription($email, $name, 'trainer', $confirmationToken, $ipAddress, $userAgent, $consentText);

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
    " . ($cvFile ? "<p><strong>CV/Lebenslauf:</strong> {$cvFileName} (siehe Anhang)</p>" : "<p><strong>CV/Lebenslauf:</strong> Nicht hochgeladen</p>") . "
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
" . ($cvFile ? "CV/Lebenslauf: {$cvFileName} (siehe Anhang)\n" : "CV/Lebenslauf: Nicht hochgeladen\n") . "
Nachricht/Motivation:
{$message}
";

// Build email with optional CV attachment
$boundary = md5(time() . 'notification');
$boundaryAlt = md5(time() . 'alternative');

$headers = array();
$headers[] = 'MIME-Version: 1.0';

// Use multipart/mixed if CV is attached, otherwise multipart/alternative
if ($cvFile) {
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
} else {
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
}

$headers[] = 'From: Copilotenschule Trainer-Bewerbung <y-b@alwaysdata.net>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Originating-IP: ' . $ipAddress;
$headers[] = 'X-Contact-Form: copilotenschule.de';

// Build email body
if ($cvFile) {
    // With attachment: use multipart/mixed with nested multipart/alternative
    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: multipart/alternative; boundary=\"{$boundaryAlt}\"\r\n\r\n";

    $body .= "--{$boundaryAlt}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $textBody . "\r\n\r\n";

    $body .= "--{$boundaryAlt}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";
    $body .= "--{$boundaryAlt}--\r\n\r\n";

    // Add CV attachment
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$cvFile['type']}; name=\"{$cvFile['name']}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$cvFile['name']}\"\r\n\r\n";
    $body .= chunk_split(base64_encode($cvFile['content'])) . "\r\n";
    $body .= "--{$boundary}--";
} else {
    // Without attachment: simple multipart/alternative
    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $textBody . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";
    $body .= "--{$boundary}--";
}

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
                <a href='{$confirmationUrl}' class='button' style='color: white !important; background-color: #0066cc; padding: 12px 24px; display: inline-block; text-decoration: none; border-radius: 4px;'>E-Mail-Adresse bestätigen</a>
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
