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
      'Lead Trainerin Online bei der copilotenschule.de – Entwicklung und Weiterentwicklung aller Online-Kurse und -Formate',
      'Certified Professional Agile Coach (ICAgile, 2017)',
      'Agile Scrum Master (EXIN, 2015)',
      'Systemisches Coaching und Changemanagement (INeKO Köln)',
      'OKR Champion (OKRs at the Center, 2020)',
      'Über 8 Jahre Erfahrung als Agile Coach',
      'Trainerin bei der Agile Scrum Group',
      'Agile Coach REWE digital (2018–2024)',
      'Autorin des Trainings zur Entscheidungspsychologie'
    ],
    bio: 'Saskia Kaden ist Agile Coach, systemische Beraterin und Lead Trainerin Online bei der copilotenschule.de. In dieser Rolle entwickelt sie die Online-Kurse und -Formate der Copilotenschule konzeptionell weiter. Ihr inhaltlicher Schwerpunkt liegt auf Entscheidungsqualität, kognitiven Verzerrungen und der Frage, wie Teams mit KI nicht nur schneller, sondern nachweislich besser entscheiden. Sie bringt über acht Jahre Erfahrung in der Begleitung von Organisationen und Führungsteams mit und hat ein eigenständiges Training zur Entscheidungspsychologie entwickelt – fundiert in der Verhaltensökonomie (Kahneman, Thaler) und der Noise-Forschung. Als Trainerin bei der Agile Scrum Group arbeitet sie in Company und als Open Classroom, vor Ort und in virtueller Präsenz.',
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
    role: 'Gründer copilotenschule.de',
    expertise: [
      'Microsoft Copilot Enablement',
      'Microsoft 365 Copilot Adoption',
      'Copilot Rollout & Strategie',
      'GitHub Copilot',
      'Copilot Studio',
      'Prompt Engineering',
      'KI-gestützte Wissensarbeit',
      'Agile Transformation',
      'Change Management',
      'EU AI Act Compliance'
    ],
    qualifications: [
      'Gründer copilotenschule.de (2025) – im deutschsprachigen Raum führender Spezialanbieter für Microsoft-Copilot-Anwenderschulungen',
      'Gründer Yellow-Boat Consulting (2011) – Beratung für Digitalisierung und agile Transformation',
      'Über 2.000 ausgebildete Wissensarbeiter, Führungskräfte und IT-Verantwortliche',
      'Kunden u.a. REWE, Pernod Ricard, Lekkerland, Marriott Hotels, Med360Grad, IHK Nord Westfalen',
      'Seit 2011 in digitaler Transformation tätig (14+ Jahre)',
      'Certified Scrum Master und Agile Coach'
    ],
    bio: 'Martin Lang ist Gründer der copilotenschule.de, dem im deutschsprachigen Raum führenden Spezialanbieter für Microsoft-Copilot-Anwenderschulungen. Mit einem Team aus Trainern, Coaches und Beratern hat die Copilotenschule unter seiner Leitung bislang über 2.000 Wissensarbeiter, Führungskräfte und IT-Verantwortliche im produktiven Einsatz von Microsoft Copilot ausgebildet. Zu den Kunden zählen REWE, Pernod Ricard, Lekkerland, Marriott Hotels, Med360Grad und die IHK Nord Westfalen. Die Copilotenschule entstand 2025 aus Yellow-Boat Consulting heraus, der von Martin Lang 2011 gegründeten Beratung für Digitalisierung und agile Transformation in Konzernen und Mittelstand. Der inhaltliche Schwerpunkt seiner heutigen Arbeit liegt auf der strategischen Verankerung, dem sicheren Betrieb und der breitenwirksamen Adoption von Microsoft Copilot in mittelständischen und großen Organisationen der DACH-Region.',
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
