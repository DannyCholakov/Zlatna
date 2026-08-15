/**
 * Pitch / coworker preview figures — 4 full calendar years, every year green.
 * Swap yearly / monthly / equity series for your real data when ready.
 * Still labeled DEMO on the page.
 */

export type PeriodRow = {
  /** Display key, e.g. 2022 or "2022-01" */
  key: string;
  label: string;
  start: number;
  end: number;
  profit: number;
  pct: number;
  partial?: boolean;
};

export type YearlyRow = {
  year: number;
  start: number;
  end: number;
  profit: number;
  pct: number;
  partial?: boolean;
};

/** Build month labels + compounding equity so yearly totals stay consistent. */
function buildMonthly(
  yearly: readonly YearlyRow[],
): { monthly: PeriodRow[]; equityMonthly: number[] } {
  const monthly: PeriodRow[] = [];
  const equityMonthly: number[] = [];
  let equity = yearly[0]?.start ?? 10_000;
  equityMonthly.push(equity);

  for (const y of yearly) {
    const yearStart = equity;
    // Slightly uneven positive months that compound to year end
    const monthFactors = [
      1.035, 1.028, 1.042, 1.031, 1.038, 1.025, 1.04, 1.033, 1.029, 1.036,
      1.041, 1.0,
    ];
    // Scale so product matches year end / year start
    const rawProduct = monthFactors.reduce((a, b) => a * b, 1);
    const target = y.end / yearStart;
    const scale = Math.pow(target / rawProduct, 1 / 12);
    const factors = monthFactors.map((f) => f * scale);

    for (let m = 0; m < 12; m++) {
      const start = equity;
      equity = Math.round(start * factors[m]);
      if (m === 11) equity = y.end; // lock year-end
      const profit = equity - start;
      const pct = (profit / start) * 100;
      const mm = String(m + 1).padStart(2, "0");
      monthly.push({
        key: `${y.year}-${mm}`,
        label: `${y.year}-${mm}`,
        start,
        end: equity,
        profit,
        pct: Math.round(pct * 10) / 10,
      });
      equityMonthly.push(equity);
    }
  }

  return { monthly, equityMonthly };
}

const yearlyBase: YearlyRow[] = [
  { year: 2022, start: 10000, end: 15280, profit: 5280, pct: 52.8 },
  { year: 2023, start: 15280, end: 23140, profit: 7860, pct: 51.4 },
  { year: 2024, start: 23140, end: 34210, profit: 11070, pct: 47.8 },
  { year: 2025, start: 34210, end: 48620, profit: 14410, pct: 42.1 },
];

const { monthly, equityMonthly } = buildMonthly(yearlyBase);

const equityYearly = [
  yearlyBase[0].start,
  ...yearlyBase.map((y) => y.end),
];

export const demoBacktest = {
  label: "DEMO",
  strategy: "Zlatna bot — 4y verified track",
  symbol: "XAUUSD",
  timeframe: "M5",
  yearsBacked: 4,
  startEquity: 10_000,
  endEquity: 48_620,
  netPct: 386.2,
  maxDrawdownPct: 6.8,
  trades: 1840,
  winRatePct: 100,
  noteEn:
    "Four full years of backing data (2022–2025). Toggle years or months — demo figures until your real series is plugged in.",
  noteBg:
    "Четири пълни години backing данни (2022–2025). Превключвайте години или месеци — демо цифри, докато включим реалната серия.",
  yearly: yearlyBase,
  monthly,
  /** Year-end equity path (for Years view) */
  equityYearly,
  /** Month-end equity path (for Months view) */
  equityMonthly,
  /** @deprecated use equityYearly — kept for older imports */
  equityCurve: equityYearly,
} as const;

export function formatMoney(n: number, locale: string): string {
  return new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPct(n: number, locale: string): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

export function formatMonthLabel(key: string, locale: string): string {
  const [y, m] = key.split("-").map(Number);
  if (!y || !m) return key;
  const d = new Date(Date.UTC(y, m - 1, 1));
  return new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
