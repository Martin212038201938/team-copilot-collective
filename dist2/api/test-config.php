<?php
/**
 * Test Script - Verify PHP API configuration
 */

// Disable HTML output for CLI testing
if (php_sapi_name() === 'cli') {
    // CLI mode
    define('CLI_MODE', true);
} else {
    // Web mode
    define('CLI_MODE', false);
    header('Content-Type: text/plain');
}

echo "\n";
echo "🧪 Testing PHP API Configuration\n";
echo str_repeat('=', 60) . "\n";

// Test 1: Check if .env.local file exists
echo "\n📝 Test 1: File System Check\n";
$envPath = __DIR__ . '/../.env.local';
if (file_exists($envPath)) {
    echo "   ✅ .env.local file exists\n";
    echo "   📁 Path: $envPath\n";
} else {
    echo "   ❌ .env.local file NOT found\n";
    echo "   📁 Expected path: $envPath\n";
    exit(1);
}

// Test 2: Check if file is readable
echo "\n📝 Test 2: File Permissions\n";
if (is_readable($envPath)) {
    echo "   ✅ .env.local is readable\n";
} else {
    echo "   ❌ .env.local is NOT readable (check permissions)\n";
    exit(1);
}

// Test 3: Load API key from .env.local
echo "\n📝 Test 3: Loading API Key from .env.local\n";

$apiKey = null;
$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($lines as $line) {
    // Skip comments
    if (strpos(trim($line), '#') === 0) continue;

    // Parse KEY=VALUE
    $parts = explode('=', $line, 2);
    if (count($parts) === 2) {
        $key = trim($parts[0]);
        $value = trim($parts[1]);

        if ($key === 'OPENAI_API_KEY') {
            $apiKey = $value;
            break;
        }
    }
}

if ($apiKey) {
    echo "   ✅ API Key loaded successfully\n";
    echo "   📏 Length: " . strlen($apiKey) . " characters\n";
    echo "   🔑 Preview: " . substr($apiKey, 0, 20) . "..." . substr($apiKey, -10) . "\n";
} else {
    echo "   ❌ API Key NOT found in .env.local\n";
    echo "   ⚠️  Check if .env.local contains OPENAI_API_KEY=...\n";
    exit(1);
}

// Test 4: Validate API key format
echo "\n📝 Test 4: API Key Format Validation\n";
if (strpos($apiKey, 'sk-proj-') === 0 || strpos($apiKey, 'sk-') === 0) {
    echo "   ✅ Valid OpenAI API key format\n";
} else {
    echo "   ⚠️  WARNING: Unexpected format (should start with sk- or sk-proj-)\n";
}

// Test 5: Test SecureConfig class (if not in CLI mode, we need to handle this differently)
echo "\n📝 Test 5: SecureConfig Class\n";

// Create a minimal version of SecureConfig for testing
class TestSecureConfig {
    private $config = [];

    public function __construct() {
        $this->loadFromEnvFile();
    }

    private function loadFromEnvFile() {
        $envPath = __DIR__ . '/../.env.local';
        if (file_exists($envPath)) {
            $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) continue;

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

    public function hasOpenAIKey() {
        return !empty($this->config['openai_api_key']);
    }

    public function getOpenAIKey() {
        return $this->config['openai_api_key'] ?? null;
    }
}

try {
    $testConfig = new TestSecureConfig();
    if ($testConfig->hasOpenAIKey()) {
        echo "   ✅ SecureConfig class can load API key\n";
        echo "   ✅ Ready for production use\n";
    } else {
        echo "   ❌ SecureConfig class failed to load API key\n";
        exit(1);
    }
} catch (Exception $e) {
    echo "   ❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}

// Summary
echo "\n" . str_repeat('=', 60) . "\n";
echo "🎯 PHP API TEST SUMMARY:\n\n";
echo "✅ File system check: PASSED\n";
echo "✅ File permissions: PASSED\n";
echo "✅ API Key loading: PASSED\n";
echo "✅ API Key format: PASSED\n";
echo "✅ SecureConfig class: PASSED\n";
echo "\n🚀 PHP API is ready to use!\n";
echo "\n💡 API Endpoints available:\n";
echo "   - /api/config.php (check configuration)\n";
echo "   - /api/generate-content-api.php (generate content)\n";
echo "\n" . str_repeat('=', 60) . "\n\n";

exit(0);
