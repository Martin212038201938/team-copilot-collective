#!/usr/bin/env node

/**
 * OpenAI Cost Tracker & Kill-Switch
 *
 * Trackt OpenAI API Kosten und verhindert übermäßige Ausgaben durch
 * automatischen Kill-Switch bei Überschreitung des Tages-Limits.
 *
 * Features:
 * - Tägliches Kosten-Limit: 3 EUR
 * - Persistentes Tracking über .openai-usage.json
 * - Automatischer Reset um Mitternacht
 * - Kill-Switch bei Limit-Überschreitung
 * - Detaillierte Usage-Statistiken
 *
 * Security:
 * - .openai-usage.json ist in .gitignore (wird nicht committed)
 * - Alle Kosten werden lokal getrackt
 * - Sofortige Abschaltung bei Verdacht auf Schleife
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguration
const DAILY_LIMIT_EUR = 3.0; // Maximale Kosten pro Tag in EUR
const USAGE_FILE = path.join(__dirname, '../.openai-usage.json');
const MAX_REQUESTS_PER_MINUTE = 10; // Schutz vor Endlosschleifen
const MAX_REQUESTS_PER_HOUR = 50;

// OpenAI Pricing (Stand November 2024)
const PRICING = {
  'gpt-4o': {
    input: 2.50 / 1_000_000,  // $2.50 per 1M tokens
    output: 10.00 / 1_000_000, // $10.00 per 1M tokens
  },
  'gpt-4-turbo': {
    input: 10.00 / 1_000_000,
    output: 30.00 / 1_000_000,
  },
  'gpt-4': {
    input: 30.00 / 1_000_000,
    output: 60.00 / 1_000_000,
  },
};

// USD zu EUR Kurs (wird bei Bedarf aktualisiert)
const USD_TO_EUR = 0.92;

/**
 * Lade Usage-Daten
 */
function loadUsage() {
  if (!fs.existsSync(USAGE_FILE)) {
    return {
      date: getTodayDate(),
      totalCostEur: 0,
      totalRequests: 0,
      requests: [],
      lastReset: new Date().toISOString(),
    };
  }

  try {
    const data = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf-8'));

    // Auto-Reset bei neuem Tag
    if (data.date !== getTodayDate()) {
      console.log(`📅 Neuer Tag erkannt. Reset Usage-Tracking.`);
      return {
        date: getTodayDate(),
        totalCostEur: 0,
        totalRequests: 0,
        requests: [],
        lastReset: new Date().toISOString(),
        previousDays: [...(data.previousDays || []), {
          date: data.date,
          totalCostEur: data.totalCostEur,
          totalRequests: data.totalRequests,
        }].slice(-30), // Behalte nur letzte 30 Tage
      };
    }

    return data;
  } catch (error) {
    console.error('⚠️ Fehler beim Laden von Usage-Daten:', error.message);
    return {
      date: getTodayDate(),
      totalCostEur: 0,
      totalRequests: 0,
      requests: [],
      lastReset: new Date().toISOString(),
    };
  }
}

/**
 * Speichere Usage-Daten
 */
function saveUsage(usage) {
  try {
    fs.writeFileSync(USAGE_FILE, JSON.stringify(usage, null, 2), 'utf-8');
  } catch (error) {
    console.error('❌ KRITISCH: Konnte Usage-Daten nicht speichern:', error.message);
  }
}

/**
 * Heutiges Datum als String (YYYY-MM-DD)
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Berechne Kosten für einen API-Call
 */
function calculateCost(model, promptTokens, completionTokens) {
  const pricing = PRICING[model] || PRICING['gpt-4o']; // Fallback zu gpt-4o

  const inputCostUsd = promptTokens * pricing.input;
  const outputCostUsd = completionTokens * pricing.output;
  const totalCostUsd = inputCostUsd + outputCostUsd;
  const totalCostEur = totalCostUsd * USD_TO_EUR;

  return {
    inputCostUsd,
    outputCostUsd,
    totalCostUsd,
    totalCostEur,
  };
}

/**
 * Prüfe, ob Kill-Switch aktiviert werden muss
 */
function checkKillSwitch(usage) {
  // 1. Tägliches Kosten-Limit
  if (usage.totalCostEur >= DAILY_LIMIT_EUR) {
    throw new Error(
      `🚨 KILL-SWITCH AKTIVIERT!\n\n` +
      `Tägliches Kosten-Limit erreicht: ${usage.totalCostEur.toFixed(4)} EUR / ${DAILY_LIMIT_EUR} EUR\n` +
      `Alle OpenAI API-Anfragen wurden GESTOPPT.\n\n` +
      `Grund: Schutz vor übermäßigen Kosten durch Fehler oder Endlosschleifen.\n\n` +
      `Lösungen:\n` +
      `1. Warte bis morgen (automatischer Reset um Mitternacht)\n` +
      `2. Erhöhe DAILY_LIMIT_EUR in scripts/cost-tracker.js\n` +
      `3. Lösche .openai-usage.json für manuellen Reset (nur bei Bedarf!)\n\n` +
      `Heutige Anfragen: ${usage.totalRequests}`
    );
  }

  // 2. Schutz vor Endlosschleifen: Requests pro Minute
  const oneMinuteAgo = Date.now() - 60 * 1000;
  const recentRequests = usage.requests.filter(
    (req) => new Date(req.timestamp).getTime() > oneMinuteAgo
  );

  if (recentRequests.length > MAX_REQUESTS_PER_MINUTE) {
    throw new Error(
      `🚨 KILL-SWITCH AKTIVIERT!\n\n` +
      `Zu viele Anfragen in einer Minute: ${recentRequests.length} / ${MAX_REQUESTS_PER_MINUTE}\n` +
      `Verdacht auf Endlosschleife oder Fehler im Code.\n\n` +
      `Alle OpenAI API-Anfragen wurden GESTOPPT.\n\n` +
      `Bitte überprüfe deinen Code auf:\n` +
      `- Endlosschleifen\n` +
      `- Rekursive API-Calls\n` +
      `- Fehlerhafte Retry-Logik\n\n` +
      `Lösung: Warte 5 Minuten und behebe den Fehler.`
    );
  }

  // 3. Schutz vor Endlosschleifen: Requests pro Stunde
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const hourlyRequests = usage.requests.filter(
    (req) => new Date(req.timestamp).getTime() > oneHourAgo
  );

  if (hourlyRequests.length > MAX_REQUESTS_PER_HOUR) {
    throw new Error(
      `🚨 KILL-SWITCH AKTIVIERT!\n\n` +
      `Zu viele Anfragen in einer Stunde: ${hourlyRequests.length} / ${MAX_REQUESTS_PER_HOUR}\n` +
      `Verdacht auf Massenverarbeitung oder Fehler.\n\n` +
      `Alle OpenAI API-Anfragen wurden GESTOPPT.\n\n` +
      `Bitte überprüfe dein Skript und reduziere die Anfrage-Frequenz.`
    );
  }
}

/**
 * Vor jedem API-Call: Prüfe Limits
 */
export function checkBeforeRequest() {
  const usage = loadUsage();

  // Kill-Switch prüfen
  checkKillSwitch(usage);

  // Warnung bei 80% des Limits
  if (usage.totalCostEur >= DAILY_LIMIT_EUR * 0.8) {
    console.warn(
      `⚠️  WARNUNG: 80% des Tages-Limits erreicht!\n` +
      `   Aktuelle Kosten: ${usage.totalCostEur.toFixed(4)} EUR / ${DAILY_LIMIT_EUR} EUR\n` +
      `   Verbleibend: ${(DAILY_LIMIT_EUR - usage.totalCostEur).toFixed(4)} EUR`
    );
  }

  return usage;
}

/**
 * Nach jedem API-Call: Tracke Usage
 */
export function trackUsage(model, promptTokens, completionTokens, metadata = {}) {
  const usage = loadUsage();

  // Berechne Kosten
  const cost = calculateCost(model, promptTokens, completionTokens);

  // Füge Request hinzu
  const request = {
    timestamp: new Date().toISOString(),
    model,
    promptTokens,
    completionTokens,
    totalTokens: promptTokens + completionTokens,
    costEur: cost.totalCostEur,
    costUsd: cost.totalCostUsd,
    ...metadata,
  };

  usage.requests.push(request);
  usage.totalCostEur += cost.totalCostEur;
  usage.totalRequests += 1;

  // Behalte nur letzte 100 Requests für Performance
  if (usage.requests.length > 100) {
    usage.requests = usage.requests.slice(-100);
  }

  // Speichern
  saveUsage(usage);

  // Ausgabe
  console.log(
    `💰 API-Kosten: ${cost.totalCostEur.toFixed(4)} EUR ` +
    `(${promptTokens} + ${completionTokens} tokens)`
  );
  console.log(
    `📊 Heutige Gesamt-Kosten: ${usage.totalCostEur.toFixed(4)} EUR / ${DAILY_LIMIT_EUR} EUR ` +
    `(${((usage.totalCostEur / DAILY_LIMIT_EUR) * 100).toFixed(1)}%)`
  );

  return usage;
}

/**
 * Zeige Usage-Statistiken
 */
export function showStatistics() {
  const usage = loadUsage();

  console.log('\n📊 OpenAI Usage Statistiken');
  console.log('═'.repeat(60));
  console.log(`📅 Datum: ${usage.date}`);
  console.log(`💰 Gesamtkosten heute: ${usage.totalCostEur.toFixed(4)} EUR / ${DAILY_LIMIT_EUR} EUR`);
  console.log(`📈 Verbraucht: ${((usage.totalCostEur / DAILY_LIMIT_EUR) * 100).toFixed(1)}%`);
  console.log(`🔢 Anfragen heute: ${usage.totalRequests}`);
  console.log(`⚡ Verbleibend: ${(DAILY_LIMIT_EUR - usage.totalCostEur).toFixed(4)} EUR`);

  if (usage.requests.length > 0) {
    const lastRequest = usage.requests[usage.requests.length - 1];
    console.log(`🕐 Letzte Anfrage: ${new Date(lastRequest.timestamp).toLocaleTimeString('de-DE')}`);
  }

  // Letzte 30 Tage
  if (usage.previousDays && usage.previousDays.length > 0) {
    console.log('\n📆 Letzte 30 Tage:');
    const total30Days = usage.previousDays.reduce((sum, day) => sum + day.totalCostEur, 0);
    console.log(`   Gesamt: ${total30Days.toFixed(4)} EUR`);
    console.log(`   Durchschnitt: ${(total30Days / usage.previousDays.length).toFixed(4)} EUR/Tag`);
  }

  console.log('═'.repeat(60) + '\n');
}

/**
 * Reset Usage (manuell, nur für Notfälle)
 */
export function resetUsage() {
  if (fs.existsSync(USAGE_FILE)) {
    fs.unlinkSync(USAGE_FILE);
    console.log('✅ Usage-Daten wurden zurückgesetzt.');
  } else {
    console.log('ℹ️  Keine Usage-Daten vorhanden.');
  }
}

/**
 * CLI Commands
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];

  switch (command) {
    case 'stats':
    case 'status':
      showStatistics();
      break;

    case 'reset':
      const confirm = process.argv[3];
      if (confirm === '--confirm') {
        resetUsage();
      } else {
        console.log('⚠️  Bist du sicher? Führe aus: node scripts/cost-tracker.js reset --confirm');
      }
      break;

    default:
      console.log(`
OpenAI Cost Tracker & Kill-Switch

Usage:
  node scripts/cost-tracker.js stats      # Zeige Statistiken
  node scripts/cost-tracker.js reset      # Reset Usage (erfordert --confirm)

Limits:
  Tägliches Limit: ${DAILY_LIMIT_EUR} EUR
  Max. Requests/Minute: ${MAX_REQUESTS_PER_MINUTE}
  Max. Requests/Stunde: ${MAX_REQUESTS_PER_HOUR}

Kill-Switch:
  Wird automatisch aktiviert bei Überschreitung der Limits.
  Schützt vor Endlosschleifen und übermäßigen Kosten.
      `);
  }
}
