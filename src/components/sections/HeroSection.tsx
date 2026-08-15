import type { Dictionary } from "@/i18n/dictionaries";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

export function HeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.55) 42%, rgba(10,9,8,0.35) 100%), url('/hero-gold.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(196,163,90,0.18),transparent_55%)]" />

      <div className="relative flex min-h-[100svh] w-full flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28 lg:px-16">
        <p
          className="animate-rise font-display text-6xl leading-none tracking-[0.06em] text-z-ink md:text-8xl"
          style={{ animationDelay: "0ms" }}
        >
          {dict.hero.brand}
        </p>
        <h1
          className="animate-rise mt-8 max-w-xl font-display text-2xl font-normal leading-snug text-z-ink/95 md:text-3xl"
          style={{ animationDelay: "90ms" }}
        >
          {dict.hero.line}
        </h1>
        <p
          className="animate-rise mt-5 max-w-lg text-base leading-relaxed text-z-muted md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {dict.hero.support}
        </p>
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
            href="#results"
            className="border border-z-ink/25 px-6 py-3 text-sm tracking-wide text-z-ink transition hover:border-z-gold/50 hover:text-z-gold"
          >
            {dict.hero.ctaResults}
          </a>
        </div>
      </div>
    </section>
  );
}
