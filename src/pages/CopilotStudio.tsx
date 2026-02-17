import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Bot, Link as LinkIcon, Shield, ExternalLink } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-studio";
const PAGE_TITLE = "Copilot Studio";

const CopilotStudio = () => {
  const martinLang = getAuthor('martin-lang')!;

  // Schema IDs automatisch generieren
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-ist", title: "Was ist Microsoft Copilot Studio?", level: 2 },
    { id: "anwendungsfaelle", title: "Anwendungsfälle für Unternehmen", level: 2 },
    { id: "custom-copilots", title: "Custom Copilots erstellen", level: 2 },
    { id: "plugins", title: "Plugins und Erweiterungen", level: 2 },
    { id: "integration", title: "Integration mit Microsoft 365", level: 2 },
    { id: "datenquellen", title: "Datenquellen anbinden", level: 2 },
    { id: "sicherheit", title: "Sicherheit und Compliance", level: 2 },
    { id: "lizenzierung", title: "Lizenzierung und Kosten", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  // FAQ-Daten für Schema und Anzeige (kundenorientierte Fragen)
  const faqs = [
    {
      name: "Wir brauchen einen speziellen Chatbot für unser Intranet – ist Copilot Studio dafür geeignet?",
      answer: "Ja, Copilot Studio ist ideal für unternehmensspezifische Chatbots und KI-Assistenten. Sie können SharePoint, interne Datenbanken und APIs anbinden, sodass der Bot auf Ihr Unternehmenswissen zugreift. Die Copilotenschule bietet praxisorientierte Copilot Studio Workshops, in denen Sie lernen, maßgeschneiderte Lösungen für Ihr Intranet zu entwickeln."
    },
    {
      name: "Können wir ohne Programmierkenntnisse eigene KI-Assistenten mit Copilot Studio bauen?",
      answer: "Absolut. Copilot Studio ist eine Low-Code-Plattform mit visuellem Designer – Sie können Chatbots und KI-Agenten per Drag-and-Drop erstellen. Für komplexere Anforderungen lässt sich optional Code hinzufügen. Im Copilot Studio Training der Copilotenschule lernen auch Nicht-Entwickler, professionelle KI-Assistenten zu erstellen."
    },
    {
      name: "Wie verbinde ich Copilot Studio mit unseren internen Systemen und Datenbanken?",
      answer: "Copilot Studio bietet über 1.000 vorgefertigte Konnektoren für SharePoint, SAP, Salesforce, SQL-Datenbanken und mehr. Über Custom Connectors und APIs lassen sich auch proprietäre Systeme anbinden. Die Copilotenschule zeigt in praxisnahen Workshops, wie Sie Ihre Unternehmensdaten sicher und effizient integrieren."
    },
    {
      name: "Was kostet die Entwicklung eines eigenen Copilot-Agenten mit Copilot Studio?",
      answer: "Copilot Studio ist in Microsoft 365 Copilot enthalten oder als Standalone ab 200 USD/Monat verfügbar, plus nutzungsbasierte Message Credits. Die Entwicklung eines einfachen Agenten dauert oft nur wenige Tage. Die Copilotenschule unterstützt Sie bei der Kosten-Nutzen-Analyse und dem schnellen Aufbau Ihres ersten KI-Agenten."
    }
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen",
        "description": "Copilot Studio Tutorial: Eigene KI-Agenten, Chatbots und Custom Copilots ohne Code erstellen. Low-Code Plattform für Unternehmen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2026-02-03",
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
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2026-02-03T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft Copilot Studio", href: "/wissen/copilot-studio" }
        ]}
        title="Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen"
        description="Copilot Studio Tutorial: Eigene KI-Agenten, Chatbots und Custom Copilots ohne Code erstellen. Low-Code Plattform für Unternehmen."
        lastUpdated="03. Februar 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500">Was ist Microsoft Copilot Studio?</h2>
          <p>
            Microsoft Copilot Studio (früher Power Virtual Agents) ist eine Low-Code-Plattform zur Erstellung eigener
            KI-Agenten, Custom Copilots und intelligenter Chatbots. Es ermöglicht Unternehmen, spezialisierte KI-Assistenten
            für spezifische Geschäftsprozesse zu entwickeln.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card className="border-t-4 border-t-purple-500">
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

            <Card className="border-t-4 border-t-green-500">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
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

            <Card className="border-t-4 border-t-cyan-500">
              <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10">
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500">Anwendungsfälle für Unternehmen</h2>

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
              <Card key={idx} className="border-l-4 border-l-emerald-500">
                <CardHeader>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.beispiele.map((beispiel, bidx) => (
                      <span key={bidx} className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs">
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500">Custom Copilots erstellen</h2>

          <Card className="my-6 border-l-4 border-l-purple-500">
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
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500">Plugins und Erweiterungen</h2>
          <p>
            Erweitern Sie Microsoft 365 Copilot mit Custom Plugins aus Copilot Studio.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card className="border-t-4 border-t-cyan-500">
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
                      <Check className="w-3 h-3 text-cyan-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-indigo-500">
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
                      <Check className="w-3 h-3 text-indigo-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="integration" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">Integration mit Microsoft 365</h2>

          <Card className="my-6 border-l-4 border-l-red-500">
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
                  <div key={idx} className="p-4 border-l-4 border-l-red-500/30 rounded-lg bg-red-500/5">
                    <div className="font-semibold text-red-600">{option.kanal}</div>
                    <div className="text-sm text-muted-foreground mt-1">{option.beschreibung}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="datenquellen" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-amber-500">Datenquellen anbinden</h2>
          <p>
            Copilot Studio unterstützt verschiedene Datenquellen für intelligente, kontextbezogene Antworten.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card className="border-t-4 border-t-amber-500">
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
                      <Check className="w-4 h-4 text-amber-600" />
                      {source}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-slate-500">
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
                      <Check className="w-4 h-4 text-slate-600" />
                      {source}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="sicherheit" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500">Sicherheit und Compliance</h2>

          <Card className="my-6 border-2 border-green-500/20 border-l-4 border-l-green-500">
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-indigo-500">Lizenzierung und Kosten</h2>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
                <CardTitle className="text-base">In M365 Copilot enthalten</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">Enthalten</div>
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

            <Card className="border-t-4 border-t-purple-500">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
                <CardTitle className="text-base">Standalone Lizenz</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold text-purple-600 mb-2">ab 200 USD</div>
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-gray-500">Häufig gestellte Fragen (FAQ)</h2>

          <div className="space-y-4 my-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow border-l-4 border-l-gray-500">
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

        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500">Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Microsoft-Dokumentationen und Ressourcen für vertiefende Informationen zu Copilot Studio.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-cyan-600 transition-colors">Microsoft Learn: Copilot Studio Dokumentation</div>
                <div className="text-sm text-muted-foreground">Offizielle Dokumentation mit Tutorials, Referenzen und Best Practices</div>
              </div>
            </a>

            <a
              href="https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-emerald-500/20 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-emerald-600 transition-colors">Microsoft Copilot Studio Produktseite</div>
                <div className="text-sm text-muted-foreground">Übersicht über Features, Preise und Anwendungsfälle</div>
              </div>
            </a>

            <a
              href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-purple-500/20 rounded-lg hover:border-purple-500/50 hover:bg-purple-500/5 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-purple-600 transition-colors">Was ist Microsoft Copilot Studio?</div>
                <div className="text-sm text-muted-foreground">Einführung in die Grundlagen und Architektur von Copilot Studio</div>
              </div>
            </a>

            <a
              href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-plugin-actions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-indigo-500/20 rounded-lg hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-indigo-600 transition-colors">Copilot Studio: Tools und Actions</div>
                <div className="text-sm text-muted-foreground">Dokumentation zum Hinzufügen von Tools und Actions zu Agenten</div>
              </div>
            </a>
          </div>
        </section>

        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Custom Copilots für Ihr Unternehmen</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir unterstützen Sie bei der Entwicklung maßgeschneiderter KI-Lösungen mit Copilot Studio.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Beratung anfragen
          </a>
        </div>

        <section className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-6 items-start">
            <div className="md:col-span-1">
              <img
                src={martinLang.image}
                alt={martinLang.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/30 mx-auto mb-4"
              />
            </div>
            <div className="md:col-span-3">
              <div className="border-l-4 border-l-blue-500 pl-6">
                <h3 className="text-2xl font-bold mb-1">{martinLang.name}</h3>
                <div className="text-sm font-semibold text-blue-600 mb-3">{martinLang.role}</div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {martinLang.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {martinLang.expertise?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-700 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {martinLang.website && (
                    <a href={martinLang.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Website
                    </a>
                  )}
                  {martinLang.linkedin && (
                    <a href={martinLang.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      LinkedIn
                    </a>
                  )}
                  {martinLang.twitter && (
                    <a href={martinLang.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Twitter/X
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default CopilotStudio;
