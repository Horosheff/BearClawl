/** BearClaw: only Telegram. Slack stubs. */
export type SlackTargetKind = "channel" | "user";
export type SlackTarget = { id: string; kind: SlackTargetKind; normalized: string; raw?: string };

export function parseSlackTarget(_raw: string, _opts?: { defaultKind?: SlackTargetKind }): SlackTarget | null {
  return null;
}
export function resolveSlackChannelId(_raw: string): string {
  return "";
}
