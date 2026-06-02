/**
 * Slack delivery helper. Uploads a PDF (as a Buffer) to a target and posts it.
 * The target can be a channel ID (C…/D…) OR a user ID (U…) — for a user ID we open a direct
 * message first (needs the bot's `im:write` scope) so each person gets the PDF as a private DM.
 * Uses @slack/web-api files.uploadV2 (the supported file-upload flow).
 */
import { WebClient } from "@slack/web-api";
import { requireEnv } from "./env.js";

let _client: WebClient | null = null;

function slack(): WebClient {
  if (!_client) _client = new WebClient(requireEnv("SLACK_BOT_TOKEN"));
  return _client;
}

/** Turn a user ID (U…) into a DM channel ID; pass channel IDs through unchanged. */
async function resolveChannelId(target: string): Promise<string> {
  if (target.startsWith("U")) {
    const res = await slack().conversations.open({ users: target });
    const id = res.channel?.id;
    if (!id) throw new Error(`Could not open a DM with user ${target}`);
    return id;
  }
  return target;
}

export async function uploadPdfToChannel(opts: {
  channel: string; // channel ID or user ID (for a DM)
  filename: string;
  pdf: Buffer;
  title: string;
  comment?: string;
}): Promise<void> {
  const channelId = await resolveChannelId(opts.channel);
  await slack().files.uploadV2({
    channel_id: channelId,
    file: opts.pdf,
    filename: opts.filename,
    title: opts.title,
    initial_comment: opts.comment ?? opts.title,
  });
}
