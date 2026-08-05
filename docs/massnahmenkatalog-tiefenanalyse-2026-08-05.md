# Maßnahmenkatalog copilotenschule.de — Tiefenanalyse ungenutzter Potentiale

**Stand:** 05.08.2026 · **Ziel:** 20+ qualifizierte Inhouse-Anfragen/Monat in 6 Monaten · maximale Vertrauenswürdigkeit bei allen LLMs (GEO) · Seite 1 für buchungsnahe Google-Anfragen
**Rahmen:** 10+ h Umsetzungskapazität/Woche · bis 200 €/Monat externes Budget · Nurturing auf Smartlead-Basis
**Datenquellen (alle live abgefragt am 05.08.2026):** GSC via Supermetrics-API (Tageswerte 01.05.–04.08., Seiten-/Query-Vergleich vor/nach Produktseiten-Umbau), Google Ads API (beide Konten), Google Keyword Planner (DE-Volumina), Clarity-API-Snapshots + Wochenaudits (seo-status-log.md), Repo-Code-Audit (src/, mit Datei:Zeile-Belegen), Live-Site-Checks (robots.txt, llms.txt, Produktseiten), Wettbewerbs-Benchmark (7 Anbieter per Fetch verifiziert), Web-Recherche (AI Overviews DE, Ferientermine)

---

## 1. Executive Summary

**Die gute Nachricht zuerst:** Die Traffic-Stagnation seit Ende Juli ist **nicht** durch den Produktseiten-Umbau vom 22.07. verursacht. Die Daten zeigen zwei externe Treiber (Sommerferien + AI-Overviews-CTR-Erosion) und einige kleine echte Verluste. Details in Kapitel 2.

**Die fünf größten ungenutzten Hebel (nach erwartetem Effekt):**

1. **Google Ads verbrennt Geld im falschen Modus (A1/A2):** Das tatsächlich aktive Konto (Yellow-Boat Consulting, 748-342-2182) hat in 30 Tagen ~820 € für eine Broad-Match-Kampagne mit Ziel „Website-Traffic" ausgegeben — 0 gemessene Conversions, Klicks u. a. für „pilot ausbildung", „excel lernen", „az 104". Die täglichen Reports überwachen ein drittes, leeres Konto. Umbau auf Lead-Kampagne mit exakten Keywords + funktionierendem Conversion-Import ist der schnellste ROI-Hebel überhaupt.
2. **Das Compliance-Cluster ist 5× größer als das Copilot-Schulungs-Cluster (B1):** „ki schulungspflicht" allein hat **2.900 Suchen/Monat** (plus „ki schulung für mitarbeiter" 390, „ki kompetenz schulung" 320, „ki schulung pflicht" 320, „eu ai act schulung" 210). Ihr rankt informational bereits #1 zum Thema und habt mit der 49-€-Pflichtschulung das perfekte Produkt — aber keine transaktionale Landingpage (Positionen 36–65 für die Kauf-Varianten).
3. **GEO-Achillesferse: praktisch null externe Erwähnungen (D1):** LLMs triangulieren über Drittquellen. Es existieren fast keine — das einzige gefundene Verzeichnis-Listing (seminarmarkt.de) liefert 404. Wettbewerber stehen in allen relevanten Listicles. Fertige Outreach-Drafts liegen seit Wochen unversendet in docs/outreach/.
4. **Die Funnel-Brücke Wissen→Angebot ist entgegen der Statuslogs NICHT gebaut (C5):** `TrainingCTA.tsx` existiert, wird aber in keiner einzigen Seite importiert (Repo-Grep: 0 Treffer). 53 % des Traffics landet auf Wissensartikeln, 0 % gehen weiter zum Angebot. Gleichzeitig nervt das ArticlePopup ohne Frequency-Cap (Fix-Draft seit 17.06. unverbaut).
5. **Kaufanker unter Marktniveau (C1–C4):** Alle relevanten Wettbewerber zeigen Preise (Kebel ab 531 €, 121WATT 595 €, it-schulungen.com ab 695 €), buchbare Termine, Siegel (eKomi 4,8★/1.600; Google 5★/347) und Garantien. Der Preis-A/B-Test läuft seit 21.07. ohne eine einzige ausgewertete Zahl (zwei automatisierte Ausleseversuche scheiterten an Logins).

**Umsetzungslogik bei 10 h/Woche:** Woche 1–2 = Handlungsfeld A (Geld retten, Messbarkeit) + die drei „Push-Stau"-Quick-Wins (ArticlePopup-Fix, Hero-CTA, TrainingCTA). Woche 3–6 = Compliance-LP + Inhouse-LP + Trust-Paket. Ab Woche 4 parallel: GEO-Erwähnungs-Offensive + Smartlead-Nurturing. Kapitel 4 enthält die Wochenplanung.

---

## 2. Diagnose: Warum stagnieren die Zugriffe seit Ende Juli?

### 2.1 Was die Tagesdaten wirklich zeigen (GSC via API, Wochensummen Mo–So)

| Woche | Klicks | Impressionen | Ø CTR | Anmerkung |
|---|---:|---:|---:|---|
| 29.06.–05.07. | 180 | 15.594 | 1,15 % | Wachstumsphase |
| 06.07.–12.07. | **200** | 15.409 | 1,30 % | **Peak** |
| 13.07.–19.07. | 182 | **13.441** | 1,35 % | **Impressionen −13 %** — Ferienstart Hessen (13.07.) |
| 20.07.–26.07. | **144** | 13.250 | 1,09 % | Tiefpunkt; Ferien NRW+NDS (ab 16.07.); Umbau erst am 22.07. |
| 27.07.–02.08. | 174 | 13.513 | 1,29 % | Erholung |
| 03.–04.08. (Mo+Di) | 54 | 4.678 | 1,15 % | Mo 03.08. mit 33 Klicks normal |

### 2.2 Ursache 1: Sommerferien-Saisonalität (Wahrscheinlichkeit: hoch, Anteil am Rückgang: ~50–60 %)

Der Impressionsrückgang beginnt in der Woche ab **13.07.** — neun Tage **vor** dem Produktseiten-Umbau. Ferienstarts 2026: Berlin 02.07., **Hessen 13.07., NRW + Niedersachsen 16.07.**, BW 30.07., Bayern 03.08. ([schulkalender.eu](https://schulkalender.eu/blog/sommerferien-deutschland-vergleich-2026/)). Euer Klick-Traffic ist zu ~⅔ Büro-How-to („copilot in excel aktivieren" & Co.) — genau diese Nachfrage macht Urlaub. Die Erholung ab 27.07. trotz laufender Ferien spricht für einen Boden; mit Bayern/BW in Ferien bleibt der August gedämpft, **ab Ende August ist der Rebound zu erwarten**. Kein Handlungsbedarf außer: Erwartungsmanagement und Wochen- statt 90-Tage-Metriken (Maßnahme A5).

### 2.3 Ursache 2: CTR-Erosion bei stabilen Positionen — AI Overviews (Wahrscheinlichkeit: mittel-hoch, Anteil: ~30–40 %)

Das Query-Vergleichsfenster (23.07.–04.08. vs. 09.–21.07., gleiche Länge) zeigt ein klares Muster: Klickverluste **ohne** Positionsverluste — teils bei *verbesserten* Positionen:

| Query | Klicks vorher→nachher | Position vorher→nachher |
|---|---|---|
| copilot kosten | 4→1 | 5,2→**4,4** (besser!) |
| copilot lizenz kosten | 3→1 | 4,1→4,0 |
| copilot claude | 3→1 | 6,6→**5,7** (besser!) |
| copilot preise | 3→1 | 5,6→5,9 |

Das ist die Signatur von AI Overviews: Google beantwortet Kosten-/Definitionsfragen zunehmend selbst. Der DE-Rollout wurde für Q2 2026 komplettiert; deutsche Studien messen 12–30 % Klickverlust auf informationale Keywords ([seotrust.de](https://www.seotrust.de/news/google-aio-deutschland-2026/), [smartlemon.de](https://www.smartlemon.de/blog/studie-auswirkungen-ai-overviews-deutschland/)). **Konsequenz:** Der informationale Traffic-Sockel wird strukturell erodieren — die strategische Antwort ist genau euer GEO-Fokus (in der AI-Antwort *zitiert* werden, Maßnahmenfeld D) plus Verlagerung auf transaktionale Rankings (Feld B), die von AIO kaum betroffen sind („Low probability: transactional, navigational, local").

### 2.4 Ursache 3: Kleine echte Verluste (Anteil: ~10–20 %)

- `/wissen/copilot-betriebsrat`: 11→0 Klicks (Impressionen 229→135). Die Seite wurde am 15.07. inhaltlich angefasst — prüfen, ob Title/H1 verändert wurden; ggf. Revert der Meta-Ebene.
- `/wissen/claude-in-microsoft-copilot`: 49→35 Klicks, Impressionen −22 % — Nachrichtenzyklus zum Claude-in-Copilot-Thema flacht ab (Themen-Konjunktur, kein Defekt).
- `/wissen/microsoft-copilot-varianten-unterschiede`: 10→3 Klicks.

### 2.5 Entlastung des Produktseiten-Umbaus vom 22.07. — mit zwei Beobachtungsaufträgen

Beweisführung: (a) Die 7 Trainings-Detailseiten hatten vor dem Umbau in Summe ~1–2 Klicks/2 Wochen und danach ~1 — sie *können* den Rückgang von ~50 Klicks/Woche nicht verursacht haben. (b) Der Rückgang begann vor dem Umbau. (c) Die im Umbau ebenfalls angefassten EU-AI-Act-Seiten haben **gewonnen** (`eu-ai-act-mitarbeiter-schulung`: 13→23 Klicks, Position 9,4→6,4; `/wissen/ki-kennzeichnungspflicht-eu-ai-act` neu mit 13 Klicks). (d) „copilot training" verbesserte sich auf Pos. 11,2 mit ersten 2 Klicks.

**Aber zwei Punkte beobachten (Maßnahme F1):**
1. `/trainings/train-the-trainer-copilot`: Impressionen 25→**1** im Vergleichsfenster — die Seite ist aus fast allen SERPs gefallen. Einzelfallprüfung nötig (GSC-URL-Prüfung, Title-Diff seit 22.07.).
2. `/trainings`: Ø-Position im Query-Mix 27→37,8 bei Impressionen 384→294. Vermutlich Query-Mix-Rauschen durch die Umstellung auf CollectionPage — 2 Wochen beobachten, bei anhaltender Verschlechterung Title/H1-Review.

### 2.6 Verstärker: Das Reporting verschleiert den Trend

Die Tages-/Wochenreports und Audits melden „Organik weiter stark, +20 Klicks" auf Basis **kumulierter 90-Tage-Fenster** — die steigen fast immer, auch wenn die Wochenleistung fällt. Zusätzlich überwachen die Reports das falsche Ads-Konto (Kunden-ID 5588393563 statt 748-342-2182) und GA4 zeigt wegen Tracking-Lücken ~14 Nutzer/Woche statt real ~650 Sessions. Fix: Maßnahme A5.

---

## 3. Maßnahmenkatalog

Bewertungsskala je Maßnahme: **W** = Wahrscheinlichkeit, dass die Maßnahme den beschriebenen Effekt erzielt (niedrig/mittel/hoch) · **I** = Impact auf die Ziele Anfragen/GEO/Rankings (niedrig/mittel/hoch) · **A** = Aufwand.

---

## Handlungsfeld A — Geld retten & Messbarkeit herstellen (Woche 1–2)

### A1 · Google Ads: Konto konsolidieren, Kampagne von „Traffic" auf „Leads" umbauen

**Befund (Fehler):** Im Konto **Yellow-Boat Consulting (748-342-2182)** läuft die Kampagne „Website traffic-Search-1": 90 Tage = 831 € / 233 Klicks / 5.546 Impressionen / **0 Conversions**; davon die letzten 30 Tage = 820 € / 225 Klicks — der Spend läuft praktisch komplett seit dem 06.07. und aktiv weiter (zuletzt 40–50 €/Tag). Die Suchbegriffe zeigen massiven Broad-Match-Streuverlust: bezahlt wurden u. a. „pilot ausbildung" (3,26 €), „excel lernen", „power point schulung", „az 104", „ms 900", „business central lernen", „youtube copilot tutorial", „copilot exam". Nur ~15 % des Spends ging auf kaufnahe Begriffe („copilot studio kurs" 27,66 €, „copilot training" 14,12 €, „m365 schulung" 8,43 €). Das Konto „Copilotenschule" (480-547-8290) ist leer (0 Kampagnen mit Daten); dort verfällt außerdem der 400-€-Gutschein, wenn bis **15.08.2026** keine 400 € Spend auflaufen. Die Health-Check-Reports prüfen ein drittes Konto (5588393563) und melden fälschlich „0 aktive Kampagnen".

**Bewertung:** W: **hoch** (der Verlust ist gemessen, kein Modell) · I: **hoch** (~660 €/Monat Budget wird von Streuverlust auf kaufnahe Klicks umgelenkt; bei CPCs von 2–8 € und 2–5 % LP-Conversion sind 3–8 Anfragen/Monat aus SEA realistisch) · A: 1 Tag + 1 h/Woche Pflege.

**Umsetzung (nachbaubar):**
1. **Kontoentscheidung:** Ein Konto führen. Empfehlung: Kampagne im Yellow-Boat-Konto pausieren und im Konto „Copilotenschule" (480-547-8290) neu aufbauen — das sichert zugleich den 400-€-Gutschein (Deadline 15.08.: dafür Tagesbudget erste Woche ~55 €/Tag). Falls der Gutschein egal ist: im Yellow-Boat-Konto umbauen, Copilotenschule-Konto schließen.
2. **Conversion-Grundlage vor dem Start (siehe A2):** Conversion-Aktionen „Lead (danke_page_view)" und „Kontakt (mail/phone_click)" müssen im *selben* Konto existieren, in dem die Kampagne läuft.
3. **Kampagnenstruktur (Suchkampagne, Ziel „Leads", Gebotsstrategie erst „Klicks maximieren", nach ≥15 Conversions „Conversions maximieren"):**
   - AG 1 „Copilot Schulung" — Phrase/Exakt: "copilot schulung", "microsoft copilot schulung", "copilot training", "microsoft copilot training", "m365 copilot schulung", "copilot seminar", "copilot kurs" → Zielseite `/trainings` (bzw. neue Inhouse-LP aus B2, sobald live)
   - AG 2 „KI-Pflichtschulung / EU AI Act" — "ki schulungspflicht", "ki schulung pflicht", "eu ai act schulung", "ai act schulung", "ki kompetenz schulung", "ki schulung für mitarbeiter", "ki schulung mitarbeiter" → Zielseite `/trainings/eu-ai-act-pflichtschulung` (Preis 49 € steht dort — perfekte Ads-LP)
   - AG 3 „Copilot Studio/Agenten" — "copilot studio schulung", "copilot studio training", "copilot agenten schulung" → `/trainings/copilot-studio-ki-agenten`
   - AG 4 „Workshop" — "copilot workshop", "microsoft copilot workshop" (Wettbewerb LOW, CPC 2,46–6,84 €) → `/workshops`
4. **Negativ-Liste (Konto-Ebene, Start):** pilot, ausbildung pilot, flugzeug, excel lernen, powerpoint, business central, dynamics, az 104, az 900, ms 900, ms 102, exam, zertifizierungsprüfung, github, kostenlos, gratis, youtube, tutorial, privat, gehalt, jobs, stellenangebote, was ist, wie funktioniert.
5. **Budget:** 20–25 €/Tag nach der Gutschein-Woche (~600–750 €/Monat, entspricht heutigem Spend — nur eben gezielt).
6. **Reporting:** In `website-health-check/SCHEDULED-TASK-PROMPT.md` die Ads-Konto-ID auf die gewählte ID korrigieren; Wochenreport: Cost, Conversions, CPA, Suchbegriffs-Check (jede Woche 5 Min. Negativs nachpflegen).

### A2 · Ads-Conversion-Verkabelung prüfen und reparieren

**Befund (Fehler):** Die Website sendet Conversions an das hartkodierte Tag `AW-18244137495` mit Lead-Label-Fallback (src/lib/ads.ts:28,39). `danke_page_view` feuert korrekt (Danke.tsx:34) und Formular/Booking leiten auf `/danke`. Trotzdem zählt die aktive Kampagne 0 Conversions über 90 Tage — bei nachweislich ~6 Formular-Submits/Woche (Clarity). Wahrscheinlichste Ursache: Das Conversion-Tag `AW-18244137495` gehört nicht zum Konto, in dem die Kampagne läuft (drei Konto-IDs im Spiel), oder die Conversion-Aktion ist dort nicht als „Primär" verknüpft. Zusätzlich: Das Kontakt-Label ist nur über die Env-Variable `VITE_ADS_LABEL_CONTACT` aktiv — ist sie im Build nicht gesetzt, feuern mail_click/phone_click nie (ads.ts:40).

**Bewertung:** W: hoch · I: **hoch** (ohne Conversions kann keine Gebotsautomatik lernen; A1 bleibt sonst blind) · A: 1–2 h.

**Umsetzung:**
1. Im Ziel-Ads-Konto: Zielsetzungen → Conversions → prüfen, ob eine Aktion mit Tag-ID `18244137495` existiert. Wenn nein: neue Conversion-Aktion „Lead" anlegen, die neue `AW-…`-ID + Label in `src/lib/ads.ts` (Zeile 28/39) bzw. als `VITE_ADS_ID`/`VITE_ADS_LABEL_LEAD`-Secrets eintragen; Build deployen.
2. `VITE_ADS_LABEL_CONTACT` als GitHub-Secret setzen (zweite Conversion-Aktion „Kontakt-Klick", als „Sekundär" markieren).
3. Test: Google Tag Assistant oder Ads-Oberfläche „Conversion-Diagnose"; einmal Formular testweise absenden → `/danke` → Conversion muss innerhalb von 3 h im Konto erscheinen.
4. Danach in der Kampagne: Ziel „Leads" mit genau dieser primären Conversion-Aktion.

### A3 · GA4 reparieren: SPA-Page-Views + Ereignisse

**Befund (Fehler):** GA4 (GT-WRFMDNVV) misst ~14 Nutzer/Woche statt real ~650 Sessions. Drei Code-Ursachen (verifiziert): (1) `gtag('config')` feuert nur beim Initial-Load — kein Router-Listener, Routenwechsel erzeugen keine page_views (ads.ts:119; Grep über src/: kein useLocation-Tracking). (2) `trackConversion()` sendet Events nur an Clarity + Ads, **nie an GA4** (analytics.ts:30–37) — GA4 kennt keine einzige Conversion. (3) Consent Mode v2 gated GA4 korrekt, aber dadurch zählt GA4 strukturell nur Einwilliger (~20–40 %). Punkt 3 ist Design, 1+2 sind Bugs. (Deckt Memory-Punkte C aus der 33x-Diskrepanz-Analyse ab.)

**Bewertung:** W: hoch · I: mittel (Grundlage für Ads-Remarketing-Listen, Kanalvergleich, spätere Attribution) · A: 2–3 h.

**Umsetzung:**
1. In `App.tsx` (oder eigener Hook): `useLocation()` + `useEffect` → bei Pfadwechsel `window.gtag('event','page_view',{page_path: location.pathname, page_title: document.title})` — mit ReactSnap-Guard (`/ReactSnap/i.test(navigator.userAgent)` → return), wie in main.tsx:13 etabliert.
2. In `analytics.ts` → `trackConversion()`: zusätzlich `window.gtag?.('event', eventName, {event_category:'conversion', value})` senden.
3. In GA4-Admin: `danke_page_view`, `contact_form_submit`, `booking_click`, `konfigurator_submit`, `roi_generator_ppt_success` als Schlüsselereignisse markieren.
4. Verifikation nach 48 h: GA4-Echtzeitbericht beim Durchklicken; Wochenreport sollte auf ≥100 Nutzer/Woche springen (Einwilligerquote bleibt der Deckel — das ist ok und DSGVO-konform).

### A4 · Clarity-Consent-Asymmetrie auflösen (DSGVO-Risiko)

**Befund:** Clarity wird in `main.tsx:13–15` **vor jeder Consent-Entscheidung** initialisiert und ist nicht ans ConsentBanner gekoppelt; GA4 dagegen ist sauber gated. Das ist (a) ein DSGVO/TTDSG-Risiko (Session-Recording ohne Einwilligung) und (b) der Grund, warum Clarity ~33× mehr misst als GA4 — eure Messwelten sind nicht vergleichbar.

**Bewertung:** W: hoch (Rechtsrisiko real; Abmahnpraxis bei Session-Recording-Tools existiert) · I: mittel (Risikovermeidung; Datenkonsistenz) · A: 2 h + kurze juristische Einordnung.

**Umsetzung (Empfehlung):** Clarity in den Consent-Flow aufnehmen: Init erst nach „Akzeptieren" (ConsentBanner-Callback), bei Ablehnung `Clarity` gar nicht laden. Alternativ (wenn Messverlust nicht akzeptabel): Clarity mit maskiertem Content + IP-Anonymisierung als berechtigtes Interesse dokumentieren — dann aber Datenschutzerklärung entsprechend schärfen und bewusst dokumentierte Risikoentscheidung treffen. Wichtig: Nach Umstellung sinken Clarity-Zahlen um die Nicht-Einwilliger-Quote — Baseline-Bruch im Reporting annotieren (A5).

### A5 · Reporting-Hygiene: Trends sichtbar machen statt verschleiern

**Befund:** (1) Reports/Audits nutzen kumulative 3M-Zähler als „Wachstumsbeleg" — die aktuelle Stagnation wurde dadurch systematisch als „Organik weiter stark" gemeldet. (2) Falsches Ads-Konto im Report (s. A1). (3) Teams-Webhook „Marketing und SEA" seit 03.08. HTTP 401 — Wochenreport erreicht niemanden. (4) PageSpeed/CWV-Modul seit 27.05. still entfernt; die offene Notiz „Startseite Lab-LCP ~19 s" ist unbearbeitet. (5) A/B-Test-Reports liefen zweimal ohne Daten (Login-Blocker).

**Bewertung:** W: hoch · I: mittel (Entscheidungsqualität; ihr hättet die Stagnation 2 Wochen früher gesehen) · A: 2–3 h.

**Umsetzung:**
1. `SCHEDULED-TASK-PROMPT.md` ergänzen: Pflichtblock „7-Tage-Klicks/Impressionen vs. Vorwoche (echte Wochenfenster aus Tagesdaten, nicht GSC-3M)"; Ampel rot bei −20 % W/W ohne Saison-Erklärung. Die Tagesdaten liegen via Supermetrics-GSC-API vor (funktioniert, heute verifiziert — Login-unabhängig!). Empfehlung: GSC-Datenabruf der Reports generell von Chrome auf die Supermetrics-API umstellen.
2. Ads-Konto-ID korrigieren (A1 Schritt 6).
3. Teams-Workflow „Beim Empfang einer Webhook-Anfrage" neu autorisieren, neue URL als `TEAMS_WEBHOOK_MARKETING_SEA` in `website-health-check/.env`.
4. PageSpeed-API-Key anlegen (C1-Draft von 09.07. liegt vor: eigener Key, reduzierte Frequenz 1×/Woche) und CWV zurück in den Report; dabei die LCP-19s-Notiz einmal sauber verifizieren (Lab vs. Feld — bei 145 ms TTFB ist 19 s fast sicher ein Lab-Artefakt des Consent-Banners/LCP-Elements, aber das gehört geklärt).
5. A/B-Test-Auswertung: einmal wöchentlich manuell in Clarity (Anleitung in C1) ODER eine Chrome-Session mit eingeloggtem Clarity für den Report-Task bereithalten.

---

## Handlungsfeld B — Transaktionale Sichtbarkeit: dort ranken, wo gebucht wird

**Kontext (Keyword Planner, Deutschland, Ø-Suchvolumen/Monat, 06/2025–05/2026):**

| Cluster | Keyword | Vol./M | Wettbewerb | Top-of-Page-CPC |
|---|---|---:|---|---|
| **Compliance/Pflicht** | ki schulungspflicht | **2.900** | HIGH | 2,45–7,91 € |
| | ki schulung für mitarbeiter | 390 | HIGH | bis 14,62 € |
| | ki kompetenz schulung | 320 | HIGH | 0,39–3,07 € |
| | ki schulung pflicht | 320 | HIGH | 2,02–4,87 € |
| | eu ai act schulung | 210 | HIGH | 3,28–14,63 € |
| | ai act schulung | 90 | HIGH | 3,38–13,13 € |
| | ki führerschein | 1.000 | MEDIUM | 1,57–3,53 € |
| **Copilot-Schulung** | copilot schulung | 260 | HIGH | 2,17–6,71 € |
| | copilot training | 170 | MEDIUM | 1,77–7,06 € |
| | microsoft copilot schulung | 110 | HIGH | 1,93–7,61 € |
| | microsoft copilot training | 90 | MEDIUM | 2,38–8,51 € |
| | copilot workshop | 70 | **LOW** | 2,46–6,84 € |
| | copilot seminar / kurs / studio schulung | je 30–40 | — | — |
| **Umfeld** | ki schulung unternehmen | 90 | HIGH | bis 15,24 € |

Eure Ist-Positionen für die Kaufbegriffe: „copilot schulung" ~Pos. 50 · „ki schulung für mitarbeiter" ~Pos. 60 · „ai act schulung" ~Pos. 66 · „copilot workshop" ~Pos. 27–36 · „copilot training" Pos. 11 (steigend, erste Klicks am 28.07.). Das Compliance-Cluster ist ~5× größer als das Copilot-Cluster — und ihr habt dort bereits Themen-Autorität (#1 für den EU-AI-Act-Artikel) und ein Produkt (49-€-Pflichtschulung).

### B1 · Compliance-Cluster kommerziell erschließen: „KI-Pflichtschulung"-Landingpage + Zertifikat als Produktmerkmal

**Befund (Potential):** 3.800+ Suchen/Monat im Pflicht-Cluster, informationale Autorität vorhanden (`/wissen/eu-ai-act-mitarbeiter-schulung-august-2026` #1, `/wissen/ki-schulung-mitarbeiter-pflicht` 534 Impressionen bei Pos. 40), Produkt vorhanden (EU-AI-Act-Pflichtschulung, 2–3 h online, ab 49 €/TN inkl. Zertifikat) — aber **keine transaktionale Seite**, die „ki schulungspflicht / ki schulung für mitarbeiter"-Sucher auffängt. Wettbewerber (121WATT, Haufe, sogar copilot-schulung.de) vermarkten ihr Teilnahmezertifikat aggressiv als „KI-Kompetenz-Nachweis gemäß Art. 4 KI-VO". Der EU AI Act ist seit 02.08.2026 in Kraft — der Nachfrage-Peak ist JETZT (euer eigener Artikel-Gewinn +10 Klicks in 2 Wochen belegt es).

**Bewertung:** W: mittel-hoch (Autorität + Momentum vorhanden; HIGH Competition, aber ihr startet nicht bei null) · I: **hoch** (größter adressierbarer Suchmarkt; direkt monetarisierbar über 49-€-Produkt als Einstieg + Upsell Inhouse) · A: 2–3 Tage.

**Umsetzung:**
1. Neue LP `/trainings/ki-pflichtschulung-mitarbeiter` (oder Ausbau der bestehenden EU-AI-Act-Produktseite — Empfehlung: **Ausbau der bestehenden Seite** plus 301-sauberem Fokus, um keine Kannibalisierung zu erzeugen). Title: „KI-Schulung für Mitarbeiter nach EU AI Act (Art. 4) — ab 49 €/TN inkl. Zertifikat". H1 entsprechend.
2. Inhalt (Entscheider-Perspektive): Wer ist verpflichtet (Art. 4 KI-VO), bis wann, was droht, was die Schulung abdeckt, Zertifikat-Muster abbilden („Nachweis KI-Kompetenz gem. Art. 4 KI-VO" — Zertifikat entsprechend benennen!), Ablauf in 5 Schritten, Staffelpreise (ab 49 €/TN, Gruppenpreise), FAQ mit Kauffragen (Kosten, Dauer, Nachweispflicht, Online-Format, Wiederholung nötig?).
3. Interne Verlinkung mit kommerziellen Ankern („KI-Pflichtschulung mit Zertifikat buchen") aus den beiden rankenden Wissensartikeln + `/wissen/ki-kennzeichnungspflicht-eu-ai-act` — jeweils im oberen Drittel (additive Änderung, Protected-Pages-Regeln beachten: nur Links ergänzen, Schnellantwort/FAQ unangetastet).
4. CLAUDE.md-Pflicht-Checkliste (Route + reactSnap + sitemap + Build-Test) → Push durch Martin → IndexNow + GSC.
5. Ads-Anzeigengruppe 2 (A1) auf diese Seite schwenken, sobald live.
6. KPI: Impressionen/Klicks Query-Set „schulungspflicht|kompetenz|ai act schulung" wöchentlich; Ziel Top-10 für 2 Begriffe in 8 Wochen, ≥5 Anfragen/Monat über das 49-€-Produkt in 12 Wochen.

### B2 · Inhouse-Landingpage endlich live bringen (B3c-Draft liegt seit 06.07. fertig)

**Befund (Fehler: Umsetzungsstau, nicht Wissen):** Der komplette TSX-Draft `docs/drafts/copilot-inhouse-schulung-buchen.tsx.md` (6 Abschnitte, 5 transaktionale FAQs, Schema) wartet seit 4 Wochen auf: Kunden-Case-Freigabe, Preis-Bestätigung, Push. Für „microsoft copilot schulung", „copilot inhouse schulung", „copilot schulung für unternehmen" seid ihr unsichtbar (Pos. ~50 bzw. gar nicht), während Büro-Kaizen, GFU, Kebel, digitalwin diese SERPs mit Preis-/Termin-Seiten besetzen.

**Bewertung:** W: mittel (SEO-Vorlauf 2–4 Monate; HIGH Competition) · I: hoch (das sind die buchungsnächsten Copilot-Queries überhaupt) · A: 0,5–1 Tag (Draft existiert!).

**Umsetzung:** (1) Kunden-Case-Platzhalter entscheiden: entweder REWE/Pernod-Ricard-Freigabe einholen (Mail-Draft existiert) oder anonymisiert launchen („Lebensmittelhändler, 120 Wissensarbeiter") — nicht länger blocken lassen. (2) Preise gemäß A/B-Test-Stand eintragen (siehe C1 — die „ab"-Preise sind ohnehin schon auf den B-Routen öffentlich). (3) Benchmark-Elemente aus dem Wettbewerbs-Audit einbauen: ab-Preis, „Angebot in 24 h", Durchführungszusage, Google-5,0-Zeile, Förder-Hinweis, 3 Kauffragen-FAQs. (4) Pflicht-Checkliste → Push → IndexNow/GSC. (5) Interne Anker von Lizenzen-, Rollout-, Vergleichs-Artikel.

### B3 · Förderungs-Seite (B3b) mit AZAV-Klärung

**Befund:** Draft `copilot-schulung-foerderung-qcg-2026.tsx.md` fertig seit 06.07.; blockiert durch ungeklärten AZAV-Status. Die „Bildungsgutschein/gefördert"-Listicle-Nische wird komplett von AZAV-Anbietern besetzt (leeon.com, skill-sprinters.de); 121WATT wirbt mit KOMPASS-Förderung.
**Bewertung:** W: mittel · I: mittel · A: klein (Draft da) + Klärungsaufwand.
**Umsetzung:** (1) 30-Min-Entscheidung: AZAV-Zertifizierung anstreben (Aufwand/Kosten prüfen — mittelfristig, öffnet Bildungsgutschein-Markt) ja/nein. (2) Unabhängig davon: Seite jetzt mit den *unternehmensbezogenen* Förderwegen launchen (QCG §82 SGB III läuft über den **Arbeitgeber**, keine AZAV-Pflicht für die reine Info-Seite; Landesprogramme wie NRW-Bildungsscheck ergänzen). (3) Pflicht-Checkliste → Push.

### B4 · „copilot training/schulung" auf /trainings konsolidieren

**Befund:** Die Query „copilot training" (170/M) verteilt sich auf Startseite (~Pos. 11–15), `/trainings` und den Wissensartikel `/wissen/copilot-training-schulung` (Impressionen dort im Vergleichsfenster 82→10 — Google testet gerade die Ziel-URL neu). Genau jetzt ist das Konsolidierungs-Fenster: Fahrplan-Phase 2 (kommerzielle interne Anker auf /trainings) ist laut Repo-Grep nur teilweise umgesetzt.
**Bewertung:** W: mittel-hoch · I: mittel-hoch · A: 2–3 h.
**Umsetzung:** (1) Aus 5–7 thematisch passenden Artikeln (Excel-aktivieren, Lizenzen, Tipps&Tricks, Outlook, Rollout) je 1 Fließtext-Link mit Anker „Microsoft Copilot Training für Unternehmen" auf `/trainings` (additiv, oberes Drittel). (2) Im Wissensartikel copilot-training-schulung prominent im Einstieg auf `/trainings` verweisen („Formate und Buchung →"). (3) NICHT den Wissensartikel löschen (er fängt informationale Varianten). (4) Wöchentlich GSC-Check: welche URL rankt für „copilot training"; Ziel: `/trainings` stabil ≤ Pos. 10 in 8 Wochen.

### B5 · /workshops als Low-Competition-Chance ausbauen

**Befund:** „copilot workshop" = 70/M bei Wettbewerb **LOW** — die einzige kaufnahe Query mit schwacher Konkurrenz. Ihr steht bei Pos. 27–36. Der Seiten-Title „Copilot Workshops und Events" ist generisch (bereits im 04.08.-Report moniert).
**Bewertung:** W: hoch (LOW Competition + bestehende Seite) · I: mittel · A: 2–3 h.
**Umsetzung:** Title: „Microsoft Copilot Workshop für Teams — Inhouse & Online buchen | copilotenschule.de"; H1 „Microsoft Copilot Workshops für Unternehmen"; erster Absatz mit Formaten/Dauer/„ab"-Preis (nach C1-Entscheid); 2 Kauffragen-FAQs; interne Links von 3 Artikeln mit Anker „Copilot Workshop buchen". Pflicht-Checkliste → IndexNow.

### B6 · Indexierungslücke schließen (66 % → 90 %)

**Befund:** 72/109 indexiert; 15 „gefunden – nicht indexiert" + 10 „gecrawlt – nicht indexiert"; A6-Coverage stagniert seit >3 Wochen; 9 „Seite mit Weiterleitung"-Einträge deuten auf Altlasten in der Sitemap/GSC.
**Bewertung:** W: mittel · I: mittel (jede nicht indexierte Seite = 0 Sichtbarkeit; betrifft auch neue LPs) · A: 3–4 h initial.
**Umsetzung:** (1) In GSC die konkreten 15+10 URLs exportieren. (2) Für jede: existiert sie in sitemap.xml? Hat sie ≥2 interne In-Body-Links? (A6-Draft von 16.06. als Vorlage; die 16 gebauten Links haben 7→9/13 indexiert — Muster fortsetzen auf die restlichen URLs). (3) „Gecrawlt – nicht indexiert"-Seiten mit <500 Wörtern inhaltlich aufwerten oder bewusst aus der Sitemap nehmen (Qualitätssignal). (4) Redirect-Altlasten aus sitemap.xml entfernen. (5) Danach IndexNow-Massenping + GSC-Sitemap-Resubmit; 14-Tage-Recheck in den Weekly-Audit.

### B7 · /unsere-angebote: Client-Redirect durch Server-301 ersetzen

**Befund:** `<Navigate to="/trainings">` (App.tsx:154) + Eintrag in reactSnap.include → Google sieht ein 200-HTML statt 301; Linkkraft von 5 internen Links verpufft teilweise; GSC zählt Redirect-Karteileichen.
**Bewertung:** W: hoch · I: niedrig · A: 30 Min.
**Umsetzung:** In `public/.htaccess`: `Redirect 301 /unsere-angebote https://copilotenschule.de/trainings` (vor den SPA-Rewrite-Regeln); Route + reactSnap-Eintrag entfernen; die 5 internen Links direkt auf `/trainings` umstellen (Dateien laut Fahrplan: CopilotInExcelAktivieren, CopilotVariantenUnterschiede, CopilotInTeamsZeitGewinnen, CopilotFlexRoutingEU, CopilotRolloutLeitfaden).

---

## Handlungsfeld C — Kaufanker & Conversion (Trust auf Marktniveau)

**Benchmark-Kontext (05.08.2026, per Fetch verifiziert):** Kebel: 531–1.549 €, 15+ buchbare Termine, eKomi 4,8★/1.600, Durchführungs- + Gratis-Wiederholungs-Garantie · 121WATT: 595 €, Termine mit „nur noch 14 Plätze", Google 5★/347, TÜV/ISO, KI-VO-Art.-4-Zertifikat, DAX-Logos · it-schulungen.com: 695–1.395 €, buchbar, MS-Learning-Partner, Förder-Badge · GFU: Durchführungsgarantie, max. 8 TN · Büro-Kaizen: ProvenExpert/568.

### C1 · Preis-A/B-Test auswerten und Entscheidung herbeiführen (deine Entscheidung — hier die Auswertung + Logik)

**Befund:** Der Test läuft seit 21.07. auf 4 Produktseiten (50/50, B-Routen `/trainings/preis/:slug`, noindex, Clarity-Tag `ab_pricing`). **Es liegt bis heute keine einzige ausgewertete Zahl vor** — beide automatisierten Wochenreports (21.07., 27.07.) scheiterten an fehlenden Clarity-Logins. Bei ~650 Sessions/Woche site-weit und 4 Testseiten mit zusammen grob 30–60 Sessions/Woche wird das Signifikanzkriterium (≥100 Sessions + ≥10 Conversions je Variante) **erst in Monaten** erreicht — der Test blockiert derweil den Preis-Rollout auf 6 von 7 Produktseiten und die Offer-Preise im Schema.
**Kontext für deine Entscheidung:** (a) Alle relevanten Wettbewerber zeigen Preise. (b) Für GEO sind sichtbare Preise Zitier-Grundlage — LLMs können euch ohne Preis schlechter empfehlen (llms.txt nennt „ab 49 €" bereits, die Website nicht — Inkonsistenz). (c) Die stärksten kommerziellen Klick-Queries sind Kosten-Queries. (d) Das B2B-Argument gegen Preise (Verhandlungsspielraum) bleibt über „ab"-Preise gewahrt.
**Bewertung:** W: hoch, dass die Auswertung Klarheit bringt · I: hoch (Preistransparenz ist Conversion- UND GEO-Hebel) · A: 1 h Auswertung + 0,5 Tag Rollout falls entschieden.
**Umsetzung (Auswertung, einmal 20 Min. in Clarity, eingeloggt):**
1. Clarity → Projekt `wxppg5394j` → Filter Custom-Tag `ab_pricing` = A bzw. B, Zeitraum 21.07.–heute.
2. Je Segment notieren: Sessions, `booking_click` + `contact_form_submit` + `konfigurator_submit` (= Leads), `danke_page_view`, Scroll-Tiefe auf den 4 Testseiten.
3. Zusatzsignal (weil n klein): Sessions mit Preis-Störer-Sichtkontakt vs. Absprung <10 s; `ab_pricing_product`-Verteilung.
4. **Entscheidungslogik-Vorschlag:** Wenn B nach ≥4 Wochen nicht klar schlechter ist (Lead-Rate B ≥ 0,7× A), empfiehlt die Datenlage + Wettbewerbslage den Rollout „Preise sichtbar" auf alle 7 Trainings (Infrastruktur steht: `visiblePrice` + `priceLine`-Slot; B-Routen 301 auf A; Offer-Preise ins Schema — Regeln stehen in generateTrainingDetailSchema). Wenn B klar schlechter (<0,5× A bei ≥5 Leads Differenz): Preise nur auf EU-AI-Act behalten und stattdessen „Preis-Rahmen auf Anfrage in 24 h" testen. Ich bereite dir die Auswertung auf, sobald du in Clarity eingeloggt bist oder mir den Report gibst — **Entscheidung bleibt bei dir.**

### C2 · Externes Bewertungssiegel aufbauen (Budget reicht)

**Befund:** Ihr zeigt „5,0 auf Google" als Text — Wettbewerber führen eKomi 4,8★/1.600, Google 5★/347, ProvenExpert/568. Ohne verifizierbares Siegel mit Anzahl verliert ihr jeden Shortlist-Vergleich und jedes LLM-Trust-Ranking. D1 (ProvenExpert) steht seit Juni offen — einziger Blocker: Account-Anlage (Captcha = 15 Min. Martin-Zeit).
**Bewertung:** W: hoch · I: hoch (wirkt auf SEO-CTR via Sternen-Snippets, Conversion UND GEO gleichzeitig) · A: 15 Min. Setup + laufend Bewertungen einsammeln; Kosten ~30–60 €/M (im 200-€-Budget).
**Umsetzung:** (1) ProvenExpert-Konto anlegen (Premium-Plan für Widget/Siegel). (2) Google-Bewertungen importieren lassen. (3) Nach jedem Training automatisiert (Smartlead-Sequenz, siehe E1) Bewertungslink an Teilnehmer + Auftraggeber senden — Ziel ≥15 Bewertungen in 8 Wochen (DoD #8). (4) Widget auf Startseite ersetzt die Text-Zeile; Sterne-Zeile zusätzlich auf `/trainings` + Produktseiten (sichtbarer Text, kein aggregateRating-Schema — Self-Serving-Regel bleibt gewahrt). (5) Alternativ/zusätzlich kostenlos: Google-Reviews-Anzahl neben 5,0 nennen („5,0 ★ · 27 Google-Bewertungen") — nur mit echter Anzahl.

### C3 · Garantietermine + Durchführungszusage

**Befund:** Keine offenen Termine, keine Durchführungsgarantie — Kebel/GFU führen beides prominent; 121WATT verknappt („nur noch 14 Plätze"). Entscheider brauchen ein datierbares Angebot für die interne Abstimmung.
**Bewertung:** W: mittel-hoch · I: mittel-hoch · A: organisatorisch 0,5 Tag, Code 2 h.
**Umsetzung:** (1) 2 offene Online-Termine/Quartal für EU-AI-Act-Pflichtschulung + Copilot-Grundlagen festlegen (Bookings-Buchungslink existiert). (2) „Garantierte Durchführung ab 3 Teilnehmenden" + „Verschiebung bis 14 Tage kostenfrei" (steht schon in den Konditionen!) als sichtbare Badges in die Faktenbox (`priceLine`-Slot-Nachbar). (3) Termin-Zeile in Faktenbox + Schema `CourseInstance` mit `startDate`.

### C4 · Kundenlogos + Zertifikats-Badge sichtbar machen

**Befund:** CustomerLogos rendert Text-Fallbacks, weil unter `public/images/customer-logos/` keine SVGs liegen (Komponente schaltet automatisch auf Bilder um, sobald Dateien da sind — verifiziert 20.07.). 121WATT & Co. zeigen Logos.
**Bewertung:** W: hoch · I: niedrig-mittel · A: 1–2 h (+ Freigaben).
**Umsetzung:** 6 SVGs beschaffen/nachzeichnen (REWE, Pernod Ricard, Lekkerland, Marriott, Med360Grad, IHK Nord Westfalen), als `{name}.svg` ablegen — fertig. Rechtlich: Klarnamen-Nennung ist bereits entschieden; für Logos je Kunde kurze Freigabe-Mail (Draft `b4-kunden-logo-freigabe-mails.md` existiert). Zusätzlich: Zertifikat „KI-Kompetenz gem. Art. 4 KI-VO" als Badge auf Produktseiten (siehe B1).

### C5 · Funnel-Brücke bauen: TrainingCTA einbauen, ArticlePopup zähmen, Hero-CTA setzen

**Befund (Fehler, dreiteilig, alle verifiziert):**
1. `TrainingCTA.tsx` wird **nirgends importiert** (Grep: einziger Treffer die Komponente selbst) — das Event `content_cta_click` kann nie feuern; die Statuslogs führten die Brücke fälschlich als „live seit 12.06.". Funnel Wissen→Angebot: 0 % bei 53 % Artikel-Traffic (≈350 Sessions/Woche ohne jeden Weiterleitungspfad außer Sticky-CTA).
2. `ArticlePopup.tsx`: starrer 20-s-Timer, kein sessionStorage-Cap — bei jedem Artikelwechsel erscheint das Popup erneut (Zeile 8, 22–28). Dead-Click-Rate 12,9 %, Fix-Draft liegt seit 17.06. unverbaut in docs/drafts/.
3. `Hero.tsx`: `scrollToContact` definiert, aber kein einziger CTA-Button im JSX (Button importiert, ungenutzt) — die Startseite (Top-Einstiegsseite, 40 Besuche/3 T) hat above-the-fold kein Klickziel Richtung Anfrage.
**Bewertung:** W: hoch · I: hoch (bestehender Traffic × bestehende Conversion-Rate ~3 % → jede zusätzliche Brücke wirkt sofort) · A: 0,5–1 Tag gesamt.
**Umsetzung:**
1. **TrainingCTA v2 einbauen:** In `ContentLayout.tsx` nach dem ersten Content-Drittel (nicht Artikelende) als optionaler Slot; kontextuelle Varianten: Endanwender-Artikel → „Ihr Team soll das flächendeckend können? → Trainings ansehen" bzw. Multiplikator-Dreh (Train-the-Trainer); Entscheider-Artikel (Lizenzen, Rollout, ROI, Betriebsrat, EU-AI-Act) → „15-Min-Erstgespräch" (Bookings). Rollout zuerst auf die Top-10-Traffic-Artikel. Messung via bestehendem `content_cta_click`-Tag.
2. **ArticlePopup:** Fix-Draft von 17.06. pushen + ergänzen: `sessionStorage`-Cap (max. 1×/Session), Trigger 50-%-Scroll ODER Exit-Intent statt 20 s; auf Endanwender-Artikeln Lead-Magnet statt „Training anfragen" (guides.ts hat 7 passende Magnete).
3. **Hero:** Primär-Button „Kostenloses Erstgespräch buchen" (`bookingUrl` aus lib/booking.ts, trackt bereits booking_click) + Sekundär „Trainings ansehen" → `/trainings`; `scrollToContact` kann weg.

---

## Handlungsfeld D — GEO: Vom Content-Lieferanten zum empfohlenen Anbieter

**Ist-Stand (live geprüft):** robots.txt erlaubt alle Crawler implizit (kein AI-Crawler-Block — gut), llms.txt + llm.txt existieren identisch, LLM-Referral-Traffic ist messbar (Copilot 3 + Perplexity 3 Sessions/3 T), die eigene Vergleichsseite rankt #1. **Aber:** LLMs empfehlen Anbieter auf Basis von Drittquellen-Konsens — und der existiert für euch nicht.

### D1 · Erwähnungs-Offensive: Verzeichnisse, Listicles, Profile (größte GEO-Lücke)

**Befund (Fehler):** Externe Erwähnungen ≈ null. Konkret verifiziert: Das einzige gefundene Verzeichnis-Listing ([seminarmarkt.de](https://www.seminarmarkt.de/Seminare/Microsoft-Copilot-und-Compliance-Rechtssichere-KI-Nutzung,p3736396)) liefert **404**; in den relevanten Listicles ([mod-education.de](https://www.mod-education.de/blog-posts/beste-ki-weiterbildungen-deutschland-2026), [skill-sprinters.de](https://skill-sprinters.de/blog/foerderung/beste-ki-weiterbildung-bildungsgutschein/), [leeon.com](https://leeon.com/beste-ki-training-anbieter-bildungsgutschein-2026)) stehen Haufe, WBS, alfatraining & Co. — copilotenschule.de nirgends. Die D2/D3/D4-Outreach-Drafts liegen fertig in `docs/outreach/`, **unversendet seit Wochen**. sameAs verweist auf Springest — Profil-Status unklar. Kein Google Business Profile für das Trainingszentrum Nippes auffindbar in den Daten.

**Bewertung:** W: hoch (Verzeichniseinträge sind deterministisch; Listicles zu ~30–50 % Erfolgsquote bei passendem Pitch) · I: **hoch** (wirkt dreifach: LLM-Zitierbarkeit, Backlinks/DR 19, direkte Leads über Portale) · A: initial 1 Tag, dann 1–2 h/Woche; Kosten: 0–100 €/M (im Budget).

**Umsetzung (Reihenfolge nach Aufwand/Nutzen):**
1. **Sofort reparieren:** seminarmarkt.de-Eintrag erneuern (aktuelles 404-Listing), dabei alle 7 Trainings listen.
2. **Kostenlose/verifizierende Profile:** Google Business Profile „Copilotenschule — Trainingszentrum Köln-Nippes" (Kategorie Schulungszentrum; Fotos aus dem Repo vorhanden: Training_Nippes1.png etc.; Bewertungen dorthin lenken) · kursfinder.de · Edukatico · Springest-Profil prüfen/vervollständigen (steht schon im sameAs!) · eventuell WLW („Wer liefert was") für B2B.
3. **Listicle-Outreach:** Die fertigen D3-Drafts an mod-education, ki-trainingszentrum, cmt versenden (je 10 Min.); zusätzlich skill-sprinters + leeon anschreiben, sobald Förderseite (B3) live ist (deren Listen sind förder-fokussiert). Pitch-Kern: einziger reiner Copilot-Spezialist, 2.000+ Geschulte, 49-€-AI-Act-Zertifikatskurs.
4. **PR-Mini-Hebel (0 €):** Yellow-Boat-Gastartikel (D5) + 1 Fachartikel-Pitch an eine HR-/L&D-Publikation (z. B. Personalwirtschaft, HR Journal) zum Thema „KI-Schulungspflicht seit 02.08. — was Arbeitgeber jetzt tun müssen" mit Autorenprofil-Link.
5. **Monitoring:** In den wöchentlichen LLM-Visibility-Check 2 Empfehlungs-Prompts ergänzen („Welchen Anbieter für Microsoft-Copilot-Schulungen in Deutschland empfiehlst du?" / „KI-Pflichtschulung Anbieter") — Nennungsrate als KPI; Ziel ≥1 externe Listicle-Erwähnung in 8 Wochen (DoD #7).

### D2 · Sichtbare Fakten = zitierfähige Fakten: Preise, Zahlen, Konsistenz

**Befund:** Die llms.txt nennt „ab 49 €" — die Website zeigt außer auf der EU-AI-Act-Seite keinen Preis (Inkonsistenz = Trust-Malus für Maschinen wie Menschen). Auf `/trainings` und den Detailseiten fehlen im sichtbaren Text: Preis, max. Gruppengröße (steht nur in Faktenbox mancher Seiten), Google-Bewertung, Trainer-Credentials. LLMs (außer Gemini) lesen kein JSON-LD — sichtbarer Text ist der GEO-Hebel (eure eigene Doku bestätigt das).
**Bewertung:** W: hoch · I: hoch · A: 0,5 Tag (nach C1-Preisentscheid).
**Umsetzung:** (1) Nach C1-Entscheid: „ab X €"-Zeile in Faktenbox aller 7 Trainings (`priceLine`-Slot existiert). (2) Auf `/trainings` unter jeder Trainings-Karte Preis-ab-Zeile + oben eine Zeile „5,0 ★ Google · 2.000+ geschulte Wissensarbeiter · Microsoft-Partner". (3) Trainer-Block auf jeder Detailseite: „Ihr Trainer: Martin Lang — seit 2011 Trainer, 2.000+ geschulte Wissensarbeiter, Microsoft-Partner" (2 Sätze reichen). (4) llms.txt aktualisieren: Preisspannen aller Trainings, Telefon + E-Mail als Klartext, Zeile „Zuletzt aktualisiert: YYYY-MM-DD" — und bei jedem Preis-/Angebots-Update mitpflegen (llm.txt identisch halten!).

### D3 · „In 30 Sekunden"-Faktenblock + Kauffragen-FAQs

**Befund:** Es gibt keinen früh platzierten, zusammenhängenden, zitierfähigen Absatz, der Anbieter+Angebot+Beleg+Preis bündelt. Produktseiten-FAQs decken Kaufentscheidungsfragen (Kosten, Zertifikat, Gruppengröße, Ablauf) nicht ab — genau die Fragen, die Entscheider LLMs stellen.
**Bewertung:** W: mittel-hoch · I: mittel-hoch · A: 0,5 Tag.
**Umsetzung:** (1) Startseite, direkt unter Hero/CustomerLogos: 5-Zeilen-Box „Die Copilotenschule in 30 Sekunden" — ein Fließtext-Absatz: spezialisierter Anbieter ausschließlich für Microsoft-Copilot-Schulungen · Inhouse, Live-Online, Lernreisen · 2.000+ geschulte Wissensarbeiter u. a. bei REWE, Pernod Ricard, Marriott · 5,0 ★ Google · Angebot in 24 h · ab-Preis. (2) Je Produktseite 3 FAQ ergänzen nach der bestehenden Entscheider-Formel: „Was kostet …", „Bekommen Teilnehmende ein Zertifikat (Art.-4-Nachweis)?", „Wie läuft die Buchung ab?" — additive Änderung, FAQ-Schema wird zentral generiert (stripMarkdownLinks beachten).

### D4 · Bing/Copilot-Kanal ausbauen + robots.txt-Feinschliff

**Befund:** Bing liefert bereits 9–11 % der Sessions — überdurchschnittlich, und Microsoft Copilot (euer Zielsystem Nr. 1!) grounded auf Bing. IndexNow läuft. Bing Webmaster Tools ist verbunden, wird aber in keinem Report ausgewertet. robots.txt hat keinen llms.txt-Hinweis als echte Direktive.
**Bewertung:** W: mittel · I: mittel (Copilot-Empfehlungen sind für eure Zielgruppe der natürlichste Kanal: die fragen Copilot nach Copilot-Schulungen) · A: 2 h.
**Umsetzung:** (1) Bing WMT: Indexierungs-Coverage einmal prüfen (URL-Submission-Quota nutzen), Top-Queries in den Wochenreport aufnehmen (Supermetrics-BW-Anbindung ist authentifiziert — kann automatisiert werden). (2) Bing Places für den Standort Köln anlegen. (3) robots.txt: Kommentar durch echte Zeile `# llms-txt: https://copilotenschule.de/llms.txt` + explizite Allow-Blöcke für GPTBot/ClaudeBot/PerplexityBot/Google-Extended ergänzen (symbolisch, schadet nicht, dokumentiert Absicht). (4) `/wissen/claude-in-microsoft-copilot` aktuell halten — die Seite ist euer #1-Klickbringer und das Claude/Copilot-Thema euer Differenzierer.

### D5 · LLM-Monitoring härten

**Befund:** Der wöchentliche LLM-Check (OpenAI, 8 Fragen × 3 Samples) läuft nur gegen ein Modell; Ahrefs Brand Radar ist mangels Abo nicht nutzbar; /dashboard ist per robots.txt gesperrt (korrekt), daher keine externe Verifikation.
**Bewertung:** W: hoch · I: niedrig-mittel (Steuerungsgröße für das GEO-Ziel) · A: 2–3 h.
**Umsetzung:** `scripts/build-llm-visibility.js` erweitern: (1) 2 Kauf-Prompts ergänzen (s. D1). (2) Perplexity-API (günstig) als zweite Engine; optional Gemini. (3) Wettbewerber-Nennungen (Kebel, 121WATT, Büro-Kaizen, GFU, it-schulungen) mitzählen → Share-of-Voice-Zeitreihe im Dashboard.

---

## Handlungsfeld E — Nurturing automatisieren (Smartlead als Motor)

### E1 · Follow-up-Sequenzen auf Gated Downloads + Bewertungs-Loop

**Befund:** Das Gated-Download-System (/guidelines, 7 Lead-Magnete, Double-Opt-in via api/download-lead.php) sammelt E-Mails — danach passiert **nichts**. 0 % wiederkehrende Besucher; jede B2B-Kaufentscheidung dauert länger als eine Session. Smartlead ist vorhanden (Versanddomain copiloten-schule.de, wochentags aktiv).
**Bewertung:** W: hoch · I: hoch (verwandelt vorhandene Downloads in Pipeline; Kosten 0 zusätzlich) · A: 1 Tag Setup, dann laufend.
**Umsetzung:**
1. Download-Leads (newsletter_subscriptions_export/DB des PHP-Backends) wöchentlich als Smartlead-Liste importieren (CSV-Export existiert; mittelfristig per API/Webhook aus download-lead.php automatisieren).
2. Sequenz „Download-Nurture" (4 Mails, 1/3/7/14 Tage): (1) Mehrwert-Anschluss zum Download-Thema + Link auf passenden Wissensartikel · (2) Fallstudie/ROI („REWE-Case", ROI-Generator-Link) · (3) Einladung Erstgespräch (Bookings) mit konkretem Nutzenversprechen · (4) EU-AI-Act-Frist + 49-€-Pflichtschulung als Low-Friction-Angebot.
3. Separate 2-Mail-Sequenz „Bewertung" an Teilnehmer nach jedem Training (speist C2/ProvenExpert).
4. DSGVO: Nurture nur an Double-Opt-in-Kontakte; Abmeldelink; Versanddomain warm halten (getrennt von Cold-Outbound-Listen führen!).
5. KPI: Open/Reply-Rate, Erstgespräche aus Sequenz (UTM `utm_source=nurture`).

### E2 · ROI-Generator vom Artikel-Feature zum Lead-Magnet Nr. 1 machen

**Befund (Potential):** Der neue ROI-Business-Case-Generator (PPT/XLSX-Ausgabe, `roi_generator_ppt_success` feuert bereits — 2 Erfolge in der ersten Woche!) ist genau der Entscheider-Magnet aus dem alten Plan #11 — aber er lebt versteckt im Artikel `/wissen/copilot-roi-berechnen` ohne eigene Route.
**Bewertung:** W: mittel-hoch · I: mittel-hoch · A: 0,5 Tag.
**Umsetzung:** (1) Eigene Route `/roi-rechner` (Route + reactSnap + Sitemap + Title „Copilot ROI-Rechner: Business Case in 3 Minuten als PowerPoint"), Artikel behält den eingebetteten Generator. (2) E-Mail-Pflicht vor PPT-Download (RoiDeliveryForm existiert — prüfen, dass Lead in die Nurture-Liste läuft). (3) TrainingCTA-Variante „Business Case für Ihr Management? → ROI-Rechner" auf Lizenzen-/Kosten-/Rollout-Artikeln. (4) Als Ads-Sitelink + LinkedIn-Post-Serie nutzen.

### E3 · Outbound-LP reparieren oder Kampagne pausieren

**Befund:** `/sml/hr-tipps_2026`: >5 Wochen 0 Conversions bei laufender Cold-Mail-Kampagne; 6–15 % Scroll, ~8–15 s Verweildauer. Die Mails funktionieren (Klicks kommen), die LP nicht.
**Bewertung:** W: mittel-hoch · I: mittel · A: 0,5 Tag.
**Umsetzung:** LP radikal kürzen: 1 Screen = Nutzenversprechen + 3 Bullets + Bookings-Kalender direkt eingebettet (ein einziges CTA-Ziel, keine Navigation); alternativ auf den ROI-Rechner (E2) als Ziel umstellen — „Ihr individueller Copilot-Business-Case in 3 Minuten" konvertiert kalte HR-Kontakte plausibler als generische Tipps. Bis zur Umstellung: Kampagne pausieren (spart Domain-Reputation).

### E4 · Monatliches Entscheider-Webinar als Mittelstufe

**Befund:** Zwischen „Artikel lesen" und „Erstgespräch buchen" fehlt eine risikofreie Zwischenstufe; 0 % Wiederkehrer.
**Bewertung:** W: mittel · I: mittel · A: 2 h/Monat wiederkehrend.
**Umsetzung:** 30-Min-Format „Copilot live: Was Ihr Team damit wirklich schafft" (Teams-Webinar, monatlich, feste Serie); Anmeldung = Lead in Nurture-Liste; Aufzeichnung als Gated Content; Einladung über Smartlead-Sequenzen (E1/E3), Website-Banner + LinkedIn. Start: September (nach den Ferien).

---

## Handlungsfeld F — Absicherung & Wiedervorlagen

### F1 · Beobachtungsaufträge aus der Stagnations-Analyse

1. **`/trainings/train-the-trainer-copilot`** (Impressionen 25→1): GSC-URL-Prüfung ausführen; Live-Title mit Stand vor 22.07. vergleichen (git log der TSX); wenn deindexiert/degradiert: IndexNow + GSC-Resubmit, ggf. Title-Revert. **Frist: diese Woche.**
2. **`/trainings` Query-Mix-Position** (27→37,8): 2 Wochen beobachten (Weekly-Audit hat die Daten); Eskalation nur bei anhaltender Verschlechterung UND Impressionsrückgang.
3. **`/wissen/copilot-betriebsrat`** (11→0 Klicks): Title/H1-Diff seit 15.07. prüfen; bei Meta-Änderung Revert (Sofort-Reaktions-Regel aus dem Projektplan greift).
4. **Rollback-Kriterium (aus Fahrplan übernommen):** Fallen die Gesamt-Klicks >20 % über 4 Wochen unter Saison-Erwartung, werden die jüngsten Meta-Änderungen einzeln zurückgerollt.

### F2 · Wiedervorlagen

- **UCP-Check Q4/2026** (Google Universal Commerce Protocol für Dienstleistungen/EU) — Termin steht.
- **AZAV-Entscheidung** (aus B3) bis Ende August.
- **A/B-Test-Entscheid** (C1) bis spätestens 01.09. — sonst blockiert er D2/B2 weiter.
- **Ferien-Rebound-Check** KW 36 (ab 31.08.): Wochen-Klicks sollten Richtung 190–220 zurückkehren; wenn nicht, Diagnose-Session.

---

## 4. Roadmap (bei 10+ h/Woche)

**Woche 1 (bis 09.08.) — Geld & Grundlagen [~10 h]:**
Ads-Kontoentscheidung + Conversion-Verkabelung (A1/A2, 4 h — vor dem 15.08. wegen Gutschein!) · ArticlePopup-Fix + Hero-CTA pushen (C5, 2 h) · train-the-trainer-Prüfung (F1, 1 h) · Teams-Webhook + Report-Konto-ID (A5, 1 h) · ProvenExpert-Konto anlegen + seminarmarkt reparieren (C2/D1, 2 h).

**Woche 2 (bis 16.08.) — Messbarkeit & Brücken [~10 h]:**
GA4-SPA-Tracking + Events (A3, 3 h) · Clarity-Consent-Entscheidung (A4, 2 h) · TrainingCTA v2 auf Top-10-Artikel (C5, 3 h) · A/B-Test-Auswertung gemeinsam (C1, 1 h) · Ads-Suchbegriffs-Pflege (1 h).

**Woche 3–4 — Transaktionale Offensive [~20 h]:**
Compliance-LP/Produktseiten-Ausbau + Zertifikat-Framing (B1, 8 h) · Inhouse-LP B3c live (B2, 4 h) · Preis-Rollout gemäß C1-Entscheid + llms.txt-Update (D2, 4 h) · interne Anker-Links (B4, 2 h) · /workshops (B5, 2 h).

**Woche 5–6 — GEO & Trust [~20 h]:**
Verzeichnis-Profile + Listicle-Outreach versenden (D1, 6 h) · Faktenblock + Kauffragen-FAQs (D3, 4 h) · Garantietermine + Badges (C3, 4 h) · Förderseite B3b (B3, 3 h) · Indexierungs-Sprint (B6, 3 h).

**Ab Woche 4 parallel, laufend:** Smartlead-Nurture-Sequenzen (E1, Setup 1 Tag) · ROI-Rechner-Route (E2) · Outbound-LP (E3) · Webinar-Start September (E4) · LLM-Monitoring-Ausbau (D5).

**Erwartungswerte (konservativ, bei Umsetzung A–E):** SEA 3–8 Anfragen/Monat ab September · Bestands-Traffic-Conversion von ~3 % auf 4–5 % (C5/C2/C3) ≈ +3–5 Anfragen/Monat · Compliance-Cluster ab Oktober +100–300 kaufnahe Sessions/Monat mit 3–5 % Conversion · Nurture reaktiviert 5–10 % der Download-Leads. Der Pfad zu 20+/Monat ist damit rechnerisch gedeckt, hängt aber an konsequenter Umsetzung der Wochen 1–4.

---

## 5. Anhang

### 5.1 Verifizierte Kernzahlen

- GSC-Tagesdaten 01.05.–04.08.2026 via Supermetrics (sc-domain:copilotenschule.de); Wochensummen siehe 2.1; Seiten-/Query-Vergleich 23.07.–04.08. vs. 09.–21.07.
- Google Ads Yellow-Boat (748-342-2182): 90 T = 830,87 € / 233 Klicks / 0 Conversions; 30 T (06.07.–04.08.) = 820,06 € / 225 Klicks; Kampagne „Website traffic-Search-1", Status enabled. Konto Copilotenschule (480-547-8290): keine Kampagnendaten.
- Keyword-Volumina: Google Keyword Planner via Supermetrics, DE/Deutsch, 06/2025–05/2026 (Tabelle in Handlungsfeld B). Nicht zurückgegeben (kein eigenes Volumen, Long-Tail): „copilot inhouse schulung", „copilot schulung köln", „microsoft 365 copilot schulung", „ki weiterbildung unternehmen" u. a.
- Code-Befunde: TrainingCTA ohne Import (Grep) · Hero ohne CTA (Hero.tsx:7 definiert, ungenutzt) · ArticlePopup 20-s-Timer ohne Cap (ArticlePopup.tsx:8,23) · ads.ts:28 `AW-18244137495` hartkodiert, LABEL_CONTACT env-abhängig (ads.ts:40) · trackConversion ohne GA4-Event (analytics.ts:30–37) · Clarity ungated (main.tsx:13) · danke_page_view feuert (Danke.tsx:34).
- Wettbewerbs-/GEO-Belege: Live-Fetches vom 05.08.2026 (URLs in den Maßnahmen).

### 5.2 Bewusste Nicht-Empfehlungen

- **Kein Umbau der Wissensartikel-Substanz** (Protected-Pages-Regel bleibt; AI-Overview-Erosion bekämpft man nicht durch Umschreiben der How-tos, sondern durch Zitierbarkeit + Transaktions-Verlagerung).
- **Kein Rollback des Produktseiten-Umbaus** — die Daten entlasten ihn; die Struktur (Faktenbox, BookingProcess, Reviews) ist Benchmark-konform.
- **Keine gekauften Backlinks** (Penalty-Risiko; DR 19 wächst über D1 organisch).
- **Kein Tool-Wechsel im Nurturing** — Smartlead reicht für Sequenzen; CRM-Frage erst ab ~20 Leads/Monat neu bewerten.

### 5.3 Quellen (extern)

[schulkalender.eu — Sommerferien 2026](https://schulkalender.eu/blog/sommerferien-deutschland-vergleich-2026/) · [seotrust.de — AI Overviews Deutschland Status](https://www.seotrust.de/news/google-aio-deutschland-2026/) · [smartlemon.de — AIO-Studie DE](https://www.smartlemon.de/blog/studie-auswirkungen-ai-overviews-deutschland/) · [kebel.de](https://www.kebel.de/microsoft-365-copilot-grundlagen-schulung/) · [121watt.de](https://www.121watt.de/seminare/copilot-seminar/) · [it-schulungen.com](https://www.it-schulungen.com/seminare/kunstliche-intelligenz/microsoft-copilot/index.html) · [gfu.net](https://www.gfu.net/copilot/copilot-schulung.html) · [buero-kaizen.de](https://www.buero-kaizen.de/microsoft-copilot-schulung-seminar-training/) · [haufe-akademie.de](https://www.haufe-akademie.de/36149) · [copilot-schulung.de](https://copilot-schulung.de/) · [mod-education.de](https://www.mod-education.de/blog-posts/beste-ki-weiterbildungen-deutschland-2026) · [skill-sprinters.de](https://skill-sprinters.de/blog/foerderung/beste-ki-weiterbildung-bildungsgutschein/) · [leeon.com](https://leeon.com/beste-ki-training-anbieter-bildungsgutschein-2026) · [seminarmarkt.de (404-Listing)](https://www.seminarmarkt.de/Seminare/Microsoft-Copilot-und-Compliance-Rechtssichere-KI-Nutzung,p3736396)

---

*Erstellt am 05.08.2026 · Analyse: Claude (Cowork) · Alle Zahlen am 05.08.2026 live erhoben; Code-Belege gegen den Repo-Stand vom 05.08.2026 verifiziert.*
