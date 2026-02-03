import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Schließe Mobile-Menü bei Routenwechsel
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Verhindere Scrollen wenn Mobile-Menü offen
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/ueber-uns", label: "Über uns" },
    { to: "/wissen", label: "Copilot Wissen" },
    { to: "/unsere-angebote", label: "Unsere Angebote" },
    { to: "/trainer-werden", label: "Trainer werden" },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src="/images/copilotenschule_flugzeug.png"
              alt="Copilotenschule Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <span className="text-lg sm:text-xl font-bold text-foreground hidden xs:inline">
              Copilotenschule.de
            </span>
          </Link>

          {/* Desktop Navigation - unverändert */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link to="/training-konfigurator">Training konfigurieren</Link>
            </Button>
          </div>

          {/* Mobile: CTA Button + Hamburger Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
              <Link to="/training-konfigurator">Konfigurieren</Link>
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:bg-accent rounded-md transition-colors"
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium py-4 px-4 rounded-lg text-foreground hover:bg-accent transition-all duration-200 transform ${
                  isMobileMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={`pt-4 transform transition-all duration-200 ${
                isMobileMenuOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-4 opacity-0'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms'
              }}
            >
              <Button asChild className="w-full" size="lg">
                <Link to="/training-konfigurator" onClick={() => setIsMobileMenuOpen(false)}>
                  Training konfigurieren
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
