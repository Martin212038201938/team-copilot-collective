<?php
/**
 * Web-basierter Content Generator API Endpoint
 *
 * Ermöglicht Content-Generierung direkt über die Web-UI
 * Nutzt Server-seitig gespeicherten API-Key (sicher!)
 */

require_once __DIR__ . '/config.php';

// Rate Limiting und Sicherheit
session_start();

// Einfaches Rate Limiting
$rate_limit_key = 'content_gen_' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rate_limit_file = sys_get_temp_dir() . '/' . md5($rate_limit_key) . '.txt';
$rate_limit = 10; // Max 10 Requests pro Stunde
$rate_window = 3600;

if (file_exists($rate_limit_file)) {
    $data = json_decode(file_get_contents($rate_limit_file), true);
    if ($data['timestamp'] > time() - $rate_window) {
        if ($data['count'] >= $rate_limit) {
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'error' => 'Rate limit überschritten. Bitte warten Sie eine Stunde.'
            ]);
            exit;
        }
        $data['count']++;
    } else {
        $data = ['timestamp' => time(), 'count' => 1];
    }
} else {
    $data = ['timestamp' => time(), 'count' => 1];
}
file_put_contents($rate_limit_file, json_encode($data));

// Konfiguration laden
$config = SecureConfig::getInstance();

if (!$config->hasOpenAIKey()) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'OpenAI API Key nicht konfiguriert'
    ]);
    exit;
}

// Request-Daten
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['transcript']) || empty($input['transcript'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Transkript fehlt'
    ]);
    exit;
}

$transcript = $input['transcript'];
$instructions = $input['instructions'] ?? '';
$enableResearch = $input['enableResearch'] ?? false;

/**
 * OpenAI API Call
 */
function callOpenAI($apiKey, $prompt, $model = 'gpt-4o', $maxTokens = 16000, $temperature = 0.7) {
    $ch = curl_init('https://api.openai.com/v1/chat/completions');

    $data = [
        'model' => $model,
        'messages' => [
            [
                'role' => 'system',
                'content' => 'Du bist ein SENIOR CONSULTANT mit 10+ Jahren Erfahrung in Microsoft 365 und KI-Themen. Du erstellst professionell tiefgehende, fachlich exzellente Wissensseiten für Experten und Praktiker.'
            ],
            [
                'role' => 'user',
                'content' => $prompt
            ]
        ],
        'temperature' => $temperature,
        'max_tokens' => $maxTokens
    ];

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey
        ],
        CURLOPT_TIMEOUT => 120
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        throw new Exception('cURL Error: ' . $curlError);
    }

    if ($response === false) {
        throw new Exception('OpenAI API Request fehlgeschlagen: Keine Antwort erhalten');
    }

    if ($httpCode !== 200) {
        $errorData = json_decode($response, true);
        $errorMsg = $errorData['error']['message'] ?? $response;
        throw new Exception('OpenAI API Error (HTTP ' . $httpCode . '): ' . $errorMsg);
    }

    $result = json_decode($response, true);

    if (!$result || !isset($result['choices'][0]['message']['content'])) {
        throw new Exception('Ungültige OpenAI API Antwort: ' . substr($response, 0, 200));
    }

    return $result;
}

try {
    // TODO: Hier würde der volle Prompt-Generator aus generate-content.js kommen
    // Für jetzt ein vereinfachter Prompt
    $prompt = "Erstelle einen professionellen Artikel basierend auf:\n\n" . $transcript;
    if ($instructions) {
        $prompt .= "\n\nZusätzliche Anweisungen: " . $instructions;
    }

    $publicConfig = $config->getPublicConfig();
    $result = callOpenAI(
        $config->getOpenAIKey(),
        $prompt,
        $publicConfig['openai_model'],
        $publicConfig['openai_max_tokens'],
        $publicConfig['openai_temperature']
    );

    echo json_encode([
        'success' => true,
        'content' => $result['choices'][0]['message']['content'] ?? '',
        'usage' => $result['usage'] ?? null
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
