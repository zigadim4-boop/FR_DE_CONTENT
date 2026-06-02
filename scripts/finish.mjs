/**
 * finish.mjs — dependency-free helper the scheduled routine runs LAST.
 * Takes the day's payload (the brain wrote it) and triggers the `daily-content` task, which lints,
 * renders both PDFs, DMs them to the two Slack targets, and saves state. Exits non-zero on failure.
 *
 * The payload file must be JSON of shape: { data: <DailyContent>, market_knowledge?: {...} }
 * Auth: TRIGGER_SECRET_KEY env var. Run: `node scripts/finish.mjs <payload.json>`
 */
import { readFileSync } from "node:fs";

const KEY = process.env.TRIGGER_SECRET_KEY;
if (!KEY) {
  console.error("TRIGGER_SECRET_KEY not set");
  process.exit(1);
}
const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/finish.mjs <payload.json>");
  process.exit(1);
}
const payload = JSON.parse(readFileSync(file, "utf8"));
if (!payload.data) {
  console.error("payload must have a 'data' field (the DailyContent object)");
  process.exit(1);
}

const H = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const res = await fetch("https://api.trigger.dev/api/v1/tasks/daily-content/trigger", {
  method: "POST",
  headers: H,
  body: JSON.stringify({ payload }),
});
if (!res.ok) {
  console.error(`trigger daily-content: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const { id } = await res.json();
console.error(`daily-content run: ${id}`);

const deadline = Date.now() + 300000;
while (Date.now() < deadline) {
  await sleep(3000);
  const g = await fetch(`https://api.trigger.dev/api/v3/runs/${id}`, { headers: H });
  const j = await g.json();
  if (j.status === "COMPLETED" || j.isCompleted) {
    console.log(JSON.stringify(j.output, null, 2));
    process.exit(0);
  }
  if (["FAILED", "CRASHED", "CANCELED", "TIMED_OUT", "SYSTEM_FAILURE", "EXPIRED"].includes(j.status)) {
    console.error(`daily-content ${j.status}: ${JSON.stringify(j.error)}`);
    process.exit(1);
  }
}
console.error("daily-content: timed out");
process.exit(1);
