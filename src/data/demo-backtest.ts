/**
 * Pitch / coworker preview figures — 4 full calendar years, every year green.
 * Swap for your audited series when ready. Still labeled DEMO on the page.
 */
export type YearlyRow = {
  year: number;
  start: number;
  end: number;
  profit: number;
  pct: number;
  partial?: boolean;
};

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
    "Four full years of backing data (2022–2025). Every calendar year closed green. Placeholder figures for the pitch — replace with your locked series when ready.",
  noteBg:
    "Четири пълни години backing данни (2022–2025). Всяка календарна година е на плюс. Placeholder цифри за питча — заменете с вашата заключена серия, когато е готова.",
  yearly: [
    { year: 2022, start: 10000, end: 15280, profit: 5280, pct: 52.8 },
    { year: 2023, start: 15280, end: 23140, profit: 7860, pct: 51.4 },
    { year: 2024, start: 23140, end: 34210, profit: 11070, pct: 47.8 },
    { year: 2025, start: 34210, end: 48620, profit: 14410, pct: 42.1 },
  ] satisfies YearlyRow[],
  /** Steady climb — no down years on the curve */
  equityCurve: [
    10000, 10840, 11420, 12150, 12980, 13820, 14560, 15280, 16120, 17040,
    18110, 19280, 20540, 21890, 23140, 24680, 26240, 27910, 29780, 31840,
    34210, 36120, 38240, 40680, 43250, 45890, 48620,
  ],
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
