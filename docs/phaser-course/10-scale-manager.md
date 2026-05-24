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
