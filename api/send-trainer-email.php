<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

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

// Email configuration
$to = 'info@copilotenschule.de';
$subject = 'Neue Trainer-Bewerbung von ' . $name . ' - ' . $pathLabel;

// HTML email body
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
    <p style='color: #666; font-size: 12px;'>Hinweis: CV-Upload wird derzeit über eine separate Funktion verarbeitet und wird in einer zukünftigen Version hinzugefügt.</p>
</body>
</html>
";

// Plain text email body
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

// Email headers
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Copilotenschule Trainer-Bewerbung <noreply@copilotenschule.de>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email
$success = mail($to, $subject, $htmlBody, implode("\r\n", $headers));

if ($success) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'E-Mail erfolgreich versendet'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Fehler beim Versenden der E-Mail. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter info@copilotenschule.de'
    ]);
}
?>
