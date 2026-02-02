import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Bot, Network, Workflow, Shield } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "ki-agenten";
const PAGE_TITLE = "KI-Agenten";

const KIAgenten = () => {
  const martinLang = getAuthor('martin-lang')!;

  // Schema IDs automatisch generieren
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-sind", title: "Was sind KI-Agenten?", level: 2 },
    { id: "unterschied", title: "Chatbot vs. Agent", level: 2 },
    { id: "architektur", title: "Agentic AI Architektur", level: 2 },
    { id: "use-cases", title: "Use Cases in Unternehmen", level: 2 },
    { id: "copilot-studio", title: "Agenten mit Copilot Studio bauen", level: 2 },
    { id: "multi-agent", title: "Multi-Agent-Systeme", level: 2 },
    { id: "tool-integration", title: "Tool-Integration und APIs", level: 2 },
    { id: "testing", title: "Testing und Deployment", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
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
        "dateModified": "2025-11-07",
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
        canonicalUrl="https://copilotenschule.de/ki-agenten"
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2025-11-07T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "KI-Agenten", href: "/ki-agenten" }
        ]}
        title="KI-Agenten entwickeln: Autonome Workflows mit Microsoft Copilot"
        description="KI-Agenten Tutorial: Autonome Workflows und Automatisierungen mit Microsoft Copilot und Copilot Studio erstellen. Vom Konzept zur Implementierung."
        lastUpdated="07. November 2025"
        readTime="14 Minuten"
        tableOfContents={tableOfContents}
      >
        <Card className="mb-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
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
          <h2>Was sind KI-Agenten?</h2>
          <p>
            KI-Agenten sind autonome Softwaresysteme, die Ziele eigenständig verfolgen, Entscheidungen treffen und
            Tools nutzen, um Aufgaben zu erledigen. Sie gehen weit über einfache Chatbots hinaus.
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
          <h2>Unterschied: Chatbot vs. Agent</h2>

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
          <h2>Agentic AI Architektur</h2>

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
          <h2>Use Cases in Unternehmen</h2>

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

        <section id="copilot-studio" className="mt-12">
          <h2>Agenten mit Copilot Studio bauen</h2>

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
          <h2>Multi-Agent-Systeme</h2>
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
          <h2>Tool-Integration und APIs</h2>

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

        <section id="testing" className="mt-12">
          <h2>Testing und Deployment</h2>

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
          <h2>Häufig gestellte Fragen (FAQ)</h2>

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
      </ContentLayout>
    </>
  );
};

export default KIAgenten;
