# 🤖 AI-Powered Content Generator

Automatische Generierung von hochwertigen, AI-optimierten Wissensseiten aus YouTube-Transkripten oder Texten unter Verwendung von OpenAI GPT-4.

## ✨ Features

- **🚀 Vollautomatisch**: Aus Transkript wird komplette TSX-Komponente
- **🎯 Nicht-generisch**: Authentische Texte, keine AI-Floskeln
- **📊 AI-optimiert**: Dual Schema.org (Article + FAQPage), SEO-ready
- **⚡ Performance**: Optimierte React-Komponenten, < 2.5s Ladezeit
- **🔒 Sicher**: API Key in .env.local, nicht im Code
- **📝 E-E-A-T**: Experience, Expertise, Authoritativeness, Trustworthiness
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

Das Script führt Sie Schritt-für-Schritt durch:

1. Transkript-Quelle wählen (Datei oder direktes Einfügen)
2. Optional: Zusätzliche Anweisungen eingeben
3. Automatische Generierung mit OpenAI GPT-4
4. Automatisches Speichern als TSX + Draft JSON

**Beispiel-Session:**

```bash
$ npm run generate:interactive

🎨 AI Content Generator - Interactive Mode

Transkript-Datei (oder "paste" für direktes Einfügen): transcripts/teams-tutorial.txt

Zusätzliche Anweisungen (optional, Enter überspringen): Fokus auf Collaboration Features

🤖 Generiere Wissensseite mit OpenAI GPT-4...
📊 Transkript-Länge: 12543 Zeichen
📝 Prompt-Länge: 45234 Zeichen
⏳ Bitte warten, dies kann 30-60 Sekunden dauern...

✅ Content erfolgreich generiert!
📊 Generierte Code-Länge: 18234 Zeichen
💰 Tokens verwendet: 12456
   - Prompt: 8234
   - Completion: 4222

📋 Generierte Metadaten:
   Titel: Microsoft Teams Collaboration Guide
   Slug: microsoft-teams-collaboration-guide
   Lesezeit: 9 Minuten
   Publikation: 19.11.2025

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

## 🎯 Qualitätskriterien

Das Script ist optimiert für:

### Nicht-generisch
- ❌ Keine AI-Floskeln ("im heutigen digitalen Zeitalter")
- ❌ Keine vagen Beschreibungen ("das Tool", "die Funktion")
- ✅ Konkrete Namen, spezifische Details
- ✅ Echte Zahlen und Beispiele
- ✅ Persönlicher, authentischer Ton

### E-E-A-T Signale
- **Experience**: "In unseren Projekten...", konkrete Praxiserfahrungen
- **Expertise**: Korrekte Fachbegriffe, technisch präzise
- **Authoritativeness**: Verweise auf offizielle Quellen
- **Trustworthiness**: Transparente Informationen, keine Übertreibungen

### SEO & AI-Optimierung
- Inversed Pyramid: Direkte Antwort in ersten 100 Wörtern
- Semantic Chunking: Ein Absatz = eine Idee
- Entity-reich: Konkrete Namen statt Pronomen
- Extractable Formate: Listen, Tabellen, Callouts
- Keywords natürlich eingebunden

### Visuelle Hierarchie
- Gradient-Boxen für wichtige Informationen
- Border-left Highlights für Sektionen
- Cards für strukturierte Inhalte
- Icons/Emojis als visuelle Anker
- Responsive Design mit Tailwind CSS

## 💰 Kosten

**OpenAI GPT-4o Pricing (Stand Nov 2024):**

- Input: $2.50 per 1M tokens
- Output: $10.00 per 1M tokens

**Typische Kosten pro generierter Seite:**

- Prompt: ~8.000 tokens = ~$0.02
- Completion: ~4.000 tokens = ~$0.04
- **Total: ~$0.06 pro Seite**

**Bei 10 Seiten/Monat: ~$0.60/Monat**

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
OPENAI_MAX_TOKENS=16000  # Standard
OPENAI_MAX_TOKENS=8000   # Kürzere Seiten
OPENAI_MAX_TOKENS=32000  # Längere Seiten (teurer)
```

### Temperature anpassen

In `.env.local`:

```bash
OPENAI_TEMPERATURE=0.7   # Standard (ausgewogen)
OPENAI_TEMPERATURE=0.3   # Deterministischer, faktischer
OPENAI_TEMPERATURE=1.0   # Kreativer, variabler
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
   # Folge den Anweisungen
   ```

3. **Review & Anpassungen**
   ```bash
   # Öffne die generierte Datei in deinem Editor
   code src/pages/GenerierteKomponente.tsx

   # Prüfe:
   # - Ist der Inhalt korrekt?
   # - Klingen die Texte authentisch?
   # - Sind die FAQs relevant?
   # - Funktionieren alle Links?
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
