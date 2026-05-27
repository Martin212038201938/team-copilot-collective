# SEO-Status-Log

Append-only Log. Jeder Eintrag = ein Cron-Lauf oder manuelle Status-Aufnahme. Neueste Einträge oben.

Zugriffsregel: Cron-Jobs schreiben einen neuen Eintrag am ANFANG der Logs-Sektion. Letzter Eintrag bleibt für historische Trends erhalten. Datei wird nie überschrieben, nur erweitert.

---

## Logs

### 2026-05-27 — Urlaubs-Notiz (manuell)

**User-Urlaub:** Mo 02.06. — Mo 09.06. (Rechner ausgeschaltet, Cowork-App geschlossen).

**Auswirkung auf Cron-Jobs:**
- `websiten-health-check` (täglich 09:53): pausiert ohne Daten in der Zeit, läuft beim ersten Start nach Urlaub einmal nach.
- `copilotenschule-seo-weekly-audit` (Mo 10:00): geplanter Lauf 01.06. fällt in den Urlaub, wird beim Start am 09.06. nachgeholt → erster echter Audit-Lauf danach: Mo 09.06.
- `copilotenschule-seo-monthly-review` (2. Mittwoch 10:30): nächster Lauf 10.06. — nach Urlaub, läuft regulär.

**Erwartung beim Wiederaufnehmen am 09.06.:**
- Daily-Check liefert beim Start einen Snapshot
- Weekly-Audit liefert ggf. zeitgleich einen Bericht
- Beide schreiben unabhängig in `seo-status-log.md`
- Erster Monthly-Review am Mi 10.06. — gründlicher Review aller Werte seit dem 27.05.

**Keine geplanten Pushes während Urlaub.** Bei Hotfix-Bedarf: User entscheidet manuell.

---

### 2026-05-27 — Initialer Eintrag (manuell)

**Quelle:** Snapshot-Bericht `seo-stand-2026-05-27.md`

**Phase:** Phase 1 — Stabilisierung & Beobachtung gestartet

**Audit:**
- Sitemap URLs: 71
- SSR-Audit: ✅ 31 / 🟡 2 / 🔴 38
- Title-Suffix-Duplikate: 0
- Sitemap-`lastmod`-Verteilung: Nov 2025 – Mai 2026, 0 URLs auf TODAY

**GSC:**
- Indexiert / nicht indexiert: 38 / 49 (Stand 22.05.)
- Top-Klick-Bringer (3 Monate): „copilot in excel aktivieren" 8 Klicks Pos 8.2
- Sleeper-Top: „copilot training" 473 Impressionen Pos 15.2

**Veränderungen seit letztem Log:**
- 3 Deploys (Commits `e00b94c`, `29b64f2`, `60e0830`)
- react-helmet-async auf 1.3.0
- Title-Suffix-Defense in SEOHead
- Sitemap-lastmod aus echten Daten

**Nächster automatischer Lauf:** Montag 01.06.2026, 07:30 (Cron `weekly-seo-audit`)

**Beobachtungs-Auftrag bis dahin:**
- Verhalten der GSC-Indexierung nach Sitemap-Update beobachten
- Keine Code-Pushes, außer kritische Hotfixes
- ProvenExpert-Profil-Anlage (D1) kann manuell parallel erfolgen

---

<!-- Neue Einträge oben einfügen, alte unten lassen. Cron-Jobs schreiben automatisch. -->
