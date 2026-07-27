import { z } from "zod";
import { parseGermanNumber } from "./parseGermanNumber";

function germanNumberString(min: number, max: number, label: string) {
  return z.string().min(1, `${label} ist ein Pflichtfeld.`).refine(
    (val) => {
      const parsed = parseGermanNumber(val);
      return parsed !== null && parsed >= min && parsed <= max;
    },
    { message: `${label}: bitte einen gültigen Wert zwischen ${min} und ${max} eingeben (z. B. 50 oder 1.250,50).` }
  );
}

/** Validiert nur die rohen Eingabe-Strings (deutsches Zahlenformat). Numerische Umwandlung
 * erfolgt separat in parseRoiInputForm(), damit react-hook-form + zodResolver ohne die
 * Typkomplikationen von Input/Output-Transforms auskommen. */
export const roiInputFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie den Unternehmensnamen ein (mind. 2 Zeichen).")
    .max(80, "Unternehmensname: maximal 80 Zeichen."),
  users: germanNumberString(1, 100000, "Geplante Copilot-Nutzer"),
  hourlyCostEur: germanNumberString(10, 500, "Vollkosten-Stundensatz"),
  licensePerUserMonthEur: germanNumberString(0, 500, "Lizenzpreis pro Nutzer/Monat"),
});

export type RoiInputFormValues = z.infer<typeof roiInputFormSchema>;

export type RoiInputFormParsed = {
  companyName: string;
  users: number;
  hourlyCostEur: number;
  licensePerUserMonthEur: number;
};

/** Wandelt die validierten String-Werte in die numerischen Rechen-Eingaben um. */
export function parseRoiInputForm(values: RoiInputFormValues): RoiInputFormParsed {
  return {
    companyName: values.companyName,
    users: Math.round(parseGermanNumber(values.users) ?? 0),
    hourlyCostEur: parseGermanNumber(values.hourlyCostEur) ?? 0,
    licensePerUserMonthEur: parseGermanNumber(values.licensePerUserMonthEur) ?? 0,
  };
}

export const ROI_INPUT_DEFAULTS: RoiInputFormValues = {
  companyName: "",
  users: "50",
  hourlyCostEur: "50",
  licensePerUserMonthEur: "26",
};
