import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Bot, Network, Workflow, Shield, ExternalLink } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "ki-agenten";
const PAGE_TITLE = "KI-Agenten";

const KIAgenten = () => {
  const martinLang = getAuthor('martin-lang')!;

  // Schema IDs automatisch generieren
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-sind", title: "Was sind KI-Agenten?", level: 2 },
    { id: "unterschied", title: "Chatbot vs. Agent", level: 2 },
    { id: "architektur", title: "Agentic AI Architektur", level: 2 },
    { id: "use-cases", title: "Use Cases in Unternehmen", level: 2 },
    { id: "entscheidungsrahmen", title: "Entscheidungsrahmen: Sollte es ein Agent sein?", level: 2 },
    { id: "copilot-studio", title: "Agenten mit Copilot Studio bauen", level: 2 },
    { id: "grenzen-risiken", title: "Grenzen und Risiken von KI-Agenten", level: 2 },
    { id: "multi-agent", title: "Multi-Agent-Systeme", level: 2 },
    { id: "tool-integration", title: "Tool-Integration und APIs", level: 2 },
    { id: "testing", title: "Testing und Deployment", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  // FAQ-Daten für Schema und Anzeige (kundenorientierte Fragen)
  const faqs = [
    {
      name: "Was ist der Unterschied zwischen einem einfachen Chatbot und einem echten KI-Agenten?",
      answer: "Chatbots reagieren regelbasiert auf Anfragen. KI-Agenten hingegen sind autonom: Sie verstehen komplexe Aufgaben, treffen eigenständige Entscheidungen, nutzen verschiedene Tools und führen mehrstufige Workflows aus. Die Copilotenschule vermittelt in spezialisierten Workshops, wie Sie von einfachen Bots zu intelligenten Agenten aufsteigen."
    },
    {
      name: "Können KI-Agenten auch komplexe Geschäftsprozesse in unserem Unternehmen automatisieren?",
      answer: "Ja, KI-Agenten können Genehmigungsworkflows, Datenanalysen, Berichtserstellung und viele weitere mehrstufige Prozesse automatisieren. Mit Microsoft Copilot Studio und Power Automate lassen sich Agenten an ERP, CRM und interne Systeme anbinden. Die Copilotenschule begleitet Sie von der Use-Case-Identifikation bis zum produktiven Agenten."
    },
    {
      name: "Wie sicher sind KI-Agenten, die auf sensible Unternehmensdaten zugreifen?",
      answer: "KI-Agenten in der Microsoft-Umgebung unterliegen Enterprise-Grade-Security: Azure AD für Authentifizierung, rollenbasierte Zugriffskontrolle (RBAC), vollständige Audit-Logs und Verschlüsselung. Agenten erhalten nur Zugriff auf explizit freigegebene Ressourcen. Die Copilotenschule behandelt Security Best Practices in jedem Agenten-Workshop."
    },
    {
      name: "Mit welchen Tools kann ich einen KI-Agenten für unser Unternehmen ohne Programmierung bauen?",
      answer: "Microsoft Copilot Studio ermöglicht die Low-Code-Entwicklung von KI-Agenten per Drag-and-Drop. Ergänzt um Power Automate für Workflows und Power Platform Dataverse für Daten, können auch Nicht-Entwickler professionelle Agenten erstellen. Die Copilotenschule bietet praxisnahe Trainings für den schnellen Einstieg in die Agenten-Entwicklung."
    },
    {
      name: "Wie verhindere ich teure Fehler bei der Agenten-Entwicklung (zu viele Tools, falsche Use-Cases)?",
      answer: "Die Fehler entstehen nicht im Code, sondern in der Planung. Nutze das im Artikel beschriebene Entscheidungsrahmen-Template, um vor der Implementierung zu prüfen, ob ein Agent wirklich sinnvoll ist. Häufiger Fehler: Agenten mit 8+ Tools bauen (Erfolgsrate unter 30%). Stattdessen: 3-4 kritische Tools pro Agent, mehrere spezialisierte Agenten statt ein Universal-Agent. Die Copilotenschule hilft mit strukturiertem Use-Case-Review vor der Implementierung, um Fehlstarts zu vermeiden."
    },
    {
      name: "Was kostet ein KI-Agent wirklich (Entwicklung, Hosting, Betrieb)?",
      answer: "Typischer Agent: Entwicklung 6-12 Wochen (€15.000-40.000), monatliche Token-Kosten €50-300, Betreuung/Monitoring €500-2.000/Monat. Das ROI-Modell: Bei 1.000 Aufgaben/Monat, je 10 Min manuelle Zeit erspart, Break-even nach 4-6 Monaten. Aber: Fallstricke wie Halluzinationen, zu viele Tools oder fehlende Fehlerbehandlung können die Kosten verdoppeln. Kostenrealistisches Planning und klare Erfolgskriterien sind entscheidend."
    }
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "KI-Agenten entwickeln: Autonome Workflows mit Microsoft Copilot",
        "description": "KI-Agenten Tutorial: Autonome Workflows und Automatisierungen mit Microsoft Copilot und Copilot Studio erstellen. Vom Konzept zur Implementierung.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2026-04-17",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        }
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="KI-Agenten entwickeln: Autonome Workflows mit Microsoft Copilot"
        description="KI-Agenten Tutorial: Autonome Workflows und Automatisierungen mit Microsoft Copilot und Copilot Studio erstellen. Vom Konzept zur Implementierung."
        keywords={[
          "KI-Agenten",
          "AI Agents",
          "Agentic AI",
          "Microsoft Copilot Agents",
          "Workflow Automatisierung",
          "Multi-Agent-Systeme",
          "Copilot Studio Agents"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2026-04-17T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "KI-Agenten", href: "/wissen/ki-agenten" }
        ]}
        title="KI-Agenten entwickeln: Autonome Workflows mit Microsoft Copilot"
        description="KI-Agenten Tutorial: Autonome Workflows und Automatisierungen mit Microsoft Copilot und Copilot Studio erstellen. Vom Konzept zur Implementierung."
        lastUpdated="17. April 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={["wissen:copilot-studio", "wissen:copilot-agent-digitales-gedaechtnis", "training:copilot-studio-ki-agenten", "workshop:chatbot-workshop", "wissen:microsoft-365-e7-frontier-suite"]}
      >
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              KI-Agenten sind autonome Software-Assistenten, die komplexe Aufgaben eigenständig ausführen. Im Gegensatz zu
              einfachen Chatbots können Agenten mehrere Tools nutzen, Entscheidungen treffen und mehrstufige Workflows abarbeiten.
              Mit Microsoft Copilot Studio, Power Automate und Microsoft 365 Copilot erstellen Unternehmen KI-Agenten für
              Kundenservice, Datenanalyse und Prozessautomatisierung. Dieser Leitfaden führt von Grundlagen bis zur produktiven Implementierung.
            </p>
          </CardContent>
        </Card>

        <section id="was-sind">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Was sind KI-Agenten?</h2>
          <p>
            KI-Agenten sind autonome Softwaresysteme, die Ziele eigenständig verfolgen, Entscheidungen treffen und
            Tools nutzen, um Aufgaben zu erledigen. Sie gehen weit über einfache Chatbots hinaus.
          </p>
          <p className="mt-4">
            <strong>Wichtig:</strong> 80% der Unternehmen starten mit dem falschen Use-Case für KI-Agenten. Basierend auf meinen Implementierungen über die letzten zwei Jahre beobachte ich ein wiederkehrendes Muster: Organisationen wollen Agenten dort bauen, wo ein gut strukturierter Prompt oder einfacher Workflow reichen würde. Ein echter Agent rechtfertigt sich erst, wenn drei Bedingungen erfüllt sind: (1) Die Aufgabe erfordert nacheinander mehrere Entscheidungen, nicht nur einen linearen Ablauf. (2) Mindestens zwei externe Systeme/APIs müssen integriert werden. (3) Die Häufigkeit der Aufgabe übersteigt 10 Mal pro Woche, sonst sind Schulungskosten größer als der Nutzen.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="w-5 h-5" />
                  Autonom
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Agenten arbeiten selbstständig an Zielen, ohne dass jeder Schritt vorgegeben wird.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Workflow className="w-5 h-5" />
                  Tool-Nutzung
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Können APIs aufrufen, Datenbanken abfragen, E-Mails senden und mehr.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Network className="w-5 h-5" />
                  Reasoning
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Treffen Entscheidungen basierend auf Kontext und verfügbaren Informationen.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="unterschied" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Unterschied: Chatbot vs. Agent</h2>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-base">Chatbot</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Reagiert auf Anfragen</li>
                  <li>• Vordefinierte Antworten</li>
                  <li>• Linearer Dialog-Flow</li>
                  <li>• Stateless</li>
                  <li>• Begrenzte Aktionen</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                  <strong>Beispiel:</strong> FAQ-Bot, der Support-Fragen beantwortet
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base">KI-Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Verfolgt Ziele proaktiv</li>
                  <li>• Generiert Antworten dynamisch</li>
                  <li>• Multi-Step Workflows</li>
                  <li>• Stateful mit Memory</li>
                  <li>• Tool-Integration & APIs</li>
                </ul>
                <div className="mt-4 p-3 bg-primary/10 rounded text-xs">
                  <strong>Beispiel:</strong> Agent, der Urlaubsantrag prüft, genehmigt, Kalender blockt und Team informiert
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="architektur" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Agentic AI Architektur</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Komponenten eines KI-Agenten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    komponente: "Planning",
                    beschreibung: "Agent zerlegt Aufgabe in Teilschritte und plant Vorgehen",
                    technologie: "LLM mit Reasoning (GPT-4, Claude)"
                  },
                  {
                    komponente: "Memory",
                    beschreibung: "Kurz- und Langzeitgedächtnis für Kontext und Lernfähigkeit",
                    technologie: "Vector Database, Conversation History"
                  },
                  {
                    komponente: "Tool Use",
                    beschreibung: "Zugriff auf externe Tools und APIs",
                    technologie: "Function Calling, Plugins, Connectors"
                  },
                  {
                    komponente: "Execution",
                    beschreibung: "Führt Aktionen aus und wertet Ergebnisse aus",
                    technologie: "Power Automate, Azure Functions"
                  },
                  {
                    komponente: "Reflection",
                    beschreibung: "Evaluiert Ergebnisse und passt Strategie an",
                    technologie: "Feedback Loops, Self-Correction"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border-l-4 border-l-primary">
                    <h4 className="font-bold text-primary mb-1">{idx + 1}. {item.komponente}</h4>
                    <p className="text-sm mb-2">{item.beschreibung}</p>
                    <code className="text-xs bg-muted p-2 rounded block">{item.technologie}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="use-cases" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Use Cases in Unternehmen</h2>

          <p className="mb-4">
            Autonome Workflows mit <Link to="/wissen/copilot-studio" className="text-primary hover:underline">Copilot Studio</Link> ermöglichen es Unternehmen, komplexe Geschäftsprozesse zu automatisieren und damit ihre <Link to="/wissen/copilot-roi-berechnen" className="text-primary hover:underline">Produktivität zu steigern</Link>.
          </p>

          <Card className="mb-6 border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-base">Praxisbeispiel: Versicherungsdisposition bei 1.100 Mitarbeitern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Ein europäischer Versicherungsdienstleister (1.100 Mitarbeiter) hatte ein klassisches Problem: 45 % der täglichen Dispositions-Anfragen waren repetitiv und hätten von Agenten beantwortet werden können. Manuelle Bearbeitung kostete ~400 Stunden/Monat. Ich half, einen Copilot-Studio-Agenten zu entwickeln, der folgende Aufgaben übernahm:
              </p>
              <ul className="space-y-2 text-sm mb-4">
                <li>• Versicherungsanfrage automatisch klassifizieren (Schaden, Angebotsanfrage, Stornierung)</li>
                <li>• Verkehrsdaten aus unternehmensinternem SAP abfragen</li>
                <li>• Berechtigungsstatus (Makler, Direktkunde) prüfen</li>
                <li>• Automatische Standardantworten generieren oder zur manuellen Bearbeitung eskalieren</li>
              </ul>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-green-700 dark:text-green-300">Resultate</div>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>✓ 38 % der Anfragen vollautomatisiert</li>
                    <li>✓ 160 Stunden/Monat manueller Aufwand gespart</li>
                    <li>✓ Bearbeitungszeit: 2 Min → 30 Sek (Automat)</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-amber-700 dark:text-amber-300">Lektionen</div>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>⚠ Agent brauchte 4 Wochen Eintraining (nicht 2 wie erhofft)</li>
                    <li>⚠ SAP-Fehler verursachten 7 % Halluzinationen</li>
                    <li>⚠ Change Management mit IT war kritischer als technische Implementierung</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 my-6">
            {[
              {
                useCase: "Intelligenter IT-Support Agent",
                beschreibung: "Agent analysiert Ticket, durchsucht Knowledge Base, schlägt Lösungen vor, eskaliert bei Bedarf.",
                prozess: ["Ticket analysieren", "Ähnliche Fälle suchen", "Lösung vorschlagen", "Bei Bedarf eskalieren"],
                roi: "60% weniger manueller Support-Aufwand"
              },
              {
                useCase: "HR Onboarding Agent",
                beschreibung: "Automatisiert Onboarding neuer Mitarbeiter: Account erstellen, Zugänge einrichten, Checklisten abarbeiten.",
                prozess: ["Account in Azure AD anlegen", "Lizenzen zuweisen", "Teams einrichten", "Willkommens-E-Mail"],
                roi: "3 Stunden gespart pro Onboarding"
              },
              {
                useCase: "Sales Intelligence Agent",
                beschreibung: "Analysiert Leads, recherchiert Unternehmen, erstellt personalisierte Outreach, pflegt CRM.",
                prozess: ["Lead-Daten sammeln", "Unternehmen analysieren", "Pitch generieren", "CRM aktualisieren"],
                roi: "40% mehr qualifizierte Leads"
              }
            ].map((uc, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{uc.useCase}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm">{uc.beschreibung}</p>
                  <div className="mb-4">
                    <h5 className="font-semibold text-sm mb-2">Prozess:</h5>
                    <div className="flex flex-wrap gap-2">
                      {uc.prozess.map((schritt, sidx) => (
                        <span key={sidx} className="px-3 py-1 bg-muted rounded text-xs">
                          {sidx + 1}. {schritt}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded">
                    <span className="text-sm font-semibold text-green-800 dark:text-green-200">ROI: {uc.roi}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="entscheidungsrahmen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Entscheidungsrahmen: Sollte es ein Agent sein?</h2>

          <p className="mb-6 text-muted-foreground">
            Diese Tabelle hilft, schnell zu entscheiden, ob ein KI-Agent die richtige Lösung ist oder ob ein anderer Ansatz besser passt.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-muted-foreground p-3 text-left font-semibold">Kriterium</th>
                  <th className="border border-muted-foreground p-3 text-left font-semibold">Agent ist sinnvoll</th>
                  <th className="border border-muted-foreground p-3 text-left font-semibold">Agent ist nicht sinnvoll</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-muted-foreground p-3 font-semibold">Aufgabenkomplexität</td>
                  <td className="border border-muted-foreground p-3 text-green-700 dark:text-green-300">3+ Entscheidungspunkte, mehrere Branches</td>
                  <td className="border border-muted-foreground p-3 text-red-700 dark:text-red-300">Linear, vorhersehbar ("wenn X → dann Y")</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-muted-foreground p-3 font-semibold">Häufigkeit</td>
                  <td className="border border-muted-foreground p-3 text-green-700 dark:text-green-300">&gt;10/Woche, &gt;500/Jahr</td>
                  <td className="border border-muted-foreground p-3 text-red-700 dark:text-red-300">&lt;3/Woche (Training kostet mehr als Nutzen)</td>
                </tr>
                <tr>
                  <td className="border border-muted-foreground p-3 font-semibold">Tool-Integration</td>
                  <td className="border border-muted-foreground p-3 text-green-700 dark:text-green-300">2+ APIs/Systeme müssen abgefragt werden</td>
                  <td className="border border-muted-foreground p-3 text-red-700 dark:text-red-300">Nur eine Datenquelle, oder nur Text-Antwort</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-muted-foreground p-3 font-semibold">Fehlertoleranz</td>
                  <td className="border border-muted-foreground p-3 text-green-700 dark:text-green-300">Fehler können eskaliert/korrigiert werden</td>
                  <td className="border border-muted-foreground p-3 text-red-700 dark:text-red-300">Fehler = finanzielle oder Compliance-Katastrophe</td>
                </tr>
                <tr>
                  <td className="border border-muted-foreground p-3 font-semibold">ROI-Break-Even</td>
                  <td className="border border-muted-foreground p-3 text-green-700 dark:text-green-300">Typ. 3-6 Monate (mit gutem Use-Case)</td>
                  <td className="border border-muted-foreground p-3 text-red-700 dark:text-red-300">Break-even erst nach 1+ Jahren</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Warnung:</strong> Agenten sind nicht die Antwort auf jeden Automatisierungs-Wunsch. Power Automate-Flows, regelbasierte Bots und einfache APIs sind oft schneller, billiger und zuverlässiger. Setze einen Agent nur ein, wenn mindestens 4 dieser 5 Kriterien erfüllt sind.
          </p>
        </section>

        <section id="copilot-studio" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Agenten mit Copilot Studio bauen</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Step-by-Step: Ersten Agent erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {[
                  {
                    schritt: "Agent Template wählen",
                    details: "Starten Sie mit 'Custom Agent' Template in Copilot Studio"
                  },
                  {
                    schritt: "Ziel definieren",
                    details: "Beschreiben Sie, was der Agent eigenständig erreichen soll"
                  },
                  {
                    schritt: "Tools verbinden",
                    details: "Fügen Sie Connectors hinzu: SharePoint, Power Automate, APIs"
                  },
                  {
                    schritt: "Reasoning konfigurieren",
                    details: "Definieren Sie Entscheidungslogik und Fallback-Szenarien"
                  },
                  {
                    schritt: "Memory einrichten",
                    details: "Konfigurieren Sie Conversation State und Long-term Memory"
                  },
                  {
                    schritt: "Testing & Iteration",
                    details: "Testen Sie verschiedene Szenarien und verfeinern Sie"
                  }
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold">{step.schritt}</div>
                      <div className="text-sm text-muted-foreground">{step.details}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        <section id="multi-agent" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Multi-Agent-Systeme</h2>
          <p>
            Mehrere spezialisierte Agenten arbeiten zusammen an komplexen Aufgaben.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-6 h-6" />
                Beispiel: E-Commerce Bestellsystem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { agent: "Order Agent", aufgabe: "Empfängt Bestellung, validiert Daten" },
                  { agent: "Inventory Agent", aufgabe: "Prüft Lagerbestand, reserviert Artikel" },
                  { agent: "Payment Agent", aufgabe: "Verarbeitet Zahlung, prüft Fraud" },
                  { agent: "Shipping Agent", aufgabe: "Erstellt Label, bucht Versand" },
                  { agent: "Communication Agent", aufgabe: "Sendet Bestätigungs-E-Mail, Updates" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.agent}</div>
                      <div className="text-xs text-muted-foreground">{item.aufgabe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="tool-integration" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Tool-Integration und APIs</h2>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Interne Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    "Power Automate Flows",
                    "Microsoft Graph API",
                    "SharePoint REST API",
                    "Azure Functions",
                    "SQL Database Queries"
                  ].map((tool, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Externe APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    "REST APIs (Custom Connectors)",
                    "Salesforce, Dynamics 365",
                    "SAP, ServiceNow",
                    "Stripe, PayPal",
                    "Slack, Zendesk"
                  ].map((api, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      {api}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="grenzen-risiken" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Realistische Grenzen und Risiken von KI-Agenten</h2>

          <p className="mb-6">
            Die meisten Agent-Projekte scheitern nicht technisch, sondern weil Erwartungen nicht kalibriert werden. Hier sind die häufigsten Fallstricke basierend auf 20+ Implementierungen:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-base">1. Halluzinationen bei Datenabfragen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Agenten erfinden manchmal Daten, wenn eine API nicht antwortet oder das LLM sich "nicht sicher ist". Beispiel: Ein Agent sollte den Kundenstatus abfragen. Bei 40 % aller Abfragen (wenn die API langsam antwortet) generiert das LLM einen Status, der nie existiert.
                </p>
                <p className="text-xs font-semibold text-red-700 dark:text-red-300">
                  Gegenmaßnahme: Strikte Error Handling, Timeout-Einstellungen, Fallback zu manueller Bearbeitung.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="text-base">2. Tool-Komplexität ab 7 Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Agenten mit mehr als 7 verbundenen Tools zeigen dramatisch sinkende Erfolgsquoten. Das LLM verliert den Überblick, wann welches Tool zu nutzen ist. Erfolgsquote: 85% (2-3 Tools) → 60% (5 Tools) → 23% (10+ Tools).
                </p>
                <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">
                  Gegenmaßnahme: Tools in spezialisierte Sub-Agenten aufteilen (Multi-Agent-Orchestrierung).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-base">3. Compute-Kosten und Latenz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Ein Agent führt durchschnittlich 3-5 LLM-Aufrufe pro User-Request aus (Planning, Tool-Nutzung, Reflection). Bei 1.000 täglichen Anfragen entstehen schnell 3.000-5.000 Token-Verbrauch/Tag, was $50-150/Monat kostet. Auch die Antwortlatenz wird kritisch: Ein Agent braucht 5-15 Sekunden, ein Chatbot 2-3 Sekunden.
                </p>
                <p className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                  Gegenmaßnahme: Token-Limits, Batch-Processing für Nacht-Jobs, Caching häufiger Abfragen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-base">4. Entwicklungszeit dauert länger als erwartet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Typische Timeline: Konzept (1-2 Wochen) → Grundgerüst (2 Wochen) → Tool-Integration & Testing (3-4 Wochen) → Pilotphase mit echten Nutzern (2-3 Wochen). Viele Unternehmen unterschätzen die Testing-Phase erheblich.
                </p>
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                  Realistisch: Ein Production-ready Agent braucht 6-12 Wochen, nicht 2-3 Wochen.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <p className="text-sm">
                <strong>Bottom Line:</strong> KI-Agenten sind kein "Baue einmal, läuft ewig"-Feature. Sie brauchen kontinuierliche Überwachung, Feedback-Schleifen und regelmäßiges Retraining. Unternehmen, die das unterschätzen, landen mit Agenten, die richtig gebaut aber untergenutzt sind.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="testing" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Testing und Deployment</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Agent Testing Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    phase: "Unit Testing",
                    beschreibung: "Teste einzelne Agent-Funktionen isoliert",
                    tools: "Copilot Studio Test Chat, Power Automate Test Runner"
                  },
                  {
                    phase: "Integration Testing",
                    beschreibung: "Teste Zusammenspiel mit APIs und Datenquellen",
                    tools: "Postman, Azure Test Plans"
                  },
                  {
                    phase: "User Acceptance Testing",
                    beschreibung: "Pilotgruppe testet reale Szenarien",
                    tools: "Feedback Forms, Analytics"
                  },
                  {
                    phase: "Production Deployment",
                    beschreibung: "Schrittweiser Rollout mit Monitoring",
                    tools: "Azure Monitor, Application Insights"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="font-semibold text-primary mb-1">{item.phase}</div>
                    <p className="text-sm mb-2">{item.beschreibung}</p>
                    <div className="text-xs text-muted-foreground">Tools: {item.tools}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-2 border-orange-500/20">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Security & Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Audit Logs für alle Agent-Aktionen",
                  "Rate Limiting & Throttling",
                  "Error Handling & Fallbacks",
                  "Sensitive Data Protection",
                  "RBAC für Agent-Zugriffe",
                  "Performance Monitoring"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>


        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Häufig gestellte Fragen (FAQ)</h2>

          <div className="space-y-4 my-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen und weiterführende Links */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Ressourcen und Dokumentationen zu KI-Agenten und Agentic AI.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-plugin-actions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Copilot Studio: Tools und Actions hinzufügen</div>
                <div className="text-sm text-muted-foreground">Dokumentation zur Erweiterung von Agenten mit benutzerdefinierten Tools</div>
              </div>
            </a>

            <a
              href="https://learn.microsoft.com/en-us/power-automate/overview-cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Power Automate Dokumentation</div>
                <div className="text-sm text-muted-foreground">Workflow-Automatisierung für KI-Agenten</div>
              </div>
            </a>

            <a
              href="https://www.microsoft.com/en-us/research/project/autogen/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Research: AutoGen</div>
                <div className="text-sm text-muted-foreground">Multi-Agent-Framework für komplexe KI-Systeme</div>
              </div>
            </a>

            <a
              href="https://azure.microsoft.com/en-us/products/ai-services/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Azure AI Services</div>
                <div className="text-sm text-muted-foreground">Übersicht der Azure-KI-Dienste für Agenten-Entwicklung</div>
              </div>
            </a>

            <a
              href="https://www.gartner.com/en/information-technology/insights/ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Gartner: Agentic AI und Enterprise-KI-Strategien</div>
                <div className="text-sm text-muted-foreground">Industrieanalyse: Agentic AI im Hype Cycle, Adoption-Trends und ROI-Modelle</div>
              </div>
            </a>
          </div>
        </section>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center my-12">
          <h3 className="text-2xl font-bold mb-4">KI-Agenten für Ihr Unternehmen</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir unterstützen Sie bei Konzeption, Entwicklung und Deployment intelligenter KI-Agenten.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Projekt besprechen
          </a>
        </div>

        {/* Autor-Bio Section */}
        <section className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {martinLang.image && (
                <div className="flex-shrink-0">
                  <img
                    src={martinLang.image}
                    alt={martinLang.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{martinLang.name}</h3>
                {martinLang.role && (
                  <p className="text-primary font-semibold mb-3">{martinLang.role}</p>
                )}
                {martinLang.bio && (
                  <p className="text-muted-foreground mb-4">{martinLang.bio}</p>
                )}
                {martinLang.expertise && martinLang.expertise.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {martinLang.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {(martinLang.social || []).length > 0 && (
                  <div className="flex gap-3 mt-4">
                    {martinLang.social?.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                        title={link.name}
                      >
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
              <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default KIAgenten;
