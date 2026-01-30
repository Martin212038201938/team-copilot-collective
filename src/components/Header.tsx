import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/copilotenschule_flugzeug.png" alt="Copilotenschule Logo" className="h-12 w-auto object-contain" />
            <span className="text-xl font-bold text-foreground">Copilotenschule.de</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/ueber-uns"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Über uns
            </Link>
            <Link
              to="/wissen"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Copilot Wissen
            </Link>
            <Link
              to="/unsere-angebote"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Unsere Angebote
            </Link>
            <Link
              to="/trainer-werden"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Trainer werden
            </Link>
            <Button asChild>
              <Link to="/training-konfigurator">Training konfigurieren</Link>
            </Button>
          </div>

          <Button
            asChild
            className="md:hidden"
            size="sm"
          >
            <Link to="/training-konfigurator">Konfigurieren</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
