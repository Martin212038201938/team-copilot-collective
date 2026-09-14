# SEO-Monatsreview copilotenschule.de — September 2026 (planmäßiger Lauf 07.09.)

**Erstellt:** 07.09.2026 (Cron `copilotenschule-seo-monthly-review`, autonom)
**Phase:** Phase 3 — Content-Block (aktiv seit 01.06., kein Wechsel). Phase 4 (Off-Page) parallel offen.
**Definition-of-Done-Score:** 4 von 8 — #1 (Indexierung) weiter unmittelbar an der Zielschwelle.

> **Einordnung & Datenhinweis:** Dieser Lauf ist ein autonomer Cron ohne interaktiven Zugang. Er ist zeitlich **fünf Tage nach dem umfassenden Monatsreview vom 02.09.** (`docs/seo-monatsreview-2026-09.md`) getaktet — der Monthly-Cron feuerte heute erneut. Der Datenstand ist seit dem 02.09. **im Kern unverändert** (heutiger Weekly-Audit bestätigt: Organik-Allzeithoch, Index-Dip −1,2 pp = Rauschen, Funnel weiter 0 % E2E, Outbound weiter eingeschlafen). Dieser Bericht **aktualisiert** die eigenständig abgreifbaren Werte (SSR live 67/67 via `recheck.sh`; Clarity 3-Tage frisch per API, Call 3/10; Wettbewerbs-/LLM-/Preis-Check per WebSearch) und stützt die interaktiv-gebundenen Kennzahlen (GSC, AlwaysData, Clarity-Dashboard-Conversions) auf den **heutigen Weekly-Audit (07.09.)**, der dieselben Quellen mit authentifiziertem Chrome-Zugang erhob. `outputs/audit-live.sh` liegt weiter nicht im Mount → SSR über den `recheck.sh`-Workaround. Interaktive ChatGPT-/Perplexity-Abfragen sind im Cron nicht möglich; Preisfragen-Test daher WebSearch-basiert (siehe §9). Fehlende Punkte sind explizit benannt.

---

## 1. Executive Summary

Der organische Kern läuft weiter auf Rekordkurs: GSC steht im 3-Monats-Fenster bei **2.160 Klicks / 178.000 Impressionen / Position 8,4** — alle drei absolute Projekt-Höchststände, +4,3 % Klicks und +5,3 % Impressionen gegenüber dem 02.09.-Stand. Die Indexierung auf der bereinigten Basis notiert bei **88,1 % (74/84)** — ein Dip von −1,2 pp gegenüber den 89,3 % vom 02.09. (eine einzelne Seite aus dem Index gefallen; unter der 5-pp-Risikoschwelle = Rauschen, kein Alarm), das 90-%-Ziel bleibt rechnerisch eine Seite entfernt. Im Wettbewerbscheck hält copilotenschule.de **Platz 1 unter den spezialisierten Anbietern** — Startseite **und** Vergleichs-Hub-Artikel ranken gemeinsam. Dem stehen die beiden bekannten strukturellen Dauerbefunde unverändert gegenüber: Der Funnel Content→Angebot bleibt bei **~0 % End-to-End** (Stufe 1 334 → Stufe 2 2 = 0,60 %; CTA-Brücke feuert 2×/7T), und die Outbound-Mailkampagne ist mit **~0 Sessions und 0 Conversions eingeschlafen**. DoD-Score bleibt bei **4/8**. **Keine neuen Crons, kein Push** (Doktrin: anschlussfähige Deliverables liegen als Drafts vor, Rest ist user-gebunden).

---

## 2. Definition-of-Done-Tabelle

| # | Kriterium | Ziel | Aktuell | Abstand | Trend |
|---|---|---|---|---|---|
| 1 | Indexierungsquote (GSC, bereinigte Basis) | ≥ 90 % | **88,1 %** (74/84) | −1,9 pp (≈ 1–2 Seiten) | ▼ 89,3 → 88,1 % (−1,2 pp, Rauschen) |
| 2 | SSR „vollständig kaputt" 🔴 | ≤ 5 URLs | **0 🔴** (67/67, live 07.09.) | ✅ erfüllt | ► stabil |
| 3 | SEO-Score (Health Check) | ≥ 75 | **42** (eingefroren) | −33 | ► blockiert (C1: PageSpeed-Modul seit 27.05. deaktiviert) |
| 4 | GEO-Score | ≥ 80 | **82** + LLM-Traffic | ✅ erfüllt | ► gehalten |
| 5 | Top-Klick-Bringer ≥ 5 URLs | ≥ 5 | **6 URLs** | ✅ wahrscheinlich | ► gehalten |
| 6 | Strategie-Query in Top 3 | Top 3 | Wettbewerbscheck **Platz 1** | ✅ wahrscheinlich | ► gehalten |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** (Drafts nicht versendet) | offen | ► unverändert |
| 8 | ProvenExpert ≥ 15 Bewertungen | ≥ 15 | **0** (Profil nicht angelegt) | offen | ► unverändert |

**Score: 4/8 fest** (#2, #4 hart; #5, #6 wahrscheinlich). #1 hat den 89,3-%-Peak vom 02.09. leicht abgegeben (88,1 %, eine Seite aus dem Index) — weiterhin an der Schwelle, kein struktureller Rückschritt. #3 bleibt der einzige technisch geblockte Punkt (PageSpeed-API-Quota, C1, User-Setup nötig). #7/#8 sind reine Off-Page-/Trust-Aufgaben mit fertigen Drafts bzw. offener Account-Anlage.

---

## 3. SSR-Audit-Vergleich (Anfang vs. heute)

| Zeitpunkt | ✅ | 🟡 | 🔴 | Quelle |
|---|---|---|---|---|
| 27.05.2026 (Baseline) | 31 | 2 | 38 | `docs/seo-audit-2026-05-27.md` |
| **07.09.2026 (heute, live)** | **67** | **0** | **0** | `recheck.sh` (audit-live.sh nicht im Mount) |

DoD #2 seit 15./16.06. dauerhaft erfüllt und heute erneut live verifiziert (Helmet-Flush 67/67, 0 Empty, 0 Doppel-Description). Regressions-Wächter grün (0 🔴, weit unter Eskalationsschwelle 5). Der Pre-Render-Komplex (Phasen 1/2/2b) ist historisch abgeschlossen und wird nicht wieder geöffnet.

---

## 4. GSC-Entwicklung

**Leistung (3-Monats-Fenster, Rekord — Stand heutiger Weekly-Audit, GSC frisch):**

| Metrik | 24.08. | 02.09. | **07.09.** | Δ (02.09.→07.09.) |
|---|---|---|---|---|
| Klicks | 1.940 | 2.070 | **2.160** | +4,3 % |
| Impressionen | 155.000 | 169.000 | **178.000** | +5,3 % |
| CTR | 1,2 % | 1,2 % | 1,2 % | ► |
| Ø Position | 8,5 | 8,4 | **8,4** | ► (Bestwert gehalten) |

*28-Tage-Fenster in diesem Cron nicht separat abgegriffen (Weekly-Audit erhob den 3M-Wert). Referenz 26.08.-Review: 28T ≈ 719 Klicks / 58.100 Impr. / Pos. 8,2.*

**Indexierung (bereinigte Basis „Alle eingereichten Seiten" − 6 Gated-PDFs, GSC-Stand 04.09.):**

- **74 / 84 = 88,1 %** — −1,2 pp gegenüber 89,3 % (02.09.). Ursache: eine Seite aus dem Index gefallen; A6-Summe nicht-indexiert (eingereicht) steigt von 15 auf **16** (gefunden 11 + gecrawlt 5, Δ +1 W/W). Beides **unter** der Trigger-Schwelle (Quote-Dip < 5 pp, Summen-Δ < +3) → **Rauschen, kein Issue, kein Eingriff**.
- 4-Wochen-Trend (bereinigte Basis): 83,9 % (20.08.) → 85,1 % (24.08.) → 89,3 % (28.08.) → **88,1 %** (04.09.). Weiter klar über dem August-Niveau, Ziel 90 % an der Schwelle (Restweg ≈ 1–2 Seiten).
- Kontext „Alle bekannten Seiten" (**KEIN KPI**): 75 indexiert / 34 nicht; „Seite mit Weiterleitung" stabil bei **10** (kein Alarm — keine Redirect-Quelle außerhalb der Sitemap).

> **Fußnote Messbasis-Bruch (einmalig):** Werte vor dem 20.08.2026 im Status-Log beziehen sich auf die alte Basis „Alle bekannten Seiten" und sind mit der aktuellen bereinigten Quote **nicht** direkt vergleichbar (Details: `seo-projektplan.md`, „Messvorschrift DoD #1").

**Top-Klick-Bringer (Query, 3M, Stand 07.09.):** copilot in excel aktivieren 94 (Pos 1,6) · excel copilot aktivieren 27 · copilot excel aktivieren 20 · **copilot kosten 17** · **copilot claude 12**.
**Top-Klick-Bringer (URL, 24.08.-Snapshot, unverändert relevant):** microsoft-copilot-lizenzen 287 · claude-in-microsoft-copilot 280 · copilot-in-excel-aktivieren 246 · ki-halluzinationen-vermeiden 193 · copilot-cowork-abrechnung-copilot-credits 141 · copilot-in-outlook-nutzen-tipps 130 → **6 verschiedene URLs** (DoD #5).
**Strategic Keywords (config.json):** Der informationale „excel aktivieren"-Cluster dominiert die Klicks. Von den vier strategischen Ziel-Keywords ist der transaktionsnahe Kosten-/Lizenz-Cluster („copilot kosten" 17) weiter in der Klick-Bringer-Liste präsent — SEA-synergetisch (siehe §6). Neu in den Top-Queries: „copilot claude" 12 — bestätigt `claude-in-microsoft-copilot` als Zug-Thema.

---

## 5. AlwaysData-Wachstum

| Zeitraum | Visits | Bemerkung |
|---|---|---|
| Juli 2026 (final) | 22.503 | Rekordmonat (inkl. Paid/Outbound-Peak) |
| **August 2026 (final)** | **18.142** | **−19,38 % vs. Juli** (Paid/Outbound-Pullback) |
| September MTD (Tag 7) | 4.220 | unvollständig, Pace ~18k |
| YTD Jan–Sep (MTD) | ≈ **89.700** | (Jan–Aug 86.454 + Sep-MTD 4.220 gerundet) |

**Einordnung (segmentiert):** Der August-Rückgang ist **kein Organik-Einbruch** — GSC zeigt zeitgleich Allzeit-Rekord. Er erklärt sich fast vollständig aus dem Rückzug der bezahlten/Outbound-Kanäle (Outbound-Mail von ~20 auf ~0 Sessions/30T; Juli künstlich überhöht durch den Kampagnen-Peak). Der September läuft mit ~18k-Pace stabil auf August-Niveau. Für den Wachstums-Vergleich mit Vor-Kampagnen-Zeiträumen gilt: **organisch = Rekord, Gesamt-Visits fallen durch Paid/Outbound-Pullback.**

---

## 6. Traffic-Mix Organic / SEA / Outbound + SEA-/Outbound-Wirkung

**Traffic-Mix 7T (Clarity-Kanal, Stand heutiger Weekly-Audit 07.09.):**

| Kanal | Sessions/7T | Anteil |
|---|---|---|
| Organic | **298** | ~66 % |
| SEA (cpc) | **13** | ~3 % |
| Outbound (email) | **~0** | ~0 % (eingeschlafen, nicht mehr gelistet) |
| Direct | 28 | ~6 % |
| Referral | 29 | ~6 % |
| AIPlatform/LLM | **7** | ~2 % |
| Other | 123 | ~27 % |

*30-Tage-Kanal-Split benötigt das Clarity-Dashboard (in diesem Cron nicht interaktiv abrufbar). Letzte vollständige 30T-Referenz (26.08.): Organic 1.623 · cpc 186 · Referral 156 · Direct 89 · AIPlatform 60 · Email 20 · Other 716.*

**SEA-Wirkung:** cpc ist gegenüber den ~50 Sessions/7T Anfang September auf **13** zurückgegangen — Kampagnen-Drosselung/Budget-Pause plausibel (keine interaktive Ads-Einsicht im Cron → **als offener Datenpunkt benannt**). Zielseiten-Drift-Check historisch sauber (0 cpc-Sessions auf `/wissen/`-Artikeln). Eine saubere cpc-Conversion-Isolierung erfordert das Dashboard-Segment und war in diesem Lauf nicht abgreifbar.

**Outbound-Wirkung:** LP `/sml/hr-tipps_2026`: Sessions praktisch **0**, `sml_*`-Events **0**. Die Kampagne ist seit >5 Wochen faktisch inaktiv und hat über ihre gesamte Laufzeit **0 Conversions** produziert → Entscheidung überfällig (überarbeiten vs. stoppen, §11).

**Synergie-Check (SEA als SEO-Recherchequelle):** Die SEA-relevanten Kosten-/Lizenz-Keywords („copilot kosten" 17) sind weiter **auch organische GSC-Klick-Bringer**. Doppelter Hebel: Dieselben transaktionsnahen Queries, für die SEA zahlt, gewinnen organisch — die Snippet-/CTR-Optimierung von `microsoft-copilot-lizenzen` (Fix-Draft seit 12.08.) zahlt auf beide Kanäle gleichzeitig ein.

---

## 7. Clarity-Conversion-Analyse

**Standard-Metriken (3T API, frisch 07.09., Call 3/10):** Sessions **151** (35 Bots, 186 Unique) · Scrolltiefe **35,09 %** · aktive Zeit **96 s** · Dead-Click **10,00 %** (genau an der Schwelle, von 14,33 % am 02.09. deutlich runter) · Rage 0,67 % · Quick-Back 1,33 % · Excessive-Scroll 0 % · Script-Errors 0. Geräte: PC 109 (**72 %**), Mobile 36, Tablet 6. Länder: **Deutschland 139 (92 %)**, USA 4, Österreich 2 → klare DACH-/B2B-Konzentration. Browser: **Edge 68 (~45 %)**, Chrome 38, MobileSafari 27 — der hohe Edge-Anteil bleibt ein starkes B2B-/Firmen-Client-Signal. **Neu bemerkenswert:** `copilot.microsoft.com` erscheint als Referrer (3 Sessions) → direktes Copilot-/LLM-Citation-Signal.

**Conversion-Events (7T, Stand heutiger Weekly-Audit, Chrome Smart Events + Custom Tags, Basis 490 Sess.):**

| Event | 7T |
|---|---|
| konfigurator_submit | 1 |
| mail_click | 1 |
| pdf_download | 2 |
| content_cta_click (`angebot_bruecke_click`) | **2** |
| contact_form_submit | 0 |
| phone_click | 0 |
| trainer_application_submit | 0 |
| sml_* (Outbound) | 0 |

Kontakt-nahe Smart Events (7T): danke_page_view 4 · „Kontaktieren Sie uns" 2 · booking_click 2 · „Ausgehender Klick" 2 · „Formular absenden" 1 · „Zitat anfordern" 1 · „Herunterladen" 1.
**Conversion-Rate gesamt: ≈ 12 / 490 = ~2,4 %** (stabil; kein 7e-Defekt — Volumen diese Woche generell etwas niedriger, kein Code-Defekt).

**Top-3 Goldene Pages (GSC-Top × Clarity-Top, organic; Clarity 3T PopularPages):**
1. `microsoft-copilot-lizenzen` — Clarity 32 Visits, GSC-Kosten/Lizenz-Cluster-Dauergewinner.
2. `claude-in-microsoft-copilot` — Clarity 21, GSC-Top-Klick-URL (280/3M), zusätzlich neuer Query „copilot claude".
3. `copilot-in-outlook-nutzen-tipps` — Clarity 20, GSC 130/3M.

**Top-3 Bremsen (viel Traffic, wenig Anschluss):**
1. `microsoft-copilot-lizenzen` — höchster Traffic, aber Kosten-Cluster-CTR nur ~0,6 % → Snippet-/Title-Problem (Fix-Draft `docs/drafts/protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md` fertig, unverpusst).
2. `copilot-in-excel-aktivieren` — GSC-**#1**-Klick-Bringer (94/3M), aber schwache Clarity-Präsenz und rein informational, kein Angebots-Anschluss.
3. `claude-in-microsoft-copilot` — hoher GSC-/Clarity-Traffic, aber keine erkennbare Angebots-Conversion.

**Funnel „Lead-Reise" 7T (segmentiert, organic-dominiert; Stand Weekly-Audit 07.09.):**

| Stufe | Definition | 7T | Rate |
|---|---|---|---|
| 1 Page-View | Content-Artikel (Wissens-Cluster) | **334** | 100 % (68,16 % aller Sess.) |
| 2 Angebot | /trainings + Konfigurator | **2** | **0,60 %** |
| 3 Kontakt-Klick | phone/pdf/mail + CTA-Brücke | ~4 | — |
| 4 Form-Submit | contact + konfigurator | 1 | ~0 % E2E |

**Bruchstelle unverändert Stufe 1 → 2:** Content-Leser springen kaum ins Angebot (0,60 %). Die CTA-Brücke feuert mit 2×/7T, ist aber weit von Funnel-Relevanz entfernt. Segmentierung: Funnel organik-getrieben; cpc/email tragen kaum bei (email ~0).

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

- **Goldene Pages (Investition wert):** `microsoft-copilot-lizenzen` (GSC-Top + Clarity-Top 32) ist der klare Dauergewinner. `claude-in-microsoft-copilot` (Clarity 21, jetzt eigener Query „copilot claude") und `copilot-in-outlook-nutzen-tipps` (20) folgen — alle drei GSC-stark **und** on-site frequentiert.
- **Bremsen (erste Optimierungspriorität):** `microsoft-copilot-lizenzen` ist paradox zugleich Goldene Page **und** Bremse — maximaler Traffic trifft auf minimale Kosten-Cluster-CTR (~0,6 %). Der fertige Snippet-Fix-Draft ist der hebelstärkste ungenutzte Punkt im Projekt. `copilot-in-excel-aktivieren` liefert die meisten GSC-Klicks bei der schwächsten On-Site-Bindung → Kandidat für einen additiven Angebots-Anschluss.
- **Direkt-/Fremd-Aufrufe (LLM/GEO):** AIPlatform 7/7T plus neuer `copilot.microsoft.com`-Referrer deuten auf fortbestehende LLM-Citations. AlwaysData-Gesamtvisits fallen (Paid/Outbound-Pullback), während GSC steigt — die Verschiebung geht klar Richtung organisch + generativ.

---

## 9. LLM-Sichtbarkeit-Trend

- **Wettbewerbs-Snapshot (WebSearch, „Microsoft Copilot Schulungsanbieter Deutschland 2026 Vergleich beste Anbieter"):** Top-Feld — medienreich.de, it-schulungen.com, gfu.net, promptingbirds.com, kebel.de. copilotenschule.de ist mit **Startseite UND Vergleichs-Hub-Artikel** (`/wissen/copilot-schulungsanbieter-deutschland-vergleich`) präsent und wird explizit als vollständig auf Copilot spezialisierter Anbieter empfohlen → **Platz 1 unter den spezialisierten Anbietern** gehalten. Neu am Rand: `kebel.de` (mit konkreten Terminen). Keine Verschiebung ggü. Strategie-Papier.
- **LLM-Traffic (Clarity-Proxy):** AIPlatform-Kanal 7/7T + `copilot.microsoft.com`-Referrer messbar → GEO zahlt weiter ein (untermauert DoD #4). (Der +143-%-W/W-Sprung des 02.09. war ein Wochenpeak; der 7T-Wert normalisiert sich, der Kanal bleibt aktiv.)
- **Preisfragen-Test (seit 20.08. gefordert, WebSearch-basiert):** Bei „Was kostet eine Microsoft-Copilot-Schulung?" nennen Suchergebnisse/Quellen für **it-schulungen.com** (ab 695 € bis 1.295 €) und **m365-kurs.de** (ab 2,20 €/User/Monat) konkrete Preise. Für **copilotenschule.de** wird die Spezialisierung (Inhouse, live online, Akademie Köln) genannt, aber **keine konkrete Trainings-Preisspanne** — der Lizenzpreis (15,60–26 €) im Titel des Lizenz-Artikels ist die Microsoft-Lizenz-, nicht die Trainings­kostenangabe. → **Zitierbarkeits-Lücke besteht fort** (Empfehlung §11.3).
- **Trend ggü. Vormonat:** LLM-Sichtbarkeit **gehalten** (Traffic-Kanal aktiv, Wettbewerbsposition stabil, Preis-Zitierbarkeit weiter offen). *Interaktive ChatGPT-/Perplexity-Abfrage autonom nicht möglich — als Einschränkung benannt, nächster betreuter Review liefert die direkte LLM-Antwort.*

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins**
1. **GSC-Organik-Allzeithoch** — 2.160 Klicks / 178.000 Impr. / Pos. 8,4 (3M), alle drei Rekorde, ohne jeden Eingriff.
2. **SSR + Wettbewerbsposition stabil** — 67/67 ✅ (0 🔴) live verifiziert; Platz 1 unter den spezialisierten Anbietern gehalten (Startseite + Vergleichs-Hub).
3. **Dead-Click entspannt** — 3T-API 10,0 % (von 14,33 % am 02.09.), an/unter der Schwelle; LLM-Kanal aktiv (`copilot.microsoft.com` als neuer Referrer).

**Probleme**
1. **Funnel Content→Angebot ~0 % E2E** — der teuerste strukturelle Dauerbefund; Stufe 1→2 nur 0,60 %, CTA-Brücke feuert erst 2×/7T.
2. **Outbound eingebrochen** — /sml-LP ~0 Sessions, 0 Conversions über die gesamte Laufzeit; Entscheidung überfällig.
3. **DoD #3 blockiert** — SEO-Score eingefroren bei 42, weil das PageSpeed-Modul seit 27.05. deaktiviert ist (C1, User-Setup nötig).

---

## 11. Konkrete Empfehlungen (5)

1. **Lizenz-Snippet-Draft pushen** — *Was:* `docs/drafts/protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md` (Title/Meta/Kosten-Sektion) live schalten. *Warum:* höchster Traffic × niedrigste CTR (~0,6 %) + SEA-Synergie auf denselben Kosten-Keywords. *Aufwand:* 0,5 h (Review + Push). *KPI:* CTR `microsoft-copilot-lizenzen` > 1 %.
2. **Outbound-Entscheidung treffen** — *Was:* LP-CTA `/sml/hr-tipps_2026` überarbeiten **oder** Kampagne sauber stoppen. *Warum:* 0 Conversions über die Laufzeit, verwässert den Traffic-Mix. *Aufwand:* 1 h Entscheidung. *KPI:* `sml_*`-Events > 0 **oder** dokumentierter Stopp.
3. **LLM-Preis-Zitierbarkeit schaffen** — *Was:* klar zitierbare Trainings-Preisspanne in `llms.txt` + Vergleichsartikel. *Warum:* Wettbewerber (it-schulungen.com, m365-kurs.de) werden mit konkretem Preis zitiert, copilotenschule.de nicht. *Aufwand:* 1 h. *KPI:* Copilotenschule mit Preis in ChatGPT/Perplexity-Antwort (nächster betreuter Review).
4. **C1 PageSpeed-Key einrichten** — *Was:* eigener PageSpeed-API-Key + reduzierte Frequenz (`docs/drafts/c1-c2-technik-2026-07-09.md`). *Warum:* DoD #3 ist ohne CWV-Scores dauerhaft unmessbar. *Aufwand:* 1 h User-Setup. *KPI:* SEO-Score erscheint wieder im Health-Check.
5. **Zweiten CTA-Touchpoint pushen** — *Was:* fehlenden `<TrainingCTA>` vor dem FAQ-Block auf `CopilotLicenses.tsx` + `CopilotTippsTricks.tsx` (`docs/drafts/pattern-transfer-goldene-pages-2026-08-26.md`). *Warum:* Funnel-Stufe 1→2 verstärken, wo der Traffic sitzt. *Aufwand:* 0,5 h. *KPI:* `angebot_bruecke_click` > 5/7T.

*Alle fünf Empfehlungen sind identisch zum 02.09.-Review — kein Deliverable ist seither umgesetzt worden (user-gebundener Push/Versand). Das unterstreicht: Der Engpass ist kein Automatisierungs-Loch, sondern ein Backlog fertiger, user-gebundener Aktionen.*

---

## 12. Risiken (max. 3, mit Mitigation)

1. **Teams-Reporting-Webhook 401 seit 03.08. (jetzt 35 Tage)** — Weekly-/Monatsreview-Posts scheitern beim Versand (Audit läuft vollständig durch, Reporting ist additiv). *Mitigation:* User legt in Teams → Workflows-App die Vorlage „Beim Empfang einer Webhook-Anfrage in einem Kanal posten" für Kanal „Marketing und SEA" neu an und trägt die URL als `TEAMS_WEBHOOK_MARKETING_SEA=` in `website-health-check/.env` ein.
2. **Funnel-Bruch strukturell** — Content konvertiert nicht in Angebots-Kontakte (Stufe 1→2 = 0,60 %); CTA-Brücke noch unter Funnel-Relevanz. *Mitigation:* Empfehlungen 1 + 5 (Snippet + 2. Touchpoint) pushen, Wirkung 4 Wochen im Weekly-Audit tracken.
3. **Monthly-Review-Cron feuert zu häufig** — `30 10 8-14 * 3` löste heute (07.09.) einen Voll-Lauf aus, obwohl der 02.09.-Review erst 5 Tage alt ist; nächster intendierter Lauf 08./09.09. *Mitigation:* Kein Schaden dank identischem Befund und „keine Aktion/kein Push"-Doktrin; sauberer Fix wäre ein reiner „2.-Mittwoch"-Guard im Prompt — Kandidat für einen betreuten User-Lauf, hier bewusst nicht eigenmächtig an der eigenen Cron-Definition geändert.

---

## 13. Anhang: Neue Clarity-Insights des Monats

- **Trend (bestätigt):** Edge-Browser-Anteil ~45 % + DACH 92 % + PC 72 % → verfestigtes B2B-/Firmen-Client-Profil. Neuer LLM-Referrer `copilot.microsoft.com` → GEO-Signal wächst über den reinen AIPlatform-Kanal hinaus.
- **Beobachtung (positiv):** Dead-Click 3T-API von 14,33 % (02.09.) auf **10,0 %** gesunken — an/unter der Schwelle; bekanntes organisches ArticlePopup-Muster bleibt der Treiber, Fix-Draft seit 17.06. verfügbar.
- **Pattern (unverändert, Bremse↔Goldene Page):** `microsoft-copilot-lizenzen` ist zugleich Top-Traffic-Page und CTR-Bremse (~0,6 % im Kosten-Cluster) — höchster ungenutzter Snippet-Hebel; Fix-Draft liegt seit 12.08. fertig.

*(Kein neuer datierter Insight-Eintrag angelegt — die Befunde sind Fortschreibungen der bestehenden August-Einträge, kein neues Pattern/Issue/Trend über den Schwellen. Fortschreibung im Kopf von `clarity-insights.md` beim nächsten 30T-Dashboard-Lauf.)*

---

*Erstellt automatisch vom Cron `copilotenschule-seo-monthly-review` am 07.09.2026. Planmäßiger Lauf, 5 Tage nach dem umfassenden 02.09.-Review — Datenstand im Kern unverändert, dieser Bericht aktualisiert die eigenständig abgreifbaren Werte und stützt die interaktiven Kennzahlen auf den heutigen Weekly-Audit (07.09.). Keine Code-Pushes, keine neuen Crons. Fehlende/eingeschränkte Datenpunkte explizit benannt (28T-GSC separat nicht abgegriffen; 30T-Clarity-Kanal-Split + cpc-Conversion-Isolierung dashboard-gebunden; LLM-Preisfragen-Test autonom nur WebSearch-basiert). `outputs/audit-live.sh` weiterhin nicht im Mount → SSR via recheck.sh.*
