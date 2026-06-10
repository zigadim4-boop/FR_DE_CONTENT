---
name: apply-feedback
description: >
  Use this WHENEVER the user gives feedback, a critique, a correction, or suggested improvements on
  produced content — Pokémon TCG slideshow/carousel scripts, slides, captions, or anything from a
  daily/scheduled content run — or on how content should be written in general. Triggers on messages
  like "next time do X", "this should be Y", "I'd change…", "don't say…", "I prefer…", reviewer
  notes, or a list of suggested tweaks. The goal is to make FUTURE scheduled runs better, not to
  rewrite content that was already sent.
---

# Apply Feedback → Future Runs

The user wants every piece of feedback to permanently improve future content runs without having to
re-explain the system each time. Feedback reaches scheduled runs only through the project rule files
the writers and orchestrator read. This skill turns feedback into durable rules in the RIGHT file.

The rules live in several files now (a persona writer loads only its own lane), so the key job is
**routing each lesson to the correct file** and **updating cleanly** (no duplicates, no archive).

## Do this every time the user gives content feedback

1. **Do NOT rewrite already-delivered content.** Files under `reference/produced/` are the record of
   what was shipped. Feedback means "improve next time," not "patch the old artifact." Only edit an
   existing piece if the user *explicitly* asks for a revision of that specific piece.

2. **Distill the durable rule.** Turn the specific note into a generalizable, reusable rule. Strip
   one-off specifics; keep the principle. Example: "don't say 'Bundle FR'" → *"Never use
   language-variant product names; use set name + product type + a flag emoji."*

3. **ROUTE the rule — decide its home BEFORE writing.** Ask, in order:
   - **Does applying it require knowing about ANOTHER persona or ANOTHER day?** (e.g. "after IvoryShard
     repeats 3× on a market, go pure-value for 2 days", "rotate the peer shop", "all three formats must
     differ", "Lea ≠ Mila".) → it's a **brain / orchestrator** rule → write it into the relevant Step
     of **`workflows/daily_content.md`**, NOT into a writer's rule file. An isolated writer can't apply
     these; the orchestrator resolves them and passes the result down in the brief.
   - **Is it a verified fact** (set name, date, card count, JP-vs-localized mapping, a chase card)? →
     **`reference/verified-facts.md`** (and the localized name also goes in the matching pack). Verify
     it first (step 6).
   - **Is it language-specific** — a translation, localized set/product/Pokémon name, slang, a
     spelling/typo fix, a diction/register note (an over-used word, intensifier variety, the tone of a
     specific word)? → the matching **pack**: `reference/pack-de.md` (Lea + Mila) or
     `reference/pack-fr.md` (Chloé). **Never** carry a German wording/name/spelling/diction fix into
     French, or vice versa.
       - *Seam to watch:* the meta-idea of a diction note can sound universal ("don't repeat one word")
         — but if its substance is one language's vocabulary, it's **language-specific**. Don't fan a
         German word-variety note out to French.
   - **Is it truly for ONE persona only** (a Mila-only tone preference that must NOT touch Lea, even
     though both are German)? → a per-persona override file **`reference/persona-{lea|mila|chloe}.md`**,
     **created on demand** (it may not exist yet). Use this sparingly — language feedback defaults to
     the shared pack (DE → Lea + Mila), not a persona file.
   - **A new viral/winning carousel the user shares** (a screenshot, a link, "this one did great") →
     **`reference/winning-style.md`**: distill its ONE new style/look/template lesson into words and
     fold it in (then trim to keep the file short — see the budget). You may also drop the raw image
     into `reference/examples/` as an archive, but the writers read the distilled text, not the image.
   - **Otherwise it's universal craft** (hook style, slide order, promise→payoff, IvoryShard
     integration *craft*, honesty, engagement, topic relatability, pacing, depth, structure) →
     **`reference/content-rules-core.md`**. It applies to ALL THREE personas even if one persona's
     script triggered it. Any ✅/❌ example is a language-tagged template, not the rule.
   - **Tie-breaker:** if unsure whether a **craft/structure/engagement** principle is broad enough,
     default to **universal** (core). **Exception** — for wording, slang, diction, spelling, or a
     localized name, default the OTHER way: **language-bound** (DE → pack-de, FR → pack-fr).
   - "German feedback" updates BOTH German personas (one `pack-de`), not only the reviewed one. French
     feedback → Chloé (`pack-fr`).
   - **Mixed case (universal principle, language-specific execution)** — e.g. "use the official
     localized set name": state the **principle as universal** in core, then put the **per-language
     value** (the actual name + verify-at-run-time note) in each pack. **Never hard-code one language's
     value as if global** — that leaking string is the #1 failure mode.

4. **DEDUPE FIRST — read the destination file(s) IN FULL before writing.** Open the file the rule
   routes to (and `content-rules-core.md` too, since craft rules cluster there) and read it fully — a
   real read, not a keyword grep; related rules are often worded differently than the feedback. Classify
   each distinct point:
   - **already-covered** — an existing rule already says this → **skip it, add nothing.** A
     near-duplicate is worse than no rule.
   - **partial-overlap** — a related rule exists but this adds a *distinct* goal → **widen that rule in
     place**, don't bolt a near-duplicate beside it.
   - **genuinely-new** — no existing rule covers it → add it under the right section.
   When the batch is large, make the classification explicit first (a quick written audit, or a sub-agent
   dedup pass over the file).

5. **WRITE — current truth only, additive where the user is adding options.** The update discipline:
   - **Additive praise → ADD as another approved option; KEEP the existing ones.** If the user says a
     new hook/angle/approach is good *without* saying to drop others, it joins the menu — approved
     hooks/angles/examples are **libraries the writer picks from by content**, not single slots. Do NOT
     delete the previously-approved options.
   - **Contradicting feedback → UPDATE the affected rule in place** — replace the old wording with the
     new. Do **not** keep both, do **not** add a "This OVERRIDES…" note, do **not** archive the old
     version anywhere. The files hold only current truth.
   - **DELETE only when the user explicitly says** something should no longer be used / is wrong. Never
     infer deletion from praise of an alternative.
   - **Never stack near-duplicates of the same rule** — but distinct valid options are not duplicates.
   - Keep each rule tight with a **✅ good / ❌ bad** example, **tagged by language** when in a pack;
     for a **universal** core rule, give BOTH a DE and an FR example so a run can't read it as
     one-language-only.

6. **Verify factual claims — in the feedback itself, and for run time.** If the feedback asserts a fact
   (set name, JP-vs-localized mapping, card count, release date, price, a superlative), **verify it
   before logging** — WebSearch/WebFetch are free. If verification contradicts the feedback's framing,
   log the verified version and tell the user. For facts that drift (prices, stock, localized names),
   note they must be re-verified at run time per language.

7. **Confirm back to the user**, briefly: what you added/updated, **which file/persona scope** it
   landed in (core = all three / a pack = one language / a persona file / a brain rule in the workflow),
   **and which points you SKIPPED as already-covered.** Note it applies to future runs.

## Keep the files SMALL — the context budget (the #1 long-term risk)

These files are loaded into a writer's context on every run. If they grow unbounded, the writers get
worse — the whole point of the split is undone. So **every addition must "pay rent": you may not let a
file grow without trimming something to make room.** Treat these as soft caps:

| File | Soft cap | If you'd exceed it |
|---|---|---|
| `content-rules-core.md` | ~250 lines | **consolidate before adding** — merge overlapping rules, cut the weakest example |
| `pack-de.md` / `pack-fr.md` | ~90 lines each | same |
| `persona-{name}.md` | ~40 lines each | same |
| `winning-style.md` | ~70 lines | fold the new winner's ONE lesson in, trim the rest |
| `verified-facts.md` | ~90 lines | drop stale/past sets |

Hard habits that keep size flat:
- **Examples are capped.** Max **2 per rule** (for a universal core rule: one DE + one FR; for a pack
  rule: one). To add a better example, **replace** the weakest — never append a third.
- **The "approved options" menus are capped** (e.g. the hook library). Keep the **~5 best** options for
  any one rule; when feedback adds a stronger one past that, **drop the weakest**, don't grow the list.
- **Widen, don't append.** "Partial-overlap" feedback (step 4) means *edit the existing rule's wording*
  to cover the new goal — it must NOT add net lines most of the time.
- **Net rule: a normal feedback edit should leave the file the same size or smaller.** A genuinely-new
  rule may add a few lines, but if the file is at/over its cap, first do a consolidation pass (merge
  near-duplicates, trim examples) so the net change is roughly zero.
- If a file is over budget and you can't trim, that's a signal to flag for the user, not to keep piling on.

`content-rules-core.md` is already ~250 lines (at budget) — so additions there almost always require a
consolidation, not an append.

## Notes
- The content rules are split by who needs them: **`content-rules-core.md`** (universal craft, every
  writer), **`pack-de.md` / `pack-fr.md`** (language lanes), **`persona-*.md`** (per-persona overrides,
  on demand), **`winning-style.md`** (the example library distilled to text), **`verified-facts.md`**
  (shared facts), and cross-persona/cross-day logic in **`workflows/daily_content.md`** (the
  orchestrator). Route to exactly one; never duplicate a rule across files or into personal memory.
- `reference/examples/` is a manual archive of raw winner screenshots — the writers never load it.
  Studying images happens HERE in chat with the user, and the lesson lands in `winning-style.md`.
- Keep every file scannable: short rules, grouped by topic, examples over prose.
- No history is kept. When a rule changes, the old wording is replaced, not preserved.
