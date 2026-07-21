import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEOHead from "@/components/SEOHead";

/**
 * Kontaktseite (/kontakt)
 *
 * Ziel (Conversion-Analyse 07/2026, Maßnahme #1): ein einziger, überall
 * auffindbarer Anlaufpunkt mit ALLEN vorhandenen Kontaktwegen — behebt den
 * bisherigen Soft-404 unter /kontakt und gibt kaufbereiten Besuchern (und
 * solchen, die sonst in einer Sackgasse landen) einen klaren Zielort.
 *
 * Bewusst wiederverwendet: die bestehende <Contact />-Sektion (Formular +
 * Bookings-Erstgespräch + Teams-Chat + E-Mail + Telefon + Standorte), damit
 * alle Wege konsistent und wartungsarm an einer Stelle liegen.
 */

const PAGE_URL = "https://copilotenschule.de/kontakt";

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#contactpage`,
      "url": PAGE_URL,
      "name": "Kontakt – Copilotenschule.de",
      "description":
        "Alle Kontaktwege zur Copilotenschule: 15-minütiges Erstgespräch buchen, Kontaktformular, Teams-Chat, E-Mail und Telefon.",
      "inLanguage": "de-DE",
      "about": { "@id": "https://copilotenschule.de/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://copilotenschule.de/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Kontakt",
          "item": PAGE_URL,
        },
      ],
    },
  ],
};

const Kontakt = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Kontakt – Microsoft Copilot Schulungen"
        description="Sprechen Sie mit uns über Microsoft-Copilot-Trainings für Ihr Unternehmen: 15-minütiges Erstgespräch buchen, Kontaktformular, Teams-Chat, E-Mail oder Telefon. Wir melden uns zeitnah."
        keywords={[
          "Copilotenschule Kontakt",
          "Microsoft Copilot Schulung Kontakt",
          "Copilot Training Beratung",
          "Copilot Erstgespräch",
          "Copilot Schulung Anfrage",
        ]}
        canonicalUrl={PAGE_URL}
        schema={contactSchema}
      />
      <Header />

      <main className="pt-24">
        {/* Intro */}
        <section className="pt-10 pb-2 bg-background">
          <div className="container mx-auto px-4">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span className="mx-2">/</span>
              <span className="text-foreground">Kontakt</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Kontakt
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Sie überlegen, Microsoft Copilot in Ihrem Team wirksam einzuführen?
                Wählen Sie einfach den Weg, der Ihnen am liebsten ist – vom
                15-minütigen Erstgespräch über das Kontaktformular bis zu
                Teams-Chat, E-Mail oder Telefon. Wir melden uns zeitnah.
              </p>
            </div>
          </div>
        </section>

        {/* Alle Kontaktwege: bestehende Contact-Sektion (Formular, Bookings,
            Teams-Chat, E-Mail, Telefon, Standorte) */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Kontakt;
