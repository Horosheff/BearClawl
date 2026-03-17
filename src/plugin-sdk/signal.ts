/** BearClaw: only Telegram. Signal exports stubbed. */
export type { ChannelMessageActionAdapter } from "../channels/plugins/types.js";
export type { OpenClawConfig } from "../config/config.js";
export type { SignalAccountConfig } from "../config/types.js";
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
  looksLikeSignalTargetId,
  normalizeSignalMessagingTarget,
} from "../channels/plugins/normalize/signal.js";
export { detectBinary } from "../plugins/setup-binary.js";
export { installSignalCli } from "../plugins/signal-cli-install.js";
export {
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
} from "../config/runtime-group-policy.js";
export { SignalConfigSchema } from "../config/zod-schema.providers-core.js";
export { normalizeE164 } from "../utils.js";
export { resolveChannelMediaMaxBytes } from "../channels/plugins/media-limits.js";
export {
  buildBaseAccountStatusSnapshot,
  buildBaseChannelStatusSummary,
  collectStatusIssuesFromLastError,
  createDefaultChannelRuntimeState,
} from "./status-helpers.js";

/** BearClaw: stub plugin for tests; real Signal extension removed. */
export const signalPlugin = {
  id: "signal" as const,
  meta: { name: "Signal (stub)" },
  capabilities: {},
  config: {},
} as any;

const NA = "BearClaw: only Telegram; Signal is not available";
export type ResolvedSignalAccount = Record<string, unknown>;

export function listEnabledSignalAccounts(): string[] {
  return [];
}
export function listSignalAccountIds(): string[] {
  return [];
}
export function resolveDefaultSignalAccountId(): string {
  return "";
}
export function resolveSignalAccount(_accountId: string): ResolvedSignalAccount {
  throw new Error(NA);
}
export function resolveSignalReactionLevel(_opts?: {
  cfg?: unknown;
  accountId?: string;
}): { agentReactionGuidance: "minimal" | "extensive" | "none" } {
  return { agentReactionGuidance: "none" };
}
export function removeReactionSignal(): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function sendReactionSignal(): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function sendMessageSignal(): Promise<never> {
  return Promise.reject(new Error(NA));
}
