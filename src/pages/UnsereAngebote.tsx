import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, HelpCircle, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { generateTrainingSchemas } from "@/lib/schema";
import { trainings, type Training, type CopilotTier } from "@/data/trainings";

export type { CopilotTier };

// Trainings werden aus der zentralen Datei importiert
const modules = trainings;

type TierFilter = "all" | "free" | "paid";

const tierFilterOptions: { value: TierFilter; label: string }[] = [
  { value: "all", label: "Alle Trainings" },
  { value: "free", label: "Copilot Free" },
  { value: "paid", label: "Copilot Paid" },
];

// Training modules data for schema generation - simplified for SEO
const trainingModulesForSchema = modules.map(m => ({
  title: m.title,
  duration: m.duration,
  description: m.description,
  features: m.features
}));

const UnsereAngebote = () => {
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [showTierHelp, setShowTierHelp] = useState(false);

  const filteredModules = tierFilter === "all"
    ? modules
    : modules.filter(m => m.tiers.includes(tierFilter));

  const schema = generateTrainingSchemas(trainingModulesForSchema, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Unsere Angebote – Microsoft Copilot Schulungen & Trainings | copilotenschule.de"
        description="Alle Microsoft Copilot Trainings im Überblick: Grundlagen, M365 Apps, GitHub Copilot, Compliance, Strategie, KI-Agenten und mehr. Trainings für Copilot Free und Copilot Paid Lizenzen."
        keywords={[
          "Microsoft Copilot Schulung",
          "Microsoft 365 Copilot Training",
          "Copilot Trainings Übersicht",
          "GitHub Copilot Training",
          "Copilot Studio Schulung",
          "KI Training Unternehmen",
          "Copilot Free Training",
          "Copilot Paid Training"
        ]}
        canonicalUrl="https://copilotenschule.de/unsere-angebote"
        schema={schema}
      />
      <Header />

      <main className="pt-24">
        <section id="trainings" className="py-16 bg-gradient-to-b from-muted/30 to-background relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] animate-slide-up">
                Unsere Angebote
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up-delayed">
                Microsoft Copilot Schulungen & Trainings für Unternehmen –
                konsequent auf die konkreten Bedarfe Ihrer Organisation zugeschnitten.
              </p>
            </div>

            {/* Tier Info Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Wir trainieren gezielt auf das Copilot-Tier, das Ihre Teilnehmer tatsächlich haben
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  Microsoft Copilot gibt es in zwei Varianten. Wählen Sie unten Ihr Tier aus, um nur die relevanten Trainings zu sehen.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">
                      Copilot Free
                    </Badge>
                    <span className="text-sm text-muted-foreground">Microsoft 365 Copilot Chat (Websuche, kostenlos)</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">
                      Copilot Paid
                    </Badge>
                    <span className="text-sm text-muted-foreground">Microsoft 365 Copilot mit Lizenz (Grounding, M365-Integration)</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  {!showTierHelp ? (
                    <button
                      onClick={() => setShowTierHelp(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-sm font-medium text-primary transition-all duration-200 hover:scale-105"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Welchen Copilot habe ich?
                    </button>
                  ) : (
                    <div className="w-full max-w-md p-4 rounded-lg border border-primary/30 bg-card shadow-lg text-left animate-fade-in">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-primary" />
                          So finden Sie Ihr Copilot-Tier heraus
                        </h4>
                        <button
                          onClick={() => setShowTierHelp(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                        <li>Öffnen Sie <strong>Microsoft Copilot</strong> in Teams, Word oder im Browser (copilot.microsoft.com)</li>
                        <li>Achten Sie auf den <strong>Toggle „Work / Web"</strong> oben im Chat. Sehen Sie diesen Schalter, haben Sie <strong>Copilot Paid</strong></li>
                        <li>Stellen Sie die Frage: <em>„Welche Termine habe ich heute?"</em></li>
                        <li>Erhalten Sie Ihre <strong>echten Kalender-Termine</strong> als Antwort → <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">Copilot Paid</Badge></li>
                        <li>Kommt <strong>keine Kalender-Antwort</strong> oder nur eine Web-Suche → <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">Copilot Free</Badge></li>
                      </ol>
                      <button
                        onClick={() => setShowTierHelp(false)}
                        className="mt-3 text-xs text-primary hover:underline"
                      >
                        Schließen
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tier Filter */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1 bg-muted/60 rounded-lg border">
                {tierFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTierFilter(option.value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      tierFilter === option.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Training Cards Grid - jetzt mit Links zu Detailseiten */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <Link
                  key={module.slug}
                  to={`/trainings/${module.slug}`}
                  className="block group"
                >
                  <Card className="h-full min-h-[280px] flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex-1 py-4">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {module.tiers.includes("free") && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">
                            Copilot Free
                          </Badge>
                        )}
                        {module.tiers.includes("paid") && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">
                            Copilot Paid
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </CardDescription>

                      {/* SEO: Beschreibung jetzt sichtbar im HTML */}
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                        {module.description}
                      </p>

                      {/* Call-to-Action Link */}
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary group-hover:underline">
                        Mehr erfahren <ArrowRight className="w-3 h-3" />
                      </span>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Modularer Konfigurator CTA */}
            <div className="mt-12 relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl" />
              <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30 rounded-xl p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-3">
                  Ihr Training, Ihre Module – individuell zusammengestellt
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  Kein passendes Training gefunden? Bei der Copilotenschule können Sie Ihr Training aus einzelnen Modulen
                  selbst zusammenstellen – exakt auf die Bedürfnisse Ihres Teams zugeschnitten.
                </p>
                <Link to="/training-konfigurator">
                  <Button size="default" className="group">
                    Module individuell zusammenstellen
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Zertifizierungsprogramme Info */}
            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="border-2 border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-purple-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-center gap-2 text-lg">
                    🎓 Prüfungen & Zertifizierungen auf Wunsch
                  </CardTitle>
                </CardHeader>
                <CardDescription className="px-6 pb-6 text-center">
                  <p className="mb-3">
                    Für alle Trainings bieten wir optional <strong>maßgeschneiderte Quizze und Prüfungen</strong> an,
                    bei denen Teilnehmer beweisen, dass sie das Gelernte verstanden haben. Nach bestandener Prüfung
                    erhalten Mitarbeiter und Unternehmen ein offizielles <strong>Zertifikat</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Auch aufbauende Zertifizierungsstufen möglich: <strong>Beginner → Advanced → Pro → Expert</strong>
                    <br />
                    <span className="italic">Investitionssicherheit für Unternehmen, Karriere-Boost für Mitarbeiter.</span>
                  </p>
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UnsereAngebote;
