# Chapter 3. Scenes

A scene is a **self-contained module** of your game. The menu, a level, a loading screen, a UI on top of gameplay — each one is a separate scene. Scenes can start, stop, pause, and run in parallel.

## Why scenes exist

- **Logic isolation:** menu code doesn't get tangled with level code
- **Reuse:** one scene can be restarted with different parameters (level restart)
- **Parallelism:** UI runs on top of the game scene as a separate layer
- **Memory management:** when a scene is stopped, its resources can be freed

## Creating a scene

There are two ways:

### 1. As a class (recommended)

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) { /* initialization */ }
  preload() { /* asset loading */ }
  create(data) { /* creating objects */ }
  update(time, delta) { /* per-frame */ }
}
```

### 2. As an object (for tiny games)

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

## Scene lifecycle

When a scene starts, the methods are called in this order:

```
init(data)  →  preload()  →  create(data)  →  update(time, delta)  ← loop
```

| Method | When it's called | Purpose |
|---|---|---|
| `init(data)` | Once, before loading | Initialize variables, parse `data` |
| `preload()` | Once, before `create` | Load assets via `this.load` |
| `create(data)` | Once, after loading | Create objects, start animations |
| `update(time, delta)` | Every frame (60+ times/sec) | Game logic, movement |

Additional hooks:

| Method | When |
|---|---|
| `pause()` | When the scene is paused |
| `resume()` | When it resumes |
| `sleep()` | When the scene "sleeps" (hidden but alive) |
| `wake()` | When it wakes |
| `shutdown()` | When stopped (objects get destroyed) |
| `destroy()` | On full removal (rarely used) |

## Scene Manager — `this.scene`

In every scene you have `this.scene` — a plugin for managing scenes.

### Main methods

```js
// Start a scene (the current one stops)
this.scene.start('GameScene');

// Start a scene in parallel (the current one keeps running)
this.scene.launch('UIScene');

// Pass data when starting
this.scene.start('GameScene', { level: 5, score: 100 });

// Restart the current scene
this.scene.restart();

// Restart with data
this.scene.restart({ level: 6 });

// Stop a scene
this.scene.stop('UIScene');

// Pause / resume
this.scene.pause('GameScene');
this.scene.resume('GameScene');

// Sleep / wake (faster than stop/start, doesn't trigger destroy)
this.scene.sleep('UIScene');
this.scene.wake('UIScene');

// Switch (stop current + start the named one)
this.scene.switch('MenuScene');

// Get an instance of another scene
const ui = this.scene.get('UIScene');
ui.events.emit('updateScore', 100);

// Change render order
this.scene.bringToTop('UIScene');     // to the top
this.scene.sendToBack('Background');  // to the bottom
this.scene.moveAbove('A', 'B');       // A above B
```

## Passing data between scenes

### Way 1. Via `start(key, data)`

```js
// From MenuScene
this.scene.start('GameScene', {
  level: 1,
  difficulty: 'hard',
  playerName: 'Sergey'
});

// In GameScene
init(data) {
  this.level = data.level;
  this.difficulty = data.difficulty;
}

create(data) {
  this.add.text(0, 0, `Level ${data.level}`);
}
```

### Way 2. Via events (for parallel scenes)

```js
// In UIScene
const gameScene = this.scene.get('GameScene');
gameScene.events.on('scoreChanged', (score) => {
  this.scoreText.setText(`Score: ${score}`);
});

// In GameScene
this.events.emit('scoreChanged', 250);
```

### Way 3. Via the registry (global storage)

```js
// Set
this.registry.set('playerName', 'Sergey');
this.registry.set('coins', 100);

// Read from any scene
const name = this.registry.get('playerName');

// Listen for changes
this.registry.events.on('changedata-coins', (parent, value, prev) => {
  console.log(`Coins: ${prev} → ${value}`);
});
```

## Pattern: BootScene → PreloadScene → GameScene

This is the **standard pattern** for any Phaser game.

### `BootScene` — minimal init

Loads only what's needed for a nice loading screen (logo, progress bar).

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

### `PreloadScene` — loading all assets

Shows progress, loads everything the game needs.

```js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // The logo is already loaded in BootScene — display it
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2 - 50, 'logo');

    // Progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 50, 320, 30);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 60, 300 * value, 10);
    });

    // Load the main assets
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

### `GameScene` — the main gameplay

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.image(640, 360, 'background');
    // start the UI in parallel
    this.scene.launch('UIScene');
  }
}
```

## Parallel scenes (UI on top of the game)

The UI is often built as a separate scene:

```js
// In GameScene
create() {
  // build the game world
  this.scene.launch('UIScene');  // UI runs in parallel
}
```

Benefits:
- The UI doesn't move with the game camera
- You can pause gameplay while keeping the UI active
- Clean separation of concerns

## Lifecycle on transitions

| Action | What happens |
|---|---|
| `start(B)` from A | A.shutdown() → B.init() → B.preload() → B.create() |
| `launch(B)` from A | A keeps running, in parallel B.init() → preload() → create() |
| `pause(A)` | A.pause() — update stops being called, objects stay |
| `sleep(A)` | A.sleep() — invisible + update stopped, but objects live on |
| `stop(A)` | A.shutdown() — all objects are destroyed |

## Important pitfalls

### 1. Objects aren't destroyed on `pause`

If you pause a scene, its objects keep living. On `stop` — they're destroyed. This affects memory.

### 2. Event listeners

On a scene's `shutdown`, listeners on Phaser's own objects (`this.input.on`, `this.events.on`) are **cleaned up automatically**. But DOM or global listeners aren't — you have to remove those yourself.

```js
shutdown() {
  window.removeEventListener('resize', this.onResize);
}
```

### 3. `update` after `stop`

Once you call `scene.stop(key)`, `update` is no longer called. Don't try to put "on close" logic there — use `shutdown` instead.

### 4. Unique keys

Every scene must have a **unique** `key`. Otherwise the Scene Manager will get confused.

## Useful patterns for slots

### Pattern 1. Game + UI

```
GameScene  — reels, symbols, background
UIScene    — spin button, balance, bet, history
```

The UI receives events from GameScene:
```js
// UIScene
const game = this.scene.get('GameScene');
game.events.on('spin-complete', this.onSpinComplete, this);
game.events.on('win', this.showWin, this);
```

### Pattern 2. Bonus Game

When a bonus triggers, a separate scene starts:

```js
// In GameScene
if (bonusTriggered) {
  this.scene.sleep();          // pause the main game
  this.scene.launch('BonusScene', { spins: 10 });
}

// In BonusScene when it ends
this.scene.stop();
this.scene.wake('GameScene');
```

---

## ✅ Exercise 3

In the project from Chapter 1:

1. Create 3 scenes: `MenuScene`, `GameScene`, `GameOverScene`.
2. In `MenuScene` add a "Click to start" text — clicking it goes to `GameScene` with the data `{ level: 1 }`.
3. In `GameScene` print the level you received. On Spacebar, go to `GameOverScene` with `{ score: 100 }`.
4. In `GameOverScene` show the score and a "Press R to restart" text — pressing R returns to `MenuScene`.
5. **Bonus:** launch `UIScene` in parallel with `GameScene`, displaying a "Time: 0" counter that increments every second (via `this.time.addEvent`).

When it works — head over to [Chapter 4. Asset loading](./04-assets.md).
