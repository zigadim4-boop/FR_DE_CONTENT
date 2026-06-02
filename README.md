# FR/DE Pokémon Content Automation (Trigger.dev)

Daily, ready-to-shoot Pokémon TCG slideshow scripts for three personas — **Lea** 🇩🇪, **Chloé** 🇫🇷,
and **Mila** 🇩🇪 — delivered as two PDFs to two Slack channels.

## Architecture

- **Brain = Claude Code, scheduled.** A daily routine (via `/schedule`, runs in the cloud — laptop
  can be closed) does the free reasoning: reads `reference/`, scrapes the store, fetches prices,
  researches news, writes the three scripts, then triggers the deterministic pipeline. Uses your
  Claude subscription (no metered AI bill). See [`CLAUDE.md`](CLAUDE.md) and
  [`workflows/daily_content.md`](workflows/daily_content.md).
- **Tools = Trigger.dev TypeScript tasks** in [`src/trigger/content/`](src/trigger/content/):

  | Task | What it does |
  |---|---|
  | `scrape-store` | Live ivoryshard.com stock + banner read (headless Chromium via Playwright). |
  | `fetch-prices` | Current prices via CardTrader/eBay (so the brain doesn't web-search prices). |
  | `get-state` / `save-state` | Rolling state in Supabase: ~10-day format-dedup log + `market_knowledge`. |
  | `lint-content` | Deterministic content lint (the hard rules) — gate before rendering. |
  | `render-pdf` | JSON → the two branded PDFs (operator / Mila). |
  | `deliver-slack` | Post a PDF to a Slack channel. |
  | `daily-content` | **Orchestrator**: lint → render ×2 → Slack ×2 → save state, in one call. |

- **Shared logic** in [`src/lib/`](src/lib/): `schema.ts` (Zod, single source of truth), `lint.ts`,
  `pdf.ts`, `slack.ts`, `supabase.ts`, `text.ts`, `env.ts`.

## Setup

1. **Install deps:** `npm install`
2. **Secrets:** copy `.env.example` → `.env` and fill in every placeholder (the file says where each
   value comes from). Add the *same* keys to the Trigger.dev dashboard (Project → Environment
   Variables) for **both staging and prod**.
3. **Supabase:** create a free project, run [`docs/supabase.sql`](docs/supabase.sql) in its SQL editor.
4. **Slack:** create an app with a bot token (`chat:write`, `files:write`), invite it to both
   channels, put the token + channel IDs in `.env`.
5. **Trigger.dev:** set `TRIGGER_PROJECT_REF` in `.env` / `trigger.config.ts`.

## Develop / deploy

```bash
npm run dev        # npx trigger.dev@latest dev — registers tasks locally
npm run typecheck  # tsc --noEmit
npm run deploy     # npx trigger.dev@latest deploy  (CI also deploys on push to master)
```

Deploy also happens automatically via GitHub Actions on push to `master`
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) — set a `TRIGGER_ACCESS_TOKEN` repo
secret.

## Schedule the daily run

Create a Claude Code routine (`/schedule`, e.g. `0 9 * * *`) whose prompt runs
`workflows/daily_content.md`, on **Opus 4.8** for writing. It must be told **not to write memory**.

## Reference

`reference/` is the brain's human-curated context — **you maintain it by hand** (add viral examples
as they land). The agent reads it, never overwrites it. `reference/legacy/` keeps the original WAT
instructions; `reference/produced/` keeps past PDFs for feedback.
