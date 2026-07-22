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
import type { Training } from "@/data/trainings";

// Base URL for schema IDs
export const BASE_URL = "https://copilotenschule.de";

// Standard-Bild für Course-Schemas (B6, 2026-07-22): Site-Logo/OG-Bild,
// solange kein individuelles Trainingsbild (Training.image) gepflegt ist.
export const DEFAULT_COURSE_IMAGE = `${BASE_URL}/images/copilotenschule_flugzeug.png`;

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
 * B4 (2026-07-22): EINE Quelle der Wahrheit für das Schema der
 * Trainings-Detailseiten. Ersetzt die frühere Doppelpflege (Inline-Logik in
 * TrainingDetail.tsx plus verwaiste Generatoren hier). Erzeugt den kompletten
 * @graph: Course + BreadcrumbList + FAQPage (falls FAQs vorhanden).
 *
 * Enthaltene Regeln:
 * - B1: Keine Preise im Schema, solange der A/B-Test "Preise auszeichnen"
 *   (ab_pricing) läuft. AUSNAHME: Trainings mit permanent sichtbarem
 *   Preis-Störer (visiblePrice) tragen den Preis auch im Schema –
 *   sichtbar und maschinenlesbar bleiben deckungsgleich.
 * - B2: coursePrerequisites nur aus dem gepflegten prerequisites-Feld.
 * - B6: image – individuelles Trainingsbild oder DEFAULT_COURSE_IMAGE.
 * - B7: je Buchungsvariante (bookingFormats) eine eigene CourseInstance;
 *   sichtbares Zertifikat als educationalCredentialAwarded.
 */
export const generateTrainingDetailSchema = (training: Training) => {
  const ids = generateSchemaIds(training.slug, "trainings");
  const pageUrl = getPageUrl(training.slug, "trainings");
  const breadcrumbItems = generateTrainingBreadcrumbItems(training.title, pageUrl);

  const courseSchema = {
    "@type": "Course",
    "@id": ids.article, // Nutzt #course für Trainings
    "name": training.title,
    "description": training.description,
    "url": pageUrl,
    "image": training.image ?? DEFAULT_COURSE_IMAGE,
    "provider": {
      "@id": `${BASE_URL}/#organization`
    },
    "instructor": {
      "@id": `${BASE_URL}/#martin-lang`
    },
    "hasCourseInstance": training.bookingFormats && training.bookingFormats.length > 0
      ? training.bookingFormats.map((variant) => ({
          "@type": "CourseInstance",
          "name": variant.name,
          "courseMode": variant.modes,
          ...(variant.durationISO ? { "duration": variant.durationISO } : {}),
          ...(variant.workload ? { "courseWorkload": variant.workload } : {}),
          ...(variant.description ? { "description": variant.description } : {}),
          "inLanguage": "de-DE"
        }))
      : {
          "@type": "CourseInstance",
          "courseMode": ["onsite", "online"],
          "duration": training.durationISO || "PT7H",
          "inLanguage": "de-DE"
        },
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "url": pageUrl,
      "availability": "https://schema.org/InStock",
      ...(training.visiblePrice
        ? {
            "price": String(training.visiblePrice.perPerson),
            "priceCurrency": "EUR",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": String(training.visiblePrice.perPerson),
              "priceCurrency": "EUR",
              "description": `ab ${training.visiblePrice.perPerson} € ${
                training.visiblePrice.unitLabel ?? "pro Teilnehmer"
              }${training.visiblePrice.note ? `, ${training.visiblePrice.note}` : ""}`
            }
          }
        : {})
    },
    "teaches": training.learningOutcomes
      ? training.learningOutcomes.join(", ")
      : training.features.slice(0, 5).join(", "),
    ...(training.prerequisites ? { "coursePrerequisites": training.prerequisites } : {}),
    ...(training.certificate ? { "educationalCredentialAwarded": training.certificate } : {}),
    "educationalLevel": training.tiers.includes("free") ? "Beginner" : "Intermediate",
    "inLanguage": "de-DE",
    ...(training.targetAudience && {
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": training.targetAudience.join(", ")
      }
    }),
    ...(training.businessImpact && {
      "competencyRequired": training.businessImpact.join(", ")
    })
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb,
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  // Altbestand-Fix (22.07.2026): Markdown-Link-Syntax [Text](/pfad) gehört nicht
  // in Schema-Texte – sichtbar rendert RichText die Links, im Markup bleibt Klartext.
  const stripMarkdownLinks = (text: string) =>
    text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

  const faqSchema = training.faqs && training.faqs.length > 0 ? {
    "@type": "FAQPage",
    "@id": ids.faq,
    "mainEntity": training.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripMarkdownLinks(faq.answer)
      }
    }))
  } : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      courseSchema,
      breadcrumbSchema,
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
