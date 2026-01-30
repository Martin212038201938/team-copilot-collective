import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Loader2, Calendar, HelpCircle, X, Plus, Trash2, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";

// Kategorien für die Module
interface ModuleCategory {
  id: string;
  title: string;
  description: string;
  modules: TrainingModule[];
}

type CopilotTier = "free" | "paid";

interface TrainingModule {
  id: string;
  title: string;
  category: string;
  tiers: CopilotTier[];
}

// Alle auswählbaren Trainingsmodule - konsistent mit TrainingModules.tsx
const moduleCategories: ModuleCategory[] = [
  {
    id: "m365-basics",
    title: "Microsoft 365 Copilot Grundlagen",
    description: "Einstieg in die produktive Nutzung von Copilot – Prompt Engineering und KI-Kompetenz",
    modules: [
      { id: "prompt-basics", title: "Prompt Engineering Grundlagen: Struktur, Kontext, Beispiele", tiers: ["free", "paid"], category: "m365-basics" },
      { id: "iterative-prompting", title: "Iteratives Prompting: Ergebnisse verfeinern, nachfragen, vertiefen", tiers: ["free", "paid"], category: "m365-basics" },
      { id: "copilot-chat-research", title: "Copilot Chat für Recherche: Web-Suche, Zusammenfassungen, Faktenprüfung", tiers: ["free"], category: "m365-basics" },
      { id: "text-work", title: "Textarbeit mit KI: Schreiben, Umformulieren, Kürzen, Übersetzen", tiers: ["free", "paid"], category: "m365-basics" },
      { id: "creative-ai", title: "Kreative Anwendungen: Brainstorming, Ideengenerierung, Perspektivwechsel", tiers: ["free", "paid"], category: "m365-basics" },
      { id: "ai-output-eval", title: "KI-Output kritisch bewerten: Halluzinationen erkennen, Grenzen verstehen", tiers: ["free", "paid"], category: "m365-basics" },
      { id: "prompt-library", title: "Eigene Prompt-Bibliothek aufbauen: Templates für wiederkehrende Aufgaben", tiers: ["free", "paid"], category: "m365-basics" },
    ]
  },
  {
    id: "m365-apps",
    title: "Microsoft 365 Copilot in den Apps",
    description: "Copilot in Word, Excel, PowerPoint, Outlook und Teams produktiv nutzen",
    modules: [
      { id: "word-copilot", title: "Copilot in Word: Dokumente erstellen, überarbeiten, zusammenfassen, formatieren", tiers: ["paid"], category: "m365-apps" },
      { id: "excel-copilot", title: "Copilot in Excel: Formeln generieren, Daten analysieren, Pivot-Tabellen, Insights", tiers: ["paid"], category: "m365-apps" },
      { id: "ppt-copilot", title: "Copilot in PowerPoint: Präsentationen aus Briefings erstellen, Design optimieren", tiers: ["paid"], category: "m365-apps" },
      { id: "outlook-copilot", title: "Copilot in Outlook: E-Mail-Entwürfe, Postfach organisieren, Meeting-Follow-ups", tiers: ["paid"], category: "m365-apps" },
      { id: "teams-copilot", title: "Copilot in Teams: Meetings zusammenfassen, Aktionspunkte, Chat durchsuchen", tiers: ["paid"], category: "m365-apps" },
      { id: "cross-app", title: "Cross-App-Workflows: Dokumente aus E-Mails, Präsentationen aus Word-Texten", tiers: ["paid"], category: "m365-apps" },
      { id: "office-prompts", title: "Prompt Engineering für Office: App-spezifische Prompts, die funktionieren", tiers: ["paid"], category: "m365-apps" },
    ]
  },
  {
    id: "m365-advanced",
    title: "Ausbildung zum KI-unterstützten Wissensarbeiter",
    description: "Umfassendes Programm von den Grundlagen bis zum Expertenniveau",
    modules: [
      { id: "llm-basics", title: "Grundlagen-Modul: Wie LLMs funktionieren, Möglichkeiten und Grenzen", tiers: ["paid"], category: "m365-advanced" },
      { id: "copilot-mastery", title: "Copilot Chat Mastery: Komplexe Recherchen, Zusammenfassungen, Faktencheck", tiers: ["paid"], category: "m365-advanced" },
      { id: "prompt-intensive", title: "Prompt Engineering Intensiv: Few-Shot Learning, Chain-of-Thought", tiers: ["paid"], category: "m365-advanced" },
      { id: "data-reporting", title: "Datenanalyse & Reporting: Komplexe Excel-Analysen, automatisierte Reports", tiers: ["paid"], category: "m365-advanced" },
      { id: "usecase-workshop", title: "Use Case Workshop: 10+ reale Szenarien aus Vertrieb, Marketing, HR, Finance", tiers: ["paid"], category: "m365-advanced" },
      { id: "peer-learning", title: "Peer Learning & Gruppenarbeit: Best Practices teilen, gemeinsam Probleme lösen", tiers: ["paid"], category: "m365-advanced" },
      { id: "certificate", title: "Zertifikat: Nachweis Ihrer KI-Kompetenz für HR und Personalentwicklung", tiers: ["paid"], category: "m365-advanced" },
    ]
  },
  {
    id: "lernreise",
    title: "Copilot Lernreise (8 Wochen)",
    description: "Begleitete Lernreise für nachhaltigen Kompetenzaufbau",
    modules: [
      { id: "woche1", title: "Woche 1: Copilot Grundlagen – Interface, erste Prompts + Use Case: E-Mail-Zusammenfassungen", tiers: ["paid"], category: "lernreise" },
      { id: "woche2", title: "Woche 2: Copilot in Word – Dokumente erstellen + Use Case: Protokoll aus Meeting-Notizen", tiers: ["paid"], category: "lernreise" },
      { id: "woche3", title: "Woche 3: Copilot in Excel – Datenanalyse, Formeln + Use Case: Monatsbericht automatisieren", tiers: ["paid"], category: "lernreise" },
      { id: "woche4", title: "Woche 4: Copilot in PowerPoint + Use Case: Pitch-Deck aus Briefing", tiers: ["paid"], category: "lernreise" },
      { id: "woche5", title: "Woche 5: Copilot in Outlook + Use Case: Wöchentliche Status-Mail automatisieren", tiers: ["paid"], category: "lernreise" },
      { id: "woche6", title: "Woche 6: Copilot in Teams + Use Case: Meeting-Follow-ups automatisieren", tiers: ["paid"], category: "lernreise" },
      { id: "woche7", title: "Woche 7: Advanced Prompting + Use Case: Persönliche Prompt-Bibliothek", tiers: ["paid"], category: "lernreise" },
      { id: "woche8", title: "Woche 8: Integration & Workflow + Use Case: End-to-End-Workflow entwickeln", tiers: ["paid"], category: "lernreise" },
    ]
  },
  {
    id: "github",
    title: "GitHub Copilot für Entwickler",
    description: "KI-gestützte Softwareentwicklung mit GitHub Copilot",
    modules: [
      { id: "stack-setup", title: "Stack Setup & Konfiguration: IDE-Einrichtung, Extensions, Team-Policies", tiers: ["free", "paid"], category: "github" },
      { id: "code-gen", title: "Effiziente Code-Generierung: Funktionen, Klassen, APIs – sprachunabhängig", tiers: ["free", "paid"], category: "github" },
      { id: "debugging", title: "Intelligentes Debugging und Refactoring: Fehler identifizieren, Legacy-Code modernisieren", tiers: ["free", "paid"], category: "github" },
      { id: "documentation", title: "Automatisierte Code-Dokumentation: Kommentare, README, API-Docs, Changelogs", tiers: ["free", "paid"], category: "github" },
      { id: "testing", title: "Unit Tests schreiben mit Copilot: Test-Cases, Code-Coverage, TDD", tiers: ["free", "paid"], category: "github" },
      { id: "copilot-chat-agent", title: "Copilot Chat & Agent Mode: Multi-File-Refactoring, Workspace-Verständnis", tiers: ["free", "paid"], category: "github" },
      { id: "dev-workflows", title: "Optimierte Developer Workflows: Git, PR-Beschreibungen, Commit Messages, Code Reviews", tiers: ["free", "paid"], category: "github" },
      { id: "security", title: "Security und Code Quality: Sicherheitslücken identifizieren, SAST-Integration", tiers: ["free", "paid"], category: "github" },
      { id: "cicd", title: "CI/CD Integration: Copilot in Pipelines, GitHub Actions mit Copilot-Support", tiers: ["free", "paid"], category: "github" },
      { id: "team-config", title: "Team-Konfiguration: Business/Enterprise Features, Policies, Content Exclusions", tiers: ["paid"], category: "github" },
    ]
  },
  {
    id: "compliance",
    title: "Compliance, Recht & EU AI Act",
    description: "DSGVO-konforme und rechtssichere KI-Nutzung im Unternehmen",
    modules: [
      { id: "dsgvo", title: "DSGVO-konforme Copilot-Nutzung: Rechtsgrundlagen, Dokumentationspflichten", tiers: ["free", "paid"], category: "compliance" },
      { id: "eu-ai-act", title: "EU AI Act Grundlagen: Anwendungsbereich, Risikoklassifizierung, Pflichten", tiers: ["free", "paid"], category: "compliance" },
      { id: "ai-kompetenz", title: "Artikel 4 KI-Kompetenz: Was der Gesetzgeber fordert, Anforderungen erfüllen", tiers: ["free", "paid"], category: "compliance" },
      { id: "dpia", title: "Datenschutz-Impact-Assessment: Risiken identifizieren, Maßnahmen definieren", tiers: ["free", "paid"], category: "compliance" },
      { id: "security-arch", title: "Microsoft 365 Sicherheitsarchitektur: Datenflüsse, Verschlüsselung, Audit-Logs", tiers: ["paid"], category: "compliance" },
      { id: "sensitive-data", title: "Umgang mit sensiblen Daten: Klassifizierung, Information Protection, DLP", tiers: ["paid"], category: "compliance" },
      { id: "legal", title: "Rechtliche Aspekte: Urheberrecht, Haftungsfragen, Vertragsgestaltung", tiers: ["free", "paid"], category: "compliance" },
      { id: "eu-ai-certificate", title: "Schulungszertifikat gemäß EU AI Act für Audits und Behörden", tiers: ["free", "paid"], category: "compliance" },
    ]
  },
  {
    id: "strategy",
    title: "Strategie & Change Management",
    description: "Erfolgreiche Einführung und Skalierung von Copilot im Unternehmen",
    modules: [
      { id: "process-analysis", title: "Prozessanalyse: Wo generiert Copilot den größten Mehrwert?", tiers: ["free", "paid"], category: "strategy" },
      { id: "roi", title: "ROI-Berechnung und Business Case: Kosteneinsparungen quantifizieren", tiers: ["free", "paid"], category: "strategy" },
      { id: "rollout-plan", title: "Phasenweiser Rollout-Plan: Pilot-Gruppen, Erfolgskriterien, Skalierung", tiers: ["free", "paid"], category: "strategy" },
      { id: "change-mgmt", title: "Change Management und Adoption: Widerstände überwinden, Champions aufbauen", tiers: ["free", "paid"], category: "strategy" },
      { id: "governance", title: "Governance Framework: Policies definieren, Verantwortlichkeiten klären", tiers: ["free", "paid"], category: "strategy" },
      { id: "kpis", title: "Success Metrics und KPIs: Nutzung messen, Produktivität tracken", tiers: ["free", "paid"], category: "strategy" },
      { id: "best-practices", title: "Best Practices aus erfolgreichen Copilot-Rollouts: Lessons Learned", tiers: ["free", "paid"], category: "strategy" },
    ]
  },
  {
    id: "copilot-studio",
    title: "Copilot Studio & KI-Agenten",
    description: "Entwicklung eigener KI-Agenten und Chatbots",
    modules: [
      { id: "studio-basics", title: "Copilot Studio Grundlagen: Plattform-Überblick, Entwicklungsumgebung", tiers: ["paid"], category: "copilot-studio" },
      { id: "custom-agents", title: "Custom Agents für Teams: Conversational AI, Natural Language Processing", tiers: ["paid"], category: "copilot-studio" },
      { id: "data-integration", title: "Integration mit Unternehmensdaten: SharePoint, Dataverse, externe APIs", tiers: ["paid"], category: "copilot-studio" },
      { id: "power-automate", title: "Workflow-Automatisierung mit Power Automate: Geschäftsprozesse digitalisieren", tiers: ["paid"], category: "copilot-studio" },
      { id: "agent-prompts", title: "Prompt Engineering für Agenten: Systemanweisungen, Guardrails", tiers: ["paid"], category: "copilot-studio" },
      { id: "chatbot-design", title: "Chatbot-Design: Conversation Flow, Intents, Antworten strukturieren", tiers: ["paid"], category: "copilot-studio" },
      { id: "knowledge-sources", title: "Anbindung interner Wissensquellen: SharePoint, FAQ-Dokumente, Wiki", tiers: ["paid"], category: "copilot-studio" },
      { id: "chatbot-deployment", title: "Live-Deployment in Teams: Berechtigungen, Testing, Monitoring", tiers: ["paid"], category: "copilot-studio" },
    ]
  },
  {
    id: "lowcode",
    title: "Low-Code & Power Platform",
    description: "Apps und Workflows ohne traditionelle Programmierung",
    modules: [
      { id: "power-apps", title: "Low-Code mit Power Apps: Apps per natürlicher Sprache erstellen", tiers: ["paid"], category: "lowcode" },
      { id: "process-automation", title: "Geschäftsprozess-Automatisierung: Workflows, Genehmigungsprozesse", tiers: ["paid"], category: "lowcode" },
      { id: "copilot-assistant", title: "Copilot als Entwicklungs-Assistent: Code-Generierung, Fehlersuche", tiers: ["paid"], category: "lowcode" },
      { id: "dataverse", title: "Datenmodellierung mit Dataverse: Tabellen, Beziehungen, Business Rules", tiers: ["paid"], category: "lowcode" },
      { id: "m365-integration", title: "Integration mit Microsoft 365: SharePoint, Teams, Outlook, Excel verbinden", tiers: ["paid"], category: "lowcode" },
      { id: "citizen-dev", title: "Best Practices für Citizen Development: Governance, Wartbarkeit, Sicherheit", tiers: ["paid"], category: "lowcode" },
    ]
  },
  {
    id: "events-workshops",
    title: "Events, Workshops & Keynotes",
    description: "Hackathons, Keynotes, Eventtage – für maximales Engagement",
    modules: [
      { id: "hackathon-format", title: "Copilot Hackathon: Teambildung, Challenge-Briefing, Arbeitsphase, Pitch", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "hackathon-ideation", title: "Use Case Ideation: Geschäftsprobleme identifizieren und mit Copilot lösen", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "prompt-battle", title: "Prompt Engineering Battle: Wer entwickelt die effektivsten Prompts?", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "keynote-vision", title: "Keynote: Die Zukunft der Wissensarbeit mit KI – was kommt auf uns zu?", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "keynote-demos", title: "Live-Demonstrationen: Beeindruckende Use Cases aus Word, Excel, PowerPoint, Teams", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "keynote-success", title: "Erfolgsfaktoren: Was unterscheidet erfolgreiche Copilot-Einführungen?", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "launch-infostand", title: "Eventtag: Professioneller Infostand mit kompetenten Ansprechpartnern", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "launch-challenges", title: "Eventtag: Interaktive KI-Challenges und Gamification mit Preisen", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "launch-handson", title: "Eventtag: Hands-on Stationen zum Ausprobieren unter Anleitung", tiers: ["free", "paid"], category: "events-workshops" },
      { id: "launch-materials", title: "Eventtag: Hochwertige Infomaterialien, Cheat Sheets, Quick Guides", tiers: ["free", "paid"], category: "events-workshops" },
    ]
  },
  {
    id: "individual",
    title: "Individuelle Schulungen nach Maß",
    description: "Maßgeschneiderte Trainings für Ihre Branche und Anforderungen",
    modules: [
      { id: "dept-sales", title: "Abteilungsspezifisch: Vertrieb – Angebote, Proposals, CRM-Integration", tiers: ["free", "paid"], category: "individual" },
      { id: "dept-marketing", title: "Abteilungsspezifisch: Marketing – Content, Kampagnen, Social Media", tiers: ["free", "paid"], category: "individual" },
      { id: "dept-hr", title: "Abteilungsspezifisch: HR – Recruiting, Onboarding, Personalentwicklung", tiers: ["free", "paid"], category: "individual" },
      { id: "dept-finance", title: "Abteilungsspezifisch: Finance – Reporting, Analyse, Budgetierung", tiers: ["free", "paid"], category: "individual" },
      { id: "industry-specific", title: "Branchenspezifische Use Cases: Fertigung, Healthcare, Finance, Handel", tiers: ["free", "paid"], category: "individual" },
      { id: "real-data", title: "Training mit Ihren echten Unternehmensdaten und -prozessen", tiers: ["free", "paid"], category: "individual" },
      { id: "train-trainer", title: "Train-the-Trainer: Interne Multiplikatoren ausbilden", tiers: ["free", "paid"], category: "individual" },
      { id: "follow-up", title: "Follow-up Sessions: Refresher-Trainings, Coaching, kontinuierliche Begleitung", tiers: ["free", "paid"], category: "individual" },
    ]
  },
];

// Alle Module flach für einfache Suche
const allModules = moduleCategories.flatMap(cat => cat.modules);

type TierFilter = "all" | "free" | "paid";

const tierFilterOptions: { value: TierFilter; label: string }[] = [
  { value: "all", label: "Alle Module" },
  { value: "free", label: "Copilot Free" },
  { value: "paid", label: "Copilot Paid" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  licenseType: string;
  employeeCount: string;
  trainingCount: string;
  locationType: string;
  trainingLocation: string;
  groupCount: string;
  additionalInfo: string;
}

const TrainingKonfigurator = () => {
  const [step, setStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [showTierHelp, setShowTierHelp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [customModules, setCustomModules] = useState<string[]>([]);
  const [customModuleInput, setCustomModuleInput] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    licenseType: "",
    employeeCount: "",
    trainingCount: "",
    locationType: "",
    trainingLocation: "",
    groupCount: "",
    additionalInfo: ""
  });

  // Gefilterte Kategorien basierend auf Tier-Filter
  const filteredCategories = useMemo(() => {
    if (tierFilter === "all") return moduleCategories;

    return moduleCategories
      .map(cat => ({
        ...cat,
        modules: cat.modules.filter(m => m.tiers.includes(tierFilter))
      }))
      .filter(cat => cat.modules.length > 0);
  }, [tierFilter]);

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Custom Module hinzufügen
  const addCustomModule = () => {
    if (customModuleInput.trim() && !customModules.includes(customModuleInput.trim())) {
      setCustomModules(prev => [...prev, customModuleInput.trim()]);
      setCustomModuleInput("");
    }
  };

  // Custom Module entfernen
  const removeCustomModule = (moduleToRemove: string) => {
    setCustomModules(prev => prev.filter(m => m !== moduleToRemove));
  };

  // Deduplizierte Liste der ausgewählten Module-Titel (inkl. Custom)
  const selectedModuleTitles = useMemo(() => {
    const titles = selectedModules
      .map(id => allModules.find(m => m.id === id)?.title)
      .filter(Boolean) as string[];
    return [...new Set(titles)];
  }, [selectedModules]);

  // Alle Module für Anzeige (Standard + Custom)
  const allSelectedTitles = useMemo(() => {
    return [...selectedModuleTitles, ...customModules];
  }, [selectedModuleTitles, customModules]);

  // Prüfen ob Module ausgewählt sind
  const hasAnySelection = selectedModules.length > 0 || customModules.length > 0;

  // E-Mail beim Termin buchen senden und Bookings öffnen
  const handleBookingClick = () => {
    const bookingWindow = window.open('https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/', '_blank');

    if (!bookingWindow) {
      toast({
        title: "Popup blockiert",
        description: "Bitte erlauben Sie Popups für diese Seite oder öffnen Sie den Booking-Link manuell.",
        variant: "destructive"
      });
    }

    setIsBookingSubmitting(true);

    const messageWithModules = `
KONFIGURATION FÜR TERMIN-BUCHUNG

AUSGEWÄHLTE TRAININGSMODULE (${selectedModuleTitles.length} Module):
${selectedModuleTitles.map(t => `• ${t}`).join('\n')}
${customModules.length > 0 ? `
---
EIGENE MODULWÜNSCHE (${customModules.length}):
${customModules.map(t => `★ ${t}`).join('\n')}` : ''}

---
KONTAKTDATEN:
Vorname: ${formData.firstName}
Nachname: ${formData.lastName}
Unternehmen: ${formData.company}
E-Mail: ${formData.email}
Telefon: ${formData.phone}

---
ZUSÄTZLICHE ANGABEN:
${formData.licenseType ? `Lizenztyp: ${formData.licenseType}` : ''}
${formData.employeeCount ? `Unternehmensgröße: ${formData.employeeCount} Mitarbeiter` : ''}
${formData.trainingCount ? `Zu schulende Mitarbeiter: ${formData.trainingCount}` : ''}
${formData.locationType ? `Durchführungsart: ${formData.locationType}` : ''}
${formData.trainingLocation ? `Standort: ${formData.trainingLocation}` : ''}
${formData.groupCount ? `Anzahl Gruppen: ${formData.groupCount}` : ''}

${formData.additionalInfo ? `---\nINFORMATIONEN UND WEITERE BENÖTIGTE INHALTE:\n${formData.additionalInfo}` : ''}
    `.trim();

    fetch('/api/send-contact-email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: messageWithModules,
        subject: `Konfiguration für Kunde (${formData.company}, ${formData.firstName}, ${formData.lastName})`
      }),
    })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      toast({
        title: "Konfiguration gesendet!",
        description: "Ihre Auswahl wurde übermittelt.",
      });
    })
    .catch((error) => {
      console.error('Konfigurator E-Mail Fehler:', error);
      toast({
        title: "Hinweis",
        description: "Terminbuchung geöffnet. E-Mail-Übermittlung wird nachgeholt.",
      });
    })
    .finally(() => {
      setIsBookingSubmitting(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company || !formData.phone) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus (Vorname, Nachname, E-Mail, Unternehmen, Telefon).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const messageWithModules = `
AUSGEWÄHLTE TRAININGSMODULE (${selectedModuleTitles.length} Module):
${selectedModuleTitles.map(t => `• ${t}`).join('\n')}
${customModules.length > 0 ? `
---
EIGENE MODULWÜNSCHE (${customModules.length}):
${customModules.map(t => `★ ${t}`).join('\n')}` : ''}

---
ZUSÄTZLICHE ANGABEN:
${formData.licenseType ? `Lizenztyp: ${formData.licenseType}` : ''}
${formData.employeeCount ? `Unternehmensgröße: ${formData.employeeCount} Mitarbeiter` : ''}
${formData.trainingCount ? `Zu schulende Mitarbeiter: ${formData.trainingCount}` : ''}
${formData.locationType ? `Durchführungsart: ${formData.locationType}` : ''}
${formData.trainingLocation ? `Standort: ${formData.trainingLocation}` : ''}
${formData.groupCount ? `Anzahl Gruppen: ${formData.groupCount}` : ''}

${formData.additionalInfo ? `---\nINFORMATIONEN UND WEITERE BENÖTIGTE INHALTE:\n${formData.additionalInfo}` : ''}
    `.trim();

    const totalModuleCount = selectedModuleTitles.length + customModules.length;

    try {
      const response = await fetch('/api/send-contact-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: messageWithModules,
          subject: `Training-Anfrage: ${totalModuleCount} Module ausgewählt${customModules.length > 0 ? ` (inkl. ${customModules.length} eigene Wünsche)` : ''}`
        }),
      });

      if (response.ok) {
        toast({
          title: "Anfrage gesendet!",
          description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
        });
        setStep(1);
        setSelectedModules([]);
        setCustomModules([]);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          phone: "",
          licenseType: "",
          employeeCount: "",
          trainingCount: "",
          locationType: "",
          trainingLocation: "",
          groupCount: "",
          additionalInfo: ""
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Training Konfigurator | Copilot Schulungen individuell zusammenstellen"
        description="Stellen Sie Ihr individuelles Microsoft Copilot Training zusammen. Wählen Sie aus unseren Modulen und erhalten Sie ein maßgeschneidertes Angebot."
        canonicalUrl="https://copilotenschule.de/training-konfigurator"
      />
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Training Konfigurator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Stellen Sie Ihr individuelles Copilot-Training zusammen.
              Wählen Sie die Module, die für Ihr Team relevant sind, und erhalten Sie ein maßgeschneidertes Angebot.
            </p>

            {/* Tier Badges Info - identisch mit Hauptseite */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 mt-6 max-w-5xl mx-auto">
              {/* Tier badges - centered */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
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

              {/* Collapsible tier check helper */}
              <div className="flex-shrink-0">
                {!showTierHelp ? (
                  <button
                    onClick={() => setShowTierHelp(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-sm font-medium text-primary transition-all duration-200 hover:scale-105"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Welchen Copilot habe ich?
                  </button>
                ) : (
                  <div className="w-80 p-4 rounded-lg border border-primary/30 bg-card shadow-lg text-left animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        So finden Sie Ihr Copilot-Tier heraus
                      </h4>
                      <button
                        onClick={() => setShowTierHelp(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                      <li>Öffnen Sie <strong>Microsoft Copilot</strong> in Teams, Word oder im Browser (copilot.microsoft.com)</li>
                      <li>Achten Sie auf den <strong>Toggle „Work / Web"</strong> oben im Chat. Sehen Sie diesen Schalter, haben Sie <strong>Copilot Paid</strong></li>
                      <li>Stellen Sie die Frage: <em>„Welche Termine habe ich heute?"</em></li>
                      <li>Erhalten Sie Ihre <strong>echten Kalender-Termine</strong> als Antwort → <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">Copilot Paid</Badge></li>
                      <li>Kommt <strong>keine Kalender-Antwort</strong> oder nur eine Web-Suche → <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">Copilot Free</Badge></li>
                    </ol>
                    <button
                      onClick={() => setShowTierHelp(false)}
                      className="mt-3 text-xs text-primary hover:underline"
                    >
                      Schließen
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-4">
              Wir bieten Trainings gezielt für beide Tiers an, damit Ihre Mitarbeitenden genau auf die Tools geschult werden, die sie im Unternehmen tatsächlich zur Verfügung haben.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                1
              </div>
              <span className="font-medium hidden sm:inline">Module auswählen</span>
            </div>
            <div className={`w-16 h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="font-medium hidden sm:inline">Angebot anfordern</span>
            </div>
          </div>

          {/* Step 1: Module Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
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

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Module Categories - left 2/3 */}
                <div className="lg:col-span-2 space-y-6">
                  {filteredCategories.map((category) => (
                    <Card key={category.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/30 pb-3">
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {category.modules.map((module) => {
                            const isSelected = selectedModules.includes(module.id);
                            return (
                              <label
                                key={module.id}
                                htmlFor={`module-${module.id}`}
                                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                                  isSelected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  id={`module-${module.id}`}
                                  checked={isSelected}
                                  onChange={() => toggleModule(module.id)}
                                  className="mt-1 h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
                                />
                                <div className="flex-1">
                                  <span className="text-sm leading-tight block">{module.title}</span>
                                  <div className="flex gap-1 mt-1.5">
                                    {module.tiers.includes("free") && (
                                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[10px] px-1.5 py-0">
                                        Free
                                      </Badge>
                                    )}
                                    {module.tiers.includes("paid") && (
                                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[10px] px-1.5 py-0">
                                        Paid
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Eigene Module anfragen */}
                  <Card className="overflow-hidden border-dashed border-2 border-primary/30 bg-primary/5">
                    <CardHeader className="bg-primary/10 pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Eigene Module anfragen
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Fehlt Ihnen ein Thema? Fügen Sie hier beliebig viele eigene Modulwünsche hinzu.
                      </p>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="z.B. Copilot für Legal Teams, KI in der Produktion..."
                          value={customModuleInput}
                          onChange={(e) => setCustomModuleInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomModule())}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addCustomModule}
                          disabled={!customModuleInput.trim()}
                          className="gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Hinzufügen
                        </Button>
                      </div>

                      {customModules.length > 0 && (
                        <div className="space-y-2">
                          {customModules.map((module, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-3 p-3 rounded-lg border border-primary/30 bg-card"
                            >
                              <div className="flex items-center gap-2">
                                <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 text-[10px] px-1.5 py-0">
                                  Eigenes Modul
                                </Badge>
                                <span className="text-sm">{module}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeCustomModule(module)}
                                className="text-muted-foreground hover:text-destructive transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {customModules.length === 0 && (
                        <p className="text-sm text-muted-foreground italic text-center py-4">
                          Noch keine eigenen Module hinzugefügt. Geben Sie oben Ihren Wunsch ein und klicken Sie auf "Hinzufügen".
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Real-time selection summary - right 1/3 */}
                <div className="lg:col-span-1">
                  <div className="sticky top-28">
                    <Card className={`${hasAnySelection ? 'border-primary' : ''}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle2 className={`w-5 h-5 ${hasAnySelection ? 'text-primary' : 'text-muted-foreground'}`} />
                          Ihre gewünschten Trainingsinhalte
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {!hasAnySelection
                            ? "Noch keine Module ausgewählt"
                            : `${allSelectedTitles.length} Modul${allSelectedTitles.length > 1 ? 'e' : ''} ausgewählt`
                          }
                        </p>
                      </CardHeader>
                      <CardContent>
                        {hasAnySelection ? (
                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                            {/* Standard-Module */}
                            {selectedModuleTitles.map((title, idx) => (
                              <div key={`std-${idx}`} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-0.5">✓</span>
                                <span>{title}</span>
                              </div>
                            ))}
                            {/* Eigene Module */}
                            {customModules.length > 0 && selectedModuleTitles.length > 0 && (
                              <div className="border-t my-2 pt-2">
                                <span className="text-xs text-muted-foreground font-medium">Eigene Modulwünsche:</span>
                              </div>
                            )}
                            {customModules.map((title, idx) => (
                              <div key={`custom-${idx}`} className="flex items-start gap-2 text-sm">
                                <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>{title}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            Wählen Sie links die gewünschten Module aus. Diese erscheinen dann hier in Ihrer individuellen Zusammenstellung.
                          </p>
                        )}

                        <Button
                          size="lg"
                          onClick={() => setStep(2)}
                          disabled={!hasAnySelection}
                          className="w-full mt-6 gap-2"
                        >
                          Weiter zum Angebot
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Form */}
          {step === 2 && (
            <div className="animate-fade-in max-w-4xl mx-auto">
              {/* Selected modules summary */}
              <Card className="mb-8 bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ihre Auswahl ({allSelectedTitles.length} Module)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {selectedModuleTitles.map((title, idx) => (
                      <Badge key={`std-${idx}`} variant="secondary" className="py-1 px-3 text-xs">
                        {title}
                      </Badge>
                    ))}
                    {customModules.map((title, idx) => (
                      <Badge key={`custom-${idx}`} className="py-1 px-3 text-xs bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {title}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="mt-2 p-0 h-auto text-primary"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Module ändern
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Ihre Kontaktdaten</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Füllen Sie das Formular aus und wir erstellen Ihnen ein individuelles Angebot.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Required fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Vorname *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Ihr Vorname"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nachname *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Ihr Nachname"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="ihre@email.de"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Unternehmen *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Ihr Unternehmen"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+49 ..."
                          required
                        />
                      </div>
                    </div>

                    {/* Optional fields section */}
                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-4 text-muted-foreground">
                        Optionale Angaben für ein genaueres Angebot
                      </h3>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="licenseType">Copilot Lizenztyp</Label>
                          <Select
                            value={formData.licenseType}
                            onValueChange={(value) => handleInputChange('licenseType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Copilot Free</SelectItem>
                              <SelectItem value="paid">Copilot mit Lizenz</SelectItem>
                              <SelectItem value="mixed">Gemischt (beides)</SelectItem>
                              <SelectItem value="unsure">Noch nicht bekannt</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="employeeCount">Mitarbeiteranzahl</Label>
                          <Select
                            value={formData.employeeCount}
                            onValueChange={(value) => handleInputChange('employeeCount', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-50">1–50</SelectItem>
                              <SelectItem value="51-200">51–200</SelectItem>
                              <SelectItem value="201-500">201–500</SelectItem>
                              <SelectItem value="501-1000">501–1.000</SelectItem>
                              <SelectItem value="1001-5000">1.001–5.000</SelectItem>
                              <SelectItem value="5000+">Über 5.000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="trainingCount">Zu schulende Mitarbeiter</Label>
                          <Select
                            value={formData.trainingCount}
                            onValueChange={(value) => handleInputChange('trainingCount', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1–10 Personen</SelectItem>
                              <SelectItem value="11-30">11–30 Personen</SelectItem>
                              <SelectItem value="31-50">31–50 Personen</SelectItem>
                              <SelectItem value="51-100">51–100 Personen</SelectItem>
                              <SelectItem value="100+">Über 100 Personen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="locationType">Durchführungsart</Label>
                          <Select
                            value={formData.locationType}
                            onValueChange={(value) => handleInputChange('locationType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inhouse">Inhouse bei Ihnen</SelectItem>
                              <SelectItem value="remote">Online / Remote</SelectItem>
                              <SelectItem value="koeln">In unseren Räumen (Köln)</SelectItem>
                              <SelectItem value="flexible">Flexibel / noch offen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="trainingLocation">Standort (falls Inhouse)</Label>
                          <Input
                            id="trainingLocation"
                            value={formData.trainingLocation}
                            onChange={(e) => handleInputChange('trainingLocation', e.target.value)}
                            placeholder="z.B. München, Hamburg..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="groupCount">Anzahl Gruppen</Label>
                          <Select
                            value={formData.groupCount}
                            onValueChange={(value) => handleInputChange('groupCount', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Gruppe</SelectItem>
                              <SelectItem value="2-3">2–3 Gruppen</SelectItem>
                              <SelectItem value="4-6">4–6 Gruppen</SelectItem>
                              <SelectItem value="7+">Mehr als 6 Gruppen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="additionalInfo">Informationen und weitere benötigte Inhalte</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                          placeholder="Gibt es besondere Anforderungen, Wunschtermine oder andere Hinweise? Benötigen Sie Module, die oben nicht aufgeführt sind? Beschreiben Sie hier weitere gewünschte Trainingsinhalte."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Angebot anfordern
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Optional: Termin buchen */}
                    <div className="border-t pt-6">
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">Lieber direkt einen Termin vereinbaren?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Lassen Sie uns das zeitraubende "Schiffe-Versenken Spiel" zur Terminfindung umgehen! Buchen Sie hier einen freien Slot für ein unverbindliches 15-minütiges Erstgespräch. Ihre oben gewählte Modul-Konfiguration wird dabei automatisch an uns übermittelt, sodass wir bestens vorbereitet ins Gespräch starten können.
                            </p>
                            <Button
                              type="button"
                              variant="default"
                              className="gap-2"
                              onClick={handleBookingClick}
                              disabled={isBookingSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.company || !formData.phone}
                            >
                              {isBookingSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Wird übermittelt...
                                </>
                              ) : (
                                <>
                                  <Calendar className="w-4 h-4" />
                                  Termin buchen
                                </>
                              )}
                            </Button>
                            <p className="text-xs text-muted-foreground mt-3">
                              Pflichtfelder müssen ausgefüllt sein, um einen Termin zu buchen.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrainingKonfigurator;
