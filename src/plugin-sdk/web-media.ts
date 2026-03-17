/** BearClaw: only Telegram. WhatsApp web-media stubs. */

export type WebMediaResult = {
  buffer: Buffer;
  mime?: string;
  contentType?: string;
  fileName?: string;
  kind?: string;
};

export type LoadWebMediaOptions = {
  maxBytes?: number;
  mediaLocalRoots?: readonly string[];
  localRoots?: readonly string[];
  sandboxValidated?: boolean;
  readFile?: (path: string) => Promise<Buffer>;
  optimizeImages?: boolean;
};

const NOT_AVAILABLE = "BearClaw: only Telegram; WhatsApp web-media is not available";

export function getDefaultLocalRoots(): string[] {
  return [];
}

export async function loadWebMedia(
  _url: string,
  _opts?: LoadWebMediaOptions | number,
): Promise<WebMediaResult> {
  throw new Error(NOT_AVAILABLE);
}

export async function loadWebMediaRaw(
  _url: string,
  _opts?: {
    maxBytes?: number;
    sandboxValidated?: boolean;
    localRoots?: readonly string[];
    readFile?: (path: string) => Promise<Buffer>;
  },
): Promise<WebMediaResult> {
  throw new Error(NOT_AVAILABLE);
}

export async function optimizeImageToJpeg(_input: Buffer | string): Promise<Buffer> {
  throw new Error(NOT_AVAILABLE);
}
