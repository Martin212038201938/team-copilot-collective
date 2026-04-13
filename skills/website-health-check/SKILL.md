---
name: website-health-check
description: |
  Website Health Check mit Dashboard und täglichem Monitoring. Prüft Performance,
  Indexierung (GSC, Bing), SEO, Canonicals, Keywords, LLM-Sichtbarkeit und
  Wettbewerber. Dashboard mit Trendgraphen, roten Warnungen bei Verschlechterungen.
  TRIGGER: Website-Check, Health Check, Performance-Check, SEO-Audit, Indexierung,
  "wie performen meine Seiten", "sind alle Seiten indexiert", "Webseiten prüfen",
  "Site Health", "GSC Daten", "Bing Webmaster", "Core Web Vitals",
  "LLM Sichtbarkeit", "werden meine Seiten von ChatGPT gefunden",
  "täglicher Report", "Website Dashboard", "Monitoring". Erweiterbar für neue Domains.
  Konfiguriert für copilotenschule.de, chatgpt-trainings.de, yellow-boat.com.
---

# Website Health Check & Dashboard

Dieser Skill führt einen umfassenden Gesundheitscheck für konfigurierte
Websites durch und generiert ein Dashboard mit historischen Trends. Er ist
für den täglichen automatisierten Einsatz als Scheduled Task konzipiert,
kann aber auch manuell ausgeführt werden.

## Übersicht der Check-Module

Der Health Check besteht aus 7 Modulen, die nacheinander abgearbeitet werden.
Jedes Modul sammelt Daten und speichert sie in einer täglichen JSON-Datei.
Am Ende generiert das Dashboard-Skript eine HTML-Datei mit Graphen und
Empfehlungen.

| Modul | Was es prüft | Wie |
|-------|-------------|-----|
| 1. Technische Performance | Core Web Vitals, Ladezeit, Mobile-Friendliness | PageSpeed Insights API (kostenlos) |
| 2. Indexierung & Crawling | Indexierte Seiten, Crawl-Fehler, Sitemaps | Google Search Console (Browser), Bing Webmaster Tools (Browser) |
| 3. On-Page SEO | Meta-Tags, Überschriften, Canonical, Structured Data | WebFetch + Analyse |
| 4. Keyword-Rankings | Position für Ziel-Keywords bei Google und Bing | WebSearch |
| 5. LLM-Sichtbarkeit | Zitierung in ChatGPT, Claude, Perplexity | WebSearch + WebFetch |
| 6. Wettbewerber-Vergleich | Rankings der Wettbewerber für gleiche Keywords | WebSearch |
| 7. Verfügbarkeit & Basics | HTTP-Status, SSL, Redirect-Ketten | WebFetch |

## Konfiguration

Die Konfiguration liegt in:
`~/Documents/Claude/website-health-check/config.json`

Lies die Datei `references/config-reference.md` für das vollständige Schema.

### Neue Domain hinzufügen

Um eine neue Website zu überwachen, einfach einen neuen Eintrag im
`sites`-Array der config.json ergänzen. Mindestangabe ist die `domain`.
Keywords und Wettbewerber können leer starten und werden beim ersten
Durchlauf automatisch ermittelt.

```json
{
  "domain": "neue-seite.de",
  "priority": "medium",
  "keywords": [],
  "competitors": [],
  "gsc_property": "https://neue-seite.de/"
}
```

## Datenspeicherung

Alle Daten werden unter `~/Documents/Claude/website-health-check/data/`
gespeichert:

```
data/
├── copilotenschule.de/
│   ├── 2026-03-12.json       ← Täglicher Snapshot
│   ├── 2026-03-11.json
│   └── ...
├── chatgpt-trainings.de/
│   └── ...
├── yellow-boat.com/
│   └── ...
├── history.json              ← Aggregierte Zeitreihe (schneller Zugriff)
└── marketing-actions.json    ← Log von Marketing-Aktionen für Korrelation
```

### Täglicher Snapshot (Schema)

Jeder tägliche Snapshot enthält die Ergebnisse aller Module. Lies
`references/data-schema.md` für das vollständige JSON-Schema.

### Marketing-Aktionen tracken

Die Datei `marketing-actions.json` enthält ein Array von Aktionen, die der
User dokumentiert, z.B.:

```json
[
  {
    "date": "2026-03-10",
    "domain": "copilotenschule.de",
    "action": "Neuer Blogartikel: Copilot für Führungskräfte",
    "category": "content",
    "url": "/wissen/copilot-fuehrungskraefte"
  }
]
```

Das Dashboard zeigt diese Aktionen als vertikale Marker in den Trendgraphen,
damit sichtbar wird, welche Maßnahmen welche Wirkung hatten.

## Workflow: Vollständiger Health Check

### Vorbereitung

1. **Config laden:** Lies `~/Documents/Claude/website-health-check/config.json`.
   Falls die Datei nicht existiert, erstelle sie aus dem Template in
   `references/config-reference.md` mit den Standard-Domains.

2. **Historische Daten laden:** Lies `data/history.json` falls vorhanden.
   Diese Datei enthält die aggregierten Metriken der letzten 90 Tage für
   schnelle Trendvergleiche.

3. **Verzeichnisse sicherstellen:** Erstelle fehlende Domain-Unterordner
   in `data/`.

### Modul 1: Technische Performance

**⚠️ WICHTIG — PageSpeed Insights API ist unzuverlässig:**
Die kostenlose Google PageSpeed Insights API hat ein winziges Tageskontingent
und liefert regelmäßig HTTP 429 ("Quota exceeded"). Verlasse dich NICHT auf sie
als einzige Methode. Verwende **immer Methode 1 (HTTP-basiert)** als Primärquelle
und Methode 2 (PageSpeed) nur wenn sie zufällig funktioniert.

#### Methode 1: HTTP-basierte Messung — PRIMÄR (immer verfügbar)

```python
import requests, time

def measure_performance(url):
    start = time.time()
    r = requests.get(url, timeout=20, allow_redirects=True,
                     headers={"User-Agent": "Mozilla/5.0 (compatible; HealthCheck/1.0)"})
    ttfb_ms = r.elapsed.total_seconds() * 1000
    total_ms = (time.time() - start) * 1000
    return {
        "ttfb_ms": round(ttfb_ms),
        "total_ms": round(total_ms),
        "html_size_kb": round(len(r.content) / 1024, 1),
        "http_status": r.status_code,
        "server": r.headers.get("server", "unknown"),
        "cache_control": r.headers.get("cache-control", "MISSING — empfehlen zu setzen!"),
    }
```

Alternativ per curl (für schnellen Check):
```bash
curl -s -o /dev/null -w "Status: %{http_code}\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" https://DOMAIN/
```

Extrahiere und bewerte:
- **TTFB** (Time to First Byte):
  - ✅ Gut: < 200ms → `status: "good"`
  - 🟡 Needs Improvement: 200–800ms → `status: "needs_improvement"`
  - 🔴 Poor: > 800ms → `status: "poor"` — KRITISCH, sofort handeln!
- **HTML-Größe**: > 200KB ist ein Warnsignal (ungezippte Übertragung)
- **Cache-Control**: Fehlt? → Empfehlen es zu setzen
- **HTTP-Status**: Muss 200 sein

Ausführliche Dokumentation: `references/performance-fallback.md`

#### Methode 2: PageSpeed Insights API — SEKUNDÄR (oft 429-Fehler)

Versuche zusätzlich (aber rechne mit Fehlschlag):
```
WebFetch: https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://DOMAIN/PFAD&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo
```

Bei HTTP 429: Im Snapshot `"performance_score": null` und
`"note": "PageSpeed API quota exhausted"` setzen — kein Problem, die
HTTP-Metriken reichen für Trending-Vergleiche vollständig aus.

Falls verfügbar, extrahiere:
- **Performance Score** (0-100), **LCP** (Ziel: < 2.5s),
  **INP** (Ziel: < 200ms), **CLS** (Ziel: < 0.1),
  **Accessibility Score**, **SEO Score**

#### Gesamtbewertung:
- 🟢 Grün: TTFB < 200ms UND (falls PageSpeed verfügbar) alle CWV gut
- 🟡 Gelb: TTFB 200–800ms ODER ein CWV im "needs improvement" Bereich
- 🔴 Rot: TTFB > 800ms (egal was PageSpeed sagt)

### Modul 2: Indexierung & Crawling

Dieses Modul arbeitet agentisch mit dem Chrome Browser.

**Google Search Console:**

1. Navigiere zu `https://search.google.com/search-console` im Chrome Browser.
2. Wähle die Property für die aktuelle Domain.
3. Gehe zu "Seiten" (Pages) → lese die Anzahl indexierter und nicht
   indexierter Seiten.
4. Prüfe unter "Seiten" die Liste der Fehler (nicht indexiert, Crawl-Fehler,
   Redirect-Probleme).
5. Gehe zu "Leistung" (Performance) → extrahiere Klicks, Impressionen,
   durchschnittliche CTR und Position der letzten 7 Tage.
6. Prüfe den Abdeckungsbericht auf:
   - "Gecrawlt – derzeit nicht indexiert"
   - "Erkannt – derzeit nicht indexiert"
   - "Seite mit Weiterleitung"
   - "Duplikat – eingereichte URL nicht als kanonisch ausgewählt"

**Bing Webmaster Tools:**

1. Navigiere zu `https://www.bing.com/webmasters/` im Chrome Browser.
2. Wähle die Domain.
3. Lese die Indexierungszahlen und ggf. Crawl-Fehler.
4. Extrahiere Search Performance Daten (Klicks, Impressionen).

**Sitemap-Abgleich:**

1. Hole die Sitemap: `WebFetch: https://DOMAIN/sitemap.xml`
2. Zähle die URLs in der Sitemap.
3. Vergleiche mit der Anzahl indexierter Seiten aus GSC.
4. Falls Differenz > 10%: als Problem markieren.

**Dynamische Inhalte prüfen:**

Für Seiten, die als "nicht indexiert" gemeldet werden:
1. Lade die Seite im Chrome Browser.
2. Vergleiche den sichtbaren Content mit dem, was `WebFetch` liefert.
3. Falls WebFetch weniger Inhalt zeigt → die Seite nutzt vermutlich
   clientseitiges Rendering und Suchmaschinen sehen den Inhalt nicht.
   Das ist ein kritisches Problem.

### Modul 3: On-Page SEO

Für jede Unterseite in der Sitemap:

1. Prüfe die Seite auf On-Page SEO Elemente:

   **WICHTIG zur H1-Prüfung:** WebFetch konvertiert HTML zu Markdown und
   kann dabei Überschriften-Ebenen verfälschen (z.B. `<h2>` wird zu
   `# Heading` im Markdown). Deshalb für die H1-Zählung **NIEMALS** den
   Markdown-Output von WebFetch verwenden! Stattdessen das echte HTML
   prüfen, z.B. per Bash:
   ```bash
   curl -s "https://DOMAIN/PFAD" | grep -oci '<h1'
   ```
   Nur wenn dieser Wert != 1 ist, liegt ein H1-Problem vor.

   Prüfpunkte (WebFetch für alle außer H1-Zählung):
   - Hat die Seite einen `<title>` Tag? Ist er 30-60 Zeichen lang?
   - Hat sie eine `<meta name="description">`? Ist sie 120-155 Zeichen?
   - Gibt es genau ein `<h1>`? (Zählung NUR per curl/Raw-HTML, s.o.!)
   - Ist ein `<link rel="canonical">` gesetzt? Zeigt er auf sich selbst?
   - Gibt es `hreflang`-Tags falls mehrsprachig?
   - Schema.org Markup vorhanden?

2. Prüfe Canonical-Konsistenz:
   - Canonical URL muss exakt mit der tatsächlichen URL übereinstimmen
   - Kein Trailing-Slash-Mismatch
   - Kein HTTP/HTTPS-Mismatch
   - Kein www/non-www Mismatch

3. Bewerte jede Seite mit einem SEO-Score (0-100) basierend auf den
   gefundenen Problemen.

### Modul 4: Keyword-Rankings

1. Falls die Domain noch keine Keywords in der Config hat, ermittle sie:
   - Analysiere die Seitentitel und H1-Überschriften aller Seiten
   - Extrahiere die wichtigsten Themen
   - Generiere 10-15 Ziel-Keywords pro Domain
   - Speichere sie in der Config

2. Für jedes Keyword:
   - Suche via `WebSearch` bei Google: `"KEYWORD" site:DOMAIN`
   - Prüfe ob die Domain in den ersten 20 Ergebnissen erscheint
   - Notiere Position und welche URL rankt
   - Suche auch ohne `site:` um die absolute Position zu ermitteln

3. Vergleich mit Vortag: Position besser/schlechter/gleich.

### Modul 5: LLM-Sichtbarkeit

Dieser Check prüft, ob und wie die Websites von Large Language Models
referenziert werden.

**Zitierungs-Check:**

1. Suche via `WebSearch` nach Begriffen wie:
   - `"copilotenschule.de" AI citation`
   - `"chatgpt-trainings.de" recommendation`
   - Thematische Suchen: `"Microsoft Copilot Training Deutschland"` und
     prüfe ob die Domain in AI-generierten Snippets auftaucht

**GEO-Readiness-Check:**

Für jede Seite prüfen (via WebFetch):
1. **Strukturierte Daten:** Ist Schema.org Markup vorhanden, das LLMs
   nutzen können? (Article, Course, FAQPage, HowTo, Organization)
2. **Klare Fakten-Blöcke:** Gibt es Absätze die prägnante, zitierbare
   Aussagen enthalten?
3. **FAQ-Sektionen:** Frage-Antwort-Paare, die LLMs direkt verwenden können?
4. **Autorität-Signale:** E-E-A-T-Elemente (Autoren-Bio, Quellenangaben)?
5. **robots.txt:** Werden AI-Crawler blockiert? (GPTBot, ClaudeBot, etc.)

Bewertung als GEO-Score (0-100) pro Seite.

### Modul 6: Wettbewerber-Vergleich

1. Falls noch keine Wettbewerber konfiguriert sind, ermittle sie:
   - Suche nach den Top-Keywords der Domain
   - Identifiziere die Top 3-5 Domains, die regelmäßig ranken
   - Speichere sie in der Config

2. Für die Top-5-Keywords jeder Domain:
   - Vergleiche die eigene Position mit den Wettbewerbern
   - Notiere wer auf Position 1-3 rankt

3. Erstelle eine Competitive-Gap-Analyse: Bei welchen Keywords rangieren
   Wettbewerber besser?

### Modul 7: Verfügbarkeit & Basics

1. Für jede Domain:
   - `WebFetch` die Startseite → HTTP-Status OK?
   - SSL-Zertifikat gültig?
   - Redirect-Kette: Wird von HTTP auf HTTPS weitergeleitet?
     Von www auf non-www (oder umgekehrt)?
   - Ist die Weiterleitung ein 301 (permanent)?

2. Prüfe die wichtigsten Unterseiten auf Erreichbarkeit.

### Daten speichern

Nach Abschluss aller Module:

1. Erstelle den täglichen Snapshot als JSON unter
   `data/DOMAIN/YYYY-MM-DD.json`

2. Aktualisiere `data/history.json` mit den Schlüsselmetriken:
   - Performance Score, LCP, CLS, INP
   - Indexierte Seiten (Google, Bing)
   - Durchschnittliches Keyword-Ranking
   - Klicks und Impressionen
   - GEO-Score
   - SEO-Score

### Dashboard generieren

Führe das Dashboard-Skript aus:
```bash
python3 scripts/generate_dashboard.py \
  --config ~/Documents/Claude/website-health-check/config.json \
  --data-dir ~/Documents/Claude/website-health-check/data/ \
  --output ~/Documents/Claude/website-health-check/dashboard.html
```

Das Dashboard enthält:

**Header-Bereich:**
- Datum des letzten Checks
- Ampel-Übersicht pro Domain (grün/gelb/rot)

**Pro Domain eine Sektion mit:**

1. **Performance-Karte:** Core Web Vitals als Gauge-Charts mit Trend-Pfeilen
2. **Indexierungs-Status:** Balkendiagramm indexiert vs. nicht-indexiert,
   Trend-Linie über Zeit
3. **Keyword-Rankings:** Tabelle mit Position, Veränderung (▲▼), URL
4. **LLM-Sichtbarkeit:** GEO-Score Gauge, Zitierungs-Status
5. **Wettbewerber-Vergleich:** Radar-Chart oder Balkendiagramm

**Trend-Graphen:**
- Liniendiagramme für alle Zeitreihen-Metriken (30/60/90 Tage)
- Marketing-Aktionen als vertikale gestrichelte Linien mit Labels
- Signifikante Verschlechterungen rot hervorgehoben

**Signifikanz-Erkennung:**
Eine Veränderung gilt als signifikant wenn sie:
- Mehr als 2 Standardabweichungen vom 14-Tage-Durchschnitt abweicht
- Oder einen absoluten Schwellwert überschreitet (z.B. PageSpeed-Score
  fällt um >10 Punkte, Keyword verliert >5 Positionen)

**Empfehlungen:**
- Priorisierte Liste von Handlungsempfehlungen (Kritisch → Mittel → Niedrig)
- Jede Empfehlung mit betroffener Domain, Seite und konkretem Fix

## Manueller vs. automatisierter Modus

**Manuell:** Der User fragt nach einem Health Check. Der Skill führt alle
Module durch, zeigt Ergebnisse im Chat und generiert das Dashboard.

**Automatisiert (Scheduled Task):** Läuft täglich. Sammelt Daten, generiert
Dashboard, und erstellt einen kurzen Zusammenfassungs-Report als Textdatei.
Bei kritischen Problemen wird dies prominent im Report hervorgehoben.

## Ersteinrichtung

Beim allerersten Durchlauf:

1. Config erstellen aus Template (siehe `references/config-reference.md`)
2. Verzeichnisstruktur anlegen
3. Keywords automatisch ermitteln (Modul 4)
4. Wettbewerber automatisch ermitteln (Modul 6)
5. Ersten vollständigen Check durchführen als Baseline
6. Dashboard generieren
7. Config mit ermittelten Keywords und Wettbewerbern aktualisieren

## Tool-Empfehlungen für den User

Für den vollen Funktionsumfang empfehle ich dem User, folgende kostenlose
Accounts anzulegen (Details in `references/setup-guide.md`):

- **Google Search Console** (bereits vorhanden) — Indexierung, Crawling, Klicks
- **Bing Webmaster Tools** (bereits vorhanden) — Bing-Indexierung
- **Google PageSpeed Insights** — Kein Account nötig, offene API
- **Google Analytics 4** (optional) — Für Traffic-Daten im Dashboard
- **Bing URL Submission API** (optional) — Automatische URL-Einreichung

## Hinweise zur Erweiterbarkeit

Der Skill ist so gebaut, dass neue Domains einfach über die config.json
hinzugefügt werden können. Der gesamte Workflow iteriert über das `sites`-Array,
sodass keine Code-Änderungen nötig sind. Auch die Dashboard-Generierung
skaliert automatisch mit der Anzahl der Domains.
