import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users, Zap, Shield, Award } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Fokus auf reale Büro-Workflows",
    description: "Der sichere und leistungsstarke Copilot, mit dem Sie Dinge tun können, die bisher nicht möglich waren – und der Ihnen Arbeit abnimmt, auf die Sie keine Lust haben. Keine Tool-Demos von Anwendungen, die in Ihrem Unternehmen gar nicht freigegeben sind, sondern konsequenter Fokus auf Ihre realen Arbeitsprozesse."
  },
  {
    icon: Shield,
    title: "Tiefe Microsoft Copilot Expertise",
    description: "Herstellernahe Expertise zu Microsoft Copilot mit klarem Fokus auf Adoption und Nutzungsreife. Wir befähigen Ihre Mitarbeiter, Microsoft Copilot compliant, sicher und hoch effizient in der täglichen Arbeit zu nutzen. Alle Lösungen sind DSGVO-konform und entsprechen höchsten Sicherheitsstandards."
  },
  {
    icon: Lightbulb,
    title: "Training, Coaching & Organisationsperspektive",
    description: "Kombination aus Training, Coaching und ganzheitlicher Organisationsperspektive. Wir begleiten Copilot-Rollouts inklusive Governance, Use-Case-Definition und Adoption. Individuelle Begleitung von Führungskräften, Produkt- und Transformationsteams zur Etablierung nachhaltiger, Copilot-gestützter Arbeitsweisen."
  },
  {
    icon: Zap,
    title: "Praxisorientierter Trainingsansatz",
    description: "Unser praxisorientierter Trainingsansatz verbindet reale Arbeitsprozesse mit direkt anwendbaren Workflows. Jeder Teilnehmer verlässt das Training mit fertigen, getesteten Workflows und Prompts. Die erlernten Techniken können ab dem nächsten Arbeitstag produktiv eingesetzt werden."
  },
  {
    icon: Users,
    title: "Für Wissensarbeiter, Teams & Organisationen",
    description: "Maßgeschneiderte Trainingskonzepte für Büroangestellte, Wissensarbeiter, Teams und Führungskräfte. Wir holen jeden Teilnehmer auf seinem Kenntnisstand ab und führen strukturiert zum gewünschten Zielniveau. Zielgruppe sind wissensintensive Organisationen mit 50–10.000 Mitarbeitenden im DACH-Raum."
  },
  {
    icon: Award,
    title: "Über ein Jahrzehnt Erfahrung",
    description: "Die copilotenschule.de ist eine Marke der 2011 gegründeten Yellow-Boat Consulting. Seit über einem Jahrzehnt realisieren wir Agile Trainings und Digitalisierungsprojekte in Konzernen und im Mittelstand. Seit 2023 liegt ein starker Fokus auf praxisnahen Copilot-Anwendertrainings."
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="px-4 py-2 bg-gradient-to-r from-accent/90 to-primary/80 text-white rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform duration-300 inline-block">
            Unsere Alleinstellungsmerkmale
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 animate-slide-up">
            Warum copilotenschule.de der richtige Partner für Ihr Unternehmen ist
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-fade-in-delayed">
            Wir positionieren uns als praxisfokussierter Qualitätsanbieter mit tiefem Verständnis für reale Büroarbeit
            und Organisationskontexte. Gegenüber generischen Kursanbietern differenzieren wir uns durch konsequente
            Praxisorientierung und konkrete Workflow-Integration.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-delayed-2">
            Unsere Mission: Büroarbeit durch den gezielten Einsatz von Microsoft Copilot messbar produktiver,
            wirksamer und menschlicher zu machen. Das Ergebnis: Ihre Teams setzen KI produktiv ein – sicher,
            DSGVO-konform und mit direktem Mehrwert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="group p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in relative overflow-hidden bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            );
          })}
        </div>

        <div className="mt-16 relative animate-fade-in-delayed-3">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 text-center border border-border/50 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Unsere Vision: Copilot als selbstverständliches Teammitglied
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              Unsere Vision ist eine Arbeitswelt, in der Microsoft Copilot als selbstverständliches Teammitglied
              genutzt wird und Menschen sich auf wertschöpfende, kreative und strategische Arbeit konzentrieren können.
              Jedes Training wird präzise auf Ihre Unternehmenssituation, Branche und spezifischen Ziele zugeschnitten.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Wir begleiten Copilot-Rollouts inklusive Governance, Use-Case-Definition und Adoption.
              Nach dem Training bieten wir Coaching und kontinuierlichen Support für Führungskräfte,
              Produkt- und Transformationsteams zur Etablierung nachhaltiger, Copilot-gestützter Arbeitsweisen.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {[
                { icon: "✓", text: "Vor Ort oder Remote" },
                { icon: "✓", text: "Flexible Termine" },
                { icon: "✓", text: "Individueller Zuschnitt" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-default"
                >
                  <span className="text-primary text-2xl group-hover:scale-125 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;