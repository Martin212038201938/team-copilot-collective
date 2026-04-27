import { Linkedin, Mail } from "lucide-react";
import type { Author } from "@/data/authors";

interface AuthorBioProps {
  author: Author;
  /** Optional: Überschreibt die automatisch ermittelte Anrede */
  heading?: string;
}

/**
 * Visueller Autoren-Block für Wissensartikel.
 *
 * Zweck: einheitliche, vertrauensbildende Personen-Darstellung über alle Artikel hinweg
 * (E-E-A-T-Signal für Suchmaschinen und LLMs).
 *
 * Hinweis: Die strukturierten Personen-Daten (Qualifikationen, knowsAbout, sameAs)
 * fließen über `getAuthorSchemaMarkup` in das Schema.org-Markup der jeweiligen Seite.
 * Dieser visuelle Block bleibt bewusst clean (keine Häkchen-Listen, keine Badge-Wolken),
 * damit die Trust-Wirkung nicht in Marketing-Optik kippt.
 */
const AuthorBio = ({ author, heading }: AuthorBioProps) => {
  // Heuristik: weibliche Vornamen → "Über die Autorin", sonst "Über den Autor"
  const isFemale = /^(saskia|sarah|julia|anna|maria|lisa|kim|nina|laura)$/i.test(
    author.name.split(" ")[0]
  );
  const sectionHeading = heading ?? (isFemale ? "Über die Autorin" : "Über den Autor");

  return (
    <section className="mb-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{sectionHeading}</h2>
      <div className="flex flex-col sm:flex-row gap-6 items-start p-6 bg-card border rounded-2xl shadow-sm">
        {/* Profilbild */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-muted border-2 border-border">
            <img
              src={author.image}
              alt={`Porträtfoto ${author.name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="text-xl font-bold leading-tight">{author.name}</h3>
          <p className="text-sm text-muted-foreground font-medium mb-3">{author.role}</p>

          {/* Bio – kann mehrere Absätze enthalten, getrennt durch Doppel-Newline */}
          <div className="text-sm leading-relaxed space-y-3 mb-4">
            {author.bio.split(/\n\n+/).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Kontakt- und Verifikations-Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
                aria-label={`LinkedIn-Profil von ${author.name}`}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn-Profil
              </a>
            )}
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary hover:underline"
                aria-label={`E-Mail an ${author.name}`}
              >
                <Mail className="w-4 h-4" />
                {author.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;
