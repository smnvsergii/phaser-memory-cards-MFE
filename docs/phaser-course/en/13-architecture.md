# Chapter 13. Architecture and optimization

In the previous chapters you learned **what** Phaser gives you. This chapter is about **how** to structure a big project so it doesn't turn into a mess in a month.

## Project structure (for a slot)

```
src/
├── main.js                  # entry point
├── config.js                # game config
├── core/
│   ├── EventBus.js          # global events
│   ├── StateMachine.js      # state machine
│   ├── AssetManifest.js     # asset list
│   ├── AudioManager.js      # sound wrapper
│   └── Logger.js            # logger
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── GameScene.js
│   └── UIScene.js
├── slot/
│   ├── ReelManager.js       # all reels
│   ├── Reel.js              # one reel
│   ├── Symbol.js            # symbol
│   ├── PaytableData.js      # paytable
│   ├── WinEvaluator.js      # win evaluation
│   └── ServerMock.js        # server simulator (RNG)
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

## Principles

### 1. **Scenes are controllers**, not God classes

A scene coordinates: it kicks off actions, passes data. Move logic into separate classes.

❌ **Bad:**
```js
class GameScene extends Phaser.Scene {
  create() {
    // 500 lines of building everything: reels, UI, sounds, handlers...
  }

  update() {
    // another 200 lines of all of the above
  }
}
```

✅ **Good:**
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

### 2. Build complex Game Objects via **inheritance**

When you have a complex object (a reel, a symbol, a button) — make a separate class.

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

Usage:
```js
const symbol = new Symbol(this, 100, 100, 'ace.png');
symbol.playWinAnimation();
```

### 3. Use an **EventBus** to wire modules together

Modules **shouldn't** know about each other directly — they communicate via events.

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

⚠️ Don't forget to unsubscribe on the scene's `shutdown`.

### 4. **State Machine** for the game

A slot is a finite-state machine: `idle → spinning → stopping → win → idle`. Any logic gets simpler when the state is explicit.

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

Usage:
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

// Transition
this.fsm.transition('spinning');
```

### 5. **Server-driven logic** (important for slots)

A real slot **never** computes wins on the client. The client:
1. Asks for a spin → sends to the server
2. Receives the result (symbols, wins)
3. Just **plays** the animation

```js
// slot/ServerMock.js — for development
export class ServerMock {
  static async spin(bet) {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 200));

    // Random symbols
    const symbols = generateRandomSymbols();
    const wins = evaluateOnServerSide(symbols, bet);

    return {
      reels: symbols,           // 5 columns of 3 symbols
      wins,                     // [{ line: 1, symbols: [...], amount: 100 }]
      totalWin: wins.reduce((s, w) => s + w.amount, 0),
      newBalance: 950
    };
  }
}
```

This makes migration to a real server later much easier — you just swap out ServerMock.

## Object Pooling — reusing objects

Creating/destroying GameObjects is expensive. If you're shooting 100 bullets or spawning 50 confetti particles — better use a **pool**.

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

// Usage
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

Phaser also has a built-in `Group` with pooling:

```js
const group = this.add.group({ defaultKey: 'coin', maxSize: 50 });
const coin = group.get(x, y);   // pulls from the pool or creates one
coin.setActive(true).setVisible(true);
// later
coin.setActive(false).setVisible(false);
```

## Profiling — finding the slow spots

### 1. Phaser Debug

In the config:
```js
fps: { target: 60 },
physics: { arcade: { debug: true } }
```

In a scene:
```js
this.add.text(10, 10, '', { color: '#0f0' }).setName('fps');

update() {
  this.children.getByName('fps').setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
}
```

### 2. Chrome DevTools Performance

- F12 → "Performance" tab
- Record 5 seconds of gameplay
- Look at the Frame Chart — where the red blocks are (slow frames)
- Top suspects: object creation in `update`, heavy shaders, too many draw calls

### 3. Spector.js (for WebGL)

A Chrome extension. Shows draw calls, textures, shaders. If you have more than 100 draw calls per frame — you have a batching problem.

## Optimizations that actually work

### 1. Use **atlases**

One draw call instead of dozens:
```
[card1.png] [card2.png] [card3.png] → 3 draw calls
[symbols.atlas] (everything in one texture) → 1 draw call
```

### 2. **BitmapText** for dynamic text

Every `text.setText()` creates a new texture. For counters and timers — use `BitmapText`.

### 3. **`setVisible(false)` instead of destroy**

If you'll need the object again soon — don't destroy it. Hide it.

### 4. **`update()` not everywhere**

Don't put heavy logic in every scene's `update()`. Use events and timers:

```js
this.time.addEvent({
  delay: 1000,
  callback: this.checkSomething,
  loop: true
});
```

### 5. **Don't create objects in `update()`**

❌ Bad:
```js
update() {
  if (key.isDown) this.add.particles(...);  // created every frame!
}
```

✅ Good:
```js
update() {
  if (Phaser.Input.Keyboard.JustDown(key)) {
    this.particles.explode(20);   // reuse
  }
}
```

### 6. **`setDepth` correctly**

Phaser sorts objects by depth. Too many depth changes — overhead. Assign in groups:

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

### 7. **Power-of-two** texture sizes

WebGL likes 256×256, 512×512, 1024×1024, 2048×2048. With big atlases — noticeably faster.

### 8. Compress **audio**

96 kbps MP3 for SFX, 128 kbps for music. No WAV.

### 9. **Kill stray animations**

Endless tweens on invisible objects are unnecessary load. Stop them:

```js
hide() {
  this.tweens.killTweensOf(this);
  this.setVisible(false);
}
```

### 10. **Lazy-load**

Don't load bonus assets in `PreloadScene` — load them when entering the bonus.

## Target metrics for a slot

| Metric | Target |
|---|---|
| Build size | < 5 MB (no Spine), < 15 MB (with Spine) |
| Load time on 4G | < 5 sec |
| FPS on iPhone 8 | steady 60 |
| FPS on a budget Android | steady 30+ |
| Draw calls per frame | < 50 |
| Memory | < 200 MB on iOS |

## Pre-release checklist

- [ ] All assets in atlases
- [ ] BitmapText for counters
- [ ] Object pool for particles
- [ ] Sounds in an audio sprite
- [ ] Progress bar on load
- [ ] Mute button
- [ ] Pause on focus loss
- [ ] Fullscreen button
- [ ] Portrait/landscape responsiveness
- [ ] Double-click protection on SPIN
- [ ] Loading screen on every network request
- [ ] Network error handling
- [ ] Minification and tree-shaking (Vite does this)
- [ ] Tested on 3 devices: iOS, Android, Desktop

---

## ✅ Exercise 13

1. Take the project from any earlier chapter. Split the scene into:
   - `EventBus.js` — global events
   - `Card.js` — a Container subclass for the card
   - `GameScene.js` — coordination only
2. Build a simple `StateMachine` with `idle`, `flipping`, `matching` states.
3. Create an Object Pool for particle stars (create 50 up front, reuse them).
4. Hook up an FPS meter in a corner.
5. **Bonus:** measure FPS before and after the optimizations. Open Performance in Chrome DevTools and run a profile.

[Chapter 14. Slot prototype in Phaser](./14-slot-prototype.md)
