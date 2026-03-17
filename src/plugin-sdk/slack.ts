/** BearClaw: only Telegram. Slack exports stubbed. */
import type { ChannelMessageActionName } from "../channels/plugins/types.js";
export type { OpenClawConfig } from "../config/config.js";
export type { SlackAccountConfig } from "../config/types.slack.js";
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
export { formatDocsLink } from "../terminal/links.js";
export {
  projectCredentialSnapshotFields,
  resolveConfiguredFromCredentialStatuses,
  resolveConfiguredFromRequiredCredentialStatuses,
} from "../channels/account-snapshot-fields.js";
export {
  listSlackDirectoryGroupsFromConfig,
  listSlackDirectoryPeersFromConfig,
} from "../channels/plugins/directory-config.js";
export {
  looksLikeSlackTargetId,
  normalizeSlackMessagingTarget,
} from "../channels/plugins/normalize/slack.js";
export {
  resolveDefaultGroupPolicy,
  resolveOpenProviderRuntimeGroupPolicy,
} from "../config/runtime-group-policy.js";
export {
  resolveSlackGroupRequireMention,
  resolveSlackGroupToolPolicy,
} from "../channels/plugins/group-mentions.js";
export { SlackConfigSchema } from "../config/zod-schema.providers-core.js";
export { buildComputedAccountStatusSnapshot } from "./status-helpers.js";
export { parseSlackTarget, resolveSlackChannelId } from "./slack-targets.js";
export { handleSlackMessageAction } from "./slack-message-actions.js";
export type { SlackActionContext } from "../agents/tools/slack-actions.js";
export { createSlackActions } from "../channels/plugins/slack.actions.js";

/** BearClaw: stub plugin for tests; real Slack extension removed. */
export const slackPlugin = {
  id: "slack" as const,
  meta: { name: "Slack (stub)" },
  capabilities: {},
  config: {},
} as any;

const NA = "BearClaw: only Telegram; Slack is not available";
export type InspectedSlackAccount = {
  config?: {
    allowFrom?: unknown;
    channels?: Record<string, { users?: string[] }>;
    dms?: Record<string, unknown>;
  };
  dm?: { allowFrom?: unknown };
  channels?: Record<string, unknown>;
};
export type ResolvedSlackAccount = {
  config?: { userTokenReadOnly?: boolean; mediaMaxMb?: number };
  actions?: Record<string, boolean | undefined>;
  userToken?: string;
  botToken?: string;
  accountId?: string;
  channelId?: string;
  mediaMaxMb?: number;
};

export function listEnabledSlackAccounts(): string[] {
  return [];
}
export function listSlackAccountIds(): string[] {
  return [];
}
export function resolveDefaultSlackAccountId(): string {
  return "";
}
export function resolveSlackAccount(
  _opts: string | { cfg?: import("../config/config.js").OpenClawConfig; accountId?: string },
): ResolvedSlackAccount {
  throw new Error(NA);
}
export function resolveSlackReplyToMode(): string {
  return "";
}
export function isSlackInteractiveRepliesEnabled(_opts?: { cfg?: unknown }): boolean {
  return false;
}
export function inspectSlackAccount(_params?: { cfg?: unknown; accountId?: string }): InspectedSlackAccount | null {
  return null;
}
export function extractSlackToolSend(_args?: unknown): { to: string; channelId?: string; accountId?: string } | null {
  throw new Error(NA);
}
export function listSlackMessageActions(_cfg?: unknown): ChannelMessageActionName[] {
  return [];
}
export function buildSlackThreadingToolContext(): never {
  throw new Error(NA);
}
export function parseSlackBlocksInput(_blocks?: unknown): unknown[] {
  return [];
}
export function buildSlackInteractiveBlocks(_interactive?: unknown): never {
  throw new Error(NA);
}
export function handleSlackHttpRequest(): never {
  throw new Error(NA);
}
export function sendMessageSlack(): never {
  throw new Error(NA);
}
export function deleteSlackMessage(_channelId: string, _messageId: string, _opts?: unknown): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function downloadSlackFile(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function editSlackMessage(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function getSlackMemberInfo(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function listSlackEmojis(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function listSlackPins(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function listSlackReactions(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function pinSlackMessage(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function reactSlackMessage(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function readSlackMessages(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function removeOwnSlackReactions(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function removeSlackReaction(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function sendSlackMessage(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function unpinSlackMessage(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function recordSlackThreadParticipation(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
