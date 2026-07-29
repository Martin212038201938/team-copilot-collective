import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import type { RoiBusinessCase } from "@/lib/roi/types";
import { formatEur, formatPercent, formatBreakEven } from "@/lib/roi/format";
import { cn } from "@/lib/utils";

type Props = {
  businessCase: RoiBusinessCase;
};

function roiTextColorClass(roi: number | null): string {
  if (roi === null) return "text-muted-foreground";
  if (roi > 0) return "text-green-700 dark:text-green-400";
  if (roi < 0) return "text-red-700 dark:text-red-400";
  return "text-muted-foreground";
}

function roiStatusLabel(roi: number | null): string {
  if (roi === null) return "";
  if (roi > 0) return "positiv";
  if (roi < 0) return "negativ";
  return "Break-even";
}

/**
 * Ergebnisvorschau nach der Berechnung.
 *
 * Bewusst nur die Eckwerte: ROI, Break-even und die beiden Summen. Die vollständige
 * Aufschlüsselung nach Kostenblöcken, Trainingsgruppen und IT-Setup steckt in den beiden
 * Dateien und ist damit dem Download vorbehalten — genau dafür gibt der Interessent seine
 * E-Mail-Adresse und die Einwilligung.
 */
const RoiResultPreview = ({ businessCase }: Props) => {
  const { inputs, realistic } = businessCase;
  const year1 = realistic.years[0];

  const kpis = [
    { label: "Investition Jahr 1", value: formatEur(year1.totalCostEur) },
    { label: "Realisierter Nutzen Jahr 1", value: formatEur(year1.realizedBenefitEur) },
    { label: "Break-even", value: formatBreakEven(realistic.breakEvenMonth) },
  ];

  return (
    <div className="space-y-6" aria-live="polite">
      <Card className="border-2 border-primary/30">
        <CardHeader>
          <CardTitle>Ihr Business Case für {inputs.companyName || "Ihr Unternehmen"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">ROI Jahr 1 (realistisches Szenario)</p>
              <p className={cn("text-3xl font-bold", roiTextColorClass(year1.roi))}>
                {formatPercent(year1.roi)}{" "}
                <span className="text-base font-normal">({roiStatusLabel(year1.roi)})</span>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">ROI über 3 Jahre (realistisches Szenario)</p>
              <p className={cn("text-3xl font-bold", roiTextColorClass(realistic.roi))}>
                {formatPercent(realistic.roi)}{" "}
                <span className="text-base font-normal">({roiStatusLabel(realistic.roi)})</span>
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="p-3 rounded border">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-lg font-semibold">{kpi.value}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>ROI &gt; 0 %:</strong> Der realisierte Nutzen ist höher als die Kosten — es entsteht ein Netto-Nutzen.{" "}
            <strong>ROI = 0 %:</strong> Nutzen und Kosten sind gleich hoch (Break-even).{" "}
            <strong>ROI &lt; 0 %:</strong> Der realisierte Nutzen deckt die Kosten im betrachteten Zeitraum noch nicht.
          </p>

          {/* Was hinter der Schwelle liegt – transparent benannt, ohne die Werte zu zeigen. */}
          <div className="rounded-lg border border-dashed bg-muted/30 p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Lock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              In den Dateien: die vollständige Aufschlüsselung
            </p>
            <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
              <li>Kosten nach Lizenzen, Training, IT-Setup und Change</li>
              <li>Trainingsgruppen und Kosten je Person</li>
              <li>Monat-für-Monat-Verlauf über 36 Monate</li>
              <li>Vergleich mit dem Forrester-TEI-Szenario</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoiResultPreview;
