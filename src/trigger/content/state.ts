/**
 * state — the rolling cross-run memory in Supabase, exposed as two tasks the brain calls:
 *   get-state  : read the last N days of format choices (for dedup) + the agent's market_knowledge.
 *   save-state : append today's persona/format rows + (optionally) update market_knowledge.
 *
 * This replaces the old .tmp/format_log.md + the "mirror to memory" step, so the agent stays on
 * track across runs without re-researching, and never repeats a persona's recent format.
 * Uses the REST helpers in lib/supabase.ts (no WebSocket dep — works on Trigger's Node 21 runtime).
 */
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";
import { sbInsert, sbUpsert, sbSelect, MARKET_KNOWLEDGE_ROW_ID } from "../../lib/supabase.js";

interface FormatRow {
  date: string;
  persona: string;
  market: string;
  format: string;
}

export const getState = schemaTask({
  id: "get-state",
  schema: z.object({ days: z.number().int().min(1).max(60).default(10) }),
  run: async ({ days }) => {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const recent = await sbSelect<FormatRow>(
      "format_log",
      `select=date,persona,market,format&date=gte.${since}&order=date.desc`,
    );
    const mk = await sbSelect<{ data: unknown; updated_at: string }>(
      "market_knowledge",
      `select=data,updated_at&id=eq.${MARKET_KNOWLEDGE_ROW_ID}`,
    );

    return {
      since,
      recent_formats: recent,
      market_knowledge: mk[0]?.data ?? {},
      market_knowledge_updated_at: mk[0]?.updated_at ?? null,
    };
  },
});

export const saveState = schemaTask({
  id: "save-state",
  schema: z.object({
    date: z.string(),
    formats: z.array(z.object({ persona: z.string(), market: z.string(), format: z.string() })),
    market_knowledge: z.record(z.any()).optional(),
  }),
  run: async ({ date, formats, market_knowledge }) => {
    if (formats.length) {
      await sbInsert(
        "format_log",
        formats.map((f) => ({ date, persona: f.persona, market: f.market, format: f.format })),
      );
    }
    if (market_knowledge) {
      await sbUpsert(
        "market_knowledge",
        { id: MARKET_KNOWLEDGE_ROW_ID, data: market_knowledge, updated_at: new Date().toISOString() },
        "id",
      );
    }
    return { ok: true, saved_formats: formats.length, updated_knowledge: Boolean(market_knowledge) };
  },
});
