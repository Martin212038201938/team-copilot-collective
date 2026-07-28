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

/**
 * Schritt 1 – validiert nur die rohen Eingabe-Strings (deutsches Zahlenformat).
 * Die numerische Umwandlung erfolgt separat in parseRoiInputForm(), damit react-hook-form
 * und zodResolver ohne Input/Output-Transforms auskommen.
 *
 * Pflichtfelder: Unternehmensname, Microsoft-365-Nutzer, geplante Copilot-Lizenzen.
 * Stundensatz und Lizenzpreis sind vorbelegt und editierbar, aber keine Pflichtangabe
 * im Sinne von "leer lassen verboten" – sie haben belastbare Defaults.
 */
export const roiInputFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie den Unternehmensnamen ein (mind. 2 Zeichen).")
    .max(80, "Unternehmensname: maximal 80 Zeichen."),
  m365Users: germanNumberString(1, 1000000, "Anzahl Microsoft-365-Nutzer"),
  users: germanNumberString(1, 100000, "Geplante Copilot-Lizenzen"),
  hourlyCostEur: germanNumberString(10, 500, "Vollkosten-Stundensatz"),
  licensePerUserMonthEur: germanNumberString(0, 500, "Lizenzpreis pro Nutzer/Monat"),
});

export type RoiInputFormValues = z.infer<typeof roiInputFormSchema>;

export type RoiInputFormParsed = {
  companyName: string;
  /** Geplante Copilot-Lizenzen – das ist die Rechengröße der ROI-Formeln. */
  users: number;
  /** Gesamtzahl Microsoft-365-Nutzer – nur Kontext, keine Rechengröße. */
  m365Users: number;
  hourlyCostEur: number;
  licensePerUserMonthEur: number;
};

export function parseRoiInputForm(values: RoiInputFormValues): RoiInputFormParsed {
  return {
    companyName: values.companyName,
    users: Math.round(parseGermanNumber(values.users) ?? 0),
    m365Users: Math.round(parseGermanNumber(values.m365Users) ?? 0),
    hourlyCostEur: parseGermanNumber(values.hourlyCostEur) ?? 0,
    licensePerUserMonthEur: parseGermanNumber(values.licensePerUserMonthEur) ?? 0,
  };
}

/**
 * Vollkosten-Stundensatz: 42,10 € entspricht den Arbeitskosten je geleisteter Stunde im
 * Bereich marktbestimmte Dienstleistungen (Wirtschaftsabschnitte G–N) laut Statistischem
 * Bundesamt für 2024 – eine belastbare Näherung für Büro-/White-Collar-Tätigkeiten.
 */
export const DEFAULT_HOURLY_COST_EUR = "42,10";
export const HOURLY_COST_SOURCE_URL =
  "https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/04/PD25_154_624.html";
export const HOURLY_COST_SOURCE_LABEL = "Quelle: Statistisches Bundesamt, Arbeitskosten 2024";

/** Listenpreis Microsoft 365 Copilot pro Nutzer und Monat; variiert je nach Vertrag. */
export const DEFAULT_LICENSE_EUR = "26";

export const ROI_INPUT_DEFAULTS: RoiInputFormValues = {
  companyName: "",
  m365Users: "",
  users: "",
  hourlyCostEur: DEFAULT_HOURLY_COST_EUR,
  licensePerUserMonthEur: DEFAULT_LICENSE_EUR,
};
