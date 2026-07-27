/**
 * Akzeptiert deutsche Zahlenformate wie "50", "50,00" und "1.250,50" (Konzept Abschnitt 5.2).
 * Gibt null zurück, wenn der Wert nicht als Zahl interpretiert werden kann.
 */
export function parseGermanNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  // Keine wissenschaftliche Notation zulassen.
  if (/[eE]/.test(trimmed)) return null;

  // Tausenderpunkte entfernen, Dezimalkomma in Punkt umwandeln.
  const normalized = trimmed.replace(/\./g, "").replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) return null;

  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}
