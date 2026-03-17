# BearClaw и MCP / Yandex AI Studio MCP Hub

BearClaw — агент на базе [OpenClaw](https://github.com/openclaw/openclaw). Ниже — про MCP в BearClaw и MCP Hub в Yandex AI Studio.

## MCP в BearClaw

BearClaw поддерживает скиллы и инструменты по протоколу [MCP](https://modelcontextprotocol.io) (Model Context Protocol). Агент может вызывать внешние API, базы знаний и сервисы. Настройка скиллов — в [документации OpenClaw (skills)](https://docs.openclaw.ai/tools/skills).

## Yandex AI Studio MCP Hub (Preview)

В [Yandex AI Studio](https://aistudio.yandex.ru) доступен **MCP Hub** — создание и управление MCP‑серверами для AI‑агентов.

- **Транспорты:** Streamable HTTP (рекомендуется), HTTP with SSE (устаревший).
- **Роли:** для вызова MCP‑серверов — `serverless.mcpGateways.invoker` или выше; для внешних и шаблонных серверов — также `serverless.mcpGateways.anonymousInvoker`.
- **Подключение внешнего MCP‑сервера:** указать URL и данные аутентификации. Через Responses API можно обращаться к внешнему MCP по URL и API‑ключу с областью `yc.serverless.mcpGateways.invoke`.
- **Сервер из шаблона:** выбор шаблона и настройка аутентификации.
- **Сервер с нуля:** Yandex Cloud Functions, HTTPS‑запрос к внешнему API, Yandex Workflows.

### Шаблоны MCP‑серверов (партнёры)

| Шаблон | Назначение |
|--------|------------|
| **Контур.Фокус** | Проверка контрагентов (ИНН), экспресс‑отчёт, благонадежность; методы req, search, scoring, briefReport. |
| **amoCRM** | Работа с CRM: компании, лиды, контакты, заметки, пайплайны, задачи. Аутентификация: заголовки X-Auth-Token, X-Account-Name. |
| **Яндекс Трекер** | Задачи и сущности Трекер: создание/изменение задач, комментарии, цели, массовые операции. Токен + x-org-id / x-cloud-org-id. Требуется согласование с поддержкой Трекер для сервисного аккаунта. |
| **Яндекс Поиск** | Yandex Search API — поиск в интернете для агентов. Нужен API‑ключ. |
| **SourceCraft** | Задачи, комментарии, метки, репозитории, предложения изменений, рецензенты. Аутентификация: персональный токен в заголовке. |

Один MCP‑сервер может содержать до 50 инструментов.

## Связь BearClaw и MCP Hub

- **BearClaw** даёт свой набор скиллов и MCP‑инструментов локально (как в OpenClaw).
- **MCP Hub в AI Studio** — это среда для агентов внутри Yandex AI Studio (Responses API, Realtime API, Agent Atelier).
- При необходимости одни и те же внешние MCP‑серверы можно подключать и в BearClaw (через конфиг скиллов/MCP), и в MCP Hub — по одному URL и своим учётным данным.

Документация Yandex: [MCP Hub](https://yandex.cloud/ru/docs/yandexgpt/concepts/mcp-hub), [шаблоны MCP‑серверов](https://yandex.cloud/ru/docs/yandexgpt/concepts/mcp-templates).
