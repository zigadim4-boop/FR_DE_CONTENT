/**
 * lint-content — deterministically lint a daily_content payload against the hard content rules.
 * The brain triggers this (or the daily-content orchestrator calls lintDailyContent directly).
 * Returns {ok, errors, warns}; fix every error and re-run until ok=true before rendering.
 */
import { schemaTask } from "@trigger.dev/sdk";
import { DailyContentSchema } from "../../lib/schema.js";
import { lintDailyContent } from "../../lib/lint.js";

export const lintContent = schemaTask({
  id: "lint-content",
  schema: DailyContentSchema,
  run: async (payload) => {
    const result = lintDailyContent(payload);
    for (const w of result.warns) console.log("WARN ", w);
    for (const e of result.errors) console.log("ERROR", e);
    console.log(
      result.ok
        ? `PASS - 0 errors, ${result.warns.length} warning(s)`
        : `FAIL - ${result.errors.length} error(s), ${result.warns.length} warning(s)`,
    );
    return result;
  },
});
