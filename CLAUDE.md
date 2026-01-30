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
- `/public/` - Statische Assets
