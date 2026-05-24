# Chapter 14. Slot prototype in Phaser

The final chapter. Here we'll bring everything we covered together into a working slot prototype: 5 reels × 3 symbols, 5 lines, a SPIN button, balance, and wins.

This is a **learning** prototype — without production-grade graphics, but with the right architecture.

## What we're going to build

```
┌──────────────────────────────────────┐
│         Background image             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  │ ♠ │ │ ♥ │ │ ♣ │ │ ♦ │ │ ★ │  ← symbols
│  │ ♥ │ │ ★ │ │ ♣ │ │ ♥ │ │ ♠ │  ← 3 visible rows
│  │ ★ │ │ ♣ │ │ ♥ │ │ ★ │ │ ♦ │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
│  Balance: 1000   Bet: 10   Win: 0       │
│              [   SPIN   ]                │
└──────────────────────────────────────┘
```

## Project structure

```
src/
├── main.js
├── config.js
├── core/
│   ├── EventBus.js
│   └── StateMachine.js
├── slot/
│   ├── SlotConfig.js        # slot configuration
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

## Step 1. Slot configuration

```js
// src/slot/SlotConfig.js
export const SLOT_CONFIG = {
  reels: 5,
  rows: 3,
  symbolSize: 100,
  symbolSpacing: 10,

  // Available symbols (atlas keys)
  symbols: ['ace', 'king', 'queen', 'jack', 'ten', 'star', 'heart'],

  // Weights for random output (higher = more frequent)
  weights: {
    ace:   3,
    king:  4,
    queen: 5,
    jack:  6,
    ten:   8,
    star:  1,    // rare — wild
    heart: 2     // scatter
  },

  // Paytable: symbol → { 3:x, 4:x, 5:x } per consecutive count
  paytable: {
    ace:   { 3: 10,  4: 30,  5: 100 },
    king:  { 3: 8,   4: 20,  5: 75 },
    queen: { 3: 5,   4: 15,  5: 50 },
    jack:  { 3: 4,   4: 10,  5: 30 },
    ten:   { 3: 2,   4: 6,   5: 20 },
    star:  { 3: 50,  4: 200, 5: 1000 },
    heart: { 3: 5,   4: 25,  5: 100 }
  },

  // Win lines (5 simple horizontal/diagonal)
  lines: [
    [0, 0, 0, 0, 0],   // top row
    [1, 1, 1, 1, 1],   // middle
    [2, 2, 2, 2, 2],   // bottom
    [0, 1, 2, 1, 0],   // V
    [2, 1, 0, 1, 2]    // ^
  ]
};
```

## Step 2. EventBus

```js
// src/core/EventBus.js
import Phaser from 'phaser';
export const EventBus = new Phaser.Events.EventEmitter();
```

## Step 3. Symbol class

```js
// src/slot/Symbol.js
import Phaser from 'phaser';

export default class Symbol extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key) {
    super(scene, x, y);
    this.symbolKey = key;

    // Here key is an image name. You could use an atlas.
    // In the prototype we'll use a simple Image.
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

## Step 4. Reel class

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
    // Create 3 visible + 1 invisible above for scrolling
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
   * Spin the reel and finish on the given symbols (3 visible).
   * @param {string[]} finalSymbols — 3 symbols top to bottom
   * @param {number} delayBeforeStop — ms before stop (for cascade)
   */
  async spin(finalSymbols, delayBeforeStop) {
    return new Promise(resolve => {
      // 1. Ramp-up — symbols slide down quickly
      const spinCycle = () => {
        return this.scene.tweens.add({
          targets: this.symbols,
          y: `+=${this.cellSize}`,
          duration: 80,
          ease: 'Linear',
          onComplete: () => {
            // Move the bottom symbol back up to the top and re-randomize
            this.symbols.forEach(s => {
              if (s.y >= (SLOT_CONFIG.rows - 1) * this.cellSize) {
                s.y -= SLOT_CONFIG.rows * this.cellSize;
                s.setSymbol(this.randomSymbolKey());
              }
            });
          }
        });
      };

      // Run the cycles
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

      // After delayBeforeStop, set the flag — after the next cycle the reel stops
      this.scene.time.delayedCall(delayBeforeStop, () => {
        this.shouldStop = true;
      });
    });
  }

  finalLanding(finalSymbols, resolve) {
    // Place symbols and animate the "landing"
    finalSymbols.forEach((key, i) => {
      this.symbols[i + 1].setSymbol(key);   // [0] — invisible above
      this.symbols[i + 1].y = i * this.cellSize;
    });
    // Random one above
    this.symbols[0].setSymbol(this.randomSymbolKey());
    this.symbols[0].y = -this.cellSize;

    // "Bump" effect at the bottom
    this.scene.tweens.add({
      targets: this.symbols.slice(1),
      y: '+=10',
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: resolve
    });
  }

  /** Get the 3 visible symbols */
  getVisibleSymbols() {
    return this.symbols.slice(1, SLOT_CONFIG.rows + 1).map(s => s.symbolKey);
  }

  /** Get a symbol at a specific position (0..rows-1) */
  getSymbolAt(row) {
    return this.symbols[row + 1];
  }
}
```

## Step 5. Reel manager

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

    // Mask — show only 3 rows
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
   * @param {string[][]} finalGrid — 5 columns of 3 symbols
   */
  async spin(finalGrid) {
    const promises = this.reels.map((reel, i) =>
      reel.spin(finalGrid[i], 800 + i * 200)   // each subsequent one stops later
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

## Step 6. Win evaluation

```js
// src/slot/WinEvaluator.js
import { SLOT_CONFIG } from './SlotConfig.js';

export class WinEvaluator {
  /**
   * @param {string[][]} grid — 5 columns of 3 symbols (grid[col][row])
   * @returns {{lines: Array, total: number}}
   */
  static evaluate(grid, bet) {
    const wins = [];

    SLOT_CONFIG.lines.forEach((linePattern, lineIndex) => {
      const lineSymbols = linePattern.map((row, col) => grid[col][row]);
      const first = lineSymbols[0];

      // Count how many matching ones in a row from the start
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

## Step 7. ServerMock — result generator

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
    // Simulate network delay
    await new Promise(r => setTimeout(r, 100));

    if (this.balance < bet) throw new Error('Not enough balance');
    this.balance -= bet;

    // Generate the grid
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

## Step 8. UI components

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

## Step 9. GameScene — putting it all together

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

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);
    this.add.text(width / 2, 40, 'PHASER SLOT', {
      fontSize: '32px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Reels in the center
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
      // 1. Server request
      const response = await ServerMock.spin(this.bet);

      // 2. Spin animation with the final grid
      await this.reels.spin(response.grid);

      // 3. Update balance
      this.balance.animateTo(response.balance);

      // 4. Show wins
      if (response.wins.total > 0) {
        this.winDisplay.show(response.wins.total);
        response.wins.lines.forEach(line => {
          this.reels.highlightWin(line.positions);
        });

        // Camera kick if the win is big
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

## Step 10. Launch

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

## What you'll get

- **5 reels** with scrolling, each one stopping a bit later than the previous
- **5 paylines** (3 horizontal + 2 diagonal)
- **Win highlighting** — winning symbols pulse
- **Balance animation** — smooth counter
- **Win animation** — "WIN: 100" with a count-up effect
- **Camera shake + flash** on big wins
- **Double-click protection**
- **Spacebar = SPIN**
- **ServerMock** — all the logic "on the server", the client just plays it back

## What to improve next

This is the foundation. To get to **production quality**:

1. **Graphics** — replace rectangles with sprites in an atlas
2. **Sounds** — spin loop, reel stop, win SFX, jingles
3. **Bet selector** — + and – buttons to change the bet
4. **Auto-spin** — automatic mode, N spins
5. **Paytable modal** — a window with rules and the table
6. **Free Spins / Bonus** — a separate scene for the bonus game
7. **Animations with Spine** — wild symbols with a wobble
8. **Particles** — confetti on big-win
9. **Win line animation** — draw the lines with Graphics + animate them
10. **Network layer** — replace ServerMock with a real API

## What we covered in the course

✅ Installation and basic setup
✅ Game Config
✅ Scenes and transitions
✅ Asset loading
✅ Display objects (Image, Text, Container, Graphics)
✅ Tweens and animations
✅ Input (mouse, keyboard)
✅ Sound
✅ Camera
✅ Responsiveness
✅ Particles
✅ Physics
✅ Architecture and optimization
✅ Slot prototype

## Where to go from here

1. **Polish this slot** — add graphics, sounds, effects
2. **Learn Spine** — production slots aren't shipped without it: [esotericsoftware.com/spine-runtimes](https://esotericsoftware.com/spine-runtimes)
3. **Learn GSAP** — better than the built-in tweens for complex timelines
4. **Move to Pixi.js** — now that you understand Phaser, Pixi will feel simpler
5. **Build 2-3 different slots** in Phaser — one with free spins, one with a bonus game, one with cascading wins
6. **Learn the production stack** — Pixi + GSAP + Howler + Spine + Webpack/Vite

## Final exercise

Take this prototype and over a week or two bring it to a playable state:

1. ✅ Replace rectangles with proper card/themed sprites (free assets at [Kenney.nl](https://kenney.nl))
2. ✅ Add all the sounds (spin, stop, win, big-win, click)
3. ✅ Build a bet selector (3 bet levels)
4. ✅ Add auto-spin (3, 5, 10 spins)
5. ✅ Add a paytable modal
6. ✅ Add "sparkles" around winning symbols using particles
7. ✅ Build a separate UIScene
8. ✅ Deploy to GitHub Pages — and show it off

When you've done all this — you're ready for the industry. 🎰

---

**Good luck!** If questions come up while you learn — go back to the relevant chapters, experiment at [phaser.io/examples](https://phaser.io/examples), and don't be afraid to read [Phaser's source code](https://github.com/phaserjs/phaser) — it's well documented.
