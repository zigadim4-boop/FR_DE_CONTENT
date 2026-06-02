-- Run this once in your Supabase project (SQL Editor) to create the rolling-state tables.
-- The Trigger.dev tasks read/write these with the service-role key.

-- The ~10-day format-dedup log: one row per persona per day.
create table if not exists public.format_log (
  id         bigint generated always as identity primary key,
  date       date        not null,
  persona    text        not null,
  market     text        not null,
  format     text        not null,
  created_at timestamptz not null default now()
);
create index if not exists format_log_date_idx on public.format_log (date desc);

-- The agent's running market knowledge: a single JSON row the brain reads at the start of each run
-- (so it doesn't re-research) and refreshes at the end.
create table if not exists public.market_knowledge (
  id         bigint primary key,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.market_knowledge (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;
