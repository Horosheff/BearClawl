import type { ModelProviderConfig } from "openclaw/plugin-sdk/provider-models";

// Yandex AI Studio: OpenAI-compatible API
// https://llm.api.cloud.yandex.net/v1, header x-folder-id, model id = gpt://{folderId}/{model}
// Auth: YANDEX_API_KEY or YC_API_KEY; YANDEX_FOLDER_ID or YC_FOLDER_ID required.
// Модели: базовый инстанс, выделенные инстансы, пакетная обработка, мультимодальные — по доке AI Studio.
export const YANDEXGPT_BASE_URL = "https://llm.api.cloud.yandex.net/v1";
export const YANDEXGPT_DEFAULT_MODEL_ID = "latest";

const YANDEXGPT_DEFAULT_CONTEXT_WINDOW = 32_000;
const YANDEXGPT_DEFAULT_MAX_TOKENS = 8_192;
const YANDEXGPT_DEFAULT_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

type ModelSpec = {
  uri: string;
  name: string;
  context: number;
  input: readonly ["text"] | readonly ["text", "image"];
};

/** Текстовые модели: пакетная обработка и выделенные инстансы (документация AI Studio). */
const AI_STUDIO_TEXT_MODELS: ModelSpec[] = [
  { uri: "yandexgpt/latest", name: "YandexGPT Pro (latest)", context: 32_768, input: ["text"] },
  { uri: "yandexgpt/rc", name: "YandexGPT Pro (rc)", context: 32_768, input: ["text"] },
  { uri: "yandexgpt-lite", name: "YandexGPT Lite", context: 32_768, input: ["text"] },
  { uri: "qwen2.5-7b-instruct", name: "Qwen 2.5 7B Instruct", context: 32_768, input: ["text"] },
  { uri: "qwen2.5-72b-instruct", name: "Qwen 2.5 72B Instruct", context: 16_384, input: ["text"] },
  { uri: "qwq-32b", name: "QwQ 32B Instruct", context: 32_768, input: ["text"] },
  { uri: "llama3.3-70b-instruct", name: "Llama 3.3 70B Instruct", context: 16_384, input: ["text"] },
  { uri: "llama3.1-70b-instruct", name: "Llama 3.1 70B Instruct", context: 8_192, input: ["text"] },
  { uri: "deepseek-r1-distill-llama-70b", name: "DeepSeek-R1 Distill Llama 70B", context: 8_192, input: ["text"] },
  { uri: "qwen2.5-32b-instruct", name: "Qwen2.5 32B Instruct", context: 32_768, input: ["text"] },
  { uri: "deepseek-r1-distill-qwen-32b", name: "DeepSeek-R1 Distill Qwen 32B", context: 32_768, input: ["text"] },
  { uri: "phi-4", name: "phi-4", context: 16_384, input: ["text"] },
  { uri: "gemma-3-1b-it", name: "Gemma 3 1B it", context: 32_768, input: ["text"] },
  { uri: "gemma-3-4b-it", name: "Gemma 3 4B it", context: 131_072, input: ["text"] },
  { uri: "gemma-3-12b-it", name: "Gemma 3 12B it", context: 65_536, input: ["text"] },
  { uri: "gemma-3-27b-it", name: "Gemma 3 27B it", context: 30_720, input: ["text"] },
  { uri: "qwen3-0.6b", name: "Qwen3 0.6B", context: 32_768, input: ["text"] },
  { uri: "qwen3-1.7b", name: "Qwen3 1.7B", context: 32_768, input: ["text"] },
  { uri: "qwen3-4b", name: "Qwen3 4B", context: 32_768, input: ["text"] },
  { uri: "qwen3-8b", name: "Qwen3 8B", context: 32_768, input: ["text"] },
  { uri: "qwen3-14b", name: "Qwen3 14B", context: 32_768, input: ["text"] },
  { uri: "qwen3-32b", name: "Qwen3 32B", context: 32_768, input: ["text"] },
  { uri: "qwen3-30b-a3b", name: "Qwen3 30B A3B", context: 32_768, input: ["text"] },
  { uri: "qwen3-235b-a22b", name: "Qwen3 235B A22B", context: 32_768, input: ["text"] },
  { uri: "qwen3-235b-a22b-fp8/latest", name: "Qwen3 235B (fp8)", context: 262_000, input: ["text"] },
  { uri: "gpt-oss-120b/latest", name: "GPT-OSS 120B", context: 131_000, input: ["text"] },
  { uri: "gpt-oss-20b/latest", name: "GPT-OSS 20B", context: 131_000, input: ["text"] },
];

/** Мультимодальные модели (документация AI Studio). */
const AI_STUDIO_VISION_MODELS: ModelSpec[] = [
  { uri: "qwen2-vl-7b-instruct/", name: "Qwen2 VL 7B", context: 16_384, input: ["text", "image"] },
  { uri: "qwen2.5-vl-7b-instruct/", name: "Qwen2.5 VL 7B", context: 16_384, input: ["text", "image"] },
  { uri: "qwen2.5-vl-32b-instruct/", name: "Qwen 2.5 VL 32B Instruct", context: 4_096, input: ["text", "image"] },
  { uri: "deepseek-vl2/", name: "DeepSeek VL2", context: 4_096, input: ["text", "image"] },
  { uri: "deepseek-vl2-tiny/", name: "DeepSeek VL2 Tiny", context: 4_096, input: ["text", "image"] },
];

function modelEntry(
  id: string,
  name: string,
  contextWindow: number,
  maxTokens: number,
  input: readonly ["text"] | readonly ["text", "image"] = ["text"],
) {
  return {
    id,
    name,
    reasoning: false,
    input,
    cost: YANDEXGPT_DEFAULT_COST,
    contextWindow,
    maxTokens,
  };
}

/** Build provider for Yandex AI Studio (OpenAI-compatible). folderId required for model URIs. */
export function buildYandexgptProvider(params?: {
  folderId?: string;
}): ModelProviderConfig {
  const folderId = params?.folderId?.trim();
  const prefix = folderId ? `gpt://${folderId}/` : "";

  const textModels = AI_STUDIO_TEXT_MODELS.map((m) =>
    modelEntry(
      `${prefix}${m.uri}`,
      m.name,
      m.context,
      Math.min(8_192, Math.floor(m.context / 4)),
      m.input,
    ),
  );
  const visionModels =
    folderId ?
      AI_STUDIO_VISION_MODELS.map((m) =>
        modelEntry(
          `${prefix}${m.uri}`,
          m.name,
          m.context,
          Math.min(4_096, Math.floor(m.context / 4)),
          m.input,
        ),
      )
    : [];

  return {
    baseUrl: YANDEXGPT_BASE_URL,
    api: "openai-completions",
    ...(folderId
      ? {
          headers: {
            "x-folder-id": folderId,
            "x-data-logging-enabled": "false",
          },
        }
      : {}),
    models: [...textModels, ...visionModels],
  };
}

/** Resolve short model id to full AI Studio URI when folderId is available. */
export function getYandexFolderId(params: {
  config?: { models?: { providers?: Record<string, { folderId?: string }> } };
  env?: NodeJS.ProcessEnv;
}): string | undefined {
  const cfg = params.config?.models?.providers?.yandexgpt;
  const fromConfig = typeof cfg?.folderId === "string" ? cfg.folderId.trim() : undefined;
  if (fromConfig) return fromConfig;
  const env = params.env ?? process.env;
  return env.YANDEX_FOLDER_ID?.trim() ?? env.YC_FOLDER_ID?.trim();
}
