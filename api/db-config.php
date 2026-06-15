<?php
// Database configuration for AlwaysData MySQL
// IMPORTANT: Use environment variables or db-config-local.php for credentials

// Try to load local configuration (not in Git) first
$localConfig = __DIR__ . '/db-config-local.php';
if (file_exists($localConfig)) {
    require_once $localConfig;
} else {
    // Fallback to environment variables
    define('DB_HOST', getenv('DB_HOST') ?: 'mysql-y-b.alwaysdata.net');
    define('DB_NAME', getenv('DB_NAME') ?: 'y-b_copilotenschule');
    define('DB_USER', getenv('DB_USER') ?: 'y-b');
    define('DB_PASS', getenv('DB_PASS') ?: ''); // Set in AlwaysData environment
}

// Website URL for confirmation links
define('SITE_URL', 'https://copilotenschule.de');

/**
 * Get database connection
 */
function getDbConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

/**
 * Generate secure random token
 */
function generateToken() {
    return bin2hex(random_bytes(32));
}

/**
 * Save newsletter subscription to database
 */
function saveNewsletterSubscription($email, $name, $source, $token, $ipAddress = null, $userAgent = null, $consentText = null) {
    $db = getDbConnection();
    if (!$db) {
        return false;
    }

    try {
        $stmt = $db->prepare("
            INSERT INTO newsletter_subscriptions
            (email, name, source, confirmation_token, ip_address, user_agent, consent_text, form_submitted_at, opt_in_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'pending')
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                confirmation_token = VALUES(confirmation_token),
                consent_text = VALUES(consent_text),
                form_submitted_at = CURRENT_TIMESTAMP,
                opt_in_status = 'pending',
                created_at = CURRENT_TIMESTAMP
        ");

        return $stmt->execute([$email, $name, $source, $token, $ipAddress, $userAgent, $consentText]);
    } catch (PDOException $e) {
        error_log("Failed to save subscription: " . $e->getMessage());
        return false;
    }
}

/**
 * Look up a subscription's opt-in status by token (read-only, no state change).
 * Safe to call on a plain GET request (e.g. when an email link scanner pre-fetches
 * the URL) because it does NOT modify any data.
 *
 * @return string One of: 'pending', 'confirmed', 'unsubscribed', 'not_found', 'db_error'
 */
function getSubscriptionStatusByToken($token) {
    $db = getDbConnection();
    if (!$db) {
        return 'db_error';
    }

    try {
        $stmt = $db->prepare("
            SELECT opt_in_status
            FROM newsletter_subscriptions
            WHERE confirmation_token = ?
            LIMIT 1
        ");
        $stmt->execute([$token]);
        $row = $stmt->fetch();

        if (!$row) {
            return 'not_found';
        }
        return $row['opt_in_status'];
    } catch (PDOException $e) {
        error_log("Failed to read subscription: " . $e->getMessage());
        return 'db_error';
    }
}

/**
 * Confirm newsletter subscription.
 *
 * IMPORTANT: This performs the state change and must therefore only ever be
 * triggered by a POST request (a real human clicking the confirm button), never
 * by a plain GET. Automated mail-security scanners (e.g. Microsoft Outlook
 * "Safe Links"/Defender) pre-fetch links via GET and would otherwise confirm the
 * subscription before the recipient ever clicks — which both breaks the user's
 * own click and is not a valid double opt-in under GDPR.
 *
 * @return string One of: 'confirmed_now', 'already_confirmed', 'unsubscribed', 'not_found', 'db_error'
 */
function confirmSubscription($token) {
    $db = getDbConnection();
    if (!$db) {
        return 'db_error';
    }

    try {
        // Check current state first so we can give an accurate, friendly response.
        $stmt = $db->prepare("
            SELECT opt_in_status
            FROM newsletter_subscriptions
            WHERE confirmation_token = ?
            LIMIT 1
        ");
        $stmt->execute([$token]);
        $row = $stmt->fetch();

        if (!$row) {
            return 'not_found';
        }
        if ($row['opt_in_status'] === 'confirmed') {
            return 'already_confirmed';
        }
        if ($row['opt_in_status'] === 'unsubscribed') {
            return 'unsubscribed';
        }

        // Status is 'pending' → perform the confirmation.
        $upd = $db->prepare("
            UPDATE newsletter_subscriptions
            SET opt_in_status = 'confirmed', confirmed_at = CURRENT_TIMESTAMP
            WHERE confirmation_token = ? AND opt_in_status = 'pending'
        ");
        $upd->execute([$token]);

        return $upd->rowCount() > 0 ? 'confirmed_now' : 'already_confirmed';
    } catch (PDOException $e) {
        error_log("Failed to confirm subscription: " . $e->getMessage());
        return 'db_error';
    }
}
