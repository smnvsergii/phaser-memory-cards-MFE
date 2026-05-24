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
