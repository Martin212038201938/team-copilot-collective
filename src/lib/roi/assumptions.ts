// Feste, geprüfte Annahmen des ROI-Modells (Konzept Abschnitt 6.2).
// Änderungen hier wirken sich auf Website, PowerPoint und Tests gleichermaßen aus –
// deshalb ist ASSUMPTIONS_VERSION bei inhaltlichen Änderungen zwingend zu erhöhen.

export const ROI_ASSUMPTIONS = {
  horizonMonths: 36,
  realisticTargetHoursPerMonth: 8,
  studyNearTargetHoursPerMonth: 9,

  /**
   * Ziel-Zeitersparnis für Nutzer OHNE Copilot-Lizenz (nur Copilot Chat).
   *
   * Bewusst deutlich niedriger als die 8 bzw. 9 Stunden der Lizenznutzer: Diesen Personen
   * fehlt die Integration in Outlook, Teams, Word und Excel sowie die Verankerung in den
   * eigenen Unternehmensdaten — und genau daraus entsteht der größte Teil der Zeitersparnis.
   * Sie erhalten außerdem nur einen Kick-off statt der vollen Lernreise.
   *
   * In BEIDEN Szenarien identisch: Der Unterschied 8 vs. 9 Stunden stammt aus Studien zu
   * Microsoft 365 Copilot (u. a. Forrester TEI). Diese Belege gelten für lizenzierte Nutzung
   * und lassen sich nicht auf den freien Chat übertragen.
   */
  chatOnlyTargetHoursPerMonth: 2.5,

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

export const ASSUMPTIONS_VERSION = "roi-v3-2026-07";
