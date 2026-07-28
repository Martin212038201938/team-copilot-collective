-- ROI-Business-Case-Generator: Kontextangaben aus dem erweiterten Formular.
--
-- Diese Spalten sind reine Kontext-/Lead-Daten. Sie fließen NICHT in die ROI-Berechnung ein
-- (src/lib/roi/calculate.ts bleibt unverändert) und steuern auch nicht, welche Folien erzeugt
-- werden – die Präsentation bleibt standardisiert und wird lediglich personalisiert.
--
-- Nachträglich ausführbar auf einer bereits bestehenden roi_deliveries-Tabelle.

ALTER TABLE roi_deliveries
    ADD COLUMN contact_name      VARCHAR(80)  NULL AFTER company_name,
    ADD COLUMN contact_role      VARCHAR(80)  NULL AFTER contact_name,
    -- Gesamtzahl Microsoft-365-Nutzer (Copilot-Chat-Basis); copilot_licenses = Rechengröße.
    ADD COLUMN m365_users        INT          NULL AFTER contact_role,
    ADD COLUMN copilot_licenses  INT          NULL AFTER m365_users,
    ADD COLUMN industry          VARCHAR(40)  NULL AFTER copilot_licenses,
    -- Mehrfachauswahl, mit "|" getrennt gespeichert (kleine, feste Werteliste).
    ADD COLUMN goals             VARCHAR(255) NULL AFTER industry,
    ADD COLUMN adoption_stage    VARCHAR(40)  NULL AFTER goals,
    -- Platzhalter für die automatische Unternehmensrecherche (eigener Arbeitsstrang):
    -- Kurzprofil aus öffentlichen Quellen und Logo-URL von der Unternehmenswebsite.
    -- Bleibt leer, wenn nichts Belastbares gefunden wird – dann erscheint auch kein Platzhalter.
    ADD COLUMN research_summary  TEXT         NULL AFTER adoption_stage,
    ADD COLUMN logo_url          VARCHAR(500) NULL AFTER research_summary;
