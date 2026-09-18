import { useState } from "react";

/**
 * B4 Trust-Signal-Block: Kunden-Logo-Leiste + KPI.
 *
 * Logos liegen in /public/images/customer-logos/<file>. Solange eine Datei
 * fehlt, rendert das jeweilige Element automatisch den Firmennamen als
 * Text-Badge (onError-Fallback) — der Block ist damit sofort deploybar
 * und wird durch Ablegen der Logo-Dateien automatisch "echt".
 *
 * Bewusst: Grayscale, keine Verlinkung (kein Backlink-Spiel), kein Overlay.
 * Die meisten Logos sind Bild-Wortmarken (enthalten den Firmennamen bereits
 * grafisch) — nur bei reinen Bildmarken ohne Schriftzug (aktuell: Atlantic-
 * Lloyd) wird der Firmenname zusätzlich als Text darunter ausgeschrieben.
 */

const customers = [
  { name: "REWE", file: "rewe.png", w: 460 },
  { name: "Pernod Ricard", file: "pernod-ricard.png", w: 434 },
  { name: "Lekkerland", file: "lekkerland.png", w: 511 },
  { name: "Marriott Hotels", file: "marriott.png", w: 203 },
  { name: "Med360Grad", file: "med360grad.png", w: 785 },
  { name: "IHK Nord Westfalen", file: "ihk-nord-westfalen.png", w: 802 },
  { name: "Abbott", file: "abbott.png", w: 637 },
  { name: "Kalorimeta", file: "kalorimeta.png", w: 411 },
  { name: "medical Wundmanagement", file: "medical-wundmanagement.png", w: 656 },
  { name: "Atlantic-Lloyd", file: "al-group.png", w: 152, showLabel: true },
  { name: "Atradius", file: "atradius.png", w: 652 },
  { name: "Brand KG", file: "brand-kg.png", w: 628 },
  { name: "Compositiv GmbH", file: "compositiv.png", w: 640 },
  { name: "Kommunales Bildungswerk", file: "kommunales-bildungswerk.png", w: 434 },
  { name: "Eckpfeiler Immobilien", file: "eckpfeiler-immobilien.png", w: 512 },
  {
    name: "Hessisches Ministerium für Familie, Senioren, Sport, Gesundheit und Pflege",
    file: "hessisches-familienministerium.png", w: 133,
    showLabel: true,
    caption: ["Hessisches Ministerium", "für Familie, Senioren, Sport, Gesundheit und Pflege"],
  },
];

const LogoItem = ({
  name,
  file,
  w,
  showLabel,
  caption,
}: {
  name: string;
  file: string;
  /** Pixelbreite der PNG (alle Logos sind 160px hoch) — reserviert den Platz vor dem Laden, verhindert Layout-Shift (CLS). */
  w: number;
  showLabel?: boolean;
  caption?: string[];
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <span className="text-sm md:text-base font-semibold text-muted-foreground/80 whitespace-nowrap">
        {name}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <img
        src={`/images/customer-logos/${file}`}
        alt={`${name} Logo`}
        width={w}
        height={160}
        loading="lazy"
        className="h-8 md:h-10 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity"
        onError={() => setImgFailed(true)}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground/70 text-center leading-snug max-w-[180px]">
          {caption ? caption.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          )) : (
            <span className="whitespace-nowrap">{name}</span>
          )}
        </span>
      )}
    </div>
  );
};

const CustomerLogos = () => (
  <section aria-label="Referenzkunden" className="py-10 border-y border-border/40 bg-muted/20">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm font-medium text-muted-foreground mb-1">
        <span className="text-foreground font-bold">2.000+ ausgebildete Wissensarbeiter</span> — Unternehmen, die mit uns trainieren:
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {customers.map((c) => (
          <LogoItem
            key={c.name}
            name={c.name}
            file={c.file}
            w={c.w}
            showLabel={c.showLabel}
            caption={c.caption}
          />
        ))}
      </div>
    </div>
  </section>
);

export default CustomerLogos;
