# YandexGPT и сравнение с другими провайдерами (Anthropic и др.)

## Как устроены провайдеры

Все провайдеры (Anthropic, OpenAI, YandexGPT, GigaChat и т.д.) идут **по одному и тому же пайплайну** в OpenClaw/BearClaw:

- Регистрация через `api.registerProvider()` с каталогом моделей, auth и `resolveDynamicModel`.
- Один и тот же раннер агента (`pi-embedded-runner`), системный промпт, инструменты, скиллы.
- Отличия только в: базовый URL, способ авторизации (API key / OAuth / folder), лимиты контекста и то, как API возвращает ошибки.

Пример «как настроен Anthropic» можно смотреть в `extensions/anthropic/index.ts`: там те же шаги — auth, модель по умолчанию, forward-compat для новых моделей. YandexGPT в `extensions/yandexgpt/` устроен так же, только со своим URL и заголовком `x-folder-id`.

## Типичные проблемы с YandexGPT

### 1. «An unknown error occurred» в Telegram

Сообщение «An unknown error occurred» значит, что **текст ошибки от API пустой или не распарсился**. Часто так бывает, когда:

- Yandex возвращает ошибку в формате, который мы не вытаскиваем в `errorMessage`.
- Срабатывает content filter и ответ приходит без явного текста ошибки.

**Что сделать:**

- Смотреть **логи gateway** — там обычно есть сырой ответ/исключение:
  - `journalctl --user -u openclaw-gateway -f` или
  - `[agent/embedded] embedded run agent end: ... error=...`
- По логам уже можно понять: 403/429, «content filtered», таймаут и т.д.
- Если в логах тоже пусто — имеет смысл временно включить более подробное логирование запросов/ответов к Yandex API (если добавите такой лог в код).

### 2. Скилл: «SKILL.md not found» / путь `workspace/.../SKILL.md`

В логе было:

```text
read failed: ENOENT: no such file or directory, access '/root/.openclaw/workspace/google-yandex-seo-skill/SKILL.md'
```

Правильный путь к скиллу в workspace — **каталог `skills`**, а не корень workspace:

- Ожидается: `.../workspace/skills/<имя-скилла>/SKILL.md`
- Неправильно: `.../workspace/<имя-скилла>/SKILL.md`

Агент должен брать путь к файлу **строго из тега `<location>`** в блоке `<available_skills>` в системном промпте. Если модель подставляет свой путь (например, без `skills/`), получится ENOENT.

**Что проверить:**

1. В репозитории скилла есть ли **SKILL.md в корне** репо (или в той папке, куда клонируется скилл).
2. После установки скилла:
   - либо он появляется в `~/.openclaw/workspace/.../skills/<имя>/SKILL.md`,
   - либо в `~/.openclaw/skills/` (managed), и тогда в конфиге может понадобиться `skills.load.extraDirs`, чтобы агент видел скиллы из `~/.openclaw/tools` (если установка кладёт их туда).
3. Команда `/skill` без аргументов не выбирает скилл сама — нужно указать имя или действие (как в подсказке бота).

### 3. Предупреждение «cron, image, image_generate» unavailable

Это не ошибка работы модели, а **напоминание**, что в профиле «coding» перечислены инструменты, которые в текущем рантайме не включены:

- **cron** — обычно доступен, если не вырезан конфигом.
- **image** — нужен `agentDir` и модель с vision (у YandexGPT зависит от модели).
- **image_generate** — нужен настроенный провайдер генерации картинок в конфиге (`agents.defaults.imageGenerationModel` и т.п.).

На ответы и установку скиллов это не влияет; при необходимости можно сузить список инструментов в конфиге или включить провайдеры для image/image_generate.

## Сравнение с Anthropic

| Аспект | Anthropic | YandexGPT (BearClaw) |
|--------|-----------|----------------------|
| Конфиг | `models.providers.anthropic` + auth profile | `models.providers.yandexgpt` + `folderId` + auth |
| Модели | `resolveDynamicModel` по id (claude-*) | `gpt://<folderId>/yandexgpt/latest` |
| Ошибки | Обычно приходят в понятном виде в ответе API | Часто общие или без текста → «unknown error» без логов |
| apply_patch | Включён для OpenAI-совместимых | Включён по умолчанию для yandexgpt/gigachat в коде |

Если что-то «нормально работает на Anthropic и не работает на Yandex» — в 99% случаев это не разная логика пайплайна, а: конфиг (folderId, ключ), лимиты или формат ошибок Yandex. Всегда смотрите логи gateway и при необходимости — сырой ответ Yandex API.
