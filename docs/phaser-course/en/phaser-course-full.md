# 🎮 Phaser 3 Course — From Zero to Slot Prototype

A complete Phaser 3 learning course in English. Each chapter contains:
- **Theory** — what and why
- **Code examples** — working snippets you can copy
- **Practice** — exercises to lock things in

The goal of the course: by the end you'll be able to build a slot game (or any 2D game) on Phaser 3 on your own.

---

## 📚 Course outline

### Part 1. Fundamentals
- [Chapter 0. Introduction to Phaser](./00-introduction.md) — what it is, history, ecosystem, when to use it
- [Chapter 1. Project setup](./01-setup.md) — Vite, project structure, first run
- [Chapter 2. Game Config](./02-game-config.md) — game configuration, renderers
- [Chapter 3. Scenes](./03-scenes.md) — lifecycle, switching, passing data

### Part 2. Content
- [Chapter 4. Asset loading (Loader)](./04-assets.md) — images, atlases, audio, fonts
- [Chapter 5. Display Objects](./05-display-objects.md) — Sprite, Image, Graphics, Text, Container
- [Chapter 6. Animations and Tweens](./06-animations-tweens.md) — sprite animations, smooth motion

### Part 3. Interaction
- [Chapter 7. Input](./07-input.md) — mouse, touch, drag-and-drop, keyboard
- [Chapter 8. Sound](./08-sound.md) — Sound Manager, sprite sounds
- [Chapter 9. Camera](./09-camera.md) — scroll, zoom, effects
- [Chapter 10. Scale Manager](./10-scale-manager.md) — responsiveness, mobile/desktop

### Part 4. Advanced
- [Chapter 11. Particle System](./11-particles.md) — emitters, win effects
- [Chapter 12. Physics (Arcade)](./12-physics.md) — collisions, bodies, groups
- [Chapter 13. Architecture and optimization](./13-architecture.md) — patterns, pooling, profiling

### Part 5. Practical project
- [Chapter 14. Slot prototype in Phaser](./14-slot-prototype.md) — building reels, win logic, animations

---

## 🎯 How to study

1. Read each chapter in order — theory → code → exercise
2. **Always do the practice.** Without it, the material won't stick
3. Write each exercise from scratch — don't copy from the chapter
4. Every 3–4 chapters, go back to your old code and improve it
5. After Chapter 14 — build your own mini slot without any hints

## ⏱ Approximate pace

| Part | Time (hours) |
|---|---|
| Part 1 (Fundamentals) | 6–8 h |
| Part 2 (Content) | 8–10 h |
| Part 3 (Interaction) | 10–12 h |
| Part 4 (Advanced) | 8–10 h |
| Part 5 (Slot) | 15–20 h |
| **Total** | **~50–60 h** (4–6 weeks at 1–2 hours per day) |

## 🔗 Useful links

- [Official Phaser 3 documentation](https://phaser.io/docs/3)
- [API Reference](https://newdocs.phaser.io/docs/3.80.0)
- [Phaser Examples (1700+ examples)](https://phaser.io/examples)
- [Phaser Discord](https://discord.gg/phaser)

## 🛠 Version

The course targets **Phaser 3.80+** (the current stable). If you're on a different version — check the changelog, but the core principles stay the same.

## 📥 Download as a single file

If you want to read offline on your phone in one document:

👉 [phaser-course-full.md](./phaser-course-full.md) — all 15 chapters in one file (~175 KB)

On a phone: open the link → "Raw" → browser menu → "Save page" / "Share → Save to Files". Any Markdown reader (Obsidian, iA Writer, Markor) will open it.

---

Good luck with your learning! 🚀


---

# Chapter 0. Introduction to Phaser

## What Phaser is

**Phaser** is an HTML5 framework for building 2D games in the browser. It's written in JavaScript/TypeScript and uses **WebGL** under the hood (with a Canvas fallback).

Phaser is a **complete game engine** that already ships with:
- A 2D graphics renderer (WebGL/Canvas)
- A scene system and game loop
- An asset loader
- Animations (sprite + tweens)
- Input (mouse, touch, keyboard, gamepad)
- An audio manager
- Physics engines (Arcade, Matter.js)
- Camera, particles, text, masks
- Responsiveness (Scale Manager)

In other words, Phaser gives you **everything you need out of the box**, unlike Pixi.js (renderer only) or raw WebGL.

## Phaser versions

- **Phaser 2 (CE)** — legacy, ES5, don't use it for new projects
- **Phaser 3** — current, ES6+, fully reworked architecture
- **Phaser 4** — in development (as of 2026), not released yet

This course uses **Phaser 3.80+**.

## Where Phaser is used

- Casual / hyper-casual games (Match-3, runners, puzzles)
- Educational games
- Ad games (playable ads)
- **Slots and casual casino games** (though the industry more often picks Pixi)
- Prototypes that get ported later

## Phaser vs Pixi vs Unity (just to put things in perspective)

| | Phaser | Pixi.js | Unity |
|---|---|---|---|
| Type | Framework | Renderer only | Full engine |
| Language | JS/TS | JS/TS | C# |
| Platform | Browser | Browser | Everywhere |
| Learning curve | Low | Low (but you write a lot yourself) | High |
| Out-of-the-box readiness | High | Low | Very high |
| Performance | Medium | High | Very high |
| Good for slots | Yes (for prototypes) | Yes (production standard) | Rarely |

**Bottom line:** Phaser is ideal for learning and quick prototypes. Once you've mastered it, the move to Pixi will be easy.

## Architecture of a Phaser game

```
┌─────────────────────────────────┐
│           Phaser.Game           │  ← the root object
│  ┌───────────────────────────┐  │
│  │      Scene Manager        │  │  ← manages scenes
│  │  ┌─────────────────────┐  │  │
│  │  │   BootScene         │  │  │  ← quick init
│  │  │   PreloadScene      │  │  │  ← asset loading
│  │  │   MenuScene         │  │  │  ← menu
│  │  │   GameScene         │  │  │  ← gameplay
│  │  │   UIScene           │  │  │  ← UI on top of the game
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Loader / Cache / Sound   │  │
│  │  Input / Physics / Tweens │  │
│  │  Renderer / Camera        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## Key concepts (quick glossary)

| Term | Meaning |
|---|---|
| **Game** | The root object, an instance of Phaser.Game |
| **Scene** | A self-contained game module (menu, level, UI) |
| **GameObject** | Anything on a scene (Sprite, Text, Graphics) |
| **Texture** | An image loaded into GPU memory |
| **Atlas** | One file with many sprites + a JSON with their coordinates |
| **Tween** | A smooth animation of properties (alpha, x, scale, ...) |
| **Animation** | Frame-by-frame animation based on a spritesheet |
| **Cache** | Storage for loaded assets |
| **Loader** | The asset-loading manager |

## What you need to get started

1. **Node.js 18+** and npm
2. Any editor (VS Code, WebStorm)
3. A modern browser (Chrome/Firefox)
4. Basic JavaScript (ES6+, classes, promises, modules)

## What you **don't** need to know (Phaser hides it for you)

- WebGL and shaders (at the start)
- Matrix math (at the start)
- Low-level Canvas API work

---

## ✅ Exercise 0

There's no code in this chapter. Instead:

1. Open [phaser.io/examples](https://phaser.io/examples) and **browse for about 15 minutes**. Get a feel for what Phaser can do.
2. Find the "Tweens" → "Yoyo" section — you'll need this for pulsing slot symbols.
3. Find the "Masks" section — you'll need this for slot reels.

When you're ready — head over to [Chapter 1. Project setup](./01-setup.md).


---

# Chapter 1. Project setup

## Ways to include Phaser

There are two paths:

1. **CDN** (via `<script>`) — for quick tests, not for production
2. **npm + bundler (Vite/Webpack)** — for serious projects

We'll go with the second option using **Vite** — a modern, fast, simple bundler.

## Creating a project from scratch

### Step 1. Initialize

```bash
mkdir my-phaser-game
cd my-phaser-game
npm init -y
```

### Step 2. Install dependencies

```bash
npm install phaser
npm install -D vite
```

### Step 3. Project structure

Create the following layout:

```
my-phaser-game/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── assets/
│       ├── sprites/
│       └── sounds/
└── src/
    ├── main.js
    ├── config.js
    └── scenes/
        ├── BootScene.js
        ├── PreloadScene.js
        └── GameScene.js
```

### Step 4. `package.json` — add scripts

```json
{
  "name": "my-phaser-game",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "phaser": "^3.80.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

⚠️ Note `"type": "module"` — it's required for ES modules.

### Step 5. `vite.config.js`

```js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

### Step 6. `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My Phaser Game</title>
  <style>
    body { margin: 0; background: #000; }
    #game { display: flex; justify-content: center; align-items: center; height: 100vh; }
  </style>
</head>
<body>
  <div id="game"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### Step 7. `src/config.js` — game configuration

```js
import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#1a1a2e',
  scene: [BootScene, PreloadScene, GameScene]
};
```

### Step 8. `src/main.js` — entry point

```js
import Phaser from 'phaser';
import { config } from './config.js';

const game = new Phaser.Game(config);
```

### Step 9. The simplest scenes

`src/scenes/BootScene.js`:

```js
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    console.log('Boot OK');
    this.scene.start('PreloadScene');
  }
}
```

`src/scenes/PreloadScene.js`:

```js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // We'll load assets here in the next chapters
  }

  create() {
    this.scene.start('GameScene');
  }
}
```

`src/scenes/GameScene.js`:

```js
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.text(400, 300, 'Hello Phaser!', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}
```

### Step 10. Run it

```bash
npm run dev
```

The browser will open at `http://localhost:5173` — you should see "Hello Phaser!" on a dark background.

## Production build

```bash
npm run build
```

Vite creates a `dist/` folder with minified code and assets. You can upload these files to any static host (GitHub Pages, Netlify, Vercel).

## Alternative: import Phaser as a global

If you're going old-school (via a `<script>` tag in HTML):

```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.80.0/dist/phaser.min.js"></script>
<script>
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      create() {
        this.add.text(400, 300, 'Hello!', { fontSize: '32px' }).setOrigin(0.5);
      }
    }
  });
</script>
```

**Don't use this approach for serious projects** — no modules, no async loading, no tree-shaking.

## Common beginner mistakes

| Error | Cause |
|---|---|
| `Phaser is not defined` | Forgot `import Phaser from 'phaser'` |
| Black screen | Wrong `parent` or an error in the scene |
| Assets don't load | Files aren't in `public/` or the path is wrong |
| `Cannot use import statement` | No `"type": "module"` in package.json |
| CORS error | You opened `index.html` directly (file://). Run via `npm run dev` |

## Structure for a slot game (looking ahead)

For slots I recommend this structure:

```
src/
├── main.js
├── config.js
├── core/
│   ├── StateMachine.js
│   ├── EventBus.js
│   └── AssetManifest.js
├── scenes/
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── GameScene.js
│   └── UIScene.js
├── slot/
│   ├── Reel.js          ← a single reel
│   ├── ReelManager.js   ← all the reels
│   ├── Symbol.js        ← a single symbol
│   ├── PaytableData.js  ← the paytable
│   └── WinEvaluator.js  ← win logic
└── ui/
    ├── SpinButton.js
    ├── BalanceDisplay.js
    └── BetSelector.js
```

We'll come back to this structure in Chapter 14.

---

## ✅ Exercise 1

1. Create a brand new empty project following the instructions above (don't copy from an existing repo).
2. Run `npm run dev` — you should see "Hello Phaser!".
3. **Change** the text to your nickname.
4. **Change** the `backgroundColor` to your favorite color.
5. **Add** a second text below the first that says "Loading..." (use `this.add.text` again).
6. Run `npm run build` — take a look at what's in `dist/`.

Once it's working — head over to [Chapter 2. Game Config](./02-game-config.md).


---

# Chapter 2. Game Config — game configuration

`Game Config` is the object you pass into `new Phaser.Game(config)`. It defines **everything** about your game at the top level: size, renderer, physics, plugins, scenes.

## Minimal config

```js
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene]
};
```

## Full config with annotations

```js
const config = {
  // === Renderer ===
  type: Phaser.AUTO,           // AUTO | WEBGL | CANVAS | HEADLESS

  // === Canvas size ===
  width: 1280,
  height: 720,

  // === DOM ===
  parent: 'game',              // id of the container element
  canvas: undefined,           // you can hand in an existing <canvas>
  canvasStyle: '',             // CSS for the canvas
  expandParent: true,

  // === Background color ===
  backgroundColor: '#1a1a2e',

  // === Scenes ===
  scene: [BootScene, PreloadScene, GameScene],

  // === Scaling ===
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
    min: { width: 320, height: 480 },
    max: { width: 1920, height: 1080 }
  },

  // === Physics ===
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },

  // === Input ===
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false,
    activePointers: 3          // how many fingers to track at once
  },

  // === Audio ===
  audio: {
    disableWebAudio: false,
    noAudio: false
  },

  // === Rendering ===
  render: {
    pixelArt: false,           // true = sharp scaling without smoothing
    antialias: true,
    roundPixels: false,
    transparent: false,
    powerPreference: 'high-performance' // 'default' | 'high-performance' | 'low-power'
  },

  // === FPS ===
  fps: {
    target: 60,
    forceSetTimeOut: false,
    smoothStep: true
  },

  // === Plugins ===
  plugins: {
    global: [],
    scene: []
  },

  // === DOM ===
  dom: {
    createContainer: false
  }
};
```

## Section by section

### `type`

| Value | What it does |
|---|---|
| `Phaser.AUTO` | Picks for you: WebGL if available, otherwise Canvas (recommended) |
| `Phaser.WEBGL` | WebGL only. If unsupported — error |
| `Phaser.CANVAS` | 2D Canvas only. Slower, but universal |
| `Phaser.HEADLESS` | No rendering (for server-side tests) |

**Use `Phaser.AUTO` always**, except in special cases.

### `width` / `height`

This is the **internal logical size of the game**. All coordinates inside (x=400, y=300) are measured in these units. The actual on-screen size is determined by `scale`.

For slots, common picks are:
- **Landscape:** 1280×720 or 1920×1080
- **Portrait:** 720×1280 or 1080×1920
- **Universal:** 1280×800 (a compromise)

### `parent`

The DOM element where Phaser will insert its `<canvas>`. You can pass:
- An ID string: `'game'`
- A DOM element: `document.getElementById('game')`
- Nothing — the canvas will be appended to `<body>`

### `backgroundColor`

The color behind the entire render. Accepts:
- A hex string: `'#1a1a2e'`
- A hex number: `0x1a1a2e`
- A CSS name: `'red'`

If you set `render.transparent: true`, the background color is ignored and the canvas becomes transparent (useful for embedding into a page).

### `scene`

An array of scenes. **The first scene in the array starts automatically.** The others can be started via `this.scene.start('Key')`.

You can pass:
- An array of classes: `[BootScene, GameScene]`
- An array of objects: `[{ key: 'GameScene', preload, create, update }]`
- A single object (for the simplest games)

### `render` — the details

**`pixelArt: true`** — critical for pixel art. Switches on `nearest neighbor` filtering instead of `linear`. Without it, a pixel sprite will blur when scaled up.

```js
render: {
  pixelArt: true,
  antialias: false,
  roundPixels: true
}
```

**`powerPreference`** — for mobile. On laptops it asks for the discrete GPU instead of the integrated one.

**`transparent: true`** — the canvas becomes transparent and the HTML behind it shows through. Handy for overlays, but adds a bit of overhead.

### `fps`

```js
fps: {
  target: 60,           // target FPS
  forceSetTimeOut: false,  // don't use requestAnimationFrame
  smoothStep: true      // smooth deltaTime
}
```

`target: 60` doesn't mean "cap at 60 FPS". It affects physics and timing; the actual frame rate matches your monitor (60/120/144 Hz).

## Example config for a slot game

```js
export const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0a0a1a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  render: {
    antialias: true,
    powerPreference: 'high-performance'
  },
  // Slots usually don't need physics
  scene: [BootScene, PreloadScene, GameScene, UIScene]
};
```

## Accessing the config from a scene

```js
create() {
  const { width, height } = this.scale.gameSize;
  console.log(this.game.config);     // full config
  console.log(this.sys.game.config.width); // width
}
```

## Changing the config **at runtime**

Most parameters **can't** be changed after `new Phaser.Game()`. But here's what you can do:

```js
// Resize
this.scale.resize(1920, 1080);

// Change the background color
this.cameras.main.setBackgroundColor('#ff0000');

// Toggle physics debug
this.physics.world.drawDebug = true;
```

## Multiple games on a page

You can create several `Phaser.Game` instances on the same page:

```js
const game1 = new Phaser.Game({ ...config1, parent: 'slot1' });
const game2 = new Phaser.Game({ ...config2, parent: 'slot2' });
```

Useful, for example, for a page with a gallery of slots.

---

## ✅ Exercise 2

In the project from Chapter 1:

1. **Change** the size to 1280×720.
2. **Enable** `scale.mode: Phaser.Scale.FIT` and `autoCenter` — the game should stay centered as the window is resized.
3. **Change** the `backgroundColor` via `cameras.main.setBackgroundColor()` in `create()` — see how this works differently.
4. **Try** setting `render.pixelArt: true` — can you see a difference on the text?
5. **Open the console** and log `this.sys.game.config` from `create()` — explore what's in there.

Once you've poked around — head over to [Chapter 3. Scenes](./03-scenes.md).


---

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


---

# Chapter 4. Asset loading (Loader)

Without assets, a game is just an empty canvas. In Phaser, loading is the job of the **Loader** — `this.load`, available in every scene.

## Where to keep assets

In a Vite project, the `public/` folder is copied to the root at build time as-is. So:

```
public/
└── assets/
    ├── sprites/
    │   ├── background.webp
    │   ├── card.webp
    │   └── symbols.atlas.png
    ├── sounds/
    │   ├── spin.mp3
    │   └── win.mp3
    └── fonts/
        └── game-font.ttf
```

In code the path will be `'assets/sprites/background.webp'` (without `public/`).

## When to load

In the scene's `preload()` method:

```js
preload() {
  this.load.image('logo', 'assets/sprites/logo.png');
  this.load.audio('theme', 'assets/sounds/theme.mp3');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
}

create() {
  // by here all assets are available
  this.add.image(400, 300, 'logo');
}
```

Phaser **automatically** runs the load before `create()` and waits.

## Asset types

### 1. Image

```js
this.load.image('key', 'assets/sprites/file.png');
```

Usage:
```js
this.add.image(x, y, 'key');
this.add.sprite(x, y, 'key');
```

Supported formats: PNG, JPG, WEBP, GIF (static), SVG.

**Tip:** use WEBP — it's 2-3x lighter than PNG at the same quality.

### 2. Sprite sheet

A single file with a regular grid of frames.

```js
this.load.spritesheet('player', 'assets/sprites/player.png', {
  frameWidth: 64,
  frameHeight: 64,
  startFrame: 0,
  endFrame: 15
});
```

Usage:
```js
this.add.sprite(x, y, 'player', 0);  // first frame
this.add.sprite(x, y, 'player', 5);  // sixth frame
```

### 3. Texture Atlas — **the most important one for slots**

An atlas is one big PNG with many sprites of different sizes + a JSON with their coordinates. Created with [TexturePacker](https://www.codeandweb.com/texturepacker) or [free-tex-packer](http://free-tex-packer.com/).

```js
this.load.atlas(
  'symbols',
  'assets/sprites/symbols.png',
  'assets/sprites/symbols.json'
);
```

The JSON looks roughly like this (TexturePacker JSON Hash format):

```json
{
  "frames": {
    "ace.png":     { "frame": {"x":0,"y":0,"w":120,"h":120} },
    "king.png":    { "frame": {"x":120,"y":0,"w":120,"h":120} },
    "queen.png":   { "frame": {"x":240,"y":0,"w":120,"h":120} }
  },
  "meta": {
    "image": "symbols.png",
    "size": {"w":1024,"h":1024}
  }
}
```

Usage:
```js
this.add.image(x, y, 'symbols', 'ace.png');
this.add.image(x, y, 'symbols', 'king.png');
```

**Why you want an atlas:**
- Fewer HTTP requests
- Better GPU usage (one draw call instead of dozens)
- Less wasted texture space
- **Mandatory** for slot optimization

### 4. Audio

```js
this.load.audio('spin', 'assets/sounds/spin.mp3');

// Multiple formats for compatibility (Phaser picks the first supported one)
this.load.audio('theme', [
  'assets/sounds/theme.ogg',
  'assets/sounds/theme.mp3'
]);
```

Usage:
```js
this.sound.play('spin');
const music = this.sound.add('theme', { loop: true, volume: 0.5 });
music.play();
```

### 5. Audio sprite

A single file with multiple sounds + a JSON with timecodes. Handy for short SFX.

```js
this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
  'assets/sounds/sfx.mp3',
  'assets/sounds/sfx.ogg'
]);

// Playback
this.sound.playAudioSprite('sfx', 'click');
this.sound.playAudioSprite('sfx', 'win');
```

JSON format:
```json
{
  "resources": ["sfx.mp3"],
  "spritemap": {
    "click": { "start": 0, "end": 0.5, "loop": false },
    "win":   { "start": 1.0, "end": 2.5, "loop": false }
  }
}
```

### 6. JSON

```js
this.load.json('config', 'assets/config.json');
this.load.json('paytable', 'assets/paytable.json');

// Usage
const cfg = this.cache.json.get('config');
console.log(cfg.startBalance);
```

### 7. Bitmap Font

A pre-built font as an atlas. Very fast for dynamic text (counters, balances).

```js
this.load.bitmapFont(
  'gameFont',
  'assets/fonts/font.png',
  'assets/fonts/font.xml'
);

// Usage
this.add.bitmapText(x, y, 'gameFont', 'Score: 100', 32);
```

Fonts are created in [BMFont](https://www.angelcode.com/products/bmfont/) or [Hiero](https://libgdx.com/wiki/tools/hiero).

### 8. Web Font (TTF/WOFF)

Web fonts are loaded **outside** Phaser's loader. The standard way is via CSS:

```css
/* In index.html or a CSS file */
@font-face {
  font-family: 'CurseCasual';
  src: url('assets/fonts/CurseCasual.ttf') format('truetype');
}
```

Then you use:
```js
this.add.text(x, y, 'Hello', { fontFamily: 'CurseCasual', fontSize: '32px' });
```

⚠️ **Catch:** if you try to use a font before the browser has loaded it, you'll see a default fallback. Fix it with [WebFont Loader](https://github.com/typekit/webfontloader) or with the `document.fonts.ready` promise.

### 9. Spine (skeletal animation)

For the slot industry — critical. Via plugin:

```js
this.load.setPath('assets/spine/');
this.load.spine('hero', 'hero.json', ['hero.atlas']);

// Usage
const hero = this.add.spine(400, 300, 'hero', 'idle', true);
```

### 10. HTML / Video / Plugin

```js
this.load.html('form', 'assets/html/form.html');
this.load.video('intro', 'assets/video/intro.mp4');
this.load.plugin('rexUI', 'plugins/rex-ui.js', true);
```

## Load events

```js
preload() {
  this.load.on('start', () => console.log('Loading started'));
  this.load.on('progress', (value) => {
    // value: 0..1
    console.log(`Progress: ${(value * 100).toFixed(0)}%`);
  });
  this.load.on('fileprogress', (file) => {
    console.log(`Loading: ${file.key}`);
  });
  this.load.on('complete', () => console.log('All loaded'));
  this.load.on('loaderror', (file) => console.error(`Failed: ${file.key}`));

  // The actual loads
  this.load.image('bg', 'assets/bg.webp');
  // ...
}
```

## Progress bar (full example)

```js
preload() {
  const { width, height } = this.scale;

  // Bar background
  const box = this.add.rectangle(width/2, height/2, 320, 30, 0x222222);
  box.setStrokeStyle(2, 0xffffff);

  // The bar itself
  const bar = this.add.rectangle(width/2 - 150, height/2, 0, 16, 0xffffff)
    .setOrigin(0, 0.5);

  // Percentage
  const percentText = this.add.text(width/2, height/2 + 40, '0%', {
    fontSize: '20px', color: '#fff'
  }).setOrigin(0.5);

  this.load.on('progress', (value) => {
    bar.width = 300 * value;
    percentText.setText(`${(value * 100).toFixed(0)}%`);
  });

  // Load whatever you need
  this.load.image('bg', 'assets/sprites/background.webp');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
  this.load.audio('spin', 'assets/sounds/spin.mp3');
  // etc.
}

create() {
  this.scene.start('GameScene');
}
```

## Dynamic loading (after `create`)

Sometimes you need to load assets **later** (e.g., when entering a bonus game):

```js
create() {
  // Queue up bonus assets
  this.load.image('bonusBg', 'assets/sprites/bonus-bg.webp');
  this.load.atlas('bonusSymbols', 'assets/atlases/bonus.png', 'assets/atlases/bonus.json');

  // Kick off the load
  this.load.once('complete', () => {
    this.startBonusGame();
  });
  this.load.start();   // required — otherwise nothing loads
}
```

## Cache — where loaded assets live

```js
this.cache.json.get('paytable');
this.cache.audio.get('spin');
this.textures.get('symbols');
this.textures.exists('logo');     // bool

// Remove from cache
this.textures.remove('logo');
this.cache.json.remove('paytable');
```

## Base path (`setPath`)

So you don't have to repeat prefixes:

```js
this.load.setPath('assets/sprites/');
this.load.image('bg', 'background.webp');
this.load.image('card', 'card.webp');
this.load.image('symbol1', 'symbol1.webp');

this.load.setPath('assets/sounds/');
this.load.audio('spin', 'spin.mp3');
this.load.audio('win', 'win.mp3');
```

## Key prefix

```js
this.load.setPrefix('slot.');
this.load.image('bg', 'background.webp');  // the key will be 'slot.bg'
this.load.setPrefix();  // reset
```

## Manifest file (a pattern for big games)

Instead of scattering `this.load.*` across scenes, keep the asset list in one file:

```js
// src/core/AssetManifest.js
export const ASSETS = {
  images: [
    { key: 'background', url: 'assets/sprites/background.webp' },
    { key: 'logo',       url: 'assets/sprites/logo.webp' }
  ],
  atlases: [
    { key: 'symbols', tex: 'assets/atlases/symbols.png', json: 'assets/atlases/symbols.json' }
  ],
  sounds: [
    { key: 'spin', url: 'assets/sounds/spin.mp3' },
    { key: 'win',  url: 'assets/sounds/win.mp3' }
  ]
};
```

```js
// PreloadScene.js
import { ASSETS } from '../core/AssetManifest.js';

preload() {
  ASSETS.images.forEach(a => this.load.image(a.key, a.url));
  ASSETS.atlases.forEach(a => this.load.atlas(a.key, a.tex, a.json));
  ASSETS.sounds.forEach(a => this.load.audio(a.key, a.url));
}
```

## Gotchas and pitfalls

| Issue | Fix |
|---|---|
| Asset not found | Check the path is relative to `public/`, without `public/` at the start |
| CORS error | Run via `npm run dev`, don't open the HTML directly |
| Sound doesn't play on iOS | You need a user tap to unlock WebAudio |
| Atlas doesn't work | Check that JSON and PNG sit next to each other and the format matches (Hash or Array) |
| Font shows as default | Wait for `document.fonts.ready` before using it |

---

## ✅ Exercise 4

Using the assets from this repo (`assets/sprites/card1.webp` ... `card5.webp`):

1. In `PreloadScene` load all 5 cards via a `for` loop.
2. Build a progress bar — background + bar + percentage.
3. Add a fake delay: after `complete`, wait 500ms via `this.time.delayedCall`, then go to `GameScene`.
4. In `GameScene` show all 5 cards in a centered row.
5. **Bonus:** load `assets/sounds/card.mp3`. On a click on a card, play that sound.

Done — let's move on to [Chapter 5. Display Objects](./05-display-objects.md).


---

# Chapter 5. Display Objects — what we draw on the scene

Anything you see on screen is a **Game Object** (a.k.a. Display Object). They all share an API: `x`, `y`, `alpha`, `scale`, `rotation`, `visible`, `setOrigin`, `setDepth`, etc.

In this chapter we'll go through the main types.

## Common API for every Display Object

```js
const obj = this.add.image(400, 300, 'card');

// Position
obj.x = 100;
obj.y = 200;
obj.setPosition(100, 200);

// Size (scale)
obj.scale = 2;
obj.setScale(2);
obj.setScale(2, 1.5);          // x, y separately
obj.scaleX = 1.5;
obj.scaleY = 0.8;

// Rotation
obj.rotation = Math.PI / 4;    // in radians
obj.angle = 45;                // in degrees (the same thing)
obj.setRotation(0.5);
obj.setAngle(45);

// Opacity
obj.alpha = 0.5;
obj.setAlpha(0.5);

// Visibility
obj.visible = false;
obj.setVisible(true);

// Depth (z-order). Larger = higher in the stack
obj.setDepth(10);

// Origin — the anchor point (0..1)
obj.setOrigin(0.5);            // center
obj.setOrigin(0, 0);           // top-left corner
obj.setOrigin(1, 1);           // bottom-right

// Tint — color tint (color multiply)
obj.setTint(0xff0000);         // red
obj.setTint(0xff0000, 0x00ff00, 0x0000ff, 0xffffff);  // 4 corners
obj.clearTint();

// Destruction
obj.destroy();
```

## 1. Image — a static picture

The simplest object — just displays a texture.

```js
const bg = this.add.image(640, 360, 'background');
const logo = this.add.image(640, 200, 'logo');

// From an atlas — specify the frame
const card = this.add.image(400, 300, 'symbols', 'ace.png');
```

`Image` **does not have** animations. For those you need a `Sprite`.

## 2. Sprite — an image with animation support

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');   // start an animation (more on animations in chapter 6)
```

Visually identical to `Image`, but heavier. Use `Sprite` only if there will **definitely** be animations.

## 3. Text — regular text

```js
const score = this.add.text(20, 20, 'Score: 0', {
  fontFamily: 'Arial',
  fontSize: '32px',
  color: '#ffffff',
  stroke: '#000000',
  strokeThickness: 4,
  shadow: {
    offsetX: 2,
    offsetY: 2,
    color: '#000',
    blur: 2,
    stroke: true,
    fill: true
  },
  align: 'center',
  padding: { x: 10, y: 5 },
  wordWrap: { width: 300, useAdvancedWrap: true }
});

// Modifying
score.setText('Score: 100');
score.setColor('#ffff00');
score.setFontSize(48);
score.setStyle({ fontFamily: 'Verdana', color: '#0f0' });

// Sizes
console.log(score.width, score.height);
```

**Downsides of Text:**
- Every text change creates a new GPU texture. Expensive.
- For dynamic counters (balance, win) it's better to use BitmapText.

## 4. BitmapText — fast text

```js
const balance = this.add.bitmapText(20, 20, 'gameFont', 'Balance: 1000', 32);

balance.setText('Balance: 950');  // cheap, doesn't create a new texture
balance.setTint(0x00ff00);
balance.setLetterSpacing(2);
```

**Pros:** updating the text is almost free.
**Cons:** you need a pre-built bitmap font. Not every character may be in the font (looking at you, emoji and Cyrillic — you have to generate it with the right glyph set).

**Use BitmapText for anything that changes often:** balance, win, second counters, timers.

## 5. Graphics — drawing primitives

`Graphics` is for drawing lines, rectangles, circles, complex shapes via code.

```js
const g = this.add.graphics();

// Fill
g.fillStyle(0xff0000, 1);              // color, alpha
g.fillRect(100, 100, 200, 100);
g.fillCircle(300, 200, 50);
g.fillTriangle(0, 0, 100, 0, 50, 100);
g.fillRoundedRect(0, 0, 200, 100, 16);  // rounded

// Stroke
g.lineStyle(4, 0x00ff00, 1);
g.strokeRect(100, 100, 200, 100);
g.strokeCircle(300, 200, 50);

// Line
g.lineBetween(0, 0, 100, 100);

// Complex path
g.beginPath();
g.moveTo(100, 100);
g.lineTo(200, 100);
g.lineTo(200, 200);
g.closePath();
g.fillPath();

// Clear
g.clear();
```

**When to use Graphics:**
- Frames, grids, debug visualization
- Simple UI without assets
- Masks

**Downside:** slower than sprites on big scenes. Each `Graphics` draw is its own draw call.

## 6. Shape Game Objects — simplified primitives

If you need just one rectangle or one circle — there are ready-made shortcuts:

```js
this.add.rectangle(x, y, width, height, color);
this.add.circle(x, y, radius, color);
this.add.ellipse(x, y, width, height, color);
this.add.triangle(x, y, x1, y1, x2, y2, x3, y3, color);
this.add.line(x, y, x1, y1, x2, y2, color);
this.add.polygon(x, y, points, color);
this.add.star(x, y, points, innerRadius, outerRadius, color);
this.add.arc(x, y, radius, startAngle, endAngle, false, color);

// Stroke
const r = this.add.rectangle(100, 100, 200, 100, 0xff0000);
r.setStrokeStyle(4, 0xffffff);
```

These are faster than `Graphics` for one-off shapes.

## 7. Container — grouping objects

A `Container` is a **container for other Game Objects**. Coordinates inside the container are local.

```js
const card = this.add.container(400, 300);

const bg = this.add.image(0, 0, 'cardBg');
const symbol = this.add.image(0, -20, 'symbols', 'ace.png');
const value = this.add.text(0, 50, '100', { fontSize: '24px', color: '#fff' });

card.add([bg, symbol, value]);

// Now we move the whole card as one
card.x = 500;
card.setRotation(0.2);
card.setScale(1.5);
```

**When you need a Container:**
- A card (background + symbol + number)
- A slot reel (mask + column of symbols)
- A UI panel (background + buttons + text)
- Any "compound thing" that you move as a single unit

**Quirks:**
- A container has no texture of its own — it's invisible by itself
- `setOrigin` on a container doesn't work the usual way (it's measured from 0,0)
- Masks apply to the container as a whole

## 8. Group — a collection for management

`Group` is **not** a container. It's a collection of Game Objects for easy management (creation, recycling, iteration). Objects in a group are **not children** — they live on the scene, but inside a single "pool".

```js
const enemies = this.add.group();
enemies.create(100, 100, 'enemy');
enemies.create(200, 200, 'enemy');

// Apply to all
enemies.setVelocityX(100);
enemies.children.iterate((enemy) => {
  enemy.alpha = 0.5;
});

// Get a random one
const random = enemies.getFirstAlive();
```

**The main use of Group is object pooling** (see chapter 13).

## 9. RenderTexture — rendering into a texture

You can draw something once into a texture and use it like a regular image. Expensive when created, cheap when displayed.

```js
const rt = this.add.renderTexture(0, 0, 800, 600);
rt.draw('background', 0, 0);
rt.draw('logo', 100, 100);
// rt is now just an image, drawn in a single draw call
```

Useful for static compositions.

## 10. TileSprite — a repeating texture

A picture that tiles. Can be scrolled.

```js
const sky = this.add.tileSprite(640, 360, 1280, 720, 'sky');
update() {
  sky.tilePositionX += 1;   // infinite scroll
}
```

Perfect for parallax backgrounds and slot reels (you can build symbols using TileSprite, though more often it's done with a Container plus a mask).

## 11. NineSlice — a stretchable rectangle

A picture with fixed corners and a stretchable middle. For UI panels of arbitrary size.

```js
const panel = this.add.nineslice(400, 300, 'panel', null, 300, 200, 16, 16, 16, 16);
//                                                    width height left right top bottom
```

## Masks — clipping by shape

A mask limits the visible area of an object. Crucial for **slot reels**.

### Geometry Mask (via Graphics)

```js
const mask = this.add.graphics();
mask.fillRect(100, 100, 300, 400);    // a rectangular region
const geomMask = mask.createGeometryMask();

const reel = this.add.container(0, 0);
// add symbols into reel
reel.setMask(geomMask);

// Hide the Graphics itself
mask.setVisible(false);
```

### Bitmap Mask (via a sprite)

The alpha of another sprite determines visibility:

```js
const maskImage = this.make.image({ x: 0, y: 0, key: 'maskShape', add: false });
const bitmapMask = maskImage.createBitmapMask();
target.setMask(bitmapMask);
```

## Depth — controlling z-order

```js
bg.setDepth(0);
gameplay.setDepth(10);
ui.setDepth(100);
modal.setDepth(1000);
```

An object with a higher `depth` is drawn on top. Within the same depth — the order they were added wins.

## Blend Modes

```js
const glow = this.add.image(400, 300, 'glow');
glow.setBlendMode(Phaser.BlendModes.ADD);     // glowing effect
glow.setBlendMode(Phaser.BlendModes.MULTIPLY); // darkening
glow.setBlendMode(Phaser.BlendModes.SCREEN);
```

Useful for win effects, glints, shadows.

## `add` vs `make`

```js
this.add.image(...);   // creates AND adds to the scene
this.make.image(...);  // only creates, doesn't add to the scene
```

`make` is for masks and temporary objects.

---

## ✅ Exercise 5

In `GameScene`:

1. Build a **Container** that mimics a card: a background rectangle + a value text + a symbol image. Place it in the center.
2. On a click (`this.input.on('pointerdown', ...)`) rotate the card 360° via `setRotation` (no tweens yet, just change the angle in `update`).
3. Create 5 cards via a `for` loop, lay them out in a row.
4. Add a **mask** — cards should only be visible inside an 800×200 rectangle in the center of the screen. If you push a card upward, it should disappear behind the mask.
5. **Bonus:** add a BitmapText "Score: 0" in the top-right corner. On a card click, increase the score by 10.

Done — [Chapter 6. Animations and Tweens](./06-animations-tweens.md).


---

# Chapter 6. Animations and Tweens

Phaser has **two distinct kinds of animation**, and they often get mixed up:

1. **Animations** — frame-based, for spritesheets: a character walking, effects.
2. **Tweens** — smooth changes of properties (alpha, x, scale, rotation), general-purpose.

For slots you'll mostly want **Tweens** (reel motion, win pulses, number counters).

## Part 1. Tweens — smooth animations

### Basic syntax

```js
this.tweens.add({
  targets: gameObject,
  x: 800,
  y: 400,
  duration: 1000,        // ms
  ease: 'Power2'
});
```

### The full set of parameters

```js
this.tweens.add({
  targets: [obj1, obj2],     // one target or an array
  x: 800,                    // destination (absolute value)
  y: '+=100',                // relative (current + 100)
  alpha: { from: 0, to: 1 }, // with a fixed start
  scale: 2,
  rotation: Math.PI,
  duration: 1000,            // duration
  delay: 200,                // delay before starting
  hold: 0,                   // pause at the end before yoyo/repeat kicks in
  repeat: 3,                 // 3 repeats (4 plays total); -1 = infinite
  repeatDelay: 100,
  yoyo: true,                // return to the starting value
  ease: 'Sine.easeInOut',
  onStart:    () => console.log('start'),
  onUpdate:   (tween, target) => console.log(target.x),
  onComplete: () => console.log('done'),
  onYoyo:     () => console.log('yoyo'),
  onRepeat:   () => console.log('repeat'),
  paused: false              // create paused
});
```

### Easing — smoothing curves

The most common ones:

| Name | Behavior |
|---|---|
| `Linear` | No smoothing |
| `Power0..Power4` | Polynomial |
| `Sine.easeIn/Out/InOut` | Sine smoothing |
| `Quad.easeIn/Out/InOut` | Quadratic |
| `Cubic.easeIn/Out/InOut` | Cubic |
| `Back.easeIn/Out` | Overshoots and returns |
| `Bounce.easeOut` | Bounces (like a ball) |
| `Elastic.easeOut` | Rubber-band feel |
| `Expo.easeIn/Out` | Exponential — sharp start/finish |

**Rules of thumb:**
- `easeIn` — slow start, fast finish
- `easeOut` — fast start, slow finish (smooth landing)
- `easeInOut` — slow start AND finish

For slots:
- Reel start: `Cubic.easeIn` (gradual ramp-up)
- Reel stop: `Back.easeOut` (with a slight overshoot)
- Symbol pop-in: `Back.easeOut` or `Elastic.easeOut`
- Win pulse: `Sine.easeInOut` + `yoyo: true` + `repeat: -1`

### Controlling a tween instance

```js
const tween = this.tweens.add({ ... });

tween.pause();
tween.resume();
tween.stop();
tween.restart();
tween.complete();      // finish instantly
tween.seek(0.5);       // jump to 50%

tween.isPlaying();
tween.isPaused();

tween.setTimeScale(2); // 2x speed
```

### Chains — sequential tweens

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

### Timeline — parallel + sequential

> ⚠️ In Phaser 3.60+ the old Timeline was removed — the new API uses `chain` plus parallel tweens. For complex sequences you're better off with [GSAP](https://greensock.com/gsap/) — it's the de-facto standard in the slot industry.

```js
// In parallel
this.tweens.add({ targets: card1, x: 100, duration: 500 });
this.tweens.add({ targets: card2, x: 200, duration: 500 });

// Sequentially — via onComplete or chain
```

### Per-property tweens with different easings

```js
this.tweens.add({
  targets: ball,
  props: {
    x: { value: 800, duration: 1000, ease: 'Linear' },
    y: { value: 400, duration: 1000, ease: 'Bounce.easeOut' }
  }
});
```

### Counter (animating a number) — for win counters

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

This is **must-have** for slots — win counters are always done this way.

## Part 2. Animations — frame-by-frame

Used with **Sprite** (not Image!) and spritesheets/atlases.

### Creating an animation

```js
// In a scene's create()
this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
  frameRate: 10,        // frames per second
  repeat: -1            // -1 = infinite, 0 = once
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

### Playback

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');
player.play('jump', true);  // true = ignore if the same one is already playing

player.anims.pause();
player.anims.resume();
player.anims.stop();
player.anims.stopAfterRepeat();

player.anims.timeScale = 2;  // 2x speed

// Stop and return to the first frame
player.anims.stop();
player.setFrame(0);
```

### Animation events

```js
player.on('animationstart', (anim) => console.log('start', anim.key));
player.on('animationupdate', (anim, frame) => console.log(frame.index));
player.on('animationcomplete', (anim) => console.log('done'));
player.on('animationrepeat', () => console.log('repeat'));

// Just for a specific animation
player.on('animationcomplete-jump', () => console.log('jump done'));
```

### Global vs scene-local animations

```js
// Global (available across all scenes)
this.anims.create({ key: 'walk', ... });

// Local (only in this scene)
this.anims.create({ key: 'walk', ... });
// Actually, all this.anims is the global AnimationManager — keys are shared.
```

⚠️ Animations are **global**. If you create `'walk'` in `GameScene`, it'll also be visible in other scenes. Use unique prefixes: `'player.walk'`, `'enemy.walk'`.

### Using an atlas

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

// When a symbol wins
winningSymbol.play('symbol-flash');
```

## Comparison: when to use what

| Task | What to use |
|---|---|
| Move a symbol from A to B | Tween |
| Spin a reel | Tween (on `tilePositionY` or container `y`) |
| Symbol win animation (flash, pre-rendered frames) | Animation |
| Win text appearing | Tween (alpha + scale + Back.easeOut) |
| Win amount counter | Tween (`addCounter`) |
| Button pulsing | Tween (yoyo + repeat: -1) |
| Screen shake | Camera shake (see chapter 9) |
| Complex skeletal animation (boss, character) | Spine |

## Real-world example: animating a winning symbol

```js
function animateWinningSymbol(symbol) {
  // 1. Highlight via tint
  symbol.setTint(0xffff00);

  // 2. Pulsing (scale)
  this.tweens.add({
    targets: symbol,
    scale: { from: 1, to: 1.3 },
    duration: 400,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 3. Wobble back and forth
  this.tweens.add({
    targets: symbol,
    angle: { from: -5, to: 5 },
    duration: 200,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 4. Optionally — a frame animation on top (if you have a "flash" atlas)
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

## Real-world example: spinning a reel

```js
class Reel {
  spin() {
    // 1. Ramp-up
    this.tweens.add({
      targets: this.symbolsContainer,
      y: '+=200',
      duration: 300,
      ease: 'Cubic.easeIn'
    });

    // 2. Infinite scroll (via Phaser.Tweens with onUpdate)
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
    // Slow down with overshoot
    this.tweens.add({
      targets: this.symbolsContainer,
      y: this.targetY,
      duration: 800,
      ease: 'Back.easeOut'
    });
  }
}
```

## Useful helpers

```js
// Kill all tweens on an object
this.tweens.killTweensOf(obj);

// Is there an active tween on an object?
const exists = this.tweens.getTweensOf(obj).length > 0;

// Globally pause all tweens
this.tweens.pauseAll();
this.tweens.resumeAll();
```

---

## ✅ Exercise 6

1. Create 3 cards in a row. On clicking a card:
   - It "flips" (tween `scaleX: 1 → 0` over 0.25s, then swap the texture, then `scaleX: 0 → 1`)
   - **Hint:** use two sequential tweens via `onComplete` or `chain`.

2. Build a **score counter** with `tweens.addCounter`. On clicking each card, increase the score from its current value by `+100` over 800ms with `Cubic.easeOut`.

3. Build a **pulsing "PLAY" button** — text in the center, infinite scale 1↔1.1 tween with yoyo.

4. **Bonus:** load a spritesheet from any free source (or paint one yourself, 4 frames at 64×64), create the `'spin'` animation, play it on the sprite.

Done — [Chapter 7. Input](./07-input.md).


---

# Chapter 7. Input

In Phaser, input is handled through the **Input Plugin** — `this.input` in every scene. Mouse, touch, keyboard, and gamepad are all supported. On mobile, touches automatically behave like pointer events — you don't need to write separate code.

## Pointer events — the foundation

`Pointer` unifies mouse and touch. A scene-wide event is caught like this:

```js
// Any click/tap on the scene
this.input.on('pointerdown', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Movement
this.input.on('pointermove', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Release
this.input.on('pointerup', (pointer) => { /* ... */ });
```

The `pointer` object contains:
- `pointer.x`, `pointer.y` — scene coordinates (with scale applied)
- `pointer.worldX`, `pointer.worldY` — world coordinates (with the camera applied)
- `pointer.isDown` — whether it's pressed right now
- `pointer.button` — which mouse button (0 = left, 2 = right)
- `pointer.event` — the original DOM event

## Interactive Game Objects

To let a specific object react to clicks, mark it interactive:

```js
const card = this.add.image(400, 300, 'card');
card.setInteractive();

card.on('pointerdown', () => console.log('Clicked the card'));
card.on('pointerup',   () => console.log('Released'));
card.on('pointerover', () => card.setTint(0xff0000));    // hover-in
card.on('pointerout',  () => card.clearTint());          // hover-out
card.on('pointermove', (pointer) => console.log(pointer.x));
```

### setInteractive() options

```js
card.setInteractive({
  cursor: 'pointer',         // CSS cursor
  pixelPerfect: false,       // alpha pixel test (slow)
  alphaTolerance: 1,         // alpha threshold for pixelPerfect
  draggable: true,           // enable drag&drop
  useHandCursor: true,       // shorthand for cursor: 'pointer'
  hitArea: hitArea,          // custom shape
  hitAreaCallback: callback
});
```

### Custom hit area (click shape)

By default Phaser uses a rectangle around the texture. You can specify a circle, polygon, or any shape:

```js
// Circular click area
const hitArea = new Phaser.Geom.Circle(0, 0, 50);
card.setInteractive(hitArea, Phaser.Geom.Circle.Contains);

// Polygon
const points = [
  new Phaser.Geom.Point(0, 0),
  new Phaser.Geom.Point(100, 0),
  new Phaser.Geom.Point(50, 100)
];
const polygon = new Phaser.Geom.Polygon(points);
sprite.setInteractive(polygon, Phaser.Geom.Polygon.Contains);
```

### Pixel-perfect testing (for "cut-out" sprites)

```js
card.setInteractive({ pixelPerfect: true });
```

⚠️ Expensive — don't use it on lots of objects. Almost never needed for slots.

## Button from a sprite (pattern)

```js
function makeButton(scene, x, y, key, callback) {
  const btn = scene.add.image(x, y, key)
    .setInteractive({ useHandCursor: true });

  btn.on('pointerover', () => btn.setScale(1.05));
  btn.on('pointerout',  () => btn.setScale(1));
  btn.on('pointerdown', () => btn.setScale(0.95));
  btn.on('pointerup',   () => {
    btn.setScale(1.05);
    callback();
  });

  return btn;
}

// Usage
makeButton(this, 640, 600, 'spinBtn', () => this.startSpin());
```

## Drag & Drop

```js
const item = this.add.image(100, 100, 'gem');
item.setInteractive({ draggable: true });

this.input.on('dragstart', (pointer, gameObject) => {
  gameObject.setTint(0x00ff00);
});

this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
  gameObject.x = dragX;
  gameObject.y = dragY;
});

this.input.on('dragend', (pointer, gameObject) => {
  gameObject.clearTint();
});
```

### Drop zones

A region you can "drop" an object into:

```js
const zone = this.add.zone(640, 360, 200, 200).setRectangleDropZone(200, 200);

this.input.on('drop', (pointer, gameObject, dropZone) => {
  console.log('Dropped in the zone');
  gameObject.x = dropZone.x;
  gameObject.y = dropZone.y;
});

this.input.on('dragenter', (pointer, gameObject, dropZone) => {
  // Object entered the zone
});

this.input.on('dragleave', (pointer, gameObject, dropZone) => {
  // Left it
});
```

## Keyboard

### Basic tracking

```js
// Creating keys
this.keyW = this.input.keyboard.addKey('W');
this.keyA = this.input.keyboard.addKey('A');
this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

// In update()
update() {
  if (this.keyW.isDown) this.player.y -= 5;
  if (this.keyA.isDown) this.player.x -= 5;
  if (this.keySpace.isDown) this.shoot();
}
```

### Cursor keys (a ready-made object)

```js
this.cursors = this.input.keyboard.createCursorKeys();

update() {
  if (this.cursors.left.isDown)  this.player.x -= 5;
  if (this.cursors.right.isDown) this.player.x += 5;
  if (this.cursors.up.isDown)    this.player.y -= 5;
  if (this.cursors.down.isDown)  this.player.y += 5;
  if (this.cursors.space.isDown) this.shoot();
}
```

### Key events (single press)

```js
this.input.keyboard.on('keydown-SPACE', () => {
  this.startSpin();
});

this.input.keyboard.on('keyup-ESC', () => {
  this.openMenu();
});

// JustDown — fires once per press, even if held
if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
  this.spin();
}
```

### Key combos

```js
this.input.keyboard.createCombo('CHEAT', { resetOnMatch: true });
this.input.keyboard.on('keycombomatch', (combo) => {
  console.log('Cheat enabled!');
});
```

## Gamepad (optional)

Enable it in the config:
```js
input: { gamepad: true }
```

```js
this.input.gamepad.once('connected', (pad) => {
  console.log('Pad connected:', pad.id);
});

update() {
  const pad = this.input.gamepad.getPad(0);
  if (!pad) return;
  if (pad.left)  this.player.x -= 5;
  if (pad.right) this.player.x += 5;
  if (pad.A)     this.shoot();
  // Analog stick
  this.player.x += pad.leftStick.x * 5;
}
```

## Global input settings

```js
// Always pick the topmost object on click (default false)
this.input.topOnly = true;

// Enable multi-touch (how many fingers at once)
this.input.addPointer(2);  // total 3 pointers (1 default + 2)

// Disable input for the whole scene
this.input.enabled = false;

// Disable on a single object
card.disableInteractive();
card.setInteractive();    // re-enable
```

## Coordinates: screen vs world

```js
this.input.on('pointerdown', (pointer) => {
  // Coordinates in the scene's frame (with scale applied)
  console.log(pointer.x, pointer.y);

  // Coordinates in the "world" (with camera scroll applied)
  console.log(pointer.worldX, pointer.worldY);
});
```

If your camera is static — `x` and `worldX` are the same. When the camera scrolls — they differ.

## Useful patterns for slots

### A SPIN button with states

```js
class SpinButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.bg = scene.add.image(0, 0, 'btn-spin');
    this.label = scene.add.text(0, 0, 'SPIN', { fontSize: '32px' }).setOrigin(0.5);
    this.add([this.bg, this.label]);

    scene.add.existing(this);

    this.bg.setInteractive({ useHandCursor: true });
    this.bg.on('pointerdown', () => this.handlePress());
  }

  setEnabled(enabled) {
    this.bg.input.enabled = enabled;
    this.alpha = enabled ? 1 : 0.5;
  }

  setSpinning(spinning) {
    this.label.setText(spinning ? 'STOP' : 'SPIN');
  }

  handlePress() {
    this.scene.events.emit('spin-button-pressed');
  }
}
```

### Double-click protection

```js
let spinning = false;

spinBtn.on('pointerdown', () => {
  if (spinning) return;
  spinning = true;
  this.startSpin();
});

// On completion
this.events.once('spin-complete', () => {
  spinning = false;
});
```

### Spacebar = SPIN

```js
this.input.keyboard.on('keydown-SPACE', () => {
  if (!this.spinning) this.startSpin();
});
```

## Pitfalls

| Issue | Fix |
|---|---|
| Container clicks don't work | Containers aren't interactive by default — call `setInteractive(new Phaser.Geom.Rectangle(...), Phaser.Geom.Rectangle.Contains)` or make the children interactive instead |
| Clicks "fall through" the UI | Set `this.input.topOnly = true` or use depth |
| Click fires multiple times | `pointerdown` + `pointerup` can run together — use `pointerup` instead |
| Drag jitters | On some browsers you need `event.preventDefault()` — Phaser does this itself, but check the CSS `touch-action: none` |
| Click doesn't work on iOS Safari | Make sure the click area is at least 44×44px (Apple guideline) |

---

## ✅ Exercise 7

1. Create 5 cards in a row. For each one:
   - On hover — `setTint(0xffff00)` + tween scale 1 → 1.1
   - On hover-out — clearTint + scale 1
   - On click — the card flies upward and disappears (tween y -= 200, alpha → 0)

2. Build **drag & drop**: one big card you can drag around the screen.

3. Build a **drop zone** (a 200×200 rectangle in the bottom-right corner). When the card is dropped in the zone — the card stays at the drop point AND a counter increases by 1.

4. Pressing **space** — all the cards return to their starting positions (via tween).

5. **Bonus:** implement a secret code `S-L-O-T` via the keyboard. When the player types it — print "Cheat activated" to the console.

[Chapter 8. Sound](./08-sound.md)


---

# Chapter 8. Sound

Sound in Phaser is handled by the **Sound Manager** (`this.sound`). Two backends sit underneath:

- **WebAudio** — modern, recommended. Supports 3D, effects, precise timing.
- **HTML5 Audio** — fallback for older browsers and weak devices.

Phaser **picks WebAudio automatically** when it's available.

## Loading sound

```js
preload() {
  // A single file
  this.load.audio('click', 'assets/sounds/click.mp3');

  // Multiple formats (best supported one is chosen)
  this.load.audio('theme', [
    'assets/sounds/theme.ogg',
    'assets/sounds/theme.mp3',
    'assets/sounds/theme.m4a'
  ]);
}
```

### Which formats are supported

| Format | Support |
|---|---|
| **MP3** | All modern browsers |
| **OGG** | All except old Safari |
| **M4A/AAC** | Safari, Chrome |
| **WEBM** | Chrome, Firefox |
| **WAV** | All, but huge file size |

**Tip:** for short SFX (< 5 sec) use **MP3 96 kbps**, for music — **OGG/MP3 128 kbps**.

## Playback (the quick way)

```js
// Just play
this.sound.play('click');

// With options
this.sound.play('click', {
  volume: 0.5,
  rate: 1.5,        // playback speed
  detune: 100,      // detune in cents (-1200..1200)
  loop: false,
  delay: 0
});
```

This is convenient for short sounds, but it **doesn't return** an instance — you can't stop it.

## Playback via an instance (the right way)

```js
const music = this.sound.add('theme', { loop: true, volume: 0.3 });
music.play();

music.pause();
music.resume();
music.stop();

music.setVolume(0.5);
music.setRate(2);          // 2x speed
music.setDetune(-300);
music.setLoop(true);

music.isPlaying;
music.isPaused;

music.destroy();
```

## Sound events

```js
const sfx = this.sound.add('explosion');

sfx.on('play',     () => console.log('start'));
sfx.on('complete', () => console.log('done'));
sfx.on('stop',     () => console.log('stopped'));
sfx.on('looped',   () => console.log('loop iteration'));

sfx.play();
```

## Global settings

```js
// Volume for all sounds at once
this.sound.volume = 0.5;
this.sound.setVolume(0.5);

// Mute
this.sound.mute = true;
this.sound.setMute(true);

// Pause/resume all sounds
this.sound.pauseAll();
this.sound.resumeAll();
this.sound.stopAll();

// Stop a specific one by key
this.sound.stopByKey('theme');
```

## Audio Sprite — many sounds in one file

Perfect for short SFX in slots (clicks, spins, wins, button presses).

### Preparation

Use [audiosprite-tool](https://github.com/tonistiigi/audiosprite) or [ffmpeg](https://ffmpeg.org/). You'll get a file plus a JSON:

```json
{
  "resources": ["sfx.mp3"],
  "spritemap": {
    "click":      { "start": 0,    "end": 0.5 },
    "spin-start": { "start": 1.0,  "end": 2.5 },
    "reel-stop":  { "start": 3.0,  "end": 3.4 },
    "small-win":  { "start": 4.0,  "end": 5.0 },
    "big-win":    { "start": 6.0,  "end": 9.0 }
  }
}
```

### Loading and using

```js
preload() {
  this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
    'assets/sounds/sfx.mp3',
    'assets/sounds/sfx.ogg'
  ]);
}

create() {
  // Shorthand
  this.sound.playAudioSprite('sfx', 'click');
  this.sound.playAudioSprite('sfx', 'big-win', { volume: 0.7 });

  // Via an instance (with control)
  const winSound = this.sound.addAudioSprite('sfx');
  winSound.play('big-win');
}
```

**Benefits:**
- One HTTP request
- Less startup latency
- On mobile — works around the limit on simultaneous Audio objects

## Volume, fade, crossfade

```js
// Fade in
const music = this.sound.add('theme', { volume: 0 });
music.play();
this.tweens.add({
  targets: music,
  volume: 0.5,
  duration: 2000
});

// Fade out
this.tweens.add({
  targets: music,
  volume: 0,
  duration: 1500,
  onComplete: () => music.stop()
});

// Crossfade between two tracks
function crossfade(scene, oldMusic, newKey, duration = 2000) {
  const newMusic = scene.sound.add(newKey, { loop: true, volume: 0 });
  newMusic.play();

  scene.tweens.add({ targets: oldMusic, volume: 0, duration, onComplete: () => oldMusic.stop() });
  scene.tweens.add({ targets: newMusic, volume: 0.5, duration });

  return newMusic;
}
```

## One sound played many times in parallel

If you need rapid-fire (gunfire, clicks), call `play()` on the same instance — copies are spawned automatically:

```js
const click = this.sound.add('click');
click.play();
click.play();   // a second copy plays at the same time
click.play();   // and a third
```

Or, to be safe, the short form:

```js
this.sound.play('click');
this.sound.play('click');
```

## Autoplay and iOS — the main pain point

iOS and modern browsers **forbid** sound playback without a user gesture. If a sound is supposed to play from the start — it'll only start after the first click/tap.

### Solution: the context unlocks itself

Phaser unlocks WebAudio on its own at the first interaction. But **the very first sound** before that interaction won't play.

### Pattern: "Tap to start"

```js
// Splash screen
const tapText = this.add.text(640, 360, 'Tap to start', { fontSize: '40px' }).setOrigin(0.5);
this.input.once('pointerdown', () => {
  // WebAudio is now unlocked
  this.sound.play('theme');
  this.scene.start('GameScene');
});
```

### Checking the state

```js
if (this.sound.locked) {
  console.log('Audio is locked until the user interacts');
}

this.sound.once('unlocked', () => {
  console.log('Unlocked');
  this.sound.play('theme');
});
```

## Sound in the background (when the tab is inactive)

By default Phaser pauses sound when the tab loses focus. You can control this:

```js
// In config:
audio: {
  disableWebAudio: false
},

// Or manually in a scene:
this.sound.pauseOnBlur = false;  // keep playing in the background
```

## Spatial / 3D sound (WebAudio)

You can place a sound in 3D space (for FPS, racing). Almost never needed for slots, but good to know:

```js
const sfx = this.sound.add('engine');
sfx.play();
sfx.setPan(-1);   // -1 = left ear, 0 = center, 1 = right
```

## Sound architecture for a slot game

A typical slot has:

```
🎵 Background music — ducks itself on big-win
🔊 Reel spin loop — plays while reels are spinning
🔊 Reel stop — on each reel landing
🔊 Symbol win — for each winning symbol (or one shared)
🔊 Counter ticks — while win amounts count up
🎉 Big win jingle — over the music
🔘 Button clicks — on button presses
```

A sound manager example:

```js
// src/core/AudioManager.js
export class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.music = null;
    this.muted = false;
  }

  playMusic(key) {
    if (this.music) this.music.stop();
    this.music = this.scene.sound.add(key, { loop: true, volume: 0.3 });
    this.music.play();
  }

  duckMusic(volume = 0.1, duration = 200) {
    this.scene.tweens.add({ targets: this.music, volume, duration });
  }

  unduckMusic(duration = 500) {
    this.scene.tweens.add({ targets: this.music, volume: 0.3, duration });
  }

  sfx(spriteName, options = {}) {
    if (this.muted) return;
    this.scene.sound.playAudioSprite('sfx', spriteName, options);
  }

  toggleMute() {
    this.muted = !this.muted;
    this.scene.sound.mute = this.muted;
  }
}
```

Usage:
```js
this.audio = new AudioManager(this);
this.audio.playMusic('theme');
this.audio.sfx('click');

// On a big win
this.audio.duckMusic();
this.audio.sfx('big-win');
this.time.delayedCall(3000, () => this.audio.unduckMusic());
```

## Pitfalls

| Issue | Fix |
|---|---|
| Sound doesn't play on iOS | A user interaction is required before the first playback |
| High latency | Use WebAudio (the default). HTML5 audio is slow |
| Too many simultaneous sounds | Cap the count, use a pool |
| Music restarts when scenes change | Create it in `BootScene` and don't destroy it: `music.persist = true` or store it globally |
| Sound clipped at the start of `play()` | Use `'mp3'` with leading silence or stick with WebAudio |

---

## ✅ Exercise 8

1. Load `assets/sounds/theme.mp3` as background music with `loop: true, volume: 0.3`. Start it in `GameScene`.
2. Load `assets/sounds/card.mp3`. On a click on any card — play this sound.
3. Build a **Mute button** in a corner — toggles `this.sound.mute`. Change the texture/icon based on state.
4. On hover over a card, play a short sound with `rate: 1.5` (a pitched-up tone).
5. **Bonus:** implement "ducking" — when you play `complete.mp3` (a win), the background music drops to 0.1, and 2 sec later returns to 0.3. Use a tween on the `volume` property.

[Chapter 9. Camera](./09-camera.md)


---

# Chapter 9. Camera

The camera in Phaser is a **window into the game world**. It defines what part of the world the player sees, and it can scroll, zoom, shake, and fade.

Every scene has a **main camera** — `this.cameras.main`. You can create extra ones too.

## Basic API

```js
const cam = this.cameras.main;

// Scroll (world offset)
cam.scrollX = 100;
cam.scrollY = 200;
cam.setScroll(100, 200);

// Center — where the camera is looking
cam.centerOn(800, 600);

// Zoom
cam.zoom = 2;
cam.setZoom(2);

// Rotate the entire scene
cam.rotation = Math.PI / 4;
cam.setRotation(0.5);

// Angle in degrees
cam.setAngle(45);

// Background color (overrides config.backgroundColor)
cam.setBackgroundColor('#0f0f23');

// Viewport size (the on-screen area the camera occupies)
cam.setSize(800, 600);
cam.setPosition(0, 0);     // viewport position on screen
cam.setViewport(0, 0, 800, 600);
```

## Bounds — world boundaries

Limit where the camera can scroll:

```js
this.cameras.main.setBounds(0, 0, 2000, 1500);
```

The camera won't move outside this rectangle.

## Follow — tracking an object

A platformer classic:

```js
this.cameras.main.startFollow(player);

// With parameters
this.cameras.main.startFollow(player, true, 0.1, 0.1);
//                                     ^ smoothing ^lerpX ^lerpY (0..1)

// With offset
this.cameras.main.setFollowOffset(-100, 0);

// Stop
this.cameras.main.stopFollow();
```

**Lerp** (0..1) — how quickly the camera catches up to the target. 1 = instant (rigid), 0.05 = very smooth. Not used in slots.

## Camera effects

### Shake

```js
this.cameras.main.shake(
  500,    // duration ms
  0.01,   // intensity (0..1)
  false,  // force — restart if already shaking
  callback
);
```

Perfect for a **big-win feel** in a slot.

### Flash

```js
this.cameras.main.flash(500, 255, 255, 255);
//                  duration  R    G    B
```

Used for the flash effect on a mega-win.

### Fade

```js
this.cameras.main.fadeOut(1000, 0, 0, 0);  // to black
this.cameras.main.fadeIn(1000, 0, 0, 0);   // from black

// With a callback
this.cameras.main.fadeOut(500);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextScene');
});
```

### Zoom effects with tween

You can animate `camera.zoom` itself via a tween:

```js
this.tweens.add({
  targets: this.cameras.main,
  zoom: 1.5,
  duration: 1000,
  yoyo: true,
  ease: 'Sine.easeInOut'
});
```

Useful for zooming onto a winning line in a slot.

### Pan — moving toward a point

```js
this.cameras.main.pan(
  800, 400,    // where (x, y in world)
  2000,        // duration
  'Power2',    // ease
  false,       // force
  callback
);
```

## Multiple cameras

You can create several cameras. Each one sees its own region and can ignore certain objects.

```js
// An additional minimap in the corner
const minimap = this.cameras.add(10, 10, 200, 150);
minimap.setZoom(0.2);
minimap.setBackgroundColor('#000');
minimap.setBounds(0, 0, 2000, 1500);
minimap.startFollow(player);

// A UI camera that doesn't move with scroll
const uiCam = this.cameras.add(0, 0, 1280, 720);
uiCam.setScroll(0, 0);

// Specify which camera sees which objects
mainCamera.ignore(uiObjects);  // main camera doesn't see UI
uiCam.ignore(worldObjects);    // UI camera doesn't see the world
```

⚠️ **Important:** a UI scene (as a separate scene) is simpler than juggling two cameras. Use multiple cameras only when you genuinely need multiple viewports (minimap, split-screen).

## scrollFactor — parallax

`scrollFactor` defines how much an object moves with the camera scroll. It lets you do parallax (a background that moves slower than the foreground).

```js
const farBg = this.add.image(0, 0, 'far-bg').setScrollFactor(0.2);
const midBg = this.add.image(0, 0, 'mid-bg').setScrollFactor(0.5);
const player = this.add.sprite(0, 0, 'player');  // scrollFactor = 1 by default

// UI — doesn't move
const score = this.add.text(0, 0, 'Score').setScrollFactor(0);
```

## Camera in a slot game — real-world scenarios

### Scenario 1. Shake on big-win

```js
function onBigWin() {
  this.cameras.main.shake(800, 0.005);
  this.cameras.main.flash(300, 255, 255, 200);
  this.audio.sfx('big-win');
}
```

### Scenario 2. Fade transition into a bonus game

```js
function enterBonus() {
  this.cameras.main.fadeOut(800, 0, 0, 0);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start('BonusScene');
  });
}
```

### Scenario 3. Zoom on a win line

```js
function focusOnWinLine(centerX, centerY) {
  this.tweens.add({
    targets: this.cameras.main,
    zoom: 1.4,
    scrollX: centerX - this.scale.width / 2,
    scrollY: centerY - this.scale.height / 2,
    duration: 600,
    ease: 'Cubic.easeInOut'
  });

  this.time.delayedCall(2500, () => {
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1,
      scrollX: 0,
      scrollY: 0,
      duration: 600
    });
  });
}
```

### Scenario 4. Mega-win — a chain of effects

```js
function megaWinSequence() {
  const cam = this.cameras.main;

  // 1. Zoom-in
  this.tweens.add({ targets: cam, zoom: 1.2, duration: 500, yoyo: true });

  // 2. Flash
  cam.flash(400, 255, 215, 0); // golden flash

  // 3. Shake
  this.time.delayedCall(500, () => cam.shake(1500, 0.008));
}
```

## Camera events

```js
const cam = this.cameras.main;
cam.on('camerafadeincomplete', () => console.log('faded in'));
cam.on('camerafadeoutcomplete', () => console.log('faded out'));
cam.on('cameraflashcomplete', () => console.log('flash done'));
cam.on('camerashakecomplete', () => console.log('shake done'));
cam.on('camerapancomplete', () => console.log('pan done'));
cam.on('camerazoomcomplete', () => console.log('zoom done'));
```

## Coordinates: world vs screen

```js
// Convert screen coordinates to world coordinates
const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

// pointer.worldX, pointer.worldY — same thing
```

## RoundPixels — pixel sharpness

When zooming you can get sub-pixel artifacts. If the game is pixel art:

```js
this.cameras.main.roundPixels = true;
```

Or in the config:
```js
render: { roundPixels: true, pixelArt: true }
```

## Pitfalls

| Issue | Fix |
|---|---|
| Object not visible after `setBounds` | The object is outside the bounds — check the coordinates |
| UI scrolls with the camera | `setScrollFactor(0)` on UI objects |
| Shake gets "stuck" | After `shake` the state always resets, but if you call it again — pass `force=true` |
| Zoom clips the edges | The camera zooms from the viewport center — check `setBounds` |
| Camera jitters when following | Lower lerp to 0.05–0.1 for smoothing |

---

## ✅ Exercise 9

1. Load `assets/sprites/background.webp` full-screen. Place 5 cards in the center.
2. Pressing **space** — `cameras.main.shake(500, 0.01)`.
3. Pressing **F** — `cameras.main.flash(300, 255, 255, 0)` (yellow flash).
4. Pressing **Z** — animate `zoom` from 1 to 1.5 and back via a tween (yoyo).
5. **Bonus:** on clicking a card:
   - The camera smoothly pans to that card (via `pan`)
   - Zooms to 1.3
   - After 1 sec — returns to 1 and the center

[Chapter 10. Scale Manager](./10-scale-manager.md)


---

# Chapter 10. Scale Manager — responsiveness

Your game has to work on a phone in portrait, on a tablet in landscape, on a desktop at any window size. That's the job of the **Scale Manager** — `this.scale`.

## The core idea

Phaser tracks **two sizes**:

- **Internal (Game Size)** — what you set in `config.width/height`. This is your coordinate system.
- **External (Display Size)** — the actual canvas size in the DOM, in screen pixels.

The Scale Manager scales the canvas, but coordinates inside the game **stay** in Game Size.

```
Game Size: 1280×720 (your coordinates)
       ↓ Scale Manager
Display Size: 800×450 (on screen)
```

An object placed at `(640, 360)` is always **at the center of the game**, regardless of screen size.

## Scaling modes (`scale.mode`)

```js
const config = {
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 720
  }
};
```

| Mode | What it does |
|---|---|
| `Phaser.Scale.NONE` | No scaling. Canvas always at native size |
| `Phaser.Scale.FIT` | Fit inside the container, preserving aspect. Letterbox bars appear |
| `Phaser.Scale.ENVELOP` | Fill the container completely, preserving aspect. Part of the game gets cropped |
| `Phaser.Scale.WIDTH_CONTROLS_HEIGHT` | Stretch by width, height follows automatically |
| `Phaser.Scale.HEIGHT_CONTROLS_WIDTH` | The reverse |
| `Phaser.Scale.RESIZE` | Canvas always = container size. The game has to adapt to the new size |

### FIT — the most common pick

```js
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 1280,
  height: 720
}
```

- If the container is wider than 16:9 — bars appear top/bottom
- If narrower — bars appear left/right
- Coordinates don't change; everything inside is the same

**Use this for slots with a fixed design.**

### RESIZE — for adaptive UI

```js
scale: {
  mode: Phaser.Scale.RESIZE,
  width: window.innerWidth,
  height: window.innerHeight
}
```

The canvas always = the window. Game Size changes. You have to manually reposition objects on resize.

## autoCenter — centering

```js
scale: {
  autoCenter: Phaser.Scale.CENTER_BOTH
}
```

| Value | Meaning |
|---|---|
| `NO_CENTER` | Default (top-left) |
| `CENTER_BOTH` | Centered on both axes |
| `CENTER_HORIZONTALLY` | Horizontally only |
| `CENTER_VERTICALLY` | Vertically only |

## Min / max sizes

```js
scale: {
  mode: Phaser.Scale.FIT,
  width: 1280,
  height: 720,
  min: { width: 320, height: 480 },
  max: { width: 1920, height: 1080 }
}
```

## Getting the current size

```js
const w = this.scale.gameSize.width;     // internal
const h = this.scale.gameSize.height;
const dw = this.scale.displaySize.width; // on screen
const dh = this.scale.displaySize.height;

// Shorthand
const { width, height } = this.scale;
```

## The resize event

```js
this.scale.on('resize', (gameSize, baseSize, displaySize) => {
  // gameSize — new internal size (relevant in Scale.RESIZE)
  this.background.setSize(gameSize.width, gameSize.height);
  this.repositionUI();
});

// To unsubscribe:
this.scale.off('resize', handler);
```

⚠️ The resize event in `FIT` mode only fires **when the window changes**, not every frame.

## Fullscreen mode

```js
// Enter
this.scale.startFullscreen();

// Exit
this.scale.stopFullscreen();

// Toggle
this.scale.toggleFullscreen();

// Check
if (this.scale.isFullscreen) { /* ... */ }
```

The browser requires a **user gesture** to enter fullscreen — you can't trigger it without a click.

## Orientation (mobile)

```js
this.scale.on('orientationchange', (orientation) => {
  if (orientation === Phaser.Scale.PORTRAIT) {
    this.showRotateMessage();
  } else {
    this.hideRotateMessage();
  }
});
```

You can force-lock orientation (via the manifest or Capacitor for a PWA).

## Adaptive patterns

### Pattern 1. Safe areas

You build the game in an "ideal" 1280×720, but place UI with margins from the edges — so when letterboxing kicks in it doesn't end up jammed against the screen edge.

```js
const SAFE_PADDING = 40;
spinBtn.setPosition(
  width - SAFE_PADDING - spinBtn.width / 2,
  height - SAFE_PADDING - spinBtn.height / 2
);
```

### Pattern 2. Landscape + portrait in one game

Build 2 layouts and swap them on `orientationchange`:

```js
this.scale.on('orientationchange', () => {
  this.layoutUI();
});

layoutUI() {
  const isPortrait = this.scale.height > this.scale.width;
  if (isPortrait) {
    this.spinBtn.setPosition(this.scale.width / 2, this.scale.height - 100);
    this.balance.setPosition(20, 20);
  } else {
    this.spinBtn.setPosition(this.scale.width - 100, this.scale.height / 2);
    this.balance.setPosition(20, this.scale.height - 60);
  }
}
```

### Pattern 3. RESIZE mode, everything on the fly

```js
const config = {
  scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' }
};

class GameScene extends Phaser.Scene {
  create() {
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0);
    this.layout();

    this.scale.on('resize', this.layout, this);
  }

  layout() {
    const { width, height } = this.scale;
    this.bg.setDisplaySize(width, height);
    // other objects...
  }
}
```

⚠️ In RESIZE mode you'll have to manually position **everything**. Harder, but gives full freedom.

## Slot: which layout to pick

| Case | Recommendation |
|---|---|
| Desktop only | `FIT` 1920×1080 |
| Mobile portrait only | `FIT` 720×1280 |
| Mobile landscape only | `FIT` 1280×720 |
| Universal (mobile + desktop) | `FIT` 1280×720 + safe areas + adaptive UI for portrait |
| Custom layouts (Pragmatic Play style) | `RESIZE` + manual layout |

## Full Scale + UI example

```js
// config.js
export const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0a0a1a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  scene: [GameScene]
};

// GameScene.js
class GameScene extends Phaser.Scene {
  create() {
    const { width, height } = this.scale;

    // Background
    this.add.image(width / 2, height / 2, 'bg').setDisplaySize(width, height);

    // Reels in the center
    this.reels = this.add.container(width / 2, height / 2);

    // UI
    this.spinBtn = this.add.image(width - 100, height - 80, 'btn-spin')
      .setInteractive();

    this.balance = this.add.bitmapText(40, height - 60, 'gameFont', 'Balance: 1000');

    // React to resize
    this.scale.on('resize', this.onResize, this);
  }

  onResize(gameSize) {
    // In FIT mode — usually nothing to do
    // In RESIZE mode — reposition the UI
  }
}
```

## Pitfalls

| Issue | Fix |
|---|---|
| Game in the corner of the page | Set `parent: 'game'` and style the div |
| After fullscreen, game is in the corner | `autoCenter: Phaser.Scale.CENTER_BOTH` |
| Blurry image on retina | Phaser already accounts for devicePixelRatio. If you see artifacts — `roundPixels: true` |
| Bars at the edges | That's a feature of FIT mode. Use RESIZE or a background image wider than the game |
| Resize doesn't fire | Make sure `parent` actually reacts to changes. Better to use `'100%'` in CSS |
| iOS Safari URL bar shifts the game | Subscribe to `viewportresize`, or use `100dvh` in CSS instead of `100vh` |

---

## ✅ Exercise 10

1. Run your project. Open DevTools → Mobile mode → switch sizes (iPhone, iPad, desktop). See how `FIT` behaves.
2. Switch to `Scale.ENVELOP` — see the difference.
3. Switch to `Scale.RESIZE`. Listen for the `resize` event and log the sizes. Make the background stretch over the whole area.
4. Add a Fullscreen button in a corner. On click — `this.scale.toggleFullscreen()`.
5. **Bonus:** make the game with 2 layouts — landscape and portrait. On orientation change, redraw the UI.

[Chapter 11. Particle System](./11-particles.md)


---

# Chapter 11. Particle System — particles and effects

Particles are lots of small sprites that move, change color, and fade away. They're used for:
- Fire, smoke, sparks
- Confetti on a win in a slot
- Magic effects
- Snow, rain
- Explosions and impacts

In Phaser 3.60+ the particle API was **completely rewritten**. The old `createEmitter` is deprecated.

## Basic example

```js
// 1. Load a texture (any small picture)
this.load.image('spark', 'assets/sprites/spark.png');

// 2. Create an emitter
const emitter = this.add.particles(400, 300, 'spark', {
  speed: 100,
  lifespan: 1000,
  scale: { start: 0.5, end: 0 },
  blendMode: 'ADD',
  frequency: 50
});
```

`this.add.particles(x, y, textureKey, config)` — a ready-to-use emitter on the scene.

## Configuration — all the main parameters

```js
this.add.particles(x, y, 'particle', {
  // === Lifetime ===
  lifespan: 1000,                    // ms per particle
  lifespan: { min: 500, max: 1500 },

  // === Spawn rate ===
  frequency: 100,                    // ms between particles; -1 = explode only
  quantity: 1,                       // particles per emit

  // === Movement speed ===
  speed: 100,                        // fixed
  speed: { min: 50, max: 150 },      // random
  speedX: { min: -50, max: 50 },     // per axis
  speedY: -200,

  // === Launch angle ===
  angle: { min: 0, max: 360 },       // in all directions
  angle: { min: -100, max: -80 },    // up with a spread

  // === Gravity ===
  gravityY: 200,
  gravityX: 0,

  // === Size ===
  scale: 1,
  scale: { start: 1, end: 0 },                  // from 1 to 0
  scale: { start: 1, end: 0, ease: 'Power2' },
  scale: { min: 0.5, max: 1 },                  // random

  // === Opacity ===
  alpha: { start: 1, end: 0 },

  // === Color (tint) ===
  tint: 0xff0000,
  tint: [0xff0000, 0x00ff00, 0x0000ff],         // random from list

  // === Rotation ===
  rotate: { start: 0, end: 360 },
  rotate: { min: 0, max: 360 },

  // === Blend mode ===
  blendMode: 'ADD',                  // 'NORMAL', 'ADD', 'MULTIPLY', 'SCREEN'

  // === Spawn zone ===
  emitZone: {
    type: 'edge',
    source: new Phaser.Geom.Rectangle(0, 0, 100, 100),
    quantity: 32
  },

  // === Death zone (particles disappear when crossing it) ===
  deathZone: {
    type: 'onLeave',
    source: new Phaser.Geom.Rectangle(-100, -100, 200, 200)
  },

  // === Frame (when using an atlas) ===
  frame: 'spark.png',
  frame: ['spark.png', 'star.png'],

  // === Start emitting immediately or not ===
  emitting: true                      // false = emitter created but silent
});
```

## Controlling the emitter

```js
const emitter = this.add.particles(0, 0, 'spark', { ... });

// Start/stop
emitter.start();
emitter.stop();
emitter.pause();
emitter.resume();

// One burst of N particles (instead of a continuous stream)
emitter.explode(50);            // 50 particles
emitter.explode(50, x, y);      // at the given point

// Move the emitter
emitter.setPosition(x, y);

// Change parameters on the fly
emitter.setSpeed(200);
emitter.setLifespan(500);
emitter.setScale(2);

// Destroy
emitter.destroy();
```

## Following an object

```js
const player = this.add.sprite(100, 100, 'player');

const emitter = this.add.particles(0, 0, 'spark', {
  follow: player,                // particles spawn at player's position
  followOffset: { x: 0, y: -20 },
  ...
});
```

Perfect for a trail behind a magic symbol, a rocket, a bonus object.

## Spawn zones (emitZone)

### Edge — particles spawn along the outline

```js
emitZone: {
  type: 'edge',
  source: new Phaser.Geom.Circle(0, 0, 100),
  quantity: 64
}
```

You get a "ring" of particles.

### Random — anywhere inside a shape

```js
emitZone: {
  type: 'random',
  source: new Phaser.Geom.Rectangle(-50, -50, 100, 100)
}
```

## Real-world examples

### Win confetti

```js
function showWinConfetti(scene, x, y) {
  scene.add.particles(x, y, 'particle', {
    speed: { min: 200, max: 400 },
    angle: { min: 240, max: 300 },         // up with a spread
    scale: { start: 1, end: 0 },
    rotate: { start: 0, end: 360 },
    lifespan: 2000,
    gravityY: 300,
    quantity: 5,
    frequency: 50,
    duration: 1500,                        // emitter lives for 1.5s
    tint: [0xff0080, 0x00ff80, 0x80ff00, 0xffff00, 0x80ffff]
  });
}
```

### Twinkles/stars across the background

```js
this.add.particles(0, 0, 'star', {
  x: { min: 0, max: 1280 },
  y: { min: 0, max: 720 },
  scale: { start: 0, end: 1, ease: 'Sine.easeOut' },
  alpha: { start: 0, end: 1, yoyo: true },
  lifespan: 3000,
  frequency: 200,
  blendMode: 'ADD'
});
```

### Star burst on mega-win

```js
function megaWinExplode(scene, x, y) {
  scene.add.particles(x, y, 'star', {
    speed: { min: 300, max: 600 },
    angle: { min: 0, max: 360 },
    scale: { start: 1.5, end: 0 },
    rotate: { min: 0, max: 360 },
    lifespan: 1500,
    blendMode: 'ADD',
    tint: 0xffd700,
    emitting: false
  }).explode(80);
}
```

### Engine smoke

```js
const smoke = this.add.particles(0, 0, 'smoke', {
  follow: rocket,
  followOffset: { x: 0, y: 30 },
  speedY: { min: 50, max: 100 },
  speedX: { min: -20, max: 20 },
  scale: { start: 0.5, end: 2 },
  alpha: { start: 0.8, end: 0 },
  lifespan: 800,
  frequency: 20,
  blendMode: 'NORMAL'
});
```

### A trail along a winning line

```js
function trailAlongLine(scene, points) {
  // points = [{x:100,y:200}, {x:200,y:200}, ...]
  let i = 0;
  scene.time.addEvent({
    delay: 100,
    repeat: points.length - 1,
    callback: () => {
      const p = points[i++];
      scene.add.particles(p.x, p.y, 'spark', {
        speed: 30,
        scale: { start: 0.6, end: 0 },
        lifespan: 600,
        blendMode: 'ADD',
        emitting: false
      }).explode(8);
    }
  });
}
```

## Performance

Particles are **lots of objects**. Overdo it and the FPS will drop even on desktop.

### Rules:

1. **No more than 200-300 particles at once** on mid-low devices.
2. Use **small** textures (16×16, 32×32).
3. **`blendMode: 'ADD'`** is pretty, but the texture must have a transparent background.
4. One emitter with a high `quantity` is better than 10 emitters with low ones.
5. **Don't create emitters in `update()`** — only in response to events.
6. Use `duration` so the emitter stops itself.
7. For static particles (background stars) — a single `RenderTexture` is better.

## Particles in the slot industry

Pragmatic Play, NetEnt, Push Gaming use particles heavily:
- Confetti on big-win
- Light rings around a wild symbol
- Sparks when a reel stops on a bonus symbol
- A "rain" of coins on a super-win
- Magic trails when free spins trigger

Most of these effects are done with **particles + Spine**, sometimes with prefab pre-rendered animations.

## Important: one emitter — many particles

This is **batch rendering**. All particles from the same emitter are drawn in a single draw call (if the texture is one). So 100 particles from one emitter ≠ 100 separate Sprite objects in performance — particles are much cheaper.

---

## ✅ Exercise 11

1. Load a small image (32×32) — a star, a spark, a dot.
2. On a click anywhere — burst 30 particles in all directions (`explode`), gold colored.
3. Build a continuous stream of particles from the bottom of the screen upward (like rising bubbles).
4. Build a mouse-cursor trail: an emitter with `follow: pointer` and a low `frequency`.
5. **Bonus:** on a click — set off a "confetti salute": 5 emitters in different spots with different colors, each doing explode(50). After a second they all disappear.

[Chapter 12. Physics](./12-physics.md)


---

# Chapter 12. Physics

Phaser supports **two physics engines**:

1. **Arcade Physics** — simple, fast, AABB (axis-aligned bounding boxes). Thousands of objects on screen, no problem.
2. **Matter.js** — full rigid-body physics: rotation, complex shapes, chains, ropes.

**Slots usually don't need physics.** But knowing the basics is helpful — useful for other projects, and you can build "falling coins" for a win.

This chapter goes deep on Arcade. Matter — overview only.

## Enabling Arcade Physics

In the config:

```js
const config = {
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },     // pixels/sec²
      debug: false             // draw hitboxes
    }
  }
};
```

## Creating physics objects

```js
// Sprite with physics
const player = this.physics.add.sprite(100, 100, 'player');

// Image with physics
const ball = this.physics.add.image(200, 200, 'ball');

// Existing object → add physics
const obj = this.add.image(0, 0, 'obj');
this.physics.add.existing(obj);

// Group of physics objects
const enemies = this.physics.add.group();
const e = enemies.create(300, 100, 'enemy');
```

## Physics body API

After creation, the object has a `body` property — its physics body:

```js
// Velocity
player.body.setVelocity(100, 200);
player.body.setVelocityX(150);
player.body.setVelocityY(-300);

// Gravity (own gravity for this object)
player.body.setGravityY(500);
player.body.allowGravity = false;

// Drag (slow-down)
player.body.setDrag(100, 100);

// Bounce
player.body.setBounce(0.8, 0.8);   // 0..1, 1 = perfect bounce

// Hitbox size
player.body.setSize(32, 64);
player.body.setOffset(0, 0);
player.body.setCircle(20);          // circular hitbox

// Immovable (the object exists but doesn't move)
player.body.setImmovable(true);

// World bounds — the object can't leave them
player.body.setCollideWorldBounds(true);
```

## World bounds

```js
// By default = the game size
this.physics.world.setBounds(0, 0, 1280, 720);

// Object "bounces" off the bounds
player.setCollideWorldBounds(true);
player.setBounce(1);

// Only certain sides
this.physics.world.setBoundsCollision(true, true, true, false);
//                                    L     R     U     D
```

## Collisions and overlaps

### `collide` — actual collision (with impulse)

```js
this.physics.add.collider(player, walls);

// With a callback
this.physics.add.collider(player, enemy, (p, e) => {
  console.log('Hit!');
  e.destroy();
});

// Group vs group
this.physics.add.collider(bullets, enemies, (bullet, enemy) => {
  bullet.destroy();
  enemy.destroy();
});
```

After a collider, objects **push each other away** and stop.

### `overlap` — intersection (no physics response)

```js
this.physics.add.overlap(player, coins, (player, coin) => {
  coin.destroy();
  this.score += 10;
});
```

`overlap` doesn't stop objects, just detects intersection. Useful for triggers (collect a coin, enter a zone).

### One-off check (without a permanent collider)

```js
update() {
  if (this.physics.overlap(player, enemy)) {
    // Currently overlapping
  }
}
```

## Groups and physics

```js
// Dynamic group (moves under physics)
const fruits = this.physics.add.group({
  key: 'apple',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 },
  bounceY: 0.6,
  collideWorldBounds: true
});

// Static group (doesn't move, for platforms)
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').setScale(2).refreshBody();
```

Dynamic vs static:
- Dynamic — moves, checked every frame
- Static — never moves, treated as an obstacle

## Full example: a tiny platformer

```js
class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    // Player
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10, repeat: -1
    });
    this.anims.create({ key: 'turn', frames: [{ key: 'dude', frame: 4 }], frameRate: 20 });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10, repeat: -1
    });

    // Stars
    this.stars = this.physics.add.group({
      key: 'star', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate((c) => c.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

    // Collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#000' });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
}
```

This is the classic Phaser tutorial — make sure to build it by hand.

## Body state checks

```js
player.body.touching.down       // touching something below
player.body.touching.up
player.body.touching.left
player.body.touching.right

player.body.blocked.down        // hit a world boundary
player.body.blocked.up

player.body.velocity.x          // current velocity
player.body.velocity.y

player.body.onFloor()           // on the ground
player.body.onWall()
```

## Debug

Enable `debug: true` in the config:

```js
physics: {
  default: 'arcade',
  arcade: {
    gravity: { y: 300 },
    debug: true
  }
}
```

You'll see hitboxes and velocity vectors. Indispensable when debugging.

Toggling at runtime:
```js
this.physics.world.drawDebug = true;
this.physics.world.debugGraphic.clear();   // clear
```

## Matter.js — quick overview

When you need rotation, realistic physics, chains, or joints — use Matter.

```js
// config
physics: {
  default: 'matter',
  matter: {
    gravity: { y: 1 },
    debug: true
  }
}

// Creation
const ball = this.matter.add.image(400, 100, 'ball');
ball.setCircle();
ball.setBounce(0.9);
ball.setFriction(0.005);

// Constraints
this.matter.add.constraint(ball1, ball2, 100);

// Composite bodies (e.g., a car)
const car = this.matter.add.fromVertices(x, y, 'car', vertices);
```

Matter is heavier than Arcade, but prettier.

## Can physics be used for slots

Directly for the reels — no. But **indirectly useful**:

- "Falling coins" on a win (Arcade — dozens of sprites with gravity)
- Bonus games like "Plinko" (Matter — a ball bouncing off pegs)
- "Crash" mechanics
- Physics-based drag mini-games

## Pitfalls

| Issue | Fix |
|---|---|
| Object stuck in a wall | Lower the speed or use `body.checkCollision` |
| Speed depends on FPS | Phaser uses deltaTime — physics is FPS-independent |
| Hitbox doesn't match the sprite | `body.setSize()` + `body.setOffset()` |
| Object "falls through" downward | Enable `setCollideWorldBounds` or place a floor |
| Lots of collisions are slow | Use groups + Arcade has spatial partitioning built in |
| Tunneling (fast objects pass through) | Enable `physics.arcade.useTree = true` or use ccd in Matter |

---

## ✅ Exercise 12

1. Build a "box" — static platforms around the screen edges and a floor.
2. On a click anywhere — spawn a ball (Image with physics), gravity down, bounce 0.8.
3. The balls fall and bounce off the floor and walls.
4. Make 5 balls at the same time (group). They should also collide with each other.
5. **Bonus:** add "coin" rain on a Spacebar press — 50 coins with different speeds and gravity. This will be the basis of a "win" effect for a slot.

[Chapter 13. Architecture and optimization](./13-architecture.md)


---

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


---

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
