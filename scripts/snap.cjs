/**
 * snap.cjs — react-snap Wrapper
 *
 * Liest die reactSnap-Konfiguration aus package.json und merged sie mit
 * PUPPETEER_EXECUTABLE_PATH aus der Umgebung (wird in CI auf Google Chrome
 * gesetzt, damit nicht das veraltete gebündelte Chrome 77 verwendet wird).
 *
 * Lokal läuft weiterhin das gebündelte puppeteer-Chromium — kein Eingriff nötig.
 */

const { run } = require('react-snap');
const path = require('path');

const pkg = require(path.join(__dirname, '..', 'package.json'));
const userOpts = pkg.reactSnap || {};

const extraOpts = {};
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  extraOpts.puppeteerExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

const opts = { ...userOpts, ...extraOpts };

run(opts).catch(e => {
  console.error(e);
  process.exit(1);
});
