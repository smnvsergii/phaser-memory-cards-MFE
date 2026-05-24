# 🎮 Курс по Phaser 3 — от нуля до прототипа слота

Полный учебный курс по Phaser 3 на русском языке. Каждая глава содержит:
- **Теорию** — что и зачем
- **Код-примеры** — рабочие сниппеты, которые можно копировать
- **Практику** — задания для закрепления

Цель курса — после прохождения вы сможете самостоятельно собрать слот-игру или любую 2D игру на Phaser 3.

---

## 📚 Программа курса

### Часть 1. Основы
- [Глава 0. Введение в Phaser](./00-introduction.md) — что это, история, экосистема, когда использовать
- [Глава 1. Настройка проекта](./01-setup.md) — Vite, структура, первый запуск
- [Глава 2. Game Config](./02-game-config.md) — конфигурация игры, рендереры
- [Глава 3. Сцены (Scenes)](./03-scenes.md) — жизненный цикл, переключение, передача данных

### Часть 2. Контент
- [Глава 4. Загрузка ассетов (Loader)](./04-assets.md) — изображения, атласы, аудио, шрифты
- [Глава 5. Display Objects](./05-display-objects.md) — Sprite, Image, Graphics, Text, Container
- [Глава 6. Анимации и Tweens](./06-animations-tweens.md) — sprite-анимации, плавные движения

### Часть 3. Взаимодействие
- [Глава 7. Ввод (Input)](./07-input.md) — мышь, тач, drag&drop, клавиатура
- [Глава 8. Звук](./08-sound.md) — Sound Manager, sprite sounds
- [Глава 9. Камера](./09-camera.md) — scroll, zoom, эффекты
- [Глава 10. Scale Manager](./10-scale-manager.md) — адаптивность, mobile/desktop

### Часть 4. Расширенное
- [Глава 11. Particle System](./11-particles.md) — эмиттеры, эффекты выигрыша
- [Глава 12. Физика (Arcade)](./12-physics.md) — коллизии, тела, группы
- [Глава 13. Архитектура и оптимизация](./13-architecture.md) — паттерны, pooling, профилирование

### Часть 5. Практический проект
- [Глава 14. Прототип слота на Phaser](./14-slot-prototype.md) — собираем reels, win-логику, анимации

---

## 🎯 Как заниматься

1. Читай главу подряд — теория → код → упражнение
2. **Обязательно делай практику.** Без неё материал не закрепится
3. Каждое упражнение пиши с нуля, не копируй из главы
4. После каждых 3–4 глав возвращайся к старому коду и улучшай его
5. После Главы 14 — построй свой собственный мини-слот без подсказок

## ⏱ Примерный темп

| Часть | Время (часов) |
|---|---|
| Часть 1 (Основы) | 6–8 ч |
| Часть 2 (Контент) | 8–10 ч |
| Часть 3 (Взаимодействие) | 10–12 ч |
| Часть 4 (Расширенное) | 8–10 ч |
| Часть 5 (Слот) | 15–20 ч |
| **Итого** | **~50–60 ч** (4–6 недель по часу-два в день) |

## 🔗 Полезные ссылки

- [Официальная документация Phaser 3](https://phaser.io/docs/3)
- [API Reference](https://newdocs.phaser.io/docs/3.80.0)
- [Phaser Examples (более 1700 примеров)](https://phaser.io/examples)
- [Phaser Discord](https://discord.gg/phaser)

## 🛠 Версия

Курс рассчитан на **Phaser 3.80+** (актуальная стабильная). Если у вас другая версия — смотрите changelog, базовые принципы остаются те же.

---

Удачи в обучении! 🚀


---


# Глава 0. Введение в Phaser

## Что такое Phaser

**Phaser** — это HTML5-фреймворк для создания 2D-игр в браузере. Написан на JavaScript/TypeScript, под капотом использует **WebGL** (с Canvas-фолбэком).

Phaser — это **готовый игровой движок**, в котором уже есть:
- Рендерер 2D-графики (WebGL/Canvas)
- Система сцен и игровой цикл
- Загрузчик ассетов
- Анимации (sprite + tweens)
- Ввод (мышь, тач, клавиатура, геймпад)
- Аудио-менеджер
- Физические движки (Arcade, Matter.js)
- Камера, частицы, текст, маски
- Адаптивность (Scale Manager)

То есть Phaser даёт **всё необходимое из коробки**, в отличие от Pixi.js (только рендерер) или чистого WebGL.

## Версии Phaser

- **Phaser 2 (CE)** — устаревшая, на ES5, не используйте для новых проектов
- **Phaser 3** — актуальная, на ES6+, полная переработка архитектуры
- **Phaser 4** — в разработке (на момент 2026), пока не релиз

В курсе используем **Phaser 3.80+**.

## Где Phaser применяется

- Casual / hyper-casual игры (Match-3, runners, puzzles)
- Образовательные игры
- Реклама-игры (playable ads)
- **Слоты и казуальные казино-игры** (хотя индустрия чаще выбирает Pixi)
- Прототипы для последующего портирования

## Phaser vs Pixi vs Unity (для понимания)

| | Phaser | Pixi.js | Unity |
|---|---|---|---|
| Тип | Фреймворк | Только рендерер | Полноценный движок |
| Язык | JS/TS | JS/TS | C# |
| Платформа | Браузер | Браузер | Везде |
| Кривая обучения | Низкая | Низкая (но много пишешь сам) | Высокая |
| Готовность из коробки | Высокая | Низкая | Очень высокая |
| Производительность | Средняя | Высокая | Очень высокая |
| Подходит для слотов | Да (для прототипов) | Да (production-стандарт) | Редко |

**Вывод:** Phaser идеален для обучения и быстрых прототипов. Освоив его, переход на Pixi будет лёгким.

## Архитектура Phaser-игры

```
┌─────────────────────────────────┐
│           Phaser.Game           │  ← главный объект
│  ┌───────────────────────────┐  │
│  │      Scene Manager        │  │  ← управляет сценами
│  │  ┌─────────────────────┐  │  │
│  │  │   BootScene         │  │  │  ← быстрая инициализация
│  │  │   PreloadScene      │  │  │  ← загрузка ассетов
│  │  │   MenuScene         │  │  │  ← меню
│  │  │   GameScene         │  │  │  ← игра
│  │  │   UIScene           │  │  │  ← UI поверх игры
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Loader / Cache / Sound   │  │
│  │  Input / Physics / Tweens │  │
│  │  Renderer / Camera        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## Ключевые концепции (краткий словарь)

| Термин | Значение |
|---|---|
| **Game** | Корневой объект, инстанс Phaser.Game |
| **Scene** | Самостоятельный модуль игры (меню, уровень, UI) |
| **GameObject** | Любой объект на сцене (Sprite, Text, Graphics) |
| **Texture** | Загруженное изображение в памяти GPU |
| **Atlas** | Один файл со множеством спрайтов + JSON с координатами |
| **Tween** | Плавная анимация свойств (alpha, x, scale, ...) |
| **Animation** | Покадровая анимация на основе спрайтшита |
| **Cache** | Хранилище загруженных ассетов |
| **Loader** | Менеджер загрузки ассетов |

## Что нам нужно для старта

1. **Node.js 18+** и npm
2. Любой редактор (VS Code, WebStorm)
3. Современный браузер (Chrome/Firefox)
4. Базовое знание JavaScript (ES6+, классы, promises, modules)

## Чего знать **не нужно** (Phaser сам всё спрячет)

- WebGL и шейдеры (на старте)
- Матричная математика (на старте)
- Низкоуровневая работа с Canvas API

---

## ✅ Упражнение 0

Никакого кода в этой главе нет. Зато:

1. Открой [phaser.io/examples](https://phaser.io/examples) и **полистай минут 15**. Запомни, что Phaser умеет.
2. Найди раздел "Tweens" → "Yoyo" — это пригодится в слотах для пульсации символов.
3. Найди раздел "Masks" — это понадобится для барабанов слота.

Когда будешь готов — переходи к [Главе 1. Настройка проекта](./01-setup.md).


---


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


---


# Глава 2. Game Config — конфигурация игры

`Game Config` — это объект, который ты передаёшь в `new Phaser.Game(config)`. Он определяет **всё** поведение твоей игры на верхнем уровне: размер, рендерер, физику, плагины, сцены.

## Минимальный конфиг

```js
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene]
};
```

## Полный конфиг с пояснениями

```js
const config = {
  // === Рендерер ===
  type: Phaser.AUTO,           // AUTO | WEBGL | CANVAS | HEADLESS

  // === Размер канваса ===
  width: 1280,
  height: 720,

  // === DOM ===
  parent: 'game',              // id элемента-контейнера
  canvas: undefined,           // можно подсунуть существующий <canvas>
  canvasStyle: '',             // CSS для канваса
  expandParent: true,

  // === Цвет фона ===
  backgroundColor: '#1a1a2e',

  // === Сцены ===
  scene: [BootScene, PreloadScene, GameScene],

  // === Масштабирование ===
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
    min: { width: 320, height: 480 },
    max: { width: 1920, height: 1080 }
  },

  // === Физика ===
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },

  // === Ввод ===
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false,
    activePointers: 3          // сколько пальцев одновременно отслеживать
  },

  // === Аудио ===
  audio: {
    disableWebAudio: false,
    noAudio: false
  },

  // === Рендеринг ===
  render: {
    pixelArt: false,           // true = резкое масштабирование без сглаживания
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

  // === Плагины ===
  plugins: {
    global: [],
    scene: []
  },

  // === Локальное хранилище (DOM) ===
  dom: {
    createContainer: false
  }
};
```

## Разбор по разделам

### `type`

| Значение | Что делает |
|---|---|
| `Phaser.AUTO` | Сам выбирает: WebGL если возможно, иначе Canvas (рекомендуется) |
| `Phaser.WEBGL` | Только WebGL. Если не поддерживается — ошибка |
| `Phaser.CANVAS` | Только 2D Canvas. Медленнее, но универсально |
| `Phaser.HEADLESS` | Без рендеринга (для серверных тестов) |

**Используй `Phaser.AUTO` всегда**, кроме особых случаев.

### `width` / `height`

Это **внутренний логический размер игры**. Все координаты внутри (x=400, y=300) измеряются в этих единицах. Реальный размер на экране определяется `scale`.

Для слотов часто берут:
- **Landscape:** 1280×720 или 1920×1080
- **Portrait:** 720×1280 или 1080×1920
- **Универсал:** 1280×800 (компромисс)

### `parent`

DOM-элемент, в который Phaser вставит свой `<canvas>`. Можно передать:
- ID строкой: `'game'`
- DOM-элемент: `document.getElementById('game')`
- Если не указать — канвас вставится в `<body>`

### `backgroundColor`

Цвет за всем рендерингом. Принимает:
- Hex-строку: `'#1a1a2e'`
- Hex-число: `0x1a1a2e`
- CSS-имя: `'red'`

Если установить `render.transparent: true`, цвет фона игнорируется и канвас становится прозрачным (полезно для интеграции в страницу).

### `scene`

Массив сцен. **Первая сцена в массиве запускается автоматически.** Остальные можно стартовать через `this.scene.start('Key')`.

Можно передать:
- Массив классов: `[BootScene, GameScene]`
- Массив объектов: `[{ key: 'GameScene', preload, create, update }]`
- Один объект (для простейших игр)

### `render` — нюансы

**`pixelArt: true`** — критично для пиксель-арта. Включает `nearest neighbor` фильтрацию вместо `linear`. Без этого пиксельный спрайт при масштабировании размылится.

```js
render: {
  pixelArt: true,
  antialias: false,
  roundPixels: true
}
```

**`powerPreference`** — для мобильных. На ноутбуках выбирает дискретную видеокарту вместо встройки.

**`transparent: true`** — канвас прозрачный, виден HTML под ним. Полезно для оверлеев, но даёт небольшой оверхед.

### `fps`

```js
fps: {
  target: 60,           // целевой FPS
  forceSetTimeOut: false,  // не использовать requestAnimationFrame
  smoothStep: true      // сглаживание deltaTime
}
```

`target: 60` не значит "ограничить 60 FPS". Это значение влияет на физику и timing, реальный кадр идёт с частотой монитора (60/120/144 Hz).

## Пример конфига для слот-игры

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
  // Физика слотам обычно не нужна
  scene: [BootScene, PreloadScene, GameScene, UIScene]
};
```

## Доступ к конфигу из сцены

```js
create() {
  const { width, height } = this.scale.gameSize;
  console.log(this.game.config);     // полный конфиг
  console.log(this.sys.game.config.width); // ширина
}
```

## Как менять конфиг **на лету**

Большинство параметров **нельзя** менять после `new Phaser.Game()`. Но вот что можно:

```js
// Изменить размер
this.scale.resize(1920, 1080);

// Изменить цвет фона
this.cameras.main.setBackgroundColor('#ff0000');

// Включить/выключить debug-физику
this.physics.world.drawDebug = true;
```

## Несколько игр на странице

Можно создать несколько `Phaser.Game` инстансов на одной странице:

```js
const game1 = new Phaser.Game({ ...config1, parent: 'slot1' });
const game2 = new Phaser.Game({ ...config2, parent: 'slot2' });
```

Полезно, например, если у тебя страница с галереей слотов.

---

## ✅ Упражнение 2

В проекте из Главы 1:

1. **Поменяй** размер на 1280×720.
2. **Включи** `scale.mode: Phaser.Scale.FIT` и `autoCenter` — игра должна оставаться центрированной при ресайзе окна.
3. **Поменяй** `backgroundColor` через `cameras.main.setBackgroundColor()` в `create()` — посмотри, как это работает по-другому.
4. **Попробуй** установить `render.pixelArt: true` — увидишь ли разницу на тексте?
5. **Открой консоль** и выведи `this.sys.game.config` в `create()` — изучи, что там.

Когда разобрался — переходи к [Главе 3. Сцены (Scenes)](./03-scenes.md).


---


# Глава 3. Сцены (Scenes)

Сцена — это **самостоятельный модуль** игры. Меню, уровень, экран загрузки, UI поверх игры — всё это отдельные сцены. Сцены умеют запускаться, останавливаться, паузиться, идти параллельно.

## Зачем нужны сцены

- **Изоляция логики:** код меню не смешивается с кодом игрового уровня
- **Переиспользование:** одну сцену можно перезапускать с разными параметрами (рестарт уровня)
- **Параллельность:** UI идёт поверх игровой сцены как отдельный слой
- **Управление памятью:** при остановке сцены её ресурсы можно очистить

## Создание сцены

Два способа:

### 1. Через класс (рекомендуется)

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) { /* инициализация */ }
  preload() { /* загрузка ассетов */ }
  create(data) { /* создание объектов */ }
  update(time, delta) { /* кадр */ }
}
```

### 2. Через объект (для микро-игр)

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

## Жизненный цикл сцены

Когда сцена запускается, методы вызываются в таком порядке:

```
init(data)  →  preload()  →  create(data)  →  update(time, delta)  ← цикл
```

| Метод | Когда вызывается | Для чего |
|---|---|---|
| `init(data)` | Один раз, до загрузки | Инициализация переменных, разбор `data` |
| `preload()` | Один раз, перед `create` | Загрузка ассетов через `this.load` |
| `create(data)` | Один раз, после загрузки | Создание объектов, запуск анимаций |
| `update(time, delta)` | Каждый кадр (60+ раз/сек) | Игровая логика, движение |

Дополнительные хуки:

| Метод | Когда |
|---|---|
| `pause()` | При паузе сцены |
| `resume()` | При возобновлении |
| `sleep()` | При "засыпании" (сцена скрыта, но жива) |
| `wake()` | При пробуждении |
| `shutdown()` | При остановке (объекты уничтожаются) |
| `destroy()` | При полном удалении (редко используется) |

## Менеджер сцен — `this.scene`

В каждой сцене доступен `this.scene` — это плагин для управления сценами.

### Основные методы

```js
// Запустить сцену (текущая останавливается)
this.scene.start('GameScene');

// Запустить сцену параллельно (текущая работает)
this.scene.launch('UIScene');

// Передать данные при запуске
this.scene.start('GameScene', { level: 5, score: 100 });

// Перезапустить текущую сцену
this.scene.restart();

// Перезапустить с данными
this.scene.restart({ level: 6 });

// Остановить сцену
this.scene.stop('UIScene');

// Пауза / возобновление
this.scene.pause('GameScene');
this.scene.resume('GameScene');

// Sleep / wake (быстрее чем stop/start, не вызывает destroy)
this.scene.sleep('UIScene');
this.scene.wake('UIScene');

// Переключение (стоп текущей + старт указанной)
this.scene.switch('MenuScene');

// Получить инстанс другой сцены
const ui = this.scene.get('UIScene');
ui.events.emit('updateScore', 100);

// Изменить порядок отрисовки
this.scene.bringToTop('UIScene');     // наверх
this.scene.sendToBack('Background');  // вниз
this.scene.moveAbove('A', 'B');       // A выше B
```

## Передача данных между сценами

### Способ 1. Через `start(key, data)`

```js
// Из MenuScene
this.scene.start('GameScene', {
  level: 1,
  difficulty: 'hard',
  playerName: 'Sergey'
});

// В GameScene
init(data) {
  this.level = data.level;
  this.difficulty = data.difficulty;
}

create(data) {
  this.add.text(0, 0, `Level ${data.level}`);
}
```

### Способ 2. Через events (для параллельных сцен)

```js
// В UIScene
const gameScene = this.scene.get('GameScene');
gameScene.events.on('scoreChanged', (score) => {
  this.scoreText.setText(`Score: ${score}`);
});

// В GameScene
this.events.emit('scoreChanged', 250);
```

### Способ 3. Через registry (глобальное хранилище)

```js
// Установить
this.registry.set('playerName', 'Sergey');
this.registry.set('coins', 100);

// Получить из любой сцены
const name = this.registry.get('playerName');

// Слушать изменения
this.registry.events.on('changedata-coins', (parent, value, prev) => {
  console.log(`Coins: ${prev} → ${value}`);
});
```

## Паттерн: BootScene → PreloadScene → GameScene

Это **стандартный паттерн** для любой Phaser-игры.

### `BootScene` — минимальная инициализация

Загружает только то, что нужно для красивого экрана загрузки (логотип, прогресс-бар).

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

### `PreloadScene` — загрузка всех ассетов

Показывает прогресс, грузит всё необходимое для игры.

```js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Логотип уже загружен в BootScene — показываем
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2 - 50, 'logo');

    // Прогресс-бар
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 50, 320, 30);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 60, 300 * value, 10);
    });

    // Загружаем основные ассеты
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

### `GameScene` — основной геймплей

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.image(640, 360, 'background');
    // запускаем UI параллельно
    this.scene.launch('UIScene');
  }
}
```

## Параллельные сцены (UI поверх игры)

Часто UI делают в отдельной сцене:

```js
// В GameScene
create() {
  // создаём игровой мир
  this.scene.launch('UIScene');  // UI запускается параллельно
}
```

Преимущества:
- UI не двигается с камерой игры
- Можно паузить геймплей, оставив UI активным
- Чистое разделение ответственности

## Жизненный цикл при переключениях

| Действие | Что происходит |
|---|---|
| `start(B)` из A | A.shutdown() → B.init() → B.preload() → B.create() |
| `launch(B)` из A | A продолжает работать, параллельно B.init() → preload() → create() |
| `pause(A)` | A.pause() — update перестаёт вызываться, объекты остаются |
| `sleep(A)` | A.sleep() — невидима + update остановлен, но объекты живут |
| `stop(A)` | A.shutdown() — все объекты уничтожаются |

## Важные ловушки

### 1. Объекты не уничтожаются при `pause`

Если ставишь сцену на паузу, её объекты живут. При `stop` — уничтожаются. Это влияет на память.

### 2. Слушатели событий

При `shutdown` сцены слушатели на сторонних объектах (`this.input.on`, `this.events.on`) **очищаются автоматически**. Но слушатели на DOM или глобальные — нет, их надо снимать вручную.

```js
shutdown() {
  window.removeEventListener('resize', this.onResize);
}
```

### 3. `update` после `stop`

После `scene.stop(key)` метод `update` больше не вызывается. Не пытайся ставить там логику, которая должна выполниться "на закрытии" — используй `shutdown`.

### 4. Уникальность ключей

Каждая сцена должна иметь **уникальный** `key`. Иначе менеджер сцен запутается.

## Полезные паттерны для слотов

### Паттерн 1. Game + UI

```
GameScene  — барабаны, символы, фон
UIScene    — кнопка спина, баланс, бет, история
```

UI получает события от GameScene:
```js
// UIScene
const game = this.scene.get('GameScene');
game.events.on('spin-complete', this.onSpinComplete, this);
game.events.on('win', this.showWin, this);
```

### Паттерн 2. Bonus Game

Когда срабатывает бонус, запускается отдельная сцена:

```js
// В GameScene
if (bonusTriggered) {
  this.scene.sleep();          // приостановить основную игру
  this.scene.launch('BonusScene', { spins: 10 });
}

// В BonusScene при завершении
this.scene.stop();
this.scene.wake('GameScene');
```

---

## ✅ Упражнение 3

В проекте из Главы 1:

1. Создай 3 сцены: `MenuScene`, `GameScene`, `GameOverScene`.
2. В `MenuScene` сделай текст "Click to start" — по клику переходит в `GameScene` с данными `{ level: 1 }`.
3. В `GameScene` выведи переданный уровень. По нажатию пробела переходи в `GameOverScene` с `{ score: 100 }`.
4. В `GameOverScene` покажи скор и текст "Press R to restart" — по R возвращайся в `MenuScene`.
5. **Бонус:** запусти `UIScene` параллельно с `GameScene`, в ней покажи счётчик "Time: 0", который увеличивается каждую секунду (через `this.time.addEvent`).

Когда работает — переходи к [Главе 4. Загрузка ассетов](./04-assets.md).


---


# Глава 4. Загрузка ассетов (Loader)

Без ассетов игра — это пустой канвас. В Phaser за загрузку отвечает **Loader** — `this.load`, доступный в каждой сцене.

## Где хранить ассеты

В Vite-проекте папка `public/` копируется в корень при сборке как есть. Поэтому:

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

В коде путь будет `'assets/sprites/background.webp'` (без `public/`).

## Когда загружать

В методе `preload()` сцены:

```js
preload() {
  this.load.image('logo', 'assets/sprites/logo.png');
  this.load.audio('theme', 'assets/sounds/theme.mp3');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
}

create() {
  // здесь все ассеты уже доступны
  this.add.image(400, 300, 'logo');
}
```

Phaser **автоматически** запустит загрузку перед `create()` и подождёт.

## Типы ассетов

### 1. Изображение

```js
this.load.image('key', 'assets/sprites/file.png');
```

Использование:
```js
this.add.image(x, y, 'key');
this.add.sprite(x, y, 'key');
```

Поддержка форматов: PNG, JPG, WEBP, GIF (статичный), SVG.

**Совет:** используй WEBP — он в 2-3 раза легче PNG при том же качестве.

### 2. Спрайтшит (sprite sheet)

Один файл с равномерной сеткой кадров.

```js
this.load.spritesheet('player', 'assets/sprites/player.png', {
  frameWidth: 64,
  frameHeight: 64,
  startFrame: 0,
  endFrame: 15
});
```

Использование:
```js
this.add.sprite(x, y, 'player', 0);  // первый кадр
this.add.sprite(x, y, 'player', 5);  // шестой кадр
```

### 3. Texture Atlas (атлас) — **самый важный для слотов**

Атлас — это один большой PNG со множеством разноразмерных спрайтов + JSON с координатами. Создаётся в [TexturePacker](https://www.codeandweb.com/texturepacker) или [free-tex-packer](http://free-tex-packer.com/).

```js
this.load.atlas(
  'symbols',
  'assets/sprites/symbols.png',
  'assets/sprites/symbols.json'
);
```

JSON выглядит примерно так (формат TexturePacker JSON Hash):

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

Использование:
```js
this.add.image(x, y, 'symbols', 'ace.png');
this.add.image(x, y, 'symbols', 'king.png');
```

**Зачем нужен атлас:**
- Меньше HTTP-запросов
- Лучше использует GPU (один draw call вместо десятков)
- Меньше пустоты в текстурах
- **Обязателен** для оптимизации слотов

### 4. Аудио

```js
this.load.audio('spin', 'assets/sounds/spin.mp3');

// Несколько форматов для совместимости (Phaser выберет первый поддерживаемый)
this.load.audio('theme', [
  'assets/sounds/theme.ogg',
  'assets/sounds/theme.mp3'
]);
```

Использование:
```js
this.sound.play('spin');
const music = this.sound.add('theme', { loop: true, volume: 0.5 });
music.play();
```

### 5. Аудио-спрайт

Один файл с несколькими звуками + JSON с таймкодами. Удобно для коротких SFX.

```js
this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
  'assets/sounds/sfx.mp3',
  'assets/sounds/sfx.ogg'
]);

// Воспроизведение
this.sound.playAudioSprite('sfx', 'click');
this.sound.playAudioSprite('sfx', 'win');
```

JSON формат:
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

// Использование
const cfg = this.cache.json.get('config');
console.log(cfg.startBalance);
```

### 7. Bitmap Font

Готовый шрифт в виде атласа. Очень быстрый для динамических текстов (счётчики, балансы).

```js
this.load.bitmapFont(
  'gameFont',
  'assets/fonts/font.png',
  'assets/fonts/font.xml'
);

// Использование
this.add.bitmapText(x, y, 'gameFont', 'Score: 100', 32);
```

Шрифты создаются в [BMFont](https://www.angelcode.com/products/bmfont/) или [Hiero](https://libgdx.com/wiki/tools/hiero).

### 8. Web Font (TTF/WOFF)

Web-шрифт грузится **вне** Phaser-loader. Стандартный путь — через CSS:

```css
/* В index.html или CSS-файле */
@font-face {
  font-family: 'CurseCasual';
  src: url('assets/fonts/CurseCasual.ttf') format('truetype');
}
```

Затем используешь:
```js
this.add.text(x, y, 'Hello', { fontFamily: 'CurseCasual', fontSize: '32px' });
```

⚠️ **Подвох:** если попытаешься использовать шрифт раньше, чем браузер его загрузит — увидишь дефолтный. Лечится плагином [WebFont Loader](https://github.com/typekit/webfontloader) или промисом `document.fonts.ready`.

### 9. Spine (скелетная анимация)

Для слот-индустрии — критично. Через плагин:

```js
this.load.setPath('assets/spine/');
this.load.spine('hero', 'hero.json', ['hero.atlas']);

// Использование
const hero = this.add.spine(400, 300, 'hero', 'idle', true);
```

### 10. HTML / Video / Plugin

```js
this.load.html('form', 'assets/html/form.html');
this.load.video('intro', 'assets/video/intro.mp4');
this.load.plugin('rexUI', 'plugins/rex-ui.js', true);
```

## События загрузки

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

  // Сами загрузки
  this.load.image('bg', 'assets/bg.webp');
  // ...
}
```

## Прогресс-бар (полный пример)

```js
preload() {
  const { width, height } = this.scale;

  // Фон бара
  const box = this.add.rectangle(width/2, height/2, 320, 30, 0x222222);
  box.setStrokeStyle(2, 0xffffff);

  // Сам бар
  const bar = this.add.rectangle(width/2 - 150, height/2, 0, 16, 0xffffff)
    .setOrigin(0, 0.5);

  // Процент
  const percentText = this.add.text(width/2, height/2 + 40, '0%', {
    fontSize: '20px', color: '#fff'
  }).setOrigin(0.5);

  this.load.on('progress', (value) => {
    bar.width = 300 * value;
    percentText.setText(`${(value * 100).toFixed(0)}%`);
  });

  // Загружаем всё что нужно
  this.load.image('bg', 'assets/sprites/background.webp');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
  this.load.audio('spin', 'assets/sounds/spin.mp3');
  // и т.д.
}

create() {
  this.scene.start('GameScene');
}
```

## Динамическая загрузка (после `create`)

Иногда нужно догрузить ассеты **позже** (например, при переходе в бонус-игру):

```js
create() {
  // Догружаем ассеты бонуса
  this.load.image('bonusBg', 'assets/sprites/bonus-bg.webp');
  this.load.atlas('bonusSymbols', 'assets/atlases/bonus.png', 'assets/atlases/bonus.json');

  // Запускаем загрузку
  this.load.once('complete', () => {
    this.startBonusGame();
  });
  this.load.start();   // обязательно — иначе ничего не загрузится
}
```

## Cache — где хранятся загруженные ассеты

```js
this.cache.json.get('paytable');
this.cache.audio.get('spin');
this.textures.get('symbols');
this.textures.exists('logo');     // bool

// Удалить из кэша
this.textures.remove('logo');
this.cache.json.remove('paytable');
```

## Базовый путь (`setPath`)

Чтобы не повторять префиксы:

```js
this.load.setPath('assets/sprites/');
this.load.image('bg', 'background.webp');
this.load.image('card', 'card.webp');
this.load.image('symbol1', 'symbol1.webp');

this.load.setPath('assets/sounds/');
this.load.audio('spin', 'spin.mp3');
this.load.audio('win', 'win.mp3');
```

## Префикс ключей

```js
this.load.setPrefix('slot.');
this.load.image('bg', 'background.webp');  // ключ будет 'slot.bg'
this.load.setPrefix();  // сброс
```

## Манифест-файл (паттерн для больших игр)

Вместо разбрасывания `this.load.*` по сценам, держи список ассетов в одном файле:

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

## Нюансы и подводные камни

| Проблема | Решение |
|---|---|
| Ассет не находится | Проверь путь относительно `public/`, без `public/` в начале |
| CORS-ошибка | Запускай через `npm run dev`, не открывай HTML напрямую |
| Звук не играет на iOS | Нужен пользовательский tap для разблокировки WebAudio |
| Атлас не работает | Проверь, что JSON и PNG лежат рядом и формат совпадает (Hash или Array) |
| Шрифт показывается дефолтным | Жди `document.fonts.ready` перед использованием |

---

## ✅ Упражнение 4

Используя ассеты из этого репо (`assets/sprites/card1.webp` ... `card5.webp`):

1. В `PreloadScene` загрузи все 5 карт через цикл `for`.
2. Сделай прогресс-бар — фон + бар + процент.
3. Добавь искусственную задержку: после `complete` подожди 500мс через `this.time.delayedCall`, потом перейди в `GameScene`.
4. В `GameScene` выведи все 5 карт в ряд по центру.
5. **Бонус:** загрузи `assets/sounds/card.mp3`. По клику на карту проигрывай этот звук.

Готово — переходим к [Главе 5. Display Objects](./05-display-objects.md).


---


# Глава 5. Display Objects — что мы рисуем на сцене

Любой объект, который ты видишь на экране — это **Game Object** (он же Display Object). У всех у них общий API: `x`, `y`, `alpha`, `scale`, `rotation`, `visible`, `setOrigin`, `setDepth` и т.д.

В этой главе разберём основные типы.

## Базовый API всех Display Objects

```js
const obj = this.add.image(400, 300, 'card');

// Позиция
obj.x = 100;
obj.y = 200;
obj.setPosition(100, 200);

// Размер (масштаб)
obj.scale = 2;
obj.setScale(2);
obj.setScale(2, 1.5);          // x, y отдельно
obj.scaleX = 1.5;
obj.scaleY = 0.8;

// Поворот
obj.rotation = Math.PI / 4;    // в радианах
obj.angle = 45;                // в градусах (то же самое)
obj.setRotation(0.5);
obj.setAngle(45);

// Прозрачность
obj.alpha = 0.5;
obj.setAlpha(0.5);

// Видимость
obj.visible = false;
obj.setVisible(true);

// Глубина (z-order). Чем больше — тем выше в стопке
obj.setDepth(10);

// Origin — точка отсчёта (0..1)
obj.setOrigin(0.5);            // центр
obj.setOrigin(0, 0);           // верхний-левый угол
obj.setOrigin(1, 1);           // нижний-правый

// Tint — цветовой оттенок (умножение цвета)
obj.setTint(0xff0000);         // красный
obj.setTint(0xff0000, 0x00ff00, 0x0000ff, 0xffffff);  // 4 угла
obj.clearTint();

// Уничтожение
obj.destroy();
```

## 1. Image — статичная картинка

Самый простой объект — просто отображает текстуру.

```js
const bg = this.add.image(640, 360, 'background');
const logo = this.add.image(640, 200, 'logo');

// Из атласа — указываем frame
const card = this.add.image(400, 300, 'symbols', 'ace.png');
```

`Image` **не имеет** анимаций. Для них нужен `Sprite`.

## 2. Sprite — изображение с поддержкой анимаций

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');   // запустить анимацию (про анимации — глава 6)
```

Visually идентичен `Image`, но тяжелее. Используй `Sprite` только если **точно** будут анимации.

## 3. Text — обычный текст

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

// Изменение
score.setText('Score: 100');
score.setColor('#ffff00');
score.setFontSize(48);
score.setStyle({ fontFamily: 'Verdana', color: '#0f0' });

// Размеры
console.log(score.width, score.height);
```

**Минусы Text:**
- Каждое изменение текста создаёт новую текстуру в GPU. Дорого.
- Для динамических счётчиков (баланс, выигрыш) лучше использовать BitmapText.

## 4. BitmapText — быстрый текст

```js
const balance = this.add.bitmapText(20, 20, 'gameFont', 'Balance: 1000', 32);

balance.setText('Balance: 950');  // дёшево, не создаёт новую текстуру
balance.setTint(0x00ff00);
balance.setLetterSpacing(2);
```

**Плюсы:** обновление текста почти бесплатно.
**Минусы:** нужен заранее подготовленный bitmap font. Не все символы могут быть в шрифте (привет, эмодзи и кириллица — нужно генерить с поддержкой).

**Используй BitmapText для всего, что часто меняется:** баланс, выигрыш, счётчик секунд, таймеры.

## 5. Graphics — рисование примитивов

`Graphics` — это рисование линий, прямоугольников, кругов, сложных фигур через код.

```js
const g = this.add.graphics();

// Заливка
g.fillStyle(0xff0000, 1);              // цвет, alpha
g.fillRect(100, 100, 200, 100);
g.fillCircle(300, 200, 50);
g.fillTriangle(0, 0, 100, 0, 50, 100);
g.fillRoundedRect(0, 0, 200, 100, 16);  // скруглённый

// Обводка
g.lineStyle(4, 0x00ff00, 1);
g.strokeRect(100, 100, 200, 100);
g.strokeCircle(300, 200, 50);

// Линия
g.lineBetween(0, 0, 100, 100);

// Сложный путь
g.beginPath();
g.moveTo(100, 100);
g.lineTo(200, 100);
g.lineTo(200, 200);
g.closePath();
g.fillPath();

// Очистить
g.clear();
```

**Когда использовать Graphics:**
- Рамки, сетки, дебаг-визуализация
- Простой UI без ассетов
- Маски

**Минус:** медленнее спрайтов на больших сценах. Каждая отрисовка `Graphics` — отдельный draw call.

## 6. Shape Game Objects — упрощённые примитивы

Если нужен один прямоугольник или круг — есть готовые шорткаты:

```js
this.add.rectangle(x, y, width, height, color);
this.add.circle(x, y, radius, color);
this.add.ellipse(x, y, width, height, color);
this.add.triangle(x, y, x1, y1, x2, y2, x3, y3, color);
this.add.line(x, y, x1, y1, x2, y2, color);
this.add.polygon(x, y, points, color);
this.add.star(x, y, points, innerRadius, outerRadius, color);
this.add.arc(x, y, radius, startAngle, endAngle, false, color);

// Обводка
const r = this.add.rectangle(100, 100, 200, 100, 0xff0000);
r.setStrokeStyle(4, 0xffffff);
```

Они быстрее `Graphics` для одиночных фигур.

## 7. Container — группировка объектов

`Container` — это **контейнер для других Game Objects**. Координаты внутри контейнера локальные.

```js
const card = this.add.container(400, 300);

const bg = this.add.image(0, 0, 'cardBg');
const symbol = this.add.image(0, -20, 'symbols', 'ace.png');
const value = this.add.text(0, 50, '100', { fontSize: '24px', color: '#fff' });

card.add([bg, symbol, value]);

// Теперь двигаем всю карту целиком
card.x = 500;
card.setRotation(0.2);
card.setScale(1.5);
```

**Когда нужен Container:**
- Карта (фон + символ + цифра)
- Барабан слота (маска + столбец символов)
- UI-панель (фон + кнопки + текст)
- Любая "сложная штука", которую двигаешь как одно целое

**Особенности:**
- У контейнера нет своей текстуры — он невидим сам по себе
- `setOrigin` у контейнера не работает как обычно (он считается от 0,0)
- Маски работают на контейнере целиком

## 8. Group — коллекция для управления

`Group` — **не контейнер**. Это коллекция Game Objects для удобного управления (создание, переиспользование, итерация). Объекты в группе **не дочерние** — они на сцене, но в одном "пуле".

```js
const enemies = this.add.group();
enemies.create(100, 100, 'enemy');
enemies.create(200, 200, 'enemy');

// Применить ко всем
enemies.setVelocityX(100);
enemies.children.iterate((enemy) => {
  enemy.alpha = 0.5;
});

// Получить случайный
const random = enemies.getFirstAlive();
```

**Главное использование Group — object pooling** (см. главу 13).

## 9. RenderTexture — рендеринг в текстуру

Можно нарисовать что-то один раз в текстуру и использовать как обычное изображение. Дорогая операция при создании, дешёвая при отображении.

```js
const rt = this.add.renderTexture(0, 0, 800, 600);
rt.draw('background', 0, 0);
rt.draw('logo', 100, 100);
// rt теперь — обычное изображение, выводится одним draw call
```

Полезно для статичных композиций.

## 10. TileSprite — повторяющаяся текстура

Картинка, которая тайлится. Можно прокручивать.

```js
const sky = this.add.tileSprite(640, 360, 1280, 720, 'sky');
update() {
  sky.tilePositionX += 1;   // бесконечный скролл
}
```

Идеально для параллакс-фонов и слот-барабанов (символы можно сделать через TileSprite, хотя чаще делают через Container с маской).

## 11. NineSlice — растягиваемый прямоугольник

Картинка с фиксированными углами и растягиваемой серединой. Для UI-панелей произвольного размера.

```js
const panel = this.add.nineslice(400, 300, 'panel', null, 300, 200, 16, 16, 16, 16);
//                                                    ширина высота леваправая верх низ
```

## Маски — обрезка по форме

Маска ограничивает видимую область объекта. Очень важно для **барабанов слота**.

### Geometry Mask (через Graphics)

```js
const mask = this.add.graphics();
mask.fillRect(100, 100, 300, 400);    // прямоугольная область
const geomMask = mask.createGeometryMask();

const reel = this.add.container(0, 0);
// добавляем символы в reel
reel.setMask(geomMask);

// Скрываем сам Graphics
mask.setVisible(false);
```

### Bitmap Mask (через спрайт)

Альфа другого спрайта определяет видимость:

```js
const maskImage = this.make.image({ x: 0, y: 0, key: 'maskShape', add: false });
const bitmapMask = maskImage.createBitmapMask();
target.setMask(bitmapMask);
```

## Depth — управление z-order

```js
bg.setDepth(0);
gameplay.setDepth(10);
ui.setDepth(100);
modal.setDepth(1000);
```

Объект с большим `depth` рисуется поверх. Внутри одинакового depth — порядок добавления.

## Blend Modes

```js
const glow = this.add.image(400, 300, 'glow');
glow.setBlendMode(Phaser.BlendModes.ADD);     // светящийся эффект
glow.setBlendMode(Phaser.BlendModes.MULTIPLY); // затемнение
glow.setBlendMode(Phaser.BlendModes.SCREEN);
```

Полезно для эффектов выигрыша, бликов, теней.

## `add` vs `make`

```js
this.add.image(...);   // создаёт И добавляет на сцену
this.make.image(...);  // только создаёт, на сцену не добавляет
```

`make` нужен для масок и временных объектов.

---

## ✅ Упражнение 5

В `GameScene`:

1. Создай **Container**, который имитирует карту: фон-прямоугольник + текст со значением + изображение символа. Размести в центре.
2. По клику (`this.input.on('pointerdown', ...)`) поверни карту на 360° через `setRotation` (пока без tweens, просто меняй угол в `update`).
3. Создай 5 карт через цикл `for`, разнеси их в ряд.
4. Сделай **маску** — пусть карты видны только в прямоугольнике 800×200 в центре экрана. Если карту "пододвинуть" вверх — она исчезнет за маской.
5. **Бонус:** сделай BitmapText "Score: 0" в правом верхнем углу. По клику на карту увеличивай скор на 10.

Готово — [Глава 6. Анимации и Tweens](./06-animations-tweens.md).


---


# Глава 6. Анимации и Tweens

В Phaser есть **два разных типа анимаций**, и их часто путают:

1. **Animations** — покадровые (frame-based), для спрайтшитов: ходьба персонажа, эффекты.
2. **Tweens** — плавные изменения свойств (alpha, x, scale, rotation), универсальные.

Для слотов чаще нужны **Tweens** (движение барабанов, пульсация выигрыша, появление цифр).

## Часть 1. Tweens — плавные анимации

### Базовый синтаксис

```js
this.tweens.add({
  targets: gameObject,
  x: 800,
  y: 400,
  duration: 1000,        // мс
  ease: 'Power2'
});
```

### Полный набор параметров

```js
this.tweens.add({
  targets: [obj1, obj2],     // один или массив
  x: 800,                    // куда (абсолютное значение)
  y: '+=100',                // относительное (текущее + 100)
  alpha: { from: 0, to: 1 }, // с фиксированным стартом
  scale: 2,
  rotation: Math.PI,
  duration: 1000,            // длительность
  delay: 200,                // задержка перед стартом
  hold: 0,                   // пауза в конце перед началом yoyo/repeat
  repeat: 3,                 // 3 повторения (всего 4 проигрывания); -1 = бесконечно
  repeatDelay: 100,
  yoyo: true,                // вернуться к стартовому значению
  ease: 'Sine.easeInOut',
  onStart:    () => console.log('start'),
  onUpdate:   (tween, target) => console.log(target.x),
  onComplete: () => console.log('done'),
  onYoyo:     () => console.log('yoyo'),
  onRepeat:   () => console.log('repeat'),
  paused: false              // создать сразу на паузе
});
```

### Easing — сглаживание

Самые ходовые:

| Имя | Поведение |
|---|---|
| `Linear` | Без сглаживания |
| `Power0..Power4` | Полиномиальное |
| `Sine.easeIn/Out/InOut` | Синус-сглаживание |
| `Quad.easeIn/Out/InOut` | Квадратичное |
| `Cubic.easeIn/Out/InOut` | Кубическое |
| `Back.easeIn/Out` | Перелёт через цель и возврат |
| `Bounce.easeOut` | Отскок (как мячик) |
| `Elastic.easeOut` | Резинка |
| `Expo.easeIn/Out` | Экспонента — резкий старт/финиш |

**Правила:**
- `easeIn` — медленный старт, быстрый финиш
- `easeOut` — быстрый старт, медленный финиш (плавная остановка)
- `easeInOut` — медленный старт И финиш

Для слотов:
- Запуск барабана: `Cubic.easeIn` (постепенный разгон)
- Остановка барабана: `Back.easeOut` (с лёгким перелётом)
- Появление символа: `Back.easeOut` или `Elastic.easeOut`
- Пульсация выигрыша: `Sine.easeInOut` + `yoyo: true` + `repeat: -1`

### Управление tween-объектом

```js
const tween = this.tweens.add({ ... });

tween.pause();
tween.resume();
tween.stop();
tween.restart();
tween.complete();      // мгновенно завершить
tween.seek(0.5);       // переместиться на 50%

tween.isPlaying();
tween.isPaused();

tween.setTimeScale(2); // в 2 раза быстрее
```

### Цепочки (chain) — последовательные tweens

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

### Timeline — параллельные + последовательные

> ⚠️ В Phaser 3.60+ старый Timeline удалили, используется новый API через `chain` + параллельные tweens. Для сложных сцен лучше использовать [GSAP](https://greensock.com/gsap/) — это де-факто стандарт в индустрии слотов.

```js
// Параллельно
this.tweens.add({ targets: card1, x: 100, duration: 500 });
this.tweens.add({ targets: card2, x: 200, duration: 500 });

// Последовательно — через onComplete или chain
```

### Tween на отдельных свойствах с разными ease

```js
this.tweens.add({
  targets: ball,
  props: {
    x: { value: 800, duration: 1000, ease: 'Linear' },
    y: { value: 400, duration: 1000, ease: 'Bounce.easeOut' }
  }
});
```

### Counter (анимация числа) — для счётчиков выигрыша

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

Это **must have** для слотов — счётчик выигрыша всегда так делается.

## Часть 2. Animations — покадровые анимации

Используются с **Sprite** (не с Image!) и спрайтшитами/атласами.

### Создание анимации

```js
// В create() сцены
this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
  frameRate: 10,        // кадров в секунду
  repeat: -1            // -1 = бесконечно, 0 = один раз
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

### Воспроизведение

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');
player.play('jump', true);  // true = игнорировать если такая же уже играет

player.anims.pause();
player.anims.resume();
player.anims.stop();
player.anims.stopAfterRepeat();

player.anims.timeScale = 2;  // в 2 раза быстрее

// Остановить и вернуться к первому кадру
player.anims.stop();
player.setFrame(0);
```

### События анимации

```js
player.on('animationstart', (anim) => console.log('start', anim.key));
player.on('animationupdate', (anim, frame) => console.log(frame.index));
player.on('animationcomplete', (anim) => console.log('done'));
player.on('animationrepeat', () => console.log('repeat'));

// Только для конкретной анимации
player.on('animationcomplete-jump', () => console.log('jump done'));
```

### Глобальные vs локальные анимации

```js
// Глобальные (доступны во всех сценах)
this.anims.create({ key: 'walk', ... });

// Локальные (только в этой сцене)
this.anims.create({ key: 'walk', ... });
// На самом деле все this.anims — это глобальный AnimationManager, ключи общие.
```

⚠️ Анимации **глобальны**. Если создашь `'walk'` в `GameScene`, она будет видна и в других сценах. Используй уникальные префиксы: `'player.walk'`, `'enemy.walk'`.

### Использование с атласом

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

// Когда символ выиграл
winningSymbol.play('symbol-flash');
```

## Сравнение: когда что использовать

| Задача | Что использовать |
|---|---|
| Двинуть символ из A в B | Tween |
| Покрутить барабан | Tween (на свойстве `tilePositionY` или `y` контейнера) |
| Анимация выигрыша символа (flash, prerendered кадры) | Animation |
| Появление win-текста | Tween (alpha + scale + Back.easeOut) |
| Счётчик выигрыша | Tween (`addCounter`) |
| Пульсация кнопки | Tween (yoyo + repeat: -1) |
| Тряска экрана | Camera shake (см. главу 9) |
| Сложная скелетная анимация (босс, персонаж) | Spine |

## Реальный пример: анимация выигрыша символа

```js
function animateWinningSymbol(symbol) {
  // 1. Подсветка через tint
  symbol.setTint(0xffff00);

  // 2. Пульсация (масштаб)
  this.tweens.add({
    targets: symbol,
    scale: { from: 1, to: 1.3 },
    duration: 400,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 3. Поворот туда-сюда
  this.tweens.add({
    targets: symbol,
    angle: { from: -5, to: 5 },
    duration: 200,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 4. Дополнительно — кадровая анимация поверх (если есть атлас "flash")
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

## Реальный пример: вращение барабана

```js
class Reel {
  spin() {
    // 1. Разгон
    this.tweens.add({
      targets: this.symbolsContainer,
      y: '+=200',
      duration: 300,
      ease: 'Cubic.easeIn'
    });

    // 2. Бесконечная прокрутка (через Phaser.Tweens с onUpdate)
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
    // Замедление с перелётом
    this.tweens.add({
      targets: this.symbolsContainer,
      y: this.targetY,
      duration: 800,
      ease: 'Back.easeOut'
    });
  }
}
```

## Полезные хелперы

```js
// Убить все tweens на объекте
this.tweens.killTweensOf(obj);

// Существует ли активный tween на объекте?
const exists = this.tweens.getTweensOf(obj).length > 0;

// Глобальная пауза всех tweens
this.tweens.pauseAll();
this.tweens.resumeAll();
```

---

## ✅ Упражнение 6

1. Создай 3 карты в ряд. По клику на карту:
   - Она "переворачивается" (tween `scaleX: 0 → 1` через 0.5с с `yoyo: false` + при `scaleX = 0` смени текстуру + продолжи `scaleX: 0 → 1`)
   - **Hint:** используй два последовательных tween через `onComplete` или `chain`.

2. Сделай **счётчик очков** через `tweens.addCounter`. По клику на каждую карту увеличивай счёт от текущего значения до `+100` за 800мс с `Cubic.easeOut`.

3. Сделай **пульсирующую кнопку** "PLAY" — текст в центре, бесконечный tween scale 1↔1.1 с yoyo.

4. **Бонус:** загрузи спрайтшит из любого открытого источника (или нарисуй сам в Paint, 4 кадра по 64×64), создай animation `'spin'`, проиграй на спрайте.

Готово — [Глава 7. Ввод (Input)](./07-input.md).


---


# Глава 7. Ввод (Input)

В Phaser ввод обрабатывается через **Input Plugin** — `this.input` в каждой сцене. Поддерживаются мышь, тач, клавиатура, геймпад. На мобильных тачи автоматически ведут себя как pointer events — писать отдельный код не нужно.

## Pointer events — основа

`Pointer` объединяет мышь и тач. Событие на сцене ловится так:

```js
// Любой клик/тач по сцене
this.input.on('pointerdown', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Перемещение
this.input.on('pointermove', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Отпускание
this.input.on('pointerup', (pointer) => { /* ... */ });
```

Объект `pointer` содержит:
- `pointer.x`, `pointer.y` — координаты на сцене (с учётом scale)
- `pointer.worldX`, `pointer.worldY` — в координатах мира (с учётом камеры)
- `pointer.isDown` — нажат ли сейчас
- `pointer.button` — какая кнопка мыши (0 = ЛКМ, 2 = ПКМ)
- `pointer.event` — оригинальный DOM event

## Интерактивные Game Objects

Чтобы конкретный объект мог реагировать на клики, делаем его интерактивным:

```js
const card = this.add.image(400, 300, 'card');
card.setInteractive();

card.on('pointerdown', () => console.log('Клик по карте'));
card.on('pointerup',   () => console.log('Отпустил'));
card.on('pointerover', () => card.setTint(0xff0000));    // hover-in
card.on('pointerout',  () => card.clearTint());          // hover-out
card.on('pointermove', (pointer) => console.log(pointer.x));
```

### Параметры setInteractive()

```js
card.setInteractive({
  cursor: 'pointer',         // CSS-курсор
  pixelPerfect: false,       // проверка по альфе пикселя (медленно)
  alphaTolerance: 1,         // порог альфы для pixelPerfect
  draggable: true,           // включить drag&drop
  useHandCursor: true,       // быстрый алиас для cursor: 'pointer'
  hitArea: hitArea,          // кастомная зона
  hitAreaCallback: callback
});
```

### Кастомная hit area (форма клика)

По умолчанию Phaser использует прямоугольник вокруг текстуры. Можно задать круг, полигон или произвольную фигуру:

```js
// Круглая зона клика
const hitArea = new Phaser.Geom.Circle(0, 0, 50);
card.setInteractive(hitArea, Phaser.Geom.Circle.Contains);

// Полигон
const points = [
  new Phaser.Geom.Point(0, 0),
  new Phaser.Geom.Point(100, 0),
  new Phaser.Geom.Point(50, 100)
];
const polygon = new Phaser.Geom.Polygon(points);
sprite.setInteractive(polygon, Phaser.Geom.Polygon.Contains);
```

### Pixel-perfect проверка (для "обтравочных" спрайтов)

```js
card.setInteractive({ pixelPerfect: true });
```

⚠️ Дорого, не используй массово. Для слотов почти не нужно.

## Кнопка из спрайта (паттерн)

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

// Использование
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

### Drop-зоны

Зона, в которую можно "бросить" объект:

```js
const zone = this.add.zone(640, 360, 200, 200).setRectangleDropZone(200, 200);

this.input.on('drop', (pointer, gameObject, dropZone) => {
  console.log('Сбросили в зону');
  gameObject.x = dropZone.x;
  gameObject.y = dropZone.y;
});

this.input.on('dragenter', (pointer, gameObject, dropZone) => {
  // Объект заехал на зону
});

this.input.on('dragleave', (pointer, gameObject, dropZone) => {
  // Уехал
});
```

## Клавиатура

### Базовое отслеживание

```js
// Создание клавиш
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

### Курсорные клавиши (готовый объект)

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

### События клавиш (одиночное нажатие)

```js
this.input.keyboard.on('keydown-SPACE', () => {
  this.startSpin();
});

this.input.keyboard.on('keyup-ESC', () => {
  this.openMenu();
});

// JustDown — сработает один раз за нажатие, даже если зажато
if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
  this.spin();
}
```

### Комбо-клавиши

```js
this.input.keyboard.createCombo('CHEAT', { resetOnMatch: true });
this.input.keyboard.on('keycombomatch', (combo) => {
  console.log('Cheat enabled!');
});
```

## Геймпад (опционально)

Включается в config:
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
  // Аналоговый стик
  this.player.x += pad.leftStick.x * 5;
}
```

## Глобальные настройки ввода

```js
// Топ-объект всегда первый при клике (по умолчанию false)
this.input.topOnly = true;

// Включить multi-touch (сколько пальцев одновременно)
this.input.addPointer(2);  // итого 3 поинтера (1 по умолчанию + 2)

// Отключить ввод во всей сцене
this.input.enabled = false;

// Отключить на одном объекте
card.disableInteractive();
card.setInteractive();    // снова включить
```

## Координаты: экран vs мир

```js
this.input.on('pointerdown', (pointer) => {
  // Координаты в системе сцены (с учётом scale)
  console.log(pointer.x, pointer.y);

  // Координаты в "мире" (с учётом скролла камеры)
  console.log(pointer.worldX, pointer.worldY);
});
```

Если у тебя статичная камера — `x` и `worldX` совпадают. Когда камера скроллит — отличаются.

## Полезные паттерны для слотов

### Кнопка SPIN с состояниями

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

### Защита от двойного клика

```js
let spinning = false;

spinBtn.on('pointerdown', () => {
  if (spinning) return;
  spinning = true;
  this.startSpin();
});

// При завершении
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

## Подводные камни

| Проблема | Решение |
|---|---|
| Клик по контейнеру не работает | Контейнер не интерактивный по умолчанию — установи `setInteractive(new Phaser.Geom.Rectangle(...), Phaser.Geom.Rectangle.Contains)` или сделай интерактивными его дочерние |
| Клики "проваливаются" сквозь UI | Установи `this.input.topOnly = true` или используй депт |
| Клик срабатывает несколько раз | `pointerdown` + `pointerup` могут "склеиваться" — лучше используй `pointerup` |
| Drag трясётся | На некоторых браузерах нужно `event.preventDefault()` — Phaser делает это сам, но проверь CSS `touch-action: none` |
| Клик не работает на iOS Safari | Проверь, что зона клика >= 44×44px (Apple guideline) |

---

## ✅ Упражнение 7

1. Создай 5 карт в ряд. На каждой карте:
   - При hover — `setTint(0xffff00)` + tween scale 1 → 1.1
   - При hover-out — clearTint + scale 1
   - При клике — карта улетает вверх и исчезает (tween y -= 200, alpha → 0)

2. Создай **drag&drop**: одна большая карта, которую можно таскать по экрану.

3. Создай **drop-зону** (прямоугольник 200×200 в правом нижнем углу). Когда карту бросишь в зону — карта остаётся на месте сброса И счётчик увеличивается на 1.

4. По нажатию **пробела** — все карты возвращаются на свои стартовые позиции (через tween).

5. **Бонус:** реализуй секретный код `S-L-O-T` через клавиатуру. При его наборе — выведи в консоль "Cheat activated".

[Глава 8. Звук](./08-sound.md)


---


# Глава 8. Звук

Звук в Phaser — через **Sound Manager** (`this.sound`). Под капотом два бэкенда:

- **WebAudio** — современный, рекомендуется. Поддерживает 3D, эффекты, точное время.
- **HTML5 Audio** — фолбэк для старых браузеров и слабых девайсов.

Phaser **сам выбирает** WebAudio, если он доступен.

## Загрузка звука

```js
preload() {
  // Простой файл
  this.load.audio('click', 'assets/sounds/click.mp3');

  // Несколько форматов (выбирается лучший поддерживаемый)
  this.load.audio('theme', [
    'assets/sounds/theme.ogg',
    'assets/sounds/theme.mp3',
    'assets/sounds/theme.m4a'
  ]);
}
```

### Какие форматы поддерживаются

| Формат | Поддержка |
|---|---|
| **MP3** | Все современные браузеры |
| **OGG** | Все, кроме старого Safari |
| **M4A/AAC** | Safari, Chrome |
| **WEBM** | Chrome, Firefox |
| **WAV** | Все, но огромный размер |

**Совет:** для коротких SFX (< 5 сек) используй **MP3 96 kbps**, для музыки — **OGG/MP3 128 kbps**.

## Воспроизведение (быстрый способ)

```js
// Просто проиграть
this.sound.play('click');

// С опциями
this.sound.play('click', {
  volume: 0.5,
  rate: 1.5,        // скорость
  detune: 100,      // расстройка в центах (-1200..1200)
  loop: false,
  delay: 0
});
```

Этот способ удобен для коротких звуков, но **не возвращает** объект — его нельзя остановить.

## Воспроизведение через инстанс (правильный способ)

```js
const music = this.sound.add('theme', { loop: true, volume: 0.3 });
music.play();

music.pause();
music.resume();
music.stop();

music.setVolume(0.5);
music.setRate(2);          // в 2 раза быстрее
music.setDetune(-300);
music.setLoop(true);

music.isPlaying;
music.isPaused;

music.destroy();
```

## События звука

```js
const sfx = this.sound.add('explosion');

sfx.on('play',     () => console.log('start'));
sfx.on('complete', () => console.log('done'));
sfx.on('stop',     () => console.log('stopped'));
sfx.on('looped',   () => console.log('loop iteration'));

sfx.play();
```

## Глобальные настройки

```js
// Громкость для всех звуков сразу
this.sound.volume = 0.5;
this.sound.setVolume(0.5);

// Mute
this.sound.mute = true;
this.sound.setMute(true);

// Пауза/возобновление всех звуков
this.sound.pauseAll();
this.sound.resumeAll();
this.sound.stopAll();

// Остановить конкретный по ключу
this.sound.stopByKey('theme');
```

## Audio Sprite — много звуков в одном файле

Идеально для коротких SFX в слотах (клик, спин, win, кнопки).

### Подготовка

Используй [audiosprite-tool](https://github.com/tonistiigi/audiosprite) или [ffmpeg](https://ffmpeg.org/). Получишь файл + JSON:

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

### Загрузка и использование

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

  // Через инстанс (с управлением)
  const winSound = this.sound.addAudioSprite('sfx');
  winSound.play('big-win');
}
```

**Преимущества:**
- Один HTTP-запрос
- Меньше задержки на старте
- На мобильных — обходит лимиты на количество одновременных Audio-объектов

## Громкость, fade, кросс-фейд

```js
// Плавное появление
const music = this.sound.add('theme', { volume: 0 });
music.play();
this.tweens.add({
  targets: music,
  volume: 0.5,
  duration: 2000
});

// Плавное исчезновение
this.tweens.add({
  targets: music,
  volume: 0,
  duration: 1500,
  onComplete: () => music.stop()
});

// Кроссфейд между двумя треками
function crossfade(scene, oldMusic, newKey, duration = 2000) {
  const newMusic = scene.sound.add(newKey, { loop: true, volume: 0 });
  newMusic.play();

  scene.tweens.add({ targets: oldMusic, volume: 0, duration, onComplete: () => oldMusic.stop() });
  scene.tweens.add({ targets: newMusic, volume: 0.5, duration });

  return newMusic;
}
```

## Один звук много раз одновременно

Если нужен звук-спам (стрельба, щелчки), используй `play()` с одного объекта — он автоматически порождает копии:

```js
const click = this.sound.add('click');
click.play();
click.play();   // вторая копия играет одновременно
click.play();   // и третья
```

Или, для гарантии, через short-form:

```js
this.sound.play('click');
this.sound.play('click');
```

## Автоплей и iOS — главная боль

iOS и современные браузеры **запрещают** воспроизведение звука без жеста пользователя. Если звук должен играть с самого начала — он начнёт играть только после первого клика/тапа.

### Решение: контекст разблокируется автоматически

Phaser сам разблокирует WebAudio при первом взаимодействии. Но **первый звук** до взаимодействия не воспроизведётся.

### Паттерн: "Tap to start"

```js
// Стартовый экран
const tapText = this.add.text(640, 360, 'Tap to start', { fontSize: '40px' }).setOrigin(0.5);
this.input.once('pointerdown', () => {
  // Здесь WebAudio уже разблокирован
  this.sound.play('theme');
  this.scene.start('GameScene');
});
```

### Проверка состояния

```js
if (this.sound.locked) {
  console.log('Аудио заблокировано до взаимодействия');
}

this.sound.once('unlocked', () => {
  console.log('Разблокировано');
  this.sound.play('theme');
});
```

## Звук в фоне (когда вкладка неактивна)

По умолчанию Phaser приостанавливает звук, когда вкладка неактивна. Управлять можно так:

```js
// В config:
audio: {
  disableWebAudio: false
},

// Или вручную в сцене:
this.sound.pauseOnBlur = false;  // продолжать играть в фоне
```

## Spatial / 3D звук (WebAudio)

Можно ставить звук в 3D-пространстве (для FPS, гонок). Для слотов почти не нужно, но знать полезно:

```js
const sfx = this.sound.add('engine');
sfx.play();
sfx.setPan(-1);   // -1 = левое ухо, 0 = центр, 1 = правое
```

## Звуковая архитектура для слот-игры

Типичный слот имеет:

```
🎵 Background music — заглушает себя при big-win
🔊 Reel spin loop — играет пока крутятся барабаны
🔊 Reel stop — на каждый стоп барабана
🔊 Symbol win — для каждого выигрышного символа (или один общий)
🔊 Counter ticks — пока цифры выигрыша считаются
🎉 Big win jingle — поверх музыки
🔘 Button clicks — при нажатии кнопок
```

Пример менеджера звука:

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

Использование:
```js
this.audio = new AudioManager(this);
this.audio.playMusic('theme');
this.audio.sfx('click');

// При большом выигрыше
this.audio.duckMusic();
this.audio.sfx('big-win');
this.time.delayedCall(3000, () => this.audio.unduckMusic());
```

## Подводные камни

| Проблема | Решение |
|---|---|
| Звук не играет на iOS | Нужно взаимодействие пользователя перед первым проигрыванием |
| Latency высокий | Используй WebAudio (по умолчанию). HTML5 — медленный |
| Слишком много одновременных звуков | Ограничь количество, используй pool |
| Музыка перезапускается при смене сцен | Создавай в `BootScene` и не уничтожай: `music.persist = true` или храни глобально |
| Звук обрезается при `play()` | Установи `'mp3'` с пустым началом или используй WebAudio |

---

## ✅ Упражнение 8

1. Загрузи `assets/sounds/theme.mp3` как фоновую музыку с `loop: true, volume: 0.3`. Запусти в `GameScene`.
2. Загрузи `assets/sounds/card.mp3`. По клику на любую карту — играй этот звук.
3. Сделай **кнопку Mute** в углу — переключает `this.sound.mute`. Меняй текстуру/иконку в зависимости от состояния.
4. При наведении на карту воспроизводи короткий звук с `rate: 1.5` (повыше тоном).
5. **Бонус:** реализуй "ducking" — когда играешь `complete.mp3` (выигрыш), фоновая музыка приглушается до 0.1, через 2 сек возвращается к 0.3. Использовать tween на свойстве `volume`.

[Глава 9. Камера](./09-camera.md)


---


# Глава 9. Камера

Камера в Phaser — это **окно в игровой мир**. Она определяет, какую часть мира видит игрок, и может скроллить, зумить, трястись, фейдить.

В каждой сцене есть **главная камера** — `this.cameras.main`. Можно создавать дополнительные.

## Базовое API

```js
const cam = this.cameras.main;

// Скролл (смещение мира)
cam.scrollX = 100;
cam.scrollY = 200;
cam.setScroll(100, 200);

// Центр — куда смотрит камера
cam.centerOn(800, 600);

// Зум
cam.zoom = 2;
cam.setZoom(2);

// Поворот всей сцены
cam.rotation = Math.PI / 4;
cam.setRotation(0.5);

// Угол в градусах
cam.setAngle(45);

// Цвет фона (бывает поверх config.backgroundColor)
cam.setBackgroundColor('#0f0f23');

// Размер вьюпорта (область, которую камера занимает на экране)
cam.setSize(800, 600);
cam.setPosition(0, 0);     // позиция вьюпорта на экране
cam.setViewport(0, 0, 800, 600);
```

## Bounds — границы мира

Ограничивает, куда камера может скроллить:

```js
this.cameras.main.setBounds(0, 0, 2000, 1500);
```

Камера не выйдет за этот прямоугольник.

## Follow — слежение за объектом

Классика для платформеров:

```js
this.cameras.main.startFollow(player);

// С параметрами
this.cameras.main.startFollow(player, true, 0.1, 0.1);
//                                     ^ сглаживание ^lerpX ^lerpY (0..1)

// С отступом
this.cameras.main.setFollowOffset(-100, 0);

// Прекратить
this.cameras.main.stopFollow();
```

**Lerp** (0..1) — насколько быстро камера догоняет объект. 1 = мгновенно (жёстко), 0.05 = очень плавно. Для слотов не используется.

## Эффекты камеры

### Shake — тряска

```js
this.cameras.main.shake(
  500,    // duration мс
  0.01,   // intensity (0..1)
  false,  // force — перезапустить если уже трясётся
  callback
);
```

Идеально для **ощущения большого выигрыша** в слоте.

### Flash — вспышка

```js
this.cameras.main.flash(500, 255, 255, 255);
//                  duration  R    G    B
```

Используется для эффекта вспышки при mega-win.

### Fade — затемнение

```js
this.cameras.main.fadeOut(1000, 0, 0, 0);  // в чёрный
this.cameras.main.fadeIn(1000, 0, 0, 0);   // из чёрного

// С коллбеком
this.cameras.main.fadeOut(500);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextScene');
});
```

### Zoom-эффекты с tween

Сам camera.zoom можно анимировать через tween:

```js
this.tweens.add({
  targets: this.cameras.main,
  zoom: 1.5,
  duration: 1000,
  yoyo: true,
  ease: 'Sine.easeInOut'
});
```

Полезно для зума на выигрышной линии в слоте.

### Pan — перемещение к точке

```js
this.cameras.main.pan(
  800, 400,    // куда (x, y в мире)
  2000,        // длительность
  'Power2',    // ease
  false,       // force
  callback
);
```

## Несколько камер

Можно создать несколько камер. Каждая видит свою область, может игнорировать какие-то объекты.

```js
// Дополнительная мини-карта в углу
const minimap = this.cameras.add(10, 10, 200, 150);
minimap.setZoom(0.2);
minimap.setBackgroundColor('#000');
minimap.setBounds(0, 0, 2000, 1500);
minimap.startFollow(player);

// UI-камера, не двигается со скроллом
const uiCam = this.cameras.add(0, 0, 1280, 720);
uiCam.setScroll(0, 0);

// Указать какая камера какие объекты видит
mainCamera.ignore(uiObjects);  // главная не видит UI
uiCam.ignore(worldObjects);    // UI-камера не видит мир
```

⚠️ **Важно:** UI-сцена (отдельной сценой) проще, чем играть с двумя камерами. Используй несколько камер только когда реально нужны несколько окон (мини-карта, разделённый экран).

## scrollFactor — параллакс

`scrollFactor` определяет, как сильно объект двигается со скроллом камеры. Позволяет делать параллакс (фон двигается медленнее переднего плана).

```js
const farBg = this.add.image(0, 0, 'far-bg').setScrollFactor(0.2);
const midBg = this.add.image(0, 0, 'mid-bg').setScrollFactor(0.5);
const player = this.add.sprite(0, 0, 'player');  // scrollFactor = 1 по умолчанию

// UI — не двигается
const score = this.add.text(0, 0, 'Score').setScrollFactor(0);
```

## Камера для слот-игры — реальные сценарии

### Сценарий 1. Shake при big-win

```js
function onBigWin() {
  this.cameras.main.shake(800, 0.005);
  this.cameras.main.flash(300, 255, 255, 200);
  this.audio.sfx('big-win');
}
```

### Сценарий 2. Fade-переход в бонус-игру

```js
function enterBonus() {
  this.cameras.main.fadeOut(800, 0, 0, 0);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start('BonusScene');
  });
}
```

### Сценарий 3. Zoom на выигрышной линии

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

### Сценарий 4. Mega-win — серия эффектов

```js
function megaWinSequence() {
  const cam = this.cameras.main;

  // 1. Зум-в
  this.tweens.add({ targets: cam, zoom: 1.2, duration: 500, yoyo: true });

  // 2. Flash
  cam.flash(400, 255, 215, 0); // золотая вспышка

  // 3. Shake
  this.time.delayedCall(500, () => cam.shake(1500, 0.008));
}
```

## События камеры

```js
const cam = this.cameras.main;
cam.on('camerafadeincomplete', () => console.log('faded in'));
cam.on('camerafadeoutcomplete', () => console.log('faded out'));
cam.on('cameraflashcomplete', () => console.log('flash done'));
cam.on('camerashakecomplete', () => console.log('shake done'));
cam.on('camerapancomplete', () => console.log('pan done'));
cam.on('camerazoomcomplete', () => console.log('zoom done'));
```

## Координаты: мир vs экран

```js
// Перевести экранные координаты в мировые
const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

// pointer.worldX, pointer.worldY — то же самое
```

## RoundPixels — пиксельная резкость

При зуме могут возникать сабпиксельные артефакты. Если игра в пиксель-арте:

```js
this.cameras.main.roundPixels = true;
```

Или в config:
```js
render: { roundPixels: true, pixelArt: true }
```

## Подводные камни

| Проблема | Решение |
|---|---|
| Объект не виден после `setBounds` | Объект за пределами bounds, проверь координаты |
| UI скроллится с камерой | `setScrollFactor(0)` на UI-объектах |
| Shake "застревает" | После `shake` всегда сбрасывается состояние, но если зовёшь повторно — передай `force=true` |
| Зум обрезает края | Камера зумит из центра вьюпорта, проверь `setBounds` |
| Камера дёргается при follow | Уменьши lerp до 0.05–0.1 для сглаживания |

---

## ✅ Упражнение 9

1. Загрузи `assets/sprites/background.webp` на весь экран. Размести по центру 5 карт.
2. По нажатию **пробела** — `cameras.main.shake(500, 0.01)`.
3. По нажатию **F** — `cameras.main.flash(300, 255, 255, 0)` (жёлтая вспышка).
4. По нажатию **Z** — анимируй `zoom` от 1 до 1.5 и обратно через tween (yoyo).
5. **Бонус:** при клике на карту:
   - Камера плавно панится к этой карте (через `pan`)
   - Зум до 1.3
   - Через 1 сек — возврат к 1 и центру

[Глава 10. Scale Manager](./10-scale-manager.md)


---


# Глава 10. Scale Manager — адаптивность

Игра должна работать на телефоне в портретной ориентации, на планшете в ландшафте, на десктопе в любом окне. Это задача **Scale Manager** — `this.scale`.

## Главная идея

В Phaser есть **два размера**:

- **Внутренний (Game Size)** — то, что ты задал в `config.width/height`. Это твоя система координат.
- **Внешний (Display Size)** — реальный размер канваса в DOM, в пикселях экрана.

Scale Manager масштабирует канвас, но координаты внутри игры **остаются** в Game Size.

```
Game Size: 1280×720 (твои координаты)
       ↓ Scale Manager
Display Size: 800×450 (на экране)
```

Объект, поставленный в `(640, 360)`, всегда оказывается **в центре игры**, независимо от размера экрана.

## Режимы масштабирования (`scale.mode`)

```js
const config = {
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 720
  }
};
```

| Mode | Что делает |
|---|---|
| `Phaser.Scale.NONE` | Никакого масштабирования. Канвас всегда в нативном размере |
| `Phaser.Scale.FIT` | Вписать в контейнер, сохраняя пропорции. Появляются "letterbox" полосы |
| `Phaser.Scale.ENVELOP` | Заполнить контейнер целиком, сохраняя пропорции. Часть игры обрезается |
| `Phaser.Scale.WIDTH_CONTROLS_HEIGHT` | Растягивать по ширине, высота автоматически |
| `Phaser.Scale.HEIGHT_CONTROLS_WIDTH` | Наоборот |
| `Phaser.Scale.RESIZE` | Канвас всегда = размер контейнера. Игре нужно адаптироваться к новому размеру |

### FIT — самый частый выбор

```js
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 1280,
  height: 720
}
```

- Если контейнер шире чем 16:9 — сверху/снизу полосы
- Если уже — слева/справа полосы
- Координаты не меняются, всё внутри одинаково

**Используй для слотов с фиксированным дизайном.**

### RESIZE — для адаптивного UI

```js
scale: {
  mode: Phaser.Scale.RESIZE,
  width: window.innerWidth,
  height: window.innerHeight
}
```

Канвас всегда = окну. Game Size меняется. Нужно вручную перепозиционировать объекты при resize.

## autoCenter — центрирование

```js
scale: {
  autoCenter: Phaser.Scale.CENTER_BOTH
}
```

| Значение | Что |
|---|---|
| `NO_CENTER` | По умолчанию (top-left) |
| `CENTER_BOTH` | По центру по обеим осям |
| `CENTER_HORIZONTALLY` | Только по горизонтали |
| `CENTER_VERTICALLY` | Только по вертикали |

## Минимальные / максимальные размеры

```js
scale: {
  mode: Phaser.Scale.FIT,
  width: 1280,
  height: 720,
  min: { width: 320, height: 480 },
  max: { width: 1920, height: 1080 }
}
```

## Получить текущий размер

```js
const w = this.scale.gameSize.width;     // внутренний
const h = this.scale.gameSize.height;
const dw = this.scale.displaySize.width; // на экране
const dh = this.scale.displaySize.height;

// Шорткат
const { width, height } = this.scale;
```

## Событие resize

```js
this.scale.on('resize', (gameSize, baseSize, displaySize) => {
  // gameSize — новый внутренний размер (актуально для Scale.RESIZE)
  this.background.setSize(gameSize.width, gameSize.height);
  this.repositionUI();
});

// Один раз — отписаться:
this.scale.off('resize', handler);
```

⚠️ Событие resize в режиме `FIT` срабатывает **только при изменении окна**, не каждый кадр.

## Полноэкранный режим

```js
// Войти
this.scale.startFullscreen();

// Выйти
this.scale.stopFullscreen();

// Тоггл
this.scale.toggleFullscreen();

// Проверить
if (this.scale.isFullscreen) { /* ... */ }
```

Браузер требует **жест пользователя** для входа в fullscreen — нельзя вызвать без клика.

## Ориентация (mobile)

```js
this.scale.on('orientationchange', (orientation) => {
  if (orientation === Phaser.Scale.PORTRAIT) {
    this.showRotateMessage();
  } else {
    this.hideRotateMessage();
  }
});
```

Можно принудительно лочить ориентацию (через manifest/Capacitor для PWA).

## Адаптивные паттерны

### Паттерн 1. Безопасные зоны

Игру делаем в "идеальном" виде 1280×720, но интерфейс размещаем с отступами от краёв — чтобы при letterbox он не оказался у самого края экрана.

```js
const SAFE_PADDING = 40;
spinBtn.setPosition(
  width - SAFE_PADDING - spinBtn.width / 2,
  height - SAFE_PADDING - spinBtn.height / 2
);
```

### Паттерн 2. Ландшафт + портрет в одной игре

Делаем 2 раскладки и переключаем при `orientationchange`:

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

### Паттерн 3. RESIZE-режим, всё на лету

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
    // другие объекты...
  }
}
```

⚠️ В режиме RESIZE придётся вручную позиционировать **всё**. Сложнее, но даёт полную свободу.

## Слот: какую раскладку выбирать

| Случай | Совет |
|---|---|
| Только desktop | `FIT` 1920×1080 |
| Только mobile portrait | `FIT` 720×1280 |
| Только mobile landscape | `FIT` 1280×720 |
| Universal (mobile + desktop) | `FIT` 1280×720 + safe area + adaptive UI на портрет |
| Custom layouts (как Pragmatic Play) | `RESIZE` + ручная раскладка |

## Полный пример Scale + UI

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

    // Барабаны в центре
    this.reels = this.add.container(width / 2, height / 2);

    // UI
    this.spinBtn = this.add.image(width - 100, height - 80, 'btn-spin')
      .setInteractive();

    this.balance = this.add.bitmapText(40, height - 60, 'gameFont', 'Balance: 1000');

    // Реакция на ресайз
    this.scale.on('resize', this.onResize, this);
  }

  onResize(gameSize) {
    // В режиме FIT — обычно не нужно ничего делать
    // В режиме RESIZE — перепозиционируем UI
  }
}
```

## Подводные камни

| Проблема | Решение |
|---|---|
| Игра в углу страницы | Установи `parent: 'game'` и стилизуй div |
| После fullscreen игра в углу | `autoCenter: Phaser.Scale.CENTER_BOTH` |
| Размытое изображение на retina | Phaser сам учитывает devicePixelRatio. Если артефакты — `roundPixels: true` |
| Полосы по краям | Это feature режима FIT. Используй RESIZE или фон-картинку шире, чем игра |
| Resize не срабатывает | Проверь, что `parent` действительно реагирует на изменения. Лучше использовать `'100%'` в CSS |
| iOS Safari URL bar смещает игру | Подпишись на `viewportresize`, либо используй `100dvh` в CSS вместо `100vh` |

---

## ✅ Упражнение 10

1. Запусти твой проект. Открой DevTools → Mobile mode → переключай размеры (iPhone, iPad, desktop). Посмотри как ведёт себя `FIT`.
2. Поменяй на `Scale.ENVELOP` — увидь разницу.
3. Поменяй на `Scale.RESIZE`. Слушай событие `resize` и логируй размеры. Сделай чтобы фон растягивался на всю площадь.
4. Добавь кнопку Fullscreen в углу. По клику — `this.scale.toggleFullscreen()`.
5. **Бонус:** сделай игру с 2 раскладками — landscape и portrait. По смене ориентации перерисуй UI.

[Глава 11. Particle System](./11-particles.md)


---


# Глава 11. Particle System — частицы и эффекты

Частицы — это много мелких спрайтов, которые движутся, меняют цвет, исчезают. Используются для:
- Огня, дыма, искр
- Конфетти при выигрыше в слоте
- Магических эффектов
- Снега, дождя
- Взрывов и ударов

В Phaser 3.60+ API частиц **полностью переписан**. Старый `createEmitter` устарел.

## Базовый пример

```js
// 1. Загрузить текстуру (любая маленькая картинка)
this.load.image('spark', 'assets/sprites/spark.png');

// 2. Создать эмиттер
const emitter = this.add.particles(400, 300, 'spark', {
  speed: 100,
  lifespan: 1000,
  scale: { start: 0.5, end: 0 },
  blendMode: 'ADD',
  frequency: 50
});
```

`this.add.particles(x, y, textureKey, config)` — готовый эмиттер на сцене.

## Конфигурация — все основные параметры

```js
this.add.particles(x, y, 'particle', {
  // === Время жизни ===
  lifespan: 1000,                    // мс одной частицы
  lifespan: { min: 500, max: 1500 },

  // === Скорость рождения ===
  frequency: 100,                    // мс между частицами; -1 = только при explode
  quantity: 1,                       // сколько частиц за раз

  // === Скорость движения ===
  speed: 100,                        // фиксированная
  speed: { min: 50, max: 150 },      // случайная
  speedX: { min: -50, max: 50 },     // отдельно по осям
  speedY: -200,

  // === Угол вылета ===
  angle: { min: 0, max: 360 },       // во все стороны
  angle: { min: -100, max: -80 },    // вверх с разбросом

  // === Гравитация ===
  gravityY: 200,
  gravityX: 0,

  // === Размер ===
  scale: 1,
  scale: { start: 1, end: 0 },                  // от 1 до 0
  scale: { start: 1, end: 0, ease: 'Power2' },
  scale: { min: 0.5, max: 1 },                  // случайный

  // === Прозрачность ===
  alpha: { start: 1, end: 0 },

  // === Цвет (tint) ===
  tint: 0xff0000,
  tint: [0xff0000, 0x00ff00, 0x0000ff],         // случайный из списка

  // === Поворот ===
  rotate: { start: 0, end: 360 },
  rotate: { min: 0, max: 360 },

  // === Blend mode ===
  blendMode: 'ADD',                  // 'NORMAL', 'ADD', 'MULTIPLY', 'SCREEN'

  // === Зона рождения ===
  emitZone: {
    type: 'edge',
    source: new Phaser.Geom.Rectangle(0, 0, 100, 100),
    quantity: 32
  },

  // === Зона смерти (частицы исчезают при пересечении) ===
  deathZone: {
    type: 'onLeave',
    source: new Phaser.Geom.Rectangle(-100, -100, 200, 200)
  },

  // === Frame (если используется атлас) ===
  frame: 'spark.png',
  frame: ['spark.png', 'star.png'],

  // === Старт сразу или нет ===
  emitting: true                      // false = эмиттер создан но молчит
});
```

## Управление эмиттером

```js
const emitter = this.add.particles(0, 0, 'spark', { ... });

// Запустить/остановить
emitter.start();
emitter.stop();
emitter.pause();
emitter.resume();

// Один взрыв N частиц (вместо постоянного потока)
emitter.explode(50);            // 50 частиц
emitter.explode(50, x, y);      // в указанной точке

// Перенести эмиттер
emitter.setPosition(x, y);

// Изменить параметр на лету
emitter.setSpeed(200);
emitter.setLifespan(500);
emitter.setScale(2);

// Уничтожить
emitter.destroy();
```

## Привязка к объекту (follow)

```js
const player = this.add.sprite(100, 100, 'player');

const emitter = this.add.particles(0, 0, 'spark', {
  follow: player,                // частицы вылетают из позиции player
  followOffset: { x: 0, y: -20 },
  ...
});
```

Идеально для следа за магическим символом, ракетой, бонус-объектом.

## Зоны рождения (emitZone)

### Edge — частицы рождаются по контуру

```js
emitZone: {
  type: 'edge',
  source: new Phaser.Geom.Circle(0, 0, 100),
  quantity: 64
}
```

Получаешь "кольцо" из частиц.

### Random — случайно внутри фигуры

```js
emitZone: {
  type: 'random',
  source: new Phaser.Geom.Rectangle(-50, -50, 100, 100)
}
```

## Реальные примеры

### Конфетти при выигрыше

```js
function showWinConfetti(scene, x, y) {
  scene.add.particles(x, y, 'particle', {
    speed: { min: 200, max: 400 },
    angle: { min: 240, max: 300 },         // вверх с разбросом
    scale: { start: 1, end: 0 },
    rotate: { start: 0, end: 360 },
    lifespan: 2000,
    gravityY: 300,
    quantity: 5,
    frequency: 50,
    duration: 1500,                        // эмиттер живёт 1.5с
    tint: [0xff0080, 0x00ff80, 0x80ff00, 0xffff00, 0x80ffff]
  });
}
```

### Огоньки/звёзды по бэкграунду

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

### Взрыв звёзд при mega-win

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

### Дым от двигателя

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

### След от выигрышной линии

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

## Производительность

Частицы — это **много объектов**. Если переборщить, FPS просядет даже на десктопе.

### Правила:

1. **Не больше 200-300 частиц одновременно** на средне-низких устройствах.
2. Используй **маленькие** текстуры (16×16, 32×32).
3. **`blendMode: 'ADD'`** красивый, но требует прозрачного фона у текстуры.
4. Один эмиттер с большим `quantity` лучше, чем 10 эмиттеров с малым.
5. **Не создавай эмиттеры в `update()`** — только в реакции на события.
6. Используй `duration` чтобы эмиттер сам остановился.
7. Для статичных частиц (звёзды на фоне) — лучше одна `RenderTexture`.

## Частицы в слот-индустрии

Pragmatic Play, NetEnt, Push Gaming активно используют частицы:
- Конфетти при big-win
- Кольца света вокруг wild-символа
- Искры при остановке барабана с бонус-символом
- "Дождь" из монет при супер-выигрыше
- Магические следы при срабатывании фриспинов

Большинство этих эффектов делается на **частицах + Spine**, иногда на префабах prerendered анимациях.

## Важно: один эмиттер — много частиц

Это **батч-рендеринг**. Все частицы одного эмиттера рисуются за один draw call (если текстура одна). Поэтому 100 частиц одного эмиттера != 100 отдельных Sprite-объектов в производительности — частицы намного дешевле.

---

## ✅ Упражнение 11

1. Загрузи маленькую картинку (32×32) — звезда, искра, точка.
2. По клику в любую точку — взрыв 30 частиц во все стороны (`explode`), цвет золотой.
3. Сделай постоянный поток частиц снизу экрана вверх (как восходящие пузырьки).
4. Сделай след за курсором мыши: эмиттер с `follow: pointer` и низким `frequency`.
5. **Бонус:** при клике — устройть "конфетти-салют": 5 эмиттеров в разных местах с разными цветами, каждый делает explode(50). Через секунду все исчезают.

[Глава 12. Физика](./12-physics.md)


---


# Глава 12. Физика

Phaser поддерживает **два физических движка**:

1. **Arcade Physics** — простой, быстрый, AABB (axis-aligned bounding boxes). Тысячи объектов на экране без проблем.
2. **Matter.js** — полноценная физика твёрдых тел: вращение, сложные формы, цепи, верёвки.

**Для слотов физика обычно не нужна.** Но знать основы полезно — пригодится для других проектов и можно сделать "падающие монеты" при выигрыше.

В этой главе подробно — Arcade. Matter — обзорно.

## Включение Arcade Physics

В config:

```js
const config = {
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },     // в пикселях/сек²
      debug: false             // отрисовка хитбоксов
    }
  }
};
```

## Создание физических объектов

```js
// Спрайт с физикой
const player = this.physics.add.sprite(100, 100, 'player');

// Image с физикой
const ball = this.physics.add.image(200, 200, 'ball');

// Существующий объект → добавить физику
const obj = this.add.image(0, 0, 'obj');
this.physics.add.existing(obj);

// Группа физических объектов
const enemies = this.physics.add.group();
const e = enemies.create(300, 100, 'enemy');
```

## API физического тела

После создания у объекта появляется свойство `body` — это его физическое тело:

```js
// Скорость
player.body.setVelocity(100, 200);
player.body.setVelocityX(150);
player.body.setVelocityY(-300);

// Гравитация (своя для этого объекта)
player.body.setGravityY(500);
player.body.allowGravity = false;

// Замедление (drag)
player.body.setDrag(100, 100);

// Отскок
player.body.setBounce(0.8, 0.8);   // 0..1, 1 = идеальный отскок

// Размер хитбокса
player.body.setSize(32, 64);
player.body.setOffset(0, 0);
player.body.setCircle(20);          // круглый хитбокс

// Иммобилизация (объект существует, но не двигается)
player.body.setImmovable(true);

// Границы мира — объект не может за них выйти
player.body.setCollideWorldBounds(true);
```

## Границы мира (world bounds)

```js
// По умолчанию = размер игры
this.physics.world.setBounds(0, 0, 1280, 720);

// Объект "отскакивает" от границ
player.setCollideWorldBounds(true);
player.setBounce(1);

// Только определённые стороны
this.physics.world.setBoundsCollision(true, true, true, false);
//                                    L     R     U     D
```

## Коллизии и пересечения

### `collide` — реальное столкновение (с импульсом)

```js
this.physics.add.collider(player, walls);

// С коллбеком
this.physics.add.collider(player, enemy, (p, e) => {
  console.log('Hit!');
  e.destroy();
});

// Группа vs группа
this.physics.add.collider(bullets, enemies, (bullet, enemy) => {
  bullet.destroy();
  enemy.destroy();
});
```

Объекты после collider **отталкиваются** друг от друга, останавливаются.

### `overlap` — пересечение (без физики)

```js
this.physics.add.overlap(player, coins, (player, coin) => {
  coin.destroy();
  this.score += 10;
});
```

`overlap` не останавливает объекты, просто детектирует пересечение. Использует для триггеров (собрать монетку, войти в зону).

### Отдельная проверка (без постоянного collider)

```js
update() {
  if (this.physics.overlap(player, enemy)) {
    // Сейчас пересекаются
  }
}
```

## Группы и физика

```js
// Группа динамическая (двигаются под физикой)
const fruits = this.physics.add.group({
  key: 'apple',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 },
  bounceY: 0.6,
  collideWorldBounds: true
});

// Группа статическая (не двигается, для платформ)
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').setScale(2).refreshBody();
```

Динамическая vs статическая:
- Динамическая — двигается, проверяется каждый кадр
- Статическая — никогда не двигается, проверяется как препятствие

## Полный пример: маленький платформер

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

    // Платформы
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    // Игрок
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Анимации
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

    // Звёзды
    this.stars = this.physics.add.group({
      key: 'star', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate((c) => c.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

    // Коллизии
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Управление
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

Это классический туториал Phaser — обязательно собери его руками.

## Проверка состояния тела

```js
player.body.touching.down       // касается чего-то снизу
player.body.touching.up
player.body.touching.left
player.body.touching.right

player.body.blocked.down        // упёрся в границу мира
player.body.blocked.up

player.body.velocity.x          // текущая скорость
player.body.velocity.y

player.body.onFloor()           // на земле
player.body.onWall()
```

## Дебаг

Включи `debug: true` в config:

```js
physics: {
  default: 'arcade',
  arcade: {
    gravity: { y: 300 },
    debug: true
  }
}
```

Увидишь хитбоксы и векторы скоростей. Незаменимо при отладке.

Включить/выключить на лету:
```js
this.physics.world.drawDebug = true;
this.physics.world.debugGraphic.clear();   // очистить
```

## Matter.js — кратко

Когда нужны вращение, реалистичная физика, цепи, шарниры — используй Matter.

```js
// config
physics: {
  default: 'matter',
  matter: {
    gravity: { y: 1 },
    debug: true
  }
}

// Создание
const ball = this.matter.add.image(400, 100, 'ball');
ball.setCircle();
ball.setBounce(0.9);
ball.setFriction(0.005);

// Constraints (соединения)
this.matter.add.constraint(ball1, ball2, 100);

// Композитные тела (например, машина)
const car = this.matter.add.fromVertices(x, y, 'car', vertices);
```

Matter тяжелее Arcade, но красивее.

## Можно ли использовать физику для слота

Прямо для барабанов — нет. Но **косвенно полезно**:

- "Падающие монеты" при выигрыше (Arcade — десятки спрайтов с гравитацией)
- Бонус-игры типа "Plinko" (Matter — шарик отскакивает от штырей)
- "Crash"-механики
- Драговые мини-игры с физикой

## Подводные камни

| Проблема | Решение |
|---|---|
| Объект застревает в стене | Уменьши скорость или используй `body.checkCollision` |
| Скорость зависит от FPS | Phaser использует deltaTime — физика fps-independent |
| Хитбокс не совпадает с спрайтом | `body.setSize()` + `body.setOffset()` |
| Объект "проваливается" вниз | Включи `setCollideWorldBounds` или поставь пол |
| Много коллизий тормозят | Используй группы + spatial partitioning встроен в Arcade |
| Tunneling (быстрые объекты пролетают сквозь) | Включи `physics.arcade.useTree = true` или ставь `ccd` для Matter |

---

## ✅ Упражнение 12

1. Сделай "коробку" — статичные платформы по краям экрана и пол.
2. По клику в любой точке — создавай шарик (Image с физикой), gravity вниз, bounce 0.8.
3. Шарики падают и отскакивают от пола и стен.
4. Сделай 5 таких шариков одновременно (group). Между собой они тоже должны коллайдиться.
5. **Бонус:** добавь падение "монет" при нажатии пробела — 50 монет с разной скоростью, гравитацией. Это будет основа эффекта "выигрыш" для слота.

[Глава 13. Архитектура и оптимизация](./13-architecture.md)


---


# Глава 13. Архитектура и оптимизация

В предыдущих главах ты узнал **что** даёт Phaser. Эта глава — про то, **как** правильно построить большой проект, чтобы он не превратился в кашу через месяц.

## Структура проекта (для слота)

```
src/
├── main.js                  # точка входа
├── config.js                # конфиг игры
├── core/
│   ├── EventBus.js          # глобальные события
│   ├── StateMachine.js      # стейт-машина
│   ├── AssetManifest.js     # список ассетов
│   ├── AudioManager.js      # обёртка над звуком
│   └── Logger.js            # логгер
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── GameScene.js
│   └── UIScene.js
├── slot/
│   ├── ReelManager.js       # все барабаны
│   ├── Reel.js              # один барабан
│   ├── Symbol.js            # символ
│   ├── PaytableData.js      # таблица выплат
│   ├── WinEvaluator.js      # оценка выигрышей
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

## Принципы

### 1. **Сцены — это контроллеры**, не God-классы

Сцена координирует: запускает действия, передаёт данные. Логику выноси в отдельные классы.

❌ **Плохо:**
```js
class GameScene extends Phaser.Scene {
  create() {
    // 500 строк создания всего: барабаны, UI, звуки, обработчики...
  }

  update() {
    // ещё 200 строк всего этого
  }
}
```

✅ **Хорошо:**
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

### 2. Game Objects делай через **наследование**

Когда у тебя сложный объект (барабан, символ, кнопка) — создавай отдельный класс.

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

Использование:
```js
const symbol = new Symbol(this, 100, 100, 'ace.png');
symbol.playWinAnimation();
```

### 3. Используй **EventBus** для связи между модулями

Модули **не должны** знать друг про друга напрямую — они общаются через события.

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

⚠️ Не забывай отписываться при `shutdown` сцены.

### 4. **State Machine** для игры

Слот — это конечный автомат с состояниями: `idle → spinning → stopping → win → idle`. Любая логика проще, когда состояние явное.

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

Использование:
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

// Переход
this.fsm.transition('spinning');
```

### 5. **Сервер-driven логика** (важно для слотов)

Реальный слот **никогда** не считает выигрыши на клиенте. Клиент:
1. Запрашивает спин → отправляет на сервер
2. Получает результат (символы, выигрыши)
3. Просто **показывает** анимацию

```js
// slot/ServerMock.js — для разработки
export class ServerMock {
  static async spin(bet) {
    // Симулируем сетевую задержку
    await new Promise(r => setTimeout(r, 200));

    // Случайные символы
    const symbols = generateRandomSymbols();
    const wins = evaluateOnServerSide(symbols, bet);

    return {
      reels: symbols,           // 5 столбцов по 3 символа
      wins,                     // [{ line: 1, symbols: [...], amount: 100 }]
      totalWin: wins.reduce((s, w) => s + w.amount, 0),
      newBalance: 950
    };
  }
}
```

Это упрощает миграцию на реальный сервер позже — нужно только заменить ServerMock.

## Object Pooling — переиспользование объектов

Создание/уничтожение GameObjects — дорого. Если у тебя летят 100 пуль или 50 частиц-конфетти — лучше использовать **пул**.

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

// Использование
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

В Phaser также есть встроенный `Group` с пулингом:

```js
const group = this.add.group({ defaultKey: 'coin', maxSize: 50 });
const coin = group.get(x, y);   // достаёт из пула или создаёт
coin.setActive(true).setVisible(true);
// потом
coin.setActive(false).setVisible(false);
```

## Profiling — как находить тормоза

### 1. Phaser Debug

В конфиге:
```js
fps: { target: 60 },
physics: { arcade: { debug: true } }
```

В сцене:
```js
this.add.text(10, 10, '', { color: '#0f0' }).setName('fps');

update() {
  this.children.getByName('fps').setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
}
```

### 2. Chrome DevTools Performance

- F12 → вкладка "Performance"
- Запиши 5 секунд игры
- Смотри Frame Chart — где красные блоки (медленные кадры)
- Главные подозреваемые: создание объектов в `update`, тяжёлые шейдеры, много draw calls

### 3. Spector.js (для WebGL)

Расширение Chrome. Показывает draw calls, текстуры, шейдеры. Если в кадре больше 100 draw calls — у тебя проблемы с батчингом.

## Оптимизации, которые реально работают

### 1. Используй **атласы**

Один draw call вместо десятков:
```
[card1.png] [card2.png] [card3.png] → 3 draw calls
[symbols.atlas] (всё в одной текстуре) → 1 draw call
```

### 2. **BitmapText** для динамики

Каждое `text.setText()` создаёт новую текстуру. Для счётчиков и таймеров — `BitmapText`.

### 3. **`setVisible(false)` вместо destroy**

Если объект скоро понадобится снова — не уничтожай. Делай невидимым.

### 4. **`update()` не везде**

Не пиши тяжёлую логику в `update()` всех сцен. Используй события и таймеры:

```js
this.time.addEvent({
  delay: 1000,
  callback: this.checkSomething,
  loop: true
});
```

### 5. **Не создавай объекты в `update()`**

❌ Плохо:
```js
update() {
  if (key.isDown) this.add.particles(...);  // создание каждый кадр!
}
```

✅ Хорошо:
```js
update() {
  if (Phaser.Input.Keyboard.JustDown(key)) {
    this.particles.explode(20);   // переиспользование
  }
}
```

### 6. **`setDepth` правильно**

Phaser сортирует объекты по depth. Слишком много изменений depth — нагрузка. Назначай группами:

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

### 7. Текстуры **степени двойки**

WebGL любит размеры 256×256, 512×512, 1024×1024, 2048×2048. На больших атласах — ощутимо быстрее.

### 8. Сжимай **аудио**

96 kbps MP3 для SFX, 128 kbps для музыки. Никакого WAV.

### 9. **Убирай лишние анимации**

Бесконечные tweens на невидимых объектах — лишняя нагрузка. Останавливай:

```js
hide() {
  this.tweens.killTweensOf(this);
  this.setVisible(false);
}
```

### 10. **Lazy-load**

Не грузи бонус-ассеты в `PreloadScene` — догружай при входе в бонус.

## Целевые метрики для слота

| Метрика | Цель |
|---|---|
| Размер билда | < 5 МБ (без Spine), < 15 МБ (со Spine) |
| Время загрузки на 4G | < 5 сек |
| FPS на iPhone 8 | стабильно 60 |
| FPS на бюджетном Android | стабильно 30+ |
| Draw calls на кадр | < 50 |
| Memory | < 200 МБ на iOS |

## Чеклист перед релизом

- [ ] Все ассеты в атласах
- [ ] BitmapText для счётчиков
- [ ] Object pool для частиц
- [ ] Звуки в audio sprite
- [ ] Прогресс-бар на загрузке
- [ ] Mute-кнопка
- [ ] Pause при потере фокуса
- [ ] Fullscreen-кнопка
- [ ] Адаптивность portrait/landscape
- [ ] Защита от двойного клика на SPIN
- [ ] Loading-screen на каждый сетевой запрос
- [ ] Обработка ошибок сети
- [ ] Минификация и tree-shaking (Vite делает сам)
- [ ] Тестирование на 3 девайсах: iOS, Android, Desktop

---

## ✅ Упражнение 13

1. Возьми проект из любой предыдущей главы. Раздели сцену на:
   - `EventBus.js` — глобальные события
   - `Card.js` — класс-наследник Container для карты
   - `GameScene.js` — только координация
2. Реализуй простую `StateMachine` с состояниями `idle`, `flipping`, `matching`.
3. Сделай Object Pool для звёзд-частиц (создай 50 заранее, переиспользуй).
4. Подключи FPS-метр в угол.
5. **Бонус:** замерь FPS до и после оптимизаций. Открой Performance в Chrome DevTools и сделай профайлинг.

[Глава 14. Прототип слота на Phaser](./14-slot-prototype.md)


---


# Глава 14. Прототип слота на Phaser

Финальная глава. Здесь мы соберём всё что прошли в работающий прототип слота: 5 барабанов × 3 символа, 5 линий, кнопка SPIN, баланс, выигрыши.

Это **учебный** прототип — без графики уровня production, но с правильной архитектурой.

## Что мы построим

```
┌──────────────────────────────────────┐
│         Background image             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  │ ♠ │ │ ♥ │ │ ♣ │ │ ♦ │ │ ★ │  ← символы
│  │ ♥ │ │ ★ │ │ ♣ │ │ ♥ │ │ ♠ │  ← 3 видимых ряда
│  │ ★ │ │ ♣ │ │ ♥ │ │ ★ │ │ ♦ │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
│  Balance: 1000   Bet: 10   Win: 0       │
│              [   SPIN   ]                │
└──────────────────────────────────────┘
```

## Структура проекта

```
src/
├── main.js
├── config.js
├── core/
│   ├── EventBus.js
│   └── StateMachine.js
├── slot/
│   ├── SlotConfig.js        # конфигурация слота
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

## Шаг 1. Конфигурация слота

```js
// src/slot/SlotConfig.js
export const SLOT_CONFIG = {
  reels: 5,
  rows: 3,
  symbolSize: 100,
  symbolSpacing: 10,

  // Доступные символы (ключи в атласе)
  symbols: ['ace', 'king', 'queen', 'jack', 'ten', 'star', 'heart'],

  // Веса для случайной выдачи (чем больше — тем чаще)
  weights: {
    ace:   3,
    king:  4,
    queen: 5,
    jack:  6,
    ten:   8,
    star:  1,    // редкий — wild
    heart: 2     // scatter
  },

  // Таблица выплат: символ → { 3:x, 4:x, 5:x } за такое количество подряд
  paytable: {
    ace:   { 3: 10,  4: 30,  5: 100 },
    king:  { 3: 8,   4: 20,  5: 75 },
    queen: { 3: 5,   4: 15,  5: 50 },
    jack:  { 3: 4,   4: 10,  5: 30 },
    ten:   { 3: 2,   4: 6,   5: 20 },
    star:  { 3: 50,  4: 200, 5: 1000 },
    heart: { 3: 5,   4: 25,  5: 100 }
  },

  // Линии выплат (5 простых горизонтальных)
  lines: [
    [0, 0, 0, 0, 0],   // верхний ряд
    [1, 1, 1, 1, 1],   // средний
    [2, 2, 2, 2, 2],   // нижний
    [0, 1, 2, 1, 0],   // V
    [2, 1, 0, 1, 2]    // ^
  ]
};
```

## Шаг 2. EventBus

```js
// src/core/EventBus.js
import Phaser from 'phaser';
export const EventBus = new Phaser.Events.EventEmitter();
```

## Шаг 3. Класс символа

```js
// src/slot/Symbol.js
import Phaser from 'phaser';

export default class Symbol extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key) {
    super(scene, x, y);
    this.symbolKey = key;

    // Здесь key — это имя картинки. Можно использовать атлас.
    // В прототипе используем простой Image.
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

## Шаг 4. Класс барабана

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
    // Создаём 3 видимых + 1 невидимый сверху для прокрутки
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
   * Прокрутить барабан и закончить указанными символами (3 видимых).
   * @param {string[]} finalSymbols — 3 символа сверху-вниз
   * @param {number} delayBeforeStop — мс до остановки (для каскада)
   */
  async spin(finalSymbols, delayBeforeStop) {
    return new Promise(resolve => {
      // 1. Разгон — символы быстро двигаются вниз
      const spinCycle = () => {
        return this.scene.tweens.add({
          targets: this.symbols,
          y: `+=${this.cellSize}`,
          duration: 80,
          ease: 'Linear',
          onComplete: () => {
            // Перенести символ снизу-наверх и сменить
            this.symbols.forEach(s => {
              if (s.y >= (SLOT_CONFIG.rows - 1) * this.cellSize) {
                s.y -= SLOT_CONFIG.rows * this.cellSize;
                s.setSymbol(this.randomSymbolKey());
              }
            });
          }
        });
      };

      // Запускаем циклы
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

      // Через delayBeforeStop ставим флаг — после очередного цикла барабан остановится
      this.scene.time.delayedCall(delayBeforeStop, () => {
        this.shouldStop = true;
      });
    });
  }

  finalLanding(finalSymbols, resolve) {
    // Поставить символы по местам и анимировать "посадку"
    finalSymbols.forEach((key, i) => {
      this.symbols[i + 1].setSymbol(key);   // [0] — невидимый сверху
      this.symbols[i + 1].y = i * this.cellSize;
    });
    // Сверху случайный
    this.symbols[0].setSymbol(this.randomSymbolKey());
    this.symbols[0].y = -this.cellSize;

    // Эффект "удар" внизу
    this.scene.tweens.add({
      targets: this.symbols.slice(1),
      y: '+=10',
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: resolve
    });
  }

  /** Получить 3 видимых символа */
  getVisibleSymbols() {
    return this.symbols.slice(1, SLOT_CONFIG.rows + 1).map(s => s.symbolKey);
  }

  /** Получить символ в конкретной позиции (0..rows-1) */
  getSymbolAt(row) {
    return this.symbols[row + 1];
  }
}
```

## Шаг 5. Менеджер барабанов

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

    // Маска — показываем только 3 ряда
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
   * @param {string[][]} finalGrid — массив 5 столбцов по 3 символа
   */
  async spin(finalGrid) {
    const promises = this.reels.map((reel, i) =>
      reel.spin(finalGrid[i], 800 + i * 200)   // каждый последующий стопится позже
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

## Шаг 6. Оценка выигрышей

```js
// src/slot/WinEvaluator.js
import { SLOT_CONFIG } from './SlotConfig.js';

export class WinEvaluator {
  /**
   * @param {string[][]} grid — 5 столбцов по 3 символа (grid[col][row])
   * @returns {{lines: Array, total: number}}
   */
  static evaluate(grid, bet) {
    const wins = [];

    SLOT_CONFIG.lines.forEach((linePattern, lineIndex) => {
      const lineSymbols = linePattern.map((row, col) => grid[col][row]);
      const first = lineSymbols[0];

      // Считаем сколько одинаковых подряд с начала
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

## Шаг 7. ServerMock — генератор результатов

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
    // Симуляция сетевой задержки
    await new Promise(r => setTimeout(r, 100));

    if (this.balance < bet) throw new Error('Not enough balance');
    this.balance -= bet;

    // Генерируем сетку
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

## Шаг 8. UI компоненты

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

## Шаг 9. GameScene — собираем всё

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

    // Барабаны по центру
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
      // 1. Запрос на сервер
      const response = await ServerMock.spin(this.bet);

      // 2. Анимация спина с финальной сеткой
      await this.reels.spin(response.grid);

      // 3. Обновление баланса
      this.balance.animateTo(response.balance);

      // 4. Показ выигрышей
      if (response.wins.total > 0) {
        this.winDisplay.show(response.wins.total);
        response.wins.lines.forEach(line => {
          this.reels.highlightWin(line.positions);
        });

        // Бахнем камерой если выигрыш большой
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

## Шаг 10. Запуск

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

## Что получится

- **5 барабанов** с прокруткой, каждый последующий останавливается с задержкой
- **5 линий выплат** (3 горизонтальных + 2 диагональных)
- **Подсветка выигрыша** — выигрышные символы пульсируют
- **Анимация баланса** — плавный счётчик
- **Анимация выигрыша** — "WIN: 100" с эффектом подсчёта
- **Camera shake + flash** при больших выигрышах
- **Защита от двойного клика**
- **Spacebar = SPIN**
- **ServerMock** — вся логика "на сервере", клиент только показывает

## Что улучшить дальше

Это основа. Чтобы получить **production-уровень**:

1. **Графика** — заменить rectangles на спрайты в атласе
2. **Звуки** — spin loop, reel stop, win SFX, jingles
3. **Bet selector** — кнопки + и - для смены ставки
4. **Auto-spin** — автоматический режим N спинов
5. **Paytable modal** — окно с правилами и таблицей
6. **Free Spins / Bonus** — отдельная сцена бонус-игры
7. **Animations с Spine** — символы wild с покачиванием
8. **Particles** — конфетти при big-win
9. **Анимация выигрышной линии** — нарисовать линии Graphics + анимировать
10. **Сетевой слой** — заменить ServerMock на реальное API

## Что мы прошли в курсе

✅ Установка и базовая настройка
✅ Game Config
✅ Сцены и переходы
✅ Загрузка ассетов
✅ Display objects (Image, Text, Container, Graphics)
✅ Tweens и animations
✅ Ввод (mouse, keyboard)
✅ Звук
✅ Камера
✅ Адаптивность
✅ Particles
✅ Физика
✅ Архитектура и оптимизация
✅ Прототип слота

## Куда двигаться дальше

1. **Доработай этот слот** — добавь графику, звуки, эффекты
2. **Изучи Spine** — без него production-слотов не бывает: [esotericsoftware.com/spine-runtimes](https://esotericsoftware.com/spine-runtimes)
3. **Изучи GSAP** — лучше встроенных tweens для сложных таймлайнов
4. **Переходи на Pixi.js** — теперь, когда понимаешь Phaser, Pixi покажется проще
5. **Сделай 2-3 разных слота** на Phaser — один с фриспинами, один с бонус-игрой, один с каскадными выигрышами
6. **Изучи production-стек** — Pixi + GSAP + Howler + Spine + WebPack/Vite

## Финальное упражнение

Возьми этот прототип и за неделю-две доведи до играбельного состояния:

1. ✅ Замени rectangles на нормальные карточные/тематические спрайты (можно бесплатные с [Kenney.nl](https://kenney.nl))
2. ✅ Добавь все звуки (spin, stop, win, big-win, click)
3. ✅ Сделай bet selector (3 уровня ставки)
4. ✅ Сделай авто-спин (3, 5, 10 спинов)
5. ✅ Добавь paytable-модалку
6. ✅ Сделай "огоньки" вокруг выигрышных символов через particles
7. ✅ Сделай отдельную UIScene
8. ✅ Деплой на GitHub Pages — и покажи всем

Когда всё это сделаешь — ты готов к индустрии. 🎰

---

**Удачи!** Если в процессе обучения возникнут вопросы — возвращайся к соответствующим главам, экспериментируй на [phaser.io/examples](https://phaser.io/examples) и не бойся читать [исходники Phaser](https://github.com/phaserjs/phaser) — они хорошо документированы.
