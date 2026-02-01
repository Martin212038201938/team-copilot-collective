import {
  PlaneTakeoff,
  Radar,
  Headset,
  Gauge,
  UsersRound,
  Medal
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

// Flip Card Component
const FlipCard = ({ icon: Icon, title, description, index }: {
  icon: typeof PlaneTakeoff;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div
      className="group perspective-1000 h-52 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
        {/* Front Side - Icon + Title */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl flex flex-col items-center justify-center p-6 text-center">
          {/* Icon Container - fades out on flip */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-xl flex items-center justify-center mb-4 shadow-lg border border-primary/20 relative overflow-hidden transition-opacity duration-300 group-hover:opacity-0">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
            <Icon className="w-8 h-8 text-primary relative z-10" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground leading-tight px-2">
            {title}
          </h3>

        </div>

        {/* Back Side - Description */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-primary/10 via-card to-accent/10 shadow-xl flex flex-col p-4">
          {/* Header */}
          <div className="mb-2 pb-2 border-b border-primary/20">
            <h3 className="text-base font-semibold text-primary line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-xs leading-relaxed flex-1 overflow-y-auto">
            {description}
          </p>

          {/* Decorative corner */}
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-accent/20 to-transparent rounded-tl-3xl" />
        </div>
      </div>
    </div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <FlipCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for 3D flip effect */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Benefits;