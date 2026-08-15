# Zlatna

Premium bilingual (English / Bulgarian) marketing site for an XAUUSD gold community. Built with Next.js for Vercel.

## Local

```powershell
cd C:\Users\danie\Desktop\TradingBot\website
copy .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`. Switch with `/bg`.

Set `NEXT_PUBLIC_TELEGRAM_URL` in `.env` to your real invite link.

## Demo backtest data

Replace numbers in [`src/data/demo-backtest.ts`](src/data/demo-backtest.ts). The Results section is labeled **DEMO**.

## GitHub + Vercel

This folder is its **own** git repository (nested under TradingBot, ignored by the parent).

```powershell
cd C:\Users\danie\Desktop\TradingBot\website
git push
```

Then in [Vercel](https://vercel.com):

1. Import the **Zlatna** GitHub repo  
2. Framework: Next.js (auto)  
3. Root directory: `.` (repo root is the site)  
4. Env: `NEXT_PUBLIC_TELEGRAM_URL`

## Brand

Working name **Zlatna** — wordmark only for now; swap logo assets later without redesigning layout.
