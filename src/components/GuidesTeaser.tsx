import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_GUIDES, CATEGORY_LABEL, getGuide, type GuideData } from "@/data/guides";

/**
 * Homepage-Teaser für die kostenlosen Leitfäden ("Guidelines und Checklisten").
 *
 * Zeigt drei kuratierte Leitfäden (bewusst je eine andere Zielgruppe: Anwender,
 * Management, IT) und verlinkt auf die Übersicht /guidelines. Die Daten kommen
 * aus der zentralen Registry src/data/guides.ts – neue Leitfäden müssen nur dort
 * gepflegt werden. Fällt eine ID weg, wird automatisch aufgefüllt.
 */

// Kuratierte Reihenfolge für die Startseite
const TEASER_IDS = [
  "copilot-excel-praxishandbuch",
  "copilot-einfuehren-management-leitfaden",
  "copilot-grounding-admin-leitfaden",
];

const GuidesTeaser = () => {
  const curated = TEASER_IDS.map((id) => getGuide(id)).filter(
    (g): g is GuideData => Boolean(g) && g!.status === "available"
  );

  // Auffüllen, falls eine kuratierte ID fehlt oder noch nicht verfügbar ist
  const fallback = ALL_GUIDES.filter(
    (g) => g.status === "available" && !curated.some((c) => c.id === g.id)
  );
  const guides = [...curated, ...fallback].slice(0, 3);
  const total = ALL_GUIDES.filter((g) => g.status === "available").length;

  if (guides.length === 0) return null;

  return (
    <section className="py-16 bg-muted/20 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <Download className="w-4 h-4" />
            {CATEGORY_LABEL}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Kostenlose Praxis-Leitfäden zum Herunterladen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unser Wissen aus über 500 Copilot-Trainings – als PDF-Leitfäden für
            Anwenderinnen und Anwender, Management, Betriebsrat und IT. Ohne Kosten,
            direkt einsatzbereit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              to={`/guidelines/${guide.id}`}
              className="group flex flex-col h-full rounded-xl bg-card border-2 border-border/50 p-6 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-3" aria-hidden="true">
                {guide.icon}
              </div>
              <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                {guide.shortTitle}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                <FileText className="w-3.5 h-3.5" />
                PDF · {guide.pages} Seiten
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {guide.description}
              </p>
              <p className="text-xs text-muted-foreground/80 mb-4">
                Für: {guide.audience}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Zum Leitfaden
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/guidelines">
            <Button variant="outline" size="default" className="group">
              Alle {total} Leitfäden ansehen
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidesTeaser;
