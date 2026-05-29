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

## Aktive Funnels in Clarity

### Lead-Reise: SEO → Angebot → Kontakt
**Angelegt:** 27. Mai 2026 (Clarity-Trichter)
**Zweck:** Klassischer SEO-zu-Anfrage-Funnel für copilotenschule.de
**Steps:**
1. **Wissens-Artikel besucht (SEO-Einstieg)** — URL enthält `/wissen/`
   - Hypothese: Lead findet uns über Google-Suche auf einem Fachartikel
2. **Angebot angeschaut (Trainings/Konfigurator)** — URL enthält `/trainings`
   - Hypothese: Lead interessiert sich für unsere Leistungen
3. **Kontakt-Anfrage (Lead-Conversion)** — URL enthält `/kontakt`
   - Hypothese: Lead bewegt sich auf die Kontaktseite, um anzufragen

**Auswertungs-Fragen für Cron-Jobs:**
- Wo bricht die Mehrheit ab? Step 1→2 oder Step 2→3?
- Welche Wissens-Artikel führen am häufigsten in Step 2 (Conversion-Power)?
- Welche /trainings-Variante (CopilotCockpit, GitHubCopilot, …) konvertiert am besten in Step 3?
- Drop-off-Quote vs. Branchenschnitt SaaS-B2B: 2-5% E2E ist normal

**Wichtig:** Funnel-Auswertung NUR möglich, wenn ein Wissensartikel besucht wurde. Direkt-Traffic auf `/` ist NICHT im Funnel — das ist Absicht (SEO-Pfad isolieren).

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
