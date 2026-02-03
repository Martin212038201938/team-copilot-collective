import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrainerContactForm from "@/components/TrainerContactForm";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Building2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const trainerPaths = [
  {
    id: "praktiker",
    icon: GraduationCap,
    title: "KI-Praktiker ohne Trainer-Erfahrung",
    subtitle: "Wir bilden Sie zum Trainer aus",
    description: "Sie sind erfahren in der praktischen Anwendung von KI im Microsoft-Umfeld, haben aber noch keine Trainer-Erfahrung?",
    benefits: [
      "Kostenfreie Ausbildung zum KI-Trainer",
      "Bereitstellung aller Kursmaterialien",
      "Enge Begleitung und Mentoring",
      "Praktische Train-the-Trainer Sessions",
      "Keine Exklusivitätsvereinbarung",
      "Flexible Zusammenarbeit ohne Bindung"
    ],
    highlight: "100% kostenfrei - ohne Exklusivität",
    color: "from-blue-500/10 to-blue-600/10"
  },
  {
    id: "trainer",
    icon: Briefcase,
    title: "Erfahrener KI-Trainer",
    subtitle: "Attraktives Freelancer-Modell",
    description: "Sie sind bereits ein erfahrener KI-Trainer und möchten sich auf das Training konzentrieren?",
    benefits: [
      "Wir übernehmen die Kundenakquise",
      "Organisation und Eventmanagement",
      "Location- und Verpflegungsorganisation",
      "Kommunikation mit Teilnehmern",
      "Komplette Abrechnung und Administration",
      "Sie fokussieren sich auf exzellente Trainings"
    ],
    highlight: "Attraktive Konditionen - volle Unterstützung",
    color: "from-green-500/10 to-green-600/10"
  },
  {
    id: "festanstellung",
    icon: Building2,
    title: "Festanstellung als KI-Trainer",
    subtitle: "Vollzeit / Teilzeit",
    description: "Sie suchen eine langfristige Perspektive als festangestellter KI-Trainer?",
    benefits: [
      "Unbefristeter Arbeitsvertrag",
      "Attraktives Gehaltspaket",
      "Flexible Arbeitszeiten und Home-Office",
      "Weiterbildungsbudget und Zertifizierungen",
      "Moderne Arbeitsausstattung",
      "Gestaltungsspielraum und Entwicklungschancen"
    ],
    highlight: "Langfristige Perspektive - starkes Team",
    color: "from-purple-500/10 to-purple-600/10"
  }
];

const BecomeTrainer = () => {
  const [showJobDescription, setShowJobDescription] = useState(false);

  const scrollToForm = () => {
    const element = document.getElementById("bewerbung");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Trainer werden bei copilotenschule.de"
        description="Werden Sie Teil unseres Trainer-Netzwerks für Microsoft Copilot Schulungen. Drei Wege zum Trainer: KI-Praktiker, erfahrene Trainer oder Unternehmen."
        canonicalUrl="https://copilotenschule.de/trainer-werden"
      />
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 via-accent/5 to-background relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] animate-slide-up">
                Trainer der <span className="text-primary">Copilotenschule</span> werden
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up-delayed">
                Werden Sie Teil unseres Teams und bringen Sie Ihre KI-Expertise in die
                Unternehmen. Wir suchen praxiserfahrene KI-Umsetzer, die ihr Wissen
                weitergeben möchten – mit und ohne Trainer-Erfahrung.
              </p>
            </div>
          </div>
        </section>

        {/* Three Paths Section */}
        <section className="pt-10 pb-20 bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Drei Wege zu uns
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Wählen Sie den Weg, der zu Ihrer aktuellen Situation und Ihren Zielen passt
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {trainerPaths.map((path, index) => {
                const Icon = path.icon;
                return (
                  <Card
                    key={index}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in relative"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

                    <div className={`bg-gradient-to-br ${path.color} p-8 text-center border-b relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                        <p className="text-sm font-semibold text-primary">{path.subtitle}</p>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col relative h-full">
                      <div className="flex-grow">
                        <p className="text-muted-foreground mb-6">
                          {path.description}
                        </p>
                        <div className="space-y-3 mb-6">
                          {path.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2 group/item">
                              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-lg blur opacity-75" />
                          <div className="relative bg-gradient-to-r from-primary to-primary/90 rounded-lg p-4 text-center shadow-lg">
                            <p className="text-sm font-bold text-primary-foreground">
                              {path.highlight}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={path.id === "festanstellung" ? () => setShowJobDescription(!showJobDescription) : scrollToForm}
                        className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 mt-auto"
                      >
                        <span className="relative z-10">
                          {path.id === "festanstellung" ? "Stellenbeschreibung lesen" : "Kontakt aufnehmen"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Job Description Section for Festanstellung - Collapsible */}
        {showJobDescription && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">KI-Trainer (m/w/d)</h2>
                        <p className="text-muted-foreground">Vollzeit / Teilzeit • Deutschlandweit • Remote möglich</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowJobDescription(false)}
                    >
                      <ChevronUp className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3">Über uns</h3>
                      <p className="text-muted-foreground">
                        Die Copilotenschule ist spezialisiert auf die Einführung und Weiterqualifizierungen
                        im Umfeld der Microsoft Copiloten. Im Gegensatz zu anderen Anbietern bieten wir den
                        Teilnehmern keinen Bauchladen an Tools an, die in ihrem Umfeld nicht compliant oder
                        wertschöpfend sind.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">Ihre Aufgaben</h3>
                      <ul className="space-y-2">
                        {[
                          "Durchführung von praxisorientierten KI-Trainings für Microsoft 365 Copilot, GitHub Copilot und Copilot Studio",
                          "Entwicklung und Weiterentwicklung von Trainingsmaterialien und Use Cases",
                          "Individuelle Anpassung der Trainings an verschiedene Zielgruppen und Branchen",
                          "Beratung von Unternehmen zur KI-Integration und Change-Management",
                          "Aktive Mitarbeit an der Weiterentwicklung unserer Trainingsformate",
                          "Teilnahme an Netzwerkveranstaltungen und Konferenzen"
                        ].map((task, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">Ihr Profil</h3>
                      <ul className="space-y-2">
                        {[
                          "Fundierte Praxiserfahrung mit KI-Tools, insbesondere im Microsoft-Ökosystem",
                          "Erfahrung in der Durchführung von Trainings oder Workshops von Vorteil",
                          "Exzellente Kommunikationsfähigkeiten und didaktisches Geschick",
                          "Begeisterung für neue Technologien und kontinuierliches Lernen",
                          "Selbstständige, strukturierte Arbeitsweise und Reisebereitschaft",
                          "Sehr gute Deutschkenntnisse, Englischkenntnisse von Vorteil"
                        ].map((requirement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">Wir bieten</h3>
                      <ul className="space-y-2">
                        {[
                          "Attraktives Gehaltspaket mit Erfolgsbeteiligung",
                          "Flexible Arbeitszeitgestaltung und Home-Office-Möglichkeiten",
                          "Moderne technische Ausstattung",
                          "Großzügiges Weiterbildungsbudget und Microsoft-Zertifizierungen",
                          "Spannende Projekte bei führenden Unternehmen",
                          "Gestaltungsspielraum und kurze Entscheidungswege",
                          "Ein motiviertes Team mit Startup-Mentalität"
                        ].map((offer, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{offer}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <Button onClick={scrollToForm} size="lg" className="w-full">
                        Jetzt bewerben
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Contact Form Section */}
        <section id="bewerbung" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Jetzt Kontakt aufnehmen
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Egal für welchen Weg Sie sich entscheiden – wir freuen uns auf Ihre Bewerbung
                und den Austausch mit Ihnen!
              </p>
            </div>
            <TrainerContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeTrainer;
