import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "copilot-update-juni-2026";
const PAGE_TITLE = "Copilot Update Juni 2026";

const CopilotUpdateJuni2026 = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "wichtigste", title: "Das Wichtigste diesen Monat", level: 2 },
    { id: "neu-pro-app", title: "Neu pro App", level: 2 },
    { id: "admins", title: "Für Admins & Datenschutzbeauftragte", level: 2 },
    { id: "was-tun", title: "Was jetzt zu tun ist", level: 2 },
    { id: "faq", title: "Häufige Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 },
  ];

  const faqs = [
    {
      name: "Welche Neuerung sollte ich meinem Team diesen Monat zeigen?",
      answer:
        "Den erweiterten Copilot Chat in Outlook: Er denkt jetzt über das gesamte Postfach und den Kalender nach, funktioniert ohne kostenpflichtige Copilot-Lizenz und macht den Nutzen sofort greifbar. Direkt danach lohnt ein Blick auf Copilot Notebooks, das nun auch Copilot-Chat-Nutzern offensteht. Genau diese Unterscheidung zwischen kostenlosem Copilot Chat und dem kostenpflichtigen Add-on ist ein Kernthema unserer Trainings.",
    },
    {
      name: "Was ändert sich am 1. Juli 2026 bei Lizenzen und Preisen?",
      answer:
        "Microsoft 365 Business Standard with Copilot und Business Premium with Copilot werden dauerhafte Pläne, Copilot ist dort fest enthalten. Zeitgleich greift ein weltweites Preis- und Paket-Update. Prüfen Sie Ihre Vertrags- und Verlängerungstermine, bevor Renewals automatisch zu den neuen Konditionen laufen.",
    },
    {
      name: "Ist Cowork in unserem Copilot-Abo enthalten?",
      answer:
        "Cowork ist für alle Microsoft-365-Copilot-Tenants allgemein verfügbar, aber es rechnet verbrauchsbasiert über Copilot Credits ab und setzt die Aktivierung von Anthropic als Subprozessor voraus. Es ist also kein einfacher Schalter, sondern braucht eine bewusste Einführung mit Kostensteuerung.",
    },
    {
      name: "Was müssen wir als Admin oder Datenschutzbeauftragte vor dem Rollout prüfen?",
      answer:
        "Ob generierte Dateien die richtigen Vertraulichkeitsbezeichnungen erben, ob die Wasserzeichen-Policy zu Ihren Vorgaben passt, ob Anthropic als Subprozessor bewusst freigegeben ist und wie Sie Federated Connectors während der siebentägigen Prüfphase bewerten.",
    },
    {
      name: "Können wir Copilot ohne die kostenpflichtige Lizenz sinnvoll nutzen?",
      answer:
        "Ja, und dieser Monat stärkt genau das: Der in Microsoft 365 enthaltene Copilot Chat kann in Outlook jetzt über Postfach und Kalender nachdenken, und Copilot Notebooks rollen für Copilot-Chat-Nutzer aus. Der Unterschied zum kostenpflichtigen Add-on bleibt relevant, aber die kostenlose Basis wird deutlich brauchbarer.",
    },
    {
      name: "Bringt Claude im Copilot echte Vorteile?",
      answer:
        "Für lange Dokumente, verschachtelte Analysen und strukturierte Ausgaben lohnt der Modellwechsel oft. Am besten dieselbe Aufgabe einmal mit einem OpenAI-Modell und einmal mit Claude stellen und die Ergebnisse vergleichen.",
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
          "Die wichtigsten Microsoft-365-Copilot-Neuerungen im Juni 2026: Cowork wird allgemein verfügbar, Claude kommt in den Copilot Chat, Work IQ liest Geschäftsdaten – plus die neuen Admin- und Datenschutz-Themen und die Lizenzumstellung zum 1. Juli.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-07-13",
        "dateModified": "2026-07-13",
        "keywords": [
          "Copilot Update Juni 2026",
          "Microsoft 365 Copilot News",
          "Copilot Cowork",
          "Claude in Microsoft Copilot",
          "Work IQ",
          "Copilot Neuerungen",
        ],
        "articleSection": "Copilot News",
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
        title="Copilot Update Juni 2026 | copilotenschule.de"
        description="Microsoft-365-Copilot-Neuerungen im Juni 2026: Cowork wird GA, Claude kommt in den Copilot Chat, Work IQ liest Geschäftsdaten – plus Admin- & Datenschutz-Themen."
        keywords={[
          "Copilot Update Juni 2026",
          "Microsoft 365 Copilot News",
          "Copilot Cowork",
          "Claude in Microsoft Copilot",
          "Work IQ",
          "Copilot Neuerungen Juni 2026",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-07-13T09:00:00+01:00"
        modifiedTime="2026-07-13T09:00:00+01:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Update Juni 2026", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Der kuratierte Monatsüberblick: Was ist neu in der Copilot-Welt? Die wenigen wirklich relevanten Neuerungen aus der Juni-Ausgabe – mit Quelle, Einordnung und konkretem Nutzen."
        lastUpdated="13. Juli 2026"
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
              Der Juni bringt weniger Kosmetik als sonst und dafür zwei echte Weichenstellungen:
              Copilot Cowork ist offiziell allgemein verfügbar – also der Modus, in dem Copilot
              eine mehrstufige Aufgabe nicht vorschlägt, sondern selbst erledigt – und Anthropics
              Claude lässt sich jetzt direkt als Modell im Copilot Chat wählen. Das eine Thema, das
              kein Entscheider überspringen sollte, steht aber im Kleingedruckten: Zum 1. Juli wird
              Copilot dauerhaft in die Business-Pläne eingebaut, begleitet von einem globalen Preis-
              und Paket-Update. Eine ehrliche Einordnung vorweg – Cowork ist stark, läuft aber über
              verbrauchsbasierte Abrechnung und muss erst eingerichtet werden; „Häkchen setzen und
              los" ist es nicht.
            </p>
          </CardContent>
        </Card>

        <section id="wichtigste" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Das Wichtigste diesen Monat</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Copilot Cowork ist allgemein verfügbar.</strong> Cowork plant eine Aufgabe,
                führt sie über mehrere Microsoft-365-Dienste hinweg aus und liefert am Ende ein
                fertiges Ergebnis statt eines Entwurfs – Mails, Termine, Dokumente, Teams-Posts,
                Recherchen. Sensible Aktionen bestätigen Sie vorher per Freigabedialog. Der Haken:
                Cowork nutzt Anthropic-Modelle als Subprozessor, rechnet verbrauchsbasiert über
                Copilot Credits ab und ist zunächst auf Englisch optimiert. Starten Sie mit einem
                klar abgegrenzten Anwendungsfall statt „irgendetwas Großes" auszuprobieren. Was die
                Abrechnung konkret bedeutet, steht in unserem Beitrag zur{" "}
                <Link
                  to="/wissen/copilot-cowork-abrechnung-copilot-credits"
                  className="text-blue-700 dark:text-blue-400 hover:underline"
                >
                  Copilot-Credits-Abrechnung
                </Link>
                .{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/cowork/whats-new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Quelle: What's new in Copilot Cowork
                </a>
              </li>
              <li>
                <strong>Anthropics Claude steht jetzt im Copilot Chat zur Wahl.</strong> Neben den
                OpenAI-Modellen können Sie Claude als Modelloption auswählen – gedacht für lange
                Dokumente, komplexe Analysen und strukturierte Inhalte. So nutzen Sie es: Wenn eine
                Antwort zäh oder oberflächlich wirkt, wechseln Sie für dieselbe Aufgabe einmal das
                Modell und vergleichen Sie. Rollout ab 16. Juni auf allen Plattformen. Mehr dazu in
                unserem Beitrag{" "}
                <Link
                  to="/wissen/claude-in-microsoft-copilot"
                  className="text-blue-700 dark:text-blue-400 hover:underline"
                >
                  Claude in Microsoft Copilot
                </Link>
                .{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/release-notes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Quelle: Release Notes
                </a>
              </li>
              <li>
                <strong>Work IQ denkt jetzt auch über Geschäftsdaten nach (Vorschau).</strong>{" "}
                Microsoft 365 Copilot kann Dataverse-Geschäftsdaten durchsuchen und beantworten –
                also Kontostamm, Kontakte und offene Vorgänge zusammen mit Mails, Word- und
                PowerPoint-Inhalten. Damit rückt Copilot von reinen Office-Dokumenten näher an das
                System-of-Record heran. Noch ist das öffentliche Vorschau (Juni 2026), die Freigabe
                erfolgt durch Power-Platform-Admins.{" "}
                <a
                  href="https://learn.microsoft.com/power-platform/release-plan/2026wave1/data-platform/chat-reason-over-dataverse-business-data-365-copilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Quelle: Chat and reason over Dataverse business data
                </a>
              </li>
              <li>
                <strong>Ab 1. Juli: Copilot wird Teil der Business-Pläne – mit Preis-Update.</strong>{" "}
                Microsoft 365 Business Standard with Copilot und Business Premium with Copilot werden
                zum 1. Juli 2026 dauerhafte Pläne; der separate Copilot-Zusatz entfällt in diesen
                Bündeln. Gleichzeitig greift ein weltweites Preis- und Paket-Update (angekündigt am
                4. Dezember 2025). Die genannten US-Listenpreise (Standard 23,50 $, Premium 32 $ je
                Nutzer/Monat) sind Orientierung – die für Sie gültigen EUR-Konditionen hängen von
                Vertrag und Kanal ab. Prüfen Sie Renewal- und Vertragstermine jetzt gegen den 1.
                Juli.{" "}
                <a
                  href="https://www.microsoft.com/en-us/licensing/news/2026-m365-packaging-pricing-updates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Quelle: Microsoft 365 Pricing and Packaging Updates
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="neu-pro-app" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Neu pro App</h2>

          <h3 className="text-xl font-semibold mb-2 mt-4">Copilot Chat / Microsoft 365 Copilot App</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Word-, Excel-, PowerPoint- und PDF-Dateien öffnen jetzt direkt im Chat.</strong>{" "}
                Bisher sprang ein zitierter Treffer in einen neuen Tab; jetzt bleibt das Dokument
                neben dem Chat sichtbar. Praktisch beim Nachprüfen von Quellen, ohne den Faden zu
                verlieren. Nicht verfügbar in der Mobile-App und in Copilot in Edge/Word/Excel/
                PowerPoint.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=548641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 548641
                </a>
              </li>
              <li>
                <strong>Brand Kit und Stil für die Bild-Erzeugung im Chat.</strong> Wer eine
                Microsoft-365-Copilot-Lizenz hat, kann beim Erstellen von Grafiken, Postern oder
                Infografiken Format und Stil wählen und das Marken-Kit der Organisation direkt
                anwenden – ohne Assets manuell hochzuladen.
              </li>
              <li>
                <strong>Neu generieren und endloses Scrollen im Chatverlauf.</strong> Eine schwache
                Antwort lässt sich per „Nochmal versuchen" oder Modellwechsel direkt ersetzen; ältere
                Unterhaltungen laden beim Scrollen automatisch nach. Kleinigkeiten, die den Alltag
                glätten.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=557348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 557348
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-2 mt-4">Copilot Notebooks</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Notebooks rollen für Copilot-Chat-Nutzer aus.</strong> Der geteilte
                Projektraum, in dem man Kontext und Quellen sammelt, war bisher der Copilot-Lizenz
                vorbehalten – jetzt bekommen ihn auch Copilot-Chat-Nutzer. Für Teams ohne Volllizenz
                ist das der greifbarste Zugewinn des Monats.
              </li>
              <li>
                <strong>Mind Maps aus dem Notebook.</strong> Copilot baut aus dem gesammelten
                Material eine interaktive Themenkarte; einzelne Knoten lassen sich zusammenfassen und
                im Notebook-Chat vertiefen. Gut, um sich in fremdes Material einzuarbeiten.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=559029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 559029
                </a>
              </li>
              <li>
                <strong>Direkt Word-, Excel- oder PowerPoint-Dateien erzeugen.</strong> Aus dem
                Notebook-Kontext entsteht per „Schnellerstellen" ein strukturierter, bearbeitbarer
                Entwurf im jeweiligen Format. So nutzen Sie es: Recherche im Notebook sammeln, dann
                in einem Schritt die erste Deck- oder Dokumentfassung ziehen.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=558938"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 558938
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-2 mt-4">Outlook</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>
                  Copilot Chat denkt jetzt über das ganze Postfach, den Kalender und
                  Unternehmensdaten nach – ohne Copilot-Lizenz.
                </strong>{" "}
                Statt nur einen einzelnen Mailthread zu betrachten, findet und fasst Copilot Chat
                Informationen über den gesamten Posteingang zusammen, zieht Aufgaben aus Mails und
                Meetings und hilft beim Kalender. Für alle, die den in Microsoft 365 enthaltenen
                Copilot Chat nutzen, ist das die spürbarste Aufwertung. So nutzen Sie es: „Was sind
                die letzten Updates von meiner Führungskraft zu Projekt X?" direkt in Outlook fragen.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=531910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 531910
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-2 mt-4">Word</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Copilot bearbeitet das Dokument jetzt standardmäßig direkt.</strong> Der
                Standard-Chat in Word darf ohne Umschalten Änderungen ins Dokument schreiben – alle
                nachvollziehbar, umkehrbar und bei Bedarf abschaltbar. Ehrlich betrachtet ist das
                mehr Standard-Umstellung als neue Funktion, aber es verkürzt den Weg vom Vorschlag
                zur fertigen Passage.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=557673"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 557673
                </a>
              </li>
              <li>
                <strong>Audio Overview mit Rückfragen in Echtzeit.</strong> Die vorgelesene
                Zusammenfassung eines Dokuments war bisher Einbahnstraße; jetzt kann man beim Zuhören
                per Stimme nachfragen und bekommt sofort Antwort. Für Pendelzeit und barrierearmes
                Arbeiten nützlich.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=523206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 523206
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-2 mt-4">PowerPoint</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Inhalt und Stil aus bestehenden Präsentationen wiederverwenden.</strong>{" "}
                Copilot kann eine vorhandene Datei referenzieren, Text und Design übernehmen oder den
                Stil einer Präsentation auf eine andere anwenden – unter Wahrung der
                Dateiberechtigungen. Das trifft einen der häufigsten realen Arbeitsschritte und spart
                echtes Copy-and-paste.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 555887
                </a>
              </li>
              <li>
                <strong>Präsentationen aus Work IQ und aus Teams-Inhalten (Agent Mode).</strong>{" "}
                Copilot sammelt selbst die passenden Dateien, Meetings und Mails für ein Deck und kann
                ein Teams-Meeting oder einen Chat als Quelle heranziehen. Dazu kommen neue
                Bildmodelle (FLUX.2 Flex, MAI-Image-2-Efficient) für schnellere Slide-Grafiken.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=555874"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 555874
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-2 mt-4">OneNote</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Copilot Notebooks jetzt in OneNote im Web und auf iPhone/iPad.</strong> Der
                Notebook-Arbeitsraum ist nicht mehr auf den Desktop beschränkt; auf dem iPhone gibt
                es zusätzlich eine multimodale Erfassung (Audio transkribieren, Foto, Tippnotiz in
                einer Sitzung) für Gespräche und Whiteboards unterwegs.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=511797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 511797
                </a>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-2 mt-4">Copilot Studio / Agenten</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Agenten direkt an ein Teams-Team teilen.</strong> Im Freigabedialog lässt
                sich ein Team auswählen und eine Benachrichtigung mit Installationslink in den
                Hauptkanal schicken – weniger Reibung bei der Verteilung selbstgebauter Agenten.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=557947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 557947
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="admins" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Für Admins &amp; Datenschutzbeauftragte
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ul>
              <li>
                <strong>Generierte Dateien erben automatisch die Vertraulichkeitsbezeichnung.</strong>{" "}
                Erzeugt Copilot eine Datei, wird die höchste im Quellmaterial gefundene Sensitivity
                Label übernommen; fehlt eine Bezeichnung, weist Copilot vor dem Teilen darauf hin.
                Das schließt eine reale Lücke im Datenschutz und gehört als positives Argument in die
                interne Copilot-Bewertung.{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/release-notes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Quelle: Release Notes
                </a>
              </li>
              <li>
                <strong>Wasserzeichen für KI-generierte Video- und Audioinhalte.</strong> Über eine
                Cloud-Policy lässt sich ein sichtbares oder hörbares Wasserzeichen erzwingen. Gilt
                nicht für Bilder – die steuern Nutzende selbst in ihren Datenschutzeinstellungen.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=547831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 547831
                </a>
              </li>
              <li>
                <strong>Cowork sauber einführen – vor der Freigabe.</strong> GA heißt nicht
                „automatisch an". Vor dem Start braucht es: Anthropic als Subprozessor aktiviert,
                verbrauchsbasierte Abrechnung/Copilot Credits eingerichtet, Agent-Verfügbarkeit im
                Admin Center gesetzt und eine Vorstellung von der Kostensteuerung. Cowork kann keine
                lokalen Dateien lesen und keine OneDrive/SharePoint-Dateien löschen – das begrenzt das
                Risiko, ersetzt aber keine klare Nutzungsleitlinie.{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/cowork/get-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Quelle: Get started with Copilot Cowork
                </a>
              </li>
              <li>
                <strong>Federated Copilot Connectors sind allgemein verfügbar.</strong> Copilot
                greift damit über das Model Context Protocol in Echtzeit auf Drittdaten zu, ohne sie
                zu indexieren. Für Admins wichtig: Verwaltung unter Admin Center → Copilot →
                Connectors, mit gestaffeltem Rollout und einer siebentägigen Prüfphase, bevor
                Endnutzer Zugriff bekommen.{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/connectors/federated-connectors-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Federated connectors overview
                </a>
              </li>
              <li>
                <strong>Agenten-Verwaltung per Regeln.</strong> Erstanbieter-Agenten lassen sich
                jetzt regelbasiert für die ganze Organisation ausrollen und herrenlose Agenten
                automatisch einem Verantwortlichen zuordnen – weniger manuelle Governance-Arbeit.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=481518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 481518
                </a>
              </li>
              <li>
                <strong>Adoption endlich vollständig messbar.</strong> Das Copilot-Dashboard zeigt
                über den neuen Filter „All" auch die lizenzfreie Copilot-Chat-Nutzung, nicht nur die
                lizenzierte. Für L&amp;D- und Change-Verantwortliche ist das der ehrlichere Blick auf
                die tatsächliche Verbreitung. Ergänzend lassen sich Organizational Messages nun per
                E-Mail und nutzungsbasierter Zielgruppe ausspielen.{" "}
                <a
                  href="https://www.microsoft.com/microsoft-365/roadmap?searchterms=559475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  Roadmap 559475
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="was-tun" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Was jetzt zu tun ist</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Für Admins und Datenschutz führt der Weg diesen Monat über drei Punkte: die Lizenz- und
              Renewal-Termine gegen den 1. Juli abgleichen, vor jeder Cowork-Freigabe Abrechnung und
              Anthropic-Aktivierung klären, und die automatische Label-Vererbung als Argument in die
              interne Copilot-Bewertung aufnehmen. Für Teams lohnt genau ein Experiment: den
              erweiterten Copilot Chat in Outlook ausprobieren – er läuft ohne kostenpflichtige
              Copilot-Lizenz und zeigt konkret, was „über den ganzen Posteingang nachdenken" im Alltag
              bedeutet. Wer den Unterschied zwischen dem kostenlosen Copilot Chat und dem
              kostenpflichtigen Add-on im Team sauber vermitteln und den Rollout richtig aufsetzen
              will, findet in unserem{" "}
              <Link
                to="/trainings/copilot-strategie-change-management"
                className="text-blue-700 dark:text-blue-400 hover:underline"
              >
                Training zu Copilot-Strategie und Change-Management
              </Link>{" "}
              den passenden Rahmen dafür.
            </p>
          </div>
        </section>

        <section id="faq" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufige Fragen</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {faqs.map((faq) => (
              <div key={faq.name} className="mb-4">
                <h3 className="text-xl font-semibold mb-1">{faq.name}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quellen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Quellen</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Basis dieser Ausgabe ist die Juni-Ausgabe von „What's New in Microsoft 365 Copilot".
              Jede Neuerung ist an einer offiziellen Microsoft-Primärquelle belegt:
            </p>
            <ul>
              <li>
                Microsoft 365 Copilot Release Notes:{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/release-notes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  learn.microsoft.com
                </a>
              </li>
              <li>
                What's new in Copilot Cowork:{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/cowork/whats-new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  learn.microsoft.com
                </a>
              </li>
              <li>
                Chat and reason over Dataverse business data (Vorschau):{" "}
                <a
                  href="https://learn.microsoft.com/power-platform/release-plan/2026wave1/data-platform/chat-reason-over-dataverse-business-data-365-copilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  learn.microsoft.com
                </a>
              </li>
              <li>
                Federated connectors overview:{" "}
                <a
                  href="https://learn.microsoft.com/microsoft-365/copilot/connectors/federated-connectors-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  learn.microsoft.com
                </a>
              </li>
              <li>
                Microsoft 365 Pricing and Packaging Updates:{" "}
                <a
                  href="https://www.microsoft.com/en-us/licensing/news/2026-m365-packaging-pricing-updates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  microsoft.com
                </a>
              </li>
              <li>
                Microsoft 365 Roadmap:{" "}
                <a
                  href="https://www.microsoft.com/en-us/microsoft-365/roadmap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline break-all"
                >
                  microsoft.com
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

export default CopilotUpdateJuni2026;
