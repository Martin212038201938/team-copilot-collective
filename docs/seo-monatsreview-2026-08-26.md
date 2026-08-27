# SEO-Monatsreview copilotenschule.de — 26. August 2026

**Cron-Lauf:** `copilotenschule-seo-monthly-review` (Zusatzlauf am 4. Mittwoch; der reguläre 2.-Mittwoch-Review lief am 12.08., Bericht `seo-monatsreview-2026-08.md`). Dieser Bericht liegt bewusst unter eigenem Datum, um den 12.08.-Review nicht zu überschreiben.
**Phase:** Phase 3 — Content-Block (aktiv seit 01.06.2026, kein Wechsel). Phase 4 (Off-Page) läuft seit 25.06. parallel.
**Datengrundlage:** SSR-Audit (curl/Googlebot-UA gegen alle 84 Nicht-PDF-Sitemap-URLs, live), GSC (Chrome, live — Property `sc-domain:copilotenschule.de`, Leistung 3M/28T frisch vor ~5 h, Index-Report Stand 21.08.), AlwaysData (Chrome, live), Clarity Standard-Metriken (API 3T, 1/10 Calls) + Clarity Dashboard 30T (Chrome, vollständig: Conversion-Events, Traffic-Mix, Funnel, Heatmap-Kennzahlen), Wettbewerbs- + LLM-Check via WebSearch. Kampagnen-Segmentierung (cpc/email vs. organic) über Clarity-Kanal.

---

## 1. Executive Summary

Der organische Kern wächst unverändert stark und ohne jeden Eingriff weiter: GSC steht im 3-Monats-Fenster bei **1.960 Klicks / 156.000 Impressionen / Position 8,5** — beide absolute Projekt-Höchststände, +18 % Klicks und +16 % Impressionen gegenüber dem 12.08.-Review. SSR ist stabil bei 84/84 (0 🔴), copilotenschule.de rankt im Wettbewerbscheck weiter auf **Platz 1** für die strategische Kernabfrage, und der LLM-Kanal hält sein Niveau (AIPlatform 60 Sessions/30T). Die Indexierung auf der verbindlichen bereinigten Basis liegt bei **85,1 %** (74/87) — der beste je gemessene Wert, seit dem 20.08. um +1,2 pp gestiegen, Ziel 90 % in Reichweite.

Der teuerste offene Befund bleibt unverändert der **Funnel-Bruch Content→Angebot**: 1.738 Sessions erreichen Stufe 1 (Wissens-Artikel), nur 5 davon Stufe 2 (Angebot) — 0,29 %, End-to-End 0 %. Die additive Angebots-CTA-Brücke ist inzwischen auf allen vier Goldenen Pages live und feuert erstmals messbar (1 Klick/7T), die Wirkung auf die Stufe-2-Rate braucht aber noch Zeit. Zweite Verschiebung im Kanalbild: **Outbound bricht ein** (Email 67→20 Sessions/30T, −70 %), während **SEA weiter skaliert** (cpc 134→186, +39 %). Definition-of-Done unverändert bei **4/8** — der Fortschritt passiert innerhalb der erfüllten Kriterien, nicht bei den vier offenen (Indexierung, SEO-Score, Listicle-Erwähnung, ProvenExpert).

---

## 2. Definition-of-Done-Tabelle

| # | Kriterium | Ziel | Aktuell | Status | Trend |
|---|---|---|---|---|---|
| 1 | Indexierungsquote (bereinigte Basis) | ≥ 90 % | **85,1 %** (74/87) | 🔵 offen | ↑ +1,2 pp seit 20.08., bester Wert je |
| 2 | SSR „kaputt" 🔴 | ≤ 5 | **0** (84/84 ✅) | ✅ erfüllt | → stabil |
| 3 | SEO-Score (Health-Check) | ≥ 75 | **42** (stale, C1-Blocker) | 🔵 offen | → eingefroren (PageSpeed-Modul aus) |
| 4 | GEO-Score | ≥ 80 | **82** ✅ | ✅ erfüllt | → LLM-Traffic AIPlatform 60/30T |
| 5 | ≥ 5 Klick-Bringer-URLs | ≥ 5 URLs | **6+ URLs** ✅ | ✅ erfüllt | → gehalten |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | Top 3 | **#1 im Such-Check** ✅* | ✅ (wahrsch.) | → gehalten seit Juni |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | Drafts da, nicht versendet | 🔵 offen | → user-gebunden |
| 8 | ProvenExpert ≥ 15 Bewertungen | ≥ 15 | Profil nicht angelegt | 🔵 offen | → user-gebunden |

**Score: 4 von 8** (unverändert seit Juni). \* Wettbewerbscheck via WebSearch, nicht standort-/personalisierungsbereinigt.

### Fußnote zum Messbasis-Bruch (DoD #1)

Bis 20.08.2026 wurde die Indexierungsquote über „Alle bekannten Seiten" gemessen (enthielt Redirects, kanonische Alternativen, robots-Blocks). Seit 20.08. gilt verbindlich die Basis „Alle eingereichten Seiten" minus 6 Gated-PDFs (`seo-projektplan.md`, Messvorschrift DoD #1). **Werte vor dem 20.08. sind mit der aktuellen Quote nicht direkt vergleichbar.** Zum Kontext: „Alle bekannten Seiten" heute = 77 indexiert / 37 nicht (kein KPI).

---

## 3. SSR-Audit-Vergleich (Anfang vs. heute)

| Stand | ✅ | 🟡 | 🔴 | Basis |
|---|---|---|---|---|
| 27.05.2026 (A1-Baseline) | 31 | 2 | 38 | 71 URLs |
| 26.08.2026 (heute) | **84** | **0** | **0** | 84 Nicht-PDF-Sitemap-URLs |

Alle 84 geprüften Seiten liefern im initialen HTML (Googlebot-UA, ohne JS) seitenspezifischen Title, Meta-Description, Canonical und Body-Inhalt. DoD #2 bleibt fest erfüllt. Der Regressions-Wächter (Eskalation ab 5 🔴) ist weit im grünen Bereich. Pre-Render gesund seit 16.06.2026.

*Hinweis: Der frühere Weekly-Audit zählte 67/67 (audit-live.sh schließt `/guidelines`-Seiten aus); die curl-Prüfung dieses Laufs deckt die vollständigen 84 Nicht-PDF-URLs ab — beide Zählweisen ergeben 0 🔴.*

---

## 4. GSC-Entwicklung

### Indexierung (bereinigte Basis „eingereichte Seiten", Stand 21.08.)

| Position | Wert |
|---|---|
| Indexiert | 74 |
| Nicht indexiert (submitted) | 19 (Gefunden 14 + Gecrawlt 5) |
| Gated-PDFs (abgezogen) | 6 |
| **Indexierungsquote** | **74 / 87 = 85,1 %** |

4-Wochen-Trend auf der neuen Basis: 83,9 % (20.08.) → **85,1 %** (21.08./24.08./26.08.). A6-Summe nicht-indexiert (submitted) 20 → **19** (−1 → A6 wirkt leicht). Der GSC-Index-Report ist seit 21.08. nicht neu gecrawlt, daher flach. **Kontext „Alle bekannten Seiten" (KEIN KPI):** 77 indexiert / 37 nicht; darunter „Seite mit Weiterleitung" 10 (stabil, kein Alarm), robots 1. Der Restweg zu 90 % ist rein inhaltlich (12 „gecrawlt-nicht-indexiert" auf der Vollbasis) — über Content-Qualität/Autorität zu schließen, nicht über Technik.

### Leistung

| Fenster | Klicks | Impressionen | CTR | Ø Position |
|---|---|---|---|---|
| 3 Monate (heute) | **1.960** | **156.000** | 1,2 % | **8,5** |
| 28 Tage (heute) | 719 | 58.100 | 1,2 % | 8,2 |
| 3M zum 12.08.-Review | 1.660 | 134.000 | 1,2 % | 8,8 |
| 28T zum 12.08.-Review | 667 | 53.866 | — | 8,0 |

3M: **+18 % Klicks, +16 % Impressionen** gegenüber dem 12.08.-Review, Position leicht verbessert (8,8 → 8,5). 28T: +7,8 % Klicks, +7,9 % Impressionen; Position minimal schwächer (8,0 → 8,2, im Rauschbereich).

### Top-Queries (28T/3M)

**Nach Klicks (Kopf):** „copilot in excel aktivieren" (28/28T · 77/3M), „excel copilot aktivieren", „copilot excel aktivieren", „copilot kosten", „copilot lizenz", „copilot claude". Kopf stabil, kein Angreifer.

**Schläfer (hohe Impressionen, schwache Klicks):**

| Query | Klicks | Impressionen | Beobachtung |
|---|---|---|---|
| copilot kosten | 15 | 1.819 | Preis-Cluster — CTR-Hebel |
| copilot training | 6 | 1.532 | transaktionales Volumen wächst |
| copilot lizenz | 10 | 1.439 | Snippet-Optimierung könnte CTR heben |

Der „excel aktivieren"-Cluster bringt die Klicks, ist aber rein informational. Die kommerziell wertvollen Schläfer (**kosten, training, lizenz**) haben hohe Impressionen bei schwacher CTR → das ist derselbe Hebel, den die SEA-Synergie (Abschnitt 6) bestätigt.

---

## 5. AlwaysData-Wachstum

| Monat | Unique Visits | Δ M/M |
|---|---|---|
| Januar | 1.084 | — |
| Februar | 4.300 | +296,7 % |
| März | 6.226 | +44,8 % |
| April | 7.543 | +21,2 % |
| Mai | 12.456 | +65,1 % |
| Juni | 13.226 | +6,2 % |
| Juli | 22.503 | +70,1 % |
| **August (MTD, Tag 26)** | **14.521** | −35,5 % *(MTD-Artefakt)* |
| **YTD gesamt** | **81.859** | — |

August ist am Tag 26 noch unvollständig; Pace ~16,7 k, das erklärt das scheinbare Minus zum Voll-Monat Juli (22.503). Der Wert enthält seit KW 25 Paid- und Outbound-Traffic — der Rückgang des Outbound-Segments (siehe Abschnitt 6) dämpft die AlwaysData-Gesamtzahl gegenüber Juli zusätzlich. 24h-Wert heute: 737.

---

## 6. Traffic-Mix Organic/SEA/Outbound + Kampagnen-Wirkung

### Traffic-Mix 30T (Clarity-Kanal) — M/M-Vergleich

| Kanal | 12.08. | 26.08. | Δ |
|---|---|---|---|
| OrganicSearch | 1.542 | **1.623** | +5,3 % |
| Other | 817 | 716 | −12,4 % |
| PaidSearch (cpc/SEA) | 134 | **186** | **+38,8 %** |
| Referral | 114 | 156 | +36,8 % |
| Direct | 91 | 89 | −2,2 % |
| AIPlatform (LLM) | 61 | **60** | flat |
| Email (Outbound) | 67 | **20** | **−70,1 %** |

Organik dominiert klar (~57 % der Sessions) und wächst weiter. Referrer-Gegenprobe (API 3T): Google 161, Bing 47, Ecosia 11, DuckDuckGo 9, Teams 7 — organisch getragen.

### SEA-Wirkung
cpc skaliert weiter (+39 % M/M auf 186 Sessions/30T). Zielseiten-Drift-Check: In allen Weekly-Läufen des Monats landeten 0 cpc-Sessions auf `/wissen/`-Artikeln → SEA-Traffic korrekt auf Trainings/Konfigurator/LPs geführt. cpc-Segment zeigte in der Vorwoche Dead-Click 0 % (organischer Dead-Click-Treiber bestätigt).

### Outbound-Wirkung
Das Email-Segment ist von 67 auf **20 Sessions/30T eingebrochen** und praktisch eingeschlafen; `sml_landing_page_visit` steht bei 14, weitere `sml_*`-Events minimal. Die Outbound-LP `/sml/hr-tipps_2026` liefert weiter ~0 Conversions. **Befund: Die Outbound-Kampagne trägt derzeit kaum noch messbaren Traffic bei** — entweder Versandvolumen gedrosselt oder LP-Wirkung erschöpft. Für den SEO-Kern irrelevant, aber die AlwaysData-Gesamtzahl und der Kanal-Mix spiegeln es.

### Synergie-Check (SEA → SEO)
Die SEA-Kern-Keywords (**kosten, lizenz, training**) tauchen in GSC als organische Schläfer mit hohen Impressionen und schwacher CTR auf. Das ist ein doppeltes Signal: Die Nachfrage ist da (SEA zahlt dafür), organisch sind wir sichtbar, aber die SERP-CTR schöpft es nicht ab → **Snippet-/Title-Entstauung auf dem Kosten-/Lizenz-Cluster ist die naheliegendste Content-Maßnahme** (der Draft `protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md` adressiert genau das, wartet auf Push).

---

## 7. Clarity-Conversion-Analyse (30T)

### Standard-Kennzahlen

| Metrik | Wert |
|---|---|
| Sessions | 2.823 (436 Bots, 2.728 Unique) |
| Neue / wiederkehrende Nutzer | 97,98 % / 2,02 % |
| Seiten pro Sitzung | 1,10 |
| Scrolltiefe | 39,16 % |
| Aktive Zeit | 1,5 Min (von 3,8) |
| Tote Klicks | **13,46 %** (380 Sess) |
| Übermäßige Klicks (Rage) | 0,25 % (7) |
| Schnelle Rückkehr | 0,89 % (25) |
| Übermäßiges Scrollen | 0 % |
| Käufe (Purchase-Rate) | 0,43 % |

Edge-Anteil bei den Browsern ~50 % (API 3T: Edge 152 / Chrome 106) — starkes B2B-Signal. Herkunft Deutschland 270 von 307 (3T).

### Conversion-Events 30T (Smart Events)

Formular absenden 23 · Ausgehender Klick 23 · Kontaktieren Sie uns 21 · sml_landing_page_visit 14 · Bestellung erfolgreich 12 · lead 11 · Herunterladen 11. Custom-Tag `angebot_bruecke_click` (CTA-Brücke) feuert (Weekly 24.08.: 1×/7T). **Direkte Kontakt-/Lead-/Order-Conversion ≈ (23+21+12+11)/2.823 = ~2,4 %** — stabil im Band ~2,2–2,8 % der Vorwochen. 7e-Defekt-Check: kein Kern-Event von ≥3 auf 0 gefallen → kein Tracking-Defekt.

### Top-3 „Goldene Pages" (GSC-Top × Clarity-Traffic, organic)

1. `/wissen/microsoft-copilot-lizenzen` — GSC-Kosten/Lizenz-Cluster × Clarity 28 Visits (3T). Dauergewinner.
2. `/wissen/copilot-tipps-tricks-produktivitaet` — Clarity 34 Visits (3T), GSC-Produktivitäts-Longtail.
3. `/wissen/claude-in-microsoft-copilot` — GSC-Top-Klickbringer × Clarity 23 Visits.

### Top-3 „Bremsen" (GSC-Top-Traffic, aber schwache Weiterleitung/CTR)

1. `/wissen/microsoft-copilot-lizenzen` — höchste Impressionen (Kosten-Cluster), CTR ~0,6 % + Funnel-Weiterleitung ins Angebot ~0. Größter ungehobener Hebel (Doppelrolle: gleichzeitig Goldene Page und Bremse).
2. `/wissen/copilot-in-excel-aktivieren` — GSC-#1-Klickbringer, aber Traffic verpufft rein informational, keine Angebots-Weiterleitung.
3. `/wissen/ki-halluzinationen-vermeiden` — GSC-Top-Klicks, in Clarity-PopularPages kaum präsent → Traffic ohne Anschluss.

### Funnel „Lead-Reise: SEO → Angebot → Kontakt" (30T, Clarity-Trichter)

| Stufe | Sessions | Rate |
|---|---|---|
| 1 — Wissens-Artikel besucht | 1.738 | 61,57 % aller Sessions |
| 2 — Angebot angeschaut (Trainings/Konfigurator) | 5 | **0,29 %** von Stufe 1 |
| 3 — Kontakt | 0 | **0 % E2E** |

Der Content→Angebot-Bruch ist unverändert seit Juni der teuerste Befund. Neu: Die additive Angebots-CTA-Brücke ist auf allen 4 Goldenen Pages live (Commit `002098a`, 12.08.) und feuert erstmals (1 Klick/7T) — die Wirkung auf die Stufe-2-Rate ist aber noch nicht in den 30T-Zahlen sichtbar. Segmentierung: Der Bruch besteht über alle Kanäle (organic wie cpc); cpc landet gar nicht erst auf Wissens-Artikeln, sondern direkt auf Angebotsseiten — der Trichter misst primär den organischen Pfad.

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

- **Goldene Pages** (GSC-Top + hohe Clarity-Nutzung, organic): `microsoft-copilot-lizenzen`, `copilot-tipps-tricks-produktivitaet`, `claude-in-microsoft-copilot` — Investition wert, CTA-Brücke bereits eingebaut.
- **Bremsen** (GSC-Top-Traffic, schwache Weiterleitung): `microsoft-copilot-lizenzen` (CTR-Entstauung), `copilot-in-excel-aktivieren` (informationaler Traffic ohne Angebots-Anschluss) — erste Optimierungs-Priorität.
- **Direkt-/Nicht-GSC-Quellen:** Der AlwaysData-Wert liegt deutlich über dem reinen GSC-Klickvolumen → getragen von SEA (cpc 186), Referral (156, +37 %), LLM (AIPlatform 60) und dem Rest-Outbound (20). Die AIPlatform-Quelle ist über den Clarity-Kanal sauber als LLM-Traffic identifiziert und ein stabiles, eigenständiges Standbein.

---

## 9. LLM-Sichtbarkeit-Trend

- **Wettbewerbs-/Web-Check „Wer sind die besten Anbieter für Microsoft-Copilot-Schulungen in Deutschland?"**: copilotenschule.de wird durchgängig als erster / spezialisierter Anbieter genannt, vor medienreich, IT-Schulungen.com, netlogix, Haufe-Akademie (skill it), PromptingBirds. Der B2-Hub-Artikel `copilot-schulungsanbieter-deutschland-vergleich` erscheint als Top-Ergebnis.
- **Verhaltensdaten:** Clarity-Kanal „AIPlatform" 60 Sessions/30T (Vormonat 61 → **gehalten**). Der LLM-Kanal ist als eigenständiges Standbein stabil, nicht wachsend, aber nicht rückläufig. GEO-Score bleibt 82 (DoD #4).
- **Preisfragen-Test (seit 20.08. gefordert):** Autonom im Cron nur eingeschränkt prüfbar (kein interaktiver ChatGPT-/Perplexity-Zugang in dieser Session). Aus dem WebSearch-Ergebnis: Der Preis erscheint in Titel/Snippet der Trainingsseite und des Lizenz-Artikels („15,60–26 € pro Nutzer/Monat" — das ist die Microsoft-Lizenzkostenangabe, nicht der Trainingspreis). Der Trainings-Preis selbst wird in LLM-Antworten nicht konkret zitiert. **Empfehlung:** llms.txt / Vergleichsartikel um eine klar zitierbare Trainings-Preisspanne ergänzen, damit LLMs bei „Was kostet eine Copilot-Schulung?" die Copilotenschule mit konkretem Preis nennen können. → als Beobachtung, nächster interaktiver Review verifiziert.
- Trend ggü. Vormonat: LLM-Sichtbarkeit **gehalten**.

*(Clarity „AI-Sichtbarkeit"-BETA im Projekt noch nicht aktiviert — sobald verfügbar, Citation-/Bot-Activity-Report als Primärquelle.)*

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins**
1. **GSC-Organik auf neuem Allzeithoch:** 1.960 Klicks / 156.000 Impressionen / Pos. 8,5 — +18 % Klicks in 2 Wochen, komplett ohne Eingriff.
2. **Indexierung bester Wert je** auf der bereinigten Basis (85,1 %, +1,2 pp), A6-Summe −1 → Ziel 90 % in Reichweite.
3. **Funnel-Fix ist ausgerollt und feuert:** Angebots-CTA-Brücke auf allen 4 Goldenen Pages live, erster `angebot_bruecke_click` gemessen.

**Probleme**
1. **Funnel-Bruch Content→Angebot** unverändert (0,29 % Stufe 1→2, 0 % E2E) — der Rekord-Traffic wird kommerziell nicht abgeschöpft.
2. **Outbound-Einbruch** (Email 67→20/30T, −70 %) — Kampagne trägt kaum noch Traffic, LP weiter 0 Conversions.
3. **Vier user-gebundene DoD-Blocker** (Indexierung-Content-Qualität, SEO-Score/C1-PageSpeed, Listicle-Versand, ProvenExpert-Anlage) — kein Automatisierungs-Loch, sondern Backlog fertiger Drafts, die Push/Versand durch den User brauchen.

---

## 11. Konkrete Empfehlungen (mit Aufwand)

1. **CTA-Brücke-Wirkung tracken statt neu bauen** — *Was:* Stufe-2-Rate (0,29 %) über 4 Wochen beobachten, ob die live gegangene Brücke sie hebt. *Warum:* Fix ist ausgerollt, weiterer Code-Eingriff wäre Doppelarbeit/Risiko auf Protected Page. *Aufwand:* 0 (Weekly-Audit trackt). *KPI:* Funnel-Stufe-2 ≥ 2 %.
2. **microsoft-copilot-lizenzen Snippet-/CTR-Entstauung pushen** — *Was:* fertigen Draft `protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md` reviewen + deployen. *Warum:* höchste Impressionen bei CTR ~0,6 %, größter ungehobener Hebel, SEA-Synergie bestätigt den Kosten-Cluster. *Aufwand:* 1 h (User-Push). *KPI:* CTR Kosten-Cluster > 1,5 %.
3. **Zweiten Angebots-Touchpoint auf 2 Goldenen Pages ergänzen** — *Was:* TrainingCTA vor FAQ in `CopilotLicenses.tsx` + `CopilotTippsTricks.tsx` (fehlt dort laut heutigem Pattern-Transfer-Draft). *Warum:* die anderen 2 Goldenen Pages haben den zweiten Touchpoint, konvertieren tendenziell besser. *Aufwand:* 2 h (additiv, kein Protected-Struktur-Eingriff). *KPI:* Angebots-Klicks/Session auf beiden Seiten.
4. **Outbound-Entscheidung treffen** — *Was:* LP `/sml/hr-tipps_2026` überarbeiten oder Kampagne einstellen. *Warum:* 20 Sessions/30T bei 0 Conversions = totes Segment, verzerrt Kanal-Reporting. *Aufwand:* 3 h (LP-Copy) oder 0 (Stopp). *KPI:* sml_form_submit > 0 oder saubere Deaktivierung.
5. **LLM-Preis-Zitierbarkeit schaffen** — *Was:* klar zitierbare Trainings-Preisspanne in `llms.txt` + Vergleichsartikel. *Warum:* LLMs nennen bei Preisfragen keinen konkreten Copilotenschule-Preis. *Aufwand:* 1 h. *KPI:* Copilotenschule mit Preis in ChatGPT/Perplexity-Antwort (nächster interaktiver Review).

---

## 12. Risiken (max. 3)

| Risiko | Bewertung | Mitigation |
|---|---|---|
| Funnel-Bruch bleibt trotz CTA-Brücke bestehen | mittel | CTA-Brücke live + feuert; 4 Wochen Wirkung abwarten, bei Stagnation zweiten Touchpoint (Empf. 3) ausrollen |
| Dead-Click 13,46 % (organisch, ArticlePopup) | niedrig | bekanntes Muster, Fix-Draft seit 17.06. vorhanden (user-gebundener Push), keine Rage-Click-Eskalation |
| Teams-Reporting-Webhook seit 03.08. HTTP 401 | niedrig (additiv) | Audit läuft vollständig durch, nur Versand fehlt; Fix nur in Power-Automate/Teams-UI durch User möglich, seit Wochen eskaliert |

---

## 13. Anhang: Neue Clarity-Insights-Einträge des Monats

- **Trend (Verstärken):** SEA-Skalierung cpc 134→186/30T (+39 %) bei sauberer Zielseiten-Führung (0/x auf /wissen/) → Nachfrage auf Kosten/Lizenz/Training real, organisch als Schläfer sichtbar → Snippet-Hebel.
- **Issue (Beobachten):** Outbound-Einbruch Email 67→20/30T (−70 %), 0 Conversions → LP-Überarbeitung oder Stopp.
- **Pattern (Verifiziert):** Angebots-CTA-Brücke auf allen 4 Goldenen Pages live (Commit `002098a`), feuert erstmals — Wirkungsmessung Stufe-2-Rate läuft über Weekly-Audit.
- **Trend (Halten):** LLM-Kanal AIPlatform stabil bei 60/30T, GEO-Score 82 gehalten.

---

*Erstellt automatisch vom Cron `copilotenschule-seo-monthly-review` am 26.08.2026. Keine Code-Pushes. Fehlende/eingeschränkte Datenpunkte explizit benannt (LLM-Preisfragen-Test autonom nur eingeschränkt prüfbar; GSC-Index-Report seit 21.08. nicht neu gecrawlt).*
