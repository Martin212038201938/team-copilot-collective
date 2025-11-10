# 🔒 Security & Cost Control

Dieses Dokument beschreibt die Sicherheitsmechanismen und Kostenkontroll-Systeme für den AI Content Generator.

## 🚨 Automatischer Kill-Switch

### Zweck
Der Kill-Switch schützt vor übermäßigen OpenAI API-Kosten durch:
- Endlosschleifen im Code
- Fehlerhafte Retry-Logik
- Versehentliche Massenverarbeitung
- Unbefugte Nutzung

### Tägliches Limit

**Standard: 3,00 EUR pro Tag**

Bei Überschreitung des Limits werden **alle OpenAI API-Anfragen sofort gestoppt**.

### Drei-Stufen-Schutz

#### 1. Kosten-Limit (3 EUR/Tag)
```
✅ 0.00 - 2.40 EUR: Normal
⚠️  2.40 - 3.00 EUR: Warnung (80% erreicht)
🚨 3.00+ EUR: KILL-SWITCH AKTIVIERT
```

#### 2. Request-Limit pro Minute
```
Max. 10 Anfragen/Minute
→ Schutz vor Endlosschleifen
```

#### 3. Request-Limit pro Stunde
```
Max. 50 Anfragen/Stunde
→ Schutz vor Massenverarbeitung
```

## 🔐 API Key Sicherheit

### Speicherort

Der OpenAI API Key wird ausschließlich in **`.env.local`** gespeichert:

```bash
# .env.local (NICHT in Git!)
OPENAI_API_KEY=sk-proj-...
```

### Git Protection

✅ `.env.local` ist in `.gitignore` → **wird NICHT committed**
✅ `.openai-usage.json` ist in `.gitignore` → **wird NICHT committed**
✅ Nur `.env.example` ist im Repository (ohne echten Key)

### Frontend Protection

✅ **Vite Config**: Nur `VITE_` prefixed Variables werden im Frontend verfügbar
✅ **OpenAI Key**: Beginnt NICHT mit `VITE_` → Frontend hat KEINEN Zugriff
✅ **Scripts nur**: OpenAI API wird NUR in Node.js Scripts verwendet

```javascript
// ✅ SICHER: Nur in Node.js Scripts
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ❌ NICHT möglich: Im Frontend
// process.env.OPENAI_API_KEY ist undefined im Browser
```

### Rotation Best Practices

1. **Regelmäßig rotieren**: Alle 3-6 Monate neuen Key generieren
2. **Bei Verdacht sofort**: Key in OpenAI Dashboard widerrufen
3. **Separate Keys**: Entwicklung vs. Produktion trennen

## 📊 Cost Tracking

### Automatisches Tracking

Jeder OpenAI API-Call wird automatisch getrackt:

```bash
# Vor dem Call
checkBeforeRequest() → Prüft Limits, wirft Exception bei Überschreitung

# Nach dem Call
trackUsage(model, promptTokens, completionTokens) → Speichert Kosten
```

### Persistente Speicherung

**Datei:** `.openai-usage.json` (lokal, nicht in Git)

```json
{
  "date": "2025-11-10",
  "totalCostEur": 0.1234,
  "totalRequests": 2,
  "requests": [
    {
      "timestamp": "2025-11-10T14:30:00.000Z",
      "model": "gpt-4o",
      "promptTokens": 8234,
      "completionTokens": 4123,
      "costEur": 0.0617,
      "costUsd": 0.0671
    }
  ],
  "previousDays": [
    { "date": "2025-11-09", "totalCostEur": 0.18, "totalRequests": 3 }
  ]
}
```

### Automatischer Reset

- **Täglich um Mitternacht**: Kosten-Counter wird zurückgesetzt
- **Historische Daten**: Letzte 30 Tage werden gespeichert

## 🛠️ Usage Commands

### Kosten-Statistiken anzeigen

```bash
npm run cost:stats
```

**Ausgabe:**
```
📊 OpenAI Usage Statistiken
═══════════════════════════════════════════
📅 Datum: 2025-11-10
💰 Gesamtkosten heute: 0.1234 EUR / 3.0000 EUR
📈 Verbraucht: 4.1%
🔢 Anfragen heute: 2
⚡ Verbleibend: 2.8766 EUR
🕐 Letzte Anfrage: 14:30:15

📆 Letzte 30 Tage:
   Gesamt: 1.8234 EUR
   Durchschnitt: 0.0912 EUR/Tag
═══════════════════════════════════════════
```

### Manueller Reset (Notfall)

```bash
npm run cost:reset
```

⚠️ **Nur in Notfällen verwenden!** Der Reset erfolgt normalerweise automatisch um Mitternacht.

## 🚨 Kill-Switch Aktivierung

### Was passiert?

Wenn ein Limit überschritten wird:

1. **Sofortiger Stop**: Alle API-Anfragen werden blockiert
2. **Fehlermeldung**: Detaillierte Erklärung mit Lösungen
3. **Exception**: Script wird mit Error beendet
4. **Log**: Event wird in `.openai-usage.json` gespeichert

### Beispiel-Fehlermeldung

```
🚨 KILL-SWITCH AKTIVIERT!

Tägliches Kosten-Limit erreicht: 3.0123 EUR / 3.0000 EUR
Alle OpenAI API-Anfragen wurden GESTOPPT.

Grund: Schutz vor übermäßigen Kosten durch Fehler oder Endlosschleifen.

Lösungen:
1. Warte bis morgen (automatischer Reset um Mitternacht)
2. Erhöhe DAILY_LIMIT_EUR in scripts/cost-tracker.js
3. Lösche .openai-usage.json für manuellen Reset (nur bei Bedarf!)

Heutige Anfragen: 52
```

### Limit anpassen

**Datei:** `scripts/cost-tracker.js`

```javascript
// Konfiguration
const DAILY_LIMIT_EUR = 3.0;              // ← Hier anpassen
const MAX_REQUESTS_PER_MINUTE = 10;       // ← Optional anpassen
const MAX_REQUESTS_PER_HOUR = 50;         // ← Optional anpassen
```

**Nach Anpassung:** Keine Neuinstallation nötig, Änderungen sind sofort aktiv.

## 💰 Kosten-Übersicht

### OpenAI Pricing (Stand Nov 2024)

| Model | Input | Output |
|-------|-------|--------|
| gpt-4o | $2.50 / 1M tokens | $10.00 / 1M tokens |
| gpt-4-turbo | $10.00 / 1M tokens | $30.00 / 1M tokens |
| gpt-4 | $30.00 / 1M tokens | $60.00 / 1M tokens |

### Typische Kosten pro Seite

Mit **gpt-4o** (Standard):

```
Prompt:      ~8.000 tokens × $2.50  = $0.02
Completion:  ~4.000 tokens × $10.00 = $0.04
──────────────────────────────────────────
Total:       12.000 tokens          = $0.06 (~0.055 EUR)
```

### Bei 3 EUR Tages-Limit

```
3.00 EUR / 0.055 EUR = ~54 Seiten pro Tag

→ Mehr als ausreichend für normale Nutzung!
```

## 🔍 Sicherheits-Checkliste

### Vor jedem Commit

- [ ] `.env.local` ist in `.gitignore`
- [ ] `.openai-usage.json` ist in `.gitignore`
- [ ] Kein API Key im Code hardcoded
- [ ] Nur `.env.example` wird committed (ohne echten Key)

### Regelmäßig prüfen

- [ ] `git status` zeigt keine `.env.local` oder Usage-Dateien
- [ ] `npm run cost:stats` zeigt aktuelle Kosten
- [ ] OpenAI Dashboard: Usage überwachen
- [ ] API Key rotieren (alle 3-6 Monate)

### Bei Verdacht auf Kompromittierung

1. **Sofort**: API Key in OpenAI Dashboard widerrufen
2. **Neuen Key**: Generieren und in `.env.local` eintragen
3. **Logs prüfen**: `.openai-usage.json` auf ungewöhnliche Aktivität prüfen
4. **Git History**: Prüfen, ob Key jemals committed wurde

## 🛡️ Best Practices

### 1. Lokale Entwicklung

```bash
# Setup (einmalig)
cp .env.example .env.local
# Trage deinen API Key ein

# Vor Generierung: Kosten checken
npm run cost:stats

# Nach Generierung: Automatisch in Output
# (Cost-Tracker zeigt Statistiken automatisch)
```

### 2. Team-Umgebung

- **Jeder Entwickler**: Eigener API Key in eigenem `.env.local`
- **Shared Keys**: NUR für CI/CD (mit strengeren Limits)
- **Review-Prozess**: Code-Review prüft, dass kein Key committed wurde

### 3. Produktions-Umgebung

- **Separate Keys**: Niemals Dev-Key in Produktion
- **Monitoring**: OpenAI Dashboard regelmäßig prüfen
- **Alerts**: Email-Alerts in OpenAI Dashboard aktivieren
- **Backups**: `.openai-usage.json` täglich sichern (optional)

### 4. Fehlerbehandlung

```javascript
try {
  const content = await generateContent(transcript);
} catch (error) {
  if (error.message.includes('KILL-SWITCH')) {
    // Kill-Switch wurde aktiviert
    console.error('Kosten-Limit erreicht. Warte bis morgen.');
    // Nicht retry! Würde sofort wieder blocken.
  } else {
    // Andere Fehler (Network, API, etc.)
    console.error('API-Fehler:', error.message);
    // Hier könnte Retry sinnvoll sein
  }
}
```

## 📞 Support

### Bei Problemen

1. **Kosten-Stats prüfen**: `npm run cost:stats`
2. **Logs prüfen**: `.openai-usage.json` öffnen
3. **OpenAI Dashboard**: https://platform.openai.com/usage
4. **Diese Docs**: Vollständige Lösungen oben

### Bei Verdacht auf Sicherheitsproblem

1. **Sofort**: API Key widerrufen
2. **Dann**: Neue Key generieren
3. **Melden**: An Team/Admin

## 📚 Weiterführende Links

- [OpenAI API Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [OpenAI Usage Dashboard](https://platform.openai.com/usage)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)

---

**Letzte Aktualisierung:** 10. November 2025

**Security Kontakt:** info@copilotenschule.de
