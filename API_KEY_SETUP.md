# 🔑 OpenAI API-Key Einrichtung

## Problem
Der Content Generator benötigt einen gültigen OpenAI API-Key, um Transkripte zu analysieren und Inhalte zu generieren.

## ✅ Schnelle Lösung (3 Schritte)

### 1. OpenAI API-Key besorgen

Gehe zu [OpenAI Platform - API Keys](https://platform.openai.com/api-keys)

- **Falls du noch keinen Account hast:**
  1. Erstelle einen Account auf https://platform.openai.com/signup
  2. Verifiziere deine E-Mail-Adresse
  3. Füge eine Zahlungsmethode hinzu (https://platform.openai.com/settings/organization/billing/overview)

- **Falls du bereits einen Account hast:**
  1. Logge dich ein auf https://platform.openai.com/api-keys
  2. Klicke auf **"Create new secret key"**
  3. Gib einen Namen ein (z.B. `copilotenschule-content-generator`)
  4. Kopiere den Key (er beginnt mit `sk-proj-...`)
  5. ⚠️ **WICHTIG**: Der Key wird nur einmal angezeigt!

### 2. API-Key in .env.local eintragen

Öffne die Datei `.env.local` im Projekt-Root und ersetze:

```bash
VITE_OPENAI_API_KEY=sk-proj-DEIN_API_KEY_HIER
```

Mit deinem echten API-Key:

```bash
VITE_OPENAI_API_KEY=sk-proj-AbCdEf123456789...
```

**Speichern!**

### 3. Development Server neu starten

```bash
# Terminal beenden (Ctrl+C) und neu starten:
npm run dev
```

## 🎯 Alternative: API-Key direkt im Browser eingeben

Du kannst den API-Key auch direkt im Admin-Dashboard eingeben:

1. Gehe zu `/admin`
2. Öffne den Content Generator
3. Du siehst eine gelbe Warnung "⚠️ API Key erforderlich"
4. Gib deinen API-Key dort ein
5. Er wird im localStorage gespeichert (nur in diesem Browser)

**Vorteil**: Funktioniert sofort ohne Server-Neustart
**Nachteil**: Nur für diesen Browser, muss bei jedem Browser neu eingegeben werden

## 🔍 Testen ob es funktioniert

1. Gehe zu `/admin`
2. Erstelle einen neuen Draft
3. Öffne "Content Generator"
4. Wenn der API-Key korrekt ist, siehst du: **"✓ API Key konfiguriert"** (grüner Banner)
5. Wenn nicht, siehst du: **"⚠️ API Key erforderlich"** (gelber Banner)

## 💰 Kosten

Die OpenAI API ist **nicht kostenlos**, aber sehr günstig:

- **Pro generierter Wissensseite**: ca. €0.03 - €0.08
- **Mit €10 Guthaben**: ca. 100-300 Seiten generieren

Überwache deine Nutzung: https://platform.openai.com/usage

## 🔒 Sicherheit

- ✅ `.env.local` ist in `.gitignore` → wird **NICHT** in Git committed
- ✅ Der Key wird nur lokal verwendet
- ⚠️ **WARNUNG**: Der Key ist im Browser sichtbar (DevTools)
- 🔐 **Empfehlung für Production**: Verwende einen Backend-Proxy (siehe `OPENAI_SETUP.md`)

## ❌ Fehlerbehebung

### "Kein OpenAI API Key gefunden"

**Lösung 1**: Prüfe `.env.local`
```bash
cat .env.local
```
Sollte deinen echten API-Key zeigen (nicht `DEIN_API_KEY_HIER`)

**Lösung 2**: Dev-Server neu starten
```bash
# Terminal beenden (Ctrl+C)
npm run dev
```

**Lösung 3**: Gib den Key direkt im UI ein (siehe oben)

### "Invalid API Key" oder "401 Unauthorized"

Dein API-Key ist ungültig oder wurde widerrufen:

1. Gehe zu https://platform.openai.com/api-keys
2. Erstelle einen **neuen** Key
3. Aktualisiere `.env.local`
4. Dev-Server neu starten

### "Insufficient quota" oder "Rate limit exceeded"

Du hast kein Guthaben mehr oder zu viele Requests:

1. Prüfe Guthaben: https://platform.openai.com/settings/organization/billing/overview
2. Füge Guthaben hinzu oder warte (Rate Limits resetten nach 1 Minute)

## 📚 Weitere Infos

- **OpenAI API Docs**: https://platform.openai.com/docs
- **Pricing**: https://openai.com/pricing
- **Usage Dashboard**: https://platform.openai.com/usage
- **API Keys verwalten**: https://platform.openai.com/api-keys

## ✅ Checkliste

- [ ] OpenAI Account erstellt
- [ ] Zahlungsmethode hinzugefügt
- [ ] API-Key erstellt
- [ ] Key in `.env.local` eingetragen ODER im UI eingegeben
- [ ] Dev-Server neu gestartet
- [ ] Im Admin-Dashboard "✓ API Key konfiguriert" wird angezeigt
- [ ] Test: Transkript analysieren funktioniert

---

**Noch Fragen?** Lies die ausführliche Anleitung in `OPENAI_SETUP.md`
