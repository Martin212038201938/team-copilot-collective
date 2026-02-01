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

### Pflichtfelder für jeden Wissensartikel
Jeder neue Wissensartikel MUSS folgende Felder haben:
- `title` - Aussagekräftiger Titel (SEO-optimiert)
- `description` - Meta-Description (max. 160 Zeichen)
- `slug` - URL-freundlicher Slug
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
