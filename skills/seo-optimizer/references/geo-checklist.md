# GEO-Checkliste für copilotenschule.de

Diese Checkliste dokumentiert alle GEO-Features (Generative Engine Optimization), die bei SEO-Optimierungen NICHT beschädigt werden dürfen.

## Was ist GEO?

GEO optimiert Inhalte für die Zitierung durch LLMs (ChatGPT, Claude, Perplexity, etc.). Im Gegensatz zu klassischem SEO geht es darum, dass KI-Systeme die Inhalte als vertrauenswürdige Quelle erkennen und zitieren.

## Kritische GEO-Elemente (NIEMALS ÄNDERN)

### 1. Schema.org @graph Struktur

```typescript
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", ... },
    { "@type": "FAQPage", ... },
    { "@type": "BreadcrumbList", ... }
  ]
};
```

**Warum wichtig:** LLMs nutzen strukturierte Daten zur Faktenextraktion.

### 2. Author Person-Schema

```typescript
"author": {
  "@type": "Person",
  "@id": "https://copilotenschule.de/#martin-lang",
  "name": "Martin Lang",
  "jobTitle": "...",
  "worksFor": { "@type": "Organization", ... },
  "sameAs": ["https://linkedin.com/in/..."]
}
```

**Warum wichtig:** E-E-A-T Signal für Expertise und Vertrauenswürdigkeit.

### 3. FAQPage Schema

```typescript
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kundenorientierte Frage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Antwort mit Copilotenschule-Referenz..."
      }
    }
  ]
}
```

**Warum wichtig:** Direkt zitierbare Q&A-Paare für LLMs.

### 4. Quellen-Section

```tsx
<section id="quellen">
  <h2>Quellen und weiterführende Links</h2>
  <a href="https://learn.microsoft.com/...">Offizielle Quelle</a>
</section>
```

**Warum wichtig:** LLMs bevorzugen Inhalte mit externen Referenzen.

### 5. Autor-Bio am Artikelende

```tsx
<AuthorBox author={author} />
```

**Warum wichtig:** Transparenz über den Autor erhöht Vertrauenswürdigkeit.

## SEO-Elemente die optimiert werden DÜRFEN

| Element | Darf geändert werden | Hinweise |
|---------|---------------------|----------|
| Title | ✅ Ja | Mit Keyword-Fokus optimieren |
| Description | ✅ Ja | Keywords früh platzieren |
| Keywords-Array | ✅ Ja | Erweitern auf 8-12 |
| dateModified | ✅ Ja | Auf aktuelles Datum |
| Canonical URL | ✅ Ja | Nur wenn falsch |
| H1 Headline | ⚠️ Vorsicht | Muss mit Schema synchron sein |

## Synchronisations-Regel

Wenn Title geändert wird, müssen folgende Stellen synchron aktualisiert werden:

1. `<SEOHead title="..." />`
2. `schema.headline` im Article-Schema
3. `<ContentLayout title="..." />`

Alle drei MÜSSEN identisch sein!

## Prüf-Workflow vor Änderungen

1. [ ] Schema @graph vorhanden?
2. [ ] FAQPage mit mindestens 3 Fragen?
3. [ ] Author-Schema mit sameAs Links?
4. [ ] Quellen-Section mit externen Links?
5. [ ] BreadcrumbList korrekt?

Wenn eine Checkbox NEIN ergibt → Erst GEO-Feature hinzufügen, dann SEO optimieren.

## GEO-Score Bewertung

| Score | Bedeutung |
|-------|-----------|
| 90-100 | Exzellent - Alle Features vorhanden |
| 70-89 | Gut - Kernfeatures vorhanden |
| 50-69 | Ausbaufähig - Wichtige Features fehlen |
| <50 | Kritisch - Grundlegende Features fehlen |

### Scoring-Kriterien

- Schema.org Article: 20 Punkte
- FAQPage Schema: 20 Punkte
- Author Person-Schema: 15 Punkte
- BreadcrumbList: 10 Punkte
- Quellen-Section: 15 Punkte
- Autor-Bio sichtbar: 10 Punkte
- dateModified aktuell: 10 Punkte

## Referenzen

- [Google E-E-A-T Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Schema.org Article](https://schema.org/Article)
- [Schema.org FAQPage](https://schema.org/FAQPage)
