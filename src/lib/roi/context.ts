/**
 * Kontextangaben rund um den Business Case.
 *
 * WICHTIG: Diese Werte fließen NICHT in die Berechnung ein (src/lib/roi/calculate.ts bleibt
 * unverändert). Sie dienen ausschließlich der Personalisierung der Standardfolien und der
 * Lead-Qualifizierung. Die Folienstruktur bleibt in jedem Fall identisch – es werden keine
 * Folien abhängig von diesen Angaben ein- oder ausgeblendet.
 */

export const ROI_INDUSTRIES = [
  "Industrie",
  "Handel",
  "Gesundheitswesen",
  "Hotellerie",
  "Öffentliche Verwaltung",
  "Dienstleistung",
  "Sonstige",
] as const;
export type RoiIndustry = (typeof ROI_INDUSTRIES)[number];

export const ROI_GOALS = [
  "Produktivität steigern",
  "Mitarbeitende entlasten",
  "Qualität verbessern",
  "Innovation fördern",
  "KI sicher einführen",
  "Agenten vorbereiten",
] as const;
export type RoiGoal = (typeof ROI_GOALS)[number];

export const ROI_ADOPTION_STAGES = [
  "Erste Orientierung",
  "Business Case erstellen",
  "Pilot geplant",
  "Pilot läuft",
  "Rollout geplant",
  "Copilot bereits im Einsatz",
] as const;
export type RoiAdoptionStage = (typeof ROI_ADOPTION_STAGES)[number];

export type RoiContext = {
  /** Pflicht: Name des Ansprechpartners. Erscheint auf der Titelfolie. */
  contactName: string;
  /** Optional: Rolle/Funktion des Ansprechpartners. */
  contactRole?: string;
  /**
   * Pflicht: Gesamtzahl der Microsoft-365-Nutzer (Copilot-Chat-Basis).
   * Bewusst KEINE Rechengröße – dient der Einordnung, wie groß der Anteil der geplanten
   * Copilot-Lizenzen an der Gesamtbelegschaft ist.
   */
  m365Users: number;
  industry?: RoiIndustry;
  goals: RoiGoal[];
  adoptionStage?: RoiAdoptionStage;
};

/**
 * Anteil der geplanten Copilot-Lizenzen an allen Microsoft-365-Nutzern.
 * Reine Darstellungsgröße für die Folien, kein Eingang in die ROI-Formeln.
 */
export function licenseCoverageShare(copilotLicenses: number, m365Users: number): number | null {
  if (!m365Users || m365Users <= 0) return null;
  return copilotLicenses / m365Users;
}
