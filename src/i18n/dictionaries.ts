import type { Locale } from "./config";

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    whyGold: string;
    method: string;
    results: string;
    community: string;
    partner: string;
    join: string;
  };
  hero: {
    brand: string;
    line: string;
    support: string;
    ctaTelegram: string;
    ctaResults: string;
  };
  whyGold: {
    eyebrow: string;
    title: string;
    lead: string;
    points: { title: string; body: string }[];
  };
  method: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { title: string; body: string }[];
  };
  results: {
    eyebrow: string;
    title: string;
    lead: string;
    demoBadge: string;
    colYear: string;
    colStart: string;
    colEnd: string;
    colProfit: string;
    colPct: string;
    partial: string;
    netLabel: string;
    ddLabel: string;
    wrLabel: string;
  };
  community: {
    eyebrow: string;
    title: string;
    lead: string;
    points: string[];
    cta: string;
  };
  partner: {
    eyebrow: string;
    title: string;
    lead: string;
    points: { title: string; body: string }[];
  };
  footer: {
    disclaimer: string;
    rights: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "Zlatna — Gold community for XAUUSD",
    description:
      "A bilingual community around disciplined gold trading. Learn the method, review transparent backtests, join us on Telegram.",
  },
  nav: {
    whyGold: "Why gold",
    method: "Method",
    results: "Results",
    community: "Community",
    partner: "Partner",
    join: "Telegram",
  },
  hero: {
    brand: "Zlatna",
    line: "Gold, explained. Traded with discipline.",
    support:
      "We share a clear XAUUSD method, honest research, and a Telegram room for people who want gold in their plan — not noise.",
    ctaTelegram: "Join the community",
    ctaResults: "See demo results",
  },
  whyGold: {
    eyebrow: "Allocation",
    title: "Why gold still earns a place",
    lead: "XAUUSD is not a lottery ticket. Used well, gold can steady a portfolio when currencies and equities wobble.",
    points: [
      {
        title: "Hard asset, global bid",
        body: "Central banks and long-horizon investors still hold gold as ballast when confidence in paper assets thins.",
      },
      {
        title: "Liquid around the clock",
        body: "Gold trades nearly 24 hours. You can express a view without waiting for a single equity open.",
      },
      {
        title: "Different drivers",
        body: "Rates, dollar strength, and risk appetite move gold on their own clock — useful diversification, not magic.",
      },
    ],
  },
  method: {
    eyebrow: "How we work",
    title: "A method you can follow",
    lead: "We size risk from equity, respect sessions, and publish what the rules would have done in research — then refine.",
    steps: [
      {
        title: "Risk first",
        body: "Position size scales with capital. A fixed percent of equity per idea, with a hard margin ceiling.",
      },
      {
        title: "Session awareness",
        body: "Asia, London, and New York behave differently. We map when the edge is worth taking — and when to stand aside.",
      },
      {
        title: "Review, then adjust",
        body: "Backtests and forward demos guide changes. We do not rewrite history to look clever.",
      },
    ],
  },
  results: {
    eyebrow: "Research",
    title: "Backtests on the table",
    lead: "Below is demo data for design review with our team. Live and audited figures will replace it when ready.",
    demoBadge: "DEMO DATA",
    colYear: "Year",
    colStart: "Start",
    colEnd: "End",
    colProfit: "Profit",
    colPct: "%",
    partial: "partial",
    netLabel: "Net (demo)",
    ddLabel: "Max drawdown",
    wrLabel: "Win rate",
  },
  community: {
    eyebrow: "Telegram",
    title: "A room for people who take gold seriously",
    lead: "Signals without context create FOMO. We prefer shared process: why a setup, what risk, what to skip.",
    points: [
      "Method notes and session briefs in Bulgarian and English",
      "Space to ask questions without sales pressure",
      "Early look at research we are comfortable publishing",
    ],
    cta: "Open Telegram",
  },
  partner: {
    eyebrow: "Grow with us",
    title: "Bring people in — keep the benefit clear",
    lead: "If our approach helps you, you can invite others under your link when the partner program opens. Focus stays on their outcome, not ours.",
    points: [
      {
        title: "Learn the same rules",
        body: "Partners and members see the same method notes — no secret “inner circle” playbook.",
      },
      {
        title: "Transparent research",
        body: "Demo and live figures stay labeled. Nobody should join on a promise we cannot show.",
      },
      {
        title: "Aligned later",
        body: "Affiliate tracking comes after the community feels solid. For now, share Telegram because it is useful.",
      },
    ],
  },
  footer: {
    disclaimer:
      "Trading gold involves substantial risk of loss. Past or simulated performance is not a guarantee of future results. Zlatna provides education and community context — not personalized investment advice.",
    rights: "Zlatna — working name",
  },
};

const bg: Dictionary = {
  meta: {
    title: "Zlatna — общност около златото и XAUUSD",
    description:
      "Двуезична общност за дисциплинирана работа със злато. Метод, прозрачни бектестове и Telegram.",
  },
  nav: {
    whyGold: "Защо злато",
    method: "Метод",
    results: "Резултати",
    community: "Общност",
    partner: "Партньор",
    join: "Telegram",
  },
  hero: {
    brand: "Zlatna",
    line: "Златото — обяснено. Търгувано с дисциплина.",
    support:
      "Споделяме ясен метод за XAUUSD, честни изследвания и Telegram пространство за хора, които искат злато в плана си — без шум.",
    ctaTelegram: "Влез в общността",
    ctaResults: "Виж демо резултати",
  },
  whyGold: {
    eyebrow: "Алокация",
    title: "Защо златото все още има място",
    lead: "XAUUSD не е лотария. Използвано разумно, златото може да стабилизира портфейл, когато валути и акции се люлеят.",
    points: [
      {
        title: "Твърд актив, глобално търсене",
        body: "Централни банки и дългосрочни инвеститори държат злато като баласт, когато доверието в „хартиени“ активи намалява.",
      },
      {
        title: "Ликвидно почти денонощно",
        body: "Златото се търгува почти 24 часа. Можеш да изразиш виждане без да чакаш едно борсово отваряне.",
      },
      {
        title: "Различни двигатели",
        body: "Лихви, долар и апетит към риск движат златото на собствен ритъм — полезна диверсификация, не магия.",
      },
    ],
  },
  method: {
    eyebrow: "Как работим",
    title: "Метод, който можеш да следваш",
    lead: "Рискът се мери спрямо капитала, сесиите се уважават, а правилата се проверяват в изследвания — после се коригират.",
    steps: [
      {
        title: "Първо рискът",
        body: "Размерът на позицията расте с капитала. Фиксиран процент от equity на идея и твърд таван на маржина.",
      },
      {
        title: "Сесиите имат значение",
        body: "Азия, Лондон и Ню Йорк се държат различно. Картографираме кога има смисъл вход — и кога да стоим настрана.",
      },
      {
        title: "Преглед, после корекция",
        body: "Бектестове и демо напред водят промените. Не пренаписваме историята, за да изглеждаме умни.",
      },
    ],
  },
  results: {
    eyebrow: "Изследвания",
    title: "Бектестовете са на масата",
    lead: "По-долу са демо данни за преглед с екипа. Живи и одитирани цифри ще ги заменят, когато са готови.",
    demoBadge: "ДЕМО ДАННИ",
    colYear: "Година",
    colStart: "Начало",
    colEnd: "Край",
    colProfit: "Печалба",
    colPct: "%",
    partial: "частична",
    netLabel: "Нето (демо)",
    ddLabel: "Макс. спад",
    wrLabel: "Печеливши",
  },
  community: {
    eyebrow: "Telegram",
    title: "Място за хора, които приемат златото сериозно",
    lead: "Сигнали без контекст раждат FOMO. Предпочитаме споделен процес: защо сетап, какъв риск, какво да пропуснем.",
    points: [
      "Бележки по метода и сесиите на български и английски",
      "Въпроси без натиск за продажба",
      "Ранен поглед към изследвания, които сме готови да публикуваме",
    ],
    cta: "Отвори Telegram",
  },
  partner: {
    eyebrow: "Растете с нас",
    title: "Покани хора — ползата да е тяхна",
    lead: "Ако подходът ти помага, ще можеш да каниш други под своя линк, когато партньорската програма стартира. Фокусът остава върху техния резултат.",
    points: [
      {
        title: "Едни и същи правила",
        body: "Партньори и членове виждат едни и същи бележки — без таен „вътрешен“ плейбук.",
      },
      {
        title: "Прозрачни изследвания",
        body: "Демо и живи цифри остават етикетирани. Никой не трябва да влиза заради обещание, което не показваме.",
      },
      {
        title: "Подравняване по-късно",
        body: "Affiliate проследяването идва след като общността е стабилна. Засега споделяй Telegram, защото е полезен.",
      },
    ],
  },
  footer: {
    disclaimer:
      "Търговията със злато носи съществен риск от загуба. Минали или симулирани резултати не гарантират бъдещи. Zlatna предоставя образование и общностен контекст — не персонализиран инвестиционен съвет.",
    rights: "Zlatna — работно име",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, bg };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
