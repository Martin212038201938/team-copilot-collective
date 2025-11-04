import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trainers = [
  {
    name: "Frank Miller",
    role: "Senior Trainer & Cloud-Experte",
    expertise: ["Microsoft 365", "Cloud Security", "IT-Strategie"],
    description: "Über 15 Jahre Erfahrung in Cloud-Technologien und IT-Sicherheit. Begleitet Unternehmen auf ihrem Weg in die digitale Zukunft.",
    image: "👨‍💼"
  },
  {
    name: "Agile & New Work Spezialist",
    role: "Scrum Master & Agile Coach",
    expertise: ["Scrum", "Agile Methoden", "Change Management"],
    description: "Experte für agile Transformation und New Work. Verbindet jahrelange Praxis-Erfahrung mit innovativen KI-Ansätzen.",
    image: "👩‍💼"
  },
  {
    name: "KI & Innovation Coach",
    role: "AI Strategy & Training",
    expertise: ["KI-Strategie", "Prompt Engineering", "EU AI Act"],
    description: "Spezialisiert auf praktische KI-Integration im Unternehmensalltag. Macht komplexe Technologie verständlich und nutzbar.",
    image: "👨‍🏫"
  }
];

const TrainerTeam = () => {
  return (
    <section id="team" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Unser Team
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Erfahrene Trainer mit Praxis-Know-how
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unser interdisziplinäres Trainerteam vereint Expertise aus IT, Consulting, 
            Change-Management und agilen Methoden.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {trainers.map((trainer, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center">
                <div className="text-6xl mb-4">{trainer.image}</div>
                <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
                <p className="text-sm text-muted-foreground">{trainer.role}</p>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{trainer.description}</p>
                <div className="flex flex-wrap gap-2">
                  {trainer.expertise.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Kombinierte Expertise für Ihren Erfolg
              </h3>
              <p className="text-muted-foreground mb-6">
                Je nach Ihrem Training und Ihren Anforderungen stellen wir das optimale 
                Trainerteam zusammen. Von technischer Tiefe bis zu Change-Management – 
                wir decken alle Aspekte erfolgreicher KI-Integration ab.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Langjährige Praxis-Erfahrung in führenden Unternehmen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Zertifizierte Trainer und Coaches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Aktuelle Expertise in KI und digitaler Transformation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Verständnis für unterschiedliche Branchen und Unternehmensgrößen</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary/5 rounded-xl p-8">
              <h4 className="text-lg font-semibold mb-6">Gemeinsame Kompetenzen</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Microsoft Copilot & AI Tools</span>
                    <span className="text-sm text-primary font-semibold">100%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Praxis-Transfer</span>
                    <span className="text-sm text-primary font-semibold">100%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Change-Management</span>
                    <span className="text-sm text-primary font-semibold">95%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Agile Methoden</span>
                    <span className="text-sm text-primary font-semibold">90%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerTeam;