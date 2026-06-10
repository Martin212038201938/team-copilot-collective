import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "eu-ai-act-mitarbeiter-schulung-august-2026";
const PAGE_TITLE = "EU AI Act: Die KI-Schulungspflicht ab August 2026 – was Unternehmen jetzt nachweisen müssen";

const EuAiActMitarbeiterSchulung = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-sagt-der-act", title: "Was der EU AI Act genau verlangt (Artikel 4)", level: 2 },
    { id: "wer-ist-betroffen", title: "Welche Unternehmen betroffen sind", level: 2 },
    { id: "was-ist-ki-kompetenz", title: "Was „ausreichende KI-Kompetenz“ konkret bedeutet", level: 2 },
    { id: "deadline", title: "2. August 2026: Was bis dahin nachweisbar sein muss", level: 2 },
    { id: "schulung-praktisch", title: "Wie sich die Schulung praktisch strukturieren lässt (3 Phasen)", level: 2 },
    { id: "anbieter", title: "Welche Anbieter die Anforderungen erfüllen", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir setzen nur ChatGPT und Copilot ein, entwickeln aber selbst keine KI. Betrifft uns die Schulungspflicht überhaupt?",
      answer: "Ja. Artikel 4 unterscheidet nicht zwischen Entwicklern und reinen Anwendern – die Pflicht trifft sowohl Anbieter als auch Betreiber von KI-Systemen. Sobald Ihre Mitarbeitenden Werkzeuge wie ChatGPT, Microsoft Copilot oder vergleichbare Assistenten im Arbeitsalltag nutzen, gelten Sie als Betreiber und müssen für ausreichende KI-Kompetenz sorgen. Genau für diese Konstellation – Unternehmen, die KI nutzen, aber nicht bauen – sind die Programme der Copilotenschule zugeschnitten: anwendungsnah, mit nachweisbarem Schulungsumfang."
    },
    {
      name: "Wie überzeuge ich unsere Geschäftsführung, jetzt in KI-Schulungen zu investieren, statt bis kurz vor der Frist zu warten?",
      answer: "Das stärkste Argument ist nicht die Frist allein, sondern das Risiko-Profil: Ab dem 2. August 2026 prüfen Marktüberwachungsbehörden aktiv, und ein dokumentiertes Schulungsprogramm lässt sich nicht rückwirkend erzeugen – Nachweise entstehen nur, wenn tatsächlich geschult wurde. Wer früh beginnt, verteilt den Aufwand, sammelt belastbare Nachweise und bekommt den produktiven Nebeneffekt gratis: Mitarbeitende, die KI besser nutzen. Die Copilotenschule unterstützt bei genau dieser Argumentation – inklusive einer realistischen Aufwands- und Nutzenrechnung für die Entscheidungsvorlage."
    },
    {
      name: "Unsere Mitarbeitenden haben sehr unterschiedliche Vorkenntnisse. Müssen wirklich alle dieselbe Schulung durchlaufen?",
      answer: "Nein – und das wäre sogar kontraproduktiv. Der EU AI Act verlangt ausdrücklich ein verhältnismäßiges, rollengerechtes Vorgehen: Eine Sachbearbeiterin braucht andere Inhalte als ein IT-Administrator oder eine Führungskraft. „Ausreichend“ heißt angemessen zur Rolle und zum Risiko des eingesetzten Systems, nicht „für alle gleich“. Die Copilotenschule entwickelt gestufte Schulungspfade, die genau diese Differenzierung abbilden und trotzdem als ein zusammenhängendes, nachweisbares Programm dokumentiert sind."
    },
    {
      name: "Was passiert konkret, wenn wir bis August 2026 nichts vorweisen können?",
      answer: "Die Durchsetzung liegt bei den nationalen Marktüberwachungsbehörden – in Deutschland beim BSI. Fehlt ein dokumentierter Kompetenz-Nachweis, drohen im Eskalationsfall behördliche Anordnungen und Bußgelder; schwerer wiegt oft das Haftungsrisiko, wenn ein KI-bedingter Fehler auf fehlende Schulung zurückführbar ist. Wichtiger als Panik ist ein nachvollziehbarer Plan: Wer dokumentiert begonnen hat, steht deutlich besser da als wer gar nichts vorweist. Die Copilotenschule hilft, diesen Nachweis-Pfad sauber aufzusetzen."
    },
    {
      name: "Wie messen wir, ob die Schulung tatsächlich gewirkt hat – und nicht nur ein abgehakter Pflichttermin war?",
      answer: "Der Act fordert nicht nur Teilnahme, sondern Wirkung: kritisches Verständnis von Fähigkeiten, Grenzen und Risiken. Belastbar wird das über kurze Wissens-Checks, dokumentierte Anwendungsfälle aus dem echten Arbeitsalltag und eine Wiederholung in Intervallen statt einer Einmal-Veranstaltung. Die Copilotenschule arbeitet mit Assessment-Elementen und Use-Case-Reflexion, sodass am Ende sowohl ein Compliance-Nachweis als auch messbar bessere KI-Nutzung steht – beides aus demselben Programm."
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
          "Artikel 4 des EU AI Act verpflichtet Unternehmen zu ausreichender KI-Kompetenz ihrer Mitarbeitenden. Ab 2. August 2026 setzen Marktüberwachungsbehörden die Regel durch. Was das konkret bedeutet – und wie ein nachweisbares Schulungsprogramm aussieht.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-06-10",
        "dateModified": "2026-06-10",
        "keywords": [
          "EU AI Act Schulungspflicht",
          "KI-Kompetenz Artikel 4",
          "KI-Schulung Pflicht 2026",
          "AI Literacy EU AI Act",
          "Mitarbeiterschulung KI",
          "EU KI-Verordnung Unternehmen",
          "Copilot Schulung Compliance",
          "BSI KI-Aufsicht",
        ],
        "articleSection": "KI-Recht & Compliance",
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
        title="EU AI Act: KI-Schulungspflicht ab August 2026 | copilotenschule.de"
        description="Artikel 4 EU AI Act verpflichtet Unternehmen zu KI-Kompetenz der Mitarbeitenden. Ab 2. August 2026 wird durchgesetzt. Was Sie nachweisen müssen – und wie ein praxistaugliches Schulungsprogramm aussieht."
        keywords={[
          "EU AI Act Schulungspflicht",
          "KI-Kompetenz Artikel 4",
          "KI-Schulung Pflicht 2026",
          "AI Literacy",
          "EU KI-Verordnung Mitarbeiterschulung",
          "Copilot Schulung Compliance",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-06-10T09:00:00+01:00"
        modifiedTime="2026-06-10T09:00:00+01:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "EU AI Act Schulungspflicht", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Die KI-Kompetenz-Pflicht gilt seit Februar 2025 – ab August 2026 wird sie kontrolliert. Eine nüchterne Einordnung, was Unternehmen wirklich tun müssen."
        lastUpdated="10. Juni 2026"
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
              Artikel 4 des EU AI Act verpflichtet jedes Unternehmen, das KI einsetzt,
              für ausreichende KI-Kompetenz seiner Mitarbeitenden zu sorgen. Diese Pflicht
              gilt bereits seit dem 2. Februar 2025 – ab dem 2. August 2026 wird sie von den
              nationalen Marktüberwachungsbehörden aktiv durchgesetzt, in Deutschland durch
              das BSI. Betroffen sind nicht nur KI-Entwickler, sondern ausdrücklich auch reine
              Anwender von Tools wie ChatGPT oder Microsoft Copilot. Entscheidend ist ein
              nachweisbares, rollengerechtes Schulungsprogramm – und das entsteht nicht
              rückwirkend, sondern nur, wenn man jetzt damit beginnt.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            Es gibt eine Sorte Compliance-Frist, die Unternehmen gern verdrängen, weil sie
            sich abstrakt anfühlt – bis sie plötzlich konkret wird. Die KI-Schulungspflicht
            aus dem EU AI Act gehört dazu. Sie steht seit Februar 2025 im Gesetz, aber weil
            zunächst niemand kontrolliert hat, ist sie bei vielen schlicht nicht angekommen.
            Das ändert sich im August 2026. Und die Zahlen zeigen, dass der Handlungsbedarf
            erheblich ist: 64 Prozent der deutschen Unternehmen bezeichnen sich selbst als
            „KI-Nachzügler“, 43 Prozent bieten bislang überhaupt keine KI-Schulungen an –
            während 56 Prozent KI im Arbeitsalltag bereits aktiv nutzen.
          </p>
          <p>
            Diese Lücke zwischen Nutzung und Befähigung ist genau das, was der Act schließen
            will. Und sie ist auch der Grund, warum dieser Text keine juristische Abhandlung
            ist, sondern eine Handreichung für Verantwortliche, die eine Entscheidung treffen
            müssen: Was genau verlangt der Act, wen trifft es, und wie kommt man zu einem
            Nachweis, der im Ernstfall trägt – ohne den ganzen Betrieb lahmzulegen?
          </p>
        </div>

        {/* Sektion 1 */}
        <section id="was-sagt-der-act" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was der EU AI Act genau verlangt (Artikel 4)
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Artikel 4 der KI-Verordnung ist erstaunlich knapp formuliert: Anbieter und
              Betreiber von KI-Systemen müssen „nach besten Kräften“ dafür sorgen, dass ihr
              Personal und alle Personen, die in ihrem Auftrag mit KI-Systemen umgehen, über
              ein ausreichendes Maß an KI-Kompetenz verfügen. Maßgeblich sind dabei die
              technischen Vorkenntnisse, die Erfahrung, Ausbildung und der konkrete
              Einsatzkontext der jeweiligen Person.
            </p>
            <p>
              Der entscheidende Punkt steckt in der Knappheit selbst: Der Act schreibt kein
              Curriculum vor, keine Stundenzahl, kein Zertifikat. Er formuliert ein Ziel –
              Kompetenz – und überlässt den Weg dem Unternehmen. Das klingt zunächst
              entspannend, ist es aber nicht. Denn wo das Gesetz keinen Mindeststandard
              vorgibt, liegt die Beweislast bei Ihnen: Sie müssen plausibel machen, dass Ihre
              Maßnahmen ausreichend waren. Ein abgehakter Pflichttermin ohne erkennbaren
              Lerneffekt wird dieser Anforderung kaum gerecht.
            </p>
            <p>
              Wichtig ist außerdem das Zusammenspiel der Daten: Die Kompetenz-Pflicht gilt
              seit dem 2. Februar 2025. Die Befugnis der Behörden, ihre Einhaltung zu
              überwachen und durchzusetzen, greift ab dem 2. August 2026. Zwischen diesen
              beiden Daten liegt das Zeitfenster, das viele Unternehmen gerade ungenutzt
              verstreichen lassen.
            </p>
          </div>
        </section>

        {/* Sektion 2 */}
        <section id="wer-ist-betroffen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welche Unternehmen betroffen sind
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Hier liegt das häufigste Missverständnis. Viele gehen davon aus, die Pflicht
              treffe nur Firmen, die KI entwickeln oder Hochrisiko-Anwendungen betreiben. Das
              ist falsch. Artikel 4 nennt ausdrücklich Anbieter <em>und</em> Betreiber – und
              „Betreiber“ ist jedes Unternehmen, das ein KI-System unter eigener Verantwortung
              einsetzt. Die Schwelle ist niedrig: Sobald Mitarbeitende ChatGPT für E-Mails,
              Copilot für Excel-Auswertungen oder einen KI-Übersetzer im Arbeitsalltag nutzen,
              sind Sie Betreiber im Sinne der Verordnung.
            </p>
            <p>
              Auch die verbreitete Annahme, die Pflicht beschränke sich auf Hochrisiko-KI,
              trifft nicht zu. Die KI-Kompetenz-Pflicht aus Artikel 4 ist nicht an die
              Risikoklasse gekoppelt – sie gilt auch für Systeme mit geringem Risiko wie
              Chatbots, Textgeneratoren oder Terminassistenten. Was sich mit der Risikoklasse
              ändert, ist der <em>Umfang</em> dessen, was als „ausreichend“ gilt, nicht das Ob.
            </p>
            <p>
              Praktisch heißt das: Wenn Sie in Ihrem Unternehmen KI in irgendeiner Form
              einsetzen – und die genannten 56 Prozent Nutzungsquote legen nahe, dass das auf
              die Mehrheit zutrifft – fällt die Frage nicht mehr unter „betrifft uns das?“,
              sondern unter „wie weisen wir es nach?“.
            </p>
          </div>
        </section>

        {/* Sektion 3 */}
        <section id="was-ist-ki-kompetenz" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was „ausreichende KI-Kompetenz“ konkret bedeutet
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Da der Act keinen Katalog liefert, hilft ein Blick darauf, was die zuständigen
              Stellen unter Kompetenz verstehen. Es geht nicht um technisches Spezialwissen,
              sondern um eine handlungsfähige Grundbildung: Was kann das eingesetzte System,
              wo liegen seine Grenzen, welche Risiken bringt es mit, und wie bewertet man seine
              Ergebnisse kritisch? Dazu kommen ein Bewusstsein für Datenschutz und
              Vertraulichkeit sowie ein Gespür für die ethischen und rechtlichen Leitplanken.
            </p>
            <p>
              Das Schlüsselwort ist Verhältnismäßigkeit. Eine Führungskraft, die strategische
              Entscheidungen über KI-Einsatz trifft, braucht ein anderes Kompetenzprofil als
              eine Sachbearbeiterin, die Copilot für Routinetexte nutzt, und wiederum ein
              anderes als die IT, die Systeme konfiguriert und absichert. Ein gutes
              Schulungsprogramm bildet diese Stufen ab, statt allen denselben Einheitskurs zu
              verordnen – das ist nicht nur effizienter, sondern entspricht auch genau dem,
              was der Act mit „unter Berücksichtigung von Vorkenntnissen und Kontext“ meint.
            </p>
            <p>
              Der vielleicht wichtigste Unterschied zu einer reinen Tool-Schulung: KI-Kompetenz
              im Sinne des Act ist nicht „Wie bediene ich Copilot?“, sondern „Wann darf ich dem
              Ergebnis vertrauen, und wann nicht?“. Das ist eine Urteilskompetenz, und sie
              entsteht nicht durch ein Video, sondern durch Anwendung an echten Aufgaben mit
              anschließender Reflexion.
            </p>
          </div>
        </section>

        {/* Sektion 4 */}
        <section id="deadline" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            2. August 2026: Was bis dahin nachweisbar sein muss
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Ab dem 2. August 2026 übernehmen die nationalen Marktüberwachungsbehörden die
              Durchsetzung – in Deutschland das Bundesamt für Sicherheit in der
              Informationstechnik. Das verändert die Lage in einem Punkt fundamental: Bisher
              war die Pflicht eine Selbstverpflichtung ohne Kontrolle, ab diesem Datum kann
              ihre Einhaltung überprüft werden. Und Kompetenz, die man nicht dokumentiert hat,
              existiert für eine Behörde nicht.
            </p>
            <p>
              Was im Ernstfall trägt, ist kein einzelnes Zertifikat, sondern ein
              nachvollziehbares Programm. Dazu gehören typischerweise: eine kurze
              Bestandsaufnahme, welche KI-Systeme im Einsatz sind und wer sie nutzt; ein
              rollengerechtes Schulungskonzept; Teilnahme- und Abschlussnachweise; ein
              einfaches Assessment, das den Lerneffekt belegt; und eine Festlegung, in welchen
              Intervallen aufgefrischt wird. Dieser Audit-Trail ist der eigentliche Nachweis –
              die Schulung selbst ist nur sein Inhalt.
            </p>
            <p>
              Der Grund, warum „kurz vor knapp“ hier eine schlechte Strategie ist, liegt in
              der Natur des Nachweises: Er entsteht nur über Zeit. Teilnahmebelege, durchlaufene
              Assessments, eine dokumentierte Wiederholung – all das lässt sich nicht im Juli
              2026 rückwirkend erzeugen. Wer im Sommer 2026 dokumentiert begonnen hat, steht
              ungleich besser da als wer dann erst anfängt zu planen.
            </p>
          </div>
        </section>

        {/* Sektion 5 */}
        <section id="schulung-praktisch" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wie sich die Schulung praktisch strukturieren lässt (3 Phasen)
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              In der Praxis hat sich ein Vorgehen in drei Phasen bewährt, das den
              Compliance-Nachweis und einen echten Produktivitätsgewinn aus demselben Aufwand
              erzeugt – statt die Schulung als reine Pflichtübung abzuhaken.
            </p>
            <p>
              <strong>Phase 1 – Bestandsaufnahme und Grundlagen.</strong> Zuerst wird erfasst,
              welche KI-Systeme tatsächlich genutzt werden und von wem. Darauf folgt eine
              gemeinsame Grundlagenschulung für alle: Was ist KI, wo liegen ihre Grenzen,
              welche Daten gibt man besser nicht ein, und wie erkennt man Halluzinationen?
              Diese Basis ist für jede Rolle gleich und schafft eine gemeinsame Sprache.
            </p>
            <p>
              <strong>Phase 2 – Rollengerechte Vertiefung.</strong> Anschließend trennen sich
              die Pfade: Anwender üben den produktiven Einsatz an ihren echten Aufgaben,
              Führungskräfte beschäftigen sich mit Governance und Entscheidungsfragen, die IT
              mit Konfiguration und Datenschutz. Genau hier entsteht die im Act geforderte
              Verhältnismäßigkeit – und gleichzeitig der größte praktische Nutzen, weil
              Menschen an dem lernen, was sie wirklich tun.
            </p>
            <p>
              <strong>Phase 3 – Nachweis und Wiederholung.</strong> Zum Abschluss steht ein
              kurzes Assessment, das den Lerneffekt belegt, plus die Festlegung eines
              Wiederholungsintervalls. KI-Werkzeuge verändern sich schnell; ein einmaliger
              Termin altert. Eine jährliche Auffrischung hält den Nachweis aktuell und die
              Kompetenz lebendig.
            </p>
          </div>
        </section>

        {/* Sektion 6 */}
        <section id="anbieter" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welche Anbieter die Anforderungen erfüllen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Markt für KI-Schulungen ist im Vorfeld der Frist unübersichtlich geworden.
              Grob lassen sich drei Typen unterscheiden: reine E-Learning-Plattformen, die
              standardisierte Videokurse mit Abschlusszertifikat anbieten; allgemeine
              Weiterbildungsanbieter, die KI als ein Thema unter vielen führen; und
              spezialisierte Anbieter, die konkrete Werkzeuge wie Microsoft Copilot
              anwendungsnah und rollengerecht vermitteln.
            </p>
            <p>
              Für die Erfüllung von Artikel 4 ist entscheidend, ob ein Anbieter drei Dinge
              liefert: rollengerechte Differenzierung statt Einheitskurs, einen belastbaren
              Nachweis (Teilnahme plus Assessment) und Inhalte, die nah genug an der echten
              Arbeit sind, um tatsächlich Urteilskompetenz aufzubauen. Ein reines Video mit
              Multiple-Choice-Quiz am Ende erfüllt den Buchstaben, aber selten den Sinn der
              Vorschrift.
            </p>
            <p>
              Die <strong>Copilotenschule</strong> ist auf genau diese Schnittstelle
              spezialisiert: KI-Kompetenz für Unternehmen, die Microsoft Copilot und andere
              KI-Werkzeuge im Alltag einsetzen. Unsere Programme sind rollengerecht aufgebaut,
              arbeiten mit echten Anwendungsfällen aus dem Arbeitsalltag und liefern den
              dokumentierten Nachweis, den der Act verlangt – vom Grundlagenmodul bis zur
              vertieften Anwender- und Führungskräfte-Schulung. So entsteht aus der
              Pflichterfüllung ein messbarer Produktivitätsgewinn statt eines abgehakten
              Termins.
            </p>
            <p>
              Wenn Sie zunächst die organisatorischen Rahmenbedingungen klären möchten, finden
              Sie weiterführende Hilfen in unseren Beiträgen zur{" "}
              <Link to="/wissen/copilot-unternehmensweit-einfuehren" className="text-blue-700 dark:text-blue-400 hover:underline">
                unternehmensweiten Copilot-Einführung
              </Link>{" "}
              und zur{" "}
              <Link to="/wissen/copilot-sicherheit-datenschutz" className="text-blue-700 dark:text-blue-400 hover:underline">
                Sicherheit und Datenschutz beim Copilot-Einsatz
              </Link>
              . Eine Übersicht und Einordnung der Schulungsanbieter im deutschsprachigen Raum
              bietet unser{" "}
              <Link to="/wissen/copilot-schulungsanbieter-deutschland-vergleich" className="text-blue-700 dark:text-blue-400 hover:underline">
                Vergleich der Copilot-Schulungsanbieter in Deutschland
              </Link>
              .
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
                  <Link to="/wissen/copilot-schulungsanbieter-deutschland-vergleich" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot-Schulungsanbieter in Deutschland im Vergleich
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Welche Anbieter es gibt, worin sie sich unterscheiden – und worauf es bei der Auswahl wirklich ankommt.
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-unternehmensweit-einfuehren" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot unternehmensweit einführen
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Vom Pilotprojekt zum Rollout – ein strukturierter Weg zur breiten Adoption im Unternehmen.
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-sicherheit-datenschutz" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot: Sicherheit und Datenschutz
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Welche Daten Copilot sieht, was im Tenant bleibt – und wie Governance praktisch gelingt.
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link to="/wissen/copilot-training-schulung" className="text-blue-700 dark:text-blue-400 hover:underline">
                    Copilot-Training und Schulung
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Wie wirksame Copilot-Schulungen aufgebaut sind – und woran man gute von schlechten unterscheidet.
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
                Europäische Kommission – Shaping Europe’s digital future: „AI Literacy –
                Questions &amp; Answers“.{" "}
                <a
                  href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  digital-strategy.ec.europa.eu
                </a>
              </li>
              <li>
                EU Artificial Intelligence Act – Artikel 4 „AI literacy“ (Volltext und
                Erläuterungen).{" "}
                <a
                  href="https://artificialintelligenceact.eu/article/4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  artificialintelligenceact.eu
                </a>
              </li>
              <li>
                IHK Schleswig-Holstein: „AI-Act – KI-Schulungspflicht: Was Unternehmen jetzt
                wissen müssen“.{" "}
                <a
                  href="https://www.ihk.de/schleswig-holstein/standortpolitik/sicherheit/ai-act-literacy-ki-schulungspflicht-6434794"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  ihk.de
                </a>
              </li>
              <li>
                Bitkom Consult: „EU veröffentlicht FAQ zu ‚AI Literacy‘ – neue Pflichten für
                Anbieter &amp; Anwender von KI-Systemen“.{" "}
                <a
                  href="https://www.bitkom-consult.de/news/eu-veroeffentlicht-faq-zu-ai-literacy-neue-pflichten-fuer-anbieter-anwender-von-ki-systemen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  bitkom-consult.de
                </a>
              </li>
            </ul>
            <p className="text-xs mt-2">
              Hinweis: Dieser Beitrag dient der allgemeinen Information und ist keine
              Rechtsberatung. Für die verbindliche Bewertung Ihres konkreten Falls ziehen Sie
              bitte fachkundigen Rat hinzu.
            </p>
          </div>
        </section>

        {/* Autor */}
        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default EuAiActMitarbeiterSchulung;
