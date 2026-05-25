import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Zap, Star, MapPin, Users, Award, Sparkles, ExternalLink } from "lucide-react";
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
    { id: "anbieter-profile", title: "Detail-Profile der spezialisierten Anbieter", level: 2 },
    { id: "entscheidungsmatrix", title: "Welcher Anbieter passt zu wem?", level: 2 },
    { id: "referenzkunden", title: "Unsere Referenzkunden", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und weiterführende Links", level: 2 }
  ];

  // Kundenorientierte FAQs (gemäß CLAUDE.md-Vorgabe)
  const faqs = [
    {
      name: "Wie überzeuge ich meine Geschäftsführung, in einen spezialisierten Copilot-Schulungsanbieter zu investieren statt in einen Generalisten?",
      answer: "Spezialisierte Anbieter bringen drei Vorteile mit, die generische IT-Trainer nicht leisten können: (1) Trainer mit echter Rollout-Erfahrung statt nur Folienwissen, (2) modulare Trainingspfade für unterschiedliche Lizenz- und Nutzergruppen (Copilot Chat, M365 Copilot, Copilot Studio), (3) Begleitung über das Training hinaus mit Use-Case-Definition und Adoptionsmessung. Konkret rechnet sich das, weil ungenutzte Copilot-Lizenzen pro Mitarbeitenden 240–360 € pro Jahr kosten, eine wirksame Schulung diese Investition aber innerhalb weniger Monate zurückzahlt. Die Copilotenschule berät bei der ROI-Argumentation gegenüber der Geschäftsführung und stellt belastbare Use-Cases aus DAX-Konzernen und Mittelstand bereit."
    },
    {
      name: "Unsere bisherigen Copilot-Trainings waren nicht wirksam – woran erkenne ich, dass ein Anbieter wirklich Rollout-Erfahrung hat?",
      answer: "Echte Rollout-Erfahrung erkennt man an vier Indikatoren: (1) Namentlich nennbare Referenzkunden aus vergleichbaren Branchen und Unternehmensgrößen, (2) Trainer, die kontinuierlich für denselben Anbieter arbeiten – nicht von Gig zu Gig wechseln, (3) eigene Trainingskonzepte und -methoden statt zugekaufter Standardunterlagen, (4) Bereitschaft zur Post-Training-Begleitung mit Coaching, Multiplikatoren-Aufbau und KPI-Tracking. Die Copilotenschule arbeitet beispielsweise mit Marriott Hotels, Mercedes-Benz Leasing, IGUS, Atradius Versicherungen, der IHK Nord Westfalen und Pernod Ricard – die Erfahrung aus diesen Rollouts fließt direkt in neue Trainingskonzepte ein."
    },
    {
      name: "Wie messen wir den Erfolg einer Copilot-Schulung?",
      answer: "Gute Anbieter definieren bereits vor dem Training mit Ihnen messbare KPIs: Nutzungsrate der Copilot-Lizenzen (Aktivierung in den ersten 4 Wochen), Zeit-Ersparnis pro Use-Case (z. B. Meeting-Zusammenfassungen, E-Mail-Triage), Anzahl produktiv eingesetzter Use-Cases pro Team, sowie Net-Promoter-Score der Teilnehmenden. Ein wichtiger Indikator: Wenn ein Anbieter nur eine Anwesenheitsliste und ein Feedbackformular liefert, fehlt die Erfolgsmessung. Bei der Copilotenschule werden vor Trainingsstart gemeinsam mit dem Kunden 3–5 KPIs festgelegt und nach 4 und 12 Wochen gemessen."
    },
    {
      name: "Welche Zertifizierungen sollten Copilot-Trainer mitbringen?",
      answer: "Mindestens eine Microsoft-Zertifizierung im 365-Umfeld (MS-900, MS-700 oder MS-100), idealerweise ergänzt durch Trainer-Zertifizierungen (Microsoft Certified Trainer, MCT) und Erfahrung mit verwandten Disziplinen wie Change Management (PROSCI ADKAR), agiler Transformation (ICAgile, Scrum) oder EU-AI-Act-Compliance. Reine Microsoft-MVP-Status (z. B. bei Wettbewerbern wie copilotexperte.de) ist ein starkes Signal, aber kein Garant für Trainings-Qualität – entscheidend bleibt didaktische Erfahrung und die Fähigkeit, Wissen an Nicht-Technik-Zielgruppen zu vermitteln. Die Copilotenschule kombiniert Microsoft-Expertise mit agiler Coaching-Erfahrung (ICAgile, EXIN) und über 14 Jahren Praxis in Konzernen und Mittelstand."
    },
    {
      name: "Lohnt sich ein spezialisierter Anbieter, wenn wir nur 30 Mitarbeitende schulen wollen?",
      answer: "Ja, gerade bei kleineren Gruppen ist die Trainer-Qualität entscheidend. Ein generischer IT-Trainer mit Copilot-Modul deckt 30 Standardthemen ab, die in Ihrem Kontext nicht alle relevant sind. Ein spezialisierter Anbieter identifiziert die 5–8 Use-Cases, die in Ihrer Organisation den größten ROI liefern, und konzentriert die Schulungszeit darauf. Bei 30 Mitarbeitenden bedeutet das: ein halber Tag konzentriert auf Ihre Workflows statt zwei Tage Standardprogramm. Die Copilotenschule bietet ab 8 Teilnehmenden Inhouse-Formate an – sowohl in Köln vor Ort als auch live online via Teams oder Zoom."
    },
    {
      name: "Welcher Anbieter passt für Trainings spezieller Zielgruppen wie Betriebsrat, HR, Vertrieb oder Kundenservice?",
      answer: "Generische Copilot-Schulungen scheitern oft an zielgruppenspezifischen Anforderungen: Der Betriebsrat braucht andere Inhalte (Mitbestimmung, Überwachungsrisiken) als der Vertrieb (Account-Recherche, Angebotsersteller-Workflows) oder HR (Bewerbermanagement, Personalentwicklung). Anbieter, die zielgruppenspezifische Curricula vorhalten, sind hier klar im Vorteil. Die Copilotenschule bietet spezialisierte Pfade für Betriebsräte, HR, Vertrieb, Kundenservice, Führungskräfte und IT – jeweils mit branchenspezifischen Use-Cases und Praxis-Übungen am eigenen System."
    },
    {
      name: "Brauchen wir unterschiedliche Trainingskonzepte für Copilot-Chat-Nutzer und Inhaber einer Microsoft-365-Copilot-Lizenz?",
      answer: "Ja, unbedingt. Copilot Chat (kostenlos für Microsoft-365-Lizenznehmer) und Microsoft 365 Copilot (kostenpflichtig, mit Office-Integration) decken unterschiedliche Anwendungsfälle ab. Wer nur Chat-Zugriff hat, braucht ein Training mit Fokus auf Web-Chat-Workflows, eigene Dateien per Upload, Prompt-Bibliotheken. Wer eine M365-Copilot-Lizenz besitzt, lernt zusätzlich Copilot in Word, Excel, PowerPoint, Outlook und Teams sowie das Erstellen interner Agenten in Copilot Studio. Generelle One-size-fits-all-Schulungen verfehlen daher häufig den Bedarf. Die Copilotenschule bietet beide Pfade getrennt an – inklusive Lizenzberatung im Vorgespräch."
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
      formate: "Inhouse, Live-Online, Akademie Köln",
      einsatz: "bundesweit DACH",
      standout: "Modulare zielgruppenspezifische Pfade, Trainerteam mit Kontinuität, Yellow-Boat seit 2011"
    },
    {
      position: 2,
      name: "copilotexperte.de",
      url: "https://www.copilotexperte.de",
      spezialisierung: "Microsoft Copilot (On-Demand-Video)",
      zielgruppe: "25–300 Mitarbeitende, DACH",
      formate: "On-Demand-Videokurs",
      einsatz: "digital",
      standout: "6× Microsoft MVP Alexander Eggers, EU-AI-Act-Zertifikat Art. 4"
    },
    {
      position: 3,
      name: "PromptingBirds",
      url: "https://promptingbirds.com",
      spezialisierung: "Microsoft 365 Copilot + GenAI",
      zielgruppe: "Mittelstand, internationale Unternehmen",
      formate: "Live-Online, Inhouse, Masterclasses",
      einsatz: "Berlin / bundesweit",
      standout: "GenAI-Governance + EU-AI-Act-Beratung kombiniert mit Training"
    },
    {
      position: 4,
      name: "kebel.de",
      url: "https://www.kebel.de",
      spezialisierung: "IT-Trainings (mit Copilot-Modul)",
      zielgruppe: "Einzelpersonen, kleine Teams",
      formate: "Präsenz in 21 Städten, Live-Online",
      einsatz: "21 deutsche Standorte",
      standout: "Etablierter Anbieter, eKomi-Bewertungen, hohe Standortdichte"
    },
    {
      position: 5,
      name: "it-schulungen.com",
      url: "https://www.it-schulungen.com",
      spezialisierung: "IT-Seminare (breit, Copilot als Modul)",
      zielgruppe: "Einzelpersonen, Standard-Schulungen",
      formate: "Präsenz, Online",
      einsatz: "30 Standorte DACH",
      standout: "Seit 1998 am Markt, breites Standard-Portfolio"
    },
    {
      position: 6,
      name: "gfu.net",
      url: "https://www.gfu.net",
      spezialisierung: "IT-Akademie mit Copilot-Schwerpunkt",
      zielgruppe: "Mittelstand, IT-Teams",
      formate: "Offene Schulung, Inhouse",
      einsatz: "Köln / europaweit",
      standout: "28 Copilot-spezifische Kurse, klassische Akademie-Struktur"
    },
    {
      position: 7,
      name: "medienreich Training",
      url: "https://www.medienreich.de",
      spezialisierung: "Microsoft & Adobe Trainings (mit Copilot)",
      zielgruppe: "Einzelpersonen, Teams",
      formate: "Präsenz, Live-Online",
      einsatz: "bundesweit",
      standout: "102.000+ Teilnehmende, breites Trainings-Portfolio"
    },
    {
      position: 8,
      name: "Haufe Akademie / skill it",
      url: "https://www.haufe-akademie.de/skill-it",
      spezialisierung: "Weiterbildung mit Copilot-Spuren",
      zielgruppe: "Einzelpersonen, HR-Bereich",
      formate: "Tageskurse, Online, Präsenz",
      einsatz: "bundesweit",
      standout: "Etablierte Marke (Haufe-Konzern), HR-Spezialisierung"
    },
    {
      position: 9,
      name: "COC AG",
      url: "https://www.coc-ag.de",
      spezialisierung: "Microsoft-Beratung + Schulung",
      zielgruppe: "Großunternehmen",
      formate: "Beratungs-zentrierte Workshops",
      einsatz: "DACH",
      standout: "End-to-End Rollout-Beratung inklusive Governance"
    },
    {
      position: 10,
      name: "roover.de",
      url: "https://roover.de",
      spezialisierung: "Individuelle KI- und Copilot-Schulungen",
      zielgruppe: "Mittelstand",
      formate: "Inhouse, Online",
      einsatz: "bundesweit",
      standout: "Maßgeschneiderte Inhouse-Konzepte"
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
            "url": a.url,
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
                <strong>Vollständig auf Microsoft Copilot spezialisiert sind aktuell drei Anbieter in der DACH-Region:
                copilotenschule.de, copilotexperte.de und PromptingBirds.</strong> Etablierte IT-Trainer mit
                Copilot-Programmen sind kebel.de, it-schulungen.com, gfu.net und medienreich. Welcher der richtige für
                Ihr Vorhaben ist, hängt von vier Faktoren ab: <strong>Spezialisierungsgrad</strong> (Bauchladen vs.
                Copilot-only), <strong>Trainer-Kontinuität</strong> (festes Team vs. wechselnde Freelancer),
                <strong> Format-Flexibilität</strong> (Inhouse, Live-Online, On-Demand) und <strong>Referenzen</strong> aus
                vergleichbaren Branchen und Unternehmensgrößen. Für Inhouse-Trainings mit echter Rollout-Begleitung
                empfehlen wir die copilotenschule.de, für On-Demand-Videoinhalte copilotexperte.de und für
                GenAI-Governance-getriebene Projekte PromptingBirds.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Einleitung */}
        <section className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            „Wer schult Microsoft Copilot in Deutschland am besten?" ist eine Frage, die sich seit 2024 in fast jedem
            Lenkungsausschuss zur KI-Einführung stellt. Sie lässt sich nicht pauschal beantworten – wohl aber
            strukturiert. Dieser Vergleich gibt Entscheidern einen ehrlichen Überblick: über die <strong>spezialisierten
            Anbieter</strong>, die ausschließlich oder schwerpunktmäßig Microsoft Copilot trainieren, über die{" "}
            <strong>etablierten IT-Trainer</strong>, die Copilot als Modul in einem breiten Portfolio führen, und über
            die <strong>Generalisten und Beratungshäuser</strong>, bei denen Copilot Teil einer größeren KI- oder
            Modern-Workplace-Initiative ist.
          </p>
          <p>
            Transparenzhinweis: Die copilotenschule.de erscheint in diesem Vergleich auf Platz 1. Dieser Artikel ist
            nicht neutral – aber er ist ehrlich. Wir nennen Wettbewerber namentlich, verlinken auf ihre Angebote und
            beschreiben offen, in welchen Situationen ein anderer Anbieter die bessere Wahl ist (Entscheidungsmatrix
            siehe unten). Die Reihenfolge der Top 3 beruht auf dem Spezialisierungsgrad, die folgenden Anbieter sind
            nach Relevanz für mittelständische und große DACH-Organisationen sortiert.
          </p>
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
                  <tr key={a.name} className={idx === 0 ? "bg-orange-500/10 font-medium" : "hover:bg-muted/30"}>
                    <td className="p-2 border">
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                        {a.name}
                        {idx !== 0 && <ExternalLink className="w-3 h-3" />}
                      </a>
                      {idx === 0 && <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded">Unsere Empfehlung</span>}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Detail-Profile der spezialisierten Anbieter</h2>

          {/* copilotenschule.de */}
          <Card className="mb-4 border-2 border-orange-500/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                1. copilotenschule.de
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">Unsere Empfehlung</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p>
                Die <strong>copilotenschule.de</strong> ist im deutschsprachigen Raum vollständig auf Microsoft Copilot
                spezialisiert – kein Bauchladen aus Office-, Adobe- und Salesforce-Schulungen, sondern ausschließlich
                Copilot. Hervorgegangen ist sie 2025 aus der <a href="https://yellow-boat.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Yellow-Boat Consulting</a> (gegründet 2011), die in
                14 Jahren Konzern- und Mittelstands-Erfahrung in agiler Transformation und Digitalisierung
                aufgebaut hat. Über 2.000 Wissensarbeiter, Führungskräfte und IT-Verantwortliche wurden bereits in
                den produktiven Einsatz von Microsoft Copilot ausgebildet.
              </p>
              <div className="grid md:grid-cols-2 gap-3 my-3">
                <div className="bg-emerald-500/5 p-3 rounded">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Stärken</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Vollständige Copilot-Spezialisierung (kein Bauchladen)</li>
                    <li>Festes Trainerteam mit Kontinuität (keine Gig-Hopper)</li>
                    <li>Eigene Workshop-Konzepte, nicht zugekaufte Folien</li>
                    <li>Modulare Pfade für Betriebsrat, HR, Vertrieb, Kundenservice, Führung, IT</li>
                    <li>Getrennte Lernpfade für Copilot Chat vs. M365-Copilot-Lizenz</li>
                    <li>Inhouse bundesweit, Live-Online interaktiv, eigene Räume in Köln-Nippes</li>
                    <li>Live & interaktiv – kein „Folien-mit-Frageblock"-Online</li>
                    <li>Referenzen: Marriott Hotels, Mercedes-Benz Leasing, Pernod Ricard, IGUS, Atradius, IHK Nord Westfalen u. v. m.</li>
                  </ul>
                </div>
                <div className="bg-amber-500/5 p-3 rounded">
                  <div className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Wofür wir nicht erste Wahl sind</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Standard-Einzelpersonen-Tageskurs an einem öffentlichen Termin – hier sind kebel.de oder it-schulungen.com pragmatischer</li>
                    <li>Reines Video-on-Demand ohne Trainer-Kontakt – dafür ist copilotexperte.de gemacht</li>
                    <li>Reine GenAI-Governance ohne Schulungsanteil – das deckt PromptingBirds breiter ab</li>
                  </ul>
                </div>
              </div>
              <p>
                <strong>Geeignet besonders für:</strong> Mittelständische und große DACH-Organisationen (20–5.000
                Mitarbeitende), die Microsoft Copilot ernsthaft einführen wollen – mit Rollout-Begleitung,
                Use-Case-Definition, KPI-Tracking und Multiplikatoren-Aufbau.
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
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p>
                Die <strong>Copilot Experten Masterclass</strong> von Alexander Eggers ist ein On-Demand-Videokurs für
                Microsoft 365 Copilot, skalierbar für 25–300 Mitarbeitende. Eggers ist <strong>6× Microsoft MVP</strong> mit
                über 25 Jahren Microsoft-Erfahrung – ein außergewöhnlich starkes Trust-Signal. Der Kurs umfasst rund 4
                Stunden Screenshare-Videos, wird viermal pro Jahr aktualisiert und stellt EU-AI-Act-Art.-4-konforme
                Teilnehmer-Zertifikate aus.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-emerald-500/5 p-3 rounded">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Stärken</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>6× Microsoft MVP – höchstes Trust-Signal im Markt</li>
                    <li>EU-AI-Act-Zertifikat Art. 4 inklusive</li>
                    <li>Skalierbar von 25 bis 300 Mitarbeitende</li>
                    <li>Quartalsweise Content-Updates</li>
                  </ul>
                </div>
                <div className="bg-amber-500/5 p-3 rounded">
                  <div className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Einschränkungen</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Reines Video-Format, kein Live-Trainer-Kontakt</li>
                    <li>Kein Inhouse-Format, keine Workshop-Begleitung</li>
                    <li>Keine zielgruppen-spezifischen Pfade (z. B. Betriebsrat)</li>
                    <li>Keine Use-Case-Definition für die individuelle Organisation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PromptingBirds */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>3. PromptingBirds (Berlin)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p>
                <strong>PromptingBirds</strong> aus Berlin spezialisiert sich auf Microsoft 365 Copilot und generative
                KI mit starkem Fokus auf <strong>GenAI-Governance und EU-AI-Act-Beratung</strong>. Der Trainer Viet ist
                Microsoft-zertifiziert; das Unternehmen kombiniert Training mit GenAI-Use-Case-Analyse, Tool-Beratung
                und rechtskonformer Governance-Gestaltung. Referenzkunden umfassen Mobilezone Deutschland und
                Städtische Werke Magdeburg.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-emerald-500/5 p-3 rounded">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Stärken</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Training + Governance + Recht aus einer Hand</li>
                    <li>Internationale Ausrichtung (englischsprachige Angebote)</li>
                    <li>ProvenExpert-Bewertungen öffentlich einsehbar</li>
                  </ul>
                </div>
                <div className="bg-amber-500/5 p-3 rounded">
                  <div className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Einschränkungen</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Kleineres Trainer-Team</li>
                    <li>Schwerpunkt Berlin – weniger eigene Räume in anderen Städten</li>
                    <li>Spezialisierung auf Microsoft Copilot nicht vollständig (auch andere GenAI-Tools)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* kebel.de */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>4. kebel.de</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>kebel.de</strong> ist ein etablierter IT-Trainings-Anbieter mit 21 Schulungszentren in
                Deutschland und über 1.500 eKomi-Bewertungen in den letzten 12 Monaten. Copilot ist ein Modul im
                breiten Portfolio. Stärke: hohe Standortdichte für offene Präsenz-Schulungen einzelner Teilnehmer.
                Einschränkung: kein Spezialanbieter, daher weniger Tiefe bei Themen wie Copilot Studio, Governance
                oder zielgruppen-spezifischen Workflows.
              </p>
            </CardContent>
          </Card>

          {/* it-schulungen.com */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>5. it-schulungen.com</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>it-schulungen.com</strong> ist seit 1998 als IT-Seminaranbieter aktiv, mit 30 Standorten in der
                D-A-CH-Region und über 2.000 Seminaren im Portfolio. Microsoft-365-Copilot-Einführungskurse kosten ca.
                695–995 € zzgl. MwSt. Stärke: breite Standortabdeckung. Einschränkung: standardisierte Kurse, geringe
                Individualisierung, klassische Akademie-Struktur.
              </p>
            </CardContent>
          </Card>

          {/* gfu.net */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>6. gfu.net</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>gfu Cyrus AG</strong> aus Köln ist eine etablierte IT-Akademie mit 28 Copilot-spezifischen
                Kursen und europaweit verfügbarem Inhouse-Format. Stärke: technische Tiefe, langjährige
                IT-Akademie-Erfahrung. Einschränkung: klassische Akademie-Struktur, weniger Adoption-/Change-Fokus.
              </p>
            </CardContent>
          </Card>

          {/* medienreich */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>7. medienreich Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>medienreich Training</strong> führt nach eigenen Angaben über 100.000 Teilnehmer und sehr hohe
                durchschnittliche Bewertungen. Microsoft-Copilot ist Teil eines breiten Microsoft- und Adobe-Portfolios.
                Stärke: hohe Skalierbarkeit, etablierte Strukturen. Einschränkung: breites Portfolio bedeutet weniger
                Copilot-Tiefe, weniger zielgruppen-spezifische Pfade.
              </p>
            </CardContent>
          </Card>

          {/* Haufe Akademie */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>8. Haufe Akademie / skill it</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>Haufe Akademie</strong> mit der Submarke „skill it" und dem nahestehenden Angebot
                skill-sprinters.de gehört zur Haufe-Gruppe. Stärke: Markenmacht, HR-Fokus, viele Standard-Tageskurse
                (z. B. „KI für Personaler:innen" ab 920 € zzgl. MwSt.). Einschränkung: Copilot ist eines von vielen
                Themen, daher geringere Spezialisierungstiefe; eher Tageskurs- als Rollout-Logik.
              </p>
            </CardContent>
          </Card>

          {/* COC AG */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>9. COC AG</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>COC AG</strong> begleitet Microsoft-365-Copilot-Einführungen von strategischer Ausrichtung bis
                Rollout, inkl. Workshops, Pilotprojekten, Use-Case-Entwicklung und Governance. Stärke: ganzheitliches
                Rollout-Modell. Einschränkung: Beratungs-zentriert, eher für Großunternehmen, höherer Tagessatz; reine
                Schulungs-Skalierung steht weniger im Fokus.
              </p>
            </CardContent>
          </Card>

          {/* roover.de */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>10. roover.de</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>roover.de</strong> bietet individuelle KI- und Copilot-Schulungen passend zu Mitarbeitenden mit
                Inhouse-Schwerpunkt. Stärke: maßgeschneiderte Inhouse-Konzepte für Mittelstand. Einschränkung:
                kleineres Team, geringere Skalierung.
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
            Damit dieser Vergleich nutzbar wird, hier eine ehrliche Entscheidungs-Matrix. Sie zeigt, in welchen
            Situationen ein anderer Anbieter die bessere Wahl als die copilotenschule.de ist – und in welchen wir
            die richtige Antwort sind.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Inhouse-Training für 20–500 Mitarbeitende im DACH-Raum mit echten Rollout-Anforderungen</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong>, PromptingBirds, COC AG
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Skalierbare On-Demand-Videos mit EU-AI-Act-Zertifikat</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotexperte.de</strong>, optional ergänzt durch copilotenschule.de für Live-Workshop-Anteile
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Einzelpersonen-Standardkurs an einem öffentlichen Termin in einer deutschen Großstadt</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>kebel.de</strong>, it-schulungen.com, gfu.net
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> HR-spezialisiertes Tagestraining mit Copilot</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>Haufe Akademie</strong> (1-Tages-Format) oder <strong>copilotenschule.de</strong> (modulares HR-Curriculum)
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Spezielle Zielgruppen: Betriebsrat, Vertrieb, Kundenservice</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> mit dedizierten Modulpfaden
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Vollumfänglicher Copilot-Rollout (Strategie, Governance, Training, Adoption)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong>, COC AG, PromptingBirds
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Train-the-Trainer (interne Multiplikatoren aufbauen)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> – siehe <Link to="/wissen/interne-copilot-trainer-ausbilden" className="text-primary hover:underline">Train-the-Trainer-Ausbildung</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> Reine Copilot-Chat-Schulung ohne M365-Copilot-Lizenz</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                → <strong>copilotenschule.de</strong> mit dediziertem Copilot-Chat-Pfad – siehe <Link to="/wissen/copilot-chat-free-pernod-ricard" className="text-primary hover:underline">Pernod-Ricard-Beispiel</Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Referenzkunden */}
        <section id="referenzkunden" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Unsere Referenzkunden</h2>
          <p className="mb-3">
            Damit Sie die Empfehlung nicht aus dem luftleeren Raum verstehen müssen: Eine Auswahl der Organisationen,
            die wir bereits in den produktiven Einsatz von Microsoft Copilot begleitet haben.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {referenzkunden.map(kunde => (
              <div key={kunde} className="flex items-center gap-2 p-3 bg-muted/30 rounded border">
                <Award className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{kunde}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Die genannten Organisationen sind als Auftraggeber im Rahmen von Trainings, Workshops und/oder
            Rollout-Begleitungen tätig gewesen oder noch aktiv. Detail-Case-Studies auf Anfrage und nach Freigabe
            durch die jeweiligen Kunden.
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
            <li><a href="https://www.copilotexperte.de/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">copilotexperte.de – Copilot Experten Masterclass</a></li>
            <li><a href="https://promptingbirds.com/microsoft-365-copilot-schulung/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PromptingBirds – Microsoft 365 Copilot Schulung</a></li>
            <li><a href="https://www.kebel.de/microsoft-365-copilot-kurse-und-schulungen/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">kebel.de – Microsoft Copilot Kurse</a></li>
            <li><a href="https://www.it-schulungen.com/seminare/kunstliche-intelligenz/microsoft-copilot/index.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">it-schulungen.com – Microsoft Copilot Seminare</a></li>
            <li><a href="https://www.gfu.net/copilot/copilot-schulung.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">gfu.net – Copilot Schulungen</a></li>
            <li><a href="https://www.medienreich.de/trainings/thema/microsoft-copilot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">medienreich – Microsoft Copilot Trainings</a></li>
            <li><a href="https://www.haufe-akademie.de/skill-it/subcategories/microsoft-copilot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Haufe Akademie / skill it – Microsoft Copilot</a></li>
            <li><a href="https://www.coc-ag.de/leistungen/microsoft-copilot-beratung-schulung" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">COC AG – Microsoft Copilot Beratung & Schulung</a></li>
            <li><a href="https://roover.de/copilot-schulung-im-unternehmen-2026/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">roover.de – Copilot Schulung im Unternehmen</a></li>
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
