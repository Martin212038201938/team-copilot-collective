import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-chat-free-pernod-ricard";
const PAGE_TITLE = "Copilot Chat im Büroalltag: Was bei Pernod Ricard passiert, wenn man einfach anfängt";

const CopilotChatPernodRicard = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "einstieg", title: "Was Copilot Chat eigentlich ist – und was nicht", level: 2 },
    { id: "aussendienst", title: "Außendienst: Zwischen Parkplatz und Kundentermin", level: 2 },
    { id: "consumer-anfragen", title: "Consumer-Anfragen: Wenn jemand wissen will, ob Havana Club vegan ist", level: 2 },
    { id: "geschaeftsfuehrung", title: "Geschäftsführung: Die Präsentation, die um 14 Uhr fertig sein muss", level: 2 },
    { id: "unbequeme-wahrheit", title: "Die unbequeme Wahrheit über den Free Plan", level: 2 },
    { id: "fazit", title: "Was bleibt", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Unsere Mitarbeitenden nutzen schon ChatGPT privat – warum sollten wir trotzdem Copilot Chat einführen?",
      answer: "Weil private ChatGPT-Nutzung ein Datenschutzrisiko ist, das die wenigsten Unternehmen im Griff haben. Copilot Chat läuft innerhalb des Microsoft-365-Tenants, Daten bleiben im Unternehmen, und die Nutzung unterliegt den bestehenden Compliance-Richtlinien. Die Copilotenschule hilft bei der internen Kommunikation, damit Mitarbeitende verstehen, warum Copilot Chat die sicherere und bessere Alternative ist."
    },
    {
      name: "Wir haben Copilot Chat freigeschaltet, aber kaum jemand nutzt es – was läuft falsch?",
      answer: "In neun von zehn Fällen fehlt es nicht an Interesse, sondern an konkreten Anwendungsbeispielen. Mitarbeitende wissen nicht, was sie Copilot Chat fragen sollen, und geben nach zwei generischen Tests auf. Was funktioniert: abteilungsspezifische Use-Case-Workshops, in denen Teams an ihren echten Aufgaben arbeiten. Die Copilotenschule bietet genau solche Formate – mit Beispielen aus Vertrieb, Marketing, HR und Assistenz."
    },
    {
      name: "Lohnt sich ein Upgrade auf die kostenpflichtige Copilot-Lizenz, wenn der Free Plan schon viel abdeckt?",
      answer: "Der Free Plan deckt erstaunlich viel ab – Textentwürfe, Recherche, Ideenfindung, Zusammenfassungen. Aber er greift nicht auf Ihre Unternehmensdaten zu. Sobald Sie wollen, dass Copilot Ihre E-Mails zusammenfasst, Meetings transkribiert oder in Ihren SharePoint-Dokumenten sucht, brauchen Sie die Vollversion. Die Copilotenschule unterstützt bei der Bewertung, welche Teams den größten Nutzen aus dem Upgrade ziehen."
    },
    {
      name: "Wie überzeugen wir das Management, dass auch der kostenlose Copilot Chat einen messbaren Nutzen hat?",
      answer: "Am besten über ein Pilotprojekt mit klarem Rahmen: Eine Abteilung – etwa der Außendienst oder das Consumer-Care-Team – nutzt Copilot Chat vier Wochen lang strukturiert und dokumentiert die Ergebnisse. Keine abstrakten ROI-Berechnungen, sondern konkrete Beispiele: eingesparte Zeit pro Anfrage, Qualität der Erst-Entwürfe, Zufriedenheit der Mitarbeitenden. Die Copilotenschule begleitet solche Piloten mit Trainings und Auswertungs-Frameworks."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Wie Pernod Ricard vom kostenlosen Copilot Chat in Microsoft 365 profitieren kann: Praxisbeispiele aus Außendienst, Consumer Care und Geschäftsführung.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-27",
        "dateModified": "2026-02-27",
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
        title="Copilot Chat Free bei Pernod Ricard: Use Cases aus dem Büroalltag | copilotenschule.de"
        description="Wie Pernod Ricard vom kostenlosen Copilot Chat in Microsoft 365 profitieren kann: Praxisbeispiele aus Außendienst, Consumer Care und Geschäftsführung."
        keywords={[
          "Copilot Chat Free Plan",
          "Pernod Ricard Copilot",
          "Microsoft 365 Copilot Chat kostenlos",
          "Copilot Außendienst",
          "Copilot Consumer Care",
          "Copilot Spirituosenindustrie",
          "Copilot FMCG",
          "Microsoft Copilot Praxisbeispiele",
          "Copilot Chat Unternehmen",
          "KI im Büroalltag"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-27T09:00:00+01:00"
        modifiedTime="2026-02-27T09:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Chat bei Pernod Ricard", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Wie Pernod Ricard vom kostenlosen Copilot Chat in Microsoft 365 profitieren kann: Praxisbeispiele aus Außendienst, Consumer Care und Geschäftsführung."
        lastUpdated="27. Februar 2026"
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
              Der Copilot Chat ist seit Anfang 2025 kostenlos in jeder Microsoft-365-Enterprise-Lizenz enthalten – auch ohne die
              kostenpflichtige Copilot-Erweiterung. Für ein Unternehmen wie Pernod Ricard Deutschland bedeutet das: Jeder
              Mitarbeitende mit M365-Zugang hat bereits heute Zugriff auf einen KI-Assistenten, der Texte entwirft,
              Informationen aufbereitet und Ideen strukturiert. Dieser Artikel beschreibt, was passiert, wenn man dieses
              Werkzeug in den Alltag von Außendienst, Consumer Care und Geschäftsführung bringt.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p className="text-lg leading-relaxed">
            Letzte Woche saß ich in einem Copilot-Training bei Pernod Ricard, und schon nach den ersten
            zwanzig Minuten wurde klar, was bei den meisten Unternehmen das eigentliche Problem ist: Nicht
            die Technologie, nicht die Lizenzkosten, nicht die Datenschutzbedenken. Sondern die schlichte
            Tatsache, dass die meisten Mitarbeitenden gar nicht wissen, dass sie bereits Zugang zu einem
            KI-Assistenten haben. Der Copilot Chat steckt seit Monaten in ihrer Microsoft-365-Umgebung,
            kostenlos, einsatzbereit – und wird nicht genutzt, weil niemand gezeigt hat, wofür er taugt.
          </p>
          <p className="leading-relaxed">
            Das ist kein Pernod-Ricard-spezifisches Phänomen. Ich erlebe das in praktisch jedem
            Unternehmen, das Microsoft 365 Enterprise nutzt. Aber Pernod Ricard ist ein besonders
            anschauliches Beispiel, weil die Organisation so unterschiedliche Rollen unter einem Dach
            vereint: Außendienstmitarbeitende, die jeden Tag beim Kunden stehen. Ein Consumer-Care-Team,
            das E-Mails und Anrufe beantwortet. Eine Geschäftsführung, die zwischen Strategie-Decks und
            Quartalsberichten jongliert. Für jede dieser Gruppen liefert der kostenlose Copilot Chat
            einen anderen Hebel – und keiner davon erfordert eine zusätzliche Lizenz.
          </p>
        </div>

        {/* Bild vom Training */}
        <figure className="mb-8">
          <img
            src="/images/pernod-ricard-copilot-training.jpg"
            alt="Copilot-Training bei Pernod Ricard: Gruppenfoto der Teilnehmenden vor der Präsentation 'Applying AI Effectively in Business'"
            className="w-full rounded-lg shadow-md"
            width={1188}
            height={800}
            loading="eager"
          />
          <figcaption className="text-sm text-muted-foreground mt-2 text-center">
            Copilot-Training bei Pernod Ricard Deutschland – Einstieg in KI-unterstütztes Arbeiten mit dem kostenlosen Copilot Chat.
          </figcaption>
        </figure>

        {/* Was Copilot Chat ist */}
        <section id="einstieg" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Was Copilot Chat eigentlich ist – und was nicht
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Bevor wir in die konkreten Szenarien einsteigen, lohnt sich eine kurze Einordnung, weil
              Microsoft bei der Namensgebung seiner Copilot-Produkte nicht gerade für Klarheit gesorgt hat.
              Der Copilot Chat – früher als „Microsoft 365 Chat" oder einfach „Copilot" bezeichnet – ist
              die webbasierte Chat-Oberfläche, die in jedem M365-Enterprise-Plan enthalten ist. Man
              erreicht sie über copilot.microsoft.com oder über die Copilot-App in Teams. Sie basiert auf
              demselben GPT-4-Modell, das auch hinter der kostenpflichtigen Vollversion arbeitet.
            </p>
            <p>
              Der Unterschied zur Bezahlversion: Der Free Plan greift nicht auf die Unternehmensdaten in
              SharePoint, OneDrive oder dem E-Mail-Postfach zu. Er kann keine Teams-Meetings zusammenfassen
              und keine Dokumente in Word oder PowerPoint erzeugen. Was er kann: frei formulierte Fragen
              beantworten, Texte entwerfen, umformulieren, zusammenfassen, strukturieren und als
              Sparringspartner für Ideen dienen. Klingt nach wenig – ist im Alltag erstaunlich viel.
            </p>
          </div>
        </section>

        {/* Außendienst */}
        <section id="aussendienst" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Außendienst: Zwischen Parkplatz und Kundentermin
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Außendienst bei einem Spirituosenhersteller wie Pernod Ricard ist eine Welt für sich.
              Die Mitarbeitenden besuchen Gastronomen, Fachhändler und Großhandelskunden, sie verhandeln
              Listungen, planen Promotions und kümmern sich um Platzierungen am Point of Sale. Zwischen
              zwei Terminen bleibt oft wenig Zeit, und die administrativen Aufgaben – Besuchsberichte,
              Angebotsschreiben, Rückmeldungen an den Innendienst – stapeln sich bis zum Feierabend.
            </p>
            <p>
              Hier liegt der erste naheliegende Anwendungsfall für den Copilot Chat: Besuchsberichte, die
              normalerweise fünfzehn Minuten dauern, lassen sich in drei Minuten erledigen. Der
              Außendienstler tippt seine Stichpunkte in den Chat – „Termin bei METRO Düsseldorf,
              Jahreslisting Absolut Vodka besprochen, Zweitplatzierung im Aktionszeitraum März vereinbart,
              Ansprechpartnerin war Frau Schreiber, Nachfass-Termin in zwei Wochen" – und lässt Copilot
              daraus einen strukturierten Bericht formulieren. Das Ergebnis ist kein literarisches
              Meisterwerk, aber ein sauberer, vollständiger Bericht, der im CRM archiviert werden kann.
            </p>
            <p>
              Der zweite Anwendungsfall, der im Training bei Pernod Ricard sofort gezündet hat:
              Argumentationshilfen vor dem Kundentermin. Wer einen Gastronomen davon überzeugen will,
              Monkey 47 statt eines günstigeren Gins ins Regal zu stellen, braucht Argumente jenseits
              des eigenen Bauchgefühls. Ein Prompt wie „Formuliere drei Argumente, warum ein gehobenes
              Restaurant Monkey 47 Gin im Sortiment haben sollte – Fokus auf Marge, Gastempfehlung und
              Markenimage" liefert in Sekunden einen Ausgangspunkt, den der Außendienstler auf seinen
              Gesprächspartner zuschneiden kann. Niemand wird behaupten, dass Copilot den erfahrenen
              Vertriebler ersetzt. Aber er verkürzt die Vorbereitungszeit für ein gutes Argument von
              zehn Minuten auf dreißig Sekunden.
            </p>
            <p>
              Ein drittes Szenario, das im Alltag häufiger vorkommt, als man denkt: Die schnelle
              E-Mail auf dem Parkplatz. Der Außendienstler kommt aus dem Termin, muss dem Innendienst
              eine Preisanfrage weiterleiten oder dem Kunden eine Bestätigung schicken. Auf dem
              Smartphone, zwischen zwei Terminen, ist jeder gesparte Satz Gold wert. Copilot Chat
              formuliert aus drei Stichworten eine professionelle Nachricht. Kein Tippfehler, kein
              vergessenes „Mit freundlichen Grüßen", kein Ringen um die richtige Formulierung in einer
              Sprache, die vielleicht nicht die Muttersprache ist.
            </p>
          </div>
        </section>

        {/* Consumer-Anfragen */}
        <section id="consumer-anfragen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Consumer-Anfragen: Wenn jemand wissen will, ob Havana Club vegan ist
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jedes Unternehmen mit bekannten Marken bekommt Verbraucheranfragen. Bei Pernod Ricard
              kommen die per E-Mail und Telefon rein – klassisch, ohne Ticketsystem, und in einer
              Bandbreite, die von berechtigt bis skurril reicht. Ist Absolut Vodka glutenfrei? Kann
              ich Ricard auch warm trinken? Wo finde ich den nächsten Händler, der Lillet führt? Und
              gelegentlich: Sponsoringanfragen, Kooperationsvorschläge, Beschwerden über defekte
              Verschlüsse.
            </p>
            <p>
              Das Consumer-Care-Team, oft eine Handvoll Personen, beantwortet diese Anfragen individuell
              und gewissenhaft. Das Problem ist nicht die einzelne Antwort – die dauert vielleicht
              fünf Minuten. Das Problem ist die Summe: Dreißig Anfragen am Tag, davon achtzig Prozent
              mit Standardcharakter, die trotzdem individuell formuliert werden müssen, weil niemand
              Lust hat, auf eine persönlich formulierte Frage eine roboterhafte Textbaustein-Antwort
              zu bekommen.
            </p>
            <p>
              Genau hier entfaltet der Copilot Chat seinen Wert, ohne dass irgendjemand eine Lizenz
              kaufen oder ein System umbauen muss. Der Mitarbeiter fügt die Verbraucheranfrage in den
              Chat ein und promptet: „Formuliere eine freundliche, persönliche Antwort auf diese
              Anfrage. Ton: professionell, aber warm. Weise darauf hin, dass Absolut Vodka aus Winterweizen
              destilliert wird und glutenfrei ist." In dreißig Sekunden steht ein Entwurf, der nur noch
              gegengelesen und abgeschickt werden muss. Die Zeitersparnis pro Anfrage liegt bei drei bis
              fünf Minuten – bei dreißig Anfragen am Tag summiert sich das auf ein bis zwei Stunden.
            </p>
            <p>
              Noch interessanter wird es bei den nicht-standardisierten Anfragen: Sponsoringanfragen etwa,
              die eine höfliche Absage erfordern, ohne den Absender zu verprellen. Oder die Beschwerde
              eines Verbrauchers, der einen defekten Verschluss reklamiert und dabei emotional wird. Wer
              schon einmal versucht hat, auf eine wütende E-Mail empathisch, sachlich und
              markenkonform zu antworten, weiß, wie viel Energie das kostet. Copilot Chat kann einen
              ersten Entwurf liefern, der den richtigen Ton trifft – deeskalierend, verständnisvoll,
              lösungsorientiert. Der Mitarbeiter ergänzt die fachlichen Details und schickt ab. Die
              Qualität der Antwort steigt, die emotionale Belastung sinkt.
            </p>
          </div>
        </section>

        {/* Geschäftsführung */}
        <section id="geschaeftsfuehrung" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Geschäftsführung: Die Präsentation, die um 14 Uhr fertig sein muss
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Geschäftsführung eines Unternehmens wie Pernod Ricard Deutschland bewegt sich in einem
              permanenten Spannungsfeld zwischen operativen Entscheidungen und strategischer Kommunikation.
              Ein typischer Tag: morgens die Absatzzahlen besprechen, mittags eine Präsentation für die
              Zentrale in Paris fertigstellen, nachmittags ein Strategiegespräch mit dem
              Key-Account-Management. Der Copilot Chat kann in jeder dieser Situationen als
              Sparringspartner und Textassistent fungieren – und das ohne jegliche Einrichtung, direkt
              im Browser.
            </p>
            <p>
              Das erste Szenario, das mir bei Pernod Ricard aufgefallen ist: die interne
              Kommunikation in einem internationalen Konzern. Die Geschäftsführung muss regelmäßig
              auf Englisch oder Französisch kommunizieren – Berichte an die Zentrale, Updates für die
              Region, Kommentare zu globalen Initiativen. Selbst wer beide Sprachen gut beherrscht,
              verbringt Zeit mit der Feinarbeit: Stimmt die Tonalität? Ist der Management-Jargon
              korrekt? Klingt das Ganze professionell genug für den CEO in Paris? Copilot Chat
              übersetzt nicht einfach – er formuliert in der Zielsprache, mit dem passenden Register.
              Ein Prompt wie „Formuliere diesen Quartalskommentar auf Französisch, formeller Ton,
              für ein Executive-Audience" liefert in Sekunden einen Entwurf, der vielleicht nicht
              perfekt ist, aber als Arbeitsgrundlage in einer Liga spielt, für die man sonst einen
              Native Speaker braucht.
            </p>
            <p>
              Das zweite Szenario betrifft die Vorbereitung von Entscheidungsgrundlagen. Wenn
              die Geschäftsführung über eine neue Distributionsstrategie oder eine veränderte
              Preisstrategie nachdenkt, braucht sie oft zunächst eine strukturierte Argumentation –
              Pro und Contra, Risiken, Vergleichswerte. Copilot Chat kann eine solche Argumentation
              in wenigen Minuten aufsetzen: „Erstelle mir eine Pro-Contra-Analyse für die Einführung
              eines neuen Ready-to-Drink-Produkts im deutschen Markt. Berücksichtige
              Distributionskanäle, Wettbewerb, regulatorische Rahmenbedingungen und
              Kannibalisierungseffekte auf das bestehende Portfolio." Das Ergebnis ersetzt keine
              fundierte Marktanalyse, aber es schafft eine Struktur, auf der die Diskussion aufbauen
              kann. Und es spart die halbe Stunde, die man sonst braucht, um eine leere PowerPoint-Folie
              mit dem Titel „Entscheidungsvorlage" anzustarren.
            </p>
            <p>
              Und dann gibt es noch den Anwendungsfall, den kaum jemand als solchen erkennt: die
              spontane Rechercheaufgabe. Die Geschäftsführerin wird in einem Meeting gefragt, wie
              sich der On-Trade-Markt für Premium-Gin in Deutschland entwickelt hat. Statt nach dem
              Meeting zwanzig Minuten in Branchenberichten zu suchen, öffnet sie den Copilot Chat
              und bekommt eine kompakte Zusammenfassung – nicht mit internen Zahlen, aber mit einer
              Markteinschätzung, die als Gesprächsgrundlage völlig ausreicht. Man darf den Free Plan
              nicht mit einer Datenbank verwechseln. Aber als schnellen, gut informierten
              Gesprächspartner kann man ihn durchaus ernst nehmen.
            </p>
          </div>
        </section>

        {/* Unbequeme Wahrheit */}
        <section id="unbequeme-wahrheit" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Die unbequeme Wahrheit über den Free Plan
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wer jetzt denkt, dass der kostenlose Copilot Chat alle Probleme löst, liegt falsch – und
              es wäre unseriös, das zu verschweigen. Der Free Plan hat klare Grenzen, und diese Grenzen
              werden im Alltag spürbar.
            </p>
            <p>
              Die wichtigste: Copilot Chat im Free Plan weiß nichts über Ihr Unternehmen. Er kennt
              keine internen Richtlinien, keine Produktdatenblätter, keine Brand Guidelines. Wenn das
              Consumer-Care-Team eine Anfrage zu den Inhaltsstoffen von Malibu beantwortet, muss es die
              fachliche Korrektheit selbst sicherstellen. Copilot kann den Rahmen formulieren, aber
              den Inhalt verifiziert der Mensch. Das ist kein Fehler des Tools – es ist eine
              Designentscheidung. Wer will, dass Copilot die internen Daten kennt, braucht die
              kostenpflichtige Lizenz mit Grounding auf Unternehmensdaten.
            </p>
            <p>
              Die zweite Einschränkung betrifft die Qualität der Ergebnisse. Copilot Chat ist kein
              allwissender Berater. Er halluziniert gelegentlich, erfindet plausibel klingende Fakten
              und formuliert manchmal Aussagen, die fachlich nicht halten. Für die Geschäftsführung,
              die eine Markteinschätzung als Diskussionsgrundlage will, ist das akzeptabel – solange
              klar ist, dass die Zahlen geprüft werden müssen. Für das Consumer-Care-Team, das einem
              Verbraucher Inhaltsstoffe kommuniziert, ist es das nicht. Die Faustregel ist simpel:
              Copilot Chat als Formulierungshilfe – ja, immer. Als Faktenquelle – nur mit Gegencheck.
            </p>
            <p>
              Und dann ist da noch die Frage der Gewöhnung. In meinen Trainings bei Pernod Ricard
              habe ich beobachtet, was ich in jedem Unternehmen beobachte: Etwa ein Drittel der
              Teilnehmenden ist sofort begeistert und integriert Copilot Chat in den ersten Tagen
              in ihren Workflow. Ein weiteres Drittel ist interessiert, braucht aber Übung und
              regelmäßige Erinnerung. Und das letzte Drittel bleibt skeptisch, probiert es einmal,
              und vergisst es wieder. Ohne begleitendes Enablement – Tipps in Team-Meetings,
              Use-Case-Sammlungen für die eigene Abteilung, ein Ansprechpartner für Fragen – versandet
              die Nutzung innerhalb weniger Wochen. Das ist kein Technologieproblem, das ist ein
              Veränderungsproblem.
            </p>
          </div>
        </section>

        {/* Fazit */}
        <section id="fazit" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Was bleibt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Copilot Chat im Free Plan ist kein Transformationsprojekt. Er erfordert kein Budget,
              keinen IT-Aufwand, keine Projektgruppe. Er ist schon da. Und genau das macht ihn für ein
              Unternehmen wie Pernod Ricard so interessant: Der Einstieg in die KI-gestützte Arbeit muss
              nicht mit einer sechsstelligen Lizenzbeschaffung beginnen. Er kann mit einem
              Mitarbeitenden beginnen, der zum ersten Mal einen Besuchsbericht in den Chat tippt und
              feststellt, dass die Nachbereitung plötzlich drei Minuten statt fünfzehn dauert.
            </p>
            <p>
              Was ich bei Pernod Ricard gesehen habe, bestätigt eine Beobachtung, die ich bei vielen
              Kunden mache: Der größte Hebel liegt nicht in der Technologie, sondern in der Befähigung
              der Menschen, die sie nutzen sollen. Wer seinen Mitarbeitenden zeigt, was der kostenlose
              Copilot Chat kann – an ihren echten Aufgaben, nicht an abstrakten Demos – wird überrascht
              sein, wie schnell sich Routinen verändern. Und wer dann merkt, dass der Bedarf über den
              Free Plan hinauswächst, hat eine deutlich bessere Entscheidungsgrundlage für die
              Investition in die Vollversion.
            </p>
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

export default CopilotChatPernodRicard;
