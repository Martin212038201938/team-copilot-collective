import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "microsoft-365-e7-frontier-suite";
const PAGE_TITLE = "Microsoft 365 E7: Kosten, Inhalte und Preisvergleich der neuen Frontier Suite (2026)";

const Microsoft365E7FrontierSuite = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-ist-enthalten", title: "Was ist in Microsoft 365 E7 enthalten?", level: 2 },
    { id: "preisvergleich-e3-e5-e7", title: "Preisvergleich E3 vs. E5 vs. E7", level: 2 },
    { id: "agent-365", title: "Was ist Agent 365?", level: 2 },
    { id: "preiserhoehung-juli-2026", title: "Preiserhöhung Juli 2026", level: 2 },
    { id: "lohnt-sich-e7", title: "Lohnt sich Microsoft 365 E7?", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir nutzen E3 und Copilot – lohnt sich der Umstieg auf E7?",
      answer: "Nur wenn Sie die erweiterten Security- und Compliance-Features von E5 tatsächlich brauchen. E3 plus Copilot kostet aktuell rund 69 Euro, E7 liegt bei 99 Euro. Die Differenz von 30 Euro pro Nutzer finanziert Advanced Threat Protection, eDiscovery Premium, Insider Risk Management und Agent 365. Wenn Sie diese Features nicht einsetzen, ist E3 plus Copilot wirtschaftlicher. Die Copilotenschule berät Sie bei der optimalen Lizenzstrategie für Ihre Unternehmensgröße."
    },
    {
      name: "Was genau ist Agent 365 und brauchen wir das schon?",
      answer: "Agent 365 ist Microsofts Governance-Plattform für KI-Agenten. Sie ermöglicht es, alle KI-Agenten im Unternehmen zentral zu registrieren, zu überwachen und abzusichern – vergleichbar mit einer digitalen Personalakte für autonome KI. Wenn Sie aktuell noch keine KI-Agenten produktiv einsetzen, brauchen Sie Agent 365 noch nicht. Sobald Sie aber eigene Agenten in Copilot Studio bauen oder planen, wird die Governance relevant. Die Copilotenschule unterstützt bei der Planung und beim Aufbau einer KI-Governance-Struktur."
    },
    {
      name: "Wie bereiten wir unsere Mitarbeiter auf die Copilot-Nutzung innerhalb von E7 vor?",
      answer: "Der häufigste Fehler: Lizenzen ausrollen, ohne die Mitarbeiter mitzunehmen. Copilot entfaltet seinen Nutzen erst, wenn Anwender wissen, wie sie die KI gezielt einsetzen – vom richtigen Prompting bis zum Verständnis der Grenzen. Die Copilotenschule bietet skalierbare Trainingsformate von der Kompaktschulung bis zur mehrwöchigen Lernreise, die genau auf die Microsoft 365 Copilot-Funktionen innerhalb der E7-Suite zugeschnitten sind."
    },
    {
      name: "Gibt es Einführungsrabatte für Microsoft 365 E7?",
      answer: "Ja, Microsoft bietet zum Start befristete Nachlässe: 10 Prozent Rabatt ab 10 Lizenzen im Jahresvertrag und 15 Prozent ab 100 Lizenzen. In Kombination mit der EUR-Preissenkung vom Februar 2026 (-7,4 %) ergibt sich ein günstiges Zeitfenster bis Juni 2026, bevor die allgemeinen Preiserhöhungen im Juli greifen."
    },
    {
      name: "Ab wann ist Microsoft 365 E7 verfügbar?",
      answer: "Microsoft 365 E7 – die Frontier Suite – ist ab dem 1. Mai 2026 allgemein verfügbar. Der Preis liegt bei 99 Euro pro Nutzer und Monat (netto). Unternehmen, die aktuell Enterprise Agreements verhandeln, sollten das Timing genau prüfen: Wer vor Juli 2026 abschließt, profitiert von den niedrigeren Basispreisen und den Einführungsrabatten."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Microsoft 365 E7 (Frontier Suite) ab Mai 2026 für 99 €/Nutzer/Monat: Was enthalten ist, wie sich E7 gegen E3 und E5 rechnet und für wen sich der Umstieg lohnt.",
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
        title="Microsoft 365 E7: Kosten, Inhalte & Preisvergleich der Frontier Suite 2026"
        description="Microsoft 365 E7 (Frontier Suite) ab Mai 2026 für 99 €/Nutzer: Was enthalten ist, Preisvergleich E3 vs. E5 vs. E7, Agent 365 erklärt und für wen sich der Umstieg lohnt."
        keywords={[
          "Microsoft 365 E7",
          "Microsoft 365 E7 Kosten",
          "Microsoft 365 E7 Preise",
          "Frontier Suite",
          "Microsoft 365 Frontier Suite",
          "Microsoft 365 E7 vs E5",
          "E3 vs E5 vs E7",
          "Microsoft 365 Preiserhöhung 2026",
          "Agent 365",
          "Agent 365 was ist das",
          "Microsoft 365 E7 lohnt sich",
          "Microsoft 365 E7 Mittelstand",
          "Copilot Lizenz Kosten 2026",
          "Microsoft 365 E7 Inhalte",
          "Microsoft 365 E7 ab Mai 2026"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-03-13T10:00:00+01:00"
        modifiedTime="2026-03-13T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft 365 E7 Frontier Suite", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Microsoft 365 E7 (Frontier Suite) ab Mai 2026 für 99 €/Nutzer: Was enthalten ist, wie sich E7 gegen E3 und E5 rechnet und für wen sich der Umstieg lohnt."
        lastUpdated="13. März 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:microsoft-copilot-lizenzen",
          "wissen:ki-agenten",
          "wissen:claude-in-microsoft-copilot",
          "wissen:copilot-studio",
          "wissen:copilot-roi-berechnen"
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
              Microsoft 365 E7 – die „Frontier Suite" – bündelt ab Mai 2026 erstmals E5, Copilot, Agent 365
              und die Entra Suite in einem Paket für 99 Euro pro Nutzer und Monat. Für Unternehmen, die heute
              schon E5 und Copilot separat nutzen, spart E7 ab Juli 2026 rund 18 Euro monatlich gegenüber
              den Einzelkomponenten. Für Unternehmen auf E3 lohnt sich der Sprung nur, wenn sie die erweiterten
              Security-Features tatsächlich benötigen. E7 markiert Microsofts strategische Entscheidung, KI
              nicht mehr als Add-on, sondern als integralen Bestandteil des Enterprise-Stacks zu positionieren.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p className="text-lg leading-relaxed">
            99 Euro pro Nutzer und Monat – das ist der Preis, den Microsoft ab dem 1. Mai 2026 für sein neues
            Spitzenprodukt verlangt: Microsoft 365 E7, offiziell „The Frontier Suite" genannt. Damit schafft
            Microsoft erstmals seit der Einführung von E5 im Jahr 2015 eine neue Enterprise-Lizenzstufe. Wer
            nur die Zahl sieht, könnte das als weiteres Marketing-Upgrade abtun. Aber E7 ist mehr als ein neuer
            Preispunkt. Es markiert einen strategischen Wendepunkt in der Art, wie Microsoft KI im
            Unternehmensalltag verankern will – und es zwingt IT-Entscheider, ihre Lizenzstrategie grundlegend
            zu überdenken.
          </p>
        </div>

        {/* Was ist in Microsoft 365 E7 enthalten? */}
        <section id="was-ist-enthalten" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was ist in Microsoft 365 E7 enthalten? Die Frontier Suite im Detail
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Microsoft bündelt mit E7 vier bisher eigenständige Produkte in einem Paket. Das klingt nach dem
              üblichen Konsolidierungsspiel, das Redmond seit Jahren perfektioniert – aber die Zusammenstellung
              verrät eine klare strategische Richtung.
            </p>
            <p>
              Die E7-Suite enthält zunächst das vollständige <strong>Microsoft 365 E5</strong>, also den bisherigen
              Spitzentarif mit sämtlichen Produktivitäts-, Sicherheits- und Compliance-Funktionen inklusive
              Power BI Pro, Teams Phone und der vollständigen Defender-Suite. Dazu kommt <strong>Microsoft 365
              Copilot</strong>, die KI-Assistenz, die in Word, Excel, PowerPoint, Outlook und Teams eingebettet
              ist – bislang ein separates Add-on für 30 Euro. Neu im Paket ist <strong>Agent 365</strong>,
              Microsofts Governance-Plattform für KI-Agenten, mit der Unternehmen ihre Agenten über eine zentrale
              Kontrollschicht überwachen, absichern und steuern. Und schließlich enthält E7 die vollständige{" "}
              <strong>Microsoft Entra Suite</strong> für Identitäts- und Zugriffsmanagement sowie erweiterte
              Funktionen in Defender, Intune und Purview.
            </p>
          </div>

          {/* Microsoft-Grafik */}
          <figure className="my-8">
            <img
              src="/images/microsoft365-e7-the-frontier-suite.jpg"
              alt="Microsoft 365 E7: The Frontier Suite – Funktionsvergleich aller enthaltenen Komponenten und deren Einzelpreise"
              className="w-full rounded-lg border shadow-sm"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              „Microsoft 365 E7: The Frontier Suite" – Funktionsvergleich der enthaltenen Komponenten.
              Quelle:{" "}
              <a
                href="https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Microsoft Official Blog
              </a>
            </figcaption>
          </figure>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wer sich die Tabelle genau ansieht, erkennt den entscheidenden Unterschied zu E5: E7 ist nicht
              einfach E5 mit einem KI-Aufpreis. Es ist der erste Microsoft-Tarif, in dem KI-Funktionalität und
              Agent-Management als integrale Bestandteile behandelt werden – nicht als nachträglich hinzubuchbare
              Extras. <Link to="/wissen/copilot-studio" className="text-primary hover:underline">Copilot Studio</Link> mit dem Agent Builder, Work IQ als kontextsensitive Intelligence-Schicht,
              die auf Unternehmensdaten und Drittanbieter-Konnektoren zugreift, und das komplette
              Agent-365-Management: All das gibt es in dieser Kombination nur im E7-Paket.
            </p>
          </div>
        </section>

        {/* Preisvergleich E3 vs. E5 vs. E7 */}
        <section id="preisvergleich-e3-e5-e7" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Microsoft 365 E7 Kosten: Der vollständige Preisvergleich E3 vs. E5 vs. E7
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Preisfrage ist weniger trivial, als es die runden 99 Euro vermuten lassen. Denn die Antwort
              hängt stark davon ab, von welcher Lizenz aus man rechnet – und ob man die Microsoft 365
              Preiserhöhung ab Juli 2026 bereits einkalkuliert.
            </p>
            <p>
              <strong>Szenario 1: Unternehmen mit E5-Lizenz.</strong> Wer bereits E5 im Einsatz hat, sieht ab
              Juli 2026 folgende Einzelkosten: E5 steigt auf 60 Euro (aktuell ca. 57 Euro), Copilot liegt bei
              30 Euro, die Entra Suite bei 12 Euro und Agent 365 bei 15 Euro. In Summe wären das 117 Euro pro
              Nutzer und Monat. Die E7-Lizenz für 99 Euro spart also rund 18 Euro monatlich, was einem Rabatt
              von etwa 15 Prozent entspricht. Gartner beziffert den Discount je nach Berechnungsbasis auf 13,2
              Prozent. Bei 500 Nutzern ergibt das eine Ersparnis von über 100.000 Euro im Jahr – kein
              gewaltiger Nachlass pro Kopf, aber in der Masse spürbar.
            </p>
          </div>

          {/* Eigene Grafik: Kostenvergleich */}
          <figure className="my-8">
            <img
              src="/images/lizenzkosten-vergleich-e7.png"
              alt="Kostenvergleich der Microsoft 365 Lizenzierungsoptionen: E3, E5 und E7 im Vergleich – monatliche Kosten pro Nutzer in Euro"
              className="w-full rounded-lg border shadow-sm"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              Monatliche Kosten pro Nutzer in den gängigsten Lizenz-Szenarien. E7 wird erst im Vergleich zur
              vollen Einzelkomponenten-Kombination ab Juli 2026 wirtschaftlich attraktiv.
            </figcaption>
          </figure>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              <strong>Szenario 2: Unternehmen mit E3-Lizenz – die Mittelstandsrechnung.</strong> E3 kostet
              aktuell rund 36 Euro, ab Juli 2026 dann 39 Euro. Wer Copilot dazubucht, landet bei 69 Euro. Mit
              Agent 365 obendrauf sind es 84 Euro. Der Sprung auf E7 mit 99 Euro bedeutet dann 15 Euro mehr pro
              Nutzer – aber auch die ernste Frage, ob man die erweiterten Security- und Compliance-Features von
              E5 tatsächlich braucht. Viele mittelständische Unternehmen setzen E5-exklusive Features wie
              Advanced Threat Protection, eDiscovery Premium oder Insider Risk Management schlicht nicht ein,
              weil ihnen die personellen Ressourcen oder die regulatorische Pflicht fehlt. Für diese Unternehmen
              ist E7 kein preiswertes Bundle, sondern ein teurer Aufpreis für Funktionen, die niemand konfiguriert.
            </p>
          </div>
        </section>

        {/* Agent 365 */}
        <section id="agent-365" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was ist Agent 365? Die Governance-Plattform für KI-Agenten erklärt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Was E7 konzeptionell von einem reinen Mengenrabatt unterscheidet, ist Agent 365. Während Copilot
              inzwischen vielen IT-Entscheidern und Geschäftsführern ein Begriff ist, bleibt Agent 365 für die
              meisten noch abstrakt. Die Grundidee: Sobald Unternehmen nicht mehr nur einen einzelnen
              KI-Assistenten nutzen, sondern mehrere autonome Agenten im Einsatz haben – etwa für
              Rechnungsverarbeitung, IT-Support-Tickets oder die Qualifizierung von Vertriebsleads –, brauchen
              sie ein zentrales System, das diese digitalen Mitarbeiter genauso verwaltet wie menschliche.
              Agent 365 liefert genau das: eine Agent Registry als zentrales Verzeichnis, in dem jeder Agent
              eine eindeutige Identität über Microsoft Entra erhält, dazu Monitoring in Echtzeit,
              Sicherheitsrichtlinien und Lifecycle-Management über das Microsoft Admin Center, Defender und Purview.
            </p>
            <p>
              Gartner bewertet Agent 365 aktuell allerdings als „work in progress" und hält den eigenständigen
              Preis von 15 Euro pro Nutzer für schwer zu rechtfertigen, solange der Funktionsumfang noch im
              Aufbau ist. Das ist ein fairer Punkt. Wer heute noch keine KI-Agenten im produktiven Einsatz hat,
              zahlt mit E7 im Grunde für ein Zukunftsversprechen. Wer dagegen schon Agenten baut oder den Aufbau
              konkret plant, bekommt mit E7 eine Governance-Struktur, die in der Microsoft-Welt sonst schlicht
              nicht existiert – und die mit dem eigenständigen Agent-365-Add-on für 15 Euro monatlich auch
              separat verfügbar ist.
            </p>
          </div>
        </section>

        {/* Preiserhöhung Juli 2026 */}
        <section id="preiserhoehung-juli-2026" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Microsoft 365 Preiserhöhung Juli 2026: Warum E7 im Kontext der neuen Preise zu sehen ist
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Man kann über die E7-Preisgestaltung im Detail streiten. Was man dabei nicht übersehen darf, ist
              die parallele Preiserhöhung, die Microsoft zum 1. Juli 2026 für das gesamte kommerzielle
              Microsoft 365-Portfolio angekündigt hat. Die Erhöhungen betreffen nahezu alle Tarife: Business
              Basic steigt um 17 Prozent, Business Standard um 16 Prozent, E3 um rund 8 Prozent, E5 um gut
              5 Prozent. In Euro-Werte übersetzt bedeutet das: E3 geht von ca. 36 auf 39 Euro, E5 von ca. 57
              auf 60 Euro, Copilot bleibt bei 30 Euro.
            </p>
            <p>
              Das verändert die relative Attraktivität von E7 spürbar. Wer heute E5 plus Copilot separat kauft,
              zahlt rund 87 Euro. Ab Juli werden es 90 Euro sein. Nimmt man Agent 365 und Entra Suite dazu,
              landet man bei 117 Euro. E7 für 99 Euro wird dann zum deutlich günstigeren Gesamtpaket –
              vorausgesetzt, man nutzt tatsächlich alles, was darin enthalten ist.
            </p>
            <p>
              Copilot war bisher ein optionales Add-on: etwas, das man dazubuchen konnte, wenn man wollte.
              E7 dreht diese Logik um. KI ist hier kein Zusatz mehr, sondern integraler Bestandteil des
              Betriebssystems für Wissensarbeit. Agent-Management ist kein Experiment, sondern eine
              Enterprise-Funktion mit eigenem SKU.
            </p>
            <p>
              Ein Detail am Rande, das leicht untergeht: Copilot unterstützt in der E7-Version neben den
              OpenAI-Modellen auch Claude von Anthropic. Microsoft bewegt sich damit weg von der Abhängigkeit
              eines einzelnen KI-Anbieters und bietet Unternehmen eine Modellwahl, die in der bisherigen
              E5-plus-Copilot-Kombination nicht verfügbar war.
            </p>
          </div>
        </section>

        {/* Lohnt sich E7? */}
        <section id="lohnt-sich-e7" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Lohnt sich Microsoft 365 E7? Entscheidungshilfe für den Mittelstand und Großunternehmen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Microsoft bietet zum E7-Start befristete Einführungsrabatte an: 10 Prozent bei mindestens
              10 Lizenzen im Jahresvertrag, 15 Prozent ab 100 Lizenzen. In Kombination mit der
              EUR-Währungsanpassung vom Februar 2026, bei der Microsoft die europäischen Preise um 7,4 Prozent
              gesenkt hat, ergibt sich ein interessantes Fenster. Wer zwischen Februar und Juni 2026 abschließt,
              profitiert von niedrigeren EUR-Preisen und den Einführungsrabatten, bevor die allgemeinen
              Preiserhöhungen im Juli greifen. Für IT-Einkäufer, die aktuell Enterprise Agreements verhandeln,
              kann die Kombination aus Währungskorrektur, Einführungsrabatt und dem Umstand, dass EA-Preise erst
              bei Verlängerung angepasst werden, den effektiven E7-Preis pro Nutzer deutlich drücken.
            </p>
            <p>
              Microsoft 365 E7 ist kein Pflichtupgrade für jedes Unternehmen. Es ist ein strategisches Bundle,
              das sich an Organisationen richtet, die drei Voraussetzungen gleichzeitig mitbringen: Sie nutzen
              bereits E5 oder haben konkreten Bedarf an dessen Security- und Compliance-Funktionen. Sie setzen
              Copilot produktiv ein oder planen den unternehmensweiten Rollout in den kommenden Monaten. Und sie
              bauen KI-Agenten oder stehen kurz davor.
            </p>
            <p>
              Wer zwei dieser drei Kriterien nicht erfüllt, fährt mit E3 plus Copilot deutlich günstiger und
              kann Agent 365 als Einzellizenz nachbuchen, wenn der Agent-Einsatz tatsächlich spruchreif wird.
              Gerade für mittelständische Unternehmen, die noch am Anfang ihrer Copilot-Einführung stehen, ist
              die Kombination aus E3 und dem neuen, günstigeren Copilot Business (ab 21 Euro für Unternehmen
              unter 300 Nutzern) oft der wirtschaftlichere Einstieg.
            </p>
            <p>
              Was E7 aber unmissverständlich klarmacht: Microsoft betrachtet KI nicht länger als optionales
              Zusatzgeschäft, sondern als Kern seiner Enterprise-Plattform. Wer langfristig im
              Microsoft-Ökosystem plant, sollte E7 nicht als heutigen Kaufentscheid betrachten – sondern als
              die Richtung, in die sich die gesamte Lizenzlandschaft bewegt. Die Frage ist nicht ob, sondern
              wann KI-Governance und Agent-Management zum Standard werden. Und wer Copilot dann produktiv
              einsetzen will, braucht nicht nur die richtige Lizenz, sondern auch Teams, die wissen, wie man
              mit KI-Assistenten und Agenten tatsächlich arbeitet.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Häufig gestellte Fragen zu Microsoft 365 E7
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Quellen</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                Microsoft Official Blog: Introducing the First Frontier Suite (9. März 2026)
              </a>
            </li>
            <li>
              <a href="https://www.microsoft.com/en-us/microsoft-365/blog/2025/12/04/advancing-microsoft-365-new-capabilities-and-pricing-update/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                Microsoft 365 Blog: Advancing Microsoft 365 – New capabilities and pricing update (4. Dezember 2025)
              </a>
            </li>
            <li>
              <a href="https://www.microsoft.com/en-us/microsoft-agent-365" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                Microsoft: Agent 365 – The Control Plane for Agents
              </a>
            </li>
            <li>
              <a href="https://samexpert.com/microsoft-365-e7-licensing-guide/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                SAMexpert: Microsoft 365 E7 Licensing Guide
              </a>
            </li>
            <li>
              <a href="https://samexpert.com/microsoft-365-july-2026-price-increase/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                SAMexpert: Microsoft 365 July 2026 Price Increase – The Real Cost
              </a>
            </li>
          </ul>
        </section>

      </ContentLayout>
    </>
  );
};

export default Microsoft365E7FrontierSuite;
