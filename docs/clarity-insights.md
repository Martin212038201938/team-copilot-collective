# Clarity-Insights — Conversion-Patterns für copilotenschule.de

**Lebendes Dokument** — Cron-Jobs pflegen dieses File. Hier sammeln sich die Pattern-Erkenntnisse aus Microsoft Clarity, die wir auf andere Seiten übertragen oder gegen UX-Probleme einsetzen können.

**Letzter automatischer Update:** 10. Juli 2026 (Wöchentlicher Audit — SEA skaliert 6→59 Sess., Outbound 55→38, Dead-Click weiter grenzwertig 12,48 %, Edge zurück auf ~29 %, Goldene Pages Lizenzen + Claude-in-Copilot)

---

## Zweck

Clarity zeigt uns drei Arten von Erkenntnissen, die ohne dieses Dokument nach jedem Cron-Lauf wieder vergessen würden:

1. **Best-Practice-Patterns** — Pages mit hoher Conversion-Rate: Was machen die richtig? CTA-Position? Inhaltslänge? FAQ-Style? Diese Pattern auf andere Pages übertragen.
2. **Anti-Patterns** — Pages mit viel Traffic, aber niedriger Conversion: Was geht da schief? Heatmap, Session-Recording, Drop-Off-Analyse.
3. **UX-Probleme** — Rage-Clicks, Dead-Clicks, Quick-Backs: konkrete Stellen, an denen Besucher frustriert sind und die Site verlassen.

---

## Schema der Einträge

### Pattern-Eintrag (Best-Practice)

```markdown
### YYYY-MM-DD — Pattern: <kurzer Name>
**Quelle:** Cron-Lauf YYYY-MM-DD (weekly | monthly)
**Beobachtete Page:** /wissen/<slug> — Conversion-Rate <X>%, Sessions <n>
**Pattern:** Was an dieser Page funktioniert (CTA oben, FAQ am Ende, Schnellantwort-Block, …)
**Empfehlung:** Auf welche Pages übertragen? Mit welcher Methode?
**Status:** identifiziert | übertragen | verworfen
```

### Issue-Eintrag (Anti-Pattern oder UX-Problem)

```markdown
### YYYY-MM-DD — Issue: <kurzer Name>
**Quelle:** Cron-Lauf YYYY-MM-DD (weekly | monthly)
**Betroffene Page:** /<slug>
**Symptom:** Z.B. „Rage-Click auf Element X", „Drop-Off nach Y%", „Conversion-Rate <0,5% trotz N Sessions"
**Hypothese:** Was könnte die Ursache sein?
**Empfohlene Maßnahme:** Konkreter Code-/Content-Fix
**Status:** identifiziert | fixed | beobachten | verworfen
```

### Trend-Eintrag (über mehrere Wochen)

```markdown
### YYYY-MM-DD — Trend: <kurzer Name>
**Beobachtungs-Zeitraum:** YYYY-MM-DD bis YYYY-MM-DD
**Event:** <Conversion-Event-Name>
**Trend:** Sessions/Conversions <X>% gewachsen/gefallen
**Ursache (vermutet):** SEO-Push? Neuer Content? Saisonal?
**Handlung:** Verstärken | Beobachten | Gegensteuern
```

---

## Initial-Erkenntnisse (Stand 27. Mai 2026)

### 2026-05-27 — Initial-Datenlage

**AlwaysData-Server-Stats (vor Clarity-Setup verfügbar):**
- 30.429 Unique Visits in 2026
- Wachstum: Jan 1.084 → Mai 11.276 (+10×)
- Trend: +49% Mai vs. April

**GSC-Top-Klick-Bringer (3 Monate):**
1. „copilot in excel aktivieren" — 8 Klicks/797 Impr. (Pos 8.2)
2. „excel copilot aktivieren" — 7 Klicks/305 Impr. (Pos 7.8)
3. „ki-halluzinationen vermeiden" — 2 Klicks/21 Impr. (Pos 9.7)

→ Top-Klick-Bringer-URLs: `/wissen/copilot-in-excel-aktivieren`, `/wissen/copilot-fuer-excel`, `/wissen/ki-halluzinationen-vermeiden`. **Diese sollten beim ersten echten Clarity-Audit als Vergleichsbasis dienen — sind die High-Performer auch High-Converter?**

**Clarity-Status:** heute eingerichtet. Erste Daten erwartet 28.05. ab 9:00. Dashboard schaltet frei sobald genügend Sessions verarbeitet wurden (laut Microsoft FAQ: bis zu 2 Stunden, max. 24 Stunden bei neuem Projekt).

---

## Aktive Funnels in Clarity (5 Stück, Stand 29.05.2026)

Vier Pfade, die parallel laufen — jeder beleuchtet einen anderen Conversion-Weg:

### 1. Lead-Reise: SEO → Angebot → Kontakt (3-Step)
**Angelegt:** 27. Mai 2026
**Pfad:** `/wissen/` (enthält) → `/trainings` (enthält) → `/kontakt` (enthält)
**Hypothese:** Klassischer SEO-Funnel — Lead findet uns über Google auf einem Fachartikel, schaut sich Angebot an, fragt an.

### 2. Direkt-Conversion: Homepage → /kontakt (2-Step)
**Angelegt:** 29. Mai 2026 (umgewidmet aus Default-Trichter „Homepage direkt")
**Pfad:** Homepage (Seitenbesuch) → `/kontakt` (enthält)
**Hypothese:** Lead kennt die Marke (Direct-Type, Empfehlung, Visitenkarte), springt direkt zur Anfrage. Kurzer Pfad, hohe Intent.

### 3. Direkt-Reise: Homepage → Trainings → Kontakt (3-Step)
**Angelegt:** 29. Mai 2026
**Pfad:** `https://copilotenschule.de/` (ist genau) → `/trainings` (enthält) → `/kontakt` (enthält)
**Hypothese:** Direkter Einstieg, Lead informiert sich über Angebot vor Anfrage. Vergleich mit Lead-Reise (Funnel #1) zeigt, ob SEO-Traffic anders konvertiert als Direct-Type-Traffic.

### 4. HR-Tipps → Kontakt (2-Step)
**Angelegt:** 29. Mai 2026
**Pfad:** `https://copilotenschule.de/sml/hr-tipps_2026` (ist genau) → `/kontakt` (enthält)
**Hypothese:** Lead-Magnet für HR-Zielgruppe → führt zu Anfrage-Intent über die Kontaktseite.

### 5. HR-Tipps → Kontakt-Klick (Smart-Event-Conversion, 2-Step)
**Angelegt:** 29. Mai 2026
**Pfad:** `https://copilotenschule.de/sml/hr-tipps_2026` (ist genau) → Smart Event „Kontaktieren Sie uns" (Button-/Link-Klick)
**Hypothese:** Misst eine andere Conversion-Stufe als Funnel #4 — der direkte Klick auf einen Kontakt-/Termin-Element auf der HR-Seite, ohne dass /kontakt zwingend aufgerufen werden muss (z.B. wenn der Button auf mailto:, Calendly oder Anker führt).

---

## Auswertungs-Fragen für Cron-Jobs (Monthly-Review)

**Funnel-Vergleich Lead-Reise vs. Direkt-Reise (#1 vs. #3):**
- Wer konvertiert besser? SEO-Lead oder Direct-Type-Lead?
- Wenn SEO besser → Content-Investment lohnt, Wissensartikel ausbauen
- Wenn Direkt besser → Markenbekanntheit ist der Hebel, Performance/Trust-Signale stärken

**Funnel-Vergleich Direct kurz vs. Direct lang (#2 vs. #3):**
- Wer kürzer konvertiert (`/` → `/kontakt`) hat höhere Intent
- Wer länger braucht (`/` → `/trainings` → `/kontakt`) ist evaluierender — braucht stärkere Trust-Signale auf /trainings

**HR-Funnel-Vergleich (#4 vs. #5):**
- Wenn #4 (Kontaktseite) deutlich konvertiert, #5 (Klick) aber nicht → HR-Leads bevorzugen Formular
- Wenn #5 (Klick) konvertiert, #4 nicht → HR-Leads bevorzugen direkte Aktion (Terminbuchung), Formular wirkt als Friction

**Wo bricht die Mehrheit ab? (gilt für alle Funnels):**
- Step 1→2: Schwaches Angebot-Signal? Schwacher CTA? Visitor versteht nicht, was wir machen?
- Step 2→3: Schwaches Trust-Signal? Preise/Bedingungen abschreckend? CTA fehlt?

**Branchenschnitt:** SaaS-B2B 2-5% End-to-End-Conversion ist üblich.

**Hinweis Smart-Event-Conversion (#5):** Funktioniert erst, wenn der "Kontaktieren Sie uns"-Button auf der HR-Seite tatsächlich angeklickt wird. Auto-detected Smart Event greift bei deutschsprachigen Button-Texten "Kontaktieren Sie uns" zuverlässig. Falls auf /sml/hr-tipps_2026 ein Calendly- oder Termin-Link existiert, der NICHT "Kontaktieren" heißt, müsste ein separates Custom-Smart-Event angelegt werden (Setting → Intelligente Ereignisse → „Neues intelligentes Ereignis").

---

### Smartlead HR-Kampagne 2026: E-Mail → Landingpage → Buchung
**Angelegt:** 29. Mai 2026 (manuell — vor Kampagnenstart)
**Zweck:** Misst ob und wie Smartlead-E-Mail-Empfänger auf der Landingpage konvertieren.
Dieser Funnel ist bewusst von SEO-Traffic isoliert: Nur `/sml/`-Traffic wird erfasst.
So kann die Performance der ersten Smartlead-Kampagne sauber bewertet werden.

**Funnel-Steps (in Clarity Dashboard anlegen):**
1. **Landingpage besucht** — URL ist `/sml/hr-tipps_2026`
   - Clarity-Event: `sml_landing_page_visit`
   - Hier ankommen = E-Mail wurde geöffnet und Link geklickt
2. **Conversion-Absicht signalisiert** — Clarity-Event `sml_booking_click` ODER `sml_contact_click`
   - Hier ankommen = Besucher wollte aktiv werden
3. **Buchung abgeschlossen** — URL enthält `outlook.office.com/book` oder `/kontakt`
   - Entspricht einer tatsächlichen Conversion-Handlung

**Alternative: Funnel mit Session-Tag-Filter**
Clarity erlaubt auch Funnel-Auswertung mit Custom-Tag-Filter:
- Filter: `visitor_type = "smartlead_campaign"`
- Dann normaler Funnel: `/sml/hr-tipps_2026` → `/kontakt` oder Booking-URL

**Clarity-Dashboard-Setup (einmalig manuell):**
```
Clarity → Funnels → Neuer Funnel "Smartlead HR 2026"
Step 1: URL contains "/sml/hr-tipps_2026"
Step 2: Custom Event "sml_booking_click" OR "sml_contact_click"
Step 3: URL contains "outlook.office.com/book" OR URL contains "/kontakt"
```

**Sekundäre Conversion-Events (für Tag-Filter-Auswertung):**
| Event                  | Bedeutung                                        |
|------------------------|--------------------------------------------------|
| `sml_landing_page_visit` | Seite geladen (UTM-Source = smartlead)         |
| `sml_booking_click`    | Termin-Buchen-Button geklickt (prim. Conversion) |
| `sml_contact_click`    | Kontaktformular-Link geklickt (prim. Conversion) |
| `sml_offers_click`     | Angebote-Seite besucht (sek. Conversion)         |
| `sml_article_click`    | HR-Wissensartikel geklickt (sek. Conversion)     |
| `sml_home_click`       | Startseite geklickt (nachrangig)                 |

**Session Tags für Filter:**
| Tag                  | Wert                   | Wozu                            |
|----------------------|------------------------|---------------------------------|
| `visitor_type`       | `smartlead_campaign`   | Gesamten Kampagnen-Traffic trennen |
| `campaign_name`      | `hr-tipps-2026`        | Kampagnen-ID                    |
| `campaign_mail`      | `mail1`…`mail4`        | Welche Mail hat konvertiert?    |

**Auswertungs-Fragen nach Kampagnenstart:**
- Wie hoch ist die E2E-Conversion-Rate (Step 1 → Step 3)?
- Welche Mail (mail1–mail4) bringt die meisten Klicks auf die LP?
- Welche Mail (mail1–mail4) konvertiert am stärksten (Buchung/Kontakt)?
- Wie lange verweilen Besucher auf der Seite? (Session-Dauer in Clarity-Recordings)
- Wo scrollen Besucher ab / brechen ab? (Scroll-Heatmap)
- Gibt es Rage-Clicks oder Dead-Clicks auf CTAs?

**Benchmark-Erwartungen (erste Kampagne, kalt):**
- E-Mail Open Rate: ~30–40% (Zielwert B2B kalt DE)
- Klick-auf-LP-Rate: ~5–15% der Öffner
- LP-zu-Conversion: ~5–15% (Ziel: mindestens 1 Buchung pro 50 LP-Besuche)
- E2E-Rate (Mail → Buchung): ~0,5–2% ist für Kalt-B2B realistisch

**Hinweis für Cron-Jobs:**
Dieser Funnel kann nicht automatisch aus der Clarity-API ausgewertet werden,
da Clarity keine Funnel-Export-API hat. Manuelle Auswertung im Clarity-Dashboard
nach ca. 2 Wochen Laufzeit empfohlen.

---

## Logs (neueste oben — automatisch von Cron-Jobs gepflegt)

<!-- ab hier ergänzen Cron-Jobs ihre Befunde -->

---

### 📌 KAMPAGNEN-STATUS (persistent — für Schritt 5c jeden Lauf prüfen)
**Stand 26.06.2026:**
- **Outbound-Cold-Mail:** ✅ **LIVE seit 25.06.2026**, läuft **wochentags**. Versanddomain `copiloten-schule.de` (separat, Reputationsschutz). Landingpages unter `/sml/` (z. B. `/sml/hr-tipps_2026`). → Ab Audit 29.06.: Outbound-Traffic (utm_medium=email bzw. Referrer/Direct aus Mailklicks) vom Organic-Segment **trennen**; `sml_*`-Events + Funnel „Smartlead HR 2026" auswerten.
- **SEA (Google Ads):** ✅ **LIVE (erstmals gemessen 06.07.2026)** — 6 cpc-Sessions/7T + `sml_jump_paid_click` 14. Zielseiten-Check 06.07.: 0/6 auf /wissen/ → korrekt auf Trainings/Konfigurator/LPs. Ab jetzt utm_medium=cpc jede Woche separat segmentieren + Zielseiten-Drift-Check (SEA darf nicht auf /wissen/ landen).
- **CTA-Brücke (`TrainingCTA`, Custom-Tag `content_cta_click`):** ✅ live seit 12.06. **Tracking am 26.06. verifiziert** (Runtime-Test: Klick feuert `clarity('set','content_cta_click',href)` korrekt). 0 Firings in 7T = **keine echten Klicks** (Funnel-Problem), KEIN Bug. Hebel = CTA sichtbarer/attraktiver machen.

> ⚠️ **METHODEN-FIX für Schritt 5b (wichtig):** Die Conversion-Events sind **Custom Tags** (`Clarity.setTag`), NICHT Smart Events. Sie erscheinen NUR unter **Filter → „Benutzerdefinierte Filter" → „Benutzerdefinierte Kategorien" → Dropdown „Tag auswählen"** — NICHT im „Intelligente Ereignisse"-Dropdown. Frühere Läufe prüften nur Smart Events → systematische Untererfassung. **Ab sofort beide Filter prüfen.** Verfügbare Custom-Tags (Stand 26.06.): `booking_click, campaign_mail, campaign_medium, campaign_name, campaign_source, claude_verify_tag, contact_form_submit, danke_page_view, sml_landing_page_visit, visitor_type`. (`content_cta_click`, `mail_click`, `phone_click`, `pdf_download`, `trainer_application_submit` = 0 Firings → tauchen nicht auf, bis sie gefeuert werden.) Outbound-Segmentierung (5c) über `campaign_medium`/`campaign_source`.

*Hinweis: Der ursprüngliche Skill-Kontext „SEA + Outbound ab KW 25" war verfrüht. Maßgeblich ist dieser Status-Block.*

---

### 2026-07-10 — Trend (verstärken): SEA (cpc) skaliert 6 → 59 Sessions/7T (~10×)
**Beobachtungs-Zeitraum:** 03.07. – 10.07.2026 (Clarity Dashboard 7T, Filter `Mittel=cpc`)
**Event:** Bezahlter Suchtraffic (utm_medium=cpc)
**Trend:** cpc-Segment springt von **6 (06.07.) auf 59 Sessions/7T** — ~10×, jetzt ~9,1 % des Gesamt-Traffics (649). Engagement Anlaufphase-typisch niedrig: 1,0 Seiten/Sitzung, 31,75 % Scroll, 19 s aktiv. `sml_jump_paid_click` feuert 6× (Paid-Jump). Dead-Click im cpc-Segment nur 5,08 % (3 Sess.) → SEA-Traffic ist NICHT der Dead-Click-Treiber.
**5c-Zielseiten-Check:** Keine Hinweise auf /wissen/-Drift — Paid-Jump-Event + Top-Pages (Trainings/Konfigurator/LP) konsistent mit korrekter Zielseiten-Steuerung (wie 06.07. 0/6). Vollständige cpc-Funnel-Neuverifikation diesen Lauf nicht gezogen; kein ⚠️.
**Handlung:** Verstärken/Beobachten — Volumen jetzt bewertbar. Nächster Lauf: cpc-Segment auf echte Conversion prüfen (sml_jump_paid_click → booking/contact) und Zielseiten-Drift erneut gegenprüfen. Noch 0 direkte Conversions aus cpc.

---

### 2026-07-10 — Beobachtung: Outbound (email) 55 → 38 Sessions/7T, weiter 0 Conversions
**Quelle:** Cron-Lauf 2026-07-10 (weekly) — Clarity Dashboard 7T, Filter `Mittel=email`
**Beobachtung:** Outbound-Segment fällt von **55 (06.07.) auf 38 Sessions/7T (~5,9 %)** — Rückgang im rollierenden 7T-Fenster (weniger Versand/Klicks in der Woche). Engagement unverändert Kalt-Mail-schwach: 14,79 % Scroll, 21 s aktiv, 1,0 Seiten/Sitzung, Dead-Click 2,63 %. `sml_landing_page_visit` feuert 11×, aber weiter **kein `sml_booking_click`/`sml_contact_click` mit Daten → 0 Outbound-Conversions**.
**Bewertung:** LP `/sml/hr-tipps_2026` bleibt #2 der Top-Pages (38 Visits/3T), aber sofortiger Bounce. Nach >2 Wochen Laufzeit ist das Fenster für die LP-Heatmap-Prüfung erreicht.
**Handlung:** Beobachten — bei anhaltend 0 `sml_booking_click`/`sml_contact_click` trotz kumuliert >100 LP-Sessions: Above-the-fold/CTA von `/sml/hr-tipps_2026` per Scroll-Heatmap + Recording überarbeiten (manuell).

---

### 2026-07-10 — Issue-Update: Dead-Click weiter ≥10 % (12,48 % 7T / 11,11 % API 3T), Treiber organisch
**Quelle:** Cron-Lauf 2026-07-10 (weekly) — Clarity API 3T (11,11 %, 513 Sess.) + Dashboard 7T (12,48 %, 81 Sess.)
**Symptom:** Dead-Click API 3T **11,11 %** (Vorwoche 13,33 %, leicht rückläufig), Dashboard 7T **12,48 %** (Vorwoche 10,27 %, leicht gestiegen). Beide über der 10 %-Schwelle. Rage 0,39 % (2–3 Sess., < 5-Schwelle), Quick-Back 0 %, Excessive-Scroll 0 % / 0,46 % — sonst ruhig.
**5c-Gegenprüfung:** cpc-Segment 5,08 %, email-Segment 2,63 % → beide klar unter Gesamtwert. Der Treiber bleibt eindeutig **organisch** (globales `ArticlePopup` via `ContentLayout.tsx`), NICHT Kampagne.
**Bewertung:** Seit Wochen im Zickzack um die Schwelle (Mix-Effekt: Anteil Wissensartikel-Traffic). Kein Code-Defekt, bekannter Fix-Draft `docs/drafts/clarity-fix-copilot-in-outlook-nutzen-tipps.md` (seit 17.06.) unverpusht. Kein neuer Cron.
**Status:** identifiziert — dauerhaft grenzwertig, Fix-Draft wartet auf User-Push (in Notification gespiegelt).

---

### 2026-07-10 — Beobachtung: Edge-Browser-Anteil zurück auf ~29 % (mögliches B2B-/SEA-Signal)
**Quelle:** Cron-Lauf 2026-07-10 (weekly) — Clarity API 3T (513 Sess.)
**Beobachtung:** Edge steigt auf **149 Sess. (~29 %)** — Vorwochen 14 % (29.06.) bzw. 24 % (22.06.). Chrome 226 (~44 %), MobileSafari 59, ChromeMobile 33, Firefox 18. Anstieg ~+15 pp W/W — **unter** der 20-pp-Alarmschwelle, aber auffällig.
**Bewertung:** Passt zur B2B-Copilot-Zielgruppe (Microsoft-Enterprise nutzt überdurchschnittlich Edge) und zum Hochlauf von SEA (59 cpc-Sess.) + Outbound. Wahrscheinlich Mix aus organischem B2B-Shift und Paid-Zufluss.
**Handlung:** Beobachten — kein Handlungsbedarf. Bei erneutem Anstieg > 20 pp neu bewerten und gegen cpc-Browserverteilung gegenprüfen.

---

### 2026-07-10 — Cross-Korrelation: Goldene Pages (GSC × Clarity, überwiegend organic)
**Quelle:** Cron-Lauf 2026-07-10 (weekly) — GSC Top-Klick-Bringer 3M × Clarity PopularPages 3T
**Goldene Pages (in beiden stark):** `/wissen/microsoft-copilot-lizenzen` (GSC: rankt für „copilot kosten"/Lizenz-Cluster; Clarity #4 mit 34 Visits) und `/wissen/claude-in-microsoft-copilot` (GSC: „claude in microsoft copilot" 3 Kl./„copilot claude" 4 Kl.; Clarity #6 mit 32 Visits). Beide ziehen organischen Such-Traffic UND werden real besucht → ideale CTA-Brücke-Kandidaten (falls noch nicht Welle 1/2).
**Ungenutztes Potential:** Der GSC-#1-Klick-Bringer `/wissen/copilot-in-excel-aktivieren` (Excel-aktivieren-Cluster: 44+18+9+6 Kl./3M) taucht **nicht** in den Clarity-Top-6 auf — hohe Such-Sichtbarkeit, aber geringe On-Site-Sichtbarkeit/Verweil. Kandidat für interne Verlinkung + CTA-Brücke, um den Such-Traffic zu aktivieren.
**Handlung:** Beobachten/Verstärken — beim nächsten CTA-Welle-Schritt Excel-Aktivieren-Seite priorisieren.

---

### 2026-07-06 — Trend (NEU): SEA (Google Ads / cpc) gestartet — erste Messung
**Beobachtungs-Zeitraum:** 29.06. – 06.07.2026 (Clarity Dashboard 7T, Filter `Mittel=cpc`)
**Event:** Bezahlter Suchtraffic (utm_medium=cpc)
**Trend:** Erstmals cpc-Sessions messbar: **6/7T** (Vorwochen 0). Zusätzlich neues Smart-Event `sml_jump_paid_click` mit **14 Sessions** (Paid-Jump-Klick). Engagement des cpc-Segments: 1,0 Seiten/Sitzung, 41,83 % Scroll, 9 s aktiv — noch sehr klein, Anlaufphase.
**5c-Zielseiten-Check:** Lead-Reise-Funnel im cpc-Segment: **0 von 6 Sessions** erreichen Stufe 1 „/wissen/-Artikel besucht" → SEA landet **korrekt NICHT** auf Wissensseiten, sondern auf Trainings/Konfigurator/LPs. Kein ⚠️ (Regel Schritt 5c erfüllt).
**Ursache:** SEA-Kampagne live geschaltet (Stand 26.06. noch „nicht gestartet"; `VITE_GOOGLE_ADS_ID` inzwischen aktiv).
**Handlung:** Beobachten — Volumen noch zu klein für Bewertung. Ab nächstem Lauf cpc-Segment separat auf Conversion prüfen (sml_jump_paid_click → booking/contact). Zielseiten-Check jede Woche wiederholen (SEA darf nicht auf /wissen/ driften).

---

### 2026-07-06 — Issue-Update: Dead-Click weiter ≥10 %, aber rückläufig
**Quelle:** Cron-Lauf 2026-07-06 (weekly) — Clarity API 3T (13,33 %) + Dashboard 7T (10,27 %, 61 Sess.)
**Symptom:** Dead-Click API 3T **13,33 %** (↓ von 17 % am 29.06.), Dashboard 7T **10,27 %** (↓ von 15,02 %). Zweiter Wert nur knapp über der 10 %-Schwelle. Rage/Quick-Back/Excessive-Scroll/ScriptError alle 0 %.
**5c-Gegenprüfung:** Outbound-Segment (email, 55 Sess.) = **0 % Dead-Click**; cpc = 0 %. → Treiber unverändert **organisch** (globales `ArticlePopup` via `ContentLayout.tsx`), NICHT Kampagne.
**Bewertung:** Klarer Rückgang zweite Woche, aber weiter über Schwelle → Issue bleibt formal offen. Bekannter Fix-Draft `docs/drafts/clarity-fix-copilot-in-outlook-nutzen-tipps.md` (seit 17.06.) unverpusht. Kein neuer Cron.
**Status:** identifiziert — rückläufig, Fix-Draft wartet auf User-Push (in Notification gespiegelt).

---

### 2026-07-06 — Beobachtung: Outbound-Segment skaliert (21 → 55 Sessions), weiter 0 Conversions
**Quelle:** Cron-Lauf 2026-07-06 (weekly) — Clarity Dashboard 7T, Filter `Mittel=email`
**Beobachtung:** Outbound-Cold-Mail wächst auf **55 Sessions/7T (~9,3 % von 594)** — mehr als verdoppelt ggü. 21 (29.06.). Engagement bleibt Kalt-Mail-typisch niedrig: 1,02 Seiten/Sitzung, 12,89 % Scrolltiefe, 16 s aktive Zeit. `sml_landing_page_visit` feuert (12), aber weiter **keine `sml_booking_click`/`sml_contact_click` mit Daten → 0 Outbound-Conversions**.
**Bewertung:** Volumen steigt (mehr Versand), Qualität/Engagement unverändert schwach. LP `/sml/hr-tipps_2026` ist #2 der Top-Pages (17/3T), aber sofortiger Bounce. Nach 2 Wochen Laufzeit (ab 25.06.) nähert sich das Fenster für die LP-Heatmap-Prüfung.
**Handlung:** Beobachten — bei anhaltend 0 `sml_booking_click`/`sml_contact_click` trotz jetzt >50 LP-Sessions: LP-Above-the-fold/CTA von `/sml/hr-tipps_2026` überarbeiten (manuelle Scroll-Heatmap + Recording).

---

### 2026-06-29 — Issue (Re-Eskalation): Dead-Click zurück über 10 %-Schwelle
**Quelle:** Cron-Lauf 2026-06-29 (weekly) — Clarity API 3T (17 %) + Dashboard 7T (15,02 %, 67 Sess.) + Dashboard 3T (10,29 %, 7 Sess.)
**Betroffene Page (Ableitung aus PopularPages):** organische /wissen-Seiten via globales `ArticlePopup` (über `ContentLayout.tsx`). Top-organische Page 3T: `/wissen/ki-halluzinationen-vermeiden` (21), dann `/` (14), `copilot-cowork-abrechnung-credits` (13), `claude-in-microsoft-copilot` (8).
**Symptom:** Dead-Click-Rate API 3T springt von 8,65 % (22.06.) auf **17 %** — fast verdoppelt, klar über der 10 %-Schwelle (Schritt 7c). Dashboard 7T 15,02 %. Rage 1 %, Quick-Back/Excessive-Scroll/ScriptError 0 % (sonst alles ruhig).
**5c-Gegenprüfung (Kampagnen-Segment):** Outbound-Segment (`campaign_medium=email`, 21 Sess.) zeigt **0 % Dead-Click** → die Eskalation kommt **nicht** aus der Outbound-Kampagne, sondern aus dem organischen Traffic. SEA ist nicht live. Damit ist der bekannte Treiber bestätigt: `ArticlePopup` (lucide-x-Icon ohne `pointer-events-none` + 300-ms-Fade + ~32-px-Hit-Area), site-weit auf Wissensseiten.
**Hypothese (Schwankungs-Ursache):** Der 3T-Wert reagiert stark auf die Page-Mischung. In Wochen mit hohem Anteil Wissensartikel-Traffic (Popup feuert nach 20 s) steigt Dead-Click; sinkt der Anteil, fällt er (vgl. 21,4 % → 8,65 % → 17 % Zickzack). Der niedrige Wert der Vorwochen war also kein nachhaltiger Fix, nur Mix-Effekt — der eigentliche Code-Treiber besteht weiter.
**Empfohlene Maßnahme:** Den **bereits erstellten** Fix-Draft pushen — `docs/drafts/clarity-fix-copilot-in-outlook-nutzen-tipps.md` (Overlay-Wrapper im Closing `pointer-events-none`, Backdrop dismissibel + `cursor-pointer`, X-Button 44×44 px + `<X pointer-events-none>`), plus optional sessionStorage-Frequency-Cap. Scope: `ArticlePopup` ist geteilt → wirkt site-weit (bewusst freigeben). Kein neuer Cron — Fix liegt vor, Engpass ist der Push.
**Status:** identifiziert — re-eskaliert (Fix-Draft seit 17.06. unverpusht; an User gespiegelt)

---

### 2026-06-29 — Beobachtung (Erstmessung): Outbound-Segment klein & sehr niedrig-engagiert
**Quelle:** Cron-Lauf 2026-06-29 (weekly) — Clarity Dashboard 7T, Filter `campaign_medium=email`
**Beobachtung:** Outbound-Cold-Mail (seit 25.06. live) erzeugt **21 Sessions/7T (~4,7 % von 446)**. Engagement extrem niedrig: **13 s aktive Zeit, 10,4 % Scrolltiefe, 1,0 Seiten/Sitzung, 0 % Dead-Click**. Conversion-seitig: `sml_landing_page_visit` feuert (LP-Besuche), aber **`sml_booking_click`/`sml_contact_click`/`sml_offers_click` tauchen NICHT in den Custom-Tags-mit-Daten auf → 0 Outbound-Conversions** bisher. Die eine echte Conversion der Woche (`contact_form_submit`, Wert „direct") stammt **nicht** aus dem email-Segment.
**Bewertung:** Für eine erste Kalt-B2B-Woche erwartbar (Benchmark E2E 0,5–2 %, hier noch 0). Die LP `/sml/hr-tipps_2026` ist bereits #2 der Top-Pages (17 Visits/3T), aber Besucher bouncen sofort (13 s, 1 Seite). Hebel liegt auf der LP selbst (sofortiger Wert/CTA above the fold), nicht im Tracking.
**Handlung:** Beobachten — 2 Wochen Laufzeit abwarten, dann LP-Scroll-Heatmap + Recording von `/sml/hr-tipps_2026` prüfen (manuell). Bei weiterhin 0 `sml_booking_click`/`sml_contact_click` trotz ≥50 LP-Sessions: LP-CTA/Above-the-fold überarbeiten.

---

### 2026-06-29 — Trend (Reversal): Edge-Browser-Shift zurückgebildet
**Beobachtungs-Zeitraum:** 22.06. – 29.06.2026 (Clarity API 3T, 100 Sessions)
**Event:** Browser-Verteilung
**Trend:** Edge fällt auf **14 Sessions (~14 %)** — Vorwoche 25 (~24 %). Chrome 55 (~55 %), ChromeMobile 11, MobileSafari 11. Der am 22.06. notierte Edge-Anstieg (mögliches B2B-Signal) hat sich damit **zurückgebildet** (~ -10 pp, unter der 20-pp-Alarmschwelle).
**Ursache (vermutet):** Der Edge-Peak der Vorwoche war wahrscheinlich Wochen-Rauschen, kein struktureller B2B-Shift. Outbound-Traffic (seit 25.06.) bringt eher Mobile/Chrome-Mix (mehr Mobile diese Woche: 19 vs. 12).
**Handlung:** Beobachten — kein Handlungsbedarf. Edge-Anteil als normales Schwanken werten; nur bei erneutem, anhaltendem Anstieg > 20 pp neu bewerten.

---

### 2026-06-22 — Trend (verstärken): Neuer organischer Cluster „Copilot Cowork Abrechnung / Credits"
**Beobachtungs-Zeitraum:** 19.06. – 22.06.2026 (3T-API)
**Event:** Organischer/interner Traffic auf neu aufgestiegene Themen-Seite
**Trend:** `/wissen/copilot-cowork-abrechnung-copilot-credits` ist erstmals **#2 der Top-Pages (16 Visits/3T)** — direkt hinter der Homepage (21) und vor `/workshops` (8), `microsoft-copilot-lizenzen` (7) und `ki-halluzinationen-vermeiden` (7). Die Seite taucht zugleich als **stärkster interner Referrer (13)** auf — sie verteilt also auch Traffic weiter. PageTitle „Copilot Cowork Abrechnung: Copilot Credits ab Juli 2026" bestätigt die Zuordnung.
**Ursache (vermutet):** Aktuelles, zeitgebundenes Thema (Copilot-Credits-Abrechnung ab Juli 2026) trifft Suchintention kurz vor Inkrafttreten. Passt ins GEO-/Aktualitäts-Muster (vgl. Outlook-Tipps- und Claude-in-Copilot-Cluster). **GSC bestätigt** (3M, frisch 22.06.): Query „copilot cowork kosten" ist mit **7 Klicks / 28 Impr.** neu auf Platz #3 der Klick-Bringer — d. h. die Seite zieht echten organischen Such-Traffic, nicht nur internen. CTR auffällig hoch (7/28 = 25 %), aber niedrige Impressionen → Keyword-Set noch ausbaufähig. **Hinweis:** Genau diese TSX (`CopilotCoworkAbrechnungCredits.tsx`) hatte am 17.06. uncommittete lokale Änderungen — Traffic läuft auf der Live-Version.
**Handlung:** Verstärken — (1) Keyword-Breite erhöhen (verwandte Fragen rund um Copilot-Credits/Abrechnung/Preis ab Juli 2026, um die niedrigen Impressionen zu heben); (2) CTA-Brücke (TrainingCTA) auf dieser Seite ergänzen, sobald sie Teil der nächsten Welle wird — sie ist bereits stärkster interner Referrer (13) und damit ein guter Funnel-Einstieg.

---

### 2026-06-22 — Trend (positiv): Dead-Click bleibt unter Schwelle, weiter sinkend
**Beobachtungs-Zeitraum:** 2026-06-15 bis 2026-06-22
**Event:** Dead-Click-Rate (3T-API)
**Trend:** 21,4 % (10.06.) → 9,33 % (15.06.) → **8,65 % (22.06. 3T)** — zweite Woche in Folge unter der 10 %-Eskalationsschwelle, leicht weiter gefallen. Rage-Click, Quick-Back, Excessive-Scroll alle **0 %**. ScriptError-Rate **0 %** (Vorwoche 0,35 % React-Hydration-Fehler) → ebenfalls entspannt.
**Ursache (vermutet):** Der 11.06.-Deploy (CTA-Brücke ohne X-Icon/Overlay) + abnehmendes Gewicht der alten Dead-Click-Treiber-Seite. Der site-weite ArticlePopup-Fix (Draft 17.06.) ist noch **nicht** gepusht — die Entspannung kommt also (noch) nicht von dort.
**Handlung:** Beobachten — kein Eskalations-Cron nötig. ArticlePopup-Fix-Draft bleibt für User-Review offen (kann Dead-Click weiter senken, ist aber nicht mehr dringend).

---

### 2026-06-22 — Beobachtung: Browser-Mix verschiebt sich Richtung Edge (mögliches B2B-/SEA-Signal)
**Quelle:** Cron-Lauf 2026-06-22 (weekly) — Clarity API 3T (104 Sessions)
**Beobachtung:** Edge steigt auf **25 Sessions (~24 %)** — Vorwoche 12 % (9 Sess.). Chrome fällt auf ~40 % (42), Safari 21 % (22). Device PC 91 / Mobile 12, OS Windows 59 / macOS 31. Länder: Deutschland 90 von 104.
**Bewertung:** Edge-Anstieg ist **unter** der 20-pp-Alarmschwelle (Schritt 7d), aber auffällig. Microsoft-Enterprise-Umgebungen nutzen überdurchschnittlich Edge — passt zur B2B-Copilot-Zielgruppe. **Rein organisch:** SEA/Outbound sind (Stand 22.06., lt. User) noch **nicht** gestartet (verzögert), also kein Paid-Effekt. Wahrscheinlich ein organischer B2B-Mix-Shift.
**Handlung:** Beobachten. Sobald SEA tatsächlich startet, gegen die UTM-cpc-Verteilung gegenprüfen — bis dahin als organisches Signal werten.

---

### 2026-06-17 — Issue-Update: Dead-Click-Treiber lokalisiert → Fix vorgeschlagen
**Quelle:** Cron-Lauf 2026-06-17 (`copilotenschule-seo-clarity-fix-copilot-in-outlook-nutzen-tipps`) — Code-Diagnose im Repo (kein Push)
**Betroffene Page:** `/wissen/copilot-in-outlook-nutzen-tipps` (Treiber-Element ist aber **global**)
**Befund:** Die Elemente `svg.lucide.lucide-x[1]` und `DIV.absolute.backdrop-blur-sm[1]` stammen **nicht** aus dem Artikel-TSX, sondern aus der globalen Komponente `src/components/ArticlePopup.tsx` (Lead-Gen-Popup, nach 20 s, via `ContentLayout.tsx:238` auf allen Wissensseiten).
**Korrektur der Hypothese vom 10.06.:** X-Icon **und** Backdrop haben einen funktionierenden `onClick={handleClose}` — das Popup schließt korrekt. Sie sind also **keine** funktionslosen Dead-Ends. Reale Ursachen: (1) das `<X>`-SVG hat kein `pointer-events-none` → Clarity protokolliert den Klick auf dem SVG statt auf dem Button-mit-Handler; (2) 300-ms-Fade in `handleClose` wirkt wie Nicht-Reaktion → Dead-Click-Heuristik + Mehrfachklicks; (3) ~32-px-Hit-Area (unter 44 px); (4) eigentliches Anti-Pattern: auf der Top-Seite ist „Popup schließen" die #1-Aktion (22,86 %).
**Empfohlene Maßnahme:** Code-Diff in `docs/drafts/clarity-fix-copilot-in-outlook-nutzen-tipps.md` — (A) Overlay-Wrapper im Closing `pointer-events-none`; (B) Backdrop dismissibel lassen + `cursor-pointer`/`aria-hidden` (NICHT `pointer-events-none`); (C) X-Button 44×44 px + `<X pointer-events-none>`. Strategisch (separat): sessionStorage-Frequency-Cap + sanfterer Trigger.
**Scope-Warnung:** `ArticlePopup` ist geteilt → Fix wirkt site-weit. Bewusst freigeben.
**Status:** **fix vorgeschlagen** (Draft erstellt, kein Push) — wartet auf User-Review/Umsetzung via GitHub Desktop.

---

### 2026-06-15 — Trend (positiv): Dead-Click unter Schwelle gefallen
**Beobachtungs-Zeitraum:** 2026-06-01 bis 2026-06-15
**Event:** Dead-Click-Rate (3T-API)
**Trend:** 11 % (01.06.) → 19,35 % (09.06.) → 21,4 % (10.06.) → **9,33 % (15.06. 3T)** — erstmals unter 10 %-Schwelle. Dashboard 7T zeigt 15,38 % (44 von 286 Sessions), was den älteren Hochpunkt einschließt.
**Ursache (vermutet):** Der 11.06.-Deploy (Kannibalisierungs-Fix live, CTA-Brücke in src/) hat vermutlich das X-Icon-/Backdrop-Problem auf `/wissen/copilot-in-outlook-nutzen-tipps` entschärft — oder diese Seite verliert Traffic und damit der Dead-Click-Treiber an Gewicht. Klärung: Heatmap-Cron 17.06. prüft.
**Handlung:** Beobachten — 3T-Wert liegt unter Schwelle, kein Eskalations-Cron nötig. Fix-Cron 17.06. (copilotenschule-seo-clarity-fix-copilot-in-outlook-nutzen-tipps) macht Heatmap-Drilldown und schreibt ggf. Fix-Diff oder schließt das Issue.

---

### 2026-06-15 — Issue-Update: Custom-Conversion-Tags jetzt sichtbar
**Quelle:** Cron-Lauf 2026-06-15 (weekly) — Clarity Dashboard 7T
**Vorheriger Status (09.06.):** Custom-Tags (außer trainer_application_submit) erschienen nicht unter ihrem technischen Namen. User-Verifikation empfohlen.
**Neuer Status:** `phone_click` (1), `pdf_download` (1), `mail_click` (1), `contact_form_submit` (1) erscheinen jetzt im Dashboard 7T. Zusätzlich Smart Events: „Kontaktieren Sie uns" (2), „Ausgehender Klick" (2), „Formular absenden" (1).
**Bewertung:** Entweder hat der Filter-Fehler (Smart statt Custom) jetzt korrekt gesetzt, oder echte Conversions sind passiert. Alle Events bei 1 Session — kein KRITISCH-Alarm (Schwelle ≥ 3 → 0). Custom-Tag-Tracking-System funktioniert.
**Status:** ✅ geschlossen — Custom-Tags sind messbar. Baseline für künftige Defekt-Erkennung: alle 6 Events ≥ 1.

---

### 2026-06-10 — Issue: Funnel-Bruch Content→Angebot (gesamtsystemisch)
**Quelle:** Cron-Lauf 2026-06-10 (monthly) — Clarity Dashboard 30T, Funnel „Lead-Reise: SEO → Angebot → Kontakt"
**Betroffene Pages:** alle High-Traffic-Wissensartikel (Top: `/wissen/copilot-in-outlook-nutzen-tipps` 73, `/wissen` 50, `/` 48, `/wissen/claude-in-microsoft-copilot` 36, `/wissen/ki-halluzinationen-vermeiden` 33)
**Symptom:** 297 Sessions (61,9 % von 480) erreichen Funnel-Stufe 1 (Wissensartikel), **0 %** gehen weiter zu Stufe 2 (Trainings/Konfigurator). Seiten/Sitzung = 1,0. Konversionsrate des Funnels 0 %. Funnel-Rate < 2 %-Schwelle massiv unterschritten.
**Hypothese:** SEO bringt Besucher auf einzelne Wissensartikel, aber es fehlt die kontextuelle Brücke zum Angebot — kein In-Content-CTA, kein „Passendes Training"-Block, schwache interne Verlinkung Artikel→Angebot. Besucher lesen genau einen Artikel und verlassen die Seite.
**Empfohlene Maßnahme:** Wiederverwendbare TSX-CTA-Komponente („Passendes Training zu diesem Thema") mittig + am Ende jedes Top-Wissensartikels. Pattern-Transfer.
**Status:** in Umsetzung — **Welle 1 live (24.06.)**, siehe Update unten.

---

### 2026-06-24 — Issue-Update: Funnel-Bruch Content→Angebot — Welle 1 live, erste Bewegung
**Quelle:** Verifikations-Cron `copilotenschule-seo-pattern-transfer-2026-06-24` — Clarity API 3T (198 Sess.) + SSR-Live-Check (Outlook) + Quellcode-Prüfung.
**Maßnahme umgesetzt:** `src/components/TrainingCTA.tsx` live auf den 3 Welle-1-Seiten (Outlook live verifiziert: 2× „Passendes Training" im SSR-HTML, Meta/H1/Canonical unverändert; Excel + Claude im committeten Quellcode an je 2 Touchpoints), zusätzlich auf `/wissen/copilot-cowork-abrechnung-credits`. Rein additiv (Protected-Pages-Regel eingehalten).
**Erste Wirkung:** Seiten/Sitzung **1,0 → 1,12**; Angebotsseiten erhalten Sessions (Trainings-Übersicht 26, Strategie-Workshop 9) → Funnel-Stufe 2 nicht mehr leer. **Custom-Tag `content_cta_click` ist über die Clarity-Export-API nicht abfragbar** → exakte Stufe-1→2-Rate nur im Dashboard-UI prüfbar; dort vor dem Welle-2-Push einmal verifizieren. Keine UX-Regression (Rage 1,01 %, Excessive-Scroll/ScriptError 0 %).
**Status:** beobachten — Welle 2 (5 Artikel inkl. 2 Protected Pages) freigeben; KPI-Ziele Seiten/Sitzung > 1,2 und Stufe 1→2 ≥ 5 % noch offen.

---

### 2026-06-10 — Issue-Update: Dead-Click 21,4 % — Heatmap lokalisiert die Treiber
**Quelle:** Cron-Lauf 2026-06-10 (monthly) — Clarity API 3T (21,37 %) + Dashboard 30T (15,42 %, 74 Sess.) + Heatmap-Drilldown
**Betroffene Page:** `/wissen/copilot-in-outlook-nutzen-tipps` (Top-Seite, 73 Visits/30T; Heatmap 48 Pageviews / 35 Klicks)
**Symptom:** Dead-Click-Rate eskaliert weiter (11,1 → 11 → 19,4 → **21,4 %** 3T). Heatmap-Klickverteilung: **#1 `svg.lucide.lucide-x[1]` = 8 Klicks (22,86 %)**, #2 Textlink „Für die Basic-Funktionen…" 2 (5,71 %), **#3 `DIV.absolute.backdrop-blur-sm[1]` 2 (5,71 %)**.
**Hypothese (jetzt belegt):** Das meistgeklickte Element der Seite ist ein `lucide-x` (Schließen-Icon) ohne sinnvolle Funktion + ein `backdrop-blur`-Overlay-Div, das Klicks abfängt. Beides klassische Nicht-Navigations-Ziele. Eskalation korreliert zeitlich mit dem Aufstieg dieser Seite auf #1.
**Empfohlene Maßnahme:** TSX prüfen — X-Icon funktional machen/entfernen, Backdrop dismissibel machen oder `cursor-default`/`pointer-events-none`.
**Status:** identifiziert — Folge-Cron `copilotenschule-clarity-fix-copilot-in-outlook-nutzen-tipps` (+7 Tage) angelegt.

---

### 2026-06-10 — Trend (verstärken): Zwei neue organische Cluster
**Beobachtungs-Zeitraum:** 27.05. – 10.06.2026
**Event:** Organischer Traffic auf neu aufgestiegene Themen-Seiten
**Trend:** `/wissen/copilot-in-outlook-nutzen-tipps` von ~0 auf **73 Visits/30T (Top-Seite)** · `/wissen/claude-in-microsoft-copilot` auf **36 Visits/30T (#4)**. GSC bestätigt einen breiten „Claude in Copilot"-Long-Tail (Dutzende Varianten) + „Copilot in Outlook"-Queries. Clarity-LLM-Referrer aktiv (ChatGPT 1/3T; Vorwoche 9/7T).
**Ursache (vermutet):** GEO-/Content-Sog — Schnellantwort-Blöcke + kundenorientierte FAQ + aktuelle Themen (Claude-in-Copilot, Outlook-Praxis) werden organisch und von LLMs aufgegriffen.
**Handlung:** Verstärken — diese Cluster im Content-Block (B3) priorisieren UND zuerst die Conversion-Brücke einbauen (sonst verpufft der Traffic, siehe Funnel-Issue oben).

---

### 2026-06-09 — Issue-Update: Dead-Click-Rate eskaliert auf 19,4 %
**Quelle:** Cron-Lauf 2026-06-09 (weekly) — Clarity API 3T (19,35 %) + Dashboard 7T (19,38 %, 44 Sessions)
**Betroffene Page:** Top-Pages 7T — `/wissen/copilot-in-outlook-nutzen-tipps` (45 Visits, neu #1), `/` (21), `/wissen/ki-halluzinationen-vermeiden` (17)
**Symptom:** Dead-Click-Rate von 11 % (01.06.) auf 19,4 % gestiegen — fast verdoppelt, deutlich über Schwelle ≥ 10 %. In beiden Messquellen konsistent (API 3T = 19,35 %, Dashboard 7T = 19,38 %), also kein Messartefakt.
**Hypothese:** Die neu aufgestiegene Top-Page `/wissen/copilot-in-outlook-nutzen-tipps` (von ~0 auf 45 Visits) ist wahrscheinlicher Treiber des Anstiegs — vermutlich ein Element, das wie ein Link/Button aussieht, aber keiner ist (Icon, nicht-verlinktes Bild, CTA-Padding außerhalb des `<a>`-Tags). Bestehende Hypothese vom 01.06. (nicht-verlinkte Logos/Icons auf `/`) gilt weiter.
**Empfohlene Maßnahme:** Clarity-Heatmap für `/wissen/copilot-in-outlook-nutzen-tipps` und `/` öffnen, Dead-Click-Cluster lokalisieren, betroffenes TSX-Element fixen (Klick-Zone vergrößern oder Non-Link-Element als `cursor-default` markieren). Priorität erhöht — Wert nähert sich 20 %.
**Status:** identifiziert — eskaliert

---

### 2026-06-09 — Trend-Reversal: Google holt Top-Referrer-Position zurück
**Beobachtungs-Zeitraum:** 02.06. – 09.06.2026
**Event:** Organischer Suchmaschinen-Traffic (Referrer)
**Trend:** 7T-Referrer (Clarity): Google 120 (+ google.de 2 = 122), interner Traffic 30, Perplexity 6, NortonSafeSearch 4, Teams-CDN 3, ChatGPT 2, Bing 2, google.de 2, Claude.ai 1, Ecosia 1. **DuckDuckGo komplett aus der Top-Liste verschwunden** (Vorwoche noch #1 mit 40 Sessions). Google dominiert jetzt klar.
**Ursache (vermutet):** Der DuckDuckGo-Spike der Vorwoche war wahrscheinlich ein einmaliger Bing/IndexNow-Crawl-Effekt, kein Strukturtrend. Die DuckDuckGo-These vom 01.06. ist damit entkräftet. Google-Indexierung steigt langsam (44 % → 47 %) und liefert wieder den Großteil des organischen Traffics.
**Handlung:** Beobachten — keine Überreaktion auf einzelne Wochenwerte. Google bleibt strategischer Fokus, IndexNow weiter nach jedem Deploy.

---

### 2026-06-09 — Beobachtung: LLM-Referrer aktiv + Custom-Tag-Conversion-Lücke
**Quelle:** Cron-Lauf 2026-06-09 (weekly), Clarity Dashboard 7T
**Beobachtung 1 (positiv — GEO):** Erstmals messbarer LLM-Referrer-Traffic: Perplexity 6, ChatGPT 2, Claude.ai 1 = **9 Sessions/7T aus KI-Suchmaschinen**. Bestätigt die LLM-Sichtbarkeit (GEO-Score 82). → Verstärken: GEO-freundliche Bausteine (Schnellantwort-Blöcke, kundenorientierte FAQs) zahlen sich aus, beim Content-Block weiter einsetzen.
**Beobachtung 2 (Issue — Tracking):** Von 6 definierten Custom-Conversion-Tags feuert nur `trainer_application_submit` (1 Session). `contact_form_submit`, `konfigurator_submit`, `mail_click`, `phone_click`, `pdf_download` erscheinen NICHT unter ihrem technischen Namen im Dashboard. Clarity-Auto-Smart-Events zeigen dagegen „Kontaktieren Sie uns" (4) + „Formular absenden" (1) → Kontakt-Conversions passieren real, werden aber von den Custom-Tags nicht erfasst.
**Hypothese:** Custom-Event-Tags (außer `trainer_application_submit`) sind evtl. nicht korrekt deployt oder feuern nicht. KEIN automatischer Defekt-Alarm möglich, da dies die erste vollständige Conversion-Event-Messung ist (kein ≥ 3 → 0-Baseline vorhanden).
**Empfohlene Maßnahme:** User-Verifikation — Custom-Tag-Code auf `/kontakt` (Formular), Trainings-Konfigurator, `mailto:`/`tel:`-Links und PDF-Downloads prüfen. Tag-Implementierung ggf. nachziehen, damit künftige Conversion-Raten valide gemessen werden.
**Status:** identifiziert — User-Verifikation empfohlen

---

### 2026-06-01 — Issue: Dead-Click-Rate 11 % (persistent)
**Quelle:** Cron-Lauf 2026-06-01 (weekly)
**Betroffene Page:** Hauptsächlich Top-3-Pages (/, /wissen, /wissen/bessere-entscheidungen-mit-ki — zusammen 47 von 100 Sessions)
**Symptom:** Dead-Click-Rate 11 % (3T-Durschnitt via API) — liegt über Schwelle ≥ 10 %. Bereits am 28.05.2026 erste Messung: 11,11 %. Persistentes Problem, nicht einmalig.
**Hypothese:** Wahrscheinlichste Ursachen: (1) Navigationselemente die wie Links aussehen, aber keine sind (z.B. nicht-verlinkte Logos/Icons). (2) CTAs die optisch klickbar wirken, aber Dead-Zones haben (Padding außerhalb des `<a>`-Tags). (3) Scrollbar-Elemente die für klickbar gehalten werden. Top-Pages mit 15-16 Sessions sind `/` und `/wissen` — hier zuerst prüfen.
**Empfohlene Maßnahme:** Clarity Heatmap für `/` und `/wissen/bessere-entscheidungen-mit-ki` öffnen, Dead-Click-Clustering identifizieren. Dann: betroffenes Element in TSX-Datei finden, Klick-Zone vergrößern oder Non-Link-Element als `cursor-default` markieren.
**Status:** identifiziert

---

### 2026-06-01 — Trend: DuckDuckGo überholt Google als Top-Referrer
**Quelle:** Cron-Lauf 2026-06-01 (weekly), Clarity API 3T-Daten
**Beobachtungs-Zeitraum:** 29.05. – 01.06.2026 (erste Clarity-Langmessung)
**Event:** Organischer Suchmaschinen-Traffic
**Trend:** DuckDuckGo: 40 Sessions | Google: 18 Sessions | Direct: 23 Sessions
DuckDuckGo liefert 2,2× mehr Traffic als Google im gemessenen Zeitraum.
**Ursache (vermutet):** DuckDuckGo nutzt Bing-Index. IndexNow (bereits im Deploy aktiv per A5) hat Bing schneller gecrawlt als Google. Zielgruppe (B2B, IT-affin, datenschutzbewusst) bevorzugt möglicherweise DuckDuckGo/Edge. EdgeMobile mit 47 % ist dominanter Browser — passt zu Microsoft-Unternehmensumgebung.
**Handlung:** Verstärken — IndexNow-Pings weiterhin nach jedem Deploy. Bing Webmaster Tools beobachten. Google Indexierung bleibt strategisch wichtig (GSC Maßnahmen weiterführen).
