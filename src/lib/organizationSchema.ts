/**
 * Schema.org Markup für Organization und Person
 * Stärkt E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
 * Hilft LLMs und Google bei der Entitätsverifikation
 */

// Inhaber / Gründer
export const founderSchema = {
  "@type": "Person",
  "@id": "https://copilotenschule.de/#martin-lang",
  "name": "Martin Lang",
  "jobTitle": "Gründer & Trainer",
  "description": "Microsoft Copilot Trainer, Agile Coach und Gründer der Yellow-Boat Consulting. Seit 2011 Experte für digitale Transformation und seit 2023 spezialisiert auf Microsoft Copilot Trainings.",
  "url": "https://copilotenschule.de/ueber-uns",
  "sameAs": [
    "https://www.linkedin.com/in/martin-lang-a95b1010",
    "https://www.springest.de/u/martin-lang#bewertungen",
    "https://agilescrumgroup.de/uber-uns/team/"
  ],
  "worksFor": {
    "@id": "https://copilotenschule.de/#organization"
  }
};

// Muttergesellschaft: Yellow-Boat Consulting
export const parentOrganizationSchema = {
  "@type": "Organization",
  "@id": "https://www.yellow-boat.com/#organization",
  "name": "Yellow-Boat Consulting",
  "url": "https://www.yellow-boat.com",
  "foundingDate": "2011",
  "founder": {
    "@id": "https://copilotenschule.de/#martin-lang"
  },
  "sameAs": [
    "https://www.yellow-boat.com",
    "https://www.linkedin.com/in/martin-lang-a95b1010"
  ]
};

// Hauptorganisation: copilotenschule.de
export const organizationSchema = {
  "@type": "Organization",
  "@id": "https://copilotenschule.de/#organization",
  "name": "copilotenschule.de",
  "alternateName": "Copilotenschule",
  "url": "https://copilotenschule.de",
  "logo": {
    "@type": "ImageObject",
    "url": "https://copilotenschule.de/logo.png"
  },
  "description": "copilotenschule.de bietet spezialisierte Microsoft Copilot Schulungen und Trainings für Unternehmen im DACH-Raum. Eine Marke der Yellow-Boat Consulting (gegründet 2011).",
  "foundingDate": "2025",
  "founder": {
    "@id": "https://copilotenschule.de/#martin-lang"
  },
  "parentOrganization": {
    "@id": "https://www.yellow-boat.com/#organization"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Köln",
    "addressRegion": "Nordrhein-Westfalen",
    "addressCountry": "DE"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Deutschland"
    },
    {
      "@type": "Country",
      "name": "Österreich"
    },
    {
      "@type": "Country",
      "name": "Schweiz"
    }
  ],
  "sameAs": [
    "https://www.yellow-boat.com",
    "https://www.linkedin.com/in/martin-lang-a95b1010",
    "https://www.springest.de/u/martin-lang#bewertungen",
    "https://agilescrumgroup.de/uber-uns/team/",
    "https://maps.app.goo.gl/JWTPeDLVeuDu9WiJ8"
  ],
  "knowsAbout": [
    "Microsoft 365 Copilot",
    "GitHub Copilot",
    "Microsoft Copilot Studio",
    "Prompt Engineering",
    "KI-Training für Unternehmen",
    "EU AI Act Compliance",
    "Change Management"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Microsoft Copilot Trainings",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Microsoft 365 Copilot Grundlagen-Training"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "GitHub Copilot für Softwareentwickler"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Copilot Studio KI-Agenten Training"
        }
      }
    ]
  }
};

// Kombiniertes Schema für alle Seiten
export const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    parentOrganizationSchema,
    founderSchema
  ]
};

/**
 * Kombiniert das globale Schema mit seitenspezifischem Schema
 */
export function combineWithGlobalSchema(pageSchema?: Record<string, any>): Record<string, any> {
  if (!pageSchema) {
    return globalSchema;
  }

  // Wenn das Seiten-Schema bereits ein @graph hat, füge die globalen Einträge hinzu
  if (pageSchema["@graph"]) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        ...globalSchema["@graph"],
        ...pageSchema["@graph"]
      ]
    };
  }

  // Ansonsten füge das Seiten-Schema zum Graph hinzu
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...globalSchema["@graph"],
      { ...pageSchema, "@context": undefined } // Entferne doppelten @context
    ]
  };
}
