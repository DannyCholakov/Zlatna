export type MarketCandle = {
  x: number;
  o: number;
  c: number;
  h: number;
  l: number;
};

export type MarketInstrument = {
  id: string;
  symbol: string;
  name: string;
  price: string;
  changeAbs: string;
  changePct: string;
  up: boolean;
  spark: readonly number[];
  candles: readonly MarketCandle[];
};

const baseCandles: MarketCandle[] = [
  { x: 28, o: 118, c: 98, h: 90, l: 125 },
  { x: 52, o: 100, c: 88, h: 82, l: 108 },
  { x: 76, o: 90, c: 105, h: 80, l: 112 },
  { x: 100, o: 104, c: 78, h: 72, l: 110 },
  { x: 124, o: 80, c: 62, h: 55, l: 88 },
  { x: 148, o: 65, c: 48, h: 42, l: 72 },
  { x: 172, o: 52, c: 70, h: 45, l: 78 },
  { x: 196, o: 68, c: 40, h: 34, l: 75 },
  { x: 220, o: 44, c: 28, h: 22, l: 52 },
  { x: 244, o: 32, c: 18, h: 12, l: 40 },
];

function shiftCandles(bias: number, invert = false): MarketCandle[] {
  return baseCandles.map((c, i) => {
    const d = bias + i * 0.8;
    const o = c.o + d;
    const cl = invert ? c.o + d + (c.o - c.c) : c.c + d;
    const h = Math.min(o, cl) - 8;
    const l = Math.max(o, cl) + 10;
    return { x: c.x, o, c: cl, h, l };
  });
}

export const MARKETS: MarketInstrument[] = [
  {
    id: "XAUUSD",
    symbol: "XAUUSD",
    name: "GOLD",
    price: "2,387.45",
    changeAbs: "+18.75",
    changePct: "+0.79%",
    up: true,
    spark: [32, 34, 33, 38, 40, 39, 44, 48, 50, 55],
    candles: baseCandles,
  },
  {
    id: "US30",
    symbol: "US30",
    name: "DOW JONES",
    price: "39,842.10",
    changeAbs: "+166.20",
    changePct: "+0.42%",
    up: true,
    spark: [40, 38, 42, 41, 45, 44, 48, 47, 52, 55],
    candles: shiftCandles(-6),
  },
  {
    id: "EURUSD",
    symbol: "EURUSD",
    name: "EURO",
    price: "1.0842",
    changeAbs: "+0.0020",
    changePct: "+0.18%",
    up: true,
    spark: [30, 32, 31, 35, 34, 38, 36, 40, 42, 41],
    candles: shiftCandles(4),
  },
  {
    id: "GBPUSD",
    symbol: "GBPUSD",
    name: "POUND",
    price: "1.2715",
    changeAbs: "-0.0015",
    changePct: "-0.12%",
    up: false,
    spark: [50, 48, 49, 46, 47, 44, 45, 42, 43, 40],
    candles: shiftCandles(2, true),
  },
  {
    id: "USDJPY",
    symbol: "USDJPY",
    name: "YEN",
    price: "151.24",
    changeAbs: "+0.14",
    changePct: "+0.09%",
    up: true,
    spark: [28, 30, 29, 33, 32, 35, 34, 38, 37, 39],
    candles: shiftCandles(-2),
  },
  {
    id: "AUDUSD",
    symbol: "AUDUSD",
    name: "AUSSIE",
    price: "0.6618",
    changeAbs: "-0.0014",
    changePct: "-0.21%",
    up: false,
    spark: [45, 44, 42, 43, 40, 41, 38, 37, 35, 34],
    candles: shiftCandles(8, true),
  },
  {
    id: "Nasdaq",
    symbol: "Nasdaq",
    name: "US100",
    price: "17,612.40",
    changeAbs: "+96.30",
    changePct: "+0.55%",
    up: true,
    spark: [25, 28, 27, 32, 35, 34, 40, 42, 48, 52],
    candles: shiftCandles(-10),
  },
];

export const DEFAULT_MARKET_ID = "XAUUSD";
