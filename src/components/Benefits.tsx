import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users, Zap, Shield, Award } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "100% Microsoft Ökosystem - DSGVO-konform",
    description: "Wir trainieren ausschließlich Microsoft-eigene KI-Tools: Microsoft 365 Copilot, GitHub Copilot, Copilot Studio und Power Platform. Keine unsicheren Drittanbieter-Tools, die in Ihrem Unternehmen nicht zugelassen sind. Alle Lösungen sind DSGVO-konform und entsprechen höchsten Sicherheitsstandards für den Unternehmenseinsatz."
  },
  {
    icon: Target,
    title: "80% praktische Übungen, 20% Theorie",
    description: "Keine endlosen PowerPoint-Präsentationen. Wir arbeiten direkt hands-on in den Microsoft-Tools mit realen Business-Szenarien aus Ihrem Arbeitsalltag: E-Mails verfassen, Excel-Analysen erstellen, Code entwickeln, Meetings protokollieren, Workflows automatisieren. Jeder Teilnehmer übt aktiv und entwickelt sofort einsetzbare Lösungen."
  },
  {
    icon: Lightbulb,
    title: "Reale Use Cases aus Ihrem Unternehmenskontext",
    description: "Sie trainieren mit konkreten Aufgaben aus Ihrer täglichen Praxis: Management-Reports erstellen, Produktcode generieren, Customer-Service automatisieren, Datenanalysen durchführen, Projektdokumentation erstellen. Keine generischen Beispiele – Sie arbeiten mit Ihren echten Prozessen und entwickeln individuelle Prompt-Bibliotheken für Ihr Team."
  },
  {
    icon: Zap,
    title: "Learning by Doing - sofort anwendbar",
    description: "Jeder Teilnehmer arbeitet aktiv an eigenen Use Cases und verlässt das Training mit fertigen, getesteten Workflows, Prompts und Automatisierungen. Kein passives Zuhören, sondern intensive Praxisphasen mit direktem Feedback. Sie können die erlernten Techniken ab dem nächsten Arbeitstag produktiv einsetzen und messbare Zeitersparnis realisieren."
  },
  {
    icon: Users,
    title: "Maßgeschneidert auf Ihre Teams und Rollen",
    description: "Individuelle Trainingskonzepte für verschiedene Zielgruppen: Entwickler erhalten GitHub Copilot Deep-Dives, Business User lernen M365 Copilot für Produktivität, IT-Teams schulen wir in Copilot Studio und Governance. Wir holen jeden Teilnehmer auf seinem Kenntnisstand ab – vom Einsteiger bis zum Power User – und bringen Ihr gesamtes Team auf das nächste Level."
  },
  {
    icon: Award,
    title: "15+ Jahre Microsoft-Expertise und Change-Erfahrung",
    description: "Unsere Trainer verfügen über langjährige Praxiserfahrung in Microsoft-Technologien, Cloud-Architektur, Softwareentwicklung und Change Management. Wir haben hunderte Teams erfolgreich geschult und kennen die typischen Herausforderungen bei der KI-Einführung. Sie profitieren von Best Practices, Lessons Learned und praxiserprobten Strategien für nachhaltige Adoption."
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
            Warum Microsoft Copilot Trainings von copilotenschule.de?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Wir sind spezialisiert auf Microsoft-Technologien und trainieren ausschließlich Microsoft-eigene KI-Lösungen. 
            Keine Tool-Vielfalt mit unsicheren Drittanbietern, sondern fokussierte Expertise in Microsoft 365 Copilot, 
            GitHub Copilot, Copilot Studio und der Power Platform.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Jedes Training kombiniert fundiertes technisches Know-how mit praktischen Übungen und echten Business-Szenarien. 
            Das Ergebnis: Ihre Teams setzen KI produktiv ein – sicher, DSGVO-konform und messbar effektiv.
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
            Individuell angepasste Trainings für nachhaltigen Erfolg
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Jedes Training wird präzise auf Ihre Unternehmenssituation, Branche, spezifischen Ziele und 
            den individuellen Kenntnisstand Ihrer Mitarbeiter zugeschnitten. Wir analysieren vorab Ihre 
            Anforderungen, identifizieren relevante Use Cases und entwickeln ein maßgeschneidertes Schulungskonzept.
            So holen wir Ihr Team genau dort ab, wo es steht, und führen es strukturiert zum gewünschten Zielniveau.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Nach dem Training bieten wir Follow-up Sessions, Coaching und kontinuierlichen Support, 
            um sicherzustellen, dass das Gelernte nachhaltig in der Praxis angewendet wird und Ihr Team 
            den maximalen ROI aus Microsoft Copilot herausholt.
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