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
