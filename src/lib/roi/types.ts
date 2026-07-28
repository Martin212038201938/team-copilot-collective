// ROI Business Case – zentrale Typen
// Einzige Quelle der Wahrheit für Website, PowerPoint und Tests (siehe CLAUDE.md / Konzept Abschnitt 6-7)

export type RoiInputs = {
  companyName: string;
  users: number;
  hourlyCostEur: number;
  licensePerUserMonthEur: number;
};

export type ScenarioId = "realistic" | "studyNear";

export type MonthlyProjection = {
  month: number;
  year: 1 | 2 | 3;
  users: number;
  grossHoursPerUser: number;
  realizedBenefitEur: number;
  licenseCostEur: number;
  trainingCostEur: number;
  itSetupCostEur: number;
  changeCostEur: number;
  totalCostEur: number;
  cumulativeBenefitEur: number;
  cumulativeCostEur: number;
  cumulativeNetBenefitEur: number;
};

export type YearProjection = {
  year: 1 | 2 | 3;
  averageGrossHoursPerUserMonth: number;
  realizedBenefitEur: number;
  licenseCostEur: number;
  trainingCostEur: number;
  itSetupCostEur: number;
  changeCostEur: number;
  totalCostEur: number;
  netBenefitEur: number;
  cumulativeNetBenefitEur: number;
  /** Kumuliertes ROI bis einschließlich diesem Jahr (cumulativeNetBenefit / cumulativeCost). */
  roi: number | null;
};

export type ScenarioResult = {
  id: ScenarioId;
  targetHoursPerUserMonth: number;
  economicRealizationRate: number;
  months: MonthlyProjection[];
  years: YearProjection[];
  totalBenefitEur: number;
  totalCostEur: number;
  netBenefitEur: number;
  roi: number | null;
  /** 1-36, oder null wenn innerhalb von 36 Monaten kein Break-even erreicht wird ("> 36 Monate"). */
  breakEvenMonth: number | null;
};

export type PresentationCopy = {
  executiveSummary: string;
  decisionRecommendation: string;
  valueDrivers: [string, string, string];
  conditions: [string, string, string];
  nextSteps: [string, string, string];
};

export type PresentationOptions = {
  presentationDate: string;
  /** Ansprechpartner (Pflichtangabe im Formular) – erscheint auf der Titelfolie. */
  contactName?: string;
  /** Rolle des Ansprechpartners (optional). */
  contactRole?: string;
  /**
   * Automatisch recherchiertes Logo als Data-URL. Fehlt es, erscheint KEIN Platzhalter –
   * die Titelfolie sieht dann schlicht so aus wie ohne Logo.
   */
  logoDataUrl?: string;
  /** Ein Satz aus der Unternehmensrecherche, optional. */
  companySummary?: string;
  /** Branche – entweder vom Nutzer gewählt oder recherchiert. */
  industry?: string;
  /** Hauptziele der Einführung (Mehrfachauswahl im Formular). */
  goals?: string[];
  /** Aktueller Stand der Copilot-Einführung. */
  adoptionStage?: string;
  /** Gesamtzahl Microsoft-365-Nutzer – reiner Kontext, keine Rechengröße. */
  m365Users?: number;
};

export type RoiBusinessCase = {
  inputs: RoiInputs;
  assumptionsVersion: string;
  generatedAt: string;
  training: {
    groups: number;
    fullGroupCostEur: number;
    fullGroupCostPerSeatEur: number;
    actualCostPerUserYear1Eur: number;
    year1Eur: number;
    year2Eur: number;
    year3Eur: number;
  };
  itSetup: {
    totalEur: number;
    perUserEur: number;
  };
  realistic: ScenarioResult;
  studyNear: ScenarioResult;
};
