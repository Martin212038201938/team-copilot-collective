interface PriceStoererProps {
  /** "ab"-Preis pro Teilnehmer in EUR */
  perPerson: number;
  /** optionaler "ab"-Preis pro geschlossener Gruppe in EUR */
  perGroup?: number;
  /** Bezeichnung unter dem Preis (Default: "pro Teilnehmer") */
  unitLabel?: string;
  /** Zusatzzeile im Sticker, z.B. "inkl. Zertifikat." – ersetzt Sternchen + Fußnote */
  note?: string;
}

const eur = (n: number) => n.toLocaleString("de-DE");

/**
 * Preis-Störer für die B-Variante des A/B-Tests.
 *
 * Zeigt den "ab"-Preis pro Teilnehmer auffällig (leicht gedrehtes Sticker-Design),
 * optional den Gruppenpreis als zweite Zeile. Beide Preise mit Sternchen; die
 * Fußnote "* bei Gruppengröße von 12 Teilnehmern" steht klein darunter.
 */
const PriceStoerer = ({ perPerson, perGroup, unitLabel = "pro Teilnehmer", note }: PriceStoererProps) => {
  return (
    <div className="inline-block">
      <div
        className="relative -rotate-2 rounded-2xl bg-accent text-accent-foreground shadow-xl ring-1 ring-black/5 px-5 py-4 sm:px-6 sm:py-5"
        role="note"
        aria-label={
          note
            ? `Preis: ab ${perPerson} Euro ${unitLabel}, ${note}`
            : `Preis: ab ${perPerson} Euro pro Teilnehmer bei einer Gruppengröße von 12 Teilnehmern`
        }
      >
        <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
          Schon
        </div>
        <div className="flex items-baseline gap-1 leading-none">
          <span className="text-lg font-bold">ab</span>
          <span className="text-4xl sm:text-5xl font-extrabold">{eur(perPerson)}&nbsp;€</span>
          {!note && <span className="text-xl font-bold align-top">*</span>}
        </div>
        <div className="mt-1 text-sm font-semibold">{unitLabel}</div>
        {note && <div className="mt-1 text-sm font-medium">{note}</div>}

        {perGroup && (
          <div className="mt-2 border-t border-current/20 pt-2 text-sm font-medium">
            oder ab <span className="font-bold">{eur(perGroup)}&nbsp;€*</span>
            <br className="sm:hidden" /> pro geschlossene Gruppe
          </div>
        )}
      </div>

      {!note && (
        <p className="mt-2 max-w-[16rem] text-[11px] leading-snug text-muted-foreground">
          * bei Gruppengröße von 12 Teilnehmern
        </p>
      )}
    </div>
  );
};

export default PriceStoerer;
