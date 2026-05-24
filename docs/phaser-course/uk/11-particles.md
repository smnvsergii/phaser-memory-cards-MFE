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
