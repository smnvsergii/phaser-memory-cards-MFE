# Глава 13. Архитектура и оптимизация

В предыдущих главах ты узнал **что** даёт Phaser. Эта глава — про то, **как** правильно построить большой проект, чтобы он не превратился в кашу через месяц.

## Структура проекта (для слота)

```
src/
├── main.js                  # точка входа
├── config.js                # конфиг игры
├── core/
│   ├── EventBus.js          # глобальные события
│   ├── StateMachine.js      # стейт-машина
│   ├── AssetManifest.js     # список ассетов
│   ├── AudioManager.js      # обёртка над звуком
│   └── Logger.js            # логгер
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── GameScene.js
│   └── UIScene.js
├── slot/
│   ├── ReelManager.js       # все барабаны
│   ├── Reel.js              # один барабан
│   ├── Symbol.js            # символ
│   ├── PaytableData.js      # таблица выплат
│   ├── WinEvaluator.js      # оценка выигрышей
│   └── ServerMock.js        # симулятор сервера (RNG)
├── ui/
│   ├── SpinButton.js
│   ├── BalanceDisplay.js
│   ├── BetSelector.js
│   ├── WinDisplay.js
│   └── PaytableModal.js
└── effects/
    ├── ConfettiEmitter.js
    ├── BigWinAnimation.js
    └── SymbolGlow.js
```

## Принципы

### 1. **Сцены — это контроллеры**, не God-классы

Сцена координирует: запускает действия, передаёт данные. Логику выноси в отдельные классы.

❌ **Плохо:**
```js
class GameScene extends Phaser.Scene {
  create() {
    // 500 строк создания всего: барабаны, UI, звуки, обработчики...
  }

  update() {
    // ещё 200 строк всего этого
  }
}
```

✅ **Хорошо:**
```js
class GameScene extends Phaser.Scene {
  create() {
    this.audio = new AudioManager(this);
    this.reels = new ReelManager(this);
    this.evaluator = new WinEvaluator();

    this.scene.launch('UIScene');

    this.events.on('spin-pressed', this.onSpin, this);
  }

  async onSpin() {
    const result = await ServerMock.spin();
    await this.reels.spin(result.symbols);
    const wins = this.evaluator.evaluate(result.symbols);
    if (wins.total > 0) this.showWin(wins);
  }
}
```

### 2. Game Objects делай через **наследование**

Когда у тебя сложный объект (барабан, символ, кнопка) — создавай отдельный класс.

```js
// src/slot/Symbol.js
export default class Symbol extends Phaser.GameObjects.Container {
  constructor(scene, x, y, symbolKey) {
    super(scene, x, y);

    this.symbolKey = symbolKey;
    this.image = scene.add.image(0, 0, 'symbols', symbolKey);
    this.add(this.image);

    scene.add.existing(this);
  }

  playWinAnimation() {
    return this.scene.tweens.add({
      targets: this.image,
      scale: { from: 1, to: 1.2 },
      duration: 300,
      yoyo: true,
      repeat: 2
    });
  }

  highlight() {
    this.image.setTint(0xffff00);
  }

  unhighlight() {
    this.image.clearTint();
  }
}
```

Использование:
```js
const symbol = new Symbol(this, 100, 100, 'ace.png');
symbol.playWinAnimation();
```

### 3. Используй **EventBus** для связи между модулями

Модули **не должны** знать друг про друга напрямую — они общаются через события.

```js
// core/EventBus.js
export const EventBus = new Phaser.Events.EventEmitter();
```

```js
// SpinButton.js
import { EventBus } from '../core/EventBus.js';
this.button.on('pointerdown', () => EventBus.emit('spin-pressed'));

// GameScene.js
import { EventBus } from '../core/EventBus.js';
EventBus.on('spin-pressed', this.onSpin, this);
```

⚠️ Не забывай отписываться при `shutdown` сцены.

### 4. **State Machine** для игры

Слот — это конечный автомат с состояниями: `idle → spinning → stopping → win → idle`. Любая логика проще, когда состояние явное.

```js
// core/StateMachine.js
export class StateMachine {
  constructor(initial, states, context) {
    this.context = context;
    this.states = states;
    this.current = null;
    this.transition(initial);
  }

  transition(name, data) {
    if (this.current && this.states[this.current].onExit) {
      this.states[this.current].onExit(this.context);
    }
    this.current = name;
    if (this.states[name].onEnter) {
      this.states[name].onEnter(this.context, data);
    }
  }

  is(name) { return this.current === name; }
}
```

Использование:
```js
this.fsm = new StateMachine('idle', {
  idle: {
    onEnter: (ctx) => ctx.spinBtn.setEnabled(true)
  },
  spinning: {
    onEnter: (ctx) => {
      ctx.spinBtn.setEnabled(false);
      ctx.reels.spin();
    }
  },
  stopping: {
    onEnter: (ctx, data) => ctx.reels.stop(data.symbols)
  },
  win: {
    onEnter: (ctx, data) => ctx.showWinAnimation(data.wins)
  }
}, this);

// Переход
this.fsm.transition('spinning');
```

### 5. **Сервер-driven логика** (важно для слотов)

Реальный слот **никогда** не считает выигрыши на клиенте. Клиент:
1. Запрашивает спин → отправляет на сервер
2. Получает результат (символы, выигрыши)
3. Просто **показывает** анимацию

```js
// slot/ServerMock.js — для разработки
export class ServerMock {
  static async spin(bet) {
    // Симулируем сетевую задержку
    await new Promise(r => setTimeout(r, 200));

    // Случайные символы
    const symbols = generateRandomSymbols();
    const wins = evaluateOnServerSide(symbols, bet);

    return {
      reels: symbols,           // 5 столбцов по 3 символа
      wins,                     // [{ line: 1, symbols: [...], amount: 100 }]
      totalWin: wins.reduce((s, w) => s + w.amount, 0),
      newBalance: 950
    };
  }
}
```

Это упрощает миграцию на реальный сервер позже — нужно только заменить ServerMock.

## Object Pooling — переиспользование объектов

Создание/уничтожение GameObjects — дорого. Если у тебя летят 100 пуль или 50 частиц-конфетти — лучше использовать **пул**.

```js
class Pool {
  constructor(scene, factory, size = 20) {
    this.scene = scene;
    this.factory = factory;
    this.pool = [];
    for (let i = 0; i < size; i++) {
      const obj = factory();
      obj.setActive(false).setVisible(false);
      this.pool.push(obj);
    }
  }

  get() {
    let obj = this.pool.find(o => !o.active);
    if (!obj) {
      obj = this.factory();
      this.pool.push(obj);
    }
    obj.setActive(true).setVisible(true);
    return obj;
  }

  release(obj) {
    obj.setActive(false).setVisible(false);
  }
}

// Использование
const coinPool = new Pool(this, () => this.add.image(0, 0, 'coin'), 50);

function dropCoin(x, y) {
  const coin = coinPool.get();
  coin.setPosition(x, y);
  this.tweens.add({
    targets: coin,
    y: y + 500,
    duration: 1000,
    onComplete: () => coinPool.release(coin)
  });
}
```

В Phaser также есть встроенный `Group` с пулингом:

```js
const group = this.add.group({ defaultKey: 'coin', maxSize: 50 });
const coin = group.get(x, y);   // достаёт из пула или создаёт
coin.setActive(true).setVisible(true);
// потом
coin.setActive(false).setVisible(false);
```

## Profiling — как находить тормоза

### 1. Phaser Debug

В конфиге:
```js
fps: { target: 60 },
physics: { arcade: { debug: true } }
```

В сцене:
```js
this.add.text(10, 10, '', { color: '#0f0' }).setName('fps');

update() {
  this.children.getByName('fps').setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
}
```

### 2. Chrome DevTools Performance

- F12 → вкладка "Performance"
- Запиши 5 секунд игры
- Смотри Frame Chart — где красные блоки (медленные кадры)
- Главные подозреваемые: создание объектов в `update`, тяжёлые шейдеры, много draw calls

### 3. Spector.js (для WebGL)

Расширение Chrome. Показывает draw calls, текстуры, шейдеры. Если в кадре больше 100 draw calls — у тебя проблемы с батчингом.

## Оптимизации, которые реально работают

### 1. Используй **атласы**

Один draw call вместо десятков:
```
[card1.png] [card2.png] [card3.png] → 3 draw calls
[symbols.atlas] (всё в одной текстуре) → 1 draw call
```

### 2. **BitmapText** для динамики

Каждое `text.setText()` создаёт новую текстуру. Для счётчиков и таймеров — `BitmapText`.

### 3. **`setVisible(false)` вместо destroy**

Если объект скоро понадобится снова — не уничтожай. Делай невидимым.

### 4. **`update()` не везде**

Не пиши тяжёлую логику в `update()` всех сцен. Используй события и таймеры:

```js
this.time.addEvent({
  delay: 1000,
  callback: this.checkSomething,
  loop: true
});
```

### 5. **Не создавай объекты в `update()`**

❌ Плохо:
```js
update() {
  if (key.isDown) this.add.particles(...);  // создание каждый кадр!
}
```

✅ Хорошо:
```js
update() {
  if (Phaser.Input.Keyboard.JustDown(key)) {
    this.particles.explode(20);   // переиспользование
  }
}
```

### 6. **`setDepth` правильно**

Phaser сортирует объекты по depth. Слишком много изменений depth — нагрузка. Назначай группами:

```
const DEPTH = {
  BG: 0,
  REELS: 10,
  WIN_LINES: 20,
  UI: 100,
  MODAL: 1000
};

bg.setDepth(DEPTH.BG);
ui.setDepth(DEPTH.UI);
```

### 7. Текстуры **степени двойки**

WebGL любит размеры 256×256, 512×512, 1024×1024, 2048×2048. На больших атласах — ощутимо быстрее.

### 8. Сжимай **аудио**

96 kbps MP3 для SFX, 128 kbps для музыки. Никакого WAV.

### 9. **Убирай лишние анимации**

Бесконечные tweens на невидимых объектах — лишняя нагрузка. Останавливай:

```js
hide() {
  this.tweens.killTweensOf(this);
  this.setVisible(false);
}
```

### 10. **Lazy-load**

Не грузи бонус-ассеты в `PreloadScene` — догружай при входе в бонус.

## Целевые метрики для слота

| Метрика | Цель |
|---|---|
| Размер билда | < 5 МБ (без Spine), < 15 МБ (со Spine) |
| Время загрузки на 4G | < 5 сек |
| FPS на iPhone 8 | стабильно 60 |
| FPS на бюджетном Android | стабильно 30+ |
| Draw calls на кадр | < 50 |
| Memory | < 200 МБ на iOS |

## Чеклист перед релизом

- [ ] Все ассеты в атласах
- [ ] BitmapText для счётчиков
- [ ] Object pool для частиц
- [ ] Звуки в audio sprite
- [ ] Прогресс-бар на загрузке
- [ ] Mute-кнопка
- [ ] Pause при потере фокуса
- [ ] Fullscreen-кнопка
- [ ] Адаптивность portrait/landscape
- [ ] Защита от двойного клика на SPIN
- [ ] Loading-screen на каждый сетевой запрос
- [ ] Обработка ошибок сети
- [ ] Минификация и tree-shaking (Vite делает сам)
- [ ] Тестирование на 3 девайсах: iOS, Android, Desktop

---

## ✅ Упражнение 13

1. Возьми проект из любой предыдущей главы. Раздели сцену на:
   - `EventBus.js` — глобальные события
   - `Card.js` — класс-наследник Container для карты
   - `GameScene.js` — только координация
2. Реализуй простую `StateMachine` с состояниями `idle`, `flipping`, `matching`.
3. Сделай Object Pool для звёзд-частиц (создай 50 заранее, переиспользуй).
4. Подключи FPS-метр в угол.
5. **Бонус:** замерь FPS до и после оптимизаций. Открой Performance в Chrome DevTools и сделай профайлинг.

[Глава 14. Прототип слота на Phaser](./14-slot-prototype.md)
