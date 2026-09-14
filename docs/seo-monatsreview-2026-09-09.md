# SEO-Monatsreview — September 2026 (2.-Mittwoch-Lauf, 09.09.2026)

**Erzeugt:** Mi 09.09.2026 (kanonischer „2.-Mittwoch"-Monatsreview-Cron)
**Phase:** Phase 3 — Content-Block (aktiv seit 01.06., kein Wechsel). Phase 4 (Off-Page) parallel offen.
**Definition-of-Done-Score:** **4 von 8**
**Risiko:** 🟡 gelb (unverändert)

> **Einordnung vorab (ehrlich):** Dies ist der planmäßige 2.-Mittwoch-Lauf. Ein umfassender September-Review liegt bereits vom **02.09.** (`seo-monatsreview-2026-09.md`) und ein Refresh vom **07.09.** (`seo-monatsreview-2026-09-07.md`) vor. Der heutige Lauf **bestätigt** diese Basis und **aktualisiert ausschließlich die autonom (headless) abgreifbaren Signale**: SSR-Audit (Script), Clarity-Standardmetriken (API), Wettbewerb + LLM-/Preis-Sichtbarkeit (WebSearch). Die login-gebundenen Quellen (GSC-Detail, AlwaysData, Clarity-Dashboard-Conversions/Heatmaps, LLM-Chatbot-Direktabfragen) waren im unbeaufsichtigten Lauf **nicht zugänglich** und sind unten **explizit als übernommen/fehlend markiert**. Kein Push, keine src/-Änderung, keine neuen Crons (Begründung in Abschnitt 14).

---

## 1. Executive Summary

Die organische Substanz bleibt auf Allzeithoch: GSC 3M **2.160 Klicks / 178.000 Impressionen / Pos. 8,4** (Stand 07.09., gehalten), SSR heute live **67/67 ✅ (0 🔴)** — DoD #2 stabil, Regressions-Wächter grün. Die Indexierung steht mit **88,1 % (74/84, bereinigt)** weiter knapp unter dem 90-%-Ziel; der Restweg ist rein inhaltlich (≈ 1–2 Seiten „gefunden/gecrawlt – nicht indexiert"), nicht technisch. Im Wettbewerbsfeld hält die Copilotenschule **Platz 1** für die strategische Vergleichsabfrage über den eigenen Hub-Artikel; in LLM-Antworten wird die Domain für **Lizenzkosten** prominent zitiert (Preise 15,60/26 € decken sich mit der eigenen Seite), der **Trainings-Preis** selbst bleibt jedoch unzitierbar — die GEO-Preislücke besteht fort. Der teuerste offene Befund ist unverändert der **Funnel-Bruch Content→Angebot (~0 % E2E)**; die seit 12.08. fertige Lizenz-Snippet- und die 2.-CTA-Touchpoint-Maßnahme warten weiterhin auf einen User-Push. Engpass ist kein Automatisierungs-Loch, sondern ein **Backlog user-gebundener Aktionen**. DoD unverändert **4/8**, Phase 3 bleibt aktiv.

---

## 2. Definition-of-Done-Tabelle

| # | Ziel | Aktueller Wert | Abstand | Trend | Status |
|---|------|----------------|---------|-------|--------|
| 1 | Indexierungsquote ≥ 90 % (bereinigte Basis) | **88,1 %** (74/84, Stand 04.09.) | −1,9 pp | an der Schwelle, −1,2 pp W/W = Rauschen | ⏳ |
| 2 | SSR 🔴 ≤ 5 URLs | **0 🔴** (67/67 ✅, heute live) | erfüllt | stabil | ✅ |
| 3 | SEO-Score ≥ 75/100 | **42** | −33 | blockiert durch C1 (PageSpeed-Quota) | ❌ |
| 4 | GEO-Score ≥ 80/100 | **82** + messbarer LLM-Traffic | erfüllt | gehalten | ✅ |
| 5 | ≥ 5 verschiedene Klick-URLs | **≥ 5** (excel aktivieren, excel copilot, copilot kosten, copilot claude …) | erfüllt | gehalten | ✅ (wahrsch.) |
| 6 | Top-3 „beste Anbieter Deutschland 2026" | **#1** (eigener Vergleichs-Hub, heute bestätigt) | erfüllt | gehalten | ✅ (wahrsch.) |
| 7 | ≥ 1 externe Listicle-Erwähnung | 0 (Drafts fertig, nicht versendet) | offen | unverändert | ❌ |
| 8 | ProvenExpert ≥ 15 Bewertungen | Profil nicht angelegt | offen | unverändert | ❌ |

**Score: 4/8** (fest: #2, #4; wahrscheinlich: #5, #6).

> **Fußnote DoD #1 (Messbasis-Bruch):** Werte bis 20.08.2026 beruhen auf der alten Basis „Alle bekannten Seiten" und sind mit der heutigen bereinigten Basis („Alle eingereichten Seiten" − 6 Gated-PDFs) **nicht direkt vergleichbar**. Umstellungsreferenz 20.08.: 83,9 %.

---

## 3. SSR-Audit-Vergleich (Anfang vs. heute)

| Messung | Baseline 04.05.2026 | Heute 09.09.2026 | Δ |
|---|---|---|---|
| Helmet-Flush funktioniert | 31 / 67 | **67 / 67** | +36 |
| Default-Title-Fallback | 36 / 67 | **0 / 67** | −36 |
| Komplett leer (🔴) | 0 | **0** | 0 |
| Doppel-Description | 0 | **0** | 0 |

SSR-Regressions-Wächter **grün**, DoD #2 gewahrt. (Gemessen via `seo-monitoring/recheck.sh` — `outputs/audit-live.sh` ist weiter nicht im Mount, dokumentierter Workaround.)

---

## 4. GSC-Entwicklung *(übernommen aus 07.09.-Baseline — heute headless nicht frisch abgreifbar)*

- **Indexierung (bereinigte Basis, Stand 04.09.):** **74 / 84 = 88,1 %**; nicht indexiert: gefunden 11 + gecrawlt 5 = A6-Summe **16**.
  - Kontext „Alle bekannten Seiten" (KEIN KPI): 75 indexiert / 34 nicht; „Seite mit Weiterleitung" **10 (stabil)** — keine neue Redirect-Quelle außerhalb der Sitemap.
- **4-Wochen-Trend (bereinigte Basis):** 24.08. 85,1 % → 02.09. 89,3 % → 07.09. 88,1 % (−1,2 pp = Rauschen, unter 5-pp-Schwelle). Ziel 90 % = Restweg ≈ 1 Seite.
- **Leistung 3M (Allzeithoch, gehalten):** Klicks **2.160**, Impr. **178.000**, CTR 1,2 %, Pos. **8,4**.
- **Top-Klick-Bringer:** copilot in excel aktivieren 94 (Pos 1,6) · excel copilot aktivieren 27 · copilot excel aktivieren 20 · copilot kosten 17 · copilot claude 12.
- **Strategische Keywords (config):** „Schulungsanbieter Vergleich 2026" → Hub B2 rankt **#1** (heute via WebSearch bestätigt); „Inhouse buchen" (B3c) + „QCG Förderung" (B3b) noch als Drafts; „EU AI Act Schulungspflicht" (B3a) live.

---

## 5. AlwaysData-Wachstum *(übernommen aus 07.09.-Baseline — headless nicht zugänglich)*

- **August final:** 18.142 Besuche (−19,38 % vs. Juli 22.503 = Paid-/Outbound-Pullback, **nicht** Organik).
- **September MTD:** ~4.220 (Tag 7, Pace ~18k).
- **YTD Jan–Sep:** ≈ **89.700**.

---

## 6. Traffic-Mix Organic/SEA/Outbound + SEA-/Outbound-Wirkung

**Traffic-Mix 7T (Clarity-Kanal, Stand 07.09.):** Organic **298** | SEA (cpc) **13** | Outbound (email) **~0 (eingeschlafen)** | Direct 28 · Referral 29 · AIPlatform/LLM 7 · Other 123.

**Heute frisch (Clarity-API-Referrer, 3T):** Ads-Einsprung weiter sichtbar (`…?gad_source=1&gclid=…` 12 Sessions) — **SEA landet korrekt auf der Startseite, nicht auf /wissen/-Artikeln** ✅ (kein Drift). Neuer LLM-/Teams-Referrer `teams.public.onecdn.static.microsoft` **24 Sessions** — Copilot-/Teams-Oberfläche als Einstiegsquelle.

- **SEA:** cpc-Volumen niedrig (13/7T, von ~50 im August → Ads-Drosselung oder Budget-Pause). Zielseiten sauber. Synergie-Check: die cpc-starken Kosten-/Lizenz-Keywords tauchen organisch als Klick-Bringer auf („copilot kosten" 17) → die Lizenz-Seite ist der gemeinsame Hebel (siehe Empfehlung 1).
- **Outbound:** LP `/sml/hr-tipps_2026` über die gesamte Laufzeit ~0 Sessions / 0 Conversions. `sml_*`-Events feuern nicht. **Entscheidung überfällig:** überarbeiten oder stoppen.

---

## 7. Clarity-Conversion-Analyse

**Standardmetriken heute frisch (API, 3-Tage-Fenster, Call 3–4/10):**

| Metrik | Wert (09.09.) | Einordnung |
|---|---|---|
| Sessions | **431** (48 Bots, 464 Unique) | größeres Fenster als 07.09.-API-Snapshot (126) — API-Fensterbreite schwankt, s. Hinweis |
| Dead-Click | **12,79 %** | **über 10-%-Schwelle** (07.09. 7,94 %) — bekanntes organisches Zickzack (ArticlePopup) |
| Rage-Click | 0,47 % | unkritisch |
| Quick-Back | 2,56 % | unkritisch |
| Excessive-Scroll / Script-Error / Error-Click | 0 % | sauber |
| Scrolltiefe | 38,46 % | im Normalband |
| Aktive Zeit | 125 s | solide |
| Top-Browser | **Edge 244 (57 %)** · Chrome 113 · Firefox 27 | sehr starkes **B2B-Signal** (Edge dominiert) |
| Device | PC 388 / Mobile 39 / Tablet 4 | 90 % Desktop = Entscheider am Arbeitsplatz |
| Länder | DE 357 · CH 18 · AT 18 · IE 16 | DACH-Fokus bestätigt (IE = MS-/LLM-Infra) |

> **Hinweis Datenqualität:** Zwei aufeinanderfolgende API-Aufrufe für `numOfDays=3` lieferten 151 bzw. 431 Sessions — die Live-Insights-API liefert kein deterministisches 3-Tage-Fenster. Für diesen Bericht wird der **vollständige, reichere Payload (431)** genutzt; die Werte sind als Größenordnung, nicht als exakte W/W-Vergleichsbasis zu lesen.

**Conversion-Rate + Events (übernommen aus 07.09.-Baseline — Dashboard-Events headless nicht abgreifbar):** Conv-Rate **~2,4 %** (≈12/490). Smart-/Custom-Events 7T: konfigurator_submit 1 · mail_click 1 · pdf_download 2 · `angebot_bruecke_click` **2** (CTA-Brücke feuert). 7e-Defekt-Check: kein Event ≥3→0, kein Code-Defekt.

**Top-3 „Goldene Pages"** (GSC-Top × hohe On-Site-Bindung, organisch): `microsoft-copilot-lizenzen`, `claude-in-microsoft-copilot`, `copilot-in-outlook-nutzen-tipps`.

**Top-„Bremsen":** `microsoft-copilot-lizenzen` (Kosten-Cluster-CTR ~0,6 %, Snippet-Fix-Draft seit 12.08. unverpusst), `copilot-in-excel-aktivieren` (GSC-#1-Klick-Bringer, schwache On-Site-Bindung).

**Funnel „Lead-Reise" (segmentiert, Basis 07.09.):**

| Stufe | Definition | Sessions | Rate |
|---|---|---|---|
| 1 | Page-View (Content) | 334 (68,2 %) | — |
| 2 | Angebot (Trainings/Konfigurator) | **2** | **0,60 %** |
| 3 | Mail-/Phone-Click / PDF / Form-Submit | 0 | **0 % E2E** |

Segment-Befund: Bruch liegt eindeutig zwischen Stufe 1→2 (Content→Angebot) im **Organic**-Segment; cpc/email zu klein für belastbare Segment-Rate.

---

## 8. Cross-Korrelation GSC × Clarity × AlwaysData

- **Goldene Pages** (GSC-Top + hohe Bindung, organisch): `microsoft-copilot-lizenzen`, `claude-in-microsoft-copilot`, `copilot-in-outlook-nutzen-tipps` → Investition wert (interne Verlinkung + Angebots-CTA stärken).
- **Bremsen** (GSC-Top + schwache Conversion): `microsoft-copilot-lizenzen` (Kosten-Cluster-CTR), `copilot-in-excel-aktivieren` → erste Optimierungs-Priorität (Snippet + CTA).
- **Direkt-/Fremdquellen** (AlwaysData/Referrer hoch, GSC niedrig): `teams.public.onecdn` (24) + `copilot.microsoft.com` (07.09.) = **LLM-/Teams-Citations**; `gclid`-Einsprung = SEA. Beide via Referrer sauber identifizierbar, keine unerklärte Direkt-Spitze.

---

## 9. LLM-Sichtbarkeit-Trend (inkl. Preisfragen-Test)

*Direktabfragen an ChatGPT/Perplexity/Claude headless nicht möglich — Ersatz via WebSearch-Proxy + Clarity-Referrer-Kanal.*

- **Anbieter-Frage (WebSearch):** Für „Microsoft Copilot Schulungsanbieter Deutschland 2026 beste Anbieter" erscheint **copilotenschule.de als #1** (eigener Vergleichs-Hub) plus Startseite. Mitgenannte Wettbewerber: GFU, IT-Schulungen.com, Promptingbirds, Netlogix, malter365, Microsoft. Kein neuer Player, kein Ranking-Verlust.
- **Preisfrage (WebSearch):** Für „Was kostet eine Microsoft Copilot Schulung" wird die **Lizenz-Seite `microsoft-copilot-lizenzen` prominent zitiert** (Preise 15,60 € / 26 € decken sich mit dem eigenen Seitentitel). **Aber:** der **Trainings-/Schulungspreis** selbst wird **nicht mit konkretem Wert** genannt („sehr individuell, Anbieter kontaktieren"). → **GEO-Preislücke besteht fort** — Maßnahme: konkreten, strukturierten Trainings-Preis in `llms.txt` / auf der Trainingsseite zitierbar machen.
- **LLM-Traffic-Kanal (Clarity):** AIPlatform 7/7T (07.09.) + neuer Referrer `teams.public.onecdn` 24/3T → GEO zahlt weiter messbar ein.

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins**
1. Organik-Allzeithoch gehalten (2.160 Klicks / Pos. 8,4) + SSR 67/67 grün.
2. Wettbewerbs-Platz-1 für die strategische Vergleichsabfrage bestätigt; LLM zitiert Lizenzkosten aus eigener Quelle.
3. Sehr starkes B2B-Profil (Edge 57 %, 90 % Desktop, DACH 91 %) — exakt die Zielgruppe.

**Probleme**
1. **Funnel Content→Angebot ~0 % E2E** — teuerster offener Befund, seit Monaten unbewegt.
2. **Dead-Click 12,79 %** wieder über Schwelle (organischer ArticlePopup-Treiber; Fix-Draft seit 17.06. unverpusst).
3. **Outbound eingeschlafen** (0 Sessions/0 Conv.) — Entscheidung überfällig; Indexierung 1,9 pp unter Ziel.

---

## 11. Konkrete Empfehlungen (mit Aufwand + Erfolgs-KPI)

1. **Lizenz-Snippet-Fix pushen** (Draft seit 12.08.). *Warum:* Kosten-Cluster-CTR ~0,6 % auf einer Goldenen Page + cpc-Synergie. *Aufwand:* gering (Push). *KPI:* CTR Kosten-Queries > 1,5 %.
2. **2. CTA-Touchpoint auf Goldenen Pages** (Draft existiert). *Warum:* Funnel Stufe 1→2 bei 0,6 %. *Aufwand:* gering–mittel. *KPI:* `angebot_bruecke_click` > 5/Woche + Stufe-2-Rate > 2 %.
3. **Outbound-Entscheidung treffen** (überarbeiten vs. stoppen). *Warum:* 0 Conv. über gesamte Laufzeit. *Aufwand:* Entscheidung. *KPI:* entweder sml_*-Events > 0 oder sauberer Stopp + Budget-Reallokation.
4. **LLM-Preis-Zitierbarkeit** — konkreten Trainings-Preis strukturiert in `llms.txt` + Trainingsseite. *Warum:* LLM zitiert Lizenz-, aber nicht Trainingspreis. *Aufwand:* mittel. *KPI:* Copilotenschule mit Trainingspreis in LLM-Antwort nennbar.
5. **ArticlePopup Dead-Click-Fix pushen** (Draft seit 17.06.). *Warum:* Dead-Click wieder > 10 %. *Aufwand:* gering (Push). *KPI:* Dead-Click-API 3T dauerhaft < 10 %.

*Alle fünf sind user-gebundene Pushes/Entscheidungen — der Cron kann sie regelkonform nicht selbst ausführen.*

---

## 12. Risiken (max. 3 mit Mitigation)

1. **Indexierung kippt unter 88 %** → Mitigation: Weekly-Audit trackt A6-Coverage wöchentlich; bei −5 pp IndexNow-Massenping + Sitemap-Resubmit (Sofort-Reaktion aus Plan).
2. **Teams-Reporting-Webhook „Marketing und SEA" HTTP 401 seit 03.08. (= 38 Tage)** → Audit-Posts scheitern (Audit selbst läuft durch). Mitigation: Reauth durch User; hier nur gespiegelt, keine Doppel-Eskalation.
3. **Draft-Backlog altert** (Snippet/CTA/Dead-Click seit Wochen unverpusst) → Wirkung verpufft. Mitigation: gebündelter User-Push-Termin.

---

## 13. Anhang: Neue Clarity-Insights-Einträge des Monats

Keine neuen Pattern-/Issue-/Trend-Einträge gegenüber 02.09./07.09. — die heutigen Signale (Dead-Click-Zickzack, Edge-Dominanz, LLM-/Teams-Referrer) sind bereits dokumentiert. Der Dead-Click-Wiederanstieg wird als **Beobachtung** (kein neuer Issue) geführt: Treiber organisch, Fix-Draft existiert, Schwellen-Überschreitung im bekannten Band.

---

## 14. Entscheidungen dieses Laufs

- **Kein neuer Bericht unter `seo-monatsreview-2026-09.md`** (02.09.-Original bleibt unangetastet) — dieser Lauf dokumentiert unter dem Tagesdatum.
- **Keine neuen Crons.** Begründung: A6 ist per Doktrin cron-los (Weekly-Audit trackt); alle offenen Maßnahmen (Snippet-/CTA-/Dead-Click-Push, Outbound, C4/C1, D1–D5, B3b/B3c) sind **user-gebundene Aktionen, kein Automatisierungs-Loch** → Ersatz-Crons wären Redundanz (Conductor-Doktrin).
- **Kein Push, keine src/-Änderung.**
- **Monthly-Cron-Semantik:** `30 10 8-14 * 3` feuert wegen DoM∨DoW an jedem Tag 8.–14.; heute ist der intendierte 2.-Mittwoch (09.09.). Empfohlener Fix (betreuter User-Lauf): reiner DoW-Ausdruck `30 10 * * 3` + „2.-Mittwoch"-Guard im Prompt.

**Nächster intendierter voller Monatsreview:** Mi 14.10.2026, 10:30.
