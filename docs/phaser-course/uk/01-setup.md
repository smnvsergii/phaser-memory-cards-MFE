# Глава 1. Налаштування проєкту

## Способи підключення Phaser

Є два шляхи:

1. **CDN** (через `<script>`) — для швидких тестів, не для продакшену
2. **npm + bundler (Vite/Webpack)** — для серйозних проєктів

Ми підемо другим шляхом із **Vite** — це сучасний, швидкий і простий бандлер.

## Створення проєкту з нуля

### Крок 1. Ініціалізація

```bash
mkdir my-phaser-game
cd my-phaser-game
npm init -y
```

### Крок 2. Встановлення залежностей

```bash
npm install phaser
npm install -D vite
```

### Крок 3. Структура проєкту

Створи таку структуру:

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

### Крок 4. `package.json` — додай скрипти

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

⚠️ Зверни увагу на `"type": "module"` — це обов'язково для ES-модулів.

### Крок 5. `vite.config.js`

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

### Крок 6. `index.html`

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

### Крок 7. `src/config.js` — конфігурація гри

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

### Крок 8. `src/main.js` — точка входу

```js
import Phaser from 'phaser';
import { config } from './config.js';

const game = new Phaser.Game(config);
```

### Крок 9. Найпростіші сцени

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
    // Тут будемо завантажувати ассети в наступних главах
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

### Крок 10. Запуск

```bash
npm run dev
```

Відкриється браузер на `http://localhost:5173` — має з'явитися напис "Hello Phaser!" на темному тлі.

## Збірка для продакшену

```bash
npm run build
```

Vite створить папку `dist/` із мініфікованим кодом і ассетами. Ці файли можна завантажити на будь-який статичний хостинг (GitHub Pages, Netlify, Vercel).

## Альтернатива: імпорт Phaser як глобал

Якщо використовуєш старий стиль (через `<script>` у HTML):

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

**Не використовуй цей спосіб для серйозних проєктів** — немає модульності, асинхронного завантаження, tree-shaking.

## Типові помилки на старті

| Помилка | Причина |
|---|---|
| `Phaser is not defined` | Забув `import Phaser from 'phaser'` |
| Чорний екран | Неправильний `parent` або помилка в сцені |
| Ассети не вантажаться | Файли не в `public/` або хибний шлях |
| `Cannot use import statement` | Немає `"type": "module"` у package.json |
| CORS-помилка | Відкрив `index.html` напряму (file://). Запускай через `npm run dev` |

## Структура для слот-гри (на майбутнє)

Для слотів рекомендую таку структуру:

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
│   ├── ReelManager.js   ← усі барабани
│   ├── Symbol.js        ← один символ
│   ├── PaytableData.js  ← таблиця виплат
│   └── WinEvaluator.js  ← логіка виграшів
└── ui/
    ├── SpinButton.js
    ├── BalanceDisplay.js
    └── BetSelector.js
```

До цієї структури ми повернемося в Главі 14.

---

## ✅ Вправа 1

1. Створи новий порожній проєкт за інструкцією вище (без копіювання з наявного репозиторію).
2. Запусти `npm run dev` — побач "Hello Phaser!".
3. **Зміни** текст на свій нік.
4. **Зміни** `backgroundColor` на свій улюблений колір.
5. **Додай** другий текст нижче за перший зі словом "Loading..." (використай `this.add.text` ще раз).
6. Запусти `npm run build` — подивись що в `dist/`.

Коли працює — переходь до [Глави 2. Game Config](./02-game-config.md).
