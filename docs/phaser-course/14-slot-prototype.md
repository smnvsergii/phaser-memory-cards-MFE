# Глава 14. Прототип слота на Phaser

Финальная глава. Здесь мы соберём всё что прошли в работающий прототип слота: 5 барабанов × 3 символа, 5 линий, кнопка SPIN, баланс, выигрыши.

Это **учебный** прототип — без графики уровня production, но с правильной архитектурой.

## Что мы построим

```
┌──────────────────────────────────────┐
│         Background image             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  │ ♠ │ │ ♥ │ │ ♣ │ │ ♦ │ │ ★ │  ← символы
│  │ ♥ │ │ ★ │ │ ♣ │ │ ♥ │ │ ♠ │  ← 3 видимых ряда
│  │ ★ │ │ ♣ │ │ ♥ │ │ ★ │ │ ♦ │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
│  Balance: 1000   Bet: 10   Win: 0       │
│              [   SPIN   ]                │
└──────────────────────────────────────┘
```

## Структура проекта

```
src/
├── main.js
├── config.js
├── core/
│   ├── EventBus.js
│   └── StateMachine.js
├── slot/
│   ├── SlotConfig.js        # конфигурация слота
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

## Шаг 1. Конфигурация слота

```js
// src/slot/SlotConfig.js
export const SLOT_CONFIG = {
  reels: 5,
  rows: 3,
  symbolSize: 100,
  symbolSpacing: 10,

  // Доступные символы (ключи в атласе)
  symbols: ['ace', 'king', 'queen', 'jack', 'ten', 'star', 'heart'],

  // Веса для случайной выдачи (чем больше — тем чаще)
  weights: {
    ace:   3,
    king:  4,
    queen: 5,
    jack:  6,
    ten:   8,
    star:  1,    // редкий — wild
    heart: 2     // scatter
  },

  // Таблица выплат: символ → { 3:x, 4:x, 5:x } за такое количество подряд
  paytable: {
    ace:   { 3: 10,  4: 30,  5: 100 },
    king:  { 3: 8,   4: 20,  5: 75 },
    queen: { 3: 5,   4: 15,  5: 50 },
    jack:  { 3: 4,   4: 10,  5: 30 },
    ten:   { 3: 2,   4: 6,   5: 20 },
    star:  { 3: 50,  4: 200, 5: 1000 },
    heart: { 3: 5,   4: 25,  5: 100 }
  },

  // Линии выплат (5 простых горизонтальных)
  lines: [
    [0, 0, 0, 0, 0],   // верхний ряд
    [1, 1, 1, 1, 1],   // средний
    [2, 2, 2, 2, 2],   // нижний
    [0, 1, 2, 1, 0],   // V
    [2, 1, 0, 1, 2]    // ^
  ]
};
```

## Шаг 2. EventBus

```js
// src/core/EventBus.js
import Phaser from 'phaser';
export const EventBus = new Phaser.Events.EventEmitter();
```

## Шаг 3. Класс символа

```js
// src/slot/Symbol.js
import Phaser from 'phaser';

export default class Symbol extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key) {
    super(scene, x, y);
    this.symbolKey = key;

    // Здесь key — это имя картинки. Можно использовать атлас.
    // В прототипе используем простой Image.
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

## Шаг 4. Класс барабана

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
    // Создаём 3 видимых + 1 невидимый сверху для прокрутки
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
   * Прокрутить барабан и закончить указанными символами (3 видимых).
   * @param {string[]} finalSymbols — 3 символа сверху-вниз
   * @param {number} delayBeforeStop — мс до остановки (для каскада)
   */
  async spin(finalSymbols, delayBeforeStop) {
    return new Promise(resolve => {
      // 1. Разгон — символы быстро двигаются вниз
      const spinCycle = () => {
        return this.scene.tweens.add({
          targets: this.symbols,
          y: `+=${this.cellSize}`,
          duration: 80,
          ease: 'Linear',
          onComplete: () => {
            // Перенести символ снизу-наверх и сменить
            this.symbols.forEach(s => {
              if (s.y >= (SLOT_CONFIG.rows - 1) * this.cellSize) {
                s.y -= SLOT_CONFIG.rows * this.cellSize;
                s.setSymbol(this.randomSymbolKey());
              }
            });
          }
        });
      };

      // Запускаем циклы
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

      // Через delayBeforeStop ставим флаг — после очередного цикла барабан остановится
      this.scene.time.delayedCall(delayBeforeStop, () => {
        this.shouldStop = true;
      });
    });
  }

  finalLanding(finalSymbols, resolve) {
    // Поставить символы по местам и анимировать "посадку"
    finalSymbols.forEach((key, i) => {
      this.symbols[i + 1].setSymbol(key);   // [0] — невидимый сверху
      this.symbols[i + 1].y = i * this.cellSize;
    });
    // Сверху случайный
    this.symbols[0].setSymbol(this.randomSymbolKey());
    this.symbols[0].y = -this.cellSize;

    // Эффект "удар" внизу
    this.scene.tweens.add({
      targets: this.symbols.slice(1),
      y: '+=10',
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: resolve
    });
  }

  /** Получить 3 видимых символа */
  getVisibleSymbols() {
    return this.symbols.slice(1, SLOT_CONFIG.rows + 1).map(s => s.symbolKey);
  }

  /** Получить символ в конкретной позиции (0..rows-1) */
  getSymbolAt(row) {
    return this.symbols[row + 1];
  }
}
```

## Шаг 5. Менеджер барабанов

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

    // Маска — показываем только 3 ряда
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
   * @param {string[][]} finalGrid — массив 5 столбцов по 3 символа
   */
  async spin(finalGrid) {
    const promises = this.reels.map((reel, i) =>
      reel.spin(finalGrid[i], 800 + i * 200)   // каждый последующий стопится позже
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

## Шаг 6. Оценка выигрышей

```js
// src/slot/WinEvaluator.js
import { SLOT_CONFIG } from './SlotConfig.js';

export class WinEvaluator {
  /**
   * @param {string[][]} grid — 5 столбцов по 3 символа (grid[col][row])
   * @returns {{lines: Array, total: number}}
   */
  static evaluate(grid, bet) {
    const wins = [];

    SLOT_CONFIG.lines.forEach((linePattern, lineIndex) => {
      const lineSymbols = linePattern.map((row, col) => grid[col][row]);
      const first = lineSymbols[0];

      // Считаем сколько одинаковых подряд с начала
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

## Шаг 7. ServerMock — генератор результатов

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
    // Симуляция сетевой задержки
    await new Promise(r => setTimeout(r, 100));

    if (this.balance < bet) throw new Error('Not enough balance');
    this.balance -= bet;

    // Генерируем сетку
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

## Шаг 8. UI компоненты

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

## Шаг 9. GameScene — собираем всё

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

    // Барабаны по центру
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
      // 1. Запрос на сервер
      const response = await ServerMock.spin(this.bet);

      // 2. Анимация спина с финальной сеткой
      await this.reels.spin(response.grid);

      // 3. Обновление баланса
      this.balance.animateTo(response.balance);

      // 4. Показ выигрышей
      if (response.wins.total > 0) {
        this.winDisplay.show(response.wins.total);
        response.wins.lines.forEach(line => {
          this.reels.highlightWin(line.positions);
        });

        // Бахнем камерой если выигрыш большой
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

## Шаг 10. Запуск

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

## Что получится

- **5 барабанов** с прокруткой, каждый последующий останавливается с задержкой
- **5 линий выплат** (3 горизонтальных + 2 диагональных)
- **Подсветка выигрыша** — выигрышные символы пульсируют
- **Анимация баланса** — плавный счётчик
- **Анимация выигрыша** — "WIN: 100" с эффектом подсчёта
- **Camera shake + flash** при больших выигрышах
- **Защита от двойного клика**
- **Spacebar = SPIN**
- **ServerMock** — вся логика "на сервере", клиент только показывает

## Что улучшить дальше

Это основа. Чтобы получить **production-уровень**:

1. **Графика** — заменить rectangles на спрайты в атласе
2. **Звуки** — spin loop, reel stop, win SFX, jingles
3. **Bet selector** — кнопки + и - для смены ставки
4. **Auto-spin** — автоматический режим N спинов
5. **Paytable modal** — окно с правилами и таблицей
6. **Free Spins / Bonus** — отдельная сцена бонус-игры
7. **Animations с Spine** — символы wild с покачиванием
8. **Particles** — конфетти при big-win
9. **Анимация выигрышной линии** — нарисовать линии Graphics + анимировать
10. **Сетевой слой** — заменить ServerMock на реальное API

## Что мы прошли в курсе

✅ Установка и базовая настройка
✅ Game Config
✅ Сцены и переходы
✅ Загрузка ассетов
✅ Display objects (Image, Text, Container, Graphics)
✅ Tweens и animations
✅ Ввод (mouse, keyboard)
✅ Звук
✅ Камера
✅ Адаптивность
✅ Particles
✅ Физика
✅ Архитектура и оптимизация
✅ Прототип слота

## Куда двигаться дальше

1. **Доработай этот слот** — добавь графику, звуки, эффекты
2. **Изучи Spine** — без него production-слотов не бывает: [esotericsoftware.com/spine-runtimes](https://esotericsoftware.com/spine-runtimes)
3. **Изучи GSAP** — лучше встроенных tweens для сложных таймлайнов
4. **Переходи на Pixi.js** — теперь, когда понимаешь Phaser, Pixi покажется проще
5. **Сделай 2-3 разных слота** на Phaser — один с фриспинами, один с бонус-игрой, один с каскадными выигрышами
6. **Изучи production-стек** — Pixi + GSAP + Howler + Spine + WebPack/Vite

## Финальное упражнение

Возьми этот прототип и за неделю-две доведи до играбельного состояния:

1. ✅ Замени rectangles на нормальные карточные/тематические спрайты (можно бесплатные с [Kenney.nl](https://kenney.nl))
2. ✅ Добавь все звуки (spin, stop, win, big-win, click)
3. ✅ Сделай bet selector (3 уровня ставки)
4. ✅ Сделай авто-спин (3, 5, 10 спинов)
5. ✅ Добавь paytable-модалку
6. ✅ Сделай "огоньки" вокруг выигрышных символов через particles
7. ✅ Сделай отдельную UIScene
8. ✅ Деплой на GitHub Pages — и покажи всем

Когда всё это сделаешь — ты готов к индустрии. 🎰

---

**Удачи!** Если в процессе обучения возникнут вопросы — возвращайся к соответствующим главам, экспериментируй на [phaser.io/examples](https://phaser.io/examples) и не бойся читать [исходники Phaser](https://github.com/phaserjs/phaser) — они хорошо документированы.
