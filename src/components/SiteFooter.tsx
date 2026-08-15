import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Wordmark } from "@/components/Wordmark";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-z-line bg-z-bg px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl space-y-4">
          <Wordmark className="h-7 w-auto text-z-ink" />
          <p className="text-sm leading-relaxed text-z-muted">
            {dict.footer.disclaimer}
          </p>
          <p className="text-xs text-z-muted/70">{dict.footer.rights}</p>
        </div>
        <LanguageSwitch locale={locale} />
      </div>
    </footer>
  );
}
