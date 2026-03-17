import { isVoiceCompatibleAudio } from "../../media/audio.js";

/** BearClaw: only Telegram; loadWebMedia (WhatsApp) stubbed. */
async function loadWebMediaStub(
  _url: string,
  _opts?: { maxBytes?: number; mediaLocalRoots?: readonly string[] },
): Promise<never> {
  throw new Error("loadWebMedia is not available (BearClaw: only Telegram)");
}
import { mediaKindFromMime } from "../../media/constants.js";
import { getImageMetadata, resizeToJpeg } from "../../media/image-ops.js";
import { detectMime } from "../../media/mime.js";
import type { PluginRuntime } from "./types.js";

export function createRuntimeMedia(): PluginRuntime["media"] {
  return {
    loadWebMedia: loadWebMediaStub,
    detectMime,
    mediaKindFromMime,
    isVoiceCompatibleAudio,
    getImageMetadata,
    resizeToJpeg,
  };
}
