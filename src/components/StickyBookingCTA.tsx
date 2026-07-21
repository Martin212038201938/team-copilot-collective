import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { bookingClickToThankYou } from "@/lib/booking";

const BOOKING_URL =
  "https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled";

/**
 * StickyBookingCTA — permanent sichtbarer, mitscrollender Erstgespräch-CTA für Produktseiten.
 *
 * Ziel (Conversion-Analyse 07/2026): kaufbereite Besucher auf Trainings-/Workshop-Seiten
 * jederzeit einen Klick vom Erstgespräch entfernt halten, ohne aufdringlich zu wirken.
 *
 * Design-Entscheidungen für "nicht störend / deckt keine Elemente ab":
 *  - Fixiert unten rechts (bottom-right FAB-Pattern), im Rand-/Gutter-Bereich —
 *    überlagert keine Lese-Inhalte in der Seitenmitte.
 *  - Erscheint erst nach dem Hero (Scroll > 200px), damit der erste Eindruck ruhig bleibt.
 *  - Blendet sich am Seitenende wieder aus (Nähe Footer/Kontakt-Sektion), damit es die
 *    dortigen Elemente und den ohnehin vorhandenen Kontakt-CTA nicht verdeckt.
 *  - Sanfte Ein-/Ausblende-Transition statt hartem Aufpoppen.
 *
 * Tracking: bookingClickToThankYou("sticky-cta") → booking_click + /danke-Redirect.
 * SSR/react-snap-sicher: initial ausgeblendet (window-Zugriff nur im Effect).
 */
const StickyBookingCTA = () => {
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

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => bookingClickToThankYou("sticky-cta")}
      aria-label="Kostenloses Erstgespräch vereinbaren"
      className={`fixed bottom-5 right-4 sm:right-6 z-40 inline-flex items-center gap-2.5
        rounded-full bg-primary text-primary-foreground font-semibold
        px-4 py-3 sm:px-5 shadow-lg ring-1 ring-black/5
        hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
        transition-all duration-300 ease-out motion-reduce:transition-none
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
    >
      <Calendar className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      <span className="text-sm whitespace-nowrap">Erstgespräch vereinbaren</span>
    </a>
  );
};

export default StickyBookingCTA;
