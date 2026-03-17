import type { ModelProviderConfig } from "openclaw/plugin-sdk/provider-models";

export const GIGACHAT_BASE_URL = "https://gigachat.devices.sberbank.ru/api/v1";
export const GIGACHAT_DEFAULT_MODEL_ID = "GigaChat-2";

const GIGACHAT_DEFAULT_CONTEXT_WINDOW = 32_768;
const GIGACHAT_DEFAULT_MAX_TOKENS = 8_192;
const GIGACHAT_DEFAULT_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

export function buildGigachatProvider(): ModelProviderConfig {
  return {
    baseUrl: GIGACHAT_BASE_URL,
    api: "openai-completions",
    models: [
      {
        id: "GigaChat",
        name: "GigaChat",
        reasoning: false,
        input: ["text", "image"],
        cost: GIGACHAT_DEFAULT_COST,
        contextWindow: GIGACHAT_DEFAULT_CONTEXT_WINDOW,
        maxTokens: GIGACHAT_DEFAULT_MAX_TOKENS,
      },
      {
        id: "GigaChat-2",
        name: "GigaChat-2",
        reasoning: false,
        input: ["text", "image"],
        cost: GIGACHAT_DEFAULT_COST,
        contextWindow: GIGACHAT_DEFAULT_CONTEXT_WINDOW,
        maxTokens: GIGACHAT_DEFAULT_MAX_TOKENS,
      },
      {
        id: "GigaChat-2-Pro",
        name: "GigaChat-2-Pro",
        reasoning: false,
        input: ["text", "image"],
        cost: GIGACHAT_DEFAULT_COST,
        contextWindow: 128_000,
        maxTokens: 16_384,
      },
      {
        id: "GigaChat-2-Max",
        name: "GigaChat-2-Max",
        reasoning: false,
        input: ["text", "image"],
        cost: GIGACHAT_DEFAULT_COST,
        contextWindow: 128_000,
        maxTokens: 16_384,
      },
    ],
  };
}
