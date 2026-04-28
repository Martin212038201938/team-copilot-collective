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
  { loc: '/trainings', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/workshops', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/wissen', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/ueber-uns', lastmod: TODAY, changefreq: 'monthly', priority: 0.7 },
  { loc: '/trainer-werden', lastmod: TODAY, changefreq: 'monthly', priority: 0.6 },
  { loc: '/training-konfigurator', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
];

// Alle Wissensseiten unter /wissen/ (konsolidiert)
// WICHTIG: Bei neuen Artikeln hier den Pfad hinzufügen!
const knowledgePages = [
  { loc: '/wissen/github-copilot', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/wissen/copilot-studio', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/wissen/prompt-engineering', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/wissen/copilot-fehler-vermeiden', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/wissen/ki-agenten', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/wissen/microsoft-copilot-lizenzen', lastmod: TODAY, changefreq: 'monthly', priority: 0.9 },
  { loc: '/wissen/copilot-roi-berechnen', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-fuer-word', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-sicherheit-datenschutz', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-tipps-tricks-produktivitaet', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-training-schulung', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/ki-realitaet-beratungsfirmen-2026', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-unternehmensweit-einfuehren', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/prompt-bibliotheken-vs-training', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-digitales-gedaechtnis', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-launch-kampagne', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-roi-erfolgsgeschichten', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-adoption-2026-zahlen', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-lernreise-vs-tagesschulung', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/warum-verteiltes-lernen-bei-copilot-trainings-funktioniert', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-adhs-produktiver-arbeiten', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-vertrieb-use-cases', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-hr-use-cases', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/ki-halluzinationen-vermeiden', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-chat-free-pernod-ricard', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-agent-digitales-gedaechtnis', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-fuer-excel', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/ki-schulung-mitarbeiter-pflicht', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/microsoft-365-e7-frontier-suite', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/claude-in-microsoft-copilot', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-in-outlook-nutzen-tipps', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/microsoft-copilot-schulung-online', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-betriebsrat', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-in-excel-aktivieren', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-flex-routing-eu-verarbeitung', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-im-unternehmen-einfuehren-leitfaden', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/bessere-entscheidungen-mit-ki', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/copilot-pages-loop-notebooks-sharepoint-workflows', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/wissen/interne-copilot-trainer-ausbilden', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
];

// Trainingsseiten - Slugs aus trainings.ts
// Hinweis: Die 6 Workshops-Slugs wurden nach /workshops/ migriert (siehe unten).
const trainingsSlugs = [
  'copilot-grundlagen-prompt-design',
  'microsoft-365-copilot-praxis',
  'ausbildung-ki-wissensarbeiter',
  'train-the-trainer-copilot',
  'github-copilot-entwickler',
  'copilot-compliance-datenschutz',
  'copilot-studio-ki-agenten',
  'low-code-power-platform',
  'eu-ai-act-pflichtschulung',
  'copilot-lernreise-8-wochen',
  'individuelle-copilot-schulung',
];

const trainingPages = trainingsSlugs.map(slug => ({
  loc: `/trainings/${slug}`,
  lastmod: TODAY,
  changefreq: 'monthly',
  priority: 0.8,
}));

// Workshops & Events - Slugs aus workshops.ts (eigene Kategorie parallel zu Trainings)
const workshopsSlugs = [
  'copilot-change-programm',
  'copilot-strategie-change-management',
  'chatbot-workshop',
  'betriebsrat-ki-workshop',
  'copilot-hackathon',
  'keynote-copilot-arbeitswelt',
  'copilot-launch-eventtag',
];

const workshopPages = workshopsSlugs.map(slug => ({
  loc: `/workshops/${slug}`,
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
  ...trainingPages,
  ...workshopPages,
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
