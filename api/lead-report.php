<?php
/**
 * lead-report.php — Aggregiertes Honeypot-/Guide-Lead-Reporting
 *
 * Liefert AUSSCHLIESSLICH aggregierte Zahlen (keine E-Mail-Adressen, keine PII):
 * Lead-Zählungen pro Guide (source = 'guide-<id>') für 7 Tage / 30 Tage / gesamt,
 * jeweils inkl. Anteil bestätigter Double-Opt-Ins.
 *
 * Auth: Query-Parameter oder Header X-Report-Key muss mit ENV LEAD_REPORT_KEY
 * übereinstimmen (in AlwaysData unter Environment setzen — NICHT im Repo!).
 * Ohne gesetzten Key ist der Endpoint deaktiviert (403).
 *
 * Aufruf (z.B. aus dem wöchentlichen Reporting-Task):
 *   GET https://copilotenschule.de/api/lead-report.php?key=<LEAD_REPORT_KEY>
 */

header('Content-Type: application/json');
header('Cache-Control: no-store');

require_once __DIR__ . '/db-config.php';

$expected = getenv('LEAD_REPORT_KEY') ?: '';
$provided = $_GET['key'] ?? ($_SERVER['HTTP_X_REPORT_KEY'] ?? '');

if ($expected === '' || !hash_equals($expected, (string)$provided)) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}

try {
    $sql = "
        SELECT
            source,
            COUNT(*) AS total,
            SUM(CASE WHEN opt_in_status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_total,
            SUM(CASE WHEN COALESCE(form_submitted_at, created_at) >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS last_7d,
            SUM(CASE WHEN COALESCE(form_submitted_at, created_at) >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 ELSE 0 END) AS last_30d,
            MIN(COALESCE(form_submitted_at, created_at)) AS first_lead,
            MAX(COALESCE(form_submitted_at, created_at)) AS latest_lead
        FROM newsletter_subscriptions
        WHERE source LIKE 'guide-%'
        GROUP BY source
        ORDER BY total DESC
    ";
    $rows = $pdo->query($sql)->fetchAll();

    $sumTotal = 0; $sum7 = 0; $sum30 = 0;
    foreach ($rows as $r) {
        $sumTotal += (int)$r['total'];
        $sum7     += (int)$r['last_7d'];
        $sum30    += (int)$r['last_30d'];
    }

    echo json_encode([
        'generated_at' => date('c'),
        'summary' => [
            'guides'   => count($rows),
            'total'    => $sumTotal,
            'last_7d'  => $sum7,
            'last_30d' => $sum30,
        ],
        'guides' => $rows,
    ], JSON_PRETTY_PRINT);
} catch (Throwable $e) {
    error_log('lead-report failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Query failed']);
}
