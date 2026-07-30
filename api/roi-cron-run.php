<?php
/**
 * roi-cron-run.php
 *
 * Anstoß der wiederkehrenden ROI-Aufgaben über HTTP, gedacht für den stündlichen
 * AlwaysData-Task:
 *
 *   [ -f ~/.roi-cron-token ] || openssl rand -hex 32 > ~/.roi-cron-token
 *   curl -sS -H "X-Cron-Token: $(cat ~/.roi-cron-token)" https://copilotenschule.de/api/roi-cron-run.php
 *
 * Warum über HTTP statt direkt per PHP-CLI: Die Datenbank-Zugangsdaten stehen in den
 * Umgebungsvariablen der Website. Ein Cron-Prozess erbt die nicht — er lief deshalb seit
 * Einrichtung ohne Datenbank und meldete stillschweigend "nichts zu tun". Über HTTP läuft
 * dieselbe Logik im Kontext der Website und hat die Zugangsdaten.
 *
 * Absicherung ohne Geheimnis im Repository: Der Token liegt in einer Datei im Home-Verzeichnis,
 * außerhalb des Webroots. Der Cron erzeugt sie beim ersten Lauf selbst und liest sie; dieses
 * Skript liest dieselbe Datei zum Vergleich. Damit steht der Token nirgends im Code und
 * niemand von außen kann den Lauf auslösen.
 */

require_once __DIR__ . '/roi-cron-tasks.php';

/** Ablageort des Tokens – bewusst außerhalb des Webroots. */
function roiCronTokenPath(): string {
    $home = getenv('HOME') ?: '/home/y-b';
    return rtrim($home, '/') . '/.roi-cron-token';
}

header('Content-Type: text/plain; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');

$tokenFile = roiCronTokenPath();
$expected = is_readable($tokenFile) ? trim((string) file_get_contents($tokenFile)) : '';
$provided = trim((string) ($_SERVER['HTTP_X_CRON_TOKEN'] ?? ''));

if ($expected === '') {
    // Ohne hinterlegten Token bleibt der Endpunkt zu. Sonst wäre er offen, solange die
    // Datei fehlt — genau dann, wenn niemand hinschaut.
    http_response_code(503);
    echo "roi-cron: kein Token hinterlegt ({$tokenFile}). Der Cron legt ihn beim ersten Lauf an.\n";
    exit;
}

if ($provided === '' || !hash_equals($expected, $provided)) {
    http_response_code(403);
    echo "roi-cron: Zugriff verweigert.\n";
    exit;
}

// Die Arbeit kann je nach Anzahl der Erinnerungen etwas dauern; der Aufruf ist unkritisch.
set_time_limit(300);

$result = roiRunCronTasks();
if (!$result['db']) {
    http_response_code(500);
}
echo roiFormatCronResult($result) . "\n";
