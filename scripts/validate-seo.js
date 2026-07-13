/**
 * SEO Validation Script
 * Läuft als Pre-Build-Check und verhindert Canonical-URL-Mismatches.
 *
 * Prüft:
 * 1. Alle Wissens-Seiten haben clean SLUGs (ohne wissen/ Prefix)
 * 2. Alle pageUrl verwenden /wissen/${SLUG}
 * 3. Alle canonicalUrl nutzen {pageUrl} Variable (nicht hardcoded)
 * 4. Alle Breadcrumb-Hrefs haben /wissen/ Prefix
 * 5. Alle Wissen-Routen in App.tsx sind unter /wissen/
 * 6. Alle Wissen-Seiten sind in react-snap include-Liste
 * 7. Alle Wissen-Seiten sind in sitemap-Generator
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let errors = [];
let warnings = [];

// ──────────────────────────────────────────────
// 1. Wissensseiten in src/pages/ scannen
// ──────────────────────────────────────────────

function findWissenPages() {
  const pagesDir = path.join(ROOT, 'src', 'pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
  const wissenPages = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');

    // Nur Seiten mit generateSchemaIds(SLUG, 'wissen') sind Wissensartikel
    if (!content.includes("'wissen'") || !content.includes('generateSchemaIds')) continue;

    const slugMatch = content.match(/const SLUG\s*=\s*["']([^"']+)["']/);
    if (!slugMatch) {
      errors.push(`[${file}] Kein SLUG gefunden trotz wissen-Schema`);
      continue;
    }

    const slug = slugMatch[1];

    // Check 1: SLUG darf kein wissen/ Prefix haben
    if (slug.includes('wissen/')) {
      errors.push(`[${file}] SLUG enthält "wissen/" Prefix: "${slug}" → SLUG muss clean sein (z.B. "${slug.replace('wissen/', '')}")`);
    }

    // Check 2: pageUrl muss /wissen/${SLUG} verwenden
    const pageUrlPattern = new RegExp(`pageUrl\\s*=\\s*\`https://copilotenschule\\.de/wissen/\\$\\{SLUG\\}\``);
    if (!pageUrlPattern.test(content)) {
      // Vielleicht hardcoded?
      const hardcodedPageUrl = content.match(/const pageUrl\s*=\s*["'`]([^"'`]+)["'`]/);
      if (hardcodedPageUrl) {
        if (!hardcodedPageUrl[1].includes('/wissen/')) {
          errors.push(`[${file}] pageUrl zeigt NICHT auf /wissen/: "${hardcodedPageUrl[1]}"`);
        }
      } else {
        warnings.push(`[${file}] pageUrl-Pattern nicht erkannt – bitte manuell prüfen`);
      }
    }

    // Check 3: canonicalUrl muss {pageUrl} Variable nutzen
    if (content.includes('canonicalUrl="https://')) {
      const hardcanon = content.match(/canonicalUrl="([^"]+)"/);
      errors.push(`[${file}] canonicalUrl ist HARDCODED: "${hardcanon?.[1]}" → Muss {pageUrl} Variable nutzen`);
    }

    // Check 4: Breadcrumb href muss /wissen/ enthalten
    const breadcrumbMatches = content.match(/href:\s*`\/\$\{SLUG\}`/g);
    if (breadcrumbMatches) {
      errors.push(`[${file}] Breadcrumb href nutzt /$\{SLUG\} statt /wissen/$\{SLUG\} (${breadcrumbMatches.length}x)`);
    }

    // Auch prüfen: hardcoded breadcrumb hrefs ohne /wissen/
    const hardBreadcrumb = content.match(/href:\s*"\/(?!wissen\/)([^"\/]+)"/g);
    if (hardBreadcrumb) {
      // Filter: nur solche die wie Artikel-Slugs aussehen (nicht "/" oder "/wissen")
      const suspicious = hardBreadcrumb.filter(h => !h.includes('/wissen') && !h.includes('/trainings'));
      if (suspicious.length > 0) {
        warnings.push(`[${file}] Verdächtige Breadcrumb-Hrefs ohne /wissen/: ${suspicious.join(', ')}`);
      }
    }

    wissenPages.push({ file, slug });
  }

  return wissenPages;
}

// ──────────────────────────────────────────────
// 2. App.tsx Routen prüfen
// ──────────────────────────────────────────────

function checkRoutes(wissenPages) {
  const appContent = fs.readFileSync(path.join(ROOT, 'src', 'App.tsx'), 'utf-8');

  for (const { file, slug } of wissenPages) {
    const routePattern = new RegExp(`path="/wissen/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`);
    if (!routePattern.test(appContent)) {
      // Prüfen ob Route unter Root existiert (das wäre falsch)
      const rootRoute = new RegExp(`path="/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`);
      if (rootRoute.test(appContent)) {
        errors.push(`[App.tsx] Route für "${slug}" ist unter ROOT statt /wissen/ → path="/wissen/${slug}"`);
      } else {
        errors.push(`[App.tsx] Keine Route gefunden für "${slug}" (erwartet: /wissen/${slug})`);
      }
    }
  }
}

// ──────────────────────────────────────────────
// 3. react-snap include-Liste prüfen
// ──────────────────────────────────────────────

function checkReactSnap(wissenPages) {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
  const includes = pkg.reactSnap?.include || [];

  for (const { file, slug } of wissenPages) {
    const wissenPath = `/wissen/${slug}`;
    if (!includes.includes(wissenPath)) {
      errors.push(`[package.json] "${wissenPath}" fehlt in reactSnap.include → Seite wird NICHT pre-gerendert!`);
    }
  }

  // Check ob alte Root-Level-URLs noch drin sind, die NICHT zu den erlaubten
  // statischen Seiten gehören.
  const allowedRootRoutes = [
    '/', '/trainings', '/workshops', '/wissen', '/guidelines',
    '/unsere-angebote', '/impressum', '/datenschutz',
    '/ueber-uns', '/kontakt', '/trainer-werden', '/training-konfigurator'
  ];
  for (const inc of includes) {
    if (inc.startsWith('/') && !inc.startsWith('/wissen/') && !inc.startsWith('/trainings/') &&
        !inc.startsWith('/workshops/') && !inc.startsWith('/trainer/') &&
        !inc.startsWith('/guidelines/') &&
        !allowedRootRoutes.includes(inc)) {
      warnings.push(`[package.json] Verdächtiger Root-Level-Eintrag in reactSnap.include: "${inc}" → sollte unter /wissen/, /trainings/ oder /workshops/ sein`);
    }
  }
}

// ──────────────────────────────────────────────
// 4. Sitemap-Generator prüfen
// ──────────────────────────────────────────────

function checkSitemapGenerator(wissenPages) {
  const sitemapFile = path.join(ROOT, 'scripts', 'generate-sitemap.js');
  if (!fs.existsSync(sitemapFile)) return;

  const content = fs.readFileSync(sitemapFile, 'utf-8');

  for (const { file, slug } of wissenPages) {
    if (!content.includes(`/wissen/${slug}`)) {
      warnings.push(`[generate-sitemap.js] "${slug}" fehlt im Sitemap-Generator → Seite fehlt in sitemap.xml`);
    }
  }
}

// ──────────────────────────────────────────────
// 5. Trainings, Workshops, Trainer, statische Seiten
// ──────────────────────────────────────────────
//
// Im Gegensatz zu Wissensartikeln werden diese Seiten über Datenquellen
// (trainings.ts, workshops.ts, authors.ts) und Catch-All-Routes
// (/trainings/:slug, /workshops/:slug) erzeugt. Hier prüfen wir, dass jede
// dieser URLs in BEIDEM enthalten ist: reactSnap.include UND
// generate-sitemap.js. Bei Inkonsistenz wird sie nicht pre-gerendert
// oder nicht indexiert.

function extractSlugs(filePath, regex) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  return Array.from(slugs);
}

/**
 * Prüft, ob eine Route in reactSnap.include UND in generate-sitemap.js auftaucht.
 *
 * `searchInSitemap` ist konfigurierbar, weil der Sitemap-Generator unterschiedliche
 * Strukturen verwendet:
 *   - Statische Seiten und Wissensartikel: vollständiger Pfad wörtlich (z.B. "/wissen/foo")
 *   - Trainings/Workshops: nur der Slug in einem Slug-Array (z.B. "'copilot-grundlagen-prompt-design'")
 *   - Trainer: vollständiger Pfad als Objekt-Wert
 * Wir suchen also einen "Findbarkeits-Token" — der Caller weiß, was das ist.
 */
function checkRouteConsistency(routePath, label, sitemapToken) {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
  const includes = pkg.reactSnap?.include || [];
  if (!includes.includes(routePath)) {
    errors.push(`[package.json] "${routePath}" (${label}) fehlt in reactSnap.include → Seite wird NICHT pre-gerendert`);
  }

  const sitemapFile = path.join(ROOT, 'scripts', 'generate-sitemap.js');
  if (fs.existsSync(sitemapFile)) {
    const sitemap = fs.readFileSync(sitemapFile, 'utf-8');
    const token = sitemapToken ?? routePath;
    if (!sitemap.includes(token)) {
      warnings.push(`[generate-sitemap.js] "${routePath}" (${label}) fehlt im Sitemap-Generator (Token: "${token}") → Seite fehlt in sitemap.xml`);
    }
  }
}

function checkTrainings() {
  const slugs = extractSlugs(
    path.join(ROOT, 'src', 'data', 'trainings.ts'),
    /slug:\s*["']([^"']+)["']/g
  );
  for (const slug of slugs) {
    // Sitemap-Generator hält Trainings als Slug-Array; suche nach `'<slug>'`
    checkRouteConsistency(`/trainings/${slug}`, 'Training', `'${slug}'`);
  }
  return slugs.length;
}

function checkWorkshops() {
  const slugs = extractSlugs(
    path.join(ROOT, 'src', 'data', 'workshops.ts'),
    /slug:\s*["']([^"']+)["']/g
  );
  for (const slug of slugs) {
    checkRouteConsistency(`/workshops/${slug}`, 'Workshop', `'${slug}'`);
  }
  return slugs.length;
}

function checkTrainerProfiles() {
  // Trainer-Profile haben in App.tsx nur die Catch-All-Route /trainer/:id (TrainerProfil).
  // Die konkreten "öffentlichen" Trainer-Pfade leiten wir aus reactSnap.include ab —
  // alles, was unter /trainer/ steht (außer Catch-All).
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
  const includes = pkg.reactSnap?.include || [];
  const trainerRoutes = includes.filter(
    p => p.startsWith('/trainer/') && !p.includes(':')
  );
  for (const route of trainerRoutes) {
    checkRouteConsistency(route, 'Trainer-Profil');
  }
  return trainerRoutes.length;
}

function checkStaticPages() {
  // Pflichtseiten, die in reactSnap und Sitemap sein MÜSSEN
  const staticRoutes = [
    '/', '/trainings', '/workshops', '/wissen',
    '/unsere-angebote', '/ueber-uns', '/trainer-werden',
    '/training-konfigurator', '/impressum', '/datenschutz'
  ];
  for (const route of staticRoutes) {
    checkRouteConsistency(route, 'statische Seite');
  }
  return staticRoutes.length;
}

// ──────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────

console.log('\n🔍 SEO Validation: Prüfe alle Routentypen...\n');

const wissenPages = findWissenPages();
console.log(`   Wissensartikel:   ${wissenPages.length}`);

checkRoutes(wissenPages);
checkReactSnap(wissenPages);
checkSitemapGenerator(wissenPages);

const trainingsCount = checkTrainings();
console.log(`   Trainings:        ${trainingsCount}`);

const workshopsCount = checkWorkshops();
console.log(`   Workshops:        ${workshopsCount}`);

const trainerCount = checkTrainerProfiles();
console.log(`   Trainer-Profile:  ${trainerCount}`);

const staticCount = checkStaticPages();
console.log(`   Statische Seiten: ${staticCount}\n`);

// Ergebnis
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ SEO Validation bestanden! Alle Seiten konsistent.\n');
  process.exit(0);
}

if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} Warnung(en):`);
  warnings.forEach(w => console.log(`   ⚠️  ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.log(`❌ ${errors.length} Fehler gefunden:`);
  errors.forEach(e => console.log(`   ❌ ${e}`));
  console.log('\n💥 BUILD ABGEBROCHEN – SEO-Fehler müssen zuerst behoben werden!\n');
  process.exit(1);
}

// Nur Warnungen → Build fortsetzen
console.log('⚠️  Build fortgesetzt trotz Warnungen.\n');
process.exit(0);
