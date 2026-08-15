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

const CHART_W = 640;
const CHART_H = 220;
const PAD = { top: 16, right: 12, bottom: 36, left: 58 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

function toPoints(values: readonly number[]): { x: number; y: number }[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => ({
    x:
      PAD.left +
      (values.length === 1 ? PLOT_W / 2 : (i / (values.length - 1)) * PLOT_W),
    y: PAD.top + PLOT_H - ((v - min) / span) * PLOT_H,
  }));
}

function resample(
  pts: { x: number; y: number }[],
  n: number,
): { x: number; y: number }[] {
  if (pts.length === 0) {
    return Array.from({ length: n }, (_, i) => ({
      x: PAD.left + (i / Math.max(n - 1, 1)) * PLOT_W,
      y: PAD.top + PLOT_H / 2,
    }));
  }
  if (pts.length === 1) {
    return Array.from({ length: n }, (_, i) => ({
      x: PAD.left + (i / Math.max(n - 1, 1)) * PLOT_W,
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
    x: PAD.left + (n === 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W),
    y: p.y,
  }));
}

function pointsToAttr(pts: { x: number; y: number }[]): string {
  return pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

function EquityChart({
  values,
  xLabels,
  label,
  locale,
}: {
  values: readonly number[];
  xLabels: string[];
  label: string;
  locale: string;
}) {
  const targetPts = useMemo(() => toPoints(values), [values]);
  const [drawPts, setDrawPts] = useState(() => targetPts);
  const fromRef = useRef(targetPts);
  const rafRef = useRef<number | null>(null);

  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 1;
  const mid = (min + max) / 2;
  const yTicks = [max, mid, min];

  useEffect(() => {
    const from = resample(fromRef.current, 48);
    const to = resample(targetPts, 48);
    const start = performance.now();
    const dur = 520;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setDrawPts(
        from.map((p, i) => ({
          x: p.x + (to[i].x - p.x) * e,
          y: p.y + (to[i].y - p.y) * e,
        })),
      );
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else {
        fromRef.current = targetPts;
        setDrawPts(targetPts);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetPts]);

  const bottomLabels = useMemo(() => {
    if (xLabels.length === 0) return [];
    if (xLabels.length <= 8) {
      return xLabels.map((text, i) => ({
        text,
        x:
          PAD.left +
          (xLabels.length === 1
            ? PLOT_W / 2
            : (i / (xLabels.length - 1)) * PLOT_W),
      }));
    }
    // Thin labels for dense month series
    const step = Math.ceil(xLabels.length / 6);
    const out: { text: string; x: number }[] = [];
    for (let i = 0; i < xLabels.length; i += step) {
      out.push({
        text: xLabels[i],
        x: PAD.left + (i / (xLabels.length - 1)) * PLOT_W,
      });
    }
    const last = xLabels.length - 1;
    if (out[out.length - 1]?.text !== xLabels[last]) {
      out.push({
        text: xLabels[last],
        x: PAD.left + PLOT_W,
      });
    }
    return out;
  }, [xLabels]);

  const areaPts =
    drawPts.length > 0
      ? `${pointsToAttr(drawPts)} ${PAD.left + PLOT_W},${PAD.top + PLOT_H} ${PAD.left},${PAD.top + PLOT_H}`
      : "";

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="h-56 w-full"
        role="img"
        aria-label={label}
      >
        {yTicks.map((v, i) => {
          const y =
            PAD.top +
            (i / Math.max(yTicks.length - 1, 1)) * PLOT_H;
          return (
            <g key={`y-${i}`}>
              <line
                x1={PAD.left}
                x2={PAD.left + PLOT_W}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-z-line"
              />
              <text
                x={PAD.left - 8}
                y={y + 3}
                textAnchor="end"
                className="fill-z-muted"
                style={{ fontSize: 10 }}
              >
                {formatMoney(v, locale)}
              </text>
            </g>
          );
        })}

        <line
          x1={PAD.left}
          x2={PAD.left}
          y1={PAD.top}
          y2={PAD.top + PLOT_H}
          stroke="currentColor"
          strokeWidth="1"
          className="text-z-line"
        />
        <line
          x1={PAD.left}
          x2={PAD.left + PLOT_W}
          y1={PAD.top + PLOT_H}
          y2={PAD.top + PLOT_H}
          stroke="currentColor"
          strokeWidth="1"
          className="text-z-line"
        />

        {areaPts ? (
          <polygon
            points={areaPts}
            className="fill-z-gold/10"
          />
        ) : null}

        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pointsToAttr(drawPts)}
          className="text-z-gold"
        />

        {bottomLabels.map((l) => (
          <text
            key={`${l.text}-${l.x}`}
            x={l.x}
            y={CHART_H - 10}
            textAnchor="middle"
            className="fill-z-muted"
            style={{ fontSize: 10 }}
          >
            {l.text}
          </text>
        ))}
      </svg>
    </div>
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
          ? "min-w-[2.75rem] bg-z-gold px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-z-bg shadow-[inset_0_0_0_1px_rgba(196,163,90,1)]"
          : "min-w-[2.75rem] border border-z-line/80 bg-z-panel/40 px-3 py-2 text-[0.7rem] uppercase tracking-[0.12em] text-z-muted transition hover:border-z-muted hover:text-z-ink"
      }
    >
      {children}
    </button>
  );
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
  /** null = all selected */
  const [yearPick, setYearPick] = useState<number | "all">(years[0] ?? "all");
  const [monthPick, setMonthPick] = useState<number | "all">(1);

  const activeYears = useMemo(() => {
    if (yearPick === "all") return years;
    return [yearPick];
  }, [yearPick, years]);

  const activeMonths = useMemo(() => {
    if (monthPick === "all") return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return [monthPick];
  }, [monthPick]);

  const { curve, xLabels } = useMemo(() => {
    if (range === "years") {
      const pts: number[] = [];
      const labels: string[] = [];
      for (const y of demoBacktest.yearly) {
        if (!activeYears.includes(y.year)) continue;
        if (pts.length === 0) {
          pts.push(y.start);
          labels.push(String(y.year));
        }
        pts.push(y.end);
        labels.push(String(y.year));
      }
      return {
        curve: pts.length ? pts : [...demoBacktest.equityYearly],
        xLabels: labels.length
          ? labels
          : demoBacktest.yearly.map((y) => String(y.year)),
      };
    }

    const pts: number[] = [];
    const labels: string[] = [];
    let seeded = false;
    for (const row of demoBacktest.monthly) {
      const [ys, ms] = row.key.split("-").map(Number);
      if (!activeYears.includes(ys) || !activeMonths.includes(ms)) continue;
      if (!seeded) {
        pts.push(row.start);
        seeded = true;
      }
      pts.push(row.end);
      labels.push(
        activeYears.length === 1
          ? MONTH_ABBR[ms - 1]
          : `${MONTH_ABBR[ms - 1]} ${String(ys).slice(2)}`,
      );
    }
    return {
      curve: pts.length ? pts : [...demoBacktest.equityMonthly],
      xLabels: labels,
    };
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

        <div className="mt-10 flex flex-col items-center gap-4">
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

          <div
            className="flex max-w-full flex-wrap justify-center gap-2"
            role="group"
            aria-label={results.colYear}
          >
            <Chip
              active={yearPick === "all"}
              onClick={() => setYearPick("all")}
            >
              {results.selectAll}
            </Chip>
            {years.map((y) => (
              <Chip
                key={y}
                active={yearPick === y}
                onClick={() => setYearPick(y)}
              >
                {y}
              </Chip>
            ))}
          </div>

          {range === "months" ? (
            <div
              className="flex max-w-full flex-wrap justify-center gap-2"
              role="group"
              aria-label={results.colMonth}
            >
              <Chip
                active={monthPick === "all"}
                onClick={() => setMonthPick("all")}
              >
                {results.selectAll}
              </Chip>
              {MONTH_ABBR.map((abbr, i) => {
                const m = i + 1;
                return (
                  <Chip
                    key={abbr}
                    active={monthPick === m}
                    onClick={() => setMonthPick(m)}
                  >
                    {abbr}
                  </Chip>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-10 border-t border-z-line pt-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <EquityChart
              values={curve}
              xLabels={xLabels}
              locale={locale}
              label={
                range === "years" ? results.chartYears : results.chartMonths
              }
            />
            <p className="mt-3 text-sm leading-relaxed text-z-muted">{note}</p>
          </div>
          <dl className="grid grid-cols-3 gap-6 self-start border border-z-line bg-z-panel/50 p-6 lg:grid-cols-1 lg:gap-8">
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
