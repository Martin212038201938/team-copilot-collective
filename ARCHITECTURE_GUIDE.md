# Architecture Guide - Content Creator System

Dieses Dokument beschreibt die Architektur des Content-Systems und vermeidet bekannte Fallstricke.

---

## Komponenten-Hierarchie

### Das Problem: Doppelte Header/Footer

**VERBOTEN** - Diese Verschachtelung führt zu doppelten Elementen:

```
❌ DynamicKnowledgePage
├── Header          ← 1. Header
├── <main>
│   └── KnowledgePagePreview
│       └── ContentLayout
│           ├── Header    ← 2. Header (DOPPELT!)
│           └── Footer    ← 1. Footer
└── Footer          ← 2. Footer (DOPPELT!)
```

**KORREKT** - Komponenten, die `ContentLayout` verwenden, rendern keine eigenen Header/Footer:

```
✅ DynamicKnowledgePage
└── KnowledgePagePreview
    └── ContentLayout
        ├── Header    ← Nur 1x Header
        ├── Content
        └── Footer    ← Nur 1x Footer
```

---

## Komponenten-Übersicht

### 1. ContentLayout

**Zweck**: Basis-Layout für alle Content-Seiten mit Header, Footer, Sidebar, TOC.

**Enthält bereits**:
- `<Header />`
- `<main>` mit Breadcrumbs, Titel, Content-Bereich
- Sidebar mit Table of Contents
- CTA-Box
- `<Footer />`

**Props**:
```tsx
interface ContentLayoutProps {
  children: ReactNode;
  breadcrumbs?: Breadcrumb[];
  title: string;
  description?: string;
  lastUpdated?: string;
  readTime?: string;
  tableOfContents?: { id: string; title: string; level: number }[];
  noShell?: boolean;  // NEU: Nur inneren Content, ohne Header/Footer
}
```

**Verwendung**:
```tsx
// Standard-Verwendung (mit Header/Footer)
<ContentLayout title="..." breadcrumbs={[...]}>
  <section id="intro">...</section>
</ContentLayout>

// Ohne Header/Footer (für Verschachtelung in anderen Wrappern)
<ContentLayout title="..." noShell={true}>
  <section id="intro">...</section>
</ContentLayout>
```

### 2. KnowledgePageTemplate

**Zweck**: Erweiterter Wrapper für Wissensseiten mit Quick Answer, FAQ, Author Bio.

**Verwendet intern**: `ContentLayout` (daher bereits Header/Footer enthalten!)

**NIEMALS verschachteln**:
```tsx
// ❌ FALSCH
<KnowledgePageTemplate>
  <ContentLayout>  {/* NEIN! */}
    <Content />
  </ContentLayout>
</KnowledgePageTemplate>

// ✅ RICHTIG
<KnowledgePageTemplate {...props}>
  <section id="intro">...</section>
</KnowledgePageTemplate>
```

### 3. KnowledgePagePreview

**Zweck**: Rendert Markdown-Content dynamisch mit ReactMarkdown.

**Verwendet intern**: `ContentLayout`

**NIEMALS umschließen mit Header/Footer**:
```tsx
// ❌ FALSCH
<>
  <Header />
  <KnowledgePagePreview ... />
  <Footer />
</>

// ✅ RICHTIG
<KnowledgePagePreview ... />
```

### 4. DynamicKnowledgePage

**Zweck**: Route-Handler für `/wissen/:slug`, lädt Artikel aus publishedArticles.

**Verwendet**: `KnowledgePagePreview`

**Rendert KEINE Header/Footer** (da KnowledgePagePreview → ContentLayout diese bereits enthält).

---

## Entscheidungsbaum: Welche Komponente verwenden?

```
Neue Wissensseite erstellen?
│
├── Statische TSX-Seite (manuell erstellt)
│   └── Verwende: KnowledgePageTemplate
│       └── Content direkt als children
│
├── Dynamische Markdown-Seite (aus CMS/Admin)
│   └── Verwende: DynamicKnowledgePage → KnowledgePagePreview
│       └── Markdown wird zu React gerendert
│
└── Eigenes Layout benötigt?
    ├── Mit Header/Footer: ContentLayout (ohne noShell)
    └── Ohne Header/Footer: ContentLayout mit noShell={true}
```

---

## Content-Erstellung: Der richtige Workflow

### Option A: Markdown im Admin-Portal

1. **Erstellen**: Markdown im Admin-Portal schreiben
2. **Speichern**: Als JSON-Draft in `content/drafts/`
3. **Veröffentlichen**: Script generiert Route automatisch
4. **Anzeige**: `DynamicKnowledgePage` rendert via `KnowledgePagePreview`

**Vorteile**: Einfach zu bearbeiten, keine TSX-Kenntnisse nötig

### Option B: TSX-Komponenten manuell

1. **Erstellen**: Neue `.tsx` Datei in `src/pages/`
2. **Template**: `KnowledgePageTemplate` mit Props
3. **Route**: Manuell in `App.tsx` hinzufügen
4. **Pre-Rendering**: Route in `package.json` eintragen

**Vorteile**: Volle Kontrolle, benutzerdefinierte Komponenten möglich

---

## SEO & GEO Anforderungen

### Pflicht-Elemente

| Element | Beschreibung | Wo definiert |
|---------|--------------|--------------|
| `<title>` | Max 60 Zeichen, Keyword vorne | SEOHead |
| `<meta description>` | Max 155 Zeichen | SEOHead |
| Canonical URL | Vollständige URL | SEOHead |
| Article Schema | JSON-LD mit @id | SEOHead |
| FAQ Schema | Für FAQ-Sektionen | KnowledgePageTemplate |
| BreadcrumbList | Navigation | ContentLayout |

### GEO-Schutz (NICHT ÄNDERN)

Diese Elemente dürfen **niemals** entfernt werden:
- `@graph` Struktur im Schema
- Author-Verknüpfung (`@id`)
- Publisher-Verknüpfung (`@id`)
- FAQPage Schema
- BreadcrumbList Schema
- E-E-A-T Signale (Autor-Bio, Qualifikationen)

---

## Visuelle Komponenten für Content

Um Textwüsten zu vermeiden, verwende diese Komponenten:

| Komponente | Wann verwenden | Import |
|------------|----------------|--------|
| `ContentCard` | Hinweise, Tipps, Warnungen | `@/components/content` |
| `StepByStep` | Anleitungen, Prozesse | `@/components/content` |
| `FeatureGrid` | Feature-Listen, Vorteile | `@/components/content` |
| `ComparisonTable` | Vergleiche, Lizenzmodelle | `@/components/content` |
| `QuickStats` | Zahlen, KPIs | `@/components/content` |
| `ProConsList` | Vor-/Nachteile | `@/components/content` |
| `Timeline` | Chronologie, Roadmaps | `@/components/content` |

### Regel: Keine Textwüsten

- Max 3-4 Absätze Text ohne visuelle Unterbrechung
- Mind. 1 Komponente pro Hauptabschnitt (H2)
- Bullet Points statt langer Fließtext-Listen

---

## Checkliste: Neue Wissensseite

### Vor der Erstellung

- [ ] Primär-Keyword definiert
- [ ] Gliederung mit H2/H3 geplant
- [ ] FAQ-Fragen vorbereitet (min. 3-5)
- [ ] Visuelle Komponenten ausgewählt

### Bei der Implementierung

- [ ] Nur EINE Layout-Komponente verwendet
- [ ] Keine verschachtelten ContentLayouts
- [ ] Keine doppelten Header/Footer
- [ ] Section-IDs matchen tableOfContents
- [ ] Alle Bilder haben Alt-Text

### Nach der Implementierung

- [ ] TypeScript-Kompilierung OK (`npx tsc --noEmit`)
- [ ] Mobile-Responsive getestet
- [ ] Route in `package.json` reactSnap.include
- [ ] Schema.org Markup validiert

---

## Troubleshooting

### Problem: Doppelter Footer

**Symptom**: Footer erscheint zweimal auf der Seite

**Ursache**: Komponente, die ContentLayout verwendet, ist in einen Wrapper mit eigenem Footer eingebettet

**Lösung**:
1. Prüfen ob Parent-Komponente Header/Footer rendert
2. Falls ja: Entferne Header/Footer aus Parent
3. Oder: Verwende `ContentLayout` mit `noShell={true}`

### Problem: TOC-Links funktionieren nicht

**Symptom**: Klick auf Inhaltsverzeichnis scrollt nicht

**Ursache**: Section-IDs stimmen nicht mit tableOfContents überein

**Lösung**:
```tsx
// IDs müssen exakt matchen
tableOfContents={[
  { id: "einleitung", title: "Einleitung", level: 2 }
]}

// Im Content:
<section id="einleitung">  {/* MUSS "einleitung" sein! */}
  <h2>Einleitung</h2>
</section>
```

### Problem: Markdown rendert nicht korrekt

**Symptom**: Markdown-Syntax wird als Text angezeigt

**Ursache**: ReactMarkdown fehlt oder falsch konfiguriert

**Lösung**: Stelle sicher, dass `KnowledgePagePreview` verwendet wird (nicht raw HTML)

---

## Dateistruktur

```
src/
├── components/
│   ├── ContentLayout.tsx      # Basis-Layout
│   ├── KnowledgePageTemplate.tsx  # Wissensseiten-Wrapper
│   ├── KnowledgePagePreview.tsx   # Markdown-Renderer
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── content/               # Visuelle Komponenten
│       ├── ContentCard.tsx
│       ├── StepByStep.tsx
│       ├── FeatureGrid.tsx
│       └── ...
├── pages/
│   ├── DynamicKnowledgePage.tsx   # Route-Handler für /wissen/:slug
│   └── [ManuelleArtikel].tsx      # Statische Wissensseiten
│
content/
└── drafts/                    # JSON-Drafts für CMS
    └── [artikel-slug].json

scripts/
├── generate-content.js        # AI Content Generator
└── publish-articles.cjs       # Auto-Publisher
```

---

**Version**: 2.0
**Stand**: 02. Februar 2026
**Autor**: Claude
