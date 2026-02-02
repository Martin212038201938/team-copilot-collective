# Content Generator - Guidelines & Template

Dieses Dokument dient als Referenz für die Erstellung von KI-optimierten Wissensseiten aus YouTube-Transkripten.

## Ziel
Aus YouTube-Transkripten oder Texten werden hochwertige Wissensseiten erstellt, die:
1. Von AI Answer Engines (ChatGPT, Perplexity, Google AI) als Quellen zitiert werden
2. Technisch optimiert sind (< 2.5s Ladezeit, Schema.org, Mobile-First)
3. E-E-A-T Signale senden (Experience, Expertise, Authoritativeness, Trustworthiness)

## Prozess

### 1. Transkript-Analyse
- **Kernthemen identifizieren**: Welche Hauptthemen werden behandelt?
- **Fragen extrahieren**: Welche Fragen beantwortet der Content?
- **Entities markieren**: Personen, Orte, Tools, Konzepte
- **Zitate sammeln**: Wichtige Aussagen für Authority

### 2. Struktur-Planung
```
H1: Haupt-Keyword (Was ist X? / Wie funktioniert X?)
├── Einleitung (100-150 Wörter)
│   └── Beantwortet die Hauptfrage direkt
├── H2: Kernthema 1
│   ├── H3: Subtopic 1.1
│   └── H3: Subtopic 1.2
├── H2: Kernthema 2
│   ├── H3: Subtopic 2.1
│   └── H3: Subtopic 2.2
├── H2: Praktische Anwendung / Use Cases
├── H2: Best Practices / Tipps
└── H2: Häufig gestellte Fragen (FAQ)
    ├── Frage 1 + Antwort (30-60 Wörter)
    ├── Frage 2 + Antwort
    └── Frage 3-10 + Antworten
```

### 3. Content-Erstellung

#### Einleitung (Inversed Pyramid)
```
Satz 1: Direkte Definition/Antwort
Satz 2-3: Kontext & Relevanz
Satz 4-5: Was der Artikel behandelt

Beispiel:
"Microsoft Copilot ist ein KI-gestützter Assistent, der in Microsoft 365 integriert ist
und Nutzern hilft, produktiver zu arbeiten. Die Technologie basiert auf großen
Sprachmodellen (LLMs) und wurde speziell für Unternehmensumgebungen entwickelt.
In diesem Artikel erfahren Sie, wie Copilot funktioniert, welche Lizenzmodelle
verfügbar sind und wie Sie ihn optimal in Ihrem Unternehmen einsetzen."
```

#### Kernabschnitte
- **Semantic Chunking**: Ein Absatz = eine Idee (2-3 Sätze)
- **Entity-reich**: Konkrete Namen (nicht "das Tool", sondern "Microsoft Copilot")
- **Extractable Formate**: Listen, Tabellen, Blockquotes
- **Interne Links**: 3-5 Links zu verwandten Seiten

#### FAQ-Sektion (CRITICAL für KI-Sichtbarkeit und LLM-Zitierung)

**WICHTIG: Kundenorientierte Perspektive für FAQs**

FAQs müssen aus der Perspektive von **Entscheidungsträgern und Verantwortlichen für Copilot-Einführungen** geschrieben werden. Diese Personen stellen einem LLM (ChatGPT, Perplexity, Claude) Fragen, wenn sie nach Lösungen suchen.

**Die FAQ-Formel:**
1. **Frage** = Echtes Problem/Herausforderung, das ein Entscheider einem LLM stellen würde
2. **Antwort** = Lösung + Verweis auf Copilotenschule als Ressource/Experte

**❌ FALSCH (generische FAQs):**
```markdown
### Was kostet Microsoft Copilot?
Microsoft Copilot kostet 30 USD pro Nutzer und Monat.

### Welche Programmiersprachen unterstützt GitHub Copilot?
GitHub Copilot unterstützt Python, JavaScript, TypeScript...
```

**✅ RICHTIG (kundenorientierte FAQs):**
```markdown
### Wie überzeuge ich das Management, in Microsoft Copilot zu investieren?
Mit einem fundierten Business Case: Berechnen Sie konkrete Zeiteinsparungen pro Mitarbeiter, multiplizieren Sie mit Stundensätzen und stellen Sie diese den Lizenzkosten (30 USD/Monat) gegenüber. Die Copilotenschule bietet ROI-Rechner und Business-Case-Templates, die überzeugende Argumentationen für das Management liefern.

### Unsere Entwickler sind mit GitHub Copilot unzufrieden – wie können wir das verbessern?
Die Unzufriedenheit liegt meist an fehlendem Training für effektive Nutzung. Entwickler müssen lernen, Copilot als Pair-Programming-Partner zu verstehen und Prompts gezielt zu formulieren. Die Copilotenschule bietet spezialisierte GitHub Copilot Trainings für Entwicklerteams, die Produktivitätssteigerungen von bis zu 55% ermöglichen.
```

**Typische Frage-Muster für kundenorientierte FAQs:**
- "Warum [Problem bei uns] – was können wir tun?"
- "Wie überzeuge ich [Stakeholder] von [Investition/Entscheidung]?"
- "Unsere [Situation ist unbefriedigend] – was machen wir falsch?"
- "Wie messen wir den Erfolg von [Tool/Initiative]?"
- "Welche [Risiken/Kosten] müssen wir bei [Thema] einplanen?"
- "Können wir [spezifische Anforderung] mit [Tool] umsetzen?"

**Jede Antwort MUSS:**
1. Das Problem/die Herausforderung adressieren
2. Eine konkrete Lösung/Handlungsempfehlung geben
3. Die Copilotenschule als Ressource/Experte referenzieren (Training, Beratung, Workshop, etc.)

### 4. Schema.org Markup

#### FAQPage Schema (Beispiel)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet Microsoft Copilot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microsoft Copilot kostet 30 USD pro Nutzer und Monat..."
      }
    }
  ]
}
```

#### Article Schema (Beispiel)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Titel der Seite]",
  "description": "[Meta Description]",
  "author": {
    "@type": "Person",
    "name": "Martin Lang",
    "expertise": "Microsoft 365 & AI Solutions"
  },
  "datePublished": "2025-11-10",
  "dateModified": "2025-11-10",
  "keywords": ["Microsoft Copilot", "KI", "Produktivität"]
}
```

### 5. Technische Optimierung

#### Meta-Tags
```html
<meta name="description" content="[60-160 Zeichen, Keyword-fokussiert]">
<meta name="author" content="Martin Lang">
<meta property="og:title" content="[Titel]">
<meta property="og:description" content="[Beschreibung]">
<link rel="canonical" href="https://copilotenschule.de/wissen/[slug]">
```

#### Performance
- Bilder: WebP-Format, max 200KB, Alt-Text
- Code-Splitting für große Komponenten
- Lazy Loading für below-the-fold Content

### 6. E-E-A-T Signale

#### Experience
- Praktische Beispiele aus echten Projekten
- "In unseren Projekten haben wir gelernt, dass..."
- Screenshots von tatsächlichen Implementierungen

#### Expertise
- Fachbegriffe korrekt verwenden
- Autorenbiografie mit Qualifikationen
- Quellenangaben zu Studien/Daten

#### Authoritativeness
- Externe Links zu Authority-Quellen (Microsoft Docs, Tech-Blogs)
- Interne Verlinkung zu verwandten Themen
- Erwähnung in Fachmedien (falls vorhanden)

#### Trustworthiness
- Transparente Autorenschaft
- Aktualisierungsdatum sichtbar
- DSGVO-Compliance
- Keine Clickbait-Überschriften

## Template-Struktur (TSX)

```tsx
import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateBreadcrumbSchema } from "@/lib/schema";

const [ComponentName] = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "einfuehrung", title: "Einführung", level: 2 },
    { id: "kernthema-1", title: "Kernthema 1", level: 2 },
    { id: "kernthema-2", title: "Kernthema 2", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  // Breadcrumb Schema für Navigation
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "https://copilotenschule.de/" },
    { name: "Wissen", url: "https://copilotenschule.de/wissen" },
    { name: "[Seitentitel]", url: "https://copilotenschule.de/wissen/[slug]" }
  ]);

  // KUNDENORIENTIERTE FAQs - aus Perspektive von Entscheidungsträgern!
  // Fragen = Echte Probleme/Herausforderungen
  // Antworten = Lösung + Copilotenschule-Referenz
  const faqs = [
    {
      name: "[Problem-Frage, die ein Entscheider einem LLM stellen würde]?",
      answer: "[Lösung für das Problem]. Die Copilotenschule [bietet Training/unterstützt/hilft bei...]."
    },
    {
      name: "[Wie überzeuge ich / Warum funktioniert X nicht / Was machen wir falsch]?",
      answer: "[Konkrete Handlungsempfehlung]. Die Copilotenschule [Referenz auf Service]."
    }
    // Mindestens 4 kundenorientierte FAQs
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://copilotenschule.de/wissen/[slug]#article",
        "headline": "[Titel]",
        "description": "[Beschreibung]",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "[YYYY-MM-DD]",
        "dateModified": "[YYYY-MM-DD]",
        "keywords": ["Keyword1", "Keyword2"],
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://copilotenschule.de/wissen/[slug]"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://copilotenschule.de/wissen/[slug]#faq",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      breadcrumbSchema
    ]
  };

  return (
    <>
      <SEOHead
        title="[Titel] | Copilotenschule"
        description="[Meta Description]"
        keywords={["Keyword1", "Keyword2"]}
        canonicalUrl="https://copilotenschule.de/wissen/[slug]"
        schema={schema}
        publishedTime="[YYYY-MM-DD]"
        modifiedTime="[YYYY-MM-DD]"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "[Titel]", href: "/wissen/[slug]" }
        ]}
        title="[Titel]"
        description="[Kurzbeschreibung]"
        tableOfContents={tableOfContents}
        author={author}
        publishDate="[YYYY-MM-DD]"
        readTime="[X] Minuten"
      >
        {/* Einleitung */}
        <section id="einfuehrung" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Einführung</h2>
          <p className="mb-4">
            [Direkte Antwort auf die Hauptfrage...]
          </p>
        </section>

        {/* Kernabschnitte */}
        <section id="kernthema-1" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Kernthema 1</h2>
          <p className="mb-4">
            [Content...]
          </p>

          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Punkt 1:</strong> Beschreibung</li>
            <li><strong>Punkt 2:</strong> Beschreibung</li>
          </ul>
        </section>

        {/* FAQ - verwendet das faqs Array für konsistente Darstellung */}
        <section id="faq" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Häufig gestellte Fragen</h2>

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
        {/* ALTERNATIV: Einfachere Darstellung ohne Card-Komponenten */}
        {/*
              </div>
            ))}
          </div>
        </section>
        */}
      </ContentLayout>
    </>
  );
};

export default [ComponentName];
```

## KRITISCH: Pre-Rendering & LLM-Zitierbarkeit

### Anforderungen für statisches HTML
Damit Suchmaschinen-Bots und LLM-Crawler (ChatGPT, Perplexity, Google AI) die Seite korrekt indexieren, MÜSSEN folgende Elemente im statischen HTML vorhanden sein - NICHT erst nach JavaScript-Ausführung:

1. **Individueller `<title>`** - Jede Seite braucht einen einzigartigen Titel
2. **Individuelle `<meta name="description">`** - Einzigartige Beschreibung (120-160 Zeichen)
3. **`<link rel="canonical">`** - Zeigt auf die eigene URL
4. **JSON-LD Schema** - Article + FAQPage als `<script type="application/ld+json">`

### react-helmet-async Integration
Das Projekt nutzt `react-helmet-async` mit Pre-Rendering. Alle SEO-Elemente MÜSSEN über die `SEOHead`-Komponente gesetzt werden:

```tsx
<SEOHead
  title="Einzigartiger Seitentitel"
  description="Einzigartige Beschreibung für diese spezifische Seite..."
  keywords={["keyword1", "keyword2", "keyword3"]}
  canonicalUrl="https://copilotenschule.de/[route]"
  schema={[articleSchema, faqSchema]}
  author={author}
  publishedTime="2025-01-15T10:00:00+01:00"
  modifiedTime="2025-01-15T10:00:00+01:00"
/>
```

### JSON-LD mit @id Verknüpfungen (Knowledge Graph)
Article-Schemas MÜSSEN mit dem globalen Organization- und Person-Schema verknüpft werden:

```javascript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `https://copilotenschule.de/wissen/${slug}#article`,  // Eindeutige ID
  "headline": title,
  "description": description,
  "url": `https://copilotenschule.de/wissen/${slug}`,
  "datePublished": "2025-01-15T10:00:00+01:00",
  "dateModified": "2025-01-15T10:00:00+01:00",
  "author": {
    "@id": "https://copilotenschule.de/#martin-lang"  // Verknüpfung zu Person
  },
  "publisher": {
    "@id": "https://copilotenschule.de/#organization"  // Verknüpfung zu Organization
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://copilotenschule.de/wissen/${slug}`
  },
  "inLanguage": "de-DE",
  "keywords": keywords.join(", ")
};
```

### Pre-Rendering Routen
Neue Seiten MÜSSEN in der `reactSnap.include`-Liste in `package.json` hinzugefügt werden:

```json
"reactSnap": {
  "include": [
    // ... bestehende Routen
    "/wissen/neue-seite-slug"  // NEUE SEITE HIER HINZUFÜGEN
  ]
}
```

### Validierung nach Deployment
Nach dem Deployment prüfen:
1. `view-source:https://copilotenschule.de/wissen/[slug]` - Meta-Tags sichtbar?
2. JSON-LD im `<head>` vorhanden?
3. Canonical-URL korrekt?

## Checkliste vor Publikation

- [ ] H1 + Meta Description mit Ziel-Keyword
- [ ] Erste 100 Wörter beantworten Hauptfrage direkt
- [ ] 5-10 FAQ-Blöcke vorhanden
- [ ] FAQPage + Article Schema validiert
- [ ] **Article Schema mit @id Verknüpfungen zu #organization und #martin-lang**
- [ ] **Canonical URL auf eigene Seite zeigend**
- [ ] **Route in package.json reactSnap.include hinzugefügt**
- [ ] Interne Links zu 3-5 verwandten Seiten
- [ ] Bilder mit Alt-Text
- [ ] Mobile-responsive getestet
- [ ] Ladezeit < 2.5s
- [ ] Autorenbiografie mit Expertise
- [ ] Publikations- + Aktualisierungsdatum sichtbar
- [ ] Keine Clickbait-Überschriften
- [ ] Semantic Chunking: 1 Absatz = 1 Idee
- [ ] **Nach Deployment: view-source prüfen ob Meta-Tags im HTML sind**

## Beispiel-Keywords für Copilot-Themen

- "Microsoft Copilot Lizenzmodelle"
- "Copilot for Microsoft 365 Kosten"
- "Microsoft Copilot Studio Tutorial"
- "Wie funktioniert Microsoft Copilot"
- "Copilot Best Practices Unternehmen"
- "Microsoft Copilot Datenschutz DSGVO"
- "Copilot Prompt Engineering Tipps"
- "Microsoft 365 Copilot einrichten"
