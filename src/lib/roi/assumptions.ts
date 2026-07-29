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

  /**
   * IT-Setup und Einführung.
   *
   * Was hier abgedeckt ist (Tenant-Readiness vor dem Copilot-Rollout): Lizenz- und
   * Berechtigungsprüfung, Oversharing-Bereinigung in SharePoint und OneDrive,
   * Sensitivity Labels in Purview, EU Data Boundary, externe Sharing-Links sowie
   * Conditional Access in Entra ID.
   *
   * Kalibrierung: Der Aufwand wird in Beratungstagen gedacht und mit rund 800 € je Tag
   * bewertet — bewusst am unteren Rand der Marktspanne. Der Freelancer-Kompass 2025
   * weist für IT-Freiberufler im DACH-Raum durchschnittlich 105 €/Stunde aus, also etwa
   * 840 € je Achtstundentag; die übliche Spanne reicht von 85 bis 140 €/Stunde.
   *
   * Bis einschließlich 15 Personen fällt kein separater Posten an: In Tenants dieser
   * Größe erledigt die IT das nebenher, ein eigenes Projekt wäre nicht ehrlich.
   * Darüber wächst der Aufwand mit der Zahl der Postfächer, Teams und SharePoint-Sites,
   * nicht linear mit der Kopfzahl — daher die degressive Staffel.
   *
   * Ergebnis der Staffel (gerundet, in Beratungstagen à 800 €):
   *    15 Personen ->      0 €   (0 Tage)
   *    25 Personen ->    600 €   (~0,8 Tage)
   *    50 Personen ->  2.100 €   (~2,6 Tage)
   *   250 Personen ->  7.100 €   (~9 Tage)
   * 1.000 Personen -> 16.100 €   (~20 Tage)
   * 5.000 Personen -> 40.100 €   (~50 Tage)
   */
  itFreeUpToUsers: 15,
  itBaseEur: 0,
  itTier1MaxUsers: 50,
  itTier1PerUserEur: 60,
  itTier2MaxUsers: 250,
  itTier2PerUserEur: 25,
  itTier3MaxUsers: 1000,
  itTier3PerUserEur: 12,
  itTier4PerUserEur: 6,

  changeAndAdoptionRate: 0.12,
} as const;

export const ASSUMPTIONS_VERSION = "roi-v4-2026-07";
