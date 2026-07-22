import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CustomerLogos from "@/components/CustomerLogos";
import TrustBadges from "@/components/TrustBadges";
import TrainingModules from "@/components/TrainingModules";
import Benefits from "@/components/Benefits";
import CustomerReviews from "@/components/CustomerReviews";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { generateHomepageSchema } from "@/lib/schema";
import { homepageFAQs } from "@/data/faqs";

/**
 * Homepage - copilotenschule.de
 *
 * Main entry point for the website. Displays:
 * - Hero section with value proposition
 * - CTA to training offerings and configurator
 * - Benefits of our training approach
 * - Trust badges and customer reviews
 * - Contact section and FAQs
 *
 * For full training catalog, see /unsere-angebote
 * For custom training configuration, see /training-konfigurator
 */

const Index = () => {
  // B3 (2026-07-22): Homepage-Schema = nur die sichtbaren FAQs. Der frühere
  // Phantom-Katalog (9 veraltete Course-/EducationEvent-Einträge) und die
  // doppelte Organization-Definition sind entfernt – die echten Trainings
  // beschreibt /trainings mit seinen Detailseiten.
  const schema = generateHomepageSchema(homepageFAQs);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Microsoft Copilot Schulungen & Trainings"
        description="Praxisnahe Microsoft Copilot Trainings für Unternehmen: Hands-on Workshops, Inhouse-Enablement und Rollout-Begleitung. DSGVO-konform."
        keywords={[
          "Microsoft Copilot Schulung",
          "Microsoft 365 Copilot Training",
          "Copilot Enablement",
          "Copilot Rollout Begleitung",
          "Microsoft Copilot Adoption",
          "Copilot Workshop",
          "KI Training Unternehmen",
          "Copilot für Büroarbeit"
        ]}
        canonicalUrl="https://copilotenschule.de/"
        schema={schema}
      />
      <Header />
      <main>
        <Hero />
        <CustomerLogos />
        <Benefits />
        <TrainingModules />
        <TrustBadges />
        <CustomerReviews />
        <Contact />
        <FAQ faqs={homepageFAQs} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
