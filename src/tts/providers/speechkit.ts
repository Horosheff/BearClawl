/**
 * Yandex SpeechKit TTS provider.
 * REST API: https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize
 * Auth: IAM token or API key (YANDEX_API_KEY / YC_API_KEY) + folderId.
 * @see https://aistudio.yandex.ru/docs/ru/speechkit/overview.html
 */

import type { SpeechProviderPlugin } from "../../plugins/types.js";
import type { SpeechVoiceOption } from "../provider-types.js";
import { fetchWithTimeout } from "../../utils/fetch-timeout.js";

const SPEECHKIT_TTS_URL = "https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize";
const DEFAULT_VOICE = "alena";
const DEFAULT_LANG = "ru-RU";
const DEFAULT_FORMAT = "mp3";

/** Стандартные голоса SpeechKit (ru-RU и др.) */
const SPEECHKIT_VOICES: SpeechVoiceOption[] = [
  { id: "alena", name: "Алена", locale: "ru-RU", gender: "female" },
  { id: "filipp", name: "Филипп", locale: "ru-RU", gender: "male" },
  { id: "ermil", name: "Ермил", locale: "ru-RU", gender: "male" },
  { id: "oksana", name: "Оксана", locale: "ru-RU", gender: "female" },
  { id: "jane", name: "Джейн", locale: "ru-RU", gender: "female" },
  { id: "omazh", name: "Омаж", locale: "ru-RU", gender: "female" },
  { id: "zahar", name: "Захар", locale: "ru-RU", gender: "male" },
  { id: "marina", name: "Марина", locale: "ru-RU", gender: "female" },
];

async function speechKitSynthesize(params: {
  text: string;
  apiKey: string;
  folderId?: string;
  voice?: string;
  lang?: string;
  format?: string;
  timeoutMs?: number;
}): Promise<Buffer> {
  const voice = params.voice?.trim() || DEFAULT_VOICE;
  const lang = params.lang?.trim() || DEFAULT_LANG;
  const format = params.format?.trim() || DEFAULT_FORMAT;
  const body = new URLSearchParams({
    text: params.text,
    lang,
    voice,
    format,
    ...(params.folderId ? { folderId: params.folderId } : {}),
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${params.apiKey}`,
  };
  if (params.folderId) {
    headers["x-folder-id"] = params.folderId;
  }

  const res = await fetchWithTimeout(
    SPEECHKIT_TTS_URL,
    {
      method: "POST",
      headers,
      body: body.toString(),
    },
    params.timeoutMs ?? 30_000,
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`SpeechKit TTS error (${res.status}): ${errText || res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export function listSpeechKitVoices(): Promise<SpeechVoiceOption[]> {
  return Promise.resolve(SPEECHKIT_VOICES);
}

export function buildSpeechKitSpeechProvider(): SpeechProviderPlugin {
  return {
    id: "speechkit",
    label: "Yandex SpeechKit",
    voices: SPEECHKIT_VOICES.map((v) => v.id),
    listVoices: async () => listSpeechKitVoices(),
    isConfigured: ({ config }) =>
      Boolean(
        config.speechkit.apiKey ||
          process.env.YANDEX_API_KEY ||
          process.env.YC_API_KEY,
      ),
    synthesize: async (req) => {
      const apiKey =
        req.config.speechkit.apiKey ||
        process.env.YANDEX_API_KEY ||
        process.env.YC_API_KEY;
      if (!apiKey) {
        throw new Error(
          "SpeechKit: задайте YANDEX_API_KEY или YC_API_KEY, либо messages.tts.speechkit.apiKey",
        );
      }
      const format = req.config.speechkit.format || DEFAULT_FORMAT;
      const audioBuffer = await speechKitSynthesize({
        text: req.text,
        apiKey,
        folderId: req.config.speechkit.folderId,
        voice: req.config.speechkit.voice,
        lang: req.config.speechkit.lang,
        format,
        timeoutMs: req.config.timeoutMs,
      });
      const fileExtension = format === "lpcm" ? ".raw" : `.${format}`;
      return {
        audioBuffer,
        outputFormat: format,
        fileExtension,
        voiceCompatible: format === "opus" || format === "mp3",
      };
    },
  };
}
