import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

/**
 * 404-Seite (Route "*")
 *
 * Bewusst minimal/eigenständig (ohne Header/Footer): Die beigefügte Illustration
 * transportiert die 404-Botschaft komplett selbst ("Ups! Diese Seite gibt's
 * leider nicht."). Sichtbarer Text gibt es daher keinen – die einzige Textzeile
 * "404 - Not Found" ist nur als H1 für Screenreader/SEO vorhanden (sr-only).
 *
 * Wegweiser: Startseite + Trainings.
 * SEO: noindex/nofollow, damit die Fehlerseite nicht in den Index gerät.
 * Bild: optimiert (WebP ~67 KB, 800 px) mit JPG-Fallback via <picture>.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404: Aufruf einer nicht existierenden Route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Helmet>
        <title>404 - Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Einzige Textzeile – nur für Screenreader/SEO, optisch spricht das Bild */}
      <h1 className="sr-only">404 - Not Found</h1>

      <picture>
        <source srcSet="/images/404-roboter.webp" type="image/webp" />
        <img
          src="/images/404-roboter.jpg"
          width={800}
          height={603}
          alt="Ups! Diese Seite gibt's leider nicht – humorvolle Illustration: ein müder Mensch schläft am Schreibtisch, ein fauler KI-Roboter trinkt Kaffee, die Seite wurde nie fertiggebaut."
          className="w-full max-w-xl h-auto rounded-2xl shadow-lg"
        />
      </picture>

      {/* Wegweiser */}
      <nav
        aria-label="Wegweiser"
        className="mt-8 flex flex-col sm:flex-row items-center gap-3"
      >
        <Button asChild size="lg">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Zur Startseite
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/trainings">
            Zu den Trainings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </nav>
    </div>
  );
};

export default NotFound;
