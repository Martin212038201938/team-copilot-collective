# SEO-Status-Log

Append-only Log. Jeder Eintrag = ein Cron-Lauf oder manuelle Status-Aufnahme. Neueste Einträge oben.

Zugriffsregel: Cron-Jobs schreiben einen neuen Eintrag am ANFANG der Logs-Sektion. Letzter Eintrag bleibt für historische Trends erhalten. Datei wird nie überschrieben, nur erweitert.

---

## Logs

### 2026-05-28 — Clarity Data Export API angebunden + Hybrid-Strategie (manuell)

**Status:** Token in `~/Documents/Cowork Bereich/website-health-check/.env`, Helper-Skript `scripts/fetch-clarity-data.sh` mit Counter (max. 10 Calls/Tag), jq verifiziert (1.7.1-apple).

**Erster Live-Test:** Sessions 9 (davon 2 Bots), Scrolltiefe 47,56%, Aktive Zeit 140s, **Dead-Click-Rate 11,11%** (⚠️ UX-Issue), Rage-Click 0%, Edge 6/9, Deutschland 9/9, Top-Page `/` (3 Visits).

**Wichtige Erkenntnis zur API:**
Der Endpoint `project-live-insights` liefert **Standard-Metriken**: Sessions, Traffic, Frustration-Signals, Browser/Device/OS/Country, PageTitles, ReferrerUrl, PopularPages, EngagementTime, ScrollDepth.
ABER: **Conversion-Events (Custom-Tags) kommen NICHT in dieser API-Antwort**, selbst mit `dimension1=CustomTag` ist die Response identisch zum Call ohne Dimension. Custom-Tags müssen via Chrome aus dem Dashboard geholt werden.

**Cron-Strategie ist jetzt Hybrid:**
- **API (1 Call/Lauf, ~52 Calls/Jahr):** Sessions, Frustration-Signals, Top-Pages, Referrer, Browser/Device — alles was Standard ist
- **Chrome:** nur noch Conversion-Events (Smart-Events-Filter) + Heatmaps + Recordings

Spart ~80% Chrome-Zeit pro Cron-Lauf, hält API-Budget komfortabel unter Limit (10/Tag).

**Beide Cron-Prompts (weekly + monthly) aktualisiert** mit:
- Schritt 5a (Clarity Standard via API mit jq-Expressions)
- Schritt 5b (Conversion-Events via Chrome)
- Defekt-Warnung bei API-Errors / Token fehlt
- Top-Browser-Anteil im Log (Edge-Anteil = B2B-Indikator für Zielgruppen-Verifikation)
- Cross-Korrelation GSC×Clarity bleibt zentraler Analyse-Schritt

---

### 2026-05-27 — Clarity-Insights handlungsfähig in Cron-Reports (manuell)

**Was war nicht gut genug:** Die Cron-Prompts haben Clarity-Daten zwar EINGESAMMELT, aber die Aktionsableitung war zu vage („Conversion < 0,5% = Funnel-Issue"). Für „dauerhafte Verbesserung" reichte das nicht.

**Was jetzt drin ist:**

1. **`docs/clarity-insights.md`** — lebendes Pattern-Doku mit Schemata für Pattern-/Issue-/Trend-Einträge. Cron-Jobs hängen ihre Befunde an.

2. **Weekly-Audit-Cron erweitert um Schritt 7 (KONKRETE Aktionen):**
   - Pattern-Erkennung: Pages mit ≥ 5% Conversion-Rate + ≥ 50 Sessions → Pattern-Eintrag + Übertragungs-Empfehlung
   - Anti-Pattern: Pages mit ≥ 100 Sessions ABER < 0,5% Conv → Issue-Eintrag + automatische Anlage eines fireAt-Cron-Jobs `copilotenschule-clarity-fix-<slug>` für +7 Tage
   - UX-Probleme: ≥ 5 Rage-Clicks oder ≥ 10 Dead-Clicks → Issue-Eintrag + Notification
   - Trends über 3 Wochen: ≥ +25% wöchentlich → Trend-Eintrag Status „Verstärken"
   - Defekt-Warnung: Conv-Event von ≥ 3 auf 0 in Folgewoche → ⚠️ KRITISCH

3. **Monthly-Review-Cron erweitert um Schritt 5 (5 konkrete Erkenntnis-Ableitungen):**
   - **a)** Best-Practice-Übertragung (Top vs. Bottom Pages bei gleichem Thema vergleichen, Pattern identifizieren, Transfer-Cron anlegen)
   - **b)** Anti-Pattern-Fix mit Heatmap-Hypothese und konkreter Fix-Empfehlung
   - **c)** Funnel-Analyse Page-View → Klick → Submit
   - **d)** Trend-Verstärkung (welche Events wachsen?)
   - **e)** Cross-Korrelation GSC × Clarity × AlwaysData → „Goldene Pages" vs. „Bremsen"

4. **Monatsreview-Bericht-Struktur** um Abschnitt „Goldene Pages" und „Bremsen" erweitert + Funnel-Visualisierung verpflichtend.

5. **Folge-Cron-Generierung:** Beide Crons können jetzt autonom neue fireAt-Crons anlegen, die in 7-14 Tagen konkrete Optimierungs-Drafts in `docs/drafts/` schreiben.

**Erwartete Wirkung über Zeit:**
- Mit jedem Cron-Lauf wächst `clarity-insights.md` um konkrete Pattern und Issues
- Aus Issues werden Folge-Crons → aus Folge-Crons werden Drafts → aus Drafts werden gepushte Verbesserungen → die Conversion-Rate dauerhaft hebeln
- Cross-Korrelation zeigt, welche SEO-Investitionen sich auszahlen UND welche zwar Traffic bringen aber nicht konvertieren

---

### 2026-05-27 — 🎯 End-to-End-Test nach Clarity-Deploy: VOLLER ERFOLG

**SSR-Audit:**
```
Heute morgen:           ✅ 22 / 🔴 40
Nach Helmet-Downgrade:  ✅ 31 / 🔴 38
Nach concurrency:1:     ✅ 47 / 🔴 23
JETZT (nach #383):      ✅ 71 / 🔴 0   ← KOMPLETT GEHEILT
```

Definition-of-Done-Kriterium „🔴 ≤ 5" → **erreicht** (0 von 72).

**Clarity live verifiziert über Network-Tab:**
- `clarity.ms/tag/wxppg5394j?ref=npm` → HTTP 200 (Tag-Load mit Projekt-ID, `ref=npm` bestätigt Package-Usage)
- `scripts.clarity.ms/0.8.64/clarity.js` → HTTP 200 (Tracking-Skript geladen)
- `q.clarity.ms/collect` → HTTP 204 (Session-Daten werden gesendet)
- Phone-Click-Test: zusätzlicher Collect-Request → Conversion-Event funktioniert ✅

**Code-Verification im Live-Bundle:**
- Clarity-ID `wxppg5394j` exakt 1× im JS-Bundle
- Alle 6 Conversion-Event-Strings im Bundle: contact_form_submit, trainer_application_submit, konfigurator_submit, mail_click, phone_click, pdf_download
- /datenschutz HTTP 200, Title „Datenschutzerklärung | copilotenschule.de"

**Bedeutung für den Plan:**
- **Phase 1 vollständig abgeschlossen** — alle SSR-Probleme gelöst
- **Phase 2 (A2-Iteration) übererfüllt** — alle 71 URLs pre-rendern korrekt
- Bei nächstem Phase-Conductor-Lauf: Wechsel zu **Phase 3 (Content-Block)** vorgeschlagen
- Analytics + Conversion-Tracking läuft → ab jetzt sichtbar: welche Seiten konvertieren
- A5 (IndexNow) war eh schon im deploy.yml → automatischer Massenping nach jedem Deploy

**Definition of Done — aktueller Stand:**
| # | Kriterium | Stand | Ziel |
|---|---|---|---|
| 1 | Indexierungsquote GSC ≥ 90% | 44% (heute morgen) | beobachten — Re-Crawl läuft |
| 2 | 🔴 ≤ 5 URLs | **0** ✅ | erfüllt |
| 3 | SEO-Score ≥ 75 | 42 (Stand 27.05.) | nächster Health-Check |
| 4 | GEO-Score ≥ 80 | 82 ✅ | gewahrt |
| 5 | Top-3-Klick-Bringer ≥ 5 URLs | 12 Queries | OK |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | ~#7 | offen, Hub-Artikel B2 live |
| 7 | Externe Listicle-Erwähnung ≥ 1 | 0 | D3-Cron Mo 22.06. |
| 8 | ProvenExpert ≥ 15 Bewertungen | 0 | D1-Cron Mi 10.06. |

**3 von 8 Kriterien erfüllt heute, 5 in Arbeit.** Plus die zugrundeliegende SSR-Wurzel: **gelöst**.

---

### 2026-05-27 — Clarity npm-Package + GitHub-Secret-Plumbing (manuell)

**Update zum Vorgängereintrag:** Statt Inline-Script in `index.html` nutzen wir jetzt das offizielle **`@microsoft/clarity` npm-Package**. Sauberere Lösung.

**Aktionen:**
- `npm install @microsoft/clarity@1.0.2`
- `src/main.tsx`: `Clarity.init(VITE_CLARITY_ID)` mit Skip-Logik für react-snap-Snapshots (kein Tracking während Build)
- `src/lib/analytics.ts` auf neue API umgestellt (`Clarity.event`, `Clarity.setTag`, `Clarity.upgrade`)
- `index.html`: Inline-Script entfernt — nur noch ein Hinweis-Kommentar
- `.github/workflows/deploy.yml`: `VITE_CLARITY_ID` env-Injection im Vite-Build-Step ergänzt
- `Datenschutz.tsx`: Hinweis auf npm-Package eingefügt
- Clarity-Projekt-ID: **`wxppg5394j`** (Projekt „Copilotenschule" auf clarity.microsoft.com)
- Sandbox-Build mit `VITE_CLARITY_ID=wxppg5394j` getestet → Projekt-ID erscheint exakt 1× im JS-Bundle ✅

**Was User-Aktion erfordert:**
1. GitHub Repo → Settings → Secrets and variables → Actions → New repository secret
   - Name: `VITE_CLARITY_ID`
   - Value: `wxppg5394j`
2. Push der aktuellen Code-Änderungen
3. GitHub Actions baut + deployt
4. Clarity beginnt zu tracken

**Erkenntnis nebenbei:** IndexNow ist bereits im `deploy.yml` als finaler Schritt eingebaut (massenping nach jedem Deploy für alle Sitemap-URLs). Maßnahme **A5 ist also schon erledigt** — aktualisiere in der nächsten Plan-Iteration entsprechend.

---

### 2026-05-27 — Analytics + Conversion-Tracking + Datenschutz (manuell, vor Urlaub)

**Hintergrund:** Bis heute kein Conversion-Tracking, keine Analytics. Live-Stand: AlwaysData zeigt **30.429 Unique Visits in 2026** mit +49% Mai vs. April — gigantisches Wachstum, aber wir wussten nicht woher und ob es konvertiert.

**Aktionen heute:**
1. **`src/lib/analytics.ts`** — Wrapper-Helper: `trackConversion()`, `setSessionTag()`, `markConvertedSession()`. Idempotent (kein Crash wenn Clarity blockiert).
2. **`index.html`** — Clarity-Script mit `%VITE_CLARITY_ID%`-Platzhalter (Vite ersetzt aus env, Fallback: kein Tracking).
3. **6 Conversion-Events** implementiert:
   - `contact_form_submit` in `Contact.tsx`
   - `trainer_application_submit` in `TrainerContactForm.tsx`
   - `konfigurator_submit` in `TrainingKonfigurator.tsx`
   - `mail_click` + `phone_click` in `Contact.tsx` und `Footer.tsx`
   - `pdf_download` für die 2 PDFs in `CopilotBetriebsrat.tsx`
4. **`Datenschutz.tsx`** — neue Seite, 13 Sektionen DSGVO-konform: AlwaysData (Hoster + Logfile-Analyse), Microsoft Clarity (Heatmaps, Conversions), GSC + Bing + IndexNow (passive), Kontaktformulare, Cookies, Betroffenenrechte, Aufsichtsbehörde NRW. Stand: 27.05.2026.
5. **Footer-Link** „Datenschutz" zeigt jetzt auf `/datenschutz` (vorher auf `/impressum`).
6. **`App.tsx`, `package.json`, `generate-sitemap.js`** — Route + reactSnap + Sitemap-Eintrag für `/datenschutz`.

**Cron-Prompts erweitert (weekly + monthly):**
- Schritt 4 (NEU): AlwaysData-Stats scrapen (`https://admin.alwaysdata.com/analytics/?site=989873`)
- Schritt 5 (NEU): Clarity-Dashboard scrapen (`https://clarity.microsoft.com/`)
- Conversion-Rate-Berechnung in der if/then-Logik
- Risk-Trigger: Conversion < 0,5% → Funnel-Issue-Warning

**Was User noch tun muss:**
- Microsoft Clarity Account anlegen unter `https://clarity.microsoft.com/`
- Projekt „copilotenschule.de" erstellen, **Projekt-ID** (10-Zeichen) erhalten
- Projekt-ID als `VITE_CLARITY_ID` in GitHub Actions Secret hinterlegen
- Clarity-Settings → Data-Residency auf EU setzen
- Datenschutzerklärung nochmal kurz vom Anwalt prüfen lassen (ist nach bestem Wissen, aber kein Anwaltspapier)

**Erwartung nach Setup:**
- Sessions + Heatmaps + Conversion-Events ab dem Tag, an dem VITE_CLARITY_ID gesetzt ist
- Cron-Berichte erweitern sich automatisch um Conversion-Daten ab nächstem Lauf

---

### 2026-05-27 — B3b + B3c Hub-Entwürfe übersprungen (Cron)

**Ergebnis:** Vorbedingung nicht erfüllt — B3a (EU AI Act Hub) ist noch nicht live und indexiert.

**Prüfung:**
- `docs/drafts/eu-ai-act-*.tsx.md` → nicht vorhanden
- B3a-Cron (`copilotenschule-seo-b3a-eu-ai-act-draft`) ist für Mo 15.06.2026 geplant und noch nicht gelaufen
- Keine GSC-Impressionen für eine EU-AI-Act-URL im Log

**Aktion:** Retry-Cron `copilotenschule-seo-b3b-b3c-retry` angelegt für **Mi 10.06.2026 10:30** — prüft erneut, ob B3a live ist, bevor die Drafts erstellt werden.

**Wartend auf:** B3a live + erste Impressionen in GSC (≥ 2 Wochen nach Deployment)

---

### 2026-05-27 — Phase-Conductor-Lauf (Cron)

**Aktive Phase:** Phase 1 — Stabilisierung & Beobachtung (27.05.–09.06. effektiv, User ab 02.06. im Urlaub)
**Nächste Maßnahme:** Phase-1-Exit-Check am Mo 09.06. via `copilotenschule-seo-weekly-audit` — 47 ✅ liegt im Bereich 35–49 (formale Phase-2-Schwelle), aber A2-Iteration ist bereits erledigt; Weekly-Audit entscheidet zwischen Phase-2b-Skip und direktem Start Phase 3
**Definition of Done:** 1 von 8 erfüllt (GEO-Score 82 ≥ 80 ✅; alle anderen noch offen)
**Risiko-Status:** 🟢 grün
**Aktion in diesem Lauf:** Keine — Roadmap im Soll. Alle geplanten SEO-Crons aktiv verifiziert.

**Cron-Check (Stand 27.05.2026):**

| Cron-ID | Nächster Lauf | Enabled |
|---|---|---|
| `copilotenschule-seo-weekly-audit` | Mo 01.06. / 09.06. (nach Urlaub) | ✅ |
| `copilotenschule-seo-monthly-review` | Mi 10.06. | ✅ |
| `copilotenschule-seo-phase-conductor` | Mi 03.06. | ✅ |
| `copilotenschule-seo-d1-provenexpert-reminder` | Mi 10.06. | ✅ |
| `copilotenschule-seo-a2-iteration-prep` | Do 11.06. | ✅ (Hinweis: A2 bereits erledigt — Cron prüft und überspringt sich ggf.) |
| `copilotenschule-seo-b3a-eu-ai-act-draft` | Mo 15.06. | ✅ |
| `copilotenschule-seo-d3-listicle-outreach` | Mo 22.06. | ✅ |
| `copilotenschule-seo-b3b-b3c-hubs-draft` | Mo 06.07. | ✅ |
| `copilotenschule-seo-b4-trust-signals-prep` | Mo 20.07. | ✅ |

**Notizen:**
- B4-Cron hat heute einen Skip-Eintrag + Retry-Cron für 10.06. generiert (Vorbedingung ≥ 60 ✅ nicht erfüllt, Stand: 47 ✅) — Retry-Cron `copilotenschule-seo-b4-trust-signals-retry` in Task-List prüfen, falls noch nicht vorhanden.
- A5 (IndexNow im Deploy), C1/C2/C4 haben keinen dedizierten Cron — ok, da Phase 3 erst ab 11.06. aktiv; < 14 Tage alt; kein unmittelbares Risiko.
- DoD-Kriterium 5 (Top-3-Klick-Bringer ≥ 5 URLs) benötigt GSC-Klick-URL-Daten zur genauen Prüfung; nächster Weekly-Audit liefert diese.

---

### 2026-05-27 — B4 Trust-Signal-Block (Cron) — Vorbedingung nicht erfüllt

**Status:** Skip — 14-Tage-Retry geplant (`copilotenschule-seo-b4-trust-signals-retry`, fireAt: 2026-06-10)
**Prüfung:** SSR-Audit aktuell 47 ✅ von 71 — Vorbedingung ≥ 60 ✅ nicht erreicht
**Logo-Freigabe-Check:** übersprungen (Pre-Render-Schwelle zuerst)
**Retry-Cron:** `copilotenschule-seo-b4-trust-signals-retry` — angelegt auf 2026-06-10 10:30

---

### 2026-05-27 — D1 ProvenExpert Reminder (Cron)

**Status:** Reminder an User geschickt — wartet auf Account-Anlage
**Check-Ergebnis:** `https://www.provenexpert.com/copilotenschule` → HTTP 410 (kein Profil vorhanden)
**Selbst-Deaktivierung:** ja (fireAt-Cron)

---

### 2026-05-27 — A2-Iteration Erfolgsmessung + 2. IndexNow-Ping (manuell)

**Ergebnis der A2-Iteration (Run #382 mit concurrency:1):**

| Metrik | Vor A2-Iter | Nach A2-Iter | Δ |
|---|---|---|---|
| ✅ green | 31 | **47** | +16 |
| 🟡 yellow | 2 | 1 | -1 |
| 🔴 red | 38 | **23** | -15 |

Build-Dauer #382: 28 Min (mit concurrency:1) — konsistent mit Erwartung.

**Pattern in verbleibenden 23 🔴:**
- 9 von 11 Trainings (`/trainings/<slug>`) — Catch-All-Route via `TrainingDetail.tsx` + `useParams`
- 4 von 8 Workshops — analog
- 4 Übersichts-Seiten (`/trainings`, `/wissen`, `/ueber-uns`, `/impressum`)
- 6 Wissens-Pages (rotierende Race-Condition-Reste)

**Diagnose:** Concurrency war Hauptursache (+16 fix), aber Catch-All-Routes mit `useParams()` haben eine eigene Wurzel (zusätzlicher Render-Pass, der react-snap immer noch nicht erfasst). Lösung wäre Phase 2b (moderner Pre-Renderer) oder konkrete Routes pro Training/Workshop.

**IndexNow-Ping #2 (nach A2):** HTTP 200 — Bing/Yandex/Seznam bekommen Re-Crawl-Signal für die 16 neu grünen Pages.

**Entscheidung gemäß Plan:** 47 ✅ ≥ 35 → großer Fortschritt, aber Definition-of-Done-Schwelle (🔴 ≤ 5) nicht erreicht. Empfehlung an User: **Phase 1 akzeptieren als „weitgehend erfolgreich"**, Phase 3 (Content) starten. Phase 2b (Pre-Renderer-Wechsel) optional, wenn nach 4 Wochen die Catch-All-Trainings keine Sichtbarkeit gewinnen.

---

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
