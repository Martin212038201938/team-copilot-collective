# Website-Clone & Rebranding Runbook

Vollstaendige Anleitung um copilotenschule.de (oder einen bestehenden Clone) unter einer neuen Domain mit neuem Thema zu veroeffentlichen.

**Referenz-Projekt:** copilotenschule.de → chatgpt-trainings.de (87 Dateien, 1.642 Insertions, 23.168 Deletions)

---

## Phase 1: Infrastruktur (Schritte 1-3)

### Schritt 1: GitHub Repository
→ Siehe `skills/github-repo-manager/SKILL.md`

1. Neues Repo `Martin212038201938/[projektname]` erstellen
2. Quell-Repo klonen und Remote aendern
3. GitHub Secrets setzen: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
4. deploy.yml anpassen:
   - **LFTP statt FTP-Deploy-Action** (ECONNRESET-Bug mit AlwaysData!)
   - Domain in `server-dir`, Sitemap-URL, IndexNow anpassen

**deploy.yml Template (lftp):**
```yaml
- name: Install lftp
  run: sudo apt-get install -y lftp

- name: Deploy via LFTP
  run: |
    lftp -e "set ssl:verify-certificate no; set ftp:ssl-allow yes; set ftp:ssl-protect-data yes; mirror -R --delete dist/ /www/[DOMAIN]/ ; quit" -u ${{ secrets.FTP_USERNAME }},${{ secrets.FTP_PASSWORD }} ${{ secrets.FTP_SERVER }}
```

### Schritt 2: AlwaysData Provisioning
→ Siehe `skills/alwaysdata-provisioner/SKILL.md`

1. FTP-User anlegen (dediziert pro Projekt!)
2. Site anlegen mit Domain + `www` als Adressen
3. Force HTTPS aktivieren
4. **Domain registrieren** (Domains → Add a domain → Manage) ← WIRD OFT VERGESSEN!

### Schritt 3: DNS bei IONOS
→ Siehe `skills/ionos-domain-router/SKILL.md`

1. A-Record `@` → `185.31.40.15`
2. www wird automatisch angeboten (kein separater CNAME noetig)
3. Webhosting-Deaktivierungs-Warnung bestaetigen
4. 15-90 Min warten fuer DNS + Let's Encrypt

---

## Phase 2: Branding & Assets (Schritt 4)

### Schritt 4: Logo erstellen

Logo als einen der **ersten Schritte** erstellen – es wird an mindestens 5 Stellen referenziert:

| Datei | Was anpassen |
|---|---|
| `public/images/[logo].png` | Neue Datei erstellen |
| `index.html` | Favicon + OG-Image Referenzen |
| `src/components/Header.tsx` | Logo-Import |
| `src/components/Footer.tsx` | Logo-Import |
| `src/lib/organizationSchema.ts` | Logo-URL im Schema.org |

---

## Phase 3: Code-Anpassungen (Schritte 5-10)

### Schritt 5: Typ-System anpassen (ZUERST!)

**Reihenfolge: Types → Data → Components → Pages**

Das Typ-System in `trainings.ts` definiert die Produkt-Tiers. Beim Clone MUSS es zum neuen Thema passen.

```typescript
// VORHER (copilotenschule):
type CopilotTier = "standard" | "advanced" | "studio";

// NACHHER (chatgpt-trainings):
type ChatGPTTier = "free" | "paid";
```

Alle Dateien die diesen Typ importieren muessen ebenfalls angepasst werden. TypeScript-Compiler bricht sonst ab.

### Schritt 6: Trainingsdaten komplett umschreiben

`src/data/trainings.ts` komplett neu schreiben mit:
- Neuen Modul-Kategorien passend zum Thema
- Neuen Tier-Werten
- Neuen Beschreibungen

Auch `src/pages/Index.tsx` → `trainingModulesForSchema` Array komplett neu.

### Schritt 7: Wissensartikel ALLE loeschen

Alle Wissensartikel der Quell-Seite sind themenspezifisch und NICHT uebertragbar.

**An 5 Stellen deregistrieren:**

| # | Datei | Was entfernen |
|---|---|---|
| 1 | `src/pages/*.tsx` | TSX-Dateien loeschen |
| 2 | `src/App.tsx` | Import + Route entfernen |
| 3 | `src/pages/Wissen.tsx` | Eintrag aus `staticKnowledgeTopics` |
| 4 | `src/pages/EditorialCalendar.tsx` | Eintrag aus `DEFAULT_STATIC_ARTICLES` |
| 5 | `package.json` | Eintrag aus `reactSnap.include` |

**WARNUNG:** Wenn auch nur eine Stelle vergessen wird, bricht der Build ab (fehlende Imports oder react-snap-Fehler).

### Schritt 8: Schema.org + SEO-Metadaten

**Startpunkt:** `grep -r "[alte-domain]" src/` – es gibt IMMER mehr Stellen als man denkt.

**Checkliste der betroffenen Dateien:**

| Datei | Was anpassen |
|---|---|
| `src/lib/schema.ts` | Organization-Schema (Name, URL, Logo, Description) |
| `src/lib/organizationSchema.ts` | Komplett-Daten der neuen Organisation |
| `src/data/authors.ts` | Autor-Profil (neue Organisation, neue Bio) |
| `src/components/SEOHead.tsx` | Default-OG-Image und Site-Name |
| `public/sitemap.xml` | Alle URLs auf neue Domain |
| `public/robots.txt` | Sitemap-URL |
| `public/llm.txt` + `public/llms.txt` | LLM-Informationsdateien |
| `index.html` | Title, Meta-Tags, OG-Tags |

### Schritt 9: Content-Differenzierung (60% der Gesamtzeit!)

**Es gibt KEINE "quick find-and-replace" Loesung.** Google bestraft Duplicate Content massiv – beide Seiten verlieren Rankings.

**Komplett neu schreiben (eigene Tonalitaet, eigene Stats, eigene Value Proposition):**

| Datei | Warum komplett neu |
|---|---|
| `src/components/Hero.tsx` | Eigene Value Proposition, eigene Stats |
| `src/pages/BecomeTrainer.tsx` | Neue Trainer-Pfade, neue Job-Beschreibungen |
| `src/components/TrainingKonfigurator.tsx` | Neue Modul-Kategorien |
| `src/data/faqs.ts` | Kundenorientierte FAQs zum neuen Thema |
| `src/components/Benefits.tsx` | Eigene Verkaufsargumente |

**Anpassen reicht (aber trotzdem umschreiben, nicht nur Keywords tauschen):**
- Footer (Kontaktdaten, Links)
- Impressum (rechtliche Angaben)
- Datenschutz (Domain-spezifisch)

### Schritt 10: Global Grep – Restliche Referenzen

```bash
grep -r "[alte-domain]" src/ public/ index.html
```

Alles was noch auf die alte Domain verweist, muss angepasst werden. Typische Ueberbleibsel:
- Hardcoded URLs in Kommentaren
- Test-Daten
- README.md
- .env.example

---

## Phase 4: Build & Deploy (Schritte 11-12)

### Schritt 11: Build-Validierung (PFLICHT!)

```bash
npm run build
```

Der Build faengt ab:
- **Fehlende Imports** (geloeschte Dateien aber Route noch da)
- **TypeScript-Typ-Fehler** (falsches Typ-System)
- **react-snap Fehler** (fehlende Eintraege in include-Liste)
- **validate-seo.js Fehler** (falsche Canonical URLs)

**IMMER vor Git-Commit ausfuehren!**

### Schritt 12: Commit + Push + Live-Test

1. `git add -A && git commit -m "Initial clone: [neue-domain]"`
2. User pusht ueber GitHub Desktop (Sandbox hat keine Git-Credentials!)
3. GitHub Actions deployed automatisch
4. Live-Test: `curl -svI https://[neue-domain]`

**WICHTIG bei mehreren Repos:** Vor dem Push dem User explizit sagen: "Bitte stelle sicher, dass du im Repo **[exakter Name]** bist."

---

## Bekannte Fallstricke (Zusammenfassung)

| Problem | Loesung |
|---|---|
| FTP-Deploy-Action ECONNRESET | `lftp` verwenden |
| AlwaysData Domain nicht registriert | Domains → Add a domain → Manage |
| Build bricht ab nach Artikel-Loeschung | Alle 5 Registrierungsstellen bereinigen |
| TypeScript-Fehler nach Typ-Aenderung | Types → Data → Components → Pages Reihenfolge |
| Duplicate Content Penalty | JEDEN sichtbaren Text eigenstaendig schreiben |
| Push ins falsche Repo | `git revert` (NIEMALS reset --hard) |
| index.lock blockiert Git | `rm .git/index.lock` |
| Sandbox kann nicht pushen | User muss ueber GitHub Desktop pushen |

---

## Zeitschaetzung

| Phase | Anteil | Beschreibung |
|---|---|---|
| Infrastruktur | ~10% | Repo, AlwaysData, DNS |
| Branding | ~5% | Logo, Assets |
| Code-Anpassungen | ~25% | Types, Schema, Routes |
| Content-Differenzierung | ~50% | Hero, Trainings, FAQs, BecomeTrainer |
| Build & Deploy | ~10% | Validierung, Fehlerbehebung, Live-Test |
