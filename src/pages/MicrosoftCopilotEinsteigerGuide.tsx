import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";

const MicrosoftCopilotEinsteigerGuide = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "was-ist-copilot", title: "Was ist Microsoft 365 Copilot?", level: 2 },
    { id: "zugang", title: "Wer kann Copilot nutzen?", level: 2 },
    { id: "erste-schritte", title: "Erste Schritte mit Copilot", level: 2 },
    { id: "chat-funktion", title: "Die Chat-Funktion meistern", level: 2 },
    { id: "prompts", title: "Effektive Prompts erstellen", level: 2 },
    { id: "dateien-zugriff", title: "Dateien in Prompts einbinden", level: 2 },
    { id: "memory", title: "Memory & Personalisierung", level: 2 },
    { id: "apps-integration", title: "Copilot in Word, Excel & PowerPoint", level: 2 },
    { id: "pages", title: "Copilot Pages nutzen", level: 2 },
    { id: "create", title: "Bilder & Grafiken erstellen", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Microsoft 365 Copilot - Der komplette Einsteiger-Guide 2025",
    "description": "Lernen Sie Microsoft 365 Copilot von Grund auf kennen. Praktischer Guide mit Schritt-für-Schritt Anleitungen, Prompting-Tipps und Best Practices für produktives Arbeiten.",
    "author": getAuthorSchemaMarkup(author),
    "datePublished": "2025-11-10",
    "dateModified": "2025-11-10",
    "keywords": ["Microsoft 365 Copilot", "Copilot Tutorial", "Microsoft Copilot Anleitung", "Copilot Prompts", "Microsoft AI"],
    "articleSection": "Microsoft 365"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Brauche ich eine zusätzliche Lizenz für Microsoft 365 Copilot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein, die grundlegenden Copilot-Funktionen sind für alle Microsoft 365 Abonnenten verfügbar - ob Business, Education oder Consumer. Für erweiterte Features wie Researcher und Analyst-Agenten benötigen Sie ein kostenpflichtiges Copilot-Add-on für ca. 30 USD pro Nutzer/Monat."
        }
      },
      {
        "@type": "Question",
        "name": "Wie greife ich auf Microsoft 365 Copilot zu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sie können Copilot über office.com (jetzt copilot.microsoft.com) im Browser, als Desktop-App oder mobile App (iOS/Android) nutzen. Melden Sie sich einfach mit Ihrem Microsoft 365 Konto an."
        }
      },
      {
        "@type": "Question",
        "name": "Werden meine Daten zum Training von KI-Modellen verwendet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein. Microsoft 365 Copilot hat Enterprise Data Protection aktiv. Ihre Daten, Prompts und Inhalte werden nicht zum Training von Large Language Models verwendet. Ihre Unternehmensdaten bleiben geschützt."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich Copilot auch ohne Microsoft 365 Apps verwenden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Copilot funktioniert auch als eigenständiger Chat-Assistent über die Web-Oberfläche. Für die Integration in Word, Excel, PowerPoint und andere Apps benötigen Sie allerdings eine Microsoft 365 Lizenz."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen Copilot und ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Microsoft Copilot basiert auf OpenAI's GPT-Technologie (Microsoft hat Milliarden in OpenAI investiert), ist aber speziell für Microsoft 365 optimiert. Copilot kann direkt auf Ihre OneDrive-Dateien zugreifen, in Office-Apps integriert werden und bietet Enterprise-Datenschutz."
        }
      },
      {
        "@type": "Question",
        "name": "Wie erstelle ich effektive Prompts für Copilot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nutzen Sie die Prompt Gallery für Vorlagen, seien Sie spezifisch statt vage, binden Sie Dateien mit '/' ein, und experimentieren Sie mit verschiedenen Formulierungen. Der Prompt Coach Agent kann Ihnen helfen, bessere Prompts zu erstellen."
        }
      },
      {
        "@type": "Question",
        "name": "Kann Copilot Bilder erstellen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Copilot kann über DALL-E Bilder generieren. Beschreiben Sie einfach, was Sie möchten (z.B. 'Erstelle ein Bild eines goldenen Retrievers auf grüner Wiese'). Sie können auch Infografiken, Poster und Banner erstellen lassen."
        }
      },
      {
        "@type": "Question",
        "name": "Was sind Copilot Pages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pages sind lebende Dokumente, die Copilot erstellt, um Informationen, Zusammenfassungen und Ideen aus Chats zu organisieren. Sie funktionieren ähnlich wie Microsoft Loop Pages und können mit anderen geteilt werden."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Dateiformate kann Copilot verarbeiten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot kann Word-Dokumente, Excel-Tabellen, PowerPoint-Präsentationen, PDFs und Textdateien aus OneDrive verarbeiten. Nutzen Sie '/' im Chat, um auf Ihre Dateien zuzugreifen."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich Copilot per Spracheingabe bedienen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Copilot unterstützt Diktierfunktionen. Klicken Sie auf das Mikrofon-Symbol und sprechen Sie Ihren Prompt. Dies funktioniert sowohl in der Web-App als auch in den Office-Anwendungen."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Microsoft 365 Copilot - Der komplette Einsteiger-Guide 2025 | Copilotenschule"
        description="Lernen Sie Microsoft 365 Copilot von Grund auf kennen. Praktischer Guide mit Schritt-für-Schritt Anleitungen, Prompting-Tipps und Best Practices für produktives Arbeiten."
        keywords={["Microsoft 365 Copilot", "Copilot Tutorial", "Microsoft Copilot Anleitung", "Copilot Prompts", "Microsoft AI", "Copilot Guide Deutsch"]}
        canonicalUrl="https://copilotenschule.de/wissen/microsoft-copilot-einsteiger-guide"
        schema={[articleSchema, faqSchema]}
        publishedTime="2025-11-10"
        modifiedTime="2025-11-10"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft 365 Copilot Guide", href: "/wissen/microsoft-copilot-einsteiger-guide" }
        ]}
        title="Microsoft 365 Copilot - Der komplette Einsteiger-Guide 2025"
        description="Von den ersten Schritten bis zur professionellen Nutzung: Alles, was Sie über Microsoft 365 Copilot wissen müssen."
        tableOfContents={tableOfContents}
        author={author}
        publishDate="2025-11-10"
        readTime="12 Minuten"
      >
        {/* Einleitung */}
        <section id="einleitung" className="mb-8">
          <p className="text-lg mb-4 leading-relaxed">
            Microsoft 365 Copilot ist Ihr KI-gestützter Arbeitsassistent, der direkt in Word, Excel, PowerPoint und alle
            Microsoft 365 Apps integriert ist. Basierend auf OpenAI's GPT-Technologie hilft Ihnen Copilot dabei,
            Dokumente zu erstellen, Daten zu analysieren, Präsentationen zu gestalten und sogar Bilder zu generieren -
            alles bei vollständigem Datenschutz für Unternehmen.
          </p>
          <p className="mb-4 leading-relaxed">
            In diesem Guide zeige ich Ihnen Schritt für Schritt, wie Sie Microsoft 365 Copilot optimal nutzen.
            Vom ersten Login bis zu fortgeschrittenen Features wie Agents und Memory-Funktionen.
          </p>
        </section>

        {/* Was ist Copilot */}
        <section id="was-ist-copilot" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Was ist Microsoft 365 Copilot?</h2>

          <p className="mb-4 leading-relaxed">
            Microsoft 365 Copilot ist ein KI-Assistent, der auf OpenAI's GPT-4 Technologie basiert.
            Microsoft hat Milliarden Dollar in OpenAI investiert und die Technologie lizenziert, um sie speziell
            für Unternehmensumgebungen zu optimieren.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Kernfunktionen auf einen Blick</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Chat-Interface:</strong> Konversationen wie mit ChatGPT, aber mit Zugriff auf Ihre Microsoft 365 Daten</li>
              <li><strong>Office-Integration:</strong> Copilot arbeitet direkt in Word, Excel, PowerPoint, Outlook und Teams</li>
              <li><strong>Dateizugriff:</strong> Kann Ihre OneDrive-Dokumente lesen, analysieren und zusammenfassen</li>
              <li><strong>Bildgenerierung:</strong> Erstellt Bilder, Grafiken und Infografiken über DALL-E Integration</li>
              <li><strong>Enterprise-Sicherheit:</strong> Ihre Daten werden nicht für KI-Training verwendet</li>
              <li><strong>Agents:</strong> Erstellen Sie eigene KI-Assistenten für spezialisierte Aufgaben</li>
            </ul>
          </div>

          <p className="mb-4 leading-relaxed">
            Der große Unterschied zu anderen KI-Tools: Copilot ist nahtlos in Ihren Arbeitsalltag integriert und
            respektiert Ihre Unternehmensdaten. Alles bleibt in der Microsoft Cloud, geschützt durch
            Enterprise Data Protection.
          </p>
        </section>

        {/* Zugang */}
        <section id="zugang" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Wer kann Microsoft 365 Copilot nutzen?</h2>

          <p className="mb-4 leading-relaxed">
            Die gute Nachricht: Microsoft 365 Copilot ist für <strong>alle Microsoft 365 Abonnenten</strong> verfügbar.
            Das umfasst:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-lg mb-2">🏢 Business</h3>
              <p className="text-sm text-gray-700">Microsoft 365 Business Basic, Standard oder Premium</p>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-lg mb-2">🎓 Education</h3>
              <p className="text-sm text-gray-700">Microsoft 365 Education (A1, A3, A5)</p>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-lg mb-2">👤 Consumer</h3>
              <p className="text-sm text-gray-700">Microsoft 365 Personal oder Family</p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">💡 Wichtig: Basis vs. Premium</h3>
            <p className="mb-3">Es gibt zwei Versionen von Copilot:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Basis (kostenlos für M365-Nutzer):</strong> Chat, Dateizugriff, Integration in Apps, Bildgenerierung, Pages</li>
              <li><strong>Premium (ca. 30 USD/Monat):</strong> Zusätzlich Researcher, Analyst, erweiterte Agents, GPT-5 Zugang</li>
            </ul>
          </div>
        </section>

        {/* Erste Schritte */}
        <section id="erste-schritte" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Erste Schritte mit Copilot</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Schritt 1: Zugang über office.com</h3>
          <p className="mb-4 leading-relaxed">
            Navigieren Sie zu <strong>office.com</strong> oder <strong>copilot.microsoft.com</strong> und melden
            Sie sich mit Ihrem Microsoft 365 Konto an. Sie werden die neue, redesignte Oberfläche sehen.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Schritt 2: Apps finden</h3>
          <p className="mb-4 leading-relaxed">
            Beim ersten Login fragen sich viele: "Wo sind Word, Excel und PowerPoint?" Die Antwort: Klicken Sie
            links in der Sidebar auf <strong>"Apps"</strong>. Hier sehen Sie alle verfügbaren Microsoft 365 Anwendungen.
          </p>

          <div className="bg-gray-50 border rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">💡 Tipp: Apps anheften</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Gehen Sie zu Apps → Word (oder eine andere App)</li>
              <li>Klicken Sie auf "Mehr Optionen" (drei Punkte)</li>
              <li>Wählen Sie "Pin" (Anheften)</li>
              <li>Die App erscheint jetzt oben in Ihrer Schnellzugriffsleiste</li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Schritt 3: Copilot installieren (Desktop & Mobile)</h3>
          <p className="mb-4 leading-relaxed">
            Die Web-Version ist praktisch, aber viele bevorzugen die Desktop-Apps. So installieren Sie sie:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Desktop-Apps:</strong> Klicken Sie oben rechts auf "Apps installieren" → wählen Sie Word, Excel, PowerPoint etc.</li>
            <li><strong>Copilot Desktop-App:</strong> Ebenfalls unter "Apps installieren" verfügbar</li>
            <li><strong>Mobile (iOS/Android):</strong> QR-Code scannen unter "Apps installieren" → Mobile Apps</li>
          </ul>
        </section>

        {/* Chat-Funktion */}
        <section id="chat-funktion" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Die Chat-Funktion meistern</h2>

          <p className="mb-4 leading-relaxed">
            Das Chat-Interface ist das Herzstück von Copilot. Hier können Sie Fragen stellen, Aufgaben delegieren
            und mit Ihren Dateien interagieren.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">GPT-Modell wählen</h3>
          <p className="mb-4 leading-relaxed">
            Oben rechts im Chat können Sie das KI-Modell auswählen. Mit einem Premium-Abo haben Sie Zugriff auf
            <strong> GPT-5</strong> (neuestes Modell). Für die meisten Aufgaben reicht GPT-4 vollkommen aus.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">🔒 Enterprise Data Protection</h3>
            <p className="text-sm">
              Achten Sie auf das Schild-Symbol oben rechts. Dies bestätigt, dass Ihre Daten, Prompts und
              Konversationen <strong>nicht zum Training von Large Language Models verwendet werden</strong>.
              Bei geschäftlicher Nutzung ist dies ein entscheidender Vorteil gegenüber ChatGPT Free.
            </p>
          </div>
        </section>

        {/* Prompts */}
        <section id="prompts" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Effektive Prompts erstellen</h2>

          <p className="mb-4 leading-relaxed">
            Ein guter Prompt ist der Schlüssel zu guten Ergebnissen. Copilot bietet Ihnen zwei Wege,
            um bessere Prompts zu erstellen:
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">1. Prompt Gallery nutzen</h3>
          <p className="mb-4 leading-relaxed">
            Klicken Sie auf <strong>"Mehr anzeigen"</strong> unter den Vorschlägen, dann auf
            <strong> "Prompt Gallery"</strong>. Hier finden Sie hunderte vorgefertigte Prompts nach Kategorien sortiert:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Produktivität & Zeitmanagement</li>
            <li>Content-Erstellung & Marketing</li>
            <li>Datenanalyse & Reporting</li>
            <li>Meeting-Zusammenfassungen</li>
            <li>E-Mail-Entwürfe</li>
          </ul>

          <div className="bg-blue-50 border rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">📝 Beispiel aus der Prompt Gallery</h4>
            <p className="text-sm mb-2"><strong>Vorlage:</strong> "Fasse die wichtigsten Punkte aus [Datei] zusammen"</p>
            <p className="text-sm">
              Sie müssen nur noch [Datei] durch Ihre eigene Datei ersetzen (mit '/' auswählen).
              Das spart Zeit und gibt Ihnen eine Vorlage für gut strukturierte Prompts.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">2. Prompt Coach Agent nutzen</h3>
          <p className="mb-4 leading-relaxed">
            Der Prompt Coach ist ein spezialisierter Agent, der Ihnen hilft, bessere Prompts zu schreiben.
            Aktivieren Sie ihn unter <strong>Agents → Explore Agents → Prompt Coach</strong>.
          </p>
        </section>

        {/* Dateien */}
        <section id="dateien-zugriff" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Dateien in Prompts einbinden</h2>

          <p className="mb-4 leading-relaxed">
            Einer der größten Vorteile von Copilot: Der direkte Zugriff auf Ihre OneDrive-Dateien.
            So funktioniert es:
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Methode 1: Forward Slash (/)</h3>
          <div className="bg-gray-50 border rounded-lg p-6 mb-6">
            <ol className="list-decimal list-inside space-y-3">
              <li>Beginnen Sie Ihren Prompt zu tippen</li>
              <li>Drücken Sie <strong>/</strong> (Forward Slash)</li>
              <li>Es öffnet sich eine Liste Ihrer OneDrive-Dateien</li>
              <li>Suchen Sie die gewünschte Datei (Suchfunktion vorhanden)</li>
              <li>Wählen Sie die Datei aus → sie wird in den Prompt eingefügt</li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Methode 2: Upload</h3>
          <p className="mb-4 leading-relaxed">
            Klicken Sie auf das <strong>Büroklammer-Symbol</strong> oder ziehen Sie Dateien per Drag & Drop
            in den Chat. Unterstützte Formate: Word, Excel, PowerPoint, PDF, Textdateien.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">💡 Praxis-Tipp</h3>
            <p className="text-sm">
              Sie können auch per <strong>Spracheingabe</strong> arbeiten! Klicken Sie auf das Mikrofon-Symbol
              und sprechen Sie: "Was sind die wichtigsten Punkte aus diesem PowerPoint?" - dann fügen Sie die
              Datei mit '/' hinzu.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Praktisches Beispiel</h3>
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <p className="mb-2"><strong>Prompt:</strong></p>
            <p className="text-sm bg-gray-100 p-3 rounded font-mono">
              "Erstelle einen Blogpost basierend auf /dogs-presentation.pptx"
            </p>
            <p className="text-sm mt-3">
              <strong>Ergebnis:</strong> Copilot analysiert die PowerPoint-Präsentation und erstellt einen
              vollständigen Blogpost in 20-30 Sekunden. Sie können dann iterativ verbessern ("Mache es lockerer",
              "Füge mehr Beispiele hinzu", etc.)
            </p>
          </div>
        </section>

        {/* Memory */}
        <section id="memory" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Memory & Personalisierung für effizientes Arbeiten</h2>

          <p className="mb-4 leading-relaxed">
            Copilot hat ein Gedächtnis - und das kann Ihnen massiv Zeit sparen. Statt jedes Mal Kontext
            zu erklären, lernt Copilot Ihr Business und Ihre Arbeitsweise.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Memory aktivieren und nutzen</h3>
          <p className="mb-4 leading-relaxed">
            Sagen Sie Copilot einfach, was es sich merken soll:
          </p>

          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <p className="text-sm bg-gray-100 p-3 rounded font-mono mb-3">
              "Ich manage eine kleine Hundewellness-Einrichtung namens Poochaven Spa. Wir bieten Grooming,
              Hunde-Facials und wöchentliche 'Pup & Polish' Events an, bei denen Besitzer und Haustiere
              verwöhnt werden."
            </p>
            <p className="text-sm">
              → Copilot antwortet: <strong>"Memory updated"</strong>
            </p>
          </div>

          <p className="mb-4 leading-relaxed">
            Von nun an weiß Copilot bei jedem neuen Chat Bescheid. Testen Sie es:
          </p>

          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <p className="text-sm bg-gray-100 p-3 rounded font-mono mb-3">
              "Erstelle eine kurze E-Mail für Kunden über ein neues saisonales Angebot: 20% Rabatt auf Hunde-Facials"
            </p>
            <p className="text-sm">
              → Copilot erstellt die E-Mail und nutzt automatisch "Poochaven Spa" als Absender und passt
              den Ton an Ihr Business an.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Custom Instructions für konsistente Ergebnisse</h3>
          <p className="mb-4 leading-relaxed">
            Noch mächtiger als Memory: <strong>Custom Instructions</strong>. Gehen Sie zu
            <strong> Einstellungen → Personalization → Custom Instructions</strong>.
          </p>

          <div className="bg-gray-50 border rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">Beispiel für Custom Instructions:</h4>
            <div className="text-sm bg-white p-4 rounded border font-mono mb-3">
              Ich bin Manager von Poochaven Spa, einem fröhlichen Hundegrooming & Wellness-Business.<br/><br/>

              Wir bieten:<br/>
              - Premium Grooming<br/>
              - Hunde-Facials<br/>
              - Spa-Behandlungen<br/>
              - Wöchentliche "Pup & Polish" Events<br/><br/>

              Ton: Freundlich, verspielt, mit einem Hauch von Humor.<br/>
              Beispiel-Taglines: "Where Every Pup is Pampered" | "Tails Wagging, Hearts Happy"
            </div>
            <p className="text-sm">
              Mit diesen Instructions passt Copilot <strong>automatisch jeden Output</strong> an Ihren
              Stil und Ihr Business an. Sie müssen es nie wieder erklären.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Memories verwalten</h3>
          <p className="mb-4 leading-relaxed">
            Gehen Sie zu <strong>Einstellungen → Personalization → Manage Memories</strong>. Hier sehen Sie
            alle gespeicherten Informationen und können sie bearbeiten oder löschen.
          </p>
        </section>

        {/* Apps Integration */}
        <section id="apps-integration" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Copilot in Word, Excel & PowerPoint nutzen</h2>

          <p className="mb-4 leading-relaxed">
            Das Besondere: Copilot ist direkt in Ihre Office-Apps integriert. Sie müssen nicht zur Web-App wechseln.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Copilot in Microsoft Word</h3>
          <p className="mb-4 leading-relaxed">
            Öffnen Sie Word (Desktop oder Web). In der <strong>Home</strong>-Registerkarte finden Sie rechts
            das <strong>Copilot</strong>-Symbol.
          </p>

          <div className="bg-blue-50 border rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">Was können Sie tun?</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Dokumente zusammenfassen ("Gib mir eine Liste der Hauptpunkte")</li>
              <li>Text generieren ("Schreibe eine Einleitung für diesen Bericht")</li>
              <li>Umschreiben ("Mache diesen Absatz formeller")</li>
              <li>Fragen zum Dokument stellen ("Was sind die größten Risiken in diesem Vertrag?")</li>
            </ul>
          </div>

          <p className="mb-4 leading-relaxed">
            <strong>Wichtig:</strong> Der Output erscheint nicht automatisch im Dokument. Sie müssen ihn
            mit <strong>"Add to doc"</strong> einfügen oder kopieren.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Copilot in Microsoft Excel</h3>
          <p className="mb-4 leading-relaxed">
            Excel + Copilot = Datenanalyse auf einem neuen Level. Öffnen Sie eine Excel-Datei und aktivieren
            Sie Copilot.
          </p>

          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <p className="text-sm mb-2"><strong>Beispiel-Prompt:</strong></p>
            <p className="text-sm bg-gray-100 p-3 rounded font-mono">
              "Erstelle zwei Charts, um diese Verkaufsdaten zu visualisieren"
            </p>
            <p className="text-sm mt-3">
              → Copilot analysiert Ihre Daten und erstellt z.B. ein Balkendiagramm für Verkäufe nach Region
              und ein Liniendiagramm für Trends über Zeit. Sie können die Charts als PNG herunterladen oder
              direkt in die Tabelle einfügen.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Copilot in Microsoft PowerPoint</h3>
          <p className="mb-4 leading-relaxed">
            Präsentationen erstellen war nie einfacher. Öffnen Sie PowerPoint und aktivieren Sie Copilot.
          </p>

          <div className="border-l-4 border-purple-500 pl-4 mb-6">
            <p className="text-sm mb-2"><strong>Beispiel:</strong> Bild für Folie generieren</p>
            <p className="text-sm bg-gray-100 p-3 rounded font-mono">
              "Erstelle ein Bild für diese Folie: Gummi-Entchen, fröhlicher Ausdruck, Wassertropfen"
            </p>
            <p className="text-sm mt-3">
              → In Sekunden generiert Copilot ein passendes Bild. Klicken Sie auf <strong>"Insert"</strong>,
              um es direkt in die Folie einzufügen.
            </p>
          </div>
        </section>

        {/* Pages */}
        <section id="pages" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Copilot Pages: Lebende Dokumente für Zusammenarbeit</h2>

          <p className="mb-4 leading-relaxed">
            Copilot Pages sind lebende Dokumente, die Copilot erstellt, um Informationen aus Chats zu organisieren.
            Denken Sie an sie wie eine Mischung aus Microsoft Loop und OneNote - powered by AI.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Erste Page erstellen</h3>
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li>Gehen Sie zur <strong>Pages</strong>-Ansicht in der Sidebar</li>
            <li>Klicken Sie auf <strong>"Create New Page"</strong></li>
            <li>Geben Sie einen Namen ein (z.B. "Projekt X - Action Items")</li>
            <li>Beginnen Sie zu tippen oder fügen Sie Inhalte aus Copilot-Chats hinzu</li>
          </ol>

          <div className="bg-gray-50 border rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">💡 Pages aus Chat-Konversationen</h4>
            <p className="text-sm mb-3">
              Wenn Copilot Ihnen eine gute Antwort gibt, klicken Sie unten auf
              <strong> "Add to Page"</strong>. Wählen Sie eine existierende Page oder erstellen Sie eine neue.
              So sammeln Sie alle relevanten Informationen an einem Ort.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Pages teilen</h3>
          <p className="mb-4 leading-relaxed">
            Klicken Sie auf <strong>"Share"</strong>, um:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Einen Link zur Page zu generieren</li>
            <li>Zugriff für Kollegen zu gewähren</li>
            <li>Die Page in Microsoft 365 Apps zu integrieren (Loop, Teams)</li>
          </ul>
        </section>

        {/* Create */}
        <section id="create" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Bilder, Infografiken & Grafiken erstellen</h2>

          <p className="mb-4 leading-relaxed">
            Viele übersehen das <strong>"Create"</strong>-Feature in Copilot. Dabei ist es extrem leistungsstark.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Was können Sie erstellen?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎨 Bilder</h4>
              <p className="text-sm text-gray-700">Fotorealistische Bilder, Illustrationen, Konzeptgrafiken via DALL-E</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">📊 Infografiken</h4>
              <p className="text-sm text-gray-700">Datenvisualisierungen, Prozessdiagramme, Vergleichstabellen</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎭 Poster & Banner</h4>
              <p className="text-sm text-gray-700">Marketing-Materialien, Event-Poster, Social Media Graphics</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">🖼️ Bild-Editing</h4>
              <p className="text-sm text-gray-700">Hintergrund ändern, Objekte entfernen, Farbanpassungen</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Praktisches Beispiel</h3>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border rounded-lg p-6 mb-6">
            <p className="mb-3"><strong>Aufgabe:</strong> Banner für Social Media erstellen</p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Gehen Sie zu <strong>Create → Design a banner</strong></li>
              <li>Copilot gibt Ihnen eine Prompt-Vorlage</li>
              <li>Passen Sie den Prompt an: "Erstelle ein Banner für Hundewellness-Angebot, fröhliche Farben, mit goldenem Retriever"</li>
              <li>Wählen Sie Stil (realistisch, illustrativ, minimalistisch)</li>
              <li>Wählen Sie Farben (falls gewünscht)</li>
              <li>Klicken Sie auf <strong>"Create"</strong></li>
              <li>In 10-15 Sekunden haben Sie Ihr Banner</li>
            </ol>
          </div>

          <p className="mb-4 leading-relaxed">
            Der große Vorteil: Alles ist an einem Ort. Sie brauchen kein Canva, kein Adobe, keine separaten Tools.
            Copilot generiert professionelle Grafiken direkt in Ihrer Arbeitsumgebung.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Häufig gestellte Fragen</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Brauche ich eine zusätzliche Lizenz für Microsoft 365 Copilot?</h3>
              <p className="text-gray-700 leading-relaxed">
                Nein, die grundlegenden Copilot-Funktionen sind für alle Microsoft 365 Abonnenten verfügbar -
                ob Business, Education oder Consumer. Für erweiterte Features wie Researcher und Analyst-Agenten
                benötigen Sie ein kostenpflichtiges Copilot-Add-on für ca. 30 USD pro Nutzer/Monat.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Wie greife ich auf Microsoft 365 Copilot zu?</h3>
              <p className="text-gray-700 leading-relaxed">
                Sie können Copilot über office.com (jetzt copilot.microsoft.com) im Browser, als Desktop-App
                oder mobile App (iOS/Android) nutzen. Melden Sie sich einfach mit Ihrem Microsoft 365 Konto an.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Werden meine Daten zum Training von KI-Modellen verwendet?</h3>
              <p className="text-gray-700 leading-relaxed">
                Nein. Microsoft 365 Copilot hat Enterprise Data Protection aktiv. Ihre Daten, Prompts und
                Inhalte werden nicht zum Training von Large Language Models verwendet. Ihre Unternehmensdaten
                bleiben geschützt.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Kann ich Copilot auch ohne Microsoft 365 Apps verwenden?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, Copilot funktioniert auch als eigenständiger Chat-Assistent über die Web-Oberfläche.
                Für die Integration in Word, Excel, PowerPoint und andere Apps benötigen Sie allerdings
                eine Microsoft 365 Lizenz.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Was ist der Unterschied zwischen Copilot und ChatGPT?</h3>
              <p className="text-gray-700 leading-relaxed">
                Microsoft Copilot basiert auf OpenAI's GPT-Technologie (Microsoft hat Milliarden in OpenAI investiert),
                ist aber speziell für Microsoft 365 optimiert. Copilot kann direkt auf Ihre OneDrive-Dateien zugreifen,
                in Office-Apps integriert werden und bietet Enterprise-Datenschutz.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Wie erstelle ich effektive Prompts für Copilot?</h3>
              <p className="text-gray-700 leading-relaxed">
                Nutzen Sie die Prompt Gallery für Vorlagen, seien Sie spezifisch statt vage, binden Sie Dateien
                mit '/' ein, und experimentieren Sie mit verschiedenen Formulierungen. Der Prompt Coach Agent
                kann Ihnen helfen, bessere Prompts zu erstellen.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Kann Copilot Bilder erstellen?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, Copilot kann über DALL-E Bilder generieren. Beschreiben Sie einfach, was Sie möchten
                (z.B. "Erstelle ein Bild eines goldenen Retrievers auf grüner Wiese"). Sie können auch
                Infografiken, Poster und Banner erstellen lassen.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Was sind Copilot Pages?</h3>
              <p className="text-gray-700 leading-relaxed">
                Pages sind lebende Dokumente, die Copilot erstellt, um Informationen, Zusammenfassungen und
                Ideen aus Chats zu organisieren. Sie funktionieren ähnlich wie Microsoft Loop Pages und
                können mit anderen geteilt werden.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Welche Dateiformate kann Copilot verarbeiten?</h3>
              <p className="text-gray-700 leading-relaxed">
                Copilot kann Word-Dokumente, Excel-Tabellen, PowerPoint-Präsentationen, PDFs und Textdateien
                aus OneDrive verarbeiten. Nutzen Sie '/' im Chat, um auf Ihre Dateien zuzugreifen.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-xl font-semibold mb-2">Kann ich Copilot per Spracheingabe bedienen?</h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, Copilot unterstützt Diktierfunktionen. Klicken Sie auf das Mikrofon-Symbol und sprechen
                Sie Ihren Prompt. Dies funktioniert sowohl in der Web-App als auch in den Office-Anwendungen.
              </p>
            </div>
          </div>
        </section>

        {/* Fazit */}
        <section id="fazit" className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Nächste Schritte</h2>
            <p className="mb-4 leading-relaxed">
              Jetzt haben Sie das Fundament, um Microsoft 365 Copilot professionell zu nutzen.
              Mein wichtigster Rat: <strong>Einfach loslegen!</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Experimentieren Sie mit verschiedenen Prompts</li>
              <li>Nutzen Sie Memory und Custom Instructions für Ihr Business</li>
              <li>Integrieren Sie Copilot in Ihren täglichen Workflow</li>
              <li>Erkunden Sie die Prompt Gallery für neue Ideen</li>
            </ul>
            <p className="text-sm text-gray-700">
              <strong>Weitere Themen:</strong> In separaten Guides behandeln wir fortgeschrittene Themen wie
              das Erstellen eigener Copilot Agents, Copilot Studio für Automatisierung und Best Practices
              für Enterprise-Deployments.
            </p>
          </div>
        </section>

      </ContentLayout>
    </>
  );
};

export default MicrosoftCopilotEinsteigerGuide;
