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
// Wie oft jede Frage in EINER EIGENEN, unabhängigen Session gefragt wird.
// LLM-Antworten streuen (Nicht-Determinismus + wechselnde Live-Suchergebnisse) —
// mehrere unabhängige Samples + Mittelung ergeben eine belastbare, rauschärmere Kennzahl.
const SAMPLES = Math.max(1, Number(process.env.LLM_VIS_SAMPLES || 3));
// Alte Fehllauf-Datenpunkte, die einmalig aus der Historie entfernt werden sollen.
const HISTORY_DROP_DATES = new Set(["2026-06-29"]); // 29.06. = gescheiterter Lauf (invalid_api_key)

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
    // store:false + kein previous_response_id ⇒ jede Anfrage ist eine komplett
    // eigenständige Session ohne geteilten Kontext (valides, unabhängiges Sampling).
    body: JSON.stringify({ model: MODEL, tools: [{ type: toolType }], input: prompt, store: false }),
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
    // Default-Temperatur (kein temperature:0), damit die Samples real streuen wie beim Nutzer.
    body: JSON.stringify({ model: MODEL, messages: [{ role: "user", content: prompt }], store: false }),
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

const cleanErr = (m) => String(m).replace(/sk-[A-Za-z0-9*_-]+/g, "sk-***").slice(0, 160);
const isAuthErr = (m) => /invalid_api_key|incorrect api key|401|unauthorized|invalid_request_error.*api key/i.test(String(m));

// Schreibt einen ehrlichen Fehler-Snapshot (ohne die bestehende Historie zu verfälschen) und beendet.
async function writeError(hint) {
  let prev = {};
  try { const r = await fetch(`https://${DOMAIN}/dashboard/llm-visibility.json?_=${Date.now()}`); if (r.ok) prev = await r.json(); } catch { /* egal */ }
  const out = {
    meta: { domain: DOMAIN, generated_at: new Date().toISOString(), generated_by: "github-action: build-llm-visibility.js", engine: `openai/${MODEL}`, mode: "web_search", update_frequency: "wöchentlich", prompts_count: 0 },
    status: "error",
    error_hint: cleanErr(hint),
    score: { mention_rate_pct: null, citation_rate_pct: null, mentioned: 0, cited: 0, answered: 0, errored: 0, total: 0 },
    checks: [],
    competitor_domains: [],
    history: Array.isArray(prev.history) ? prev.history : [],
  };
  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.error(`FEHLER: LLM-Check nicht durchgeführt — ${cleanErr(hint)}`);
}

async function main() {
  if (!API_KEY) {
    console.warn("WARN: OPENAI_API_KEY fehlt — LLM-Check übersprungen, vorhandene Datei bleibt erhalten.");
    process.exit(0);
  }

  // Tool-Typ ermitteln: neuere API nutzt "web_search", ältere "web_search_preview".
  // Fällt der Probe-Call auf einen Auth-Fehler (ungültiger Key), sofort ehrlich abbrechen —
  // KEINE 8 sinnlosen Anfragen, KEIN irreführendes "0 %".
  let mode = "web_search";
  let toolType = "web_search";
  try {
    await askWithWebSearch("Test", "web_search");
  } catch (e) {
    if (isAuthErr(e.message)) { await writeError(e.message); process.exit(1); }
    if (/web_search/i.test(e.message) && /(unknown|invalid|not|unsupported)/i.test(e.message)) {
      toolType = "web_search_preview";
      try { await askWithWebSearch("Test", "web_search_preview"); }
      catch (e2) { if (isAuthErr(e2.message)) { await writeError(e2.message); process.exit(1); } mode = "knowledge"; }
    } else if (/web_search/i.test(e.message)) {
      toolType = "web_search_preview";
    }
  }

  const checks = [];
  const competitorCount = new Map();

  for (const prompt of PROMPTS) {
    let mentionedCount = 0, citedCount = 0, sampleCount = 0, lastErr = "";
    const citationUrls = new Set();
    let snippet = "";

    // Jede Frage SAMPLES-mal in einer eigenen, unabhängigen Session (getrennte Requests).
    for (let s = 0; s < SAMPLES; s++) {
      let r;
      try {
        r = mode === "knowledge" ? await askKnowledge(prompt) : await askWithWebSearch(prompt, toolType);
      } catch (e) {
        try { r = await askKnowledge(prompt); mode = "knowledge"; }
        catch (e2) { lastErr = cleanErr(e2.message); await sleep(500); continue; }
      }

      sampleCount++;
      const text = r.text || "";
      const isMentioned = text.toLowerCase().includes(BRAND);
      const citedForUrls = (r.urls || []).filter((u) => (domainOf(u) || "").includes(DOMAIN));
      if (isMentioned) mentionedCount++;
      if (citedForUrls.length) citedCount++;
      citedForUrls.forEach((u) => citationUrls.add(u));
      // Repräsentativen Snippet bevorzugt aus einem Sample MIT Nennung wählen.
      if (!snippet || (isMentioned && !snippet.includes(BRAND))) snippet = snippetAround(text, BRAND);
      // Wettbewerber-/Quellen-Domains über ALLE Samples zählen.
      for (const u of r.urls || []) {
        const d = domainOf(u);
        if (d && !d.includes(DOMAIN)) competitorCount.set(d, (competitorCount.get(d) || 0) + 1);
      }
      await sleep(700); // Rate-Limit schonen
    }

    if (sampleCount === 0) {
      checks.push({ prompt, error: lastErr || "Keine Antwort", mentioned: false, cited: false, mentioned_count: 0, cited_count: 0, sample_count: 0 });
    } else {
      checks.push({
        prompt,
        mentioned: mentionedCount > 0,
        cited: citedCount > 0,
        mentioned_count: mentionedCount,
        cited_count: citedCount,
        sample_count: sampleCount,
        citation_urls: [...citationUrls].slice(0, 5),
        snippet,
      });
    }
  }

  // ---------- Aggregation (Sample-basiert) ----------
  const promptsTotal = checks.length;
  const promptsErrored = checks.filter((c) => (c.sample_count || 0) === 0).length;
  const answeredSamples = checks.reduce((n, c) => n + (c.sample_count || 0), 0);
  const totalSamples = promptsTotal * SAMPLES;
  const erroredSamples = totalSamples - answeredSamples;
  const mentionsTotal = checks.reduce((n, c) => n + (c.mentioned_count || 0), 0);
  const citationsTotal = checks.reduce((n, c) => n + (c.cited_count || 0), 0);
  const promptsWithMention = checks.filter((c) => (c.mentioned_count || 0) > 0).length;
  // Rate = Nennungen über ALLE beantworteten Samples (glatte, rauschärmere Kennzahl).
  const mentionRate = answeredSamples ? Math.round((mentionsTotal / answeredSamples) * 100) : null;
  const citationRate = answeredSamples ? Math.round((citationsTotal / answeredSamples) * 100) : null;
  const status = answeredSamples === 0 ? "error" : ((promptsErrored > 0 || erroredSamples > 0) ? "partial" : "ok");
  const errorHint = answeredSamples === 0 ? cleanErr(checks.find((c) => c.error)?.error || "Keine Antworten erhalten") : null;

  const competitorDomains = [...competitorCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([domain, count]) => ({ domain, count }));

  // ---------- Wochen-Historie mergen ----------
  // Vorherige Historie von der Live-Seite holen (kein Repo-Read → keine Merge-Konflikte).
  let prev = await (async () => {
    try {
      const r = await fetch(`https://${DOMAIN}/dashboard/llm-visibility.json?_=${Date.now()}`);
      if (r.ok) return await r.json();
    } catch { /* Live noch nicht vorhanden */ }
    try { return JSON.parse(readFileSync(OUT, "utf8")); } catch { return {}; }
  })();
  const week = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
  // Aktuelle Woche neu setzen + bekannte Fehllauf-Tage dauerhaft entfernen.
  const history = (Array.isArray(prev.history) ? prev.history : [])
    .filter((h) => h.date !== week && !HISTORY_DROP_DATES.has(h.date));
  if (answeredSamples > 0) history.push({ date: week, mention_rate_pct: mentionRate, citation_rate_pct: citationRate });
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
      prompts_count: promptsTotal,
      samples_per_prompt: SAMPLES,
      answered_samples: answeredSamples,
      total_samples: totalSamples,
    },
    status, // "ok" | "partial" | "error"
    error_hint: errorHint,
    score: {
      mention_rate_pct: mentionRate,
      citation_rate_pct: citationRate,
      prompts_with_mention: promptsWithMention,
      prompts_total: promptsTotal,
      mentions_total: mentionsTotal,
      citations_total: citationsTotal,
      answered_samples: answeredSamples,
      errored_samples: erroredSamples,
      total_samples: totalSamples,
    },
    checks,
    competitor_domains: competitorDomains,
    history: trimmed,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`LLM-Sichtbarkeit [${status}] (${mode}, ${SAMPLES}x): ${answeredSamples}/${totalSamples} Samples ok; Nennungen ${mentionsTotal} (${mentionRate ?? "n/v"}%), Zitate ${citationsTotal} (${citationRate ?? "n/v"}%); Fragen mit ≥1 Nennung ${promptsWithMention}/${promptsTotal}. Wettbewerber-Domains: ${competitorDomains.length}.`);
  if (status === "error") process.exit(1);
}

main().catch((e) => { console.error("FEHLER:", e.message); process.exit(1); });
