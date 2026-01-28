import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src="/images/copilotenschule_flugzeug.png" alt="Copilotenschule Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              Spezialisierte Weiterbildungen für Microsoft Copilot.
              Praxisorientierte Trainings für Wissensarbeiter, Teams und Organisationen.
            </p>
            <p className="text-muted-foreground text-xs">
              Eine Marke der{" "}
              <a href="https://yellow-boat.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Yellow-Boat Consulting
              </a>{" "}
              (gegr. 2011)
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Trainings</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#trainings" className="hover:text-primary transition-colors">KI Basistraining</a></li>
              <li><a href="#trainings" className="hover:text-primary transition-colors">Strategie Workshop</a></li>
              <li><a href="#trainings" className="hover:text-primary transition-colors">EU AI Act Compliance</a></li>
              <li><a href="#trainings" className="hover:text-primary transition-colors">Advanced Training</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/ueber-uns" className="hover:text-primary transition-colors">Über uns</Link></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Vorteile</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Kontakt</a></li>
              <li><a href="https://yellow-boat.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Yellow-Boat Consulting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:info@copilotenschule.de" className="hover:text-primary transition-colors">info@copilotenschule.de</a></li>
              <li><a href="tel:+4922195018774" className="hover:text-primary transition-colors">+49 221 950 187 74</a></li>
              <li>Deutschlandweit</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 copilotenschule.de – Eine Marke der{" "}
            <a href="https://yellow-boat.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Yellow-Boat Consulting</a>.
            Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/ueber-uns" className="hover:text-primary transition-colors">Über uns</Link>
            <Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link>
            <Link to="/impressum" className="hover:text-primary transition-colors">Datenschutz</Link>
            <Link to="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;