# Глава 1. Настройка проекта

## Способы подключения Phaser

Есть два пути:

1. **CDN** (через `<script>`) — для быстрых тестов, не для продакшена
2. **npm + bundler (Vite/Webpack)** — для серьёзных проектов

Мы пойдём по второму пути с **Vite** — это современный, быстрый и простой бандлер.

## Создание проекта с нуля

### Шаг 1. Инициализация

```bash
mkdir my-phaser-game
cd my-phaser-game
npm init -y
```

### Шаг 2. Установка зависимостей

```bash
npm install phaser
npm install -D vite
```

### Шаг 3. Структура проекта

Создай такую структуру:

```
my-phaser-game/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── assets/
│       ├── sprites/
│       └── sounds/
└── src/
    ├── main.js
    ├── config.js
    └── scenes/
        ├── BootScene.js
        ├── PreloadScene.js
        └── GameScene.js
```

### Шаг 4. `package.json` — добавь скрипты

```json
{
  "name": "my-phaser-game",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "phaser": "^3.80.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

⚠️ Обрати внимание на `"type": "module"` — это обязательно для ES-модулей.

### Шаг 5. `vite.config.js`

```js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

### Шаг 6. `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My Phaser Game</title>
  <style>
    body { margin: 0; background: #000; }
    #game { display: flex; justify-content: center; align-items: center; height: 100vh; }
  </style>
</head>
<body>
  <div id="game"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### Шаг 7. `src/config.js` — конфигурация игры

```js
import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#1a1a2e',
  scene: [BootScene, PreloadScene, GameScene]
};
```

### Шаг 8. `src/main.js` — точка входа

```js
import Phaser from 'phaser';
import { config } from './config.js';

const game = new Phaser.Game(config);
```

### Шаг 9. Простейшие сцены

`src/scenes/BootScene.js`:

```js
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    console.log('Boot OK');
    this.scene.start('PreloadScene');
  }
}
```

`src/scenes/PreloadScene.js`:

```js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Здесь будем загружать ассеты в следующих главах
  }

  create() {
    this.scene.start('GameScene');
  }
}
```

`src/scenes/GameScene.js`:

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.text(400, 300, 'Hello Phaser!', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}
```

### Шаг 10. Запуск

```bash
npm run dev
```

Откроется браузер на `http://localhost:5173` — должна появиться надпись "Hello Phaser!" на тёмном фоне.

## Сборка для продакшена

```bash
npm run build
```

Vite создаст папку `dist/` с минифицированным кодом и ассетами. Эти файлы можно загрузить на любой статический хостинг (GitHub Pages, Netlify, Vercel).

## Альтернатива: импорт Phaser как глобал

Если используешь старый стиль (через `<script>` в HTML):

```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.80.0/dist/phaser.min.js"></script>
<script>
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      create() {
        this.add.text(400, 300, 'Hello!', { fontSize: '32px' }).setOrigin(0.5);
      }
    }
  });
</script>
```

**Не используй этот способ для серьёзных проектов** — нет модульности, ассинхронной загрузки, тришейкинга.

## Типичные ошибки на старте

| Ошибка | Причина |
|---|---|
| `Phaser is not defined` | Забыл `import Phaser from 'phaser'` |
| Чёрный экран | Неправильный `parent` или ошибка в сцене |
| Ассеты не грузятся | Файлы не в `public/` или неверный путь |
| `Cannot use import statement` | Нет `"type": "module"` в package.json |
| CORS-ошибка | Открыл `index.html` напрямую (file://). Запускай через `npm run dev` |

## Структура для слот-игры (на будущее)

Для слотов рекомендую такую структуру:

```
src/
├── main.js
├── config.js
├── core/
│   ├── StateMachine.js
│   ├── EventBus.js
│   └── AssetManifest.js
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── GameScene.js
│   └── UIScene.js
├── slot/
│   ├── Reel.js          ← один барабан
│   ├── ReelManager.js   ← все барабаны
│   ├── Symbol.js        ← один символ
│   ├── PaytableData.js  ← таблица выплат
│   └── WinEvaluator.js  ← логика выигрышей
└── ui/
    ├── SpinButton.js
    ├── BalanceDisplay.js
    └── BetSelector.js
```

К этой структуре мы вернёмся в Главе 14.

---

## ✅ Упражнение 1

1. Создай новый пустой проект по инструкции выше (без копирования из существующего репо).
2. Запусти `npm run dev` — увидь "Hello Phaser!".
3. **Измени** текст на свой ник.
4. **Измени** `backgroundColor` на свой любимый цвет.
5. **Добавь** второй текст ниже первого со словом "Loading..." (используй `this.add.text` ещё раз).
6. Запусти `npm run build` — посмотри что в `dist/`.

Когда работает — переходи к [Главе 2. Game Config](./02-game-config.md).
