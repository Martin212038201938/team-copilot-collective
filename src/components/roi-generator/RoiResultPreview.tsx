import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoiBusinessCase } from "@/lib/roi/types";
import { formatEur, formatEurCents, formatPercent, formatBreakEven } from "@/lib/roi/format";
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

const RoiResultPreview = ({ businessCase }: Props) => {
  const { inputs, realistic, studyNear, training, itSetup } = businessCase;
  const year1 = realistic.years[0];

  const kpis = [
    { label: "Gesamtkosten Jahr 1", value: formatEur(year1.totalCostEur) },
    { label: "Realisierter Nutzen Jahr 1", value: formatEur(year1.realizedBenefitEur) },
    { label: "Break-even", value: formatBreakEven(realistic.breakEvenMonth) },
    { label: "Gesamtkosten 3 Jahre", value: formatEur(realistic.totalCostEur) },
    { label: "Netto-Nutzen 3 Jahre", value: formatEur(realistic.netBenefitEur) },
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

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
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

          <div className="border-t pt-4 space-y-2 text-sm">
            <p>
              Trainingskosten Jahr 1 gesamt: <strong>{formatEur(training.year1Eur)}</strong> über{" "}
              <strong>{training.groups}</strong> Gruppe{training.groups === 1 ? "" : "n"}.
            </p>
            <p>
              <strong>{training.licensed.users}</strong> Lizenz-Nutzer in <strong>{training.licensed.groups}</strong> Gruppe
              {training.licensed.groups === 1 ? "" : "n"} (Kick-off + Lernreise):{" "}
              <strong>{formatEur(training.licensed.year1Eur)}</strong> · davon{" "}
              <strong>{formatEurCents(training.licensed.actualCostPerUserYear1Eur)}</strong> je eingeplanter Person
              (Vergleichswert bei voll belegter Zwölfergruppe: {formatEurCents(training.licensed.fullGroupCostPerSeatEur)}).
            </p>
            {training.chat.users > 0 && (
              <p>
                <strong>{training.chat.users}</strong> Chat-Nutzer ohne Lizenz in <strong>{training.chat.groups}</strong>{" "}
                Gruppe{training.chat.groups === 1 ? "" : "n"} (nur Kick-off, keine Lernreise, kein Folgejahr):{" "}
                <strong>{formatEur(training.chat.year1Eur)}</strong> · davon{" "}
                <strong>{formatEurCents(training.chat.actualCostPerUserYear1Eur)}</strong> je eingeplanter Person.
              </p>
            )}
            <p>
              IT-Setup gesamt: <strong>{formatEur(itSetup.totalEur)}</strong> ({formatEur(itSetup.perUserEur)} je Nutzer,
              berechnet über alle {inputs.m365Users} Microsoft-365-Nutzer).
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-1">Vergleich: studiennahes Szenario (9 Std./Monat Zielwert)</p>
            <p className="text-sm">
              Nutzen Jahr 1: <strong>{formatEur(studyNear.years[0].realizedBenefitEur)}</strong> · ROI Jahr 1:{" "}
              <strong className={roiTextColorClass(studyNear.years[0].roi)}>{formatPercent(studyNear.years[0].roi)}</strong> · ROI 3 Jahre:{" "}
              <strong className={roiTextColorClass(studyNear.roi)}>{formatPercent(studyNear.roi)}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoiResultPreview;
