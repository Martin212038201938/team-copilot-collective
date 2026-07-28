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
// Welche der beiden Dateien ist gemeint? Standard ist die Praesentation.
$type = ($_GET['type'] ?? $_POST['type'] ?? 'pptx') === 'xlsx' ? 'xlsx' : 'pptx';
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
$hasXlsx = !empty($delivery['file_path_xlsx']) && file_exists($delivery['file_path_xlsx']);
$requestedPath = $type === 'xlsx' ? ($delivery['file_path_xlsx'] ?? '') : ($delivery['file_path'] ?? '');
$fileMissing = empty($requestedPath) || !file_exists($requestedPath);

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
    $safeToken = htmlspecialchars($token);

    $pptxForm = "<form method='POST' action='' style='display:inline'>"
        . "<input type='hidden' name='token' value='{$safeToken}'>"
        . "<input type='hidden' name='type' value='pptx'>"
        . "<button type='submit'>PowerPoint herunterladen</button>"
        . "</form>";

    $xlsxForm = $hasXlsx
        ? "<form method='POST' action='' style='display:inline'>"
            . "<input type='hidden' name='token' value='{$safeToken}'>"
            . "<input type='hidden' name='type' value='xlsx'>"
            . "<button type='submit' class='secondary'>Excel-Berechnung herunterladen</button>"
            . "</form>"
        : "";

    $headline = "Ihr Copilot Business Case" . ($company ? " für {$company}" : "") . " ist bereit";

    echo "<!DOCTYPE html><html lang='de'><head><meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>Ihre Dateien sind bereit – Copilotenschule</title>
        <style>
            body{font-family:Arial,sans-serif;background:#F3F5F8;color:#0A2E5C;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;}
            .card{max-width:520px;background:#fff;padding:40px;box-shadow:0 2px 8px rgba(0,0,0,.08);text-align:center;}
            h1{color:#0A2E5C;font-size:22px;}
            button{padding:14px 28px;background:#0A2E5C;color:#fff;border:none;font-size:16px;font-weight:bold;cursor:pointer;margin:16px 6px 0;}
            button.secondary{background:#fff;color:#0A2E5C;border:1px solid #0A2E5C;}
            p.muted{font-size:12px;color:#8A97A8;margin-top:24px;}
        </style>
    </head><body><div class='card'>
        <h1>{$headline}</h1>
        <p>Die Präsentation ist editierbar, die Excel enthält die vollständige Berechnung.</p>
        {$pptxForm}
        {$xlsxForm}
        <p class='muted'>Planungsrechnung – kein Wirkungsversprechen.</p>
    </div></body></html>";
    exit;
}

// --- POST: echter Download ---------------------------------------------------

// roiMarkDownloaded() ist idempotent: true nur beim allerersten echten Download.
$isFirstDownload = roiMarkDownloaded($token);
if ($isFirstDownload) {
    $inviteSent = roiSendBookingInviteEmail($delivery['email'], $delivery['company_name'] ?: null);
    if ($inviteSent) {
        roiMarkBookingInviteSent($token);
    } else {
        // Nicht schlimm: Der stündliche Cron (roi-reminder-cron.php) versucht es erneut,
        // solange booking_invite_sent_at leer ist. Der Download darf davon nie abhängen.
        error_log('roi-download: Termin-Einladung konnte nicht versendet werden, Cron versucht es erneut.');
    }
}

$slug = preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', (string) $delivery['company_name']));
$slug = $slug !== '' ? '-' . $slug : '';

if ($type === 'xlsx') {
    $filename = 'Copilot-ROI-Rechner' . $slug . '.xlsx';
    $mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
} else {
    $filename = 'Copilot-Business-Case' . $slug . '.pptx';
    $mime = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
}

header('Content-Type: ' . $mime);
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . filesize($requestedPath));
header('Cache-Control: no-store');
readfile($requestedPath);
exit;
