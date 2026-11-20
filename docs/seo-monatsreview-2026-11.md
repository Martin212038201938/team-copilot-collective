# SEO-Monatsreview November 2026 (2.-Mittwoch-Lauf, 11.11.2026)

**Erstellt:** 11. November 2026, regulärer Monatsreview. Schritt-0-Guard bestanden (Tag 11, Wochentag 3 = 2. Mittwoch, Fenster 08.–14.).
**Datenlage:** Frisch erhoben: GSC (interner Browser, `authuser=1`, Leistung bis 09.11., Index-Bericht Stand 06.11.) inklusive des neuen GSC-Berichts „Generative KI", AlwaysData (intern), Clarity-Dashboard 30T mit Kanal-Segmenten und Seiten-Filtern (intern, Session aktiv), Clarity-API 3T (1 Call), SSR (recheck.sh), DE-SERP für Wettbewerbs- und Preisfrage (google.de, `gl=de`, `pws=0`), llms.txt und Vergleichsartikel per curl.
**Übernommen und als solche markiert:** Bing-Ads-Kampagnenwerte (Microsoft-Advertising-Session im internen Browser erneut `sessionexpired`, Chrome-Extension in diesem Lauf nicht erreichbar) sowie der Direkttest in ChatGPT/Perplexity/Copilot (alle drei verlangen Login). SEO-Score Health-Check (DoD #3) nicht neu gemessen.

---

## 1. Executive Summary

Organisch war der Oktober der stärkste Monat bisher: Im 28-Tage-Fenster stehen 1.040 Klicks bei 82.500 Impressionen und Position 7,1, gegenüber 718 Klicks und Position 7,4 im Oktober-Review. Das sind 45 Prozent mehr Klicks in vier Wochen. AlwaysData schließt den Oktober mit 21.591 Besuchern (+5 %) ab, der November läuft nach elf Tagen auf rund 26.000 zu. Neu ist der GSC-Bericht zu generativer KI: 72.498 Impressionen in drei Monaten entfallen auf AI Overviews und verwandte Funktionen, knapp die Hälfte davon auf die Lizenz-Seite. Die wichtigste Erkenntnis dieses Laufs korrigiert allerdings den Oktober-Review. Die Seiten-Segmentierung in Clarity zeigt, dass 31 der 46 Formular-Absendungen und alle 30 Leads aus dem Guidelines-Bereich kommen, also aus den PDF-Downloads. Der gefeierte Lead-Sprung im Oktober war ein Download-Sprung, keine Welle von Trainingsanfragen. Die fünf traffic-stärksten Wissensartikel bringen zusammen rund 1.500 Sitzungen im Monat und lösen praktisch kein einziges Conversion-Event aus. Paid ist jetzt erstmals trennbar: Rund 175 der 195 Paid-Sitzungen kommen über Google, nur etwa 10 über Bing, alle landen auf der Startseite, und das Segment konvertiert mit 0,5 % deutlich schlechter als die Organik. Indexierung 86,5 % bereinigt, SSR 67/67, DoD 4/8, Phase 3 ohne Wechsel. Keine Code-Pushes.

---

## 2. Definition-of-Done-Tabelle (Stand 11.11.2026)

| # | Kriterium | Ziel | Aktuell | Trend ggü. 14.10. | Status |
|---|-----------|------|---------|-------------------|--------|
| 1 | Indexierungsquote GSC (eingereichte Seiten ohne Gated-PDFs) | ≥ 90 % | **86,5 %** (77/89, mit den live 8 PDFs) · literal 84,6 % (77/91, Konstante −6) | indexiert 75 → 77, Nenner durch Sitemap-Wachstum 91 → 97 | 🟡 offen |
| 2 | SSR „🔴 komplett kaputt" | ≤ 5 | **0** (67/67 ✅, live 11.11.) | stabil | ✅ erfüllt |
| 3 | SEO-Score Health-Check | ≥ 75 | **42** (übernommen, C1-Blocker) | nicht neu gemessen | 🔴 offen |
| 4 | GEO-Score | ≥ 80 | **82** (übernommen) + **neu belegt:** 72.498 GSC-Impressionen in KI-Funktionen/3M, AIPlatform 40 Sess./30T | gestärkt | ✅ erfüllt |
| 5 | Top-Klick-Bringer ≥ 5 verschiedene URLs | ≥ 5 | Excel-aktivieren, Tipps & Tricks, Kosten/Lizenz, Claude, Marke/Startseite (frisch aus Queries) | stabil | ✅ erfüllt |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | Top 3 | **#1** frisch auf google.de bestätigt (eigener Vergleichsartikel vor fachevents, GFU, 121watt, medienreich, PC-COLLEGE) | gehalten | ✅ erfüllt |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** | flat | 🔴 offen |
| 8 | ProvenExpert-Profil | ≥ 15 Bew. | **0** | flat | 🔴 offen |

**Score: 4/8** (unverändert seit Juni). #5 und #6 sind diesmal frisch belegt statt „wahrscheinlich".

*Fußnote Messbasis: Werte vor dem 20.08.2026 beziehen sich auf „Alle bekannten Seiten" und sind mit der bereinigten Quote nicht vergleichbar. Zusätzlich: Die Messvorschrift zieht weiter 6 Gated-PDFs ab, live sind es seit 26.10. acht. Die Quote im Oktober-Review (88,2 %) entstand noch mit 91 eingereichten URLs, die heutige mit 97. Der Rückgang ist Nenner-Wachstum, kein De-Indexing.*

---

## 3. SSR-Audit (live 11.11.)

67/67 Helmet-Flush ✅, 0 Default-Fallback, 0 leer, 0 Doppel-Description (recheck.sh, Snapshot `seo-monitoring/2026-11-11-snapshot.json`; `audit-live.sh` liegt weiter nicht im Mount). Baseline 04.05.: 31 ✅ / 36 Fallback. Der Deploy vom 02.11. (8 aktualisierte Wissensartikel) hat keine Regression erzeugt.

---

## 4. GSC-Entwicklung

**Indexierung (eingereichte Seiten):** 77 indexiert, 20 nicht indexiert (Gefunden 14, Gecrawlt 6). Bereinigt um die live 8 Gated-PDFs: 77/89 = **86,5 %**. Gegenüber dem Oktober-Review sind zwei Seiten mehr im Index, die Lücke zu 90 % beträgt rechnerisch rund drei Seiten. Vier-Wochen-Verlauf (bereinigt): 88,2 % (19.10., alte Sitemap) → 85,1 % (26.10., Sitemap +4) → 85,1 % (02.11.) → 86,5 % (09.11.) → 86,5 % (11.11.). Die Kurve erholt sich nach dem Sitemap-Sprung langsam.

**Kontext „Alle bekannten Seiten" (KEIN KPI):** 79 indexiert / 36 nicht. Weiterleitung 11 (stabil), Gecrawlt 9, Gefunden 14, Soft 404 1, robots 1, kanonisch 0. Keine neue Redirect-Quelle.

**Leistung**

| Fenster | Klicks | Impressionen | CTR | Position |
|---|---|---|---|---|
| 28 Tage (13.10.–09.11.) | **1.040** | 82.500 | 1,3 % | **7,1** |
| 28 Tage im Oktober-Review | 718 | 65.288 | 1,1 % | 7,4 |
| 3 Monate (10.08.–09.11.) | **2.640** | 228.000 | 1,2 % | 7,6 |
| 3 Monate im Oktober-Review | 2.240 | 198.000 | 1,1 % | 7,9 |

**Top-Queries nach Klicks (3M):** copilot in excel aktivieren 95 (Pos. 1,4) · copilotenschule 31 · excel copilot aktivieren 30 · copilot excel aktivieren 20 · copilot tipps und tricks 20 (CTR 10,8 %) · copilot kosten 17 · copilot premium kosten 15 · copilot preise 14 · claude in copilot 13 · copilot pro kosten 12 · copilot claude 12 · copilot lizenz 11 · copilot lizenzen 11 · copilot pro 10 · microsoft copilot kosten 10 · was kostet copilot 10 · copilot preis 10 · copilot lizenz kosten 8 · microsoft copilot tipps und tricks 8 · kosten copilot 7.

**Top-Queries nach Impressionen (Schläfer, 3M):** copilot pro 3.881 (0,3 %, Pos. 8,9) · copilot kosten 3.339 (0,5 %, 4,3) · copilot premium kosten 1.850 (0,8 %, 4,9) · copilot lizenz 1.713 (0,6 %, 3,8) · **copilot training 1.598 (0,1 %, Pos. 11,7)** · microsoft copilot kosten 1.547 · copilot lizenzen 1.495 · copilot preise 1.456 · copilot pro kosten 1.419 · copilot lizenz kosten 1.415 · was kostet copilot 1.209 · **copilot studio 961 (0 %, Pos. 19,6)** · copilot in word 858 (Pos. 8,9) · copilot excel 769 · was kostet copilot im monat 675 · copilot claude 674 · copilot pro lizenz 637 · copilot in excel 635 (Pos. 10,5) · was kostet copilot premium 607 · microsoft 365 copilot kosten 579.

**Strategic-Keyword-Check:** Die kaufnahen Schulungsbegriffe sind der blinde Fleck der Domain. „copilot training" ist von Position 10,9 auf 11,7 abgerutscht. „copilot schulung" (510 Impr.) steht auf 30,1, „microsoft copilot schulung" (418) auf 28,7, „copilot workshop" (183) auf 18,4, „copilot seminar" (165) auf 41,9. Aus dem EU-AI-Act-Cluster: „ki schulung pflicht" 25,4, „eu ai act schulungspflicht" 20,7, „eu ai act schulung" 71,4, „ki schulung mitarbeiter" 46,8. Die Organik wächst fast ausschließlich über Ratgeber-Themen (Excel, Kosten, Claude, Tipps), während die Begriffe, unter denen Entscheider einen Anbieter suchen, auf Seite 2 bis 7 liegen. Die einzige Ausnahme ist der Vergleichsartikel, der für die Anbieter-Frage auf Platz 1 steht.

**Neu: GSC-Bericht „Auf generativer KI basierende Funktionen" (Beta):** 72.498 Impressionen in 3 Monaten, das sind rund 32 % aller Google-Impressionen. Der Tagesverlauf steigt seit August von etwa 600 auf über 1.500. Verteilung nach Seiten: microsoft-copilot-lizenzen 34.591 · copilot-in-excel-aktivieren 13.946 · claude-in-microsoft-copilot 4.489 · copilot-in-outlook-nutzen-tipps 3.069 · copilot-sicherheit-datenschutz 2.376 · ki-halluzinationen-vermeiden 1.622 · microsoft-copilot-varianten-unterschiede 1.611 · copilot-fuer-word 1.427 · copilot-cowork-abrechnung 1.286 · ki-kennzeichnungspflicht-eu-ai-act 1.071 (81 Seiten insgesamt). Eine Trainings- oder Angebotsseite ist in den Top 10 nicht vertreten. Dieser Bericht ist ab sofort die beste verfügbare Primärquelle für GEO-Sichtbarkeit in Google.

---

## 5. AlwaysData-Wachstum (frisch 11.11.)

| Monat 2026 | Unique Visits | Δ Vormonat |
|---|---|---|
| Juli | 22.503 | +70,14 % |
| August | 18.142 | −19,38 % |
| September | 20.570 | +13,38 % |
| **Oktober (final)** | **21.591** | **+4,96 %** |
| November (MTD, Tag 11, Stand 10:40) | 9.460 | −56,19 % (MTD-Artefakt) |
| **YTD Jan–Nov** | **137.101** | |

November-Pace: 9.460 bei gut zehn vollen Tagen ergibt hochgerechnet etwa 26.000 bis 27.000 und wäre damit ein neuer Monatsrekord. Da Paid mit rund 195 Sitzungen im Monat nur gut 5 % des Clarity-Volumens stellt und Outbound praktisch ruht, ist das Wachstum organisch getragen.

---

## 6. Traffic-Mix und Paid-/Outbound-Wirkung

**Kanal-Segmentierung 30T (Clarity, frisch):**

| Segment | Sitzungen 30T | Anteil | Δ ggü. 14.10. | Kontakt-/Lead-Proxy* | Rate |
|---|---|---|---|---|---|
| Organic Search | **2.303** | 63,5 % | +18 % (1.946) | 55 | **2,4 %** |
| Google Ads (cpc) | **~175** | 4,8 % | — (erstmals trennbar) | ≤ 1 | **~0,5 %** |
| Bing Ads | **~10** | 0,3 % | — | 0 | — |
| Other (kein Referrer, v. a. Direkt-/Markenaufrufe) | 775 | 21,4 % | | 41 | **5,3 %** |
| Referral | 218 | 6,0 % | | n. e. | |
| Direct | 146 | 4,0 % | | n. e. | |
| AIPlatform (LLM) | 40 | 1,1 % | Oktober ~100 (andere Zählweise inkl. Teams-Referrer) | n. e. | |
| Email / Outbound | 2 | 0,1 % | ~0 | 0 | |

*\*Proxy = Sitzungen mit „Formular absenden" + „Kontaktieren Sie uns" + „lead". Gilt als Obergrenze, da eine Sitzung mehrere Events tragen kann.*

**Wie die Google/Bing-Trennung zustande kommt:** Der Kanal PaidSearch hatte 195 Sitzungen. Im Segment-Filter zeigt der Referrer www.google.com 175, www.bing.com 10, Rest 2. Damit ist die Aufteilung zum ersten Mal ohne gclid/msclkid-Auswertung belastbar.

**Google Ads:** 189 von 195 Paid-Einstiegen landen auf der Startseite, 6 auf /trainings. Auf /wissen/ landet kein Paid-Traffic, der Zielseiten-Drift-Check ist sauber. Die Qualität ist schwach: 31 Sekunden aktive Zeit gegenüber 1,8 Minuten organisch, 1,54 Seiten pro Sitzung, im ganzen Monat ein einziges „Kontaktieren Sie uns" und kein Formular. Die Startseite selbst konvertiert sonst gut (siehe Abschnitt 7). Das Problem liegt also eher bei Keywords oder Anzeigentext als bei der Zielseite. Hinweis: Chris pflegt SEA-Leads mit Umsatz in „Conversions SEA.xlsx" (SharePoint). Diese Datei wurde in diesem Lauf nicht gelesen. Für eine ROAS-Aussage ist sie die bessere Quelle als Clarity.

**Bing Ads (Microsoft Advertising) — [ÜBERNOMMEN aus 22.09.]:** 28,16 € / 8 Klicks / 282 Impr. / CTR 2,84 % / CPC 3,52 € / 0 Conversions, UET-Status defekt. Der Login im internen Browser ist erneut abgelaufen, die Chrome-Extension war in diesem Lauf nicht verbunden. Das ist die 7. Woche ohne frische Ads-Zahlen. Neu ist der Clarity-Beleg: Bing Ads bringt nur etwa 10 Sitzungen im Monat. Das Budget ist damit klein, aber offenbar auch weitgehend wirkungslos.

**Outbound (`/sml/hr-tipps_2026`):** 2 Sitzungen mit `sml_landing_page_visit`, Kampagnen-UTM `hr-tipps-2026` 2 Sitzungen. Die Mail-Strecke liefert in Clarity faktisch keinen Traffic. Die Smartlead-Replies landen per Cron direkt in Trello. Der Website-Kanal ist deshalb nicht der richtige Maßstab für die Kampagne.

**Synergie Paid → SEO:** Ohne Suchbegriffsbericht aus Google Ads nicht auswertbar. Die GSC-Daten zeigen, dass die kaufnahen Begriffe („copilot schulung", „copilot training", „copilot workshop") organisch auf Seite 2 bis 4 stehen. Genau dort müsste SEA die Lücke füllen. Ob die Anzeigen auf diese Begriffe laufen, lässt sich nur im Ads-Konto prüfen.

---

## 7. Clarity-Conversion-Analyse (frisch 11.11.)

**Standard 30T:** 3.624 Sitzungen (+5,8 % ggü. 3.426), 446 Bots ausgeschlossen, 3.428 eindeutige Nutzer, 96 % neu. Seiten/Sitzung 1,17, Scrolltiefe 41,08 %, aktive Zeit 1,7 von 3,7 Minuten. Tote Klicks **12,94 %** (469 Sess.), übermäßige Klicks 0,30 %, schnelle Rückkehr 1,79 %. Edge 44,90 %, Chrome 30,19 %, MobileSafari 9,35 %. Leistung 84/100 (LCP 2,2 s gut, INP 210 ms „muss verbessert werden", CLS 0). Keine JavaScript-Fehler.

**Standard 3T (API, 1 Call):** 472 Sitzungen (68 Bots, 451 eindeutig), Dead-Click 12,5 %, Rage 0,64 %, Quick-Back 2,33 %, Scroll 44,02 %, aktive Zeit 112 s. Edge 231, Chrome 141, Firefox 41. PC 414 von 472 (88 %). Deutschland 370, Österreich 24, Schweiz 8 (DACH 85 %). Auffällig: Portugal 39 Sitzungen in drei Tagen, vermutlich Bot- oder Crawler-Rest. Beobachten.

**Conversion-Events 30T (Sitzungen, Vergleich 14.10.):** Formular absenden 46 (46) · Herunterladen 35 (30) · pdf_download 34 (33) · Ausgehender Klick 31 (39) · Kontaktieren Sie uns 30 (24) · lead 30 (28) · danke_page_view 27 (38) · booking_click 12 (18) · Zitat anfordern 6 (7) · konfigurator_submit 6 (5) · contact_form_submit 6 (6) · trainer_application_submit 3 (5) · sml_landing_page_visit 2 (0) · angebot_bruecke_click 2 (1) · phone_click 1 (2). content_cta_click 0, mail_click 0.

**6 Kern-Events:** contact_form_submit 6 / trainer_application_submit 3 / konfigurator_submit 6 / mail_click 0 / phone_click 1 / pdf_download 34.

**Conversion-Rate gesamt:** Proxy (46 + 30 + 30) / 3.624 ≈ **2,9 %**, gleich wie im Oktober. Echte Trainingsanfragen (contact_form_submit + konfigurator_submit) liegen bei 12 Sitzungen, also **0,33 %**. Kein 7e-Defekt.

**Die Korrektur des Monats — woher die Leads kommen (Seitenfilter, Sitzungen mit Besuch der Seite):**

| Seite | Sess. 30T | Formular | lead | Kontaktieren | booking | Einordnung |
|---|---|---|---|---|---|---|
| /guidelines (+ Unterseiten) | 150 | **31** | **30** | 0 | 1 | Lead-Magnet, ~20 % |
| / (Startseite) | 498 | 9 | 5 | **17** | 7 | Anfrage-Einstieg, ~6 % |
| /trainings | 252 | 3 | 1 | 3 | 2 | ~3 % |
| /wissen/copilot-tipps-tricks-produktivitaet | 335 | 1 | 1 | 0 | 1 | ~0,3 % |
| /wissen/copilot-in-outlook-nutzen-tipps | 331 | 0 | 0 | 0 | 0 | **0 Events** |
| /wissen/microsoft-copilot-lizenzen | 289 | 0 | 0 | 0 | 0 | 0 (1× Brücke) |
| /wissen/copilot-in-excel-aktivieren | 243 | 0 | 0 | 0 | 0 | **0 Events** |

Zwei Drittel aller Formular-Absendungen und alle Leads entstehen beim PDF-Download. Die Leistungskurve „Leads +115 %" aus dem Oktober misst Downloads und nicht Trainingsinteresse. Gleichzeitig ist der Guidelines-Bereich mit rund 20 % Conversion die mit Abstand effektivste Seite der Domain. Er bekommt aber nur 150 Sitzungen im Monat, während die vier großen Ratgeberartikel zusammen fast 1.200 Sitzungen ohne ein einziges Event abwerfen.

**Funnel „Lead-Reise" 30T (segmentiert):**

| Segment | Stufe 1 Wissensartikel | Stufe 2 Angebot | Stufe 3 Kontakt | E2E |
|---|---|---|---|---|
| Gesamt | 2.108 (58,2 %) | 8 (0,38 %) | 0 | 0 % |
| Organic | 1.679 (72,9 %) | 2 (0,12 %) | 0 | 0 % |
| Google-Ads + Bing-Ads | 1 | 0 | 0 | 0 % |
| Other/Direkt | 249 | n. e. | 0 | 0 % |
| Email | 0 | 0 | 0 | — |

Der Funnel bleibt bei 0 % E2E und ist in der Organik schwächer als im Oktober (0,12 % statt 0,70 % gesamt). Unter 2 % → Issue „Funnel-Optimierung gesamtsystemisch" bleibt offen. Die Ursache ist nach den Seitendaten klar: Wer über einen Ratgeber kommt, will eine Antwort und kein Training. Die einzige Brücke, die diese Leser nachweislich nehmen, ist ein kostenloses PDF.

**Heatmap /wissen/copilot-in-outlook-nutzen-tipps (30T, Desktop):** 80 geklickte Elemente. Platz 1 ist ein rund gestalteter, absolut positionierter Button mit 151 Klicks (39,6 % aller Klicks). Platz 2 und 3 sind zwei kleine Buttons mit 28 und 27 Klicks. Danach kommen Textklicks im Artikel (Copilot-Chat-Absatz 15). Das Muster passt zum bekannten ArticlePopup: Der häufigste Klick auf der Seite ist das Schließen eines Overlays. Ein Klick auf Trainingslink oder Download gehört nicht zu den Top 3. Heatmaps für die Top-3-Conversion-Seiten wurden in diesem Lauf nicht einzeln geöffnet, die Seitenfilter oben ersetzen sie für die Ableitung.

**Goldene Pages (Conversion, organisch gewichtet):** /guidelines (Lead-Magnet), Startseite (Anfragen, booking), /trainings.
**Bremsen (Traffic hoch, Conversion null):** copilot-in-outlook-nutzen-tipps (331), microsoft-copilot-lizenzen (289), copilot-in-excel-aktivieren (243), dazu copilot-tipps-tricks-produktivitaet (335, nahe null).

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

**Goldene Pages im strengen Sinn (GSC-Top und hohe Conversion):** Gibt es diesen Monat nicht. Die GSC-stärksten Seiten konvertieren nicht, die konvertierenden Seiten (Guidelines, Startseite, Trainings) bekommen kaum organische Google-Klicks. Die Startseite lebt von Marke, Direktaufrufen und Paid.

**Bremsen (GSC-Top, Conversion ~0):** copilot-in-excel-aktivieren (95 Klicks auf die Haupt-Query, 13.946 KI-Impressionen, 0 Events), microsoft-copilot-lizenzen (Kosten-Cluster mit über 15.000 Impressionen, 34.591 KI-Impressionen, 0 Events), copilot-in-outlook-nutzen-tipps (331 Sitzungen, 0 Events), copilot-tipps-tricks-produktivitaet (beste CTR der Domain mit 10,8 %, aber fast keine Weiterreise). Das ist die erste Optimierungspriorität. Der Hebel ist ein Lead-Magnet im Text, nicht ein weiterer Angebots-Button.

**Direkt-Aufrufe:** Das Segment „Other" (775 Sitzungen, Startseite, /trainings, /training-konfigurator, /ueber-uns) konvertiert mit 5,3 % am besten. Das passt zu Menschen, die die Marke schon kennen: aus Mails, dem Sales-Nachfass-Prozess, Teams oder Empfehlungen. Der Vertrieb treibt hier die Website-Conversion stärker als SEO.

---

## 9. LLM-Sichtbarkeit und Wettbewerb

**Direkttest (ChatGPT, Perplexity, Copilot):** nicht durchführbar, alle drei verlangen im internen Browser einen Login. **Ersatz und frische Belege:**

1. **GSC KI-Funktionen:** 72.498 Impressionen/3M mit steigender Tendenz. Google zeigt copilotenschule.de in AI Overviews vor allem für Lizenz-, Excel- und Claude-Fragen.
2. **Anbieter-Frage auf google.de** („Microsoft Copilot Schulungsanbieter Deutschland 2026"): Der eigene Vergleichsartikel steht auf **Platz 1**, danach fachevents.de, GFU, 121watt, medienreich, PC-COLLEGE, kebel und Microsoft Learn.
3. **Preisfrage auf google.de** („Was kostet eine Microsoft Copilot Schulung"): Die KI-Übersicht nennt 621 bis über 1.000 € pro Tag und Person und zitiert cmt Training, PC-COLLEGE, Haufe/skill it, m365-kurs.de und IT-Schulungen.com. **copilotenschule.de wird in der KI-Übersicht nicht genannt**, obwohl der eigene Vergleichsartikel organisch direkt darunter auf Platz 1 steht. Darüber laufen drei Anzeigen (aithoria, SEMINARON „Kurse ab 600 € netto", QualityHosting „kostenlose Schulung").
4. **Ursache:** Die Trainingspreise stehen inzwischen in `llms.txt` (Kick-off 150 € pro Person bzw. 1.800 € pro Gruppe, EU-AI-Act-Pflichtschulung 49 €). Der Vergleichsartikel, den Google für genau diese Frage nach oben stellt, nennt im HTML aber nur die Preise der Wettbewerber (695–995 €, 920 €) und keinen eigenen Preis. Die /trainings-Seite enthält im ausgelieferten HTML keine Eurobeträge. Google hat also kein eigenes Preissignal von der Seite, die es für die Preisfrage für relevant hält.

**Clarity AIPlatform:** 40 Sitzungen/30T (copilot.microsoft.com 8, gemini.google.com 7, dazu teams.public.onecdn 63 als Copilot-in-Teams-Referrer, im Kanal teilweise unter Referral). Im Kern stabil.

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins**
1. Organischer Rekordmonat: 1.040 Klicks/28T (+45 %), Position 7,1, AlwaysData-November auf Kurs Richtung 26.000.
2. Sichtbarkeit in Googles KI-Funktionen jetzt messbar und hoch: 72.498 Impressionen, ein Drittel der Gesamtsichtbarkeit.
3. Platz 1 für die Anbieter-Frage frisch auf google.de bestätigt. Der Guidelines-Bereich konvertiert mit rund 20 %.

**Probleme**
1. Die Leads sind Downloads. Die Ratgeber mit dem meisten Traffic erzeugen null Events, echte Trainingsanfragen über Formulare liegen bei 12 Sitzungen im Monat (0,33 %).
2. Kaufnahe Begriffe fehlen: „copilot schulung" Position 30, „copilot training" auf 11,7 abgerutscht, EU-AI-Act-Schulung auf Seite 3 bis 8.
3. Paid ist teuer und stumm. Google Ads bringt ~175 Startseiten-Besuche mit 31 Sekunden aktiver Zeit und praktisch keiner Conversion, Bing ~10 Sitzungen, UET seit 50 Tagen defekt, Ads-Login weiter abgelaufen.

---

## 11. Konkrete Empfehlungen (5, mit Aufwand und KPI)

| # | Was | Warum | Aufwand | Erfolgs-KPI |
|---|---|---|---|---|
| 1 | **Themenpassende Guideline-Downloadbox im Text** der vier Bremsen-Artikel (Excel → Excel-Praxishandbuch, Outlook/Tipps → Einführungs- bzw. Management-Leitfaden, Lizenzen → Admin-Leitfaden), platziert direkt nach der Schnellantwort und noch einmal vor den FAQ. Diffs per Folge-Cron vorgesehen (siehe Anhang, Anlage blockiert). | /guidelines konvertiert mit ~20 %, die Artikel mit 0 %. Die bestehenden Links im Footer und am Rand werden nicht geklickt (0 Events in 243 bis 331 Sitzungen). | M (code-only, Draft per Cron) | pdf_download aus Wissensartikeln von ~0 auf ≥ 25/30T; Lead-Rate auf diesen vier Seiten ≥ 3 % |
| 2 | **Eigenen Preis in den Vergleichsartikel** `copilot-schulungsanbieter-deutschland-vergleich` aufnehmen (Abschnitt „Copilotenschule" mit Kick-off ab 150 €/Person bzw. 1.800 €/Gruppe, EU-AI-Act ab 49 €, wie in llms.txt) und die Preise auf /trainings als serverseitigen Text ausgeben. | Die Seite steht für die Preisfrage auf Platz 1, die KI-Übersicht zitiert aber nur Wettbewerberpreise. | S | Preisfrage-Test: KI-Übersicht nennt copilotenschule.de mit Preis |
| 3 | **Schulungs-Landingpage für „copilot schulung / training / workshop"** inhaltlich aufwerten: /trainings bzw. copilot-training-schulung (Protected Page, nur additiv) mit eigenem Abschnitt zu Format, Dauer, Preis, Ablauf, Referenzen und FAQ, dazu interne Links aus den vier Ratgeber-Hubs mit Ankertext „Copilot Schulung". | Die Begriffe, unter denen Entscheider einen Anbieter suchen, stehen auf Position 12 bis 42. Ohne Sichtbarkeit dort bleibt die Organik ein Ratgeber-Kanal. | M | „copilot training" ≤ 8, „copilot schulung" ≤ 15 in 8 Wochen |
| 4 | **Google Ads auf Anbieter-Suchbegriffe umstellen und den UET- bzw. Ads-Login reparieren.** Suchbegriffsbericht prüfen, Ratgeber-Keywords ausschließen, gezielt „copilot schulung", „copilot workshop", „ki schulung pflicht" bespielen. Zielseite /trainings statt Startseite testen. Bing-Ads-Budget pausieren, bis UET läuft. | Paid deckt genau die Lücke aus #3. Heute bringt es Startseiten-Besuche ohne Weiterreise. | S–M (user-gebunden) | Paid-Kontakt-Rate ≥ 2 %; Abgleich mit „Conversions SEA.xlsx" |
| 5 | **Lead-KPI trennen:** Im Reporting ab sofort „Download-Leads" (Guidelines) und „Trainingsanfragen" (contact_form_submit + konfigurator_submit + Kontaktieren auf /trainings) getrennt ausweisen, Messvorschrift DoD #1 auf −8 PDFs aktualisieren. | Der Oktober-Review hat Downloads als Leads gefeiert. Die Steuerung braucht die echte Anfragezahl. | S | Monatsreview weist beide Werte aus |

---

## 12. Risiken (max. 3, mit Mitigation)

1. **Ratgeber-Abhängigkeit in KI-Zeiten.** Ein Drittel der Impressionen läuft schon über AI Overviews. Für informative Fragen (Excel aktivieren, Lizenzkosten) beantwortet Google zunehmend direkt, die Klickrate kann fallen, obwohl die Sichtbarkeit steigt. Mitigation: Empfehlungen #1 und #3, damit aus Sichtbarkeit Kontakte werden und die Domain auch für kaufnahe Begriffe rankt.
2. **Fehlsteuerung durch Download-Leads.** Wer auf die Leadkurve schaut, sieht Wachstum, das im Vertrieb kaum ankommt. Mitigation: Empfehlung #5, dazu Nachfassen der Download-Leads über den bestehenden Sales-Prozess.
3. **Blindes Paid-Budget.** UET seit 22.09. defekt, Ads-Login wiederholt abgelaufen, Google-Ads-Traffic ohne Weiterreise. Mitigation: Budget nicht erhöhen, bis Empfehlung #4 umgesetzt ist. Bing pausieren.

---

## 13. Anhang: Neue Clarity-Insights des Monats

- **Pattern (übertragen):** Guideline-Download als einzig funktionierende Brücke aus dem Ratgeber. /guidelines ~20 % Conversion, Wissensartikel 0 %. Folge-Cron `copilotenschule-pattern-transfer-2026-11-25` war vorgesehen, die Anlage wurde aber vom Scheduler abgelehnt (in einem automatischen Lauf ohne Freigabe nicht erlaubt). Muss von Martin angelegt oder freigegeben werden.
- **Issue (Anti-Pattern):** copilot-in-excel-aktivieren, GSC-#1-Seite der Domain, 243 Sitzungen/30T, 0 Events, Excel-Praxishandbuch nur als Randlink. Folge-Cron `copilotenschule-clarity-fix-copilot-in-excel-aktivieren` (+7 Tage, 18.11.) vorgesehen, Anlage ebenfalls abgelehnt. Muss manuell angelegt werden; der Auftragstext steht im Status-Log-Eintrag vom 11.11.
- **Trend (korrigiert):** „Leads +115 %" (Oktober) = Download-Wachstum, nicht Anfrage-Wachstum. Echte Trainingsanfragen 12 Sitzungen/30T.
- **Trend (verstärken):** KI-Sichtbarkeit in Google, 72.498 Impressionen/3M, steigend. Lizenz-Seite trägt die Hälfte.
- **Pattern (Kanal):** Direkt/Other konvertiert mit 5,3 % am besten, Paid mit 0,5 % am schlechtesten. Paid-Split erstmals messbar: Google ~175, Bing ~10.

---

*Regulärer 2.-Mittwoch-Monatsreview 11.11.2026. Keine Code-Pushes. Zwei Folge-Crons waren vorgesehen, ihre Anlage wurde in diesem automatischen Lauf vom Scheduler abgelehnt (Details im Status-Log). Hinweis: Auch der im Oktober-Review gemeldete Folge-Cron zur CTA-Brücken-Repositionierung hat keinen Draft in `docs/drafts/` hinterlassen (jüngster Draft vom 26.08.). Vermutlich scheiterte schon dessen Anlage an derselben Sperre. Folge-Crons aus Monatsreviews entstehen damit seit mindestens Oktober nicht mehr. Nächster regulärer Monatsreview: Mi 09.12.2026 (2. Mittwoch).*
