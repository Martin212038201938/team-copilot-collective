# Copilotenschule.de - Projekt-Anweisungen für Claude

## Repository
- GitHub: Martin212038201938/team-copilot-collective
- Live: https://copilotenschule.de

## Wichtige Regeln
- **NIEMALS** `git reset --hard` ausführen
- **NIEMALS** force push (`git push -f`)
- **NIEMALS** Secrets in Code oder Commits
- Bei Git-Problemen: erst fragen, dann handeln

## Workflow
- Lokaler Ordner wird mit GitHub Desktop synchronisiert
- Änderungen werden vom User in GitHub Desktop committed/gepusht
- Claude macht Datei-Änderungen, User kontrolliert in GitHub Desktop

## Deployment
- Push zu `main` → automatisches Deployment via GitHub Actions
- Ziel: alwaysdata.com FTP

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Node.js

## Projektstruktur
- `/src/pages/` - Seiten (Index, UeberUns, Wissen, etc.)
- `/src/components/` - React Komponenten
- `/public/` - Statische Assets
