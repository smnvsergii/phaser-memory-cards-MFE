# Глава 3. Сцени (Scenes)

Сцена — це **самостійний модуль** гри. Меню, рівень, екран завантаження, UI поверх гри — усе це окремі сцени. Сцени вміють запускатися, зупинятися, ставитися на паузу, працювати паралельно.

## Навіщо потрібні сцени

- **Ізоляція логіки:** код меню не змішується з кодом ігрового рівня
- **Перевикористання:** одну сцену можна перезапускати з різними параметрами (рестарт рівня)
- **Паралельність:** UI іде поверх ігрової сцени як окремий шар
- **Керування пам'яттю:** при зупинці сцени її ресурси можна очистити

## Створення сцени

Два способи:

### 1. Через клас (рекомендується)

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) { /* ініціалізація */ }
  preload() { /* завантаження ассетів */ }
  create(data) { /* створення об'єктів */ }
  update(time, delta) { /* кадр */ }
}
```

### 2. Через об'єкт (для мікро-ігор)

```js
const config = {
  scene: {
    key: 'main',
    preload: function() { /* ... */ },
    create: function() { /* ... */ },
    update: function() { /* ... */ }
  }
};
```

## Життєвий цикл сцени

Коли сцена запускається, методи викликаються в такому порядку:

```
init(data)  →  preload()  →  create(data)  →  update(time, delta)  ← цикл
```

| Метод | Коли викликається | Для чого |
|---|---|---|
| `init(data)` | Один раз, до завантаження | Ініціалізація змінних, розбір `data` |
| `preload()` | Один раз, перед `create` | Завантаження ассетів через `this.load` |
| `create(data)` | Один раз, після завантаження | Створення об'єктів, запуск анімацій |
| `update(time, delta)` | Кожен кадр (60+ разів/сек) | Ігрова логіка, рух |

Додаткові хуки:

| Метод | Коли |
|---|---|
| `pause()` | При паузі сцени |
| `resume()` | При відновленні |
| `sleep()` | При "засинанні" (сцена прихована, але жива) |
| `wake()` | При пробудженні |
| `shutdown()` | При зупинці (об'єкти знищуються) |
| `destroy()` | При повному видаленні (рідко використовується) |

## Менеджер сцен — `this.scene`

У кожній сцені доступний `this.scene` — це плагін для керування сценами.

### Основні методи

```js
// Запустити сцену (поточна зупиняється)
this.scene.start('GameScene');

// Запустити сцену паралельно (поточна працює)
this.scene.launch('UIScene');

// Передати дані під час запуску
this.scene.start('GameScene', { level: 5, score: 100 });

// Перезапустити поточну сцену
this.scene.restart();

// Перезапустити з даними
this.scene.restart({ level: 6 });

// Зупинити сцену
this.scene.stop('UIScene');

// Пауза / відновлення
this.scene.pause('GameScene');
this.scene.resume('GameScene');

// Sleep / wake (швидше за stop/start, не викликає destroy)
this.scene.sleep('UIScene');
this.scene.wake('UIScene');

// Перемикання (стоп поточної + старт указаної)
this.scene.switch('MenuScene');

// Отримати інстанс іншої сцени
const ui = this.scene.get('UIScene');
ui.events.emit('updateScore', 100);

// Змінити порядок відмалювання
this.scene.bringToTop('UIScene');     // нагору
this.scene.sendToBack('Background');  // вниз
this.scene.moveAbove('A', 'B');       // A вище B
```

## Передача даних між сценами

### Спосіб 1. Через `start(key, data)`

```js
// З MenuScene
this.scene.start('GameScene', {
  level: 1,
  difficulty: 'hard',
  playerName: 'Sergey'
});

// У GameScene
init(data) {
  this.level = data.level;
  this.difficulty = data.difficulty;
}

create(data) {
  this.add.text(0, 0, `Level ${data.level}`);
}
```

### Спосіб 2. Через events (для паралельних сцен)

```js
// У UIScene
const gameScene = this.scene.get('GameScene');
gameScene.events.on('scoreChanged', (score) => {
  this.scoreText.setText(`Score: ${score}`);
});

// У GameScene
this.events.emit('scoreChanged', 250);
```

### Спосіб 3. Через registry (глобальне сховище)

```js
// Встановити
this.registry.set('playerName', 'Sergey');
this.registry.set('coins', 100);

// Отримати з будь-якої сцени
const name = this.registry.get('playerName');

// Слухати зміни
this.registry.events.on('changedata-coins', (parent, value, prev) => {
  console.log(`Coins: ${prev} → ${value}`);
});
```

## Патерн: BootScene → PreloadScene → GameScene

Це **стандартний патерн** для будь-якої Phaser-гри.

### `BootScene` — мінімальна ініціалізація

Завантажує тільки те, що потрібне для гарного екрана завантаження (логотип, прогрес-бар).

```js
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('progressBar', 'assets/progress-bar.png');
  }

  create() {
    this.scene.start('PreloadScene');
  }
}
```

### `PreloadScene` — завантаження всіх ассетів

Показує прогрес, вантажить усе необхідне для гри.

```js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Логотип уже завантажений у BootScene — показуємо
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2 - 50, 'logo');

    // Прогрес-бар
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 50, 320, 30);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 60, 300 * value, 10);
    });

    // Завантажуємо основні ассети
    this.load.image('background', 'assets/sprites/background.webp');
    this.load.atlas('symbols', 'assets/atlas.png', 'assets/atlas.json');
    this.load.audio('spin', 'assets/sounds/spin.mp3');
    // ...
  }

  create() {
    this.scene.start('GameScene');
  }
}
```

### `GameScene` — основний геймплей

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.image(640, 360, 'background');
    // запускаємо UI паралельно
    this.scene.launch('UIScene');
  }
}
```

## Паралельні сцени (UI поверх гри)

Часто UI роблять в окремій сцені:

```js
// У GameScene
create() {
  // створюємо ігровий світ
  this.scene.launch('UIScene');  // UI запускається паралельно
}
```

Переваги:
- UI не рухається разом із камерою гри
- Можна паузити геймплей, лишивши UI активним
- Чистий розподіл відповідальності

## Життєвий цикл при перемиканнях

| Дія | Що відбувається |
|---|---|
| `start(B)` із A | A.shutdown() → B.init() → B.preload() → B.create() |
| `launch(B)` із A | A продовжує працювати, паралельно B.init() → preload() → create() |
| `pause(A)` | A.pause() — update перестає викликатися, об'єкти лишаються |
| `sleep(A)` | A.sleep() — невидима + update зупинений, але об'єкти живуть |
| `stop(A)` | A.shutdown() — усі об'єкти знищуються |

## Важливі пастки

### 1. Об'єкти не знищуються при `pause`

Якщо ставиш сцену на паузу, її об'єкти живуть. При `stop` — знищуються. Це впливає на пам'ять.

### 2. Слухачі подій

При `shutdown` сцени слухачі на сторонніх об'єктах (`this.input.on`, `this.events.on`) **очищаються автоматично**. Але слухачі на DOM або глобальні — ні, їх треба знімати вручну.

```js
shutdown() {
  window.removeEventListener('resize', this.onResize);
}
```

### 3. `update` після `stop`

Після `scene.stop(key)` метод `update` більше не викликається. Не намагайся ставити там логіку, яка має виконатися "на закритті" — використовуй `shutdown`.

### 4. Унікальність ключів

Кожна сцена має мати **унікальний** `key`. Інакше менеджер сцен заплутається.

## Корисні патерни для слотів

### Патерн 1. Game + UI

```
GameScene  — барабани, символи, фон
UIScene    — кнопка спіну, баланс, бет, історія
```

UI отримує події від GameScene:
```js
// UIScene
const game = this.scene.get('GameScene');
game.events.on('spin-complete', this.onSpinComplete, this);
game.events.on('win', this.showWin, this);
```

### Патерн 2. Bonus Game

Коли спрацьовує бонус, запускається окрема сцена:

```js
// У GameScene
if (bonusTriggered) {
  this.scene.sleep();          // призупинити основну гру
  this.scene.launch('BonusScene', { spins: 10 });
}

// У BonusScene при завершенні
this.scene.stop();
this.scene.wake('GameScene');
```

---

## ✅ Вправа 3

У проєкті з Глави 1:

1. Створи 3 сцени: `MenuScene`, `GameScene`, `GameOverScene`.
2. У `MenuScene` зроби текст "Click to start" — за кліком переходить у `GameScene` з даними `{ level: 1 }`.
3. У `GameScene` виведи переданий рівень. За натисненням пробілу переходь у `GameOverScene` з `{ score: 100 }`.
4. У `GameOverScene` покажи рахунок і текст "Press R to restart" — за R повертайся до `MenuScene`.
5. **Бонус:** запусти `UIScene` паралельно з `GameScene`, у ній покажи лічильник "Time: 0", який збільшується щосекунди (через `this.time.addEvent`).

Коли працює — переходь до [Глави 4. Завантаження ассетів](./04-assets.md).
