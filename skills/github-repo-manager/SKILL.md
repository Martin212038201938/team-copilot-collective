# GitHub Repository Manager

Automates GitHub repository creation, deploy.yml workflow setup, and secrets configuration. Clones deploy.yml from template, adapts FTP paths and site-specific variables. Replicates GitHub Secrets from team-copilot-collective to new repo.

## Max Iterations
15

## Operationen

1. Neues Repo `Martin212038201938/[projektname]` via GitHub API erstellen
2. Remote hinzufuegen: `git remote add origin https://github.com/Martin212038201938/[projektname].git`
3. Deploy.yml kopieren und anpassen:
   - `server-dir: /www/[domain]/` dynamisch setzen
   - Workflow-Namen zu "Deploy to [domain]" aendern
   - Sitemap-URL und IndexNow auf neue Domain anpassen
4. GitHub Secrets replizieren:
   - `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
   - `OPENAI_API_KEY` (shared key)
5. Initial Push zu `main` Branch

## Inputs benoetigt
- GitHub Personal Access Token (aus .env oder Environment)
- Template Repo Name: `team-copilot-collective`

## Beispiel deploy.yml Anpassung

```yaml
name: Deploy to chatgpt-trainings.de
on:
  push:
    branches:
      - main
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Chromium dependencies for Puppeteer
        run: |
          sudo apt-get update
          sudo apt-get install -y libgbm1 libasound2t64 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libpango-1.0-0 libcairo2 libnss3 libnspr4 libx11-xcb1 libxcb-dri3-0

      - name: Clean build artifacts
        run: |
          rm -rf dist
          rm -rf node_modules/.vite
          rm -rf node_modules/.cache

      - name: Install dependencies
        run: npm install

      - name: Build project with pre-rendering
        run: npm run build:prerender
        env:
          VITE_OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          CI: true

      - name: Install lftp
        run: sudo apt-get install -y lftp

      - name: Deploy via LFTP
        run: |
          lftp -e "set ssl:verify-certificate no; set ftp:ssl-allow yes; set ftp:ssl-protect-data yes; mirror -R --delete dist/ /www/[DOMAIN]/ ; quit" -u ${{ secrets.FTP_USERNAME }},${{ secrets.FTP_PASSWORD }} ${{ secrets.FTP_SERVER }}

      - name: Notify Bing IndexNow about updated pages
        run: |
          SITEMAP_URL="https://[DOMAIN]/sitemap.xml"
          INDEXNOW_KEY="695afc50b8ee44729593fd861c4e96e9"
          sleep 10
          URLS=$(curl -s "$SITEMAP_URL" | grep -oP '(?<=<loc>)[^<]+' | head -100)
          URL_COUNT=$(echo "$URLS" | wc -l)
          SUCCESS_COUNT=0
          for URL in $URLS; do
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://api.indexnow.org/indexnow?url=$URL&key=$INDEXNOW_KEY")
            if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "202" ]; then
              SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
            fi
          done
          echo "IndexNow completed: $SUCCESS_COUNT/$URL_COUNT URLs submitted"
```

## Validation
- Repo oeffentlich zugaenglich unter github.com/Martin212038201938/[projektname]
- Deploy.yml workflow visible in Actions Tab

## Known Issues
- **Error:** FTP-Deploy-Action (SamKirkland) hat ECONNRESET mit AlwaysData FTPS
- **Fix:** `lftp` statt FTP-Deploy-Action in deploy.yml verwenden
- **Prevention:** deploy.yml Template direkt mit lftp-Schritt erstellen

## Best Practices
- Implementiere Retry-Logic bei GitHub API Rate Limits
- Validiere Secrets bevor du Repo erstellst
- Nutze beschreibende Commit Messages
- Verwende lftp statt FTP-Deploy-Action fuer AlwaysData Deployments
- IMMER `npm run build` vor Git-Commit ausfuehren (faengt fehlende Imports, TS-Fehler, react-snap-Fehler ab)

## Git & Sandbox Learnings

### Sandbox hat keine GitHub-Credentials
Die Cowork-Sandbox hat weder `gh` CLI, noch SSH-Keys, noch gespeicherte Git-Credentials. Push ist aus der Sandbox heraus NICHT moeglich.
- Git-Commits in der Sandbox vorbereiten
- Dem User KLAR kommunizieren welches Repo gepusht werden muss
- Explizit den Repo-Namen nennen, nicht nur "Push origin"

### Verwechslungsgefahr bei mehreren Repos
Bei mehreren Repos im selben Workspace ist Verwechslungsgefahr hoch.
- Vor dem Push-Auftrag immer sagen: "Bitte stelle sicher, dass du im Repo **[exakter Name]** bist."
- Bei versehentlichem Push ins falsche Repo: `git revert <hash> --no-edit` (NIEMALS reset --hard oder force push)

### index.lock Dateien
Wenn Git-Operationen mit "index.lock exists" fehlschlagen:
```bash
rm .git/index.lock
```
In der Cowork-Sandbox braucht man dafuer ggf. `allow_cowork_file_delete` Berechtigung.
