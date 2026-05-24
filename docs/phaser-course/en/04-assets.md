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
