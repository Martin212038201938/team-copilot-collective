# OpenAI API Setup für Wissensseiten-Generator

## 🚨 WICHTIG: Sicherheitshinweis

Der OpenAI API Key in `.env.local` **muss sofort geändert werden**!

Der Key in diesem Commit wurde öffentlich gepostet und sollte **NIEMALS** in Git committed oder öffentlich geteilt werden.

## So richtest du einen neuen API Key ein:

### 1. Alten Key widerrufen
1. Gehe zu https://platform.openai.com/api-keys
2. Melde dich mit deinem OpenAI Account an
3. Finde den Key der mit `sk-proj-MGB8VimG...` beginnt
4. Klicke auf "Revoke" um ihn zu deaktivieren

### 2. Neuen Key erstellen
1. In der API Keys Übersicht klicke auf "Create new secret key"
2. Gib dem Key einen Namen (z.B. "copilotenschule-generator")
3. Kopiere den Key (er wird nur einmal angezeigt!)

### 3. Key in .env.local eintragen
1. Öffne die Datei `.env.local` im Projekt-Root
2. Ersetze den alten Key mit deinem neuen:
   ```
   VITE_OPENAI_API_KEY=sk-proj-DEIN_NEUER_KEY_HIER
   ```
3. Speichern

### 4. Dev-Server neu starten
```bash
npm run dev
```

## ✅ Wie der Generator funktioniert

Der Wissensseiten-Generator läuft in 7 Schritten:

1. **Transkript eingeben** - YouTube-Transkript oder Text hochladen
2. **Kernthemen extrahieren** - System analysiert automatisch relevante Themen
3. **Fokus wählen** - Hauptthema für den Artikel auswählen
4. **Metadaten generieren** - Titel, Slug, Keywords werden automatisch erstellt
5. **Content generieren** - OpenAI GPT-4o erstellt einen vollständigen Artikel (1800-2500 Wörter)
6. **Content überarbeiten** - Du kannst den AI-generierten Content anpassen
7. **Finale Seite erstellen** - OpenAI generiert die TSX-Komponente mit KnowledgePageTemplate

## 🔒 Sicherheit

- ✅ `.env.local` ist in `.gitignore` und wird **nicht** committed
- ✅ Der API Key wird nur im Frontend geladen und für direkte API-Calls verwendet
- ⚠️ **WICHTIG**: Der Key ist im Browser sichtbar! Für Produktion sollte ein Backend-Proxy verwendet werden

### Produktions-Empfehlung (optional):

Für erhöhte Sicherheit erstelle einen Backend-Endpoint:

```typescript
// backend/api/generate-content.ts
export async function POST(request: Request) {
  const { transcript, topic } = await request.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Server-side!
    },
    body: JSON.stringify({
      // ... OpenAI API Call
    })
  });

  return response.json();
}
```

Dann kannst du im Frontend statt direkt zu OpenAI zu deinem Backend:
```typescript
const response = await fetch('/api/generate-content', {
  method: 'POST',
  body: JSON.stringify({ transcript, topic })
});
```

## 💰 Kosten

Die Verwendung der OpenAI API kostet Geld. Ungefähre Kosten pro Wissensseite:

- **Content-Generierung** (4500 tokens): ~$0.01-0.03
- **TSX-Code-Generierung** (8000 tokens): ~$0.02-0.05
- **Pro Seite gesamt**: ~$0.03-0.08

Mit 10€ Guthaben kannst du ca. 100-300 Wissensseiten erstellen.

Überwache deine Nutzung: https://platform.openai.com/usage

## 📝 Weitere Infos

- Dokumentation: https://platform.openai.com/docs
- API Reference: https://platform.openai.com/docs/api-reference
- Pricing: https://openai.com/pricing
