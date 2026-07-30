<?php
/**
 * roi-reminder-cron.php
 *
 * Kommandozeilen-Variante der wiederkehrenden ROI-Aufgaben (Erinnerungen nach 24h/48h,
 * nachgeholte Termin-Einladungen, Löschen abgelaufener Dateien).
 *
 * ACHTUNG — auf AlwaysData ist das NICHT der zuverlässige Weg: Ein Cron-Prozess erbt die
 * Umgebungsvariablen der Website nicht und hat damit keine Datenbank-Zugangsdaten. Der
 * stündliche Task ruft deshalb stattdessen roi-cron-run.php über HTTP auf. Diese Datei
 * bleibt für den Fall, dass die Zugangsdaten einmal lokal in api/db-config-local.php
 * hinterlegt werden — dann funktioniert auch der direkte Aufruf:
 *
 *   php /home/y-b/www/copilotenschule.de/api/roi-reminder-cron.php
 *
 * Nur über CLI ausführbar, nicht öffentlich über den Browser aufrufbar.
 */

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}

require_once __DIR__ . '/roi-cron-tasks.php';

$result = roiRunCronTasks();
echo roiFormatCronResult($result) . "\n";

// Fehlende Datenbankverbindung als Fehler melden, damit sie im Cron-Log auffällt.
exit($result['db'] ? 0 : 1);
