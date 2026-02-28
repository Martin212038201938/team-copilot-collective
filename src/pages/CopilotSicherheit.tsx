import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-sicherheit-datenschutz";
const PAGE_TITLE = "Microsoft Copilot und Datenschutz: Kann die KI jetzt alles sehen?";

const CopilotSicherheit = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "kann-copilot-alles-sehen", title: "Kann Copilot alle Dateien sehen?", level: 2 },
    { id: "kann-microsoft-mitlesen", title: "Kann Microsoft meine Daten lesen?", level: 2 },
    { id: "usa-verarbeitung", title: "Werden Daten in den USA verarbeitet?", level: 2 },
    { id: "kollegen-sichtbarkeit", title: "Können Kollegen meine E-Mails sehen?", level: 2 },
    { id: "monitoring", title: "Kann mein Chef sehen, was ich prompte?", level: 2 },
    { id: "betriebsrat", title: "Betriebsrat und Mitbestimmung", level: 2 },
    { id: "hausaufgaben", title: "Fünf Hausaufgaben vor dem Rollout", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Unser Datenschutzbeauftragter blockiert die Copilot-Einführung – wie überzeugen wir ihn?",
      answer: "In den meisten Fällen fehlt dem DSB nicht der Wille, sondern die Dokumentation. Microsoft bietet seit November 2025 das offizielle M365-Kit mit DSFA-Vorlagen, die in Abstimmung mit deutschen Datenschutzbehörden entwickelt wurden. Damit hat Ihr DSB eine belastbare Grundlage. Die Copilotenschule unterstützt bei der Aufbereitung und Kommunikation gegenüber dem Datenschutzbeauftragten – in unseren Compliance-Workshops klären wir genau diese Fragen."
    },
    {
      name: "Wir haben historisch gewachsene SharePoint-Berechtigungen – ist Copilot dann gefährlich?",
      answer: "Nicht gefährlich, aber entlarvend. Copilot zeigt schonungslos, was in Ihrer Organisation schon immer falsch berechtigt war – nur hat es vorher niemand gemerkt, weil niemand gezielt danach gesucht hat. Das ist kein Copilot-Problem, sondern ein bestehendes Berechtigungsproblem, das Sie ohnehin lösen sollten. Die Copilotenschule empfiehlt, vor dem Rollout einen Access Review durchzuführen und bietet Beratung an, wie Sie das pragmatisch angehen."
    },
    {
      name: "Können wir Copilot nur für bestimmte Abteilungen freischalten und andere ausschließen?",
      answer: "Ja, absolut. Sie können Copilot-Lizenzen gezielt an einzelne Nutzer oder Gruppen vergeben. Viele Unternehmen starten mit einer Pilotgruppe – zum Beispiel Marketing und Vertrieb – und rollen erst nach einem erfolgreichen Piloten breiter aus. In den Copilot-Trainings der Copilotenschule arbeiten wir mit genau solchen Pilotgruppen und helfen bei der schrittweisen Einführung."
    },
    {
      name: "Was passiert, wenn ein Mitarbeiter versehentlich vertrauliche Informationen in Copilot eingibt?",
      answer: "Copilot-Prompts und -Antworten bleiben innerhalb Ihres Microsoft-365-Tenants und werden nicht zum Training von KI-Modellen verwendet. Trotzdem sollten Sie klare Nutzungsrichtlinien kommunizieren, was in Prompts gehört und was nicht. Besonders sensible Daten wie Passwörter oder Kreditkartennummern können durch DLP-Richtlinien in Microsoft Purview automatisch erkannt und blockiert werden. Die Copilotenschule unterstützt bei der Erstellung solcher Richtlinien."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Kann Copilot alle Firmendaten sehen? Liest Microsoft mit? Was ist mit der DSGVO? Ehrliche Antworten auf die häufigsten Datenschutz-Fragen rund um Microsoft 365 Copilot.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-11",
        "dateModified": "2026-02-28",
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
        title="Microsoft Copilot und Datenschutz: Kann die KI jetzt alles sehen? | copilotenschule.de"
        description="Kann Copilot alle Firmendaten sehen? Liest Microsoft mit? Was ist mit der DSGVO? Ehrliche Antworten auf die häufigsten Datenschutz-Fragen rund um Microsoft 365 Copilot."
        keywords={[
          "Copilot Datenschutz",
          "Microsoft Copilot DSGVO",
          "Copilot Zugriffsrechte",
          "Copilot Sicherheit",
          "Kann Copilot alles sehen",
          "Microsoft Copilot EU Daten",
          "Copilot Berechtigungen",
          "Copilot Betriebsrat",
          "Microsoft 365 Copilot Datenschutz",
          "Copilot Monitoring"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-11T09:00:00+01:00"
        modifiedTime="2026-02-28T09:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot & Datenschutz", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Ehrliche Antworten auf die häufigsten Datenschutz-Fragen rund um Microsoft 365 Copilot – für Endanwender und Entscheider."
        lastUpdated="28. Februar 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Nein, Copilot kann nicht „alles sehen".</strong> Er hat exakt die gleichen Zugriffsrechte wie
              Sie selbst – nicht mehr, nicht weniger. Ihre Daten werden nicht zum KI-Training verwendet und seit
              der EU Data Boundary in der EU verarbeitet. Microsoft kann Ihre Inhalte nicht lesen. Ihre Kollegen
              sehen durch Copilot nichts, was sie nicht auch ohne Copilot sehen könnten. Allerdings macht Copilot
              bestehende Berechtigungsprobleme sichtbarer – und genau deshalb sollten Organisationen vor dem
              Rollout ihre Hausaufgaben machen.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p className="text-lg leading-relaxed">
            Wenn Unternehmen Microsoft 365 Copilot einführen, kommen immer dieselben Fragen auf – von der
            Geschäftsführung, vom Betriebsrat, von der IT-Abteilung und von den Mitarbeitenden selbst.
            „Kann die KI jetzt meine E-Mails lesen?" „Sieht Microsoft, was ich prompte?" „Landen unsere
            Daten in den USA?" Diese Fragen sind berechtigt. Und sie verdienen ehrliche, differenzierte
            Antworten – nicht das übliche „Ist alles sicher, vertrauen Sie uns."
          </p>
          <p className="leading-relaxed">
            Dieser Artikel beantwortet die häufigsten Datenschutz-Fragen rund um Microsoft 365 Copilot.
            Vieles davon ist gut gelöst – besser, als die meisten erwarten. Aber es gibt echte Risiken,
            wenn Organisationen ihre Hausaufgaben nicht machen. Beides gehört auf den Tisch.
          </p>
        </div>

        {/* Kann Copilot alles sehen? */}
        <section id="kann-copilot-alles-sehen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Kann Copilot alle Dateien im Unternehmen sehen?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              <strong>Kurze Antwort: Nein.</strong> Copilot kann exakt das sehen, was Sie selbst sehen können – und
              keinen Byte mehr. Das ist das Grundprinzip: Copilot erbt Ihre persönlichen Zugriffsrechte aus
              Microsoft 365. Wenn Sie keinen Zugriff auf die SharePoint-Seite der Personalabteilung haben,
              hat Copilot das auch nicht. Wenn Sie die E-Mails Ihres Chefs nicht lesen können, kann Copilot
              das auch nicht.
            </p>
            <p>
              Technisch funktioniert das so: Wenn Sie Copilot eine Frage stellen, durchsucht er über den
              Microsoft Graph Ihre E-Mails, Chats, Dateien und Meeting-Transkripte. Der Graph prüft bei
              jeder Abfrage Ihre Berechtigungen – in Echtzeit. Das ist dasselbe Berechtigungssystem, das
              auch greift, wenn Sie manuell in SharePoint nach einer Datei suchen.
            </p>
            <p>
              <strong>Aber – und das ist der kritische Punkt:</strong> Copilot macht bestehende
              Berechtigungsprobleme sichtbar, die vorher unbemerkt blieben. Wenn eine HR-Excel mit
              Gehaltsdaten „versehentlich" für die gesamte Organisation freigegeben ist, konnte theoretisch
              schon immer jeder darauf zugreifen. Nur hat niemand gezielt danach gesucht. Copilot sucht
              gezielt – und findet. Das ist kein Sicherheitsproblem von Copilot. Es ist ein bestehendes
              Berechtigungsproblem, das Copilot schonungslos aufdeckt.
            </p>
          </div>
        </section>

        {/* Kann Microsoft mitlesen? */}
        <section id="kann-microsoft-mitlesen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Kann Microsoft meine Daten lesen?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              <strong>Nein.</strong> Microsoft hat keinen inhaltlichen Zugriff auf Ihre Unternehmensdaten in
              Microsoft 365. Das gilt auch für Copilot: Ihre Prompts, die Antworten von Copilot und die
              zugrunde liegenden Daten aus dem Microsoft Graph werden nicht von Microsoft-Mitarbeitenden
              eingesehen. Die Daten sind verschlüsselt – sowohl bei der Übertragung (TLS 1.3) als auch bei
              der Speicherung (AES-256) – und durch die Tenant-Isolation strikt von anderen Kunden getrennt.
            </p>
            <p>
              Was viele besonders beschäftigt: <strong>Werden meine Daten zum Training von KI-Modellen
              verwendet?</strong> Auch hier ein klares Nein. Microsoft hat sich vertraglich verpflichtet, dass
              Unternehmensdaten aus Microsoft 365 nicht zum Training der zugrunde liegenden Large Language
              Models verwendet werden. Das ist im Data Protection Addendum (DPA) festgehalten, das für alle
              kommerziellen Kunden gilt. Ihre Gehaltsdaten, Ihre Vertragsentwürfe, Ihre internen
              Diskussionen – nichts davon fließt in das Training von GPT-Modellen ein.
            </p>
          </div>
        </section>

        {/* USA-Verarbeitung */}
        <section id="usa-verarbeitung" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Werden meine Daten in den USA verarbeitet?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Diese Frage kommt in jedem zweiten Gespräch – verständlicherweise, nach Schrems II und der
              ganzen Debatte um Datentransfers in die USA. Die Antwort ist differenzierter, als ein einfaches
              Ja oder Nein.
            </p>
            <p>
              Microsoft hat mit der <strong>EU Data Boundary</strong> eine verbindliche Zusage gemacht: Alle
              Kundendaten europäischer Unternehmen – einschließlich der Daten, die durch Copilot verarbeitet
              werden – werden innerhalb der EU gespeichert und verarbeitet. Die EU Data Boundary umfasst
              Rechenzentren in den Niederlanden, Irland, Frankreich, Deutschland und weiteren EU-Standorten.
              Das betrifft die Kerndienste von Microsoft 365: Exchange, SharePoint, OneDrive, Teams – und
              eben auch Copilot.
            </p>
            <p>
              <strong>Eine Einschränkung gibt es:</strong> Wenn Sie in Copilot die Web-Suche aktiviert haben
              (Bing-Integration), können Suchanfragen die EU verlassen. Für die meisten Unternehmens-Use-Cases
              ist die Web-Suche ohnehin nicht relevant – Copilot arbeitet primär mit Ihren internen Daten.
              Falls Ihre Organisation auf Nummer sicher gehen will, kann die Bing-Integration durch den
              IT-Administrator deaktiviert werden.
            </p>
          </div>
        </section>

        {/* Können Kollegen meine E-Mails sehen? */}
        <section id="kollegen-sichtbarkeit" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Können Kollegen jetzt meine E-Mails und Chats sehen?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              <strong>Nein.</strong> Copilot ändert nichts an den bestehenden Zugriffsrechten. Ihre E-Mails
              sind Ihre E-Mails. Ihre 1:1-Chats in Teams sind Ihre 1:1-Chats. Kein Kollege kann über seinen
              Copilot auf Ihre persönlichen Daten zugreifen – genau so wenig, wie er sich in Ihr Outlook
              einloggen könnte.
            </p>
            <p>
              Das Prinzip funktioniert in beide Richtungen: Ihr Copilot zeigt Ihnen nichts aus den Postfächern
              oder privaten Chats Ihrer Kollegen. Er zeigt Ihnen nur das, worauf Sie bereits Zugriff haben:
              Ihre eigenen E-Mails, Chats in Gruppen-Channels, an denen Sie teilnehmen, Dateien auf
              SharePoint-Seiten, für die Sie berechtigt sind, und Meeting-Transkripte aus Meetings, an
              denen Sie teilgenommen haben.
            </p>
            <p>
              Allerdings gibt es eine Grauzone, die Organisationen im Blick haben sollten: Geteilte
              Postfächer und breite SharePoint-Freigaben. Wenn Ihr Unternehmen ein geteiltes Postfach
              für den Kundenservice hat, auf das zwanzig Personen Zugriff haben, dann kann Copilot für
              jede dieser zwanzig Personen Inhalte aus diesem Postfach verwenden. Das ist korrekt und
              gewollt – aber man sollte sich dessen bewusst sein.
            </p>
          </div>
        </section>

        {/* Monitoring */}
        <section id="monitoring" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Kann mein Chef sehen, was ich Copilot frage?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das ist eine der häufigsten Fragen von Endanwendern – und die Antwort ist zweigeteilt.
            </p>
            <p>
              <strong>Die konkreten Inhalte Ihrer Prompts</strong> – also was genau Sie Copilot fragen –
              sind standardmäßig nicht für Vorgesetzte oder die IT-Abteilung einsehbar. Ihre Copilot-Chats
              sind Ihre persönlichen Chats. Es gibt kein Dashboard, auf dem Ihr Chef nachlesen kann, dass
              Sie Copilot um eine Zusammenfassung Ihres Lebenslaufs gebeten haben.
            </p>
            <p>
              <strong>Was hingegen sichtbar sein kann:</strong> Nutzungsstatistiken. Über das Microsoft 365
              Admin Center und Microsoft Viva Insights können Administratoren aggregierte Daten einsehen –
              zum Beispiel wie viele Mitarbeitende Copilot nutzen, wie oft, und in welchen Apps. Das sind
              Nutzungszahlen, keine Inhalte. Die Granularität reicht bis auf Nutzerebene: Die IT kann sehen,
              dass Sie Copilot 47 Mal in dieser Woche in Teams verwendet haben. Aber nicht, was Sie gefragt
              haben.
            </p>
            <p>
              <strong>Eine Ausnahme existiert:</strong> Über Microsoft Purview und das Audit Log können bei
              berechtigtem Interesse (z.B. einem Compliance-Vorfall) auch einzelne Copilot-Interaktionen
              nachvollzogen werden. Das ist vergleichbar mit der Möglichkeit, E-Mails bei einem
              Verdachtsfall zu prüfen – es erfordert spezifische Berechtigungen und ist in den meisten
              Organisationen an strenge Prozesse gebunden. Niemand schaut „mal eben" in Ihre Prompts.
            </p>
          </div>
        </section>

        {/* Betriebsrat */}
        <section id="betriebsrat" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Betriebsrat und Mitbestimmung
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              In vielen deutschen Unternehmen ist die Einführung von Microsoft Copilot
              mitbestimmungspflichtig. Das liegt daran, dass Copilot als technische Einrichtung gelten kann,
              die geeignet ist, das Verhalten oder die Leistung von Arbeitnehmern zu überwachen (§ 87 Abs. 1
              Nr. 6 BetrVG). Die Nutzungsstatistiken, die über Viva Insights und das Admin Center verfügbar
              sind, können als Leistungsüberwachung interpretiert werden.
            </p>
            <p>
              In der Praxis bedeutet das: Binden Sie den Betriebsrat frühzeitig ein – nicht als Pflichtübung,
              sondern als strategischen Partner. Klären Sie gemeinsam, welche Nutzungsdaten erhoben werden,
              wer darauf Zugriff hat, und wie mit den Daten umgegangen wird. Eine Betriebsvereinbarung zur
              Copilot-Nutzung schafft Klarheit für alle Beteiligten und vermeidet Konflikte nach dem Rollout.
            </p>
            <p>
              Viele Betriebsräte haben weniger Bedenken, wenn sie verstehen, wie Copilot tatsächlich
              funktioniert. Transparenz ist hier der Schlüssel: Zeigen Sie dem Betriebsrat, was Copilot
              kann, was er nicht kann, welche Daten erhoben werden und welche nicht. In unserer Erfahrung
              wandeln sich Blockaden in konstruktive Zusammenarbeit, sobald die Informationslage stimmt.
            </p>
          </div>
        </section>

        {/* Hausaufgaben */}
        <section id="hausaufgaben" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Fünf Hausaufgaben vor dem Copilot-Rollout
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Copilot ist technisch gut abgesichert – aber er kann nicht reparieren, was in Ihrer
              Organisation seit Jahren falsch konfiguriert ist. Bevor Sie Copilot an Ihre Mitarbeitenden
              ausrollen, sollten Sie diese fünf Punkte abarbeiten:
            </p>
          </div>

          <div className="my-6 space-y-4">
            {[
              {
                nr: "1",
                titel: "Zugriffsrechte und Freigaben prüfen",
                text: 'Machen Sie einen Access Review für SharePoint und OneDrive. Suchen Sie nach Dateien und Ordnern, die für „Jeder" oder „Alle Mitarbeiter" freigegeben sind. Besonders kritisch: HR-Dokumente, Finanzdaten, Vertragsentwürfe. Was Copilot findet, konnte vorher auch jeder manuell finden – aber jetzt fällt es auf.'
              },
              {
                nr: "2",
                titel: "Datenschutz-Folgenabschätzung erstellen",
                text: "Nutzen Sie die offiziellen DSFA-Vorlagen aus dem M365-Kit, die Microsoft in Abstimmung mit deutschen Datenschutzbehörden entwickelt hat. Stimmen Sie die Ergebnisse mit Ihrem Datenschutzbeauftragten ab."
              },
              {
                nr: "3",
                titel: "Betriebsrat einbinden",
                text: "Informieren Sie den Betriebsrat frühzeitig über die geplante Einführung. Klären Sie Fragen zur Leistungsüberwachung und erarbeiten Sie eine Betriebsvereinbarung, die regelt, welche Nutzungsdaten erhoben werden und wer darauf Zugriff hat."
              },
              {
                nr: "4",
                titel: "Nutzungsrichtlinien kommunizieren",
                text: "Definieren Sie klare Regeln: Was darf in Copilot-Prompts eingegeben werden, was nicht? Wie wird mit Copilot-generierten Inhalten umgegangen? Wer ist Ansprechpartner bei Fragen? Kurz, verständlich, verbindlich."
              },
              {
                nr: "5",
                titel: "Pilotgruppe starten, nicht sofort für alle",
                text: "Rollen Sie Copilot zunächst an eine begrenzte Nutzergruppe aus. Sammeln Sie Erfahrungen, identifizieren Sie Probleme bei Berechtigungen oder Prozessen, und rollen Sie erst dann breiter aus. Das reduziert Risiken und schafft interne Fürsprecher."
              }
            ].map((item) => (
              <Card key={item.nr} className="border-l-4 border-l-primary">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                      {item.nr}
                    </div>
                    <div>
                      <p className="font-semibold text-base">{item.titel}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
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

        {/* Autor-Info */}
        <Card className="mt-12 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <img
                src={martinLang.image}
                alt={martinLang.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">{martinLang.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{martinLang.role}</p>
                <p className="text-sm leading-relaxed">{martinLang.bio}</p>
                <div className="flex gap-3 mt-3">
                  {martinLang.sameAs?.filter(url => url.includes('linkedin')).map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                       className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                      LinkedIn-Profil <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </ContentLayout>
    </>
  );
};

export default CopilotSicherheit;
