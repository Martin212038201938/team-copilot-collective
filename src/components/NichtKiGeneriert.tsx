import { cn } from "@/lib/utils";

interface NichtKiGeneriertProps {
  className?: string;
}

/**
 * Kleiner roter Störer "Nicht KI-generiert" für echte Fotos.
 *
 * Wird absolut positioniert – der umgebende Container braucht `relative`.
 * Standardposition: oben links, leicht gedreht (Sticker-Optik).
 * Farbe: Copilotenschule-Rot #CF2E2E.
 */
const NichtKiGeneriert = ({ className }: NichtKiGeneriertProps) => (
  <span
    className={cn(
      "pointer-events-none absolute left-3 top-3 z-10 -rotate-3 select-none whitespace-nowrap rounded-md",
      "bg-[#CF2E2E] px-2.5 py-1 text-[11px] font-bold uppercase leading-tight tracking-wide text-white",
      "shadow-lg ring-1 ring-white/70 sm:left-4 sm:top-4 sm:text-xs",
      className
    )}
  >
    Nicht KI-generiert
  </span>
);

export default NichtKiGeneriert;
