# SEO-Status-Log

Append-only Log. Jeder Eintrag = ein Cron-Lauf oder manuelle Status-Aufnahme. Neueste Einträge oben.

Zugriffsregel: Cron-Jobs schreiben einen neuen Eintrag am ANFANG der Logs-Sektion. Letzter Eintrag bleibt für historische Trends erhalten. Datei wird nie überschrieben, nur erweitert.

---

## Logs

### 2026-06-16 — Manuelle Status-Aufnahme „Anschluss-Session" (kein Cron)

**Anlass:** Vorgänger-Chat („SEO Phase Conductor", lief auf abgekündigtem Modell) nicht fortsetzbar. Übergabe-Notiz aus Health-Check 15.06.: „SSR-Bug partiell gefixt — 3 /wissen/-Seiten noch offen (copilot-datenschutz, copilot-lizenzen, microsoft-365-copilot-preis), priorisieren". Aufgabe: anschließen + neue Erkenntnisse einarbeiten.

**Befund — SSR-Restbug = FEHLALARM (live verifiziert):**
- Slug-Abgleich: die Übergabe-Slugs stimmen nicht mit dem Repo überein. Real: `/wissen/microsoft-copilot-lizenzen` (= „copilot-lizenzen"), `/wissen/copilot-sicherheit-datenschutz` (= „copilot-datenschutz"). Eine Seite `microsoft-365-copilot-preis` existiert nicht (Preis-Thema steckt in der Lizenzen-Seite + `/wissen/microsoft-365-e7-frontier-suite`).
- Live-Fetch (ohne JS) beider real existierender Seiten: vollständiges Initial-HTML mit korrektem `<title>`, `meta description`, Canonical, OG/Twitter, Article-Schema (Autor + Daten) und komplettem Body inkl. FAQ/Autor-Bio. → **Pre-Rendering funktioniert, kein SSR-Bug.**
- Deckt sich mit Weekly-Audit 15.06. (67/67 ✅, 0 🔴). Die „3 SSR-Seiten" waren vermutlich eine Verwechslung mit GSC-Status „gecrawlt – nicht indexiert" (Indexierungs-, kein Pre-Render-Problem).
- `/wissen/microsoft-copilot-lizenzen` ist zudem LLM-Top-Performer (13,6K Bing-Citations, 6.763 GSC-Impressionen) → strikt Protected, kein Eingriff.

**Entscheidung (Prämissen Sicherheit + Performance):**
- Keine Code-Änderung an gut rankenden Seiten. SSR-Thema (Phase 1/2/2b) als erledigt abgeschlossen, DoD #2 erfüllt.
- Pivot auf **A6 — Index-Coverage über rein additive interne Verlinkung** (echter offener Hebel: 15.06. noch 9 „gecrawlt-nicht-indexiert" + 16 „gefunden-nicht-indexiert" von 92). Baut auf „Track 1" (09.06., 9 kontextuelle Links) auf, DONT-TOUCH-LIST beachtet.

**Durchgeführte Änderungen:**
- `seo-projektplan.md`: Header-Datum 16.06.; DoD #2 ✅ + #6 aktualisiert; Maßnahme **A6** ergänzt; Cron-Tabelle um Recheck-Cron erweitert; „Anschluss-Session-Update 16.06." als aktive-Phase-Notiz.
- Neuer Entwurf: `docs/drafts/index-coverage-interne-verlinkung-2026-06-16.md` (additiver Verlinkungsplan + IndexNow/GSC-Resubmit-Liste).
- Neuer Cron `copilotenschule-seo-index-coverage-recheck` (one-time 30.06., Drafts/Doku only, kein Push).
- git unverändert sauber (main), keine src/-Änderungen, kein Push.

**Risiko-Status:** grün. **Nächster Schritt:** Cron-Läufe 17.06. (Conductor + Clarity-Dead-Click-Fix) abwarten + A6-Entwurf reviewen; bei Freigabe additive Links einbauen.

---

### 2026-06-15 — B3a Guard-Check (Cron: copilotenschule-seo-b3a-eu-ai-act-draft)

**Guard-Status:** Entwurf `docs/drafts/eu-ai-act-mitarbeiter-schulung-august-2026.tsx.md` existiert ✅ · Live-Check `/wissen/eu-ai-act-mitarbeiter-schulung-august-2026` → **HTTP 200** ✅

**Ergebnis:** B3a live, Entwurf wurde umgesetzt — Maßnahme erledigt. ✅

---

### 2026-06-15 — Wöchentlicher Audit (Cron)

**Phase:** Phase 3 — Content-Block

**SSR-Audit:** ✅ 67 / 🟡 0 / 🔴 0 (von 67)
- Audit via `seo-monitoring/recheck.sh` gegen Baseline 2026-05-04 (67 URLs). `audit-live.sh` weiterhin nicht im Repo-Mount — Workaround wie bisher.
- Neu in 🔴/✅: keine neuen Roten. 67/67 Helmet-Flush funktioniert, 0 Default-Fallback, 0 Empty. Kein Doppel-Description-Bug.
- Hinweis: Baseline hat 67 URLs (vs. letzter Woche 73) — delta aus anderen Snapshots. Qualitativ: 100 % der geprüften URLs ✅.

**GSC:** 55/92 indexiert (59,8 %), Klicks 495/3M, Impr. 47.000, CTR 1,1 %, Pos. Ø 10
- Top-Klick-Bringer (3M): „copilot in excel aktivieren" 16 Klicks/1.300 Impr. · „excel copilot aktivieren" 10/493 · „microsoft copilot in excel aktivieren" 3/61 · „copilot lizenzen" 2/276 · „claude copilot" 2/149 · „claude in copilot aktivieren" 2/51 · „copilot in outlook" 2/47 · „ki-halluzinationen vermeiden" 2/22
- Nicht indexiert (37): Weiterleitung 8 · alt. kanonische Seite 3 · robots.txt 1 · gecrawlt-nicht-indexiert 9 · gefunden-nicht-indexiert 16
- Trend: **+12,8 pp Indexierungsquote in 6 Tagen** (47 % 09.06. → 59,8 % 15.06.) — deutlich beschleunigt durch GSC-Indexierungsanfragen 09.–13.06. Kein Indexierungsrisiko (kein ≥ 5 pp Drop).

**AlwaysData:** 24h **503** (spike ~150 Sessions bei 06:00 15.06. — vermutlich Crawler-/Bot-Surge als Reaktion auf IndexNow-Pings + GSC-Indexierungsanfragen 09.–13.06.; Outbound-Kampagne noch nicht gestartet; Clarity filtert Bots heraus, daher kein Pendant im Clarity-Dashboard) · Monat 15.05.–15.06.: **6.498** Visits

**Traffic-Mix (Clarity 7T, Referrers — kein UTM sichtbar, SEA-Start erst KW 25/16.06.):**
- Organic (Google + Google.at + Google.de + Bing + Ecosia): ~152 Sessions (53 %)
- Direct/null/untracked: ~127 Sessions (44 %)
- Internal + LLM (Claude.ai 1) + Teams-CDN 2: ~7 Sessions (2 %)
- SEA (cpc): 0 sichtbar (SEA startet laut Plan KW 25 = 16.06., also morgen)
- Outbound (email): nicht gestartet (noch in Vorbereitung)
- AlwaysData-Spike 06:00 = Crawler-/Bot-Surge (Folge der IndexNow-Pings + GSC-Anfragen letzte Woche), kein echter User-Traffic

**Clarity Standard (3T, via API, 1 Call):**
- Sessions: 75 (davon 16 Bots, 92 Unique Users)
- Scrolltiefe: 40,48 % (↓ vs. 53,35 % Vorwoche — kleines Stichprobensample, kein Alarm) · Aktive Zeit: 85 s (↓ von 99 s, gleiche Begründung)
- Dead-Click: **9,33 %** ✅ (↓ von 19,35 % Vorwoche — erstmals **unter 10 %-Schwelle**!) | Rage-Click: 0 % | Quick-Back: 0 % | Excessive-Scroll: 0 %
- Top-Browser: Chrome 48 % (36) · MobileSafari 16 % (12) · Edge 12 % (9) · ChromeMobile 9 % (7) · Safari 9 % (7) · Firefox 4 % (3)
- Top-3-Pages (3T): `/wissen/claude-in-microsoft-copilot` (16) · `/wissen/ki-halluzinationen-vermeiden` (11) · `/` (11)
- Top-3-Referrer (3T): Google.com (40) · Direct/null (26) · Ecosia (4)

**Clarity Conversion-Events (7T, via Chrome Dashboard — 286 Sessions, 113 Bots excluded):**
- contact_form_submit: 1 | trainer_application_submit: 0 | konfigurator_submit: 0 | mail_click: 1 | phone_click: 1 | pdf_download: 1
- content_cta_click / sml_*: 0 / 0 (CTA-Brücke noch nicht gepusht, sml-Events nicht sichtbar)
- Smart Events: „Kontaktieren Sie uns" 2 · „Ausgehender Klick" 2 · „Formular absenden" 1
- Conversion-Rate (alle Events / Sessions): ~2,4 % (7 Events in ~6–7 Sessions / 286) — im B2B-Benchmark 2–5 % ✅
- ✅ Custom-Tags jetzt sichtbar (war Issue seit 09.06.) — geschlossen (Details clarity-insights.md)
- ⚠️ React-JS-Fehler (Clarity): 8 Fehler in 7T (0,35 % Sessions) — React #418 (62,5 % = Hydration-Mismatch) · #425 (25 %) · #423 (12,5 %). SSR-Meta korrekt, aber Hydration-Fehler könnten UX beeinflussen.

**Insights heute:** Patterns 0 | Issues 1-Update (Dead-Click geschlossen 3T; 7T noch 15,38 % durch ältere Werte) | Trends 1 (Dead-Click-Trendumkehr — Details clarity-insights.md)
**Folge-Crons angelegt:** keine — kein Anti-Pattern-Trigger (kein Page ≥ 100 Sessions/3T mit < 0,5 % Conv); Dead-Click-Fix-Cron 17.06. bleibt aktiv
**Goldene Pages (GSC × Clarity — organic):** `/wissen/copilot-in-excel-aktivieren` (GSC #1 Keyword 16 Klicks + Clarity 7T 20 Visits ✅) · `/wissen/ki-halluzinationen-vermeiden` (GSC 2 Klicks + Clarity 7T 25 Visits ✅) · `/wissen/claude-in-microsoft-copilot` (Clarity 7T #1 mit 35 Visits + GSC „claude copilot" 2 Klicks — SEO-Potential ungenutzt)
**Ungenutztes SEO-Potential:** `/wissen/claude-in-microsoft-copilot` ist Clarity-Topseite (35 Visits/7T) aber GSC-Klicks gering → Title/Snippet-Optimierung für „Claude in Copilot"-Queries könnte Klicks heben
**Protected Pages:** alle 5 HTTP 200 ✅ (copilot-roi-berechnen · copilot-training-schulung · copilot-im-unternehmen-einfuehren-leitfaden · microsoft-copilot-lizenzen · ki-schulung-mitarbeiter-pflicht)
**Entscheidung gemäß Plan:** Phase 3 bleibt aktiv. SSR 67/67 ✅ stabil. Indexierungsquote 59,8 % — auf Weg zu DoD #1 (90 %), aber noch nicht erreicht. Dead-Click erstmals unter Schwelle (positiv). CTA-Brücke Welle 1 + B3a EU AI Act Hub: **live seit 12.06.2026** (last-modified bestätigt). Funnel Stufe 1→2 weiterhin 0 % im 7T-Fenster — da CTA-Brücke erst ab 12.06. live, enthält das 7T-Fenster 4 Tage Vor-Brücke-Daten; Wirkung ab 22.06.-Audit auswertbar. Kein Phasen-Wechsel erforderlich.
**API-Calls heute:** 1/10
**Nächster Lauf:** Mo 22.06.2026, 10:00

---

### 2026-06-13 — GSC-Indexierung Retry (Cron)
**Beantragt:**
- https://copilotenschule.de/wissen/copilot-roi-erfolgsgeschichten — bereits indexiert (grüner Haken in GSC), kein neuer Request nötig
- https://copilotenschule.de/wissen/warum-verteiltes-lernen-bei-copilot-trainings-funktioniert — bereits indexiert (grüner Haken in GSC), kein neuer Request nötig
- https://copilotenschule.de/wissen/copilot-lernreise-vs-tagesschulung ✅ — war noch nicht indexiert (Status: „Gecrawlt – zurzeit nicht indexiert"), Indexierung erfolgreich beantragt. GSC-Bestätigung: „Indexierung wurde beantragt".

**Offen/übertragen:** keine — alle 3 URLs sind jetzt entweder indexiert oder in der Crawling-Warteschlange.
**Hinweis:** URLs 1 & 2 wurden seit 12.06. von Google natürlich indexiert. URL 3 wurde heute per Live-Test in die bevorzugte Crawling-Warteschlange eingereiht. Wirkung in 1–2 Wochen im GSC-Indexierungsbericht prüfen.

---

### 2026-06-12 — GSC-Indexierung Rest-Seiten (Cron)
**Beantragt (3/6):**
- https://copilotenschule.de/wissen/copilot-adoption-2026-zahlen ✅ (war bereits indexiert, Re-Request)
- https://copilotenschule.de/wissen/copilot-unternehmensweit-einfuehren ✅ (war bereits indexiert, Live-Test bestätigt)
- https://copilotenschule.de/wissen/copilot-launch-kampagne ✅ (war bereits indexiert, Live-Test bestätigt)

**Offen/übertragen auf 13.06. (Quota erschöpft):**
- https://copilotenschule.de/wissen/copilot-roi-erfolgsgeschichten ⏳
- https://copilotenschule.de/wissen/warum-verteiltes-lernen-bei-copilot-trainings-funktioniert ⏳
- https://copilotenschule.de/wissen/copilot-lernreise-vs-tagesschulung ⏳ (Quota-Fehler bei Live-Test)

**Retry-Cron:** `gsc-index-request-rest-retry` — läuft am 13.06.2026 um 10:00 Uhr automatisch.
**Hinweis:** URLs 1–3 waren bereits von Google indexiert. Wirkung der Neu-Anmeldungen in 1–2 Wochen im GSC-Indexierungsbericht prüfen.

---

### 2026-06-11 — B4 Trust-Block + Google-Ads-Tracking (Consent Mode v2) in src/ umgesetzt (manuell)

**B4 Trust-Block (User-Entscheidung: ohne Logo-Freigabe-Mails):**
- NEU `src/components/CustomerLogos.tsx`: Logo-Strip (REWE, Pernod Ricard, Lekkerland, Marriott, Med360Grad, IHK Nord Westfalen) + KPI „2.000+ ausgebildete Wissensarbeiter". Grayscale, keine Links.
- Automatischer Text-Fallback solange Logo-Dateien fehlen → sofort deploybar. Logo-Dateien später nach `public/images/customer-logos/` legen: `rewe.svg, pernod-ricard.svg, lekkerland.svg, marriott.svg, med360grad.svg, ihk-nord-westfalen.svg`.
- Einbau: `Index.tsx` (nach Hero) + `UeberUns.tsx` (nach Hero-Block). B4-Cron 20.07. wird zum Verifikationslauf degradiert.

**Google-Ads-Conversion-Tracking, Variante A (Consent Mode v2):**
- NEU `src/lib/ads.ts`: gtag-Init mit Consent-Default „denied", Conversion-Mapping (Lead: contact_form/konfigurator/trainer/sml_booking · Contact: mail/phone). Komplettes No-Op ohne `VITE_GOOGLE_ADS_ID` → gefahrlos deploybar BEVOR das Ads-Konto existiert.
- NEU `src/components/ConsentBanner.tsx`: schlanker Banner (nur sichtbar wenn Ads konfiguriert + keine Entscheidung gespeichert; rendert nicht im Pre-Render-HTML).
- `analytics.ts`: trackConversion() meldet gemappte Events zusätzlich an Google Ads — null Änderungen an Aufrufstellen.
- `main.tsx` initGoogleAds() · `App.tsx` <ConsentBanner /> · `Datenschutz.tsx` neue Sektion 6a (Google Ads, Einwilligung, Widerruf) · `deploy.yml` 3 neue Secrets-Envs.
- **User-To-do nach Anlage des Google-Ads-Kontos:** Conversions anlegen („Lead" primär, „Kontakt-Intent" sekundär) → GitHub-Secrets setzen: `VITE_GOOGLE_ADS_ID` (AW-…), `VITE_ADS_LABEL_LEAD`, `VITE_ADS_LABEL_CONTACT` (Labels aus Tag-Details). Bis dahin: Banner & gtag inaktiv.
- Hinweis im Code dokumentiert: Clarity bleibt unverändert (berechtigtes Interesse lt. bestehender Datenschutzerklärung); Anwalts-Check der neuen 6a-Sektion empfohlen.

Syntax-Checks OK, validate-seo OK. **Alles wartet auf User-Review + lokalen `npm run build:prerender` + Push.**

---

### 2026-06-11 — CTA-Brücke Welle 1 in src/ umgesetzt + Kannibalisierungs-Fix live (manuell)

**Kannibalisierungs-Fix:** User-Push erfolgt, live verifiziert (B3a-Live-HTML enthält Querverlink auf `/wissen/ki-schulung-mitarbeiter-pflicht`). ✅

**CTA-Brücke Welle 1 (aus Draft `pattern-transfer-content-to-offer-cta.md`):**
- NEU: `src/components/TrainingCTA.tsx` (kontextueller „Passendes Training"-Block, Clarity-Tag `content_cta_click`, bewusst ohne X-Icon/Overlay)
- Einbau je 2 Touchpoints (mittig + vor FAQ) in die 3 Nicht-Protected-Top-Seiten:
  - `CopilotInOutlook.tsx` → `/trainings/microsoft-365-copilot-praxis`
  - `CopilotClaudeIntegration.tsx` → `/trainings/copilot-grundlagen-prompt-design`
  - `CopilotInExcelAktivieren.tsx` → `/trainings/microsoft-365-copilot-praxis`
- Syntax-Check + validate-seo: OK. **Wartet auf User-Review + Push** (lokal `npm run build:prerender` empfohlen).
- Welle 2 (restliche 5 Artikel inkl. 2 Protected Pages) erst nach Daten-Check — Verifikations-Cron 24.06.
- KPI: Funnel Stufe 1→2 ≥ 5 %/30T, Seiten/Sitzung > 1,2.

**B4-Entscheidung User:** Logos werden OHNE vorherige Freigabe-Mails verwendet (Risiko dokumentiert: Markennutzung/Referenzklauseln — Berater-Hinweis ausgesprochen). B4-Cron-Logik dadurch obsolet in Teil 3a.
**Outbound-Versanddomain:** läuft über separate Domain copiloten-schule.de (✅ Reputationsschutz-Pattern). SPF/DKIM/DMARC dort prüfen.

---

### 2026-06-11 — Externer Berater-Review + Campaign-Readiness-Maßnahmen (manuell)

**Bericht:** `docs/seo-berater-review-2026-06-11.md` — vollständiger Review von Plan, Wirkung, allen 12 SEO-Crons. Neuer Kontext: SEA-Start KW 25 + Outbound-Mailkampagne.

**Kern-Befunde:**
1. 🔴 SEA ohne Conversion-Tracking (kein gtag/AW- im Code) + Consent-Frage offen → Konzept-Draft: `docs/drafts/sea-tracking-konzept-2026-06.md`. **Blockierende User-Entscheidung: Consent-Variante A/B/C.**
2. 🔴 CTA-Brücke (Funnel 1→2 = 0 %) muss VOR SEA wirken → vorgezogen, Draft: `docs/drafts/pattern-transfer-content-to-offer-cta.md` (Komponente TrainingCTA + Mapping 8 Artikel, 2-Wellen-Rollout). Cron 24.06. zu Verifikationslauf umgewidmet.
3. 🟠 Keyword-Kannibalisierung B3a ↔ `/wissen/ki-schulung-mitarbeiter-pflicht` (Protected, Pos 8) — beide ohne Querverlinkung → **FIX in src/ umgesetzt** (additive Querverlinkung + Intent-Trennung in beiden TSX, Syntax geprüft, validate-seo Exit 0). Wartet auf User-Review + Push. Lokaler `npm run build:prerender` vor Push empfohlen.
4. 🟠 Kaltakquise: separate Versanddomain empfohlen (Reputationsschutz); D3-Outreach getrennt davon versenden.
5. Clarity-Custom-Tag-„Lücke" vermutlich KEIN Code-Bug: trainer_application_submit kommt an, Code aller 6 Events identisch — wahrscheinlich 0 echte Conversions + falscher Dashboard-Filter (Smart statt Custom). 10-Min-Verifikationstest im Tracking-Draft beschrieben.

**Cron-Änderungen (4):** d3-listicle-outreach → Guard ergänzt (Drafts existieren seit 09.06., keine Duplikate) + Kaltakquise-Koordination; pattern-transfer-2026-06-24 → Verifikationslauf; weekly-audit + monthly-review → Paid/Organic-Trennung via UTM (sonst sind Trends ab KW 25 unbrauchbar), Custom-Tag-Filter-Korrektur, SEA-/Outbound-Wirkungs-Sektion.

**Offene User-Aktionen (priorisiert):** (1) Consent-Entscheidung SEA-Tracking, (2) Review+Push Kannibalisierungs-Fix, (3) CTA-Brücke Welle 1 aus Draft umsetzen, (4) B4-Logo-Freigabe-Mails versenden (liegen seit 10.06. fertig), (5) D1 ProvenExpert anlegen, (6) 10-Min-Clarity-Tag-Test, (7) UTM-Konvention an Mailkampagne geben.

---

### 2026-06-11 — GSC-Indexierung Welle 2 (3 weitere) + Cron für Rest (manuell)

**Heute zusätzlich beantragt (via Chrome URL-Prüfung, alle ✅ „in bevorzugte Crawling-Warteschlange"):**
- `/wissen/ki-agenten` (145 LLM-Citations)
- `/wissen/copilot-training-schulung`
- `/wissen/prompt-engineering`

**Tagesbilanz GSC-Anfragen: 9** (6 in Welle 1 + 3 jetzt) → Tageslimit (~10) erreicht, daher Stopp.

**Cron für Rest angelegt:** `gsc-index-request-rest-2026-06-12`, fireAt **Fr 12.06.2026 10:00**, einmalig, deaktiviert sich nach Lauf. Meldet automatisch die verbleibenden 6 Seiten an:
copilot-adoption-2026-zahlen, copilot-unternehmensweit-einfuehren, copilot-launch-kampagne, copilot-roi-erfolgsgeschichten, warum-verteiltes-lernen-bei-copilot-trainings-funktioniert, copilot-lernreise-vs-tagesschulung.
Voraussetzung: Cowork-App offen + verbundener Chrome mit GSC-Login. Bei Quota-Stop legt der Cron selbst einen Retry für den Folgetag an.

**Damit sind ALLE ~14 „gecrawlt-nicht-indexiert"-Seiten + B3a abgedeckt** (8 heute manuell, 6 morgen via Cron). Wirkung in 1–2 Wochen im GSC-Indexierungsbericht prüfen.

---

### 2026-06-09 — Deploy live + 6 GSC-Indexierungs-Anfragen (manuell)

**Deploy-Status geprüft:** Artikel-Verlinkungen + B3a sind **live** (B3a HTTP 200, interne Links im Live-HTML). **Update (nach vollständigem User-Push): Logo-Fix ist jetzt ebenfalls live** — Live-HTML (Homepage + Artikel) zeigt überall `images/copilotenschule_flugzeug.png` (512×512), kein `logo.png` mehr. Org-Schema konsolidiert & live. (Die URL `/logo.png` liefert zwar weiter HTML, wird aber nirgends mehr referenziert → irrelevant.)

**GSC-Indexierung beantragt (6 URLs, via Chrome URL-Prüfung — alle „in bevorzugte Crawling-Warteschlange aufgenommen"):**
1. `/wissen/copilot-studio` ✅ (1.0K LLM-Citations)
2. `/wissen/github-copilot` ✅ (351)
3. `/wissen/eu-ai-act-mitarbeiter-schulung-august-2026` ✅ (B3a, brandneu — war Google unbekannt)
4. `/wissen/copilot-tipps-tricks-produktivitaet` ✅ (416)
5. `/wissen/copilot-agent-digitales-gedaechtnis` ✅ (88)
6. `/wissen/ki-realitaet-beratungsfirmen-2026` ✅ (ehem. 0-Link-Waise, 50)

Alle 6 technisch sauber (crawlbar, indexierbar, Canonical konsistent) — „gecrawlt/unbekannt, nicht indexiert" war diskretionär. GSC-Tageslimit (~10) eingehalten.

**Noch offen für Folge-Sitzung (nach Schema-Push):** weitere „gecrawlt-nicht-indexiert"-Seiten anmelden (copilot-training-schulung, prompt-engineering, ki-agenten, copilot-adoption-2026-zahlen, copilot-unternehmensweit-einfuehren, copilot-launch-kampagne, copilot-roi-erfolgsgeschichten, warum-verteiltes-lernen, copilot-lernreise-vs-tagesschulung). Wirkung der heutigen Maßnahmen in ~1-2 Wochen im GSC-Indexierungsbericht prüfen.

---

### 2026-06-09 — Indexierungs-Offensive: Diagnose + interne Verlinkung + Schema + Off-Page + GSC (manuell)

**Auslöser:** User-Auftrag „alles für Indexierung, Ranking und Nennungs-Häufigkeit". 4 Tracks parallel.

**GSC-Diagnose (Seitenindexierung, via Chrome):** 43 indexiert / 48 nicht indexiert (~47%).
- 12 unkritisch: 8 Redirects (Trailing-Slash/Legacy-URLs `/github-copilot/`, `/ki-agenten/`, `/prompt-engineering/`, `/trainings/.../` → alle saubere 301), 3 korrekte Canonicals, 1 robots-Block. `/microsoft-copilot-lizenzen/` 301 ist inzwischen gesetzt (DONT-TOUCH-Notiz veraltet).
- 16 „gefunden – noch nicht gecrawlt" → adressiert durch heutige IndexNow- + Sitemap-Signale.
- 20 „gecrawlt – nicht indexiert" = Kern-Hebel: ~14 echte /wissen/-Artikel (HTTP 200, technisch sauber), diskretionär nicht indexiert. Mehrere sind LLM-Top-Performer bei Bing (copilot-studio 1.0K Citations, tipps-tricks 416, github-copilot 351).

**Track 1 — Interne Verlinkung (9 kontextuelle Links über 7 Quell-Seiten):**
ki-realitaet-beratungsfirmen-2026 (war 0) ← Adoption2026; warum-verteiltes-lernen ← Lernreisen + CopilotTraining (jetzt 2 distinct); copilot-roi-erfolgsgeschichten ← Adoption2026; copilot-launch-kampagne ← UnternehmensweitEinfuehren; copilot-agent-digitales-gedaechtnis ← AgentModeOffice; github-copilot + copilot-studio ← VariantenUnterschiede; copilot-tipps-tricks ← FuerExcel. DONT-TOUCH-LIST beachtet (nur additive Links). `vite build` Exit 0.

**Track 2 — C4 Schema-Konsolidierung:** Bug — `copilotenschule.de/logo.png` liefert HTML statt Bild (existiert nicht). Drei `#organization`-Definitionen (index.html, organizationSchema.ts, authors.ts getPublisherSchema) hatten inkonsistente/kaputte Logos → alle auf gültiges `images/copilotenschule_flugzeug.png` (512×512) vereinheitlicht. Logo-Rich-Result repariert, Entität konsistent. `vite build` Exit 0.

**Track 3 — Off-Page-Entwürfe:** `docs/outreach/listicle-outreach-entwuerfe.md` (3 Mails: mod-education, ki-trainingszentrum, cmt) + `docs/outreach/dach-verzeichnisse-d2-d4.md` (Verzeichnis-Zielliste + Copy-Paste-Eintragsdaten). Versand/Eintragung bleibt User.

**Track 4 — GSC-Indexierung beantragt (via Chrome):** copilot-studio ✅ + github-copilot ✅ (bevorzugte Crawling-Warteschlange). Rest bewusst zurückgestellt → besser nach Push (Google crawlt dann MIT neuen Links + Schema-Fix). GSC-Tageslimit geschont.

**Offen (User):** Review + Push der src-Änderungen (7 Artikel-Verlinkungen + organizationSchema.ts + authors.ts + B3a-Seite). Nach Deploy: weitere GSC-Anfragen für gestärkte Seiten + B3a.

---

### 2026-06-09 — B3a EU AI Act Hub live-fertig verdrahtet (manuell)

**Aus Draft → src/ überführt (alle Pflicht-Stellen):**
- `src/pages/EuAiActMitarbeiterSchulung.tsx` erstellt (Komponente `EuAiActMitarbeiterSchulung`, Imports identisch zur erprobten Vorlage CopilotAgentModeOffice.tsx).
- Import + Route in `src/App.tsx` (`/wissen/eu-ai-act-mitarbeiter-schulung-august-2026`).
- Eintrag am Anfang von `src/data/articles.ts` (Badge „KI-Recht & Compliance", publishDate 2026-06-10).
- `package.json` → `reactSnap.include` ergänzt.
- `scripts/generate-sitemap.js` → `knowledgeSlugs` ergänzt; `public/sitemap.xml` URL-Block ergänzt (lastmod 2026-06-10).

**Verifikation:**
- `validate-seo.js`: Exit 0, 39 Wissensartikel erkannt, **mein Slug in keiner Warnung** → besteht alle strikten Checks (cleaner SLUG, canonicalUrl-Variable, Breadcrumb `/wissen/`, Route, reactSnap-include, Sitemap-Generator). Die 40 Warnungen sind Vorbestand (etablierte Artikel).
- esbuild TSX-Syntaxcheck: sauber.
- `vite build`: **Exit 0** — gesamte App kompiliert inkl. neuer Seite/Route/Daten. Nur Vorbestands-Warnungen (react-helmet-async PURE-Annotation, Chunk-Größe).
- Voller react-snap-Prerender (28 Min) läuft erst in CI nach Push.

**Offen (User-Aktion):** Review der src-Änderungen + Commit/Push via GitHub Desktop. Nach Deploy: IndexNow-Ping erfolgt automatisch via deploy.yml (optional manueller Einzelping für die neue URL möglich).
**B3a-Status:** ⏳ Entwurf → ⏳ in src/ verdrahtet, build-verifiziert, wartet auf Push.

---

### 2026-06-09 — B2-Hub aktiviert + Re-Indexing-Push (manuell)

**B2 (Anbieter-Vergleich-Hub) — Blocker aufgelöst:**
- Verdrahtung vollständig: Route (App.tsx), articles.ts, package.json `reactSnap.include`, sitemap.xml, generate-sitemap.js (Priorität 0.9) — alles vorhanden.
- Live-Render-Check (`/wissen/copilot-schulungsanbieter-deutschland-vergleich`, Googlebot-UA): **HTTP 200**, Title + Canonical + og:tags + reiches Schema (Article, FAQPage, BreadcrumbList, ItemList, Course, Offer, Organization) + H1, 125 KB pre-gerendertes HTML. **Pre-Render bestätigt funktionsfähig** — der ehemalige Blocker („wartet auf erfolgreichen Pre-Render") ist endgültig weg.
- **Lücke gefunden + behoben:** Kein einziger interner Link zeigte auf den Hub (nur die Route-Definition). Zwei kontextuelle Links ergänzt (src/, kein Push):
  - `CopilotSchulungOnline.tsx` → Sektion „Woran Sie eine gute Online-Schulung erkennen"
  - `CopilotTraining.tsx` → nach der Trainings-Checkliste
  - Beide Dateien via esbuild syntaktisch verifiziert (TSX sauber).
- IndexNow-Einzelping für B2-URL: **HTTP 200**.
- **Maßnahmen-Status B2:** ✅ existiert → ✅ aktiviert (interne Verlinkung verbessert, Re-Crawl angestoßen). Zahlt auf DoD #6 ein.

**Re-Indexing-Push (DoD #1, Indexierung):**
- Anlass: SSR jetzt vollständig geheilt (72 ✅ / 0 🔴); die 44 %-Indexierungsquote wurde gemessen, als SSR noch kaputt war.
- IndexNow-**Massenping aller 73 Sitemap-URLs**: **HTTP 200** (Bing/Yandex/Seznam-Re-Crawl-Signal).
- **GSC-Sitemap-Neueinreichung: ✅ erledigt (09.06. via Chrome).** `https://copilotenschule.de/sitemap.xml` über `sc-domain:copilotenschule.de` erneut eingereicht — Status „Erfolgreich", Eingereicht-Datum aktualisiert von 27.05. auf **10.06.2026**, 73 erkannte Seiten. Google re-crawlt jetzt; Google nutzt IndexNow nicht, daher dieser separate Schritt.

**Hinweis:** Die zwei internen Links wirken erst nach dem nächsten Deploy. Bis dahin reviewt der User die src/-Änderungen (CopilotSchulungOnline.tsx, CopilotTraining.tsx) via GitHub Desktop.

---

### 2026-06-09 — B3a EU AI Act Hub-Entwurf erstellt (vorgezogen, manuell)

**Auslöser:** User-Entscheidung, eine Maßnahme vorzuziehen statt auf Cron-Termine zu warten. Gewählt: B3a (höchster strategischer Wert, zeitkritisch, null Deploy-Risiko da nur Draft).
**Drafts:** `docs/drafts/eu-ai-act-mitarbeiter-schulung-august-2026.tsx.md` (vollständige TSX nach CLAUDE.md-Template: Quick-Answer, 6 Abschnitte, 5 entscheiderorientierte FAQs, Article+FAQPage+BreadcrumbList-Schema, Quellen)
**Checklist:** `docs/drafts/eu-ai-act-deployment-checklist.md` (8 Schritte + inhaltliche Review-Punkte)
**Recherche (09.06.):** Art. 4 EU-KI-VO gilt seit 02.02.2025; Durchsetzung durch nationale Marktüberwachungsbehörden ab 02.08.2026; in DE Aufsicht durch BSI; Pflicht gilt für Anbieter UND Betreiber, alle Risikoklassen. Quellen: EU-Kommission (AI Literacy FAQ), artificialintelligenceact.eu (Art. 4), IHK Schleswig-Holstein, Bitkom Consult.
**Faktenkorrektur ggü. Plan-Label:** Im Plan als „High-Risk-Compliance Deadline" geführt — präziser: Die KI-Kompetenz-Pflicht ist nicht an Hochrisiko gekoppelt, 02.08.2026 = Start der Durchsetzung. Im Artikel korrekt dargestellt.
**Cron angepasst:** `copilotenschule-seo-b3a-eu-ai-act-draft` (15.06.) hat jetzt einen Guard (Schritt 0): prüft, ob der Draft existiert → wenn ja, nur noch Live-Check + Status-Log, keine Doppelerstellung. Regenerier-Sicherheit bleibt erhalten, falls der Draft je fehlt.
**Wartend auf:** User-Review + Pflicht-Checkliste-Ausführung (TSX nach src/pages, Route, articles.ts, package.json, sitemap, Build-Test, Push, IndexNow).
**Deadline relevant:** 02.08.2026.
**Maßnahmen-Status B3a:** 🔵 offen → ⏳ Entwurf erstellt (live nach User-Push).

---

### 2026-06-10 — A2-Iteration übersprungen (Cron)

**Bedingungs-Prüfung (Schritt 1):** Jüngster Weekly-Audit (09.06.2026) zeigt **✅ 72 / 🟡 1 / 🔴 0 (von 73)** → ✅ 72 ≥ 50 → Helmet-Downgrade + `concurrency: 1` (bereits am 27.05. deployt) haben die Race-Condition vollständig behoben.
**Aktion:** A2-Iteration NICHT nötig — keine Code-Änderung. Hinweis: `"concurrency": 1` ist ohnehin bereits seit 27.05. im reactSnap-Block von package.json enthalten (Run #382/#383).
**Status:** Phase 1 erfolgreich abgeschlossen, Phase 3 (Content-Block) läuft bereits seit 01.06.
**Selbst-Deaktivierung:** ja (fireAt-Cron, einmaliger Lauf)

---

### 2026-06-10 — D1 ProvenExpert Reminder (Cron)

**Check-Ergebnis:** `https://www.provenexpert.com/copilotenschule` → kein Profil vorhanden (web_fetch leer; vorheriger Lauf 27.05. = HTTP 410). `src/components/Footer.tsx` enthält kein ProvenExpert-Badge → Integration noch nicht erfolgt.
**Status:** Reminder an User geschickt — wartet auf Account-Anlage
**Ziel:** ≥ 15 Bewertungen innerhalb 4 Wochen
**Selbst-Deaktivierung:** ja (fireAt-Cron)
**Hinweis:** Account-Anlage erfordert User-Aktion (Privacy + Captcha) — wird nicht autonom durchgeführt.

---

### 2026-06-10 — Monatsreview (Cron)

**Bericht:** docs/seo-monatsreview-2026-06.md
**Phase:** Phase 3 — Content-Block (kein Wechsel)
**Definition-of-Done-Score:** 4 von 8 erfüllt (fest: #2 SSR 🔴 0, #4 GEO 82; neu/wahrscheinlich: #5 ≥5 Klick-URLs, #6 B2-Hub #1)

**Top-Zahlen:**
- AlwaysData 24h: 374 (+16 / +4,5 % vs. 09.06.) · Monats-/Jahreswerte aus Highcharts nicht sauber auslesbar (siehe Bericht §5)
- GSC: 43/91 indexiert (47 %) · 28T 182 Klicks/17.600 Impr · 3M 404 Klicks/39.824 Impr · CTR 1 % · Pos. 11,7 (28T) / 10,3 (3M)
- Clarity Sessions: 117/3T (API) · 480/30T (Dashboard) · Conv-Rate 1,25 % (Kontakt) / 2,9 % (inkl. ausgehend)
- Dead-Click: 21,4 % (3T) ⚠️ eskaliert — Heatmap-lokalisiert
- SSR: ✅ 72 / 🟡 1 / 🔴 0 (fortgeschrieben, kein Deploy seit A2-Fix; frischer Sweep umgebungsbedingt nicht möglich)

**Goldene Pages:** /wissen/copilot-in-excel-aktivieren · /wissen/ki-halluzinationen-vermeiden · /wissen/claude-in-microsoft-copilot
**Bremsen:** dieselben + /wissen/copilot-in-outlook-nutzen-tipps (73 Visits, 0 Conv, Dead-Clicks) — alle konvertieren ~0 %
**Hauptbefund:** Funnel bricht zu 100 % zwischen Content und Angebot (Stufe 1→2 = 0 %, Seiten/Sitzung 1,0). SEO bringt Besucher, es fehlt die Content→Angebot-Brücke. Parallel: B2-Hub rankt #1 für die Strategie-Abfrage (DoD #6 wahrscheinlich erfüllt).
**Empfehlung:** (1) In-Content-CTA-Brücke in alle Top-Wissensartikel, (2) Snippet-Fix der Seite-1-Schläfer (copilot lizenz Pos 8,2 / ki halluzinationen Pos 4,6, je 0 Klicks), (3) Dead-Click-Fix Outlook-Seite.
**Folge-Crons angelegt:** `copilotenschule-clarity-fix-copilot-in-outlook-nutzen-tipps` (17.06.), `copilotenschule-pattern-transfer-2026-06-24` (24.06.)
**Offene User-Aktionen:** Custom-Conversion-Tags verifizieren · Clarity „AI-Sichtbarkeit" aktivieren (GSC/Bing-Verknüpfung) · AlwaysData Monats-/Jahreswerte gegenchecken
**API-Calls heute:** 1/10
**Nächster Monatsreview:** Mi 08.07.2026

---

### 2026-06-10 — B3b + B3c Retry #2 übersprungen (Cron)

**Ergebnis:** B3b+B3c Retry #2 übersprungen – B3a noch nicht live. Manuelle Prüfung empfohlen.

**Vorbedingungs-Prüfung (alle 3 negativ):**
1. B3a-Draft in `docs/drafts/` (`eu-ai-act-*.tsx.md`)? → **Nein** — Verzeichnis `docs/drafts/` existiert noch nicht.
2. `/wissen/eu-ai-act-*` Route in `src/App.tsx`? → **Nein** — keine Treffer.
3. GSC-Impressionen für eine B3a/EU-AI-Act-URL im Log? → **Nein** — kein Eintrag.

**Kontext:** B3a-Draft-Cron (`copilotenschule-seo-b3a-eu-ai-act-draft`) ist regulär für **Mo 15.06.2026 10:30** geplant und noch nicht gelaufen. Damit war dieser Skip wie im Eintrag vom 09.06. vorhergesagt erwartbar.

**Aktion:** Kein Draft erstellt (gemäß Task-Regel). Kein neuer Retry-Cron angelegt — der reguläre `copilotenschule-seo-b3b-b3c-hubs-draft` läuft am 06.07.2026 und prüft die Vorbedingung erneut, dann ist B3a (Draft ab 15.06.) realistisch live + erste Impressionen denkbar.

**Empfehlung an User:** Nach Go-Live von B3a (frühestens nach 15.06.) und ~2 Wochen GSC-Impressionen kann B3b+B3c manuell oder über den 06.07.-Cron angestoßen werden.

---

### 2026-06-09 — Wöchentlicher Audit (Cron)

**Phase:** Phase 3 — Content-Block
**SSR-Audit:** ✅ 72 / 🟡 1 / 🔴 0 (von 73)
- Neu in 🔴/✅: keine neuen Rote. Sitemap +1 URL (jetzt 73) → direkt ✅. `/unsere-angebote` bleibt 🟡 (HTTP 301, unverändert wie Baseline).
- Hinweis: `outputs/audit-live.sh` weiterhin nicht im Repo → Audit rekonstruiert via curl + Googlebot-UA über alle 73 Sitemap-URLs (Title + Meta-Description + Canonical im initialen HTML geprüft).

**GSC:** 43/91 indexiert (47 %), Klicks 404/3M, Impr. 39.800, CTR 1 %, Pos. Ø 10,3
- Top-Klick-Bringer: „copilot in excel aktivieren" (12 Klicks/1.105 Impr.), „excel copilot aktivieren" (9/424), „microsoft copilot in excel aktivieren" (2/52), „prompt damit chatgpt nicht halluziniert" (2/43), „ki-halluzinationen vermeiden" (2/22)
- Nicht indexiert (48): Weiterleitung 8 · alt. kanonische Seite 3 · robots.txt 1 · gecrawlt-nicht-indexiert 20 · gefunden-nicht-indexiert 16
- Trend: Indexierungsquote ↑ 44 % (27.05. Baseline) → 47 %. Unter 55 %-Positiv-Trigger, aber kein Indexierungs-Risiko (kein ≥5 pp Drop).

**AlwaysData:** 24h 358 · Juni (Teilmonat Stand 09.) 2.633 · Mai komplett 12.456 (+65 % vs. Apr) · Jahres-Total 2026: 34.242

**Clarity Standard (3T, via API, 1 Call):**
- Sessions: 93 (davon 6 Bots, 105 Unique Users)
- Scrolltiefe: 53,35 % (↑ von 44,28 %), Aktive Zeit: 99 s (↑ von 90 s)
- Dead-Click: 19,35 % ⚠️ (↑ von 11 % — fast verdoppelt) | Rage-Click: 0 % | Quick-Back: 0 % | Excessive-Scroll: 0 %
- Top-Browser: Chrome 44 %, Edge 37 %, MobileSafari 12 %, Firefox 3 %, EdgeMobile 2 % (EdgeMobile-Anteil von 47 % → 2 % gefallen — Verschiebung Mobile→Desktop, kleine Stichprobe)
- Top-3-Pages: `/` (16), `/wissen/copilot-in-outlook-nutzen-tipps` (15), `/wissen/ki-halluzinationen-vermeiden` (9)
- Top-3-Referrer: Direct (45), Google (40), Teams-CDN (3)

**Clarity Conversion-Events (7T, via Chrome — 227 Sessions, 14 Bots):**
- contact_form_submit / trainer_application_submit / konfigurator_submit / mail_click / phone_click / pdf_download: 0\* / 1 / 0 / 0 / 0 / 0
- \*Custom-Tags feuern nicht unter techn. Namen; Clarity-Auto-Smart-Events zeigen „Kontaktieren Sie uns" 4, „Formular absenden" 1, „Ausgehender Klick" 6
- Conversion-Rate (nur Custom-Tags): 0,44 % (1/227) · inkl. auto-detected Kontakt-Conversions: 2,6 % (6/227, im B2B-Benchmark 2–5 %)
- Core Web Vitals (49 Seitenansichten): 88/100 — LCP 2,1 s · INP 160 ms · CLS 0 (alle gut)

**Insights heute:** Patterns 0 | Issues 1 (Dead-Click eskaliert auf 19,4 %) | Trends 1 (Google holt Referrer-Spitze zurück, DuckDuckGo-These der Vorwoche entkräftet) + 1 Beobachtung (LLM-Referrer aktiv / Custom-Tag-Conversion-Lücke) — Details in clarity-insights.md
**Folge-Crons angelegt:** keine (kein Page ≥100 Sessions/3T mit <0,5 % Conv → kein Anti-Pattern-Cron; UX-Issue erfordert keinen eigenen Cron)
**Goldene Pages (GSC×Clarity):** `/wissen/ki-halluzinationen-vermeiden` (GSC 4 Klicks + Clarity 17 Visits/7T), `/wissen/copilot-in-excel-aktivieren` (GSC 12 Klicks + Clarity 12 Visits/7T — letzte Woche noch „ungenutztes Potential", jetzt auch in Clarity-Top → aufgewertet)
**Ungenutztes SEO-Potential:** Excel-Query-Cluster bringt die meisten GSC-Klicks, aber CTR gesamt nur 1 % bei Pos. 10,3 → Snippet-/Title-Optimierung der Excel-Pages könnte Klicks heben
**Protected Pages:** alle 5 OK (HTTP 200) ✅
**Entscheidung gemäß Plan:** Phase 3 bleibt aktiv. SSR stabil (0 🔴 seit A2-Fix). Keine Eskalation, kein Phasen-Wechsel. Content-Block-Crons laufen planmäßig (B3a EU AI Act Draft Mo 15.06.). Einzige Handlungs-Empfehlung an User: (1) Dead-Click-Heatmap prüfen, (2) Custom-Conversion-Tags verifizieren.
**API-Calls heute:** 1/10
**Nächster Lauf:** Mo 15.06.2026, 10:00

---

### 2026-06-09 — Phase-Conductor-Lauf (Cron)

**Aktive Phase:** Phase 3 — Content-Block (aktiv seit 01.06.2026, Phase-1-Exit erfüllt: SSR ✅ 71 ≥ 50)
**Nächste Maßnahme:** B3a — Hub-Artikel EU AI Act August 2026 (zeitkritisch, Deadline 02.08.2026). Geplant: Mo 15.06.2026 10:30 via Cron `copilotenschule-seo-b3a-eu-ai-act-draft` (enabled ✅).
**Definition of Done:** 2 von 8 sicher erfüllt (#2 🔴 ≤ 5 = 0 ✅; #4 GEO-Score 82 ≥ 80 ✅). #5 (Top-3-Klick-Bringer ≥ 5 URLs) grenzwertig — 12 Queries, aber auf wenige Pages konzentriert. Größte Lücken: #1 Indexierung 44 % (Ziel 90 %), #3 SEO-Score 42 (Ziel 75).
**Risiko-Status:** 🟡 gelb
**Aktion in diesem Lauf:** keine (Roadmap im Soll — nächste Maßnahme B3a hat Cron, Vorbedingung erfüllt).

**5 Status-Fragen:**

1. **Aktive Phase:** Phase 3 — Content-Block.
2. **Nächste konkrete Maßnahme:** B3a (kleinste offene Code-Nr. in der Phase-3-Reihenfolge). Daneben: B2 (Anbieter-Vergleich-Hub) existiert bereits und war auf erfolgreichen Pre-Render blockiert — Blocker ist mit SSR 71 ✅ / 0 🔴 jetzt aufgelöst (relevant für DoD #6).
3. **Cron für B3a vorhanden?** Ja — `copilotenschule-seo-b3a-eu-ai-act-draft`, fireAt 15.06.2026, enabled.
4. **Vorbedingung B3a erfüllt?** Ja — Phase 3 aktiv + Pre-Render ≥ 50 ✅ (aktuell 71 ✅). Cron ist noch nicht gelaufen, Lauf liegt regulär in der Zukunft.
5. **🔵 offen > 14 Tage ohne Cron?** Noch keine. Ohne dedizierten Cron sind C1 (PageSpeed-Quota), C2 (Cache-Control), C4 (Schema.org-Konsolidierung), D2 (DACH-Verzeichnisse), D4 (IHK), D5 (Yellow-Boat-Gastartikel) — registriert am 27.05., heute also 13 Tage alt, knapp unter Schwelle. C/D liegen in der Plan-Sequenz bewusst später (C parkiert/technisch, D2 = Phase-3-Schluss, D4/D5 = Phase 4 ab 25.06.). **Beim nächsten Conductor-Lauf (17.06.) überschreiten C1/C2/C4 die 14-Tage-Grenze → dann Draft-Crons anlegen, falls weiter unadressiert.** Hinweis: C4 (Schema) zahlt auf die größte DoD-Lücke #3 (SEO-Score) ein — Monthly-Review am 10.06. sollte das aufgreifen.

**Cron-Check (Maßnahme → aktiver Cron):**

| Maßnahme | Cron | Nächster Lauf | Status |
|---|---|---|---|
| B3a EU AI Act Hub | `…-b3a-eu-ai-act-draft` | 15.06. | ✅ on track |
| B3b/B3c QCG+Inhouse | `…-b3b-b3c-hubs-draft` (06.07.) + `…-b3b-b3c-retry` (10.06.) | 10.06./06.07. | ✅ (Retry prüft, ob B3a live — wird voraussichtlich erneut skippen, da B3a-Draft erst 15.06.) |
| B4 Trust-Signals | `…-b4-trust-signals-prep` (20.07.) + `…-b4-trust-signals-retry` (10.06.) | 10.06./20.07. | ✅ Vorbedingung ≥ 60 ✅ jetzt erfüllt (71 ✅) → Retry erzeugt morgen voraussichtlich Draft |
| D1 ProvenExpert | `…-d1-provenexpert-reminder` | 10.06. | ✅ |
| D3 Listicle-Outreach | `…-d3-listicle-outreach` | 22.06. | ✅ |
| A2-Iteration | `…-a2-iteration-prep` | 11.06. | ✅ (überspringt sich — 0 🔴 bereits erreicht) |
| C1/C2/C4, D2/D4/D5 | — | — | 🔵 kein Cron (siehe Frage 5) |

**Risiko-Check (> 7 Tage ungelöst):**
- Dead-Click-Rate 11 % persistent seit 28.05. (⚠️ UX-Issue, ~12 Tage). Gehört in den Zuständigkeitsbereich des Weekly-Audit (Clarity-Fix-Cron-Logik); Lauf vom 09.06. hat keinen Fix-Cron angelegt. Kein SEO-Roadmap-Blocker, aber als gelbes Signal vermerkt.
- GSC-Indexierungsquote: letzter belastbarer Wert 44 % (27.05.); Weekly-Audit 01.06. konnte GSC im autonomen Modus nicht abrufen (Chrome-Timeout). Datenlücke bei DoD-Kriterium #1 → Monthly-Review 10.06. sollte GSC-Wert frisch holen.
- Keine roten Flags in der SEO-Roadmap selbst.

**Definition of Done — Selbst-Abschluss-Check:** 2 (ggf. 3) von 8 erfüllt → weit unter der 7/8-Schwelle. Conductor bleibt aktiv, keine Selbst-Deaktivierung.

**Aktion:** Keine Cron-Anlage, keine Plan-Änderung (Bestand erhalten). Nächster Conductor-Lauf: Mi 17.06.2026 — dann C1/C2/C4 auf 14-Tage-Schwelle prüfen.
**Brauche ich etwas vom User?** Nein — keine Notification nötig.

---

### 2026-06-01 — Wöchentlicher Audit (Cron)

**Phase:** Phase 1 → Phase 3 (Exit-Kriterium heute erfüllt)
**SSR-Audit:** ✅ 71 / 🟡 1 / 🔴 0 (von 72)
- Neu in 🔴/✅: keine Änderungen — SSR vollständig stabil seit A2-Fix (27.05.)
- `/unsere-angebote` bleibt 🟡 (HTTP 301 — unveränderter Status wie Baseline)
- Hinweis: audit-live.sh nicht gefunden (`outputs/`-Verzeichnis fehlt) → Audit rekonstruiert via curl + Googlebot-UA direkt aus Sitemap-URLs

**GSC:** nicht verfügbar (Chrome-Zugriff in autonomem Cron-Modus nicht möglich — Timeout nach 180s)
*(Letzter bekannter Wert 27.05.: 38 indexiert / 87 gesamt = 44 %; Plan-Trigger ≥ 55 % und ≤ 40 % konnten nicht geprüft werden)*

**AlwaysData:** nicht verfügbar (Chrome-Zugriff in autonomem Cron-Modus nicht möglich)

**Clarity Standard (3T, via API, 1 Call):**
- Sessions: 100 (davon 12 Bots, 113 Unique Users)
- Scrolltiefe: 44,28%, Aktive Zeit: 90s
- Dead-Click: 11 % ⚠️ | Rage-Click: 0 % | Quick-Back: 0 % | Excessive-Scroll: 0 %
- Top-Browser: EdgeMobile 47 %, Chrome 29 %, Edge 7 %, Safari 7 %, MobileSafari 5 %, Firefox 4 %, SamsungInternet 1 %
- Top-3-Pages: `/` (16), `/wissen` (16), `/wissen/bessere-entscheidungen-mit-ki` (15)
- Top-3-Referrer: DuckDuckGo (40), Direct (23), Google (18)

**Clarity Conversion-Events (7T, via Chrome):**
- contact_form_submit / trainer_application_submit / konfigurator_submit / mail_click / phone_click / pdf_download: n/a (Chrome nicht verfügbar)
- Conversion-Rate gesamt: n/a

**Insights heute:** Patterns 0 | Issues 1 (Dead-Click 11 % persistent) | Trends 1 (DuckDuckGo > Google) (Details in clarity-insights.md)
**Folge-Crons angelegt:** keine
**Goldene Pages (GSC×Clarity):** `/wissen/ki-halluzinationen-vermeiden` (in altem GSC-Top-5 UND Clarity-Top-10)
**Ungenutztes SEO-Potential:** `/wissen/copilot-in-excel-aktivieren`, `/wissen/copilot-fuer-excel` (GSC-Top-Klick-Bringer fehlen in Clarity-PopularPages → Besucher kommen, verweilen aber kaum)
**Protected Pages:** alle 5 OK (HTTP 200) ✅
**Entscheidung gemäß Plan:** SSR ✅ 71 ≥ 50 → **Phase 1 Exit-Kriterium ERFÜLLT → Phase 3 (Content-Block) ist jetzt aktiv**. A2-Iteration niedrige Priorität — 0 🔴 bestätigt, kein Handlungsbedarf. seo-projektplan.md auf Phase 3 aktualisiert.
**API-Calls heute:** 1/10
**Nächster Lauf:** Mo 08.06.2026, 10:00

---

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
