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

// CORS Headers
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://copilotenschule.de',
    'https://www.copilotenschule.de',
    'https://y-b.alwaysdata.net'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
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
