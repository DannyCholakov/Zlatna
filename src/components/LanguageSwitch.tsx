import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

export function LanguageSwitch({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 text-sm tracking-wide ${className}`}
      aria-label="Language"
    >
      {locales.map((code, i) => (
        <span key={code} className="inline-flex items-center gap-1">
          {i > 0 ? <span className="text-z-muted/50">/</span> : null}
          <Link
            href={`/${code}`}
            hrefLang={code}
            className={
              code === locale
                ? "text-z-gold"
                : "text-z-muted transition-colors hover:text-z-ink"
            }
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
