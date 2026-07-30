<?php
/**
 * Gemeinsame Konfiguration für den ROI-Business-Case-Generator.
 * Wird von roi-deliver.php, roi-download.php und roi-reminder-cron.php eingebunden.
 */

// Gleicher Buchungslink wie überall sonst auf der Seite (Contact.tsx, Danke.tsx, StickyBookingCTA.tsx, ...).
define('ROI_BOOKING_URL', 'https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled');

// Wie lange bleibt der Download-Link gültig, bevor die Datei automatisch gelöscht wird (Abschnitt "Aufbewahrung").
define('ROI_FILE_TTL_DAYS', 7);

// Erinnerungs-Kadenz, jeweils ab ready_email_sent_at gerechnet.
//
// ACHTUNG — VORÜBERGEHEND AUF 0 GESETZT (30.07.2026, Verifikation des Erinnerungs-Crons).
// Mit 0 Stunden verschickt der nächste stündliche Lauf beide Erinnerungen an jeden noch
// nicht abgeholten Business Case. Unmittelbar nach der Prüfung zurückstellen auf 24 / 48.
define('ROI_REMINDER_1_HOURS', 0);
define('ROI_REMINDER_2_HOURS', 0);

// Maximale Upload-Größe der fertigen PPTX (Konzept: <3 MB ohne Logo, <5 MB mit Logo → Puffer).
define('ROI_MAX_UPLOAD_BYTES', 8 * 1024 * 1024);

/**
 * WICHTIG — Speicherort außerhalb des FTP-Mirror-Docroots:
 * Das Deployment führt `lftp mirror -R --delete dist/ /www/<domain>/` aus. Alles, was NICHT
 * Teil von dist/ ist, wird dabei aus /www/<domain>/ GELÖSCHT. Der Ordner für die generierten
 * PowerPoint-Dateien darf deshalb NICHT unter /www/<domain>/ liegen, sonst geht er beim
 * nächsten Deploy verloren.
 *
 * TODO (Martin, einmalig auf AlwaysData einzurichten):
 * Lege außerhalb des Web-Docroots einen Ordner an, z.B. via SSH:
 *   mkdir -p ~/private/roi-files && chmod 700 ~/private/roi-files
 * und trage den absoluten Pfad hier ein (oder als Server-Umgebungsvariable ROI_STORAGE_DIR).
 */
define('ROI_STORAGE_DIR', getenv('ROI_STORAGE_DIR') ?: '/home/y-b/private/roi-files');

/**
 * Stellt sicher, dass das Speicherverzeichnis existiert und nicht über das Web erreichbar ist.
 * Legt zusätzlich eine .htaccess als Verteidigung in der Tiefe an, falls der Ordner doch
 * einmal versehentlich unter einem Web-Docroot landet.
 */
function roiEnsureStorageDir(): bool {
    if (!is_dir(ROI_STORAGE_DIR)) {
        if (!@mkdir(ROI_STORAGE_DIR, 0700, true)) {
            error_log('ROI: Speicherverzeichnis konnte nicht angelegt werden: ' . ROI_STORAGE_DIR);
            return false;
        }
    }
    $htaccess = ROI_STORAGE_DIR . '/.htaccess';
    if (!file_exists($htaccess)) {
        @file_put_contents($htaccess, "Require all denied\nDeny from all\n");
    }
    return true;
}

/** Grobe Nutzerklasse ohne Rückschluss auf Finanzwerte (Konzept Abschnitt 16.4). */
function roiUsersBucket(int $users): string {
    if ($users <= 12) return '1-12';
    if ($users <= 50) return '13-50';
    if ($users <= 250) return '51-250';
    if ($users <= 1000) return '251-1000';
    return '1001+';
}
