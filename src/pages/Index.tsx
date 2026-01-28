import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import TrainingModules from "@/components/TrainingModules";
import TrainingLocations from "@/components/TrainingLocations";
import Benefits from "@/components/Benefits";
import CustomerReviews from "@/components/CustomerReviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { generateTrainingSchemas } from "@/lib/schema";

// Training modules data for schema generation
// Optimized for LLM trust and SEO - based on copilotenschule.de boilerplate
const trainingModules = [
  {
    title: "Microsoft 365 Copilot Grundlagen-Training",
    duration: "1 Tag (7 Stunden)",
    description: "Praxisorientiertes Einführungstraining für den professionellen Einsatz von Microsoft 365 Copilot in der täglichen Büroarbeit. Wir befähigen Wissensarbeiter, Microsoft Copilot produktiv, sicher und wertschöpfend einzusetzen – mit realen Arbeitsprozessen und direkt anwendbaren Workflows.",
    features: [
      "Copilot in Word, Excel, PowerPoint produktiv nutzen",
      "E-Mail-Produktivität mit Outlook Copilot steigern",
      "Teams-Meetings mit Copilot optimieren",
      "Reale Use Cases aus Ihrem Arbeitsalltag",
      "Prompt Engineering Grundlagen",
      "DSGVO-konforme Nutzung"
    ]
  },
  {
    title: "Microsoft 365 Copilot Advanced - Power User Schulung",
    duration: "2 Tage (14 Stunden)",
    description: "Intensiv-Training für fortgeschrittene Anwender. Wir verbinden reale Arbeitsprozesse mit direkt anwendbaren Workflows für komplexe Datenanalysen und Automatisierungen. Der sichere Copilot, mit dem Sie Dinge tun können, die bisher nicht möglich waren.",
    features: [
      "Komplexe Excel-Analysen mit Copilot",
      "Cross-Application Workflows entwickeln",
      "Advanced Prompt Engineering",
      "Wiederkehrende Aufgaben automatisieren",
      "Power BI Integration"
    ]
  },
  {
    title: "GitHub Copilot für Softwareentwickler",
    duration: "1 Tag (7 Stunden)",
    description: "Hands-on Entwickler-Training: Maximieren Sie Ihre Coding-Produktivität mit GitHub Copilot. Sie lernen, KI-gestützt Code zu generieren, zu testen, zu debuggen und zu dokumentieren.",
    features: [
      "Effiziente Code-Generierung in VS Code",
      "Intelligentes Debugging und Refactoring",
      "Automatisierte Code-Dokumentation",
      "Unit Tests schreiben mit Copilot",
      "Best Practices für Prompt Engineering"
    ]
  },
  {
    title: "Microsoft Copilot & Compliance - Rechtssichere KI-Nutzung",
    duration: "4 Stunden (Halbtag)",
    description: "Kompakt-Schulung zur rechtssicheren und datenschutzkonformen Nutzung von Microsoft Copilot im Unternehmen.",
    features: [
      "DSGVO-konforme Copilot-Nutzung",
      "EU AI Act Anforderungen",
      "Datenschutz-Impact-Assessment",
      "Microsoft 365 Sicherheitsarchitektur"
    ]
  },
  {
    title: "Copilot Strategie & Rollout-Begleitung",
    duration: "1 Tag (7 Stunden)",
    description: "Strategischer Workshop für Inhouse-Enablement und Rollout-Begleitung. Wir begleiten Copilot-Rollouts inklusive Governance, Use-Case-Definition und Adoption für mittelständische und größere Organisationen.",
    features: [
      "Prozessanalyse und Use-Case-Definition",
      "ROI-Berechnung und Business Case",
      "Phasenweiser Rollout-Plan",
      "Change Management und Adoption",
      "Governance-Framework entwickeln"
    ]
  },
  {
    title: "KI-Agenten und Automatisierung mit Microsoft Copilot Studio",
    duration: "1 Tag (7 Stunden)",
    description: "Fortgeschrittenes Training zur Entwicklung intelligenter KI-Agenten und Automatisierungs-Workflows mit Microsoft Copilot Studio.",
    features: [
      "Custom Agents für Microsoft Teams erstellen",
      "Integration mit Unternehmensdaten",
      "Workflow-Automatisierung mit Power Automate",
      "Testing und Deployment"
    ]
  },
  {
    title: "Interner Mitarbeiter-Chatbot mit Microsoft Copilot entwickeln",
    duration: "Halber Tag Online (4 Stunden)",
    description: "Kompakt-Training zur schnellen Entwicklung eines unternehmensinternen KI-Chatbots mit Microsoft Copilot Studio.",
    features: [
      "Schnelleinstieg Copilot Studio",
      "Chatbot-Design für Mitarbeiteranfragen",
      "Anbindung interner Wissensquellen",
      "Teams-Integration in der Praxis"
    ]
  },
  {
    title: "Low-Code Entwicklung mit Microsoft Copilot - Flow Coding im Unternehmen",
    duration: "1 Tag (7 Stunden)",
    description: "Praxistraining für Citizen Developer und Business User: Lernen Sie, wie Sie mit Microsoft Power Platform und Copilot-Unterstützung geschäftliche Anwendungen entwickeln.",
    features: [
      "Low-Code Entwicklung mit Power Apps und Copilot",
      "Geschäftsprozess-Automatisierung mit Power Automate",
      "Datenmodellierung mit Dataverse",
      "Integration mit Microsoft 365"
    ]
  },
  {
    title: "Individuelle Copilot-Schulungen & Coaching",
    duration: "Flexibel (nach Bedarf)",
    description: "Coaching & Beratung: Individuelle Begleitung von Führungskräften, Produkt- und Transformationsteams zur Etablierung nachhaltiger, Copilot-gestützter Arbeitsweisen. Maßgeschneidert für wissensintensive Organisationen mit 50–10.000 Mitarbeitenden.",
    features: [
      "Abteilungsspezifische Schulungskonzepte",
      "Coaching für Führungskräfte und Teams",
      "Branchenspezifische Use Cases entwickeln",
      "Individuelle Prompt-Bibliothek erstellen",
      "Nachhaltige Adoption sicherstellen"
    ]
  }
];

const Index = () => {
  const schema = generateTrainingSchemas(trainingModules);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Microsoft Copilot Schulungen & Trainings | copilotenschule.de"
        description="copilotenschule.de bietet spezialisierte Weiterbildungen für Microsoft Copilot. Praxis-Trainings, Inhouse-Enablement und Coaching für Wissensarbeiter, Teams und Organisationen im DACH-Raum. Eine Marke der Yellow-Boat Consulting (gegr. 2011)."
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
        <TrainingModules />
        <TrainingLocations />
        <Benefits />
        <TrustBadges />
        <CustomerReviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;