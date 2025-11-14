import { Draft } from "@/types/draft";

/**
 * Get all published articles from localStorage
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
    })
  }));
}
