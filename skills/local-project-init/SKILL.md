# Local Project Initializer

Creates local project directory structure in /Users/martin/Documents/Cowork Bereich/. Copies copilotenschule.de template files, updates project-specific configs (package.json, vite.config, CLAUDE.md). Prepares local Git repository for initial push.

## Max Iterations
10

## Operationen

1. Projektverzeichnis `[projektname]/` erstellen in `/Users/martin/Documents/Cowork Bereich/`
2. Template-Files von `team-copilot-collective` kopieren
3. `package.json` Namen/URLs anpassen
4. `CLAUDE.md` mit neuen Projekt-Infos aktualisieren
5. Git initialisieren (`git init`, `git add .`, Initial Commit)

## Beispiel-Code

```bash
cd ~/Documents/Cowork\ Bereich/
mkdir chatgpt-trainings
cd chatgpt-trainings
cp -r ../team-copilot-collective/* .
cp -r ../team-copilot-collective/.github .
cp ../team-copilot-collective/.gitignore .
cp ../team-copilot-collective/.env.example .
# Update package.json, CLAUDE.md, etc.
git init
git add .
git commit -m "Initial commit: Clone from copilotenschule.de template"
```

## Wichtig: Nicht kopieren
- `node_modules/`
- `dist/`
- `dist2/`
- `.git/`
- `.DS_Store`
- `.env.local`
- Backup-Dateien und temporaere `.mjs` Timestamp-Dateien
- Bilder die spezifisch fuer copilotenschule sind (`.png`, `.pptx`)

## Outputs
- Lokales Verzeichnis ready fuer GitHub Push
- CLAUDE.md mit korrekten Repo/Deploy Infos

## Best Practices
- Nutze explizite Pfad-Checks vor Copy-Operationen
- Validiere dass Source-Template existiert
- Logge jeden Schritt fuer Debugging
