import { definePluginEntry } from "openclaw/plugin-sdk/core";
import { createProviderApiKeyAuthMethod } from "openclaw/plugin-sdk/provider-auth";
import { buildSingleProviderApiKeyCatalog } from "openclaw/plugin-sdk/provider-catalog";
import { applyGigachatConfig, GIGACHAT_DEFAULT_MODEL_REF } from "./onboard.js";
import { buildGigachatProvider } from "./provider-catalog.js";

const PROVIDER_ID = "gigachat";

export default definePluginEntry({
  id: PROVIDER_ID,
  name: "GigaChat Provider",
  description: "BearClaw GigaChat (Сбер) provider plugin",
  register(api) {
    api.registerProvider({
      id: PROVIDER_ID,
      label: "GigaChat (Сбер)",
      docsPath: "/providers/gigachat",
      envVars: ["GIGACHAT_ACCESS_TOKEN", "GIGACHAT_CLIENT_ID", "GIGACHAT_CLIENT_SECRET"],
      auth: [
        createProviderApiKeyAuthMethod({
          providerId: PROVIDER_ID,
          methodId: "api-key",
          label: "GigaChat: токен доступа",
          hint: "GIGACHAT_ACCESS_TOKEN или получите токен по OAuth (Client ID + Secret)",
          optionKey: "gigachatApiKey",
          flagName: "--gigachat-api-key",
          envVar: "GIGACHAT_ACCESS_TOKEN",
          promptMessage: "Введите токен доступа GigaChat (или base64 ClientID:ClientSecret)",
          defaultModel: GIGACHAT_DEFAULT_MODEL_REF,
          expectedProviders: ["gigachat"],
          applyConfig: (cfg) => applyGigachatConfig(cfg),
          wizard: {
            choiceId: "gigachat-api-key",
            choiceLabel: "GigaChat: токен доступа",
            groupId: "gigachat",
            groupLabel: "GigaChat (Сбер)",
            groupHint: "Токен или OAuth",
          },
        }),
      ],
      catalog: {
        order: "simple",
        run: (ctx) =>
          buildSingleProviderApiKeyCatalog({
            ctx,
            providerId: PROVIDER_ID,
            buildProvider: buildGigachatProvider,
          }),
      },
    });
  },
});
