/**
 * Read current ivoryshard.com supply by rendering the JS storefront with Playwright (headless
 * Chromium). Faithful port of the old tools/scrape_ivoryshard.py.
 *
 * ivoryshard.com is a JS single-page app; its bulk JSON feeds are locked and product pages are
 * empty shells. So we render the Pokemon collection page, scroll to lazy-load, and read product
 * cards: title (with the (French)/(German)/(English)/... suffix), SOLD OUT / COMING SOON badges,
 * and the announcement bar under the navbar (the strong restock/drop signal).
 *
 * Pure module (no Trigger.dev imports) so it can be unit-tested locally and reused by the task.
 */
import { chromium } from "playwright";

export const BASE = "https://ivoryshard.com";
const POKEMON_URL = `${BASE}/collections/pokemon-cards`;
const ALL_URL = `${BASE}/collections/all`;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ContentBot/1.0";

const KNOWN_LANGS = ["french", "german", "english", "japanese", "chinese", "korean"];

export function classifyLanguage(title: string): string {
  const m = /\(([^)]+)\)\s*$/.exec(title || "");
  if (m) {
    const tag = m[1].trim().toLowerCase();
    for (const lang of KNOWN_LANGS) {
      if (tag.includes(lang)) return lang.charAt(0).toUpperCase() + lang.slice(1);
    }
  }
  return "Unknown";
}

export interface Product {
  title: string;
  handle: string;
  url: string;
  language: string;
  sold_out: boolean;
  coming_soon: boolean;
  available: boolean;
}

export interface ScrapeResult {
  source: string;
  announcement_top: string;
  store_state: {
    banner: string;
    restock_signal: "none" | "coming_soon" | "banner";
    in_stock: { title: string; language: string; url: string }[];
    coming_soon: { title: string; language: string; url: string }[];
  };
  in_stock_by_language: Record<string, number>;
  total_products: number;
  all_products: Product[];
}

export async function scrapeIvoryshard(all = false): Promise<ScrapeResult> {
  const url = all ? ALL_URL : POKEMON_URL;
  const collected: Record<string, { handle: string; url: string; texts: string[] }> = {};
  let announcement = "";

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ userAgent: UA });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 4000);
      await page.waitForTimeout(700);
    }
    await page.waitForTimeout(1500);

    try {
      announcement = (
        await page.evaluate(() => document.body.innerText.split("\n").slice(0, 6).join(" | "))
      ).trim();
    } catch {
      /* ignore */
    }

    const anchors = await page.$$("a[href*='/product/']");
    for (const a of anchors) {
      const href = (await a.getAttribute("href")) || "";
      if (!href.includes("/product/")) continue;
      const handle = href.replace(/\/$/, "").split("/product/").pop()!.split("?")[0];
      let text = "";
      try {
        const card = await a.evaluateHandle((el) => el.closest("[class*=card], li, article, div"));
        const elem = card.asElement();
        text = elem ? await elem.innerText() : await a.innerText();
      } catch {
        text = (await a.innerText()) || "";
      }
      text = text.replace(/\r/g, " ");
      const entry =
        collected[handle] ??
        (collected[handle] = {
          handle,
          url: href.startsWith("/") ? `${BASE}${href}` : href,
          texts: [],
        });
      entry.texts.push(text);
    }
  } finally {
    await browser.close();
  }

  const cleaned: Product[] = [];
  for (const [h, e] of Object.entries(collected)) {
    const blob = e.texts.join(" | ");
    let title = "";
    for (const t of e.texts) {
      for (let line of t.split("\n")) {
        line = line.trim();
        if (line.length > title.length && (line.includes("Pok") || line.includes("("))) {
          title = line;
        }
      }
    }
    const up = blob.toUpperCase();
    const soldOut = up.includes("SOLD OUT") || up.includes("AUSVERKAUFT") || up.includes("RUPTURE");
    const comingSoon =
      up.includes("COMING SOON") || up.includes("BALD") || up.replace(/\?/g, "").includes("BIENT");
    cleaned.push({
      title: title || h,
      handle: h,
      url: e.url,
      language: classifyLanguage(title),
      sold_out: soldOut,
      coming_soon: comingSoon,
      available: !soldOut && !comingSoon,
    });
  }

  const inStock = cleaned.filter((p) => p.available);
  const coming = cleaned.filter((p) => p.coming_soon);
  const byLang: Record<string, number> = {};
  for (const p of inStock) byLang[p.language] = (byLang[p.language] ?? 0) + 1;

  let restockSignal: "none" | "coming_soon" | "banner" = coming.length ? "coming_soon" : "none";
  if (/\b(drop|restock|coming soon)\b/i.test(announcement)) {
    restockSignal = coming.length ? restockSignal : "banner";
  }

  return {
    source: BASE,
    announcement_top: announcement,
    store_state: {
      banner: restockSignal === "banner" ? announcement.slice(0, 200) : "none",
      restock_signal: restockSignal,
      in_stock: inStock.map((p) => ({ title: p.title, language: p.language, url: p.url })),
      coming_soon: coming.map((p) => ({ title: p.title, language: p.language, url: p.url })),
    },
    in_stock_by_language: byLang,
    total_products: cleaned.length,
    all_products: cleaned,
  };
}
