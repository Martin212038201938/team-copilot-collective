<?php
/**
 * Admin-Token-Verifikation (server-seitig)
 *
 * Prueft ein von admin-login.php ausgestelltes HMAC-Token. Der Client ruft dies beim
 * Laden des Admin-Bereichs auf; nur ein gueltiges, nicht abgelaufenes und korrekt
 * signiertes Token gewaehrt Zugriff. Ein manuell gesetztes localStorage-Flag scheitert hier.
 */

header('Content-Type: application/json');

$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:8080',
    'https://copilotenschule.de',
    'https://www.copilotenschule.de',
    'https://y-b.alwaysdata.net'
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['valid' => false]);
    exit;
}

require_once __DIR__ . '/admin-auth-lib.php';

if ((getenv('ADMIN_PASSWORD_HASH') ?: '') === '') {
    http_response_code(500);
    echo json_encode(['valid' => false, 'error' => 'Server nicht konfiguriert.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$token = is_array($input) ? (string)($input['token'] ?? '') : '';

// SEC-02: Zentrale Token-Prüfung (gleiche Logik wie openai-proxy & generate-content-api)
echo json_encode(['valid' => verifyAdminToken($token)]);
