# SEO-Projektplan copilotenschule.de

**Lebende Doku** — wird bei jedem Schritt aktualisiert. Cron-Jobs lesen diese Datei, entscheiden auf Basis der if/then-Logik, schreiben ins [`seo-status-log.md`](seo-status-log.md).

**Letzter Update:** 10. Juni 2026 (Monatsreview — Bericht: `seo-monatsreview-2026-06.md`)

---

## Zielbild (Definition of Done für das Gesamtprojekt)

Diese 8 Messwerte gelten als „erfüllt" für den Block aus dem ursprünglichen Maßnahmenkatalog:

1. Indexierungsquote (GSC) ≥ **90 %** (Stand 27.05.: 44 %)
2. SSR-Audit „vollständig kaputt" 🔴 ≤ **5** URLs (Stand: 38)
3. SEO-Score laut Health Check ≥ **75 / 100** (Stand: 42)
4. GEO-Score stabil ≥ **80 / 100** (Stand: 82 — gewahrt)
5. Top-3-Klick-Bringer aus GSC: ≥ **5 verschiedene URLs** (Stand: 12 Queries, aber konzentriert auf wenige Pages)
6. „Microsoft Copilot Training Empfehlung beste Anbieter Deutschland 2026" in Top 3 (Stand: ~#7, Hub-Artikel B2 wartet auf Pre-Render-Fix)
7. Externer Listicle-Erwähnung (mod-education / ki-trainingszentrum / cmt) ≥ **1**
8. ProvenExpert-Profil mit ≥ **15 Bewertungen**

---

## Maßnahmen-Übersicht (Status pro Maßnahme)

Aus dem ursprünglichen Maßnahmenkatalog [`seo-massnahmenkatalog-2026-05-27.md`](seo-massnahmenkatalog-2026-05-27.md):

| Code | Maßnahme | Status |
|---|---|---|
| A1 | Pre-Rendering-Audit | ✅ erledigt 27.05. (`outputs/audit-live.sh`, baseline-log: `seo-audit-2026-05-27.md`) |
| A2 | Pre-Render-Fix (Helmet-Downgrade) | ✅ erledigt — 71/72 ✅, 0 🔴 (bestätigt 01.06.) |
| A2.1 | Pre-Render-Iteration (concurrency:1) | ✅ erledigt 27.05. — nicht mehr nötig (0 🔴) |
| A3 | Title-Suffix-Duplikat | ✅ erledigt 27.05. (5 → 0) |
| A4 | Sitemap/reactSnap/Routes sync | ✅ erledigt 27.05. (validate-seo erweitert) |
| A4.1 | Sitemap-lastmod aus echten Daten | ✅ erledigt 27.05. (Shallow-Clone-Fix) |
| A5 | IndexNow im Deploy automatisieren | ✅ erledigt 27.05. (bereits in deploy.yml) |
| B1 | Protected-Pages-Liste | ✅ erledigt 27.05. (`docs/protected-pages.md`) |
| B2 | Hub-Artikel Anbieter-Vergleich | ✅ aktiviert 09.06. — Pre-Render bestätigt (HTTP 200, volles Schema), 2 interne Links ergänzt, IndexNow-Ping (`/wissen/copilot-schulungsanbieter-deutschland-vergleich`) |
| B3a | Hub-Artikel EU AI Act August 2026 | ⏳ Entwurf erstellt 09.06. (`docs/drafts/eu-ai-act-mitarbeiter-schulung-august-2026.tsx.md`) — wartet auf User-Review + Live-Schaltung |
| B3b | Hub-Artikel QCG-Förderung | 🔵 offen |
| B3c | Hub-Artikel Inhouse-Schulung | 🔵 offen |
| B4 | Trust-Signal-Block Homepage | 🔵 offen (Logo-Freigaben Kunden) |
| C1 | PageSpeed-API-Quota lösen | 🔵 offen |
| C2 | Cache-Control für Assets | 🔵 offen |
| C3 | Sitemap-Generator erweitern | ✅ erledigt 27.05. (Teil von A4) |
| C4 | Schema.org-Konsolidierung | 🔵 offen |
| D1 | ProvenExpert-Profil | 🔵 offen (lange Aufholzeit) |
| D2 | DACH-Weiterbildungsverzeichnisse | 🔵 offen |
| D3 | Listicle-Outreach | 🔵 offen |
| D4 | IHK-Bildungsverzeichnis | 🔵 offen |
| D5 | Yellow-Boat-Gastartikel | 🔵 offen |
| E | Monitoring (täglich) | ✅ läuft (GSC-basiert, scheduled task `websiten-health-check`) |

---

## Phasen-Plan mit if/then-Logiken

### Phase 1 — Stabilisierung & Beobachtung (Woche 28.05. – 04.06.)

**Ziel:** Wirkung der heutigen 3 Deploys messen, ohne weitere Eingriffe.

**Maßnahmen:**
- Nichts pushen außer bei kritischen Fehlern
- Wöchentlicher Audit am Montag 02.06. (automatisch via Cron `weekly-seo-audit`)
- Tägliche Health-Checks via vorhandenem Cron `websiten-health-check`
- D1 vorbereiten: ProvenExpert-Profil anlegen (off-page, kein Code-Risiko)

**Exit-Kriterien (Cron prüft Mo. 02.06.):**

- **IF** SSR-Audit ✅ ≥ 50 (von 71) → Helmet-Downgrade hat geholfen, A2-Iteration ist niedrige Priorität → weiter zu Phase 3 (Content-Block)
- **ELSE IF** SSR-Audit ✅ zwischen 35 und 49 → leichter Fortschritt aber nicht ausreichend → Phase 2 (A2-Iteration)
- **ELSE** SSR-Audit ✅ ≤ 34 (= Status quo oder Verschlechterung) → Race-Condition besteht weiter → Phase 2 (A2-Iteration) mit höherer Priorität

Außerdem:
- **IF** GSC zeigt Indexierungsquote ≥ 55 % am 02.06. → Sitemap-Korrektur greift positiv
- **IF** GSC zeigt Indexierungsquote ≤ 40 % → Re-Indexierungs-Trigger nötig (IndexNow-Massenping)

---

### Phase 2 — A2-Iteration (Woche 04.06. – 11.06.)

**Trigger:** Phase 1 Exit-Kriterien ergeben „A2-Iteration nötig".

**Maßnahme:** In `package.json` → `reactSnap` einfügen: `"concurrency": 1`. Sequenzielle Snapshots verhindern Race-Condition. Plus optional `puppeteer.timeout: 60000` (großzügigeres Timeout pro Page).

**Vorgehen:**
1. Branch `seo/a2-iteration-concurrency` erstellen (lokal, nicht direkt main)
2. Änderung committen: nur `package.json`
3. Push auf main (kein PR-Workflow im aktuellen Setup)
4. CI baut + deployed
5. Audit nach 30 min (Cron-getriggert oder manuell)

**Exit-Kriterien (Cron prüft 1 Woche nach Deploy):**

- **IF** SSR-Audit ✅ ≥ 65 (von 71) → A2 final erledigt → weiter zu Phase 3 (Content-Block) + A5 (IndexNow im Deploy)
- **ELSE IF** SSR-Audit ✅ 50–64 → Verbesserung, aber nicht final → Phase 2b (Wechsel zu modernem Pre-Renderer)
- **ELSE** SSR-Audit ✅ ≤ 49 → reactSnap-Engine ist nicht zu retten → Phase 2b (Wechsel)

### Phase 2b — Pre-Renderer-Wechsel (nur wenn 2 nicht reicht)

**Trigger:** Phase 2 hat das Problem nicht gelöst.

**Maßnahme:** `react-snap` durch `vite-plugin-prerender` oder `@prerenderer/renderer-puppeteer` ersetzen. Moderner, React-18-kompatibel, aktiv gepflegt.

Aufwand: ca. 1 Tag. Höheres Risiko, weil Build-Pipeline-Änderung. Erst bei klarem Bedarf angehen.

---

### Phase 3 — Content-Block (Wochen ab 11.06., parallel)

**Trigger:** Pre-Render-Fix wirkt (≥ 50 ✅) oder Race-Condition akzeptiert.

**Maßnahmen in Reihenfolge:**

1. **B3a — Hub-Artikel EU AI Act August 2026** (zeitkritisch wegen Deadline 02.08.2026)
2. **A5 — IndexNow im Deploy automatisieren** (kleine Infrastruktur-Verbesserung)
3. **D1 — ProvenExpert-Profil** ausbauen (sollte schon laufen aus Phase 1)
4. **B3b — Hub-Artikel QCG-Förderung**
5. **B3c — Hub-Artikel Inhouse-Schulung buchen**
6. **B4 — Trust-Signal-Block Homepage** (sobald Logo-Freigaben da)
7. **D2 — DACH-Verzeichnisse**

Pro Hub-Artikel: vorher CLAUDE.md-Pflichtcheckliste ausführen (Route + reactSnap + Sitemap + articles.ts). Nach Go-Live IndexNow-Ping.

**Exit-Kriterien (monatlicher Review):**

- **IF** B3a + B3b + B3c live UND GSC zeigt Impressionen für „EU AI Act Schulungspflicht" + „QCG Förderung" + „Inhouse Schulung buchen" → Content-Block erfolgreich
- **IF** B3a live, B3b/B3c noch offen → Tempo OK, weiter
- **IF** keiner der B3-Artikel nach 4 Wochen live → Blocker im Workflow, eskalieren

---

### Phase 4 — Off-Page & Trust (Wochen ab 25.06., parallel zu Phase 3)

**Maßnahmen:**

1. **D3 — Listicle-Outreach** an mod-education / ki-trainingszentrum / cmt (Anschreiben-Vorlagen im Strategie-Papier vom 25.05.)
2. **D4 — IHK Nord Westfalen ansprechen**
3. **D5 — Yellow-Boat-Gastartikel** mit Backlink

**Erfolgs-Indikator:**
- Externe Erwähnung in mindestens einem der drei Listicles innerhalb 8 Wochen

---

## Wenn-Situation X eintritt — Sofort-Reaktionen

| Situation | Trigger-Bedingung | Was ich tue |
|---|---|---|
| Ranking-Drop einer Protected Page | Position fällt > 3 Plätze auf einem getrackten Keyword | Sofort-Audit der URL (live + dist-HTML). Bei Title-/Meta-Änderung → `git revert` der letzten Änderung an dieser TSX. |
| Indexierungsquote fällt ≥ 5 Pp. ggü. 7-Tage-Schnitt | GSC zeigt plötzlich weniger indexierte Seiten | Robots.txt prüfen, IndexNow-Massenping, Sitemap erneut einreichen. |
| Apache 5xx-Fehler / Site nicht erreichbar | Daily-Check meldet Verfügbarkeit FAIL | AlwaysData-Status prüfen, Hosting kontaktieren. |
| Build im CI fehlgeschlagen | GitHub Action zeigt rot | Logs lesen, lokal reproduzieren, fixen. Hotfix-Push erlaubt (eine Datei, klare Message). |
| GSC verliert Zugriff (Property-Issue) | GSC-Skript meldet 403/401 | User informieren, manuell verifizieren. Bis Klärung: audit-live.sh als alleiniger Indikator. |
| Mehr als 30 % der Sitemap-URLs auf `<lastmod>TODAY</lastmod>` | Wöchentlicher Audit findet Massen-Update-Optik | `git log`-Logik defekt → Fallback-Map in `generate-sitemap.js` greift nicht → Diagnose nötig. |

---

## Wichtige Quellen (für Cron-Jobs als Referenz)

- **Maßnahmenkatalog:** `docs/seo-massnahmenkatalog-2026-05-27.md` — Word + Markdown
- **Strategie-Papier „Beste Anbieter":** `~/Documents/Cowork Bereich/website-health-check/strategie-beste-anbieter-2026-05-25.md`
- **Protected Pages:** `docs/protected-pages.md`
- **Audit-Script:** `outputs/audit-live.sh` (Repo-Root: `team-copilot-collective`)
- **Audit-Baseline-Log:** `docs/seo-audit-2026-05-27.md`
- **CLAUDE.md des Projekts:** `CLAUDE.md` — Pflicht-Checkliste für neue Seiten
- **Health-Check-Config:** `~/Documents/Cowork Bereich/website-health-check/config.json` v2.0
- **Daily-Check-Prompt:** `~/Documents/Cowork Bereich/website-health-check/SCHEDULED-TASK-PROMPT.md`

---

## Aktive Cron-Jobs (Autopilot)

Diese Cron-Jobs erledigen die Roadmap weitgehend autonom. Jeder einmalige Cron prüft beim Lauf seine Vorbedingung — wenn die noch nicht erfüllt ist, schiebt er sich um 14 Tage. Alle Drafts landen in `docs/drafts/` oder `docs/outreach/` — Pushen + Versenden bleibt User-Aufgabe.

| Cron-ID | Schedule | Maßnahme | Auto-Aktion bei Lauf |
|---|---|---|---|
| `copilotenschule-seo-weekly-audit` | jeden Mo 10:00 (wiederkehrend) | Monitoring | Audit + Status-Log + if/then aus Plan |
| `copilotenschule-seo-monthly-review` | 2. Mi 10:30 (wiederkehrend) | Großer Review | Definition-of-Done-Tabelle + Plan-Anpassung |
| `copilotenschule-seo-phase-conductor` | 1.+3. Mi 11:00 (wiederkehrend) | Orchestrierung | Prüft alle Maßnahmen, schiebt fehlende Crons nach, schließt Roadmap ab |
| `copilotenschule-seo-d1-provenexpert-reminder` | Mi 10.06. 14:00 | D1 ProvenExpert | Reminder + Anleitung |
| `copilotenschule-seo-a2-iteration-prep` | Do 11.06. 10:30 | A2 concurrency:1 | Code-Diff in `docs/drafts/a2-iteration-diff.md`, wenn nötig |
| `copilotenschule-seo-b3a-eu-ai-act-draft` | Mo 15.06. 10:30 | B3a EU AI Act Hub | TSX-Entwurf in `docs/drafts/` |
| `copilotenschule-seo-d3-listicle-outreach` | Mo 22.06. 10:30 | D3 Listicle-Outreach | 3 Mail-Entwürfe in `docs/outreach/` |
| `copilotenschule-seo-b3b-b3c-hubs-draft` | Mo 06.07. 10:30 | B3b QCG + B3c Inhouse | 2 TSX-Entwürfe |
| `copilotenschule-seo-b4-trust-signals-prep` | Mo 20.07. 10:30 | B4 Trust-Signal Block | Logo-Freigabe-Workflow oder Code-Entwurf |
| `websiten-health-check` | täglich 09:53 (vorhanden) | Tägliches Monitoring | GSC-Snapshot, Indexierung, Tracking-Keywords |
| `copilotenschule-seo-clarity-fix-copilot-in-outlook-nutzen-tipps` | Di 17.06. 10:30 | Anti-Pattern-Fix | Dead-Click-Fix-Diff (lucide-x + backdrop-blur) in `docs/drafts/` |
| `copilotenschule-seo-pattern-transfer-2026-06-24` | Mi 24.06. 10:30 | Best-Practice-Transfer | Content→Angebot-CTA-Brücke als Code-Diff in `docs/drafts/` |

**Wenn Cron-Job läuft, aber Vorbedingung nicht erfüllt:** Er schiebt sich um 14 Tage auf einen Retry-Cron mit `-retry`-Suffix, deaktiviert sich selbst. Conductor erkennt das beim nächsten Lauf und entscheidet weiter.

**Conductor-Sicherheitsnetz:** Falls eine Maßnahme aus der Tabelle keinen aktiven Cron mehr hat (z. B. weil ein Cron sich nach 3 Retries ohne Erfolg deaktiviert), legt der Conductor beim nächsten Lauf einen neuen für 7 Tage in der Zukunft an.

## Plan-Abschluss-Bedingungen

Der Conductor deaktiviert sich selbst, sobald **alle 8 Definition-of-Done-Kriterien** aus dem Zielbild erreicht sind. Bis dahin läuft das System weiter, ohne dass du daran denken musst.

Wenn der Conductor sich deaktiviert: ein letzter „Abschluss-Review"-Bericht wird in `docs/seo-abschluss-review.md` geschrieben.

## Update-Konvention

Wenn dieser Plan aktualisiert wird:
- Datum oben aktualisieren („Letzter Update")
- Eintrag in der Maßnahmen-Tabelle (Status auf ✅/⚠️/⏳/🔵 ändern)
- Bei Phasen-Wechsel: aktive Phase oben hervorheben
- Bei strukturellen Plan-Änderungen: Notiz im `seo-status-log.md`
- Bei Cron-Anlage/Deaktivierung: Cron-Tabelle oben aktualisieren

Aktuelle Phase: **Phase 3 — Content-Block** (Phase 1 Exit-Kriterium erfüllt 01.06.2026: SSR ✅ 71 ≥ 50)

**Monatsreview-Update 10.06.2026:** Phase 3 bleibt aktiv, kein Wechsel. DoD-Score 4/8 (von 2–3). Wichtigster neuer Befund: Funnel-Totalbruch Content→Angebot (Stufe 1→2 = 0 %) → Issue „Funnel-Optimierung gesamtsystemisch" eröffnet, Pattern-Transfer-Cron 24.06. adressiert ihn. B2-Hub rankt #1 für die Strategie-Abfrage (DoD #6 wahrscheinlich erfüllt). Dead-Click eskaliert (21,4 %), Fix-Cron 17.06. **Hinweis an Phase-Conductor (17.06.):** C4 (Schema-Konsolidierung) jetzt vorziehen — zahlt auf die größte DoD-Lücke #3 (SEO-Score 42) und auf den Indexierungs-Stau (#1) ein.
