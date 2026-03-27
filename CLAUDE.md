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

#### Schritt 3: Eintrag in articles.ts hinzufügen
Neuen Eintrag am **Anfang** des `ALL_ARTICLES` Arrays in `/src/data/articles.ts` (neueste zuerst):
```typescript
{
  id: "mein-artikel-slug",
  title: "Mein Artikel Titel",
  description: "Kurze Beschreibung max 160 Zeichen",
  link: "/wissen/mein-artikel-slug",
  badge: "Kategorie",
  icon: "§",
  lastUpdated: "DD. Mon. YYYY",
  publishDate: "YYYY-MM-DD",
  publishTime: "09:00"
}
```

**HINWEIS:** `articles.ts` ist die einzige Stelle, an der Artikel-Metadaten registriert werden. Wissen.tsx und EditorialCalendar.tsx lesen beide aus `ALL_ARTICLES`. Es gibt KEIN separates `staticKnowledgeTopics`-Array in Wissen.tsx und KEIN `DEFAULT_STATIC_ARTICLES`-Array in EditorialCalendar.tsx mehr. Kein `isDraft`-Feld verwenden – das Redaktionssystem ist nicht aktiv.

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

#### IndexNow: Bing sofort über Änderungen informieren

Nach jedem Deployment von neuen oder geänderten Seiten **MUSS** ein IndexNow-Ping gesendet werden, damit Bing die Änderungen innerhalb von Minuten statt Tagen crawlt.

**IndexNow-Key:** `02184b6b954d4a158c75668dbf809161`
**Key-Datei:** `public/02184b6b954d4a158c75668dbf809161.txt` (wird als statische Datei ausgeliefert dank `.htaccess`-Regel)

**Ping senden (curl):**
```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "copilotenschule.de",
    "key": "02184b6b954d4a158c75668dbf809161",
    "keyLocation": "https://copilotenschule.de/02184b6b954d4a158c75668dbf809161.txt",
    "urlList": [
      "https://copilotenschule.de/wissen/mein-neuer-artikel"
    ]
  }'
```

**Erwartete Antwort:** HTTP 202 Accepted = Erfolgreich
**Wann verwenden:**
- Nach jedem neuen Wissensartikel
- Nach SEO-relevanten Änderungen (Meta-Tags, H1, Canonical URLs, etc.)
- Nach Content-Updates auf bestehenden Seiten
- Auch die Hauptseiten (`/`, `/unsere-angebote`, `/ueber-uns`, `/wissen`, etc.) bei strukturellen Änderungen

**Hinweis:** IndexNow informiert automatisch Bing, Yandex und andere teilnehmende Suchmaschinen. Google nutzt IndexNow aktuell nicht – dort über Google Search Console einreichen.

### Automatische Validierung
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

## ContentLayout-Regeln für Wissensartikel (verbindlich)

### Keine Lesezeit
- Übergib KEINE `readTime`-Prop an ContentLayout.
- Trage KEIN `readTime`-Feld in articles.ts ein.
- Die Lesezeit wird auf keiner Wissensseite angezeigt.

### authorName-Prop (Pflicht)
- Übergib immer `authorName="Martin Lang"` (oder den jeweiligen Autorennamen) an ContentLayout.
- ContentLayout zeigt dann automatisch die "Echter Fachartikel"-Box im Sidebar an.

### Fragen-Kästchen (zentral gesteuert)
- Der Fragen-Text im Sidebar lautet: "Kritik? Kommentare? Wir sprechen sehr gerne persönlich mit Ihnen über dieses Thema und freuen uns über jede Kontaktaufnahme."
- Dieser Text ist zentral in ContentLayout.tsx definiert und muss NICHT in den einzelnen Artikeln gesetzt werden.

### CSS-Abstände in Wissensartikeln (verbindlich)
- H2-Überschriften: `className="text-2xl md:text-3xl font-bold mb-2"` – KEINE border-bottom, KEINE farbigen Linien.
- Sections: `className="mb-4 mt-2"` – kompakte Abstände. Nicht mb-6 oder größer. Der Artikel soll zusammenhängend wirken, keine großen Lücken zwischen Abschnitten.
- Einleitung nach Schnellantwort: `className="prose prose-lg max-w-none dark:prose-invert mb-4"`.
- Keine Italic-Untertitel unter H2-Überschriften.

---
## Website-Clone & Rebranding (End-to-End)

Wenn eine Kopie dieser Seite unter einer neuen Domain mit neuem Thema veröffentlicht werden soll, gelten folgende Regeln. Detailliertes Runbook: `skills/website-clone-runbook/RUNBOOK.md`

### Optimale Reihenfolge
```
1.  Repo erstellen + Clone + Remote konfigurieren
2.  deploy.yml anpassen (lftp, neue Secrets)
3.  Domain-Setup (AlwaysData + IONOS) ← 7 Schritte!
4.  Logo erstellen (wird an 5+ Stellen referenziert)
5.  Typ-System anpassen (trainings.ts Types ZUERST)
6.  Trainingsdaten komplett umschreiben
7.  Wissensartikel ALLE löschen + an 5 Stellen deregistrieren
8.  Schema.org + SEO-Metadaten (grep nach alter Domain)
9.  Seiten mit einzigartigem Content neu schreiben
10. Global grep: Restliche Referenzen zur alten Domain
11. npm run build → Fehler fixen
12. Git commit + Push + Live-Test
```

### ⚠️ Content-Differenzierung ist 60% der Arbeit
Es gibt KEINE "quick find-and-replace" Lösung. Jede sichtbare Seite muss inhaltlich eigenständig werden, sonst bestraft Google beide Seiten wegen Duplicate Content.

**Komplett neu schreiben:** Hero.tsx, BecomeTrainer.tsx, TrainingKonfigurator.tsx, trainings.ts, faqs.ts
**Anpassen reicht:** Benefits.tsx, Footer, Impressum, Datenschutz

### Wissensartikel beim Clone
Alle Wissensartikel der Quell-Seite MÜSSEN gelöscht werden (themenspezifisch, nicht übertragbar). Artikel sind an **5 Stellen** registriert – ALLE bereinigen:
1. TSX-Datei in `/src/pages/`
2. Route in `App.tsx`
3. Eintrag in `Wissen.tsx` (`staticKnowledgeTopics`)
4. Eintrag in `EditorialCalendar.tsx` (`DEFAULT_STATIC_ARTICLES`)
5. Eintrag in `package.json` (`reactSnap.include`)

### Typ-System anpassen
Das Typ-System in `trainings.ts` ZUERST ändern. Reihenfolge: **Types → Data → Components → Pages**. Beispiel: `CopilotTier` → `ChatGPTTier` mit eigenen Werten.

### Domain-Referenzen finden
```bash
grep -r "copilotenschule" src/
```
Betroffene Dateien (mindestens):
- `src/lib/schema.ts` – Organization-Schema
- `src/lib/organizationSchema.ts` – Komplett-Daten
- `src/data/authors.ts` – Autor-Profil
- `src/components/SEOHead.tsx` – OG-Image, Site-Name
- `public/sitemap.xml` – Alle URLs
- `public/robots.txt` – Sitemap-URL
- `public/llm.txt` + `public/llms.txt`
- `index.html` – Title, Meta-Tags, OG-Tags

### Logo-Referenzen (mindestens 5 Stellen)
- `public/images/[logo].png`
- `index.html` – Favicon/OG-Image
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/lib/organizationSchema.ts` – Logo-URL

### Deployment: lftp statt FTP-Deploy-Action
Für AlwaysData IMMER `lftp` verwenden (SamKirkland FTP-Deploy-Action hat ECONNRESET):
```yaml
- name: Deploy via LFTP
  run: |
    lftp -e "set ssl:verify-certificate no; set ftp:ssl-allow yes; set ftp:ssl-protect-data yes; mirror -R --delete dist/ /www/[DOMAIN]/ ; quit" -u ${{ secrets.FTP_USERNAME }},${{ secrets.FTP_PASSWORD }} ${{ secrets.FTP_SERVER }}
```

### Build-Validierung (PFLICHT vor Commit)
`npm run build` fängt ab: fehlende Imports, TypeScript-Fehler, react-snap-Fehler, validate-seo.js-Fehler.
