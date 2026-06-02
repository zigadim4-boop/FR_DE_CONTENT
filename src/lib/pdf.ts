/**
 * Render a daily_content payload into a polished PDF by laying it out as styled HTML and printing
 * it with headless Chromium (Playwright). This replaces the old pdfkit renderer — HTML+CSS gives
 * much nicer typography, full Unicode (German/French/emoji), and proper colors/rounded cards.
 *
 * The PDF is in ENGLISH, except the exact words that go ON a slide (kept native, in a tinted card)
 * with an English translation under it. Each slide also has a DIRECTION line (notes for the
 * operator, never slide text). Three labelled blocks per persona page:
 *   NATIVE SCENARIO   -> native text, copy/paste straight onto the slides
 *   ENGLISH VERSION   -> the same script in English (understanding only)
 *   DIRECTIONS        -> per-slide filming notes + overall shot list
 *
 * Returns the finished PDF as a Buffer.
 */
import { chromium } from "playwright";
import type { Cta, DailyContent, Script, Slide } from "./schema.js";

const ACCENT_DE = "#c58a17"; // gold
const ACCENT_FR = "#9646aa"; // purple
const LANG_NAME: Record<string, string> = { DE: "GERMAN", FR: "FRENCH", EN: "ENGLISH" };

export function filterScripts(scripts: Script[], personas?: string[], exclude?: string[]): Script[] {
  let out = scripts;
  if (personas && personas.length) {
    const want = new Set(personas.map((p) => p.trim().toLowerCase()).filter(Boolean));
    out = out.filter((s) => want.has((s.persona ?? "").toLowerCase()));
  }
  if (exclude && exclude.length) {
    const drop = new Set(exclude.map((p) => p.trim().toLowerCase()).filter(Boolean));
    out = out.filter((s) => !drop.has((s.persona ?? "").toLowerCase()));
  }
  return out;
}

function esc(s: string | null | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

function ctaParts(cta: Cta | undefined, native: boolean): [string, string[]] {
  if (!cta) return ["", []];
  const title = native ? cta.on_screen ?? "" : cta.en ?? "";
  return [title, native ? cta.bullets ?? [] : []];
}

function slideCard(label: string, title: string, bullets: string[]): string {
  const items = (bullets ?? []).map((b) => `<li>${esc(b)}</li>`).join("");
  return `<div class="card">
    <div class="card-label">${esc(label)}</div>
    ${title ? `<div class="card-title">${esc(title)}</div>` : ""}
    ${items ? `<ul class="card-bullets">${items}</ul>` : ""}
  </div>`;
}

function nativeBlock(s: Script, lang: string): string {
  const slides = (s.slides ?? [])
    .map((sl: Slide) => slideCard(`Slide ${sl.n ?? ""}`, sl.title ?? "", sl.bullets ?? []))
    .join("");
  let cta = "";
  if (s.cta) {
    const [title, bullets] = ctaParts(s.cta, true);
    cta = slideCard("CTA / Final slide", title, bullets);
  }
  return `<h3 class="block-head native">${lang} SCENARIO <span>— copy/paste this onto your slides</span></h3>
    <div class="cards">${slides}${cta}</div>`;
}

function englishBlock(s: Script): string {
  const slides = (s.slides ?? [])
    .map((sl: Slide) => {
      const bl = (sl.bullets_en ?? []).map((b) => `<li>${esc(b)}</li>`).join("");
      return `<div class="en-slide"><span class="en-num">Slide ${sl.n ?? ""}</span>
        ${sl.title_en ? `<span class="en-title">${esc(sl.title_en)}</span>` : ""}
        ${bl ? `<ul>${bl}</ul>` : ""}</div>`;
    })
    .join("");
  let cta = "";
  if (s.cta) {
    const [title] = ctaParts(s.cta, false);
    if (title) cta = `<div class="en-slide"><span class="en-num">CTA</span><span class="en-title">${esc(title)}</span></div>`;
  }
  return `<h3 class="block-head english">ENGLISH VERSION <span>— for your understanding, not for the slide</span></h3>
    <div class="en-block">${slides}${cta}</div>`;
}

function directionsBlock(s: Script): string {
  const hasDir = (s.slides ?? []).some((sl) => sl.direction);
  if (!hasDir && !s.shot_list) return "";
  const rows = (s.slides ?? [])
    .filter((sl) => sl.direction)
    .map((sl) => `<div class="dir-row"><span class="dir-num">Slide ${sl.n ?? ""}</span><span>${esc(sl.direction)}</span></div>`)
    .join("");
  const shot = s.shot_list
    ? `<div class="dir-row shot"><span class="dir-num">Shot list</span><span>${esc(s.shot_list)}</span></div>`
    : "";
  return `<h3 class="block-head directions">DIRECTIONS &amp; SHOT LIST <span>— notes for you</span></h3>
    <div class="dir-block">${rows}${shot}</div>`;
}

function personaSection(s: Script): string {
  const accent = s.market === "DE" ? ACCENT_DE : ACCENT_FR;
  const lang = LANG_NAME[s.market] ?? (s.language ?? "").toUpperCase();
  return `<section class="persona" style="--accent:${accent}">
    <div class="persona-band">
      <span class="persona-name">${esc(s.persona ?? "")}</span>
      <span class="persona-sub">${esc(s.market)} account · ${esc((s.language ?? "").toUpperCase())} slides</span>
    </div>
    <div class="meta">
      <span class="pill">Format: ${esc(s.format ?? "")}</span>
      <span class="pill">Intensity: ${esc(s.intensity ?? "")}</span>
    </div>
    ${s.why_today ? `<p class="why"><b>Why this angle today:</b> ${esc(s.why_today)}</p>` : ""}
    ${nativeBlock(s, lang)}
    ${englishBlock(s)}
    ${directionsBlock(s)}
  </section>`;
}

function titlePage(data: DailyContent): string {
  const st = data.store_state ?? { in_stock: [], coming_soon: [], banner: "none", restock_signal: "none" };
  const chip = (label: string, val: string, cls: string) => `<div class="chip ${cls}"><span>${esc(label)}</span><b>${esc(val)}</b></div>`;
  const inStock = (st.in_stock ?? []).map((p) => `${p.title} [${p.language}]`).join("; ") || "fully sold out";
  const coming = (st.coming_soon ?? []).map((p) => `${p.title} [${p.language}]`).join("; ");
  return `<section class="title-page">
    <div class="title-top">
      <div class="brand">IvoryShard</div>
      <h1>Pokémon Content</h1>
      <div class="date">${esc(data.date ?? "")}</div>
    </div>
    <div class="chips">
      ${chip("In stock", inStock, "ok")}
      ${coming ? chip("Coming soon", coming, "warn") : ""}
      ${chip("Banner", st.banner ?? "none", "muted")}
      ${chip("Restock signal", st.restock_signal ?? "none", "muted")}
    </div>
    <div class="legend">
      <div class="legend-head">How to read this</div>
      <div class="legend-row"><span class="lg native">SCENARIO</span> The full script in the slide's language — copy/paste straight onto your slides. Nothing else goes on a slide.</div>
      <div class="legend-row"><span class="lg english">ENGLISH</span> The same script in English, so you understand it. Do NOT put this on the slide.</div>
      <div class="legend-row"><span class="lg directions">DIRECTIONS</span> What to film/show per slide + the overall shot list. Notes for you only.</div>
    </div>
  </section>`;
}

const CSS = `
  * { box-sizing: border-box; }
  @page { size: A4; margin: 16mm 14mm 18mm; }
  body { font-family: "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif; color: #21212a; font-size: 11px; line-height: 1.45; margin: 0; }
  h1 { font-size: 30px; margin: 4px 0; letter-spacing: -0.5px; }
  .title-page { page-break-after: always; }
  .brand { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #9646aa; font-weight: 700; }
  .date { font-size: 14px; color: #6b6b78; margin-top: 2px; }
  .title-top { border-bottom: 3px solid #21212a; padding-bottom: 14px; margin-bottom: 16px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
  .chip { border: 1px solid #e6e6ee; border-radius: 8px; padding: 8px 12px; min-width: 140px; }
  .chip span { display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #9a9aa8; }
  .chip b { font-size: 11px; font-weight: 600; }
  .chip.ok { background: #f2fbf4; border-color: #cfead7; }
  .chip.warn { background: #fff8ec; border-color: #f0e2c2; }
  .legend { background: #faf9fd; border: 1px solid #ece9f4; border-radius: 10px; padding: 14px 16px; }
  .legend-head { font-weight: 700; margin-bottom: 8px; }
  .legend-row { margin: 5px 0; color: #4a4a57; }
  .lg { display: inline-block; min-width: 84px; font-weight: 700; font-size: 9px; letter-spacing: 1px; }
  .lg.native { color: #21212a; } .lg.english { color: #5a5f6e; } .lg.directions { color: #a05a1e; }

  .persona { page-break-before: always; }
  .persona-band { background: var(--accent); color: #fff; border-radius: 10px; padding: 12px 16px; display: flex; align-items: baseline; gap: 12px; }
  .persona-name { font-size: 18px; font-weight: 700; }
  .persona-sub { font-size: 11px; opacity: 0.92; }
  .meta { display: flex; gap: 8px; margin: 10px 0 4px; }
  .pill { background: #f3f1f7; border-radius: 999px; padding: 3px 10px; font-size: 10px; color: #555; }
  .why { color: #55525e; margin: 4px 0 10px; }

  .block-head { font-size: 12px; letter-spacing: 0.5px; margin: 16px 0 8px; padding-left: 10px; border-left: 4px solid var(--accent); }
  .block-head span { font-weight: 400; color: #9a9aa8; font-size: 10px; letter-spacing: 0; }
  .block-head.english { border-left-color: #aab; }
  .block-head.directions { border-left-color: #d3a06a; }

  .cards { display: flex; flex-direction: column; gap: 8px; }
  .card { background: #f5f2fb; border: 1px solid #e8e3f4; border-radius: 10px; padding: 10px 14px; page-break-inside: avoid; }
  .card-label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #a99fc0; margin-bottom: 4px; }
  .card-title { font-weight: 700; font-size: 13px; }
  .card-bullets { margin: 6px 0 0; padding-left: 18px; }
  .card-bullets li { margin: 3px 0; }

  .en-block { color: #5a5f6e; }
  .en-slide { margin: 7px 0; page-break-inside: avoid; }
  .en-num { display: inline-block; min-width: 54px; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #aab; }
  .en-title { font-weight: 600; color: #4a4f5e; }
  .en-slide ul { margin: 3px 0 0 0; padding-left: 18px; }

  .dir-block { color: #8a5a28; }
  .dir-row { display: flex; gap: 10px; margin: 5px 0; page-break-inside: avoid; }
  .dir-num { min-width: 54px; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #b08a5a; font-weight: 700; }
  .dir-row.shot { border-top: 1px dashed #e6dcc8; padding-top: 6px; margin-top: 8px; }
`;

function buildHtml(data: DailyContent, scripts: Script[]): string {
  const order: Record<string, number> = { DE: 0, FR: 1 };
  const sorted = [...scripts].sort((a, b) => (order[a.market] ?? 9) - (order[b.market] ?? 9));
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
    <body>${titlePage(data)}${sorted.map(personaSection).join("")}</body></html>`;
}

export async function buildPdf(
  data: DailyContent,
  opts: { personas?: string[]; exclude?: string[] } = {},
): Promise<Buffer> {
  const scripts = filterScripts(data.scripts ?? [], opts.personas, opts.exclude);
  if (!scripts.length) throw new Error("No scripts to render after filtering.");

  const html = buildHtml(data, scripts);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate:
        '<div style="width:100%;font-size:8px;color:#9a9aa8;text-align:center;font-family:Segoe UI,Arial,sans-serif;">IvoryShard daily content — page <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: "16mm", bottom: "18mm", left: "14mm", right: "14mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
