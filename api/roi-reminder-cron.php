<?php
/**
 * roi-reminder-cron.php
 *
 * Als AlwaysData "Scheduled Task" einrichten, z.B. stündlich:
 *   php /www/copilotenschule.de/api/roi-reminder-cron.php
 *
 * Sendet:
 *  - Erinnerung 1, wenn seit der "fertig"-Mail ROI_REMINDER_1_HOURS (24h) vergangen sind
 *    und die Datei noch nicht abgeholt wurde.
 *  - Erinnerung 2 (letzte), wenn seit der "fertig"-Mail ROI_REMINDER_2_HOURS (48h) vergangen
 *    sind und die Datei noch immer nicht abgeholt wurde.
 *  - Keine Erinnerung mehr, sobald downloaded_at gesetzt ist (dann übernimmt roi-download.php
 *    die einmalige Termin-Einladung).
 *
 * Räumt außerdem abgelaufene Dateien (> ROI_FILE_TTL_DAYS) von der Platte auf.
 *
 * Nur über CLI/Cron ausführbar, nicht öffentlich über den Browser aufrufbar.
 */

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}

require_once __DIR__ . '/db-config.php';
require_once __DIR__ . '/roi-config.php';
require_once __DIR__ . '/roi-db.php';
require_once __DIR__ . '/roi-mailer.php';

/**
 * Erst prüfen, ob überhaupt eine Datenbankverbindung steht.
 *
 * Ohne diese Zeile sieht ein Lauf ohne Datenbank exakt so aus wie ein Lauf ohne fällige
 * Erinnerungen: überall Null, exit code 0. Genau das hat die Fehlersuche am 30.07.2026
 * unnötig lang gemacht. Die Zugangsdaten kommen entweder aus api/db-config-local.php oder
 * aus Umgebungsvariablen — letztere stehen einem Cron-Prozess nicht automatisch zur
 * Verfügung, auch wenn die Website sie hat.
 */
$dbOk = getDbConnection() !== null;
if (!$dbOk) {
    echo "roi-reminder-cron: FEHLER — keine Datenbankverbindung. Erinnerungen wurden NICHT geprüft.\n";
    exit(1);
}

$sentReminder1 = 0;
$sentReminder2 = 0;
$purged = 0;

foreach (roiFindDueForReminder1(ROI_REMINDER_1_HOURS) as $delivery) {
    $downloadUrl = SITE_URL . '/api/roi-download.php?token=' . urlencode($delivery['download_token']);
    if (roiSendReminderEmail($delivery['email'], $downloadUrl, $delivery['company_name'] ?: null, 1)) {
        roiMarkReminderSent($delivery['download_token'], 1);
        $sentReminder1++;
    }
}

foreach (roiFindDueForReminder2(ROI_REMINDER_2_HOURS) as $delivery) {
    $downloadUrl = SITE_URL . '/api/roi-download.php?token=' . urlencode($delivery['download_token']);
    if (roiSendReminderEmail($delivery['email'], $downloadUrl, $delivery['company_name'] ?: null, 2)) {
        roiMarkReminderSent($delivery['download_token'], 2);
        $sentReminder2++;
    }
}

// Nachzügler: Datei wurde abgeholt, aber die Termin-Einladung ging beim Download nicht raus.
$sentInvites = 0;
foreach (roiFindDueForBookingInvite() as $delivery) {
    if (roiSendBookingInviteEmail($delivery['email'], $delivery['company_name'] ?: null)) {
        roiMarkBookingInviteSent($delivery['download_token']);
        $sentInvites++;
    }
}

foreach (roiFindExpiredNotYetPurged() as $delivery) {
    foreach ([$delivery['file_path'] ?? '', $delivery['file_path_xlsx'] ?? ''] as $path) {
        if (!empty($path) && file_exists($path)) {
            @unlink($path);
        }
    }
    roiClearFilePath($delivery['download_token']);
    $purged++;
}

// Offene Fälle mitzählen: So ist im Log unterscheidbar, ob nichts zu tun war oder ob
// etwas zu tun gewesen wäre und nicht getan wurde.
$offen = count(roiFindDueForReminder1(ROI_REMINDER_1_HOURS));

echo "roi-reminder-cron: db=ok reminder1={$sentReminder1} reminder2={$sentReminder2}"
    . " invites={$sentInvites} purged={$purged} nochOffen={$offen}"
    . " schwellen={" . ROI_REMINDER_1_HOURS . "h/" . ROI_REMINDER_2_HOURS . "h}\n";
