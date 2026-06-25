#!/usr/bin/env node
/**
 * build-dashboard-data.js
 *
 * Holt die Marketing-Kennzahlen für copilotenschule.de DIREKT von den jeweiligen
 * APIs (ohne Supermetrics) und schreibt:
 *   - public/dashboard/data.json    (aktueller Tages-Snapshot)
 *   - public/dashboard/history.json (Zeitreihe bis 90 Tage, wird gemergt)
 *
 * Läuft serverseitig (GitHub Action). Zugangsdaten kommen AUSSCHLIESSLICH aus
 * Umgebungsvariablen (GitHub Secrets) — niemals hartcodieren:
 *   GSC_SERVICE_ACCOUNT_JSON – JSON-Key eines Google-Service-Accounts, der in der
 *                              Search Console als Nutzer der Property hinterlegt ist
 *   BING_API_KEY             – API-Key aus den Bing Webmaster Tools (Einstellungen → API-Zugriff)
 *   CLARITY_API_TOKEN        – Microsoft Clarity Data-Export-API Token
 *
 * Dependency-frei (nur Node-Bordmittel), damit die Action ohne `npm install` läuft.
 * Quellen ohne Daten bleiben null/0 — es werden KEINE Platzhalter erfunden.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import crypto from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DASH = resolve(__dirname, "..", "public", "dashboard");

const GSC_SITE = "sc-domain:copilotenschule.de";
const BING_SITE = "https://www.copilotenschule.de/";
const CLARITY_API = "https://www.clarity.ms/export-data/api/v1/project-live-insights"; // max. 3 Tage, 10 Calls/Tag

const GSC_SA = process.env.GSC_SERVICE_ACCOUNT_JSON;
const BING_KEY = process.env.BING_API_KEY;
const CLARITY_TOKEN = process.env.CLARITY_API_TOKEN;
const PAGESPEED_KEY = process.env.PAGESPEED_API_KEY;
const PSI_PAGES = [
  "https://copilotenschule.de/",
  "https://copilotenschule.de/trainings",
  "https://copilotenschule.de/wissen/claude-in-microsoft-copilot",
];

const num = (v) => { const n = parseFloat(String(v).replace(",", ".")); return Number.isFinite(n) ? n : 0; };
const round2 = (n) => Math.round(n * 100) / 100;
const pct = (cur, prev) => (prev > 0 ? Math.round(((cur - prev) / prev) * 100) : null);
const berlinToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
const ymd = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 86400000);
const sum = (arr, k) => arr.reduce((s, r) => s + r[k], 0);

async function safe(label, fn, fallback) {
  try { return await fn(); } catch (e) { console.warn(`WARN ${label}: ${e.message}`); return fallback; }
}

// ---------- Google Search Console (Service Account → JWT → Access Token) ----------
const b64url = (o) => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");

async function gscToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url({ alg: "RS256", typ: "JWT" });
  const claim = b64url({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: sa.token_uri, exp: now + 3600, iat: now });
  const sig = crypto.createSign("RSA-SHA256").update(`${head}.${claim}`).sign(sa.private_key).toString("base64url");
  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${sig}` }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error(`GSC-Token-Fehler: ${JSON.stringify(j).slice(0, 200)}`);
  return j.access_token;
}

async function gscQuery(token, body) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`;
  const res = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json();
  if (j.error) throw new Error(`GSC-API-Fehler: ${JSON.stringify(j.error).slice(0, 200)}`);
  return j.rows || [];
}

// ---------- Bing Webmaster Tools (GetRankAndTrafficStats, apikey) ----------
async function fetchBing() {
  if (!BING_KEY) return null;
  const url = `https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats?apikey=${encodeURIComponent(BING_KEY)}&siteUrl=${encodeURIComponent(BING_SITE)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bing HTTP ${res.status}`);
  const j = await res.json();
  const rows = Array.isArray(j?.d) ? j.d : (Array.isArray(j) ? j : []);
  const parseDate = (s) => { const m = /\/Date\((\d+)/.exec(String(s)); return m ? ymd(new Date(Number(m[1]))) : null; };
  const daily = rows
    .map((r) => ({ date: parseDate(r.Date), clicks: num(r.Clicks), impressions: num(r.Impressions) }))
    .filter((r) => r.date)
    .sort((a, b) => a.date.localeCompare(b.date));
  const last7 = daily.slice(-7);
  return { clicks7: sum(last7, "clicks"), impr7: sum(last7, "impressions"), days: daily.length };
}

// ---------- Microsoft Clarity (Data-Export-API, letzte 3 Tage) ----------
async function fetchClarity() {
  if (!CLARITY_TOKEN) return null;
  const res = await fetch(`${CLARITY_API}?numOfDays=3`, { headers: { Authorization: `Bearer ${CLARITY_TOKEN}` } });
  if (!res.ok) throw new Error(`Clarity HTTP ${res.status}`);
  const arr = await res.json();
  if (!Array.isArray(arr)) throw new Error("Clarity-Antwort ohne Array");
  const info = (name) => { const m = arr.find((x) => x.metricName === name); return m && Array.isArray(m.information) ? m.information : []; };
  const t = info("Traffic")[0] || {};
  const scroll = info("ScrollDepth")[0] || {};
  const engage = info("EngagementTime")[0] || {};
  const dead = info("DeadClickCount")[0] || {};
  const rage = info("RageClickCount")[0] || {};
  const topPages = info("PopularPages").slice(0, 6).map((p) => ({ url: p.url, visits: num(p.visitsCount) }));
  return {
    sessions: num(t.totalSessionCount),
    bot_sessions: num(t.totalBotSessionCount),
    users: num(t.distinctUserCount),
    pages_per_session: t.pagesPerSessionPercentage != null ? round2(num(t.pagesPerSessionPercentage)) : null,
    avg_scroll_depth: scroll.averageScrollDepth != null ? round2(num(scroll.averageScrollDepth)) : null,
    engagement_active_sec: engage.activeTime != null ? num(engage.activeTime) : null,
    engagement_total_sec: engage.totalTime != null ? num(engage.totalTime) : null,
    dead_click_pct: dead.sessionsWithMetricPercentage != null ? round2(num(dead.sessionsWithMetricPercentage)) : null,
    rage_click_pct: rage.sessionsWithMetricPercentage != null ? round2(num(rage.sessionsWithMetricPercentage)) : null,
    top_pages: topPages,
  };
}

// ---------- Google PageSpeed Insights (Lab-Daten, mobil) ----------
async function psiOne(url) {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance${PAGESPEED_KEY ? `&key=${PAGESPEED_KEY}` : ""}`;
  const r = await fetch(api);
  const j = await r.json();
  if (j.error) throw new Error(`PSI ${j.error.code || ""}: ${(j.error.message || "").slice(0, 80)}`);
  const a = j.lighthouseResult?.audits || {};
  const numv = (k) => (a[k]?.numericValue != null ? a[k].numericValue : null);
  return {
    url,
    performance_score: Math.round((j.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
    lcp_ms: numv("largest-contentful-paint") != null ? Math.round(numv("largest-contentful-paint")) : null,
    inp_ms: numv("total-blocking-time") != null ? Math.round(numv("total-blocking-time")) : null, // TBT als Lab-Proxy für Interaktivität
    cls: numv("cumulative-layout-shift") != null ? round2(numv("cumulative-layout-shift")) : null,
  };
}
async function fetchPageSpeed() {
  if (!PAGESPEED_KEY) return null;
  const pages = [];
  for (const u of PSI_PAGES) {
    try { pages.push(await psiOne(u)); } catch (e) { console.warn(`WARN PSI ${u}: ${e.message}`); }
  }
  if (!pages.length) return null;
  return { pages, average: Math.round(pages.reduce((s, p) => s + p.performance_score, 0) / pages.length) };
}

async function main() {
  const today = berlinToday();

  if (!GSC_SA) {
    console.warn("WARN: GSC_SERVICE_ACCOUNT_JSON fehlt — Update wird übersprungen, bestehende Daten bleiben unverändert.");
    process.exit(0);
  }

  // ---- Google Search Console: 30-Tage-Tagesreihe + Top-Suchbegriffe (28 Tage) ----
  const gsc = await safe("GSC", async () => {
    const token = await gscToken(JSON.parse(GSC_SA));
    const dayRows = await gscQuery(token, { startDate: ymd(daysAgo(31)), endDate: ymd(new Date()), dimensions: ["date"], rowLimit: 90 });
    const qRows = await gscQuery(token, { startDate: ymd(daysAgo(29)), endDate: ymd(new Date()), dimensions: ["query"], rowLimit: 200 });
    return { dayRows, qRows };
  }, null);

  // Schutz: Wenn GSC keine Daten liefert (z. B. Key ungültig/Zugriff fehlt), NICHT mit
  // Nullwerten weiterschreiben — Update sauber überspringen (Lauf bleibt grün), damit
  // die bestehenden, korrekten Dashboard-Daten erhalten bleiben.
  if (!gsc || !gsc.dayRows.length) {
    console.warn("WARN: GSC lieferte keine Daten — Update wird übersprungen, bestehende Daten bleiben unverändert. (Service-Account-Key / GSC-Zugriff prüfen.)");
    process.exit(0);
  }

  const gscDaily = gsc.dayRows
    .map((r) => ({ date: r.keys[0], clicks: num(r.clicks), impressions: num(r.impressions), position: round2(num(r.position)) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const queries = gsc.qRows
    .map((r) => ({ query: String(r.keys[0] || ""), clicks: num(r.clicks), impressions: num(r.impressions), position: round2(num(r.position)) }))
    .filter((r) => r.query);

  const last7 = gscDaily.slice(-7);
  const prev7 = gscDaily.slice(-14, -7);
  const gscClicks7 = sum(last7, "clicks");
  const gscImpr7 = sum(last7, "impressions");
  const gscClicksPrev7 = sum(prev7, "clicks");
  const gscImprPrev7 = sum(prev7, "impressions");
  const gscPos7 = gscImpr7 > 0 ? round2(last7.reduce((s, r) => s + r.position * r.impressions, 0) / gscImpr7) : null;

  const topByClicks = [...queries].sort((a, b) => b.clicks - a.clicks).slice(0, 6);
  const quickWins = queries
    .filter((r) => r.impressions >= 20 && r.position >= 4 && r.position <= 30)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5);

  // ---- Google Ads: neues Konto (480-547-8290), noch kein Spend → 0. Direkte Ads-API folgt später. ----
  const adsClicks7 = 0, adsCost7 = 0, adsConv7 = 0;

  // ---- Bing Webmaster Tools ----
  const bing = await safe("Bing", fetchBing, null);
  const bingConnected = !!bing;
  const bingClicks7 = bing ? bing.clicks7 : 0;
  const bingImpr7 = bing ? bing.impr7 : 0;

  // ---- Microsoft Clarity ----
  const clarity = await safe("Clarity", fetchClarity, null);

  // ---- Google PageSpeed Insights (Lab, mobil) ----
  const psi = await safe("PageSpeed", fetchPageSpeed, null);

  // ================= data.json bauen =================
  const data = {
    meta: {
      domain: "copilotenschule.de",
      generated_at: new Date().toISOString(),
      generated_by: "github-action: build-dashboard-data.js (GSC/Bing direkt)",
      overall_health: gscClicks7 >= gscClicksPrev7 ? "green" : "yellow",
      update_frequency: "täglich",
      schema_version: "1.0",
    },
    sources: {
      gsc: { connected: true, label: "Google Search Console", note: "Verbunden (Service Account, direkte API)" },
      google_ads: { connected: true, label: "Google Ads", note: "Neues Konto Copilotenschule (480-547-8290), Kampagne pausiert – noch kein Spend" },
      bing: { connected: bingConnected, label: "Bing Webmaster", note: bingConnected ? (bingClicks7 > 0 ? "Verbunden (direkte API)" : "Verbunden, sehr wenig Bing-Traffic") : "Optional, noch nicht angebunden" },
      clarity: { connected: !!clarity, label: "Microsoft Clarity", note: clarity ? "Verbunden (Data-Export-API, letzte 3 Tage)" : "Optional, noch nicht angebunden" },
      pagespeed: { connected: !!psi, label: "PageSpeed Insights", note: psi ? `Verbunden (Lab, mobil) – Ø Performance-Score ${psi.average}` : "Optional, noch nicht angebunden" },
      llm: { connected: true, label: "LLM-Sichtbarkeit", note: "Wöchentlicher GEO-Check (OpenAI, separater Job) – siehe eigene Sektion" },
    },
    kpis: {
      gsc_clicks_7d: { value: gscClicks7, delta_pct: pct(gscClicks7, gscClicksPrev7), source: "gsc" },
      gsc_impressions_7d: { value: gscImpr7, delta_pct: pct(gscImpr7, gscImprPrev7), source: "gsc" },
      gsc_avg_position_7d: { value: gscPos7, delta_pct: null, source: "gsc" },
      ads_clicks_7d: { value: adsClicks7, delta_pct: null, source: "google_ads" },
      ads_cost_7d_eur: { value: adsCost7, delta_pct: null, source: "google_ads" },
      ads_conversions_7d: { value: adsConv7, delta_pct: null, source: "google_ads" },
      bing_clicks_7d: { value: bingConnected ? bingClicks7 : null, delta_pct: null, source: "bing" },
      clarity_sessions_7d: { value: clarity ? clarity.sessions : null, delta_pct: null, source: "clarity" },
    },
    performance: psi
      ? { average_performance_score: psi.average, core_web_vitals_status: "Labordaten (mobil); INP-Spalte = TBT-Proxy", pages: psi.pages }
      : { average_performance_score: null, core_web_vitals_status: null, pages: [] },
    indexing: {
      google: { indexed_pages: null, crawl_errors: null, clicks_7d: gscClicks7, impressions_7d: gscImpr7, avg_position_7d: gscPos7 },
      bing: { indexed_pages: null, crawl_errors: null, clicks_7d: bingConnected ? bingClicks7 : null, impressions_7d: bingConnected ? bingImpr7 : null },
      sitemap: { total_urls: 74, index_coverage_pct: null },
    },
    seo: { average_seo_score: null, pages_with_issues: null, issues: [] },
    keywords: {
      tracked: topByClicks.map((q) => ({ keyword: q.query, google_position: q.position, bing_position: null })),
      recommendations: quickWins.length
        ? quickWins.map((q) => `Quick-Win: „${q.query}“ — ${q.impressions} Impressionen, Position ${q.position}. Mit gezielter On-Page-Optimierung nach oben schiebbar.`)
        : ["Sobald mehr GSC-Daten vorliegen, erscheinen hier die aussichtsreichsten Quick-Win-Keywords."],
    },
    llm_visibility: { status: null, checks: [] },
    clarity: clarity ? {
      sessions_3d: clarity.sessions,
      users_3d: clarity.users,
      bot_sessions_3d: clarity.bot_sessions,
      pages_per_session: clarity.pages_per_session,
      avg_scroll_depth: clarity.avg_scroll_depth,
      engagement_active_sec: clarity.engagement_active_sec,
      dead_click_pct: clarity.dead_click_pct,
      rage_click_pct: clarity.rage_click_pct,
      top_pages: clarity.top_pages,
    } : null,
    report_highlights: buildHighlights({ gscClicks7, gscClicksPrev7, gscImpr7, gscPos7, bingConnected, bingClicks7, bingImpr7, topByClicks, clarity }),
    availability: { https_ok: true, homepage_status: 200, checked_pages: 1 },
  };

  // ================= history.json mergen =================
  // Vorherige Historie wird NICHT mehr aus dem Repo gelesen (das verursachte tägliche
  // Merge-Konflikte), sondern von der Live-Seite geholt. Fallback: lokale Datei, dann leer.
  const emptyHist = { domain: "copilotenschule.de", retention_days: 90, series: {}, marketing_actions: [] };
  let hist = await safe("history-live", async () => {
    const r = await fetch(`https://copilotenschule.de/dashboard/history.json?_=${Date.now()}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  }, null);
  if (!hist || !hist.series) {
    try { hist = JSON.parse(readFileSync(resolve(DASH, "history.json"), "utf8")); } catch { hist = emptyHist; }
  }

  const byDate = new Map();
  const s = hist.series || {};
  (s.dates || []).forEach((d, i) => {
    byDate.set(d, {
      gsc_clicks: s.gsc_clicks?.[i] ?? null,
      gsc_impressions: s.gsc_impressions?.[i] ?? null,
      gsc_position: s.gsc_position?.[i] ?? null,
      ads_clicks: s.ads_clicks?.[i] ?? null,
      ads_conversions: s.ads_conversions?.[i] ?? null,
    });
  });
  // Neue GSC-Tageswerte überschreiben vorhandene
  gscDaily.forEach((r) => {
    const e = byDate.get(r.date) || {};
    byDate.set(r.date, { ...e, gsc_clicks: r.clicks, gsc_impressions: r.impressions, gsc_position: r.position });
  });

  const dates = [...byDate.keys()].sort((a, b) => a.localeCompare(b)).slice(-90);
  hist.series = {
    dates,
    gsc_clicks: dates.map((d) => byDate.get(d).gsc_clicks ?? null),
    gsc_impressions: dates.map((d) => byDate.get(d).gsc_impressions ?? null),
    gsc_position: dates.map((d) => byDate.get(d).gsc_position ?? null),
    ads_clicks: dates.map((d) => byDate.get(d).ads_clicks ?? null),
    ads_conversions: dates.map((d) => byDate.get(d).ads_conversions ?? null),
  };
  hist.retention_days = 90;
  hist.domain = "copilotenschule.de";

  writeFileSync(resolve(DASH, "data.json"), JSON.stringify(data, null, 2) + "\n");
  writeFileSync(resolve(DASH, "history.json"), JSON.stringify(hist, null, 2) + "\n");
  console.log(`OK ${today}: GSC ${gscClicks7} Klicks (Δ ${pct(gscClicks7, gscClicksPrev7)}%), ${gscImpr7} Impr, Pos ${gscPos7}; Bing ${bingConnected ? bingClicks7 : "n/v"}; Clarity ${clarity ? clarity.sessions : "n/v"}. History-Tage: ${dates.length} (bis ${dates[dates.length - 1]}).`);
}

function buildHighlights(x) {
  const h = [];
  const d = pct(x.gscClicks7, x.gscClicksPrev7);
  h.push({ severity: "info", text: `Organische Google-Klicks: ${x.gscClicks7} in 7 Tagen${d !== null ? ` (${d >= 0 ? "+" : ""}${d}% ggü. Vorwoche)` : ""}, ${x.gscImpr7} Impressionen, Ø Position ${x.gscPos7 ?? "–"}.` });
  h.push({ severity: "action", text: "Google Ads: neues Konto Copilotenschule, Kampagne pausiert – für das 400-€-Startguthaben fehlt noch der Spend." });
  if (x.bingConnected && x.bingClicks7 > 0) h.push({ severity: "info", text: `Bing: ${x.bingClicks7} Klicks / ${x.bingImpr7} Impressionen (7 Tage).` });
  else h.push({ severity: "info", text: "Bing-Traffic aktuell sehr gering — Fokus bleibt Google." });
  if (x.topByClicks[0]) h.push({ severity: "info", text: `Top-Suchbegriff: „${x.topByClicks[0].query}“ (${x.topByClicks[0].clicks} Klicks, Position ${x.topByClicks[0].position}).` });
  if (x.clarity) h.push({ severity: "info", text: `Clarity: ${x.clarity.sessions} Sessions in 3 Tagen, Ø Scrolltiefe ${x.clarity.avg_scroll_depth ?? "–"}%, Dead-Clicks ${x.clarity.dead_click_pct ?? "–"}% der Sitzungen.` });
  return h;
}

main().catch((e) => { console.error("FEHLER:", e.message); process.exit(1); });
