---
name: seo-optimizer
description: |
  SEO-Optimierung für copilotenschule.de mit GEO-Schutz. Optimiert einzelne Seiten für höhere Suchvolumina ohne die LLM-Zitierbarkeit oder E-E-A-T-Signale zu beschädigen.

  TRIGGER: Wenn der Nutzer eine Seite der copilotenschule.de SEO-optimieren möchte, Keywords verbessern will, oder Meta-Tags anpassen möchte.

  NICHT verwenden für: Bulk-Optimierungen, neue Seiten erstellen, Content-Erstellung ohne SEO-Fokus.
---

# SEO-Optimizer für copilotenschule.de

Dieser Skill optimiert einzelne Seiten der copilotenschule.de für bessere Suchmaschinen-Rankings, ohne die GEO-Features (Generative Engine Optimization) zu beschädigen.

## Workflow

### Phase 1: Seiten-Analyse

1. **Datei lokalisieren**: Finde die React-Komponente in `/src/pages/`
2. **Aktuelle SEO-Konfiguration extrahieren**:
   - Title, Description, Keywords aus `<SEOHead>`
   - Schema.org Markup (Article, FAQPage, BreadcrumbList)
   - Canonical URL
   - dateModified / datePublished

3. **GEO-Checkliste prüfen** (NICHT ÄNDERN):
   - [ ] Schema.org @graph vorhanden
   - [ ] Author mit Person-Schema verknüpft
   - [ ] FAQPage Schema mit kundenorientierten Fragen
   - [ ] Quellen-Section mit externen Links
   - [ ] E-E-A-T Signale (Autor-Bio, Qualifikationen)

### Phase 2: Keyword-Recherche

1. **Primär-Keywords identifizieren** via Web Search:
   ```
   "[Seitenthema] Suchvolumen Deutschland"
   "[Seitenthema] Keywords SEO"
   "site:ahrefs.com OR site:semrush.com [Seitenthema]"
   ```

2. **Keyword-Kriterien für copilotenschule.de**:
   - Zielgruppe: Entscheider (GF, L&D, HR, CXO)
   - Sprache: Deutsch
   - Intent: Informational + Commercial
   - Fokus: Microsoft 365 Copilot, GitHub Copilot

3. **Keyword-Mapping erstellen**:
   | Keyword | Suchvolumen | KD | Priorität |
   |---------|-------------|-----|-----------|
   | ...     | ...         | ... | ...       |

### Phase 3: Optimierungs-Empfehlungen

Erstelle konkrete Änderungsvorschläge für:

1. **Title** (max. 60 Zeichen):
   - Primär-Keyword am Anfang
   - "Microsoft" hinzufügen wenn fehlend
   - Klarer Nutzen kommunizieren

2. **Description** (max. 155 Zeichen):
   - Primär-Keyword in ersten 50 Zeichen
   - Call-to-Action Element
   - Zielgruppen-Ansprache

3. **Keywords-Array** (8-12 Keywords):
   - Mix aus Short-Tail und Long-Tail
   - Varianten mit "Microsoft 365"
   - Problem-orientierte Keywords

4. **Canonical URL** prüfen:
   - Muss exakt zur Route passen
   - Format: `https://copilotenschule.de/wissen/[slug]` oder `/trainings/[slug]`

5. **dateModified** aktualisieren:
   - Auf aktuelles Datum setzen
   - Freshness-Signal für Google

### Phase 4: Freigabe einholen

**IMMER** vor Implementierung dem Nutzer zeigen:
- Vorher/Nachher Vergleichstabelle
- Begründung für jede Änderung
- Explizite Bestätigung abwarten

### Phase 5: Implementierung

Nach Freigabe die Änderungen mit `Edit` Tool vornehmen:

1. SEOHead Props aktualisieren
2. Schema headline/description synchronisieren
3. ContentLayout title/description synchronisieren
4. lastUpdated Datum aktualisieren

### Phase 6: Verifikation

1. TypeScript-Kompilierung prüfen: `npx tsc --noEmit`
2. Änderungen zusammenfassen für Nutzer

## GEO-Schutz Regeln

**NIEMALS ändern oder entfernen:**
- Schema.org @graph Struktur
- FAQPage mit Fragen und Antworten
- Author/Publisher Verknüpfungen
- BreadcrumbList Schema
- Quellen-Section mit externen Links
- E-E-A-T Elemente (Autor-Bio, Qualifikationen, sameAs)

**DARF optimiert werden:**
- Title und headline (mit Keyword-Fokus)
- Description (mit Keyword-Fokus)
- Keywords-Array (erweitern)
- dateModified (aktualisieren)
- Canonical URL (korrigieren wenn falsch)

## Keyword-Strategie für copilotenschule.de

### Primäre Keyword-Cluster

| Cluster | Beispiel-Keywords |
|---------|-------------------|
| Copilot Einführung | Microsoft Copilot Einführung, Copilot Rollout, Copilot Implementierung |
| Copilot Training | Copilot Schulung, Copilot Workshop, Copilot Kurs |
| Copilot Compliance | Copilot DSGVO, Copilot Governance, Copilot Datenschutz |
| Copilot Probleme | Copilot Fehler, Copilot Risiken, Copilot Halluzinationen |
| Copilot ROI | Copilot Kosten, Copilot Nutzen, Copilot Produktivität |

### Zielgruppen-Keywords

- "für Unternehmen"
- "für Teams"
- "B2B"
- "Enterprise"
- "deutsche Unternehmen"

## Beispiel-Optimierung

**Vorher:**
```
title="Copilot Fehler vermeiden"
description="Vermeiden Sie Fehler bei der Copilot-Einführung"
keywords={["Copilot", "Fehler"]}
```

**Nachher:**
```
title="Die 7 größten Fehler bei der Microsoft Copilot-Einführung | So vermeiden Sie sie"
description="Microsoft 365 Copilot sicher einführen: DSGVO-Compliance, Governance & Oversharing vermeiden. Praxisleitfaden für deutsche Unternehmen."
keywords={[
  "Microsoft 365 Copilot Fehler",
  "Copilot Einführung Fehler vermeiden",
  "Copilot DSGVO Compliance",
  "Copilot Governance",
  "Copilot Implementierung Risiken",
  ...
]}
```
