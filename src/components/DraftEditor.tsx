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
import { ArrowLeft, Save, Eye, Upload, Code, Sparkles, CheckCircle } from "lucide-react";
import { Draft } from "@/types/draft";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DraftEditorProps {
  draft: Draft;
  onSave: (draft: Draft) => void;
  onCancel: () => void;
  initialTab?: string;
}

// Content Generator Step Types
type GeneratorStep = 'transcript' | 'topics' | 'focus' | 'metadata' | 'preview';

interface ExtractedTopic {
  title: string;
  description: string;
  keywords: string[];
  relevance: number;
}

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
  const [transcript, setTranscript] = useState<string>("");
  const transcriptTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Content Generator State
  const [generatorStep, setGeneratorStep] = useState<GeneratorStep>('transcript');
  const [extractedTopics, setExtractedTopics] = useState<ExtractedTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<ExtractedTopic | null>(null);
  const [generatedMetadata, setGeneratedMetadata] = useState<GeneratedMetadata | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-focus transcript textarea when on content-generator tab
  useEffect(() => {
    if (activeTab === "content-generator" && transcriptTextareaRef.current) {
      setTimeout(() => {
        transcriptTextareaRef.current?.focus();
      }, 100);
    }
  }, [activeTab]);

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
      setIsGenerating(false);
    }, 800);
  };

  // Step 2: Select focus topic
  const handleSelectTopic = (topic: ExtractedTopic) => {
    setSelectedTopic(topic);
    setGeneratorStep('focus');

    // Auto-generate metadata
    setTimeout(() => {
      const metadata = generateMetadataFromTopic(topic, transcript);
      setGeneratedMetadata(metadata);
      setGeneratorStep('metadata');
    }, 500);
  };

  // Step 3: Apply generated metadata to draft
  const handleApplyMetadata = () => {
    if (!generatedMetadata) return;

    setEditedDraft({
      ...editedDraft,
      title: generatedMetadata.title,
      description: generatedMetadata.description,
      category: generatedMetadata.category,
      keywords: generatedMetadata.keywords,
      slug: generatedMetadata.slug,
      icon: generatedMetadata.icon,
      readTime: generatedMetadata.readTime,
      updatedAt: new Date().toISOString(),
    });

    setGeneratorStep('preview');
    alert('✅ Metadaten wurden automatisch ausgefüllt!\n\nWechsle zum Tab "Metadaten" um sie zu überprüfen oder anzupassen.');
  };

  // Reset generator
  const handleResetGenerator = () => {
    setGeneratorStep('transcript');
    setExtractedTopics([]);
    setSelectedTopic(null);
    setGeneratedMetadata(null);
  };

  const renderMarkdownPreview = () => {
    // Simple markdown preview (in production, use a proper markdown renderer)
    return (
      <div className="prose prose-lg max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: editedDraft.content
              .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
              .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>')
              .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.+?)\*/g, '<em>$1</em>')
              .replace(/^- (.+)$/gm, '<li>$1</li>')
              .replace(/\n\n/g, '</p><p class="mb-4">')
              .replace(/^(?!<[h|l])/gm, '<p class="mb-4">'),
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
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
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex items-center gap-2 ${generatorStep === 'transcript' ? 'text-blue-600 font-semibold' : generatorStep !== 'transcript' ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${generatorStep === 'transcript' ? 'bg-blue-600 text-white' : generatorStep !== 'transcript' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                      1
                    </div>
                    <span className="text-sm">Transkript</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div className={`h-full ${generatorStep !== 'transcript' ? 'bg-green-600' : 'bg-gray-200'}`} style={{ width: generatorStep === 'transcript' ? '0%' : '100%' }} />
                  </div>
                  <div className={`flex items-center gap-2 ${generatorStep === 'topics' ? 'text-blue-600 font-semibold' : ['focus', 'metadata', 'preview'].includes(generatorStep) ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${generatorStep === 'topics' ? 'bg-blue-600 text-white' : ['focus', 'metadata', 'preview'].includes(generatorStep) ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                      2
                    </div>
                    <span className="text-sm">Kernthemen</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div className={`h-full ${['focus', 'metadata', 'preview'].includes(generatorStep) ? 'bg-green-600' : 'bg-gray-200'}`} />
                  </div>
                  <div className={`flex items-center gap-2 ${generatorStep === 'focus' ? 'text-blue-600 font-semibold' : ['metadata', 'preview'].includes(generatorStep) ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${generatorStep === 'focus' ? 'bg-blue-600 text-white' : ['metadata', 'preview'].includes(generatorStep) ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                      3
                    </div>
                    <span className="text-sm">Fokus</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div className={`h-full ${['metadata', 'preview'].includes(generatorStep) ? 'bg-green-600' : 'bg-gray-200'}`} />
                  </div>
                  <div className={`flex items-center gap-2 ${generatorStep === 'metadata' ? 'text-blue-600 font-semibold' : generatorStep === 'preview' ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${generatorStep === 'metadata' ? 'bg-blue-600 text-white' : generatorStep === 'preview' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                      4
                    </div>
                    <span className="text-sm">Metadaten</span>
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

                {/* Step 3: Focus Selected (auto-transitions to metadata) */}
                {generatorStep === 'focus' && selectedTopic && (
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
                    <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
                    <h5 className="font-semibold text-blue-900 mb-2 text-lg">
                      Generiere Metadaten für: {selectedTopic.title}
                    </h5>
                    <p className="text-sm text-blue-800">
                      Bitte warten, während SEO-Keywords und Metadaten automatisch erstellt werden...
                    </p>
                  </div>
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
                        Überprüfe die automatisch generierten Metadaten. Du kannst sie später im Tab "Metadaten" anpassen.
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
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Metadaten übernehmen
                      </Button>
                    </div>
                  </>
                )}

                {/* Step 5: Success / Preview */}
                {generatorStep === 'preview' && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 p-8 rounded-lg text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h5 className="font-semibold text-green-900 mb-3 text-2xl">
                      ✅ Metadaten erfolgreich angewendet!
                    </h5>
                    <p className="text-gray-700 mb-6">
                      Alle Metadaten wurden automatisch ausgefüllt. Du kannst sie im Tab <strong>"Metadaten"</strong> überprüfen und anpassen.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => setActiveTab('metadata')} variant="default" size="lg">
                        Zu Metadaten →
                      </Button>
                      <Button onClick={() => setActiveTab('content')} variant="outline" size="lg">
                        Zum Inhalt →
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
            <div className="space-y-4">
              {/* Preview Notice */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-900 font-semibold mb-1">Vorschau-Modus</p>
                      <p className="text-xs text-blue-800">
                        {editedDraft.contentType === 'code'
                          ? 'Dies ist eine Vorschau deiner hochgeladenen Code-Datei. Die tatsächliche Darstellung kann je nach verwendeten Komponenten variieren.'
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
                    {editedDraft.contentType === 'code' ? (
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
                  {editedDraft.content ? (
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
                        <div className="prose prose-lg max-w-none">
                          {renderMarkdownPreview()}
                        </div>
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

              {/* URL Preview */}
              {editedDraft.slug && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-green-900">Veröffentlicht unter:</span>
                      <code className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">
                        /wissen/{editedDraft.slug}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DraftEditor;
