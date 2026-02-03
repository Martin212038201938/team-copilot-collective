import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Building2, CheckCircle2 } from "lucide-react";

interface TrustBadgeProps {
  variant?: 'full' | 'compact';
}

export const TrustBadge = ({ variant = 'full' }: TrustBadgeProps) => {
  const trustFacts = [
    { icon: Building2, text: "Marke der Yellow-Boat Consulting (gegr. 2011)" },
    { icon: Users, text: "Über 500 geschulte Unternehmen" },
    { icon: Award, text: "14+ Jahre Erfahrung in digitaler Transformation" },
    { icon: Shield, text: "Spezialisiert auf Microsoft Copilot & KI-Trainings" },
  ];

  if (variant === 'compact') {
    return (
      <div className="bg-muted/30 rounded-lg p-4 my-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {trustFacts.map((fact, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <fact.icon className="w-4 h-4 text-primary" />
              <span>{fact.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="my-12">
      <Card className="border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center border-4 border-primary/20">
                <img
                  src="/logo.svg"
                  alt="Copilotenschule Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Über die Copilotenschule</h3>
              <div className="text-lg font-semibold text-primary mb-1">Ihr Partner für Microsoft Copilot Trainings</div>
              <div className="text-sm text-muted-foreground mb-3">Eine Marke der Yellow-Boat Consulting</div>
              <p className="text-sm leading-relaxed mb-4">
                Die copilotenschule.de ist Deutschlands spezialisierter Anbieter für Microsoft Copilot Schulungen und KI-Trainings.
                Als Marke der 2011 gegründeten Yellow-Boat Consulting verbinden wir über ein Jahrzehnt Erfahrung in digitaler
                Transformation mit tiefgreifender Expertise im Microsoft-Ökosystem. Unsere Trainings fokussieren konsequent
                auf reale Arbeitsprozesse – praxisnah, compliance-konform und wertschöpfend.
              </p>
              <div className="mb-3">
                <div className="text-sm font-semibold mb-2">Warum Copilotenschule?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {trustFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{fact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Microsoft Copilot
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  GitHub Copilot
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Copilot Studio
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  EU AI Act Compliance
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Change Management
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TrustBadge;
