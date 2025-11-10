# Transkripte für Content Generator

Dieses Verzeichnis enthält Transkripte von Videos oder Texten, die in Wissensseiten umgewandelt werden sollen.

## 📋 Format-Richtlinien

### Empfohlenes Format

```
[Video-Titel oder Thema]
[Datum/Quelle]
[Länge: XX Minuten]

## Zusammenfassung
Kurze Zusammenfassung des Inhalts (2-3 Sätze)

## Transkript

[Transkript-Text hier]

## Wichtige Punkte
- Punkt 1
- Punkt 2
- Punkt 3

## Zielgruppe
[Beschreibung der Zielgruppe]

## Keywords
- Keyword 1
- Keyword 2
- Keyword 3
```

## ✅ Best Practices

### Do's

- ✅ Strukturiertes Format mit Überschriften
- ✅ Technische Begriffe korrekt schreiben
- ✅ Wichtige Punkte hervorheben
- ✅ Zielgruppe definieren
- ✅ Keywords identifizieren
- ✅ Zeitstempel für wichtige Stellen (optional)

### Don'ts

- ❌ Komplett unstrukturierter Text
- ❌ Viele Füllwörter ("ähm", "also", etc.)
- ❌ Rechtschreibfehler in Fachbegriffen
- ❌ Unklare oder mehrdeutige Aussagen

## 🎬 Von YouTube zu Transkript

### Option 1: Automatisch mit Whisper (empfohlen)

```bash
# 1. Video herunterladen
yt-dlp -f "bestaudio" -o "video.%(ext)s" [YOUTUBE_URL]

# 2. Mit OpenAI Whisper transkribieren
whisper video.m4a --model medium --language de --output_format txt
```

### Option 2: YouTube Auto-Captions

1. Öffne Video auf YouTube
2. Klicke auf "..." → "Transkript anzeigen"
3. Kopiere Transkript
4. Bereinige Formatierung

### Option 3: Manuelle Transkription

Für bessere Qualität empfehlen wir manuelle Transkription oder Überarbeitung von Auto-Transkripten.

## 📁 Dateinamen-Konventionen

```
[thema]-[datum].txt

Beispiele:
- copilot-memory-features-2024-11.txt
- teams-collaboration-guide-2024-11.txt
- agents-tutorial-advanced-2024-11.txt
```

## 🔍 Beispiel-Transkript

Siehe `example-transcript.txt` in diesem Verzeichnis für ein vollständiges Beispiel.

## 🤖 Verwendung mit Content Generator

```bash
# Interaktiv
npm run generate:interactive

# Direkt mit Datei
npm run generate transcripts/mein-transkript.txt

# Mit zusätzlichen Anweisungen
npm run generate transcripts/mein-transkript.txt "Fokus auf Enterprise Features"
```

## 📊 Qualitäts-Checkliste

Vor der Generierung prüfen:

- [ ] Transkript ist vollständig
- [ ] Struktur ist klar (Überschriften, Absätze)
- [ ] Technische Begriffe sind korrekt
- [ ] Füllwörter sind entfernt
- [ ] Wichtige Punkte sind markiert
- [ ] Zielgruppe ist definiert
- [ ] Keywords sind identifiziert
- [ ] Rechtschreibung ist geprüft

## 💡 Tipps

### Für bessere Ergebnisse

1. **Kontext geben**: Füge eine kurze Einleitung hinzu, was das Video behandelt
2. **Struktur**: Teile das Transkript in logische Abschnitte
3. **Highlights**: Markiere besonders wichtige Aussagen
4. **Beispiele**: Hebe konkrete Beispiele hervor
5. **Zitate**: Markiere wörtliche Zitate von Experten

### Zusätzliche Anweisungen

Nutze den Parameter "Zusätzliche Anweisungen" für:

- Fokus auf bestimmte Themen
- Zielgruppen-Spezifikation
- Tonalität (technisch, einsteiger-freundlich, etc.)
- Besondere Anforderungen (z.B. "Viele Code-Beispiele")

---

**Happy Transcribing! 🎤**
