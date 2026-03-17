import { definePluginEntry } from "openclaw/plugin-sdk/core";
import { buildSpeechKitSpeechProvider } from "openclaw/plugin-sdk/speech";

export default definePluginEntry({
  id: "speechkit",
  name: "Yandex SpeechKit",
  description: "BearClaw Yandex SpeechKit TTS provider",
  register(api) {
    api.registerSpeechProvider(buildSpeechKitSpeechProvider());
  },
});
