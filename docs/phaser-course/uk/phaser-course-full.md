# 🎮 Курс з Phaser 3 — від нуля до прототипа слота

Повний навчальний курс із Phaser 3 українською мовою. Кожна глава містить:
- **Теорію** — що і навіщо
- **Приклади коду** — робочі сніпети, які можна копіювати
- **Практику** — завдання для закріплення

Мета курсу — після проходження ти зможеш самостійно зібрати слот-гру або будь-яку 2D-гру на Phaser 3.

---

## 📚 Програма курсу

### Частина 1. Основи
- [Глава 0. Вступ до Phaser](./00-introduction.md) — що це, історія, екосистема, коли використовувати
- [Глава 1. Налаштування проєкту](./01-setup.md) — Vite, структура, перший запуск
- [Глава 2. Game Config](./02-game-config.md) — конфігурація гри, рендерери
- [Глава 3. Сцени (Scenes)](./03-scenes.md) — життєвий цикл, перемикання, передача даних

### Частина 2. Контент
- [Глава 4. Завантаження ассетів (Loader)](./04-assets.md) — зображення, атласи, аудіо, шрифти
- [Глава 5. Display Objects](./05-display-objects.md) — Sprite, Image, Graphics, Text, Container
- [Глава 6. Анімації та Tweens](./06-animations-tweens.md) — sprite-анімації, плавні рухи

### Частина 3. Взаємодія
- [Глава 7. Введення (Input)](./07-input.md) — миша, тач, drag&drop, клавіатура
- [Глава 8. Звук](./08-sound.md) — Sound Manager, sprite sounds
- [Глава 9. Камера](./09-camera.md) — scroll, zoom, ефекти
- [Глава 10. Scale Manager](./10-scale-manager.md) — адаптивність, mobile/desktop

### Частина 4. Розширене
- [Глава 11. Particle System](./11-particles.md) — емітери, ефекти виграшу
- [Глава 12. Фізика (Arcade)](./12-physics.md) — колізії, тіла, групи
- [Глава 13. Архітектура та оптимізація](./13-architecture.md) — патерни, pooling, профілювання

### Частина 5. Практичний проєкт
- [Глава 14. Прототип слота на Phaser](./14-slot-prototype.md) — збираємо reels, win-логіку, анімації

---

## 🎯 Як займатися

1. Читай главу послідовно — теорія → код → вправа
2. **Обов'язково роби практику.** Без неї матеріал не закріпиться
3. Кожну вправу пиши з нуля, не копіюй із глави
4. Після кожних 3–4 глав повертайся до старого коду й покращуй його
5. Після Глави 14 — побудуй власний міні-слот без підказок

## ⏱ Орієнтовний темп

| Частина | Час (годин) |
|---|---|
| Частина 1 (Основи) | 6–8 год |
| Частина 2 (Контент) | 8–10 год |
| Частина 3 (Взаємодія) | 10–12 год |
| Частина 4 (Розширене) | 8–10 год |
| Частина 5 (Слот) | 15–20 год |
| **Разом** | **~50–60 год** (4–6 тижнів по годині-дві на день) |

## 🔗 Корисні посилання

- [Офіційна документація Phaser 3](https://phaser.io/docs/3)
- [API Reference](https://newdocs.phaser.io/docs/3.80.0)
- [Phaser Examples (понад 1700 прикладів)](https://phaser.io/examples)
- [Phaser Discord](https://discord.gg/phaser)

## 🛠 Версія

Курс розрахований на **Phaser 3.80+** (актуальна стабільна). Якщо в тебе інша версія — дивись changelog, базові принципи лишаються ті самі.

## 📥 Завантажити одним файлом

Якщо хочеться читати офлайн на телефоні в одному документі:

👉 [phaser-course-full.md](./phaser-course-full.md) — усі 15 глав в одному файлі (~175 КБ)

На телефоні: відкрий посилання → "Raw" → меню браузера → "Зберегти сторінку" / "Поділитися → Зберегти у файли". Будь-яка Markdown-читалка (Obsidian, iA Writer, Markor) відкриє.

---

Успіхів у навчанні! 🚀


---

# Глава 0. Вступ до Phaser

## Що таке Phaser

**Phaser** — це HTML5-фреймворк для створення 2D-ігор у браузері. Написаний на JavaScript/TypeScript, під капотом використовує **WebGL** (з Canvas-фолбеком).

Phaser — це **готовий ігровий рушій**, у якому вже є:
- Рендерер 2D-графіки (WebGL/Canvas)
- Система сцен та ігровий цикл
- Завантажувач ассетів
- Анімації (sprite + tweens)
- Введення (миша, тач, клавіатура, геймпад)
- Аудіо-менеджер
- Фізичні рушії (Arcade, Matter.js)
- Камера, частинки, текст, маски
- Адаптивність (Scale Manager)

Тобто Phaser дає **все необхідне з коробки**, на відміну від Pixi.js (тільки рендерер) або чистого WebGL.

## Версії Phaser

- **Phaser 2 (CE)** — застаріла, на ES5, не використовуй для нових проєктів
- **Phaser 3** — актуальна, на ES6+, повна переробка архітектури
- **Phaser 4** — у розробці (станом на 2026), поки не реліз

У курсі використовуємо **Phaser 3.80+**.

## Де Phaser застосовується

- Casual / hyper-casual ігри (Match-3, runners, puzzles)
- Освітні ігри
- Реклама-ігри (playable ads)
- **Слоти та казуальні казино-ігри** (хоча індустрія частіше обирає Pixi)
- Прототипи для подальшого портування

## Phaser vs Pixi vs Unity (для розуміння)

| | Phaser | Pixi.js | Unity |
|---|---|---|---|
| Тип | Фреймворк | Тільки рендерер | Повноцінний рушій |
| Мова | JS/TS | JS/TS | C# |
| Платформа | Браузер | Браузер | Скрізь |
| Крива навчання | Низька | Низька (але багато пишеш сам) | Висока |
| Готовність із коробки | Висока | Низька | Дуже висока |
| Продуктивність | Середня | Висока | Дуже висока |
| Підходить для слотів | Так (для прототипів) | Так (production-стандарт) | Рідко |

**Висновок:** Phaser ідеальний для навчання та швидких прототипів. Освоївши його, перехід на Pixi буде легким.

## Архітектура Phaser-гри

```
┌─────────────────────────────────┐
│           Phaser.Game           │  ← головний об'єкт
│  ┌───────────────────────────┐  │
│  │      Scene Manager        │  │  ← керує сценами
│  │  ┌─────────────────────┐  │  │
│  │  │   BootScene         │  │  │  ← швидка ініціалізація
│  │  │   PreloadScene      │  │  │  ← завантаження ассетів
│  │  │   MenuScene         │  │  │  ← меню
│  │  │   GameScene         │  │  │  ← гра
│  │  │   UIScene           │  │  │  ← UI поверх гри
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Loader / Cache / Sound   │  │
│  │  Input / Physics / Tweens │  │
│  │  Renderer / Camera        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## Ключові концепції (короткий словник)

| Термін | Значення |
|---|---|
| **Game** | Кореневий об'єкт, інстанс Phaser.Game |
| **Scene** | Самостійний модуль гри (меню, рівень, UI) |
| **GameObject** | Будь-який об'єкт на сцені (Sprite, Text, Graphics) |
| **Texture** | Завантажене зображення в пам'яті GPU |
| **Atlas** | Один файл із багатьма спрайтами + JSON із координатами |
| **Tween** | Плавна анімація властивостей (alpha, x, scale, ...) |
| **Animation** | Покадрова анімація на основі спрайтшита |
| **Cache** | Сховище завантажених ассетів |
| **Loader** | Менеджер завантаження ассетів |

## Що нам потрібно для старту

1. **Node.js 18+** і npm
2. Будь-який редактор (VS Code, WebStorm)
3. Сучасний браузер (Chrome/Firefox)
4. Базове знання JavaScript (ES6+, класи, promises, modules)

## Чого знати **не потрібно** (Phaser сам усе сховає)

- WebGL і шейдери (на старті)
- Матрична математика (на старті)
- Низькорівнева робота з Canvas API

---

## ✅ Вправа 0

Жодного коду в цій главі немає. Зате:

1. Відкрий [phaser.io/examples](https://phaser.io/examples) і **погортай хвилин 15**. Запам'ятай, що Phaser уміє.
2. Знайди розділ "Tweens" → "Yoyo" — це знадобиться у слотах для пульсації символів.
3. Знайди розділ "Masks" — це знадобиться для барабанів слота.

Коли будеш готовий — переходь до [Глави 1. Налаштування проєкту](./01-setup.md).


---

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


---

# Глава 2. Game Config — конфігурація гри

`Game Config` — це об'єкт, який ти передаєш у `new Phaser.Game(config)`. Він визначає **всю** поведінку твоєї гри на верхньому рівні: розмір, рендерер, фізику, плагіни, сцени.

## Мінімальний конфіг

```js
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene]
};
```

## Повний конфіг із поясненнями

```js
const config = {
  // === Рендерер ===
  type: Phaser.AUTO,           // AUTO | WEBGL | CANVAS | HEADLESS

  // === Розмір канваса ===
  width: 1280,
  height: 720,

  // === DOM ===
  parent: 'game',              // id елемента-контейнера
  canvas: undefined,           // можна підсунути наявний <canvas>
  canvasStyle: '',             // CSS для канваса
  expandParent: true,

  // === Колір фону ===
  backgroundColor: '#1a1a2e',

  // === Сцени ===
  scene: [BootScene, PreloadScene, GameScene],

  // === Масштабування ===
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
    min: { width: 320, height: 480 },
    max: { width: 1920, height: 1080 }
  },

  // === Фізика ===
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },

  // === Введення ===
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false,
    activePointers: 3          // скільки пальців одночасно відстежувати
  },

  // === Аудіо ===
  audio: {
    disableWebAudio: false,
    noAudio: false
  },

  // === Рендеринг ===
  render: {
    pixelArt: false,           // true = різке масштабування без згладжування
    antialias: true,
    roundPixels: false,
    transparent: false,
    powerPreference: 'high-performance' // 'default' | 'high-performance' | 'low-power'
  },

  // === FPS ===
  fps: {
    target: 60,
    forceSetTimeOut: false,
    smoothStep: true
  },

  // === Плагіни ===
  plugins: {
    global: [],
    scene: []
  },

  // === Локальне сховище (DOM) ===
  dom: {
    createContainer: false
  }
};
```

## Розбір по розділах

### `type`

| Значення | Що робить |
|---|---|
| `Phaser.AUTO` | Сам обирає: WebGL якщо можливо, інакше Canvas (рекомендується) |
| `Phaser.WEBGL` | Тільки WebGL. Якщо не підтримується — помилка |
| `Phaser.CANVAS` | Тільки 2D Canvas. Повільніше, але універсально |
| `Phaser.HEADLESS` | Без рендерингу (для серверних тестів) |

**Використовуй `Phaser.AUTO` завжди**, окрім особливих випадків.

### `width` / `height`

Це **внутрішній логічний розмір гри**. Усі координати всередині (x=400, y=300) вимірюються в цих одиницях. Реальний розмір на екрані визначається `scale`.

Для слотів часто беруть:
- **Landscape:** 1280×720 або 1920×1080
- **Portrait:** 720×1280 або 1080×1920
- **Універсал:** 1280×800 (компроміс)

### `parent`

DOM-елемент, у який Phaser вставить свій `<canvas>`. Можна передати:
- ID рядком: `'game'`
- DOM-елемент: `document.getElementById('game')`
- Якщо не вказати — канвас вставиться в `<body>`

### `backgroundColor`

Колір за всім рендерингом. Приймає:
- Hex-рядок: `'#1a1a2e'`
- Hex-число: `0x1a1a2e`
- CSS-ім'я: `'red'`

Якщо встановити `render.transparent: true`, колір фону ігнорується і канвас стає прозорим (корисно для інтеграції в сторінку).

### `scene`

Масив сцен. **Перша сцена в масиві запускається автоматично.** Інші можна стартувати через `this.scene.start('Key')`.

Можна передати:
- Масив класів: `[BootScene, GameScene]`
- Масив об'єктів: `[{ key: 'GameScene', preload, create, update }]`
- Один об'єкт (для найпростіших ігор)

### `render` — нюанси

**`pixelArt: true`** — критично для піксель-арту. Вмикає `nearest neighbor` фільтрацію замість `linear`. Без цього піксельний спрайт при масштабуванні розмиється.

```js
render: {
  pixelArt: true,
  antialias: false,
  roundPixels: true
}
```

**`powerPreference`** — для мобільних. На ноутбуках обирає дискретну відеокарту замість вбудованої.

**`transparent: true`** — канвас прозорий, видно HTML під ним. Корисно для оверлеїв, але дає невеликий оверхед.

### `fps`

```js
fps: {
  target: 60,           // цільовий FPS
  forceSetTimeOut: false,  // не використовувати requestAnimationFrame
  smoothStep: true      // згладжування deltaTime
}
```

`target: 60` не означає "обмежити 60 FPS". Це значення впливає на фізику й timing, реальний кадр іде з частотою монітора (60/120/144 Hz).

## Приклад конфіга для слот-гри

```js
export const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0a0a1a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  render: {
    antialias: true,
    powerPreference: 'high-performance'
  },
  // Фізика слотам зазвичай не потрібна
  scene: [BootScene, PreloadScene, GameScene, UIScene]
};
```

## Доступ до конфіга зі сцени

```js
create() {
  const { width, height } = this.scale.gameSize;
  console.log(this.game.config);     // повний конфіг
  console.log(this.sys.game.config.width); // ширина
}
```

## Як міняти конфіг **на льоту**

Більшість параметрів **не можна** міняти після `new Phaser.Game()`. Але ось що можна:

```js
// Змінити розмір
this.scale.resize(1920, 1080);

// Змінити колір фону
this.cameras.main.setBackgroundColor('#ff0000');

// Увімкнути/вимкнути debug-фізику
this.physics.world.drawDebug = true;
```

## Кілька ігор на сторінці

Можна створити кілька `Phaser.Game` інстансів на одній сторінці:

```js
const game1 = new Phaser.Game({ ...config1, parent: 'slot1' });
const game2 = new Phaser.Game({ ...config2, parent: 'slot2' });
```

Корисно, наприклад, якщо в тебе сторінка з галереєю слотів.

---

## ✅ Вправа 2

У проєкті з Глави 1:

1. **Поміняй** розмір на 1280×720.
2. **Увімкни** `scale.mode: Phaser.Scale.FIT` та `autoCenter` — гра має лишатися центрованою при ресайзі вікна.
3. **Поміняй** `backgroundColor` через `cameras.main.setBackgroundColor()` у `create()` — подивись, як це працює інакше.
4. **Спробуй** встановити `render.pixelArt: true` — чи побачиш ти різницю на тексті?
5. **Відкрий консоль** і виведи `this.sys.game.config` у `create()` — вивчи, що там.

Коли розібрався — переходь до [Глави 3. Сцени (Scenes)](./03-scenes.md).


---

# Глава 3. Сцени (Scenes)

Сцена — це **самостійний модуль** гри. Меню, рівень, екран завантаження, UI поверх гри — усе це окремі сцени. Сцени вміють запускатися, зупинятися, ставитися на паузу, працювати паралельно.

## Навіщо потрібні сцени

- **Ізоляція логіки:** код меню не змішується з кодом ігрового рівня
- **Перевикористання:** одну сцену можна перезапускати з різними параметрами (рестарт рівня)
- **Паралельність:** UI іде поверх ігрової сцени як окремий шар
- **Керування пам'яттю:** при зупинці сцени її ресурси можна очистити

## Створення сцени

Два способи:

### 1. Через клас (рекомендується)

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) { /* ініціалізація */ }
  preload() { /* завантаження ассетів */ }
  create(data) { /* створення об'єктів */ }
  update(time, delta) { /* кадр */ }
}
```

### 2. Через об'єкт (для мікро-ігор)

```js
const config = {
  scene: {
    key: 'main',
    preload: function() { /* ... */ },
    create: function() { /* ... */ },
    update: function() { /* ... */ }
  }
};
```

## Життєвий цикл сцени

Коли сцена запускається, методи викликаються в такому порядку:

```
init(data)  →  preload()  →  create(data)  →  update(time, delta)  ← цикл
```

| Метод | Коли викликається | Для чого |
|---|---|---|
| `init(data)` | Один раз, до завантаження | Ініціалізація змінних, розбір `data` |
| `preload()` | Один раз, перед `create` | Завантаження ассетів через `this.load` |
| `create(data)` | Один раз, після завантаження | Створення об'єктів, запуск анімацій |
| `update(time, delta)` | Кожен кадр (60+ разів/сек) | Ігрова логіка, рух |

Додаткові хуки:

| Метод | Коли |
|---|---|
| `pause()` | При паузі сцени |
| `resume()` | При відновленні |
| `sleep()` | При "засинанні" (сцена прихована, але жива) |
| `wake()` | При пробудженні |
| `shutdown()` | При зупинці (об'єкти знищуються) |
| `destroy()` | При повному видаленні (рідко використовується) |

## Менеджер сцен — `this.scene`

У кожній сцені доступний `this.scene` — це плагін для керування сценами.

### Основні методи

```js
// Запустити сцену (поточна зупиняється)
this.scene.start('GameScene');

// Запустити сцену паралельно (поточна працює)
this.scene.launch('UIScene');

// Передати дані під час запуску
this.scene.start('GameScene', { level: 5, score: 100 });

// Перезапустити поточну сцену
this.scene.restart();

// Перезапустити з даними
this.scene.restart({ level: 6 });

// Зупинити сцену
this.scene.stop('UIScene');

// Пауза / відновлення
this.scene.pause('GameScene');
this.scene.resume('GameScene');

// Sleep / wake (швидше за stop/start, не викликає destroy)
this.scene.sleep('UIScene');
this.scene.wake('UIScene');

// Перемикання (стоп поточної + старт указаної)
this.scene.switch('MenuScene');

// Отримати інстанс іншої сцени
const ui = this.scene.get('UIScene');
ui.events.emit('updateScore', 100);

// Змінити порядок відмалювання
this.scene.bringToTop('UIScene');     // нагору
this.scene.sendToBack('Background');  // вниз
this.scene.moveAbove('A', 'B');       // A вище B
```

## Передача даних між сценами

### Спосіб 1. Через `start(key, data)`

```js
// З MenuScene
this.scene.start('GameScene', {
  level: 1,
  difficulty: 'hard',
  playerName: 'Sergey'
});

// У GameScene
init(data) {
  this.level = data.level;
  this.difficulty = data.difficulty;
}

create(data) {
  this.add.text(0, 0, `Level ${data.level}`);
}
```

### Спосіб 2. Через events (для паралельних сцен)

```js
// У UIScene
const gameScene = this.scene.get('GameScene');
gameScene.events.on('scoreChanged', (score) => {
  this.scoreText.setText(`Score: ${score}`);
});

// У GameScene
this.events.emit('scoreChanged', 250);
```

### Спосіб 3. Через registry (глобальне сховище)

```js
// Встановити
this.registry.set('playerName', 'Sergey');
this.registry.set('coins', 100);

// Отримати з будь-якої сцени
const name = this.registry.get('playerName');

// Слухати зміни
this.registry.events.on('changedata-coins', (parent, value, prev) => {
  console.log(`Coins: ${prev} → ${value}`);
});
```

## Патерн: BootScene → PreloadScene → GameScene

Це **стандартний патерн** для будь-якої Phaser-гри.

### `BootScene` — мінімальна ініціалізація

Завантажує тільки те, що потрібне для гарного екрана завантаження (логотип, прогрес-бар).

```js
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('progressBar', 'assets/progress-bar.png');
  }

  create() {
    this.scene.start('PreloadScene');
  }
}
```

### `PreloadScene` — завантаження всіх ассетів

Показує прогрес, вантажить усе необхідне для гри.

```js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Логотип уже завантажений у BootScene — показуємо
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2 - 50, 'logo');

    // Прогрес-бар
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 50, 320, 30);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 60, 300 * value, 10);
    });

    // Завантажуємо основні ассети
    this.load.image('background', 'assets/sprites/background.webp');
    this.load.atlas('symbols', 'assets/atlas.png', 'assets/atlas.json');
    this.load.audio('spin', 'assets/sounds/spin.mp3');
    // ...
  }

  create() {
    this.scene.start('GameScene');
  }
}
```

### `GameScene` — основний геймплей

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.image(640, 360, 'background');
    // запускаємо UI паралельно
    this.scene.launch('UIScene');
  }
}
```

## Паралельні сцени (UI поверх гри)

Часто UI роблять в окремій сцені:

```js
// У GameScene
create() {
  // створюємо ігровий світ
  this.scene.launch('UIScene');  // UI запускається паралельно
}
```

Переваги:
- UI не рухається разом із камерою гри
- Можна паузити геймплей, лишивши UI активним
- Чистий розподіл відповідальності

## Життєвий цикл при перемиканнях

| Дія | Що відбувається |
|---|---|
| `start(B)` із A | A.shutdown() → B.init() → B.preload() → B.create() |
| `launch(B)` із A | A продовжує працювати, паралельно B.init() → preload() → create() |
| `pause(A)` | A.pause() — update перестає викликатися, об'єкти лишаються |
| `sleep(A)` | A.sleep() — невидима + update зупинений, але об'єкти живуть |
| `stop(A)` | A.shutdown() — усі об'єкти знищуються |

## Важливі пастки

### 1. Об'єкти не знищуються при `pause`

Якщо ставиш сцену на паузу, її об'єкти живуть. При `stop` — знищуються. Це впливає на пам'ять.

### 2. Слухачі подій

При `shutdown` сцени слухачі на сторонніх об'єктах (`this.input.on`, `this.events.on`) **очищаються автоматично**. Але слухачі на DOM або глобальні — ні, їх треба знімати вручну.

```js
shutdown() {
  window.removeEventListener('resize', this.onResize);
}
```

### 3. `update` після `stop`

Після `scene.stop(key)` метод `update` більше не викликається. Не намагайся ставити там логіку, яка має виконатися "на закритті" — використовуй `shutdown`.

### 4. Унікальність ключів

Кожна сцена має мати **унікальний** `key`. Інакше менеджер сцен заплутається.

## Корисні патерни для слотів

### Патерн 1. Game + UI

```
GameScene  — барабани, символи, фон
UIScene    — кнопка спіну, баланс, бет, історія
```

UI отримує події від GameScene:
```js
// UIScene
const game = this.scene.get('GameScene');
game.events.on('spin-complete', this.onSpinComplete, this);
game.events.on('win', this.showWin, this);
```

### Патерн 2. Bonus Game

Коли спрацьовує бонус, запускається окрема сцена:

```js
// У GameScene
if (bonusTriggered) {
  this.scene.sleep();          // призупинити основну гру
  this.scene.launch('BonusScene', { spins: 10 });
}

// У BonusScene при завершенні
this.scene.stop();
this.scene.wake('GameScene');
```

---

## ✅ Вправа 3

У проєкті з Глави 1:

1. Створи 3 сцени: `MenuScene`, `GameScene`, `GameOverScene`.
2. У `MenuScene` зроби текст "Click to start" — за кліком переходить у `GameScene` з даними `{ level: 1 }`.
3. У `GameScene` виведи переданий рівень. За натисненням пробілу переходь у `GameOverScene` з `{ score: 100 }`.
4. У `GameOverScene` покажи рахунок і текст "Press R to restart" — за R повертайся до `MenuScene`.
5. **Бонус:** запусти `UIScene` паралельно з `GameScene`, у ній покажи лічильник "Time: 0", який збільшується щосекунди (через `this.time.addEvent`).

Коли працює — переходь до [Глави 4. Завантаження ассетів](./04-assets.md).


---

# Глава 4. Завантаження ассетів (Loader)

Без ассетів гра — це порожній канвас. У Phaser за завантаження відповідає **Loader** — `this.load`, доступний у кожній сцені.

## Де зберігати ассети

У Vite-проєкті папка `public/` копіюється в корінь під час збірки як є. Тому:

```
public/
└── assets/
    ├── sprites/
    │   ├── background.webp
    │   ├── card.webp
    │   └── symbols.atlas.png
    ├── sounds/
    │   ├── spin.mp3
    │   └── win.mp3
    └── fonts/
        └── game-font.ttf
```

У коді шлях буде `'assets/sprites/background.webp'` (без `public/`).

## Коли завантажувати

У методі `preload()` сцени:

```js
preload() {
  this.load.image('logo', 'assets/sprites/logo.png');
  this.load.audio('theme', 'assets/sounds/theme.mp3');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
}

create() {
  // тут усі ассети вже доступні
  this.add.image(400, 300, 'logo');
}
```

Phaser **автоматично** запустить завантаження перед `create()` і зачекає.

## Типи ассетів

### 1. Зображення

```js
this.load.image('key', 'assets/sprites/file.png');
```

Використання:
```js
this.add.image(x, y, 'key');
this.add.sprite(x, y, 'key');
```

Підтримка форматів: PNG, JPG, WEBP, GIF (статичний), SVG.

**Порада:** використовуй WEBP — він у 2-3 рази легший за PNG за тієї ж якості.

### 2. Спрайтшит (sprite sheet)

Один файл із рівномірною сіткою кадрів.

```js
this.load.spritesheet('player', 'assets/sprites/player.png', {
  frameWidth: 64,
  frameHeight: 64,
  startFrame: 0,
  endFrame: 15
});
```

Використання:
```js
this.add.sprite(x, y, 'player', 0);  // перший кадр
this.add.sprite(x, y, 'player', 5);  // шостий кадр
```

### 3. Texture Atlas (атлас) — **найважливіший для слотів**

Атлас — це один великий PNG із багатьма різнорозмірними спрайтами + JSON із координатами. Створюється в [TexturePacker](https://www.codeandweb.com/texturepacker) або [free-tex-packer](http://free-tex-packer.com/).

```js
this.load.atlas(
  'symbols',
  'assets/sprites/symbols.png',
  'assets/sprites/symbols.json'
);
```

JSON виглядає приблизно так (формат TexturePacker JSON Hash):

```json
{
  "frames": {
    "ace.png":     { "frame": {"x":0,"y":0,"w":120,"h":120} },
    "king.png":    { "frame": {"x":120,"y":0,"w":120,"h":120} },
    "queen.png":   { "frame": {"x":240,"y":0,"w":120,"h":120} }
  },
  "meta": {
    "image": "symbols.png",
    "size": {"w":1024,"h":1024}
  }
}
```

Використання:
```js
this.add.image(x, y, 'symbols', 'ace.png');
this.add.image(x, y, 'symbols', 'king.png');
```

**Навіщо потрібен атлас:**
- Менше HTTP-запитів
- Краще використовує GPU (один draw call замість десятків)
- Менше порожнечі в текстурах
- **Обов'язковий** для оптимізації слотів

### 4. Аудіо

```js
this.load.audio('spin', 'assets/sounds/spin.mp3');

// Кілька форматів для сумісності (Phaser обере перший підтримуваний)
this.load.audio('theme', [
  'assets/sounds/theme.ogg',
  'assets/sounds/theme.mp3'
]);
```

Використання:
```js
this.sound.play('spin');
const music = this.sound.add('theme', { loop: true, volume: 0.5 });
music.play();
```

### 5. Аудіо-спрайт

Один файл із кількома звуками + JSON із таймкодами. Зручно для коротких SFX.

```js
this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
  'assets/sounds/sfx.mp3',
  'assets/sounds/sfx.ogg'
]);

// Відтворення
this.sound.playAudioSprite('sfx', 'click');
this.sound.playAudioSprite('sfx', 'win');
```

JSON-формат:
```json
{
  "resources": ["sfx.mp3"],
  "spritemap": {
    "click": { "start": 0, "end": 0.5, "loop": false },
    "win":   { "start": 1.0, "end": 2.5, "loop": false }
  }
}
```

### 6. JSON

```js
this.load.json('config', 'assets/config.json');
this.load.json('paytable', 'assets/paytable.json');

// Використання
const cfg = this.cache.json.get('config');
console.log(cfg.startBalance);
```

### 7. Bitmap Font

Готовий шрифт у вигляді атласа. Дуже швидкий для динамічних текстів (лічильники, баланси).

```js
this.load.bitmapFont(
  'gameFont',
  'assets/fonts/font.png',
  'assets/fonts/font.xml'
);

// Використання
this.add.bitmapText(x, y, 'gameFont', 'Score: 100', 32);
```

Шрифти створюються в [BMFont](https://www.angelcode.com/products/bmfont/) або [Hiero](https://libgdx.com/wiki/tools/hiero).

### 8. Web Font (TTF/WOFF)

Web-шрифт вантажиться **поза** Phaser-loader. Стандартний шлях — через CSS:

```css
/* В index.html або CSS-файлі */
@font-face {
  font-family: 'CurseCasual';
  src: url('assets/fonts/CurseCasual.ttf') format('truetype');
}
```

Потім використовуєш:
```js
this.add.text(x, y, 'Hello', { fontFamily: 'CurseCasual', fontSize: '32px' });
```

⚠️ **Підступ:** якщо спробуєш використати шрифт раніше, ніж браузер його завантажить — побачиш дефолтний. Лікується плагіном [WebFont Loader](https://github.com/typekit/webfontloader) або promise'ом `document.fonts.ready`.

### 9. Spine (скелетна анімація)

Для слот-індустрії — критично. Через плагін:

```js
this.load.setPath('assets/spine/');
this.load.spine('hero', 'hero.json', ['hero.atlas']);

// Використання
const hero = this.add.spine(400, 300, 'hero', 'idle', true);
```

### 10. HTML / Video / Plugin

```js
this.load.html('form', 'assets/html/form.html');
this.load.video('intro', 'assets/video/intro.mp4');
this.load.plugin('rexUI', 'plugins/rex-ui.js', true);
```

## Події завантаження

```js
preload() {
  this.load.on('start', () => console.log('Loading started'));
  this.load.on('progress', (value) => {
    // value: 0..1
    console.log(`Progress: ${(value * 100).toFixed(0)}%`);
  });
  this.load.on('fileprogress', (file) => {
    console.log(`Loading: ${file.key}`);
  });
  this.load.on('complete', () => console.log('All loaded'));
  this.load.on('loaderror', (file) => console.error(`Failed: ${file.key}`));

  // Самі завантаження
  this.load.image('bg', 'assets/bg.webp');
  // ...
}
```

## Прогрес-бар (повний приклад)

```js
preload() {
  const { width, height } = this.scale;

  // Фон бара
  const box = this.add.rectangle(width/2, height/2, 320, 30, 0x222222);
  box.setStrokeStyle(2, 0xffffff);

  // Сам бар
  const bar = this.add.rectangle(width/2 - 150, height/2, 0, 16, 0xffffff)
    .setOrigin(0, 0.5);

  // Відсоток
  const percentText = this.add.text(width/2, height/2 + 40, '0%', {
    fontSize: '20px', color: '#fff'
  }).setOrigin(0.5);

  this.load.on('progress', (value) => {
    bar.width = 300 * value;
    percentText.setText(`${(value * 100).toFixed(0)}%`);
  });

  // Завантажуємо все, що потрібно
  this.load.image('bg', 'assets/sprites/background.webp');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
  this.load.audio('spin', 'assets/sounds/spin.mp3');
  // тощо
}

create() {
  this.scene.start('GameScene');
}
```

## Динамічне завантаження (після `create`)

Інколи треба довантажити ассети **пізніше** (наприклад, при переході в бонус-гру):

```js
create() {
  // Довантажуємо ассети бонусу
  this.load.image('bonusBg', 'assets/sprites/bonus-bg.webp');
  this.load.atlas('bonusSymbols', 'assets/atlases/bonus.png', 'assets/atlases/bonus.json');

  // Запускаємо завантаження
  this.load.once('complete', () => {
    this.startBonusGame();
  });
  this.load.start();   // обов'язково — інакше нічого не завантажиться
}
```

## Cache — де зберігаються завантажені ассети

```js
this.cache.json.get('paytable');
this.cache.audio.get('spin');
this.textures.get('symbols');
this.textures.exists('logo');     // bool

// Видалити з кешу
this.textures.remove('logo');
this.cache.json.remove('paytable');
```

## Базовий шлях (`setPath`)

Щоб не повторювати префікси:

```js
this.load.setPath('assets/sprites/');
this.load.image('bg', 'background.webp');
this.load.image('card', 'card.webp');
this.load.image('symbol1', 'symbol1.webp');

this.load.setPath('assets/sounds/');
this.load.audio('spin', 'spin.mp3');
this.load.audio('win', 'win.mp3');
```

## Префікс ключів

```js
this.load.setPrefix('slot.');
this.load.image('bg', 'background.webp');  // ключ буде 'slot.bg'
this.load.setPrefix();  // скидання
```

## Маніфест-файл (патерн для великих ігор)

Замість того щоб розкидати `this.load.*` по сценах, тримай список ассетів в одному файлі:

```js
// src/core/AssetManifest.js
export const ASSETS = {
  images: [
    { key: 'background', url: 'assets/sprites/background.webp' },
    { key: 'logo',       url: 'assets/sprites/logo.webp' }
  ],
  atlases: [
    { key: 'symbols', tex: 'assets/atlases/symbols.png', json: 'assets/atlases/symbols.json' }
  ],
  sounds: [
    { key: 'spin', url: 'assets/sounds/spin.mp3' },
    { key: 'win',  url: 'assets/sounds/win.mp3' }
  ]
};
```

```js
// PreloadScene.js
import { ASSETS } from '../core/AssetManifest.js';

preload() {
  ASSETS.images.forEach(a => this.load.image(a.key, a.url));
  ASSETS.atlases.forEach(a => this.load.atlas(a.key, a.tex, a.json));
  ASSETS.sounds.forEach(a => this.load.audio(a.key, a.url));
}
```

## Нюанси та підводні камені

| Проблема | Рішення |
|---|---|
| Ассет не знаходиться | Перевір шлях відносно `public/`, без `public/` на початку |
| CORS-помилка | Запускай через `npm run dev`, не відкривай HTML напряму |
| Звук не грає на iOS | Потрібен користувацький tap для розблокування WebAudio |
| Атлас не працює | Перевір, що JSON і PNG лежать поруч і формат збігається (Hash або Array) |
| Шрифт показується дефолтним | Чекай `document.fonts.ready` перед використанням |

---

## ✅ Вправа 4

Використовуючи ассети з цього репо (`assets/sprites/card1.webp` ... `card5.webp`):

1. У `PreloadScene` завантаж усі 5 карт через цикл `for`.
2. Зроби прогрес-бар — фон + бар + відсоток.
3. Додай штучну затримку: після `complete` зачекай 500мс через `this.time.delayedCall`, потім перейди в `GameScene`.
4. У `GameScene` виведи всі 5 карт у ряд по центру.
5. **Бонус:** завантаж `assets/sounds/card.mp3`. За кліком на карту програвай цей звук.

Готово — переходимо до [Глави 5. Display Objects](./05-display-objects.md).


---

# Глава 5. Display Objects — що ми малюємо на сцені

Будь-який об'єкт, який ти бачиш на екрані — це **Game Object** (він же Display Object). У всіх них спільний API: `x`, `y`, `alpha`, `scale`, `rotation`, `visible`, `setOrigin`, `setDepth` тощо.

У цій главі розберемо основні типи.

## Базовий API всіх Display Objects

```js
const obj = this.add.image(400, 300, 'card');

// Позиція
obj.x = 100;
obj.y = 200;
obj.setPosition(100, 200);

// Розмір (масштаб)
obj.scale = 2;
obj.setScale(2);
obj.setScale(2, 1.5);          // x, y окремо
obj.scaleX = 1.5;
obj.scaleY = 0.8;

// Поворот
obj.rotation = Math.PI / 4;    // у радіанах
obj.angle = 45;                // у градусах (те саме)
obj.setRotation(0.5);
obj.setAngle(45);

// Прозорість
obj.alpha = 0.5;
obj.setAlpha(0.5);

// Видимість
obj.visible = false;
obj.setVisible(true);

// Глибина (z-order). Чим більше — тим вище у стеку
obj.setDepth(10);

// Origin — точка відліку (0..1)
obj.setOrigin(0.5);            // центр
obj.setOrigin(0, 0);           // верхній-лівий кут
obj.setOrigin(1, 1);           // нижній-правий

// Tint — кольоровий відтінок (множення кольору)
obj.setTint(0xff0000);         // червоний
obj.setTint(0xff0000, 0x00ff00, 0x0000ff, 0xffffff);  // 4 кути
obj.clearTint();

// Знищення
obj.destroy();
```

## 1. Image — статична картинка

Найпростіший об'єкт — просто відображає текстуру.

```js
const bg = this.add.image(640, 360, 'background');
const logo = this.add.image(640, 200, 'logo');

// З атласа — указуємо frame
const card = this.add.image(400, 300, 'symbols', 'ace.png');
```

`Image` **не має** анімацій. Для них потрібен `Sprite`.

## 2. Sprite — зображення з підтримкою анімацій

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');   // запустити анімацію (про анімації — глава 6)
```

Visually ідентичний до `Image`, але важчий. Використовуй `Sprite` лише якщо **точно** будуть анімації.

## 3. Text — звичайний текст

```js
const score = this.add.text(20, 20, 'Score: 0', {
  fontFamily: 'Arial',
  fontSize: '32px',
  color: '#ffffff',
  stroke: '#000000',
  strokeThickness: 4,
  shadow: {
    offsetX: 2,
    offsetY: 2,
    color: '#000',
    blur: 2,
    stroke: true,
    fill: true
  },
  align: 'center',
  padding: { x: 10, y: 5 },
  wordWrap: { width: 300, useAdvancedWrap: true }
});

// Зміна
score.setText('Score: 100');
score.setColor('#ffff00');
score.setFontSize(48);
score.setStyle({ fontFamily: 'Verdana', color: '#0f0' });

// Розміри
console.log(score.width, score.height);
```

**Мінуси Text:**
- Кожна зміна тексту створює нову текстуру в GPU. Дорого.
- Для динамічних лічильників (баланс, виграш) краще використовувати BitmapText.

## 4. BitmapText — швидкий текст

```js
const balance = this.add.bitmapText(20, 20, 'gameFont', 'Balance: 1000', 32);

balance.setText('Balance: 950');  // дешево, не створює нову текстуру
balance.setTint(0x00ff00);
balance.setLetterSpacing(2);
```

**Плюси:** оновлення тексту майже безкоштовне.
**Мінуси:** потрібен заздалегідь підготовлений bitmap font. Не всі символи можуть бути у шрифті (привіт, емодзі та кирилиця — потрібно генерувати з підтримкою).

**Використовуй BitmapText для всього, що часто змінюється:** баланс, виграш, лічильник секунд, таймери.

## 5. Graphics — малювання примітивів

`Graphics` — це малювання ліній, прямокутників, кіл, складних фігур через код.

```js
const g = this.add.graphics();

// Заливка
g.fillStyle(0xff0000, 1);              // колір, alpha
g.fillRect(100, 100, 200, 100);
g.fillCircle(300, 200, 50);
g.fillTriangle(0, 0, 100, 0, 50, 100);
g.fillRoundedRect(0, 0, 200, 100, 16);  // заокруглений

// Обведення
g.lineStyle(4, 0x00ff00, 1);
g.strokeRect(100, 100, 200, 100);
g.strokeCircle(300, 200, 50);

// Лінія
g.lineBetween(0, 0, 100, 100);

// Складний шлях
g.beginPath();
g.moveTo(100, 100);
g.lineTo(200, 100);
g.lineTo(200, 200);
g.closePath();
g.fillPath();

// Очистити
g.clear();
```

**Коли використовувати Graphics:**
- Рамки, сітки, дебаг-візуалізація
- Простий UI без ассетів
- Маски

**Мінус:** повільніше за спрайти на великих сценах. Кожне відмалювання `Graphics` — окремий draw call.

## 6. Shape Game Objects — спрощені примітиви

Якщо потрібен один прямокутник або коло — є готові шорткати:

```js
this.add.rectangle(x, y, width, height, color);
this.add.circle(x, y, radius, color);
this.add.ellipse(x, y, width, height, color);
this.add.triangle(x, y, x1, y1, x2, y2, x3, y3, color);
this.add.line(x, y, x1, y1, x2, y2, color);
this.add.polygon(x, y, points, color);
this.add.star(x, y, points, innerRadius, outerRadius, color);
this.add.arc(x, y, radius, startAngle, endAngle, false, color);

// Обведення
const r = this.add.rectangle(100, 100, 200, 100, 0xff0000);
r.setStrokeStyle(4, 0xffffff);
```

Вони швидші за `Graphics` для одиночних фігур.

## 7. Container — групування об'єктів

`Container` — це **контейнер для інших Game Objects**. Координати всередині контейнера локальні.

```js
const card = this.add.container(400, 300);

const bg = this.add.image(0, 0, 'cardBg');
const symbol = this.add.image(0, -20, 'symbols', 'ace.png');
const value = this.add.text(0, 50, '100', { fontSize: '24px', color: '#fff' });

card.add([bg, symbol, value]);

// Тепер рухаємо всю карту цілком
card.x = 500;
card.setRotation(0.2);
card.setScale(1.5);
```

**Коли потрібен Container:**
- Карта (фон + символ + цифра)
- Барабан слота (маска + стовпець символів)
- UI-панель (фон + кнопки + текст)
- Будь-яка "складна штука", яку рухаєш як одне ціле

**Особливості:**
- У контейнера немає своєї текстури — він невидимий сам по собі
- `setOrigin` у контейнера не працює як зазвичай (він рахується від 0,0)
- Маски працюють на контейнері цілком

## 8. Group — колекція для керування

`Group` — **не контейнер**. Це колекція Game Objects для зручного керування (створення, перевикористання, ітерація). Об'єкти в групі **не дочірні** — вони на сцені, але в одному "пулі".

```js
const enemies = this.add.group();
enemies.create(100, 100, 'enemy');
enemies.create(200, 200, 'enemy');

// Застосувати до всіх
enemies.setVelocityX(100);
enemies.children.iterate((enemy) => {
  enemy.alpha = 0.5;
});

// Отримати випадковий
const random = enemies.getFirstAlive();
```

**Головне використання Group — object pooling** (див. главу 13).

## 9. RenderTexture — рендеринг у текстуру

Можна намалювати щось один раз у текстуру і використовувати як звичайне зображення. Дорога операція при створенні, дешева при відображенні.

```js
const rt = this.add.renderTexture(0, 0, 800, 600);
rt.draw('background', 0, 0);
rt.draw('logo', 100, 100);
// rt тепер — звичайне зображення, виводиться одним draw call
```

Корисно для статичних композицій.

## 10. TileSprite — повторювана текстура

Картинка, яка тайлиться. Можна прокручувати.

```js
const sky = this.add.tileSprite(640, 360, 1280, 720, 'sky');
update() {
  sky.tilePositionX += 1;   // нескінченний скрол
}
```

Ідеально для паралакс-фонів і слот-барабанів (символи можна зробити через TileSprite, хоча частіше роблять через Container із маскою).

## 11. NineSlice — розтяжний прямокутник

Картинка з фіксованими кутами та розтяжною серединою. Для UI-панелей довільного розміру.

```js
const panel = this.add.nineslice(400, 300, 'panel', null, 300, 200, 16, 16, 16, 16);
//                                                    ширина висота ліваправа верх низ
```

## Маски — обрізання за формою

Маска обмежує видиму ділянку об'єкта. Дуже важливо для **барабанів слота**.

### Geometry Mask (через Graphics)

```js
const mask = this.add.graphics();
mask.fillRect(100, 100, 300, 400);    // прямокутна ділянка
const geomMask = mask.createGeometryMask();

const reel = this.add.container(0, 0);
// додаємо символи в reel
reel.setMask(geomMask);

// Ховаємо сам Graphics
mask.setVisible(false);
```

### Bitmap Mask (через спрайт)

Альфа іншого спрайта визначає видимість:

```js
const maskImage = this.make.image({ x: 0, y: 0, key: 'maskShape', add: false });
const bitmapMask = maskImage.createBitmapMask();
target.setMask(bitmapMask);
```

## Depth — керування z-order

```js
bg.setDepth(0);
gameplay.setDepth(10);
ui.setDepth(100);
modal.setDepth(1000);
```

Об'єкт із більшим `depth` малюється поверх. Усередині однакового depth — порядок додавання.

## Blend Modes

```js
const glow = this.add.image(400, 300, 'glow');
glow.setBlendMode(Phaser.BlendModes.ADD);     // ефект світіння
glow.setBlendMode(Phaser.BlendModes.MULTIPLY); // затемнення
glow.setBlendMode(Phaser.BlendModes.SCREEN);
```

Корисно для ефектів виграшу, відблисків, тіней.

## `add` vs `make`

```js
this.add.image(...);   // створює І додає на сцену
this.make.image(...);  // тільки створює, на сцену не додає
```

`make` потрібен для масок і тимчасових об'єктів.

---

## ✅ Вправа 5

У `GameScene`:

1. Створи **Container**, який імітує карту: фон-прямокутник + текст зі значенням + зображення символу. Розмісти в центрі.
2. За кліком (`this.input.on('pointerdown', ...)`) поверни карту на 360° через `setRotation` (поки без tweens, просто змінюй кут в `update`).
3. Створи 5 карт через цикл `for`, рознеси їх в ряд.
4. Зроби **маску** — нехай карти видно тільки в прямокутнику 800×200 у центрі екрана. Якщо карту "посунути" вгору — вона зникне за маскою.
5. **Бонус:** зроби BitmapText "Score: 0" у правому верхньому куті. За кліком на карту збільшуй рахунок на 10.

Готово — [Глава 6. Анімації та Tweens](./06-animations-tweens.md).


---

# Глава 6. Анімації та Tweens

У Phaser є **два різні типи анімацій**, і їх часто плутають:

1. **Animations** — покадрові (frame-based), для спрайтшитів: ходьба персонажа, ефекти.
2. **Tweens** — плавні зміни властивостей (alpha, x, scale, rotation), універсальні.

Для слотів частіше потрібні **Tweens** (рух барабанів, пульсація виграшу, поява цифр).

## Частина 1. Tweens — плавні анімації

### Базовий синтаксис

```js
this.tweens.add({
  targets: gameObject,
  x: 800,
  y: 400,
  duration: 1000,        // мс
  ease: 'Power2'
});
```

### Повний набір параметрів

```js
this.tweens.add({
  targets: [obj1, obj2],     // один або масив
  x: 800,                    // куди (абсолютне значення)
  y: '+=100',                // відносне (поточне + 100)
  alpha: { from: 0, to: 1 }, // з фіксованим стартом
  scale: 2,
  rotation: Math.PI,
  duration: 1000,            // тривалість
  delay: 200,                // затримка перед стартом
  hold: 0,                   // пауза в кінці перед початком yoyo/repeat
  repeat: 3,                 // 3 повторення (всього 4 програвання); -1 = нескінченно
  repeatDelay: 100,
  yoyo: true,                // повернутися до стартового значення
  ease: 'Sine.easeInOut',
  onStart:    () => console.log('start'),
  onUpdate:   (tween, target) => console.log(target.x),
  onComplete: () => console.log('done'),
  onYoyo:     () => console.log('yoyo'),
  onRepeat:   () => console.log('repeat'),
  paused: false              // створити одразу на паузі
});
```

### Easing — згладжування

Найпоширеніші:

| Ім'я | Поведінка |
|---|---|
| `Linear` | Без згладжування |
| `Power0..Power4` | Поліноміальне |
| `Sine.easeIn/Out/InOut` | Синус-згладжування |
| `Quad.easeIn/Out/InOut` | Квадратичне |
| `Cubic.easeIn/Out/InOut` | Кубічне |
| `Back.easeIn/Out` | Переліт через ціль і повернення |
| `Bounce.easeOut` | Відскок (як м'ячик) |
| `Elastic.easeOut` | Гумка |
| `Expo.easeIn/Out` | Експонента — різкий старт/фініш |

**Правила:**
- `easeIn` — повільний старт, швидкий фініш
- `easeOut` — швидкий старт, повільний фініш (плавна зупинка)
- `easeInOut` — повільний старт І фініш

Для слотів:
- Запуск барабана: `Cubic.easeIn` (поступовий розгін)
- Зупинка барабана: `Back.easeOut` (з легким перельотом)
- Поява символа: `Back.easeOut` або `Elastic.easeOut`
- Пульсація виграшу: `Sine.easeInOut` + `yoyo: true` + `repeat: -1`

### Керування tween-об'єктом

```js
const tween = this.tweens.add({ ... });

tween.pause();
tween.resume();
tween.stop();
tween.restart();
tween.complete();      // миттєво завершити
tween.seek(0.5);       // перемістити на 50%

tween.isPlaying();
tween.isPaused();

tween.setTimeScale(2); // у 2 рази швидше
```

### Ланцюги (chain) — послідовні tweens

```js
this.tweens.chain({
  targets: card,
  tweens: [
    { y: 100, duration: 300, ease: 'Power2' },
    { rotation: Math.PI, duration: 500 },
    { scale: 2, duration: 200, yoyo: true }
  ]
});
```

### Timeline — паралельні + послідовні

> ⚠️ У Phaser 3.60+ старий Timeline видалили, використовується новий API через `chain` + паралельні tweens. Для складних сцен краще використовувати [GSAP](https://greensock.com/gsap/) — це де-факто стандарт в індустрії слотів.

```js
// Паралельно
this.tweens.add({ targets: card1, x: 100, duration: 500 });
this.tweens.add({ targets: card2, x: 200, duration: 500 });

// Послідовно — через onComplete або chain
```

### Tween на окремих властивостях із різними ease

```js
this.tweens.add({
  targets: ball,
  props: {
    x: { value: 800, duration: 1000, ease: 'Linear' },
    y: { value: 400, duration: 1000, ease: 'Bounce.easeOut' }
  }
});
```

### Counter (анімація числа) — для лічильників виграшу

```js
let win = 0;
this.tweens.addCounter({
  from: 0,
  to: 1500,
  duration: 1500,
  ease: 'Cubic.easeOut',
  onUpdate: (tween) => {
    win = Math.floor(tween.getValue());
    this.winText.setText(`Win: ${win}`);
  }
});
```

Це **must have** для слотів — лічильник виграшу завжди так робиться.

## Частина 2. Animations — покадрові анімації

Використовуються зі **Sprite** (не з Image!) і спрайтшитами/атласами.

### Створення анімації

```js
// У create() сцени
this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
  frameRate: 10,        // кадрів на секунду
  repeat: -1            // -1 = нескінченно, 0 = один раз
});

this.anims.create({
  key: 'jump',
  frames: this.anims.generateFrameNames('player', {
    prefix: 'jump_',
    start: 1,
    end: 8,
    suffix: '.png',
    zeroPad: 2          // jump_01, jump_02, ...
  }),
  frameRate: 15,
  repeat: 0
});
```

### Відтворення

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');
player.play('jump', true);  // true = ігнорувати якщо така сама вже грає

player.anims.pause();
player.anims.resume();
player.anims.stop();
player.anims.stopAfterRepeat();

player.anims.timeScale = 2;  // у 2 рази швидше

// Зупинити і повернутися до першого кадру
player.anims.stop();
player.setFrame(0);
```

### Події анімації

```js
player.on('animationstart', (anim) => console.log('start', anim.key));
player.on('animationupdate', (anim, frame) => console.log(frame.index));
player.on('animationcomplete', (anim) => console.log('done'));
player.on('animationrepeat', () => console.log('repeat'));

// Тільки для конкретної анімації
player.on('animationcomplete-jump', () => console.log('jump done'));
```

### Глобальні vs локальні анімації

```js
// Глобальні (доступні в усіх сценах)
this.anims.create({ key: 'walk', ... });

// Локальні (тільки в цій сцені)
this.anims.create({ key: 'walk', ... });
// Насправді всі this.anims — це глобальний AnimationManager, ключі спільні.
```

⚠️ Анімації **глобальні**. Якщо створиш `'walk'` у `GameScene`, вона буде видна і в інших сценах. Використовуй унікальні префікси: `'player.walk'`, `'enemy.walk'`.

### Використання з атласом

```js
this.anims.create({
  key: 'symbol-flash',
  frames: this.anims.generateFrameNames('symbols', {
    prefix: 'flash_',
    start: 1,
    end: 12,
    suffix: '.png'
  }),
  frameRate: 24,
  repeat: 0
});

// Коли символ виграв
winningSymbol.play('symbol-flash');
```

## Порівняння: коли що використовувати

| Завдання | Що використовувати |
|---|---|
| Зрушити символ із A в B | Tween |
| Покрутити барабан | Tween (на властивості `tilePositionY` або `y` контейнера) |
| Анімація виграшу символа (flash, prerendered кадри) | Animation |
| Поява win-тексту | Tween (alpha + scale + Back.easeOut) |
| Лічильник виграшу | Tween (`addCounter`) |
| Пульсація кнопки | Tween (yoyo + repeat: -1) |
| Тряска екрана | Camera shake (див. главу 9) |
| Складна скелетна анімація (бос, персонаж) | Spine |

## Реальний приклад: анімація виграшного символа

```js
function animateWinningSymbol(symbol) {
  // 1. Підсвітка через tint
  symbol.setTint(0xffff00);

  // 2. Пульсація (масштаб)
  this.tweens.add({
    targets: symbol,
    scale: { from: 1, to: 1.3 },
    duration: 400,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 3. Поворот туди-сюди
  this.tweens.add({
    targets: symbol,
    angle: { from: -5, to: 5 },
    duration: 200,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 4. Додатково — кадрова анімація поверх (якщо є атлас "flash")
  // const flash = this.add.sprite(symbol.x, symbol.y, 'symbols', 'flash_01.png');
  // flash.play('symbol-flash');
}

function stopWinningAnimation(symbol) {
  this.tweens.killTweensOf(symbol);
  symbol.clearTint();
  symbol.setScale(1);
  symbol.setAngle(0);
}
```

## Реальний приклад: обертання барабана

```js
class Reel {
  spin() {
    // 1. Розгін
    this.tweens.add({
      targets: this.symbolsContainer,
      y: '+=200',
      duration: 300,
      ease: 'Cubic.easeIn'
    });

    // 2. Нескінченне прокручування (через Phaser.Tweens з onUpdate)
    this.spinTween = this.tweens.add({
      targets: this,
      _spinValue: 1,    // dummy
      duration: 100,
      repeat: -1,
      onRepeat: () => {
        this.symbolsContainer.y += this.spinSpeed;
        if (this.symbolsContainer.y > this.cycleHeight) {
          this.symbolsContainer.y -= this.cycleHeight;
          this.recycleSymbols();
        }
      }
    });
  }

  stop(finalSymbols) {
    this.spinTween.stop();
    // Уповільнення з перельотом
    this.tweens.add({
      targets: this.symbolsContainer,
      y: this.targetY,
      duration: 800,
      ease: 'Back.easeOut'
    });
  }
}
```

## Корисні хелпери

```js
// Вбити всі tweens на об'єкті
this.tweens.killTweensOf(obj);

// Чи існує активний tween на об'єкті?
const exists = this.tweens.getTweensOf(obj).length > 0;

// Глобальна пауза всіх tweens
this.tweens.pauseAll();
this.tweens.resumeAll();
```

---

## ✅ Вправа 6

1. Створи 3 карти в ряд. За кліком на карту:
   - Вона "перевертається" (tween `scaleX: 0 → 1` через 0.5с з `yoyo: false` + при `scaleX = 0` зміни текстуру + продовжи `scaleX: 0 → 1`)
   - **Hint:** використай два послідовні tween через `onComplete` або `chain`.

2. Зроби **лічильник очок** через `tweens.addCounter`. За кліком на кожну карту збільшуй рахунок від поточного значення до `+100` за 800мс з `Cubic.easeOut`.

3. Зроби **пульсуючу кнопку** "PLAY" — текст у центрі, нескінченний tween scale 1↔1.1 з yoyo.

4. **Бонус:** завантаж спрайтшит з будь-якого відкритого джерела (або намалюй сам у Paint, 4 кадри по 64×64), створи animation `'spin'`, програй на спрайті.

Готово — [Глава 7. Введення (Input)](./07-input.md).


---

# Глава 7. Введення (Input)

У Phaser введення обробляється через **Input Plugin** — `this.input` у кожній сцені. Підтримуються миша, тач, клавіатура, геймпад. На мобільних тачі автоматично поводяться як pointer events — писати окремий код не потрібно.

## Pointer events — основа

`Pointer` об'єднує мишу і тач. Подія на сцені ловиться так:

```js
// Будь-який клік/тач по сцені
this.input.on('pointerdown', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Переміщення
this.input.on('pointermove', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Відпускання
this.input.on('pointerup', (pointer) => { /* ... */ });
```

Об'єкт `pointer` містить:
- `pointer.x`, `pointer.y` — координати на сцені (з урахуванням scale)
- `pointer.worldX`, `pointer.worldY` — у координатах світу (з урахуванням камери)
- `pointer.isDown` — чи натиснутий зараз
- `pointer.button` — яка кнопка миші (0 = ЛКМ, 2 = ПКМ)
- `pointer.event` — оригінальний DOM event

## Інтерактивні Game Objects

Щоб конкретний об'єкт міг реагувати на кліки, робимо його інтерактивним:

```js
const card = this.add.image(400, 300, 'card');
card.setInteractive();

card.on('pointerdown', () => console.log('Клік по карті'));
card.on('pointerup',   () => console.log('Відпустив'));
card.on('pointerover', () => card.setTint(0xff0000));    // hover-in
card.on('pointerout',  () => card.clearTint());          // hover-out
card.on('pointermove', (pointer) => console.log(pointer.x));
```

### Параметри setInteractive()

```js
card.setInteractive({
  cursor: 'pointer',         // CSS-курсор
  pixelPerfect: false,       // перевірка по альфі пікселя (повільно)
  alphaTolerance: 1,         // поріг альфи для pixelPerfect
  draggable: true,           // увімкнути drag&drop
  useHandCursor: true,       // швидкий аліас для cursor: 'pointer'
  hitArea: hitArea,          // кастомна зона
  hitAreaCallback: callback
});
```

### Кастомна hit area (форма кліку)

За замовчуванням Phaser використовує прямокутник навколо текстури. Можна задати коло, полігон або довільну фігуру:

```js
// Кругла зона кліку
const hitArea = new Phaser.Geom.Circle(0, 0, 50);
card.setInteractive(hitArea, Phaser.Geom.Circle.Contains);

// Полігон
const points = [
  new Phaser.Geom.Point(0, 0),
  new Phaser.Geom.Point(100, 0),
  new Phaser.Geom.Point(50, 100)
];
const polygon = new Phaser.Geom.Polygon(points);
sprite.setInteractive(polygon, Phaser.Geom.Polygon.Contains);
```

### Pixel-perfect перевірка (для "обтравочних" спрайтів)

```js
card.setInteractive({ pixelPerfect: true });
```

⚠️ Дорого, не використовуй масово. Для слотів майже не потрібно.

## Кнопка зі спрайта (патерн)

```js
function makeButton(scene, x, y, key, callback) {
  const btn = scene.add.image(x, y, key)
    .setInteractive({ useHandCursor: true });

  btn.on('pointerover', () => btn.setScale(1.05));
  btn.on('pointerout',  () => btn.setScale(1));
  btn.on('pointerdown', () => btn.setScale(0.95));
  btn.on('pointerup',   () => {
    btn.setScale(1.05);
    callback();
  });

  return btn;
}

// Використання
makeButton(this, 640, 600, 'spinBtn', () => this.startSpin());
```

## Drag & Drop

```js
const item = this.add.image(100, 100, 'gem');
item.setInteractive({ draggable: true });

this.input.on('dragstart', (pointer, gameObject) => {
  gameObject.setTint(0x00ff00);
});

this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
  gameObject.x = dragX;
  gameObject.y = dragY;
});

this.input.on('dragend', (pointer, gameObject) => {
  gameObject.clearTint();
});
```

### Drop-зони

Зона, в яку можна "кинути" об'єкт:

```js
const zone = this.add.zone(640, 360, 200, 200).setRectangleDropZone(200, 200);

this.input.on('drop', (pointer, gameObject, dropZone) => {
  console.log('Скинули в зону');
  gameObject.x = dropZone.x;
  gameObject.y = dropZone.y;
});

this.input.on('dragenter', (pointer, gameObject, dropZone) => {
  // Об'єкт заїхав на зону
});

this.input.on('dragleave', (pointer, gameObject, dropZone) => {
  // Виїхав
});
```

## Клавіатура

### Базове відстеження

```js
// Створення клавіш
this.keyW = this.input.keyboard.addKey('W');
this.keyA = this.input.keyboard.addKey('A');
this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

// В update()
update() {
  if (this.keyW.isDown) this.player.y -= 5;
  if (this.keyA.isDown) this.player.x -= 5;
  if (this.keySpace.isDown) this.shoot();
}
```

### Курсорні клавіші (готовий об'єкт)

```js
this.cursors = this.input.keyboard.createCursorKeys();

update() {
  if (this.cursors.left.isDown)  this.player.x -= 5;
  if (this.cursors.right.isDown) this.player.x += 5;
  if (this.cursors.up.isDown)    this.player.y -= 5;
  if (this.cursors.down.isDown)  this.player.y += 5;
  if (this.cursors.space.isDown) this.shoot();
}
```

### Події клавіш (одиночне натиснення)

```js
this.input.keyboard.on('keydown-SPACE', () => {
  this.startSpin();
});

this.input.keyboard.on('keyup-ESC', () => {
  this.openMenu();
});

// JustDown — спрацює один раз за натиснення, навіть якщо затиснута
if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
  this.spin();
}
```

### Комбо-клавіші

```js
this.input.keyboard.createCombo('CHEAT', { resetOnMatch: true });
this.input.keyboard.on('keycombomatch', (combo) => {
  console.log('Cheat enabled!');
});
```

## Геймпад (опціонально)

Вмикається в config:
```js
input: { gamepad: true }
```

```js
this.input.gamepad.once('connected', (pad) => {
  console.log('Pad connected:', pad.id);
});

update() {
  const pad = this.input.gamepad.getPad(0);
  if (!pad) return;
  if (pad.left)  this.player.x -= 5;
  if (pad.right) this.player.x += 5;
  if (pad.A)     this.shoot();
  // Аналоговий стик
  this.player.x += pad.leftStick.x * 5;
}
```

## Глобальні налаштування введення

```js
// Топ-об'єкт завжди перший при кліку (за замовчуванням false)
this.input.topOnly = true;

// Увімкнути multi-touch (скільки пальців одночасно)
this.input.addPointer(2);  // разом 3 поінтери (1 за замовчуванням + 2)

// Вимкнути введення в усій сцені
this.input.enabled = false;

// Вимкнути на одному об'єкті
card.disableInteractive();
card.setInteractive();    // знову увімкнути
```

## Координати: екран vs світ

```js
this.input.on('pointerdown', (pointer) => {
  // Координати в системі сцени (з урахуванням scale)
  console.log(pointer.x, pointer.y);

  // Координати в "світі" (з урахуванням скролу камери)
  console.log(pointer.worldX, pointer.worldY);
});
```

Якщо в тебе статична камера — `x` і `worldX` збігаються. Коли камера скролить — відрізняються.

## Корисні патерни для слотів

### Кнопка SPIN зі станами

```js
class SpinButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.bg = scene.add.image(0, 0, 'btn-spin');
    this.label = scene.add.text(0, 0, 'SPIN', { fontSize: '32px' }).setOrigin(0.5);
    this.add([this.bg, this.label]);

    scene.add.existing(this);

    this.bg.setInteractive({ useHandCursor: true });
    this.bg.on('pointerdown', () => this.handlePress());
  }

  setEnabled(enabled) {
    this.bg.input.enabled = enabled;
    this.alpha = enabled ? 1 : 0.5;
  }

  setSpinning(spinning) {
    this.label.setText(spinning ? 'STOP' : 'SPIN');
  }

  handlePress() {
    this.scene.events.emit('spin-button-pressed');
  }
}
```

### Захист від подвійного кліку

```js
let spinning = false;

spinBtn.on('pointerdown', () => {
  if (spinning) return;
  spinning = true;
  this.startSpin();
});

// При завершенні
this.events.once('spin-complete', () => {
  spinning = false;
});
```

### Spacebar = SPIN

```js
this.input.keyboard.on('keydown-SPACE', () => {
  if (!this.spinning) this.startSpin();
});
```

## Підводні камені

| Проблема | Рішення |
|---|---|
| Клік по контейнеру не працює | Контейнер не інтерактивний за замовчуванням — встанови `setInteractive(new Phaser.Geom.Rectangle(...), Phaser.Geom.Rectangle.Contains)` або зроби інтерактивними його дочірні |
| Кліки "провалюються" крізь UI | Встанови `this.input.topOnly = true` або використай depth |
| Клік спрацьовує кілька разів | `pointerdown` + `pointerup` можуть "склеюватися" — краще використовуй `pointerup` |
| Drag трясеться | На деяких браузерах потрібно `event.preventDefault()` — Phaser робить це сам, але перевір CSS `touch-action: none` |
| Клік не працює на iOS Safari | Перевір, що зона кліку >= 44×44px (Apple guideline) |

---

## ✅ Вправа 7

1. Створи 5 карт у ряд. На кожній карті:
   - При hover — `setTint(0xffff00)` + tween scale 1 → 1.1
   - При hover-out — clearTint + scale 1
   - При кліку — карта летить угору й зникає (tween y -= 200, alpha → 0)

2. Створи **drag&drop**: одна велика карта, яку можна тягати екраном.

3. Створи **drop-зону** (прямокутник 200×200 у правому нижньому куті). Коли карту кинеш у зону — карта лишається на місці скидання І лічильник збільшується на 1.

4. За натисненням **пробілу** — усі карти повертаються на свої стартові позиції (через tween).

5. **Бонус:** реалізуй секретний код `S-L-O-T` через клавіатуру. При його наборі — виведи в консоль "Cheat activated".

[Глава 8. Звук](./08-sound.md)


---

# Глава 8. Звук

Звук у Phaser — через **Sound Manager** (`this.sound`). Під капотом два бекенди:

- **WebAudio** — сучасний, рекомендується. Підтримує 3D, ефекти, точний час.
- **HTML5 Audio** — фолбек для старих браузерів і слабких пристроїв.

Phaser **сам обирає** WebAudio, якщо він доступний.

## Завантаження звуку

```js
preload() {
  // Простий файл
  this.load.audio('click', 'assets/sounds/click.mp3');

  // Кілька форматів (обирається найкращий підтримуваний)
  this.load.audio('theme', [
    'assets/sounds/theme.ogg',
    'assets/sounds/theme.mp3',
    'assets/sounds/theme.m4a'
  ]);
}
```

### Які формати підтримуються

| Формат | Підтримка |
|---|---|
| **MP3** | Усі сучасні браузери |
| **OGG** | Усі, окрім старого Safari |
| **M4A/AAC** | Safari, Chrome |
| **WEBM** | Chrome, Firefox |
| **WAV** | Усі, але величезний розмір |

**Порада:** для коротких SFX (< 5 сек) використовуй **MP3 96 kbps**, для музики — **OGG/MP3 128 kbps**.

## Відтворення (швидкий спосіб)

```js
// Просто програти
this.sound.play('click');

// З опціями
this.sound.play('click', {
  volume: 0.5,
  rate: 1.5,        // швидкість
  detune: 100,      // розладнання в центах (-1200..1200)
  loop: false,
  delay: 0
});
```

Цей спосіб зручний для коротких звуків, але **не повертає** об'єкт — його не можна зупинити.

## Відтворення через інстанс (правильний спосіб)

```js
const music = this.sound.add('theme', { loop: true, volume: 0.3 });
music.play();

music.pause();
music.resume();
music.stop();

music.setVolume(0.5);
music.setRate(2);          // у 2 рази швидше
music.setDetune(-300);
music.setLoop(true);

music.isPlaying;
music.isPaused;

music.destroy();
```

## Події звуку

```js
const sfx = this.sound.add('explosion');

sfx.on('play',     () => console.log('start'));
sfx.on('complete', () => console.log('done'));
sfx.on('stop',     () => console.log('stopped'));
sfx.on('looped',   () => console.log('loop iteration'));

sfx.play();
```

## Глобальні налаштування

```js
// Гучність для всіх звуків одразу
this.sound.volume = 0.5;
this.sound.setVolume(0.5);

// Mute
this.sound.mute = true;
this.sound.setMute(true);

// Пауза/відновлення всіх звуків
this.sound.pauseAll();
this.sound.resumeAll();
this.sound.stopAll();

// Зупинити конкретний за ключем
this.sound.stopByKey('theme');
```

## Audio Sprite — багато звуків в одному файлі

Ідеально для коротких SFX у слотах (клік, спін, win, кнопки).

### Підготовка

Використовуй [audiosprite-tool](https://github.com/tonistiigi/audiosprite) або [ffmpeg](https://ffmpeg.org/). Отримаєш файл + JSON:

```json
{
  "resources": ["sfx.mp3"],
  "spritemap": {
    "click":      { "start": 0,    "end": 0.5 },
    "spin-start": { "start": 1.0,  "end": 2.5 },
    "reel-stop":  { "start": 3.0,  "end": 3.4 },
    "small-win":  { "start": 4.0,  "end": 5.0 },
    "big-win":    { "start": 6.0,  "end": 9.0 }
  }
}
```

### Завантаження та використання

```js
preload() {
  this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
    'assets/sounds/sfx.mp3',
    'assets/sounds/sfx.ogg'
  ]);
}

create() {
  // Шорткат
  this.sound.playAudioSprite('sfx', 'click');
  this.sound.playAudioSprite('sfx', 'big-win', { volume: 0.7 });

  // Через інстанс (з керуванням)
  const winSound = this.sound.addAudioSprite('sfx');
  winSound.play('big-win');
}
```

**Переваги:**
- Один HTTP-запит
- Менше затримки на старті
- На мобільних — обходить ліміти на кількість одночасних Audio-об'єктів

## Гучність, fade, кросфейд

```js
// Плавна поява
const music = this.sound.add('theme', { volume: 0 });
music.play();
this.tweens.add({
  targets: music,
  volume: 0.5,
  duration: 2000
});

// Плавне зникнення
this.tweens.add({
  targets: music,
  volume: 0,
  duration: 1500,
  onComplete: () => music.stop()
});

// Кросфейд між двома треками
function crossfade(scene, oldMusic, newKey, duration = 2000) {
  const newMusic = scene.sound.add(newKey, { loop: true, volume: 0 });
  newMusic.play();

  scene.tweens.add({ targets: oldMusic, volume: 0, duration, onComplete: () => oldMusic.stop() });
  scene.tweens.add({ targets: newMusic, volume: 0.5, duration });

  return newMusic;
}
```

## Один звук багато разів одночасно

Якщо потрібен звук-спам (стрілянина, клацання), використовуй `play()` з одного об'єкта — він автоматично породжує копії:

```js
const click = this.sound.add('click');
click.play();
click.play();   // друга копія грає одночасно
click.play();   // і третя
```

Або, для гарантії, через short-form:

```js
this.sound.play('click');
this.sound.play('click');
```

## Автоплей та iOS — головний біль

iOS і сучасні браузери **забороняють** відтворення звуку без жесту користувача. Якщо звук має грати від самого початку — він почне грати лише після першого кліку/тапу.

### Рішення: контекст розблокується автоматично

Phaser сам розблокує WebAudio при першій взаємодії. Але **перший звук** до взаємодії не відтвориться.

### Патерн: "Tap to start"

```js
// Стартовий екран
const tapText = this.add.text(640, 360, 'Tap to start', { fontSize: '40px' }).setOrigin(0.5);
this.input.once('pointerdown', () => {
  // Тут WebAudio уже розблокований
  this.sound.play('theme');
  this.scene.start('GameScene');
});
```

### Перевірка стану

```js
if (this.sound.locked) {
  console.log('Аудіо заблоковано до взаємодії');
}

this.sound.once('unlocked', () => {
  console.log('Розблоковано');
  this.sound.play('theme');
});
```

## Звук у фоні (коли вкладка неактивна)

За замовчуванням Phaser призупиняє звук, коли вкладка неактивна. Керувати можна так:

```js
// У config:
audio: {
  disableWebAudio: false
},

// Або вручну в сцені:
this.sound.pauseOnBlur = false;  // продовжувати грати у фоні
```

## Spatial / 3D звук (WebAudio)

Можна ставити звук у 3D-просторі (для FPS, гонок). Для слотів майже не потрібно, але знати корисно:

```js
const sfx = this.sound.add('engine');
sfx.play();
sfx.setPan(-1);   // -1 = ліве вухо, 0 = центр, 1 = праве
```

## Звукова архітектура для слот-гри

Типовий слот має:

```
🎵 Background music — приглушує себе при big-win
🔊 Reel spin loop — грає поки крутяться барабани
🔊 Reel stop — на кожен стоп барабана
🔊 Symbol win — для кожного виграшного символа (або один спільний)
🔊 Counter ticks — поки цифри виграшу рахуються
🎉 Big win jingle — поверх музики
🔘 Button clicks — при натисненні кнопок
```

Приклад менеджера звуку:

```js
// src/core/AudioManager.js
export class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.music = null;
    this.muted = false;
  }

  playMusic(key) {
    if (this.music) this.music.stop();
    this.music = this.scene.sound.add(key, { loop: true, volume: 0.3 });
    this.music.play();
  }

  duckMusic(volume = 0.1, duration = 200) {
    this.scene.tweens.add({ targets: this.music, volume, duration });
  }

  unduckMusic(duration = 500) {
    this.scene.tweens.add({ targets: this.music, volume: 0.3, duration });
  }

  sfx(spriteName, options = {}) {
    if (this.muted) return;
    this.scene.sound.playAudioSprite('sfx', spriteName, options);
  }

  toggleMute() {
    this.muted = !this.muted;
    this.scene.sound.mute = this.muted;
  }
}
```

Використання:
```js
this.audio = new AudioManager(this);
this.audio.playMusic('theme');
this.audio.sfx('click');

// При великому виграші
this.audio.duckMusic();
this.audio.sfx('big-win');
this.time.delayedCall(3000, () => this.audio.unduckMusic());
```

## Підводні камені

| Проблема | Рішення |
|---|---|
| Звук не грає на iOS | Потрібна взаємодія користувача перед першим програванням |
| Latency високий | Використовуй WebAudio (за замовчуванням). HTML5 — повільний |
| Забагато одночасних звуків | Обмеж кількість, використовуй pool |
| Музика перезапускається при зміні сцен | Створюй у `BootScene` і не знищуй: `music.persist = true` або зберігай глобально |
| Звук обрізається при `play()` | Встанови `'mp3'` із порожнім початком або використовуй WebAudio |

---

## ✅ Вправа 8

1. Завантаж `assets/sounds/theme.mp3` як фонову музику з `loop: true, volume: 0.3`. Запусти в `GameScene`.
2. Завантаж `assets/sounds/card.mp3`. За кліком на будь-яку карту — грай цей звук.
3. Зроби **кнопку Mute** у куті — перемикає `this.sound.mute`. Змінюй текстуру/іконку залежно від стану.
4. При наведенні на карту відтворюй короткий звук із `rate: 1.5` (вищим тоном).
5. **Бонус:** реалізуй "ducking" — коли граєш `complete.mp3` (виграш), фонова музика приглушується до 0.1, через 2 сек повертається до 0.3. Використовувати tween на властивості `volume`.

[Глава 9. Камера](./09-camera.md)


---

# Глава 9. Камера

Камера у Phaser — це **вікно в ігровий світ**. Вона визначає, яку частину світу бачить гравець, і може скролити, зумити, трястися, фейдити.

У кожній сцені є **головна камера** — `this.cameras.main`. Можна створювати додаткові.

## Базовий API

```js
const cam = this.cameras.main;

// Скрол (зміщення світу)
cam.scrollX = 100;
cam.scrollY = 200;
cam.setScroll(100, 200);

// Центр — куди дивиться камера
cam.centerOn(800, 600);

// Зум
cam.zoom = 2;
cam.setZoom(2);

// Поворот усієї сцени
cam.rotation = Math.PI / 4;
cam.setRotation(0.5);

// Кут у градусах
cam.setAngle(45);

// Колір фону (буває поверх config.backgroundColor)
cam.setBackgroundColor('#0f0f23');

// Розмір в'юпорта (область, яку камера займає на екрані)
cam.setSize(800, 600);
cam.setPosition(0, 0);     // позиція в'юпорта на екрані
cam.setViewport(0, 0, 800, 600);
```

## Bounds — межі світу

Обмежує, куди камера може скролити:

```js
this.cameras.main.setBounds(0, 0, 2000, 1500);
```

Камера не вийде за цей прямокутник.

## Follow — стеження за об'єктом

Класика для платформерів:

```js
this.cameras.main.startFollow(player);

// З параметрами
this.cameras.main.startFollow(player, true, 0.1, 0.1);
//                                     ^ згладжування ^lerpX ^lerpY (0..1)

// З відступом
this.cameras.main.setFollowOffset(-100, 0);

// Припинити
this.cameras.main.stopFollow();
```

**Lerp** (0..1) — наскільки швидко камера наздоганяє об'єкт. 1 = миттєво (жорстко), 0.05 = дуже плавно. Для слотів не використовується.

## Ефекти камери

### Shake — тряска

```js
this.cameras.main.shake(
  500,    // duration мс
  0.01,   // intensity (0..1)
  false,  // force — перезапустити якщо вже трясеться
  callback
);
```

Ідеально для **відчуття великого виграшу** в слоті.

### Flash — спалах

```js
this.cameras.main.flash(500, 255, 255, 255);
//                  duration  R    G    B
```

Використовується для ефекту спалаху при mega-win.

### Fade — затемнення

```js
this.cameras.main.fadeOut(1000, 0, 0, 0);  // у чорний
this.cameras.main.fadeIn(1000, 0, 0, 0);   // із чорного

// З коллбеком
this.cameras.main.fadeOut(500);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextScene');
});
```

### Zoom-ефекти з tween

Сам camera.zoom можна анімувати через tween:

```js
this.tweens.add({
  targets: this.cameras.main,
  zoom: 1.5,
  duration: 1000,
  yoyo: true,
  ease: 'Sine.easeInOut'
});
```

Корисно для зуму на виграшній лінії в слоті.

### Pan — переміщення до точки

```js
this.cameras.main.pan(
  800, 400,    // куди (x, y у світі)
  2000,        // тривалість
  'Power2',    // ease
  false,       // force
  callback
);
```

## Кілька камер

Можна створити кілька камер. Кожна бачить свою область, може ігнорувати якісь об'єкти.

```js
// Додаткова мінікарта в куті
const minimap = this.cameras.add(10, 10, 200, 150);
minimap.setZoom(0.2);
minimap.setBackgroundColor('#000');
minimap.setBounds(0, 0, 2000, 1500);
minimap.startFollow(player);

// UI-камера, не рухається зі скролом
const uiCam = this.cameras.add(0, 0, 1280, 720);
uiCam.setScroll(0, 0);

// Указати яка камера які об'єкти бачить
mainCamera.ignore(uiObjects);  // головна не бачить UI
uiCam.ignore(worldObjects);    // UI-камера не бачить світ
```

⚠️ **Важливо:** UI-сцена (окремою сценою) простіша, ніж гра з двома камерами. Використовуй кілька камер тільки коли реально потрібні кілька вікон (мінікарта, розділений екран).

## scrollFactor — паралакс

`scrollFactor` визначає, наскільки сильно об'єкт рухається зі скролом камери. Дозволяє робити паралакс (фон рухається повільніше за передній план).

```js
const farBg = this.add.image(0, 0, 'far-bg').setScrollFactor(0.2);
const midBg = this.add.image(0, 0, 'mid-bg').setScrollFactor(0.5);
const player = this.add.sprite(0, 0, 'player');  // scrollFactor = 1 за замовчуванням

// UI — не рухається
const score = this.add.text(0, 0, 'Score').setScrollFactor(0);
```

## Камера для слот-гри — реальні сценарії

### Сценарій 1. Shake при big-win

```js
function onBigWin() {
  this.cameras.main.shake(800, 0.005);
  this.cameras.main.flash(300, 255, 255, 200);
  this.audio.sfx('big-win');
}
```

### Сценарій 2. Fade-перехід у бонус-гру

```js
function enterBonus() {
  this.cameras.main.fadeOut(800, 0, 0, 0);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start('BonusScene');
  });
}
```

### Сценарій 3. Zoom на виграшній лінії

```js
function focusOnWinLine(centerX, centerY) {
  this.tweens.add({
    targets: this.cameras.main,
    zoom: 1.4,
    scrollX: centerX - this.scale.width / 2,
    scrollY: centerY - this.scale.height / 2,
    duration: 600,
    ease: 'Cubic.easeInOut'
  });

  this.time.delayedCall(2500, () => {
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1,
      scrollX: 0,
      scrollY: 0,
      duration: 600
    });
  });
}
```

### Сценарій 4. Mega-win — серія ефектів

```js
function megaWinSequence() {
  const cam = this.cameras.main;

  // 1. Зум-в
  this.tweens.add({ targets: cam, zoom: 1.2, duration: 500, yoyo: true });

  // 2. Flash
  cam.flash(400, 255, 215, 0); // золотий спалах

  // 3. Shake
  this.time.delayedCall(500, () => cam.shake(1500, 0.008));
}
```

## Події камери

```js
const cam = this.cameras.main;
cam.on('camerafadeincomplete', () => console.log('faded in'));
cam.on('camerafadeoutcomplete', () => console.log('faded out'));
cam.on('cameraflashcomplete', () => console.log('flash done'));
cam.on('camerashakecomplete', () => console.log('shake done'));
cam.on('camerapancomplete', () => console.log('pan done'));
cam.on('camerazoomcomplete', () => console.log('zoom done'));
```

## Координати: світ vs екран

```js
// Перевести екранні координати у світові
const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

// pointer.worldX, pointer.worldY — те саме
```

## RoundPixels — піксельна різкість

При зумі можуть виникати субпіксельні артефакти. Якщо гра в піксель-арті:

```js
this.cameras.main.roundPixels = true;
```

Або в config:
```js
render: { roundPixels: true, pixelArt: true }
```

## Підводні камені

| Проблема | Рішення |
|---|---|
| Об'єкт не видно після `setBounds` | Об'єкт за межами bounds, перевір координати |
| UI скролиться з камерою | `setScrollFactor(0)` на UI-об'єктах |
| Shake "застрягає" | Після `shake` завжди скидається стан, але якщо викликаєш повторно — передай `force=true` |
| Зум обрізає краї | Камера зумить із центру в'юпорта, перевір `setBounds` |
| Камера сіпається при follow | Зменши lerp до 0.05–0.1 для згладжування |

---

## ✅ Вправа 9

1. Завантаж `assets/sprites/background.webp` на весь екран. Розмісти по центру 5 карт.
2. За натисненням **пробілу** — `cameras.main.shake(500, 0.01)`.
3. За натисненням **F** — `cameras.main.flash(300, 255, 255, 0)` (жовтий спалах).
4. За натисненням **Z** — анімуй `zoom` від 1 до 1.5 і назад через tween (yoyo).
5. **Бонус:** при кліку на карту:
   - Камера плавно паниться до цієї карти (через `pan`)
   - Зум до 1.3
   - Через 1 сек — повернення до 1 і центру

[Глава 10. Scale Manager](./10-scale-manager.md)


---

# Глава 10. Scale Manager — адаптивність

Гра має працювати на телефоні в портретній орієнтації, на планшеті в ландшафті, на десктопі в будь-якому вікні. Це задача **Scale Manager** — `this.scale`.

## Головна ідея

У Phaser є **два розміри**:

- **Внутрішній (Game Size)** — те, що ти задав у `config.width/height`. Це твоя система координат.
- **Зовнішній (Display Size)** — реальний розмір канваса в DOM, у пікселях екрана.

Scale Manager масштабує канвас, але координати всередині гри **лишаються** в Game Size.

```
Game Size: 1280×720 (твої координати)
       ↓ Scale Manager
Display Size: 800×450 (на екрані)
```

Об'єкт, поставлений у `(640, 360)`, завжди опиняється **в центрі гри**, незалежно від розміру екрана.

## Режими масштабування (`scale.mode`)

```js
const config = {
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 720
  }
};
```

| Mode | Що робить |
|---|---|
| `Phaser.Scale.NONE` | Жодного масштабування. Канвас завжди в нативному розмірі |
| `Phaser.Scale.FIT` | Вписати в контейнер, зберігаючи пропорції. З'являються "letterbox" смуги |
| `Phaser.Scale.ENVELOP` | Заповнити контейнер цілком, зберігаючи пропорції. Частина гри обрізається |
| `Phaser.Scale.WIDTH_CONTROLS_HEIGHT` | Розтягувати по ширині, висота автоматично |
| `Phaser.Scale.HEIGHT_CONTROLS_WIDTH` | Навпаки |
| `Phaser.Scale.RESIZE` | Канвас завжди = розмір контейнера. Грі потрібно адаптуватися до нового розміру |

### FIT — найчастіший вибір

```js
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 1280,
  height: 720
}
```

- Якщо контейнер ширший за 16:9 — згори/знизу смуги
- Якщо вужчий — ліворуч/праворуч смуги
- Координати не змінюються, все всередині однаково

**Використовуй для слотів із фіксованим дизайном.**

### RESIZE — для адаптивного UI

```js
scale: {
  mode: Phaser.Scale.RESIZE,
  width: window.innerWidth,
  height: window.innerHeight
}
```

Канвас завжди = вікну. Game Size змінюється. Потрібно вручну перепозиціонувати об'єкти при resize.

## autoCenter — центрування

```js
scale: {
  autoCenter: Phaser.Scale.CENTER_BOTH
}
```

| Значення | Що |
|---|---|
| `NO_CENTER` | За замовчуванням (top-left) |
| `CENTER_BOTH` | По центру по обох осях |
| `CENTER_HORIZONTALLY` | Тільки по горизонталі |
| `CENTER_VERTICALLY` | Тільки по вертикалі |

## Мінімальні / максимальні розміри

```js
scale: {
  mode: Phaser.Scale.FIT,
  width: 1280,
  height: 720,
  min: { width: 320, height: 480 },
  max: { width: 1920, height: 1080 }
}
```

## Отримати поточний розмір

```js
const w = this.scale.gameSize.width;     // внутрішній
const h = this.scale.gameSize.height;
const dw = this.scale.displaySize.width; // на екрані
const dh = this.scale.displaySize.height;

// Шорткат
const { width, height } = this.scale;
```

## Подія resize

```js
this.scale.on('resize', (gameSize, baseSize, displaySize) => {
  // gameSize — новий внутрішній розмір (актуально для Scale.RESIZE)
  this.background.setSize(gameSize.width, gameSize.height);
  this.repositionUI();
});

// Один раз — відписатися:
this.scale.off('resize', handler);
```

⚠️ Подія resize у режимі `FIT` спрацьовує **тільки при зміні вікна**, не кожен кадр.

## Повноекранний режим

```js
// Увійти
this.scale.startFullscreen();

// Вийти
this.scale.stopFullscreen();

// Тогл
this.scale.toggleFullscreen();

// Перевірити
if (this.scale.isFullscreen) { /* ... */ }
```

Браузер вимагає **жесту користувача** для входу у fullscreen — не можна викликати без кліку.

## Орієнтація (mobile)

```js
this.scale.on('orientationchange', (orientation) => {
  if (orientation === Phaser.Scale.PORTRAIT) {
    this.showRotateMessage();
  } else {
    this.hideRotateMessage();
  }
});
```

Можна примусово залочити орієнтацію (через manifest/Capacitor для PWA).

## Адаптивні патерни

### Патерн 1. Безпечні зони

Гру робимо в "ідеальному" вигляді 1280×720, але інтерфейс розміщуємо з відступами від країв — щоб при letterbox він не опинився біля самого краю екрана.

```js
const SAFE_PADDING = 40;
spinBtn.setPosition(
  width - SAFE_PADDING - spinBtn.width / 2,
  height - SAFE_PADDING - spinBtn.height / 2
);
```

### Патерн 2. Ландшафт + портрет в одній грі

Робимо 2 розкладки і перемикаємо при `orientationchange`:

```js
this.scale.on('orientationchange', () => {
  this.layoutUI();
});

layoutUI() {
  const isPortrait = this.scale.height > this.scale.width;
  if (isPortrait) {
    this.spinBtn.setPosition(this.scale.width / 2, this.scale.height - 100);
    this.balance.setPosition(20, 20);
  } else {
    this.spinBtn.setPosition(this.scale.width - 100, this.scale.height / 2);
    this.balance.setPosition(20, this.scale.height - 60);
  }
}
```

### Патерн 3. RESIZE-режим, усе на льоту

```js
const config = {
  scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' }
};

class GameScene extends Phaser.Scene {
  create() {
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0);
    this.layout();

    this.scale.on('resize', this.layout, this);
  }

  layout() {
    const { width, height } = this.scale;
    this.bg.setDisplaySize(width, height);
    // інші об'єкти...
  }
}
```

⚠️ У режимі RESIZE доведеться вручну позиціонувати **все**. Складніше, але дає повну свободу.

## Слот: яку розкладку обирати

| Випадок | Порада |
|---|---|
| Тільки desktop | `FIT` 1920×1080 |
| Тільки mobile portrait | `FIT` 720×1280 |
| Тільки mobile landscape | `FIT` 1280×720 |
| Universal (mobile + desktop) | `FIT` 1280×720 + safe area + adaptive UI на портрет |
| Custom layouts (як Pragmatic Play) | `RESIZE` + ручна розкладка |

## Повний приклад Scale + UI

```js
// config.js
export const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0a0a1a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  scene: [GameScene]
};

// GameScene.js
class GameScene extends Phaser.Scene {
  create() {
    const { width, height } = this.scale;

    // Фон
    this.add.image(width / 2, height / 2, 'bg').setDisplaySize(width, height);

    // Барабани в центрі
    this.reels = this.add.container(width / 2, height / 2);

    // UI
    this.spinBtn = this.add.image(width - 100, height - 80, 'btn-spin')
      .setInteractive();

    this.balance = this.add.bitmapText(40, height - 60, 'gameFont', 'Balance: 1000');

    // Реакція на ресайз
    this.scale.on('resize', this.onResize, this);
  }

  onResize(gameSize) {
    // У режимі FIT — зазвичай не потрібно нічого робити
    // У режимі RESIZE — перепозиціонуємо UI
  }
}
```

## Підводні камені

| Проблема | Рішення |
|---|---|
| Гра в куті сторінки | Встанови `parent: 'game'` і стилізуй div |
| Після fullscreen гра в куті | `autoCenter: Phaser.Scale.CENTER_BOTH` |
| Розмите зображення на retina | Phaser сам враховує devicePixelRatio. Якщо артефакти — `roundPixels: true` |
| Смуги по краях | Це feature режиму FIT. Використовуй RESIZE або фон-картинку ширшу за гру |
| Resize не спрацьовує | Перевір, що `parent` справді реагує на зміни. Краще використовувати `'100%'` у CSS |
| iOS Safari URL bar зміщує гру | Підпишися на `viewportresize`, або використай `100dvh` у CSS замість `100vh` |

---

## ✅ Вправа 10

1. Запусти твій проєкт. Відкрий DevTools → Mobile mode → перемикай розміри (iPhone, iPad, desktop). Подивись як поводиться `FIT`.
2. Поміняй на `Scale.ENVELOP` — побач різницю.
3. Поміняй на `Scale.RESIZE`. Слухай подію `resize` і логуй розміри. Зроби так, щоб фон розтягувався на всю площу.
4. Додай кнопку Fullscreen у куті. За кліком — `this.scale.toggleFullscreen()`.
5. **Бонус:** зроби гру з 2 розкладками — landscape і portrait. За зміною орієнтації перемалюй UI.

[Глава 11. Particle System](./11-particles.md)


---

# Глава 11. Particle System — частинки та ефекти

Частинки — це багато дрібних спрайтів, які рухаються, змінюють колір, зникають. Використовуються для:
- Вогню, диму, іскор
- Конфеті при виграші в слоті
- Магічних ефектів
- Снігу, дощу
- Вибухів і ударів

У Phaser 3.60+ API частинок **повністю переписаний**. Старий `createEmitter` застарів.

## Базовий приклад

```js
// 1. Завантажити текстуру (будь-яка маленька картинка)
this.load.image('spark', 'assets/sprites/spark.png');

// 2. Створити емітер
const emitter = this.add.particles(400, 300, 'spark', {
  speed: 100,
  lifespan: 1000,
  scale: { start: 0.5, end: 0 },
  blendMode: 'ADD',
  frequency: 50
});
```

`this.add.particles(x, y, textureKey, config)` — готовий емітер на сцені.

## Конфігурація — усі основні параметри

```js
this.add.particles(x, y, 'particle', {
  // === Час життя ===
  lifespan: 1000,                    // мс однієї частинки
  lifespan: { min: 500, max: 1500 },

  // === Швидкість народження ===
  frequency: 100,                    // мс між частинками; -1 = тільки при explode
  quantity: 1,                       // скільки частинок за раз

  // === Швидкість руху ===
  speed: 100,                        // фіксована
  speed: { min: 50, max: 150 },      // випадкова
  speedX: { min: -50, max: 50 },     // окремо по осях
  speedY: -200,

  // === Кут вильоту ===
  angle: { min: 0, max: 360 },       // в усі боки
  angle: { min: -100, max: -80 },    // догори з розкидом

  // === Гравітація ===
  gravityY: 200,
  gravityX: 0,

  // === Розмір ===
  scale: 1,
  scale: { start: 1, end: 0 },                  // від 1 до 0
  scale: { start: 1, end: 0, ease: 'Power2' },
  scale: { min: 0.5, max: 1 },                  // випадковий

  // === Прозорість ===
  alpha: { start: 1, end: 0 },

  // === Колір (tint) ===
  tint: 0xff0000,
  tint: [0xff0000, 0x00ff00, 0x0000ff],         // випадковий зі списку

  // === Поворот ===
  rotate: { start: 0, end: 360 },
  rotate: { min: 0, max: 360 },

  // === Blend mode ===
  blendMode: 'ADD',                  // 'NORMAL', 'ADD', 'MULTIPLY', 'SCREEN'

  // === Зона народження ===
  emitZone: {
    type: 'edge',
    source: new Phaser.Geom.Rectangle(0, 0, 100, 100),
    quantity: 32
  },

  // === Зона смерті (частинки зникають при перетині) ===
  deathZone: {
    type: 'onLeave',
    source: new Phaser.Geom.Rectangle(-100, -100, 200, 200)
  },

  // === Frame (якщо використовується атлас) ===
  frame: 'spark.png',
  frame: ['spark.png', 'star.png'],

  // === Старт одразу чи ні ===
  emitting: true                      // false = емітер створено, але мовчить
});
```

## Керування емітером

```js
const emitter = this.add.particles(0, 0, 'spark', { ... });

// Запустити/зупинити
emitter.start();
emitter.stop();
emitter.pause();
emitter.resume();

// Один вибух N частинок (замість постійного потоку)
emitter.explode(50);            // 50 частинок
emitter.explode(50, x, y);      // в указаній точці

// Перенести емітер
emitter.setPosition(x, y);

// Змінити параметр на льоту
emitter.setSpeed(200);
emitter.setLifespan(500);
emitter.setScale(2);

// Знищити
emitter.destroy();
```

## Прив'язка до об'єкта (follow)

```js
const player = this.add.sprite(100, 100, 'player');

const emitter = this.add.particles(0, 0, 'spark', {
  follow: player,                // частинки вилітають із позиції player
  followOffset: { x: 0, y: -20 },
  ...
});
```

Ідеально для сліду за магічним символом, ракетою, бонус-об'єктом.

## Зони народження (emitZone)

### Edge — частинки народжуються по контуру

```js
emitZone: {
  type: 'edge',
  source: new Phaser.Geom.Circle(0, 0, 100),
  quantity: 64
}
```

Отримуєш "кільце" з частинок.

### Random — випадково всередині фігури

```js
emitZone: {
  type: 'random',
  source: new Phaser.Geom.Rectangle(-50, -50, 100, 100)
}
```

## Реальні приклади

### Конфеті при виграші

```js
function showWinConfetti(scene, x, y) {
  scene.add.particles(x, y, 'particle', {
    speed: { min: 200, max: 400 },
    angle: { min: 240, max: 300 },         // догори з розкидом
    scale: { start: 1, end: 0 },
    rotate: { start: 0, end: 360 },
    lifespan: 2000,
    gravityY: 300,
    quantity: 5,
    frequency: 50,
    duration: 1500,                        // емітер живе 1.5с
    tint: [0xff0080, 0x00ff80, 0x80ff00, 0xffff00, 0x80ffff]
  });
}
```

### Вогники/зірки на бекграунді

```js
this.add.particles(0, 0, 'star', {
  x: { min: 0, max: 1280 },
  y: { min: 0, max: 720 },
  scale: { start: 0, end: 1, ease: 'Sine.easeOut' },
  alpha: { start: 0, end: 1, yoyo: true },
  lifespan: 3000,
  frequency: 200,
  blendMode: 'ADD'
});
```

### Вибух зірок при mega-win

```js
function megaWinExplode(scene, x, y) {
  scene.add.particles(x, y, 'star', {
    speed: { min: 300, max: 600 },
    angle: { min: 0, max: 360 },
    scale: { start: 1.5, end: 0 },
    rotate: { min: 0, max: 360 },
    lifespan: 1500,
    blendMode: 'ADD',
    tint: 0xffd700,
    emitting: false
  }).explode(80);
}
```

### Дим від двигуна

```js
const smoke = this.add.particles(0, 0, 'smoke', {
  follow: rocket,
  followOffset: { x: 0, y: 30 },
  speedY: { min: 50, max: 100 },
  speedX: { min: -20, max: 20 },
  scale: { start: 0.5, end: 2 },
  alpha: { start: 0.8, end: 0 },
  lifespan: 800,
  frequency: 20,
  blendMode: 'NORMAL'
});
```

### Слід від виграшної лінії

```js
function trailAlongLine(scene, points) {
  // points = [{x:100,y:200}, {x:200,y:200}, ...]
  let i = 0;
  scene.time.addEvent({
    delay: 100,
    repeat: points.length - 1,
    callback: () => {
      const p = points[i++];
      scene.add.particles(p.x, p.y, 'spark', {
        speed: 30,
        scale: { start: 0.6, end: 0 },
        lifespan: 600,
        blendMode: 'ADD',
        emitting: false
      }).explode(8);
    }
  });
}
```

## Продуктивність

Частинки — це **багато об'єктів**. Якщо переборщити, FPS просяде навіть на десктопі.

### Правила:

1. **Не більше 200-300 частинок одночасно** на середньо-низьких пристроях.
2. Використовуй **маленькі** текстури (16×16, 32×32).
3. **`blendMode: 'ADD'`** красивий, але вимагає прозорого фону у текстурі.
4. Один емітер з великим `quantity` краще, ніж 10 емітерів із малим.
5. **Не створюй емітери у `update()`** — тільки в реакції на події.
6. Використовуй `duration` щоб емітер сам зупинився.
7. Для статичних частинок (зірки на фоні) — краще одна `RenderTexture`.

## Частинки в слот-індустрії

Pragmatic Play, NetEnt, Push Gaming активно використовують частинки:
- Конфеті при big-win
- Кільця світла навколо wild-символа
- Іскри при зупинці барабана з бонус-символом
- "Дощ" із монет при супер-виграші
- Магічні сліди при спрацюванні фріспінів

Більшість цих ефектів робиться на **частинках + Spine**, інколи на префабах prerendered анімаціях.

## Важливо: один емітер — багато частинок

Це **батч-рендеринг**. Усі частинки одного емітера малюються за один draw call (якщо текстура одна). Тому 100 частинок одного емітера != 100 окремих Sprite-об'єктів за продуктивністю — частинки набагато дешевші.

---

## ✅ Вправа 11

1. Завантаж маленьку картинку (32×32) — зірку, іскру, точку.
2. За кліком у будь-яку точку — вибух 30 частинок в усі боки (`explode`), колір золотий.
3. Зроби постійний потік частинок знизу екрана догори (як висхідні бульбашки).
4. Зроби слід за курсором миші: емітер із `follow: pointer` і низьким `frequency`.
5. **Бонус:** за кліком — улаштуй "конфеті-салют": 5 емітерів у різних місцях із різними кольорами, кожен робить explode(50). Через секунду всі зникають.

[Глава 12. Фізика](./12-physics.md)


---

# Глава 12. Фізика

Phaser підтримує **два фізичні рушії**:

1. **Arcade Physics** — простий, швидкий, AABB (axis-aligned bounding boxes). Тисячі об'єктів на екрані без проблем.
2. **Matter.js** — повноцінна фізика твердих тіл: обертання, складні форми, ланцюги, мотузки.

**Для слотів фізика зазвичай не потрібна.** Але знати основи корисно — знадобиться для інших проєктів і можна зробити "падаючі монети" при виграші.

У цій главі докладно — Arcade. Matter — оглядово.

## Увімкнення Arcade Physics

У config:

```js
const config = {
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },     // у пікселях/сек²
      debug: false             // відмалювання хітбоксів
    }
  }
};
```

## Створення фізичних об'єктів

```js
// Спрайт із фізикою
const player = this.physics.add.sprite(100, 100, 'player');

// Image з фізикою
const ball = this.physics.add.image(200, 200, 'ball');

// Існуючий об'єкт → додати фізику
const obj = this.add.image(0, 0, 'obj');
this.physics.add.existing(obj);

// Група фізичних об'єктів
const enemies = this.physics.add.group();
const e = enemies.create(300, 100, 'enemy');
```

## API фізичного тіла

Після створення в об'єкта з'являється властивість `body` — це його фізичне тіло:

```js
// Швидкість
player.body.setVelocity(100, 200);
player.body.setVelocityX(150);
player.body.setVelocityY(-300);

// Гравітація (своя для цього об'єкта)
player.body.setGravityY(500);
player.body.allowGravity = false;

// Уповільнення (drag)
player.body.setDrag(100, 100);

// Відскок
player.body.setBounce(0.8, 0.8);   // 0..1, 1 = ідеальний відскок

// Розмір хітбокса
player.body.setSize(32, 64);
player.body.setOffset(0, 0);
player.body.setCircle(20);          // круглий хітбокс

// Іммобілізація (об'єкт існує, але не рухається)
player.body.setImmovable(true);

// Межі світу — об'єкт не може за них вийти
player.body.setCollideWorldBounds(true);
```

## Межі світу (world bounds)

```js
// За замовчуванням = розмір гри
this.physics.world.setBounds(0, 0, 1280, 720);

// Об'єкт "відскакує" від меж
player.setCollideWorldBounds(true);
player.setBounce(1);

// Тільки певні сторони
this.physics.world.setBoundsCollision(true, true, true, false);
//                                    L     R     U     D
```

## Колізії та перетини

### `collide` — реальне зіткнення (з імпульсом)

```js
this.physics.add.collider(player, walls);

// З коллбеком
this.physics.add.collider(player, enemy, (p, e) => {
  console.log('Hit!');
  e.destroy();
});

// Група vs група
this.physics.add.collider(bullets, enemies, (bullet, enemy) => {
  bullet.destroy();
  enemy.destroy();
});
```

Об'єкти після collider **відштовхуються** одне від одного, зупиняються.

### `overlap` — перетин (без фізики)

```js
this.physics.add.overlap(player, coins, (player, coin) => {
  coin.destroy();
  this.score += 10;
});
```

`overlap` не зупиняє об'єкти, просто детектує перетин. Використовуй для тригерів (зібрати монетку, увійти в зону).

### Окрема перевірка (без постійного collider)

```js
update() {
  if (this.physics.overlap(player, enemy)) {
    // Зараз перетинаються
  }
}
```

## Групи та фізика

```js
// Група динамічна (рухаються під фізикою)
const fruits = this.physics.add.group({
  key: 'apple',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 },
  bounceY: 0.6,
  collideWorldBounds: true
});

// Група статична (не рухається, для платформ)
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').setScale(2).refreshBody();
```

Динамічна vs статична:
- Динамічна — рухається, перевіряється кожен кадр
- Статична — ніколи не рухається, перевіряється як перешкода

## Повний приклад: маленький платформер

```js
class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    // Платформи
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    // Гравець
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Анімації
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10, repeat: -1
    });
    this.anims.create({ key: 'turn', frames: [{ key: 'dude', frame: 4 }], frameRate: 20 });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10, repeat: -1
    });

    // Зірки
    this.stars = this.physics.add.group({
      key: 'star', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate((c) => c.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

    // Колізії
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Керування
    this.cursors = this.input.keyboard.createCursorKeys();

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#000' });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
}
```

Це класичний туторіал Phaser — обов'язково збери його руками.

## Перевірка стану тіла

```js
player.body.touching.down       // торкається чогось знизу
player.body.touching.up
player.body.touching.left
player.body.touching.right

player.body.blocked.down        // упирся в межу світу
player.body.blocked.up

player.body.velocity.x          // поточна швидкість
player.body.velocity.y

player.body.onFloor()           // на землі
player.body.onWall()
```

## Дебаг

Увімкни `debug: true` у config:

```js
physics: {
  default: 'arcade',
  arcade: {
    gravity: { y: 300 },
    debug: true
  }
}
```

Побачиш хітбокси та вектори швидкостей. Незамінне при налагодженні.

Увімкнути/вимкнути на льоту:
```js
this.physics.world.drawDebug = true;
this.physics.world.debugGraphic.clear();   // очистити
```

## Matter.js — коротко

Коли потрібні обертання, реалістична фізика, ланцюги, шарніри — використовуй Matter.

```js
// config
physics: {
  default: 'matter',
  matter: {
    gravity: { y: 1 },
    debug: true
  }
}

// Створення
const ball = this.matter.add.image(400, 100, 'ball');
ball.setCircle();
ball.setBounce(0.9);
ball.setFriction(0.005);

// Constraints (з'єднання)
this.matter.add.constraint(ball1, ball2, 100);

// Композитні тіла (наприклад, машина)
const car = this.matter.add.fromVertices(x, y, 'car', vertices);
```

Matter важчий за Arcade, але красивіший.

## Чи можна використовувати фізику для слота

Прямо для барабанів — ні. Але **опосередковано корисно**:

- "Падаючі монети" при виграші (Arcade — десятки спрайтів із гравітацією)
- Бонус-ігри типу "Plinko" (Matter — кулька відскакує від штирів)
- "Crash"-механіки
- Drag-міні-ігри з фізикою

## Підводні камені

| Проблема | Рішення |
|---|---|
| Об'єкт застрягає в стіні | Зменш швидкість або використай `body.checkCollision` |
| Швидкість залежить від FPS | Phaser використовує deltaTime — фізика fps-independent |
| Хітбокс не збігається зі спрайтом | `body.setSize()` + `body.setOffset()` |
| Об'єкт "провалюється" вниз | Увімкни `setCollideWorldBounds` або постав підлогу |
| Багато колізій гальмують | Використовуй групи + spatial partitioning вбудовано в Arcade |
| Tunneling (швидкі об'єкти пролітають крізь) | Увімкни `physics.arcade.useTree = true` або встанови `ccd` для Matter |

---

## ✅ Вправа 12

1. Зроби "коробку" — статичні платформи по краях екрана і підлогу.
2. За кліком у будь-якій точці — створюй кульку (Image з фізикою), gravity вниз, bounce 0.8.
3. Кульки падають і відскакують від підлоги та стін.
4. Зроби 5 таких кульок одночасно (group). Між собою вони теж мають коллайдитися.
5. **Бонус:** додай падіння "монет" при натисненні пробілу — 50 монет з різною швидкістю, гравітацією. Це буде основа ефекту "виграш" для слота.

[Глава 13. Архітектура та оптимізація](./13-architecture.md)


---

# Глава 13. Архітектура та оптимізація

У попередніх главах ти дізнався **що** дає Phaser. Ця глава — про те, **як** правильно побудувати великий проєкт, щоб він не перетворився на кашу через місяць.

## Структура проєкту (для слота)

```
src/
├── main.js                  # точка входу
├── config.js                # конфіг гри
├── core/
│   ├── EventBus.js          # глобальні події
│   ├── StateMachine.js      # стейт-машина
│   ├── AssetManifest.js     # список ассетів
│   ├── AudioManager.js      # обгортка над звуком
│   └── Logger.js            # логер
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── GameScene.js
│   └── UIScene.js
├── slot/
│   ├── ReelManager.js       # усі барабани
│   ├── Reel.js              # один барабан
│   ├── Symbol.js            # символ
│   ├── PaytableData.js      # таблиця виплат
│   ├── WinEvaluator.js      # оцінка виграшів
│   └── ServerMock.js        # симулятор сервера (RNG)
├── ui/
│   ├── SpinButton.js
│   ├── BalanceDisplay.js
│   ├── BetSelector.js
│   ├── WinDisplay.js
│   └── PaytableModal.js
└── effects/
    ├── ConfettiEmitter.js
    ├── BigWinAnimation.js
    └── SymbolGlow.js
```

## Принципи

### 1. **Сцени — це контролери**, не God-класи

Сцена координує: запускає дії, передає дані. Логіку виноси в окремі класи.

❌ **Погано:**
```js
class GameScene extends Phaser.Scene {
  create() {
    // 500 рядків створення всього: барабани, UI, звуки, обробники...
  }

  update() {
    // ще 200 рядків усього цього
  }
}
```

✅ **Добре:**
```js
class GameScene extends Phaser.Scene {
  create() {
    this.audio = new AudioManager(this);
    this.reels = new ReelManager(this);
    this.evaluator = new WinEvaluator();

    this.scene.launch('UIScene');

    this.events.on('spin-pressed', this.onSpin, this);
  }

  async onSpin() {
    const result = await ServerMock.spin();
    await this.reels.spin(result.symbols);
    const wins = this.evaluator.evaluate(result.symbols);
    if (wins.total > 0) this.showWin(wins);
  }
}
```

### 2. Game Objects роби через **наслідування**

Коли в тебе складний об'єкт (барабан, символ, кнопка) — створюй окремий клас.

```js
// src/slot/Symbol.js
export default class Symbol extends Phaser.GameObjects.Container {
  constructor(scene, x, y, symbolKey) {
    super(scene, x, y);

    this.symbolKey = symbolKey;
    this.image = scene.add.image(0, 0, 'symbols', symbolKey);
    this.add(this.image);

    scene.add.existing(this);
  }

  playWinAnimation() {
    return this.scene.tweens.add({
      targets: this.image,
      scale: { from: 1, to: 1.2 },
      duration: 300,
      yoyo: true,
      repeat: 2
    });
  }

  highlight() {
    this.image.setTint(0xffff00);
  }

  unhighlight() {
    this.image.clearTint();
  }
}
```

Використання:
```js
const symbol = new Symbol(this, 100, 100, 'ace.png');
symbol.playWinAnimation();
```

### 3. Використовуй **EventBus** для зв'язку між модулями

Модулі **не повинні** знати одне про одного напряму — вони спілкуються через події.

```js
// core/EventBus.js
export const EventBus = new Phaser.Events.EventEmitter();
```

```js
// SpinButton.js
import { EventBus } from '../core/EventBus.js';
this.button.on('pointerdown', () => EventBus.emit('spin-pressed'));

// GameScene.js
import { EventBus } from '../core/EventBus.js';
EventBus.on('spin-pressed', this.onSpin, this);
```

⚠️ Не забувай відписуватися при `shutdown` сцени.

### 4. **State Machine** для гри

Слот — це скінченний автомат зі станами: `idle → spinning → stopping → win → idle`. Будь-яка логіка простіша, коли стан явний.

```js
// core/StateMachine.js
export class StateMachine {
  constructor(initial, states, context) {
    this.context = context;
    this.states = states;
    this.current = null;
    this.transition(initial);
  }

  transition(name, data) {
    if (this.current && this.states[this.current].onExit) {
      this.states[this.current].onExit(this.context);
    }
    this.current = name;
    if (this.states[name].onEnter) {
      this.states[name].onEnter(this.context, data);
    }
  }

  is(name) { return this.current === name; }
}
```

Використання:
```js
this.fsm = new StateMachine('idle', {
  idle: {
    onEnter: (ctx) => ctx.spinBtn.setEnabled(true)
  },
  spinning: {
    onEnter: (ctx) => {
      ctx.spinBtn.setEnabled(false);
      ctx.reels.spin();
    }
  },
  stopping: {
    onEnter: (ctx, data) => ctx.reels.stop(data.symbols)
  },
  win: {
    onEnter: (ctx, data) => ctx.showWinAnimation(data.wins)
  }
}, this);

// Перехід
this.fsm.transition('spinning');
```

### 5. **Server-driven логіка** (важливо для слотів)

Реальний слот **ніколи** не рахує виграші на клієнті. Клієнт:
1. Запитує спін → відправляє на сервер
2. Отримує результат (символи, виграші)
3. Просто **показує** анімацію

```js
// slot/ServerMock.js — для розробки
export class ServerMock {
  static async spin(bet) {
    // Симулюємо мережеву затримку
    await new Promise(r => setTimeout(r, 200));

    // Випадкові символи
    const symbols = generateRandomSymbols();
    const wins = evaluateOnServerSide(symbols, bet);

    return {
      reels: symbols,           // 5 стовпців по 3 символи
      wins,                     // [{ line: 1, symbols: [...], amount: 100 }]
      totalWin: wins.reduce((s, w) => s + w.amount, 0),
      newBalance: 950
    };
  }
}
```

Це спрощує міграцію на реальний сервер пізніше — потрібно лише замінити ServerMock.

## Object Pooling — перевикористання об'єктів

Створення/знищення GameObjects — дорого. Якщо в тебе летять 100 куль або 50 частинок-конфеті — краще використати **пул**.

```js
class Pool {
  constructor(scene, factory, size = 20) {
    this.scene = scene;
    this.factory = factory;
    this.pool = [];
    for (let i = 0; i < size; i++) {
      const obj = factory();
      obj.setActive(false).setVisible(false);
      this.pool.push(obj);
    }
  }

  get() {
    let obj = this.pool.find(o => !o.active);
    if (!obj) {
      obj = this.factory();
      this.pool.push(obj);
    }
    obj.setActive(true).setVisible(true);
    return obj;
  }

  release(obj) {
    obj.setActive(false).setVisible(false);
  }
}

// Використання
const coinPool = new Pool(this, () => this.add.image(0, 0, 'coin'), 50);

function dropCoin(x, y) {
  const coin = coinPool.get();
  coin.setPosition(x, y);
  this.tweens.add({
    targets: coin,
    y: y + 500,
    duration: 1000,
    onComplete: () => coinPool.release(coin)
  });
}
```

У Phaser також є вбудований `Group` із пулінгом:

```js
const group = this.add.group({ defaultKey: 'coin', maxSize: 50 });
const coin = group.get(x, y);   // дістає з пула або створює
coin.setActive(true).setVisible(true);
// потім
coin.setActive(false).setVisible(false);
```

## Profiling — як знаходити гальма

### 1. Phaser Debug

У конфізі:
```js
fps: { target: 60 },
physics: { arcade: { debug: true } }
```

У сцені:
```js
this.add.text(10, 10, '', { color: '#0f0' }).setName('fps');

update() {
  this.children.getByName('fps').setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
}
```

### 2. Chrome DevTools Performance

- F12 → вкладка "Performance"
- Запиши 5 секунд гри
- Дивись Frame Chart — де червоні блоки (повільні кадри)
- Головні підозрювані: створення об'єктів у `update`, важкі шейдери, багато draw calls

### 3. Spector.js (для WebGL)

Розширення Chrome. Показує draw calls, текстури, шейдери. Якщо в кадрі більше 100 draw calls — у тебе проблеми з батчингом.

## Оптимізації, які реально працюють

### 1. Використовуй **атласи**

Один draw call замість десятків:
```
[card1.png] [card2.png] [card3.png] → 3 draw calls
[symbols.atlas] (все в одній текстурі) → 1 draw call
```

### 2. **BitmapText** для динаміки

Кожне `text.setText()` створює нову текстуру. Для лічильників і таймерів — `BitmapText`.

### 3. **`setVisible(false)` замість destroy**

Якщо об'єкт скоро знадобиться знову — не знищуй. Роби невидимим.

### 4. **`update()` не скрізь**

Не пиши важку логіку в `update()` усіх сцен. Використовуй події та таймери:

```js
this.time.addEvent({
  delay: 1000,
  callback: this.checkSomething,
  loop: true
});
```

### 5. **Не створюй об'єкти в `update()`**

❌ Погано:
```js
update() {
  if (key.isDown) this.add.particles(...);  // створення кожен кадр!
}
```

✅ Добре:
```js
update() {
  if (Phaser.Input.Keyboard.JustDown(key)) {
    this.particles.explode(20);   // перевикористання
  }
}
```

### 6. **`setDepth` правильно**

Phaser сортує об'єкти за depth. Забагато змін depth — навантаження. Призначай групами:

```
const DEPTH = {
  BG: 0,
  REELS: 10,
  WIN_LINES: 20,
  UI: 100,
  MODAL: 1000
};

bg.setDepth(DEPTH.BG);
ui.setDepth(DEPTH.UI);
```

### 7. Текстури **степеня двійки**

WebGL любить розміри 256×256, 512×512, 1024×1024, 2048×2048. На великих атласах — відчутно швидше.

### 8. Стискай **аудіо**

96 kbps MP3 для SFX, 128 kbps для музики. Жодного WAV.

### 9. **Прибирай зайві анімації**

Нескінченні tweens на невидимих об'єктах — зайве навантаження. Зупиняй:

```js
hide() {
  this.tweens.killTweensOf(this);
  this.setVisible(false);
}
```

### 10. **Lazy-load**

Не вантаж бонус-ассети в `PreloadScene` — довантажуй при вході в бонус.

## Цільові метрики для слота

| Метрика | Ціль |
|---|---|
| Розмір білда | < 5 МБ (без Spine), < 15 МБ (зі Spine) |
| Час завантаження на 4G | < 5 сек |
| FPS на iPhone 8 | стабільно 60 |
| FPS на бюджетному Android | стабільно 30+ |
| Draw calls на кадр | < 50 |
| Memory | < 200 МБ на iOS |

## Чек-лист перед релізом

- [ ] Усі ассети в атласах
- [ ] BitmapText для лічильників
- [ ] Object pool для частинок
- [ ] Звуки в audio sprite
- [ ] Прогрес-бар на завантаженні
- [ ] Mute-кнопка
- [ ] Pause при втраті фокусу
- [ ] Fullscreen-кнопка
- [ ] Адаптивність portrait/landscape
- [ ] Захист від подвійного кліку на SPIN
- [ ] Loading-screen на кожен мережевий запит
- [ ] Обробка помилок мережі
- [ ] Мініфікація і tree-shaking (Vite робить сам)
- [ ] Тестування на 3 пристроях: iOS, Android, Desktop

---

## ✅ Вправа 13

1. Візьми проєкт із будь-якої попередньої глави. Розділи сцену на:
   - `EventBus.js` — глобальні події
   - `Card.js` — клас-нащадок Container для карти
   - `GameScene.js` — тільки координація
2. Реалізуй просту `StateMachine` зі станами `idle`, `flipping`, `matching`.
3. Зроби Object Pool для зірок-частинок (створи 50 заздалегідь, перевикористовуй).
4. Підключи FPS-метр у куті.
5. **Бонус:** заміряй FPS до й після оптимізацій. Відкрий Performance у Chrome DevTools і зроби профайлінг.

[Глава 14. Прототип слота на Phaser](./14-slot-prototype.md)


---

# Глава 14. Прототип слота на Phaser

Фінальна глава. Тут ми зберемо все, що пройшли, у працюючий прототип слота: 5 барабанів × 3 символи, 5 ліній, кнопка SPIN, баланс, виграші.

Це **навчальний** прототип — без графіки рівня production, але з правильною архітектурою.

## Що ми побудуємо

```
┌──────────────────────────────────────┐
│         Background image             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  │ ♠ │ │ ♥ │ │ ♣ │ │ ♦ │ │ ★ │  ← символи
│  │ ♥ │ │ ★ │ │ ♣ │ │ ♥ │ │ ♠ │  ← 3 видимі ряди
│  │ ★ │ │ ♣ │ │ ♥ │ │ ★ │ │ ♦ │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
│  Balance: 1000   Bet: 10   Win: 0       │
│              [   SPIN   ]                │
└──────────────────────────────────────┘
```

## Структура проєкту

```
src/
├── main.js
├── config.js
├── core/
│   ├── EventBus.js
│   └── StateMachine.js
├── slot/
│   ├── SlotConfig.js        # конфігурація слота
│   ├── Symbol.js
│   ├── Reel.js
│   ├── ReelManager.js
│   ├── WinEvaluator.js
│   └── ServerMock.js
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   └── GameScene.js
└── ui/
    ├── SpinButton.js
    ├── BalanceDisplay.js
    └── WinDisplay.js
```

## Крок 1. Конфігурація слота

```js
// src/slot/SlotConfig.js
export const SLOT_CONFIG = {
  reels: 5,
  rows: 3,
  symbolSize: 100,
  symbolSpacing: 10,

  // Доступні символи (ключі в атласі)
  symbols: ['ace', 'king', 'queen', 'jack', 'ten', 'star', 'heart'],

  // Ваги для випадкової видачі (чим більше — тим частіше)
  weights: {
    ace:   3,
    king:  4,
    queen: 5,
    jack:  6,
    ten:   8,
    star:  1,    // рідкісний — wild
    heart: 2     // scatter
  },

  // Таблиця виплат: символ → { 3:x, 4:x, 5:x } за таку кількість поспіль
  paytable: {
    ace:   { 3: 10,  4: 30,  5: 100 },
    king:  { 3: 8,   4: 20,  5: 75 },
    queen: { 3: 5,   4: 15,  5: 50 },
    jack:  { 3: 4,   4: 10,  5: 30 },
    ten:   { 3: 2,   4: 6,   5: 20 },
    star:  { 3: 50,  4: 200, 5: 1000 },
    heart: { 3: 5,   4: 25,  5: 100 }
  },

  // Лінії виплат (5 простих горизонтальних)
  lines: [
    [0, 0, 0, 0, 0],   // верхній ряд
    [1, 1, 1, 1, 1],   // середній
    [2, 2, 2, 2, 2],   // нижній
    [0, 1, 2, 1, 0],   // V
    [2, 1, 0, 1, 2]    // ^
  ]
};
```

## Крок 2. EventBus

```js
// src/core/EventBus.js
import Phaser from 'phaser';
export const EventBus = new Phaser.Events.EventEmitter();
```

## Крок 3. Клас символа

```js
// src/slot/Symbol.js
import Phaser from 'phaser';

export default class Symbol extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key) {
    super(scene, x, y);
    this.symbolKey = key;

    // Тут key — це ім'я картинки. Можна використовувати атлас.
    // У прототипі використовуємо простий Image.
    this.image = scene.add.rectangle(0, 0, 90, 90, this.colorFor(key));
    this.label = scene.add.text(0, 0, key.toUpperCase().slice(0, 2), {
      fontSize: '32px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add([this.image, this.label]);
    scene.add.existing(this);
  }

  colorFor(key) {
    return {
      ace: 0xff3366, king: 0xff6633, queen: 0xffcc33,
      jack: 0x66ff33, ten: 0x33ccff, star: 0xff00ff, heart: 0xffffff
    }[key] || 0x888888;
  }

  setSymbol(key) {
    this.symbolKey = key;
    this.image.setFillStyle(this.colorFor(key));
    this.label.setText(key.toUpperCase().slice(0, 2));
  }

  playWin() {
    return this.scene.tweens.add({
      targets: this,
      scale: { from: 1, to: 1.2 },
      duration: 300,
      yoyo: true,
      repeat: 2,
      ease: 'Sine.easeInOut'
    });
  }

  unhighlight() {
    this.scene.tweens.killTweensOf(this);
    this.setScale(1);
  }
}
```

## Крок 4. Клас барабана

```js
// src/slot/Reel.js
import Phaser from 'phaser';
import Symbol from './Symbol.js';
import { SLOT_CONFIG } from './SlotConfig.js';

export default class Reel extends Phaser.GameObjects.Container {
  constructor(scene, x, y, reelIndex) {
    super(scene, x, y);
    this.scene = scene;
    this.reelIndex = reelIndex;
    this.cellSize = SLOT_CONFIG.symbolSize + SLOT_CONFIG.symbolSpacing;

    this.symbols = [];
    // Створюємо 3 видимі + 1 невидимий зверху для прокручування
    for (let i = -1; i < SLOT_CONFIG.rows; i++) {
      const sym = new Symbol(scene, 0, i * this.cellSize, this.randomSymbolKey());
      this.symbols.push(sym);
      this.add(sym);
    }

    scene.add.existing(this);
  }

  randomSymbolKey() {
    const w = SLOT_CONFIG.weights;
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (const [key, weight] of Object.entries(w)) {
      r -= weight;
      if (r <= 0) return key;
    }
    return 'ten';
  }

  /**
   * Прокрутити барабан і закінчити вказаними символами (3 видимі).
   * @param {string[]} finalSymbols — 3 символи зверху-вниз
   * @param {number} delayBeforeStop — мс до зупинки (для каскаду)
   */
  async spin(finalSymbols, delayBeforeStop) {
    return new Promise(resolve => {
      // 1. Розгін — символи швидко рухаються вниз
      const spinCycle = () => {
        return this.scene.tweens.add({
          targets: this.symbols,
          y: `+=${this.cellSize}`,
          duration: 80,
          ease: 'Linear',
          onComplete: () => {
            // Перенести символ знизу нагору і змінити
            this.symbols.forEach(s => {
              if (s.y >= (SLOT_CONFIG.rows - 1) * this.cellSize) {
                s.y -= SLOT_CONFIG.rows * this.cellSize;
                s.setSymbol(this.randomSymbolKey());
              }
            });
          }
        });
      };

      // Запускаємо цикли
      const startSpin = () => {
        const tw = spinCycle();
        tw.on('complete', () => {
          if (this.shouldStop) {
            this.finalLanding(finalSymbols, resolve);
          } else {
            startSpin();
          }
        });
      };

      this.shouldStop = false;
      startSpin();

      // Через delayBeforeStop ставимо прапорець — після чергового циклу барабан зупиниться
      this.scene.time.delayedCall(delayBeforeStop, () => {
        this.shouldStop = true;
      });
    });
  }

  finalLanding(finalSymbols, resolve) {
    // Поставити символи по місцях і анімувати "посадку"
    finalSymbols.forEach((key, i) => {
      this.symbols[i + 1].setSymbol(key);   // [0] — невидимий зверху
      this.symbols[i + 1].y = i * this.cellSize;
    });
    // Зверху випадковий
    this.symbols[0].setSymbol(this.randomSymbolKey());
    this.symbols[0].y = -this.cellSize;

    // Ефект "удар" знизу
    this.scene.tweens.add({
      targets: this.symbols.slice(1),
      y: '+=10',
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: resolve
    });
  }

  /** Отримати 3 видимі символи */
  getVisibleSymbols() {
    return this.symbols.slice(1, SLOT_CONFIG.rows + 1).map(s => s.symbolKey);
  }

  /** Отримати символ у конкретній позиції (0..rows-1) */
  getSymbolAt(row) {
    return this.symbols[row + 1];
  }
}
```

## Крок 5. Менеджер барабанів

```js
// src/slot/ReelManager.js
import Phaser from 'phaser';
import Reel from './Reel.js';
import { SLOT_CONFIG } from './SlotConfig.js';

export default class ReelManager extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.reels = [];

    const cell = SLOT_CONFIG.symbolSize + SLOT_CONFIG.symbolSpacing;
    const totalWidth = SLOT_CONFIG.reels * cell;
    const startX = -totalWidth / 2 + cell / 2;

    for (let i = 0; i < SLOT_CONFIG.reels; i++) {
      const reel = new Reel(scene, startX + i * cell, 0, i);
      this.reels.push(reel);
      this.add(reel);
    }

    scene.add.existing(this);

    // Маска — показуємо тільки 3 ряди
    const maskRect = scene.add.graphics();
    maskRect.fillRect(
      x - totalWidth / 2,
      y - cell / 2,
      totalWidth,
      cell * SLOT_CONFIG.rows
    );
    this.setMask(maskRect.createGeometryMask());
    maskRect.setVisible(false);
  }

  /**
   * @param {string[][]} finalGrid — масив 5 стовпців по 3 символи
   */
  async spin(finalGrid) {
    const promises = this.reels.map((reel, i) =>
      reel.spin(finalGrid[i], 800 + i * 200)   // кожен наступний зупиняється пізніше
    );
    await Promise.all(promises);
  }

  highlightWin(positions) {
    positions.forEach(({ reel, row }) => {
      this.reels[reel].getSymbolAt(row).playWin();
    });
  }

  clearHighlights() {
    this.reels.forEach(r => r.symbols.forEach(s => s.unhighlight()));
  }

  getGrid() {
    return this.reels.map(r => r.getVisibleSymbols());
  }
}
```

## Крок 6. Оцінка виграшів

```js
// src/slot/WinEvaluator.js
import { SLOT_CONFIG } from './SlotConfig.js';

export class WinEvaluator {
  /**
   * @param {string[][]} grid — 5 стовпців по 3 символи (grid[col][row])
   * @returns {{lines: Array, total: number}}
   */
  static evaluate(grid, bet) {
    const wins = [];

    SLOT_CONFIG.lines.forEach((linePattern, lineIndex) => {
      const lineSymbols = linePattern.map((row, col) => grid[col][row]);
      const first = lineSymbols[0];

      // Рахуємо скільки однакових поспіль із початку
      let count = 1;
      for (let i = 1; i < lineSymbols.length; i++) {
        if (lineSymbols[i] === first) count++;
        else break;
      }

      const payRule = SLOT_CONFIG.paytable[first];
      if (payRule && payRule[count]) {
        const positions = [];
        for (let c = 0; c < count; c++) {
          positions.push({ reel: c, row: linePattern[c] });
        }
        wins.push({
          line: lineIndex + 1,
          symbol: first,
          count,
          amount: payRule[count] * bet,
          positions
        });
      }
    });

    const total = wins.reduce((s, w) => s + w.amount, 0);
    return { lines: wins, total };
  }
}
```

## Крок 7. ServerMock — генератор результатів

```js
// src/slot/ServerMock.js
import { SLOT_CONFIG } from './SlotConfig.js';
import { WinEvaluator } from './WinEvaluator.js';

export class ServerMock {
  static balance = 1000;

  static randomSymbol() {
    const w = SLOT_CONFIG.weights;
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (const [key, weight] of Object.entries(w)) {
      r -= weight;
      if (r <= 0) return key;
    }
    return 'ten';
  }

  static async spin(bet) {
    // Симуляція мережевої затримки
    await new Promise(r => setTimeout(r, 100));

    if (this.balance < bet) throw new Error('Not enough balance');
    this.balance -= bet;

    // Генеруємо сітку
    const grid = [];
    for (let c = 0; c < SLOT_CONFIG.reels; c++) {
      const col = [];
      for (let r = 0; r < SLOT_CONFIG.rows; r++) {
        col.push(this.randomSymbol());
      }
      grid.push(col);
    }

    const wins = WinEvaluator.evaluate(grid, bet);
    this.balance += wins.total;

    return {
      grid,
      wins,
      balance: this.balance
    };
  }
}
```

## Крок 8. UI-компоненти

```js
// src/ui/SpinButton.js
import Phaser from 'phaser';
import { EventBus } from '../core/EventBus.js';

export default class SpinButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.bg = scene.add.circle(0, 0, 50, 0x00cc66).setStrokeStyle(4, 0xffffff);
    this.label = scene.add.text(0, 0, 'SPIN', {
      fontSize: '24px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add([this.bg, this.label]);
    scene.add.existing(this);

    this.bg.setInteractive({ useHandCursor: true });
    this.bg.on('pointerdown', () => this.handlePress());
    this.bg.on('pointerover', () => this.setScale(1.1));
    this.bg.on('pointerout',  () => this.setScale(1));
  }

  handlePress() {
    if (!this.enabled) return;
    EventBus.emit('spin-pressed');
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.alpha = enabled ? 1 : 0.5;
  }
}
```

```js
// src/ui/BalanceDisplay.js
import Phaser from 'phaser';

export default class BalanceDisplay extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.label = scene.add.text(0, 0, 'Balance: 1000', {
      fontSize: '24px', color: '#ffffff'
    }).setOrigin(0.5);
    this.add(this.label);
    scene.add.existing(this);
  }

  setBalance(value) {
    this.label.setText(`Balance: ${value}`);
  }

  animateTo(value, duration = 800) {
    let from = parseInt(this.label.text.replace(/\D/g, ''), 10) || 0;
    this.scene.tweens.addCounter({
      from, to: value, duration, ease: 'Cubic.easeOut',
      onUpdate: (tween) => {
        this.label.setText(`Balance: ${Math.floor(tween.getValue())}`);
      }
    });
  }
}
```

```js
// src/ui/WinDisplay.js
import Phaser from 'phaser';

export default class WinDisplay extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.label = scene.add.text(0, 0, '', {
      fontSize: '36px', color: '#ffff00', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(this.label);
    scene.add.existing(this);
  }

  show(amount) {
    this.label.setText(`WIN: 0`);
    this.alpha = 0;
    this.setScale(0.5);

    this.scene.tweens.add({
      targets: this, alpha: 1, scale: 1, duration: 300, ease: 'Back.easeOut'
    });

    this.scene.tweens.addCounter({
      from: 0, to: amount, duration: 1500, ease: 'Cubic.easeOut',
      onUpdate: (tween) => {
        this.label.setText(`WIN: ${Math.floor(tween.getValue())}`);
      }
    });
  }

  hide() {
    this.scene.tweens.add({ targets: this, alpha: 0, duration: 300 });
  }
}
```

## Крок 9. GameScene — збираємо все

```js
// src/scenes/GameScene.js
import Phaser from 'phaser';
import ReelManager from '../slot/ReelManager.js';
import { ServerMock } from '../slot/ServerMock.js';
import { EventBus } from '../core/EventBus.js';
import SpinButton from '../ui/SpinButton.js';
import BalanceDisplay from '../ui/BalanceDisplay.js';
import WinDisplay from '../ui/WinDisplay.js';

export default class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene' }); }

  create() {
    const { width, height } = this.scale;

    // Фон
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);
    this.add.text(width / 2, 40, 'PHASER SLOT', {
      fontSize: '32px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Барабани по центру
    this.reels = new ReelManager(this, width / 2, height / 2 - 30);

    // UI
    this.balance = new BalanceDisplay(this, width / 2 - 200, height - 100);
    this.balance.setBalance(ServerMock.balance);

    this.winDisplay = new WinDisplay(this, width / 2, height - 150);

    this.spinBtn = new SpinButton(this, width / 2, height - 70);

    this.bet = 10;
    this.spinning = false;

    EventBus.on('spin-pressed', this.onSpin, this);

    // Spacebar = SPIN
    this.input.keyboard.on('keydown-SPACE', () => this.onSpin());
  }

  async onSpin() {
    if (this.spinning) return;
    this.spinning = true;

    this.spinBtn.setEnabled(false);
    this.winDisplay.hide();
    this.reels.clearHighlights();

    try {
      // 1. Запит на сервер
      const response = await ServerMock.spin(this.bet);

      // 2. Анімація спіну з фінальною сіткою
      await this.reels.spin(response.grid);

      // 3. Оновлення балансу
      this.balance.animateTo(response.balance);

      // 4. Показ виграшів
      if (response.wins.total > 0) {
        this.winDisplay.show(response.wins.total);
        response.wins.lines.forEach(line => {
          this.reels.highlightWin(line.positions);
        });

        // Бахнем камерою якщо виграш великий
        if (response.wins.total >= this.bet * 50) {
          this.cameras.main.shake(500, 0.005);
          this.cameras.main.flash(300, 255, 215, 0);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.spinning = false;
      this.spinBtn.setEnabled(true);
    }
  }

  shutdown() {
    EventBus.off('spin-pressed', this.onSpin, this);
  }
}
```

## Крок 10. Запуск

```js
// src/main.js
import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  backgroundColor: '#0a0a1a',
  scene: [GameScene]
});
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Phaser Slot</title>
<style>body{margin:0;background:#000;}#game{height:100vh;display:flex;align-items:center;justify-content:center;}</style>
</head>
<body><div id="game"></div><script type="module" src="/src/main.js"></script></body>
</html>
```

## Що вийде

- **5 барабанів** із прокручуванням, кожен наступний зупиняється із затримкою
- **5 ліній виплат** (3 горизонтальні + 2 діагональні)
- **Підсвітка виграшу** — виграшні символи пульсують
- **Анімація балансу** — плавний лічильник
- **Анімація виграшу** — "WIN: 100" з ефектом підрахунку
- **Camera shake + flash** при великих виграшах
- **Захист від подвійного кліку**
- **Spacebar = SPIN**
- **ServerMock** — уся логіка "на сервері", клієнт тільки показує

## Що покращити далі

Це основа. Щоб отримати **production-рівень**:

1. **Графіка** — замінити rectangles на спрайти в атласі
2. **Звуки** — spin loop, reel stop, win SFX, jingles
3. **Bet selector** — кнопки + і - для зміни ставки
4. **Auto-spin** — автоматичний режим N спінів
5. **Paytable modal** — вікно з правилами і таблицею
6. **Free Spins / Bonus** — окрема сцена бонус-гри
7. **Animations зі Spine** — символи wild з похитуванням
8. **Particles** — конфеті при big-win
9. **Анімація виграшної лінії** — намалювати лінії Graphics + анімувати
10. **Мережевий шар** — замінити ServerMock на реальне API

## Що ми пройшли в курсі

✅ Установка та базове налаштування
✅ Game Config
✅ Сцени та переходи
✅ Завантаження ассетів
✅ Display objects (Image, Text, Container, Graphics)
✅ Tweens та animations
✅ Введення (mouse, keyboard)
✅ Звук
✅ Камера
✅ Адаптивність
✅ Particles
✅ Фізика
✅ Архітектура та оптимізація
✅ Прототип слота

## Куди рухатися далі

1. **Доопрацюй цей слот** — додай графіку, звуки, ефекти
2. **Вивчи Spine** — без нього production-слотів не буває: [esotericsoftware.com/spine-runtimes](https://esotericsoftware.com/spine-runtimes)
3. **Вивчи GSAP** — краще за вбудовані tweens для складних таймлайнів
4. **Переходь на Pixi.js** — тепер, коли розумієш Phaser, Pixi здаватиметься простішим
5. **Зроби 2-3 різні слоти** на Phaser — один із фріспінами, один із бонус-грою, один із каскадними виграшами
6. **Вивчи production-стек** — Pixi + GSAP + Howler + Spine + WebPack/Vite

## Фінальна вправа

Візьми цей прототип і за тиждень-два доведи до грабельного стану:

1. ✅ Заміни rectangles на нормальні карткові/тематичні спрайти (можна безкоштовні з [Kenney.nl](https://kenney.nl))
2. ✅ Додай усі звуки (spin, stop, win, big-win, click)
3. ✅ Зроби bet selector (3 рівні ставки)
4. ✅ Зроби авто-спін (3, 5, 10 спінів)
5. ✅ Додай paytable-модалку
6. ✅ Зроби "вогники" навколо виграшних символів через particles
7. ✅ Зроби окрему UIScene
8. ✅ Деплой на GitHub Pages — і покажи всім

Коли все це зробиш — ти готовий до індустрії. 🎰

---

**Успіхів!** Якщо в процесі навчання виникнуть запитання — повертайся до відповідних глав, експериментуй на [phaser.io/examples](https://phaser.io/examples) і не бійся читати [вихідники Phaser](https://github.com/phaserjs/phaser) — вони добре задокументовані.
