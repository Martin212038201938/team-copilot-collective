import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import AngebotsBruecke from "@/components/AngebotsBruecke";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const SLUG = "copilot-memory-projektgedaechtnis";
const PAGE_TITLE = "Copilot Memory verstehen und nutzen: Vom Allgemeingedächtnis zum Projektgedächtnis";

const LINK = "text-blue-700 dark:text-blue-400 hover:underline";

const CopilotMemoryProjektgedaechtnis = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "drei-ebenen", title: "Das Drei-Ebenen-Modell für Copilot", level: 2 },
    { id: "ebene-1-memory", title: "Ebene 1: Copilot Memory – das Allgemeingedächtnis", level: 2 },
    { id: "ebene-2-notebooks", title: "Ebene 2: Copilot Notebooks – das Projektgedächtnis", level: 2 },
    { id: "teams-transkripte", title: "Teams-Transkripte automatisch ins Gedächtnis holen", level: 2 },
    { id: "ebene-3-eigenes-system", title: "Ebene 3: Das eigene Gedächtnissystem", level: 2 },
    { id: "kontext-hygiene", title: "Kontext-Hygiene: Verschmutzung vermeiden", level: 2 },
    { id: "weiterfuehrend", title: "Weiterführende Artikel", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 },
  ];

  const faqs = [
    {
      name: "Unsere Mitarbeiter beschweren sich, dass Copilot sich nichts merkt – liegt das an fehlenden Lizenzen oder an falscher Nutzung?",
      answer:
        "Meist an der Nutzung, nicht an der Technik. Copilot Memory steht auch Copilot-Chat-Nutzern ohne Add-on-Lizenz zur Verfügung, speichert aber absichtlich nur allgemeine Präferenzen. Projektwissen gehört in Copilot Notebooks, und die setzen die Microsoft-365-Copilot-Lizenz voraus. Wer beides verwechselt, erlebt genau diese Enttäuschung. In unseren Praxis-Trainings der Copilotenschule richten Teams die drei Gedächtnis-Ebenen an ihren echten Projekten ein – danach ist klar, welche Information wohin gehört."
    },
    {
      name: "Wie führen wir Notebooks als Projektgedächtnis im Team ein, ohne dass Wildwuchs entsteht?",
      answer:
        "Mit drei Regeln, bevor das erste Notebook entsteht: ein Notebook pro Projekt statt Sammel-Notebooks, eine Namenskonvention wie 'Projekt – Kunde – Jahr', und eine benannte Person, die Quellen pflegt und Veraltetes entfernt. Ohne diese Absprachen entstehen in wenigen Wochen Dutzende verwaiste Notebooks mit widersprüchlichem Inhalt. Die Copilotenschule begleitet solche Einführungen als Workshop, inklusive Ordner- und Berechtigungsstruktur in SharePoint."
    },
    {
      name: "Was muss unser Datenschutzbeauftragter zu Copilot Memory wissen?",
      answer:
        "Die wichtigsten Fakten: Erinnerungen liegen in einem versteckten Ordner im Exchange-Postfach des jeweiligen Nutzers und unterliegen denselben Schutzmechanismen wie E-Mails. Admins steuern die Funktion zentral über das Enhanced-Personalization-Steuerelement, Purview-Aufbewahrungsrichtlinien greifen für Memory-Einträge jedoch nicht. Bei Meeting-Transkripten kommt die Einwilligung der Teilnehmer hinzu. Für die saubere Governance-Aufstellung empfiehlt sich ein Compliance-Workshop – die Copilotenschule bietet dafür ein eigenes Format mit Datenschutz-Fokus."
    },
    {
      name: "Wir haben Transkription aus Datenschutzgründen deaktiviert – lohnt sich das Gedächtnis-Thema trotzdem?",
      answer:
        "Ja. Ebene 1 (Memory) und Ebene 3 (eigene Gedächtnis-Dateien) funktionieren komplett ohne Transkripte, und auch Notebooks lassen sich mit Dokumenten, Notizen und Chat-Ergebnissen füllen. Transkripte sind ein Verstärker, keine Voraussetzung. Oft ist die pauschale Deaktivierung aber gar nicht nötig: Mit klarer Policy, Teilnehmer-Einwilligung und begrenzten Speicherfristen lässt sich Transkription datenschutzkonform betreiben. Die Copilotenschule unterstützt bei genau dieser Abwägung."
    },
    {
      name: "Wie messen wir, ob sich der Aufbau eines digitalen Gedächtnisses für uns rechnet?",
      answer:
        "Drei Kennzahlen haben sich bewährt: die Zeit, die Mitarbeiter mit der Suche nach Entscheidungen und Dokumenten verbringen, die Dauer der Meeting-Nachbereitung und die Einarbeitungszeit neuer Projektmitglieder. Alle drei sinken messbar, wenn Projektwissen in Notebooks statt in Köpfen und Chatverläufen liegt. Wie Sie daraus eine belastbare Rechnung machen, zeigt unser Artikel zur ROI-Berechnung – und in den Trainings der Copilotenschule definieren Teams diese Messpunkte gleich zu Beginn."
    },
    {
      name: "Sollten wir warten, bis Microsoft ein vollautomatisches Gedächtnis liefert?",
      answer:
        "Nein. Microsoft baut die Memory- und Notebook-Funktionen zwar sichtbar aus, ein Gedächtnis, das sich vollständig selbst pflegt, ist aber nicht angekündigt. Wer heute eine saubere Projektordner-Struktur, Notebooks und eine Protokoll-Routine etabliert, profitiert sofort – und automatisch von jeder künftigen Funktion, weil die Struktur schon steht. Warten kostet dagegen jeden Monat Suchzeit und verlorenes Projektwissen. Ein kompaktes Training der Copilotenschule verkürzt den Aufbau von Monaten auf Wochen."
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
          "Copilot Memory, Notebooks und eigene Gedächtnis-Dateien: So bauen Sie ein dauerhaftes Gedächtnis in Microsoft 365 Copilot auf – inklusive Teams-Transkripten. Stand August 2026.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-08-13",
        "dateModified": "2026-08-13",
        "keywords": [
          "Copilot Memory",
          "Copilot Gedächtnis",
          "Copilot Notebooks",
          "Projektgedächtnis",
          "Copilot personalisieren",
          "Teams Transkripte Copilot",
        ],
        "articleSection": "Praxisguide",
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

  const ebenen = [
    {
      ebene: "Ebene 1",
      titel: "Allgemeingedächtnis",
      werkzeug: "Copilot Memory + benutzerdefinierte Anweisungen",
      wer: "Copilot schreibt automatisch, Sie korrigieren",
      inhalt: "Rolle, Arbeitsstil, dauerhafte Präferenzen – gilt in jedem Chat",
    },
    {
      ebene: "Ebene 2",
      titel: "Projektgedächtnis",
      werkzeug: "Copilot Notebooks mit Dateien, Meetings und SharePoint-Ordnern",
      wer: "Sie wählen die Quellen, Copilot antwortet nur daraus",
      inhalt: "Projektstand, Entscheidungen, Dokumente – gilt nur im Notebook",
    },
    {
      ebene: "Ebene 3",
      titel: "Eigenes Gedächtnissystem",
      werkzeug: "Gedächtnis-Dateien in OneDrive/SharePoint, gepflegt per Prompt oder Agent",
      wer: "Sie bestimmen Struktur und Inhalt, Copilot macht die Fleißarbeit",
      inhalt: "Projektlog mit Stand, Entscheidungen, offenen Punkten – lesbar und editierbar",
    },
  ];

  return (
    <>
      <SEOHead
        title="Copilot Memory & Projektgedächtnis: Anleitung 2026 | copilotenschule.de"
        description="Copilot Memory, Notebooks und eigene Gedächtnis-Dateien: So bauen Sie ein dauerhaftes Gedächtnis in Microsoft 365 Copilot auf. Anleitung, Stand August 2026."
        keywords={[
          "Copilot Memory",
          "Copilot Gedächtnis aufbauen",
          "Copilot Notebooks Projektgedächtnis",
          "Copilot personalisieren",
          "Copilot Memory aktivieren",
          "Teams Transkripte Copilot Gedächtnis",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-08-13T09:00:00+02:00"
        modifiedTime="2026-08-13T09:00:00+02:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Memory & Projektgedächtnis", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Warum Copilot sich Ihre Projekte nicht von allein merkt – und wie Sie mit Memory, Notebooks und eigenen Gedächtnis-Dateien ein System bauen, das über Monate trägt."
        lastUpdated="13. August 2026"
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
              Microsoft 365 Copilot hat drei Gedächtnis-Ebenen: <strong>Copilot Memory</strong> merkt
              sich automatisch allgemeine Präferenzen und gilt in jedem Chat.{" "}
              <strong>Copilot Notebooks</strong> bilden das Projektgedächtnis – Copilot antwortet dort
              nur aus den Quellen, die Sie hineinlegen, inklusive Teams-Meetings samt Transkript. Wer
              mehr Kontrolle will, ergänzt eine <strong>eigene Gedächtnis-Datei pro Projekt</strong>,
              die Copilot auf Zuruf fortschreibt. Projektstände gehören nie ins Allgemeingedächtnis –
              sonst verschmutzen sie jeden künftigen Chat.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p>
            Die Memory-Funktion in Microsoft 365 Copilot weckt eine Erwartung, die sie nicht erfüllt.
            Wer sie aktiviert, geht davon aus, dass Copilot sich ab jetzt merkt, woran gearbeitet
            wird: den Stand der Angebotspräsentation, die Entscheidung aus dem Dienstag-Meeting, die
            drei offenen Punkte für den Quartalsbericht. Am nächsten Morgen, im frischen Chat, die
            Frage nach den nächsten Schritten – und Copilot weiß von nichts. Das ist kein Fehler,
            sondern Absicht. Alles, was auf Kontoebene gespeichert wird, wandert in jeden künftigen
            Chat hinein. Würde Copilot dort Projektdetails ablegen, schleppte jede neue Unterhaltung
            Ballast aus sämtlichen Arbeitsbereichen mit, und die Antworten würden schlechter statt
            besser. Microsoft hält dieses Allgemeingedächtnis deshalb bewusst dünn.
          </p>
          <p>
            Ein brauchbares Gedächtnis entsteht in Copilot darum nicht durch einen Schalter, sondern
            durch Architektur. In der ChatGPT- und Claude-Welt hat sich dafür ein Drei-Ebenen-Modell
            durchgesetzt: globales Gedächtnis für Persönliches, Projekt-Container für Arbeitskontext,
            eigene Gedächtnis-Dateien für volle Kontrolle. Dieses Modell lässt sich auf Copilot
            übertragen – die Bausteine heißen hier Memory, Notebooks und SharePoint, und an einer
            Stelle ist Copilot sogar im Vorteil: Teams-Meetings samt Transkript lassen sich direkt als
            Wissensquelle anschließen. Dieser Artikel zeigt Schritt für Schritt, wie Sie alle drei
            Ebenen einrichten, wie Meeting-Inhalte automatisch einfließen und wo die ehrlichen Grenzen
            liegen. Stand: August 2026.
          </p>
        </div>

        <AngebotsBruecke
          headline="Memory, Notebooks, Projektgedächtnis – Ihr Team muss das nicht allein herausfinden."
          text="Im Praxis-Training richten wir die drei Gedächtnis-Ebenen direkt an Ihren echten Projekten ein: von der Memory-Hygiene über die Notebook-Struktur bis zur Transkript-Routine."
          points={["Hands-on im eigenen Tenant", "Inhouse oder online", "Für Teams und Fachabteilungen"]}
          trainingSlug="microsoft-365-copilot-praxis"
          trainingLabel="Praxis-Training ansehen"
          source={SLUG}
        />

        {/* Drei-Ebenen-Modell */}
        <section id="drei-ebenen" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Das Drei-Ebenen-Modell für Copilot</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Die drei Ebenen unterscheiden sich in einer einzigen, entscheidenden Frage: Wer
              kontrolliert, was gespeichert wird? Auf Ebene 1 entscheidet Copilot weitgehend selbst.
              Auf Ebene 2 bestimmen Sie die Quellen, Copilot arbeitet damit. Auf Ebene 3 gehört Ihnen
              beides – Struktur und Inhalt. Je weiter oben, desto weniger Aufwand; je weiter unten,
              desto mehr Verlässlichkeit. Die meisten Teams brauchen alle drei.
            </p>
          </div>

          <div className="not-prose space-y-3 mb-4">
            {ebenen.map((e) => (
              <div
                key={e.ebene}
                className="rounded-xl border-2 border-primary/25 bg-muted/40 p-5"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {e.ebene}
                  </span>
                  <span className="text-lg font-bold">{e.titel}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-semibold text-foreground">Werkzeug:</span> {e.werkzeug}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-semibold text-foreground">Kontrolle:</span> {e.wer}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Inhalt:</span> {e.inhalt}
                </p>
              </div>
            ))}
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Dieses Modell beschreibt, wo Wissen dauerhaft abgelegt wird. Davon zu unterscheiden ist
              die Fähigkeit von Copilot, Ihre vorhandenen Microsoft-365-Daten zu durchsuchen – E-Mails,
              Chats, Dokumente. Die funktioniert auch ohne jede
              Gedächtnis-Struktur und ist in unserem Artikel{" "}
              <Link to="/wissen/copilot-digitales-gedaechtnis" className={LINK}>
                Digitales Gedächtnis mit Microsoft Copilot
              </Link>{" "}
              ausführlich beschrieben. Suchen findet, was irgendwo liegt. Die drei Ebenen sorgen dafür,
              dass das Wichtige nicht irgendwo liegt, sondern am richtigen Ort.
            </p>
          </div>
        </section>

        {/* Ebene 1 */}
        <section id="ebene-1-memory" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ebene 1: Copilot Memory – das Allgemeingedächtnis
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Copilot Memory speichert drei Arten von Informationen: explizit gespeicherte
              Erinnerungen, abgeleitete Details aus Ihrem Chatverlauf und benutzerdefinierte
              Anweisungen. Microsoft hat die Funktion seit Ende 2025 schrittweise ausgerollt; seit
              Sommer 2026 ist sie in den meisten Tenants angekommen und standardmäßig aktiv – auch für
              Copilot-Chat-Nutzer ohne kostenpflichtige Add-on-Lizenz. Sie finden die Steuerung in
              Copilot Chat über das Menü oben rechts unter <strong>Einstellungen →
              Personalisierung</strong>. Dort lassen sich die drei Bausteine einzeln ein- und
              ausschalten, gespeicherte Erinnerungen einsehen und löschen.
            </p>
            <p>
              Der schnellste Weg, das Allgemeingedächtnis gezielt zu füllen, ist ein direkter Prompt im
              Chat: <em>„Merke dir: Ich leite das Team Einkauf, schreibe E-Mails knapp und ohne
              Anglizismen und arbeite hauptsächlich mit Excel und Teams."</em> Copilot bestätigt die
              Speicherung sichtbar, und der Eintrag taucht in der Erinnerungsliste auf. Dorthin gehören
              genau solche Dinge: Rolle, Zuständigkeiten, Sprach- und Formatpräferenzen, wiederkehrende
              Aufgaben, feste Rahmenbedingungen. Was dort nicht hingehört, sind Projektstände,
              Termine und Entscheidungen – dafür ist Ebene 2 da.
            </p>
            <p>
              Zusätzlich lohnen sich die benutzerdefinierten Anweisungen: dauerhafte Vorgaben, die
              Copilot in jeder Antwort berücksichtigt, etwa „Antworte auf Deutsch, beginne mit dem
              Ergebnis, keine Aufzählungen in E-Mail-Entwürfen". Der Unterschied zur Erinnerung: Eine
              Anweisung steuert das Verhalten, eine Erinnerung liefert Wissen über Sie.
            </p>
            <p>
              Alle Erinnerungen liegen in einem versteckten Ordner im Exchange-Postfach des jeweiligen
              Nutzers und unterliegen damit denselben Compliance- und Verschlüsselungsregeln wie
              E-Mails; niemand sonst sieht sie. Administratoren steuern die
              Funktion zentral über das Enhanced-Personalization-Steuerelement. Welche Daten Copilot
              insgesamt sehen kann, haben wir im Artikel{" "}
              <Link to="/wissen/welche-daten-sieht-microsoft-365-copilot" className={LINK}>
                Welche Daten sieht Microsoft 365 Copilot?
              </Link>{" "}
              aufgeschlüsselt.
            </p>
          </div>
        </section>

        {/* Ebene 2 */}
        <section id="ebene-2-notebooks" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ebene 2: Copilot Notebooks – das Projektgedächtnis
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Copilot Notebooks sind der Baustein, der aus Copilot ein Projektwerkzeug macht. Ein
              Notebook ist ein Container, in den Sie alles legen, was zu einem Vorhaben gehört – und
              der Notebook-Chat antwortet ausschließlich aus diesen Quellen, nicht aus dem restlichen
              Tenant und nicht aus dem Web. Genau diese Begrenzung ist der Wert: Der Kontext bleibt
              sauber, dauerhaft und von anderen Projekten getrennt. Seit Juli 2026 sind Notebooks in
              der Microsoft-365-Copilot-App allgemein verfügbar, ebenso in OneNote im Web; OneNote
              für Mac folgt im August. Voraussetzung ist die Microsoft-365-Copilot-Lizenz.
            </p>
            <p>
              Als Quellen akzeptiert ein Notebook Word-, Excel-, PowerPoint- und PDF-Dateien,
              OneNote-Seiten, Copilot Pages, Loop-Komponenten und Weblinks – vor allem aber ganze
              SharePoint-Ordner und -Websites sowie Teams-Besprechungen. Bis zu 300 Dateien kann
              Copilot pro Notebook heranziehen; bei referenzierten Ordnern wählt er die relevantesten
              selbst aus. Das Einrichten dauert keine fünf Minuten:
            </p>
            <ol>
              <li>
                In der Microsoft-365-Copilot-App links <strong>Notebooks</strong> öffnen und ein neues
                Notebook anlegen – ein Notebook pro Projekt, benannt nach einer festen Konvention,
                etwa „Projekt Quartalsbericht – Kunde X – 2026".
              </li>
              <li>
                Über <strong>Quellen hinzufügen</strong> die zentralen Dokumente anbinden: Briefing,
                Angebot, Projektplan – oder gleich den SharePoint-Projektordner.
              </li>
              <li>
                Im Notebook-Chat arbeiten: „Was ist der aktuelle Stand?", „Welche Entscheidungen sind
                offen?", „Entwirf das Status-Update für die Geschäftsführung."
              </li>
            </ol>
            <p>
              Nach Wochen Pause genügt eine Frage im Notebook, und der Faden ist wieder da – das
              Projektgedächtnis liegt nicht mehr im Chatverlauf, sondern in den Quellen. Praktisch
              sind auch die Erzeugungsfunktionen: Aus dem gesammelten Material erstellt ein Notebook
              per Klick ein Word-Dokument oder ein PowerPoint-Deck, seit Juli 2026 auch interaktive
              Mind Maps und Audio-Zusammenfassungen. Wie Notebooks mit Pages, Loop und SharePoint
              zusammenspielen, vertieft unser Artikel{" "}
              <Link to="/wissen/copilot-pages-loop-notebooks-sharepoint-workflows" className={LINK}>
                Copilot Pages, Loop, Notebooks, SharePoint
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Teams-Transkripte */}
        <section id="teams-transkripte" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Teams-Transkripte automatisch ins Gedächtnis holen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das meiste Projektwissen entsteht nicht in Dokumenten, sondern in Besprechungen – und
              verdunstet dort auch wieder. Wer sein Projektgedächtnis selbstlernend machen will, muss
              deshalb genau eine Pipeline bauen: vom Teams-Meeting in das richtige Notebook. Die
              Grundlage ist aktivierte Transkription; die Transkripte landen bei privaten Meetings
              automatisch im OneDrive des Organisators, bei Kanalbesprechungen in der
              SharePoint-Bibliothek des Teams. Darauf aufbauend gibt es drei Ausbaustufen.
            </p>
            <p>
              <strong>Stufe 1 – manuell, sofort verfügbar:</strong> Seit Mai 2026 lassen sich
              Teams-Besprechungen direkt als Quelle in ein Notebook einfügen. Copilot übernimmt dabei
              Transkript, Meeting-Chat und die geteilten Dateien in einem Schritt. Nach dem
              Projektmeeting dauert es zehn Sekunden, das Meeting ins Projekt-Notebook zu legen – ab
              dann beantwortet das Notebook Fragen wie „Was wurde am Dienstag zur Preisgestaltung
              entschieden?" aus dem Gesprächsverlauf.
            </p>
            <p>
              <strong>Stufe 2 – halbautomatisch über den Projektordner:</strong> Wer nicht an das
              Hinzufügen denken will, kombiniert zwei Bausteine: den SharePoint-Projektordner als
              Notebook-Quelle und einen Power-Automate-Flow, der nach Meeting-Ende das Transkript oder
              die Zusammenfassung in genau diesen Ordner kopiert. Damit die Zuordnung stimmt, braucht
              es eine Konvention im Meeting-Titel – etwa ein Kürzel wie „[QB2026]" –, anhand derer der
              Flow das Zielverzeichnis wählt. Ab dann fließt jedes neue Meeting ohne Zutun ins
              Projektgedächtnis, denn der Ordner ist die Quelle, und der Ordner wächst von selbst.
            </p>
            <p>
              <strong>Stufe 3 – vollautomatisch mit einem Agenten:</strong> Rohe Transkripte sind
              sperrig. Ein 90-Minuten-Meeting erzeugt Dutzende Seiten Wortprotokoll, in denen die zwei
              relevanten Entscheidungen untergehen. Deutlich bessere Antworten liefert das Notebook,
              wenn ein Agent die Transkripte vorher zu strukturierten Protokollen verdichtet:
              Entscheidungen, Verantwortliche, offene Punkte, Termine. Wie Sie einen solchen Agenten
              ohne Programmierung bauen, zeigt unsere Anleitung{" "}
              <Link to="/wissen/copilot-agent-digitales-gedaechtnis" className={LINK}>
                Copilot Agent für Ihr digitales Gedächtnis
              </Link>{" "}
              Schritt für Schritt. Die Kombination aus Agent-Protokollen im Projektordner und Notebook
              darüber ist nach unserer Einschätzung das derzeit beste selbstlernende Gedächtnis, das
              sich in Microsoft 365 bauen lässt.
            </p>
            <p>
              Die Qualität steht und fällt allerdings mit der Zuordnung. Landet das Transkript des
              Vertriebsmeetings im Notebook des HR-Projekts, beantwortet Copilot dort künftig Fragen
              mit fremdem Kontext – selbstbewusst und falsch. Die
              Titel-Konvention ist deshalb keine Formalie, sondern das Rückgrat des Systems.
            </p>
          </div>
        </section>

        {/* Ebene 3 */}
        <section id="ebene-3-eigenes-system" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ebene 3: Das eigene Gedächtnissystem
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Den Ebenen 1 und 2 ist gemeinsam, dass Copilot mitentscheidet, was hängen bleibt. Memory
              wählt selbst aus, was es aus Chats ableitet, und ein Notebook ist nur so aktuell wie
              seine Quellen. Die dritte Ebene dreht das Verhältnis um: Sie führen pro Projekt eine
              sichtbare Gedächtnis-Datei, die Sie lesen, korrigieren und versionieren können – kein
              Blackbox-Speicher, sondern ein Dokument.
            </p>
            <p>
              Bewährt hat sich ein schlichtes Projektlog als Word-Datei oder OneNote-Seite im
              Projektordner, mit vier festen Abschnitten: aktueller Stand, getroffene Entscheidungen,
              offene Punkte, Beteiligte. Diese Datei ist selbst Quelle im Projekt-Notebook und damit
              Teil des Gedächtnisses. Die Pflege übernimmt Copilot auf Zuruf: Am Ende einer
              Arbeitssitzung genügt der Prompt <em>„Fasse aus dieser Unterhaltung alle Entscheidungen
              und offenen Punkte zusammen, formatiert für mein Projektlog"</em> – in Word schreibt
              Copilot die Ergänzung direkt ins Dokument. Zwei Minuten Aufwand, und die nächste Sitzung
              startet mit vollständigem Kontext, egal ob morgen oder in drei Monaten.
            </p>
            <p>
              Ein Gedächtnis, das sich vollständig selbst pflegt, gibt es in Copilot nicht. Werkzeuge
              wie Claude schreiben ihre Projekt-Gedächtnisdateien inzwischen eigenständig fort; Copilot
              braucht dafür entweder Ihren Prompt oder einen selbst gebauten Agenten. Wer die zwei
              Minuten am Sitzungsende nicht investiert, hat nach vier Wochen ein veraltetes Log – und
              ein veraltetes Gedächtnis ist schlimmer als keines, weil es falsche Sicherheit erzeugt.
              Der Lohn der Disziplin ist dafür beträchtlich: Das System ist transparent, überlebt jede
              Umbenennung von Microsoft-Features und funktioniert notfalls sogar werkzeugunabhängig,
              weil es aus normalen Dateien besteht.
            </p>
          </div>
        </section>

        {/* Kontext-Hygiene */}
        <section id="kontext-hygiene" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Kontext-Hygiene: Verschmutzung vermeiden
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das größte Risiko eines wachsenden Gedächtnisses ist nicht Vergessen, sondern
              Vermischung. Ein einziger falscher oder veralteter Eintrag im Allgemeingedächtnis wirkt
              in jedem künftigen Chat weiter; ein Notebook mit Quellen aus zwei Projekten vermengt
              beide Kontexte in jeder Antwort. Vier Regeln halten das System sauber:
            </p>
            <ul>
              <li>
                <strong>Ebenen respektieren:</strong> Persönliches und Dauerhaftes ins Memory,
                Projektwissen ins Notebook – nie umgekehrt. „Merke dir, dass die Präsentation am 6.
                Oktober ist" ist der klassische Fehler: Der Termin verfolgt Sie noch in Chats, die
                nichts damit zu tun haben, und bleibt nach der Verschiebung falsch gespeichert.
              </li>
              <li>
                <strong>Regelmäßig ausmisten:</strong> Einmal im Quartal die Liste unter Einstellungen
                → Personalisierung durchsehen und löschen, was nicht mehr stimmt. Gespeicherte
                Erinnerungen bleiben sonst unbegrenzt bestehen; das Deaktivieren der Funktion löscht
                sie ausdrücklich nicht.
              </li>
              <li>
                <strong>Temporäre Chats nutzen:</strong> Für Einmal-Themen und Experimente bietet
                Copilot Chat einen temporären Modus, der weder Verlauf noch Erinnerungen hinterlässt –
                das verhindert, dass eine Recherche von gestern die Personalisierung von morgen prägt.
              </li>
              <li>
                <strong>Ein Notebook pro Projekt:</strong> Sammel-Notebooks („Vertrieb allgemein")
                verwässern die Antworten. Lieber ein zusätzliches Notebook anlegen als zwei Vorhaben
                mischen – die Grenze des Containers ist sein Wert.
              </li>
            </ul>
            <p>
              Wer diese vier Regeln einmal im Team verankert, hat den unsichtbaren Teil der Arbeit
              erledigt. Der Rest ist Routine: Meetings fließen automatisch ein, das Projektlog wächst
              per Prompt, und Copilot antwortet in jedem Projekt aus genau dem Kontext, der dort
              hingehört.
            </p>
          </div>
        </section>

        {/* Weiterführende Artikel */}
        <section id="weiterfuehrend" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Weiterführende Artikel</h2>
          <div className="grid md:grid-cols-3 gap-4 not-prose">
            <Link
              to="/wissen/copilot-digitales-gedaechtnis"
              className="block p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <div className="font-semibold mb-1">Digitales Gedächtnis mit Microsoft Copilot</div>
              <div className="text-sm text-muted-foreground">
                Wie Copilot E-Mails, Chats und Transkripte durchsucht – mit 10 Praxis-Prompts.
              </div>
            </Link>
            <Link
              to="/wissen/copilot-agent-digitales-gedaechtnis"
              className="block p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <div className="font-semibold mb-1">Copilot Agent für Ihr digitales Gedächtnis</div>
              <div className="text-sm text-muted-foreground">
                Schritt für Schritt: Ein Agent macht aus Transkripten durchsuchbare Protokolle.
              </div>
            </Link>
            <Link
              to="/wissen/copilot-pages-loop-notebooks-sharepoint-workflows"
              className="block p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <div className="font-semibold mb-1">Pages, Loop, Notebooks, SharePoint</div>
              <div className="text-sm text-muted-foreground">
                Welches Werkzeug wofür – und warum Ihre Workflows ein Update brauchen.
              </div>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Microsoft-Dokumentation, auf die sich dieser Artikel stützt (Stand August 2026).
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Manage Copilot personalization and memory",
                beschreibung: "Microsoft Learn: Speicherort, Admin-Steuerung und Aufbewahrung von Copilot Memory",
                url: "https://learn.microsoft.com/microsoft-365/copilot/copilot-personalization-memory",
              },
              {
                titel: "Personalisierung in Copilot: Erste Schritte",
                beschreibung: "Microsoft Support: Gespeicherte Erinnerungen, Chatverlauf und benutzerdefinierte Anweisungen",
                url: "https://support.microsoft.com/topic/get-started-with-personalizing-what-microsoft-365-copilot-remembers-cba7b79a-c46f-4ca7-b46e-2fa22c563f90",
              },
              {
                titel: "How Microsoft 365 Copilot Notebooks works",
                beschreibung: "Microsoft Support: Funktionsweise, Quellentypen und 300-Dateien-Grenze von Notebooks",
                url: "https://support.microsoft.com/topic/how-microsoft-365-copilot-notebooks-works-4071d73d-8bdd-478f-8968-8dc1d7c3d43e",
              },
              {
                titel: "Microsoft 365 Copilot Release Notes",
                beschreibung: "Microsoft Learn: Notebooks in der Copilot-App, Quick Create, Mind Maps (Juli 2026)",
                url: "https://learn.microsoft.com/microsoft-365/copilot/release-notes",
              },
              {
                titel: "Teams-Meetings als Notebook-Quelle (MC1296488)",
                beschreibung: "Message Center: Transkript, Meeting-Chat und Dateien als Referenz in Copilot Notebooks",
                url: "https://mc.merill.net/message/MC1296488",
              },
              {
                titel: "Teams meeting recording and transcript storage",
                beschreibung: "Microsoft Learn: Wo Transkripte in OneDrive und SharePoint gespeichert werden",
                url: "https://learn.microsoft.com/microsoftteams/tmr-meeting-recording-change",
              },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">
                    {link.titel}
                  </div>
                  <div className="text-sm text-muted-foreground">{link.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotMemoryProjektgedaechtnis;
