import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-in-teams-zeit-gewinnen";
const PAGE_TITLE = "Copilot in Teams – So gewinnt man in der Praxis wirklich Zeit";

const CopilotInTeamsZeitGewinnen = () => {
  const martinLang = getAuthor('martin-lang')!;
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "facilitator-analoge-meetings", title: "Facilitator: Analoge Meetings per Handy protokollieren", level: 2 },
    { id: "meeting-zusammenfassung-aufgaben", title: "Meeting-Zusammenfassung: Mehr als ein Protokoll", level: 2 },
    { id: "meeting-vorbereitung", title: "Meeting-Vorbereitung in 2 Minuten", level: 2 },
    { id: "researcher-m365-universum", title: "Researcher: Das eigene M365-Universum durchsuchen", level: 2 },
    { id: "schedule-with-copilot", title: "Schedule with Copilot: Terminplanung ohne Doodle", level: 2 },
    { id: "custom-agents", title: "Custom Agents: Wiederverwendbare Mini-Copiloten", level: 2 },
    { id: "stories-modus", title: "Stories-Modus: Fünf konsistente Slides auf Knopfdruck", level: 2 },
    { id: "infografiken-erstellen", title: "Infografiken mit editierbarem Text", level: 2 },
    { id: "gcse-prompt-schema", title: "GCSE: Das Prompt-Schema für bessere Ergebnisse", level: 2 },
    { id: "lernreise-copilotenschule", title: "Tiefer lernen: Die Lernreise der Copilotenschule", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Unsere Teams-Meetings produzieren Protokolle, die niemand liest – wie lösen wir das?",
      answer: "Das Problem ist meistens nicht das Protokoll selbst, sondern wie es entsteht und verteilt wird. Wer nach dem Meeting Copilot bittet, Entscheidungen, offene Punkte und Aufgaben mit Verantwortlichen getrennt aufzulisten, bekommt ein Dokument, das tatsächlich weiterverwendet wird – statt einer langen Textwand. In unseren Copilot-Lernreisen zeigen wir Teams konkret, welche Prompts zu welchen Ergebnissen führen, und üben das direkt in echten Meeting-Szenarien."
    },
    {
      name: "Wie bringe ich mein Team dazu, Copilot in Teams wirklich zu nutzen statt nur beim Einführungs-Workshop?",
      answer: "Der entscheidende Faktor ist der erste echte Aha-Moment im eigenen Arbeitsalltag. Wer abstrakt erklärt bekommt, was Copilot kann, vergisst es schnell. Wer erlebt, dass er sich mit einem Satz auf ein Meeting vorbereiten kann, das er sonst 15 Minuten recherchiert hätte – der ändert sein Verhalten. Wir empfehlen deshalb praxisnahe Trainingsformate mit echten Szenarien aus dem Arbeitsalltag der jeweiligen Teams. Unsere Copilot-Lernreise ist genau dafür konzipiert: kurze, intensive Online-Sessions, die direkt am Schreibtisch greifen."
    },
    {
      name: "Lohnt sich die Copilot-Lizenz allein wegen der Teams-Funktionen?",
      answer: "Das kommt auf die Meeting-Intensität im Team an. Wer täglich mehrere Teams-Meetings hat und nach jedem Meeting manuell Protokolle schreibt und Tasks verteilt, rechnet den ROI schnell durch: 15 Minuten Protokollaufwand pro Meeting, drei Meetings täglich, zehn Mitarbeiter – das ist eine halbe Vollzeitstelle pro Monat. Hinzu kommen Researcher, Meeting-Vorbereitung und Schedule with Copilot. In unserer Copilot-Lizenzberatung helfen wir Unternehmen, die Nutzungsszenarien zu bewerten und die richtigen Lizenzen für die richtigen Rollen zu wählen."
    },
    {
      name: "Niemand in unserem Team kommt vorbereitet in Meetings – wie kann Copilot helfen?",
      answer: "Copilot kann in Outlook direkt aus dem Kalender heraus eine Vorbereitung erstellen: Stand der Kommunikation mit den Teilnehmern, offene Themen aus vergangenen Mails und Teams-Chats, verlinkte Dokumente. Das dauert Sekunden statt Minuten. Die Voraussetzung: die Funktion muss bekannt und geübt sein. In unserem Training zeigen wir, wie man diese Vorbereitung als festen Bestandteil des Meeting-Workflows etabliert – nicht als Extratool, sondern als natürlichen Teil der Kalenderarbeit."
    },
    {
      name: "Wie stelle ich sicher, dass aus unseren Teams-Meetings auch wirklich Maßnahmen folgen?",
      answer: "Copilot kann nach einem Meeting automatisch Aufgaben mit Verantwortlichen und Terminen identifizieren und in Microsoft Planner übertragen. Der kritische Punkt: ohne klare Strukturierung im Meeting-Prompt verschwimmen Entscheidungen und Action Items. Wir empfehlen einen einheitlichen Prompt-Standard im Team – formuliert einmal, als Custom Agent gespeichert und bei jedem Meeting wiederverwendet. So entsteht eine konsistente Aufgabenverfolgung ohne Extraaufwand."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Welche Copilot-Funktionen in Teams den größten ROI bringen – inklusive Tipps, die die meisten noch nicht kennen: Facilitator per Handy, Researcher, Stories-Modus und Custom Agents.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-05-19",
        "dateModified": "2026-05-19",
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
        title="Copilot in Teams: Praxis-Tipps mit echtem ROI 2026"
        description="Welche Copilot-Funktionen in Teams wirklich Zeit sparen – Facilitator, Researcher, Stories-Modus, Custom Agents. Tipps aus der Praxis der Copilotenschule."
        keywords={[
          "Copilot in Teams",
          "Microsoft Teams Copilot Tipps",
          "Teams Copilot Meeting Zusammenfassung",
          "Copilot Teams Protokoll",
          "Microsoft Facilitator Teams",
          "Copilot Researcher M365",
          "Teams Meeting Vorbereitung Copilot",
          "Schedule with Copilot",
          "Custom Agents Microsoft 365",
          "Copilot Teams ROI",
          "Microsoft 365 Copilot Teams Praxis",
          "Copilot Teams Aufgaben extrahieren",
          "Teams Copilot Zeitersparnis",
          "Copilot Stories Modus",
          "Copilot Infografiken erstellen",
          "GCSE Prompt Schema Copilot"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-05-19T09:00:00+02:00"
        modifiedTime="2026-05-19T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot in Teams", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Welche Copilot-Funktionen in Teams tatsächlich Zeit sparen – inklusive der Tipps, die die wenigsten Nutzer kennen."
        lastUpdated="19. Mai 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:copilot-in-outlook-nutzen-tipps",
          "training:microsoft-365-copilot-praxis",
          "wissen:copilot-fuer-word",
          "wissen:copilot-adoption-2026",
          "wissen:copilot-digitales-gedaechtnis"
        ]}
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
              Die meisten Teams-Nutzer kennen genau eine Copilot-Funktion: die Meeting-Zusammenfassung im Nachgang.
              Das ist der kleinste gemeinsame Nenner – und bei Weitem nicht das, was echte Zeitgewinne bringt.
              Wer wirklich profitiert, nutzt den Facilitator für analoge Meetings, den Researcher für die Vorbereitung,
              GCSE-Prompts für präzise Ergebnisse und Custom Agents für wiederkehrende Aufgaben. Dieser Artikel zeigt,
              was in der Praxis funktioniert – und einige Funktionen, die selbst erfahrene Copilot-Nutzer noch nicht kennen.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p className="text-lg leading-relaxed">
            Teams ist der Ort, an dem Microsoft 365 Copilot den größten messbaren ROI erzeugen kann. Nicht weil
            die Funktionen besonders spektakulär sind, sondern weil Meetings zu den zeitintensivsten und gleichzeitig
            am schlechtesten dokumentierten Aktivitäten im Arbeitsalltag gehören. Protokolle werden halbherzig
            geschrieben, Aufgaben gehen verloren, Vorbereitung fällt aus – und das wiederholt sich täglich.
            Copilot kann genau an diesen Stellen ansetzen. Vorausgesetzt, man weiß, welche Funktionen wann nützlich
            sind und wie man sie richtig anspricht.
          </p>
          <p className="leading-relaxed">
            Die folgenden Tipps stammen aus der täglichen Praxis und aus unseren Copilot-Lernreisen – praxisnahen
            Online-Sessions, in denen wir mit Teams tief in konkrete Nutzungsszenarien der einzelnen Microsoft 365 Apps
            einsteigen. Der erste Tipp ist einer, den die meisten wirklich nicht kennen.
          </p>
        </div>

        {/* Facilitator: Analoge Meetings per Handy */}
        <section id="facilitator-analoge-meetings" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Der Microsoft Facilitator: Analoge Meetings per Handy protokollieren
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Microsoft Facilitator ist ein Agent, der in Teams-Meetings live mitschreibt – er erstellt
              die Zusammenfassung während das Meeting läuft, nicht erst danach. Das ist vielen bekannt.
              Was die wenigsten wissen: Man braucht dafür kein Teams-Meeting.
            </p>
            <p>
              Der Trick funktioniert über die Teams-App auf dem Mobiltelefon. Man öffnet die App, navigiert in den
              Kalender und tippt oben rechts auf das Kamerasymbol. Statt ein Sofort-Meeting zu starten, bietet Teams
              seit kurzem eine neue Option an: <strong>„Notizen mit Facilitator erstellen"</strong>. Ein Tipp darauf –
              und der Facilitator läuft. Das Handy legt man einfach auf den Tisch. Er hört mit, transkribiert und
              schreibt die Zusammenfassung in Echtzeit.
            </p>
            <p>
              Das bedeutet: Besprechungen in Konferenzräumen, spontane Stehmeetings, Kundengespräche vor Ort –
              alles, was bisher kein Teams-Protokoll hatte, bekommt jetzt eines. Einfach durch das Aufstellen des
              Handys. Wichtig ist dabei, die Sprache in der App auf Deutsch zu stellen, sonst transkribiert er auf Englisch.
            </p>
            <p>
              Der ROI dieses Tipps liegt nicht nur in den Notizen selbst, sondern in der Schlusskompetenz:
              Man kann nach dem Meeting die entstandene Zusammenfassung direkt aus der App heraus weiterleiten,
              korrigieren oder als Basis für Aufgaben nutzen. Kein Notizbuch, kein hektisches Mitschreiben,
              kein „Ich glaube, das war der Beschluss"-Dilemma in der Nachbereitung.
            </p>
          </div>
          <Card className="mt-4 border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
            <CardContent className="pt-4 pb-4">
              <p className="text-base leading-relaxed">
                <strong>Schritt für Schritt:</strong> Teams App auf dem Handy öffnen → Kalender → Kamerasymbol oben rechts →
                „Notizen mit Facilitator erstellen" → Sprache auf Deutsch stellen → Handy auf den Tisch legen.
                Der Facilitator schreibt automatisch mit. Am Ende: Notizen anzeigen, prüfen, weiterleiten.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Meeting-Zusammenfassung */}
        <section id="meeting-zusammenfassung-aufgaben" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Meeting-Zusammenfassung: Mehr als ein Protokoll
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die automatische Meeting-Zusammenfassung nach einem aufgezeichneten oder transkribierten Teams-Meeting
              ist der bekannteste Copilot-Anwendungsfall. Was dabei meistens verschenkt wird: die Möglichkeit,
              die Ausgabe präzise zu steuern.
            </p>
            <p>
              Ein einfaches Beispiel aus unserem Handout – der GCSE-Prompt für die Meeting-Zusammenfassung:
            </p>
          </div>
          <Card className="my-4 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm font-mono leading-relaxed">
                <strong>G (Ziel):</strong> Ich brauche eine Übersicht, mit der ich nach dem Meeting direkt weiterarbeiten kann.<br />
                <strong>C (Kontext):</strong> Ich war im Quartals-Sync zum Thema Anlagenbau dabei.<br />
                <strong>S (Quelle):</strong> Beziehe dich auf das Transkript dieses Meetings.<br />
                <strong>E (Erwartung):</strong> Liefere getrennt: Entscheidungen, offene Punkte, Aufgaben mit Verantwortlichen und Termin.
              </p>
            </CardContent>
          </Card>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Unterschied zum Standard-Klick auf „Zusammenfassen" ist erheblich. Wer Entscheidungen, offene
              Punkte und Aufgaben mit Verantwortlichen als getrennte Blöcke verlangt, bekommt ein Dokument, das
              tatsächlich in der Nachbereitung weiterlebt. Wer einfach zusammenfasst, bekommt Fließtext –
              und den liest oft niemand.
            </p>
            <p>
              Besonders stark: Copilot kann Tasks direkt in <strong>Microsoft Planner oder To Do</strong> übertragen.
              Aus dem Meeting-Recap heraus, mit einem Klick. So verschwinden Aufgaben nicht im Protokollanhang,
              sondern landen direkt im Aufgabensystem des Teams. Das schließt die häufigste Lücke zwischen
              Besprechung und Umsetzung.
            </p>
          </div>
        </section>

        {/* Meeting-Vorbereitung */}
        <section id="meeting-vorbereitung" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Meeting-Vorbereitung in 2 Minuten: Was Copilot aus dem Kalender holt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              „Wir rufen Sie kurzfristig zum Meeting dazu – können Sie kurz reinspringen?" Ein Satz, der jeden
              kennt, der in größeren Organisationen arbeitet. Bisher bedeutete das: schnell durch den Posteingang
              scrollen, Teams-Chats überfliegen, irgendwie einen Stand zusammenklauben.
            </p>
            <p>
              Copilot löst das direkt aus dem Outlook-Kalender heraus. In einem Kalendereintrag gibt es die
              Option <strong>„Mit Copilot vorbereiten"</strong>. Ein Klick, und Copilot zieht zusammen, was in Mails,
              Dateien und Teams-Chats zu den Teilnehmern und dem Meetingthema liegt: letzte Kommunikation, offene Themen,
              verlinkte Dokumente. Das dauert Sekunden statt Minuten.
            </p>
            <p>
              Der wichtige Hinweis: Copilot kennt nur das, was digital vorhanden ist. Informelle Absprachen aus
              Telefonaten oder Wissen aus persönlichen Gesprächen fehlen in der Vorbereitung. Das Briefing ist ein
              sehr guter Startpunkt – kein vollständiges Bild. Wer das versteht, setzt es richtig ein. Wer
              erwartet, dass Copilot alles weiß, wird gelegentlich enttäuscht sein.
            </p>
          </div>
        </section>

        {/* Researcher */}
        <section id="researcher-m365-universum" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Researcher: Das eigene M365-Universum durchsuchen – und das ist der Gamechanger
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Researcher ist kein verbesserter Web-Browser. Das ist der Fehler, den viele bei der ersten
              Begegnung machen. Sein eigentlicher Wert liegt woanders: Er durchsucht gleichzeitig Mails,
              Teams-Chats, SharePoint-Dokumente, OneDrive-Dateien und Meeting-Transkripte – plus optional das Web.
              Mit Quellenangaben.
            </p>
            <p>
              Ein konkretes Beispiel aus dem Praxisalltag:
            </p>
          </div>
          <Card className="my-4 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm font-mono leading-relaxed">
                <strong>G:</strong> Profil und aktueller Stand zu Lieferant X für unsere Task-Force.<br />
                <strong>C:</strong> Wir prüfen kurzfristig, ob wir das Risiko erhöhen müssen.<br />
                <strong>S:</strong> Suche im Web UND in unseren eigenen Dateien, Mails und Chats nach Lieferant X.<br />
                <strong>E:</strong> Firmenprofil, öffentliche Hinweise zu Lieferproblemen, plus alles, was wir intern schon dazu haben. Mit Quellen.
              </p>
            </CardContent>
          </Card>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Was hier entsteht: eine Übersicht, die kein anderes KI-Tool auf dem Markt liefern kann.
              Web-Suche kann jedes Tool. Aber die eigenen SharePoints, Mails und Teams-Chats nach Lieferant X
              zu durchsuchen und die Ergebnisse mit öffentlichen Informationen zu verbinden –
              das ist exklusiver Mehrwert von Microsoft 365 Copilot.
            </p>
            <p>
              <strong>Wichtig:</strong> Die Verfügbarkeit des Researchers hängt vom Copilot-Lizenzpaket ab.
              Wer die Funktion nicht findet, sollte prüfen, ob sie im aktuellen Plan enthalten ist.
              Die Unterschiede zwischen den Lizenzstufen erklären wir in unserer{" "}
              <Link to="/wissen/microsoft-copilot-lizenzen" className="text-primary underline hover:no-underline">
                Übersicht zu Copilot-Lizenzen
              </Link>.
            </p>
          </div>
        </section>

        {/* Schedule with Copilot */}
        <section id="schedule-with-copilot" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Schedule with Copilot: Terminplanung ohne Doodle-Pingpong
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wer regelmäßig Meetings mit mehreren Teilnehmern koordiniert, kennt das Muster: drei Mails hin und her,
              ein Doodle-Link, dann doch ein kurzfristiger Ausfall und nochmal von vorne.
              Schedule with Copilot löst das direkt aus Outlook heraus.
            </p>
            <p>
              Die Funktion findet sich in Outlook beim Verfassen einer Mail: <strong>„Mit Copilot planen"</strong>.
              Copilot prüft die Verfügbarkeiten aller Empfänger, schlägt drei passende Zeitfenster vor und
              formuliert die Einladungsmail gleich mit. Ein Beispiel-Prompt aus dem Trainingsbetrieb:
            </p>
          </div>
          <Card className="my-4 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm font-mono leading-relaxed">
                Folgemeeting mit allen Empfängern dieser Mail, 30 Minuten, diese Woche.
                Schlage drei Slots vor, Ton sachlich-kurz, mit klarem Agenda-Stichpunkt.
              </p>
            </CardContent>
          </Card>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das spart nicht nur Zeit, sondern reduziert auch die Reibung bei der Koordination. Wer täglich
              fünf bis zehn Terminabstimmungen hat, rechnet das schnell: selbst zwei Minuten weniger pro Abstimmung
              macht bei einem Zehn-Personen-Team einen spürbaren Unterschied im Monat.
            </p>
          </div>
        </section>

        {/* Custom Agents */}
        <section id="custom-agents" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Custom Agents: Wiederverwendbare Mini-Copiloten für Routineaufgaben
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wer einen Prompt mehr als dreimal kopiert, sollte daraus einen Custom Agent bauen. Das ist die
              Faustregel aus unseren Trainings – und sie ist überraschend selten bekannt.
            </p>
            <p>
              Custom Agents lassen sich in Copilot Chat unter „Agents" → „Neuen Agenten erstellen" anlegen.
              Man gibt feste Anweisungen mit, optional Wissensdokumente, und speichert das Ganze unter einem
              Namen. Ab dann steht der Agent als eigener Mini-Copilot zur Verfügung – per Klick, ohne den
              Prompt jedes Mal neu zu formulieren.
            </p>
            <p>
              Konkrete Beispiele, wo das im Meeting-Kontext Sinn ergibt: ein Agent für die standardisierte
              Meeting-Zusammenfassung nach dem eigenen Schema (Entscheidungen / offene Punkte / Aufgaben), ein Agent
              für die wöchentliche Projekt-Statusübersicht, ein Agent für die Einladungsmail nach einem Erstgespräch
              mit einem neuen Kunden. Alles, was man immer wieder gleich braucht, kann als Agent gespeichert und
              im Team geteilt werden.
            </p>
            <p>
              Noch einen Schritt weiter gehen <strong>Agent Flows</strong>: zeitgesteuerte oder ereignisgesteuerte
              Abläufe, die Copilot-Schritte automatisieren. Beispiel: Jede neue Mail mit Anhang von Lieferant X
              wird automatisch in den entsprechenden SharePoint-Ordner abgelegt. Kein manueller Schritt,
              kein Vergessen. Das ist der Übergang von „Copilot als Assistent" zu „Copilot als Automatisierung".
            </p>
          </div>
        </section>

        {/* Stories-Modus */}
        <section id="stories-modus" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Stories-Modus: Fünf konsistente Slides auf Knopfdruck
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              In der Microsoft 365 Copilot App gibt es unter dem Punkt „Erstellen" einen Bereich namens
              „Geschichte" – und der ist für viele eine echte Entdeckung. Der Unterschied zur Infografik-Funktion:
              Copilot erstellt nicht ein einzelnes Bild, sondern gleich fünf grafische Slides – alle im
              identischen Design.
            </p>
            <p>
              Das klingt nach einem kleinen Feature, ist aber für Präsentationsarbeit nach Meetings ein echter
              Zeitsparer. Man gibt dem Prompt Fakten, Kerndaten oder eine Botschaft mit – und bekommt eine
              visuell konsistente Slide-Serie zurück, die direkt in eine PowerPoint-Präsentation übernommen
              werden kann. Kein manuelles Layouten, kein Suchen nach passenden Grafiken für jeden Slide.
            </p>
            <p>
              Beispielszenario: Nach dem Quartals-Sync möchte man die wichtigsten Erkenntnisse als
              fünfteiligen Story-Bogen für das Management aufbereiten. Prompt eingeben, Keypoints mitgeben,
              Format wählen (Querformat für Präsentation), abschicken – fertig ist eine Rohfassung, die
              grafisch zusammenpasst.
            </p>
          </div>
          <Card className="mt-4 border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800">
            <CardContent className="pt-4 pb-4">
              <p className="text-base leading-relaxed">
                <strong>Tipp:</strong> Den Stories-Modus findet man in der Microsoft 365 Copilot App → „Erstellen" →
                „Weiteres" → „Geschichte". Wer die Funktion zum ersten Mal sieht, braucht einen Moment – dann
                versteht man, warum sie für Präsentationsvorbereitung und visuelle Kommunikation nach Meetings
                so praktisch ist.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Infografiken */}
        <section id="infografiken-erstellen" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Infografiken mit editierbarem Text: Der Unterschied zu anderen KI-Tools
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wer schon mal Text in einem KI-generierten Bild korrigieren wollte, kennt das Problem:
              Normalerweise geht das nicht. Man muss das Bild komplett neu generieren und dabei hoffen,
              dass diesmal die Schreibweise stimmt.
            </p>
            <p>
              Microsoft hat das in der Copilot App anders gelöst. In der Infografik-Funktion unter „Erstellen"
              gibt es nach der Generierung unten rechts den Button <strong>„Text bearbeiten"</strong>. Klickt man
              darauf, werden alle Textelemente im Bild direkt anklickbar und über die Tastatur editierbar –
              wie in einem einfachen Bildeditor. Tippfehler korrigieren, Jahreszahlen anpassen, Beschriftungen
              ändern: alles ohne Neugenierung.
            </p>
            <p>
              Für Präsentationsfolien, Infomaterial und visuelle Kommunikation im Team-Kontext ist das ein
              deutlicher Vorteil gegenüber vergleichbaren KI-Tools. Man spart nicht nur die Erstellungszeit,
              sondern auch die Korrekturschleifen.
            </p>
          </div>
        </section>

        {/* GCSE Prompt Schema */}
        <section id="gcse-prompt-schema" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            GCSE: Das Prompt-Schema, das Copilot in Teams wirklich besser macht
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Viele kennen RKAB – das allgemeine Prompt-Schema mit Rolle, Kontext, Aufgabe und Beispielen.
              Für Microsoft 365 Copilot empfehlen wir in unseren Trainings eine zielorientierte Variante:
              <strong> GCSE</strong>. Der Unterschied: GCSE startet nicht mit einer Aufgabe, sondern mit dem
              konkreten Ergebnis, das man am Ende in der Hand halten will. Microsofts eigene Empfehlung geht
              in die gleiche Richtung.
            </p>
            <p>
              Die vier Bausteine:
            </p>
          </div>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold w-8">Buchstabe</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold w-32">Baustein</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Bedeutung</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Beispiel (Meeting-Kontext)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-orange-600">G</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Goal – Ziel</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Welches konkrete Ergebnis brauche ich in der Hand?</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">„Ich brauche eine entscheidungsreife Übersicht, mit der ich direkt weiterarbeiten kann."</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-orange-600">C</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Context – Kontext</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Worum geht es, für wen, in welcher Rolle?</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">„Ich war im Quartals-Sync zum Thema Anlagenbau dabei."</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-orange-600">S</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Source – Quelle</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Welche Datei, welches Meeting, welcher Thread?</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">„Beziehe dich auf das Transkript dieses Meetings."</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-orange-600">E</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Expectations – Erwartung</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Form, Länge, Struktur, Ton?</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">„Getrennt nach: Entscheidungen, offene Punkte, Aufgaben mit Verantwortlichen und Termin."</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Faustregel aus unserem Handout: <em>„Wenn ein Ergebnis lasch wirkt, fehlt fast immer das G oder das E.
              ‚Fasse zusammen' ist ein Auftrag, kein Ziel."</em> Der häufigste Fehler in der Praxis ist der fehlende
              Erwartungsblock – Copilot weiß nicht, ob man einen Dreizeiler oder eine strukturierte Übersicht will,
              und entscheidet dann selbst. Meistens suboptimal.
            </p>
          </div>
        </section>

        {/* Lernreise */}
        <section id="lernreise-copilotenschule" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Tiefer lernen: Die Lernreise der Copilotenschule
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Funktionen in diesem Artikel lassen sich alle alleine ausprobieren – aber der Sprung vom
              Ausprobieren zur echten Gewohnheit passiert selten ohne Begleitung. Deshalb haben wir das Format
              der <strong>Copilot-Lernreise</strong> entwickelt.
            </p>
            <p>
              Die Lernreise besteht aus mehreren zweistündigen Online-Sessions, in denen wir mit den
              Teilnehmern tief in die praktischen Nutzungsszenarien der einzelnen Microsoft 365 Apps einsteigen –
              Teams, Outlook, Word, Excel, PowerPoint. Jede Session ist auf eine App fokussiert und baut auf
              konkreten Alltagsbeispielen auf. Das Handout, auf dem dieser Artikel basiert, stammt aus der
              Teams- und Outlook-Session dieser Lernreise: ein Spickzettel für die ersten Wochen, kein zweites Skript.
            </p>
            <p>
              Der Unterschied zu klassischen Einführungswebinaren: In der Lernreise üben die Teilnehmer mit
              ihren eigenen Szenarien, nicht mit Musterdaten. Wer nach der Session noch einmal in die Notizen
              schaut, soll sofort wissen, was er am eigenen Schreibtisch als Nächstes ausprobiert.
            </p>
          </div>
          <Card className="mt-4 border border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800">
            <CardContent className="pt-4 pb-4">
              <p className="text-base leading-relaxed">
                Interesse an der Lernreise für Ihr Team?{" "}
                <Link to="/unsere-angebote" className="text-primary underline hover:no-underline font-medium">
                  Zu unseren Angeboten
                </Link>{" "}
                – oder direkt{" "}
                <Link to="/#kontakt" className="text-primary underline hover:no-underline font-medium">
                  Kontakt aufnehmen
                </Link>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-2 mt-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Author */}
        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotInTeamsZeitGewinnen;
