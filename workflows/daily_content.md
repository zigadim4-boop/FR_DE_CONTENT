# Daily Content — Master Workflow (Orchestrator)

## Objective
Every day, produce ready-to-shoot Pokémon TCG slideshow scripts (native text + English translation)
that drive traffic to ivoryshard.com without looking promotional, for **three personas**: **Lea**
(🇩🇪), **Chloé** (🇫🇷), and **Mila** (🇩🇪, a second German profile run by a different operator). Then
post **two Slack messages** from one source JSON:
- **`SLACK_CHANNEL_OPERATOR`** → PDF with **Lea + Chloé** (the operator's own two profiles).
- **`SLACK_CHANNEL_MILA`** → **German-only** PDF with **Mila only** (for Valentin).

Mila is a genuine A/B test against Lea: same German market is fine, but she must use a **different
format/angle** (ideally a different tone too). All three scripts in a day must use **distinct formats**.

## How this runs — you are the ORCHESTRATOR (brain)
You (Claude Code, on a daily schedule) do NOT write the three scripts yourself. You do the **shared
work** and the **cross-persona / cross-day decisions**, then **fan out one `persona-writer` subagent
per persona** (via the Agent tool, all three in one message), collect their scripts, and run the
deterministic delivery task. Each writer stays in one language lane and can't see the others — so
anything that depends on the *other* personas or on *other days* is YOUR job, passed to them in a brief.

**Do NOT write to memory during a scheduled run** (keeps your manual Claude use unaffected).

## Inputs you own and pass down
- `reference/content-rules-core.md` — universal craft (every writer reads it; you don't need to).
- `reference/pack-de.md` / `reference/pack-fr.md` (+ `slang-de.md`/`slang-fr.md`) — the writers read
  their own; you don't.
- `reference/verified-facts.md` — shared set facts. **You verify these fresh each run** and pass the
  relevant slice into each brief.
- `reference/brand-personas.md` — voices (each writer reads its own section).
- `reference/content-formats.md` — the format library (+ the burned formats to avoid). **You** pick
  formats here.
- `reference/market-stock-logic.md` — the CTA-intensity decision matrix. **You** set intensity.
- `reference/market-intel.md` — living releases + value/price hooks (read, never overwrite).
- `reference/winning-style.md` — the example library distilled to text (the style bar). Writers read
  this, NOT the raw screenshots. `reference/examples/` is now a manual archive — updated only when the
  user shares a new winner in chat; it is **not loaded on a run**.
- Live read of **ivoryshard.com** + fresh TCG news/prices.

## Deterministic tasks (Trigger.dev — trigger via `mcp__trigger__trigger_task`)
- `scrape-store` — live ivoryshard.com stock + banner (headless Chromium). Returns `store_state`.
- `fetch-prices` — current prices via CardTrader/eBay. Use instead of web-searching prices.
- `get-state` — last ~10 days of formats (for dedup) + your running `market_knowledge`.
- `daily-content` — the one-shot pipeline: lints the JSON, renders BOTH PDFs, posts them to the two
  Slack channels, saves the day's formats (+ refreshed `market_knowledge`) to Supabase.
- `lint-content` / `render-pdf` / `deliver-slack` / `save-state` — the same steps individually.

---

## Steps

### 1. Read the store (stock + restock signals)
Trigger **`scrape-store`** → `store_state` (in_stock, coming_soon, banner, restock_signal) + product detail.
- **Restock signal FIRST (banner ≫ coming soon):** a real **announcement-bar banner** = the only strong
  signal (→ Strong intensity allowed). **"Coming soon"** = mild only (if the stock matrix would yield
  Soft, it may raise that market to Medium at most — never higher, never hype, never insider framing).
  **Ignore the hero carousel.**
- **Classify in-stock products** by the English title's parenthetical language suffix: `(French)`→FR,
  `(German)`→DE, `(English)`→both, other→judgment. (`scrape-store` sets `language`; sanity-check it.)

### 2. Refresh news + price/value intel, and VERIFY the shared facts
- **Load running memory:** `get-state` → `market_knowledge`. Start from this; only research what's
  **new** since `market_knowledge_updated_at`.
- **Prices:** `fetch-prices` with the relevant names (instead of web-searching prices).
- **News sweep (DO THIS THOROUGHLY — relevance is the #1 quality lever):** run multiple targeted,
  date-bounded `WebSearch`/`WebFetch` for genuinely fresh, TODAY-relevant news — **new set leaks,
  reveals, announcements** (these perform especially well), drops/restocks, hold-vs-brick narratives,
  global + FR + DE sources. Every deck should anchor to something current.
- **Verify the slide-safe facts in `reference/verified-facts.md`** for today (dates, set names, chase
  cards, counts) — these are language-neutral; you confirm them once and pass each market's slice into
  the briefs so writers don't re-research them.
- **Read `reference/market-intel.md`** (price trends + news hooks; set facts live in
  `verified-facts.md`). **Check its `Last updated` stamp: if older than 3 days, treat it as a BLOCKER —
  refresh its price/news sections (and the stamp) from the listed sources before briefing any writer;
  never brief from stale intel.** **Persist** what you learned into `market_knowledge` (passed to
  `daily-content` at the end).

### 3. Decide CTA intensity per market
Apply `market-stock-logic.md` to today's stock → set **intensity** (soft / medium / strong — strong
only with a live banner) for **DE** and **FR** independently.

### 4. Assign formats (enforce all the cross-persona rules HERE)
From `content-formats.md`, pick a format/angle for **each of the three personas**. This is where the
distinctness rules are enforced — the writers can't see each other:
- **Never a burned format.**
- **All three scripts use distinct formats/angles** — including **Lea vs Mila** (both German): same
  market, but different format, ideally different tone (the A/B test). The linter blocks duplicate formats.
- **Avoid repeating a persona's own format from the last ~10 days** — use `recent_formats` from `get-state`.

### 5. Decide the IvoryShard directive per persona (cross-day state — YOUR call)
Each writer gets either "include one mention (peer shop = X)" or "omit entirely." Decide with these rules:
- **Anti-repetition streak (tracked PER MARKET, FR and DE separately):** if **three scripts in a row**
  cover the SAME product on the SAME market and that market's offering hasn't changed, the **next TWO
  days on that market are pure-value with NO IvoryShard mention at all** (built to grow followers).
  Bring the brand back only once that market's product/stock actually moves. A repeat on FR doesn't
  force a value-only day on DE, and vice versa.
- **Peer-shop rotation:** IvoryShard is the CONSTANT; the peer shop named alongside it must **rotate
  day to day** — don't pair it with the same second shop (e.g. Fuji Store) every time. **Verify the
  peer is real, reputable IN THAT MARKET (DE for Lea/Mila, FR for Chloé), and correctly spelled** before
  you put it in a brief — a shop known in one country may be unknown in the other.
- **Which product to feature:** research community hype PER PRODUCT (don't just trust a "Coming Soon"
  tag). Pick the specific product with the strongest current hype, per market. If none is hyped enough
  to mention organically, set the directive to a generic IvoryShard reference or "omit."
- Pure-value, no-shop decks are the NORM, not the exception (most winning decks mention no shop) — when
  in doubt, omit.

### 6. Fan out the three persona-writers (parallel)
Spawn **three `persona-writer` agents in one message** (Agent tool). Each brief contains:
```
{ persona, market, language, assigned_format, intensity, angle/why_today seed,
  research_digest (for that market), verified_facts (for that market),
  ivoryshard_directive ("include, peer = X" | "omit"), recent_formats (that persona) }
```
Each returns ONE script object matching `ScriptSchema` (use the Agent tool's `schema` option so the
return is validated). The writers verify their own language-specific facts and apply
`content-rules-core.md` + their pack.

### 7. Assemble, self-check, deliver
1. Collect the three script objects → assemble the `daily_content` payload (schema below).
2. **Lint:** trigger `lint-content` (or `daily-content` with `dryRun: true`). It checks the mechanical
   rules (deck length, ≤4 bullets, English parallel present, no numeric pull-rate/odds on a slide, no
   "verify before filming" note, IvoryShard placement, **no duplicate formats**, restock-alert-CTA
   sanity). **Fix every ERROR, review every WARN.** On a per-persona failure, **re-dispatch only that
   persona-writer** with the error and re-assemble. Repeat until `ok: true`.
3. **The linter doesn't judge truth.** Separately confirm every on-slide claim is verified (you did the
   shared facts; the writers did their language-specific ones) and that any IvoryShard mention reads natural.
4. Once clean and verified, trigger **`daily-content`** with `{ data: <the JSON>, market_knowledge:
   <refreshed notes> }`. It lints (hard gate), renders **two PDFs**, posts each to its Slack channel,
   and saves the day's formats + `market_knowledge` to Supabase:
   - **Operator's PDF (Lea + Chloé)** → `SLACK_CHANNEL_OPERATOR`, title `Pokemon Content - <date>`.
   - **Mila-only PDF** → `SLACK_CHANNEL_MILA`, title `Pokemon Content (Mila) - <date>`.

PDF layout (each language un-mixed = one clean copy-paste block): each persona on its own page = 3
blocks → (1) NATIVE SCENARIO; (2) ENGLISH VERSION; (3) DIRECTIONS & SHOT LIST. Title page = header
(date, in-stock, coming-soon, banner/restock) + legend.

---

## `daily_content` schema (mirrors `src/lib/schema.ts`)
```json
{
  "date": "2026-05-30",
  "store_state": {
    "banner": "none",
    "restock_signal": "none|coming_soon|banner",
    "in_stock": [{"title": "...", "language": "French|German|English|...", "url": "..."}],
    "coming_soon": [{"title": "...", "language": "German"}]
  },
  "scripts": [
    {
      "persona": "Lea", "market": "DE", "language": "de",
      "format": "Hold or rip?", "intensity": "soft",
      "why_today": "English why-line: stock state + news hook.",
      "slides": [
        {"n": 1,
         "title": "<exact native TITLE on the slide>",
         "bullets": ["<native bullet>"],
         "title_en": "<English translation of the title>",
         "bullets_en": ["<English bullet>"],
         "direction": "<English: what to film/show - NOT slide text>"}
      ],
      "cta": {"on_screen": "<native final-slide CTA>", "en": "<English gloss>"},
      "shot_list": "<English overall>"
    }
  ]
}
```
- Every content slide needs a **title**; **bullets are OPTIONAL (0–3)** — not every slide is a bullet
  list. Deck length matches the format (advice/value → 5–6 total incl. CTA, aim 5; showcase → may run
  longer). See `content-rules-core.md`.
- `direction` and `shot_list` are English operator notes; everything the viewer sees is native.
- No `caption`/`hashtags`/`voiceover` fields — intentionally dropped for now.

## Outputs
- Two Slack posts (Lea+Chloé → operator channel; Mila → Mila channel).
- Persisted state (Supabase): the day's three formats → `format_log`; refreshed notes → `market_knowledge`.
- No local intermediates — the JSON + PDFs live only in the task run.

## Edge cases & notes
- **Never** claim something is in stock without verifying the live read that day.
- Store fully empty + no signal → all three personas go Soft (pure value). Normal/expected.
- Keep all three genuinely different — same topic is fine, identical script/format is not. Lea ≠ Mila especially.
- Prices: prefer **Cardmarket EUR** for FR/DE; convert/verify before quoting.
- Update this SOP as we learn (rate limits, what formats land, new sources).
