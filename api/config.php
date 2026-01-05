<?php
/**
 * Sichere Server-Konfiguration
 *
 * Liest sensible Konfigurationswerte aus Server-Umgebungsvariablen
 * Diese Werte werden NIEMALS direkt zum Client gesendet
 *
 * EINRICHTUNG auf AlwaysData:
 * 1. SSH einloggen: ssh [user]@ssh-[user].alwaysdata.net
 * 2. ENV-Variable setzen:
 *    export OPENAI_API_KEY="sk-proj-..."
 * 3. Persistent machen in ~/.bashrc oder ~/.profile:
 *    echo 'export OPENAI_API_KEY="sk-proj-..."' >> ~/.bashrc
 */

// Sicherheit: Nur von diesem Server aufrufbar
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
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

/**
 * Sichere Server-Konfiguration
 *
 * Gibt nur nicht-sensible Konfigurationswerte zurück
 * API-Keys werden NIEMALS direkt ausgegeben
 */
class SecureConfig {
    private static $instance = null;
    private $config = [];

    private function __construct() {
        // Lade Konfiguration aus Umgebungsvariablen
        $this->loadFromEnvironment();
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function loadFromEnvironment() {
        // Versuche aus Umgebungsvariablen zu laden
        $this->config['openai_api_key'] = getenv('OPENAI_API_KEY') ?: null;
        $this->config['openai_model'] = getenv('OPENAI_MODEL') ?: 'gpt-4o';
        $this->config['openai_max_tokens'] = getenv('OPENAI_MAX_TOKENS') ?: '24000';
        $this->config['openai_temperature'] = getenv('OPENAI_TEMPERATURE') ?: '0.6';

        // Fallback: Lade aus .env.local (nur wenn ENV-Variablen nicht gesetzt)
        if (!$this->config['openai_api_key']) {
            $this->loadFromEnvFile();
        }
    }

    private function loadFromEnvFile() {
        $envPath = __DIR__ . '/../.env.local';
        if (file_exists($envPath)) {
            $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                // Ignoriere Kommentare
                if (strpos(trim($line), '#') === 0) continue;

                // Parse KEY=VALUE
                $parts = explode('=', $line, 2);
                if (count($parts) === 2) {
                    $key = trim($parts[0]);
                    $value = trim($parts[1]);

                    if ($key === 'OPENAI_API_KEY') {
                        $this->config['openai_api_key'] = $value;
                    } elseif ($key === 'OPENAI_MODEL') {
                        $this->config['openai_model'] = $value;
                    } elseif ($key === 'OPENAI_MAX_TOKENS') {
                        $this->config['openai_max_tokens'] = $value;
                    } elseif ($key === 'OPENAI_TEMPERATURE') {
                        $this->config['openai_temperature'] = $value;
                    }
                }
            }
        }
    }

    /**
     * Gibt den OpenAI API-Key zurück (NUR für Server-seitige Nutzung!)
     * NIEMALS an Client senden!
     */
    public function getOpenAIKey() {
        return $this->config['openai_api_key'];
    }

    /**
     * Prüft ob API-Key konfiguriert ist
     */
    public function hasOpenAIKey() {
        return !empty($this->config['openai_api_key']);
    }

    /**
     * Gibt nicht-sensible Konfiguration zurück
     */
    public function getPublicConfig() {
        return [
            'openai_configured' => $this->hasOpenAIKey(),
            'openai_model' => $this->config['openai_model'],
            'openai_max_tokens' => (int)$this->config['openai_max_tokens'],
            'openai_temperature' => (float)$this->config['openai_temperature']
        ];
    }
}

// Endpoint-Handling
$config = SecureConfig::getInstance();

// Nur Status zurückgeben, NIEMALS den Key selbst!
echo json_encode([
    'success' => true,
    'configured' => $config->hasOpenAIKey(),
    'config' => $config->getPublicConfig(),
    'message' => $config->hasOpenAIKey()
        ? 'OpenAI API Key ist konfiguriert'
        : 'OpenAI API Key fehlt - bitte in .env.local oder als Umgebungsvariable setzen'
]);
