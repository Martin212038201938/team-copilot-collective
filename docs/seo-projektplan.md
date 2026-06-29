# SEO-Projektplan copilotenschule.de

**Lebende Doku** — wird bei jedem Schritt aktualisiert. Cron-Jobs lesen diese Datei, entscheiden auf Basis der if/then-Logik, schreiben ins [`seo-status-log.md`](seo-status-log.md).

**Letzter Update:** 29. Juni 2026 (Weekly-Audit: SSR 67/67 ✅ (0 🔴, DoD #2 stabil), GSC organisch Klicks +23 % W/W (762/3M), Indexierung 55/92 = 59,8 % unverändert (gecrawlt/gefunden-nicht-indexiert konstant 25 — 3. Woche, GSC-Index-Report seit 12.06. nicht neu gecrawlt → A6-Recheck-Cron 30.06.). Erstes Audit mit 5c-Segmentierung: Outbound (email) 21 Sess./7T (~4,7 %, sehr niedrig-engagiert, 0 Conversions), SEA noch nicht gestartet. **Dead-Click re-eskaliert auf 15–17 % (≥10 %-Schwelle), Treiber organisch (globales ArticlePopup, NICHT Kampagne) — Fix-Draft seit 17.06. unverpusht.** Phase 3 bleibt aktiv. Vorher: 24. Juni 2026 — C4-Draft-Cron: Schema-Konsolidierungs-Entwurf erstellt — `docs/drafts/c4-schema-konsolidierung-2026-06-24.md`, C4 → „⏳ Entwurf 24.06.". Kernbefund: doppelte `@id`-Knoten + 404-Logo `og-image.jpg`. Draft-only, kein Push. Phase 3 bleibt aktiv. Vorher: 17. Juni 2026 — Phase-Conductor-Lauf: C1/C2/C4 haben heute die 14-Tage-„vergessen"-Schwelle überschritten (registriert 27.05., ohne Cron). Conductor-Sicherheitsnetz greift → 2 Draft-Crons angelegt: `copilotenschule-seo-c4-schema-konsolidierung-draft` (24.06., Priorität, zahlt auf DoD #1+#3) und `copilotenschule-seo-c1-c2-technik-draft` (09.07., parkiert-technisch). C4/C1/C2 auf „⏳ scheduled". Phase 3 bleibt aktiv, DoD 4/8. Risiko-Hinweis „src/-Änderungen unverpusht" war eine Stale-Narrative und wurde am 29.06. korrigiert: alle Änderungen (CTA-Brücke, B4, Ads-Tracking) sind committet & gepusht/live (git `main`=`origin/main`), kein Push-Stau. Vorher: 16. Juni 2026 — Manuelle Status-Aufnahme „Anschluss-Session": der im Health-Check vom 15.06. gemeldete SSR-Restbug auf 3 /wissen/-Seiten wurde **live verifiziert → Fehlalarm**. `microsoft-copilot-lizenzen` und `copilot-sicherheit-datenschutz` sind vollständig pre-gerendert (Title, Meta, Canonical, Schema, voller Body im Initial-HTML); deckt sich mit Weekly-Audit 15.06. (67/67 ✅, 0 🔴). Konsequenz: **kein Eingriff an gut rankenden Seiten**, stattdessen Pivot zum sicheren additiven Hebel **Index-Coverage** (interne Verlinkung) → neue Maßnahme A6 + Recheck-Cron. Vorher: 11. Juni 2026 — Externer Berater-Review (`seo-berater-review-2026-06-11.md`), SEA-Start KW 25 + Outbound-Mailkampagne.)

---

## 📌 Kampagnen-Status (persistent — relevant für Weekly-Audit Schritt 5c)

**Stand 26.06.2026 (User-bestätigt):**
- **Outbound-Cold-Mail:** ✅ LIVE seit **25.06.2026**, läuft **wochentags**. Versanddomain `copiloten-schule.de`, Landingpages unter `/sml/`. → Ab Audit 29.06. Outbound-Segment (email) vom Organic-Segment trennen; `sml_*`-Events + Smartlead-Funnel auswerten.
- **SEA (Google Ads):** ❌ noch nicht gestartet. → Bei Start utm_medium=cpc segmentieren; SEA-Zielseiten = Trainings/Konfigurator/LPs, NICHT /wissen/.
- **CTA-Brücke (`content_cta_click`):** ✅ live seit 12.06. (Live-Check 26.06. bestätigt). Firings beobachten — 0 über 7T trotz 2 Wochen live = Klick- oder Tracking-Lücke prüfen.

*Der ursprüngliche Skill-Kontext „SEA + Outbound ab KW 25" war verfrüht; maßgeblich ist dieser Block. Verlauf/Details: `clarity-insights.md`.*

---

## Zielbild (Definition of Done für das Gesamtprojekt)

Diese 8 Messwerte gelten als „erfüllt" für den Block aus dem ursprünglichen Maßnahmenkatalog:

1. Indexierungsquote (GSC) ≥ **90 %** (Stand 27.05.: 44 %)
2. SSR-Audit „vollständig kaputt" 🔴 ≤ **5** URLs (Stand 27.05.: 38 → **0 🔴 am 15.+16.06., live verifiziert → ✅ ERFÜLLT**)
3. SEO-Score laut Health Check ≥ **75 / 100** (Stand: 42)
4. GEO-Score stabil ≥ **80 / 100** (Stand: 82 — gewahrt)
5. Top-3-Klick-Bringer aus GSC: ≥ **5 verschiedene URLs** (Stand: 12 Queries, aber konzentriert auf wenige Pages)
6. „Microsoft Copilot Training Empfehlung beste Anbieter Deutschland 2026" in Top 3 (Hub-Artikel B2 live + pre-gerendert, rankt lt. Monatsreview 10.06. #1 → **wahrscheinlich erfüllt**, GSC-Bestätigung ausstehend)
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
| A6 | Interne Verlinkung für Index-Coverage (rein additiv, kein Eingriff in Bestandsinhalte) | ⏳ Entwurf 16.06. (`docs/drafts/index-coverage-interne-verlinkung-2026-06-16.md`) — baut auf „Track 1" (09.06.) auf, adressiert „gecrawlt/gefunden – nicht indexiert"; Recheck via Cron 30.06. |
| B1 | Protected-Pages-Liste | ✅ erledigt 27.05. (`docs/protected-pages.md`) |
| B2 | Hub-Artikel Anbieter-Vergleich | ✅ aktiviert 09.06. — Pre-Render bestätigt (HTTP 200, volles Schema), 2 interne Links ergänzt, IndexNow-Ping (`/wissen/copilot-schulungsanbieter-deutschland-vergleich`) |
| B3a | Hub-Artikel EU AI Act August 2026 | ✅ LIVE seit 10.06. (HTTP 200, GSC-Indexierung beantragt). 11.06.: Kannibalisierungs-Fix ggü. `/wissen/ki-schulung-mitarbeiter-pflicht` in src/ (Querverlinkung + Intent-Trennung) — wartet auf Push |
| B3b | Hub-Artikel QCG-Förderung | 🔵 offen |
| B3c | Hub-Artikel Inhouse-Schulung | 🔵 offen |
| B4 | Trust-Signal-Block Homepage | ✅ in src/ umgesetzt 11.06. (`CustomerLogos.tsx`, Text-Fallback ohne Logo-Freigaben — User-Entscheidung; eingebaut in Index.tsx + UeberUns.tsx). Wartet auf User-Push. B4-Cron 20.07. = Verifikationslauf |
| C1 | PageSpeed-API-Quota lösen | ⏳ scheduled — Draft-Cron `copilotenschule-seo-c1-c2-technik-draft` (09.07.) |
| C2 | Cache-Control für Assets | ⏳ scheduled — Draft-Cron `copilotenschule-seo-c1-c2-technik-draft` (09.07.) |
| C3 | Sitemap-Generator erweitern | ✅ erledigt 27.05. (Teil von A4) |
| C4 | Schema.org-Konsolidierung | ⏳ Entwurf 24.06. (`docs/drafts/c4-schema-konsolidierung-2026-06-24.md`) — Befund: doppelte/konfligierende `@id`-Knoten (`#martin-lang`, `#organization`), `www`/non-`www`-Mismatch, **veraltetes 404-Logo `og-image.jpg`** (Rest der 09.06.-Teilerledigung). Diff-Plan in 3 Pässen, Protected Pages in Pass 1 ausgespart. Nächster Schritt: User-Review + Branch + lokal `build:prerender`. Zahlt auf DoD #1+#3 |
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
| `copilotenschule-seo-d3-listicle-outreach` | Mo 22.06. 10:30 | D3 Listicle-Outreach | Guard (11.06.): Drafts existieren seit 09.06. → prüft nur Versand-Status + Kaltakquise-Koordination |
| `copilotenschule-seo-b3b-b3c-hubs-draft` | Mo 06.07. 10:30 | B3b QCG + B3c Inhouse | 2 TSX-Entwürfe |
| `copilotenschule-seo-b4-trust-signals-prep` | Mo 20.07. 10:30 | B4 Trust-Signal Block | Logo-Freigabe-Workflow oder Code-Entwurf |
| `websiten-health-check` | täglich 09:53 (vorhanden) | Tägliches Monitoring | GSC-Snapshot, Indexierung, Tracking-Keywords |
| `copilotenschule-seo-clarity-fix-copilot-in-outlook-nutzen-tipps` | Di 17.06. 10:30 | Anti-Pattern-Fix | Dead-Click-Fix-Diff (lucide-x + backdrop-blur) in `docs/drafts/` |
| `copilotenschule-seo-pattern-transfer-2026-06-24` | Mi 24.06. 10:30 | Best-Practice-Transfer | Umgewidmet (11.06.): Verifikationslauf — CTA-Brücke-Draft wurde vorgezogen (`docs/drafts/pattern-transfer-content-to-offer-cta.md`), Cron prüft Einbau + erste Klick-Daten |
| `copilotenschule-seo-index-coverage-recheck` | Mo 30.06. 10:30 | A6 Index-Coverage | Prüft, ob die A6-Zielseiten inzwischen indexiert sind; re-pingt IndexNow + stellt GSC-Indexierungsanfrage für Nachzügler. Nur Doku/Drafts, kein Push |
| `copilotenschule-seo-c4-schema-konsolidierung-draft` | Mi 24.06. 10:30 | C4 Schema-Konsolidierung | Befund + Diff-Entwurf in `docs/drafts/`; Protected Pages ausgespart, kein Push. Angelegt 17.06. via Conductor-Sicherheitsnetz (DoD #1+#3) |
| `copilotenschule-seo-c1-c2-technik-draft` | Do 09.07. 10:30 | C1 PageSpeed-Quota + C2 Cache-Control | Technischer Befund + Lösungs-Entwurf in `docs/drafts/`, kein Push. Angelegt 17.06. via Conductor-Sicherheitsnetz (parkiert-technisch) |

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

**Anschluss-Session-Update 16.06.2026:** Phase 3 bleibt aktiv. Leitprämissen ab jetzt explizit: **(1) Sicherheit** — keine Eingriffe an gut rankenden/indexierten Seiten (Protected Pages + LLM-Top-Performer wie `microsoft-copilot-lizenzen` mit 13,6K Bing-Citations / 6,7K GSC-Impressionen). **(2) Performance** — nur additive, nicht-deployende Hebel.
- **SSR-Restbug = Fehlalarm** (live verifiziert 16.06., DoD #2 erfüllt). Phase 1/2/2b (Pre-Render) sind damit historisch abgeschlossen — Conductor soll sie nicht wieder öffnen.
- **Aktiver Hebel: A6 Index-Coverage** statt SSR. Echtes offenes Thema laut Status-Log = „gecrawlt/gefunden – nicht indexiert" (15.06.: 9 + 16 von 92). Maßnahme: rein additive interne Verlinkung auf die betroffenen Seiten + IndexNow/GSC-Resubmit. Entwurf: `docs/drafts/index-coverage-interne-verlinkung-2026-06-16.md`. Verifikation via neuem Cron `copilotenschule-seo-index-coverage-recheck` (30.06.).
- **C4 (Schema-Konsolidierung)** bleibt vorgemerkt, ist aber das einzige „Live-Seiten"-Thema → nur auf Branch, mit `validate-seo`, Protected Pages im ersten Durchlauf ausgespart.

**Phase-Conductor-Lauf 17.06.2026:** Phase 3 bleibt aktiv (kein Wechsel, DoD 4/8). Sicherheitsnetz ausgelöst: C1, C2, C4 hatten heute die 14-Tage-„vergessen"-Schwelle ohne Cron überschritten (registriert 27.05.). Wie vom Conductor-Lauf 09.06. angekündigt → Draft-Crons angelegt: **C4** (24.06., vorgezogen wg. DoD #1 Indexierung + #3 SEO-Score) und **C1/C2** kombiniert (09.07., parkiert-technisch). D2/D4/D5 bleiben unberührt (Phase-4-Maßnahmen, Vorbedingung „ab 25.06." noch nicht erreicht). D1 (ProvenExpert) bleibt ohne neuen Cron — erfordert User-Account-Anlage (Captcha), Reminder lief bereits 10.06.; in Notification gespiegelt. Risiko: Funnel Stufe 1→2 weiterhin 0 % (inhaltlich offen, Verifikation via Cron 24.06.). ~~src/-Änderungen unverpusht~~ — **Korrektur 29.06.: war Stale-Narrative.** CTA-Brücke Welle 1, B4 Trust-Block und Google-Ads-Tracking sind committet & gepusht/live (git `main`=`origin/main`, 0/0). Kein Push-Stau, kein Engpass.
