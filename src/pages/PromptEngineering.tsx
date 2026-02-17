import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Lightbulb, Target, BookOpen, ExternalLink, CheckCircle2, XCircle, AlertTriangle, Code, FileText, BarChart3, Wand2, Linkedin, Mail } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { TrustBadge } from "@/components/TrustBadge";

const SLUG = "prompt-engineering";
const PAGE_TITLE = "Prompt Engineering";

const PromptEngineering = () => {
  const author = getAuthor('martin-lang');

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-ist", title: "Was ist Prompt Engineering?", level: 2 },
    { id: "craft-framework", title: "Das CRAFT-Framework", level: 2 },
    { id: "techniken", title: "Prompt-Techniken im Überblick", level: 2 },
    { id: "m365-prompts", title: "Prompts für Microsoft 365 Copilot", level: 2 },
    { id: "github-prompts", title: "Prompts für GitHub Copilot", level: 2 },
    { id: "fehler", title: "Typische Fehler vermeiden", level: 2 },
    { id: "zauberstab", title: "Der Zauberstab-Prompt", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const faqs = [
    {
      name: "Warum bekommen unsere Mitarbeiter so unterschiedliche Ergebnisse vom Copilot?",
      answer: "Die Qualität der KI-Antworten hängt direkt von der Prompt-Qualität ab. Ohne einheitliche Prompt-Strukturen variieren die Ergebnisse stark. Mit Frameworks wie CRAFT und gezieltem Training erreichen Sie konsistente, hochwertige Ergebnisse."
    },
    {
      name: "Wie können wir die Prompt-Qualität im Unternehmen standardisieren?",
      answer: "Durch die Einführung von Prompt-Frameworks wie CRAFT (Context, Role, Action, Format, Tone) und unternehmensspezifischen Guidelines. Die Copilotenschule entwickelt mit Ihnen maßgeschneiderte Prompt-Standards für Ihre häufigsten Use Cases."
    },
    {
      name: "Brauchen wir wirklich Prompt-Training oder reicht eine Prompt-Bibliothek?",
      answer: "Prompt-Bibliotheken sind ein guter Einstieg zur Inspiration, ersetzen aber kein Training. Mitarbeiter müssen lernen, selbständig Use Cases zu erkennen und Prompts anzupassen. Der Zauberstab-Prompt am Ende dieses Artikels zeigt, wie man auch ohne Expertise gute Prompts erstellt."
    },
    {
      name: "Wie lange dauert es, bis unsere Mitarbeiter effektiv prompten können?",
      answer: "Die Grundlagen lassen sich in einem halben Tag vermitteln. Wichtig ist kontinuierliche Praxis. Mit dem CRAFT-Framework haben Mitarbeiter sofort eine Struktur, die sie auf jeden Use Case anwenden können."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Prompt Engineering: Effektive KI-Prompts für Microsoft Copilot",
        "description": "Prompt Engineering Masterclass: Das CRAFT-Framework, bewährte Techniken und der Zauberstab-Prompt für bessere Copilot-Ergebnisse.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2026-02-03",
        "keywords": ["Prompt Engineering", "CRAFT Framework", "Microsoft Copilot Prompts", "Prompt Techniken", "KI Prompts"],
        "articleSection": "Best Practices",
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
        title="Prompt Engineering: Effektive KI-Prompts für Microsoft Copilot | Copilotenschule"
        description="Prompt Engineering Masterclass: Das CRAFT-Framework, bewährte Techniken und der Zauberstab-Prompt für bessere Copilot-Ergebnisse."
        keywords={["Prompt Engineering", "CRAFT Framework", "Microsoft Copilot Prompts", "Prompt Techniken", "KI Prompts", "Copilot Best Practices"]}
        canonicalUrl={pageUrl}
        schema={schema}
        publishedTime="2025-11-07"
        modifiedTime="2026-02-03"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Prompt Engineering", href: "/wissen/prompt-engineering" }
        ]}
        title="Prompt Engineering: Effektive KI-Prompts für Microsoft Copilot"
        description="Das CRAFT-Framework, bewährte Techniken und der Zauberstab-Prompt für bessere Ergebnisse."
        lastUpdated="03. Februar 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Prompt Engineering ist die Kunst, KI-Systeme durch präzise Anweisungen zu steuern.</strong> Mit dem
              <strong> CRAFT-Framework</strong> (Context, Role, Action, Format, Tone) erstellen Sie strukturierte Prompts,
              die konsistent gute Ergebnisse liefern. Der Schlüssel: Kontext geben, Rolle definieren, Aufgabe präzisieren.
              Am Ende dieses Artikels finden Sie den <strong className="text-orange-600">Zauberstab-Prompt</strong> –
              die ultimative Abkürzung für perfekte Prompts ohne Vorkenntnisse.
            </p>
          </CardContent>
        </Card>

        {/* Was ist Prompt Engineering */}
        <section id="was-ist">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500">
            Was ist Prompt Engineering?
          </h2>

          <p className="mb-6">
            Prompt Engineering ist die Disziplin, effektive Anweisungen für KI-Systeme zu formulieren. Die Qualität
            Ihrer Ergebnisse hängt direkt davon ab, wie gut Sie Ihre Anfrage strukturieren.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-5 h-5 text-blue-600" />
                  Präzision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Je präziser Ihr Prompt, desto genauer das Ergebnis. Vermeiden Sie Mehrdeutigkeiten und seien Sie spezifisch.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Kontext
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Geben Sie relevanten Kontext. Die KI versteht Ihre Situation besser mit Hintergrundinformationen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  Iteration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verfeinern Sie Prompts iterativ. Lernen Sie aus den Antworten und optimieren Sie schrittweise.
                </p>
              </CardContent>
            </Card>
          </div>

          <blockquote className="my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-6 rounded-r-lg italic text-lg">
            Die Erfahrung zeigt: Ein gut strukturierter Prompt spart mehr Zeit als zehn Versuche mit vagen Anweisungen.
          </blockquote>
        </section>

        {/* CRAFT Framework */}
        <section id="craft-framework">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500">
            Das CRAFT-Framework
          </h2>

          <p className="mb-6">
            CRAFT ist ein bewährtes Framework für strukturierte Prompts. Jeder Buchstabe steht für einen
            essenziellen Baustein eines effektiven Prompts.
          </p>

          <div className="space-y-4 my-8">
            {[
              {
                letter: "C",
                name: "Context",
                deutsch: "Kontext",
                beschreibung: "Geben Sie Hintergrundinformationen zur Situation",
                beispiel: "Ich arbeite in einer IT-Beratung und bereite ein Angebot für einen mittelständischen Kunden vor...",
                color: "blue"
              },
              {
                letter: "R",
                name: "Role",
                deutsch: "Rolle",
                beschreibung: "Definieren Sie die Perspektive, aus der die KI antworten soll",
                beispiel: "Du bist ein erfahrener Solution Architect mit Expertise in Microsoft 365...",
                color: "purple"
              },
              {
                letter: "A",
                name: "Action",
                deutsch: "Aktion",
                beschreibung: "Beschreiben Sie klar, was getan werden soll",
                beispiel: "Erstelle eine Aufwandsschätzung für die Migration von 500 Postfächern zu Exchange Online...",
                color: "orange"
              },
              {
                letter: "F",
                name: "Format",
                deutsch: "Format",
                beschreibung: "Spezifizieren Sie das gewünschte Output-Format",
                beispiel: "Ausgabe als Tabelle mit Spalten: Aufgabe, Stunden, Komplexität, Voraussetzungen...",
                color: "cyan"
              },
              {
                letter: "T",
                name: "Tone",
                deutsch: "Tonalität",
                beschreibung: "Legen Sie den Stil und die Sprache fest",
                beispiel: "Professionell aber verständlich, keine technischen Abkürzungen ohne Erklärung...",
                color: "emerald"
              }
            ].map((item, idx) => (
              <Card key={idx} className={`border-l-4 border-l-${item.color}-500`}>
                <CardHeader className={`bg-gradient-to-r from-${item.color}-500/10 to-${item.color}-600/5`}>
                  <CardTitle className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900 flex items-center justify-center text-${item.color}-600 font-bold text-xl`}>
                      {item.letter}
                    </span>
                    <div>
                      <span className={`text-${item.color}-700 dark:text-${item.color}-400`}>{item.name}</span>
                      <span className="text-muted-foreground text-sm ml-2">({item.deutsch})</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-3">{item.beschreibung}</p>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <code className="text-sm italic">"{item.beispiel}"</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                CRAFT in Aktion: Komplettes Beispiel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm leading-relaxed">
                <p className="text-blue-400">[CONTEXT]</p>
                <p className="mb-2">Ich leite das Marketing-Team eines B2B-SaaS-Unternehmens mit 50 Mitarbeitern.</p>
                <p className="text-purple-400">[ROLE]</p>
                <p className="mb-2">Du bist ein erfahrener Content-Stratege mit Fokus auf LinkedIn.</p>
                <p className="text-orange-400">[ACTION]</p>
                <p className="mb-2">Erstelle 5 LinkedIn-Post-Ideen zum Thema "KI im Vertrieb".</p>
                <p className="text-cyan-400">[FORMAT]</p>
                <p className="mb-2">Für jeden Post: Headline, Hook (erster Satz), 3 Key Points, Call-to-Action.</p>
                <p className="text-emerald-400">[TONE]</p>
                <p>Professionell, aber nahbar. Keine Buzzwords. Praxisorientiert.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Prompt-Techniken */}
        <section id="techniken">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500">
            Prompt-Techniken im Überblick
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              {
                technik: "Zero-Shot Prompting",
                beschreibung: "Direkte Anweisung ohne Beispiele – funktioniert bei klaren, einfachen Aufgaben",
                beispiel: "Fasse diesen Text in 3 Sätzen zusammen: [Text]",
                wann: "Bei Standardaufgaben mit klarer Erwartung",
                color: "blue"
              },
              {
                technik: "Few-Shot Learning",
                beschreibung: "Geben Sie Beispiele für das gewünschte Verhalten – die KI erkennt das Muster",
                beispiel: "Input: 'Hund' → Output: 'Tier'\nInput: 'Auto' → Output: 'Fahrzeug'\nInput: 'Apfel' → ?",
                wann: "Bei spezifischen Formatierungen oder Klassifizierungen",
                color: "green"
              },
              {
                technik: "Chain-of-Thought",
                beschreibung: "Bitten Sie um schrittweises Denken – verbessert komplexe Analysen",
                beispiel: "Löse Schritt für Schritt und erkläre dein Vorgehen bei jedem Schritt.",
                wann: "Bei mathematischen oder logischen Problemen",
                color: "orange"
              },
              {
                technik: "Self-Consistency",
                beschreibung: "Lassen Sie die KI mehrere Lösungswege prüfen und die beste wählen",
                beispiel: "Generiere 3 verschiedene Ansätze und bewerte dann, welcher am besten passt.",
                wann: "Bei wichtigen Entscheidungen oder kreativen Aufgaben",
                color: "purple"
              }
            ].map((tech, idx) => (
              <Card key={idx} className={`border-t-4 border-t-${tech.color}-500`}>
                <CardHeader>
                  <CardTitle className={`text-lg text-${tech.color}-700 dark:text-${tech.color}-400`}>
                    {tech.technik}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{tech.beschreibung}</p>
                  <div className="p-3 bg-muted rounded-lg mb-3">
                    <code className="text-xs whitespace-pre-line">{tech.beispiel}</code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Wann nutzen:</strong> {tech.wann}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* M365 Prompts */}
        <section id="m365-prompts">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500">
            Prompts für Microsoft 365 Copilot
          </h2>

          <p className="mb-6">
            Diese Prompts sind speziell für Microsoft 365 Copilot optimiert und nutzen die Integration
            mit Outlook, Word, Excel, PowerPoint und Teams.
          </p>

          <div className="space-y-4 my-8">
            {[
              {
                app: "Outlook",
                icon: "📧",
                prompts: [
                  {
                    aufgabe: "E-Mails priorisieren",
                    prompt: "Fasse die wichtigsten Punkte aus meinen ungelesenen E-Mails der letzten 2 Tage zusammen. Priorisiere nach Dringlichkeit und zeige Action Items."
                  },
                  {
                    aufgabe: "Professionelle Antwort",
                    prompt: "Schreibe eine höfliche aber bestimmte Antwort auf diese E-Mail. Ich muss den Termin verschieben, möchte aber die Beziehung nicht belasten."
                  }
                ],
                color: "blue"
              },
              {
                app: "Word",
                icon: "📄",
                prompts: [
                  {
                    aufgabe: "Dokument erstellen",
                    prompt: "Erstelle ein Projektvorschlagsdokument mit: Executive Summary, Ziele, Timeline, Budget, Risiken. Ton: Professionell, max. 3 Seiten."
                  },
                  {
                    aufgabe: "Text verbessern",
                    prompt: "Verbessere diesen Text: Mache ihn prägnanter, entferne Füllwörter, behalte den fachlichen Ton. Markiere Änderungen."
                  }
                ],
                color: "purple"
              },
              {
                app: "Excel",
                icon: "📊",
                prompts: [
                  {
                    aufgabe: "Datenanalyse",
                    prompt: "Analysiere die Verkaufsdaten in Spalte A-E. Zeige Trends, Ausreißer und erstelle eine Pivot-Tabelle nach Regionen."
                  },
                  {
                    aufgabe: "Formel erklären",
                    prompt: "Erkläre diese Formel Schritt für Schritt und zeige, was jeder Teil macht. Schlage Verbesserungen vor."
                  }
                ],
                color: "green"
              },
              {
                app: "Teams",
                icon: "💬",
                prompts: [
                  {
                    aufgabe: "Meeting zusammenfassen",
                    prompt: "Fasse dieses Meeting zusammen: Wichtigste Entscheidungen, Action Items mit Verantwortlichen und Deadlines, offene Fragen."
                  },
                  {
                    aufgabe: "Agenda vorbereiten",
                    prompt: "Erstelle eine Agenda für unser Quartals-Review basierend auf den letzten 3 Meetings und offenen Projekten."
                  }
                ],
                color: "orange"
              }
            ].map((app, idx) => (
              <Card key={idx} className={`border-l-4 border-l-${app.color}-500`}>
                <CardHeader className={`bg-gradient-to-r from-${app.color}-500/10 to-${app.color}-600/5`}>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{app.icon}</span>
                    <span className={`text-${app.color}-700 dark:text-${app.color}-400`}>{app.app}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {app.prompts.map((p, pidx) => (
                      <div key={pidx} className="p-4 border rounded-lg">
                        <div className="font-semibold text-sm mb-2">{p.aufgabe}</div>
                        <code className="text-xs bg-muted p-3 rounded block">{p.prompt}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* GitHub Copilot */}
        <section id="github-prompts">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500">
            Prompts für GitHub Copilot
          </h2>

          <p className="mb-6">
            GitHub Copilot versteht Kommentare als Prompts. Je präziser der Kommentar, desto besser der generierte Code.
          </p>

          <Card className="my-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-600" />
                Code-Prompts nach Aufgabentyp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    typ: "Funktion generieren",
                    prompt: "// Function to validate email address using regex\n// Returns: boolean\n// Handles: empty input, special characters, international domains",
                    tipp: "Immer Rückgabetyp und Edge Cases angeben"
                  },
                  {
                    typ: "Unit Test schreiben",
                    prompt: "// Unit test for calculateShipping function\n// Test cases: valid input, invalid input, edge cases (0, negative, very large)\n// Use Jest, expect assertions",
                    tipp: "Testframework und erwartete Szenarien definieren"
                  },
                  {
                    typ: "Refactoring",
                    prompt: "// Refactor: Convert to async/await, add try-catch error handling\n// Preserve existing functionality, add TypeScript types",
                    tipp: "Klar machen, was erhalten bleiben soll"
                  },
                  {
                    typ: "Dokumentation",
                    prompt: "// Add JSDoc: @param types, @returns, @throws, @example usage\n// Include edge cases in examples",
                    tipp: "Gewünschte Dokumentations-Elemente auflisten"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-semibold text-emerald-600">{item.typ}</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded">
                        💡 {item.tipp}
                      </span>
                    </div>
                    <code className="text-sm bg-gray-900 text-gray-100 p-3 rounded block font-mono whitespace-pre-line">
                      {item.prompt}
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typische Fehler */}
        <section id="fehler">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">
            Typische Fehler vermeiden
          </h2>

          <div className="space-y-4 my-8">
            {[
              {
                fehler: "Zu vage Prompts",
                schlecht: "Schreib was über KI",
                gut: "Schreibe einen 500-Wörter Blogpost über KI-Einsatz im Kundenservice, Zielgruppe: IT-Manager, Fokus: ROI und Quick Wins",
                warum: "Ohne Kontext, Zielgruppe und Format kann die KI nur raten"
              },
              {
                fehler: "Fehlender Kontext",
                schlecht: "Erstelle eine Präsentation",
                gut: "Erstelle eine 10-Folien Präsentation für die Geschäftsführung über Q4-Verkaufszahlen, Fokus DACH-Region, Vergleich zum Vorjahr",
                warum: "Die KI kennt weder Publikum noch Inhalt noch Umfang"
              },
              {
                fehler: "Zu komplexe Aufgaben auf einmal",
                schlecht: "Erstelle komplette Marketing-Strategie inklusive Budget, Kampagnen, Timeline, Content-Plan und KPIs",
                gut: "Schritt 1: Erstelle eine Zielgruppenanalyse für unser B2B-SaaS-Produkt [dann weitere Schritte separat]",
                warum: "Komplexe Aufgaben in Teilschritte aufteilen führt zu besseren Ergebnissen"
              },
              {
                fehler: "Keine Beispiele bei spezifischen Formaten",
                schlecht: "Erstelle Produktbeschreibungen im Unternehmensstil",
                gut: "Erstelle Produktbeschreibungen. Beispiel unseres Stils: '[Beispieltext]'. Erstelle 5 weitere in diesem Stil.",
                warum: "Ohne Beispiel kann die KI Ihren Stil nicht kennen"
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-red-600 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {item.fehler}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm font-semibold text-red-600 mb-1">❌ Schlecht:</p>
                      <p className="text-sm">{item.schlecht}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-sm font-semibold text-green-600 mb-1">✓ Besser:</p>
                      <p className="text-sm">{item.gut}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warum:</strong> {item.warum}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Zauberstab-Prompt */}
        <section id="zauberstab">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-amber-500">
            Der Zauberstab-Prompt
          </h2>

          <p className="mb-6">
            Sie müssen kein Prompt-Engineering-Experte sein. Mit diesem einen Prompt lassen Sie die KI
            die Arbeit für Sie machen – sie fragt Sie nach allem, was sie für den perfekten Prompt braucht.
          </p>

          <Card className="border-4 border-amber-500 bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Wand2 className="w-7 h-7" />
                Der Zauberstab-Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="p-6 bg-gray-900 text-gray-100 rounded-lg font-mono text-base leading-relaxed">
                <p>
                  Hilf mir einen perfekten Copilot Prompt für folgendes Problem zu schreiben,
                  indem du mir die nötigen Fragen stellst um den Kontext bereitzustellen den du
                  benötigst für den perfekten Prompt.
                </p>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">✨ So funktioniert's:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Sie geben den Zauberstab-Prompt ein</li>
                    <li>Die KI stellt Ihnen gezielte Fragen</li>
                    <li>Sie beantworten die Fragen</li>
                    <li>Die KI erstellt den perfekten Prompt für Sie</li>
                  </ol>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">💡 Warum das funktioniert:</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Die KI weiß, welche Infos sie braucht</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Sie vergessen keine wichtigen Details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Das Ergebnis ist maßgeschneidert</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-6 rounded-r-lg text-lg">
            <strong>Der Meta-Trick:</strong> Statt die KI zu prompten, lassen Sie sich von der KI prompten.
            Das funktioniert für jeden Use Case – ohne Prompt-Bibliothek, ohne Vorkenntnisse.
          </blockquote>
        </section>

        {/* Kernaussagen */}
        <section id="kernaussagen">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-indigo-500">
            Kernaussagen für Entscheider
          </h2>

          <div className="space-y-4 my-6">
            <Card className="border-l-4 border-l-indigo-500">
              <CardContent className="pt-6">
                <p className="font-bold mb-2">Faktische Kernaussage:</p>
                <p className="mb-4">Die Qualität von KI-Ergebnissen hängt direkt von der Prompt-Qualität ab – nicht vom Tool.</p>
                <p className="font-bold mb-2">Praktische Konsequenz:</p>
                <p className="mb-4">Investieren Sie in Prompt-Kompetenz Ihrer Mitarbeiter, nicht nur in Lizenzen.</p>
                <p className="font-bold mb-2">Typischer Fehler:</p>
                <p>Erwarten, dass Copilot "einfach funktioniert" ohne Schulung der Nutzer.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardContent className="pt-6">
                <p className="font-bold mb-2">Faktische Kernaussage:</p>
                <p className="mb-4">Strukturierte Frameworks wie CRAFT führen zu konsistenten Ergebnissen im gesamten Unternehmen.</p>
                <p className="font-bold mb-2">Praktische Konsequenz:</p>
                <p className="mb-4">Etablieren Sie unternehmensweite Prompt-Standards statt individuelle Lösungen.</p>
                <p className="font-bold mb-2">Typischer Fehler:</p>
                <p>Jeder Mitarbeiter erfindet das Rad neu – ohne gemeinsame Best Practices.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4 my-6">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-gray-500">
            Quellen und weiterführende Links
          </h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              {
                href: "https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering",
                title: "Microsoft Learn: Prompt Engineering",
                desc: "Offizielle Dokumentation zu Prompt-Techniken"
              },
              {
                href: "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5",
                title: "Microsoft: Copilot Prompting Guide",
                desc: "Praktische Tipps für M365 Copilot"
              },
              {
                href: "https://www.promptingguide.ai/",
                title: "Prompt Engineering Guide",
                desc: "Umfassende Open-Source-Ressource"
              },
              {
                href: "https://adoption.microsoft.com/en-us/copilot/",
                title: "Microsoft Copilot Adoption Hub",
                desc: "Best Practices für Copilot-Einführung"
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">{link.title}</div>
                  <div className="text-sm text-muted-foreground">{link.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <TrustBadge />

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Prompt Engineering Workshops</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Lernen Sie in praxisorientierten Workshops, wie Sie das CRAFT-Framework anwenden
            und Ihre Mitarbeiter zu Prompt-Profis machen.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Workshop anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default PromptEngineering;
