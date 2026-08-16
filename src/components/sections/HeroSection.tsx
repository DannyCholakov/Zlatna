import type { Dictionary } from "@/i18n/dictionaries";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

const MARKETS = [
  "XAUUSD",
  "EUR/USD",
  "GBP/USD",
  "CHF/USD",
  "US30",
  "Nasdaq",
] as const;

export function HeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(10,9,8,0.94) 0%, rgba(10,9,8,0.62) 48%, rgba(10,9,8,0.4) 100%), url('/hero-gold.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(196,163,90,0.18),transparent_55%)]" />

      <div className="relative flex min-h-[100svh] w-full flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28 lg:px-16">
        <p
          className="animate-rise font-display text-5xl leading-none tracking-[0.06em] text-z-ink md:text-7xl"
          style={{ animationDelay: "0ms" }}
        >
          {dict.hero.brand}
        </p>
        <h1
          className="animate-rise mt-8 max-w-2xl font-display text-2xl font-normal leading-snug text-z-ink/95 md:text-4xl"
          style={{ animationDelay: "90ms" }}
        >
          {dict.hero.line}
        </h1>
        <p
          className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-z-muted md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {dict.hero.support}
        </p>

        <div
          className="animate-rise mt-8"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-z-gold/90">
            {dict.hero.marketsLabel}
          </p>
          <ul className="mt-3 flex max-w-2xl flex-wrap gap-2">
            {MARKETS.map((m) => (
              <li
                key={m}
                className="border border-z-gold/30 bg-z-panel/50 px-3 py-1.5 text-xs tracking-[0.08em] text-z-ink/90 backdrop-blur-sm"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="animate-rise mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "230ms" }}
        >
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-z-gold px-6 py-3 text-sm font-medium tracking-wide text-z-bg transition hover:bg-z-gold-soft"
          >
            {dict.hero.ctaTelegram}
          </a>
          <a
            href="#method"
            className="border border-z-ink/25 px-6 py-3 text-sm tracking-wide text-z-ink transition hover:border-z-panel hover:bg-z-panel hover:text-white"
          >
            {dict.hero.ctaResults}
          </a>
        </div>
      </div>
    </section>
  );
}
