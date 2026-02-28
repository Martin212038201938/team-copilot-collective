import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-agent-digitales-gedaechtnis";
const PAGE_TITLE = "Copilot Agent für Ihr digitales Gedächtnis: Meeting-Protokolle automatisch erstellen und durchsuchbar machen";

const CopilotAgentDigitalesGedaechtnis = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "warum-ein-agent", title: "Warum ein eigener Agent?", level: 2 },
    { id: "voraussetzungen", title: "Was Sie brauchen", level: 2 },
    { id: "format-definieren", title: "Schritt 1: Ihr Protokoll-Format definieren", level: 2 },
    { id: "agent-erstellen", title: "Schritt 2: Den Agenten in Copilot erstellen", level: 2 },
    { id: "agent-testen", title: "Schritt 3: Den Agenten testen", level: 2 },
    { id: "protokolle-speichern", title: "Schritt 4: Protokolle ablegen", level: 2 },
    { id: "gedaechtnis-durchsuchen", title: "Schritt 5: Ihr digitales Gedächtnis nutzen", level: 2 },
    { id: "grenzen", title: "Was nicht funktioniert", level: 2 },
    { id: "fazit", title: "Fazit", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir haben 200 Meetings pro Woche im Unternehmen – wie skaliert das?",
      answer: "Der Agent funktioniert pro Nutzer, nicht zentral. Jeder Mitarbeitende kann sich seinen eigenen Protokoll-Agenten bauen – mit dem Format, das für die eigene Abteilung sinnvoll ist. Das Vertriebsteam braucht andere Felder als die Rechtsabteilung. In unseren Copilot-Trainings bei der Copilotenschule zeigen wir, wie Teams ihre eigenen Vorlagen entwickeln und Agenten-Erstellung als Standardkompetenz aufbauen."
    },
    {
      name: "Unsere Mitarbeitenden nutzen die Meeting-Transkription nicht – wie ändern wir das?",
      answer: "Das ist eines der häufigsten Probleme, das wir in Trainings sehen. Meist liegt es daran, dass Mitarbeitende den Mehrwert nicht kennen oder unsicher sind, ob sie aufzeichnen dürfen. Die Lösung: Klare Kommunikation durch die Führungskraft, dass Transkription erwünscht ist, kombiniert mit einem praktischen Workshop, in dem jeder seinen eigenen Protokoll-Agenten baut. Wenn Menschen den Nutzen am eigenen Beispiel erleben, fällt die Hemmschwelle. Die Copilotenschule bietet genau solche Enablement-Formate an."
    },
    {
      name: "Wie stelle ich sicher, dass vertrauliche Meeting-Inhalte nicht an unbefugte Personen gelangen?",
      answer: "Microsoft Copilot respektiert die bestehenden Berechtigungen in Microsoft 365. Ein Copilot-Agent kann nur auf Daten zugreifen, auf die der jeweilige Nutzer selbst Zugriff hat. Wenn Sie Protokolle in SharePoint ablegen, greifen die SharePoint-Berechtigungen. Sensible Meetings können in separaten Ordnern mit eingeschränktem Zugriff gespeichert werden. In unseren Compliance-Workshops bei der Copilotenschule klären wir diese Fragen im Detail und entwickeln gemeinsam ein Berechtigungskonzept."
    },
    {
      name: "Lohnt sich der Aufwand, wenn wir bereits ein Projektmanagement-Tool wie Jira oder Asana nutzen?",
      answer: "Absolut – denn die Werkzeuge lösen unterschiedliche Probleme. Jira und Asana verwalten Tasks, aber sie erfassen nicht den Kontext, in dem Entscheidungen getroffen wurden. Der Copilot-Agent erstellt ein durchsuchbares Gedächtnis: Wer hat was gesagt, warum wurde so entschieden, welche Alternativen wurden verworfen. Das ist die Ebene, die in Projektmanagement-Tools fehlt. In den Copilot-Trainings der Copilotenschule zeigen wir, wie beide Welten zusammenspielen."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Schritt-für-Schritt-Anleitung: Eigenen Copilot-Agenten bauen, der Meeting-Transkripte automatisch in Ihr Wunschformat bringt und als durchsuchbares digitales Gedächtnis ablegt.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-28",
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
        title="Copilot Agent für Meeting-Protokolle: Digitales Gedächtnis bauen | copilotenschule.de"
        description="Schritt-für-Schritt-Anleitung: Eigenen Copilot-Agenten bauen, der Meeting-Transkripte automatisch in Ihr Wunschformat bringt und als durchsuchbares digitales Gedächtnis ablegt."
        keywords={[
          "Copilot Agent erstellen",
          "Meeting-Protokoll automatisch",
          "Microsoft 365 Copilot Agent",
          "Copilot digitales Gedächtnis",
          "Meeting-Transkript formatieren",
          "Copilot erstellen Anleitung",
          "Meeting-Zusammenfassung automatisieren",
          "Copilot Teams Protokoll",
          "KI Meeting-Protokoll",
          "Copilot Agent Tutorial"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-28T09:00:00+01:00"
        modifiedTime="2026-02-28T09:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Agent: Digitales Gedächtnis", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Schritt-für-Schritt: So bauen Sie sich einen Copilot-Agenten, der Ihre Meeting-Transkripte automatisch protokolliert und durchsuchbar macht – ohne technische Vorkenntnisse."
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
              Mit der „Copilot erstellen"-Funktion in Microsoft 365 Copilot können Sie sich in wenigen Minuten
              einen eigenen Agenten bauen, der Ihre Meeting-Transkripte aus Teams automatisch in ein von Ihnen
              definiertes Protokollformat bringt. Diese Protokolle legen Sie in SharePoint oder OneNote ab –
              und können sie danach jederzeit über den normalen Copilot Chat durchsuchen. Keine
              Programmierkenntnisse nötig, keine zusätzliche Lizenz, kein IT-Projekt. Dieser Artikel zeigt
              Ihnen Schritt für Schritt, wie das geht.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p className="text-lg leading-relaxed">
            Als Geschäftsführer der Copilotenschule spreche ich jeden Tag mit Menschen. Kunden, die wissen
            wollen, wie sie Copilot in ihrem Unternehmen einführen. Trainer, die ihre Workshop-Konzepte
            abstimmen wollen. Partner, mit denen ich über gemeinsame Projekte verhandle. Bewerber, die sich
            vorstellen. Journalisten, die nach einer Einschätzung fragen. An einem normalen Tag habe ich
            sechs bis acht Gespräche – manchmal mehr. Und jedes Gespräch produziert Informationen, die
            irgendwann wieder relevant werden: eine Zusage, ein Preis, eine Deadline, ein Name, eine Idee.
          </p>
          <p className="leading-relaxed">
            Früher hatte ich dafür Notizblöcke. Kleine Moleskine-Hefte, die ich zu jedem Meeting mitnahm
            und in denen ich wild kritzelte – halbe Sätze, Pfeile, unterstrichene Wörter, die drei Tage
            später keinen Sinn mehr ergaben. Das eigentliche Problem war nicht das Aufschreiben. Das Problem
            war das Wiederfinden. In dem Moment, in dem ich eine Information brauchte – „Was hatte der Kunde
            aus München zu den Preisen gesagt?" – war das richtige Notizbuch zu Hause, oder ich wusste
            nicht mehr, auf welcher Seite ich es notiert hatte. Mein Gehirn ist gut in vielen Dingen, aber
            es ist nicht gut darin, hunderte Gesprächsdetails über Wochen hinweg korrekt zuzuordnen.
          </p>
          <p className="leading-relaxed">
            Heute habe ich ein System, das dieses Problem für mich löst. Ich habe mir in Microsoft 365
            Copilot einen eigenen Agenten gebaut – einen digitalen Assistenten, der meine Meeting-Transkripte
            aus Teams nimmt, sie in ein Format bringt, das ich definiert habe, und sie so ablegt, dass ich
            sie später durchsuchen kann. Wenn ich jetzt wissen will, was der Kunde aus München gesagt hat,
            frage ich einfach meinen Copilot. Er findet es. In Sekunden. Und in diesem Artikel zeige ich
            Ihnen, wie Sie sich genau dieses System selbst bauen – Schritt für Schritt, ohne technische
            Vorkenntnisse.
          </p>
        </div>

        {/* Warum ein Agent */}
        <section id="warum-ein-agent" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Warum ein eigener Agent?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Microsoft Copilot kann Meeting-Zusammenfassungen schon von Haus aus erstellen – das ist
              keine Neuigkeit. Am Ende eines Teams-Meetings liefert Copilot automatisch eine Zusammenfassung
              mit Kernpunkten und Action Items. Warum also einen eigenen Agenten bauen?
            </p>
            <p>
              Weil die Standard-Zusammenfassung ein Standardformat hat. Und Ihr Arbeitsalltag kein
              Standardalltag ist. Vielleicht brauchen Sie für Kundengespräche ein Protokoll mit den Feldern
              „Vereinbarte nächste Schritte", „Offene Fragen" und „Budget-Aussagen". Für interne
              Projektmeetings wollen Sie vielleicht „Entscheidungen", „Risiken" und „Verantwortlichkeiten".
              Für Bewerbungsgespräche ein ganz anderes Schema. Die Standard-Zusammenfassung kennt Ihre
              Bedürfnisse nicht. Ein eigener Agent schon – weil Sie ihm genau sagen, wonach er suchen und
              wie er strukturieren soll.
            </p>
            <p>
              Der zweite Grund: Ablage. Die Standard-Zusammenfassung lebt im Meeting-Chat und verschwindet
              im Rauschen des Alltags. Ein Agent kann das Protokoll so aufbereiten, dass Sie es gezielt
              an einem Ort speichern, den Copilot später durchsucht. Nicht als verlorene Nachricht in einem
              von hundert Chats – sondern als strukturiertes Dokument in Ihrem digitalen Gedächtnis.
            </p>
            <p>
              Falls Sie den grundlegenden Ansatz, Copilot als digitales Gedächtnis zu nutzen, noch nicht
              kennen, empfehle ich Ihnen meinen Artikel <a href="/wissen/copilot-digitales-gedaechtnis" className="text-primary hover:underline">Digitales Gedächtnis mit Microsoft Copilot</a>.
              Dort beschreibe ich das Gesamtkonzept. In diesem Artikel hier geht es um die praktische
              Umsetzung: Ihren eigenen Agenten bauen.
            </p>
          </div>
        </section>

        {/* Voraussetzungen */}
        <section id="voraussetzungen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Was Sie brauchen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Bevor wir loslegen, ein kurzer Check. Für dieses Tutorial brauchen Sie genau drei Dinge:
            </p>
          </div>
          <Card className="my-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold">Microsoft 365 Copilot (bezahlte Version)</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Die Vollversion von Microsoft 365 Copilot – also die kostenpflichtige Erweiterung
                      zu Ihrer M365-Lizenz (E3, E5 oder Business Premium). Der kostenlose Copilot Chat
                      reicht nicht aus, da er keinen Zugriff auf Ihre Unternehmensdaten hat und keine
                      Agenten erstellen kann.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Microsoft Teams mit aktivierter Transkription</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Die Meeting-Transkription muss in Ihrem Tenant aktiviert sein. Das ist eine
                      Admin-Einstellung – fragen Sie im Zweifel Ihre IT-Abteilung. Ohne Transkription
                      gibt es kein Transkript, und ohne Transkript hat der Agent nichts, womit er arbeiten kann.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold">Einen Speicherort: SharePoint, OneDrive oder OneNote</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Einen Ort, an dem Sie Ihre fertigen Protokolle ablegen. SharePoint eignet sich am besten,
                      weil Copilot dort nativ suchen kann. OneNote ist eine gute Alternative, besonders wenn
                      Sie dort ohnehin Ihre Notizen führen. Mehr dazu in Schritt 4.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wenn diese drei Voraussetzungen erfüllt sind, können Sie in den nächsten fünfzehn Minuten
              Ihren eigenen Protokoll-Agenten bauen. Kein IT-Ticket, kein Projektantrag, keine
              Programmierkenntnisse.
            </p>
          </div>
        </section>

        {/* Schritt 1: Format definieren */}
        <section id="format-definieren" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Schritt 1: Ihr Protokoll-Format definieren
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Bevor Sie den Agenten bauen, überlegen Sie sich, wie Ihr ideales Meeting-Protokoll aussehen
              soll. Das ist der wichtigste Schritt – denn die Qualität des Agenten steht und fällt mit der
              Klarheit Ihrer Vorlage. Denken Sie an die Meetings, die Sie am häufigsten haben, und fragen
              Sie sich: Welche Informationen brauche ich hinterher wirklich?
            </p>
            <p>
              Ich zeige Ihnen mein Format als Ausgangspunkt. Sie können es exakt so übernehmen oder an
              Ihre Bedürfnisse anpassen – das ist ja der Witz an einem eigenen Agenten.
            </p>
          </div>

          <Card className="my-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
            <CardHeader>
              <CardTitle>Beispiel-Vorlage: Mein Protokollformat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm space-y-3 bg-white dark:bg-slate-900 p-4 rounded-lg border">
                <p className="font-bold">MEETING-PROTOKOLL</p>
                <p>Datum: [Datum des Meetings]</p>
                <p>Teilnehmer: [Namen aller Teilnehmer]</p>
                <p>Dauer: [Dauer des Meetings]</p>
                <p>Thema/Anlass: [Worum ging es?]</p>
                <p className="mt-4 font-bold">ZUSAMMENFASSUNG (3-5 Sätze)</p>
                <p>[Worum ging es im Kern?]</p>
                <p className="mt-4 font-bold">ENTSCHEIDUNGEN</p>
                <p>- [Entscheidung 1: Was wurde beschlossen?]</p>
                <p>- [Entscheidung 2: ...]</p>
                <p className="mt-4 font-bold">ACTION ITEMS</p>
                <p>- [Aufgabe] → [Verantwortlich] → [Fällig bis]</p>
                <p>- [Aufgabe] → [Verantwortlich] → [Fällig bis]</p>
                <p className="mt-4 font-bold">OFFENE FRAGEN</p>
                <p>- [Frage, die nicht geklärt wurde]</p>
                <p className="mt-4 font-bold">WICHTIGE AUSSAGEN / ZITATE</p>
                <p>- [Person]: „[Relevante Aussage]"</p>
                <p className="mt-4 font-bold">NÄCHSTES MEETING</p>
                <p>[Datum/Zeitraum, falls vereinbart]</p>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Rubrik „Wichtige Aussagen / Zitate" ist mir besonders wichtig. Das ist der Teil, den die
              Standard-Zusammenfassung von Copilot nicht liefert – aber genau der, den ich Wochen später
              brauche, wenn ich wissen will, was jemand konkret gesagt hat. Nicht die Zusammenfassung, sondern
              der Wortlaut. Der Agent kann das, weil er auf das vollständige Transkript zugreift.
            </p>
            <p>
              Ihr Format kann völlig anders aussehen. Wenn Sie im Vertrieb arbeiten, wollen Sie vielleicht
              Felder wie „Budgetrahmen des Kunden", „Entscheidungskriterien" und „Wettbewerbssituation".
              Wenn Sie im HR arbeiten, brauchen Sie „Vereinbarte Konditionen", „Kandidaten-Eindruck" und
              „Nächste Schritte im Prozess". Machen Sie sich Ihr Format – es ist Ihr Agent, Ihre Regeln.
            </p>
          </div>
        </section>

        {/* Schritt 2: Agent erstellen */}
        <section id="agent-erstellen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Schritt 2: Den Agenten in Copilot erstellen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jetzt wird es konkret. Öffnen Sie Microsoft 365 Copilot – entweder über copilot.microsoft.com
              im Browser, über die Copilot-App in Teams oder über die Microsoft 365 App. Sie sehen den
              normalen Chat-Bereich, in dem Sie Copilot Fragen stellen können.
            </p>
          </div>

          <Card className="my-6 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg">Anleitung: Agent erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold">Rechts oben auf „Copilot erstellen" klicken</p>
                    <p className="text-sm text-muted-foreground">
                      In der Copilot-Oberfläche finden Sie rechts oben (oder im Menü) die Option „Erstellen"
                      bzw. „Create an agent". Klicken Sie darauf. Es öffnet sich ein Assistent, der Sie
                      durch die Einrichtung führt.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Dem Agenten einen Namen geben</p>
                    <p className="text-sm text-muted-foreground">
                      Wählen Sie einen Namen, den Sie sich merken können. Ich habe meinen „Protokoll-Assistent"
                      genannt. Sie können auch „Meeting-Protokoll", „Mein Protokollant" oder was immer Ihnen
                      einleuchtet, verwenden.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold">Die Anweisung formulieren – das Herzstück</p>
                    <p className="text-sm text-muted-foreground">
                      Im Feld „Anweisungen" (oder „Instructions") beschreiben Sie, was der Agent tun soll.
                      Hier geben Sie Ihr Protokollformat ein. Je genauer Sie formulieren, desto besser das
                      Ergebnis. Unten finden Sie meine exakte Anweisung als Vorlage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold">Speichern – fertig</p>
                    <p className="text-sm text-muted-foreground">
                      Klicken Sie auf „Erstellen" bzw. „Create". Der Agent ist sofort verfügbar und erscheint
                      in Ihrer Copilot-Oberfläche als eigener Chat-Kontakt, den Sie jederzeit ansprechen können.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardHeader>
              <CardTitle>Meine Agent-Anweisung (zum Kopieren)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm bg-white dark:bg-slate-900 p-4 rounded-lg border whitespace-pre-line">
{`Du bist mein persönlicher Meeting-Protokollant.

Wenn ich dir ein Meeting-Transkript gebe oder dich bitte, ein bestimmtes Meeting zusammenzufassen, erstelle ein strukturiertes Protokoll in exakt diesem Format:

MEETING-PROTOKOLL
Datum: [Extrahiere aus dem Transkript]
Teilnehmer: [Liste alle Sprecher auf]
Dauer: [Schätze aus Zeitstempeln, falls vorhanden]
Thema/Anlass: [Fasse den Hauptgegenstand in einem Satz zusammen]

ZUSAMMENFASSUNG
[3-5 Sätze, die den Kern des Meetings erfassen]

ENTSCHEIDUNGEN
[Liste alle explizit getroffenen Entscheidungen auf. Wenn keine Entscheidungen getroffen wurden, schreibe "Keine Entscheidungen getroffen."]

ACTION ITEMS
[Format: Aufgabe → Verantwortlich → Fällig bis]
[Wenn keine Deadlines genannt wurden, schreibe "Deadline: offen"]

OFFENE FRAGEN
[Fragen oder Themen, die nicht abschließend geklärt wurden]

WICHTIGE AUSSAGEN
[Zitiere 3-5 besonders relevante Aussagen wörtlich mit Angabe der Person]

NÄCHSTES MEETING
[Falls ein Folgetermin vereinbart wurde, hier angeben. Sonst: "Nicht vereinbart."]

Wichtige Regeln:
- Sei präzise und faktisch. Erfinde nichts hinzu.
- Wenn etwas im Transkript unklar ist, kennzeichne es mit [unklar].
- Halte das Protokoll sachlich und professionell.
- Bei Action Items: Versuche immer eine verantwortliche Person zuzuordnen.

Ablage:
- Schlage am Ende jedes Protokolls einen Dateinamen vor im Format: "YYYY-MM-DD – [Hauptthema oder Gesprächspartner].docx"
- Wenn ich dich bitte, das Protokoll zu speichern, erstelle ein Word-Dokument und lege es in meinem OneDrive im Ordner "Meeting-Protokolle" ab.`}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Diese Anweisung können Sie direkt in das Instruktionsfeld Ihres Agenten kopieren und an
                Ihre Bedürfnisse anpassen. Beachten Sie den Abschnitt „Ablage" am Ende – der ist
                entscheidend dafür, dass der Agent nicht nur Protokolle erstellt, sondern Ihnen auch einen
                sauberen Dateinamen vorschlägt und auf Ihren Wunsch hin das Dokument direkt in Ihrem
                OneDrive oder SharePoint ablegt (dazu mehr in Schritt 4).
              </p>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Ein wichtiger Hinweis: Sie können die Anweisung jederzeit ändern. Wenn Sie nach ein paar
              Wochen merken, dass Ihnen ein Feld fehlt oder eines überflüssig ist, passen Sie die
              Instruktion einfach an. Der Agent lernt nicht im klassischen Sinne – er folgt Ihren
              Anweisungen. Bessere Anweisungen bedeuten bessere Protokolle.
            </p>
          </div>
        </section>

        {/* Schritt 3: Agent testen */}
        <section id="agent-testen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Schritt 3: Den Agenten testen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Ihr Agent ist erstellt – jetzt wollen Sie sehen, ob er funktioniert. Dafür gibt es zwei Wege,
              und ich empfehle, beide auszuprobieren.
            </p>
          </div>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-lg">Variante A: Ein vergangenes Meeting verarbeiten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Öffnen Sie den Chat mit Ihrem neuen Agenten und schreiben Sie ihm eine Nachricht wie:
                </p>
              </div>
              <div className="font-mono text-sm bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-4">
                „Erstelle ein Protokoll von meinem Teams-Meeting '[Name des Meetings]' von [Datum]."
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Der Agent greift auf das Transkript des Meetings zu – vorausgesetzt, die Transkription
                  war aktiviert – und liefert Ihnen das Protokoll in Ihrem definierten Format. Das dauert
                  in der Regel zehn bis zwanzig Sekunden.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-lg">Variante B: Transkript manuell einfügen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Sie können dem Agenten auch direkt ein Transkript in den Chat kopieren. Das ist nützlich,
                  wenn Sie Meetings mit externen Tools aufgezeichnet haben oder ein besonders langes
                  Transkript manuell übergeben wollen. Kopieren Sie den Text einfach in die Nachricht
                  und schreiben Sie dazu:
                </p>
              </div>
              <div className="font-mono text-sm bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-4">
                „Hier ist das Transkript meines Meetings von heute. Bitte erstelle ein Protokoll."
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Schauen Sie sich das Ergebnis an. Stimmt das Format? Fehlt etwas? Sind die Action Items
              korrekt zugeordnet? Wenn nicht, passen Sie die Anweisung Ihres Agenten an – zum Beispiel
              mit dem Zusatz „Gruppiere Action Items immer nach verantwortlicher Person" oder „Markiere
              besonders dringliche Punkte mit [DRINGEND]". Zwei bis drei Testdurchläufe reichen
              erfahrungsgemäß, bis das Protokoll so aussieht, wie Sie es wollen.
            </p>
          </div>
        </section>

        {/* Schritt 4: Protokolle speichern */}
        <section id="protokolle-speichern" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Schritt 4: Protokolle ablegen – Ihr digitales Gedächtnis aufbauen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jetzt kommt der Schritt, der den eigentlichen Unterschied macht – und der in den meisten
              Anleitungen fehlt. Ein Protokoll, das im Chat-Verlauf verschwindet, ist kaum besser als ein
              Notizblock, den Sie zu Hause vergessen haben. Die entscheidende Frage ist: Wie kommt das
              Protokoll automatisch dorthin, wo Copilot es später wiederfindet? Ich zeige Ihnen drei Wege –
              vom einfachsten bis zum vollautomatischen.
            </p>
          </div>

          {/* Weg A: Copilot Pages */}
          <Card className="my-6 border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardHeader>
              <CardTitle className="text-lg">Weg A: Copilot Pages – Ein Klick, dauerhaft gespeichert (mein Favorit)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Das ist der Weg, den ich im Alltag am häufigsten nutze, weil er exakt null zusätzlichen
                  Aufwand bedeutet. Wenn der Agent Ihr Protokoll im Chat erstellt hat, sehen Sie unter der
                  Antwort den Button <strong>„In Seite bearbeiten"</strong> (auf Englisch: „Edit in Pages").
                  Klicken Sie darauf – fertig. Das Protokoll wird automatisch als sogenannte Copilot Page
                  gespeichert.
                </p>
              </div>
              <div className="my-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                  <p className="text-sm">Agent erstellt Ihr Protokoll im Chat</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                  <p className="text-sm">Klick auf <strong>„In Seite bearbeiten"</strong> unter der Antwort</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                  <p className="text-sm">Die Page wird in Ihrem OneDrive gespeichert und ist sofort von Copilot durchsuchbar</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                  <p className="text-sm">Optional: Sie können die Page mit Kollegen teilen – die sehen dann das Protokoll und können es bearbeiten</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Copilot Pages sind das von Microsoft vorgesehene Werkzeug, um Chat-Antworten dauerhaft zu
                  speichern. Sie liegen in Ihrem OneDrive, sind mit einem Titel versehen und werden von
                  Copilot automatisch beim Durchsuchen Ihrer Daten berücksichtigt. Kein Kopieren, kein
                  Einfügen, kein Dateiname ausdenken. Einfach klicken.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weg B: Agent speichert als Word */}
          <Card className="my-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
            <CardHeader>
              <CardTitle className="text-lg">Weg B: Den Agenten direkt bitten, ein Word-Dokument zu erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Wenn Sie eine strukturierte Ordnerablage bevorzugen, können Sie dem Agenten direkt sagen,
                  dass er das Protokoll als Datei speichern soll. Dafür haben wir in Schritt 2 die
                  Ablage-Anweisung in den Agenten eingebaut. In der Praxis sieht das so aus:
                </p>
              </div>
              <div className="font-mono text-sm bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-4">
                „Erstelle das Protokoll vom Meeting mit Kunde Müller von heute und speichere es als Word-Dokument in meinem OneDrive im Ordner Meeting-Protokolle."
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Copilot erstellt dann ein Word-Dokument mit dem Protokoll und legt es im angegebenen
                  Ordner ab. Den Dateinamen schlägt der Agent automatisch vor – basierend auf der
                  Ablage-Anweisung, die wir ihm gegeben haben (Format: „2026-02-28 – Kunde Müller –
                  Projektbesprechung.docx"). Sie können den Ordnerpfad in der Anweisung fest hinterlegen,
                  damit Sie ihn nicht jedes Mal mitschreiben müssen.
                </p>
                <p>
                  Für SharePoint funktioniert das genauso – ersetzen Sie „OneDrive" durch den konkreten
                  SharePoint-Ordner:
                </p>
              </div>
              <div className="font-mono text-sm bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-4">
                „Speichere das Protokoll als Word-Dokument in unserem SharePoint unter Team-Ablage / Meeting-Protokolle / 2026."
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Wichtig: Damit das funktioniert, muss der Copilot Schreibzugriff auf den jeweiligen
                  SharePoint-Bereich haben. Das ist normalerweise der Fall, wenn Sie selbst Zugriff haben –
                  Copilot arbeitet mit Ihren Berechtigungen. Falls der Agent den Ordner nicht findet,
                  nennen Sie den vollständigen Pfad oder erstellen Sie den Ordner vorher manuell.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weg C: Power Automate */}
          <Card className="my-6 border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
            <CardHeader>
              <CardTitle className="text-lg">Weg C: Power Automate – Vollautomatisch, kein Handgriff nötig</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Wenn Sie wollen, dass Protokolle komplett ohne Ihr Zutun erstellt und abgelegt werden,
                  brauchen Sie Power Automate. Das ist Microsofts Automatisierungsplattform, die ebenfalls
                  in vielen M365-Lizenzen enthalten ist. Die Idee: Ein Flow wird automatisch nach jedem
                  Teams-Meeting ausgelöst, holt das Transkript, verarbeitet es mit KI in Ihr
                  Protokollformat und speichert das Ergebnis in SharePoint. Sie tun nichts – es passiert
                  von allein.
                </p>
              </div>
              <div className="my-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                  <div>
                    <p className="text-sm font-semibold">Trigger: „Wenn ein Teams-Meeting endet"</p>
                    <p className="text-xs text-muted-foreground">Power Automate erkennt, dass ein Meeting mit Transkription beendet wurde</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                  <div>
                    <p className="text-sm font-semibold">Aktion: Transkript abrufen</p>
                    <p className="text-xs text-muted-foreground">Der Flow holt das vollständige Meeting-Transkript über die Graph API</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                  <div>
                    <p className="text-sm font-semibold">Aktion: KI-Prompt mit Ihrem Protokollformat</p>
                    <p className="text-xs text-muted-foreground">Über den „AI Builder"-Connector oder einen „HTTP-Request an Copilot" wird das Transkript mit exakt denselben Anweisungen verarbeitet, die Sie Ihrem Agenten gegeben haben</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                  <div>
                    <p className="text-sm font-semibold">Aktion: Word-Dokument erstellen und in SharePoint ablegen</p>
                    <p className="text-xs text-muted-foreground">Der Flow erstellt automatisch ein Dokument mit dem Dateinamen „2026-02-28 – [Thema].docx" in Ihrem definierten SharePoint-Ordner</p>
                  </div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Das ist die Königsdisziplin: Sie beenden ein Meeting, und zehn Minuten später liegt das
                  fertige Protokoll in SharePoint. Ohne dass Sie auch nur einen Button klicken. Allerdings
                  ist Power Automate ein eigenes Thema – wenn Sie damit noch nicht gearbeitet haben,
                  empfehle ich, zuerst mit Weg A oder B zu starten und Power Automate als nächsten Schritt
                  in Angriff zu nehmen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mein Workflow */}
          <Card className="my-6 border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="text-lg">Mein persönlicher Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Ehrlich gesagt: Ich nutze eine Mischung aus Weg A und Weg B. Für schnelle interne
                  Meetings klicke ich auf „In Seite bearbeiten" – fertig in einer Sekunde. Für wichtige
                  Kundengespräche sage ich dem Agenten: „Speichere das als Word in meinem
                  Meeting-Protokolle-Ordner auf SharePoint." Dann liegt es dort, wo auch meine Kollegen
                  es finden können.
                </p>
                <p>
                  Der Punkt ist: Es gibt keinen „richtigen" Weg. Es gibt nur den Weg, der so wenig
                  Reibung erzeugt, dass Sie es tatsächlich nach jedem Meeting machen. Für mich sind das
                  Copilot Pages für 80% der Meetings und SharePoint-Dokumente für die restlichen 20%.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Schritt 5: Gedächtnis durchsuchen */}
        <section id="gedaechtnis-durchsuchen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Schritt 5: Ihr digitales Gedächtnis nutzen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jetzt haben Sie einen Agenten, der Protokolle erstellt, und einen Ort, an dem sie liegen.
              Der letzte Schritt ist der schönste: das Gedächtnis nutzen. Und dafür brauchen Sie keinen
              speziellen Agenten – das macht der normale Microsoft 365 Copilot von allein.
            </p>
            <p>
              Öffnen Sie den regulären Copilot Chat und stellen Sie Ihre Frage. Copilot durchsucht
              automatisch alle Ihre Microsoft-365-Daten – inklusive der Protokolle, die Sie in SharePoint
              oder OneNote abgelegt haben. Ein paar Beispiele aus meinem Alltag:
            </p>
          </div>

          <div className="my-6 space-y-3">
            {[
              "Was wurde im Meeting mit Kunde Müller am 15. Februar zu den Preisen besprochen?",
              "Welche Action Items aus dem Projektmeeting letzte Woche sind noch offen?",
              "Wer hat im Januar-Meeting gesagt, dass das Budget nicht reicht?",
              "Fasse alle Entscheidungen der letzten zwei Wochen zum Thema Relaunch zusammen.",
              "Was waren die offenen Fragen aus dem Bewerbungsgespräch mit Frau Schmidt?"
            ].map((prompt, idx) => (
              <div key={idx} className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg font-mono text-sm border border-blue-200 dark:border-blue-800">
                „{prompt}"
              </div>
            ))}
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das ist der Moment, in dem sich die investierten Minuten auszahlen. Statt in Notizbüchern
              zu blättern, in E-Mails zu suchen oder Kollegen zu fragen „Weißt du noch, was wir damals
              gesagt haben?" – fragen Sie Copilot. Er findet die Antwort. Meistens in unter zehn Sekunden.
              Mit Quellenangabe, sodass Sie direkt ins Originalprotokoll springen können.
            </p>
            <p>
              Und hier schließt sich der Kreis zu meinem Alltag als Geschäftsführer: Ich unterhalte mich
              mit meinem Copilot wie mit einem Assistenten, der bei jedem Meeting dabei war und sich an
              alles erinnert. „Was hatte der Trainer aus Hamburg zu den Terminen gesagt?" – Copilot liefert.
              „Welchen Preis haben wir dem Partner in Österreich genannt?" – Copilot liefert. Mein Gehirn
              ist endlich frei für die Dinge, in denen es gut ist: Entscheidungen treffen, kreativ denken,
              Beziehungen aufbauen. Das Erinnern übernimmt die Maschine.
            </p>
          </div>
        </section>

        {/* Was nicht funktioniert */}
        <section id="grenzen" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Was nicht funktioniert – ehrliche Grenzen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Es wäre unseriös, diesen Artikel zu schreiben, ohne über die Grenzen zu sprechen. Der
              Protokoll-Agent ist kein Wundermittel, und es gibt Situationen, in denen er an seine
              Grenzen stößt.
            </p>
            <p>
              Die offensichtlichste: Wenn die Transkription nicht aktiviert wurde, gibt es kein Transkript.
              Und wenn es kein Transkript gibt, kann der Agent nichts daraus machen. Das klingt trivial,
              ist aber in der Praxis der häufigste Grund, warum das System nicht funktioniert. Jemand
              vergisst, die Transkription zu starten, oder ein Gesprächspartner bittet darum, nicht
              aufgezeichnet zu werden. Für solche Fälle bleibt nur der alte Weg: Stichpunkte notieren
              und dem Agenten manuell geben.
            </p>
            <p>
              Die zweite Einschränkung betrifft die Qualität der Transkription selbst. Teams ist
              erstaunlich gut darin, gesprochene Sprache zu erkennen – aber nicht perfekt. Starke
              Akzente, Fachjargon, durcheinander redende Teilnehmer oder schlechte Audioqualität führen
              zu Fehlern im Transkript. Und Fehler im Transkript führen zu Fehlern im Protokoll. Ich
              überprüfe deshalb bei wichtigen Meetings immer die Action Items und Entscheidungen gegen
              meine eigene Erinnerung.
            </p>
            <p>
              Drittens: Der Agent erstellt das Protokoll nicht automatisch nach jedem Meeting. Sie müssen
              ihn aktiv ansprechen und ihm sagen, welches Meeting er verarbeiten soll. Das sind jedes Mal
              ein bis zwei Minuten Aufwand. Wer das vergisst oder keine Lust hat, baut kein Gedächtnis auf.
              Das System funktioniert nur mit der Disziplin, es zu nutzen.
            </p>
            <p>
              Und viertens: Copilot kann beim Durchsuchen Ihres Gedächtnisses gelegentlich unpräzise sein.
              Wenn Sie nach einem sehr spezifischen Detail fragen, das in einem zweistündigen Meeting nur
              einmal kurz erwähnt wurde, findet er es nicht immer. In solchen Fällen hilft es, die Frage
              umzuformulieren oder den Zeitraum einzugrenzen.
            </p>
          </div>
        </section>

        {/* Fazit */}
        <section id="fazit" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Fazit
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Was ich Ihnen hier gezeigt habe, ist kein kompliziertes IT-Projekt. Es ist ein
              fünfzehn-Minuten-Setup, das Ihre Art zu arbeiten grundlegend verändern kann. Ein eigener
              Copilot-Agent, der Ihre Meetings in ein Format bringt, das Sie definiert haben. Ein
              Speicherort, der zum durchsuchbaren Gedächtnis wird. Und ein Copilot Chat, der sich an
              alles erinnert, was Sie vergessen haben.
            </p>
            <p>
              Für mich als Geschäftsführer der Copilotenschule hat dieses System einen konkreten Unterschied
              gemacht. Ich bin nicht mehr der, der in Meetings fragt „Hatten wir das nicht schon mal
              besprochen?" – ich bin der, der sagt „Moment, ich schaue kurz nach." Und zehn Sekunden
              später habe ich die Antwort. Das verändert nicht nur meine eigene Produktivität, sondern
              auch das Vertrauen meiner Gesprächspartner: Sie wissen, dass nichts verloren geht.
            </p>
            <p>
              Probieren Sie es aus. Bauen Sie sich Ihren Agenten. Testen Sie ihn mit einem vergangenen
              Meeting. Und dann machen Sie es zur Gewohnheit. Drei Wochen reichen. Danach werden Sie sich
              fragen, wie Sie jemals ohne gearbeitet haben.
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

export default CopilotAgentDigitalesGedaechtnis;
