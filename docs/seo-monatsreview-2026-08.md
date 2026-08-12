# SEO-Monatsreview copilotenschule.de — August 2026

**Erstellt:** 12. August 2026 (Cron `copilotenschule-seo-monthly-review`, autonom)
**Berichtszeitraum:** 12.07.–12.08.2026 · Vergleich zu Juni-Monatsreview (10.06.) und Baseline (27.05.)
**Phase:** Phase 3 — Content-Block (aktiv seit 01.06.2026, kein Wechsel)
**Datengrundlage:** SSR-Audit (`seo-monitoring/recheck.sh`, live), GSC (Chrome, frisch — Property martin@yellow-boat.com, 3M vor 5 h aktualisiert, Index-Report Stand 07.08.), AlwaysData (Chrome, live), Clarity Standard-Metriken (API 3T, 2/10 Calls) + Clarity Dashboard 30T (Chrome, vollständig: Conversion-Events, Traffic-Mix, Funnel), Wettbewerbs- + LLM-Check via WebSearch. Alle Kampagnen-relevanten Vergleiche segmentiert (UTM cpc/email vs. organic).

---

## 1. Executive Summary

Der organische Kern wächst weiter robust und ohne Eingriff: GSC 3M steht bei **1.660 Klicks / 134.000 Impressionen / Position 8,8** — ein Plus von rund **+310 % bei den Klicks gegenüber der Juni-Baseline** (404 → 1.660) und die beste Durchschnittsposition seit Projektstart. SSR ist stabil bei 67/67 (0 🔴), copilotenschule.de rankt im Wettbewerbscheck weiter auf **Platz 1** für die strategische Kernabfrage, und erstmals sauber messbar: **LLM-getriebener Traffic ist real** — Clarity zählt 61 Sessions über den Kanal „AIPlatform" plus ~42 ChatGPT-Referrer in 30 Tagen. Die GEO-Wette zahlt sich aus.

Zwei Dinge bleiben hartnäckig offen und sind unverändert die größten Hebel. Erstens der **Funnel-Bruch zwischen Content und Angebot**: 1.621 Sessions erreichten in 30 Tagen einen Wissensartikel, aber nur **0,19 %** gingen weiter zu Trainings oder Konfigurator — die SEO-Maschine liefert Reichweite, die Brücke zum Angebot fehlt weiterhin. Zweitens die **Indexierungsquote (64,9 %)**, die seit Wochen im Band 62–66 % feststeckt und mit der A6-Nicht-indexiert-Summe von 28 (+3 im Monat) sogar leicht negativ tendiert. Beide Befunde sind seit Juni bekannt, beide sind mit überschaubarem Aufwand adressierbar — und beide hängen an User-gebundenen Schritten, die der Autopilot regelkonform nicht selbst ausführen darf.

**Definition-of-Done-Score: 4 von 8** — unverändert gegenüber Juni und Juli. Fortschritt passiert innerhalb der erfüllten Kriterien (Klicks, Position, LLM-Sichtbarkeit), nicht bei den vier offenen (Indexierung, SEO-Score, Listicle-Erwähnung, ProvenExpert).

---

## 2. Definition-of-Done-Tabelle (8 Zielmesswerte)

| # | Kriterium | Ziel | Aktuell (12.08.) | Abstand | Trend |
|---|-----------|------|------------------|---------|-------|
| 1 | Indexierungsquote GSC | ≥ 90 % | **64,9 %** (72/111) | −25 pp | → stagniert (Band 62–66 % seit Juli), A6-Summe 28 (+3 M/M, leicht negativ) |
| 2 | SSR-Audit 🔴 „kaputt" | ≤ 5 | **0** ✅ | erfüllt | → stabil seit A2-Fix (67/67) |
| 3 | SEO-Score (Health Check) | ≥ 75 | **42** (veraltet 27.05.) | −33 | — kein frischer Score (PageSpeed-Modul seit 27.05. deaktiviert, C1-Blocker) |
| 4 | GEO-Score | ≥ 80 | **82** ✅ | erfüllt | ↑ untermauert: AIPlatform 61 Sess./30T, ChatGPT-Referrer 39–42 |
| 5 | Top-Klick-Bringer ≥ 5 versch. URLs | ≥ 5 | **10 Seiten** ✅ | erfüllt | ↑ breite Streuung (Claude, Excel, Lizenzen, Halluzinationen, Outlook, Credits …) |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | Top 3 | **#1 im Such-Check** ✅* | erfüllt (wahrsch.) | → gehalten seit Juni |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** | −1 | → D3-Outreach-Drafts existieren, nicht versendet (user-gebunden) |
| 8 | ProvenExpert-Bewertungen | ≥ 15 | **0** | −15 | → Profil weiterhin nicht angelegt (user-gebunden, Captcha) |

\* Wettbewerbscheck via WebSearch (nicht standort-/personalisierungsbereinigt). Die exakte Strategie-Abfrage erscheint in GSC noch nicht als eigenständige Klick-Query; #1 gilt als „wahrscheinlich erfüllt".

**Fazit DoD:** 4/8. Kein Kriterium neu erreicht seit Juni, keines verloren. Die vier offenen sind entweder technisch-blockiert (#3 SEO-Score braucht C1-API-Key) oder rein user-gebunden (#7 Outreach-Versand, #8 ProvenExpert-Account) — der Autopilot kann sie nicht selbst schließen. #1 Indexierung ist der einzige Punkt, der aktiv „arbeitet", aber stagniert.

---

## 3. SSR-Audit (Anfang vs. heute)

| Stand | ✅ Helmet-Flush | Default-Fallback | Empty (🔴) | Double-Desc | von |
|-------|----|----|----|----|-----|
| 27.05. morgens (Baseline A1) | 22 | 5 | 40 | 5 | 67 |
| 04.05. recheck-Baseline | 31 | 36 | 0 | 0 | 67 |
| **12.08. (heute, live)** | **67** | **0** | **0** | **0** | **67** |

SSR ist komplett geheilt und stabil: **67/67 ✅, 0 🔴** — Δ Helmet-Flush +36 gegenüber der recheck-Baseline. DoD #2 erfüllt und gewahrt. Der Regressions-Wächter ist grün (weit unter der Eskalationsschwelle 🔴 ≤ 5). Seit dem A2-Fix (27.05.) kein Deploy, der die Pre-Render-Lage verändert hätte. Kein Handlungsbedarf.

---

## 4. GSC-Entwicklung

### Kennzahlen

| Fenster | Klicks | Impressionen | CTR | Ø Position |
|---------|--------|--------------|-----|------------|
| 28 Tage | 667 | 53.866 | 1,2 % | 8,0 |
| 3 Monate | **1.660** | **134.000** | 1,2 % | **8,8** |

3M-Trend über den Berichtszeitraum (Monatsreview Juni → heute): Klicks **404 → 1.660** (mehr als vervierfacht, +311 %), Impressionen **39.824 → 134.000** (+236 %), Position **10,3 → 8,8** (−1,5 Plätze, klare Verbesserung). Innerhalb des Monats (W/W laut Weekly-Audits): 1.540 (04.08.) → 1.660 (10.08.), also **+7,8 %** in der letzten Woche — stetiges, gesundes Wachstum unter der +25-%-„Verstärken"-Schwelle.

### Indexierung (Monats-Trend)

| Stand | Indexiert | Nicht indexiert | Quote |
|-------|-----------|-----------------|-------|
| 27.05. (Baseline) | 38 | 49 | 44 % |
| 10.06. (Juni-Review) | 43 | 48 | 47 % |
| 15.07. | 59 | 35 | 62,8 % |
| 04.08. | 72 | 37 | 66,1 % |
| **07.08. (aktuell)** | **72** | **39** | **64,9 %** |

Nicht-indexiert-Gründe (39): **Gecrawlt – nicht indexiert 12**, **Gefunden – nicht indexiert 16** (A6-Summe = **28**, +3 im Monat), Weiterleitung 8, alt. kanonisch 2, robots.txt 1. Die 28 „gecrawlt/gefunden – nicht indexiert" sind der eigentliche Indexierungs-Stau und der Haupthebel für DoD #1. Kein ≥ 5-pp-Drop gegenüber dem 7-Tage-Schnitt → kein Indexierungs-Risiko-Trigger, aber die Quote arbeitet seit Wochen nicht mehr nach oben.

### Top-Klick-Bringer Queries (3M)

| Query | Klicks | Impr. | Kommentar |
|-------|--------|-------|-----------|
| copilot in excel aktivieren | 67 | 2.420 | Kern-Cluster, Pos. ~3 |
| excel copilot aktivieren | 25 | 861 | |
| copilot excel aktivieren | 17 | 574 | |
| copilot kosten | 12 | 1.414 | **Schläfer** (hohe Impr., CTR schwach) |
| copilot cowork kosten | 10 | 262 | neu, Credits-Thema |
| copilot claude | 8 | 567 | |
| copilot lizenz kosten | 7 | 637 | Kosten-Cluster |
| copilot lizenz | 6 | 1.305 | **Schläfer** |
| copilot cowork claude | 6 | 44 | |
| copilot training | 5 | 1.324 | **Schläfer** — transaktional! |

### Schläfer nach Impressionen (Potenzial, Klicks < Impressionen deutlich)

- **copilot training** 5 Kl./1.324 Impr. — transaktionale Kaufabsicht, aber Position zu schwach → direktes Angebots-Keyword, hier Rankings zu heben lohnt am meisten.
- **copilot lizenz** 6/1.305 und **copilot kosten** 12/1.414 — Kosten/Lizenz-Cluster mit hohem Volumen, CTR schwach.
- 28T-Bestätigung: „copilot kosten" 8/839, „copilot lizenz kosten" 4/377, „copilot preise" 4/293 → das Kosten/Preis-Thema wächst und ist nah am Angebot.

Der **Kosten-/Lizenz-/Preis-Cluster** ist der klarste Schläfer des Monats: hohe Impressionen, kaufnahe Intention, aber unterdurchschnittliche CTR/Position. Das deckt sich exakt mit dem laufenden A/B-Test „Preise auszeichnen ja/nein" (Cron `ab-test-preise-weekly-report`).

---

## 5. AlwaysData-Wachstum

| Zeitraum | Visits | Kommentar |
|----------|--------|-----------|
| 24h (12.08.) | 676 | inkl. Paid/Outbound |
| Rollierend 30 T (12.07.–12.08.) | **10.229** | inkl. Paid/Outbound |
| Juli (Kalendermonat, final) | **22.503** | Rekordmonat, +70 % M/M ggü. Juni (13.226) |
| YTD 2026 (bis 03.08.) | 68.312 | |

**Einordnung:** Der 30-Tage-Rollwert (10.229) enthält seit Kampagnenstart (KW 25) Paid- und Outbound-Traffic und ist damit **nicht 1:1 mit den Vor-Kampagnen-Monaten organisch-vergleichbar**. Der organische Kern wächst laut GSC/Clarity unabhängig davon klar (siehe Traffic-Mix Abschnitt 6). Der Juli-Rekord (22.503) ist teils kampagnengetrieben; der organische Anteil daran ist über den Clarity-Kanal „OrganicSearch" (1.542/30T) sauber abgrenzbar.

---

## 6. Traffic-Mix Organic / SEA / Outbound + Kampagnen-Wirkung

**Clarity-Kanal-Segmentierung (30 Tage, Sessions):**

| Kanal | Sessions | Anteil | Kommentar |
|-------|----------|--------|-----------|
| OrganicSearch | 1.542 | ~55 % | Kern, wächst |
| Other | 817 | ~29 % | teils intern/uncategorized |
| **PaidSearch (SEA/cpc)** | **134** | ~5 % | Google Ads |
| Referral | 114 | ~4 % | |
| Direct | 91 | ~3 % | |
| **Email (Outbound)** | **67** | ~2 % | Cold-Mail-LP `/sml/` |
| **AIPlatform (LLM)** | **61** | ~2 % | ChatGPT/Perplexity/Copilot-Referrals |
| *Summe (Basis 2.811 Sess.)* | | | |

**SEA-Wirkung (cpc):**
- 134 Sessions/30T. Zielseiten-Check über den Monat (aus Weekly-Audits): cpc landet **korrekt NICHT auf /wissen/-Artikeln** — keine Drift beobachtet, Ads verweisen sauber auf Trainings/Konfigurator/LPs.
- cpc-Dead-Click durchgehend nahe 0 % (2,08 %/2,13 % in Stichproben) → bestätigt: der organische Dead-Click-Treiber (ArticlePopup) ist **kein Kampagnen-Effekt**.
- cpc-Conversion: erstmals (04.08.) 1 „Kontaktieren Sie uns" aus dem cpc-Segment — bislang stets 0. Marginal, aber Richtung stimmt.

**Outbound-Wirkung (email):**
- 67 Sessions/30T über den Kanal, LP `/sml/hr-tipps_2026`. Smart-Events: `sml_landing_page_visit` 28, `sml_jump_paid_click` 8.
- **Weiterhin ~0 direkte Buchungs-/Kontakt-Conversion** aus dem Outbound-Segment (sehr niedrige aktive Zeit, ~8 s). Die LP konvertiert seit über 6 Wochen nicht → LP-CTA-Überarbeitung ist überfällig (user-gebundene Content-Entscheidung).

**Synergie-Check (SEA → SEO):** Der cpc-erfolgreiche Kosten/Preis-Fokus taucht in GSC als organischer Schläfer auf („copilot kosten", „copilot preise", „copilot lizenz kosten"). → Empfehlung: die kaufnahen Kosten-Keywords, die in SEA konvertieren, gezielt auch organisch bespielen (Snippet-/Content-Optimierung auf `microsoft-copilot-lizenzen` und Verknüpfung zum Angebot). SEA-Daten als SEO-Recherchequelle nutzen.

---

## 7. Clarity-Conversion-Analyse

### Standard-Metriken

| Metrik | 30 T (Dashboard) | 3 T (API) |
|--------|------------------|-----------|
| Sessions | 2.811 (358 Bots, 2.773 Unique) | 245 (90 Bots, 330 Unique) |
| Seiten/Sitzung | 1,04 | 1,19 |
| Scrolltiefe | 40,38 % | 36,67 % |
| Aktive Zeit | 1,5 Min (von 3,8 Min) | 84 s |
| **Dead-Click** | **12,56 %** | **9,39 %** |
| Rage-Click | 0,25 % | 0,41 % |
| Quick-Back | 0,43 % | 2,45 % |
| Excessive-Scroll | 0 % | 0 % |

Dead-Click bleibt das bekannte, mix-getriebene Organik-Issue (30T 12,56 %, 3T knapp unter Schwelle 9,39 %) — Treiber ist das globale ArticlePopup via `ContentLayout.tsx`, Fix-Draft existiert seit 17.06., unverpusht.

### Conversion-Events (30 Tage, Smart Events)

| Event | Sessions | Kategorie |
|-------|----------|-----------|
| sml_landing_page_visit | 28 | Outbound-LP |
| Formular absenden | 25 | **direkte Kontakt-Conv.** |
| Kontaktieren Sie uns | 18 | **direkte Kontakt-Conv.** |
| Ausgehender Klick | 18 | |
| pdf_download | 14 | Lead-Magnet |
| lead | 13 | Lead |
| Herunterladen | 13 | |
| Bestellung erfolgreich | 8 | **Angebots-Conv.** |
| danke_page_view | 8 | Bestätigung |
| sml_jump_paid_click | 8 | Outbound |
| Zitat anfordern | 6 | **Angebots-Conv.** |
| konfigurator_submit | 5 | **Angebots-Conv.** |
| roi_generator_ppt_success | 3 | Tool |
| mail_click / booking_click / contact_form_submit | 1 / 1 / 1 | |

**Conversion-Rate gesamt (30T):** Direkte Kontakt-/Angebots-Conversions (Formular absenden 25 + Kontaktieren Sie uns 18 + Zitat anfordern 6 + Bestellung erfolgreich 8 + konfigurator_submit 5 + booking_click 1 = **63**) / 2.811 Sessions = **~2,2 %**. Inklusive Lead/PDF (lead 13 + pdf_download 14) ~3,2 %. Das ist deutlich robuster als die ~0,42 % der Juni/Juli-Vorwochen und bestätigt den Aufwärtstrend der letzten Wochen. **7e-Defekt-Check:** kein Event von ≥3 auf 0 gefallen → kein Tracking-Defekt.

### Top-3 „Goldene Pages" (GSC-Top × Clarity-Traffic, organic)

1. **`/wissen/microsoft-copilot-lizenzen`** — GSC 204 Kl./3M (34.542 Impr.!), Clarity #2 (36 Visits). Der stärkste organische Anker, deckt den ganzen Kosten/Lizenz-Cluster ab.
2. **`/wissen/copilot-in-outlook-nutzen-tipps`** — GSC 113 Kl., Clarity #3 (27 Visits). Themen-Cluster mit gutem Engagement.
3. **`/wissen/copilot-tipps-tricks-produktivitaet`** — GSC 69 Kl., Clarity Top-5 (17 Visits). Solide Doppel-Präsenz.

Dazu als GSC-#1-Seite: **`/wissen/claude-in-microsoft-copilot`** (248 Kl./3M) — trägt den Claude-Cluster.

### Top-3 „Bremsen" (GSC-Top, aber schwache Conversion/CTR)

1. **`/wissen/microsoft-copilot-lizenzen`** — 34.542 Impr., aber nur 204 Klicks = **CTR 0,6 %**. Trotz Top-Traffic der größte ungehobene Hebel: hohe Sichtbarkeit für Kosten/Lizenz, aber sowohl schwache SERP-CTR als auch (siehe Funnel) keine Weiterleitung ins Angebot. Erste Optimierungs-Priorität.
2. **`/wissen/copilot-in-excel-aktivieren`** — GSC-Top-Cluster (211 Kl., 17.423 Impr.), aber in Clarity nur schwach in den Top-Pages und ohne Angebots-Anschluss. Hoher Traffic, der informational verpufft.
3. **`/wissen/ki-halluzinationen-vermeiden`** — 183 Kl./3M, aber thematisch weit vom Angebot; hoher Traffic, geringe kommerzielle Anschlussfähigkeit.

### Funnel-Visualisierung „Lead-Reise: SEO → Angebot → Kontakt" (30T, Clarity)

| Stufe | Beschreibung | Sessions | Rate (von Vorstufe) | Segment-Hinweis |
|-------|--------------|----------|---------------------|-----------------|
| 1 | Wissens-Artikel besucht (SEO-Einstieg) | 1.621 | 57,67 % von 2.811 | überwiegend organic |
| 2 | Angebot angeschaut (Trainings/Konfigurator) | **3** | **0,19 %** | **Bruch hier** |
| 3 | Kontakt/Lead (Mail/Phone/Form/PDF) | — | 0 % E2E | |

**Der Funnel bricht vollständig zwischen Stufe 1 und 2** (Content → Angebot). Von 1.621 SEO-Einsteigern schaffen es 3 zum Angebot — praktisch keine Brücke. Das ist der teuerste einzelne Befund des Projekts: die SEO-Maschine liefert Reichweite auf Rekordniveau, aber sie wird kommerziell nicht abgeschöpft. Segmentiert bestätigt: cpc landet direkt auf Angebotsseiten (korrekt), aber der große organische Wissens-Traffic wird nicht ins Angebot geleitet. Bei Funnel-Rate < 2 % gilt: **Issue „Funnel-Optimierung gesamtsystemisch" bleibt offen** (eröffnet im Juni, unverändert).

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

- **Goldene Pages** (GSC-Top + Clarity-Traffic, organic): `microsoft-copilot-lizenzen`, `copilot-in-outlook-nutzen-tipps`, `copilot-tipps-tricks-produktivitaet`, `claude-in-microsoft-copilot`. Diese vier tragen den organischen Kern und sind Investitionen wert — vor allem eine Angebots-Brücke ab hier.
- **Bremsen** (GSC-Top + schwache Conversion/CTR): `microsoft-copilot-lizenzen` (34.542 Impr. → nur 0,6 % CTR), `copilot-in-excel-aktivieren` (Traffic verpufft informational). Erste Optimierungs-Priorität = CTR-/Snippet-Optimierung + Angebots-CTA.
- **Direkt-Aufrufe / Nicht-GSC-Quellen**: AlwaysData-Rollwert (10.229) liegt weit über dem organischen GSC-Klickvolumen → getragen von Paid (cpc 134), Outbound (email 67) und **LLM-Citations (AIPlatform 61 + ChatGPT-Referrer 39–42)**. Die AIPlatform-Quelle ist über den Clarity-Kanal sauber als LLM-Traffic identifiziert und ein wachsendes, eigenständiges Standbein.

---

## 9. LLM-Sichtbarkeit-Trend

Web-/LLM-Antwort-Check zur Frage „Wer sind die besten Anbieter für Microsoft-Copilot-Schulungen in Deutschland?":

- **copilotenschule.de wird durchgängig als erster / spezialisierter Anbieter genannt**, vor promptingbirds, medienreich, IT-Schulungen.com, gfu.net, Haufe-Akademie, kebel, 121watt. Der B2-Hub-Artikel `copilot-schulungsanbieter-deutschland-vergleich` erscheint als Top-Ergebnis.
- **Harte Bestätigung aus Verhaltensdaten:** Clarity-Kanal „AIPlatform" 61 Sessions/30T + ChatGPT-Referrer 39–42 + Perplexity/Gemini vereinzelt. Das ist der erste Monat, in dem LLM-getriebener Traffic als eigener Kanal klar quantifizierbar ist — die GEO-Strategie liefert messbaren Besucherstrom, nicht nur theoretische Zitierbarkeit.
- Trend ggü. Vormonat: LLM-Sichtbarkeit **gehalten bis leicht gestärkt**. GEO-Score bleibt 82 (DoD #4), jetzt zusätzlich durch echten Traffic untermauert.

*(Hinweis: Clarity „AI-Sichtbarkeit"-BETA ist im Projekt noch nicht aktiviert — sobald verfügbar, Citation-/Bot-Activity-Report als Primärquelle nutzen.)*

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins**
1. **Organik-Rekord:** 1.660 Klicks/3M (+311 % seit Juni), Position 8,8 (beste je) — ohne einen einzigen riskanten Eingriff.
2. **LLM-Traffic ist real und messbar:** AIPlatform 61 Sess. + ChatGPT 39–42/30T. Die GEO-Wette zahlt.
3. **Conversion-Rate erholt:** ~2,2 % direkte Kontakt-/Angebots-Conv. (30T) vs. ~0,42 % in den Vorwochen; Tracking sauber, kein Defekt.

**Probleme**
1. **Funnel-Bruch Content → Angebot:** 1.621 → 3 Sessions (0,19 %). Größter ungehobener Umsatzhebel, seit Juni unverändert.
2. **Indexierung stagniert:** 64,9 %, A6-Summe 28 (+3 M/M) — Ziel 90 % bleibt fern, die Quote arbeitet nicht mehr nach oben.
3. **Outbound-LP konvertiert nicht:** `/sml/hr-tipps_2026` seit >6 Wochen ~0 Kontakt/Buchung bei 67 Sess./30T — LP-CTA überfällig.

---

## 11. Konkrete Empfehlungen (5 Punkte, mit Aufwand & Erfolgs-KPI)

1. **Angebots-Brücke auf den Goldenen Pages einbauen** (Funnel-Fix).
   *Was:* Auf `microsoft-copilot-lizenzen`, `claude-in-microsoft-copilot`, `copilot-in-outlook-nutzen-tipps`, `copilot-tipps-tricks-produktivitaet` je einen kontextuellen, prominenten CTA-Block „Passendes Training / Konfigurator" nach dem ersten Sinnabschnitt platzieren (nicht nur im Footer). *Warum:* Funnel Stufe 1→2 = 0,19 %; hier sitzt der ganze organische Traffic ohne Weiterleitung. *Aufwand:* mittel (1 wiederverwendbare Komponente + 4 Einbindungen, additiv, kein Protected-Page-Risiko wenn Content/H1/Title unberührt). *KPI:* Funnel-Stufe-2-Rate von 0,19 % auf ≥ 2 % in 4 Wochen.

2. **`microsoft-copilot-lizenzen` als Bremse Nr. 1 entstauen** (CTR + Kosten-Cluster).
   *Was:* SERP-Snippet (Title/Meta) auf die kaufnahen Kosten/Preis-Queries schärfen, die als Schläfer auftauchen (`copilot kosten`, `copilot lizenz kosten`, `copilot preise`), plus klare Preis-/Kosten-Antwortbox oben. *Warum:* 34.542 Impr. bei nur 0,6 % CTR — riesiges ungenutztes Volumen, kaufnahe Intention, deckt sich mit dem laufenden Preis-A/B-Test. *Aufwand:* niedrig–mittel (Meta + ein Content-Block; Protected Page → PR-Regel beachten, nur additiv). *KPI:* CTR der Seite von 0,6 % auf ≥ 1,2 %; Klicks auf „copilot kosten"-Cluster +50 % in 6 Wochen.

3. **Outbound-LP `/sml/hr-tipps_2026` CTA überarbeiten.**
   *Was:* Above-the-fold-CTA + Terminbuchung direkt auf der LP, kürzere Argumentationskette (aktive Zeit aktuell ~8 s). *Warum:* 67 Sess./30T, ~0 Conversion seit >6 Wochen — die Kampagnen-Klicks verpuffen. *Aufwand:* niedrig (LP-Content). *KPI:* ≥ 3 Outbound-Conversions (Kontakt/Buchung) in 4 Wochen. *(user-gebundene Content-Entscheidung)*

4. **Indexierungs-Stau A6 nachschärfen** (28 nicht-indexiert).
   *Was:* Für die 16 „gefunden – nicht indexiert" + 12 „gecrawlt – nicht indexiert" die additive interne Verlinkung aus `docs/drafts/index-coverage-interne-verlinkung-2026-06-16.md` weiter ausbauen (mehr thematisch passende Inbound-Links von den Goldenen Pages) + IndexNow/GSC-Resubmit. *Warum:* Quote steckt seit Juli bei ~65 %, DoD #1 der größte offene Abstand. *Aufwand:* mittel (additive Links, kein Protected-Page-Eingriff). *KPI:* A6-Summe von 28 auf ≤ 20; Quote ≥ 70 % in 6 Wochen.

5. **PageSpeed-Score wieder aktivieren** (DoD #3 überhaupt messbar machen).
   *Was:* Eigenen PageSpeed-API-Key erstellen und als `PAGESPEED_API_KEY` in `website-health-check/.env` ablegen (Lösung liegt in `docs/drafts/c1-c2-technik-2026-07-09.md`). *Warum:* DoD #3 (SEO-Score ≥ 75) ist seit 27.05. blind — ohne Score kein Fortschrittsnachweis. *Aufwand:* niedrig (User-Setup, ~15 Min). *KPI:* frischer SEO-/CWV-Score im nächsten Health-Check. *(user-gebunden: API-Key)*

---

## 12. Risiken (max. 3, mit Mitigation)

| Risiko | Bewertung | Mitigation |
|--------|-----------|------------|
| Funnel-Bruch verstetigt sich → Rekord-Traffic ohne kommerziellen Ertrag | mittel–hoch | Empfehlung 1 (Angebots-Brücke) priorisieren; Funnel-Rate wöchentlich im Weekly-Audit tracken. Folge-Cron für Pattern-Transfer angelegt (siehe Abschnitt 13). |
| Indexierungs-Quote fällt unter das Band (< 62 %) | niedrig–mittel | Weekly-Audit trackt A6-Summe wöchentlich; bei ≥ 5-pp-Drop greift der Risiko-Trigger aus dem Plan (IndexNow-Massenping + Sitemap-Resubmit). |
| Teams-Reporting-Webhook „Marketing und SEA" seit 03.08. HTTP 401 | niedrig (nur Reporting) | Audit läuft vollständig durch, nur der Teams-Post scheitert. User-Handlung nötig: Power-Automate-Trigger auf „Anyone" bzw. neuen Webhook anlegen, URL in `.env`. Bereits im Weekly-Audit eskaliert. |

---

## 13. Anhang: Neue Clarity-Insights-Einträge des Monats

- **Pattern (Best-Practice):** Goldene Pages `microsoft-copilot-lizenzen` / `copilot-in-outlook-nutzen-tipps` / `claude-in-microsoft-copilot` tragen gemeinsam Traffic + Engagement → Übertragungs-Kandidat: kontextuelle Angebots-CTA-Komponente auf allen vier. Folge-Cron `copilotenschule-pattern-transfer-2026-08-26` (+14 Tage) legt einen Code-Diff-Entwurf in `docs/drafts/` an.
- **Issue (Anti-Pattern):** `microsoft-copilot-lizenzen` = Bremse (34.542 Impr., 0,6 % CTR, Funnel-Stufe-2 ~0). Kombinierte CTR-/Snippet- + Angebots-CTA-Optimierung. Folge-Cron `copilotenschule-clarity-fix-microsoft-copilot-lizenzen` (+7 Tage) schreibt einen Fix-Entwurf.
- **Trend (Verstärken):** Kanal „AIPlatform" 61 Sess./30T — LLM-Traffic erstmals als eigener Kanal quantifiziert, wachsend. Handlung: Verstärken (GEO-Content-Linie beibehalten, Zitierbarkeit der Hub-Artikel weiter ausbauen).
- **Trend (Verstärken):** Kosten/Preis-Cluster als GSC-Schläfer (`copilot kosten` 1.414 Impr., `copilot lizenz` 1.305, `copilot training` 1.324) — kaufnah, SEA-korreliert. Handlung: organisch bespielen (Empfehlung 2).
- **Funnel-Befund (offen):** Content → Angebot 0,19 % (1.621 → 3). Issue „Funnel-Optimierung gesamtsystemisch" bleibt offen.

---

*Nächster Monatsreview: Mi 09.09.2026, 10:30 (Cron). Nächster Weekly-Audit: Mo 17.08.2026. Nächster Phase-Conductor: Mi 19.08.2026.*
