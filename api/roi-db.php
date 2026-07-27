<?php
/**
 * DB-Helfer für roi_deliveries (siehe database-migration-roi-deliveries.sql).
 * Nutzt dieselbe Verbindung/Konventionen wie db-config.php.
 */

require_once __DIR__ . '/db-config.php';

function roiCreateDelivery(
    string $token,
    string $email,
    ?string $companyName,
    string $usersBucket,
    string $filePath,
    int $fileSizeBytes,
    ?string $ipAddress,
    ?string $consentText,
    int $ttlDays
): bool {
    $db = getDbConnection();
    if (!$db) return false;

    // WICHTIG: kein Platzhalter innerhalb von INTERVAL ... DAY — mit
    // PDO::ATTR_EMULATE_PREPARES=false (siehe db-config.php) scheitert MySQL daran
    // regelmäßig ("INSERT ... INTERVAL ?" schlägt fehl, obwohl Spaltenzahl/Werte stimmen).
    // $ttlDays kommt ausschließlich aus ROI_FILE_TTL_DAYS (fester Server-Konstante,
    // keine Nutzereingabe) — direktes Einsetzen als (int) ist daher unbedenklich.
    $ttlDaysInt = (int) $ttlDays;

    try {
        $stmt = $db->prepare("
            INSERT INTO roi_deliveries
                (download_token, email, company_name, users_bucket, file_path, file_size_bytes,
                 ip_address, consent_text, ready_email_sent_at, expires_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP,
                    DATE_ADD(CURRENT_TIMESTAMP, INTERVAL {$ttlDaysInt} DAY), CURRENT_TIMESTAMP)
        ");
        return $stmt->execute([
            $token, $email, $companyName, $usersBucket, $filePath, $fileSizeBytes,
            $ipAddress, $consentText,
        ]);
    } catch (PDOException $e) {
        error_log('roiCreateDelivery failed: ' . $e->getMessage());
        return false;
    }
}

function roiFindDeliveryByToken(string $token): ?array {
    $db = getDbConnection();
    if (!$db) return null;

    try {
        $stmt = $db->prepare("SELECT * FROM roi_deliveries WHERE download_token = ? LIMIT 1");
        $stmt->execute([$token]);
        $row = $stmt->fetch();
        return $row ?: null;
    } catch (PDOException $e) {
        error_log('roiFindDeliveryByToken failed: ' . $e->getMessage());
        return null;
    }
}

/**
 * Markiert die Zeile als heruntergeladen. Idempotent: gibt bei jedem Aufruf zurück, ob
 * DIES der erste (echte) Download war — nur dann darf die Termin-Einladung verschickt werden.
 */
function roiMarkDownloaded(string $token): bool {
    $db = getDbConnection();
    if (!$db) return false;

    try {
        $stmt = $db->prepare("
            UPDATE roi_deliveries
            SET downloaded_at = CURRENT_TIMESTAMP
            WHERE download_token = ? AND downloaded_at IS NULL
        ");
        $stmt->execute([$token]);
        return $stmt->rowCount() > 0; // true nur beim allerersten Download
    } catch (PDOException $e) {
        error_log('roiMarkDownloaded failed: ' . $e->getMessage());
        return false;
    }
}

function roiMarkBookingInviteSent(string $token): bool {
    $db = getDbConnection();
    if (!$db) return false;
    try {
        $stmt = $db->prepare("
            UPDATE roi_deliveries SET booking_invite_sent_at = CURRENT_TIMESTAMP
            WHERE download_token = ? AND booking_invite_sent_at IS NULL
        ");
        $stmt->execute([$token]);
        return $stmt->rowCount() > 0;
    } catch (PDOException $e) {
        error_log('roiMarkBookingInviteSent failed: ' . $e->getMessage());
        return false;
    }
}

/** Noch nicht abgeholte, noch nicht abgelaufene Lieferungen, für die Erinnerung 1 fällig ist. */
function roiFindDueForReminder1(int $hoursSinceReady): array {
    $db = getDbConnection();
    if (!$db) return [];
    try {
        $stmt = $db->prepare("
            SELECT * FROM roi_deliveries
            WHERE downloaded_at IS NULL
              AND reminder_1_sent_at IS NULL
              AND expires_at > CURRENT_TIMESTAMP
              AND ready_email_sent_at <= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL ? HOUR)
        ");
        $stmt->execute([$hoursSinceReady]);
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log('roiFindDueForReminder1 failed: ' . $e->getMessage());
        return [];
    }
}

/** Noch nicht abgeholte, noch nicht abgelaufene Lieferungen, für die Erinnerung 2 (letzte) fällig ist. */
function roiFindDueForReminder2(int $hoursSinceReady): array {
    $db = getDbConnection();
    if (!$db) return [];
    try {
        $stmt = $db->prepare("
            SELECT * FROM roi_deliveries
            WHERE downloaded_at IS NULL
              AND reminder_1_sent_at IS NOT NULL
              AND reminder_2_sent_at IS NULL
              AND expires_at > CURRENT_TIMESTAMP
              AND ready_email_sent_at <= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL ? HOUR)
        ");
        $stmt->execute([$hoursSinceReady]);
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log('roiFindDueForReminder2 failed: ' . $e->getMessage());
        return [];
    }
}

function roiMarkReminderSent(string $token, int $reminderNumber): bool {
    $db = getDbConnection();
    if (!$db) return false;
    $column = $reminderNumber === 1 ? 'reminder_1_sent_at' : 'reminder_2_sent_at';
    try {
        $stmt = $db->prepare("UPDATE roi_deliveries SET {$column} = CURRENT_TIMESTAMP WHERE download_token = ?");
        return $stmt->execute([$token]);
    } catch (PDOException $e) {
        error_log('roiMarkReminderSent failed: ' . $e->getMessage());
        return false;
    }
}

/** Abgelaufene Dateien von der Platte löschen und die DB-Zeile entsprechend markieren (roi-reminder-cron.php). */
function roiFindExpiredNotYetPurged(): array {
    $db = getDbConnection();
    if (!$db) return [];
    try {
        $stmt = $db->prepare("
            SELECT * FROM roi_deliveries
            WHERE expires_at <= CURRENT_TIMESTAMP AND file_path <> ''
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log('roiFindExpiredNotYetPurged failed: ' . $e->getMessage());
        return [];
    }
}

function roiClearFilePath(string $token): bool {
    $db = getDbConnection();
    if (!$db) return false;
    try {
        $stmt = $db->prepare("UPDATE roi_deliveries SET file_path = '' WHERE download_token = ?");
        return $stmt->execute([$token]);
    } catch (PDOException $e) {
        error_log('roiClearFilePath failed: ' . $e->getMessage());
        return false;
    }
}
