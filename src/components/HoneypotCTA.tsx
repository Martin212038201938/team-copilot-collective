import { Link } from "react-router-dom";
import { Download, ArrowRight } from "lucide-react";
import { getGuide } from "@/data/guides";

interface HoneypotCTAProps {
  /** id des Guides aus src/data/guides.ts */
  guideId: string;
  /** Optionaler eigener Einleitungssatz statt der Standard-Beschreibung */
  intro?: string;
}

/**
 * Kompakte CTA-Box, die aus einem Artikel heraus auf eine Guide-Landingpage
 * (/guidelines/<id>) verlinkt. Wird in thematisch passende (v.a. admin-gerichtete)
 * Artikel eingebettet. Enthält bewusst KEIN Formular – der gated Download liegt
 * zentral auf der Landingpage.
 */
const HoneypotCTA = ({ guideId, intro }: HoneypotCTAProps) => {
  const guide = getGuide(guideId);
  if (!guide) return null;

  return (
    <aside className="not-prose my-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-shrink-0 text-4xl" aria-hidden="true">
          {guide.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 text-sm font-semibold text-primary">
            <Download className="w-4 h-4" />
            Kostenloser Leitfaden
          </div>
          <h3 className="text-lg md:text-xl font-bold mb-1">{guide.shortTitle}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {intro ?? guide.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            to={`/guidelines/${guide.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Zum Leitfaden
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default HoneypotCTA;
