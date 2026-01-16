import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-training.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5 z-0 animate-gradient-shift" />

      {/* Floating orbs for modern effect */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block animate-fade-in">
              <span className="group px-4 py-2 bg-gradient-to-r from-accent/90 to-primary/80 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default flex items-center gap-2 w-fit">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Praxisnähe. Wirksamkeit. Transparenz.
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Microsoft Copilot Trainings
              </span>
              <span className="block text-accent mt-2 animate-slide-up-delayed">
                Für messbar produktivere Büroarbeit
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-4 animate-fade-in-delayed">
              Die copilotenschule.de ist die spezialisierte Weiterbildungs- und Enablement-Plattform für den
              professionellen Einsatz von Microsoft Copilot in der täglichen Büroarbeit. Wir befähigen
              Wissensarbeiter, Teams und Organisationen, Microsoft Copilot produktiv, sicher und
              wertschöpfend im Arbeitsalltag einzusetzen.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-delayed-2">
              Unser praxisorientierter Trainingsansatz verbindet reale Arbeitsprozesse mit direkt anwendbaren
              Workflows. Finde relevante Use Cases für dich und setze sie sicher und einfach mit Copilot um –
              als Inhouse-Schulung, Remote-Training oder in unseren Räumen in Köln.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed-3">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Jetzt Training anfragen
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("trainings");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group hover:bg-accent/10 hover:border-accent transition-all duration-300 hover:scale-105"
              >
                Trainingsangebot ansehen
              </Button>
            </div>

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