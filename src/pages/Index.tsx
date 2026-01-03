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
const trainingModules = [
  {
    title: "Microsoft 365 Copilot Grundlagen-Training",
    duration: "1 Tag (7 Stunden)",
    description: "Praxisorientiertes Einführungstraining in Microsoft 365 Copilot für Word, Excel, PowerPoint, Outlook und Teams. Sie lernen, wie Sie KI-gestützte Funktionen sofort in Ihrem Arbeitsalltag einsetzen und produktiver werden.",
    features: [
      "Praktische Anwendung von Copilot in Word",
      "Excel-Datenanalyse mit Copilot",
      "PowerPoint-Präsentationen effizient gestalten",
      "E-Mail-Produktivität steigern mit Outlook Copilot",
      "Teams-Meetings optimieren",
      "Prompt Engineering Grundlagen"
    ]
  },
  {
    title: "Microsoft 365 Copilot Advanced - Power User Schulung",
    duration: "2 Tage (14 Stunden)",
    description: "Intensiv-Training für fortgeschrittene Anwender: Lernen Sie komplexe Workflows zu automatisieren, anspruchsvolle Datenanalysen durchzuführen und Copilot für unternehmenskritische Aufgaben einzusetzen.",
    features: [
      "Komplexe Excel-Analysen",
      "Power BI Integration",
      "Cross-Application Workflows",
      "Advanced Prompt Engineering",
      "Wiederkehrende Aufgaben automatisieren"
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
    title: "Copilot Strategie & Change Management Workshop",
    duration: "1 Tag (7 Stunden)",
    description: "Strategischer Workshop zur erfolgreichen Einführung und Skalierung von Microsoft Copilot in Ihrem Unternehmen.",
    features: [
      "Prozessanalyse und Potenzialidentifikation",
      "ROI-Berechnung und Business Case",
      "Phasenweiser Rollout-Plan",
      "Change Management und Adoption"
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
    title: "Individuelle Copilot-Schulungen nach Maß",
    duration: "Flexibel (nach Bedarf)",
    description: "Maßgeschneiderte Microsoft Copilot Trainings, die exakt auf Ihre Unternehmenssituation, Branche und spezifischen Anforderungen zugeschnitten sind.",
    features: [
      "Abteilungsspezifische Schulungskonzepte",
      "Training mit Ihren echten Unternehmensdaten",
      "Branchenspezifische Use Cases",
      "Individuelle Prompt-Bibliothek entwickeln"
    ]
  }
];

const Index = () => {
  const schema = generateTrainingSchemas(trainingModules);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Microsoft Copilot Schulungen & Trainings"
        description="Professionelle Microsoft 365 Copilot, GitHub Copilot & KI-Agenten Schulungen für Unternehmen. Praxistraining mit 80% Hands-on: Inhouse, Remote oder in Köln. DSGVO-konform. Sofort umsetzbar."
        keywords={[
          "Microsoft Copilot Schulung",
          "Microsoft 365 Copilot Training",
          "GitHub Copilot Kurs",
          "KI-Agenten Schulung",
          "Copilot Studio Training",
          "Low-Code Entwicklung",
          "Power Automate Schulung"
        ]}
        canonicalUrl="https://copilotenschule.de/"
        schema={schema}
      />
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <TrainingModules />
        <TrainingLocations />
        <Benefits />
        <CustomerReviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;