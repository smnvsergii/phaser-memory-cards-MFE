# Глава 13. Архітектура та оптимізація

У попередніх главах ти дізнався **що** дає Phaser. Ця глава — про те, **як** правильно побудувати великий проєкт, щоб він не перетворився на кашу через місяць.

## Структура проєкту (для слота)

```
src/
├── main.js                  # точка входу
├── config.js                # конфіг гри
├── core/
│   ├── EventBus.js          # глобальні події
│   ├── StateMachine.js      # стейт-машина
│   ├── AssetManifest.js     # список ассетів
│   ├── AudioManager.js      # обгортка над звуком
│   └── Logger.js            # логер
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── GameScene.js
│   └── UIScene.js
├── slot/
│   ├── ReelManager.js       # усі барабани
│   ├── Reel.js              # один барабан
│   ├── Symbol.js            # символ
│   ├── PaytableData.js      # таблиця виплат
│   ├── WinEvaluator.js      # оцінка виграшів
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

## Принципи

### 1. **Сцени — це контролери**, не God-класи

Сцена координує: запускає дії, передає дані. Логіку виноси в окремі класи.

❌ **Погано:**
```js
class GameScene extends Phaser.Scene {
  create() {
    // 500 рядків створення всього: барабани, UI, звуки, обробники...
  }

  update() {
    // ще 200 рядків усього цього
  }
}
```

✅ **Добре:**
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

### 2. Game Objects роби через **наслідування**

Коли в тебе складний об'єкт (барабан, символ, кнопка) — створюй окремий клас.

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

Використання:
```js
const symbol = new Symbol(this, 100, 100, 'ace.png');
symbol.playWinAnimation();
```

### 3. Використовуй **EventBus** для зв'язку між модулями

Модулі **не повинні** знати одне про одного напряму — вони спілкуються через події.

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

⚠️ Не забувай відписуватися при `shutdown` сцени.

### 4. **State Machine** для гри

Слот — це скінченний автомат зі станами: `idle → spinning → stopping → win → idle`. Будь-яка логіка простіша, коли стан явний.

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

Використання:
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

// Перехід
this.fsm.transition('spinning');
```

### 5. **Server-driven логіка** (важливо для слотів)

Реальний слот **ніколи** не рахує виграші на клієнті. Клієнт:
1. Запитує спін → відправляє на сервер
2. Отримує результат (символи, виграші)
3. Просто **показує** анімацію

```js
// slot/ServerMock.js — для розробки
export class ServerMock {
  static async spin(bet) {
    // Симулюємо мережеву затримку
    await new Promise(r => setTimeout(r, 200));

    // Випадкові символи
    const symbols = generateRandomSymbols();
    const wins = evaluateOnServerSide(symbols, bet);

    return {
      reels: symbols,           // 5 стовпців по 3 символи
      wins,                     // [{ line: 1, symbols: [...], amount: 100 }]
      totalWin: wins.reduce((s, w) => s + w.amount, 0),
      newBalance: 950
    };
  }
}
```

Це спрощує міграцію на реальний сервер пізніше — потрібно лише замінити ServerMock.

## Object Pooling — перевикористання об'єктів

Створення/знищення GameObjects — дорого. Якщо в тебе летять 100 куль або 50 частинок-конфеті — краще використати **пул**.

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

// Використання
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

У Phaser також є вбудований `Group` із пулінгом:

```js
const group = this.add.group({ defaultKey: 'coin', maxSize: 50 });
const coin = group.get(x, y);   // дістає з пула або створює
coin.setActive(true).setVisible(true);
// потім
coin.setActive(false).setVisible(false);
```

## Profiling — як знаходити гальма

### 1. Phaser Debug

У конфізі:
```js
fps: { target: 60 },
physics: { arcade: { debug: true } }
```

У сцені:
```js
this.add.text(10, 10, '', { color: '#0f0' }).setName('fps');

update() {
  this.children.getByName('fps').setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
}
```

### 2. Chrome DevTools Performance

- F12 → вкладка "Performance"
- Запиши 5 секунд гри
- Дивись Frame Chart — де червоні блоки (повільні кадри)
- Головні підозрювані: створення об'єктів у `update`, важкі шейдери, багато draw calls

### 3. Spector.js (для WebGL)

Розширення Chrome. Показує draw calls, текстури, шейдери. Якщо в кадрі більше 100 draw calls — у тебе проблеми з батчингом.

## Оптимізації, які реально працюють

### 1. Використовуй **атласи**

Один draw call замість десятків:
```
[card1.png] [card2.png] [card3.png] → 3 draw calls
[symbols.atlas] (все в одній текстурі) → 1 draw call
```

### 2. **BitmapText** для динаміки

Кожне `text.setText()` створює нову текстуру. Для лічильників і таймерів — `BitmapText`.

### 3. **`setVisible(false)` замість destroy**

Якщо об'єкт скоро знадобиться знову — не знищуй. Роби невидимим.

### 4. **`update()` не скрізь**

Не пиши важку логіку в `update()` усіх сцен. Використовуй події та таймери:

```js
this.time.addEvent({
  delay: 1000,
  callback: this.checkSomething,
  loop: true
});
```

### 5. **Не створюй об'єкти в `update()`**

❌ Погано:
```js
update() {
  if (key.isDown) this.add.particles(...);  // створення кожен кадр!
}
```

✅ Добре:
```js
update() {
  if (Phaser.Input.Keyboard.JustDown(key)) {
    this.particles.explode(20);   // перевикористання
  }
}
```

### 6. **`setDepth` правильно**

Phaser сортує об'єкти за depth. Забагато змін depth — навантаження. Призначай групами:

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

### 7. Текстури **степеня двійки**

WebGL любить розміри 256×256, 512×512, 1024×1024, 2048×2048. На великих атласах — відчутно швидше.

### 8. Стискай **аудіо**

96 kbps MP3 для SFX, 128 kbps для музики. Жодного WAV.

### 9. **Прибирай зайві анімації**

Нескінченні tweens на невидимих об'єктах — зайве навантаження. Зупиняй:

```js
hide() {
  this.tweens.killTweensOf(this);
  this.setVisible(false);
}
```

### 10. **Lazy-load**

Не вантаж бонус-ассети в `PreloadScene` — довантажуй при вході в бонус.

## Цільові метрики для слота

| Метрика | Ціль |
|---|---|
| Розмір білда | < 5 МБ (без Spine), < 15 МБ (зі Spine) |
| Час завантаження на 4G | < 5 сек |
| FPS на iPhone 8 | стабільно 60 |
| FPS на бюджетному Android | стабільно 30+ |
| Draw calls на кадр | < 50 |
| Memory | < 200 МБ на iOS |

## Чек-лист перед релізом

- [ ] Усі ассети в атласах
- [ ] BitmapText для лічильників
- [ ] Object pool для частинок
- [ ] Звуки в audio sprite
- [ ] Прогрес-бар на завантаженні
- [ ] Mute-кнопка
- [ ] Pause при втраті фокусу
- [ ] Fullscreen-кнопка
- [ ] Адаптивність portrait/landscape
- [ ] Захист від подвійного кліку на SPIN
- [ ] Loading-screen на кожен мережевий запит
- [ ] Обробка помилок мережі
- [ ] Мініфікація і tree-shaking (Vite робить сам)
- [ ] Тестування на 3 пристроях: iOS, Android, Desktop

---

## ✅ Вправа 13

1. Візьми проєкт із будь-якої попередньої глави. Розділи сцену на:
   - `EventBus.js` — глобальні події
   - `Card.js` — клас-нащадок Container для карти
   - `GameScene.js` — тільки координація
2. Реалізуй просту `StateMachine` зі станами `idle`, `flipping`, `matching`.
3. Зроби Object Pool для зірок-частинок (створи 50 заздалегідь, перевикористовуй).
4. Підключи FPS-метр у куті.
5. **Бонус:** заміряй FPS до й після оптимізацій. Відкрий Performance у Chrome DevTools і зроби профайлінг.

[Глава 14. Прототип слота на Phaser](./14-slot-prototype.md)
