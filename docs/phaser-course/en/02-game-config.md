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
