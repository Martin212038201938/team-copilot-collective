<?php
/**
 * roi-download.php
 *
 * GET  -> zeigt eine einfache, zustandslose Landingpage mit einem Download-Button.
 *         WICHTIG: Ein einfacher GET darf NIE den "downloaded"-Status setzen oder Dateien
 *         ausliefern — E-Mail-Sicherheitsscanner (Outlook Safe Links / Defender) rufen
 *         Links aus E-Mails automatisch per GET vorab ab. Würde GET bereits als Download
 *         zählen, bekäme der Kunde fälschlich keine Erinnerungen mehr bzw. sofort die
 *         Termin-Einladung, ohne die Datei je gesehen zu haben (gleiches Prinzip wie bei
 *         confirm-subscription.php).
 * POST -> echter Klick auf den Button in dieser Seite. Erst hier: Datei ausliefern,
 *         downloaded_at setzen, Erinnerungen dadurch automatisch stoppen (Cron prüft
 *         downloaded_at IS NULL) und einmalig die Termin-Einladung verschicken.
 */

require_once __DIR__ . '/db-config.php';
require_once __DIR__ . '/roi-config.php';
require_once __DIR__ . '/roi-db.php';
require_once __DIR__ . '/roi-mailer.php';

function roiRenderMessagePage(string $title, string $message, bool $isError = false): void {
    header('Content-Type: text/html; charset=UTF-8');
    $color = $isError ? '#C00000' : '#1F4E79';
    echo "<!DOCTYPE html><html lang='de'><head><meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>{$title} – Copilotenschule</title>
        <style>
            body{font-family:Arial,sans-serif;background:#f9f9f9;color:#1a1a1a;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;}
            .card{max-width:480px;background:#fff;border-radius:8px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,.08);text-align:center;}
            h1{color:{$color};font-size:22px;}
            a.button{display:inline-block;margin-top:16px;padding:14px 28px;background:#0066cc;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;}
        </style>
    </head><body><div class='card'><h1>{$title}</h1><p>{$message}</p></div></body></html>";
}

$token = preg_replace('/[^a-f0-9]/', '', strtolower($_GET['token'] ?? $_POST['token'] ?? ''));
if (strlen($token) !== 64) {
    http_response_code(400);
    roiRenderMessagePage('Ungültiger Link', 'Dieser Download-Link ist ungültig.', true);
    exit;
}

$delivery = roiFindDeliveryByToken($token);
if (!$delivery) {
    http_response_code(404);
    roiRenderMessagePage('Nicht gefunden', 'Zu diesem Link wurde keine Datei gefunden.', true);
    exit;
}

$expired = strtotime($delivery['expires_at']) < time();
$fileMissing = empty($delivery['file_path']) || !file_exists($delivery['file_path']);

if ($expired || $fileMissing) {
    http_response_code(410);
    roiRenderMessagePage(
        'Link abgelaufen',
        'Dieser Download-Link ist nicht mehr gültig (Gültigkeit: ' . ROI_FILE_TTL_DAYS . ' Tage). '
        . 'Bitte erstellen Sie Ihren Business Case auf <a href="' . SITE_URL . '/wissen/copilot-roi-berechnen">copilotenschule.de</a> erneut.',
        true
    );
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: text/html; charset=UTF-8');
    $company = $delivery['company_name'] ? htmlspecialchars($delivery['company_name']) : '';
    echo "<!DOCTYPE html><html lang='de'><head><meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>Ihre PowerPoint ist bereit – Copilotenschule</title>
        <style>
            body{font-family:Arial,sans-serif;background:#f9f9f9;color:#1a1a1a;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;}
            .card{max-width:480px;background:#fff;border-radius:8px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,.08);text-align:center;}
            h1{color:#1F4E79;font-size:22px;}
            button{padding:14px 28px;background:#0066cc;color:#fff;border:none;border-radius:4px;font-size:16px;font-weight:bold;cursor:pointer;margin-top:16px;}
            p.muted{font-size:12px;color:#666;}
        </style>
    </head><body><div class='card'>
        <h1>Ihr Copilot Business Case" . ($company ? " für {$company}" : "") . " ist bereit</h1>
        <p>Klicken Sie unten, um Ihre editierbare PowerPoint herunterzuladen.</p>
        <form method='POST' action=''>
            <input type='hidden' name='token' value='" . htmlspecialchars($token) . "'>
            <button type='submit'>PowerPoint herunterladen</button>
        </form>
        <p class='muted'>Planungsrechnung – kein Wirkungsversprechen.</p>
    </div></body></html>";
    exit;
}

// --- POST: echter Download ---------------------------------------------------

$isFirstDownload = roiMarkDownloaded($token);
if ($isFirstDownload) {
    roiSendBookingInviteEmail($delivery['email'], $delivery['company_name'] ?: null);
}

$filename = 'Copilot-Business-Case-' . preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', (string) $delivery['company_name'])) . '.pptx';
if ($filename === 'Copilot-Business-Case-.pptx') {
    $filename = 'Copilot-Business-Case.pptx';
}

header('Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . filesize($delivery['file_path']));
header('Cache-Control: no-store');
readfile($delivery['file_path']);
exit;
