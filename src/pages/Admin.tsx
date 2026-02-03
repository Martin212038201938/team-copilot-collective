import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Edit, Eye, Trash2, Plus, Clock, CheckCircle, FileText, LayoutList } from "lucide-react";
import { Draft } from "@/types/draft";
import DraftEditor from "@/components/DraftEditor";
import AdminAuth from "@/components/AdminAuth";
import EditorialCalendar from "@/components/EditorialCalendar";

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
  const [editorInitialTab, setEditorInitialTab] = useState<string | undefined>(undefined);
  const [mainView, setMainView] = useState<'drafts' | 'editorial'>('editorial');

  useEffect(() => {
    loadDrafts();
  }, []);

  // Persist drafts to localStorage whenever they change
  useEffect(() => {
    if (drafts.length > 0) {
      localStorage.setItem('copilot-drafts', JSON.stringify(drafts));
    }
  }, [drafts]);

  const loadDrafts = async () => {
    try {
      // Load from localStorage first
      const savedDrafts = localStorage.getItem('copilot-drafts');
      const localDrafts: Draft[] = savedDrafts ? JSON.parse(savedDrafts) : [];
      
      // Also load from JSON files to catch new drafts
      const draftFiles = [
        'copilot-sicherheit',
        'copilot-tipps-tricks', 
        'copilot-roi-berechnen',
        'copilot-fuer-word',
        'microsoft-copilot-agents-guide',
        'microsoft-copilot-einsteiger-guide',
        'microsoft-copilot-memory-guide',
        'copilot-adoption-2026-zahlen'
      ];
      
      const jsonDrafts: Draft[] = [];
      for (const file of draftFiles) {
        try {
          const response = await fetch(`/content/drafts/${file}.json`);
          if (response.ok) {
            const draft = await response.json();
            jsonDrafts.push(draft);
          }
        } catch (error) {
          console.error(`Error loading ${file}:`, error);
        }
      }

      // Merge: localStorage wins for existing drafts, but add new ones from JSON
      const localIds = new Set(localDrafts.map(d => d.id));
      const newFromJson = jsonDrafts.filter(d => !localIds.has(d.id));
      
      const mergedDrafts = [...localDrafts, ...newFromJson];
      
      if (mergedDrafts.length > 0) {
        setDrafts(mergedDrafts);
        localStorage.setItem('copilot-drafts', JSON.stringify(mergedDrafts));
        console.log(`Loaded ${localDrafts.length} from localStorage, ${newFromJson.length} new from JSON`);
      }
    } catch (error) {
      console.error("Error loading drafts:", error);
    }
  };

  const handleEdit = (draft: Draft) => {
    setSelectedDraft(draft);
    setEditorInitialTab(undefined);
    setIsEditing(true);
  };

  const handlePreview = (draft: Draft) => {
    setSelectedDraft(draft);
    setEditorInitialTab("preview");
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    const newDraft: Draft = {
      id: `draft-${Date.now()}`,
      title: "",
      description: "",
      content: "",
      contentType: 'markdown',
      publishDate: new Date().toISOString(),
      author: "martin-lang",
      category: "",
      slug: "",
      keywords: [],
      readTime: "",
      icon: "📝",
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedDraft(newDraft);
    setEditorInitialTab("content-generator");
    setIsEditing(true);
  };

  const handleSave = (updatedDraft: Draft) => {
    // In production, this would save to the backend/Git
    const existingDraftIndex = drafts.findIndex(d => d.id === updatedDraft.id);
    if (existingDraftIndex >= 0) {
      // Update existing draft
      setDrafts(drafts.map(d => d.id === updatedDraft.id ? updatedDraft : d));
    } else {
      // Add new draft
      setDrafts([...drafts, updatedDraft]);
    }
    setIsEditing(false);
    setSelectedDraft(null);
    setEditorInitialTab(undefined);
    console.log("Draft saved:", updatedDraft);
  };

  const handleDelete = (id: string) => {
    if (confirm("Möchten Sie diesen Entwurf wirklich löschen?")) {
      setDrafts(drafts.filter(d => d.id !== id));
    }
  };

  const validateDraft = (draft: Draft): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!draft.title?.trim()) errors.push('Titel fehlt');
    if (!draft.description?.trim()) errors.push('Beschreibung fehlt');
    if (!draft.slug?.trim()) errors.push('Slug fehlt');
    if (!draft.content?.trim()) errors.push('Inhalt fehlt');
    if (!draft.category?.trim()) errors.push('Kategorie fehlt');
    if (!draft.readTime?.trim()) errors.push('Lesezeit fehlt');
    if (!draft.keywords || draft.keywords.length === 0) errors.push('Keywords fehlen');

    return { valid: errors.length === 0, errors };
  };

  const handlePublishNow = (draft: Draft) => {
    const validation = validateDraft(draft);

    if (!validation.valid) {
      alert(`❌ Veröffentlichung nicht möglich!\n\nFolgende Pflichtfelder fehlen:\n\n${validation.errors.map(e => `• ${e}`).join('\n')}\n\nBitte bearbeite den Artikel und fülle alle Felder aus.`);
      return;
    }

    if (confirm(`Artikel "${draft.title}" jetzt veröffentlichen?\n\nDer Artikel wird sofort auf der Website unter /wissen/${draft.slug} verfügbar sein.`)) {
      const publishedDraft: Draft = {
        ...draft,
        status: 'published',
        publishDate: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      handleSave(publishedDraft);
      alert(`✅ Artikel wurde erfolgreich veröffentlicht!\n\nDer Artikel ist jetzt unter /wissen/${draft.slug} verfügbar.`);
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
          setEditorInitialTab(undefined);
        }}
        initialTab={editorInitialTab}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">
              Redaktionssystem
            </h1>
            <p className="text-lg text-gray-600">
              Verwalten Sie Ihre Wissen-Artikel
            </p>
          </div>
          {mainView === 'drafts' && (
            <Button
              onClick={handleCreateNew}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Neue Wissensseite erstellen
            </Button>
          )}
        </div>

        {/* Main View Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={mainView === 'editorial' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setMainView('editorial')}
            className="flex items-center gap-2"
          >
            <LayoutList className="w-5 h-5" />
            Redaktionsplan
          </Button>
          <Button
            variant={mainView === 'drafts' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setMainView('drafts')}
            className="flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Entwürfe / Drafts
          </Button>
        </div>

        {/* Editorial Calendar View */}
        {mainView === 'editorial' && (
          <EditorialCalendar />
        )}

        {/* Drafts View */}
        {mainView === 'drafts' && (
          <>

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

                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={() => handleEdit(draft)}
                    variant="default"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Bearbeiten
                  </Button>
                  <Button
                    onClick={() => handlePreview(draft)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Vorschau
                  </Button>
                  {draft.status !== 'published' && (
                    <Button
                      onClick={() => handlePublishNow(draft)}
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Jetzt veröffentlichen
                    </Button>
                  )}
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
        </>
        )}
      </div>
    </div>
  );
};

export default Admin;
