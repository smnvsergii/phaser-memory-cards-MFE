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
