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
