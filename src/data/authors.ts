/**
 * Author profiles for knowledge pages
 * Optimized for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * Schema.org Person markup for LLM and SEO trust signals
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  qualifications: string[];
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  sameAs: string[]; // Verifizierte Profile-URLs
}

export const authors: Record<string, Author> = {
  'saskia-kaden': {
    id: 'saskia-kaden',
    name: 'Saskia Kaden',
    role: 'Agile Coach & systemische Beraterin',
    expertise: [
      'Entscheidungspsychologie',
      'Cognitive Bias & Noise',
      'Agile Coaching',
      'Change Management',
      'KI & Entscheidungsqualität',
      'Verhaltensökonomie',
      'Führungskräfteentwicklung',
      'Organisationsentwicklung',
      'Scrum & Kanban',
      'Teamdynamiken'
    ],
    qualifications: [
      'Certified Professional Agile Coach (ICAgile, 2017)',
      'Agile Scrum Master (EXIN, 2015)',
      'Systemisches Coaching und Changemanagement (INeKO Köln)',
      'OKR Champion (OKRs at the Center, 2020)',
      'Über 8 Jahre Erfahrung als Agile Coach',
      'Trainerin bei der Agile Scrum Group',
      'Agile Coach REWE digital (2018–2024)',
      'Autorin des Trainings zur Entscheidungspsychologie'
    ],
    bio: 'Saskia Kaden ist Agile Coach und systemische Beraterin mit über acht Jahren Erfahrung in der Begleitung von Organisationen und Führungsteams. Ihr Schwerpunkt liegt auf Entscheidungsqualität, kognitiven Verzerrungen und der Frage, wie Teams mit KI nicht nur schneller, sondern nachweislich besser entscheiden. Sie hat ein eigenständiges dreitägiges Training zur Entscheidungspsychologie entwickelt – fundiert in der Verhaltensökonomie (Kahneman, Thaler) und der Noise-Forschung. Als Trainerin bei der Agile Scrum Group arbeitet sie in Company und als Open Classroom, vor Ort und in virtueller Präsenz.',
    image: '/images/authors/saskia-kaden.jpg',
    linkedin: 'https://www.linkedin.com/in/saskia-kaden',
    sameAs: [
      'https://potentially-shippable.de',
      'https://agilescrumgroup.de'
    ]
  },
  'martin-lang': {
    id: 'martin-lang',
    name: 'Martin Lang',
    role: 'Gründer & Microsoft Copilot Experte',
    expertise: [
      'Microsoft Copilot Enablement',
      'Microsoft 365 Copilot Training',
      'GitHub Copilot',
      'Copilot Studio',
      'Prompt Engineering',
      'Copilot Rollout & Adoption',
      'KI-gestützte Büroarbeit',
      'Agile Transformation',
      'Change Management',
      'EU AI Act Compliance'
    ],
    qualifications: [
      'Über 14 Jahre Erfahrung in digitaler Transformation',
      'Gründer Yellow-Boat Consulting (2011)',
      'Gründer copilotenschule.de (2025)',
      'Certified Scrum Master',
      'Agile Coach',
      'Microsoft Copilot Trainer'
    ],
    bio: 'Martin Lang ist Gründer der Yellow-Boat Consulting (2011) und der copilotenschule.de (2025). Seit über einem Jahrzehnt realisiert er Agile Trainings und Digitalisierungsprojekte in Konzernen und im Mittelstand. Als Microsoft Copilot Experte befähigt er Wissensarbeiter, Teams und Organisationen, Microsoft Copilot produktiv, sicher und wertschöpfend im Arbeitsalltag einzusetzen. Sein praxisorientierter Trainingsansatz verbindet reale Arbeitsprozesse mit direkt anwendbaren Workflows.',
    image: '/images/authors/martin-lang.png',
    linkedin: 'https://www.linkedin.com/in/martin-lang-a95b1010',
    email: 'martin@yellow-boat.com',
    sameAs: [
      'https://www.linkedin.com/in/martin-lang-a95b1010',
      'https://www.springest.de/u/martin-lang#bewertungen',
      'https://agilescrumgroup.de/uber-uns/team/',
      'https://www.yellow-boat.com'
    ]
  }
};

export const getAuthor = (authorId: string): Author | undefined => {
  return authors[authorId];
};

/**
 * Generiert vollständiges Person-Schema für einen Autor
 * Wird in Artikel-Seiten als author-Feld verwendet
 */
export const getAuthorSchemaMarkup = (author: Author) => {
  return {
    '@type': 'Person',
    '@id': `https://copilotenschule.de/#${author.id}`,
    'name': author.name,
    'url': `https://copilotenschule.de/trainer/${author.id}`,
    'jobTitle': author.role,
    'description': author.bio,
    'image': {
      '@type': 'ImageObject',
      'url': `https://copilotenschule.de${author.image}`,
      'width': 400,
      'height': 400
    },
    'knowsAbout': author.expertise,
    'hasCredential': author.qualifications.map(q => ({
      '@type': 'EducationalOccupationalCredential',
      'credentialCategory': 'certification',
      'name': q
    })),
    'sameAs': author.sameAs,
    'worksFor': {
      '@id': 'https://copilotenschule.de/#organization'
    },
    ...(author.email && { 'email': `mailto:${author.email}` })
  };
};

/**
 * Generiert Publisher-Schema (Organization)
 * Wird in Artikel-Seiten als publisher-Feld verwendet
 */
export const getPublisherSchema = () => {
  return {
    '@type': 'Organization',
    '@id': 'https://copilotenschule.de/#organization',
    'name': 'copilotenschule.de',
    'url': 'https://copilotenschule.de',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://copilotenschule.de/logo.png',
      'width': 600,
      'height': 60
    }
  };
};

/**
 * Generiert vollständiges Article-Schema für Wissensartikel
 * Verknüpft Artikel mit Autor und Publisher
 */
export const getArticleSchema = (options: {
  title: string;
  description: string;
  slug: string;
  author: Author;
  publishDate: string;
  modifiedDate?: string;
  keywords?: string[];
  category?: string;
}) => {
  const { title, description, slug, author, publishDate, modifiedDate, keywords, category } = options;

  return {
    '@type': 'Article',
    '@id': `https://copilotenschule.de/wissen/${slug}#article`,
    'headline': title,
    'description': description,
    'url': `https://copilotenschule.de/wissen/${slug}`,
    'datePublished': publishDate,
    'dateModified': modifiedDate || publishDate,
    'author': {
      '@id': `https://copilotenschule.de/#${author.id}`
    },
    'publisher': {
      '@id': 'https://copilotenschule.de/#organization'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://copilotenschule.de/wissen/${slug}`
    },
    'image': {
      '@type': 'ImageObject',
      'url': `https://copilotenschule.de/og-image.jpg`
    },
    'inLanguage': 'de-DE',
    ...(keywords && keywords.length > 0 && { 'keywords': keywords.join(', ') }),
    ...(category && { 'articleSection': category })
  };
};

/**
 * Generiert kombiniertes Schema-Graph für Artikel-Seiten
 * Enthält: Article, Person (Author), Organization (Publisher)
 */
export const getFullArticleSchemaGraph = (options: {
  title: string;
  description: string;
  slug: string;
  authorId: string;
  publishDate: string;
  modifiedDate?: string;
  keywords?: string[];
  category?: string;
}) => {
  const author = getAuthor(options.authorId);

  if (!author) {
    console.warn(`Author not found: ${options.authorId}`);
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getArticleSchema({ ...options, author }),
      getAuthorSchemaMarkup(author),
      getPublisherSchema()
    ]
  };
};
