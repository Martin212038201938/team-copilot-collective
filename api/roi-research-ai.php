<?php
/**
 * Optionaler, streng begrenzter OpenAI-Aufruf zur Verdichtung des Unternehmensprofils.
 *
 * Kostenprinzipien:
 *   - Wird NUR aufgerufen, wenn die kostenlosen Website-Metadaten zu dünn sind.
 *   - KEINE Websuche, KEIN Crawling: Das Modell sieht ausschließlich Text, den wir bereits
 *     kostenlos von der Startseite geladen haben.
 *   - Eingabetext hart auf ROI_RESEARCH_AI_MAX_INPUT_CHARS gekürzt.
 *   - Kleines Ausgabebudget, Structured Outputs, store: false.
 *   - Ergebnis wird pro Domain gecacht -> pro Unternehmen fällt das höchstens einmal an.
 *
 * Per Umgebungsvariable abschaltbar: ROI_RESEARCH_AI_ENABLED=false (Standard: aus).
 * Ohne KI funktioniert die Recherche vollständig weiter, nur etwas gröber.
 */

const ROI_RESEARCH_AI_MAX_INPUT_CHARS = 2500;
const ROI_RESEARCH_AI_MAX_OUTPUT_TOKENS = 220;

function roiResearchAiEnabled(): bool {
    return strtolower((string) getenv('ROI_RESEARCH_AI_ENABLED')) === 'true';
}

/** Sichtbaren Text aus dem HTML gewinnen und auf ein kleines Budget kürzen. */
function roiHtmlToPlainText(string $html): string {
    $html = preg_replace('/<(script|style|noscript|svg)[^>]*>.*?<\/\1>/is', ' ', $html) ?? $html;
    $text = strip_tags($html);
    $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = preg_replace('/\s+/u', ' ', $text) ?? $text;
    return trim(mb_substr($text, 0, ROI_RESEARCH_AI_MAX_INPUT_CHARS));
}

/**
 * @return array|null ['industry' => ?string, 'summary' => ?string, 'tokensIn' => int, 'tokensOut' => int]
 */
function roiResearchWithAi(string $companyName, string $domain, string $pageText, array $allowedIndustries): ?array {
    $apiKey = getenv('OPENAI_API_KEY') ?: '';
    if ($apiKey === '' || trim($pageText) === '') {
        return null;
    }

    $model = getenv('ROI_RESEARCH_AI_MODEL') ?: 'gpt-5.6-luna';

    $system = "Du fasst Unternehmensinformationen für eine Management-Präsentation zusammen. "
        . "Verwende ausschließlich den übergebenen Website-Text. Erfinde nichts. "
        . "Wenn der Text keine belastbare Aussage zulässt, gib null zurück. "
        . "Die Zusammenfassung ist ein einziger sachlicher Satz auf Deutsch (maximal 180 Zeichen) "
        . "darüber, was das Unternehmen tut. Keine Werbesprache, keine Superlative.";

    $user = json_encode([
        'companyName' => $companyName,
        'domain' => $domain,
        'allowedIndustries' => $allowedIndustries,
        'websiteText' => $pageText,
    ], JSON_UNESCAPED_UNICODE);

    $payload = [
        'model' => $model,
        'store' => false,
        'max_output_tokens' => ROI_RESEARCH_AI_MAX_OUTPUT_TOKENS,
        'input' => [
            ['role' => 'system', 'content' => $system],
            ['role' => 'user', 'content' => $user],
        ],
        'text' => [
            'format' => [
                'type' => 'json_schema',
                'name' => 'company_profile',
                'strict' => true,
                'schema' => [
                    'type' => 'object',
                    'additionalProperties' => false,
                    'properties' => [
                        'industry' => ['type' => ['string', 'null']],
                        'summary' => ['type' => ['string', 'null']],
                    ],
                    'required' => ['industry', 'summary'],
                ],
            ],
        ],
    ];

    $ch = curl_init('https://api.openai.com/v1/responses');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey,
        ],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    ]);
    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($raw === false || $status !== 200) {
        error_log('roiResearchWithAi: OpenAI-Aufruf fehlgeschlagen, Status ' . $status);
        return null;
    }

    $response = json_decode($raw, true);
    if (!is_array($response)) return null;

    // Responses API: Text liegt je nach Variante in output_text oder verschachtelt in output[].
    $textOut = $response['output_text'] ?? null;
    if (!$textOut && isset($response['output']) && is_array($response['output'])) {
        foreach ($response['output'] as $item) {
            foreach ($item['content'] ?? [] as $chunk) {
                if (!empty($chunk['text'])) { $textOut = $chunk['text']; break 2; }
            }
        }
    }
    if (!$textOut) return null;

    $parsed = json_decode(is_array($textOut) ? implode('', $textOut) : $textOut, true);
    if (!is_array($parsed)) return null;

    $industry = $parsed['industry'] ?? null;
    if ($industry !== null && !in_array($industry, $allowedIndustries, true)) {
        $industry = null; // Nur Werte aus unserer festen Liste zulassen.
    }
    $summary = $parsed['summary'] ?? null;
    if (is_string($summary)) {
        $summary = trim(preg_replace('/\s+/u', ' ', strip_tags($summary)) ?? $summary);
        $summary = mb_substr($summary, 0, 180);
        if ($summary === '') $summary = null;
    } else {
        $summary = null;
    }

    return [
        'industry' => $industry,
        'summary' => $summary,
        'tokensIn' => (int) ($response['usage']['input_tokens'] ?? 0),
        'tokensOut' => (int) ($response['usage']['output_tokens'] ?? 0),
    ];
}
