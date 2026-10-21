# SEO-Monatsreview Oktober 2026 (2.-Mittwoch-Lauf, 14.10.2026)

**Erstellt:** 14. Oktober 2026 (regulärer Monatsreview, Schritt-0-Guard bestanden: Tag 14, Mittwoch = 2. Mittwoch, Fenster 08.–14.)
**Datenlage:** Vollständig frisch belegt bis auf Bing Ads. GSC (interner Browser, `authuser=1`), AlwaysData (intern), **Clarity-Dashboard 30T inkl. Conversion-Events, Funnel, Kanäle, CWV (intern, Session persistierte)**, Clarity-API 3T (Script), SSR (recheck.sh). **Übernommen und als solche markiert:** Bing-Ads-Kampagnenwerte (Microsoft-Advertising-Login im internen Browser abgelaufen — Google-Account-Chooser, alle Konten abgemeldet; im headless-Lauf keine OAuth-Anmeldung möglich) sowie der LLM-Direkt-Naming-/Preisfragen-Test (ChatGPT/Perplexity/Claude ohne Login nicht abfragbar, Ahrefs Brand Radar nicht im API-Plan). LLM-Sichtbarkeit wird ersatzweise über die frischen Clarity-AI-Referrer belegt.

---

## 1. Executive Summary

Die Organik hält ihr Allzeithoch und baut es aus: GSC 3M steht bei 2.240 Klicks / 198.000 Impressionen bei Position 7,9 — die beste je gemessene Durchschnittsposition, das 28-Tage-Fenster liegt sogar bei 7,4. AlwaysData hat im Jahr 2026 die 115.000-Besucher-Marke überschritten (YTD 115.148), September final 20.570, Oktober liegt mit 9.098 an Tag 14 auf Pace ~20,1k. Der eigentliche Befund des Monats ist aber ein anderer: Die Conversion-Signale ziehen deutlich schneller an als der Traffic. Während die Sitzungen gegenüber dem 22.09-Review um gut 10 Prozent wuchsen (3.099 → 3.426 in 30 Tagen), legten Formular-Absendungen um 70 Prozent (27 → 46), Leads um 115 Prozent (13 → 28) und PDF-Downloads um 83 Prozent (18 → 33) zu. Das ist der stärkste positive Trend seit dem Clarity-Setup. Gegenläufig und teuer bleibt genau eine Stelle: die bewusst gebaute Angebots-CTA-Brücke feuert nur noch 1×/30T (von 4× am 22.09) — der Funnel Content → Angebot verharrt bei 0,70 % → 0 % E2E. Paid ist nicht mehr „eingeschlafen", wie der September-Review noch schloss: Clarity weist 238 PaidSearch-Sitzungen/30T aus (12,2 %), aber weil das Bing-Ads-UET-Tracking defekt ist und der Login nicht erneuert werden kann, fließt dieses Budget blind. Indexierung flat bei 88,2 % (75/85), SSR 67/67, DoD unverändert 4/8, Phase 3, kein Wechsel. Keine Code-Pushes.

---

## 2. Definition-of-Done-Tabelle (Stand 14.10.2026)

| # | Kriterium | Ziel | Aktuell | Trend ggü. 22.09. | Status |
|---|-----------|------|---------|-------------------|--------|
| 1 | Indexierungsquote GSC (eingereichte Seiten ohne 6 Gated-PDFs) | ≥ 90 % | **88,2 %** (75/85, live 09.10.) | flat (88,1 %) | 🟡 an Schwelle |
| 2 | SSR „🔴 komplett kaputt" | ≤ 5 | **0** (67/67 ✅, live 14.10.) | stabil | ✅ erfüllt |
| 3 | SEO-Score Health-Check | ≥ 75 | **42** (C1-Blocker, PageSpeed-Modul seit 27.05. aus Daily entfernt) | flat | 🔴 offen |
| 4 | GEO-Score | ≥ 80 | **82** + LLM-Traffic frisch messbar (Clarity AI-Referrer ~100/30T) | gehalten | ✅ erfüllt |
| 5 | Top-Klick-Bringer ≥ 5 verschiedene URLs | ≥ 5 | Cluster Excel / Kosten / Lizenz / Claude / Marke | stabil | ✅ wahrscheinlich |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | Top 3 | **#1** (eigener Vergleichs-Hub, kein Ranking-Verlust belegt; DACH-SERP diesen Lauf nicht frisch geprüft) | gehalten | ✅ wahrscheinlich |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** (Drafts nicht versendet) | flat | 🔴 offen |
| 8 | ProvenExpert-Profil | ≥ 15 Bew. | **0** (nicht angelegt) | flat | 🔴 offen |

**Score: 4/8 erfüllt** (unverändert seit Juni). Die zwei beweglichen Lücken bleiben #1 (Indexierung, Restweg rechnerisch rund 2 Seiten) und #3 (SEO-Score, hängt am C1-Setup). #7 und #8 sind rein user-gebunden.

*Fußnote Messbasis-Bruch: Werte vor dem 20.08.2026 beziehen sich auf die alte Basis „Alle bekannten Seiten" und sind mit der aktuellen bereinigten Quote nicht direkt vergleichbar (einmalig dokumentiert in der Messvorschrift DoD #1 im Projektplan).*

---

## 3. SSR-Audit (live 14.10.)

67/67 Helmet-Flush ✅, 0 Default-Fallback, 0 leer, 0 Doppel-Description (recheck.sh, Snapshot `seo-monitoring/2026-10-14-snapshot.json`; `audit-live.sh` weiter nicht im Mount). Baseline 04.05.: 31 ✅ / 36 Fallback. Der Regressions-Wächter ist seit Wochen still — kein Eingriff an gerenderten Seiten, DoD #2 gewahrt.

---

## 4. GSC-Entwicklung (frisch 14.10., berechtigtes Konto `authuser=1`)

**Indexierung (eingereichte Seiten ohne 6 Gated-PDFs):** 75 indexiert / 16 nicht indexiert (Gefunden 10 + Gecrawlt 6) → **75/85 = 88,2 %**, flat gegenüber 12.10. Der Index-Bericht wurde zuletzt am 09.10. neu gecrawlt. A6-Summe 16. Rechnerisch fehlen zu 90 % rund zwei weitere indexierte Seiten; der Rückstand ist rein inhaltlich, nicht technisch.

**Kontext „Alle bekannten Seiten" (KEIN KPI):** 75 indexiert / 30 nicht — Seite mit Weiterleitung **10 (stabil)**, Gecrawlt 9, Gefunden 10, robots 1, kanonisch 0. Keine neue Redirect-Quelle außerhalb der Sitemap.

**Leistung 3M (ca. 12.07.–11.10.):** Klicks **2.240**, Impressionen **198.000**, CTR 1,1 %, Position **7,9** (neue Bestposition, von 8,2 am 22.09.). **28 Tage:** Klicks 718, Impressionen 65.288, CTR 1,1 %, Position **7,4** — das jüngere Fenster liegt klar über dem Quartalsschnitt, die Positionsverbesserung ist also aktuell, nicht historisch.

**Top-Klick-Bringer (3M):** copilot in excel aktivieren 89 (Pos. 1,4) · excel copilot aktivieren 27 · copilotenschule 21 (Marke) · copilot excel aktivieren 18 · copilot kosten 15 · copilot claude 14 · copilot preise 13 · copilot lizenz 10 · copilot preis 10 · microsoft copilot kosten 8.

**Schläfer (nach Impressionen, CTR ≤ 1 %):** Der Kosten-/Lizenz-/Preis-/Pro-Cluster ist unverändert der größte ungehobene Hebel und summiert sich auf rund 15.000 Impressionen bei CTR 0,3–1 % auf den Positionen 3–6: copilot kosten (2.973 Impr., 0,5 %, Pos. 4,2) · copilot pro (2.727, 0,3 %, Pos. 9,1) · copilot training (1.919, 0,2 %, **Pos. 10,9** — knapp vor Seite 1, strategisch) · copilot lizenz (1.665, 0,6 %, Pos. 4,0) · microsoft copilot kosten (1.436, 0,6 %, Pos. 4,2) · copilot premium kosten (1.413, 0,6 %, Pos. 5,2) · copilot lizenz kosten (1.290, 0,6 %, Pos. 3,1) · copilot preise (1.252, 1 %, Pos. 5,6) · copilot pro kosten (1.230, 0,7 %, Pos. 6,2).

**Strategic-Keyword-Check:** Von den vier config-Strategic-Keywords (Schulungsanbieter-Vergleich, Inhouse buchen, QCG-Förderung, EU AI Act Schulungspflicht) taucht keines in den Top-Impressionen auf. Der generische Schläfer „copilot training" (1.919 Impr., Pos. 10,9) ist dagegen neu prominent und der klarste Positions-Hebel: von Pos. 11 auf Seite 1 würde massiv Klicks bringen.

---

## 5. AlwaysData-Wachstum (frisch 14.10.)

| Monat 2026 | Unique Visits | Δ Vormonat |
|---|---|---|
| Januar | 1.084 | +50,97 % |
| Februar | 4.300 | +296,68 % |
| März | 6.226 | +44,79 % |
| April | 7.543 | +21,15 % |
| Mai | 12.456 | +65,13 % |
| Juni | 13.226 | +6,18 % |
| Juli | 22.503 | +70,14 % |
| August | 18.142 | −19,38 % |
| September (final) | **20.570** | +13,38 % |
| **Oktober (MTD, Tag 14)** | **9.098** | −55,77 % (MTD-Artefakt) |
| **YTD Jan–Okt** | **115.148** | 115k-Marke überschritten |

Oktober liegt an Tag 14 auf Pace ~20,1k (9.098 / 14 × 31) — in Linie mit September und über August. 24h am 14.10.: 772. Da Paid zwar fließt, aber ohne Conversion-Messung, und Outbound aus ist, trägt das Wachstum praktisch weiter die Organik.

---

## 6. Traffic-Mix Organic / Paid / Outbound / LLM + Paid-Wirkung

**Kanal-Segmentierung 30T** (Clarity, frisch 14.10.):

| Segment | Volumen 30T | Quelle / Hinweis |
|---|---|---|
| **Organic Search** | **1.946 Sess.** (Kanal) | Referrer-Detail: Google 1.403 · Bing 675 · DuckDuckGo 39 · Ecosia 27 · Yahoo 25 · google.de 16 |
| **Paid Search** | **238 Sess. (12,2 %)** | Google-cpc + Bing-Ads **kombiniert**; ohne gclid/msclkid nicht trennbar. **Deutlich aktiver** als beim 22.09-Review angenommen (dort „~0 cpc") |
| **LLM / AI** | **~100 Sess.** | teams.public.onecdn 62 · chatgpt.com 19 · copilot.microsoft.com 10 · gemini.google.com 9 |
| **Outbound (email)** | **~0 Sess.** | kein `sml_*`-Event im 30T-Fenster → weiter eingeschlafen |
| Referral | ~176 | copilotenschule.de intern 170 · ui.ads.microsoft.com 6 |
| Direct / Rest | ~970 (Restmenge) | Referrer null |

**Google Ads (SEA):** Innerhalb der 238 PaidSearch-Sitzungen nicht separat von Bing-Ads auflösbar (kein gclid-Fenster im Clarity-Referrer). Ein sauberer Zielseiten-Drift-Check pro Paid-Segment ist mangels Segmentierung diesen Lauf nicht möglich; die Top-Pages gesamt sind Startseite + /trainings + /wissen-Cluster, kein auffälliges Abkippen von Paid-Traffic auf /wissen/-Artikeln erkennbar.

**Bing Ads (Microsoft Advertising) — [ÜBERNOMMEN aus 22.09., Login abgelaufen]:** 28,16 € / 8 Klicks / 282 Impr. / CTR 2,84 % / Ø-CPC 3,52 € / **0 Conversions** (UET-Status: **defekt** — Konto meldet „keine Conversions in 7 Tagen"). Der interne Browser zeigte beim Aufruf von `ui.ads.microsoft.com` den Google-Account-Chooser mit allen Konten abgemeldet; eine Anmeldung ist im headless-Lauf nicht möglich. Damit sind die Oktober-MTD-Werte für Bing Ads diesen Lauf **nicht lesbar** — der September-Stand ist der letzte belastbare Wert. Fakt bleibt: Clarity zeigt 238 Paid-Sitzungen/30T, also fließt Budget, aber Spend/Conversion sind blind.

**Befund Paid gesamt:** Die September-Diagnose „alle drei Push-Kanäle schwach/eingeschlafen" ist für Paid Search zu revidieren — der Kanal läuft mit 238 Sess./30T sichtbar. Das Problem ist nicht mehr fehlendes Volumen, sondern fehlende Messung: ohne UET-Fix und ohne Login lässt sich weder ROAS noch die Google/Bing-Aufteilung bestimmen.

---

## 7. Clarity-Conversion-Analyse (frisch 14.10.)

**Standard 30T:** 3.426 Sitzungen (524 Bots), 3.216 Unique, neue Nutzer 95,48 %, Seiten/Sitzung 1,23, Scrolltiefe 40,88 %, aktive Zeit 1,7 von 3,9 Min. Dead-Click **13,16 %** (451 Sess.), Rage 0,35 % (12), Schnelle Rückkehr 2,42 % (83), Übermäßiges Scrollen 0 %. Edge **48,80 %** (1.672 Sess., B2B-Profil hart), Chrome 30,71 %, MobileSafari 7,68 %. CWV-Score **84/100** (LCP 2,3 s gut, **INP 210 ms** „muss verbessert werden", von 220 ms leicht besser; CLS 0 gut).

**Standard 3T (API):** 375 Sess. (71 Bots, 359 Unique), Dead-Click **15,2 %**, Rage 0,53 %, Quick-Back 2,67 %, Scroll 38,39 %, aktive Zeit 100 s, Edge 201/375 (≈54 %), PC 347/375 (≈93 %), Deutschland 320 + Österreich 22 + NL 12 + CH 9 (DACH ≈ 93 %). Deckt sich mit der 30T-Sicht; Dead-Click im bekannten organischen ArticlePopup-Zickzack.

**Conversion-Events 30T** (Sitzungen): Formular absenden **46** · Ausgehender Klick 39 · danke_page_view 38 · pdf_download **33** · Herunterladen 30 · lead **28** · Kontaktieren Sie uns 24 · booking_click 18 · Zitat anfordern 7 · contact_form_submit 6 · konfigurator_submit 5 · trainer_application_submit 5 · Buchen 2 · phone_click 2 · **angebot_bruecke_click 1**. content_cta_click 0 · mail_click 0 · `sml_*` 0.

**6 Kern-Events:** contact_form_submit 6 / trainer_application_submit 5 / konfigurator_submit 5 / mail_click 0 / phone_click 2 / pdf_download 33.

**Conversion-Rate gesamt:** Proxy (Formular absenden 46 + Kontaktieren Sie uns 24 + lead 28 = 98/3.426) ≈ **2,9 %** — deutlich über dem 22.09-Wert (~1,9 %). Konservativ (nur echte Kern-Formular-Submits 16/3.426) ≈ 0,5 %. Kein 7e-Defekt: kein Event ≥3→0, im Gegenteil, nahezu alle Conversion-Events sind M/M gestiegen.

**Monatsvergleich Conversion-Events (22.09. → 14.10.):** Formular absenden 27 → 46 (+70 %), lead 13 → 28 (+115 %), pdf_download 18 → 33 (+83 %), danke_page_view 28 → 38 (+36 %), Kontaktieren 20 → 24 (+20 %) — und gegenläufig **angebot_bruecke_click 4 → 1 (−75 %)**.

**Funnel „Lead-Reise" 30T:** Stufe 1 SEO-Einstieg 1.718 (50,15 %) → Stufe 2 Angebot angeschaut 12 (0,70 %) → Stufe 3 Kontakt 0 → **0 % E2E**. Leicht über 22.09. (11 / 0,62 %), aber strukturell unverändert gebrochen. Die CTA-Brücke feuert mit 1×/30T so selten wie nie — Placement-Problem verschärft.

**Goldene Pages (organic):** microsoft-copilot-lizenzen (GSC-Kosten/Lizenz-Cluster + Clarity-Top-Page 237), copilot-in-excel-aktivieren (GSC-#1-Klick-Bringer 89 + Clarity-Page 187), claude-in-microsoft-copilot (Clarity 147 + GSC „copilot claude" 14 Kl.).
**Bremsen:** microsoft-copilot-lizenzen (Kosten-Cluster CTR < 1 %, Snippet-Draft seit 12.08. unverpusst), copilot-in-outlook-nutzen-tipps (Clarity-Entry 215, schwache Weiterreise), copilot-in-excel-aktivieren (GSC-#1, aber kaum On-Site-Weiterreise zum Angebot).

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

**Goldene Pages** (GSC-Top + hohe Clarity-Präsenz, Organik): `microsoft-copilot-lizenzen`, `copilot-in-excel-aktivieren`, `claude-in-microsoft-copilot`. Diese drei verbinden Ranking-Stärke mit Entry-Volumen und verdienen die nächste Optimierungs-Investition — konkret die CTA-Brücke, die genau hier greifen soll.

**Bremsen** (GSC-Top + schwache Conversion-Weiterreise): Der gesamte Kosten-/Lizenz-/Preis-Cluster rankt auf Position 3–6 mit CTR unter 1 %. Das ist doppelt teuer: Erstens verschenkte Klicks durch schwache Snippets (Snippet-Draft seit 12.08. fertig, unverpusst), zweitens keine Brücke von diesen Hoch-Impression-Seiten ins Angebot.

**Direkt-Aufrufe / Entkopplung** (AlwaysData hoch, GSC erklärt nicht alles): Die LLM-Referrer (ChatGPT 19, Copilot 10, Gemini 9, Teams 62) und ein großer Direct-Rest (~970/30T) zeigen, dass ein messbarer Teil der Reichweite nicht aus klassischer Google-Suche kommt. Der LLM-Kanal ist verstetigt (Gemini hält sich seit September), die GEO-Arbeit zahlt.

---

## 9. LLM-Sichtbarkeit + Wettbewerb

**LLM-Sichtbarkeit (Proxy frisch, Direkt-Test übernommen):** Fresh belegt über Clarity-AI-Referrer — ChatGPT 19, Copilot 10, Gemini 9, Teams 62 (≈ 100 Sess./30T), stabil gegenüber September, Gemini weiter präsent. Der direkte Naming-Test („Wer sind die besten Anbieter für Microsoft-Copilot-Schulungen in Deutschland?") und der Preisfragen-Test konnten diesen Lauf **nicht frisch** durchgeführt werden (ChatGPT/Perplexity/Claude ohne Login im headless-Lauf nicht abfragbar; Ahrefs Brand Radar nicht im API-Plan). **Übernommen aus 22.09.:** Lizenz-Seite bleibt prominent zitierbar (eigene Quelle), der eigene **Trainings-/Schulungspreis ist weiter nicht mit konkretem Wert LLM-zitierbar** — die GEO-Preislücke besteht fort. Empfehlung unverändert: konkrete Trainingspreise in `llms.txt` + Trainingsseite.

**Wettbewerb:** Eine saubere DACH-Inkognito-SERP war über die US-geolokalisierte Websuche diesen Lauf nicht abbildbar (Ergebnisse zeigen überwiegend StackFuel/genaumeinkurs, büro-kaizen, IHK, Haufe/skill it, pco-online, mind-verse — bekanntes Feld). Kein Hinweis auf einen Ranking-Verlust für die eigene Vergleichsabfrage; der eigene Vergleichs-Hub hielt zuletzt (22.09.) Platz 1. PC-COLLEGE (Bildungs-Award) bleibt als award-gestützter Player zu beobachten. DACH-Platz-1-Bestätigung über ein echtes DE-SERP steht aus und sollte beim nächsten Lauf mit interaktivem Browser frisch geprüft werden.

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins:** (1) **Conversion-Signale springen** — Formular +70 %, Leads +115 %, PDF-Downloads +83 % M/M, bei nur +10,5 % Traffic. (2) Organik-Allzeithoch ausgebaut: Position 7,9 (3M) bzw. 7,4 (28T), beste je. (3) AlwaysData YTD > 115.000, SSR 67/67, B2B-Profil sauber (Edge 48,8 %, DACH ~93 %).

**Probleme:** (1) **CTA-Brücke kollabiert auf 1×/30T** (von 4×) — der Funnel Content → Angebot bleibt 0,70 % → 0 % E2E, ausgerechnet während die Nachfrage steigt. (2) **Paid fließt blind** — 238 Sess./30T, aber Bing-Ads-UET defekt und Login nicht erneuerbar, Google/Bing-Split nicht messbar. (3) Indexierung seit über zwei Monaten flat bei 88,2 % und Kosten-Cluster-CTR unter 1 % — beide Hebel liegen als fertige Drafts, aber unverpusst.

---

## 11. Konkrete Empfehlungen (5, mit Aufwand + KPI)

| # | Was | Warum | Aufwand | Erfolgs-KPI |
|---|---|---|---|---|
| 1 | **Angebots-CTA-Brücke repositionieren** auf den 3 Goldenen Pages (höher, zusätzlicher Touchpoint im Fließtext) | Brücke feuert nur 1×/30T (von 4×), Funnel Stufe 1→2 = 0,70 % — während Nachfrage steigt, bricht die eine gebaute Brücke weg | M (code-only, Draft via Folge-Cron) | angebot_bruecke_click 1 → ≥ 20/30T; Stufe 2 > 2 % |
| 2 | **Lizenz-/Kosten-Snippet-Draft (12.08.) pushen** | Kosten-/Lizenz-/Preis-Cluster ~15.000 Impr., Pos. 3–6, CTR < 1 % — größter ungehobener Klick-Hebel | S (Draft fertig) | Cluster-CTR 0,5 % → ≥ 1,5 % |
| 3 | **Bing-Ads-UET-Conversion-Tracking fixen + Microsoft-Advertising-Login erneuern** | 238 Paid-Sess./30T fließen blind; ohne Tracking kein ROAS, ohne Login keine Werte | S–M | UET feuert Conversions; CPA/ROAS messbar |
| 4 | **„copilot training" auf Seite 1 heben** (Pos. 10,9, 1.919 Impr., 0,2 % CTR) | Ein einziger Positionssprung von Pos. 11 → Top 8 würde erheblich Klicks bringen; strategischer als der reine Kosten-Cluster | M (inhaltliche Aufwertung der Zielseite) | „copilot training" Pos. ≤ 8, Klicks ≥ 30/3M |
| 5 | **Trainingspreis LLM-zitierbar machen** (`llms.txt` + Trainingsseite) | GEO-Preislücke: LLMs zitieren Lizenz-, nicht Trainingspreis | S–M | Preisfragen-Test nennt eigenen Trainingspreis |

---

## 12. Risiken (max. 3, mit Mitigation)

1. **Funnel-Bremse trifft steigende Nachfrage.** Die Conversion-Signale wachsen, aber die CTA-Brücke feuert immer seltener — jeder zusätzliche Besucher läuft in eine schwächer werdende Brücke. Mitigation: Empfehlung #1 (Repositionierung) vorziehen; Folge-Cron schreibt den Code-Diff.
2. **Blindes Paid-Budget.** 238 Paid-Sess./30T ohne Conversion-Messung, Login nicht erneuerbar. Mitigation: UET-Fix + Login-Erneuerung vor jeder Budgeterhöhung; bis dahin Budget nicht hochfahren.
3. **Einseitige Kanalabhängigkeit.** Organik trägt faktisch die gesamte messbare Conversion; ein Google-Core-Update träfe voll. Mitigation: LLM-Kanal pflegen (GEO-Preislücke schließen), einen Paid-Kanal mit sauberer Messung gezielt ausbauen.

---

## 13. Anhang: Neue/aktualisierte Clarity-Insights des Monats

- **Trend (verstärken):** Conversion-Event-Sprung — Formular +70 %, Leads +115 %, PDF +83 % M/M bei +10,5 % Traffic. Erstmals wachsen Conversions klar schneller als Reichweite. In `clarity-insights.md` als Trend „Conversion-Wachstum > Traffic-Wachstum" vermerken.
- **Anti-Pattern (verschärft):** angebot_bruecke_click 4 → 1/30T bei steigender Nachfrage — Placement-Regression der CTA-Brücke. Folge-Cron für Repositionierungs-Diff angelegt (siehe Status-Log).
- **Pattern (bestätigt):** B2B-Profil hart (Edge 48,8 %, PC ~93 %, DACH ~93 %); LLM-Referrer verstetigt (~100/30T, Gemini hält).
- **Datenlücke (benannt):** Bing-Ads-MTD und LLM-Direkt-Naming-/Preistest diesen Lauf nicht frisch (Login/Plan) — übernommen bzw. über Proxy belegt.

---

*Regulärer 2.-Mittwoch-Monatsreview 14.10.2026. Keine Code-Pushes. Ein Folge-Cron angelegt (CTA-Brücke-Repositionierung, +14 Tage) — Details im Status-Log. Nächster regulärer voller Monatsreview: Mi 11.11.2026 (2. Mittwoch).*
