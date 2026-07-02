<?php
/**
 * OpenAI API Proxy
 *
 * Sicherer Proxy für OpenAI API-Aufrufe aus dem Frontend
 * Der API-Key bleibt server-seitig und wird nie an den Client gesendet
 */

// WICHTIG: Keine Ausgaben vor den Headers!
ob_start();

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/admin-auth-lib.php';

// CORS Headers
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:8080',
    'https://copilotenschule.de',
    'https://www.copilotenschule.de',
    'https://y-b.alwaysdata.net'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Token");
    header("Access-Control-Allow-Credentials: true");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_clean();
    exit;
}

// Content-Type wird NACH dem API-Call gesetzt
ob_end_clean();

// Nur POST erlaubt
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode(['error' => 'Nur POST-Requests erlaubt']);
    exit;
}

// SEC-02: Nur eingeloggte Admins dürfen den Proxy (und damit den OpenAI-Key) nutzen.
// Verhindert, dass der Endpunkt als offenes Relay auf Kosten des Kontos missbraucht wird.
requireAdminToken();

// SEC-02: Zusätzliches Rate-Limit pro IP (max 30 Aufrufe / Stunde)
$rlKey  = 'openai_proxy_' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rlFile = sys_get_temp_dir() . '/' . md5($rlKey) . '.txt';
$rlNow  = time();
$rlData = ['timestamp' => $rlNow, 'count' => 0];
if (file_exists($rlFile)) {
    $dec = json_decode(@file_get_contents($rlFile), true);
    if (is_array($dec) && ($dec['timestamp'] ?? 0) > $rlNow - 3600) {
        $rlData = $dec;
    }
}
if ($rlData['count'] >= 30) {
    header('Content-Type: application/json');
    http_response_code(429);
    echo json_encode(['error' => ['message' => 'Rate limit überschritten. Bitte später erneut versuchen.', 'type' => 'rate_limit']]);
    exit;
}
$rlData['count']++;
@file_put_contents($rlFile, json_encode($rlData));

// Konfiguration laden
$config = SecureConfig::getInstance();

if (!$config->hasOpenAIKey()) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'error' => [
            'message' => 'OpenAI API-Key nicht konfiguriert auf dem Server',
            'type' => 'configuration_error'
        ]
    ]);
    exit;
}

// Request-Body lesen
$requestBody = file_get_contents('php://input');
$requestData = json_decode($requestBody, true);

if (!$requestData) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode([
        'error' => [
            'message' => 'Ungültiger Request-Body',
            'type' => 'invalid_request_error'
        ]
    ]);
    exit;
}

// API-Aufruf an OpenAI weiterleiten
$ch = curl_init('https://api.openai.com/v1/chat/completions');

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($requestData),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $config->getOpenAIKey()
    ],
    CURLOPT_TIMEOUT => 120,
    CURLOPT_HEADER => false, // Keine Header in Response
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Fehlerbehandlung
if ($curlError) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'error' => [
            'message' => 'Fehler beim OpenAI API-Aufruf: ' . $curlError,
            'type' => 'proxy_error'
        ]
    ]);
    exit;
}

// Response validieren
$decoded = json_decode($response);
if (json_last_error() !== JSON_ERROR_NONE) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'error' => [
            'message' => 'Ungültige JSON-Response von OpenAI',
            'type' => 'proxy_error',
            'details' => json_last_error_msg()
        ]
    ]);
    exit;
}

// Response weiterleiten (bereits valides JSON)
header('Content-Type: application/json');
http_response_code($httpCode);
echo $response;
