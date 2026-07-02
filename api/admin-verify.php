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

$hash = getenv('ADMIN_PASSWORD_HASH') ?: '';
if ($hash === '') {
    http_response_code(500);
    echo json_encode(['valid' => false, 'error' => 'Server nicht konfiguriert.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$token = is_array($input) ? (string)($input['token'] ?? '') : '';

$valid = false;
$parts = explode('.', $token, 2);
if (count($parts) === 2) {
    [$exp, $sig] = $parts;
    if (ctype_digit($exp) && (int)$exp > time()) {
        $expected = hash_hmac('sha256', (string)$exp, $hash);
        $valid = hash_equals($expected, $sig);
    }
}

echo json_encode(['valid' => $valid]);
