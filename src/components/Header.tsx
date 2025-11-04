import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CS</span>
            </div>
            <span className="text-xl font-bold text-foreground">copilotenschule.de</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("trainings")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Trainings
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Unser Team
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Vorteile
            </button>
            <Button onClick={() => scrollToSection("contact")}>
              Anfrage stellen
            </Button>
          </div>

          <Button
            onClick={() => scrollToSection("contact")}
            className="md:hidden"
            size="sm"
          >
            Kontakt
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;