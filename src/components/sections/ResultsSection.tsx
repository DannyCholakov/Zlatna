"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  demoBacktest,
  formatMoney,
  formatPct,
} from "@/data/demo-backtest";

type Range = "years" | "months";

const MONTH_ABBR = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

const W = 640;
const H = 160;

function toPoints(values: readonly number[]): { x: number; y: number }[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => ({
    x: values.length === 1 ? W / 2 : (i / (values.length - 1)) * W,
    y: H - ((v - min) / span) * (H - 16) - 8,
  }));
}

function resample(
  pts: { x: number; y: number }[],
  n: number,
): { x: number; y: number }[] {
  if (pts.length === 0)
    return Array.from({ length: n }, () => ({ x: 0, y: H / 2 }));
  if (pts.length === 1) {
    return Array.from({ length: n }, (_, i) => ({
      x: (i / Math.max(n - 1, 1)) * W,
      y: pts[0].y,
    }));
  }
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1);
    const f = t * (pts.length - 1);
    const i0 = Math.floor(f);
    const i1 = Math.min(i0 + 1, pts.length - 1);
    const u = f - i0;
    out.push({
      x: pts[i0].x + (pts[i1].x - pts[i0].x) * u,
      y: pts[i0].y + (pts[i1].y - pts[i0].y) * u,
    });
  }
  return out.map((p, i) => ({
    x: n === 1 ? W / 2 : (i / (n - 1)) * W,
    y: p.y,
  }));
}

function pointsToAttr(pts: { x: number; y: number }[]): string {
  return pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

function EquityChart({
  values,
  label,
}: {
  values: readonly number[];
  label: string;
}) {
  const targetPts = useMemo(() => toPoints(values), [values]);
  const [drawPts, setDrawPts] = useState(() => targetPts);
  const fromRef = useRef(targetPts);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = resample(fromRef.current, 48);
    const to = resample(targetPts, 48);
    const start = performance.now();
    const dur = 520;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      const mixed = from.map((p, i) => ({
        x: p.x + (to[i].x - p.x) * e,
        y: p.y + (to[i].y - p.y) * e,
      }));
      setDrawPts(mixed);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = targetPts;
        setDrawPts(targetPts);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetPts]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-40 w-full overflow-visible"
      role="img"
      aria-label={label}
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pointsToAttr(drawPts)}
        className="text-z-gold"
      />
    </svg>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "bg-z-gold px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-z-bg"
          : "border border-z-line px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-z-muted transition hover:border-z-gold/40 hover:text-z-ink"
      }
    >
      {children}
    </button>
  );
}

function toggleInSet(set: Set<number>, value: number): Set<number> {
  const next = new Set(set);
  if (next.has(value)) {
    if (next.size > 1) next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

export function ResultsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { results } = dict;
  const note = locale === "bg" ? demoBacktest.noteBg : demoBacktest.noteEn;
  const years = demoBacktest.yearly.map((y) => y.year);

  const [range, setRange] = useState<Range>("years");
  const [selectedYears, setSelectedYears] = useState<Set<number>>(
    () => new Set(years),
  );
  const [selectedMonths, setSelectedMonths] = useState<Set<number>>(
    () => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  );

  const activeYears = useMemo(() => {
    const sorted = [...selectedYears].sort((a, b) => a - b);
    return sorted.length ? sorted : years;
  }, [selectedYears, years]);

  const activeMonths = useMemo(() => {
    const sorted = [...selectedMonths].sort((a, b) => a - b);
    return sorted.length
      ? sorted
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }, [selectedMonths]);

  const curve = useMemo(() => {
    if (range === "years") {
      const pts: number[] = [];
      for (const y of demoBacktest.yearly) {
        if (!activeYears.includes(y.year)) continue;
        if (pts.length === 0) pts.push(y.start);
        pts.push(y.end);
      }
      return pts.length ? pts : demoBacktest.equityYearly;
    }

    // Month-end equity for selected year(s) × month(s)
    const pts: number[] = [];
    let seeded = false;
    for (const row of demoBacktest.monthly) {
      const [ys, ms] = row.key.split("-").map(Number);
      if (!activeYears.includes(ys) || !activeMonths.includes(ms)) continue;
      if (!seeded) {
        pts.push(row.start);
        seeded = true;
      }
      pts.push(row.end);
    }
    return pts.length ? pts : demoBacktest.equityMonthly;
  }, [range, activeYears, activeMonths]);

  const rows = useMemo(() => {
    if (range === "years") {
      return demoBacktest.yearly
        .filter((r) => activeYears.includes(r.year))
        .map((r) => ({
          key: String(r.year),
          label: String(r.year),
          start: r.start,
          end: r.end,
          profit: r.profit,
          pct: r.pct,
          partial: r.partial,
        }));
    }
    return demoBacktest.monthly
      .filter((r) => {
        const [ys, ms] = r.key.split("-").map(Number);
        return activeYears.includes(ys) && activeMonths.includes(ms);
      })
      .map((r) => {
        const [, ms] = r.key.split("-").map(Number);
        const year = r.key.slice(0, 4);
        return {
          ...r,
          label: `${MONTH_ABBR[ms - 1]} ${year}`,
        };
      });
  }, [range, activeYears, activeMonths]);

  const periodCol = range === "years" ? results.colYear : results.colMonth;

  return (
    <section id="results" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-z-gold">
              {results.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl text-z-ink md:text-5xl">
              {results.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-z-muted">
              {results.lead}
            </p>
          </div>
          <span className="border border-z-gold/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-z-gold">
            {results.demoBadge}
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div
            className="inline-flex border border-z-line p-1"
            role="tablist"
            aria-label={results.rangeLabel}
          >
            {(
              [
                ["years", results.viewYears],
                ["months", results.viewMonths],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={range === id}
                onClick={() => setRange(id)}
                className={
                  range === id
                    ? "bg-z-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-z-bg"
                    : "px-4 py-2 text-xs uppercase tracking-[0.14em] text-z-muted transition hover:text-z-ink"
                }
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex max-w-full flex-wrap justify-center gap-2">
            {years.map((y) => (
              <Chip
                key={y}
                active={selectedYears.has(y)}
                onClick={() => setSelectedYears((s) => toggleInSet(s, y))}
              >
                {y}
              </Chip>
            ))}
          </div>

          {range === "months" ? (
            <div className="flex max-w-full flex-wrap justify-center gap-2">
              {MONTH_ABBR.map((abbr, i) => {
                const m = i + 1;
                return (
                  <Chip
                    key={abbr}
                    active={selectedMonths.has(m)}
                    onClick={() =>
                      setSelectedMonths((s) => toggleInSet(s, m))
                    }
                  >
                    {abbr}
                  </Chip>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-10 border-t border-z-line pt-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="text-z-gold">
            <EquityChart
              values={curve}
              label={
                range === "years" ? results.chartYears : results.chartMonths
              }
            />
            <p className="mt-4 text-sm text-z-muted">{note}</p>
          </div>
          <dl className="grid grid-cols-3 gap-6 self-center md:grid-cols-1 md:gap-8">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-z-muted">
                {results.netLabel}
              </dt>
              <dd className="mt-2 font-display text-3xl text-z-ink">
                {formatPct(demoBacktest.netPct, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-z-muted">
                {results.ddLabel}
              </dt>
              <dd className="mt-2 font-display text-3xl text-z-ink">
                {demoBacktest.maxDrawdownPct.toFixed(1)}%
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-z-muted">
                {results.wrLabel}
              </dt>
              <dd className="mt-2 font-display text-3xl text-z-ink">
                {demoBacktest.yearly.length}/{demoBacktest.yearsBacked}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-14 max-h-[28rem] overflow-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="sticky top-0 bg-z-bg">
              <tr className="border-b border-z-line text-xs uppercase tracking-[0.14em] text-z-muted">
                <th className="py-3 pr-4 font-medium">{periodCol}</th>
                <th className="py-3 pr-4 font-medium">{results.colStart}</th>
                <th className="py-3 pr-4 font-medium">{results.colEnd}</th>
                <th className="py-3 pr-4 font-medium">{results.colProfit}</th>
                <th className="py-3 font-medium">{results.colPct}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-z-line/70">
                  <td className="py-3 pr-4 text-z-ink">
                    {row.label}
                    {row.partial ? (
                      <span className="ml-2 text-xs text-z-muted">
                        ({results.partial})
                      </span>
                    ) : null}
                  </td>
                  <td className="py-3 pr-4 text-z-muted">
                    {formatMoney(row.start, locale)}
                  </td>
                  <td className="py-3 pr-4 text-z-muted">
                    {formatMoney(row.end, locale)}
                  </td>
                  <td
                    className={`py-3 pr-4 ${row.profit >= 0 ? "text-z-ink" : "text-z-muted"}`}
                  >
                    {formatMoney(row.profit, locale)}
                  </td>
                  <td
                    className={
                      row.pct >= 0 ? "py-3 text-z-gold" : "py-3 text-z-muted"
                    }
                  >
                    {formatPct(row.pct, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
