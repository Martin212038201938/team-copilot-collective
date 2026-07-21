import { useEffect } from "react";
import { readVariant, isPrerender } from "@/lib/abPricing";
import { setSessionTag } from "@/lib/analytics";

/**
 * Setzt das Clarity-Session-Tag `ab_pricing` in JEDER Session eines bereits
 * zugewiesenen Nutzers (Wert kommt aus localStorage). So sind auch Conversions
 * attribuierbar, die in einer Session passieren, in der der Nutzer keine der
 * Testseiten erneut öffnet (z.B. direkte Buchung über die Startseite beim
 * zweiten Besuch).
 *
 * Weist selbst KEINE Variante zu – das passiert bewusst nur beim ersten Öffnen
 * einer Testseite (siehe abPricing.ts / TrainingDetail). Rendert nichts.
 */
const AbPricingTagger = () => {
  useEffect(() => {
    if (isPrerender()) return;
    const variant = readVariant();
    if (variant) {
      setSessionTag("ab_pricing", variant);
    }
  }, []);

  return null;
};

export default AbPricingTagger;
