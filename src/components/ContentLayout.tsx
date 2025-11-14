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

        {/* Background decorations */}
        <div className="fixed top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="fixed bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-7xl mx-auto">
            {/* Main Content */}
            <article className="prose prose-lg max-w-none">
              {/* Article Header */}
              <header className="mb-12 not-prose relative">
                {/* Decorative corner accent */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-l-4 border-t-4 border-primary/30 rounded-tl-2xl" />

                <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />

                  <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground/70 leading-tight">
                      {title}
                    </h1>
                    {description && (
                      <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in-delayed leading-relaxed">
                        {description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm animate-fade-in-delayed-2">
                      {lastUpdated && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <span className="text-muted-foreground">Zuletzt aktualisiert: <span className="font-semibold text-foreground">{lastUpdated}</span></span>
                        </div>
                      )}
                      {readTime && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                          <span className="w-2 h-2 bg-accent rounded-full" />
                          <span className="text-muted-foreground"><span className="font-semibold text-foreground">{readTime}</span> Lesezeit</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
              </header>

              {/* Article Content with enhanced styling */}
              <div className="animate-fade-in-delayed-3 space-y-8">
                {children}
              </div>
            </article>

            {/* Sidebar - Table of Contents */}
            {tableOfContents.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  {/* Table of Contents */}
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />

                    <div className="relative bg-card/80 backdrop-blur-md border-2 border-border/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                          Inhaltsverzeichnis
                        </span>
                      </h3>
                      <nav className="space-y-2">
                        {tableOfContents.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => scrollToSection(item.id)}
                            className={`group/item block w-full text-left text-sm hover:text-primary transition-all duration-200 py-2 px-3 rounded-lg hover:bg-primary/5 relative ${
                              item.level === 2 ? "pl-3" : "pl-6"
                            } ${item.level === 2 ? "font-semibold" : "font-medium text-muted-foreground"}`}
                          >
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-primary group-hover/item:w-2 transition-all duration-200" />
                            {item.title}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>

                  {/* CTA Box */}
                  <div className="relative group">
                    {/* Animated glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-30 group-hover:opacity-50 animate-pulse transition duration-500" />

                    <div className="relative bg-gradient-to-br from-primary/15 to-accent/15 backdrop-blur-md border-2 border-primary/30 rounded-2xl p-6 shadow-xl overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/10 rounded-full blur-2xl" />

                      <div className="relative z-10">
                        <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <span className="text-2xl">💡</span>
                          <span>Fragen?</span>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                          Wir beraten Sie gerne zu Microsoft Copilot Lizenzen und Trainings.
                        </p>
                        <Link
                          to="/#contact"
                          className="group/btn relative inline-flex items-center justify-center w-full px-5 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/80 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
                        >
                          <span className="relative z-10">Kontakt aufnehmen</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </Link>
                      </div>
                    </div>
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
