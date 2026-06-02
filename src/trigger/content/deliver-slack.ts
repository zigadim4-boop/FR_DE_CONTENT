/**
 * deliver-slack — post a rendered PDF (base64) to a Slack channel. Replaces the old send_gmail.py.
 * The orchestrator calls this twice (operator channel + Mila channel).
 */
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";
import { uploadPdfToChannel } from "../../lib/slack.js";

export const deliverSlack = schemaTask({
  id: "deliver-slack",
  schema: z.object({
    channel: z.string(), // Slack channel ID
    filename: z.string(),
    title: z.string(),
    pdfBase64: z.string(),
    comment: z.string().optional(),
  }),
  run: async ({ channel, filename, title, pdfBase64, comment }) => {
    const pdf = Buffer.from(pdfBase64, "base64");
    await uploadPdfToChannel({ channel, filename, pdf, title, comment });
    console.log(`Posted ${filename} (${pdf.length} bytes) to channel ${channel}`);
    return { ok: true, channel, filename, bytes: pdf.length };
  },
});
