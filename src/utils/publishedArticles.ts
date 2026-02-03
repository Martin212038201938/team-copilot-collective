import { Draft } from "@/types/draft";

// Storage key für Editorial Calendar (muss identisch sein mit EditorialCalendar.tsx)
const EDITORIAL_CALENDAR_KEY = 'editorial-calendar-articles';

interface EditorialArticle {
  id: string;
  link: string;
  isPublished: boolean;
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
 * Returns true if: article is published AND (no future publish date OR publish date is in the past)
 */
export function isArticlePublished(articleLink: string): boolean {
  const editorialArticles = getEditorialCalendarArticles();
  const article = editorialArticles.find(a => a.link === articleLink);

  // Wenn kein Editorial-Eintrag existiert, zeige Artikel an (Fallback)
  if (!article) return true;

  // Wenn explizit unveröffentlicht
  if (!article.isPublished) return false;

  // Prüfe ob Veröffentlichungsdatum in der Zukunft liegt
  if (article.publishDate) {
    const publishDateTime = article.publishTime
      ? new Date(`${article.publishDate}T${article.publishTime}`)
      : new Date(article.publishDate);

    if (publishDateTime > new Date()) {
      return false; // Noch nicht veröffentlicht (geplant für Zukunft)
    }
  }

  return true;
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
