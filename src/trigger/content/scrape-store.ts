/**
 * scrape-store — live ivoryshard.com stock + banner read (headless Chromium via Playwright).
 * The browser is provided in prod by the Playwright build extension in trigger.config.ts.
 * The actual scraping logic lives in src/lib/scrape.ts (so it can be tested locally).
 *
 * Returns a store_state shaped for the daily_content payload, plus richer detail for the agent.
 */
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";
import { scrapeIvoryshard } from "../../lib/scrape.js";

export const scrapeStore = schemaTask({
  id: "scrape-store",
  schema: z.object({ all: z.boolean().default(false) }),
  maxDuration: 180,
  run: async ({ all }) => {
    const result = await scrapeIvoryshard(all);
    console.log(
      `Products: ${result.total_products} | in stock: ${result.store_state.in_stock.length} | ` +
        `coming soon: ${result.store_state.coming_soon.length} | signal: ${result.store_state.restock_signal}`,
    );
    return result;
  },
});
