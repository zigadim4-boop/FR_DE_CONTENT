# Content Learnings — Rules Distilled From User Feedback

**What this is:** a living list of content rules learned from the user's feedback on produced
scripts. **Every script in every run (manual or scheduled) MUST follow every rule here.** When a
rule here conflicts with an older instruction elsewhere (e.g. `workflows/daily_content.md`, CLAUDE.md),
**this file wins** — it reflects the user's most recent, explicit preferences.

**How it grows:** maintained by the `apply-feedback` skill. Whenever the user gives feedback on
content, the durable lesson is distilled and added here (deduped against existing rules). Feedback is
NOT applied by rewriting already-delivered content — only by improving future output via this file.

---

## Scope — how each rule applies across the three personas
**Read this first.** Personas: **Lea** (🇩🇪), **Mila** (🇩🇪, 2nd German profile), **Chloé** (🇫🇷).
- **Rules are UNIVERSAL by default — they apply to ALL THREE personas, no matter which persona's
  feedback created the rule.** Craft principles (hook style, slide order, IvoryShard integration,
  honesty, engagement closes, topic relatability, pacing, depth) are language-agnostic.
- **PRECEDENCE — the curated winning examples OUTRANK written feedback when they conflict. [User
  decision 2026-06-08.]** The slideshows in `reference/examples/` are real top-performers; the written
  rules in this file are guidance distilled from feedback. When a rule says one thing and what the
  winners actually DO says another, **follow the winners.** Don't delete the conflicting feedback (it
  still captures the user's intent and applies wherever the winners are silent) — but where they clash,
  the proven example wins. Concretely: this already overrides the old emoji ban (winners use emojis),
  the forced engagement/save-share close (winners close emotionally or just end), and the hard 5–6
  slide cap (showcase/advice winners run longer — see those rules below for the reconciled versions).
- **✅/❌ examples are language-tagged TEMPLATES, not the rule itself.** An example shown only in DE or
  FR just illustrates the principle. **Never copy an example's wording — not across languages, AND not
  verbatim into a real script even within the same language.** The examples teach the PRINCIPLE; every
  run must invent its OWN fresh topic and hook. **Shipping a file example as the actual hook — e.g.
  building a whole deck around "Andere Sammler vs ich" because it appears here as an illustration — is a
  FAILURE, not a win.** A hook the user once praised *as an example* is a direction to imitate in
  spirit, never a script to reuse word-for-word — and a format must never be mechanically filled in
  ("andere: blabla / ich: blabla" on every slide).
- **A rule is language-specific ONLY when its substance is a fact, spelling, name, or wording of one
  language** (a translation, slang, a localized set name like "Dunkelnacht", a typo fix). Those bind
  to that language's personas: **German → Lea + Mila; French → Chloé.** Never apply a German
  wording / translation / localized-name / spelling fix to French content, or vice versa.
- **"German feedback" improves BOTH German personas (Lea AND Mila)** — they share the DE market — not
  only the one whose script was reviewed. French feedback → Chloé only.
- **When in doubt about a CRAFT principle's breadth: treat it as universal, and localize the wording
  per persona.** *Exception:* for wording, slang, diction (an over-used word, intensifier variety),
  spelling, or a localized name, default the OTHER way — **language-bound** (DE → Lea + Mila;
  FR → Chloé). A meta-idea that sounds universal ("don't repeat a word") doesn't make a one-language
  vocabulary rule universal.

## Topic & angle selection — relatable to every collector
- **Every deck must be a SPECIFIC, genuinely interesting topic — never random filler, never a template
  mechanically filled in.** If the topic and the slide text feel random, irrelevant, or generic,
  viewers scroll past. Start from a real reason-to-care (a current drop / news, a live debate, a
  concrete relatable struggle, a verifiable card delta) and make EVERY slide earn attention with real
  substance. Do NOT pick a format and pour generic text into its shape — the format is a frame, the
  substance has to be real and relevant. (Pairs with "make every slide save-worthy" and the
  examples-are-templates rule in Scope.)
  - **"Interesting" is judged by the USER, never assumed — a technical / encyclopedic angle is NOT
    automatically interesting.** A JP-vs-DE **card-delta / card-list** angle, dry set trivia, or
    spec-sheet facts are the kind of topic the user has explicitly flagged as **boring** — most
    collectors don't care about checklist minutiae. Anchor real interest in the user's curated example
    screenshots (`reference/examples/`) and the live narrative hooks in `market-intel.md`, not in dry
    set facts. (See the user-confirmed "interesting angle" list below — keep it updated from feedback.)
  - ❌ DE: a generic "Andere Sammler vs ich" deck of "andere: blabla / ich: blabla" with no real topic; OR a dry encyclopedic angle (card-list deltas, set trivia) no normal collector cares about.
- **✅ Confirmed INTERESTING angles (user-validated 2026-06-05 — these genuinely pull; applies to all
  three personas). Maintain this list from feedback:**
  - **Personal / relatable POV** — pull reveals, "my real holds", collector struggles, regrets,
    "wish I knew". Story-driven and human, not a checklist.
  - **Timely news / drops — ESPECIALLY a new set LEAK or fresh Pokémon news.** Reacting fast to
    brand-new info performs especially well; lean on the "new + you might not know this yet" hook.
  - **The curated `reference/examples/` screenshots are real winners — they are the BAR for what
    "fun / different / unique" looks like.** Study them for topic, tone AND format; emulate the vibe,
    never copy verbatim (see Scope). When unsure whether a topic is interesting, compare it to these.
  - ❌ already-flagged-boring (do NOT use): card-list deltas / JP-vs-DE checklist minutiae, set trivia,
    spec-sheet facts.
- **Pick topics that land with the WHOLE collector base, not a narrow slice.** Investor-only angles —
  long-term **sealed storage**, deep ROI / spec plays — interest a small segment and cap reach.
  Default to angles every collector feels. (Niche is the exception, not the default.)
- **Relatable angle bank (these are CONCEPTS — localize the wording per persona):** pull reveals,
  favorite cards (+ why), **others-vs-me** comparisons, collector struggles / relatable POV,
  **"wish I knew" beginner lists**, top-5 picks, **anti-FOMO / "collect what YOU love, ignore the money
  side"** (prices drop, packs are for fun not profit, you never go wrong collecting what you like — a
  proven whole-base emotional theme from the example audit). The *concept* is universal (Lea, Mila,
  Chloé); write the phrasing fresh in each language — never copy the German strings onto a French post.
  - ✅ DE (Lea/Mila): "5 Dinge die ich beim Sammeln gern früher gewusst hätte" · "Andere Sammler vs ich 😅"
  - ✅ FR (Chloé): "5 trucs que j'aurais aimé savoir plus tôt" · "Les autres vs moi 😅"
  - ❌ topic (any persona): long-term sealed storage / deep ROI = investor-niche (DE ex.: "So lagerst du sealed Displays richtig")
- **A comparison angle needs a real STAKE, not a flat "which do you prefer?".** "Version A ou B, tu
  prends quoi ?" / "welche nimmst du?" is a neutral poll with no tension. The pull of a comparison is
  the *asymmetry* — one side has something the other doesn't, one is a trap, one ages badly. Lead with
  the gap, not the preference.
  - ✅ FR (Chloé): "La FR a des cartes que la JP n'aura jamais" (asymmetry = the stake)
  - ✅ DE (Lea/Mila): "Reprint vs Original — einer verliert massiv an Wert"
  - ❌ "FR ou JP, tu prends quoi ?" (flat preference, no stake)
- **Nuance — don't over-correct:** protecting your *pulls / singles* (sleeve → toploader → away from
  light) is still broadly relatable; it's *long-term sealed-box storage* that's the niche topic. Keep
  the two separate.
- **The "wish I knew" / beginner-list angle is proven** (works on the live DE profile) — but it must
  be **NET-NEW**, never a rebuild of the ⛔ burned "5 things I learned in 10 years" listicle
  (`content-formats.md`). Different framing: personal *regret / empathy* on fresh tips, not
  veteran-flex with IvoryShard as tip #3. (The daily rule still holds: Lea ≠ Mila format same day.)

## What the full example-library audit confirmed & changed [self-review 2026-06-08]
I read **all 14 reference slideshows end to end** (FR ss1–4, general ss1, DE ss1–9) — every slide and
image, reconstructing true narrative order. Lessons below are feedback to myself; everything here is
**additive — it refines, never deletes, the rules above.**
- **Pure-value, NO-shop decks are the NORM, not the exception — 8 of 14 winners mention no shop at all.**
  IvoryShard appears only when the format gives it a genuine home (the "have a shop you trust" lesson, a
  newsletter/restock-email screenshot, or the shop-rating countdown). Takeaway: **never force IvoryShard
  into a deck** — default to value-only and plug only when a natural vehicle exists. Confirms the
  value-first / anti-repetition rules; the audit just shows how dominant value-only really is.
- **The fresh winners are "N things I wish I knew" beginner-advice decks — done as personal
  regret/empathy, never veteran-flex, and with NO IvoryShard.** (DE ss7 "5 Dinge…", DE ss8 "3 Dinge… 💜",
  DE ss9 "3 Dinge… (Part. 4326)", general ss1 "My advice for new collectors".) This IS the NET-NEW way
  the rule above demands — the burned "10 years / IvoryShard tip #3" listicle is the wrong cut; these are
  the right cut. The two newest (2026-06-08) are **"3 Dinge" → 4 slides total (hook + 3)**, confirming
  BOTH the number-hook rule and the 5–6 cap (tighter than the cap is welcome).
- **Anti-FOMO / "collect what YOU love, ignore the money side" is a proven whole-base emotional theme.**
  Recurs in general ss1 and DE ss8: prices drop, don't buy because a video screams "BUY NOW", packs are
  for the fun of opening (not profit), you "never do anything wrong" collecting what you like. Add it to
  the relatable angle bank. Reinforces that investor/ROI framing is the niche and joy/relatability is the
  mass angle.
- **An authentic EMOTIONAL / real-talk close is a proven winner — refines the "end on a question or hot
  take" close rule below.** The reference winners almost never use comment-bait or a spicy take; they
  close on warmth or mild vulnerability: "Sei nicht zu hart zu dir", "slow down, genieß es, brenn nicht
  aus", a personal lost-cards anecdote ("einfach traurig – nimm nen Zip"), "collect what you like & you
  never go wrong". So a genuine emotional/relatable line is a legitimate alternative to a manufactured
  "?". Keep the save/share-trigger guidance and the "no second shop plug / no flat fact-dump" ban — just
  don't bolt a fake question onto a deck where a human closing line lands harder.
- **Personal-advice decks are conversational, not rigid title+bullets.** The newest winners use one
  spoken lead line + 1–2 short support sentences per slide, not a bold TITLE + 3 dash-bullets. The
  "title + 2–4 bullets / sparse one-liners look unfinished" rule (`content-formats.md`) still holds for
  ranked/structured decks, but for personal "wish I knew" advice a conversational lead + light support
  reads MORE native than a bullet template. **Match text density to format.**
- **"Part X" serialization is a proven relatability device** — "Partie 1/2", "Part 1/2", even a joke
  "(Part. 4326)". Framing a deck as one entry in an ongoing personal series signals authenticity.
- **Card-showcase "favorites" reveals work with superlative groupings.** DE ss6 split 8 cards into pairs
  — "die coolsten / süßesten / chilligsten / gefährlichsten zwei" — one card per slide, near-zero copy,
  the card ART is the content. Clean structure for a favorites/leak-reaction deck. BUT it shows the
  hook↔payoff trap even in a "winner": it promised "leaked 30-Jahre-Set" cards then included a Charizard
  and a Pikachu&Zekrom that aren't from that set. **Keep every showcase card actually on-topic.**
- **IvoryShard's real, honest value props (lean on these for natural mentions):** restock/drop
  notifications · **checkout limits + weekly drops → "so bekommt jeder sein Stück / so everyone gets a
  piece"** · personal support / community feel · singles AND sealed · free EU shipping. Real store
  taglines seen on screen: **"CHASE THE SHARD"** (older: "CHASE THE DREAM"). These are the threads the
  winning organic mentions actually pull on — never price/"fair price"/scarcity (already banned below).
- **CONFIRMED BURNED (do not rebuild):** the "5 things in 10 years" listicle and the "I rate the shops
  X/10" countdown are cross-posted in both markets (FR↔DE) and stay study-only.
- **Emojis — RESOLVED [user decision 2026-06-08]: allowed, used the way the winners use them.** The two
  newest winners (DE ss8 `💜✨🃏🙏`, DE ss9 `💚⚠️🧡🥲`) use one tasteful emoji accent per line; the user
  confirmed "if winners use emojis you can use them in the same way." The old hard emoji ban is lifted —
  see the symbol-ban rule below for the exact carve-out (one tasteful accent per line; structural symbols
  — em dash, `=`, `+`, `:`, →, <> — stay banned).

## Hooks (slide 1) — curiosity, never "explainer intro"
- **Slide 1 must create curiosity or stakes, not announce a lesson.** "Explainer-intro" phrasing —
  "Ich erklär's dir in 30 Sekunden", "I'll explain it in 30s", "here's everything you need to know" —
  sounds like a YouTube intro, frames the viewer as about to be lectured, and kills swipe-through /
  watch-through rate. Open a loop instead (intrigue, a "are you behind?" nudge, a bold claim).
  - ✅ DE: "Warum gerade alle über Mega-Entwicklung reden 👀"
  - ✅ DE: "Mega-Entwicklung erklärt — falls du noch nicht mitkommst"
  - ❌ DE: "Ich erklär's dir in 30 Sekunden" (YouTube-intro framing)
- **Keep the hook short — one punchy line, plus at most one short subtitle.** A 3–4-line hook is too
  much text for the ~3-second mobile swipe decision; readers bounce before they parse it. Fewer words,
  more punch — the shorter line usually out-hooks the longer one.
  - ✅ FR: "Ce scellé peut être fake 👀" (4 words, lands instantly)
  - ❌ FR: "Avant d'acheter un display, regarde ÇA 👀 / Un scellé peut être resealed — voilà comment le repérer" (4 lines)
- **Phrase the hook as a line a real person would SAY out loud — a natural spoken sentence or question,
  not a compressed noun-stack.** A telegraphic fragment reads as ad-copy shorthand; the same idea as a
  spoken sentence flows like a person talking and stops the scroll harder. This is about register/flow,
  NOT length — both can be short. (Pairs with "keep the hook short": short AND conversational, not
  short-and-compressed.)
  - ✅ FR (Chloé): "T'as 50 balles à mettre dans du scellé ?" (spoken, natural)
  - ❌ FR: "50 balles de scellé" (compressed noun-stack, reads as a label)
  - ✅ DE (Lea/Mila): write the hook as a spoken line too — localize fresh, never translate the FR.
- **Warning / negative / comparison hooks beat positive & tutorial ones.** A "how to do X right" title
  reads as a dry tutorial and doesn't stop the scroll; a **warning** ("the mistake almost everyone
  makes"), a **curiosity gap**, a **comparison** ("others vs me"), or a personal **"wish I knew"**
  regret all pull harder. Negative framing reliably out-performs positive.
  - ✅ DE: "Diesen Fehler machen fast alle Sammler 👀" · "Andere Sammler vs ich 😅" · "5 Dinge die ich gern früher gewusst hätte"
  - ❌ DE: "So lagerst du RICHTIG" (tutorial vibe — no scroll-stop)
- **Make the curiosity gap EXPLICIT — promise an unexpected reveal, don't just imply one.** A hook
  that *hints* at a surprise ("ehrliche Liste") pulls harder when it spells out that something will
  defy expectations, giving a concrete reason to swipe through. An honesty/authenticity subtitle is
  good, but it isn't a curiosity gap on its own.
  - ✅ DE (Lea/Mila): "Ehrliche Hold-Liste — eins davon werdet ihr nicht erwarten" (explicit reveal)
  - ✅ FR (Chloé): "Ma vraie liste de holds — et y'en a un que vous n'attendez pas"
  - ➖ weaker: "Ehrliche Hold-Liste, kein Hype" (authentic, but no explicit curiosity gap)
  - **Naming the set/topic in the hook is fine — but it can't REPLACE the loop.** A "favorite card"
    or preference hook that just names the set reads flat and descriptive; it needs a one-line
    **subverted expectation** to create tension (the obvious pick is wrong, the chase isn't the answer).
    Keep it to ONE short line. (Same lesson as the comparison rule below, generalized to any format.)
    - ✅ FR (Chloé): "Ma carte préf de Chaos Ascendant, et c'est pas la chase" (set named + twist = the loop)
    - ✅ DE (Lea/Mila): "Meine Lieblingskarte aus Wachsendes Chaos, und es ist nicht die Chase"
    - ❌ FR: "Mes cartes préf de Chaos Ascendant, et une que personne calcule" (two lines, flat, no twist/tension)
- **A hook must carry real stakes — never a neutral preference question, and never undersell its own
  value.** "Which do you prefer? / tu prends quoi ?" is flat (no tension); "I'll quickly compare them
  / je te fais le comparatif vite fait" deflates the payoff before you deliver it. Open a loss /
  warning / surprise loop instead. **In a comparison ("versus") format the set name can wait for
  slide 2** — don't spend the hook naming the topic, spend it opening a loop.
  - ✅ FR (Chloé): "La version JP a même pas toutes les cartes de la FR 👀" (stake + surprise, set name deferred)
  - ✅ DE (Lea/Mila): "Die JP-Version hat nicht mal alle Karten der DE 👀"
  - ❌ FR: "Version FR ou JP de [set], tu prends quoi ? Je te fais le comparatif vite fait" (names topic, neutral, undersells)
- **When a deck is a clean list of exactly N distinct points/steps, lead with the NUMBER and number
  the slides. [Feedback 2026-06-08; universal.]** A concrete count ("3 trucs…", "3 Dinge…") beats a
  vague line: it sets a clear expectation and makes people swipe to the end to collect all N. So when
  the body genuinely IS a tidy list of three (or any exact count), put the number in the hook AND label
  the slides 1/2/3. **Guardrail — only when the count is truly that exact and every slide delivers ONE
  point.** Don't pad to reach a round number, and don't force a number onto a deck that isn't a clean
  list — if it's not a tidy count, use a plain curiosity / warning hook instead.
  - ✅ FR (Chloé): "3 trucs qu'on a jamais vus en 30 ans de Pokémon" → slides 1/2/3, one "first" each
  - ✅ DE (Lea/Mila): "3 Dinge, die eine Fake-Karte sofort verraten" → slides 1/2/3 (Druck, Preis, Lichttest)
  - ❌ a soft "On a jamais vu ça…" when the deck is in fact exactly three firsts (undersells the count)
  - ❌ forcing "5 Dinge" when you only have 3 real points (padding) — use the honest number, or no number
- **Slide 2 must stand on its own as a second cover.** Instagram re-serves slide 2 as the cover to
  people who didn't engage with slide 1, so it can't assume slide 1 was seen — give it its own
  curiosity / stakes, not a mid-thought continuation. (Platform-algorithm fact → universal.)
  - ✅ slide 2 works cold: opens its own loop or states the stake plainly.
  - ❌ slide 2 that only makes sense if you already read slide 1.

## Product naming
- **Never invent language-variant product names** like "Bundle FR" / "FR Bundle" / "le Bundle FR".
  A French-language booster bundle is the *same* product as the international one, just with FR cards.
- Name products as **set name + product type**: "Booster Bundle Chaos Ascendant", "ETB", "display".
- Signal the language with a **flag emoji** (🇫🇷 / 🇩🇪), which does all the work.
  - ✅ "Le Booster Bundle Chaos Ascendant est dispo sur IvoryShard 🇫🇷"
  - ❌ "Le Bundle FR est dispo sur IvoryShard"
- **(Recurring miss — applies to EVERY product reference, every persona.)** "Bundle FR" wrongly
  implies a different product; the bundle is identical, only the cards inside are FR. Say "le booster
  bundle Chaos Ascendant" and let the flag / context carry the language signal.
- **Use the OFFICIAL localized set name for the target market — never the English name alone.** On a
  DE/FR post, the English-only set name reads as someone who doesn't follow the local releases.
  **Each persona uses HER market's name — DE name for Lea + Mila, FR name for Chloé — so verify the
  localized name at run time PER LANGUAGE** (pokemon.com DE/FR, PokéWiki/Bisafans); never put the
  German name on a French post or vice versa. If the English name is widely known, "Localized
  (English)" is a fine bridge.
  - ✅ DE (Lea/Mila): "Mega-Entwicklung – Dunkelnacht" (or "Dunkelnacht", or "Dunkelnacht (Pitch Black)")
  - ❌ DE: "Pitch Black" alone on a German post
  - ⚠️ FR (Chloé): "Dunkelnacht" is the GERMAN name — do NOT use it on a French post; look up the official FR name for Pitch Black at run time.
  - Note (DE orthography, Lea/Mila only): the series prefix uses an **en dash** — "Mega-Entwicklung – Dunkelnacht", not a hyphen.

## IvoryShard placement & the closing slide
- Mention IvoryShard **exactly once**, contextually, right next to the "which product to buy"
  recommendation (mid-deck, ~slide 4). One natural touch, never the star. **Never on slide 1, slide 2,
  or the last slide** (slides 1–2 are covers; the close is for engagement), and write it in **first
  person** — a collector saying where *she* buys, not a brand announcement.
- **Frame the shop as the answer to "where do I get this?", as a collector's tip — never as a
  marketing CTA.** "Benachrichtigung an, dann bist du dabei" / "sign up for notifications" reads as a
  brand account selling, not a person sharing where they buy. Make the shop the *answer to a buying
  question*, not a *sign-up funnel*. **Frame it as "where I buy" — NOT a hard "available right now /
  in stock" claim.** A real-time stock assertion ages badly (stock drifts) and reads salesy; say where
  *you* order, not that it's in stock this second.
  - ✅ FR (Chloé): "Moi je commande à la source, scellé, en €" (where I buy)
  - ❌ FR: "Dispo maintenant sur IvoryShard, fonce" (hard live-stock claim)
  - ✅ DE: "Fairste Variante: bei IvoryShard — Stücklimits, kein Scalping"
  - ❌ DE: "Benachrichtigung an, dann bist du dabei"
- **The shop beat must not CONTRADICT an earlier slide.** If a slide says the set is easy to find
  locally ("tu la trouves près de chez toi" / "gibt's überall"), an online "buy it at IvoryShard"
  plug on top of that makes no sense and reads as a forced ad. Reconcile the two: if the angle is
  convenience/safety, frame the shop on a defensible point (below) — not on availability.
- **No self-flattering or unverifiable shop claims — anchor on a defensible fact instead.** "le
  meilleur site" / "best site" / "no markup" / "garanti authentique" are unprovable hype. Tie the
  mention to something concrete and true: buying **direct from the source** (vs resellers),
  **scellé / sealed**, **prices in €**, stock limits / no scalping.
  - ✅ FR: "Je préfère commander à la source, scellé, en € — pas chez des revendeurs"
  - ❌ FR: "le meilleur site, aucune marge" (unverifiable self-flattery)
- **Land the mention on a CONCRETE-PRODUCT slide, as the answer to "where do I get THIS exact
  product" — never on a generic category slide.** Tied to a specific box the viewer already wants, the
  brand drop reads like a collector sharing a tip; dropped on a generic "limited products" slide it
  reads like an inserted ad. (Pairs with the set-thesis → products structure above: the mention
  belongs on the products slide.)
- **Research community hype PER PRODUCT before naming one — don't just trust the "Coming Soon" tag.**
  Two products can both be Coming Soon yet have wildly different traction. Pick the *specific* product
  with the strongest current community hype so the mention reads as real collector knowledge, not a
  generic shop plug. If NO Coming Soon product is hyped enough to mention organically, default to a
  generic IvoryShard reference or skip the mention for that post. **Verify hype + availability at run
  time, per market** (a product hot in DE may not be in FR).
  - ✅ (run-time example) high-hype: Mega Lucario ex / Mega Gardevoir ex Premium Poster Collections
    (~$100+ MSRP, 10 packs + foil promo + big poster, widely treated as priority holds)
  - ❌ low-hype filler: a Charmeleon 3-pack blister that just happens to be Coming Soon
- **Name IvoryShard as ONE of several trusted shops — name a real competitor alongside it; never the
  only one.** A single-shop rec reads as a hidden ad ("only trust this shop" sounds suspicious). Real
  collectors name a couple of reputable shops and contrast them with where NOT to buy. So name a
  genuinely reputable peer (e.g. **Fuji Store**) next to IvoryShard, and contrast against sketchy
  sources (Vinted, random marketplaces). This makes "recommend IvoryShard, not as the only option"
  (CLAUDE.md / personas) concrete — naming a peer is *more* credible than a solo plug, not less.
  **Verify any named competitor is real, reputable IN THE PERSONA'S MARKET (DE for Lea/Mila, FR for
  Chloé), and correctly spelled at run time** before it hits a slide — a shop known in one country may
  be unknown in the other, so don't assume Fuji Store (or any peer) serves both markets.
  **IvoryShard is the CONSTANT; the peer shop must ROTATE day to day. [Standing rule 2026-06-07.]**
  Don't pair IvoryShard with the same second shop (e.g. Fuji Store) every time — alternate across
  different real, reputable shops in that market from one day to the next. An always-same pairing
  starts to read like an arrangement rather than a collector's honest shortlist.
  - ✅ FR: "Je commande sur des shops sérieux comme Fuji Store ou IvoryShard — jamais sur Vinted ou des marketplaces louches"
  - ❌ FR: "Le booster bundle Chaos Ascendant est dispo sur IvoryShard — vrai scellé, garanti authentique" (solo promo)
- **The shop mention is a one-line aside, never its own promo slide.** A reader going value→value→
  value→AD→value bounces at the ad. Fold the shop into a value beat (where you buy safely); don't
  give it a dedicated slide.
- **Anti-repetition across days — drop IvoryShard ENTIRELY after the same product/market repeats.
  [Standing rule 2026-06-07; tracked PER MARKET, FR and DE separately.]** If three scripts in a row
  cover the SAME product on the SAME market and that market's store offering hasn't changed, the NEXT
  TWO days on that market must be pure-value slideshows with **no IvoryShard mention at all** — built
  purely to grow the follower base, regardless of what's in the shop. Bring the brand back only once
  the product or stock for that market actually moves. FR (Chloé) and DE (Lea/Mila) each track their
  own streak independently — a repeat on FR doesn't force a value-only day on DE, and vice versa.
- **Heading must deliver what it promises (heading↔payload match).** A heading is a promise; the
  bullets must pay it off. A heading that promises entry/where-to-start advice must give entry advice,
  not just drop a shop name.
  - ✅ Heading "Wo du das Set am besten bekommst" → bullets about *where/how to buy fairly*.
  - ❌ Heading "Wo du am besten einsteigst" (promises entry advice) → delivers only a shop name.
- **Close however the winning examples close — an emotional/real-talk line is the proven default; an
  engagement question or hot take is optional, not mandatory. [Winners outrank the older 2026-06-07
  engagement-close feedback; see Precedence in Scope.]** Across the reference winners the dominant close
  is warmth or mild vulnerability ("Sei nicht zu hart zu dir", "slow down, brenn nicht aus", a personal
  lost-cards anecdote), the last list point simply landing, or a soft "follow for daily content" — NOT
  comment-bait. So: do NOT bolt a forced question, spicy take, or save/share trigger onto a deck where a
  human closing line lands harder. Use an engagement question/hot take only when it's genuinely natural.
  The two hard bans still hold (they don't conflict with any winner): **never close on a shop plug, and
  never end on a flat list of facts.**
  - The older guidance below is kept for when an engagement close IS the natural choice — treat it as a
    tool, not a requirement: an **engagement hook** can drive comments — a question or a
    **spicy hot take / opinion** (spicy opinions drive ~3–4× more comments than a neutral close).
  **This includes SUMMARY / recap slides:** a recap that just re-lists the picks and stops closes the
  narrative without inviting comments — always tack an open-ended question (or hot take) onto it.
  Open-ended questions on the close slide drive ~3–4× more comments than a neutral list.
  **Also give a reason to SAVE or SHARE — carousels are ranked mostly on saves & shares, a different
  lever than comments.** A "save this for the drop" or a share prompt feeds the algorithm even when
  nobody comments. The strongest close slides do both: an engagement question *and* a save/share trigger.
  - ✅ Save trigger (FR): "Garde ce post pour la sortie 📌" · Share (FR): "Tag un pote qui hésite encore 👀"
  - ✅ Save trigger (DE): "Speicher dir das für den Release 📌"
  - ✅ Question: "Et toi, tu vises quelle carte en premier ? Dis-le moi en commentaire 👇"
  - ✅ Recap-close question (DE): "Was sind eure Hold-Sets? 👀👇"
  - ✅ Hot take (DE): "Hot Take: Dunkelnacht wird das überschätzteste Set des Jahres. Wer ist dabei? 👇"
  - ❌ Final slide: a repeat "dispo sur IvoryShard" CTA, or a recap/list slide that just restates the picks and stops.
- (Refines the older slide-placement rule: 5 slides → slide 3; >5 slides → slide 4+. The change is
  that the *final-slide CTA must not repeat the store*.)

## Structure — organize by set, one consistent axis
- **Pick ONE axis for a numbered / ranked list and stick to it — never mix sets with product types.**
  Every item in a "Top 3" must be comparable. A list that runs "1. [Set A] · 2. [Set B] · 3. [a
  product type]" breaks its own logic, because product types (ETBs, Premium Poster Collections,
  blisters) exist *within* a set, not parallel to one. All entries must be the same kind of thing.
  - ❌ DE (Lea): "1. Erhabene Helden · 2. Wachsendes Chaos · 3. Limitierte PC-ETBs" (two sets, then a product type)
  - ✅ keep every entry the same kind — all sets, or all product types.
- **Default axis = the SET.** Collectors think set-first — their first question is "welcher Set /
  quel set", not "welches Format". Build decks set-by-set and, *within* each set's slide, name which
  product types in that set are the hold-worthy ones. (Universal — DE and FR collectors both think
  set-first; this is not a German-only habit.)
- **Two consecutive slides on one set works well: set thesis → specific products.** Slide A states the
  set-level thesis (why this set is a top hold + which product *category* is the goldmine); slide B
  names the concrete products inside it. This also earns a natural IvoryShard beat on slide B — the
  brand drop lands as the answer to "where do I get *these exact* boxes" (see IvoryShard section),
  not as an ad inserted on a generic category slide.
  - ✅ DE (Lea/Mila): A — "Erhabene Helden — Top Hold 🥇 / 295 Karten = größtes Set ever / Premium
    Poster Collections sind die Goldgruben" → B — "Konkret: Mega Lucario & Mega Gardevoir / je 10
    Booster + Foil Promo + Poster / bei IvoryShard bald wieder 👀"
  - ✅ FR (Chloé): same shape — thèse du set, puis les produits concrets (localize fresh in French).

## Slide order & flow
- **Deck length: default 5–6 total, but match the winning length FOR THE FORMAT — the winners outrank
  the flat cap. [Reconciled 2026-06-08; supersedes the flat 5–6 hard cap from 2026-06-06 per Precedence
  in Scope.]** The 2026-06-06 feedback set a hard 5–6 total ceiling; the example winners show length is
  format-dependent, so follow the format's proven length:
  - **Advice / "N things" / value / comparison decks → stay tight: 5–6 total (aim 5).** This is what the
    NEWEST winners do (DE ss8/ss9, 2026-06-08, are 4 total: hook + 3) — tighter than the cap is great.
    In the JSON: **3–5 `slides[]` entries** + the `cta` as the last slide. Padding a value deck loses people.
  - **Card-showcase / favorites-reveal / leak-reaction decks → may run longer (up to ~8–9 total).** One
    card per slide IS the format (FR ss4 = 7, DE ss6 = 9); trimming would gut it. Each extra slide must
    earn its place with a distinct card/beat — never pad with filler.
  - **This overrides the old "≥5 content slides / no upper limit" rule in `daily_content.md` and the
    flat `lint-content` cap** — the lint ceiling should allow the longer showcase format, not block it.
  - ✅ advice: 4–6 total (hook + 3–4 body + CTA). ✅ showcase: hook + 6–8 card slides.
  - ❌ a value/advice deck padded to 8 total — trim to the strongest beats.
  - ❌ gutting a favorites showcase down to 5 just to hit the old cap — keep the cards.
- **The hook makes a PROMISE; every slide after it delivers a concrete piece of THAT promise, in order
  — never pivot to a different thread.** If the hook promises a plan ("where I'd put €50 in scellé"),
  the body IS that plan: each slide is one concrete step. The classic break: the hook promises a plan
  but slide 2 opens with a "what NOT to do" warning, so the viewer who swiped for the WHERE gets a
  don't-do instead and the actual pick lands too late — the hook's promise is broken.
  - **A "trap to avoid" beat is fine as ONE step inside the plan (e.g. slide 4, "le piège à éviter"),
    never as its own early beat that interrupts it.** Demote the warning to a single line on a plan slide.
  - **Match the hook to the actual theme.** To make the mistake the theme instead, the HOOK must be
    about the mistake ("La plupart claquent leurs 50 balles le jour de la sortie. Erreur.") and the
    whole post is warning+fix. Never promise a plan and then open with a warning — pick one thread, and
    let the hook announce the one you chose.
  - ✅ FR (Chloé) plan thread: hook "T'as 50 balles à mettre dans du scellé ?" → slide 2 the pick → slide 3 where to buy → slide 4 the trap (one line) → slide 5 protect it → slide 6 open or keep.
  - ✅ DE (Lea/Mila): same shape — hook promises a plan, every slide is one step of it; the "Fehler" is step 4, not slide 2.
  - ❌ any persona: hook promises a plan, slide 2 pivots to a standalone day-one warning, the pick only shows on slide 3.
  - (Deck-level cousin of the slide-level "heading must deliver what it promises": there it's one slide's heading↔bullets, here it's the hook↔the whole body.)
- **If the hook sets a STAKE, the verdict / close must PAY IT OFF — never neutralize it. [FR feedback
  2026-06-07; universal.]** A hook that says one of two choices "tu vas regretter" / "you'll regret it"
  promises a real downside; a closing verdict of "both valid, your call" cancels that promise and the
  deck reads as bait-and-switch. The close must NAME the actual regret — which choice loses, and why.
  If you're not willing to pick a side at the end, don't claim a regret in the hook. (Pairs with "Match
  the hook to the actual theme" — same hook↔payoff discipline, applied to the final verdict slide.)
  - ✅ FR (Chloé): hook "l'un des deux, tu vas le regretter" → verdict names it ("le garder scellé là, c'est ça que tu regretteras — voilà pourquoi")
  - ❌ FR: hook "tu vas regretter" → verdict "les deux se valent, à toi de voir" (neutralizes the stake)
  - ✅ DE (Lea/Mila): a "du wirst es bereuen" hook must end on the named regret, not on "beides ok".
- **The CTA / close must stay CONSISTENT with what the BODY taught — never introduce a competing claim
  on the last slide. [DE feedback 2026-06-08; universal.]** If the body teaches "the CARD gives a fake
  away" (print, blue tone, light test), a close that says "actually it's the PRICE that gives it away"
  contradicts the whole deck and undercuts what you just taught. Fix it by reframing the close as a
  RANKING WITHIN the body's own points — rank which of the things you just taught matters most — not as
  a new thesis. (Cousin of the hook↔verdict rule above and the deck-level hook↔body rule: same
  consistency discipline, applied to the closing slide vs the body.)
  - ✅ DE (Lea/Mila): body = Druck, Preis, Lichttest → close "von den dreien verrät der Preis am meisten" (ranks within the three)
  - ❌ DE: body all about reading the card → CTA "Fakes verraten sich am Preis, nicht an der Karte" (new claim, contradicts the body)
  - ✅ FR (Chloé): close ranks the checks you just taught — never adds a different tell.
- **An open-vs-keep recommendation must be a clean BINARY that matches the quantity on screen. [FR
  feedback 2026-06-07; universal.]** Against a single item, "open one and keep the rest" is ambiguous —
  it implies several when there's only one. Make it a true either/or: open it and enjoy, OR keep it
  sealed.
  - ✅ FR (Chloé): "Soit tu l'ouvres et tu kiffes, soit tu le gardes scellé"
  - ❌ FR: "Ouvre-en un et garde le reste" (ambiguous against a single bundle)
  - ✅ DE (Lea/Mila): same clean binary — open it or keep it sealed (localize fresh).
- **Sequence teaching/detection slides as a build, each step earning the next — don't intersperse
  redundant points.** For a "how to spot X" deck: **physical signs → behavioral signs → market signs
  → action plan → engagement close.** Group similar checks together; a market/behavior point dropped
  mid-way through the physical checks feels repetitive and kills the build.
  - ✅ Anti-scam order: plastique / scotch / poids (physical) → "prix trop beau" (market) → "le move le plus safe" (action) → engagement Q.
  - ❌ poids → "prix trop beau" → back to another physical check (no build, reads as repetitive).
- **Each interior slide should open a small question the next one answers (micro-cliffhanger).** Beyond
  the slide-1 hook, every slide should leave a thread the next slide picks up, so the natural move is
  to keep swiping. End a slide on the *setup*, pay it off on the next.
  - ✅ FR (Chloé): "La FR a 2 cartes que la JP n'a pas…" → next slide names them.
  - ✅ DE (Lea/Mila): "Eine davon ist fast unauffindbar 👀" → next slide reveals which.
  - ❌ self-contained slides that each fully close their point (no reason to swipe on).
- **Every slide does ONE distinct job — never make the same point on two slides, and state a recurring
  takeaway only ONCE.** A deck where several mid-slides all circle the same conclusion (e.g. "don't buy
  the single day one / wait for market value") wastes slides on one idea and stalls the build. Give each
  slide a unique role, and keep a repeated conclusion (like "wait 1-2 weeks for the real price") to a
  SINGLE slide — the action / penultimate one — not sprinkled across the deck.
  - ✅ DE (Lea/Mila): slide 3 = warum der Release-Preis fake ist (Hype, Scalper) · slide 4 = Chase-Ranking · slide 6 = der konkrete Move, mit "1-2 Wochen warten" NUR hier
  - ❌ DE: Slides 3, 4 und 6 sagen alle dasselbe ("kauf das Single nicht am Day 1, warte auf den Marktwert")
  - ✅ FR (Chloé): chaque slide un rôle unique, et le "attends 1-2 semaines" une seule fois, sur la slide action
- **The action / penultimate slide gives a concrete action, not passive advice.** After teaching
  techniques, "au pire tu attends" / "just wait" is anticlimactic. End the value on a do-this
  takeaway; keep "the set is available everywhere" as light reassurance, not the headline.
  - ✅ FR: "Le move safe : achète chez un vendeur pro avec un historique solide"
  - ❌ FR: "Au pire tu attends" (passive, deflating after 5 techniques)

## Make every slide save-worthy (depth, not generic advice)
- **"Value" / a "value carousel" = USEFUL, fun, different, UNIQUE info — NOT prices, and NOT basic
  info. [User clarification, 2026-06-05.]** When the user asks for "value" content they mean real
  substance the viewer doesn't already know: a fresh, fun, unique take or insight — never price tags,
  never obvious beginner facts. **"Value" ≠ "prices":** prices are welcome when the TOPIC itself is
  worth/price (see Prices section), but a value carousel is about uniqueness and usefulness, not numbers.
  - ✅ a non-obvious insight, a surprising reveal, an angle nobody else is posting.
  - ❌ basic/obvious info ("sleeve your cards"), or a deck that's really just a list of prices.
- **A "tip" a collector already knows is filler, not value — ban self-evident truisms dressed up as
  advice. [FR feedback 2026-06-07; universal.]** Lines like "opening is a gamble", "pulling the chase
  from a bundle is rare", "keeping it sealed keeps your options open" state the obvious, give no reason
  to stop or save, and waste a slide. A tip earns its slide ONLY if it tells the collector something
  they don't already know. Default instead to something they'd actually pause on: a specific market
  price, a leak, a fresh release, a lore detail, a timing pattern, a contrarian take, or an unexpected
  comparison. A pure numbers slide (real pull rate, price trend) is fine once in a while, but
  ORIGINALITY is the goal — not obvious advice in a tip's clothing. (Sharpens the value=unique rule
  above: the trap here is the *experienced-collector* truism, not just the beginner fact.)
  - ❌ FR (Chloé): "Ouvrir c'est un pari" · "Sortir la chase d'un bundle c'est rare" · "Le garder scellé garde tes options ouvertes"
  - ✅ FR (Chloé): a concrete cote, a leak, a release date, a lore beat, a timing pattern, or a contrarian take instead.
  - ✅ DE (Lea/Mila): same — no obvious truisms; lead with a price, leak, lore, pattern or hot take (localize fresh, never translate the FR).
- Give the **"why"** behind advice — the mechanism, not the obvious rule.
  - ✅ "Loin du soleil : les UV ternissent" / "Au sec : l'humidité gondole & moisit"
  - ❌ "Loin du soleil et de l'humidité"
- Give cards **emotional/lore context** so their significance lands.
  - ✅ AZ's SIR: "Réuni à sa Floette après des millénaires 🥲"
- Verify any **superlative or comparative claim** ("only Trainer SIR in the set", "the cheapest entry
  point", "biggest set ever") before putting it on a slide; if you can't confirm it 1000%, **soften to
  a defensible phrasing ("one of the…")** rather than dropping the point. **Price/entry superlatives are
  a recurring trap** — a smaller product almost always undercuts the one you name (a 3-pack blister is
  cheaper than a 6-pack bundle), so "the cheapest" is usually false.
  - ✅ FR (Chloé): "un des points d'entrée les moins chers en scellé"
  - ❌ FR: "le point d'entrée le moins cher en scellé" (a 3-pack blister is cheaper — overclaimed)

## Dates, names & set facts — get them exact
- **Never approximate a release date when an exact official one exists.** "Im Oktober" / "around
  October" on a slide is a credibility miss if the real date is published. Pull the **exact date from
  the official source (pokemon.com / press.pokemon.com)** and put it on the slide.
  - ✅ DE: "Erscheint am 16.09.2026" — ❌ "Im Oktober" (exact date over a vague month; localize the phrasing per language)
- **Verify EVERY factual claim before it ships — not just dates.** Set names, **chase cards**, **card
  counts**, release dates, AND **current stock / availability**. WebSearch/WebFetch are free; an
  unverified card count or "in stock" claim is as damaging as a wrong date.
- **A localized (Western) set is NOT the same as its Japanese base set — different NAME *and* often a
  different CARD LIST.** Western/international sets carry their own name (never the JP name) and
  routinely merge multiple JP sets and/or add cards the JP base never had. So (a) never imply the JP
  version shares the Western set's name, and (b) in a JP-vs-Western post the *interesting* angle is the
  card **delta** — what the Western set added — not "they're identical." Verify the JP base-set name,
  the shared cards, and the added cards at run time.
- **Confirmed reference facts (verified 2026-06-03 via pokemon.com / press.pokemon.com — re-verify at
  run time, details can shift):**
  - *Universal facts (all personas — dates/identity are language-neutral):*
    - **30th anniversary set** = official name **"Pokémon TCG: 30th Celebration"**, global release
      **16 September 2026** (NOT October).
    - **First-ever simultaneous worldwide** Pokémon TCG release (official: *"the first to have a
      simultaneous global release"*) — a big hype-runway framing is accurate.
    - **30th Celebration set details (verified 2026-06-08 via pokemon.com / VGC / PokeBeach / Beebom)
      — all strong "never seen before" slide material:** every booster has **6 cards, not 5**; **EVERY
      card in the set is foil, including Basic Energy**; each pack includes a **guaranteed Pikachu —
      1 of 30 unique holo Pikachu, each by a different illustrator**; debuts a brand-new **"Futuristic
      Rare"** rarity, with **Mew and Mewtwo** the first two (art by Yoshirotten); includes **30 classic
      reprints from across TCG history in special foiling**; ~150 cards before secret rares. (Names
      localize per market — FR Chloé / DE Lea+Mila; figures can shift, re-verify at run time.)
    - The **"Pitch Black"** set releases **17 July 2026** — a *different* set from 30th Celebration;
      don't conflate the two dates.
    - **Set ME04 = the Western localization of Japan's "Ninja Spinner" (M4)** (verified 2026-06-04 via
      Bulbapedia / PokeBeach / pokemon.com FR). JP "Ninja Spinner" released **13 Mar 2026**; the
      Western set (**122 cards**) released **22 May 2026**. **Card delta (the post's best angle):** most
      of the base set is **shared**, incl. the headliner **Mega Greninja ex** (FR Méga-Amphinobi-ex);
      the Western printing **ADDS** cards the JP base lacked — **Mega Gallade ex** (FR Méga-Gallame-ex)
      and a **regular Krookodile ex** (FR Crocorible ex — *NOT* a Mega), plus a Trainer. ❌ Never say
      "only the headliner is shared" (false — most of the set is shared) and ❌ never call Crocorible ex
      a "Méga".
  - *Localized names — use HER market's name only, never cross FR↔DE:*
    - **DE (Lea/Mila):** "Pitch Black" = **"Dunkelnacht"** (full: "Mega-Entwicklung – Dunkelnacht").
    - **FR (Chloé):** use the official **French** name — verify at run time; do NOT use "Dunkelnacht"
      or German date phrasing ("Erscheint am…") on a French post.
    - **Set ME04 — same set, three market names (never cross them):** EN **"Chaos Rising"**, FR
      **"Chaos Ascendant"** (Chloé), DE **"Wachsendes Chaos"** (Lea/Mila — verify at run time). The
      Japanese set is **"Ninja Spinner"** — never the FR/EN/DE name. Card names are localized too
      (FR Méga-Amphinobi-ex; DE/EN use their own) — use HER market's card names, verified per language.
    - **AZ's Tranquility (in Chaos Ascendant) — confirmed, no "correction" needed** (verified
      2026-06-05 via Bulbapedia/Serebii): a **Supporter SIR**; the SIR art shows **AZ reunited with his
      Eternal Flower Floette** (lore accurate — pairs with the "emotional/lore context" rule). **On FR
      posts the character is spelled "A-Z" (with the hyphen) — that is the correct French spelling, do
      NOT change it to "AZ".** EN card name is "AZ's Tranquility"; look up the official **FR** card name
      at run time (don't hardcode/guess it).
- (Reinforces the superlative-verify rule above and the FACTUAL ACCURACY gate in `daily_content.md`:
  official set names/dates are slide-safe **only after you confirm them that day**.)

## Bullet consistency & pacing
- **Bullets are ONE tool, not a mandate — don't force every slide into "title + bullet list".
  [User note, 2026-06-05.]** A slide can be a single punchy line, a reveal, or a short story beat with
  NO bullets at all (the title / line carries it). Vary the structure across the deck so it feels
  natural and hand-made, not a templated bullet-grid. **This RELAXES the "every content slide needs
  title + 2-4 bullets" line in `daily_content.md`** — bullets are a default, not a requirement on every
  slide; the JSON allows 0 bullets, so use a title-only slide when it reads better. (Pairs with "don't
  mechanically fill a template".) The rules below still apply WHENEVER you do use bullets.
- **One short title per slide, and a HARD maximum of 3 bullets** (never more than 3). **Keep bullets
  uniform in length and structure across slides** so the whole deck reads at one steady pace. Slides
  drifting between 3-word fragments and full sentences makes the carousel feel uneven. Aim for the
  **same bullet count and similar rhythm** on every content slide (3 is the default *and* the ceiling;
  see `daily_content.md` for the 2–4 floor/ceiling).
- **Short punchy phrases, not full sentences.** Cut filler connectors — "und", "dazu", "passend zu",
  "außerdem" (DE) / "et", "ainsi que", "en plus" (FR). Each bullet = one idea, telegram-style.
  - ✅ DE bullets: "16.09.2026 — weltweit gleichzeitig" · "Erstes Set dieser Art" · "Riesiger Hype-Runway"
  - ❌ DE bullet: "Das Set erscheint im Oktober und passend zum Jubiläum gibt es dazu noch …"
- **Carousel slides are CLEAN SHORT SENTENCES — no structural symbols. Emojis ARE allowed, used the way
  the winning examples use them. [Symbol ban: 2026-06-05. Emoji carve-out: user decision 2026-06-08.]**
  On every slide (title AND bullets) ban these **structural symbols**: **em/en dashes (— –), `=`, `+`,
  `:`, arrows (→), angle brackets (<>)**. Write each line as a plain short sentence or phrase, one idea
  per line — never a "Label : value" spec-sheet structure, never decorative symbols joining ideas. **This
  OVERRIDES the older carve-outs in this file: the "a normal em dash in running text is fine" and "price
  tag like `La SIR : ~50-150€`" exceptions are REVOKED.** Prices stay welcome (see Prices section) — just
  phrase them as words, not with `:`/`=`/`~`.
  - **Emojis [user decision 2026-06-08]:** allowed, but only **the way the reference winners use them — at
    most ONE tasteful emoji accent per line**, sentence-final or as a single section accent (e.g. a hook
    ending in 👀 / 😅 / 💜 / 🥲, a warning line with ⚠️). Never use an emoji to JOIN or replace words, never
    stack multiple emojis on a line, never let an emoji do a symbol's structural job (no "→" via ➡️). When
    in doubt, fewer. The older ✅ examples' emoji usage is fine to follow in spirit; their structural
    symbols are not.
  - ✅ FR (Chloé): "Repère les vendeurs sérieux" · "La SIR tourne autour de 50 à 150€" · "Ce scellé peut être fake 👀"
  - ❌ FR (structural symbols): "Système d'évaluation : repérer les vendeurs sérieux" · "La SIR : ~50-150€"
  - ✅ DE (Lea/Mila): "Achte auf seriöse Verkäufer" · "295 Karten, das größte Set aller Zeiten" · "Sei nicht zu hart zu dir 🥲"
  - ❌ DE (structural symbols): "Bewertung → seriöse Verkäufer" · "295 Karten = größtes Set ever" · "10 Booster + Foil Promo + Poster"
  - ❌ emoji misuse: "Druck 👀 Preis 👀 Lichttest 👀" (stacked/repeated) · "seriöse Verkäufer ➡️ kaufen" (emoji as arrow)

## Proofread the native text
- **Typos on a slide kill credibility instantly — proofread every native (FR/DE) word before it
  ships.** A misspelling signals "not a native / not careful," exactly the opposite of the persona.
  - ❌ FR: "partou" → ✅ "partout"
- **Use ONE term per concept across the whole deck — don't alternate synonyms slide to slide.** If the
  hook uses one word for a thing, every later slide uses the SAME word; switching reads as careless and
  non-native. Pick the term on the first slide and repeat it. (WHICH term to prefer is the diction
  rule's job — FR: "scellé" over "sealed", see the native-diction section. This is the separate point
  that, once chosen, the term must stay consistent — applies to all personas, e.g. DE mustn't mix
  "sealed"/"versiegelt" either.)
  - ✅ FR (Chloé): "scellé" on the hook AND every later slide.
  - ❌ FR: "en sealed" on the hook, "en scellé" on slide 3 (two words for one thing).

## Prices on slides — concrete is wanted
- **Put concrete price reference points on slides.** The user explicitly prefers real tiers/ranges
  over vague phrasing. **This OVERRIDES** the "no specific prices on slides" rule in
  `workflows/daily_content.md` / memory `slide-facts-must-be-verified`.
  - ✅ "La SIR : ~50-150€ en single" / "La Méga-Hyper Rare : jusqu'à ~400€"
  - ❌ "Plusieurs centaines d'euros en single"
- Use **ranges with "~"** (acknowledges drift), prefer **Cardmarket EUR**, and **verify current
  values** before writing them. It's fine that figures on a saved post will age — include them anyway.

## Don't make risky market-trend claims
- Don't assert prices "drop fast" — sought-after Mega Evolution chase cards (e.g. Greninja SIR /
  Hyper Rare) often **hold or climb**. A wrong prediction hurts credibility.
  - ✅ "Le jour 1 c'est souvent gonflé — attends 1-2 semaines pour le vrai prix du marché"
  - ❌ "Le jour 1 c'est gonflé, ça redescend vite"
- **Don't blame "overproduction / Überproduktion" for flat ETB value — the 2024-2026 market was
  defined by SHORTAGES and scalping, not oversupply.** The "oversupply → value stays flat" logic is
  true in principle but misreads the current market and reads as out-of-touch (shortages, checkout
  limits and scalper culture are the actual story). To make the "standard ETBs don't appreciate"
  point, either cite a concrete OLDER example or drop the overproduction framing entirely.
  - ✅ DE (Lea/Mila): "alte SV-ETBs, die jahrelang in jedem Müller liegen" · "Standard-ETBs ohne Limitierung" (no "Überproduktion")
  - ❌ DE: "massig gedruckte Standard-ETBs — bei Überproduktion bleibt der Wert flat"
  - ⚠️ FR (Chloé): same principle, but "Müller" is a German retailer — swap in a French mass retailer
    and French phrasing; verify the chain name at run time. Never put the German wording on a FR post.

## Approved native diction (language-specific — do NOT cross languages)
- **DE (Lea/Mila): the English-German hybrid collector slang is native and approved — keep using it,
  don't "correct" it to pure German.** Words like **"rippen", "Hold-Liste", "Upside", "Standard-Ware"**
  read exactly how German TCG collectors talk online; the EN/DE mix is authentic, not a translation
  tell. (Binds to DE only — this is German vocabulary. For FR, Chloé uses her own French collector
  slang — see the FR list below; never carry these German words onto a French post.)
- **FR (Chloé): native French collector diction — and the Anglicisms to avoid.** Use the genuinely
  native terms; for borrowed ones, prefer the French equivalent (verified 2026-06-04 via Poképédia /
  Pokécardex / FR lexicons):
  - ✅ native FR: **"scellé"** (sealed), **"display"**, **"la cote"** (market value).
  - ⚠️ prefer the FR term over the Anglicism: **"carte à l'unité"** > "single"; **"Banger" / "carte
    chase"** > bare "chase"; **"rip / ripper"** is informal English-borrowed streamer slang ("rip and
    ship") — use sparingly, not as standard French.
  - **French Pokémon names on FR posts (never the English name):** **Amphinobi** (Greninja),
    **Gallame** (Gallade), **Crocorible** (Krookodile). Look up any other Pokémon's FR name at run time.
  - **Mega ex formatting:** prefer the official hyphenated prose form **"Méga-Amphinobi-ex"** (used by
    pokemon.com France); marketplaces also write **"Méga-Amphinobi ex"** with a space — both are seen,
    so don't claim the hyphenated form is the only correct one.
  - ⚠️ when pointing to where you buy, prefer **"là-bas"** or **"chez eux"** over a bare **"là"** — a
    standalone "là" is clunky ("je le prends en scellé chez eux", not "…en scellé là"). [FR feedback
    2026-06-07.]
- **Banned promo words (FR / Chloé) — never on a slide or in a caption:** **"code promo", "-10%", "le
  meilleur site", "achetez", "sponso".** They turn a collector post into an ad. (The *principle* — no
  overt promo / ad-speak — is universal; these literal words are FR-only. DE has its own to avoid:
  "kauf jetzt", "Rabattcode", "bestes Shop", "Werbung".)
