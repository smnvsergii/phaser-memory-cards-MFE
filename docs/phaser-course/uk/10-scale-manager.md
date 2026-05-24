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
