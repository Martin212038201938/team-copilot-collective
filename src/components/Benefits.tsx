import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users, Zap, Shield, Award } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Praxisorientiert",
    description: "Keine theoretischen Vorträge – wir arbeiten mit realen Anwendungsfällen aus Ihrem Unternehmensalltag."
  },
  {
    icon: Users,
    title: "Team-fokussiert",
    description: "Trainings für Ihr gesamtes Team oder spezifische Abteilungen – individuell angepasst an Ihre Bedürfnisse."
  },
  {
    icon: Lightbulb,
    title: "Sofort umsetzbar",
    description: "Sie lernen Techniken, die Sie direkt am nächsten Tag in Ihrer täglichen Arbeit einsetzen können."
  },
  {
    icon: Zap,
    title: "Effizienzsteigerung",
    description: "Messbare Produktivitätssteigerung durch intelligenten Einsatz von KI-Tools im Arbeitsalltag."
  },
  {
    icon: Shield,
    title: "Rechtssicher",
    description: "Alle Trainings berücksichtigen Datenschutz, EU AI Act und rechtliche Rahmenbedingungen."
  },
  {
    icon: Award,
    title: "Erfahrene Trainer",
    description: "Über 15 Jahre Expertise in IT, Cloud, Agile und Change-Management vereint in einem Team."
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Warum CopilotSchule?
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Praxis statt Theorie
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wir vermitteln greifbares Wissen, das Ihre Teams sofort anwenden können.
            Nachhaltige Kompetenzentwicklung für langfristigen Erfolg.
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