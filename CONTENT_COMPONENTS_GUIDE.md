# Enhanced Content Components Guide

Professionelle UI-Komponenten für state-of-the-art Wissensseiten mit modernen Animationen und strukturierten Layouts.

## Verfügbare Komponenten

### 1. ContentCard
Vielseitige Info-Boxen mit verschiedenen Varianten und Icons.

**Varianten:**
- `info` - Blaue Info-Box
- `warning` - Amber Warnungen
- `success` - Grüne Erfolgs-Boxen
- `tip` - Violette Tipps
- `feature` - Primary Feature-Highlights
- `goal` - Pink Ziele
- `highlight` - Indigo Hervorhebungen

**Verwendung:**
```tsx
import { ContentCard } from "@/components/content";

<ContentCard variant="tip" title="Pro-Tipp">
  <p>Dies ist ein hilfreicher Tipp für Ihre Nutzer.</p>
</ContentCard>

<ContentCard variant="warning" title="Wichtiger Hinweis">
  <p>Achten Sie darauf, dass...</p>
</ContentCard>
```

### 2. StepByStep
Schritt-für-Schritt Anleitungen mit visueller Timeline und Animationen.

**Verwendung:**
```tsx
import { StepByStep } from "@/components/content";

<StepByStep
  title="Setup in 5 Schritten"
  steps={[
    {
      title: "Installation",
      description: "Installieren Sie die benötigten Pakete mit npm install"
    },
    {
      title: "Konfiguration",
      description: "Konfigurieren Sie Ihre Umgebungsvariablen"
    },
    {
      title: "Build",
      description: "Erstellen Sie einen Production Build"
    }
  ]}
/>
```

### 3. FeatureGrid
Grid-Layout für Features mit Icons und Highlights.

**Verwendung:**
```tsx
import { FeatureGrid } from "@/components/content";
import { Zap, Shield, Rocket } from "lucide-react";

<FeatureGrid
  title="Kernfunktionen"
  columns={3}
  features={[
    {
      icon: Zap,
      title: "Schnell",
      description: "Blitzschnelle Performance",
      highlight: "10x schneller"
    },
    {
      icon: Shield,
      title: "Sicher",
      description: "Enterprise-Grade Sicherheit"
    },
    {
      icon: Rocket,
      title: "Skalierbar",
      description: "Wächst mit Ihren Anforderungen",
      highlight: "Unbegrenzt"
    }
  ]}
/>
```

### 4. ComparisonTable
Vergleichstabellen mit Checkmarks und Highlights.

**Verwendung:**
```tsx
import { ComparisonTable } from "@/components/content";

<ComparisonTable
  title="Lizenz-Vergleich"
  columns={[
    { header: "Free", highlight: false },
    { header: "Pro", highlight: true },
    { header: "Enterprise", highlight: false }
  ]}
  rows={[
    {
      feature: "Basis-Features",
      values: [true, true, true]
    },
    {
      feature: "Erweiterte Analytics",
      values: [false, true, true]
    },
    {
      feature: "24/7 Support",
      values: [false, false, true]
    },
    {
      feature: "Nutzer",
      values: ["Bis 5", "Bis 50", "Unbegrenzt"]
    }
  ]}
/>
```

### 5. QuickStats
Statistik-Karten mit Icons und Trend-Indikatoren.

**Verwendung:**
```tsx
import { QuickStats } from "@/components/content";
import { Users, TrendingUp, DollarSign, Star } from "lucide-react";

<QuickStats
  columns={4}
  stats={[
    {
      label: "Aktive Nutzer",
      value: "10.5K",
      icon: Users,
      color: "blue",
      change: { value: "+12% vs. Vormonat", trend: "up" }
    },
    {
      label: "Wachstum",
      value: "48%",
      icon: TrendingUp,
      color: "green"
    },
    {
      label: "Umsatz",
      value: "€125K",
      icon: DollarSign,
      color: "primary",
      change: { value: "+5% vs. Vormonat", trend: "up" }
    },
    {
      label: "Rating",
      value: "4.9/5",
      icon: Star,
      color: "amber"
    }
  ]}
/>
```

### 6. Timeline
Zeitstrahl-Darstellung mit Highlights.

**Verwendung:**
```tsx
import { Timeline } from "@/components/content";

<Timeline
  title="Entwicklungs-Roadmap"
  items={[
    {
      date: "Q1 2025",
      title: "Beta-Launch",
      description: "Erste Version für ausgewählte Kunden",
      highlight: true
    },
    {
      date: "Q2 2025",
      title: "Public Release",
      description: "Öffentlicher Launch der Platform"
    },
    {
      date: "Q3 2025",
      title: "Enterprise Features",
      description: "Erweiterte Features für Unternehmenskunden"
    }
  ]}
/>
```

### 7. ProConsList
Vor- und Nachteile-Darstellung.

**Verwendung:**
```tsx
import { ProConsList } from "@/components/content";

<ProConsList
  title="Microsoft 365 Copilot"
  pros={[
    "Nahtlose Integration in Microsoft 365",
    "Zugriff auf Unternehmensdaten",
    "DSGVO-konform",
    "Kontinuierliche Updates"
  ]}
  cons={[
    "Kostenpflichtig (30€/Monat)",
    "Nur für Microsoft 365 Nutzer",
    "Benötigt entsprechende Lizenzen"
  ]}
/>
```

## Design-Prinzipien

### Animationen
Alle Komponenten nutzen:
- **Fade-in** Animationen beim Laden
- **Hover-Effekte** für Interaktivität
- **Shimmer-Effekte** für Premium-Feel
- **Micro-Animationen** bei Icons und Buttons

### Farb-Schema
- **Primary/Accent** Gradienten für Akzente
- **Backdrop-blur** für glassmorphic Effekte
- **Border-Highlights** on hover
- **Glow-Effekte** für wichtige Elemente

### Spacing & Layout
- **Großzügige Abstände** für bessere Lesbarkeit
- **Grid-basierte** Layouts für Konsistenz
- **Responsive** Design für alle Bildschirmgrößen
- **Sticky Sidebar** für Navigation

## Integration in Wissensseiten

### Vollständiges Beispiel

```tsx
import KnowledgePageTemplate from "@/components/KnowledgePageTemplate";
import {
  ContentCard,
  StepByStep,
  FeatureGrid,
  QuickStats,
  ComparisonTable,
  ProConsList
} from "@/components/content";
import { Zap, Shield, Users } from "lucide-react";

const MyKnowledgePage = () => {
  return (
    <KnowledgePageTemplate
      title="Mein Wissens-Guide"
      description="Ein professioneller Guide mit modernem Design"
      canonicalUrl="https://copilotenschule.de/my-guide"
      keywords={["Guide", "Tutorial", "Anleitung"]}
      authorId="martin-lang"
      publishedDate="2025-01-10"
      modifiedDate="2025-01-10"
      quickAnswer={{
        title: "Schnellantwort",
        content: "Dieser Guide erklärt alles Wichtige in 5 Minuten.",
        highlights: [
          {
            label: "Lesezeit",
            description: "Geschätzte Dauer",
            value: "5 Min"
          },
          {
            label: "Schwierigkeit",
            description: "Level",
            value: "Einsteiger"
          }
        ]
      }}
      tableOfContents={[
        { id: "intro", title: "Einführung", level: 2 },
        { id: "features", title: "Features", level: 2 },
        { id: "setup", title: "Setup", level: 2 }
      ]}
      breadcrumbs={[
        { label: "Wissen", href: "/wissen" },
        { label: "Guides", href: "/wissen/guides" }
      ]}
      readTime="5 Min"
      faqItems={[
        {
          question: "Wie lange dauert die Implementation?",
          answer: "Die grundlegende Implementation dauert etwa 2-3 Stunden."
        }
      ]}
    >
      {/* Content */}
      <section id="intro">
        <h2>Einführung</h2>
        <p>Willkommen zu diesem professionellen Guide.</p>

        <ContentCard variant="info" title="Was Sie lernen werden">
          <ul className="space-y-2">
            <li>✓ Grundlagen verstehen</li>
            <li>✓ Praktische Anwendung</li>
            <li>✓ Best Practices</li>
          </ul>
        </ContentCard>
      </section>

      <section id="features">
        <h2>Kernfunktionen</h2>
        <FeatureGrid
          columns={3}
          features={[
            {
              icon: Zap,
              title: "Schnell",
              description: "Optimiert für Performance",
              highlight: "Blitzschnell"
            },
            {
              icon: Shield,
              title: "Sicher",
              description: "Enterprise-Grade Security"
            },
            {
              icon: Users,
              title: "Kollaborativ",
              description: "Team-fähig"
            }
          ]}
        />
      </section>

      <section id="setup">
        <h2>Setup-Anleitung</h2>
        <StepByStep
          steps={[
            {
              title: "Installation",
              description: "Installieren Sie die benötigten Pakete"
            },
            {
              title: "Konfiguration",
              description: "Passen Sie die Einstellungen an"
            },
            {
              title: "Deployment",
              description: "Deployen Sie Ihre Anwendung"
            }
          ]}
        />
      </section>

      <ProConsList
        title="Vor- und Nachteile"
        pros={[
          "Einfach zu implementieren",
          "Professionelles Design",
          "Viele Anpassungsmöglichkeiten"
        ]}
        cons={[
          "Benötigt moderne Browser",
          "Initiale Lernkurve"
        ]}
      />
    </KnowledgePageTemplate>
  );
};

export default MyKnowledgePage;
```

## Best Practices

### 1. Konsistente Verwendung
- Nutzen Sie die gleichen Varianten für ähnliche Inhaltstypen
- Bleiben Sie beim Farb-Schema (primary/accent)
- Verwenden Sie Icons aus der gleichen Familie (lucide-react)

### 2. Performance
- Animationen sind GPU-beschleunigt
- Lazy-Loading für große Listen
- Optimierte Bilder verwenden

### 3. Accessibility
- Alle Komponenten sind keyboard-navigable
- ARIA-Labels sind inkludiert
- Ausreichender Kontrast

### 4. Mobile-First
- Alle Komponenten sind responsive
- Touch-optimierte Interaktionen
- Gestapelte Layouts auf kleinen Bildschirmen

## Styling Anpassungen

Falls Sie die Komponenten anpassen möchten:

```tsx
// Custom className hinzufügen
<ContentCard
  variant="info"
  className="my-custom-class"
  title="Custom Style"
>
  Content here
</ContentCard>

// Inline Styles (nicht empfohlen, aber möglich)
<FeatureGrid
  features={features}
  className="custom-grid-spacing"
/>
```

## Support

Bei Fragen oder Problemen:
1. Prüfen Sie dieses Guide
2. Schauen Sie in die Komponent-Dateien unter `/src/components/content/`
3. Testen Sie die Komponenten in isolation
4. Kontaktieren Sie das Development-Team

---

**Version:** 1.0
**Letzte Aktualisierung:** 14. November 2025
**Autor:** Claude (AI Assistant)
