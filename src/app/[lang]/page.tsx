import { notFound } from "next/navigation";
import { PromoAd } from "@/components/PromoAd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { WhyGoldSection } from "@/components/sections/WhyGoldSection";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <SiteHeader locale={lang} dict={dict} />
      <main className="flex-1">
        <HeroSection dict={dict} />
        <WhyGoldSection dict={dict} />
        <MethodSection dict={dict} />
        <ResultsSection locale={lang} dict={dict} />
        <CommunitySection dict={dict} />
        <PartnerSection dict={dict} />
      </main>
      <SiteFooter locale={lang} dict={dict} />
      <PromoAd dict={dict} />
    </>
  );
}
