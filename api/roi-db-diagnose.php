<?php
/**
 * TEMPORÄRES Diagnose-Skript für die DB-Verbindung des Webspace.
 *
 * Gibt bewusst KEINE Zugangsdaten aus — nur, ob sie vorhanden sind und woher sie kommen,
 * plus die MySQL-Fehlermeldung. Nach der Fehlersuche wieder löschen.
 *
 * Aufruf: /api/roi-db-diagnose.php?key=roi-diag-2026
 */

header('Content-Type: application/json; charset=utf-8');

if (($_GET['key'] ?? '') !== 'roi-diag-2026') {
    http_response_code(404);
    echo json_encode(['error' => 'not found']);
    exit;
}

$localConfigPath = __DIR__ . '/db-config-local.php';

$result = [
    'db_config_local_exists' => file_exists($localConfigPath),
    'env_seen' => [
        'DB_HOST' => getenv('DB_HOST') ?: null,
        'DB_NAME' => getenv('DB_NAME') ?: null,
        'DB_USER' => getenv('DB_USER') ?: null,
        // Passwort NICHT ausgeben – nur ob gesetzt und wie lang.
        'DB_PASS_set' => getenv('DB_PASS') !== false && getenv('DB_PASS') !== '',
        'DB_PASS_length' => getenv('DB_PASS') ? strlen(getenv('DB_PASS')) : 0,
    ],
    'server_env_seen' => [
        'DB_HOST' => $_SERVER['DB_HOST'] ?? null,
        'DB_PASS_set' => !empty($_SERVER['DB_PASS']),
    ],
];

require_once __DIR__ . '/db-config.php';

$result['constants_used'] = [
    'DB_HOST' => defined('DB_HOST') ? DB_HOST : null,
    'DB_NAME' => defined('DB_NAME') ? DB_NAME : null,
    'DB_USER' => defined('DB_USER') ? DB_USER : null,
    'DB_PASS_set' => defined('DB_PASS') ? (DB_PASS !== '') : null,
    'DB_PASS_length' => defined('DB_PASS') ? strlen(DB_PASS) : null,
];

try {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    new PDO($dsn, DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $result['connection'] = 'OK';
} catch (PDOException $e) {
    $result['connection'] = 'FEHLER';
    $result['connection_error'] = $e->getMessage();
}

$result['ziparchive_available'] = class_exists('ZipArchive');
$result['upload_max_filesize'] = ini_get('upload_max_filesize');
$result['post_max_size'] = ini_get('post_max_size');
$result['storage_dir'] = getenv('ROI_STORAGE_DIR') ?: '(nicht gesetzt, Default wird verwendet)';

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
