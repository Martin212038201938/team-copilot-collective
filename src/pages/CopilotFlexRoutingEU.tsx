import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-flex-routing-eu-verarbeitung";
const PAGE_TITLE = "Microsoft Copilot Flex Routing: KI-Verarbeitung außerhalb der EU – was Admins jetzt tun müssen";

const CopilotFlexRoutingEU = () => {
  const martinLang = getAuthor("martin-lang")!;
  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-ist-flex-routing", title: "Was ist Flex Routing?", level: 2 },
    { id: "admin-einstellung", title: "Die Admin-Einstellung: So deaktivieren Sie Flex Routing", level: 2 },
    { id: "power-platform", title: "Copilot Studio und Power Platform: separate Einstellung", level: 2 },
    { id: "compliance-einordnung", title: "Compliance-Einordnung: Wer muss handeln?", level: 2 },
    { id: "transparenz", title: "Zur Transparenz dieser Änderung", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Müssen wir Flex Routing zwingend abschalten, oder reicht es, die Einstellung zu dokumentieren?",
      answer: "Das hängt von Ihrer Datenschutz- und Compliance-Architektur ab. Für Unternehmen, die explizit auf das EU Data Boundary Commitment von Microsoft verwiesen haben – etwa in Datenschutz-Folgenabschätzungen, Betriebsvereinbarungen oder gegenüber einem Datenschutzbeauftragten – sollten Flex Routing deaktivieren, bis sie rechtlich geprüft haben, ob die pseudonymisierte Verarbeitung außerhalb der EU mit bestehenden Regelungen vereinbar ist. Die bloße Dokumentation ohne Deaktivierung schützt nicht vor Compliance-Risiken."
    },
    {
      name: "Unsere Rechtsabteilung fragt: Sind durch Flex Routing personenbezogene Daten betroffen?",
      answer: "Microsoft spricht von pseudonymisierten Daten, die zur Verarbeitung weitergeleitet werden. Ob pseudonymisierte Daten im Sinne der DSGVO als personenbezogen gelten, ist rechtlich nicht abschließend geklärt – insbesondere wenn eine Re-Identifikation theoretisch möglich bleibt. Die konservative Einschätzung vieler Datenschutzbeauftragter ist: im Zweifel ja. Für EU-Unternehmen mit strikten DPA-Vorgaben empfiehlt die Copilotenschule, Flex Routing bis zu einer rechtlichen Klärung deaktiviert zu lassen."
    },
    {
      name: "Wir haben Copilot Studio im Einsatz – reicht es, Flex Routing im M365 Admin Center abzuschalten?",
      answer: "Nein, nicht vollständig. Für Copilot Studio, Power Platform und Dynamics 365 gelten eigenständige Einstellungen im Power Platform Admin Center. Das M365 Admin Center steuert nur Microsoft 365 Copilot und Copilot Chat. Wer beide Produkte nutzt, muss in beiden Admin-Bereichen prüfen und bei Bedarf handeln."
    },
    {
      name: "Der Betriebsrat hat gefragt, ob Flex Routing mitbestimmungspflichtig ist – was antworten wir?",
      answer: "Das ist eine Frage, die mit dem Betriebsrat und dem Datenschutzbeauftragten gemeinsam zu klären ist. Als Faustformel gilt: Wenn Copilot-Nutzung im Betrieb mitbestimmungsrelevant war (weil damit Leistungs- oder Verhaltenskontrolle möglich ist), dann ist eine Änderung der technischen Verarbeitungsinfrastruktur – auch durch Flex Routing – mindestens informationspflichtig, möglicherweise mitbestimmungspflichtig. Die Copilotenschule empfiehlt, Betriebsräte proaktiv zu informieren, bevor April 17 verstrichen ist."
    },
    {
      name: "Wie erfahren wir von zukünftigen Änderungen dieser Art rechtzeitig, ohne täglich das Message Center zu überwachen?",
      answer: "Microsoft kommuniziert solche Änderungen über das Microsoft 365 Message Center. Administratoren können dort Kategoriefilter und E-Mail-Benachrichtigungen konfigurieren, sodass relevante Nachrichten direkt ins Postfach kommen. Für den Bereich Datenschutz und Compliance empfiehlt sich ein wöchentlicher Review-Termin oder ein automatisches Routing an den Datenschutzbeauftragten. Die Copilotenschule begleitet Unternehmen beim Aufbau solcher Governance-Prozesse im Rahmen unserer Copilot-Einführungsberatung."
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Microsoft Copilot Flex Routing ab 17. April 2026: KI-Verarbeitung kann temporär außerhalb der EU stattfinden. Was Admins jetzt in den Admin-Einstellungen tun müssen und wen es betrifft.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-04-09",
        "dateModified": "2026-04-09",
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
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
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
        title="Copilot Flex Routing: EU-Verarbeitung & Admin-Einstellungen | copilotenschule.de"
        description="Ab 17. April 2026 kann Copilot KI-Verarbeitung temporär außerhalb der EU stattfinden. Was Admins in den Admin-Einstellungen jetzt tun müssen – Schritt für Schritt."
        keywords={[
          "Copilot Verarbeitung in EU",
          "Copilot Admin Einstellungen",
          "Copilot Flex Routing",
          "Microsoft 365 Copilot EU Data Boundary",
          "Flex Routing deaktivieren",
          "Copilot Datenschutz EU",
          "Microsoft Copilot außerhalb EU",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-04-09T09:00:00+02:00"
        modifiedTime="2026-04-09T09:00:00+02:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Flex Routing EU", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Ab 17. April 2026 aktiv – und standardmäßig eingeschaltet"
        lastUpdated="09. April 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:copilot-sicherheit-datenschutz",
          "training:copilot-compliance-datenschutz",
          "wissen:copilot-betriebsrat",
          "wissen:ki-schulung-mitarbeiter-pflicht",
          "workshop:betriebsrat-ki-workshop"
        ]}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-orange-800 dark:text-orange-300">
              Das Wichtigste in Kürze
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-900 dark:text-orange-200">
              Microsoft hat für EU- und EFTA-Kunden eine neue Funktion namens Flex Routing eingeführt: Bei Spitzenlast kann die KI-Verarbeitung (LLM-Inferenz) von Copilot-Prompts temporär in die USA, nach Kanada oder Australien verlagert werden. Gespeicherte Daten bleiben laut Microsoft in der EU – pseudonymisierte Daten können jedoch außerhalb gespeichert werden. Für Tenants, die nach dem 25. März 2026 erstellt wurden, ist Flex Routing standardmäßig aktiv. Für bestehende Tenants gilt: Message Center prüfen. Admins müssen die Einstellung ggf. aktiv deaktivieren.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p>
            Microsoft hat über das Message Center eine Änderung angekündigt, die für viele Unternehmen datenschutz- und compliance-relevant ist: <strong>Copilot Flex Routing</strong>. Die Funktion ist verfügbar für Kunden mit Registrierungsstandort in der EU oder EFTA. Dieser Artikel erklärt sachlich, was sich ändert, wen es betrifft und was in den Admin-Einstellungen zu tun ist – auf Basis der offiziellen Microsoft-Dokumentation.
          </p>
        </div>

        {/* Was ist Flex Routing */}
        <section id="was-ist-flex-routing" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was ist Flex Routing?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Flex Routing bezeichnet die Möglichkeit von Microsoft, die <strong>LLM-Inferenz</strong> – also die eigentliche KI-Verarbeitung eines Copilot-Prompts – bei hoher Auslastung temporär außerhalb der EU-Datengrenze durchzuführen. Wenn Flex Routing aktiv ist, kann die Verarbeitung laut Microsoft in den <strong>USA, Kanada oder Australien</strong> stattfinden. Microsoft nennt als Begründung Performance und Verfügbarkeit.
            </p>
            <p>
              Daten bleiben laut Microsoft in Ruhe innerhalb der EU-Datengrenze gespeichert – mit einer Ausnahme: <strong>begrenzte pseudonymisierte Daten</strong> können für Sicherheits- und Betriebszwecke auch außerhalb der EU gespeichert werden. In Transit sind alle Daten verschlüsselt.
            </p>

            <p>
              Vier Fakten, die Admins sofort kennen müssen:
            </p>
            <ul>
              <li><strong>Default abhängig vom Tenant:</strong> Für Tenants, die <em>nach dem 25. März 2026</em> erstellt wurden, ist Flex Routing standardmäßig aktiv. Für bestehende Tenants ist der Default je nach Tenant-Typ unterschiedlich: Laut Message Center Posts soll Flex Routing für Enterprise-Tenants, Public-Sector-Tenants und Tenants mit Advanced Data Residency standardmäßig <em>deaktiviert</em> bleiben. Für SMB- und Bildungseinrichtungen kann das abweichen. <strong>Verbindlich ist der spezifische Message Center Post im eigenen Admin Center</strong> – dort steht, welcher Default für den eigenen Tenant gilt.</li>
              <li><strong>Geltungsbereich M365:</strong> Die Einstellung im Microsoft 365 Admin Center gilt für Microsoft 365 Copilot und Copilot Chat.</li>
              <li><strong>Geltungsbereich Power Platform:</strong> <Link to="/wissen/copilot-studio" className="text-primary hover:underline">Copilot Studio</Link>, Dynamics 365 und Power Platform haben eine separate Einstellung im Power Platform Admin Center.</li>
              <li><strong>Abschaltbar:</strong> Die Einstellung lässt sich jederzeit deaktivieren – sie muss aber aktiv gefunden und ausgeschaltet werden. Ist sie im M365 Admin Center deaktiviert, ist sie automatisch auch im Power Platform Admin Center gesperrt.</li>
            </ul>
            <p>
              <strong>Nicht betroffen:</strong> Unternehmen, die Multi-Geo-Kapazitäten bei Microsoft gebucht haben, können Flex Routing nicht nutzen – die Einstellung erscheint für sie im Admin Center gar nicht, auch wenn der Tenant in der EU registriert ist.
            </p>
          </div>
        </section>

        {/* Admin-Einstellung */}
        <section id="admin-einstellung" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Die Admin-Einstellung: So deaktivieren Sie Flex Routing
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Weg zur Einstellung im <strong>Microsoft 365 Admin Center</strong>:
            </p>
            <ol>
              <li>Microsoft 365 Admin Center öffnen (<span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">admin.microsoft.com</span>)</li>
              <li>Im linken Menü: <strong>Copilot</strong></li>
              <li>Reiter: <strong>Settings</strong></li>
              <li>Einstellung: <strong>Flexible inferencing during peak load periods</strong></li>
              <li>Option deaktivieren</li>
            </ol>
            <p>
              Die Einstellung wirkt auf Microsoft 365 Copilot und Copilot Chat. Eine Bestätigung oder Warnung durch Microsoft vor dem Speichern ist nicht dokumentiert – die Änderung tritt unmittelbar in Kraft.
            </p>
          </div>
        </section>

        {/* Power Platform */}
        <section id="power-platform" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Copilot Studio und Power Platform: separate Einstellung
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wer neben Microsoft 365 Copilot auch <strong>Copilot Studio, Power Platform oder Dynamics 365</strong> mit Copilot-Funktionen einsetzt, muss zusätzlich das <strong>Power Platform Admin Center</strong> prüfen. Die Einstellung im M365 Admin Center gilt dort nicht automatisch.
            </p>
            <p>
              Microsoft gibt an, dass die Power Platform-Konfiguration sich an der M365-Konfiguration orientiert, sofern dort keine restriktivere Einstellung vorgenommen wurde. In der Praxis bedeutet das: Wer sicherstellen will, dass auch Power Platform-basierte Copilot-Szenarien innerhalb der EU verarbeitet werden, muss die Einstellung im Power Platform Admin Center explizit setzen und sollte sich nicht allein auf die M365-Konfiguration verlassen.
            </p>
          </div>
        </section>

        {/* Compliance-Einordnung */}
        <section id="compliance-einordnung" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Compliance-Einordnung: Wer muss handeln?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Nicht jedes Unternehmen ist gleich betroffen. Wer keine spezifischen Anforderungen an die EU-Verarbeitung hat und keine vertraglichen oder regulatorischen Verpflichtungen in diese Richtung eingegangen ist, muss Flex Routing nicht zwingend abschalten. Die Entscheidung sollte jedoch bewusst getroffen und dokumentiert werden – nicht stillschweigend übergangen.
            </p>
            <p>
              Erhöhter Handlungsbedarf besteht für Unternehmen, die:
            </p>
            <ul>
              <li>sich vertraglich auf das <strong>EU Data Boundary Commitment</strong> von Microsoft berufen haben,</li>
              <li>eine <strong>Datenschutz-Folgenabschätzung (DPIA)</strong> für Copilot durchgeführt haben, in der die EU-Verarbeitung als Voraussetzung dokumentiert ist,</li>
              <li>eine <strong>Betriebsvereinbarung zu Copilot</strong> abgeschlossen haben, die auf die EU-Infrastruktur verweist,</li>
              <li>in Branchen mit strengen <strong>Datenlokalisierungsanforderungen</strong> tätig sind (Gesundheitswesen, Finanzsektor, öffentlicher Dienst).</li>
            </ul>
            <p>
              Für diese Unternehmen ist die Frage nicht, ob sie handeln müssen, sondern wann. Die Einstellung sollte vor dem 17. April 2026 deaktiviert sein, damit keine Phase entsteht, in der Flex Routing aktiv ist, ohne dass eine bewusste Entscheidung dazu vorliegt. Datenschutzbeauftragte und Betriebsräte sollten informiert werden – letztere insbesondere dann, wenn die ursprüngliche Zustimmung zur Copilot-Einführung auf der Zusage der EU-seitigen Verarbeitung basiert hat.
            </p>
            <p>
              Die Frage, ob pseudonymisierte Daten im Sinne der DSGVO als personenbezogen gelten, ist rechtlich nicht abschließend geklärt. Wer auf Nummer sicher gehen will, schaltet Flex Routing ab, bis eine rechtliche Prüfung vorliegt. Das ist die konservativere, aber auch die eindeutigere Position.
            </p>
          </div>
        </section>

        {/* Transparenz */}
        <section id="transparenz" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Zur Transparenz dieser Änderung
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die technische Motivation hinter Flex Routing ist nachvollziehbar: Wer hohe Verfügbarkeit und schnelle Antwortzeiten bei einem globalen KI-Dienst garantieren will, braucht Flexibilität in der Infrastruktur. Das ist keine böswillige Entscheidung von Microsoft, sondern ein klassischer Trade-off zwischen Performance und Datensouveränität.
            </p>
            <p>
              Was kritisch bleibt, ist der Prozess: Die Funktion ist standardmäßig aktiviert. Die Ankündigung erfolgte kurzfristig über das Message Center – einem Kanal, den längst nicht jede Organisation systematisch auswertet. Unternehmen, die ihre Datenschutz-Dokumentation nicht aktiv pflegen oder kein strukturiertes Governance-Monitoring betreiben, laufen Gefahr, diese Änderung schlicht zu verpassen.
            </p>
            <p>
              Das ist das eigentliche Risiko – nicht Flex Routing als solches, sondern die Tatsache, dass Microsoft Einstellungen mit Compliance-Relevanz im Tenant aktiviert, ohne dass Admins oder Datenschutzbeauftragte automatisch benachrichtigt werden. Wer Copilot in Unternehmen verantwortlich betreiben will, braucht einen strukturierten Prozess für genau diese Art von Änderungen.
            </p>
            <p>
              Wenn Sie dabei Unterstützung suchen – beim Aufbau eines Copilot-Governance-Prozesses, bei der Prüfung bestehender Datenschutzdokumentation oder bei der Schulung interner Administratoren – sprechen Sie uns an. Die{" "}
              <Link to="/unsere-angebote" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                Copilotenschule unterstützt Unternehmen beim verantwortungsvollen Betrieb von Microsoft Copilot
              </Link>
              {" "}– technisch und organisatorisch.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Autor */}
        <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <img
              src={martinLang.image}
              alt={martinLang.name}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{martinLang.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{martinLang.role}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{martinLang.bio}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {martinLang.qualifications.join(" · ")}
              </p>
            </div>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default CopilotFlexRoutingEU;
