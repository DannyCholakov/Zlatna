import type { Dictionary } from "@/i18n/dictionaries";

export function PartnerSection({ dict }: { dict: Dictionary }) {
  const { partner } = dict;
  return (
    <section id="partner" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] text-z-gold">
          {partner.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-z-ink md:text-5xl">
          {partner.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-z-muted">
          {partner.lead}
        </p>
        <ul className="mt-16 grid gap-12 md:grid-cols-3">
          {partner.points.map((p) => (
            <li key={p.title} className="border-t border-z-line pt-8">
              <h3 className="font-display text-xl text-z-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-z-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
