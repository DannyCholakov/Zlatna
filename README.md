# TradeVision

Premium bilingual (English / Bulgarian) marketing site for an automated trading community. Built with Next.js for Vercel.

## Brand

**TradeVision** — logo mark is an eye aperture + rising chart (`public/logo.svg` and `src/components/Wordmark.tsx`).

## Local

```powershell
cd C:\Users\danie\Desktop\TradingBot\website
copy .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`. Switch with `/bg`.

Set `NEXT_PUBLIC_TELEGRAM_URL` in `.env` to your invite link when ready.

## Demo data

Replace numbers in [`src/data/demo-backtest.ts`](src/data/demo-backtest.ts). Results stay labeled **DEMO**.

## Deploy

Repo: https://github.com/DannyCholakov/Zlatna (rename on GitHub to TradeVision when you want).

Vercel env: `NEXT_PUBLIC_TELEGRAM_URL`
