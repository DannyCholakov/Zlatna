import type { Dictionary } from "@/i18n/dictionaries";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

function HeroCandleChart() {
  const candles = [
    { x: 28, o: 118, c: 98, h: 90, l: 125 },
    { x: 52, o: 100, c: 88, h: 82, l: 108 },
    { x: 76, o: 90, c: 105, h: 80, l: 112 },
    { x: 100, o: 104, c: 78, h: 72, l: 110 },
    { x: 124, o: 80, c: 62, h: 55, l: 88 },
    { x: 148, o: 65, c: 48, h: 42, l: 72 },
    { x: 172, o: 52, c: 70, h: 45, l: 78 },
    { x: 196, o: 68, c: 40, h: 34, l: 75 },
    { x: 220, o: 44, c: 28, h: 22, l: 52 },
    { x: 244, o: 32, c: 18, h: 12, l: 40 },
  ];

  return (
    <svg viewBox="0 0 280 150" className="h-36 w-full" aria-hidden>
      <defs>
        <linearGradient id="heroBarGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d78c" />
          <stop offset="100%" stopColor="#c4a35a" />
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
              stroke="url(#heroBarGold)"
              strokeWidth="1.5"
            />
            <rect
              x={c.x - 6}
              y={bodyTop}
              width="12"
              height={bodyH}
              rx="1"
              fill={up ? "url(#heroBarGold)" : "#1a1814"}
              stroke="url(#heroBarGold)"
              strokeWidth="1"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function HeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(10,9,8,0.94) 0%, rgba(10,9,8,0.7) 45%, rgba(10,9,8,0.45) 100%), url('/hero-gold.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(196,163,90,0.2),transparent_55%)]" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center gap-12 px-6 pb-16 pt-28 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:pb-24 lg:pt-32">
        <div className="max-w-xl lg:pb-4">
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
          <div className="rounded-2xl border border-z-gold/35 bg-z-panel/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-z-muted">
                  {dict.hero.chartLabel}
                </p>
                <p className="mt-2 font-display text-2xl text-z-ink">
                  {dict.hero.chartPrice}
                </p>
                <p className="mt-1 text-sm font-medium text-emerald-400">
                  {dict.hero.chartChange}
                </p>
              </div>
              <span className="rounded-full border border-z-gold/30 px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-z-gold">
                Live
              </span>
            </div>
            <div className="mt-4 border-t border-z-line pt-3">
              <HeroCandleChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
