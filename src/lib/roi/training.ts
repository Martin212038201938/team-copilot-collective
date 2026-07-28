import { ROI_ASSUMPTIONS } from "./assumptions";

export type TrainingSegmentResult = {
  users: number;
  groups: number;
  fullGroupCostEur: number;
  /** Vergleichswert bei voll belegter Zwölfergruppe. Immer zusätzlich zum individuellen Wert anzeigen. */
  fullGroupCostPerSeatEur: number;
  /** Tatsächliche Kosten pro eingeplanter Person – kann höher liegen, wenn die letzte Gruppe nicht voll belegt ist. */
  actualCostPerUserYear1Eur: number;
  year1Eur: number;
  year2Eur: number;
  year3Eur: number;
};

export type TrainingResult = {
  /** Nutzer mit Copilot-Lizenz (Pro): Kick-off + 4 Lernreise-Termine je Gruppe, Folgejahre 2/3. */
  licensed: TrainingSegmentResult;
  /** Nutzer ohne Lizenz (nur Copilot Chat): ausschließlich Kick-off je Gruppe, kein Folgejahr. */
  chat: TrainingSegmentResult;
  /** Summe der Gruppen über beide Segmente. */
  groups: number;
  /** Referenzwert volle Gruppe im Lizenz-Segment (Kick-off + 4× Lernreise) — für die Standard-Erklärtexte. */
  fullGroupCostEur: number;
  fullGroupCostPerSeatEur: number;
  /** Blendeter Wert über beide Segmente (Gesamtkosten Jahr 1 / alle geschulten Personen). */
  actualCostPerUserYear1Eur: number;
  year1Eur: number;
  year2Eur: number;
  year3Eur: number;
};

function calculateTrainingSegment(
  users: number,
  costPerGroupEur: number,
  followUpShareYear2: number,
  followUpShareYear3: number
): TrainingSegmentResult {
  const { trainingGroupSize } = ROI_ASSUMPTIONS;

  const fullGroupCostEur = costPerGroupEur;
  const fullGroupCostPerSeatEur = fullGroupCostEur / trainingGroupSize;

  const groups = users > 0 ? Math.ceil(users / trainingGroupSize) : 0;
  const year1Eur = groups * costPerGroupEur;
  const year2Eur = year1Eur * followUpShareYear2;
  const year3Eur = year1Eur * followUpShareYear3;
  const actualCostPerUserYear1Eur = users > 0 ? year1Eur / users : 0;

  return {
    users,
    groups,
    fullGroupCostEur,
    fullGroupCostPerSeatEur,
    actualCostPerUserYear1Eur,
    year1Eur,
    year2Eur,
    year3Eur,
  };
}

/**
 * Trainingskosten nach dem Copilotenschule-Lernreise-Modell (Konzept Abschnitt 6.3), getrennt
 * nach Lizenzstatus:
 *
 *  - Lizenzierte Nutzer (Microsoft 365 Copilot / "Pro"): 1.800 € Kick-off + 4 × 800 € Lernreise
 *    = 5.000 € je Gruppe von bis zu 12 Personen. Jahr 2 und 3 jeweils 50 % von Jahr 1
 *    (fortlaufende Weiterbildung).
 *  - Nutzer ohne Lizenz (nur Copilot Chat): ausschließlich 1.800 € Kick-off je Gruppe von bis zu
 *    12 Personen. Einmaliges Onboarding — kein Folgejahr in Jahr 2/3.
 *
 * Beide Nutzergruppen werden UNABHÄNGIG voneinander auf volle 12er-Gruppen aufgerundet
 * (kein gemeinsames Pooling der Gruppengröße), da es sich um unterschiedliche Leistungsumfänge
 * handelt.
 */
export function calculateTraining(licensedUsers: number, chatUsers: number): TrainingResult {
  const {
    kickoffPerGroupEur,
    learningJourneySessions,
    learningJourneySessionPerGroupEur,
    followUpTrainingShareYear2,
    followUpTrainingShareYear3,
  } = ROI_ASSUMPTIONS;

  const licensedGroupCostEur = kickoffPerGroupEur + learningJourneySessions * learningJourneySessionPerGroupEur;
  const licensed = calculateTrainingSegment(
    licensedUsers,
    licensedGroupCostEur,
    followUpTrainingShareYear2,
    followUpTrainingShareYear3
  );

  // Chat-User ohne Lizenz: nur Kick-off, keine Lernreise, kein Folgejahr.
  const chat = calculateTrainingSegment(chatUsers, kickoffPerGroupEur, 0, 0);

  const totalUsers = licensedUsers + chatUsers;
  const year1Eur = licensed.year1Eur + chat.year1Eur;
  const year2Eur = licensed.year2Eur + chat.year2Eur;
  const year3Eur = licensed.year3Eur + chat.year3Eur;

  return {
    licensed,
    chat,
    groups: licensed.groups + chat.groups,
    fullGroupCostEur: licensed.fullGroupCostEur,
    fullGroupCostPerSeatEur: licensed.fullGroupCostPerSeatEur,
    actualCostPerUserYear1Eur: totalUsers > 0 ? year1Eur / totalUsers : 0,
    year1Eur,
    year2Eur,
    year3Eur,
  };
}
