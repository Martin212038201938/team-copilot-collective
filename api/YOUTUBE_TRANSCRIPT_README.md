# YouTube Transcript API

Stabile Lösung für das Abrufen von YouTube-Transkripten basierend auf den Best Practices von 2025.

## 🎯 Übersicht

Diese Implementierung verwendet das [`youtube-transcript`](https://www.npmjs.com/package/youtube-transcript) npm-Package, das als **zuverlässigste Methode für 2025** gilt.

### Warum diese Lösung?

Nach ausführlicher Recherche (Januar 2025) hat sich gezeigt:
- ✅ Die `youtube-transcript` npm-Library ist die stabilste Lösung
- ✅ Verwendet YouTubes inoffizielle aber robuste API
- ✅ Unterstützt Sprachpräferenzen (Deutsch → Englisch → beliebig)
- ✅ Automatische Fallbacks bei fehlenden Untertiteln

**Quellen:**
- [How to scrape YouTube transcripts with node.js in 2025](https://scrapecreators.com/blog/how-to-scrape-youtube-transcripts-with-node-js-in-2025)
- [youtube-transcript npm package](https://www.npmjs.com/package/youtube-transcript)
- [Extract YouTube Transcripts Using Innertube API](https://medium.com/@aqib-2/extract-youtube-transcripts-using-innertube-api-2025-javascript-guide-dc417b762f49)

## 🚀 Verwendung

### Entwicklung (lokal)

1. **Starte den Transcript-Server:**
   ```bash
   npm run dev:transcript
   ```
   Der Server läuft auf `http://localhost:3001`

2. **Starte den Haupt-Dev-Server (in einem separaten Terminal):**
   ```bash
   npm run dev
   ```

3. **Verwende die YouTube-URL-Eingabe im Admin-Dashboard:**
   - Gehe zu `/admin`
   - Öffne den Content Generator
   - Gib eine YouTube-URL ein
   - Das System lädt automatisch das Transkript

### CLI-Verwendung

Du kannst das Script auch direkt aufrufen:

```bash
# Transkript für ein Video abrufen
node api/youtube-transcript.js "https://www.youtube.com/watch?v=VIDEO_ID"

# Server starten
node api/youtube-transcript.js --server

# Hilfe anzeigen
node api/youtube-transcript.js --help
```

### API-Endpunkt

**POST** `http://localhost:3001/transcript`

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response (Erfolg):**
```json
{
  "success": true,
  "videoId": "VIDEO_ID",
  "transcript": "[00:00] Text mit Zeitstempel...\n[00:15] Weiterer Text...",
  "transcriptPlain": "Text ohne Zeitstempel...",
  "language": "de"
}
```

**Response (Fehler):**
```json
{
  "success": false,
  "error": "Fehlerbeschreibung",
  "debug": "Detaillierte Fehlerinformationen"
}
```

## 🔧 Technische Details

### Sprachpräferenzen

Das System versucht Transkripte in dieser Reihenfolge abzurufen:
1. Deutsch (`de`)
2. Englisch (`en`)
3. Beliebige verfügbare Sprache

### Zeitstempel-Format

Transkripte werden mit Zeitstempeln formatiert:
```
[MM:SS] Text
[00:00] Willkommen zum Video
[00:15] Heute sprechen wir über...
[01:30] Ein wichtiger Punkt ist...
```

### Fehlerbehandlung

- **Keine Untertitel verfügbar:** Das Video hat keine Untertitel aktiviert
- **Netzwerkfehler:** Server nicht erreichbar (starte `npm run dev:transcript`)
- **Ungültige URL:** YouTube-URL konnte nicht geparst werden

## 🌐 Production Deployment

### Option 1: Node.js Server (empfohlen)

Deploye den Transcript-Server als separaten Service:

```bash
# Als Daemon/Service laufen lassen
pm2 start api/youtube-transcript.js --name "transcript-api" -- --server
```

### Option 2: PHP Fallback

Die PHP-Implementierung (`api/fetch-youtube-transcript.php`) bleibt als Fallback verfügbar, ist aber weniger stabil.

### Option 3: Serverless Function

Deploy als Vercel/Netlify Function:

```javascript
// api/transcript.js (Vercel Function)
import { fetchTranscript } from './youtube-transcript.js';

export default async function handler(req, res) {
  const { url } = req.body;
  const result = await fetchTranscript(url);
  res.json(result);
}
```

## 📦 Abhängigkeiten

- `youtube-transcript@^1.2.1` - Haupt-Bibliothek für Transkript-Abruf
- Node.js >= 18.0.0 (empfohlen)

## 🛠️ Troubleshooting

### "Konnte Transcript-Server nicht erreichen"

**Problem:** Der Node.js Server läuft nicht.

**Lösung:**
```bash
npm run dev:transcript
```

### "Keine Untertitel für dieses Video verfügbar"

**Problem:** Das Video hat keine Untertitel/CC aktiviert.

**Lösung:**
- Wähle ein anderes Video mit Untertiteln
- Oder lade das Transkript manuell hoch

### Port 3001 bereits in Verwendung

**Problem:** Ein anderer Prozess verwendet Port 3001.

**Lösung:** Ändere den Port in `api/youtube-transcript.js` (Zeile mit `startServer(3001)`)

## 📝 Lizenz

Basiert auf [`youtube-transcript`](https://www.npmjs.com/package/youtube-transcript) - MIT License
