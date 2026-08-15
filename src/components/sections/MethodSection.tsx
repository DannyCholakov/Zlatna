import type { Dictionary } from "@/i18n/dictionaries";

export function MethodSection({ dict }: { dict: Dictionary }) {
  const { method } = dict;
  return (
    <section
      id="method"
      className="scroll-mt-20 border-y border-z-line bg-z-panel px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] text-z-gold">
          {method.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-z-ink md:text-5xl">
          {method.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-z-muted">
          {method.lead}
        </p>
        <ol className="mt-16 space-y-0">
          {method.steps.map((s, i) => (
            <li
              key={s.title}
              className="grid gap-4 border-t border-z-line py-10 md:grid-cols-[5rem_1fr_1.4fr] md:gap-10"
            >
              <span className="font-display text-3xl text-z-gold/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl text-z-ink">{s.title}</h3>
              <p className="text-base leading-relaxed text-z-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
