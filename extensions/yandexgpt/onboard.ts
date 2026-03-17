import {
  applyAgentDefaultModelPrimary,
  applyProviderConfigWithDefaultModels,
  type ModelApi,
  type OpenClawConfig,
} from "openclaw/plugin-sdk/provider-onboard";
import {
  buildYandexgptProvider,
  YANDEXGPT_BASE_URL,
  YANDEXGPT_DEFAULT_MODEL_ID,
} from "./provider-catalog.js";

export const YANDEXGPT_DEFAULT_MODEL_REF = `yandexgpt/${YANDEXGPT_DEFAULT_MODEL_ID}`;

export function applyYandexgptProviderConfig(cfg: OpenClawConfig): OpenClawConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[YANDEXGPT_DEFAULT_MODEL_REF] = {
    ...models[YANDEXGPT_DEFAULT_MODEL_REF],
    alias: models[YANDEXGPT_DEFAULT_MODEL_REF]?.alias ?? "YANDEXGPT",
  };
  const defaultProvider = buildYandexgptProvider();
  const existingProvider = cfg.models?.providers?.yandexgpt as
    | { baseUrl?: unknown; api?: unknown }
    | undefined;
  const existingBaseUrl =
    typeof existingProvider?.baseUrl === "string" ? existingProvider.baseUrl.trim() : "";
  const resolvedBaseUrl = existingBaseUrl || YANDEXGPT_BASE_URL;
  const resolvedApi =
    typeof existingProvider?.api === "string"
      ? (existingProvider.api as ModelApi)
      : "openai-completions";

  return applyProviderConfigWithDefaultModels(cfg, {
    agentModels: models,
    providerId: "yandexgpt",
    api: resolvedApi,
    baseUrl: resolvedBaseUrl,
    defaultModels: defaultProvider.models ?? [],
    defaultModelId: YANDEXGPT_DEFAULT_MODEL_ID,
  });
}

export function applyYandexgptConfig(cfg: OpenClawConfig): OpenClawConfig {
  return applyAgentDefaultModelPrimary(
    applyYandexgptProviderConfig(cfg),
    YANDEXGPT_DEFAULT_MODEL_REF,
  );
}
