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
