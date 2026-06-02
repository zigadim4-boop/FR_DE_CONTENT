/**
 * Minimal Supabase access over its REST API (PostgREST) using plain fetch.
 *
 * We deliberately avoid @supabase/supabase-js: its client constructs a Realtime/WebSocket client
 * that throws on Node < 22 (Trigger.dev's runtime is Node 21). We only do simple insert/select/
 * upsert, so REST is lighter and has no WebSocket dependency.
 *
 * Auth: the service-role key (server-side only, inside Trigger.dev tasks) as both apikey + Bearer.
 * Tables (see docs/supabase.sql):
 *   format_log(id, date, persona, market, format, created_at)
 *   market_knowledge(id, data jsonb, updated_at)   -- single row, id = 1
 */
import { requireEnv } from "./env.js";

export const MARKET_KNOWLEDGE_ROW_ID = 1;

function restBase(): string {
  return requireEnv("SUPABASE_URL").replace(/\/+$/, "") + "/rest/v1";
}

function authHeaders(): Record<string, string> {
  const key = requireEnv("SUPABASE_SERVICE_KEY");
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

/** Insert one or more rows. */
export async function sbInsert(table: string, rows: unknown): Promise<void> {
  const res = await fetch(`${restBase()}/${table}`, {
    method: "POST",
    headers: { ...authHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`supabase insert ${table}: ${res.status} ${await res.text()}`);
}

/** Upsert a single row, merging on the given conflict column. */
export async function sbUpsert(table: string, row: unknown, onConflict: string): Promise<void> {
  const res = await fetch(`${restBase()}/${table}?on_conflict=${encodeURIComponent(onConflict)}`, {
    method: "POST",
    headers: { ...authHeaders(), Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`supabase upsert ${table}: ${res.status} ${await res.text()}`);
}

/** Select rows. `query` is a raw PostgREST querystring (e.g. "select=*&date=gte.2026-05-23"). */
export async function sbSelect<T = unknown>(table: string, query: string): Promise<T[]> {
  const res = await fetch(`${restBase()}/${table}?${query}`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`supabase select ${table}: ${res.status} ${await res.text()}`);
  return (await res.json()) as T[];
}
