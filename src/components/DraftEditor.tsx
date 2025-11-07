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
import { ArrowLeft, Save, Eye } from "lucide-react";
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
            <TabsTrigger value="content">Inhalt</TabsTrigger>
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
                <CardTitle>Artikel-Inhalt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label htmlFor="content">Inhalt (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={editedDraft.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    rows={25}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Markdown-Formatierung wird unterstützt (# Überschriften, **fett**, *kursiv*, - Listen, etc.)
                  </p>
                </div>
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
