# SEO Content Differentiator

Prevents duplicate content penalties by systematically differentiating cloned site from template. Rewrites meta tags, restructures intro paragraphs, varies internal linking patterns. Preserves legal/boilerplate sections but rephrases to avoid exact matches. Optimizes for primary keyword (e.g., 'ChatGPT Training' vs 'Copilot Training').

## Max Iterations
30

## SEO-Strategie

### A) Meta Tags (MUST be unique per site)

- **Title Tags:** Neue Formulierung mit Primary Keyword
  - Template: "Microsoft Copilot Schulung | Copilotenschule"
  - Clone: "ChatGPT Training fuer Unternehmen | ChatGPT-Trainings.de"

- **Meta Descriptions:** Komplett neu schreiben (140-160 Zeichen)
  - Template: "Professionelle Microsoft Copilot Schulungen..."
  - Clone: "Entdecken Sie massgeschneiderte ChatGPT Trainings..."

- **H1 Headlines:** Andere Struktur, gleiches Thema
  - Template: "Ihre Copilot Experten in Koeln"
  - Clone: "ChatGPT Schulungen vom Experten-Team"

### B) Content-Anpassungen

- **Intro-Paragraphen:** Andere Satzstellung, Synonyme
  - Passive → Aktiv, Satzreihenfolge aendern

- **Call-to-Actions:** Neue Formulierungen
  - Template: "Jetzt Copilot Beratung anfragen"
  - Clone: "ChatGPT Training buchen"

- **Internal Links:** Neue Anchor-Texte
  - Template: "Mehr ueber Copilot Features"
  - Clone: "Details zu ChatGPT Funktionen"

### C) Strukturelle Differenzierung

- **URL-Struktur beibehalten** (SEO-freundlich), aber:
  - `/wissen/` → Inhalte spaeter neu (jetzt leer)
  - `/leistungen/` → Andere Reihenfolge der Abschnitte

- **Robots.txt & Sitemap.xml:** Sofort anpassen
  - Sitemap URLs auf neue Domain
  - Robots.txt: `Sitemap: https://[domain]/sitemap.xml`

### D) Was gleich bleiben darf (aber umformuliert)

- **Impressum:** Gleiche Firma, aber andere Satzstellung
- **Datenschutz:** Rechtlich identisch, aber Absatzreihenfolge aendern
- **Autor-Bio:** Gleiche Person, aber in dritter statt erster Person schreiben

### E) Bilder & Assets

- **Logos/Bilder:** Erst einmal alle Template-Bilder behalten
- **Alt-Texte:** Fuer SEO anpassen (Primary Keyword statt Copilot erwaehnen)
- **Dateinamen:** Optional umbenennen (`copilot-feature.jpg` → `chatgpt-feature.jpg`)

## Technische Umsetzung

Durchsuche alle `.html`, `.jsx`, `.tsx`, `.vue` Files nach:
- `<title>`, `<meta name="description">`, `<h1>`
- Hardcoded Text-Bloecke in Components
- Alle Referenzen zu "Copilot", "copilotenschule", "Copilotenschule"

## Validation

- Max. 20% identischer Text zwischen Template und Clone
- Keine exakt identischen Saetze > 15 Woerter

## Output
- `SEO_DIFF_REPORT.md` mit allen Aenderungen dokumentieren

## Best Practices
- Erstelle Backup vor Content-Aenderungen
- Arbeite File-by-File fuer granulare Kontrolle
- Nutze diff-Tools zur Validierung der Aenderungen
