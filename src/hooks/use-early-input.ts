import { useEffect } from "react";

declare global {
  interface Window {
    /** Vor dem App-Start getippte Feldwerte, geschrieben vom Inline-Skript in index.html. */
    __earlyInput?: Record<string, string>;
  }
}

/**
 * Holt Eingaben zurück, die der Nutzer gemacht hat, bevor React übernommen hat.
 *
 * Warum das nötig ist: Die Seiten werden mit react-snap vorgerendert. Das HTML enthält die
 * echten Eingabefelder und ist sofort bedienbar — React hängt sich aber erst an, wenn das
 * Bundle geladen ist, und baut die Felder dabei mit ihrem Anfangszustand neu auf. Alles,
 * was in dieser Lücke getippt wurde, wäre verloren.
 *
 * Das Inline-Skript in index.html protokolliert deshalb jede Eingabe unter der Feld-ID.
 * Dieser Hook übernimmt sie einmalig beim Mount und räumt sie danach weg, damit ein
 * späteres Zurücksetzen des Formulars nicht plötzlich alte Werte zurückholt.
 *
 * @param fields Zuordnung von Feld-ID im DOM zum Formularfeld
 * @param apply  Setzt einen Wert im Formular (z. B. setValue aus react-hook-form)
 */
export function useEarlyInput<TField extends string>(
  fields: Record<string, TField>,
  apply: (field: TField, value: string) => void
): void {
  useEffect(() => {
    const early = window.__earlyInput;
    if (!early) return;

    for (const [domId, field] of Object.entries(fields)) {
      const value = early[domId];
      if (typeof value === "string" && value !== "") {
        apply(field, value);
      }
      delete early[domId];
    }
    // Absichtlich nur beim Mount: Später getippte Werte verwaltet das Formular selbst.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
