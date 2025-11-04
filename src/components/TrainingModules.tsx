import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Users, TrendingUp, Shield, Clock, Laptop } from "lucide-react";

const modules = [
  {
    icon: Brain,
    title: "KI Basistraining",
    duration: "1 Tag",
    description: "Grundlagen der KI und praktischer Einstieg in Microsoft 365 Copilot und ChatGPT für Ihr gesamtes Team.",
    features: [
      "Grundlagen der KI verstehen",
      "Erste Schritte mit Copilot",
      "Praktische Übungen für den Alltag",
      "Effizienzsteigerung im Büro"
    ]
  },
  {
    icon: TrendingUp,
    title: "Strategie Workshop",
    duration: "2 Tage",
    description: "Entwickeln Sie eine klare KI-Vision für Ihr Unternehmen und gestalten Sie Ihre digitale Zukunft aktiv.",
    features: [
      "Möglichkeiten der KI kennenlernen",
      "Zieldefinition für Ihr Unternehmen",
      "Prozessanalyse und Optimierung",
      "Konkreter Umsetzungsfahrplan"
    ]
  },
  {
    icon: Shield,
    title: "EU AI Act Compliance",
    duration: "4-8 Stunden",
    description: "Rechtssichere Nutzung von KI-Tools. Ab Februar 2025 verpflichtend für alle Unternehmen in der EU.",
    features: [
      "Überblick EU KI-Verordnung",
      "Rechtliche Anforderungen",
      "Risikominderung und Compliance",
      "Praktische Umsetzung"
    ]
  },
  {
    icon: Users,
    title: "Team-Training Advanced",
    duration: "2 Tage",
    description: "Vertiefte Schulung für Power-User und Teams, die das Maximum aus Microsoft Copilot herausholen wollen.",
    features: [
      "Fortgeschrittene Prompting-Techniken",
      "Integration in Workflows",
      "Automation und Effizienz",
      "Best Practices aus der Praxis"
    ]
  },
  {
    icon: Laptop,
    title: "Remote-Führung mit KI",
    duration: "1 Tag",
    description: "Workshops für Führungskräfte in hybriden und remote Teams mit KI-Unterstützung.",
    features: [
      "Digitale Führungskompetenz",
      "KI-Tools für Team-Management",
      "Produktivität im Home-Office",
      "Change-Management"
    ]
  },
  {
    icon: Clock,
    title: "Agile & Scrum mit KI",
    duration: "2-3 Tage",
    description: "Agile Methoden und KI optimal kombinieren für maximale Team-Effizienz.",
    features: [
      "Scrum Master Training",
      "Product Owner Ausbildung",
      "KI in agilen Prozessen",
      "Praxisnahe Umsetzung"
    ]
  }
];

const TrainingModules = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="trainings" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Unser Angebot
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Inhouse-Trainings für Ihr Unternehmen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Alle Trainings werden individuell auf Ihre Bedürfnisse zugeschnitten und 
            bei Ihnen vor Ort oder remote durchgeführt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{module.description}</p>
                  <ul className="space-y-2">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4" onClick={scrollToContact}>
                    Training anfragen
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Individuelle Trainings-Kombinationen und maßgeschneiderte Programme möglich
          </p>
          <Button size="lg" onClick={scrollToContact}>
            Individuelle Anfrage stellen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrainingModules;