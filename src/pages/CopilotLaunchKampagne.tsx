import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import {
  Zap, Rocket, PartyPopper, Megaphone, Users, Calendar,
  TrendingUp, Heart, Target, CheckCircle2, AlertTriangle,
  ExternalLink, Linkedin, Twitter, Lightbulb, Sparkles,
  Music, Trophy, MessageCircle, Clock, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SLUG = "wissen/copilot-launch-kampagne";
const PAGE_TITLE = "Copilot Launch-Kampagne";

const CopilotLaunchKampagne = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "warum-launch-anders", title: "Warum ein Copilot-Launch anders ist", level: 2 },
    { id: "momentum-aufbauen", title: "Momentum aufbauen (und halten!)", level: 2 },
    { id: "die-launch-phasen", title: "Die 4 Phasen einer erfolgreichen Launch-Kampagne", level: 2 },
    { id: "launch-ideen", title: "15 Launch-Ideen, die wirklich zünden", level: 2 },
    { id: "typische-fehler", title: "Die 5 größten Launch-Killer", level: 2 },
    { id: "unsere-bausteine", title: "Unsere Launch-Bausteine für Ihren Erfolg", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Wie lange sollte eine Copilot Launch-Kampagne dauern?",
      answer: "Mindestens 3 Monate! Die Verhaltensänderung braucht Zeit. Wir empfehlen: 2-4 Wochen Awareness-Phase vor dem Launch, dann 8-12 Wochen aktive Begleitung mit regelmäßigen Touchpoints. Danach geht's in den Dauerbetrieb mit Champions und kontinuierlichem Lernen."
    },
    {
      name: "Brauchen wir wirklich Events und Gamification?",
      answer: "Nicht zwingend – aber es macht einen enormen Unterschied. Unternehmen mit Launch-Events erreichen 40-60% höhere Adoptionsraten in den ersten 3 Monaten. Und mal ehrlich: Wann war Ihr letztes Tool-Training, das Spaß gemacht hat? Genau."
    },
    {
      name: "Können wir das nicht einfach selbst machen?",
      answer: "Grundsätzlich ja! Aber: Interne Teams unterschätzen oft den Aufwand und haben nicht die Erfahrungswerte aus 200+ Rollouts. Wir sehen uns eher als Sparringspartner, der den internen Teams hilft, schneller und erfolgreicher zu sein – nicht als Ersatz."
    },
    {
      name: "Was kostet eine professionelle Launch-Begleitung?",
      answer: "Das hängt stark vom Scope ab – von punktueller Unterstützung (Keynote + Eventtag) bis zur Vollbegleitung über 3 Monate. Sprechen Sie uns an für ein individuelles Angebot. Spoiler: Der ROI durch bessere Adoption macht sich schnell bezahlt."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Copilot Launch-Kampagne: So wird der Rollout zum Erfolg",
        "description": "Warum eine Copilot-Einführung kein IT-Projekt ist und wie Sie mit der richtigen Launch-Kampagne echte Verhaltensänderung erreichen. Mit konkreten Ideen und Erfolgsfaktoren.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-03",
        "dateModified": "2026-02-03",
        "keywords": ["Copilot Launch", "Copilot Rollout", "KI Einführung Kampagne", "Microsoft Copilot Change Management", "Copilot Adoption"],
        "articleSection": "Praxisguide",
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
        title="Copilot Launch-Kampagne: So wird der Rollout zum Erfolg (2026)"
        description="Warum eine Copilot-Einführung kein IT-Projekt ist und wie Sie mit der richtigen Launch-Kampagne echte Verhaltensänderung erreichen. Mit konkreten Ideen und Erfolgsfaktoren."
        keywords={["Copilot Launch", "Copilot Rollout", "KI Einführung Kampagne", "Microsoft Copilot Change Management", "Copilot Adoption"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2026-02-03"
        modifiedTime="2026-02-03T10:00:00+01:00"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/${SLUG}` }
        ]}
        title="🚀 Copilot Launch-Kampagne: So wird der Rollout zum Erfolg"
        description="Warum Copilot-Einführung kein IT-Projekt ist – und wie Sie echte Begeisterung entfachen."
        lastUpdated="03. Februar 2026"
        readTime="12 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Ein Copilot-Launch ist kein IT-Rollout – es ist eine Verhaltensänderung.</strong> Und die funktioniert nicht
              mit einer E-Mail und einem Link zum Handbuch. Sie brauchen <em>Momentum</em>: Begeisterung wecken,
              Neugier entfachen, und dann diese Energie über Wochen halten. Wer das versteht, erreicht 80%+ Adoption.
              Wer es unterschätzt, landet bei den 72%, die laut Gartner mit der Alltagsintegration kämpfen.
            </p>
          </CardContent>
        </Card>

        {/* Persönliche Einleitung */}
        <div className="my-8 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border-2 border-purple-300 dark:border-purple-700">
          <p className="text-lg leading-relaxed mb-4 flex items-start gap-2">
            <PartyPopper className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <span>
              Ich liebe Launches. Richtig durchgezogene, durchdachte, energiegeladene Launches.
              Nicht weil ich ein Marketing-Mensch bin (bin ich nicht), sondern weil ich gesehen habe,
              was passiert, wenn man den Unterschied zwischen einem guten und einem schlechten Launch erlebt.
            </span>
          </p>
          <p className="leading-relaxed mb-4">
            Bei einem guten Launch kommen Leute aus dem Training und fragen: <em>"Kann ich das morgen nochmal machen?"</em>
            Sie zeigen ihren Kollegen begeistert, was sie gerade entdeckt haben. Sie probieren Dinge aus.
            Sie scheitern, lernen, werden besser. Das ist der Zauber, den wir suchen.
          </p>
          <p className="leading-relaxed">
            Bei einem schlechten Launch bekommen 500 Leute eine E-Mail, 50 klicken den Link,
            5 schaffen das erste Prompt – und in 3 Monaten wundert sich das Management,
            warum die teuren Lizenzen nicht genutzt werden. <strong>Das muss nicht sein.</strong>
          </p>
        </div>

        {/* Warum Copilot-Launch anders ist */}
        <section id="warum-launch-anders" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500">
            Warum ein Copilot-Launch anders ist als SAP oder Salesforce
          </h2>

          <p className="my-6">
            Ich höre oft: <em>"Wir haben schon SAP eingeführt, wir wissen wie das geht."</em>
            Und ja, die Erfahrung hilft – aber Copilot ist eine andere Kategorie.
            Hier ist der fundamentale Unterschied:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-l-4 border-l-slate-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-slate-600" />
                  SAP/Salesforce/ERP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>Prozess-Tool:</strong> Es gibt einen definierten Prozess, das Tool bildet ihn ab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>Muss genutzt werden:</strong> Ohne Tool läuft der Prozess nicht</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>Training = Einweisung:</strong> "Klicke hier, dann dort, fertig"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>Erfolg messbar:</strong> Prozess läuft oder läuft nicht</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Microsoft Copilot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span><strong>Kreatives Tool:</strong> Unendliche Möglichkeiten, keine festen Pfade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span><strong>Freiwillige Nutzung:</strong> Man KANN weiter ohne arbeiten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span><strong>Training = Verhaltensänderung:</strong> Neue Denkweise nötig</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span><strong>Erfolg = Gewohnheit:</strong> Regelmäßige, sinnvolle Nutzung</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <blockquote className="my-8 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30 p-6 rounded-r-lg text-lg">
            <p className="italic">
              "Bei SAP zwingt Sie der Prozess zur Nutzung. Bei Copilot müssen Sie die Menschen <em>überzeugen</em>,
              dass es sich lohnt, ihre Arbeitsweise zu ändern. Das ist Change Management in Reinform."
            </p>
          </blockquote>

          <p className="my-6">
            Das klingt erstmal schwieriger – ist es auch. Aber es hat einen riesigen Vorteil:
            Wenn Menschen Copilot aus Überzeugung nutzen, nicht aus Zwang, werden sie zu
            Botschaftern. Sie finden Anwendungsfälle, die Sie nie auf dem Schirm hatten.
            Sie werden <em>kreativ</em>. Und genau das wollen wir.
          </p>
        </section>

        {/* Momentum aufbauen */}
        <section id="momentum-aufbauen" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-orange-500">
            Momentum aufbauen (und halten!)
          </h2>

          <p className="my-6">
            Hier kommt die unbequeme Wahrheit: Ein einziger Trainingstag reicht nicht.
            Auch nicht zwei. Selbst eine Woche intensives Onboarding verpufft,
            wenn danach Stille einkehrt.
          </p>

          <Card className="my-8 border-2 border-orange-300 dark:border-orange-700">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/10">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Das Momentum-Prinzip
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p>
                  Verhaltensänderung braucht <strong>wiederholte Impulse über Zeit</strong>.
                  Die Forschung zeigt: Neue Gewohnheiten bilden sich in 21-66 Tagen –
                  aber nur wenn der Impuls regelmäßig kommt.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-center">
                    <div className="text-3xl font-bold text-red-600">Tag 1</div>
                    <div className="text-sm mt-2">Begeisterung & Neugier</div>
                    <div className="text-xs text-muted-foreground mt-1">"Das ist ja cool!"</div>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center">
                    <div className="text-3xl font-bold text-amber-600">Tag 7-14</div>
                    <div className="text-sm mt-2">Erste Hürden & Frust</div>
                    <div className="text-xs text-muted-foreground mt-1">"Das klappt nicht so..."</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-center">
                    <div className="text-3xl font-bold text-green-600">Tag 30+</div>
                    <div className="text-sm mt-2">Gewohnheit bildet sich</div>
                    <div className="text-xs text-muted-foreground mt-1">"Ohne kann ich nicht mehr"</div>
                  </div>
                </div>
                <p className="mt-6 text-center font-semibold">
                  <AlertTriangle className="w-5 h-5 text-orange-600 inline mr-2" />
                  Zwischen Tag 7 und 30 verlieren Sie die meisten Nutzer – wenn Sie sie nicht halten!
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="my-6">
            Das Geheimnis erfolgreicher Copilot-Einführungen: <strong>Regelmäßige Touchpoints</strong>,
            die den Schwung halten. Nicht jeden Tag ein großes Event – aber jede Woche etwas,
            das die Nutzer erinnert, inspiriert, und bei Problemen hilft.
          </p>

          <div className="my-8 p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-300 dark:border-green-700">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Was funktioniert: Die Momentum-Formel
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">Vor dem Launch (2-4 Wochen)</p>
                <ul className="text-sm space-y-1">
                  <li>• Teaser-Kommunikation ("Es kommt was Spannendes")</li>
                  <li>• Führungskräfte-Briefing</li>
                  <li>• Champions identifizieren und vorbereiten</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Launch-Woche</p>
                <ul className="text-sm space-y-1">
                  <li>• Big-Bang-Event mit Wow-Effekt</li>
                  <li>• Erste Trainings für alle</li>
                  <li>• Gamification-Start (Challenges, Punkte)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Woche 2-4</p>
                <ul className="text-sm space-y-1">
                  <li>• Wöchentliche "Prompt der Woche"</li>
                  <li>• Success Stories teilen</li>
                  <li>• Sprechstunden für Fragen</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Woche 5-12</p>
                <ul className="text-sm space-y-1">
                  <li>• Vertiefungstrainings für Interessierte</li>
                  <li>• Abteilungsspezifische Sessions</li>
                  <li>• Champion-Netzwerk aufbauen</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Die 4 Launch-Phasen */}
        <section id="die-launch-phasen" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500">
            Die 4 Phasen einer erfolgreichen Launch-Kampagne
          </h2>

          <div className="space-y-6 my-8">
            {[
              {
                phase: "Phase 1: Awareness & Hype",
                zeitraum: "2-4 Wochen vor Launch",
                icon: <Megaphone className="w-6 h-6" />,
                color: "purple",
                beschreibung: "Neugier wecken, ohne zu viel zu verraten. Die Leute sollen sich auf etwas freuen.",
                aktivitaeten: [
                  "Teaser-Kampagne: 'KI kommt zu uns – seid ihr bereit?'",
                  "CEO-Video oder Town Hall zum Warum",
                  "Countdown im Intranet / auf Screens",
                  "Early Access für Freiwillige (erzeugt Mundpropaganda)",
                  "Führungskräfte-Briefing (sie müssen dahinterstehen)"
                ]
              },
              {
                phase: "Phase 2: Launch-Event & First Touch",
                zeitraum: "Tag 1-7",
                icon: <Rocket className="w-6 h-6" />,
                color: "orange",
                beschreibung: "Der große Moment! Hier entscheidet sich die erste Wahrnehmung.",
                aktivitaeten: [
                  "Launch-Event mit Live-Demos & Wow-Momenten",
                  "Hands-on-Stationen zum Selbst-Ausprobieren",
                  "Erste Kurztrainings (max. 2h) für alle",
                  "Starter-Kits: Prompt-Cheatsheets, Quick Guides",
                  "Gamification-Start: 'Erste 100 Prompts'-Challenge"
                ]
              },
              {
                phase: "Phase 3: Vertiefung & Begleitung",
                zeitraum: "Woche 2-8",
                icon: <Users className="w-6 h-6" />,
                color: "blue",
                beschreibung: "Dranbleiben, vertiefen, Hürden abbauen. Hier passiert die echte Verhaltensänderung.",
                aktivitaeten: [
                  "Wöchentliche 'Prompt der Woche' per Newsletter",
                  "Lernreise: 8×2h über 8 Wochen (keine Einmal-Schulung!)",
                  "Abteilungsspezifische Vertiefungen",
                  "Sprechstunden & FAQ-Sessions",
                  "Success Stories sammeln und teilen"
                ]
              },
              {
                phase: "Phase 4: Verstetigung & Champions",
                zeitraum: "Ab Woche 9",
                icon: <Trophy className="w-6 h-6" />,
                color: "green",
                beschreibung: "Vom Projekt zum Dauerbetrieb. Champions übernehmen, das Momentum bleibt.",
                aktivitaeten: [
                  "Champions-Programm etablieren (interne Multiplikatoren)",
                  "Zertifizierungen anbieten (Foundation → Advanced → Expert)",
                  "Regelmäßige Updates zu neuen Features",
                  "Best-Practice-Sharing im Unternehmen",
                  "KPIs messen und feiern (Adoption Rate, Nutzungsfrequenz)"
                ]
              }
            ].map((p, idx) => (
              <Card key={idx} className={`border-l-4 border-l-${p.color}-500`}>
                <CardHeader className={`bg-gradient-to-r from-${p.color}-500/10 to-${p.color}-600/5`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className={`text-lg flex items-center gap-2 text-${p.color}-700 dark:text-${p.color}-400`}>
                      {p.icon}
                      {p.phase}
                    </CardTitle>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" /> {p.zeitraum}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 italic text-muted-foreground">{p.beschreibung}</p>
                  <ul className="space-y-2 text-sm">
                    {p.aktivitaeten.map((a, aidx) => (
                      <li key={aidx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 text-${p.color}-600 mt-0.5 flex-shrink-0`} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 15 Launch-Ideen */}
        <section id="launch-ideen" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-pink-500">
            15 Launch-Ideen, die wirklich zünden
          </h2>

          <p className="my-6">
            Okay, genug Theorie. Hier sind konkrete Ideen aus unseren erfolgreichsten Launches.
            Mischen Sie nach Geschmack – nicht alles passt zu jeder Unternehmenskultur,
            aber irgendetwas sollte dabei sein, das bei Ihnen zündet!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            {[
              { nr: 1, titel: "CEO Live-Demo", beschreibung: "Nichts sagt 'das ist wichtig' lauter als der CEO, der selbst promptet", icon: "👔" },
              { nr: 2, titel: "Prompt-Battle", beschreibung: "Abteilungen treten gegeneinander an: Wer löst die Aufgabe am elegantesten?", icon: "⚔️" },
              { nr: 3, titel: "KI-Café", beschreibung: "Pop-up-Stand in der Kantine. Kaffee, Kuchen, und Copilot zum Anfassen", icon: "☕" },
              { nr: 4, titel: "Escape-Room", beschreibung: "Rätsel, die nur mit Copilot lösbar sind. Teambuilding + Training!", icon: "🔐" },
              { nr: 5, titel: "Prompt der Woche", beschreibung: "Jede Woche ein neuer Trick per Mail/Teams. Simpel aber effektiv", icon: "📧" },
              { nr: 6, titel: "Before & After", beschreibung: "Videos: 'So dauerte es vorher – so schnell geht's jetzt'", icon: "⏱️" },
              { nr: 7, titel: "Lunch & Learn", beschreibung: "Pizza + 30 Min Copilot-Demo. Jede Woche ein anderes Thema", icon: "🍕" },
              { nr: 8, titel: "Champions-Badge", beschreibung: "Sichtbare Anerkennung für Copilot-Enthusiasten (physisch oder digital)", icon: "🏅" },
              { nr: 9, titel: "Fail-Stories", beschreibung: "Wir teilen auch die Flops – macht menschlich und nimmt Angst", icon: "🤦" },
              { nr: 10, titel: "Quick-Win-Challenge", beschreibung: "'Spar 10 Minuten mit Copilot und zeig wie!' Kleine Preise motivieren", icon: "🎯" },
              { nr: 11, titel: "Pop-up Training", beschreibung: "Überraschende 15-Min-Sessions im Büro. Niedrigschwellig!", icon: "🎪" },
              { nr: 12, titel: "Use Case Börse", beschreibung: "Mitarbeiter teilen ihre besten Entdeckungen auf einer internen Plattform", icon: "💡" },
              { nr: 13, titel: "KI-Sprechstunde", beschreibung: "Feste Zeiten für Fragen, ohne Termin. Hemmschwelle runter!", icon: "🗣️" },
              { nr: 14, titel: "Abteilungs-Wettkampf", beschreibung: "Welche Abteilung hat die höchste Adoption? Leaderboard motiviert", icon: "📊" },
              { nr: 15, titel: "Launch-Tagebuch", beschreibung: "Blog oder Videos: 'Woche 1 bei uns mit Copilot'. Authentisch!", icon: "📓" }
            ].map((idee) => (
              <Card key={idee.nr} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{idee.icon}</span>
                    <div>
                      <p className="font-semibold">{idee.nr}. {idee.titel}</p>
                      <p className="text-sm text-muted-foreground">{idee.beschreibung}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Die 5 größten Launch-Killer */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">
            Die 5 größten Launch-Killer
          </h2>

          <p className="my-6">
            Ich will nicht nur Cheerleader sein. Hier sind die Fehler, die wir am häufigsten sehen –
            und die Sie vermeiden sollten:
          </p>

          <div className="space-y-4 my-8">
            {[
              {
                killer: "Nur eine E-Mail schicken",
                warum: "E-Mails werden überlesen, vergessen, archiviert. Ohne persönlichen Touchpoint passiert nichts.",
                stattdessen: "Multi-Channel: Teams, Intranet, Poster, und mindestens ein Live-Event"
              },
              {
                killer: "Einmal-Training statt Lernreise",
                warum: "Nach 7 Tagen sind 80% des Gelernten vergessen (Ebbinghaus-Kurve). Ein Tag reicht nicht.",
                stattdessen: "Begleitung über 8+ Wochen mit regelmäßigen, kurzen Impulsen"
              },
              {
                killer: "Führungskräfte nicht einbinden",
                warum: "Wenn der Chef nicht selbst nutzt, signalisiert das: 'Ist wohl nicht so wichtig.'",
                stattdessen: "Führungskräfte zuerst schulen, als Vorbilder aufbauen"
              },
              {
                killer: "Nur die IT-Perspektive",
                warum: "Copilot ist kein IT-Projekt, sondern ein Business-Tool. IT versteht nicht alle Use Cases.",
                stattdessen: "Fachabteilungen einbinden, abteilungsspezifische Trainings anbieten"
              },
              {
                killer: "Keinen Erfolg messen",
                warum: "Was nicht gemessen wird, wird nicht verbessert. Und nicht gefeiert!",
                stattdessen: "KPIs definieren: Adoption Rate, Nutzungsfrequenz, Feedback-Scores"
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-red-700 dark:text-red-400">{item.killer}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Warum das schadet:</strong> {item.warum}
                      </p>
                      <p className="text-sm mt-2 p-2 bg-green-50 dark:bg-green-950/30 rounded">
                        <strong className="text-green-700 dark:text-green-400">Stattdessen:</strong> {item.stattdessen}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Unsere Bausteine */}
        <section id="unsere-bausteine" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500">
            Unsere Launch-Bausteine für Ihren Erfolg
          </h2>

          <p className="my-6">
            Bei der Copilotenschule haben wir alle Bausteine, die Sie für einen erfolgreichen Launch brauchen.
            Hier ein Überblick – natürlich modular kombinierbar nach Ihren Bedürfnissen:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-2 border-purple-500/30 hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-purple-600" />
                  Awareness & Kick-off
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-500" />
                    <strong>Keynote</strong> (1,5h): "Wie Copilot die Arbeitswelt verändert"
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-500" />
                    <strong>Eventtag KI</strong> (ganztägig): Infostand, Live-Demos, Challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-500" />
                    <strong>Strategie-Workshop</strong>: ROI-Berechnung, Rollout-Plan
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500/30 hover:border-blue-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Training & Enablement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                    <strong>Grundlagen-Training</strong> (Halbtag): Prompt Engineering
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                    <strong>Lernreise 8 Wochen</strong>: Nachhaltige Verhaltensänderung
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                    <strong>App-Trainings</strong>: Word, Excel, PowerPoint, Outlook, Teams
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-500/30 hover:border-orange-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange-600" />
                  Events & Gamification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                    <strong>Hackathon</strong> (1 Tag): Use Case Battle für Teams
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                    <strong>Interaktive Challenges</strong>: Punkte, Badges, Leaderboards
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                    <strong>Chatbot-Workshop</strong>: Gemeinsam ersten KI-Assistenten bauen
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/30 hover:border-green-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Vertiefung & Zertifizierung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-green-500" />
                    <strong>Abteilungsspezifisch</strong>: Vertrieb, Marketing, HR, Finance
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-green-500" />
                    <strong>Zertifizierungsprogramm</strong>: Foundation → Advanced → Expert
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-green-500" />
                    <strong>EU AI Act Schulung</strong>: Compliance-Zertifikat
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="my-6">
            <strong>Übrigens:</strong> Wir haben auch ein starkes Netzwerk an Internal-Communications-Experten
            und Event-Profis, die wir für größere Launches mit ins Boot holen können. Von der Teaser-Kampagne
            über die Eventplanung bis zum Launch-Video – wenn Sie einen Full-Service-Partner suchen,
            können wir das gemeinsam mit unseren Partnern stemmen.
          </p>
        </section>

        {/* Kernaussagen für Entscheider */}
        <section className="my-12">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Kernaussagen für Entscheider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-l-blue-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Faktische Kernaussage:</p>
                  <p className="text-sm text-muted-foreground">Copilot-Einführung ist Change Management, kein IT-Rollout. Die Nutzung ist freiwillig – Erfolg hängt von Überzeugung, nicht von Zwang ab.</p>
                </div>
                <div className="p-4 border-l-4 border-l-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Praktische Konsequenz:</p>
                  <p className="text-sm text-muted-foreground">Investieren Sie in eine mehrwöchige Launch-Kampagne mit regelmäßigen Touchpoints statt in einen einzigen Trainingstag.</p>
                </div>
                <div className="p-4 border-l-4 border-l-red-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Typischer Fehler:</p>
                  <p className="text-sm text-muted-foreground">72% der Nutzer kämpfen laut Gartner mit der Alltags-Integration – meist weil die Begleitung nach dem initialen Training aufhört.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500">
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

        {/* Quellen */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500">
            Quellen und weiterführende Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Studien und Ressourcen zum Thema Adoption und Change Management.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Gartner: Copilot Impact Assessment",
                beschreibung: "72% kämpfen mit Alltags-Integration ohne strukturiertes Change Management",
                url: "https://www.gartner.com/en/documents/5659223"
              },
              {
                titel: "Microsoft Work Trend Index",
                beschreibung: "Produktivitätsstudie zu Copilot-Nutzung und Adoption",
                url: "https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work"
              },
              {
                titel: "Prosci: Change Management Best Practices",
                beschreibung: "Wissenschaftliche Grundlagen für erfolgreiche Veränderungsprojekte",
                url: "https://www.prosci.com/resources/articles/change-management-best-practices"
              },
              {
                titel: "Microsoft Adoption Hub",
                beschreibung: "Offizielle Ressourcen für Copilot-Rollout und Change Management",
                url: "https://adoption.microsoft.com/"
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
                    src={author?.image}
                    alt={author?.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Über den Autor</h3>
                  <div className="text-lg font-semibold text-primary mb-1">{author?.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{author?.role}</div>
                  <p className="text-sm leading-relaxed mb-4">{author?.bio}</p>
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {author?.expertise.map((exp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {author?.linkedin && (
                      <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    )}
                    {author?.twitter && (
                      <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Twitter className="w-4 h-4" /> Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-8 text-center my-12 border-2 border-purple-500/30">
          <h3 className="text-2xl font-bold mb-4">🚀 Lassen Sie uns Ihren Launch gemeinsam planen!</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir begleiten Sie von der Strategie bis zum Go-Live – mit Trainings, Events und
            einem starken Netzwerk an Internal-Comms- und Event-Profis. Ob Keynote, Eventtag
            oder 8-Wochen-Lernreise: Gemeinsam machen wir Ihre Copilot-Einführung zum Erfolg.
          </p>
          <a
            href="/unsere-angebote"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Launch-Pakete entdecken
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotLaunchKampagne;
