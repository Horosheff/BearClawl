import {
  applyAgentDefaultModelPrimary,
  applyProviderConfigWithDefaultModels,
  type ModelApi,
  type OpenClawConfig,
} from "openclaw/plugin-sdk/provider-onboard";
import {
  buildGigachatProvider,
  GIGACHAT_BASE_URL,
  GIGACHAT_DEFAULT_MODEL_ID,
} from "./provider-catalog.js";

export const GIGACHAT_DEFAULT_MODEL_REF = `gigachat/${GIGACHAT_DEFAULT_MODEL_ID}`;

export function applyGigachatProviderConfig(cfg: OpenClawConfig): OpenClawConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[GIGACHAT_DEFAULT_MODEL_REF] = {
    ...models[GIGACHAT_DEFAULT_MODEL_REF],
    alias: models[GIGACHAT_DEFAULT_MODEL_REF]?.alias ?? "GIGACHAT",
  };
  const defaultProvider = buildGigachatProvider();
  const existingProvider = cfg.models?.providers?.gigachat as
    | { baseUrl?: unknown; api?: unknown }
    | undefined;
  const existingBaseUrl =
    typeof existingProvider?.baseUrl === "string" ? existingProvider.baseUrl.trim() : "";
  const resolvedBaseUrl = existingBaseUrl || GIGACHAT_BASE_URL;
  const resolvedApi =
    typeof existingProvider?.api === "string"
      ? (existingProvider.api as ModelApi)
      : "openai-completions";

  return applyProviderConfigWithDefaultModels(cfg, {
    agentModels: models,
    providerId: "gigachat",
    api: resolvedApi,
    baseUrl: resolvedBaseUrl,
    defaultModels: defaultProvider.models ?? [],
    defaultModelId: GIGACHAT_DEFAULT_MODEL_ID,
  });
}

export function applyGigachatConfig(cfg: OpenClawConfig): OpenClawConfig {
  return applyAgentDefaultModelPrimary(
    applyGigachatProviderConfig(cfg),
    GIGACHAT_DEFAULT_MODEL_REF,
  );
}
