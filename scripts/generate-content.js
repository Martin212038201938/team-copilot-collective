#!/usr/bin/env node

/**
 * AI-Powered Content Generator
 *
 * Generiert automatisch hochwertige Wissensseiten aus YouTube-Transkripten
 * oder Texten unter Verwendung von OpenAI GPT-4.
 *
 * Features:
 * - Nicht-generische, authentische Texte
 * - Dual Schema.org Markup (Article + FAQPage)
 * - E-E-A-T optimiert
 * - Performance-optimiert
 * - SEO-freundlich
 *
 * Usage:
 *   node scripts/generate-content.js <transcript-file>
 *   node scripts/generate-content.js --interactive
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import readline from 'readline';
import { checkBeforeRequest, trackUsage, showStatistics } from './cost-tracker.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GUIDELINES_PATH = path.join(__dirname, 'content-generator-guidelines.md');
const EXAMPLE_PAGE_1 = path.join(__dirname, '../src/pages/MicrosoftCopilotEinsteigerGuide.tsx');
const EXAMPLE_PAGE_2 = path.join(__dirname, '../src/pages/MicrosoftCopilotMemoryGuide.tsx');

// Read guidelines
const guidelines = fs.readFileSync(GUIDELINES_PATH, 'utf-8');

// Read example pages for reference
const examplePage1 = fs.readFileSync(EXAMPLE_PAGE_1, 'utf-8');
const examplePage2 = fs.readFileSync(EXAMPLE_PAGE_2, 'utf-8');

/**
 * Main prompt template for content generation
 */
function buildPrompt(transcript, userInstructions = '') {
  return `Du bist ein Experte für Content-Erstellung, spezialisiert auf Microsoft 365 und KI-Themen. Deine Aufgabe ist es, aus dem folgenden Transkript eine hochwertige, AI-optimierte Wissensseite zu erstellen.

# WICHTIGE ANFORDERUNGEN

## 1. NICHT-GENERISCH
- **KRITISCH**: Der Text darf NICHT wie AI-generiert klingen
- Nutze konkrete Beispiele, echte Zahlen, spezifische Details
- Schreibe persönlich und authentisch, als würde ein erfahrener Consultant sprechen
- Vermeide Floskeln wie "im heutigen digitalen Zeitalter", "revolutionär", "game-changer"
- Nutze präzise Fachbegriffe statt vager Beschreibungen

## 2. STRUKTUR & FORMAT
- Erstelle eine vollständige React/TypeScript (TSX) Komponente
- Folge EXAKT dem Format der Beispiel-Komponenten unten
- Nutze ContentLayout, SEOHead, getAuthor aus den Beispielen
- Dual Schema.org Markup: Article + FAQPage
- Table of Contents mit mindestens 7-9 Sektionen
- FAQ-Sektion mit mindestens 8-10 Fragen

## 3. E-E-A-T SIGNALE
- **Experience**: "In unseren Projekten...", "Wir haben gelernt...", konkrete Projekterfahrungen
- **Expertise**: Korrekte Fachbegriffe, technisch präzise, zeige Tiefenwissen
- **Authoritativeness**: Verweise auf offizielle Quellen (Microsoft Docs), Studien
- **Trustworthiness**: Transparente Informationen, keine Übertreibungen, ehrliche Pros/Cons

## 4. SEO & AI-OPTIMIERUNG
- Erste 100 Wörter: Direkte Antwort auf die Hauptfrage (Inversed Pyramid)
- Semantic Chunking: Ein Absatz = eine Idee (2-3 Sätze)
- Entity-reich: Konkrete Namen statt "das Tool", "die Funktion"
- Extractable Formate: Listen, Tabellen, Callout-Boxen, Cards
- Keywords natürlich einbinden (keine Keyword-Stuffing)

## 5. VISUELLE HIERARCHIE
- Nutze die Tailwind-Klassen wie in den Beispielen
- Gradient-Boxen für wichtige Informationen
- Border-left Highlights für Sektionen
- Cards für strukturierte Inhalte
- Icons/Emojis sparsam für visuelle Anker

## 6. PRAKTISCHER NUTZEN
- Schritt-für-Schritt Anleitungen wo sinnvoll
- Konkrete Code-Beispiele oder Prompt-Beispiele
- Best Practices & Do's/Don'ts
- Praxis-Tipps in Callout-Boxen
- ROI/Business-Value wo relevant

---

# TRANSKRIPT

${transcript}

---

# BEISPIEL-KOMPONENTEN (als Referenz für Struktur & Stil)

## Beispiel 1: MicrosoftCopilotEinsteigerGuide.tsx
\`\`\`tsx
${examplePage1.substring(0, 3000)}
// ... (gekürzt für Prompt-Länge)
\`\`\`

## Beispiel 2: MicrosoftCopilotMemoryGuide.tsx
\`\`\`tsx
${examplePage2.substring(0, 3000)}
// ... (gekürzt für Prompt-Länge)
\`\`\`

---

# GUIDELINES (vollständig)

${guidelines}

---

# ZUSÄTZLICHE ANWEISUNGEN

${userInstructions || 'Keine zusätzlichen Anweisungen.'}

---

# DEINE AUFGABE

Erstelle JETZT eine vollständige TSX-Komponente basierend auf dem Transkript. Die Komponente sollte:

1. **Filename-würdig sein**: Wähle einen klaren Komponentennamen (z.B. MicrosoftCopilotTeamsGuide)
2. **Vollständig sein**: Alle Imports, komplette Komponente, export default
3. **Den Beispielen folgen**: Gleiche Struktur, ähnlicher Stil, aber mit eigenem Inhalt
4. **Nicht-generisch klingen**: Persönlich, konkret, authentisch
5. **Schema.org enthalten**: Article Schema + FAQPage Schema mit mind. 8 Fragen
6. **SEO-optimiert sein**: Meta-Tags, Keywords, Canonical URL
7. **8-12 Minuten Lesezeit haben**: ~2.000-3.500 Wörter

**WICHTIG**: Antworte NUR mit dem TSX-Code. Keine Erklärungen, keine Markdown-Wrapper. Starte direkt mit "import" und ende mit "export default".

Beginne jetzt:`;
}

/**
 * Generate metadata for the draft JSON
 */
function generateMetadata(component, transcript) {
  // Extract title from component
  const titleMatch = component.match(/title="([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : 'Generierte Wissensseite';

  // Extract description
  const descMatch = component.match(/description="([^"]+)"/);
  const description = descMatch ? descMatch[1] : '';

  // Extract keywords
  const keywordsMatch = component.match(/keywords=\{(\[[\s\S]*?\])\}/);
  let keywords = [];
  if (keywordsMatch) {
    try {
      keywords = eval(keywordsMatch[1]);
    } catch (e) {
      keywords = ['Microsoft 365', 'Copilot', 'Produktivität'];
    }
  }

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Estimate read time (assuming ~200 words/minute, 5 chars/word)
  const wordCount = component.length / 5;
  const readTimeMinutes = Math.ceil(wordCount / 200);
  const readTime = `${readTimeMinutes} Minuten`;

  // Generate component name from slug
  const componentName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Calculate publish date (next Tuesday at 9:00 AM)
  const now = new Date();
  const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7; // Next Tuesday
  const publishDate = new Date(now);
  publishDate.setDate(now.getDate() + daysUntilTuesday);
  publishDate.setHours(9, 0, 0, 0);

  return {
    id: slug,
    title: title.replace(' | Copilotenschule', ''),
    description,
    content: 'IMPORTED FROM TSX FILE',
    contentType: 'code',
    codeFileName: `${componentName}.tsx`,
    publishDate: publishDate.toISOString(),
    author: 'martin-lang',
    category: 'Microsoft 365',
    slug,
    keywords,
    readTime,
    icon: '🤖',
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Generate content using OpenAI
 */
async function generateContent(transcript, userInstructions = '') {
  console.log('\n🤖 Generiere Wissensseite mit OpenAI GPT-4...');
  console.log(`📊 Transkript-Länge: ${transcript.length} Zeichen`);

  const prompt = buildPrompt(transcript, userInstructions);

  console.log(`📝 Prompt-Länge: ${prompt.length} Zeichen`);
  console.log('⏳ Bitte warten, dies kann 30-60 Sekunden dauern...\n');

  // 🔒 SECURITY: Check cost limits before API call
  try {
    checkBeforeRequest();
  } catch (error) {
    console.error('\n' + error.message + '\n');
    throw error;
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o';

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'Du bist ein Experte für Content-Erstellung und React/TypeScript Entwicklung. Du erstellst hochwertige, AI-optimierte Wissensseiten die authentisch und nicht-generisch klingen.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '16000'),
    });

    const generatedCode = completion.choices[0].message.content;

    console.log('✅ Content erfolgreich generiert!');
    console.log(`📊 Generierte Code-Länge: ${generatedCode.length} Zeichen`);
    console.log(`💰 Tokens verwendet: ${completion.usage.total_tokens}`);
    console.log(`   - Prompt: ${completion.usage.prompt_tokens}`);
    console.log(`   - Completion: ${completion.usage.completion_tokens}`);

    // 🔒 SECURITY: Track usage after successful API call
    trackUsage(
      model,
      completion.usage.prompt_tokens,
      completion.usage.completion_tokens,
      {
        transcriptLength: transcript.length,
        promptLength: prompt.length,
        generatedLength: generatedCode.length,
      }
    );

    return generatedCode;
  } catch (error) {
    console.error('❌ Fehler bei OpenAI API Call:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}

/**
 * Save generated content
 */
function saveContent(component, metadata, outputDir = null) {
  const baseDir = outputDir || path.join(__dirname, '..');
  const pagesDir = path.join(baseDir, 'src/pages');
  const draftsDir = path.join(baseDir, 'content/drafts');
  const publicDraftsDir = path.join(baseDir, 'public/content/drafts');

  // Ensure directories exist
  [pagesDir, draftsDir, publicDraftsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Save TSX component
  const componentPath = path.join(pagesDir, metadata.codeFileName);
  fs.writeFileSync(componentPath, component, 'utf-8');
  console.log(`✅ TSX gespeichert: ${componentPath}`);

  // Save draft JSON
  const draftPath = path.join(draftsDir, `${metadata.slug}.json`);
  fs.writeFileSync(draftPath, JSON.stringify(metadata, null, 2), 'utf-8');
  console.log(`✅ Draft JSON gespeichert: ${draftPath}`);

  // Copy to public
  const publicDraftPath = path.join(publicDraftsDir, `${metadata.slug}.json`);
  fs.writeFileSync(publicDraftPath, JSON.stringify(metadata, null, 2), 'utf-8');
  console.log(`✅ Public Draft gespeichert: ${publicDraftPath}`);

  return {
    componentPath,
    draftPath,
    publicDraftPath,
  };
}

/**
 * Interactive mode
 */
async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) =>
    new Promise((resolve) => rl.question(prompt, resolve));

  console.log('\n🎨 AI Content Generator - Interactive Mode\n');

  const transcriptPath = await question('Transkript-Datei (oder "paste" für direktes Einfügen): ');

  let transcript = '';
  if (transcriptPath.toLowerCase() === 'paste') {
    console.log('Füge das Transkript ein (Drücke Ctrl+D wenn fertig):\n');
    transcript = await new Promise((resolve) => {
      let input = '';
      process.stdin.on('data', (chunk) => {
        input += chunk;
      });
      process.stdin.on('end', () => {
        resolve(input);
      });
    });
  } else {
    if (!fs.existsSync(transcriptPath)) {
      console.error(`❌ Datei nicht gefunden: ${transcriptPath}`);
      process.exit(1);
    }
    transcript = fs.readFileSync(transcriptPath, 'utf-8');
  }

  const instructions = await question('\nZusätzliche Anweisungen (optional, Enter überspringen): ');

  rl.close();

  // Generate
  const component = await generateContent(transcript, instructions);
  const metadata = generateMetadata(component, transcript);

  console.log('\n📋 Generierte Metadaten:');
  console.log(`   Titel: ${metadata.title}`);
  console.log(`   Slug: ${metadata.slug}`);
  console.log(`   Lesezeit: ${metadata.readTime}`);
  console.log(`   Publikation: ${new Date(metadata.publishDate).toLocaleDateString('de-DE')}`);

  // Save
  const paths = saveContent(component, metadata);

  console.log('\n🎉 Content erfolgreich generiert und gespeichert!');

  // Show cost statistics
  showStatistics();

  console.log('\nNächste Schritte:');
  console.log('1. Überprüfe die generierte Komponente');
  console.log('2. Teste die Vorschau im Admin-Dashboard');
  console.log('3. Passe bei Bedarf Details an');
  console.log('4. Commit und Push zum Repository');
}

/**
 * CLI mode
 */
async function cliMode(transcriptPath, instructions = '') {
  if (!fs.existsSync(transcriptPath)) {
    console.error(`❌ Datei nicht gefunden: ${transcriptPath}`);
    process.exit(1);
  }

  const transcript = fs.readFileSync(transcriptPath, 'utf-8');

  // Generate
  const component = await generateContent(transcript, instructions);
  const metadata = generateMetadata(component, transcript);

  console.log('\n📋 Generierte Metadaten:');
  console.log(`   Titel: ${metadata.title}`);
  console.log(`   Slug: ${metadata.slug}`);
  console.log(`   Lesezeit: ${metadata.readTime}`);
  console.log(`   Publikation: ${new Date(metadata.publishDate).toLocaleDateString('de-DE')}`);

  // Save
  const paths = saveContent(component, metadata);

  console.log('\n🎉 Content erfolgreich generiert und gespeichert!');

  // Show cost statistics
  showStatistics();
}

/**
 * Main entry point
 */
async function main() {
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY nicht gefunden in .env.local');
    console.error('Bitte erstelle eine .env.local Datei mit deinem OpenAI API Key.');
    process.exit(1);
  }

  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--interactive') {
    await interactiveMode();
  } else {
    const transcriptPath = args[0];
    const instructions = args[1] || '';
    await cliMode(transcriptPath, instructions);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Fehler:', error);
    process.exit(1);
  });
}

export { generateContent, generateMetadata, saveContent };
