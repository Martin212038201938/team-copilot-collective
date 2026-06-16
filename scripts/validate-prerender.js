#!/usr/bin/env node
/**
 * validate-prerender.js
 *
 * Pre-Render-Wächter. Läuft NACH react-snap (siehe build:prerender) und stellt
 * sicher, dass die wichtigsten Seiten im vorgerenderten STATISCHEN HTML
 * vollständig sind — also genau das, was nicht-JS-Crawler wie Bing/Copilot sehen.
 *
 * Hintergrund: Ende Mai 2026 hat eine react-snap/react-helmet-Race-Condition
 * dazu geführt, dass Seiten ohne ihren echten Title/Inhalt vorgerendert wurden.
 * Bing (rendert kein JS) sah „leere" Seiten und hat sie aus dem KI-Grounding
 * gekippt → Citations brachen ein. Dieser Wächter lässt den Build rot werden,
 * bevor so ein kaputter Stand je wieder deployt wird.
 *
 * Prüft pro Schlüsselseite:
 *   1. <title> vorhanden, nicht leer und (außer Startseite) mit Site-Suffix
 *      „| copilotenschule.de" — fehlt der Suffix, hat react-helmet nicht geflusht.
 *   2. <meta name="description"> vorhanden und aussagekräftig (>= 50 Zeichen).
 *   3. Mindestens ein <h1> im HTML (Skelett-HTML hat keins).
 *   4. Substanzielle Größe (> 8 KB) — Skelett-Seiten sind nur wenige KB groß.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const SITE_SUFFIX = "| copilotenschule.de";

// route → erwartet Site-Suffix im Title? (Startseite darf den Default-Title haben)
const KEY_PAGES = [
  { route: "/", expectSuffix: false },
  { route: "/wissen", expectSuffix: true },
  { route: "/trainings", expectSuffix: true },
  { route: "/wissen/microsoft-copilot-lizenzen", expectSuffix: true },
  { route: "/wissen/copilot-in-outlook-nutzen-tipps", expectSuffix: true },
  { route: "/wissen/copilot-fuer-excel", expectSuffix: true },
];

const fileFor = (route) =>
  route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

let failures = 0;
const fail = (route, msg) => { console.error(`  ✗ ${route}: ${msg}`); failures++; };

console.log("Pre-Render-Validierung der Schlüsselseiten …");

for (const { route, expectSuffix } of KEY_PAGES) {
  const file = fileFor(route);
  if (!existsSync(file)) {
    fail(route, `vorgerenderte Datei fehlt (${file}) — steht die Route in package.json reactSnap.include?`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const title = pick(html, /<title[^>]*>([^<]*)<\/title>/i);
  const desc = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);

  if (!title) fail(route, "kein <title> im vorgerenderten HTML");
  else if (expectSuffix && !title.includes(SITE_SUFFIX))
    fail(route, `Title ohne Site-Suffix „${SITE_SUFFIX}" → react-helmet hat vermutlich nicht geflusht (Title: „${title}")`);

  if (!desc) fail(route, "keine <meta name=\"description\">");
  else if (desc.length < 50) fail(route, `Meta-Description zu kurz (${desc.length} Zeichen)`);

  if (!/<h1[\s>]/i.test(html)) fail(route, "kein <h1> im HTML (Hinweis auf Skelett-Render)");

  if (html.length < 8000) fail(route, `HTML verdächtig klein (${html.length} Bytes) — möglicher Skelett-Render`);

  if (failures === 0 || !html) { /* noop */ }
}

if (failures > 0) {
  console.error(`\n❌ Pre-Render-Wächter: ${failures} Problem(e) gefunden. Build wird abgebrochen, um kaputtes HTML nicht zu deployen.`);
  process.exit(1);
}
console.log("✓ Pre-Render-Wächter: alle Schlüsselseiten vollständig (Title, Description, H1, Größe).");
