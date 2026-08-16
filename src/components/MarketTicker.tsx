const TICKERS = [
  {
    symbol: "US30",
    name: "Dow Jones",
    price: "39,842.10",
    change: "+0.42%",
    up: true,
    spark: [40, 38, 42, 41, 45, 44, 48, 47, 52, 55],
  },
  {
    symbol: "EURUSD",
    name: "Euro",
    price: "1.0842",
    change: "+0.18%",
    up: true,
    spark: [30, 32, 31, 35, 34, 38, 36, 40, 42, 41],
  },
  {
    symbol: "GBPUSD",
    name: "Pound",
    price: "1.2715",
    change: "-0.12%",
    up: false,
    spark: [50, 48, 49, 46, 47, 44, 45, 42, 43, 40],
  },
  {
    symbol: "USDJPY",
    name: "Yen",
    price: "151.24",
    change: "+0.09%",
    up: true,
    spark: [28, 30, 29, 33, 32, 35, 34, 38, 37, 39],
  },
  {
    symbol: "AUDUSD",
    name: "Aussie",
    price: "0.6618",
    change: "-0.21%",
    up: false,
    spark: [45, 44, 42, 43, 40, 41, 38, 37, 35, 34],
  },
  {
    symbol: "Nasdaq",
    name: "US100",
    price: "17,612.40",
    change: "+0.55%",
    up: true,
    spark: [25, 28, 27, 32, 35, 34, 40, 42, 48, 52],
  },
] as const;

function MiniSpark({
  values,
  up,
}: {
  values: readonly number[];
  up: boolean;
}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const w = 72;
  const h = 28;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-[4.5rem]" aria-hidden>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        points={pts}
        className={up ? "text-emerald-400" : "text-rose-400"}
      />
    </svg>
  );
}

export function MarketTicker() {
  return (
    <section
      aria-label="Market overview"
      className="border-y border-z-line bg-z-panel/80"
    >
      <div className="flex gap-3 overflow-x-auto px-6 py-4 md:px-10 lg:px-16">
        {TICKERS.map((t) => (
          <article
            key={t.symbol}
            className="min-w-[9.5rem] shrink-0 rounded-xl border border-z-gold/20 bg-z-bg/60 px-3.5 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.7rem] font-semibold tracking-wide text-z-ink">
                {t.symbol}
              </p>
              <span
                className={`text-[0.65rem] font-medium ${t.up ? "text-emerald-400" : "text-rose-400"}`}
              >
                {t.change}
              </span>
            </div>
            <p className="mt-1 text-sm text-z-muted">{t.price}</p>
            <div className="mt-2">
              <MiniSpark values={t.spark} up={t.up} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
