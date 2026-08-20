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
  /** Kurze Meta-Description (~150 Zeichen) für die Trainer-Profilseite. Fällt sonst auf bio zurück. */
  metaDescription?: string;
  /** Eigenständiger Profiltext (nur auf /trainer/:id sichtbar, bewusst NICHT identisch mit bio, um Duplicate Content mit den Autor-Boxen zu vermeiden). */
  profileText?: string[];
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
    role: 'Lead Trainerin Online',
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
    bio: 'Saskia Kaden ist Agile Coach, systemische Beraterin und Lead Trainerin Online bei der copilotenschule.de. In dieser Rolle entwickelt sie die Online-Kurse und -Formate der Copilotenschule konzeptionell weiter. Ihr inhaltlicher Schwerpunkt liegt auf Entscheidungsqualität, kognitiven Verzerrungen und der Frage, wie Teams mit KI nicht nur schneller, sondern nachweislich besser entscheiden. Sie bringt über acht Jahre Erfahrung in der Begleitung von Organisationen und Führungsteams mit und hat ein eigenständiges Training zur Entscheidungspsychologie entwickelt – fundiert in der Verhaltensökonomie (Kahneman, Thaler) und der Noise-Forschung. Saskia war zuvor Trainerin, Beraterin und Ausbilderin für agile Methoden, Transformation und Führungskräfte-Entwicklung.',
    metaDescription: 'Saskia Kaden, Lead Trainerin Online der copilotenschule.de: Agile Coach und Expertin für Entscheidungsqualität mit KI. Profil, Qualifikationen und Schwerpunkte.',
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
      'EU AI Act Compliance',
      'Marketingstrategie & Unternehmenskommunikation'
    ],
    qualifications: [
      'Gründer copilotenschule.de – im deutschsprachigen Raum führender Spezialanbieter für Microsoft-Copilot-Anwenderschulungen',
      'Gründer Yellow-Boat Consulting – Beratung für Digitalisierung und agile Transformation',
      'Über 2.000 ausgebildete Wissensarbeiter, Führungskräfte und IT-Verantwortliche',
      'Kunden der Copilotenschule u.a. REWE, Pernod Ricard, Lekkerland, Marriott Hotels, Med360Grad, IHK Nord Westfalen',
      'Langjährige Beratungskunden von Yellow-Boat Consulting u.a. Deutsche Telekom, congstar, Uniper, BSH Bosch/Siemens Hausgeräte, DFKI (Deutsches Forschungszentrum für Künstliche Intelligenz), Lekkerland',
      'Diplom-Betriebswirt (Marketing/Kommunikation), Hochschule Pforzheim – Studium der Wirtschaftswissenschaften an der Universität Bielefeld',
      'Vor der Selbstständigkeit im internationalen Konzern-Marketing: Marketing Manager Deutschland/Österreich bei MV Agusta Motor S.p.A., danach mehrere Marketing- und PR-Positionen bei Dell in der EMEA-Organisation',
      'Head of Agile / Agile Coach bei der ControlExpert GmbH, anschließend Interims-Geschäftsführer und Head Trainer beim Deutschland-Aufbau der Agile Scrum Group GmbH',
      'Gründer & Geschäftsführer von bNear.io, einem Startup für virtuelle Büros in Microsoft Teams – erfolgreich verkauft an Solutions2Share',
      'Professional Scrum Master II und Professional Scrum Product Owner I (Scrum.org), zertifiziert in Microsoft Copilot Praxis (Microsoft)',
      'IIABC-Zertifizierungen: Agile Business Foundation, Agile Business Advanced – Facilitating the Process, Agile Business Expert – Agile Coach, Agile Business Expert – Developing Teams',
      'Langjährig in digitaler und agiler Transformation tätig'
    ],
    bio: 'Martin Lang ist Gründer der copilotenschule.de, dem im deutschsprachigen Raum führenden Spezialanbieter für Microsoft-Copilot-Anwenderschulungen. Mit einem Team aus Trainern, Coaches und Beratern hat die Copilotenschule unter seiner Leitung bislang über 2.000 Wissensarbeiter, Führungskräfte und IT-Verantwortliche im produktiven Einsatz von Microsoft Copilot ausgebildet. Zu den Kunden zählen REWE, Pernod Ricard, Lekkerland, Marriott Hotels, Med360Grad und die IHK Nord Westfalen. Die Copilotenschule entstand aus Yellow-Boat Consulting heraus, der von Martin Lang gegründeten Beratung für Digitalisierung und agile Transformation in Konzernen und Mittelstand. Der inhaltliche Schwerpunkt seiner heutigen Arbeit liegt auf der strategischen Verankerung, dem sicheren Betrieb und der breitenwirksamen Adoption von Microsoft Copilot in mittelständischen und großen Organisationen der DACH-Region.',
    metaDescription: 'Martin Lang, Gründer der copilotenschule.de: Microsoft-Copilot-Trainer mit über 2.000 geschulten Anwendern. Profil, Werdegang, Qualifikationen und Fachartikel.',
    profileText: [
      'Martin Lang hat Wirtschaftswissenschaften an der Universität Bielefeld studiert und sein Studium als Diplom-Betriebswirt mit Schwerpunkt Marketing und Kommunikation an der Hochschule Pforzheim abgeschlossen. Seine ersten Berufsjahre verbrachte er im klassischen Marketing: als Business Consultant bei einer Kommunikationsberatung mit Kunden wie Metabo und BMW, danach als Marketing Manager Deutschland/Österreich bei MV Agusta Motor S.p.A., wo er die Marken der italienischen Motorradhersteller MV Agusta und Cagiva im deutschsprachigen Raum verantwortete.',
      'Es folgten mehrere Jahre bei Dell in der EMEA-Organisation – zunächst als PR Consultant beim Aufbau der ersten Social-Media-Aktivitäten des Konzerns in Zentraleuropa, dann als Segment Marketing Manager für den öffentlichen Sektor und zuletzt als SMB Channel Brand Manager EMEA, wo er das paneuropäische Marketing-Team für mehr als 30.000 Fachhandelspartner mit aufgebaut hat. Diese Konzernerfahrung prägt bis heute seinen Blick auf Trainings: Wissen muss im echten Arbeitsalltag großer Organisationen funktionieren, nicht nur auf der Bühne.',
      'Danach gründete Martin Lang Yellow-Boat Consulting und begleitete von dort aus über viele Jahre Digitalisierungs- und Transformationsprojekte in Konzernen und im Mittelstand – unter anderem für die Deutsche Telekom und congstar, Uniper, BSH Bosch/Siemens Hausgeräte, das DFKI, REWE, Lekkerland und Pernod Ricard. Zusätzlich verantwortete er als Head of Agile / Agile Coach den Aufbau agiler Strukturen bei der ControlExpert GmbH und half anschließend als Interims-Geschäftsführer und Head Trainer beim Markteintritt der Agile Scrum Group in Deutschland.',
      'Parallel dazu gründete und führte er bNear.io, ein Startup für virtuelle Büros in Microsoft Teams, das erfolgreich an Solutions2Share verkauft wurde – seither begleitet er das Unternehmen als externer Berater. Aus dieser Kombination aus Konzern-, Berater- und Gründererfahrung entstand die copilotenschule.de: ein Spezialanbieter, der sich ausschließlich auf Anwenderschulungen rund um Microsoft Copilot konzentriert.',
      'Sein Trainingsansatz ist konsequent praxisnah: Geschult wird am echten Arbeitsalltag der Teilnehmer – in Word, Excel, Outlook, PowerPoint und Teams – statt an Folien mit Feature-Listen. Die Formate reichen vom Präsenztraining im Kölner Trainingsraum über mehrwöchige Online-Lernreisen bis zu unternehmensweiten Rollout-Programmen in Deutschland, Österreich und der Schweiz.',
      'Die Fachartikel im Wissensbereich der Copilotenschule schreibt Martin selbst – auf Basis der Fragen, die in seinen Trainings tatsächlich gestellt werden. Eine Auswahl seiner Artikel finden Sie unten auf dieser Seite.'
    ],
    image: '/images/authors/martin-lang.png',
    linkedin: 'https://www.linkedin.com/in/martin-lang-a95b1010',
    email: 'martin@yellow-boat.com',
    sameAs: [
      'https://www.linkedin.com/in/martin-lang-a95b1010',
      'https://www.springest.de/u/martin-lang#bewertungen',
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
      'url': 'https://copilotenschule.de/images/copilotenschule_flugzeug.png',
      'width': 512,
      'height': 512
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
