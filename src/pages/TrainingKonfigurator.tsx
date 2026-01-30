import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Loader2, Calendar } from "lucide-react";
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

interface TrainingModule {
  id: string;
  title: string;
  category: string;
}

// Alle auswählbaren Trainingsmodule - konsistent mit TrainingModules.tsx
const moduleCategories: ModuleCategory[] = [
  {
    id: "m365-basics",
    title: "Microsoft 365 Copilot Grundlagen",
    description: "Einstieg in die produktive Nutzung von Copilot in Word, Excel, PowerPoint, Outlook und Teams",
    modules: [
      { id: "word-basics", title: "Copilot in Word: Dokumenterstellung, Textoptimierung, Zusammenfassungen", category: "m365-basics" },
      { id: "excel-basics", title: "Excel-Datenanalyse mit Copilot: Formeln generieren, Visualisierung, Pivot-Tabellen", category: "m365-basics" },
      { id: "ppt-basics", title: "PowerPoint-Präsentationen mit Copilot: Folien generieren, Design optimieren", category: "m365-basics" },
      { id: "outlook-basics", title: "E-Mail-Produktivität mit Outlook Copilot: Entwürfe, Organisation, Follow-ups", category: "m365-basics" },
      { id: "teams-basics", title: "Teams-Meetings optimieren: Zusammenfassungen, Aktionspunkte, Protokolle", category: "m365-basics" },
      { id: "prompt-basics", title: "Prompt Engineering Grundlagen: Effektive Anfragen formulieren", category: "m365-basics" },
    ]
  },
  {
    id: "m365-advanced",
    title: "Microsoft 365 Copilot Advanced",
    description: "Fortgeschrittene Techniken für Power User und komplexe Workflows",
    modules: [
      { id: "excel-advanced", title: "Komplexe Excel-Analysen: Forecasting, What-If-Analysen, statistische Auswertungen", category: "m365-advanced" },
      { id: "powerbi", title: "Power BI Integration: Dashboards und Reports automatisch generieren", category: "m365-advanced" },
      { id: "cross-app", title: "Cross-Application Workflows: Automatisierte Prozesse zwischen M365-Apps", category: "m365-advanced" },
      { id: "prompt-advanced", title: "Advanced Prompt Engineering: Chain-of-Thought, Custom Instructions", category: "m365-advanced" },
      { id: "automation", title: "Wiederkehrende Aufgaben automatisieren: Templates und Best Practices", category: "m365-advanced" },
      { id: "project-mgmt", title: "Copilot für Projektmanagement: Pläne, Status-Reports, Ressourcenplanung", category: "m365-advanced" },
    ]
  },
  {
    id: "github",
    title: "GitHub Copilot für Entwickler",
    description: "KI-gestützte Softwareentwicklung mit GitHub Copilot",
    modules: [
      { id: "code-gen", title: "Effiziente Code-Generierung: Funktionen, Klassen, APIs entwickeln", category: "github" },
      { id: "debugging", title: "Intelligentes Debugging und Refactoring: Fehler identifizieren, Code optimieren", category: "github" },
      { id: "documentation", title: "Automatisierte Code-Dokumentation: Kommentare, README, API-Docs", category: "github" },
      { id: "testing", title: "Unit Tests schreiben mit Copilot: Test-Cases, Code-Coverage, TDD", category: "github" },
      { id: "copilot-chat", title: "Copilot Chat nutzen: Kontextbezogene Fragen, Code erklären lassen", category: "github" },
      { id: "security", title: "Security und Code Quality: Sicherheitslücken identifizieren, Standards einhalten", category: "github" },
      { id: "cicd", title: "Integration in CI/CD Pipelines und Team-Workflows", category: "github" },
    ]
  },
  {
    id: "compliance",
    title: "Compliance & Rechtssicherheit",
    description: "DSGVO-konforme und rechtssichere KI-Nutzung im Unternehmen",
    modules: [
      { id: "dsgvo", title: "DSGVO-konforme Copilot-Nutzung: Rechtsgrundlagen, Dokumentationspflichten", category: "compliance" },
      { id: "eu-ai-act", title: "EU AI Act Anforderungen: Risikoklassifizierung, Transparenzpflichten", category: "compliance" },
      { id: "dpia", title: "Datenschutz-Impact-Assessment: Risiken identifizieren, Maßnahmen definieren", category: "compliance" },
      { id: "security-arch", title: "Microsoft 365 Sicherheitsarchitektur: Datenflüsse, Verschlüsselung, Audit-Logs", category: "compliance" },
      { id: "sensitive-data", title: "Umgang mit sensiblen Daten: Klassifizierung, Information Protection, DLP", category: "compliance" },
      { id: "legal", title: "Rechtliche Aspekte: Urheberrecht, Haftungsfragen, Vertragsgestaltung", category: "compliance" },
      { id: "certificate", title: "Zertifikat über Schulung gemäß EU AI Act", category: "compliance" },
    ]
  },
  {
    id: "strategy",
    title: "Strategie & Rollout",
    description: "Erfolgreiche Einführung und Skalierung von Copilot im Unternehmen",
    modules: [
      { id: "process-analysis", title: "Prozessanalyse: Wo generiert Copilot den größten Mehrwert?", category: "strategy" },
      { id: "roi", title: "ROI-Berechnung und Business Case: Kosteneinsparungen quantifizieren", category: "strategy" },
      { id: "rollout-plan", title: "Phasenweiser Rollout-Plan: Pilot-Gruppen, Erfolgskriterien, Skalierung", category: "strategy" },
      { id: "change-mgmt", title: "Change Management und Adoption: Widerstände überwinden, Champions aufbauen", category: "strategy" },
      { id: "governance", title: "Governance Framework: Policies definieren, Verantwortlichkeiten klären", category: "strategy" },
      { id: "kpis", title: "Success Metrics und KPIs: Nutzung messen, Produktivität tracken", category: "strategy" },
    ]
  },
  {
    id: "copilot-studio",
    title: "Copilot Studio & KI-Agenten",
    description: "Entwicklung eigener KI-Agenten und Chatbots",
    modules: [
      { id: "studio-basics", title: "Copilot Studio Grundlagen: Plattform-Überblick, Entwicklungsumgebung", category: "copilot-studio" },
      { id: "custom-agents", title: "Custom Agents für Teams: Conversational AI, Natural Language Processing", category: "copilot-studio" },
      { id: "data-integration", title: "Integration mit Unternehmensdaten: SharePoint, Dataverse, externe APIs", category: "copilot-studio" },
      { id: "power-automate", title: "Workflow-Automatisierung mit Power Automate: Geschäftsprozesse digitalisieren", category: "copilot-studio" },
      { id: "agent-prompts", title: "Prompt Engineering für Agenten: Systemanweisungen, Guardrails", category: "copilot-studio" },
      { id: "chatbot-design", title: "Chatbot-Design: Conversation Flow, Intents, Antworten formulieren", category: "copilot-studio" },
      { id: "knowledge-sources", title: "Anbindung interner Wissensquellen: SharePoint, FAQ-Dokumente, Wiki", category: "copilot-studio" },
    ]
  },
  {
    id: "lowcode",
    title: "Low-Code & Power Platform",
    description: "Apps und Workflows ohne traditionelle Programmierung",
    modules: [
      { id: "power-apps", title: "Low-Code Entwicklung mit Power Apps: Apps per natürlicher Sprache erstellen", category: "lowcode" },
      { id: "process-automation", title: "Geschäftsprozess-Automatisierung: Workflows, Genehmigungsprozesse", category: "lowcode" },
      { id: "copilot-assistant", title: "Copilot als Entwicklungs-Assistent: Code-Generierung, Fehlersuche", category: "lowcode" },
      { id: "dataverse", title: "Datenmodellierung mit Dataverse: Tabellen, Beziehungen, Business Rules", category: "lowcode" },
      { id: "m365-integration", title: "Integration mit Microsoft 365: SharePoint, Teams, Outlook, Excel verbinden", category: "lowcode" },
      { id: "citizen-dev", title: "Best Practices für Citizen Development: Governance, Wartbarkeit, Sicherheit", category: "lowcode" },
    ]
  },
  {
    id: "train-trainer",
    title: "Train the Trainer & Multiplikatoren",
    description: "Interne Trainer und Champions ausbilden",
    modules: [
      { id: "didactics", title: "Didaktische Grundlagen: Erwachsenenlernen, Workshop-Moderation", category: "train-trainer" },
      { id: "tier-training", title: "Schulung von Copilot Free und Copilot Paid Nutzern", category: "train-trainer" },
      { id: "usecase-dev", title: "Use Cases mit Fachabteilungen identifizieren und ausarbeiten", category: "train-trainer" },
      { id: "implementation", title: "Implementierung begleiten: Change Management, Adoption fördern", category: "train-trainer" },
      { id: "materials", title: "Schulungsmaterialien erstellen: Präsentationen, Übungen, Quick Guides", category: "train-trainer" },
      { id: "ambassador", title: "Ambassador-Programme aufbauen: Netzwerk aus Copilot-Champions", category: "train-trainer" },
      { id: "reporting", title: "Erfolgsmessung und Reporting: KPIs definieren, Fortschritte dokumentieren", category: "train-trainer" },
    ]
  },
];

// Alle Module flach für einfache Suche
const allModules = moduleCategories.flatMap(cat => cat.modules);

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
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

  // Deduplizierte Liste der ausgewählten Module-Titel
  const selectedModuleTitles = useMemo(() => {
    const titles = selectedModules
      .map(id => allModules.find(m => m.id === id)?.title)
      .filter(Boolean) as string[];
    return [...new Set(titles)];
  }, [selectedModules]);

  // E-Mail beim Termin buchen senden und Bookings öffnen
  const handleBookingClick = () => {
    // WICHTIG: window.open MUSS synchron im Click-Event erfolgen, sonst blockiert der Popup-Blocker
    const bookingWindow = window.open('https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/', '_blank');

    // Falls Popup blockiert wurde, Fallback
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

    // E-Mail im Hintergrund senden (nach dem window.open)
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
          subject: `Training-Anfrage: ${selectedModuleTitles.length} Module ausgewählt`
        }),
      });

      if (response.ok) {
        toast({
          title: "Anfrage gesendet!",
          description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
        });
        setStep(1);
        setSelectedModules([]);
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Training Konfigurator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stellen Sie Ihr individuelles Copilot-Training zusammen.
              Wählen Sie die Module, die für Ihr Team relevant sind, und erhalten Sie ein maßgeschneidertes Angebot.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
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
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Module Categories - left 2/3 */}
                <div className="lg:col-span-2 space-y-6">
                  {moduleCategories.map((category) => (
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
                                <span className="text-sm leading-tight">{module.title}</span>
                              </label>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Real-time selection summary - right 1/3 */}
                <div className="lg:col-span-1">
                  <div className="sticky top-28">
                    <Card className={`${selectedModules.length > 0 ? 'border-primary' : ''}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle2 className={`w-5 h-5 ${selectedModules.length > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                          Ihre gewünschten Trainingsinhalte
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {selectedModules.length === 0
                            ? "Noch keine Module ausgewählt"
                            : `${selectedModuleTitles.length} Modul${selectedModuleTitles.length > 1 ? 'e' : ''} ausgewählt`
                          }
                        </p>
                      </CardHeader>
                      <CardContent>
                        {selectedModuleTitles.length > 0 ? (
                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                            {selectedModuleTitles.map((title, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-0.5">✓</span>
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
                          disabled={selectedModules.length === 0}
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
                  <CardTitle className="text-lg">Ihre Auswahl ({selectedModuleTitles.length} Module)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {selectedModuleTitles.map((title, idx) => (
                      <Badge key={idx} variant="secondary" className="py-1 px-3 text-xs">
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

                    {/* Submit Buttons - oberhalb von Termin buchen */}
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

                    {/* Optional: Termin buchen - unterhalb der Submit-Buttons */}
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
