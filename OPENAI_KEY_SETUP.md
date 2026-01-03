# 🔐 OpenAI API-Key: Sichere Einrichtung

## ✅ Problem gelöst!

Der OpenAI API-Key wird jetzt **dauerhaft und sicher** gespeichert. Sie müssen ihn **NIEMALS** mehr manuell eingeben.

---

## 📋 Was wurde implementiert?

### 1. **Lokale Entwicklung** (CLI-Tool)

✅ **`.env.local` Datei erstellt**
- Enthält den OpenAI API-Key
- Wird automatisch von `scripts/generate-content.js` geladen
- Ist in `.gitignore` → wird **NIE** zu Git committed
- Bleibt lokal auf Ihrem Rechner

**Speicherort:** `/team-copilot-collective/.env.local`

### 2. **Server-Deployment** (AlwaysData)

✅ **Backend-API erstellt**: `/api/config.php`
- Liest API-Key aus Server-Umgebungsvariablen
- Fallback: Liest aus `.env.local`
- **Sicher**: Key wird NIEMALS an Browser gesendet

✅ **Content-Generator-API**: `/api/generate-content-api.php`
- Web-basierte Content-Generierung
- Nutzt server-seitigen API-Key
- Rate-Limiting: Max 10 Requests/Stunde
- Sichere CORS-Konfiguration

---

## 🎯 Verwendetes OpenAI-Modell

### **gpt-4.1-2025-04-14** - Das beste Modell für professionelle Content-Generierung

Dieses Projekt nutzt **`gpt-4.1-2025-04-14`**, die neueste Version von OpenAI's GPT-4o Modell mit speziell verbesserter Schreibqualität.

#### Warum gpt-4.1-2025-04-14?

1. **Verbesserte kreative Schreibfähigkeit**
   - OpenAI: "Creative writing ability has leveled up – more natural, engaging, and tailored writing"
   - Optimiert für Relevanz & Lesbarkeit
   - Natürlichere, ansprechendere Texte

2. **Besser als Alternativen**
   - **GPT-4.5**: Stärkere Creative Writing, aber wird im Juli 2025 deprecated
   - **GPT-4.1**: Optimiert für Coding, nicht für kreatives Schreiben
   - **o1/o3 Modelle**: Spezialisiert auf Reasoning/STEM, nicht Content-Generierung
   - **Ältere GPT-4o Versionen**: Fehlen die verbesserten Schreibfähigkeiten

3. **Perfekt für dieses Projekt**
   - Professionelle, tiefgehende Wissensartikel
   - Technisch präzise, aber gut lesbar
   - Hohe fachliche Qualität

#### Kosten
- Input: $2.50 pro 1M Tokens
- Output: $10.00 pro 1M Tokens
- Gleicher Preis wie generisches `gpt-4o`, aber bessere Qualität

**Konfiguriert in:** `.env.local` → `OPENAI_MODEL=gpt-4.1-2025-04-14`

---

## 🚀 Verwendung

### **Option A: Lokales CLI-Tool** (Empfohlen)

Das funktioniert **sofort** ohne weitere Einrichtung:

```bash
# Content generieren
npm run generate:interactive

# Der API-Key wird automatisch aus .env.local geladen
# KEINE manuelle Eingabe mehr nötig!
```

### **Option B: Web-basierte API** (Optional)

Falls Sie Content-Generierung über die Web-UI nutzen möchten:

1. **Testen Sie die Konfiguration:**
   ```bash
   curl https://copilotenschule.de/api/config.php
   ```

   Erwartete Antwort:
   ```json
   {
     "success": true,
     "configured": true,
     "config": {
       "openai_configured": true,
       "openai_model": "gpt-4o",
       "openai_max_tokens": 24000,
       "openai_temperature": 0.6
     }
   }
   ```

---

## 🔒 Sicherheit

### ✅ Was ist sicher?

1. **`.env.local`**:
   - ✅ In `.gitignore` → wird nicht committed
   - ✅ Nur lokal auf Entwicklerrechner
   - ✅ Nie im Browser sichtbar

2. **Server-API**:
   - ✅ API-Key bleibt server-seitig
   - ✅ CORS nur für autorisierte Domains
   - ✅ Rate-Limiting gegen Missbrauch
   - ✅ Key wird nie an Client gesendet

### ❌ Was Sie NICHT tun sollten:

- ❌ `.env.local` zu Git committen (ist in `.gitignore`)
- ❌ API-Key direkt im Frontend-Code einbetten
- ❌ API-Key in öffentlichen Repositories teilen

---

## ⚙️ AlwaysData Server-Einrichtung (Optional)

Falls Sie die Web-API nutzen möchten, können Sie den Key auch als **Server-Umgebungsvariable** setzen:

### Methode 1: Via SSH

```bash
# 1. SSH-Verbindung zu AlwaysData
ssh [user]@ssh-[user].alwaysdata.net

# 2. ENV-Variable setzen
export OPENAI_API_KEY="sk-proj-..."

# 3. Persistent machen (überdauert Reboots)
echo 'export OPENAI_API_KEY="sk-proj-..."' >> ~/.bashrc
source ~/.bashrc
```

### Methode 2: Via AlwaysData Admin-Panel

1. Login: https://admin.alwaysdata.com
2. **Sites** → Ihre Website auswählen
3. **Environment** → **Environment variables**
4. Hinzufügen:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-proj-...`
5. Speichern

---

## 🧪 Testen

### Test 1: Lokales CLI-Tool

```bash
npm run generate:interactive

# Erwartetes Verhalten:
# - Kein Fehler "OPENAI_API_KEY nicht gefunden"
# - Key wird automatisch geladen
# - Content-Generierung funktioniert
```

### Test 2: Backend-API

```bash
# Konfiguration prüfen
curl https://copilotenschule.de/api/config.php

# Sollte zurückgeben:
# { "success": true, "configured": true, ... }
```

---

## 📁 Dateistruktur

```
team-copilot-collective/
├── .env.local                          ← API-Key (lokal, nicht in Git)
├── .env.example                        ← Template (ohne echten Key)
├── .gitignore                          ← .env.local ist hier gelistet
├── api/
│   ├── config.php                     ← Backend-API (liest Key sicher)
│   └── generate-content-api.php      ← Content-Generator-API
├── scripts/
│   └── generate-content.js           ← CLI-Tool (nutzt .env.local)
└── OPENAI_KEY_SETUP.md               ← Diese Anleitung
```

---

## 🆘 Troubleshooting

### Problem: "OPENAI_API_KEY nicht gefunden"

**Lösung:**
```bash
# 1. Prüfe ob .env.local existiert
ls -la .env.local

# 2. Falls nicht, erstelle sie:
cat > .env.local << 'EOF'
OPENAI_API_KEY=sk-proj-[IHR-KEY]
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=24000
OPENAI_TEMPERATURE=0.6
EOF

# 3. Teste erneut
npm run generate:interactive
```

### Problem: Web-API gibt "nicht konfiguriert" zurück

**Lösung:**
```bash
# Auf AlwaysData Server:
echo $OPENAI_API_KEY

# Falls leer:
export OPENAI_API_KEY="sk-proj-..."
echo 'export OPENAI_API_KEY="sk-proj-..."' >> ~/.bashrc
```

---

## 🔄 API-Key ändern

### Lokal (CLI-Tool):

```bash
# .env.local bearbeiten
nano .env.local

# Neue Zeile:
OPENAI_API_KEY=sk-proj-[NEUER-KEY]
```

### Server (Web-API):

**Via SSH:**
```bash
export OPENAI_API_KEY="sk-proj-[NEUER-KEY]"
echo 'export OPENAI_API_KEY="sk-proj-[NEUER-KEY]"' >> ~/.bashrc
```

**Via Admin-Panel:**
AlwaysData → Sites → Environment variables → Bearbeiten

---

## ✅ Zusammenfassung

| Feature | Status | Speicherort |
|---------|--------|-------------|
| Lokales CLI-Tool | ✅ Aktiv | `.env.local` |
| Git-Sicherheit | ✅ Geschützt | `.gitignore` |
| Backend-API | ✅ Bereit | Server ENV / `.env.local` |
| OpenAI-Modell | ✅ **gpt-4.1-2025-04-14** | Beste Schreibqualität |
| Rate-Limiting | ✅ Aktiv | 10 Requests/h |
| CORS-Schutz | ✅ Aktiv | Nur autorisierte Domains |

**Sie müssen den API-Key NIEMALS mehr manuell eingeben!** 🎉

---

## 📚 Weitere Informationen

- **Content Generator Docs**: `scripts/CONTENT_GENERATOR_README.md`
- **API-Key bei OpenAI**: https://platform.openai.com/api-keys
- **AlwaysData Docs**: https://help.alwaysdata.com
