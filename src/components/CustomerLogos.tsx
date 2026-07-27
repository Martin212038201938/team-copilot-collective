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
  { name: "REWE", file: "rewe.png" },
  { name: "Pernod Ricard", file: "pernod-ricard.png" },
  { name: "Lekkerland", file: "lekkerland.png" },
  { name: "Marriott Hotels", file: "marriott.png" },
  { name: "Med360Grad", file: "med360grad.png" },
  { name: "IHK Nord Westfalen", file: "ihk-nord-westfalen.png" },
  { name: "Abbott", file: "abbott.png" },
  { name: "Kalorimeta", file: "kalorimeta.png" },
  { name: "medical Wundmanagement", file: "medical-wundmanagement.png" },
  { name: "Atlantic-Lloyd", file: "al-group.png", showLabel: true },
  { name: "Atradius", file: "atradius.png" },
  { name: "Brand KG", file: "brand-kg.png" },
  { name: "Compositiv GmbH", file: "compositiv.png" },
  { name: "Kommunales Bildungswerk", file: "kommunales-bildungswerk.png" },
  { name: "Eckpfeiler Immobilien", file: "eckpfeiler-immobilien.png" },
];

const LogoItem = ({
  name,
  file,
  showLabel,
}: {
  name: string;
  file: string;
  showLabel?: boolean;
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
        loading="lazy"
        className="h-8 md:h-10 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity"
        onError={() => setImgFailed(true)}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground/70 whitespace-nowrap">
          {name}
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
          <LogoItem key={c.name} name={c.name} file={c.file} showLabel={c.showLabel} />
        ))}
      </div>
    </div>
  </section>
);

export default CustomerLogos;
