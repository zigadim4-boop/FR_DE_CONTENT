/**
 * gather.mjs — dependency-free helper the scheduled routine runs FIRST.
 * Triggers the deterministic Trigger.dev tasks and prints everything the brain needs to write the
 * day's scripts, as one JSON object on stdout:
 *   { store_state, recent_formats, market_knowledge, prices }
 *
 * Uses only the built-in fetch + the Trigger.dev REST API, so the routine needs no npm install.
 * Auth: TRIGGER_SECRET_KEY env var (a prod key, tr_prod_...). Run: `node scripts/gather.mjs`
 */
const KEY = process.env.TRIGGER_SECRET_KEY;
if (!KEY) {
  console.error("TRIGGER_SECRET_KEY not set");
  process.exit(1);
}
const H = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runTask(taskId, payload, timeoutMs = 240000) {
  const res = await fetch(`https://api.trigger.dev/api/v1/tasks/${taskId}/trigger`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({ payload }),
  });
  if (!res.ok) throw new Error(`trigger ${taskId}: ${res.status} ${await res.text()}`);
  const { id } = await res.json();
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await sleep(3000);
    const g = await fetch(`https://api.trigger.dev/api/v3/runs/${id}`, { headers: H });
    const j = await g.json();
    if (j.status === "COMPLETED" || j.isCompleted) return j.output;
    if (["FAILED", "CRASHED", "CANCELED", "TIMED_OUT", "SYSTEM_FAILURE", "EXPIRED"].includes(j.status)) {
      throw new Error(`${taskId} ${j.status}: ${JSON.stringify(j.error)}`);
    }
  }
  throw new Error(`${taskId}: timed out after ${timeoutMs}ms`);
}

const scrape = await runTask("scrape-store", { all: false });
const state = await runTask("get-state", { days: 10 });

// Derive price queries from the store's products (in stock + coming soon).
const titles = [
  ...(scrape?.store_state?.in_stock ?? []),
  ...(scrape?.store_state?.coming_soon ?? []),
].map((p) => p.title).filter(Boolean);
const queries = [...new Set(titles)].slice(0, 8);

let prices = { results: [] };
if (queries.length) {
  try {
    prices = await runTask("fetch-prices", { queries });
  } catch (e) {
    prices = { results: [], note: `fetch-prices failed: ${e.message}` };
  }
}

process.stdout.write(
  JSON.stringify(
    {
      store_state: scrape?.store_state ?? {},
      announcement_top: scrape?.announcement_top ?? "",
      recent_formats: state?.recent_formats ?? [],
      market_knowledge: state?.market_knowledge ?? {},
      market_knowledge_updated_at: state?.market_knowledge_updated_at ?? null,
      prices,
    },
    null,
    2,
  ),
);
