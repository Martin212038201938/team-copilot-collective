/**
 * A/B-Test "Preise auszeichnen ja/nein"
 * -------------------------------------
 * Ziel: entscheiden, ob copilotenschule.de künftig Preise ausweist.
 *
 * Mechanik:
 *  - Auf 4 Testtrainings gibt es zusätzlich eine B-Route /trainings/preis/:slug,
 *    die dieselbe Detailseite MIT sichtbarem "ab"-Preis-Störer rendert.
 *  - Jeder Besucher wird beim ERSTEN Öffnen einer der 4 Testseiten dauerhaft
 *    (localStorage) zu 50/50 einer Variante zugewiesen und bleibt es – auch bei
 *    späteren Besuchen. B-User werden auf ihrer Journey immer auf die Preis-Route
 *    umgeleitet.
 *  - Gemessen wird über Clarity-Session-Tags (siehe setSessionTag in analytics.ts):
 *    ab_pricing = "A"|"B" und ab_pricing_product = <slug>.
 *
 * WICHTIG: Niemals während des react-snap-Pre-Renderings zuweisen/umleiten,
 * sonst wird das statische A-HTML korrumpiert. Dafür isPrerender().
 */

export const AB_PRICING_TEST_SLUGS = [
  "copilot-grundlagen-prompt-design",
  "microsoft-365-copilot-praxis",
  "train-the-trainer-copilot",
  "copilot-studio-ki-agenten",
] as const;

export type AbVariant = "A" | "B";

const STORAGE_KEY = "ab_pricing_variant";

/** true während des react-snap-Snapshots (kein echter Browser-User). */
export function isPrerender(): boolean {
  return typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent);
}

export function isAbPricingTestSlug(slug?: string | null): boolean {
  return !!slug && (AB_PRICING_TEST_SLUGS as readonly string[]).includes(slug);
}

/** Liest die gespeicherte Variante, ohne eine zuzuweisen. */
export function readVariant(): AbVariant | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "A" || v === "B" ? v : null;
  } catch {
    return null;
  }
}

/** Setzt die Variante hart (z.B. beim direkten Aufruf einer B-Route). */
export function setVariant(v: AbVariant): void {
  try {
    localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* localStorage nicht verfügbar – A/B still deaktiviert */
  }
}

/**
 * Gibt die bestehende Variante zurück oder weist erstmalig 50/50 zu.
 * NUR auf dem Client aufrufen (nicht im Prerender).
 */
export function assignVariantIfNeeded(): AbVariant {
  const existing = readVariant();
  if (existing) return existing;
  const v: AbVariant = Math.random() < 0.5 ? "A" : "B";
  setVariant(v);
  return v;
}
