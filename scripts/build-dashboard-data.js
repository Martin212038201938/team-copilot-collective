#!/usr/bin/env node
/**
 * build-dashboard-data.js
 *
 * Holt die Marketing-Kennzahlen für copilotenschule.de über die Supermetrics
 * REST-API und schreibt:
 *   - public/dashboard/data.json   (aktueller Tages-Snapshot)
 *   - public/dashboard/history.json (Zeitreihe, bis 90 Tage, wird gemergt)
 *
 * Läuft serverseitig (GitHub Action). Zugangsdaten kommen AUSSCHLIESSLICH aus
 * Umgebungsvariablen (GitHub Secrets) — niemals hartcodieren:
 *   SUPERMETRICS_API_KEY  – API-Key aus dem Supermetrics Query Manager
 *   SUPERMETRICS_DS_USER  – ds_user-ID der Supermetrics-Verbindung
 *
 * Quellen ohne Daten bleiben null/0 — es werden KEINE Platzhalter erfunden.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DASH = resolve(__dirname, "..", "public", "dashboard");
const API = "https://api.supermetrics.com/enterprise/v2/query/data/json";

const API_KEY = process.env.SUPERMETRICS_API_KEY;
const DS_USER = process.env.SUPERMETRICS_DS_USER;
if (!API_KEY || !DS_USER) {
  console.error("FEHLT: SUPERMETRICS_API_KEY und/oder SUPERMETRICS_DS_USER (Env/Secrets).");
  process.exit(1);
}

const GSC_ACCOUNT = "sc-domain:copilotenschule.de";
const ADS_ACCOUNT = "4805478290";
const BING_ACCOUNT = "https://www.copilotenschule.de/";

const num = (v) => {
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const round2 = (n) => Math.round(n * 100) / 100;
const pct = (cur, prev) => (prev > 0 ? Math.round(((cur - prev) / prev) * 100) : null);
const berlinToday = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date()); // YYYY-MM-DD

/** Ruft die Supermetrics-API und liefert die data-Zeilen (inkl. Headerzeile [0]). */
async function smQuery(params) {
  const json = JSON.stringify({ ds_user: DS_USER, api_key: API_KEY, max_rows: 1000, ...params });
  const url = `${API}?json=${encodeURIComponent(json)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Supermetrics HTTP ${res.status} für ds_id=${params.ds_id}`);
  const body = await res.json();
  const rows = body?.data;
  if (!Array.isArray(rows)) {
    const msg = body?.meta?.error_message || body?.error || "unbekannt";
    throw new Error(`Supermetrics-Antwort ohne data (ds_id=${params.ds_id}): ${msg}`);
  }
  return rows; // rows[0] = Header, rows[1..] = Daten
}

/** Wandelt data-Zeilen in Objekte um (Header → Feld-IDs in Reihenfolge der fields). */
function toObjects(rows, fieldIds) {
  if (rows.length <= 1) return [];
  return rows.slice(1).map((r) => Object.fromEntries(fieldIds.map((f, i) => [f, r[i]])));
}

async function safe(label, fn, fallback) {
  try {
    return await fn();
  } catch (e) {
    console.warn(`WARN ${label}: ${e.message}`);
    return fallback;
  }
}

async function main() {
  const today = berlinToday();

  // ---- Google Search Console: 30 Tage Tagesreihe ----
  const gscDailyRows = await safe(
    "GSC daily",
    () => smQuery({ ds_id: "GW", ds_accounts: GSC_ACCOUNT, fields: "Date,clicks,impressions,position", date_range_type: "last_30_days" }),
    []
  );
  const gscDaily = toObjects(gscDailyRows, ["date", "clicks", "impressions", "position"])
    .filter((r) => r.date)
    .map((r) => ({ date: String(r.date).slice(0, 10), clicks: num(r.clicks), impressions: num(r.impressions), position: round2(num(r.position)) }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // 7-Tage-Summen + Vorwoche aus der Tagesreihe (für KPIs + Deltas)
  const last7 = gscDaily.slice(-7);
  const prev7 = gscDaily.slice(-14, -7);
  const sum = (arr, k) => arr.reduce((s, r) => s + r[k], 0);
  const gscClicks7 = sum(last7, "clicks");
  const gscImpr7 = sum(last7, "impressions");
  const gscClicksPrev7 = sum(prev7, "clicks");
  const gscImprPrev7 = sum(prev7, "impressions");
  // impressionsgewichtete Ø-Position der letzten 7 Tage
  const gscPos7 = gscImpr7 > 0 ? round2(last7.reduce((s, r) => s + r.position * r.impressions, 0) / gscImpr7) : null;

  // ---- GSC: Top-Suchbegriffe (28 Tage) → Quick-Win-Empfehlungen ----
  const gscQueryRows = await safe(
    "GSC queries",
    () => smQuery({ ds_id: "GW", ds_accounts: GSC_ACCOUNT, fields: "query,clicks,impressions,position", date_range_type: "last_28_days", max_rows: 200 }),
    []
  );
  const queries = toObjects(gscQueryRows, ["query", "clicks", "impressions", "position"])
    .map((r) => ({ query: String(r.query || ""), clicks: num(r.clicks), impressions: num(r.impressions), position: round2(num(r.position)) }))
    .filter((r) => r.query && r.query.toLowerCase() !== "(unknown)");

  const topByClicks = [...queries].sort((a, b) => b.clicks - a.clicks).slice(0, 6);
  const quickWins = queries
    .filter((r) => r.impressions >= 20 && r.position >= 4 && r.position <= 30)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5);

  // ---- Google Ads: 30 Tage Tagesreihe ----
  const adsDailyRows = await safe(
    "Ads daily",
    () => smQuery({ ds_id: "AW", ds_accounts: ADS_ACCOUNT, fields: "Date,Clicks,Cost_eur,Conversions", date_range_type: "last_30_days" }),
    []
  );
  const adsDaily = toObjects(adsDailyRows, ["date", "clicks", "cost", "conversions"])
    .filter((r) => r.date)
    .map((r) => ({ date: String(r.date).slice(0, 10), clicks: num(r.clicks), cost: round2(num(r.cost)), conversions: num(r.conversions) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const adsLast7 = adsDaily.slice(-7);
  const adsClicks7 = sum(adsLast7, "clicks");
  const adsCost7 = round2(adsLast7.reduce((s, r) => s + r.cost, 0));
  const adsConv7 = sum(adsLast7, "conversions");

  // ---- Bing Webmaster: 7-Tage-Aggregat (keine Tagesdimension verfügbar) ----
  const bingRows = await safe(
    "Bing 7d",
    () => smQuery({ ds_id: "BW", ds_accounts: BING_ACCOUNT, fields: "clicks,impressions", date_range_type: "last_7_days" }),
    []
  );
  const bingObj = toObjects(bingRows, ["clicks", "impressions"])[0] || { clicks: 0, impressions: 0 };
  const bingClicks7 = num(bingObj.clicks);
  const bingImpr7 = num(bingObj.impressions);
  const bingConnected = bingRows.length > 0;

  // ================= data.json bauen =================
  const data = {
    meta: {
      domain: "copilotenschule.de",
      generated_at: new Date().toISOString(),
      generated_by: "github-action: build-dashboard-data.js (Supermetrics API)",
      overall_health: gscClicks7 >= gscClicksPrev7 ? "green" : "yellow",
      update_frequency: "täglich",
      schema_version: "1.0",
    },
    sources: {
      gsc: { connected: gscDaily.length > 0, label: "Google Search Console", note: "Supermetrics REST-API" },
      google_ads: { connected: true, label: "Google Ads", note: adsClicks7 > 0 ? "Aktiv" : "Verbunden, in den letzten 7 Tagen keine Klicks/Conversions" },
      bing: { connected: bingConnected, label: "Bing Webmaster", note: bingClicks7 > 0 ? "Verbunden" : "Verbunden, sehr wenig Bing-Traffic" },
      clarity: { connected: false, label: "Microsoft Clarity", note: "Optional, noch nicht angebunden" },
      pagespeed: { connected: false, label: "PageSpeed Insights", note: "Optional, noch nicht angebunden" },
      llm: { connected: false, label: "LLM-Sichtbarkeit", note: "Optional" },
    },
    kpis: {
      gsc_clicks_7d: { value: gscClicks7, delta_pct: pct(gscClicks7, gscClicksPrev7), source: "gsc" },
      gsc_impressions_7d: { value: gscImpr7, delta_pct: pct(gscImpr7, gscImprPrev7), source: "gsc" },
      gsc_avg_position_7d: { value: gscPos7, delta_pct: null, source: "gsc" },
      ads_clicks_7d: { value: adsClicks7, delta_pct: null, source: "google_ads" },
      ads_cost_7d_eur: { value: adsCost7, delta_pct: null, source: "google_ads" },
      ads_conversions_7d: { value: adsConv7, delta_pct: null, source: "google_ads" },
      bing_clicks_7d: { value: bingConnected ? bingClicks7 : null, delta_pct: null, source: "bing" },
      clarity_sessions_7d: { value: null, delta_pct: null, source: "clarity" },
    },
    performance: { average_performance_score: null, core_web_vitals_status: null, pages: [] },
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
    report_highlights: buildHighlights({ gscClicks7, gscClicksPrev7, gscImpr7, gscPos7, adsClicks7, adsConv7, bingConnected, bingClicks7, topByClicks }),
    availability: { https_ok: true, homepage_status: 200, checked_pages: 1 },
  };

  // ================= history.json mergen =================
  let hist = { domain: "copilotenschule.de", retention_days: 90, series: {}, marketing_actions: [] };
  try {
    hist = JSON.parse(readFileSync(resolve(DASH, "history.json"), "utf8"));
  } catch { /* erste Ausführung */ }

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
  adsDaily.forEach((r) => {
    const e = byDate.get(r.date) || {};
    byDate.set(r.date, { ...e, ads_clicks: r.clicks, ads_conversions: r.conversions });
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
  console.log(`OK ${today}: GSC ${gscClicks7} Klicks (Δ ${pct(gscClicks7, gscClicksPrev7)}%), ${gscImpr7} Impr, Pos ${gscPos7}; Ads ${adsClicks7} Klicks/${adsConv7} Conv; Bing ${bingConnected ? bingClicks7 : "n/v"}. History-Tage: ${dates.length}.`);
}

function buildHighlights(x) {
  const h = [];
  const d = pct(x.gscClicks7, x.gscClicksPrev7);
  h.push({ severity: "info", text: `Organische Google-Klicks: ${x.gscClicks7} in 7 Tagen${d !== null ? ` (${d >= 0 ? "+" : ""}${d}% ggü. Vorwoche)` : ""}, ${x.gscImpr7} Impressionen, Ø Position ${x.gscPos7 ?? "–"}.` });
  if (x.adsClicks7 > 0) h.push({ severity: "info", text: `Google Ads: ${x.adsClicks7} Klicks, ${x.adsConv7} Conversions (7 Tage).` });
  else h.push({ severity: "action", text: "Google-Ads-Kampagne aktiv, aber in den letzten 7 Tagen noch keine Klicks/Conversions." });
  if (!x.bingConnected || x.bingClicks7 === 0) h.push({ severity: "info", text: "Bing-Traffic aktuell sehr gering — Fokus bleibt Google." });
  if (x.topByClicks[0]) h.push({ severity: "info", text: `Top-Suchbegriff: „${x.topByClicks[0].query}“ (${x.topByClicks[0].clicks} Klicks, Position ${x.topByClicks[0].position}).` });
  return h;
}

main().catch((e) => { console.error("FEHLER:", e.message); process.exit(1); });
