import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Lightbulb, Target, BookOpen } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateBreadcrumbSchema } from "@/lib/schema";

const PromptEngineering = () => {
  const martinLang = getAuthor('martin-lang')!;

  const tableOfContents = [
    { id: "was-ist", title: "Was ist Prompt Engineering?", level: 2 },
    { id: "anatomie", title: "Anatomie eines guten Prompts", level: 2 },
    { id: "techniken", title: "Prompt-Techniken im Überblick", level: 2 },
    { id: "m365-prompts", title: "Prompts für Microsoft 365 Copilot", level: 2 },
    { id: "github-prompts", title: "Prompts für GitHub Copilot", level: 2 },
    { id: "context-windows", title: "Context Windows optimal nutzen", level: 2 },
    { id: "prompt-bibliothek", title: "Prompt-Bibliothek", level: 2 },
    { id: "fehler", title: "Fehler beim Prompten vermeiden", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  // Breadcrumb Schema für Navigation
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "https://copilotenschule.de/" },
    { name: "Wissen", url: "https://copilotenschule.de/wissen" },
    { name: "Prompt Engineering", url: "https://copilotenschule.de/prompt-engineering" }
  ]);

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://copilotenschule.de/prompt-engineering#article",
        "headline": "Prompt Engineering: Effektive KI-Prompts für Microsoft Copilot",
        "description": "Prompt Engineering Masterclass: Bessere Ergebnisse mit Microsoft Copilot durch optimierte Prompts. Techniken, Beispiele und Best Practices.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2025-11-07",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://copilotenschule.de/prompt-engineering"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://copilotenschule.de/prompt-engineering#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Was macht einen guten Prompt aus?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ein guter Prompt ist spezifisch, kontextreich, strukturiert und gibt klare Anweisungen. Er enthält relevante Details, definiert das gewünschte Format und nutzt Beispiele wo sinnvoll."
            }
          },
          {
            "@type": "Question",
            "name": "Wie lang sollte ein Prompt sein?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die optimale Länge hängt von der Aufgabe ab. Einfache Aufgaben: 1-2 Sätze. Komplexe Aufgaben: Mehrere Absätze mit Details. Wichtiger als Länge ist Klarheit und Relevanz."
            }
          },
          {
            "@type": "Question",
            "name": "Funktionieren Prompts in allen Sprachen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, Microsoft Copilot unterstützt mehrere Sprachen. Die beste Performance wird in Englisch erzielt, aber Deutsch funktioniert ebenfalls sehr gut. Konsistenz innerhalb eines Prompts ist wichtig."
            }
          },
          {
            "@type": "Question",
            "name": "Wie lerne ich Prompt Engineering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Durch Praxis und Iteration. Starten Sie mit einfachen Prompts, analysieren Sie die Ergebnisse, verfeinern Sie schrittweise. Nutzen Sie Prompt-Templates und lernen Sie von Beispielen."
            }
          },
          {
            "@type": "Question",
            "name": "Gibt es Prompt-Templates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, es gibt viele bewährte Prompt-Templates für häufige Aufgaben wie Zusammenfassungen, Analysen, Codegenerierung und Content-Erstellung. Diese Seite bietet eine Prompt-Bibliothek zum Start."
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
        title="Prompt Engineering: Effektive KI-Prompts für Microsoft Copilot"
        description="Prompt Engineering Masterclass: Bessere Ergebnisse mit Microsoft Copilot durch optimierte Prompts. Techniken, Beispiele und Best Practices."
        keywords={[
          "Prompt Engineering",
          "KI Prompts",
          "Microsoft Copilot Prompts",
          "Prompt Techniken",
          "Copilot Best Practices",
          "AI Prompting",
          "Prompt Templates"
        ]}
        canonicalUrl="https://copilotenschule.de/prompt-engineering"
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2025-11-07T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Prompt Engineering", href: "/prompt-engineering" }
        ]}
        title="Prompt Engineering: Effektive KI-Prompts für Microsoft Copilot"
        description="Prompt Engineering Masterclass: Bessere Ergebnisse mit Microsoft Copilot durch optimierte Prompts. Techniken, Beispiele und Best Practices."
        lastUpdated="07. November 2025"
        readTime="15 Minuten"
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
              Prompt Engineering ist die Kunst, KI-Tools wie Microsoft Copilot effektiv zu steuern durch präzise Anweisungen.
              Die Qualität der Ergebnisse hängt direkt von der Formulierung ab. Erfolgreiche Prompts sind spezifisch, kontextreich
              und strukturiert. Mit Techniken wie Few-Shot Learning, Chain-of-Thought und Persona-Prompting erreichen Sie
              professionelle Ergebnisse. Dieser Leitfaden zeigt bewährte Prompt-Muster für Office, Entwicklung und Business-Automatisierung.
            </p>
          </CardContent>
        </Card>

        <section id="was-ist">
          <h2>Was ist Prompt Engineering?</h2>
          <p>
            Prompt Engineering ist die Disziplin, effektive Anweisungen für KI-Systeme zu formulieren. Es geht darum, durch
            geschickte Formulierung die gewünschten Ergebnisse zu erzielen.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-5 h-5" />
                  Präzision
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Je präziser Ihr Prompt, desto genauer das Ergebnis. Vermeiden Sie Mehrdeutigkeiten.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="w-5 h-5" />
                  Kontext
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Geben Sie relevanten Kontext. Die KI versteht Ihre Situation besser mit Hintergrundinformationen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="w-5 h-5" />
                  Iteration
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Verfeinern Sie Prompts iterativ. Lernen Sie aus den Antworten und optimieren Sie.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="anatomie" className="mt-12">
          <h2>Anatomie eines guten Prompts</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Die 5 Elemente eines effektiven Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    element: "1. Rolle/Persona",
                    beschreibung: "Definieren Sie die Rolle, die die KI einnehmen soll",
                    beispiel: '"Du bist ein erfahrener Python-Entwickler mit Fokus auf Clean Code..."'
                  },
                  {
                    element: "2. Kontext",
                    beschreibung: "Geben Sie relevante Hintergrundinformationen",
                    beispiel: '"Wir entwickeln eine E-Commerce-Plattform mit Django..."'
                  },
                  {
                    element: "3. Aufgabe",
                    beschreibung: "Beschreiben Sie klar, was getan werden soll",
                    beispiel: '"Erstelle eine Funktion zur Berechnung von Versandkosten..."'
                  },
                  {
                    element: "4. Format",
                    beschreibung: "Spezifizieren Sie das gewünschte Output-Format",
                    beispiel: '"Ausgabe als Python-Funktion mit Docstring und Type Hints..."'
                  },
                  {
                    element: "5. Beispiele",
                    beschreibung: "Zeigen Sie Beispiele für gewünschtes Ergebnis",
                    beispiel: '"Ähnlich wie: def calculate_tax(amount: float) -> float..."'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-l-primary pl-4">
                    <h4 className="font-bold text-primary mb-1">{item.element}</h4>
                    <p className="text-sm mb-2">{item.beschreibung}</p>
                    <code className="text-xs bg-muted p-2 rounded block">{item.beispiel}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="techniken" className="mt-12">
          <h2>Prompt-Techniken im Überblick</h2>

          <div className="space-y-6 my-6">
            {[
              {
                technik: "Zero-Shot Prompting",
                beschreibung: "Direkte Anweisung ohne Beispiele",
                beispiel: "Fasse diesen Text in 3 Sätzen zusammen: [Text]"
              },
              {
                technik: "Few-Shot Learning",
                beschreibung: "Geben Sie Beispiele für das gewünschte Verhalten",
                beispiel: "Beispiel 1: Input → Output. Beispiel 2: Input → Output. Jetzt du: [Input]"
              },
              {
                technik: "Chain-of-Thought",
                beschreibung: "Bitten Sie um schrittweises Denken",
                beispiel: "Löse diese Aufgabe Schritt für Schritt und erkläre dein Vorgehen"
              },
              {
                technik: "Persona Prompting",
                beschreibung: "Definieren Sie eine Rolle für die KI",
                beispiel: "Du bist ein SEO-Experte. Analysiere diese Website..."
              }
            ].map((tech, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{tech.technik}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm">{tech.beschreibung}</p>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm">{tech.beispiel}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="m365-prompts" className="mt-12">
          <h2>Prompts für Microsoft 365 Copilot</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Bewährte M365 Copilot Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    aufgabe: "E-Mail zusammenfassen",
                    prompt: "Fasse die wichtigsten Punkte aus meinen ungelesenen E-Mails der letzten 2 Tage zusammen. Priorisiere nach Dringlichkeit."
                  },
                  {
                    aufgabe: "Dokument erstellen",
                    prompt: "Erstelle ein Projektvorschlagsdokument für [Projekt]. Struktur: Executive Summary, Ziele, Timeline, Budget. Ton: Professionell und überzeugend."
                  },
                  {
                    aufgabe: "Excel-Analyse",
                    prompt: "Analysiere die Verkaufsdaten in Spalte A-E. Erstelle eine Pivot-Tabelle nach Regionen und zeige Trends der letzten 6 Monate."
                  },
                  {
                    aufgabe: "Teams-Meeting vorbereiten",
                    prompt: "Bereite eine Agenda für unser Quartals-Review vor basierend auf den letzten 3 Meetings und offenen Projekten."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="font-semibold text-primary mb-2">{item.aufgabe}</div>
                    <code className="text-sm bg-muted p-3 rounded block">{item.prompt}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="github-prompts" className="mt-12">
          <h2>Prompts für GitHub Copilot</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Code-Prompts für Entwickler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    typ: "Funktion generieren",
                    prompt: "// Function to validate email address using regex, returns boolean, handles edge cases"
                  },
                  {
                    typ: "Test schreiben",
                    prompt: "// Unit test for calculateShipping function: test with valid input, invalid input, edge cases"
                  },
                  {
                    typ: "Refactoring",
                    prompt: "// Refactor this function to use async/await instead of promises, add error handling"
                  },
                  {
                    typ: "Dokumentation",
                    prompt: "// Add JSDoc documentation with parameter types, return value, and usage example"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="font-semibold text-primary mb-2">{item.typ}</div>
                    <code className="text-sm bg-muted p-3 rounded block font-mono">{item.prompt}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="context-windows" className="mt-12">
          <h2>Context Windows optimal nutzen</h2>
          <p>
            KI-Modelle haben begrenzte Context Windows. Nutzen Sie diese effizient.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-base">Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Relevante Informationen priorisieren</li>
                  <li>✓ Kontext am Anfang geben</li>
                  <li>✓ Bei langen Dokumenten: Zusammenfassungen nutzen</li>
                  <li>✓ Iterativ arbeiten statt alles auf einmal</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-base">Zu vermeiden</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✗ Irrelevante Details im Prompt</li>
                  <li>✗ Redundante Informationen wiederholen</li>
                  <li>✗ Zu viele Themen in einem Prompt</li>
                  <li>✗ Kontext am Ende statt am Anfang</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="prompt-bibliothek" className="mt-12">
          <h2>Prompt-Bibliothek für häufige Aufgaben</h2>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            {[
              {
                kategorie: "Zusammenfassungen",
                prompts: [
                  "Fasse in 3 Bullet Points zusammen",
                  "TL;DR: Was sind die Key Takeaways?",
                  "Executive Summary in 100 Wörtern"
                ]
              },
              {
                kategorie: "Analyse",
                prompts: [
                  "SWOT-Analyse erstellen",
                  "Pro/Contra-Liste generieren",
                  "Risiken identifizieren"
                ]
              },
              {
                kategorie: "Content-Erstellung",
                prompts: [
                  "Blog-Post schreiben über [Thema]",
                  "Social Media Post für LinkedIn",
                  "E-Mail-Vorlage für [Zweck]"
                ]
              },
              {
                kategorie: "Code-Review",
                prompts: [
                  "Identifiziere Sicherheitsprobleme",
                  "Vorschläge zur Performance-Optimierung",
                  "Code-Smells finden"
                ]
              }
            ].map((kat, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base">{kat.kategorie}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {kat.prompts.map((prompt, pidx) => (
                      <li key={pidx} className="text-sm p-2 bg-muted rounded">
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="fehler" className="mt-12">
          <h2>Fehler beim Prompten vermeiden</h2>

          <div className="space-y-4 my-6">
            {[
              {
                fehler: "Zu vage Prompts",
                beispiel: "Schlecht: 'Schreib was über KI'",
                besser: "Gut: 'Schreibe einen 500-Wörter Blogpost über KI-Einsatz im Kundenservice, Zielgruppe: IT-Manager'"
              },
              {
                fehler: "Fehlender Kontext",
                beispiel: "Schlecht: 'Erstelle eine Präsentation'",
                besser: "Gut: 'Erstelle eine 10-Folien Präsentation für Geschäftsführung über Q4-Verkaufszahlen, Fokus auf DACH-Region'"
              },
              {
                fehler: "Zu komplexe Aufgaben",
                beispiel: "Schlecht: 'Erstelle komplette Marketing-Strategie inklusive Budget, Kampagnen, Timeline'",
                besser: "Gut: Teilen Sie in Teilaufgaben auf: 1) Zielgruppenanalyse, 2) Kanal-Strategie, 3) Budget-Plan"
              }
            ].map((item, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <h4 className="font-bold text-red-600 mb-3">{item.fehler}</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-red-600">❌</span> {item.beispiel}
                    </div>
                    <div className="text-sm">
                      <span className="text-green-600">✓</span> {item.besser}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
          <h3 className="text-2xl font-bold mb-4">Prompt Engineering Workshops</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Lernen Sie in praxisorientierten Workshops, wie Sie KI-Tools optimal nutzen.
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
