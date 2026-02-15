import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Users, Briefcase, Target } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-vertrieb-use-cases";
const PAGE_TITLE = "Copilot im Vertrieb: Wo die Zeitersparnis wirklich entsteht";

const CopilotSalesUseCases = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "crm-pflege", title: "Die CRM-Pflege, die niemand machen will", level: 2 },
    { id: "meeting-vorbereitung", title: "Meeting-Vorbereitung, die diesen Namen verdient", level: 2 },
    { id: "follow-up-mails", title: "E-Mail-Entwürfe nach dem Gespräch", level: 2 },
    { id: "angebote", title: "Angebote und Proposals vorbereiten", level: 2 },
    { id: "pipeline", title: "Pipeline-Analysen und Forecasting", level: 2 },
    { id: "wissenstransfer", title: "Interne Abstimmung und Wissenstransfer", level: 2 },
    { id: "einarbeitung", title: "Einarbeitung neuer Mitarbeiter", level: 2 },
    { id: "gesamtrechnung", title: "Was heißt das in der Summe?", level: 2 },
    { id: "dynamics", title: "Exkurs: Copilot in Dynamics 365 Sales", level: 2 },
    { id: "fazit", title: "Fazit", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Unsere Vertriebler nutzen Copilot kaum – wie bekommen wir die Adoption hoch?",
      answer: "Geringe Nutzung im Vertrieb hat fast immer denselben Grund: Die Mitarbeitenden wissen nicht, welche konkreten Aufgaben Copilot ihnen abnehmen kann. Abstrakte Feature-Demos helfen wenig. Was funktioniert: Use-Case-basierte Trainings, in denen Vertriebler an ihren eigenen E-Mails, Meetings und Pipeline-Daten arbeiten. Die Copilotenschule bietet Sales-spezifische Workshops, die genau an den täglichen Aufgaben von Innen- und Außendienst ansetzen."
    },
    {
      name: "Lohnt sich Copilot auch für kleine Vertriebsteams mit fünf oder weniger Mitarbeitern?",
      answer: "Ja, aber mit einer Einschränkung: Bei kleinen Teams reicht der M365 Copilot für 28 Euro pro Nutzer und Monat in der Regel völlig aus. Die teurere Dynamics-365-Integration rechnet sich erst bei größeren Teams mit komplexen Deal-Strukturen. Die Copilotenschule hilft Ihnen, den richtigen Lizenz-Mix für Ihre Teamgröße zu finden."
    },
    {
      name: "Wie messen wir, ob Copilot im Vertrieb tatsächlich Zeit spart?",
      answer: "Messen Sie nicht die Copilot-Nutzung, sondern die Ergebnisse: durchschnittliche Response-Zeit auf Kundenanfragen, CRM-Datenqualität (Vollständigkeit der Opportunity-Notizen), Sales Cycle Length und die Zeit zwischen Kundengespräch und Follow-up-Mail. Wenn diese KPIs sich verbessern, wirkt Copilot. Die Copilotenschule unterstützt bei der Definition von Erfolgsmetriken und begleitender Messung."
    },
    {
      name: "Brauchen wir Dynamics 365 oder reicht Microsoft 365 Copilot für den Vertrieb?",
      answer: "Für die meisten Use Cases – Meeting-Zusammenfassungen, Follow-up-Mails, Angebotsentwürfe, Pipeline-Analysen in Excel – reicht M365 Copilot. Dynamics 365 Sales lohnt sich, wenn Sie KI-gestütztes Lead Scoring, Predictive Forecasting oder Conversation Intelligence benötigen. Die Copilotenschule berät Sie zur richtigen Kombination passend zu Ihrer Vertriebsstruktur."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Die wirkungsvollsten Copilot Use Cases für Vertriebsteams: Konkrete Zeitersparnis für Innendienst und Außendienst mit M365 Copilot und Dynamics 365 Sales.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-14",
        "dateModified": "2026-02-14",
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

  // Badge-Komponente für Innen-/Außendienst-Tags
  const RoleBadge = ({ role }: { role: "Innendienst" | "Außendienst" | "Beide" }) => {
    const colors = {
      "Innendienst": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Außendienst": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "Beide": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
    };
    const icons = {
      "Innendienst": <Briefcase className="w-3.5 h-3.5" />,
      "Außendienst": <Target className="w-3.5 h-3.5" />,
      "Beide": <Users className="w-3.5 h-3.5" />
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${colors[role]}`}>
        {icons[role]} {role}
      </span>
    );
  };

  return (
    <>
      <SEOHead
        title="Copilot im Vertrieb: Use Cases mit echter Zeitersparnis | copilotenschule.de"
        description="Die wirkungsvollsten Copilot Use Cases für Vertriebsteams: Konkrete Zeitersparnis für Innendienst und Außendienst mit M365 Copilot und Dynamics 365 Sales."
        keywords={[
          "Microsoft Copilot Vertrieb",
          "Copilot Sales Use Cases",
          "Copilot Außendienst",
          "Copilot Innendienst",
          "Copilot CRM",
          "Copilot Dynamics 365 Sales",
          "Copilot Zeitersparnis Vertrieb",
          "Microsoft 365 Copilot Sales",
          "Copilot Pipeline Analyse",
          "Copilot Meeting Zusammenfassung",
          "Copilot Follow-up Mail",
          "Copilot Angebotserstellung"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-14T09:00:00+01:00"
        modifiedTime="2026-02-14T09:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot im Vertrieb", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Die wirkungsvollsten Copilot Use Cases für Vertriebsteams: Konkrete Zeitersparnis für Innendienst und Außendienst."
        lastUpdated="14. Februar 2026"
        
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
              Copilot ist der größte Produktivitätshebel für Vertriebsteams seit der Einführung von CRM-Systemen –
              und zwar auf zwei Ebenen: Zeitersparnis und Qualitätsverbesserung. Pro Mitarbeiter lassen sich
              realistisch 3–6 Stunden pro Woche einsparen. Gleichzeitig steigt die Qualität an kritischen
              Touchpoints – schnellere Follow-ups, bessere Vorbereitung, sauberere Daten – was sich direkt auf
              Sales Cycles und Abschlussquoten auswirkt. Bei 28 € pro Nutzer und Monat amortisiert sich das schnell.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p className="text-lg leading-relaxed">
            In Gesprächen mit Entscheidern werde ich regelmäßig gefragt, wo ich die größten messbaren Potenziale
            für KI im Unternehmen sehe. Meine Antwort überrascht viele: nicht in der IT, nicht im Marketing –
            sondern im Vertrieb. Denn kaum eine Abteilung verbringt so viel Zeit mit Verwaltungsarbeit, die
            eigentlich niemand machen will. CRM-Pflege am Freitagabend, Copy-Paste aus Outlook ins System,
            Pipeline-Reports für das Montagsmeeting. Sales dürfte in vielen Organisationen der Bereich sein, in dem
            Copilot die Lizenzkosten am schnellsten marginalisiert – durch Zeitersparnis pro Kopf und durch eine
            spürbare Qualitätsverbesserung im gesamten Pipeline-Prozess, die sich direkt auf die Abschlussquote auswirkt.
          </p>
          <p className="leading-relaxed">
            Genau an dieser Stelle wird Copilot zum stärksten Produktivitätshebel, den Sales-Teams seit der
            Einführung von CRM-Systemen bekommen haben. Nicht weil die Technologie spektakulär wäre – sie fasst
            zusammen, formuliert vor, analysiert Daten. Aber sie tut es an exakt den Stellen, an denen
            Vertriebsorganisationen seit Jahren Zeit verlieren, ohne es zu merken.
          </p>
          <p className="leading-relaxed">
            Dieser Artikel zeigt die Use Cases, bei denen sich Copilot im Vertrieb tatsächlich rechnet. Nicht die
            theoretischen Möglichkeiten aus Microsoft-Demos, sondern die Anwendungen, die in der Summe Stunden
            pro Woche freisetzen. Jeder Use Case ist markiert, ob er primär den Innendienst, den Außendienst oder
            beide betrifft.
          </p>
        </div>

        {/* CRM-Pflege */}
        <section id="crm-pflege" className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold pb-3 border-b-4 border-primary">
              Die CRM-Pflege, die niemand machen will
            </h2>
          </div>
          <div className="mb-4"><RoleBadge role="Beide" /></div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Fangen wir dort an, wo der Schmerz am größten ist. In fast jedem Sales-Team gibt es eine
              unausgesprochene Vereinbarung: CRM-Daten werden gepflegt, wenn es sein muss – also kurz bevor der
              Vertriebsleiter draufschaut. Das Ergebnis sind Opportunities, die wochenlang auf dem gleichen Status
              stehen, Notizen die aus „War gut, melden sich" bestehen, und Forecasts, die auf Bauchgefühl basieren.
            </p>
            <p>
              Copilot in Outlook und Teams ändert das, weil er die Pflege an den Moment bindet, in dem die
              Information ohnehin da ist. Nach einem Teams-Call generiert Copilot eine strukturierte Zusammenfassung
              mit den besprochenen Themen, offenen Punkten und vereinbarten nächsten Schritten. Die lässt sich direkt
              als CRM-Notiz übernehmen – nicht als rohe Transkription, sondern als sinnvoll verdichtete
              Gesprächsdokumentation.
            </p>
            <p>
              Das klingt nach Komfortfunktion. Rechnet man es durch, wird es signifikant. Ein Außendienstler, der
              täglich drei bis vier Kundengespräche führt und pro Gespräch zehn Minuten Nachbereitung spart, gewinnt
              pro Woche drei bis vier Stunden zurück. Beim Innendienst, der häufig Telefonate und Online-Meetings
              dokumentiert, fällt der Effekt ähnlich aus, manchmal sogar stärker, weil dort das Gesprächsvolumen
              höher ist.
            </p>
          </div>
        </section>

        {/* Meeting-Vorbereitung */}
        <section id="meeting-vorbereitung" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Meeting-Vorbereitung, die diesen Namen verdient
          </h2>
          <div className="mb-4"><RoleBadge role="Außendienst" /></div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Außendienstmitarbeiter bereiten Kundentermine vor. Theoretisch. Praktisch heißt das oft: kurz ins
              CRM schauen, den letzten Kontakt überfliegen, im Auto noch schnell die Branchennews googeln. Was
              fehlt, ist der Gesamtkontext – letzte E-Mails, offene Angebote, interne Diskussionen zum Account,
              aktuelle Unternehmensnachrichten des Kunden.
            </p>
            <p>
              Copilot in M365 aggregiert genau das. Ein Prompt wie „Fasse mir zusammen, was in den letzten 30 Tagen
              mit der Firma Müller passiert ist" liefert eine Übersicht aus E-Mails, Teams-Chats, geteilten Dokumenten
              und Kalendereinträgen. Nicht perfekt, nicht vollständig, aber in 30 Sekunden mehr Kontext als ein
              manueller Deep Dive in 15 Minuten bringt.
            </p>
            <p>
              Die reine Zeitersparnis pro Mitarbeiter ist moderat – vielleicht eine Stunde pro Woche bei vier
              vorbereiteten Terminen. Der eigentliche Hebel ist aber ein anderer: besser vorbereitete Gespräche
              führen nachweislich zu kürzeren Sales Cycles und höheren Abschlussquoten. Wer den Kunden beim
              Ersttermin mit Kontextwissen überrascht statt mit Standardfragen nervt, verkauft anders. Dieser
              Qualitätseffekt lässt sich in Minuten schlecht messen, in der Win-Rate aber sehr wohl.
            </p>
          </div>
        </section>

        {/* Follow-up-Mails */}
        <section id="follow-up-mails" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            E-Mail-Entwürfe nach dem Gespräch
          </h2>
          <div className="mb-4"><RoleBadge role="Außendienst" /></div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Jeder erfahrene Vertriebler weiß: Die Follow-up-Mail nach dem Ersttermin ist einer der kritischsten
              Touchpoints im gesamten Sales-Prozess. Wer sie am selben Tag schickt, mit Bezug auf das Gespräch und
              klaren nächsten Schritten, steigert die Wahrscheinlichkeit einer Rückmeldung massiv. Wer sie drei Tage
              später verfasst, hat oft schon verloren.
            </p>
            <p>
              Das Problem: Nach einem langen Außendiensttag, zwischen Autofahrt und Abendessen, ist eine durchdachte
              E-Mail das Letzte, worauf man Lust hat. Copilot in Outlook entwirft auf Basis des Meeting-Transkripts
              einen Nachfass, der die besprochenen Punkte referenziert und konkrete Vorschläge für die nächsten Schritte
              macht. Der Vertriebler passt an, ergänzt seine persönliche Note und schickt – statt am nächsten Morgen
              erst um neun. Pro Mitarbeiter spart das etwa 30–45 Minuten pro Woche an reiner Schreibzeit. Aber der
              größere Effekt ist qualitativ: Eine Follow-up-Mail, die am selben Abend rausgeht und die besprochenen
              Punkte präzise referenziert, signalisiert dem Kunden Verbindlichkeit und Professionalität. Das ist
              kein Soft Factor – das beeinflusst direkt, ob ein Deal weiterläuft oder im Sande verläuft.
            </p>
          </div>
        </section>

        {/* Angebote */}
        <section id="angebote" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Angebote und Proposals vorbereiten
          </h2>
          <div className="mb-4"><RoleBadge role="Innendienst" /></div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Für den Innendienst ist die Angebotserstellung ein wiederkehrender Zeitfresser. Nicht der kaufmännische
              Teil – der steckt im ERP oder in der Kalkulation. Es geht um den Text drumherum: individuelle
              Begleitschreiben, Leistungsbeschreibungen, die auf den Kunden zugeschnitten sind, Folien für das
              Management-Summary.
            </p>
            <p>
              Copilot in Word erstellt brauchbare Erstentwürfe, wenn man ihn mit den richtigen Informationen füttert.
              Ein Prompt wie „Erstelle ein Begleitschreiben für unser Angebot an die Firma Schmidt. Referenziere die
              Gespräche vom Januar und hebe die drei genannten Pain Points hervor" generiert einen Text, der in zehn
              Minuten angepasst werden kann statt in 40 Minuten komplett geschrieben werden muss. Pro Mitarbeiter
              sind das bei zwei bis drei Angeboten pro Woche schnell ein bis zwei Stunden Ersparnis. Und auch hier
              gibt es einen Qualitätseffekt: Ein Begleitschreiben, das konkret auf die Pain Points des Kunden
              eingeht, hebt sich von der generischen Angebotspost ab, die die meisten Wettbewerber verschicken.
            </p>
            <p>
              Eine Einschränkung gehört dazu: Die Qualität der Entwürfe steht und fällt mit der Qualität der Daten
              in M365. Wenn die relevanten Informationen in handschriftlichen Notizen schlummern statt in Teams oder
              Outlook, hat Copilot nichts zu arbeiten. Das ist kein technisches Problem, sondern ein Prozessproblem –
              und eines, das Vertriebsorganisationen ohnehin lösen sollten.
            </p>
          </div>
        </section>

        {/* Pipeline-Analysen */}
        <section id="pipeline" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Pipeline-Analysen und Forecasting
          </h2>
          <div className="mb-4"><RoleBadge role="Innendienst" /></div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Vertriebsinnendienst und Sales Operations verbringen einen überraschend großen Teil ihrer Zeit mit der
              Aufbereitung von Pipeline-Daten. Wöchentliche Forecast-Meetings brauchen aktuelle Auswertungen,
              Quartals-Reviews verlangen Trend-Analysen, das Management will wissen, wie die Conversion-Rates aussehen.
            </p>
            <p>
              Copilot in Excel macht die Auswertung natürlichsprachlich. „Zeige mir alle Opportunities über 50.000 Euro,
              die seit mehr als 60 Tagen in Phase 3 stehen" ist eine Frage, die normalerweise einen Export, drei Filter
              und einen Pivot erfordert. Mit Copilot ist es eine Zeile. „Erstelle ein Diagramm, das unsere Win-Rate nach
              Branche über die letzten vier Quartale zeigt" funktioniert ähnlich.
            </p>
            <p>
              Das spart nicht nur Zeit bei der Erstellung, sondern verändert auch, welche Fragen überhaupt gestellt
              werden. Wenn eine Ad-hoc-Analyse zwei Minuten statt zwanzig dauert, fragt man plötzlich Dinge, die man
              vorher nicht gefragt hätte. Wie entwickelt sich der durchschnittliche Deal-Wert bei Neukunden im Vergleich
              zu Bestandskunden? Welche Vertriebsregion hat die längsten Sales Cycles? Solche Erkenntnisse sind in den
              Daten immer da gewesen – sie wurden nur nie abgerufen, weil der Aufwand zu hoch war.
            </p>
          </div>
        </section>

        {/* Wissenstransfer */}
        <section id="wissenstransfer" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Interne Abstimmung und Wissenstransfer
          </h2>
          <div className="mb-4"><RoleBadge role="Beide" /></div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Sales-Teams kommunizieren ständig intern – Account-Übergaben, Urlaubsvertretungen, Rückfragen an
              Produktspezialisten. Copilot in Teams fasst Chatverläufe und Kanalhistorien zusammen, sodass ein
              Vertriebsmitarbeiter, der montags aus dem Urlaub kommt, in fünf Minuten den Stand seiner Accounts
              erfasst, statt sich durch 200 Teams-Nachrichten zu scrollen.
            </p>
            <p>
              Für den Innendienst, der oft parallel mehrere Außendienstler unterstützt, ist das besonders wertvoll.
              Statt nachzufragen, was bei der Firma XY besprochen wurde, liefert Copilot den Kontext aus dem
              Teams-Kanal.
            </p>
          </div>
        </section>

        {/* Einarbeitung */}
        <section id="einarbeitung" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Einarbeitung neuer Mitarbeiter
          </h2>
          <div className="mb-4"><RoleBadge role="Beide" /></div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Einen Aspekt unterschätzen die meisten: Copilot verkürzt die Ramp-up-Zeit neuer Sales-Mitarbeiter
              erheblich. Ein neuer Vertriebler, der die Gesprächshistorie, E-Mail-Verläufe und Meeting-Zusammenfassungen
              seiner Accounts per Copilot durchsuchen kann, versteht in einer Woche, wofür er früher einen Monat
              gebraucht hätte. In Zeiten hoher Fluktuation im Vertrieb ist das ein Faktor, den viele Unternehmen bei
              der ROI-Betrachtung komplett übersehen.
            </p>
          </div>
        </section>

        {/* Gesamtrechnung */}
        <section id="gesamtrechnung" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Was heißt das in der Summe?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Statt einzelne Use Cases mit Minutenangaben zu versehen, die sowieso von Team zu Team variieren, lohnt
              sich eine Gesamtbetrachtung. Nehmen wir ein Sales-Team mit 10 Leuten – fünf im Außendienst, fünf im
              Innendienst:
            </p>
          </div>

          <Card className="my-8 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-green-700 dark:text-green-400" />
                    <h3 className="font-bold text-green-700 dark:text-green-400">Außendienst</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Meeting-Zusammenfassungen, Termin-Vorbereitung, Follow-up-Mails
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">4–6 Std./Woche</p>
                  <p className="text-xs text-muted-foreground">pro Mitarbeiter</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                    <h3 className="font-bold text-blue-700 dark:text-blue-400">Innendienst</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pipeline-Analysen, Angebotstexte, interne Abstimmung
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">3–5 Std./Woche</p>
                  <p className="text-xs text-muted-foreground">pro Mitarbeiter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Pro Mitarbeiter reden wir über <strong>3 bis 6 Stunden pro Woche</strong>, die frei werden – nicht für
              mehr Verwaltung, sondern für das, wofür Vertrieb eigentlich bezahlt wird: Gespräche führen, Beziehungen
              pflegen, Abschlüsse machen. In einem zehnköpfigen Team sind das 30 bis 60 Stunden pro Woche. Dazu
              kommt der Qualitätseffekt: bessere Vorbereitung, schnellere Follow-ups, präzisere Angebote – alles
              Faktoren, die sich in der Abschlussquote niederschlagen. Bei einer M365 Copilot-Lizenz von rund
              28 Euro pro Nutzer und Monat ist der Business Case in den meisten Organisationen nach wenigen
              Wochen positiv.
            </p>
          </div>
        </section>

        {/* Dynamics 365 Exkurs */}
        <section id="dynamics" className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-3 border-b-4 border-primary">
            Exkurs: Copilot in Dynamics 365 Sales
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Alles, was bisher beschrieben wurde, bezieht sich auf den M365 Copilot – also die KI-Funktionen in
              Outlook, Teams, Word und Excel. Wer Dynamics 365 als CRM einsetzt, bekommt mit „Sales in Microsoft 365
              Copilot" eine zusätzliche Schicht, die deutlich tiefer in den Vertriebsprozess eingreift.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">Was Copilot in Dynamics 365 kann</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der entscheidende Unterschied zum reinen M365 Copilot: Dynamics-Copilot arbeitet direkt mit CRM-Daten.
              Das bedeutet, er kann nicht nur E-Mails zusammenfassen, sondern Opportunity-Zusammenfassungen aus der
              gesamten Kundenhistorie generieren – inklusive aller Interaktionen, Pipeline-Stages und verknüpften
              Kontakte.
            </p>
            <p>
              <strong>Opportunity-Zusammenfassungen</strong> liefern auf einen Blick den aktuellen Stand eines Deals:
              letzte Aktivitäten, nächste Schritte, beteiligte Stakeholder und die Einschätzung, wo der Deal gerade steht.
              <strong> Lead-Scoring und Priorisierung</strong> nutzen KI-Modelle, die auf Basis historischer Daten
              vorhersagen, welche Leads die höchste Abschlusswahrscheinlichkeit haben.
              <strong> E-Mail-Assistenz innerhalb des CRM</strong> entwirft kontextbezogene Nachrichten, die nicht nur
              auf der letzten E-Mail basieren, sondern die gesamte CRM-Historie berücksichtigen.
              <strong> Conversation Intelligence</strong> analysiert Verkaufsgespräche und identifiziert Muster – welche
              Themen korrelieren mit erfolgreichen Abschlüssen, wo verlieren Vertriebler typischerweise den Faden.
            </p>
            <p>
              <strong>Predictive Forecasting</strong> geht über Excel-Analysen hinaus, indem es Pipeline-Daten mit
              historischen Conversion-Rates und saisonalen Mustern verknüpft, um Prognosen zu generieren, die näher an
              der Realität liegen als die üblichen Bottom-up-Schätzungen.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">Was es kostet</h3>
          <Card className="my-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Lizenz</th>
                      <th className="text-right py-2 font-semibold">Preis/Nutzer/Monat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4">Dynamics 365 Sales Professional</td>
                      <td className="text-right py-2">56,30 €</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">Dynamics 365 Sales Enterprise</td>
                      <td className="text-right py-2">91 €</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">Dynamics 365 Sales Premium (alle KI-Features)</td>
                      <td className="text-right py-2">130 €</td>
                    </tr>
                    <tr className="border-b bg-primary/5">
                      <td className="py-2 pr-4 font-medium">M365 Copilot (inkl. Sales-Funktionen seit Okt. 2025)</td>
                      <td className="text-right py-2 font-medium">28 €</td>
                    </tr>
                    <tr className="bg-primary/10">
                      <td className="py-2 pr-4 font-bold">Voller Umfang: Sales Premium + M365 Copilot</td>
                      <td className="text-right py-2 font-bold">ca. 158 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Copilot-Funktionen für Sales sind seit Oktober 2025 in der M365 Copilot-Lizenz enthalten – also in
              den 28 Euro pro Nutzer und Monat, die man ohnehin zahlt. Voraussetzung ist allerdings, dass eine
              Dynamics 365 Sales-Lizenz vorhanden ist. Ohne CRM keine CRM-KI, was logisch klingt, aber in der
              Budgetplanung gerne übersehen wird.
            </p>
            <p>
              Für ein fünfköpfiges Team mit überschaubaren Anforderungen reicht der M365 Copilot allein oft völlig aus.
              Für eine Enterprise-Vertriebsorganisation mit 50 Mitarbeitern, komplexen Deal-Strukturen und dem Bedarf an
              Forecasting-Genauigkeit ist Dynamics Sales Premium plus Copilot eine Kombination, die sich durch die
              eingesparte Zeit und die bessere Datenqualität typischerweise innerhalb eines Quartals amortisiert.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">Ist KI also das Allheilmittel für schlechte oder schlampig gelebte Vertriebsprozesse?</h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Was ich in der Praxis sehe: Viele Unternehmen kaufen Dynamics 365 Sales Premium, nutzen aber nur einen
              Bruchteil der Features. Conversation Intelligence braucht konsequent aufgezeichnete Gespräche. Predictive
              Forecasting braucht saubere historische Daten. Lead Scoring braucht ein definiertes Scoring-Modell, das zur
              eigenen Vertriebsrealität passt. All das ist Konfigurationsarbeit und Change Management – nicht einfach
              Lizenz kaufen und loslegen. Wer das vernachlässigt, hat ein teures CRM mit KI-Button, den niemand drückt.
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
              Copilot ist kein Wundermittel und er wird auch keinen schlechten Vertriebsprozess reparieren. Aber
              für Organisationen, die ihre Grundlagen im Griff haben – saubere Daten, definierte Prozesse, eine
              gewisse Disziplin in der Nutzung von M365 – ist er der größte einzelne Hebel, den es im Vertrieb
              aktuell gibt. Und zwar auf zwei Ebenen gleichzeitig: Die Zeitersparnis von 3 bis 6 Stunden pro
              Mitarbeiter und Woche entsteht durch die Summe vieler kleiner Entlastungen. Aber der oft
              unterschätzte zweite Effekt wiegt mindestens genauso schwer: Wenn Follow-ups schneller rausgehen,
              Angebote präziser auf den Kunden zugeschnitten sind und Meetings besser vorbereitet werden, verbessert
              sich die Qualität des gesamten Pipeline-Prozesses. Und das schlägt sich dort nieder, wo es wirklich
              zählt – in der Abschlussquote.
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

export default CopilotSalesUseCases;
