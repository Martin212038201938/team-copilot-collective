<?php
/**
 * Einfacher, dateibasierter Rate-Limiter (flock), damit parallele Requests den Zähler
 * nicht überschreiben. Ausreichend für ein Shared-Hosting-Setup ohne Redis/Memcached.
 *
 * WICHTIG — Trennung von Prüfen und Zählen:
 * Gezählt wird erst NACH einer erfolgreich abgeschlossenen Lieferung (roiCountRateLimit).
 * Würde schon der Prüfaufruf hochzählen, verbrauchten serverseitige Fehlversuche das
 * Kontingent des Nutzers: Nach ein paar fehlgeschlagenen Anläufen (z.B. DB kurz weg)
 * wäre die Adresse 24 Stunden gesperrt, obwohl der Nutzer nie eine Datei bekommen hat.
 */

/** Interner Zugriff auf die Zählerdatei. $increment steuert, ob hochgezählt wird. */
function roiRateLimitAccess(string $key, int $maxPerWindow, int $windowSeconds, bool $increment): bool {
    $dir = sys_get_temp_dir() . '/roi-rate-limit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    // Prefix v2: setzt die Zähler aus der Zeit zurück, als schon das Prüfen hochzählte.
    $safeKey = 'v2-' . preg_replace('/[^a-zA-Z0-9_\-]/', '_', $key);
    $file = $dir . '/' . $safeKey . '.json';

    $fp = fopen($file, 'c+');
    if (!$fp) {
        // Im Zweifel nicht blockieren, aber loggen.
        error_log('roiRateLimitAccess: Lock-Datei konnte nicht geöffnet werden: ' . $file);
        return true;
    }

    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $data = $raw ? json_decode($raw, true) : null;
    $now = time();

    if (!is_array($data) || !isset($data['windowStart']) || ($now - $data['windowStart']) > $windowSeconds) {
        $data = ['windowStart' => $now, 'count' => 0];
    }

    $allowed = $data['count'] < $maxPerWindow;
    if ($allowed && $increment) {
        $data['count']++;
    }

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    return $allowed;
}

/** Nur prüfen, ob noch Kontingent frei ist — zählt NICHT hoch. */
function roiCheckRateLimit(string $key, int $maxPerWindow, int $windowSeconds): bool {
    return roiRateLimitAccess($key, $maxPerWindow, $windowSeconds, false);
}

/** Nach erfolgreicher Lieferung aufrufen: zählt den Versuch. */
function roiCountRateLimit(string $key, int $maxPerWindow, int $windowSeconds): void {
    roiRateLimitAccess($key, $maxPerWindow, $windowSeconds, true);
}
