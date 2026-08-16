"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  DEFAULT_MARKET_ID,
  MARKETS,
  type MarketCandle,
  type MarketInstrument,
} from "@/data/markets";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

function HeroCandleChart({
  candles,
  chartId,
}: {
  candles: readonly MarketCandle[];
  chartId: string;
}) {
  const gradId = `heroBarGold-${chartId}`;
  return (
    <svg viewBox="0 0 280 150" className="h-36 w-full" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d78c" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      {candles.map((c, i) => {
        const up = c.c < c.o;
        const bodyTop = Math.min(c.o, c.c);
        const bodyH = Math.max(Math.abs(c.c - c.o), 3);
        return (
          <g key={i}>
            <line
              x1={c.x}
              x2={c.x}
              y1={c.h}
              y2={c.l}
              stroke={`url(#${gradId})`}
              strokeWidth="1.5"
            />
            <rect
              x={c.x - 6}
              y={bodyTop}
              width="12"
              height={bodyH}
              rx="1"
              fill={up ? `url(#${gradId})` : "#141210"}
              stroke={`url(#${gradId})`}
              strokeWidth="1"
            />
          </g>
        );
      })}
    </svg>
  );
}

function MiniSpark({
  values,
  up,
  active,
}: {
  values: readonly number[];
  up: boolean;
  active: boolean;
}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const w = 88;
  const h = 32;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-[5.5rem]" aria-hidden>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
        className={
          active
            ? "text-z-gold"
            : up
              ? "text-emerald-400/90"
              : "text-rose-400/90"
        }
      />
    </svg>
  );
}

function MarketCard({
  market,
  selected,
  onSelect,
}: {
  market: MarketInstrument;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={
        selected
          ? "group w-full rounded-2xl border border-z-gold bg-gradient-to-b from-z-gold/20 to-z-panel/90 px-3.5 py-3 text-left shadow-[0_0_0_1px_rgba(212,175,55,0.25),0_12px_32px_rgba(0,0,0,0.35)] transition"
          : "group w-full rounded-2xl border border-z-gold/15 bg-z-bg/55 px-3.5 py-3 text-left backdrop-blur-md transition hover:border-z-gold/40 hover:bg-z-panel/80"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-sm tracking-wide text-z-ink">
          {market.symbol}
        </p>
        <span
          className={`text-[0.65rem] font-semibold tracking-wide ${
            market.up ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {market.changePct}
        </span>
      </div>
      <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-z-muted">
        {market.name}
      </p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="font-display text-base leading-none text-z-ink/95 sm:text-lg">
          {market.price}
        </p>
        <MiniSpark values={market.spark} up={market.up} active={selected} />
      </div>
    </button>
  );
}

export function HeroSection({ dict }: { dict: Dictionary }) {
  const [selectedId, setSelectedId] = useState(DEFAULT_MARKET_ID);
  const selected = useMemo(
    () => MARKETS.find((m) => m.id === selectedId) ?? MARKETS[0],
    [selectedId],
  );

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(10,9,8,0.94) 0%, rgba(10,9,8,0.72) 45%, rgba(10,9,8,0.5) 100%), url('/hero-gold.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(212,175,55,0.18),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 px-6 pb-8 pt-28 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-16 lg:pb-10 lg:pt-32">
        <div className="max-w-xl lg:pb-2">
          <p
            className="animate-rise font-display text-5xl leading-none tracking-[0.04em] text-z-gold md:text-7xl"
            style={{ animationDelay: "0ms" }}
          >
            {dict.hero.brand}
          </p>
          <h1
            className="animate-rise mt-7 font-display text-2xl font-normal leading-snug text-z-ink md:text-3xl"
            style={{ animationDelay: "80ms" }}
          >
            {dict.hero.line}
          </h1>
          <p
            className="animate-rise mt-5 text-base leading-relaxed text-z-muted md:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {dict.hero.support}
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "200ms" }}
          >
            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-z-gold px-7 py-3 text-sm font-semibold tracking-wide text-z-bg transition hover:bg-z-gold-soft"
            >
              {dict.hero.ctaTelegram}
            </a>
            <a
              href="#method"
              className="rounded-full border border-z-gold/60 px-7 py-3 text-sm font-medium tracking-wide text-z-gold transition hover:bg-z-gold/10"
            >
              {dict.hero.ctaResults}
            </a>
          </div>
        </div>

        <div
          className="animate-rise w-full max-w-sm shrink-0 self-center lg:self-end"
          style={{ animationDelay: "180ms" }}
        >
          <div
            key={selected.id}
            className="rounded-2xl border border-z-gold/40 bg-z-panel/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md transition-opacity duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-z-muted">
                  {selected.symbol} ({selected.name})
                </p>
                <p className="mt-2 font-display text-2xl text-z-ink md:text-3xl">
                  {selected.price}{" "}
                  <span className="text-base text-z-muted">USD</span>
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    selected.up ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {selected.changeAbs} ({selected.changePct})
                </p>
              </div>
              <span className="rounded-full border border-z-gold/35 bg-z-gold/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-z-gold">
                Live
              </span>
            </div>
            <div className="mt-4 border-t border-z-line pt-3">
              <HeroCandleChart candles={selected.candles} chartId={selected.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-z-gold/15 bg-black/35 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-10 lg:px-16">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-z-gold/80">
            {dict.hero.marketsLabel}
          </p>
          <div
            className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
            role="listbox"
            aria-label={dict.hero.marketsLabel}
          >
            {MARKETS.map((m) => (
              <MarketCard
                key={m.id}
                market={m}
                selected={m.id === selected.id}
                onSelect={() => setSelectedId(m.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
