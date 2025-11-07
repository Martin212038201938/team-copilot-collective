import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthor } from "@/data/authors";
import { Link } from "react-router-dom";
import { Linkedin, Mail, BookOpen, Clock } from "lucide-react";

const Wissen = () => {
  const martinLang = getAuthor('martin-lang')!;

  const knowledgeTopics = [
    {
      title: "Microsoft Copilot Lizenzen: Kompletter Überblick",
      description: "Welche Microsoft Copilot Lizenz benötigen Sie? Umfassender Vergleich aller Lizenzmodelle für Microsoft 365 Copilot, GitHub Copilot und Copilot Studio.",
      link: "/microsoft-copilot-lizenzen",
      badge: "Lizenzierung",
      icon: "📋",
      readTime: "8 Minuten",
      lastUpdated: "07. November 2025"
    },
    {
      title: "GitHub Copilot für Entwickler",
      description: "Der ultimative Leitfaden für Entwickler: Setup, Best Practices und Advanced Features für produktiveres Coding mit KI-Unterstützung.",
      link: "/github-copilot",
      badge: "Entwicklung",
      icon: "💻",
      readTime: "12 Minuten",
      lastUpdated: "07. November 2025"
    },
    {
      title: "Microsoft Copilot Studio",
      description: "Low-Code-Plattform für eigene KI-Agenten: Custom Copilots, Chatbots und Automatisierungen ohne Programmierkenntnisse erstellen.",
      link: "/copilot-studio",
      badge: "Entwicklung",
      icon: "🤖",
      readTime: "10 Minuten",
      lastUpdated: "07. November 2025"
    },
    {
      title: "Prompt Engineering Best Practices",
      description: "Meistern Sie die Kunst effektiver KI-Kommunikation: Techniken, Beispiele und bewährte Prompt-Muster für bessere Copilot-Ergebnisse.",
      link: "/prompt-engineering",
      badge: "Best Practices",
      icon: "✨",
      readTime: "15 Minuten",
      lastUpdated: "07. November 2025"
    },
    {
      title: "KI-Agenten entwickeln",
      description: "Autonome KI-Assistenten für Ihr Unternehmen: Von einfachen Workflows bis zu komplexen Multi-Agent-Systemen mit Microsoft-Technologien.",
      link: "/ki-agenten",
      badge: "Automation",
      icon: "🔄",
      readTime: "14 Minuten",
      lastUpdated: "07. November 2025"
    },
    {
      title: "Die 7 größten Fehler bei der Copilot-Einführung",
      description: "Die 7 kritischsten Fehler vermeiden: Oversharing, Halluzinationen, Compliance-Verstöße. Konkrete Praxisbeispiele und Gegenmaßnahmen für deutsche Unternehmen.",
      link: "/copilot-fehler-vermeiden",
      badge: "Risikomanagement",
      icon: "⚠️",
      readTime: "18 Minuten",
      lastUpdated: "07. November 2025"
    }
  ,
  {
    title: "Copilot ROI berechnen: Lohnt sich die Investition?",
    description: "Konkrete Methoden zur ROI-Berechnung von Microsoft Copilot. Mit Excel-Vorlage, Praxisbeispielen und messbaren KPIs für Ihr Business Case.",
    link: "/wissen/copilot-roi-berechnen",
    badge: "Business",
    icon: "💰",
    readTime: "12 Minuten",
    lastUpdated: "07. Nov. 2025"
  }
];

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
          "Copilot Expertenwissen"
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
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Expertenwissen
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Microsoft Copilot Wissen
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
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

        {/* Author Section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">Ihr Experte für Microsoft Copilot</h2>
                <p className="text-muted-foreground">
                  Profitieren Sie von jahrelanger Erfahrung in KI-Training und agiler Transformation
                </p>
              </div>

              <Card className="border-2 border-primary/20 shadow-xl">
                <CardContent className="pt-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    {/* Author Image */}
                    <div className="flex-shrink-0">
                      {martinLang.image && (
                        <img
                          src={martinLang.image}
                          alt={martinLang.name}
                          className="w-40 h-40 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                        />
                      )}
                    </div>

                    {/* Author Info */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-primary mb-2">{martinLang.name}</h3>
                      <div className="text-lg text-muted-foreground mb-4">{martinLang.role}</div>

                      <p className="text-sm leading-relaxed mb-6">
                        {martinLang.bio}
                      </p>

                      {/* Expertise Tags */}
                      <div className="mb-6">
                        <div className="text-sm font-semibold mb-3">Expertise:</div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {martinLang.expertise.map((exp, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Links */}
                      <div className="flex gap-3 justify-center md:justify-start">
                        {martinLang.linkedin && (
                          <Button asChild variant="default">
                            <a
                              href={martinLang.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2"
                            >
                              <Linkedin className="w-4 h-4" />
                              LinkedIn-Profil
                            </a>
                          </Button>
                        )}
                        {martinLang.email && (
                          <Button asChild variant="outline">
                            <a
                              href={`mailto:${martinLang.email}`}
                              className="inline-flex items-center gap-2"
                            >
                              <Mail className="w-4 h-4" />
                              Kontakt
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wissen;
