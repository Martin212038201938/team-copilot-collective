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
      <p className="text-sm font-semibold mb-1">Cookie-Einstellungen</p>
      <p className="text-xs text-muted-foreground mb-3">
        Wir verwenden Cookies, um die Wirksamkeit unserer Werbung zu messen. Diese Cookies
        werden nur mit Ihrer Einwilligung gesetzt. Weitere Informationen finden Sie in unserer{" "}
        <a href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</a>,
        dort können Sie Ihre Auswahl jederzeit ändern.
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
