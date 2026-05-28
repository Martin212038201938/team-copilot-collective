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

## Logs (neueste oben — automatisch von Cron-Jobs gepflegt)

<!-- ab hier ergänzen Cron-Jobs ihre Befunde -->
