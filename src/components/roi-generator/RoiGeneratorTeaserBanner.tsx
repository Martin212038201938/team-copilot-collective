import { FileSpreadsheet, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Prominenter Teaser ganz oben im Artikel (Platzierung laut Nutzerentscheidung).
 * Die vollständige Eingabemaske (RoiBusinessCaseGenerator) bleibt an der im Konzept
 * vorgesehenen Stelle nach den zwei ROI-Szenarien — dieser Banner springt per Anchor dorthin.
 */
const RoiGeneratorTeaserBanner = () => {
  const scrollToGenerator = () => {
    document.getElementById("business-case-generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-orange-500/10 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      <div className="flex-shrink-0 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/15">
        <FileSpreadsheet className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg">Ihren eigenen Copilot Business Case als PowerPoint erstellen</p>
        <p className="text-sm text-muted-foreground">
          Vier Angaben genügen — Sie erhalten eine editierbare Management-Präsentation mit Kosten, Nutzen, ROI und Break-even.
        </p>
      </div>
      <Button onClick={scrollToGenerator} size="lg" className="whitespace-nowrap">
        Jetzt berechnen
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default RoiGeneratorTeaserBanner;
