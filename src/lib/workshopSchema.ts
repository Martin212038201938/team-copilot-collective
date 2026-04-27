/**
 * Schema.org Generatoren für Workshops / Events / Keynotes / Change-Programme
 *
 * GEO-Optimierung:
 * - Je Workshop-Typ wird der passendste Schema.org-Typ gewählt, damit
 *   Suchmaschinen und LLMs das Angebot korrekt einordnen.
 * - FAQPage- und BreadcrumbList-Schema werden zusätzlich erzeugt, damit
 *   Antworten und Navigation direkt zitierfähig sind.
 * - Die Landingpage liefert ein CollectionPage + ItemList-Schema, damit
 *   alle Workshops in einer strukturierten Liste gefunden werden.
 */

import {
  BASE_URL,
  generateSchemaIds,
  getPageUrl,
  generateWorkshopsBreadcrumbItems,
  type SchemaIds,
  type BreadcrumbItem,
} from "./schema";
import type { Workshop, WorkshopType } from "@/data/workshops";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";

/**
 * Baut das Schema.org-Hauptobjekt eines einzelnen Workshops.
 * Je nach WorkshopType unterscheiden wir den Haupttyp.
 */
export const generateWorkshopMainSchema = (
  workshop: Workshop,
  ids: SchemaIds,
  pageUrl: string
) => {
  const base = {
    "@id": ids.article,
    "name": workshop.title,
    "description": workshop.description,
    "url": pageUrl,
    "inLanguage": "de-DE",
    "provider": {
      "@id": `${BASE_URL}/#organization`,
    },
    "performer": {
      "@id": `${BASE_URL}/#martin-lang`,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  // Change-Programm → ProfessionalService mit Service-Typ
  if (workshop.type === "change-program") {
    return {
      "@type": "Service",
      "@id": ids.article,
      "name": workshop.title,
      "description": workshop.description,
      "url": pageUrl,
      "serviceType": "Change-Management-Programm",
      "provider": {
        "@id": `${BASE_URL}/#organization`,
      },
      "areaServed": {
        "@type": "Country",
        "name": "Deutschland",
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "availableLanguage": {
          "@type": "Language",
          "name": "Deutsch",
          "alternateName": "de",
        },
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Bausteine des Change-Programms",
        "itemListElement": (workshop.framework?.steps ?? []).map((step, index) => ({
          "@type": "Offer",
          "position": index + 1,
          "itemOffered": {
            "@type": "Service",
            "name": step,
          },
        })),
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl,
      },
    };
  }

  // Keynote & Event → BusinessEvent
  if (workshop.type === "keynote" || workshop.type === "event") {
    return {
      ...base,
      "@type": "BusinessEvent",
      "eventAttendanceMode": [
        "https://schema.org/OfflineEventAttendanceMode",
        "https://schema.org/MixedEventAttendanceMode",
      ],
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": {
        "@id": `${BASE_URL}/#organization`,
      },
      "location": {
        "@type": "Place",
        "name": "Inhouse oder Kundenlocation (bundesweit)",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "DE",
        },
      },
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": workshop.targetAudience[0] ?? "Entscheider und Fachbereiche",
      },
    };
  }

  // Workshop (inkl. Chatbot-Workshop, Hackathon, Strategie, Betriebsrat) → Course
  const instructorId = workshop.instructor
    ? `${BASE_URL}/#${workshop.instructor}`
    : `${BASE_URL}/#martin-lang`;

  return {
    ...base,
    "@type": "Course",
    "teaches": workshop.learningOutcomes.join(" | "),
    "coursePrerequisites": "Keine Programmierkenntnisse erforderlich",
    "educationalLevel": "Professional Development",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["onsite", "online", "blended"],
      "duration": (workshop as any).durationISO || "PT7H",
      "inLanguage": "de-DE",
      "instructor": {
        "@id": instructorId,
      },
    },
    "availableLanguage": {
      "@type": "Language",
      "name": "Deutsch",
      "alternateName": "de",
    },
    "offers": {
      "@type": "Offer",
      "price": "1800",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "1800",
        "priceCurrency": "EUR",
        "description": "Ab 1.800 € für Halbtag (4h), ab 2.800 € für Ganztag (7h)"
      },
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "availableDeliveryMethod": [
        "OnlineEventAttendanceMode",
        "OfflineEventAttendanceMode",
        "MixedEventAttendanceMode",
      ],
    },
  };
};

/**
 * Liefert das vollständige @graph-Schema für eine einzelne Workshop-Detailseite.
 */
export const generateWorkshopPageSchema = (workshop: Workshop) => {
  const ids = generateSchemaIds(workshop.slug, "workshops");
  const pageUrl = getPageUrl(workshop.slug, "workshops");
  const breadcrumbItems = generateWorkshopsBreadcrumbItems(workshop.title, pageUrl);

  const mainSchema = generateWorkshopMainSchema(workshop, ids, pageUrl);

  // Person-Schema für Gasttrainerin/Gasttrainer (GEO: maximale LLM-Zitierfähigkeit)
  const instructorAuthor = workshop.instructor ? getAuthor(workshop.instructor) : undefined;
  const instructorPersonSchema = instructorAuthor
    ? getAuthorSchemaMarkup(instructorAuthor)
    : null;

  const faqSchema =
    workshop.faqs.length > 0
      ? {
          "@type": "FAQPage",
          "@id": ids.faq,
          "mainEntity": workshop.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb,
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      mainSchema,
      breadcrumbSchema,
      ...(instructorPersonSchema ? [instructorPersonSchema] : []),
      ...(faqSchema ? [faqSchema] : []),
    ],
  };
};

/**
 * Liefert das Schema für die Workshops-Landingpage:
 *  - CollectionPage (Hauptseite)
 *  - ItemList (geordnete Übersicht aller Workshops)
 *  - FAQPage (Meta-FAQs der Landingpage)
 *  - BreadcrumbList
 */
export interface WorkshopsOverviewSchemaConfig {
  title: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const generateWorkshopsOverviewSchema = (
  config: WorkshopsOverviewSchemaConfig,
  workshops: Workshop[]
) => {
  const pageUrl = `${BASE_URL}/workshops`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Startseite", url: `${BASE_URL}/` },
    { name: "Workshops", url: pageUrl },
  ];

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    "name": config.title,
    "description": config.description,
    "url": pageUrl,
    "inLanguage": "de-DE",
    "isPartOf": {
      "@id": `${BASE_URL}/#website`,
    },
    "about": {
      "@id": `${BASE_URL}/#organization`,
    },
    "mainEntity": {
      "@id": `${pageUrl}#itemlist`,
    },
  };

  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    "name": "Copilot Workshops und Events",
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "numberOfItems": workshops.length,
    "itemListElement": workshops.map((w, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${BASE_URL}/workshops/${w.slug}`,
      "name": w.title,
      "description": w.description,
    })),
  };

  const faqSchema =
    config.faqs.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${pageUrl}#faq`,
          "mainEntity": config.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
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
 * Mapping für UI-Badge-Labels je WorkshopType (sekundäres Export-Helper)
 */
export const WORKSHOP_TYPE_SCHEMA_LABEL: Record<WorkshopType, string> = {
  workshop: "Workshop",
  event: "Event",
  keynote: "Keynote",
  "change-program": "Change-Programm",
};
