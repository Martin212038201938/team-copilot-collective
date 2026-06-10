import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "copilot-agent-mode-word-excel-powerpoint";
const PAGE_TITLE = "Copilot Agent Mode in Word, Excel und PowerPoint: Was sich wirklich verändert hat";

const CopilotAgentModeOffice = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-neu-ist", title: "Was sich seit dem 22. April grundlegend geändert hat", level: 2 },
    { id: "wettbewerb", title: "Der Wettbewerb schläft nicht: Claude in Office", level: 2 },
    { id: "praxis-word", title: "Word: Vom Ratgeber zum Redakteur", level: 2 },
    { id: "praxis-excel", title: "Excel: Der Analyst, der eingreift", level: 2 },
    { id: "praxis-powerpoint", title: "PowerPoint: Endlich mehr als Farbe auf Folien", level: 2 },
    { id: "zahlen", title: "Was die ersten Zahlen zeigen", level: 2 },
    { id: "was-das-bedeutet", title: "Was das für Ihre Organisation bedeutet", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir haben Copilot bereits lizenziert, aber kaum jemand nutzt ihn aktiv. Liegt das an der Technik?",
      answer: "In den wenigsten Fällen. Agent Mode ändert die Qualität der Ergebnisse spürbar, aber das allein reicht nicht für aktive Nutzung. Was fehlt, ist fast immer ein konkreter Einstieg: Welche Aufgaben eignen sich, wie formuliert man eine sinnvolle Anfrage, und wie überprüft man das Ergebnis kritisch? Genau das trainieren wir in den Programmen der Copilotenschule – anwendungsnah, auf echte Arbeitssituationen zugeschnitten."
    },
    {
      name: "Unser IT-Bereich und unser Betriebsrat haben unterschiedliche Vorstellungen davon, wie KI in Office eingesetzt werden darf. Wie gehen wir damit um?",
      answer: "Das ist eine der häufigsten Konstellationen in deutschen Unternehmen – und keine, die sich technisch lösen lässt. Entscheidend ist eine gemeinsame Grundlage: Was kann Copilot tatsächlich, welche Daten sieht er, und was passiert mit Eingaben? Die Copilotenschule begleitet Unternehmen bei der Erarbeitung interner Nutzungsrichtlinien und erklärt Betriebsräten und Führungskräften die technischen Grundlagen verständlich."
    },
    {
      name: "Wie unterscheidet sich Copilot Agent Mode eigentlich von Claude für Office? Brauchen wir überhaupt beides?",
      answer: "Copilot Agent Mode ist tief in die Office-Apps integriert und greift auf Unternehmensdaten über den Microsoft Graph zu. Claude für Office funktioniert als Add-in und bringt vor allem Stärken bei komplexen Texten und kontextreichem Reasoning mit. In der Praxis sind es konkurrierende Ansätze, keine komplementären. Für die meisten Unternehmen empfiehlt sich, mit Copilot zu starten, da er zur bestehenden M365-Lizenz passt und keine zusätzliche Infrastruktur erfordert."
    },
    {
      name: "Wie überzeuge ich unsere Fachabteilungen, Copilot ernsthaft auszuprobieren – und nicht beim ersten schlechten Ergebnis aufzugeben?",
      answer: "Das funktioniert am besten über konkrete Erfolge in echten Aufgaben, nicht über Hochglanzpräsentationen. Die Copilotenschule empfiehlt sogenannte Use-Case-Sprints: In einem strukturierten Format identifizieren Abteilungen ihre eigenen Anwendungsfälle, testen sie mit Copilot und reflektieren die Ergebnisse. Das schafft intrinsische Motivation und ein realistisches Bild – besser als jeder Top-down-Rollout."
    },
    {
      name: "Wir nutzen sensible Daten in Excel. Ist Agent Mode datenschutzrechtlich unbedenklich?",
      answer: "Copilot Agent Mode verarbeitet Daten innerhalb des Microsoft 365-Tenants und sendet keine Inhalte an externe Modelle, sofern keine expliziten Verbindungen konfiguriert wurden. Für Unternehmen mit besonderen Datenschutzanforderungen (z. B. nach DSGVO oder bereichsspezifischer Regulierung) empfiehlt sich eine Prüfung der konkreten Konfiguration durch die IT-Abteilung. Die Copilotenschule unterstützt bei der Vorbereitung solcher Governance-Checks."
    },
    {
      name: "Was sollten wir jetzt konkret als nächsten Schritt tun?",
      answer: "Wenn Copilot-Lizenzen vorhanden sind: Agent Mode aktivieren und eine kleine Gruppe mit konkreten Aufgaben testen – am besten keine Showcase-Szenarien, sondern echte Tagesarbeit. Wenn noch keine Lizenzen vorhanden sind: Pilotplanung und Use-Case-Identifikation zuerst. Die Copilotenschule begleitet beide Ausgangssituationen mit strukturierten Workshops und Trainingsformaten."
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Copilot Agent Mode ist seit dem 22. April 2026 in Word, Excel und PowerPoint allgemein verfügbar. Was sich wirklich verändert hat – und was das für Unternehmen bedeutet.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-05-21",
        "dateModified": "2026-05-21",
        "keywords": [
          "Copilot Agent Mode",
          "Copilot Word",
          "Copilot Excel",
          "Copilot PowerPoint",
          "Microsoft 365 Copilot 2026",
          "agentische KI Office",
          "Claude für Office",
          "Copilot GA April 2026",
        ],
        "articleSection": "Microsoft 365 Copilot",
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
        title="Copilot Agent Mode in Word, Excel & PowerPoint (2026) | copilotenschule.de"
        description="Copilot Agent Mode ist seit 22. April 2026 allgemein verfügbar. Was sich in Word, Excel und PowerPoint wirklich verändert – und warum das den Wettbewerb mit Claude verändert."
        keywords={[
          "Copilot Agent Mode",
          "Copilot Word Excel PowerPoint",
          "Microsoft 365 Copilot 2026",
          "agentische KI",
          "Claude für Office",
          "Copilot GA",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-05-21T09:00:00+01:00"
        modifiedTime="2026-05-21T09:00:00+01:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Agent Mode", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Was der GA-Release vom 22. April 2026 wirklich bedeutet – und warum agentische Büroarbeit jetzt konkret wird"
        lastUpdated="21. Mai 2026"
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
              Seit dem 22. April 2026 ist Copilot Agent Mode in Word, Excel und PowerPoint
              allgemein verfügbar – und das ist kein Marketing-Meilenstein, sondern eine
              funktionale Zäsur. Copilot führt jetzt mehrstufige Aktionen direkt im Dokument
              aus, anstatt nur Vorschläge zu machen. Gleichzeitig hat Anthropic Claude als
              Add-in in dieselben Apps gebracht. Der Wettbewerb um den agentischen
              Office-Arbeitsplatz ist eröffnet – und die meisten Unternehmen haben das noch
              nicht bemerkt.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p>
            Wer sich in den letzten Jahren regelmäßig mit Copilot beschäftigt hat, kennt das
            Muster: Die Ankündigungen klangen stets größer als das, was danach tatsächlich
            funktionierte. Microsoft hat das in einem internen Rückblick zur GA-Ankündigung
            selbst eingeräumt – die frühen Sprachmodelle waren schlicht nicht gut genug, um
            verlässlich in Dokumente einzugreifen. Copilot war ein gesprächiger Berater, der
            viel wusste, aber selten selbst Hand anlegte. Das hat sich im April 2026 geändert,
            und zwar spürbar.
          </p>
          <p>
            Der Wechsel vom reaktiven Assistenten zum aktiven Agenten ist keine Kleinigkeit.
            Es geht nicht darum, dass Copilot jetzt schneller antwortet oder bessere Texte
            vorschlägt. Es geht darum, dass er Aufgaben übernimmt: Dokument umstrukturieren,
            Tabelle bereinigen, Präsentation an neue Daten anpassen – und das in mehreren
            Schritten, ohne dass der Nutzer jeden Einzelschritt manuell anstoßen muss.
            Gleichzeitig betritt mit Claude von Anthropic ein ernsthafter Konkurrent denselben
            Spielplatz. Das Rennen um den agentischen Office-Arbeitsplatz ist damit offiziell
            eröffnet.
          </p>
        </div>

        {/* Sektion 1 */}
        <section id="was-neu-ist" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was sich seit dem 22. April grundlegend geändert hat
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die technische Grundlage für den Wandel liegt in der Reife der Modelle. Microsoft
              formuliert es im GA-Blogpost direkt: Aktuelle Modelle sind wesentlich besser darin,
              mehrstufige Anweisungen zu befolgen, den Kontext eines Dokuments zu verstehen und
              Änderungen vorzunehmen, ohne den ursprünglichen Inhalt zu verfälschen. Das klingt
              banal, ist aber der Unterschied zwischen einem Feature, das man einmal ausprobiert,
              und einem, das man täglich nutzt.
            </p>
            <p>
              Was Agent Mode konkret bedeutet: Copilot bekommt Zugriff auf native App-Aktionen.
              In Word kann er Abschnitte verschieben, Tonalität anpassen und Quellenangaben
              einfügen. In Excel greift er direkt in das Arbeitsblatt ein – er legt Formeln an,
              erstellt Pivot-Tabellen und formatiert Daten, ohne dass der Nutzer auf „Einfügen"
              klicken muss. In PowerPoint aktualisiert er Folien anhand neuer Datenpunkte und
              respektiert dabei Corporate-Templates. Sichtbar ist das alles in einer Seitenleiste,
              die jeden Schritt protokolliert – inklusive der Möglichkeit, einzelne Aktionen
              rückgängig zu machen oder anzuhalten.
            </p>
            <p>
              Das Prinzip dahinter – Kontrolle bleibt beim Nutzer, Arbeit übernimmt das Modell –
              ist die richtige Antwort auf die Frage, die viele Unternehmen stellen: Wie viel
              Autonomie will ich KI in meinen Dokumenten geben? Copilot Agent Mode gibt keine
              autonome Antwort, sondern eine transparente: Du siehst, was passiert, du kannst
              eingreifen. Das ist eine vernünftige Balance für produktive Arbeit in Organisationen,
              die Nachvollziehbarkeit brauchen.
            </p>
          </div>
        </section>

        {/* Sektion 2 */}
        <section id="wettbewerb" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Der Wettbewerb schläft nicht: Claude in Office
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Anthropic hat in den Wochen vor und nach dem Copilot-GA-Release einen eigenen
              Zug gemacht: Claude ist als Add-in für Word, Excel, PowerPoint und Outlook im
              Microsoft Marketplace verfügbar. Die Integration funktioniert über eine Seitenleiste
              und bringt etwas mit, das Copilot bislang strukturell nicht leisten kann –
              kontextübergreifendes Arbeiten ohne App-Wechsel. Wer in Excel an einem Finanzmodell
              sitzt und dann die zugehörige PowerPoint-Präsentation öffnet, kann Claude in
              derselben Konversation weiterfragen. Der Kontext wandert mit.
            </p>
            <p>
              Das ist keine marginale Verbesserung, sondern ein anderes Arbeitsmodell.
              Copilot ist tiefer in die Apps integriert und hat über den Microsoft Graph Zugriff
              auf Unternehmensdaten, E-Mails, Kalender und SharePoint-Inhalte. Claude bringt
              dagegen stärkeres Reasoning bei komplexen Texten und Modellen mit – und kostet
              für Nutzer mit einem bestehenden Claude-Abo nichts extra. Für Unternehmen, die
              bereits M365 Copilot lizenziert haben, ist die Frage, ob sie zusätzlich Claude
              einsetzen, weniger eine technische als eine strategische: Welches Werkzeug soll
              der Standard sein, und wie verhindert man Tool-Wildwuchs?
            </p>
            <p>
              Was ich aus Gesprächen mit IT-Verantwortlichen mitnehme: Die meisten Unternehmen
              entscheiden sich für Copilot – nicht weil er besser ist, sondern weil er bereits
              in der Lizenz steckt und die Governance überschaubar bleibt. Claude als paralleles
              Add-in entsteht oft ohne bewusste Entscheidung: Ein Nutzer installiert es, weil
              er neugierig ist, und ehe man sich versieht, läuft beides. Das ist kein Drama,
              aber es verdient Aufmerksamkeit.
            </p>
          </div>
        </section>

        {/* Sektion 3 */}
        <section id="praxis-word" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Word: Vom Ratgeber zum Redakteur
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              In Word ist die Veränderung vielleicht am deutlichsten spürbar, weil das bisherige
              Nutzungsverhalten hier am stärksten von einzelnen Prompts geprägt war. Ein Absatz
              umformulieren, eine kürzere Version erstellen, Tonalität prüfen – das waren die
              typischen Einsätze. Agent Mode geht weiter: Man gibt eine übergeordnete Aufgabe,
              und Copilot arbeitet sich durch das Dokument. „Strukturiere dieses 12-seitige
              Konzept nach dem Muster Executive Summary, Problem, Lösung, Umsetzung, Nutzen"
              ist kein unrealistischer Prompt mehr, sondern eine produktiv einsetzbare Anfrage.
            </p>
            <p>
              Was dabei oft unterschätzt wird: Die Qualität des Outputs hängt nach wie vor stark
              davon ab, wie präzise die Aufgabe formuliert ist. Agent Mode ist kein Freifahrtschein
              für vage Anweisungen. Wer „mach das besser" tippt, bekommt etwas zurück – aber
              selten das, was gemeint war. Das ändert sich nicht dadurch, dass das Modell jetzt
              mehrere Schritte ausführt. Was sich ändert: Der Nutzer muss nicht mehr jeden
              Schritt selbst steuern, wenn er weiß, was er will. Prompt-Kompetenz bleibt die
              entscheidende Variable.
            </p>
          </div>
        </section>

        {/* Sektion 4 */}
        <section id="praxis-excel" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Excel: Der Analyst, der eingreift
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Excel ist der Bereich, in dem die Engagement-Zahlen aus Microsofts eigenem
              Rückblick am stärksten ausschlagen. 67 Prozent mehr Interaktionen,
              50 Prozent höhere Nutzer-Retention – das sind keine Zahlen, die man durch eine
              schönere UI erreicht. Hier trifft eine neue Funktionalität auf ein echtes Problem:
              Viele Nutzer können Excel lesen, aber nicht sicher genug schreiben. Formeln, die
              über SVERWEIS hinausgehen, Pivot-Tabellen mit verschachtelten Filtern, bedingte
              Formatierungen – das ist der Bereich, in dem Copilot Agent Mode den größten
              praktischen Unterschied macht.
            </p>
            <p>
              Copilot greift jetzt direkt in die Arbeitsmappe ein: Er legt Formeln an, erstellt
              Diagramme, bereinigt inkonsistente Daten und erklärt dabei, was er gemacht hat.
              Das Modell hat ein Verständnis für den Kontext einer Pivot-Tabelle – was die
              Dimensionen bedeuten, welche Aggregation sinnvoll ist – und das führt zu
              Ergebnissen, die frühere Versionen nicht liefern konnten. Der kritische Punkt
              bleibt die Verifikation: Wer das Ergebnis einer Formel nicht selbst lesen kann,
              sollte es nicht blind übernehmen. Das gilt für KI-generierte Formeln genauso wie
              für solche aus StackOverflow.
            </p>
          </div>
        </section>

        {/* Sektion 5 */}
        <section id="praxis-powerpoint" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            PowerPoint: Endlich mehr als Farbe auf Folien
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              PowerPoint war bisher die schwächste Stelle im Copilot-Angebot. Präsentationen
              generieren war möglich, aber das Ergebnis war oft generisch, designmäßig
              gleichförmig und ignorierte konsequent das vorhandene Corporate Template. Mit
              Agent Mode ändert sich das in einem wesentlichen Punkt: Copilot respektiert
              jetzt Templates. Er aktualisiert vorhandene Folien mit neuen Daten, fügt Folien
              ein, die zum bestehenden Stil passen, und baut Diagramme auf Basis aktueller
              Zahlen – ohne das Design zu zerstören.
            </p>
            <p>
              Besonders nützlich ist die Möglichkeit, eine bestehende Präsentation mit neuen
              Inhalten zu aktualisieren. Das Quartalsupdate, bei dem 30 Prozent der Folien
              neue Zahlen brauchen – genau das ist ein sinnvoller Anwendungsfall. Man gibt
              Copilot die neuen Daten, definiert welche Folien betroffen sind, und überprüft
              das Ergebnis. Der Zeitgewinn ist real, weil die Alternative – jede Folie manuell
              öffnen, Zahl suchen, ersetzen, Diagramm anpassen – eine typische Tagesaufgabe
              ist, die niemand gerne macht.
            </p>
          </div>
        </section>

        {/* Sektion 6 mit Grafik */}
        <section id="zahlen" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was die ersten Zahlen zeigen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Microsoft hat zum GA-Release Engagement-Daten aus den letzten 30 Tagen des Previews
              veröffentlicht. Die Zahlen sind bemerkenswert, weil sie selten so direkt kommuniziert
              werden. Engagement (gemessen in Versuchen pro Nutzer und Woche), Nutzer-Retention
              und Zufriedenheitswerte stiegen in allen drei Apps deutlich – am stärksten in Excel.
            </p>
          </div>

          <div className="my-6 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
            <img
              src="/images/copilot-agent-mode-engagement-2026.png"
              alt="Balkendiagramm: Copilot Agent Mode Engagement-Verbesserung in Word, Excel und PowerPoint (GA April 2026)"
              className="w-full"
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Excel-Zahlen stechen heraus: 67 Prozent mehr Engagement und 50 Prozent höhere
              Retention sind keine marginalen Verbesserungen. Das deutet darauf hin, dass hier
              echte Arbeitsaufgaben getroffen werden, nicht nur Neugier-Klicks. Bei PowerPoint
              fällt das Engagement-Plus mit 11 Prozent kleiner aus, aber die Retention-Steigerung
              von 36 Prozent zeigt, dass die Nutzer, die es ausprobieren, wiederkommen. Word
              liegt mit 52 Prozent Engagement-Steigerung im Mittelfeld und bestätigt, was man
              in der Praxis beobachtet: Copilot in Word ist das Gateway für die meisten Nutzer,
              weil Textarbeit der vertrauteste Ausgangspunkt ist.
            </p>
            <p>
              Eine nüchterne Einschränkung gehört dazu: Diese Zahlen messen Verhalten, nicht
              Ergebnis. Höheres Engagement bedeutet, dass Nutzer Copilot häufiger öffnen und
              nutzen. Es sagt nichts darüber aus, ob die produzierten Dokumente besser sind oder
              ob Arbeitszeit tatsächlich eingespart wurde. Für eine ROI-Aussage braucht es
              andere Metriken – und die müssen Unternehmen selbst erheben.
            </p>
          </div>
        </section>

        {/* Sektion 7 */}
        <section id="was-das-bedeutet" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was das für Ihre Organisation bedeutet
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Agent Mode ist kein Feature, das man einschaltet und das dann automatisch wirkt.
              Es ist eine neue Arbeitsweise, die gelernt sein will – und die bei schlechter
              Vorbereitung genauso wirkungslos bleibt wie Copilot bisher für viele Nutzer war.
              Der häufigste Fehler, den ich in Unternehmen beobachte: Lizenzen werden ausgerollt,
              eine kurze Einführungsmail geht raus, und dann wartet man auf Ergebnisse. Die
              bleiben aus, weil Nutzer nicht wissen, womit sie anfangen sollen – und nach
              zwei enttäuschenden Versuchen geben sie auf.
            </p>
            <p>
              Was jetzt gefragt ist, sind keine Bewusstseinskampagnen, sondern konkrete
              Einstiegspunkte: Welche Aufgaben eignen sich für Agent Mode in meiner Abteilung?
              Wie formuliere ich eine Aufgabe so, dass das Ergebnis verwendbar ist? Und wie
              überprüfe ich, was Copilot gemacht hat? Das sind keine Trivialfragen – und sie
              beantworten sich nicht aus einem YouTube-Tutorial heraus.
            </p>
            <p>
              Die Frage nach dem Wettbewerb mit Claude stellt sich für Unternehmen übrigens
              weniger als Entscheidungsdilemma. Wer M365 Copilot lizenziert hat, hat bereits
              bezahlt – Agent Mode ist inklusive. Das ist die logische erste Wahl. Claude
              kommt ins Spiel, wenn Copilot bei bestimmten Aufgaben nicht das liefert, was
              gebraucht wird: komplexe Vertragsanalyse, mehrsprachige Textarbeit, sehr
              anspruchsvolle strukturierte Datenauswertung. Dann lohnt ein direkter Vergleich
              in der konkreten Aufgabe – nicht im Allgemeinen.
            </p>
            <p>
              Was sich mit dem GA-Release verändert hat, ist die Ernsthaftigkeit der Frage.
              Agentische Büroarbeit ist kein Ausblick mehr, sie ist verfügbar. Unternehmen,
              die das ignorieren, werden in zwölf Monaten erklären müssen, warum ihre Teams
              noch immer dieselbe Arbeit händisch erledigen.
            </p>
          </div>
        </section>

        {/* Weiterführende Links */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Weiterführende Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-fuer-excel" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot für Excel: Was wirklich funktioniert
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Praxiserfahrungen und konkrete Anwendungsfälle für den Einsatz von Copilot in Excel.
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-fuer-word" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot für Word: Strukturiert schreiben mit KI
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Wie Copilot in Word produktiv eingesetzt wird – ohne dass die KI das Dokument übernimmt.
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-adoption-2026-zahlen" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot Adoption 2026: Was die Zahlen wirklich zeigen
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                15 Millionen Seats, bis zu 408% ROI – eine nüchterne Einordnung jenseits des Marketings.
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-claude-integration" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot und Claude im Vergleich
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Was Anthropics Claude und Microsoft Copilot unterscheidet – und wann welches Tool sinnvoller ist.
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-agent-digitales-gedaechtnis" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot-Agent als digitales Gedächtnis
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Wie ein Copilot-Agent Wissen dauerhaft verfügbar macht – über einzelne Dokumente hinaus.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {faq.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Quellen</h2>
          <div className="prose prose-sm max-w-none dark:prose-invert text-gray-600 dark:text-gray-400">
            <ul>
              <li>
                Microsoft 365 Blog: „Copilot's agentic capabilities in Word, Excel, and
                PowerPoint are generally available", 22. April 2026.{" "}
                <a
                  href="https://www.microsoft.com/en-us/microsoft-365/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  microsoft.com
                </a>
              </li>
              <li>
                Microsoft Tech Community: „Introducing Word, Excel, and PowerPoint Agents in
                Microsoft 365 Copilot".{" "}
                <a
                  href="https://techcommunity.microsoft.com/blog/microsoft365copilotblog/introducing-word-excel-and-powerpoint-agents-in-microsoft-365-copilot/4470604"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  techcommunity.microsoft.com
                </a>
              </li>
              <li>
                Anthropic: „Claude for Microsoft 365" (Produktseite und Add-in-Dokumentation).{" "}
                <a
                  href="https://claude.com/claude-for-microsoft-365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline"
                >
                  claude.com
                </a>
              </li>
              <li>
                Microsoft Learn: „Create files with Word, Excel, and PowerPoint Agents in
                Microsoft 365 Copilot".{" "}
                <a
                  href="https://learn.microsoft.com/en-us/microsoft-365/copilot/wordexcelppt-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  learn.microsoft.com
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

export default CopilotAgentModeOffice;
