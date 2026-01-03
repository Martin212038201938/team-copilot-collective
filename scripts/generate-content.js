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
 * Research current information about a topic using OpenAI
 * This helps ensure articles include up-to-date information
 */
async function researchTopic(topic, transcript) {
  console.log('\n🔍 Recherchiere aktuelle Informationen zum Thema...');
  console.log(`📌 Thema: ${topic}`);

  // 🔒 SECURITY: Check cost limits before API call
  try {
    checkBeforeRequest();
  } catch (error) {
    console.log('⚠️  Überspringe Recherche wegen Cost-Limit');
    return null;
  }

  const researchPrompt = `Analysiere das folgende Transkript und identifiziere das Hauptthema. Dann erstelle eine strukturierte Zusammenfassung aktueller, wichtiger Informationen (Stand 2025) für dieses Thema, die in einem professionellen Fachartikel verwendet werden sollten.

TRANSKRIPT:
${transcript.substring(0, 3000)}

Liefere eine strukturierte Zusammenfassung mit:
1. **Hauptthema**: [Präzise Beschreibung]
2. **Aktuelle Features & Updates (2025)**: [Neueste Entwicklungen, Beta-Features]
3. **Technische Details**: [APIs, Versionen, Architekturen]
4. **Use Cases & Best Practices**: [Branchenspezifische Anwendungen]
5. **Vergleiche & Alternativen**: [Konkurrenzprodukte, Unterschiede]
6. **Häufige Herausforderungen**: [Bekannte Issues, Limitationen]

Konzentriere dich auf professionell relevante, technisch präzise Informationen.`;

  try {
    const model = process.env.OPENAI_MODEL || 'gpt-4o';
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'Du bist ein technischer Researcher, der aktuelle, präzise Informationen zu Microsoft 365 und KI-Themen zusammenstellt.',
        },
        {
          role: 'user',
          content: researchPrompt,
        },
      ],
      temperature: 0.3, // Lower temperature for factual research
      max_tokens: 2000,
    });

    const research = response.choices[0].message.content;

    console.log('✅ Recherche abgeschlossen');
    console.log(`📊 Tokens verwendet: ${response.usage.total_tokens}`);

    // 🔒 SECURITY: Track usage
    trackUsage(
      model,
      response.usage.prompt_tokens,
      response.usage.completion_tokens,
      {
        type: 'research',
        topicLength: topic.length,
      }
    );

    return research;
  } catch (error) {
    console.error('⚠️  Fehler bei Recherche:', error.message);
    console.log('📝 Fahre ohne zusätzliche Recherche fort...');
    return null;
  }
}

/**
 * Main prompt template for content generation
 */
function buildPrompt(transcript, userInstructions = '', researchData = null) {
  return `Du bist ein SENIOR CONSULTANT und Content-Experte mit 10+ Jahren Erfahrung in Microsoft 365 und KI-Themen. Deine Aufgabe ist es, aus dem folgenden Transkript eine hochwertige, PROFESSIONELL TIEFGEHENDE Wissensseite zu erstellen, die sich durch FACHLICHE EXZELLENZ von generischen Masseninhalten abhebt.

# KRITISCHE QUALITÄTSANFORDERUNGEN

## 1. THEMATISCHER FOKUS & RELEVANZ
- **HAUPTTHEMA IDENTIFIZIEREN**: Analysiere das Transkript und identifiziere das KERN-THEMA
- **FOKUSSIERT BLEIBEN**: Der gesamte Artikel muss sich auf dieses Hauptthema konzentrieren
- **KEINE ABSCHWEIFUNGEN**: Vermeide tangentiale Themen, die vom Hauptfokus ablenken
- **ROTER FADEN**: Jede Sektion muss das Hauptthema aus einem anderen Blickwinkel beleuchten
- **TITEL MUSS THEMA WIDERSPIEGELN**: Der Artikeltitel muss das exakte Hauptthema präzise beschreiben

## 2. PROFESSIONELLE TIEFE & FACHLICHE EXZELLENZ
- **NICHT-GENERISCH**: Der Text darf NIEMALS wie AI-generierter Masseninhalt klingen
- **FACHLICHE TIEFE**: Gehe in technische Details, erkläre das "Warum" und "Wie"
- **MINIMUM-TIEFE PRO SEKTION**: Jede Hauptsektion benötigt mindestens 400-600 Wörter mit substantiellem Inhalt
- **TECHNISCHE PRÄZISION**: Nutze korrekte Fachbegriffe, API-Namen, exakte Versionsangaben, spezifische Produktnamen
- **ARCHITEKTUR-VERSTÄNDNIS**: Erkläre technische Zusammenhänge, Systemarchitekturen, Datenflüsse
- **VERMEIDE ABSOLUT**:
  - Floskeln wie "im heutigen digitalen Zeitalter", "revolutionär", "game-changer", "nahtlos"
  - Vage Aussagen wie "das Tool", "die Funktion", "viele Möglichkeiten"
  - Oberflächliche Beschreibungen ohne konkrete Details
  - Marketing-Sprache statt technischer Fakten

## 3. PRAXISRELEVANZ FÜR BERUFLICHEN ALLTAG
- **USE CASES SIND PFLICHT**: JEDE Hauptsektion muss MINDESTENS 3-5 konkrete, realistische Use Cases aus dem beruflichen Alltag enthalten
- **BRANCHENSPEZIFISCH**: Zeige Anwendungsbeispiele aus verschiedenen Branchen (Finance, Healthcare, Manufacturing, etc.)
- **ROLLEN-BASIERT**: Adressiere verschiedene Rollen (IT-Admin, Developer, Business User, Manager)
- **SCHRITT-FÜR-SCHRITT**: Biete detaillierte Anleitungen mit konkreten Schritten, nicht nur "Sie können X machen"
- **KONKRETE BEISPIELE**:
  - Echte Prompt-Beispiele mit Input/Output
  - Code-Snippets mit Erklärungen
  - Konfigurationsbeispiele mit tatsächlichen Werten
  - Screenshot-Beschreibungen von UI-Elementen
- **MESSBARE ERGEBNISSE**: Zeige ROI, Zeitersparnis, Effizienzgewinne mit konkreten Zahlen wo möglich
- **PROBLEMLÖSUNGEN**: Adressiere häufige Herausforderungen und biete Lösungsstrategien

## 4. PROFESSIONELLE VERGLEICHE & KONTEXT
- **ALTERNATIVEN DISKUTIEREN**: Vergleiche mit Konkurrenzprodukten oder alternativen Ansätzen
- **PROS & CONS**: Ehrliche Bewertung von Stärken UND Schwächen
- **WANN NUTZEN, WANN NICHT**: Klare Guidance, für welche Szenarien das Thema geeignet ist
- **MIGRATION/INTEGRATION**: Wie integriert sich das Thema in bestehende Systeme/Workflows?

## 5. LÄNGE & SUBSTANTIELLER INHALT
- **KEINE VERKÜRZUNGEN**: Artikel müssen SUBSTANTIELL sein, nicht kompakt
- **ZIEL-LÄNGE**: 3.000-5.000 Wörter für umfassende Artikel (10-15 Minuten Lesezeit)
- **QUALITÄT ÜBER KÜRZE**: Lieber ausführlich und wertvoll als kurz und generisch
- **JEDE SEKTION SUBSTANZ**: Minimum 400-600 Wörter pro Hauptsektion
- **FAQ-TIEFE**: Jede FAQ-Antwort sollte 80-150 Wörter haben mit echtem Mehrwert

## 6. STRUKTUR & FORMAT
- Erstelle eine vollständige React/TypeScript (TSX) Komponente
- Folge EXAKT dem Format der Beispiel-Komponenten unten
- Nutze ContentLayout, SEOHead, getAuthor aus den Beispielen
- Dual Schema.org Markup: Article + FAQPage
- Table of Contents mit 8-12 Sektionen (mehr Tiefe!)
- FAQ-Sektion mit mindestens 10-15 Fragen (umfassender!)

## 7. E-E-A-T SIGNALE FÜR PROFESSIONELLE AUTORITÄT
- **Experience**: "In Projekten mit Enterprise-Kunden haben wir festgestellt...", spezifische Projekterfahrungen mit Zahlen
- **Expertise**: Technische Tiefe, Architektur-Diagramm-Beschreibungen, API-Details, Performance-Metriken
- **Authoritativeness**: Verweise auf offizielle Microsoft Docs, technische Whitepapers, Case Studies
- **Trustworthiness**: Transparente Limitationen, bekannte Bugs/Issues, ehrliche Kostenanalyse

## 8. LLM-OPTIMIERUNG FÜR ZITIERBARKEIT
- **EXTRACTABLE FACTS**: Jede Information muss als eigenständiger Fakt extrahierbar sein
- **DEFINITIVE ANTWORTEN**: Beantworte Fragen direkt und vollständig
- **STRUKTURIERTE DATEN**: Nutze Listen, Tabellen, Vergleichsmatrizen
- **ZITIERBARE AUSSAGEN**: Formuliere Kerninformationen so, dass LLMs sie direkt zitieren können
- **SEMANTIC CHUNKS**: Ein Absatz = eine vollständige Idee (3-5 Sätze, nicht 2-3)
- **ENTITY-REICH**: Vollständige Namen statt Pronomen (z.B. "Microsoft Graph API" statt "die API")

## 9. SEO & AI-OPTIMIERUNG
- Erste 150-200 Wörter: Umfassende Antwort auf die Hauptfrage (Inversed Pyramid)
- Semantic Chunking: Ein Absatz = eine vollständige, substantielle Idee
- Entity-reich: Konkrete Namen, Produktversionen, spezifische Features
- Extractable Formate: Ausführliche Listen, Vergleichstabellen, Feature-Matrizen, Callout-Boxen
- Keywords natürlich einbinden (keine Keyword-Stuffing)
- Long-tail Keywords für Nischen-Szenarien

## 10. VISUELLE HIERARCHIE & LESBARKEIT
- Nutze die Tailwind-Klassen wie in den Beispielen
- Gradient-Boxen für wichtige Informationen und Kernkonzepte
- Border-left Highlights für Sektionen und Callouts
- Cards für strukturierte Inhalte, Use Cases, Vergleiche
- Icons/Emojis sparsam für visuelle Anker
- Code-Blöcke mit Syntax-Highlighting für technische Beispiele

## 11. AKTUALITÄT & RECHERCHE
- Nutze Informationen aus dem Transkript als Basis
- Ergänze mit bekanntem Wissen über aktuelle Features (Stand 2025)
- Erwähne neueste Updates, Beta-Features, kommende Funktionen
- Verweise auf offizielle Roadmaps und Ankündigungen
${researchData ? '\n- **WICHTIG**: Nutze die RECHERCHIERTEN INFORMATIONEN unten für aktuelle Details, Updates und Best Practices' : ''}

---

# TRANSKRIPT

${transcript}

${researchData ? `\n---\n\n# RECHERCHIERTE AKTUELLE INFORMATIONEN\n\n${researchData}\n\n**WICHTIG**: Integriere diese recherchierten Informationen in deinen Artikel, um Aktualität und fachliche Tiefe zu gewährleisten.` : ''}

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

Erstelle JETZT eine vollständige, PROFESSIONELL TIEFGEHENDE TSX-Komponente basierend auf dem Transkript. Die Komponente MUSS erfüllen:

## KERN-ANFORDERUNGEN:

1. **THEMA-FOKUS**:
   - Identifiziere das exakte Hauptthema aus dem Transkript
   - Der gesamte Artikel fokussiert sich ausschließlich auf dieses Hauptthema
   - Titel beschreibt präzise das Hauptthema

2. **PROFESSIONELLE TIEFE**:
   - JEDE Hauptsektion: 400-600 Wörter mit substantiellem Fachinhalt
   - Technische Details, APIs, Architektur, Konfigurationen
   - Erklärung von "Warum" und "Wie", nicht nur "Was"

3. **PRAXIS-USE-CASES**:
   - MINIMUM 3-5 konkrete Use Cases pro Hauptsektion
   - Branchenspezifische Beispiele (Finance, Healthcare, etc.)
   - Rollenspezifische Szenarien (IT-Admin, Developer, Business User)
   - Schritt-für-Schritt Anleitungen mit konkreten Schritten
   - Echte Prompt-Beispiele, Code-Snippets, Konfigurationen

4. **SUBSTANTIELLE LÄNGE**:
   - Ziel: 3.000-5.000 Wörter (10-15 Minuten Lesezeit)
   - KEINE Verkürzungen, die Artikel generisch machen
   - Qualität und Tiefe über Kürze
   - FAQs mit 10-15 Fragen, jede Antwort 80-150 Wörter

5. **LLM-ZITIERBARKEIT**:
   - Extractable Facts: Jede Information als eigenständiger Fakt
   - Definitive Antworten auf spezifische Fragen
   - Strukturierte Daten: Listen, Tabellen, Vergleiche
   - Entity-reich: Vollständige Namen, keine Pronomen

6. **PROFESSIONELLE VERGLEICHE**:
   - Alternativen und Konkurrenzprodukte diskutieren
   - Ehrliche Pros & Cons
   - Wann nutzen, wann nicht nutzen
   - Integrations- und Migrations-Überlegungen

7. **TECHNISCHE STRUKTUR**:
   - Filename-würdig: Klarer Komponentenname (z.B. MicrosoftCopilotTeamsGuide)
   - Vollständig: Alle Imports, komplette Komponente, export default
   - Den Beispielen folgen: Gleiche Struktur, aber mit eigenem tiefem Inhalt
   - Schema.org: Article Schema + FAQPage Schema mit 10-15 Fragen
   - SEO-optimiert: Meta-Tags, Keywords, Canonical URL
   - Table of Contents: 8-12 Sektionen

8. **QUALITÄTS-CHECKS**:
   - ✓ Klingt NICHT wie AI-generierter Masseninhalt
   - ✓ Enthält technische Tiefe und Fachexpertise
   - ✓ Bietet echten Mehrwert für professionelle Praxis
   - ✓ Unterscheidet sich klar von generischen Artikeln
   - ✓ LLMs können präzise Informationen zitieren
   - ✓ Minimum 3.000 Wörter mit Substanz

**WICHTIG**: Antworte NUR mit dem vollständigen TSX-Code. Keine Erklärungen, keine Markdown-Wrapper, keine Zusammenfassungen. Starte direkt mit "import" und ende mit "export default".

**DENKE DARAN**: Dies ist ein PROFESSIONELLER FACHARTIKEL für Experten und Praktiker, KEIN oberflächlicher Blog-Post. Tiefe, Use Cases und Praxisrelevanz sind KRITISCH.

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
async function generateContent(transcript, userInstructions = '', enableResearch = true) {
  console.log('\n🤖 Generiere professionell tiefgehende Wissensseite mit OpenAI GPT-4...');
  console.log(`📊 Transkript-Länge: ${transcript.length} Zeichen`);

  // Optional: Research current information about the topic
  let researchData = null;
  if (enableResearch) {
    try {
      researchData = await researchTopic('', transcript);
      if (researchData) {
        console.log('✅ Recherchierte Informationen werden in Artikel integriert');
      }
    } catch (error) {
      console.log('⚠️  Recherche fehlgeschlagen, fahre ohne zusätzliche Informationen fort');
    }
  }

  const prompt = buildPrompt(transcript, userInstructions, researchData);

  console.log(`📝 Prompt-Länge: ${prompt.length} Zeichen`);
  console.log('⏳ Bitte warten, dies kann 60-120 Sekunden dauern (umfangreicher Artikel)...\n');

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
          content: 'Du bist ein SENIOR CONSULTANT mit 10+ Jahren Erfahrung in Microsoft 365 und KI-Themen. Du erstellst professionell tiefgehende, fachlich exzellente Wissensseiten für Experten und Praktiker. Deine Inhalte zeichnen sich durch technische Präzision, konkrete Use Cases und substantielle Tiefe aus - sie unterscheiden sich fundamental von generischen AI-generierten Masseninhalten.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.6'),
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '24000'),
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
 * Validate quality of generated content
 */
function validateContentQuality(component) {
  const issues = [];
  const warnings = [];

  // Check minimum word count (approximately)
  const wordCount = component.split(/\s+/).length;
  if (wordCount < 2500) {
    issues.push(`⚠️  KRITISCH: Artikel zu kurz (${wordCount} Wörter, Minimum: 2500)`);
  } else if (wordCount < 3000) {
    warnings.push(`⚠️  Artikel könnte länger sein (${wordCount} Wörter, Ziel: 3000-5000)`);
  } else {
    console.log(`✅ Länge: ${wordCount} Wörter (ausgezeichnet!)`);
  }

  // Check for generic AI phrases (should be minimal)
  const genericPhrases = [
    'im heutigen digitalen Zeitalter',
    'revolutionär',
    'game-changer',
    'nahtlos integriert',
    'spielend einfach',
  ];
  const foundGeneric = genericPhrases.filter(phrase =>
    component.toLowerCase().includes(phrase.toLowerCase())
  );
  if (foundGeneric.length > 0) {
    warnings.push(`⚠️  Generische Phrasen gefunden: ${foundGeneric.join(', ')}`);
  }

  // Check for FAQ section
  if (!component.includes('FAQPage') && !component.includes('faq')) {
    issues.push('⚠️  KRITISCH: Keine FAQ-Sektion gefunden');
  }

  // Check for table of contents
  if (!component.includes('tableOfContents')) {
    issues.push('⚠️  KRITISCH: Kein Table of Contents gefunden');
  }

  // Check for schema markup
  if (!component.includes('@type": "Article"')) {
    issues.push('⚠️  KRITISCH: Article Schema fehlt');
  }

  // Display results
  console.log('\n📊 QUALITÄTSPRÜFUNG:');

  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ Alle Qualitätschecks bestanden!');
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnungen:');
    warnings.forEach(w => console.log(`  ${w}`));
  }

  if (issues.length > 0) {
    console.log('\n❌ KRITISCHE PROBLEME:');
    issues.forEach(i => console.log(`  ${i}`));
    console.log('\n⚠️  Der Artikel sollte überarbeitet werden, bevor er veröffentlicht wird.');
  }

  return {
    passed: issues.length === 0,
    issues,
    warnings,
    wordCount,
  };
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

  const researchInput = await question('\nAktuelle Informationen recherchieren? (j/N): ');
  const enableResearch = researchInput.toLowerCase() === 'j' || researchInput.toLowerCase() === 'ja';

  rl.close();

  // Generate
  const component = await generateContent(transcript, instructions, enableResearch);

  // Validate quality
  const validation = validateContentQuality(component);

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

  // Generate (research enabled by default in CLI mode)
  const component = await generateContent(transcript, instructions, true);

  // Validate quality
  const validation = validateContentQuality(component);

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
