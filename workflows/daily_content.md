# Daily Content — Master Workflow

## Objective
Every day, produce ready-to-shoot Pokémon TCG slideshow scripts (native text + English translation) that drive traffic to ivoryshard.com without looking promotional, for **three personas**: **Lea** (🇩🇪), **Chloé** (🇫🇷), and **Mila** (🇩🇪, a second German profile run by a different operator). Then post **two Slack messages** from one source JSON:
- **`SLACK_CHANNEL_OPERATOR`** → PDF with **Lea + Chloé** (the operator's own two profiles).
- **`SLACK_CHANNEL_MILA`** → **German-only** PDF with **Mila only** (for Valentin).

Mila is a genuine A/B test against Lea: same German market is fine, but she must use a **different format/angle** (ideally a different tone too). All three scripts in a day must use **distinct formats**.

## Inputs
- **`reference/content-learnings.md` — rules distilled from the user's feedback. READ THIS FIRST and
  apply every rule. It reflects the user's latest explicit preferences and OVERRIDES any conflicting
  instruction in this file or CLAUDE.md.**
- `reference/brand-personas.md` — voice for Chloé (FR), Lea (DE) & Mila (DE #2)
- `reference/slang-fr.md`, `reference/slang-de.md` — native lexicon
- `reference/content-formats.md` — format library (+ the 3 burned formats to avoid)
- `reference/market-stock-logic.md` — the CTA decision matrix
- `reference/market-intel.md` — living releases + value/price data
- `reference/examples/` — **screenshots of real carousels that performed well** (the user's curated
  winners, e.g. `french/ss1…`, `germany/ss1…`). STUDY these as images for the **style, tone, structure
  and what makes a deck engaging** — they are the BAR for "fun / different / unique". **Never copy their
  content or topics** — be creative and original.
- Live read of **ivoryshard.com** (stock + restock signals)
- Fresh **TCG news + prices** (web) — see the daily news sweep in Step 2

## How this runs now (Trigger.dev + scheduled Claude Code)
You (Claude Code) are the **brain**, running on a daily schedule. You do the free reasoning
(research, writing, fact-checks) and call the deployed **Trigger.dev tasks** for the deterministic
work. Trigger the tasks via the Trigger.dev MCP (`mcp__trigger__trigger_task`) or the REST API.

**Do NOT write to memory during a scheduled run** (keeps your manual Claude use unaffected).

## Tasks used (Trigger.dev — replace the old Python tools)
- `scrape-store` — live ivoryshard.com stock + banner read (headless Chromium). Returns `store_state`.
- `fetch-prices` — current prices via CardTrader/eBay APIs. **Use this for prices instead of web
  search** (saves tokens). Input: a list of card/product names.
- `get-state` — read the last ~10 days of formats (for dedup) + your running `market_knowledge`.
- `daily-content` — the one-shot pipeline: lints the JSON, renders BOTH PDFs, posts them to the two
  Slack channels, and saves the day's formats (+ your refreshed `market_knowledge`) to Supabase.
- `lint-content` / `render-pdf` / `deliver-slack` / `save-state` — the same steps individually, for
  testing or à-la-carte use.

---

## Steps

### 1. Read the store (stock + restock signals)
Trigger **`scrape-store`** → returns `store_state` (in_stock, coming_soon, banner, restock_signal)
plus full product detail. This renders the JS storefront in headless Chromium and reads the product
cards + the announcement bar.
- **Restock signal FIRST (banner ≫ coming soon):** a real **announcement-bar banner** under the navbar = the only strong signal (→ Strong intensity allowed). **"Coming soon"** products = mild only (nudge that market to Medium at most, never hype, never insider framing). **Ignore the hero carousel.**
- **Classify in-stock products** by the English title's **parenthetical language suffix**: `(French)`→FR, `(German)`→DE, `(English)`→both, `(Japanese)/(Chinese)/other`→judgment. (`scrape-store` already does this in its `language` field — sanity-check it.)
- Use the returned `store_state` directly in the day's JSON payload.

### 2. Refresh news + price/value intel
- **Load your running memory:** trigger **`get-state`** → `market_knowledge` (what you already know:
  digested news, known prices, what landed). Start from this so you do NOT re-research the same
  articles. Only look for what's **new** since `market_knowledge_updated_at`.
- **Prices:** trigger **`fetch-prices`** with the relevant card/product names (CardTrader/eBay) —
  use this instead of web-searching prices.
- **News sweep (DO THIS THOROUGHLY — relevance is the #1 quality lever):** `WebSearch`/`WebFetch`
  hard for **genuinely fresh, TODAY-relevant** Pokémon TCG news. Don't do a token sweep — run multiple
  targeted searches and actually stay on top of the cycle:
  - **New SET LEAKS, reveals, and fresh Pokémon/TCG announcements** (the user confirmed these perform
    especially well) — upcoming sets, leaked card lists/chase cards, official reveals, release-date news.
  - Drops / restocks, what to **hold** vs **brick**, chase-card narratives — **global + FR + DE**.
  - Search **date-bounded** ("this week", current month/year) and hit the FR/DE sources too, not just EN.
  - Goal: every deck is anchored to something **current and relevant**, not evergreen filler. If big
    news broke today, that's likely the day's topic.
- **Read `reference/market-intel.md`** (human-curated viral examples — you read it, never overwrite).
- **Persist what you learned** into `market_knowledge` (passed to `daily-content`/`save-state` at the
  end) so tomorrow's run starts smarter.

### 3. Decide angle per market
Apply `market-stock-logic.md` to today's stock state → set **CTA intensity** (soft / medium / hard / hype) for **Chloé** and **Lea** independently.

### 4. Pick formats (no duplication)
From `content-formats.md`, choose a format for **each of the three personas** (Lea, Chloé, Mila) that matches that market's intensity (see the Step-D mapping). **Rules:**
- Never use a **burned** format.
- **All three scripts must use distinct formats/angles** — never the same script twice. This includes **Lea vs Mila** (both German): they share the market but must differ in format (ideally tone too — that's the A/B test). The linter blocks duplicate formats.
- Avoid repeating a persona's format from the last ~10 days — use the `recent_formats` returned by
  **`get-state`** (Step 2) to see what each persona has already used.

### 4.5 Study the winning examples (the style/quality bar)
**Before writing, actually OPEN the screenshots in `reference/examples/` (read them as images — they
are PNGs) and study what makes them work:** topic choice, hook, tone, pacing, slide structure/format,
and why a viewer would stop and save. These are the user's real winners and the bar for "fun /
different / unique".
- **Emulate the STYLE and quality, never the content.** Do NOT reuse their topics, hooks, or wording —
  be creative and original (see the examples-are-templates rule in `content-learnings.md`). Copying a
  winner's topic is a failure, not a win.
- Use them to sanity-check today's angle: if your planned topic feels weaker/duller than these, pick a
  better one (lean on the fresh news from Step 2 and the confirmed interesting angles in
  `content-learnings.md`).

### 5. Write the scripts (English-first; native ONLY for on-slide text)
**Before writing, re-read `reference/content-learnings.md` and apply EVERY rule in it** (it captures
the user's accumulated feedback and overrides conflicting guidance below).
Write **three** scripts — Lea (DE), Chloé (FR), Mila (DE). The user reads English, so everything in the PDF is **English**, EXCEPT the exact words that go on a slide, which stay native (FR/DE) with an English gloss. For **each** persona:
- **Format name** + **intensity** + **why this angle today** (English, 1 line)
- **Slide-by-slide** (slide 1 = the hook). Use the exact field names from the schema below: `title` + `bullets` (native, the exact on-slide text), `title_en` + `bullets_en` (English gloss of each), `direction` (English: what to show / shoot — a note for the user, NEVER on the slide).
- **CTA** = final-slide on-screen text: `on_screen` (native) + `en` (English gloss)
- **Shot list** (English) — the `shot_list` field
- **NO captions, NO hashtags for now** (the user will define caption rules later).

- **Keep per-persona note fields self-contained.** `why_today` is rendered in the PDF, and Mila's PDF goes to a different operator — so do NOT reference other personas by name (no "different from Lea") in any field. State the angle on its own terms.

**Honesty rules (hard — see `brand-personas.md`):** value-first; IvoryShard is one lowkey **named** tip, never the star; **no false scarcity** ("all that's left", "almost gone"), **no insider/"my shop" framing**, **no overhype**. The set is available elsewhere — recommend IvoryShard for fairness (checkout limits, restock alerts), not as the only option. All three personas must use different formats/angles.

**🔒 FACTUAL ACCURACY (hard — memory `slide-facts-must-be-verified`):** every claim that lands ON a slide must be 1000% verified true. **You verify it (WebSearch/WebFetch are free — no key needed) BEFORE writing it.** NEVER write a "verify this before filming" note in `direction`/`shot_list` — that offloads the check onto the user and is exactly the failure mode to avoid. **No unofficial numbers on slides:** pull rates aren't published by Pokémon and community estimates disagree → never put a numeric pull rate on a slide; treat specific prices the same (volatile). Use qualitative truths ("rarest pull in the set", "SIR pulled far more often", "check the live Cardmarket cote"). Slide-safe = official set names/dates, card names, rarity tiers, standard pack counts (Box 36 / ETB 9 / Bundle 6), that day's live stock, and plain logic.

**IvoryShard slide placement (memory `ivoryshard-integration-rules`):** when a (natural) store mention belongs on the deck — **5 slides → put it on slide 3; more than 5 slides → slide 4 or later.** Mid-deck, not only the final slide. Still one natural touch; omit entirely if it doesn't fit.

Assemble the day's JSON in memory (the `daily_content` schema below) — this becomes the `data`
payload for the `daily-content` task. (No local file needed; nothing persists to disk between runs.)

### 6. Self-check the draft (draft → lint → fix → repeat)
Treat the first JSON as a **draft**, not the final. Don't render or send until it's clean.
1. **Lint it:** trigger **`lint-content`** with the JSON (or run a `daily-content` call with
   `dryRun: true`). It deterministically checks the mechanical rules (>=5 content slides, 0–4 bullets
   each (bullets optional), English parallel present, **no numeric pull-rate/odds on a slide**, **no "verify…before
   filming" offload note**, **IvoryShard placement** = slide 3 on a 5-slide deck / slide 4+ on a
   longer one, **no duplicate formats**, and warns if a **restock-alert CTA** is used for an in-stock
   product).
2. **Fix every ERROR; review every WARN.** Re-trigger until it returns `ok: true`.
3. **The linter does NOT judge truth.** It can't tell if a fact is real — so separately confirm, with `WebSearch`/`WebFetch`, that **every on-slide claim is verified true** (per the FACTUAL ACCURACY rule above) and that each IvoryShard mention reads as natural, not bolted on. The linter is the floor, not the ceiling.
4. **Check the draft against `reference/content-learnings.md`** — every rule there must hold (product
   naming, single contextual IvoryShard touch + engagement-question close, save-worthy depth/"why",
   concrete price ranges where relevant, no risky market-trend claims). Fix any miss before delivery.

Only once it passes and you've verified the facts, run the final delivery.

### 7–8. Render + deliver (one call)
Trigger **`daily-content`** with `{ data: <the day's JSON>, market_knowledge: <your refreshed notes> }`.
It lints (hard gate), renders **two PDFs**, posts each to its Slack channel, and saves state:
- **Operator's PDF (Lea + Chloé)** → channel `SLACK_CHANNEL_OPERATOR`, title `Pokemon Content - <date>`.
- **Mila-only PDF (for Valentin)** → channel `SLACK_CHANNEL_MILA`, title `Pokemon Content (Mila) - <date>`.

PDF layout (each language **un-mixed** so the native script is one clean copy-paste block): each
persona on its own page = **3 blocks in order** → (1) **NATIVE SCENARIO** — the full script in the
slide language, in tinted boxes, copy-paste ready (no English mixed in); (2) **ENGLISH VERSION** —
the same script in English, understanding only; (3) **DIRECTIONS & SHOT LIST** — per-slide filming
notes. Title page = header (date, in-stock, coming-soon, banner/restock signal) + legend.

- **Delivery = Slack** (replaces the old email). Two **separate channels**: the operator's two
  profiles (Lea + Chloé) go to one channel; Mila goes to Valentin's channel. The bot token + the two
  channel IDs live in the Trigger.dev env (`SLACK_BOT_TOKEN`, `SLACK_CHANNEL_OPERATOR`,
  `SLACK_CHANNEL_MILA`).
- **`daily-content` also persists** the day's three formats + your `market_knowledge` to Supabase, so
  tomorrow's dedup + research start from today.

---

## `daily_content_<date>.json` schema
```json
{
  "date": "2026-05-30",
  "store_state": {
    "banner": "none",
    "restock_signal": "none|coming_soon|banner",
    "in_stock": [{"title": "...", "language": "French|German|English|Japanese|...", "url": "..."}],
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
         "bullets": ["<native bullet>", "<native bullet>"],
         "title_en": "<English translation of the title>",
         "bullets_en": ["<English bullet>", "<English bullet>"],
         "direction": "<English: what to film/show on this slide - NOT slide text>"}
      ],
      "cta": {"on_screen": "<native final-slide CTA>", "en": "<English gloss>"},
      "shot_list": "<English overall>"
    }
  ]
}
```
- Every content slide needs a **title**; **bullets are OPTIONAL (0–4, aim ≤3)** — not every slide must be a bullet list. A slide can be one punchy line or a reveal with no bullets (see the "bullets are one tool, not a mandate" rule in `content-learnings.md`). **≥5 content slides.** Study `reference/examples/` for **style & format**, not just bullet density.
- `direction` and `shot_list` are English notes for the user; everything the viewer sees lives in `title`/`bullets` (native).
- No `caption`/`hashtags`/`voiceover` fields — intentionally dropped for now.

## Outputs
- Deliverables: **two Slack posts** — Lea+Chloé PDF → `SLACK_CHANNEL_OPERATOR`; Mila-only German PDF
  → `SLACK_CHANNEL_MILA`.
- Persisted state (Supabase): the day's three formats → `format_log`; your refreshed running notes →
  `market_knowledge`.
- No local intermediates — the JSON + PDFs live only in the task run; nothing writes to disk.

## Edge cases & notes
- **Never** claim something is in stock without verifying the live read that day.
- If the store is fully empty + no signal → all three personas go Soft (pure value/persona). This is normal/expected.
- Keep all three genuinely different — same topic is fine, identical script/format is not. Lea ≠ Mila especially (both DE).
- Prices: prefer **Cardmarket EUR** for FR/DE audiences; convert/verify before quoting.
- Update this SOP as we learn (rate limits, what formats land, new sources).
