-- ROI-Business-Case-Generator: Tabelle für den "echten" Honeypot-Flow.
-- Ein Datensatz entsteht erst, NACHDEM die fertige PowerPoint clientseitig erzeugt und
-- serverseitig gespeichert wurde (siehe api/roi-deliver.php) — es gibt also nie eine
-- "leere" Zeile, für die schon eine Mail verschickt wurde, aber keine Datei existiert.
--
-- Erinnerungs-Kadenz (api/roi-reminder-cron.php):
--   T0        ready_email_sent_at   -> "Ihre PowerPoint ist fertig" (Download-Link)
--   T0 + 24h  reminder_1_sent_at    -> Erinnerung 1, nur falls noch nicht abgeholt
--   T0 + 48h  reminder_2_sent_at    -> Erinnerung 2 (letzte), nur falls noch nicht abgeholt
--   Download  downloaded_at + booking_invite_sent_at -> keine weiteren Erinnerungen mehr,
--             stattdessen einmalig Termin-Einladung (Plausibilitätsprüfung mit Martin).

CREATE TABLE IF NOT EXISTS roi_deliveries (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    download_token          VARCHAR(64) NOT NULL UNIQUE,
    email                   VARCHAR(255) NOT NULL,
    company_name            VARCHAR(80) NULL,
    users_bucket            VARCHAR(20) NULL,           -- z.B. "13-50" — keine Finanzwerte, siehe Konzept Abschnitt 16.4
    file_path               VARCHAR(500) NOT NULL,      -- absoluter Pfad AUSSERHALB des FTP-Mirror-Docroots
    file_size_bytes         INT NOT NULL,
    ip_address              VARCHAR(64) NULL,
    consent_text            TEXT NULL,

    ready_email_sent_at     DATETIME NULL,
    reminder_1_sent_at      DATETIME NULL,
    reminder_2_sent_at      DATETIME NULL,
    downloaded_at           DATETIME NULL,
    booking_invite_sent_at  DATETIME NULL,

    expires_at              DATETIME NOT NULL,
    created_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_reminder_scan (downloaded_at, expires_at, created_at),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
