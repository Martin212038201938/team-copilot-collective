import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "claude-in-microsoft-copilot";
const PAGE_TITLE = "Claude in Microsoft Copilot: Was Anthropics KI im Copilot-Ökosystem verändert";

const CopilotClaudeIntegration = () => {
  const martinLang = getAuthor('martin-lang')!;
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-ist-passiert", title: "Was genau ist passiert?", level: 2 },
    { id: "copilot-cowork", title: "Copilot Cowork: Was die Claude-Integration kann", level: 2 },
    { id: "use-cases", title: "Konkrete Use Cases aus der Praxis", level: 2 },
    { id: "warum-nicht-openai", title: "Warum nicht einfach weiter OpenAI?", level: 2 },
    { id: "datenschutz-europa", title: "Was europäische Unternehmen beachten müssen", level: 2 },
    { id: "was-sich-aendert", title: "Was sich für Copilot-Nutzer konkret ändert", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir nutzen bereits Microsoft 365 Copilot – müssen wir jetzt etwas umstellen?",
      answer: "Nein, die Claude-Integration läuft im Hintergrund. Microsoft wählt automatisch das passende Modell für die jeweilige Aufgabe. Wer Copilot Cowork nutzen möchte, braucht eine bestehende Copilot-Lizenz (30 Euro/Nutzer/Monat). Was sich lohnt: Ihre Mitarbeiter auf die neuen Möglichkeiten vorbereiten – insbesondere auf agentenbasierte Workflows, bei denen Copilot Aufgaben über mehrere Apps hinweg eigenständig ausführt. Die Copilotenschule bietet dafür angepasste Trainingsformate."
    },
    {
      name: "Ist Claude in Copilot DSGVO-konform nutzbar?",
      answer: "Für Unternehmen in der EU, im EWR und in Großbritannien ist die Anthropic-Integration standardmäßig deaktiviert. Der Grund: Anthropic ist nicht in Microsofts EU Data Boundary eingebunden, die Datenverarbeitung erfolgt in den USA. Admins können Claude manuell aktivieren, sollten aber vorher mit ihrem Datenschutzbeauftragten klären, ob ein Transfer Impact Assessment vorliegt und ob die Rechtsgrundlage nach Art. 28 DSGVO sauber dokumentiert ist. Die Copilotenschule berät bei der datenschutzkonformen Einführung von Copilot-Features."
    },
    {
      name: "Wie überzeuge ich die Geschäftsführung, dass wir in Copilot-Schulungen investieren sollten, obwohl sich die Technologie so schnell ändert?",
      answer: "Genau weil sich die Technologie so schnell ändert, brauchen Mitarbeiter ein solides Grundverständnis. Die Claude-Integration zeigt: Copilot wird komplexer, nicht einfacher. Wer die Grundlogik versteht – wie Prompts funktionieren, wie man Agenten steuert, wo die Grenzen liegen – kann neue Features wie Copilot Cowork sofort produktiv einsetzen. Unternehmen, die nach Gartner-Daten am Change Management sparen, scheitern in 95 Prozent der Fälle beim Skalieren ihrer Copilot-Piloten. Die Copilotenschule bietet Trainings, die auf genau diese Befähigung abzielen."
    },
    {
      name: "Was ist der Unterschied zwischen Claude Cowork und Copilot Cowork?",
      answer: "Claude Cowork von Anthropic läuft lokal auf dem Rechner des Nutzers und arbeitet mit Dateien und Programmen auf dem Gerät. Copilot Cowork dagegen läuft in der Microsoft-Cloud, innerhalb des M365-Tenants. Es greift auf Outlook-Mails, Teams-Chats, SharePoint-Dateien und Excel-Arbeitsmappen zu – also auf das gesamte Unternehmenswissen, das in Microsoft 365 liegt. Der Vorteil für Unternehmen: alles unter einer Governance-Schicht, mit den gleichen Sicherheits- und Compliance-Richtlinien wie der Rest von M365."
    },
    {
      name: "Unsere Mitarbeiter nutzen Copilot kaum – bringt die Claude-Integration da überhaupt etwas?",
      answer: "Die Claude-Integration allein löst kein Adoptionsproblem. Wenn Mitarbeiter Copilot heute nicht nutzen, liegt das selten an der KI-Qualität, sondern an fehlendem Training und unklaren Anwendungsfällen. Die neuen agentenbasierten Workflows wie Copilot Cowork können die Akzeptanz aber erhöhen, weil sie greifbarere Ergebnisse liefern als reine Chat-Antworten: fertige Präsentationen, aufgeräumte Kalender, vorbereitete Meeting-Unterlagen. Die Copilotenschule hilft, diese neuen Möglichkeiten in konkrete Arbeitsabläufe zu übersetzen – mit Trainings, die genau dort ansetzen, wo Ihre Teams stehen."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Microsoft integriert Anthropics Claude-KI in Copilot – inklusive Copilot Cowork für agentenbasierte Aufgaben. Use Cases, Datenschutz für EU-Unternehmen und was sich für Copilot-Nutzer ändert.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-03-13",
        "dateModified": "2026-03-13",
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
        title="Claude in Microsoft Copilot: Was Anthropics KI verändert"
        description="Microsoft integriert Anthropics Claude-KI in Copilot – inklusive Copilot Cowork für agentenbasierte Aufgaben. Use Cases, Datenschutz und was sich für Copilot-Nutzer ändert."
        keywords={[
          "Claude in Microsoft Copilot",
          "Copilot Cowork",
          "Copilot Cowork was ist das",
          "Anthropic Microsoft 365",
          "Claude Copilot Integration",
          "Microsoft Copilot Wave 3",
          "Copilot Cowork Use Cases",
          "Copilot Cowork vs Claude Cowork",
          "Copilot Cowork Unterschied",
          "Claude in Copilot DSGVO",
          "Anthropic Copilot aktivieren",
          "Anthropic Copilot deaktivieren",
          "Copilot Cowork Datenschutz Europa",
          "Microsoft 365 Multi-Modell-Strategie",
          "Copilot Cowork Erfahrungen",
          "KI-Agenten Microsoft 365",
          "Copilot Cowork Funktionen",
          "Anthropic Unterauftragsverarbeiter Microsoft",
          "Claude Copilot Admin Center",
          "Copilot Cowork Verfügbarkeit",
          "Microsoft 365 E7 Copilot Cowork"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-03-13T11:00:00+01:00"
        modifiedTime="2026-03-13T11:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Claude in Microsoft Copilot", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Microsoft integriert Anthropics Claude-KI in Copilot – inklusive Copilot Cowork für agentenbasierte Aufgaben. Was das für Unternehmen bedeutet."
        lastUpdated="13. März 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:microsoft-365-e7-frontier-suite",
          "wissen:microsoft-copilot-lizenzen",
          "wissen:copilot-sicherheit-datenschutz",
          "wissen:ki-agenten",
          "wissen:copilot-flex-routing-eu-verarbeitung"
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
              Microsoft baut seinen Copiloten zur Multi-Modell-Plattform um – und Anthropics Claude spielt dabei
              eine zentrale Rolle. Seit März 2026 treibt Claude das neue „Copilot Cowork" an: ein Agent, der
              Aufgaben über Outlook, Teams, Excel und SharePoint hinweg eigenständig ausführt, statt nur zu
              chatten. Für europäische Unternehmen gibt es allerdings einen DSGVO-Haken: Anthropic ist nicht im
              EU Data Boundary enthalten. Dieser Artikel ordnet ein, was die Integration kann, wo sie Grenzen
              hat und was IT-Verantwortliche jetzt tun sollten.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p className="text-lg leading-relaxed">
            Was Microsoft am 9. März 2026 angekündigt hat, könnte die Arbeit von Millionen Wissensarbeitern
            grundlegend verändern. Das ist kein Marketing-Superlativ, sondern eine nüchterne Einschätzung
            dessen, was passiert, wenn ein KI-Agent – angetrieben von Anthropics Claude – eigenständig durch
            Outlook, Teams, Excel und SharePoint navigiert und dabei komplette Arbeitsabläufe übernimmt. Nicht
            mehr antworten auf Fragen, sondern handeln. Nicht mehr Entwürfe liefern, sondern Aufgaben abschließen.
            Wer seit zwei Jahren mit dem Copiloten arbeitet, spürt: Das hier ist ein anderes Level.
          </p>
          <p>
            Was in Microsofts Wave-3-Ankündigung steckt, ist keine kosmetische Modellpflege.
            Microsoft integriert mit Anthropics Claude ein Konkurrenzmodell zu OpenAI tief in sein Flaggschiffprodukt
            und baut darauf ein komplett neues Feature: Copilot Cowork. Ein Paradigmenwechsel – sowohl
            technologisch als auch strategisch. Und einer, der jedes Unternehmen betrifft, das Copilot einsetzt oder
            einzusetzen plant.
          </p>
        </div>

        {/* Was genau ist passiert? */}
        <section id="was-ist-passiert" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was genau ist passiert? Die Timeline einer stillen Übernahme
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Geschichte beginnt nicht erst im März 2026. Schon im September 2025 machte Microsoft einen Schritt,
              der vielen entgangen ist: Claude Sonnet 4 und Claude Opus 4.1 wurden als Modelloptionen in den
              Microsoft Researcher und in Copilot Studio aufgenommen. Damals wirkte das wie ein Experiment am Rand.
              Im November 2025 folgte dann der eigentliche Paukenschlag: ein 30-Milliarden-Dollar-Deal zwischen
              Microsoft und Anthropic für Azure-Compute-Kapazitäten. Dreißig Milliarden – das ist kein
              Evaluierungsprojekt, das ist eine strategische Allianz.
            </p>
            <p>
              Im Dezember 2025 tauchte im Microsoft 365 Admin Center ein neuer Toggle auf: „Anthropic AI Models".
              Für die meisten kommerziellen Tenants war er standardmäßig aktiviert. Wer in der EU sitzt, sah ihn
              deaktiviert – ein Detail, auf das ich noch zurückkomme. Ab Januar 2026 war Anthropic dann offiziell
              als Unterauftragsverarbeiter für Microsoft Online Services gelistet.
            </p>
            <p>
              Und dann, am 9. März 2026, kam Wave 3. Microsoft stellte Copilot Cowork vor – und mit ihm die
              Entscheidung, das eigene Flaggschifffeature nicht auf OpenAI, sondern auf Anthropics Claude aufzubauen.
              Bei einem Unternehmen, das 13 Milliarden Dollar in OpenAI investiert hat, ist das bemerkenswert.
              Microsoft setzt damit eine klare Botschaft: Kein einzelnes KI-Modell bekommt mehr die Alleinstellung.
              Die Zukunft gehört der Orchestrierung.
            </p>
          </div>

          {/* Adoption Timeline Chart */}
          <figure className="my-8">
            <img
              src="/images/copilot-claude-adoption-timeline.png"
              alt="Microsoft 365 Copilot: Wachstum der bezahlten Lizenzen und Anthropic-Meilensteine von September 2024 bis März 2026"
              className="w-full rounded-lg border shadow-sm"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              Copilot-Lizenzwachstum und Anthropic-Meilensteine – die Integration fällt in eine Phase
              starker Adoption mit über 160 % Wachstum im Jahresvergleich.
            </figcaption>
          </figure>
        </section>

        {/* Copilot Cowork */}
        <section id="copilot-cowork" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Copilot Cowork: Was die Claude-Integration kann – und was nicht
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Um zu verstehen, warum Copilot Cowork eine andere Qualität hat als bisherige Copilot-Features,
              muss man den Unterschied zwischen Assistenz und Agentur begreifen. Bisher war Copilot ein Assistent:
              Man stellt eine Frage, bekommt eine Antwort. Man gibt einen Auftrag, bekommt einen Entwurf. Alles in
              einem Zug, alles in einer App. Copilot Cowork dagegen arbeitet wie ein Mitarbeiter, dem man eine
              Aufgabe delegiert. Man beschreibt das gewünschte Ergebnis, und Cowork zerlegt die Aufgabe in Schritte,
              arbeitet sich über mehrere Apps hinweg durch – Outlook, Teams, Excel, SharePoint – und liefert
              Ergebnisse. Das kann Minuten dauern, manchmal Stunden.
            </p>
            <p>
              Technisch steckt dahinter Anthropics „Agentic Harness" – eine Architektur, die Claude befähigt,
              mehrstufige Aufgaben mit Zwischenschritten, Entscheidungspunkten und Fehlerbehandlung zu bewältigen.
              Microsoft hat diese Architektur in die eigene Cloud übernommen und mit dem sogenannten „Work IQ"
              verknüpft: einer Intelligenzschicht, die auf die gesamten Unternehmensdaten im Microsoft-365-Graphen
              zugreift. E-Mail-Verläufe, Teams-Unterhaltungen, Kalenderdaten, SharePoint-Dokumente – alles steht
              Cowork als Kontext zur Verfügung, innerhalb der bestehenden Berechtigungsstruktur.
            </p>
            <p>
              Und hier liegt ein entscheidender Unterschied zu Anthropics eigenem Claude Cowork, den viele übersehen:
              Claude Cowork läuft lokal auf dem Rechner des Nutzers und arbeitet mit lokalen Dateien und
              Anwendungen. Copilot Cowork läuft in der Cloud, im Microsoft-365-Tenant des Unternehmens. Microsoft
              selbst betont, dass das „ein Feature ist, kein Bug" – weil so die Enterprise-Governance greifen kann.
              Aber es bedeutet eben auch: Copilot Cowork hat keinen Zugriff auf lokale Dateien, keine nativen
              Integrationen mit Drittanbieter-Tools außerhalb des Microsoft-Ökosystems, und keine Möglichkeit,
              Anwendungen auf dem Desktop fernzusteuern. Gartner hat diese Einschränkung in einer ersten Analyse
              bereits kritisch angemerkt.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Konkrete Use Cases: Wo Copilot Cowork echten Unterschied macht
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              In meinen Trainings höre ich regelmäßig denselben Satz: „Copilot kann mir eine E-Mail
              zusammenfassen – aber das spart mir zwei Minuten. Wofür zahle ich 30 Euro im Monat?" Copilot
              Cowork verschiebt genau dieses Wertversprechen. Es geht nicht mehr um einzelne Handgriffe, sondern
              um zusammenhängende Workflows.
            </p>
            <p>
              <strong>Meeting-Vorbereitung als Komplettpaket:</strong> Sie sagen Copilot Cowork, dass Sie morgen
              um 10 Uhr ein Kundengespräch mit der Firma X haben. Cowork sucht sich die relevanten E-Mail-Verläufe
              zusammen, zieht Notizen aus vergangenen Teams-Meetings heran, identifiziert offene Punkte, reserviert
              Ihnen eine halbe Stunde Vorbereitungszeit im Kalender und erstellt ein Briefing-Dokument mit
              Gesprächsleitfaden. Das alles ohne dass Sie eine einzige App öffnen müssen.
            </p>
            <p>
              <strong>Kalender-Hygiene und Fokusschutz:</strong> Cowork analysiert Ihren Outlook-Kalender,
              identifiziert Konflikte und Meetings mit geringem Mehrwert, schlägt Änderungen vor und setzt diese
              nach Ihrer Freigabe um – inklusive Absagen, Verschiebungen und dem Einbauen von Fokusblöcken. Das
              klingt nach einer Spielerei, bis man realisiert, dass Führungskräfte in großen Organisationen
              durchschnittlich 23 Stunden pro Woche in Meetings verbringen.
            </p>
            <p>
              <strong>Produktlaunch-Workflow:</strong> Sie beschreiben das gewünschte Ergebnis: „Bereite den
              Launch für Produkt Y vor." Cowork erstellt einen Wettbewerbsvergleich in Excel, destilliert
              die Differenzierung in ein Positionierungsdokument und generiert eine Kunden-Pitch-Präsentation
              – alles gespeichert in Microsoft 365, alles mit den richtigen Berechtigungen versehen.
            </p>
            <p>
              Ich bin ehrlich: Wie gut das in der Praxis funktioniert, wird sich erst zeigen. Die Demos
              sind beeindruckend, aber jeder, der seit 2023 KI-Demos gesehen hat, weiß: zwischen Demo und
              Alltag liegen oft Welten. Was mich vorsichtig optimistisch stimmt, ist die Tatsache, dass
              Anthropic mit Claude Cowork bereits bewiesen hat, dass agentenbasierte Workflows funktionieren
              können – und dass Microsoft die Technologie nicht selbst gebaut, sondern übernommen hat. Das
              reduziert das technische Risiko.
            </p>
          </div>
        </section>

        {/* Warum nicht einfach weiter OpenAI? */}
        <section id="warum-nicht-openai" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Warum nicht einfach weiter OpenAI? Die Logik hinter der Multi-Modell-Strategie
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Frage, die mir am häufigsten gestellt wird: Wenn Microsoft 13 Milliarden Dollar in OpenAI
              investiert hat – warum baut man das wichtigste neue Feature dann auf einem Konkurrenzmodell? Die Antwort
              liegt in einer nüchternen Erkenntnis, die Microsoft schneller gezogen hat als die meisten: Kein
              einzelnes KI-Modell wird dauerhaft bei allen Aufgaben das beste sein.
            </p>
            <p>
              Anthropics Claude hat sich in bestimmten Bereichen einen messbaren Vorsprung erarbeitet:
              mehrstufige Reasoning-Aufgaben, Arbeit mit langen Dokumenten und Kontexten, und – das ist
              für den Enterprise-Einsatz entscheidend – ein konservativeres Verhalten bei unsicheren Antworten.
              Claude neigt weniger dazu, überzeugend klingende Falschantworten zu produzieren. Für einen
              Agenten, der eigenständig in Unternehmensdaten arbeitet und Entscheidungen vorbereitet, ist
              das kein Nice-to-have, sondern eine Kernqualifikation.
            </p>
            <p>
              Microsoft behandelt KI-Modelle damit zunehmend wie Datenbanken oder Cloud-Services: als
              austauschbare Infrastrukturkomponenten, die je nach Aufgabe orchestriert werden. In Copilot
              Studio konnten Unternehmen schon seit Ende 2025 zwischen verschiedenen Modellen wählen. Mit
              Wave 3 reicht die Multi-Modell-Strategie jetzt bis in das Kernprodukt. Das ist, um eine
              Parallele zu ziehen, wie der Wechsel von einem Anbieter für alle IT-Services hin zu einer
              Multi-Cloud-Strategie. Wer sich erinnert, wie umstritten das vor zehn Jahren war – und wie
              selbstverständlich es heute ist – ahnt, wohin die Reise geht.
            </p>
          </div>
        </section>

        {/* Datenschutz Europa */}
        <section id="datenschutz-europa" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was europäische Unternehmen beachten müssen: DSGVO und der Anthropic-Haken
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jetzt wird es unbequem. Und genau deshalb ist es wichtig, dass wir darüber reden, bevor
              irgendjemand den Toggle im Admin Center vorschnell aktiviert.
            </p>
            <p>
              Anthropic ist nicht Teil von Microsofts EU Data Boundary. Das bedeutet konkret: Wenn Claude
              in Copilot genutzt wird, verlassen Daten den europäischen Rechtsraum. Die Verarbeitung
              erfolgt auf Anthropics Infrastruktur in den USA. Microsoft hat das transparent kommuniziert –
              für Tenants in der EU, im EWR und in Großbritannien ist der Anthropic-Toggle im Admin Center
              standardmäßig auf „Aus" gesetzt. In allen anderen Regionen war er seit Dezember 2025 auf
              „An" – was bei einigen Datenschutzbeauftragten, die ich kenne, für erhöhten Puls gesorgt hat.
            </p>
            <p>
              Formal agiert Anthropic als Unterauftragsverarbeiter unter Microsofts Produktbedingungen und
              Data Protection Addendum. Das klingt nach einer sauberen vertraglichen Grundlage – und
              juristisch ist sie das auch. Aber die praktischen Implikationen sind nicht trivial. Unternehmen,
              die Claude in Copilot aktivieren wollen, brauchen ein Transfer Impact Assessment für den
              Datentransfer in die USA, eine dokumentierte Rechtsgrundlage nach Artikel 28 DSGVO, und
              sie müssen sicherstellen, dass ihr Verzeichnis der Verarbeitungstätigkeiten entsprechend
              aktualisiert wird.
            </p>
            <p>
              Mein Rat an die IT-Leiter und Datenschutzbeauftragten, mit denen ich arbeite: Nicht panisch
              werden, aber auch nicht im Autopilot-Modus aktivieren. Führen Sie das Gespräch mit Ihrem DSB,
              dokumentieren Sie die Entscheidung, und stellen Sie sicher, dass Sie erklären können, warum
              Sie Claude aktivieren – oder eben nicht. Für die meisten deutschen Unternehmen, die ich
              begleite, wird die pragmatische Lösung sein: Claude für Copilot Cowork gezielt für bestimmte
              Use Cases freigeben und die reguläre Copilot-Chat-Nutzung zunächst bei den bisherigen Modellen
              belassen.
            </p>
          </div>
        </section>

        {/* Was sich konkret ändert */}
        <section id="was-sich-aendert" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was sich für Copilot-Nutzer konkret ändert – und was nicht
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Für den einzelnen Wissensarbeiter ändert sich im Alltag zunächst wenig. Copilot in Word,
              Excel, PowerPoint und Outlook funktioniert wie bisher. Microsoft routet im Hintergrund
              Anfragen an das jeweils passende Modell – Nutzer merken das nicht und müssen sich nicht
              aktiv für ein Modell entscheiden. Wer den Researcher in Copilot Chat nutzt, kann dort
              allerdings explizit Claude als Modell auswählen, was sich bei Rechercheaufgaben mit langen
              Dokumenten lohnt.
            </p>
            <p>
              Die eigentliche Veränderung liegt in Copilot Cowork – und das ist derzeit noch im „Research
              Preview" mit einer begrenzten Zahl von Kunden. Microsoft plant die breitere Verfügbarkeit
              über das Frontier-Programm für Ende März 2026. Unternehmen, die auf der{" "}
              <Link to="/wissen/microsoft-365-e7-frontier-suite" className="text-primary hover:underline">
                neuen E7-Lizenzstufe
              </Link>{" "}
              (99 Euro/Nutzer/Monat) sind, bekommen Cowork automatisch. Wer eine bestehende
              Copilot-Lizenz für 30 Euro hat, erhält Zugang über das Frontier-Programm.
            </p>
            <p>
              Was sich dagegen sehr wohl ändert – und zwar sofort – ist die Anforderung an die
              IT-Administration. Der Anthropic-Toggle im Admin Center will bewusst gesteuert werden.
              Die Governance für KI-Agenten, die mit Agent 365 (ab Mai 2026 für 15 Euro/Nutzer/Monat)
              verfügbar wird, muss geplant werden. Und die Mitarbeiter brauchen ein Verständnis dafür,
              dass Copilot nicht mehr nur ein Chat ist, sondern ein Agent, der eigenständig handelt –
              mit allen Chancen und Risiken, die das mit sich bringt.
            </p>
            <p>
              Ich sage das in jedem Training und ich sage es auch hier: Die Technologie ist nie das
              Nadelöhr. Es sind die Menschen und die Prozesse. Laut Gartner scheitern 95 Prozent aller
              Copilot-Piloten beim Skalieren – nicht weil die Technik nicht funktioniert, sondern
              weil Unternehmen am{" "}
              <Link to="/wissen/copilot-unternehmensweit-einfuehren" className="text-primary hover:underline">
                Change Management sparen
              </Link>.
              Das wird mit Copilot Cowork nicht besser. Eher im Gegenteil: Einen Agenten, der
              eigenständig E-Mails liest, Kalender umräumt und Dokumente erstellt, muss man seinen
              Mitarbeitern erklären. Und zwar bevor er losläuft.
            </p>
          </div>
        </section>

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

        {/* Autor-Card */}
        <section className="mt-12 mb-6">
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col sm:flex-row gap-6 pt-6">
              <img
                src={martinLang.image}
                alt={martinLang.name}
                className="w-24 h-24 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="text-lg font-semibold">{martinLang.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{martinLang.role}</p>
                <p className="text-sm leading-relaxed">{martinLang.bio}</p>
                {martinLang.qualifications && martinLang.qualifications.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Qualifikationen:</strong> {martinLang.qualifications.join(", ")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

              <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotClaudeIntegration;
