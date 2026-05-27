# Protected Pages — Ranking-Schutz für copilotenschule.de

**Stand:** 27. Mai 2026
**Geltungsbereich:** verbindlich für alle Pull Requests, die Code, Schema oder Content der unten gelisteten Routen ändern
**Bezug:** Maßnahme B1 aus `seo-massnahmenkatalog-2026-05-27.md`

---

## Warum diese Datei existiert

copilotenschule.de hat aktuell **4 Keywords in den Top 3** und **7 Keywords in den Top 10**. Diese Rankings sind das Ergebnis von Monaten organischer Arbeit. Jeder strukturelle Eingriff — vom Pre-Rendering-Fix (A2) bis zur Schema-Konsolidierung (C4) — birgt das Risiko, einzelne dieser Top-Rankings versehentlich zu beschädigen. Diese Datei ist das Werkzeug, das dieses Risiko sichtbar macht.

**Wichtiger Kontext aus dem A1-Audit:** Sechs der sieben unten gelisteten Top-Ranking-URLs zeigen im initialen HTML aktuell **keinen seitenspezifischen Title, keine Meta-Description und keinen Canonical-Tag**. Sie ranken nur, weil Googlebot ihren Content per JavaScript-Rendering einlesen kann. Sobald A2 (Pre-Render-Fix) live geht, werden diese Tags zum ersten Mal im initialen HTML sichtbar — das ist ein bewusster, gewollter Eingriff, aber er muss kontrolliert ablaufen, damit kein Title verändert wird, der aktuell für eine Top-3-Position verantwortlich ist.

---

## Protected URLs

Die URL-Zuordnung zu Keywords wurde aus den Health-Check-Reports rekonstruiert. **Vor dem ersten produktiven Einsatz dieser Liste zwingend per Google Search Console (URL-Inspection) verifizieren, welche konkrete URL für welches Keyword rankt.** Zwei Einträge sind eindeutig in den Reports benannt (mit Quelle markiert), die übrigen sind plausible Hypothesen.

| URL | Keyword | Position | Quelle in Reports | A1-Audit-Status |
|-----|---------|----------|-------------------|-----------------|
| `/wissen/copilot-roi-berechnen` | Copilot Training ROI Unternehmen | 1 | 2026-05-27 (Tabelle) | 🔴 kein Pre-Render |
| `/wissen/copilot-roi-berechnen` | Microsoft Copilot ROI berechnen | 7 | 2026-05-27 (Tabelle) | 🔴 kein Pre-Render |
| `/wissen/copilot-training-schulung` *(Hypothese)* | Copilot Training Mitarbeiter Unternehmen | 2 | 2026-05-27 (Tabelle) | 🔴 kein Pre-Render |
| `/wissen/copilot-im-unternehmen-einfuehren-leitfaden` | Microsoft Copilot unternehmensweit einführen | 2 | 2026-05-25 (explizit) | ✅ OK |
| `/wissen/microsoft-copilot-lizenzen` | Microsoft Copilot Kosten/Lizenz 2026 | 3 | 2026-05-27 (Tabelle) | 🔴 kein Pre-Render |
| `/wissen/microsoft-copilot-lizenzen` | lohnt sich Microsoft Copilot KMU | 6 | 2026-05-20 (explizit) | 🔴 kein Pre-Render |
| `/wissen/ki-schulung-mitarbeiter-pflicht` | KI Schulung Mitarbeiter Pflicht EU AI Act | 8 | 2026-05-23 (explizit) | ✅ OK |

### Was außerdem geschützt ist (Sekundärkreis)

Zwei URLs ranken aktuell **nicht in den Top 10**, sollten aber bei Eingriffen ebenfalls mit Vorsicht behandelt werden, weil sie in den Reports als „Aufsteiger" oder „kürzlich gefallen" markiert wurden:

| URL | Keyword | Stand laut Report |
|-----|---------|---------------------|
| `/wissen/microsoft-copilot-lizenzen` | Microsoft Copilot Training Empfehlung beste Anbieter Deutschland 2026 | ~#7 (Fall von #3 im Mai) — wird laut Strategie-Datei 25.05. ohnehin per Hub-Artikel B2 entlastet |
| `/wissen/copilot-roi-berechnen` | Microsoft Copilot ROI berechnen | aus #5 nach #7 gefallen — beobachten |

---

## PR-Regel — verbindlich

Jeder Pull Request, der mindestens eine der oben gelisteten Dateien (TSX, Schema, Daten, Layout, Stylesheet) anfasst, muss in der PR-Beschreibung **explizit Folgendes dokumentieren**:

1. **Welche der Protected URLs wird vom PR berührt?** (URL nennen)
2. **Was ändert sich an Title-Tag, Meta-Description, H1, Canonical, ersten 100 Wörtern oder Schema?**
   - „Keine inhaltliche Änderung, nur strukturelles Refactoring" ist eine zulässige Antwort, muss aber genau so geschrieben werden.
   - Jede andere Antwort verlangt einen Diff (alter Wert → neuer Wert) im PR-Body.
3. **Verifikation vor Merge:** lokal `npm run build:prerender` ausführen, dann das relevante `dist/<route>.html` mit dem Live-HTML der URL vergleichen. Vorschlag-Snippet:

```bash
URL="/wissen/copilot-roi-berechnen"
diff \
  <(grep -oE '<title[^>]*>[^<]+</title>|<meta[^>]*name="description"[^>]*>|<link[^>]*rel="canonical"[^>]*>' "dist${URL}.html" | sort) \
  <(curl -s -A "Googlebot" "https://copilotenschule.de${URL}" | grep -oE '<title[^>]*>[^<]+</title>|<meta[^>]*name="description"[^>]*>|<link[^>]*rel="canonical"[^>]*>' | sort)
```

4. **Nach Deploy:** GSC URL-Inspection für die betroffene URL ausführen und Indexierung erneut anfordern. IndexNow-Ping (automatisch per A5, sobald implementiert).

---

## Was diese Regel nicht abdeckt

- **Hub-Artikel und neue Seiten** (B2, B3) — die haben noch keine Rankings, deshalb keine Protected-Status.
- **Sitewide-Komponenten** wie `Header.tsx`, `Footer.tsx`, `SEOHead.tsx`: Änderungen daran berühren technisch alle Seiten. Für solche PRs greift die Regel aus Punkt 3 trotzdem — Diff-Check für mindestens die Protected URLs.
- **Reine Bug-Fixes ohne sichtbare Content-Änderung** (z. B. Tippfehler in einer Komponente, die nicht zu den Protected URLs gehört) — keine Pflicht-Doku, aber `npm run build:prerender` muss trotzdem fehlerfrei laufen.

---

## Aktualisierungs-Rhythmus

Diese Liste wird **wöchentlich** aktualisiert, sobald ein neuer Health-Check-Report bestätigt, dass eine URL in die Top 10 für ein Tracking-Keyword aufgestiegen ist. Verantwortlich: derjenige, der den Health Check zum Wochenanfang reviewt.

**Letzte Aktualisierung:** 2026-05-27 (initiale Anlage durch B1)
**Nächste Überprüfung:** nach erstem A1-Audit-Lauf nach A2-Fix (Indikator: Anzahl 🔴 sollte gegen 0 gehen)

---

*Diese Datei ist verbindlich für alle Beiträge zum Repository. Bei Fragen zur Auslegung: vorher klären, nicht im Nachhinein rechtfertigen.*
