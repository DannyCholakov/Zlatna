import Link from "next/link";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Wordmark } from "@/components/Wordmark";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.8 4.3c.3-.1.6.1.6.4l-2.3 14.7c-.1.5-.5.7-.9.5l-5.1-3.9-2.5 2.4c-.3.3-.8.1-.9-.3l-.5-3.9 9.1-8.2c.2-.2 0-.5-.2-.4L7.2 13.4 3.4 12c-.6-.2-.6-1 .1-1.3L21.8 4.3z" />
    </svg>
  );
}

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
    <header className="sticky top-0 z-50 border-b border-z-line bg-z-panel/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href={`/${locale}`} className="shrink-0 text-z-ink">
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
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <LanguageSwitch locale={locale} />
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#2AABEE] px-3 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:bg-[#229ED9] sm:px-4"
            aria-label={dict.nav.join}
          >
            <TelegramIcon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{dict.nav.join}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
