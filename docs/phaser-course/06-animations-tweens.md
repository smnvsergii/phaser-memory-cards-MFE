# Глава 6. Анимации и Tweens

В Phaser есть **два разных типа анимаций**, и их часто путают:

1. **Animations** — покадровые (frame-based), для спрайтшитов: ходьба персонажа, эффекты.
2. **Tweens** — плавные изменения свойств (alpha, x, scale, rotation), универсальные.

Для слотов чаще нужны **Tweens** (движение барабанов, пульсация выигрыша, появление цифр).

## Часть 1. Tweens — плавные анимации

### Базовый синтаксис

```js
this.tweens.add({
  targets: gameObject,
  x: 800,
  y: 400,
  duration: 1000,        // мс
  ease: 'Power2'
});
```

### Полный набор параметров

```js
this.tweens.add({
  targets: [obj1, obj2],     // один или массив
  x: 800,                    // куда (абсолютное значение)
  y: '+=100',                // относительное (текущее + 100)
  alpha: { from: 0, to: 1 }, // с фиксированным стартом
  scale: 2,
  rotation: Math.PI,
  duration: 1000,            // длительность
  delay: 200,                // задержка перед стартом
  hold: 0,                   // пауза в конце перед началом yoyo/repeat
  repeat: 3,                 // 3 повторения (всего 4 проигрывания); -1 = бесконечно
  repeatDelay: 100,
  yoyo: true,                // вернуться к стартовому значению
  ease: 'Sine.easeInOut',
  onStart:    () => console.log('start'),
  onUpdate:   (tween, target) => console.log(target.x),
  onComplete: () => console.log('done'),
  onYoyo:     () => console.log('yoyo'),
  onRepeat:   () => console.log('repeat'),
  paused: false              // создать сразу на паузе
});
```

### Easing — сглаживание

Самые ходовые:

| Имя | Поведение |
|---|---|
| `Linear` | Без сглаживания |
| `Power0..Power4` | Полиномиальное |
| `Sine.easeIn/Out/InOut` | Синус-сглаживание |
| `Quad.easeIn/Out/InOut` | Квадратичное |
| `Cubic.easeIn/Out/InOut` | Кубическое |
| `Back.easeIn/Out` | Перелёт через цель и возврат |
| `Bounce.easeOut` | Отскок (как мячик) |
| `Elastic.easeOut` | Резинка |
| `Expo.easeIn/Out` | Экспонента — резкий старт/финиш |

**Правила:**
- `easeIn` — медленный старт, быстрый финиш
- `easeOut` — быстрый старт, медленный финиш (плавная остановка)
- `easeInOut` — медленный старт И финиш

Для слотов:
- Запуск барабана: `Cubic.easeIn` (постепенный разгон)
- Остановка барабана: `Back.easeOut` (с лёгким перелётом)
- Появление символа: `Back.easeOut` или `Elastic.easeOut`
- Пульсация выигрыша: `Sine.easeInOut` + `yoyo: true` + `repeat: -1`

### Управление tween-объектом

```js
const tween = this.tweens.add({ ... });

tween.pause();
tween.resume();
tween.stop();
tween.restart();
tween.complete();      // мгновенно завершить
tween.seek(0.5);       // переместиться на 50%

tween.isPlaying();
tween.isPaused();

tween.setTimeScale(2); // в 2 раза быстрее
```

### Цепочки (chain) — последовательные tweens

```js
this.tweens.chain({
  targets: card,
  tweens: [
    { y: 100, duration: 300, ease: 'Power2' },
    { rotation: Math.PI, duration: 500 },
    { scale: 2, duration: 200, yoyo: true }
  ]
});
```

### Timeline — параллельные + последовательные

> ⚠️ В Phaser 3.60+ старый Timeline удалили, используется новый API через `chain` + параллельные tweens. Для сложных сцен лучше использовать [GSAP](https://greensock.com/gsap/) — это де-факто стандарт в индустрии слотов.

```js
// Параллельно
this.tweens.add({ targets: card1, x: 100, duration: 500 });
this.tweens.add({ targets: card2, x: 200, duration: 500 });

// Последовательно — через onComplete или chain
```

### Tween на отдельных свойствах с разными ease

```js
this.tweens.add({
  targets: ball,
  props: {
    x: { value: 800, duration: 1000, ease: 'Linear' },
    y: { value: 400, duration: 1000, ease: 'Bounce.easeOut' }
  }
});
```

### Counter (анимация числа) — для счётчиков выигрыша

```js
let win = 0;
this.tweens.addCounter({
  from: 0,
  to: 1500,
  duration: 1500,
  ease: 'Cubic.easeOut',
  onUpdate: (tween) => {
    win = Math.floor(tween.getValue());
    this.winText.setText(`Win: ${win}`);
  }
});
```

Это **must have** для слотов — счётчик выигрыша всегда так делается.

## Часть 2. Animations — покадровые анимации

Используются с **Sprite** (не с Image!) и спрайтшитами/атласами.

### Создание анимации

```js
// В create() сцены
this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
  frameRate: 10,        // кадров в секунду
  repeat: -1            // -1 = бесконечно, 0 = один раз
});

this.anims.create({
  key: 'jump',
  frames: this.anims.generateFrameNames('player', {
    prefix: 'jump_',
    start: 1,
    end: 8,
    suffix: '.png',
    zeroPad: 2          // jump_01, jump_02, ...
  }),
  frameRate: 15,
  repeat: 0
});
```

### Воспроизведение

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');
player.play('jump', true);  // true = игнорировать если такая же уже играет

player.anims.pause();
player.anims.resume();
player.anims.stop();
player.anims.stopAfterRepeat();

player.anims.timeScale = 2;  // в 2 раза быстрее

// Остановить и вернуться к первому кадру
player.anims.stop();
player.setFrame(0);
```

### События анимации

```js
player.on('animationstart', (anim) => console.log('start', anim.key));
player.on('animationupdate', (anim, frame) => console.log(frame.index));
player.on('animationcomplete', (anim) => console.log('done'));
player.on('animationrepeat', () => console.log('repeat'));

// Только для конкретной анимации
player.on('animationcomplete-jump', () => console.log('jump done'));
```

### Глобальные vs локальные анимации

```js
// Глобальные (доступны во всех сценах)
this.anims.create({ key: 'walk', ... });

// Локальные (только в этой сцене)
this.anims.create({ key: 'walk', ... });
// На самом деле все this.anims — это глобальный AnimationManager, ключи общие.
```

⚠️ Анимации **глобальны**. Если создашь `'walk'` в `GameScene`, она будет видна и в других сценах. Используй уникальные префиксы: `'player.walk'`, `'enemy.walk'`.

### Использование с атласом

```js
this.anims.create({
  key: 'symbol-flash',
  frames: this.anims.generateFrameNames('symbols', {
    prefix: 'flash_',
    start: 1,
    end: 12,
    suffix: '.png'
  }),
  frameRate: 24,
  repeat: 0
});

// Когда символ выиграл
winningSymbol.play('symbol-flash');
```

## Сравнение: когда что использовать

| Задача | Что использовать |
|---|---|
| Двинуть символ из A в B | Tween |
| Покрутить барабан | Tween (на свойстве `tilePositionY` или `y` контейнера) |
| Анимация выигрыша символа (flash, prerendered кадры) | Animation |
| Появление win-текста | Tween (alpha + scale + Back.easeOut) |
| Счётчик выигрыша | Tween (`addCounter`) |
| Пульсация кнопки | Tween (yoyo + repeat: -1) |
| Тряска экрана | Camera shake (см. главу 9) |
| Сложная скелетная анимация (босс, персонаж) | Spine |

## Реальный пример: анимация выигрыша символа

```js
function animateWinningSymbol(symbol) {
  // 1. Подсветка через tint
  symbol.setTint(0xffff00);

  // 2. Пульсация (масштаб)
  this.tweens.add({
    targets: symbol,
    scale: { from: 1, to: 1.3 },
    duration: 400,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 3. Поворот туда-сюда
  this.tweens.add({
    targets: symbol,
    angle: { from: -5, to: 5 },
    duration: 200,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 4. Дополнительно — кадровая анимация поверх (если есть атлас "flash")
  // const flash = this.add.sprite(symbol.x, symbol.y, 'symbols', 'flash_01.png');
  // flash.play('symbol-flash');
}

function stopWinningAnimation(symbol) {
  this.tweens.killTweensOf(symbol);
  symbol.clearTint();
  symbol.setScale(1);
  symbol.setAngle(0);
}
```

## Реальный пример: вращение барабана

```js
class Reel {
  spin() {
    // 1. Разгон
    this.tweens.add({
      targets: this.symbolsContainer,
      y: '+=200',
      duration: 300,
      ease: 'Cubic.easeIn'
    });

    // 2. Бесконечная прокрутка (через Phaser.Tweens с onUpdate)
    this.spinTween = this.tweens.add({
      targets: this,
      _spinValue: 1,    // dummy
      duration: 100,
      repeat: -1,
      onRepeat: () => {
        this.symbolsContainer.y += this.spinSpeed;
        if (this.symbolsContainer.y > this.cycleHeight) {
          this.symbolsContainer.y -= this.cycleHeight;
          this.recycleSymbols();
        }
      }
    });
  }

  stop(finalSymbols) {
    this.spinTween.stop();
    // Замедление с перелётом
    this.tweens.add({
      targets: this.symbolsContainer,
      y: this.targetY,
      duration: 800,
      ease: 'Back.easeOut'
    });
  }
}
```

## Полезные хелперы

```js
// Убить все tweens на объекте
this.tweens.killTweensOf(obj);

// Существует ли активный tween на объекте?
const exists = this.tweens.getTweensOf(obj).length > 0;

// Глобальная пауза всех tweens
this.tweens.pauseAll();
this.tweens.resumeAll();
```

---

## ✅ Упражнение 6

1. Создай 3 карты в ряд. По клику на карту:
   - Она "переворачивается" (tween `scaleX: 0 → 1` через 0.5с с `yoyo: false` + при `scaleX = 0` смени текстуру + продолжи `scaleX: 0 → 1`)
   - **Hint:** используй два последовательных tween через `onComplete` или `chain`.

2. Сделай **счётчик очков** через `tweens.addCounter`. По клику на каждую карту увеличивай счёт от текущего значения до `+100` за 800мс с `Cubic.easeOut`.

3. Сделай **пульсирующую кнопку** "PLAY" — текст в центре, бесконечный tween scale 1↔1.1 с yoyo.

4. **Бонус:** загрузи спрайтшит из любого открытого источника (или нарисуй сам в Paint, 4 кадра по 64×64), создай animation `'spin'`, проиграй на спрайте.

Готово — [Глава 7. Ввод (Input)](./07-input.md).
