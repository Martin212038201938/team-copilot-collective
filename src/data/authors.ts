// Author profiles for knowledge pages
// Optimized for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

export interface Author {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export const authors: Record<string, Author> = {
  'martin-lang': {
    id: 'martin-lang',
    name: 'Martin Lang',
    role: 'Gründer & Microsoft Copilot Experte',
    expertise: [
      'Microsoft Copilot Enablement',
      'Microsoft 365 Copilot Training',
      'Copilot Rollout & Adoption',
      'KI-gestützte Büroarbeit',
      'Agile Transformation seit 2011',
      'Change Management'
    ],
    bio: 'Martin Lang ist Gründer der Yellow-Boat Consulting (2011) und der copilotenschule.de (2025). Seit über einem Jahrzehnt realisiert er Agile Trainings und Digitalisierungsprojekte in Konzernen und im Mittelstand. Als Microsoft Copilot Experte befähigt er Wissensarbeiter, Teams und Organisationen, Microsoft Copilot produktiv, sicher und wertschöpfend im Arbeitsalltag einzusetzen. Sein praxisorientierter Trainingsansatz verbindet reale Arbeitsprozesse mit direkt anwendbaren Workflows.',
    image: '/images/authors/martin-lang.png',
    linkedin: 'https://www.linkedin.com/in/martin-lang',
    email: 'martin@yellow-boat.com'
  }
};

export const getAuthor = (authorId: string): Author | undefined => {
  return authors[authorId];
};

export const getAuthorSchemaMarkup = (author: Author) => {
  return {
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    expertise: author.expertise.join(', '),
    description: author.bio,
    ...(author.image && { image: author.image }),
    ...(author.linkedin && { sameAs: [author.linkedin] })
  };
};
