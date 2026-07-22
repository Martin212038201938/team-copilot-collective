/**
 * "Auf einen Blick"-Faktenbox für Trainings-Produktseiten (B7, 2026-07-22).
 *
 * GEO-Hintergrund: KI-Assistenten und Vergleichs-Agenten extrahieren Fakten
 * primär aus sichtbarem, klar strukturiertem Text – nicht aus JSON-LD. Diese
 * Box stellt die Kernfakten (Format, Dauer, Zielgruppe, Niveau, Voraussetzungen,
 * Sprache, Zertifikat, Buchung) als semantische Definitionsliste (dl/dt/dd) dar.
 *
 * WICHTIG: Bewusst OHNE Preiszeile, solange der A/B-Test "Preise auszeichnen"
 * (ab_pricing) läuft. Die optionale priceLine-Prop ist für die Zeit nach dem
 * Testentscheid vorbereitet und wird aktuell nirgends gesetzt.
 */
import { ClipboardList } from "lucide-react";

interface TrainingFactBoxProps {
  format?: string;
  duration: string;
  audience?: string;
  level?: string;
  prerequisites?: string;
  language?: string;
  groupSize?: string;
  certificate?: string;
  bookingNote?: string;
  /** Vorbereitet für die Zeit nach dem A/B-Test "Preise auszeichnen" – aktuell nie gesetzt. */
  priceLine?: string;
}

interface FactRow {
  label: string;
  value?: string;
  /** Zeile über beide Spalten strecken (für längere Texte) */
  wide?: boolean;
}

const TrainingFactBox = ({
  format,
  duration,
  audience,
  level,
  prerequisites,
  language = "Deutsch",
  groupSize,
  certificate,
  bookingNote = "Anfrage über das Kontaktformular oder den Training-Konfigurator – Termine nach Absprache",
  priceLine,
}: TrainingFactBoxProps) => {
  const rows: FactRow[] = [
    { label: "Format", value: format },
    { label: "Dauer", value: duration },
    { label: "Zielgruppe", value: audience },
    { label: "Niveau", value: level },
    { label: "Voraussetzungen", value: prerequisites, wide: true },
    { label: "Sprache", value: language },
    { label: "Gruppengröße", value: groupSize },
    { label: "Zertifikat", value: certificate },
    { label: "Preis", value: priceLine },
    { label: "Buchung", value: bookingNote, wide: true },
  ];
  const visible = rows.filter((row) => !!row.value);
  if (visible.length === 0) return null;

  return (
    <section
      aria-label="Auf einen Blick"
      className="mt-8 max-w-3xl bg-card border rounded-xl p-6 md:p-8 shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-primary" />
        Auf einen Blick
      </h2>
      <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {visible.map((row) => (
          <div key={row.label} className={row.wide ? "sm:col-span-2" : undefined}>
            <dt className="text-sm font-medium text-muted-foreground">{row.label}</dt>
            <dd className="text-base leading-snug">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TrainingFactBox;
