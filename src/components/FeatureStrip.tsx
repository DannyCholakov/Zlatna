import type { Dictionary } from "@/i18n/dictionaries";

function IconShield() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-z-gold" aria-hidden>
      <path
        d="M20 4 L32 9 V18 C32 26 26 32 20 35 C14 32 8 26 8 18 V9 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M14 20 L18 24 L27 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-z-gold" aria-hidden>
      <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
      <path d="M20 4 V10 M20 30 V36 M4 20 H10 M30 20 H36" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-z-gold" aria-hidden>
      <circle cx="20" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 30 C10 24 14 21 20 21 C26 21 30 24 30 30" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10" cy="16" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="30" cy="16" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconBars() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-z-gold" aria-hidden>
      <path d="M10 28 V18 M17 28 V12 M24 28 V16 M31 28 V8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 30 H34" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const ICONS = [IconShield, IconTarget, IconPeople, IconBars];

export function FeatureStrip({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-z-line px-6 py-14 md:px-10 md:py-16 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {dict.features.items.map((item, i) => {
          const Icon = ICONS[i] ?? IconBars;
          return (
            <article key={item.title} className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Icon />
              </div>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-z-gold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-z-muted">
                {item.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
