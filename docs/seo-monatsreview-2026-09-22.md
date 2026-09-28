# SEO-Monatsreview September 2026 (Zusatzlauf 22.09., User-angefordert) — jetzt inkl. Bing Ads

**Erstellt:** 22. September 2026
**Auslöser:** User-angefordert („mach einen kompletten Analyse-Run"), Erstaufnahme des neuen Paid-Kanals **Bing Ads (Microsoft Advertising)** ins Reporting.
**Datenquellen-Politik (neu, ab 22.09.):** Login-gebundene Quellen werden im **internen Browser** gezogen, sofern sie nicht in Chrome eingeloggt sind. Heute frisch: Bing Ads (interner Browser), AlwaysData (intern), **Clarity-Dashboard 30T inkl. Conversion-Events + Funnel + Traffic-Mix (intern, nach User-Login)**, Clarity-API 3T (Script), SSR (Script), Wettbewerb/LLM (Websuche). **GSC** wurde nach Konto-Wechsel (`authuser=1`, berechtigtes Konto) im internen Browser **live bestätigt** — Indexierung 74/84 unverändert, Leistung frisch. Damit ist dieser Review **vollständig frisch belegt**, nichts übernommen.

---

## 1. Executive Summary

Organik hält das Allzeithoch (GSC 3M **2.240 Klicks / 191.000 Impr. / Pos. 8,2** = neue Bestposition, frisch 22.09.; Indexbericht seit 04.09. eingefroren bei 74/84 = 88,1 %). AlwaysData hat die **100.000-Besucher-Marke für 2026 überschritten** (YTD 100.446); September läuft auf ~20,4k Pace. **Neu im Reporting: Bing Ads ist live**, aber im Pilotmaßstab — 1 Suchkampagne, **28,16 € Ausgaben / 8 Klicks / 282 Impressionen / 0 Conversions** seit Start im September, mit einer **UET-Conversion-Tracking-Warnung** im Konto (keine Conversions in 7 Tagen). Damit sind jetzt **alle drei Paid-Kanäle schwach**: Google Ads eingeschlafen, Outbound eingeschlafen, Bing Ads im Test ohne messbare Conversion. Der teuerste organische Dauerbefund bleibt der Funnel-Bruch Content → Angebot (**0,62 % → 0 % E2E**, frisch 22.09.). Clarity 30T zeigt 3.099 Sessions, weiter dominant organisch (Google 1.328 + Bing 475), B2B-Profil hart (Edge 48,6 %); neu: **Gemini** taucht erstmals als AI-Referrer auf. SSR 67/67, DoD **4/8**, Phase 3, kein Wechsel. Keine Code-Pushes, keine neuen Crons.

---

## 2. Definition-of-Done-Tabelle (Stand 22.09.2026)

| # | Kriterium | Ziel | Aktuell | Trend | Status |
|---|-----------|------|---------|-------|--------|
| 1 | Indexierungsquote GSC (eingereichte Seiten ohne 6 Gated-PDFs) | ≥ 90 % | **88,1 %** (74/84, live 22.09.) | flat | 🟡 an Schwelle |
| 2 | SSR „🔴 komplett kaputt" | ≤ 5 | **0** (67/67 ✅, live 22.09.) | stabil | ✅ erfüllt |
| 3 | SEO-Score Health-Check | ≥ 75 | **42** (C1-Blocker) | flat | 🔴 offen |
| 4 | GEO-Score | ≥ 80 | **82** + LLM-Traffic messbar | gehalten | ✅ erfüllt |
| 5 | Top-Klick-Bringer ≥ 5 verschiedene URLs | ≥ 5 | Cluster Excel / Kosten / Lizenz / Claude / Marke | stabil | ✅ wahrscheinlich |
| 6 | „beste Anbieter Deutschland 2026" Top 3 | Top 3 | **#1** (eigener Vergleichs-Hub) | gehalten | ✅ erfüllt |
| 7 | Externe Listicle-Erwähnung | ≥ 1 | **0** (Drafts nicht versendet) | flat | 🔴 offen |
| 8 | ProvenExpert-Profil | ≥ 15 Bew. | **0** (nicht angelegt) | flat | 🔴 offen |

**Score: 4/8 erfüllt** (unverändert). Bing Ads zählt nicht direkt auf die 8 DoD-Kriterien ein, ist aber ab jetzt fester Bestandteil der Traffic-Mix-/Kampagnen-Auswertung.

---

## 3. Bing Ads / Microsoft Advertising (NEU — frisch 22.09.)

**Konto-Diagnose:** Konto ✅ · Abrechnung ✅ · Kampagne ✅ · Anzeigenkomponenten ✅ · **Conversion-Tracking ⚠️ „Begrenzung der Auslieferung" — keine Conversions in 7 Tagen, UET-Tracking muss ggf. behoben werden.**

**Kampagne „Website traffic-Search-1"** (einzige aktive Kampagne, Suchkampagne, Gebotsstrategie „Automatisch: max. Klicks", Tagesbudget 15,00 €):

| Kennzahl | September MTD (= Gesamtlaufzeit) |
|---|---|
| Ausgaben | **28,16 €** |
| Klicks | **8** |
| Impressionen | **282** |
| CTR | **2,84 %** |
| Ø-CPC | **3,52 €** |
| Conversions | **0,00** |
| Beste Impr.-Rate | 75,15 % |
| Absolute Top-Rate | 51,48 % |

Aufschlüsselung: Suchanzeigen 8 Klicks / 259 Impr. / 3,09 % CTR / 28,16 €; Zielgruppenanzeigen 0 / 23; Max-Leistung 0 / 0. Der „Gesamter Zeitraum"-Wert ist identisch mit dem September-MTD → **die Kampagne wurde erst im September gestartet** und läuft im Pilotmaßstab.

**Bewertung:** Bing Ads ist frisch live, aber mit 8 Klicks / 282 Impressionen noch statistisch bedeutungslos. Zwei Sofort-Punkte: (1) **UET-Conversion-Tracking prüfen/reparieren** — ohne funktionierendes Tracking lässt sich kein ROAS/CPA messen, und die aktuelle „0 Conversions"-Zahl ist nicht interpretierbar (echte 0 vs. Tracking-Defekt nicht unterscheidbar). (2) **Zielseiten-Drift-Check** wie bei Google Ads: sicherstellen, dass Bing-Ads-Klicks auf Trainings/Konfigurator/LP landen, nicht auf `/wissen/`-Artikeln. Bei einem Ø-CPC von 3,52 € und 15 €/Tag Budget ist der Kanal aktuell ein günstiger Test — die Entscheidung Skalieren/Optimieren fällt erst nach Tracking-Fix mit belastbaren Conversion-Daten.

---

## 4. SSR-Audit (live 22.09.)

67/67 Helmet-Flush ✅, 0 Default-Fallback, 0 leer, 0 Doppel-Description. Regressions-Wächter grün, DoD #2 gewahrt (Baseline 04.05.: 31 ✅ / 36 Fallback). Snapshot `seo-monitoring/2026-09-22-snapshot.json`.

---

## 5. GSC-Entwicklung (frisch 22.09., berechtigtes Konto im internen Browser)

- **Indexierung (eingereichte Seiten ohne 6 Gated-PDFs):** 74 indexiert / 16 nicht (Gefunden 10 + Gecrawlt 6) = **74/84 = 88,1 %** — unverändert (Indexbericht seit 04.09. nicht neu gecrawlt, jetzt aber live bestätigt). A6-Summe 16.
- **Leistung 3M (20.06.–19.09.):** Klicks **2.240** / Impr. **191.000** (+2,1 % vs. 17.09.) / CTR 1,2 % / Pos. **8,2** (neue Bestposition, von 8,3). Top-Queries: copilot in excel aktivieren 91 (Pos. 1,5), excel copilot aktivieren 29, copilot kosten 19, copilot excel aktivieren 19, copilot preise 12, copilot claude 12, copilotenschule 12, copilot lizenz 11.
- **Schläfer (hohe Impr., CTR <1 %):** `copilot kosten` (2.657 Impr., 0,7 %, Pos. 4,5), `copilot lizenz` (1.646, 0,7 %, Pos. 4,3), `copilot lizenz kosten` (1.173, Pos. 3,5), `copilot premium kosten` (1.087, 0,7 %, Pos. 5,1), `copilot preise` (1.134, Pos. 5,8). Der Kosten-/Lizenz-/Preis-Cluster ist unverändert der größte ungehobene Klick-Hebel.

---

## 6. AlwaysData-Wachstum (frisch 22.09.)

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
| **September (MTD, Tag 22)** | **14.966** | −17,51 % (MTD-Artefakt) |
| **YTD Jan–Sep** | **100.446** | **100k-Marke überschritten** |

September steht bei Tag 22 auf 14.966 → Hochrechnung **~20.400** (14.966 / 22 × 30), also über August und nahe Juli. 24h heute: 767. Da alle drei Paid-Kanäle schwach sind (§7), ist das Wachstum praktisch rein organisch.

---

## 7. Traffic-Mix Organic / Paid / Outbound (jetzt mit Bing Ads)

**Kanal-Segmentierung 30T** (Clarity-Referrer frisch 22.09. + Bing-Ads-Dashboard frisch 22.09.):

| Segment | Volumen 30T | Quelle / Hinweis |
|---|---|---|
| **Organic Search** | **~1.919 Sess.** | Google 1.328 · Bing 475 · DuckDuckGo 62 · Ecosia 33 · google.de 11 · Yahoo 10 |
| **LLM / AI** | **~149 Sess.** | teams.public.onecdn 90 · chatgpt.com 36 · copilot.microsoft.com 12 · gemini.google.com 11 (NEU) |
| **SEA Google (cpc)** | **~0 Sess.** | kein gclid im Referrer-Fenster → **eingeschlafen** |
| **SEA Bing (Microsoft Ads)** | **8 Klicks / 282 Impr. / 28,16 € (Ads-Dashboard, MTD)** | **NEU, Pilotmaßstab**; die 8 Klicks liegen innerhalb der 475 bing.com-Referrer und sind ohne msclkid-Segmentierung nicht von organischem Bing trennbar → als eigener Kanal aus dem Ads-Dashboard ausgewiesen |
| **Outbound (email)** | **~0 Sess.** | `sml_landing_page_visit` 1/30T → **eingeschlafen** |
| Referral | ~181 | copilotenschule.de intern 158 · yellow-boat.com 23 |
| Direct / Rest | Restmenge | Referrer null |

*Neu im LLM-Segment: **gemini.google.com** taucht erstmals als AI-Referrer auf (11 Sess.) — Google Gemini zitiert die Seite jetzt ebenfalls.*

**Befund:** Alle drei bezahlten/aktiven Push-Kanäle sind schwach — Google Ads pausiert/gedrosselt, Outbound eingeschlafen, Bing Ads im Test ohne Conversion-Messung. Die Reichweite trägt praktisch allein die Organik. Das ist stabil, aber es macht die Marke von einem einzigen Kanal (organische Suche) abhängig.

---

## 8. Clarity-Conversion-Analyse (frisch 22.09.)

**Standard 30T (frisch 22.09.):** Sitzungen **3.099** (585 Bots), Unique 2.918, Neue Nutzer 96,81 %, Seiten/Sitzung 1,22, Scroll 40,14 %, aktive Zeit 1,7/4,1 Min. Dead-Click **13,46 %** (417), Rage 0,39 % (12), Quick-Back 1,87 % (58). Edge **48,56 %** (1.505, B2B). CWV-Score 83/100 (LCP 2,3 s gut, **INP 220 ms gelb**, CLS 0 gut).
**Standard 3T (frisch 22.09., API):** Sessions 236 (56 Bots, 295 Unique), Dead-Click **13,56 %**, Rage 0,42 %, Quick-Back 2,11 %, Scroll 42,03 %, aktive Zeit 88 s, **Edge ~51 %**, PC ~83 %, DACH ~78 %+. → deckt sich mit der 30T-Sicht, Dead-Click im bekannten organischen ArticlePopup-Zickzack.

**Conversion-Events 30T (frisch 22.09.):** Ausgehender Klick 32 · danke_page_view 28 · Formular absenden 27 · Kontaktieren Sie uns 20 · pdf_download 18 · Herunterladen 15 · lead 13 · booking_click 12 · Zitat anfordern 4 · contact_form_submit 4 · angebot_bruecke_click 4 · konfigurator_submit 3 · mail_click 2 · trainer_application_submit 2 · phone_click 1 · sml_landing_page_visit 1 · roi_generator_ppt_success 1.
**Funnel „Lead-Reise" 30T (frisch 22.09.):** Stufe 1 SEO-Einstieg 1.767 (57,02 %) → Stufe 2 Angebot 11 (0,62 %) → Stufe 3 Kontakt 0 → **0 % E2E**. CTA-Brücke (angebot_bruecke_click) feuert nur 4×/30T (Platzierungsproblem). Conv-Proxy ~1,9 % (Formular absenden 27 + Kontaktieren Sie uns 20 + lead 13 = 60/3.099) bzw. konservativ ~0,9 % (nur echte Formular-Submits). Praktisch rein organisch.

**Goldene Pages:** microsoft-copilot-lizenzen, claude-in-microsoft-copilot, copilot-in-outlook-nutzen-tipps.
**Bremsen:** microsoft-copilot-lizenzen (Kosten-Cluster CTR <1 %, Snippet-Draft seit 12.08. unverpusst), copilot-in-excel-aktivieren (GSC-#1-Klick-Bringer, schwache On-Site-Weiterreise).

---

## 9. Wettbewerb + LLM-Sichtbarkeit (frisch 22.09.)

- **Wettbewerb:** copilotenschule.de weiter **#1-Empfehlung** für die Vergleichsabfrage (eigener Hub `copilot-schulungsanbieter-deutschland-vergleich` + Startseite ranken top). Wettbewerber-Feld: GFU, IT-Schulungen.com, medienreich, Haufe/skill it, promptingbirds, malter365 — **neu sichtbar: PC-COLLEGE** (wirbt mit „Deutscher Bildungs-Award 2025/2026" für IT-Weiterbildung). Kein Ranking-Verlust, aber PC-COLLEGE als award-gestützter Player beobachten.
- **LLM/Preis:** Lizenz-Seite weiter prominent zitierbar (eigene Quelle); **eigener Trainings-/Schulungspreis weiter nicht mit konkretem Wert zitierbar** → GEO-Preislücke besteht fort. Empfehlung: konkrete Trainingspreise in `llms.txt` + Trainingsseite.

---

## 10. Top 3 Wins / Top 3 Probleme

**Wins:** (1) AlwaysData YTD > 100.000 überschritten. (2) Organik-Allzeithoch + Wettbewerbs-Platz-1 gehalten. (3) SSR 67/67, B2B-Profil (Edge ~48–51 %) sauber.
**Probleme:** (1) **Alle drei Push-Kanäle schwach** — Google Ads + Outbound eingeschlafen, Bing Ads ohne Conversion-Tracking. (2) Funnel Content → Angebot 0 % E2E (CTA-Brücke 4×/30T). (3) Indexierung eingefroren bei 88,1 %, Kosten-Cluster-CTR <1 %.

---

## 11. Konkrete Empfehlungen (5, mit Aufwand + KPI)

| # | Was | Warum | Aufwand | Erfolgs-KPI |
|---|---|---|---|---|
| 1 | **Bing-Ads-UET-Conversion-Tracking reparieren** + Zielseiten-Drift-Check | Konto meldet „keine Conversions in 7 Tagen"; ohne Tracking kein ROAS/CPA messbar | S–M | UET feuert Conversions; Bing-Ads-CPA messbar |
| 2 | **Lizenz-Snippet-Draft (12.08.) pushen** + 2. CTA-Touchpoint | Kosten-/Lizenz-/Preis-Cluster Pos. 4–6, CTR <1 % | S (Draft fertig) | CTR-Cluster 0,7 % → ≥ 1,5 % |
| 3 | **Angebots-CTA-Brücke prominenter** auf den 3 Goldenen Pages | Funnel Stufe 1→2 = 0,61 %, Brücke feuert nur 4×/30T | M | Brücke 4 → ≥ 20/30T; Stufe 2 > 2 % |
| 4 | **Paid-Strategie-Entscheidung gesamt** (Google Ads reaktivieren? Outbound stoppen? Bing skalieren?) | Alle drei Paid-Kanäle schwach — Budget-Fokus fehlt | S (Entscheidung) | 1 Paid-Kanal aktiv mit gemessener Conversion |
| 5 | **Trainingspreis LLM-zitierbar** (llms.txt + Trainingsseite) | GEO-Preislücke: LLMs zitieren Lizenz-, nicht Trainingspreis | S–M | Preisfragen-Test nennt eigenen Trainingspreis |

---

## 12. Risiken (max. 3)

1. **Einseitige Kanalabhängigkeit** — mit drei schwachen Paid-Kanälen trägt Organik ~100 %; ein Google-Core-Update träfe voll. Mitigation: Bing-Ads-Tracking fixen + einen Paid-Kanal gezielt ausbauen, LLM-Kanal pflegen.
2. **Bing-Ads-Budget ohne Messung verpufft** — 15 €/Tag laufen, aber Conversions sind nicht getrackt. Mitigation: UET-Fix vor jeder Budgeterhöhung.
3. **Backlog-Stau** — Snippet-/CTA-/Dead-Click-Drafts + Outbound-Entscheidung seit Wochen offen. Mitigation: eine fokussierte User-Session für die S-Punkte.

---

## 13. Anhang: Datenquellen-Politik + Insights

- **Neu:** Bing Ads (Microsoft Advertising) ist ab sofort fester Reporting-Kanal; Datenabruf via **internem Browser** (dort eingeloggt). Persistenter Kampagnen-Status in `docs/seo-projektplan.md` ergänzt.
- **Browser-Regel:** Login-gebundene Quellen künftig im internen Browser, sofern nicht in Chrome eingeloggt. Im internen Browser eingeloggt ✅: Microsoft Advertising, AlwaysData, Clarity-Dashboard, **GSC** (berechtigtes Konto via `authuser=1` — im internen Browser sind mehrere Google-Konten; das Property-berechtigte ist authuser=1, das Standard-Konto `thenewworkacademy@gmail.com` hat keinen Zugriff). Damit sind alle Kernquellen im internen Browser verfügbar.
- **Pattern (bestätigt):** B2B-Profil hart (Edge ~48–51 %, PC, DACH). **Anti-Pattern:** Funnel-Bruch Stufe 1→2 strukturell. **Trend:** LLM-Referrer verstetigt (~143/30T).

---

*User-angeforderter Zusatzlauf 22.09.2026. Keine Code-Pushes, keine neuen Crons. Nächster regulärer voller Monatsreview: Mi 14.10.2026.*
