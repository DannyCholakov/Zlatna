import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  demoBacktest,
  formatMoney,
  formatPct,
} from "@/data/demo-backtest";

function EquitySparkline({ values }: { values: readonly number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const w = 640;
  const h = 160;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * (h - 16) - 8;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-40 w-full overflow-visible"
      role="img"
      aria-label="Equity curve"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={pts}
        className="text-z-gold"
      />
    </svg>
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

        <div className="mt-12 grid gap-10 border-t border-z-line pt-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="text-z-gold">
            <EquitySparkline values={demoBacktest.equityCurve} />
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

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-z-line text-xs uppercase tracking-[0.14em] text-z-muted">
                <th className="py-3 pr-4 font-medium">{results.colYear}</th>
                <th className="py-3 pr-4 font-medium">{results.colStart}</th>
                <th className="py-3 pr-4 font-medium">{results.colEnd}</th>
                <th className="py-3 pr-4 font-medium">{results.colProfit}</th>
                <th className="py-3 font-medium">{results.colPct}</th>
              </tr>
            </thead>
            <tbody>
              {demoBacktest.yearly.map((row) => (
                <tr key={row.year} className="border-b border-z-line/70">
                  <td className="py-4 pr-4 text-z-ink">
                    {row.year}
                    {row.partial ? (
                      <span className="ml-2 text-xs text-z-muted">
                        ({results.partial})
                      </span>
                    ) : null}
                  </td>
                  <td className="py-4 pr-4 text-z-muted">
                    {formatMoney(row.start, locale)}
                  </td>
                  <td className="py-4 pr-4 text-z-muted">
                    {formatMoney(row.end, locale)}
                  </td>
                  <td
                    className={`py-4 pr-4 ${row.profit >= 0 ? "text-z-ink" : "text-z-muted"}`}
                  >
                    {formatMoney(row.profit, locale)}
                  </td>
                  <td
                    className={
                      row.pct >= 0 ? "py-4 text-z-gold" : "py-4 text-z-muted"
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
