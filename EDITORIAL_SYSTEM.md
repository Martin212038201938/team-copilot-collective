# Redaktionssystem für automatische Artikel-Veröffentlichung

## Übersicht

Dieses System ermöglicht die automatische Veröffentlichung von vorbereiteten Wissen-Artikeln zu festgelegten Zeitpunkten. Jeden **Dienstag um 9:00 Uhr** werden geplante Artikel automatisch als eigene Seiten veröffentlicht und auf der Wissens-Übersichtsseite angezeigt.

## Features

✅ **Admin-Dashboard** - Verwalten und Bearbeiten von Draft-Artikeln unter `/admin`
✅ **Automatische Veröffentlichung** - Jeden Dienstag um 9:00 Uhr via GitHub Actions
✅ **Markdown-Support** - Artikel können in Markdown verfasst werden
✅ **Code-Upload** - Fertige TSX/JSX-Komponenten direkt hochladen
✅ **SEO-Optimierung** - Automatische Generierung von Meta-Tags und Schema.org Markup
✅ **Vorschau-Funktion** - Live-Preview der Artikel vor Veröffentlichung
✅ **Git-basiert** - Alle Drafts werden versioniert und sind nachvollziehbar

## Architektur

```
content/drafts/           # Draft-Artikel als JSON-Dateien
├── copilot-sicherheit.json
├── copilot-tipps-tricks.json
└── ...

src/pages/Admin.tsx       # Admin-Dashboard
src/components/DraftEditor.tsx  # Editor-Komponente
src/types/draft.ts        # TypeScript-Typen

scripts/publish-articles.js     # Publishing-Script
.github/workflows/auto-publish.yml  # GitHub Action
```

## Verwendung

### 1. Admin-Dashboard aufrufen

Navigieren Sie zu `/admin`, um alle Draft-Artikel zu sehen und zu bearbeiten.

Das Dashboard zeigt:
- **Alle Entwürfe** mit Status (Entwurf, Geplant, Veröffentlicht)
- **Statistiken** (Anzahl Drafts, geplante Artikel, nächste Veröffentlichung)
- **Filter** nach Status
- **Bearbeitungsfunktionen** (Bearbeiten, Vorschau, Löschen)

### 2. Neuen Draft-Artikel erstellen

Erstellen Sie eine neue JSON-Datei in `content/drafts/`:

```json
{
  "id": "artikel-slug",
  "title": "Ihr Artikeltitel",
  "description": "Kurze Beschreibung des Artikels",
  "content": "# Überschrift\n\nIhr Markdown-Inhalt...",
  "publishDate": "2025-11-11T09:00:00.000Z",
  "author": "martin-lang",
  "category": "Kategorie",
  "slug": "artikel-url-slug",
  "keywords": ["Keyword1", "Keyword2"],
  "readTime": "8 Minuten",
  "icon": "📚",
  "status": "scheduled",
  "createdAt": "2025-11-07T10:00:00.000Z",
  "updatedAt": "2025-11-07T10:00:00.000Z"
}
```

**Wichtige Felder:**

- `id`: Eindeutige ID (wird für Dateinamen verwendet)
- `slug`: URL-Slug (der Artikel erscheint unter `/wissen/{slug}`)
- `publishDate`: Zeitpunkt der Veröffentlichung (ISO 8601 Format)
- `status`: `draft`, `scheduled` oder `published`
- `content`: Markdown-Inhalt des Artikels

### 3. Draft im Admin bearbeiten

1. Öffnen Sie `/admin`
2. Klicken Sie auf "Bearbeiten" beim gewünschten Artikel
3. Bearbeiten Sie in den Tabs:
   - **Inhalt**: Titel, Beschreibung, Markdown-Content
   - **Metadaten**: Datum, Status, Kategorie, Keywords, etc.
   - **Vorschau**: Live-Preview des Artikels
4. Speichern Sie die Änderungen

**Hinweis:** Aktuell ist das Speichern nur im Browser-State. Für Produktions-Einsatz sollte ein Backend implementiert werden, das die JSON-Dateien via Git commitet.

### 4. Automatische Veröffentlichung

Die GitHub Action `.github/workflows/auto-publish.yml` läuft:

- **Automatisch**: Jeden Dienstag um 9:00 Uhr (8:00 UTC)
- **Manuell**: Via GitHub Actions UI (workflow_dispatch)

**Ablauf:**

1. Action checkt alle Drafts in `content/drafts/`
2. Filtert Artikel mit `status: "scheduled"` und `publishDate <= jetzt`
3. Für jeden Artikel:
   - Generiert `.tsx` Seite in `src/pages/`
   - Fügt Route zu `App.tsx` hinzu
   - Fügt Artikel zu `Wissen.tsx` hinzu
   - Setzt Status auf `published`
4. Committet Änderungen
5. Triggert automatisches Deployment

### 5. Markdown-Formatierung

Unterstützte Markdown-Syntax:

```markdown
# H1 Überschrift
## H2 Überschrift
### H3 Überschrift

**Fett** und *kursiv*

- Listen
- mit Punkten

[Links](https://example.com)

\`\`\`javascript
// Code-Blöcke
const beispiel = "Code";
\`\`\`
```

### 6. Code-Upload für fertige Komponenten

Wenn Sie Ihre Wissensseite mit einem anderen Tool (z.B. AI-Generator, Code-Editor) erstellt haben, können Sie den fertigen Code direkt hochladen:

**Im Admin-Dashboard:**

1. Öffnen Sie `/admin` und wählen Sie einen Draft oder erstellen Sie einen neuen
2. Navigieren Sie zum Tab **"Code Upload"**
3. Klicken Sie auf **"Datei wählen"** oder nutzen Sie das File-Input
4. Wählen Sie Ihre TSX/JSX-Datei aus (`.tsx`, `.jsx`, `.ts`, `.js`)
5. Der Code wird automatisch hochgeladen und eine Vorschau angezeigt
6. Speichern Sie den Draft

**Unterstützte Code-Formate:**

- **Vollständige Komponenten**: Wenn Ihr Code bereits `import` und `export default` enthält, wird er 1:1 verwendet
- **JSX-Snippets**: Reines JSX ohne Imports wird automatisch in eine ContentLayout-Struktur eingebettet

**Beispiel - Vollständige Komponente:**

```tsx
import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor } from "@/data/authors";

const MeinArtikel = () => {
  const author = getAuthor("martin-lang");

  return (
    <>
      <SEOHead title="Mein Artikel" />
      <ContentLayout
        breadcrumbs={[...]}
        title="Mein Artikel"
        author={author}
      >
        {/* Ihr Content */}
      </ContentLayout>
    </>
  );
};

export default MeinArtikel;
```

**Beispiel - JSX-Snippet:**

```tsx
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">Meine Überschrift</h2>
  <p className="mb-4">Mein Text...</p>
</section>
```

**JSON-Draft mit Code:**

```json
{
  "id": "artikel-slug",
  "title": "Ihr Artikeltitel",
  "description": "Kurzbeschreibung",
  "content": "/* Ihr TSX/JSX Code hier */",
  "contentType": "code",
  "codeFileName": "MeinArtikel.tsx",
  "publishDate": "2025-11-11T09:00:00.000Z",
  "status": "scheduled",
  ...
}
```

**Wichtig:**
- Der Code wird beim Veröffentlichen direkt als `.tsx` Datei verwendet
- ContentLayout, SEOHead und andere Komponenten werden automatisch verfügbar gemacht
- Bei Bedarf können Sie zwischen Markdown und Code im Admin wechseln

## Workflow für redaktionelle Planung

### Szenario: 4 Artikel für die nächsten 4 Wochen vorbereiten

1. **Woche 1 (7. Nov)**: Erstellen Sie `content/drafts/artikel-1.json` mit `publishDate: "2025-11-11T09:00:00.000Z"`
2. **Woche 2 (14. Nov)**: Erstellen Sie `content/drafts/artikel-2.json` mit `publishDate: "2025-11-18T09:00:00.000Z"`
3. **Woche 3 (21. Nov)**: Erstellen Sie `content/drafts/artikel-3.json` mit `publishDate: "2025-11-25T09:00:00.000Z"`
4. **Woche 4 (28. Nov)**: Erstellen Sie `content/drafts/artikel-4.json` mit `publishDate: "2025-12-02T09:00:00.000Z"`

Alle Artikel haben `status: "scheduled"`.

**Ergebnis:**
- 11.11. um 9:00: Artikel 1 wird veröffentlicht
- 18.11. um 9:00: Artikel 2 wird veröffentlicht
- 25.11. um 9:00: Artikel 3 wird veröffentlicht
- 02.12. um 9:00: Artikel 4 wird veröffentlicht

**Vollautomatisch, ohne manuellen Eingriff!**

## Manuelle Veröffentlichung

Falls Sie einen Artikel sofort veröffentlichen möchten:

```bash
# Lokal ausführen
node scripts/publish-articles.js

# Änderungen committen
git add .
git commit -m "chore: Publish article manually"
git push
```

Oder in GitHub:
1. Gehen Sie zu "Actions"
2. Wählen Sie "Auto-Publish Articles"
3. Klicken Sie "Run workflow"

## Testing

### Publishing-Script testen

```bash
# Script ausführen (testet ohne zu committen)
node scripts/publish-articles.js
```

Das Script zeigt:
- Anzahl gefundener Drafts
- Welche Artikel veröffentlicht werden würden
- Generierte Seiten

### Admin-Dashboard testen

```bash
npm run dev
# Öffnen Sie http://localhost:8080/admin
```

## Beispiele

Siehe mitgelieferte Beispiel-Drafts:

- `content/drafts/copilot-sicherheit.json` - Geplant für 11.11.2025
- `content/drafts/copilot-tipps-tricks.json` - Geplant für 18.11.2025

## Erweiterungen und Anpassungen

### Veröffentlichungszeit ändern

Bearbeiten Sie `.github/workflows/auto-publish.yml`:

```yaml
schedule:
  # Jeden Freitag um 14:00 Uhr (13:00 UTC)
  - cron: '0 13 * * 5'
```

[Cron-Syntax erklärt](https://crontab.guru/)

### Mehrere Veröffentlichungen pro Woche

```yaml
schedule:
  # Dienstag und Donnerstag um 9:00 Uhr
  - cron: '0 8 * * 2,4'
```

### Eigenen Author hinzufügen

Bearbeiten Sie `src/data/authors.ts`:

```typescript
export const authors: Record<string, Author> = {
  'ihr-name': {
    id: 'ihr-name',
    name: 'Ihr Name',
    role: 'Ihre Rolle',
    // ... weitere Felder
  }
};
```

## Troubleshooting

### Artikel wird nicht veröffentlicht

**Checkliste:**
- ✅ `status` ist `"scheduled"`
- ✅ `publishDate` liegt in der Vergangenheit
- ✅ JSON-Datei ist valide (keine Syntax-Fehler)
- ✅ GitHub Action läuft erfolgreich (siehe Actions Tab)

### Admin zeigt keine Drafts

- Prüfen Sie, ob JSON-Dateien in `public/content/drafts/` existieren
- Öffnen Sie Browser DevTools und schauen Sie nach Fehlern

### Publishing-Script schlägt fehl

```bash
# Prüfen Sie die JSON-Syntax
cat content/drafts/ihr-artikel.json | jq .

# Führen Sie das Script mit Debugging aus
node scripts/publish-articles.js
```

## Sicherheit

### Admin-Zugang schützen

**Aktuell**: `/admin` ist öffentlich zugänglich.

**Empfehlung für Produktion**:

1. **Option 1**: Schützen Sie `/admin` mit `.htaccess` auf dem Server:
   ```apache
   <Location "/admin">
     AuthType Basic
     AuthName "Admin Area"
     AuthUserFile /path/to/.htpasswd
     Require valid-user
   </Location>
   ```

2. **Option 2**: Implementieren Sie eine Login-Komponente mit Passwort-Schutz

3. **Option 3**: Hosten Sie das Admin-Dashboard separat (z.B. auf einem geschützten Staging-Server)

## Backup und Versionierung

Alle Drafts sind Git-versioniert:

```bash
# Änderungshistorie eines Drafts ansehen
git log -- content/drafts/artikel.json

# Alten Stand wiederherstellen
git checkout COMMIT_HASH -- content/drafts/artikel.json
```

## Best Practices

1. **Artikel frühzeitig vorbereiten** - Erstellen Sie Drafts mindestens 1 Woche im Voraus
2. **Konsistente Namensgebung** - Verwenden Sie kebab-case für IDs und Slugs
3. **SEO-Keywords recherchieren** - Nutzen Sie relevante Keywords für besseres Ranking
4. **Inhaltsverzeichnis** - Strukturieren Sie Artikel mit klaren H2/H3 Überschriften
5. **Regelmäßige Backups** - Git-Repository regelmäßig sichern

## Roadmap / Mögliche Erweiterungen

- [x] Code-Upload für fertige TSX/JSX-Komponenten
- [ ] Backend-API für echtes Speichern aus dem Admin
- [ ] Bildupload für Artikel
- [ ] Draft-Review-Workflow (Entwurf → Review → Freigabe → Geplant)
- [ ] E-Mail-Benachrichtigung bei Veröffentlichung
- [ ] Analytics-Integration (Tracking der Artikelaufrufe)
- [ ] Multi-Language-Support
- [ ] Kategorien-Verwaltung
- [ ] Tag-System

## Support

Bei Fragen oder Problemen:
1. Prüfen Sie diese Dokumentation
2. Schauen Sie in die GitHub Actions Logs
3. Testen Sie das Publishing-Script lokal

---

**Viel Erfolg mit Ihrem automatischen Redaktionssystem! 🚀**
