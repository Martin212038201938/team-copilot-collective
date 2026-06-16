/**
 * Danke-Seite — /danke
 *
 * ZWECK: Zentrale Bestätigungsseite (Thank-You-Page) nach erfolgreichem Versand
 *  - Kontaktformular (Contact.tsx)
 *  - Training-Konfigurator / Modul-Selektionen (TrainingKonfigurator.tsx)
 *
 * GOOGLE ADS: Diese URL (https://copilotenschule.de/danke) dient als
 * Conversion-Ziel ("Seitenaufruf"). Die Formulare leiten nach erfolgreichem
 * Versand per Full-Page-Load hierher um, damit das Google-Tag einen frischen
 * page_view für /danke auslöst und Google Ads die Conversion zählen kann.
 *
 * NICHT indexieren: noindex, nofollow via Helmet — Bestätigungsseite gehört
 * nicht in den organischen Index und ist NICHT in der sitemap.xml.
 */

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2, Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackConversion, markConvertedSession } from "@/lib/analytics";

const BOOKING_URL =
  "https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled";

const Danke = () => {
  useEffect(() => {
    // Conversion-Event für Clarity/Ads beim Erreichen der Danke-Seite.
    // Läuft NICHT während des react-snap-Pre-Renderings (kein window-Event).
    trackConversion("danke_page_view", "thank_you");
    markConvertedSession("danke_page");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Vielen Dank für Ihre Anfrage | copilotenschule.de</title>
        <meta
          name="description"
          content="Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://copilotenschule.de/danke" />
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <Card className="max-w-xl w-full p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Vielen Dank für Ihre Anfrage!
          </h1>

          <p className="text-lg text-muted-foreground mb-2">
            Ihre Nachricht ist bei uns eingegangen. Wir melden uns innerhalb von
            24 Stunden persönlich bei Ihnen.
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            Sie erhalten zusätzlich eine E-Mail, in der Sie bestätigen, dass wir
            Sie künftig kontaktieren dürfen.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="w-full gap-2">
                <Calendar className="w-4 h-4" />
                Direkt Erstgespräch buchen
              </Button>
            </a>
            <Link to="/" className="inline-block">
              <Button variant="outline" size="lg" className="w-full gap-2">
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Danke;
