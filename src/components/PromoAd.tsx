"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

const telegramUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/";

const STORAGE_KEY = "zlatna-promo-ad-dismissed";

export function PromoAd({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const { promoAd } = dict;

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-[60] flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none"
      aria-label={promoAd.label}
    >
      <div className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-sm border border-black/5 bg-[#f7efe6] shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#e08a2c]" />
        <div className="relative pl-5 pr-10 pt-3 pb-3.5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#e08a2c]">
              {promoAd.label}
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-2.5 top-2 flex h-7 w-7 items-center justify-center text-black/45 transition hover:text-black"
              aria-label={promoAd.dismiss}
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
          <p className="mt-1 text-[0.95rem] font-bold uppercase tracking-wide text-black">
            {promoAd.title}
          </p>
          <p className="mt-1.5 text-sm leading-snug text-black/80">
            {promoAd.body}
          </p>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-bold uppercase tracking-[0.08em] text-[#e08a2c] transition hover:text-[#c6741f]"
          >
            {promoAd.cta}
          </a>
        </div>
      </div>
    </aside>
  );
}
