import { cn } from "@/lib/utils";

interface NichtKiGeneriertProps {
  className?: string;
}

/**
 * Kleiner dezenter Störer "Nicht KI-generiert" für echte Fotos.
 *
 * Wird absolut positioniert – der umgebende Container braucht `relative`.
 * Position: immer oben rechts, waagerecht.
 * Farbe: weiß hinterlegt, schwarze Schrift.
 */
const NichtKiGeneriert = ({ className }: NichtKiGeneriertProps) => (
  <span
    className={cn(
      "pointer-events-none absolute right-3 top-3 z-10 select-none whitespace-nowrap rounded-md",
      "bg-white/90 px-2.5 py-1 text-[11px] font-medium leading-tight tracking-wide text-black",
      "shadow-sm ring-1 ring-black/10 sm:right-4 sm:top-4 sm:text-xs",
      className
    )}
  >
    Nicht KI-generiert
  </span>
);

export default NichtKiGeneriert;
