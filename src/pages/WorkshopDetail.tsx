/**
 * WorkshopDetail: Dynamische Detail-Seite für jeden Workshop aus /src/data/workshops.ts
 *
 * Struktur (GEO-optimiert – maximale Zitierfähigkeit durch LLMs):
 *  - Hero mit Type-Badge, H1, Dauer, Teilnehmende, Format
 *  - Kursive LLM-Frage als Teaser (questionLead)
 *  - Beschreibung
 *  - Framework / Methodik (benannte Schritte → zitierbar)
 *  - Features / Agenda
 *  - Zielgruppe
 *  - Lernziele / Ergebnisse
 *  - Deliverables (was bekommt man schwarz auf weiß)
 *  - Business Impact
 *  - Zweistufige CTA (Kalender prominent + Kontakt)
 *  - Verwandte Workshops
 *  - Verwandte Trainings (Cross-Linking)
 *  - FAQ-Sektion
 */

import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  Users,
  GraduationCap,
  TrendingUp,
  Package,
  Layers,
  HelpCircle,
  Calendar as CalendarIcon,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { TrustBadge } from "@/components/TrustBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getWorkshopBySlug,
  workshops,
  WORKSHOP_TYPE_LABELS,
  type WorkshopType,
} from "@/data/workshops";
import { getTrainingBySlug } from "@/data/trainings";
import { generateWorkshopPageSchema } from "@/lib/workshopSchema";

// Typ-spezifische Farb-/Badge-Darstellung
const TYPE_BADGE_CLASS: Record<WorkshopType, string> = {
  "change-program":
    "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border-amber-300",
  workshop: "bg-indigo-100 text-indigo-700 border-indigo-200",
  event: "bg-purple-100 text-purple-700 border-purple-200",
  keynote: "bg-rose-100 text-rose-700 border-rose-200",
};

// Bezeichnung für den Button je nach Typ
const TYPE_CTA_LABEL: Record<WorkshopType, string> = {
  "change-program": "Change-Programm anfragen",
  workshop: "Workshop anfragen",
  event: "Event anfragen",
  keynote: "Keynote anfragen",
};

const WorkshopDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const workshop = slug ? getWorkshopBySlug(slug) : undefined;

  // 404 → zurück auf Landingpage
  if (!workshop) {
    return <Navigate to="/workshops" replace />;
  }

  const Icon = workshop.icon;
  const typeLabel = WORKSHOP_TYPE_LABELS[workshop.type];
  const ctaLabel = TYPE_CTA_LABEL[workshop.type];

  // Verwandte Workshops und Trainings (manuell kuratiert in der Datenquelle)
  const relatedWorkshops = (workshop.relatedWorkshops ?? [])
    .map((s) => workshops.find((w) => w.slug === s))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));

  const relatedTrainings = (workshop.relatedTrainings ?? [])
    .map((s) => getTrainingBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  // Schema.org für SEO + GEO
  const schema = generateWorkshopPageSchema(workshop);
  const pageUrl = `https://copilotenschule.de/workshops/${workshop.slug}`;

  return (
    <div className="min-h-screen">
      <SEOHead
        title={workshop.metaTitle.replace(" | copilotenschule.de", "")}
        description={workshop.metaDescription}
        keywords={workshop.keywords}
        canonicalUrl={pageUrl}
        schema={schema}
      />
      <Header />

      <main className="pt-24">
        {/* -----------------------------------------------------------
         *  HERO
         * ----------------------------------------------------------- */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <Link
                to="/workshops"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zu Workshops und Events
              </Link>
            </nav>

            <div className="max-w-4xl">
              {/* Typ-Badge + Popular-Flag */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  className={`${TYPE_BADGE_CLASS[workshop.type]} hover:opacity-100 text-xs px-2.5 py-0.5 font-medium`}
                >
                  {typeLabel}
                </Badge>
                {workshop.featured && (
                  <Badge className="bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-100 text-xs px-2.5 py-0.5 font-semibold">
                    ★ Flaggschiff-Programm
                  </Badge>
                )}
                {workshop.popular && !workshop.featured && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-100 text-xs px-2.5 py-0.5 font-semibold">
                    ★ Häufig gebucht
                  </Badge>
                )}
              </div>

              {/* H1 */}
              <div className="flex items-start gap-4 mb-4">
                <div className="hidden md:flex p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {workshop.title}
                </h1>
              </div>

              {/* Claim / Subtitle */}
              {workshop.subtitle && (
                <p className="text-xl text-foreground/80 mb-6 leading-relaxed">
                  {workshop.subtitle}
                </p>
              )}

              {/* Meta-Infos */}
              <div className="flex flex-wrap gap-5 text-base text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" /> {workshop.duration}
                </span>
                {workshop.participants && (
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" /> {workshop.participants}
                  </span>
                )}
                {workshop.format && (
                  <span className="flex items-center gap-2">
                    <Layers className="w-5 h-5" /> {workshop.format}
                  </span>
                )}
              </div>

              {/* LLM-Frage (Teaser – GEO) */}
              {workshop.questionLead && (
                <p className="text-gray-500 italic mb-4">
                  {workshop.questionLead}
                </p>
              )}

              {/* Beschreibung */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {workshop.description}
              </p>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------
         *  FRAMEWORK / METHODIK (falls vorhanden)
         * ----------------------------------------------------------- */}
        {workshop.framework && workshop.framework.steps.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Methodik und Ablauf
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8 ml-1">
                  Wir arbeiten nach dem{" "}
                  <strong className="text-foreground">
                    {workshop.framework.name}
                  </strong>{" "}
                  – einem bewährten Vorgehen, das Struktur und Anpassungsfähigkeit
                  verbindet.
                </p>

                <ol className="relative space-y-6 border-l-2 border-primary/30 pl-8 ml-1">
                  {workshop.framework.steps.map((step, index) => (
                    <li key={index} className="relative">
                      <span className="absolute -left-[2.4rem] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md">
                        {index + 1}
                      </span>
                      <p className="text-lg leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* -----------------------------------------------------------
         *  FEATURES / AGENDA
         * ----------------------------------------------------------- */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">
                Das ist enthalten
              </h2>
              <ul className="space-y-4">
                {workshop.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------
         *  ZIELGRUPPE
         * ----------------------------------------------------------- */}
        {workshop.targetAudience.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Für wen ist dieses Format?
                  </h2>
                </div>
                <ul className="space-y-4">
                  {workshop.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg leading-relaxed">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* -----------------------------------------------------------
         *  LERNZIELE / ERGEBNISSE
         * ----------------------------------------------------------- */}
        {workshop.learningOutcomes.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {workshop.type === "change-program"
                      ? "Was nimmt Ihre Organisation mit?"
                      : workshop.type === "keynote"
                      ? "Was nehmen Zuhörende mit?"
                      : "Was nehmen Teilnehmende mit?"}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {workshop.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* -----------------------------------------------------------
         *  DELIVERABLES
         * ----------------------------------------------------------- */}
        {workshop.deliverables && workshop.deliverables.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Das bekommen Sie schwarz auf weiß
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {workshop.deliverables.map((deliverable, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-card border rounded-lg"
                    >
                      <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-base leading-relaxed">
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -----------------------------------------------------------
         *  BUSINESS IMPACT
         * ----------------------------------------------------------- */}
        {workshop.businessImpact.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Erwartbare Wirkung im Unternehmen
                  </h2>
                </div>
                <ul className="space-y-4">
                  {workshop.businessImpact.map((impact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-lg leading-relaxed">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* -----------------------------------------------------------
         *  ZWEISTUFIGE CTA (Kalender prominent + Kontakt)
         * ----------------------------------------------------------- */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {ctaLabel.replace(" anfragen", "")} unverbindlich besprechen?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Buchen Sie ein 15-Minuten-Erstgespräch oder schreiben Sie uns kurz – wir melden uns mit einem konkreten Vorschlag.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="relative h-full rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        <Sparkles className="w-3.5 h-3.5" /> Empfohlen
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        Termin direkt im Kalender buchen
                      </h3>
                      <p className="text-primary-foreground/90 mb-6 text-base max-w-xl">
                        15 Minuten, direkt mit Martin Lang. Sie wählen Ihr Zeitfenster – wir klären gemeinsam, ob und wie dieses Format zu Ihrer Situation passt.
                      </p>
                      <a
                        href="https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="secondary"
                          size="lg"
                          className="font-semibold"
                        >
                          <CalendarIcon className="w-5 h-5 mr-2" />
                          Jetzt Termin buchen →
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="h-full rounded-2xl bg-card border-2 border-border p-8 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">
                      Lieber schriftlich?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                      Schreiben Sie uns kurz – wir melden uns innerhalb eines Werktags.
                    </p>
                    <div className="space-y-3">
                      <a
                        href="https://teams.microsoft.com/l/chat/0/0?users=martin@yellow-boat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Teams-Chat
                        </Button>
                      </a>
                      <a href="mailto:info@copilotenschule.de">
                        <Button variant="ghost" className="w-full justify-start">
                          info@copilotenschule.de
                        </Button>
                      </a>
                      <a href="tel:+4922195018774">
                        <Button variant="ghost" className="w-full justify-start">
                          +49 221 950 187 74
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------
         *  VERWANDTE WORKSHOPS
         * ----------------------------------------------------------- */}
        {relatedWorkshops.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Weitere passende Workshops und Events
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedWorkshops.map((related) => {
                  const RelatedIcon = related.icon;
                  const relType = WORKSHOP_TYPE_LABELS[related.type];
                  return (
                    <Link
                      key={related.slug}
                      to={`/workshops/${related.slug}`}
                      className="group block p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <RelatedIcon className="w-5 h-5 text-primary" />
                        </div>
                        <Badge
                          className={`${TYPE_BADGE_CLASS[related.type]} text-[10px] px-1.5 py-0`}
                        >
                          {relType}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                        <Clock className="w-3 h-3" />
                        {related.duration}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Mehr erfahren <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* -----------------------------------------------------------
         *  VERWANDTE TRAININGS (Cross-Link)
         * ----------------------------------------------------------- */}
        {relatedTrainings.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-primary mb-2">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold mb-3">
                  Passende Trainings für Ihre Teams
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                  Damit aus der Strategie gelebte Praxis wird: Trainings, die die Kompetenz einzelner Teams aufbauen und den Erfolg Ihres Formats sichern.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedTrainings.slice(0, 3).map((training) => {
                  const TIcon = training.icon;
                  return (
                    <Link
                      key={training.slug}
                      to={`/trainings/${training.slug}`}
                      className="group block p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex gap-1">
                          {training.tiers.includes("free") && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0"
                            >
                              Free
                            </Badge>
                          )}
                          {training.tiers.includes("paid") && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0"
                            >
                              Paid
                            </Badge>
                          )}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {training.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                        <Clock className="w-3 h-3" />
                        {training.duration}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Zum Training <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-10 text-center">
                <Link
                  to="/trainings"
                  className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
                >
                  Alle Trainings ansehen <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Trust Section */}
        <TrustBadge />

        {/* -----------------------------------------------------------
         *  FAQ-SEKTION
         * ----------------------------------------------------------- */}
        {workshop.faqs.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-3">
                    Häufig gestellte Fragen
                  </h2>
                  <p className="text-muted-foreground">
                    Antworten auf die wichtigsten Fragen zu diesem Format
                  </p>
                </div>
                <div className="space-y-4">
                  {workshop.faqs.map((faq, idx) => (
                    <Card
                      key={idx}
                      className="border-l-4 border-l-primary/50 hover:border-l-primary transition-colors"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 pl-12">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WorkshopDetail;
