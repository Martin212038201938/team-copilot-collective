import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Breadcrumb {
  label: string;
  href: string;
}

interface ContentLayoutProps {
  children: ReactNode;
  breadcrumbs?: Breadcrumb[];
  title: string;
  description?: string;
  lastUpdated?: string;
  readTime?: string;
  tableOfContents?: { id: string; title: string; level: number }[];
}

const ContentLayout = ({
  children,
  breadcrumbs = [],
  title,
  description,
  lastUpdated,
  readTime,
  tableOfContents = []
}: ContentLayoutProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="bg-muted/30 border-b">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex items-center gap-2 text-sm animate-fade-in">
                <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-foreground font-medium">{crumb.label}</span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr_250px] gap-12 max-w-7xl mx-auto">
            {/* Main Content */}
            <article className="prose prose-lg max-w-none">
              {/* Article Header */}
              <header className="mb-8 not-prose">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  {title}
                </h1>
                {description && (
                  <p className="text-xl text-muted-foreground mb-4 animate-fade-in-delayed">
                    {description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground animate-fade-in-delayed-2">
                  {lastUpdated && (
                    <span>Zuletzt aktualisiert: {lastUpdated}</span>
                  )}
                  {readTime && (
                    <>
                      <span>•</span>
                      <span>{readTime} Lesezeit</span>
                    </>
                  )}
                </div>
                <div className="h-px bg-gradient-to-r from-primary via-accent to-transparent mt-6" />
              </header>

              {/* Article Content */}
              <div className="animate-fade-in-delayed-3">
                {children}
              </div>
            </article>

            {/* Sidebar - Table of Contents */}
            {tableOfContents.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary rounded-full" />
                      Inhaltsverzeichnis
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm hover:text-primary transition-colors py-1 ${
                            item.level === 2 ? "pl-0" : "pl-4"
                          } ${item.level === 2 ? "font-medium" : ""}`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* CTA Box */}
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 shadow-lg">
                    <h3 className="font-bold text-lg mb-2">Fragen?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Wir beraten Sie gerne zu Microsoft Copilot Lizenzen und Trainings.
                    </p>
                    <Link
                      to="/#contact"
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Kontakt aufnehmen
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContentLayout;
