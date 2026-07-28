-- Cache für die automatische Unternehmensrecherche.
--
-- Kostenbremse: Pro Domain wird höchstens einmal recherchiert; alle weiteren Anfragen
-- derselben Firma (typisch: mehrere Personen aus demselben Unternehmen) werden aus dem
-- Cache bedient und verursachen weder HTTP- noch OpenAI-Kosten.
--
-- Auch NEGATIVE Ergebnisse werden gecacht (found = 0). Sonst würde jede Anfrage einer
-- Firma ohne brauchbare Website denselben erfolglosen Aufwand erneut auslösen.

CREATE TABLE IF NOT EXISTS roi_company_research (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    domain            VARCHAR(190) NOT NULL UNIQUE,
    company_name      VARCHAR(120) NULL,
    industry          VARCHAR(60)  NULL,
    summary           TEXT         NULL,
    -- Logo als Data-URL, damit der Browser es ohne CORS-Probleme in die PPTX einbetten kann.
    logo_data_url     MEDIUMTEXT   NULL,
    logo_source_url   VARCHAR(500) NULL,
    -- 0 = nichts Brauchbares gefunden (negativer Cache)
    found             TINYINT(1)   NOT NULL DEFAULT 0,
    -- 'website' = nur kostenloses Scraping, 'website+ai' = zusätzlich ein OpenAI-Aufruf
    source            VARCHAR(20)  NOT NULL DEFAULT 'website',
    ai_tokens_in      INT          NULL,
    ai_tokens_out     INT          NULL,
    fetched_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at        DATETIME     NOT NULL,

    INDEX idx_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
