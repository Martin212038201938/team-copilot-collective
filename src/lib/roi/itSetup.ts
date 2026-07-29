import { ROI_ASSUMPTIONS } from "./assumptions";

/**
 * IT-Setup und Einführung (Tenant-Readiness). Fällt nur in Jahr 1 an.
 *
 * Bis einschließlich ROI_ASSUMPTIONS.itFreeUpToUsers Personen entsteht kein eigener
 * Posten — das erledigt die IT in dieser Größenordnung nebenher. Erst darüber wird
 * gestaffelt gerechnet, degressiv, weil der Aufwand mit der Komplexität des Tenants
 * wächst und nicht linear mit der Kopfzahl.
 *
 * Herleitung und Quellen der Beträge: siehe ROI_ASSUMPTIONS.
 *
 * Kontrollwerte:
 *     15 Personen ->      0 €
 *     25 Personen ->    600 €
 *     50 Personen ->  2.100 €
 *    250 Personen ->  7.100 €
 *  1.000 Personen -> 16.100 €
 *  5.000 Personen -> 40.100 €
 */
export function calculateItSetup(users: number): number {
  const {
    itFreeUpToUsers,
    itBaseEur,
    itTier1MaxUsers,
    itTier1PerUserEur,
    itTier2MaxUsers,
    itTier2PerUserEur,
    itTier3MaxUsers,
    itTier3PerUserEur,
    itTier4PerUserEur,
  } = ROI_ASSUMPTIONS;

  if (users <= itFreeUpToUsers) return 0;

  // Die erste Stufe zählt erst ab der Freigrenze, alle weiteren wie gehabt.
  const tier1 = Math.max(Math.min(users, itTier1MaxUsers) - itFreeUpToUsers, 0);
  const tier2 = Math.max(Math.min(users - itTier1MaxUsers, itTier2MaxUsers - itTier1MaxUsers), 0);
  const tier3 = Math.max(Math.min(users - itTier2MaxUsers, itTier3MaxUsers - itTier2MaxUsers), 0);
  const tier4 = Math.max(users - itTier3MaxUsers, 0);

  return (
    itBaseEur +
    tier1 * itTier1PerUserEur +
    tier2 * itTier2PerUserEur +
    tier3 * itTier3PerUserEur +
    tier4 * itTier4PerUserEur
  );
}
