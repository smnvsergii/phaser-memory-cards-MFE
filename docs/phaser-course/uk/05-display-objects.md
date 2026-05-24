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
