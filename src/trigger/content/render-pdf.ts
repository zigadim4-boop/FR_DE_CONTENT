/**
 * render-pdf — render the day's JSON into PDFs and return them base64-encoded.
 * By default renders BOTH deliverables (operator = everyone except Mila; mila = Mila only),
 * mirroring the old --exclude-personas / --personas split. Pass `which` to render just one.
 */
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";
import { DailyContentSchema } from "../../lib/schema.js";
import { buildPdf } from "../../lib/pdf.js";

export const renderPdf = schemaTask({
  id: "render-pdf",
  schema: z.object({
    data: DailyContentSchema,
    which: z.enum(["both", "operator", "mila"]).default("both"),
  }),
  run: async ({ data, which }) => {
    const out: { operator?: string; mila?: string } = {};
    const date = data.date ?? "content";

    if (which === "both" || which === "operator") {
      const pdf = await buildPdf(data, { exclude: ["Mila"] });
      out.operator = pdf.toString("base64");
    }
    if (which === "both" || which === "mila") {
      const pdf = await buildPdf(data, { personas: ["Mila"] });
      out.mila = pdf.toString("base64");
    }
    return {
      date,
      operatorFilename: `daily_content_${date}.pdf`,
      milaFilename: `daily_content_mila_${date}.pdf`,
      ...out,
    };
  },
});
