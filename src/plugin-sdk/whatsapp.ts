/** BearClaw: only Telegram. WhatsApp exports stubbed. */
export type { ChannelMessageActionName } from "../channels/plugins/types.js";
export type { OpenClawConfig } from "../config/config.js";
export type { DmPolicy, GroupPolicy, WhatsAppAccountConfig } from "../config/types.js";
export type {
  ChannelMessageActionContext,
  ChannelPlugin,
  OpenClawPluginApi,
  PluginRuntime,
} from "./channel-plugin-common.js";
export {
  DEFAULT_ACCOUNT_ID,
  PAIRING_APPROVED_MESSAGE,
  applyAccountNameToChannelSection,
  buildChannelConfigSchema,
  deleteAccountFromConfigSection,
  emptyPluginConfigSchema,
  formatPairingApproveHint,
  getChatChannelMeta,
  migrateBaseNameToDefaultAccount,
  normalizeAccountId,
  setAccountEnabledInConfigSection,
} from "./channel-plugin-common.js";
export { formatCliCommand } from "../cli/command-format.js";
export { formatDocsLink } from "../terminal/links.js";
export {
  formatWhatsAppConfigAllowFromEntries,
  resolveWhatsAppConfigAllowFrom,
  resolveWhatsAppConfigDefaultTo,
} from "./channel-config-helpers.js";
export {
  listWhatsAppDirectoryGroupsFromConfig,
  listWhatsAppDirectoryPeersFromConfig,
} from "../channels/plugins/directory-config.js";
export { normalizeWhatsAppAllowFromEntries } from "../channels/plugins/normalize/whatsapp.js";
export {
  collectAllowlistProviderGroupPolicyWarnings,
  collectOpenGroupPolicyRouteAllowlistWarnings,
} from "../channels/plugins/group-policy-warnings.js";
export { buildAccountScopedDmSecurityPolicy } from "../channels/plugins/helpers.js";
export { resolveWhatsAppOutboundTarget } from "../whatsapp/resolve-outbound-target.js";
export { isWhatsAppGroupJid, normalizeWhatsAppTarget } from "../whatsapp/normalize.js";
export {
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
} from "../config/runtime-group-policy.js";
export {
  resolveWhatsAppGroupRequireMention,
  resolveWhatsAppGroupToolPolicy,
} from "../channels/plugins/group-mentions.js";
export {
  createWhatsAppOutboundBase,
  resolveWhatsAppGroupIntroHint,
  resolveWhatsAppMentionStripRegexes,
} from "../channels/plugins/whatsapp-shared.js";
export { resolveWhatsAppHeartbeatRecipients } from "../channels/plugins/whatsapp-heartbeat.js";
export { WhatsAppConfigSchema } from "../config/zod-schema.providers-whatsapp.js";
export { createActionGate, readStringParam } from "../agents/tools/common.js";
export { createPluginRuntimeStore } from "./runtime-store.js";
export { normalizeE164 } from "../utils.js";
export {
  getDefaultLocalRoots,
  loadWebMedia,
  loadWebMediaRaw,
  optimizeImageToJpeg,
} from "./web-media.js";

/** BearClaw: stub plugin for tests; real WhatsApp extension removed. */
export const whatsappPlugin = {
  id: "whatsapp" as const,
  meta: { name: "WhatsApp (stub)" },
  capabilities: {},
  config: {},
} as any;

const NA = "BearClaw: only Telegram; WhatsApp is not available";

export type WebChannelStatus = Record<string, unknown>;
export type WebMonitorTuning = Record<string, unknown>;
export type WebInboundMessage = Record<string, unknown>;
export type WebListenerCloseReason = string;

export function hasAnyWhatsAppAuth(_cfg?: unknown): boolean {
  return false;
}
export function listEnabledWhatsAppAccounts(): string[] {
  return [];
}
export function resolveWhatsAppAccount(_opts?: { cfg?: unknown; accountId?: string }): { allowFrom?: string[] } {
  throw new Error(NA);
}
export const WA_WEB_AUTH_DIR = "";
export function logWebSelfId(): void {}
export function logoutWeb(): Promise<void> {
  return Promise.resolve();
}
export function pickWebChannel(): never {
  throw new Error(NA);
}
export function webAuthExists(): boolean {
  return false;
}
export const DEFAULT_WEB_MEDIA_BYTES = 0;
export const HEARTBEAT_PROMPT = "";
export const HEARTBEAT_TOKEN = "";
export function monitorWebChannel(): never {
  throw new Error(NA);
}
export function resolveHeartbeatRecipients(): never {
  throw new Error(NA);
}
export function runWebHeartbeatOnce(): never {
  throw new Error(NA);
}
export function extractMediaPlaceholder(): never {
  throw new Error(NA);
}
export function extractText(): never {
  throw new Error(NA);
}
export function monitorWebInbox(): never {
  throw new Error(NA);
}
export function loginWeb(): never {
  throw new Error(NA);
}
export function sendMessageWhatsApp(
  _to: string,
  _text: string,
  _opts?: { verbose?: boolean; cfg?: unknown; accountId?: string; gifPlayback?: unknown; mediaUrl?: string; mediaLocalRoots?: string[] },
): Promise<{ messageId: string }> {
  return Promise.reject(new Error(NA));
}
export function sendPollWhatsApp(
  _to: string,
  _poll: unknown,
  _opts?: { verbose?: boolean; accountId?: string; cfg?: unknown },
): Promise<{ messageId: string; toJid?: string; channelId?: string; conversationId?: string; pollId?: string }> {
  return Promise.reject(new Error(NA));
}
export function sendReactionWhatsApp(): never {
  throw new Error(NA);
}
export function createWaSocket(): never {
  throw new Error(NA);
}
export function formatError(): string {
  return NA;
}
export function getStatusCode(): number {
  return 0;
}
export function waitForWaConnection(): never {
  throw new Error(NA);
}
export function createWhatsAppLoginTool(): never {
  throw new Error(NA);
}
