import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, CheckCircle2, ArrowRight, Linkedin, Mail, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTrainingBySlug, trainings } from "@/data/trainings";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateBreadcrumbSchema } from "@/lib/schema";

const TrainingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const training = slug ? getTrainingBySlug(slug) : undefined;

  // 404 wenn Training nicht gefunden
  if (!training) {
    return <Navigate to="/unsere-angebote" replace />;
  }

  const Icon = training.icon;

  // Finde ähnliche Trainings (gleiche Tiers, aber anderer Slug)
  const relatedTrainings = trainings
    .filter(t => t.slug !== training.slug && t.tiers.some(tier => training.tiers.includes(tier)))
    .slice(0, 3);

  // Trainer-Profil
  const trainer = getAuthor('martin-lang');

  // Schema.org für SEO - Course mit instructor und provider
  const courseSchema = {
    "@type": "Course",
    "@id": `https://copilotenschule.de/trainings/${training.slug}#course`,
    "name": training.title,
    "description": training.description,
    "url": `https://copilotenschule.de/trainings/${training.slug}`,
    "provider": {
      "@id": "https://copilotenschule.de/#organization"
    },
    "instructor": {
      "@id": "https://copilotenschule.de/#martin-lang"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["onsite", "online"],
      "duration": training.duration,
      "inLanguage": "de-DE"
    },
    "teaches": training.features.slice(0, 5).join(", "),
    "coursePrerequisites": "Keine Vorkenntnisse erforderlich",
    "educationalLevel": training.tiers.includes("free") ? "Beginner" : "Intermediate",
    "inLanguage": "de-DE"
  };

  // BreadcrumbList Schema für Navigation
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "https://copilotenschule.de/" },
    { name: "Unsere Angebote", url: "https://copilotenschule.de/unsere-angebote" },
    { name: training.title, url: `https://copilotenschule.de/trainings/${training.slug}` }
  ]);

  // FAQPage Schema wenn FAQs vorhanden
  const faqSchema = training.faqs && training.faqs.length > 0 ? {
    "@type": "FAQPage",
    "@id": `https://copilotenschule.de/trainings/${training.slug}#faq`,
    "mainEntity": training.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Kombiniertes Schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      courseSchema,
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : [])
    ]
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={training.metaTitle}
        description={training.metaDescription}
        keywords={training.keywords}
        canonicalUrl={`https://copilotenschule.de/trainings/${training.slug}`}
        schema={schema}
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
                to="/unsere-angebote"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </Link>
            </nav>

            {/* Header */}
            <div className="max-w-4xl">
              {/* Tier Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {training.tiers.includes("free") && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                    Copilot Free
                  </Badge>
                )}
                {training.tiers.includes("paid") && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                    Copilot Paid
                  </Badge>
                )}
              </div>

              {/* h1 - Hauptüberschrift */}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {training.title}
              </h1>

              {/* Dauer */}
              <div className="flex items-center gap-2 text-lg text-muted-foreground mb-8">
                <Clock className="w-5 h-5" />
                <span>{training.duration}</span>
              </div>

              {/* Einleitung / Beschreibung */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {training.description}
              </p>
            </div>
          </div>
        </section>

        {/* Inhalte Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {/* h2 - Unterüberschrift */}
              <h2 className="text-3xl font-bold mb-8">
                Inhalte und Lernziele
              </h2>

              {/* Features Liste - ohne JavaScript sichtbar */}
              <ul className="space-y-4">
                {training.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Interesse an diesem Training?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch. Wir passen das Training an Ihre Anforderungen an.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#contact">
                    Training anfragen
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/training-konfigurator">
                    Training konfigurieren
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ähnliche Trainings */}
        {relatedTrainings.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Weitere passende Trainings
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedTrainings.map((related) => {
                  const RelatedIcon = related.icon;
                  return (
                    <Link
                      key={related.slug}
                      to={`/trainings/${related.slug}`}
                      className="group block p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <RelatedIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex gap-1">
                          {related.tiers.includes("free") && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">Free</Badge>
                          )}
                          {related.tiers.includes("paid") && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">Paid</Badge>
                          )}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {related.duration}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Mehr erfahren <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Trainer Section */}
        {trainer && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Ihr Trainer</h2>
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <Link to={`/trainer/${trainer.id}`}>
                          <img
                            src={trainer.image}
                            alt={`${trainer.name} - ${trainer.role}`}
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 hover:border-primary/50 transition-colors"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <Link to={`/trainer/${trainer.id}`} className="hover:text-primary transition-colors">
                          <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
                        </Link>
                        <div className="text-sm text-muted-foreground mb-3">{trainer.role}</div>
                        <p className="text-sm leading-relaxed mb-4">{trainer.bio}</p>
                        <div className="mb-3">
                          <div className="text-sm font-semibold mb-2">Qualifikationen:</div>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {trainer.qualifications.slice(0, 3).map((qual, idx) => (
                              <li key={idx}>{qual}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Link
                            to={`/trainer/${trainer.id}`}
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                          >
                            <ArrowRight className="w-4 h-4" />
                            Vollständiges Profil
                          </Link>
                          {trainer.linkedin && (
                            <a
                              href={trainer.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <Linkedin className="w-4 h-4" />
                              LinkedIn
                            </a>
                          )}
                          {trainer.email && (
                            <a
                              href={`mailto:${trainer.email}`}
                              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <Mail className="w-4 h-4" />
                              Kontakt
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {training.faqs && training.faqs.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-3">Häufig gestellte Fragen</h2>
                  <p className="text-muted-foreground">Antworten auf die wichtigsten Fragen zu diesem Training</p>
                </div>
                <div className="space-y-4">
                  {training.faqs.map((faq, idx) => (
                    <Card key={idx} className="border-l-4 border-l-primary/50 hover:border-l-primary transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 pl-12">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Kontakt Section */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default TrainingDetail;
