/**
 * DEMO backtest figures for coworker review — replace with real series later.
 * Clearly labeled as simulation on the site. Not live trading performance.
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
  strategy: "Zlatna session method (lab preview)",
  symbol: "XAUUSD",
  timeframe: "M5",
  startEquity: 10_000,
  endEquity: 16_280,
  netPct: 62.8,
  maxDrawdownPct: 14.2,
  trades: 412,
  winRatePct: 48.5,
  noteEn:
    "Illustrative simulation for design review. Not audited live results. Real numbers will replace this table.",
  noteBg:
    "Илюстративна симулация за преглед на дизайна. Не са одитирани живи резултати. Реалните числа ще заменят тази таблица.",
  yearly: [
    { year: 2022, start: 10000, end: 11240, profit: 1240, pct: 12.4 },
    { year: 2023, start: 11240, end: 10810, profit: -430, pct: -3.8 },
    { year: 2024, start: 10810, end: 13150, profit: 2340, pct: 21.6 },
    { year: 2025, start: 13150, end: 14890, profit: 1740, pct: 13.2 },
    {
      year: 2026,
      start: 14890,
      end: 16280,
      profit: 1390,
      pct: 9.3,
      partial: true,
    },
  ] satisfies YearlyRow[],
  equityCurve: [
    10000, 10120, 9980, 10340, 10510, 10420, 10880, 11100, 11240, 11050,
    10920, 10810, 11200, 11840, 12100, 12550, 12890, 13150, 13620, 14010,
    14480, 14890, 15220, 15540, 15810, 16280,
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
