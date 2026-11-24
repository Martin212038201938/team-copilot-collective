import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { bookingClickToThankYou } from "@/lib/booking";

const SLUG = "copilot-cowork-praxisleitfaden";
const PAGE_TITLE = "Copilot Cowork: Die Zukunft der Arbeit beginnt JETZT";

const BOOKING_URL =
  "https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled";

/* ---------- Bausteine ---------- */

interface AuftragZeile {
  label: string;
  text: string;
}

const AuftragBox = ({ titel, zeilen }: { titel: string; zeilen: AuftragZeile[] }) => (
  <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-5">
    <p className="text-sm font-semibold text-muted-foreground mb-3">{titel}</p>
    <dl className="space-y-2 text-base leading-relaxed">
      {zeilen.map((z) => (
        <div key={z.label}>
          <dt className="inline font-semibold">{z.label}: </dt>
          <dd className="inline">{z.text}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const ErstgespraechCTA = ({
  heading,
  text,
  source,
}: {
  heading: string;
  text: string;
  source: string;
}) => (
  <Card className="my-8 border-2 border-primary/30 bg-primary/5">
    <CardContent className="py-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <p className="font-semibold text-lg mb-1">{heading}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => bookingClickToThankYou(source)}
        className="inline-flex items-center justify-center shrink-0 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Erstgespräch buchen
      </a>
    </CardContent>
  </Card>
);

const ablaufSchritte = [
  { titel: "Auftrag", text: "Ziel, Kontext, Akzeptanzkriterien und Leitplanken beschreiben" },
  { titel: "Plan", text: "Cowork zerlegt den Auftrag in einzelne Schritte" },
  { titel: "Ausführung", text: "Arbeit über Outlook, Teams, Office-Dateien und SharePoint hinweg, für Sie sichtbar" },
  { titel: "Freigabe", text: "Vor Versand, Termin oder Post hält Cowork an und wartet auf Sie" },
  { titel: "Abnahme", text: "Ergebnisse liegen in OneDrive oder SharePoint, Sie prüfen und nehmen ab" },
];

const CoworkAblauf = () => (
  <figure className="my-8">
    <div className="flex flex-col md:flex-row md:items-stretch gap-2">
      {ablaufSchritte.map((schritt, index) => (
        <div key={schritt.titel} className="flex flex-col md:flex-row md:items-center gap-2 md:flex-1">
          <div className="flex-1 rounded-lg border-2 border-primary/30 bg-primary/5 p-4 h-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {index + 1}
              </span>
              <span className="font-semibold">{schritt.titel}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-snug">{schritt.text}</p>
          </div>
          {index < ablaufSchritte.length - 1 && (
            <div className="flex justify-center text-primary/60" aria-hidden="true">
              <ArrowDown className="h-5 w-5 md:hidden" />
              <ArrowRight className="hidden md:block h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="mt-3 rounded-lg border border-dashed border-primary/40 p-3 text-sm text-center">
      <span className="font-semibold">Sie steuern jederzeit:</span> unterbrechen, Kontext nachreichen,
      pausieren, fortsetzen oder abbrechen
    </div>
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      So läuft ein Auftrag in Copilot Cowork ab
    </figcaption>
  </figure>
);

const tabellenZeilen = [
  {
    kriterium: "Wofür",
    chat: "Fragen, Entwürfe, Zusammenfassungen",
    agentMode: "Arbeit in einem Word-, Excel- oder PowerPoint-Dokument",
    cowork: "Mehrstufige Aufgaben über mehrere Anwendungen hinweg",
    builder: "Spezialisierte Assistenten mit festen Anweisungen und Wissensquellen",
    studio: "Agenten und Workflows mit Auslösern, Systemanbindung und eigenen Kanälen",
  },
  {
    kriterium: "Ihre Rolle",
    chat: "Sie steuern jeden Schritt",
    agentMode: "Sie arbeiten im Dokument mit",
    cowork: "Sie beschreiben das Ziel, prüfen Zwischenstände und geben frei",
    builder: "Sie wählen den passenden Agenten aus",
    studio: "Fachbereich oder IT baut, viele nutzen",
  },
  {
    kriterium: "Dauer",
    chat: "Sekunden bis Minuten",
    agentMode: "Sekunden bis Minuten",
    cowork: "Minuten bis Stunden, auch nach Zeitplan oder Ereignis",
    builder: "Pro Anfrage",
    studio: "Dauerhaft, auch ohne laufende Nutzersitzung",
  },
  {
    kriterium: "Typisches Beispiel",
    chat: "Mailentwurf, Frage an den Posteingang",
    agentMode: "Bericht überarbeiten, Excel-Analyse, Foliensatz",
    cowork: "Kundentermin vorbereiten, Monatsbericht erstellen und ablegen",
    builder: "Agent, der Fragen zur Reiserichtlinie beantwortet",
    studio: "Workflow, der bei neuen Dateien prüft, informiert und eine Freigabe anstößt",
  },
  {
    kriterium: "Abrechnung",
    chat: "In der Microsoft 365 Copilot-Lizenz",
    agentMode: "In der Microsoft 365 Copilot-Lizenz",
    cowork: "Lizenz plus verbrauchsabhängige Copilot Credits",
    builder: "In der Microsoft 365 Copilot-Lizenz",
    studio: "Abhängig von Konfiguration und Kanal",
  },
];

const thClass = "text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold align-top";
const tdClass = "p-3 border border-gray-200 dark:border-gray-700 align-top";

/* ---------- Seite ---------- */

const CopilotCoworkPraxisleitfaden = () => {
  const martinLang = getAuthor("martin-lang")!;
  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-cowork-anders-macht", title: "Was Copilot Cowork anders macht als der Chat", level: 2 },
    { id: "guter-auftrag", title: "Vom Prompt zum Auftrag", level: 2 },
    { id: "anwendungsfaelle", title: "Anwendungsfälle: Wo sich Cowork heute lohnt", level: 2 },
    { id: "vertrieb-marketing", title: "Vertrieb und Marketing", level: 3 },
    { id: "hr-ld", title: "HR und Learning & Development", level: 3 },
    { id: "controlling-projekte", title: "Controlling und Projektarbeit", level: 3 },
    { id: "steuern-statt-erledigen", title: "Der Preis: Multitasking bis zur Hirnschmelze", level: 2 },
    { id: "fachkompetenz", title: "Fachkompetenz bewahren, wenn die Umsetzung wegfällt", level: 2 },
    { id: "abgrenzung", title: "Cowork, Agent Mode oder eigener Agent?", level: 2 },
    { id: "einfuehrung", title: "Was Entscheider vor dem Start klären sollten", level: 2 },
    { id: "fazit", title: "Mein Fazit", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir haben Copilot-Lizenzen, aber unsere Leute nutzen Cowork wie einen besseren Chat. Wie ändern wir das?",
      answer:
        "Indem Sie den Wechsel vom Prompten zum Delegieren bewusst trainieren. Cowork liefert dann gute Ergebnisse, wenn ein Auftrag Ziel, Kontext, Akzeptanzkriterien und Leitplanken enthält und wenn die Person das Ergebnis schnell und kritisch prüfen kann. Das lernt kaum jemand nebenbei. Die Copilotenschule trainiert genau diesen Wechsel in praxisnahen Übungen, damit Ihr Team Cowork im Alltag wirklich nutzt. In einem kurzen Erstgespräch klären wir, welches Format zu Ihrer Ausgangslage passt.",
    },
    {
      name: "Woran erkennen wir, ob eine Aufgabe in Cowork, im Agent Mode oder in einem eigenen Agenten besser aufgehoben ist?",
      answer:
        "Eine einfache Faustregel hilft: Entsteht genau ein Dokument, reicht der Agent Mode in Word, Excel oder PowerPoint. Braucht die Aufgabe mehrere Anwendungen oder Folgeschritte wie Versand und Terminplanung, ist Cowork richtig. Sollen viele Kolleginnen und Kollegen dieselbe Lösung nutzen oder soll sie ohne Nutzersitzung laufen, gehört sie in einen Agenten aus dem Agent Builder oder aus Copilot Studio. Die Copilotenschule hilft Teams in Trainings und Workshops, diese Einordnung sicher zu treffen, und schult den Bau eigener Agenten mit Copilot Studio.",
    },
    {
      name: "Wie verhindern wir, dass die Cowork-Kosten aus dem Ruder laufen?",
      answer:
        "Setzen Sie vor dem Start Verbrauchsgrenzen im Microsoft 365 Admin Center, auf Ebene des Tenants, einzelner Gruppen und Nutzer, und hinterlegen Sie Warnschwellen. Genauso wichtig ist die Auftragsqualität: Ein unklarer Auftrag erzeugt Arbeit, die niemand braucht, und kostet trotzdem Credits. Wer seinem Team beibringt, präzise zu delegieren, spart Geld und Prüfzeit. Die Copilotenschule begleitet Unternehmen bei der Einführung und trainiert die Auftragsklärung, die Cowork wirtschaftlich macht.",
    },
    {
      name: "Können wir Copilot Cowork als europäisches Unternehmen datenschutzkonform einsetzen?",
      answer:
        "Cowork arbeitet innerhalb der Sicherheits- und Compliance-Grenzen von Microsoft 365, nutzt ausschließlich die Berechtigungen der jeweiligen Person und übernimmt Vertraulichkeitsbezeichnungen. Tenants innerhalb der EU-Datengrenze können in Cowork derzeit nur GPT-Modelle verwenden. Microsoft hat angekündigt, die Verarbeitung der Claude-Modelle Anfang Dezember 2026 in die EU-Datengrenze zu verlagern und Claude am 9. Dezember 2026 für berechtigte EU-Tenants ohne eigene Auswahl standardmäßig einzuschalten. Diese Entscheidung sollte gemeinsam mit dem Datenschutz getroffen werden. Die Copilotenschule erklärt Führungskräften, Datenschutzverantwortlichen und Betriebsräten verständlich, was Cowork technisch tut.",
    },
    {
      name: "Unsere Mitarbeitenden befürchten, dass Cowork ihre Arbeit übernimmt. Wie gehen wir damit um?",
      answer:
        "Mit Ehrlichkeit. Cowork übernimmt tatsächlich viele operative Schritte. Die Arbeit verschwindet dadurch aber nicht, sie verlagert sich zu Zielklärung, Kommunikation mit Stakeholdern und Qualitätssicherung. Diese Fähigkeiten werden wertvoller, nicht weniger wert. Wer das früh offen anspricht und Mitarbeitende gezielt auf die neue Rolle vorbereitet, nimmt der Angst die Grundlage. Die Copilotenschule unterstützt mit Formaten für Strategie und Change Management sowie mit Trainings, die genau diese Steuerungskompetenz aufbauen.",
    },
    {
      name: "Wie verhindern wir, dass Nachwuchskräfte durch Cowork die Grundlagen ihres Fachs nie lernen?",
      answer:
        "Indem Sie in Einarbeitung und Ausbildung bewusst festlegen, was an Copilot delegiert werden darf und was neue Kolleginnen und Kollegen mindestens einmal selbst operativ erledigt haben sollten, um es zu verstehen. Den ersten Monatsbericht oder die erste Terminvorbereitung machen sie von Hand, später übernimmt Cowork und sie prüfen das Ergebnis. Nur wer eine Aufgabe einmal selbst gemacht hat, kann später beurteilen, ob der Agent gute Arbeit liefert. Die Copilotenschule unterstützt L&D-Verantwortliche und Führungskräfte dabei, KI-Nutzung so in Lernpfade und Einarbeitungspläne einzubauen, dass Fachkompetenz erhalten bleibt.",
    },
    {
      name: "Wie messen wir, ob sich Copilot Cowork für uns lohnt?",
      answer:
        "Messen Sie vor dem Pilot, wie lange eine konkrete Aufgabe heute dauert und wie oft das Ergebnis nachgearbeitet werden muss, und vergleichen Sie das mit dem Aufwand inklusive Prüfzeit während des Pilots. Ohne diesen Vorher-Wert bleibt jede Bewertung ein Bauchgefühl. Starten Sie mit einer klar umrissenen Aufgabe und einem Verantwortlichen, der die Qualität beurteilen kann. Die Copilotenschule hilft Entscheidern im Erstgespräch und in der Strategieberatung, einen Pilot aufzusetzen, der belastbare Antworten liefert.",
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
          "Copilot Cowork steht für eine grundlegend andere Art zu arbeiten. Praxisleitfaden: wie Sie Aufgaben richtig delegieren, welche Anwendungsfälle sich in Vertrieb, Marketing, HR, Controlling und Projektarbeit lohnen und wann Agent Mode oder ein eigener Agent besser passt.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": { "@id": "https://copilotenschule.de/#organization" },
        "datePublished": "2026-11-26",
        "dateModified": "2026-11-26",
        "keywords": [
          "Copilot Cowork",
          "Microsoft Copilot Cowork",
          "Copilot Cowork nutzen",
          "Copilot Cowork Anwendungsfälle",
          "Copilot Cowork Agent Mode",
          "Copilot Cowork Agenten",
          "Copilot Cowork Copilot Studio",
          "agentisches Arbeiten Microsoft 365",
          "Zukunft der Arbeit KI",
        ],
        "articleSection": "Microsoft 365 Copilot",
        "inLanguage": "de-DE",
        "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
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
        title="Copilot Cowork: Die Zukunft der Arbeit beginnt JETZT"
        description="Copilot Cowork verändert, wie wir arbeiten: delegieren statt prompten, Use Cases, Abgrenzung zu Agent Mode und Agenten und was Sie selbst können müssen."
        keywords={[
          "Copilot Cowork",
          "Microsoft Copilot Cowork",
          "Copilot Cowork Anleitung",
          "Copilot Cowork nutzen",
          "Copilot Cowork Use Cases",
          "Copilot Cowork Anwendungsfälle",
          "Copilot Cowork Beispiele",
          "Copilot Cowork vs Agent Mode",
          "Copilot Cowork Agenten",
          "Copilot Cowork Copilot Studio",
          "Copilot Cowork Agent Builder",
          "Copilot Cowork Skills",
          "Copilot Cowork Freigabe",
          "Copilot Cowork EU Data Boundary",
          "Copilot Cowork Einführung",
          "agentisches Arbeiten Microsoft 365",
          "Zukunft der Arbeit KI",
          "Copilot Cowork Fachkompetenz",
          "AI Brain Fry",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-11-26T09:00:00+01:00"
        modifiedTime="2026-11-26T09:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Cowork Praxisleitfaden", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Copilot Cowork ist kein weiteres Feature, sondern eine völlig andere Art zu arbeiten. Wie Sie Arbeit wirklich abgeben, welche Anwendungsfälle sich lohnen, wann Agent Mode oder ein eigener Agent besser passt und welche Kompetenz Sie trotzdem behalten müssen."
        lastUpdated="26. November 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:copilot-cowork-abrechnung-copilot-credits",
          "wissen:claude-in-microsoft-copilot",
          "wissen:copilot-agent-mode-word-excel-powerpoint",
          "wissen:ki-agenten",
          "wissen:copilot-studio",
        ]}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Schnellantwort</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Copilot Cowork ist das agentische System in Microsoft Copilot und steht für eine grundlegend andere Art
              zu arbeiten. Sie beschreiben ein Ergebnis, Cowork
              plant die Schritte, arbeitet sich durch Outlook, Teams, Word, Excel, PowerPoint, OneDrive und
              SharePoint und hält vor heiklen Aktionen wie dem Versand einer Mail an, bis Sie freigeben. Ihre Arbeit
              verschiebt sich damit vom Erledigen zum Steuern: Sie formulieren Ziel, Kontext, Akzeptanzkriterien und
              Leitplanken und prüfen das Ergebnis. Umso wichtiger wird es, die eigene Fachkompetenz zu bewahren, gerade
              in Einarbeitung und Ausbildung. Für Arbeit in einem einzelnen Dokument genügt der Agent Mode in
              Word, Excel und PowerPoint. Für Abläufe, die viele nutzen oder die ohne Sie laufen sollen, ist ein
              eigener Agent die bessere Wahl. Voraussetzung ist eine Microsoft 365 Copilot-Lizenz, Cowork selbst wird
              zusätzlich nach Verbrauch abgerechnet.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p className="text-lg leading-relaxed">
            Wer Copilot Cowork zum ersten Mal öffnet, tippt fast immer einen Prompt. Eine Frage, eine Bitte,
            vielleicht zwei Sätze. Das Ergebnis ist ordentlich, manchmal sogar beeindruckend, und trotzdem hat man
            das Werkzeug falsch benutzt. Cowork ist kein besserer Chat. Cowork ist ein Kollege, dem man einen
            Auftrag erteilt. Wer ihm keinen Auftrag erteilt, bekommt bestenfalls einen fleißigen Praktikanten, der
            errät, was gemeint sein könnte.
          </p>
          <p>
            Ich schreibe das nicht aus der Theorie. Nach gut anderthalb Jahren, in denen ich konsequent AI-first
            gearbeitet habe, bin ich Anfang 2026 auf echte agentische Arbeit umgestiegen, zuerst mit Claude Cowork,
            dem Werkzeug von Anthropic, auf dem Microsofts Variante technisch aufsetzt. Meine Art zu arbeiten hat
            sich seitdem komplett auf den Kopf gestellt. Ich erledige große Teile meiner Arbeit nicht mehr Schritt
            für Schritt selbst, sondern gebe sie ab und prüfe, was zurückkommt. Der Weg dahin war nicht glatt. Es
            gab Fehlschläge und eine Lernkurve, die stellenweise steiler war, als ich erwartet hatte. Begeistert bin
            ich trotzdem, und zwar so sehr, dass ich mich weit aus dem Fenster lehne: In nicht allzu ferner Zukunft
            werden wir viele Tätigkeiten vollständig abgeben können, die heute noch ganze Arbeitstage füllen.
          </p>
          <p>
            Umso mehr hat mich gefreut, dass Microsoft für Copilot Cowork nach eigener Aussage eng mit Anthropic
            zusammengearbeitet und die Technologie hinter Claude Cowork in Microsoft 365 integriert hat. Der
            entscheidende Unterschied liegt in der Umgebung. Copilot Cowork arbeitet mit den Berechtigungen der
            jeweiligen Person, übernimmt Vertraulichkeitsbezeichnungen und bleibt innerhalb der Sicherheits- und
            Compliance-Regeln, die ein Unternehmen für seinen Tenant ohnehin festgelegt hat. Für europäische
            Unternehmen kommt eine Nachricht dazu, auf die viele gewartet haben: Microsoft hat angekündigt, die
            Verarbeitung der Claude-Modelle in Copilot ab Anfang Dezember 2026 in die EU-Datengrenze zu holen, Cowork
            eingeschlossen. Damit fällt das wichtigste Argument weg, das bisher gegen diese Modelle in europäischen
            Tenants sprach.
          </p>
          <p>
            Wer Cowork für ein weiteres Copilot-Feature hält, unterschätzt, was hier passiert. Es ist eine komplett
            andere Art zu arbeiten, und für mich ist es ein ziemlich konkreter Blick in die Zukunft der Arbeit. Dieser
            Leitfaden zeigt, wie diese Arbeit tatsächlich aussieht, welche Aufgaben sich lohnen und wo die Grenze zu
            Agent Mode und eigenen Agenten verläuft. Er handelt aber auch von dem Preis, den diese Arbeitsweise hat,
            und von der Kompetenz, die wir nicht mit abgeben dürfen. Beides ist real, und in den Produktvorstellungen
            kommt beides nicht vor.
          </p>
        </div>

        {/* Was Cowork anders macht */}
        <section id="was-cowork-anders-macht" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Was Copilot Cowork anders macht als der Chat</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Unterschied zwischen Copilot Chat und Cowork liegt nicht in der Intelligenz des Modells, sondern
              darin, wer die Schritte macht. Im Chat steuern Sie jeden Schritt selbst. Sie fragen, lesen die Antwort,
              entscheiden über den nächsten Schritt, kopieren den Text in eine Mail und schicken sie ab. In Cowork
              beschreiben Sie das Ergebnis. Cowork macht daraus einen Plan, arbeitet die Schritte nacheinander ab und
              zeigt Ihnen laufend, woran es gerade sitzt. Es durchsucht Postfach, Teams-Nachrichten und Dateien,
              erstellt Word-, Excel-, PowerPoint- und PDF-Dateien oder bearbeitet bestehende Dokumente direkt in
              OneDrive und SharePoint, plant Termine und schreibt Nachrichten. Microsoft beschreibt das selbst als den
              Schritt vom Beschreiben zum Erledigen, und genau so fühlt es sich an.
            </p>
            <p>
              Cowork hält an und wartet auf Ihre Freigabe bei kritischen Schritten und bevor etwas in Ihrem Namen
              an Dritte verschickt wird. Bevor eine Mail das Haus verlässt, eine Nachricht in Teams erscheint oder ein
              Termin in fremden Kalendern landet, sehen Sie eine Vorschau und entscheiden, ob es weitergeht. Bei Aktionen mit mittlerem oder hohem Risiko blendet Cowork zusätzlich eine
              Risikoeinstufung ein. Sie können jederzeit unterbrechen, Kontext nachreichen, pausieren oder abbrechen.
              Fehlt Cowork eine Information, stellt es eine Rückfrage mit Antwortvorschlägen, statt zu raten. Meistens
              jedenfalls.
            </p>
          </div>

          <CoworkAblauf />

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Zwei Eigenschaften verändern die Arbeitsweise stärker, als man anfangs vermutet. Erstens läuft Cowork in
              einer geschützten Cloud-Umgebung weiter, auch wenn Sie den Laptop zuklappen oder vom Rechner aufs Handy
              wechseln. Aufgaben dauern nicht Sekunden, sondern Minuten bis Stunden, und genau dafür ist das System
              gebaut. Zweitens kann Cowork Aufträge selbstständig wiederholen: nach Zeitplan, etwa jeden Montag um
              acht Uhr, oder ausgelöst durch ein Ereignis wie eine eingehende Mail oder eine Erwähnung in Teams.
              Ereignisgesteuerte Aufgaben bereiten Aktionen standardmäßig zur Freigabe vor, statt sie selbst
              auszuführen. Das ist eine vernünftige Voreinstellung, die man nicht leichtfertig aufweichen sollte.
            </p>
            <p>
              Wer regelmäßig mit Cowork arbeitet, stellt schnell fest, dass sich Aufträge wiederholen. Dafür gibt es
              drei Stellschrauben. In den persönlichen Einstellungen hinterlegen Sie Anweisungen, die für jede Aufgabe
              gelten, zum Beispiel Tonalität, Formatvorgaben oder Regeln für Termine. Für wiederkehrende Methoden legen
              Sie eigene Skills an. Dafür genügt eine Textdatei namens SKILL.md in einem Unterordner von
              /Documents/Cowork/skills/ in Ihrem OneDrive, bis zu 50 solcher Skills erkennt Cowork automatisch. Und
              über Plugins aus dem Microsoft 365 App Store bekommt Cowork Fachwissen und Zugang zu Drittsystemen,
              wobei die IT festlegt, welche Plugins im Unternehmen zur Verfügung stehen.
            </p>
            <p>
              Genauso wichtig ist, was Cowork nicht tut. Lokale Dateien auf Ihrem Rechner bleiben außen vor, Cowork
              arbeitet mit OneDrive und SharePoint. Dateien und Ordner löschen kann es dort nicht. Und es sieht exakt
              das, was Sie sehen dürfen, nicht mehr und nicht weniger. Zu finden ist Cowork in der Microsoft Copilot
              App, also der früheren Microsoft 365 Copilot App, im Browser, auf dem Desktop unter Windows und macOS
              und auf dem Smartphone, sofern Ihre IT es freigeschaltet hat.
            </p>
          </div>
        </section>

        {/* Guter Auftrag */}
        <section id="guter-auftrag" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Vom Prompt zum Auftrag: So sagen Sie Cowork, was es erledigen soll
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die wichtigste Fähigkeit im Umgang mit Cowork hat wenig mit Prompting im klassischen Sinn zu tun. Sie
              erinnert eher an das, was ein guter Product Owner in einem agilen Team tut. Er schreibt dem Team nicht
              vor, wie es arbeiten soll. Er beschreibt, was am Ende stehen muss, warum es gebraucht wird, woran man
              erkennt, dass es fertig ist, und was auf keinen Fall passieren darf. Genau diese vier Dinge braucht auch
              Cowork: ein Ziel, Kontext, Akzeptanzkriterien und Leitplanken.
            </p>
            <p>
              Das Ziel ist ein Ergebnis, keine Tätigkeit. „Analysiere die Umsatzzahlen“ ist eine Tätigkeit. „Eine
              zweiseitige Abweichungsanalyse für die Geschäftsführung, die erklärt, warum der Oktober unter Plan
              liegt“ ist ein Ergebnis. Der Kontext sagt, wo die Informationen liegen, wer das Ergebnis bekommt und was
              diese Person schon weiß. Die Akzeptanzkriterien legen fest, woran Sie das Ergebnis messen, also Umfang,
              Format, Quellenangaben und Tonalität. Die Leitplanken bestimmen, was Cowork nicht darf: nichts
              verschicken, keine Termine mit Externen anlegen, keine Zahlen schätzen, wenn sie fehlen. Ein fünfter
              Punkt wird gern vergessen, nämlich Zwischenstopps. Wenn Cowork Ihnen erst zeigen soll, welche Quellen es
              gefunden hat, bevor es die Präsentation baut, müssen Sie das sagen.
            </p>
          </div>

          <AuftragBox
            titel="Beispielauftrag Vertrieb: Vorbereitung eines Kundentermins"
            zeilen={[
              {
                label: "Ziel",
                text: "Bereite mein Jahresgespräch mit [Kunde] am Donnerstag vor. Ich brauche eine einseitige Übersicht als Word-Dokument.",
              },
              {
                label: "Kontext",
                text: "Nutze die Mails und Teams-Nachrichten der letzten zwölf Monate mit Personen von [Kunde], die Angebote im SharePoint-Ordner Vertrieb/[Kunde] und die Notizen aus unseren letzten beiden Terminen.",
              },
              {
                label: "Akzeptanzkriterien",
                text: "Die Übersicht enthält offene Punkte, Zusagen von unserer Seite, die Entwicklung der Auftragswerte laut Angebotsliste und drei Vorschläge für Gesprächsziele. Jede Aussage mit Quelle.",
              },
              {
                label: "Leitplanken",
                text: "Nichts verschicken, keine Termine anlegen. Wenn Zahlen fehlen, markiere die Lücke, statt zu schätzen.",
              },
              {
                label: "Zwischenstopp",
                text: "Zeig mir zuerst, welche Quellen du gefunden hast, bevor du die Übersicht schreibst.",
              },
            ]}
          />

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Hier liegt die erste unbequeme Wahrheit. Im Chat kostet ein schlechter Prompt eine schlechte Antwort.
              Sie lesen sie, verwerfen sie und formulieren neu. In Cowork kostet ein schlechter Auftrag ausgeführte
              Arbeit. Cowork baut dann eben fünf Folien, die niemand braucht, wertet die falsche Version einer
              Excel-Datei aus oder bereitet eine Mail an einen Verteiler vor, der davon nichts wissen sollte. Das
              kostet Prüfzeit, und weil Cowork nach Verbrauch abgerechnet wird, kostet es auch Geld. Wer sich im Chat
              angewöhnt hat, sich durch Nachfragen an das Ergebnis heranzutasten, wird in Cowork teuer. Die
              Sorgfalt muss nach vorne wandern, in die Auftragsklärung. Das ist für viele ungewohnt, und es erklärt,
              warum manche nach dem ersten Versuch enttäuscht sagen, Cowork könne weniger als versprochen.
            </p>
          </div>
        </section>

        {/* Anwendungsfälle */}
        <section id="anwendungsfaelle" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Anwendungsfälle: Wo sich Cowork heute lohnt</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Welche Aufgaben eignen sich? Microsoft liefert in seinen Einführungsleitfäden eine brauchbare
              Richtschnur: wiederkehrende Arbeit, die Urteilsvermögen verlangt, sich aus mehreren Quellen speist und
              einen klaren Verantwortlichen hat. Ich ergänze ein Kriterium, das in keinem Leitfaden steht und
              trotzdem über Erfolg oder Frust entscheidet. Das Ergebnis muss sich in wenigen Minuten prüfen lassen.
              Wenn die Kontrolle so lange dauert wie das Selbermachen, haben Sie nichts gewonnen. Die folgenden
              Beispiele sind typische Muster aus drei Bereichen, keine Hochglanz-Demos.
            </p>
          </div>

          <h3 id="vertrieb-marketing" className="text-xl md:text-2xl font-semibold mt-6 mb-2">
            Vertrieb und Marketing
          </h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Im Vertrieb ist die Terminvorbereitung der naheliegende Einstieg, und der Beispielauftrag oben zeigt,
              wie sie aussieht. Interessanter wird es bei Aufgaben, die heute niemand gern macht. Ein Pipeline-Review
              zum Beispiel, bei dem jemand den Export aus dem CRM, die Mails zu einzelnen Verkaufschancen und die
              letzten Abstimmungen in Teams nebeneinanderlegen muss, um zu verstehen, welche Abschlüsse wirklich
              wackeln. Microsoft berichtet von einer Vertriebsleitung, die so aus einer festgefahrenen Pipeline eine
              priorisierte Liste gefährdeter Verkaufschancen erhielt und eine Woche Durchsicht auf einen Vormittag
              verkürzte. Das ist eine Herstellerangabe, das Muster dahinter halte ich aber für plausibel. Cowork liest
              schneller quer als jeder Mensch, die Bewertung der Liste bleibt beim Vertrieb.
            </p>
            <p>
              Im Marketing steckt der Nutzen eher in der Nachbereitung. Nach einer Kampagne liegen die Kennzahlen in
              Excel, Rückmeldungen aus dem Vertrieb in einem Teams-Kanal und das ursprüngliche Briefing in SharePoint.
              Cowork kann daraus eine Auswertung schreiben, die die Ergebnisse an den Zielen des Briefings misst, eine
              kurze Präsentation für das Management bauen und die Mail an die Stakeholder als Entwurf vorbereiten.
              Auch HTML-Newsletter per Mail gehören zum Repertoire. Die Leitplanke ist hier besonders wichtig:
              Entwürfe ja, Versand erst nach Abnahme. Für Marketing und Vertrieb hat Microsoft eigene Task Packs
              veröffentlicht, ausformulierte Beispielabläufe, die sich als Startpunkt gut eignen.
            </p>
          </div>

          <h3 id="hr-ld" className="text-xl md:text-2xl font-semibold mt-6 mb-2">
            HR und Learning &amp; Development
          </h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Im Personalbereich ist das Onboarding das Paradebeispiel, weil hier viele kleine Schritte über mehrere
              Anwendungen verteilt sind. Eine Willkommensmail, Kennenlerntermine mit Pate und Team in den ersten
              Wochen, ein Einarbeitungsplan auf Basis der geltenden Richtlinien. Jeder einzelne Schritt ist trivial,
              zusammen verschlingen sie Zeit, die HR lieber in Gespräche mit Menschen stecken würde. Eine Einschränkung
              gehört allerdings dazu: Cowork darf die Organisation des Onboardings übernehmen, Arbeit abnehmen, aber ersetzt weder die
              persönliche Betreuung durch Gespräche noch das Einlernen der neuen Kollegin oder des neuen Kollegen. Warum diese Unterscheidung so wichtig ist, beschreibe ich weiter unten.
            </p>
          </div>

          <AuftragBox
            titel="Beispielauftrag HR: Onboarding vorbereiten"
            zeilen={[
              {
                label: "Ziel",
                text: "Bereite das Onboarding für [Name] vor, die am 1. Februar als Projektmanagerin im Team [Team] startet.",
              },
              {
                label: "Kontext",
                text: "Nutze die Onboarding-Richtlinie und die Checkliste im SharePoint-Bereich Personal/Onboarding. Pate ist [Name].",
              },
              {
                label: "Akzeptanzkriterien",
                text: "Ein Einarbeitungsplan für die ersten vier Wochen als Word-Dokument, ein Entwurf der Willkommensmail und Terminvorschläge für Kennenlerngespräche mit den fünf direkten Teamkollegen in den ersten zwei Wochen, je 30 Minuten und ohne Konflikte mit bestehenden Terminen.",
              },
              {
                label: "Leitplanken",
                text: "Mail und Termine nur vorbereiten, ich gebe frei. Keine Informationen aus anderen Personalunterlagen verwenden.",
              },
              {
                label: "Zwischenstopp",
                text: "Zeig mir den Einarbeitungsplan, bevor du die Termine vorbereitest.",
              },
            ]}
          />

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              In Learning &amp; Development sehe ich zwei starke Muster. Das erste ist die Auswertung. Feedbackbögen
              aus mehreren Trainingsdurchgängen, etwa als Excel-Export aus Forms, werden zu einem Bericht, der
              wiederkehrende Kritikpunkte benennt und konkrete Anpassungen am Programm vorschlägt. Das zweite ist der
              Richtlinienabgleich. Kommt eine neue Fassung einer Richtlinie, stellt Cowork alte und neue Version
              gegenüber, fasst die Änderungen zusammen und prüft, welche Schulungsunterlagen im SharePoint dadurch
              veraltet sind. Diese Aufgabe bleibt in vielen Unternehmen liegen, weil sie mühsam ist und sich niemand
              richtig zuständig fühlt. Bei Personaldaten gilt allerdings mehr als anderswo, dass Cowork alles sieht,
              was Sie sehen dürfen. Wer im HR-Bereich arbeitet, sollte vorher wissen, auf welche Ordner er
              tatsächlich Zugriff hat.
            </p>
          </div>

          <h3 id="controlling-projekte" className="text-xl md:text-2xl font-semibold mt-6 mb-2">
            Controlling und Projektarbeit
          </h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Im Controlling spielt Cowork seine Stärke dort aus, wo Zahlen erklärt werden müssen. Die
              Abweichungsanalyse zum Monatsende ist der Klassiker: Ist- und Planwerte aus Excel, Kommentare der
              Kostenstellenverantwortlichen aus Mails, daraus ein erklärender Bericht und ein paar Folien für die
              Geschäftsleitung. Weil sich diese Aufgabe jeden Monat wiederholt, lohnt sich ein Zeitplan. Und weil der
              Bericht jeden Monat gleich aufgebaut sein soll, lohnt sich ein eigener Skill mit Ihrer Berichtsstruktur.
            </p>
          </div>

          <AuftragBox
            titel="Beispielauftrag Controlling: Monatlicher Abweichungsbericht"
            zeilen={[
              {
                label: "Ziel",
                text: "Erstelle jeden Monat den Abweichungsbericht für die Geschäftsführung.",
              },
              {
                label: "Kontext",
                text: "Ist- und Planwerte stehen in der Datei Controlling/Monatsabschluss/[Jahr].xlsx. Die Kommentare der Kostenstellenverantwortlichen kommen per Mail mit dem Betreff „Abweichung [Monat]“.",
              },
              {
                label: "Akzeptanzkriterien",
                text: "Zwei Seiten in Word nach unserer Berichtsvorlage, alle Abweichungen über fünf Prozent erklärt, zu jeder Erklärung die Quelle. Dazu drei Folien mit den wichtigsten Punkten.",
              },
              {
                label: "Leitplanken",
                text: "Keine Zahlen verändern oder runden. Fehlende Kommentare als offen kennzeichnen. Nichts versenden, Ablage im Ordner Controlling/Berichte.",
              },
              {
                label: "Zeitplan",
                text: "Jeden Monat am 4. um 7 Uhr.",
              },
            ]}
          />

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              In der Projektarbeit ist der wöchentliche Statusbericht das dankbarste Beispiel. Cowork sammelt jeden
              Freitag, was im Projektkanal in Teams besprochen wurde, welche Mails mit dem Projektkürzel eingegangen
              sind und welche Dokumente sich geändert haben, und schreibt daraus einen Status mit offenen
              Entscheidungen und Risiken. Den Beitrag im Kanal geben Sie frei. Ein zweites Muster sind
              Dokumentenabgleiche in großem Umfang. Microsoft nennt das Beispiel eines Teams, das fast 4.000 Dateien
              zwischen zwei Produktversionen verglichen hat. Solche Aufgaben hat früher niemand angefasst, weil der
              Aufwand in keinem Verhältnis zum Ertrag stand. Diese Rechnung verschiebt sich gerade.
            </p>
          </div>

          <ErstgespraechCTA
            heading="Welche dieser Muster passen zu Ihrem Team?"
            text="In 15 Minuten klären wir, wie Ihre Mitarbeitenden den Wechsel vom Prompten zum Delegieren schaffen und welches Trainingsformat dafür das richtige ist."
            source="article-cowork-leitfaden-mitte"
          />
        </section>

        {/* Steuern statt Erledigen */}
        <section id="steuern-statt-erledigen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Der Preis: Multitasking bis zur Hirnschmelze</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jetzt zu dem Teil, über den bei Produktvorstellungen niemand spricht. Wenn die operative Umsetzung nicht
              mehr der limitierende Faktor ist, wird es die Steuerung. Das klingt nach einer Beförderung, und in
              gewisser Weise ist es eine. Es ist aber auch eine Belastung, auf die uns niemand vorbereitet hat.
            </p>
            <p>
              Das beste Bild dafür ist der Tellerjongleur im Zirkus. Auf langen Stäben drehen sich Teller, und damit
              keiner herunterfällt, läuft er von Stab zu Stab und gibt jedem Teller neuen Schwung. Genau so fühlt sich
              agentisches Arbeiten an, sobald mehrere Aufträge parallel laufen. Ein Auftrag recherchiert für das
              Kundengespräch, ein zweiter baut die Monatsauswertung, ein dritter wartet auf eine Freigabe. Ich springe
              hin und her, prüfe einen Zwischenstand, beantworte eine Rückfrage, korrigiere die Richtung, und schon
              wackelt der nächste Teller. Kontextwechsel im Minutentakt. Das belastet das Gehirn auf eine völlig
              andere Weise als konzentrierte Facharbeit, und man bemerkt diese Belastung erst, wenn man sie eine Weile
              erlebt hat.
            </p>
            <p>
              Für diese Hirnschmelze gibt es inzwischen einen Fachbegriff. Forschende der Boston Consulting Group und
              der University of California, Riverside haben im März 2026 in der Harvard Business Review den Begriff
              „AI Brain Fry“ geprägt. Gemeint ist geistige Erschöpfung, die entsteht, wenn jemand KI-Werkzeuge über
              die eigene kognitive Kapazität hinaus nutzt oder beaufsichtigt. In ihrer Befragung von knapp 1.500
              Vollzeitbeschäftigten in den USA berichtete etwa jeder Siebte davon. Wer KI-Arbeit intensiv überwachen
              musste, gab 14 Prozent mehr geistige Anstrengung, 12 Prozent mehr Erschöpfung und 19 Prozent mehr
              Informationsüberlastung an, und wer das Gefühl hatte, zu viel mit KI zu arbeiten, meldete 39 Prozent mehr
              eigene Fehler. Bemerkenswert finde ich, wen es am stärksten trifft: nicht die Skeptiker, sondern die
              frühen Anwender, die mehrere Agenten parallel laufen lassen. Ich erkenne mich darin wieder.
            </p>
            <p>
              Die neue Aufgabe für uns Menschen ähnelt deshalb der eines Product Owners. Kommunikation und
              Stakeholder-Management bleiben bei Ihnen, denn Cowork weiß nicht, dass der Vertriebsleiter auf bestimmte
              Formulierungen allergisch reagiert oder dass die Geschäftsführung die Zahlen immer zuerst sehen will.
              Die Vision und das Gesamtziel bleiben bei Ihnen, weil nur Sie wissen, wie die einzelnen Ergebnisse am
              Ende zusammenpassen müssen. Akzeptanzkriterien und Leitplanken formulieren Sie, bevor die Arbeit
              beginnt. Und die Qualitätssicherung wird zur Kernkompetenz. Wer Ergebnisse nicht schnell und kritisch
              prüfen kann, verliert den Zeitgewinn beim Nacharbeiten wieder. Schlimmer noch, er gibt Fehler weiter,
              unter denen sein eigener Name steht.
            </p>
            <p>
              Damit sind wir bei der zweiten unbequemen Wahrheit. Cowork fragt vor sensiblen Aktionen nach, und das ist
              richtig so. Nach der fünfzehnten Bestätigung am Tag passiert aber etwas sehr Menschliches: Man klickt
              einfach. Cowork bietet sogar an, für ähnliche Aktionen im laufenden Gespräch nicht mehr nachzufragen, bei
              Mails wahlweise für einen Empfänger, eine ganze Domain oder grundsätzlich. Das ist bequem, und es ist
              genau der Moment, in dem Verantwortung unbemerkt abwandert. Microsoft formuliert in seinen eigenen
              Leitfäden sinngemäß einen Satz, den ich jedem Cowork-Nutzer an den Bildschirm kleben würde: Eine
              Bestätigungsabfrage ersetzt keine fachliche Freigabe. Wer auf „Senden“ klickt, hat die Mail verschickt.
              Nicht Cowork.
            </p>
            <p>
              Drei Gewohnheiten helfen gegen beides, gegen das Jonglieren und gegen das blinde Klicken. Starten Sie
              weniger Aufträge gleichzeitig, als technisch möglich wären, denn die Grenze setzt nicht Cowork, sondern
              Ihre Aufmerksamkeit. Legen Sie feste Zeiten fest, zu denen Sie Zwischenstände prüfen, statt auf jede
              Rückfrage sofort zu reagieren. Und treffen Sie eine klare persönliche Regel, welche Aktionen Sie nie
              pauschal freigeben, zum Beispiel alles, was an Externe geht.
            </p>
          </div>
        </section>

        {/* Fachkompetenz */}
        <section id="fachkompetenz" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Fachkompetenz bewahren, wenn die Umsetzung wegfällt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Es gibt eine Seite dieser Entwicklung, die mich mehr beschäftigt als Kosten oder Datenschutz. Wenn wir
              Tätigkeiten nicht mehr selbst ausführen, verlieren wir mit der Zeit die Fähigkeit, sie auszuführen. Das
              ist kein Kulturpessimismus, sondern eine Erfahrung, die jeder kennt, der nach Jahren mit Navi zum ersten
              Mal ohne durch eine fremde Stadt fahren musste. Bei Cowork geht es allerdings nicht um den
              Orientierungssinn, sondern um den Kern unserer Arbeit: einen Bericht aufbauen, Zahlen plausibilisieren,
              Argumente gewichten, einen Vertrag lesen.
            </p>
            <p>
              Die Umsetzungskompetenz dürfen wir abgeben. Die Fachkompetenz nicht, sie wird sogar wichtiger. Wer
              prüfen will, ob eine Abweichungsanalyse stimmt, muss wissen, wie eine Abweichungsanalyse entsteht und wo
              sie typischerweise schiefgeht. Wer den Entwurf einer Kundenmail beurteilen soll, muss den Kunden, das
              Produkt und die Vertragslage kennen. Die Qualitätssicherung, die ich oben als neue Kernkompetenz
              beschrieben habe, steht nur auf dem Fundament echten Fachwissens. Fällt dieses Fundament weg, prüft
              niemand mehr, man nickt nur noch ab. Und dann landen wir dort, wo wir sicher nicht hinwollen: in der
              Welt des Films Idiocracy, in der die Menschen ihre Felder mit einem Sportgetränk bewässern und sich
              wundern, warum nichts mehr wächst.
            </p>
            <p>
              Besonders heikel wird das in Einarbeitung und Ausbildung. Wer als Berufseinsteiger vom ersten Tag an
              jeden Monatsbericht von Cowork bauen lässt, lernt nie, wie ein Monatsbericht entsteht, und wird später
              auch nicht erkennen, ob einer gut ist. Ich empfehle deshalb, für Ausbildung und Onboarding bewusst
              festzulegen, was an Copilot delegiert werden darf und was neue Kolleginnen und Kollegen mindestens
              einmal selbst operativ gemacht haben sollten, um es wirklich zu verstehen. Den ersten Abweichungsbericht
              schreibt der Trainee selbst, den zehnten darf Cowork übernehmen, und der Trainee prüft ihn. Die erste
              Terminvorbereitung macht die neue Vertriebskollegin von Hand, danach wird delegiert. Das kostet am Anfang
              Zeit. Es ist aber die einzige Versicherung dagegen, dass in ein paar Jahren niemand mehr im Haus ist, der
              merkt, wenn der Agent Unsinn produziert.
            </p>
          </div>
        </section>

        {/* Abgrenzung */}
        <section id="abgrenzung" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Cowork, Agent Mode oder eigener Agent: Wann was passt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Microsoft hat inzwischen so viele Werkzeuge mit agentischen Fähigkeiten im Angebot, dass selbst
              erfahrene Copilot-Nutzer den Überblick verlieren. Die Abgrenzung wird einfacher, wenn man nicht auf die
              Technik schaut, sondern auf zwei Fragen: Wo findet die Arbeit statt, und wer soll die Lösung künftig
              nutzen?
            </p>
            <p>
              Der{" "}
              <Link to="/wissen/copilot-agent-mode-word-excel-powerpoint" className="text-primary hover:underline">
                Agent Mode in Word, Excel und PowerPoint
              </Link>{" "}
              arbeitet innerhalb eines Dokuments. Er schreibt um, strukturiert, rechnet und baut Folien, und zwar
              direkt in der Datei, die Sie gerade geöffnet haben. Das ist die richtige Wahl, wenn am Ende genau ein
              Dokument steht und Sie ohnehin daran sitzen. Cowork arbeitet dagegen anwendungsübergreifend. Es holt
              Informationen aus Mails, Teams und mehreren Dateien, erzeugt mehrere Ergebnisse auf einmal und erledigt
              Folgeschritte wie Versand oder Terminplanung. Als Faustregel taugt: ein Dokument, Agent Mode. Mehrere
              Anwendungen oder Schritte nach dem Dokument, Cowork.
            </p>
            <p>
              Bei den Agenten lohnt eine weitere Unterscheidung. Mit dem Agent Builder bauen Sie ohne Programmierung
              einen spezialisierten Assistenten mit festen Anweisungen und Wissensquellen, etwa einen Agenten, der
              Fragen zur Reiserichtlinie beantwortet, und teilen ihn mit Kolleginnen und Kollegen.{" "}
              <Link to="/wissen/copilot-studio" className="text-primary hover:underline">
                Copilot Studio
              </Link>{" "}
              geht weiter: Agenten und Workflows mit eigenen Auslösern, Anbindung an externe Systeme, getrennten Test-
              und Produktivumgebungen und Veröffentlichung in Kanälen außerhalb von Microsoft 365, bis hin zur Website
              für Kunden. Der Kern des Unterschieds ist einfach. Ein Agent ist ein Werkzeug, das andere benutzen oder
              das ohne Sie läuft. Cowork ist Ihre persönliche Delegation.
            </p>
          </div>

          <div className="my-8 overflow-x-auto max-w-[calc(100vw-2rem)]">
            <table className="w-full text-sm border-collapse min-w-[760px]">
              <caption className="text-left text-sm text-muted-foreground mb-2">
                Copilot Chat, Agent Mode, Cowork und Agenten im Vergleich (Stand November 2026)
              </caption>
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className={thClass} scope="col"></th>
                  <th className={thClass} scope="col">Copilot Chat</th>
                  <th className={thClass} scope="col">Agent Mode in Office</th>
                  <th className={`${thClass} bg-primary/10`} scope="col">Copilot Cowork</th>
                  <th className={thClass} scope="col">Agent Builder</th>
                  <th className={thClass} scope="col">Copilot Studio</th>
                </tr>
              </thead>
              <tbody>
                {tabellenZeilen.map((zeile) => (
                  <tr key={zeile.kriterium}>
                    <th className={`${thClass} bg-gray-50 dark:bg-gray-900/40`} scope="row">
                      {zeile.kriterium}
                    </th>
                    <td className={tdClass}>{zeile.chat}</td>
                    <td className={tdClass}>{zeile.agentMode}</td>
                    <td className={`${tdClass} bg-primary/5`}>{zeile.cowork}</td>
                    <td className={tdClass}>{zeile.builder}</td>
                    <td className={tdClass}>{zeile.studio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Daraus ergibt sich eine einfache Regel für den Alltag. Wenn Sie Cowork zum dritten Mal denselben Auftrag
              mit denselben Anweisungen geben, ist dieser Auftrag reif für mehr. Bleibt er Ihre persönliche Aufgabe,
              gehört die Methode in einen eigenen Skill und gegebenenfalls in einen Zeitplan. Brauchen ihn auch
              andere, oder soll er laufen, ohne dass jemand eine Sitzung startet, gehört er in einen Agenten oder einen
              Workflow. Microsoft testet im Frontier-Programm bereits einen Copilot-Studio-Skill für Cowork, mit dem
              sich aus einer Cowork-Aufgabe heraus ein Agent oder Workflow in Copilot Studio anlegen lässt.
            </p>
            <p>
              Eine Bemerkung von Microsoft selbst halte ich für entscheidend, gerade für alle, die im Unternehmen über
              Agenten entscheiden. Ein eigener Agent ist kein komplizierteres Cowork-Plugin, sondern eine
              Plattformentscheidung. Wer einen Agenten in Copilot Studio baut, betreibt danach etwas, mit
              Verantwortlichen, Tests, Updates und Governance. Wer einen Cowork-Skill schreibt, verbessert die eigene
              Arbeitsweise. Beides hat seinen Platz, aber beides zu verwechseln führt entweder zu Agenten, die niemand
              pflegt, oder zu persönlichen Skills, an denen plötzlich ein ganzer Prozess hängt. Wer sich tiefer mit
              autonomen Abläufen beschäftigen will, findet im Beitrag zu{" "}
              <Link to="/wissen/ki-agenten" className="text-primary hover:underline">
                KI-Agenten im Unternehmen
              </Link>{" "}
              die Grundlagen.
            </p>
          </div>
        </section>

        {/* Einführung */}
        <section id="einfuehrung" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Was Entscheider vor dem Start klären sollten</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Cowork ist standardmäßig ausgeschaltet. Die IT entscheidet im Microsoft 365 Admin Center, wann es
              aktiviert wird und wer Zugriff bekommt, gesteuert wird das über Ausgabenrichtlinien. Voraussetzung ist
              eine Microsoft 365 Copilot-Lizenz, die Nutzung selbst wird zusätzlich nach Verbrauch in Copilot Credits
              abgerechnet. Grenzen lassen sich für den gesamten Tenant, für Gruppen und für einzelne Nutzer setzen,
              Warnschwellen inklusive. Wie das im Detail funktioniert, beschreibe ich im Beitrag zur{" "}
              <Link to="/wissen/copilot-cowork-abrechnung-copilot-credits" className="text-primary hover:underline">
                Cowork-Abrechnung über Copilot Credits
              </Link>
              . Für die Arbeitsweise folgt daraus vor allem eines: Gute Aufträge sind nicht nur besser, sie sind auch
              günstiger.
            </p>
            <p>
              Beim Datenschutz hat sich in den letzten Wochen einiges bewegt. Tenants innerhalb der EU-Datengrenze
              können in Cowork derzeit nur die GPT-Modelle nutzen. Microsoft hat angekündigt, die Verarbeitung der
              Claude-Modelle in Copilot Anfang Dezember 2026 in die EU-Datengrenze zu verlagern, Cowork eingeschlossen.
              Laut Message Center (MC1546438) schaltet Microsoft Claude am 9. Dezember 2026 zudem für berechtigte
              EU- und EFTA-Tenants standardmäßig ein, die bis dahin keine eigene Auswahl getroffen haben. Wer das nicht
              möchte, muss vorher aktiv widersprechen. Diese Entscheidung gehört nicht nebenbei ins Admin Center,
              sondern auf den Tisch von IT und Datenschutz gemeinsam. Hintergründe zum{" "}
              <Link to="/wissen/copilot-sicherheit-datenschutz" className="text-primary hover:underline">
                Datenschutzrahmen von Copilot
              </Link>{" "}
              und zur{" "}
              <Link to="/wissen/claude-in-microsoft-copilot" className="text-primary hover:underline">
                Integration von Claude in Copilot
              </Link>{" "}
              finden Sie in eigenen Beiträgen.
            </p>
            <p>
              Zwei weitere Punkte gehören auf die Liste. Cowork erbt die Berechtigungen der Nutzer und macht damit
              sichtbar, wo im Tenant zu großzügig geteilt wurde. Wer das Thema Oversharing bei der Copilot-Einführung
              vertagt hat, sollte es spätestens jetzt angehen. Und der Betriebsrat gehört früh an den Tisch. Bei
              Copilot ist er in aller Regel ohnehin beteiligt, Cowork verändert aber die Qualität der Diskussion. Das
              System schlägt nicht mehr nur Texte vor, es verschickt im Namen von Mitarbeitenden Mails, legt Termine an
              und postet in Teams.
            </p>
            <p>
              Für den Start rate ich zu dem, was Microsoft in seinen Leitfäden selbst empfiehlt: mit einer Aufgabe
              beginnen, nicht mit einem ganzen Fachbereich. Eine Handvoll Nutzer, ein klar umrissener Ablauf, eine
              verantwortliche Person, die beurteilen kann, ob das Ergebnis taugt, und eine ehrliche Messung, wie lange
              die Aufgabe vorher gedauert hat. Ohne diesen Vorher-Wert diskutieren Sie nach drei Monaten über Gefühle
              statt über Ergebnisse. Und planen Sie Zeit für das ein, was keine Technik liefert: Menschen, die lernen,
              Aufträge zu formulieren und Ergebnisse zu prüfen.
            </p>
          </div>
        </section>

        {/* Fazit */}
        <section id="fazit" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Mein Fazit: Ein echter Sprung, der etwas kostet</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Copilot Cowork ist für mich der größte Schritt, den Copilot seit seinem Start gemacht hat, und mehr als
              das: ein Vorgeschmack darauf, wie Wissensarbeit in ein paar Jahren aussehen wird. Zum ersten Mal lässt
              sich in Microsoft 365 Arbeit wirklich abgeben, statt sie sich nur vorformulieren zu lassen, und das
              innerhalb der Sicherheits- und Datenschutzwelt, in der die meisten Unternehmen ohnehin arbeiten. Ich bin
              überzeugt, dass wir schon bald viele Tätigkeiten vollständig delegieren, für die wir heute noch Stunden
              blocken.
            </p>
            <p>
              Der Preis dafür ist eine neue Art von Arbeit. Wer delegiert, muss wissen, was er will, muss es klar
              sagen können und muss das Ergebnis beurteilen können. Neu sind diese Fähigkeiten nicht, gute
              Führungskräfte und Product Owner brauchen sie seit jeher. Neu ist, dass jetzt jeder Wissensarbeiter sie
              braucht, und zwar mehrmals pro Stunde. Unternehmen, die Cowork einfach freischalten und auf Selbstlernen
              setzen, werden enttäuscht sein. Unternehmen, die ihren Leuten das Delegieren beibringen und gleichzeitig
              darauf achten, dass das Fachwissen im Haus bleibt, gewinnen Zeit für die Arbeit, die kein Agent
              übernimmt: entscheiden, abwägen, Beziehungen pflegen.
            </p>
          </div>

          <ErstgespraechCTA
            heading="Vom Prompten zum Delegieren: Wie bereiten Sie Ihr Team vor?"
            text="Buchen Sie ein 15-minütiges Erstgespräch. Wir klären, wo Ihr Team bei Copilot und Cowork steht und welches Training der nächste sinnvolle Schritt ist."
            source="article-cowork-leitfaden-ende"
          />
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufig gestellte Fragen</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotCoworkPraxisleitfaden;
