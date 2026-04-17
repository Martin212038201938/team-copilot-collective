import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  workshops,
  WORKSHOP_TYPE_LABELS,
  WORKSHOP_TYPE_ORDER,
  type WorkshopType,
} from "@/data/workshops";

// ------------------------------------------------------------------
//  Workshops-Dropdown: Klick auf "Workshops" → Landingpage,
//  Hover → Dropdown mit allen Formaten gruppiert nach Typ.
// ------------------------------------------------------------------

const workshopsByType: Record<WorkshopType, typeof workshops> = {
  "change-program": workshops.filter((w) => w.type === "change-program"),
  workshop: workshops.filter((w) => w.type === "workshop"),
  event: workshops.filter((w) => w.type === "event"),
  keynote: workshops.filter((w) => w.type === "keynote"),
};

interface WorkshopsNavProps {
  isActive: boolean;
}

const WorkshopsNav = ({ isActive }: WorkshopsNavProps) => {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    // Kleine Verzögerung, damit versehentliches Hovern nicht triggert
    openTimer.current = window.setTimeout(() => setOpen(true), 80);
  };

  const handleLeave = () => {
    if (openTimer.current) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  // Schließen per Escape (Accessibility)
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        // Schließen, wenn Fokus den gesamten Container verlässt
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <Link
        to="/workshops"
        className={`inline-flex items-center gap-1 transition-colors ${
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Workshops
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </Link>

      {/* Dropdown-Panel */}
      <div
        className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 w-[620px] rounded-xl border bg-popover text-popover-foreground shadow-xl transition-all duration-150 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="menu"
      >
        {/* Brücke, damit der Hover nicht abreißt */}
        <div
          className="absolute -top-3 left-0 right-0 h-3"
          aria-hidden="true"
        />

        <div className="p-4">
          <Link
            to="/workshops"
            className="block rounded-lg px-3 py-2 mb-3 bg-muted/40 hover:bg-muted transition-colors"
            role="menuitem"
          >
            <div className="text-sm font-semibold text-foreground">
              Copilot Workshops und Events – Übersicht
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Strategie, Events, Keynotes und das Change-Programm auf einen Blick.
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {WORKSHOP_TYPE_ORDER.map((type) => {
              const items = workshopsByType[type];
              if (items.length === 0) return null;
              return (
                <div key={type}>
                  <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                    {WORKSHOP_TYPE_LABELS[type]}
                  </div>
                  <ul className="space-y-0.5">
                    {items.map((w) => {
                      const Icon = w.icon;
                      return (
                        <li key={w.slug}>
                          <Link
                            to={`/workshops/${w.slug}`}
                            className="flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors"
                            role="menuitem"
                          >
                            <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-snug">
                              {w.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
//  Header
// ------------------------------------------------------------------

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileWorkshopsOpen, setIsMobileWorkshopsOpen] = useState(false);
  const location = useLocation();

  // Schließe Mobile-Menü bei Routenwechsel
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileWorkshopsOpen(false);
  }, [location.pathname]);

  // Verhindere Scrollen wenn Mobile-Menü offen
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/ueber-uns", label: "Über uns" },
    { to: "/wissen", label: "Copilot Wissen" },
    { to: "/trainings", label: "Trainings" },
    { to: "/workshops", label: "Workshops", hasDropdown: true },
    { to: "/trainer-werden", label: "Trainer werden" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 w-full border-b border-border z-50 transition-colors duration-300 ${
        isMobileMenuOpen
          ? "bg-background"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <WorkshopsNav key={link.to} isActive={isActive(link.to)} />
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
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
        className={`lg:hidden fixed inset-0 top-16 z-40 bg-background transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-4 pt-4 pb-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {navLinks.map((link, index) => {
              const isLast = index === navLinks.length - 1;
              if (link.hasDropdown) {
                // Workshops-Eintrag mit Accordion
                return (
                  <div
                    key={link.to}
                    className={`${!isLast ? "border-b border-border" : ""} transform transition-all duration-200 ${
                      isMobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen
                        ? `${index * 50}ms`
                        : "0ms",
                    }}
                  >
                    <div className="flex items-stretch">
                      <Link
                        to={link.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex-1 flex items-center gap-3 text-base font-medium py-3.5 px-5 transition-all duration-200 ${
                          isActive(link.to)
                            ? "text-primary bg-primary/5 border-l-[3px] border-l-primary"
                            : "text-foreground hover:bg-accent border-l-[3px] border-l-transparent"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsMobileWorkshopsOpen((v) => !v);
                        }}
                        aria-expanded={isMobileWorkshopsOpen}
                        aria-label="Untermenü Workshops umschalten"
                        className="px-4 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isMobileWorkshopsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {isMobileWorkshopsOpen && (
                      <div className="bg-muted/30 border-t border-border/50">
                        {WORKSHOP_TYPE_ORDER.map((type) => {
                          const items = workshopsByType[type];
                          if (items.length === 0) return null;
                          return (
                            <div key={type} className="px-5 py-2">
                              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">
                                {WORKSHOP_TYPE_LABELS[type]}
                              </div>
                              <ul>
                                {items.map((w) => (
                                  <li key={w.slug}>
                                    <Link
                                      to={`/workshops/${w.slug}`}
                                      onClick={() =>
                                        setIsMobileMenuOpen(false)
                                      }
                                      className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                                    >
                                      {w.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-base font-medium py-3.5 px-5 transition-all duration-200 transform ${
                    isActive(link.to)
                      ? "text-primary bg-primary/5 border-l-[3px] border-l-primary"
                      : "text-foreground hover:bg-accent border-l-[3px] border-l-transparent"
                  } ${!isLast ? "border-b border-border" : ""} ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 50}ms`
                      : "0ms",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div
            className={`mt-4 transform transition-all duration-200 ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${navLinks.length * 50}ms`
                : "0ms",
            }}
          >
            <Button asChild className="w-full" size="lg">
              <Link
                to="/training-konfigurator"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Training konfigurieren
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
