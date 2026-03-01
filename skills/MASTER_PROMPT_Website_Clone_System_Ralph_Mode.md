# MASTER PROMPT: Website Clone System fuer Ralph Mode

## Projektauftrag an Claude Code

Du entwickelst ein **automatisiertes Website-Cloning-System** mit
modularen Skills, das im Ralph Mode vollstaendig hands-free arbeitet.
Das System klont **copilotenschule.de** als Template und erstellt daraus
neue Training-Websites mit vollstaendiger Infrastruktur (GitHub Repo,
AlwaysData Site, PostgreSQL DBs, IONOS Domain-Routing).

------------------------------------------------------------------------

## Projektziel

**Endprodukt:** Ein Koordinator-Skill + modulare Sub-Skills, die
folgendes koennen:

1.  Lokales Projektverzeichnis in
    `/Users/martin/Documents/Cowork Bereich/[projektname]/` erstellen
2.  GitHub Repository `Martin212038201938/[projektname]` mit deploy.yml
    automatisch anlegen
3.  AlwaysData Site + DBs provisionieren (neue Site, neue PostgreSQL
    DBs)
4.  IONOS Domain-Routing zu AlwaysData konfigurieren
5.  Template-Content klonen mit SEO-Optimierung (kein Duplicate Content
    Risiko)
6.  Deployment Pipeline testen (GitHub → AlwaysData → Live Check)
7.  Learning Loop aktivieren: Fehler loggen, Skills/Memory nach
    Abschluss aktualisieren

------------------------------------------------------------------------

## Phase 1: Pilot Clone (ChatGPT-Trainings.de)

**Zielsetzung:** Erste vollstaendige Clone-Operation mit Checkpoints
fuer zukuenftige Automatisierung.

### Erste Site Details

-   Projekt: `chatgpt-trainings`
-   Lokales Verzeichnis:
    `/Users/martin/Documents/Cowork Bereich/chatgpt-trainings/`
-   Domain: `chatgpt-trainings.de`
-   GitHub Repo: `Martin212038201938/chatgpt-trainings`
-   AlwaysData Site: `/www/chatgpt-trainings.de/`
-   PostgreSQL DBs:
    -   `chatgpt_trainings_main`
    -   `chatgpt_trainings_users`
-   Scope: Vollstaendige Site-Struktur wie copilotenschule.de

------------------------------------------------------------------------

## Naming Convention

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Element                 Pattern                                                                      Beispiel
  ----------------------- ---------------------------------------------------------------------------- ----------------------------------------------------------------
  Projektverzeichnis      `/Users/martin/Documents/Cowork Bereich/[projektname]/`                      `chatgpt-trainings/`

  GitHub Repo             `Martin212038201938/[projektname]`                                           `Martin212038201938/chatgpt-trainings`

  Domain                  `[projektname].de`                                                           `chatgpt-trainings.de`

  AlwaysData Site         `/www/[projektname].de/`                                                     `/www/chatgpt-trainings.de/`

  PostgreSQL DBs          `[projektname_sanitized]_main``<br>`{=html}`[projektname_sanitized]_users`   `chatgpt_trainings_main``<br>`{=html}`chatgpt_trainings_users`
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## Definition of Done

Der Skill ist "Ralph Mode Ready", wenn:

1.  Alle 7 Sub-Skills funktionieren isoliert
2.  Coordinator orchestriert ohne Haenger
3.  Pilot-Clone laeuft mit \< 3 Martin-Interaktionen
4.  ERRORS.md hat \< 5 kritische Issues
5.  Learning Loop hat Skills verbessert
6.  Clone #2 laeuft mit 0 Martin-Interaktionen
7.  SEO-Differenzierung validiert (\< 20% Similarity)
8.  Alle Tests (Build, Deploy, UI) sind gruen
9.  Dokumentation vollstaendig
10. Production Ready

------------------------------------------------------------------------

## Execution Workflow (Ralph Mode Target)

User: "Clone copilotenschule.de fuer 'prompt-engineering-akademie.de'"

Claude (Ralph Mode):

1.  Local Init
2.  GitHub Repo
3.  AlwaysData Provisioning
4.  IONOS DNS
5.  SEO Differentiation
6.  Deploy
7.  Test
8.  Learning

Site live unter: https://prompt-engineering-akademie.de

------------------------------------------------------------------------

Generated for Martin -- Website Clone Automation System
