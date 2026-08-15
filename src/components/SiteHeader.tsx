import Link from "next/link";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Wordmark } from "@/components/Wordmark";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = [
    { href: `#why-gold`, label: dict.nav.whyGold },
    { href: `#method`, label: dict.nav.method },
    { href: `#results`, label: dict.nav.results },
    { href: `#community`, label: dict.nav.community },
    { href: `#partner`, label: dict.nav.partner },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 md:px-10">
        <Link href={`/${locale}`} className="text-z-ink">
          <Wordmark className="h-7 w-auto md:h-8" />
        </Link>
        <nav className="hidden items-center gap-7 text-[0.8rem] uppercase tracking-[0.14em] text-z-muted lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-z-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <LanguageSwitch locale={locale} />
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-sm border border-z-gold/40 px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.14em] text-z-gold transition hover:border-z-gold hover:bg-z-gold/10 sm:inline-block"
          >
            {dict.nav.join}
          </a>
        </div>
      </div>
    </header>
  );
}
