/** BearClaw: only Telegram. iMessage exports stubbed. */
export type { IMessageAccountConfig } from "../config/types.js";
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
export { detectBinary } from "../plugins/setup-binary.js";
export { formatDocsLink } from "../terminal/links.js";
export {
  formatTrimmedAllowFromEntries,
  resolveIMessageConfigAllowFrom,
  resolveIMessageConfigDefaultTo,
} from "./channel-config-helpers.js";
export {
  looksLikeIMessageTargetId,
  normalizeIMessageMessagingTarget,
} from "../channels/plugins/normalize/imessage.js";
export {
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
} from "../config/runtime-group-policy.js";
export {
  resolveIMessageGroupRequireMention,
  resolveIMessageGroupToolPolicy,
} from "../channels/plugins/group-mentions.js";
export { IMessageConfigSchema } from "../config/zod-schema.providers-core.js";
export { resolveChannelMediaMaxBytes } from "../channels/plugins/media-limits.js";
export { collectStatusIssuesFromLastError } from "./status-helpers.js";

/** BearClaw: stub plugin for tests; real iMessage extension removed. */
export const imessagePlugin = {
  id: "imessage" as const,
  meta: { name: "iMessage (stub)" },
  capabilities: {},
  config: {},
} as any;

const NA = "BearClaw: only Telegram; iMessage is not available";
export type ParsedChatTarget = { chatId?: string; service?: string };
export function parseChatAllowTargetPrefixes(): string[] {
  return [];
}
export function parseChatTargetPrefixesOrThrow(): never {
  throw new Error(NA);
}
export function resolveServicePrefixedAllowTarget(): never {
  throw new Error(NA);
}
export function resolveServicePrefixedTarget(): never {
  throw new Error(NA);
}
export function sendMessageIMessage(): Promise<never> {
  return Promise.reject(new Error(NA));
}
