import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-training.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Ihr Team. Ihre Ziele. Mit KI an der Seite.
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Microsoft Copilot
              <span className="block text-primary mt-2">Inhouse-Trainings</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Maßgeschneiderte Schulungen für Ihr Unternehmen. Unser erfahrenes Trainerteam 
              bringt KI-Kompetenz direkt zu Ihnen – praxisnah, effizient und nachhaltig.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={scrollToContact} className="group">
                Jetzt Training anfragen
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                const element = document.getElementById("trainings");
                element?.scrollIntoView({ behavior: "smooth" });
              }}>
                Trainingsangebot ansehen
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground mt-1">Jahre Erfahrung</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">geschulte Teams</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Praxisorientiert</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Microsoft Copilot Training Team" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;