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
import { ALL_ARTICLES, ArticleData } from "@/data/articles";

// ============================================================================
// REDAKTIONSPLAN - Verwendet zentrale Datenquelle
// ============================================================================
// Die Artikel-Stammdaten kommen aus src/data/articles.ts
// Der Veröffentlichungsstatus wird in localStorage gespeichert
//
// Workflow für neue Artikel:
// 1. TSX-Datei in src/pages/ erstellen
// 2. Route in App.tsx hinzufügen
// 3. Eintrag in src/data/articles.ts hinzufügen (PFLICHT!)
//    → Artikel erscheint automatisch hier UND in Wissen.tsx
// ============================================================================

// Erweiterter Typ mit Veröffentlichungsstatus
interface ArticleMetadata extends ArticleData {
  isPublished: boolean;
  manuallyUnpublished?: boolean; // NEU: true wenn manuell deaktiviert (schützt vor Auto-Publisher)
  isStatic: boolean;
}

const STORAGE_KEY = 'editorial-calendar-articles';

const EditorialCalendar = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [editingArticle, setEditingArticle] = useState<ArticleMetadata | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'unpublished'>('all');

  // Lade Artikel beim Start - Kombiniere zentrale Datenquelle mit localStorage-Status
  // BUGFIX: isDraft: true in articles.ts hat jetzt höchste Priorität.
  // Wenn ein Entwickler isDraft: true setzt, wird der Artikel IMMER als Draft behandelt,
  // unabhängig davon, was in localStorage steht.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let savedStatusMap: Record<string, { isPublished: boolean; manuallyUnpublished?: boolean }> = {};

    if (saved) {
      try {
        const parsed: ArticleMetadata[] = JSON.parse(saved);
        // Erstelle Map von ID → Veröffentlichungsstatus
        parsed.forEach(a => {
          savedStatusMap[a.id] = {
            isPublished: a.isPublished,
            manuallyUnpublished: a.manuallyUnpublished
          };
        });
      } catch {
        // Bei Fehler: leere Map verwenden
      }
    }

    // Kombiniere zentrale Datenquelle mit gespeichertem Status
    const articlesWithStatus: ArticleMetadata[] = ALL_ARTICLES.map(article => {
      const savedStatus = savedStatusMap[article.id];

      // PRIORITÄT 1: isDraft: true in articles.ts → IMMER Draft (höchste Priorität)
      if (article.isDraft === true) {
        return {
          ...article,
          isStatic: true,
          isPublished: false,
          manuallyUnpublished: false // Kein manuelles Flag nötig, Code-Level-Draft
        };
      }

      // PRIORITÄT 2: localStorage-Status (manuell gesetzt im Redaktionssystem)
      if (savedStatus) {
        return {
          ...article,
          isStatic: true,
          isPublished: savedStatus.isPublished,
          manuallyUnpublished: savedStatus.manuallyUnpublished ?? false
        };
      }

      // PRIORITÄT 3: Fallback – kein localStorage-Eintrag vorhanden
      return {
        ...article,
        isStatic: true,
        isPublished: !article.isDraft,
        manuallyUnpublished: false
      };
    });

    setArticles(articlesWithStatus);
    // Speichere kombinierte Daten zurück
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articlesWithStatus));
  }, []);

  // Speichere bei Änderungen
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    }
  }, [articles]);

  // Auto-Publish: Prüfe jede Minute ob geplante Artikel veröffentlicht werden sollen
  // BUGFIX v2: Respektiert manuallyUnpublished, isDraft aus articles.ts,
  // und veröffentlicht NUR Artikel, deren publishDate NACH dem Zeitpunkt der
  // manuellen Deaktivierung liegt (d.h. ein neues Zukunftsdatum wurde gesetzt).
  useEffect(() => {
    const checkScheduledArticles = () => {
      const now = new Date();

      setArticles(prevArticles => {
        let hasChanges = false;

        const updatedArticles = prevArticles.map(article => {
          // Nur unveröffentlichte Artikel mit Datum prüfen
          if (!article.isPublished && article.publishDate) {
            // NIEMALS manuell deaktivierte Artikel automatisch veröffentlichen.
            // Ein manuell deaktivierter Artikel kann NUR wieder live gehen, wenn:
            // 1. Der User ihn manuell wieder veröffentlicht (Toggle-Button), ODER
            // 2. Der User ein neues publishDate IN DER ZUKUNFT setzt
            //    (handleSave setzt dann manuallyUnpublished auf false + scheduledForRepublish auf true)
            if (article.manuallyUnpublished) return article;

            // NIEMALS Artikel mit isDraft: true in articles.ts auto-publishen
            const sourceArticle = ALL_ARTICLES.find(a => a.id === article.id);
            if (sourceArticle?.isDraft === true) return article;

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
              return { ...article, isPublished: true, manuallyUnpublished: false };
            }
          }
          return article;
        });

        return hasChanges ? updatedArticles : prevArticles;
      });
    };

    checkScheduledArticles();
    const interval = setInterval(checkScheduledArticles, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleEditClick = (article: ArticleMetadata) => {
    setEditingArticle({ ...article });
    setIsDialogOpen(true);
  };

  // Hilfsfunktion für korrekten Datumsvergleich (lokale Zeitzone)
  const isDateInFuture = (dateStr: string, timeStr?: string): boolean => {
    const now = new Date();

    if (timeStr) {
      const publishDateTime = new Date(`${dateStr}T${timeStr}`);
      return publishDateTime > now;
    } else {
      const [year, month, day] = dateStr.split('-').map(Number);
      const publishDate = new Date(year, month - 1, day, 23, 59, 59);
      const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      return publishDate > todayEnd;
    }
  };

  // Hilfsfunktion: Datum im deutschen Format
  const formatDateGerman = (date: Date): string => {
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace('.', '');
  };

  // Hilfsfunktion: ISO-Datum zu deutschem Format
  const isoToGermanDate = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return formatDateGerman(date);
  };

  // Handler für Artikel-Feld-Änderungen
  const handleArticleFieldChange = (field: keyof ArticleMetadata, value: string | boolean) => {
    if (!editingArticle) return;

    const now = new Date();
    const currentDateGerman = formatDateGerman(now);

    let updates: Partial<ArticleMetadata> = {
      [field]: value,
      lastUpdated: currentDateGerman
    };

    if (field === 'publishDate' && typeof value === 'string' && value) {
      updates.lastUpdated = isoToGermanDate(value);
    }

    setEditingArticle({ ...editingArticle, ...updates });
  };

  const handleSave = () => {
    if (!editingArticle) return;

    let updatedArticle = { ...editingArticle };

    // Artikel mit isDraft: true können nicht über den Dialog veröffentlicht werden
    const sourceArticle = ALL_ARTICLES.find(a => a.id === updatedArticle.id);
    if (sourceArticle?.isDraft === true && updatedArticle.isPublished) {
      alert(`"${updatedArticle.title}" ist in articles.ts als Draft markiert (isDraft: true). Entfernen Sie das isDraft-Flag im Code, bevor Sie den Artikel veröffentlichen können.`);
      updatedArticle.isPublished = false;
    }

    // Finde den vorherigen Zustand des Artikels
    const previousArticle = articles.find(a => a.id === updatedArticle.id);
    const wasManuallyUnpublished = previousArticle?.manuallyUnpublished ?? false;

    // Prüfe ob Veröffentlichungsdatum in der Zukunft liegt
    const hasFutureDate = updatedArticle.publishDate
      ? isDateInFuture(updatedArticle.publishDate, updatedArticle.publishTime)
      : false;

    if (hasFutureDate) {
      // Zukunftsdatum gesetzt → Artikel ist "geplant"
      // WICHTIG: manuallyUnpublished zurücksetzen, damit der Auto-Publisher
      // den Artikel zum neuen Datum veröffentlichen kann
      updatedArticle.isPublished = false;
      updatedArticle.manuallyUnpublished = false;
    } else if (!updatedArticle.isPublished) {
      // Checkbox "Veröffentlicht" ist NICHT gesetzt und Datum ist NICHT in der Zukunft
      // → Das ist eine manuelle Deaktivierung.
      // Der Artikel bleibt offline, auch wenn das Datum in der Vergangenheit liegt.
      // Er wird erst wieder live gehen, wenn:
      //   a) Die Checkbox manuell wieder aktiviert wird, ODER
      //   b) Ein neues Datum IN DER ZUKUNFT gesetzt wird
      updatedArticle.manuallyUnpublished = true;
    } else {
      // Artikel ist veröffentlicht (Checkbox aktiv, Datum nicht in der Zukunft)
      // → manuallyUnpublished zurücksetzen
      updatedArticle.manuallyUnpublished = false;
    }

    setArticles(prevArticles => prevArticles.map(a =>
      a.id === updatedArticle.id ? updatedArticle : a
    ));
    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  const handleTogglePublish = (article: ArticleMetadata) => {
    // BUGFIX: Artikel mit isDraft: true in articles.ts können nicht über das UI veröffentlicht werden
    const sourceArticle = ALL_ARTICLES.find(a => a.id === article.id);
    if (sourceArticle?.isDraft === true && !article.isPublished) {
      alert(`"${article.title}" ist in articles.ts als Draft markiert (isDraft: true). Entfernen Sie das isDraft-Flag im Code, bevor Sie den Artikel hier veröffentlichen können.`);
      return;
    }

    const action = article.isPublished ? 'unveröffentlichen' : 'veröffentlichen';
    if (confirm(`Möchten Sie "${article.title}" wirklich ${action}?`)) {
      const newIsPublished = !article.isPublished;
      setArticles(prevArticles => prevArticles.map(a =>
        a.id === article.id
          ? {
              ...a,
              isPublished: newIsPublished,
              // BUGFIX: Wenn manuell unveröffentlicht → Flag setzen, damit Auto-Publisher es nicht überschreibt
              // Wenn manuell veröffentlicht → Flag zurücksetzen
              manuallyUnpublished: !newIsPublished
            }
          : a
      ));
    }
  };

  const handleRefreshDate = (article: ArticleMetadata) => {
    const now = new Date();
    const formattedDate = formatDateGerman(now);

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
    // Unveröffentlichte Artikel zuerst, dann nach Datum
    if (!a.isPublished && b.isPublished) return -1;
    if (a.isPublished && !b.isPublished) return 1;

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
                      const sourceArticle = ALL_ARTICLES.find(a => a.id === article.id);
                      const isCodeDraft = sourceArticle?.isDraft === true;
                      const isScheduled = !article.isPublished && article.publishDate && (() => {
                        const publishDateTime = article.publishTime
                          ? new Date(`${article.publishDate}T${article.publishTime}`)
                          : new Date(article.publishDate);
                        return publishDateTime > new Date();
                      })();

                      if (article.isPublished) {
                        return <Badge variant="default">Live</Badge>;
                      } else if (isCodeDraft) {
                        return <Badge className="bg-red-500 hover:bg-red-600 text-white">Draft (Code)</Badge>;
                      } else if (article.manuallyUnpublished) {
                        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Manuell deaktiviert</Badge>;
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
                          Das Veröffentlichungsdatum liegt in der Zukunft. Der Artikel wird automatisch als "Geplant" markiert.
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
            <strong>Datenquelle:</strong> Die Artikel-Stammdaten kommen aus <code className="bg-blue-100 px-1 rounded">src/data/articles.ts</code>.
            Der Veröffentlichungsstatus wird im Browser-Speicher (localStorage) verwaltet.
          </p>
          <p className="text-sm text-blue-800">
            <strong>Veröffentlichungs-Status:</strong> Unveröffentlichte Artikel werden nicht auf der Wissen-Seite angezeigt.
            Die Änderungen wirken sofort.
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
