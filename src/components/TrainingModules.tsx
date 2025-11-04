import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Users, TrendingUp, Shield, Clock, Laptop } from "lucide-react";

const modules = [
  {
    icon: Brain,
    title: "Microsoft 365 Copilot Basics",
    duration: "1 Tag",
    description: "Hands-on Training für Word, Excel, PowerPoint, Outlook & Teams Copilot. Sie arbeiten sofort mit echten Dokumenten, E-Mails und Präsentationen.",
    features: [
      "Live-Übungen in Word, Excel, PowerPoint",
      "E-Mail-Management mit Outlook Copilot",
      "Teams-Meetings zusammenfassen & protokollieren",
      "Eigene Use Cases aus Ihrem Alltag umsetzen"
    ]
  },
  {
    icon: Users,
    title: "Microsoft 365 Copilot Advanced",
    duration: "2 Tage",
    description: "Power-User Training: Komplexe Workflows, Datenanalyse mit Copilot in Excel, automatisierte Reports und fortgeschrittenes Prompting.",
    features: [
      "Komplexe Excel-Analysen & Pivot-Tabellen generieren",
      "PowerBI-Integration und Datenvisualisierung",
      "Automatisierte Workflows zwischen M365-Apps",
      "Custom Prompts für wiederkehrende Aufgaben"
    ]
  },
  {
    icon: Laptop,
    title: "GitHub Copilot für Developer",
    duration: "1 Tag",
    description: "Praktisches Training für Entwickler: Code generieren, debuggen, dokumentieren. Übungen mit echten Projekten und Code-Reviews.",
    features: [
      "Code-Generierung in VS Code live üben",
      "Debugging & Refactoring mit KI-Unterstützung",
      "Automatische Dokumentation erstellen",
      "Best Practices für effiziente Prompts"
    ]
  },
  {
    icon: Shield,
    title: "Copilot & Compliance",
    duration: "4 Stunden",
    description: "Rechtssichere Nutzung von Microsoft Copilot: DSGVO, EU AI Act, Datenschutz. Mit praktischen Checklisten für Ihr Unternehmen.",
    features: [
      "DSGVO-konforme Nutzung in der Praxis",
      "EU AI Act Anforderungen verstehen",
      "Datenschutz-Checks durchführen",
      "Compliance-Checkliste für Ihr Team"
    ]
  },
  {
    icon: TrendingUp,
    title: "Copilot Strategie Workshop",
    duration: "1 Tag",
    description: "Entwickeln Sie eine Copilot-Strategie für Ihr Unternehmen: Prozesse identifizieren, Potenziale heben, Change begleiten.",
    features: [
      "Prozessanalyse: Wo bringt Copilot Mehrwert?",
      "ROI-Berechnung und Quick Wins identifizieren",
      "Rollout-Plan für Ihr Unternehmen erstellen",
      "Change Management & Adoption sicherstellen"
    ]
  },
  {
    icon: Clock,
    title: "Custom Training",
    duration: "Individuell",
    description: "Maßgeschneiderte Trainings für Ihre spezifischen Anforderungen: Sales, Marketing, HR, Finance – mit Ihren realen Szenarien.",
    features: [
      "Abteilungsspezifische Use Cases",
      "Training mit Ihren echten Daten & Prozessen",
      "Individuelle Prompt-Bibliothek erstellen",
      "Follow-up Sessions nach Bedarf"
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
            Microsoft Copilot Trainings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Spezialisiert auf Microsoft 365 & GitHub Copilot. Jedes Training: 80% praktische Übungen 
            mit Ihren realen Use Cases. Vor Ort oder remote. Sofort anwendbar.
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

        <div className="mt-12 bg-accent/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Alle Trainings: Hands-on & praxisnah</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-accent mb-2">80%</span>
              <span className="text-muted-foreground">Praktische Übungen</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-accent mb-2">100%</span>
              <span className="text-muted-foreground">Microsoft Tools</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-accent mb-2">0%</span>
              <span className="text-muted-foreground">PowerPoint-Theorie</span>
            </div>
          </div>
          <Button size="lg" onClick={scrollToContact}>
            Jetzt unverbindlich anfragen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrainingModules;