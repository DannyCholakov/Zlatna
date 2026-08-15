import type { Dictionary } from "@/i18n/dictionaries";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

export function CommunitySection({ dict }: { dict: Dictionary }) {
  const { community } = dict;
  return (
    <section
      id="community"
      className="scroll-mt-20 border-y border-z-line bg-z-panel px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-z-gold">
            {community.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl text-z-ink md:text-5xl">
            {community.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-z-muted">
            {community.lead}
          </p>
          <ul className="mt-10 space-y-4">
            {community.points.map((p) => (
              <li
                key={p}
                className="border-l border-z-gold/40 pl-4 text-base text-z-ink/90"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex bg-z-gold px-8 py-4 text-sm font-medium tracking-wide text-z-bg transition hover:bg-z-gold-soft"
          >
            {community.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
