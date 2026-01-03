# 🤖 AI-Powered Content Generator

Automatische Generierung von **professionell tiefgehenden, fachlich exzellenten** Wissensseiten aus YouTube-Transkripten oder Texten unter Verwendung von OpenAI GPT-4.

## 🚀 NEU: Professionelle Qualität statt Generischer Content

**Das wurde verbessert (Januar 2026):**

Der Content Generator wurde grundlegend überarbeitet, um Artikel zu erstellen, die sich **fundamental von generischem AI-Content unterscheiden**:

### Was ist anders?

**VORHER (Alte Version):**
- ❌ 2.000-2.500 Wörter, oft zu kurz und oberflächlich
- ❌ Generische Phrasen und Marketing-Sprache
- ❌ Fehlender Fokus auf das Hauptthema
- ❌ Wenig konkrete Use Cases
- ❌ Oberflächliche technische Details
- ❌ 7-9 FAQs mit kurzen Antworten

**NACHHER (Neue Version):**
- ✅ 3.000-5.000 Wörter mit substantiellem Inhalt
- ✅ Professionelle Sprache, technische Präzision
- ✅ Laser-Fokus auf das identifizierte Hauptthema
- ✅ MINIMUM 3-5 konkrete Use Cases pro Sektion
- ✅ Technische Tiefe: APIs, Architekturen, Konfigurationen
- ✅ 10-15 umfassende FAQs (80-150 Wörter pro Antwort)
- ✅ **NEU**: Automatische Recherche aktueller Informationen (2025)
- ✅ **NEU**: Automatische Qualitätsprüfung (Länge, Struktur, generische Phrasen)
- ✅ **NEU**: Optimiert für Zitierbarkeit durch ChatGPT, Gemini, Claude

### Warum diese Änderungen?

Artikel müssen sich von der Flut generischer AI-Inhalte abheben durch:
1. **Fachliche Exzellenz**: Technische Tiefe, die Experten schätzen
2. **Praxisrelevanz**: Konkrete Use Cases für den beruflichen Alltag
3. **Aktualität**: Recherchierte Informationen zu neuesten Features
4. **LLM-Zitierbarkeit**: Optimiert für AI Answer Engines (ChatGPT, Perplexity, etc.)

## ✨ Features

- **🚀 Vollautomatisch**: Aus Transkript wird komplette TSX-Komponente
- **✏️ AI-gestützte Bearbeitung**: Bestehende Artikel per Prompt überarbeiten (Schwerpunkt ändern, Fakten ergänzen, etc.)
- **🎯 Professionelle Tiefe**: KEIN generischer Content - fachlich tiefgehende Artikel mit 3.000-5.000 Wörtern
- **🔍 Intelligente Recherche**: Automatische Integration aktueller Informationen (Stand 2025)
- **💼 Praxisrelevanz**: Minimum 3-5 Use Cases pro Sektion für den beruflichen Alltag
- **📊 LLM-optimiert**: Dual Schema.org (Article + FAQPage), optimal für Zitierbarkeit durch ChatGPT, Gemini, etc.
- **⚡ Performance**: Optimierte React-Komponenten, < 2.5s Ladezeit
- **🔒 Sicher**: API Key in .env.local, automatischer Kill-Switch
- **📝 E-E-A-T Excellence**: Experience, Expertise, Authoritativeness, Trustworthiness auf professionellem Niveau
- **✅ Qualitätssicherung**: Automatische Checks für Länge, Struktur und generische Phrasen
- **⏱️ Realistische Lesezeit**: Präzise Berechnung basierend auf tatsächlichem Textinhalt (260 Wörter/Min)
- **🎨 Design**: Tailwind CSS, responsive, visuelle Hierarchie
- **📅 Publishing-Ready**: Automatisch scheduled für nächsten Dienstag

## 🛠️ Setup

### 1. API Key konfigurieren

Der OpenAI API Key ist bereits in `.env.local` gespeichert:

```bash
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=16000
OPENAI_TEMPERATURE=0.7
```

**WICHTIG**: `.env.local` ist in `.gitignore` und wird NICHT ins Repository committed.

### 🔒 Automatischer Kill-Switch

**Zum Schutz vor übermäßigen Kosten durch Fehler oder Endlosschleifen:**

- **Tägliches Limit**: 3,00 EUR
- **Max. Requests/Minute**: 10 (Schutz vor Schleifen)
- **Max. Requests/Stunde**: 50 (Schutz vor Massenverarbeitung)

Bei Überschreitung: **Sofortiger Stop aller API-Anfragen**

```bash
# Kosten-Statistiken anzeigen
npm run cost:stats

# Tracking wird automatisch durchgeführt
# Automatischer Reset um Mitternacht
```

**Siehe [SECURITY.md](../SECURITY.md) für Details.**

### 2. Dependencies

Dependencies sind bereits installiert via `npm install`:

- `openai` - OpenAI API Client
- `dotenv` - Environment Variables

## 📖 Verwendung

### Option 1: Interaktiver Modus (empfohlen)

```bash
npm run generate:interactive
```

Das Script bietet jetzt **zwei Modi**:

#### 1️⃣ NEUEN ARTIKEL ERSTELLEN

Wählen Sie Option [1] im interaktiven Modus:

1. Transkript-Quelle wählen (Datei oder direktes Einfügen)
2. Optional: Zusätzliche Anweisungen eingeben
3. Optional: Aktuelle Informationen recherchieren (j/N)
4. Automatische Generierung mit OpenAI GPT-4
5. Automatische Qualitätsprüfung
6. Automatisches Speichern als TSX + Draft JSON

#### 2️⃣ BESTEHENDEN ARTIKEL BEARBEITEN ✨ NEU!

Wählen Sie Option [2] im interaktiven Modus:

1. Artikel aus Liste auswählen oder Pfad angeben
2. Aktuelle Statistiken werden angezeigt (Länge, Wortzahl)
3. Bearbeitungs-Anweisungen eingeben
4. AI überarbeitet den Artikel gemäß Ihren Vorgaben
5. Qualitätsprüfung und Bestätigung
6. Optional: Änderungen speichern

**Beispiel-Anweisungen für Bearbeitung:**
- "Füge mehr Use Cases für die Healthcare-Branche hinzu"
- "Verschiebe den Schwerpunkt auf Enterprise-Features"
- "Ergänze technische Details zur API-Integration"
- "Füge Vergleiche mit Microsoft Teams hinzu"
- "Erweitere die FAQ-Sektion um Datenschutz-Fragen"

**Beispiel-Session (NEUER ARTIKEL):**

```bash
$ npm run generate:interactive

🎨 AI Content Generator - Interactive Mode

Möchten Sie [1] Neuen Artikel erstellen oder [2] Bestehenden Artikel bearbeiten? (1/2): 1

Transkript-Datei (oder "paste" für direktes Einfügen): transcripts/teams-tutorial.txt

Zusätzliche Anweisungen (optional, Enter überspringen): Fokus auf Collaboration Features

Aktuelle Informationen recherchieren? (j/N): j

🔍 Recherchiere aktuelle Informationen zum Thema...
📌 Thema:
✅ Recherche abgeschlossen
📊 Tokens verwendet: 1543

🤖 Generiere professionell tiefgehende Wissensseite mit OpenAI GPT-4...
📊 Transkript-Länge: 12543 Zeichen
📝 Prompt-Länge: 48234 Zeichen
⏳ Bitte warten, dies kann 60-120 Sekunden dauern (umfangreicher Artikel)...

✅ Content erfolgreich generiert!
📊 Generierte Code-Länge: 26847 Zeichen
💰 Tokens verwendet: 18234
   - Prompt: 10234
   - Completion: 8000

📊 QUALITÄTSPRÜFUNG:
✅ Länge: 3842 Wörter (ausgezeichnet!)
✅ Alle Qualitätschecks bestanden!

📋 Generierte Metadaten:
   Titel: Microsoft Teams Collaboration - Professioneller Praxis-Guide
   Slug: microsoft-teams-collaboration-praxis-guide
   Lesezeit: 14 Minuten
   Publikation: 07.01.2026

✅ TSX gespeichert: src/pages/MicrosoftTeamsCollaborationGuide.tsx
✅ Draft JSON gespeichert: content/drafts/microsoft-teams-collaboration-guide.json
✅ Public Draft gespeichert: public/content/drafts/microsoft-teams-collaboration-guide.json

🎉 Content erfolgreich generiert und gespeichert!

Nächste Schritte:
1. Überprüfe die generierte Komponente
2. Teste die Vorschau im Admin-Dashboard
3. Passe bei Bedarf Details an
4. Commit und Push zum Repository
```

**Beispiel-Session (ARTIKEL BEARBEITEN):** ✨ NEU!

```bash
$ npm run generate:interactive

🎨 AI Content Generator - Interactive Mode

Möchten Sie [1] Neuen Artikel erstellen oder [2] Bestehenden Artikel bearbeiten? (1/2): 2

✏️  ARTIKEL-BEARBEITUNGS-MODUS

Verfügbare Artikel:
  [1] MicrosoftCopilotEinsteigerGuide.tsx
  [2] MicrosoftCopilotMemoryGuide.tsx
  [3] GitHubCopilot.tsx
  ...

Datei-Nummer oder vollständiger Pfad: 1

📄 Geladener Artikel: MicrosoftCopilotEinsteigerGuide.tsx
📊 Aktuelle Länge: 45234 Zeichen
📖 Aktuelle Wortzahl: 2847 Wörter

💡 Beispiel-Anweisungen:
  - "Füge mehr Use Cases für die Healthcare-Branche hinzu"
  - "Verschiebe den Schwerpunkt auf Enterprise-Features"
  - "Ergänze technische Details zur API-Integration"
  - "Füge Vergleiche mit Microsoft Teams hinzu"
  - "Erweitere die FAQ-Sektion um Datenschutz-Fragen"

Bearbeitungs-Anweisungen: Füge 5 konkrete Use Cases für Finance-Unternehmen hinzu und erweitere die FAQ um Compliance-Fragen

✏️  Bearbeite Artikel mit AI-Unterstützung...
📊 Artikel-Länge: 45234 Zeichen
📝 Anweisungen: Füge 5 konkrete Use Cases...
📝 Prompt-Länge: 52143 Zeichen
⏳ Bitte warten, dies kann 60-90 Sekunden dauern...

✅ Artikel erfolgreich überarbeitet!
📊 Neue Code-Länge: 58432 Zeichen
💰 Tokens verwendet: 19234
   - Prompt: 11234
   - Completion: 8000

📊 QUALITÄTSPRÜFUNG:
✅ Länge: 3542 Wörter (ausgezeichnet!)
✅ Alle Qualitätschecks bestanden!

📋 Aktualisierte Metadaten:
   Titel: Microsoft 365 Copilot - Der komplette Einsteiger-Guide 2025
   Slug: microsoft-365-copilot-der-komplette-einsteiger-guide-2025
   Lesezeit: 14 Min. Lesezeit

Änderungen speichern? (j/N): j

✅ Artikel gespeichert: src/pages/MicrosoftCopilotEinsteigerGuide.tsx
✅ Draft JSON aktualisiert: content/drafts/microsoft-365-copilot-der-komplette-einsteiger-guide-2025.json
✅ Public Draft aktualisiert: public/content/drafts/microsoft-365-copilot-der-komplette-einsteiger-guide-2025.json

🎉 Artikel erfolgreich bearbeitet und gespeichert!

Nächste Schritte:
1. Überprüfe die überarbeitete Komponente
2. Teste die Vorschau im Admin-Dashboard
3. Commit und Push zum Repository
```

### Option 2: CLI-Modus mit Datei

```bash
npm run generate transcripts/mein-transkript.txt
```

Oder mit zusätzlichen Anweisungen:

```bash
npm run generate transcripts/mein-transkript.txt "Fokus auf Enterprise Features"
```

### Option 3: Direkter Node-Aufruf

```bash
node scripts/generate-content.js transcripts/mein-transkript.txt
node scripts/generate-content.js --interactive
```

## 📂 Eingabe-Formate

Das Script akzeptiert:

- **Plain Text** (.txt)
- **Markdown** (.md)
- **SRT Untertitel** (.srt)
- **VTT Untertitel** (.vtt)
- **Direktes Einfügen** (im interaktiven Modus)

**Empfohlene Transkript-Struktur:**

```
[Video Titel]
[Datum/Quelle]

Transkript:
...Ihr Transkript-Text hier...

Wichtige Punkte:
- Punkt 1
- Punkt 2
```

## 🎨 Was wird generiert?

### 1. TSX-Komponente (`src/pages/[ComponentName].tsx`)

Vollständige React/TypeScript Komponente mit:

- ✅ Alle notwendigen Imports (ContentLayout, SEOHead, etc.)
- ✅ Table of Contents (7-9 Sektionen)
- ✅ Dual Schema.org Markup (Article + FAQPage)
- ✅ SEO Meta-Tags (Title, Description, Keywords, Canonical)
- ✅ 8-12 Minuten Lesezeit (~2.000-3.500 Wörter)
- ✅ FAQ-Sektion mit 8-10 Fragen
- ✅ Visuelle Elemente (Cards, Gradient-Boxen, Icons)
- ✅ Best Practices, Do's/Don'ts
- ✅ Praxis-Beispiele und Schritt-für-Schritt Anleitungen
- ✅ Call-to-Action am Ende

### 2. Draft JSON (`content/drafts/[slug].json`)

Metadaten für das Redaktionssystem:

```json
{
  "id": "microsoft-teams-guide",
  "title": "Microsoft Teams - Der komplette Guide",
  "description": "...",
  "content": "IMPORTED FROM TSX FILE",
  "contentType": "code",
  "codeFileName": "MicrosoftTeamsGuide.tsx",
  "publishDate": "2025-11-19T09:00:00.000Z",
  "author": "martin-lang",
  "category": "Microsoft 365",
  "slug": "microsoft-teams-guide",
  "keywords": [...],
  "readTime": "9 Minuten",
  "icon": "🤖",
  "status": "scheduled"
}
```

### 3. Public Draft (`public/content/drafts/[slug].json`)

Kopie für Frontend-Zugriff im Admin-Dashboard.

## 🎯 Qualitätskriterien - PROFESSIONELL TIEFGEHEND

Das verbesserte Script erstellt Artikel, die sich fundamental von generischem AI-Content unterscheiden:

### 1. THEMATISCHER FOKUS
- ✅ Präzise Identifikation des Hauptthemas aus dem Transkript
- ✅ Artikel konzentriert sich ausschließlich auf das Kernthema
- ✅ Jede Sektion beleuchtet das Hauptthema aus anderem Blickwinkel
- ❌ KEINE Abschweifungen zu tangentialen Themen

### 2. PROFESSIONELLE TIEFE
- ✅ MINIMUM 400-600 Wörter pro Hauptsektion
- ✅ Technische Details, API-Namen, Versionsangaben
- ✅ Erklärung von "Warum" und "Wie", nicht nur "Was"
- ✅ Architektur-Verständnis und technische Zusammenhänge
- ❌ KEINE Marketing-Phrasen oder oberflächliche Beschreibungen

### 3. PRAXISRELEVANZ
- ✅ MINIMUM 3-5 konkrete Use Cases pro Hauptsektion
- ✅ Branchenspezifische Beispiele (Finance, Healthcare, Manufacturing)
- ✅ Rollenspezifische Szenarien (IT-Admin, Developer, Business User)
- ✅ Schritt-für-Schritt Anleitungen mit konkreten Schritten
- ✅ Echte Prompt-Beispiele, Code-Snippets, Konfigurationen
- ✅ Messbare Ergebnisse (ROI, Zeitersparnis, Effizienz)

### 4. SUBSTANTIELLE LÄNGE
- ✅ Ziel: 3.000-5.000 Wörter (10-15 Minuten Lesezeit)
- ✅ Qualität und Tiefe über Kürze
- ✅ FAQ-Sektion: 10-15 Fragen mit jeweils 80-150 Wörtern
- ❌ KEINE Verkürzungen, die Artikel generisch machen

### 5. LLM-ZITIERBARKEIT
- ✅ Extractable Facts: Jede Information als eigenständiger Fakt
- ✅ Definitive Antworten auf spezifische Fragen
- ✅ Strukturierte Daten: Listen, Tabellen, Vergleichsmatrizen
- ✅ Zitierbare Aussagen für ChatGPT, Gemini, Claude
- ✅ Entity-reich: Vollständige Namen statt Pronomen

### 6. PROFESSIONELLE VERGLEICHE
- ✅ Alternativen und Konkurrenzprodukte diskutiert
- ✅ Ehrliche Bewertung von Pros & Cons
- ✅ Klare Guidance: Wann nutzen, wann nicht
- ✅ Integrations- und Migrations-Überlegungen

### 7. AKTUELLE RECHERCHE
- ✅ Optional: Automatische Recherche aktueller Informationen (2025)
- ✅ Neueste Features, Updates, Beta-Funktionen
- ✅ Verweise auf offizielle Quellen und Roadmaps

### 8. AUTOMATISCHE QUALITÄTSPRÜFUNG
- ✅ Minimum 2.500 Wörter (Warnung < 3.000)
- ✅ Check auf generische AI-Phrasen
- ✅ Validierung von Schema.org Markup
- ✅ Prüfung von FAQ-Sektion und Table of Contents

### 9. AI-GESTÜTZTE ARTIKEL-BEARBEITUNG ✨ NEU!
- ✅ Bestehende Artikel per Prompt überarbeiten
- ✅ Schwerpunkt verschieben (z.B. von Basics zu Enterprise)
- ✅ Zusätzliche Fakten oder Use Cases ergänzen
- ✅ Branchenspezifische Inhalte hinzufügen
- ✅ FAQ-Sektion erweitern
- ✅ Vergleiche mit Alternativen hinzufügen
- ✅ Strukturelle Integrität bleibt erhalten (TSX, Schema.org, etc.)

### 10. REALISTISCHE LESEZEIT-BERECHNUNG ✨ NEU!
- ✅ Basiert auf tatsächlichem Textinhalt (nicht Code-Länge)
- ✅ 260 Wörter/Minute für deutsche Texte
- ✅ Entfernt automatisch TSX-Markup für präzise Zählung
- ✅ Zeigt realistische Lesezeit für Benutzer an

### 11. E-E-A-T EXCELLENCE
- **Experience**: "In Projekten mit Enterprise-Kunden...", spezifische Zahlen
- **Expertise**: Technische Tiefe, API-Details, Performance-Metriken
- **Authoritativeness**: Microsoft Docs, Whitepapers, Case Studies
- **Trustworthiness**: Transparente Limitationen, bekannte Issues

### 12. VISUELLE HIERARCHIE
- Gradient-Boxen für wichtige Konzepte
- Border-left Highlights für Callouts
- Cards für Use Cases und Vergleiche
- Code-Blöcke mit Syntax-Highlighting
- Responsive Design mit Tailwind CSS

## 💰 Kosten

**OpenAI GPT-4o Pricing (Stand Januar 2025):**

- Input: $2.50 per 1M tokens
- Output: $10.00 per 1M tokens

**Typische Kosten pro generierter Seite (MIT Recherche):**

- Research: ~1.500 tokens = ~$0.02
- Prompt: ~10.000 tokens = ~$0.025
- Completion: ~8.000 tokens = ~$0.08
- **Total: ~$0.125 pro Seite**

**Typische Kosten pro generierter Seite (OHNE Recherche):**

- Prompt: ~10.000 tokens = ~$0.025
- Completion: ~8.000 tokens = ~$0.08
- **Total: ~$0.105 pro Seite**

**Bei 10 Seiten/Monat: ~$1.25/Monat (mit Recherche)**

**Typische Kosten für Artikel-Bearbeitung:**

- Prompt: ~12.000 tokens = ~$0.03
- Completion: ~8.000 tokens = ~$0.08
- **Total: ~$0.11 pro Bearbeitung**

**Hinweis**: Die höheren Kosten reflektieren die deutlich verbesserte Qualität:
- 2-3x längerer Content (3.000-5.000 Wörter statt 2.000)
- Professionelle Tiefe statt generischer Content
- Recherchierte aktuelle Informationen
- Substantielle Use Cases und Praxisbeispiele
- AI-gestützte Bearbeitung für kontinuierliche Verbesserung

## 🔧 Anpassungen

### Prompt anpassen

Bearbeite `scripts/generate-content.js`, Funktion `buildPrompt()`:

```javascript
function buildPrompt(transcript, userInstructions = '') {
  return `Du bist ein Experte für...

  # WICHTIGE ANFORDERUNGEN
  ...

  # DEINE AUFGABE
  ...`;
}
```

### Model wechseln

In `.env.local`:

```bash
OPENAI_MODEL=gpt-4o        # Standard (empfohlen)
OPENAI_MODEL=gpt-4-turbo   # Schneller, etwas günstiger
OPENAI_MODEL=gpt-4         # Original GPT-4
```

### Token-Limit anpassen

In `.env.local`:

```bash
OPENAI_MAX_TOKENS=24000  # Standard (neu: höher für umfangreichere Artikel)
OPENAI_MAX_TOKENS=16000  # Kürzere Seiten
OPENAI_MAX_TOKENS=32000  # Sehr lange, detaillierte Seiten (teurer)
```

### Temperature anpassen

In `.env.local`:

```bash
OPENAI_TEMPERATURE=0.6   # Standard (neu: etwas niedriger für fachliche Präzision)
OPENAI_TEMPERATURE=0.3   # Sehr deterministisch, faktisch
OPENAI_TEMPERATURE=0.8   # Etwas kreativer (aber nicht zu hoch für professionelle Inhalte)
```

## 📊 Workflow

### Kompletter Workflow: Von Transkript zu Published Page

1. **Transkript vorbereiten**
   ```bash
   # YouTube-Video transkribieren (mit Tools wie yt-dlp, whisper, etc.)
   # Oder: Manuelle Transkripte erstellen
   # Speichern in: transcripts/mein-video.txt
   ```

2. **Content generieren**
   ```bash
   npm run generate:interactive
   # Wähle [1] Neuen Artikel erstellen
   # Folge den Anweisungen
   ```

3. **Review & ggf. AI-gestützte Nachbearbeitung** ✨ NEU!
   ```bash
   # Öffne die generierte Datei in deinem Editor
   code src/pages/GenerierteKomponente.tsx

   # Prüfe:
   # - Ist der Inhalt korrekt?
   # - Klingen die Texte authentisch?
   # - Sind die FAQs relevant?
   # - Funktionieren alle Links?

   # Falls Verbesserungen nötig sind:
   npm run generate:interactive
   # Wähle [2] Bestehenden Artikel bearbeiten
   # Gib konkrete Anweisungen (z.B. "Füge Use Cases für Healthcare hinzu")
   ```

4. **Vorschau im Admin**
   ```bash
   npm run dev
   # Öffne http://localhost:5173/admin
   # Wähle deinen Draft
   # Klicke "Vorschau"
   ```

5. **Feintuning (optional)**
   - Passe Formulierungen an
   - Füge zusätzliche Beispiele hinzu
   - Optimiere FAQ-Antworten
   - Ergänze visuelle Elemente

6. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: Neue Wissensseite - [Titel]"
   git push
   ```

7. **Automatische Publikation**
   - GitHub Actions prüft jeden Dienstag 9:00 Uhr
   - Draft mit `publishDate` <= heute wird automatisch published
   - Route wird in App.tsx hinzugefügt
   - Seite ist live auf der Website

## 🔍 Troubleshooting

### "OPENAI_API_KEY nicht gefunden"

**Problem**: .env.local existiert nicht oder ist falsch konfiguriert

**Lösung**:
```bash
# Prüfe, ob .env.local existiert
ls -la .env.local

# Falls nicht, erstelle sie
echo 'OPENAI_API_KEY=sk-proj-...' > .env.local
```

### "OpenAI API Error: Insufficient quota"

**Problem**: API Key hat kein Guthaben mehr

**Lösung**:
- Gehe zu https://platform.openai.com/account/billing
- Füge Zahlungsmethode hinzu
- Lade Guthaben auf

### "Error: Cannot find module 'openai'"

**Problem**: Dependencies nicht installiert

**Lösung**:
```bash
npm install
```

### "Generated code is incomplete"

**Problem**: Token-Limit zu niedrig

**Lösung**:
```bash
# In .env.local erhöhen
OPENAI_MAX_TOKENS=20000
```

### "Content sounds too generic"

**Problem**: Prompt oder Temperature nicht optimal

**Lösung**:
- Füge spezifischere Anweisungen hinzu im interaktiven Modus
- Senke Temperature auf 0.5 für faktischeren Output
- Füge konkrete Beispiele aus dem Transkript als Context hinzu

## 📚 Best Practices

### 1. Transkript-Qualität

**Do's:**
- ✅ Strukturierte Transkripte mit klaren Abschnitten
- ✅ Wichtige Punkte hervorheben
- ✅ Technische Begriffe korrekt schreiben
- ✅ Zeitstempel für wichtige Stellen

**Don'ts:**
- ❌ Komplett unstrukturierte Wall of Text
- ❌ Viele Füllwörter ("ähm", "also", etc.)
- ❌ Unklare oder fehlerhafte Begriffe

### 2. Zusätzliche Anweisungen

**Effektive Anweisungen:**
```
"Fokus auf Enterprise-Features und Governance"
"Zielgruppe: IT-Administratoren, technisch versiert"
"Viele Code-Beispiele und API-Integrationen"
"Vergleich zu Konkurrenzprodukten wichtig"
```

**Weniger effektiv:**
```
"Mach es gut"
"Schreib viel"
"Sei kreativ"
```

### 3. Review-Checklist

Nach der Generierung prüfen:

- [ ] Titel und Description passend?
- [ ] Keywords relevant und vollständig?
- [ ] Table of Contents sinnvoll strukturiert?
- [ ] FAQ-Fragen beantworten echte User-Fragen?
- [ ] Texte klingen authentisch, nicht AI-generiert?
- [ ] Technische Details korrekt?
- [ ] Links funktionieren?
- [ ] Schema.org Markup vollständig?
- [ ] Call-to-Action am Ende sinnvoll?

### 4. Batch-Generierung

Für mehrere Seiten:

```bash
# Erstelle Script für Batch-Processing
for transcript in transcripts/*.txt; do
  npm run generate "$transcript"
  sleep 5  # Pause zwischen API-Calls
done
```

## 🚀 Erweiterte Nutzung

### Custom Workflow mit Node.js

```javascript
import { generateContent, generateMetadata, saveContent } from './scripts/generate-content.js';

const transcript = `...dein Transkript...`;
const instructions = "Fokus auf Advanced Features";

// Generiere Content
const component = await generateContent(transcript, instructions);

// Generiere Metadaten
const metadata = generateMetadata(component, transcript);

// Passe Metadaten an
metadata.publishDate = "2025-12-01T09:00:00.000Z";
metadata.keywords.push("Custom Keyword");

// Speichern
saveContent(component, metadata);
```

### Integration in andere Tools

Das Script kann auch als Modul importiert werden:

```javascript
import { generateContent } from './scripts/generate-content.js';

// In deinem eigenen Tool
const content = await generateContent(myTranscript);
```

## 📈 Roadmap

Geplante Features:

- [ ] Web-UI für Content-Generierung (statt CLI)
- [ ] Batch-Processing mit Queue
- [ ] Multi-Model Support (GPT-4, Claude, Gemini)
- [ ] A/B-Testing: Multiple Varianten generieren
- [ ] SEO-Score-Berechnung für generierten Content
- [ ] Automatisches Image-Generation (DALL-E Integration)
- [ ] Direkte YouTube-Integration (URL → Transkript → Seite)
- [ ] Kosten-Tracking Dashboard

## 🤝 Support

Bei Problemen oder Fragen:

1. Prüfe diese README
2. Schaue in die Logs (`console.log` Ausgaben)
3. Teste mit kleinerem Transkript
4. Kontaktiere das Team

---

**Happy Generating! 🎉**
