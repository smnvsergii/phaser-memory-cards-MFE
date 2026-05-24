# Глава 14. Прототип слота на Phaser

Фінальна глава. Тут ми зберемо все, що пройшли, у працюючий прототип слота: 5 барабанів × 3 символи, 5 ліній, кнопка SPIN, баланс, виграші.

Це **навчальний** прототип — без графіки рівня production, але з правильною архітектурою.

## Що ми побудуємо

```
┌──────────────────────────────────────┐
│         Background image             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  │ ♠ │ │ ♥ │ │ ♣ │ │ ♦ │ │ ★ │  ← символи
│  │ ♥ │ │ ★ │ │ ♣ │ │ ♥ │ │ ♠ │  ← 3 видимі ряди
│  │ ★ │ │ ♣ │ │ ♥ │ │ ★ │ │ ♦ │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
│  Balance: 1000   Bet: 10   Win: 0       │
│              [   SPIN   ]                │
└──────────────────────────────────────┘
```

## Структура проєкту

```
src/
├── main.js
├── config.js
├── core/
│   ├── EventBus.js
│   └── StateMachine.js
├── slot/
│   ├── SlotConfig.js        # конфігурація слота
│   ├── Symbol.js
│   ├── Reel.js
│   ├── ReelManager.js
│   ├── WinEvaluator.js
│   └── ServerMock.js
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   └── GameScene.js
└── ui/
    ├── SpinButton.js
    ├── BalanceDisplay.js
    └── WinDisplay.js
```

## Крок 1. Конфігурація слота

```js
// src/slot/SlotConfig.js
export const SLOT_CONFIG = {
  reels: 5,
  rows: 3,
  symbolSize: 100,
  symbolSpacing: 10,

  // Доступні символи (ключі в атласі)
  symbols: ['ace', 'king', 'queen', 'jack', 'ten', 'star', 'heart'],

  // Ваги для випадкової видачі (чим більше — тим частіше)
  weights: {
    ace:   3,
    king:  4,
    queen: 5,
    jack:  6,
    ten:   8,
    star:  1,    // рідкісний — wild
    heart: 2     // scatter
  },

  // Таблиця виплат: символ → { 3:x, 4:x, 5:x } за таку кількість поспіль
  paytable: {
    ace:   { 3: 10,  4: 30,  5: 100 },
    king:  { 3: 8,   4: 20,  5: 75 },
    queen: { 3: 5,   4: 15,  5: 50 },
    jack:  { 3: 4,   4: 10,  5: 30 },
    ten:   { 3: 2,   4: 6,   5: 20 },
    star:  { 3: 50,  4: 200, 5: 1000 },
    heart: { 3: 5,   4: 25,  5: 100 }
  },

  // Лінії виплат (5 простих горизонтальних)
  lines: [
    [0, 0, 0, 0, 0],   // верхній ряд
    [1, 1, 1, 1, 1],   // середній
    [2, 2, 2, 2, 2],   // нижній
    [0, 1, 2, 1, 0],   // V
    [2, 1, 0, 1, 2]    // ^
  ]
};
```

## Крок 2. EventBus

```js
// src/core/EventBus.js
import Phaser from 'phaser';
export const EventBus = new Phaser.Events.EventEmitter();
```

## Крок 3. Клас символа

```js
// src/slot/Symbol.js
import Phaser from 'phaser';

export default class Symbol extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key) {
    super(scene, x, y);
    this.symbolKey = key;

    // Тут key — це ім'я картинки. Можна використовувати атлас.
    // У прототипі використовуємо простий Image.
    this.image = scene.add.rectangle(0, 0, 90, 90, this.colorFor(key));
    this.label = scene.add.text(0, 0, key.toUpperCase().slice(0, 2), {
      fontSize: '32px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add([this.image, this.label]);
    scene.add.existing(this);
  }

  colorFor(key) {
    return {
      ace: 0xff3366, king: 0xff6633, queen: 0xffcc33,
      jack: 0x66ff33, ten: 0x33ccff, star: 0xff00ff, heart: 0xffffff
    }[key] || 0x888888;
  }

  setSymbol(key) {
    this.symbolKey = key;
    this.image.setFillStyle(this.colorFor(key));
    this.label.setText(key.toUpperCase().slice(0, 2));
  }

  playWin() {
    return this.scene.tweens.add({
      targets: this,
      scale: { from: 1, to: 1.2 },
      duration: 300,
      yoyo: true,
      repeat: 2,
      ease: 'Sine.easeInOut'
    });
  }

  unhighlight() {
    this.scene.tweens.killTweensOf(this);
    this.setScale(1);
  }
}
```

## Крок 4. Клас барабана

```js
// src/slot/Reel.js
import Phaser from 'phaser';
import Symbol from './Symbol.js';
import { SLOT_CONFIG } from './SlotConfig.js';

export default class Reel extends Phaser.GameObjects.Container {
  constructor(scene, x, y, reelIndex) {
    super(scene, x, y);
    this.scene = scene;
    this.reelIndex = reelIndex;
    this.cellSize = SLOT_CONFIG.symbolSize + SLOT_CONFIG.symbolSpacing;

    this.symbols = [];
    // Створюємо 3 видимі + 1 невидимий зверху для прокручування
    for (let i = -1; i < SLOT_CONFIG.rows; i++) {
      const sym = new Symbol(scene, 0, i * this.cellSize, this.randomSymbolKey());
      this.symbols.push(sym);
      this.add(sym);
    }

    scene.add.existing(this);
  }

  randomSymbolKey() {
    const w = SLOT_CONFIG.weights;
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (const [key, weight] of Object.entries(w)) {
      r -= weight;
      if (r <= 0) return key;
    }
    return 'ten';
  }

  /**
   * Прокрутити барабан і закінчити вказаними символами (3 видимі).
   * @param {string[]} finalSymbols — 3 символи зверху-вниз
   * @param {number} delayBeforeStop — мс до зупинки (для каскаду)
   */
  async spin(finalSymbols, delayBeforeStop) {
    return new Promise(resolve => {
      // 1. Розгін — символи швидко рухаються вниз
      const spinCycle = () => {
        return this.scene.tweens.add({
          targets: this.symbols,
          y: `+=${this.cellSize}`,
          duration: 80,
          ease: 'Linear',
          onComplete: () => {
            // Перенести символ знизу нагору і змінити
            this.symbols.forEach(s => {
              if (s.y >= (SLOT_CONFIG.rows - 1) * this.cellSize) {
                s.y -= SLOT_CONFIG.rows * this.cellSize;
                s.setSymbol(this.randomSymbolKey());
              }
            });
          }
        });
      };

      // Запускаємо цикли
      const startSpin = () => {
        const tw = spinCycle();
        tw.on('complete', () => {
          if (this.shouldStop) {
            this.finalLanding(finalSymbols, resolve);
          } else {
            startSpin();
          }
        });
      };

      this.shouldStop = false;
      startSpin();

      // Через delayBeforeStop ставимо прапорець — після чергового циклу барабан зупиниться
      this.scene.time.delayedCall(delayBeforeStop, () => {
        this.shouldStop = true;
      });
    });
  }

  finalLanding(finalSymbols, resolve) {
    // Поставити символи по місцях і анімувати "посадку"
    finalSymbols.forEach((key, i) => {
      this.symbols[i + 1].setSymbol(key);   // [0] — невидимий зверху
      this.symbols[i + 1].y = i * this.cellSize;
    });
    // Зверху випадковий
    this.symbols[0].setSymbol(this.randomSymbolKey());
    this.symbols[0].y = -this.cellSize;

    // Ефект "удар" знизу
    this.scene.tweens.add({
      targets: this.symbols.slice(1),
      y: '+=10',
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: resolve
    });
  }

  /** Отримати 3 видимі символи */
  getVisibleSymbols() {
    return this.symbols.slice(1, SLOT_CONFIG.rows + 1).map(s => s.symbolKey);
  }

  /** Отримати символ у конкретній позиції (0..rows-1) */
  getSymbolAt(row) {
    return this.symbols[row + 1];
  }
}
```

## Крок 5. Менеджер барабанів

```js
// src/slot/ReelManager.js
import Phaser from 'phaser';
import Reel from './Reel.js';
import { SLOT_CONFIG } from './SlotConfig.js';

export default class ReelManager extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.reels = [];

    const cell = SLOT_CONFIG.symbolSize + SLOT_CONFIG.symbolSpacing;
    const totalWidth = SLOT_CONFIG.reels * cell;
    const startX = -totalWidth / 2 + cell / 2;

    for (let i = 0; i < SLOT_CONFIG.reels; i++) {
      const reel = new Reel(scene, startX + i * cell, 0, i);
      this.reels.push(reel);
      this.add(reel);
    }

    scene.add.existing(this);

    // Маска — показуємо тільки 3 ряди
    const maskRect = scene.add.graphics();
    maskRect.fillRect(
      x - totalWidth / 2,
      y - cell / 2,
      totalWidth,
      cell * SLOT_CONFIG.rows
    );
    this.setMask(maskRect.createGeometryMask());
    maskRect.setVisible(false);
  }

  /**
   * @param {string[][]} finalGrid — масив 5 стовпців по 3 символи
   */
  async spin(finalGrid) {
    const promises = this.reels.map((reel, i) =>
      reel.spin(finalGrid[i], 800 + i * 200)   // кожен наступний зупиняється пізніше
    );
    await Promise.all(promises);
  }

  highlightWin(positions) {
    positions.forEach(({ reel, row }) => {
      this.reels[reel].getSymbolAt(row).playWin();
    });
  }

  clearHighlights() {
    this.reels.forEach(r => r.symbols.forEach(s => s.unhighlight()));
  }

  getGrid() {
    return this.reels.map(r => r.getVisibleSymbols());
  }
}
```

## Крок 6. Оцінка виграшів

```js
// src/slot/WinEvaluator.js
import { SLOT_CONFIG } from './SlotConfig.js';

export class WinEvaluator {
  /**
   * @param {string[][]} grid — 5 стовпців по 3 символи (grid[col][row])
   * @returns {{lines: Array, total: number}}
   */
  static evaluate(grid, bet) {
    const wins = [];

    SLOT_CONFIG.lines.forEach((linePattern, lineIndex) => {
      const lineSymbols = linePattern.map((row, col) => grid[col][row]);
      const first = lineSymbols[0];

      // Рахуємо скільки однакових поспіль із початку
      let count = 1;
      for (let i = 1; i < lineSymbols.length; i++) {
        if (lineSymbols[i] === first) count++;
        else break;
      }

      const payRule = SLOT_CONFIG.paytable[first];
      if (payRule && payRule[count]) {
        const positions = [];
        for (let c = 0; c < count; c++) {
          positions.push({ reel: c, row: linePattern[c] });
        }
        wins.push({
          line: lineIndex + 1,
          symbol: first,
          count,
          amount: payRule[count] * bet,
          positions
        });
      }
    });

    const total = wins.reduce((s, w) => s + w.amount, 0);
    return { lines: wins, total };
  }
}
```

## Крок 7. ServerMock — генератор результатів

```js
// src/slot/ServerMock.js
import { SLOT_CONFIG } from './SlotConfig.js';
import { WinEvaluator } from './WinEvaluator.js';

export class ServerMock {
  static balance = 1000;

  static randomSymbol() {
    const w = SLOT_CONFIG.weights;
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (const [key, weight] of Object.entries(w)) {
      r -= weight;
      if (r <= 0) return key;
    }
    return 'ten';
  }

  static async spin(bet) {
    // Симуляція мережевої затримки
    await new Promise(r => setTimeout(r, 100));

    if (this.balance < bet) throw new Error('Not enough balance');
    this.balance -= bet;

    // Генеруємо сітку
    const grid = [];
    for (let c = 0; c < SLOT_CONFIG.reels; c++) {
      const col = [];
      for (let r = 0; r < SLOT_CONFIG.rows; r++) {
        col.push(this.randomSymbol());
      }
      grid.push(col);
    }

    const wins = WinEvaluator.evaluate(grid, bet);
    this.balance += wins.total;

    return {
      grid,
      wins,
      balance: this.balance
    };
  }
}
```

## Крок 8. UI-компоненти

```js
// src/ui/SpinButton.js
import Phaser from 'phaser';
import { EventBus } from '../core/EventBus.js';

export default class SpinButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.bg = scene.add.circle(0, 0, 50, 0x00cc66).setStrokeStyle(4, 0xffffff);
    this.label = scene.add.text(0, 0, 'SPIN', {
      fontSize: '24px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add([this.bg, this.label]);
    scene.add.existing(this);

    this.bg.setInteractive({ useHandCursor: true });
    this.bg.on('pointerdown', () => this.handlePress());
    this.bg.on('pointerover', () => this.setScale(1.1));
    this.bg.on('pointerout',  () => this.setScale(1));
  }

  handlePress() {
    if (!this.enabled) return;
    EventBus.emit('spin-pressed');
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.alpha = enabled ? 1 : 0.5;
  }
}
```

```js
// src/ui/BalanceDisplay.js
import Phaser from 'phaser';

export default class BalanceDisplay extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.label = scene.add.text(0, 0, 'Balance: 1000', {
      fontSize: '24px', color: '#ffffff'
    }).setOrigin(0.5);
    this.add(this.label);
    scene.add.existing(this);
  }

  setBalance(value) {
    this.label.setText(`Balance: ${value}`);
  }

  animateTo(value, duration = 800) {
    let from = parseInt(this.label.text.replace(/\D/g, ''), 10) || 0;
    this.scene.tweens.addCounter({
      from, to: value, duration, ease: 'Cubic.easeOut',
      onUpdate: (tween) => {
        this.label.setText(`Balance: ${Math.floor(tween.getValue())}`);
      }
    });
  }
}
```

```js
// src/ui/WinDisplay.js
import Phaser from 'phaser';

export default class WinDisplay extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.label = scene.add.text(0, 0, '', {
      fontSize: '36px', color: '#ffff00', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(this.label);
    scene.add.existing(this);
  }

  show(amount) {
    this.label.setText(`WIN: 0`);
    this.alpha = 0;
    this.setScale(0.5);

    this.scene.tweens.add({
      targets: this, alpha: 1, scale: 1, duration: 300, ease: 'Back.easeOut'
    });

    this.scene.tweens.addCounter({
      from: 0, to: amount, duration: 1500, ease: 'Cubic.easeOut',
      onUpdate: (tween) => {
        this.label.setText(`WIN: ${Math.floor(tween.getValue())}`);
      }
    });
  }

  hide() {
    this.scene.tweens.add({ targets: this, alpha: 0, duration: 300 });
  }
}
```

## Крок 9. GameScene — збираємо все

```js
// src/scenes/GameScene.js
import Phaser from 'phaser';
import ReelManager from '../slot/ReelManager.js';
import { ServerMock } from '../slot/ServerMock.js';
import { EventBus } from '../core/EventBus.js';
import SpinButton from '../ui/SpinButton.js';
import BalanceDisplay from '../ui/BalanceDisplay.js';
import WinDisplay from '../ui/WinDisplay.js';

export default class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene' }); }

  create() {
    const { width, height } = this.scale;

    // Фон
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);
    this.add.text(width / 2, 40, 'PHASER SLOT', {
      fontSize: '32px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Барабани по центру
    this.reels = new ReelManager(this, width / 2, height / 2 - 30);

    // UI
    this.balance = new BalanceDisplay(this, width / 2 - 200, height - 100);
    this.balance.setBalance(ServerMock.balance);

    this.winDisplay = new WinDisplay(this, width / 2, height - 150);

    this.spinBtn = new SpinButton(this, width / 2, height - 70);

    this.bet = 10;
    this.spinning = false;

    EventBus.on('spin-pressed', this.onSpin, this);

    // Spacebar = SPIN
    this.input.keyboard.on('keydown-SPACE', () => this.onSpin());
  }

  async onSpin() {
    if (this.spinning) return;
    this.spinning = true;

    this.spinBtn.setEnabled(false);
    this.winDisplay.hide();
    this.reels.clearHighlights();

    try {
      // 1. Запит на сервер
      const response = await ServerMock.spin(this.bet);

      // 2. Анімація спіну з фінальною сіткою
      await this.reels.spin(response.grid);

      // 3. Оновлення балансу
      this.balance.animateTo(response.balance);

      // 4. Показ виграшів
      if (response.wins.total > 0) {
        this.winDisplay.show(response.wins.total);
        response.wins.lines.forEach(line => {
          this.reels.highlightWin(line.positions);
        });

        // Бахнем камерою якщо виграш великий
        if (response.wins.total >= this.bet * 50) {
          this.cameras.main.shake(500, 0.005);
          this.cameras.main.flash(300, 255, 215, 0);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.spinning = false;
      this.spinBtn.setEnabled(true);
    }
  }

  shutdown() {
    EventBus.off('spin-pressed', this.onSpin, this);
  }
}
```

## Крок 10. Запуск

```js
// src/main.js
import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  backgroundColor: '#0a0a1a',
  scene: [GameScene]
});
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Phaser Slot</title>
<style>body{margin:0;background:#000;}#game{height:100vh;display:flex;align-items:center;justify-content:center;}</style>
</head>
<body><div id="game"></div><script type="module" src="/src/main.js"></script></body>
</html>
```

## Що вийде

- **5 барабанів** із прокручуванням, кожен наступний зупиняється із затримкою
- **5 ліній виплат** (3 горизонтальні + 2 діагональні)
- **Підсвітка виграшу** — виграшні символи пульсують
- **Анімація балансу** — плавний лічильник
- **Анімація виграшу** — "WIN: 100" з ефектом підрахунку
- **Camera shake + flash** при великих виграшах
- **Захист від подвійного кліку**
- **Spacebar = SPIN**
- **ServerMock** — уся логіка "на сервері", клієнт тільки показує

## Що покращити далі

Це основа. Щоб отримати **production-рівень**:

1. **Графіка** — замінити rectangles на спрайти в атласі
2. **Звуки** — spin loop, reel stop, win SFX, jingles
3. **Bet selector** — кнопки + і - для зміни ставки
4. **Auto-spin** — автоматичний режим N спінів
5. **Paytable modal** — вікно з правилами і таблицею
6. **Free Spins / Bonus** — окрема сцена бонус-гри
7. **Animations зі Spine** — символи wild з похитуванням
8. **Particles** — конфеті при big-win
9. **Анімація виграшної лінії** — намалювати лінії Graphics + анімувати
10. **Мережевий шар** — замінити ServerMock на реальне API

## Що ми пройшли в курсі

✅ Установка та базове налаштування
✅ Game Config
✅ Сцени та переходи
✅ Завантаження ассетів
✅ Display objects (Image, Text, Container, Graphics)
✅ Tweens та animations
✅ Введення (mouse, keyboard)
✅ Звук
✅ Камера
✅ Адаптивність
✅ Particles
✅ Фізика
✅ Архітектура та оптимізація
✅ Прототип слота

## Куди рухатися далі

1. **Доопрацюй цей слот** — додай графіку, звуки, ефекти
2. **Вивчи Spine** — без нього production-слотів не буває: [esotericsoftware.com/spine-runtimes](https://esotericsoftware.com/spine-runtimes)
3. **Вивчи GSAP** — краще за вбудовані tweens для складних таймлайнів
4. **Переходь на Pixi.js** — тепер, коли розумієш Phaser, Pixi здаватиметься простішим
5. **Зроби 2-3 різні слоти** на Phaser — один із фріспінами, один із бонус-грою, один із каскадними виграшами
6. **Вивчи production-стек** — Pixi + GSAP + Howler + Spine + WebPack/Vite

## Фінальна вправа

Візьми цей прототип і за тиждень-два доведи до грабельного стану:

1. ✅ Заміни rectangles на нормальні карткові/тематичні спрайти (можна безкоштовні з [Kenney.nl](https://kenney.nl))
2. ✅ Додай усі звуки (spin, stop, win, big-win, click)
3. ✅ Зроби bet selector (3 рівні ставки)
4. ✅ Зроби авто-спін (3, 5, 10 спінів)
5. ✅ Додай paytable-модалку
6. ✅ Зроби "вогники" навколо виграшних символів через particles
7. ✅ Зроби окрему UIScene
8. ✅ Деплой на GitHub Pages — і покажи всім

Коли все це зробиш — ти готовий до індустрії. 🎰

---

**Успіхів!** Якщо в процесі навчання виникнуть запитання — повертайся до відповідних глав, експериментуй на [phaser.io/examples](https://phaser.io/examples) і не бійся читати [вихідники Phaser](https://github.com/phaserjs/phaser) — вони добре задокументовані.
