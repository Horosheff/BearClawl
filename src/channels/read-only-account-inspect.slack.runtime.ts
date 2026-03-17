import {
  inspectSlackAccount as inspectSlackAccountImpl,
  type InspectedSlackAccount,
} from "../plugin-sdk/slack.js";

export type { InspectedSlackAccount } from "../plugin-sdk/slack.js";

type InspectSlackAccount = typeof import("../plugin-sdk/slack.js").inspectSlackAccount;

export function inspectSlackAccount(
  ...args: Parameters<InspectSlackAccount>
): Promise<InspectedSlackAccount | null> {
  return Promise.resolve(inspectSlackAccountImpl(...args));
}
