# Deployment Tester

Validates full deployment pipeline from GitHub push to live site. Tests critical functions: homepage loads, database connectivity, API endpoints respond, navigation works. Browser-based UI testing of user flows. Reports pass/fail with detailed logs.

## Max Iterations
15

## Test-Sequenz

### Stage 1: Build Test (lokal)

```bash
cd /Users/martin/Documents/Cowork\ Bereich/[projektname]
npm install
npm run build:prerender
```

Erwartete Ergebnisse:
- Build completes ohne Errors
- `dist/` Ordner generiert
- HTML Files enthalten korrekten Content (kein Template-Text wie "Copilot")

### Stage 2: GitHub Actions Test

- Push zu `main` Branch
- Warte bis GitHub Action `deploy.yml` completes (max. 10 Min)
- Check Action Logs fuer:
  - All steps green
  - FTP Upload erfolgreich
  - Fehler bei IndexNow akzeptabel (da keine Content-Freigabe)

### Stage 3: Live Site Functional Test

```bash
# HTTP Response Code Test
curl -I https://[domain]
# Expected: 200 OK

# Homepage laedt
curl https://[domain] | grep "<title>"
# Expected: "[Primary Keyword]..." (nicht "Copilot")

# Database Connection (via API Endpoint wenn vorhanden)
curl https://[domain]/api/health
# Expected: {"status": "ok", "db": "connected"}
```

### Stage 4: Browser UI Test (Claude Chrome Plugin)

1. **Homepage:** Laedt vollstaendig, Bilder sichtbar, keine 404s in Console
2. **Navigation:** Alle Menue-Links funktionieren
3. **Formular:** Kontaktformular sendet (Test-Submit, validiere DB Entry)
4. **Mobile View:** Responsive Design funktioniert (Chrome DevTools)
5. **Performance:** Lighthouse Score > 80 (optional)

## Error Handling

- Bei Fehler: Screenshot + Console Logs speichern
- In `ERRORS.md` loggen mit Timestamp + Error-Kategorie
- Retry-Logic: 3x versuchen bei temporaeren Fehlern (Network, Rate Limits)

## Output
- `DEPLOYMENT_TEST_REPORT.md` mit Pass/Fail Status pro Test
- Screenshots von erfolgreichem Frontend-Test

## Best Practices
- Nutze strukturierte Logging-Formate (JSON fuer Parsing)
- Implementiere Timeouts fuer jeden Test-Step
- Speichere alle Artifacts (Screenshots, Logs) in dedizierten Ordner
