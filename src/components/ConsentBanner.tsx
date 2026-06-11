import { useEffect, useState } from "react";
import { getStoredAdsConsent, isAdsConfigured, setAdsConsent } from "@/lib/ads";

/**
 * Schlanker Consent-Banner für Google-Ads-Conversion-Tracking (Consent Mode v2).
 *
 * Erscheint nur wenn: (a) VITE_GOOGLE_ADS_ID im Build gesetzt ist und
 * (b) noch keine Entscheidung gespeichert wurde. Ohne Ads-Konfiguration
 * bleibt die Website banner-frei wie bisher.
 *
 * Rendert bewusst erst nach Mount (useEffect) — so landet der Banner
 * nicht im react-snap-Pre-Render-HTML (SEO/Snapshot bleibt sauber).
 */
const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAdsConfigured()) return;
    if (typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent)) return;
    if (getStoredAdsConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (granted: boolean) => {
    setAdsConsent(granted);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einwilligung"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-md z-50 rounded-xl border border-border bg-background shadow-2xl p-4"
    >
      <p className="text-sm font-semibold mb-1">Cookies für Werbemessung?</p>
      <p className="text-xs text-muted-foreground mb-3">
        Wir möchten mit Google-Ads-Cookies messen, ob unsere Anzeigen zu Anfragen führen.
        Ohne Einwilligung bleibt die Messung anonym und cookielos. Details in der{" "}
        <a href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</a>.
        Sie können Ihre Wahl dort jederzeit ändern.
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => decide(false)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          Ablehnen
        </button>
        <button
          onClick={() => decide(true)}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
