# AlwaysData Provisioner

Provisions AlwaysData infrastructure via API: creates new site, two PostgreSQL databases with standardized credentials. Configures site root directory (/www/[domain]/), enables FTPS access. Clones database schema from copilotenschule template, empties content tables while preserving structure.

## Max Iterations
20

## Operationen

### 1. Site erstellen
- AlwaysData API: POST `/v1/site/` mit `addresses: ["[domain]"]`, `type: "php"`
- Root Directory: `/www/[domain]/`

### 2. PostgreSQL DBs erstellen
- DB 1: `[projektname_sanitized]_main` (Full Privileges)
- DB 2: `[projektname_sanitized]_users` (Full Privileges)
- User: Standard AlwaysData User (aus .env)
- Passwort: Shared Credentials (aus .env)

**Sanitization Rule:**
- Bindestriche `-` → Underscores `_`
- Beispiel: `chatgpt-trainings` → `chatgpt_trainings_main`

### 3. Schema Migration
- Exportiere Schema von `copilotenschule_main` (Structure only)
- Importiere in `[projektname_sanitized]_main`
- **Content-Bereinigung:**
  - Loesche alle Rows aus `wissensartikel` Table
  - Loesche User-spezifische Eintraege (behalte nur Admin-Skeleton)
  - Behalte Config-Tables (settings, navigation, etc.)

## API Credentials
- AlwaysData API Token (aus .env: `ALWAYSDATA_API_TOKEN`)
- Base URL: `https://api.alwaysdata.com`

## API Beispiele

```bash
# Site erstellen
curl -X POST https://api.alwaysdata.com/v1/site/ \
  -H "Authorization: Bearer $ALWAYSDATA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"addresses": ["chatgpt-trainings.de"], "type": "php", "path": "/www/chatgpt-trainings.de/"}'

# Database erstellen
curl -X POST https://api.alwaysdata.com/v1/database/ \
  -H "Authorization: Bearer $ALWAYSDATA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "chatgpt_trainings_main", "type": "postgresql"}'

# Schema Export (lokal)
pg_dump --schema-only -h postgresql-[account].alwaysdata.net copilotenschule_main > schema.sql
```

## Validation
- Site erreichbar unter `https://[domain]` (auch wenn noch leer)
- DB Connection Test via `psql -h postgresql-[account].alwaysdata.net`

## Reference
- AlwaysData API Docs: https://help.alwaysdata.com/en/api/
- AlwaysData PostgreSQL Docs: https://help.alwaysdata.com/en/databases/postgresql/

## Known Issues
- **Error:** DB Name `y_b_...` (Underscore-Prefix) wird abgelehnt (400 Bad Request)
- **Fix:** AlwaysData nutzt `y-b_` (Hyphen) als Account-Prefix
- **Prevention:** Immer `y-b_` Prefix verwenden bei DB-Erstellung

- **Error:** FTP Credentials aus .env funktionieren nicht (530 Login incorrect)
- **Fix:** Neuen FTP-User pro Projekt ueber API erstellen: `POST /v1/ftp/` mit Name `y-b_[kurzname]`
- **Prevention:** FTP-User-Erstellung als festen Schritt in die Provisioning-Sequenz aufnehmen

## Best Practices
- Nutze pg_dump fuer Schema-Export mit `--schema-only` Flag
- Implementiere Transaction-Rollback bei Fehlern
- Logge alle API Responses fuer Debugging
- Erstelle IMMER einen dedizierten FTP-User pro Projekt (nicht auf shared Credentials verlassen)
