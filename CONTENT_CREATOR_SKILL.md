# Content Creator Skill v2.0

Professioneller Workflow zur Erstellung SEO- und GEO-optimierter Wissensseiten für copilotenschule.de.

---

## Ziele

- **Maximale Editierbarkeit**: User behält Kontrolle in jeder Phase
- **SEO/GEO-optimiert**: Erfüllt alle Kriterien des SEO-Optimizer Skills
- **Visuell ansprechend**: Keine Textwüsten, sondern strukturierte Layouts mit Komponenten
- **Fehlerfrei**: Vermeidet bekannte Bugs (doppelter Footer, Layout-Probleme)

---

## Architektur-Regeln

### Komponenten-Hierarchie (WICHTIG!)

```
Seiten-Komponente (z.B. MeinArtikel.tsx)
└── KnowledgePageTemplate (EINZIGER Wrapper)
    ├── SEOHead (automatisch eingebunden)
    ├── ContentLayout (automatisch eingebunden)
    │   ├── Header (automatisch)
    │   ├── Breadcrumbs (automatisch)
    │   ├── Sidebar/TOC (automatisch)
    │   └── Footer (automatisch)
    └── Content-Sections mit Komponenten
```

### Verbotene Muster

```tsx
// ❌ FALSCH - Verursacht doppelten Footer
<KnowledgePageTemplate>
  <ContentLayout>  {/* NIEMALS verschachteln! */}
    <Content />
  </ContentLayout>
</KnowledgePageTemplate>

// ❌ FALSCH - Footer wird doppelt gerendert
<>
  <ContentLayout>
    <Content />
  </ContentLayout>
  <Footer />  {/* Footer ist bereits in ContentLayout! */}
</>
```

### Korrekte Verwendung

```tsx
// ✅ RICHTIG - Nur KnowledgePageTemplate verwenden
<KnowledgePageTemplate
  title="..."
  // ... andere Props
>
  <section id="intro">
    <h2>Einführung</h2>
    {/* Content */}
  </section>
</KnowledgePageTemplate>
```

---

## Workflow: 5 Phasen

### Phase 1: Konzeption & Briefing

**Ziel**: Klare Definition des Artikels bevor Content erstellt wird.

**Checkpoint 1 - Artikelkonzept**

| Feld | Beschreibung | Beispiel |
|------|--------------|----------|
| Arbeitstitel | Vorläufiger Titel | "Microsoft Copilot ROI berechnen" |
| Zielgruppe | Wer liest das? | Geschäftsführer, IT-Leiter |
| Suchintent | Was will der Leser? | ROI verstehen, Kosten rechtfertigen |
| Primär-Keyword | Hauptsuchbegriff | "Copilot ROI" |
| Sekundär-Keywords | 3-5 weitere | "Copilot Kosten", "Copilot Nutzen" |
| Content-Typ | Format | Ratgeber / How-To / Vergleich |
| Geschätzte Lesezeit | Minuten | 8-12 Min |

**User-Freigabe erforderlich**: Ja/Nein zum Konzept

---

### Phase 2: Struktur & Gliederung

**Ziel**: Logische Seitenstruktur mit allen Abschnitten definieren.

**Struktur-Template**

```
1. Schnellantwort (Quick Answer Box)
   └── Direkte Antwort auf Hauptfrage
   └── 2-3 Key Facts mit Zahlen/Daten

2. Einführung
   └── Problem/Herausforderung
   └── Warum dieses Thema wichtig ist

3. Hauptteil (3-5 Abschnitte)
   └── Logisch aufgebaut
   └── Jeder Abschnitt: H2 + kurze Einleitung + Inhalt
   └── Visuelle Elemente pro Abschnitt

4. Praktische Umsetzung
   └── Schritt-für-Schritt oder Handlungsempfehlungen
   └── StepByStep-Komponente verwenden

5. Vergleich/Entscheidungshilfe (optional)
   └── ComparisonTable oder ProConsList
   └── Klare Empfehlung

6. FAQ
   └── 3-5 häufige Fragen
   └── Kundenorientiert formuliert

7. Fazit & CTA
   └── Zusammenfassung
   └── Handlungsaufforderung
```

**Checkpoint 2 - Gliederung**

```markdown
## Gliederung: [Artikeltitel]

### H1: [Hauptüberschrift mit Primär-Keyword]

### Quick Answer
- Kernaussage: [1 Satz]
- Highlights: [3 Zahlen/Fakten]

### H2: [Abschnitt 1]
- Komponente: [ContentCard/FeatureGrid/etc.]
- Kerninhalt: [2-3 Bullet Points]

### H2: [Abschnitt 2]
...

### FAQ
- Q1: [Frage]
- Q2: [Frage]
- Q3: [Frage]
```

**User-Freigabe erforderlich**: Ja/Nein zur Gliederung

---

### Phase 3: SEO & Meta-Daten

**Ziel**: Alle SEO-relevanten Elemente definieren.

**SEO-Checkliste**

| Element | Anforderung | Status |
|---------|-------------|--------|
| **Title** | Max 60 Zeichen, Primär-Keyword vorne | [ ] |
| **Description** | Max 155 Zeichen, Keyword in ersten 50 Zeichen, CTA | [ ] |
| **Keywords-Array** | 8-12 Begriffe, Mix Short/Long-Tail | [ ] |
| **Canonical URL** | /wissen/[slug] Format | [ ] |
| **H1** | Exakt 1x, enthält Primär-Keyword | [ ] |
| **H2s** | Sekundäre Keywords, logische Struktur | [ ] |
| **Alt-Texte** | Alle Bilder beschrieben, Kontext | [ ] |
| **Internal Links** | Mind. 3 zu verwandten Artikeln/Trainings | [ ] |
| **External Links** | Mind. 1-2 zu autoritativen Quellen | [ ] |

**GEO-Checkliste (nicht ändern, nur prüfen)**

| Element | Vorhanden |
|---------|-----------|
| Schema.org @graph | [ ] |
| Article-Schema mit Author | [ ] |
| FAQPage-Schema | [ ] |
| BreadcrumbList-Schema | [ ] |
| E-E-A-T Elemente (Autor-Bio, Expertise) | [ ] |

**Checkpoint 3 - SEO-Daten**

```yaml
seo:
  title: "[Max 60 Zeichen]"
  description: "[Max 155 Zeichen]"
  keywords:
    - keyword1
    - keyword2
    - ...
  canonicalUrl: "https://copilotenschule.de/wissen/[slug]"

dates:
  published: "YYYY-MM-DD"
  modified: "YYYY-MM-DD"

author: "martin-lang"
readTime: "X Min"
```

**User-Freigabe erforderlich**: Ja/Nein zu SEO-Daten

---

### Phase 4: Content-Erstellung

**Ziel**: Inhalte mit visuellen Komponenten erstellen.

#### Verfügbare Komponenten

##### 1. ContentCard - Info-Boxen

```tsx
// Varianten: info, warning, success, tip, feature, goal, highlight
<ContentCard variant="tip" title="Pro-Tipp">
  <p>Hilfreicher Hinweis für den Leser.</p>
</ContentCard>
```

**Wann verwenden**: Wichtige Hinweise, Tipps, Warnungen hervorheben

##### 2. StepByStep - Anleitungen

```tsx
<StepByStep
  title="Setup in 3 Schritten"
  steps={[
    { title: "Schritt 1", description: "Beschreibung..." },
    { title: "Schritt 2", description: "Beschreibung..." },
    { title: "Schritt 3", description: "Beschreibung..." }
  ]}
/>
```

**Wann verwenden**: Prozesse, Anleitungen, Workflows

##### 3. FeatureGrid - Feature-Übersichten

```tsx
<FeatureGrid
  columns={3}
  features={[
    { icon: Zap, title: "Feature", description: "...", highlight: "10x" },
    // ...
  ]}
/>
```

**Wann verwenden**: Vorteile, Features, Eigenschaften auflisten

##### 4. ComparisonTable - Vergleiche

```tsx
<ComparisonTable
  title="Lizenz-Vergleich"
  columns={[
    { header: "Basic", highlight: false },
    { header: "Pro", highlight: true },
    { header: "Enterprise", highlight: false }
  ]}
  rows={[
    { feature: "Feature X", values: [true, true, true] },
    { feature: "Nutzer", values: ["5", "50", "Unbegrenzt"] }
  ]}
/>
```

**Wann verwenden**: Produkt-/Lizenz-/Anbieter-Vergleiche

##### 5. QuickStats - Statistiken

```tsx
<QuickStats
  columns={4}
  stats={[
    { label: "Nutzer", value: "10K", icon: Users, color: "blue" },
    // ...
  ]}
/>
```

**Wann verwenden**: Zahlen, Statistiken, KPIs hervorheben

##### 6. ProConsList - Vor-/Nachteile

```tsx
<ProConsList
  title="Microsoft Copilot"
  pros={["Vorteil 1", "Vorteil 2"]}
  cons={["Nachteil 1", "Nachteil 2"]}
/>
```

**Wann verwenden**: Produktbewertungen, Entscheidungshilfen

##### 7. Timeline - Zeitstrahlen

```tsx
<Timeline
  title="Roadmap"
  items={[
    { date: "Q1 2025", title: "Phase 1", description: "..." },
    // ...
  ]}
/>
```

**Wann verwenden**: Chronologische Abläufe, Roadmaps, Historie

#### Content-Regeln

1. **Keine Textwüsten**: Max 3-4 Absätze Text ohne visuelle Unterbrechung
2. **Komponenten-Mix**: Mind. 1 Komponente pro Hauptabschnitt
3. **Scannable Content**: Leser soll wichtige Infos beim Überfliegen erfassen
4. **Aktive Sprache**: Direkte Ansprache, handlungsorientiert
5. **Konkrete Beispiele**: Abstrakte Konzepte mit Praxis-Beispielen illustrieren

**Checkpoint 4 - Content-Entwurf**

User erhält vollständigen Content-Entwurf als Markdown oder Preview.

**User-Freigabe erforderlich**: Ja/Nein zum Content

---

### Phase 5: Implementierung & Review

**Ziel**: Saubere Code-Generierung und Qualitätssicherung.

#### Code-Template

```tsx
import KnowledgePageTemplate from "@/components/KnowledgePageTemplate";
import {
  ContentCard,
  StepByStep,
  FeatureGrid,
  ComparisonTable,
  QuickStats,
  ProConsList,
  Timeline
} from "@/components/content";
import { /* Icons */ } from "lucide-react";

const ArtikelName = () => {
  return (
    <KnowledgePageTemplate
      // === SEO ===
      title="[Title max 60 Zeichen]"
      description="[Description max 155 Zeichen]"
      canonicalUrl="https://copilotenschule.de/wissen/[slug]"
      keywords={["keyword1", "keyword2", ...]}

      // === Autor & Datum ===
      authorId="martin-lang"
      publishedDate="YYYY-MM-DD"
      modifiedDate="YYYY-MM-DD"

      // === Quick Answer ===
      quickAnswer={{
        title: "Schnellantwort",
        content: "[Direkte Antwort auf Hauptfrage]",
        highlights: [
          { label: "Label", description: "...", value: "X" },
          { label: "Label", description: "...", value: "Y" },
          { label: "Label", description: "...", value: "Z" }
        ]
      }}

      // === Navigation ===
      tableOfContents={[
        { id: "einleitung", title: "Einleitung", level: 2 },
        { id: "hauptteil", title: "Hauptteil", level: 2 },
        // ...
        { id: "faq", title: "FAQ", level: 2 }
      ]}
      breadcrumbs={[
        { label: "Wissen", href: "/wissen" },
        { label: "[Kategorie]", href: "/wissen/[kategorie]" }
      ]}
      readTime="X Min"

      // === FAQ ===
      faqItems={[
        { question: "Frage 1?", answer: "Antwort 1" },
        { question: "Frage 2?", answer: "Antwort 2" },
        { question: "Frage 3?", answer: "Antwort 3" }
      ]}
    >
      {/* === CONTENT START === */}

      <section id="einleitung">
        <h2>Einleitung</h2>
        <p>Einleitungstext...</p>

        <ContentCard variant="info" title="Wichtig zu wissen">
          <p>Hervorgehobene Information.</p>
        </ContentCard>
      </section>

      <section id="hauptteil">
        <h2>Hauptteil</h2>
        <p>Inhalt...</p>

        <FeatureGrid
          columns={3}
          features={[/* ... */]}
        />
      </section>

      {/* Weitere Sections... */}

      {/* === CONTENT END === */}
    </KnowledgePageTemplate>
  );
};

export default ArtikelName;
```

#### Quality-Checks

| Check | Beschreibung | Status |
|-------|--------------|--------|
| TypeScript | `npx tsc --noEmit` ohne Fehler | [ ] |
| Keine doppelten Wrapper | Nur KnowledgePageTemplate | [ ] |
| Alle IDs vorhanden | Sections haben passende IDs | [ ] |
| TOC stimmt | IDs matchen tableOfContents | [ ] |
| Links funktionieren | Interne Links geprüft | [ ] |
| Mobile Preview | Responsive Design OK | [ ] |
| Lighthouse | Performance/SEO Score >90 | [ ] |

**Checkpoint 5 - Finale Freigabe**

Vorher/Nachher-Vergleich für:
- Title, Description, Keywords
- Struktur und Gliederung
- Visuelle Komponenten
- FAQ-Fragen

**User-Freigabe erforderlich**: Ja/Nein zur Veröffentlichung

---

## Quick Reference: Komponenten-Auswahl

| Situation | Empfohlene Komponente |
|-----------|----------------------|
| Wichtiger Hinweis | `ContentCard variant="warning"` |
| Pro-Tipp | `ContentCard variant="tip"` |
| Erfolgs-Info | `ContentCard variant="success"` |
| Schritt-für-Schritt Anleitung | `StepByStep` |
| Features auflisten | `FeatureGrid` |
| Produkte vergleichen | `ComparisonTable` |
| Vor-/Nachteile | `ProConsList` |
| Statistiken/Zahlen | `QuickStats` |
| Zeitlicher Ablauf | `Timeline` |
| Hervorhebung | `ContentCard variant="highlight"` |

---

## Keyword-Strategie (aus SEO-Optimizer)

### Primäre Cluster

| Cluster | Keywords |
|---------|----------|
| Einführung | Copilot Einführung, Rollout, Implementierung |
| Training | Copilot Schulung, Workshop, Kurs |
| Compliance | Copilot DSGVO, Governance, Datenschutz |
| Probleme | Copilot Fehler, Risiken, Halluzinationen |
| ROI | Copilot Kosten, Nutzen, Produktivität |

### Zielgruppen-Keywords

Immer ergänzen mit:
- "für Unternehmen"
- "für Teams"
- "B2B"
- "Enterprise"
- "deutsche Unternehmen"

---

## Troubleshooting

### Problem: Doppelter Footer

**Ursache**: ContentLayout oder Footer manuell zusätzlich eingebunden

**Lösung**: Nur `KnowledgePageTemplate` verwenden, keine verschachtelten Layout-Komponenten

### Problem: TOC-Links funktionieren nicht

**Ursache**: Section-IDs stimmen nicht mit tableOfContents überein

**Lösung**: IDs in `<section id="...">` müssen exakt mit `tableOfContents[].id` matchen

### Problem: Seite lädt langsam

**Ursache**: Zu viele/große Bilder, fehlende Lazy-Loading

**Lösung**:
- WebP/AVIF Format verwenden
- `loading="lazy"` für Bilder
- Bilder komprimieren (<100KB)

---

## Beispiel-Artikel

Siehe `/src/pages/CopilotLicenses.tsx` als Referenz-Implementierung.

---

**Version**: 2.0
**Letzte Aktualisierung**: 02. Februar 2026
**Autor**: Claude (basierend auf SEO-Optimizer Skill)
