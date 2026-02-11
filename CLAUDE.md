# Projekt-Anweisungen für Claude

## Allgemeine Git-Regeln
- **NIEMALS** `git reset --hard` ausführen
- **NIEMALS** force push (`git push -f` oder `git push --force`)
- **NIEMALS** Secrets, Tokens oder Passwörter in Code oder Commits
- Bei Git-Konflikten oder Problemen: erst User fragen, dann handeln
- Keine destruktiven Git-Operationen ohne explizite User-Bestätigung

## Workflow mit GitHub Desktop
- User synchronisiert mit GitHub Desktop (Pull/Push)
- Claude macht Datei-Änderungen im lokalen Ordner
- User reviewed Änderungen in GitHub Desktop vor dem Commit
- Claude pusht NICHT eigenständig (außer User fordert es explizit an)

## Vor jeder Arbeit
1. Prüfen ob es uncommittete Änderungen gibt (`git status`)
2. Bei Änderungen: User fragen ob committen oder verwerfen
3. Erst dann mit neuer Arbeit beginnen

## Sicherheit
- Secrets gehören in `.env` Dateien (die in `.gitignore` sind)
- Oder in lokale Credential Stores (`~/.git-credentials`)
- Niemals API-Keys, Tokens oder Passwörter in versionierte Dateien

## Bei Fehlern
- Keine Panik-Aktionen wie reset oder force push
- User informieren was passiert ist
- Gemeinsam Lösung finden

---
## Projekt: Copilotenschule.de

- **Repository:** Martin212038201938/team-copilot-collective
- **Live-URL:** https://copilotenschule.de
- **Tech Stack:** Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- **Deployment:** Push zu `main` → GitHub Actions → FTP zu alwaysdata.com

### Lokale Entwicklung
```bash
cd ~/Documents/Cowork\ Bereich/team-copilot-collective
npm install
npm run dev
```
→ Server läuft auf **http://localhost:8080/**

### Projektstruktur
- `/src/pages/` - Seiten (Index, UeberUns, Wissen, etc.)
- `/src/components/` - React Komponenten
- `/src/data/` - Daten (authors.ts, trainings.ts, faqs.ts, etc.)
- `/src/lib/` - Utilities und Schema-Generierung
- `/public/` - Statische Assets

---
## Content-Erstellung: Wissensartikel

### ⚠️ KRITISCH: Alle Artikel MÜSSEN statisch sein (SEO!)

**Warum?** Nur statische TSX-Dateien werden von Suchmaschinen indexiert. JSON-Drafts, die zur Laufzeit gerendert werden, sind für Google & Co. unsichtbar!

### Pflicht-Workflow für JEDEN neuen Artikel

Bei jedem neuen Wissensartikel MÜSSEN diese 4 Schritte erfolgen:

#### Schritt 1: TSX-Datei erstellen
```
src/pages/MeinArtikelName.tsx
```
- Vollständiger Artikelinhalt als React-Komponente
- Mit SEOHead, Schema.org Markup, Autor-Bio
- Alle Inhalte statisch im Code (nicht dynamisch geladen!)

#### Schritt 2: Route in App.tsx hinzufügen
```typescript
import MeinArtikelName from "./pages/MeinArtikelName";
// ...
<Route path="/wissen/mein-artikel-slug" element={<MeinArtikelName />} />
```

#### Schritt 3: Eintrag in Wissen.tsx hinzufügen
```typescript
// In staticKnowledgeTopics Array:
{
  title: "Mein Artikel Titel",
  description: "Kurze Beschreibung...",
  link: "/wissen/mein-artikel-slug",
  badge: "Kategorie",
  icon: "📝",
  readTime: "X Minuten",
  lastUpdated: "DD. Mon. YYYY",
  publishDate: "YYYY-MM-DD"  // Für Sortierung!
}
```

#### Schritt 4: Eintrag in EditorialCalendar.tsx hinzufügen
```typescript
// In DEFAULT_STATIC_ARTICLES Array:
{
  id: "mein-artikel-slug",
  title: "Mein Artikel Titel",
  description: "Kurze Beschreibung...",
  link: "/wissen/mein-artikel-slug",
  badge: "Kategorie",
  icon: "📝",
  readTime: "X Minuten",
  lastUpdated: "DD. Mon. YYYY",
  publishDate: "YYYY-MM-DD",
  publishTime: "09:00",
  isPublished: false,  // ← IMMER als Draft starten!
  isStatic: true
}
```

### Redaktionstool-Nutzung
Das Redaktionstool (`/admin`) dient **AUSSCHLIESSLICH** zur:
- Verwaltung der **Launch-Daten** (Veröffentlichungsdatum & Uhrzeit)

**Alles andere (Content, Metadaten, etc.) wird im Code verwaltet!**

### ❌ JSON-Drafts sind NICHT für Produktion
Die JSON-Dateien in `/public/content/drafts/` sind nur für:
- Temporäre Entwürfe während der Entwicklung
- Preview vor TSX-Konvertierung

Sie werden NIEMALS auf der Live-Seite angezeigt, da sie nicht SEO-indexierbar sind.

---

### ⚠️ VERBINDLICHE URL-Regeln (SEO-kritisch!)

Diese Regeln verhindern Canonical-Mismatches und sind **nicht verhandelbar**:

#### SLUG-Format
```typescript
// ✅ RICHTIG: Nur der Slug-Teil, OHNE Pfad-Prefix
const SLUG = "mein-artikel-slug";

// ❌ FALSCH: Niemals Pfad in SLUG einbauen!
const SLUG = "wissen/mein-artikel-slug";
```

#### pageUrl-Konstruktion
```typescript
// ✅ RICHTIG: Immer mit /wissen/ Prefix konstruieren
const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;

// ❌ FALSCH: Ohne /wissen/
const pageUrl = `https://copilotenschule.de/${SLUG}`;
```

#### canonicalUrl: IMMER {pageUrl} Variable verwenden
```typescript
// ✅ RICHTIG: Variable verwenden
<SEOHead canonicalUrl={pageUrl} ... />

// ❌ FALSCH: Hardcoded String
<SEOHead canonicalUrl="https://copilotenschule.de/wissen/mein-slug" ... />
```

#### Breadcrumb-Href: IMMER /wissen/${SLUG}
```typescript
// ✅ RICHTIG:
breadcrumbs={[
  { label: "Wissen", href: "/wissen" },
  { label: PAGE_TITLE, href: `/wissen/${SLUG}` }
]}

// ❌ FALSCH:
{ label: PAGE_TITLE, href: `/${SLUG}` }
```

#### Schritt 1 Template: TSX-Datei Kopf (verbindlich!)
Jede neue Wissensartikel-TSX muss exakt dieses Muster im Kopf verwenden:
```typescript
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "mein-artikel-slug";            // ← NUR slug, OHNE "wissen/"
const PAGE_TITLE = "Mein Artikel Titel";

const MeinArtikel = () => {
  const author = getAuthor("martin-lang");
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);
  // ...
  return (
    <>
      <SEOHead
        canonicalUrl={pageUrl}           // ← IMMER Variable, nie hardcoded!
        // ...
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/wissen/${SLUG}` }  // ← IMMER /wissen/
        ]}
        // ...
      >
```

#### Schritt 5 (NEU!): react-snap include-Liste aktualisieren
Bei JEDEM neuen Artikel muss `/wissen/mein-slug` zur `reactSnap.include` Liste in `package.json` hinzugefügt werden! Ohne diesen Eintrag wird die Seite NICHT pre-gerendert und hat keine SEO-Meta-Tags im initialen HTML.

#### Automatische Validierung
Beim Build läuft `scripts/validate-seo.js` und prüft automatisch:
- Alle SLUGs sind clean (kein `/wissen/` Prefix)
- Alle canonicalUrl nutzen `{pageUrl}` Variable
- Alle Breadcrumb-Hrefs haben `/wissen/` Prefix
- Alle Routen in App.tsx sind unter `/wissen/`
- Alle Seiten in react-snap include-Liste vorhanden
Bei Fehlern bricht der Build ab!

---

### Pflichtfelder für jeden Wissensartikel
Jeder neue Wissensartikel MUSS folgende Felder haben:
- `title` - Aussagekräftiger Titel (SEO-optimiert)
- `description` - Meta-Description (max. 160 Zeichen)
- `slug` - URL-freundlicher Slug (**ohne** `wissen/` Prefix!)
- `keywords` - Array mit relevanten Keywords
- `category` - Kategorie (z.B. "Microsoft 365 Copilot", "GitHub Copilot")
- `author` - Autor-ID (Standard: "martin-lang")
- `publishDate` - ISO-Datum der Veröffentlichung
- `readTime` - Geschätzte Lesezeit

### Schema.org Markup (automatisch)
Das System generiert automatisch:
1. **Article-Schema** mit `headline`, `description`, `datePublished`, `dateModified`
2. **Person-Schema** für den Autor mit `name`, `jobTitle`, `qualifications`, `sameAs`
3. **Organization-Schema** für den Publisher (copilotenschule.de)

Die Verknüpfung erfolgt über:
- `author` → Person-Schema via `@id`
- `publisher` → Organization-Schema via `@id`

### Autoren-Profile (`/src/data/authors.ts`)
Jeder Autor benötigt:
- `id` - Eindeutige ID (z.B. "martin-lang")
- `name` - Vollständiger Name
- `role` - Rolle/Position
- `expertise` - Array mit Fachgebieten
- `qualifications` - Array mit Qualifikationen/Zertifizierungen
- `bio` - Kurze Biografie
- `image` - Pfad zum Profilbild
- `sameAs` - Array mit verifizierten Profil-URLs (LinkedIn, etc.)

### E-E-A-T Optimierung
Für Google E-E-A-T (Experience, Expertise, Authoritativeness, Trust):
1. Jeder Artikel hat einen Autor mit vollständigem Profil
2. Qualifikationen und Expertise werden im Schema hinterlegt
3. `sameAs`-Links verweisen auf verifizierte externe Profile
4. Autor-Bio wird am Ende des Artikels angezeigt

### Beispiel: Neuen Artikel anlegen
```typescript
// In /src/utils/publishedArticles.ts
{
  slug: "mein-artikel-slug",
  title: "Mein Artikel Titel",
  description: "Kurze Beschreibung für SEO...",
  keywords: ["Keyword1", "Keyword2"],
  category: "Microsoft 365 Copilot",
  author: "martin-lang", // ← Muss in authors.ts existieren
  publishDate: "2025-02-01",
  readTime: "5 Min.",
  content: "..."
}
```

---
## FAQs: Kundenorientierte Perspektive (KRITISCH)

**Jede neue Seite MUSS kundenorientierte FAQs enthalten.**

FAQs werden NICHT aus Produkt-Perspektive geschrieben ("Was kostet X?", "Welche Features hat Y?"), sondern aus der **Perspektive von Entscheidungsträgern**, die einem LLM Fragen stellen, wenn sie nach Lösungen suchen.

### FAQ-Formel
1. **Frage** = Echtes Problem/Herausforderung eines Verantwortlichen für Copilot-Einführung
2. **Antwort** = Lösung + Verweis auf Copilotenschule als Ressource

### Beispiele

**❌ FALSCH:** "Was kostet Microsoft Copilot?"
**✅ RICHTIG:** "Wie überzeuge ich das Management, in Microsoft Copilot zu investieren?"

**❌ FALSCH:** "Welche Sprachen unterstützt GitHub Copilot?"
**✅ RICHTIG:** "Unsere Entwickler sind mit GitHub Copilot unzufrieden – wie können wir das verbessern?"

### Typische Frage-Muster
- "Warum [Problem] – was können wir tun?"
- "Wie überzeuge ich [Stakeholder] von [Entscheidung]?"
- "Unsere [Situation ist unbefriedigend] – was machen wir falsch?"
- "Wie messen wir den Erfolg von [Tool/Initiative]?"

### Jede Antwort MUSS
1. Das Problem adressieren
2. Konkrete Lösung/Handlungsempfehlung geben
3. **Die Copilotenschule als Ressource referenzieren** (Training, Workshop, Beratung)

→ Detaillierte Guidelines: `/scripts/content-generator-guidelines.md`
