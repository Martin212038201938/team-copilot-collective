# Fahrplan: Mehr Trainingsanfragen über copilotenschule.de

Stand: 06.07.2026 · Verantwortlich: Claude (Umsetzung) + Martin (Review/Freigabe je Phase)

## Datenbasis (verifiziert am 06.07.2026)

**GSC (3 Monate):** Query "copilot training": 769 Impressionen, 1 Klick, Ø-Position 15,3. Davon Startseite 646 Impr., `/trainings` 90, Wissensartikel 28 (Pos. ~42). Der Wissensartikel `/wissen/copilot-training-schulung`: 224 Impressionen, 0 Klicks über alle Queries.

**Ahrefs (Site Explorer):** Domain rankt für kein transaktionales Trainings-Keyword in den Top 100. Stärken sind rein informational: copilot lizenz (Pos. 1), copilot word / word copilot / outlook copilot (Pos. 1), copilot in excel (Pos. 10, Vol. 500), copilot kosten (Pos. 13, Vol. 800).

**Clarity-Baseline (30 Tage, erhoben 06.07.2026):**
- Trichter "Lead-Reise SEO → Angebot → Kontakt": 1.163 Sitzungen auf Wissensartikeln (55 % des Traffics), **0 %** erreichen Schritt 2 (Trainings/Konfigurator) — die Brücke Wissen→Angebot existiert faktisch nicht.
- Formular-Anfragen: ~6/Monat ("Formular absenden": 6, "Kontaktieren Sie uns": 8 Sitzungen).
- Ø-Scrolltiefe ~38 % → CTAs am Artikelende werden von der Mehrheit nie gesehen; CTAs gehören ins obere Drittel.
- Referrer dominiert von google.com (956 Sitzungen).

**Repo-Befunde:**
- `/trainings` (UnsereAngebote.tsx) enthält **kein Kontakt-/Anfrage-Element** — die wichtigste transaktionale Seite hat keinen Conversion-Pfad außer Konfigurator/Workshops.
- 5 interne Links zeigen auf `/unsere-angebote`, das nur per clientseitigem `<Navigate>` auf `/trainings` umleitet — für Crawler ein schwaches Signal, Linkkraft geht verloren.
- Nur ~12 interne Links auf `/trainings`, Anchors generisch ("Trainings", "Trainingsübersicht"), kein Anchor "Microsoft Copilot Training".
- Top-Traffic-Artikel (Excel, Word, Outlook, Lizenzen) haben keinen bzw. sehr späten Anfrage-CTA.

**Diagnose:** Der Traffic kommt über informationale Queries (Anleitungen), die Anfragen fehlen, weil (a) die Conversion-Pfade von den Traffic-Seiten zu den Angeboten schwach sind und (b) die Domain für transaktionale Queries nicht konkurrenzfähig rankt. Der ursprünglich diskutierte Title-Tausch auf dem Wissensartikel adressiert keins von beidem.

---

## Phase 0 — Messbarkeit herstellen (Voraussetzung, ~1 Tag)

Ohne Baseline ist der Erfolg des Fahrplans nicht nachweisbar.

**Maßnahmen:**
1. Baseline dokumentieren: GSC-Werte (siehe oben) + aktuelle Anfragen pro Monat (Input von Martin nötig: Wie kommen Anfragen rein — Formular `/#contact`, E-Mail, Teams-Chat, Konfigurator? Wie viele waren es in den letzten 3 Monaten?)
2. Falls noch nicht vorhanden: einfaches Ereignis-Tracking für CTA-Klicks prüfen (Ahrefs Web Analytics ist im Account vorhanden).
3. **Microsoft Clarity nutzen** (vorhanden): Heatmaps + Session Recordings für `/trainings` und die Top-Traffic-Artikel auswerten — wie weit scrollen Besucher, sehen sie überhaupt einen CTA, wo brechen sie ab? Liefert die Vorher-Basis für Phase 1 und validiert danach die CTA-Platzierung.

**Chance:** Alle folgenden Phasen werden messbar. **Risiko:** Keins.

---

## Phase 1 — Conversion Quick Wins (höchster Hebel, kein SEO-Risiko)

**Maßnahmen:**
1. **`/trainings`: Anfrage-Sektion einbauen** (Kontakt-CTA oder eingebettetes Contact-Element, Teams-Chat-Link, Telefon). Größter Einzelhebel: die Seite, die kaufbereite Besucher empfängt, kann aktuell keine Anfrage entgegennehmen.
2. **Top-Traffic-Artikel** (copilot-in-excel-aktivieren, microsoft-copilot-lizenzen, copilot-fuer-word, copilot-in-outlook-nutzen-tipps): je einen kontextuellen Trainings-CTA im oberen Drittel ergänzen (z. B. nach der Schnellantwort: "Ihr Team soll das flächendeckend können? → Copilot-Trainings ansehen").
3. **Wissensartikel copilot-training-schulung:** CTA "Trainingsangebot anfragen" direkt unter die Formate-Tabelle ziehen (aktuell erst am Artikelende).

**Chancen:** Wirkt sofort auf das Ziel (Anfragen), unabhängig von Rankings. Kein Einfluss auf Meta-Daten, Schema oder GEO-Strukturen.
**Risiken:** Sehr gering. Zu aggressive CTAs könnten die "Echter Fachartikel"-Glaubwürdigkeit verwässern → dezent halten, max. 1 CTA im oberen Drittel pro Artikel. Rollback per Git trivial.

---

## Phase 2 — Interne Verlinkung konsolidieren (gering es Risiko, klares Signal)

**Maßnahmen:**
1. Die 5 Links auf `/unsere-angebote` auf direkte `/trainings`-Links ändern (CopilotInExcelAktivieren, CopilotVariantenUnterschiede, CopilotInTeamsZeitGewinnen, CopilotFlexRoutingEU, CopilotRolloutLeitfaden).
2. Aus thematisch passenden Wissensartikeln je einen Link mit Anchor "Microsoft Copilot Training" bzw. "Copilot Training für Unternehmen" auf `/trainings` setzen (natürlich im Fließtext, kein Anchor-Spam: 3–5 Artikel reichen).
3. Im Wissensartikel copilot-training-schulung `/trainings` prominent im Einstieg verlinken.

**Chancen:** Google lernt, welche URL für "copilot training" die Zielseite ist; bündelt die heute auf 4 URLs verteilte Relevanz. Kostenlos, vollständig in eigener Hand.
**Risiken:** Übergangsvolatilität — Google tauscht ggf. Startseite gegen `/trainings` für die Query; das ist gewollt (bessere Conversion), kann aber 2–6 Wochen Impressionsschwankung bedeuten. Kein Abwertungsrisiko: interne Verlinkung mit beschreibenden Anchors ist Standard-Praxis. Absicherung: Änderungen in einem Commit, wöchentliches GSC-Monitoring, Rollback möglich.

---

## Phase 3 — Meta-Optimierung `/trainings` (moderat, erst nach Phase 2)

**Maßnahmen:**
1. Title schärfen: `Microsoft Copilot Training & Schulung für Unternehmen | copilotenschule.de` (exakter Begriff nach vorne; aktuell "Trainings und Schulungen").
2. Description auf Entscheider-Frage ausrichten (Formate, Inhouse/Online, DACH) — ohne Versprechen, die die Seite nicht hält.
3. **Nicht anfassen:** Title/Description des Wissensartikels bleiben informational (höchstens Angleichung an die H1, separat zu entscheiden). Schema, FAQs, E-E-A-T-Elemente bleiben unverändert (GEO-Schutz).
4. Nach Deploy: IndexNow-Ping + URL in GSC zur Indexierung einreichen.

**Chancen:** Fettgedrucktes Exact-Match im Snippet, sobald `/trainings` für die Query ausgespielt wird; konsistent mit Phase 2.
**Risiken:** Gering. Google kann Titles umschreiben (dann kein Schaden). Kurzfristige Positionsschwankung nach Meta-Änderung möglich. Kein Penalty-Risiko — Title-Änderungen sind normale Optimierung. Rollback trivial.

---

## Phase 4 — Autorität & GEO (mittel-/langfristig, größter Ranking-Hebel)

Position 15 → Top 10 für "copilot training" scheitert vermutlich primär an Domain-Autorität (junge Domain gegen Haufe, IHK & Co.).

**Maßnahmen:**
1. **GEO stärken (Projektfokus):** `/trainings` um kundenorientierte FAQs erweitern (Formel aus CLAUDE.md: Entscheider-Frage + Lösung + Copilotenschule als Ressource) inkl. FAQPage-Schema → Zitierbarkeit in ChatGPT/Perplexity/Copilot für "welches Copilot Training für Unternehmen". `llms.txt` prüfen und `/trainings` dort prominent führen.
2. **Backlinks:** 3–5 hochwertige deutsche Quellen (Gastbeiträge, Branchenverzeichnisse Weiterbildung, IHK-Kooperation, Kunden-Case-Studies mit Verlinkung). Braucht Martins Mitwirkung — ich kann Kandidatenliste + Outreach-Entwürfe liefern.
3. Bestehende Stärken nutzen: Die Pos.-1-Artikel (Lizenzen, Word, Outlook) sind die zitierfähigsten Assets — dort GEO-Elemente aktuell halten.

**Chancen:** Einziger Weg zu nachhaltigen transaktionalen Rankings; GEO-Anfragen ("frag ChatGPT nach Copilot-Trainings") konvertieren erfahrungsgemäß gut.
**Risiken:** Zeitaufwand; bei Backlinks strikt auf Qualität achten (keine gekauften Links — Penalty-Risiko nur dort real).

---

## Phase 5 — Monitoring & Erfolgskontrolle (laufend)

1. Wöchentlich: GSC-Check Query "copilot training" + "copilot schulung" (welche URL, Position, Klicks) und Anfragen zählen.
2. Nach 8 Wochen Zwischenfazit: Position `/trainings`, CTR, Anfragen vs. Baseline.
3. **Abbruch-/Rollback-Kriterium:** Fallen Klicks der Domain gesamt >20 % über 4 Wochen ohne externen Grund (Update, Saison), werden Phase-2/3-Änderungen einzeln zurückgerollt und neu bewertet.

Optional richte ich einen automatischen wöchentlichen Report ein (Scheduled Task, nutzt GSC via Chrome).

---

## Erfolgsziele (12 Wochen)

| Metrik | Baseline | Ziel |
|---|---|---|
| Position `/trainings` für "copilot training" | nicht in Top 100 (Impr. auf Startseite, Pos. ~15) | `/trainings` ist die rankende URL, Pos. ≤ 12 |
| Klicks Query-Cluster training/schulung | ~1 / 3 Monate | > 30 / Monat |
| Trainingsanfragen | ? (Phase 0) | +50 % vs. Baseline |

## Arbeitsweise (Guardrails)

Jede Phase: Änderungen lokal → `npx vite build --outDir /tmp/dist-test` → Martin reviewed in GitHub Desktop und commitet/pusht → IndexNow-Ping → GSC-Einreichung. Kein Push durch Claude, keine Änderungen an Schema-@graph, FAQs, Autor-/E-E-A-T-Elementen bestehender Artikel.

## Offene Punkte (Input Martin)

1. Wie kommen Trainingsanfragen heute rein und wie viele waren es in den letzten 3 Monaten? (Phase 0)
2. Freigabe Phase 1 (Conversion) — kann sofort starten.
3. Bereitschaft für Backlink-Mitwirkung (Phase 4)?
