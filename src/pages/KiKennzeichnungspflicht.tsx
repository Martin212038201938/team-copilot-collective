import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import HoneypotCTA from "@/components/HoneypotCTA";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "ki-kennzeichnungspflicht-eu-ai-act";
const PAGE_TITLE = "KI-Kennzeichnungspflicht: Was ab 2. August 2026 gilt";

const KiKennzeichnungspflicht = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "stichtag", title: "Der Stichtag und ein hartnäckiges Missverständnis", level: 2 },
    { id: "copilot-alltag", title: "Was das für Ihren Copilot-Alltag heißt", level: 2 },
    { id: "entscheidungsbaum", title: "Der Entscheidungsbaum für Text und Bild", level: 2 },
    { id: "chatbots", title: "Was der Entscheidungsbaum nicht zeigt", level: 2 },
    { id: "anbieter-betreiber", title: "Die Verwechslung, die am meisten kostet", level: 2 },
    { id: "microsoft", title: "Wie Microsoft unsichtbar kennzeichnet", level: 2 },
    { id: "fristen", title: "Fristen, Aufsicht, Bußgelder", level: 2 },
    { id: "umsetzung", title: "Was jetzt zu tun ist", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Transparenz", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir nutzen Microsoft Copilot täglich für Texte, Mails und Präsentationen. Müssen wir jetzt jedes Dokument kennzeichnen?",
      answer: "Nein. Artikel 50 greift für Texte nur dann, wenn sie veröffentlicht werden, um die Öffentlichkeit über ein Thema von öffentlichem Interesse zu informieren – und selbst dann entfällt die Pflicht, wenn eine Person die redaktionelle Verantwortung übernimmt. Interne Mails, Protokolle, Angebote und Produktbeschreibungen fallen nicht darunter. Der praktische Aufwand liegt deshalb nicht im Kennzeichnen, sondern darin, dass Ihre Leute die Grenze zuverlässig erkennen. Genau das ist Inhalt der EU AI Act Pflichtschulung der Copilotenschule."
    },
    {
      name: "Unser Marketing veröffentlicht KI-generierte Bilder auf Social Media. Reicht es, wenn das Tool automatisch ein Wasserzeichen setzt?",
      answer: "Für die Anbieterpflicht ja, für Ihre eigene Pflicht als Betreiber nicht zwingend. Die maschinenlesbaren Content Credentials, die Microsoft und OpenAI automatisch einbetten, überstehen das Hochladen auf Plattformen und einen Screenshot oft nicht. Zeigt ein Bild eine reale Person, einen realen Ort oder ein reales Ereignis so, dass es für echt gehalten werden könnte, brauchen Sie zusätzlich eine sichtbare Offenlegung. Bei reinen Illustrationen und Fantasiemotiven ist sie nach Artikel 50 nicht gefordert."
    },
    {
      name: "Wie überzeuge ich unsere Geschäftsführung, dass das kein reines IT-Thema ist?",
      answer: "Mit der Zuständigkeitsfrage. Die technische Kennzeichnung erledigen die Hersteller, dafür braucht es keine interne Entscheidung. Was Ihr Unternehmen leisten muss, entsteht in Marketing, Kommunikation, Vertrieb und Kundenservice: Wer beurteilt, ob ein Text von öffentlichem Interesse ist? Wer prüft ihn redaktionell? Wer beschriftet den Chatbot? Das sind Prozessfragen, keine Systemfragen. Die Copilotenschule unterstützt Führungskreise dabei, diese Zuständigkeiten in einem halben Tag festzulegen."
    },
    {
      name: "Wer haftet im Unternehmen, wenn eine Kennzeichnung fehlt?",
      answer: "Adressat der Pflicht ist das Unternehmen als Betreiber, nicht die einzelne Mitarbeiterin. Der Bußgeldrahmen liegt bei bis zu 15 Millionen Euro oder drei Prozent des weltweiten Jahresumsatzes. Realistisch sind die ersten Fälle eher Beschwerden über den Service-Desk der Bundesnetzagentur und wettbewerbsrechtliche Abmahnungen als spektakuläre Strafen. Dokumentierte Zuständigkeiten und nachweisbare Schulungen sind die beiden Belege, die im Ernstfall zählen."
    },
    {
      name: "Unsere Mitarbeiter wissen nicht, wann sie kennzeichnen müssen. Wie bekommen wir das schnell in die Fläche?",
      answer: "Über eine kurze, verbindliche Schulung mit Teilnahmenachweis statt über eine Richtlinie im Intranet, die niemand liest. Die EU AI Act Pflichtschulung der Copilotenschule dauert zwei bis drei Stunden, setzt kein Vorwissen voraus und deckt Artikel 4 und Artikel 50 gemeinsam ab. Teilnehmende erhalten ein Zertifikat, das Sie bei Prüfungen und Behördenanfragen vorlegen können."
    },
    {
      name: "Gilt die Kennzeichnungspflicht auch für interne Inhalte wie Protokolle, Schulungsunterlagen oder Präsentationen?",
      answer: "Nach Artikel 50 nicht. Die Pflichten für Deepfakes und für Texte von öffentlichem Interesse setzen eine Veröffentlichung beziehungsweise eine Verbreitung voraus. Trotzdem lohnt sich eine interne Konvention: Wenn im Unternehmen erkennbar ist, welche Passagen KI-generiert und ungeprüft sind, sinkt das Risiko, dass ein solcher Entwurf später ungeprüft nach außen geht. Das ist kein Compliance-Thema, sondern Qualitätssicherung."
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Artikel 50 EU AI Act gilt ab 2. August 2026. Entscheidungsbaum für Text und Bild, Anbieter- und Betreiberpflichten, Microsofts C2PA-Kennzeichnung, Fristen und Bußgelder.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": { "@id": "https://copilotenschule.de/#organization" },
        "datePublished": "2026-07-31",
        "dateModified": "2026-07-31",
        "keywords": ["KI-Kennzeichnungspflicht","EU AI Act Artikel 50","KI-Inhalte kennzeichnen","Transparenzpflichten KI","Deepfake Kennzeichnung","Content Credentials C2PA"],
        "articleSection": "Recht & Compliance",
        "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl }
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
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
        title="KI-Kennzeichnungspflicht ab 2. August 2026"
        description="Artikel 50 EU AI Act gilt ab 2. August 2026. Was Sie kennzeichnen müssen, was nicht – plus wie Microsoft KI-Inhalte technisch unsichtbar markiert."
        keywords={["KI-Kennzeichnungspflicht","EU AI Act Artikel 50","KI-Inhalte kennzeichnen","Transparenzpflichten KI","Deepfake Kennzeichnung","KI-Verordnung 2026","Content Credentials C2PA","Microsoft Copilot Wasserzeichen"]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-07-31"
        modifiedTime="2026-07-31"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "KI-Kennzeichnungspflicht", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Artikel 50 der KI-Verordnung wird am 2. August 2026 anwendbar. Was zu kennzeichnen ist, was nicht – und wie Microsoft die technische Kennzeichnung im Hintergrund löst."
        lastUpdated="31. Juli 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "training:eu-ai-act-pflichtschulung",
          "wissen:eu-ai-act-mitarbeiter-schulung-august-2026",
          "wissen:ki-schulung-mitarbeiter-pflicht",
          "wissen:copilot-sicherheit-datenschutz"
        ]}
      >

        {/* Schnellantwort-Card */}
        <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle>
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Ab dem <strong>2. August 2026</strong> müssen Chatbots als KI erkennbar sein, Deepfakes
              offengelegt und KI-Texte zu Themen von öffentlichem Interesse gekennzeichnet werden –
              Letzteres nur, wenn keine redaktionelle Prüfung stattgefunden hat. Werbetexte,
              Produktbeschreibungen, interne Dokumente, Illustrationen und Fantasiemotive fallen nicht
              darunter. Die technische, maschinenlesbare Markierung ist Sache der Hersteller und
              passiert bei Microsoft und OpenAI bereits automatisch. Der sogenannte Digital Omnibus hat
              diese Pflichten ausdrücklich nicht verschoben. Bußgeldrahmen: bis zu 15 Millionen Euro
              oder drei Prozent des weltweiten Jahresumsatzes. Wer die Regel im Team verankern will,
              findet in unserer <Link to="/trainings/eu-ai-act-pflichtschulung" className="text-primary hover:underline">EU AI Act Pflichtschulung</Link> den
              passenden Rahmen.
            </p>
          </CardContent>
        </Card>

        {/* Rechtshinweis */}
        <div className="mt-6 mb-6 rounded-md border-l-4 border-muted-foreground/40 bg-muted/40 px-4 py-3">
          <p className="text-sm text-muted-foreground mb-0">
            <strong>Dieser Artikel ist keine Rechtsberatung.</strong> Er gibt den Stand vom
            31. Juli 2026 wieder und dient der fachlichen Orientierung. Ob und wie Artikel 50 auf
            einen konkreten Anwendungsfall zutrifft, ist eine Einzelfallfrage und gehört in
            anwaltliche Hände.
          </p>
        </div>

        <section id="stichtag" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Der Stichtag und ein hartnäckiges Missverständnis
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Übermorgen, am Sonntag dem 2. August 2026, wird Artikel 50 der KI-Verordnung anwendbar.
              Die verbreitetste Reaktion darauf lautet seit Monaten: Das ist doch verschoben worden.
              Diese Annahme ist nachvollziehbar und trotzdem falsch, und sie wird in den nächsten Wochen
              einigen Unternehmen unangenehm auffallen.
            </p>
            <p>
              Richtig ist, dass der sogenannte{" "}
              <a
                href="https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Digital Omnibus
              </a>{" "}
              tatsächlich Fristen gestreckt hat. Der Rat der EU hat das Paket am 29. Juni 2026 final
              gebilligt, das Parlament hatte am 16. Juni zugestimmt. Verschoben wurden dabei die
              Anforderungen an Hochrisiko-KI: eigenständige Hochrisiko-Systeme nach Anhang III auf den
              2. Dezember 2027, KI in regulierten Produkten nach Anhang I auf den 2. August 2028. Das ist
              der Teil mit dem größten Umsetzungsaufwand, und die Verlängerung war überfällig. Die
              Transparenzpflichten aus Artikel 50 wurden von dieser Verschiebung jedoch ausdrücklich
              ausgenommen. Sie gelten unverändert ab Sonntag.
            </p>
            <p>
              Der Unterschied ist praktisch relevant, weil Artikel 50 anders adressiert als der Rest der
              Verordnung. Hochrisiko-Pflichten treffen wenige Unternehmen sehr hart. Artikel 50 trifft
              fast jedes Unternehmen ein bisschen – jeden mit einem Chatbot auf der Website, jeden, der
              KI-Bilder in Kampagnen einsetzt, jeden, der Inhalte veröffentlicht. Wer bislang davon ausging,
              der AI Act betreffe ihn nicht, weil er keine Hochrisiko-Anwendung betreibt, hat sich in
              diesem Punkt verrechnet.
            </p>
            <p>
              Die Kennzeichnungspflicht kommt außerdem nicht allein. Artikel 4 der KI-Verordnung
              verpflichtet Unternehmen bereits seit dem 2. Februar 2025 dazu, ihre Beschäftigten
              KI-kompetent zu machen. Der Digital Omnibus hat diese Vorgabe entschärft – ein garantiertes
              Kompetenzniveau pro Person ist nicht mehr gefordert – aber nicht gestrichen. Mit der
              Bundesnetzagentur als nationaler Aufsicht wird die Pflicht ab August erstmals durchsetzbar.
              Beides greift ineinander: Kennzeichnen kann nur, wer die Regel kennt. Wir decken deshalb
              in unserer{" "}
              <Link to="/trainings/eu-ai-act-pflichtschulung" className="text-primary hover:underline font-semibold">
                EU AI Act Pflichtschulung
              </Link>{" "}
              Artikel 4 und Artikel 50 gemeinsam ab und schließen mit einem Teilnahmezertifikat für
              Audits ab. Wie die Schulungspflicht selbst funktioniert, steht ausführlich im Beitrag zur{" "}
              <Link to="/wissen/ki-schulung-mitarbeiter-pflicht" className="text-primary hover:underline">
                KI-Schulungspflicht nach Artikel 4
              </Link>.
            </p>
          </div>
        </section>

        <section id="copilot-alltag" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was das für Ihren Copilot-Alltag heißt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Bevor es um Paragrafen geht, die praktische Antwort: Der weitaus größte Teil dessen, was
              Menschen täglich mit Microsoft Copilot tun, ist nicht kennzeichnungspflichtig. Betroffen
              sind nur veröffentlichte Inhalte, und auch dort nur zwei klar umrissene Fälle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card className="border-2 border-green-500/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-700 dark:text-green-400">
                  Keine Kennzeichnung nötig
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-base leading-relaxed list-disc pl-5 mb-0">
                  <li>Mails in Outlook mit Copilot formulieren oder zusammenfassen</li>
                  <li>Teams-Besprechungsnotizen und Protokolle erzeugen lassen</li>
                  <li>Angebote, Produktbeschreibungen, Stellenanzeigen, Werbetexte</li>
                  <li>Interne Präsentationen, Auswertungen und Schulungsunterlagen</li>
                  <li>Illustrationen, Symbolbilder, Icons und Grafiken aus Designer in Folien</li>
                  <li>Blogbeiträge über die eigenen Produkte und Leistungen</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-500/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-700 dark:text-red-400">
                  Kennzeichnung nötig
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-base leading-relaxed list-disc pl-5 mb-0">
                  <li>
                    Veröffentlichte Beiträge zu Politik, Wahlen, Gesundheit, Sicherheit, Umwelt oder
                    Wirtschaft, die niemand redaktionell geprüft hat
                  </li>
                  <li>
                    Bilder, die eine reale Person, einen realen Ort oder ein reales Ereignis zeigen oder
                    verändern und für echt gehalten werden könnten
                  </li>
                  <li>Videos und KI-Stimmen, die einen realen Menschen nachbilden – auch aus Clipchamp</li>
                  <li>Chatbots und Sprachassistenten: Hinweis beim ersten Kontakt, dass eine KI antwortet</li>
                  <li>
                    Systeme zur Emotionserkennung oder biometrischen Kategorisierung: Information der
                    betroffenen Personen
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Faustregel, die in Schulungen am besten hängen bleibt: Kennzeichnungspflicht entsteht
              dort, wo etwas veröffentlicht wird und wo jemand getäuscht werden könnte – über die Echtheit
              eines Bildes oder darüber, dass hinter einer Information kein Mensch steht. Alles, was im
              Unternehmen bleibt oder erkennbar Werbung in eigener Sache ist, fällt nicht darunter. Wer
              unsicher ist, kennzeichnet: Ein Hinweis zu viel ist kein Verstoß, ein Hinweis zu wenig
              möglicherweise schon.
            </p>
          </div>
        </section>

        <section id="entscheidungsbaum" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Der Entscheidungsbaum für Text und Bild
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Für die beiden häufigsten Fälle lässt sich die Prüfung auf je eine, im Textfall zwei
              Fragen zusammenziehen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">

            {/* TEXT */}
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-primary text-primary-foreground font-bold text-center py-2 tracking-wide">
                TEXT
              </div>
              <div className="p-4 space-y-3">
                <div className="rounded border bg-muted/40 p-3 text-sm">
                  <p className="font-semibold mb-1">
                    Informiert der Text die Öffentlichkeit über ein Thema von öffentlichem Interesse?
                  </p>
                  <p className="text-muted-foreground mb-0">
                    Etwa Politik, Wahlen, Gesundheit, Sicherheit, Umwelt, Wirtschaft
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 items-start">
                  <div>
                    <div className="text-center text-xs font-bold text-primary mb-1">NEIN</div>
                    <div className="rounded border-2 border-green-500/50 bg-green-500/5 p-3 text-sm">
                      <p className="font-bold text-green-700 dark:text-green-400 mb-1">
                        Keine Kennzeichnung erforderlich
                      </p>
                      <p className="text-muted-foreground text-xs mb-0">
                        Werbetexte, Produktbeschreibungen, interne Mails, rein unterhaltende Inhalte
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-center text-xs font-bold text-primary mb-1">JA</div>
                    <div className="rounded border bg-muted/40 p-3 text-sm">
                      <p className="font-semibold mb-0">
                        Wurde der Text menschlich geprüft und trägt eine Person oder Organisation die
                        redaktionelle Verantwortung?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
                      <div>
                        <div className="text-center text-xs font-bold text-primary mb-1">JA</div>
                        <div className="rounded border-2 border-green-500/50 bg-green-500/5 p-2 text-xs">
                          <p className="font-bold text-green-700 dark:text-green-400 mb-1">
                            Keine Kennzeichnung
                          </p>
                          <p className="text-muted-foreground mb-0">
                            Redaktionell überarbeiteter Beitrag
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="text-center text-xs font-bold text-primary mb-1">NEIN</div>
                        <div className="rounded border-2 border-red-500/50 bg-red-500/5 p-2 text-xs">
                          <p className="font-bold text-red-700 dark:text-red-400 mb-1">
                            Als KI-generiert kennzeichnen
                          </p>
                          <p className="text-muted-foreground mb-0">
                            Ungeprüfter KI-Artikel ohne Redaktion
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BILD */}
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-primary text-primary-foreground font-bold text-center py-2 tracking-wide">
                BILD, AUDIO, VIDEO
              </div>
              <div className="p-4 space-y-3">
                <div className="rounded border bg-muted/40 p-3 text-sm">
                  <p className="font-semibold mb-1">
                    Zeigt oder manipuliert der Inhalt eine reale Person, einen realen Ort, Gegenstand,
                    eine Organisation oder ein reales Ereignis – und könnte er für echt gehalten werden?
                  </p>
                  <p className="text-muted-foreground mb-0">
                    Juristisch: Deepfake nach Art. 3 Nr. 60
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 items-start">
                  <div>
                    <div className="text-center text-xs font-bold text-primary mb-1">NEIN</div>
                    <div className="rounded border-2 border-green-500/50 bg-green-500/5 p-3 text-sm">
                      <p className="font-bold text-green-700 dark:text-green-400 mb-1">
                        Keine sichtbare Kennzeichnung erforderlich
                      </p>
                      <p className="text-muted-foreground text-xs mb-0">
                        Illustrationen, Grafiken, Fantasie- und Spielwelten, abstrakte Motive, Icons, Designs
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="text-center text-xs font-bold text-primary mb-1">JA</div>
                    <div className="rounded border-2 border-red-500/50 bg-red-500/5 p-3 text-sm">
                      <p className="font-bold text-red-700 dark:text-red-400 mb-1">
                        Als KI-generiert oder KI-manipuliert kennzeichnen
                      </p>
                      <p className="text-muted-foreground text-xs mb-0">
                        KI-Bild eines Politikers bei einer erfundenen Handlung, Foto eines Ereignisses,
                        das nie stattfand, manipulierte Gesichter, Orte, Objekte
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded border bg-muted/40 p-3 text-xs text-muted-foreground">
                  Auch künstlerische, satirische oder fiktionale Deepfakes müssen offengelegt werden –
                  aber so, dass die Darstellung und der Genuss des Werks nicht unnötig beeinträchtigt werden.
                </div>
              </div>
            </div>
          </div>

          <Card className="border-2 border-amber-500/40 bg-amber-500/5 mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Wichtig zu wissen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed mb-0">
                Die grünen Felder bedeuten: keine Pflicht <em>für Sie als Betreiber</em>. Unabhängig davon
                müssen die Anbieter generativer KI ihre Ausgaben technisch maschinenlesbar markieren, etwa
                über Metadaten oder Wasserzeichen. Diese Pflicht gilt für Text, Bild, Audio und Video
                gleichermaßen. Ausgenommen sind Systeme, die lediglich unterstützend bearbeiten und den
                Inhalt oder seine Bedeutung nicht wesentlich verändern.
              </p>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Eine Einschränkung, die in kursierenden Übersichten meist untergeht: Die Textprüfung setzt
              eine Veröffentlichung zur Information der Öffentlichkeit voraus. Ein Blogbeitrag über die
              eigene Produktentwicklung ist damit in aller Regel nicht erfasst, ein ungeprüfter KI-Text
              über die Bundestagswahl schon. Die Grenze verläuft nicht zwischen intern und extern, sondern
              zwischen Eigenwerbung und öffentlicher Information. Wer hier großzügig interpretiert und im
              Zweifel kennzeichnet, macht nichts falsch – wer eine Redaktion vorschiebt, die faktisch nicht
              liest, schon.
            </p>
          </div>
        </section>

        <section id="chatbots" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was der Entscheidungsbaum nicht zeigt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Text und Bild sind die Fälle, über die geredet wird. Zwei weitere Pflichten aus Artikel 50
              betreffen in der Praxis mehr Unternehmen, als der Aufmerksamkeitsverteilung entspricht.
              Die erste: Wer ein KI-System betreibt, das direkt mit Menschen interagiert, muss dafür sorgen,
              dass diese Menschen wissen, dass sie mit einer Maschine sprechen – spätestens beim ersten
              Kontakt. Das betrifft den Website-Chatbot ebenso wie den Sprachassistenten in der Hotline.
              Die Ausnahme greift nur, wenn es für eine verständige Person ohnehin offensichtlich ist, und
              ein Chatfenster mit menschlichem Vornamen und Profilbild ist genau das Gegenteil davon.
            </p>
            <p>
              Die zweite betrifft Emotionserkennung und biometrische Kategorisierung. Wer solche Systeme
              einsetzt, muss die betroffenen Personen informieren und zusätzlich die Datenschutzvorgaben
              einhalten. Das klingt exotisch, taucht aber in Recruiting-Tools, Kundenservice-Analysen und
              Kamerasystemen im Einzelhandel häufiger auf, als den einkaufenden Fachabteilungen bewusst ist.
            </p>
          </div>
        </section>

        <section id="anbieter-betreiber" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Die Verwechslung, die am meisten kostet
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Artikel 50 verteilt die Last auf zwei Rollen, und wer sie durcheinanderbringt, tut entweder
              zu viel oder zu wenig. Anbieter sind die Hersteller der Systeme: OpenAI, Microsoft, Google,
              Adobe. Sie schulden die technische, maschinenlesbare Markierung nach Absatz 2 und die
              Erkennbarkeit interaktiver Systeme nach Absatz 1. Betreiber sind die Unternehmen, die diese
              Systeme einsetzen. Sie schulden die sichtbare Offenlegung bei Deepfakes und bei ungeprüften
              KI-Texten von öffentlichem Interesse sowie die Information bei Emotionserkennung.
            </p>
            <p>
              Die praktische Konsequenz: Für die technische Kennzeichnung müssen Sie nichts bauen. Sie
              passiert, ohne dass jemand in Ihrem Unternehmen eine Entscheidung trifft. Was Sie leisten
              müssen, ist redaktioneller und organisatorischer Natur, und genau deshalb ist es kein
              IT-Projekt. Die Frage, ob ein Text von öffentlichem Interesse ist und ob die Prüfung durch
              eine Person mit redaktioneller Verantwortung tatsächlich stattgefunden hat, beantwortet keine
              Software. Sie beantwortet jemand in der Kommunikationsabteilung – oder eben niemand, und
              das ist der Zustand, den ich derzeit in den meisten Organisationen antreffe.
            </p>
          </div>
        </section>

        <section id="microsoft" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Wie Microsoft unsichtbar kennzeichnet
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Für die maschinenlesbare Markierung hat sich faktisch ein Standard durchgesetzt: C2PA,
              entwickelt von der Coalition for Content Provenance and Authenticity. Dabei wird an die
              Bilddatei ein kryptografisch signiertes Manifest angehängt, das festhält, welches Modell den
              Inhalt erzeugt hat, mit welcher Anwendung und wann. Der finale Verhaltenskodex der
              EU-Kommission zur Kennzeichnung KI-generierter Inhalte, veröffentlicht am 10. Juni 2026,
              benennt die Kombination aus signierten Metadaten und unmerklichen Wasserzeichen als
              technischen Mindestansatz. Er ist freiwillig, wird aber zum Maßstab werden, an dem
              Aufsichtsbehörden Angemessenheit messen.
            </p>
            <p>
              Microsoft setzt C2PA an mehreren Stellen ein. In Azure OpenAI erhalten alle Bilder aus den
              DALL-E- und GPT-image-Modellen automatisch Content Credentials, ohne Konfiguration, signiert
              mit einem auf Microsoft rückführbaren Zertifikat. Prüfen lässt sich das öffentlich über
              contentcredentials.org. In Microsoft 365 ist die Logik zweistufig aufgebaut: Sichtbare
              Wasserzeichen bei Videos aus Clipchamp und bei KI-Bildern in Word, PowerPoint und Designer
              lassen sich per Cloud Policy oder durch die Nutzerin steuern, ein hörbarer Hinweis markiert
              KI-generierte Audioinhalte. Die C2PA-Metadaten dagegen werden unabhängig von diesen
              Einstellungen geschrieben. Sie sind nicht abschaltbar. Das ist die eigentliche Umsetzung von
              Absatz 2: eine Kennzeichnung, die niemand sieht und niemand entfernen soll.
            </p>
            <p>
              Zwei Dinge sollte man dabei nüchtern sehen. Erstens: Für reinen Text gibt es diese Markierung
              nicht. Weder Word noch Outlook versehen einen von Copilot geschriebenen Absatz mit Metadaten,
              und die Microsoft-Dokumentation stellt auch nichts dergleichen in Aussicht. Das ist kein
              Versäumnis, sondern ein ungelöstes technisches Problem – Text lässt sich nicht signieren wie
              eine Datei, und jeder Copy-and-paste-Vorgang würde eine Markierung ohnehin verlieren. Der
              Verhaltenskodex bleibt in diesem Punkt entsprechend vage.
            </p>
            <p>
              Zweitens: Content Credentials sind fragil. Sie hängen an der Datei, nicht am Bild. Ein
              Screenshot entfernt sie vollständig, viele Verarbeitungsschritte und Plattform-Uploads
              ebenfalls. Ausgerechnet in den Kanälen, in denen Inhalte tatsächlich zirkulieren, kommt die
              unsichtbare Kennzeichnung also häufig nicht an. Wer sich als Betreiber darauf verlässt, dass
              das Tool die Sache schon erledigt hat, hat die Pflicht nicht verstanden: Die technische
              Markierung ist ein Nachweis für forensische Prüfung, keine Information für Ihr Publikum.
            </p>
          </div>
        </section>

        <section id="fristen" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Fristen, Aufsicht, Bußgelder
          </h2>

          <div className="mb-4 overflow-x-auto">
            <table className="w-full text-base border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-2 border font-semibold whitespace-nowrap">Datum</th>
                  <th className="text-left p-2 border font-semibold">Was gilt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-semibold whitespace-nowrap">2. Aug. 2026</td>
                  <td className="p-2 border">Artikel 50 vollständig anwendbar: Chatbot-Transparenz, Deepfake-Offenlegung, KI-Texte von öffentlichem Interesse, Emotionserkennung</td>
                </tr>
                <tr className="bg-muted/40">
                  <td className="p-2 border font-semibold whitespace-nowrap">2. Dez. 2026</td>
                  <td className="p-2 border">Ende der Übergangsfrist für die maschinenlesbare Markierung bei generativen Systemen, die vor dem 2. August 2026 in Verkehr gebracht wurden</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold whitespace-nowrap">2. Dez. 2027</td>
                  <td className="p-2 border">Hochrisiko-Systeme nach Anhang III (verschoben durch den Digital Omnibus)</td>
                </tr>
                <tr className="bg-muted/40">
                  <td className="p-2 border font-semibold whitespace-nowrap">2. Aug. 2028</td>
                  <td className="p-2 border">Hochrisiko-KI in regulierten Produkten nach Anhang I</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Zuständig für die Marktüberwachung ist in Deutschland die Bundesnetzagentur. Der Bundestag
              hat die dafür nötige Behördenstruktur am 11. Juni 2026 beschlossen; ein Koordinierungs- und
              Kompetenzzentrum betreibt einen kostenlosen Service-Desk für Unternehmen. Der Bußgeldrahmen
              für Verstöße gegen Artikel 50 liegt bei bis zu 15 Millionen Euro oder drei Prozent des
              weltweiten Jahresumsatzes, je nachdem, was höher ist. Für kleine und mittlere Unternehmen
              sieht die Verordnung Reduzierungen vor. Realistisch werden die ersten Fälle keine
              Rekordstrafen sein, sondern Beschwerden von Wettbewerbern und Nutzern – und, das halte ich
              für das größere Risiko, wettbewerbsrechtliche Abmahnungen wegen irreführender Werbung.
            </p>
          </div>
        </section>

        <section id="umsetzung" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was jetzt zu tun ist
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Aufwand für Artikel 50 ist überschaubar, wenn man ihn als Prozessfrage behandelt statt
              als Rechtsproblem. Drei Dinge tragen den größten Teil: Prüfen Sie jeden Chatbot und
              Sprachassistenten daraufhin, ob die KI-Eigenschaft beim ersten Kontakt erkennbar ist – ein
              Satz im Begrüßungstext genügt meist. Legen Sie schriftlich fest, wer in Marketing und
              Kommunikation die redaktionelle Verantwortung für veröffentlichte Inhalte übernimmt, und
              stellen Sie sicher, dass diese Prüfung real stattfindet und nachvollziehbar dokumentiert ist.
              Und definieren Sie eine Standardformulierung für den Deepfake-Fall, damit im Zweifel niemand
              improvisieren muss.
            </p>
            <p>
              Was das alles voraussetzt, ist, dass die Menschen, die täglich mit Copilot und ChatGPT
              arbeiten, die Unterscheidung überhaupt treffen können. Eine Richtlinie im Intranet leistet
              das erfahrungsgemäß nicht. Eine kurze verbindliche Schulung mit Nachweis leistet es, und sie
              erfüllt gleichzeitig die Anforderung aus Artikel 4. Unsere{" "}
              <Link to="/trainings/eu-ai-act-pflichtschulung" className="text-primary hover:underline font-semibold">
                EU AI Act Pflichtschulung
              </Link>{" "}
              dauert zwei bis drei Stunden, setzt kein Vorwissen voraus und schließt mit einem Zertifikat
              ab, das Sie bei Audits und Behördenanfragen vorlegen können. Wer breiter aufstellen will,
              findet in{" "}
              <Link to="/unsere-angebote" className="text-primary hover:underline">
                unseren Angeboten
              </Link>{" "}
              die passenden Formate für Führungskreise und Fachabteilungen.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Quellen und Transparenz
          </h2>

          <div className="mb-4 rounded-md border-l-4 border-muted-foreground/40 bg-muted/40 px-4 py-3">
            <p className="text-sm text-muted-foreground mb-0">
              <strong>Dieser Artikel ist keine Rechtsberatung.</strong> Er gibt den Stand vom
              31. Juli 2026 wieder und dient der fachlichen Orientierung von Entscheidern und Praktikern.
              Die Rechtslage kann sich ändern, und ob eine konkrete Veröffentlichung unter Artikel 50
              fällt, ist eine Einzelfallfrage. Für verbindliche Auskünfte wenden Sie sich bitte an eine
              Rechtsanwältin oder einen Rechtsanwalt mit Schwerpunkt IT- und Datenschutzrecht.
            </p>
          </div>

          <ul className="text-base leading-relaxed space-y-2 list-disc pl-5 text-muted-foreground">
            <li>
              Verordnung (EU) 2024/1689 (KI-Verordnung), Artikel 50 sowie Artikel 3 Nr. 60 und Artikel 99
            </li>
            <li>
              Europäische Kommission,{" "}
              <a
                href="https://digital-strategy.ec.europa.eu/en/news/commission-publishes-code-practice-marking-and-labelling-ai-generated-content"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Code of Practice on Marking and Labelling AI-Generated Content
              </a>, finale Fassung vom 10. Juni 2026
            </li>
            <li>
              Europäische Kommission,{" "}
              <a
                href="https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Digital Omnibus on AI Regulation Proposal
              </a>{" "}
              (Vorschlag vom 19. November 2025); Zustimmung des Europäischen Parlaments am 16. Juni 2026,
              finale Billigung durch den Rat am 29. Juni 2026
            </li>
            <li>
              Microsoft Learn:{" "}
              <a
                href="https://learn.microsoft.com/de-de/microsoft-365/copilot/watermarks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Wasserzeichen für KI-generierte Inhalte in Microsoft 365
              </a>{" "}
              sowie Content Credentials in Azure OpenAI
            </li>
            <li>
              Deutscher Bundestag: Gesetz zur Marktüberwachung und Innovationsförderung im Bereich
              Künstlicher Intelligenz, beschlossen am 11. Juni 2026; Bundesnetzagentur als zentrale
              Aufsichtsbehörde
            </li>
            <li>
              Die Darstellung des Entscheidungsbaums orientiert sich an einer Übersichtsgrafik von
              Stefan von Gagern (LinkedIn, Stand 29. Juli 2026). Die Inhalte wurden gegen den
              Verordnungstext geprüft und um die Anbieterpflicht nach Absatz 2 sowie um Chatbots und
              Emotionserkennung ergänzt.
            </li>
          </ul>
        </section>

        <HoneypotCTA guideId="copilot-grounding-management-leitfaden" />

        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default KiKennzeichnungspflicht;
