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
if (empty($data['date']) || !isset($data['totalCostEUR']) || !isset($data['limit'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Fehlende Parameter']);
    exit;
}

$date = htmlspecialchars($data['date']);
$totalCostEUR = floatval($data['totalCostEUR']);
$limit = floatval($data['limit']);
$entriesCount = isset($data['entriesCount']) ? intval($data['entriesCount']) : 0;

// Email configuration
$to = 'martin@yellow-boat.com';
$subject = '⚠️ OpenAI API Kostenlimit erreicht - Copilotenschule';

// Calculate next reset time
$nextResetDate = date('d.m.Y', strtotime($date . ' +1 day'));
$nextResetTime = '09:00 Uhr';

$htmlBody = "
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; background-color: #f9f9f9; border: 2px solid #dc2626; border-top: none; border-radius: 0 0 8px 8px; }
        .warning-box { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 15px 0; }
        .stats { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .stat-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .stat-row:last-child { border-bottom: none; }
        .stat-label { font-weight: bold; }
        .stat-value { color: #dc2626; font-weight: bold; }
        .footer { font-size: 12px; color: #666; padding: 20px; text-align: center; }
        .button { display: inline-block; padding: 12px 24px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>⚠️ Kostenlimit erreicht!</h1>
        </div>
        <div class='content'>
            <div class='warning-box'>
                <h2 style='margin-top: 0; color: #dc2626;'>KILLSWITCH AKTIVIERT</h2>
                <p><strong>Das tägliche Kostenlimit für die OpenAI API wurde überschritten!</strong></p>
                <p>Die API-Nutzung wurde automatisch gesperrt und kann erst morgen ab 9:00 Uhr wieder genutzt werden.</p>
            </div>

            <div class='stats'>
                <h3>Statistik für " . $date . "</h3>
                <div class='stat-row'>
                    <span class='stat-label'>Tageslimit:</span>
                    <span class='stat-value'>€" . number_format($limit, 2, ',', '.') . "</span>
                </div>
                <div class='stat-row'>
                    <span class='stat-label'>Tatsächliche Kosten:</span>
                    <span class='stat-value'>€" . number_format($totalCostEUR, 2, ',', '.') . "</span>
                </div>
                <div class='stat-row'>
                    <span class='stat-label'>Überschreitung:</span>
                    <span class='stat-value'>€" . number_format($totalCostEUR - $limit, 2, ',', '.') . "</span>
                </div>
                <div class='stat-row'>
                    <span class='stat-label'>Anzahl API-Aufrufe:</span>
                    <span>" . $entriesCount . "</span>
                </div>
            </div>

            <h3>Was passiert jetzt?</h3>
            <ul>
                <li>✓ Die OpenAI API ist <strong>automatisch gesperrt</strong></li>
                <li>✓ Keine weiteren Kosten entstehen heute</li>
                <li>✓ Der Content Generator zeigt eine Warnung an</li>
                <li>✓ Reset erfolgt automatisch am <strong>" . $nextResetDate . " um " . $nextResetTime . "</strong></li>
            </ul>

            <h3>Empfohlene Aktionen:</h3>
            <ol>
                <li>Überprüfe die OpenAI Usage Dashboard: <a href='https://platform.openai.com/usage'>platform.openai.com/usage</a></li>
                <li>Prüfe ob ungewöhnlich viele Anfragen gestellt wurden</li>
                <li>Falls nötig: Erhöhe das Tageslimit in <code>src/utils/costTracker.ts</code> (aktuell: €3.00)</li>
            </ol>

            <div style='background-color: #fef9c3; border-left: 4px solid #eab308; padding: 15px; margin: 20px 0;'>
                <strong>💡 Hinweis:</strong> Das Limit kann in der Datei <code>src/utils/costTracker.ts</code> angepasst werden (Konstante: <code>DAILY_LIMIT_EUR</code>).
            </div>

            <p style='text-align: center;'>
                <a href='https://copilotenschule.de/admin' class='button' style='color: white;'>Zum Admin-Dashboard</a>
            </p>
        </div>
        <div class='footer'>
            <p>Diese E-Mail wurde automatisch vom Cost-Tracking-System der Copilotenschule generiert.</p>
            <p>Zeitstempel: " . date('d.m.Y H:i:s') . " Uhr</p>
            <p><a href='https://copilotenschule.de'>copilotenschule.de</a></p>
        </div>
    </div>
</body>
</html>
";

$textBody = "
⚠️ KOSTENLIMIT ERREICHT - KILLSWITCH AKTIVIERT

Das tägliche Kostenlimit für die OpenAI API wurde überschritten!

STATISTIK FÜR " . strtoupper($date) . "
----------------------------------------
Tageslimit:         €" . number_format($limit, 2, ',', '.') . "
Tatsächliche Kosten: €" . number_format($totalCostEUR, 2, ',', '.') . "
Überschreitung:     €" . number_format($totalCostEUR - $limit, 2, ',', '.') . "
Anzahl API-Aufrufe: " . $entriesCount . "

WAS PASSIERT JETZT?
- Die OpenAI API ist automatisch gesperrt
- Keine weiteren Kosten entstehen heute
- Der Content Generator zeigt eine Warnung an
- Reset erfolgt automatisch am " . $nextResetDate . " um " . $nextResetTime . "

EMPFOHLENE AKTIONEN:
1. Überprüfe die OpenAI Usage Dashboard: https://platform.openai.com/usage
2. Prüfe ob ungewöhnlich viele Anfragen gestellt wurden
3. Falls nötig: Erhöhe das Tageslimit in src/utils/costTracker.ts (aktuell: €3.00)

Admin-Dashboard: https://copilotenschule.de/admin

---
Diese E-Mail wurde automatisch vom Cost-Tracking-System generiert.
Zeitstempel: " . date('d.m.Y H:i:s') . " Uhr
";

// Prepare email headers
$boundary = md5(time());
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
$headers[] = 'From: Copilotenschule Cost Alert <noreply@copilotenschule.de>';
$headers[] = 'Reply-To: noreply@copilotenschule.de';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Priority: 1'; // High priority
$headers[] = 'Importance: High';
$headers[] = 'X-Cost-Alert: true';

// Prepare email body
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $textBody . "\r\n\r\n";
$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $htmlBody . "\r\n\r\n";
$body .= "--{$boundary}--";

// Send email
$emailSent = mail($to, $subject, $body, implode("\r\n", $headers));

// Response
if ($emailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Warn-E-Mail erfolgreich versendet',
        'recipient' => $to
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'E-Mail konnte nicht versendet werden'
    ]);
}
?>
