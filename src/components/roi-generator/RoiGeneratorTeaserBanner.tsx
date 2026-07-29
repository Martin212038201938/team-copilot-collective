import { FileSpreadsheet, Presentation, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Prominenter Einstieg weit oben im Artikel — analog zum Kontaktformular, das ebenfalls
 * an mehreren Stellen auftaucht. Die vollständige Eingabemaske bleibt zusätzlich an der
 * im Konzept vorgesehenen Stelle nach den ROI-Szenarien; dieser Block springt dorthin.
 */
const RoiGeneratorTeaserBanner = () => {
  const scrollToGenerator = () => {
    document.getElementById("business-case-generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-orange-500/10 p-6 md:p-8">
      <p className="text-lg md:text-xl font-bold mb-2">
        Editierbare PowerPoint und Excel für Ihr Unternehmen erstellen
      </p>
      <p className="text-sm md:text-base text-muted-foreground mb-5">
        Wenige Angaben genügen — Sie erhalten beide Dateien per E-Mail-Link.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="flex gap-3">
          <Presentation className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Die Präsentation</strong> ist als Entscheidungsvorlage
            angelegt: Sie führt Geschäftsführung, Budgetverantwortliche und Steering Committee durch
            Kosten, Nutzen und Annahmen — und lässt sich frei bearbeiten.
          </p>
        </div>
        <div className="flex gap-3">
          <FileSpreadsheet className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Die Excel</strong> enthält das vollständige Rechenmodell.
            Sie können Nutzerzahlen, Stundensatz und Lizenzpreis selbst variieren und sehen sofort,
            wie sich ROI und Break-even verändern.
          </p>
        </div>
      </div>

      <Button onClick={scrollToGenerator} size="lg" className="w-full sm:w-auto">
        Jetzt berechnen
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default RoiGeneratorTeaserBanner;
