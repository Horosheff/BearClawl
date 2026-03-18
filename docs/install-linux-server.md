# Установка BearClaw на Linux-сервер

Инструкция по установке и запуску [BearClaw](https://github.com/Horosheff/BearClawl) на сервере с Linux. Управление — только через Telegram, веб-дашборд отключён.

## Установка одной командой

На сервере с Linux (или WSL) достаточно выполнить:

```bash
curl -fsSL https://raw.githubusercontent.com/Horosheff/BearClawl/main/scripts/install.sh | bash
```

**Важно:** в начале должна появиться строка **«BearClaw Installer»** и под ней **«Repo: github.com/Horosheff/BearClawl»**. Если видите «OpenClaw Installer» и ставится OpenClaw v0.1.6 — скрипт отдаётся из кэша. Тогда выполните (без кэша):

```bash
curl -fsSL -H 'Cache-Control: no-cache' -H 'Pragma: no-cache' 'https://raw.githubusercontent.com/Horosheff/BearClawl/main/scripts/install.sh' | bash
```

Либо скачайте скрипт и запустите вручную: `curl -fsSL -o install-bearclaw.sh '...' ; bash install-bearclaw.sh`

Скрипт при необходимости установит Node.js 22+, установит BearClaw через npm и предложит запустить онбординг (`openclaw onboard --install-daemon`). Дальше настройте Telegram-бота и запустите шлюз (вручную или как systemd-сервис — см. ниже).

Без онбординга (только установка):

```bash
curl -fsSL https://raw.githubusercontent.com/Horosheff/BearClawl/main/scripts/install.sh | bash -s -- --no-onboard
```

**Если установка пишет, что `openclaw` не в PATH:** в **этом же терминале** выполните (подставьте свой HOME при установке из git):
```bash
export PATH="$HOME/.local/bin:$PATH"
openclaw onboard --install-daemon
```
Для установки из npm обычно путь уже в PATH; при необходимости: `hash -r` или полный путь `/usr/bin/openclaw`.

**Чтобы поставить именно сборку из этого репозитория** (а не пакет из npm): используйте установку из git — тогда будет наша версия и все изменения:
```bash
curl -fsSL -H 'Cache-Control: no-cache' 'https://raw.githubusercontent.com/Horosheff/BearClawl/main/scripts/install.sh' | bash -s -- --install-method git
```

**Если при установке build tools появляется ошибка про lock dpkg** (`Could not get lock /var/lib/dpkg/lock-frontend`, процесс `unattended-upgr`): в фоне идёт обновление пакетов. Дождитесь окончания (например, `sudo lsof /var/lib/dpkg/lock-frontend` покажет процесс) или отложите установку и запустите скрипт позже.

---

## Требования

- **ОС:** Linux (Ubuntu 22.04+, Debian 12+, или другой дистрибутив с Node.js 22+).
- **Node.js:** версия **22** или выше.
- **Доступ в интернет** с сервера (для API GigaChat, YandexGPT, Telegram и т.д.).

---

## 1. Установка Node.js 22

### Ubuntu / Debian

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # должно быть v22.x.x
```

### Через nvm (без sudo)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
node -v
```

---

## 2. Установка BearClaw

### Вариант А: из npm (рекомендуется)

```bash
sudo npm install -g bearclaw@latest
# или
sudo pnpm add -g bearclaw@latest

openclaw --version
```

### Вариант Б: из репозитория (сборка из исходников)

```bash
sudo npm install -g pnpm
git clone https://github.com/Horosheff/BearClawl.git
cd BearClawl
pnpm install
pnpm build

# Запуск локальной сборки (из каталога репозитория)
node dist/openclaw.mjs --version
```

Дальше в командах можно использовать либо глобальный `openclaw` (вариант А), либо `node dist/openclaw.mjs` из каталога BearClawl (вариант Б).

---

## 3. Первичная настройка (онбординг)

Один раз запустите мастер настройки. Он создаст конфиг, рабочий каталог и при желании установит шлюз как сервис.

```bash
openclaw onboard --install-daemon
```

- Пройдите шаги: укажите каталог конфигурации (можно оставить по умолчанию `~/.openclaw`).
- **Telegram:** создайте бота в [@BotFather](https://t.me/BotFather), получите токен и введите его при настройке канала Telegram.
- При запросе установки демона ответьте «да», если хотите, чтобы шлюз работал как systemd-сервис.

После онбординга конфиг будет в `~/.openclaw/openclaw.json` (или в выбранном вами пути).

---

## 4. Переменные окружения (модели и TTS)

Создайте файл с переменными (например, `~/.openclaw/env` или используйте systemd `EnvironmentFile`). Пример для GigaChat и YandexGPT:

```bash
# GigaChat (Сбер)
export GIGACHAT_ACCESS_TOKEN="ваш_токен"
# или для OAuth: GIGACHAT_CLIENT_ID и GIGACHAT_CLIENT_SECRET

# YandexGPT и SpeechKit (Яндекс Облако)
export YANDEX_API_KEY="ваш_api_ключ"
export YANDEX_FOLDER_ID="ваш_folder_id"
```

Перед запуском шлюза выполните: `source ~/.openclaw/env` (или настройте подстановку в systemd, см. ниже).

---

## 5. Запуск шлюза

### Одним запуском (для проверки)

Прослушивание только localhost (по умолчанию):

```bash
openclaw gateway --port 18789 --verbose
```

Чтобы шлюз был доступен снаружи сервера (например, для Telegram webhook):

```bash
openclaw gateway --port 18789 --bind lan --verbose
```

В конфиге можно задать `gateway.bind: "lan"` и порт, тогда флаги не обязательны.

### Как systemd-сервис (постоянная работа)

Если при онбординге вы выбрали `--install-daemon`, сервис уже создан. Иначе создайте unit вручную.

Файл сервиса (пример): `/etc/systemd/system/bearclaw-gateway.service`

```ini
[Unit]
Description=BearClaw gateway
After=network.target

[Service]
Type=simple
User=ВАШ_ПОЛЬЗОВАТЕЛЬ
WorkingDirectory=/home/ВАШ_ПОЛЬЗОВАТЕЛЬ
EnvironmentFile=/home/ВАШ_ПОЛЬЗОВАТЕЛЬ/.openclaw/env
ExecStart=/usr/bin/openclaw gateway --port 18789 --bind lan
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Подставьте своего пользователя и путь к `EnvironmentFile`. Если ставили из репозитория, в `ExecStart` укажите полный путь к CLI, например:

```ini
ExecStart=/home/ВАШ_ПОЛЬЗОВАТЕЛЬ/BearClawl/node dist/openclaw.mjs gateway --port 18789 --bind lan
```

Затем:

```bash
sudo systemctl daemon-reload
sudo systemctl enable bearclaw-gateway
sudo systemctl start bearclaw-gateway
sudo systemctl status bearclaw-gateway
```

Логи: `journalctl -u bearclaw-gateway -f`.

---

## 6. Telegram: webhook или polling

- **Webhook:** нужен HTTPS и доступный с интернета адрес. В конфиге укажите `gateway.bind: "lan"`, откройте порт (например 18789) или настройте reverse proxy (nginx) с SSL и укажите в настройках канала Telegram URL вида `https://ваш-домен/путь`.
- **Polling:** если с сервера есть доступ в интернет, но снаружи порт не открыт, можно использовать long polling (настраивается в канале Telegram в конфиге).

Подробности по каналу Telegram и webhook — в [документации OpenClaw](https://docs.openclaw.ai) и в мастере `openclaw onboard`.

---

## 7. Установка и рестарт (шпаргалка)

**Установка с нуля (одна команда):**
```bash
curl -fsSL -H 'Cache-Control: no-cache' https://raw.githubusercontent.com/Horosheff/BearClawl/main/scripts/install.sh | bash
```
Дальше при необходимости: `export PATH="$HOME/.local/bin:$PATH"` и `openclaw onboard --install-daemon`.

**Обновление из git и рестарт** (если уже ставили из репозитория, например в `~/BearClawl`):
```bash
export PATH="$HOME/.local/bin:$PATH"
cd ~/BearClawl && git pull && pnpm install && pnpm build
systemctl --user restart openclaw-gateway
```
Если шлюз запускали не как systemd, а вручную — просто заново запустите `openclaw gateway --port 18789 --bind lan` (предварительно остановив старый процесс: `openclaw gateway stop` или Ctrl+C).

**Только рестарт шлюза:**
```bash
systemctl --user restart openclaw-gateway
```
или
```bash
openclaw gateway restart
```
(второй вариант сработает, если при онбординге был установлен сервис через `openclaw onboard --install-daemon`).

---

## 8. Полезные команды

| Команда | Описание |
|--------|----------|
| `openclaw status` | Статус шлюза и окружения |
| `openclaw doctor` | Диагностика и быстрые исправления |
| `openclaw gateway restart` | Перезапуск шлюза (если установлен как сервис) |
| `openclaw gateway stop` | Остановить шлюз (локальный процесс) |
| `openclaw config get gateway.port` | Показать порт шлюза из конфига |
| `journalctl --user -u openclaw-gateway -f` | Логи шлюза в реальном времени |

Управление — только через Telegram; веб-дашборд в BearClaw отключён.

---

## 9. Инструменты кодинга (полный набор)

Чтобы агент мог полноценно кодить (патчи, планировщик, генерация изображений):

- **apply_patch** — для YandexGPT и GigaChat включён по умолчанию. Для OpenAI нужно явно задать в конфиге:  
  `openclaw config set tools.exec.applyPatch.enabled true`
- **cron** — уже входит в профиль «coding», дополнительно настраивать не нужно.
- **image** (понимание изображений) — работает, если модель поддерживает vision (YandexGPT с поддержкой картинок).
- **image_generate** (генерация картинок) — нужен настроенный провайдер генерации. Пример (если у вас есть модель для картинок):  
  `openclaw config set agents.defaults.imageGenerationModel.primary "openai/gpt-image-1"`  
  (подставьте свой провайдер/модель из списка, который возвращает инструмент `image_generate` с `action="list"`.)

Профиль инструментов по умолчанию — **coding**; при необходимости его можно сменить в конфиге (`tools.profile` или в агенте).

---

## 10. Первый контакт в Telegram: «кем быть» и обращение по имени

При первом сообщении в Telegram бот должен спросить, **кем он должен быть** (имя/роль), и потом **обращаться к тебе по имени** (из префикса сообщения).

Это задаётся шаблоном агента. Если бот уже был настроен раньше и такого поведения нет:

1. Открой файл AGENTS.md в рабочем каталоге агента (например `~/.openclaw/agents/main/workspace/AGENTS.md` или путь из `agents.defaults.workspace`).
2. Добавь секцию **«First contact (Telegram / direct chat)»** как в `docs/reference/templates/AGENTS.md` в репозитории — там описаны один вопрос «Кем я должен быть? Как меня зовут?» и правило обращаться к пользователю по имени из префикса сообщения.

При новой установке и создании workspace эта секция подставляется из шаблона автоматически.

---

## 11. Docker (альтернатива)

Образы публикуются в GitHub Container Registry (lowercase):

```bash
docker pull ghcr.io/horosheff/bearclawl:main
docker run -d --name bearclaw \
  -p 18789:18789 \
  -e YANDEX_API_KEY="..." \
  -e YANDEX_FOLDER_ID="..." \
  -v bearclaw-data:/root/.openclaw \
  ghcr.io/horosheff/bearclawl:main \
  node openclaw.mjs gateway --port 18789 --bind lan
```

Конфиг и данные храните в volume `bearclaw-data` или монтируйте каталог с `openclaw.json`.

---

## 12. YandexGPT и типичные проблемы

Если бот отвечает «An unknown error occurred», скилл не находится по пути или хочется сравнить настройку с другими провайдерами (например Anthropic) — см. **[docs/troubleshooting-yandexgpt.md](troubleshooting-yandexgpt.md)**. Там разобраны:

- один и тот же пайплайн для всех провайдеров (Anthropic, YandexGPT и т.д.);
- почему приходит «unknown error» и что смотреть в логах;
- правильный путь к скиллам (`workspace/skills/<имя>/SKILL.md`) и предупреждения про `cron` / `image` / `image_generate`.
