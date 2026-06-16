# A6 — Index-Coverage über interne Verlinkung (Entwurf, 16.06.2026)

**Status:** Entwurf zur Freigabe. Kein Code geändert, kein Push. Umsetzung erst nach Review.
**Maßnahme:** A6 im `seo-projektplan.md`. Verifikation via Cron `copilotenschule-seo-index-coverage-recheck` (30.06.).

## Ziel & Prämissen

Echtes offenes Thema laut Status-Log (15.06.): nicht SSR, sondern **Indexierung** — 9 Seiten „gecrawlt – nicht indexiert" + 16 „gefunden – nicht indexiert" (von 92). Hebel: stärkere **interne Verlinkung** auf diese Seiten, damit Google sie als wertig genug zum Indexieren einstuft.

Zwei harte Leitplanken:

1. **Sicherheit** — keine Eingriffe in Bestandsinhalte gut rankender/indexierter Seiten. Protected Pages (`DONT-TOUCH-LIST.md`) und LLM-Top-Performer (`microsoft-copilot-lizenzen` = 13,6K Bing-Citations / 6.763 GSC-Impressionen, `copilot-in-outlook-nutzen-tipps`, `copilot-studio`) werden **nicht als Ziel** behandelt (brauchen keine Hilfe) und als **Quelle** nur sehr sparsam (max. 1 additiver Satz-Link).
2. **Performance** — ausschließlich **additive** kontextuelle In-Body-Links (ein zusätzlicher Satz oder Halbsatz mit Link), niemals Umschreiben/Entfernen bestehender Inhalte.

## Methode (warum diese Zielauswahl)

Aus dem Repo wurde der Graph der **kontextuellen In-Body-Links** je `/wissen/`-Seite gezählt (Quelle: `src/pages/*.tsx`, Self-Referenzen entfernt). Niedrige Zahl = „Link-Waise" = genau das Profil, das Google als „gecrawlt – nicht indexiert" liegen lässt.

Wichtig: Die automatischen „Das könnte Sie auch interessieren"-Blöcke (kategoriebasiert aus `articles.ts`) verteilen zusätzlich Basis-Links, die hier NICHT mitgezählt sind. Kontextuelle In-Body-Links sind aber das stärkere Signal — deshalb sind sie der Hebel.

Caveat: In dieser Session kein Live-GSC-Zugriff. Die exakten 25 nicht-indexierten URLs liegen nur als Anzahl vor. Die Zielliste unten ist daher die **Schnittmenge aus (a) repo-belegten Link-Waisen** und **(b) der historischen „nicht indexiert"-Liste** aus dem Status-Log (09.–15.06.). Der 30.06.-Cron gleicht sie gegen die echten GSC-Zahlen ab und fasst Nachzügler nach.

Bereits erledigt (nicht doppeln): „Track 1" vom 09.06. — 9 Links u. a. `ki-realitaet-beratungsfirmen-2026 ← Adoption2026`, `warum-verteiltes-lernen ← Lernreise + CopilotTraining`, `copilot-roi-erfolgsgeschichten ← Adoption2026`, `copilot-launch-kampagne ← UnternehmensweitEinfuehren`, `copilot-agent-digitales-gedaechtnis ← AgentMode`, `github-copilot + copilot-studio ← VariantenUnterschiede`, `copilot-tipps-tricks ← FuerExcel`.

## Priorität 1 — Link-Waisen mit 0 kontextuellen In-Body-Links

Diese Seiten bekommen je 2 neue kontextuelle Links aus thematisch passenden, möglichst bereits indexierten Quellseiten.

| Zielseite (0 inbound) | Vorgeschlagene Quelle(n) | Anker / Platzierung (additiv) | Risiko |
|---|---|---|---|
| `microsoft-copilot-varianten-unterschiede` | `claude-in-microsoft-copilot`; `copilot-chat-free-pernod-ricard` | Im Abschnitt zu Lizenz-/Modellvarianten: „… ein Überblick über die [Unterschiede der Copilot-Varianten](…)" | niedrig |
| `copilot-pages-loop-notebooks-sharepoint-workflows` | `copilot-tipps-tricks-produktivitaet`; `copilot-fuer-word` | Bei Zusammenarbeit/Dokumenten: „… zusammenhängend in [Pages, Loop und Notebooks](…)" | niedrig |
| `copilot-in-teams-zeit-gewinnen` | `copilot-tipps-tricks-produktivitaet`; `copilot-hr-use-cases` | Bei Meeting-/Team-Themen: „… [in Teams gezielt Zeit gewinnen](…)" | niedrig |
| `microsoft-copilot-schulung-online` | `copilot-training-schulung` (Hub); `copilot-lernreise-vs-tagesschulung` | Bei Schulungsformaten: „… auch als [Online-Copilot-Schulung](…)" | niedrig |
| `bessere-entscheidungen-mit-ki` | `copilot-tipps-tricks-produktivitaet`; `copilot-adoption-2026-zahlen` | Bei Entscheidungs-/Analyse-Use-Cases: „… [bessere Entscheidungen mit KI](…)" | niedrig |
| `copilot-betriebsrat` | `copilot-sicherheit-datenschutz` (im vorhandenen Abschnitt „Betriebsrat und Mitbestimmung"); `copilot-unternehmensweit-einfuehren` | Satz im Betriebsrats-Abschnitt: „… mehr dazu im Leitfaden [Copilot und der Betriebsrat](…)" | niedrig* |
| `copilot-in-excel-aktivieren` | — (bereits indexiert, Top-Klick-Bringer) | KEINE Aktion nötig | — |
| `copilot-in-outlook-nutzen-tipps` | — (Protected, Top-Performer) | KEINE Aktion nötig | — |

\* `copilot-sicherheit-datenschutz` ist indexiert und mittel-protected; der additive Satz steht in einem bereits existierenden Betriebsrats-Abschnitt → thematisch zwingend, minimales Risiko. Falls bei Review unerwünscht: Quelle auf `copilot-unternehmensweit-einfuehren` + `ki-schulung-mitarbeiter-pflicht` beschränken.

## Priorität 2 — dünn verlinkt (1–2 In-Body-Links), je 1 zusätzlicher Link

| Zielseite | inbound | Vorgeschlagene Quelle | Anker-Idee |
|---|---|---|---|
| `copilot-flex-routing-eu-verarbeitung` | 1 | `copilot-sicherheit-datenschutz` (EU-Daten-Abschnitt) | „… Details zum [Flex Routing der EU-Verarbeitung](…)" |
| `copilot-fuer-word` | 1 | `copilot-pages-loop-notebooks-…` (reziprok) | „… beim Schreiben mit [Copilot für Word](…)" |
| `copilot-agent-mode-word-excel-powerpoint` | 1 | `copilot-tipps-tricks-produktivitaet` | „… der [Agent Mode in Word, Excel, PowerPoint](…)" |
| `interne-copilot-trainer-ausbilden` | 1 | `copilot-training-schulung`; `warum-verteiltes-lernen` | „… [interne Copilot-Trainer ausbilden](…)" |
| `copilot-chat-free-pernod-ricard` | 2 | `copilot-unternehmensweit-einfuehren` | „… Praxisbeispiel [Copilot Chat bei Pernod Ricard](…)" |
| `copilot-hr-use-cases` | 2 | `copilot-vertrieb-use-cases` (Schwester-Use-Case) | „… analog die [HR-Use-Cases](…)" |
| `eu-ai-act-mitarbeiter-schulung-august-2026` (B3a) | 1 | `ki-schulung-mitarbeiter-pflicht`; `copilot-betriebsrat` | „… zur [Schulungspflicht ab August 2026](…)" — beschleunigt frische Indexierung |

## Quellseiten-Lastverteilung (damit keine Seite überfrachtet wird)

Maximal 2 neue ausgehende Links pro Quellseite in dieser Welle. Geplante Last:
- `copilot-tipps-tricks-produktivitaet`: 3 → bei Umsetzung auf 2 begrenzen, dritten Link auf `copilot-adoption-2026-zahlen` verschieben.
- `copilot-training-schulung`, `copilot-sicherheit-datenschutz`, `copilot-unternehmensweit-einfuehren`: je 2 — ok.

## IndexNow + GSC-Resubmit (nach Einbau & Deploy)

Sobald die Links live sind, alle Zielseiten anpingen:

```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host":"copilotenschule.de",
    "key":"02184b6b954d4a158c75668dbf809161",
    "keyLocation":"https://copilotenschule.de/02184b6b954d4a158c75668dbf809161.txt",
    "urlList":[
      "https://copilotenschule.de/wissen/microsoft-copilot-varianten-unterschiede",
      "https://copilotenschule.de/wissen/copilot-pages-loop-notebooks-sharepoint-workflows",
      "https://copilotenschule.de/wissen/copilot-in-teams-zeit-gewinnen",
      "https://copilotenschule.de/wissen/microsoft-copilot-schulung-online",
      "https://copilotenschule.de/wissen/bessere-entscheidungen-mit-ki",
      "https://copilotenschule.de/wissen/copilot-betriebsrat",
      "https://copilotenschule.de/wissen/copilot-flex-routing-eu-verarbeitung",
      "https://copilotenschule.de/wissen/copilot-fuer-word",
      "https://copilotenschule.de/wissen/copilot-agent-mode-word-excel-powerpoint",
      "https://copilotenschule.de/wissen/interne-copilot-trainer-ausbilden",
      "https://copilotenschule.de/wissen/copilot-chat-free-pernod-ricard",
      "https://copilotenschule.de/wissen/copilot-hr-use-cases",
      "https://copilotenschule.de/wissen/eu-ai-act-mitarbeiter-schulung-august-2026"
    ]
  }'
```

GSC zusätzlich: für die hartnäckigsten „gecrawlt – nicht indexiert"-Seiten manuelle Indexierungsanfrage (Tageslimit ~10).

## Umsetzungs-Checkliste (bei Freigabe)

1. Pro Link: nur EINEN additiven Satz/Halbsatz in der Quellseite ergänzen, bestehende Sätze unangetastet.
2. Interne Links als Router-`Link`/relativer `/wissen/...`-Pfad (konsistent mit Bestand der jeweiligen Datei).
3. `npm run build:prerender` muss fehlerfrei durchlaufen (validate-seo inklusive).
4. `DONT-TOUCH-LIST.md` gegenprüfen — keine Title/Meta/Canonical-Änderung, nur additiver Body-Link.
5. Kein eigenständiger Push — Martin committet/pusht via GitHub Desktop.
6. Nach Deploy: IndexNow-Ping (oben) + Status-Log-Eintrag.

## Erwartete Wirkung & Messung

- Erwartung: gecrawlt/gefunden-nicht-indexiert sinkt in 1–2 Wochen weiter (Trend 09.→15.06.: 20 → 9 gecrawlt-nicht-indexiert bei vergleichbarer Maßnahme).
- Messung: Cron `copilotenschule-seo-index-coverage-recheck` am 30.06. — prüft je Zielseite den GSC-Indexstatus, pingt Nachzügler nach, schreibt Ergebnis ins Status-Log und setzt A6 ggf. auf ✅.
