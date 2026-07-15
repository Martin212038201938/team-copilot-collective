import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AuthorBio from "@/components/AuthorBio";
import GatedDownloadForm from "@/components/GatedDownloadForm";
import { getAuthor } from "@/data/authors";
import { getGuide } from "@/data/guides";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Check, ArrowLeft } from "lucide-react";
import NotFound from "@/pages/NotFound";

interface GuideLandingPageProps {
  guideId: string;
}

/**
 * Wiederverwendbare Landingpage für einen Gated-Download ("Honeypot").
 * Wird pro Guide über eine explizite Route in App.tsx eingebunden:
 *   <Route path="/guidelines/<id>" element={<GuideLandingPage guideId="<id>" />} />
 */
const GuideLandingPage = ({ guideId }: GuideLandingPageProps) => {
  const guide = getGuide(guideId);
  if (!guide) return <NotFound />;

  const author = getAuthor("martin-lang")!;
  const pageUrl = `https://copilotenschule.de/guidelines/${guide.id}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: guide.seo.metaTitle,
        description: guide.seo.metaDescription,
        inLanguage: "de-DE",
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://copilotenschule.de/" },
          { "@type": "ListItem", position: 2, name: "Wissen", item: "https://copilotenschule.de/wissen" },
          { "@type": "ListItem", position: 3, name: "Guidelines und Checklisten", item: "https://copilotenschule.de/guidelines" },
          { "@type": "ListItem", position: 4, name: guide.shortTitle, item: pageUrl },
        ],
      },
      {
        "@type": "DigitalDocument",
        name: guide.title,
        description: guide.description,
        inLanguage: "de-DE",
        author: { "@id": "https://copilotenschule.de/#martin-lang" },
        publisher: { "@id": "https://copilotenschule.de/#organization" },
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={guide.seo.metaTitle}
        description={guide.seo.metaDescription}
        keywords={guide.seo.keywords}
        canonicalUrl={pageUrl}
        author={author}
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
              <Link to="/guidelines" className="text-muted-foreground hover:text-foreground transition-colors">Guidelines und Checklisten</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{guide.shortTitle}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
                {guide.badge}
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-5">
                {guide.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                {guide.description}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Für:</span> {guide.audience}
              </p>
            </div>
          </div>
        </section>

        {/* Content + Form */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_400px] gap-10 max-w-6xl mx-auto">
              {/* Was steckt drin */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-5">Das steckt im Leitfaden</h2>
                <ul className="space-y-3">
                  {guide.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1 flex-shrink-0 text-primary">
                        <Check className="w-5 h-5" />
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 prose prose-lg max-w-none dark:prose-invert">
                  <p className="leading-relaxed">
                    Der Leitfaden ist bewusst für die Praxis geschrieben: konkrete Schritte,
                    die richtige Reihenfolge und die Stolperfallen, die vor einem Copilot-Rollout
                    typischerweise übersehen werden. Kostenlos, ohne Umwege – nach Eintragen Ihrer
                    E-Mail steht der Download sofort bereit.
                  </p>
                </div>

                {/* Vollständiges Inhaltsverzeichnis */}
                <div className="mt-10">
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <h2 className="text-2xl md:text-3xl font-bold">Inhaltsverzeichnis</h2>
                    <span className="flex-shrink-0 text-sm font-medium text-muted-foreground">
                      PDF · {guide.pages} Seiten
                    </span>
                  </div>
                  <ol className="space-y-1.5 border-l-2 border-primary/20 pl-5">
                    {guide.toc.map((entry, i) => {
                      const isSection = /^Teil\s/i.test(entry);
                      return (
                        <li
                          key={i}
                          className={
                            isSection
                              ? "mt-4 first:mt-0 text-xs font-semibold uppercase tracking-wide text-primary"
                              : "text-muted-foreground leading-relaxed"
                          }
                        >
                          {entry}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              {/* Formular (sticky) */}
              <div>
                <div className="lg:sticky lg:top-24">
                  <GatedDownloadForm guide={guide} />
                  <p className="mt-3 text-xs text-muted-foreground text-center">
                    Kein Spam. Sie können der Kontaktaufnahme jederzeit widersprechen.
                  </p>
                </div>
              </div>
            </div>

            {/* Autor */}
            <div className="max-w-6xl mx-auto mt-14">
              <AuthorBio author={author} />
            </div>

            {/* Zurück zur Übersicht */}
            <div className="max-w-6xl mx-auto mt-8">
              <Link
                to="/guidelines"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Alle Guidelines und Checklisten
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuideLandingPage;
