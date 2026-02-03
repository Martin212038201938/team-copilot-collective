import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

// ============================================================================
// REDAKTIONSPLAN - STATISCHE ARTIKEL
// ============================================================================
// WICHTIG: Bei jedem neuen Artikel MUSS hier ein Eintrag hinzugefügt werden!
//
// Workflow für neue Artikel:
// 1. TSX-Datei in src/pages/ erstellen
// 2. Route in App.tsx hinzufügen
// 3. Eintrag in Wissen.tsx staticKnowledgeTopics Array
// 4. HIER einen Eintrag zu DEFAULT_STATIC_ARTICLES hinzufügen (PFLICHT!)
//
// REGEL: Neue Artikel werden standardmäßig als DRAFT eingetragen:
//        isPublished: false
//        Nur wenn explizit um sofortige Veröffentlichung gebeten wird,
//        darf isPublished: true gesetzt werden.
// ============================================================================
const DEFAULT_STATIC_ARTICLES: ArticleMetadata[] = [
  {
    id: "copilot-roi-erfolgsgeschichten",
    title: "Copilot ROI: Was CEOs und Vorstände aus dem DACH-Raum berichten",
    description: "Wörtliche Zitate von Führungskräften bei Bayer, Siemens, Schaeffler, thyssenkrupp und der Schweizerischen Post über ihre Erfahrungen mit Microsoft Copilot.",
    link: "/wissen/copilot-roi-erfolgsgeschichten",
    badge: "Neu",
    icon: "💬",
    readTime: "12 Minuten",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "09:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-launch-kampagne",
    title: "Copilot Launch-Kampagne: So bringen Sie Ihr Unternehmen zum Fliegen",
    description: "Warum eine Copilot-Einführung anders ist als SAP oder Salesforce – und wie Sie mit der richtigen Launch-Kampagne nachhaltige Verhaltensänderung erreichen. Mit 15 konkreten Ideen.",
    link: "/wissen/copilot-launch-kampagne",
    badge: "Neu",
    icon: "🚀",
    readTime: "14 Minuten",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "08:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "prompt-bibliotheken-vs-training",
    title: "Warum Prompt-Bibliotheken Quatsch sind",
    description: "Prompt-Listen klingen gut, bringen aber wenig. Warum echtes Prompting-Training und Copilot-Agenten die besseren Alternativen sind – inklusive dem Zauberstab-Prompt.",
    link: "/wissen/prompt-bibliotheken-vs-training",
    badge: "Neu",
    icon: "🪄",
    readTime: "6 Minuten",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "07:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-digitales-gedaechtnis",
    title: "Digitales Gedächtnis mit Microsoft Copilot",
    description: "Wie Copilot mit Transkription, E-Mails, Chats und OneNote zum externen Gedächtnis wird. Praktische Prompts für vergessene Zusagen und Entscheidungen.",
    link: "/wissen/copilot-digitales-gedaechtnis",
    badge: "Praxisguide",
    icon: "🧠",
    readTime: "14 Minuten",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "06:00",
    isPublished: true,
    isStatic: true
  },
  {
    id: "copilot-unternehmensweit-einfuehren",
    title: "Warum Unternehmen Microsoft Copilot zentral einführen sollten",
    description: "Warum Shadow-IT bei KI gefährlich ist: Zentrale Copilot-Einführung sichert DSGVO-Konformität, Grounding mit Unternehmensdaten und unternehmensweite Synergien.",
    link: "/wissen/copilot-unternehmensweit-einfuehren",
    badge: "Strategie",
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

  // Lade Artikel beim Start - mit Merge-Logik für neue Artikel
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: ArticleMetadata[] = JSON.parse(saved);

        // Merge: Füge neue Artikel aus DEFAULT_STATIC_ARTICLES hinzu,
        // die noch nicht in localStorage sind
        const savedIds = new Set(parsed.map(a => a.id));
        const newArticles = DEFAULT_STATIC_ARTICLES.filter(a => !savedIds.has(a.id));

        if (newArticles.length > 0) {
          // Neue Artikel am Anfang hinzufügen
          const merged = [...newArticles, ...parsed];
          setArticles(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } else {
          setArticles(parsed);
        }
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

  // Auto-Publish: Prüfe jede Minute ob geplante Artikel veröffentlicht werden sollen
  useEffect(() => {
    const checkScheduledArticles = () => {
      const now = new Date();

      setArticles(prevArticles => {
        let hasChanges = false;

        const updatedArticles = prevArticles.map(article => {
          // Nur unveröffentlichte Artikel mit Datum prüfen
          if (!article.isPublished && article.publishDate) {
            let publishDateTime: Date;

            if (article.publishTime) {
              publishDateTime = new Date(`${article.publishDate}T${article.publishTime}`);
            } else {
              // Ohne Zeit: Beginn des Tages in lokaler Zeitzone
              const [year, month, day] = article.publishDate.split('-').map(Number);
              publishDateTime = new Date(year, month - 1, day, 0, 0, 0);
            }

            // Wenn das geplante Datum erreicht ist → veröffentlichen
            if (publishDateTime <= now) {
              hasChanges = true;
              return { ...article, isPublished: true };
            }
          }
          return article;
        });

        // Nur updaten wenn sich etwas geändert hat
        return hasChanges ? updatedArticles : prevArticles;
      });
    };

    // Initial prüfen
    checkScheduledArticles();

    // Alle 60 Sekunden prüfen
    const interval = setInterval(checkScheduledArticles, 60000);
    return () => clearInterval(interval);
  }, []); // Leeres Dependency Array - Interval läuft unabhängig

  const handleEditClick = (article: ArticleMetadata) => {
    setEditingArticle({ ...article });
    setIsDialogOpen(true);
  };

  // Hilfsfunktion für korrekten Datumsvergleich (lokale Zeitzone)
  const isDateInFuture = (dateStr: string, timeStr?: string): boolean => {
    const now = new Date();

    if (timeStr) {
      // Mit Zeit: direkter Vergleich
      const publishDateTime = new Date(`${dateStr}T${timeStr}`);
      return publishDateTime > now;
    } else {
      // Ohne Zeit: Vergleiche nur das Datum (lokale Zeitzone)
      const [year, month, day] = dateStr.split('-').map(Number);
      const publishDate = new Date(year, month - 1, day, 23, 59, 59); // Ende des Tages
      const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      return publishDate > todayEnd;
    }
  };

  // Hilfsfunktion: Datum im deutschen Format (z.B. "03. Feb. 2026")
  const formatDateGerman = (date: Date): string => {
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace('.', '');
  };

  // Hilfsfunktion: ISO-Datum zu deutschem Format (z.B. "2026-02-03" → "03. Feb. 2026")
  const isoToGermanDate = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return formatDateGerman(date);
  };

  // Handler für Artikel-Feld-Änderungen mit automatischem lastUpdated
  const handleArticleFieldChange = (field: keyof ArticleMetadata, value: string | boolean) => {
    if (!editingArticle) return;

    const now = new Date();
    const currentDateGerman = formatDateGerman(now);

    let updates: Partial<ArticleMetadata> = {
      [field]: value,
      lastUpdated: currentDateGerman // Automatisch aktuelles Datum setzen
    };

    // Wenn publishDate geändert wird, setze lastUpdated auf das neue publishDate
    if (field === 'publishDate' && typeof value === 'string' && value) {
      updates.lastUpdated = isoToGermanDate(value);
    }

    setEditingArticle({ ...editingArticle, ...updates });
  };

  const handleSave = () => {
    if (!editingArticle) return;

    let updatedArticle = { ...editingArticle };

    // Prüfe ob Veröffentlichungsdatum in der Zukunft liegt
    if (updatedArticle.publishDate) {
      const isFuture = isDateInFuture(updatedArticle.publishDate, updatedArticle.publishTime);

      if (isFuture) {
        // Datum liegt in der Zukunft → automatisch als "geplant" markieren (unveröffentlicht)
        updatedArticle.isPublished = false;
      }
    }

    // Functional update um Closure-Probleme zu vermeiden
    setArticles(prevArticles => prevArticles.map(a =>
      a.id === updatedArticle.id ? updatedArticle : a
    ));
    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  const handleTogglePublish = (article: ArticleMetadata) => {
    const action = article.isPublished ? 'unveröffentlichen' : 'veröffentlichen';
    if (confirm(`Möchten Sie "${article.title}" wirklich ${action}?`)) {
      // Functional update um Closure-Probleme zu vermeiden
      setArticles(prevArticles => prevArticles.map(a =>
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

    // Functional update um Closure-Probleme zu vermeiden
    setArticles(prevArticles => prevArticles.map(a =>
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
                    {(() => {
                      // Prüfe ob Artikel für Zukunft geplant ist
                      const isScheduled = !article.isPublished && article.publishDate && (() => {
                        const publishDateTime = article.publishTime
                          ? new Date(`${article.publishDate}T${article.publishTime}`)
                          : new Date(article.publishDate);
                        return publishDateTime > new Date();
                      })();

                      if (article.isPublished) {
                        return <Badge variant="default">Live</Badge>;
                      } else if (isScheduled) {
                        return <Badge className="bg-amber-500 hover:bg-amber-600">Geplant</Badge>;
                      } else {
                        return <Badge variant="secondary">Unveröffentlicht</Badge>;
                      }
                    })()}
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Artikel bearbeiten</DialogTitle>
            <DialogDescription>
              Ändern Sie die Metadaten des Artikels. Die eigentlichen Inhalte müssen in der TSX-Datei bearbeitet werden.
            </DialogDescription>
          </DialogHeader>

          {editingArticle && (
            <div className="space-y-4 py-4 overflow-y-auto flex-1 pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={editingArticle.title}
                    onChange={(e) => handleArticleFieldChange('title', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Input
                    id="description"
                    value={editingArticle.description}
                    onChange={(e) => handleArticleFieldChange('description', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="publishDate">Veröffentlichungsdatum</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={editingArticle.publishDate || ''}
                    onChange={(e) => handleArticleFieldChange('publishDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="publishTime">Veröffentlichungszeit</Label>
                  <Input
                    id="publishTime"
                    type="time"
                    value={editingArticle.publishTime || ''}
                    onChange={(e) => handleArticleFieldChange('publishTime', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="lastUpdated">Zuletzt aktualisiert</Label>
                  <Input
                    id="lastUpdated"
                    value={editingArticle.lastUpdated}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Wird automatisch aktualisiert</p>
                </div>

                <div>
                  <Label htmlFor="readTime">Lesezeit</Label>
                  <Input
                    id="readTime"
                    value={editingArticle.readTime}
                    onChange={(e) => handleArticleFieldChange('readTime', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="badge">Badge</Label>
                  <Input
                    id="badge"
                    value={editingArticle.badge}
                    onChange={(e) => handleArticleFieldChange('badge', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="icon">Icon (Emoji)</Label>
                  <Input
                    id="icon"
                    value={editingArticle.icon}
                    onChange={(e) => handleArticleFieldChange('icon', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    value={editingArticle.link}
                    onChange={(e) => handleArticleFieldChange('link', e.target.value)}
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border">
                  <Checkbox
                    id="isPublished"
                    checked={editingArticle.isPublished}
                    onCheckedChange={(checked) => handleArticleFieldChange('isPublished', checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="isPublished"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Artikel ist veröffentlicht
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {editingArticle.isPublished
                        ? "Der Artikel ist auf der Wissen-Seite sichtbar."
                        : "Der Artikel ist nicht auf der Wissen-Seite sichtbar."}
                      {editingArticle.publishDate && isDateInFuture(editingArticle.publishDate, editingArticle.publishTime) && (
                        <span className="block text-amber-600 mt-1">
                          ⚠️ Das Veröffentlichungsdatum liegt in der Zukunft. Der Artikel wird automatisch als "Geplant" markiert.
                        </span>
                      )}
                    </p>
                  </div>
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
        <CardContent className="space-y-3">
          <p className="text-sm text-blue-800">
            <strong>Veröffentlichungs-Status:</strong> Unveröffentlichte Artikel werden nicht auf der Wissen-Seite angezeigt.
            Die Änderungen wirken sofort (localStorage-basiert, kein Deployment nötig).
          </p>
          <p className="text-sm text-blue-800">
            <strong>Geplante Veröffentlichung:</strong> Wenn Sie ein Datum in der Zukunft setzen, wird der Artikel
            automatisch als "Geplant" markiert und erst zum angegebenen Zeitpunkt veröffentlicht.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorialCalendar;
