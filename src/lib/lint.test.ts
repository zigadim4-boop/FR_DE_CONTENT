/**
 * Regression tests for the deterministic content linter. One describe block per rule family, each
 * built from a known-good baseline payload so every test isolates exactly one violation.
 */
import { describe, expect, it } from "vitest";
import { lintDailyContent } from "./lint.js";
import type { DailyContent, Script, Slide, StoreState } from "./schema.js";

function slide(n: number, over: Partial<Slide> = {}): Slide {
  return {
    n,
    title: `Titel ${n}`,
    bullets: ["Punkt eins"],
    title_en: `Title ${n}`,
    bullets_en: ["Point one"],
    direction: "Show the card on the bed.",
    ...over,
  };
}

function script(over: Partial<Script> = {}): Script {
  return {
    persona: "Lea",
    market: "DE",
    language: "de",
    format: "Hold or rip?",
    intensity: "soft",
    why_today: "test",
    slides: [slide(1), slide(2), slide(3), slide(4)],
    cta: { on_screen: "Speicher dir das 📌", en: "Save this", bullets: [] },
    shot_list: "selfie",
    ...over,
  };
}

function payload(scripts: Script[], store: Partial<StoreState> = {}): DailyContent {
  return {
    date: "2026-06-10",
    store_state: { banner: "none", restock_signal: "none", in_stock: [], coming_soon: [], ...store },
    scripts,
  };
}

describe("baseline", () => {
  it("passes a clean payload with no errors or warns", () => {
    const r = lintDailyContent(payload([script()]));
    expect(r.errors).toEqual([]);
    expect(r.warns).toEqual([]);
    expect(r.ok).toBe(true);
  });

  it("errors on a missing date and on an empty scripts array", () => {
    const r = lintDailyContent({ ...payload([script()]), date: "" });
    expect(r.errors.some((e) => e.includes("missing 'date'"))).toBe(true);
    const r2 = lintDailyContent(payload([]));
    expect(r2.errors.some((e) => e.includes("no scripts"))).toBe(true);
  });
});

describe("deck length", () => {
  it("errors below 3 content slides", () => {
    const r = lintDailyContent(payload([script({ slides: [slide(1), slide(2)] })]));
    expect(r.errors.some((e) => e.includes("content slides"))).toBe(true);
  });

  it("errors above 8 content slides", () => {
    const slides = Array.from({ length: 9 }, (_, i) => slide(i + 1));
    const r = lintDailyContent(payload([script({ slides })]));
    expect(r.errors.some((e) => e.includes("max 9"))).toBe(true);
  });

  it("only warns between 6 and 8 content slides (showcase territory)", () => {
    const slides = Array.from({ length: 6 }, (_, i) => slide(i + 1));
    const r = lintDailyContent(payload([script({ slides })]));
    expect(r.errors).toEqual([]);
    expect(r.warns.some((w) => w.includes(">6)"))).toBe(true);
  });
});

describe("per-slide rules", () => {
  it("errors on a slide without a title", () => {
    const r = lintDailyContent(payload([script({ slides: [slide(1), slide(2, { title: "" }), slide(3), slide(4)] })]));
    expect(r.errors.some((e) => e.includes("slide 2: no title"))).toBe(true);
  });

  it("errors above 4 bullets", () => {
    const five = ["a", "b", "c", "d", "e"];
    const r = lintDailyContent(
      payload([script({ slides: [slide(1), slide(2, { bullets: five, bullets_en: five }), slide(3), slide(4)] })]),
    );
    expect(r.errors.some((e) => e.includes("max 4"))).toBe(true);
  });

  it("errors on a missing English parallel (title_en, bullets_en count)", () => {
    const r = lintDailyContent(
      payload([
        script({
          slides: [slide(1, { title_en: "" }), slide(2, { bullets_en: [] }), slide(3), slide(4)],
        }),
      ]),
    );
    expect(r.errors.some((e) => e.includes("missing title_en"))).toBe(true);
    expect(r.errors.some((e) => e.includes("bullets_en count"))).toBe(true);
  });
});

describe("forbidden content", () => {
  it("errors on numeric pull-rate odds in any language pattern", () => {
    for (const odds of ["1 in 1786", "1 sur 100", "1:100"]) {
      const r = lintDailyContent(
        payload([script({ slides: [slide(1), slide(2, { title: `Chance ${odds}` }), slide(3), slide(4)] })]),
      );
      expect(r.errors.some((e) => e.includes("odds")), odds).toBe(true);
    }
  });

  it("warns on a bare percentage", () => {
    const r = lintDailyContent(
      payload([script({ slides: [slide(1), slide(2, { bullets: ["+12% Trend"], bullets_en: ["+12% trend"] }), slide(3), slide(4)] })]),
    );
    expect(r.warns.some((w) => w.includes("percentage"))).toBe(true);
  });

  it("errors on a verify-offload note in a direction (EN/FR/DE)", () => {
    for (const note of ["verify the price before filming", "vérifier avant de filmer", "verifizieren vor dem Dreh"]) {
      const r = lintDailyContent(
        payload([script({ slides: [slide(1), slide(2, { direction: note }), slide(3), slide(4)] })]),
      );
      expect(r.errors.some((e) => e.includes("verify")), note).toBe(true);
    }
  });

  it("errors on numeric odds in the CTA", () => {
    const r = lintDailyContent(
      payload([script({ cta: { on_screen: "1 in 100 Chance auf die Chase", en: "odds", bullets: [] } })]),
    );
    expect(r.errors.some((e) => e.includes("CTA: numeric"))).toBe(true);
  });
});

describe("IvoryShard placement (in-content touch only)", () => {
  const mentionAt = (idx: number, count: number): Slide[] =>
    Array.from({ length: count }, (_, i) =>
      slide(i + 1, i + 1 === idx ? { title: `Ich kaufe bei IvoryShard ${i + 1}` } : {}),
    );

  it("accepts slide 3 on a 5-total deck", () => {
    const r = lintDailyContent(payload([script({ slides: mentionAt(3, 4) })]));
    expect(r.errors).toEqual([]);
  });

  it("rejects slide 2 on a 5-total deck", () => {
    const r = lintDailyContent(payload([script({ slides: mentionAt(2, 4) })]));
    expect(r.errors.some((e) => e.includes("slide 3"))).toBe(true);
  });

  it("rejects a mention before slide 4 on a deck longer than 5 total", () => {
    const r = lintDailyContent(payload([script({ slides: mentionAt(3, 6) })]));
    expect(r.errors.some((e) => e.includes("slide 4 or later"))).toBe(true);
  });

  it("accepts slide 4 on a deck longer than 5 total", () => {
    const r = lintDailyContent(payload([script({ slides: mentionAt(4, 6) })]));
    expect(r.errors).toEqual([]);
  });

  it("does NOT flag a CTA that names the shop (separate channel from the in-content touch)", () => {
    const r = lintDailyContent(
      payload([script({ cta: { on_screen: "Restock-Alarm an auf IvoryShard", en: "alert", bullets: [] } })]),
    );
    expect(r.errors).toEqual([]);
  });
});

describe("cross-script and store-state rules", () => {
  it("errors when two scripts reuse the same format", () => {
    const r = lintDailyContent(
      payload([script({ persona: "Lea" }), script({ persona: "Mila", format: "hold or rip?" })]),
    );
    expect(r.errors.some((e) => e.includes("same format"))).toBe(true);
  });

  it("warns on a restock-alert CTA while a product for that market is in stock", () => {
    const r = lintDailyContent(
      payload(
        [script({ cta: { on_screen: "Restock-Benachrichtigung an!", en: "alert", bullets: [] } })],
        { in_stock: [{ title: "ETB (German)", language: "German", url: "" }] },
      ),
    );
    expect(r.warns.some((w) => w.includes("IN STOCK"))).toBe(true);
  });
});
