# SEO-Monatsreview copilotenschule.de — Juni 2026

**Erstellt:** 10. Juni 2026 (Cron `copilotenschule-seo-monthly-review`, autonom)
**Berichtszeitraum:** 27.05.2026 (Baseline) bis 10.06.2026 · GSC-Fenster 28T / 3M
**Phase:** Phase 3 — Content-Block (aktiv seit 01.06.2026)
**Datengrundlage:** GSC (Chrome, live), Clarity API (1 Call, 3T) + Clarity Dashboard (Chrome, 30T) + 1 Heatmap-Drilldown, AlwaysData (Chrome), WebSearch-Wettbewerbscheck. SSR-Audit aus letztem Weekly-Audit fortgeschrieben (siehe Abschnitt 3).

---

## 1. Executive Summary

Das technische Fundament steht: SSR ist seit dem A2-Fix stabil (0 🔴), die Indexierung klettert langsam aber stetig (44 % → 47 %), und der Hub-Artikel B2 („Schulungsanbieter-Vergleich") rankt im Wettbewerbscheck inzwischen auf **Platz 1** für die strategische Kernabfrage — ein klarer Fortschritt gegenüber ~#7 im Mai und der wahrscheinliche Durchbruch bei DoD-Kriterium #6. Der Traffic wächst gesund (AlwaysData 24h: 358 → 374), getragen von zwei **neu aufgestiegenen** organischen Themen-Clustern: „Copilot in Outlook" und „Claude in Microsoft Copilot".

Dem steht ein hartes, jetzt klar belegtes Problem gegenüber: **Der Funnel bricht vollständig zwischen Content und Angebot.** 297 Sessions erreichten in 30 Tagen einen Wissensartikel, **0 %** gingen weiter zu Trainings/Konfigurator — Seiten pro Sitzung liegt bei 1,0. Die SEO-Maschine bringt Besucher, aber es gibt keine Brücke vom Artikel zum Angebot. Parallel eskaliert die Dead-Click-Rate weiter (11 % → 19,4 % → **21,4 %** 3T) und ist nun per Heatmap auf konkrete DOM-Elemente der Top-Traffic-Seite lokalisiert. Beide Befunde sind diesen Monat die wichtigsten Hebel — und beide sind mit überschaubarem Code-Aufwand adressierbar.

**Definition-of-Done-Score: 4 von 8** (fest: #2, #4; neu erreicht/wahrscheinlich: #5, #6) — Verbesserung gegenüber 2–3/8 im Vormonat.

---

## 2. Definition-of-Done-Tabelle (8 Zielmesswerte)

| # | Kriterium | Ziel | Aktuell (10.06.) | Abstand | Trend |
|---|-----------|------|------------------|---------|-------|
| 1 | Indexierungsquote GSC | ≥ 90 % | **47 %** (43/91) | −43 pp | ↑ langsam (44 %→47 %, +3 pp/Monat) |
| 2 | SSR-Audit 🔴 „kaputt" | ≤ 5 | **0** ✅ | erfüllt | → stabil seit A2-Fix |
| 3 | SEO-Score (Health Check) | ≥ 75 | **42** (Stand 27.05., veraltet) | −33 | — kein frischer Score in diesem Lauf |
| 4 | GEO-Score | ≥ 80 | **82** ✅ | erfüllt | → gewahrt, LLM-Referrer aktiv |
| 5 | Top-Klick-Bringer ≥ 5 versch. URLs | ≥ 5 | **~6 URLs** ✅ | erfüllt (neu) | ↑ Klicks streuen breiter |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | Top 3 | **#1 im Such-Check** ✅* | erfüllt (wahrsch.) | ↑↑ von ~#7 |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** | −1 | → D3-Outreach 22.06. |
| 8 | ProvenExpert-Bewertungen | ≥ 15 | **0** | −15 | → D1-Reminder heute |

\* Wettbewerbscheck via WebSearch (nicht standort-/personalisierungsbereinigt). GSC-Impressionen für die exakte Strategie-Abfrage sind noch jung — in 2–4 Wochen über die GSC-Query-Liste bestätigen.

**Kriterium #5 im Detail:** Klicks (28T) verteilen sich jetzt auf ~6 unterschiedliche URLs — Excel-Aktivieren-Cluster, KI-Halluzinationen, Lizenzen, Datenschutz, Claude-in-Copilot, Tipps. Damit ist die im Vormonat bemängelte Konzentration „auf wenige Pages" aufgelöst → DoD #5 als erfüllt gewertet.

---

## 3. SSR-Audit (Anfang vs. heute)

| Stand | ✅ | 🟡 | 🔴 | von | Quelle |
|-------|----|----|----|-----|--------|
| 27.05. morgens (Baseline) | 22 | 5 | 40 | 67 | A1-Audit |
| 27.05. nach A2-Fix | 71 | 1 | 0 | 72 | End-to-End-Test |
| 09.06. (letzter Weekly) | 72 | 1 | 0 | 73 | Weekly-Audit |
| **10.06. (heute)** | **72** | **1** | **0** | **73** | fortgeschrieben |

**Datenhinweis (ehrlich benannt):** Ein frischer 73-URL-Sweep konnte in diesem autonomen Lauf nicht durchgeführt werden — `web_fetch` ist auf bereits referenzierte URLs beschränkt und direkte `curl`-Fetches sind in dieser Umgebung nicht zulässig. Da seit dem A2-Fix (27.05.) **kein Deploy** erfolgte (der heutige B4-Logo-Freigabe-Entwurf ist eine reine `docs/drafts/`-Datei, kein Push), ist das ausgelieferte, vor-gerenderte HTML unverändert. Der 09.06.-Wert (72 ✅ / 1 🟡 / 0 🔴) gilt daher fort. `/unsere-angebote` bleibt 🟡 (HTTP 301, unverändert wie Baseline). DoD #2 (🔴 ≤ 5) bleibt erfüllt.

---

## 4. GSC-Entwicklung

### Kennzahlen

| Fenster | Klicks | Impressionen | CTR | Ø Position |
|---------|--------|--------------|-----|------------|
| 28 Tage | 182 | 17.600 | 1 % | 11,7 |
| 3 Monate | 404 | 39.824 | 1 % | 10,3 |

3M-Werte praktisch deckungsgleich mit dem Weekly vom 09.06. (404 Klicks / 39.800 Impr. / Pos. 10,3) — erwartbar bei 1 Tag Abstand. Die 28T-Zahlen sind der frische Monatsausschnitt.

### Indexierung (4-Wochen-Trend)

| Stand | Indexiert | Nicht indexiert | Quote |
|-------|-----------|-----------------|-------|
| 27.05. (Baseline) | 38 | 49 | 44 % |
| 09.06. | 43 | 48 | 47 % |
| **10.06.** | **43** | **48** | **47 %** |

Nicht-indexiert-Gründe (48): Weiterleitung 8 · alt. kanonische Seite 3 · robots.txt 1 · **gecrawlt – nicht indexiert 20** · **gefunden – nicht indexiert 16**. Die 36 „gecrawlt/gefunden – nicht indexiert" sind der eigentliche Indexierungs-Stau und der Haupthebel für DoD #1. Kein ≥ 5 pp-Drop → kein Indexierungs-Risiko-Trigger.

### Top-Klick-Bringer (28T)

| Query | Klicks | Impr. | Pos. |
|-------|--------|-------|------|
| copilot in excel aktivieren | 8 | 676 | 6,3 |
| excel copilot aktivieren | 6 | 259 | 5,5 |
| prompt damit chatgpt nicht halluziniert | 2 | 17 | 10,1 |
| copilot excel aktivieren | 1 | 189 | 5,8 |
| copilot lizenzen | 1 | 188 | 9,8 |
| copilot datenschutz | 1 | 60 | 29,7 |
| claude in copilot nutzen | 1 | 15 | 9,9 |
| wie copilot in excel aktivieren | 1 | 8 | 5,2 |

### Top-Impressionen ohne Klick — die „Schläfer" (3M)

| Query | Impr. | Pos. | Hebel |
|-------|-------|------|-------|
| copilot training | 202 | 18,5 | Position (Seite 2 → 1) |
| copilot schulung | 163 | 49,2 | Position (Seite 5) |
| **copilot lizenz** | **162** | **8,2** | **Snippet/CTR (Seite 1, 0 Klicks!)** |
| microsoft copilot schulung | 101 | 39,8 | Position |
| **ki halluzinationen vermeiden** | **89** | **4,6** | **Snippet/CTR (Pos 4–5, 0 Klicks!)** |
| copilot workshop | 88 | 39,6 | Position |

Zwei Schläfer stehen auf Seite 1 mit **null** Klicks — „copilot lizenz" (Pos 8,2) und „ki halluzinationen vermeiden" (Pos 4,6). Das ist ein reines Snippet-/Title-Problem: Position ist da, das Snippet zieht nicht. Schnellster CTR-Gewinn des Monats (siehe Empfehlung 2).

### Strategische Keywords — erste Signale

- **EU AI Act / Pflichtschulung** (B3a-Thema) taucht erstmals organisch auf: „ai pflichtschulung mitarbeiter" (10 Impr, Pos 32,4), „wer ist zur ki-schulung verpflichtet" (5, Pos 61,8), „ki pflichtschulung führungskräfte" (7, Pos 57,1), „bin ich verpflichtet meine mitarbeitenden in ki-kompetenz zu schulen" (4, Pos 32,8). Nachfrage ist real, Position schwach → **B3a-Hub (15.06.) gut getimt.**
- **Schulungsanbieter-Vergleich** (B2): „schulungsanbieter" (2 Impr, Pos 19,5), „anbieter microsoft copilot einführung unternehmen" (21 Impr, Pos 7,3). Impressionen noch jung — passt zum frisch indexierbaren B2-Hub.
- **Neu & ungeplant: „Claude in Copilot"-Cluster.** Dutzende Long-Tail-Varianten (claude copilot, microsoft copilot claude, claude in microsoft copilot, anthropic claude in copilot …). Die Seite `/wissen/claude-in-microsoft-copilot` ist in Clarity bereits #4 (36 Visits/30T). Organisch entstandenes Thema mit Eigendynamik → verstärken (siehe Abschnitt 6d).

---

## 5. AlwaysData-Wachstum

| Metrik | Wert | Trend |
|--------|------|-------|
| 24h (09.→10.06.) | **374 Visits** | +16 vs. 09.06. (358), +4,5 % |
| Juni (Teilmonat, Stand 09.) | 2.633* | — |
| Mai komplett | 12.456* | +65 % vs. April |
| Jahres-Total 2026 | 34.242* | — |

\* **Datenhinweis:** Die Monats-/Jahreswerte stammen aus der Logfile-Statistik der Vorwochen. In diesem Lauf ließ sich aus dem Highcharts-„Number of visits"-Panel nur der 24h-Wert sauber auslesen (374); das „All"-Aggregat las anomal niedrig (4.498) und ist nicht mit der Logfile-Reihe vereinbar — die beiden Quellen messen Unterschiedliches (gefilterte Visits vs. Logfile-Hits). Der 24h-Wert ist belastbar und mit der 09.06.-Reihe (358) vergleichbar. Monats-/Jahreswerte zur manuellen Bestätigung markiert.

---

## 6. Clarity-Conversion-Analyse

### Standard-Metriken — 3T (API) vs. 30T (Dashboard)

| Metrik | 3T (API) | 30T (Dashboard) | Monatstrend (Weekly-Aggregation) |
|--------|----------|-----------------|----------------------------------|
| Sessions | 117 (6 Bots) | 480 (50 Bots) | 9→100→93→117 (3T-Werte steigend) |
| Seiten/Sitzung | 1,03 | 1,0 | flach bei ~1 |
| Scrolltiefe | 51,3 % | 45,2 % | 47,6 → 44,3 → 53,4 → 51,3 |
| Aktive Zeit | 109 s | 1,6 min (96 s) | 140 → 90 → 99 → 109 s |
| **Dead-Click** | **21,4 %** ⚠️ | 15,4 % (74 Sess.) | **11,1 → 11 → 19,4 → 21,4 % (eskaliert)** |
| Rage / Quickback / Exc.-Scroll | 0 / 0 / 0 % | Übermäßige Klicks 0,21 % | stabil niedrig |
| ScriptError | 0,85 % (8) | — | neu erfasst |

**Zielgruppen-Verifikation (3T):** Edge gesamt 49/117 (42 %), PC 85 %, DACH 96 % (DE 102, CH 7, AT 3), Windows 81. Das B2B-/Microsoft-Umfeld der Zielgruppe ist klar bestätigt.

### Conversion-Events 30T (alle erfassten)

| Event (auto-Smart) | Sessions |
|--------------------|----------|
| Ausgehender Klick | 8 |
| Kontaktieren Sie uns | 5 |
| Formular absenden | 1 |
| trainer_application_submit (Custom) | 1 |

**Custom-Tag-Lücke besteht weiter:** `contact_form_submit`, `konfigurator_submit`, `mail_click`, `phone_click`, `pdf_download` feuern nicht unter ihrem technischen Namen (nur `trainer_application_submit` erscheint). Conversions passieren real (Auto-Smart-Events „Kontaktieren Sie uns" 5 + „Formular absenden" 1), werden aber von den Custom-Tags nicht erfasst → valide Pro-Event-Conversion-Messung weiterhin blockiert. **User-Verifikation der Tag-Implementierung weiterhin offen (seit 06.06.).**

**Conversion-Rate 30T:** Kontakt-Intent ~6/480 = **1,25 %**; inkl. ausgehender Klicks 14/480 = 2,9 % (im B2B-Benchmark 2–5 %).

### Top-3 „Goldene Pages" (GSC-Top × Clarity-Traffic)

1. **`/wissen/copilot-in-excel-aktivieren`** — GSC #1-Klick-Bringer (8 Klicks/676 Impr) + Clarity 18 Visits/30T. Organische Gold-Ader.
2. **`/wissen/ki-halluzinationen-vermeiden`** — GSC Pos 4,6 (89 Impr) + Clarity 33 Visits/30T. Hoher Traffic, aber CTR-Schläfer.
3. **`/wissen/claude-in-microsoft-copilot`** — Clarity 36 Visits/30T, GSC-Cluster im Aufbau. Neu, wächst.

### Top-3 „Bremsen" (Top-Traffic × ~0 Conversion)

Alle drei Goldenen Pages sind zugleich Bremsen: **sie konvertieren bei ~0 %.** Schärfste Bremse:

1. **`/wissen/copilot-in-outlook-nutzen-tipps`** — 73 Visits/30T (Top-Seite!), 0 Conversions, **plus Dead-Click-Cluster** (siehe Heatmap).
2. **`/wissen/ki-halluzinationen-vermeiden`** — 33 Visits, 0 Conversions, CTR-Schläfer.
3. **`/wissen/claude-in-microsoft-copilot`** — 36 Visits, 0 Conversions.

### Funnel-Visualisierung — „Lead-Reise: SEO → Angebot → Kontakt" (30T)

| Stufe | Definition | Sessions | Anteil | Δ zur Vorstufe |
|-------|------------|----------|--------|----------------|
| 0 | Alle Sessions | 480 | 100 % | — |
| 1 | Wissens-Artikel besucht | 297 | 61,9 % | — |
| 2 | Angebot angeschaut (Trainings/Konfigurator) | **0** | **0 %** | **−100 %** ⛔ |
| 3 | Kontakt/Formular | ~6 | 1,25 % | (über Direkt-Einstieg, nicht aus Funnel) |

**Funnel-Rate Stufe 1→2 = 0 % → < 2 %-Schwelle massiv unterschritten → Issue „Funnel-Optimierung gesamtsystemisch" eröffnet.** Das ist der dominante Befund des Monats: SEO funktioniert (297 Sessions auf Wissensartikeln), aber **niemand navigiert vom Artikel zum Angebot.** Seiten/Sitzung = 1,0 bestätigt es — Besucher lesen genau einen Artikel und gehen. Es fehlt schlicht die Content→Angebot-Brücke (In-Content-CTA, „Passendes Training"-Block, kontextuelle Verlinkung).

### Heatmap-Drilldown — `/wissen/copilot-in-outlook-nutzen-tipps` (30T: 48 Pageviews / 35 Klicks)

| Rang | Element | Klicks | Anteil | Bewertung |
|------|---------|--------|--------|-----------|
| 1 | `svg.lucide.lucide-x[1]` | 8 | 22,86 % | ⚠️ Dead-Click-Verdacht (X-Icon) |
| 2 | „Für die Basic-Funktionen (Chat im Seiten…)" | 2 | 5,71 % | Textlink |
| 3 | `DIV.absolute.backdrop-blur-sm[1]` | 2 | 5,71 % | ⚠️ Dead-Click-Verdacht (Overlay-Backdrop) |

**Befund:** Das meistgeklickte Element der Top-Traffic-Seite ist ein **`lucide-x` (Schließen-Icon)** — fast jeder vierte Klick. Dazu ein **`backdrop-blur`-Overlay-Div**. Beides sind klassische Nicht-Navigations-Ziele (X-Icon ohne sinnvolle Funktion / dekorativer Overlay, der Klicks abfängt). Das erklärt die Dead-Click-Eskalation: Sie korreliert zeitlich exakt mit dem Aufstieg dieser Seite von ~0 auf #1. Konkreter Fix in Abschnitt 10 + Folge-Cron.

---

## 7. Cross-Korrelation GSC × Clarity × AlwaysData

- **Goldene Pages = Investition wert:** Excel-Aktivieren + KI-Halluzinationen + Claude-in-Copilot ziehen Klicks UND Traffic. Aber: 0 % Conversion → „goldener Traffic, kein Gold gehoben." Erst die Funnel-Brücke macht sie wertvoll.
- **Bremsen = erste Optimierungs-Priorität:** Dieselben Top-Seiten. `/wissen/copilot-in-outlook-nutzen-tipps` ist die schärfste (höchster Traffic + Dead-Clicks + 0 Conversion).
- **Direkt-Aufrufe (AlwaysData/Clarity hoch, GSC niedrig):** Clarity zeigt 51 Direct/null-Sessions (3T). `/wissen/claude-in-microsoft-copilot` erhält mehr Clarity-Visits (36) als die GSC-Klicks erklären → wahrscheinlich **LLM-Citations** (ChatGPT/Claude-Referrer messbar) oder Direkt. Quelle quantifizierbar, sobald Clarity AI-Sichtbarkeit aktiviert ist (siehe Abschnitt 8).

---

## 8. LLM-Sichtbarkeit-Trend

**Datenhinweis (ehrlich benannt):** Eine authentische Live-Abfrage von ChatGPT / Perplexity / Claude („Wer sind die besten Anbieter für Microsoft-Copilot-Schulungen in Deutschland?") ist im autonomen Lauf nicht möglich (keine angemeldeten Sessions dieser Drittdienste; eine Selbst-Abfrage als Claude wäre kein valider Sichtbarkeits-Test). Stattdessen empirischer Proxy:

- **Clarity-LLM-Referrer:** 3T — ChatGPT 1 Session. Vorwoche (7T, 09.06.) — Perplexity 6 + ChatGPT 2 + Claude.ai 1 = **9 Sessions/7T**. LLM-Traffic ist real und wiederkehrend.
- **GEO-Score:** 82 (zuletzt 27.05.) — über Ziel (80), gewahrt.
- **Clarity „AI-Sichtbarkeit" (BETA) entdeckt — aber NICHT aktiviert:** Die Funktion bietet zwei direkt relevante Reports — **Citation** (LLM-Zitate) und **Bot Activity** (KI-Crawler). Status: „Domain Verification Required" — benötigt eine GSC-/Bing-Verknüpfung. **Aktivierung würde die LLM-Sichtbarkeit systematisch und automatisch messen** und die manuelle 3-LLM-Abfrage ersetzen. → Empfehlung 5. (Im autonomen Lauf nicht selbst verknüpft — erfordert User-Autorisierung.)

---

## 9. Top 3 Wins / Top 3 Probleme

**Wins**

1. **B2-Hub rankt #1** für „Microsoft Copilot Schulungsanbieter Deutschland 2026" (war ~#7) → DoD #6 wahrscheinlich erfüllt.
2. **SSR stabil + Indexierung steigt** (44 %→47 %), DoD #2 fest erfüllt, technische Wurzel geheilt.
3. **Zwei neue organische Traffic-Cluster** („Copilot in Outlook", „Claude in Copilot") wachsen ohne gezielten Push — Beleg für GEO-/Content-Sog.

**Probleme**

1. **Funnel-Totalbruch Content→Angebot** (0 % Stufe 1→2, Seiten/Sitzung 1,0) — das teuerste Leck.
2. **Dead-Click-Eskalation** (11 %→21,4 %), lokalisiert auf `lucide-x` + `backdrop-blur` der Top-Seite.
3. **Indexierungs-Stau** (36 Seiten „gecrawlt/gefunden – nicht indexiert") deckelt DoD #1 weiterhin bei 47 %.

---

## 10. Konkrete Empfehlungen (5) — Was · Warum · Aufwand · Erfolgs-KPI

**1. Content→Angebot-Brücke in allen Top-Wissensartikeln (höchste Priorität)**
- *Was:* In jeden High-Traffic-Wissensartikel (Outlook, Excel, Claude, Halluzinationen, Lizenzen) einen kontextuellen „Passendes Training"-/CTA-Block mittig + am Ende einbauen, der auf das thematisch passende Training/`/trainings`/Konfigurator verlinkt.
- *Warum:* 297 Sessions/30T erreichen Stufe 1, 0 % gehen weiter. Die Brücke ist das fehlende Bauteil zwischen funktionierendem SEO und 0 Conversion.
- *Aufwand:* M (1 wiederverwendbare TSX-Komponente + Einbau pro Artikel). Folge-Cron `copilotenschule-pattern-transfer-2026-06-24` legt Code-Diff in `docs/drafts/` an.
- *KPI:* Funnel-Rate Stufe 1→2 von 0 % auf ≥ 5 % in 30T; Seiten/Sitzung > 1,2.

**2. Snippet-/Title-Optimierung der Seite-1-Schläfer**
- *Was:* Title + Meta-Description von `/wissen/microsoft-copilot-lizenzen` („copilot lizenz" Pos 8,2) und `/wissen/ki-halluzinationen-vermeiden` (Pos 4,6) auf CTR optimieren (Zahl/Nutzen/Jahr ins Snippet).
- *Warum:* Position bereits Seite 1, aber 0 Klicks bei 89–162 Impressionen → reines Snippet-Problem, sofort hebelbar.
- *Aufwand:* S (2 Dateien, je Title + Description). Protected-Page-Regel beachten (beide sind geschützt).
- *KPI:* CTR dieser Queries von 0 % auf ≥ 2 %; +10–20 Klicks/Monat.

**3. Dead-Click-Fix auf `/wissen/copilot-in-outlook-nutzen-tipps`**
- *Was:* `svg.lucide.lucide-x[1]` (22,9 % der Klicks) und `DIV.absolute.backdrop-blur-sm[1]` im TSX prüfen — X-Icon funktional machen oder entfernen, Backdrop dismissibel machen oder als `cursor-default`/`pointer-events-none` markieren.
- *Warum:* Dead-Click-Rate eskaliert (21,4 %), Treiber per Heatmap lokalisiert. UX-Frust auf der Top-Traffic-Seite.
- *Aufwand:* S (1 TSX-Datei). Folge-Cron `copilotenschule-clarity-fix-copilot-in-outlook-nutzen-tipps` (+7 Tage) schreibt Diff.
- *KPI:* Dead-Click-Rate zurück < 12 % in 2 Wochen.

**4. Indexierungs-Stau angehen (C4 Schema + interne Verlinkung)**
- *Was:* Die 36 „gecrawlt/gefunden – nicht indexiert" URLs prüfen — Schema.org-Konsolidierung (C4) + stärkere interne Verlinkung dünner Seiten. C4 zahlt zugleich auf DoD #3 (SEO-Score 42) ein.
- *Warum:* Indexierung bei 47 % gedeckelt; DoD #1 (Ziel 90 %) ist die größte offene Lücke. Conductor hat C4 für den 17.06.-Lauf zur 14-Tage-Schwelle vorgemerkt.
- *Aufwand:* L. Beim Phase-Conductor-Lauf 17.06. als Draft-Cron einplanen.
- *KPI:* Indexierungsquote ≥ 55 % in 4–6 Wochen; SEO-Score ≥ 60.

**5. Clarity „AI-Sichtbarkeit" aktivieren**
- *Was:* In Clarity unter „AI-Sichtbarkeit (BETA)" die Domain via Bing Webmaster Tools oder GSC verifizieren → Citation- + Bot-Activity-Reports freischalten.
- *Warum:* Misst LLM-Zitate/KI-Crawler automatisch und systematisch — ersetzt die nicht-autonom durchführbare 3-LLM-Handabfrage und quantifiziert den GEO-Traffic.
- *Aufwand:* S (einmalig, User-Aktion — Autorisierung nötig).
- *KPI:* LLM-Citation-Tracking ab nächstem Monatsreview als Datenquelle verfügbar.

---

## 11. Risiken (max. 3)

| Risiko | Bewertung | Mitigation |
|--------|-----------|------------|
| Funnel bleibt bei ~1 % → Traffic-Wachstum erzeugt keine Leads | mittel–hoch | Empfehlung 1 (Content→Angebot-Brücke) priorisiert; Pattern-Transfer-Cron 24.06. |
| Conversion-Messung bleibt blind (Custom-Tags feuern nicht) | mittel | User-Verifikation der 5 Custom-Tags; bis dahin Auto-Smart-Events als Proxy nutzen |
| Indexierungsquote stagniert → DoD #1 unerreichbar | mittel | C4 + interne Verlinkung (Empfehlung 4); 17.06.-Conductor legt Draft-Cron an |

---

## 12. Anhang — Neue Clarity-Insights-Einträge des Monats

Drei Einträge wurden in `docs/clarity-insights.md` ergänzt (siehe dort):
1. **Issue (eskaliert):** Dead-Click 21,4 % — Heatmap-lokalisiert auf `lucide-x` + `backdrop-blur` von `/wissen/copilot-in-outlook-nutzen-tipps`. Fix-Cron +7 Tage.
2. **Issue (systemisch):** Funnel-Bruch Content→Angebot 0 % (Stufe 1→2). Pattern-Transfer-Cron +14 Tage.
3. **Trend (verstärken):** Neue organische Cluster „Copilot in Outlook" + „Claude in Copilot" wachsen ohne Push → Content-Block-Priorität.

---

*Bericht autonom erstellt. Keine Code-Pushes. Folge-Crons dokumentiert in `seo-status-log.md`. Offene User-Aktionen: (1) Custom-Conversion-Tags verifizieren, (2) Clarity AI-Sichtbarkeit aktivieren, (3) AlwaysData Monats-/Jahreswerte gegenchecken.*
