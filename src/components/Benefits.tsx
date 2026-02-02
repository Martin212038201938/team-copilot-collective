import {
  PlaneTakeoff,
  Radar,
  Headset,
  Gauge,
  UsersRound,
  Medal,
  ChevronDown
} from "lucide-react";

const benefits = [
  {
    icon: PlaneTakeoff,
    title: "Fokus auf reale Büro-Workflows",
    description: "Der sichere und leistungsstarke Copilot, mit dem Sie Dinge tun können, die bisher nicht möglich waren – und der Ihnen Arbeit abnimmt, auf die Sie keine Lust haben. Keine Tool-Demos von Anwendungen, die in Ihrem Unternehmen gar nicht freigegeben sind, sondern konsequenter Fokus auf Ihre realen Arbeitsprozesse."
  },
  {
    icon: Radar,
    title: "Tiefe Microsoft Copilot Expertise",
    description: "Herstellernahe Expertise zu Microsoft Copilot mit klarem Fokus auf Adoption und Nutzungsreife. Wir befähigen Ihre Mitarbeiter, Microsoft Copilot compliant, sicher und hoch effizient in der täglichen Arbeit zu nutzen. Alle Lösungen sind DSGVO-konform und entsprechen höchsten Sicherheitsstandards."
  },
  {
    icon: Headset,
    title: "Training, Coaching & Organisationsperspektive",
    description: "Kombination aus Training, Coaching und ganzheitlicher Organisationsperspektive. Wir begleiten Copilot-Rollouts inklusive Governance, Use-Case-Definition und Adoption. Individuelle Begleitung von Führungskräften, Produkt- und Transformationsteams zur Etablierung nachhaltiger, Copilot-gestützter Arbeitsweisen."
  },
  {
    icon: Gauge,
    title: "Praxisorientierter Trainingsansatz",
    description: "Unser praxisorientierter Trainingsansatz verbindet reale Arbeitsprozesse mit direkt anwendbaren Workflows. Jeder Teilnehmer verlässt das Training mit fertigen, getesteten Workflows und Prompts. Die erlernten Techniken können ab dem nächsten Arbeitstag produktiv eingesetzt werden."
  },
  {
    icon: UsersRound,
    title: "Für Wissensarbeiter, Teams & Organisationen",
    description: "Maßgeschneiderte Trainingskonzepte für Büroangestellte, Wissensarbeiter, Teams und Führungskräfte. Wir holen jeden Teilnehmer auf seinem Kenntnisstand ab und führen strukturiert zum gewünschten Zielniveau. Zielgruppe sind wissensintensive Organisationen mit 20–5.000 Mitarbeitenden im DACH-Raum."
  },
  {
    icon: Medal,
    title: "Über ein Jahrzehnt Erfahrung",
    description: "Die copilotenschule.de ist eine Marke der 2011 gegründeten Yellow-Boat Consulting. Seit über einem Jahrzehnt realisieren wir Agile Trainings und Digitalisierungsprojekte in Konzernen und im Mittelstand. Seit 2023 liegt ein starker Fokus auf praxisnahen Copilot-Anwendertrainings für Microsoft 365 Copilot und GitHub Copilot."
  }
];

// SEO-freundliche expandierbare Benefit-Karte
// Verwendet natives <details>-Element für beste Crawler-Kompatibilität
const ExpandableCard = ({ icon: Icon, title, description, index }: {
  icon: typeof PlaneTakeoff;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <details
      className="group rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <summary className="flex items-center gap-4 p-6 cursor-pointer list-none hover:bg-primary/5 transition-colors">
        {/* Icon */}
        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-xl flex items-center justify-center shadow-lg border border-primary/20 flex-shrink-0">
          <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
        </div>

        {/* Title + Chevron */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground leading-tight pr-2">
            {title}
          </h3>
        </div>

        {/* Expand indicator */}
        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>

      {/* Description - immer im DOM, für SEO sichtbar */}
      <div className="px-6 pb-6 pt-2 border-t border-primary/10">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </details>
  );
};

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <ExpandableCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* CSS für details/summary Styling */}
      <style>{`
        details summary::-webkit-details-marker {
          display: none;
        }
        details summary::marker {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Benefits;