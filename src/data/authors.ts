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
    role: 'Agile Trainer & KI-Experte',
    expertise: [
      'Microsoft Copilot Training',
      'KI-unterstützte Büroarbeit',
      'Agile Methoden seit 2016',
      'New Work & Future Work',
      'Microsoft 365 & Teams Kollaboration'
    ],
    bio: 'Martin Lang ist Agile Trainer seit 2016, Mitgründer von bNear.io (einer App für Kollaboration in Microsoft 365 und Microsoft Teams) sowie Autor und Keynote Speaker zu den Themen KI in der Arbeitswelt, KI-unterstützte Büroarbeit und Future Work. Er hat mehrere Startups im Trainingsbereich gegründet und unterstützt Unternehmen bei der erfolgreichen Einführung von Microsoft Copilot und KI-Tools.',
    image: '/images/authors/martin-lang.jpg',
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
