import { useEffect, useState } from "react";

/**
 * Meldet, ob React die vorgerenderte Seite bereits übernommen hat.
 *
 * Hintergrund: Die Seiten werden beim Build mit react-snap vorgerendert. Das fertige HTML
 * ist sofort sichtbar und bedienbar — React hängt sich aber erst an, sobald das JavaScript
 * geladen ist. Wer in dieser Lücke schon in ein Eingabefeld tippt, verliert seine Eingabe:
 * Beim Hydratisieren setzt React den Feldwert auf den (leeren) Anfangszustand zurück.
 *
 * Der Effekt läuft ausschließlich im Browser und erst nach dem ersten Commit. Damit ist
 * `false` gleichbedeutend mit "statisches HTML, React ist noch nicht übernommen".
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
