import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";
import { getPublishedAsKnowledgeTopics } from "@/utils/publishedArticles";
import { useState, useEffect } from "react";

const Wissen = () => {
  const [dynamicTopics, setDynamicTopics] = useState<any[]>([]);

  // Load published articles from localStorage (für Artikel aus dem Admin-Portal)
  useEffect(() => {
    const published = getPublishedAsKnowledgeTopics();
    setDynamicTopics(published);
  }, []);

  // ============================================================================
  // STATISCHE WISSENSSEITEN
  // Nur Artikel die tatsächlich als TSX-Dateien in src/pages/ existieren!
  // Bei neuen Artikeln: Erst TSX erstellen, dann hier eintragen.
  // ============================================================================
  const staticKnowledgeTopics = [
    {
      title: "Warum Unternehmen Microsoft Copilot zentral einführen sollten",
      description: "Warum Shadow-IT bei KI gefährlich ist: Zentrale Copilot-Einführung sichert DSGVO-Konformität, Grounding mit Unternehmensdaten und unternehmensweite Synergien.",
      link: "/wissen/copilot-unternehmensweit-einfuehren",
      badge: "Neu",
      icon: "🏢",
      readTime: "12 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "KI in deutschen Unternehmen 2026: Was die großen Beratungsfirmen wirklich sehen",
      description: "Umfassende Analyse von McKinsey, BCG, Deloitte, PwC, KPMG: Aktuelle KI-Investitionen, ROI-Realität und warum 80% der Unternehmen noch keine Ergebnisse sehen.",
      link: "/wissen/ki-realitaet-beratungsfirmen-2026",
      badge: "Strategie",
      icon: "📊",
      readTime: "18 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "Microsoft Copilot Lizenzen 2026: Preise, Vergleich & Empfehlungen",
      description: "Welche Microsoft Copilot Lizenz benötigen Sie? Umfassender Vergleich aller Lizenzmodelle für Microsoft 365 Copilot, GitHub Copilot und Copilot Studio mit aktuellen Preisen.",
      link: "/microsoft-copilot-lizenzen",
      badge: "Lizenzierung",
      icon: "📋",
      readTime: "12 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "GitHub Copilot: Der ultimative Leitfaden für Entwickler",
      description: "Der ultimative Leitfaden für Entwickler: Setup, Best Practices und Advanced Features für produktiveres Coding mit KI-Unterstützung.",
      link: "/github-copilot",
      badge: "Entwicklung",
      icon: "💻",
      readTime: "12 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen",
      description: "Low-Code-Plattform für eigene KI-Agenten: Custom Copilots, Chatbots und Automatisierungen ohne Programmierkenntnisse erstellen.",
      link: "/copilot-studio",
      badge: "Entwicklung",
      icon: "🤖",
      readTime: "10 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "Prompt Engineering: Effektive KI-Prompts für Microsoft Copilot",
      description: "Meistern Sie die Kunst effektiver KI-Kommunikation: Techniken, Beispiele und bewährte Prompt-Muster für bessere Copilot-Ergebnisse.",
      link: "/prompt-engineering",
      badge: "Best Practices",
      icon: "✨",
      readTime: "15 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "KI-Agenten entwickeln: Autonome Workflows mit Microsoft Copilot",
      description: "Autonome KI-Assistenten für Ihr Unternehmen: Von einfachen Workflows bis zu komplexen Multi-Agent-Systemen mit Microsoft-Technologien.",
      link: "/ki-agenten",
      badge: "Automation",
      icon: "🔄",
      readTime: "14 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "7 Fehler bei der Microsoft Copilot-Einführung vermeiden",
      description: "Die 7 kritischsten Fehler vermeiden: Oversharing, Halluzinationen, Compliance-Verstöße. Konkrete Praxisbeispiele und Gegenmaßnahmen für deutsche Unternehmen.",
      link: "/copilot-fehler-vermeiden",
      badge: "Risikomanagement",
      icon: "⚠️",
      readTime: "18 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "Microsoft Copilot Training: Warum Schulung der entscheidende Erfolgsfaktor ist",
      description: "Professionelles Copilot-Training ist der Schlüssel zum ROI. Erfahren Sie, warum interne Taskforces scheitern und wie systematische Schulung Ihre Adoption auf 80%+ steigert.",
      link: "/wissen/copilot-training-schulung",
      badge: "Enablement",
      icon: "🎓",
      readTime: "18 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "Copilot ROI berechnen: Lohnt sich die Investition?",
      description: "Konkrete Methoden zur ROI-Berechnung von Microsoft Copilot. Mit Excel-Vorlage, Praxisbeispielen und messbaren KPIs für Ihr Business Case.",
      link: "/wissen/copilot-roi-berechnen",
      badge: "Business",
      icon: "💰",
      readTime: "12 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "Microsoft Copilot für Word: Der ultimative Guide",
      description: "Entdecken Sie, wie Microsoft Copilot in Word Ihre Dokumentenerstellung revolutioniert. Mit praktischen Beispielen, Prompts und Tipps für maximale Produktivität.",
      link: "/wissen/copilot-fuer-word",
      badge: "Microsoft 365",
      icon: "📝",
      readTime: "15 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "Microsoft Copilot Datenschutz & Sicherheit: DSGVO-konform einsetzen",
      description: "Copilot DSGVO-konform einführen: Zero Trust, Datenschutz-Folgenabschätzung, Governance-Richtlinien. Praxis-Leitfaden für IT-Entscheider.",
      link: "/wissen/copilot-sicherheit-datenschutz",
      badge: "Sicherheit",
      icon: "🔒",
      readTime: "8 Minuten",
      lastUpdated: "02. Feb. 2026"
    },
    {
      title: "20 Microsoft Copilot Tipps & Tricks: Produktivität steigern",
      description: "Copilot Produktivität steigern: 20 Profi-Tipps für GitHub Copilot & Microsoft 365 Copilot. Prompting-Tricks, Shortcuts & versteckte Features.",
      link: "/wissen/copilot-tipps-tricks-produktivitaet",
      badge: "Best Practices",
      icon: "💡",
      readTime: "10 Minuten",
      lastUpdated: "02. Feb. 2026"
    }
  ];

  // Kombiniere dynamische (aus Admin-Portal/localStorage) und statische Artikel
  // Dynamische zuerst, da diese neuer sind
  const knowledgeTopics = [...dynamicTopics, ...staticKnowledgeTopics];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Microsoft Copilot Wissen - Expertenwissen & Best Practices"
        description="Fundiertes Expertenwissen zu Microsoft Copilot, GitHub Copilot und KI-Agenten. Praxisorientierte Leitfäden, detaillierte Vergleiche und Best Practices für den erfolgreichen Einsatz von KI-Tools in Ihrem Unternehmen."
        keywords={[
          "Microsoft Copilot Wissen",
          "GitHub Copilot Guide",
          "KI-Tools Best Practices",
          "Microsoft 365 Copilot Leitfaden",
          "Copilot Expertenwissen",
          "Copilot Lizenzen",
          "Copilot ROI"
        ]}
        canonicalUrl="https://copilotenschule.de/wissen"
      />
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 via-accent/5 to-background relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] animate-slide-up">
                <span className="text-primary">Microsoft Copilot</span> Wissen
              </h1>
              <p className="mt-6 text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up-delayed">
                Fundiertes Expertenwissen zu Microsoft Copilot, GitHub Copilot und KI-Agenten.
                Praxisorientierte Leitfäden, detaillierte Vergleiche und Best Practices für den
                erfolgreichen Einsatz von KI-Tools in Ihrem Unternehmen.
              </p>
            </div>
          </div>
        </section>

        {/* Knowledge Topics Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Aktuelle Themen</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {knowledgeTopics.map((topic, idx) => (
                  <Link key={idx} to={topic.link} className="group">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-4xl">{topic.icon}</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {topic.badge}
                          </span>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {topic.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm leading-relaxed">
                          {topic.description}
                        </CardDescription>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{topic.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>{topic.lastUpdated}</span>
                          </div>
                        </div>

                        <Button variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          Artikel lesen →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wissen;
