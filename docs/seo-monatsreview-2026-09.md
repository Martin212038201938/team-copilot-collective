# SEO-Monatsreview copilotenschule.de — September 2026

**Erstellt:** 02.09.2026 (Cron `copilotenschule-seo-monthly-review`, autonom)
**Phase:** Phase 3 — Content-Block (aktiv seit 01.06., kein Wechsel). Phase 4 (Off-Page) parallel offen.
**Definition-of-Done-Score:** 4 von 8 — mit #1 (Indexierung) erstmals an der Ziel­schwelle.

> **Datenhinweis:** Dieser Lauf ist ein autonomer Cron ohne interaktiven Zugang. GSC-, AlwaysData- und Clarity-Dashboard-Werte stammen aus dem heute (02.09.) durchgeführten Weekly-Audit, das denselben Datenstand mit Chrome-Zugang erhoben hat; die Clarity-Standard-Metriken wurden zusätzlich per API frisch gezogen (Call 3/10). `outputs/audit-live.sh` liegt weiterhin nicht im Mount → SSR über den `seo-monitoring/recheck.sh`-Workaround. Interaktive ChatGPT-/Perplexity-Preisabfragen sind im Cron nur eingeschränkt prüfbar (siehe §9). Fehlende Punkte sind explizit als solche benannt.

---

## 1. Executive Summary

Der organische Kern läuft ungebremst auf Rekordkurs: GSC steht im 3-Monats-Fenster bei **2.070 Klicks / 169.000 Impressionen / Position 8,4** — alle drei absolute Projekt-Höchststände, +6,7 % Klicks und +9 % Impressionen gegenüber dem 24.08.-Snapshot und die beste je gemessene Durchschnittsposition. Die Indexierung auf der verbindlichen bereinigten Basis erreicht mit **89,3 % (75/84)** praktisch das 90-%-Ziel; A6 wirkt weiter (Summe nicht-indexierter eingereichter Seiten von 19 auf **15** gesunken, Restweg rechnerisch eine einzige Seite). Der LLM-Kanal springt mit **AIPlatform 7 → 17 Sessions/7T (+143 % W/W)** an, im Wettbewerbscheck hält copilotenschule.de **Platz 1** unter den spezialisierten Anbietern. Dem stehen zwei strukturelle Dauerbefunde gegenüber: Der Funnel Content→Angebot bleibt bei **~0 % End-to-End** (die CTA-Brücke feuert erst 2×/7T), und die Outbound-Mailkampagne ist mit **~0 Sessions und 0 Conversions eingeschlafen** (−70 % M/M im Vormonat, jetzt praktisch bei null). DoD-Score bleibt bei 4/8, wobei #1 erstmals an der Schwelle kippt.

---

## 2. Definition-of-Done-Tabelle

| # | Kriterium | Ziel | Aktuell | Abstand | Trend |
|---|---|---|---|---|---|
| 1 | Indexierungsquote (GSC, bereinigte Basis) | ≥ 90 % | **89,3 %** (75/84) | −0,7 pp (≈ 1 Seite) | ▲ 85,1 → 89,3 % (+4,2 pp) |
| 2 | SSR „vollständig kaputt" 🔴 | ≤ 5 URLs | **0 🔴** (67/67) | ✅ erfüllt | ► stabil |
| 3 | SEO-Score (Health Check) | ≥ 75 | **42** (eingefroren) | −33 | ► blockiert (C1: PageSpeed-Modul seit 27.05. deaktiviert) |
| 4 | GEO-Score | ≥ 80 | **82** + LLM-Traffic ▲ | ✅ erfüllt | ▲ AIPlatform +143 % W/W |
| 5 | Top-Klick-Bringer ≥ 5 URLs | ≥ 5 | **6 URLs** | ✅ wahrscheinlich | ► gehalten |
| 6 | Strategie-Query in Top 3 | Top 3 | Wettbewerbscheck **Platz 1** | ✅ wahrscheinlich | ► gehalten |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** (Drafts nicht versendet) | offen | ► unverändert |
| 8 | ProvenExpert ≥ 15 Bewertungen | ≥ 15 | **0** (Profil nicht angelegt) | offen | ► unverändert |

**Score: 4/8 fest** (#2, #4 hart; #5, #6 wahrscheinlich). #1 steht mit 89,3 % erstmals unmittelbar vor der Schwelle — kippt der nächste GSC-Crawl über 90 %, wird daraus 5/8. #3 ist der einzige technisch geblockte Punkt (PageSpeed-API-Quota, C1).

---

## 3. SSR-Audit-Vergleich (Anfang vs. heute)

| Zeitpunkt | ✅ | 🟡 | 🔴 | Quelle |
|---|---|---|---|---|
| 27.05.2026 (Baseline) | 31 | 2 | 38 | `docs/seo-audit-2026-05-27.md` |
| **02.09.2026 (heute)** | **67** | **0** | **0** | `recheck.sh`-Workaround (audit-live.sh nicht im Mount) |

DoD #2 seit 15./16.06. dauerhaft erfüllt und live verifiziert. Regressions-Wächter grün (0 🔴, weit unter Eskalationsschwelle 5). Der Pre-Render-Komplex (Phasen 1/2/2b) ist historisch abgeschlossen und wird nicht wieder geöffnet.

---

## 4. GSC-Entwicklung

**Leistung (3-Monats-Fenster, Rekord):**

| Metrik | 12.08. | 24.08. | **02.09.** | Δ (24.08.→02.09.) |
|---|---|---|---|---|
| Klicks | 1.660 | 1.940 | **2.070** | +6,7 % |
| Impressionen | 134.000 | 155.000 | **169.000** | +9,0 % |
| CTR | 1,2 % | 1,2 % | 1,2 % | ► |
| Ø Position | 8,8 | 8,5 | **8,4** | ▲ beste je |

*28-Tage-Fenster in diesem Cron-Lauf nicht separat abgegriffen (Weekly-Audit erhob den 3M-Wert); Referenz 26.08.-Review: 28T ≈ 719 Klicks / 58.100 Impr. / Pos. 8,2.*

**Indexierung (bereinigte Basis „Alle eingereichten Seiten" − 6 Gated-PDFs, GSC-Stand 28.08.):**

- **75 / 84 = 89,3 %** — bester Wert je, +4,2 pp seit dem 24.08.-Wert (85,1 %).
- Nicht indexiert (eingereicht): „gefunden" 11 + „gecrawlt" 4 = **A6-Summe 15** (−4 vs. 19 am 24.08.) → A6 wirkt weiter, der Restweg zu 90 % ist rein inhaltlich und beträgt rechnerisch **eine Seite**.
- 4-Wochen-Trend (bereinigte Basis): 83,9 % (20.08.) → 85,1 % (24.08.) → **89,3 %** (28.08.). Kontinuierlich steigend.
- Kontext „Alle bekannten Seiten" (**KEIN KPI**): 76 indexiert / 35 nicht; „Seite mit Weiterleitung" stabil bei 10 (kein Alarm — keine Redirect-Quelle außerhalb der Sitemap), robots-blockiert 1.

> **Fußnote Messbasis-Bruch (einmalig):** Werte vor dem 20.08.2026 im Status-Log beziehen sich auf die alte Basis „Alle bekannten Seiten" und sind mit der aktuellen bereinigten Quote **nicht** direkt vergleichbar (Details: `seo-projektplan.md`, „Messvorschrift DoD #1").

**Top-Klick-Bringer (Query, 3M, Stand 02.09.):** copilot in excel aktivieren 86 · excel copilot aktivieren 28 · copilot excel aktivieren 20 · copilot kosten 16 · copilot lizenz 11.
**Top-Klick-Bringer (URL, 24.08.-Snapshot):** microsoft-copilot-lizenzen 287 · claude-in-microsoft-copilot 280 · copilot-in-excel-aktivieren 246 · ki-halluzinationen-vermeiden 193 · copilot-cowork-abrechnung-copilot-credits 141 · copilot-in-outlook-nutzen-tipps 130 → **6 verschiedene URLs** (DoD #5).
**Strategic Keywords (config.json):** Der „excel aktivieren"-Cluster dominiert die Klick-Bringer, ist aber informational. Von den vier strategischen Ziel-Keywords taucht der Kosten-/Lizenz-Cluster („copilot kosten" 16, „copilot lizenz" 11) inzwischen in der Klick-Bringer-Liste auf — transaktionsnäher und SEA-synergetisch (siehe §6).

---

## 5. AlwaysData-Wachstum

| Zeitraum | Visits | Bemerkung |
|---|---|---|
| Juli 2026 (final) | 22.503 | Rekordmonat (inkl. Paid/Outbound-Peak) |
| **August 2026 (final)** | **18.142** | **−19,38 % vs. Juli** |
| September MTD (Tag 2) | 1.019 | unvollständig |
| YTD Jan–Aug 2026 | ≈ **86.454** | (Jan–Jul 68.312 + Aug 18.142) |

**Einordnung (segmentiert):** Der August-Rückgang ist **kein Organik-Einbruch** — GSC zeigt zeitgleich Allzeit-Rekord. Er erklärt sich fast vollständig aus dem Rückzug der bezahlten/Outbound-Kanäle: Die Outbound-Mailkampagne ist von ~20 auf ~0 Sessions/30T eingebrochen, und der Juli-Wert war durch den Kampagnen-Peak künstlich überhöht. Der organische Kern trägt weiter und wächst (§4). Für den Wachstums-Vergleich mit Vor-Kampagnen-Zeiträumen gilt daher: **organisch = Rekord, Gesamt-Visits fallen durch Paid/Outbound-Pullback.**

---

## 6. Traffic-Mix Organic / SEA / Outbound + SEA-/Outbound-Wirkung

**Traffic-Mix 7T (Clarity-Kanal, Stand 02.09.):**

| Kanal | Sessions/7T | Anteil |
|---|---|---|
| Organic | **313** | ~57 % |
| SEA (cpc) | **50** | ~9 % |
| Outbound (email) | **~0** | ~0 % (eingeschlafen) |
| Direct/Rest | ~176 | ~34 % |
| — davon AIPlatform/LLM | **17** | (+143 % W/W) |

*30-Tage-Kanal-Split benötigt das Clarity-Dashboard (in diesem Cron nicht interaktiv abrufbar). Letzte vollständige 30T-Referenz (26.08.): Organic 1.623 · cpc 186 · Referral 156 · Direct 89 · AIPlatform 60 · Email 20 · Other 716. Wochen-Aggregat aus den letzten Weekly-Audits: Organic 370 (24.08.) → 313 (02.09.); cpc 46 → 50; email 2 → ~0.*

**SEA-Wirkung:**
- cpc hält sich stabil bei ~50 Sessions/7T. Zielseiten-Drift-Check historisch sauber (0 cpc-Sessions auf `/wissen/`-Artikeln — cpc landet korrekt auf Trainings/Konfigurator/LPs).
- Eine saubere Isolierung der cpc-Conversion-Rate erfordert das Dashboard-Segment und war in diesem Lauf nicht abgreifbar → **als offener Datenpunkt benannt**, nächster interaktiver Review liefert ihn.

**Outbound-Wirkung:**
- LP `/sml/hr-tipps_2026`: Sessions praktisch **0**, `sml_*`-Events **0**. Die Kampagne ist seit >4 Wochen faktisch inaktiv und hat über ihre gesamte Laufzeit **0 Conversions** produziert. → Klare Entscheidung überfällig (überarbeiten vs. stoppen, siehe §11).

**Synergie-Check (SEA als SEO-Recherchequelle):** Die SEA-relevanten Kosten-/Lizenz-Keywords („copilot kosten", „copilot lizenz") tauchen jetzt **auch als organische GSC-Klick-Bringer** auf. Das ist ein doppelter Hebel: Dieselben transaktionsnahen Queries, für die SEA zahlt, gewinnen organisch an Sichtbarkeit — die Snippet-/CTR-Optimierung der Seite `microsoft-copilot-lizenzen` (Draft seit 12.08. vorhanden) zahlt damit auf beide Kanäle gleichzeitig ein.

---

## 7. Clarity-Conversion-Analyse

**Standard-Metriken (3T API, Stand 02.09., Call 3/10):** Sessions 314 (53 Bots, 359 Unique) · Scrolltiefe 37,0 % · aktive Zeit 76 s · Dead-Click **14,33 %** · Rage 0,32 % · Quick-Back 1,59 % · Excessive-Scroll 0 % · Script-Errors 0. Geräte: PC 245 (78 %), Mobile 67, Tablet 3. Länder: Deutschland 272 (87 %), Österreich 18, Schweiz 16 → klare DACH-/B2B-Konzentration. Browser: **Edge 146 (~46 %)**, Chrome 79, MobileSafari 34 — der hohe Edge-Anteil ist ein starkes B2B-/Firmen-Client-Signal.

**Conversion-Events (7T, Chrome Smart Events + Custom Tags):**

| Event | 7T |
|---|---|
| contact_form_submit | 1 |
| konfigurator_submit | 1 |
| phone_click | 1 |
| pdf_download | 1 |
| mail_click | 0 |
| trainer_application_submit | 0 |
| angebot_bruecke_click (CTA-Brücke) | **2** (↑ von 1) |
| sml_* (Outbound) | 0 |

Kontakt-nahe Smart Events (7T): danke_page_view 6 · Formular absenden 3 · Kontaktieren Sie uns 3 · Herunterladen 3 · Ausgehender Klick 3 · lead 1 · Zitat anfordern 1 · Bestellung erfolgreich 1 · booking_click 1.
**Conversion-Rate gesamt: ≈ 14 / 525 = ~2,7 %** (stabil; kein 7e-Defekt — kein Event mit falschem 0-Wert, „Formular absenden" 3, nicht 0).

**Top-3 Goldene Pages (GSC-Top × Clarity-Top, organic):**
1. `microsoft-copilot-lizenzen` — Clarity 61 Visits, GSC-Kosten/Lizenz-Cluster-Dauergewinner.
2. `claude-in-microsoft-copilot` — Clarity 37, GSC-Top-Klick-URL (280/3M).
3. `copilot-in-outlook-nutzen-tipps` — Clarity 29, GSC 130/3M.

**Top-3 Bremsen (viel Traffic, wenig Anschluss):**
1. `microsoft-copilot-lizenzen` — höchster Traffic, aber Kosten-Cluster-CTR nur ~0,6 % → Snippet-/Title-Problem (Fix-Draft `docs/drafts/protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md` liegt fertig, unverpusst).
2. `copilot-in-excel-aktivieren` — GSC-**#1**-Klick-Bringer (86/3M), aber schwache Clarity-Präsenz (10 Visits) und rein informational, kein Angebots-Anschluss.
3. `claude-in-microsoft-copilot` — hoher GSC-/Clarity-Traffic, aber keine erkennbare Angebots-Conversion.

**Funnel „Lead-Reise" 7T (segmentiert, organic-dominiert):**

| Stufe | Definition | 7T | Rate |
|---|---|---|---|
| 1 Page-View | Content-Artikel (Lizenzen 61 + Claude 37 + Outlook 29 + Tipps 18 + Excel 10 …) | ~250+ | 100 % |
| 2 Angebot | /trainings 19 + Konfigurator 10 | ~29 | ~11 % |
| 3 Kontakt-Klick | phone 1 + pdf 1 + mail 0 + CTA-Brücke 2 | ~4 | ~14 % v. St. 2 |
| 4 Form-Submit | contact 1 + konfigurator 1 | 2 | ~0 % E2E |

**Bruchstelle unverändert Stufe 1 → 2:** Content-Leser springen kaum ins Angebot. Die CTA-Brücke feuert mit 2×/7T (Verdopplung ggü. Vorwoche), ist aber noch weit von Funnel-Relevanz entfernt. Segmentierung: Der Funnel ist organik-getrieben; cpc/email tragen kaum bei (email ~0).

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

- **Goldene Pages (Investition wert):** `microsoft-copilot-lizenzen` (GSC-Top + Clarity-Top 61) ist der klare Dauergewinner. `claude-in-microsoft-copilot` und `copilot-in-outlook-nutzen-tipps` folgen — alle drei GSC-stark **und** on-site frequentiert.
- **Bremsen (erste Optimierungspriorität):** `microsoft-copilot-lizenzen` ist paradox zugleich Goldene Page **und** Bremse — maximaler Traffic trifft auf minimale Kosten-Cluster-CTR (~0,6 %). Der fertige Snippet-Fix-Draft ist der hebelstärkste ungenutzte Punkt im Projekt. `copilot-in-excel-aktivieren` liefert die meisten GSC-Klicks, aber die schwächste On-Site-Bindung → Kandidat für einen additiven Angebots-Anschluss.
- **Direkt-/Fremd-Aufrufe (LLM/GEO):** Der Anstieg AIPlatform 7 → 17/7T plus `claude.ai`-Referrer (3) und die stabile Wettbewerbs-Platz-1-Position deuten auf wachsende LLM-Citations. AlwaysData-Gesamtvisits fallen (Paid/Outbound-Pullback), während GSC + LLM-Kanal steigen — die Verschiebung geht klar Richtung organisch + generativ.

---

## 9. LLM-Sichtbarkeit-Trend

- **Wettbewerbs-Snapshot (WebSearch, „Microsoft Copilot Schulungsanbieter Deutschland 2026"):** Top-Feld unverändert — medienreich, it-schulungen.com, gfu.net, promptingbirds.com; copilotenschule.de ist mit Startseite **und** Vergleichs-Hub-Artikel präsent und hält **Platz 1 unter den spezialisierten Anbietern**. Neu am Rand aufgetaucht: `m365-kurs.de`. Keine Verschiebung ggü. Strategie-Papier.
- **LLM-Traffic (Clarity-Proxy):** AIPlatform-Kanal 7 → **17 Sessions/7T (+143 % W/W)**, `claude.ai` als Referrer messbar → GEO zahlt weiter ein (untermauert DoD #4).
- **Preisfragen-Test (seit 20.08. gefordert):** Autonom im Cron nur eingeschränkt prüfbar (kein interaktiver ChatGPT-/Perplexity-Zugang). WebSearch-Befund unverändert zum Vormonat: Bei „Was kostet eine Copilot-Schulung?" nennen Suchergebnisse/LLM-Quellen für **it-schulungen.com** (ab 695 €) und **m365-kurs.de** (ab 2,20 €/User/Monat) konkrete Preise, für **copilotenschule.de** wird explizit vermerkt, dass **keine festen Preise** auf der Website stehen. Der Microsoft-Lizenzpreis (15,60–26 €) erscheint zwar im Titel des Lizenz-Artikels, ist aber die Lizenz-, nicht die Trainings­kostenangabe. → **Zitierbarkeits-Lücke besteht fort** (Empfehlung §11.3).
- **Trend ggü. Vormonat:** LLM-Sichtbarkeit **gehalten bis leicht steigend** (Traffic-Kanal deutlich hoch, Wettbewerbsposition stabil).

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins**
1. **GSC-Organik-Allzeithoch** — 2.070 Klicks / 169.000 Impr. / Pos. 8,4 (3M), alle drei Rekorde, ohne jeden Eingriff.
2. **Indexierung an der Zielschwelle** — 89,3 % bereinigt (A6-Summe 15, −4), 90 % rechnerisch eine Seite entfernt.
3. **LLM-Kanal zieht an** — AIPlatform +143 % W/W, Wettbewerbs-Platz-1 gehalten.

**Probleme**
1. **Funnel Content→Angebot ~0 % E2E** — der teuerste strukturelle Dauerbefund; CTA-Brücke feuert erst 2×/7T.
2. **Outbound eingebrochen** — /sml-LP ~0 Sessions, 0 Conversions über die gesamte Laufzeit; Entscheidung überfällig.
3. **DoD #3 blockiert** — SEO-Score eingefroren bei 42, weil das PageSpeed-Modul seit 27.05. deaktiviert ist (C1, User-Setup nötig).

---

## 11. Konkrete Empfehlungen (5)

1. **Lizenz-Snippet-Draft pushen** — *Was:* `docs/drafts/protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md` (Title/Meta/Kosten-Sektion) live schalten. *Warum:* höchster Traffic × niedrigste CTR (~0,6 %) + SEA-Synergie auf denselben Kosten-Keywords. *Aufwand:* 0,5 h (Review + Push). *KPI:* CTR `microsoft-copilot-lizenzen` > 1 %.
2. **Outbound-Entscheidung treffen** — *Was:* LP-CTA `/sml/hr-tipps_2026` überarbeiten **oder** Kampagne sauber stoppen. *Warum:* 0 Conversions über die Laufzeit, verwässert den Traffic-Mix. *Aufwand:* 1 h Entscheidung. *KPI:* `sml_*`-Events > 0 **oder** dokumentierter Stopp.
3. **LLM-Preis-Zitierbarkeit schaffen** — *Was:* klar zitierbare Trainings-Preisspanne in `llms.txt` + Vergleichsartikel. *Warum:* Wettbewerber werden mit konkretem Preis zitiert, copilotenschule.de nicht. *Aufwand:* 1 h. *KPI:* Copilotenschule mit Preis in ChatGPT/Perplexity-Antwort (nächster interaktiver Review).
4. **C1 PageSpeed-Key einrichten** — *Was:* eigener PageSpeed-API-Key + reduzierte Frequenz (`docs/drafts/c1-c2-technik-2026-07-09.md`). *Warum:* DoD #3 ist ohne CWV-Scores dauerhaft unmessbar. *Aufwand:* 1 h User-Setup. *KPI:* SEO-Score erscheint wieder im Health-Check.
5. **Zweiten CTA-Touchpoint pushen** — *Was:* fehlenden `<TrainingCTA>` vor dem FAQ-Block auf `CopilotLicenses.tsx` + `CopilotTippsTricks.tsx` (`docs/drafts/pattern-transfer-goldene-pages-2026-08-26.md`). *Warum:* Funnel-Stufe 1→2 verstärken, wo der Traffic sitzt. *Aufwand:* 0,5 h. *KPI:* `angebot_bruecke_click` > 5/7T.

---

## 12. Risiken (max. 3, mit Mitigation)

1. **Teams-Reporting-Webhook 401 seit 03.08. (30 Tage)** — Weekly-/Monatsreview-Posts scheitern beim Versand (Audit läuft vollständig durch, Reporting ist additiv). *Mitigation:* User legt in Teams → Workflows-App die Vorlage „Beim Empfang einer Webhook-Anfrage in einem Kanal posten" für Kanal „Marketing und SEA" neu an und trägt die URL als `TEAMS_WEBHOOK_MARKETING_SEA=` in `website-health-check/.env` ein.
2. **Funnel-Bruch strukturell** — Content konvertiert nicht in Angebots-Kontakte; CTA-Brücke noch unter Funnel-Relevanz. *Mitigation:* Empfehlungen 1 + 5 (Snippet + 2. Touchpoint) pushen, Wirkung 4 Wochen im Weekly-Audit tracken.
3. **Dead-Click 14,33 % > 10 %** — bekanntes organisches ArticlePopup-Muster. *Mitigation:* Fix-Draft (lucide-x + backdrop-blur, seit 17.06.) pushen; kein neuer Cron (user-gebunden).

---

## 13. Anhang: Neue Clarity-Insights des Monats

- **Trend:** AIPlatform/LLM-Kanal +143 % W/W (7 → 17/7T) + Edge-Browser-Anteil ~46 % → verfestigtes B2B-/GEO-Signal. (Eintrag in `clarity-insights.md` fortgeschrieben.)
- **Pattern (Bremse↔Goldene Page):** `microsoft-copilot-lizenzen` ist zugleich Top-Traffic-Page und CTR-Bremse (~0,6 % im Kosten-Cluster) — höchster ungenutzter Snippet-Hebel; Fix-Draft liegt seit 12.08. fertig.
- **Anti-Pattern:** Dead-Click stabil ~14 % (organisches ArticlePopup), unter der Anti-Pattern-Cron-Schwelle „≥100 Sess/3T & <0,5 % Conv" auf Einzelseiten-Ebene → kein neuer Cron, Fix bleibt user-gebundener Push.

---

*Erstellt automatisch vom Cron `copilotenschule-seo-monthly-review` am 02.09.2026. Keine Code-Pushes. Fehlende/eingeschränkte Datenpunkte explizit benannt (28T-GSC separat nicht abgegriffen; 30T-Clarity-Kanal-Split dashboard-gebunden; cpc-Conversion-Isolierung dashboard-gebunden; LLM-Preisfragen-Test autonom nur eingeschränkt prüfbar). `outputs/audit-live.sh` weiterhin nicht im Mount → SSR via recheck.sh-Workaround.*
