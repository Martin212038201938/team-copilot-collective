import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrainerContactForm from "@/components/TrainerContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Building2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const trainerPaths = [
  {
    id: "praktiker",
    icon: GraduationCap,
    title: "KI-Praktiker ohne Trainer-Erfahrung",
    subtitle: "Wir machen dich zum Trainer",
    description: "Du bist erfahren in der praktischen Anwendung von KI im Microsoft-Umfeld, hast aber noch keine Trainer-Erfahrung?",
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
    description: "Du bist bereits ein erfahrener KI-Trainer und möchtest dich auf das Training konzentrieren?",
    benefits: [
      "Wir übernehmen die Kundenakquise",
      "Organisation und Eventmanagement",
      "Location- und Verpflegungsorganisation",
      "Kommunikation mit Teilnehmern",
      "Komplette Abrechnung und Administration",
      "Du fokussierst auf exzellente Trainings"
    ],
    highlight: "Attraktive Konditionen - volle Unterstützung",
    color: "from-green-500/10 to-green-600/10"
  },
  {
    id: "festanstellung",
    icon: Building2,
    title: "Festanstellung als KI-Trainer",
    subtitle: "Vollzeit / Teilzeit",
    description: "Du suchst eine langfristige Perspektive als festangestellter KI-Trainer?",
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
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Join Our Team
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-6">
                Trainer werden bei copilotenschule.de
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Werde Teil unseres Teams und bringe deine KI-Expertise in die
                Unternehmen. Wir suchen praxiserfahrene KI-Umsetzer, die ihr Wissen
                weitergeben möchten – mit und ohne Trainer-Erfahrung.
              </p>
            </div>
          </div>
        </section>

        {/* Three Paths Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Drei Wege zu uns
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Wähle den Weg, der zu deiner aktuellen Situation und deinen Zielen passt
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {trainerPaths.map((path, index) => {
                const Icon = path.icon;
                return (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className={`bg-gradient-to-br ${path.color} p-8 text-center border-b`}>
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                      <p className="text-sm font-semibold text-primary">{path.subtitle}</p>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <p className="text-muted-foreground mb-6">
                        {path.description}
                      </p>
                      <div className="space-y-3 mb-6 flex-grow">
                        {path.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-4 text-center mb-4 shadow-md">
                        <p className="text-sm font-bold text-primary-foreground">
                          {path.highlight}
                        </p>
                      </div>
                      <Button
                        onClick={path.id === "festanstellung" ? () => setShowJobDescription(!showJobDescription) : scrollToForm}
                        className="w-full"
                      >
                        {path.id === "festanstellung" ? "Stellenbeschreibung lesen" : "Kontakt aufnehmen"}
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
                        copilotenschule.de ist spezialisiert auf praxisorientierte Microsoft Copilot Trainings
                        für Unternehmen. Wir helfen Teams dabei, KI-Tools erfolgreich in ihren Arbeitsalltag zu
                        integrieren – mit 80% praktischen Übungen und echten Use Cases.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">Deine Aufgaben</h3>
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
                      <h3 className="text-xl font-bold mb-3">Dein Profil</h3>
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
                Egal für welchen Weg du dich entscheidest – wir freuen uns auf deine Bewerbung
                und den Austausch mit dir!
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
