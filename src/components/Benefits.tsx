import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users, Zap, Shield, Award } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Nur Microsoft Copilot",
    description: "Keine externen Tools, die in Ihrem Unternehmen nicht erlaubt sind. Wir fokussieren uns auf Microsoft 365 Copilot, GitHub Copilot und weitere MS-eigene KI-Tools – compliant und sicher."
  },
  {
    icon: Target,
    title: "80% Praxis, 20% Theorie",
    description: "Keine PowerPoint-Schlacht. Wir arbeiten direkt in den Tools mit echten Szenarien aus Ihrem Arbeitsalltag: E-Mails, Dokumente, Code, Meetings."
  },
  {
    icon: Lightbulb,
    title: "Reale Use Cases",
    description: "Sie üben mit konkreten Aufgaben: Reports erstellen, Code generieren, Meetings zusammenfassen, Daten analysieren – alles, was Sie morgen brauchen."
  },
  {
    icon: Zap,
    title: "Hands-on Training",
    description: "Jeder Teilnehmer arbeitet aktiv mit. Learning by doing statt passivem Zuhören. Sie verlassen das Training mit fertigen Prompts und Workflows."
  },
  {
    icon: Users,
    title: "Teamorientiert",
    description: "Maßgeschneidert auf Ihre Teams und Abteilungen. Wir holen jeden dort ab, wo er steht – vom Einsteiger bis zum Power User."
  },
  {
    icon: Award,
    title: "Praxiserprobte Expertise",
    description: "15+ Jahre Erfahrung in Microsoft-Umgebungen, Cloud, Entwicklung und Change. Wir kennen Ihre Herausforderungen aus der Praxis."
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-accent/90 text-accent-foreground rounded-full text-sm font-medium">
            Unser USP
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Microsoft-fokussiert. Praxisnah. Messbar.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kein Tool-Wirrwarr mit unsicheren Drittanbietern. Wir trainieren ausschließlich 
            Microsoft Copilot-Lösungen – mit viel Übung, echten Use Cases und sofort umsetzbaren Ergebnissen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Maßgeschneidert für Ihr Unternehmen
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Jedes Training wird individuell auf Ihre Unternehmenssituation, Ihre Ziele und 
            den Kenntnisstand Ihrer Mitarbeiter zugeschnitten. Wir holen Ihr Team genau dort ab, 
            wo es steht, und bringen es auf das nächste Level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <span className="text-primary text-2xl">✓</span>
              <span>Vor Ort oder Remote</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-2xl">✓</span>
              <span>Flexible Termine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-2xl">✓</span>
              <span>Individueller Zuschnitt</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;