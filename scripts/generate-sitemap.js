/**
 * Sitemap Generator für copilotenschule.de
 *
 * Generiert sitemap.xml automatisch mit allen öffentlichen Seiten:
 * - Statische Seiten (Homepage, Impressum, etc.)
 * - Wissensseiten (Knowledge Pages)
 * - Trainingsseiten
 * - Trainer-Profile
 *
 * Wird im Build-Prozess ausgeführt: npm run generate-sitemap
 *
 * Lastmod-Strategie (wichtig für SEO!):
 * - Wissens-Artikel: publishDate aus src/data/articles.ts (echtes Veröffentlichungsdatum)
 * - Trainings/Workshops/Trainer/Static: letzte Änderung der entsprechenden Quelldatei
 *   (ermittelt via `git log -1 --pretty=format:%ai`)
 * - Fallback (falls git fehlt oder unbekannt): SITE_BASELINE_DATE als evergreen-Marker
 *
 * Warum nicht TODAY für alle? Sitemap mit lastmod=heute für 70 Seiten signalisiert Google
 * "Massen-Update" — schädlich für SEO. Echte Daten zeigen: strukturelle Pflege, kein Spam.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const BASE_URL = 'https://copilotenschule.de';
const TODAY = new Date().toISOString().split('T')[0];
// Konservatives Fallback-Datum für Seiten, deren Update-Zeitpunkt nicht ermittelbar ist
const SITE_BASELINE_DATE = '2026-01-15';

// Hardcoded Fallback-lastmod, falls git history nicht verfügbar ist (Shallow Clone in CI).
// Diese Daten sollten manuell aktualisiert werden, wenn die jeweilige Datei
// strukturell überarbeitet wird. Stand: ermittelt aus `git log` am 2026-05-27.
const FALLBACK_LASTMOD = {
  'src/data/trainings.ts':   '2026-04-28',
  'src/data/workshops.ts':   '2026-04-27',
  'src/data/authors.ts':     '2026-04-27',
  'src/data/articles.ts':    '2026-05-25',
  'src/App.tsx':             '2026-05-25',
  'src/pages/Index.tsx':              '2026-02-04',
  'src/pages/UnsereAngebote.tsx':     '2026-04-28',
  'src/pages/UeberUns.tsx':           '2026-04-01',
  'src/pages/BecomeTrainer.tsx':      '2026-04-27',
  'src/pages/TrainingKonfigurator.tsx': '2026-04-23',
  'src/pages/Impressum.tsx':          '2026-02-18',
  'src/pages/Datenschutz.tsx':        '2026-05-27',
};

// ──────────────────────────────────────────────────────────────
// Hilfsfunktionen für individuelles lastmod
// ──────────────────────────────────────────────────────────────

/**
 * Holt das letzte git-commit-Datum einer Datei (ISO YYYY-MM-DD).
 *
 * Vorrang-Reihenfolge:
 *   1. `git log` mit echtem Datum (wenn != TODAY und git history vorhanden)
 *   2. Hardcoded FALLBACK_LASTMOD-Map (für Shallow-Clone-Umgebungen wie GitHub Actions)
 *   3. SITE_BASELINE_DATE als letzter Notnagel
 *
 * Warum die Sonderbehandlung für TODAY?
 * Wenn `git log` in einem Shallow Clone aufgerufen wird, liefert es für jede Datei
 * das HEAD-Commit-Datum (= heute) zurück, weil ältere Commits nicht im lokalen
 * .git-Repo sind. Wenn wir das blind übernehmen, deklariert die Sitemap alle URLs
 * als "heute geändert" — Massen-Update-Signal an Google. Stattdessen erkennen wir
 * dieses Muster und fallen auf die hardcoded Map zurück.
 */
function gitLastModified(relPath) {
  let gitDate = null;
  try {
    const abs = path.join(ROOT, relPath);
    if (!fs.existsSync(abs)) return FALLBACK_LASTMOD[relPath] || SITE_BASELINE_DATE;
    const out = execSync(
      `git log -1 --format=%cd --date=short -- "${relPath}"`,
      { cwd: ROOT, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    if (out && /^\d{4}-\d{2}-\d{2}$/.test(out)) gitDate = out;
  } catch {
    // git nicht verfügbar oder Fehler
  }

  // Wenn git ein Datum liefert, das != TODAY ist, ist es vertrauenswürdig
  if (gitDate && gitDate !== TODAY) return gitDate;

  // Sonst: hardcoded Fallback verwenden
  return FALLBACK_LASTMOD[relPath] || SITE_BASELINE_DATE;
}

/**
 * Liest src/data/articles.ts und extrahiert für jede id das publishDate.
 * Gibt eine Map slug → "YYYY-MM-DD" zurück.
 */
function readArticlePublishDates() {
  const file = path.join(ROOT, 'src', 'data', 'articles.ts');
  if (!fs.existsSync(file)) return new Map();
  const content = fs.readFileSync(file, 'utf-8');
  const map = new Map();
  // Match Blöcke: { ... id: "slug", ... publishDate: "YYYY-MM-DD" ... }
  const re = /\{\s*[^}]*?id:\s*["']([^"']+)["'][^}]*?publishDate:\s*["'](\d{4}-\d{2}-\d{2})["'][^}]*?\}/gs;
  let m;
  while ((m = re.exec(content)) !== null) {
    map.set(m[1], m[2]);
  }
  return map;
}

/**
 * Gibt einen lastmod-Wert für eine /wissen/-URL zurück:
 * Erst aus articles.ts publishDate, sonst aus git log auf die TSX-Datei,
 * sonst SITE_BASELINE_DATE.
 */
function wissenLastmod(slug, articleDates) {
  if (articleDates.has(slug)) return articleDates.get(slug);
  // Fallback: TSX-Datei finden (heuristisch über slug-Match)
  const pagesDir = path.join(ROOT, 'src', 'pages');
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
    for (const f of files) {
      const c = fs.readFileSync(path.join(pagesDir, f), 'utf-8');
      if (c.includes(`const SLUG = "${slug}"`) || c.includes(`const SLUG = '${slug}'`)) {
        return gitLastModified(`src/pages/${f}`);
      }
    }
  }
  return SITE_BASELINE_DATE;
}

// ──────────────────────────────────────────────────────────────
// Aufgelöste lastmod-Quellen
// ──────────────────────────────────────────────────────────────

const articleDates = readArticlePublishDates();

// Für Trainings/Workshops verwenden wir das letzte Update der jeweiligen Datenquelle.
// Das ist konsistent und nachvollziehbar — eine Änderung an trainings.ts spiegelt sich
// in allen Trainings-Einträgen wider. (Wenn das später feiner pro Slug nötig wird,
// kann man ein lastUpdated-Feld in trainings.ts ergänzen.)
const TRAININGS_LASTMOD = gitLastModified('src/data/trainings.ts');
const WORKSHOPS_LASTMOD = gitLastModified('src/data/workshops.ts');
const AUTHORS_LASTMOD = gitLastModified('src/data/authors.ts');
const APP_LASTMOD = gitLastModified('src/App.tsx');

// ──────────────────────────────────────────────────────────────
// Page-Listen mit echten lastmod-Werten
// ──────────────────────────────────────────────────────────────

// Statische Seiten — lastmod aus der jeweiligen TSX-Datei
const staticPages = [
  { loc: '/',                       lastmod: gitLastModified('src/pages/Index.tsx'),                changefreq: 'weekly',  priority: 1.0 },
  { loc: '/trainings',              lastmod: TRAININGS_LASTMOD,                                     changefreq: 'weekly',  priority: 0.9 },
  { loc: '/workshops',              lastmod: WORKSHOPS_LASTMOD,                                     changefreq: 'weekly',  priority: 0.9 },
  { loc: '/wissen',                 lastmod: gitLastModified('src/data/articles.ts'),               changefreq: 'weekly',  priority: 0.9 },
  { loc: '/unsere-angebote',        lastmod: gitLastModified('src/pages/UnsereAngebote.tsx'),       changefreq: 'weekly',  priority: 0.85 },
  { loc: '/ueber-uns',              lastmod: gitLastModified('src/pages/UeberUns.tsx'),             changefreq: 'monthly', priority: 0.7 },
  { loc: '/trainer-werden',         lastmod: gitLastModified('src/pages/BecomeTrainer.tsx'),        changefreq: 'monthly', priority: 0.6 },
  { loc: '/training-konfigurator',  lastmod: gitLastModified('src/pages/TrainingKonfigurator.tsx'), changefreq: 'monthly', priority: 0.8 },
  { loc: '/impressum',              lastmod: gitLastModified('src/pages/Impressum.tsx'),            changefreq: 'yearly',  priority: 0.3 },
  { loc: '/datenschutz',            lastmod: gitLastModified('src/pages/Datenschutz.tsx'),          changefreq: 'yearly',  priority: 0.3 },
];

// Wissensseiten — lastmod aus articles.ts publishDate (echtes Veröffentlichungsdatum)
const knowledgeSlugs = [
  'github-copilot', 'copilot-studio', 'prompt-engineering', 'copilot-fehler-vermeiden',
  'ki-agenten', 'microsoft-copilot-lizenzen', 'copilot-roi-berechnen', 'copilot-fuer-word',
  'copilot-sicherheit-datenschutz', 'copilot-tipps-tricks-produktivitaet', 'copilot-training-schulung',
  'ki-realitaet-beratungsfirmen-2026', 'copilot-unternehmensweit-einfuehren',
  'prompt-bibliotheken-vs-training', 'copilot-digitales-gedaechtnis', 'copilot-launch-kampagne',
  'copilot-roi-erfolgsgeschichten', 'copilot-adoption-2026-zahlen', 'copilot-lernreise-vs-tagesschulung',
  'warum-verteiltes-lernen-bei-copilot-trainings-funktioniert', 'copilot-adhs-produktiver-arbeiten',
  'copilot-vertrieb-use-cases', 'copilot-hr-use-cases', 'ki-halluzinationen-vermeiden',
  'copilot-chat-free-pernod-ricard', 'copilot-agent-digitales-gedaechtnis', 'copilot-fuer-excel',
  'ki-schulung-mitarbeiter-pflicht', 'microsoft-365-e7-frontier-suite', 'claude-in-microsoft-copilot',
  'copilot-in-teams-zeit-gewinnen', 'copilot-in-outlook-nutzen-tipps', 'microsoft-copilot-schulung-online',
  'copilot-betriebsrat', 'copilot-in-excel-aktivieren', 'copilot-flex-routing-eu-verarbeitung',
  'copilot-im-unternehmen-einfuehren-leitfaden', 'bessere-entscheidungen-mit-ki',
  'copilot-pages-loop-notebooks-sharepoint-workflows', 'interne-copilot-trainer-ausbilden',
  'copilot-agent-mode-word-excel-powerpoint', 'copilot-schulungsanbieter-deutschland-vergleich',
  'microsoft-copilot-varianten-unterschiede', 'eu-ai-act-mitarbeiter-schulung-august-2026',
  'copilot-cowork-abrechnung-copilot-credits', 'welche-daten-sieht-microsoft-365-copilot',
  'copilot-update-juni-2026',
];

const knowledgePages = knowledgeSlugs.map(slug => ({
  loc: `/wissen/${slug}`,
  lastmod: wissenLastmod(slug, articleDates),
  changefreq: 'monthly',
  priority: slug === 'copilot-schulungsanbieter-deutschland-vergleich' ? 0.9 : 0.8,
}));

// Trainings — lastmod aus dem letzten Update der trainings.ts (konsistent für alle)
const trainingsSlugs = [
  'copilot-grundlagen-prompt-design', 'microsoft-365-copilot-praxis', 'ausbildung-ki-wissensarbeiter',
  'train-the-trainer-copilot', 'github-copilot-entwickler', 'copilot-compliance-datenschutz',
  'copilot-studio-ki-agenten', 'low-code-power-platform', 'eu-ai-act-pflichtschulung',
  'copilot-lernreise-8-wochen', 'individuelle-copilot-schulung',
];

const trainingPages = trainingsSlugs.map(slug => ({
  loc: `/trainings/${slug}`,
  lastmod: TRAININGS_LASTMOD,
  changefreq: 'monthly',
  priority: 0.8,
}));

// Workshops — lastmod aus dem letzten Update der workshops.ts
const workshopsSlugs = [
  'copilot-change-programm', 'copilot-strategie-change-management',
  'betriebsrat-ki-workshop', 'copilot-hackathon', 'keynote-copilot-arbeitswelt',
  'copilot-launch-eventtag', 'bessere-entscheidungen-mit-copilot',
];

const workshopPages = workshopsSlugs.map(slug => ({
  loc: `/workshops/${slug}`,
  lastmod: WORKSHOPS_LASTMOD,
  changefreq: 'monthly',
  priority: 0.8,
}));

// Trainer-Profile — lastmod aus authors.ts
const trainerProfiles = [
  { loc: '/trainer/martin-lang', lastmod: AUTHORS_LASTMOD, changefreq: 'monthly', priority: 0.7 },
];

// Guidelines und Checklisten (Gated Downloads / Honeypots) — /guidelines/<slug>
// lastmod = publishDate des jeweiligen Leitfadens (siehe src/data/guides.ts)
const guidelinePages = [
  { loc: '/guidelines',                                        lastmod: '2026-07-13', changefreq: 'monthly', priority: 0.7 },
  { loc: '/guidelines/copilot-grounding-admin-leitfaden',      lastmod: '2026-07-13', changefreq: 'monthly', priority: 0.8 },
  { loc: '/guidelines/copilot-grounding-management-leitfaden', lastmod: '2026-07-13', changefreq: 'monthly', priority: 0.8 },
  { loc: '/guidelines/copilot-grounding-betriebsrat-leitfaden', lastmod: '2026-07-13', changefreq: 'monthly', priority: 0.8 },
  { loc: '/guidelines/copilot-einfuehren-management-leitfaden',  lastmod: '2026-07-14', changefreq: 'monthly', priority: 0.8 },
  { loc: '/guidelines/copilot-einfuehren-betriebsrat-leitfaden', lastmod: '2026-07-14', changefreq: 'monthly', priority: 0.8 },
  { loc: '/guidelines/copilot-einfuehren-admin-leitfaden',       lastmod: '2026-07-14', changefreq: 'monthly', priority: 0.8 },
  // PDF-Volltexte: bewusst in der Sitemap, damit Suchmaschinen/LLMs den Inhalt crawlen dürfen.
  // Für menschliche Nutzer bleiben sie hinter dem E-Mail-Formular (kein sichtbarer Link vor Absenden).
  { loc: '/downloads/Copilot-Grounding-Admin-Leitfaden.pdf',      lastmod: '2026-07-13', changefreq: 'yearly', priority: 0.5 },
  { loc: '/downloads/Copilot-Grounding-Management-Leitfaden.pdf', lastmod: '2026-07-13', changefreq: 'yearly', priority: 0.5 },
  { loc: '/downloads/Copilot-Grounding-Betriebsrat-Leitfaden.pdf', lastmod: '2026-07-13', changefreq: 'yearly', priority: 0.5 },
  { loc: '/downloads/Copilot-Einfuehrung-Management-Leitfaden.pdf', lastmod: '2026-07-14', changefreq: 'yearly', priority: 0.5 },
  { loc: '/downloads/Copilot-Einfuehrung-Betriebsrat-Leitfaden.pdf', lastmod: '2026-07-14', changefreq: 'yearly', priority: 0.5 },
  { loc: '/downloads/Copilot-Einfuehrung-Admin-Leitfaden.pdf', lastmod: '2026-07-14', changefreq: 'yearly', priority: 0.5 },
];

// Alle Seiten zusammenführen
const allPages = [
  ...staticPages,
  ...knowledgePages,
  ...trainingPages,
  ...workshopPages,
  ...trainerProfiles,
  ...guidelinePages,
];

// XML generieren
function generateSitemapXML(entries) {
  const urlEntries = entries.map(entry => `  <url>
    <loc>${BASE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Automatisch generiert am ${TODAY} -->
  <!-- ${entries.length} URLs insgesamt | lastmod aus echten Update-Daten (articles.ts publishDate, git log) -->
${urlEntries}
</urlset>
`;
}

// Hauptfunktion
function main() {
  const sitemap = generateSitemapXML(allPages);

  // Schreibe in public/ für den Build
  const publicPath = path.join(ROOT, 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemap, 'utf-8');

  // Verteilung der lastmod-Daten zur Selbstkontrolle
  const distribution = {};
  for (const e of allPages) distribution[e.lastmod] = (distribution[e.lastmod] || 0) + 1;
  const sortedDates = Object.keys(distribution).sort();

  console.log(`✅ Sitemap generiert: ${publicPath}`);
  console.log(`   ${allPages.length} URLs enthalten`);
  console.log(`   lastmod-Verteilung (echte Update-Daten):`);
  for (const d of sortedDates) {
    console.log(`     ${d}: ${distribution[d]} URLs`);
  }
}

main();
