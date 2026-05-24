# Глава 3. Сцены (Scenes)

Сцена — это **самостоятельный модуль** игры. Меню, уровень, экран загрузки, UI поверх игры — всё это отдельные сцены. Сцены умеют запускаться, останавливаться, паузиться, идти параллельно.

## Зачем нужны сцены

- **Изоляция логики:** код меню не смешивается с кодом игрового уровня
- **Переиспользование:** одну сцену можно перезапускать с разными параметрами (рестарт уровня)
- **Параллельность:** UI идёт поверх игровой сцены как отдельный слой
- **Управление памятью:** при остановке сцены её ресурсы можно очистить

## Создание сцены

Два способа:

### 1. Через класс (рекомендуется)

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) { /* инициализация */ }
  preload() { /* загрузка ассетов */ }
  create(data) { /* создание объектов */ }
  update(time, delta) { /* кадр */ }
}
```

### 2. Через объект (для микро-игр)

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

## Жизненный цикл сцены

Когда сцена запускается, методы вызываются в таком порядке:

```
init(data)  →  preload()  →  create(data)  →  update(time, delta)  ← цикл
```

| Метод | Когда вызывается | Для чего |
|---|---|---|
| `init(data)` | Один раз, до загрузки | Инициализация переменных, разбор `data` |
| `preload()` | Один раз, перед `create` | Загрузка ассетов через `this.load` |
| `create(data)` | Один раз, после загрузки | Создание объектов, запуск анимаций |
| `update(time, delta)` | Каждый кадр (60+ раз/сек) | Игровая логика, движение |

Дополнительные хуки:

| Метод | Когда |
|---|---|
| `pause()` | При паузе сцены |
| `resume()` | При возобновлении |
| `sleep()` | При "засыпании" (сцена скрыта, но жива) |
| `wake()` | При пробуждении |
| `shutdown()` | При остановке (объекты уничтожаются) |
| `destroy()` | При полном удалении (редко используется) |

## Менеджер сцен — `this.scene`

В каждой сцене доступен `this.scene` — это плагин для управления сценами.

### Основные методы

```js
// Запустить сцену (текущая останавливается)
this.scene.start('GameScene');

// Запустить сцену параллельно (текущая работает)
this.scene.launch('UIScene');

// Передать данные при запуске
this.scene.start('GameScene', { level: 5, score: 100 });

// Перезапустить текущую сцену
this.scene.restart();

// Перезапустить с данными
this.scene.restart({ level: 6 });

// Остановить сцену
this.scene.stop('UIScene');

// Пауза / возобновление
this.scene.pause('GameScene');
this.scene.resume('GameScene');

// Sleep / wake (быстрее чем stop/start, не вызывает destroy)
this.scene.sleep('UIScene');
this.scene.wake('UIScene');

// Переключение (стоп текущей + старт указанной)
this.scene.switch('MenuScene');

// Получить инстанс другой сцены
const ui = this.scene.get('UIScene');
ui.events.emit('updateScore', 100);

// Изменить порядок отрисовки
this.scene.bringToTop('UIScene');     // наверх
this.scene.sendToBack('Background');  // вниз
this.scene.moveAbove('A', 'B');       // A выше B
```

## Передача данных между сценами

### Способ 1. Через `start(key, data)`

```js
// Из MenuScene
this.scene.start('GameScene', {
  level: 1,
  difficulty: 'hard',
  playerName: 'Sergey'
});

// В GameScene
init(data) {
  this.level = data.level;
  this.difficulty = data.difficulty;
}

create(data) {
  this.add.text(0, 0, `Level ${data.level}`);
}
```

### Способ 2. Через events (для параллельных сцен)

```js
// В UIScene
const gameScene = this.scene.get('GameScene');
gameScene.events.on('scoreChanged', (score) => {
  this.scoreText.setText(`Score: ${score}`);
});

// В GameScene
this.events.emit('scoreChanged', 250);
```

### Способ 3. Через registry (глобальное хранилище)

```js
// Установить
this.registry.set('playerName', 'Sergey');
this.registry.set('coins', 100);

// Получить из любой сцены
const name = this.registry.get('playerName');

// Слушать изменения
this.registry.events.on('changedata-coins', (parent, value, prev) => {
  console.log(`Coins: ${prev} → ${value}`);
});
```

## Паттерн: BootScene → PreloadScene → GameScene

Это **стандартный паттерн** для любой Phaser-игры.

### `BootScene` — минимальная инициализация

Загружает только то, что нужно для красивого экрана загрузки (логотип, прогресс-бар).

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

### `PreloadScene` — загрузка всех ассетов

Показывает прогресс, грузит всё необходимое для игры.

```js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Логотип уже загружен в BootScene — показываем
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2 - 50, 'logo');

    // Прогресс-бар
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 50, 320, 30);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 60, 300 * value, 10);
    });

    // Загружаем основные ассеты
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

### `GameScene` — основной геймплей

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.image(640, 360, 'background');
    // запускаем UI параллельно
    this.scene.launch('UIScene');
  }
}
```

## Параллельные сцены (UI поверх игры)

Часто UI делают в отдельной сцене:

```js
// В GameScene
create() {
  // создаём игровой мир
  this.scene.launch('UIScene');  // UI запускается параллельно
}
```

Преимущества:
- UI не двигается с камерой игры
- Можно паузить геймплей, оставив UI активным
- Чистое разделение ответственности

## Жизненный цикл при переключениях

| Действие | Что происходит |
|---|---|
| `start(B)` из A | A.shutdown() → B.init() → B.preload() → B.create() |
| `launch(B)` из A | A продолжает работать, параллельно B.init() → preload() → create() |
| `pause(A)` | A.pause() — update перестаёт вызываться, объекты остаются |
| `sleep(A)` | A.sleep() — невидима + update остановлен, но объекты живут |
| `stop(A)` | A.shutdown() — все объекты уничтожаются |

## Важные ловушки

### 1. Объекты не уничтожаются при `pause`

Если ставишь сцену на паузу, её объекты живут. При `stop` — уничтожаются. Это влияет на память.

### 2. Слушатели событий

При `shutdown` сцены слушатели на сторонних объектах (`this.input.on`, `this.events.on`) **очищаются автоматически**. Но слушатели на DOM или глобальные — нет, их надо снимать вручную.

```js
shutdown() {
  window.removeEventListener('resize', this.onResize);
}
```

### 3. `update` после `stop`

После `scene.stop(key)` метод `update` больше не вызывается. Не пытайся ставить там логику, которая должна выполниться "на закрытии" — используй `shutdown`.

### 4. Уникальность ключей

Каждая сцена должна иметь **уникальный** `key`. Иначе менеджер сцен запутается.

## Полезные паттерны для слотов

### Паттерн 1. Game + UI

```
GameScene  — барабаны, символы, фон
UIScene    — кнопка спина, баланс, бет, история
```

UI получает события от GameScene:
```js
// UIScene
const game = this.scene.get('GameScene');
game.events.on('spin-complete', this.onSpinComplete, this);
game.events.on('win', this.showWin, this);
```

### Паттерн 2. Bonus Game

Когда срабатывает бонус, запускается отдельная сцена:

```js
// В GameScene
if (bonusTriggered) {
  this.scene.sleep();          // приостановить основную игру
  this.scene.launch('BonusScene', { spins: 10 });
}

// В BonusScene при завершении
this.scene.stop();
this.scene.wake('GameScene');
```

---

## ✅ Упражнение 3

В проекте из Главы 1:

1. Создай 3 сцены: `MenuScene`, `GameScene`, `GameOverScene`.
2. В `MenuScene` сделай текст "Click to start" — по клику переходит в `GameScene` с данными `{ level: 1 }`.
3. В `GameScene` выведи переданный уровень. По нажатию пробела переходи в `GameOverScene` с `{ score: 100 }`.
4. В `GameOverScene` покажи скор и текст "Press R to restart" — по R возвращайся в `MenuScene`.
5. **Бонус:** запусти `UIScene` параллельно с `GameScene`, в ней покажи счётчик "Time: 0", который увеличивается каждую секунду (через `this.time.addEvent`).

Когда работает — переходи к [Главе 4. Загрузка ассетов](./04-assets.md).
