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
    description: "Maßgeschneiderte Trainingskonzepte für Büroangestellte, Wissensarbeiter, Teams und Führungskräfte. Wir holen jeden Teilnehmer auf seinem Kenntnisstand ab und führen strukturiert zum gewünschten Zielniveau. Zielgruppe sind wissensintensive Organisationen mit 20–5.000 Mitarbeitenden im DACH-Raum."
  },
  {
    icon: Award,
    title: "Über ein Jahrzehnt Erfahrung",
    description: "Die copilotenschule.de ist eine Marke der 2011 gegründeten Yellow-Boat Consulting. Seit über einem Jahrzehnt realisieren wir Agile Trainings und Digitalisierungsprojekte in Konzernen und im Mittelstand. Seit 2023 liegt ein starker Fokus auf praxisnahen Copilot-Anwendertrainings für Microsoft 365 Copilot und GitHub Copilot."
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
          <h2 className="text-4xl font-bold mb-4 animate-slide-up">
            Warum die Copilotenschule die beste Partnerin zur Einführung des Microsoft Copiloten ist
          </h2>
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
      </div>
    </section>
  );
};

export default Benefits;