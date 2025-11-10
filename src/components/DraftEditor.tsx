import { useState } from "react";
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
import { ArrowLeft, Save, Eye, Upload, Code, Sparkles } from "lucide-react";
import { Draft } from "@/types/draft";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DraftEditorProps {
  draft: Draft;
  onSave: (draft: Draft) => void;
  onCancel: () => void;
}

const DraftEditor = ({ draft, onSave, onCancel }: DraftEditorProps) => {
  const [editedDraft, setEditedDraft] = useState<Draft>(draft);
  const [activeTab, setActiveTab] = useState("content");
  const [transcript, setTranscript] = useState<string>("");

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

  const handleGenerateContent = () => {
    if (!transcript.trim()) {
      alert('Bitte zuerst ein Transkript hochladen oder eingeben');
      return;
    }

    // Placeholder für Content-Generierung
    // Hier könnte später ein API-Call zu einem AI-Service erfolgen
    // Für jetzt: Nutzer muss manuell optimieren oder ich (Claude) erstelle die Seiten
    alert('Transkript gespeichert! Die Wissensseite kann nun manuell erstellt werden.');

    // Transkript in description speichern als Referenz
    setEditedDraft({
      ...editedDraft,
      description: `[AUTO-GENERATED FROM TRANSCRIPT]\n\n${transcript.substring(0, 500)}...`,
      updatedAt: new Date().toISOString(),
    });
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
                <CardTitle>Content Generator - KI-optimierte Wissensseiten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2 text-lg">
                        🎯 Aus YouTube-Transkripten werden KI-optimierte Wissensseiten
                      </h4>
                      <p className="text-sm text-purple-800 mb-3">
                        Lade YouTube-Transkripte oder Texte hoch und erstelle daraus hochwertige Wissensseiten,
                        die für KI-Sichtbarkeit optimiert sind (ChatGPT, Perplexity, Google AI Overviews).
                      </p>
                      <ul className="text-xs text-purple-700 space-y-1 list-disc list-inside">
                        <li>Optimiert nach E-E-A-T Guidelines (Experience, Expertise, Authority, Trust)</li>
                        <li>Strukturiert für AI Answer Engines</li>
                        <li>FAQ Schema.org Markup integriert</li>
                        <li>Performance-optimiert (&lt;2.5s Ladezeit)</li>
                      </ul>
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

                  <div className="flex items-end">
                    <Button
                      onClick={handleGenerateContent}
                      className="w-full"
                      variant="default"
                      disabled={!transcript.trim()}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Transkript speichern
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="transcript-text">Oder Transkript direkt eingeben/bearbeiten</Label>
                  <Textarea
                    id="transcript-text"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    rows={15}
                    className="font-mono text-sm"
                    placeholder="Füge hier dein YouTube-Transkript oder Text ein...

Beispiel:
[00:00] Willkommen zu diesem Video über Microsoft Copilot...
[00:15] Heute zeige ich euch die wichtigsten Features...

Das System wird daraus eine strukturierte Wissensseite erstellen."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {transcript.length > 0 ? `${transcript.length} Zeichen | ~${Math.ceil(transcript.split(' ').length / 200)} Minuten Lesezeit` : 'Warte auf Input...'}
                  </p>
                </div>

                {transcript.length > 0 && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-900 mb-2">✅ Transkript geladen</h5>
                    <p className="text-sm text-green-800 mb-2">
                      Das Transkript ist bereit für die Verarbeitung.
                    </p>
                    <div className="text-xs text-green-700 space-y-1">
                      <p><strong>Nächste Schritte:</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Klicke "Transkript speichern" um es zu speichern</li>
                        <li>Wechsle zum Tab "Metadata" und fülle Titel, Kategorie etc. aus</li>
                        <li>Die KI-optimierte Wissensseite wird dann manuell erstellt</li>
                      </ol>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">📋 Workflow</h5>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    <li>Transkript hochladen oder einfügen</li>
                    <li>System analysiert Content und identifiziert Kernthemen</li>
                    <li>Generiert strukturierte Wissensseite mit:
                      <ul className="ml-6 mt-1 text-xs list-disc list-inside">
                        <li>FAQ-Sektion (Schema.org markup)</li>
                        <li>Semantische Struktur (H1-H3)</li>
                        <li>Entity-reiche Sprache</li>
                        <li>Interne Verlinkungsvorschläge</li>
                      </ul>
                    </li>
                    <li>Manuelle Review & Optimierung</li>
                    <li>Veröffentlichung via Redaktionssystem</li>
                  </ol>
                </div>
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
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{editedDraft.icon}</span>
                      <CardTitle className="text-3xl">{editedDraft.title}</CardTitle>
                    </div>
                    <p className="text-lg text-gray-600">{editedDraft.description}</p>
                    <div className="flex gap-3 mt-3 text-sm text-gray-500">
                      <span>📅 {new Date(editedDraft.publishDate).toLocaleDateString('de-DE')}</span>
                      <span>⏱️ {editedDraft.readTime}</span>
                      <Badge variant="outline">{editedDraft.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  {renderMarkdownPreview()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DraftEditor;
