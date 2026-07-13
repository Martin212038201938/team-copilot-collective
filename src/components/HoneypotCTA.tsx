import { Link } from "react-router-dom";
import { Download, ArrowRight } from "lucide-react";
import { getGuide, type GuideData } from "@/data/guides";

interface HoneypotCTAProps {
  /** Einzelner Guide (Kurzform) */
  guideId?: string;
  /** Mehrere Guides – rendert eine kombinierte Box mit einer Zeile pro Leitfaden */
  guideIds?: string[];
  /** Optionaler eigener Einleitungssatz (nur im Einzel-Modus) */
  intro?: string;
  /** Optionale Überschrift der Box (Standard je nach Anzahl) */
  heading?: string;
}

/**
 * CTA-Box, die aus einem Artikel heraus auf eine oder mehrere Guide-Landingpages
 * (/guidelines/<id>) verlinkt. Wird in thematisch passende Artikel eingebettet.
 * Enthält bewusst KEIN Formular – der gated Download liegt zentral auf der Landingpage.
 */
const HoneypotCTA = ({ guideId, guideIds, intro, heading }: HoneypotCTAProps) => {
  const ids = guideIds && guideIds.length > 0 ? guideIds : guideId ? [guideId] : [];
  const guides = ids
    .map((id) => getGuide(id))
    .filter((g): g is GuideData => Boolean(g) && g!.status === "available");

  if (guides.length === 0) return null;

  // Einzel-Modus (kompakte Box mit Button rechts)
  if (guides.length === 1) {
    const guide = guides[0];
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
  }

  // Mehrfach-Modus (kombinierte Box, eine Zeile pro Leitfaden)
  return (
    <aside className="not-prose my-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-primary">
        <Download className="w-4 h-4" />
        {heading ?? "Kostenlose Leitfäden zum Thema"}
      </div>
      <div className="space-y-3">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            to={`/guidelines/${guide.id}`}
            className="group flex items-center gap-4 rounded-xl bg-background/60 border border-primary/15 p-4 hover:border-primary/40 transition-colors"
          >
            <div className="flex-shrink-0 text-3xl" aria-hidden="true">
              {guide.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                {guide.shortTitle}
              </h3>
              <p className="text-xs text-muted-foreground">Für: {guide.audience}</p>
            </div>
            <span className="flex-shrink-0 inline-flex items-center gap-1 text-primary font-semibold whitespace-nowrap">
              Zum Leitfaden
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default HoneypotCTA;
