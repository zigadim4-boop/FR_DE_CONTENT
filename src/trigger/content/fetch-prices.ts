/**
 * fetch-prices — deterministic price lookup so the brain does NOT burn tokens web-searching prices.
 * Given a list of card/product names, query the configured price sources and return structured,
 * EUR-first price stats per query.
 *
 * Sources (each guarded — a missing key or an API error degrades to nulls, never crashes the run):
 *   - eBay Browse API (free-text search; recent live listings) — primary, well-documented.
 *   - CardTrader marketplace (best-effort) — refine endpoints once your token/blueprints are known.
 *
 * NOTE: exact eBay/CardTrader request shapes depend on your account (marketplace, scopes). The
 * eBay call below is the standard Browse search; adjust EBAY_MARKETPLACE / filters as needed.
 */
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";
import { optionalEnv } from "../../lib/env.js";

const EBAY_MARKETPLACE = "EBAY_DE"; // FR/DE audience -> EUR

interface PriceStat {
  query: string;
  source: string;
  currency: string | null;
  min: number | null;
  median: number | null;
  count: number;
  sampleUrl?: string | null;
  note?: string;
}

function median(nums: number[]): number | null {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

// eBay Browse needs a short-lived OAuth app token, minted from App ID (client id) + Cert ID
// (client secret) via the client-credentials flow. We cache it in-process until it expires.
let _ebayToken: { value: string; expiresAt: number } | null = null;

async function ebayAppToken(): Promise<string | null> {
  const clientId = optionalEnv("EBAY_APP_ID");
  const clientSecret = optionalEnv("EBAY_API_KEY"); // the Cert ID (client secret)
  if (!clientId || !clientSecret) return null;
  if (_ebayToken && _ebayToken.expiresAt > Date.now() + 60_000) return _ebayToken.value;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=" + encodeURIComponent("https://api.ebay.com/oauth/api_scope"),
  });
  if (!res.ok) throw new Error(`ebay oauth HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new Error("ebay oauth: no access_token in response");
  _ebayToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 7200) * 1000 };
  return _ebayToken.value;
}

async function ebaySearch(query: string): Promise<PriceStat> {
  const base: PriceStat = { query, source: "ebay", currency: null, min: null, median: null, count: 0 };
  let token: string | null;
  try {
    token = await ebayAppToken();
  } catch (err) {
    return { ...base, note: `ebay oauth error: ${(err as Error).message}` };
  }
  if (!token) return { ...base, note: "EBAY_APP_ID/EBAY_API_KEY not set" };
  try {
    const url =
      "https://api.ebay.com/buy/browse/v1/item_summary/search?limit=20&q=" + encodeURIComponent(query);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": EBAY_MARKETPLACE,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return { ...base, note: `ebay HTTP ${res.status}` };
    const json = (await res.json()) as {
      itemSummaries?: { price?: { value?: string; currency?: string }; itemWebUrl?: string }[];
    };
    const items = json.itemSummaries ?? [];
    const prices: number[] = [];
    let currency: string | null = null;
    let sampleUrl: string | null = null;
    for (const it of items) {
      const v = it.price?.value ? Number(it.price.value) : NaN;
      if (!Number.isNaN(v)) {
        prices.push(v);
        currency = currency ?? it.price?.currency ?? null;
        sampleUrl = sampleUrl ?? it.itemWebUrl ?? null;
      }
    }
    return {
      query,
      source: "ebay",
      currency,
      min: prices.length ? Math.min(...prices) : null,
      median: median(prices),
      count: prices.length,
      sampleUrl,
    };
  } catch (err) {
    return { ...base, note: `ebay error: ${(err as Error).message}` };
  }
}

async function cardtraderSearch(query: string): Promise<PriceStat> {
  // NOTE: CardTrader's API has no free-text search — you must resolve a card to an
  // expansion_id -> blueprint_id and then read marketplace products. That mapping isn't wired yet,
  // so for now this returns a clear note rather than guessing a wrong endpoint. eBay covers EUR
  // pricing in the meantime. (Refine later: GET /api/v2/expansions -> /api/v2/blueprints/export
  // ?expansion_id=… -> /api/v2/marketplace/products?blueprint_id=…, prices are in cents.)
  const token = optionalEnv("CARDTRADER_API_TOKEN");
  const base: PriceStat = { query, source: "cardtrader", currency: null, min: null, median: null, count: 0 };
  if (!token) return { ...base, note: "CARDTRADER_API_TOKEN not set" };
  return { ...base, note: "cardtrader: free-text search not supported by API (needs expansion/blueprint mapping — refine later)" };
}

export const fetchPrices = schemaTask({
  id: "fetch-prices",
  schema: z.object({
    queries: z.array(z.string()).min(1),
    sources: z.array(z.enum(["ebay", "cardtrader"])).default(["ebay"]),
  }),
  run: async ({ queries, sources }) => {
    const results: PriceStat[] = [];
    for (const q of queries) {
      if (sources.includes("ebay")) results.push(await ebaySearch(q));
      if (sources.includes("cardtrader")) results.push(await cardtraderSearch(q));
    }
    return { results };
  },
});
