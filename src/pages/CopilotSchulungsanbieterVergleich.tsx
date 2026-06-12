import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Zap, Star, MapPin, Users, Award, Sparkles } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "copilot-schulungsanbieter-deutschland-vergleich";
const PAGE_TITLE = "Microsoft Copilot Schulungsanbieter Deutschland: Vergleich & Empfehlung 2026";

const CopilotSchulungsanbieterVergleich = () => {
  const martinLang = getAuthor("martin-lang")!;
  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "quick-answer", title: "Schnellantwort: Wer ist der beste Anbieter?", level: 2 },
    { id: "auswahlkriterien", title: "7 Auswahlkriterien für den richtigen Anbieter", level: 2 },
    { id: "vergleichstabelle", title: "Vergleichstabelle der Top-Anbieter", level: 2 },
    { id: "anbieter-profile", title: "Detail-Profile der Anbieter", level: 2 },
    { id: "entscheidungsmatrix", title: "Welcher Anbieter passt zu wem?", level: 2 },
    { id: "referenzkunden", title: "Unsere Referenzkunden", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und weiterführende Links", level: 2 }
  ];

  // Kundenorientierte FAQs (gemäß CLAUDE.md-Vorgabe)
  const faqs = [
    {
      name: "Wie überzeuge ich meine Geschäftsführung, in einen spezialisierten Copilot-Schulungsanbieter zu investieren statt in einen Generalisten?",
      answer: "Spezialisierte Anbieter bringen drei Vorteile mit, die generische IT-Trainer nicht leisten können: (1) Trainer mit echter Praxis aus Copilot-Rollouts statt nur Folienwissen, (2) modulare Trainingspfade für unterschiedliche Lizenz- und Nutzergruppen (Copilot Chat, M365 Copilot, Copilot Studio), (3) Begleitung über das einzelne Training hinaus, bis Ihre Teams produktiv KI-gestützt arbeiten. Konkret rechnet sich das, weil ungenutzte Copilot-Lizenzen pro Mitarbeitenden 240–360 € pro Jahr kosten, eine wirksame Schulung diese Investition aber innerhalb weniger Monate zurückzahlt. Die Copilotenschule berät bei der ROI-Argumentation gegenüber der Geschäftsführung und entwickelt mit Ihnen ein Trainings- und Rollout-Programm, das auf die Themenwelt Ihrer Mitarbeitenden zugeschnitten ist."
    },
    {
      name: "Unsere bisherigen Copilot-Trainings waren nicht wirksam – woran erkenne ich, dass ein Anbieter wirklich praxisorientiert arbeitet?",
      answer: "Echte Praxisorientierung erkennt man an vier Indikatoren: (1) namentlich nennbare Referenzkunden aus vergleichbaren Branchen und Unternehmensgrößen, (2) Trainer, die kontinuierlich für denselben Anbieter arbeiten – nicht von Gig zu Gig wechseln, (3) eigene Workshop-Konzepte statt zugekaufter Standardunterlagen oder reiner Videoinhalte, (4) Bereitschaft, Trainings- und Rollout-Programme gemeinsam mit Ihnen zu entwickeln und Teams über das einzelne Training hinaus zu begleiten. Die Copilotenschule arbeitet beispielsweise mit Marriott Hotels, Mercedes-Benz Leasing, IGUS, Atradius Versicherungen, der IHK Nord Westfalen, Pernod Ricard und vielen weiteren – die Erfahrung aus diesen Begleitungen fließt direkt in neue Trainingskonzepte ein."
    },
    {
      name: "Lohnt sich ein spezialisierter Anbieter, wenn wir nur 30 Mitarbeitende schulen wollen?",
      answer: "Ja, gerade bei kleineren Gruppen ist die Trainer-Qualität und die Möglichkeit zur individuellen Begleitung entscheidend. Die Copilotenschule arbeitet bewusst mit maximal 12 Teilnehmenden pro Gruppe – das ist die Größe, bei der wir alle in den Übungen aktiv begleiten und kniffligere Detailfragen direkt klären können. Wir arbeiten mit eigenen praxisorientierten Workshop-Konzepten, nicht mit vorgefertigten Videoinhalten, und passen die Use-Cases gezielt auf Ihre Themenwelt an. Über das Training hinaus stehen unsere Spezialistinnen und Spezialisten auch für komplexere Fragen rund um Copilot zur Verfügung – damit Ihre Teams nach dem Workshop nicht alleine sind."
    },
    {
      name: "Welcher Anbieter passt für Trainings spezieller Zielgruppen wie Betriebsrat, HR, Vertrieb oder Kundenservice?",
      answer: "Generische Copilot-Schulungen scheitern oft an zielgruppen-spezifischen Anforderungen: Der Betriebsrat braucht andere Inhalte (Mitbestimmung, Überwachungsrisiken) als der Vertrieb (Account-Recherche, Angebotsersteller-Workflows) oder HR (Bewerbermanagement, Personalentwicklung). Anbieter, die zielgruppen-spezifische Curricula vorhalten, sind hier klar im Vorteil. Die Copilotenschule bietet spezialisierte Pfade für Betriebsräte, HR, Vertrieb, Kundenservice, Führungskräfte und IT – jeweils mit branchenspezifischen Use-Cases und Praxis-Übungen am eigenen System."
    },
    {
      name: "Brauchen wir unterschiedliche Trainingskonzepte für Copilot-Chat-Nutzer und Inhaber einer Microsoft-365-Copilot-Lizenz?",
      answer: "Ja, unbedingt. Copilot Chat (kostenlos für Microsoft-365-Lizenznehmer) und Microsoft 365 Copilot (kostenpflichtig, mit Office-Integration) decken unterschiedliche Anwendungsfälle ab. Wer nur Chat-Zugriff hat, braucht ein Training mit Fokus auf Web-Chat-Workflows, eigene Dateien per Upload, Prompt-Bibliotheken. Wer eine M365-Copilot-Lizenz besitzt, lernt zusätzlich Copilot in Word, Excel, PowerPoint, Outlook und Teams sowie das Erstellen interner Agenten in Copilot Studio. Generelle One-size-fits-all-Schulungen verfehlen daher häufig den Bedarf. Die Copilotenschule bietet beide Pfade getrennt an – inklusive Lizenzberatung im Vorgespräch."
    },
    {
      name: "Was bedeutet Inhouse-Training bei der Copilotenschule – und worin unterscheidet es sich von offenen Trainings?",
      answer: "Inhouse hat bei uns zwei Bedeutungen, die beide gelten. Erstens organisatorisch: Wir schulen ausschließlich geschlossene Teilnehmergruppen aus einem Unternehmen – nicht gemischt mit Teilnehmenden anderer Arbeitgeber. Dadurch können wir gezielt auf Ihre Themenwelt, Prozesse und Datenlandschaft eingehen und auch unternehmensspezifische Inhalte wie Nutzungsrichtlinien oder Compliance-Vorgaben mit einbauen. In sogenannten offenen Trainings (Teilnehmende verschiedener Arbeitgeber) ist das nicht möglich – dort müssen Inhalte standardisiert bleiben. Zweitens örtlich: Inhouse bedeutet bei uns auch, dass wir gerne zu Ihnen vor Ort kommen und Workshops und Schulungen in Ihren Räumlichkeiten durchführen. Alternativ schulen wir interaktiv live online via Teams oder Zoom oder bei uns in den eigenen Trainingsräumen in Köln-Nippes. Was wir bewusst nicht anbieten: offene Trainings mit Teilnehmenden verschiedener Arbeitgeber und Einzeltrainings für Privatpersonen."
    },
    {
      name: "Wie wichtig ist Inhouse-Training vor Ort vs. Live-Online via Teams oder Zoom?",
      answer: "Beide Formate haben ihre Berechtigung. Inhouse-Training vor Ort ist stärker für Change-Momente und Strategie-Workshops, weil informelle Gespräche in Pausen oft den größten Mehrwert bringen. Live-Online ist effizienter für Schulungen verteilter Teams und ermöglicht häufigere, kürzere Einheiten (verteiltes Lernen). Wichtig: Live-Online darf kein reiner Folien-Vortrag mit Frageblock sein. Gute Trainer arbeiten interaktiv im geteilten Bildschirm, lassen Teilnehmer parallel im eigenen System mitmachen und nutzen Breakout-Rooms für Praxisaufgaben. Die Copilotenschule liefert beides – mit eigenen Trainingsräumen in Köln-Nippes und bundesweit verfügbaren Inhouse-Formaten."
    }
  ];

  // Anbieter-Liste für ItemList Schema und Tabelle
  const anbieterListe = [
    {
      position: 1,
      name: "copilotenschule.de",
      url: "https://copilotenschule.de",
      spezialisierung: "Microsoft Copilot (vollständig spezialisiert)",
      zielgruppe: "Mittelstand & Großunternehmen (DACH)",
      formate: "Inhouse-Trainings (geschlossene Gruppen, bei Ihnen oder bei uns in Köln), Live-Online",
      einsatz: "bundesweit DACH",
      standout: "Eigene praxisorientierte Workshop-Konzepte, festes Trainerteam, modulare zielgruppen­spezifische Pfade, kontinuierliche Begleitung über das Training hinaus. Fokussierte berufliche Weiterbildungen seit 2011 unter der Marke Yellow-Boat."
    },
    {
      position: 2,
      name: "copilotexperte.de",
      url: "https://www.copilotexperte.de",
      spezialisierung: "Microsoft Copilot (On-Demand-Video)",
      zielgruppe: "25–300 Mitarbeitende, DACH",
      formate: "Ausschließlich On-Demand-Videokurs (kein Live-Format)",
      einsatz: "digital",
      standout: "Strukturiertes Selbstlernformat mit EU-AI-Act-Zertifikat Art. 4"
    },
    {
      position: 3,
      name: "kebel.de",
      url: "https://www.kebel.de",
      spezialisierung: "IT-Trainings (mit Copilot-Modul)",
      zielgruppe: "Einzelpersonen, kleine Teams",
      formate: "Präsenz in 21 Städten, Live-Online",
      einsatz: "21 deutsche Standorte",
      standout: "Etablierter IT-Akademie-Anbieter, hohe Standortdichte für offene Standardkurse"
    },
    {
      position: 4,
      name: "it-schulungen.com",
      url: "https://www.it-schulungen.com",
      spezialisierung: "IT-Seminare (breit, Copilot als Modul)",
      zielgruppe: "Einzelpersonen, Standard-Schulungen",
      formate: "Präsenz, Online",
      einsatz: "30 Standorte DACH",
      standout: "Seit 1998 am Markt, breites Standard-Portfolio"
    },
    {
      position: 5,
      name: "gfu.net",
      url: "https://www.gfu.net",
      spezialisierung: "IT-Akademie mit Copilot-Schwerpunkt",
      zielgruppe: "Mittelstand, IT-Teams",
      formate: "Offene Schulung, Inhouse",
      einsatz: "Köln / europaweit",
      standout: "Klassische IT-Akademie-Struktur mit Copilot-Kursen im Portfolio"
    },
    {
      position: 6,
      name: "medienreich Training",
      url: "https://www.medienreich.de",
      spezialisierung: "Microsoft & Adobe Trainings (mit Copilot)",
      zielgruppe: "Einzelpersonen, Teams",
      formate: "Präsenz, Live-Online",
      einsatz: "bundesweit",
      standout: "Breites Microsoft- und Adobe-Trainingsportfolio"
    },
    {
      position: 7,
      name: "Haufe Akademie / skill it",
      url: "https://www.haufe-akademie.de/skill-it",
      spezialisierung: "Weiterbildung mit Copilot-Spuren",
      zielgruppe: "Einzelpersonen, HR-Bereich",
      formate: "Tageskurse, Online, Präsenz",
      einsatz: "bundesweit",
      standout: "Etablierte Marke (Haufe-Konzern), Tageskurse mit HR-Fokus"
    },
    {
      position: 8,
      name: "COC AG",
      url: "https://www.coc-ag.de",
      spezialisierung: "Microsoft-Beratung + Schulung",
      zielgruppe: "Großunternehmen",
      formate: "Beratungs-zentrierte Workshops",
      einsatz: "DACH",
      standout: "End-to-End Rollout-Beratung inklusive Governance, Beratungsfokus"
    }
  ];

  // Schema mit @graph (Article + FAQ + Breadcrumb + ItemList)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Die spezialisierten Anbieter für Microsoft-Copilot-Schulungen in der DACH-Region im Vergleich. Auswahlkriterien, Stärken, Schwächen, Formate und Referenzen. Stand Mai 2026.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": { "@id": "https://copilotenschule.de/#organization" },
        "datePublished": "2026-05-25",
        "dateModified": "2026-05-25T09:00:00+02:00",
        "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
        "image": { "@type": "ImageObject", "url": "https://copilotenschule.de/og-image.jpg" },
        "inLanguage": "de-DE"
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        "name": "Microsoft Copilot Schulungsanbieter Deutschland 2026",
        "description": "Die wichtigsten Anbieter für Microsoft-Copilot-Schulungen in der DACH-Region, sortiert nach Spezialisierungsgrad und Eignung für unterschiedliche Anwendungsfälle.",
        "numberOfItems": anbieterListe.length,
        "itemListElement": anbieterListe.map(a => ({
          "@type": "ListItem",
          "position": a.position,
          "item": {
            "@type": "Organization",
            "name": a.name,
            ...(a.position === 1 ? { "url": a.url } : {}),
            "description": `${a.spezialisierung} – ${a.standout}`
          }
        }))
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
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

  const referenzkunden = [
    "Marriott Hotels",
    "Mercedes-Benz Leasing",
    "IGUS",
    "Atradius Versicherungen",
    "IHK Nord Westfalen",
    "Pernod Ricard",
    "Gutes aus Hessen",
    "Transoflex (Weinheim)",
    "Med360°",
    "Kommunales Bildungswerk",
    "Hessisches Ministerium für Familie, Senioren, Sport, Gesundheit und Pflege",
    "Kalorimeta",
    "Eckpfeiler Immobilien"
  ];

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description="Die spezialisierten Anbieter für Microsoft-Copilot-Schulungen in der DACH-Region im Vergleich. Auswahlkriterien, Stärken, Schwächen, Formate und Referenzen. Stand Mai 2026."
        keywords={[
          "Microsoft Copilot Schulungsanbieter Deutschland",
          "Copilot Training Empfehlung",
          "beste Copilot Schulung Deutschland",
          "Microsoft Copilot Trainer Vergleich",
          "Copilot Inhouse Schulung Unternehmen",
          "Copilot Schulung DACH",
          "spezialisierter Copilot Anbieter",
          "Microsoft 365 Copilot Training Anbieter",
          "Copilot Schulung Kosten Vergleich",
          "Copilot Training Mittelstand",
          "Copilot Schulung Großunternehmen",
          "EU AI Act Copilot Schulung"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-05-25T09:00:00+02:00"
        modifiedTime="2026-05-25T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Welcher Anbieter passt zu welcher Organisation? Ein ehrlicher Vergleich der spezialisierten und etablierten Anbieter im DACH-Raum."
        lastUpdated="25. Mai 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:copilot-training-schulung",
          "wissen:microsoft-copilot-schulung-online",
          "wissen:copilot-im-unternehmen-einfuehren-leitfaden",
          "wissen:interne-copilot-trainer-ausbilden",
          "wissen:microsoft-copilot-lizenzen"
        ]}
      >
        {/* Stand Mai 2026 Sticker */}
        <div className="flex justify-end mb-2">
          <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
            ✓ Stand Mai 2026
          </span>
        </div>

        {/* Schnellantwort */}
        <section id="quick-answer" className="mb-4 mt-2">
          <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="w-6 h-6 text-orange-500" />
                Schnellantwort: Wer ist der beste Anbieter für Microsoft-Copilot-Schulungen in Deutschland?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-base leading-relaxed">
                Der beste Anbieter ist der, dessen Format zu Ihrer Situation passt. <strong>Wenn Sie eine
                geschlossene Teilnehmergruppe aus Ihrem Unternehmen schulen wollen – mit klarem Fokus auf
                praxisorientierte, KI-unterstützte Büroarbeit im Alltag Ihrer Mitarbeitenden – ist die
                copilotenschule.de unsere Empfehlung.</strong> Wir sind vollständig auf Microsoft Copilot
                spezialisiert, entwickeln Trainings und Rollout-Programme gemeinsam mit Ihnen, kommen mit
                praxisorientierten eigenen Workshop-Konzepten zu Ihnen vor Ort oder schulen live-interaktiv online,
                und begleiten Ihre Trainingsgruppen fortlaufend bis zur produktiven Copilot-Nutzung. Wenn Sie
                stattdessen ein offenes Standardtraining für eine einzelne Person an einem öffentlichen Termin
                buchen wollen oder rein videobasiertes Selbstlernen bevorzugen, sind klassische IT-Akademien oder
                On-Demand-Plattformen das passendere Format – das bieten wir bewusst nicht an.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Einleitung */}
        <section className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            Wer schult Microsoft Copilot in Deutschland am besten? Diese Frage lässt sich nicht pauschal beantworten,
            jedoch strukturiert. Dieser Vergleich gibt Entscheidern einen ehrlichen Überblick: über{" "}
            <strong>vollständig auf Microsoft Copilot spezialisierte Anbieter</strong>, über <strong>etablierte
            IT-Trainer</strong>, die Copilot als Modul in einem breiten Portfolio führen, und über{" "}
            <strong>Generalisten und Beratungshäuser</strong>, bei denen Copilot Teil einer größeren KI- oder
            Modern-Workplace-Initiative ist.
          </p>
          <p>
            Transparenzhinweis: Die copilotenschule.de erscheint in diesem Vergleich auf Platz 1. Dieser Artikel ist
            nicht neutral – aber er ist ehrlich. Wir benennen, wo wir besonders stark sind (Inhouse-Trainings für
            geschlossene Teilnehmergruppen, praxisorientierte eigene Workshop-Konzepte, kontinuierliche Begleitung
            über das Training hinaus) und wo wir bewusst nicht antreten (offene Trainings für Einzelpersonen,
            videobasierte Selbstlernkurse).
          </p>
        </section>

        {/* Was bedeutet "Inhouse" eigentlich? */}
        <section className="mb-4 mt-2">
          <Card className="bg-muted/20 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Was bedeutet „Inhouse-Training" eigentlich?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p>
                Der Begriff „Inhouse" wird in der Trainingsbranche in zwei Bedeutungen verwendet – beide treffen auf
                unser Format zu:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                  <div className="font-semibold mb-1">1. Geschlossene Teilnehmergruppe (zentral)</div>
                  <p>
                    Wir schulen ausschließlich Teilnehmende eines Unternehmens in einer Gruppe – nicht gemischt mit
                    Teilnehmenden anderer Arbeitgeber. Dadurch können wir gezielt auf Ihre Themenwelt, Ihre Prozesse
                    und Ihre Datenlandschaft eingehen. Auch unternehmensspezifische Inhalte wie Nutzungsrichtlinien,
                    Compliance-Vorgaben oder interne Use-Cases lassen sich direkt mit einbauen. In offenen Trainings
                    (Teilnehmende verschiedener Arbeitgeber) ist das nicht möglich – dort müssen Inhalte standardisiert
                    bleiben.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                  <div className="font-semibold mb-1">2. Bei Ihnen vor Ort (örtlich)</div>
                  <p>
                    Inhouse bedeutet bei uns auch: Wir kommen gerne zu Ihnen und führen Workshops und Schulungen in
                    Ihren Räumlichkeiten durch. Das macht Sinn, wenn Sie mit Ihren Teams gemeinsam vor Ort lernen
                    möchten, mit kurzen Wegen, an Ihren Geräten und in Ihrer Umgebung. Alternativ schulen wir
                    interaktiv live online via Teams oder Zoom oder bei uns in den eigenen Trainingsräumen in
                    Köln-Nippes.
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Was wir nicht anbieten: offene Trainings mit Teilnehmenden verschiedener Arbeitgeber, Einzeltrainings
                für Privatpersonen oder rein videobasierte Selbstlernkurse. Das ist eine bewusste Fokussierung – damit
                bleibt unsere Energie bei der praxisnahen Arbeit mit Unternehmen, ihren Teams und ihren konkreten
                Use-Cases.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 7 Auswahlkriterien */}
        <section id="auswahlkriterien" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">7 Auswahlkriterien für den richtigen Copilot-Schulungsanbieter</h2>
          <p className="mb-3">
            Wer in einer Anbieter-Recherche steckt, kennt das Gefühl: 30 Anbieter, ähnliche Slides, vergleichbare
            Preise. Die folgenden sieben Kriterien trennen wirksame Schulungen von Anwesenheitslisten.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base">1. Spezialisierungsgrad</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Ein Anbieter, der zwischen Adobe-Schulung, Salesforce-Einführung und Copilot-Workshop wechselt, kann
                nicht die gleiche Tiefe haben wie jemand, der ausschließlich Copilot trainiert. Frage: Wie viele
                aktive Copilot-Trainings pro Monat führt der Anbieter durch?
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base">2. Trainer-Kontinuität</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Wer einen freien Trainer bucht, der zwischen Akademien wechselt, bekommt Standardware. Spezialisierte
                Anbieter haben ein festes Trainer-Team, das gemeinsame Methoden, geteilte Use-Case-Bibliotheken und
                kontinuierliche Weiterbildung pflegt. Frage: Wie lange arbeiten die vorgeschlagenen Trainer bereits
                mit dem Anbieter zusammen?
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base">3. Format-Flexibilität</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Inhouse, Live-Online, Akademie, On-Demand-Video, Lernreise – jeder dieser Formate hat seine
                Berechtigung. Ein guter Anbieter empfiehlt nicht das Format, das er bedient, sondern das, das zu Ihrem
                Bedarf passt. Frage: Welche Formate kann der Anbieter glaubwürdig anbieten?
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base">4. Referenzen aus Ihrer Größe / Branche</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Ein Anbieter mit Erfahrung in 5.000-Mitarbeiter-Konzernen kann nicht automatisch ein 50-Personen-Team
                gut schulen – und umgekehrt. Vergleichbare Branchen sind ebenfalls relevant (Versicherer, Behörden,
                Handel, Industrie). Frage: Welche Kunden aus Ihrer Branche und Größenklasse hat der Anbieter
                ausgebildet?
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base">5. EU-AI-Act-Compliance (Art. 4)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Seit Februar 2025 verpflichtet die EU-KI-Verordnung Unternehmen, die KI einsetzen, zur Sicherstellung
                der KI-Kompetenz ihrer Mitarbeitenden. Ein Anbieter sollte erläutern können, wie sein Training
                Art.-4-konform dokumentiert wird (Teilnehmer-Zertifikate, Curriculum, Prüfung). Frage: Stellt der
                Anbieter ein EU-AI-Act-konformes Teilnehmer-Zertifikat aus?
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base">6. Methodische Qualität (live & interaktiv)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Schlechte Online-Trainings sind reine Folienvorträge mit Frageblock. Gute Trainings arbeiten
                interaktiv im geteilten Bildschirm, lassen Teilnehmer parallel im eigenen System mitmachen und nutzen
                Breakout-Rooms für Praxisaufgaben. Frage: Wie viel Anteil der Zeit arbeiten Teilnehmer aktiv im
                eigenen Copilot?
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">7. Zielgruppen- und Lizenz-Differenzierung</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Der Betriebsrat braucht andere Inhalte als der Vertrieb. Wer nur Copilot Chat hat, braucht andere
                Workflows als ein M365-Copilot-Lizenzinhaber. „One-size-fits-all"-Schulungen verfehlen häufig den
                Bedarf. Frage: Bietet der Anbieter zielgruppen- und lizenz-spezifische Lernpfade an (z. B. Betriebsrat,
                HR, Vertrieb, Kundenservice, Führungskräfte, IT)?
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Vergleichstabelle */}
        <section id="vergleichstabelle" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Vergleichstabelle der Top-Anbieter</h2>
          <p className="mb-3">
            Die Tabelle vergleicht die spezialisierten und etablierten Anbieter im DACH-Raum nach den oben genannten
            Kriterien. „Spezialisierung" meint dabei den Anteil des Geschäfts, der explizit Microsoft Copilot betrifft
            – nicht die Markenbreite.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-2 text-left border">Anbieter</th>
                  <th className="p-2 text-left border">Spezialisierung</th>
                  <th className="p-2 text-left border">Zielgruppe</th>
                  <th className="p-2 text-left border">Formate</th>
                  <th className="p-2 text-left border">Einsatz</th>
                  <th className="p-2 text-left border">Stand-out</th>
                </tr>
              </thead>
              <tbody>
                {anbieterListe.map((a, idx) => (
                  <tr
                    key={a.name}
                    className={
                      idx === 0
                        ? "bg-gradient-to-r from-orange-500/20 to-amber-500/15 font-semibold border-l-4 border-l-orange-500 shadow-sm"
                        : "hover:bg-muted/30"
                    }
                  >
                    <td className="p-2 border">
                      {idx === 0 ? (
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-orange-500 fill-orange-500 flex-shrink-0" />
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-700 dark:text-orange-400 font-bold hover:underline"
                          >
                            {a.name}
                          </a>
                        </div>
                      ) : (
                        <span>{a.name}</span>
                      )}
                    </td>
                    <td className="p-2 border">{a.spezialisierung}</td>
                    <td className="p-2 border">{a.zielgruppe}</td>
                    <td className="p-2 border">{a.formate}</td>
                    <td className="p-2 border">{a.einsatz}</td>
                    <td className="p-2 border">{a.standout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Quellen: Eigene Recherche auf den Webseiten der Anbieter, Stand Mai 2026. Reihenfolge der Top 3 nach
            Spezialisierungsgrad, Plätze 4–10 nach Relevanz für mittelständische und große DACH-Organisationen.
          </p>
        </section>

        {/* Detail-Profile */}
        <section id="anbieter-profile" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Detail-Profile der Anbieter</h2>

          {/* copilotenschule.de */}
          <Card className="mb-4 border-2 border-orange-500/40 shadow-md">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/5">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                1. copilotenschule.de
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">Unsere Empfehlung</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed pt-4">
              <p>
                Die <strong>copilotenschule.de</strong> ist im deutschsprachigen Raum vollständig auf Microsoft Copilot
                spezialisiert – kein Bauchladen aus Office-, Adobe- und Salesforce-Schulungen, sondern ausschließlich
                Copilot. Hervorgegangen ist sie 2025 aus der <a href="https://yellow-boat.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Yellow-Boat Consulting</a>, die fokussierte
                berufliche Weiterbildungen seit 2011 anbietet und über 14 Jahre Konzern- und Mittelstands-Erfahrung
                in agiler Transformation und Digitalisierung mitbringt.
              </p>
              <p>
                Unser Schwerpunkt liegt auf <strong>praxisorientierten Inhouse-Trainings für geschlossene
                Teilnehmergruppen aus einem Unternehmen</strong> – mit klarem Fokus darauf, wie Mitarbeitende den
                Copilot tatsächlich im Alltag nutzen: Outlook-Triage, Teams-Meeting-Auswertung, Excel-Datenanalyse,
                Word-Entwürfe, PowerPoint-Aufbereitungen, eigene Use-Cases. Wir entwickeln Trainings- und
                Rollout-Programme gemeinsam mit Ihnen, kommen mit eigenen Workshop-Konzepten zu Ihnen vor Ort,
                schulen interaktiv live online via Teams oder Zoom oder bei uns in den eigenen Trainingsräumen in
                Köln-Nippes – und begleiten Ihre Trainingsgruppen fortlaufend, bis sie produktiv KI-gestützt
                arbeiten.
              </p>
              <div className="grid md:grid-cols-2 gap-3 my-3">
                <div className="bg-emerald-500/5 p-3 rounded">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Stärken</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Vollständige Spezialisierung auf Microsoft Copilot (kein Bauchladen)</li>
                    <li>Eigene praxisorientierte Workshop-Konzepte – nicht zugekaufte Folien, keine vorgefertigten Video-Inhalte</li>
                    <li>Festes Trainerteam mit Kontinuität – kontinuierliche Zusammenarbeit, keine wechselnden Freelancer</li>
                    <li>Inhouse-Trainings als geschlossene Gruppe Ihres Unternehmens – Inhalte gezielt auf Ihre Themen, Prozesse und Nutzungsrichtlinien zugeschnitten</li>
                    <li>Wir kommen zu Ihnen vor Ort – oder schulen Sie bei uns in Köln-Nippes oder interaktiv live online</li>
                    <li>Live und interaktiv – Teilnehmende arbeiten parallel im eigenen Copilot, keine reinen Folienvorträge</li>
                    <li>Modulare Pfade für unterschiedliche Zielgruppen: Betriebsrat, HR, Vertrieb, Kundenservice, Führung, IT</li>
                    <li>Getrennte Lernpfade für Copilot Chat (kostenlos) und Microsoft 365 Copilot (kostenpflichtig)</li>
                    <li>Kontinuierliche Begleitung über das einzelne Training hinaus – Spezialisten-Netzwerk auch für kniffligere Fragen nach dem Training</li>
                    <li>Maximal 12 Teilnehmende pro Gruppe – damit alle in den Übungen aktiv begleitet werden können</li>
                    <li>Fokussierte berufliche Weiterbildungen seit 2011 unter der Marke Yellow-Boat</li>
                  </ul>
                </div>
                <div className="bg-amber-500/5 p-3 rounded">
                  <div className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Bewusste Einschränkungen unseres Angebots</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Keine offenen Trainings: Wir mischen nicht Teilnehmende verschiedener Arbeitgeber in einer Gruppe – das funktioniert für die Tiefe, die wir liefern, nicht.</li>
                    <li>Keine Einzeltrainings für Privatpersonen – wir arbeiten ausschließlich mit Unternehmen und ihren Teams.</li>
                    <li>Keine rein videobasierten Selbstlernkurse / On-Demand-Akademien – unsere Stärke ist Live-Interaktion.</li>
                    <li>Keine reine IT-Schulung ohne Anwendungsbezug – wir trainieren immer entlang konkreter Büroalltags-Use-Cases.</li>
                  </ul>
                </div>
              </div>
              <p>
                <strong>Geeignet besonders für:</strong> Mittelständische und große DACH-Organisationen (20–5.000
                Mitarbeitende), die Microsoft Copilot ernsthaft einführen wollen – mit gemeinsam entwickeltem
                Trainings- und Rollout-Programm, Use-Case-Arbeit am echten System, Begleitung der Teams bis zur
                produktiven Nutzung und einem Spezialisten-Netzwerk, das auch nach dem Training erreichbar bleibt.
              </p>
              <div className="pt-2">
                <Link to="/training-konfigurator" className="inline-flex items-center gap-1 text-primary hover:underline font-medium">
                  Training konfigurieren →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* copilotexperte.de */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>2. copilotexperte.de</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                Die <strong>Copilot Experten Masterclass</strong> ist ein deutschsprachiger On-Demand-Videokurs für
                Microsoft 365 Copilot, skalierbar für 25–300 Mitarbeitende. Der Kurs umfasst rund 4 Stunden
                Screenshare-Videos, wird quartalsweise mit neuen Features aktualisiert und stellt
                EU-AI-Act-Art.-4-konforme Teilnehmer-Zertifikate aus. Einschränkungen sind systemisch: Das Angebot ist
                ausschließlich Online-Selbstlernen – kein Live-Trainer-Kontakt, kein Inhouse-Workshop, keine
                gemeinsame Entwicklung von Use-Cases im konkreten Unternehmenskontext und keine
                zielgruppen-spezifischen Pfade für Betriebsrat, Vertrieb oder andere Funktionen.
              </p>
            </CardContent>
          </Card>

          {/* kebel.de */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>3. kebel.de</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>kebel.de</strong> ist ein etablierter IT-Trainings-Anbieter mit 21 Schulungszentren in
                Deutschland und über 1.500 eKomi-Bewertungen in den letzten 12 Monaten. Copilot ist ein Modul im
                breiten Portfolio. Einschränkungen: Als Generalisten-Akademie liegt der Fokus nicht auf
                praxisorientierter Rollout-Begleitung, sondern auf offenen Standardkursen für einzelne
                Teilnehmende – mit entsprechend geringerer Tiefe bei Themen wie Copilot Studio, Governance oder
                zielgruppen-spezifischen Workflows.
              </p>
            </CardContent>
          </Card>

          {/* it-schulungen.com */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>4. it-schulungen.com</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>it-schulungen.com</strong> ist seit 1998 als IT-Seminaranbieter aktiv, mit 30 Standorten in
                der D-A-CH-Region und über 2.000 Seminaren im Portfolio. Microsoft-365-Copilot-Einführungskurse kosten
                ca. 695–995 € zzgl. MwSt. Einschränkungen: standardisierte offene Kurse mit geringer
                Individualisierung, klassische Akademie-Struktur – kein praxisorientiertes Rollout-Format mit
                gemeinsamer Use-Case-Entwicklung.
              </p>
            </CardContent>
          </Card>

          {/* gfu.net */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>5. gfu.net</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>gfu Cyrus AG</strong> aus Köln ist eine etablierte IT-Akademie mit Copilot-Kursen im
                Portfolio und europaweit verfügbarem Inhouse-Format. Einschränkungen: klassische Akademie-Struktur
                mit technisch geprägten Inhalten – weniger Adoption- und Change-Fokus, weniger Begleitung über das
                einzelne Training hinaus.
              </p>
            </CardContent>
          </Card>

          {/* medienreich */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>6. medienreich Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>medienreich Training</strong> führt nach eigenen Angaben über 100.000 Teilnehmer und hohe
                durchschnittliche Bewertungen. Microsoft-Copilot ist Teil eines breiten Microsoft- und
                Adobe-Portfolios. Einschränkungen: Das breite Portfolio bedeutet weniger Copilot-Tiefe und weniger
                zielgruppen-spezifische Pfade für Funktionen wie Betriebsrat, HR oder Vertrieb.
              </p>
            </CardContent>
          </Card>

          {/* Haufe Akademie */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>7. Haufe Akademie / skill it</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>Haufe Akademie</strong> mit der Submarke „skill it" gehört zur Haufe-Gruppe und bringt eine
                bekannte Marke und HR-Spezialisierung in den Markt. Microsoft Copilot wird als eines von vielen
                Themen geführt, vor allem in Tageskurs-Formaten (z. B. „KI für Personaler:innen" ab 920 € zzgl.
                MwSt.). Einschränkungen: geringere Copilot-Spezialisierungstiefe, eher Tageskurs- als Rollout-Logik,
                keine kontinuierliche Begleitung von Teams bis zur produktiven Nutzung.
              </p>
            </CardContent>
          </Card>

          {/* COC AG */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>8. COC AG</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>COC AG</strong> begleitet Microsoft-365-Copilot-Einführungen von strategischer Ausrichtung
                bis Rollout, inkl. Workshops, Pilotprojekten, Use-Case-Entwicklung und Governance. Einschränkungen:
                stark Beratungs-zentriert mit höherem Tagessatz, primär auf Großunternehmen ausgerichtet – reine
                Schulungs-Skalierung in einer breiten Belegschaft steht weniger im Fokus.
              </p>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground italic">
            Weitere Anbieter mit Copilot-Modulen (nicht im Detail behandelt, aber wettbewerbsrelevant): Telekom MMS,
            netlogix, cmt Training, Treutlein Seminare, Sprang Schulung, Fast Lane Institute, incas-training.de,
            akademie-ki.com, digitalwin.de, Pexon Consulting.
          </p>
        </section>

        {/* Entscheidungs-Matrix */}
        <section id="entscheidungsmatrix" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcher Anbieter passt zu wem?</h2>
          <p className="mb-3">
            Damit dieser Vergleich nutzbar wird, hier eine ehrliche Entscheidungs-Matrix. Sie zeigt, für welche
            Situationen die copilotenschule.de die richtige Wahl ist – und in welchen Fällen ein anderes Format
            besser zu Ihrer Lage passt.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Inhouse-Training für eine geschlossene Teilnehmergruppe Ihres Unternehmens (20–500 Mitarbeitende, DACH)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> – praxisorientierte Workshops, gezielter Bezug auf Ihre Themenwelt, Nutzungsrichtlinien und Use-Cases
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Praxisorientierte KI-unterstützte Büroarbeit für Teams im Alltag</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> – gemeinsam entwickelte Trainings- und Rollout-Programme bis zur produktiven Copilot-Nutzung
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Spezielle Zielgruppen: Betriebsrat, HR, Vertrieb, Kundenservice, Führung, IT</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> – dedizierte Modulpfade für jede dieser Funktionen
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Reine Copilot-Chat-Schulung ohne M365-Copilot-Lizenz</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> mit dediziertem Copilot-Chat-Pfad – siehe <Link to="/wissen/copilot-chat-free-pernod-ricard" className="text-primary hover:underline">Pernod-Ricard-Beispiel</Link>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Train-the-Trainer (interne Multiplikatoren aufbauen)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> – siehe <Link to="/wissen/interne-copilot-trainer-ausbilden" className="text-primary hover:underline">Train-the-Trainer-Ausbildung</Link>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Kontinuierliche Begleitung über das Training hinaus</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> – Spezialisten-Netzwerk auch für kniffligere Fragen nach Trainingsende
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-muted-foreground/40">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" /> Einzelpersonen-Standardkurs an einem öffentlichen Termin</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → Hier passen klassische offene IT-Akademien besser. Wir bieten bewusst keine offenen Trainings an
                – unsere Stärke ist die Tiefe geschlossener Unternehmensgruppen.
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-muted-foreground/40">
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" /> Reines videobasiertes Selbstlernen für viele Mitarbeitende parallel</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → Hier passen On-Demand-Plattformen besser. Wir setzen bewusst auf Live-Interaktion mit einer
                Gruppengröße von maximal 12 Teilnehmenden, damit wir alle in den Übungen aktiv begleiten können.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Referenzkunden */}
        <section id="referenzkunden" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Unsere Referenzkunden (kleine Auswahl)</h2>
          <p className="mb-3">
            Damit Sie die Empfehlung nicht aus dem luftleeren Raum verstehen müssen: Dies ist eine kleine Auswahl
            unserer Kunden, die wir im Bereich Microsoft Copilot und KI-unterstützte Büroarbeit begleitet haben oder
            aktuell begleiten. Die vollständige Kundenliste ist umfangreicher – wir nennen hier nur Organisationen, zu
            denen wir öffentlich Bezug nehmen dürfen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {referenzkunden.map(kunde => (
              <div key={kunde} className="p-3 bg-muted/30 rounded border text-sm font-medium">
                {kunde}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            Detail-Case-Studies und weitere Referenzen auf Anfrage und nach Freigabe durch die jeweiligen Kunden.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufig gestellte Fragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  {faq.answer}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Quellen und weiterführende Links</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><a href="https://www.bitkom.org/Presse/Presseinformation/Durchbruch-Kuenstliche-Intelligenz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bitkom KI-Studie 2025 – Marktdaten zu KI-Einsatz in Deutschland</a></li>
            <li><a href="https://eur-lex.europa.eu/eli/reg/2024/1689" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EU-KI-Verordnung (AI Act) – Volltext mit Art. 4 KI-Kompetenz-Pflicht</a></li>
          </ul>
        </section>

        {/* CTA */}
        <Card className="mb-4 mt-4 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-orange-500/5">
          <CardHeader>
            <CardTitle>Sie suchen den richtigen Anbieter für Ihre Organisation?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              In einem unverbindlichen 30-Minuten-Gespräch klären wir, welches Format und welcher Anbieter zu Ihrem
              Vorhaben passt – auch wenn das am Ende nicht die copilotenschule.de ist. Wir helfen ehrlich bei der
              Entscheidung.
            </p>
            <a href="https://copilotenschule.de/#contact" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:bg-primary/90">
              Kontakt aufnehmen
            </a>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  );
};

export default CopilotSchulungsanbieterVergleich;
