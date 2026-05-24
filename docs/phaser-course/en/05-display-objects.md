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
