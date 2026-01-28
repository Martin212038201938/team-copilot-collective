import { Shield, Award, Users, Lock } from "lucide-react";

const trustBadges = [
  {
    icon: Shield,
    title: "Microsoft Partner",
    description: "Zertifizierter Microsoft-Partner mit nachgewiesener Expertise"
  },
  {
    icon: Lock,
    title: "DSGVO-konform",
    description: "100% datenschutzkonforme Schulungen nach EU-Standards"
  },
  {
    icon: Award,
    title: "15+ Jahre Erfahrung",
    description: "Fundierte Expertise in Microsoft-Technologien seit 2009"
  },
  {
    icon: Users,
    title: "500+ geschulte Teams",
    description: "Erfolgreiche Trainings in führenden Unternehmen"
  }
];

const TrustBadges = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">
            Ihre Garantie für exzellente Trainings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vertrauen Sie auf geprüfte Qualität, langjährige Erfahrung und höchste Sicherheitsstandards
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors duration-300">
                  {badge.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
