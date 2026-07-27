import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Download } from "lucide-react";
import { ALL_GUIDES, getAvailableGuides, CATEGORY_LABEL } from "@/data/guides";

const PAGE_URL = "https://copilotenschule.de/guidelines";

/**
 * Kategorie-Übersicht "Guidelines und Checklisten".
 * Listet alle verfügbaren Gated-Downloads (Honeypots). Aus dem Wissen-Bereich
 * verlinkt (Kategorie-Card auf /wissen).
 */
const GuidelinesUebersicht = () => {
  const guides = getAvailableGuides();
  const featuredGuides = guides.filter((g) => g.featured);
  const regularGuides = guides.filter((g) => !g.featured);
  const hasComingSoon = ALL_GUIDES.some((g) => g.status === "coming-soon");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: `${CATEGORY_LABEL} – Copilotenschule`,
        description:
          "Praxis-Leitfäden und Checklisten rund um Microsoft 365 Copilot – kostenlos als PDF für Admins, Datenschutz- und Projektverantwortliche.",
        inLanguage: "de-DE",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://copilotenschule.de/" },
          { "@type": "ListItem", position: 2, name: "Wissen", item: "https://copilotenschule.de/wissen" },
          { "@type": "ListItem", position: 3, name: CATEGORY_LABEL, item: PAGE_URL },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: guides.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: g.title,
          url: `https://copilotenschule.de/guidelines/${g.id}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${CATEGORY_LABEL} – kostenlose Copilot-Leitfäden`}
        description="Kostenlose Praxis-Leitfäden und Checklisten zu Microsoft 365 Copilot – für Admins, Datenschutz- und Projektverantwortliche. Direkt als PDF herunterladen."
        keywords={[
          "Copilot Leitfaden",
          "Copilot Checkliste",
          "Microsoft 365 Copilot Guidelines",
          "Copilot Admin Leitfaden",
          "Copilot Rollout Checkliste",
        ]}
        canonicalUrl={PAGE_URL}
        schema={schema}
      />
      <Header />
      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link to="/wissen" className="text-muted-foreground hover:text-foreground transition-colors">Wissen</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{CATEGORY_LABEL}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-5">
                {CATEGORY_LABEL}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Kostenlose Praxis-Leitfäden und Checklisten rund um Microsoft 365 Copilot –
                zum direkten Download als PDF. Für Admins, Datenschutz- und Projektverantwortliche,
                die Copilot sauber und sicher einführen wollen.
              </p>
            </div>
          </div>
        </section>

        {/* Featured-Panel */}
        {featuredGuides.length > 0 && (
          <section className="pt-8 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto space-y-6">
                {featuredGuides.map((guide) => (
                  <Link key={guide.id} to={`/guidelines/${guide.id}`} className="group block">
                    <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-accent/10 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="flex-shrink-0 text-6xl" aria-hidden="true">{guide.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wide">
                                Neu
                              </span>
                              <span className="text-xs font-medium text-muted-foreground">
                                PDF · {guide.pages} Seiten · kostenlos
                              </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors mb-2">
                              {guide.shortTitle}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">{guide.description}</p>
                            <p className="mt-2 text-xs text-muted-foreground">Für: {guide.audience}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <Button size="lg" className="w-full md:w-auto">
                              <Download className="w-4 h-4" />
                              Zum Handbuch →
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Grid */}
        <section className="pt-8 pb-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularGuides.map((guide) => (
                  <Link key={guide.id} to={`/guidelines/${guide.id}`} className="group">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-4xl">{guide.icon}</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {guide.badge}
                          </span>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {guide.shortTitle}
                        </CardTitle>
                        <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                          PDF · {guide.pages} Seiten
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm leading-relaxed">
                          {guide.description}
                        </CardDescription>
                        <div className="text-xs text-muted-foreground pt-4 border-t">
                          Für: {guide.audience}
                        </div>
                        <Button variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Download className="w-4 h-4" />
                          Zum Leitfaden →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {hasComingSoon && (
                <p className="mt-10 text-center text-muted-foreground">
                  Weitere Guidelines und Checklisten sind in Vorbereitung.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuidelinesUebersicht;
