import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Edit, Eye, Trash2, Plus, Clock, CheckCircle } from "lucide-react";
import { Draft } from "@/types/draft";
import DraftEditor from "@/components/DraftEditor";
import AdminAuth from "@/components/AdminAuth";

const Admin = () => {
  return (
    <AdminAuth>
      <AdminContent />
    </AdminAuth>
  );
};

const AdminContent = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      // In production, this would be an API call
      // For now, we'll load from the JSON files
      const draftFiles = ['copilot-sicherheit', 'copilot-tipps-tricks', 'copilot-roi-berechnen'];
      const loadedDrafts: Draft[] = [];

      for (const file of draftFiles) {
        try {
          const response = await fetch(`/content/drafts/${file}.json`);
          if (response.ok) {
            const draft = await response.json();
            loadedDrafts.push(draft);
          }
        } catch (error) {
          console.error(`Error loading ${file}:`, error);
        }
      }

      setDrafts(loadedDrafts);
    } catch (error) {
      console.error("Error loading drafts:", error);
    }
  };

  const handleEdit = (draft: Draft) => {
    setSelectedDraft(draft);
    setIsEditing(true);
  };

  const handleSave = (updatedDraft: Draft) => {
    // In production, this would save to the backend/Git
    setDrafts(drafts.map(d => d.id === updatedDraft.id ? updatedDraft : d));
    setIsEditing(false);
    setSelectedDraft(null);
    console.log("Draft saved:", updatedDraft);
  };

  const handleDelete = (id: string) => {
    if (confirm("Möchten Sie diesen Entwurf wirklich löschen?")) {
      setDrafts(drafts.filter(d => d.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: Draft['status']) => {
    const variants = {
      draft: { label: "Entwurf", variant: "secondary" as const },
      scheduled: { label: "Geplant", variant: "default" as const },
      published: { label: "Veröffentlicht", variant: "outline" as const }
    };
    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  const filteredDrafts = drafts.filter(draft => {
    if (activeTab === "all") return true;
    if (activeTab === "scheduled") return draft.status === "scheduled";
    if (activeTab === "published") return draft.status === "published";
    if (activeTab === "draft") return draft.status === "draft";
    return true;
  });

  if (isEditing && selectedDraft) {
    return (
      <DraftEditor
        draft={selectedDraft}
        onSave={handleSave}
        onCancel={() => {
          setIsEditing(false);
          setSelectedDraft(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Redaktionssystem
          </h1>
          <p className="text-lg text-gray-600">
            Verwalten Sie Ihre geplanten Wissen-Artikel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Alle Entwürfe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{drafts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Geplant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {drafts.filter(d => d.status === 'scheduled').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Veröffentlicht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {drafts.filter(d => d.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Nächste Veröffentlichung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-purple-600">
                {drafts
                  .filter(d => d.status === 'scheduled')
                  .sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())[0]
                  ? new Date(drafts
                      .filter(d => d.status === 'scheduled')
                      .sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())[0]
                      .publishDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })
                  : "Keine"
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Alle</TabsTrigger>
            <TabsTrigger value="scheduled">Geplant</TabsTrigger>
            <TabsTrigger value="draft">Entwürfe</TabsTrigger>
            <TabsTrigger value="published">Veröffentlicht</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Drafts List */}
        <div className="space-y-4">
          {filteredDrafts.map((draft) => (
            <Card key={draft.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{draft.icon}</span>
                      <CardTitle className="text-xl">{draft.title}</CardTitle>
                      {getStatusBadge(draft.status)}
                    </div>
                    <CardDescription className="text-base">
                      {draft.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(draft.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{draft.readTime}</span>
                  </div>
                  <div>
                    <Badge variant="outline">{draft.category}</Badge>
                  </div>
                  <div className="text-right md:text-left">
                    <span className="text-xs text-gray-500">
                      Aktualisiert: {new Date(draft.updatedAt).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(draft)}
                    variant="default"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Bearbeiten
                  </Button>
                  <Button
                    onClick={() => console.log("Preview:", draft.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Vorschau
                  </Button>
                  <Button
                    onClick={() => handleDelete(draft.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Löschen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredDrafts.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">
                  Keine Artikel in dieser Kategorie gefunden.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Automatische Veröffentlichung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Artikel mit Status "Geplant" werden automatisch jeden <strong>Dienstag um 9:00 Uhr</strong> veröffentlicht,
              sofern das Veröffentlichungsdatum erreicht ist. Die Artikel erscheinen dann automatisch auf der
              Wissen-Übersichtsseite und sind für Besucher sichtbar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
