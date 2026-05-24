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
