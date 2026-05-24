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
