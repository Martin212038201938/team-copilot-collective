import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap, AlertTriangle, Users, GraduationCap, Target, TrendingUp,
  Clock, CheckCircle2, XCircle, Brain, Lightbulb, ArrowRight,
  Building2, UserCheck, Calendar, ExternalLink, BookOpen, Linkedin, Mail
} from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-training-schulung";
const PAGE_TITLE = "Microsoft Copilot Training & Schulung";

const CopilotTraining = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "warum-training", title: "Warum professionelles Training entscheidend ist", level: 2 },
    { id: "typische-fehler", title: "Typische Fehler bei der Copilot-Schulung", level: 2 },
    { id: "max-und-anna", title: "Das 'Max und Anna'-Problem", level: 2 },
    { id: "trainingskonzept", title: "Das 4-Phasen-Trainingskonzept", level: 2 },
    { id: "zielgruppen", title: "Training nach Zielgruppen", level: 2 },
    { id: "inhalte", title: "Was muss geschult werden?", level: 2 },
    { id: "champions", title: "Champions-Programm aufbauen", level: 2 },
    { id: "zertifizierung", title: "Prüfungen & Zertifizierungsprogramme", level: 2 },
    { id: "roi", title: "ROI von Copilot-Training", level: 2 },
    { id: "checkliste", title: "Trainings-Checkliste", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const faqs = [
    {
      name: "Warum reicht ein einmaliges Webinar für Copilot nicht aus?",
      answer: "Copilot verändert fundamental, wie Menschen arbeiten – das lernt man nicht in 60 Minuten. Laut Gartner kämpfen 72% der Nutzer damit, Copilot in den Alltag zu integrieren, und bei 57% sinkt das Engagement schnell wieder. Nachhaltiger Erfolg erfordert Hands-On-Übungen, rollenspezifische Use Cases und begleitetes Lernen über mindestens 8-12 Wochen."
    },
    {
      name: "Können unsere IT-affinen Mitarbeiter die anderen schulen?",
      answer: "Das 'Max und Anna'-Modell – interne Enthusiasten schulen nebenher – ist nicht skalierbar und führt zu inkonsistentem Wissen. IT-Affinität bedeutet nicht Didaktik-Kompetenz. Professionelles Training vermittelt strukturiert Prompt Engineering, Security-Bewusstsein und abteilungsspezifische Anwendungsfälle, die Laien-Trainer meist nicht abdecken."
    },
    {
      name: "Was kostet es, wenn wir auf Copilot-Training verzichten?",
      answer: "Bei 100 Lizenzen à 30€/Monat und nur 20% aktiver Nutzung verschwenden Sie jährlich 28.800€ für ungenutzte Lizenzen. Laut Microsoft Work Trend Index berichten 77% der geschulten Nutzer höhere Produktivität, und Forrester beziffert die Zeitersparnis auf 9 Stunden pro Monat. Training kostet einmalig ca. 150-300€ pro Person – das amortisiert sich laut Forrester TEI Study in wenigen Wochen."
    },
    {
      name: "Wie lange dauert ein vollständiges Copilot-Trainingsprogramm?",
      answer: "Ein effektives Programm erstreckt sich über 8-12 Wochen: Woche 1-2 für Grundlagen (4h), Woche 3-4 für Hands-On-Workshops (4h), Woche 5-8 für begleitete Praxis mit Champions, Woche 9-12 für Advanced Training und Optimierung. Der Zeitaufwand pro Mitarbeiter beträgt ca. 12-16 Stunden verteilt über 3 Monate."
    },
    {
      name: "Sollten wir alle Mitarbeiter gleichzeitig oder in Wellen schulen?",
      answer: "Wellen-Rollout ist strategisch besser: Starten Sie mit einer Pilotgruppe von 20-50 motivierten Nutzern, lernen Sie aus deren Feedback, optimieren Sie Materialien, und skalieren Sie dann abteilungsweise. So vermeiden Sie, dass 500 Mitarbeiter gleichzeitig dieselben Anfängerfehler machen und den Support überlasten."
    },
    {
      name: "Bieten Sie auch Prüfungen und Zertifikate für Copilot-Trainings an?",
      answer: "Ja, die Copilotenschule bietet maßgeschneiderte Quizze und Prüfungen, bei denen Teilnehmer aktiv beweisen müssen, dass sie das Gelernte verstanden haben – keine Multiple-Choice-Tests, sondern praxisnahe Aufgaben. Nach bestandener Prüfung erhalten sowohl die Mitarbeiter als auch das Unternehmen ein offizielles Zertifikat. Wir bieten auch aufeinander aufbauende Zertifizierungsstufen wie 'Copilot in der Praxis I-IV' (Beginner bis Expert), die einen strukturierten Kompetenzaufbau ermöglichen. Das gibt Unternehmen Investitionssicherheit und Mitarbeitern einen handfesten Nachweis ihrer KI-Fähigkeiten."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Microsoft Copilot Training: Warum Schulung der entscheidende Erfolgsfaktor ist",
        "description": "Professionelles Copilot-Training ist der Schlüssel zum ROI. Erfahren Sie, warum interne Taskforces scheitern und wie systematische Schulung Ihre Adoption auf 80%+ steigert.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-02",
        "dateModified": "2026-02-02",
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
        title="Microsoft Copilot Training: Der entscheidende Erfolgsfaktor für ROI"
        description="Professionelles Copilot-Training ist der Schlüssel zum ROI. Erfahren Sie, warum interne Taskforces scheitern und wie systematische Schulung Ihre Adoption auf 80%+ steigert."
        keywords={[
          "Microsoft Copilot Training",
          "Copilot Schulung",
          "Copilot Mitarbeiterschulung",
          "Copilot Adoption",
          "Copilot Enablement",
          "Copilot Champions Programm",
          "Copilot ROI Training",
          "Microsoft 365 Copilot lernen",
          "Copilot Workshop",
          "Copilot Prompt Training",
          "KI Schulung Unternehmen",
          "Copilot Change Management"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-02T10:00:00+01:00"
        modifiedTime="2026-02-02T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot Training", href: `/wissen/${SLUG}` }
        ]}
        title="Microsoft Copilot Training: Warum Schulung der entscheidende Erfolgsfaktor ist"
        description="Professionelles Copilot-Training ist der Schlüssel zum ROI. Erfahren Sie, warum interne Taskforces scheitern und wie systematische Schulung Ihre Adoption auf 80%+ steigert."
        lastUpdated="02. Februar 2026"
        readTime="18 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Die Mitarbeiter nicht professionell schulen ist der teuerste Fehler bei der Copilot-Einführung.</strong> Der
              Einstieg scheint niederschwellig, aber die veränderte Arbeitsweise ist so tiefgreifend, dass man das nicht einer
              internen Taskforce aus interessierten Mitarbeitern überlassen kann, die das nebenher noch treiben soll.
              Es ist schön wenn Max und Anna "KI können" – aber das ist NICHT skalierbar. Ohne systematisches Training
              zahlen Sie für Lizenzen, die niemand nutzt. Dieser Artikel zeigt, wie Sie Training richtig aufsetzen.
            </p>
          </CardContent>
        </Card>

        {/* Sektion 1: Warum Training */}
        <section id="warum-training">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-orange-500 text-orange-700 dark:text-orange-400">
            Warum professionelles Training entscheidend ist
          </h2>

          <p className="mb-6">
            Microsoft 365 Copilot ist keine gewöhnliche Software-Einführung. Es verändert fundamental, wie Menschen
            arbeiten, denken und mit Informationen umgehen. Das macht Training nicht optional, sondern existenziell
            für den Erfolg Ihrer Investition.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Copilot ohne Training einzuführen ist wie einem Fahrschüler einen Ferrari zu schenken und zu hoffen,
            dass er schon irgendwie fährt. Technisch möglich – praktisch eine Katastrophe."
          </blockquote>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Die Zahlen sprechen für sich
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    metric: "72%",
                    label: "kämpfen mit Alltags-Integration",
                    detail: "ohne strukturiertes Training",
                    color: "red",
                    quelle: "Gartner Survey 2024"
                  },
                  {
                    metric: "77%",
                    label: "höhere Produktivität",
                    detail: "mit professionellem Training",
                    color: "green",
                    quelle: "Microsoft Work Trend Index"
                  },
                  {
                    metric: "9h",
                    label: "Zeitersparnis pro Monat",
                    detail: "bei trainierten Nutzern",
                    color: "blue",
                    quelle: "Forrester TEI Study"
                  }
                ].map((stat, idx) => (
                  <div key={idx} className={`p-5 border-2 border-${stat.color}-500/30 rounded-xl text-center bg-gradient-to-br from-${stat.color}-500/5 to-${stat.color}-600/10`}>
                    <div className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.metric}</div>
                    <div className="font-semibold mt-2">{stat.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.detail}</div>
                    <div className="text-xs text-muted-foreground mt-2 italic">Quelle: {stat.quelle}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-base">Warum Copilot anders ist als andere Software</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    aspekt: "Neue Denkweise erforderlich",
                    erklärung: "Nutzer müssen lernen, in Prompts zu denken – das ist eine völlig neue Kompetenz",
                    icon: Brain
                  },
                  {
                    aspekt: "Keine festen Menüs",
                    erklärung: "Anders als bei Excel gibt es keine Buttons zum Klicken – die Möglichkeiten sind grenzenlos und überfordernd",
                    icon: Lightbulb
                  },
                  {
                    aspekt: "Qualität variiert",
                    erklärung: "Copilot-Outputs hängen massiv von der Prompt-Qualität ab – schlechte Prompts = schlechte Ergebnisse = Frustration",
                    icon: Target
                  },
                  {
                    aspekt: "Security-Bewusstsein nötig",
                    erklärung: "Nutzer müssen verstehen, was sie in Prompts eingeben dürfen und was nicht – Datenschutz ist kritisch",
                    icon: AlertTriangle
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg">
                    <item.icon className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">{item.aspekt}</div>
                      <div className="text-sm text-muted-foreground">{item.erklärung}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 2: Typische Fehler */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Typische Fehler bei der Copilot-Schulung
          </h2>

          <p className="mb-6">
            Die meisten Unternehmen machen bei der Copilot-Schulung dieselben Fehler. Erkennen Sie sich wieder?
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            {[
              {
                fehler: "Die Ankündigungs-E-Mail",
                beschreibung: "IT sendet: 'Copilot ist jetzt verfügbar. Viel Spaß!' Ende der Kommunikation.",
                konsequenz: "5% Adoption nach 3 Monaten",
                icon: XCircle
              },
              {
                fehler: "Das 60-Minuten-Webinar",
                beschreibung: "Einmaliges Webinar für alle, PowerPoint-Schlacht, keine Übungen.",
                konsequenz: "Wissen nach 2 Wochen vergessen",
                icon: XCircle
              },
              {
                fehler: "Die YouTube-Playlist",
                beschreibung: "'Schaut euch diese 20 Videos an' – ohne Kontext, Struktur oder Praxisbezug.",
                konsequenz: "Niemand schaut mehr als 2 Videos",
                icon: XCircle
              },
              {
                fehler: "Die Taskforce-Lösung",
                beschreibung: "Max und Anna aus der IT sollen 'das mal nebenher' für 500 Kollegen übernehmen.",
                konsequenz: "Burnout bei Max und Anna, inkonsistentes Wissen",
                icon: XCircle
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <item.icon className="w-5 h-5 text-red-600" />
                    {item.fehler}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{item.beschreibung}</p>
                  <div className="p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded text-sm">
                    <strong className="text-red-700 dark:text-red-300">Resultat:</strong>
                    <span className="text-red-600 dark:text-red-400 ml-2">{item.konsequenz}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-6 border-2 border-red-500/20">
            <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-600/10">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Realität in vielen Unternehmen
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="font-semibold mb-3">Timeline einer gescheiterten Einführung:</p>
                  <div className="space-y-3">
                    {[
                      { zeit: "Tag 1", ereignis: "Lizenzen aktiviert, E-Mail versendet" },
                      { zeit: "Woche 1", ereignis: "30% probieren Copilot, bekommen schlechte Ergebnisse" },
                      { zeit: "Woche 2", ereignis: "Word-of-Mouth: 'Copilot ist nutzlos'" },
                      { zeit: "Monat 1", ereignis: "Nutzung sinkt auf 15%" },
                      { zeit: "Monat 3", ereignis: "5% aktive Nutzer, CFO fragt nach ROI" },
                      { zeit: "Monat 6", ereignis: "Diskussion über Lizenz-Reduktion" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-20 flex-shrink-0 font-mono text-sm font-semibold text-red-600">{item.zeit}</div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <div className="text-sm">{item.ereignis}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 3: Max und Anna Problem */}
        <section id="max-und-anna" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-amber-500 text-amber-700 dark:text-amber-400">
            Das "Max und Anna"-Problem
          </h2>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Es ist schön wenn Max und Anna 'KI können' – aber das ist NICHT skalierbar.
            Zwei Enthusiasten können nicht 500 Kollegen nachhaltig befähigen, während sie
            gleichzeitig ihren eigentlichen Job machen."
          </blockquote>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Warum das Taskforce-Modell scheitert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Probleme des internen Ansatzes
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Keine Zeit:</strong> Max und Anna haben eigentlich andere Jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Keine Didaktik:</strong> IT-Affinität ≠ Trainingskompetenz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Kein Curriculum:</strong> Jeder erklärt anders, Wissen ist inkonsistent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Burnout-Risiko:</strong> Ständige Anfragen neben dem Tagesgeschäft</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Single Point of Failure:</strong> Max kündigt = Wissen weg</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Was stattdessen funktioniert
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Professionelles Curriculum:</strong> Strukturierter, erprobter Lernpfad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Dedizierte Zeit:</strong> Training ist Projektaufgabe, nicht Nebenjob</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Train-the-Trainer:</strong> Champions werden selbst geschult</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Skalierbare Materialien:</strong> Videos, Guides, Templates für alle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Messbarer Erfolg:</strong> KPIs und Adoption-Tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="text-lg">Die Rechnung: Max & Anna vs. Professionelles Training</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Aspekt</th>
                      <th className="text-left py-2 px-4">Interner Ansatz</th>
                      <th className="text-left py-2 pl-4">Professionelles Training</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { aspekt: "Zeit pro MA", intern: "~4h (fragmentiert)", profi: "12-16h (strukturiert)" },
                      { aspekt: "Adoption nach 3 Mon.", intern: "15-25%", profi: "70-85%" },
                      { aspekt: "Wissenstiefe", intern: "Oberflächlich", profi: "Rollenspezifisch" },
                      { aspekt: "Security-Schulung", intern: "Meist vergessen", profi: "Integriert" },
                      { aspekt: "Skalierbarkeit", intern: "Max. 50 MA", profi: "Unbegrenzt" },
                      { aspekt: "Opportunity Cost", intern: "Max & Anna fehlen im Job", profi: "Keine Ablenkung" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 pr-4 font-medium">{row.aspekt}</td>
                        <td className="py-2 px-4 text-red-600 dark:text-red-400">{row.intern}</td>
                        <td className="py-2 pl-4 text-green-600 dark:text-green-400">{row.profi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 4: 4-Phasen-Konzept */}
        <section id="trainingskonzept" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Das 4-Phasen-Trainingskonzept
          </h2>

          <p className="mb-6">
            Erfolgreiches Copilot-Training folgt einem erprobten 4-Phasen-Modell, das Wissen nachhaltig verankert
            und kontinuierliche Verbesserung ermöglicht.
          </p>

          <div className="space-y-6 my-6">
            {[
              {
                phase: "Phase 1: Foundation",
                zeitraum: "Woche 1-2",
                dauer: "4 Stunden",
                farbe: "blue",
                ziele: ["Grundverständnis von KI und Copilot", "Erste Erfolgserlebnisse", "Security-Awareness"],
                inhalte: [
                  "Was ist Copilot? Wie funktioniert es?",
                  "Erste Prompts: E-Mails, Zusammenfassungen",
                  "Do's und Don'ts: Was darf in Prompts?",
                  "Hands-On: 5 Use Cases für den Alltag"
                ]
              },
              {
                phase: "Phase 2: Skill Building",
                zeitraum: "Woche 3-4",
                dauer: "4 Stunden",
                farbe: "green",
                ziele: ["Prompt Engineering vertiefen", "App-spezifische Features", "Effizienz steigern"],
                inhalte: [
                  "Advanced Prompting: Kontext, Struktur, Iteration",
                  "Copilot in Word, Excel, PowerPoint, Outlook",
                  "Copilot in Teams: Meetings, Chat, Channels",
                  "Praktische Übungen mit echten Dokumenten"
                ]
              },
              {
                phase: "Phase 3: Mastery",
                zeitraum: "Woche 5-8",
                dauer: "Kontinuierlich",
                farbe: "purple",
                ziele: ["Rollenspezifische Expertise", "Peer Learning etablieren", "Best Practices entwickeln"],
                inhalte: [
                  "Abteilungsspezifische Use Cases (Sales, HR, Finance...)",
                  "Champions coachen Kollegen",
                  "Prompt Library aufbauen",
                  "Wöchentliche Q&A Sessions"
                ]
              },
              {
                phase: "Phase 4: Excellence",
                zeitraum: "Woche 9+",
                dauer: "Ongoing",
                farbe: "orange",
                ziele: ["Kontinuierliche Verbesserung", "Innovation fördern", "Neue Features integrieren"],
                inhalte: [
                  "Monatliche Tipps & Tricks Sessions",
                  "New Feature Announcements",
                  "Advanced Training für Power User",
                  "Success Stories & Best Practices teilen"
                ]
              }
            ].map((p, idx) => (
              <Card key={idx} className={`border-l-4 border-l-${p.farbe}-500`}>
                <CardHeader className={`bg-gradient-to-r from-${p.farbe}-500/10 to-${p.farbe}-600/5`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className={`text-lg text-${p.farbe}-700 dark:text-${p.farbe}-400`}>
                      {p.phase}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {p.zeitraum}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {p.dauer}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-sm">Ziele:</h5>
                      <ul className="space-y-1 text-sm">
                        {p.ziele.map((z, zidx) => (
                          <li key={zidx} className="flex items-center gap-2">
                            <Target className={`w-4 h-4 text-${p.farbe}-600`} />
                            {z}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 text-sm">Inhalte:</h5>
                      <ul className="space-y-1 text-sm">
                        {p.inhalte.map((i, iidx) => (
                          <li key={iidx} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 text-${p.farbe}-600 mt-0.5 flex-shrink-0`} />
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 5: Zielgruppen */}
        <section id="zielgruppen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-purple-500 text-purple-700 dark:text-purple-400">
            Training nach Zielgruppen
          </h2>

          <p className="mb-6">
            Nicht jeder braucht dasselbe Training. Unterschiedliche Rollen haben unterschiedliche Use Cases,
            Vorkenntnisse und Anforderungen.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            {[
              {
                gruppe: "Führungskräfte & Management",
                icon: Building2,
                fokus: ["Strategische Nutzung", "Entscheidungsunterstützung", "Team-Produktivität"],
                useCases: ["Meeting-Vorbereitung", "Report-Erstellung", "E-Mail-Management"],
                dauer: "4h kompakt"
              },
              {
                gruppe: "Wissensarbeiter (Office)",
                icon: Users,
                fokus: ["Tägliche Produktivität", "Dokument-Erstellung", "Kommunikation"],
                useCases: ["Word-Dokumente", "Excel-Analysen", "PowerPoint-Präsentationen"],
                dauer: "8-12h verteilt"
              },
              {
                gruppe: "Sales & Marketing",
                icon: Target,
                fokus: ["Kundenansprache", "Content-Erstellung", "Analyse"],
                useCases: ["Proposals", "Social Media", "Wettbewerbsanalysen"],
                dauer: "8h + Coaching"
              },
              {
                gruppe: "HR & People",
                icon: UserCheck,
                fokus: ["Recruiting", "Mitarbeiterkommunikation", "Dokumentation"],
                useCases: ["Stellenanzeigen", "Onboarding-Docs", "Policy-Erstellung"],
                dauer: "6h + Templates"
              },
              {
                gruppe: "Finance & Controlling",
                icon: TrendingUp,
                fokus: ["Datenanalyse", "Reporting", "Compliance"],
                useCases: ["Excel-Formeln", "Finanzberichte", "Variance-Analysen"],
                dauer: "8h + Security-Fokus"
              },
              {
                gruppe: "IT & Admins",
                icon: GraduationCap,
                fokus: ["Governance", "Support", "Champions-Rolle"],
                useCases: ["User-Support", "Policy-Enforcement", "Troubleshooting"],
                dauer: "12h Train-the-Trainer"
              }
            ].map((z, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <z.icon className="w-5 h-5 text-purple-600" />
                    {z.gruppe}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Fokus</h5>
                      <div className="flex flex-wrap gap-1">
                        {z.fokus.map((f, fidx) => (
                          <span key={fidx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Top Use Cases</h5>
                      <ul className="text-sm space-y-1">
                        {z.useCases.map((u, uidx) => (
                          <li key={uidx}>• {u}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm font-medium">Empfohlene Dauer: </span>
                      <span className="text-sm text-purple-600 dark:text-purple-400">{z.dauer}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 6: Was muss geschult werden */}
        <section id="inhalte" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            Was muss geschult werden?
          </h2>

          <p className="mb-6">
            Ein vollständiges Copilot-Training umfasst mehr als nur "wie schreibe ich Prompts".
            Hier sind die 5 Säulen eines erfolgreichen Curriculums.
          </p>

          <Card className="my-6">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    säule: "1. Prompt Engineering",
                    wichtigkeit: "Kritisch",
                    themen: [
                      "Grundstruktur eines guten Prompts (Kontext, Aufgabe, Format)",
                      "Iteratives Verfeinern von Prompts",
                      "Roleplay-Prompts ('Du bist ein...')",
                      "Few-Shot Prompting mit Beispielen",
                      "Negative Prompts ('Vermeide...')"
                    ]
                  },
                  {
                    säule: "2. App-spezifische Features",
                    wichtigkeit: "Hoch",
                    themen: [
                      "Word: Dokument-Drafts, Zusammenfassungen, Umschreiben",
                      "Excel: Formeln, Analysen, Datenvisualisierung",
                      "PowerPoint: Präsentationen erstellen, Slides generieren",
                      "Outlook: E-Mails verfassen, zusammenfassen, priorisieren",
                      "Teams: Meeting-Summaries, Chat-Zusammenfassungen"
                    ]
                  },
                  {
                    säule: "3. Security & Compliance",
                    wichtigkeit: "Kritisch",
                    themen: [
                      "Was darf NICHT in Prompts? (Gehälter, Kundendaten, etc.)",
                      "Sensitivity Labels verstehen und beachten",
                      "DLP-Policies und deren Auswirkungen",
                      "DSGVO-konforme Nutzung",
                      "Incident Reporting bei Sicherheitsproblemen"
                    ]
                  },
                  {
                    säule: "4. Kritisches Denken",
                    wichtigkeit: "Hoch",
                    themen: [
                      "Halluzinationen erkennen",
                      "Quellen verifizieren",
                      "Fakten-Check bei Zahlen und Zitaten",
                      "Wann Copilot NICHT nutzen",
                      "Human-in-the-Loop Prinzip"
                    ]
                  },
                  {
                    säule: "5. Workflow-Integration",
                    wichtigkeit: "Mittel",
                    themen: [
                      "Copilot in bestehende Prozesse einbinden",
                      "Zeitersparnis-Potenziale identifizieren",
                      "Team-Best-Practices etablieren",
                      "Prompt-Libraries aufbauen und teilen",
                      "Kontinuierliche Verbesserung"
                    ]
                  }
                ].map((s, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-primary">{s.säule}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        s.wichtigkeit === 'Kritisch'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : s.wichtigkeit === 'Hoch'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        Wichtigkeit: {s.wichtigkeit}
                      </span>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm">
                      {s.themen.map((t, tidx) => (
                        <li key={tidx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 7: Champions-Programm */}
        <section id="champions" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-cyan-500 text-cyan-700 dark:text-cyan-400">
            Champions-Programm aufbauen
          </h2>

          <p className="mb-6">
            Champions sind der Multiplikator für nachhaltigen Erfolg. Hier können Anna und Max
            Wirkung erzeugen, sich einbringen, begeistern und unterstützen!
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Ein gutes Champions-Programm macht aus 5 Power Usern 50 kompetente Nutzer –
            und aus 50 werden 500. Das ist der Skalierungseffekt, den interne Taskforces nie erreichen."
          </blockquote>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Das ideale Champions-Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-cyan-600 mb-2">Mindset</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Offenheit für Neues</li>
                    <li>• Freude am Teilen von Wissen</li>
                    <li>• Geduld mit Lernenden</li>
                    <li>• Positive Einstellung zu KI</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-cyan-600 mb-2">Skills</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Gute Office 365 Kenntnisse</li>
                    <li>• Kommunikationsstärke</li>
                    <li>• Problemlösungsfähigkeit</li>
                    <li>• Didaktisches Geschick</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-cyan-600 mb-2">Ressourcen</h5>
                  <ul className="text-sm space-y-1">
                    <li>• 4-8h/Woche dedizierte Zeit</li>
                    <li>• Management-Support</li>
                    <li>• Zugang zu Trainingsmaterialien</li>
                    <li>• Netzwerk im Unternehmen</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-l-4 border-l-cyan-500">
            <CardHeader>
              <CardTitle className="text-base">Champions-Programm: 8-Wochen-Aufbau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { woche: "Woche 1-2", aktivität: "Champion-Auswahl & Kick-off", details: "Kriterien definieren, Kandidaten identifizieren, Mandat erteilen" },
                  { woche: "Woche 3-4", aktivität: "Intensive Champion-Schulung", details: "12h Train-the-Trainer, Advanced Features, Didaktik-Basics" },
                  { woche: "Woche 5-6", aktivität: "Pilot mit Schatten-Coaching", details: "Champions schulen erste Gruppe, Trainer beobachtet und gibt Feedback" },
                  { woche: "Woche 7-8", aktivität: "Selbstständiger Rollout", details: "Champions schulen ihre Abteilungen, regelmäßige Check-ins" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="w-24 flex-shrink-0 font-mono text-sm font-semibold text-cyan-600">{item.woche}</div>
                    <div>
                      <div className="font-semibold">{item.aktivität}</div>
                      <div className="text-sm text-muted-foreground">{item.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Wie viele Champions brauchen Sie?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Unternehmensgröße</th>
                      <th className="text-left py-2">Empfohlene Champions</th>
                      <th className="text-left py-2">Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { größe: "50-100 Mitarbeiter", champions: "3-5", ratio: "1:20" },
                      { größe: "100-500 Mitarbeiter", champions: "10-20", ratio: "1:25" },
                      { größe: "500-1000 Mitarbeiter", champions: "25-40", ratio: "1:25" },
                      { größe: "1000+ Mitarbeiter", champions: "40+ (pro Abteilung)", ratio: "1:30" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2">{row.größe}</td>
                        <td className="py-2 font-semibold text-cyan-600">{row.champions}</td>
                        <td className="py-2">{row.ratio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 8: Zertifizierungsprogramme */}
        <section id="zertifizierung" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-violet-500 text-violet-700 dark:text-violet-400">
            Prüfungen & Zertifizierungsprogramme
          </h2>

          <p className="mb-6">
            Training allein reicht nicht – erst der <strong>nachweisbare Kompetenzaufbau</strong> gibt Unternehmen
            Investitionssicherheit und Mitarbeitern einen handfesten Beweis ihrer Fähigkeiten. Die Copilotenschule
            bietet maßgeschneiderte Prüfungen und Zertifizierungsprogramme, die echtes Können validieren.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Ein Zertifikat ist mehr als ein PDF – es ist der dokumentierte Nachweis, dass Ihre Mitarbeiter
            KI-kompetent sind und dass Ihre Investition in Training messbare Ergebnisse liefert."
          </blockquote>

          <Card className="my-6 border-2 border-violet-500/20">
            <CardHeader className="bg-gradient-to-r from-violet-500/10 to-violet-600/10">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-violet-600" />
                Customized Quizze & Prüfungen
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">
                Wir entwickeln für Ihr Unternehmen individuelle Wissenstests und Prüfungen, bei denen
                Teilnehmer aktiv beweisen müssen, dass sie das Gelernte verstanden haben – keine
                Multiple-Choice-Fragen zum Abhaken, sondern praxisnahe Aufgaben mit echtem Copilot-Einsatz.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-violet-600 mb-2">Was wir prüfen</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Prompt Engineering in realen Szenarien</li>
                    <li>• Kritische Bewertung von KI-Outputs</li>
                    <li>• Security-Bewusstsein und Compliance</li>
                    <li>• App-spezifische Copilot-Nutzung</li>
                    <li>• Workflow-Integration</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-violet-600 mb-2">Prüfungsformate</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Praktische Hands-On-Aufgaben</li>
                    <li>• Live-Demonstrationen vor Prüfer</li>
                    <li>• Case-Study-Bearbeitung</li>
                    <li>• Szenario-basierte Assessments</li>
                    <li>• Peer-Review-Elemente</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-l-4 border-l-violet-500">
            <CardHeader>
              <CardTitle className="text-lg">Aufbauende Zertifizierungsstufen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Für Unternehmen, die einen strukturierten Kompetenzaufbau wünschen, bieten wir
                aufeinander aufbauende Zertifizierungsprogramme – von den Grundlagen bis zum Experten-Level.
              </p>
              <div className="space-y-4">
                {[
                  {
                    stufe: "Copilot in der Praxis I – Foundation",
                    badge: "Beginner",
                    farbe: "emerald",
                    inhalt: "Grundlagen der KI-Nutzung, erste Prompts, Security-Basics",
                    zielgruppe: "Alle Mitarbeiter"
                  },
                  {
                    stufe: "Copilot in der Praxis II – Advanced",
                    badge: "Advanced",
                    farbe: "blue",
                    inhalt: "Fortgeschrittenes Prompt Engineering, App-Integration, Workflow-Optimierung",
                    zielgruppe: "Power User, häufige Copilot-Nutzer"
                  },
                  {
                    stufe: "Copilot in der Praxis III – Professional",
                    badge: "Pro",
                    farbe: "purple",
                    inhalt: "Komplexe Use Cases, abteilungsspezifische Expertise, Best Practices entwickeln",
                    zielgruppe: "Champions, Multiplikatoren"
                  },
                  {
                    stufe: "Copilot in der Praxis IV – Expert",
                    badge: "Expert",
                    farbe: "orange",
                    inhalt: "Train-the-Trainer, Governance, Strategieberatung, Copilot Studio",
                    zielgruppe: "Interne Trainer, IT-Leads, Change Manager"
                  }
                ].map((level, idx) => (
                  <div key={idx} className={`flex items-start gap-4 p-4 border-2 border-${level.farbe}-500/30 rounded-lg bg-gradient-to-r from-${level.farbe}-500/5 to-${level.farbe}-600/10`}>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-${level.farbe}-100 text-${level.farbe}-700 dark:bg-${level.farbe}-900 dark:text-${level.farbe}-300`}>
                      {level.badge}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{level.stufe}</div>
                      <div className="text-sm text-muted-foreground mt-1">{level.inhalt}</div>
                      <div className="text-xs text-muted-foreground mt-2">
                        <strong>Zielgruppe:</strong> {level.zielgruppe}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Der Mehrwert von Zertifikaten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Für Unternehmen
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Investitionssicherheit:</strong> Dokumentierter ROI der Schulungsmaßnahmen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Compliance-Nachweis:</strong> Erfüllung von EU AI Act Artikel 4 (KI-Kompetenz)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Skill-Mapping:</strong> Überblick über Kompetenzniveaus im Unternehmen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Audit-Sicherheit:</strong> Nachweisbare Schulungsmaßnahmen für Prüfungen</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Für Mitarbeiter
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Karriere-Boost:</strong> Nachweisbare KI-Kompetenz für den Lebenslauf</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Anerkennung:</strong> Sichtbare Wertschätzung für Lernbereitschaft</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Entwicklungspfad:</strong> Klare Stufen für kontinuierliches Lernen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Motivation:</strong> Greifbares Ziel während der Lernreise</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 9: ROI */}
        <section id="roi" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-emerald-500 text-emerald-700 dark:text-emerald-400">
            ROI von Copilot-Training
          </h2>

          <p className="mb-6">
            Training ist keine Kostenstelle – es ist die Voraussetzung dafür, dass Ihre Lizenzinvestition
            überhaupt einen Return liefert. Die Forrester TEI Study belegt: <strong>132-353% ROI über 3 Jahre</strong> –
            aber nur bei professioneller Einführung mit Training.
          </p>

          <Card className="my-6 border-2 border-emerald-500/20">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Forrester TEI Study: Belegte Zahlen
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <h5 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3">📊 Verifizierte Kennzahlen</h5>
                  <ul className="text-sm space-y-2">
                    <li><strong>Zeitersparnis:</strong> 9 Stunden pro Nutzer/Monat</li>
                    <li><strong>ROI (SMB):</strong> 132-353% über 3 Jahre</li>
                    <li><strong>Produktivität:</strong> 77% berichten höhere Produktivität</li>
                    <li><strong>Aufgaben:</strong> 29% schneller bei Schreiben, Suchen, Zusammenfassen</li>
                    <li className="pt-2 border-t text-xs italic">Quellen: Forrester TEI Study 2024, Microsoft Work Trend Index</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <h5 className="font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Ohne Training (Gartner)</h5>
                  <ul className="text-sm space-y-2">
                    <li><strong>72%</strong> kämpfen mit Alltags-Integration</li>
                    <li><strong>57%</strong> - Engagement sinkt schnell wieder</li>
                    <li><strong>60%</strong> führen nur Piloten durch, nicht Rollout</li>
                    <li><strong>Nur 6%</strong> schaffen den Sprung zum Large-Scale Deployment</li>
                    <li className="pt-2 border-t text-xs italic">Quelle: Gartner Digital Workplace GenAI Survey 2024</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                  132-353% ROI mit Training
                </div>
                <div className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                  Laut Forrester TEI Study – aber nur mit professionellem Enablement
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Die versteckten Kosten ohne Training</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    kosten: "Ungenutzte Lizenzen",
                    betrag: "80% × Lizenzkosten",
                    erklärung: "Lizenzen für Mitarbeiter, die Copilot nicht nutzen"
                  },
                  {
                    kosten: "Frustration & Ablehnung",
                    betrag: "Schwer quantifizierbar",
                    erklärung: "Negative Word-of-Mouth bremst zukünftige Adoption"
                  },
                  {
                    kosten: "Support-Aufwand",
                    betrag: "IT-Zeit für Grundfragen",
                    erklärung: "Helpdesk wird mit Fragen überflutet, die Training beantwortet hätte"
                  },
                  {
                    kosten: "Sicherheitsrisiken",
                    betrag: "Potenzielle DSGVO-Strafen",
                    erklärung: "Ungeschulte Nutzer geben sensible Daten in Prompts ein"
                  },
                  {
                    kosten: "Verpasste Innovation",
                    betrag: "Opportunity Cost",
                    erklärung: "Wettbewerber, die richtig trainieren, ziehen davon"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 border rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{item.kosten}</span>
                        <span className="text-sm text-amber-600 dark:text-amber-400">{item.betrag}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.erklärung}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 9: Checkliste */}
        <section id="checkliste" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Trainings-Checkliste
          </h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Checkliste für Ihr Copilot-Trainingsprogramm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "Vor dem Training",
                    items: [
                      "Zielgruppen und deren spezifische Bedürfnisse identifiziert",
                      "Budget und Zeitrahmen definiert",
                      "Champions ausgewählt und informiert",
                      "Trainingsmaterialien und Ressourcen vorbereitet",
                      "Kommunikationsplan erstellt",
                      "Baseline-Metriken erhoben (aktuelle Nutzung)"
                    ]
                  },
                  {
                    phase: "Während des Trainings",
                    items: [
                      "Hands-On-Übungen mit echten Use Cases",
                      "Security und Compliance integriert (nicht nachgelagert)",
                      "Feedback nach jeder Session eingeholt",
                      "Q&A-Möglichkeiten für Fragen",
                      "Prompt-Library angelegt und geteilt",
                      "Quick Wins dokumentiert und gefeiert"
                    ]
                  },
                  {
                    phase: "Nach dem Training",
                    items: [
                      "Wöchentliche/monatliche Follow-ups geplant",
                      "Champions-Netzwerk aktiv betreut",
                      "Adoption-Metriken gemessen und reported",
                      "Neue Features kontinuierlich kommuniziert",
                      "Best Practices gesammelt und geteilt",
                      "Advanced Training für Power User angeboten"
                    ]
                  }
                ].map((phase, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-indigo-600 mb-3">{phase.phase}</h4>
                    <div className="space-y-2">
                      {phase.items.map((item, iidx) => (
                        <label key={iidx} className="flex items-center gap-3 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 10: FAQ */}
        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Häufig gestellte Fragen (FAQ)
          </h2>

          <div className="space-y-4 my-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 11: Quellen */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Quellen und weiterführende Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Studien und offizielle Ressourcen, auf die sich dieser Artikel stützt.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Forrester TEI Study: Microsoft 365 Copilot",
                beschreibung: "Total Economic Impact™ Studie mit ROI-Zahlen (132-353%)",
                url: "https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us"
              },
              {
                titel: "Microsoft Work Trend Index",
                beschreibung: "Produktivitätsstudie: 77% berichten höhere Produktivität",
                url: "https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work"
              },
              {
                titel: "Gartner: Copilot Impact Assessment",
                beschreibung: "Unabhängige Analyse: 72% kämpfen mit Alltags-Integration",
                url: "https://www.gartner.com/en/documents/5659223"
              },
              {
                titel: "Microsoft 365 Copilot ROI Blog",
                beschreibung: "SMB-Studie: Bis zu 353% ROI für kleine und mittlere Unternehmen",
                url: "https://www.microsoft.com/en-us/microsoft-365/blog/2024/10/17/microsoft-365-copilot-drove-up-to-353-roi-for-small-and-medium-businesses-new-study/"
              },
              {
                titel: "Microsoft Copilot Adoption Hub",
                beschreibung: "Offizielle Ressourcen für Adoption und Change Management",
                url: "https://adoption.microsoft.com/en-us/copilot/"
              },
              {
                titel: "Microsoft Learn: Copilot Training",
                beschreibung: "Kostenlose Lernpfade für Copilot-Grundlagen",
                url: "https://learn.microsoft.com/en-us/training/browse/?products=m365-copilot"
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">{link.titel}</div>
                  <div className="text-sm text-muted-foreground">{link.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Autor Bio */}
        <section className="my-12">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={martinLang.image}
                    alt={martinLang.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Über den Autor</h3>
                  <div className="text-lg font-semibold text-primary mb-1">{martinLang.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{martinLang.role}</div>
                  <p className="text-sm leading-relaxed mb-4">{martinLang.bio}</p>
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {martinLang.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {martinLang.linkedin && (
                      <a
                        href={martinLang.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                    {martinLang.email && (
                      <a
                        href={`mailto:${martinLang.email}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        Kontakt
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Professionelles Copilot-Training für Ihr Unternehmen</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Die Copilotenschule bietet maßgeschneiderte Trainingsprogramme, die Ihre Mitarbeiter befähigen
            und Ihre Copilot-Investition zum Erfolg machen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Trainingsangebot anfragen
            </a>
            <a
              href="/wissen/copilot-fehler-vermeiden"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              Alle 7 Copilot-Fehler lesen
            </a>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotTraining;
