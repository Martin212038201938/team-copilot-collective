/**
 * Google-Ads-Conversion-Tracking mit Consent Mode v2 für copilotenschule.de
 *
 * Aktiv NUR wenn Build-Env VITE_GOOGLE_ADS_ID gesetzt ist (GitHub Actions
 * Secret, Format "AW-XXXXXXXXX"). Ohne ID: kompletter No-Op — sicher in
 * Dev/Preview und vor Anlage des Google-Ads-Kontos deploybar.
 *
 * Consent Mode v2 (Advanced): gtag lädt mit allen Signalen auf "denied".
 * Erst die Einwilligung über den ConsentBanner setzt ad_storage /
 * ad_user_data / ad_personalization auf "granted". Bei Ablehnung sendet
 * gtag nur cookielose Pings — Google modelliert Conversions, setzt aber
 * keine Cookies.
 *
 * Conversion-Labels kommen aus Build-Envs (in Google Ads unter
 * Conversions → Tag-Details ablesbar):
 *   VITE_ADS_LABEL_LEAD     — primäre Conversion (Formulare, Buchung)
 *   VITE_ADS_LABEL_CONTACT  — sekundär (Telefon-/Mail-Klick)
 *
 * Alle Aufrufe defensiv: Fehler werden still geschluckt (gleiches Muster
 * wie analytics.ts).
 */

const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;
const LABEL_LEAD = import.meta.env.VITE_ADS_LABEL_LEAD as string | undefined;
const LABEL_CONTACT = import.meta.env.VITE_ADS_LABEL_CONTACT as string | undefined;

export const CONSENT_STORAGE_KEY = "consent-ads-v1";

/** Events, die als primäre Lead-Conversion an Google Ads gemeldet werden. */
const LEAD_EVENTS = ["contact_form_submit", "konfigurator_submit", "trainer_application_submit", "sml_booking_click"];
/** Events, die als sekundäre Kontakt-Intent-Conversion gemeldet werden. */
const CONTACT_EVENTS = ["mail_click", "phone_click"];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Ist Ads-Tracking in diesem Build überhaupt konfiguriert? */
export function isAdsConfigured(): boolean {
  return Boolean(ADS_ID);
}

/** Gespeicherte Consent-Entscheidung ("granted" | "denied" | null = noch keine). */
export function getStoredAdsConsent(): "granted" | "denied" | null {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Initialisiert gtag mit Consent-Mode-v2-Defaults (alles denied) und lädt
 * das Google-Tag. In main.tsx aufrufen — NICHT während react-snap.
 */
export function initGoogleAds(): void {
  if (!ADS_ID || typeof window === "undefined") return;
  if (typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent)) return;
  try {
    window.dataLayer = window.dataLayer || [];
    // gtag MUSS die arguments-Objekte pushen (kein Array) — Google-Konvention.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };

    // Consent-Defaults VOR dem Tag-Load (Consent Mode v2)
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });

    // Frühere Einwilligung wiederherstellen
    if (getStoredAdsConsent() === "granted") {
      applyConsentGranted();
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", ADS_ID);
  } catch (err) {
    console.debug("[ads] Init-Fehler (ignoriert):", err);
  }
}

function applyConsentGranted(): void {
  window.gtag?.("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
}

/** Speichert die Entscheidung und aktualisiert die Consent-Signale. */
export function setAdsConsent(granted: boolean): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, granted ? "granted" : "denied");
  } catch {
    /* Storage blockiert — Entscheidung gilt dann nur für diese Session */
  }
  try {
    if (granted) {
      applyConsentGranted();
    } else {
      window.gtag?.("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  } catch (err) {
    console.debug("[ads] Consent-Update-Fehler (ignoriert):", err);
  }
}

/**
 * Meldet ein Conversion-Event an Google Ads, falls es gemappt ist.
 * Wird zentral aus analytics.ts/trackConversion() aufgerufen — Aufrufstellen
 * in den Komponenten bleiben unverändert.
 */
export function trackAdsConversionForEvent(eventName: string): void {
  try {
    if (!ADS_ID || typeof window === "undefined" || !window.gtag) return;
    let label: string | undefined;
    if (LEAD_EVENTS.includes(eventName)) label = LABEL_LEAD;
    else if (CONTACT_EVENTS.includes(eventName)) label = LABEL_CONTACT;
    if (!label) return;
    window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
  } catch (err) {
    console.debug("[ads] Conversion-Fehler (ignoriert):", err);
  }
}
