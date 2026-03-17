export type {
  ChannelAccountSnapshot,
  ChannelGatewayContext,
  ChannelMessageActionAdapter,
} from "../channels/plugins/types.js";
export type { OpenClawConfig } from "../config/config.js";
export type { DiscordAccountConfig, DiscordActionConfig } from "../config/types.js";
/** BearClaw: only Telegram. Discord types stubbed. */
export type DiscordPluralKitConfig = Record<string, unknown>;
export type InspectedDiscordAccount = {
  config?: {
    allowFrom?: unknown;
    dm?: { allowFrom?: unknown };
    dms?: Record<string, unknown>;
    guilds?: Record<string, { users?: string[]; channels?: Record<string, { users?: string[] }> }>;
  };
};
export type ResolvedDiscordAccount = Record<string, unknown>;
export type DiscordSendComponents = unknown;
export type DiscordSendEmbeds = unknown;
export type ThreadBindingManager = unknown;
export type ThreadBindingRecord = unknown;
export type ThreadBindingTargetKind = string;
export type {
  ChannelConfiguredBindingProvider,
  ChannelConfiguredBindingConversationRef,
  ChannelConfiguredBindingMatch,
} from "../channels/plugins/types.adapters.js";
export type {
  ChannelMessageActionContext,
  ChannelPlugin,
  OpenClawPluginApi,
  PluginRuntime,
} from "./channel-plugin-common.js";

/** BearClaw: stub plugin for tests; real Discord extension removed. */
export const discordPlugin = {
  id: "discord" as const,
  meta: { name: "Discord (stub)" },
  capabilities: {},
  config: {},
} as any;
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
} from "../channels/account-snapshot-fields.js";
export {
  listDiscordDirectoryGroupsFromConfig,
  listDiscordDirectoryPeersFromConfig,
} from "../channels/plugins/directory-config.js";

export {
  resolveDefaultGroupPolicy,
  resolveOpenProviderRuntimeGroupPolicy,
} from "../config/runtime-group-policy.js";
export {
  resolveDiscordGroupRequireMention,
  resolveDiscordGroupToolPolicy,
} from "../channels/plugins/group-mentions.js";
export { DiscordConfigSchema } from "../config/zod-schema.providers-core.js";

export {
  buildComputedAccountStatusSnapshot,
  buildTokenChannelStatusSummary,
} from "./status-helpers.js";

const NA = "BearClaw: only Telegram; Discord is not available";
function stub(): never {
  throw new Error(NA);
}
function stubAsync(..._args: unknown[]): Promise<never> {
  return Promise.reject(new Error(NA));
}
export function createDiscordActionGate(_opts?: { cfg?: unknown; accountId?: string }): never {
  throw new Error(NA);
}
export function listDiscordAccountIds(): string[] {
  return [];
}
export function resolveDefaultDiscordAccountId(): string {
  return "";
}
export function resolveDiscordAccount(_accountId: string): ResolvedDiscordAccount {
  throw new Error(NA);
}
export function inspectDiscordAccount(_params?: { cfg?: unknown; accountId?: string }): Promise<InspectedDiscordAccount | null> {
  return Promise.resolve(null);
}
export function looksLikeDiscordTargetId(): boolean {
  return false;
}
export function parseDiscordTarget(
  _raw: string,
  _opts?: { defaultKind?: string },
): { id: string; kind: "user" | "channel" } | null {
  return null;
}
export function normalizeDiscordMessagingTarget(_raw: string): string | undefined {
  return undefined;
}
export function normalizeDiscordOutboundTarget(): never {
  throw new Error(NA);
}
export function collectDiscordAuditChannelIds(): never {
  throw new Error(NA);
}
export function collectDiscordStatusIssues(): never {
  throw new Error(NA);
}
export const DISCORD_DEFAULT_INBOUND_WORKER_TIMEOUT_MS = 0;
export const DISCORD_DEFAULT_LISTENER_TIMEOUT_MS = 0;
export function normalizeExplicitDiscordSessionKey(_key: string): string {
  return "";
}
export function autoBindSpawnedDiscordSubagent(): never {
  throw new Error(NA);
}
export function listThreadBindingsBySessionKey(): never {
  throw new Error(NA);
}
export function unbindThreadBindingsBySessionKey(): never {
  throw new Error(NA);
}
export function getGateway(_accountId?: string): { isConnected: boolean; updatePresence?: (data: unknown) => Promise<unknown> } | null {
  throw new Error(NA);
}
export function getPresence(_accountId?: string, _userId?: string): { activities?: unknown[]; status?: string } | null {
  return null;
}
export function readDiscordComponentSpec(_raw: unknown): { text?: string; [key: string]: unknown } | null {
  throw new Error(NA);
}
export function resolveDiscordChannelId(_raw: string): string | null {
  return null;
}
export const addRoleDiscord = stubAsync;
export const banMemberDiscord = stubAsync;
export const createChannelDiscord = stubAsync;
export const createScheduledEventDiscord = stubAsync;
export const createThreadDiscord = stubAsync;
export const deleteChannelDiscord = stubAsync;
export const deleteMessageDiscord = stubAsync;
export const editChannelDiscord = stubAsync;
export const editMessageDiscord = stubAsync;
export const fetchChannelInfoDiscord = stubAsync;
export const fetchChannelPermissionsDiscord = stubAsync;
export const fetchMemberInfoDiscord = stubAsync;
export const fetchMessageDiscord = stubAsync;
export const fetchReactionsDiscord = stubAsync;
export const fetchRoleInfoDiscord = stubAsync;
export const fetchVoiceStatusDiscord = stubAsync;
export const hasAnyGuildPermissionDiscord = stubAsync;
export const kickMemberDiscord = stubAsync;
export const listGuildChannelsDiscord = stubAsync;
export const listGuildEmojisDiscord = stubAsync;
export const listPinsDiscord = stubAsync;
export const listScheduledEventsDiscord = stubAsync;
export const listThreadsDiscord = stubAsync;
export const moveChannelDiscord = stubAsync;
export const pinMessageDiscord = stubAsync;
export const reactMessageDiscord = stubAsync;
export const readMessagesDiscord = stubAsync;
export const removeChannelPermissionDiscord = stubAsync;
export const removeOwnReactionsDiscord = stubAsync;
export const removeReactionDiscord = stubAsync;
export const removeRoleDiscord = stubAsync;
export const searchMessagesDiscord = stubAsync;
export const sendDiscordComponentMessage = stubAsync;
export const sendMessageDiscord = stubAsync;
export const sendPollDiscord = stubAsync;
export const sendStickerDiscord = stubAsync;
export const sendVoiceMessageDiscord = stubAsync;
export const setChannelPermissionDiscord = stubAsync;
export const timeoutMemberDiscord = stubAsync;
export const unpinMessageDiscord = stubAsync;
export const uploadEmojiDiscord = stubAsync;
export const uploadStickerDiscord = stubAsync;
export const discordMessageActions = { execute: stubAsync };
