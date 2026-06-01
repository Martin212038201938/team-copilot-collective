# Clarity-Insights — Conversion-Patterns für copilotenschule.de

**Lebendes Dokument** — Cron-Jobs pflegen dieses File. Hier sammeln sich die Pattern-Erkenntnisse aus Microsoft Clarity, die wir auf andere Seiten übertragen oder gegen UX-Probleme einsetzen können.

**Letzter automatischer Update:** noch nie (Datei initial angelegt 27. Mai 2026)

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
