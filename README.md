# Zlatna

Premium bilingual (English / Bulgarian) marketing site for an XAUUSD gold community. Built with Next.js for Vercel. Prisma is stubbed for future member profiles — the live portfolio site does not need a database yet.

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

## Prisma (later)

Schema lives in [`prisma/schema.prisma`](prisma/schema.prisma) with a `User` model stub. Do not wire pages to `@/lib/prisma` until you provision `DATABASE_URL` (SQLite locally / Postgres on Vercel).

```powershell
npx prisma generate
# when ready: npx prisma migrate dev --name init
```

## GitHub + Vercel

This folder is its **own** git repository (nested under TradingBot, ignored by the parent).

```powershell
cd C:\Users\danie\Desktop\TradingBot\website
git status
# First time on GitHub:
gh repo create Zlatna --public --source=. --remote=origin --push
```

Then in [Vercel](https://vercel.com):

1. Import the **Zlatna** GitHub repo  
2. Framework: Next.js (auto)  
3. Root directory: `.` (repo root is the site)  
4. Env: `NEXT_PUBLIC_TELEGRAM_URL` (and later `DATABASE_URL` if you enable Prisma)

## Brand

Working name **Zlatna** — wordmark only for now; swap logo assets later without redesigning layout.
