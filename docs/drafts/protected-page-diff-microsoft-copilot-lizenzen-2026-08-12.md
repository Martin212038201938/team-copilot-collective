# Protected-Page-Änderung: `/wissen/microsoft-copilot-lizenzen`

**Datum:** 12. August 2026
**Anlass:** Bremse Nr. 1 aus `docs/seo-monatsreview-2026-08.md` (34.542 Impr./3M, 204 Klicks, CTR 0,6 % vs. Site-Schnitt 1,2 %)
**Scope:** ausschließlich (a) Such-Snippet und (b) Kosten-/Preis-Antwortbox. Angebots-CTA-Brücke und andere Seiten sind NICHT Teil dieser Änderung.
**Geänderte Datei:** `src/pages/CopilotLicenses.tsx`

---

## 1. Berührte Protected URL

`/wissen/microsoft-copilot-lizenzen`
Rankings laut `docs/protected-pages.md`: Position 3 („Microsoft Copilot Kosten/Lizenz 2026"), Position 6 („lohnt sich Microsoft Copilot KMU"), Sekundärkreis ~#7.

## 2. Was ändert sich

| Element | Status |
|---|---|
| **H1** | **unverändert** — „Microsoft Copilot Lizenzen: Preisvergleich 2026" |
| **Canonical** | **unverändert** — `https://copilotenschule.de/wissen/microsoft-copilot-lizenzen` |
| **Erste 100 Wörter** | **unverändert** — Schnellantwort-Block bleibt wortgleich der erste Inhalt |
| **Title** | geändert (Diff unten) |
| **Meta-Description** | geändert (Diff unten) |
| **Article-Schema `description`** | geändert (Konsistenz zur neuen Meta, „Stand Juli" → „Stand August") |
| **`dateModified` / `modifiedTime` / `lastUpdated`** | 04.08.2026 → 12.08.2026 |
| **Content** | rein additiv: neue Sektion `#was-kostet-copilot` nach der Schnellantwort |

### Title-Diff

```
alt: Copilot Kosten & Lizenzen 2026: ab 15,60 €/Nutzer – Vergleich      (61 Zeichen)
neu: Copilot Kosten & Lizenzen 2026: 15,60–26 € pro Nutzer/Monat        (59 Zeichen)
```

Die ersten 31 Zeichen — also der ranking-tragende Teil mit beiden Head-Terms („Kosten", „Lizenzen") — sind **identisch**. Verändert wurde nur der Schwanz, der in der SERP ohnehin hinter dem Brand-Suffix `| copilotenschule.de` abgeschnitten wird. `ab 15,60 €/Nutzer – Vergleich` (Teaserpreis ohne Zeitbezug) wird ersetzt durch die vollständige Preisspanne mit Einheit. Begründung: Nutzer mit der Query „copilot kosten" wollen die Bandbreite, nicht den Lockpreis; ein „ab"-Preis ohne Obergrenze erzeugt Unsicherheit statt Klick.

### Meta-Description-Diff

```
alt: Microsoft Copilot Kosten 2026: Business ab 15,60 €, Enterprise 26 €. Lizenzvergleich,
     ROI-Rechner und Empfehlung für Ihr Unternehmen – Stand Juli 2026.               (151 Zeichen)

neu: Was kostet Microsoft Copilot? Preise 2026: Copilot Business 15,60 €, Enterprise 26 €
     pro Nutzer/Monat – mit Grundlizenz 28–64 €. Stand August 2026.                  (147 Zeichen)
```

Drei Änderungen mit je einem Zweck:

1. Einstieg als wörtliche Frage („Was kostet Microsoft Copilot?") — trifft die Suchintention hinter „copilot kosten" / „copilot lizenz kosten" direkt.
2. Ergänzung „pro Nutzer/Monat" und „mit Grundlizenz 28–64 €" — das Gesamtkosten-Argument ist der inhaltliche Vorsprung gegenüber den Wettbewerbern in der SERP, die nur den Add-on-Preis nennen.
3. „Stand Juli 2026" → „Stand August 2026" — die Seite war zuletzt am 04.08. aktualisiert, das Snippet behauptete Juli. Ein veralteter Stand im Snippet kostet bei Preis-Queries direkt Klicks.

Nicht mehr enthalten: „Lizenzvergleich, ROI-Rechner und Empfehlung". Der Vergleichs- und ROI-Aspekt bleibt über Title („Lizenzen") und den Seiteninhalt abgedeckt; im Snippet trägt die konkrete Zahl mehr als die Feature-Aufzählung.

## 3. Additive Content-Änderung (Hebel b)

Neue Sektion `#was-kostet-copilot`, eingefügt **nach** dem bestehenden Schnellantwort-Block und **vor** dem ROI-Teaser. Die Schnellantwort beantwortet „welche Lizenz brauche ich" — die Kosten-Antwort fehlte oben komplett und stand erst ~600 Zeilen weiter unten unter `#kosten-unternehmen`.

Inhalt: Ein-Satz-Kernaussage (Copilot ist ein Add-on, keine eigenständige Lizenz), Preistabelle mit drei Zeilen (Copilot Business 15,60 €, Copilot Enterprise 26,00 €, Gesamtkosten inkl. Grundlizenz 27,73–63,78 €), Quellenangabe und Sprungmarke zur ausführlichen Kostenrechnung. Zusätzlich neuer Eintrag im Inhaltsverzeichnis.

Alle Zahlen am 12.08.2026 direkt gegen microsoft.com/de-de geprüft:

| Wert | Quelle |
|---|---|
| Copilot Business 15,60 € (reduziert von 18,20 €), Jahresabo, zzgl. MwSt. | [microsoft.com – Copilot Business](https://www.microsoft.com/de-de/microsoft-365/copilot/business) |
| Microsoft 365 Copilot 26,00 € bei jährlicher Abrechnung, 27,30 € bei monatlicher Zahlung, zzgl. MwSt., nur als Add-on | [microsoft.com – Copilot für Microsoft 365](https://www.microsoft.com/de-de/microsoft-365/enterprise/copilot-for-microsoft-365) |
| Business Standard 12,13 € / Business Premium 19,06 € / M365 E3 37,78 € (Basis der Gesamtkosten-Beispiele) | bereits im Artikel belegt, Stand-Juli-Preiserhöhung; Standard-Preis am 12.08. gegengeprüft |

Bewusst **nicht** übernommen: das im Artikel genannte Aktions-Enddatum 30.09.2026. Microsoft weist auf der Preisseite aktuell kein Enddatum aus, externe Quellen nennen widersprüchliche Termine (30.06. bzw. 30.09.). Die neue Box schreibt deshalb nur „Aktionspreis, regulär 18,20 €". Der bestehende Datumshinweis weiter unten im Artikel wurde nicht angefasst — **offener Punkt zum Nachprüfen.**

## 4. Verifikation

`npm run build:prerender` — Vite-Build fehlerfrei (2236 Module), `validate-seo.js` ohne Fehler für diese Route. Der react-snap-Schritt bricht lokal ab, weil in der Cowork-Linux-VM kein Chromium installiert ist (`Chromium revision is not downloaded`) — Umgebungsproblem, kein Codefehler; in GitHub Actions läuft der Schritt normal.

Ersatzweise wurde das gebaute Bundle mit Chromium gerendert und gemäß Snippet aus `docs/protected-pages.md` gegen das Live-HTML gediffed:

```
  <link rel="canonical" href="https://copilotenschule.de/wissen/microsoft-copilot-lizenzen">   ← identisch
- <meta name="description" content="Was kostet Microsoft Copilot? Preise 2026: …">             ← neu
- <title>Copilot Kosten & Lizenzen 2026: 15,60–26 € pro Nutzer/Monat | copilotenschule.de</title> ← neu
+ <meta name="description" content="Microsoft Copilot Kosten 2026: Business ab 15,60 €, …">    ← live/alt
+ <title>Copilot Kosten & Lizenzen 2026: ab 15,60 €/Nutzer – Vergleich | copilotenschule.de</title> ← live/alt
```

Genau die zwei beabsichtigten Abweichungen, Canonical identisch. Zusätzlich im Render geprüft: H1 unverändert, Schnellantwort-Block unverändert an erster Position, neue Kostenbox rendert korrekt.

## 5. Reversibilität und Messung

**Reversibel:** ja, vollständig. Rollback = die sechs Zeilen-Änderungen aus Abschnitt 2 zurücksetzen und die Sektion `#was-kostet-copilot` samt ToC-Eintrag entfernen. Es wurden keine Dateien, Routen, Slugs oder Schema-IDs verschoben oder gelöscht.

**Testbar:** ja. Reine Snippet-Änderung ohne URL-Wechsel — die GSC-Zeitreihe der Seite läuft durch, Vorher/Nachher ist an derselben URL direkt vergleichbar.

**KPI und Messfenster:**

- Seiten-CTR von 0,6 % auf ≥ 1,2 % (Site-Schnitt), Messfenster 6 Wochen ab Deployment
- Klicks im Cluster „copilot kosten" / „copilot lizenz" / „copilot lizenz kosten" / „copilot preise" +50 %
- **Kontrollmetrik (Abbruchkriterium):** Durchschnittsposition der Seite. Fällt sie im Kosten/Lizenz-Cluster um mehr als eine Position, ohne dass die CTR steigt, wird der Title zurückgerollt.

Erste Zwischenmessung sinnvollerweise nach 14 Tagen (GSC-Daten hinken ~3 Tage nach), Entscheidung über Rollback oder Ausrollen des Musters auf weitere Seiten nach 6 Wochen.

## 6. Nach dem Deployment

1. GSC URL-Inspection für `/wissen/microsoft-copilot-lizenzen`, Indexierung neu anfordern.
2. IndexNow-Ping:

```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "copilotenschule.de",
    "key": "02184b6b954d4a158c75668dbf809161",
    "keyLocation": "https://copilotenschule.de/02184b6b954d4a158c75668dbf809161.txt",
    "urlList": ["https://copilotenschule.de/wissen/microsoft-copilot-lizenzen"]
  }'
```

3. Aktions-Enddatum für Copilot Business (30.09.2026?) an einer belastbaren Microsoft-Quelle klären und im Artikel korrigieren oder streichen.
