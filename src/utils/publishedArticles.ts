import { Draft } from "@/types/draft";
import { ALL_ARTICLES, getArticleByLink } from "@/data/articles";

// Storage key für Editorial Calendar (muss identisch sein mit EditorialCalendar.tsx)
const EDITORIAL_CALENDAR_KEY = 'editorial-calendar-articles';

interface EditorialArticle {
  id: string;
  link: string;
  isPublished: boolean;
  manuallyUnpublished?: boolean; // NEU: Unterscheidet manuelles Deaktivieren von "noch nicht fällig"
  publishDate?: string;
  publishTime?: string;
}

/**
 * Get editorial calendar data from localStorage
 */
export function getEditorialCalendarArticles(): EditorialArticle[] {
  try {
    const saved = localStorage.getItem(EDITORIAL_CALENDAR_KEY);
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

/**
 * Check if a static article should be visible based on editorial calendar
 *
 * Priorität (Bugfix v2):
 * 1. articles.ts isDraft-Flag – wenn isDraft: true, ist der Artikel IMMER ein Draft.
 *    Das ist die Build-Zeit-Entscheidung des Entwicklers und hat höchste Priorität.
 * 2. localStorage manuallyUnpublished – wenn im Redaktionssystem manuell deaktiviert,
 *    bleibt der Artikel offline. Der Auto-Publisher darf das NICHT überschreiben.
 *    Ein Artikel bleibt so lange offline, bis ein neues Datum IN DER ZUKUNFT gesetzt wird.
 * 3. localStorage isPublished – normaler Editorial-Status
 * 4. Fallback: isDraft aus articles.ts (für Artikel ohne localStorage-Eintrag)
 */
export function isArticlePublished(articleLink: string): boolean {
  // SCHRITT 1: Prüfe isDraft in articles.ts (höchste Priorität)
  // Wenn der Entwickler isDraft: true setzt, ist das endgültig.
  const articleData = getArticleByLink(articleLink);
  if (articleData?.isDraft === true) {
    return false;
  }

  // SCHRITT 2: Prüfe Editorial Calendar (localStorage)
  const editorialArticles = getEditorialCalendarArticles();
  const editorialEntry = editorialArticles.find(a => a.link === articleLink);

  if (editorialEntry) {
    // Wenn manuell unveröffentlicht → bleibt offline.
    // Der Artikel wird erst wieder sichtbar, wenn:
    // a) Er manuell wieder veröffentlicht wird, ODER
    // b) Ein neues publishDate IN DER ZUKUNFT gesetzt wird und dieses Datum dann erreicht wird
    if (editorialEntry.manuallyUnpublished) return false;

    // Wenn explizit unveröffentlicht (isPublished: false)
    if (!editorialEntry.isPublished) return false;

    // Prüfe ob Veröffentlichungsdatum in der Zukunft liegt
    if (editorialEntry.publishDate) {
      const publishDateTime = editorialEntry.publishTime
        ? new Date(`${editorialEntry.publishDate}T${editorialEntry.publishTime}`)
        : new Date(editorialEntry.publishDate);

      if (publishDateTime > new Date()) {
        return false; // Noch nicht veröffentlicht (geplant für Zukunft)
      }
    }

    return true;
  }

  // SCHRITT 3: Fallback für Artikel ohne localStorage-Eintrag
  if (articleData) {
    return !articleData.isDraft;
  }

  // Artikel nicht in articles.ts gefunden → nicht anzeigen (Sicherheit)
  return false;
}

/**
 * Update article publish status in editorial calendar
 */
export function updateArticlePublishStatus(articleId: string, isPublished: boolean): void {
  try {
    const articles = getEditorialCalendarArticles();
    const updated = articles.map(a =>
      a.id === articleId ? { ...a, isPublished } : a
    );
    localStorage.setItem(EDITORIAL_CALENDAR_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating article status:', error);
  }
}

/**
 * Get all published articles from localStorage (Drafts)
 */
export function getPublishedArticles(): Draft[] {
  try {
    const savedDrafts = localStorage.getItem('copilot-drafts');
    if (!savedDrafts) return [];

    const drafts: Draft[] = JSON.parse(savedDrafts);
    return drafts.filter(draft => draft.status === 'published');
  } catch (error) {
    console.error('Error loading published articles:', error);
    return [];
  }
}

/**
 * Get a single published article by slug
 */
export function getPublishedArticleBySlug(slug: string): Draft | null {
  try {
    const published = getPublishedArticles();
    return published.find(article => article.slug === slug) || null;
  } catch (error) {
    console.error('Error finding article by slug:', error);
    return null;
  }
}

/**
 * Convert published articles to knowledge topic format
 */
export function getPublishedAsKnowledgeTopics() {
  const published = getPublishedArticles();

  return published.map(article => ({
    title: article.title,
    description: article.description,
    link: `/wissen/${article.slug}`,
    badge: article.category || "Copilot",
    icon: article.icon || "📝",
    readTime: article.readTime || "5 Minuten",
    lastUpdated: new Date(article.publishDate).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    publishDate: article.publishDate ? article.publishDate.split('T')[0] : undefined
  }));
}
