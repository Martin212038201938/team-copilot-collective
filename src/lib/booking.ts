/**
 * Booking-Helper für copilotenschule.de
 *
 * Zweck: Auch User, die direkt einen Termin über Microsoft Bookings buchen,
 * sollen auf der zentralen Danke-Seite (/danke) landen und damit im
 * Conversion-Tracking (Google Ads page_view, Clarity) auftauchen.
 *
 * Da die eigentliche Buchung auf einer EXTERNEN Microsoft-Seite stattfindet,
 * lässt sich der Buchungs-Abschluss technisch nicht abfangen. Wir tracken
 * deshalb den Buchungs-KLICK: Die Buchung öffnet im neuen Tab, der
 * ursprüngliche Tab wird kurz danach auf /danke geleitet.
 */

import { trackConversion, markConvertedSession } from "@/lib/analytics";

const DANKE_URL = "/danke";

/**
 * Für Anchor-Buttons (<a href={BOOKING} target="_blank">): als onClick nutzen.
 *
 * Der Klick öffnet die Buchung via target="_blank" (Default-Aktion des Links)
 * im neuen Tab — wir rufen KEIN preventDefault auf. Anschließend leiten wir den
 * ursprünglichen Tab nach kurzer Verzögerung auf /danke um, damit das
 * Google-Tag dort einen frischen page_view auslöst.
 *
 * @param source  Kontext für Clarity (z.B. "contact", "workshops", "article-popup")
 *
 * @example
 *   <a href={BOOKING} target="_blank" rel="noopener noreferrer"
 *      onClick={() => bookingClickToThankYou("contact")}>
 */
export function bookingClickToThankYou(source?: string): void {
  trackConversion("booking_click", source);
  markConvertedSession("booking");
  // Kurzer Delay, damit der neue Tab (Default-Link-Aktion) sicher geöffnet ist.
  window.setTimeout(() => {
    window.location.href = DANKE_URL;
  }, 200);
}
