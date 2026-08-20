import { useParams, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup, authors } from "@/data/authors";
import { trainings } from "@/data/trainings";
import { ALL_ARTICLES } from "@/data/articles";

// Artikel, die NICHT von Martin stammen (aktuell nur Saskias Entscheidungs-Artikel)
const SASKIA_ARTICLE_LINKS = ["/wissen/bessere-entscheidungen-mit-ki"];

const TrainerProfil = () => {
  const { id } = useParams<{ id: string }>();
  const author = id ? getAuthor(id) : undefined;

  // Fallback auf Martin Lang wenn keine ID oder nicht gefunden
  const trainer = author || getAuthor('martin-lang');

  if (!trainer) {
    return <Navigate to="/ueber-uns" replace />;
  }

  // Person-Schema für den Trainer
  const personSchema = getAuthorSchemaMarkup(trainer);

  // Trainings die dieser Trainer durchführt
  const trainerCourses = trainings.slice(0, 6);

  // Fachartikel dieses Trainers (interne Verlinkung Profil ↔ Artikel, E-E-A-T)
  const trainerArticles = (
    trainer.id === "saskia-kaden"
      ? ALL_ARTICLES.filter((a) => SASKIA_ARTICLE_LINKS.includes(a.link))
      : ALL_ARTICLES.filter((a) => !a.isDraft && !SASKIA_ARTICLE_LINKS.includes(a.link))
  ).slice(0, 8);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${trainer.name} – ${trainer.role}`}
        description={trainer.metaDescription ?? trainer.bio}
        keywords={trainer.expertise}
        canonicalUrl={`https://copilotenschule.de/trainer/${trainer.id}`}
        schema={personSchema}
      />
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <Link
                to="/ueber-uns"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zu Über uns
              </Link>
            </nav>

            {/* Profil Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <img
                  src={trainer.image}
                  alt={`${trainer.name} - ${trainer.role}`}
                  className="w-48 h-48 rounded-full object-cover border-4 border-primary/20 shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {trainer.name}
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                  {trainer.role}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {trainer.bio}
                </p>
                <div className="flex flex-wrap gap-3">
                  {trainer.linkedin && (
                    <a
                      href={trainer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006699] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn-Profil
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {trainer.email && (
                    <a
                      href={`mailto:${trainer.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      Kontakt aufnehmen
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Werdegang – eigenständiger Profiltext (nicht identisch mit den Autor-Boxen) */}
        {trainer.profileText && trainer.profileText.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Werdegang & Arbeitsweise</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  {trainer.profileText.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Qualifikationen */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Qualifikationen & Erfahrung</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Qualifikationen</h3>
                    <ul className="space-y-3">
                      {trainer.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {trainer.expertise.map((exp, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Verifizierte Profile */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Verifizierte Profile</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {trainer.sameAs.map((url, idx) => {
                  const domain = new URL(url).hostname.replace('www.', '');
                  return (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-card border rounded-lg hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <ExternalLink className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium truncate">{domain}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Trainings */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Trainings von {trainer.name.split(' ')[0]}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {trainerCourses.map((course) => (
                  <Link
                    key={course.slug}
                    to={`/trainings/${course.slug}`}
                    className="group block p-4 bg-card border rounded-lg hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild>
                  <Link to="/trainings">Alle Trainings ansehen</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Fachartikel */}
        {trainerArticles.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">
                  Fachartikel von {trainer.name.split(" ")[0]}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {trainerArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={article.link}
                      className="group block p-4 bg-card border rounded-lg hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Aktualisiert: {article.lastUpdated}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link to="/wissen">Alle Fachartikel ansehen</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Kontakt */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default TrainerProfil;
