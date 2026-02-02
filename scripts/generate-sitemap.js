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
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://copilotenschule.de';
const TODAY = new Date().toISOString().split('T')[0];

// Statische Seiten
const staticPages = [
  { loc: '/', lastmod: TODAY, changefreq: 'weekly', priority: 1.0 },
  { loc: '/unsere-angebote', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/wissen', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/ueber-uns', lastmod: TODAY, changefreq: 'monthly', priority: 0.7 },
  { loc: '/trainer-werden', lastmod: TODAY, changefreq: 'monthly', priority: 0.6 },
  { loc: '/training-konfigurator', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/impressum', lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
  { loc: '/datenschutz', lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
];

// Wissensseiten (Knowledge Pages) mit direktem Slug
const knowledgePages = [
  { loc: '/github-copilot', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/copilot-studio', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/prompt-engineering', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/copilot-fehler-vermeiden', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/ki-agenten', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/microsoft-copilot-lizenzen', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
];

// Wissensseiten unter /wissen/ Pfad
const wissenSubpages = [
  { loc: '/wissen/copilot-roi-berechnen', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-fuer-word', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
];

// Trainingsseiten - Slugs aus trainings.ts
const trainingsSlugs = [
  'copilot-grundlagen-prompt-design',
  'microsoft-365-copilot-praxis',
  'ausbildung-ki-wissensarbeiter',
  'github-copilot-entwickler',
  'copilot-compliance-datenschutz',
  'copilot-strategie-change-management',
  'copilot-studio-ki-agenten',
  'chatbot-workshop',
  'low-code-power-platform',
  'eu-ai-act-pflichtschulung',
  'copilot-hackathon',
  'keynote-copilot-arbeitswelt',
  'copilot-lernreise-8-wochen',
  'copilot-launch-eventtag',
  'individuelle-copilot-schulung',
];

const trainingPages = trainingsSlugs.map(slug => ({
  loc: `/trainings/${slug}`,
  lastmod: TODAY,
  changefreq: 'monthly',
  priority: 0.8,
}));

// Trainer-Profile
const trainerProfiles = [
  { loc: '/trainer/martin-lang', lastmod: TODAY, changefreq: 'monthly', priority: 0.7 },
];

// Alle Seiten zusammenführen
const allPages = [
  ...staticPages,
  ...knowledgePages,
  ...wissenSubpages,
  ...trainingPages,
  ...trainerProfiles,
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
  <!-- ${entries.length} URLs insgesamt -->
${urlEntries}
</urlset>
`;
}

// Hauptfunktion
function main() {
  const sitemap = generateSitemapXML(allPages);

  // Schreibe in public/ für den Build
  const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemap, 'utf-8');

  console.log(`✅ Sitemap generiert: ${publicPath}`);
  console.log(`   ${allPages.length} URLs enthalten`);
  console.log(`   Letzte Aktualisierung: ${TODAY}`);
}

main();
