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
 *   { name: "GitHub Copilot Training", url: "https://copilotenschule.de/trainings/github-copilot-entwickler" }
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

export interface TrainingModule {
  title: string;
  duration: string;
  description: string;
  features: string[];
}

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
 * @param pageUrl - Page URL for unique @id (e.g., "https://copilotenschule.de/wissen/copilot-roi-berechnen")
 */
export const generateSimpleFAQSchema = (
  faqs: Array<{ name: string; answer: string }>,
  pageUrl: string
) => {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
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
 * Generates Schema.org Course markup for a training module
 */
export const generateCourseSchema = (module: TrainingModule, index: number) => {
  return {
    "@type": "Course",
    "name": module.title,
    "description": module.description,
    "provider": {
      "@type": "Organization",
      "name": "copilotenschule.de",
      "url": "https://copilotenschule.de",
      "sameAs": [
        "https://www.linkedin.com/company/yellow-boat-consulting"
      ]
    },
    "courseCode": `COPILOT-${index + 1}`,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["online", "onsite", "blended"],
      "duration": module.duration,
      "inLanguage": "de-DE",
      "location": [
        {
          "@type": "Place",
          "name": "Online (bundesweit)",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "DE"
          }
        },
        {
          "@type": "Place",
          "name": "Köln",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Köln",
            "addressCountry": "DE"
          }
        },
        {
          "@type": "Place",
          "name": "Inhouse (bundesweit)",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "DE"
          }
        }
      ]
    },
    "educationalLevel": "Professional Development",
    "teaches": module.features,
    "timeRequired": module.duration,
    "availableLanguage": {
      "@type": "Language",
      "name": "Deutsch",
      "alternateName": "de"
    },
    "offers": {
      "@type": "Offer",
      "category": "Professional Training",
      "availability": "https://schema.org/InStock",
      "availableDeliveryMethod": ["OnlineEventAttendanceMode", "OfflineEventAttendanceMode", "MixedEventAttendanceMode"]
    }
  };
};

/**
 * Generates Schema.org EducationEvent markup for a training module
 */
export const generateEducationEventSchema = (module: TrainingModule) => {
  return {
    "@type": "EducationEvent",
    "name": module.title,
    "description": module.description,
    "eventAttendanceMode": [
      "https://schema.org/OnlineEventAttendanceMode",
      "https://schema.org/OfflineEventAttendanceMode",
      "https://schema.org/MixedEventAttendanceMode"
    ],
    "eventStatus": "https://schema.org/EventScheduled",
    "location": [
      {
        "@type": "VirtualLocation",
        "url": "https://copilotenschule.de"
      },
      {
        "@type": "Place",
        "name": "Köln und bundesweit",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "DE"
        }
      }
    ],
    "organizer": {
      "@type": "Organization",
      "name": "copilotenschule.de",
      "url": "https://copilotenschule.de"
    },
    "performer": {
      "@type": "Organization",
      "name": "Yellow-Boat Consulting",
      "url": "https://copilotenschule.de"
    },
    "educationalLevel": "Professional Development",
    "inLanguage": "de-DE",
    "duration": module.duration,
    "teaches": module.features,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "category": "Professional Training"
    }
  };
};

/**
 * Generates complete Schema.org structured data for all training modules
 * Combines organization, website, course/event data, and FAQs
 * Optimized for LLM trust signals and SEO
 */
export const generateTrainingSchemas = (modules: TrainingModule[], faqs?: FAQ[]) => {
  const courses = modules.map((module, index) => generateCourseSchema(module, index));
  const events = modules.map(module => generateEducationEventSchema(module));
  const faqSchema = faqs ? generateFAQPageSchema(faqs) : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Organization - Primary entity for LLM trust
      {
        "@type": "Organization",
        "@id": "https://copilotenschule.de/#organization",
        "name": "copilotenschule.de",
        "alternateName": ["Copilotenschule", "Copiloten Schule"],
        "url": "https://copilotenschule.de",
        "logo": "https://copilotenschule.de/og-image.jpg",
        "description": "copilotenschule.de bietet spezialisierte Weiterbildungen für den professionellen Einsatz von Microsoft Copilot in der täglichen Büroarbeit. Wir befähigen Wissensarbeiter, Teams und Organisationen, Microsoft Copilot produktiv, sicher und wertschöpfend im Arbeitsalltag einzusetzen.",
        "foundingDate": "2025",
        "slogan": "Büroarbeit durch Microsoft Copilot messbar produktiver, wirksamer und menschlicher machen",
        "knowsAbout": [
          "Microsoft Copilot",
          "Microsoft 365 Copilot",
          "Microsoft Copilot Training",
          "Microsoft Copilot Schulung",
          "Copilot Enablement",
          "Copilot Adoption",
          "Copilot Rollout",
          "GitHub Copilot",
          "Copilot Studio",
          "KI-Agenten",
          "Prompt Engineering",
          "KI-gestützte Büroarbeit",
          "Microsoft 365 Produktivität"
        ],
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "50.9375",
            "longitude": "6.9603"
          },
          "geoRadius": "1000 km",
          "name": "DACH-Region"
        },
        "parentOrganization": {
          "@type": "Organization",
          "@id": "https://yellow-boat.com/#organization",
          "name": "Yellow-Boat Consulting",
          "url": "https://yellow-boat.com",
          "foundingDate": "2011",
          "description": "Yellow-Boat Consulting realisiert seit über einem Jahrzehnt Agile Trainings und Digitalisierungsprojekte in Konzernen und im Mittelstand."
        },
        "sameAs": [
          "https://www.linkedin.com/company/yellow-boat-consulting",
          "https://yellow-boat.com"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@copilotenschule.de",
          "telephone": "+49 221 950 187 74",
          "availableLanguage": ["de", "en"],
          "areaServed": "DACH"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nussbaumerstrasse 26",
          "addressLocality": "Köln",
          "postalCode": "50823",
          "addressCountry": "DE"
        }
      },
      // Website
      {
        "@type": "WebSite",
        "@id": "https://copilotenschule.de/#website",
        "name": "copilotenschule.de",
        "url": "https://copilotenschule.de",
        "description": "Spezialisierte Weiterbildungen für Microsoft Copilot. Praxis-Trainings, Workshops, Inhouse-Enablement und Coaching für Wissensarbeiter, Teams und Organisationen.",
        "inLanguage": "de-DE",
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://copilotenschule.de/wissen?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      // Educational Organization - For training credibility
      {
        "@type": "EducationalOrganization",
        "@id": "https://copilotenschule.de/#educationalOrganization",
        "name": "copilotenschule.de",
        "url": "https://copilotenschule.de",
        "description": "Spezialisierte Akademie für Microsoft Copilot Trainings mit klarem Fokus auf die Nutzung von Microsoft Copilot im beruflichen Kontext. Praxisorientierter Trainingsansatz mit realen Arbeitsprozessen und direkt anwendbaren Workflows.",
        "areaServed": "DACH",
        "parentOrganization": {
          "@id": "https://yellow-boat.com/#organization"
        },
        "teaches": [
          "Microsoft 365 Copilot für Büroarbeit",
          "Microsoft Copilot Grundlagen",
          "Microsoft Copilot Advanced Training",
          "GitHub Copilot für Entwickler",
          "Copilot Studio und KI-Agenten",
          "Prompt Engineering für Microsoft Copilot",
          "Copilot Governance und Compliance",
          "Copilot Rollout und Adoption"
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "name": "Microsoft Copilot Training Zertifikat",
          "credentialCategory": "Professional Development"
        }
      },
      // All Courses
      ...courses,
      // All Education Events
      ...events,
      // FAQ Page (if provided) - Critical for LLM citation
      ...(faqSchema ? [faqSchema] : [])
    ]
  };
};
