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
    marketsLabel: string;
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
    selectAll: string;
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
  promoAd: {
    label: string;
    title: string;
    body: string;
    cta: string;
    dismiss: string;
  };
  footer: {
    disclaimer: string;
    rights: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "Zlatna — automated trading community",
    description:
      "Automated consistency instead of impulse decisions. Try one month. English and Bulgarian.",
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
    line: "How much money have you lost so far?",
    support:
      "Don't tell us. The market is a psychological game built to win from traders — not to make them rich easily. Leave that to us. We work automatically, on consistency — without endless analysis, indicators, and spur-of-the-moment decisions.",
    ctaTelegram: "Try one month",
    ctaResults: "See how we work",
    marketsLabel: "Markets we cover",
  },
  whyGold: {
    eyebrow: "Allocation",
    title: "Gold’s place in a portfolio",
    lead: "XAUUSD is not gambling. Used wisely, gold can stabilize a portfolio when currencies and equities move unevenly.",
    points: [
      {
        title: "Hard asset with global demand",
        body: "Central banks and long-horizon investors traditionally hold gold as protection in uncertain periods.",
      },
      {
        title: "Liquidity almost around the clock",
        body: "Gold trades through most of the day, so you stay flexible without depending on a single exchange open.",
      },
      {
        title: "Its own dynamics",
        body: "Rates, the dollar, and risk appetite move gold on their own rhythm — real diversification for a portfolio.",
      },
    ],
  },
  method: {
    eyebrow: "How we work",
    title: "Automation instead of decisions",
    lead: "Manual decisions on the market carry error risk — and over time that shows in results. So we follow a predefined, tested logic — without you analyzing the market or deciding in real time.",
    steps: [
      {
        title: "No impulsive decisions",
        body: "The strategy follows the same rules regardless of the situation. No emotions, no on-the-spot exceptions.",
      },
      {
        title: "No need to analyze",
        body: "You do not have to watch charts, indicators, or news. The logic is set in advance and runs automatically.",
      },
      {
        title: "Consistency over time",
        body: "The strategy works whether you are at the screen or not. Results build gradually while you focus on other things.",
      },
    ],
  },
  results: {
    eyebrow: "Statistics",
    title: "The results speak for themselves",
    lead: "Check for yourself — one month is enough to decide if the approach works for you. Below is the statistics behind the strategy, with yearly and monthly views (demo values until live data is synced).",
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
    selectAll: "All",
  },
  community: {
    eyebrow: "Telegram",
    title: "Follow the account that follows the bot",
    lead: "We run the bot on our account. You connect below us, learn the method, and see the same track we publish.",
    points: [
      "One month is enough to judge the approach",
      "Method notes in Bulgarian and English",
      "Partner path: invite others under your link when the program opens",
    ],
    cta: "Open Telegram",
  },
  partner: {
    eyebrow: "Grow with us",
    title: "Connect under a track that keeps winning",
    lead: "When you join, you sit under our structure. When you invite others, they sit under yours — same automation story.",
    points: [
      {
        title: "Same bot, same rules",
        body: "Partners and members follow the same published method — no secret second playbook.",
      },
      {
        title: "Results first",
        body: "We lead with transparent statistics so people know why joining is worth their time.",
      },
      {
        title: "Affiliate when ready",
        body: "Tracking links come next. For now, share Telegram and the track record.",
      },
    ],
  },
  promoAd: {
    label: "Ad",
    title: "ZLATNA",
    body: "Join our Telegram group — automated signals, method notes, and community in EN & BG. Opening soon.",
    cta: "JOIN GROUP",
    dismiss: "Close ad",
  },
  footer: {
    disclaimer:
      "Trading involves substantial risk of loss. Past or simulated performance is not a guarantee of future results. Zlatna provides education and community context — not personalized investment advice.",
    rights: "Zlatna — working name",
  },
};

const bg: Dictionary = {
  meta: {
    title: "Zlatna — автоматизирана трейдинг общност",
    description:
      "Автоматизация и постоянство вместо импулсивни решения. Пробвай един месец. Български и английски.",
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
    line: "Колко пари си изгубил досега?",
    support:
      "Не ни казвай. Пазарът е психологическа игра, изградена да печели от трейдърите — не да ги прави богати лесно. Оставете това на нас. Ние работим автоматизирано, на принципа на постоянството, без безкрайни анализи, индикатори и решения на момента.",
    ctaTelegram: "Пробвай един месец",
    ctaResults: "Разбери как работим",
    marketsLabel: "Пазари, които покриваме",
  },
  whyGold: {
    eyebrow: "Алокация",
    title: "Мястото на златото в един портфейл",
    lead: "XAUUSD не е хазарт. Използвано разумно, златото може да стабилизира портфейл, когато валути и акции се движат нестабилно.",
    points: [
      {
        title: "Твърд актив с глобално търсене",
        body: "Централни банки и дългосрочни инвеститори традиционно държат злато като защита в периоди на несигурност.",
      },
      {
        title: "Ликвидност почти денонощно",
        body: "Златото се търгува почти през целия ден, което позволява гъвкавост без зависимост от отваряне на конкретна борса.",
      },
      {
        title: "Собствена динамика",
        body: "Лихвени проценти, доларът и общият апетит към риск движат златото по свой ритъм — реална диверсификация за портфейла.",
      },
    ],
  },
  method: {
    eyebrow: "Как работим",
    title: "Автоматизация вместо решения",
    lead: "Ръчните решения на пазара носят риск от грешка, а натрупани във времето, се отразяват на резултата. Затова следваме предварително зададена, тествана логика — без нужда вие да анализирате пазара или да вземате решения в реално време.",
    steps: [
      {
        title: "Без импулсивни решения",
        body: "Стратегията следва едни и същи правила, независимо от ситуацията. Без емоции, без изключения на момента.",
      },
      {
        title: "Без нужда от анализ",
        body: "Не се налага да следите графики, индикатори или новини. Логиката е зададена предварително и се изпълнява автоматично.",
      },
      {
        title: "Постоянство във времето",
        body: "Стратегията работи независимо дали сте пред екрана. Резултатите се натрупват постепенно, докато вие се занимавате с други неща.",
      },
    ],
  },
  results: {
    eyebrow: "Статистика",
    title: "Резултатите говорят сами",
    lead: "Проверете сами — един месец е достатъчен да прецените дали подходът работи за вас. По-долу е статистиката зад стратегията, с възможност за годишен и месечен изглед (демонстрационни стойности, докато реалните данни се синхронизират).",
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
    selectAll: "Всички",
  },
  community: {
    eyebrow: "Telegram",
    title: "Следвай акаунта, който следва бота",
    lead: "Ние караме бота на нашия акаунт. Ти се свързваш под нас, учиш метода и виждаш същия track, който публикуваме.",
    points: [
      "Един месец е достатъчен да прецениш подхода",
      "Бележки по метода на български и английски",
      "Партньорски път: кани други под своя линк, когато програмата стартира",
    ],
    cta: "Отвори Telegram",
  },
  partner: {
    eyebrow: "Растете с нас",
    title: "Свържи се под track, който печели",
    lead: "Когато влезеш, си под нашата структура. Когато поканиш други, те са под твоята — същата автоматизация.",
    points: [
      {
        title: "Един бот, едни правила",
        body: "Партньори и членове следват един публикуван метод — без таен втори плейбук.",
      },
      {
        title: "Първо резултатите",
        body: "Водим с прозрачна статистика, за да е ясно защо си струва да се включат.",
      },
      {
        title: "Affiliate когато сме готови",
        body: "Tracking линковете идват следващи. Засега споделяй Telegram и track record-а.",
      },
    ],
  },
  promoAd: {
    label: "Ad",
    title: "ZLATNA",
    body: "Влез в нашата Telegram група — автоматизирани сигнали, бележки по метода и общност на BG и EN. Отворяме скоро.",
    cta: "КЪМ ГРУПАТА",
    dismiss: "Затвори рекламата",
  },
  footer: {
    disclaimer:
      "Търговията носи съществен риск от загуба. Минали или симулирани резултати не гарантират бъдещи. Zlatna предоставя образование и общностен контекст — не персонализиран инвестиционен съвет.",
    rights: "Zlatna — работно име",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, bg };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
