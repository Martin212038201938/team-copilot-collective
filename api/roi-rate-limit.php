<?php
/**
 * Einfacher, dateibasierter Rate-Limiter (flock), damit parallele Requests den Zähler
 * nicht überschreiben. Ausreichend für ein Shared-Hosting-Setup ohne Redis/Memcached.
 */
function roiCheckRateLimit(string $key, int $maxPerWindow, int $windowSeconds): bool {
    $dir = sys_get_temp_dir() . '/roi-rate-limit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $safeKey = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $key);
    $file = $dir . '/' . $safeKey . '.json';

    $fp = fopen($file, 'c+');
    if (!$fp) {
        // Im Zweifel nicht blockieren, aber loggen.
        error_log('roiCheckRateLimit: Lock-Datei konnte nicht geöffnet werden: ' . $file);
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
    if ($allowed) {
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
