import { ROI_ASSUMPTIONS } from "./assumptions";

/**
 * Degressiv skalierendes IT-Setup (Konzept Abschnitt 6.4).
 * Fällt nur in Jahr 1 an.
 *
 * Kontrollwerte laut Konzept:
 *  10 Nutzer  ->  4.000 € (400 €/Nutzer)
 *  50 Nutzer  -> 10.000 € (200 €/Nutzer)
 * 300 Nutzer  -> 27.000 €  (90 €/Nutzer)
 * 1.000 Nutzer -> 55.000 € (55 €/Nutzer)
 * 5.000 Nutzer -> 135.000 € (27 €/Nutzer)
 */
export function calculateItSetup(users: number): number {
  const {
    itBaseEur,
    itTier1MaxUsers,
    itTier1PerUserEur,
    itTier2MaxUsers,
    itTier2PerUserEur,
    itTier3MaxUsers,
    itTier3PerUserEur,
    itTier4PerUserEur,
  } = ROI_ASSUMPTIONS;

  return (
    itBaseEur +
    Math.min(users, itTier1MaxUsers) * itTier1PerUserEur +
    Math.max(Math.min(users - itTier1MaxUsers, itTier2MaxUsers - itTier1MaxUsers), 0) * itTier2PerUserEur +
    Math.max(Math.min(users - itTier2MaxUsers, itTier3MaxUsers - itTier2MaxUsers), 0) * itTier3PerUserEur +
    Math.max(users - itTier3MaxUsers, 0) * itTier4PerUserEur
  );
}
