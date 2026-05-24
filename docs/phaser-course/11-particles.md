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
