import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { bookingClickToThankYou } from "@/lib/booking";

const BOOKING_URL =
  "https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled";

interface StickyBookingCTAProps {
  /** Vertikale Verankerung: "top" (Produktseiten, unter dem Header) oder "bottom" (Fachartikel). */
  placement?: "top" | "bottom";
  /** Tracking-Kontext für Clarity/Analytics (z.B. "sticky-cta-article"). */
  source?: string;
}

/**
 * StickyBookingCTA — permanent sichtbarer, mitscrollender Erstgespräch-CTA.
 *
 * Ziel (Conversion-Analyse 07/2026): kaufbereite Besucher jederzeit einen Klick
 * vom Erstgespräch entfernt halten, ohne aufdringlich zu wirken.
 *
 * Eingesetzt auf Produktseiten (placement="top") und allen Fachartikeln
 * (placement="bottom", zentral über ContentLayout).
 *
 * Design-Entscheidungen für "nicht störend / deckt keine Elemente ab":
 *  - Fixiert im Rand-/Gutter-Bereich rechts — überlagert keine Lese-Inhalte in der Mitte.
 *    Auf Artikelseiten unten rechts, um die rechte Sidebar nicht zu verdecken.
 *  - Erscheint erst nach dem Hero (Scroll > 200px), damit der erste Eindruck ruhig bleibt.
 *  - Blendet sich am Seitenende wieder aus (Nähe Footer/Kontakt-Sektion), damit es die
 *    dortigen Elemente nicht verdeckt.
 *  - Sanfte Ein-/Ausblende-Transition statt hartem Aufpoppen.
 *  - Zweizeilig: Haupt-Label + erklärender Zusatz ("15-minütiges Beratungsgespräch buchen").
 *
 * Tracking: bookingClickToThankYou(source) → booking_click + /danke-Redirect.
 * SSR/react-snap-sicher: initial ausgeblendet (window-Zugriff nur im Effect).
 */
const StickyBookingCTA = ({
  placement = "top",
  source = "sticky-cta",
}: StickyBookingCTAProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      // Am unteren Seitenende ausblenden (Footer/Kontakt-Sektion nicht verdecken).
      const nearBottom = window.innerHeight + y >= doc.scrollHeight - 560;
      setVisible(y > 200 && !nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const posClass = placement === "bottom" ? "bottom-5" : "top-24";
  const hiddenTransform =
    placement === "bottom" ? "translate-y-3" : "-translate-y-3";

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => bookingClickToThankYou(source)}
      aria-label="Kostenloses 15-minütiges Beratungsgespräch buchen"
      className={`fixed ${posClass} right-4 sm:right-6 z-40 inline-flex items-center gap-2.5
        rounded-2xl bg-primary text-primary-foreground
        px-4 py-2.5 sm:px-5 shadow-lg ring-1 ring-black/5
        hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
        transition-all duration-300 ease-out motion-reduce:transition-none
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : `opacity-0 ${hiddenTransform} pointer-events-none`
        }`}
    >
      <Calendar className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-sm font-semibold whitespace-nowrap">
          Lassen Sie uns reden
        </span>
        <span className="text-xs font-normal opacity-90 whitespace-nowrap">
          15-minütiges Beratungsgespräch buchen
        </span>
      </span>
    </a>
  );
};

export default StickyBookingCTA;
