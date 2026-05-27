# SEO-Status-Log

Append-only Log. Jeder Eintrag = ein Cron-Lauf oder manuelle Status-Aufnahme. Neueste Einträge oben.

Zugriffsregel: Cron-Jobs schreiben einen neuen Eintrag am ANFANG der Logs-Sektion. Letzter Eintrag bleibt für historische Trends erhalten. Datei wird nie überschrieben, nur erweitert.

---

## Logs

### 2026-05-27 — A2-Iteration + IndexNow + GSC-Submit (manuell, vor Urlaub)

**Auslöser:** Weekly-Audit-Cron vom selben Tag hat empfohlen: „31 ≤ 34 → Phase 2 (A2-Iteration) mit höherer Priorität". User hat entschieden, vor Urlaub durchzuziehen, damit der Fix die ganze Urlaubs-Woche durch wirken kann.

**Aktionen heute:**
1. **IndexNow-Massenping** an Bing/Yandex/Seznam: alle 71 Sitemap-URLs in einem Request → HTTP 200 ✅
2. **GSC Sitemap-Re-Submission** über `sc-domain:copilotenschule.de`: `https://copilotenschule.de/sitemap.xml` erneut eingereicht, Eingereicht-Datum aktualisiert auf 27.05.2026 ✅
3. **A2-Iteration in package.json:** `"concurrency": 1` zum reactSnap-Block hinzugefügt. Sequenzielle Snapshots verhindern die React-18 Race-Condition.

**Erwartung nach Deploy:**
- SSR-Audit ✅ steigt von 31 auf ≥ 60/71
- Race-Condition (Pages rotieren zwischen ✅ und 🔴) verschwindet
- Wirkungsmessung läuft 1 Woche autonom, erster Audit nach Urlaub: Di 09.06.

**Konsequenz für die Cron-Roadmap:** Wenn am 09.06. der Weekly-Audit zeigt ✅ ≥ 50 → Phase 1 abgehakt, Phase 3 startet. Der `a2-iteration-prep`-Cron für Do 11.06. erkennt das in Schritt 1 und überspringt sich.

**Nächster Push erwartet erst nach Urlaub** — keine Code-Änderungen während User offline.

---

### 2026-05-27 — Cron-System für komplette Roadmap aufgesetzt (manuell)

**7 neue Scheduled Tasks angelegt** (alle Werktag, nach 10:00):

| Cron-ID | Schedule | Zweck |
|---|---|---|
| `copilotenschule-seo-weekly-audit` | jeden Mo 10:00 | Monitoring + if/then aus Plan |
| `copilotenschule-seo-monthly-review` | 2. Mi 10:30 | Großer Stand-vs-Ziel-Vergleich |
| `copilotenschule-seo-phase-conductor` | 1.+3. Mi 11:00 | Orchestrierung der Roadmap |
| `copilotenschule-seo-d1-provenexpert-reminder` | Mi 10.06. 14:00 | D1 ProvenExpert anlegen (Reminder) |
| `copilotenschule-seo-a2-iteration-prep` | Do 11.06. 10:30 | A2 concurrency:1 (Code-Diff) |
| `copilotenschule-seo-b3a-eu-ai-act-draft` | Mo 15.06. 10:30 | B3a EU AI Act Hub (TSX-Entwurf) |
| `copilotenschule-seo-d3-listicle-outreach` | Mo 22.06. 10:30 | D3 Listicle-Mails (Entwürfe) |
| `copilotenschule-seo-b3b-b3c-hubs-draft` | Mo 06.07. 10:30 | B3b QCG + B3c Inhouse-Hubs |
| `copilotenschule-seo-b4-trust-signals-prep` | Mo 20.07. 10:30 | B4 Trust-Signal Block |

Plus 1 Cron deaktiviert: `copilotenschule-seo-recheck-t30` (alte T30-Iteration, durch das neue System abgelöst).

**Architektur:**
- Conductor (1.+3. Mi) liest Plan und Status, schiebt fehlende Maßnahmen nach, schließt Roadmap ab wenn 8/8 Definition-of-Done erfüllt.
- Maßnahmen-Crons schreiben Drafts in `docs/drafts/` oder `docs/outreach/`. Pushen + Versenden bleibt User-Aufgabe (CLAUDE.md-Regel).
- Bei nicht erfüllter Vorbedingung schiebt sich ein Cron um 14 Tage (Retry-Suffix).
- Definition-of-Done-Tabelle (8 Kriterien) in `seo-projektplan.md`. Conductor deaktiviert sich nach Erreichen.

**Vor Urlaub empfohlen:** für jeden neuen Cron einmal "Run now" klicken → Tool-Permissions vorab speichern → keine Pause auf Berechtigungsdialog während Urlaub.

---

### 2026-05-27 — Wöchentlicher Audit (Cron)

**Phase:** Phase 1 — Stabilisierung & Beobachtung (erster automatisierter Lauf, Phasenstart = heute)

**SSR-Audit:** ✅ 44 Helmet / 🟡 23 Default / 🔴 0 Empty (von 67 überwachten URLs)
_(Hinweis: seo-monitoring/recheck.sh Baseline umfasst 67 URLs; docs/seo-audit-2026-05-27.md verwendet 71 URLs mit strikten Kriterien → 31 ✅ / 2 🟡 / 38 🔴)_

- Neu in 🔴 (Regressions vs 2026-05-18-snapshot): `/impressum`, `/wissen/github-copilot`, `/wissen/copilot-studio`, `/wissen/copilot-fehler-vermeiden`, `/wissen/copilot-sicherheit-datenschutz`, `/wissen/copilot-unternehmensweit-einfuehren`, `/wissen/copilot-roi-erfolgsgeschichten`, `/wissen/copilot-adhs-produktiver-arbeiten`, `/workshops/copilot-strategie-change-management`, `/workshops/keynote-copilot-arbeitswelt`, `/trainings/copilot-grundlagen-prompt-design` (11 URLs)
- Neu in ✅ (vs 2026-05-18-snapshot): `/trainer-werden`, `/training-konfigurator`, `/trainings/train-the-trainer-copilot`, `/trainings/low-code-power-platform`, `/workshops`, `/workshops/betriebsrat-ki-workshop`, `/workshops/bessere-entscheidungen-mit-copilot`, `/wissen/prompt-engineering`, `/wissen/copilot-roi-berechnen`, `/wissen/copilot-training-schulung`, `/wissen/copilot-digitales-gedaechtnis`, `/wissen/copilot-lernreise-vs-tagesschulung`, `/wissen/copilot-hr-use-cases` (13 URLs)

**GSC:** 38 indexiert / 49 nicht indexiert (44 %), Klicks gesamt 332 (3M), Ø Position 10,2
- Top-Klick-Bringer: „copilot in excel aktivieren" 8 Klicks / 797 Impr. · „excel copilot aktivieren" 7 Klicks / 305 Impr. · „microsoft copilot in excel aktivieren" 2 Klicks / 43 Impr. · „ki-halluzinationen vermeiden" 2 Klicks / 21 Impr. · „copilot excel aktivieren" 1 Klick / 232 Impr.
- Trend seit initialem Log (22.05.): Klicks 294 → 332 (+38, +13 %), Impressionen 31.400 → 33.400 (+2.000), Indexiert 34 → 38 (+4)

**Protected Pages:** alle 5 URLs HTTP 200 ✅

**Entscheidung gemäß Plan:** Phase 1, erster Cron-Lauf. Strikte ✅-Zahl gemäß docs/seo-audit: **31 ≤ 34** → „Race-Condition besteht weiter". Empfehlung: **Phase 2 (A2-Iteration mit concurrency:1) mit höherer Priorität**. Kontextnote: dieser Lauf erfolgte am selben Tag wie der A2-Deploy; die Beobachtungswoche hat gerade erst begonnen. Empfehlung beim Urlaubsende (09.06.) prüfen und ggf. Phase-2-Branch anlegen.

**Nächster automatischer Lauf:** Montag 09.06.2026 (erster Montag nach Urlaub)

---

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
