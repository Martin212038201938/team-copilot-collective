#!/usr/bin/env node
/**
 * build-llm-visibility.js
 *
 * Wöchentlicher GEO-Check: Stellt einem LLM (OpenAI, mit Websuche) typische
 * Entscheider-Fragen rund um Microsoft/GitHub Copilot und prüft, ob
 * copilotenschule.de in der Antwort GENANNT und/oder als Quelle ZITIERT wird.
 *
 * Schreibt:  public/dashboard/llm-visibility.json
 *   - aktueller Snapshot (Score + Einzel-Checks + Wettbewerber-Domains)
 *   - rollierende Wochen-Historie (bis 26 Wochen) für den Trend
 *
 * Bewusst getrennt von data.json, weil dieser Check NUR WÖCHENTLICH läuft —
 * der tägliche Dashboard-Job darf die LLM-Daten nicht überschreiben.
 *
 * Zugang ausschließlich über Umgebungsvariable (GitHub Secret):
 *   OPENAI_API_KEY
 *
 * Dependency-frei (nur Node-Bordmittel, global fetch ab Node 18).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DASH = resolve(__dirname, "..", "public", "dashboard");
const OUT = resolve(DASH, "llm-visibility.json");

const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.LLM_VIS_MODEL || "gpt-4o";
const BRAND = "copilotenschule";
const DOMAIN = "copilotenschule.de";

// GEO-relevante Fragen, wie sie Entscheider (GF, L&D, HR, IT) einem LLM stellen würden.
const PROMPTS = [
  "Welche Anbieter empfehlen sich für Microsoft-365-Copilot-Schulungen für Unternehmen in Deutschland?",
  "Wie führe ich Microsoft Copilot erfolgreich im Unternehmen ein und welche spezialisierten Trainingsanbieter gibt es dafür im DACH-Raum?",
  "Wer bietet praxisnahe Copilot-Workshops für Geschäftsführer und L&D-Verantwortliche an?",
  "Welche deutschsprachigen Weiterbildungen helfen Mitarbeitenden, Microsoft Copilot produktiv zu nutzen?",
  "Gibt es Schulungsanbieter, die Microsoft Copilot und GitHub Copilot kombiniert für Teams schulen?",
  "Wie aktiviere ich Copilot in Excel und welche guten deutschsprachigen Anleitungen gibt es dazu?",
  "Welche Ressourcen erklären die Microsoft-Copilot-Lizenzen verständlich für Unternehmen?",
  "An wen wende ich mich für eine herstellerunabhängige Beratung zur KI-/Copilot-Einführung im Mittelstand?",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const domainOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return null; } };

// ---------- OpenAI Responses API (mit Websuche) ----------
async function askWithWebSearch(prompt, toolType) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, tools: [{ type: toolType }], input: prompt }),
  });
  const j = await res.json();
  if (j.error) throw new Error(`${j.error.code || res.status}: ${j.error.message || ""}`.slice(0, 200));

  let text = "";
  const urls = [];
  for (const item of j.output || []) {
    if (item.type !== "message") continue;
    for (const c of item.content || []) {
      if (c.type === "output_text") {
        text += (c.text || "") + "\n";
        for (const a of c.annotations || []) {
          if (a.type === "url_citation" && a.url) urls.push(a.url);
        }
      }
    }
  }
  return { text: text.trim(), urls };
}

// ---------- Fallback: reines Modellwissen (ohne Live-Websuche) ----------
async function askKnowledge(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages: [{ role: "user", content: prompt }], temperature: 0 }),
  });
  const j = await res.json();
  if (j.error) throw new Error(`${j.error.code || res.status}: ${j.error.message || ""}`.slice(0, 200));
  return { text: (j.choices?.[0]?.message?.content || "").trim(), urls: [] };
}

function snippetAround(text, needle) {
  const low = text.toLowerCase();
  const i = low.indexOf(needle);
  if (i === -1) return text.slice(0, 180).replace(/\s+/g, " ").trim();
  const start = Math.max(0, i - 90);
  return ("…" + text.slice(start, i + 120) + "…").replace(/\s+/g, " ").trim();
}

async function main() {
  if (!API_KEY) {
    console.warn("WARN: OPENAI_API_KEY fehlt — LLM-Check übersprungen, vorhandene Datei bleibt erhalten.");
    process.exit(0);
  }

  // Tool-Typ ermitteln: neuere API nutzt "web_search", ältere "web_search_preview".
  let mode = "web_search";
  let toolType = "web_search";
  try {
    await askWithWebSearch("Test", "web_search");
  } catch (e) {
    if (/web_search/i.test(e.message) && /(unknown|invalid|not|unsupported)/i.test(e.message)) {
      toolType = "web_search_preview";
      try { await askWithWebSearch("Test", "web_search_preview"); }
      catch (e2) { mode = "knowledge"; }
    } else if (/web_search/i.test(e.message)) {
      toolType = "web_search_preview";
    }
  }

  const checks = [];
  const competitorCount = new Map();

  for (const prompt of PROMPTS) {
    let r;
    try {
      r = mode === "knowledge" ? await askKnowledge(prompt) : await askWithWebSearch(prompt, toolType);
    } catch (e) {
      // Wenn Websuche bei einer Frage scheitert: einmal auf Wissen zurückfallen.
      console.warn(`WARN Frage scheitert (${e.message}) — Fallback auf Modellwissen.`);
      try { r = await askKnowledge(prompt); mode = "knowledge"; }
      catch (e2) { checks.push({ prompt, error: e2.message, mentioned: false, cited: false }); continue; }
    }

    const text = r.text || "";
    const mentioned = text.toLowerCase().includes(BRAND);
    const citedUrls = (r.urls || []).filter((u) => (domainOf(u) || "").includes(DOMAIN));
    const cited = citedUrls.length > 0;

    // Wettbewerber-/Quellen-Domains zählen (nur bei Websuche vorhanden)
    for (const u of r.urls || []) {
      const d = domainOf(u);
      if (d && !d.includes(DOMAIN)) competitorCount.set(d, (competitorCount.get(d) || 0) + 1);
    }

    checks.push({
      prompt,
      mentioned,
      cited,
      citation_urls: [...new Set(citedUrls)].slice(0, 5),
      snippet: snippetAround(text, BRAND),
    });
    await sleep(800); // Rate-Limit schonen
  }

  const total = checks.length;
  const mentioned = checks.filter((c) => c.mentioned).length;
  const cited = checks.filter((c) => c.cited).length;
  const mentionRate = total ? Math.round((mentioned / total) * 100) : 0;
  const citationRate = total ? Math.round((cited / total) * 100) : 0;

  const competitorDomains = [...competitorCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([domain, count]) => ({ domain, count }));

  // ---------- Wochen-Historie mergen ----------
  let prev = {};
  try { prev = JSON.parse(readFileSync(OUT, "utf8")); } catch { /* erste Ausführung */ }
  const week = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
  const history = Array.isArray(prev.history) ? prev.history.filter((h) => h.date !== week) : [];
  history.push({ date: week, mention_rate_pct: mentionRate, citation_rate_pct: citationRate });
  history.sort((a, b) => a.date.localeCompare(b.date));
  const trimmed = history.slice(-26);

  const out = {
    meta: {
      domain: DOMAIN,
      generated_at: new Date().toISOString(),
      generated_by: "github-action: build-llm-visibility.js",
      engine: `openai/${MODEL}`,
      mode, // "web_search" = mit Live-Websuche/Zitaten, "knowledge" = reines Modellwissen
      update_frequency: "wöchentlich",
      prompts_count: total,
    },
    status: total ? "ok" : "no_data",
    score: {
      mention_rate_pct: mentionRate,
      citation_rate_pct: citationRate,
      mentioned,
      cited,
      total,
    },
    checks,
    competitor_domains: competitorDomains,
    history: trimmed,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`OK LLM-Sichtbarkeit (${mode}): ${mentioned}/${total} Nennungen (${mentionRate}%), ${cited}/${total} Zitate (${citationRate}%). Wettbewerber-Domains: ${competitorDomains.length}.`);
}

main().catch((e) => { console.error("FEHLER:", e.message); process.exit(1); });
