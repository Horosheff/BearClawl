# BearClaw — Русский персональный AI-агент

![BearClaw](BearClawlogo.png)

**BearClaw** — русский персональный AI-агент на базе [OpenClaw](https://github.com/openclaw/openclaw). Репозиторий: [github.com/Horosheff/BearClawl](https://github.com/Horosheff/BearClawl). Запускается у вас локально, поддерживает российские модели **GigaChat** (Сбер) и **YandexGPT** (Яндекс), а также другие провайдеры. Работает в **Telegram** (поддержка других мессенджеров в BearClaw отключена), умеет говорить и слушать, поддерживает скиллы и инструменты.

Если нужен персональный ассистент на русском с поддержкой российских LLM — это он.

## Модели

- **GigaChat** (Сбер) — GigaChat-2, GigaChat-2-Pro, GigaChat-2-Max. Авторизация: OAuth (Client ID + Secret) или токен доступа.
- **YandexGPT** (Яндекс Облако) — авторизация через IAM-токен или API-ключ.

Дополнительно поддерживаются OpenAI, Anthropic, Ollama и другие провайдеры из экосистемы OpenClaw.

## Установка

### Одна команда (Linux / macOS / WSL)

```bash
curl -fsSL https://raw.githubusercontent.com/Horosheff/BearClawl/main/scripts/install.sh | bash
```

Скрипт при необходимости поставит Node.js 22+, установит BearClaw (npm или git) и запустит онбординг. В начале должно быть **«BearClaw Installer»** и **«Repo: github.com/Horosheff/BearClawl»**. Если видите «OpenClaw» — попробуйте без кэша: `curl -fsSL -H 'Cache-Control: no-cache' 'https://raw.githubusercontent.com/Horosheff/BearClawl/main/scripts/install.sh' | bash`. Управление — через Telegram.

### Вручную

Требуется **Node.js ≥22**.

```bash
npm install -g bearclaw@latest
# или: pnpm add -g bearclaw@latest

openclaw onboard --install-daemon
```

Мастер настройки (`openclaw onboard`) проведёт через установку шлюза, рабочего пространства, канала Telegram и скиллов.

**Установка на Linux-сервер:** пошаговая инструкция (Node.js, systemd, Docker) — [docs/install-linux-server.md](docs/install-linux-server.md).

## Быстрый старт

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose
```

Дальше: в онбординге добавьте канал **Telegram** (создайте бота через [@BotFather](https://t.me/BotFather) и укажите токен), напишите боту в Telegram — агент BearClaw ответит. Управление только через Telegram, веб-дашборд отключён.

## Переменные окружения для российских моделей

**GigaChat (Сбер):**
- `GIGACHAT_ACCESS_TOKEN` — токен доступа (Bearer). Получить: [GigaChat API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/post-token) (OAuth2, Client ID + Secret → токен на 30 мин).
- Опционально: `GIGACHAT_CLIENT_ID` и `GIGACHAT_CLIENT_SECRET` для скриптов обновления токена.

**YandexGPT (Яндекс AI Studio, OpenAI-совместимый API):**
- `YANDEX_API_KEY` или `YC_API_KEY` — API-ключ из консоли Яндекс Облака.
- `YANDEX_FOLDER_ID` или `YC_FOLDER_ID` — ID каталога, где включён AI Studio (обязательно для моделей).
- В конфиге можно задать `models.providers.yandexgpt.folderId` вместо переменной.

**Yandex SpeechKit (TTS):**
- `YANDEX_API_KEY` или `YC_API_KEY` — тот же API-ключ (или IAM-токен).
- `YANDEX_FOLDER_ID` или `YC_FOLDER_ID` — для аккаунтов с каталогом.
- В конфиге: `messages.tts.provider: "speechkit"`, опционально `messages.tts.speechkit.voice` (по умолчанию `alena`), `lang` (`ru-RU`), `format` (`mp3`). Голоса: alena, filipp, ermil, oksana, jane, omazh, zahar, marina.

## Только Telegram

BearClaw ориентирован на один канал — **Telegram**. Чтобы не подключать остальные мессенджеры, в конфиге укажите `plugins.allow` только нужными плагинами, например: `["telegram", "gigachat", "yandexgpt", "speechkit", "openai"]` (и другие провайдеры/скиллы по необходимости).

## Скиллы и MCP

BearClaw поддерживает **скиллы** и **инструменты** (в т.ч. по протоколу [MCP](https://modelcontextprotocol.io) — Model Context Protocol): агент может вызывать внешние API, базы знаний и сервисы. Скиллы настраиваются при онбординге и в конфиге; документация по скиллам и MCP — в [документации OpenClaw](https://docs.openclaw.ai/tools/skills).

**Если вы используете Yandex AI Studio:** в AI Studio доступен [MCP Hub](https://yandex.cloud/ru/docs/yandexgpt/concepts/mcp-hub) (Preview) — создание и управление MCP‑серверами, подключение внешних серверов по URL, шаблоны от партнёров (Контур.Фокус, amoCRM, Яндекс Трекер, Яндекс Поиск, SourceCraft). Обращение к MCP через Responses API возможно по URL сервера и API‑ключу с областью `yc.serverless.mcpGateways.invoke`. BearClaw при этом даёт свой набор скиллов и MCP‑инструментов локально; при необходимости те же внешние MCP‑серверы можно подключать и в BearClaw.

## Разработка из исходников

```bash
git clone https://github.com/Horosheff/BearClawl.git
cd BearClawl

pnpm install
pnpm build

pnpm openclaw onboard --install-daemon
pnpm gateway:watch
```

## Документация и лицензия

- [Документация OpenClaw](https://docs.openclaw.ai) (концепции, каналы, провайдеры).
- [Лицензия MIT](LICENSE).

BearClaw — агент на базе OpenClaw, расширенный провайдерами GigaChat и YandexGPT для русскоязычного использования.
