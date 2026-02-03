import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Edit,
  Eye,
  EyeOff,
  RefreshCw,
  ExternalLink,
  Clock,
  FileText,
  Check,
  X
} from "lucide-react";

// Typ für Artikel-Metadaten
interface ArticleMetadata {
  id: string;
  title: string;
  description: string;
  link: string;
  badge: string;
  icon: string;
  readTime: string;
  lastUpdated: string;
  publishDate?: string;
  publishTime?: string;
  isPublished: boolean;
  isStatic: boolean; // true = TSX-Datei, false = Draft
}

// Statische Artikel aus Wissen.tsx (diese existieren als TSX-Dateien)
const DEFAULT_STATIC_ARTICLES: ArticleMetadata[] = [
  {
    id: "copilot-unternehmensweit-einfuehren",
    title: "Warum Unternehmen Microsoft Copilot zentral einführen sollten",
    description: "Warum Shadow-IT bei KI gefährlich ist: Zentrale Copilot-Einführung sichert DSGVO-Konformität, Grounding mit Unternehmensdaten und unternehmensweite Synergien.",
    link: "/wissen/copilot-unternehmensweit-einfuehren",
    badge: "Neu",
    icon: "🏢",
    readTime: "12 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-02-02",
    publishTime: "10:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "ki-realitaet-beratungsfirmen-2026",
    title: "KI in deutschen Unternehmen 2026: Was die großen Beratungsfirmen wirklich sehen",
    description: "Umfassende Analyse von McKinsey, BCG, Deloitte, PwC, KPMG: Aktuelle KI-Investitionen, ROI-Realität und warum 80% der Unternehmen noch keine Ergebnisse sehen.",
    link: "/wissen/ki-realitaet-beratungsfirmen-2026",
    badge: "Strategie",
    icon: "📊",
    readTime: "18 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-02-02",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "microsoft-copilot-lizenzen",
    title: "Microsoft Copilot Lizenzen 2026: Preise, Vergleich & Empfehlungen",
    description: "Welche Microsoft Copilot Lizenz benötigen Sie? Umfassender Vergleich aller Lizenzmodelle für Microsoft 365 Copilot, GitHub Copilot und Copilot Studio mit aktuellen Preisen.",
    link: "/microsoft-copilot-lizenzen",
    badge: "Lizenzierung",
    icon: "📋",
    readTime: "12 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-15",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "github-copilot",
    title: "GitHub Copilot: Der ultimative Leitfaden für Entwickler",
    description: "Der ultimative Leitfaden für Entwickler: Setup, Best Practices und Advanced Features für produktiveres Coding mit KI-Unterstützung.",
    link: "/github-copilot",
    badge: "Entwicklung",
    icon: "💻",
    readTime: "12 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-10",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-studio",
    title: "Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen",
    description: "Low-Code-Plattform für eigene KI-Agenten: Custom Copilots, Chatbots und Automatisierungen ohne Programmierkenntnisse erstellen.",
    link: "/copilot-studio",
    badge: "Entwicklung",
    icon: "🤖",
    readTime: "10 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-08",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering für Microsoft Copilot: Best Practices",
    description: "Meistern Sie die Kunst des Prompt Engineerings: Praxiserprobte Techniken für effektive Copilot-Prompts in Word, Excel, PowerPoint und mehr.",
    link: "/prompt-engineering",
    badge: "Grundlagen",
    icon: "✨",
    readTime: "15 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-05",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "ki-agenten",
    title: "KI-Agenten im Unternehmen: Autonome Workflows mit Copilot",
    description: "Von der Automatisierung zur Autonomie: Wie KI-Agenten Ihre Geschäftsprozesse transformieren und was das für Ihr Unternehmen bedeutet.",
    link: "/ki-agenten",
    badge: "Fortgeschritten",
    icon: "🧠",
    readTime: "14 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-03",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-fehler-vermeiden",
    title: "Die 10 häufigsten Copilot-Fehler und wie Sie sie vermeiden",
    description: "Lernen Sie aus den Fehlern anderer: Die häufigsten Stolperfallen bei der Copilot-Nutzung und praxiserprobte Lösungen.",
    link: "/copilot-fehler-vermeiden",
    badge: "Best Practices",
    icon: "⚠️",
    readTime: "11 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-01",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-roi-berechnen",
    title: "Copilot ROI berechnen: Lohnt sich die Investition?",
    description: "Praxisnahe Methoden zur ROI-Berechnung für Microsoft Copilot. Mit konkreten Formeln, Beispielrechnungen und Benchmarks.",
    link: "/wissen/copilot-roi-berechnen",
    badge: "ROI",
    icon: "💰",
    readTime: "10 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-12-15",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-fuer-word",
    title: "Copilot für Word: Dokumente schneller erstellen",
    description: "Praktische Anleitungen für den Einsatz von Copilot in Microsoft Word: Von der Dokumenterstellung bis zur Überarbeitung.",
    link: "/wissen/copilot-fuer-word",
    badge: "Anwendung",
    icon: "📝",
    readTime: "8 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-12-10",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-sicherheit-datenschutz",
    title: "Copilot Sicherheit & Datenschutz: Was Unternehmen wissen müssen",
    description: "DSGVO-Konformität, Datensicherheit und Governance bei Microsoft Copilot: Ein Leitfaden für IT-Verantwortliche.",
    link: "/wissen/copilot-sicherheit-datenschutz",
    badge: "Compliance",
    icon: "🔒",
    readTime: "12 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-12-05",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-tipps-tricks-produktivitaet",
    title: "Copilot Tipps & Tricks für maximale Produktivität",
    description: "25 praxiserprobte Tipps und Tricks für den effizienten Einsatz von Microsoft Copilot im Arbeitsalltag.",
    link: "/wissen/copilot-tipps-tricks-produktivitaet",
    badge: "Produktivität",
    icon: "🚀",
    readTime: "9 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-12-01",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-training-schulung",
    title: "Copilot Training & Schulung: Der komplette Leitfaden",
    description: "Alles über Copilot-Schulungen: Formate, Inhalte, Kosten und wie Sie das richtige Training für Ihr Team finden.",
    link: "/wissen/copilot-training-schulung",
    badge: "Training",
    icon: "🎓",
    readTime: "11 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-11-25",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  }
];

const STORAGE_KEY = 'editorial-calendar-articles';

const EditorialCalendar = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [editingArticle, setEditingArticle] = useState<ArticleMetadata | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'unpublished'>('all');

  // Lade Artikel beim Start
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setArticles(parsed);
      } catch {
        setArticles(DEFAULT_STATIC_ARTICLES);
      }
    } else {
      setArticles(DEFAULT_STATIC_ARTICLES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATIC_ARTICLES));
    }
  }, []);

  // Speichere bei Änderungen
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    }
  }, [articles]);

  const handleEditClick = (article: ArticleMetadata) => {
    setEditingArticle({ ...article });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingArticle) return;

    setArticles(articles.map(a =>
      a.id === editingArticle.id ? editingArticle : a
    ));
    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  const handleTogglePublish = (article: ArticleMetadata) => {
    const action = article.isPublished ? 'unveröffentlichen' : 'veröffentlichen';
    if (confirm(`Möchten Sie "${article.title}" wirklich ${action}?`)) {
      setArticles(articles.map(a =>
        a.id === article.id ? { ...a, isPublished: !a.isPublished } : a
      ));
    }
  };

  const handleRefreshDate = (article: ArticleMetadata) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace('.', '');

    setArticles(articles.map(a =>
      a.id === article.id ? { ...a, lastUpdated: formattedDate } : a
    ));
  };

  const handleOpenArticle = (link: string) => {
    window.open(link, '_blank');
  };

  const filteredArticles = articles.filter(article => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'published') return article.isPublished;
    if (filterStatus === 'unpublished') return !article.isPublished;
    return true;
  }).sort((a, b) => {
    // Sortiere nach Veröffentlichungsdatum (neueste zuerst)
    const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Redaktionsplan</h2>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Wissensartikel und deren Veröffentlichung
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            Alle ({articles.length})
          </Button>
          <Button
            variant={filterStatus === 'published' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('published')}
          >
            <Check className="w-4 h-4 mr-1" />
            Veröffentlicht ({articles.filter(a => a.isPublished).length})
          </Button>
          <Button
            variant={filterStatus === 'unpublished' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('unpublished')}
          >
            <X className="w-4 h-4 mr-1" />
            Unveröffentlicht ({articles.filter(a => !a.isPublished).length})
          </Button>
        </div>
      </div>

      {/* Artikel-Liste */}
      <div className="space-y-3">
        {filteredArticles.map((article) => (
          <Card
            key={article.id}
            className={`transition-all ${!article.isPublished ? 'opacity-60 border-dashed' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-3xl flex-shrink-0">{article.icon}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{article.title}</h3>
                    <Badge variant={article.isPublished ? "default" : "secondary"}>
                      {article.isPublished ? "Live" : "Unveröffentlicht"}
                    </Badge>
                    <Badge variant="outline">{article.badge}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publishDate} {article.publishTime && `um ${article.publishTime}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Aktualisiert: {article.lastUpdated}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenArticle(article.link)}
                    title="Artikel öffnen"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(article)}
                    title="Bearbeiten"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRefreshDate(article)}
                    title="Datum aktualisieren"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={article.isPublished ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleTogglePublish(article)}
                    title={article.isPublished ? "Unveröffentlichen" : "Veröffentlichen"}
                  >
                    {article.isPublished ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Artikel bearbeiten</DialogTitle>
            <DialogDescription>
              Ändern Sie die Metadaten des Artikels. Die eigentlichen Inhalte müssen in der TSX-Datei bearbeitet werden.
            </DialogDescription>
          </DialogHeader>

          {editingArticle && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Input
                    id="description"
                    value={editingArticle.description}
                    onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="publishDate">Veröffentlichungsdatum</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={editingArticle.publishDate || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, publishDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="publishTime">Veröffentlichungszeit</Label>
                  <Input
                    id="publishTime"
                    type="time"
                    value={editingArticle.publishTime || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, publishTime: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="lastUpdated">Zuletzt aktualisiert</Label>
                  <Input
                    id="lastUpdated"
                    value={editingArticle.lastUpdated}
                    onChange={(e) => setEditingArticle({ ...editingArticle, lastUpdated: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="readTime">Lesezeit</Label>
                  <Input
                    id="readTime"
                    value={editingArticle.readTime}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="badge">Badge</Label>
                  <Input
                    id="badge"
                    value={editingArticle.badge}
                    onChange={(e) => setEditingArticle({ ...editingArticle, badge: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="icon">Icon (Emoji)</Label>
                  <Input
                    id="icon"
                    value={editingArticle.icon}
                    onChange={(e) => setEditingArticle({ ...editingArticle, icon: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    value={editingArticle.link}
                    onChange={(e) => setEditingArticle({ ...editingArticle, link: e.target.value })}
                  />
                </div>
              </div>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-4">
                  <p className="text-sm text-amber-800">
                    <strong>Hinweis:</strong> Die Textinhalte des Artikels können Sie direkt in der TSX-Datei
                    unter <code className="bg-amber-100 px-1 rounded">src/pages/</code> bearbeiten oder
                    im VS Code öffnen.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSave}>
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Über den Redaktionsplan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-800">
            Dieser Redaktionsplan verwaltet die Metadaten Ihrer Wissensartikel. Die Änderungen werden
            lokal im Browser gespeichert. Um die Änderungen live zu schalten, müssen Sie die entsprechenden
            TSX-Dateien und <code className="bg-blue-100 px-1 rounded">Wissen.tsx</code> aktualisieren und deployen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorialCalendar;
