import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Zap, ExternalLink, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SLUG = "copilot-fuer-excel";
const PAGE_TITLE = "Microsoft Copilot für Excel: Was die KI in Tabellen wirklich kann";

const CopilotFuerExcel = () => {
  const author = getAuthor("martin-lang");
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "meine-vorgeschichte", title: "Meine Vorgeschichte mit Excel", level: 2 },
    { id: "voraussetzungen", title: "Was Sie brauchen", level: 2 },
    { id: "daten-vorbereiten", title: "Daten vorbereiten: Die Grundregel", level: 2 },
    { id: "was-copilot-selbststaendig-kann", title: "Was Copilot selbstständig kann", level: 2 },
    { id: "wo-copilot-assistiert", title: "Wo Copilot nur assistiert", level: 2 },
    { id: "desktop-vs-web", title: "Desktop-App vs. Web: Ein klares Votum", level: 2 },
    { id: "praxis-ab-test", title: "Praxisbeispiel 1: AB-Test im Marketing auswerten", level: 2 },
    { id: "praxis-liquiditaet", title: "Praxisbeispiel 2: Liquiditätsplanung und Prognosen", level: 2 },
    { id: "praxis-business-plan", title: "Praxisbeispiel 3: Business Plan Finanzplanung", level: 2 },
    { id: "prompt-sammlung", title: "Prompt-Sammlung für Excel", level: 2 },
    { id: "tipps-prompts", title: "Tipps für bessere Excel-Prompts", level: 2 },
    { id: "grenzen", title: "Wo Copilot an seine Grenzen kommt", level: 2 },
    { id: "weiterfuehrend", title: "Copilot in anderen Apps", level: 2 },
    { id: "fazit", title: "Fazit", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Unsere Controller klagen, dass Copilot in Excel falsche Zahlen liefert – was machen wir falsch?",
      answer: "Das liegt fast immer an der Datenstruktur, nicht an Copilot. Wenn Ihre Daten nicht als formatierte Excel-Tabelle vorliegen, Spaltenüberschriften fehlen oder Zellen zusammengeführt sind, kann Copilot die Daten nicht richtig interpretieren. In unseren Copilot-Trainings bei der Copilotenschule zeigen wir, wie Sie Ihre Daten Copilot-tauglich aufbereiten – das ist die wichtigste Grundlage für verlässliche Ergebnisse."
    },
    {
      name: "Wie überzeugen wir das Management, dass Copilot in Excel einen echten Mehrwert bringt?",
      answer: "Zeigen Sie konkrete Beispiele: Eine Pivot-Tabelle, die normalerweise 20 Minuten dauert, erstellt Copilot in Sekunden. Eine Trendanalyse über 12 Monate, für die sonst ein Analyst gebraucht wird, kann jeder Fachbereich selbst erstellen. Der Schlüssel liegt in der Demokratisierung von Datenanalyse – nicht nur IT und Controlling, sondern jede Abteilung kann ihre eigenen Daten auswerten. Die Copilotenschule erstellt Ihnen gerne eine ROI-Berechnung auf Basis Ihrer realen Workflows."
    },
    {
      name: "Wir haben riesige Datensätze mit 100.000+ Zeilen – funktioniert Copilot da überhaupt?",
      answer: "Copilot in Excel hat Grenzen bei sehr großen Datensätzen. Bei mehr als ca. 30.000 Zeilen werden die Ergebnisse unzuverlässiger. Für wirklich große Datenmengen empfehlen wir Power BI mit Copilot. Für die typischen Business-Tabellen bis 10.000 Zeilen funktioniert Copilot in Excel aber hervorragend. In den Trainings der Copilotenschule zeigen wir, wann welches Tool das richtige ist – und wie Sie Ihre Daten sinnvoll aufteilen."
    },
    {
      name: "Unsere Mitarbeitenden nutzen Excel, können aber kein Englisch – funktioniert Copilot trotzdem?",
      answer: "Ja, Copilot versteht deutsche Prompts sehr gut. In unserer Erfahrung bei der Copilotenschule funktionieren deutsche Prompts für die meisten Excel-Aufgaben zuverlässig. Bei sehr komplexen Berechnungen liefert ein englischer Prompt manchmal präzisere Ergebnisse, aber das ist die Ausnahme. Wir trainieren Ihre Teams mit deutschen Prompt-Vorlagen, die direkt einsetzbar sind."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Was kann Microsoft Copilot in Excel wirklich? Praxisbeispiele, Prompts und ehrliche Einschätzung der Grenzen – von jemandem, der Werbung studiert hat und Pivot-Tabellen früher gefürchtet hat.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-28",
        "dateModified": "2026-02-28",
        "keywords": ["Copilot Excel", "Microsoft Copilot Excel", "Excel KI", "Copilot Tabellen", "Excel Prompts", "Copilot Datenanalyse", "Excel Pivot Copilot", "KI Excel Formeln"],
        "articleSection": "Microsoft 365",
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
        title="Microsoft Copilot für Excel: Was die KI in Tabellen wirklich kann | Copilotenschule"
        description="Was kann Microsoft Copilot in Excel wirklich? Praxisbeispiele, Prompts und ehrliche Einschätzung der Grenzen – von jemandem, der Werbung studiert hat und Pivot-Tabellen früher gefürchtet hat."
        keywords={["Copilot Excel", "Microsoft Copilot Excel", "Excel KI", "Copilot Tabellen", "Excel Prompts", "Copilot Datenanalyse", "Excel Pivot Copilot", "KI Excel Formeln"]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={author}
        publishedTime="2026-02-28T10:00:00+01:00"
        modifiedTime="2026-02-28T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Praxisbeispiele, Prompts und eine ehrliche Einschätzung – von jemandem, der Werbung studiert hat und Pivot-Tabellen früher gefürchtet hat."
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        author={author}
        publishDate="2026-02-28"
        modifiedDate="2026-02-28"
      >
        {/* Schnellantwort Card */}
        <section className="mb-8">
          <div className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-lg p-6 flex items-start gap-4">
            <Zap className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Schnellantwort</h3>
              <p className="text-gray-700">Microsoft Copilot für Excel kann Daten analysieren, Formeln schreiben, Pivot-Tabellen erstellen, Diagramme bauen und Trends erkennen – per natürlicher Sprache. Die Voraussetzung: Ihre Daten müssen als formatierte Excel-Tabelle vorliegen. Dann wird Excel vom Zahlen-Werkzeug für Profis zum Analyse-Tool für alle.</p>
            </div>
          </div>
        </section>

        {/* Persönliche Einleitung */}
        <section id="meine-vorgeschichte" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-600 mb-6">Meine Vorgeschichte mit Excel</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Ich habe Werbung studiert. Ich bin gut mit Worten, ich kann Geschichten erzählen und Menschen für Ideen begeistern. Was ich nicht kann: Zahlen. Nicht so schlecht, dass ich Excel als kariertes Papier benutze – aber jenseits von SUMME und einfachen Wenn-Dann-Formeln wurde es bei mir schnell dünn.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Schweißige Hände beim Wort <strong>Pivot-Tabelle</strong>. Ein mulmiges Gefühl, wenn jemand sagte: 'Kannst du das mal schnell in Excel auswerten?' Schnell? Sicher. Wenn 'schnell' drei Stunden googeln und trotzdem ein falsches Ergebnis bedeutet.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Genau deshalb bin ich so begeistert von dem, was Copilot in Excel heute kann. Nicht, weil es mich zum Excel-Profi macht – das tut es nicht. Sondern weil es mir erlaubt, <strong>die richtigen Fragen an meine Daten zu stellen</strong>, ohne die Sprache der Formeln sprechen zu müssen.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Dieser Artikel ist für Menschen wie mich geschrieben. Für Leute, die Excel nutzen müssen, aber keine Tabellenkalkulations-Nerds sind. Ich zeige Ihnen, was Copilot in Excel wirklich kann, wo die Grenzen liegen – und ich zeige Ihnen das mit konkreten Beispielen aus meinem Alltag als Trainer und Geschäftsführer.
          </p>
        </section>

        {/* Voraussetzungen */}
        <section id="voraussetzungen" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500 mb-6">Was Sie brauchen</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">Bevor wir loslegen, die Basics:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
            <li><strong>Microsoft 365 Copilot Lizenz</strong> (die kostenpflichtige Variante, 30 €/Monat pro User)</li>
            <li><strong>Excel Desktop-App</strong> (Windows oder Mac) – warum, erkläre ich weiter unten</li>
            <li><strong>Daten als formatierte Tabelle</strong> – das ist der mit Abstand wichtigste Punkt</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Copilot in Excel ist kein Feature der kostenlosen Copilot-Version. Sie brauchen die bezahlte Microsoft 365 Copilot Lizenz. Mehr dazu in unserem <Link to="/wissen/microsoft-copilot-lizenzen" className="text-primary hover:underline">Lizenz-Vergleich</Link>.
          </p>
        </section>

        {/* Daten vorbereiten */}
        <section id="daten-vorbereiten" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500 mb-6">Daten vorbereiten: Die Grundregel</h2>
          <Card className="border-amber-500/30 bg-amber-50/50 mb-6">
            <CardContent className="pt-6">
              <p className="text-gray-800 font-semibold mb-2">Die goldene Regel:</p>
              <p className="text-gray-700">Copilot arbeitet nur mit Daten, die als <strong>formatierte Excel-Tabelle</strong> vorliegen. Ohne Tabelle kein Copilot. Das ist keine Empfehlung – das ist eine technische Voraussetzung.</p>
            </CardContent>
          </Card>

          <p className="mb-4 text-gray-700 leading-relaxed">
            Was heißt das konkret? Excel unterscheidet zwischen einem normalen Zellbereich und einer formatierten Tabelle. Der Unterschied:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-red-700">Normaler Zellbereich</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Einfach Daten in Zellen geschrieben</li>
                  <li>Keine automatische Erweiterung</li>
                  <li>Copilot kann damit <strong>nicht arbeiten</strong></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-green-700">Formatierte Tabelle</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Über <strong>Einfügen → Tabelle</strong> oder <strong>Strg+T</strong> erstellt</li>
                  <li>Benannte Spaltenköpfe, Filter-Pfeile</li>
                  <li>Copilot kann damit <strong>voll arbeiten</strong></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-gray-700 leading-relaxed"><strong>So machen Sie Ihre Daten Copilot-tauglich:</strong></p>
          <ol className="list-decimal list-inside space-y-3 mb-4 text-gray-700">
            <li><strong>Markieren Sie Ihre Daten</strong> (inklusive Spaltenüberschriften)</li>
            <li>Drücken Sie <strong>Strg+T</strong> (Windows) oder <strong>Cmd+T</strong> (Mac)</li>
            <li>Bestätigen Sie, dass die erste Zeile die Überschriften enthält</li>
            <li>Fertig – Copilot kann jetzt mit Ihren Daten arbeiten</li>
          </ol>

          <Card className="border-blue-200 bg-blue-50/50 mb-4">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700"><strong>Tipp für gute Ergebnisse:</strong> Verwenden Sie sprechende Spaltenüberschriften. 'Umsatz Q1 2026' ist besser als 'Spalte_D'. Copilot nutzt die Überschriften, um Ihre Fragen zu verstehen. Vermeiden Sie zusammengeführte Zellen – die bringen Copilot durcheinander.</p>
            </CardContent>
          </Card>
        </section>

        {/* Was Copilot selbstständig kann */}
        <section id="was-copilot-selbststaendig-kann" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500 mb-6">Was Copilot selbstständig kann</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Bei diesen Aufgaben macht Copilot die eigentliche Arbeit. Sie stellen die Frage, Copilot liefert das Ergebnis:
          </p>

          <div className="space-y-6 mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-purple-500 pl-4">Formeln schreiben</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Das ist die Killer-Funktion für Menschen wie mich. Anstatt SVERWEIS-Syntax zu googeln, beschreibe ich einfach, was ich will:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3">
                <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Füge eine Spalte hinzu, die den prozentualen Anteil jeder Zeile am Gesamtumsatz berechnet."`}</code></pre>
              </div>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Copilot erstellt die Formel, fügt die Spalte hinzu und füllt sie automatisch für alle Zeilen. Im Hintergrund verwendet er die richtigen Excel-Funktionen – in diesem Fall eine Division durch die SUMME der Umsatz-Spalte. Sie sehen die Formel und können sie prüfen, bevor Sie bestätigen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-blue-500 pl-4">Daten sortieren und filtern</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Statt manuell Filter zu setzen und Sortierkriterien auszuwählen:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3">
                <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Sortiere die Tabelle nach Umsatz absteigend und zeige nur die Einträge aus Q1 2026."`}</code></pre>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Copilot wendet Filter und Sortierung direkt an. Praktisch, wenn Sie schnell eine bestimmte Sicht auf Ihre Daten brauchen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-green-500 pl-4">Diagramme erstellen</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Eines meiner Lieblings-Features. Anstatt sich durch Diagramm-Assistenten zu klicken:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3">
                <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Erstelle ein Balkendiagramm, das den Umsatz pro Monat zeigt. Hebe den besten Monat farblich hervor."`}</code></pre>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Copilot wählt den passenden Diagrammtyp, beschriftet die Achsen und formatiert das Ganze. Sie können danach manuell anpassen, wenn Ihnen etwas nicht gefällt.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-amber-500 pl-4">Pivot-Tabellen generieren</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Das Feature, das mir die Angst genommen hat. Pivot-Tabellen waren für mich immer eine Blackbox. Mit Copilot sage ich einfach:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3">
                <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Erstelle eine Pivot-Tabelle, die den Umsatz nach Produktkategorie und Quartal aufschlüsselt."`}</code></pre>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Copilot erstellt ein neues Blatt mit der Pivot-Tabelle. Zeilen, Spalten, Werte – alles richtig zugeordnet. Das hätte mich früher eine halbe Stunde und drei YouTube-Tutorials gekostet.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-cyan-500 pl-4">Daten analysieren und Muster erkennen</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Copilot kann Ihre Daten untersuchen und Erkenntnisse liefern, auf die Sie selbst vielleicht nicht gekommen wären:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3">
                <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Analysiere diese Verkaufsdaten. Gibt es Auffälligkeiten oder Trends, die ich kennen sollte?"`}</code></pre>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Copilot findet zum Beispiel saisonale Muster, Ausreißer oder Korrelationen zwischen Spalten. Das ersetzt keinen Datenanalysten, aber es gibt Ihnen einen guten ersten Überblick.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-rose-500 pl-4">Bedingte Formatierung</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Statt sich durch die verschachtelten Menüs der bedingten Formatierung zu kämpfen:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3">
                <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Markiere alle Umsatzwerte unter 1.000 € rot und alle über 10.000 € grün."`}</code></pre>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Die visuelle Aufbereitung macht Ihre Tabelle sofort lesbar – ohne dass Sie die Regeln der bedingten Formatierung kennen müssen.
              </p>
            </div>
          </div>
        </section>

        {/* Wo Copilot nur assistiert */}
        <section id="wo-copilot-assistiert" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-orange-500 mb-6">Wo Copilot nur assistiert</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Bei diesen Aufgaben liefert Copilot Vorschläge, aber Sie müssen die Arbeit selbst machen oder das Ergebnis stark nacharbeiten:
          </p>

          <div className="space-y-4 mb-4">
            <Card className="border-l-4 border-l-orange-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Datenvalidierung und -bereinigung</h3>
                <p className="text-sm text-gray-700">Copilot kann Duplikate finden und inkonsistente Schreibweisen identifizieren. Die eigentliche Bereinigung müssen Sie aber manuell bestätigen oder durchführen. Er schlägt vor, Sie entscheiden.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Komplexe Szenarien und What-If-Analysen</h3>
                <p className="text-sm text-gray-700">Copilot kann einfache Szenarien berechnen ('Was passiert, wenn der Umsatz um 10% steigt?'). Für echte Szenarioanalysen mit mehreren Variablen brauchen Sie aber weiterhin Excel-Know-how oder Power BI.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Interpretation von Ergebnissen</h3>
                <p className="text-sm text-gray-700">Copilot kann Ihnen sagen, dass der Umsatz im März 30% unter dem Vorjahresmonat liegt. <strong>Warum</strong> das so ist, kann er nicht beantworten. Die inhaltliche Einordnung bleibt bei Ihnen.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Makros und VBA</h3>
                <p className="text-sm text-gray-700">Copilot in Excel kann keine Makros erstellen oder VBA-Code schreiben. Dafür nutzen Sie besser den Copilot Chat oder GitHub Copilot in einer Entwicklungsumgebung.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Desktop vs. Web */}
        <section id="desktop-vs-web" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-indigo-500 mb-6">Desktop-App vs. Web: Ein klares Votum</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Ich sage es direkt: <strong>Nutzen Sie die Desktop-App.</strong> Die Web-Version von Excel hat bei Copilot-Funktionen deutliche Einschränkungen.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-green-300 bg-green-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-green-700">Desktop-App (empfohlen)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Voller Copilot-Funktionsumfang</li>
                  <li>Formeln einfügen und bearbeiten</li>
                  <li>Pivot-Tabellen erstellen</li>
                  <li>Diagramme mit allen Optionen</li>
                  <li>Schnellere Verarbeitung</li>
                  <li>Auch mit großen Dateien stabil</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-gray-300 bg-gray-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-gray-500">Web-Version (eingeschränkt)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Grundlegende Copilot-Funktionen</li>
                  <li>Eingeschränkte Formelunterstützung</li>
                  <li>Pivot-Tabellen teilweise möglich</li>
                  <li>Weniger Diagramm-Optionen</li>
                  <li>Bei großen Dateien langsam</li>
                  <li>Einige Features fehlen ganz</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-gray-700 leading-relaxed">
            Ich bin kein Fan der Web-Version für ernsthafte Excel-Arbeit. Für schnelles Nachschauen unterwegs ist sie okay, aber wenn Sie mit Copilot produktiv arbeiten wollen, öffnen Sie die Desktop-App.
          </p>
        </section>

        {/* Praxisbeispiel 1: AB-Test */}
        <section id="praxis-ab-test" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-pink-500 mb-6">Praxisbeispiel 1: AB-Test im Marketing auswerten</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Die Situation:</strong> Sie haben eine Marketing-Kampagne mit zwei Varianten laufen lassen – Version A und Version B. Jetzt haben Sie eine Tabelle mit den Ergebnissen: Impressions, Klicks, Conversions, Kosten, Umsatz. Sie wollen wissen: Welche Variante hat gewonnen?
          </p>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Schritt 1: Daten als Tabelle formatieren</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Ihre Tabelle hat Spalten wie: Kampagnen-Variante, Datum, Impressions, Klicks, Click-Through-Rate, Conversions, Cost-per-Click, Gesamtkosten, Umsatz. Markieren, Strg+T, fertig.
          </p>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Schritt 2: Grundlegende Auswertung</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Vergleiche die Kampagnen-Varianten A und B. Berechne für jede Variante: durchschnittliche Click-Through-Rate, Conversion Rate, Cost per Conversion und Return on Ad Spend (ROAS). Erstelle dafür eine Zusammenfassungstabelle."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Copilot erstellt eine neue Zusammenfassungstabelle mit den berechneten KPIs pro Variante. Im Hintergrund nutzt er MITTELWERT, SUMMEWENNS und Division – Formeln, die ich theoretisch auch selbst schreiben könnte, aber bei denen ich immer mindestens einen Klammer-Fehler mache.
          </p>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Schritt 3: Visualisierung</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Erstelle ein gruppiertes Balkendiagramm, das die wichtigsten KPIs von Variante A und B nebeneinander zeigt: Click-Through-Rate, Conversion Rate und ROAS."`}</code></pre>
          </div>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Schritt 4: Zeitlicher Verlauf</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Zeige den Verlauf der Conversion Rate über die Laufzeit der Kampagne als Liniendiagramm. Eine Linie für Variante A, eine für Variante B."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed">
            So sehen Sie nicht nur, welche Variante insgesamt besser war, sondern auch, ob sich die Performance über die Zeit verändert hat – vielleicht hat Variante B erst in der zweiten Woche angezogen.
          </p>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Schritt 5: Signifikanz einschätzen</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Sind die Unterschiede zwischen Variante A und B statistisch relevant? Berechne die absolute und prozentuale Differenz für die wichtigsten KPIs. Bei welcher Stichprobengröße wäre das Ergebnis statistisch signifikant?"`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Hier kommen wir an eine Grenze: Copilot kann die Differenzen berechnen und eine grobe Einschätzung geben, aber einen vollwertigen statistischen Signifikanztest sollten Sie mit einem spezialisierten Tool durchführen. Trotzdem: Für eine erste Management-Entscheidung reicht die Copilot-Auswertung oft aus.
          </p>
        </section>

        {/* Praxisbeispiel 2: Liquiditätsplanung */}
        <section id="praxis-liquiditaet" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-teal-500 mb-6">Praxisbeispiel 2: Liquiditätsplanung und Prognosen</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Die Situation:</strong> Sie planen ein Training für ein Unternehmen und müssen eine Liquiditätsvorschau für die nächsten 6 Monate erstellen. Einnahmen (Trainingsgebühren), Ausgaben (Trainer-Honorare, Reisekosten, Materialkosten, laufende Fixkosten), und Sie wollen wissen: In welchem Monat wird es eng?
          </p>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Datenstruktur vorbereiten:</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Ihre Tabelle hat Spalten: Monat, Kategorie (Einnahme/Ausgabe), Beschreibung, Betrag, Status (geplant/bestätigt/bezahlt). Formatieren als Tabelle – Sie kennen den Drill.
          </p>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Erstelle eine monatliche Liquiditätsübersicht für die nächsten 6 Monate. Zeige pro Monat: Summe aller Einnahmen, Summe aller Ausgaben, Differenz (Cashflow), und kumulierten Kontostand. Startguthaben ist 15.000 €. Markiere Monate, in denen der kumulierte Kontostand unter 5.000 € fällt."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Copilot baut eine neue Übersichtstabelle mit SUMMEWENNS-Formeln für jeden Monat und berechnet den laufenden Kontostand. Die bedingte Formatierung für die kritischen Monate erstellt er gleich mit.
          </p>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Erstelle ein Liniendiagramm des kumulierten Kontostands über die 6 Monate. Zeichne eine rote Linie bei 5.000 € als Warngrenze ein."`}</code></pre>
          </div>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Prognose erstellen:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Basierend auf den bestätigten Einnahmen und geplanten Ausgaben: Wie entwickelt sich die Liquidität, wenn 20% der geplanten Einnahmen wegfallen? Erstelle eine zweite Spalte mit diesem Worst-Case-Szenario."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Hier arbeitet Copilot mit Formeln, die 80% der geplanten Einnahmen berechnen und den neuen kumulierten Kontostand ermitteln. Nicht raketenwissenschaftlich, aber eine Arbeit, die manuell fehleranfällig und zeitaufwändig wäre.
          </p>

          <Card className="border-blue-200 bg-blue-50/50 mb-4">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700"><strong>Aus der Praxis:</strong> Ich nutze genau diesen Workflow für die Copilotenschule. Anfang jeden Monats aktualisiere ich die Daten und lasse Copilot die Prognose neu rechnen. Das dauert 5 Minuten statt einer Stunde – und ich vertraue den Zahlen mehr als meinen eigenen Formeln.</p>
            </CardContent>
          </Card>
        </section>

        {/* Praxisbeispiel 3: Business Plan */}
        <section id="praxis-business-plan" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-violet-500 mb-6">Praxisbeispiel 3: Business Plan Finanzplanung</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Die Situation:</strong> Sie bauen einen Business Plan und brauchen die Finanzseiten: Umsatzplanung, Kostenstruktur, Break-Even-Analyse, Ergebnisrechnung. Normalerweise der Teil, bei dem Betriebswirte glänzen und Werbe-Studenten schwitzen.
          </p>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Umsatzplanung:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Ich habe eine Tabelle mit Produkten/Dienstleistungen, Einzelpreisen und geschätzter Stückzahl pro Monat. Berechne den monatlichen Umsatz pro Produkt und den Gesamtumsatz. Füge dann eine Zeile mit dem kumulierten Jahresumsatz hinzu."`}</code></pre>
          </div>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Kostenstruktur:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Erstelle eine Kostenübersicht mit fixen und variablen Kosten. Fixkosten: Miete, Software, Versicherung (gleichbleibend pro Monat). Variable Kosten: proportional zum Umsatz mit einem Faktor von 15%. Berechne die monatlichen Gesamtkosten."`}</code></pre>
          </div>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Break-Even-Analyse:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Ab welchem Monat übersteigt der kumulierte Umsatz die kumulierten Kosten? Markiere diesen Break-Even-Punkt in der Tabelle und erstelle ein Diagramm, das Umsatz und Kosten als Linien zeigt – mit dem Break-Even-Punkt markiert."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Das ist für mich das beeindruckendste Beispiel. Copilot nimmt die Umsatz- und Kostendaten, findet den Schnittpunkt und visualisiert ihn. In einem Investorengespräch kann ich dieses Diagramm direkt zeigen.
          </p>

          <p className="mb-3 text-gray-700 leading-relaxed"><strong>Ergebnisrechnung:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap break-words"><code>{`Prompt: "Fasse die Finanzplanung als monatliche Ergebnisrechnung zusammen: Umsatz, variable Kosten, Deckungsbeitrag, Fixkosten, Ergebnis vor Steuern. Formatiere negative Werte rot. Füge eine Spalte mit dem prozentualen Anteil am Umsatz hinzu."`}</code></pre>
          </div>

          <Card className="border-green-200 bg-green-50/50 mb-4">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700"><strong>Wichtig:</strong> Copilot erstellt die Struktur und die Formeln. Die Zahlen selbst – Ihre Preise, Ihre Kosten, Ihre Stückzahlen – müssen von Ihnen kommen. Copilot kann keine Markteinschätzung vornehmen. Er rechnet mit dem, was Sie ihm geben.</p>
            </CardContent>
          </Card>
        </section>

        {/* Prompt-Sammlung */}
        <section id="prompt-sammlung" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500 mb-6">Prompt-Sammlung für Excel</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Hier sind die Prompts, die ich in meinem Trainingsalltag am häufigsten verwende. Alle auf Deutsch – das funktioniert in den meisten Fällen problemlos.
          </p>

          <div className="space-y-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Datenanalyse</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="bg-gray-50 p-2 rounded">'Fasse die wichtigsten Erkenntnisse aus diesen Daten zusammen.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Welche Trends erkennst du in den Daten der letzten 12 Monate?'</li>
                  <li className="bg-gray-50 p-2 rounded">'Gibt es Ausreißer in der Spalte Umsatz? Markiere sie.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Korrelieren die Spalten Werbeausgaben und Neukundengewinnung?'</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Formeln und Berechnungen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="bg-gray-50 p-2 rounded">'Füge eine Spalte hinzu, die die Veränderung zum Vormonat in Prozent berechnet.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Berechne den gleitenden Durchschnitt über 3 Monate für die Umsatz-Spalte.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Erstelle eine WENN-Formel: Wenn Umsatz über 5.000, dann Premium-Kunde, sonst Standard.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Wie hoch ist der Durchschnittsumsatz pro Kunde, gruppiert nach Region?'</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Visualisierung</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="bg-gray-50 p-2 rounded">'Erstelle ein Kreisdiagramm der Umsatzanteile nach Produktgruppe.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Zeige den monatlichen Umsatzverlauf als Liniendiagramm mit Trendlinie.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Erstelle ein Säulendiagramm, das Ist-Umsatz und Soll-Umsatz gegenüberstellt.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Formatiere die Tabelle so, dass die Top-10 und Bottom-10 Werte hervorgehoben sind.'</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pivot-Tabellen und Zusammenfassungen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="bg-gray-50 p-2 rounded">'Erstelle eine Pivot-Tabelle mit Abteilung als Zeilen und Quartal als Spalten.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Fasse die Daten nach Kategorie zusammen: Anzahl, Durchschnitt, Minimum, Maximum.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Erstelle eine Kreuztabelle: Produkte vs. Vertriebsregionen mit Umsatz als Werte.'</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Datenaufbereitung</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="bg-gray-50 p-2 rounded">'Finde und markiere doppelte Einträge in der Spalte Kundennummer.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Teile die Spalte Name in Vorname und Nachname auf.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Füge eine Spalte hinzu, die das Quartal aus dem Datum berechnet.'</li>
                  <li className="bg-gray-50 p-2 rounded">'Standardisiere die Schreibweise in der Spalte Land (DE, Deutschland, germany → Deutschland).'</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tipps für bessere Prompts */}
        <section id="tipps-prompts" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-amber-500 mb-6">Tipps für bessere Excel-Prompts</h2>

          <div className="space-y-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-amber-500 pl-4">1. Spaltennamen verwenden</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Copilot versteht Ihre Daten über die Spaltenüberschriften. Referenzieren Sie immer den exakten Spaltennamen:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-700 font-medium mb-1">Vage</p>
                  <p className="text-sm text-gray-600">'Berechne den Durchschnitt der dritten Spalte.'</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700 font-medium mb-1">Präzise</p>
                  <p className="text-sm text-gray-600">'Berechne den Durchschnitt der Spalte Umsatz Q1.'</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-amber-500 pl-4">2. Erwartetes Ergebnis beschreiben</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Je genauer Sie sagen, was das Ergebnis sein soll, desto besser:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-700 font-medium mb-1">Unklar</p>
                  <p className="text-sm text-gray-600">'Analysiere die Daten.'</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700 font-medium mb-1">Klar</p>
                  <p className="text-sm text-gray-600">'Erstelle eine Zusammenfassung mit Gesamtumsatz pro Region, sortiert absteigend, als neue Tabelle.'</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-amber-500 pl-4">3. Schrittweise vorgehen</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Lieber drei einfache Prompts als ein überkomplexer. Copilot arbeitet besser, wenn er pro Anfrage eine klare Aufgabe hat.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-l-4 border-l-amber-500 pl-4">4. Sprache: Deutsch oder Englisch?</h3>
              <p className="mb-3 text-gray-700 leading-relaxed">
                Kurze Antwort: <strong>Deutsch funktioniert gut.</strong> Für die allermeisten Aufgaben liefert ein deutscher Prompt genauso gute Ergebnisse wie ein englischer. Es gibt allerdings Situationen, in denen ein englischer Prompt minimal präziser ist – vor allem bei statistischen Fachbegriffen oder sehr spezifischen Formelkonstruktionen. Mein Tipp: Starten Sie auf Deutsch. Wenn das Ergebnis nicht passt, versuchen Sie den gleichen Prompt auf Englisch.
              </p>
            </div>
          </div>
        </section>

        {/* Grenzen */}
        <section id="grenzen" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500 mb-6">Wo Copilot an seine Grenzen kommt</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Ich verspreche in meinen Trainings nie das Blaue vom Himmel. Hier die ehrliche Bilanz, wo Copilot in Excel (noch) nicht gut funktioniert:
          </p>

          <div className="space-y-4 mb-4">
            <Card className="border-l-4 border-l-red-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Große Datensätze (&gt; 30.000 Zeilen)</h3>
                <p className="text-sm text-gray-700">Ab einer gewissen Datenmenge werden die Antworten ungenau oder Copilot meldet, dass er die Daten nicht vollständig verarbeiten kann. Für wirklich große Datenmengen ist Power BI das bessere Werkzeug.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Komplexe verschachtelte Formeln</h3>
                <p className="text-sm text-gray-700">Wenn Sie eine INDEX/VERGLEICH-Formel mit drei verschachtelten WENN-Bedingungen brauchen, kommt Copilot manchmal ins Stolpern. Er erstellt eine Formel, die auf den ersten Blick richtig aussieht, aber einen Randfall nicht abdeckt. <strong>Prüfen Sie komplexe Formeln immer.</strong></p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Unstrukturierte Daten</h3>
                <p className="text-sm text-gray-700">Wenn Ihre Tabelle zusammengeführte Zellen, leere Zeilen zwischen Datenblöcken oder inkonsistente Spaltenüberschriften hat, liefert Copilot schlechte Ergebnisse. Die Lösung: Daten erst aufräumen, dann Copilot fragen.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Mehrere Arbeitsblätter gleichzeitig</h3>
                <p className="text-sm text-gray-700">Copilot arbeitet aktuell mit der Tabelle auf dem aktiven Arbeitsblatt. Übergreifende Analysen über mehrere Blätter sind eingeschränkt möglich. Wenn Sie Daten aus verschiedenen Blättern vergleichen wollen, konsolidieren Sie sie erst auf einem Blatt.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-400">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Zahlen erfinden (Halluzinationen)</h3>
                <p className="text-sm text-gray-700">Bei Analyse-Fragen kann es vorkommen, dass Copilot Zahlen liefert, die nicht in Ihren Daten stehen. Das passiert selten bei Formeln (die können Sie in der Zelle prüfen), aber häufiger bei textuellen Zusammenfassungen. Deshalb: Ergebnisse immer stichprobenartig gegen die Rohdaten prüfen. Mehr dazu in unserem Artikel über <Link to="/wissen/ki-halluzinationen-vermeiden" className="text-primary hover:underline">KI-Halluzinationen vermeiden</Link>.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Weiterführende Artikel */}
        <section id="weiterfuehrend" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-sky-500 mb-6">Copilot in anderen Apps</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Excel ist nur eine von vielen Apps, in denen Copilot arbeitet. Hier finden Sie unsere weiteren Praxis-Guides:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Link to="/wissen/copilot-fuer-word" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="pt-4">
                  <p className="font-semibold text-primary mb-1">Copilot für Word</p>
                  <p className="text-sm text-gray-600">Dokumente schneller erstellen, zusammenfassen und überarbeiten.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/wissen/copilot-tipps-tricks-produktivitaet" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="pt-4">
                  <p className="font-semibold text-primary mb-1">22 Copilot Tipps & Tricks</p>
                  <p className="text-sm text-gray-600">Profi-Tipps für alle Microsoft 365 Apps – inklusive Excel.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/wissen/prompt-engineering" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="pt-4">
                  <p className="font-semibold text-primary mb-1">Prompt Engineering</p>
                  <p className="text-sm text-gray-600">Die Grundlagen des Promptings – nicht nur für Excel.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/wissen/copilot-sicherheit-datenschutz" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="pt-4">
                  <p className="font-semibold text-primary mb-1">Copilot & Datenschutz</p>
                  <p className="text-sm text-gray-600">Was passiert mit Ihren Daten, wenn Copilot sie analysiert?</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Fazit */}
        <section id="fazit" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-600 mb-6">Fazit</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Copilot macht aus mir keinen Excel-Experten. Aber er macht etwas Besseres: Er erlaubt mir, <strong>die Fragen zu stellen, die ich schon immer stellen wollte</strong> – ohne die technische Hürde der Formeln und Funktionen.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Für Pivot-Tabellen brauche ich keine YouTube-Tutorials mehr. Für einen AB-Test brauche ich keinen Analyst. Und für meine Liquiditätsplanung brauche ich keinen Steuerberater – zumindest nicht für den Entwurf.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Die Grundregel bleibt: <strong>Gute Daten rein, gute Ergebnisse raus.</strong> Wenn Ihre Daten als formatierte Tabelle vorliegen und saubere Spaltenüberschriften haben, leistet Copilot in Excel erstaunlich viel. Wenn nicht, hilft auch die beste KI nichts.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Und prüfen Sie die Ergebnisse – vor allem bei komplexen Berechnungen. Copilot ist ein Assistent, kein Buchhalter.
          </p>
        </section>

        {/* FAQ-Bereich */}
        <section id="faq" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-gray-300 mb-6">Häufig gestellte Fragen</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.name}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Autor-Bio */}
        {author && (
          <section className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={author.image}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{author.name}</h3>
                <p className="text-sm text-primary mb-2">{author.role}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{author.bio}</p>
                <div className="flex gap-3">
                  {author.sameAs?.filter(url => url.includes('linkedin')).map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  ))}
                  {author.sameAs?.filter(url => url.includes('twitter') || url.includes('x.com')).map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

      </ContentLayout>
    </>
  );
};

export default CopilotFuerExcel;
