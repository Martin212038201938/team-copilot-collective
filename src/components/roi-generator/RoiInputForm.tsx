import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  roiInputFormSchema,
  RoiInputFormValues,
  RoiInputFormParsed,
  ROI_INPUT_DEFAULTS,
  parseRoiInputForm,
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
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="roi-companyName">Unternehmensname</Label>
          <Input id="roi-companyName" placeholder="z. B. Musterfirma GmbH" aria-describedby="roi-companyName-error" {...register("companyName")} />
          {errors.companyName && (
            <p id="roi-companyName-error" className="text-sm text-destructive">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="roi-users">Geplante Copilot-Nutzer</Label>
          <Input id="roi-users" inputMode="numeric" aria-describedby="roi-users-help roi-users-error" {...register("users")} />
          <p id="roi-users-help" className="text-xs text-muted-foreground">Personen, die Lizenz und Qualifizierung erhalten.</p>
          {errors.users && <p id="roi-users-error" className="text-sm text-destructive">{errors.users.message as string}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="roi-hourlyCost">Vollkosten-Stundensatz (€)</Label>
          <Input id="roi-hourlyCost" inputMode="decimal" aria-describedby="roi-hourlyCost-help roi-hourlyCost-error" {...register("hourlyCostEur")} />
          <p id="roi-hourlyCost-help" className="text-xs text-muted-foreground">Personalkosten inkl. Lohnnebenkosten und Gemeinkosten.</p>
          {errors.hourlyCostEur && <p id="roi-hourlyCost-error" className="text-sm text-destructive">{errors.hourlyCostEur.message as string}</p>}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="roi-license">Lizenzpreis pro Nutzer/Monat (€)</Label>
          <Input id="roi-license" inputMode="decimal" aria-describedby="roi-license-help roi-license-error" {...register("licensePerUserMonthEur")} />
          <p id="roi-license-help" className="text-xs text-muted-foreground">Tatsächlichen Vertragspreis eintragen.</p>
          {errors.licensePerUserMonthEur && <p id="roi-license-error" className="text-sm text-destructive">{errors.licensePerUserMonthEur.message as string}</p>}
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
