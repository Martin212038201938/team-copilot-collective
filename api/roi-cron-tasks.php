<?php
/**
 * roi-cron-tasks.php
 *
 * Die wiederkehrende Arbeit des ROI-Generators an einer Stelle: Erinnerungen verschicken,
 * liegengebliebene Termin-Einladungen nachholen, abgelaufene Dateien löschen.
 *
 * Warum ausgelagert: Aufgerufen wird das Ganze auf zwei Wegen — über die Weboberfläche
 * (roi-cron-run.php, läuft im Kontext der Website und hat dadurch die Datenbank-Zugangsdaten
 * aus den Umgebungsvariablen) und weiterhin über die Kommandozeile (roi-reminder-cron.php).
 * Der Web-Weg ist der zuverlässige: Ein Cron-Prozess auf AlwaysData erbt die
 * Umgebungsvariablen der Website NICHT, hat also keine Datenbankverbindung.
 *
 * Enthält bewusst keine Ausgabe und kein exit — das entscheidet der jeweilige Aufrufer.
 */

require_once __DIR__ . '/db-config.php';
require_once __DIR__ . '/roi-config.php';
require_once __DIR__ . '/roi-db.php';
require_once __DIR__ . '/roi-mailer.php';

/**
 * Führt alle fälligen Aufgaben aus.
 *
 * @return array{db:bool,reminder1:int,reminder2:int,invites:int,purged:int,offen:int}
 *         db=false heißt: keine Datenbankverbindung, es wurde nichts geprüft. Das ist der
 *         wichtigste Rückgabewert — ohne ihn sieht ein Lauf ohne Datenbank genauso aus wie
 *         ein Lauf ohne fällige Erinnerungen (überall Null).
 */
function roiRunCronTasks(): array {
    $result = ['db' => false, 'reminder1' => 0, 'reminder2' => 0, 'invites' => 0, 'purged' => 0, 'offen' => 0];

    if (getDbConnection() === null) {
        return $result;
    }
    $result['db'] = true;

    foreach (roiFindDueForReminder1(ROI_REMINDER_1_HOURS) as $delivery) {
        $downloadUrl = SITE_URL . '/api/roi-download.php?token=' . urlencode($delivery['download_token']);
        if (roiSendReminderEmail($delivery['email'], $downloadUrl, $delivery['company_name'] ?: null, 1)) {
            roiMarkReminderSent($delivery['download_token'], 1);
            $result['reminder1']++;
        }
    }

    foreach (roiFindDueForReminder2(ROI_REMINDER_2_HOURS) as $delivery) {
        $downloadUrl = SITE_URL . '/api/roi-download.php?token=' . urlencode($delivery['download_token']);
        if (roiSendReminderEmail($delivery['email'], $downloadUrl, $delivery['company_name'] ?: null, 2)) {
            roiMarkReminderSent($delivery['download_token'], 2);
            $result['reminder2']++;
        }
    }

    // Nachzügler: Datei wurde abgeholt, aber die Termin-Einladung ging beim Download nicht raus.
    foreach (roiFindDueForBookingInvite() as $delivery) {
        if (roiSendBookingInviteEmail($delivery['email'], $delivery['company_name'] ?: null)) {
            roiMarkBookingInviteSent($delivery['download_token']);
            $result['invites']++;
        }
    }

    foreach (roiFindExpiredNotYetPurged() as $delivery) {
        foreach ([$delivery['file_path'] ?? '', $delivery['file_path_xlsx'] ?? ''] as $path) {
            if (!empty($path) && file_exists($path)) {
                @unlink($path);
            }
        }
        roiClearFilePath($delivery['download_token']);
        $result['purged']++;
    }

    // Noch offene Fälle: unterscheidet "nichts zu tun" von "etwas zu tun gewesen, nicht getan".
    $result['offen'] = count(roiFindDueForReminder1(ROI_REMINDER_1_HOURS));

    return $result;
}

/** Einzeilige Zusammenfassung für Cron-Logs. */
function roiFormatCronResult(array $r): string {
    if (!$r['db']) {
        return 'roi-cron: FEHLER — keine Datenbankverbindung, es wurde nichts geprüft.';
    }
    return sprintf(
        'roi-cron: db=ok reminder1=%d reminder2=%d invites=%d purged=%d nochOffen=%d schwellen={%dh/%dh}',
        $r['reminder1'], $r['reminder2'], $r['invites'], $r['purged'], $r['offen'],
        ROI_REMINDER_1_HOURS, ROI_REMINDER_2_HOURS
    );
}
