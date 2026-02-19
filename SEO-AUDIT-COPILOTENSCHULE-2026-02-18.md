# SEO & Traffic Audit – copilotenschule.de
**Datum:** 18. Februar 2026
**Status:** Umfassende Analyse aller offenen Baustellen

---

## 1. Ist-Zustand auf einen Blick

| Metrik | Wert | Bewertung |
|--------|------|-----------|
| Indexierte Seiten | 20 von 63 | Kritisch (32%) |
| Nicht indexiert | 43 Seiten | Hauptproblem |
| Klicks (3 Monate) | 6 | Sehr niedrig |
| Impressionen (3 Monate) | 1.161 | Ausbaufähig |
| Ø CTR | 0,5% | Unter Durchschnitt |
| Ø Position | 16,6 | Seite 2 |
| Core Web Vitals | Keine Daten | Zu wenig Traffic |
| Backlinks | Keine sichtbar | Kritisch |
| Domain Authority | Sehr niedrig (neue Domain) | Hauptbremse |

---

## 2. Kritische Probleme (Sofort-Maßnahmen)

### 2.1 URL-Splitting: Alte URLs ohne /wissen/-Prefix

**Problem:** Google trackt noch URLs OHNE /wissen/-Prefix:
- `copilotenschule.de/copilot-fehler-vermeiden` (6 Impressionen)
- `copilotenschule.de/copilot-fehler-vermeiden/` (14 Impressionen)
- `copilotenschule.de/github-copilot` (16 Imp.) + `/github-copilot/` (17 Imp.)
- `copilotenschule.de/ki-agenten` (24 Imp.) + `/ki-agenten/` (2 Imp.)
- `copilotenschule.de/prompt-engineering` (7 Imp.) + `/prompt-engineering/` (11 Imp.)

**Auswirkung:** Die wenigen Impressionen werden auf 2-3 URL-Varianten verteilt statt auf eine kanonische URL gebündelt. Google weiß nicht, welche die "richtige" ist.

**Maßnahme:**
1. **301-Redirects** in `.htaccess` einrichten: Alle alten Pfade ohne `/wissen/` auf die korrekte URL weiterleiten
   - `/copilot-fehler-vermeiden` → `/wissen/copilot-fehler-vermeiden`
   - `/github-copilot` → `/wissen/github-copilot`
   - `/ki-agenten` → `/wissen/ki-agenten`
   - `/prompt-engineering` → `/wissen/prompt-engineering`
   - Gleiches für alle anderen Wissensartikel
2. Sicherstellen, dass die React-App auf diesen alten Pfaden KEINEN Content liefert (oder sofort redirected)
3. **Trailing-Slash-Fix** wurde bereits deployed – sollte das Slash-Problem langfristig lösen

**Priorität: HOCH – Sofort umsetzen**

### 2.2 Nur 20 von 63 Seiten indexiert (32%)

**Aufschlüsselung der 43 nicht-indexierten Seiten:**

**A) "Gefunden – zurzeit nicht indexiert" (30 Seiten)**
Google hat diese URLs in der Sitemap/Links gefunden, aber noch nicht gecrawlt. Betrifft:
- Alle 13 Trainingsseiten (/trainings/*)
- 4 Hauptseiten (/impressum, /trainer-werden, /training-konfigurator, /trainer/martin-lang)
- 3 Navigationsseiten (/ueber-uns, /unsere-angebote, /wissen)
- 10 Wissensartikel (die neuesten)

**Ursache:** Neue Domain mit geringem Crawl-Budget. Google priorisiert crawlen anderer Seiten.

**Maßnahme:**
- Alle 30 URLs manuell in GSC via URL-Prüfung einreichen (analog zu den 24 Wissensartikeln, die wir bereits eingereicht haben)
- Besonders wichtig: Trainingsseiten und Hauptseiten (/unsere-angebote, /wissen)

**B) "Gecrawlt – zurzeit nicht indexiert" (12 Seiten)**
Google hat diese Seiten besucht, sich aber ENTSCHIEDEN, sie nicht zu indexieren. Alle 12 sind /wissen/-Artikel, gecrawlt am 17.02.2026.

**Ursache:** Google bewertet die Seiten (noch) als nicht wertvoll genug für den Index. Mögliche Gründe:
- Zu wenig externe Signale (Backlinks, Social Shares)
- Eventuell als "thin content" eingestuft
- Neue Domain ohne Vertrauensbasis

**Maßnahme:**
- Content-Qualität der 12 Artikel prüfen und ggf. ausbauen
- Interne Verlinkung verbessern (→ siehe Punkt 3.2)
- Geduld: Nach Backlink-Aufbau werden diese Seiten nachindexiert

**C) "Seite mit Weiterleitung" (1 Seite)**
- `http://copilotenschule.de/` → Weiterleitung zu HTTPS-Version
- **Kein Problem** – das ist erwartetes Verhalten (HTTP→HTTPS Redirect)

**Priorität: MITTEL – Trainingsseiten in GSC einreichen, Content stärken**

### 2.3 Homepage dominiert alle Impressionen

**Problem:** 1.013 von 1.161 Impressionen (87%) gehen auf die Homepage. Die Wissensartikel und Trainingsseiten bekommen kaum Sichtbarkeit.

**Ursache:**
- Die meisten Seiten sind noch nicht indexiert
- Die Homepage rankt für generische Begriffe ("microsoft", "copilot") auf hinteren Positionen

**Maßnahme:**
- Fokus auf Indexierung aller Seiten (→ 2.2)
- Long-Tail Keywords für Artikel optimieren, die weniger Wettbewerb haben

---

## 3. Wichtige Optimierungen (Mittelfristig)

### 3.1 Backlink-Aufbau (Größte Wachstumsbremse)

**Ist-Zustand:** Keine sichtbaren Backlinks. Die Domain hat praktisch keine Autorität.

**Warum das DAS Hauptproblem ist:** Ohne Backlinks stuft Google die Domain als nicht vertrauenswürdig ein. Das erklärt:
- Ø Position 16,6 (Seite 2) trotz relevanter Inhalte
- "Gecrawlt – nicht indexiert" für 12 Seiten
- Niedriges Crawl-Budget (30 Seiten noch nicht gecrawlt)

**Maßnahmen (priorisiert):**

1. **Branchenverzeichnisse & Trainingsportale**
   - Springest.de (bereits angelegt? Tab war offen)
   - semigator.de, weiterbildungsfinder.de, kursfinder.de
   - IHK-Weiterbildungsdatenbanken
   - Microsoft Partner Directory

2. **Gastbeiträge & Fachpublikationen**
   - Artikel auf t3n.de, heise.de, computerwoche.de anbieten
   - LinkedIn-Fachartikel mit Backlinks
   - Medium/Dev.to Artikel (für GitHub Copilot Themen)

3. **PR & Pressemitteilungen**
   - Pressemitteilung zu Launch der Copilotenschule
   - Lokale Wirtschaftspresse (Startup-/Gründerszene)

4. **Partnerschaften**
   - Microsoft MVP / Partner Program Listing
   - Kooperationen mit Unternehmen (Case Studies mit Backlink)
   - Hochschul-Kooperationen

5. **Content-Marketing mit Linkbait**
   - Kostenlose Tools (ROI-Rechner ist gut – mehr davon!)
   - Studien/Umfragen zu Copilot-Nutzung in DACH
   - Infografiken zur Copilot-Adoption

**Priorität: HOCH – Langfristig wichtigste Maßnahme**

### 3.2 Interne Verlinkung optimieren

**Problem:** Die Artikel verlinken wahrscheinlich nicht ausreichend untereinander und auf die Trainingsseiten.

**Maßnahmen:**
- Jeden Wissensartikel mit 3-5 internen Links zu anderen relevanten Artikeln versehen
- Jeder Artikel sollte auf 1-2 passende Trainingsseiten verlinken
- Trainingsseiten sollten auf relevante Wissensartikel verlinken
- "Ähnliche Artikel" / "Weiterlesen"-Sektion am Ende jedes Artikels
- Breadcrumb-Navigation (bereits vorhanden ✓)

**Priorität: MITTEL – Einfach umsetzbar, gute Wirkung**

### 3.3 Homepage H1-Problem

**Problem:** Die Homepage hat 9 H1-Tags statt einem einzigen.
- Haupt-H1: "Fokussiert auf Microsoft Copilot Trainings" (stimmt nicht mit dem Title-Tag überein)

**Maßnahme:**
- Nur ein H1-Tag auf der Homepage
- H1 sollte das Haupt-Keyword enthalten und zum Title-Tag passen
- Alle anderen H1 auf H2 oder H3 ändern

**Priorität: MITTEL**

---

## 4. Quick Wins (Leicht umsetzbar)

### 4.1 Trainingsseiten in GSC einreichen
Die 13 Trainingsseiten + 7 Hauptseiten (gesamt 20 URLs) in der GSC URL-Prüfung manuell zur Indexierung einreichen. Voraussichtlich 2 Tage Arbeit (GSC-Tageslimit ~10-12 URLs).

### 4.2 Bestehende Suchbegriffe optimieren
Top-Suchbegriffe mit Impressionen aber Position >10:
- "copilot training" (71 Imp.)
- "copilot schulung" (24 Imp.)
- "copilot workshop" (22 Imp.)
- "microsoft copilot kurs" (21 Imp.)
- "microsoft copilot schulung" (19 Imp.)

→ Gezielt die Seiten optimieren, die für diese Begriffe ranken (Hauptseite + Trainingsübersicht)

### 4.3 IndexNow für alle Seiten
Nach jeder Änderung IndexNow-Ping senden (Bing & Partner). Google-Seiten über GSC einreichen.

### 4.4 Google Business Profile
Falls noch nicht vorhanden: Google Business Profile anlegen für lokale Sichtbarkeit als Trainingsanbieter.

---

## 5. Langfristige Strategie

### 5.1 Content-Plan für organischen Traffic
- Keywords mit niedrigem Wettbewerb gezielt bespielen
- "Copilot + [Branche]" Artikel (z.B. "Copilot für Anwälte", "Copilot im Gesundheitswesen")
- Vergleichsartikel ("Copilot vs. ChatGPT für Unternehmen")
- How-To Guides für spezifische Use Cases

### 5.2 Wettbewerbspositionierung
**Hauptkonkurrenten:** Kebel, medienreich, IT-Schulungen.com, GFU Cyrus AG, Haufe-Akademie
**Vorteil copilotenschule.de:** Einziger spezialisierter Copilot-Trainingsanbieter in DACH
**Strategie:** Nische verteidigen durch Expertise-Content, Zertifizierungen, Case Studies

### 5.3 Social Signals
- Regelmäßige LinkedIn-Posts mit Links zu Wissensartikeln
- YouTube-Tutorials/Shorts zu Copilot-Themen
- Newsletter mit Traffic auf die Website

---

## 6. Priorisierter Aktionsplan

| # | Maßnahme | Aufwand | Impact | Zeitrahmen |
|---|----------|---------|--------|------------|
| 1 | 301-Redirects für alte URLs ohne /wissen/ | 1h | Hoch | Sofort |
| 2 | Homepage: H1-Tags bereinigen (nur 1x H1) | 30min | Mittel | Sofort |
| 3 | 20 fehlende URLs in GSC einreichen | 2 Tage | Hoch | Diese Woche |
| 4 | Interne Verlinkung zwischen Artikeln stärken | 2-3h | Mittel | Diese Woche |
| 5 | Branchenverzeichnisse eintragen (Springest, Semigator etc.) | 1 Tag | Hoch | Diese Woche |
| 6 | Google Business Profile anlegen | 1h | Mittel | Diese Woche |
| 7 | Trainingsseiten-Content anreichern | 1-2 Tage | Mittel | Nächste Woche |
| 8 | Gastbeiträge/PR starten | Laufend | Sehr hoch | Ab sofort |
| 9 | LinkedIn Content-Strategie | Laufend | Mittel | Ab sofort |
| 10 | Long-Tail Content für neue Keywords | Laufend | Hoch | Fortlaufend |

---

## 7. Zusammenfassung

Die **drei größten Hebel** für mehr Traffic sind:

1. **Indexierung sicherstellen** – 68% der Seiten sind nicht im Google-Index. Ohne Index = kein Traffic. Die URL-Redirects und GSC-Einreichungen sind der erste Schritt.

2. **Backlinks aufbauen** – Die Domain hat keine externe Autorität. Selbst wenn alle Seiten indexiert sind, ranken sie ohne Backlinks auf Seite 2+. Branchenverzeichnisse und Gastbeiträge sind die schnellsten Wege.

3. **Ranking-Positionen verbessern** – Die Site rankt bereits für relevante Keywords (copilot training, copilot schulung), aber auf Ø Position 16,6. Jeder Sprung von Seite 2 auf Seite 1 multipliziert den Traffic ~10x.

Die gute Nachricht: Die technische Basis (Meta-Tags, Structured Data, Pre-Rendering) ist solide. Der Content ist relevant und gut strukturiert. Es fehlt hauptsächlich an **externen Signalen** (Backlinks, Verzeichniseinträge, PR) und **Indexierungsabdeckung**.
