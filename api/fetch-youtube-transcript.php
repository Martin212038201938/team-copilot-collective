<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (empty($data['url'])) {
    http_response_code(400);
    echo json_encode(['error' => 'YouTube URL ist erforderlich']);
    exit;
}

$url = $data['url'];

// Extract video ID from URL
function extractVideoId($url) {
    $patterns = [
        '/youtube\.com\/watch\?v=([^&]+)/',
        '/youtu\.be\/([^?]+)/',
        '/youtube\.com\/embed\/([^?]+)/',
        '/youtube\.com\/v\/([^?]+)/',
    ];

    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $url, $matches)) {
            return $matches[1];
        }
    }

    return null;
}

$videoId = extractVideoId($url);

if (!$videoId) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige YouTube URL']);
    exit;
}

// Fetch video page to get caption tracks
$videoPageUrl = "https://www.youtube.com/watch?v=" . urlencode($videoId);
$context = stream_context_create([
    'http' => [
        'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n"
    ]
]);

$videoPage = @file_get_contents($videoPageUrl, false, $context);

if ($videoPage === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Konnte YouTube-Video nicht abrufen']);
    exit;
}

// Extract caption tracks from the page
// Look for "captionTracks" in the page source with better regex
preg_match('/"captionTracks":\s*(\[(?:[^\[\]]|(?1))*\])/', $videoPage, $captionMatches);

// Alternative: try to find it in a larger context
if (empty($captionMatches[1])) {
    // Try alternative pattern
    preg_match('/"captionTracks":\[(.*?)\],"/', $videoPage, $altMatches);
    if (!empty($altMatches[0])) {
        preg_match('/\[(.*)\]/', $altMatches[0], $innerMatch);
        $captionMatches[1] = '[' . $innerMatch[1] . ']';
    }
}

if (empty($captionMatches[1])) {
    http_response_code(404);
    echo json_encode([
        'error' => 'Keine Untertitel für dieses Video verfügbar',
        'debug' => 'captionTracks nicht gefunden in Seitenquelle'
    ]);
    exit;
}

$captionTracks = json_decode($captionMatches[1], true);

if (empty($captionTracks)) {
    http_response_code(404);
    echo json_encode([
        'error' => 'Keine Untertitel für dieses Video verfügbar',
        'debug' => 'JSON decode fehlgeschlagen oder leeres Array'
    ]);
    exit;
}

// Prefer German subtitles, fallback to English or first available
$captionUrl = null;
$languagePreference = ['de', 'en'];

foreach ($languagePreference as $lang) {
    foreach ($captionTracks as $track) {
        if (isset($track['languageCode']) && $track['languageCode'] === $lang) {
            $captionUrl = $track['baseUrl'];
            break 2;
        }
    }
}

// If no preferred language found, use first available
if (!$captionUrl && !empty($captionTracks[0]['baseUrl'])) {
    $captionUrl = $captionTracks[0]['baseUrl'];
}

if (!$captionUrl) {
    http_response_code(404);
    echo json_encode(['error' => 'Konnte Untertitel-URL nicht extrahieren']);
    exit;
}

// Fetch the caption data
$captionXml = @file_get_contents($captionUrl, false, $context);

if ($captionXml === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Konnte Untertitel nicht laden']);
    exit;
}

// Parse XML and extract text
// Disable XML errors and use internal error handling
libxml_use_internal_errors(true);

// Try to clean the XML first
$captionXml = trim($captionXml);

// Try SimpleXML first
$xml = simplexml_load_string($captionXml, 'SimpleXMLElement', LIBXML_NOCDATA);

// If SimpleXML fails, try DOMDocument
if ($xml === false) {
    $dom = new DOMDocument();
    $dom->loadXML($captionXml, LIBXML_NOCDATA);
    $xml = simplexml_import_dom($dom);
}

if ($xml === false) {
    $xmlErrors = libxml_get_errors();
    libxml_clear_errors();

    http_response_code(500);
    echo json_encode([
        'error' => 'Konnte Untertitel nicht parsen',
        'debug' => 'XML parsing fehlgeschlagen',
        'xmlErrors' => array_map(function($err) {
            return $err->message;
        }, $xmlErrors)
    ]);
    exit;
}

// Extract transcript with timestamps
$transcript = "";
$transcriptPlain = "";

// Try to iterate through text elements
$textElements = $xml->xpath('//text') ?: $xml->text ?: [];

foreach ($textElements as $caption) {
    $start = isset($caption['start']) ? floatval($caption['start']) : 0;
    $text = html_entity_decode(strip_tags((string)$caption), ENT_QUOTES | ENT_HTML5, 'UTF-8');

    // Skip empty text
    if (empty(trim($text))) {
        continue;
    }

    // Format timestamp as [MM:SS]
    $minutes = floor($start / 60);
    $seconds = floor($start % 60);
    $timestamp = sprintf("[%02d:%02d]", $minutes, $seconds);

    $transcript .= $timestamp . " " . $text . "\n";
    $transcriptPlain .= $text . " ";
}

// If no transcript extracted, return error
if (empty($transcript)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Konnte Untertitel nicht parsen',
        'debug' => 'Keine Text-Elemente gefunden'
    ]);
    exit;
}

// Return both formatted and plain versions
http_response_code(200);
echo json_encode([
    'success' => true,
    'videoId' => $videoId,
    'transcript' => trim($transcript),
    'transcriptPlain' => trim($transcriptPlain),
    'language' => isset($track['languageCode']) ? $track['languageCode'] : 'unknown'
]);
?>
