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
 */

const customers = [
  { name: "REWE", file: "rewe.svg" },
  { name: "Pernod Ricard", file: "pernod-ricard.svg" },
  { name: "Lekkerland", file: "lekkerland.svg" },
  { name: "Marriott Hotels", file: "marriott.svg" },
  { name: "Med360Grad", file: "med360grad.svg" },
  { name: "IHK Nord Westfalen", file: "ihk-nord-westfalen.svg" },
];

const LogoItem = ({ name, file }: { name: string; file: string }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <span className="text-sm md:text-base font-semibold text-muted-foreground/80 whitespace-nowrap">
        {name}
      </span>
    );
  }

  return (
    <img
      src={`/images/customer-logos/${file}`}
      alt={`${name} Logo`}
      loading="lazy"
      className="h-8 md:h-10 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity"
      onError={() => setImgFailed(true)}
    />
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
          <LogoItem key={c.name} name={c.name} file={c.file} />
        ))}
      </div>
    </div>
  </section>
);

export default CustomerLogos;
