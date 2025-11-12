import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Upload, Code, Sparkles, CheckCircle, Play, Edit2 } from "lucide-react";
import { Draft, ExtractedTopic, GeneratorState } from "@/types/draft";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface DraftEditorProps {
  draft: Draft;
  onSave: (draft: Draft) => void;
  onCancel: () => void;
  initialTab?: string;
}

type GeneratorStep = 'transcript' | 'topics' | 'focus' | 'metadata' | 'content-generation' | 'content-review' | 'page-design' | 'completed';

interface GeneratedMetadata {
  title: string;
  description: string;
  category: string;
  keywords: string[];
  slug: string;
  icon: string;
  readTime: string;
}

const DraftEditor = ({ draft, onSave, onCancel, initialTab }: DraftEditorProps) => {
  const [editedDraft, setEditedDraft] = useState<Draft>(draft);
  const [activeTab, setActiveTab] = useState(initialTab || "content");

  // Load generator state from draft if exists
  const [transcript, setTranscript] = useState<string>(draft.generatorState?.transcript || "");
  const transcriptTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Content Generator State (load from draft or start fresh)
  const [generatorStep, setGeneratorStep] = useState<GeneratorStep>(
    draft.generatorState?.step || 'transcript'
  );
  const [extractedTopics, setExtractedTopics] = useState<ExtractedTopic[]>(
    draft.generatorState?.extractedTopics || []
  );
  const [selectedTopic, setSelectedTopic] = useState<ExtractedTopic | null>(
    draft.generatorState?.selectedTopic || null
  );
  const [generatedMetadata, setGeneratedMetadata] = useState<GeneratedMetadata | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>(
    draft.generatorState?.generatedContent || ""
  );
  const [reviewedContent, setReviewedContent] = useState<string>(
    draft.generatorState?.reviewedContent || ""
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [openAIKey, setOpenAIKey] = useState<string>(import.meta.env.VITE_OPENAI_API_KEY || "");
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // Check if there's a saved generator state to resume
  useEffect(() => {
    if (draft.generatorState && draft.generatorState.step !== 'transcript' && !showResumePrompt) {
      setShowResumePrompt(true);
    }
  }, [draft.generatorState, showResumePrompt]);

  // Auto-focus transcript textarea when on content-generator tab
  useEffect(() => {
    if (activeTab === "content-generator" && transcriptTextareaRef.current) {
      setTimeout(() => {
        transcriptTextareaRef.current?.focus();
      }, 100);
    }
  }, [activeTab]);

  // Save generator state to draft
  const saveGeneratorState = (updatedState: Partial<GeneratorState>) => {
    const newState: GeneratorState = {
      step: generatorStep,
      transcript,
      extractedTopics,
      selectedTopic,
      generatedContent,
      reviewedContent,
      finalCode: editedDraft.generatorState?.finalCode || '',
      ...updatedState
    };

    setEditedDraft({
      ...editedDraft,
      generatorState: newState,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleChange = (field: keyof Draft, value: any) => {
    setEditedDraft({
      ...editedDraft,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSave = () => {
    onSave(editedDraft);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is TSX, JSX, or JS
    const validExtensions = ['.tsx', '.jsx', '.js', '.ts'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.'));

    if (!validExtensions.includes(fileExtension)) {
      alert('Bitte nur TSX, JSX, TS oder JS Dateien hochladen');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setEditedDraft({
        ...editedDraft,
        content,
        contentType: 'code',
        codeFileName: file.name,
        updatedAt: new Date().toISOString(),
      });
      setActiveTab('code-upload');
    };
    reader.readAsText(file);
  };

  const handleSwitchToMarkdown = () => {
    if (editedDraft.contentType === 'code') {
      if (confirm('Möchtest du wirklich zu Markdown wechseln? Der hochgeladene Code bleibt erhalten, aber du kannst ihn im Markdown-Editor bearbeiten.')) {
        setEditedDraft({
          ...editedDraft,
          contentType: 'markdown',
          updatedAt: new Date().toISOString(),
        });
      }
    }
  };

  const handleSwitchToCode = () => {
    if (editedDraft.contentType === 'markdown') {
      if (confirm('Möchtest du wirklich zu Code-Upload wechseln? Dein Markdown-Inhalt bleibt erhalten.')) {
        setEditedDraft({
          ...editedDraft,
          contentType: 'code',
          updatedAt: new Date().toISOString(),
        });
      }
    }
  };

  const handleTranscriptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is text-based
    const validExtensions = ['.txt', '.srt', '.vtt', '.md'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.'));

    if (!validExtensions.includes(fileExtension)) {
      alert('Bitte nur Text-Dateien hochladen (.txt, .srt, .vtt, .md)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setTranscript(content);
      setActiveTab('content-generator');
    };
    reader.readAsText(file);
  };

  // Smart Topic Extraction from transcript
  const extractTopicsFromTranscript = (text: string): ExtractedTopic[] => {
    // Simple but effective topic extraction
    // In production, this could use a real AI API
    const topics: ExtractedTopic[] = [];

    // Common copilot-related topics with keywords
    const topicPatterns = [
      {
        keywords: ['sicherheit', 'security', 'datenschutz', 'dsgvo', 'verschlüsselung'],
        title: 'Microsoft Copilot Sicherheit',
        description: 'Datenschutz, Sicherheitsaspekte und Compliance bei Microsoft Copilot',
        category: 'Sicherheit',
        icon: '🔒'
      },
      {
        keywords: ['produktivität', 'effizienz', 'zeitersparnis', 'workflow', 'arbeit'],
        title: 'Produktivität mit Microsoft Copilot',
        description: 'Wie Microsoft Copilot die Produktivität steigert und Arbeitsabläufe optimiert',
        category: 'Produktivität',
        icon: '⚡'
      },
      {
        keywords: ['roi', 'kosten', 'nutzen', 'investition', 'wirtschaftlich'],
        title: 'ROI von Microsoft Copilot',
        description: 'Return on Investment und Kostenanalyse für Microsoft Copilot',
        category: 'Business',
        icon: '💰'
      },
      {
        keywords: ['tipps', 'tricks', 'best practices', 'anwendung', 'tutorial'],
        title: 'Microsoft Copilot Tipps & Tricks',
        description: 'Praktische Tipps und Best Practices für die Nutzung von Microsoft Copilot',
        category: 'Anleitungen',
        icon: '💡'
      },
      {
        keywords: ['teams', 'kollaboration', 'zusammenarbeit', 'meeting'],
        title: 'Copilot für Teams',
        description: 'Microsoft Copilot in Teams für bessere Kollaboration',
        category: 'Kollaboration',
        icon: '👥'
      },
      {
        keywords: ['excel', 'daten', 'analyse', 'tabellen'],
        title: 'Copilot für Excel',
        description: 'Datenanalyse und Excel-Automatisierung mit Microsoft Copilot',
        category: 'Tools',
        icon: '📊'
      },
      {
        keywords: ['word', 'dokument', 'text', 'schreiben'],
        title: 'Copilot für Word',
        description: 'Dokumentenerstellung und Textbearbeitung mit Microsoft Copilot',
        category: 'Tools',
        icon: '📝'
      }
    ];

    const lowerText = text.toLowerCase();

    topicPatterns.forEach(pattern => {
      let matchCount = 0;
      pattern.keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = lowerText.match(regex);
        if (matches) {
          matchCount += matches.length;
        }
      });

      if (matchCount > 0) {
        topics.push({
          title: pattern.title,
          description: pattern.description,
          keywords: pattern.keywords,
          relevance: matchCount
        });
      }
    });

    // Sort by relevance
    topics.sort((a, b) => b.relevance - a.relevance);

    // If no topics found, create a generic one
    if (topics.length === 0) {
      topics.push({
        title: 'Microsoft Copilot Wissensartikel',
        description: 'Umfassender Artikel über Microsoft Copilot',
        keywords: ['microsoft', 'copilot', 'ki', 'künstliche intelligenz'],
        relevance: 1
      });
    }

    return topics;
  };

  // Generate metadata from selected topic and transcript
  const generateMetadataFromTopic = (topic: ExtractedTopic, text: string): GeneratedMetadata => {
    // Calculate read time (average 200 words per minute)
    const wordCount = text.split(/\s+/).length;
    const readMinutes = Math.ceil(wordCount / 200);
    const readTime = `${readMinutes} Min. Lesezeit`;

    // Generate slug from title
    const slug = topic.title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Determine icon based on title
    let icon = '📝';
    if (topic.title.includes('Sicherheit')) icon = '🔒';
    else if (topic.title.includes('Produktivität')) icon = '⚡';
    else if (topic.title.includes('ROI')) icon = '💰';
    else if (topic.title.includes('Tipps')) icon = '💡';
    else if (topic.title.includes('Teams')) icon = '👥';
    else if (topic.title.includes('Excel')) icon = '📊';
    else if (topic.title.includes('Word')) icon = '📝';

    // Determine category
    let category = 'Wissen';
    if (topic.title.includes('Sicherheit')) category = 'Sicherheit';
    else if (topic.title.includes('Produktivität')) category = 'Produktivität';
    else if (topic.title.includes('ROI')) category = 'Business';
    else if (topic.title.includes('Tipps')) category = 'Anleitungen';
    else if (topic.title.includes('Teams') || topic.title.includes('Excel') || topic.title.includes('Word')) {
      category = 'Tools';
    }

    // Enhanced SEO keywords
    const seoKeywords = [
      ...topic.keywords,
      'microsoft copilot',
      'copilot für microsoft 365',
      'ki-unterstützte büroarbeit',
      category.toLowerCase()
    ];

    return {
      title: topic.title,
      description: topic.description,
      category,
      keywords: [...new Set(seoKeywords)], // Remove duplicates
      slug,
      icon,
      readTime
    };
  };

  // Step 1: Extract topics from transcript
  const handleExtractTopics = () => {
    if (!transcript.trim()) {
      alert('Bitte zuerst ein Transkript hochladen oder eingeben');
      return;
    }

    setIsGenerating(true);

    // Simulate processing delay for better UX
    setTimeout(() => {
      const topics = extractTopicsFromTranscript(transcript);
      setExtractedTopics(topics);
      setGeneratorStep('topics');

      // Save state
      saveGeneratorState({
        step: 'topics',
        transcript,
        extractedTopics: topics
      });

      setIsGenerating(false);
    }, 800);
  };

  // Step 2: Select focus topic
  const handleSelectTopic = (topic: ExtractedTopic) => {
    setSelectedTopic(topic);
    setGeneratorStep('focus');

    // Save state
    saveGeneratorState({
      step: 'focus',
      selectedTopic: topic
    });
  };

  // Step 3: Generate metadata from selected topic
  const handleGenerateMetadata = () => {
    if (!selectedTopic) return;

    setIsGenerating(true);

    // Simulate processing for better UX
    setTimeout(() => {
      const metadata = generateMetadataFromTopic(selectedTopic, transcript);
      setGeneratedMetadata(metadata);
      setGeneratorStep('metadata');

      saveGeneratorState({
        step: 'metadata',
        selectedTopic: selectedTopic
      });

      setIsGenerating(false);
    }, 1200);
  };

  // Step 3: Apply generated metadata and move to content generation
  const handleApplyMetadata = () => {
    if (!generatedMetadata) return;

    // Update state in ONE go: metadata AND generatorState together
    const newGeneratorState: GeneratorState = {
      step: 'content-generation',
      transcript,
      extractedTopics,
      selectedTopic,
      generatedContent,
      reviewedContent,
      finalCode: ''
    };

    setEditedDraft({
      ...editedDraft,
      title: generatedMetadata.title,
      description: generatedMetadata.description,
      category: generatedMetadata.category,
      keywords: generatedMetadata.keywords,
      slug: generatedMetadata.slug,
      icon: generatedMetadata.icon,
      readTime: generatedMetadata.readTime,
      generatorState: newGeneratorState,
      updatedAt: new Date().toISOString(),
    });

    setGeneratorStep('content-generation');
  };

  // Step 4: Generate content with OpenAI
  const handleGenerateContent = async () => {
    if (!openAIKey) {
      alert('Kein OpenAI API Key gefunden. Bitte in der .env.local Datei hinzufügen.');
      return;
    }

    if (!selectedTopic || !transcript) {
      alert('Transkript und Thema erforderlich');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `Du bist Martin Lang, ein Experte für Microsoft Copilot, KI-unterstützte Büroarbeit und Agile Methoden. Du schreibst SEO-optimierte Wissensartikel für copilotenschule.de.

Schreibe einen ausführlichen, praxisorientierten Artikel im Markdown-Format mit folgender Struktur:

## STRUKTUR:

### 1. Einleitung (2-3 Absätze)
- Hook: Stelle eine relevante Frage oder ein Problem vor
- Kontext: Warum ist dieses Thema wichtig?
- Überblick: Was lernt der Leser in diesem Artikel?

### 2. Quick Answer (Kasten am Anfang)
Beginne mit: "## 🎯 Quick Answer"
- Eine prägnante, direkte Antwort auf die Hauptfrage (2-3 Sätze)
- 3 Key Facts als Bullet Points

### 3. Hauptinhalt (strukturiert in H2/H3)
- 4-6 Hauptabschnitte mit klaren H2 Überschriften
- Jeder Abschnitt mit konkreten Beispielen und Handlungsempfehlungen
- Verwende Bullet Points und nummerierte Listen wo sinnvoll
- Füge praktische Tipps und Best Practices ein
- Verwende **Fettdruck** für wichtige Begriffe

### 4. Praxisbeispiel (eigener Abschnitt)
"## 💡 Praxisbeispiel aus dem Trainingsalltag"
- Ein konkretes, realitätsnahes Beispiel
- Mit Vorher-Nachher-Vergleich wenn möglich

### 5. FAQ Sektion am Ende
"## ❓ Häufig gestellte Fragen (FAQ)"
- 6-8 relevante Fragen mit prägnanten Antworten
- Format: ### Frage? gefolgt von der Antwort

### 6. Fazit (2-3 Absätze)
- Zusammenfassung der wichtigsten Punkte
- Call-to-Action: Was sollte der Leser jetzt tun?

## STIL:
- Direkte Ansprache (Du-Form)
- Praxisnah und verständlich
- Keine Marketing-Sprache, sondern ehrliche Expertise
- Konkrete Zahlen, Beispiele und Empfehlungen
- 1800-2500 Wörter

## E-E-A-T OPTIMIERUNG:
- Zeige praktische Erfahrung (Experience)
- Demonstriere Fachwissen (Expertise)
- Baue Autorität auf (Authority)
- Schaffe Vertrauen (Trust)

Erstelle JETZT den kompletten Artikel.`
            },
            {
              role: 'user',
              content: `Thema: ${selectedTopic.title}

Beschreibung: ${selectedTopic.description}

Kontext aus dem Transkript:
${transcript}

Schreibe einen vollständigen, praxisorientierten Artikel für copilotenschule.de.`
            }
          ],
          temperature: 0.7,
          max_tokens: 4500
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`OpenAI API Fehler: ${response.status} - ${errorData?.error?.message || 'Unbekannter Fehler'}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      setGeneratedContent(content);
      setReviewedContent(content);
      setGeneratorStep('content-review');

      // Update state in ONE go to avoid race conditions
      const newGeneratorState: GeneratorState = {
        step: 'content-review',
        transcript,
        extractedTopics,
        selectedTopic,
        generatedContent: content,
        reviewedContent: content,
        finalCode: ''
      };

      setEditedDraft({
        ...editedDraft,
        generatorState: newGeneratorState,
        updatedAt: new Date().toISOString(),
      });

      setIsGenerating(false);
    } catch (error) {
      console.error('Content generation error:', error);
      alert(`Fehler bei der Content-Generierung:\n${error instanceof Error ? error.message : 'Unbekannter Fehler'}\n\nBitte überprüfe deinen API Key in der .env.local Datei.`);
      setIsGenerating(false);
    }
  };

  // Step 5: Save reviewed content
  const handleSaveReviewedContent = () => {
    if (!reviewedContent.trim()) {
      alert('Bitte überarbeite den Content');
      return;
    }

    // Update state in ONE go to avoid race conditions
    const newGeneratorState: GeneratorState = {
      step: 'page-design',
      transcript,
      extractedTopics,
      selectedTopic,
      generatedContent,
      reviewedContent,
      finalCode: editedDraft.generatorState?.finalCode || ''
    };

    setEditedDraft({
      ...editedDraft,
      generatorState: newGeneratorState,
      updatedAt: new Date().toISOString(),
    });

    setGeneratorStep('page-design');
  };

  // Step 6: Generate final page code
  const handleGenerateFinalPage = async () => {
    if (!openAIKey) {
      alert('Kein OpenAI API Key gefunden. Bitte in der .env.local Datei hinzufügen.');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'Du bist ein Experte für React/TypeScript und erstellst perfekte TSX-Komponenten für Wissensseiten.\n\n' +
                'Erstelle eine VOLLSTÄNDIGE, lauffähige TSX-Datei mit folgender Struktur:\n\n' +
                '- Import: KnowledgePageTemplate und FAQItem von @/components/KnowledgePageTemplate\n' +
                '- Extrahiere FAQs aus der "## ❓ FAQ" Sektion im Markdown\n' +
                '- Extrahiere Quick Answer aus "## 🎯 Quick Answer"\n' +
                '- Erstelle Table of Contents mit allen H2 Überschriften\n' +
                '- Verwende semantische HTML-Elemente (section, h2, h3, p, ul, etc.)\n' +
                '- IDs für sections sollten kebab-case sein\n' +
                '- Verwende Tailwind CSS Klassen für Styling\n\n' +
                'WICHTIG:\n' +
                '- Der Code muss KOMPLETT und lauffähig sein\n' +
                '- KEINE Platzhalter oder Kommentare wie "// Rest des Contents"\n' +
                '- Gib NUR den TSX-Code aus, keine zusätzlichen Erklärungen\n' +
                '- Alle Metadaten verwenden: title, description, canonicalUrl, keywords, authorId="martin-lang"\n' +
                '- publishedDate und modifiedDate als ISO strings\n' +
                '- quickAnswer mit title und content\n' +
                '- faqItems als Array mit question/answer\n' +
                '- tableOfContents mit id/title/level\n' +
                '- breadcrumbs als Array\n' +
                '- readTime aus Metadaten'
            },
            {
              role: 'user',
              content: `Erstelle eine vollständige TSX-Datei für folgende Wissensseite:

**Metadaten:**
Titel: ${editedDraft.title}
Beschreibung: ${editedDraft.description}
Slug: ${editedDraft.slug}
Kategorie: ${editedDraft.category}
Keywords: ${editedDraft.keywords.join(', ')}
Autor: ${editedDraft.author}
Lesezeit: ${editedDraft.readTime}

**Vollständiger Content (Markdown):**
${reviewedContent}

Erstelle jetzt die komplette TSX-Komponente. Der komplette Markdown-Content muss in strukturiertes JSX umgewandelt werden.`
            }
          ],
          temperature: 0.2,
          max_tokens: 8000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`OpenAI API Fehler: ${response.status} - ${errorData?.error?.message || 'Unbekannter Fehler'}`);
      }

      const data = await response.json();
      let finalCode = data.choices[0].message.content;

      // Remove code fence markers if present
      finalCode = finalCode.replace(/^```tsx?\n?/gm, '').replace(/^```\n?/gm, '').replace(/```$/g, '').trim();

      // CRITICAL: Update everything in ONE state update to avoid race conditions
      const newGeneratorState: GeneratorState = {
        step: 'completed',
        transcript,
        extractedTopics,
        selectedTopic,
        generatedContent,
        reviewedContent, // KEEP the reviewed content!
        finalCode
      };

      setEditedDraft({
        ...editedDraft,
        content: finalCode,
        contentType: 'code',
        codeFileName: `${editedDraft.slug}.tsx`,
        generatorState: newGeneratorState,
        updatedAt: new Date().toISOString(),
      });

      setGeneratorStep('completed');
      setIsGenerating(false);

      alert('✅ Wissensseite erfolgreich erstellt!\n\nDu kannst sie jetzt im Tab "Code Upload" oder "Vorschau" sehen und bei Bedarf anpassen.');
    } catch (error) {
      console.error('Page generation error:', error);
      alert(`Fehler bei der Seiten-Generierung:\n${error instanceof Error ? error.message : 'Unbekannter Fehler'}\n\nBitte überprüfe deinen API Key in der .env.local Datei.`);
      setIsGenerating(false);
    }
  };

  // Reset generator
  const handleResetGenerator = () => {
    if (confirm('Möchtest du den Generator wirklich zurücksetzen? Alle Fortschritte gehen verloren.')) {
      setGeneratorStep('transcript');
      setExtractedTopics([]);
      setSelectedTopic(null);
      setGeneratedMetadata(null);
      setGeneratedContent('');
      setReviewedContent('');

      setEditedDraft({
        ...editedDraft,
        generatorState: undefined,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  // Resume from saved state
  const handleResumeGenerator = () => {
    setShowResumePrompt(false);
    setActiveTab('content-generator');
  };

  // Start fresh (discard saved state)
  const handleStartFresh = () => {
    setShowResumePrompt(false);
    handleResetGenerator();
    setActiveTab('content-generator');
  };

  const renderMarkdownPreview = (markdownContent: string) => {
    // Configure marked for better rendering
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // Convert markdown to HTML
    const rawHtml = marked(markdownContent) as string;

    // Sanitize HTML to prevent XSS
    const cleanHtml = DOMPurify.sanitize(rawHtml);

    return (
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Resume Prompt */}
        {showResumePrompt && draft.generatorState && (
          <Card className="mb-6 border-2 border-blue-400 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Play className="w-8 h-8 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 mb-2 text-lg">
                    Generator-Prozess fortsetzen?
                  </h3>
                  <p className="text-sm text-blue-800 mb-4">
                    Es wurde ein unvollständiger Generator-Prozess gefunden (Schritt: {draft.generatorState.step}).
                    Möchtest du dort weitermachen oder neu starten?
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={handleResumeGenerator} variant="default">
                      <Play className="w-4 h-4 mr-2" />
                      Fortsetzen
                    </Button>
                    <Button onClick={handleStartFresh} variant="outline">
                      Neu starten
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={onCancel} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Artikel bearbeiten
              </h1>
              <p className="text-gray-600">
                {editedDraft.status === "scheduled" ? "Geplant für: " : ""}
                {new Date(editedDraft.publishDate).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} size="lg">
              <Save className="w-4 h-4 mr-2" />
              Speichern
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="content">
              {editedDraft.contentType === 'code' ? '📝 Markdown' : 'Inhalt'}
            </TabsTrigger>
            <TabsTrigger value="content-generator">
              <Sparkles className="w-4 h-4 mr-2" />
              Content Generator
            </TabsTrigger>
            <TabsTrigger value="code-upload">
              <Code className="w-4 h-4 mr-2" />
              Code Upload
            </TabsTrigger>
            <TabsTrigger value="metadata">Metadaten</TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Vorschau
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Artikel-Inhalt</CardTitle>
                  {editedDraft.contentType === 'code' && (
                    <Badge variant="outline" className="bg-blue-50">
                      📄 Code-Modus aktiv
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editedDraft.contentType === 'code' && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                    <p className="text-sm text-amber-800">
                      <strong>Hinweis:</strong> Du befindest dich im Code-Modus. Der Inhalt wurde als fertige TSX/JSX-Datei hochgeladen.
                      Du kannst ihn hier direkt bearbeiten oder zum Tab "Code Upload" wechseln.
                    </p>
                    <Button
                      onClick={handleSwitchToMarkdown}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      Zu Markdown wechseln
                    </Button>
                  </div>
                )}

                <div>
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={editedDraft.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="text-xl font-semibold"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Kurzbeschreibung</Label>
                  <Textarea
                    id="description"
                    value={editedDraft.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Diese Beschreibung erscheint auf der Übersichtsseite
                  </p>
                </div>

                <div>
                  <Label htmlFor="content">
                    {editedDraft.contentType === 'code' ? 'Inhalt (TSX/JSX Code)' : 'Inhalt (Markdown)'}
                  </Label>
                  <Textarea
                    id="content"
                    value={editedDraft.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    rows={25}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {editedDraft.contentType === 'code'
                      ? 'TSX/JSX Code wird direkt beim Veröffentlichen verwendet'
                      : 'Markdown-Formatierung wird unterstützt (# Überschriften, **fett**, *kursiv*, - Listen, etc.)'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Generator Tab */}
          <TabsContent value="content-generator" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Content Generator - KI-optimierte Wissensseiten</CardTitle>
                  {generatorStep !== 'transcript' && (
                    <Button onClick={handleResetGenerator} variant="outline" size="sm">
                      ← Zurück zum Anfang
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Indicator */}
                <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-gray-600">Fortschritt:</span>
                    <span className="text-gray-500">
                      {generatorStep === 'transcript' && '1/7 - Transkript eingeben'}
                      {generatorStep === 'topics' && '2/7 - Kernthemen extrahieren'}
                      {generatorStep === 'focus' && '3/7 - Fokus wählen'}
                      {generatorStep === 'metadata' && '4/7 - Metadaten'}
                      {generatorStep === 'content-generation' && '5/7 - Content generieren'}
                      {generatorStep === 'content-review' && '6/7 - Content überarbeiten'}
                      {generatorStep === 'page-design' && '7/7 - Seite erstellen'}
                      {generatorStep === 'completed' && '✅ Abgeschlossen'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width:
                          generatorStep === 'transcript' ? '14%' :
                          generatorStep === 'topics' ? '28%' :
                          generatorStep === 'focus' ? '42%' :
                          generatorStep === 'metadata' ? '57%' :
                          generatorStep === 'content-generation' ? '71%' :
                          generatorStep === 'content-review' ? '85%' :
                          generatorStep === 'page-design' ? '95%' :
                          '100%'
                      }}
                    />
                  </div>
                </div>

                {/* Step 1: Transcript Input */}
                {generatorStep === 'transcript' && (
                  <>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-purple-900 mb-2 text-lg">
                            🎯 Aus Transkripten werden KI-optimierte Wissensseiten
                          </h4>
                          <p className="text-sm text-purple-800 mb-3">
                            Lade YouTube-Transkripte oder Texte hoch. Das System analysiert automatisch Kernthemen,
                            generiert SEO-Keywords und befüllt alle Metadaten intelligent vor.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transcript-upload">Transkript hochladen</Label>
                        <div className="mt-2 flex items-center gap-2">
                          <Input
                            id="transcript-upload"
                            type="file"
                            accept=".txt,.srt,.vtt,.md"
                            onChange={handleTranscriptUpload}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('transcript-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Formate: .txt, .srt, .vtt, .md
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="transcript-text">Oder Transkript direkt eingeben/bearbeiten</Label>
                      <Textarea
                        ref={transcriptTextareaRef}
                        id="transcript-text"
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        rows={15}
                        className="font-mono text-sm"
                        placeholder="Füge hier dein YouTube-Transkript oder Text ein...

Beispiel:
[00:00] Willkommen zu diesem Video über Microsoft Copilot Sicherheit...
[00:15] Heute erkläre ich die wichtigsten Datenschutz-Features...
[01:30] DSGVO-Konformität ist ein zentrales Thema...

Das System analysiert automatisch die Kernthemen und erstellt passende Metadaten."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {transcript.length > 0 ? `${transcript.length} Zeichen | ~${Math.ceil(transcript.split(' ').length / 200)} Min. Lesezeit` : 'Warte auf Input...'}
                      </p>
                    </div>

                    {transcript.length > 0 && (
                      <div className="flex justify-end">
                        <Button
                          onClick={handleExtractTopics}
                          size="lg"
                          disabled={isGenerating}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          {isGenerating ? 'Analysiere...' : 'Kernthemen extrahieren →'}
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {/* Step 2: Extracted Topics */}
                {generatorStep === 'topics' && (
                  <>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-2">✅ Kernthemen erfolgreich extrahiert!</h5>
                      <p className="text-sm text-green-800">
                        Das System hat {extractedTopics.length} relevante Thema(en) in deinem Transkript gefunden.
                        Wähle das Hauptthema für deinen Artikel:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {extractedTopics.map((topic, idx) => (
                        <Card
                          key={idx}
                          className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-400"
                          onClick={() => handleSelectTopic(topic)}
                        >
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <span className="text-2xl">{topic.title.includes('Sicherheit') ? '🔒' : topic.title.includes('Produktivität') ? '⚡' : topic.title.includes('ROI') ? '💰' : topic.title.includes('Tipps') ? '💡' : '📝'}</span>
                              {topic.title}
                              <Badge variant="secondary" className="ml-auto">
                                Relevanz: {topic.relevance}
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {topic.keywords.slice(0, 5).map((keyword, kidx) => (
                                <Badge key={kidx} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 3: Focus Topic Selected - Generate Metadata */}
                {generatorStep === 'focus' && selectedTopic && (
                  <>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 p-6 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-3 text-lg flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        Fokus-Thema ausgewählt
                      </h5>
                      <p className="text-sm text-green-800 mb-4">
                        Du hast dein Haupt-Thema gewählt. Im nächsten Schritt generieren wir automatisch
                        alle relevanten Metadaten, SEO-Keywords und strukturieren die Seite.
                      </p>
                    </div>

                    <Card className="border-2 border-green-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <span className="text-3xl">
                            {selectedTopic.title.includes('Sicherheit') ? '🔒' :
                             selectedTopic.title.includes('Produktivität') ? '⚡' :
                             selectedTopic.title.includes('ROI') ? '💰' :
                             selectedTopic.title.includes('Tipps') ? '💡' :
                             selectedTopic.title.includes('Teams') ? '👥' :
                             selectedTopic.title.includes('Excel') ? '📊' :
                             selectedTopic.title.includes('Word') ? '📝' : '📘'}
                          </span>
                          {selectedTopic.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-sm text-gray-600 font-semibold">Beschreibung:</Label>
                          <p className="text-sm text-gray-700 mt-1">{selectedTopic.description}</p>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-600 font-semibold mb-2 block">
                            Erkannte Keywords ({selectedTopic.keywords.length}):
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedTopic.keywords.slice(0, 10).map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                            {selectedTopic.keywords.length > 10 && (
                              <Badge variant="secondary" className="text-xs">
                                +{selectedTopic.keywords.length - 10} weitere
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                          <h6 className="font-semibold text-blue-900 mb-2 text-sm">🎯 Was wird generiert?</h6>
                          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                            <li>SEO-optimierter Titel</li>
                            <li>Meta-Beschreibung</li>
                            <li>URL-Slug (sprechende URL)</li>
                            <li>Kategorie-Zuordnung</li>
                            <li>Erweiterte Keyword-Liste</li>
                            <li>Passendes Icon/Emoji</li>
                            <li>Geschätzte Lesezeit</li>
                          </ul>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Button onClick={() => setGeneratorStep('topics')} variant="outline">
                            ← Anderes Thema wählen
                          </Button>
                          <Button
                            onClick={handleGenerateMetadata}
                            size="lg"
                            disabled={isGenerating}
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          >
                            <Sparkles className="w-5 h-5 mr-2" />
                            {isGenerating ? 'Generiere Metadaten...' : 'Metadaten generieren →'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Step 4: Generated Metadata Preview */}
                {generatorStep === 'metadata' && generatedMetadata && (
                  <>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 p-6 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-3 text-lg flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        Automatisch generierte Metadaten
                      </h5>
                      <p className="text-sm text-green-800 mb-4">
                        Überprüfe die automatisch generierten Metadaten. <strong>Du kannst alle Felder jederzeit im Tab "Metadaten" bearbeiten</strong> - auch während und nach dem Generator-Prozess.
                      </p>
                    </div>

                    <Card className="border-2 border-green-300">
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-gray-500">Titel</Label>
                            <div className="font-semibold text-lg">{generatedMetadata.title}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Slug (URL)</Label>
                            <div className="font-mono text-sm text-blue-600">/wissen/{generatedMetadata.slug}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Kategorie</Label>
                            <Badge variant="outline">{generatedMetadata.category}</Badge>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Icon</Label>
                            <div className="text-2xl">{generatedMetadata.icon}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Lesezeit</Label>
                            <div className="text-sm">{generatedMetadata.readTime}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Autor</Label>
                            <div className="text-sm">Martin Lang</div>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-gray-500">Beschreibung</Label>
                          <p className="text-sm mt-1">{generatedMetadata.description}</p>
                        </div>

                        <div>
                          <Label className="text-xs text-gray-500 mb-2 block">SEO Keywords ({generatedMetadata.keywords.length})</Label>
                          <div className="flex flex-wrap gap-2">
                            {generatedMetadata.keywords.map((keyword, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-between items-center">
                      <Button onClick={handleResetGenerator} variant="outline">
                        ← Neu starten
                      </Button>
                      <Button
                        onClick={handleApplyMetadata}
                        size="lg"
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Weiter zur Content-Generierung →
                      </Button>
                    </div>
                  </>
                )}

                {/* Step 5: Content Generation with OpenAI */}
                {generatorStep === 'content-generation' && (
                  <>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-lg">
                      <h5 className="font-semibold text-purple-900 mb-3 text-lg flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        Artikel-Content mit KI generieren
                      </h5>
                      <p className="text-sm text-purple-800 mb-4">
                        Jetzt wird der eigentliche Artikel-Content basierend auf deinem Transkript und den Metadaten generiert.
                        Der KI-generierte Content wird dann von dir überarbeitet.
                      </p>
                    </div>

                    <Card className="border-2 border-purple-300">
                      <CardContent className="pt-6 space-y-4">
                        {!import.meta.env.VITE_OPENAI_API_KEY && (
                          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                            <h6 className="font-semibold text-amber-900 mb-2 text-sm">⚠️ API Key nicht konfiguriert</h6>
                            <p className="text-xs text-amber-800 mb-3">
                              Kein OpenAI API Key in der .env.local Datei gefunden.
                            </p>
                            <details className="text-xs text-amber-800">
                              <summary className="cursor-pointer font-semibold mb-2">So richtest du es ein:</summary>
                              <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Erstelle/öffne die Datei <code className="bg-amber-100 px-1 rounded">.env.local</code> im Projekt-Root</li>
                                <li>Füge hinzu: <code className="bg-amber-100 px-1 rounded">VITE_OPENAI_API_KEY=dein-api-key</code></li>
                                <li>Speichern und Dev-Server neu starten</li>
                              </ol>
                            </details>
                          </div>
                        )}

                        {import.meta.env.VITE_OPENAI_API_KEY && (
                          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                            <p className="text-xs text-green-800">
                              ✅ OpenAI API Key konfiguriert. Bereit zur Content-Generierung!
                            </p>
                          </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                          <h6 className="font-semibold text-blue-900 mb-2 text-sm">🎨 Was wird generiert?</h6>
                          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                            <li><strong>Vollständiger Artikel</strong> (1800-2500 Wörter)</li>
                            <li><strong>Quick Answer Sektion</strong> am Anfang mit Key Facts</li>
                            <li><strong>Strukturierter Hauptinhalt</strong> mit H2/H3 Überschriften</li>
                            <li><strong>Praxisbeispiel</strong> aus dem Trainingsalltag</li>
                            <li><strong>6-8 FAQ-Einträge</strong> am Ende</li>
                            <li><strong>E-E-A-T optimiert</strong> (Experience, Expertise, Authority, Trust)</li>
                            <li><strong>Praxisnah</strong> mit konkreten Handlungsempfehlungen</li>
                          </ul>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Button onClick={() => setGeneratorStep('metadata')} variant="outline">
                            ← Zurück zu Metadaten
                          </Button>
                          <Button
                            onClick={handleGenerateContent}
                            size="lg"
                            disabled={isGenerating || !openAIKey}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            <Sparkles className="w-5 h-5 mr-2" />
                            {isGenerating ? 'Generiere Content... (30-60s)' : 'Content generieren →'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Step 6: Content Review */}
                {generatorStep === 'content-review' && (
                  <>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 p-6 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-3 text-lg flex items-center gap-2">
                        <Edit2 className="w-6 h-6" />
                        Content überarbeiten
                      </h5>
                      <p className="text-sm text-green-800 mb-4">
                        Der KI-generierte Content wurde erfolgreich erstellt! Überarbeite ihn jetzt nach deinen Wünschen.
                        Wenn du fertig bist, geht es weiter zur finalen Seiten-Gestaltung.
                      </p>
                    </div>

                    <Card className="border-2 border-green-300">
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <Label htmlFor="reviewed-content">Artikel-Content (Markdown)</Label>
                          <Textarea
                            id="reviewed-content"
                            value={reviewedContent}
                            onChange={(e) => {
                              const newReviewedContent = e.target.value;
                              setReviewedContent(newReviewedContent);

                              // Update generatorState directly to avoid race conditions
                              setEditedDraft({
                                ...editedDraft,
                                generatorState: {
                                  ...editedDraft.generatorState!,
                                  reviewedContent: newReviewedContent
                                },
                                updatedAt: new Date().toISOString(),
                              });
                            }}
                            rows={25}
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {reviewedContent.length} Zeichen | ~{Math.ceil(reviewedContent.split(/\s+/).length / 200)} Min. Lesezeit
                          </p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                          <h6 className="font-semibold text-amber-900 mb-2 text-sm">💡 Tipps für die Überarbeitung</h6>
                          <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
                            <li>Prüfe Fakten und Zahlen auf Korrektheit</li>
                            <li>Füge persönliche Erfahrungen und Beispiele hinzu</li>
                            <li>Stelle sicher, dass die FAQs relevant sind</li>
                            <li>Optimiere die Sprache für deine Zielgruppe</li>
                          </ul>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Button onClick={() => setGeneratorStep('content-generation')} variant="outline">
                            ← Content neu generieren
                          </Button>
                          <Button
                            onClick={handleSaveReviewedContent}
                            size="lg"
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Content freigeben →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Step 7: Page Design / Code Generation */}
                {generatorStep === 'page-design' && (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-300 p-6 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-3 text-lg flex items-center gap-2">
                        <Code className="w-6 h-6" />
                        Finale Wissensseite erstellen
                      </h5>
                      <p className="text-sm text-blue-800 mb-4">
                        Im letzten Schritt wird aus deinem überarbeiteten Content eine vollständige TSX-Komponente
                        mit dem KnowledgePageTemplate generiert.
                      </p>
                    </div>

                    <Card className="border-2 border-blue-300">
                      <CardContent className="pt-6 space-y-4">
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                          <h6 className="font-semibold text-green-900 mb-2 text-sm">✅ Bereit zur Finalisierung</h6>
                          <div className="grid grid-cols-2 gap-2 text-xs text-green-800 mt-2">
                            <div><strong>Titel:</strong> {editedDraft.title}</div>
                            <div><strong>Slug:</strong> {editedDraft.slug}</div>
                            <div><strong>Kategorie:</strong> {editedDraft.category}</div>
                            <div><strong>Keywords:</strong> {editedDraft.keywords.length}</div>
                            <div><strong>Content:</strong> {Math.ceil(reviewedContent.split(/\s+/).length)} Wörter</div>
                            <div><strong>Autor:</strong> Martin Lang</div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                          <h6 className="font-semibold text-blue-900 mb-2 text-sm">Was wird erstellt?</h6>
                          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                            <li>Vollständige TSX-Komponente mit KnowledgePageTemplate</li>
                            <li>Strukturierter JSX-Content aus deinem Markdown</li>
                            <li>FAQ-Sektion mit Schema.org Markup</li>
                            <li>Automatisches Table of Contents</li>
                            <li>SEO-Metadaten und Author Bio</li>
                            <li>Sofort einsatzbereit</li>
                          </ul>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Button onClick={() => setGeneratorStep('content-review')} variant="outline">
                            ← Content überarbeiten
                          </Button>
                          <Button
                            onClick={handleGenerateFinalPage}
                            size="lg"
                            disabled={isGenerating || !openAIKey}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <Code className="w-5 h-5 mr-2" />
                            {isGenerating ? 'Erstelle Seite...' : 'Finale Seite erstellen →'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Step 8: Completed */}
                {generatorStep === 'completed' && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 p-8 rounded-lg text-center">
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                    <h5 className="font-semibold text-green-900 mb-3 text-3xl">
                      🎉 Wissensseite erfolgreich erstellt!
                    </h5>
                    <p className="text-gray-700 mb-6 text-lg">
                      Deine KI-optimierte Wissensseite ist fertig. Du kannst sie jetzt überprüfen,
                      bei Bedarf anpassen und veröffentlichen.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <Button onClick={() => setActiveTab('preview')} variant="default" size="lg">
                        <Eye className="w-5 h-5 mr-2" />
                        Vorschau ansehen
                      </Button>
                      <Button onClick={() => setActiveTab('code-upload')} variant="outline" size="lg">
                        <Code className="w-5 h-5 mr-2" />
                        Code bearbeiten
                      </Button>
                      <Button onClick={() => setActiveTab('metadata')} variant="outline" size="lg">
                        Metadaten anpassen
                      </Button>
                      <Button onClick={() => setGeneratorStep('content-review')} variant="outline">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Content überarbeiten
                      </Button>
                      <Button onClick={handleResetGenerator} variant="ghost">
                        Neu starten
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Upload Tab */}
          <TabsContent value="code-upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code hochladen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    📤 Fertige Wissensseiten hochladen
                  </h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Wenn du deine Wissensseite mit einem anderen Tool (z.B. AI, Code-Generator) erstellt hast,
                    kannst du hier die fertige TSX/JSX-Datei hochladen. Der Code wird direkt beim Veröffentlichen verwendet.
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                    <li>Unterstützte Formate: .tsx, .jsx, .ts, .js</li>
                    <li>Der Code sollte eine vollständige React-Komponente sein</li>
                    <li>ContentLayout und andere Komponenten werden automatisch eingebunden</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="file-upload">Code-Datei auswählen</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".tsx,.jsx,.ts,.js"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Datei wählen
                    </Button>
                  </div>
                </div>

                {editedDraft.contentType === 'code' && editedDraft.codeFileName && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ <strong>Hochgeladen:</strong> {editedDraft.codeFileName}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {editedDraft.content.split('\n').length} Zeilen Code
                    </p>
                  </div>
                )}

                {editedDraft.contentType === 'code' && (
                  <div>
                    <Label>Code-Vorschau</Label>
                    <div className="mt-2 border rounded-lg bg-gray-50 p-4 max-h-96 overflow-auto">
                      <pre className="text-xs font-mono">
                        <code>{editedDraft.content}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {editedDraft.contentType === 'markdown' && (
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      Du befindest dich im Markdown-Modus.
                    </p>
                    <Button
                      onClick={handleSwitchToCode}
                      variant="default"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Zu Code-Upload wechseln
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metadata Tab */}
          <TabsContent value="metadata" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Artikel-Metadaten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="publishDate">Veröffentlichungsdatum</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      value={editedDraft.publishDate.slice(0, 16)}
                      onChange={(e) =>
                        handleChange("publishDate", new Date(e.target.value).toISOString())
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editedDraft.status}
                      onValueChange={(value) => handleChange("status", value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Entwurf</SelectItem>
                        <SelectItem value="scheduled">Geplant</SelectItem>
                        <SelectItem value="published">Veröffentlicht</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Kategorie</Label>
                    <Input
                      id="category"
                      value={editedDraft.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="readTime">Lesezeit</Label>
                    <Input
                      id="readTime"
                      value={editedDraft.readTime}
                      onChange={(e) => handleChange("readTime", e.target.value)}
                      placeholder="z.B. 5 Minuten"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL-Slug</Label>
                    <Input
                      id="slug"
                      value={editedDraft.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: /wissen/{editedDraft.slug}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="icon">Icon (Emoji)</Label>
                    <Input
                      id="icon"
                      value={editedDraft.icon}
                      onChange={(e) => handleChange("icon", e.target.value)}
                      maxLength={2}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="keywords">SEO Keywords (kommagetrennt)</Label>
                  <Textarea
                    id="keywords"
                    value={editedDraft.keywords.join(", ")}
                    onChange={(e) =>
                      handleChange(
                        "keywords",
                        e.target.value.split(",").map((k) => k.trim())
                      )
                    }
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Autor</Label>
                  <div className="mt-2">
                    <Badge variant="outline">{editedDraft.author}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            {/* Show full page preview if we have content */}
            {(editedDraft.generatorState?.reviewedContent || editedDraft.content) && editedDraft.title ? (
              <div className="space-y-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900 font-semibold mb-1">Live-Vorschau der finalen Seite</p>
                        <p className="text-xs text-blue-800">
                          So wird die Seite später für Besucher aussehen - mit Header, Navigation, Table of Contents und allen Styles.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-0">
                    <div className="border rounded-lg overflow-hidden">
                      {(() => {
                        try {
                          const content = editedDraft.generatorState?.reviewedContent || editedDraft.content || '';

                          return (
                            <KnowledgePagePreview
                              title={editedDraft.title || 'Artikel'}
                              description={editedDraft.description || ''}
                              slug={editedDraft.slug || 'artikel'}
                              keywords={editedDraft.keywords || []}
                              category={editedDraft.category || ''}
                              readTime={editedDraft.readTime || '5 Min.'}
                              publishDate={editedDraft.publishDate || new Date().toISOString()}
                              authorId={editedDraft.author || 'martin-lang'}
                              markdownContent={content}
                            />
                          );
                        } catch (error) {
                          console.error('Error rendering preview:', error);
                          return (
                            <div className="p-8 text-center">
                              <p className="text-red-600 font-semibold mb-2">Fehler beim Laden der Vorschau</p>
                              <p className="text-sm text-gray-600">
                                Bitte versuche die Seite neu zu laden oder kontaktiere den Support.
                              </p>
                              <pre className="mt-4 text-xs text-left bg-gray-100 p-4 rounded overflow-auto max-h-40">
                                {error instanceof Error ? error.message : 'Unbekannter Fehler'}
                              </pre>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-900 font-semibold mb-1">Vorschau-Modus</p>
                      <p className="text-xs text-blue-800">
                        {editedDraft.generatorState?.reviewedContent
                          ? 'Dies ist eine Vorschau deines bearbeiteten Markdown-Inhalts. Die finale Seite verwendet das KnowledgePageTemplate mit zusätzlichen Funktionen.'
                          : editedDraft.contentType === 'code'
                          ? 'Dies ist eine Code-Vorschau. Die tatsächliche Darstellung kann je nach verwendeten Komponenten variieren.'
                          : 'Dies ist eine Vorschau deines Markdown-Inhalts. Die tatsächliche Darstellung verwendet das KnowledgePageTemplate.'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metadata Preview */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{editedDraft.icon || '📝'}</span>
                        <CardTitle className="text-3xl">{editedDraft.title || 'Titel fehlt'}</CardTitle>
                      </div>
                      <p className="text-lg text-gray-600">{editedDraft.description || 'Beschreibung fehlt'}</p>
                      <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                        <span>📅 {new Date(editedDraft.publishDate).toLocaleDateString('de-DE')}</span>
                        <span>⏱️ {editedDraft.readTime || 'Keine Angabe'}</span>
                        {editedDraft.category && <Badge variant="outline">{editedDraft.category}</Badge>}
                        <Badge variant="secondary">{editedDraft.status}</Badge>
                      </div>
                      {editedDraft.keywords.length > 0 && (
                        <div className="mt-3">
                          <div className="text-xs text-gray-500 mb-2">SEO Keywords:</div>
                          <div className="flex flex-wrap gap-2">
                            {editedDraft.keywords.slice(0, 8).map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                            {editedDraft.keywords.length > 8 && (
                              <Badge variant="outline" className="text-xs">
                                +{editedDraft.keywords.length - 8} weitere
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Content Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editedDraft.generatorState?.reviewedContent ? (
                      <>
                        <Eye className="w-5 h-5" />
                        Artikel-Vorschau (Markdown)
                      </>
                    ) : editedDraft.contentType === 'code' ? (
                      <>
                        <Code className="w-5 h-5" />
                        Code-Vorschau
                      </>
                    ) : (
                      <>
                        📄 Inhalt-Vorschau
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editedDraft.generatorState?.reviewedContent ? (
                    // Show the reviewed markdown content from generator
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                        <p className="text-xs text-green-800">
                          <strong>✨ Content Generator:</strong> Dies ist dein bearbeiteter Artikel-Content. Die finale TSX-Komponente wurde bereits generiert und ist einsatzbereit.
                        </p>
                      </div>
                      {renderMarkdownPreview(editedDraft.generatorState.reviewedContent)}
                    </div>
                  ) : editedDraft.content ? (
                    <>
                      {editedDraft.contentType === 'code' ? (
                        <div className="space-y-4">
                          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                            <p className="text-xs text-amber-800">
                              <strong>Hinweis:</strong> Der hochgeladene Code wird beim Veröffentlichen direkt als React-Komponente verwendet.
                              {editedDraft.codeFileName && <span className="ml-2">Datei: <code className="font-mono">{editedDraft.codeFileName}</code></span>}
                            </p>
                          </div>
                          <div className="border rounded-lg bg-gray-50 p-4 max-h-96 overflow-auto">
                            <pre className="text-xs font-mono whitespace-pre-wrap">
                              <code>{editedDraft.content}</code>
                            </pre>
                          </div>
                        </div>
                      ) : (
                        renderMarkdownPreview(editedDraft.content)
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <p>Noch kein Inhalt vorhanden.</p>
                      <p className="text-sm mt-2">Wechsle zum Tab "Inhalt" oder "Content Generator" um Inhalt zu erstellen.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DraftEditor;
