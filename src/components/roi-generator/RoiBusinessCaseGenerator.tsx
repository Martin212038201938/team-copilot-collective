import { useState } from "react";
import RoiInputForm from "./RoiInputForm";
import RoiInputFormSkeleton from "./RoiInputFormSkeleton";
import RoiResultPreview from "./RoiResultPreview";
import RoiDeliveryForm from "./RoiDeliveryForm";
import { calculateRoiBusinessCase } from "@/lib/roi/calculate";
import type { RoiBusinessCase } from "@/lib/roi/types";
import type { RoiInputFormParsed } from "@/lib/roi/roiGeneratorSchema";
import { useHydrated } from "@/hooks/use-hydrated";

/**
 * Orchestriert den ROI-Business-Case-Generator: Eingabe → sofortige, ungegatete
 * Ergebnisvorschau (rein client-seitig) → optionale Präsentationsangaben + E-Mail,
 * erst danach wird die editierbare PowerPoint gebaut und ausgeliefert (siehe
 * RoiDeliveryForm / api/roi-deliver.php für den "echten Honeypot"-Ablauf).
 */
const RoiBusinessCaseGenerator = () => {
  const [businessCase, setBusinessCase] = useState<RoiBusinessCase | null>(null);
  const [m365Users, setM365Users] = useState(0);
  // Die Eingabemaske erscheint erst, wenn React die vorgerenderte Seite übernommen hat.
  // Vorher stünde dort ein Feld, das Eingaben annimmt und sie beim Hydratisieren verliert.
  const hydrated = useHydrated();

  const handleCalculated = (values: RoiInputFormParsed) => {
    const bc = calculateRoiBusinessCase({
      companyName: values.companyName,
      users: values.users,
      m365Users: values.m365Users,
      hourlyCostEur: values.hourlyCostEur,
      licensePerUserMonthEur: values.licensePerUserMonthEur,
    });
    setM365Users(values.m365Users);
    setBusinessCase(bc);
  };

  return (
    <div className="space-y-6">
      <p className="text-base leading-relaxed text-muted-foreground">
        Wenige Angaben genügen. Sie erhalten zwei Dateien: eine editierbare Präsentation als
        Entscheidungsvorlage für Ihr Unternehmen und die Excel mit dem vollständigen Rechenmodell,
        in der Sie alle Parameter selbst variieren können.
      </p>

      {hydrated ? <RoiInputForm onCalculated={handleCalculated} /> : <RoiInputFormSkeleton />}

      {businessCase && (
        <>
          <RoiResultPreview businessCase={businessCase} />
          <RoiDeliveryForm businessCase={businessCase} m365Users={m365Users} />
        </>
      )}
    </div>
  );
};

export default RoiBusinessCaseGenerator;
