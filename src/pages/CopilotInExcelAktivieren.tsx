import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-in-excel-aktivieren";
const PAGE_TITLE = "Copilot in Excel aktivieren: Schritt-für-Schritt für Unternehmen";

const CopilotInExcelAktivieren = () => {
  const martinLang = getAuthor("martin-lang")!;
  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "voraussetzungen", title: "Voraussetzungen: Was muss vorher stimmen?", level: 2 },
    { id: "schritt-fuer-schritt", title: "Schritt-für-Schritt: Copilot in Excel aktivieren", level: 2 },
    { id: "was-beachten", title: "Was Sie beachten sollten", level: 2 },
    { id: "datenschutz", title: "Datenschutz: Konfigurationsoptionen für Unternehmen", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Copilot erscheint in Excel nicht, obwohl wir Lizenzen haben – woran liegt das?",
      answer: "Das häufigste Problem ist, dass die Lizenz zwar im Tenant vorhanden ist, aber dem jeweiligen Nutzer noch nicht zugewiesen wurde. Prüfen Sie im Microsoft 365 Admin Center unter 'Lizenzen', ob die Microsoft 365 Copilot-Lizenz dem Nutzer direkt oder über eine Gruppe zugewiesen ist. Außerdem muss Excel auf dem neuesten Stand sein – ältere Versionen zeigen den Copilot-Button nicht. In unseren Copilot-Trainings zeigen wir IT-Abteilungen, wie sie diese Rollout-Probleme systematisch auflösen."
    },
    {
      name: "Wie stellen wir sicher, dass Copilot keine sensiblen Unternehmensdaten nach außen gibt?",
      answer: "Microsoft verarbeitet Ihre Prompts und Antworten im Rahmen des EU Data Boundary Commitments innerhalb Europas und gibt diese nicht zum Training von KI-Modellen weiter. Zusätzlich sollten Unternehmen im Microsoft 365 Admin Center die Connected Experiences und optionale telemetriedaten-Einstellungen prüfen. Für höhere Sicherheitsanforderungen empfiehlt sich Copilot in Kombination mit Microsoft Purview für Data Loss Prevention. Die Copilotenschule unterstützt Sie dabei, die richtigen Datenschutzkonfigurationen für Ihre Organisation zu wählen."
    },
    {
      name: "Unsere IT sagt, die Aktivierung von Copilot in Excel dauert Wochen – stimmt das?",
      answer: "Die technische Bereitstellung selbst dauert nach Lizenzzuweisung in der Regel nur wenige Stunden bis maximal 24 Stunden (Tenant-weite Aktivierungen können bis zu 72 Stunden brauchen). Was tatsächlich Wochen dauert, ist der sinnvolle Rollout: Nutzer müssen wissen, wie sie Copilot effektiv einsetzen. Ohne Begleitung landen Unternehmen bei einer Aktivierungsrate von 20 bis 30 Prozent – der Rest probiert es einmal, ist enttäuscht und lässt es bleiben. Die Copilotenschule begleitet Unternehmen durch einen strukturierten Rollout-Prozess."
    },
    {
      name: "Müssen alle Dateien in OneDrive liegen, damit Copilot in Excel funktioniert?",
      answer: "Für den vollen Funktionsumfang ja. Copilot in Excel benötigt AutoSave, und AutoSave funktioniert nur mit Dateien auf OneDrive oder SharePoint. Lokal gespeicherte Dateien oder Netzlaufwerke werden nicht unterstützt. Das ist für viele Unternehmen der eigentliche Stolperstein – nicht die Lizenz, sondern die Dateiablage. Wer Copilot einführt, muss gleichzeitig die OneDrive-Migration angehen."
    },
    {
      name: "Wie überzeugen wir die Fachabteilungen, Copilot in Excel wirklich zu nutzen – und nicht nur kurz auszuprobieren?",
      answer: "Der Schlüssel ist, Copilot anhand echter Arbeitsdateien der jeweiligen Abteilung zu demonstrieren – keine Beispieldaten, sondern echte monatliche Reports, echte Auswertungen. Wenn Controller sehen, wie Copilot ihre eigene Pivot-Analyse in Sekunden erstellt, ist die Überzeugungsarbeit getan. Die Copilotenschule führt abteilungsspezifische Copilot-Workshops durch, in denen Mitarbeitende mit ihren eigenen Daten arbeiten."
    },
    {
      name: "Können wir Copilot in Excel nur für bestimmte Abteilungen freischalten?",
      answer: "Ja. Im Microsoft 365 Admin Center können Administratoren die Copilot-Lizenz selektiv zuweisen – entweder über Benutzergruppen oder einzelne Konten. Es ist sinnvoll, mit einer Pilotgruppe zu beginnen, Learnings zu sammeln und den Rollout dann sukzessive auszuweiten. Wir empfehlen, die erste Gruppe bewusst aus technikaffinen Mitarbeitenden zu wählen, die als interne Multiplikatoren fungieren können."
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Copilot in Excel aktivieren: Schritt-für-Schritt-Anleitung für IT-Administratoren und Unternehmen. Voraussetzungen, Aktivierung, Datenschutzkonfiguration und häufige Fehler.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-04-08",
        "dateModified": "2026-04-08",
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
        title="Copilot in Excel aktivieren: Schritt-für-Schritt | copilotenschule.de"
        description="Copilot in Excel aktivieren: Voraussetzungen, Schritt-für-Schritt-Anleitung für Unternehmen, Datenschutzkonfiguration und typische Fehler beim Rollout."
        keywords={[
          "Copilot in Excel aktivieren",
          "Microsoft 365 Copilot Excel",
          "Copilot Excel einrichten",
          "Copilot Excel freischalten",
          "Microsoft Copilot Excel Unternehmen",
          "Copilot Excel Datenschutz",
          "Microsoft 365 Copilot Rollout",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-04-08T09:00:00+02:00"
        modifiedTime="2026-04-08T09:00:00+02:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot in Excel aktivieren", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Voraussetzungen, Aktivierung, Datenschutz und typische Stolperstellen beim Unternehmens-Rollout"
        lastUpdated="08. April 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:copilot-fuer-excel",
          "training:microsoft-365-copilot-praxis",
          "wissen:microsoft-copilot-lizenzen",
          "wissen:copilot-im-unternehmen-einfuehren-leitfaden",
          "wissen:copilot-fehler-vermeiden"
        ]}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-orange-800 dark:text-orange-300">
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-900 dark:text-orange-200">
              Copilot in Excel funktioniert, wenn drei Bedingungen erfüllt sind: eine zugewiesene Microsoft 365 Copilot-Lizenz, eine aktuelle Version von Microsoft 365 Apps und die Datei auf OneDrive oder SharePoint mit aktiviertem AutoSave. Fehlt eine dieser drei Voraussetzungen, erscheint der Copilot-Button in Excel entweder gar nicht oder bleibt ausgegraut. Die Aktivierung selbst ist im Admin Center in wenigen Minuten erledigt – der eigentliche Aufwand liegt in der Vorbereitung.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p>
            Wer in Unternehmen für die Einführung von Microsoft Copilot zuständig ist, stellt schnell fest: Die Lizenz kaufen ist das Einfachste. Was danach kommt – Zuweisung, technische Voraussetzungen, Datenschutzkonfiguration – ist oft weniger klar dokumentiert als erhofft. Dieser Artikel gibt eine direkte Schritt-für-Schritt-Anleitung für IT-Administratoren und Projektverantwortliche, die Copilot in Excel für ihre Organisation freischalten wollen.
          </p>
        </div>

        {/* Voraussetzungen */}
        <section id="voraussetzungen" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Voraussetzungen: Was muss vorher stimmen?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Bevor Copilot in Excel erscheint, müssen drei technische Grundbedingungen erfüllt sein – und alle drei müssen gleichzeitig gelten:
            </p>

            <p>
              <strong>Lizenz:</strong> Jeder Nutzer benötigt eine zugewiesene Microsoft 365 Copilot-Lizenz (ehemals "Microsoft Copilot for Microsoft 365"). Diese ist ein kostenpflichtiger Add-on zu bestehenden Microsoft 365-Abonnements (z. B. M365 Business Standard, Business Premium, E3, E5). Eine Tenant-weite Lizenz ohne Zuweisung an einzelne Nutzer reicht nicht – die Zuweisung muss auf Nutzer- oder Gruppenebene erfolgen.
            </p>

            <p>
              <strong>Microsoft 365 Apps:</strong> Copilot in Excel ist ausschließlich in der Desktop-App verfügbar und setzt einen aktuellen Build der Microsoft 365 Apps (Build 16.0.16327 oder neuer) voraus. Ältere Office-Versionen wie Office 2019 oder Office 2021 werden nicht unterstützt. Im Browser (Excel für das Web) ist der Funktionsumfang eingeschränkter – für den vollen Copilot-Umfang empfiehlt sich die Desktop-App.
            </p>

            <p>
              <strong>OneDrive/SharePoint mit AutoSave:</strong> Copilot in Excel funktioniert nur mit Dateien, bei denen AutoSave aktiv ist – also Dateien, die in OneDrive oder SharePoint gespeichert sind. Lokal gespeicherte Dateien, Netzlaufwerke und UNC-Pfade werden nicht unterstützt. Wer seine Daten noch auf klassischen Netzlaufwerken verwaltet, muss diesen Schritt parallel zur Copilot-Einführung angehen.
            </p>

            <p>
              Zusätzlich benötigen Nutzer ein Microsoft Entra ID-Konto (früher Azure AD), was in den meisten Unternehmensumgebungen standardmäßig vorhanden ist.
            </p>
          </div>
        </section>

        {/* Schritt-für-Schritt */}
        <section id="schritt-fuer-schritt" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Schritt-für-Schritt: Copilot in Excel aktivieren
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die folgende Anleitung richtet sich an Administratoren mit Zugang zum Microsoft 365 Admin Center.
            </p>

            <p>
              <strong>Schritt 1 – Admin Center öffnen:</strong> Melden Sie sich unter <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">admin.microsoft.com</span> mit einem globalen Administrator- oder Lizenz-Administrator-Konto an.
            </p>

            <p>
              <strong>Schritt 2 – Lizenz zuweisen:</strong> Navigieren Sie zu <em>Benutzer &gt; Aktive Benutzer</em>. Wählen Sie den oder die Nutzer aus, denen Copilot zugewiesen werden soll. Unter dem Tab <em>Lizenzen und Apps</em> aktivieren Sie die Microsoft 365 Copilot-Lizenz. Bei großen Gruppen empfiehlt sich die gruppenbasierte Lizenzzuweisung über <em>Microsoft Entra ID &gt; Gruppen</em>.
            </p>

            <p>
              <strong>Schritt 3 – Propagierungszeit abwarten:</strong> Die Lizenzzuweisung wirkt in der Regel innerhalb weniger Stunden. In manchen Tenants kann es bis zu 24 Stunden dauern, bis Copilot in den Apps erscheint. Bei Erstaktivierungen im Tenant (erste Copilot-Lizenz überhaupt) sind bis zu 72 Stunden möglich.
            </p>

            <p>
              <strong>Schritt 4 – Excel aktualisieren:</strong> Nutzer sollten sicherstellen, dass Microsoft 365 Apps auf dem neuesten Stand ist. In Excel: <em>Datei &gt; Konto &gt; Updateoptionen &gt; Jetzt aktualisieren</em>. Alternativ kann die IT-Abteilung Updates über Microsoft Endpoint Manager oder WSUS zentral ausrollen.
            </p>

            <p>
              <strong>Schritt 5 – Datei auf OneDrive/SharePoint öffnen:</strong> Der Nutzer öffnet eine Excel-Datei, die auf OneDrive oder SharePoint gespeichert ist, und stellt sicher, dass AutoSave (oben links in der Titelleiste) aktiviert ist. Bei lokalen Dateien erscheint der Copilot-Button nicht.
            </p>

            <p>
              <strong>Schritt 6 – Copilot-Button finden:</strong> Nach erfolgreicher Aktivierung erscheint in Excel im Ribbon-Bereich unter dem Tab <em>Start</em> ganz rechts ein Copilot-Symbol. Ein Klick öffnet den Copilot-Seitenbereich. Wenn der Button fehlt, sind die Schritte 1–5 auf Vollständigkeit zu prüfen.
            </p>

            <p>
              <strong>Schritt 7 – Daten als Tabelle formatieren:</strong> Damit Copilot sinnvoll mit den Daten arbeiten kann, sollten Zellbereiche als Excel-Tabelle formatiert sein (<em>Einfügen &gt; Tabelle</em> oder Tastenkürzel <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">Strg + T</span>). Ohne Tabellenformat sind viele Copilot-Funktionen eingeschränkt oder unzuverlässig. Das ist kein technisches Aktivierungsproblem, aber ein häufiger Grund, warum Nutzer frustriert aufgeben.
            </p>
          </div>
        </section>

        {/* Was beachten */}
        <section id="was-beachten" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Was Sie beachten sollten
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Aktivierungsrate in Unternehmen liegt erfahrungsgemäß zwischen 20 und 40 Prozent, wenn Copilot ohne Begleitung ausgerollt wird. Nutzer schalten Copilot kurz an, stellen fest, dass ihre Daten nicht als Tabelle formatiert sind oder die Datei auf einem Netzlaufwerk liegt, und lassen es bleiben. Technische Aktivierung und tatsächliche Nutzung sind zwei verschiedene Dinge – und der Abstand zwischen beiden kostet Unternehmen viel Lizenzgeld.
            </p>

            <p>
              Wer Copilot in Excel sinnvoll einführen will, sollte drei Punkte beachten: Erstens sollte die OneDrive-Ablage für relevante Arbeitsdateien vor dem Copilot-Rollout geklärt sein. Es bringt wenig, Copilot freizuschalten, wenn die Dateien noch auf Netzlaufwerken liegen. Zweitens ist ein minimales Training unverzichtbar – nicht als Pflichtveranstaltung, sondern als kurze, praxisnahe Einführung mit echten Arbeitsdaten. Drittens sollten Tabellenformatierung und saubere Spaltenüberschriften als Voraussetzung kommuniziert werden, damit Copilot zuverlässig funktioniert.
            </p>

            <p>
              Eine häufig übersehene Einschränkung: Copilot in Excel unterstützt keine Makros und VBA-Code, keine passwortgeschützten Arbeitsmappen und keine Dateien im alten .xls-Format (nur .xlsx). Wer viele Legacy-Dateien in seinem Unternehmen hat, wird hier auf Probleme stoßen.
            </p>
          </div>
        </section>

        {/* Datenschutz */}
        <section id="datenschutz" className="mb-6 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Datenschutz: Konfigurationsoptionen für Unternehmen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Microsoft verarbeitet Copilot-Daten im Rahmen des <strong>EU Data Boundary</strong>-Commitments: Prompts, Antworten und verarbeitete Inhalte bleiben innerhalb der EU und werden nicht für das Training öffentlicher KI-Modelle genutzt. Das gilt für alle kommerziellen Microsoft 365 Copilot-Lizenzen.
            </p>

            <p>
              Darüber hinaus stehen Unternehmen folgende Konfigurationsoptionen zur Verfügung:
            </p>

            <p>
              <strong>Connected Experiences steuern:</strong> Im Microsoft 365 Admin Center (<em>Einstellungen &gt; Organisationseinstellungen &gt; Dienste &gt; Microsoft 365-Einstellungen für verbundene Erfahrungen</em>) können Administratoren bestimmte cloudbasierte Analysefunktionen deaktivieren. Diese Einstellung betrifft nicht Copilot direkt, aber andere datenbasierte Features in Office-Apps.
            </p>

            <p>
              <strong>Optionale verbundene Erfahrungen:</strong> Unter <em>Einstellungen &gt; Datenschutz</em> können Administratoren die optionalen Connected Experiences zentral abschalten, falls die eigene Datenschutzrichtlinie das verlangt. Copilot selbst ist davon nicht betroffen, aber der Vollständigkeit halber ist diese Einstellung bei jeder Copilot-Einführung zu prüfen.
            </p>

            <p>
              <strong>Microsoft Purview für sensible Daten:</strong> Für Unternehmen mit erhöhten Compliance-Anforderungen empfiehlt sich Microsoft Purview Information Protection in Kombination mit Copilot. Dateien mit Vertraulichkeitsbezeichnungen (Sensitivity Labels) werden von Copilot respektiert – wenn eine Datei als "Streng vertraulich" eingestuft ist, kann Copilot die Inhalte zwar lesen und analysieren, gibt sie aber nicht in andere Kontexte weiter. Das ist ein wichtiger Schutz, wenn Copilot auch mit HR- oder Finanzdaten eingesetzt wird.
            </p>

            <p>
              <strong>Semantic Index deaktivieren (optional):</strong> Der Microsoft Graph Semantic Index ermöglicht es Copilot, über Dateien und E-Mails hinweg zu suchen und zu verknüpfen. Wer dieses Feature aus Datenschutzgründen nicht möchte, kann es im Admin Center unter <em>Einstellungen &gt; Microsoft Search &gt; Inhalte</em> einschränken. Zu beachten: Die Deaktivierung des Semantic Index reduziert den Funktionsumfang von Copilot spürbar, da die kontextübergreifende Suche dann nicht mehr funktioniert.
            </p>

            <p>
              <strong>Audit-Protokollierung:</strong> Microsoft 365 Copilot-Aktivitäten werden standardmäßig im Unified Audit Log protokolliert. Über das Microsoft Purview Compliance Center haben Administratoren Zugriff auf Copilot-Interaktionsprotokolle – ein wichtiger Aspekt für Unternehmen, die Copilot-Nutzung nachvollziehen müssen (z. B. im Rahmen von Betriebsvereinbarungen oder gesetzlichen Anforderungen).
            </p>

            <p>
              Wenn Sie unsicher sind, welche Datenschutzkonfiguration für Ihre Organisation passt, bietet die{" "}
              <Link to="/unsere-angebote" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                Copilotenschule eine Beratung zur Copilot-Einführung
              </Link>{" "}
              an, in der diese Fragen systematisch für Ihre spezifische Umgebung geklärt werden.
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

export default CopilotInExcelAktivieren;
