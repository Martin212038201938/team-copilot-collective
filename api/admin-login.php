<?php
/**
 * Admin-Login (server-seitig)
 *
 * SICHERHEIT (SEC-01):
 * - Das Passwort wird NIEMALS im Client-Bundle gespeichert.
 * - Verifiziert wird gegen einen bcrypt-Hash, der ausschliesslich als
 *   Server-Umgebungsvariable ADMIN_PASSWORD_HASH vorliegt (nicht in Git, nicht im Bundle).
 * - Bei Erfolg wird ein signiertes, ablaufendes HMAC-Token ausgegeben. Es ist nicht
 *   faelschbar (Signatur mit dem Hash als Schluessel) -> ein blosses localStorage-Flag
 *   wie zuvor genuegt nicht mehr, um Zugriff zu erlangen.
 *
 * EINRICHTUNG auf AlwaysData (einmalig):
 *   export ADMIN_PASSWORD_HASH='<bcrypt-hash>'
 *   (persistent in ~/.bashrc / ~/.profile oder im AlwaysData-Panel unter Environment)
 */

header('Content-Type: application/json');

// --- CORS (gleiche erlaubte Origins wie die uebrigen Endpunkte) ---
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
    echo json_encode(['success' => false, 'error' => 'Nur POST erlaubt']);
    exit;
}

// --- Einfaches IP-Rate-Limit gegen Brute-Force: max 10 Versuche / 15 Min ---
$rlKey  = 'admin_login_' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rlFile = sys_get_temp_dir() . '/' . md5($rlKey) . '.txt';
$rlMax  = 10;
$rlWin  = 900; // 15 Minuten
$now    = time();
$data   = ['timestamp' => $now, 'count' => 0];
if (file_exists($rlFile)) {
    $decoded = json_decode(@file_get_contents($rlFile), true);
    if (is_array($decoded) && ($decoded['timestamp'] ?? 0) > $now - $rlWin) {
        $data = $decoded;
    }
}
if ($data['count'] >= $rlMax) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Zu viele Versuche. Bitte spaeter erneut versuchen.']);
    exit;
}
$data['count']++;
@file_put_contents($rlFile, json_encode($data));

// --- Konfiguration ---
$hash = getenv('ADMIN_PASSWORD_HASH') ?: '';
if ($hash === '') {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server nicht konfiguriert (ADMIN_PASSWORD_HASH fehlt).']);
    exit;
}

// --- Eingabe ---
$input    = json_decode(file_get_contents('php://input'), true);
$password = is_array($input) ? (string)($input['password'] ?? '') : '';

if ($password === '' || !password_verify($password, $hash)) {
    // Kleine Verzoegerung erschwert Brute-Force zusaetzlich
    usleep(300000);
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Passwort falsch.']);
    exit;
}

// --- Erfolg: signiertes Token ausstellen (12h gueltig) ---
$exp   = $now + 12 * 3600;
$sig   = hash_hmac('sha256', (string)$exp, $hash);
$token = $exp . '.' . $sig;

echo json_encode([
    'success' => true,
    'token'   => $token,
    'expires' => $exp
]);
