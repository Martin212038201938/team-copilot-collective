import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "copilot-update-juli-2026";
const PAGE_TITLE = "Copilot Update Juli 2026";

const LINK = "text-blue-700 dark:text-blue-400 hover:underline";
const EXT = "text-blue-700 dark:text-blue-400 hover:underline break-all";

const CopilotUpdateJuli2026 = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "wichtigste", title: "Das Wichtigste diesen Monat", level: 2 },
    { id: "neu-pro-app", title: "Neu pro App", level: 2 },
    { id: "admins", title: "Für Admins & Datenschutzbeauftragte", level: 2 },
    { id: "was-tun", title: "Was jetzt zu tun ist", level: 2 },
    { id: "faq", title: "Häufige Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 },
  ];

  const faqs = [
    {
      name: "Welche Neuerung sollte ich meinem Team diesen Monat zeigen?",
      answer:
        "Copilot Notebooks. Material sammeln und daraus per Klick ein Word-Dokument, eine Excel-Tabelle oder ein PowerPoint-Deck erzeugen – das spart bei den meisten Teams sofort Zeit, ohne dass jemand neue Prompt-Techniken lernen muss. Vision und Modellauswahl sind die spannenderen Schlagzeilen, im Alltag aber seltener relevant.",
    },
    {
      name: "Was müssen wir als Admin oder Datenschutzbeauftragte vor dem Rollout prüfen?",
      answer:
        "Vier Punkte: die Wasserzeichen-Richtlinie im Cloud Policy Service (sie greift nur für Video und Audio, nicht für Bilder), die Vision-Einstellung im Admin Center, den Freigabeprozess für selbstgebaute Agenten im Agent Store, und die Frage, ob die Outlook-Erweiterung für Nutzer ohne Copilot-Lizenz in Ihrer Datenschutzdokumentation abgedeckt ist.",
    },
    {
      name: "Brauchen wir für Vision eine kostenpflichtige Copilot-Lizenz?",
      answer:
        "Ja. Vision funktioniert nur mit einer Microsoft-365-Copilot-Lizenz und nur innerhalb einer laufenden Sprachunterhaltung. Ohne Lizenz gibt es weder Bildschirm- noch Kamerafreigabe. Der Admin kann Vision zentral abschalten, ohne die Sprachfunktion insgesamt zu deaktivieren.",
    },
    {
      name: "Was ändert sich für Nutzer ohne kostenpflichtige Copilot-Lizenz?",
      answer:
        "Die spürbarste Änderung ist Outlook: Copilot Chat kann dort künftig über das gesamte Postfach, den Kalender und Besprechungen nachdenken – laut Microsoft ausdrücklich ohne Microsoft-365-Copilot-Lizenz. Wer im Unternehmen bisher nach Lizenzen unterschieden hat, sollte diese Annahme neu prüfen.",
    },
    {
      name: "Welches Modell soll unser Team benutzen – GPT-5.6, Claude Sonnet 5 oder Claude Opus 5?",
      answer:
        "Für die meisten Alltagsaufgaben spielt es keine Rolle; GPT-5.6 ist voreingestellt und bleibt die vernünftige Grundeinstellung. Claude Sonnet 5 ist auf mehrschrittige Erstellungsaufgaben ausgelegt, Claude Opus 5 seit dem 25. Juli zusätzlich in Word, Excel, PowerPoint, Chat, Cowork und Copilot Studio und dort für längere, komplexere Aufgaben gedacht. Praktikabler Rat: bei unbefriedigenden Ergebnissen das Modell wechseln, statt den Prompt ein viertes Mal umzuformulieren.",
    },
    {
      name: "Wie lange speichert Microsoft, was wir über Vision teilen?",
      answer:
        "Geteilte Audio- und Videodaten werden nach 48 Stunden gelöscht; sie dienen laut Microsoft dazu, Feedback geben zu können. Textprotokolle der Sprachunterhaltungen werden wie normale Chatverläufe in der Microsoft-365-Copilot-App behandelt. Copilot kann während einer Vision-Sitzung nichts auf dem Bildschirm anklicken oder verändern.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description":
          "Die wichtigsten Microsoft-365-Copilot-Neuerungen im Juli 2026: GPT-5.6 wird bevorzugtes Modell, Claude Sonnet 5 und Claude Opus 5 kommen in die Office-Apps, Vision teilt Bildschirm und Kamera – plus alle Admin- und Datenschutz-Themen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-08-10",
        "dateModified": "2026-08-10",
        "keywords": [
          "Copilot Update Juli 2026",
          "Microsoft 365 Copilot News",
          "GPT-5.6 Copilot",
          "Claude Opus 5 Microsoft 365",
          "Copilot Vision",
          "Copilot Notebooks",
        ],
        "articleSection": "Copilot News",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl,
        },
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url,
        })),
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Copilot Update Juli 2026 | copilotenschule.de"
        description="Microsoft-365-Copilot-Neuerungen im Juli 2026: GPT-5.6 als bevorzugtes Modell, Claude Opus 5 in den Office-Apps, Vision mit Bildschirmfreigabe – plus Admin- & Datenschutz-Themen."
        keywords={[
          "Copilot Update Juli 2026",
          "Microsoft 365 Copilot News",
          "GPT-5.6 Copilot",
          "Claude Opus 5 Microsoft 365",
          "Copilot Vision",
          "Copilot Neuerungen Juli 2026",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-08-10T09:00:00+02:00"
        modifiedTime="2026-08-10T09:00:00+02:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Update Juli 2026", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Der kuratierte Monatsüberblick: Was ist neu in der Copilot-Welt? Die wenigen wirklich relevanten Neuerungen aus der Juli-Ausgabe – mit Quelle, Einordnung und konkretem Nutzen."
        lastUpdated="10. August 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-orange-800 dark:text-orange-300">
              Kurz und klar
            </CardTitle>
          </CardHeader>
          <CardContent className="text-orange-900 dark:text-orange-200">
            <p>
              Im Juli ist die Modellfrage endgültig zur Alltagsfrage geworden: GPT-5.6 ist seit dem
              9. Juli das bevorzugte Modell, und Anthropic rückte innerhalb eines Monats gleich
              zweimal nach – erst Claude Sonnet 5, dann Ende Juli Claude Opus 5 quer durch Word,
              Excel und PowerPoint. Das zweite große Thema ist Vision: Copilot sieht auf Zuruf den
              Bildschirm oder die Handykamera mit, allerdings nur im Sprachchat und nur mit
              kostenpflichtiger Lizenz. Eine ehrliche Einordnung vorweg – die Schlagzeilen macht die
              Modellauswahl, Zeit spart diesen Monat etwas anderes: Aus einem Copilot Notebook
              fallen jetzt fertige Word-, Excel- und PowerPoint-Dateien heraus.
            </p>
          </CardContent>
        </Card>

        <section id="wichtigste" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Das Wichtigste diesen Monat</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>GPT-5.6 ist seit dem 9. Juli das bevorzugte Modell.</strong> Es greift quer
                durch Copilot Chat, Word, Excel, PowerPoint und Cowork. Spürbar ist der Unterschied
                vor allem bei mehrstufigen Aufgaben mit vielen Zwischenschritten – bei „Fass mir
                diese Mail zusammen" merkt man ihn nicht.{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/microsoft365copilotblog/available-today-openai%e2%80%99s-gpt-5-6-in-microsoft-365-copilot/4533152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Available today – GPT-5.6 in Microsoft 365 Copilot
                </a>
              </li>
              <li>
                <strong>Claude Sonnet 5 kam am 2. Juli dazu</strong> – zunächst in Cowork und Copilot
                in PowerPoint, im Lauf des Monats auch in Copilot in Word. Microsoft positioniert das
                Modell für agentische Arbeit, also mehrschrittige Aufgaben wie „bau mir aus diesen
                Quellen ein Dokument". Claude selbst steht im Copilot Chat schon seit Juni zur Wahl;
                neu ist die Verankerung in den Office-Apps. Hintergrund dazu in unserem Beitrag{" "}
                <Link to="/wissen/claude-in-microsoft-copilot" className={LINK}>
                  Claude in Microsoft Copilot
                </Link>
                .
              </li>
              <li>
                <strong>Claude Opus 5 folgte am 25. Juli</strong> – in Word, Excel, PowerPoint,
                Copilot Chat, Cowork und Copilot Studio. Damit steht erstmals ein
                Nicht-OpenAI-Spitzenmodell in der vollen Breite der Produktivitätssuite bereit, ohne
                Zusatzlizenz. Das ist die eigentliche Nachricht des Monats: Die Modellauswahl ist
                kein Experimentierfeld mehr, sondern normaler Funktionsumfang – und gehört damit in
                Ihre interne Nutzungsrichtlinie, nicht in die Fußnote.{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/microsoft365copilotblog/available-today-anthropic-claude-opus-5-in-microsoft-365-copilot/4540524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Available today – Anthropic Claude Opus 5 in Microsoft 365 Copilot
                </a>
              </li>
              <li>
                <strong>Vision: Copilot schaut auf Wunsch beim Bildschirm mit.</strong> Der Ablauf
                ist eng gefasst – die Freigabe läuft ausschließlich innerhalb einer laufenden
                Sprachunterhaltung, sie ist auf die Sitzung begrenzt, und Copilot kann nichts
                anklicken oder verändern. Voraussetzung ist eine Microsoft-365-Copilot-Lizenz. So
                nutzen Sie es: Sprachchat starten (unter Windows mit der Copilot-Taste oder Win+C),
                Bildschirmfreigabe starten, Fenster oder ganzen Desktop teilen, Frage stellen. Mobil
                läuft es über das Kamerasymbol.{" "}
                <a
                  href="https://support.microsoft.com/en-us/microsoft-365-copilot/use-vision-microsoft-365-copilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Use vision in Microsoft 365 Copilot
                </a>
              </li>
              <li>
                <strong>
                  Die Word-, Excel- und PowerPoint-Agenten lassen sich per @-Erwähnung in einen
                  Copilot-Chat holen.
                </strong>{" "}
                Damit entsteht ein Dokument, eine Tabelle oder ein Deck, ohne dass man die
                Copilot-App verlässt. Das klingt nach Kosmetik, verschiebt aber den Einstiegspunkt:
                Viele Nutzer beginnen mit einer Frage und wissen erst danach, dass am Ende ein
                Dokument stehen soll. Wie die Agenten in den Apps selbst arbeiten, steht in unserem
                Beitrag zum{" "}
                <Link to="/wissen/copilot-agent-mode-word-excel-powerpoint" className={LINK}>
                  Agent Mode in Word, Excel und PowerPoint
                </Link>
                .
              </li>
            </ul>
          </div>
        </section>

        <section id="neu-pro-app" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Neu pro App</h2>

          <h3 className="text-xl font-semibold mb-1 mt-4">
            Microsoft 365 Copilot App und Copilot Chat
          </h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Antworten enthalten jetzt Bilder aus Dateien und Besprechungen direkt inline, statt
                nur Text zu liefern (Windows, Web). Ein Klick auf das Bild führt zur Quelldatei.
              </li>
              <li>
                Ein eingebautes Screenshot-Werkzeug nimmt einen Bildausschnitt auf und hängt ihn
                sofort an den Prompt (Windows).{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=558105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 558105
                </a>
              </li>
              <li>
                Copilot kann E-Mail-Anhänge auflisten – gesendet wie empfangen, gefiltert nach
                Absender oder Zeitraum, auf allen Plattformen. So nutzen Sie es: „Liste mir alle
                Anhänge, die ich im Juli von der Rechtsabteilung bekommen habe."{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=497909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 497909
                </a>
              </li>
              <li>
                SharePoint-Listen lassen sich über das Context-IQ-Menü als Kontext an einen Prompt
                hängen (Web). Für alle, die ihre Projektsteuerung in Listen führen, ist das der
                praktischste Punkt in dieser Aufzählung.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=422308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 422308
                </a>
              </li>
              <li>
                Zitierte Word-, Excel-, PowerPoint- und PDF-Dateien öffnen sich im Chat selbst statt
                in einem neuen Tab. Einschränkung, die man kennen sollte: nicht in der Mobil-App,
                nicht in Copilot in Edge und nicht in den Office-eigenen Copiloten.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=548641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 548641
                </a>
              </li>
              <li>
                Bei der Bilderzeugung im Chat lassen sich Stil, Format und das Brand Kit der eigenen
                Organisation auswählen; für das Brand Kit ist eine Microsoft-365-Copilot-Lizenz
                nötig. Ergänzend erzeugt Copilot ein Brand Kit inzwischen automatisch aus einem
                hochgeladenen Markenrichtlinien-Dokument.
              </li>
              <li>
                Die Prompt Gallery lässt sich unternehmensweit bespielen: Admins bauen eigene
                Prompt-Sammlungen und verteilen sie an den ganzen Tenant. Wer Copilot-Trainings
                durchführt, hat damit endlich einen Ort, an dem die guten Prompts aus dem Training
                auch nach dem Training noch liegen.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=486695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 486695
                </a>
              </li>
              <li>
                Prompts an deklarative Agenten wie Analyst oder Idea Coach lassen sich wiederkehrend
                planen.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=531759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 531759
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-1 mt-4">Copilot Notebooks und OneNote</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Aus einem Notebook heraus entstehen fertige Word-Dokumente, Excel-Tabellen und
                PowerPoint-Präsentationen – jeweils auf dem gesammelten Material gegroundet. So
                nutzen Sie es: Notebook öffnen, links „Quick create" wählen, Zielformat anklicken,
                Ergebnis in der jeweiligen App nachschärfen. Roadmap{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=558934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  558934
                </a>
                ,{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=559480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  559480
                </a>{" "}
                und{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=558938"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  558938
                </a>
                . Wie Notebooks, Pages und Loop zusammenspielen, haben wir in{" "}
                <Link
                  to="/wissen/copilot-pages-loop-notebooks-sharepoint-workflows"
                  className={LINK}
                >
                  Pages, Loop und Notebooks
                </Link>{" "}
                aufgeschrieben.
              </li>
              <li>
                Mind Maps visualisieren den Inhalt eines Notebooks als interaktive Themenkarte;
                einzelne Knoten liefern Zusammenfassungen, Rückfragen laufen über den Notebook-Chat.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=559029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 559029
                </a>
              </li>
              <li>
                Copilot Notebooks sind jetzt auch in OneNote im Browser sowie auf iPhone und iPad
                verfügbar. Roadmap{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=511797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  511797
                </a>{" "}
                und{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=511794"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  511794
                </a>
              </li>
              <li>
                Auf dem iPhone gibt es eine multimodale Erfassung: Audio transkribieren, Fotos machen
                und tippen in einer Sitzung, am Ende steht eine strukturierte Copilot-Seite im
                gewählten Notebook. Gedacht ist das für Whiteboard-Sessions und Gespräche ohne
                Teams-Meeting – genau die Lücke, an der Copilot bislang blind war.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=559095"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 559095
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-1 mt-4">Excel</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Copilot in Excel zeigt Inline-Zitate. Man sieht per Hover, aus welcher Datei oder
                welchem Bericht eine Aussage stammt, und kann die Quelle im Seitenbereich öffnen. Das
                ist die wichtigste Excel-Neuerung des Monats, weil sie aus einer Blackbox-Antwort
                etwas Prüfbares macht.
              </li>
              <li>
                Power-BI-Grounding: Ein Power-BI-Bericht lässt sich über die Auswahl von
                Arbeitsinhalten anhängen; Copilot rechnet dann auf den Daten und Definitionen dieses
                Berichts, unter Beachtung der bestehenden Zeilenebenen-Sicherheit. Kein Export, kein
                manuelles Abgleichen mehr.
              </li>
              <li>
                Zwei neue Design-Skills: <code>@brand-kit</code> überträgt Farbpalette, Typografie
                und Logos der Organisation auf Diagramme und Tabellen, <code>@theme-design</code>{" "}
                sorgt für ein stimmiges Farb- und Layoutbild.
              </li>
              <li>
                Copilot arbeitet jetzt auch in Arbeitsmappen, in denen AutoSpeichern ausgeschaltet
                ist. Klingt banal, war aber für viele Finanzteams der Grund, Copilot in Excel gar
                nicht erst zu öffnen. Praxisnahe Einstiegshilfe:{" "}
                <Link to="/wissen/copilot-fuer-excel" className={LINK}>
                  Copilot für Excel
                </Link>
                .{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/excelblog/whats-new-in-excel-july-2026/4523403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: What's New in Excel, Juli 2026
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-1 mt-4">PowerPoint</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Der Agent Mode baut Präsentationen auf Basis von Work IQ, zieht also Dateien,
                Besprechungen und Mails selbstständig heran, statt darauf zu warten, dass man sie
                anhängt (Windows).{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555874"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 555874
                </a>
              </li>
              <li>
                Ein Teams-Meeting oder ein Teams-Chat lässt sich als Quelle für ein neues Deck
                referenzieren. So nutzen Sie es: „Mach mir aus dem Steuerkreis von gestern zehn
                Folien für den Vorstand." Roadmap{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555885"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  555885
                </a>
                ,{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555884"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  555884
                </a>{" "}
                und{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555883"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  555883
                </a>
              </li>
              <li>
                Bestehende Präsentationen dienen als Inhalts- und Stilvorlage – Text übernehmen, ein
                Design auf ein anderes Deck anwenden oder beides kombinieren. Für Firmen mit
                gepflegter Master-Vorlage ist das die stille Erleichterung des Monats. Roadmap{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  555887
                </a>
                ,{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  555889
                </a>{" "}
                und{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555892"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  555892
                </a>
              </li>
              <li>
                Zur Bilderzeugung steht in PowerPoint zusätzlich das Modell MAI-Image-2-Efficient
                bereit, ausgelegt auf Tempo und schnelles Durchprobieren von Varianten.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-1 mt-4">Word</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Audio Overview lässt sich unterbrechen: Man hört sich eine Zusammenfassung an und
                stellt zwischendurch per Stimme Rückfragen, ohne die Wiedergabe zu verlassen (Web).
                Wer Word-Copilot systematisch nutzen will, findet den Einstieg in{" "}
                <Link to="/wissen/copilot-fuer-word" className={LINK}>
                  Copilot für Word
                </Link>
                .{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=523206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 523206
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-1 mt-4">Outlook</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Copilot Chat in Outlook denkt nicht mehr nur über den geöffneten Thread nach, sondern
                über das gesamte Postfach, den Kalender, Besprechungen und weitere
                Microsoft-365-Daten, auf die man ohnehin Zugriff hat. Wichtig: Diese Erweiterung
                greift laut Microsoft ausdrücklich <strong>ohne</strong>{" "}
                Microsoft-365-Copilot-Lizenz. Wer im Unternehmen bislang argumentiert hat, Copilot
                hätten ja nur zwölf Leute, sollte diesen Punkt lesen, bevor die erste Rückfrage aus
                dem Betriebsrat kommt – siehe dazu auch{" "}
                <Link to="/wissen/copilot-betriebsrat" className={LINK}>
                  Copilot und Betriebsrat
                </Link>
                .{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=531910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 531910
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-1 mt-4">SharePoint und OneDrive</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Copilot in SharePoint plant und baut Lösungen auf Zuruf: Auf der SharePoint-Startseite
                unter „Build" beschreibt man in einem Satz, was entstehen soll, und bekommt eine
                generierte Site zum Nachschärfen.
              </li>
              <li>
                In der Dateivorschau von OneDrive und SharePoint sitzt ein schwebendes Copilot-Symbol
                unten rechts, mit auf den Dateityp zugeschnittenen Vorschlägen.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=513432"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 513432
                </a>
              </li>
              <li>
                Ist eine Dokumentbibliothek oder ein Ordner angehängt, wertet Copilot jetzt auch die
                Spalten-Metadaten aus. Wer seine Bibliotheken sauber verschlagwortet hat, wird hier
                belohnt – wer nicht, merkt es jetzt.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=516044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 516044
                </a>
              </li>
              <li>
                Copilot kann eine Datei mitten im Chat für eine bestimmte Person freigeben, ohne dass
                man den Freigabedialog suchen muss.{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/spblog/what%E2%80%99s-new-in-copilot-in-sharepoint-july-2026/4535420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Copilot in SharePoint, Juli 2026
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-1 mt-4">
            Agenten, Agent Builder und Copilot Studio
          </h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                Eine SharePoint-Liste lässt sich als Wissensquelle für einen Agenten nutzen. Grenzen
                dieser Version: eine Liste pro Agent, bis zu 20.000 Elemente, Anhänge und
                Nachschlagespalten werden noch nicht unterstützt. Wie Sie Agenten sinnvoll
                zuschneiden, steht in{" "}
                <Link to="/wissen/copilot-studio" className={LINK}>
                  Copilot Studio
                </Link>
                .{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/extensibility/agent-builder-add-knowledge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Add knowledge sources to your declarative agent
                </a>
              </li>
              <li>
                Agenten lassen sich aus Copilot Studio heraus direkt an ein Teams-Team verteilen,
                inklusive Benachrichtigung im Hauptkanal und Installationslink.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=557947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 557947
                </a>
              </li>
              <li>
                Agenten auf Basis des Model Context Protocol sind in Word, Excel, PowerPoint, Outlook
                und Catalyst nutzbar.
              </li>
              <li>
                Die Landing Page des Employee-Self-Service-Agenten lässt sich mit Akzentfarben,
                kategorisierten Startprompts und Quick Links an die eigene Organisation anpassen.{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/customize"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Customize the Employee Self-Service agent
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="admins" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Für Admins &amp; Datenschutzbeauftragte
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Wasserzeichen für KI-generierte Inhalte</strong> lassen sich per Richtlinie
                erzwingen – allerdings nur für Video und Audio, nicht für Bilder. Die Einstellung
                existiert ausschließlich im Cloud Policy Service; für Bilder entscheiden die Nutzer
                selbst unter „Einstellungen und Datenschutz" auf myaccount.microsoft.com. Dass Bilder
                außen vor bleiben, ist die Lücke, die man in einer Betriebsvereinbarung sauber
                benennen sollte. Einordnung dazu:{" "}
                <Link to="/wissen/ki-kennzeichnungspflicht-eu-ai-act" className={LINK}>
                  KI-Kennzeichnungspflicht
                </Link>
                .{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=547831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 547831
                </a>
              </li>
              <li>
                <strong>Von Copilot erzeugte Dateien erben Vertraulichkeitsbezeichnungen</strong> –
                und zwar die höchste, die in den herangezogenen Quelldaten gefunden wird. Klappt das
                nicht, bekommt der Nutzer einen Hinweis, bevor er die Datei teilt oder ablegt.
              </li>
              <li>
                <strong>Die Outlook-Erweiterung greift ohne kostenpflichtige Lizenz.</strong> Copilot
                Chat schließt dort künftig das gesamte Postfach und den Kalender ein. Das ist kein
                Versehen, sondern so dokumentiert – und der Punkt, den ich diesen Monat als erstes
                mit dem Datenschutzbeauftragten durchgehen würde. Was Copilot dabei überhaupt sieht,
                steht in{" "}
                <Link to="/wissen/welche-daten-sieht-microsoft-365-copilot" className={LINK}>
                  Welche Daten sieht Microsoft 365 Copilot?
                </Link>{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=531910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 531910
                </a>
              </li>
              <li>
                <strong>Vision lässt sich zentral abschalten</strong>, ohne dass die Sprachfunktion
                insgesamt wegfällt. Für die Bewertung wichtig: Die Freigabe ist nutzerinitiiert und
                sitzungsgebunden, Copilot kann nichts auf dem Bildschirm bedienen, es gibt keine
                Erinnerung über Sitzungen hinweg, und geteilte Audio- und Videodaten werden nach 48
                Stunden gelöscht.{" "}
                <a
                  href="https://support.microsoft.com/en-us/microsoft-365-copilot/how-vision-microsoft-365-works"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: How vision in Microsoft 365 Copilot works
                </a>
              </li>
              <li>
                <strong>Agent Store mit Freigabeprozess:</strong> Selbstgebaute Agenten aus dem Agent
                Builder können unter „Built by your org" veröffentlicht werden – nach Prüfung und
                Freigabe im Microsoft 365 Admin Center. Wer bisher Schatten-Agenten in einzelnen
                Abteilungen hatte, bekommt hier den Weg in die Legalität.{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/admin/manage/agent-requests"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Manage agent requests
                </a>
              </li>
              <li>
                <strong>Federated Copilot Connectors</strong> (MCP-basiert) werden jetzt im
                Connectors-Bereich unter Copilot im Admin Center verwaltet. Der Unterschied zu den
                bekannten Konnektoren: Es wird nichts indexiert, der Zugriff läuft zur Laufzeit mit
                der Authentifizierung des jeweiligen Nutzers und respektiert die Berechtigungen der
                Quelle.{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/connectors/federated-connectors-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Quelle: Federated connectors overview
                </a>
              </li>
              <li>
                <strong>Verschachtelte Berechtigungen für Confluence und ServiceNow</strong> werden
                jetzt ausgewertet: Rechte auf der Elternebene wirken auf untergeordnete Elemente.
                Bestehende ServiceNow-Verbindungen lassen sich dafür bearbeiten, statt sie neu
                anlegen zu müssen. Roadmap{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=503587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  503587
                </a>
                ,{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=505438"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  505438
                </a>{" "}
                und{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=503590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  503590
                </a>
              </li>
              <li>
                <strong>Teams bekommt einen Schalter für Meeting-KI mitten in der Besprechung.</strong>{" "}
                Lizenzierte Organisatoren und Referenten können Copilot, Facilitator und Recap
                gemeinsam an- und ausschalten, auf Desktop, Web und Mobil; ein Statusindikator zeigt
                allen Teilnehmenden, ob die Meeting-KI läuft. Bestehende Tenant-Richtlinien bleiben
                maßgeblich. Angekündigt im Juli (Message Center MC1319216), ausgerollt wird ab Mitte
                August 2026 – für die Betriebsvereinbarung also jetzt schon relevant, im Meeting aber
                noch nicht sichtbar. Unabhängig davon lässt sich Facilitator schon heute während der
                Besprechung einzeln beenden; bereits erstellte Notizen bleiben erhalten.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=558286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 558286
                </a>
              </li>
              <li>
                <strong>Das Copilot-Dashboard zeigt auch unlizenzierte Nutzung.</strong> Über einen
                Lizenzfilter lässt sich zwischen „Alle", „Microsoft 365 Copilot (lizenziert)" und
                „Copilot Chat (unlizenziert)" umschalten. Erwarten Sie, dass die Gesamtzahl deutlich
                höher liegt als die Lizenzzahl – genau dafür ist der Filter da.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=559475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  Roadmap 559475
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="was-tun" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Was jetzt zu tun ist</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Drei Dinge, in dieser Reihenfolge. Erstens: die Outlook-Ausweitung mit dem
              Datenschutzbeauftragten und, falls vorhanden, dem Betriebsrat besprechen – sie betrifft
              Menschen ohne kostenpflichtige Lizenz und hat damit die größte Reichweite im Haus.
              Zweitens: den Lizenzfilter im Copilot-Dashboard einmal auf „Alle" stellen und schauen,
              wie viel Copilot-Chat-Nutzung tatsächlich stattfindet; die Zahl ist meist eine
              Überraschung und ein gutes Argument in der nächsten Budgetrunde. Drittens, für die
              Teams: eine Woche lang Copilot Notebooks statt Sammelmail ausprobieren, mit einem
              echten Projekt, und am Ende Word- und PowerPoint-Datei daraus erzeugen. Wenn das trägt,
              ist es die Funktion, die diesen Monat am meisten Zeit spart. Wer den Rollout sauber
              aufsetzen und die Unterscheidung zwischen kostenlosem Copilot Chat und kostenpflichtigem
              Add-on im Team vermitteln will, findet in unserem{" "}
              <Link to="/trainings/copilot-strategie-change-management" className={LINK}>
                Training zu Copilot-Strategie und Change-Management
              </Link>{" "}
              den passenden Rahmen.
            </p>
          </div>
        </section>

        <section id="faq" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufige Fragen</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {faqs.map((faq) => (
              <div key={faq.name} className="mb-4">
                <h3 className="text-xl font-semibold mb-1">{faq.name}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quellen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Quellen</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Basis dieser Ausgabe ist die Juli-Ausgabe von „What's New in Microsoft 365 Copilot",
              ergänzt um die Release Notes vom 1., 15. und 29. Juli. Jede Neuerung ist an einer
              offiziellen Microsoft-Primärquelle belegt:
            </p>
            <ul>
              <li>
                Microsoft 365 Copilot Release Notes:{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/release-notes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  learn.microsoft.com
                </a>
              </li>
              <li>
                What's New in Microsoft 365 Copilot, Juli 2026:{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/microsoft365copilotblog/what%e2%80%99s-new-in-microsoft-365-copilot--july-2026/4538332"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  techcommunity.microsoft.com
                </a>
              </li>
              <li>
                Available today: OpenAI's GPT-5.6 in Microsoft 365 Copilot:{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/microsoft365copilotblog/available-today-openai%e2%80%99s-gpt-5-6-in-microsoft-365-copilot/4533152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  techcommunity.microsoft.com
                </a>
              </li>
              <li>
                Available today: Anthropic Claude Opus 5 in Microsoft 365 Copilot:{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/microsoft365copilotblog/available-today-anthropic-claude-opus-5-in-microsoft-365-copilot/4540524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  techcommunity.microsoft.com
                </a>
              </li>
              <li>
                What's New in Excel, Juli 2026:{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/excelblog/whats-new-in-excel-july-2026/4523403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  techcommunity.microsoft.com
                </a>
              </li>
              <li>
                What's New in Copilot in SharePoint, Juli 2026:{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/spblog/what%E2%80%99s-new-in-copilot-in-sharepoint-july-2026/4535420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  techcommunity.microsoft.com
                </a>
              </li>
              <li>
                Vision in Microsoft 365 Copilot (Nutzung und Funktionsweise):{" "}
                <a
                  href="https://support.microsoft.com/en-us/microsoft-365-copilot/how-vision-microsoft-365-works"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  support.microsoft.com
                </a>
              </li>
              <li>
                Federated connectors overview:{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/connectors/federated-connectors-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  learn.microsoft.com
                </a>
              </li>
              <li>
                Microsoft 365 Roadmap:{" "}
                <a
                  href="https://www.microsoft.com/en-us/microsoft-365/roadmap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXT}
                >
                  microsoft.com
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Autor */}
        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotUpdateJuli2026;
