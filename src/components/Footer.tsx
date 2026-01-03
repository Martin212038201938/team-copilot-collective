import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">CS</span>
              </div>
              <span className="text-xl font-bold">copilotenschule.de</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professionelle Microsoft Copilot Inhouse-Trainings für Ihr Unternehmen.
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
              <li><a href="#team" className="hover:text-primary transition-colors">Unser Team</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Vorteile</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Kontakt</a></li>
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
            © 2025 copilotenschule.de. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link>
            <Link to="/impressum" className="hover:text-primary transition-colors">Datenschutz</Link>
            <a href="#" className="hover:text-primary transition-colors">AGB</a>
            <Link to="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
            <a href="https://yellow-boat.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Mitarbeiter Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;