import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  roiInputFormSchema,
  RoiInputFormValues,
  RoiInputFormParsed,
  ROI_INPUT_DEFAULTS,
  parseRoiInputForm,
  HOURLY_COST_SOURCE_URL,
  HOURLY_COST_SOURCE_LABEL,
} from "@/lib/roi/roiGeneratorSchema";

type Props = {
  onCalculated: (values: RoiInputFormParsed) => void;
};

const RoiInputForm = ({ onCalculated }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoiInputFormValues>({
    resolver: zodResolver(roiInputFormSchema),
    mode: "onBlur",
    defaultValues: ROI_INPUT_DEFAULTS,
  });

  const onSubmit = (values: RoiInputFormValues) => {
    onCalculated(parseRoiInputForm(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="roi-companyName">Unternehmensname</Label>
        <Input
          id="roi-companyName"
          placeholder="z. B. Musterfirma GmbH"
          autoComplete="organization"
          aria-describedby="roi-companyName-error"
          {...register("companyName")}
        />
        {errors.companyName && (
          <p id="roi-companyName-error" className="text-sm text-destructive">{errors.companyName.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="roi-m365Users">Microsoft-365-Nutzer insgesamt</Label>
          <Input id="roi-m365Users" inputMode="numeric" placeholder="z. B. 250" aria-describedby="roi-m365Users-help roi-m365Users-error" {...register("m365Users")} />
          <p id="roi-m365Users-help" className="text-xs text-muted-foreground">
            Alle Beschäftigten mit Microsoft 365 — sie können Copilot Chat bereits ohne Lizenz nutzen
            und zählen beim Nutzen und beim IT-Setup mit. Wer keine Copilot-Lizenz erhält, wird
            automatisch mit einem einmaligen Kick-off-Workshop eingeplant (ohne Lernreise).
          </p>
          {errors.m365Users && <p id="roi-m365Users-error" className="text-sm text-destructive">{errors.m365Users.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="roi-users">Geplante Copilot-Lizenzen</Label>
          <Input id="roi-users" inputMode="numeric" placeholder="z. B. 50" aria-describedby="roi-users-help roi-users-error" {...register("users")} />
          <p id="roi-users-help" className="text-xs text-muted-foreground">
            Personen, die eine Microsoft-365-Copilot-Lizenz erhalten und die vollständige Lernreise
            (Kick-off + 4 Termine) durchlaufen. Muss kleiner oder gleich der Gesamt-Nutzerzahl sein.
          </p>
          {errors.users && <p id="roi-users-error" className="text-sm text-destructive">{errors.users.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="roi-hourlyCost">Vollkosten-Stundensatz (€)</Label>
          <Input id="roi-hourlyCost" inputMode="decimal" aria-describedby="roi-hourlyCost-help roi-hourlyCost-error" {...register("hourlyCostEur")} />
          <p id="roi-hourlyCost-help" className="text-xs text-muted-foreground">
            Voreingestellt mit dem Durchschnitt für wissensintensive Dienstleistungen.{" "}
            <a
              href={HOURLY_COST_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline inline-flex items-center gap-0.5"
            >
              {HOURLY_COST_SOURCE_LABEL}
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </p>
          {errors.hourlyCostEur && <p id="roi-hourlyCost-error" className="text-sm text-destructive">{errors.hourlyCostEur.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="roi-license">Lizenzpreis pro Nutzer/Monat (€)</Label>
          <Input id="roi-license" inputMode="decimal" aria-describedby="roi-license-help roi-license-error" {...register("licensePerUserMonthEur")} />
          <p id="roi-license-help" className="text-xs text-muted-foreground">
            Listenpreis für Microsoft 365 Copilot — variiert je nach Vertrag und Volumen.
          </p>
          {errors.licensePerUserMonthEur && <p id="roi-license-error" className="text-sm text-destructive">{errors.licensePerUserMonthEur.message}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full md:w-auto">
        Business Case berechnen
      </Button>

      <p className="text-xs text-muted-foreground">
        Ihre Berechnung erfolgt lokal im Browser. Die Ergebnisse sind Planungswerte und kein Wirkungsversprechen.
      </p>
    </form>
  );
};

export default RoiInputForm;
