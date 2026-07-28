// Feste, geprüfte Annahmen des ROI-Modells (Konzept Abschnitt 6.2).
// Änderungen hier wirken sich auf Website, PowerPoint und Tests gleichermaßen aus –
// deshalb ist ASSUMPTIONS_VERSION bei inhaltlichen Änderungen zwingend zu erhöhen.

export const ROI_ASSUMPTIONS = {
  horizonMonths: 36,
  realisticTargetHoursPerMonth: 8,
  studyNearTargetHoursPerMonth: 9,
  economicRealizationRate: 0.5,
  rampStartShare: 0.6,
  rampGapHalfLifeMonths: 2,

  trainingGroupSize: 12,
  kickoffPerGroupEur: 1800,
  learningJourneySessions: 4,
  learningJourneySessionPerGroupEur: 800,
  followUpTrainingShareYear2: 0.5,
  followUpTrainingShareYear3: 0.5,

  itBaseEur: 2500,
  itTier1MaxUsers: 50,
  itTier1PerUserEur: 150,
  itTier2MaxUsers: 250,
  itTier2PerUserEur: 75,
  itTier3MaxUsers: 1000,
  itTier3PerUserEur: 40,
  itTier4PerUserEur: 20,

  changeAndAdoptionRate: 0.12,
} as const;

export const ASSUMPTIONS_VERSION = "roi-v2-2026-07";
