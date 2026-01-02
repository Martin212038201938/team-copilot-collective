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

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Email configuration
$to = 'info@copilotenschule.de';
$subject = 'Neue Kontaktanfrage von ' . $name;

// HTML email body
$htmlBody = "
<html>
<head>
    <meta charset='UTF-8'>
</head>
<body>
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>E-Mail:</strong> {$email}</p>
    " . ($company ? "<p><strong>Unternehmen:</strong> {$company}</p>" : "") . "
    " . ($phone ? "<p><strong>Telefon:</strong> {$phone}</p>" : "") . "
    <p><strong>Nachricht:</strong></p>
    <p>" . nl2br($message) . "</p>
</body>
</html>
";

// Plain text email body
$textBody = "
Neue Kontaktanfrage

Name: {$name}
E-Mail: {$email}
" . ($company ? "Unternehmen: {$company}\n" : "") . "
" . ($phone ? "Telefon: {$phone}\n" : "") . "
Nachricht:
{$message}
";

// Email headers
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Copilotenschule Kontaktformular <noreply@copilotenschule.de>';
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
