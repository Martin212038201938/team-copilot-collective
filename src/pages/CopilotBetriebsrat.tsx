import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-betriebsrat";
const PAGE_TITLE = "Microsoft Copilot und der Betriebsrat: Gestalter statt Bremser";

const CopilotBetriebsrat = () => {
  const martinLang = getAuthor('martin-lang')!;
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "drei-vorurteile", title: "Drei Fragen, die Betriebsräte stellen – differenziert beantwortet", level: 2 },
    { id: "vorurteil-ueberwachung", title: "Frage 1: Können Vorgesetzte meine Prompts lesen?", level: 3 },
    { id: "vorurteil-jobabbau", title: "Frage 2: Wird Copilot eingeführt, um Stellen abzubauen?", level: 3 },
    { id: "vorurteil-datenschutz", title: "Frage 3: Was passiert mit unseren Unternehmensdaten?", level: 3 },
    { id: "was-copilot-fuer-arbeitnehmer-bedeutet", title: "Was Copilot für Beschäftigte konkret verändert", level: 2 },
    { id: "kostenlos-vs-bezahlt", title: "Kostenloser Copilot vs. Microsoft 365 Copilot", level: 2 },
    { id: "mitbestimmung-rechte", title: "Rechtlicher Rahmen: Was gilt, was nicht", level: 2 },
    { id: "betriebsvereinbarung", title: "Was in eine zustimmungsfähige Betriebsvereinbarung gehört", level: 2 },
    { id: "betriebsrat-selbst-nutzen", title: "Copilot im Betriebsrat selbst produktiv einsetzen", level: 2 },
    { id: "checkliste-download", title: "Copilot Rollout Checkliste für Betriebsräte", level: 2 },
    { id: "training-betriebsrat", title: "Schulung für Betriebsräte: Kompetenz statt Abhängigkeit", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Muss der Arbeitgeber den Betriebsrat vor der Copilot-Einführung einbeziehen?",
      answer: "Ja – und zwar vor dem Kauf der Lizenzen, nicht danach. Microsoft 365 Copilot ist nach §87 Abs. 1 Nr. 6 BetrVG mitbestimmungspflichtig, weil es technisch geeignet ist, Nutzungsdaten zu erzeugen. Wichtig: Das LAG Hessen hat 2024 (5 TaBV 4/24) klargestellt, dass reine Datenschutzbedenken ohne konkreten Überwachungsbezug kein Mitbestimmungsrecht begründen. Der Betriebsrat hat also ein echtes Mitgestaltungsrecht, aber kein pauschales Vetorecht aus Datenschutzgründen allein. Die Copilotenschule unterstützt Betriebsräte dabei, dieses Recht konstruktiv einzusetzen."
    },
    {
      name: "Kann der Arbeitgeber sehen, was ich in Copilot eintippe?",
      answer: "Im Standard-Betrieb von Microsoft 365 Copilot: Nein. Es gibt kein Admin-Dashboard, das einzelne Prompts von Mitarbeitenden anzeigt. Prompt-Verläufe sind an das jeweilige Nutzerkonto gebunden – ähnlich wie der Browser-Verlauf. Anders sieht es aus, wenn der Arbeitgeber Microsoft Purview als Compliance-Werkzeug einsetzt und gezielt konfiguriert. Purview kann bei einem konkreten Compliance-Verdacht Inhalte durchsuchbar machen – ist aber separat zu lizenzieren und ebenfalls mitbestimmungspflichtig. In einer gut verhandelten Betriebsvereinbarung wird genau dieser Punkt geregelt: welche Tools eingesetzt werden dürfen und wann."
    },
    {
      name: "Darf Copilot im Recruiting eingesetzt werden – und wo ist die Grenze?",
      answer: "Hier ist die Unterscheidung entscheidend: Copilot als Werkzeug in der Hand eines geschulten, verantwortungsvollen Recruiters ist grundsätzlich zulässig – etwa um Bewerbungsunterlagen schneller zu sichten oder Gesprächsnotizen zu strukturieren. Was nicht geht: automatisierte Systeme, die Bewerber eigenständig kategorisieren, einordnen oder aussortieren, ohne dass eine informierte Person die Entscheidung trifft. Solche Systeme fallen unter Hochrisiko-KI nach EU AI Act und sind zudem nach §87 BetrVG mitbestimmungspflichtig. Die klare Regel: Copilot unterstützt Menschen – Menschen entscheiden."
    },
    {
      name: "Wann gilt Copilot als Hochrisiko-KI nach dem EU AI Act?",
      answer: "Microsoft 365 Copilot als allgemeines Produktivitätswerkzeug ist in der Regel als Low-Risk eingestuft. Hochrisiko-KI entsteht, wenn Copilot-basierte Auswertungen für automatisierte Personalentscheidungen genutzt werden – zum Beispiel für Beförderungen, Leistungsbewertungen oder Entlassungen ohne menschliche Entscheidung. Ab August 2026 gelten dafür strenge Dokumentationspflichten. Der Betriebsrat sollte in der Betriebsvereinbarung festhalten, dass Copilot ausschließlich als Unterstützungswerkzeug eingesetzt wird, nicht als Entscheidungssystem."
    },
    {
      name: "Wie kommen wir als Betriebsrat an eine Schulung – und wer bezahlt?",
      answer: "Der Arbeitgeber trägt die Kosten. Nach §37 Abs. 6 BetrVG hat der Betriebsrat Anspruch auf Schulungen, die für seine Arbeit erforderlich sind. Bei der Einführung eines KI-Systems wie Microsoft 365 Copilot ist das praktisch immer der Fall. Die Copilotenschule bietet ein speziell auf Betriebsräte zugeschnittenes 1-2-tägiges Format an – rechtliche Grundlagen am ersten Tag, praktische Copilot-Nutzung am zweiten. Auf Wunsch stellen wir eine Begründungshilfe für den Arbeitgeber zusammen."
    },
    {
      name: "Was passiert mit sensiblen Betriebsratsdokumenten, wenn wir Copilot nutzen?",
      answer: "Copilot kann nur auf Dateien zugreifen, auf die der jeweilige Nutzer bereits Zugriff hat. Wenn Betriebsratsdokumente in einem SharePoint-Bereich liegen, der nur für BR-Mitglieder zugänglich ist, bleibt das mit Copilot genauso geschützt. Wichtig: Viele Unternehmen haben historisch gewachsene, zu offene Berechtigungsstrukturen – Copilot macht diese sichtbar. Der Betriebsrat sollte vor dem Rollout auf eine Bereinigung der Zugriffsrechte dringen. Das ist kein Copilot-Problem, sondern eine Chance zur Korrektur."
    },
    {
      name: "Darf Copilot zur Leistungskontrolle genutzt werden?",
      answer: "Nein – zumindest nicht, wenn der Betriebsrat das in der Betriebsvereinbarung klar ausschließt. Copilot-Nutzungsdaten (Häufigkeit, Art der Anfragen) könnten theoretisch aggregiert ausgewertet werden. Eine gute BV schließt das ausdrücklich aus: keine individuellen Nutzungsprofile, keine Kopplung an Zielvereinbarungen, keine Ranking-Listen. Aggregierte, anonymisierte Auswertungen auf Unternehmensebene (z.B. Gesamt-Adoptionsrate) sind davon zu unterscheiden und meist unproblematisch."
    },
    {
      name: "Brauchen wir eine neue Betriebsvereinbarung oder reicht die bestehende M365-BV?",
      answer: "Das hängt vom Inhalt der bestehenden Vereinbarung ab. Wenn Ihre M365-BV keine KI-gestützten Funktionen und deren spezifisches Datenprofil adressiert, brauchen Sie mindestens eine Ergänzungsvereinbarung. Copilot verändert die Nutzung von Microsoft 365 qualitativ – es geht nicht mehr nur um Office-Anwendungen, sondern um KI-gestützte Analysen und Inhaltsgenerierung. In unseren Betriebsrats-Trainings erarbeiten wir konkret, welche Regelungspunkte in eine Copilot-BV gehören."
    },
    {
      name: "Können wir als Betriebsrat einen Sachverständigen hinzuziehen?",
      answer: "Ja – mit einer wichtigen Erleichterung seit 2021: Das Betriebsrätemodernisierungsgesetz macht die Hinzuziehung eines Sachverständigen bei KI-Themen nach §80 Abs. 3 BetrVG zur Regel. Erforderlichkeit muss nicht gesondert nachgewiesen werden. Der Betriebsrat muss sich lediglich mit dem Arbeitgeber auf die konkrete Person und Vergütung einigen. Das ermöglicht externe technische Expertise ohne langen Streit über die Grundsatzfrage."
    },
    {
      name: "Wie sichern wir, dass die Copilot-Einführung wirklich der Belegschaft nützt?",
      answer: "Das ist die entscheidende Frage – und sie zeigt, dass ein konstruktiv agierender Betriebsrat mehr erreicht als einer, der nur blockiert. Konkrete Hebel: Qualifizierungsklausel im §97 Abs. 2 BetrVG-Rahmen verankern (alle Betroffenen werden geschult, nicht nur Early Adopters), Evaluierungsrunde nach 6-12 Monaten vereinbaren, Beschäftigungssicherungsklausel aufnehmen. Und: Selbst Copilot-kompetent werden. Ein Betriebsrat, der das Werkzeug kennt, verhandelt auf Augenhöhe."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Copilot Betriebsrat: Mitbestimmung, Betriebsvereinbarung Muster und Rollout Checkliste. Rechtssicher, praxisnah – BR als Gestalter statt Bremser.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-04-02",
        "dateModified": "2026-04-02",
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
        title="Copilot & Betriebsrat: Mitbestimmung, BV-Muster & Rollout Checkliste"
        description="Copilot Betriebsrat: Mitbestimmungsrechte, Betriebsvereinbarung Muster, Rollout Checkliste. Rechtssicher, praxisnah, KI-Einführung ohne Verzögerung gestalten."
        keywords={[
          "Copilot Betriebsrat",
          "Microsoft Copilot Betriebsrat",
          "Betriebsvereinbarung Copilot Muster",
          "KI Mitbestimmung Betriebsrat",
          "Copilot Rollout Checkliste",
          "Copilot Einführung ohne Verzögerung",
          "KI Betriebsrat Mitbestimmung",
          "Microsoft 365 Copilot Betriebsrat",
          "Copilot Betriebsrat Schulung",
          "KI Einführung Betriebsrat",
          "Copilot Datenschutz Betriebsrat",
          "Betriebsrat KI Schulung"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-04-02T09:00:00+02:00"
        modifiedTime="2026-04-02T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot & Betriebsrat", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Mitbestimmungsrechte kennen, Betriebsvereinbarung gestalten, Rollout aktiv begleiten – ein praxisnaher Leitfaden für Arbeitnehmervertreter."
        lastUpdated="02. April 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5">
          <CardHeader>
            <CardTitle>Schnellantwort</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Microsoft Copilot ist mitbestimmungspflichtig – das ist der Ausgangspunkt. Entscheidender ist
              aber die Frage, was der Betriebsrat mit diesem Recht macht. Wer die Technik versteht,
              kann den Rollout aktiv mitgestalten: klare Regeln für Datenschutz und Nutzung, Schulungsansprüche
              für alle Beschäftigten, und eine Betriebsvereinbarung, die Copilot als das positioniert, was
              es ist – ein Werkzeug für die Belegschaft, nicht gegen sie. Dieser Artikel erklärt den
              rechtlichen Rahmen, korrigiert verbreitete Fehleinschätzungen und liefert konkrete
              Grundlagen für eine Betriebsvereinbarung, der beide Seiten zustimmen können.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p className="text-lg leading-relaxed">
            Wenn Unternehmen Microsoft 365 Copilot einführen, landet das Thema früher oder später auf dem
            Tisch des Betriebsrats. Oft mit wenig Vorlauf, manchmal erst nachdem die Lizenzen schon
            bestellt sind. Das ist ungünstig für alle Beteiligten – denn ein Betriebsrat, der zu spät
            informiert wird, reagiert defensiver als einer, der von Anfang an mitgestaltet.
          </p>
          <p className="leading-relaxed">
            Dieser Leitfaden richtet sich an Betriebsräte, die mehr wollen als ein Vetorecht: die
            verstehen möchten, wie Copilot technisch funktioniert, was rechtlich gilt (und was nicht),
            und wie eine Betriebsvereinbarung aussieht, die den Rollout nicht blockiert, sondern
            absichert. Dazu gehört auch ein ehrlicher Blick auf Fragen, die Betriebsräte häufig
            stellen – und die oft auf Missverständnissen beruhen, die sich klären lassen.
          </p>
        </div>

        {/* CTA-Box Training */}
        <Card className="mb-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <p className="text-base leading-relaxed mb-3">
              <strong>Betriebsrats-Training zur Copilot-Einführung:</strong> Rechtliche Grundlagen,
              praktische Nutzung und Verhandlungskompetenz – in einem 1-2-tägigen Format, das speziell
              für Arbeitnehmervertreter entwickelt wurde. Kosten trägt der Arbeitgeber (§37 Abs. 6 BetrVG).
            </p>
            <Link
              to="/trainings/betriebsrat-ki-workshop"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Zum Betriebsrats-Workshop &rarr;
            </Link>
          </CardContent>
        </Card>

        {/* Sektion 1: Drei Fragen */}
        <section id="drei-vorurteile" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Drei Fragen, die Betriebsräte stellen – differenziert beantwortet
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              In der Praxis tauchen bei Betriebsräten immer wieder drei zentrale Fragen auf, bevor
              Gespräche über eine Betriebsvereinbarung beginnen. Sie sind berechtigt – aber die
              Antworten sind differenzierter als die Fragen vermuten lassen. Wer sie versteht,
              verhandelt mit besseren Karten.
            </p>
          </div>
        </section>

        {/* Frage 1: Überwachung */}
        <section id="vorurteil-ueberwachung" className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Frage 1: Können Vorgesetzte oder Admins meine Prompts lesen?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Im Standard-Betrieb von Microsoft 365 Copilot: Nein. Es gibt kein Admin-Dashboard,
              das einzelne Prompts von Mitarbeitenden anzeigt. Prompt-Verläufe sind an das jeweilige
              Nutzerkonto gebunden – vergleichbar mit dem persönlichen Browsing-Verlauf.
            </p>
            <p className="leading-relaxed">
              Relevant wird das Thema, wenn ein Unternehmen <strong>Microsoft Purview</strong> als
              Compliance-Werkzeug einsetzt. Purview ist ein separates Produkt, das bei konkreten
              Compliance-Verdachtsfällen – etwa einer Datenschutzverletzung oder dem Verdacht auf
              Weitergabe vertraulicher Informationen – gezielt durchsucht werden kann. Es ist weder
              standardmäßig aktiv noch zeigt es kontinuierlich alle Inhalte aller Nutzer an.
              Entscheidend: Der Einsatz von Purview ist selbst mitbestimmungspflichtig. Wer als
              Betriebsrat in der Betriebsvereinbarung festhält, unter welchen Bedingungen
              Purview eingesetzt werden darf und welche Genehmigungswege dabei gelten,
              hat diesen Punkt rechtssicher geregelt – ohne den Einsatz grundsätzlich
              zu blockieren.
            </p>
            <p className="leading-relaxed">
              Die klare Botschaft an die Belegschaft: Copilot ist kein Überwachungssystem.
              Wer das trotzdem befürchtet, kann den Betriebsrat ansprechen – der hat
              dafür gesorgt, dass es schwarzauf weiß in der Vereinbarung steht.
            </p>
          </div>
        </section>

        {/* Frage 2: Jobabbau */}
        <section id="vorurteil-jobabbau" className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Frage 2: Wird Copilot eingeführt, um Stellen abzubauen?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Die Angst vor Stellenabbau durch KI ist verständlich. Sie greift aber zu kurz,
              wenn man konkret schaut, was Copilot in der Praxis auslöst. In Unternehmen,
              die Copilot mit begleitenden Schulungen einführen, entsteht kein Stellenabbau –
              es entsteht Kapazität für Aufgaben, für die vorher keine Zeit war.
            </p>
            <p className="leading-relaxed">
              Was tatsächlich passiert: Beschäftigte, die bisher Stunden für das Formatieren
              von Berichten, das Zusammenfassen langer E-Mail-Threads oder die Vorbereitung
              von Meetings gebraucht haben, erledigen diese Aufgaben schneller. Die gewonnene
              Zeit fließt in inhaltliche Arbeit, Kundengespräche oder Aufgaben, die vorher
              liegen blieben. Das ist nicht Effizienz auf Kosten von Menschen – das ist
              Entlastung von Arbeit, die niemand gerne macht.
            </p>
            <p className="leading-relaxed">
              Noch wichtiger: Copilot eröffnet Beschäftigten Zugänge zu Tätigkeiten, die
              ihnen bisher verschlossen waren – nicht weil sie die Kompetenz fehlte, sondern
              weil das technische Handwerkszeug fehlte. Die Sachbearbeiterin, die bisher
              jemanden aus der Kommunikationsabteilung für jede Präsentation brauchte,
              erstellt sie jetzt selbst. Der Meister, der Dokumentation hasst, diktiert
              seine Gedanken und bekommt ein strukturiertes Protokoll. Das ist
              Selbstwirksamkeit – und die lässt sich nicht wegrationalisieren.
            </p>
            <p className="leading-relaxed">
              Der Betriebsrat kann und sollte das absichern: durch eine
              Beschäftigungssicherungsklausel in der BV und durch das Einfordern des
              Qualifizierungsrechts nach §97 Abs. 2 BetrVG – damit wirklich alle
              Beschäftigten mitgenommen werden, nicht nur die, die ohnehin schon
              technikaffin sind.
            </p>
          </div>
        </section>

        {/* Frage 3: Datenschutz */}
        <section id="vorurteil-datenschutz" className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Frage 3: Was passiert mit unseren Unternehmensdaten?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Microsoft 365 Copilot verarbeitet Unternehmensdaten – das ist sein Funktionsprinzip.
              Es greift auf E-Mails, Dokumente und Kalender zu, um kontextbezogene Antworten
              zu generieren. Was viele nicht wissen: Diese Daten verlassen die Compliance-Grenzen
              des eigenen M365-Mandanten nicht. Microsoft hat vertraglich und durch die
              EU Data Boundary zugesichert, dass Unternehmensdaten innerhalb der EU
              verarbeitet werden und nicht zum Training von KI-Modellen verwendet werden.
            </p>
            <p className="leading-relaxed">
              Was Copilot allerdings sichtbar macht: bestehende Schwachstellen in der
              Berechtigungsstruktur. Wenn in einem Unternehmen historisch gewachsene,
              zu offene SharePoint-Berechtigungen existieren – also Mitarbeitende auf
              Dokumente zugreifen können, für die sie eigentlich keine Berechtigung
              haben sollten – dann gilt das auch mit Copilot. Copilot öffnet keine
              neuen Türen, es zeigt nur, welche schon die ganze Zeit offen standen.
            </p>
            <p className="leading-relaxed">
              Das ist eine Chance: Eine Berechtigungsbereinigung vor dem Rollout ist
              sinnvoll und sollte der Betriebsrat aktiv einfordern. Wer
              Betriebsratsdokumente in einem korrekt abgesicherten SharePoint-Bereich
              ablegt, muss sich keine Gedanken machen – Copilot anderer Nutzer kommt
              dort nicht heran.
            </p>
          </div>
        </section>

        {/* Sektion: Was Copilot für Arbeitnehmer bedeutet */}
        <section id="was-copilot-fuer-arbeitnehmer-bedeutet" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was Copilot für Beschäftigte konkret verändert
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Ein Betriebsrat, der den Rollout aktiv begleitet, sollte die konkreten
              Chancen für die Belegschaft kennen – nicht um Werbung für Microsoft zu
              machen, sondern weil er nur dann fundiert darüber verhandeln kann, wie
              diese Chancen für alle zugänglich gemacht werden.
            </p>
            <p className="leading-relaxed">
              <strong>Qualitätssteigerung statt nur Geschwindigkeit.</strong> Copilot
              hilft beim Formulieren, Strukturieren und Überarbeiten – nicht nur
              schneller, sondern besser. E-Mails werden klarer, Präsentationen
              überzeugender, Meeting-Zusammenfassungen vollständiger. Für
              Beschäftigte bedeutet das: weniger Korrekturrunden, weniger
              Frustration, bessere Arbeitsergebnisse.
            </p>
            <p className="leading-relaxed">
              <strong>Zugang zu neuen Tätigkeiten.</strong> Copilot senkt die
              Einstiegshürde für Aufgaben, die bisher Spezialkenntnisse erforderten.
              Komplexe Excel-Auswertungen per natürlicher Sprache, eigene
              Präsentationen ohne Grafikdesign-Kenntnisse, rechtliche Texte
              strukturieren ohne Anwaltswissen. Das öffnet berufliche
              Entwicklungsmöglichkeiten, die vorher verschlossen waren.
            </p>
            <p className="leading-relaxed">
              <strong>Entlastung von unbeliebter Routinearbeit.</strong>
              Protokolle, Formatierungsarbeiten, das Durchsuchen langer
              Dokumentenmengen nach einem bestimmten Punkt – das sind Aufgaben,
              für die niemand Begeisterung mitbringt. Wenn Copilot diese Arbeit
              übernimmt oder einen brauchbaren Entwurf liefert, bleibt mehr Zeit
              für Tätigkeiten mit echtem inhaltlichen Wert.
            </p>
            <p className="leading-relaxed">
              Diese drei Effekte nutzen nur dann allen Beschäftigten, wenn alle
              geschult werden. Das ist der entscheidende Hebel, den der Betriebsrat
              durch §97 Abs. 2 BetrVG in der Hand hält: Er kann verlangen, dass
              Qualifizierung kein Angebot ist, sondern ein verbindlicher Bestandteil
              des Rollouts.
            </p>
          </div>
        </section>

        {/* Sektion: Kostenlos vs. Bezahlt */}
        <section id="kostenlos-vs-bezahlt" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Kostenloser Copilot vs. Microsoft 365 Copilot: Zwei verschiedene Produkte
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              In Betriebsratsgremien entsteht gelegentlich Verwirrung darüber, über
              welchen Copilot gerade gesprochen wird. Microsoft verwendet den Namen
              für mehrere Produkte mit sehr unterschiedlichen Eigenschaften.
            </p>
            <p className="leading-relaxed">
              Der <strong>kostenlose Microsoft Copilot</strong> ist über Edge-Browser
              oder bing.com erreichbar und für jeden nutzbar. Er hat keinen Zugriff
              auf Unternehmensdaten und arbeitet ausschließlich mit allgemein
              verfügbarem Wissen – vergleichbar mit ChatGPT. Er ist datenschutzrechtlich
              unproblematischer, aber auch deutlich weniger nützlich für berufliche
              Aufgaben. Die Mitbestimmungspflicht nach §87 BetrVG greift nur,
              wenn der Arbeitgeber die Nutzung aktiv vorschreibt.
            </p>
            <p className="leading-relaxed">
              Der <strong>Microsoft 365 Copilot</strong> (ca. 26–30 €/Nutzer/Monat
              zusätzlich zur bestehenden M365-Lizenz, je nach Lizenzmodell) ist
              tief in Word, Excel, PowerPoint, Outlook und Teams integriert.
              Er greift auf die eigenen Arbeitsdaten zu und ist damit das Werkzeug,
              das in Copilot-Rollouts gemeint ist – mit entsprechend höherem Nutzen
              und vollem Mitbestimmungsrecht des Betriebsrats.
            </p>
            <p className="leading-relaxed">
              Für den Betriebsrat ist die Unterscheidung wichtig, weil sie die
              Verhandlungsgrundlage definiert: Geht es um ein allgemeines
              KI-Tool, das Mitarbeitende ohnehin schon privat nutzen? Oder um
              ein in die Unternehmensinfrastruktur integriertes System, das
              Unternehmensdaten verarbeitet? Die Antwort bestimmt, welche Regeln
              in einer Betriebsvereinbarung sinnvoll sind.
            </p>
          </div>
        </section>

        {/* Sektion: Rechtlicher Rahmen */}
        <section id="mitbestimmung-rechte" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Rechtlicher Rahmen: Was gilt, was nicht
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Die Rechtsposition des Betriebsrats bei der Copilot-Einführung ist klar,
              aber nicht unbegrenzt. Ein genaues Bild schützt vor überzogenen
              Erwartungen – und vor unnötigen Auseinandersetzungen.
            </p>
            <p className="leading-relaxed">
              <strong>§87 Abs. 1 Nr. 6 BetrVG</strong> ist das zentrale
              Mitbestimmungsrecht: technische Einrichtungen, die geeignet sind,
              Verhalten oder Leistung zu überwachen, sind mitbestimmungspflichtig.
              Copilot erzeugt Nutzungsdaten und ist damit technisch zur Überwachung
              geeignet – auch wenn der Arbeitgeber das nicht beabsichtigt. Das Recht
              greift also, und zwar vor der Einführung, nicht danach.
            </p>
            <p className="leading-relaxed">
              <strong>Wichtige Einschränkung durch das LAG Hessen (5 TaBV 4/24,
              2024):</strong> Das Gericht hat klargestellt, dass reine
              Datenschutzbedenken ohne konkreten Überwachungsbezug kein
              eigenständiges Mitbestimmungsrecht begründen. Der Betriebsrat kann
              die Einführung also nicht allein aus Datenschutzgründen blockieren –
              er braucht einen konkreten Bezug zur Überwachungseignung.
              Diese Entscheidung ist für die Verhandlungsstrategie relevant:
              Starke Argumente sind konkrete Regelungsbedarfe, keine
              pauschalen Datenschutzbedenken.
            </p>
            <p className="leading-relaxed">
              <strong>§90 BetrVG</strong> verpflichtet den Arbeitgeber zur
              rechtzeitigen Unterrichtung. Das bedeutet: vor dem Lizenzkauf,
              nicht danach. Der Betriebsrat sollte früh signalisieren, dass er
              informiert werden möchte – das verhindert Konflikte, die durch
              schlechte Kommunikation entstehen.
            </p>
            <p className="leading-relaxed">
              <strong>§80 Abs. 3 BetrVG</strong> (Sachverständigenrecht): Seit
              dem Betriebsrätemodernisierungsgesetz 2021 gilt die Hinzuziehung
              eines Sachverständigen bei KI-Themen als grundsätzlich erforderlich.
              Der Betriebsrat muss die Erforderlichkeit nicht mehr nachweisen –
              er muss sich nur mit dem Arbeitgeber auf die Person und Vergütung
              einigen.
            </p>
            <p className="leading-relaxed">
              <strong>EU AI Act und Recruiting:</strong> Copilot als allgemeines
              Produktivitätswerkzeug gilt als Low-Risk-KI. Hochrisiko entsteht,
              wenn Copilot-basierte Systeme automatisiert über Personalentscheidungen
              mitbestimmen. Die Grenze ist eindeutig: Copilot als Werkzeug in
              der Hand eines geschulten, verantwortungsvollen Mitarbeitenden
              beim Bewerberscreening ist zulässig. Ein System, das Bewerber
              automatisch kategorisiert, einordnet oder aussortiert, ohne dass
              ein Mensch die Entscheidung trifft, ist Hochrisiko-KI –
              mitbestimmungspflichtig und ab August 2026 strengen
              Dokumentationsregeln unterworfen.
            </p>
          </div>
        </section>

        {/* Sektion: Betriebsvereinbarung */}
        <section id="betriebsvereinbarung" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was in eine zustimmungsfähige Betriebsvereinbarung gehört
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Eine gute Betriebsvereinbarung für Copilot ist keine Liste von Verboten –
              sie ist ein Regelwerk, dem Arbeitgeber und Betriebsrat zustimmen können,
              weil es den Rollout ermöglicht und gleichzeitig klare Grenzen setzt.
              Die folgenden Regelungspunkte haben sich als Kern einer praxistauglichen
              Copilot-BV bewährt:
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {[
              {
                title: "Geltungsbereich klar definieren",
                text: "Welche Copilot-Produkte sind erfasst (M365 Copilot, Copilot in Teams, Copilot Studio)? Gilt die BV auch für den kostenlosen Copilot bei dienstlicher Nutzung? Eindeutigkeit verhindert spätere Streitigkeiten."
              },
              {
                title: "Zweckbindung und Ausschluss von Leistungskontrolle",
                text: "Copilot-Nutzungsdaten dürfen nicht für individuelle Leistungs- oder Verhaltensauswertungen verwendet werden. Explizit ausschließen: Ranking-Listen, Nutzungsprofile, Kopplung an Zielvereinbarungen. Aggregierte, anonymisierte Adoptionsdaten auf Unternehmensebene sind davon zu trennen – sie sind unproblematisch."
              },
              {
                title: "Compliance-Tools (Purview) separat regeln",
                text: "Unter welchen Voraussetzungen darf Purview Copilot-Interaktionen erfassen? Welches Genehmigungsverfahren gilt? Das muss in der BV stehen – nicht pauschal verboten, aber klar geregelt."
              },
              {
                title: "Berechtigungsstruktur bereinigen",
                text: "Vor dem Rollout prüfen und dokumentieren, dass Zugriffsrechte im M365-Mandanten korrekt gesetzt sind. Besonders: Betriebsrats-Dokumente in einem nur für BR-Mitglieder zugänglichen Bereich ablegen."
              },
              {
                title: "Qualifizierungsklausel verankern",
                text: "Alle Beschäftigten, die Copilot-Zugang erhalten, haben Anspruch auf eine angemessene Schulung. Art, Umfang und Anbieter werden gemeinsam festgelegt (§98 BetrVG). Niemand wird mit dem Werkzeug allein gelassen."
              },
              {
                title: "Recruiting klar abgrenzen",
                text: "Copilot als Unterstützungswerkzeug für geschulte Recruiter: zulässig. Automatisiertes System zur Bewerberklassifizierung ohne menschliche Entscheidung: nicht zulässig. Das muss explizit stehen."
              },
              {
                title: "Beschäftigungssicherungsklausel",
                text: "Die Copilot-Einführung führt nicht unmittelbar zu betriebsbedingten Kündigungen. Bei wesentlichen Tätigkeitsänderungen werden Qualifizierungsmaßnahmen nach §97 Abs. 2 BetrVG vereinbart."
              },
              {
                title: "Evaluierungsklausel",
                text: "Die BV wird nach 6–12 Monaten gemeinsam evaluiert. Neue Copilot-Funktionalitäten (Microsoft aktualisiert regelmäßig) werden zeitnah besprochen. Die Vereinbarung wächst mit der Technik."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start border rounded-lg p-4 bg-muted/20">
                <span className="text-primary font-bold text-lg leading-none mt-0.5 shrink-0">{i + 1}.</span>
                <div>
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <p className="text-base leading-relaxed mb-3">
                <strong>Muster-Textbausteine für die Betriebsvereinbarung</strong> stehen in der
                downloadbaren Checkliste am Ende dieses Artikels – direkt verwendbar als Verhandlungsgrundlage.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Sektion: Betriebsrat nutzt Copilot selbst */}
        <section id="betriebsrat-selbst-nutzen" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Copilot im Betriebsrat selbst produktiv einsetzen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Ein Betriebsrat, der Copilot aus eigener Erfahrung kennt, verhandelt
              auf einer anderen Grundlage als einer, der nur über das Werkzeug
              gelesen hat. Der praktische Vorteil ist erheblich – nicht nur für
              die Verhandlungsposition, sondern für die tägliche Betriebsratsarbeit.
            </p>
            <p className="leading-relaxed">
              <strong>Sitzungsprotokolle:</strong> Mit Copilot in Teams kann ein
              Protokoll während der Sitzung automatisch erstellt werden –
              inklusive Zusammenfassung, Beschlüssen und offenen Punkten.
              Überprüfen und anpassen ist deutlich schneller als von Grund
              auf schreiben.
            </p>
            <p className="leading-relaxed">
              <strong>Betriebsvereinbarungen vorbereiten:</strong> Copilot kann
              auf Basis von Stichworten erste Entwürfe erstellen,
              Formulierungsvorschläge liefern und auf relevante Paragraphen
              hinweisen. Das ersetzt keinen Fachanwalt für Arbeitsrecht,
              spart aber erheblichen Rechercheaufwand.
            </p>
            <p className="leading-relaxed">
              <strong>Belegschaft informieren:</strong> Aushänge, Info-Schreiben
              und Stellungnahmen lassen sich mit Copilot schneller und klarer
              formulieren. Komplexe Gesetzesänderungen in verständlicher Sprache
              zusammenzufassen – dafür ist Copilot besonders nützlich.
            </p>
            <p className="leading-relaxed">
              Das zweite Training-Tag in unserem Betriebsrats-Format ist genau
              diesem praktischen Einstieg gewidmet – damit Betriebsratsmitglieder
              das Werkzeug nicht nur aus der Theorie kennen.
            </p>
          </div>
        </section>

        {/* Sektion: Checkliste */}
        <section id="checkliste-download" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Copilot Rollout Checkliste für Betriebsräte
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p className="leading-relaxed">
              Die wichtigsten Schritte für eine erfolgreiche Begleitung der Copilot-Einführung –
              als kompakte Übersicht und als ausführliches PDF mit Muster-Textbausteinen für die
              Betriebsvereinbarung:
            </p>
          </div>

          <div className="space-y-2 mb-6">
            {[
              "Arbeitgeber hat Betriebsrat rechtzeitig informiert (§90 BetrVG) – vor dem Lizenzkauf",
              "Welche Copilot-Produkte werden eingeführt? (M365 Copilot, Teams, Studio, kostenlos?)",
              "Wird Microsoft Purview eingesetzt? Falls ja: eigene BV-Regelung erforderlich",
              "Berechtigungsstruktur im M365-Mandanten geprüft und ggf. bereinigt",
              "Betriebsrats-Dokumente in geschütztem SharePoint-Bereich abgelegt",
              "Mitbestimmungsrecht §87 Abs. 1 Nr. 6 BetrVG geltend gemacht",
              "Sachverständigen hinzugezogen falls nötig (§80 Abs. 3 BetrVG)",
              "Schulungsanspruch für BR-Mitglieder nach §37 Abs. 6 BetrVG eingefordert",
              "Qualifizierungsrecht für alle Beschäftigten nach §97 Abs. 2 BetrVG verankert",
              "BV enthält: Zweckbindung, Überwachungsausschluss, Purview-Regelung",
              "BV enthält: Qualifizierungsklausel, Beschäftigungssicherung, Evaluierung",
              "Recruiting-Regelung klar: Copilot als Werkzeug für Menschen – kein automatisiertes Screening",
              "EU AI Act geprüft: kein Hochrisiko-Einsatz (automatisierte Personalentscheidungen) ohne Dokumentation",
              "Belegschaft über Einführung, Zweck und BV-Regeln informiert",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 text-primary shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                <p className="text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <p className="text-base leading-relaxed mb-3">
                <strong>Als PDF herunterladen:</strong> Checkliste + rechtliche Grundlagen +
                Muster-Textbausteine für die Betriebsvereinbarung – alles in einem Dokument,
                direkt nutzbar als Verhandlungsgrundlage.
              </p>
              <a
                href="/downloads/checkliste-copilot-betriebsrat.pdf"
                download
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Checkliste als PDF herunterladen &rarr;
              </a>
            </CardContent>
          </Card>
        </section>

        {/* Sektion: Training */}
        <section id="training-betriebsrat" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Schulung für Betriebsräte: Kompetenz statt Abhängigkeit
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="leading-relaxed">
              Die Copilotenschule bietet ein eigenes Schulungsformat an, das speziell
              für Betriebsräte und Personalvertretungen entwickelt wurde. Es ist kein
              umfunktioniertes Standard-Training – es stellt die Perspektive der
              Arbeitnehmervertretung in den Mittelpunkt.
            </p>
            <p className="leading-relaxed">
              <strong>Tag 1 – Recht und Verhandlungskompetenz:</strong> Mitbestimmungsrechte
              bei KI-Einführung (§87, §80, §90, §97 BetrVG), aktueller Rechtsprechungsstand
              (LAG Hessen 2024), Datenschutz und Berechtigungsstruktur in Microsoft 365,
              EU AI Act und seine Konsequenzen für den Betriebsrat, Regelungspunkte
              für die Betriebsvereinbarung, Copilot im Recruiting – was geht, was nicht.
            </p>
            <p className="leading-relaxed">
              <strong>Tag 2 (optional) – Copilot in der Praxis:</strong>
              Unterschied kostenloser Copilot vs. Microsoft 365 Copilot,
              praktisches Arbeiten mit Word, Excel, Outlook und Teams,
              Copilot für die eigene Betriebsratsarbeit (Protokolle, BV-Entwürfe,
              Kommunikation), Grenzen von KI erkennen.
            </p>
            <p className="leading-relaxed">
              Die Schulungskosten trägt der Arbeitgeber nach §37 Abs. 6 BetrVG.
              Nutzen Sie unsere fertige Begründungshilfe, um den Schulungsanspruch
              gegenüber Ihrem Arbeitgeber geltend zu machen:
            </p>
            <p className="leading-relaxed">
              <a
                href="/downloads/begruendungshilfe-betriebsrat-ki-schulung.pdf"
                download
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Begründungshilfe als PDF herunterladen &rarr;
              </a>
            </p>
          </div>

          <Card className="mt-4 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <p className="text-base leading-relaxed mb-3">
                <strong>Interesse am Betriebsrats-Training?</strong> Wir stimmen
                Format, Inhalte und Tiefe auf Ihr Gremium ab – ob 8 oder 30
                Betriebsratsmitglieder, ob erstes Gespräch oder kurz vor der
                BV-Unterzeichnung.
              </p>
              <Link
                to="/trainings/betriebsrat-ki-workshop"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Workshop-Details ansehen &rarr;
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold leading-snug">
                    {faq.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </ContentLayout>
    </>
  );
};

export default CopilotBetriebsrat;
