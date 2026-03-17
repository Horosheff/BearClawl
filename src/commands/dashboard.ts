import type { RuntimeEnv } from "../runtime.js";
import { defaultRuntime } from "../runtime.js";

type DashboardOptions = {
  noOpen?: boolean;
};

/** BearClaw: веб-дашборд отключён, управление только через Telegram. */
export async function dashboardCommand(
  runtime: RuntimeEnv = defaultRuntime,
  _options: DashboardOptions = {},
) {
  runtime.log("BearClaw: управление только через Telegram. Веб-дашборд отключён.");
  runtime.log("Подключите бота в Telegram и управляйте агентом там.");
}
