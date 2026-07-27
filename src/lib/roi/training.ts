import { ROI_ASSUMPTIONS } from "./assumptions";

export type TrainingResult = {
  groups: number;
  fullGroupCostEur: number;
  /** 416,67 € — Vergleichswert bei voll belegter Zwölfergruppe. Immer zusätzlich zum individuellen Wert anzeigen. */
  fullGroupCostPerSeatEur: number;
  /** Tatsächliche Kosten pro eingeplanter Person – kann höher liegen, wenn die letzte Gruppe nicht voll belegt ist. */
  actualCostPerUserYear1Eur: number;
  year1Eur: number;
  year2Eur: number;
  year3Eur: number;
};

/**
 * Trainingskosten nach dem Copilotenschule-Lernreise-Modell (Konzept Abschnitt 6.3).
 * 1.800 € Kick-off + 4 × 800 € Lernreise = 5.000 € pro Gruppe von bis zu 12 Personen.
 * Jahr 2 und 3 jeweils 50 % von Jahr 1 (fortlaufende Weiterbildung).
 */
export function calculateTraining(users: number): TrainingResult {
  const {
    trainingGroupSize,
    kickoffPerGroupEur,
    learningJourneySessions,
    learningJourneySessionPerGroupEur,
    followUpTrainingShareYear2,
    followUpTrainingShareYear3,
  } = ROI_ASSUMPTIONS;

  const fullGroupCostEur = kickoffPerGroupEur + learningJourneySessions * learningJourneySessionPerGroupEur;
  const fullGroupCostPerSeatEur = fullGroupCostEur / trainingGroupSize;

  const groups = Math.ceil(users / trainingGroupSize);
  const year1Eur = groups * fullGroupCostEur;
  const year2Eur = year1Eur * followUpTrainingShareYear2;
  const year3Eur = year1Eur * followUpTrainingShareYear3;
  const actualCostPerUserYear1Eur = users > 0 ? year1Eur / users : 0;

  return {
    groups,
    fullGroupCostEur,
    fullGroupCostPerSeatEur,
    actualCostPerUserYear1Eur,
    year1Eur,
    year2Eur,
    year3Eur,
  };
}
