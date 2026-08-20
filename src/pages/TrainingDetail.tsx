import { useParams, Link, Navigate } from "react-router-dom";
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
import { generateTrainingDetailSchema } from "@/lib/schema";
import PriceStoerer from "@/components/PriceStoerer";
import TrainingFactBox from "@/components/TrainingFactBox";
import BookingProcess from "@/components/BookingProcess";
import TrainingReviews from "@/components/TrainingReviews";

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

const TrainingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const training = slug ? getTrainingBySlug(slug) : undefined;

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

  // Sichtbare Preiszeile für die Faktenbox – exakt deckungsgleich mit dem
  // Preis-Störer und mit Offer.price im Schema (eine Zahl, drei Orte).
  const eur = (n: number) => n.toLocaleString("de-DE");
  const priceLine = training.visiblePrice
    ? `ab ${eur(training.visiblePrice.perPerson)} € ${
        training.visiblePrice.unitLabel ?? "pro Teilnehmer"
      }${
        training.visiblePrice.perGroup
          ? ` bei einer Gruppengröße von 12 Teilnehmern, oder ab ${eur(training.visiblePrice.perGroup)} € pro geschlossener Gruppe`
          : ""
      }${training.visiblePrice.note ? `, ${training.visiblePrice.note}` : ""}`
    : undefined;

  // B4 (2026-07-22): Schema kommt zentral aus lib/schema.ts – eine Quelle der
  // Wahrheit statt Doppelpflege (Regeln B1/B2/B6/B7 sind dort dokumentiert).
  const schema = generateTrainingDetailSchema(training);

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

                {/* Sichtbarer "ab"-Preis. Seit 14.08.2026 dauerhaft für alle Trainings
                    mit gepflegtem visiblePrice – der A/B-Test "Preise auszeichnen"
                    wurde zugunsten von Preistransparenz beendet. Der Preis ist damit
                    sichtbar UND maschinenlesbar (Offer.price, siehe lib/schema.ts). */}
                {training.visiblePrice && (
                  <div className="shrink-0 md:pt-1">
                    <PriceStoerer
                      perPerson={training.visiblePrice.perPerson}
                      perGroup={training.visiblePrice.perGroup}
                      unitLabel={training.visiblePrice.unitLabel}
                      note={training.visiblePrice.note}
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

              {/* B7: "Auf einen Blick"-Faktenbox – sichtbare, extrahierbare Kernfakten,
                  seit 14.08.2026 inkl. Preiszeile (siehe TrainingFactBox) */}
              <TrainingFactBox
                format={training.format}
                duration={training.duration}
                audience={training.audienceShort}
                level={training.level}
                prerequisites={training.prerequisites}
                groupSize={training.groupSize}
                certificate={training.certificate}
                priceLine={priceLine}
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
                    <div
                      key={variant.name}
                      className={`relative bg-card border rounded-xl p-6 transition-colors ${
                        variant.badge ? "border-accent shadow-md" : "hover:border-primary/50"
                      }`}
                    >
                      {variant.badge && (
                        <span className="absolute -top-3 right-4 -rotate-2 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 shadow-md">
                          {variant.badge}
                        </span>
                      )}
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

        {/* Phase 3 (2026-07-22): So läuft die Buchung + Konditionen – sichtbarer
            Policy-Text als GEO-Hebel, Inhalte aus Konditionen_Copilotenschule_Standard */}
        <BookingProcess />

        {/* Phase 3 (2026-07-22): Social Proof aus echten Google-Bewertungen
            (nur Zitate ohne Namensnennung des Trainers, mit Google-Profil-Link) */}
        <TrainingReviews />

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
                        {/* Altbestand-Fix (22.07.2026): Markdown-Links in FAQ-Antworten
                            (z.B. Train-the-Trainer) als echte Links rendern statt als Rohtext */}
                        <p className="text-muted-foreground leading-relaxed"><RichText text={faq.answer} /></p>
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
