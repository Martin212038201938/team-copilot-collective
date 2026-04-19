/**
 * Workshops-Landingpage: "Copilot Workshops und Events"
 *
 * Struktur (GEO-optimiert):
 *  - Hero mit H1 "Copilot Workshops und Events"
 *  - Erklärung: Unterschied zu Trainings + Cross-Link
 *  - Featured: Change Programm Copilot Einführung oben hervorgehoben
 *  - Filter nach WorkshopType (Change-Programm | Workshops | Events | Keynotes | Alle)
 *  - Karten-Grid (7 Einträge)
 *  - Meta-FAQs aus Entscheider-Perspektive
 *  - Zweistufige CTA: Kalender prominent + Kontakt als Alternative
 *  - Cross-Link zurück zu /trainings
 */

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ChevronDown,
  ArrowRight,
  Users,
  Calendar as CalendarIcon,
  MessageSquare,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import {
  workshops,
  WORKSHOP_TYPE_LABELS,
  WORKSHOP_TYPE_ORDER,
  type WorkshopType,
} from "@/data/workshops";
import { generateWorkshopsOverviewSchema } from "@/lib/workshopSchema";

// -----------------------------------------------------------------
// Meta-FAQs – kundenorientiert, aus Entscheider-Perspektive
// -----------------------------------------------------------------
const workshopsFAQs = [
  {
    question:
      "Was ist der Unterschied zwischen einem Training und einem Workshop bei der Copilotenschule?",
    answer:
      "Trainings sind strukturierte Lernformate, in denen Ihre Teams konkrete Copilot-Kompetenzen aufbauen – vom Prompt-Design bis zur Praxisanwendung in Word, Excel und Teams. Workshops, Events und Keynotes hingegen sind orchestrierte Formate zur Entscheidungsvorbereitung, Strategieentwicklung und kulturellen Verankerung: Strategie-Workshops, Chatbot-Hackathons, Launch-Events oder Keynotes für Führungskräfte. Wer seine Organisation auf Copilot ausrichten will, braucht oft beides – die Copilotenschule berät Sie gerne zur passenden Kombination.",
  },
  {
    question:
      "Welche Veranstaltung ist richtig für unseren Copilot-Launch?",
    answer:
      "Wenn Sie Copilot neu einführen oder skalieren, hängt die richtige Veranstaltung vom Ziel ab. Für Entscheidungsvorbereitung und Roadmap: Copilot Strategie & Change Management Workshop. Für einen sichtbaren Start mit Sogwirkung: Copilot Launch Eventtag. Für Inspiration und Führungskräfte-Alignment: Keynote Copilot & Arbeitswelt. Für schnelle, greifbare Ergebnisse im Fachbereich: Chatbot-Workshop oder Copilot Hackathon. Für den Rundum-Rollout mit Kommunikation und Materialien: das Change Programm Copilot Einführung. Die Copilotenschule unterstützt Sie dabei, die passende Sequenz zusammenzustellen.",
  },
  {
    question:
      "Wir haben Lizenzen, aber die Nutzung bleibt hinter den Erwartungen zurück – was hilft wirklich?",
    answer:
      "Das ist das häufigste Muster: Lizenzen sind gekauft, aber Nutzung und Wirkung bleiben aus. Einzelne Schulungen reichen meist nicht – gebraucht wird eine Kombination aus sichtbarem Launch, Change-Kommunikation, Champions und laufender Befähigung. Genau dafür ist das Change Programm Copilot Einführung der Copilotenschule konzipiert. Es orchestriert Strategie, Events, Materialien, Kommunikation und Adoption-Messung zu einem Gesamtprogramm, das die Investition in Copilot-Lizenzen in gelebte Nutzung übersetzt.",
  },
  {
    question:
      "Wie binden wir den Betriebsrat frühzeitig und konstruktiv ein?",
    answer:
      "Der Betriebsrat ist kein Blocker, sondern ein notwendiger Partner für eine vertrauenswürdige KI-Einführung. Die Copilotenschule bietet mit dem Betriebsrat-KI-Workshop ein neutrales Format, das Mitbestimmungsfragen, Datenschutz, Leistungsüberwachung und Mitarbeiterrechte praxisnah adressiert. Ergebnis: ein tragfähiger Rahmen für Betriebsvereinbarungen oder eine gemeinsame Gesprächsgrundlage. Früh einbinden ist deutlich schneller und kostengünstiger als späte Eskalation.",
  },
  {
    question:
      "Wie sind Workshops, Events und Keynotes der Copilotenschule organisiert – Inhouse, online oder hybrid?",
    answer:
      "Alle Formate werden als Inhouse-Veranstaltung, Remote-Workshop via Microsoft Teams oder hybrid (Kernteam vor Ort, weitere Teilnehmende zugeschaltet) angeboten. Keynotes werden auf Wunsch auch live auf Ihrer Konferenz oder bei Führungskräfte-Klausuren gehalten. Change-Programme sind typischerweise hybrid angelegt, weil Launch-Events ihre volle Wirkung oft im Saal entfalten, während Kommunikation und Champions-Arbeit digital skaliert.",
  },
  {
    question:
      "Wie messen wir den Erfolg eines Workshops oder Events?",
    answer:
      "Jedes Format der Copilotenschule liefert konkrete Deliverables: Strategie-Dokumente, Roadmaps, lauffähige Chatbots, Event-Materialien oder Champions-Playbooks. Zusätzlich wird Wirkung über definierte KPIs gemessen – abhängig vom Format: Nutzungsquote, Qualitätsfeedback, identifizierte und priorisierte Use Cases, Adoption-Wellen. Bei Change-Programmen ist ein KPI- und Adoption-Dashboard Teil des Lieferumfangs. So wird aus dem Event nicht ein einmaliges Feuerwerk, sondern eine belastbare Grundlage für die nächsten Schritte.",
  },
];

// -----------------------------------------------------------------
// UI-Helpers
// -----------------------------------------------------------------
type TypeFilter = WorkshopType | "all";

const typeFilterOptions: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "Alle Formate" },
  ...WORKSHOP_TYPE_ORDER.map((t) => ({
    value: t as TypeFilter,
    label: WORKSHOP_TYPE_LABELS[t] + (t === "change-program" ? "e" : t === "workshop" || t === "event" || t === "keynote" ? "s" : ""),
  })),
];

// Saubere Labels für die Typ-Badge auf der Karte
const TYPE_BADGE_CLASS: Record<WorkshopType, string> = {
  "change-program":
    "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border-amber-300",
  workshop: "bg-indigo-100 text-indigo-700 border-indigo-200",
  event: "bg-purple-100 text-purple-700 border-purple-200",
  keynote: "bg-rose-100 text-rose-700 border-rose-200",
};

const Workshops = () => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredWorkshops =
    typeFilter === "all"
      ? workshops
      : workshops.filter((w) => w.type === typeFilter);

  // Featured (Change Programm) immer hervorheben, aber nicht doppelt rendern
  const featured = workshops.find((w) => w.featured);
  const nonFeatured =
    typeFilter === "all"
      ? filteredWorkshops.filter((w) => !w.featured)
      : filteredWorkshops;

  const schema = generateWorkshopsOverviewSchema(
    {
      title: "Copilot Workshops und Events",
      description:
        "Workshops, Events, Keynotes und das Change Programm Copilot Einführung – orchestrierte Formate für Strategie, Launch, Kommunikation und Adoption von Microsoft Copilot.",
      faqs: workshopsFAQs,
    },
    workshops
  );

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Copilot Workshops und Events"
        description="Copilot Workshops und Events: Strategie-Workshops, Hackathons, Keynotes, Launch-Events und das Change Programm Copilot Einführung. Orchestrierte Formate für erfolgreiche Microsoft Copilot Einführungen."
        keywords={[
          "Copilot Workshop",
          "Copilot Event",
          "Copilot Keynote",
          "Copilot Change Programm",
          "Microsoft Copilot Einführung",
          "Copilot Launch Event",
          "Copilot Strategie Workshop",
          "Copilot Hackathon",
          "Chatbot Workshop",
          "Betriebsrat KI Workshop",
          "Copilot Rollout",
          "Copilot Adoption",
          "Copilot Change Management",
        ]}
        canonicalUrl="https://copilotenschule.de/workshops"
        schema={schema}
      />
      <Header />

      <main className="pt-24">
        {/* -----------------------------------------------------------
         *  HERO
         * ----------------------------------------------------------- */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
                Copilot Workshops und Events
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                Orchestrierte Formate für die Microsoft-Copilot-Einführung: Strategie-Workshops, Chatbot-Hackathons, Keynotes, Launch-Events und das komplette Change-Programm – für Entscheider, Change-Verantwortliche und Fachbereiche.
              </p>
              <p className="mt-3 text-base text-muted-foreground max-w-3xl mx-auto">
                Anders als <Link to="/trainings" className="text-primary hover:underline font-medium">Trainings</Link>, die einzelne Teams auf konkrete Copilot-Kompetenzen bringen, begleiten diese Formate strategische Entscheidungen, kulturelle Verankerung und sichtbare Rollouts.
              </p>
            </div>

            {/* -------------------------------------------------------
             *  FEATURED: Change Programm
             * ------------------------------------------------------- */}
            {featured && typeFilter === "all" && (
              <div className="max-w-5xl mx-auto mb-14">
                <Link to={`/workshops/${featured.slug}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className="bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-100 text-xs px-2 py-0.5 font-semibold">
                            ★ Flaggschiff-Programm
                          </Badge>
                          <Badge className={`${TYPE_BADGE_CLASS["change-program"]} hover:bg-amber-100 text-xs px-2 py-0.5`}>
                            Change-Programm
                          </Badge>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {featured.title}
                        </h2>
                        {featured.subtitle && (
                          <p className="text-base md:text-lg text-muted-foreground mb-4">
                            {featured.subtitle}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {featured.duration}
                          </span>
                          {featured.participants && (
                            <span className="flex items-center gap-1.5">
                              <Users className="w-4 h-4" /> {featured.participants}
                            </span>
                          )}
                        </div>
                        <p className="text-base text-foreground/80 mb-4">
                          {featured.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-primary font-medium group-hover:underline">
                          Details zum Change-Programm <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* -------------------------------------------------------
             *  TYP-FILTER
             * ------------------------------------------------------- */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-muted/60 rounded-lg border">
                {typeFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTypeFilter(option.value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      typeFilter === option.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------
             *  KARTEN-GRID
             * ------------------------------------------------------- */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonFeatured.map((w) => {
                const typeLabel = WORKSHOP_TYPE_LABELS[w.type];
                return (
                  <Link
                    key={w.slug}
                    to={`/workshops/${w.slug}`}
                    className="block group"
                  >
                    <Card
                      className={`h-full min-h-[300px] flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm ${
                        w.popular ? "border-amber-300 shadow-md ring-1 ring-amber-200/50" : ""
                      }`}
                    >
                      <CardHeader className="flex-1 py-4">
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                          <Badge
                            className={`${TYPE_BADGE_CLASS[w.type]} hover:opacity-100 text-[11px] px-2 py-0.5 font-medium`}
                          >
                            {typeLabel}
                          </Badge>
                          {w.popular && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-100 text-[11px] px-2 py-0.5 font-semibold">
                              ★ Häufig gebucht
                            </Badge>
                          )}
                        </div>

                        <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-3 mb-1">
                          {w.title}
                        </CardTitle>

                        <CardDescription className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {w.duration}
                          </span>
                          {w.participants && (
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" /> {w.participants}
                            </span>
                          )}
                        </CardDescription>

                        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                          {w.description}
                        </p>

                        <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary group-hover:underline">
                          Mehr erfahren <ArrowRight className="w-3 h-3" />
                        </span>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Cross-Link zurück zu Trainings */}
            <div className="mt-12 max-w-3xl mx-auto text-center">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-2 text-primary">
                  <GraduationCap className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Suchen Sie stattdessen ein Training?</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Wenn Sie Ihre Teams gezielt auf konkrete Copilot-Kompetenzen bringen möchten, finden Sie bei uns Trainings für M365 Copilot, GitHub Copilot, Copilot Studio, Compliance und mehr.
                </p>
                <Link
                  to="/trainings"
                  className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
                >
                  Zu den Trainings <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------
         *  ZWEISTUFIGE CTA
         *  Kalender prominent + Kontakt als Alternative
         * ----------------------------------------------------------- */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bereit für den nächsten Schritt?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Im kurzen Erstgespräch klären wir gemeinsam, welches Format zu Ihrem Reifegrad und Ihren Zielen passt – kostenfrei und unverbindlich.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Prominente Kalender-Card (2 Spalten) */}
                <div className="md:col-span-2">
                  <div className="relative h-full rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        <Sparkles className="w-3.5 h-3.5" /> Empfohlen
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        Direkt 15-Minuten-Termin buchen
                      </h3>
                      <p className="text-primary-foreground/90 mb-6 text-base max-w-xl">
                        Klicken, Zeitfenster wählen, fertig. Sie sprechen direkt mit Martin Lang – ohne Formular, ohne Umweg. Wir besprechen, welcher Workshop oder welches Event für Ihre Organisation am meisten Wirkung entfaltet.
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
                          Termin im Kalender buchen →
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Alternative Kontakt-Card (1 Spalte) */}
                <div className="md:col-span-1">
                  <div className="h-full rounded-2xl bg-card border-2 border-border p-8 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">
                      Lieber schriftlich?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                      Schreiben Sie uns kurz, welches Thema Sie beschäftigt. Wir melden uns innerhalb eines Werktags mit einem konkreten Vorschlag.
                    </p>

                    <div className="space-y-3">
                      <a
                        href="https://teams.microsoft.com/l/chat/0/0?users=martin@yellow-boat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Teams-Chat starten
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
         *  FAQ-SEKTION
         * ----------------------------------------------------------- */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Häufige Fragen zu Workshops und Events
            </h2>
            <div className="space-y-3">
              {workshopsFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                    aria-expanded={openFAQ === index}
                  >
                    <span className="font-medium text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Workshops;
