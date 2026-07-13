import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import HoneypotCTA from "@/components/HoneypotCTA";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "welche-daten-sieht-microsoft-365-copilot";
const PAGE_TITLE = "Welche Daten sieht Microsoft 365 Copilot? Grounding, Zugriffsberechtigungen und Freigabe-Altlasten verständlich erklärt";

const WelcheDatenSiehtCopilot = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "grounding", title: "Wie funktioniert das Grounding von Microsoft 365 Copilot?", level: 2 },
    { id: "freigabetypen", title: "Welche Freigabe-Linktypen gibt es und wann sieht Copilot eine geteilte Datei?", level: 2 },
    { id: "eeeu", title: "Was bedeutet „Jeder außer externen Benutzern“ (EEEU) für Copilot?", level: 2 },
    { id: "teams-dateien", title: "Was passiert, wenn eine Datei im Teams-Chat, im Kanal oder im Meeting geteilt wird?", level: 2 },
    { id: "tenant-grenze", title: "Sehen Gastnutzer und fremde Tenants meine Daten in Copilot — und umgekehrt?", level: 2 },
    { id: "privates-onedrive", title: "Greift Microsoft 365 Copilot auf das private OneDrive zu?", level: 2 },
    { id: "eigene-freigaben", title: "Wie sehe ich alle Dateien, die ich in der Vergangenheit geteilt habe?", level: 2 },
    { id: "sanierung", title: "Wie räume ich Oversharing auf, wenn in der Vergangenheit geschlampt wurde?", level: 2 },
    { id: "offene-fragen", title: "Welche Fragen beantwortet die Microsoft-Dokumentation nicht?", level: 2 },
    { id: "empfehlungen", title: "Was müssen Unternehmen, Admins und einzelne Nutzer jetzt konkret tun?", level: 2 },
    { id: "faq", title: "Häufige Fragen aus der Praxis", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir wollen Copilot einführen, aber unser Betriebsrat und unsere Datenschutzbeauftragte haben Bedenken wegen alter Freigaben. Womit fangen wir an?",
      answer: "Mit Transparenz statt Beteuerungen: Lassen Sie ein DSPM-for-AI-Risiko-Assessment und die DAG-Berichte laufen und legen Sie die Ergebnisse offen. Ein belastbarer Befund (\"47 Sites mit EEEU, davon 3 mit Personaldaten\") ist die beste Grundlage für einen gestuften Rollout mit Interims-Schutz auf den kritischen Sites. Die Zusagen zum Berechtigungsmodell und zum Ausschluss des LLM-Trainings sind dokumentiert und zitierfähig.",
    },
    {
      name: "Reicht es nicht, Copilot einfach nur einer kleinen Pilotgruppe zu geben?",
      answer: "Eine kleine Pilotgruppe reduziert die Zahl der Menschen, die etwas finden können, nicht die Menge dessen, was gefunden werden kann. Wenn die Pilotgruppe Zugriff auf übergeteilte Inhalte hat, findet sie sie. Sinnvoll ist die Kombination: kleine Gruppe plus vorheriges Assessment plus RCD auf den bekannten Hochrisiko-Sites.",
    },
    {
      name: "Ein Mitarbeiter hat vertrauliche Daten gefunden, die er nie hätte sehen dürfen. Was jetzt?",
      answer: "Erst die Sichtbarkeit stoppen (Berechtigung entfernen und zusätzlich RCD oder RAC auf die betroffene Site, weil die Index-Latenz beim reinen Berechtigungsentzug nicht dokumentiert ist), dann im Audit-Log über AccessedResources prüfen, wessen Copilot-Interaktionen die Inhalte berührt haben, dann die Ursache im Berechtigungsmodell beheben. Der Vorfall ist übrigens fast nie ein Copilot-Fehler, sondern ein Befund über den Zustand der Berechtigungen.",
    },
    {
      name: "Unsere externen Partner arbeiten in unseren Teams mit. Müssen wir ihnen sagen, dass unser Copilot ihre Beiträge nutzt?",
      answer: "Technisch ist der Sachverhalt klar: Was Gäste in Ihrem Tenant einstellen und was Externe in aufgezeichneten Meetings sagen, liegt in Ihrem Tenant und steht Ihren lizenzierten Nutzern im Grounding zur Verfügung, während die Externen selbst dort keinen Copilot haben. Ob und wie Sie das transparent machen, ist eine Frage an Ihre Datenschutzorganisation; aus meiner Sicht gehört ein Hinweis in die Zusammenarbeitsvereinbarung und in die Aufzeichnungs-Hinweise von Meetings.",
    },
    {
      name: "Wie überzeuge ich die Geschäftsführung, Geld für die Sanierung auszugeben, wo doch Copilot angeblich die Berechtigungen respektiert?",
      answer: "Genau mit diesem Argument: Copilot respektiert die Berechtigungen, und das ist das Problem, wenn die Berechtigungen falsch sind. Die Sanierung ist keine Copilot-Steuer, sondern der Abbau eines Risikos, das vorher schon bestand und nur teurer wird, je später es auffällt.",
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
          "Auf welche Daten greift Microsoft 365 Copilot beim Grounding zu, welche Freigaben machen Dateien für andere sichtbar, was passiert an der Tenant-Grenze mit Gästen und Externen — und wie saniert man Oversharing-Altlasten. Mit Quellen aus der offiziellen Microsoft-Dokumentation.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-07-10",
        "dateModified": "2026-07-10",
        "keywords": [
          "Microsoft 365 Copilot Datenzugriff",
          "Copilot Grounding",
          "Copilot Zugriffsberechtigungen",
          "Copilot Oversharing",
          "SharePoint Freigaben Copilot",
          "Copilot Gastnutzer Tenant",
          "Restricted Content Discovery",
          "Copilot Datenschutz",
        ],
        "articleSection": "Sicherheit & Datenschutz",
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
        title="Welche Daten sieht Microsoft 365 Copilot? | copilotenschule.de"
        description="Grounding, Freigabe-Links, EEEU, Gastnutzer und Tenant-Grenze: Wann Copilot eine Datei sieht – und wie Sie Oversharing-Altlasten sanieren. Mit Schaubildern."
        keywords={[
          "Microsoft 365 Copilot Datenzugriff",
          "Copilot Grounding",
          "Copilot Zugriffsberechtigungen",
          "Copilot Oversharing",
          "SharePoint Freigaben Copilot",
          "Copilot Gastnutzer Tenant",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-07-10T09:00:00+01:00"
        modifiedTime="2026-07-10T09:00:00+01:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Welche Daten sieht Copilot?", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Auf welche Daten greift Copilot zu, welche Freigaben machen Dateien sichtbar, was passiert an der Tenant-Grenze — und wie saniert man Altlasten. Ein Leitfaden für Admins, Datenschutzverantwortliche, Entscheider und Anwender."
        lastUpdated="10. Juli 2026"
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
              Microsoft 365 Copilot erfindet keine neuen Zugriffe: Es liefert nur Inhalte, auf
              die der angemeldete Nutzer bereits Zugriff hat — findet diese aber so zuverlässig
              wie kein Werkzeug zuvor. Entscheidend sind deshalb die Freigaben: „Bestimmte
              Personen"-Links wirken sofort, Firmen- und Jeder-Links erst nach Einlösung, EEEU
              wirkt sofort und organisationsweit. Grounding endet an der Tenant-Grenze; Gäste
              erhalten im fremden Tenant keinen Copilot. Wer in der Vergangenheit zu großzügig
              geteilt hat, saniert mit DSPM-Assessments, DAG-Berichten, Restricted Content
              Discovery und Site Access Reviews.
            </p>
          </CardContent>
        </Card>

        {/* Haftungsausschluss */}
        <Card className="mb-8 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-800 dark:text-amber-300">
              Wichtiger Hinweis / Haftungsausschluss
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-900 dark:text-amber-200 space-y-2">
            <p>
              Die Recherche zu diesem Artikel wurde gründlich und nach bestem Wissen und
              Gewissen durchgeführt, und die getroffenen Aussagen wurden beim Schreiben
              sorgfältig gegen die zitierten Quellen geprüft (Stand der Prüfung: Juli 2026).
              Dennoch wird <strong>keine Garantie für die Richtigkeit, Vollständigkeit oder
              Aktualität</strong> der getroffenen Aussagen übernommen. Microsoft ändert
              Produktverhalten, Lizenzbedingungen und Dokumentation laufend; einzelne hier
              beschriebene Mechanismen können sich seit Erscheinen dieses Artikels geändert
              haben. Der Beitrag ersetzt weder Rechtsberatung noch eine tenant-spezifische
              Sicherheits- und Datenschutzprüfung; maßgeblich bleiben die jeweils aktuelle
              Herstellerdokumentation (am Ende des Artikels verlinkt) und die rechtliche
              Bewertung im Einzelfall.
            </p>
            <p className="text-sm italic">
              Stand: Juli 2026. Alle zentralen Aussagen sind mit Quellen aus der offiziellen
              Microsoft-Dokumentation belegt; wo eine Aussage nicht wörtlich dokumentiert ist,
              sondern sich aus dokumentierten Einzelfakten ergibt, ist das im Text ausdrücklich
              gekennzeichnet.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            Dieser Leitfaden beantwortet die Fragen, die in fast jedem Copilot-Projekt
            auftauchen: Auf welche Daten greift Microsoft 365 Copilot beim Grounding zu, welche
            Freigaben machen Dateien für andere in Copilot sichtbar, was passiert an der
            Tenant-Grenze mit Gästen und Externen — und wie räumt man auf, wenn über Jahre zu
            großzügig geteilt wurde. Er richtet sich an M365-Admins, Datenschutzverantwortliche
            und Entscheider, die Copilot einführen wollen oder bereits eingeführt haben, und an
            Anwender, die verstehen wollen, wer ihre Dateien findet. Relevant ist das Thema,
            weil Copilot keine neuen Zugriffe erzeugt, aber vorhandene Berechtigungsfehler so
            auffindbar macht wie kein Werkzeug zuvor.
          </p>
          <p>
            Ein Geschäftsführer sagte mir in einem Copilot-Einführungsprojekt einen Satz, den
            ich seitdem in fast jedem Kundengespräch zitiere: "Wir haben kein Copilot-Problem.
            Wir haben ein SharePoint-Problem, das Copilot sichtbar macht." Genau das trifft den
            Kern. Microsoft 365 Copilot erfindet keine neuen Zugriffe, es öffnet keine Türen,
            die vorher verschlossen waren. Es macht nur etwas sehr Unangenehmes: Es findet
            zuverlässig, was schon immer offen stand. Die Gehaltsliste, die 2019 mit einem
            organisationsweiten Link "kurz mit der Buchhaltung" geteilt wurde. Das
            Due-Diligence-Verzeichnis, in dem "Everyone except external users" als Berechtigung
            steht, weil es damals schneller ging. Die Kündigungsentwürfe im OneDrive eines
            HR-Mitarbeiters, die er per Teams-Chat an einen Kollegen geschickt hat, der
            inzwischen die Abteilung gewechselt hat.
          </p>
          <p>
            Vor Copilot brauchte man für solche Funde Glück oder böse Absicht plus gute
            Suchkenntnisse. Copilot senkt diese Hürde drastisch: Natürliche Sprache genügt, um
            alles semantisch aufzuspüren, worauf die eigenen Berechtigungen reichen — ob ein
            konkreter Fund gelingt, hängt weiterhin von Berechtigungen, Indexierung und
            geltenden Richtlinien ab. Deshalb lohnt es sich, das Berechtigungs- und
            Grounding-Modell einmal wirklich zu verstehen, inklusive der Randfälle, die in kaum
            einem Überblicksartikel vorkommen: Was passiert mit Dateien, die an einzelne
            Personen geteilt wurden? Was sehen Gastnutzer? Was passiert, wenn eine Datei in
            einem Chat landet? Und was bedeutet es tatsächlich, wenn beim Teilen "Personen mit
            vorhandenem Zugriff", "Personen in Ihrer Organisation" oder "Jeder" ausgewählt
            wird? Dieser Leitfaden beantwortet diese Fragen entlang der offiziellen
            Dokumentation und benennt offen, wo Microsoft selbst keine Antwort liefert.
          </p>
        </div>

        <section id="grounding" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wie funktioniert das Grounding von Microsoft 365 Copilot?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wenn ein Nutzer Copilot eine Frage stellt, passiert vor dem eigentlichen
              Sprachmodell ein entscheidender Schritt: das Grounding. Copilot reichert den
              Prompt mit Kontext aus dem Microsoft Graph des eigenen Tenants an, also mit
              E-Mails, Chats, Dateien, Kalendereinträgen und Meetings, bevor der so
              angereicherte Prompt an das Sprachmodell geht. Microsoft beschreibt den Ablauf
              wörtlich so: "Copilot preprocesses the input prompt by using grounding and
              accesses Microsoft Graph in the user's tenant." Nach der Antwort des Modells
              folgt ein Post-Processing, ebenfalls mit Graph-Zugriff, bevor das Ergebnis in der
              App landet.
            </p>
          </div>
          <div className="my-6 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
            <img
              src="/images/copilot-grounding-schaubild.png"
              alt="Schaubild: Wie Microsoft 365 Copilot an seine Daten kommt — Prompt, Grounding über Microsoft Graph und semantischen Index, Sprachmodell, Antwort"
              className="w-full"
            />
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das Fundament darunter ist der semantische Index: eine vektorisierte Aufbereitung
              der Tenant-Inhalte, die semantische Ähnlichkeit versteht statt nur Stichworte zu
              matchen. Diesen Index gibt es zweifach, nämlich auf Tenant-Ebene
              (organisationsweit, generiert aus textbasierten SharePoint-Online-Inhalten) und
              auf Nutzer-Ebene als personalisierten Index der Inhalte, mit denen der einzelne
              Nutzer arbeitet, etwa E-Mails, Dokumente, die ihn erwähnen, die er kommentiert
              oder teilt. Den Nutzer-Index erzeugt Microsoft laut Dokumentation für Nutzer mit
              bezahlter Copilot-Lizenz, wörtlich: "We generate a semantic index for users with
              a paid Microsoft 365 Copilot license." Abschalten lässt sich die semantische
              Indexierung nicht, sie ist laut Microsoft eine Verbesserung der
              Microsoft-365-Suche und "can't be disabled".
            </p>
            <p>
              Die wichtigste Regel steht in der Privacy-Dokumentation: "Microsoft 365 Copilot
              presents only data that each individual can access using the same underlying
              controls for data access used in other Microsoft 365 services." Der semantische
              Index respektiert die identitätsbasierte Zugriffsgrenze, das Grounding greift
              ausschließlich auf Inhalte zu, für die der aktuelle Nutzer autorisiert ist. Und
              ebenso wichtig für Datenschutzverantwortliche: Prompts, Antworten und die über
              den Index zugänglichen Daten werden nicht zum Training der zugrunde liegenden
              Sprachmodelle verwendet. Diese Zusage ist wichtig, beantwortet aber nicht
              automatisch alle Datenschutzfragen: Zweckbindung, Transparenz gegenüber
              Beschäftigten, Aufbewahrung und Protokollierung bleiben Aufgaben der eigenen
              Organisation.
            </p>
            <p>
              Wer diese Regel verstanden hat, versteht auch, warum die eigentliche Arbeit nicht
              bei Copilot liegt. Copilot ist berechtigungstreu. Das Problem sind die
              Berechtigungen selbst, und die sind in den meisten Organisationen über Jahre
              gewachsen, ohne dass jemand den Überblick behalten hat. Microsoft nennt das
              Zielbild in seiner Zero-Trust-Anleitung "just enough access": Jeder Nutzer soll
              genau so viel Zugriff haben, wie er für seine Arbeit braucht, und keinen Deut
              mehr. Die nüchterne Bestandsaufnahme in fast jedem Projekt, das ich begleitet
              habe: Davon sind die meisten Tenants weit entfernt, und zwar nicht, weil Admins
              schlecht gearbeitet hätten, sondern weil das Teilen in Microsoft 365 bewusst
              reibungslos gestaltet ist und niemand je gezwungen war, aufzuräumen.
            </p>
          </div>
        </section>

        <section id="freigabetypen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welche Freigabe-Linktypen gibt es und wann sieht Copilot eine geteilte Datei?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Teilen-Dialog in OneDrive und SharePoint bietet je nach Konfiguration bis zu
              vier Linktypen an, und die Unterschiede zwischen ihnen entscheiden darüber, ob
              eine Datei in fremden Copilot-Antworten auftauchen kann oder nicht. Die
              maßgebliche Quelle ist Microsofts Dokument "How shareable links work in OneDrive
              and SharePoint", das erfreulich präzise ist und einige verbreitete Fehlannahmen
              ausräumt.
            </p>
            <p>
              <strong>"Bestimmte Personen" (Specific people):</strong> Dieser Linktyp erzeugt
              unmittelbar eine such- und Copilot-relevante Berechtigung für genau die
              adressierten Personen oder Gruppen. Microsoft dokumentiert: "Specific people
              links make the associated file or folder appear in search results and make it
              accessible through Copilot for all user and security group members who are added
              to the sharing link." Die Datei ist also ab dem Moment der Freigabe im
              Copilot-Grounding der benannten Empfänger, ohne dass diese den Link je anklicken
              müssen. Eine Falle steckt im Detail: Wird ein solcher Link an eine
              Sicherheitsgruppe vergeben, gilt die Copilot- und Such-Sichtbarkeit für alle
              Mitglieder dieser Gruppe. Wer eine Datei "nur kurz an das Vertriebsteam" teilt
              und dafür eine Gruppe mit 400 Mitgliedern auswählt, hat die Datei für 400
              Copilot-Instanzen auffindbar gemacht.
            </p>
            <p>
              <strong>"Personen in Ihrer Organisation" (Firmenlink):</strong> Hier räumt die
              Dokumentation mit der größten Fehlannahme auf. Viele glauben, ein solcher Link
              mache die Datei sofort für die gesamte Organisation sichtbar. Das stimmt nicht.
              Microsoft schreibt wörtlich: "Creating a People in your organization link doesn't
              make the associated file or folder appear in search results or make it accessible
              through Copilot. It also doesn't grant access to everyone within the
              organization." Der Link ist ein übertragbarer Schlüssel, der erst durch Einlösung
              (Redemption, also das erste Öffnen) eine Berechtigung für die jeweilige Person
              erzeugt. Die Semantic-Index-Dokumentation bestätigt das aus der
              Index-Perspektive: Nur Nutzer, die den Link tatsächlich verwenden, bekommen den
              Inhalt in ihren Nutzer-Index; in den Tenant-Index wandert er durch die
              Link-Erstellung nicht.
            </p>
            <p>
              Und jetzt die Falle, die praktisch niemand kennt: Es gibt eine{" "}
              <strong>automatische Einlösung</strong>. Wird der Firmenlink über den
              Teilen-Dialog von SharePoint oder OneDrive, per Outlook-Mail oder als
              Teams-Chat-Nachricht verschickt, gilt er für die einzelnen Empfänger automatisch
              als eingelöst, bis zu einer Grenze von 100 Personen, ohne dass irgendjemand
              klickt. Microsoft dokumentiert das ausdrücklich: "If the link is sent from the
              SharePoint or OneDrive Web UI, or by using email in Outlook or a chat message in
              Microsoft Teams, it's automatically redeemed for individual recipients, up to a
              limit of 100." Für Gruppen-Empfänger und Beiträge in Teams-Kanälen gilt die
              Auto-Einlösung nicht. In der Praxis heißt das: Der Unterschied zwischen "Link
              erstellt und in eine Wiki-Seite kopiert" (keine Sichtbarkeit, solange niemand
              klickt) und "Link per Outlook an zwölf Kollegen geschickt" (sofortige
              Copilot-Sichtbarkeit für alle zwölf) ist erheblich, und kaum ein Anwender ist
              sich dessen bewusst.
            </p>
            <p>
              <strong>"Jeder" (Anyone-Link):</strong> Auch hier gilt das Redemption-Prinzip.
              Das Erstellen eines Anyone-Links macht den Inhalt nicht in Suche oder Copilot
              sichtbar; erst wer den Link anklickt, für den wird der Inhalt suchbar.
              Anyone-Links haben aber zwei Eigenschaften, die sie aus Governance-Sicht zum
              schlimmsten Linktyp machen: Empfänger müssen sich nicht authentifizieren, und ihr
              Zugriff kann nicht auditiert werden ("People using an Anyone link don't have to
              authenticate, and their access can't be audited"). Ein anonymer, nicht
              angemeldeter Empfänger hat naturgemäß keinen Copilot-Kontext im teilenden Tenant.
              Löst allerdings ein angemeldeter interner Nutzer einen Anyone-Link ein, wird der
              Inhalt für ihn suchbar und damit Teil seines Grounding-Horizonts. Eine
              ausdrückliche Microsoft-Aussage, dass anonyme Link-Nutzer in keinem
              personalisierten Index auftauchen, existiert nicht wörtlich; sie ergibt sich aus
              der Authentifizierungspflicht für Copilot in Kombination mit dem dokumentierten
              Redemption-Mechanismus.
            </p>
            <p>
              <strong>"Personen mit vorhandenem Zugriff":</strong> Der harmloseste Typ. Er
              vergibt keinerlei neue Berechtigungen ("It does not change any permissions"),
              sondern erzeugt nur eine URL für Menschen, die ohnehin Zugriff haben. An der
              Copilot-Sichtbarkeit ändert er nichts. Wer intern Links verschicken will, ohne
              versehentlich Berechtigungen zu erzeugen, sollte diesen Typ zum Standard seiner
              persönlichen Arbeitsweise machen.
            </p>
            <p>
              Die Konsequenz aus alldem formuliert Microsoft selbst in seiner
              Secure-by-default-Deployment-Anleitung: Der Standard-Linktyp im Tenant sollte auf
              "Personen in Ihrer Organisation" oder besser gleich auf "Bestimmte Personen"
              gestellt werden, ausdrücklich auch deshalb, weil das die automatische
              Auffindbarkeit von Inhalten in Enterprise Search und Copilot reduziert.
            </p>
          </div>
          <div className="my-6 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
            <img
              src="/images/copilot-freigabetypen-schaubild.png"
              alt="Schaubild: Die vier Freigabetypen (Bestimmte Personen, Personen in Ihrer Organisation, Jeder, Personen mit vorhandenem Zugriff) und wann sie Inhalte für Copilot sichtbar machen"
              className="w-full"
            />
          </div>
        </section>

        <section id="eeeu" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was bedeutet "Jeder außer externen Benutzern" (EEEU) für Copilot?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Es gibt einen Mechanismus, der in vielen Tenants riskanter ist als jeder
              Sharing-Link, weil bei ihm das Redemption-Prinzip nicht greift: der Claim
              "Everyone except external users" (EEEU), auf Deutsch "Jeder außer externen
              Benutzern". EEEU ist kein Link, sondern eine echte Berechtigung in der
              Zugriffsliste einer Site, einer Bibliothek oder eines Elements. Microsoft benennt
              die Wirkung unmissverständlich: "EEEU makes content public (visible to the entire
              organization) and makes it easy for others to discover content and get access.
              When you add EEEU to a site membership, the entire content of the site becomes
              public and more prone to oversharing."
            </p>
            <p>
              Der Unterschied zum Firmenlink ist fundamental und wird ständig verwechselt. Beim
              Firmenlink muss jede Person den Link erst besitzen und einlösen, bevor sie
              Zugriff und Copilot-Sichtbarkeit erhält. Bei EEEU haben alle internen Nutzer die
              Berechtigung sofort und ohne jede Aktion; einen Einlöse-Schritt gibt es hier
              nicht, weil gar kein Link im Spiel ist. Und da der semantische Index Ergebnisse
              jedem Nutzer anzeigt, der Zugriff auf den Inhalt hat ("it only surfaces the
              results to a user if the user already has access to the content"), ist
              EEEU-berechtigter Inhalt damit grundsätzlich organisationsweit auffindbar, in der
              Suche wie in Copilot — sofern nicht nachgelagerte Kontrollen wie Restricted
              Content Discovery oder eine DLP-Richtlinie die Sichtbarkeit wieder einschränken.
              Neu ist dieses Problem übrigens nicht: EEEU war schon lange vor Copilot ein
              klassisches Oversharing-Muster; Copilot verkürzt nur den Weg zum Fund. In alten
              Tenants findet sich EEEU erschreckend oft, als Überbleibsel schneller
              Berechtigungsentscheidungen vergangener Jahre. Microsofts Empfehlung im
              offiziellen Copilot-Setup-Guide ist entsprechend deutlich: EEEU auf Tenant-Ebene
              deaktivieren. Per PowerShell lässt sich der Claim aus der Personenauswahl
              ausblenden (<code>Set-SPOTenant -ShowEveryoneExceptExternalUsersClaim $false</code>,
              analog <code>-ShowEveryoneClaim</code> und <code>-ShowAllUsersClaim</code>), was
              künftige Vergaben verhindert; bestehende EEEU-Berechtigungen muss man dagegen
              aktiv finden und entfernen, dazu später mehr.
            </p>
          </div>
        </section>

        <section id="teams-dateien" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was passiert, wenn eine Datei im Teams-Chat, im Kanal oder im Meeting geteilt wird?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Kaum ein Ort produziert so viele unbeabsichtigte Freigaben wie Teams, weil das
              Teilen dort nebenbei passiert und die Berechtigungsmechanik unsichtbar bleibt.
              Die Mechanik ist aber klar dokumentiert.
            </p>
            <p>
              Wer in einem Einzel- oder Gruppenchat eine Datei anhängt, lädt sie in Wahrheit in
              den Ordner "Microsoft Teams Chat Files" seines eigenen OneDrive for Business
              hoch, und Teams erzeugt automatisch eine Freigabe an alle Personen in dieser
              Unterhaltung. Microsoft: "Files you upload in a one-on-one or group chat are
              stored in the Microsoft Teams Chat Files in your OneDrive for Business folder and
              are shared only with the people in that conversation." Für Copilot bedeutet das:
              Die Empfänger haben ab diesem Moment reguläre Berechtigungen auf die Datei, sie
              zählt zu den "Files that were shared directly with them" und ist damit Teil ihres
              Grounding-Horizonts. Die Freigabe endet nicht mit dem Chat: Die Berechtigung ist
              nicht an die Lebensdauer der Unterhaltung gekoppelt, sondern bleibt bestehen, bis
              sie aktiv entzogen wird. Wer vor drei Jahren einem Kollegen eine Datei im Chat
              geschickt hat, hat ihm eine Berechtigung erteilt, die bis heute gilt, auch wenn
              der Kollege längst in einer anderen Abteilung arbeitet — und Copilot kann ihm die
              Datei bis heute in Antworten servieren.
            </p>
            <p>
              In Teams-Kanälen liegt die Sache anders: Kanaldateien landen in der
              SharePoint-Site des Teams, und alle Teambesitzer und -mitglieder sind automatisch
              in den Berechtigungsgruppen dieser Site. Eine im Kanal geteilte Datei ist damit
              für das gesamte Team Copilot-sichtbar. Bei öffentlichen Teams kommt eine
              Verschärfung dazu, die viele übersehen: Jeder in der Organisation kann einem
              öffentlichen Team jederzeit beitreten ("People inside your organization can join
              a public team anytime"), womit die Mitgliedergrenze eines öffentlichen Teams
              unternehmensweit durchlässig wird — potenziell hat die gesamte Organisation
              Zugriff. Private Kanäle und Shared Channels haben jeweils eigene
              SharePoint-Sites, auf die nur die Kanalmitglieder Zugriff haben.
            </p>
            <p>
              Meeting-Aufzeichnungen sind ein eigener Randfall mit Sprengkraft. Bei geplanten
              Meetings und Events landet die Aufzeichnung im OneDrive des Organisators (im
              Ordner "Recordings"), und zwar auch dann, wenn der Organisator gar nicht
              teilgenommen hat; nur bei 1:1- und Gruppenanrufen liegt sie im OneDrive der
              Person, die auf "Aufzeichnen" geklickt hat. Alle internen Meeting-Eingeladenen
              erhalten automatisch einen persönlichen Freigabelink; externe Teilnehmer bekommen
              keinen automatischen Zugriff und müssen vom Organisator nachträglich hinzugefügt
              werden. Kanal-Meetings weichen doppelt ab: Ihre Aufzeichnungen liegen in der
              SharePoint-Site des Kanals, und die Berechtigungen richten sich nach der
              Mitgliederliste des Kanals. Bei Meetings mit mehr als 250 Teilnehmern bekommen
              nicht mehr alle automatisch Berechtigungen. Wer also in einem aufgezeichneten
              Meeting offen gesprochen hat, dessen Worte liegen als durchsuchbares,
              Copilot-taugliches Transkript im OneDrive des Organisators, freigegeben an den
              gesamten internen Einladungsverteiler — die konkrete Copilot-Verwertbarkeit hängt
              dann noch von Lizenz und geltenden Richtlinien ab.
            </p>
          </div>
        </section>

        <section id="tenant-grenze" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Sehen Gastnutzer und fremde Tenants meine Daten in Copilot — und umgekehrt?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jetzt zu den Fragen, die in der Microsoft-Dokumentation am schlechtesten an einer
              Stelle gebündelt sind und die ich deshalb hier aus vielen Einzelquellen
              zusammensetze: Was passiert an der Grenze zwischen zwei Tenants?
            </p>
            <p>
              Die Grundregel zuerst, denn sie beantwortet die meisten Einzelfragen:{" "}
              <strong>Grounding endet an der Tenant-Grenze.</strong> Das ist weniger ein
              einzelner Merksatz aus der Dokumentation als ein Architekturprinzip, das sich aus
              mehreren offiziellen Aussagen zusammensetzt. Der semantische Index wird pro
              Abonnement auf Tenant- und Nutzer-Ebene erzeugt, aus den Inhalten dieses einen
              Tenants, und der Tenant-Index liegt in einem isolierten Container des jeweiligen
              Tenants. Copilot greift beim Grounding auf "Microsoft Graph in the user's tenant"
              zu. Microsoft formuliert das Schutzversprechen ausdrücklich tenant-übergreifend:
              Das Berechtigungsmodell stellt sicher, "that data won't unintentionally leak
              between users, groups, and tenants". Eine moderierte Microsoft-Q&A-Antwort bringt
              es auf den Punkt: "Copilot is strictly scoped to one tenant at a time. It cannot
              simultaneously query data from Tenant A and Tenant B for a single response."
            </p>
          </div>
          <div className="my-6 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
            <img
              src="/images/copilot-tenant-grenze-schaubild.png"
              alt="Schaubild: Die Tenant-Grenze — Gastzugriff auf Dateien funktioniert über die Grenze, Copilot-Grounding nicht; der semantische Index ist pro Tenant isoliert"
              className="w-full"
            />
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Daraus ergeben sich die Antworten auf die Einzelfragen, und ich kennzeichne
              sauber, was wörtlich dokumentiert ist und was Ableitung:
            </p>
            <p>
              <strong>Kann ein Gast im fremden Tenant Microsoft 365 Copilot nutzen? Nein.</strong>{" "}
              Das ist offiziell dokumentiert: "It's not supported to assign Copilot licenses to
              cross-tenant users, including guests." Ein Gastkonto erfüllt zudem die
              Lizenzvoraussetzungen im Ressourcen-Tenant nicht (geeignete M365-Basislizenz,
              Entra-Konto, Exchange-Online-Postfach). Gäste können in Teams im fremden Tenant
              nicht einmal die Funktion "In Dateien suchen" verwenden, das weist die offizielle
              Gast-Fähigkeitentabelle aus. Auch für das kostenlose, web-basierte Microsoft 365
              Copilot Chat gilt: Es setzt eine geeignete, dem Konto im Tenant zugewiesene
              Microsoft-365-Lizenz voraus, die ein Gast dort typischerweise nicht hat; eine
              wörtliche "Gäste ausgeschlossen"-Aussage speziell für Copilot Chat existiert in
              der Dokumentation allerdings nicht, die Aussage folgt aus der dokumentierten
              Lizenzlogik.
            </p>
            <p>
              <strong>Sieht mein Home-Tenant-Copilot Daten, die mir als Gast in einem fremden
              Tenant freigegeben wurden? Nein.</strong> Ein Nutzer mit bezahlter
              Copilot-Lizenz, der zugleich Gast in fünf fremden Tenants ist, hat in seinem
              Copilot-Grounding ausschließlich die Daten seines Home-Tenants. Die fremden
              Dateien liegen im SharePoint/OneDrive des fremden Tenants und damit
              ausschließlich in dessen Graph und dessen Index. Diese Gesamtaussage steht so in
              keinem einzelnen Microsoft-Satz, sie folgt aber zwingend aus den dokumentierten
              Fakten: Index pro Tenant, Grounding über den Graph des eigenen Tenants, logische
              Tenant-Isolation. Wechselt der Nutzer in Teams per Tenant-Switcher in den fremden
              Tenant, wechselt der komplette Kontext, und dort steht ihm als Gast kein Copilot
              zur Verfügung (siehe oben). Das Ergebnis ist eine bemerkenswerte Asymmetrie: Die
              Datei, die ein Externer mir freigegeben hat, ist für <strong>mich</strong> in
              keinem Copilot auffindbar, wohl aber für die{" "}
              <strong>internen, lizenzierten Mitarbeiter des fremden Tenants</strong>, sofern
              deren Berechtigungen reichen.
            </p>
            <p>
              <strong>Was passiert, wenn ich einem Gast eine Datei freigebe oder ihn in ein
              Team aufnehme?</strong> Der Gast erhält ein B2B-Gastkonto in meinem Tenant und
              Zugriff genau auf das, was mit ihm geteilt wurde. Als Team-Mitglied kann er
              Kanaldateien lesen und teilen und auf die SharePoint-Site des Teams zugreifen; er
              kann keine Dateien in Privatchats anhängen und nicht in Dateien suchen. Copilot
              kann er in meinem Tenant nicht nutzen. Aber, und das ist die unbequeme Kehrseite,
              die kaum je ausgesprochen wird:{" "}
              <strong>
                Alles, was der Gast in meinem Team einstellt oder schreibt, liegt in meinem
                Tenant und ist für meine lizenzierten internen Nutzer ganz normales
                Copilot-Material.
              </strong>{" "}
              Der Gast füttert also das Grounding der Gastgeber-Organisation, ohne selbst je
              eine KI-gestützte Sicht darauf zu bekommen. Diese Konsequenz ist Ableitung aus
              den dokumentierten Speicherorten und dem Tenant-Index-Prinzip, nicht wörtlich
              dokumentiert, aber eine naheliegende, direkt aus den dokumentierten Speicher- und
              Berechtigungsmodellen folgende Konsequenz.
            </p>
            <p>
              <strong>Shared Channels (Teams Connect) funktionieren nochmal anders.</strong>{" "}
              Externe Teilnehmer in Shared Channels sind keine Gäste, sondern arbeiten per B2B
              Direct Connect mit ihrer Home-Identität, ganz ohne Konto im Ressourcen-Tenant.
              Jeder Shared Channel bekommt eine eigene SharePoint-Site im Host-Tenant,
              ausdrücklich damit der Dateizugriff auf die Kanalmitglieder beschränkt bleibt;
              selbst Mitglieder des Mutter-Teams und Admins haben ohne Kanalmitgliedschaft
              keinen Zugriff. Für Copilot heißt das: Die Inhalte gehören zum Host-Tenant und
              stehen dessen lizenzierten Kanalmitgliedern im Grounding zur Verfügung; für die
              externe Seite sind sie unsichtbar, ihr Home-Copilot kennt sie nicht. Microsoft
              schließt Copilot-Zugriff für externe und föderierte Nutzer ausdrücklich aus.
              Anyone-Links sind in Shared-Channel-Sites übrigens nicht möglich. Und für
              föderierte 1:1-Chats zwischen Organisationen (External Access ohne Gastkonto)
              gilt: Die Anhängen-Funktion ist dort deaktiviert, Dateiaustausch geht nur über
              manuell erzeugte Freigabelinks.
            </p>
            <p>
              <strong>Die eine dokumentierte Ausnahme heißt Multi-Tenant-Organisation (MTO).</strong>{" "}
              Für Konzerne mit mehreren Tenants, die als MTO verbunden sind, existiert die
              Teams-Einstellung "Allow Copilot for B2B members" (standardmäßig aktiviert): Ein
              B2B-<em>Member</em> (nicht Gast) mit gültiger Copilot-Lizenz aus seinem
              Home-Tenant kann damit in Teams-Meetings und -Kanälen des anderen MTO-Tenants
              Copilot verwenden. Microsoft grenzt scharf ab: "It isn't available to external or
              federated users." Auch in diesem Szenario entsteht kein tenant-übergreifender
              Gesamtindex; das Grounding bleibt auf die Inhalte beschränkt, auf die der Nutzer
              im jeweiligen Kontext Zugriff hat. Cross-Tenant-Synchronisation ändert daran
              nichts Grundsätzliches, sie erzeugt B2B-Konten und macht Personen
              tenant-übergreifend in der Adressliste auffindbar (mit reduzierter
              Personenkarte), verschmilzt aber keine Dokumentbestände.
            </p>
            <p>
              <strong>Meetings mit Externen</strong> verdienen einen eigenen Warnhinweis. Ein
              externer Teilnehmer kann Teams-Copilot im Meeting des Host-Tenants nicht
              verwenden, sein Gesprochenes wird aber transkribiert und fließt in die
              Copilot-Antworten der lizenzierten internen Teilnehmer ein. Microsoft
              dokumentiert das in der Fähigkeitenmatrix für externe Meeting-Teilnehmer
              ausdrücklich ("User's transcript is captured when Copilot is enabled"). Wer als
              Externer in einem fremden Meeting spricht, produziert Grounding-Material für die
              Gegenseite. Das sollte in keiner{" "}
              <Link to="/trainings/copilot-compliance-datenschutz" className="text-blue-700 dark:text-blue-400 hover:underline">
                Datenschutz-Schulung
              </Link>{" "}
              fehlen.
            </p>
          </div>
        </section>

        <section id="privates-onedrive" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Greift Microsoft 365 Copilot auf das private OneDrive zu?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Verwechslung von OneDrive (privat, Microsoft-Konto, onedrive.live.com) und
              OneDrive for Business (Arbeitskonto, Teil des Tenants) sorgt regelmäßig für
              falsche Sorgen und falsche Entwarnungen zugleich.
            </p>
            <p>
              Microsoft 365 Copilot am Arbeitsplatz groundet über den Graph des
              Arbeits-Tenants. Das private Consumer-OneDrive liegt außerhalb dieses Tenants und
              ist damit nicht Teil des Groundings; die Teams-Dokumentation sagt ausdrücklich,
              dass die in Teams sichtbaren OneDrive-Dateien die des Arbeitskontos sind, "not
              your personal OneDrive". Eine einzelne Microsoft-Zeile der Form "M365 Copilot
              groundet kein Consumer-OneDrive" existiert nicht, die Aussage ergibt sich aus der
              Tenant-Architektur, ich kennzeichne sie deshalb als sauber abgeleitet. Umgekehrt
              gibt es für Privatnutzer sehr wohl Copilot im Consumer-OneDrive: Seit Januar 2025
              ist Copilot in Microsoft 365 Single und Family enthalten, dort greift Copilot auf
              die Dateien des privaten OneDrive zu, bei Family allerdings nur für die
              Abo-Inhaberin oder den Abo-Inhaber, und auch dort gilt das Berechtigungsprinzip.
            </p>
            <p>
              Das Firmen-OneDrive dagegen ist voll im Spiel, und zwar auch mit Dateien, die nie
              geteilt wurden. Neue OneDrive-Dateien sind standardmäßig privat ("When a user
              adds a file to OneDrive, that file isn't shared with anyone else"), aber der
              persönliche semantische Index umfasst genau diese eigenen Inhalte, und selbst
              restriktive Maßnahmen wie Restricted SharePoint Search lassen den Zugriff auf
              eigene OneDrive-Inhalte ausdrücklich unangetastet. Die praktische Bedeutung: Das
              nie geteilte Dokument im eigenen OneDrive sieht nur der Besitzer selbst in
              Copilot, niemand sonst. Sobald aber geteilt wird, gelten alle oben beschriebenen
              Link-Mechanismen, denn OneDrive for Business läuft technisch auf SharePoint
              Online, und die Tenant-weiten SharePoint-Sharing-Richtlinien gelten dort mit.
              Eine Einschränkung sollten Admins kennen: Restricted Content Discovery, das
              Werkzeug zum Ausblenden von Inhalten aus Copilot, funktioniert nur für
              SharePoint-Sites, nicht für OneDrive.
            </p>
          </div>
        </section>

        <section id="eigene-freigaben" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wie sehe ich alle Dateien, die ich in der Vergangenheit geteilt habe?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Frage kommt in jedem Training: "Wie sehe ich, was ich in den letzten Jahren
              alles geteilt habe?" Die Antwort hat drei Teile.
            </p>
            <p>
              Erstens: OneDrive im Web bietet die Ansicht "Geteilt", die Dateien und Ordner
              zeigt, die man geteilt hat und die mit einem geteilt wurden. Pro Element führt
              "Zugriff verwalten" (Manage Access) zu einer vollständigen Übersicht über
              Personen, Gruppen und Links, und dort lassen sich Links löschen, Personen
              entfernen und Freigaben komplett beenden. Der Haken: Das funktioniert nur
              elementweise, Datei für Datei.
            </p>
            <p>
              Zweitens: Es gibt einen selbst erzeugbaren Bericht. OneDrive-Besitzer können
              unter Einstellungen, "Weitere Einstellungen", "Freigabebericht ausführen" eine
              CSV-Datei erzeugen, die pro Element jede Berechtigung, jeden Nutzer und jeden
              Link auflistet, inklusive Linktyp (Anonymous, Organization, Specific People).
              Dasselbe gibt es pro SharePoint-Site über "Websitenutzung" für Site-Admins. Zwei
              dokumentierte Lücken muss man kennen: Der Bericht enthält keine Links, die
              verschickt, aber nie angeklickt wurden, und keine Anyone-Links. Ausgerechnet der
              gefährlichste Linktyp fehlt also im Selbstauskunfts-Bericht.
            </p>
            <p>
              Drittens:{" "}
              <strong>
                Nach aktueller Dokumentations- und Supportlage stellt Microsoft Endnutzern
                keine zentrale Gesamtübersicht über alle eigenen Freigaben über OneDrive und
                sämtliche SharePoint-Sites hinweg bereit.
              </strong>{" "}
              Microsoft-Support bestätigt das in einer moderierten Q&A-Antwort ausdrücklich:
              "There's no global access dashboard", die Zugriffssteuerung ist nur pro Datei
              oder Ordner verfügbar. Was ein Nutzer über Jahre auf zwanzig verschiedenen
              Team-Sites geteilt hat, lässt sich nutzerseitig schlicht nicht an einer Stelle
              einsehen. Diese Lücke ist ein strukturelles Argument dafür, dass die
              Aufräumarbeit nicht allein an die Anwender delegiert werden kann; ohne
              Admin-Werkzeuge geht es nicht.
            </p>
          </div>
        </section>

        <section id="sanierung" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wie räume ich Oversharing auf, wenn in der Vergangenheit geschlampt wurde?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Damit zum Kern für alle, die vor einem historisch gewachsenen Tenant stehen.
              Microsoft hat seine Anleitung dazu inzwischen in einem offiziellen Blueprint
              gebündelt ("Secure and govern Microsoft 365 Copilot: Foundational deployment
              guidance") mit drei Säulen: Oversharing sanieren, Leitplanken einziehen,
              Regulatorik erfüllen. Der frühere "Deployment blueprint to address oversharing"
              mit den Phasen Pilot, Deploy, Operate ist darin aufgegangen. Aus der
              Projektpraxis übersetzt sieht der Fahrplan so aus:
            </p>
            <p>
              <strong>Schritt 1: Lage feststellen.</strong> Zwei Werkzeugkästen liefern die
              Bestandsaufnahme. In Microsoft Purview läuft mit Data Security Posture Management
              for AI (DSPM for AI) ein Standard-Datenrisiko-Assessment automatisch wöchentlich
              über die 100 meistgenutzten SharePoint-Sites und zeigt pro Site, welcher Anteil
              der Inhalte mit "jedem", "allen in der Organisation", "bestimmten Personen" oder
              extern geteilt ist. Im SharePoint Admin Center liefert SharePoint Advanced
              Management (SAM) die Data-Access-Governance-Berichte (DAG):
              Berechtigungs-Snapshots über alle Sites, Sharing-Link-Aktivität der letzten 28
              Tage getrennt nach Anyone-, Organisations- und Specific-People-Links,
              EEEU-Auswertungen und einen Bericht, der alle Sites zeigt, auf die ein bestimmter
              Nutzer Zugriff hat. Das Content Management Assessment bündelt diese Befunde zu
              einer Copilot-Readiness-Einschätzung; Microsoft empfiehlt, es alle 30 Tage zu
              wiederholen. Wichtig für die Budgetplanung: SAM ist enthalten, sobald die
              Organisation mindestens eine Microsoft-365-Copilot-Lizenz zugewiesen hat; nur
              einzelne Randfunktionen und der Sensitivity-Label-Bericht (E5) haben
              Zusatzanforderungen. Lizenzdetails gehören allerdings zu den beweglichsten Teilen
              des Microsoft-Ökosystems; vor Projektstart gehören sie gegen die aktuelle
              Dokumentation geprüft. Sites mit mehreren überlappenden Risikosignalen, etwa EEEU
              plus hohe Nutzung plus fehlende Labels, kommen ganz nach oben auf die Liste.
            </p>
            <p>
              <strong>Schritt 2: Die Blutung stoppen, bevor operiert wird.</strong> Für die
              identifizierten Hochrisiko-Sites empfiehlt Microsoft ausdrücklich Interims-Schutz,
              bevor jemand einzelne Berechtigungen anfasst. Das Mittel der Wahl ist Restricted
              Content Discovery (RCD): eine Site-Einstellung, die Inhalte der Site aus der
              organisationsweiten Suche und aus Copilot heraushält, ohne eine einzige
              Berechtigung zu ändern; wer kürzlich mit einem Inhalt gearbeitet hat, sieht ihn
              weiterhin. RCD gehört zu SharePoint Advanced Management und setzt laut Microsoft
              eine Copilot-Lizenz in der Organisation voraus. Fürs Management wichtig: RCD
              saniert keine Berechtigungen, es nimmt nur vorübergehend die Auffindbarkeit und
              Copilot-Verwertbarkeit heraus, bis die eigentliche Bereinigung erledigt ist. RCD
              braucht Geduld bei großen Sites, bei mehr als 500.000 Elementen kann die
              Umsetzung länger als eine Woche dauern. Dazu kommt die DLP-Richtlinie für
              Copilot: Dateien und E-Mails mit bestimmten Sensitivity Labels werden von der
              Copilot-Verarbeitung ausgeschlossen, die Inhalte fließen dann nicht mehr in
              Antworten ein. Das ältere Werkzeug Restricted SharePoint Search, das die
              organisationsweite Suche auf eine Positivliste von maximal 100 Sites
              beschränkte, ist Geschichte im Werden: Microsoft hat es immer als Kurzzeitlösung
              deklariert, und ab dem 31. Juli 2026 ist eine Neuaktivierung blockiert. Wer heute
              plant, plant mit RCD, nicht mit RSS. Und für den Extremfall gibt es Restricted
              Access Control (RAC), das den Zugriff auf eine Site hart auf eine definierte
              Gruppe beschränkt, auch für Nutzer, die vorher Berechtigungen oder Links hatten.
            </p>
            <p>
              <strong>Schritt 3: Wirklich sanieren.</strong> Jetzt beginnt die eigentliche
              Arbeit, und Microsofts wichtigste organisatorische Idee dabei ist die Delegation:
              Site Access Reviews aus SAM schicken die DAG-Befunde direkt an die Site Owner,
              mit der expliziten Begründung, dass IT-Admins die Dateiinhalte oft gar nicht
              sehen dürfen und die Fachverantwortlichen am besten beurteilen können, wer
              Zugriff braucht. Die Site Owner entfernen überzählige Nutzer, Gruppen und
              unternehmensweite Links inklusive EEEU, reparieren gebrochene
              Berechtigungsvererbung und bestätigen die Ownership. Parallel werden Anyone-Links
              entschärft: Links am Element löschen, Anyone-Links pro Site oder Tenant
              deaktivieren (bestehende anonyme Links funktionieren dann sofort nicht mehr) oder
              die Pflicht-Ablauffrist verkürzen, denn beim Verkürzen werden auch bestehende
              Links auf die neue, kürzere Frist gesetzt. Eine Warnung aus der Recherche für
              diesen Artikel: Ein offizielles Cmdlet namens{" "}
              <code>Remove-SPOSiteSharingLinks</code>, das gelegentlich durch Blogs geistert,
              existiert in der dokumentierten SharePoint-PowerShell nicht; Massenbereinigung
              von Links läuft über die Graph-Permissions-API oder Community-Werkzeuge wie
              PnP-PowerShell — mit entsprechender Sorgfalt: Vor jeder Massenbereinigung gehört
              ein Test gegen einen isolierten Satz von Sites und Elementen. Ist eine Site
              saniert, kommen die Interims-Kontrollen (RCD, DLP-Ausschluss) wieder weg, damit
              Copilot dort seinen Nutzen entfalten kann.
            </p>
            <p>
              <strong>Schritt 4: Leitplanken, damit es nicht wieder passiert.</strong> Der
              Standard-Linktyp gehört tenant-weit auf "Bestimmte Personen" oder mindestens auf
              "Personen in Ihrer Organisation"; per Sensitivity Label lässt sich der Default
              sogar je nach Vertraulichkeit differenzieren. EEEU und die Everyone-Claims
              verschwinden aus der Personenauswahl. Externe Freigaben bekommen die passende
              Stufe je Site (von "Anyone" bis "nur Organisation"), Gastzugriff bekommt einen
              automatischen Ablauf in Tagen, und die Entra External Collaboration Settings
              regeln, wer überhaupt Gäste einladen darf; die Entra-Einstellungen übersteuern
              die SharePoint-Einstellungen, wenn sie restriktiver sind. Site-Lifecycle-Policies
              erkennen inaktive Sites und führen sie über eine Read-only-Phase in die
              Archivierung; archivierte Inhalte fließen nicht in Copilot ein.
              Auto-Labeling-Richtlinien ziehen Sensitivity Labels auf Bestandsdaten nach, denn
              Labels mit Verschlüsselung sind die einzige Kontrolle, die am Inhalt selbst
              klebt: Copilot darf verschlüsselte Inhalte nur verwenden, wenn der Nutzer neben
              VIEW auch das EXTRACT-Nutzungsrecht hat.
            </p>
            <p>
              <strong>Schritt 5: Kontrollieren, dass es wirkt.</strong> Jede
              Copilot-Interaktion erzeugt einen Eintrag im Unified Audit Log (Operation
              "CopilotInteraction"), und dieser Eintrag enthält im Feld "AccessedResources" die
              Liste aller Dateien, Dokumente und E-Mails, die Copilot für die Antwort
              herangezogen hat, samt Dateiname, Site-URL und Sensitivity-Label-ID. Damit lässt
              sich konkret prüfen, ob eine als geschützt geglaubte Datei noch in
              Copilot-Antworten einfließt. Zum Dialog selbst enthält das Audit-Log nur
              Metadaten, etwa Message-IDs, die Kennzeichnung als Prompt oder Antwort und eine
              Jailbreak-Erkennung; der Wortlaut von Prompt und Antwort steht nicht im Log,
              sondern ist über Content Search, eDiscovery (Inhaltstyp "Copilot interactions")
              oder den Activity Explorer in DSPM for AI zugänglich. Für Untersuchungen
              entscheidet also der Auswertungsweg über die Tiefe.
            </p>
          </div>
        </section>

        <section id="offene-fragen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welche Fragen beantwortet die Microsoft-Dokumentation nicht?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Ein Leitfaden, der Vertrauen verdienen will, muss auch die Lücken benennen. Drei
              Fragen beantwortet die Microsoft-Dokumentation nach meiner Recherche nicht, und
              ich rate davon ab, anderslautende konkrete Zahlen aus Sekundärquellen zu
              übernehmen.
            </p>
            <p>
              Die wichtigste offene Frage ist die Latenz beim Berechtigungsentzug: Wie schnell
              verschwindet eine Datei aus Copilot-Antworten, nachdem jemandem der Zugriff
              entzogen wurde? Dokumentiert ist das Prinzip, dass die Zugriffskontrolle
              identitätsbasiert beim Grounding geprüft wird, und dokumentiert ist für
              Copilot-Connector-Daten eine Frist von bis zu 24 Stunden, weil
              Berechtigungsänderungen dort erst mit einem vollständigen Crawl ankommen. Für
              native SharePoint- und OneDrive-Inhalte nennt Microsoft keine Zahl. Die
              konservative Arbeitshypothese für die Praxis lautet: Berechtigungsentzug wirkt
              nicht garantiert sofort, sensible Vorfälle verlangen deshalb zusätzlich nach RCD
              oder RAC statt nur nach dem Entfernen einzelner Berechtigungen. Zweitens
              dokumentiert Microsoft nicht mehr, wo EEEU historisch automatisch gesetzt wurde
              (der alte OneDrive-Ordner "Shared with Everyone" ist aus der Dokumentation
              verschwunden); verlassen kann man sich nur auf die eigenen DAG-Berichte. Und
              drittens fehlt, wie beschrieben, die wörtliche Aussage zum Consumer-OneDrive,
              auch wenn Architektur- und Produktdokumentation klar in diese Richtung weisen.
            </p>
          </div>
        </section>

        <section id="empfehlungen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was müssen Unternehmen, Admins und einzelne Nutzer jetzt konkret tun?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              <strong>Für Unternehmen und Entscheider:</strong> Behandeln Sie die
              Copilot-Einführung als das, was sie faktisch ist: ein erzwungenes, überfälliges
              Berechtigungs-Audit mit einem Produktivitätswerkzeug als Anlass. Budgetieren Sie
              die Sanierung als eigenes Arbeitspaket mit Fachbereichsbeteiligung, denn die
              Entscheidung, wer auf eine Vertriebs-Site gehört, kann kein Admin treffen.
              Verankern Sie Datenklassifizierung (Sensitivity Labels) als Pflicht, nicht als
              Option, denn Labels mit Verschlüsselung sind die einzige Schutzschicht, die auch
              dann noch greift, wenn Berechtigungen falsch stehen. Und schulen Sie vor dem
              Rollout, nicht danach: Der Unterschied zwischen den vier Linktypen und die
              Chat-Freigabe-Mechanik gehören in jede{" "}
              <Link to="/trainings" className="text-blue-700 dark:text-blue-400 hover:underline">
                Anwenderschulung
              </Link>
              , weil dort täglich neue Altlasten entstehen.
            </p>
            <p>
              Dazu kommen die Datenschutz-Hausaufgaben, die kein Microsoft-Feature erledigt:
              Der Copilot-Einsatz gehört ins Verzeichnis von Verarbeitungstätigkeiten,
              Beschäftigte müssen transparent informiert werden (insbesondere über
              Meeting-Transkription und die Protokollierung von Copilot-Interaktionen im
              Audit-Log), und für Transkripte, Aufzeichnungen und Audit-Daten braucht es Lösch-
              und Aufbewahrungskonzepte. In Deutschland kommt die Mitbestimmung dazu: Copilot
              protokolliert Nutzungs- und Interaktionsdaten und ist damit eine technische
              Einrichtung, die regelmäßig die Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG
              berührt. Eine Betriebsvereinbarung, die Auswertungsgrenzen für Audit- und
              Nutzungsdaten festlegt, ist der sauberste Weg, das Thema früh zu klären — die
              rechtliche Bewertung im Einzelfall gehört zu Datenschutzbeauftragter und
              Fachanwalt, nicht in diesen Artikel.
            </p>
            <p>
              <strong>Für Admins:</strong> Fahren Sie DSPM-for-AI-Assessments und das SAM
              Content Management Assessment, bevor die erste Copilot-Lizenz zugewiesen wird,
              und wiederholen Sie beides in festen Zyklen. Setzen Sie den Standard-Linktyp
              restriktiv, blenden Sie EEEU und die Everyone-Claims aus, erzwingen Sie Ablauf
              und Nur-Ansicht für Anyone-Links, wo Sie sie nicht ganz abschalten können. Nutzen
              Sie RCD als Interims-Schutz für Hochrisiko-Sites und planen Sie RSS nicht mehr
              ein, die Neuaktivierung ist ab Ende Juli 2026 blockiert. Delegieren Sie die
              inhaltliche Sanierung per Site Access Review an die Site Owner. Und bauen Sie
              sich eine Audit-Routine: Die AccessedResources-Daten aus dem Copilot-Audit sind
              das verlässlichste Bild davon, was Copilot in Ihrem Tenant wirklich anfasst.
            </p>
            <p>
              <strong>Für einzelne Nutzer:</strong> Öffnen Sie die "Geteilt"-Ansicht Ihres
              OneDrive und lassen Sie den Freigabebericht laufen, im Wissen um seine Lücken bei
              nie geklickten Links und Anyone-Links. Gehen Sie Ihre kritischsten Dokumente
              einzeln über "Zugriff verwalten" durch und beenden Sie Freigaben, die niemand
              mehr braucht. Gewöhnen Sie sich zwei Reflexe an: intern Links vom Typ "Personen
              mit vorhandenem Zugriff" verschicken, wenn Sie keine neuen Berechtigungen
              erzeugen wollen, und vor jedem Teilen kurz prüfen, welcher Linktyp im Dialog
              voreingestellt ist. Und denken Sie daran, dass jede im Chat verschickte Datei
              eine dauerhafte Freigabe aus Ihrem OneDrive ist, die Sie irgendwann aktiv
              zurücknehmen müssen, wenn sie nicht ewig gelten soll.
            </p>
          </div>
        </section>

        <HoneypotCTA
          guideIds={[
            "copilot-grounding-admin-leitfaden",
            "copilot-grounding-management-leitfaden",
            "copilot-grounding-betriebsrat-leitfaden",
          ]}
          heading="Grounding-Leitfäden zum kostenlosen Download"
        />

        <section id="faq" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufige Fragen aus der Praxis</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
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

        <section id="quellen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Quellen</h2>
          <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
            <p>
              Alle zentralen Aussagen dieses Artikels stützen sich auf die folgenden Dokumente
              (abgerufen im Juli 2026):
            </p>
            <p className="font-semibold">Grounding, Architektur, Datenschutz</p>
            <ul>
              <li>
                Microsoft 365 Copilot architecture:{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-architecture" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Data, privacy, and security for Microsoft 365 Copilot:{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-privacy" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Semantic index for Copilot:{" "}
                <a href="https://learn.microsoft.com/microsoftsearch/semantic-index-for-copilot" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Microsoft 365 Copilot overview:{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-overview" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Zero Trust for Microsoft 365 Copilot:{" "}
                <a href="https://learn.microsoft.com/security/zero-trust/copilots/zero-trust-microsoft-365-copilot" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
            </ul>
            <p className="font-semibold">Sharing-Links, EEEU, Teams-Dateien</p>
            <ul>
              <li>
                How shareable links work in OneDrive and SharePoint:{" "}
                <a href="https://learn.microsoft.com/sharepoint/shareable-links-anyone-specific-people-organization" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Share OneDrive files and folders:{" "}
                <a href="https://support.microsoft.com/en-us/office/share-onedrive-files-and-folders-9fcc2f7d-de0c-4cec-93b0-a82024800c07" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">support.microsoft.com</a>
              </li>
              <li>
                Secure by default with Microsoft Purview (Step 1):{" "}
                <a href="https://learn.microsoft.com/purview/deploymentmodels/depmod-secure-by-default-step1" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                PowerShell for Data Access Governance (EEEU):{" "}
                <a href="https://learn.microsoft.com/sharepoint/powershell-for-data-access-governance" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Set up Microsoft 365 Copilot (Security measures):{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-setup" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                File storage in Microsoft Teams:{" "}
                <a href="https://support.microsoft.com/en-us/office/file-storage-in-microsoft-teams-df5cc0a5-d1bb-414c-8870-46c6eb76686a" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">support.microsoft.com</a>
              </li>
              <li>
                Where Teams content is stored (eDiscovery):{" "}
                <a href="https://learn.microsoft.com/purview/edisc-search-teams" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Teams meeting recording permissions:{" "}
                <a href="https://learn.microsoft.com/microsoftteams/tmr-meeting-recording-change" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Limit sharing in Microsoft 365:{" "}
                <a href="https://learn.microsoft.com/microsoft-365/solutions/microsoft-365-limit-sharing" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
            </ul>
            <p className="font-semibold">Cross-Tenant, Gäste, Shared Channels, MTO</p>
            <ul>
              <li>
                Microsoft 365 Copilot requirements:{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-requirements" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Guest experience in Teams (Fähigkeitentabelle):{" "}
                <a href="https://learn.microsoft.com/microsoftteams/guest-experience" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                B2B direct connect overview:{" "}
                <a href="https://learn.microsoft.com/entra/external-id/b2b-direct-connect-overview" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Shared channels in Microsoft Teams:{" "}
                <a href="https://learn.microsoft.com/microsoftteams/shared-channels" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Copilot for B2B members (MTO):{" "}
                <a href="https://learn.microsoft.com/microsoftteams/copilot-mto" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Multitenant people search:{" "}
                <a href="https://learn.microsoft.com/microsoft-365/enterprise/multi-tenant-people-search" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Teams meeting capabilities for external users:{" "}
                <a href="https://learn.microsoft.com/azure/communication-services/concepts/interop/guest/meeting-capabilities" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
            </ul>
            <p className="font-semibold">OneDrive, eigene Freigaben</p>
            <ul>
              <li>
                Copilot in OneDrive FAQ:{" "}
                <a href="https://support.microsoft.com/en-US/onedrive/frequently-asked-questions-about-copilot-in-onedrive" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">support.microsoft.com</a>
              </li>
              <li>
                See files you shared in OneDrive:{" "}
                <a href="https://support.microsoft.com/en-us/office/see-files-you-shared-in-onedrive-6b67b82b-9c5c-4348-ab10-fd5b0d8df76c" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">support.microsoft.com</a>
              </li>
              <li>
                Sharing reports (SharePoint/OneDrive):{" "}
                <a href="https://learn.microsoft.com/sharepoint/sharing-reports" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Deploy file collaboration:{" "}
                <a href="https://learn.microsoft.com/sharepoint/deploy-file-collaboration" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
            </ul>
            <p className="font-semibold">Sanierung, Admin-Werkzeuge, Audit</p>
            <ul>
              <li>
                Secure and govern Microsoft 365 Copilot (Blueprint):{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/secure-govern-copilot-foundational-deployment-guidance" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Configure a secure and governed foundation:{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/configure-secure-governed-data-foundation-microsoft-365-copilot" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                SharePoint Advanced Management (Copilot-Lizenz):{" "}
                <a href="https://learn.microsoft.com/sharepoint/sharepoint-advanced-management-features-copilot-license" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Data Access Governance reports:{" "}
                <a href="https://learn.microsoft.com/sharepoint/data-access-governance-reports" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Site access review:{" "}
                <a href="https://learn.microsoft.com/sharepoint/site-access-review" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Restricted Access Control:{" "}
                <a href="https://learn.microsoft.com/sharepoint/restricted-access-control" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Restricted Content Discovery:{" "}
                <a href="https://learn.microsoft.com/sharepoint/restricted-content-discovery" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Restricted SharePoint Search (Retirement 31.07.2026):{" "}
                <a href="https://learn.microsoft.com/sharepoint/restricted-sharepoint-search" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                DSPM for AI / Oversharing:{" "}
                <a href="https://learn.microsoft.com/purview/data-security-posture-management-oversharing" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                DLP for Microsoft 365 Copilot:{" "}
                <a href="https://learn.microsoft.com/purview/dlp-microsoft365-copilot-location-learn-about" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Sensitivity Labels und Copilot (EXTRACT):{" "}
                <a href="https://learn.microsoft.com/purview/ai-m365-copilot-considerations" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Audit für Copilot (AccessedResources):{" "}
                <a href="https://learn.microsoft.com/purview/audit-copilot" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Copilot-Connector-Indexierung (ACL-Latenz 24 h):{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/connectors/indexed-content" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Turn external sharing on or off:{" "}
                <a href="https://learn.microsoft.com/sharepoint/turn-external-sharing-on-or-off" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Entra External Collaboration Settings:{" "}
                <a href="https://learn.microsoft.com/entra/external-id/external-collaboration-settings-configure" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
              <li>
                Enterprise Data Protection (Copilot Chat):{" "}
                <a href="https://learn.microsoft.com/microsoft-365/copilot/enterprise-data-protection" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com</a>
              </li>
            </ul>
            <p className="font-semibold">Moderierte Community-Quellen (als solche gekennzeichnet)</p>
            <ul>
              <li>
                Microsoft Q&A: Copilot-Lizenzen für B2B-Gäste nicht möglich:{" "}
                <a href="https://learn.microsoft.com/en-us/answers/questions/5847621/can-external-b2b-guest-accounts-be-assigned-a-copi" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com/answers</a>
              </li>
              <li>
                Microsoft Q&A: Copilot strictly scoped to one tenant:{" "}
                <a href="https://learn.microsoft.com/en-us/answers/questions/5494152/how-can-microsoft-365-copilot-be-securely-deployed" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com/answers</a>
              </li>
              <li>
                Microsoft Q&A: Kein globales Freigabe-Dashboard für Endnutzer:{" "}
                <a href="https://learn.microsoft.com/answers/a/12170952" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline break-all">learn.microsoft.com/answers</a>
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

export default WelcheDatenSiehtCopilot;
