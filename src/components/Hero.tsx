import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-training.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5 z-0 animate-gradient-shift" />

      {/* Floating orbs for modern effect */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered headline section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Microsoft Copilot Trainings
            </span>
            <span className="block text-accent mt-2 animate-slide-up-delayed">
              Für messbar produktivere Büroarbeit
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="text-xl text-muted-foreground leading-relaxed mb-4 animate-fade-in-delayed">
              Die copilotenschule.de ist die spezialisierte Weiterbildung für Organisationen, die Microsoft Copilot
              wirksam und kontrolliert in der täglichen Büroarbeit einsetzen wollen. Wir befähigen Führungskräfte,
              Teams und Wissensarbeiter, Copilot produktiv, sicher und wertschöpfend im Arbeitsalltag zu nutzen –
              mit klarem Fokus auf Adoption, Wirkung und reale Geschäftsprozesse.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-delayed-2">
              Unsere Trainings basieren auf konkreten Arbeitsabläufen und direkt anwendbaren Copilot-Workflows.
              Sie finden als Inhouse-Training bei Ihnen vor Ort, live online via Teams oder Zoom oder in unserer
              Akademie in Köln statt.
            </p>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              {[
                { value: "Seit 2011", label: "Yellow-Boat Consulting", delay: "delay-100" },
                { value: "DACH", label: "Region", delay: "delay-200" },
                { value: "100%", label: "Praxisorientiert", delay: "delay-300" }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`group animate-fade-in-delayed-3 hover:scale-110 transition-transform duration-300 cursor-default ${stat.delay}`}
                >
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-delayed-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:scale-[1.02]">
              <img
                src={heroImage}
                alt="Microsoft Copilot Training Team"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent group-hover:from-primary/40 transition-all duration-500" />

              {/* Floating badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-900">Live Training</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;