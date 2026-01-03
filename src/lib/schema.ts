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
 */
export const generateTrainingSchemas = (modules: TrainingModule[]) => {
  const courses = modules.map((module, index) => generateCourseSchema(module, index));
  const events = modules.map(module => generateEducationEventSchema(module));

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "name": "copilotenschule.de",
        "alternateName": "Yellow-Boat Consulting",
        "url": "https://copilotenschule.de",
        "logo": "https://copilotenschule.de/og-image.jpg",
        "description": "Professionelle Microsoft 365 Copilot, GitHub Copilot & KI-Agenten Schulungen für Unternehmen",
        "areaServed": "DE",
        "sameAs": [
          "https://www.linkedin.com/company/yellow-boat-consulting"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "kontakt@copilotenschule.de",
          "availableLanguage": "de"
        }
      },
      // Website
      {
        "@type": "WebSite",
        "name": "copilotenschule.de",
        "url": "https://copilotenschule.de",
        "description": "Professionelle Microsoft Copilot Schulungen & Trainings für Unternehmen",
        "inLanguage": "de-DE",
        "publisher": {
          "@type": "Organization",
          "name": "copilotenschule.de"
        }
      },
      // Educational Organization
      {
        "@type": "EducationalOrganization",
        "name": "copilotenschule.de",
        "url": "https://copilotenschule.de",
        "description": "Spezialisiert auf Microsoft Copilot Schulungen: M365 Copilot, GitHub Copilot, KI-Agenten, Copilot Studio",
        "areaServed": "DE",
        "teaches": "Microsoft Copilot Technologies"
      },
      // All Courses
      ...courses,
      // All Education Events
      ...events
    ]
  };
};
