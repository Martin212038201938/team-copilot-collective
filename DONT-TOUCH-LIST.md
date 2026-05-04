# DON'T TOUCH — Performance-kritische Seiten

Stand: 2026-05-04. Diese Seiten dürfen durch die Stufe-1-Änderungen NICHT schlechter werden.

## GSC indexierte Seiten (22)

| URL | Datum letzter Crawl |
|---|---|
| /wissen/claude-in-microsoft-copilot | 24.04.2026 |
| /wissen/copilot-digitales-gedaechtnis | 23.04.2026 |
| / (Homepage) | 22.04.2026 |
| /wissen/ki-halluzinationen-vermeiden | 21.04.2026 |
| /wissen/copilot-sicherheit-datenschutz | 18.04.2026 |
| /trainings/keynote-copilot-arbeitswelt | 16.04.2026 |
| /wissen/copilot-im-unternehmen-einfuehren-leitfaden | 15.04.2026 |
| /wissen/copilot-training-schulung | 09.04.2026 |
| /trainings/individuelle-copilot-schulung | 08.04.2026 |
| /wissen/copilot-in-excel-aktivieren | 08.04.2026 |
| /wissen/copilot-adhs-produktiver-arbeiten | 01.04.2026 |
| /wissen/copilot-roi-berechnen | 01.04.2026 |
| /wissen/copilot-in-outlook-nutzen-tipps | 27.03.2026 |
| /wissen/copilot-vertrieb-use-cases | 24.03.2026 |
| /wissen/github-copilot | 19.03.2026 |
| /wissen/prompt-bibliotheken-vs-training | 19.03.2026 |
| /wissen/microsoft-365-e7-frontier-suite | 13.03.2026 |
| /wissen/ki-schulung-mitarbeiter-pflicht | 13.03.2026 |
| /wissen/prompt-engineering | 09.03.2026 |
| /wissen/copilot-adoption-2026-zahlen | 18.02.2026 |
| /wissen/copilot-fehler-vermeiden/ (mit Trailing Slash!) | 11.02.2026 |
| /github-copilot (alte URL, wird 301-redirected) | 05.02.2026 |

## LLM-Top-Performer (Bing AI Performance, 3 Monate, 20K Citations gesamt)

| URL | Citations | Risiko-Level |
|---|---|---|
| /wissen/microsoft-copilot-lizenzen | **13.6K** | KRITISCH ⭐⭐⭐ |
| /wissen/copilot-in-outlook-nutzen-tipps | 1.3K | sehr hoch |
| /wissen/copilot-studio | 1.0K | sehr hoch |
| /wissen/microsoft-365-e7-frontier-suite | 484 | hoch |
| /wissen/copilot-tipps-tricks-produktivitaet | 416 | hoch |
| / (Homepage) | 388 | hoch |
| /wissen/github-copilot | 351 | hoch |
| /microsoft-copilot-lizenzen/ (alte URL!) | 237 | mittel |
| /wissen/claude-in-microsoft-copilot | 176 | mittel |
| /wissen/copilot-sicherheit-datenschutz | 173 | mittel |
| /wissen/ki-agenten | 145 | mittel |
| /wissen/copilot-agent-digitales-gedaechtnis | 88 | mittel |
| /wissen/ki-realitaet-beratungsfirmen-2026 | 50 | mittel |
| /wissen/copilot-vertrieb-use-cases | 20 | niedrig |
| /wissen/copilot-fehler-vermeiden | 20 | niedrig |
| /wissen/copilot-fuer-excel | 18 | niedrig |
| /wissen/copilot-roi-berechnen | 18 | niedrig |
| /wissen/copilot-unternehmensweit-einfuehren | 14 | niedrig |
| /wissen/copilot-hr-use-cases | 13 | niedrig |
| /wissen/ki-halluzinationen-vermeiden | 12 | niedrig |

## GSC Top-Klick-Seiten (3 Monate, 232 Klicks)

| URL | Klicks | Impressionen |
|---|---|---|
| /wissen/claude-in-microsoft-copilot | 58 | 3.342 |
| /wissen/ki-halluzinationen-vermeiden | 51 | 2.094 |
| / | 26 | 2.286 |
| /wissen/copilot-in-excel-aktivieren | 13 | 1.326 |
| /wissen/copilot-in-outlook-nutzen-tipps | 13 | 818 |
| /wissen/microsoft-copilot-lizenzen | 9 | 6.763 (!!) |
| /wissen/copilot-tipps-tricks-produktivitaet | 9 | 174 |
| /wissen/copilot-vertrieb-use-cases | 7 | 141 |
| /wissen/copilot-sicherheit-datenschutz | 6 | 1.777 |

## Implikationen für Stufe 1

- **/wissen/copilot-in-excel-aktivieren** ist GSC-indexiert UND auf Bing-Liste — der Title-Bug ("| copilotenschule.de | copilotenschule.de") wird hier korrigiert. **Risiko:** Re-Crawl könnte Title-Update auslösen, aber neue Variante ist eindeutig besser. → Verschoben auf Stufe 2.
- **TrainingDetail-Seiten** /trainings/keynote-copilot-arbeitswelt + /trainings/individuelle-copilot-schulung + /trainings/microsoft-365-copilot-praxis sind alle DON'T TOUCH. Title-Duplikat-Fix in TrainingDetail.tsx betrifft sie alle. → Verschoben auf Stufe 2.
- **Default-Meta-Tags in index.html** dürfen KEIN Default-Canonical setzen. Sonst werden alle SPA-Fallback-Seiten als gleich-wie-Homepage markiert. → Nur generischer Title + Description, kein Canonical, kein robots-Tag.

## Alte URLs, die noch Citations bekommen — sollten 301-redirects haben

- `/microsoft-copilot-lizenzen/` (237 LLM-Citations) → 301 zu `/wissen/microsoft-copilot-lizenzen` ist NICHT gesetzt aktuell!
- `/copilot-fehler-vermeiden/` → bereits redirected
- `/ki-agenten/` → bereits redirected
- `/github-copilot` (1 Klick + 60 LLM-Citations) → bereits redirected

→ Ergänzung in .htaccess für Stufe 2: 301 für `/microsoft-copilot-lizenzen/` einrichten (NACH Test).
