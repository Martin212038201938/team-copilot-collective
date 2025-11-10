import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";

const MicrosoftCopilotAgentsGuide = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "was-sind-agents", title: "Was sind Copilot Agents?", level: 2 },
    { id: "unterschied-copilot-agents", title: "Unterschied: Copilot vs. Agents", level: 2 },
    { id: "copilot-studio", title: "Copilot Studio: Die Entwicklungsumgebung", level: 2 },
    { id: "agent-erstellen", title: "Schritt-für-Schritt: Agent erstellen", level: 2 },
    { id: "use-cases", title: "Top Use Cases für Copilot Agents", level: 2 },
    { id: "enterprise-deployment", title: "Enterprise Deployment & Verwaltung", level: 2 },
    { id: "best-practices", title: "Best Practices für Agent-Entwicklung", level: 2 },
    { id: "sicherheit-governance", title: "Sicherheit & Governance", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Microsoft Copilot Agents - Der komplette Guide für Entwickler",
    "description": "Lernen Sie, wie Sie benutzerdefinierte Copilot Agents erstellen, mit Copilot Studio entwickeln und Agents in Ihrem Unternehmen einsetzen.",
    "author": getAuthorSchemaMarkup(author),
    "datePublished": "2025-11-21",
    "dateModified": "2025-11-21",
    "keywords": [
      "Copilot Agent erstellen",
      "Microsoft Copilot Studio",
      "Copilot Automatisierung",
      "Custom Copilot Agent",
      "Copilot für Unternehmen",
      "Copilot Studio Tutorial"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist ein Copilot Agent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein Copilot Agent ist ein spezialisierter KI-Assistent, der für spezifische Aufgaben und Workflows in Ihrem Unternehmen entwickelt wurde. Während Microsoft 365 Copilot ein allgemeiner Assistent ist, sind Agents auf bestimmte Anwendungsfälle zugeschnitten – z.B. ein HR-Agent für Urlaubsanfragen oder ein IT-Agent für Support-Tickets. Agents können mit Ihren Geschäftsdaten, APIs und Systemen verbunden werden."
        }
      },
      {
        "@type": "Question",
        "name": "Brauche ich Programmierkenntnisse für Copilot Agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein, grundlegende Agents können Sie in Copilot Studio mit Low-Code/No-Code-Tools erstellen. Die visuelle Entwicklungsumgebung ermöglicht es Business-Anwendern, einfache Agents mit Drag-and-Drop zu bauen. Für komplexere Agents mit Custom Code, API-Integrationen oder erweiterten Workflows sind jedoch Kenntnisse in Power Automate, Power Apps und TypeScript/JavaScript hilfreich."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet Copilot Studio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot Studio ist in der Microsoft 365 Copilot Lizenz (30 USD/Nutzer/Monat) enthalten. Zusätzliche Kosten können entstehen durch: Power Platform Add-ons für erweiterte Kapazitäten, Premium Connectoren für Drittanbieter-APIs (ab 5 USD/Nutzer/Monat), und AI Builder Credits für erweiterte KI-Funktionen. Für Enterprise-Kunden gibt es spezielle Volumenlizenzierungen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie unterscheiden sich Copilot Agents von Power Virtual Agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot Agents sind die Weiterentwicklung von Power Virtual Agents. Während Power Virtual Agents primär für Chatbots konzipiert waren, integrieren Copilot Agents moderne LLM-Technologie, nahtlose Microsoft 365-Integration und erweiterte Reasoning-Fähigkeiten. Bestehende Power Virtual Agents können zu Copilot Agents migriert werden. Die Entwicklung erfolgt weiterhin in Copilot Studio (ehemals Power Virtual Agents Studio)."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich Agents für externe Kunden erstellen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Copilot Agents können sowohl intern als auch extern eingesetzt werden. Sie können Agents auf Ihrer Website einbinden, in Kundenportalen integrieren oder als eigenständige Chat-Anwendungen bereitstellen. Beachten Sie jedoch Lizenzanforderungen: Externe Nutzer benötigen entweder Power Apps per app/per user Lizenzen oder Sie nutzen Azure-basierte Skalierung für anonyme Zugriffe."
        }
      },
      {
        "@type": "Question",
        "name": "Wie sichere ich Copilot Agents ab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot Agents unterstützen mehrere Sicherheitsebenen: Azure AD/Entra ID Authentifizierung für Nutzerzugriff, Data Loss Prevention (DLP) Policies zur Kontrolle von Datenflüssen, Row-Level Security (RLS) für datenbankbasierte Zugriffe, API-Gateways für Backend-Verbindungen, und Audit-Logging für Compliance. IT-Administratoren können Agent-Berechtigungen granular über das Microsoft 365 Admin Center steuern."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich mehrere Agents kombinieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Sie können Agent Orchestration nutzen, um mehrere Agents zu kombinieren. Ein Master-Agent kann Anfragen an spezialisierte Sub-Agents weiterleiten. Beispiel: Ein 'Unternehmens-Agent' routet HR-Fragen an den HR-Agent, IT-Fragen an den IT-Agent und Finanzfragen an den Finance-Agent. Dies ermöglicht modulare Architekturen und bessere Wartbarkeit."
        }
      },
      {
        "@type": "Question",
        "name": "Wie messe ich den Erfolg meiner Agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot Studio bietet umfangreiche Analytics: Nutzungsmetriken (Anzahl Konversationen, aktive Nutzer), Performance-Metriken (Response Time, Success Rate), Engagement-Metriken (durchschnittliche Konversationslänge, Wiederkehrrate), und Business-Metriken (gelöste Anfragen, Eskalationsrate). Sie können auch Custom Events tracken und Daten in Power BI visualisieren für erweiterte Analysen."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Microsoft Copilot Agents Guide - Agents erstellen & einsetzen | Copilotenschule"
        description="Lernen Sie, wie Sie benutzerdefinierte Copilot Agents erstellen, mit Copilot Studio entwickeln und Agents in Ihrem Unternehmen einsetzen."
        keywords={[
          "Copilot Agent erstellen",
          "Microsoft Copilot Studio",
          "Copilot Automatisierung",
          "Custom Copilot Agent",
          "Copilot für Unternehmen",
          "Copilot Studio Tutorial"
        ]}
        canonicalUrl="https://copilotenschule.de/wissen/microsoft-copilot-agents-guide"
        schema={[articleSchema, faqSchema]}
        publishedTime="2025-11-21"
        modifiedTime="2025-11-21"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft Copilot Agents Guide", href: "/wissen/microsoft-copilot-agents-guide" }
        ]}
        title="Microsoft Copilot Agents - Der komplette Guide für Entwickler"
        description="Erstellen Sie spezialisierte Copilot Agents für Ihre spezifischen Geschäftsanforderungen. Von Low-Code bis Enterprise-Deployment."
        tableOfContents={tableOfContents}
        author={author}
        publishDate="2025-11-21"
        readTime="10 Minuten"
      >
        {/* Einleitung */}
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Microsoft Copilot Agents sind spezialisierte KI-Assistenten, die Sie für spezifische Aufgaben und Workflows in Ihrem Unternehmen entwickeln können. Während Microsoft 365 Copilot ein allgemeiner Produktivitäts-Assistent ist, ermöglichen Agents die Erstellung maßgeschneiderter KI-Lösungen, die auf Ihre Geschäftsprozesse zugeschnitten sind.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            In diesem Guide erfahren Sie alles über die Entwicklung, das Deployment und die Verwaltung von Copilot Agents – von einfachen Low-Code-Lösungen bis zu komplexen Enterprise-Implementierungen.
          </p>
        </section>

        {/* Was sind Copilot Agents? */}
        <section id="was-sind-agents" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Was sind Copilot Agents?</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Copilot Agents sind autonome KI-Assistenten, die Sie mit Copilot Studio erstellen können. Sie kombinieren die Leistungsfähigkeit von Large Language Models (LLMs) mit Ihren spezifischen Geschäftsdaten und -prozessen.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Kernmerkmale von Copilot Agents:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-blue-600 font-bold">🎯</span>
                <span><strong>Spezialisiert:</strong> Fokussiert auf spezifische Aufgaben (HR, IT-Support, Sales, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600 font-bold">🔌</span>
                <span><strong>Integriert:</strong> Verbindung zu Ihren Datenquellen, APIs und Geschäftssystemen</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600 font-bold">🤖</span>
                <span><strong>Autonom:</strong> Können Aktionen ausführen, nicht nur Informationen liefern</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600 font-bold">🧠</span>
                <span><strong>Lernfähig:</strong> Nutzen Grounding für aktuelle, relevante Antworten</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600 font-bold">🔐</span>
                <span><strong>Sicher:</strong> Integrierte Microsoft-Sicherheit und Compliance</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border-2 border-green-300 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-green-900">💼 HR Agent</h3>
              <p className="text-gray-700 text-sm mb-3">
                Beantwortet Mitarbeiter-Fragen zu Urlaubsrichtlinien, Gehalt, Benefits und erstellt automatisch HR-Tickets.
              </p>
              <div className="bg-green-50 p-2 rounded text-xs text-gray-700">
                <strong>Beispiel:</strong> "Wie viele Urlaubstage habe ich noch?" → Agent prüft HR-System und antwortet präzise.
              </div>
            </div>

            <div className="bg-white border-2 border-purple-300 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">🛠️ IT Support Agent</h3>
              <p className="text-gray-700 text-sm mb-3">
                Löst häufige IT-Probleme, erstellt Support-Tickets und führt Benutzer durch Troubleshooting-Prozesse.
              </p>
              <div className="bg-purple-50 p-2 rounded text-xs text-gray-700">
                <strong>Beispiel:</strong> "Mein VPN funktioniert nicht" → Agent startet Diagnose-Workflow und bietet Lösungsschritte.
              </div>
            </div>

            <div className="bg-white border-2 border-orange-300 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-orange-900">📊 Sales Agent</h3>
              <p className="text-gray-700 text-sm mb-3">
                Unterstützt Vertriebsteams bei CRM-Abfragen, generiert Angebote und analysiert Verkaufschancen.
              </p>
              <div className="bg-orange-50 p-2 rounded text-xs text-gray-700">
                <strong>Beispiel:</strong> "Zeige alle offenen Deals > 50k EUR" → Agent filtert CRM-Daten und erstellt Report.
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 p-5 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">💡 Wichtig zu verstehen</h4>
            <p className="text-gray-800 text-sm">
              Copilot Agents sind keine einfachen Chatbots. Sie nutzen fortschrittliche Reasoning-Fähigkeiten, verstehen komplexe Anfragen und können mehrstufige Aktionen ausführen – vergleichbar mit einem virtuellen Mitarbeiter, der spezialisierte Aufgaben übernimmt.
            </p>
          </div>
        </section>

        {/* Unterschied: Copilot vs. Agents */}
        <section id="unterschied-copilot-agents" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Unterschied: Copilot vs. Agents</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Microsoft 365 Copilot und Copilot Agents sind komplementäre Lösungen, die unterschiedliche Anwendungsfälle bedienen.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Kriterium</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Microsoft 365 Copilot</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Copilot Agents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Zweck</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Allgemeiner Produktivitäts-Assistent</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Spezialisiert auf bestimmte Workflows</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Anwendungsbereich</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Microsoft 365 Apps (Word, Excel, Teams, etc.)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Custom Workflows, externe Systeme</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Konfiguration</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Out-of-the-box, keine Entwicklung nötig</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Erfordert Entwicklung in Copilot Studio</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Datenquellen</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Microsoft Graph (M365-Daten)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Beliebige APIs, Datenbanken, externe Systeme</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Aktionen</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Dokumentenerstellung, Zusammenfassungen</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Custom Actions, Workflows, Transaktionen</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Zielgruppe</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Alle Microsoft 365-Nutzer</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Spezifische Abteilungen/Anwendungsfälle</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Lizenzmodell</td>
                  <td className="px-6 py-4 text-sm text-gray-700">30 USD/Nutzer/Monat</td>
                  <td className="px-6 py-4 text-sm text-gray-700">In Copilot-Lizenz enthalten + Power Platform</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5">
            <h4 className="font-semibold text-indigo-900 mb-2">🎯 Wann welche Lösung?</h4>
            <div className="space-y-2 text-sm text-gray-800">
              <p><strong>Nutzen Sie Microsoft 365 Copilot wenn:</strong> Sie generelle Produktivitätssteigerung in Office-Apps benötigen, keine Custom-Integrationen erforderlich sind, und alle Nutzer denselben Assistenten verwenden sollen.</p>
              <p><strong>Nutzen Sie Copilot Agents wenn:</strong> Sie spezialisierte Workflows automatisieren möchten, Integrationen mit externen Systemen benötigen, oder abteilungsspezifische KI-Assistenten erstellen wollen.</p>
            </div>
          </div>
        </section>

        {/* Copilot Studio */}
        <section id="copilot-studio" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Copilot Studio: Die Entwicklungsumgebung</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Copilot Studio ist die zentrale Plattform für die Entwicklung von Copilot Agents. Es bietet eine visuelle Low-Code/No-Code-Umgebung sowie erweiterte Pro-Code-Optionen für Entwickler.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">🎨 Low-Code Interface</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Drag-and-Drop Topic-Erstellung</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Visuelle Workflow-Designer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Template-Bibliothek für schnellen Start</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Integrierter Test-Canvas</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-purple-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">💻 Pro-Code Optionen</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Power Fx Formeln für komplexe Logik</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Custom Connectors für API-Integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Azure Functions für Backend-Logik</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Git-Integration für Versionskontrolle</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-green-900">🔧 Kern-Features von Copilot Studio</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-1">Generative Answers</h4>
                <p className="text-sm text-gray-700">Agent nutzt LLMs, um aus Ihren Datenquellen (SharePoint, Websites, Datenbanken) kontextbezogene Antworten zu generieren.</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-1">Topics & Trigger Phrases</h4>
                <p className="text-sm text-gray-700">Definieren Sie Gesprächsthemen und die Phrasen, die sie auslösen. Z.B. Topic "Urlaubsantrag" wird bei "Urlaub beantragen" aktiviert.</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-1">Actions & Skills</h4>
                <p className="text-sm text-gray-700">Verbinden Sie Power Automate Flows, um Aktionen auszuführen: Tickets erstellen, E-Mails senden, Datenbank-Updates, etc.</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-1">Analytics & Monitoring</h4>
                <p className="text-sm text-gray-700">Echtzeit-Dashboard für Nutzungsstatistiken, Erfolgsmetriken, Fehleranalyse und Optimierungsempfehlungen.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">🚀 Zugriff auf Copilot Studio</h4>
            <p className="text-gray-700 text-sm mb-2">
              <strong>URL:</strong> <a href="https://copilotstudio.microsoft.com" className="text-blue-600 underline">copilotstudio.microsoft.com</a>
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Voraussetzungen:</strong> Microsoft 365 Copilot Lizenz oder Power Virtual Agents Lizenz. IT-Administratoren können den Zugriff über das Microsoft 365 Admin Center steuern.
            </p>
          </div>
        </section>

        {/* Schritt-für-Schritt: Agent erstellen */}
        <section id="agent-erstellen" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Schritt-für-Schritt: Agent erstellen</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Erstellen Sie Ihren ersten Copilot Agent in wenigen Schritten. In diesem Beispiel bauen wir einen einfachen IT-Support-Agent.
          </p>

          <div className="bg-white border-2 border-indigo-300 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-900">📋 Schritt 1: Neuen Agent anlegen</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Copilot Studio öffnen</p>
                  <p className="text-gray-700 text-sm">Navigieren Sie zu copilotstudio.microsoft.com und melden Sie sich an.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Agent erstellen</p>
                  <p className="text-gray-700 text-sm">Klicken Sie auf "+ Create" und wählen Sie "New Agent". Geben Sie einen Namen ein: "IT Support Agent".</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Konfiguration</p>
                  <p className="text-gray-700 text-sm">Wählen Sie Sprache (Deutsch), Zielgruppe (Mitarbeiter) und beschreiben Sie den Zweck des Agents.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-green-300 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-green-900">📋 Schritt 2: Topics definieren</h3>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Topic: VPN-Probleme</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Trigger Phrases:</strong></p>
                <ul className="text-xs text-gray-700 space-y-1 ml-4">
                  <li>• "VPN funktioniert nicht"</li>
                  <li>• "Kann mich nicht mit VPN verbinden"</li>
                  <li>• "VPN Probleme"</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2"><strong>Agent-Antwort:</strong> Führt Benutzer durch VPN-Diagnose, prüft Verbindungsstatus, bietet Lösungsschritte.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Topic: Passwort zurücksetzen</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Trigger Phrases:</strong></p>
                <ul className="text-xs text-gray-700 space-y-1 ml-4">
                  <li>• "Passwort vergessen"</li>
                  <li>• "Passwort zurücksetzen"</li>
                  <li>• "Kann mich nicht anmelden"</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2"><strong>Agent-Antwort:</strong> Startet Self-Service-Prozess, verifiziert Identität, sendet Reset-Link.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-300 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-900">📋 Schritt 3: Datenquellen anbinden</h3>

            <p className="text-gray-700 text-sm mb-3">
              Verbinden Sie Ihren Agent mit relevanten Wissensdatenbanken:
            </p>

            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm"><strong>SharePoint Site:</strong> IT-Dokumentation mit FAQs und Troubleshooting-Guides</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm"><strong>Website:</strong> Öffentliche IT-Knowledge Base für häufige Probleme</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm"><strong>Dataverse:</strong> Ticketing-System für Eskalationen und Historie</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg mt-4 border border-yellow-300">
              <p className="text-xs text-gray-800">
                <strong>💡 Tipp:</strong> Aktivieren Sie "Generative Answers" – der Agent nutzt dann LLMs, um aus Ihren Datenquellen kontextbezogene Antworten zu generieren, auch wenn keine exakte Übereinstimmung existiert.
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-orange-300 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-900">📋 Schritt 4: Actions hinzufügen</h3>

            <p className="text-gray-700 text-sm mb-3">
              Verbinden Sie Power Automate Flows für automatische Aktionen:
            </p>

            <div className="space-y-3">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">Action: Ticket erstellen</h4>
                <p className="text-xs text-gray-700">Wenn Problem nicht gelöst werden kann, erstellt Agent automatisch ein Support-Ticket in ServiceNow/Jira und sendet Bestätigung.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">Action: E-Mail an IT-Team</h4>
                <p className="text-xs text-gray-700">Bei kritischen Problemen (Server down, Sicherheitsvorfälle) sendet Agent sofort Alarm-E-Mail an IT-Team.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">Action: Feedback sammeln</h4>
                <p className="text-xs text-gray-700">Nach Lösung fragt Agent nach Feedback und speichert es in Dataverse für Analytics.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-red-300 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-900">📋 Schritt 5: Testen & Deployen</h3>

            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">Test Canvas nutzen</h4>
                <p className="text-xs text-gray-700">Testen Sie Ihren Agent direkt in Copilot Studio mit verschiedenen Szenarien. Prüfen Sie Topic-Erkennung, Datenabfragen und Actions.</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">Publish</h4>
                <p className="text-xs text-gray-700">Wenn Tests erfolgreich, klicken Sie "Publish". Agent wird nun für Ihre Organisation verfügbar gemacht.</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">Integration</h4>
                <p className="text-xs text-gray-700">Binden Sie Agent in Microsoft Teams, Ihre Website oder als eigenständige App ein.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Use Cases */}
        <section id="use-cases" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Top Use Cases für Copilot Agents</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Copilot Agents können in nahezu jedem Unternehmensbereich eingesetzt werden. Hier sind die häufigsten und erfolgreichsten Anwendungsfälle:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">👥 HR & Employee Services</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Urlaubsanträge & Abwesenheitsverwaltung</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Benefits & Gehalt-Anfragen beantworten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Onboarding neuer Mitarbeiter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Policy & Compliance-Fragen klären</span>
                </li>
              </ul>
              <div className="mt-4 bg-white p-3 rounded text-xs text-gray-700 border-l-4 border-blue-500">
                <strong>ROI:</strong> 70% Reduktion von HR-Anfragen, 24/7 Verfügbarkeit
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-900">🛠️ IT Support & Helpdesk</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Passwort-Resets & Account-Probleme</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Software-Installation & Troubleshooting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>VPN & Netzwerk-Support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Hardware-Bestellungen & Genehmigungen</span>
                </li>
              </ul>
              <div className="mt-4 bg-white p-3 rounded text-xs text-gray-700 border-l-4 border-green-500">
                <strong>ROI:</strong> 60% schnellere Ticket-Lösung, 40% weniger Eskalationen
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">📊 Sales & CRM</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Lead-Qualifizierung & Scoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Angebotserstellung & Pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Deal-Status & Pipeline-Updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Customer Success Stories abrufen</span>
                </li>
              </ul>
              <div className="mt-4 bg-white p-3 rounded text-xs text-gray-700 border-l-4 border-purple-500">
                <strong>ROI:</strong> 30% schnellere Angebotserstellung, höhere Close Rates
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-900">💰 Finance & Procurement</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Rechnungsfreigaben & Genehmigungen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Budget-Abfragen & Reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Bestellungen & Vendor-Management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Spesenabrechnung & Travel</span>
                </li>
              </ul>
              <div className="mt-4 bg-white p-3 rounded text-xs text-gray-700 border-l-4 border-orange-500">
                <strong>ROI:</strong> 50% schnellere Genehmigungsprozesse, weniger Fehler
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg">
            <h4 className="font-semibold mb-3">🚀 Emerging Use Cases</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1">🏥 Healthcare</p>
                <p className="text-indigo-100 text-xs">Patientenanfragen, Terminvereinbarungen, Medikationsinfos</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🏫 Education</p>
                <p className="text-indigo-100 text-xs">Studierendenberatung, Kursanmeldungen, Lernhilfe</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🏭 Manufacturing</p>
                <p className="text-indigo-100 text-xs">Wartungsanfragen, Produktionsdaten, Safety Compliance</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🏦 Banking</p>
                <p className="text-indigo-100 text-xs">Kontoanfragen, Betrugserkennung, Compliance-Checks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Deployment */}
        <section id="enterprise-deployment" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Enterprise Deployment & Verwaltung</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Für Enterprise-Umgebungen erfordert das Deployment von Copilot Agents eine strukturierte Governance und ein klares Operating Model.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">🏢 Enterprise Deployment Modell</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Phase 1: Pilotierung (4-6 Wochen)</h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Auswahl eines High-Impact Use Cases (z.B. IT-Support)</li>
                  <li>• Pilot mit 50-100 Nutzern aus einer Abteilung</li>
                  <li>• Feedback sammeln, Metrics tracken (CSAT, Resolution Time)</li>
                  <li>• Iterative Verbesserungen basierend auf Nutzerdaten</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Phase 2: Rollout (8-12 Wochen)</h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Skalierung auf weitere Abteilungen (HR, Finance, Sales)</li>
                  <li>• Training für Power Users und Admins</li>
                  <li>• Etablierung von Support-Strukturen (Helpdesk, Dokumentation)</li>
                  <li>• Continuous Monitoring und Optimierung</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Phase 3: Operationalisierung (laufend)</h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Center of Excellence (CoE) für Agent-Governance</li>
                  <li>• Regelmäßige Reviews und Updates (monatlich)</li>
                  <li>• Neue Use Cases identifizieren und priorisieren</li>
                  <li>• Best Practices dokumentieren und teilen</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-yellow-900 mb-3">⚠️ Kritische Erfolgsfaktoren</h4>
            <ul className="space-y-2 text-sm text-gray-800">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">✓</span>
                <span><strong>Executive Sponsorship:</strong> C-Level Buy-In für Budget und Priorität</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">✓</span>
                <span><strong>Cross-Functional Team:</strong> IT, Business, Legal, Security involvieren</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">✓</span>
                <span><strong>Change Management:</strong> User Adoption durch Training und Communication</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">✓</span>
                <span><strong>Messbare KPIs:</strong> ROI-Tracking durch klare Metriken</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">📊 Key Performance Indicators (KPIs)</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-1">📈 Usage Metrics</p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Anzahl Konversationen/Tag</li>
                  <li>• Aktive Nutzer (DAU, MAU)</li>
                  <li>• Durchschnittliche Session-Länge</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">✅ Quality Metrics</p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Resolution Rate (erste Antwort)</li>
                  <li>• Customer Satisfaction (CSAT)</li>
                  <li>• Eskalationsrate</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">💰 Business Metrics</p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Cost per Conversation</li>
                  <li>• Time Saved (FTE)</li>
                  <li>• ROI (% Cost Reduction)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">⚙️ Technical Metrics</p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Response Time (ms)</li>
                  <li>• Error Rate</li>
                  <li>• Uptime (%)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Best Practices für Agent-Entwicklung</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-900">✅ Do's</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>User-zentriert designen:</strong> Starten Sie mit User Research, nicht mit Technologie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Klein anfangen:</strong> Ein Use Case perfektionieren, dann skalieren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Kontinuierlich testen:</strong> Wöchentliche Tests mit echten Nutzern</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Fallback-Szenarien:</strong> Klare Eskalationspfade bei Nicht-Verständnis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Analytics nutzen:</strong> Datengetriebene Optimierung basierend auf Nutzerdaten</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-900">❌ Don'ts</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Zu viel auf einmal:</strong> Nicht 20 Use Cases parallel starten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Komplexität unterschätzen:</strong> Einfache Use Cases brauchen Wochen, nicht Tage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Training vernachlässigen:</strong> Nutzer brauchen Onboarding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Sicherheit ignorieren:</strong> Data Governance von Anfang an beachten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Set-and-forget:</strong> Agents brauchen kontinuierliche Pflege</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-300 p-6 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-3">🎯 Pro-Tipps für fortgeschrittene Entwickler</h4>
            <div className="space-y-3 text-sm text-gray-800">
              <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                <strong className="text-indigo-900">Nutzen Sie Adaptive Cards:</strong>
                <p className="mt-1">Rich, interaktive UIs statt Text-only Responses. Buttons, Forms, Images machen Agents intuitiver.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                <strong className="text-purple-900">Implementieren Sie Sentiment Analysis:</strong>
                <p className="mt-1">Erkennen Sie frustrierte Nutzer früh und eskalieren Sie proaktiv an menschliche Agents.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500">
                <strong className="text-pink-900">Multi-Language Support:</strong>
                <p className="mt-1">Für globale Unternehmen: Nutzen Sie Azure Translator für automatische Übersetzungen in 100+ Sprachen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sicherheit & Governance */}
        <section id="sicherheit-governance" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Sicherheit & Governance</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Enterprise-Grade Sicherheit und Governance sind entscheidend für den erfolgreichen Einsatz von Copilot Agents.
          </p>

          <div className="space-y-6 mb-6">
            <div className="bg-white border-l-4 border-green-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">🔐 Authentifizierung & Autorisierung</h3>
              <p className="text-gray-700 text-sm mb-2">
                Agents nutzen Azure AD/Entra ID für Single Sign-On. Sie können granulare Berechtigungen definieren: Welche Nutzer/Gruppen dürfen welche Agents verwenden? Role-Based Access Control (RBAC) ermöglicht feingranulare Zugriffssteuerung.
              </p>
              <div className="bg-green-50 p-3 rounded text-xs text-gray-700">
                <strong>Beispiel:</strong> HR-Agent nur für HR-Abteilung, Finance-Agent nur für Finance + Executives.
              </div>
            </div>

            <div className="bg-white border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">🛡️ Data Loss Prevention (DLP)</h3>
              <p className="text-gray-700 text-sm mb-2">
                Microsoft 365 DLP Policies gelten auch für Copilot Agents. Sie können verhindern, dass Agents sensible Daten (Kreditkarten, SSN, etc.) verarbeiten oder weitergeben. Administrators können DLP-Regeln im Compliance Center definieren.
              </p>
              <div className="bg-blue-50 p-3 rounded text-xs text-gray-700">
                <strong>Beispiel:</strong> Agent blockiert automatisch Anfragen, die Kreditkartennummern enthalten.
              </div>
            </div>

            <div className="bg-white border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">📊 Audit & Compliance</h3>
              <p className="text-gray-700 text-sm mb-2">
                Alle Agent-Interaktionen werden geloggt und können im Microsoft 365 Compliance Center eingesehen werden. Audit Logs enthalten: Wer hat wann mit welchem Agent interagiert, welche Daten wurden abgerufen, welche Actions wurden ausgeführt.
              </p>
              <div className="bg-purple-50 p-3 rounded text-xs text-gray-700">
                <strong>Compliance:</strong> SOC 2, ISO 27001, HIPAA, GDPR/DSGVO ready.
              </div>
            </div>

            <div className="bg-white border-l-4 border-red-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">🔒 Datenverschlüsselung</h3>
              <p className="text-gray-700 text-sm mb-2">
                Alle Daten werden verschlüsselt: In Transit (TLS 1.2+) und At Rest (AES-256). Verschlüsselungsschlüssel werden von Microsoft verwaltet. Für höchste Sicherheitsanforderungen können Sie Customer Managed Keys (CMK) nutzen.
              </p>
              <div className="bg-red-50 p-3 rounded text-xs text-gray-700">
                <strong>Wichtig:</strong> Daten verlassen nie Ihre Microsoft Cloud-Region (EU, US, etc.).
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-400 p-6 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">⚖️ Governance Framework</h4>
            <p className="text-gray-800 text-sm mb-3">
              Etablieren Sie ein Agent Governance Framework für Ihre Organisation:
            </p>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>• <strong>Approval Process:</strong> Neue Agents müssen von Security/Legal genehmigt werden</li>
              <li>• <strong>Testing Standards:</strong> Alle Agents durchlaufen Security & Quality Tests</li>
              <li>• <strong>Documentation:</strong> Jeder Agent hat Dokumentation (Purpose, Data Sources, Actions)</li>
              <li>• <strong>Lifecycle Management:</strong> Regelmäßige Reviews, Updates, Decommissioning alter Agents</li>
              <li>• <strong>Incident Response:</strong> Prozess für Security-Incidents (Agent Compromise, Data Leaks)</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Häufig gestellte Fragen</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Was ist ein Copilot Agent?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ein Copilot Agent ist ein spezialisierter KI-Assistent, der für spezifische Aufgaben und Workflows in Ihrem Unternehmen entwickelt wurde. Während Microsoft 365 Copilot ein allgemeiner Assistent ist, sind Agents auf bestimmte Anwendungsfälle zugeschnitten – z.B. ein HR-Agent für Urlaubsanfragen oder ein IT-Agent für Support-Tickets. Agents können mit Ihren Geschäftsdaten, APIs und Systemen verbunden werden.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Brauche ich Programmierkenntnisse für Copilot Agents?</h3>
              <p className="text-gray-700 leading-relaxed">
                Nein, grundlegende Agents können Sie in Copilot Studio mit Low-Code/No-Code-Tools erstellen. Die visuelle Entwicklungsumgebung ermöglicht es Business-Anwendern, einfache Agents mit Drag-and-Drop zu bauen. Für komplexere Agents mit Custom Code, API-Integrationen oder erweiterten Workflows sind jedoch Kenntnisse in Power Automate, Power Apps und TypeScript/JavaScript hilfreich.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Was kostet Copilot Studio?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot Studio ist in der Microsoft 365 Copilot Lizenz (30 USD/Nutzer/Monat) enthalten. Zusätzliche Kosten können entstehen durch: Power Platform Add-ons für erweiterte Kapazitäten, Premium Connectoren für Drittanbieter-APIs (ab 5 USD/Nutzer/Monat), und AI Builder Credits für erweiterte KI-Funktionen. Für Enterprise-Kunden gibt es spezielle Volumenlizenzierungen.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Wie unterscheiden sich Copilot Agents von Power Virtual Agents?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot Agents sind die Weiterentwicklung von Power Virtual Agents. Während Power Virtual Agents primär für Chatbots konzipiert waren, integrieren Copilot Agents moderne LLM-Technologie, nahtlose Microsoft 365-Integration und erweiterte Reasoning-Fähigkeiten. Bestehende Power Virtual Agents können zu Copilot Agents migriert werden. Die Entwicklung erfolgt weiterhin in Copilot Studio (ehemals Power Virtual Agents Studio).
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kann ich Agents für externe Kunden erstellen?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, Copilot Agents können sowohl intern als auch extern eingesetzt werden. Sie können Agents auf Ihrer Website einbinden, in Kundenportalen integrieren oder als eigenständige Chat-Anwendungen bereitstellen. Beachten Sie jedoch Lizenzanforderungen: Externe Nutzer benötigen entweder Power Apps per app/per user Lizenzen oder Sie nutzen Azure-basierte Skalierung für anonyme Zugriffe.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Wie sichere ich Copilot Agents ab?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot Agents unterstützen mehrere Sicherheitsebenen: Azure AD/Entra ID Authentifizierung für Nutzerzugriff, Data Loss Prevention (DLP) Policies zur Kontrolle von Datenflüssen, Row-Level Security (RLS) für datenbankbasierte Zugriffe, API-Gateways für Backend-Verbindungen, und Audit-Logging für Compliance. IT-Administratoren können Agent-Berechtigungen granular über das Microsoft 365 Admin Center steuern.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kann ich mehrere Agents kombinieren?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, Sie können Agent Orchestration nutzen, um mehrere Agents zu kombinieren. Ein Master-Agent kann Anfragen an spezialisierte Sub-Agents weiterleiten. Beispiel: Ein 'Unternehmens-Agent' routet HR-Fragen an den HR-Agent, IT-Fragen an den IT-Agent und Finanzfragen an den Finance-Agent. Dies ermöglicht modulare Architekturen und bessere Wartbarkeit.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Wie messe ich den Erfolg meiner Agents?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot Studio bietet umfangreiche Analytics: Nutzungsmetriken (Anzahl Konversationen, aktive Nutzer), Performance-Metriken (Response Time, Success Rate), Engagement-Metriken (durchschnittliche Konversationslänge, Wiederkehrrate), und Business-Metriken (gelöste Anfragen, Eskalationsrate). Sie können auch Custom Events tracken und Daten in Power BI visualisieren für erweiterte Analysen.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Bereit, Ihre ersten Copilot Agents zu erstellen?</h2>
          <p className="text-lg mb-6">
            Lassen Sie uns gemeinsam herausfinden, welche Use Cases für Ihr Unternehmen den größten Impact haben.
          </p>
          <a
            href="mailto:info@copilotenschule.de"
            className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Jetzt Workshop buchen
          </a>
        </section>
      </ContentLayout>
    </>
  );
};

export default MicrosoftCopilotAgentsGuide;
