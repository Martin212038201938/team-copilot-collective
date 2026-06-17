import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import TrainingCTA from "@/components/TrainingCTA";

const SLUG = "copilot-cowork-abrechnung-copilot-credits";
const PAGE_TITLE = "Copilot Cowork wird abgerechnet: Was die Copilot-Credits-Abrechnung ab Juli 2026 bedeutet";

const CopilotCoworkAbrechnungCredits = () => {
  const martinLang = getAuthor('martin-lang')!;
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-sich-aendert", title: "Was sich am 16. Juni geändert hat", level: 2 },
    { id: "kein-standalone", title: "Cowork bleibt an die Copilot-Lizenz gebunden", level: 2 },
    { id: "credits", title: "Wie Copilot Credits abgerechnet werden", level: 2 },
    { id: "planbarkeit", title: "Warum die Kosten planbar bleiben", level: 2 },
    { id: "dach", title: "Was DACH-Unternehmen zusätzlich beachten müssen", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir nutzen Copilot Cowork im Frontier-Programm – ab wann müssen wir wirklich zahlen?",
      answer: "Mit der allgemeinen Verfügbarkeit am 16. Juni 2026 läuft die Abrechnung über Copilot Credits an. Für Tenants, die Cowork in der Frontier-Vorschau zwischen dem 30. März und dem 16. Juni genutzt haben, beginnt die Abrechnung laut Microsoft erst am 1. Juli 2026. Das heißt: Sie haben ein kurzes Fenster, um vorher Verbrauchsgrenzen, ein Budget und eine Abrechnungsmethode festzulegen, bevor der Zähler läuft. Wer jetzt nicht mit dem Einkauf spricht, verschenkt genau diese Vorbereitungszeit. Die Copilotenschule unterstützt bei der Einführung und beim Aufsetzen sinnvoller Nutzungsregeln im Team."
    },
    {
      name: "Reicht für Copilot Cowork eine separate Lizenz, oder brauchen wir weiterhin Microsoft 365 Copilot?",
      answer: "Cowork ist kein eigenständiges Produkt. Der Zugang setzt eine aktive Microsoft 365 Copilot-Lizenz voraus, die nutzungsbasierte Credits-Abrechnung kommt zusätzlich obendrauf. Wer also mit dem Gedanken spielt, Cowork als günstige Einzellösung einzukaufen, wird enttäuscht. Sinnvoll ist die Frage andersherum: Welche Teams haben bereits Copilot-Lizenzen und würden von agentenbasierten Abläufen am meisten profitieren? Genau diese Priorisierung erarbeiten wir in unseren Trainings gemeinsam mit Ihnen."
    },
    {
      name: "Wie verhindern wir, dass bei intensiver Nutzung plötzlich unkalkulierbare Kosten entstehen?",
      answer: "Microsoft hat dafür mehrere Hebel eingebaut: Limits pro Nutzer und Gruppe, Budgets mit Warnungen, harte Obergrenzen und ein Cost-Management-Dashboard im Microsoft 365 Admin Center. Zusätzlich gibt es ein Prepaid-Modell (den Copilot Credit Pre-Purchase Plan), mit dem Sie Kontingente im Voraus einkaufen und zu rabattierten Konditionen kalkulieren können. Eine Kostenexplosion ist also kein Naturgesetz, sondern eine Frage der Konfiguration. Wir helfen dabei, diese Leitplanken so zu setzen, dass produktive Nutzung möglich bleibt, ohne dass das Budget aus dem Ruder läuft."
    },
    {
      name: "Dürfen wir Copilot Cowork in Deutschland überhaupt nutzen, wenn es auf Anthropic-Modellen läuft?",
      answer: "Technisch ja, aber nicht im Autopilot. In der EU, im EWR und in Großbritannien sind die Anthropic-Modelle in Copilot standardmäßig deaktiviert, weil Anthropic nicht in Microsofts EU Data Boundary eingebunden ist. Cowork läuft im Kern auf diesen Modellen, also muss ein globaler Administrator Anthropic bewusst freischalten. Vorher gehört das Gespräch mit dem Datenschutzbeauftragten geführt: Transfer Impact Assessment, Rechtsgrundlage nach Artikel 28 DSGVO, Verzeichnis der Verarbeitungstätigkeiten. Die Copilotenschule begleitet diese datenschutzkonforme Einführung."
    },
    {
      name: "Lohnt sich die Investition, wenn Microsoft mit Cowork 1 schon ein eigenes Modell ankündigt?",
      answer: "Das eigene Modell Cowork 1 ist zur allgemeinen Verfügbarkeit noch nicht da, und die von Microsoft genannte Ersparnis von 30 bis 40 Prozent stammt aus internen Tests des Anbieters, nicht aus unabhängigen Messungen. Wer auf das perfekte Modell wartet, wartet ewig. Der praktische Wert von Cowork entsteht nicht aus einem einzelnen Modell, sondern daraus, dass Ihr Team gelernt hat, Aufgaben sauber zu delegieren und Ergebnisse zu prüfen. Diese Kompetenz trägt über jeden Modellwechsel hinweg – und genau darauf zielen unsere Trainings."
    },
    {
      name: "Wie messen wir, ob sich die Credits-Ausgaben für Copilot Cowork rechnen?",
      answer: "Verknüpfen Sie die Verbrauchsdaten aus dem Cost-Management-Dashboard mit konkreten Aufgaben statt mit Bauchgefühl. Wenn ein Agent eine wiederkehrende Fleißarbeit übernimmt, lässt sich die eingesparte Arbeitszeit beziffern und den verbrauchten Credits gegenüberstellen. Sinnvoll ist, mit wenigen klar abgegrenzten Anwendungsfällen zu starten, deren Nutzen messbar ist, statt Cowork breit und ungesteuert auszurollen. Die Copilotenschule hilft, diese Anwendungsfälle zu identifizieren und den Erfolg über ein einfaches Vorher-Nachher zu belegen."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Copilot Cowork ist seit dem 16. Juni 2026 allgemein verfügbar und wird über Copilot Credits abgerechnet (0,01 US-Dollar pro Credit). Was das für Lizenzen, Kosten und DACH-Unternehmen bedeutet.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-06-17",
        "dateModified": "2026-06-17",
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
        title="Copilot Cowork Abrechnung: Copilot Credits ab Juli 2026"
        description="Copilot Cowork ist seit 16. Juni 2026 GA und wird über Copilot Credits abgerechnet. Was das kostet, warum die Copilot-Lizenz Pflicht bleibt und was DACH-Firmen tun müssen."
        keywords={[
          "Copilot Cowork Abrechnung",
          "Copilot Credits",
          "Copilot Cowork Kosten",
          "Copilot Cowork Preis",
          "Copilot Cowork General Availability",
          "Copilot Cowork GA",
          "Microsoft 365 Copilot Cowork Billing",
          "Copilot Cowork Lizenz",
          "Copilot Credits Preis",
          "Copilot Cowork pay-as-you-go",
          "Copilot Credit Pre-Purchase Plan",
          "Copilot Cowork Prepaid",
          "Copilot Cowork Frontier",
          "Copilot Cowork Modelle",
          "GPT 5.5 Copilot Cowork",
          "Claude Opus 4.8 Cowork",
          "Cowork 1 Microsoft",
          "Copilot Cowork DSGVO",
          "Copilot Cowork Anthropic EU",
          "Copilot Cowork einführen"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-06-17T09:00:00+02:00"
        modifiedTime="2026-06-17T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Cowork Abrechnung", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Copilot Cowork ist allgemein verfügbar – und wird ab sofort über Copilot Credits abgerechnet. Eine Einordnung aus der Praxis: Kosten, Lizenzpflicht und was DACH-Unternehmen jetzt tun sollten."
        lastUpdated="17. Juni 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:claude-in-microsoft-copilot",
          "wissen:microsoft-365-e7-frontier-suite",
          "wissen:microsoft-copilot-lizenzen",
          "wissen:copilot-flex-routing-eu-verarbeitung",
          "wissen:copilot-sicherheit-datenschutz"
        ]}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Microsoft hat Copilot Cowork am 16. Juni 2026 allgemein verfügbar gemacht – und damit endet die
              kostenlose Mitnutzung im Frontier-Programm. Cowork wird jetzt nutzungsbasiert über Copilot Credits
              abgerechnet, zu 0,01 US-Dollar pro Credit. Wichtig: Cowork ist kein eigenständiges Produkt, eine
              aktive Microsoft 365 Copilot-Lizenz bleibt Voraussetzung, die Credits kommen obendrauf. Für
              Frontier-Tenants beginnt die Abrechnung am 1. Juli. Wer Verbrauchsgrenzen, Prepaid-Kontingente und
              ein Budget setzt, behält die Kosten im Griff – die Werkzeuge dafür liefert Microsoft direkt mit.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p className="text-lg leading-relaxed">
            Seit Ende vergangenen Jahres nutze ich Claude Cowork sehr intensiv, und seit Anfang 2026 arbeite ich
            nicht mehr nur AI-first, sondern agentic-first. Damit meine ich etwas Konkretes: Wiederkehrende
            Aufgaben, komplexe Aufgaben, große Fleißarbeiten und alles, was meine eigenen Fähigkeiten an
            irgendeinem Punkt übersteigt, gebe ich an Agenten ab und prüfe das Ergebnis, statt es Schritt für
            Schritt selbst zu erledigen. Als ich gelesen habe, dass Microsoft die agentischen Fähigkeiten seines
            Copiloten mit denselben Modellen betreibt, die ich ohnehin schätze – den Modellen von Anthropic –,
            habe ich mich deshalb gefreut. Ich halte das für eine kluge Wahl und für einen großen Schritt hin zu
            Arbeitsprozessen, die man in einer sicheren Umgebung gestalten kann.
          </p>
          <p>
            Im Frontier-Programm, an dem ich teilnehme, ist Copilot Cowork seit ein paar Wochen freigeschaltet,
            und ich nutze es parallel zu meinen anderen KI-Modellen. Dass das nicht dauerhaft als Gratis-Beigabe
            laufen würde, war absehbar. Eine Mitgliedschaft, mit der man bei Anthropic wirklich produktiv
            arbeiten kann, kostet rund 100 Euro im Monat – mit der 20-Euro-Variante kommt man nicht weit. Ein
            Anbieter, der dieselbe Modellqualität an Millionen Tenants ausrollt, muss das verbrauchsabhängig
            abrechnen. Am 16. Juni hat Microsoft genau das getan.
          </p>
        </div>

        {/* Was sich geändert hat */}
        <section id="was-sich-aendert" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was sich am 16. Juni geändert hat
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Mit der allgemeinen Verfügbarkeit ist Copilot Cowork weltweit für alle Microsoft 365 Copilot-Tenants
              nutzbar – und gleichzeitig fällt die Abrechnung an. Microsoft beschreibt das in der eigenen
              Dokumentation unmissverständlich: Cowork nutzt ein nutzungsbasiertes Abrechnungsmodell, bei dem
              Modellantworten, Werkzeug- und Skill-Aufrufe, Bildgenerierung und Browser-Aufgaben in den Verbrauch
              einfließen. Wer Cowork bislang im Frontier-Programm getestet hat, sieht dazu eine Benachrichtigung
              direkt in der App. IT und Helpdesk sollten das auf dem Schirm haben, bevor die ersten Rückfragen
              kommen.
            </p>
            <p>
              Es gibt einen Übergang, und der ist kürzer, als viele denken. Frontier-Tenants, die Cowork zwischen
              dem 30. März und dem 16. Juni genutzt haben, werden laut Microsoft erst ab dem 1. Juli 2026
              abgerechnet. Das sind, vom Tag der allgemeinen Verfügbarkeit aus gerechnet, gut zwei Wochen, um
              Abrechnungsmethode, Budget und Grenzen sauber aufzusetzen. Wer das Gespräch mit dem Einkauf noch
              nicht geführt hat, sollte es diese Woche anstoßen.
            </p>
          </div>

          {/* Vorher / Nachher Vergleich */}
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="text-lg">Bisher: Frontier-Vorschau (bis 30. Juni 2026)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
                  <li>Nutzung und Zugang in der Microsoft 365 Copilot-Lizenz enthalten</li>
                  <li>Ausschließlich Anthropic-Modelle</li>
                  <li>Keine separate Abrechnung</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-orange-500/40 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg">Ab 1. Juli 2026: General Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
                  <li>Zugang weiterhin nur mit Microsoft 365 Copilot-Lizenz</li>
                  <li>Nutzung wird über Copilot Credits abgerechnet (0,01 US-Dollar pro Credit)</li>
                  <li>Anthropic- und OpenAI-Modelle (u.&nbsp;a. Claude Opus 4.8, Sonnet 4.6, GPT 5.5)</li>
                  <li>Kosten variieren je nach Modell, Kontext, Werkzeugen und Laufzeit</li>
                  <li>Pay-as-you-go oder Prepaid-Kontingent wählbar</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <figure className="my-8">
            <img
              src="/images/copilot-cowork-credits-timeline.png"
              alt="Zeitleiste der Copilot-Cowork-Abrechnung: Frontier-Vorschau ab 30. März 2026, General Availability am 16. Juni 2026, Abrechnungsbeginn für Frontier-Tenants am 1. Juli 2026"
              className="w-full rounded-lg border shadow-sm"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              Vom kostenlosen Frontier-Test zur Abrechnung: Für bestehende Frontier-Tenants beginnt die
              Credits-Abrechnung am 1. Juli 2026.
            </figcaption>
          </figure>
        </section>

        {/* Kein Standalone */}
        <section id="kein-standalone" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Cowork bleibt an die Copilot-Lizenz gebunden
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Diesen Punkt verstehen in den Diskussionen, die ich gerade führe, die wenigsten richtig: Copilot
              Cowork ist kein Standalone-Produkt, das man separat und günstig dazukaufen kann. Microsoft setzt
              eine aktive Microsoft 365 Copilot-Lizenz voraus, um Cowork überhaupt zu öffnen. Die Credits-Abrechnung
              kommt zusätzlich obendrauf, sie ersetzt die Lizenz nicht. Wer also auf eine billige Einzellösung
              gehofft hat, rechnet falsch.
            </p>
            <p>
              Für die Planung heißt das: Die Frage lautet nicht „Cowork oder Copilot", sondern „Welche unserer
              bereits lizenzierten Teams holen aus agentenbasierten Abläufen den größten Nutzen?". Wer die{" "}
              <Link to="/wissen/microsoft-copilot-lizenzen" className="text-primary hover:underline">
                Copilot-Lizenzlandschaft
              </Link>{" "}
              ohnehin gerade sortiert, sollte Cowork als zusätzlichen, verbrauchsabhängigen Baustein darauf
              mitdenken – nicht als Ersatz.
            </p>
          </div>
        </section>

        {/* Credits */}
        <section id="credits" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Wie Copilot Credits abgerechnet werden
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Copilot Credits sind die gemeinsame Verrechnungseinheit für nutzungsbasierte KI-Dienste bei
              Microsoft. Im Pay-as-you-go-Modell kostet ein Credit 0,01 US-Dollar. Was ein konkreter Auftrag in
              Cowork verbraucht, hängt von mehreren Faktoren ab: vom gewählten Modell, von der Menge an Kontext,
              die der Agent heranzieht, von den aufgerufenen Werkzeugen und von der Laufzeit. Eine kurze
              Zusammenfassung kostet entsprechend wenig, ein mehrstufiger Workflow, der sich durch Outlook,
              Excel und SharePoint arbeitet und dabei mehrere Dateien erzeugt, deutlich mehr. Das ist
              nachvollziehbar, macht eine pauschale Preisaussage pro Aufgabe aber unmöglich.
            </p>
            <p>
              Zur allgemeinen Verfügbarkeit hat Microsoft zugleich die Modellauswahl erweitert. Der Modell-Picker
              in Cowork zeigt neben dem Standardmodus „Auto" jetzt Claude Opus 4.8, Claude Sonnet 4.6, die
              Kombination „Sonnet + Opus Advisor" sowie OpenAIs GPT 5.5. Damit stehen die Anthropic-Modelle nicht
              mehr allein, OpenAI ist gleichberechtigt dazugekommen. Wer mag, kann das Modell pro Aufgabe wechseln;
              für den Alltag empfiehlt Microsoft, den Picker auf „Auto" zu belassen. Welche Modelle in Ihrem
              Tenant tatsächlich auftauchen, entscheidet die Freigabe im Admin Center – und genau hier wird es für
              europäische Unternehmen interessant.
            </p>
          </div>
        </section>

        <TrainingCTA
          topic="Agentenbasiert arbeiten – richtig delegieren und prüfen"
          benefit="Cowork entfaltet seinen Wert erst, wenn das Team Aufgaben sauber an Agenten übergibt und Ergebnisse souverän prüft. Genau das trainieren wir praxisnah."
          href="/trainings/copilot-grundlagen-prompt-design"
          label="Training ansehen"
        />

        {/* Planbarkeit */}
        <section id="planbarkeit" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Warum die Kosten planbar bleiben
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Meine größte Sorge bei nutzungsbasierten Modellen ist immer dieselbe: dass am Monatsende eine
              Rechnung kommt, mit der niemand gerechnet hat, weil ein paar begeisterte Nutzer Cowork intensiver
              eingesetzt haben als gedacht. Bei genauem Hinsehen hat Microsoft diese Sorge aber bereits
              eingeplant. Es gibt nicht nur die reine Pay-as-you-go-Abrechnung, sondern auch ein Prepaid-Modell:
              den Copilot Credit Pre-Purchase Plan, mit dem sich Kontingente im Voraus und zu rabattierten
              Konditionen einkaufen lassen. Genau das, was ich mir für planbare Budgets gewünscht hätte, ist
              also schon da.
            </p>
            <p>
              Dazu kommt die Steuerung im Microsoft 365 Admin Center. Administratoren können Grenzen pro Nutzer
              und pro Gruppe setzen, Budgets mit Warnschwellen hinterlegen und harte Obergrenzen ziehen, ab denen
              schlicht Schluss ist. Ein Cost-Management-Dashboard zeigt, welche Gruppen, Nutzer und Dienste den
              Verbrauch treiben, und ein Schätzwerkzeug hilft, den Bedarf vorab zu modellieren. Eine
              Kostenexplosion ist damit kein Schicksal, sondern eine Frage der Konfiguration. Wer diese
              Leitplanken vor dem 1. Juli setzt, kann Cowork beruhigt produktiv nutzen. Wer sie ignoriert, lernt
              die Mechanik über die erste Rechnung kennen – das ist die teurere Variante.
            </p>
          </div>
        </section>

        {/* DACH */}
        <section id="dach" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was DACH-Unternehmen zusätzlich beachten müssen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Ein Detail, das im Abrechnungs-Trubel leicht untergeht, ist für deutsche, österreichische und
              Schweizer Unternehmen das eigentlich entscheidende: Cowork läuft im Kern auf Anthropic-Modellen,
              und die sind in der EU, im EWR und in Großbritannien standardmäßig deaktiviert. Der Grund ist
              bekannt – Anthropic ist nicht Teil von Microsofts EU Data Boundary, die Verarbeitung findet außerhalb
              des europäischen Rechtsraums statt. Ein globaler Administrator muss Anthropic also bewusst
              freischalten, sonst bleibt Cowork in diesen Regionen schlicht stumm.
            </p>
            <p>
              Dieser Schritt gehört nicht ins Tagesgeschäft, sondern auf den Tisch des Datenschutzbeauftragten.
              Bevor der Toggle umgelegt wird, brauchen Unternehmen ein Transfer Impact Assessment für den
              Datentransfer, eine dokumentierte Rechtsgrundlage nach Artikel 28 DSGVO und einen aktualisierten
              Eintrag im Verzeichnis der Verarbeitungstätigkeiten. Die{" "}
              <Link to="/wissen/copilot-flex-routing-eu-verarbeitung" className="text-primary hover:underline">
                Frage der EU-Datenverarbeitung
              </Link>{" "}
              und der{" "}
              <Link to="/wissen/copilot-sicherheit-datenschutz" className="text-primary hover:underline">
                allgemeine Datenschutzrahmen
              </Link>{" "}
              sind hier eng verbunden. Wer beides sauber dokumentiert, kann Cowork gezielt für klar abgegrenzte
              Anwendungsfälle freigeben.
            </p>
            <p>
              Eine letzte Einordnung, weil sie in vielen Beiträgen vermischt wird: Microsoft hat ein eigenes
              Modell namens Cowork 1 angekündigt, das zur allgemeinen Verfügbarkeit noch nicht bereitsteht, und
              wirbt damit, in internen Tests 30 bis 40 Prozent günstiger zu sein als der Wettbewerb. Beides sind
              Aussagen des Anbieters, keine unabhängig geprüften Zahlen, und ich behandle sie entsprechend
              vorsichtig. Für die Entscheidung heute spielt das keine große Rolle. Der Wert von Cowork entsteht
              nicht aus einem bestimmten Modell, sondern daraus, dass ein Team gelernt hat, Aufgaben zu delegieren
              und Ergebnisse zu prüfen. Diese Kompetenz überdauert jeden Modellwechsel – und sie ist der Grund,
              warum sich der Einstieg jetzt lohnt, statt auf das nächste Versprechen zu warten.
            </p>
          </div>
        </section>

        <TrainingCTA
          topic="Copilot Cowork sauber im Unternehmen einführen"
          benefit="Von Lizenzlogik über Kostensteuerung bis zu den ersten produktiven Anwendungsfällen: Wir begleiten Ihre Einführung, damit aus dem neuen Feature messbarer Nutzen wird."
          href="/unsere-angebote"
          label="Zu unseren Angeboten"
        />

        {/* FAQ */}
        <section id="faq" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Häufig gestellte Fragen
          </h2>
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

export default CopilotCoworkAbrechnungCredits;
