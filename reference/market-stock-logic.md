# Market & Stock Logic — the daily CTA decision rulebook

Decides, per market (FR = Chloé, DE = Lea), how hard to push the store on a given day, based on **live ivoryshard.com stock** + **restock signals**. The store is intended to be **sold out most of the time** — that's a feature (scarcity + social proof), not a failure.

## Step A — read the store (sealed-only)
1. **Restock signals (do FIRST) — banner ≫ coming soon:**
   - **Announcement bar under the navbar** = the BIG signal. A real drop/restock banner is the only thing that justifies stronger, more direct traffic content.
   - **"Coming soon" product status** = a MILD signal only. It means a restock is likely incoming, but it is NOT hype-worthy on its own and must never be framed as insider knowledge ("it's coming back at my shop" = banned). At most it slightly raises how prominent the lowkey IvoryShard tip is.
   - **Ignore the hero-section carousel** (decorative).
2. **In-stock classification:** every product title is English with a **parenthetical language suffix**. Map by suffix:
   - `(French)` → French market
   - `(German)` → German market
   - `(English)` → **both** markets
   - `(Japanese)` / `(Chinese)` / other → judgment (see matrix)
   - Note: `products.json` is locked → read collection pages + `/sitemap_products_1.xml`.

## Step B — CTA intensity definitions (all value-first, all honest)
Intensity changes **how prominent the lowkey IvoryShard tip is**, NOT urgency/scarcity. Every level is value-first; IvoryShard is one named tip, never the star, and **only appears where it fits the format intrinsically** (see `brand-personas.md` + `content-formats.md` → "Natural traffic vehicles"). If it can't fit naturally, omit it.
- **Soft:** pure value/persona/community content. IvoryShard mention optional; if used, just "the shop I trust" / "my restock alerts are there" as a side tip. (Use when nothing relevant is in stock, or it's a relationship day.)
- **Medium:** **choose a format where the store fits naturally** (a restock-alert / authenticity / trusted-shop angle) and give IvoryShard one clear, named tip anchored on **restock alerts** or **100% authentic sealed**. May reference the current set. No false scarcity.
- **Strong (only with a live BANNER):** same value-first wrapper, the restock/drop tip is most prominent, and you can point to the actual live drop. Still honest — the set is available elsewhere too.

⚠️ **Never** anchor IvoryShard on price / "fair price" / "no scalper prices" — its prices aren't necessarily the lowest. Anchor only on **never missing a drop** + **authentic sealed**. And no "scarcity/last-ones" framing ever.

## Step B2 — the CTA TYPE follows the product's LIVE availability (critical)
Match the ask to what the viewer can actually do right now, and **connect it naturally to the content** (reference the very products the slideshow discussed). Don't tell people to set a restock alert for something that's in stock this second.

| Live status of the relevant product | The natural CTA |
|---|---|
| **In stock NOW** | Light, direct availability nudge: "if you want it, it's up right now on IvoryShard." NOT a restock alert. |
| **Coming soon** (tagged on the site) | Slight CTA, often its own slide: "these are coming back soon on IvoryShard — turn on the alert so you're ready / in case you didn't grab one yet." |
| **Sold out, none incoming** | Restock alert / newsletter ("so you catch the next drop"), or omit. |
| **Not carried / nothing relevant** | Omit the store — pure value. |

**Always find the natural bridge yourself.** The content and the store status should click together (e.g. a post comparing ETB/Bundle, and those exact products are "Coming soon" → the CTA writes itself). There are endless good formats — pick one where today's actual stock state IS the punchline, never a bolted-on ad.

## Step C — the matrix
| Live stock state | 🇫🇷 Chloé | 🇩🇪 Lea |
|---|---|---|
| `(French)` in stock | **Medium** | Soft |
| `(German)` in stock | Soft | **Medium** |
| `(English)` in stock (counts for both) | **Medium** | **Medium** |
| Both FR + DE (and/or EN) in stock | Medium | Medium |
| Only `(Japanese)`/`(Chinese)`/other | Judgment: Medium if a genuinely hyped chase set (per `market-intel.md`), else Soft | Same |
| Fully sold out, no signal | Soft | Soft |
| **"Coming soon"** for a market (mild) | nudges that market Soft → **Medium** at most — never hype, never insider framing | same |
| **BANNER live (real drop/restock)** | **Strong** → can point to the live drop, still honest | **Strong** → same |

## Step D — pick the content goal that matches intensity
- **Strong (banner only):** reference the live drop/restock as a tip ("there's a drop live at IvoryShard right now"); restock heads-up / "what to grab this drop". Still value-first.
- **Medium:** pick a **natural traffic vehicle** (restock-alert / authenticity / trusted-shop format) and name IvoryShard once, anchored on alerts or authentic sealed. NOT the anti-scalper/price formats (#2) — those stay store-free.
- **Soft:** pure value/community (era explainer, spot-a-fake, sleeve tutorial, FR/JP compare); IvoryShard mention optional. Formats #6, #7, #9, #12.

## Guardrails
- **Honesty first (see `brand-personas.md`):** no false scarcity, no "my shop"/insider, no overhype. These override the matrix — a Medium that can't be done honestly becomes a Soft.
- Every level leads with value; IvoryShard is one lowkey **named** tip, never the star.
- Verify the live read each day; never claim stock that isn't there.
- FR and DE can land on different intensities the same day, and must use different formats/angles.
- If unsure on a JP/CN product, default **Soft** and check `market-intel.md`.
