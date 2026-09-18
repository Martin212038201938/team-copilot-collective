# SEO-Monatsreview September 2026 (Zusatzlauf 17.09., User-angefordert)

**Erstellt:** 17. September 2026
**Datenqualität:** Diesmal **alle** Kernquellen frisch erhoben — GSC (Chrome/Login), AlwaysData (Login), Clarity-Dashboard 30T inkl. Conversion-Events + Funnel + Traffic-Mix (Chrome/Login), Clarity-API 3T, SSR live, Wettbewerb/LLM via Websuche. Nichts aus Baseline übernommen. Das ist der erste vollständig frisch belegte September-Review seit dem 02.09.-Original.

---

## 1. Executive Summary

Der organische Kanal hält sein Allzeithoch: GSC 3M **2.240 Klicks / 187.000 Impressionen / Position 8,3** — beste je gemessene Position. Die Indexierungsquote (DoD #1) steht unverändert bei **88,1 % (74/84)** an der 90-%-Schwelle; der GSC-Bericht ist seit dem 04.09. nicht neu gecrawlt, der Restweg bleibt ~1 Seite und rein inhaltlich. Clarity 30T zeigt **3.032 Sitzungen**, weiter dominant organisch (Google 1.315 + Bing 451), mit einem stabilen B2B-Profil (Edge 47,5 %, PC-lastig, DACH). Der teuerste offene Befund ist unverändert der **Funnel-Bruch Content → Angebot: 1.814 SEO-Einstiege → 11 Angebots-Views (0,61 %) → 0 Kontakt-Conversions auf diesem Pfad (0 % E2E)**. SEA und Outbound sind beide eingeschlafen (0 im Top-Referrer-Fenster). DoD-Score bleibt **4/8**, Phase 3 aktiv, kein Phasenwechsel. Keine Code-Pushes, keine neuen Crons (Doktrin: Engpass ist der Backlog user-gebundener Aktionen, kein Automatisierungs-Loch).

---

## 2. Definition-of-Done-Tabelle (Stand 17.09.2026)

| # | Kriterium | Ziel | Aktuell | Trend | Status |
|---|-----------|------|---------|-------|--------|
| 1 | Indexierungsquote GSC (eingereichte Seiten ohne 6 Gated-PDFs) | ≥ 90 % | **88,1 %** (74/84) | flat seit 04.09. | 🟡 an Schwelle |
| 2 | SSR „🔴 komplett kaputt" | ≤ 5 | **0** (67/67 ✅) | stabil | ✅ erfüllt |
| 3 | SEO-Score Health-Check | ≥ 75 | **42** (C1-Blocker) | flat | 🔴 offen |
| 4 | GEO-Score | ≥ 80 | **82** + LLM-Traffic 143 Sess./30T | gehalten | ✅ erfüllt |
| 5 | Top-Klick-Bringer ≥ 5 verschiedene URLs | ≥ 5 | Cluster Excel / Kosten / Lizenz / Claude / Marke | stabil | ✅ wahrscheinlich |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | Top 3 | **#1** (eigener Vergleichs-Hub) | gehalten | ✅ erfüllt |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** (Drafts nicht versendet) | flat | 🔴 offen |
| 8 | ProvenExpert-Profil | ≥ 15 Bew. | **0** (nicht angelegt) | flat | 🔴 offen |

**Score: 4/8 erfüllt** (unverändert seit Juni). Die vier offenen Punkte sind alle user-gebunden: #1 rein inhaltlich (~1 Seite), #3 an C1 (PageSpeed-Quota/eigener API-Key) gekoppelt, #7 + #8 an Outreach-Versand bzw. Account-Anlage.

---

## 3. SSR-Audit-Vergleich

| | Baseline 04.05. | Heute 17.09. | Δ |
|---|---|---|---|
| Helmet-Flush OK | 31 | **67** | +36 |
| Default-Fallback | 36 | **0** | −36 |
| Komplett leer | 0 | 0 | 0 |
| Doppel-Description | 0 | 0 | 0 |

**67/67 grün, 0 🔴** (live via `recheck.sh`, `audit-live.sh` weiter nicht im Mount). Regressions-Wächter grün, DoD #2 gewahrt. Snapshot: `seo-monitoring/2026-09-17-snapshot.json`.

---

## 4. GSC-Entwicklung (frisch 17.09.)

**Indexierung — verbindliche Basis „Alle eingereichten Seiten" (Redirects/kanonische Alternativen bereits raus):**
- Indexiert **74** / Nicht indexiert **16** (Gefunden – nicht indexiert 10 · Gecrawlt – nicht indexiert 6)
- **Indexierungsquote = 74 / (74 + 16 − 6 Gated-PDFs) = 74/84 = 88,1 %** → unverändert ggü. 02.09./04.09. (GSC-Bericht seit 04.09. nicht neu gecrawlt). A6-Summe (nicht-indexiert submitted) = 16.
- Kontext „Alle bekannten Seiten" (KEIN KPI): 75 indexiert / 32 nicht — davon Gecrawlt 11, **Seite mit Weiterleitung 10** (stabil, keine neue Redirect-Quelle), robots.txt 1, Gefunden 10.

**Leistung 3M (15.06.–14.09.):**
- Klicks **2.240** (+0,9 % vs. 2.220 am 14.09.; +8,2 % vs. 2.070 am 02.09.) — **Allzeithoch gehalten**
- Impressionen **187.000** (+1,1 % vs. 14.09.)
- CTR **1,2 %** · Ø-Position **8,3** (beste je gemessen)

**Top-10-Queries nach Klicks:**

| Query | Klicks | Impr. | CTR | Pos. |
|---|---|---|---|---|
| copilot in excel aktivieren | 93 | 2.593 | 3,6 % | 1,6 |
| excel copilot aktivieren | 29 | 879 | 3,3 % | 1,6 |
| copilot excel aktivieren | 21 | 578 | 3,6 % | 1,7 |
| copilot kosten | 18 | 2.498 | 0,7 % | 4,6 |
| copilot claude | 13 | 723 | 1,8 % | 6,0 |
| copilot lizenz | 11 | 1.634 | 0,7 % | 4,2 |
| copilot preise | 11 | 1.067 | 1,0 % | 5,8 |
| copilotenschule (Marke) | 11 | 24 | 45,8 % | 1,0 |
| copilot lizenz kosten | 10 | 1.093 | 0,9 % | 3,6 |
| copilot cowork kosten | 10 | 401 | 2,5 % | 11,4 |

**Schläfer (hohe Impressionen, niedrige CTR — Snippet-/Title-Hebel):** `copilot kosten` (2.498 Impr., 0,7 % CTR, Pos. 4,6), `copilot lizenz` (1.634 Impr., 0,7 %, Pos. 4,2), `copilot preise` (1.067 Impr., 1,0 %, Pos. 5,8). Der gesamte Kosten-/Lizenz-Cluster liegt auf Pos. 4–6 mit <1 % CTR → die Lizenz-Seite rankt gut, aber das Snippet zieht keine Klicks. Das ist derselbe Befund wie die „Bremse" unten und der unverpushte Snippet-Draft vom 12.08.

---

## 5. AlwaysData-Wachstum (frisch 17.09.)

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
| **September (MTD, Tag 17)** | **11.870** | −34,57 % (MTD-Artefakt) |
| **YTD Jan–Sep** | **97.350** | — |

September steht bei Tag 17 auf 11.870 → Hochrechnung **~21.000** (11.870 / 17 × 30). Damit läuft September auf Juli-Niveau zu und liegt über August — das MTD-Minus ist rein ein Unvollständigkeits-Artefakt, kein Einbruch. 24h-Wert heute: 829. Hinweis: Der Wert enthält seit Kampagnen-Start Paid-/Outbound-Anteile — da beide aktuell eingeschlafen sind (siehe §6), ist das September-Wachstum praktisch rein organisch.

---

## 6. Traffic-Mix Organic / SEA / Outbound + Kampagnen-Wirkung (frisch, Clarity 30T)

**Referrer-Segmentierung (30T, 3.032 Sitzungen):**

| Segment | Sessions (30T) | Quelle |
|---|---|---|
| **Organic Search** | **~1.888** | Google 1.315 · Bing 451 · DuckDuckGo 56 · Ecosia 42 · google.de 13 · Yahoo 11 |
| **LLM / AI** | **~143** | teams.public.onecdn 88 · chatgpt.com 33 · copilot.microsoft.com 13 · claude.ai 9 |
| **Referral** | ~168 | copilotenschule.de intern 146 · yellow-boat.com 22 |
| **SEA (cpc)** | **~0** | kein gclid/googleads im Top-Referrer-Fenster → **eingeschlafen** |
| **Outbound (email)** | **~0** | kein Email-Kanal, `sml_landing_page_visit` nur 2 → **eingeschlafen** |
| Direct / Rest | Restmenge | Referrer null |

**SEA-Wirkung:** Im gesamten 30T-Fenster kein messbarer cpc-Traffic — die Google-Ads-Kampagne ist gedrosselt/pausiert (konsistent mit dem 07.–14.09.-Trend). Kein cpc-Traffic auf `/wissen/`-Artikeln → falls Ads wieder anlaufen, ist der Zielseiten-Drift-Check weiter zu fahren.
**Outbound-Wirkung:** Die LP `/sml/hr-tipps_2026` erzeugt praktisch keine Sessions (`sml_landing_page_visit` 2/30T), 0 `sml_*`-Conversions über die gesamte Laufzeit. **Die Outbound-Entscheidung (überarbeiten oder einstellen) ist überfällig** — sie steht seit dem 12.08.-Review offen.
**Synergie-Check:** Der Kosten-/Lizenz-/Preis-Cluster ist gleichzeitig ein starker organischer Schläfer (§4) — genau die Begriffe, die eine Preis-SEA bespielen würde. Da SEA schläft, trägt die organische Lizenz-Seite den Preis-Intent allein; die GEO-Preislücke (§9) verschärft das.

---

## 7. Clarity-Conversion-Analyse (frisch, Dashboard 30T)

**Standard-Metriken 30T:** Sitzungen **3.032** (500 Bots ausgeschlossen), Unique **2.850**, Neue Nutzer **96,8 %**, Seiten/Sitzung **1,22**, Scrolltiefe **39,87 %**, aktive Zeit **1,7 Min / 4,1 Min**. Frustration: **Tote Klicks 13,85 %** (420 Sess.), Rage 0,36 % (11), Quick-Back 1,78 % (54), Excessive-Scroll 0 %.
**Standard-Metriken 3T (API-Refresh):** Sessions 452 (84 Bots), Dead-Click 13,72 %, Edge ~48 %, PC ~87 %, DACH ~83 %+, Top-Page `/` (75). → Dead-Click liegt im bekannten organischen ArticlePopup-Zickzack, leicht unter dem 14.09.-Ausschlag (18,1 %), kein neuer Issue.
**B2B-Profil bestätigt:** Edge **47,5 %** (1.440 Sess.) + Chrome 30,6 %, PC-dominiert, DACH — die Zielgruppe (Entscheider in Unternehmen) stimmt.
**Core Web Vitals (Clarity):** Leistungsscore **83/100** (69 % gut) · LCP 2,2 s (gut) · **INP 220 ms (muss verbessert werden)** · CLS 0 (gut). INP ist der einzige gelbe CWV-Punkt.

**Conversion-Events (Smart Events + Custom Tags, 30T):**

| Event | Sessions |
|---|---|
| Ausgehender Klick | 31 |
| Formular absenden | 24 |
| Kontaktieren Sie uns | 20 |
| danke_page_view | 20 |
| pdf_download | 16 |
| Herunterladen | 14 |
| lead | 13 |
| booking_click | 10 |
| Bestellung erfolgreich | 4 |
| angebot_bruecke_click (content_cta_click) | 4 |
| Zitat anfordern / mail_click / contact_form_submit / sml_landing_page_visit / roi_generator_ppt_success | je 2 |
| phone_click / konfigurator_submit / trainer_application_submit / Standort suchen | je 1 |

**Conversion-Rate gesamt (30T):** Der definierte Lead-Funnel konvertiert **0 %** (siehe unten). Kontakt-Signale finden aber statt — Formular absenden 24, Kontaktieren Sie uns 20, lead 13. Als grobe Kontakt-Conversion-Proxy: ~1,9 % (57 überlappende Lead-Signale / 3.032); konservativ (nur echte Formular-Submits 24) ~0,8 %. Da SEA/Outbound schlafen, sind praktisch alle Conversions organisch. Kein 7e-Defekt (kein Event ≥3 → 0).

**Top-3 „Goldene Pages"** (GSC-Top × Clarity-Top-Einstieg × Conversion-Nähe):
1. `/wissen/microsoft-copilot-lizenzen` — Clarity-Einstieg #2 (303) + gesamter Kosten-/Lizenz-Cluster in GSC-Top-Queries
2. `/wissen/claude-in-microsoft-copilot` — Clarity-Einstieg #5 (210) + GSC „copilot claude" (13 Klicks, Pos. 6,0)
3. `/wissen/copilot-in-outlook-nutzen-tipps` — Clarity-Einstieg #3 (225), starke On-Site-Bindung

**Top-3 „Bremsen"** (viel Sichtbarkeit, schwache Wirkung):
1. `/wissen/microsoft-copilot-lizenzen` (Kosten-Cluster) — Pos. 4–6, CTR <1 %; Snippet-Fix-Draft seit 12.08. unverpusst → hebt Klicks nicht
2. `/wissen/copilot-in-excel-aktivieren` — GSC-#1-Klick-Bringer (93 Klicks), aber Clarity-Einstieg nur #7 (146) mit schwacher Weiterbindung → viel Traffic, wenig Reise
3. Gesamter Funnel Content → Angebot (siehe unten)

**Funnel „Lead-Reise: SEO → Angebot → Kontakt" (30T, segmentiert = praktisch rein organisch):**

| Stufe | Sessions | Anteil | Drop |
|---|---|---|---|
| 1. Wissens-Artikel besucht (SEO-Einstieg) | 1.814 | 59,83 % der 3.032 | — |
| 2. Angebot angeschaut (Trainings/Konfigurator) | 11 | **0,61 %** | −99,39 % |
| 3. Kontakt-Anfrage (Lead) | 0 | **0 %** | −100 % |

**Der Bruch sitzt zwischen Stufe 1 und 2**: 1.814 Leser, aber nur 11 klicken vom Artikel weiter zum Angebot. Die Angebots-CTA-Brücke (`angebot_bruecke_click`) feuert nur **4×/30T** — sie ist live, aber praktisch unsichtbar/ungeklickt. Kontakte entstehen (24 Formular-Submits), aber **nicht über den Content→Angebot-Pfad**, sondern direkt über Startseite/Trainings/Kontakt. Der Wissens-Content bringt Reichweite und Autorität, aber speist den Angebots-Funnel nicht.

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

- **Goldene Pages** (GSC-Top + hoher Clarity-Einstieg, rein organisch): `microsoft-copilot-lizenzen`, `claude-in-microsoft-copilot`, `copilot-in-outlook-nutzen-tipps` — Investition wert (interne Verlinkung, CTA-Platzierung).
- **Bremsen** (GSC-Top, aber schwache Wirkung): `microsoft-copilot-lizenzen` Kosten-Cluster (Snippet zieht keine Klicks trotz Pos. 4) und `copilot-in-excel-aktivieren` (viel Traffic, kaum Weiterreise) — erste Optimierungs-Priorität.
- **Direkt-/LLM-Aufrufe:** AlwaysData ~21k Pace vs. Clarity 3.032 gemessene Sessions — die Differenz ist Bot-/Direct-/LLM-Traffic. LLM messbar über `teams.public.onecdn` (88), ChatGPT (33), copilot.microsoft (13), claude.ai (9) = ~143 identifizierbare AI-Referrer/30T → GEO zahlt weiter ein (DoD #4 untermauert).

---

## 9. LLM-Sichtbarkeit (frisch, Websuche)

- **Wettbewerbs-Snapshot** „Microsoft Copilot Schulungsanbieter Deutschland 2026": copilotenschule.de **#1** über den eigenen Vergleichs-Hub `copilot-schulungsanbieter-deutschland-vergleich`. Wettbewerber-Feld: malter365, medienreich, it-schulungen.com, Microsoft (offiziell), GFU, Haufe/skill it, promptingbirds. **Kein neuer Player, kein Ranking-Verlust.**
- **Preisfragen-Test** „Was kostet eine Microsoft Copilot Schulung": Die eigene **Lizenz-Seite wird prominent als Quelle zitiert** (Lizenzkosten). Wettbewerber-Schulungspreise sind sichtbar (it-schulungen 695–1.395 €). **Der eigene Trainings-/Schulungspreis wird weiterhin NICHT mit konkretem Wert zitiert** → die GEO-Preislücke besteht unverändert fort. Empfehlung: konkrete Trainingspreise in `llms.txt` und auf der Trainingsseite zitierbar machen (öffentlich seit August).

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins**
1. Organik-Allzeithoch gehalten — 2.240 Klicks / Pos. 8,3, beste je gemessene Position.
2. Wettbewerbs-Platz-1 + LLM-Zitierbarkeit der Lizenz-Seite bestätigt (DoD #4, #6).
3. SSR 67/67, CWV-Score 83/100, B2B-Profil (Edge 47,5 %, DACH) sauber — technisches Fundament stabil.

**Probleme**
1. **Funnel Content → Angebot 0,61 % → 0 % E2E** — der teuerste Dauerbefund; CTA-Brücke feuert nur 4×/30T.
2. **SEA + Outbound beide eingeschlafen** — kein cpc, keine Outbound-Sessions; Entscheidung überfällig.
3. **Indexierung bei 88,1 % eingefroren** (GSC seit 04.09. nicht neu gecrawlt) + Kosten-Cluster-CTR <1 % (Snippet-Draft unverpusst).

---

## 11. Konkrete Empfehlungen (5, mit Aufwand + Erfolgs-KPI)

| # | Was | Warum | Aufwand | Erfolgs-KPI |
|---|---|---|---|---|
| 1 | **Lizenz-Snippet-Draft (12.08.) pushen** + 2. CTA-Touchpoint | Kosten-/Lizenz-/Preis-Cluster: hohe Impr., CTR <1 % bei Pos. 4–6 | S (Draft fertig, nur Push) | CTR Kosten-Cluster 0,7 % → ≥ 1,5 % |
| 2 | **Angebots-CTA-Brücke prominenter** auf den 3 Goldenen Pages (über der Falz, nicht nur Fließtext) | Funnel Stufe 1→2 = 0,61 %, Brücke feuert nur 4×/30T | M | `angebot_bruecke_click` 4 → ≥ 20/30T; Stufe 2 > 2 % |
| 3 | **Outbound-Entscheidung treffen** (LP `/sml` überarbeiten oder abschalten) | 0 Sessions, 0 Conv. über gesamte Laufzeit — bindet nur Tracking-Rauschen | S (Entscheidung) | Klarheit: Kanal aktiv mit Conv. **oder** sauber beendet |
| 4 | **Trainingspreis LLM-zitierbar machen** (llms.txt + Trainingsseite, konkrete Werte) | GEO-Preislücke: LLMs zitieren Lizenz-, aber nicht Trainingspreis | S–M | Preisfragen-Test nennt eigenen Trainingspreis mit Quelle |
| 5 | **ArticlePopup-Dead-Click-Fix (17.06.) pushen** | Dead-Click 13,85 % dauerhaft > 10 %, organischer ArticlePopup-Treiber | S (Draft fertig) | Dead-Click < 10 % im 30T-Schnitt |

Alle fünf sind **user-gebunden** (Push bzw. Entscheidung) — der Conductor/Cron kann sie regelkonform nicht selbst ausführen. Seit dem 02.09. wurde keines der Deliverables umgesetzt.

---

## 12. Risiken (max. 3, mit Mitigation)

1. **Indexierung kippt unter Ziel, falls Redirect-Quellen wachsen** — „Seite mit Weiterleitung" stabil bei 10; Mitigation: Weekly-Audit trackt, bei Anstieg Redirect-Quelle außerhalb der Sitemap prüfen.
2. **Einseitige Kanalabhängigkeit** — nach SEA-/Outbound-Ausfall trägt Organik ~100 %; ein Google-Core-Update träfe voll. Mitigation: LLM-Kanal (143/30T) ausbauen, Off-Page (D1–D5) endlich anstoßen.
3. **Backlog-Stau** — 5 fertige Drafts/Entscheidungen liegen seit Wochen (Snippet, CTA, Dead-Click, Outbound, Preis-GEO). Mitigation: eine fokussierte User-Session, die die S-Aufwand-Punkte 1/3/5 in einem Rutsch pusht.

---

## 13. Anhang: Neue Clarity-Insights des Monats

- **Pattern (bestätigt):** B2B-Profil hart — Edge 47,5 % + PC-dominiert + DACH ~83–94 % über alle Fenster. Zielgruppen-Verifikation grün.
- **Anti-Pattern (bestätigt):** Funnel-Bruch Stufe 1→2 strukturell (0,61 %), CTA-Brücke sichtbar, aber ungeklickt (4×/30T) → Platzierung, nicht Existenz, ist das Problem.
- **Trend:** LLM-Referrer verstetigt sich als eigener Kanal (teams.onecdn führend mit 88, dann ChatGPT 33) — ~143/30T, GEO zahlt ein.
- **Beobachtung:** INP 220 ms als einziger gelber CWV-Wert — Kandidat für spätere technische Optimierung, kein akutes Risiko.

---

*Erstellt im User-angeforderten Zusatzlauf 17.09.2026. Keine Code-Pushes, keine neuen Crons. Nächster regulärer voller Monatsreview: Mi 14.10.2026.*
