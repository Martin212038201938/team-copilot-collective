/**
 * Utility functions for generating Schema.org structured data
 * Helps search engines and AI models better understand training courses
 *
 * LLM Optimization Notes:
 * - FAQPage schema enables direct citation in AI responses
 * - Organization schema establishes E-E-A-T trust signals
 * - Course schema helps LLMs understand training offerings
 * - BreadcrumbList schema improves navigation understanding
 */

import { FAQ } from "@/data/faqs";

// Base URL for schema IDs
export const BASE_URL = "https://copilotenschule.de";

/**
 * Schema ID types for different page types
 */
export interface SchemaIds {
  article: string;  // For Article schema (or Course for trainings/workshops)
  faq: string;      // For FAQPage schema
  breadcrumb: string; // For BreadcrumbList schema
}

/**
 * Supported page types for schema generation
 */
export type SchemaPageType = 'wissen' | 'trainings' | 'workshops';

/**
 * Mapping from page type to URL path segment
 */
const PATH_SEGMENT: Record<SchemaPageType, string> = {
  wissen: 'wissen',
  trainings: 'trainings',
  workshops: 'workshops'
};

/**
 * Mapping from page type to schema fragment identifier
 * - wissen → #article (Article schema)
 * - trainings → #course (Course schema)
 * - workshops → #course (Course schema, with BusinessEvent for events/keynotes)
 */
const SCHEMA_FRAGMENT: Record<SchemaPageType, string> = {
  wissen: 'article',
  trainings: 'course',
  workshops: 'course'
};

/**
 * Generates unique @id strings for a page based on its slug and type
 *
 * @param slug - The page slug (e.g., "github-copilot", "copilot-studio", "copilot-hackathon")
 * @param type - The page type: 'wissen', 'trainings' or 'workshops'
 * @returns Object with article, faq, and breadcrumb @id strings
 *
 * @example
 * // Workshop page
 * generateSchemaIds("copilot-hackathon", "workshops")
 * // Returns: {
 * //   article: "https://copilotenschule.de/workshops/copilot-hackathon#course",
 * //   faq: "https://copilotenschule.de/workshops/copilot-hackathon#faq",
 * //   breadcrumb: "https://copilotenschule.de/workshops/copilot-hackathon#breadcrumb"
 * // }
 */
export const generateSchemaIds = (slug: string, type: SchemaPageType): SchemaIds => {
  const pageUrl = `${BASE_URL}/${PATH_SEGMENT[type]}/${slug}`;

  return {
    article: `${pageUrl}#${SCHEMA_FRAGMENT[type]}`,
    faq: `${pageUrl}#faq`,
    breadcrumb: `${pageUrl}#breadcrumb`
  };
};

/**
 * Generates the full page URL from slug and type
 */
export const getPageUrl = (slug: string, type: SchemaPageType): string => {
  return `${BASE_URL}/${PATH_SEGMENT[type]}/${slug}`;
};

/**
 * Breadcrumb item type for navigation hierarchy
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates BreadcrumbList Schema.org markup
 * Helps search engines understand page hierarchy and improves rich snippets
 *
 * @example
 * generateBreadcrumbSchema([
 *   { name: "Startseite", url: "https://copilotenschule.de/" },
 *   { name: "Unsere Angebote", url: "https://copilotenschule.de/unsere-angebote" },
 *   { name: "Train-the-Trainer Training", url: "https://copilotenschule.de/trainings/train-the-trainer-copilot" }
 * ])
 */
export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url || "https://copilotenschule.de"}#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generates FAQPage Schema.org markup
 * Critical for LLM citation - enables AI assistants to quote answers directly
 *
 * @param faqs - Array of FAQ objects with question and answer
 * @param pageUrl - Optional page URL for unique @id (e.g., "https://copilotenschule.de/wissen/copilot-roi-berechnen")
 *                  If not provided, falls back to generic "https://copilotenschule.de/#faq"
 */
export const generateFAQPageSchema = (faqs: FAQ[], pageUrl?: string) => {
  const faqId = pageUrl ? `${pageUrl}#faq` : "https://copilotenschule.de/#faq";
  return {
    "@type": "FAQPage",
    "@id": faqId,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generates FAQPage Schema.org markup from simple FAQ objects (name/answer format)
 * Used by knowledge pages that define FAQs inline
 *
 * @param faqs - Array of FAQ objects with name and answer
 * @param faqId - The @id for the FAQPage (e.g., "https://copilotenschule.de/github-copilot#faq")
 */
export const generateSimpleFAQSchema = (
  faqs: Array<{ name: string; answer: string }>,
  faqId: string
) => {
  return {
    "@type": "FAQPage",
    "@id": faqId,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.name,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Article schema configuration for knowledge pages
 */
export interface ArticleSchemaConfig {
  headline: string;
  description: string;
  author: object;      // Author schema markup from getAuthorSchemaMarkup()
  datePublished: string;
  dateModified: string;
  keywords?: string[];
  articleSection?: string;
}

/**
 * Generates Article Schema.org markup for knowledge pages
 *
 * @param config - Article configuration object
 * @param ids - Schema IDs from generateSchemaIds()
 * @param pageUrl - Full page URL
 */
export const generateArticleSchema = (
  config: ArticleSchemaConfig,
  ids: SchemaIds,
  pageUrl: string
) => {
  return {
    "@type": "Article",
    "@id": ids.article,
    "headline": config.headline,
    "description": config.description,
    "author": config.author,
    "publisher": {
      "@id": `${BASE_URL}/#organization`
    },
    "datePublished": config.datePublished,
    "dateModified": config.dateModified,
    ...(config.keywords && { "keywords": config.keywords }),
    ...(config.articleSection && { "articleSection": config.articleSection }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    }
  };
};

/**
 * Course schema configuration for training pages
 */
export interface CourseSchemaConfig {
  title: string;
  description: string;
  duration: string;         // Human-readable (e.g., "Halbtag | Ganztag")
  durationISO?: string;     // ISO 8601 (e.g., "PT4H", "PT7H", "P2D")
  features: string[];
  tiers: string[];
  prerequisites?: string;   // Voraussetzungen je Training (B2, 2026-07-22)
}

/**
 * Generates Course Schema.org markup for training pages
 *
 * @param config - Course configuration object
 * @param ids - Schema IDs from generateSchemaIds()
 * @param pageUrl - Full page URL
 */
export const generateTrainingCourseSchema = (
  config: CourseSchemaConfig,
  ids: SchemaIds,
  pageUrl: string
) => {
  return {
    "@type": "Course",
    "@id": ids.article, // Uses #course for trainings
    "name": config.title,
    "description": config.description,
    "url": pageUrl,
    "provider": {
      "@id": `${BASE_URL}/#organization`
    },
    "instructor": {
      "@id": `${BASE_URL}/#martin-lang`
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["onsite", "online"],
      "duration": config.durationISO || "PT7H",
      "inLanguage": "de-DE"
    },
    // B1 (2026-07-22): Keine Preise im Schema, solange der A/B-Test "Preise
    // auszeichnen" (ab_pricing) läuft – Markup nur für sichtbare Inhalte.
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "url": pageUrl,
      "availability": "https://schema.org/InStock"
    },
    "teaches": config.features.slice(0, 5).join(", "),
    // B2 (2026-07-22): Voraussetzungen je Training statt Pauschaltext
    ...(config.prerequisites ? { "coursePrerequisites": config.prerequisites } : {}),
    "educationalLevel": config.tiers.includes("free") ? "Beginner" : "Intermediate",
    "inLanguage": "de-DE"
  };
};

/**
 * Generates breadcrumb items for knowledge pages
 * Always includes: Startseite > Wissen > Article Name
 */
export const generateWissenBreadcrumbItems = (
  articleName: string,
  articleUrl: string
): BreadcrumbItem[] => {
  return [
    { name: "Startseite", url: `${BASE_URL}/` },
    { name: "Wissen", url: `${BASE_URL}/wissen` },
    { name: articleName, url: articleUrl }
  ];
};

/**
 * Generates breadcrumb items for training pages
 * Always includes: Startseite > Unsere Angebote > Training Name
 */
export const generateTrainingBreadcrumbItems = (
  trainingName: string,
  trainingUrl: string
): BreadcrumbItem[] => {
  return [
    { name: "Startseite", url: `${BASE_URL}/` },
    { name: "Trainings", url: `${BASE_URL}/trainings` },
    { name: trainingName, url: trainingUrl }
  ];
};

/**
 * Generates breadcrumb items for workshop pages
 * Always includes: Startseite > Workshops > Workshop Name
 */
export const generateWorkshopsBreadcrumbItems = (
  workshopName: string,
  workshopUrl: string
): BreadcrumbItem[] => {
  return [
    { name: "Startseite", url: `${BASE_URL}/` },
    { name: "Workshops", url: `${BASE_URL}/workshops` },
    { name: workshopName, url: workshopUrl }
  ];
};

/**
 * Generates complete @graph schema for a knowledge page
 * Includes Article, FAQPage, and BreadcrumbList with unique @ids
 *
 * @param slug - Page slug (e.g., "github-copilot")
 * @param articleConfig - Article schema configuration
 * @param faqs - Array of FAQs with name and answer
 * @param articleName - Display name for breadcrumb
 */
export const generateKnowledgePageSchema = (
  slug: string,
  articleConfig: ArticleSchemaConfig,
  faqs: Array<{ name: string; answer: string }>,
  articleName: string
) => {
  const ids = generateSchemaIds(slug, 'wissen');
  const pageUrl = getPageUrl(slug, 'wissen');
  const breadcrumbItems = generateWissenBreadcrumbItems(articleName, pageUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      generateArticleSchema(articleConfig, ids, pageUrl),
      generateSimpleFAQSchema(faqs, ids.faq),
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      }
    ]
  };
};

/**
 * Generates complete @graph schema for a training page
 * Includes Course, FAQPage (if FAQs exist), and BreadcrumbList with unique @ids
 *
 * @param slug - Training slug (e.g., "microsoft-365-copilot-grundlagen")
 * @param courseConfig - Course schema configuration
 * @param faqs - Optional array of FAQs with question and answer
 * @param trainingName - Display name for breadcrumb
 */
export const generateTrainingPageSchema = (
  slug: string,
  courseConfig: CourseSchemaConfig,
  faqs: Array<{ question: string; answer: string }> | null,
  trainingName: string
) => {
  const ids = generateSchemaIds(slug, 'trainings');
  const pageUrl = getPageUrl(slug, 'trainings');
  const breadcrumbItems = generateTrainingBreadcrumbItems(trainingName, pageUrl);

  const faqSchema = faqs && faqs.length > 0 ? {
    "@type": "FAQPage",
    "@id": ids.faq,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      generateTrainingCourseSchema(courseConfig, ids, pageUrl),
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      },
      ...(faqSchema ? [faqSchema] : [])
    ]
  };
};

/**
 * Schema für die Trainings-Übersichtsseite /trainings (B3, 2026-07-22):
 *  - CollectionPage + ItemList mit den echten Detailseiten-URLs
 *  - FAQPage (sichtbare FAQs der Übersicht)
 *  - BreadcrumbList
 *
 * Ersetzt die früheren Course-/EducationEvent-Duplikate und die zweite,
 * widersprüchliche Organization-Definition. Prinzip "eine Entität, ein
 * Zuhause": Die vollständige Course-Beschreibung liegt ausschließlich auf
 * der jeweiligen Detailseite; die Übersicht verweist nur noch dorthin
 * (gleiches Muster wie generateWorkshopsOverviewSchema).
 */
export interface TrainingsOverviewSchemaConfig {
  title: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const generateTrainingsOverviewSchema = (
  config: TrainingsOverviewSchemaConfig,
  trainingItems: Array<{ slug: string; title: string; description: string }>
) => {
  const pageUrl = `${BASE_URL}/trainings`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Startseite", url: `${BASE_URL}/` },
    { name: "Trainings", url: pageUrl },
  ];

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    "name": config.title,
    "description": config.description,
    "url": pageUrl,
    "inLanguage": "de-DE",
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "mainEntity": { "@id": `${pageUrl}#itemlist` },
  };

  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    "name": "Microsoft Copilot Trainings",
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "numberOfItems": trainingItems.length,
    "itemListElement": trainingItems.map((training, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${BASE_URL}/trainings/${training.slug}`,
      "name": training.title,
      "description": training.description,
    })),
  };

  const faqSchema = config.faqs.length > 0
    ? {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": config.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPage, itemList, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])],
  };
};

/**
 * Schema für die Homepage (B3, 2026-07-22): nur noch FAQPage.
 *
 * Ersetzt den früheren Phantom-Katalog aus 9 veralteten Course-/EducationEvent-
 * Einträgen (Angebote, die es so nicht mehr gibt) sowie die doppelte
 * Organization-Definition. Organization/Person/WebSite kommen global aus
 * organizationSchema.ts (SEOHead) bzw. index.html; die echten Trainings
 * beschreibt ausschließlich /trainings mit seinen Detailseiten.
 */
export const generateHomepageSchema = (faqs: FAQ[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": [generateFAQPageSchema(faqs)],
  };
};
