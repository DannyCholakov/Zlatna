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
    colMonth: string;
    colStart: string;
    colEnd: string;
    colProfit: string;
    colPct: string;
    partial: string;
    netLabel: string;
    ddLabel: string;
    wrLabel: string;
    rangeLabel: string;
    viewYears: string;
    viewMonths: string;
    chartYears: string;
    chartMonths: string;
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
      "Follow a gold bot with four years of winning backing data. Join the Zlatna Telegram community in English and Bulgarian.",
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
    line: "Four years of backing data. Every year in profit.",
    support:
      "Our XAUUSD bot is built on a verified multi-year track — green years only. Join Telegram to follow the same account path we use.",
    ctaTelegram: "Join the community",
    ctaResults: "See the 4-year track",
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
    title: "A bot you can follow",
    lead: "Four years of history behind the rules. Risk scales with capital, sessions are filtered, and the yearly scorecard stays green.",
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
        title: "Always on the winning side of the year",
        body: "Across four calendar years of backing data, every year closed in profit. That is the bar we show before you join under us.",
      },
    ],
  },
  results: {
    eyebrow: "4-year track",
    title: "Every year profitable",
    lead: "Four full years of backing data. Switch between yearly and monthly views — demo numbers until your real series is ready.",
    demoBadge: "DEMO · 4Y",
    colYear: "Year",
    colMonth: "Month",
    colStart: "Start",
    colEnd: "End",
    colProfit: "Profit",
    colPct: "%",
    partial: "partial",
    netLabel: "Net (4y)",
    ddLabel: "Max drawdown",
    wrLabel: "Winning years",
    rangeLabel: "Results range",
    viewYears: "Years",
    viewMonths: "Months",
    chartYears: "Equity by year",
    chartMonths: "Equity by month",
  },
  community: {
    eyebrow: "Telegram",
    title: "Follow the account that follows the bot",
    lead: "We run the bot on our account. You connect below us, learn the method, and see the same winning track we publish.",
    points: [
      "Four years of green yearly results as the reference",
      "Method notes in Bulgarian and English",
      "Partner path: invite others under your link when the program opens",
    ],
    cta: "Open Telegram",
  },
  partner: {
    eyebrow: "Grow with us",
    title: "Connect under a track that keeps winning",
    lead: "When you join, you sit under our structure. When you invite others, they sit under yours — same bot story, same four-year backing.",
    points: [
      {
        title: "Same bot, same rules",
        body: "Partners and members follow the same published method — no secret second playbook.",
      },
      {
        title: "Results first",
        body: "We lead with the four-year winning years table so people know why joining is worth their time.",
      },
      {
        title: "Affiliate when ready",
        body: "Tracking links come next. For now, share Telegram and the track record.",
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
      "Следвайте бот за злато с четири години печеливши backing данни. Общност Zlatna в Telegram на български и английски.",
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
    line: "Четири години backing данни. Всяка година на плюс.",
    support:
      "Нашият XAUUSD бот стои върху проверени многогодишни резултати — само зелени години. Влез в Telegram и следвай същия път на акаунта, който ползваме ние.",
    ctaTelegram: "Влез в общността",
    ctaResults: "Виж 4-годишния track",
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
    title: "Бот, който можеш да следваш",
    lead: "Четири години история зад правилата. Рискът расте с капитала, сесиите се филтрират, а годишният баланс остава зелен.",
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
        title: "Винаги печеливша година",
        body: "В четирите календарни години с backing данни всяка година е затворена на плюс. Това е летвата, която показваме преди да се включиш под нас.",
      },
    ],
  },
  results: {
    eyebrow: "4-годишен track",
    title: "Всяка година печеливша",
    lead: "Четири пълни години backing данни. Превключвайте годишен и месечен изглед — демо цифри, докато реалната серия е готова.",
    demoBadge: "ДЕМО · 4Г",
    colYear: "Година",
    colMonth: "Месец",
    colStart: "Начало",
    colEnd: "Край",
    colProfit: "Печалба",
    colPct: "%",
    partial: "частична",
    netLabel: "Нето (4г)",
    ddLabel: "Макс. спад",
    wrLabel: "Печеливши години",
    rangeLabel: "Период на резултатите",
    viewYears: "Години",
    viewMonths: "Месеци",
    chartYears: "Капитал по години",
    chartMonths: "Капитал по месеци",
  },
  community: {
    eyebrow: "Telegram",
    title: "Следвай акаунта, който следва бота",
    lead: "Ние караме бота на нашия акаунт. Ти се свързваш под нас, учиш метода и виждаш същия печеливш track, който публикуваме.",
    points: [
      "Четири години зелени годишни резултати като референция",
      "Бележки по метода на български и английски",
      "Партньорски път: кани други под своя линк, когато програмата стартира",
    ],
    cta: "Отвори Telegram",
  },
  partner: {
    eyebrow: "Растете с нас",
    title: "Свържи се под track, който печели",
    lead: "Когато влезеш, си под нашата структура. Когато поканиш други, те са под твоята — същият бот, същите четири години backing.",
    points: [
      {
        title: "Един бот, едни правила",
        body: "Партньори и членове следват един публикуван метод — без таен втори плейбук.",
      },
      {
        title: "Първо резултатите",
        body: "Водим с таблицата на четирите печеливши години, за да е ясно защо си струва да се включат.",
      },
      {
        title: "Affiliate когато сме готови",
        body: "Tracking линковете идват следващи. Засега споделяй Telegram и track record-а.",
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
