import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Bot, Link as LinkIcon, Shield } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateBreadcrumbSchema } from "@/lib/schema";

const CopilotStudio = () => {
  const martinLang = getAuthor('martin-lang')!;

  const tableOfContents = [
    { id: "was-ist", title: "Was ist Microsoft Copilot Studio?", level: 2 },
    { id: "anwendungsfaelle", title: "Anwendungsfälle für Unternehmen", level: 2 },
    { id: "custom-copilots", title: "Custom Copilots erstellen", level: 2 },
    { id: "plugins", title: "Plugins und Erweiterungen", level: 2 },
    { id: "integration", title: "Integration mit Microsoft 365", level: 2 },
    { id: "datenquellen", title: "Datenquellen anbinden", level: 2 },
    { id: "sicherheit", title: "Sicherheit und Compliance", level: 2 },
    { id: "lizenzierung", title: "Lizenzierung und Kosten", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  // Breadcrumb Schema für Navigation
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "https://copilotenschule.de/" },
    { name: "Wissen", url: "https://copilotenschule.de/wissen" },
    { name: "Copilot Studio", url: "https://copilotenschule.de/copilot-studio" }
  ]);

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://copilotenschule.de/copilot-studio#article",
        "headline": "Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen",
        "description": "Copilot Studio Tutorial: Eigene KI-Agenten, Chatbots und Custom Copilots ohne Code erstellen. Low-Code Plattform für Unternehmen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2025-11-07",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://copilotenschule.de/copilot-studio"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://copilotenschule.de/copilot-studio#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Was kann ich mit Copilot Studio erstellen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mit Copilot Studio erstellen Sie Custom Copilots, Chatbots, KI-Agenten, Plugins für Microsoft 365 Copilot, automatisierte Workflows und intelligente Assistenten für spezifische Business-Prozesse."
            }
          },
          {
            "@type": "Question",
            "name": "Brauche ich Programmierkenntnisse?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nein, Copilot Studio ist eine Low-Code-Plattform mit visuellem Designer. Für erweiterte Funktionen können Sie optional Code hinzufügen, aber die Grundfunktionen sind ohne Programmierung nutzbar."
            }
          },
          {
            "@type": "Question",
            "name": "Wie integriere ich eigene Daten?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sie können SharePoint, OneDrive, Datenbanken, APIs, Power Platform Dataverse und andere Datenquellen direkt anbinden. Copilot Studio bietet vorgefertigte Konnektoren für gängige Systeme."
            }
          },
          {
            "@type": "Question",
            "name": "Was kostet Copilot Studio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Copilot Studio ist in Microsoft 365 Copilot enthalten (begrenzt auf 25 Nachrichten/Nutzer/Monat) oder als Standalone-Lizenz ab 200 USD/Monat pro Tenant verfügbar, plus nutzungsbasierte Message Credits."
            }
          },
          {
            "@type": "Question",
            "name": "Ist Copilot Studio DSGVO-konform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, Copilot Studio entspricht allen Microsoft-Datenschutzstandards und ist DSGVO-konform. Daten werden in EU-Rechenzentren verarbeitet und unterliegen Enterprise-Grade Security."
            }
          }
        ]
      },
      breadcrumbSchema
    ]
  };

  return (
    <>
      <SEOHead
        title="Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen"
        description="Copilot Studio Tutorial: Eigene KI-Agenten, Chatbots und Custom Copilots ohne Code erstellen. Low-Code Plattform für Unternehmen."
        keywords={[
          "Copilot Studio",
          "Microsoft Copilot Studio",
          "Custom Copilots",
          "KI-Agenten entwickeln",
          "Low-Code KI",
          "Chatbot erstellen",
          "Microsoft 365 Plugins"
        ]}
        canonicalUrl="https://copilotenschule.de/copilot-studio"
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2025-11-07T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft Copilot Studio", href: "/copilot-studio" }
        ]}
        title="Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen"
        description="Copilot Studio Tutorial: Eigene KI-Agenten, Chatbots und Custom Copilots ohne Code erstellen. Low-Code Plattform für Unternehmen."
        lastUpdated="07. November 2025"
        readTime="10 Minuten"
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
              Microsoft Copilot Studio ist eine Low-Code-Plattform zur Entwicklung eigener KI-Agenten und Custom Copilots.
              Unternehmen können ohne Programmierkenntnisse spezialisierte Chatbots und Automatisierungen erstellen.
              Die Plattform ermöglicht Integration mit Microsoft 365, externen Datenquellen und Geschäftsprozessen.
              Copilot Studio bietet vorgefertigte Templates, Visual Designer und Enterprise-Grade Security für professionelle KI-Lösungen.
            </p>
          </CardContent>
        </Card>

        <section id="was-ist">
          <h2>Was ist Microsoft Copilot Studio?</h2>
          <p>
            Microsoft Copilot Studio (früher Power Virtual Agents) ist eine Low-Code-Plattform zur Erstellung eigener
            KI-Agenten, Custom Copilots und intelligenter Chatbots. Es ermöglicht Unternehmen, spezialisierte KI-Assistenten
            für spezifische Geschäftsprozesse zu entwickeln.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="w-5 h-5" />
                  Custom Copilots
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Erstellen Sie spezialisierte Copilots für Abteilungen wie HR, Finance, IT-Support oder Vertrieb.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <LinkIcon className="w-5 h-5" />
                  Plugins
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Erweitern Sie Microsoft 365 Copilot mit eigenen Funktionen und Datenquellen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-5 h-5" />
                  Enterprise Security
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  DSGVO-konform mit Azure AD-Integration und Role-Based Access Control.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="anwendungsfaelle" className="mt-12">
          <h2>Anwendungsfälle für Unternehmen</h2>

          <div className="space-y-6 my-6">
            {[
              {
                title: "IT-Support Copilot",
                description: "Automatische Beantwortung häufiger IT-Fragen, Ticket-Erstellung und Troubleshooting-Anleitungen.",
                beispiele: ["Password-Reset", "Software-Installation", "Hardware-Support"]
              },
              {
                title: "HR-Assistent",
                description: "Onboarding neuer Mitarbeiter, Urlaubsanfragen, Benefits-Informationen und HR-Richtlinien.",
                beispiele: ["Onboarding-Guide", "Urlaubsanträge", "Gehaltsabrechnungen"]
              },
              {
                title: "Sales Copilot",
                description: "Produktinformationen, Preiskalkulationen, CRM-Integration und Lead-Qualifizierung.",
                beispiele: ["Produktkatalog", "Angebotserstellung", "Customer Data"]
              }
            ].map((useCase, idx) => (
              <Card key={idx} className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.beispiele.map((beispiel, bidx) => (
                      <span key={bidx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {beispiel}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="custom-copilots" className="mt-12">
          <h2>Custom Copilots erstellen</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Schritt-für-Schritt: Ihren ersten Copilot erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {[
                  { schritt: "Copilot Studio öffnen", details: "Navigieren Sie zu copilotstudio.microsoft.com" },
                  { schritt: "Neuen Copilot erstellen", details: "Wählen Sie Template oder starten Sie von Grund auf" },
                  { schritt: "Topics definieren", details: "Legen Sie Themen fest, die Ihr Copilot verstehen soll" },
                  { schritt: "Datenquellen verbinden", details: "Binden Sie SharePoint, Websites oder APIs an" },
                  { schritt: "Testen und Verfeinern", details: "Nutzen Sie den Test-Chat zur Optimierung" },
                  { schritt: "Deployen", details: "Veröffentlichen Sie in Teams, Website oder als Plugin" }
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

        <section id="plugins" className="mt-12">
          <h2>Plugins und Erweiterungen</h2>
          <p>
            Erweitern Sie Microsoft 365 Copilot mit Custom Plugins aus Copilot Studio.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Führen Sie Aktionen in externen Systemen aus: Tickets erstellen, Daten aktualisieren, Workflows starten.
                </p>
                <ul className="space-y-1 text-sm">
                  {["Power Automate Flows", "API Calls", "Database Updates"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Knowledge Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Geben Sie Copilot Zugriff auf Ihre Unternehmensdaten für kontextbezogene Antworten.
                </p>
                <ul className="space-y-1 text-sm">
                  {["SharePoint Sites", "OneDrive Files", "Custom APIs"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="integration" className="mt-12">
          <h2>Integration mit Microsoft 365</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Deployment-Optionen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { kanal: "Microsoft Teams", beschreibung: "Als Chat-Bot oder Tab-App direkt in Teams" },
                  { kanal: "Microsoft 365 Copilot", beschreibung: "Als Plugin für M365 Copilot" },
                  { kanal: "Website", beschreibung: "Eingebetteter Chat-Widget auf Ihrer Website" },
                  { kanal: "Mobile App", beschreibung: "Power Apps Integration für mobile Nutzung" }
                ].map((option, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="font-semibold text-primary">{option.kanal}</div>
                    <div className="text-sm text-muted-foreground mt-1">{option.beschreibung}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="datenquellen" className="mt-12">
          <h2>Datenquellen anbinden</h2>
          <p>
            Copilot Studio unterstützt verschiedene Datenquellen für intelligente, kontextbezogene Antworten.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Microsoft-Quellen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "SharePoint Online",
                    "OneDrive for Business",
                    "Microsoft Dataverse",
                    "Azure SQL Database"
                  ].map((source, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      {source}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Externe Quellen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "REST APIs",
                    "Power Automate Flows",
                    "Custom Connectors",
                    "Öffentliche Websites"
                  ].map((source, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      {source}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="sicherheit" className="mt-12">
          <h2>Sicherheit und Compliance</h2>

          <Card className="my-6 border-2 border-green-500/20">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Enterprise-Grade Security
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Azure AD Authentication",
                  "Role-Based Access Control (RBAC)",
                  "Data Loss Prevention (DLP)",
                  "DSGVO & ISO 27001 konform",
                  "Audit Logs & Monitoring",
                  "Verschlüsselung at rest & in transit"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="lizenzierung" className="mt-12">
          <h2>Lizenzierung und Kosten</h2>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="text-base">In M365 Copilot enthalten</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold text-primary mb-2">Enthalten</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Begrenzt auf 25 Nachrichten pro Nutzer/Monat
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Custom Copilots erstellen</li>
                  <li>• Plugins für M365 Copilot</li>
                  <li>• Basis-Datenquellen</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
                <CardTitle className="text-base">Standalone Lizenz</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold text-primary mb-2">ab 200 USD</div>
                <p className="text-sm text-muted-foreground mb-4">
                  pro Tenant/Monat + Message Credits
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Unbegrenzte Messages</li>
                  <li>• Erweiterte Integrationen</li>
                  <li>• Custom AI Models</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="faq" className="mt-12 mb-12">
          <h2>Häufig gestellte Fragen (FAQ)</h2>

          <div className="space-y-4 my-6">
            {faqSchema.mainEntity.map((faq: any, idx: number) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center my-12">
          <h3 className="text-2xl font-bold mb-4">Custom Copilots für Ihr Unternehmen</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir unterstützen Sie bei der Entwicklung maßgeschneiderter KI-Lösungen mit Copilot Studio.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Beratung anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotStudio;
