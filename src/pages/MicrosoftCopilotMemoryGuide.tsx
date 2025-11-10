import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";

const MicrosoftCopilotMemoryGuide = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "was-ist-memory", title: "Was ist Copilot Memory?", level: 2 },
    { id: "wie-funktioniert-memory", title: "Wie funktioniert Memory technisch?", level: 2 },
    { id: "memory-aktivieren", title: "Memory aktivieren und nutzen", level: 2 },
    { id: "custom-instructions", title: "Custom Instructions erstellen", level: 2 },
    { id: "personalisierungsstrategien", title: "Personalisierungsstrategien für Teams", level: 2 },
    { id: "datenschutz-sicherheit", title: "Datenschutz & Sicherheit", level: 2 },
    { id: "best-practices", title: "Best Practices für Memory-Nutzung", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Microsoft Copilot Memory & Personalisierung - Der komplette Guide",
    "description": "Alles über Microsoft Copilot Memory: Wie Sie Copilot personalisieren, Custom Instructions nutzen und Memory-Features optimal für Ihr Team einsetzen.",
    "author": getAuthorSchemaMarkup(author),
    "datePublished": "2025-11-20",
    "dateModified": "2025-11-20",
    "keywords": [
      "Microsoft Copilot Memory",
      "Copilot personalisieren",
      "Custom Instructions Copilot",
      "Copilot Memory aktivieren",
      "Microsoft 365 Personalisierung",
      "Copilot Datenschutz"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie aktiviere ich Copilot Memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot Memory wird automatisch für alle Microsoft 365 Copilot-Nutzer aktiviert. Sie können Memory in den Einstellungen des Copilot-Chats verwalten, indem Sie auf Ihr Profilbild klicken und 'Einstellungen' wählen. Dort finden Sie die Option 'Memory verwalten', wo Sie gespeicherte Informationen einsehen und löschen können."
        }
      },
      {
        "@type": "Question",
        "name": "Was speichert Copilot Memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot Memory speichert Informationen aus Ihren Konversationen, wie Ihre Rolle, Projekte, Präferenzen und häufig genutzte Workflows. Die Daten werden verschlüsselt in Ihrem Microsoft 365-Tenant gespeichert und bleiben unter Ihrer organisatorischen Kontrolle. Copilot speichert nur Informationen, die für zukünftige Interaktionen relevant sind."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich Copilot Memory deaktivieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Sie können Copilot Memory jederzeit deaktivieren. Gehen Sie in die Copilot-Einstellungen und wählen Sie 'Memory verwalten'. Dort können Sie entweder einzelne gespeicherte Informationen löschen oder die gesamte Memory-Funktion deaktivieren. IT-Administratoren können Memory auch organisationsweit über das Microsoft 365 Admin Center steuern."
        }
      },
      {
        "@type": "Question",
        "name": "Was sind Custom Instructions in Copilot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Custom Instructions sind benutzerdefinierte Anweisungen, die Copilot bei jeder Interaktion berücksichtigt. Sie können Ihren Arbeitsstil, bevorzugte Formate, Kommunikationspräferenzen und spezifische Anforderungen hinterlegen. Beispiele: 'Nutze immer formelle Sprache', 'Erstelle Excel-Tabellen mit Pivot-Funktionen' oder 'Berücksichtige DSGVO-Anforderungen in allen Vorschlägen'."
        }
      },
      {
        "@type": "Question",
        "name": "Sind meine Memory-Daten sicher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, alle Memory-Daten werden verschlüsselt in Ihrem Microsoft 365-Tenant gespeichert und unterliegen denselben Sicherheits- und Compliance-Standards wie Ihre anderen Microsoft 365-Daten. Die Daten verlassen nie Ihren Tenant, werden nicht für Modell-Training verwendet und können jederzeit von Ihnen oder Ihrem IT-Administrator gelöscht werden."
        }
      },
      {
        "@type": "Question",
        "name": "Wie unterscheidet sich Memory von Chat-Verlauf?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Chat-Verlauf speichert komplette Konversationen chronologisch. Memory hingegen extrahiert wichtige Informationen aus allen Ihren Interaktionen und speichert sie als strukturierte Fakten. Während der Chat-Verlauf nach 90 Tagen gelöscht werden kann, bleiben Memory-Informationen dauerhaft erhalten, bis Sie sie manuell löschen. Memory ermöglicht Copilot, kontextübergreifend auf Ihre Präferenzen zuzugreifen."
        }
      },
      {
        "@type": "Question",
        "name": "Kann mein Team gemeinsame Memory-Einstellungen nutzen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Derzeit ist Copilot Memory primär für individuelle Nutzer konzipiert. Für teamweite Standards empfehlen wir die Nutzung von Organizational Messages oder SharePoint-basierte Wissensdatenbanken, auf die Copilot zugreifen kann. IT-Administratoren können auch unternehmensweite Policies definieren, die für alle Copilot-Instanzen gelten."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft aktualisiert Copilot meine Memory-Daten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot aktualisiert Memory-Daten kontinuierlich während Ihrer Interaktionen. Wenn Sie neue Präferenzen äußern oder Ihre Rolle sich ändert, wird diese Information automatisch in Memory aufgenommen. Sie müssen nichts manuell aktualisieren – Copilot lernt durch Ihre regelmäßige Nutzung und passt sich an."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Microsoft Copilot Memory & Personalisierung Guide | Copilotenschule"
        description="Alles über Microsoft Copilot Memory: Wie Sie Copilot personalisieren, Custom Instructions nutzen und Memory-Features optimal für Ihr Team einsetzen."
        keywords={[
          "Microsoft Copilot Memory",
          "Copilot personalisieren",
          "Custom Instructions Copilot",
          "Copilot Memory aktivieren",
          "Microsoft 365 Personalisierung",
          "Copilot Datenschutz"
        ]}
        canonicalUrl="https://copilotenschule.de/wissen/microsoft-copilot-memory-guide"
        schema={[articleSchema, faqSchema]}
        publishedTime="2025-11-20"
        modifiedTime="2025-11-20"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft Copilot Memory Guide", href: "/wissen/microsoft-copilot-memory-guide" }
        ]}
        title="Microsoft Copilot Memory & Personalisierung - Der komplette Guide"
        description="Lernen Sie, wie Sie Microsoft Copilot Memory nutzen, Custom Instructions erstellen und Copilot optimal auf Ihre Arbeitsweise personalisieren."
        tableOfContents={tableOfContents}
        author={author}
        publishDate="2025-11-20"
        readTime="8 Minuten"
      >
        {/* Einleitung */}
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Microsoft Copilot Memory ist eine der leistungsstärksten Funktionen von Microsoft 365 Copilot. Sie ermöglicht es dem KI-Assistenten, sich Ihre Präferenzen, Arbeitsstile und häufig genutzte Workflows zu merken – und diese Informationen automatisch in zukünftigen Interaktionen zu berücksichtigen. Das Ergebnis: Copilot wird mit jeder Nutzung persönlicher und liefert bessere, kontextrelevantere Antworten.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            In diesem Guide erfahren Sie alles über Copilot Memory, Custom Instructions und Personalisierungsstrategien für Einzelnutzer und Teams.
          </p>
        </section>

        {/* Was ist Copilot Memory? */}
        <section id="was-ist-memory" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Was ist Copilot Memory?</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Copilot Memory ist ein Feature, das wichtige Informationen aus Ihren Konversationen speichert und sie für zukünftige Interaktionen verfügbar macht. Anders als der einfache Chat-Verlauf, der chronologisch alle Nachrichten speichert, extrahiert Memory gezielt relevante Fakten und Präferenzen.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Was Copilot sich merkt:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-blue-600">•</span>
                <span><strong>Ihre Rolle und Verantwortlichkeiten:</strong> "Ich bin Projektmanager für IT-Implementierungen"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600">•</span>
                <span><strong>Aktuelle Projekte:</strong> "Ich arbeite an der Copilot-Einführung für 500 Mitarbeiter"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600">•</span>
                <span><strong>Präferenzen:</strong> "Erstelle immer Zusammenfassungen mit Bullet Points"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600">•</span>
                <span><strong>Workflow-Anforderungen:</strong> "Berücksichtige DSGVO-Compliance in allen Vorschlägen"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-600">•</span>
                <span><strong>Kommunikationsstil:</strong> "Nutze formelle Sprache für Kundenkommunikation"</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Diese Informationen werden nicht nur gespeichert, sondern aktiv genutzt. Wenn Sie Copilot das nächste Mal um Hilfe bitten, berücksichtigt er automatisch Ihre gespeicherten Präferenzen – ohne dass Sie diese erneut erwähnen müssen.
          </p>

          <div className="bg-green-50 border border-green-200 p-5 rounded-lg mb-6">
            <h4 className="font-semibold text-green-900 mb-2">💡 Praxis-Beispiel</h4>
            <p className="text-gray-800 text-sm">
              Nach einigen Wochen Nutzung weiß Copilot: Sie bevorzugen Excel-Tabellen mit Pivot-Funktionen, arbeiten im Gesundheitswesen (DSGVO-relevant) und benötigen immer eine Management Summary. Bei der nächsten Anfrage "Erstelle eine Analyse unserer Quartalszahlen" berücksichtigt Copilot all diese Punkte automatisch – ohne extra Prompt.
            </p>
          </div>
        </section>

        {/* Wie funktioniert Memory technisch? */}
        <section id="wie-funktioniert-memory" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Wie funktioniert Memory technisch?</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Copilot Memory basiert auf fortschrittlichen NLP-Techniken (Natural Language Processing), die aus Ihren Konversationen strukturierte Informationen extrahieren.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">🔍 Extraktion</h3>
              <p className="text-gray-700 text-sm">
                Während Sie mit Copilot chatten, analysiert das System Ihre Nachrichten auf relevante Fakten. Aussagen wie "Ich arbeite im Marketing" oder "Nutze immer Diagramme" werden als Memory-würdig erkannt.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">💾 Speicherung</h3>
              <p className="text-gray-700 text-sm">
                Extrahierte Informationen werden verschlüsselt in Ihrem Microsoft 365-Tenant gespeichert. Die Daten bleiben unter Ihrer organisatorischen Kontrolle und werden nie für Modell-Training verwendet.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">🔄 Retrieval</h3>
              <p className="text-gray-700 text-sm">
                Bei jeder neuen Anfrage ruft Copilot relevante Memory-Informationen ab und integriert sie in den Kontext. So erhält das Sprachmodell zusätzliche Informationen, die die Antwortqualität verbessern.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">🎯 Kontext-Anreicherung</h3>
              <p className="text-gray-700 text-sm">
                Die Memory-Daten werden mit Ihrer aktuellen Anfrage kombiniert, sodass Copilot personalisierte, kontextbezogene Antworten liefern kann, ohne dass Sie jedes Mal alle Details wiederholen müssen.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-5 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">🔐 Wichtig zu wissen</h4>
            <p className="text-gray-800 text-sm mb-2">
              Ihre Memory-Daten werden ausschließlich zur Verbesserung Ihrer persönlichen Copilot-Erfahrung verwendet. Sie werden:
            </p>
            <ul className="text-sm text-gray-800 space-y-1 ml-4">
              <li>• Nicht mit anderen Nutzern geteilt</li>
              <li>• Nicht für das Training von KI-Modellen verwendet</li>
              <li>• Nicht außerhalb Ihres Microsoft 365-Tenants gespeichert</li>
              <li>• Jederzeit von Ihnen löschbar</li>
            </ul>
          </div>
        </section>

        {/* Memory aktivieren und nutzen */}
        <section id="memory-aktivieren" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Memory aktivieren und nutzen</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Copilot Memory ist standardmäßig für alle Microsoft 365 Copilot-Nutzer aktiviert. Sie können die Funktion jedoch anpassen und verwalten.
          </p>

          <div className="bg-white border-2 border-indigo-200 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">📋 Schritt-für-Schritt: Memory verwalten</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-900">Copilot öffnen</p>
                  <p className="text-gray-700 text-sm">Öffnen Sie Microsoft 365 Copilot über copilot.microsoft.com oder die Copilot-App in Teams.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-900">Einstellungen aufrufen</p>
                  <p className="text-gray-700 text-sm">Klicken Sie auf Ihr Profilbild (rechts oben) und wählen Sie "Einstellungen".</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-900">Memory verwalten</p>
                  <p className="text-gray-700 text-sm">Wählen Sie "Memory verwalten" aus dem Menü. Hier sehen Sie alle gespeicherten Informationen.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-gray-900">Informationen bearbeiten/löschen</p>
                  <p className="text-gray-700 text-sm">Sie können einzelne Memory-Einträge löschen oder die gesamte Memory-Funktion deaktivieren.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Memory aktiv trainieren</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Um Copilot schneller an Ihre Bedürfnisse anzupassen, können Sie Memory aktiv "trainieren":
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-purple-900 mb-3">💬 Beispiel-Prompts zum Memory-Training:</h4>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                <p className="text-sm text-gray-800 font-mono">
                  "Merke dir: Ich bin Teamleiter im Customer Success und verantwortlich für 15 Enterprise-Kunden."
                </p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                <p className="text-sm text-gray-800 font-mono">
                  "Bitte erstelle zukünftig alle Präsentationen im Corporate Design mit maximal 10 Folien."
                </p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                <p className="text-sm text-gray-800 font-mono">
                  "Wichtig: Alle Dokumente müssen DSGVO-konform sein. Berücksichtige das bei allen Vorschlägen."
                </p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                <p className="text-sm text-gray-800 font-mono">
                  "Meine bevorzugte Arbeitsweise: Erst Bullet Points zur Struktur, dann Ausformulierung."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Instructions */}
        <section id="custom-instructions" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Custom Instructions erstellen</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Custom Instructions sind vordefinierte Anweisungen, die Copilot bei jeder Interaktion automatisch berücksichtigt. Sie funktionieren wie "Regeln", die Copilot immer befolgt – auch wenn Sie sie nicht explizit in Ihren Prompts erwähnen.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-6">
            <h4 className="font-semibold text-amber-900 mb-2">💡 Unterschied: Memory vs. Custom Instructions</h4>
            <div className="text-sm text-gray-800 space-y-2">
              <p><strong>Memory:</strong> Lernt automatisch aus Ihren Konversationen und speichert relevante Fakten.</p>
              <p><strong>Custom Instructions:</strong> Von Ihnen explizit definierte Regeln, die Copilot immer befolgen soll.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Beispiele für effektive Custom Instructions</h3>

          <div className="space-y-6 mb-6">
            <div className="border-2 border-blue-200 bg-blue-50 p-5 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">Für Projektmanager</h4>
              <div className="bg-white p-4 rounded text-sm font-mono text-gray-800">
                "Erstelle alle Projektpläne mit diesen Elementen: Ziele, Meilensteine, Risiken, Ressourcenplan. Nutze immer Gantt-Diagramme für Zeitpläne. Berücksichtige 20% Buffer für unvorhergesehene Verzögerungen."
              </div>
            </div>

            <div className="border-2 border-green-200 bg-green-50 p-5 rounded-lg">
              <h4 className="font-bold text-green-900 mb-2">Für Vertriebsmitarbeiter</h4>
              <div className="bg-white p-4 rounded text-sm font-mono text-gray-800">
                "Alle Kundenkommunikation sollte lösungsorientiert, positiv und auf Value Selling fokussiert sein. Erstelle immer ROI-Berechnungen für Angebote über 10.000 EUR. Nutze Customer Success Stories wo möglich."
              </div>
            </div>

            <div className="border-2 border-purple-200 bg-purple-50 p-5 rounded-lg">
              <h4 className="font-bold text-purple-900 mb-2">Für Entwickler</h4>
              <div className="bg-white p-4 rounded text-sm font-mono text-gray-800">
                "Code sollte TypeScript mit strikten Typen verwenden. Schreibe immer Unit Tests für neue Funktionen. Dokumentiere komplexe Funktionen mit JSDoc. Folge Clean Code Prinzipien und SOLID-Design Patterns."
              </div>
            </div>

            <div className="border-2 border-red-200 bg-red-50 p-5 rounded-lg">
              <h4 className="font-bold text-red-900 mb-2">Für Compliance-Teams</h4>
              <div className="bg-white p-4 rounded text-sm font-mono text-gray-800">
                "Alle Dokumente müssen DSGVO-konform sein. Prüfe automatisch auf personenbezogene Daten. Füge Disclaimer für externe Kommunikation hinzu. Vermeide Formulierungen, die rechtliche Zusagen implizieren."
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">✅ Best Practices für Custom Instructions</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Spezifisch sein:</strong> "Nutze formelle Sprache" statt "Sei professionell"</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Messbare Kriterien:</strong> "Max. 10 Folien" statt "Kurze Präsentation"</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Prioritäten setzen:</strong> "Wichtigste Anforderung: DSGVO-Compliance"</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Regelmäßig überprüfen:</strong> Instructions alle 3 Monate aktualisieren</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Personalisierungsstrategien für Teams */}
        <section id="personalisierungsstrategien" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Personalisierungsstrategien für Teams</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Während Memory primär für Einzelnutzer konzipiert ist, können Teams durch koordinierte Strategien eine konsistente Copilot-Nutzung etablieren.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border-2 border-blue-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">🎯 Team-Standard Instructions</h3>
              <p className="text-gray-700 text-sm mb-3">
                Erstellen Sie ein gemeinsames Dokument mit empfohlenen Custom Instructions für verschiedene Rollen in Ihrem Unternehmen.
              </p>
              <div className="bg-blue-50 p-3 rounded text-xs">
                <strong>Beispiel:</strong> Alle Marketing-Mitarbeiter nutzen dieselben Brand Guidelines in ihren Instructions.
              </div>
            </div>

            <div className="bg-white border-2 border-green-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-900">📚 Knowledge Base Integration</h3>
              <p className="text-gray-700 text-sm mb-3">
                Speichern Sie teamrelevante Informationen in SharePoint. Copilot kann darauf zugreifen und benötigt weniger individuelle Memory-Daten.
              </p>
              <div className="bg-green-50 p-3 rounded text-xs">
                <strong>Beispiel:</strong> Produktinformationen, FAQs, Prozessdokumentationen zentral ablegen.
              </div>
            </div>

            <div className="bg-white border-2 border-purple-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">🔧 Admin-Policies</h3>
              <p className="text-gray-700 text-sm mb-3">
                IT-Administratoren können organisationsweite Policies definieren, die für alle Copilot-Instanzen gelten.
              </p>
              <div className="bg-purple-50 p-3 rounded text-xs">
                <strong>Beispiel:</strong> Automatische Compliance-Checks, Data Loss Prevention Rules.
              </div>
            </div>

            <div className="bg-white border-2 border-orange-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-900">🎓 Onboarding-Templates</h3>
              <p className="text-gray-700 text-sm mb-3">
                Neue Mitarbeiter erhalten Template-Instructions für ihren Einstieg, die sie individuell anpassen können.
              </p>
              <div className="bg-orange-50 p-3 rounded text-xs">
                <strong>Beispiel:</strong> "Sales Starter Kit" mit Instructions für CRM, Angebotserstellung, etc.
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-3">💼 Praxis-Tipp: Copilot Champions Programm</h4>
            <p className="text-gray-700 text-sm mb-3">
              Etablieren Sie "Copilot Champions" in verschiedenen Abteilungen, die:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Best Practices für ihre Abteilung entwickeln</li>
              <li>• Template Instructions erstellen und pflegen</li>
              <li>• Kollegen bei der Memory-Optimierung unterstützen</li>
              <li>• Feedback an IT und Management weitergeben</li>
            </ul>
          </div>
        </section>

        {/* Datenschutz & Sicherheit */}
        <section id="datenschutz-sicherheit" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Datenschutz & Sicherheit</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Datenschutz und Sicherheit haben bei Copilot Memory höchste Priorität. Microsoft implementiert mehrere Sicherheitsebenen, um Ihre Daten zu schützen.
          </p>

          <div className="space-y-6 mb-6">
            <div className="bg-white border-l-4 border-green-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">🔒 Verschlüsselung</h3>
              <p className="text-gray-700 text-sm">
                Alle Memory-Daten werden sowohl bei der Übertragung (TLS 1.2+) als auch im Ruhezustand (AES-256) verschlüsselt. Die Verschlüsselungsschlüssel werden von Microsoft verwaltet und regelmäßig rotiert.
              </p>
            </div>

            <div className="bg-white border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">🏢 Tenant-Isolation</h3>
              <p className="text-gray-700 text-sm">
                Ihre Memory-Daten bleiben ausschließlich in Ihrem Microsoft 365-Tenant. Sie werden nicht mit anderen Organisationen geteilt und können nicht von Microsoft für andere Zwecke verwendet werden.
              </p>
            </div>

            <div className="bg-white border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">🚫 Kein Modell-Training</h3>
              <p className="text-gray-700 text-sm">
                Microsoft nutzt Ihre Memory-Daten nicht zum Training von KI-Modellen. Die Daten dienen ausschließlich der Verbesserung Ihrer persönlichen Copilot-Erfahrung.
              </p>
            </div>

            <div className="bg-white border-l-4 border-red-500 p-5 rounded-r-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">🗑️ Löschrechte</h3>
              <p className="text-gray-700 text-sm">
                Sie können jederzeit einzelne Memory-Einträge oder Ihre gesamte Memory-Historie löschen. Die Löschung ist sofort wirksam und kann nicht rückgängig gemacht werden.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-yellow-900 mb-3">⚠️ DSGVO-Compliance</h4>
            <p className="text-gray-800 text-sm mb-3">
              Copilot Memory ist vollständig DSGVO-konform. Als Microsoft 365-Nutzer haben Sie volle Kontrolle über Ihre Daten:
            </p>
            <ul className="text-sm text-gray-800 space-y-1">
              <li>• <strong>Recht auf Auskunft:</strong> Sehen Sie alle gespeicherten Memory-Daten ein</li>
              <li>• <strong>Recht auf Löschung:</strong> Löschen Sie Memory-Daten jederzeit</li>
              <li>• <strong>Recht auf Datenportabilität:</strong> Exportieren Sie Ihre Memory-Daten</li>
              <li>• <strong>Recht auf Widerspruch:</strong> Deaktivieren Sie Memory komplett</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">🛡️ Admin-Kontrollen für IT-Teams</h4>
            <p className="text-gray-700 text-sm mb-3">
              IT-Administratoren können Memory organisationsweit steuern:
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Memory für bestimmte Nutzergruppen deaktivieren</li>
              <li>• Data Loss Prevention (DLP) Policies auf Memory-Daten anwenden</li>
              <li>• Audit-Logs für Memory-Aktivitäten einsehen</li>
              <li>• Aufbewahrungsfristen für Memory-Daten definieren</li>
            </ul>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Best Practices für Memory-Nutzung</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Um das Maximum aus Copilot Memory herauszuholen, befolgen Sie diese bewährten Strategien:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-900">✅ Do's</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Explizit sein:</strong> "Merke dir, dass ich..." verwenden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Regelmäßig reviewen:</strong> Memory alle 4 Wochen prüfen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Präzise Präferenzen:</strong> Konkrete statt vage Anweisungen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Kontext geben:</strong> "Für Kundenmeetings nutze immer..."</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Updates mitteilen:</strong> "Meine Rolle hat sich geändert..."</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-900">❌ Don'ts</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Zu viel auf einmal:</strong> Keine 20 Instructions gleichzeitig</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Widersprüchliche Regeln:</strong> "Sei kurz" + "Sei ausführlich"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Sensible Daten:</strong> Keine Passwörter/Credentials speichern</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Memory vergessen:</strong> Veraltete Instructions löschen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span><strong>Blind vertrauen:</strong> Memory-Outputs immer prüfen</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-lg border-2 border-indigo-200 mb-6">
            <h4 className="font-semibold text-indigo-900 mb-3">🚀 Power-User Tipps</h4>
            <div className="space-y-3 text-sm text-gray-800">
              <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-400">
                <strong className="text-indigo-900">Kontextwechsel markieren:</strong>
                <p className="mt-1">"Für private Projekte nutze lockere Sprache, für Kundenprojekte formell" – Copilot lernt, zwischen Kontexten zu unterscheiden.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
                <strong className="text-purple-900">Workflow-Templates:</strong>
                <p className="mt-1">"Wenn ich sage 'Wochenreport', erstelle: Executive Summary (3 Bullets), Erfolge, Challenges, Next Steps" – spart Zeit.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-pink-400">
                <strong className="text-pink-900">Feedback-Loop:</strong>
                <p className="mt-1">Nach jeder größeren Nutzung: "Was hast du über meine Präferenzen gelernt?" – so sehen Sie, was Memory gespeichert hat.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-300 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">📊 Erfolg messen</h4>
            <p className="text-gray-700 text-sm mb-3">
              So erkennen Sie, ob Memory effektiv arbeitet:
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Weniger Nachfragen:</strong> Copilot versteht Ihre Anfragen schneller</li>
              <li>• <strong>Bessere erste Antworten:</strong> Weniger Iterationen nötig</li>
              <li>• <strong>Konsistente Outputs:</strong> Stil und Format passen ohne extra Prompts</li>
              <li>• <strong>Zeitersparnis:</strong> Sie müssen Kontext nicht mehr wiederholen</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Häufig gestellte Fragen</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Wie aktiviere ich Copilot Memory?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot Memory wird automatisch für alle Microsoft 365 Copilot-Nutzer aktiviert. Sie können Memory in den Einstellungen des Copilot-Chats verwalten, indem Sie auf Ihr Profilbild klicken und "Einstellungen" wählen. Dort finden Sie die Option "Memory verwalten", wo Sie gespeicherte Informationen einsehen und löschen können.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Was speichert Copilot Memory?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot Memory speichert Informationen aus Ihren Konversationen, wie Ihre Rolle, Projekte, Präferenzen und häufig genutzte Workflows. Die Daten werden verschlüsselt in Ihrem Microsoft 365-Tenant gespeichert und bleiben unter Ihrer organisatorischen Kontrolle. Copilot speichert nur Informationen, die für zukünftige Interaktionen relevant sind.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kann ich Copilot Memory deaktivieren?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, Sie können Copilot Memory jederzeit deaktivieren. Gehen Sie in die Copilot-Einstellungen und wählen Sie "Memory verwalten". Dort können Sie entweder einzelne gespeicherte Informationen löschen oder die gesamte Memory-Funktion deaktivieren. IT-Administratoren können Memory auch organisationsweit über das Microsoft 365 Admin Center steuern.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Was sind Custom Instructions in Copilot?</h3>
              <p className="text-gray-700 leading-relaxed">
                Custom Instructions sind benutzerdefinierte Anweisungen, die Copilot bei jeder Interaktion berücksichtigt. Sie können Ihren Arbeitsstil, bevorzugte Formate, Kommunikationspräferenzen und spezifische Anforderungen hinterlegen. Beispiele: "Nutze immer formelle Sprache", "Erstelle Excel-Tabellen mit Pivot-Funktionen" oder "Berücksichtige DSGVO-Anforderungen in allen Vorschlägen".
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Sind meine Memory-Daten sicher?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, alle Memory-Daten werden verschlüsselt in Ihrem Microsoft 365-Tenant gespeichert und unterliegen denselben Sicherheits- und Compliance-Standards wie Ihre anderen Microsoft 365-Daten. Die Daten verlassen nie Ihren Tenant, werden nicht für Modell-Training verwendet und können jederzeit von Ihnen oder Ihrem IT-Administrator gelöscht werden.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Wie unterscheidet sich Memory vom Chat-Verlauf?</h3>
              <p className="text-gray-700 leading-relaxed">
                Der Chat-Verlauf speichert komplette Konversationen chronologisch. Memory hingegen extrahiert wichtige Informationen aus allen Ihren Interaktionen und speichert sie als strukturierte Fakten. Während der Chat-Verlauf nach 90 Tagen gelöscht werden kann, bleiben Memory-Informationen dauerhaft erhalten, bis Sie sie manuell löschen. Memory ermöglicht Copilot, kontextübergreifend auf Ihre Präferenzen zuzugreifen.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kann mein Team gemeinsame Memory-Einstellungen nutzen?</h3>
              <p className="text-gray-700 leading-relaxed">
                Derzeit ist Copilot Memory primär für individuelle Nutzer konzipiert. Für teamweite Standards empfehlen wir die Nutzung von Organizational Messages oder SharePoint-basierte Wissensdatenbanken, auf die Copilot zugreifen kann. IT-Administratoren können auch unternehmensweite Policies definieren, die für alle Copilot-Instanzen gelten.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Wie oft aktualisiert Copilot meine Memory-Daten?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot aktualisiert Memory-Daten kontinuierlich während Ihrer Interaktionen. Wenn Sie neue Präferenzen äußern oder Ihre Rolle sich ändert, wird diese Information automatisch in Memory aufgenommen. Sie müssen nichts manuell aktualisieren – Copilot lernt durch Ihre regelmäßige Nutzung und passt sich an.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Bereit, Copilot zu personalisieren?</h2>
          <p className="text-lg mb-6">
            Starten Sie noch heute mit Memory und Custom Instructions – und erleben Sie, wie Copilot mit jeder Nutzung besser wird.
          </p>
          <a
            href="mailto:info@copilotenschule.de"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Jetzt Beratung anfragen
          </a>
        </section>
      </ContentLayout>
    </>
  );
};

export default MicrosoftCopilotMemoryGuide;
