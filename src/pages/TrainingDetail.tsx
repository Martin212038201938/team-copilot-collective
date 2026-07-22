import { useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, CheckCircle2, ArrowRight, Linkedin, Mail, HelpCircle, Users, GraduationCap, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import StickyBookingCTA from "@/components/StickyBookingCTA";
import SEOHead from "@/components/SEOHead";
import { TrustBadge } from "@/components/TrustBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTrainingBySlug, trainings, BOOKING_MODE_LABELS } from "@/data/trainings";
import { getWorkshopBySlug } from "@/data/workshops";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateTrainingBreadcrumbItems } from "@/lib/schema";
import PriceStoerer from "@/components/PriceStoerer";
import TrainingFactBox from "@/components/TrainingFactBox";
import { setSessionTag } from "@/lib/analytics";
import { assignVariantIfNeeded, isAbPricingTestSlug, isPrerender, setVariant } from "@/lib/abPricing";

/** Renders a string that may contain markdown-style links [text](/path) as React Router Links */
const RichText = ({ text }: { text: string }) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          return (
            <Link key={i} to={match[2]} className="text-primary hover:underline font-medium">
              {match[1]}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const TrainingDetail = ({ showPricing = false }: { showPricing?: boolean }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const training = slug ? getTrainingBySlug(slug) : undefined;

  // A/B-Test "Preise auszeichnen": Bucket-Zuweisung, Journey-Redirect und
  // Clarity-Messpunkte. Nur clientseitig (nie im react-snap-Prerender), nur für
  // die 4 Testtrainings. Muss VOR dem Early-Return stehen (Rules of Hooks).
  useEffect(() => {
    if (isPrerender() || !slug || !isAbPricingTestSlug(slug)) return;

    if (showPricing) {
      // B-Route: Nutzer ist (bzw. wird) Variante B; Session taggen.
      setVariant("B");
      setSessionTag("ab_pricing", "B");
      setSessionTag("ab_pricing_product", slug);
    } else {
      // A-Route: beim ersten Kontakt 50/50 zuweisen, Session taggen.
      const variant = assignVariantIfNeeded();
      setSessionTag("ab_pricing", variant);
      setSessionTag("ab_pricing_product", slug);
      // B-User dauerhaft auf die Preis-Route ihrer Journey umleiten.
      if (variant === "B") {
        navigate(`/trainings/preis/${slug}`, { replace: true });
      }
    }
  }, [slug, showPricing, navigate]);

  // 404 wenn Training nicht gefunden
  if (!training) {
    return <Navigate to="/trainings" replace />;
  }

  const Icon = training.icon;

  // Finde ähnliche Trainings (gleiche Tiers, aber anderer Slug)
  const relatedTrainings = trainings
    .filter(t => t.slug !== training.slug && t.tiers.some(tier => training.tiers.includes(tier)))
    .slice(0, 3);

  // Verknüpfte Workshops als optionale Erweiterungsmodule
  const relatedWorkshops = (training.relatedWorkshops ?? [])
    .map(slug => getWorkshopBySlug(slug))
    .filter(Boolean);

  // Trainer-Profil
  const trainer = getAuthor('martin-lang');

  // Schema IDs automatisch generieren aus dem Slug
  const ids = generateSchemaIds(training.slug, 'trainings');
  const pageUrl = `https://copilotenschule.de/trainings/${training.slug}`;
  const breadcrumbItems = generateTrainingBreadcrumbItems(training.title, pageUrl);

  // Schema.org für SEO - Course mit instructor und provider
  const courseSchema = {
    "@type": "Course",
    "@id": ids.article, // Nutzt #course für Trainings
    "name": training.title,
    "description": training.description,
    "url": pageUrl,
    "provider": {
      "@id": "https://copilotenschule.de/#organization"
    },
    "instructor": {
      "@id": "https://copilotenschule.de/#martin-lang"
    },
    // B7 (2026-07-22): je Buchungsvariante eine eigene CourseInstance –
    // gespiegelt aus dem sichtbaren Abschnitt "Formate und Buchungsvarianten"
    "hasCourseInstance": training.bookingFormats && training.bookingFormats.length > 0
      ? training.bookingFormats.map((variant) => ({
          "@type": "CourseInstance",
          "name": variant.name,
          "courseMode": variant.modes,
          ...(variant.durationISO ? { "duration": variant.durationISO } : {}),
          ...(variant.workload ? { "courseWorkload": variant.workload } : {}),
          ...(variant.description ? { "description": variant.description } : {}),
          "inLanguage": "de-DE"
        }))
      : {
          "@type": "CourseInstance",
          "courseMode": ["onsite", "online"],
          "duration": training.durationISO || "PT7H",
          "inLanguage": "de-DE"
        },
    // B1 (2026-07-22): Keine Preise im Schema, solange der A/B-Test "Preise
    // auszeichnen" (ab_pricing) läuft. Structured Data darf nur abbilden, was
    // sichtbar auf der Seite steht – Preise sind aktuell bewusst unsichtbar.
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "url": pageUrl,
      "availability": "https://schema.org/InStock"
    },
    "teaches": training.learningOutcomes
      ? training.learningOutcomes.join(", ")
      : training.features.slice(0, 5).join(", "),
    // B2 (2026-07-22): Voraussetzungen je Training statt Pauschaltext
    ...(training.prerequisites ? { "coursePrerequisites": training.prerequisites } : {}),
    // B7 (2026-07-22): sichtbares Zertifikat maschinenlesbar spiegeln
    ...(training.certificate ? { "educationalCredentialAwarded": training.certificate } : {}),
    "educationalLevel": training.tiers.includes("free") ? "Beginner" : "Intermediate",
    "inLanguage": "de-DE",
    ...(training.targetAudience && {
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": training.targetAudience.join(", ")
      }
    }),
    ...(training.businessImpact && {
      "competencyRequired": training.businessImpact.join(", ")
    })
  };

  // BreadcrumbList Schema für Navigation
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb,
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  // FAQPage Schema wenn FAQs vorhanden
  const faqSchema = training.faqs && training.faqs.length > 0 ? {
    "@type": "FAQPage",
    "@id": ids.faq,
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
      {/* B-Variante (Preis-Route) nicht indexieren; Canonical zeigt bereits auf die A-URL */}
      {showPricing && (
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
      )}
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
                to="/trainings"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </Link>
            </nav>

            {/* Header */}
            <div className="max-w-4xl">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
                <div className="min-w-0">
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
                </div>

                {/* Preis-Störer nur in der B-Variante des A/B-Tests */}
                {showPricing && typeof training.abPreisProPerson === "number" && (
                  <div className="shrink-0 md:pt-1">
                    <PriceStoerer
                      perPerson={training.abPreisProPerson}
                      perGroup={training.abPreisProGruppe}
                    />
                  </div>
                )}
              </div>

              {/* Kursive LLM-Frage als Teaser */}
              {training.questionLead && (
                <p className="text-gray-500 italic mb-4">{training.questionLead}</p>
              )}

              {/* Einleitung / Beschreibung */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {training.description}
              </p>

              {/* B7: "Auf einen Blick"-Faktenbox – sichtbare, extrahierbare Kernfakten
                  (bewusst ohne Preiszeile, solange der A/B-Test ab_pricing läuft) */}
              <TrainingFactBox
                format={training.format}
                duration={training.duration}
                audience={training.audienceShort}
                level={training.level}
                prerequisites={training.prerequisites}
                groupSize={training.groupSize}
                certificate={training.certificate}
              />
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

        {/* Zielgruppe Section */}
        {training.targetAudience && training.targetAudience.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Für wen ist dieses Training?
                  </h2>
                </div>
                <ul className="space-y-4">
                  {training.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Lernziele Section */}
        {training.learningOutcomes && training.learningOutcomes.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Was lernen die Teilnehmer?
                  </h2>
                </div>
                <ul className="space-y-4">
                  {training.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Business Impact Section */}
        {training.businessImpact && training.businessImpact.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Erwartbare Effekte im Arbeitsalltag
                  </h2>
                </div>
                <ul className="space-y-4">
                  {training.businessImpact.map((impact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-lg"><RichText text={impact} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Optionale Erweiterungsmodule (verknüpfte Workshops) */}
        {relatedWorkshops.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Optionales Erweiterungsmodul</h2>
                <p className="text-muted-foreground mb-8">
                  Dieses Training lässt sich um ein spezialisiertes Modul ergänzen – buchbar als eigenständiger Workshop oder als integrierter Baustein.
                </p>
                <div className="space-y-6">
                  {relatedWorkshops.map((workshop) => {
                    const WorkshopIcon = workshop!.icon;
                    return (
                      <div key={workshop!.slug} className="bg-card border rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-primary/50 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-primary/10 rounded-lg w-fit">
                            <WorkshopIcon className="w-7 h-7 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{workshop!.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{workshop!.duration}</p>
                          <p className="text-muted-foreground mb-4">{workshop!.questionLead}</p>
                          <Link
                            to={`/workshops/${workshop!.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                          >
                            Mehr zum Modul <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* B7: Formate & Buchungsvarianten – strukturierte Varianten statt Feature-Bullet */}
        {training.bookingFormats && training.bookingFormats.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Formate und Buchungsvarianten</h2>
                <p className="text-muted-foreground mb-8">
                  Dieses Training ist in folgenden Varianten buchbar – Inhalte und Tiefe passen wir an Format und Gruppe an.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {training.bookingFormats.map((variant) => (
                    <div key={variant.name} className="bg-card border rounded-xl p-6 hover:border-primary/50 transition-colors">
                      <h3 className="text-lg font-semibold mb-1">{variant.name}</h3>
                      <p className="text-sm text-primary font-medium mb-2">
                        {variant.modes.map((mode) => BOOKING_MODE_LABELS[mode]).join(" · ")}
                        {variant.workload ? ` · ${variant.workload}` : ""}
                      </p>
                      {variant.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed">{variant.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-background">
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

        {/* Trust Section */}
        <TrustBadge />

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

      <StickyBookingCTA />
      <Footer />
    </div>
  );
};

export default TrainingDetail;
