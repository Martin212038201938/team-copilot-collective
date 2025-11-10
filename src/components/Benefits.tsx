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
    title: "50% praktische Übungen, 50% fundierte Theorie",
    description: "Ausgewogene Balance zwischen theoretischem Fundament und praktischer Anwendung. Wir arbeiten hands-on in den Microsoft-Tools mit realen Business-Szenarien aus Ihrem Arbeitsalltag: E-Mails verfassen, Excel-Analysen erstellen, Code entwickeln, Meetings protokollieren, Workflows automatisieren. Jeder Teilnehmer übt aktiv und entwickelt sofort einsetzbare Lösungen auf Basis fundierter Kenntnisse."
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
    <section id="benefits" className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="px-4 py-2 bg-gradient-to-r from-accent/90 to-primary/80 text-white rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform duration-300 inline-block">
            Unser USP
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 animate-slide-up">
            Warum Microsoft Copilot Trainings von copilotenschule.de?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-fade-in-delayed">
            Wir sind spezialisiert auf Microsoft-Technologien und trainieren ausschließlich Microsoft-eigene KI-Lösungen.
            Keine Tool-Vielfalt mit unsicheren Drittanbietern, sondern fokussierte Expertise in Microsoft 365 Copilot,
            GitHub Copilot, Copilot Studio und der Power Platform.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-delayed-2">
            Jedes Training kombiniert fundiertes technisches Know-how mit praktischen Übungen und echten Business-Szenarien.
            Das Ergebnis: Ihre Teams setzen KI produktiv ein – sicher, DSGVO-konform und messbar effektiv.
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
              Individuell angepasste Trainings für nachhaltigen Erfolg
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              Jedes Training wird präzise auf Ihre Unternehmenssituation, Branche, spezifischen Ziele und
              den individuellen Kenntnisstand Ihrer Mitarbeiter zugeschnitten. Wir analysieren vorab Ihre
              Anforderungen, identifizieren relevante Use Cases und entwickeln ein maßgeschneidertes Schulungskonzept.
              So holen wir Ihr Team genau dort ab, wo es steht, und führen es strukturiert zum gewünschten Zielniveau.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Nach dem Training bieten wir Follow-up Sessions, Coaching und kontinuierlichen Support,
              um sicherzustellen, dass das Gelernte nachhaltig in der Praxis angewendet wird und Ihr Team
              den maximalen ROI aus Microsoft Copilot herausholt.
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