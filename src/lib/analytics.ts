/**
 * Analytics-Helper für copilotenschule.de
 *
 * Verwendete Tools:
 * - Microsoft Clarity (Heatmaps, Session-Recordings, Conversion-Events) — kostenlos, EU-Server
 *   Initialisierung in src/main.tsx via @microsoft/clarity npm-Package
 * - AlwaysData Analytics (server-side Page-Views) — im Hosting inklusive, kein Code nötig
 * - Google Search Console (organic search) — separate Quelle
 *
 * Dokumentation Clarity-API: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 *
 * Alle Aufrufe sind defensiv: Wenn Clarity nicht initialisiert ist (z.B. fehlende
 * Projekt-ID, Tracking-Blocker, react-snap-Snapshot), passieren sie still nichts.
 */

import Clarity from "@microsoft/clarity";
import { trackAdsConversionForEvent } from "./ads";

/**
 * Trackt ein benanntes Conversion-Event in Clarity.
 *
 * @param eventName  Eindeutiger Event-Name (snake_case, z.B. "contact_form_submit")
 * @param value      Optional ein zusätzlicher Wert (Quelle, Variante). Wird als Custom-Tag gesetzt.
 *
 * @example
 *   trackConversion("contact_form_submit", "homepage");
 *   trackConversion("phone_click", "footer");
 *   trackConversion("pdf_download", "betriebsrat-checkliste");
 */
export function trackConversion(eventName: string, value?: string): void {
  // Google-Ads-Conversion (No-Op ohne VITE_GOOGLE_ADS_ID, Mapping in ads.ts) —
  // zentral hier, damit die Aufrufstellen in den Komponenten unverändert bleiben.
  trackAdsConversionForEvent(eventName);
  try {
    Clarity.event(eventName);
    if (value !== undefined) {
      Clarity.setTag(eventName, value);
    }
  } catch (err) {
    // Tracking darf NIEMALS die UX brechen — alle Fehler still abfangen.
    // Häufigster Fall: Clarity nicht initialisiert (kein VITE_CLARITY_ID gesetzt).
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.debug("[analytics] trackConversion-Fehler (ignoriert):", err);
    }
  }
}

/**
 * Setzt ein Custom-Tag auf der aktuellen Session.
 * Hilft, Sessions im Clarity-Dashboard nach Segmenten zu filtern.
 *
 * @example
 *   setSessionTag("user_type", "lead");
 *   setSessionTag("training_interest", "eu-ai-act");
 */
export function setSessionTag(key: string, value: string): void {
  try {
    Clarity.setTag(key, value);
  } catch (err) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.debug("[analytics] setSessionTag-Fehler (ignoriert):", err);
    }
  }
}

/**
 * Erhöht die Priorität der aktuellen Session-Aufzeichnung in Clarity.
 * Sessions, die zu einer Conversion geführt haben, sollten priorisiert werden,
 * damit sie in den Recordings auftauchen, auch wenn das Recording-Limit
 * sonst erreicht wäre.
 *
 * @example
 *   markConvertedSession("contact_form");
 */
export function markConvertedSession(reason: string): void {
  try {
    Clarity.upgrade(reason);
  } catch (err) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.debug("[analytics] markConvertedSession-Fehler (ignoriert):", err);
    }
  }
}
