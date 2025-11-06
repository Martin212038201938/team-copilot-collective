# Content Pages - Schnell neue SEO-optimierte Unterseiten erstellen

Dieses System ermöglicht es, schnell neue SEO-optimierte Content-Seiten zu erstellen, die für KI-Suchen (Google, ChatGPT, Perplexity, etc.) optimiert sind.

## Komponenten-Übersicht

### SEOHead Component
Verwaltet alle SEO-relevanten Meta-Tags und strukturierte Daten (Schema.org).

**Verwendung:**
```tsx
<SEOHead
  title="Ihr Seitentitel"
  description="Detaillierte Beschreibung (150-160 Zeichen)"
  keywords={["Keyword 1", "Keyword 2", "Keyword 3"]}
  canonicalUrl="https://copilotenschule.de/ihre-seite"
  schema={schemaObject}
  publishedTime="2025-01-06"
  modifiedTime="2025-01-06"
/>
```

### ContentLayout Component
Bietet ein standardisiertes Layout mit:
- Breadcrumb-Navigation
- Automatisches Inhaltsverzeichnis
- Sidebar mit Table of Contents
- CTA-Box in der Sidebar
- Responsive Design

**Verwendung:**
```tsx
<ContentLayout
  breadcrumbs={[
    { label: "Wissen", href: "/wissen" },
    { label: "Ihr Thema", href: "/ihr-thema" }
  ]}
  title="Hauptüberschrift"
  description="Kurze Einleitung"
  lastUpdated="06. Januar 2025"
  readTime="8 Minuten"
  tableOfContents={[
    { id: "section-1", title: "Abschnitt 1", level: 2 },
    { id: "subsection", title: "Unterabschnitt", level: 3 }
  ]}
>
  {/* Ihr Content hier */}
</ContentLayout>
```

## Schritt-für-Schritt: Neue Content-Seite erstellen

### 1. Neue Page-Datei erstellen

Erstellen Sie eine neue Datei in `src/pages/`:

```tsx
// src/pages/IhrThema.tsx
import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";

const IhrThema = () => {
  // Inhaltsverzeichnis definieren
  const tableOfContents = [
    { id: "abschnitt-1", title: "Erster Abschnitt", level: 2 },
    { id: "abschnitt-2", title: "Zweiter Abschnitt", level: 2 },
    { id: "faq", title: "Häufige Fragen", level: 2 }
  ];

  // Schema.org Strukturierte Daten
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Ihr Artikel-Titel",
    "description": "Kurze Beschreibung",
    "author": {
      "@type": "Organization",
      "name": "copilotenschule.de"
    },
    "publisher": {
      "@type": "Organization",
      "name": "copilotenschule.de"
    },
    "datePublished": "2025-01-06",
    "dateModified": "2025-01-06"
  };

  return (
    <>
      <SEOHead
        title="Ihr SEO-optimierter Titel"
        description="Detaillierte Meta-Beschreibung für Suchmaschinen"
        keywords={["Keyword 1", "Keyword 2", "Keyword 3"]}
        canonicalUrl="https://copilotenschule.de/ihr-thema"
        schema={articleSchema}
        publishedTime="2025-01-06"
        modifiedTime="2025-01-06"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Ihr Thema", href: "/ihr-thema" }
        ]}
        title="Hauptüberschrift Ihrer Seite"
        description="Kurze Einleitung zum Thema"
        lastUpdated="06. Januar 2025"
        readTime="5 Minuten"
        tableOfContents={tableOfContents}
      >
        <section id="abschnitt-1">
          <h2>Erster Abschnitt</h2>
          <p>Ihr Content hier...</p>
        </section>

        <section id="abschnitt-2">
          <h2>Zweiter Abschnitt</h2>
          <p>Mehr Content...</p>
        </section>

        <section id="faq">
          <h2>Häufig gestellte Fragen</h2>
          {/* FAQ Content */}
        </section>
      </ContentLayout>
    </>
  );
};

export default IhrThema;
```

### 2. Route in App.tsx hinzufügen

```tsx
import IhrThema from "./pages/IhrThema";

// In der Routes-Komponente:
<Route path="/ihr-thema" element={<IhrThema />} />
```

### 3. (Optional) FAQ-Schema hinzufügen

Für bessere Sichtbarkeit in KI-Suchen:

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ihre Frage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Antwort auf die Frage..."
      }
    }
  ]
};

// Im SEOHead:
<SEOHead
  schema={[articleSchema, faqSchema]}
  // ... andere Props
/>
```

## Best Practices für KI-Suchoptimierung

### 1. Content-Struktur
- ✅ Klare H2/H3 Hierarchie
- ✅ Kurze, prägnante Absätze
- ✅ Bullet Points für Listen
- ✅ Tabellen für Vergleiche
- ✅ FAQ-Sektion am Ende

### 2. SEO-Elemente
- ✅ Aussagekräftiger Title (50-60 Zeichen)
- ✅ Meta-Description (150-160 Zeichen)
- ✅ Relevante Keywords (3-5 Haupt-Keywords)
- ✅ Canonical URL setzen
- ✅ Schema.org Markup verwenden

### 3. Strukturierte Daten
Verwenden Sie Schema.org für:
- Article (für Blog-Posts/Artikel)
- FAQPage (für FAQ-Sektionen)
- HowTo (für Anleitungen)
- BreadcrumbList (für Navigation)

### 4. Content-Qualität
- ✅ Mindestens 1000 Wörter
- ✅ Aktuelle Informationen
- ✅ Quellenangaben
- ✅ Interne Verlinkungen
- ✅ Externe Verlinkungen zu Autoritäten

### 5. KI-Suchfreundlichkeit
- ✅ Direkte Antworten auf Fragen
- ✅ Vergleichstabellen
- ✅ Schritt-für-Schritt Anleitungen
- ✅ Zusammenfassungen
- ✅ Aktuelle Daten (2025)

## Beispiel: Lizenzvergleichsseite

Siehe `src/pages/CopilotLicenses.tsx` für ein vollständiges Beispiel mit:
- Umfassendem Schema.org Markup
- FAQ-Schema für Google Rich Results
- Vergleichstabellen
- Empfehlungskarten
- Breadcrumb-Navigation
- Inhaltsverzeichnis

## Schema.org Typen für verschiedene Content-Arten

### Artikel/Blog-Post
```tsx
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titel",
  "description": "Beschreibung",
  "author": { "@type": "Organization", "name": "copilotenschule.de" },
  "publisher": { "@type": "Organization", "name": "copilotenschule.de" },
  "datePublished": "2025-01-06",
  "dateModified": "2025-01-06"
}
```

### How-To Anleitung
```tsx
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Wie man X macht",
  "description": "Anleitung für...",
  "step": [
    { "@type": "HowToStep", "name": "Schritt 1", "text": "..." },
    { "@type": "HowToStep", "name": "Schritt 2", "text": "..." }
  ]
}
```

### Produktvergleich
```tsx
{
  "@context": "https://schema.org",
  "@type": "ComparisonPage",
  "about": [
    { "@type": "Product", "name": "Produkt A" },
    { "@type": "Product", "name": "Produkt B" }
  ]
}
```

## Tipps für schnelle Seitenerstellung

1. **Template nutzen**: Kopieren Sie `CopilotLicenses.tsx` als Ausgangspunkt
2. **Content zuerst**: Schreiben Sie den Content in Markdown/Text, dann übertragen
3. **Schema.org Generator**: Nutzen Sie Tools wie schema.org/docs
4. **Keyword Research**: Prüfen Sie Google Trends und ChatGPT für relevante Keywords
5. **Internal Linking**: Verlinken Sie zu anderen relevanten Seiten

## Deployment-Checkliste

Vor dem Veröffentlichen prüfen:
- [ ] Title und Meta-Description gesetzt
- [ ] Keywords definiert
- [ ] Canonical URL korrekt
- [ ] Schema.org Markup valide
- [ ] Breadcrumbs funktionieren
- [ ] Inhaltsverzeichnis vollständig
- [ ] Alle IDs in sections vorhanden
- [ ] Interne Links funktionieren
- [ ] Mobile-responsive getestet
- [ ] lastUpdated Datum aktuell

## Performance-Optimierung

- Bilder mit WebP-Format
- Lazy Loading für Bilder
- Code-Splitting für große Pages
- Minimal CSS für Above-the-Fold Content

## Monitoring

Nach Veröffentlichung:
1. Google Search Console einreichen
2. Schema Markup mit Google Rich Results Test prüfen
3. PageSpeed Insights checken
4. ChatGPT/Perplexity nach 1-2 Wochen testen

## Support

Bei Fragen zum Content-System:
- Siehe Beispielseite: `src/pages/CopilotLicenses.tsx`
- Siehe Komponenten: `src/components/ContentLayout.tsx`, `src/components/SEOHead.tsx`
