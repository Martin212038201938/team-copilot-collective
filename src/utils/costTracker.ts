/**
 * OpenAI API Cost Tracker with Daily Limit Killswitch
 *
 * Tracks API usage and enforces a €3 daily limit
 * Resets daily at 9:00 AM
 */

// GPT-4o Pricing (as of 2025)
const PRICING = {
  'gpt-4o': {
    input: 2.50 / 1_000_000,  // $2.50 per 1M input tokens
    output: 10.00 / 1_000_000, // $10.00 per 1M output tokens
  },
};

const USD_TO_EUR = 0.92; // Approximate conversion rate
const DAILY_LIMIT_EUR = 3.00;
const RESET_HOUR = 9; // 9:00 AM

export interface CostEntry {
  timestamp: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUSD: number;
  costEUR: number;
}

export interface DailyUsage {
  date: string; // YYYY-MM-DD
  entries: CostEntry[];
  totalCostEUR: number;
  limitExceeded: boolean;
  warningEmailSent: boolean;
}

/**
 * Get the current date in Berlin timezone (YYYY-MM-DD)
 */
function getCurrentDate(): string {
  const now = new Date();
  // Convert to Berlin time (UTC+1/+2)
  const berlinTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
  return berlinTime.toISOString().split('T')[0];
}

/**
 * Get the current hour in Berlin timezone
 */
function getCurrentHour(): number {
  const now = new Date();
  const berlinTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
  return berlinTime.getHours();
}

/**
 * Calculate cost for a specific API call
 */
export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): { costUSD: number; costEUR: number } {
  const pricing = PRICING[model as keyof typeof PRICING] || PRICING['gpt-4o'];

  const costUSD = (inputTokens * pricing.input) + (outputTokens * pricing.output);
  const costEUR = costUSD * USD_TO_EUR;

  return { costUSD, costEUR };
}

/**
 * Load daily usage from localStorage
 */
export function loadDailyUsage(): DailyUsage {
  const currentDate = getCurrentDate();
  const stored = localStorage.getItem('openai_daily_usage');

  if (!stored) {
    return createNewDailyUsage(currentDate);
  }

  try {
    const usage: DailyUsage = JSON.parse(stored);

    // Check if we need to reset (new day or after 9 AM reset time)
    if (shouldReset(usage.date)) {
      return createNewDailyUsage(currentDate);
    }

    return usage;
  } catch (error) {
    console.error('Error loading daily usage:', error);
    return createNewDailyUsage(currentDate);
  }
}

/**
 * Check if we should reset the daily usage
 */
function shouldReset(storedDate: string): boolean {
  const currentDate = getCurrentDate();
  const currentHour = getCurrentHour();

  // If it's a new day and past 9 AM, reset
  if (storedDate !== currentDate && currentHour >= RESET_HOUR) {
    return true;
  }

  // If it's the same day but we're past reset hour and the stored date was yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (storedDate === yesterdayStr && currentHour >= RESET_HOUR) {
    return true;
  }

  return false;
}

/**
 * Create a new daily usage object
 */
function createNewDailyUsage(date: string): DailyUsage {
  return {
    date,
    entries: [],
    totalCostEUR: 0,
    limitExceeded: false,
    warningEmailSent: false,
  };
}

/**
 * Save daily usage to localStorage
 */
export function saveDailyUsage(usage: DailyUsage): void {
  localStorage.setItem('openai_daily_usage', JSON.stringify(usage));
}

/**
 * Track a new API call
 */
export function trackAPICall(
  model: string,
  inputTokens: number,
  outputTokens: number
): DailyUsage {
  const usage = loadDailyUsage();
  const { costUSD, costEUR } = calculateCost(model, inputTokens, outputTokens);

  const entry: CostEntry = {
    timestamp: new Date().toISOString(),
    model,
    inputTokens,
    outputTokens,
    costUSD,
    costEUR,
  };

  usage.entries.push(entry);
  usage.totalCostEUR += costEUR;

  // Check if limit exceeded
  if (usage.totalCostEUR >= DAILY_LIMIT_EUR && !usage.limitExceeded) {
    usage.limitExceeded = true;
  }

  saveDailyUsage(usage);
  return usage;
}

/**
 * Check if API usage is allowed (killswitch check)
 */
export function isAPIUsageAllowed(): {
  allowed: boolean;
  reason?: string;
  usage?: DailyUsage;
} {
  const usage = loadDailyUsage();

  if (usage.limitExceeded) {
    const currentHour = getCurrentHour();
    const nextResetTime = currentHour < RESET_HOUR
      ? `heute um ${RESET_HOUR}:00 Uhr`
      : `morgen um ${RESET_HOUR}:00 Uhr`;

    return {
      allowed: false,
      reason: `Tageslimit von €${DAILY_LIMIT_EUR.toFixed(2)} überschritten. Aktuell: €${usage.totalCostEUR.toFixed(2)}. Nächster Reset: ${nextResetTime}`,
      usage,
    };
  }

  return {
    allowed: true,
    usage,
  };
}

/**
 * Mark warning email as sent
 */
export function markWarningEmailSent(): void {
  const usage = loadDailyUsage();
  usage.warningEmailSent = true;
  saveDailyUsage(usage);
}

/**
 * Send warning email (calls backend)
 */
export async function sendWarningEmail(usage: DailyUsage): Promise<void> {
  if (usage.warningEmailSent) {
    return; // Already sent today
  }

  try {
    const response = await fetch('/api/send-cost-warning.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: usage.date,
        totalCostEUR: usage.totalCostEUR,
        limit: DAILY_LIMIT_EUR,
        entriesCount: usage.entries.length,
      }),
    });

    if (response.ok) {
      markWarningEmailSent();
      console.log('Warning email sent successfully');
    } else {
      console.error('Failed to send warning email:', await response.text());
    }
  } catch (error) {
    console.error('Error sending warning email:', error);
  }
}

/**
 * Get usage statistics
 */
export function getUsageStats(): {
  todayCostEUR: number;
  remainingEUR: number;
  percentageUsed: number;
  limitExceeded: boolean;
  entries: CostEntry[];
} {
  const usage = loadDailyUsage();

  return {
    todayCostEUR: usage.totalCostEUR,
    remainingEUR: Math.max(0, DAILY_LIMIT_EUR - usage.totalCostEUR),
    percentageUsed: (usage.totalCostEUR / DAILY_LIMIT_EUR) * 100,
    limitExceeded: usage.limitExceeded,
    entries: usage.entries,
  };
}

/**
 * Reset usage (for testing/admin purposes)
 */
export function resetUsage(): void {
  const currentDate = getCurrentDate();
  saveDailyUsage(createNewDailyUsage(currentDate));
}
