/**
 * daily-content — the deterministic pipeline, in one call. The brain (scheduled Claude Code) does
 * the research + writes the 3-script JSON, then triggers THIS with the full payload. It:
 *   1. lints (throws on any error — the brain must fix and re-trigger)
 *   2. renders the two PDFs (operator = all but Mila; mila = Mila only)
 *   3. posts each PDF to its Slack channel
 *   4. saves the day's formats (+ optional refreshed market_knowledge) to Supabase
 *
 * Render + Slack + Supabase are done inline via the shared libs (PDFs never cross a task boundary).
 * The individual tasks (render-pdf, deliver-slack, get-state, save-state) remain available for the
 * brain to call à la carte (e.g. during testing).
 */
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";
import { DailyContentSchema } from "../../lib/schema.js";
import { lintDailyContent } from "../../lib/lint.js";
import { buildPdf } from "../../lib/pdf.js";
import { uploadPdfToChannel } from "../../lib/slack.js";
import { requireEnv } from "../../lib/env.js";
import { sbInsert, sbUpsert, MARKET_KNOWLEDGE_ROW_ID } from "../../lib/supabase.js";

export const dailyContent = schemaTask({
  id: "daily-content",
  schema: z.object({
    data: DailyContentSchema,
    // The agent's refreshed running notes to persist (known prices, digested news, what landed).
    market_knowledge: z.record(z.any()).optional(),
    // Set true to lint+render only (skip Slack + Supabase) — handy for a dry run.
    dryRun: z.boolean().default(false),
  }),
  run: async ({ data, market_knowledge, dryRun }) => {
    // 1. Lint — hard gate.
    const lint = lintDailyContent(data);
    for (const w of lint.warns) console.log("WARN ", w);
    if (!lint.ok) {
      for (const e of lint.errors) console.log("ERROR", e);
      throw new Error(`Lint failed: ${lint.errors.length} error(s). Fix and re-trigger.`);
    }

    // 2. Render both PDFs.
    const date = data.date ?? "content";
    const operatorPdf = await buildPdf(data, { exclude: ["Mila"] });
    const milaPdf = await buildPdf(data, { personas: ["Mila"] });
    const operatorFilename = `daily_content_${date}.pdf`;
    const milaFilename = `daily_content_mila_${date}.pdf`;

    if (dryRun) {
      return {
        dryRun: true,
        warns: lint.warns,
        operatorBytes: operatorPdf.length,
        milaBytes: milaPdf.length,
        operatorFilename,
        milaFilename,
      };
    }

    // 3. Deliver to Slack (two channels).
    await uploadPdfToChannel({
      channel: requireEnv("SLACK_CHANNEL_OPERATOR"),
      filename: operatorFilename,
      pdf: operatorPdf,
      title: `Pokemon Content - ${date}`,
    });
    await uploadPdfToChannel({
      channel: requireEnv("SLACK_CHANNEL_MILA"),
      filename: milaFilename,
      pdf: milaPdf,
      title: `Pokemon Content (Mila) - ${date}`,
    });

    // 4. Persist rolling state (REST — no WebSocket dep, works on Trigger's Node 21).
    const formats = (data.scripts ?? []).map((s) => ({
      date,
      persona: s.persona,
      market: s.market,
      format: s.format,
    }));
    if (formats.length) await sbInsert("format_log", formats);
    if (market_knowledge) {
      await sbUpsert(
        "market_knowledge",
        { id: MARKET_KNOWLEDGE_ROW_ID, data: market_knowledge, updated_at: new Date().toISOString() },
        "id",
      );
    }

    return {
      ok: true,
      date,
      warns: lint.warns,
      delivered: [operatorFilename, milaFilename],
      saved_formats: formats.length,
      updated_knowledge: Boolean(market_knowledge),
    };
  },
});
