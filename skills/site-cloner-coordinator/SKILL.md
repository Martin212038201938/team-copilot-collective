# Site Cloner Coordinator

Orchestrates full website cloning from copilotenschule.de template to new training sites. Manages execution sequence of sub-skills: local setup → GitHub → AlwaysData → IONOS → content adaptation → deployment → testing → learning loop. Designed for autonomous Ralph Mode operation after initial pilot.

## Max Iterations
50

## Aufgaben
1. Sequenzielle Skill-Aufrufe koordinieren
2. Fehlerbehandlung zwischen Skills
3. Checkpoint-Management (nur im Pilot)
4. Abschlussbericht mit Learning-Insights generieren

## Execution Sequence

```
1. /local-project-init     → Lokales Projekt erstellen
2. /github-repo-manager    → GitHub Repo + Deploy Pipeline
3. /alwaysdata-provisioner → Site + DBs provisionieren
4. /ionos-domain-router    → DNS konfigurieren
5. /seo-content-diff       → Content differenzieren
6. /deployment-tester      → Build + Deploy + Live Tests
7. /learning-loop          → Fehler analysieren, Skills updaten
```

## Inputs

| Parameter | Beschreibung | Beispiel |
|-----------|-------------|----------|
| `projektname` | Name des neuen Projekts | `chatgpt-trainings` |
| `domain` | Zieldomain | `chatgpt-trainings.de` |
| `primary_keyword` | Haupt-SEO-Keyword | `ChatGPT Training` |

## Naming Convention

| Element | Pattern | Beispiel |
|---------|---------|----------|
| **Projektverzeichnis** | `/Users/martin/Documents/Cowork Bereich/[projektname]/` | `chatgpt-trainings/` |
| **GitHub Repo** | `Martin212038201938/[projektname]` | `Martin212038201938/chatgpt-trainings` |
| **Domain** | `[projektname].de` | `chatgpt-trainings.de` |
| **AlwaysData Site** | `/www/[projektname].de/` | `/www/chatgpt-trainings.de/` |
| **PostgreSQL DBs** | `[projektname_sanitized]_main` / `_users` | `chatgpt_trainings_main` |

**DB Name Sanitization:** Bindestriche `-` → Underscores `_`

## Checkpoint-Strategie (nur im Pilot)

**Stoppe und frage Martin**, wenn:
1. Entscheidung die zukuenftige Ralph Mode Klone betrifft
2. Credential-Validierung fehlschlaegt
3. SEO-Differenzierung unklar ist

**NICHT stoppen** bei:
- Standard-Operationen (Repo erstellen, Files kopieren, Deploy triggern)
- Automatisierbaren Entscheidungen (Naming Conventions, Port-Defaults)
- Technischen Fehlern mit klarem Workaround (Retry-Logic)

## Completion Report

Nach jedem Clone generiere:

```markdown
# Clone Completion Report: [domain]
Date: [Timestamp]
Duration: [Total Zeit]

## Success Metrics
- [ ] Local Project Created
- [ ] GitHub Repo Live
- [ ] AlwaysData Site Provisioned
- [ ] 2 PostgreSQL DBs Ready
- [ ] IONOS Domain Routed
- [ ] Content Differentiated (< 20% Similarity)
- [ ] Deploy Pipeline Working
- [ ] All Functional Tests Passed
- [ ] Learning Loop Executed

## Issues Encountered
1. [Issue] - Severity: [Low/Medium/High] - Status: [Resolved/Logged]

## Key Learnings
- [Learning]: [Beschreibung]
```
