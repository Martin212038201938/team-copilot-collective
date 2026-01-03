<?php
/**
 * OpenAI API Proxy
 *
 * Sicherer Proxy für OpenAI API-Aufrufe aus dem Frontend
 * Der API-Key bleibt server-seitig und wird nie an den Client gesendet
 */

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
    exit;
}

header('Content-Type: application/json');

// Nur POST erlaubt
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Nur POST-Requests erlaubt']);
    exit;
}

// Konfiguration laden
$config = SecureConfig::getInstance();

if (!$config->hasOpenAIKey()) {
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
    CURLOPT_TIMEOUT => 120
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Response weiterleiten
http_response_code($httpCode);
echo $response;
