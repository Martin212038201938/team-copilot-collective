import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { getPublishedAsKnowledgeTopics, isArticlePublished } from "@/utils/publishedArticles";
import { useState, useEffect } from "react";
import { ALL_ARTICLES } from "@/data/articles";

const Wissen = () => {
  const [dynamicTopics, setDynamicTopics] = useState<any[]>([]);
  const [visibleStaticTopics, setVisibleStaticTopics] = useState<any[]>([]);

  // Load published articles from localStorage (für Artikel aus dem Admin-Portal)
  useEffect(() => {
    const published = getPublishedAsKnowledgeTopics();
    setDynamicTopics(published);
  }, []);

  // Filtere Artikel basierend auf Editorial Calendar Status
  // Verwendet die zentrale Datenquelle ALL_ARTICLES
  useEffect(() => {
    const filtered = ALL_ARTICLES.filter(article => isArticlePublished(article.link));
    setVisibleStaticTopics(filtered);
  }, []);

  // Kombiniere dynamische (aus Admin-Portal/localStorage) und gefilterte statische Artikel
  // Sortiere nach publishDate absteigend (neueste zuerst)
  const knowledgeTopics = [...dynamicTopics, ...visibleStaticTopics].sort((a, b) => {
    const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return dateB - dateA; // Neueste zuerst
  });

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
        <section className="pt-8 pb-16 bg-background">
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
