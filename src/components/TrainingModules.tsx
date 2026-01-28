import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, TrendingUp, Shield, Clock, Laptop, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type CopilotTier = "free" | "paid";

interface TrainingModule {
  icon: typeof Brain;
  title: string;
  duration: string;
  description: string;
  features: string[];
  tiers: CopilotTier[];
}

const modules: TrainingModule[] = [
  {
    icon: Brain,
    title: "Microsoft 365 Copilot Grundlagen-Training",
    duration: "1 Tag (7 Stunden)",
    description: "Praxisorientiertes Einführungstraining in Microsoft 365 Copilot für Word, Excel, PowerPoint, Outlook und Teams. Sie lernen, wie Sie KI-gestützte Funktionen sofort in Ihrem Arbeitsalltag einsetzen und produktiver werden. Das Training basiert auf realen Dokumenten, E-Mails und Präsentationen aus Ihrer täglichen Arbeit.",
    features: [
      "Praktische Anwendung von Copilot in Word: Dokumenterstellung, Textoptimierung, Zusammenfassungen und intelligente Formatierung",
      "Excel-Datenanalyse mit Copilot: Formeln generieren, Datenvisualisierung, Pivot-Tabellen erstellen und Insights gewinnen",
      "PowerPoint-Präsentationen effizient gestalten: Folien generieren, Design optimieren, Inhalte strukturieren",
      "E-Mail-Produktivität steigern mit Outlook Copilot: E-Mail-Entwürfe erstellen, Postfach organisieren, Meeting-Follow-ups automatisieren",
      "Teams-Meetings optimieren: Besprechungen zusammenfassen, Aktionspunkte extrahieren, automatische Protokolle erstellen",
      "Prompt Engineering Grundlagen: Effektive Anfragen formulieren für bessere Ergebnisse",
      "Eigene Use Cases aus Ihrem Arbeitsalltag praktisch umsetzen und direkt anwendbare Workflows entwickeln"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Users,
    title: "Microsoft 365 Copilot Advanced - Power User Schulung",
    duration: "2 Tage (14 Stunden)",
    description: "Intensiv-Training für fortgeschrittene Anwender: Lernen Sie komplexe Workflows zu automatisieren, anspruchsvolle Datenanalysen durchzuführen und Copilot für unternehmenskritische Aufgaben einzusetzen. Sie entwickeln fortgeschrittene Prompting-Strategien und erstellen abteilungsübergreifende Automation-Workflows.",
    features: [
      "Komplexe Excel-Analysen: Pivot-Tabellen automatisch generieren, statistische Auswertungen, Forecasting und What-If-Analysen mit Copilot",
      "Power BI Integration: Datenvisualisierungen erstellen, Dashboards optimieren, Reports automatisch generieren",
      "Cross-Application Workflows: Automatisierte Prozesse zwischen Word, Excel, PowerPoint, Teams und Outlook entwickeln",
      "Advanced Prompt Engineering: Kontextuelle Prompts erstellen, Chain-of-Thought Techniken, Custom Instructions entwickeln",
      "Wiederkehrende Aufgaben automatisieren: Individuelle Prompt-Bibliothek aufbauen, Templates erstellen, Best Practices für Ihr Team",
      "Copilot für Projektmanagement: Projektpläne erstellen, Status-Reports automatisieren, Ressourcenplanung optimieren",
      "Praktische Übungen mit realen Business-Szenarien aus Ihrem Unternehmenskontext"
    ],
    tiers: ["paid"]
  },
  {
    icon: Laptop,
    title: "GitHub Copilot für Softwareentwickler",
    duration: "1 Tag (7 Stunden)",
    description: "Hands-on Entwickler-Training: Maximieren Sie Ihre Coding-Produktivität mit GitHub Copilot. Sie lernen, KI-gestützt Code zu generieren, zu testen, zu debuggen und zu dokumentieren. Das Training umfasst praktische Übungen mit echten Projekten, Code-Reviews und Best Practices für die Integration in Ihren Development-Workflow.",
    features: [
      "Effiziente Code-Generierung in VS Code: Funktionen, Klassen, APIs und Algorithmen mit Copilot entwickeln",
      "Intelligentes Debugging und Refactoring: Fehler identifizieren, Code optimieren, Legacy-Code modernisieren",
      "Automatisierte Code-Dokumentation: Inline-Kommentare, README-Dateien, API-Dokumentation generieren",
      "Unit Tests schreiben mit Copilot: Test-Cases generieren, Code-Coverage erhöhen, Test-Driven Development beschleunigen",
      "Copilot Chat effektiv nutzen: Kontextbezogene Fragen stellen, Code erklären lassen, Lösungsvorschläge erhalten",
      "Best Practices für Prompt Engineering in der Softwareentwicklung: Präzise Anfragen formulieren, Kontext bereitstellen",
      "Security und Code Quality: Sicherheitslücken identifizieren, Code-Standards einhalten, Review-Prozesse optimieren",
      "Integration in CI/CD Pipelines und Team-Workflows"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Shield,
    title: "Microsoft Copilot & Compliance - Rechtssichere KI-Nutzung",
    duration: "4 Stunden (Halbtag)",
    description: "Kompakt-Schulung zur rechtssicheren und datenschutzkonformen Nutzung von Microsoft Copilot im Unternehmen. Sie erhalten praktische Checklisten, Templates und Guidelines für DSGVO-konforme KI-Anwendung, verstehen die Anforderungen des EU AI Act und können Compliance-Risiken proaktiv managen.",
    features: [
      "DSGVO-konforme Copilot-Nutzung: Datenverarbeitung verstehen, Rechtsgrundlagen kennen, Dokumentationspflichten erfüllen",
      "EU AI Act Anforderungen im Unternehmenskontext: Risikoklassifizierung, Compliance-Anforderungen, Transparenzpflichten",
      "Datenschutz-Impact-Assessment durchführen: Risiken identifizieren, Maßnahmen definieren, Dokumentation erstellen",
      "Microsoft 365 Sicherheitsarchitektur: Datenflüsse verstehen, Verschlüsselung, Zugriffskontrolle, Audit-Logs",
      "Compliance-Checkliste für Ihr Unternehmen: Praktische Templates, Prozesse etablieren, Team schulen",
      "Umgang mit sensiblen Daten: Klassifizierung, Information Protection, DLP-Richtlinien",
      "Rechtliche Fallstricke vermeiden: Urheberrecht, Haftungsfragen, Vertragsgestaltung mit Microsoft"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: TrendingUp,
    title: "Copilot Strategie & Change Management Workshop",
    duration: "1 Tag (7 Stunden)",
    description: "Strategischer Workshop zur erfolgreichen Einführung und Skalierung von Microsoft Copilot in Ihrem Unternehmen. Sie entwickeln eine datenbasierte Copilot-Strategie, identifizieren High-Impact Use Cases, berechnen den ROI und erstellen einen konkreten Rollout- und Change-Management-Plan für Ihre Organisation.",
    features: [
      "Prozessanalyse und Potenzialidentifikation: Wo generiert Copilot den größten Mehrwert für Ihr Unternehmen?",
      "ROI-Berechnung und Business Case: Kosteneinsparungen quantifizieren, Produktivitätsgewinne messen, Quick Wins identifizieren",
      "Phasenweiser Rollout-Plan: Pilot-Gruppen definieren, Erfolgskriterien festlegen, Skalierungsstrategie entwickeln",
      "Change Management und Adoption: Widerstände überwinden, Champions aufbauen, kontinuierliche Verbesserung etablieren",
      "Governance Framework aufbauen: Policies definieren, Verantwortlichkeiten klären, Eskalationsprozesse etablieren",
      "Success Metrics und KPIs definieren: Nutzung messen, Produktivität tracken, Anwenderfeedback systematisch einholen",
      "Best Practices aus erfolgreichen Copilot-Rollouts: Lessons learned, typische Stolpersteine, Erfolgsfaktoren"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Brain,
    title: "KI-Agenten und Automatisierung mit Microsoft Copilot Studio",
    duration: "1 Tag (7 Stunden)",
    description: "Fortgeschrittenes Training zur Entwicklung intelligenter KI-Agenten und Automatisierungs-Workflows mit Microsoft Copilot Studio. Sie lernen, wie Sie benutzerdefinierte Copilot-Agenten für spezifische Geschäftsprozesse erstellen, diese mit Unternehmensdaten verbinden und in Microsoft Teams sowie andere Anwendungen integrieren.",
    features: [
      "Copilot Studio Grundlagen: Plattform-Überblick, Architektur verstehen, Entwicklungsumgebung einrichten",
      "Custom Agents für Microsoft Teams erstellen: Conversational AI entwickeln, Natural Language Processing nutzen",
      "Integration mit Unternehmensdaten: SharePoint, Dataverse, externe APIs anbinden, Datenquellen konfigurieren",
      "Workflow-Automatisierung mit Power Automate: Geschäftsprozesse digitalisieren, Genehmigungsprozesse abbilden",
      "Prompt Engineering für Agenten: Systemanweisungen optimieren, Kontext-Management, Guardrails implementieren",
      "Testing und Deployment: Agenten testen, Performance optimieren, Rollout planen, Monitoring einrichten",
      "Use Cases aus der Praxis: HR-Assistent, IT-Helpdesk-Agent, Sales-Support-Bot, Onboarding-Assistent"
    ],
    tiers: ["paid"]
  },
  {
    icon: Users,
    title: "Interner Mitarbeiter-Chatbot mit Microsoft Copilot entwickeln",
    duration: "Halber Tag Online (4 Stunden)",
    description: "Kompakt-Training zur schnellen Entwicklung eines unternehmensinternen KI-Chatbots mit Microsoft Copilot Studio. Sie lernen, wie Sie in wenigen Stunden einen funktionsfähigen Chatbot für häufige Mitarbeiteranfragen erstellen, mit internen Wissensdatenbanken verbinden und in Microsoft Teams ausrollen.",
    features: [
      "Schnelleinstieg Copilot Studio: Interface verstehen, erste Schritte, Template nutzen",
      "Chatbot-Design für Mitarbeiteranfragen: Conversation Flow entwerfen, Intents definieren, Antworten formulieren",
      "Anbindung interner Wissensquellen: SharePoint-Integration, FAQ-Dokumente, Unternehmens-Wiki verbinden",
      "Teams-Integration in der Praxis: Chatbot deployen, Berechtigungen konfigurieren, Benutzer onboarden",
      "Testing und Optimierung: Testszenarien durchspielen, Fehlerbehandlung, Antwortqualität verbessern",
      "Use Cases: HR-Anfragen automatisieren, IT-Support-Tickets reduzieren, Onboarding-Prozesse digitalisieren"
    ],
    tiers: ["paid"]
  },
  {
    icon: Zap,
    title: "Low-Code Entwicklung mit Microsoft Copilot - Flow Coding im Unternehmen",
    duration: "1 Tag (7 Stunden)",
    description: "Praxistraining für Citizen Developer und Business User: Lernen Sie, wie Sie mit Microsoft Power Platform und Copilot-Unterstützung geschäftliche Anwendungen ohne traditionelle Programmierung entwickeln. Sie erstellen Apps, automatisieren Workflows und bauen Datenintegration – alles mit Low-Code und KI-Support.",
    features: [
      "Low-Code Entwicklung mit Power Apps und Copilot: Apps per natürlicher Sprache erstellen, UI designen, Logik implementieren",
      "Geschäftsprozess-Automatisierung mit Power Automate: Workflows erstellen, Genehmigungen automatisieren, Integrationen bauen",
      "Copilot als Entwicklungs-Assistent: Code-Generierung für Formeln, Fehlersuche, Optimierungsvorschläge",
      "Datenmodellierung mit Dataverse: Tabellen erstellen, Beziehungen definieren, Business Rules implementieren",
      "Integration mit Microsoft 365: SharePoint, Teams, Outlook, Excel nahtlos verbinden",
      "Best Practices für Citizen Development: Governance beachten, Wartbarkeit sicherstellen, Sicherheitsaspekte berücksichtigen",
      "Praktische Projekte: Von der Idee zur fertigen App – Teilnehmer entwickeln eigene Anwendungen"
    ],
    tiers: ["paid"]
  },
  {
    icon: Clock,
    title: "Individuelle Copilot-Schulungen nach Maß",
    duration: "Flexibel (nach Bedarf)",
    description: "Maßgeschneiderte Microsoft Copilot Trainings, die exakt auf Ihre Unternehmenssituation, Branche und spezifischen Anforderungen zugeschnitten sind. Ob Sales, Marketing, HR, Finance, Produktion oder Verwaltung – wir entwickeln Use Cases mit Ihren realen Daten und Prozessen und trainieren Ihre Teams abteilungsspezifisch.",
    features: [
      "Abteilungsspezifische Schulungskonzepte: Vertrieb, Marketing, HR, Finanzen, Einkauf, Produktion, IT",
      "Training mit Ihren echten Unternehmensdaten und -prozessen: Realistische Szenarien, direkt übertragbare Ergebnisse",
      "Branchenspezifische Use Cases: Fertigung, Gesundheitswesen, Finanzdienstleistungen, Öffentlicher Sektor, Handel",
      "Individuelle Prompt-Bibliothek entwickeln: Abteilungsspezifische Templates, Best-Practice-Prompts dokumentieren",
      "Follow-up Sessions und kontinuierliche Begleitung: Refresher-Trainings, Coaching, Support nach dem Training",
      "Schulungsformate nach Wunsch: Workshops, Webinare, Train-the-Trainer, Einzelcoaching, Team-Sessions",
      "Flexible Durchführung: Vor Ort, Remote oder Hybrid – passend zu Ihren Rahmenbedingungen"
    ],
    tiers: ["free", "paid"]
  }
];

type TierFilter = "all" | "free" | "paid";

const tierFilterOptions: { value: TierFilter; label: string }[] = [
  { value: "all", label: "Alle Trainings" },
  { value: "free", label: "Copilot Free" },
  { value: "paid", label: "Copilot Paid" },
];

const TrainingModules = () => {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleCard = (title: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const filteredModules = tierFilter === "all"
    ? modules
    : modules.filter(m => m.tiers.includes(tierFilter));

  return (
    <section id="trainings" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 animate-slide-up">
            Microsoft Copilot Schulungen & Trainings für Unternehmen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-fade-in-delayed">
            Unsere Trainings sind konsequent auf die konkreten Bedarfe Ihrer Organisation zugeschnitten.
            Statt standardisierter Inhalte arbeiten wir mit Ihren realen Arbeitsprozessen, typischen Aufgaben
            und relevanten Use Cases. So stellen wir sicher, dass Microsoft Copilot dort ansetzt, wo er im
            Alltag tatsächlich Wirkung entfaltet.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-delayed-2">
            Ein zentraler Bestandteil unserer Trainings ist die gemeinsame praktische Arbeit in der Gruppe.
            Wir nehmen uns bewusst Zeit für Übungen, Anwendungsszenarien und Reflexion, um die Hürde zwischen
            Lernen und produktivem Einsatz zu überwinden. Die Teilnehmenden verlassen das Training nicht mit
            Theorie, sondern mit erprobten Workflows, die sie direkt weiter nutzen können.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">
                Copilot Free
              </Badge>
              <span className="text-sm text-muted-foreground">Microsoft 365 Copilot Chat (Websuche, kostenlos)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">
                Copilot Paid
              </Badge>
              <span className="text-sm text-muted-foreground">Microsoft 365 Copilot mit Lizenz (Grounding, M365-Integration)</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-4">
            Wir bieten Trainings gezielt für beide Tiers an, damit Ihre Mitarbeitenden genau auf die Tools geschult werden, die sie im Unternehmen tatsächlich zur Verfügung haben.
          </p>
        </div>

        {/* Tier Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1 bg-muted/60 rounded-lg border">
            {tierFilterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTierFilter(option.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  tierFilter === option.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => {
            const Icon = module.icon;
            const isExpanded = expandedCards[module.title];
            const visibleFeatures = isExpanded ? module.features : module.features.slice(0, 3);
            const hasMoreFeatures = module.features.length > 3;

            return (
              <Card
                key={module.title}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in relative overflow-hidden bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <CardHeader className="relative z-10">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {module.tiers.includes("free") && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">
                        Copilot Free
                      </Badge>
                    )}
                    {module.tiers.includes("paid") && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">
                        Copilot Paid
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{module.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <p className="text-muted-foreground leading-relaxed">{module.description}</p>
                  <ul className="space-y-2">
                    {visibleFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm group/item">
                        <span className="text-primary mt-0.5 group-hover/item:scale-125 transition-transform">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {hasMoreFeatures && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCard(module.title)}
                      className="w-full text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      {isExpanded ? (
                        <>
                          Weniger anzeigen
                          <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {module.features.length - 3} weitere Details anzeigen
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full mt-4 hover:bg-accent/10 hover:border-accent transition-all duration-300 hover:scale-105"
                    onClick={scrollToContact}
                  >
                    Training anfragen
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrainingModules;