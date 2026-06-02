import { defineConfig } from "@trigger.dev/sdk";
import { playwright } from "@trigger.dev/build/extensions/playwright";

export default defineConfig({
  // Set TRIGGER_PROJECT_REF in .env (from cloud.trigger.dev -> your project -> ref proj_...).
  project: process.env.TRIGGER_PROJECT_REF ?? "proj_cocbyjwuvgnokoogskak",
  runtime: "node",
  logLevel: "info",
  dirs: ["./src/trigger"],
  maxDuration: 600, // 10 min ceiling for a run (scrape can be slow)
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      factor: 2,
      minTimeoutInMs: 2000,
      maxTimeoutInMs: 30_000,
      randomize: true,
    },
  },
  build: {
    // Bundles a headless Chromium so scrape-store can render ivoryshard.com (a JS SPA) in prod.
    // headless:false installs BOTH full chromium + the headless-shell, so chromium.launch({headless:true})
    // (used by scrape-store and the HTML->PDF renderer) finds the full Chromium it expects in prod.
    extensions: [playwright({ browsers: ["chromium"], headless: false })],
    // Don't bundle Playwright — load it from node_modules at runtime (avoids esbuild choking on
    // playwright-core's optional chromium-bidi require).
    external: ["playwright", "playwright-core"],
  },
});
