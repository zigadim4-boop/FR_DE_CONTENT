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
re-explain the system each time. Feedback reaches scheduled runs only through project files they
read — **`reference/content-learnings.md`** — not through personal memory (scheduled runs are told
not to use memory). This skill turns feedback into durable rules there.

## Do this every time the user gives content feedback

1. **Do NOT rewrite already-delivered content.** Files under `reference/produced/` are the record of
   what was shipped. Feedback means "improve next time," not "patch the old artifact." Only edit an
   existing piece if the user *explicitly* asks for a revision of that specific piece.

2. **Distill the durable rule.** Turn the specific note into a generalizable, reusable rule. Strip
   the one-off specifics; keep the principle. Example: "don't say 'Bundle FR'" →
   *"Never use language-variant product names; use set name + product type + a flag emoji."*

3. **Scope the rule: universal vs language-specific — decide this BEFORE writing.** Feedback on one
   persona's script must improve the others *only where the lesson is universal*. There are three
   personas: **Lea** (🇩🇪), **Mila** (🇩🇪, 2nd German profile), **Chloé** (🇫🇷). Classify the lesson:
   - **Universal craft principle** (hook style, slide order, IvoryShard integration, honesty,
     engagement, topic relatability, pacing, depth, structure) → applies to **ALL three personas**, no
     matter which persona's script triggered it. Write it that way. Any ✅/❌ example is a
     **language-tagged template**, not the rule — never phrase a universal principle so a run could
     read it as one-language-only.
   - **Language-specific item** (a translation, a localized set/product name, slang, a spelling/typo
     fix, a market-specific fact's wording, **or a diction/register note — an over-used word,
     intensifier/filler variety, the tone of a specific word**) → binds ONLY to that language's
     personas: **German → Lea + Mila; French → Chloé.** Tag it explicitly (e.g. "DE (Lea/Mila): …",
     "⚠️ FR (Chloé): the German word X does NOT belong on a French post"). **Never** carry a German
     wording / name / spelling / diction fix into French content, or vice versa.
     - **Seam to watch:** the *meta-idea* of a diction note can sound universal ("don't repeat one
       word", "vary your phrasing") — but if the *substance* is one language's vocabulary, the rule is
       **language-specific**. Don't fan a German word-variety note out to French (or vice versa).
   - **"German feedback" = BOTH German personas (Lea AND Mila)** — they share the DE market — not only
     the one whose script you reviewed. French feedback → Chloé only.
   - **Mixed case (universal principle, language-specific execution)** — e.g. "use the official
     localized set name." State the **principle as universal**, then give the **per-language execution**
     (verify the FR name for Chloé, the DE name for Lea/Mila). **Never hard-code one language's value**
     (a specific name, date phrasing, etc.) as if it were global — that hard-coded string leaking to
     the other language is the #1 failure mode.
   - This mirrors the **"## Scope"** block at the top of `content-learnings.md` — keep new rules
     consistent with it.
   - **Tie-breaker:** if unsure whether a **craft / structure / engagement** principle is broad
     enough, default to **universal** (all three personas). **Exception — never use that default for
     wording, slang, diction, spelling, or localized-name feedback:** for those the safe default is
     **language-bound** (DE → Lea + Mila; FR → Chloé).

4. **Dedupe FIRST — read the whole file and classify every point before you write anything.** Open
   `reference/content-learnings.md` and read it IN FULL (a real read, not a keyword grep — related
   rules are often worded differently than the feedback). Then classify EACH distinct point in the
   feedback against what's already there:
   - **already-covered** — an existing rule already says this → **skip it, add nothing.** Do not
     restate the same lesson in fresh words; a near-duplicate is worse than no rule.
   - **partial-overlap** — a related rule exists but this adds a *distinct* goal → **widen that rule
     in place**, don't bolt a near-duplicate beside it.
   - **genuinely-new** — no existing rule covers it → add it under the right section.
   Feedback very often repeats a lesson the user already gave, or one an earlier persona's feedback
   already produced — catching that is the whole point of this step, and the user has explicitly asked
   not to have the same rule logged twice. When the batch is large or you're unsure how much is already
   covered, make the classification **explicit** before editing (a quick written audit, or fan out a
   Workflow / sub-agent dedup pass over the file).

5. **Write only the genuinely-new and widened rules into `reference/content-learnings.md`.**
   - Add under the right section, or create a new section heading if none fits.
   - **Merge, never duplicate** — widen the related rule identified in step 4 to cover the new distinct
     goal (e.g. "close on an engagement question" vs "close by teasing the next slide" → one rule that
     covers both); never silently overwrite it or add a near-duplicate beside it.
   - Keep each rule tight and include a **✅ good / ❌ bad** example, **tagged by language** (DE/FR),
     when possible — concrete examples are what make the rule land in future runs. A language-specific
     fact must be written so it can NEVER be read as universal (tag it; name the personas it binds to).
     For a **universal** rule, if you only have an example in one language, **add a parallel example in
     the other** (DE + FR) so a run can't mistake the principle for one-language-only.
   - If the feedback **overrides** an existing instruction (in `daily_content.md` or `CLAUDE.md`),
     say so explicitly in the rule ("This OVERRIDES …") so future runs don't fall back to the old way.

6. **Verify factual claims — in the feedback itself, and for run time.** If the feedback asserts a
   fact (a set name, a JP-vs-localized mapping, a card count, a release date, a price, a superlative
   like "the only X"), **verify it before logging it as a durable fact** — WebSearch/WebFetch are free.
   If verification contradicts the feedback's framing, **log the verified version and tell the user**;
   getting the fact right matters more than transcribing the note verbatim. For facts that drift
   (prices, stock, localized names), note in the rule that they must be re-verified at run time **per
   language**.

7. **Confirm back to the user**, briefly: what you added/updated, **which personas it applies to** (all
   three, or one language only), **and which points you SKIPPED as already-covered** (so they can see
   nothing was duplicated). Note it'll apply to future runs. Don't ask them to do anything else.

## Notes
- `reference/content-learnings.md` is the single source of truth for content rules and is wired into
  `workflows/daily_content.md` (read in Step 5, checked in Step 6). Don't duplicate these rules into
  personal memory — keep them here so runs and manual sessions read the same thing.
- Keep the file scannable: short rules, grouped by topic, examples over prose.
- The **"## Scope"** block at the top of `content-learnings.md` defines how rules fan out across the
  three personas (universal vs language-bound). Every new rule must obey it. If a piece of feedback
  needs a scoping nuance that block doesn't yet cover, refine the Scope block too — don't just bury
  the nuance inside one rule.
