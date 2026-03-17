import {
  definePluginEntry,
  type ProviderCatalogContext,
  type ProviderCatalogResult,
  type ProviderResolveDynamicModelContext,
  type ProviderRuntimeModel,
} from "openclaw/plugin-sdk/core";
import { createProviderApiKeyAuthMethod } from "openclaw/plugin-sdk/provider-auth";
import { normalizeModelCompat } from "openclaw/plugin-sdk/provider-models";
import { applyYandexgptConfig, YANDEXGPT_DEFAULT_MODEL_REF } from "./onboard.js";
import {
  buildYandexgptProvider,
  getYandexFolderId,
  YANDEXGPT_BASE_URL,
} from "./provider-catalog.js";

const PROVIDER_ID = "yandexgpt";

function getFolderId(ctx: ProviderCatalogContext): string | undefined {
  const cfg = ctx.config?.models?.providers?.yandexgpt as { folderId?: string } | undefined;
  const fromConfig = typeof cfg?.folderId === "string" ? cfg.folderId.trim() : undefined;
  if (fromConfig) return fromConfig;
  const env = ctx.env ?? process.env;
  return (
    env.YANDEX_FOLDER_ID?.trim() ??
    env.YC_FOLDER_ID?.trim()
  );
}

function resolveYandexgptDynamicModel(
  ctx: ProviderResolveDynamicModelContext,
): ProviderRuntimeModel | null | undefined {
  if (ctx.provider !== PROVIDER_ID) return undefined;
  const shortId = ctx.modelId.trim().toLowerCase();
  if (shortId !== "latest" && shortId !== "yandexgpt/latest") return undefined;

  const folderId = getYandexFolderId({ config: ctx.config, env: process.env });
  if (!folderId) return null;

  const modelUri = `gpt://${folderId}/yandexgpt/latest`;
  const base: ProviderRuntimeModel = {
    id: modelUri,
    name: "YandexGPT Pro (latest)",
    api: "openai-completions",
    provider: PROVIDER_ID,
    baseUrl: YANDEXGPT_BASE_URL,
    reasoning: false,
    input: ["text"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 32_000,
    maxTokens: 2_000,
    headers: {
      "x-folder-id": folderId,
      "x-data-logging-enabled": "false",
    },
  };
  return normalizeModelCompat(base) as ProviderRuntimeModel;
}

async function runYandexgptCatalog(ctx: ProviderCatalogContext): Promise<ProviderCatalogResult> {
  const apiKey =
    ctx.resolveProviderApiKey(PROVIDER_ID).apiKey ??
    (ctx.env ?? process.env).YANDEX_API_KEY ??
    (ctx.env ?? process.env).YC_API_KEY;
  if (!apiKey) return null;

  const folderId = getFolderId(ctx);
  if (!folderId) return null; // AI Studio requires folder ID for model URIs

  const provider = buildYandexgptProvider({ folderId });
  return {
    provider: {
      ...provider,
      apiKey,
    },
  };
}

export default definePluginEntry({
  id: PROVIDER_ID,
  name: "YandexGPT Provider",
  description: "BearClaw YandexGPT (Яндекс AI Studio) provider plugin",
  register(api) {
    api.registerProvider({
      id: PROVIDER_ID,
      label: "YandexGPT (Яндекс)",
      docsPath: "/providers/yandexgpt",
      envVars: ["YANDEX_API_KEY", "YC_API_KEY", "YANDEX_FOLDER_ID", "YC_FOLDER_ID"],
      auth: [
        createProviderApiKeyAuthMethod({
          providerId: PROVIDER_ID,
          methodId: "api-key",
          label: "YandexGPT: API-ключ + Folder ID (AI Studio)",
          hint: "YANDEX_API_KEY и YANDEX_FOLDER_ID из консоли Яндекс Облака",
          optionKey: "yandexgptApiKey",
          flagName: "--yandexgpt-api-key",
          envVar: "YANDEX_API_KEY",
          promptMessage: "Введите API-ключ Yandex (YANDEX_API_KEY). Укажите YANDEX_FOLDER_ID в конфиге или env.",
          defaultModel: YANDEXGPT_DEFAULT_MODEL_REF,
          expectedProviders: ["yandexgpt"],
          applyConfig: (cfg) => applyYandexgptConfig(cfg),
          wizard: {
            choiceId: "yandexgpt-api-key",
            choiceLabel: "YandexGPT: API Key + Folder ID",
            groupId: "yandexgpt",
            groupLabel: "YandexGPT (Яндекс Облако)",
            groupHint: "AI Studio OpenAI-совместимый API",
          },
        }),
      ],
      catalog: {
        order: "simple",
        run: runYandexgptCatalog,
      },
      resolveDynamicModel: resolveYandexgptDynamicModel,
    });
  },
});
