/**
 * Deterministic lint of a daily_content payload against the hard content rules — a faithful port of
 * the old tools/check_content.py. Catches the MECHANICAL violations so they can't slip through; the
 * agent still owns the judgment calls (is a fact actually true, does the IvoryShard mention feel
 * natural). Returns errors (must fix) and warns (review).
 *
 * Rules (see workflows/daily_content.md, reference/*.md):
 *   ERRORS: missing fields; <5 content slides; a content slide (n>=2) without title or without 2-4
 *           bullets; English parallel missing/mismatched; a NUMERIC pull-rate/odds on a slide; a
 *           "verify...before filming" offload note in a direction; IvoryShard placed too early
 *           (5 slides -> slide 3; >5 -> slide 4+); two scripts reusing the same format.
 *   WARNS:  a restock-ALERT CTA pushed for a product in stock for that market; a bare % on a slide.
 */
import type { DailyContent, Script, StoreState } from "./schema.js";

const ODDS_RE = /\b1\s*(?:in|sur|zu|auf|\/|:|-\s*in\s*-)\s*\d/i;
const PCT_RE = /\d[\d.,]*\s*%/;
const VERIFY_OFFLOAD_RE = /\b(?:verif|vérif|verifizier)/i;
const ALERT_RE =
  /\b(?:restock|notif|benachrichtig|alert|newsletter|abonnier|set the alert|active la notif)/i;
const MARKET_LANG: Record<string, string> = { FR: "french", DE: "german" };

export interface LintResult {
  ok: boolean;
  errors: string[];
  warns: string[];
}

function slideText(sl: { title?: string; bullets?: string[] }): string {
  const parts = [sl.title ?? "", ...(sl.bullets ?? [])];
  return parts.filter(Boolean).join(" \n ");
}

function checkScript(s: Script, store: StoreState, errors: string[], warns: string[]): void {
  const who = `${s.persona ?? "?"}/${s.market ?? "?"}`;
  for (const field of ["persona", "market", "slides", "cta"] as const) {
    const v = (s as Record<string, unknown>)[field];
    if (!v || (Array.isArray(v) && v.length === 0)) {
      errors.push(`[${who}] missing required field '${field}'`);
    }
  }
  const slides = s.slides ?? [];
  if (slides.length < 5) {
    errors.push(`[${who}] only ${slides.length} content slides (need >= 5)`);
  }

  for (const sl of slides) {
    const n = sl.n ?? "?";
    if (!sl.title) errors.push(`[${who}] slide ${n}: no title`);
    const bullets = sl.bullets ?? [];
    if (n !== 1 && !(bullets.length >= 2 && bullets.length <= 4)) {
      errors.push(`[${who}] slide ${n}: has ${bullets.length} bullets (need 2-4)`);
    }
    if (!sl.title_en && sl.title) errors.push(`[${who}] slide ${n}: missing title_en`);
    if ((sl.bullets_en ?? []).length !== bullets.length) {
      errors.push(`[${who}] slide ${n}: bullets_en count != bullets count`);
    }
    const txt = slideText(sl);
    if (ODDS_RE.test(txt)) {
      errors.push(
        `[${who}] slide ${n}: numeric pull-rate/odds on slide (unofficial - use a qualitative rarity statement)`,
      );
    }
    if (PCT_RE.test(txt)) {
      warns.push(`[${who}] slide ${n}: a percentage on the slide - confirm it's a verified, official figure`);
    }
    if (VERIFY_OFFLOAD_RE.test(sl.direction ?? "")) {
      errors.push(
        `[${who}] slide ${n}: 'verify' note in direction - YOU verify before writing, never offload to the user`,
      );
    }
  }

  const cta = s.cta ?? { on_screen: "", en: "" };
  const ctaTxt = cta.on_screen ?? "";
  if (!cta.en) warns.push(`[${who}] CTA has no English gloss (en)`);
  if (ODDS_RE.test(ctaTxt)) errors.push(`[${who}] CTA: numeric pull-rate/odds on the final slide`);

  // IvoryShard placement: 5 slides -> slide 3; >5 -> slide 4+
  const total = slides.length + (cta ? 1 : 0);
  const mentionIdxs: number[] = slides
    .filter((sl) => slideText(sl).toLowerCase().includes("ivoryshard"))
    .map((sl) => sl.n);
  if (ctaTxt.toLowerCase().includes("ivoryshard")) mentionIdxs.push(slides.length + 1);
  if (mentionIdxs.length) {
    const first = Math.min(...mentionIdxs);
    if (total > 5 && first < 4) {
      errors.push(
        `[${who}] IvoryShard first mentioned on slide ${first}; with ${total} slides it must be slide 4 or later`,
      );
    } else if (total === 5 && first !== 3) {
      errors.push(
        `[${who}] IvoryShard first mentioned on slide ${first}; a 5-slide carousel must mention it on slide 3`,
      );
    }
  }

  // CTA type vs live availability: don't push a restock alert for an in-stock product.
  const lang = MARKET_LANG[s.market ?? ""];
  const inStockLangs = new Set((store.in_stock ?? []).map((p) => (p.language ?? "").toLowerCase()));
  if (lang && inStockLangs.has(lang) && ALERT_RE.test(ctaTxt)) {
    const langTitle = lang.charAt(0).toUpperCase() + lang.slice(1);
    warns.push(
      `[${who}] CTA pushes a restock/alert but a ${langTitle} product is IN STOCK now - use a 'available right now' nudge instead`,
    );
  }
}

export function lintDailyContent(data: DailyContent): LintResult {
  const errors: string[] = [];
  const warns: string[] = [];

  if (!data.date) errors.push("[top] missing 'date'");
  const scripts = data.scripts ?? [];
  if (!scripts.length) errors.push("[top] no scripts");

  // No two scripts may reuse the same format/angle.
  const fmts: Record<string, string> = {};
  for (const s of scripts) {
    const f = (s.format ?? "").trim().toLowerCase();
    if (f && f in fmts) {
      errors.push(
        `[top] ${s.persona ?? "?"} and ${fmts[f]} use the same format '${s.format}' - each script must differ`,
      );
    }
    if (f) fmts[f] = s.persona ?? "?";
  }

  const store = data.store_state ?? { banner: "none", restock_signal: "none", in_stock: [], coming_soon: [] };
  for (const s of scripts) checkScript(s, store, errors, warns);

  return { ok: errors.length === 0, errors, warns };
}
