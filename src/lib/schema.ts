/**
 * Utility functions for generating Schema.org structured data
 * Helps search engines and AI models better understand training courses
 */

export interface TrainingModule {
  title: string;
  duration: string;
  description: string;
  features: string[];
}

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
 * Combines organization, website, and course/event data
 * Optimized for LLM trust signals and SEO
 */
export const generateTrainingSchemas = (modules: TrainingModule[]) => {
  const courses = modules.map((module, index) => generateCourseSchema(module, index));
  const events = modules.map(module => generateEducationEventSchema(module));

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
        "description": "copilotenschule.de ist eine spezialisierte Weiterbildungs- und Enablement-Plattform für den professionellen Einsatz von Microsoft Copilot in der täglichen Büroarbeit. Wir befähigen Wissensarbeiter, Teams und Organisationen, Microsoft Copilot produktiv, sicher und wertschöpfend im Arbeitsalltag einzusetzen.",
        "foundingDate": "2024",
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
        "description": "Spezialisierte Weiterbildungs- und Enablement-Plattform für Microsoft Copilot. Praxis-Trainings, Workshops, Inhouse-Enablement und Coaching für Wissensarbeiter, Teams und Organisationen.",
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
      ...events
    ]
  };
};
