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

#### FAQ-Sektion (CRITICAL für KI-Sichtbarkeit)
```markdown
## Häufig gestellte Fragen

### Was kostet Microsoft Copilot?
Microsoft Copilot kostet 30 USD pro Nutzer und Monat. Eine Microsoft 365
E3/E5/Business Premium Lizenz ist Voraussetzung. Für Unternehmen ab 300
Nutzern gibt es Volume Licensing-Optionen.

### Kann ich Copilot ohne Microsoft 365 nutzen?
Nein, Copilot setzt eine aktive Microsoft 365 Lizenz voraus. Es ist kein
Standalone-Produkt, sondern eine Erweiterung der Microsoft 365-Suite.

[... 5-10 weitere FAQs]
```

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

const [ComponentName] = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "einfuehrung", title: "Einführung", level: 2 },
    { id: "kernthema-1", title: "Kernthema 1", level: 2 },
    { id: "kernthema-2", title: "Kernthema 2", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "[Titel]",
    "description": "[Beschreibung]",
    "author": getAuthorSchemaMarkup(author),
    "datePublished": "[YYYY-MM-DD]",
    "dateModified": "[YYYY-MM-DD]",
    "keywords": ["Keyword1", "Keyword2"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Frage 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Antwort 1..."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="[Titel] | Copilotenschule"
        description="[Meta Description]"
        keywords={["Keyword1", "Keyword2"]}
        canonicalUrl="https://copilotenschule.de/wissen/[slug]"
        schema={[articleSchema, faqSchema]}
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

        {/* FAQ */}
        <section id="faq" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Häufig gestellte Fragen</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Frage 1?</h3>
              <p className="text-gray-700">
                Antwort 1... (30-60 Wörter)
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Frage 2?</h3>
              <p className="text-gray-700">
                Antwort 2...
              </p>
            </div>
          </div>
        </section>
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
