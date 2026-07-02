<?php
/**
 * Gemeinsame Admin-Token-Prüfung (SEC-01 / SEC-02).
 *
 * Verifiziert die von `admin-login.php` ausgestellten HMAC-Tokens. Wird genutzt von:
 * - admin-verify.php  (Login-Status im Admin-Frontend)
 * - openai-proxy.php  (Zugriff auf den OpenAI-Proxy nur für eingeloggte Admins)
 * - generate-content-api.php
 *
 * Das Token-Format ist "<expiry>.<hmac_sha256(expiry, ADMIN_PASSWORD_HASH)>".
 */

/**
 * Prüft, ob ein Token gültig, unverfälscht und nicht abgelaufen ist.
 */
function verifyAdminToken($token): bool {
    $hash = getenv('ADMIN_PASSWORD_HASH') ?: '';
    if ($hash === '' || !is_string($token) || $token === '') {
        return false;
    }
    $parts = explode('.', $token, 2);
    if (count($parts) !== 2) {
        return false;
    }
    [$exp, $sig] = $parts;
    if (!ctype_digit($exp) || (int)$exp <= time()) {
        return false;
    }
    $expected = hash_hmac('sha256', (string)$exp, $hash);
    return hash_equals($expected, $sig);
}

/**
 * Liest das Admin-Token aus der Anfrage: bevorzugt Header `X-Admin-Token`,
 * alternativ `Authorization: Bearer <token>`.
 */
function getAdminTokenFromRequest(): string {
    $headers = [];
    if (function_exists('getallheaders')) {
        foreach (getallheaders() as $k => $v) {
            $headers[strtolower($k)] = $v;
        }
    }
    if (isset($headers['x-admin-token'])) {
        return trim($headers['x-admin-token']);
    }
    // Fallbacks (manche Server liefern Header über $_SERVER)
    if (isset($_SERVER['HTTP_X_ADMIN_TOKEN'])) {
        return trim($_SERVER['HTTP_X_ADMIN_TOKEN']);
    }
    $auth = $headers['authorization'] ?? ($_SERVER['HTTP_AUTHORIZATION'] ?? '');
    if (stripos($auth, 'Bearer ') === 0) {
        return trim(substr($auth, 7));
    }
    return '';
}

/**
 * Erzwingt ein gültiges Admin-Token; beendet die Anfrage mit 401, falls ungültig.
 * Muss aufgerufen werden, BEVOR sensible Aktionen (OpenAI-Call) ausgeführt werden.
 */
function requireAdminToken(): void {
    if (!verifyAdminToken(getAdminTokenFromRequest())) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode([
            'error' => [
                'message' => 'Nicht autorisiert. Bitte im Admin-Bereich anmelden.',
                'type' => 'auth_error'
            ]
        ]);
        exit;
    }
}
