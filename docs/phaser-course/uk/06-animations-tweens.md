# Глава 6. Анімації та Tweens

У Phaser є **два різні типи анімацій**, і їх часто плутають:

1. **Animations** — покадрові (frame-based), для спрайтшитів: ходьба персонажа, ефекти.
2. **Tweens** — плавні зміни властивостей (alpha, x, scale, rotation), універсальні.

Для слотів частіше потрібні **Tweens** (рух барабанів, пульсація виграшу, поява цифр).

## Частина 1. Tweens — плавні анімації

### Базовий синтаксис

```js
this.tweens.add({
  targets: gameObject,
  x: 800,
  y: 400,
  duration: 1000,        // мс
  ease: 'Power2'
});
```

### Повний набір параметрів

```js
this.tweens.add({
  targets: [obj1, obj2],     // один або масив
  x: 800,                    // куди (абсолютне значення)
  y: '+=100',                // відносне (поточне + 100)
  alpha: { from: 0, to: 1 }, // з фіксованим стартом
  scale: 2,
  rotation: Math.PI,
  duration: 1000,            // тривалість
  delay: 200,                // затримка перед стартом
  hold: 0,                   // пауза в кінці перед початком yoyo/repeat
  repeat: 3,                 // 3 повторення (всього 4 програвання); -1 = нескінченно
  repeatDelay: 100,
  yoyo: true,                // повернутися до стартового значення
  ease: 'Sine.easeInOut',
  onStart:    () => console.log('start'),
  onUpdate:   (tween, target) => console.log(target.x),
  onComplete: () => console.log('done'),
  onYoyo:     () => console.log('yoyo'),
  onRepeat:   () => console.log('repeat'),
  paused: false              // створити одразу на паузі
});
```

### Easing — згладжування

Найпоширеніші:

| Ім'я | Поведінка |
|---|---|
| `Linear` | Без згладжування |
| `Power0..Power4` | Поліноміальне |
| `Sine.easeIn/Out/InOut` | Синус-згладжування |
| `Quad.easeIn/Out/InOut` | Квадратичне |
| `Cubic.easeIn/Out/InOut` | Кубічне |
| `Back.easeIn/Out` | Переліт через ціль і повернення |
| `Bounce.easeOut` | Відскок (як м'ячик) |
| `Elastic.easeOut` | Гумка |
| `Expo.easeIn/Out` | Експонента — різкий старт/фініш |

**Правила:**
- `easeIn` — повільний старт, швидкий фініш
- `easeOut` — швидкий старт, повільний фініш (плавна зупинка)
- `easeInOut` — повільний старт І фініш

Для слотів:
- Запуск барабана: `Cubic.easeIn` (поступовий розгін)
- Зупинка барабана: `Back.easeOut` (з легким перельотом)
- Поява символа: `Back.easeOut` або `Elastic.easeOut`
- Пульсація виграшу: `Sine.easeInOut` + `yoyo: true` + `repeat: -1`

### Керування tween-об'єктом

```js
const tween = this.tweens.add({ ... });

tween.pause();
tween.resume();
tween.stop();
tween.restart();
tween.complete();      // миттєво завершити
tween.seek(0.5);       // перемістити на 50%

tween.isPlaying();
tween.isPaused();

tween.setTimeScale(2); // у 2 рази швидше
```

### Ланцюги (chain) — послідовні tweens

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

### Timeline — паралельні + послідовні

> ⚠️ У Phaser 3.60+ старий Timeline видалили, використовується новий API через `chain` + паралельні tweens. Для складних сцен краще використовувати [GSAP](https://greensock.com/gsap/) — це де-факто стандарт в індустрії слотів.

```js
// Паралельно
this.tweens.add({ targets: card1, x: 100, duration: 500 });
this.tweens.add({ targets: card2, x: 200, duration: 500 });

// Послідовно — через onComplete або chain
```

### Tween на окремих властивостях із різними ease

```js
this.tweens.add({
  targets: ball,
  props: {
    x: { value: 800, duration: 1000, ease: 'Linear' },
    y: { value: 400, duration: 1000, ease: 'Bounce.easeOut' }
  }
});
```

### Counter (анімація числа) — для лічильників виграшу

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

Це **must have** для слотів — лічильник виграшу завжди так робиться.

## Частина 2. Animations — покадрові анімації

Використовуються зі **Sprite** (не з Image!) і спрайтшитами/атласами.

### Створення анімації

```js
// У create() сцени
this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
  frameRate: 10,        // кадрів на секунду
  repeat: -1            // -1 = нескінченно, 0 = один раз
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

### Відтворення

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');
player.play('jump', true);  // true = ігнорувати якщо така сама вже грає

player.anims.pause();
player.anims.resume();
player.anims.stop();
player.anims.stopAfterRepeat();

player.anims.timeScale = 2;  // у 2 рази швидше

// Зупинити і повернутися до першого кадру
player.anims.stop();
player.setFrame(0);
```

### Події анімації

```js
player.on('animationstart', (anim) => console.log('start', anim.key));
player.on('animationupdate', (anim, frame) => console.log(frame.index));
player.on('animationcomplete', (anim) => console.log('done'));
player.on('animationrepeat', () => console.log('repeat'));

// Тільки для конкретної анімації
player.on('animationcomplete-jump', () => console.log('jump done'));
```

### Глобальні vs локальні анімації

```js
// Глобальні (доступні в усіх сценах)
this.anims.create({ key: 'walk', ... });

// Локальні (тільки в цій сцені)
this.anims.create({ key: 'walk', ... });
// Насправді всі this.anims — це глобальний AnimationManager, ключі спільні.
```

⚠️ Анімації **глобальні**. Якщо створиш `'walk'` у `GameScene`, вона буде видна і в інших сценах. Використовуй унікальні префікси: `'player.walk'`, `'enemy.walk'`.

### Використання з атласом

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

// Коли символ виграв
winningSymbol.play('symbol-flash');
```

## Порівняння: коли що використовувати

| Завдання | Що використовувати |
|---|---|
| Зрушити символ із A в B | Tween |
| Покрутити барабан | Tween (на властивості `tilePositionY` або `y` контейнера) |
| Анімація виграшу символа (flash, prerendered кадри) | Animation |
| Поява win-тексту | Tween (alpha + scale + Back.easeOut) |
| Лічильник виграшу | Tween (`addCounter`) |
| Пульсація кнопки | Tween (yoyo + repeat: -1) |
| Тряска екрана | Camera shake (див. главу 9) |
| Складна скелетна анімація (бос, персонаж) | Spine |

## Реальний приклад: анімація виграшного символа

```js
function animateWinningSymbol(symbol) {
  // 1. Підсвітка через tint
  symbol.setTint(0xffff00);

  // 2. Пульсація (масштаб)
  this.tweens.add({
    targets: symbol,
    scale: { from: 1, to: 1.3 },
    duration: 400,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 3. Поворот туди-сюди
  this.tweens.add({
    targets: symbol,
    angle: { from: -5, to: 5 },
    duration: 200,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 4. Додатково — кадрова анімація поверх (якщо є атлас "flash")
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

## Реальний приклад: обертання барабана

```js
class Reel {
  spin() {
    // 1. Розгін
    this.tweens.add({
      targets: this.symbolsContainer,
      y: '+=200',
      duration: 300,
      ease: 'Cubic.easeIn'
    });

    // 2. Нескінченне прокручування (через Phaser.Tweens з onUpdate)
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
    // Уповільнення з перельотом
    this.tweens.add({
      targets: this.symbolsContainer,
      y: this.targetY,
      duration: 800,
      ease: 'Back.easeOut'
    });
  }
}
```

## Корисні хелпери

```js
// Вбити всі tweens на об'єкті
this.tweens.killTweensOf(obj);

// Чи існує активний tween на об'єкті?
const exists = this.tweens.getTweensOf(obj).length > 0;

// Глобальна пауза всіх tweens
this.tweens.pauseAll();
this.tweens.resumeAll();
```

---

## ✅ Вправа 6

1. Створи 3 карти в ряд. За кліком на карту:
   - Вона "перевертається" (tween `scaleX: 0 → 1` через 0.5с з `yoyo: false` + при `scaleX = 0` зміни текстуру + продовжи `scaleX: 0 → 1`)
   - **Hint:** використай два послідовні tween через `onComplete` або `chain`.

2. Зроби **лічильник очок** через `tweens.addCounter`. За кліком на кожну карту збільшуй рахунок від поточного значення до `+100` за 800мс з `Cubic.easeOut`.

3. Зроби **пульсуючу кнопку** "PLAY" — текст у центрі, нескінченний tween scale 1↔1.1 з yoyo.

4. **Бонус:** завантаж спрайтшит з будь-якого відкритого джерела (або намалюй сам у Paint, 4 кадри по 64×64), створи animation `'spin'`, програй на спрайті.

Готово — [Глава 7. Введення (Input)](./07-input.md).
