/**
 * Zod schema + types for the daily_content payload.
 *
 * This is the single source of truth for the shape of a day's content (mirrors the schema in
 * workflows/daily_content.md). The orchestrator validates against it, and lint-content / render-pdf
 * consume the typed object. Structural rules live here; the *semantic* content rules (odds bans,
 * IvoryShard placement, etc.) live in lint-content.ts.
 */
import { z } from "zod";

export const SlideSchema = z.object({
  n: z.number().int(),
  title: z.string(),
  bullets: z.array(z.string()).default([]),
  title_en: z.string().optional().default(""),
  bullets_en: z.array(z.string()).optional().default([]),
  /** English note for the operator: what to film/show. NEVER goes on the slide. */
  direction: z.string().optional().default(""),
});

export const CtaSchema = z.object({
  /** native final-slide on-screen text */
  on_screen: z.string().default(""),
  /** English gloss */
  en: z.string().optional().default(""),
  bullets: z.array(z.string()).optional().default([]),
});

export const ScriptSchema = z.object({
  persona: z.string(),
  market: z.enum(["DE", "FR"]),
  language: z.string().default(""),
  format: z.string().default(""),
  intensity: z.string().default(""),
  why_today: z.string().optional().default(""),
  slides: z.array(SlideSchema),
  cta: CtaSchema,
  shot_list: z.string().optional().default(""),
});

export const StoreProductSchema = z.object({
  title: z.string(),
  language: z.string().default("Unknown"),
  url: z.string().optional().default(""),
});

export const StoreStateSchema = z.object({
  banner: z.string().default("none"),
  restock_signal: z.enum(["none", "coming_soon", "banner"]).default("none"),
  in_stock: z.array(StoreProductSchema).default([]),
  coming_soon: z.array(StoreProductSchema).default([]),
});

export const DailyContentSchema = z.object({
  date: z.string(), // YYYY-MM-DD
  store_state: StoreStateSchema.default({
    banner: "none",
    restock_signal: "none",
    in_stock: [],
    coming_soon: [],
  }),
  scripts: z.array(ScriptSchema),
});

export type Slide = z.infer<typeof SlideSchema>;
export type Cta = z.infer<typeof CtaSchema>;
export type Script = z.infer<typeof ScriptSchema>;
export type StoreState = z.infer<typeof StoreStateSchema>;
export type DailyContent = z.infer<typeof DailyContentSchema>;
